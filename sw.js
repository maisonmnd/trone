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
const BUILD = "20261009233836";
const A_GARDER = ["./","assets/abonnements-CxuVEF6s.js","assets/Abonnements-DcAun3NS.js","assets/Academie-88xHFAhc.js","assets/Acces-CYTd3I41.js","assets/actions-BUNVjjPW.js","assets/afaire-BIrZdUQT.js","assets/AFaire-BRXHe8Tb.js","assets/Analytics-CPC0T3up.js","assets/Appels-DispDwg1.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/bilan-B-bfPYR0.css","assets/bilan-CfmHsB-L.js","assets/BilanMensuel-C_xmLy5a.js","assets/bourse-C2mb5JHz.js","assets/Branches-DB-JVGmf.js","assets/bridges-Cia5dxli.js","assets/Caisse-DTjs-n2B.js","assets/caisse-du-soir-DvFguias.js","assets/Caisses-BzGi1l0F.js","assets/Calendrier-C4yh2Zbl.js","assets/Carnet-C8ZFzJSE.js","assets/carte-bzI8jQkn.js","assets/carte-WI2qP1su.css","assets/CarteModal-BGmnS5wL.js","assets/CartesCadeaux-Dt81QPz6.js","assets/Catalogue-D95niNKJ.js","assets/Cercle-CQs078tL.js","assets/certificat-CtCKwG3L.js","assets/certificat-DVSxho5e.css","assets/certificats-coffre-gmVQJC5P.js","assets/ClotureDuTiroir-C6vPx-E_.css","assets/ClotureDuTiroir-DxniUzZ1.js","assets/Coffre-DvFoHYXv.js","assets/components-C8yo9B7N.js","assets/compte-courant-ByzulCEN.js","assets/compte-OHm7io_F.js","assets/CompteCourant-cIt2mj5Q.js","assets/Comptes-CJfL2QZ3.js","assets/Comptoir-BfyzLRyp.js","assets/consultation-CCTm16qX.css","assets/consultation-eI4Z1nPH.js","assets/Consultations-DydCjgTJ.js","assets/consultNotes-CcpsHJc9.js","assets/Conversations-CD7Z6qQ7.js","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-tL32movg.js","assets/currency-CzN07T4P.js","assets/Customers-D57gjeXo.js","assets/Dashboard-1JH4JdeH.js","assets/dates-DcwFLfvh.js","assets/Demandes-CJp5K6Y7.js","assets/Depenses-BLl-Anom.js","assets/devise-fon-DX3P0bG4.woff2","assets/Encaissements-DYL8tKUF.js","assets/enfants-BYCqPO_t.js","assets/Engagements-Cj5S9MhG.css","assets/Engagements-KH1sigVT.js","assets/equipe-DpPyq6h-.css","assets/Evaluation-C93OdCoM.js","assets/FacturePrestataire-DreQN40g.js","assets/Factures-CYcOjVWg.js","assets/Fil-9zgc7RVe.js","assets/finances-CCjqAkCE.css","assets/Fournisseurs-HFiwCf46.js","assets/fournisseurs-Xj9L12QC.js","assets/foyer-Dc8xOSuC.js","assets/HomeRituals-B9W62PYD.js","assets/html2canvas.esm-QH1iLAAe.js","assets/identite-CBgLMpSX.js","assets/index-CkEeCj1_.js","assets/index.es-B5IgW2yI.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-DQAqYkE_.js","assets/jspdf.es.min-Dpj1_bdx.js","assets/JustePrix-LszV-qTZ.js","assets/kkiapay-BiUWWzer.js","assets/laboratoire-B4d-R4Lh.js","assets/Laboratoire-DXTfn0uS.js","assets/LettresAuDossier-BB4s--E1.js","assets/maisons-DZdAeMF9.js","assets/Marketing-klbDbWwW.js","assets/Marque-BiCRpeWH.js","assets/momo-C2ZVfV9J.js","assets/MonMois-LGNK_JS3.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-BkdSCNYv.js","assets/paliers-DvZ9Yrim.js","assets/Parametres-BSgKETxu.js","assets/parcours-cB8xjujy.js","assets/Parrainages-BTxdEX66.js","assets/Parrainages-gAHAPB_6.css","assets/pdf-Bvrk8Bmc.js","assets/Personas-D12NmClM.js","assets/Personnel-5tqa2dP-.js","assets/photo-B-ZQUW7c.js","assets/pilotage-DYbuDdJQ.css","assets/Predictions-BtONH4i4.js","assets/prestataires-CUkci0KU.js","assets/Prestataires-inRqtVV0.js","assets/Prets-BG6yYEzu.js","assets/promos-DnLnE1M-.js","assets/protocoles-BiuNKd97.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-BCPDfWR9.js","assets/quiz-5qMPWZVi.js","assets/Rapport-CWBPgyQ6.js","assets/RattacherUneCarte-DZqT7Hwq.js","assets/Recommandations-DytMGMNo.js","assets/SalonFoyer-B2kfStGW.js","assets/Secretariat-CcVzSRWI.js","assets/Synthese-B_N55JsZ.js","assets/systeme-C3XFIa8E.css","assets/Tableau-C-ymbZs7.js","assets/Textes-1AKCChgW.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-B9hYJBDS.js","assets/trone-BEunSaAf.js","assets/trone-Cn5sXo2w.css","assets/ui-BNXKvCz9.js","assets/vente-D0kdELDn.css","assets/Vitrine-B7zPc8ZO.js","assets/_contrat-CmZTuS2N.js","assets/_heures-BdyHzcMl.js","assets/_shared-xwGK9HJF.js","assets/_signature-C2_Pt0XB.js"];
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
