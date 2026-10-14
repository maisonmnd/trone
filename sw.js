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
const BUILD = "20261014163556";
const A_GARDER = ["./","assets/abonnements-B27EQa1W.js","assets/Abonnements-CaRp7wI-.js","assets/Academie-BzVlGe30.js","assets/Acces-BIN90__U.js","assets/actions-Cd31JSOU.js","assets/afaire-B5q_8i1q.js","assets/AFaire-uSjkqDtb.js","assets/Analytics-DyvcpZBe.js","assets/Appels-DIvgdW6m.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/AtelierDesContenus-CFT2Qm1r.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/Aujourdhui-7i6m-tVT.js","assets/bilan-B-bfPYR0.css","assets/bilan-WstaeApa.js","assets/BilanMensuel-DEaF8o8e.js","assets/Branches-BiUtjJug.js","assets/bridges-S7D8Zpff.js","assets/Caisse-CmrUlhqa.js","assets/caisse-du-soir-Dqf8_iT6.js","assets/Caisses-B5VCsbMz.js","assets/Calendrier-h4Q9rOiD.js","assets/Carnet-AG1Us6Cw.js","assets/carte-CXWA1q2d.js","assets/carte-WI2qP1su.css","assets/CarteModal-COSCN_wg.js","assets/CartesCadeaux-H-MC5nTh.js","assets/Catalogue-4D6Q9erW.js","assets/CentreDeCommande-B9von3c0.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-D48sQzEE.js","assets/certificat-DlCZWUV5.js","assets/certificat-DVSxho5e.css","assets/certificats-coffre-BRrq9_yX.js","assets/ChiffreDesPrestations-cyD9AiDw.js","assets/ClotureDuTiroir-C6vPx-E_.css","assets/ClotureDuTiroir-DV0bSSeY.js","assets/Coffre-D1NwVBR1.js","assets/components-CyBrFjow.js","assets/compte-BKbVTxYf.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-tBHlDDCW.js","assets/Comptes-NasmNlo9.js","assets/Comptoir-B-vM2RvX.js","assets/consultation-CCTm16qX.css","assets/consultation-ksdsr_DV.js","assets/Consultations-Kan5k8VG.js","assets/consultNotes-BRRJ1yEM.js","assets/Conversations-BnPcDr0c.js","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-aaz2IGHI.js","assets/currency-CzN07T4P.js","assets/Customers-C3KGMU-5.js","assets/Dashboard-BDj7aZaN.js","assets/dates-CAsrHa59.js","assets/Demandes-B7fH0OgM.js","assets/Depenses-ZkGKVy4x.js","assets/devise-fon-DX3P0bG4.woff2","assets/encaissement-pur-Dz4irXVE.js","assets/Encaissements-D7IMnBVD.js","assets/enfants-3eweawDQ.js","assets/Engagements-BRbs2Tp4.js","assets/Engagements-Cj5S9MhG.css","assets/equipe-DpPyq6h-.css","assets/Evaluation-DithbmEQ.js","assets/FacturePrestataire-BI8oVpsx.js","assets/Factures-B-QPvPiP.js","assets/Fil-Bv7Ccpa2.js","assets/finances-CCjqAkCE.css","assets/fournisseurs-BlQh2TPr.js","assets/Fournisseurs-CXDm4gV4.js","assets/foyer-nf3-23mD.js","assets/HomeRituals-B1W5DCfC.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-BnBbRUqb.js","assets/identite-CcOJTXOD.js","assets/index-BzzT2GUb.js","assets/index.es-BRczQ9s6.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-BtodBJBA.js","assets/jspdf.es.min-DRKcJCy-.js","assets/JustePrix-DfDZ0ydB.js","assets/kkiapay-DpOS9Nwm.js","assets/laboratoire-BdwuWD01.js","assets/Laboratoire-Bic2-Hlh.js","assets/LettresAuDossier-BQen2qIP.js","assets/maisons-DZdAeMF9.js","assets/Marketing-CfPRQuFh.js","assets/Marque-eI_TJRio.js","assets/momo-C2ZVfV9J.js","assets/MonMois-B25m7nnx.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-Bn7lSgaV.js","assets/paliers-CQTIHEuM.js","assets/Parametres-CsGmyavL.js","assets/parcours-BeBR57q2.js","assets/Parrainages-CYvD_T2g.js","assets/Parrainages-gAHAPB_6.css","assets/pdf-Dg8LPFff.js","assets/Personas-CSnigk-F.js","assets/Personnel-CII3mYkH.js","assets/photo-VDi3pcxJ.js","assets/pilotage-CybSwMA-.css","assets/Predictions-CHudeAy8.js","assets/prestataires-ClmkTmiE.js","assets/Prestataires-D2Ymoij1.js","assets/Prets-SC1yXqHT.js","assets/promos-DqJNnpK1.js","assets/protocoles-Cm9UW8rm.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-D4KvCTKs.js","assets/quiz-5qMPWZVi.js","assets/Rapport-CWrEaQI9.js","assets/RattacherUneCarte-BB_mdznW.js","assets/Recommandations-C5ut_qmn.js","assets/SalonFoyer-Dtv1iy9G.js","assets/secretariat-admin-CXjyeqNP.js","assets/Secretariat-p5eNlssO.js","assets/Synthese-rvBV-eNG.js","assets/systeme-C3XFIa8E.css","assets/Tableau-CbF63F_v.js","assets/Textes-DLpOzRbT.css","assets/Textes-kVfygIfb.js","assets/tiroirs-BTYEpSe5.js","assets/trone-B20QIsqx.js","assets/trone-DnuuvbFM.css","assets/ui-BEpHfs-k.js","assets/vente-D0kdELDn.css","assets/Vitrine-Czqv4xCv.js","assets/_admin-D-oKGGIh.js","assets/_contrat-CgDQ6H-4.js","assets/_heures-D1Xe7HL3.js","assets/_shared-BbA9qsi6.js","assets/_signature-CCpmyZg6.js","assets/_ui-BWMA-PlM.css","assets/_ui-Dlkuqgnn.js"];
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
