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
const BUILD = "20261004100858";
const A_GARDER = ["./","assets/Abonnements-B2swfGYA.js","assets/abonnements-CgIYc61x.js","assets/Academie-CIcaVvsF.js","assets/Acces-Dg1NpmuX.js","assets/actions-DBjuMwx0.js","assets/AFaire-Cvji0Gjk.js","assets/afaire-UbLvd4co.js","assets/Analytics-CW6iPoKR.js","assets/Appels-CBI9dNXZ.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/bilan-B-bfPYR0.css","assets/bilan-BSuyIKEp.js","assets/BilanMensuel-VT_6Lrni.js","assets/bilans-B0L3nksD.js","assets/Branches-ecyqtZy0.js","assets/bridges-BJj1dOoU.js","assets/Caisse-Bokbt07X.js","assets/caisse-du-soir-Bt_zW-wg.js","assets/Caisses-CLLYIc_k.js","assets/Calendrier-Ff9VFo18.js","assets/Carnet-D1e0JhiI.js","assets/carte-CXapndDr.css","assets/carte-DLvvnsLB.js","assets/CarteModal-Dkc5A_IO.js","assets/CartesCadeaux-6kHANS_V.js","assets/Catalogue-smrAX9yf.js","assets/Cercle-DJ42yEND.js","assets/certificat-BIgsKAOa.css","assets/certificat-Bm1xwuqG.js","assets/certificats-coffre-CgZIqoTO.js","assets/ClotureDuTiroir-BN35Ht80.js","assets/ClotureDuTiroir-C6vPx-E_.css","assets/Coffre-Bd0P8Er0.js","assets/components-CyYUBe5S.js","assets/compte-courant-ByzulCEN.js","assets/compte-U6EZHwtN.js","assets/CompteCourant-CfLRazLK.js","assets/Comptes-BRXlg-LY.js","assets/Comptoir-DiS7gIpo.js","assets/consultation-Dgb9KeZx.css","assets/consultation-NeVDe1p_.js","assets/Consultations-iw0cVkbM.js","assets/consultNotes-CwKDNn8X.js","assets/Conversations-C4U-QtmV.js","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-Dwrrl101.js","assets/currency-CzN07T4P.js","assets/Customers-CR_nrH4n.js","assets/Dashboard-DzwcASf9.js","assets/dates-XQjrNetN.js","assets/Demandes-CzPpW2C5.js","assets/Depenses-_eV2va2K.js","assets/devise-fon-DX3P0bG4.woff2","assets/Encaissements-Coa6CMyG.js","assets/enfants-BVaL8rag.js","assets/Engagements-Cj5S9MhG.css","assets/Engagements-rPi980bd.js","assets/equipe-DpPyq6h-.css","assets/Evaluation-CVtIlu30.js","assets/FacturePrestataire-ytnTyePF.js","assets/Factures-BddswLoG.js","assets/Fil-SSsupo3G.js","assets/finances-CCjqAkCE.css","assets/Fournisseurs-BOYfqTjq.js","assets/fournisseurs-F8bz8Rzy.js","assets/foyer-Bg3vKBBX.js","assets/HomeRituals-CBNyGIMF.js","assets/html2canvas.esm-QH1iLAAe.js","assets/identite-zkLvjvG2.js","assets/index.es-B6NN_4Gv.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-d8lKLrZ4.js","assets/jspdf.es.min-DNKW9KWI.js","assets/JustePrix-CYo5eyD2.js","assets/kkiapay-C60sTNcj.js","assets/Laboratoire-B6b_0xvz.js","assets/laboratoire-z_ttI_83.js","assets/LettresAuDossier-DVT_HMuV.js","assets/maisons-DZdAeMF9.js","assets/Marketing-BtKPlc58.js","assets/Marque-CmPHbZ98.js","assets/momo-C2ZVfV9J.js","assets/MonMois-B43LbTeb.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-ClMy_YYb.js","assets/paliers-0W_QthEN.js","assets/Parametres-CfvROKsW.js","assets/parcours-BnF529fq.js","assets/Parrainages-BtxvJ_mG.css","assets/Parrainages-CfnNrU4h.js","assets/pdf-BgYRlSah.js","assets/Personas-DNJE5KOr.js","assets/Personnel-BaXcDH4_.js","assets/photo-Bv3un1qH.js","assets/pilotage-CV1tnUgC.css","assets/Predictions-j_nsfutV.js","assets/prestataires-3i6pHdo3.js","assets/Prestataires-CuqSGyLN.js","assets/Prets-CThhHuCf.js","assets/promos-lkktZS8l.js","assets/protocoles-CbVTcuLW.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-BpHDFh2v.js","assets/quiz-M3wxluxi.js","assets/Rapport-BwVT3-zy.js","assets/RattacherUneCarte-G6Xr_nJY.js","assets/Recommandations-DmgtnRMJ.js","assets/SalonFoyer-CmLy9B3T.js","assets/Synthese-B7MhT96P.js","assets/systeme-C3XFIa8E.css","assets/Tableau-B7NQ2kWW.js","assets/Textes-BMm34hB5.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-D-woZRCY.js","assets/trone-C5-dn5jj.css","assets/trone-Co-rr9um.js","assets/ui-uUfMf9hS.js","assets/vente-D0kdELDn.css","assets/Vitrine-PjiaU061.js","assets/_contrat-WdydpbBF.js","assets/_heures-DfELRxpB.js","assets/_shared-BLFVdKFV.js","assets/_signature-BU7AU-D8.js"];
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
