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
const BUILD = "20261004162722";
const A_GARDER = ["./","assets/abonnements-BAg7eSq2.js","assets/Abonnements-DRmAcZ6j.js","assets/Academie-CqXQqIPI.js","assets/Acces-eMBGxQVU.js","assets/actions-SXjKelK1.js","assets/afaire-CeROj8U8.js","assets/AFaire-DoLo9j_j.js","assets/Analytics-gnorU04x.js","assets/Appels-Dgq-sKTw.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/bilan-B-bfPYR0.css","assets/bilan-BApL5BMq.js","assets/BilanMensuel-DNUYRCo8.js","assets/bilans-DLaPL_C7.js","assets/Branches-C6UeRas8.js","assets/bridges-C3npg-sR.js","assets/Caisse-CiX8Q-JB.js","assets/caisse-du-soir-DdrKGuHk.js","assets/Caisses-BkY_vQya.js","assets/Calendrier-CCet0ZrY.js","assets/Carnet-K9byOOWw.js","assets/carte-CXapndDr.css","assets/carte-DL-qONCT.js","assets/CarteModal-CSvAhsPJ.js","assets/CartesCadeaux-BsNOASb5.js","assets/Catalogue-T4XOj4Gr.js","assets/Cercle-BlPPo38x.js","assets/certificat-BIgsKAOa.css","assets/certificat-BiLQx_sY.js","assets/certificats-coffre-DH_yMjzd.js","assets/ClotureDuTiroir-C6vPx-E_.css","assets/ClotureDuTiroir-CtRi4_Cx.js","assets/Coffre-Cinx8Voi.js","assets/components-AjvFlL3O.js","assets/compte-courant-ByzulCEN.js","assets/compte-E9uBKp1P.js","assets/CompteCourant-m0WZGE28.js","assets/Comptes-NsJU-Nh6.js","assets/Comptoir-BqXZ7ylO.js","assets/consultation-59YXrUL-.js","assets/consultation-Dgb9KeZx.css","assets/Consultations-BL6N6Lsj.js","assets/consultNotes-s0RLhlCa.js","assets/Conversations-fUQjM3Q0.js","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-CbOW4ts7.js","assets/currency-CzN07T4P.js","assets/Customers-CotuyVsn.js","assets/Dashboard-Dv9WzEny.js","assets/dates-jyt_t_0S.js","assets/Demandes-CP87Dd5f.js","assets/Depenses-DQ3IaGDE.js","assets/devise-fon-DX3P0bG4.woff2","assets/Encaissements-DoDQ00Vb.js","assets/enfants-JNcCUbrR.js","assets/Engagements-BCFqLeFV.js","assets/Engagements-Cj5S9MhG.css","assets/equipe-DpPyq6h-.css","assets/Evaluation-Rq66FQzt.js","assets/FacturePrestataire-D9TK-PE_.js","assets/Factures-esBTlpM3.js","assets/Fil-02t3Xs9M.js","assets/finances-CCjqAkCE.css","assets/fournisseurs-CW1s9-cB.js","assets/Fournisseurs-DjWSAyOf.js","assets/foyer-Dx_qZCgm.js","assets/HomeRituals-C0vkqcwh.js","assets/html2canvas.esm-QH1iLAAe.js","assets/identite-DmTv_2qm.js","assets/index.es-Ax--NsCF.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-CgLMKzM-.js","assets/jspdf.es.min-BdJPiKuv.js","assets/JustePrix-iPI5Y-8g.js","assets/kkiapay-DG5Dc8gs.js","assets/Laboratoire-B4WnDiYS.js","assets/laboratoire-Bo5nhH1M.js","assets/LettresAuDossier-Br9iSZGJ.js","assets/maisons-DZdAeMF9.js","assets/Marketing-CbaAQOCr.js","assets/Marque-DYTCIUm-.js","assets/momo-C2ZVfV9J.js","assets/MonMois-Dl-8CbK7.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-CZQGs6me.js","assets/paliers-BroHJOTk.js","assets/Parametres-DidvGs5X.js","assets/parcours-CJQy1P7T.js","assets/Parrainages-BtxvJ_mG.css","assets/Parrainages-HJIZMo_Z.js","assets/pdf-CYNdbg8I.js","assets/Personas-3m5tQPmg.js","assets/Personnel-DULIYUO-.js","assets/photo-Bl41rnbC.js","assets/pilotage-CV1tnUgC.css","assets/Predictions-B71Dpbvu.js","assets/Prestataires-Dfv9Iatr.js","assets/prestataires-DiyqsNN6.js","assets/Prets-DdAE3JUr.js","assets/promos-LN_t_9sc.js","assets/protocoles-CMkXHlF-.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-CHv70RBL.js","assets/quiz-M3wxluxi.js","assets/Rapport--WZPZ6G2.js","assets/RattacherUneCarte-2DtXU4Po.js","assets/Recommandations-BYaU-jIt.js","assets/SalonFoyer-n4aED00Q.js","assets/Synthese-DZGCr8CR.js","assets/systeme-C3XFIa8E.css","assets/Tableau-Euk9tI5I.js","assets/Textes-DLpOzRbT.css","assets/Textes-O00NVpEE.js","assets/tiroirs-CAiC9adH.js","assets/trone-4sJYwpxb.js","assets/trone-C5-dn5jj.css","assets/ui-wE6u3kVP.js","assets/vente-D0kdELDn.css","assets/Vitrine-B5bB0oi6.js","assets/_contrat-BruO0qtB.js","assets/_heures-qnV2cYwt.js","assets/_shared-ByyhEDlE.js","assets/_signature-CSZHrInc.js"];
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
