/* Service worker — Web Push (notifications téléphone) pour Ma Couronne & Le Trône,
   ET, depuis le 4 octobre 2026, l'application gardée sur le téléphone (maquette
   « Le Trône hors ligne », temps 2).

   CE QU'IL GARDE. `scripts/build-sites.mjs` remplace les deux repères
   ci-dessous à chaque construction : l'empreinte de la version, et la liste de
   ce qui fait l'application (la page, le code, les styles, les polices, les
   sceaux). Un `sw.js` qui change à chaque construction est ce qui installe la
   nouvelle version au téléphone. En développement, les repères restent tels
   quels et RIEN ne se garde : un poste de travail doit toujours voir le code
   frais.

   COMMENT IL SERT :
   · la page (navigation) : le réseau d'abord, quatre secondes au plus, puis
     la page gardée — en ligne on a toujours la dernière version, sans réseau
     le Trône s'ouvre quand même ;
   · le code et les styles (noms à empreinte, immuables) : ce qui est gardé
     d'abord, le réseau sinon ;
   · les images : gardées à mesure qu'on les voit ;
   · le reste — Supabase, les fonctions, version.json, un autre domaine — ne
     passe JAMAIS par lui : les données ont leur propre file d'attente.

   Uniquement la réception des notifications et le clic, pour le reste. */
