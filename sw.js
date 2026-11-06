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
const BUILD = "20261106002321";
const A_GARDER = ["./","assets/abonnements-5tmUvnoU.js","assets/Abonnements-BqhUNGVg.js","assets/Academie-g4fsyWb2.js","assets/Acces-C32NbjqF.js","assets/afaire-4TwOjVn5.js","assets/AFaire-Bw3kBsO9.js","assets/Agents-BT5O8zq-.js","assets/agents-donnees-BcEicM23.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-BbCZLDTd.js","assets/Appels-Bg1LSdfu.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/Assistants-D9i2Xwmg.css","assets/Assistants-DeTsphTn.js","assets/AtelierDesContenus-BWqvwkfJ.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/Audience-BFPGYyyO.js","assets/Aujourdhui-CX67On5U.js","assets/avant-le-fauteuil-lecture-CYzdNYN3.js","assets/AvantLeFauteuil-CEacSbMQ.js","assets/avis-fiches-Dt2qDUtM.js","assets/AvisGoogle-D8eFwVMP.js","assets/AvisGoogle-DaPXfwX9.css","assets/bilan-B-bfPYR0.css","assets/bilan-DrMoS7bj.js","assets/BilanMensuel-lhdDqdMa.js","assets/Branches-DH_vudtp.js","assets/bridges-D440g-IS.js","assets/Caisse-BZVTNVc_.js","assets/caisse-du-soir-C6vPx-E_.css","assets/caisse-du-soir-DhfIsbsc.js","assets/Caisses-DKsxiMq5.js","assets/Calendrier-DLmmklNs.js","assets/campagnes-pur-yeSUcDjX.js","assets/Carnet-DYVrs3mn.js","assets/carte-DZBSPBt2.js","assets/carte-_W_-xBPj.css","assets/CarteModal-C1nVg2Ue.js","assets/CartesCadeaux-D4v8SAF_.js","assets/Catalogue-AmDi9PjB.js","assets/CentreDeCommande-BXDGOaQ_.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-BE08Fqhk.js","assets/certificat-Dm0ox-hv.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-CHTbCitr.js","assets/chiffre-du-jour-pur-BJRoaVnv.js","assets/ChiffreDesPrestations-D1R5R0Of.js","assets/client-EDoSSbft.js","assets/cloture-du-jour-q2LHF7KQ.js","assets/ClotureDuTiroir-DPMaXNGd.js","assets/Coffre-4zWivH0z.js","assets/components-B22vQJnv.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-BXlz0Rnm.js","assets/Comptes-DYS_ltwh.js","assets/consultation-CRW6QcWf.css","assets/consultation-D0JjQfAA.js","assets/Consultations-Bop4XDzH.js","assets/consultNotes-5Bfq20KY.js","assets/Conversations-CfmRv5yW.js","assets/Conversations-D4WwB5Zo.css","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-ALWux8U_.js","assets/currency-qfIhGmrs.js","assets/Customers-DA-J6Cpd.js","assets/Dashboard-B2x7VsE_.css","assets/Dashboard-s4SV5l40.js","assets/dates-CytUvOLS.js","assets/Demandes-C9nCSDBI.js","assets/DepenseEnUnePhrase-BIGRlGqP.css","assets/DepenseEnUnePhrase-cAEsOy7X.js","assets/Depenses-DploTlMs.js","assets/depenses-saisie-Cz4WJ2Ml.js","assets/dernier-message-pur-CBYWnq8m.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-CfuUB8FI.js","assets/diagnostics-au-trone-DoyH4p6h.js","assets/Dictee-D2P9yM7v.css","assets/dictee-pur-DrtNFvhI.js","assets/Dictee-ylyjCrER.js","assets/Discussions-DDTPKSaU.js","assets/EditeurDesOffres-Bzet4Oc-.js","assets/Encaissements-0S7X9F7E.js","assets/enfants-Bn8oeYoR.js","assets/Engagements-BFNCQU9h.js","assets/Engagements-Cj5S9MhG.css","assets/EntreDeuxSeances-D7redw6M.js","assets/Evaluation-C1brVaFr.js","assets/Factures-BTFIUoaz.js","assets/FenetreDesCivilites-3z5aqXFO.js","assets/FenetreDesCivilites-zfNk1aak.css","assets/FenetreDuPoint-DK9Ro_aL.js","assets/Fil-sfjwYPke.js","assets/finances-BMFnlkRx.css","assets/fon-6eqMm5AR.js","assets/fournisseurs-BktRpLXw.js","assets/Fournisseurs-N53R8ayJ.js","assets/foyer-DlXG2Pug.js","assets/Gerard-B5pAKg9l.js","assets/Gerard-CP3QOjfk.css","assets/gerard-donnees-CTT264yl.js","assets/gestes-conversation-C36we97H.js","assets/HomeRituals-_L5nCsHE.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-DQJn8DRm.js","assets/ia-centre-nfRnqzgB.js","assets/ia-diagnostic-pur-BBLrGY5l.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-tableau-pur-CSRjGtTf.js","assets/identite-Ds9g9DeE.js","assets/index-BGqfIY5M.js","assets/index.es-WzxGkNCB.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-BswtE0Bs.js","assets/jspdf.es.min-Bznzjx6r.js","assets/JustePrix-B_EYMa2l.js","assets/kkiapay-BzLCuL6B.js","assets/kkiapay-widget-DnUhUNd4.js","assets/Laboratoire-BVeSMUDO.js","assets/LaJournee-Bn_G0HCt.css","assets/LaJournee-PFBS8ozm.js","assets/LesPaiements-BvdfOCbQ.css","assets/LesPaiements-Bvw1lXip.js","assets/LettresAuDossier-CSlAQPqr.js","assets/LienMndPay-CmhgNVUG.js","assets/Marketing-DInohhOr.js","assets/MarketingBranche-P1-rOwGV.js","assets/Marque-CxtlEs21.js","assets/MesPourboires-D9I_9rZf.css","assets/MesPourboires-rXVlOeFL.js","assets/MesTaches-BWRNekkI.js","assets/MesTaches-Cc4XUDf6.css","assets/momo-C2ZVfV9J.js","assets/MonMois-DwPje0EL.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/objectifs-vKmZh360.js","assets/opale-BBBbpr5q.js","assets/oreille-B1AMUmZh.js","assets/paie-du-5-DeJq-K_U.css","assets/paie-du-5-pur-CsAlutq9.js","assets/paie-du-5-_7e7wdb-.js","assets/PaieParMtn-DMG79dyy.js","assets/paliers-w_2fqyfH.js","assets/Parametres-DUF9KXWN.js","assets/parcours-CyLgrDp1.js","assets/Parrainages-CzhC7u6C.js","assets/Parrainages-gAHAPB_6.css","assets/PassageAvantLeFauteuil-Dean-X8w.js","assets/pdf-D8lQE9La.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/Personas-DOtaUYFV.js","assets/Personnel-B7a5c1wA.js","assets/photo-BJiegUIX.js","assets/pilotage-D8kf1Co8.css","assets/Pourboires-Q4_ZpgFH.js","assets/Predictions-DJlsntCA.js","assets/Prestataires-CjnXvSe5.js","assets/Prets-Caa_ICl3.js","assets/PrevisionDuMois-C1dbLdTl.js","assets/PrevisionDuMois-DlFTw3OX.css","assets/Previsions-CdGQYIsn.js","assets/previsions-pur-Ba73h2jd.js","assets/Previsions-r4v19Anp.css","assets/processus-pur-R6U5QcCi.js","assets/Projets-BLHOzzBc.js","assets/Projets-COO7WDEE.css","assets/projets-pur-2ZEMRNDU.js","assets/projets-ZM7_AJq9.js","assets/protocoles-dRSuLLVC.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-AEdCHEEJ.js","assets/qualification-BcTHLfXF.js","assets/quiz-5qMPWZVi.js","assets/Rapport-tTvMxoWS.js","assets/Recommandations-CzU1T7lK.js","assets/regler-C5hcM02_.css","assets/regler-CU4hD1IC.js","assets/regler-la-seance-serveur-Bs6rzqZX.js","assets/relances-pur-lwRTXc5E.js","assets/releve-des-avis-DlF32xZ2.js","assets/SalonFoyer-kj319UHi.js","assets/secretariat-admin-Ddkf4F6f.js","assets/Secretariat-C1itM5rm.js","assets/Secretariat-Cy79Zw30.css","assets/Signatures-BsBypANM.js","assets/SignerUnPdf-CBCe0KpU.js","assets/Synthese-COad-Rq5.js","assets/SyntheseGraphes-CCYZt8nK.js","assets/systeme-TPy-pF7j.css","assets/Tableau-CaslpuXm.js","assets/temps-CF_PEYU1.js","assets/Textes-B5RssXYp.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-CkDzpGy0.css","assets/tiroirs-klraTF00.js","assets/trone-BOwqJlyM.js","assets/trone-DQVzvvmA.css","assets/useAudiences-DiUm50b3.js","assets/useClotureDuJour-CBehEDc0.js","assets/Vitrine-BWilTqQJ.css","assets/Vitrine-CE6L3y_V.js","assets/_admin-_FvU7Zxb.js","assets/_contrat-Bytc37MX.js","assets/_heures-CF_ZiWXm.js","assets/_reuni-DczZskme.js","assets/_shared-CsLiycrA.js","assets/_signature-Clze17Kz.js","assets/_ui-Ce3Z1t9C.js","assets/_ui-lWAwxW12.css"];
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
