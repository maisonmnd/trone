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
const BUILD = "20261004101801";
const A_GARDER = ["./","assets/Abonnements-Dl1D45kU.js","assets/abonnements-qGUx1358.js","assets/Academie-DydESgP9.js","assets/Acces-Dtk1TLTk.js","assets/actions-FpIW1qF5.js","assets/afaire-CFECkCOQ.js","assets/AFaire-DvP3kZgP.js","assets/Analytics-C6sBH-FL.js","assets/Appels-COALnUtk.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/bilan-B-bfPYR0.css","assets/bilan-BQrx-mn5.js","assets/BilanMensuel-P1nKHsFG.js","assets/bilans-CfVDPIcO.js","assets/Branches-D3ukU7SO.js","assets/bridges-vlC9Xapf.js","assets/Caisse-BoxrpvP6.js","assets/caisse-du-soir-CAzGT5Av.js","assets/Caisses-DIiQsDLt.js","assets/Calendrier-BZjKiGmi.js","assets/Carnet-Do7RzaKG.js","assets/carte-CXapndDr.css","assets/carte-EFJpSbOP.js","assets/CarteModal-Bvw-dN8I.js","assets/CartesCadeaux-m7MKIEwy.js","assets/Catalogue-CA5cob-3.js","assets/Cercle-COzTb2fY.js","assets/certificat-BIgsKAOa.css","assets/certificat-BvYWc_wO.js","assets/certificats-coffre-CLOtL0rj.js","assets/ClotureDuTiroir-BgHPnp-a.js","assets/ClotureDuTiroir-C6vPx-E_.css","assets/Coffre-bOZofPPZ.js","assets/components-BIPNVVzX.js","assets/compte-courant-ByzulCEN.js","assets/compte-CqcLIsaz.js","assets/CompteCourant-BU5U_Nw7.js","assets/Comptes-DXyDgtxe.js","assets/Comptoir-fD5t2_vk.js","assets/consultation-CA3qQSTq.js","assets/consultation-Dgb9KeZx.css","assets/Consultations-Cq-1Swc6.js","assets/consultNotes-DbswUz3W.js","assets/Conversations-BC7ZqS-R.js","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-BuRsf4t_.js","assets/currency-CzN07T4P.js","assets/Customers-CDDhWuaa.js","assets/Dashboard-DKyMXMFt.js","assets/dates-CzmlrnNl.js","assets/Demandes-DAgBn8H0.js","assets/Depenses-D0Ivsecc.js","assets/devise-fon-DX3P0bG4.woff2","assets/Encaissements-0tjByo8L.js","assets/enfants-DYB4YSa5.js","assets/Engagements-Cj5S9MhG.css","assets/Engagements-njsDAOLB.js","assets/equipe-DpPyq6h-.css","assets/Evaluation-BEc446Kw.js","assets/FacturePrestataire-CUD3Bx71.js","assets/Factures-m1xjTqtI.js","assets/Fil-3qVVfva9.js","assets/finances-CCjqAkCE.css","assets/Fournisseurs-CEWytREu.js","assets/fournisseurs-DLaX1TuE.js","assets/foyer-75_4D0MG.js","assets/HomeRituals-CcDiqKTj.js","assets/html2canvas.esm-QH1iLAAe.js","assets/identite-C3XN39q9.js","assets/index.es-DWj5Aowf.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-BzzgjUOa.js","assets/jspdf.es.min-C4QdraWE.js","assets/JustePrix-elHrKhQl.js","assets/kkiapay-BrVyuGjH.js","assets/laboratoire-BzKd3hoU.js","assets/Laboratoire-DIEvNTbM.js","assets/LettresAuDossier-BEaYVUIl.js","assets/maisons-DZdAeMF9.js","assets/Marketing-BXAm-2yU.js","assets/Marque-BYb3yS8Y.js","assets/momo-C2ZVfV9J.js","assets/MonMois-DUlIJw86.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-BeuUL3am.js","assets/paliers-ByAYEKH6.js","assets/Parametres-DIKmT1Uq.js","assets/parcours-BSxViQ9-.js","assets/Parrainages-BtxvJ_mG.css","assets/Parrainages-DKQn3tMj.js","assets/pdf-DT5t4ff7.js","assets/Personas-CNXziFYM.js","assets/Personnel-QQ8Cqwwe.js","assets/photo-CjPiT57Q.js","assets/pilotage-CV1tnUgC.css","assets/Predictions-DOsnOpqv.js","assets/prestataires-CENhjYUv.js","assets/Prestataires-xj8Fiw9L.js","assets/Prets-DJbSxYuH.js","assets/promos-0xyjAgEB.js","assets/protocoles-ieDkxoPG.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-C42ctxzu.js","assets/quiz-M3wxluxi.js","assets/Rapport-BEvxnIDH.js","assets/RattacherUneCarte-CEork2NA.js","assets/Recommandations-BOByNI08.js","assets/SalonFoyer-CErcJ6po.js","assets/Synthese-C9iuL-M2.js","assets/systeme-C3XFIa8E.css","assets/Tableau-CY7rW56m.js","assets/Textes-BOEDAX1a.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-CiMCYOJv.js","assets/trone-C5-dn5jj.css","assets/trone-CfZ_fNyi.js","assets/ui-CtxOGGW4.js","assets/vente-D0kdELDn.css","assets/Vitrine-BZ1dxAtL.js","assets/_contrat-DrO6F7yE.js","assets/_heures-DeKMeWIm.js","assets/_shared-DZhaiKlN.js","assets/_signature-CnSsnM_f.js"];
const ACTIF = !BUILD.startsWith('__');
const CACHE_APP = `mnd-app-${BUILD}`;
const CACHE_IMAGES = 'mnd-images';
const DELAI_PAGE_MS = 4000;

const portee = () => self.registration.scope;

self.addEventListener('install', (event) => {
  self.skipWaiting();
  if (!ACTIF) return;
  /* Fichier par fichier : un seul absent ne doit pas tout faire échouer. */
  event.waitUntil(caches.open(CACHE_APP).then((c) => Promise.allSettled(
    A_GARDER.map((u) => c.add(new Request(new URL(u, portee()).href, { cache: 'reload' }))),
  )));
});

self.addEventListener('activate', (event) => event.waitUntil((async () => {
  if (ACTIF) {
    const noms = await caches.keys();
    await Promise.all(noms.filter((n) => n.startsWith('mnd-app-') && n !== CACHE_APP).map((n) => caches.delete(n)));
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
          const c = await caches.open(CACHE_APP);
          void c.put(page, r.clone());
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