const BUILD = "20261105234154";
const A_GARDER = ["./","assets/abonnements-CpyOngsa.js","assets/Abonnements-DfSKDnKy.js","assets/Academie-BbsygK7x.js","assets/Acces-C_58A-fh.js","assets/afaire-BWMSEzai.js","assets/AFaire-eQJ9a7ZX.js","assets/Agents-D6bCa_dK.js","assets/agents-donnees-B2oSfzGT.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-BdCYxM1u.js","assets/Appels-CXuYU7xm.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/Assistants-A3s4ZDSz.js","assets/Assistants-D9i2Xwmg.css","assets/AtelierDesContenus-ChRqHM0h.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/Audience-CHJxPAPL.js","assets/Aujourdhui-Ck9wvULi.js","assets/avant-le-fauteuil-lecture-Bxg3McVK.js","assets/AvantLeFauteuil-wIgAyDrH.js","assets/avis-fiches-CSMYIEcf.js","assets/AvisGoogle-DaPXfwX9.css","assets/AvisGoogle-UAbHz-bZ.js","assets/bilan-B-bfPYR0.css","assets/bilan-CRcB8S0q.js","assets/BilanMensuel-CYDINsoP.js","assets/Branches-C_YzYwoO.js","assets/bridges-CFo4dHjX.js","assets/Caisse-B896dwbq.js","assets/caisse-du-soir-C6vPx-E_.css","assets/caisse-du-soir-Cpfr-slA.js","assets/Caisses-C5qRhJPy.js","assets/Calendrier-B_2Tc7w5.js","assets/campagnes-pur-CSTYi-pQ.js","assets/Carnet-UbvFYhoR.js","assets/carte-B5zlJWXL.js","assets/carte-_W_-xBPj.css","assets/CarteModal-BxyjUI32.js","assets/CartesCadeaux-DJ7nHwO4.js","assets/Catalogue-BHSM2_-6.js","assets/CentreDeCommande-Du8kyJhp.css","assets/CentreDeCommande-Wa4EdFBO.js","assets/Cercle-Bvrqh0IK.js","assets/certificat-DbufQDUu.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-WsjLufOn.js","assets/chiffre-du-jour-pur-BOIFZyL4.js","assets/ChiffreDesPrestations-CE3INHYF.js","assets/client-fMR2M2In.js","assets/cloture-du-jour-6tTk0atV.js","assets/ClotureDuTiroir-EPlSVWfn.js","assets/Coffre-l2eFtihA.js","assets/components-D9TWPwLW.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-DCbPBhP7.js","assets/Comptes-BPlS1FyI.js","assets/consultation-CRW6QcWf.css","assets/consultation-tzrIxlbp.js","assets/Consultations-B3Zq9sGI.js","assets/consultNotes-Jh1SWyP3.js","assets/Conversations-Cs5FLwhJ.js","assets/Conversations-D4WwB5Zo.css","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-V0dRRlte.js","assets/currency-qfIhGmrs.js","assets/Customers-bInWOjC0.js","assets/Dashboard-B2x7VsE_.css","assets/Dashboard-CpjAXCQs.js","assets/dates-DMP5n1qL.js","assets/Demandes-3dbbTOZs.js","assets/DepenseEnUnePhrase-BIGRlGqP.css","assets/DepenseEnUnePhrase-BN8Rd4Rj.js","assets/depenses-saisie-BdCy2jm4.js","assets/Depenses-UbVWcW2A.js","assets/dernier-message-pur-CBYWnq8m.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-5vncWAEf.js","assets/diagnostics-au-trone-Bg0faaZI.js","assets/Dictee-CrQzONa-.js","assets/Dictee-D2P9yM7v.css","assets/dictee-pur-B6vDeVXU.js","assets/Discussions-DX-Lr8_m.js","assets/EditeurDesOffres-BNJtiEm-.js","assets/Encaissements-CGFRWy2C.js","assets/enfants-iaIA8xxS.js","assets/Engagements-BybKtRr2.js","assets/Engagements-Cj5S9MhG.css","assets/EntreDeuxSeances-DqcGJmQV.js","assets/Evaluation-DmfDyZ7g.js","assets/Factures-DXCOEhyy.js","assets/FenetreDesCivilites-D9rBvsyf.js","assets/FenetreDesCivilites-zfNk1aak.css","assets/FenetreDuPoint-C695i8w5.js","assets/Fil-DAz1CXu6.js","assets/finances-BMFnlkRx.css","assets/fon-DtvVtDii.js","assets/Fournisseurs-Burs-Rc3.js","assets/fournisseurs-Db0tyBWE.js","assets/foyer-CrDRrMs9.js","assets/Gerard-CP3QOjfk.css","assets/Gerard-Df26EDa2.js","assets/gerard-donnees-uno_UL2k.js","assets/gestes-conversation-DWB-ZUO1.js","assets/HomeRituals-BwGwzSDY.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-CH_hz52l.js","assets/ia-centre-MPhScfYg.js","assets/ia-diagnostic-pur-BBLrGY5l.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-tableau-pur-CSRjGtTf.js","assets/identite-FiAWX_qT.js","assets/index-B-HYnkcH.js","assets/index.es-CKL5eje0.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-BPRHW-Ob.js","assets/jspdf.es.min-DrCdVxM-.js","assets/JustePrix-CcEvmHMK.js","assets/kkiapay-ItH8zX1L.js","assets/kkiapay-widget-DnUhUNd4.js","assets/Laboratoire-Ue5TpxXL.js","assets/LaJournee-Bn_G0HCt.css","assets/LaJournee-Cmw-4_z6.js","assets/LettresAuDossier-CVqRpBDN.js","assets/LienMndPay-B0MlhW_e.js","assets/Marketing-BJIMEBAL.js","assets/MarketingBranche-srXRw8Ex.js","assets/Marque-C4qopoeW.js","assets/MesPourboires-D9I_9rZf.css","assets/MesPourboires-MGmINNyZ.js","assets/MesTaches-Cc4XUDf6.css","assets/MesTaches-Crc2lxoW.js","assets/momo-C2ZVfV9J.js","assets/MonMois-DCd98H7V.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-D2k1R8Vy.js","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/opale-DsQEcJpw.js","assets/oreille-B1AMUmZh.js","assets/paie-du-5-DeJq-K_U.css","assets/paie-du-5-DFiMbSKv.js","assets/paliers-U5T_I5X6.js","assets/Parametres-Div_2PFZ.js","assets/parcours-BmL8NaEu.js","assets/Parrainages-CLsd2qko.js","assets/Parrainages-gAHAPB_6.css","assets/PassageAvantLeFauteuil-C-4vVgyN.js","assets/pdf-DDFVgoz5.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/Personas-wTORqSMp.js","assets/Personnel-CHuAWu3v.js","assets/photo-DIQWZUI_.js","assets/pilotage-D8kf1Co8.css","assets/Pourboires-BqcDZQgQ.js","assets/Predictions-CpHhbm4o.js","assets/Prestataires-B01cts8A.js","assets/Prets-D-C5csNP.js","assets/PrevisionDuMois-CAmpXZEz.js","assets/PrevisionDuMois-DlFTw3OX.css","assets/Previsions-mRJvGLhD.js","assets/previsions-pur-1EkSeW1m.js","assets/Previsions-r4v19Anp.css","assets/processus-pur-R6U5QcCi.js","assets/Projets-CCxruRy3.js","assets/Projets-COO7WDEE.css","assets/projets-pur-2ZEMRNDU.js","assets/projets-wg2RUg_c.js","assets/protocoles-BI5EILfU.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-BR9IrgLV.js","assets/qualification-COU4BStZ.js","assets/quiz-5qMPWZVi.js","assets/Rapport-DyNEX0Yz.js","assets/Recommandations-CoQQCQn8.js","assets/regler-C5hcM02_.css","assets/regler-Da0yNPS9.js","assets/regler-la-seance-serveur-Bs6rzqZX.js","assets/relances-pur-lwRTXc5E.js","assets/releve-des-avis-Dc8LaZlV.js","assets/SalonFoyer-C-86c1yw.js","assets/secretariat-admin-t7MJ_Gh8.js","assets/Secretariat-Cy79Zw30.css","assets/Secretariat-DRdDFRHc.js","assets/Signatures-BDrVHqIM.js","assets/SignerUnPdf-CqRj-cOI.js","assets/Synthese-DBz4M9KJ.js","assets/SyntheseGraphes-CM7rpAwS.js","assets/systeme-TPy-pF7j.css","assets/Tableau-jP5i2f-4.js","assets/temps-CK9bK0QT.js","assets/Textes-CMWeC_Ho.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-CkDzpGy0.css","assets/tiroirs-D2mwIDLu.js","assets/trone-Bn7s72pm.js","assets/trone-DQVzvvmA.css","assets/useAudiences-D0MokgaM.js","assets/useClotureDuJour-6BnDbRW0.js","assets/Vitrine-BWilTqQJ.css","assets/Vitrine-nyhVfeN1.js","assets/_admin-DDeKD-iW.js","assets/_contrat-Dx4SDG4L.js","assets/_heures-DklciPKK.js","assets/_reuni-CI2aik9s.js","assets/_shared-BT8rAxBT.js","assets/_signature-EgKSgZGT.js","assets/_ui-BMMAiqHR.js","assets/_ui-BWMA-PlM.css"];
const ACTIF = !BUILD.startsWith('__');
const CACHE_APP = `mnd-app-${BUILD}`;
const CACHE_IMAGES = 'mnd-images';
const DELAI_PAGE_MS = 4000;

