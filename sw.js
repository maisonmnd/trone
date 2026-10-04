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
const BUILD = "20261004122022";
const A_GARDER = ["./","assets/Abonnements-BLDzMb3f.js","assets/abonnements-eGkmuG-H.js","assets/Academie-DRRzL6Im.js","assets/Acces-Bjx7FiTN.js","assets/actions-DtmD0_GA.js","assets/AFaire-Bc_lR_HR.js","assets/afaire-DcT2E_DC.js","assets/Analytics-Df_fOz7L.js","assets/Appels-DCNEKvgi.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/bilan-B-bfPYR0.css","assets/bilan-gYkzX5nA.js","assets/BilanMensuel-BYfBvk3f.js","assets/bilans-7rX8HlUt.js","assets/Branches-BVMax8eu.js","assets/bridges-DhX8odPG.js","assets/Caisse-DpaT9cku.js","assets/caisse-du-soir-DcZ-Gwxg.js","assets/Caisses-DgPXtc4x.js","assets/Calendrier-Bur94SX3.js","assets/Carnet-13_8Phhx.js","assets/carte-CO-5AJJ9.js","assets/carte-CXapndDr.css","assets/CarteModal-9mOALgvI.js","assets/CartesCadeaux-GbztrXhA.js","assets/Catalogue-CM9sj2Ag.js","assets/Cercle-CEFMK_lL.js","assets/certificat-BIgsKAOa.css","assets/certificat-w3BXrRlm.js","assets/certificats-coffre-p0_CjB-h.js","assets/ClotureDuTiroir-C6vPx-E_.css","assets/ClotureDuTiroir-Pcgyl6z3.js","assets/Coffre-WTFHJuwT.js","assets/components-CWBtKwdC.js","assets/compte-courant-ByzulCEN.js","assets/compte-D9vvRIzc.js","assets/CompteCourant-DOSbi5hf.js","assets/Comptes-DPsJD9pZ.js","assets/Comptoir-Bl1aRzbJ.js","assets/consultation-Dgb9KeZx.css","assets/consultation-mG7LkU1z.js","assets/Consultations-BLdmEGhk.js","assets/consultNotes-DyMG6M8r.js","assets/Conversations-DdK3GL9y.js","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-BBjYSSXt.js","assets/currency-CzN07T4P.js","assets/Customers-Duo-2Waq.js","assets/Dashboard-Ab1VXMeK.js","assets/dates-CRBKhWMA.js","assets/Demandes-CRj8YRSv.js","assets/Depenses-BF_6l6M7.js","assets/devise-fon-DX3P0bG4.woff2","assets/Encaissements-Dw33OQSE.js","assets/enfants-1knUAa6s.js","assets/Engagements-BHEAObUc.js","assets/Engagements-Cj5S9MhG.css","assets/equipe-DpPyq6h-.css","assets/Evaluation-BQail1bs.js","assets/FacturePrestataire-BU8fC4h0.js","assets/Factures-DsyRNR3s.js","assets/Fil-CjLnXS0v.js","assets/finances-CCjqAkCE.css","assets/Fournisseurs-OeuGabhw.js","assets/fournisseurs-vy6nBbd2.js","assets/foyer-CEibKsRI.js","assets/HomeRituals-C2i5NIz5.js","assets/html2canvas.esm-QH1iLAAe.js","assets/identite-sM4JcI2-.js","assets/index.es-Euiln-o-.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-BfLwKRMJ.js","assets/jspdf.es.min-Cr0iDfZb.js","assets/JustePrix-CcoNndxa.js","assets/kkiapay-nkGV76Jn.js","assets/Laboratoire-CQ8cf6a0.js","assets/laboratoire-dn0_bHgy.js","assets/LettresAuDossier-DouIDhcc.js","assets/maisons-DZdAeMF9.js","assets/Marketing-CqbHhcEU.js","assets/Marque-CYfcm3u8.js","assets/momo-C2ZVfV9J.js","assets/MonMois-lhT2g_4b.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-CENb3FeQ.js","assets/paliers-D1u0VZ9G.js","assets/Parametres-DvpdFHPD.js","assets/parcours-b_zwOA7V.js","assets/Parrainages-BtxvJ_mG.css","assets/Parrainages-D-NXLfHT.js","assets/pdf-amPU_M3n.js","assets/Personas-lq_zHsLJ.js","assets/Personnel-mIT2VBT6.js","assets/photo-B5hn6pB3.js","assets/pilotage-CV1tnUgC.css","assets/Predictions-arF0J9ur.js","assets/Prestataires-Cpr4Jn-V.js","assets/prestataires-CRBi-dHU.js","assets/Prets-DH68XbUg.js","assets/promos-BhPhj42p.js","assets/protocoles-MfweBXcT.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-DQ4Ev5jI.js","assets/quiz-M3wxluxi.js","assets/Rapport-29XN0S5s.js","assets/RattacherUneCarte-BWf3FcaR.js","assets/Recommandations-B5UZ8PPr.js","assets/SalonFoyer-jhFGX7T6.js","assets/Synthese-BkO-dzPi.js","assets/systeme-C3XFIa8E.css","assets/Tableau-adNknnE7.js","assets/Textes-D5oFW_Mf.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-DmORXR5k.js","assets/trone-C5-dn5jj.css","assets/trone-VXc3rPHD.js","assets/ui-BNzi8zM0.js","assets/vente-D0kdELDn.css","assets/Vitrine-DnRkgKaL.js","assets/_contrat-DFzL2sUT.js","assets/_heures-D1_AEd_l.js","assets/_shared-D_aPp5Ys.js","assets/_signature-B3YL7NQ2.js"];
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
