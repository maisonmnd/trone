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
const BUILD = "20261111172635";
const A_GARDER = ["./","assets/abonnements-Bn3KjaCR.js","assets/Abonnements-CiB0_rpm.js","assets/Abonnements-DTY7p2DH.css","assets/Academie-DnxBwjSh.js","assets/Acces-D4iWtFzp.js","assets/afaire-C6kq-d1d.js","assets/AFaire-dBesRzT5.js","assets/Agents-B8mCX8GN.js","assets/agents-donnees-C4_DbFF6.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-CSmaq7jR.js","assets/Appels-BFLo8vQt.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/Assistants-D9i2Xwmg.css","assets/Assistants-DmPK1l5w.js","assets/AtelierDesContenus-BAGEA0Q2.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/Audience-BE21Av6N.js","assets/Aujourdhui-DihotcZ_.js","assets/avant-le-fauteuil-lecture-pTN2-Icj.js","assets/AvantLeFauteuil-CTKqTpoR.js","assets/avis-fiches-DdKIEysw.js","assets/AvisGoogle-DaPXfwX9.css","assets/AvisGoogle-Ds3cKbzJ.js","assets/BadgeEssai-D1-VId52.js","assets/bilan-B-bfPYR0.css","assets/bilan-WvmQ6EsP.js","assets/BilanMensuel-99Hg8uve.js","assets/Branches-DJh7ItTd.js","assets/bridges-CqX9vcCa.js","assets/Caisse-ckuhU2Ic.js","assets/caisse-du-soir-C6vPx-E_.css","assets/caisse-du-soir-DVruwMe7.js","assets/Caisses-CIZERw4p.js","assets/Calendrier-_bjaeGEX.js","assets/campagnes-pur-FJY6WZsN.js","assets/Carnet-BdBG9kx6.js","assets/carte-AP3XgjkR.js","assets/carte-_W_-xBPj.css","assets/CarteModal-Bxysj5IR.js","assets/CartesCadeaux-BgYglyz-.js","assets/Catalogue-DC5Exhy2.js","assets/CentreDeCommande-DNw_9vX1.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-BF_8-m44.js","assets/certificat-CpQLIU8Q.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-IwNmQvdA.js","assets/chiffre-du-jour-pur-D6jSCKfR.js","assets/ChiffreDesPrestations-38s5OK4-.js","assets/client-DXGcbPPH.js","assets/cloture-du-jour-B9xNB8GH.js","assets/ClotureDuTiroir-d-ucriRP.js","assets/Coffre-Dzb07pwC.js","assets/components-UXYwVTMm.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-COiSrZab.js","assets/Comptes-WPBTxuYM.js","assets/consultation-CRW6QcWf.css","assets/consultation-uxY-4oPd.js","assets/Consultations-BYipC2VR.js","assets/consultNotes-DIFNNOTL.js","assets/Conversations-CNU6QIfy.js","assets/Conversations-D4WwB5Zo.css","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-yPmkaat-.js","assets/currency-qfIhGmrs.js","assets/Customers-DKNPmSsu.js","assets/Dashboard-B2x7VsE_.css","assets/Dashboard-_6AuICaC.js","assets/dates-BCy6ociZ.js","assets/Demandes-DY45wfJ9.js","assets/DepenseEnUnePhrase-BIGRlGqP.css","assets/DepenseEnUnePhrase-C2PaaBpc.js","assets/Depenses-CgWJ4fIQ.js","assets/depenses-saisie-CM0EDllY.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-CZ-Psqc5.js","assets/diagnostics-au-trone-BopFt_AN.js","assets/Dictee-BtNGTj8X.js","assets/Dictee-D2P9yM7v.css","assets/dictee-pur-7kpFBYjA.js","assets/Discussions-CNRINmo7.js","assets/EditeurDesOffres-DPfSfy98.js","assets/Encaissements-C1T7O6kn.js","assets/enfants-BURmtVmi.js","assets/Engagements-CeLUEf5L.js","assets/Engagements-Cj5S9MhG.css","assets/engagements-coffre-ulTqmza_.js","assets/EntreDeuxSeances-Cocwhcnl.js","assets/Evaluation-DHcn6ozG.js","assets/Factures-DrTlTKa8.js","assets/FenetreDesCivilites-DUSEPl1R.js","assets/FenetreDesCivilites-zfNk1aak.css","assets/FenetreDuPoint-KQhwR5EX.js","assets/Fil-FLrW_Rx6.js","assets/finances-BMFnlkRx.css","assets/fon-DontfHeA.js","assets/fournisseurs-C0ZXPvZD.js","assets/Fournisseurs-DfcNRJco.js","assets/foyer-CtQa43Zc.js","assets/Gerard-aszl1AfI.js","assets/Gerard-Cgj-zsJh.css","assets/gerard-donnees-DKO7NMde.js","assets/gestes-conversation-DVobiQ44.js","assets/heures-des-rappels-pur-Dig9pZpo.js","assets/HomeRituals-BePEitwT.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-C4j9OzaR.js","assets/ia-centre-BfXkfVX1.js","assets/ia-diagnostic-pur-BBLrGY5l.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-tableau-pur-p6UvREJe.js","assets/identite-Dy5RV_MB.js","assets/index-CHZurvkY.js","assets/index.es-BhYNSZmE.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-CtSKM2K8.js","assets/jspdf.es.min-DCBy_7OC.js","assets/JustePrix-CoRpYtxc.js","assets/kkiapay-BXgXw4oh.js","assets/kkiapay-widget-DnUhUNd4.js","assets/Laboratoire-CmQSNura.js","assets/LaJournee-Bn_G0HCt.css","assets/LaJournee-G0hs9Cc9.js","assets/LesPaiements-D4oQoBMs.js","assets/LesPaiements-IoteCeZN.css","assets/LettresAuDossier-CU3JYUdI.js","assets/LienMndPay-CK-KT5ry.js","assets/Marketing-BXthI9K2.js","assets/MarketingBranche-DUGG1yr5.js","assets/Marque-L0-B2y3_.js","assets/MesPourboires-CENjelyb.css","assets/MesPourboires-DIhIKFyT.js","assets/MesTaches-Cc4XUDf6.css","assets/MesTaches-DPv9SH0J.js","assets/momo-C2ZVfV9J.js","assets/MonMois-BmJwP1Hp.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-C8SuNba2.js","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/opale-BoKhOc_y.js","assets/oreille-B1AMUmZh.js","assets/paie-du-5-Dd2RfJcG.js","assets/paie-du-5-DeJq-K_U.css","assets/paie-du-5-pur-B1c3d30P.js","assets/PaieParMtn-CKkdGAHa.js","assets/paliers-D1pWeOdW.js","assets/Parametres-B_eUSPkn.js","assets/parcours-Ebvk0KbE.js","assets/Parrainages-BoFqg6IH.js","assets/Parrainages-gAHAPB_6.css","assets/PassageAvantLeFauteuil-QQTEtU7b.js","assets/pdf-dK41qBeS.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/periode-des-pourboires-pur-BUWqfwov.js","assets/Personas-DTnAzjZ0.js","assets/Personnel-Dot5iGE4.js","assets/photo-Dg8xsaBA.js","assets/pilotage-D8kf1Co8.css","assets/Pourboires-_RGLg4VU.js","assets/Predictions-mc02TxOx.js","assets/Prestataires-D9zhuS5b.js","assets/Prets-BRZL03Xr.js","assets/PrevisionDuMois-B5DRtSlt.js","assets/PrevisionDuMois-DlFTw3OX.css","assets/Previsions-9BU2Vg1T.css","assets/Previsions-CRoYv5pK.js","assets/previsions-pur-BXUxzZ4_.js","assets/processus-pur-R6U5QcCi.js","assets/projets--7L6SzUR.js","assets/Projets-COO7WDEE.css","assets/Projets-DZvzwvVi.js","assets/projets-pur-2ZEMRNDU.js","assets/protocoles-CTeoHVKP.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-CaiP4DBC.js","assets/qualification-BE92yV_M.js","assets/quiz-5qMPWZVi.js","assets/Rapport-BcA6AU_U.js","assets/Recommandations-CufVTriR.js","assets/regler-BK1gMFeD.js","assets/regler-C5hcM02_.css","assets/regler-la-seance-serveur-Bs6rzqZX.js","assets/relances-pur-BacTXlI2.js","assets/releve-des-avis-gDZC3kq6.js","assets/SalonFoyer--zPO5v8b.js","assets/secretariat-admin-C0LYKtFH.js","assets/Secretariat-Cy79Zw30.css","assets/Secretariat-my2ut0SY.js","assets/Signatures-CW-YHHB4.js","assets/SignerUnPdf-Djz6-jMM.js","assets/Synthese-06R1UHpE.js","assets/SyntheseGraphes-W2Fa5pkx.js","assets/systeme-TPy-pF7j.css","assets/Tableau-rGs6SFlE.js","assets/temps-SndDUi7J.js","assets/Textes-DLpOzRbT.css","assets/Textes-r2vCTBWS.js","assets/tiroirs-CkDzpGy0.css","assets/tiroirs-D9XQsDBU.js","assets/trone-ByxMPQv4.js","assets/trone-wE0OFAgL.css","assets/useAudiences-CJYbJac9.js","assets/useClotureDuJour-DTd1ke74.js","assets/Vitrine-BWilTqQJ.css","assets/Vitrine-cYR0xFl4.js","assets/_admin-luVAiw9y.js","assets/_contrat-b6l-tKxJ.js","assets/_reuni-DvDuIDOe.js","assets/_shared-CvWTyKyp.js","assets/_signature-H4hMkH1z.js","assets/_ui-BrUDlmuM.css","assets/_ui-DMs-0HPo.js"];
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
