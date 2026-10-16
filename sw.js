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
const BUILD = "20261016165324";
const A_GARDER = ["./","assets/abonnements-BwC4zrbP.js","assets/Abonnements-DmZAmPLg.js","assets/Academie-hlZs-5I7.js","assets/Acces-D6ZceSP3.js","assets/actions-Cu1FzhlP.js","assets/afaire-Crf-SbgY.js","assets/AFaire-CrSFBhv8.js","assets/Analytics-DUYLDpSw.js","assets/Appels-BIhfop49.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/AtelierDesContenus-Bi-bdnFe.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/Aujourdhui-v1-m6Non.js","assets/bilan-B-bfPYR0.css","assets/bilan-DEWELY3l.js","assets/BilanMensuel-EBq1FbXT.js","assets/Branches-DDe06CFC.js","assets/bridges-DKKr8zVJ.js","assets/Caisse-B8-nHTRu.js","assets/caisse-du-soir-BgcRg7jX.js","assets/Caisses-DR7_vb9s.js","assets/Calendrier-T5RiXSix.js","assets/Carnet-DCr48PJ3.js","assets/carte-B9kTy_m4.js","assets/carte-WI2qP1su.css","assets/CarteModal-jRKwYPhq.js","assets/CartesCadeaux-DQ-HbRVW.js","assets/Catalogue-BE8u-lrO.js","assets/CentreDeCommande-CJsG6_sT.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-iY-SewnZ.js","assets/certificat-6MJ6MSmG.js","assets/certificat-DVSxho5e.css","assets/certificats-coffre-DQsh15RM.js","assets/ChiffreDesPrestations-CfIrnKjR.js","assets/ClotureDuTiroir-BkUmQVzY.js","assets/ClotureDuTiroir-C6vPx-E_.css","assets/Coffre-Ca-uPwaG.js","assets/components-Bhm42jA7.js","assets/compte-courant-ByzulCEN.js","assets/compte-DV1GCETr.js","assets/CompteCourant-CA21R1rQ.js","assets/Comptes-Cjz87Z3s.js","assets/Comptoir-CsLoNlqS.js","assets/consultation-BS6Q6S64.js","assets/consultation-CCTm16qX.css","assets/Consultations-CZAUz2Bo.js","assets/consultNotes-BpQFYbsq.js","assets/Conversations-C38D6Xk7.js","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-CgsTSCa3.js","assets/currency-D4l65sA8.js","assets/Customers-Br3Qrn8V.js","assets/Dashboard-Co9iA7aX.js","assets/dates-CTE7GKMl.js","assets/Demandes-BIHI4Rye.js","assets/Depenses-B-7HnaEB.js","assets/devise-fon-DX3P0bG4.woff2","assets/encaissement-pur-BnRYeDEb.js","assets/Encaissements-BhFzcvaW.js","assets/enfants-BjmnbUCA.js","assets/Engagements-Cj5S9MhG.css","assets/Engagements-CYan2H4R.js","assets/EntreDeuxSeances-DAq53nnd.js","assets/equipe-DpPyq6h-.css","assets/Evaluation-U0HAGLy3.js","assets/FacturePrestataire-BbZE5LRI.js","assets/Factures-BiQDdZpi.js","assets/Fil-PdODYXew.js","assets/finances-CCjqAkCE.css","assets/Fournisseurs-BmiNnCDD.js","assets/fournisseurs-CL5LiZj9.js","assets/foyer-y7B3WiCn.js","assets/HomeRituals-Bsex9SFZ.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-BK4aYJMV.js","assets/identite-CJtGO3DF.js","assets/index-DrSKThGJ.js","assets/index.es-C_Ot9SYU.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-CYHrhj5l.js","assets/jspdf.es.min-y9LFwzMC.js","assets/JustePrix-DDwvcuEi.js","assets/kkiapay-DAKI6B2x.js","assets/laboratoire-Bk_EzhqK.js","assets/Laboratoire-BN6LqyRd.js","assets/LettresAuDossier-Cu70VVPz.js","assets/maisons-CSSFrqZy.js","assets/Marketing-CFYwz8Ws.js","assets/Marque-CfoUf0DP.js","assets/momo-C2ZVfV9J.js","assets/MonMois-ChM20qxm.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-1oEthu6t.js","assets/paliers-B9DZ5smA.js","assets/Parametres-BQpsSItV.js","assets/parcours-UxDMNDVx.js","assets/Parrainages-DB1t0f6p.js","assets/Parrainages-gAHAPB_6.css","assets/pdf-DRPjTTn2.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/Personas-CvrtRikf.js","assets/Personnel-BaAuDnty.js","assets/photo-CygCkJKG.js","assets/pilotage-Bn1gP_oo.css","assets/Predictions-2Ds51P45.js","assets/Prestataires-BLhI5c1o.js","assets/prestataires-CCa7KOMV.js","assets/Prets-DPJV1tRZ.js","assets/promos-D11Z1uGm.js","assets/protocoles-CB_-rwYZ.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-BbDIfiIw.js","assets/quiz-5qMPWZVi.js","assets/Rapport-amIf7wD9.js","assets/RattacherUneCarte-JZyq3Qii.js","assets/Recommandations-BX5cXOOh.js","assets/SalonFoyer-DI2AWjij.js","assets/secretariat-admin-Thp4-qk7.js","assets/Secretariat-gAD0Myn-.js","assets/Signatures-BkHU8hVI.js","assets/SignerUnPdf-200d-S7u.js","assets/Synthese-DqSSKcVd.js","assets/systeme-C3XFIa8E.css","assets/Tableau-ByivuLDu.js","assets/Textes-CE8NOJ6b.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-xhftTxnk.js","assets/trone-CyFdPxg0.css","assets/trone-DRHUDtbe.js","assets/ui-DxDECobR.js","assets/vente-D0kdELDn.css","assets/Vitrine-GXbnDtSZ.js","assets/_admin-B0hxrnux.js","assets/_contrat-DFvL6D_j.js","assets/_heures-hBHCQAFJ.js","assets/_reuni-BV2PsoZf.js","assets/_shared-Bg57Akvg.js","assets/_signature-Bm91RTBU.js","assets/_ui-BWMA-PlM.css","assets/_ui-CaW9ib5q.js"];
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
