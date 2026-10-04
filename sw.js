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
const BUILD = "20261004083511";
const A_GARDER = ["./","assets/Abonnements-BEkfU5gd.js","assets/abonnements-Dtl1Hijb.js","assets/Academie-duUvVuc2.js","assets/Acces-C-9JpPz_.js","assets/actions-IBBYPhNR.js","assets/AFaire-D1QAC4ct.js","assets/afaire-gZN2XdP7.js","assets/Analytics-DYoajsxd.js","assets/Appels-D2mV3V-V.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/bilan-B-bfPYR0.css","assets/bilan-CF7AH2Od.js","assets/BilanMensuel-DnEAmdmx.js","assets/bilans-Chm_ifCy.js","assets/Branches-BCIonYE2.js","assets/bridges-BCk5Cah7.js","assets/Caisse-CmDbELou.js","assets/caisse-du-soir-8nsBa97C.js","assets/Caisses--118WQyA.js","assets/Calendrier-D89CEnaD.js","assets/Carnet-E9_SOZww.js","assets/carte-C7-5bDG7.js","assets/carte-CXapndDr.css","assets/CarteModal-TVRb0Ws-.js","assets/CartesCadeaux-BvU1ZBdK.js","assets/Catalogue-DbTxRMwV.js","assets/Cercle-D5r3sqKH.js","assets/certificat-BIgsKAOa.css","assets/certificat-DKr50yer.js","assets/certificats-coffre-CosjnL9E.js","assets/ClotureDuTiroir-C6vPx-E_.css","assets/ClotureDuTiroir-iR09i8ok.js","assets/Coffre-CEG-xIOq.js","assets/components-7jRTbvh5.js","assets/compte-courant-ByzulCEN.js","assets/compte-xkmkrsFH.js","assets/CompteCourant-BeAzREaZ.js","assets/Comptes-BmtTGCKB.js","assets/Comptoir-BWANEdV3.js","assets/consultation-43-AxZ7V.js","assets/consultation-Dgb9KeZx.css","assets/Consultations-Db8zvtns.js","assets/consultNotes-Cb2VcSrw.js","assets/Conversations-kYeDHdcm.js","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-D-Zigsqr.js","assets/currency-CzN07T4P.js","assets/Customers-B_ZxCNdQ.js","assets/Dashboard-BWwZlJ9l.js","assets/dates-B9WEZAaW.js","assets/Demandes-BknWJTUV.js","assets/Depenses-CEe9fqp0.js","assets/devise-fon-DX3P0bG4.woff2","assets/Encaissements-BNZW-oz5.js","assets/enfants-Dinqknhh.js","assets/Engagements-Cj5S9MhG.css","assets/Engagements-DYDjKu8Y.js","assets/equipe-DpPyq6h-.css","assets/Evaluation-DpI8WfSp.js","assets/FacturePrestataire-m67KhieV.js","assets/Factures-La-4w7r1.js","assets/Fil-BkFVNjD_.js","assets/finances-CCjqAkCE.css","assets/Fournisseurs-DljubwnD.js","assets/fournisseurs-YVsgqoyt.js","assets/foyer-BjbHMl2m.js","assets/HomeRituals-C9Cs-tjr.js","assets/html2canvas.esm-QH1iLAAe.js","assets/identite-CmI_tJc3.js","assets/index.es-DgXbtdD8.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-BnJNMYEH.js","assets/jspdf.es.min-D9-RqWXc.js","assets/JustePrix-Cg9h-J8R.js","assets/kkiapay-CL8pVhnS.js","assets/laboratoire-D-MHv5q1.js","assets/Laboratoire-D1OgiCEi.js","assets/LettresAuDossier-Cxl1rWp1.js","assets/maisons-DZdAeMF9.js","assets/Marketing-DlyLL5Gp.js","assets/Marque-B9WbWJvF.js","assets/momo-C2ZVfV9J.js","assets/MonMois-CRfE-_rM.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-BofjxBY-.js","assets/paliers-Di9JyqrJ.js","assets/Parametres-BUp_NgO1.js","assets/parcours-DxJnDrZm.js","assets/Parrainages-B2LBcZXd.js","assets/Parrainages-BtxvJ_mG.css","assets/pdf-BGro8fbe.js","assets/Personas-DPS5bTP3.js","assets/Personnel-Bv5XhFm7.js","assets/photo-Cg_-MLSO.js","assets/pilotage-CV1tnUgC.css","assets/Predictions-mZU5xb7j.js","assets/prestataires-BS791cMH.js","assets/Prestataires-NIyE342c.js","assets/Prets-DrcPrOxP.js","assets/promos-CFtcVIx2.js","assets/protocoles-D4aQp_na.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-Djde4Fgj.js","assets/quiz-M3wxluxi.js","assets/Rapport-COZ7o8gR.js","assets/RattacherUneCarte-k5398GWG.js","assets/Recommandations-CWOhUQcU.js","assets/SalonFoyer-BpXEH6j6.js","assets/Synthese-C6Udhqe9.js","assets/systeme-C3XFIa8E.css","assets/Tableau-BjDNh8xc.js","assets/Textes-B54U2VDE.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-iltdr21M.js","assets/trone-C5-dn5jj.css","assets/trone-PXwimRsk.js","assets/ui-DQ-0iECe.js","assets/vente-D0kdELDn.css","assets/Vitrine-BMNL0DKP.js","assets/_contrat-B8J64Ry9.js","assets/_heures-fIyYZbdV.js","assets/_shared-CTqvb9yS.js","assets/_signature-CkUu4L2p.js"];
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
