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
const BUILD = "20261007061555";
const A_GARDER = ["./","assets/abonnements-BYTrxskG.js","assets/Abonnements-B_A0FnjR.js","assets/Academie-zz7Vkmjb.js","assets/Acces-Mvl1-oCr.js","assets/actions-cjFNj8-l.js","assets/AFaire-DNw1NrvK.js","assets/afaire-DzGB7leo.js","assets/Analytics-D9Vrg7EG.js","assets/Appels-RGPp_y1N.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/bilan-B-bfPYR0.css","assets/bilan-CT_ock-r.js","assets/BilanMensuel-GsVjS6S5.js","assets/bourse-DTx6D-CX.js","assets/Branches-CcBM205a.js","assets/bridges-Bwp1qEOX.js","assets/caisse-du-soir-qE0m7hUv.js","assets/Caisse-IQ0xsie8.js","assets/Caisses-m17K2YTp.js","assets/Calendrier-oyB5aQV2.js","assets/Carnet-CzurM1Og.js","assets/carte-CXapndDr.css","assets/carte-DzizyBjq.js","assets/CarteModal-CZiJ9dsn.js","assets/CartesCadeaux-kCQjEmo3.js","assets/Catalogue-DO7crCju.js","assets/Cercle-DcAqELzo.js","assets/certificat-CyNbpgGx.css","assets/certificat-DeU5UhiE.js","assets/certificats-coffre-DS-9PSM2.js","assets/ClotureDuTiroir-BVDQbFtp.js","assets/ClotureDuTiroir-C6vPx-E_.css","assets/Coffre-8YgaGN1C.js","assets/components-BIafkVYI.js","assets/compte-BpzIzJD5.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-CRyUxs6-.js","assets/Comptes-Ci8Gnow2.js","assets/Comptoir-D0cYj8yv.js","assets/consultation-B61VD-dl.js","assets/consultation-Dgb9KeZx.css","assets/Consultations-B1g87x4e.js","assets/consultNotes-Yc9cj5R0.js","assets/Conversations-CG0vGeGH.js","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-BppaQo31.js","assets/currency-CzN07T4P.js","assets/Customers-BDNvHB4F.js","assets/Dashboard-DsgU4Luu.js","assets/dates-B5PIoEGY.js","assets/Demandes-DjGbotof.js","assets/Depenses-1SX1PGTg.js","assets/devise-fon-DX3P0bG4.woff2","assets/Encaissements-UItHcQh5.js","assets/enfants-Do2ePueU.js","assets/Engagements-Cj5S9MhG.css","assets/Engagements-Cu1_dfqw.js","assets/equipe-DpPyq6h-.css","assets/Evaluation-D7jHiywf.js","assets/FacturePrestataire-B_b5L0dH.js","assets/Factures-CF_AeOLS.js","assets/Fil-CwJuABtF.js","assets/finances-CCjqAkCE.css","assets/fournisseurs-Cfv6Hzy-.js","assets/Fournisseurs-Dxfivqxc.js","assets/foyer-CZMJs_C2.js","assets/HomeRituals-CiS-klfv.js","assets/html2canvas.esm-QH1iLAAe.js","assets/identite-CC7h9H0z.js","assets/index-kUi0PVUQ.js","assets/index.es-WowmEVsq.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-3OLdMN8W.js","assets/jspdf.es.min-CH8hv3cL.js","assets/JustePrix-BmZSdt_G.js","assets/kkiapay-DpNz6Er-.js","assets/Laboratoire-CYfSpw1F.js","assets/laboratoire-DsEHKMgz.js","assets/LettresAuDossier-DiNJ2bCr.js","assets/maisons-DZdAeMF9.js","assets/Marketing-CmuwmYid.js","assets/Marque-CW6gQr4Z.js","assets/momo-C2ZVfV9J.js","assets/MonMois-FTTXhw65.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-fNPIrMe7.js","assets/paliers-CjZ29sVD.js","assets/Parametres-Xfn4sB4Y.js","assets/parcours-CTpQOWw-.js","assets/Parrainages-BtxvJ_mG.css","assets/Parrainages-l5Xfm-0E.js","assets/pdf-CP0osNoM.js","assets/Personas-B2Dz4jih.js","assets/Personnel-DxIPGdmk.js","assets/photo-CLHJcgIN.js","assets/pilotage-DYbuDdJQ.css","assets/Predictions-BAeo6-tg.js","assets/prestataires-D6ygeooW.js","assets/Prestataires-yraHjfT7.js","assets/Prets-ChmhGh1e.js","assets/promos-BvfZY-ij.js","assets/protocoles-C-si--XG.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-D9pRmwJq.js","assets/quiz-5qMPWZVi.js","assets/Rapport-CEv_aTg9.js","assets/RattacherUneCarte-DDeldokl.js","assets/Recommandations-DCH4xiuh.js","assets/SalonFoyer-Bch_Pmr4.js","assets/Secretariat-CTGC-Clf.js","assets/Synthese-Dw7MQit6.js","assets/systeme-C3XFIa8E.css","assets/Tableau-AGIazzY6.js","assets/Textes-DLpOzRbT.css","assets/Textes-TwrFQrq6.js","assets/tiroirs-BHfUUugK.js","assets/trone-BhA9EI58.js","assets/trone-C5-dn5jj.css","assets/ui-CQGCmDgI.js","assets/vente-D0kdELDn.css","assets/Vitrine-CT4LRa51.js","assets/_contrat-DR8q6jfv.js","assets/_heures-DvcqFvui.js","assets/_shared-BQ9BXDZf.js","assets/_signature-Dprn0vlf.js"];
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
