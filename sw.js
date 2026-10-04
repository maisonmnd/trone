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
const BUILD = "20261004110921";
const A_GARDER = ["./","assets/Abonnements-B2Tshhq2.js","assets/abonnements-CrqiIwS-.js","assets/Academie-B2YDN-sG.js","assets/Acces-2yYpk-0t.js","assets/actions-B1goGX5L.js","assets/afaire-BrJxQsTB.js","assets/AFaire-h0TD0CVX.js","assets/Analytics-BXTAaXRy.js","assets/Appels-Ep5Ggq5e.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/bilan-B-bfPYR0.css","assets/bilan-BP1CupKP.js","assets/BilanMensuel-B-CAw5GK.js","assets/bilans-BDlN2sKr.js","assets/Branches-DV-DWm_0.js","assets/bridges-DDggy8CW.js","assets/Caisse-BRDwBQRJ.js","assets/caisse-du-soir-CfUvxx1x.js","assets/Caisses-BkXKlrRg.js","assets/Calendrier-0nAaqS1E.js","assets/Carnet-M3Ym18tB.js","assets/carte-CXapndDr.css","assets/carte-DONO5QGf.js","assets/CarteModal-DhpTLgPR.js","assets/CartesCadeaux-Cc80LCIf.js","assets/Catalogue-CgGsPSbN.js","assets/Cercle-zC9K6XCl.js","assets/certificat-BIgsKAOa.css","assets/certificat-DrtOQ1mh.js","assets/certificats-coffre-DL0fdXvC.js","assets/ClotureDuTiroir-Bsp2kICs.js","assets/ClotureDuTiroir-C6vPx-E_.css","assets/Coffre-Cm3C7sWk.js","assets/components-Da8kL2rU.js","assets/compte-courant-ByzulCEN.js","assets/compte-CwiFub0n.js","assets/CompteCourant-CzW0-KEo.js","assets/Comptes-BTw6lcAR.js","assets/Comptoir-x0tPk_oU.js","assets/consultation-8IRfD0oH.js","assets/consultation-Dgb9KeZx.css","assets/Consultations-BnlWQTYC.js","assets/consultNotes-CakSqUP9.js","assets/Conversations-36wgOy1j.js","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-COkSREoB.js","assets/currency-CzN07T4P.js","assets/Customers-CTWWrtTH.js","assets/Dashboard-DUNldAJM.js","assets/dates-Bx8jbKjg.js","assets/Demandes-qMBtH4JE.js","assets/Depenses-BEoZcA6I.js","assets/devise-fon-DX3P0bG4.woff2","assets/Encaissements-B_f48drS.js","assets/enfants-CnxL8Ayg.js","assets/Engagements-Cj5S9MhG.css","assets/Engagements-q1gAkdU-.js","assets/equipe-DpPyq6h-.css","assets/Evaluation-CmedvBAZ.js","assets/FacturePrestataire-DHZeK9Eh.js","assets/Factures-WEEMVtrm.js","assets/Fil-BgxxwRy8.js","assets/finances-CCjqAkCE.css","assets/Fournisseurs-Bg-FTtP5.js","assets/fournisseurs-BkuipPil.js","assets/foyer-Brs31Prj.js","assets/HomeRituals-DwguGGtu.js","assets/html2canvas.esm-QH1iLAAe.js","assets/identite-B_sWo-3-.js","assets/index.es-BN-wOxyK.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-D-qdt8vH.js","assets/jspdf.es.min-B0Gl7eMO.js","assets/JustePrix-B8-7qxiF.js","assets/kkiapay-Bj8MuQAf.js","assets/Laboratoire-CH_zw3QN.js","assets/laboratoire-DAC5144L.js","assets/LettresAuDossier-rlYL8lZs.js","assets/maisons-DZdAeMF9.js","assets/Marketing-ehQ3pl5T.js","assets/Marque-kkUKJp2H.js","assets/momo-C2ZVfV9J.js","assets/MonMois-QG15lbq6.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-D0-52-I2.js","assets/paliers-gQP2mxeP.js","assets/Parametres-Xg5SSKWG.js","assets/parcours-CueUTP0m.js","assets/Parrainages-BtxvJ_mG.css","assets/Parrainages-CQd3Ch-g.js","assets/pdf-B3DxpQso.js","assets/Personas-CY6CWKYz.js","assets/Personnel-bR-ggIdc.js","assets/photo-u0hWrKSL.js","assets/pilotage-CV1tnUgC.css","assets/Predictions-B2NrDbf4.js","assets/prestataires-C1YNgBRd.js","assets/Prestataires-DTBcoNt6.js","assets/Prets-DRTRJQI7.js","assets/promos-DhQI06mF.js","assets/protocoles-DQ99kTgv.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-oPYlHwN4.js","assets/quiz-M3wxluxi.js","assets/Rapport-DlHpdtj7.js","assets/RattacherUneCarte-S9TqKZXp.js","assets/Recommandations-WN_YCMHt.js","assets/SalonFoyer-BcMOvxoN.js","assets/Synthese-BytfwiC0.js","assets/systeme-C3XFIa8E.css","assets/Tableau-BldqrzyE.js","assets/Textes-BIfu7u7r.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-BNMQkF2s.js","assets/trone-C0UrSwHN.js","assets/trone-C5-dn5jj.css","assets/ui-B8xGGA4o.js","assets/vente-D0kdELDn.css","assets/Vitrine-Bbxi8Rju.js","assets/_contrat-7POJMT4B.js","assets/_heures-Bi0YyTDU.js","assets/_shared-DBbRcDKh.js","assets/_signature-rVOO7uF_.js"];
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