const portee = () => self.registration.scope;

self.addEventListener('install', (event) => {
  self.skipWaiting();
  if (!ACTIF) return;
  /* UNE VERSION ENTIÈRE OU PAS DU TOUT — 4 octobre 2026. « Analytics ne
     s'ouvre pas hors ligne » (Yéman) : une copie à trous ne doit jamais
     remplacer une copie entière. Un seul fichier manqué (réseau coupé pendant
     l'installation) et cette version renonce ; l'ancienne reste en service,
     le navigateur réessaiera à la prochaine ouverture. */
  event.waitUntil((async () => {
    const c = await caches.open(CACHE_APP);
    const r = await Promise.allSettled(
      A_GARDER.map((u) => c.add(new Request(new URL(u, portee()).href, { cache: 'reload' }))),
    );
    if (r.some((x) => x.status === 'rejected')) {
      await caches.delete(CACHE_APP);
      throw new Error('copie incomplète, la version en place reste');
    }
  })());
});

/* LES DEUX VERSIONS D'AVANT RESTENT — 4 octobre 2026. Un Trône ouvert AVANT
   une mise en ligne continue de demander les fichiers de SA version pour les
   écrans qu'il n'a pas encore ouverts (Analytics) ; les effacer à l'instant où
   la nouvelle s'installe le laissait, hors ligne, sur « Unexpected error ».
   `caches.match` cherche dans toutes les copies : on garde les deux plus
   récentes en plus de celle-ci, les plus anciennes s'effacent. */
const VERSIONS_GARDEES = 2;
self.addEventListener('activate', (event) => event.waitUntil((async () => {
  if (ACTIF) {
    const autres = (await caches.keys())
      .filter((n) => n.startsWith('mnd-app-') && n !== CACHE_APP)
      .sort()
      .reverse();
    await Promise.all(autres.slice(VERSIONS_GARDEES).map((n) => caches.delete(n)));
  }
  await self.clients.claim();
})()));

const avecDelai = (promesse, ms) => new Promise((ok, ko) => {
  const t = setTimeout(() => ko(new Error('délai')), ms);
  promesse.then((r) => { clearTimeout(t); ok(r); }, (e) => { clearTimeout(t); ko(e); });
});

self.addEventListener('fetch', (event) => {
  if (!ACTIF) return;
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin || !req.url.startsWith(portee())) return;
  if (/\/(version\.json|sw\.js)$/.test(url.pathname)) return;

  if (req.mode === 'navigate') {
    const page = new URL('./', portee()).href;
    event.respondWith((async () => {
      try {
        const r = await avecDelai(fetch(req), DELAI_PAGE_MS);
        if (r.ok && url.pathname === new URL(page).pathname) {
          /* LA PAGE NE SE GARDE QU'AVEC SON CODE (4 octobre 2026). Une page
             d'une version plus neuve que ce service appelle des fichiers
             qu'il n'a pas : la garder, c'était rouvrir hors ligne une page
             sans ses écrans. On la reconnaît à son script d'entrée. */
          const copie = r.clone();
          void copie.text().then(async (html) => {
            const entree = html.match(/assets\/[^"'?#\s]+\.js/);
            if (entree && !A_GARDER.includes(entree[0])) return;
            const c = await caches.open(CACHE_APP);
            await c.put(page, new Response(html, { headers: copie.headers }));
          }).catch(() => {});
        }
        return r;
      } catch (_e) {
        return (await caches.match(req)) || (await caches.match(page)) || Response.error();
      }
    })());
    return;
  }

  if (/\.(js|css|woff2)$/.test(url.pathname)) {
    event.respondWith((async () => {
      const gardee = await caches.match(req);
      if (gardee) return gardee;
      const r = await fetch(req);
      if (r.ok) { const c = await caches.open(CACHE_APP); void c.put(req, r.clone()); }
      return r;
    })());
    return;
  }

  if (/\.(png|jpe?g|webp|svg|gif|ico)$/.test(url.pathname)) {
    event.respondWith((async () => {
      const c = await caches.open(CACHE_IMAGES);
      const gardee = await c.match(req);
      const frais = fetch(req).then((r) => { if (r.ok) void c.put(req, r.clone()); return r; }).catch(() => null);
      return gardee || (await frais) || Response.error();
    })());
  }
});

/* ── LES NOTIFICATIONS ──
   Badge d'icône (Android/Samsung) : le SYSTÈME le dessine d'après le nombre de
   notifications encore dans le tiroir (l'API Badging n'existe pas sur Chrome Android).
   Stratégie : UNE seule notification à la fois (tag constant) → le badge ne dépasse
   jamais 1 ; on ne l'empile pas quand l'app est ouverte ; et on vide le tiroir à
   chaque reprise de l'app. */

const NOTI_TAG = 'mnd';


/* Referme toutes les notifications + efface le badge (desktop/iOS ; no-op Android). */
async function clearAll() {
  try {
    const notifs = await self.registration.getNotifications();
    for (const n of notifs) n.close();
  } catch (_e) { /* ignore */ }
  try { if (self.navigator && self.navigator.clearAppBadge) await self.navigator.clearAppBadge(); } catch (_e) { /* ignore */ }
}

/* Demande de nettoyage émise par l'app (ouverture / focus / reprise). */
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'mnd-clear') event.waitUntil(clearAll());
});

self.addEventListener('push', (event) => {
  let data = {};
  try { data = event.data ? event.data.json() : {}; } catch (_e) { data = { body: event.data && event.data.text() }; }
  event.waitUntil((async () => {
    /* App ouverte/visible : ne pas empiler de notification (le badge ne monte pas) —
       juste nettoyer ; l'app affiche déjà l'événement dans sa cloche. */
    const wins = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
    if (wins.some((w) => w.visibilityState === 'visible')) { await clearAll(); return; }

    const title = data.title || 'Maison MND';
    await self.registration.showNotification(title, {
      body: data.body || '',
      icon: data.icon || '/couronne/assets/monograms/mono-copper.png',
      badge: data.badge || '/couronne/assets/monograms/mono-copper.png',
      tag: NOTI_TAG,      // tag constant → une seule notification dans le tiroir
      renotify: true,
      data: { url: data.url || '/couronne/' },
    });
  })());
});

/* L'URL du clic ne quitte JAMAIS notre origine — défense en profondeur. Un push
   ne s'émet qu'avec la clé VAPID privée (serveur), donc `data.url` n'est pas
   atteignable par un tiers ; mais on ne navigue quand même que vers une adresse
   de même origine, et l'on retombe sinon sur l'accueil de Ma Couronne. */
function urlSure(brut) {
  try {
    const u = new URL(brut, self.location.origin);
    return u.origin === self.location.origin ? u.href : '/couronne/';
  } catch (_e) { return '/couronne/'; }
}

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const url = urlSure((event.notification.data && event.notification.data.url) || '/couronne/');
  event.waitUntil((async () => {
    await clearAll();
    const wins = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
    for (const w of wins) {
      if ('focus' in w) { try { w.navigate(url); } catch (_e) { /* ignore */ } return w.focus(); }
    }
    if (self.clients.openWindow) return self.clients.openWindow(url);
  })());
});
