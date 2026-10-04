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
const BUILD = "20261004183025";
const A_GARDER = ["./","assets/abonnements-CQue-EKm.js","assets/Abonnements-JZ67GZrh.js","assets/Academie-DlAjFBrO.js","assets/Acces-DA4nqsCx.js","assets/actions-CWv-IznF.js","assets/afaire-CWjBB0d7.js","assets/AFaire-pTrsp4Gw.js","assets/Analytics-Dg5AJ6Gi.js","assets/Appels-DdHqUPP2.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/bilan-B-bfPYR0.css","assets/bilan-Bi1DUC_a.js","assets/BilanMensuel-Dqg9ukwm.js","assets/bilans-LlDomL-3.js","assets/Branches-Dq_YrXsw.js","assets/bridges-CjxLiS1Z.js","assets/caisse-du-soir-DHwFohTy.js","assets/Caisse-DWfJb0sR.js","assets/Caisses-DgGHpEM-.js","assets/Calendrier-DVxNwlSo.js","assets/Carnet-CFoWrqZU.js","assets/carte-CXapndDr.css","assets/carte-DOGLHUMy.js","assets/CarteModal-D9C10IcV.js","assets/CartesCadeaux-BCAmjJO7.js","assets/Catalogue-K9tYpR94.js","assets/Cercle-BSUle43D.js","assets/certificat-BIgsKAOa.css","assets/certificat-_TPPf5_c.js","assets/certificats-coffre-oJwoCYJR.js","assets/ClotureDuTiroir-C6vPx-E_.css","assets/ClotureDuTiroir-CDyOcPhF.js","assets/Coffre-7rj4QL4V.js","assets/components-B0Hodrc1.js","assets/compte-courant-ByzulCEN.js","assets/compte-H-Qorh3y.js","assets/CompteCourant-CIezPsfl.js","assets/Comptes-DQo9Qccv.js","assets/Comptoir-Cz7eSwyY.js","assets/consultation-CSbvSpM-.js","assets/consultation-Dgb9KeZx.css","assets/Consultations-BCv8ZfdE.js","assets/consultNotes-B6xqIHiP.js","assets/Conversations-Cu0hT9qd.js","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-BbjL3_rG.js","assets/currency-CzN07T4P.js","assets/Customers-D0b5klFO.js","assets/Dashboard-D1PNHM_-.js","assets/dates-C6kpBVQq.js","assets/Demandes-CQFHZduu.js","assets/Depenses-p776VknH.js","assets/devise-fon-DX3P0bG4.woff2","assets/Encaissements-zd8hUHir.js","assets/enfants-BWAr38MB.js","assets/Engagements-Cj5S9MhG.css","assets/Engagements-IHbUe1Qz.js","assets/equipe-DpPyq6h-.css","assets/Evaluation-m1_abBy3.js","assets/FacturePrestataire-BTPYn5zN.js","assets/Factures-a2JG2xfu.js","assets/Fil-IBghtbit.js","assets/finances-CCjqAkCE.css","assets/Fournisseurs-B9fXXV2-.js","assets/fournisseurs-BoGCq7o7.js","assets/foyer-Cn48L_JN.js","assets/HomeRituals-VobC0Mrf.js","assets/html2canvas.esm-QH1iLAAe.js","assets/identite-DTrOyDn-.js","assets/index.es-smF90ett.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-wscI3Cpf.js","assets/jspdf.es.min-BDVJpUjd.js","assets/JustePrix-CzeYGrTy.js","assets/kkiapay-sno8Daev.js","assets/laboratoire-C_4fFa5-.js","assets/Laboratoire-DgFxxsw4.js","assets/LettresAuDossier-DWHv7nZG.js","assets/maisons-DZdAeMF9.js","assets/Marketing-DruwwMpS.js","assets/Marque-FaFKXGGZ.js","assets/momo-C2ZVfV9J.js","assets/MonMois-C23huLO1.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-DC1KFR-T.js","assets/paliers-5fxhaMar.js","assets/Parametres-4L6rVx8F.js","assets/parcours-CXrVOU_P.js","assets/Parrainages-BtxvJ_mG.css","assets/Parrainages-CFzCmmqo.js","assets/pdf-B-ohDn9Z.js","assets/Personas-_6rALnHp.js","assets/Personnel-Bu6cjr2C.js","assets/photo-CZAMQnb4.js","assets/pilotage-CV1tnUgC.css","assets/Predictions-BfqMHzYi.js","assets/Prestataires-BIYpFWJq.js","assets/prestataires-Dg_idFf4.js","assets/Prets-Us6KNApF.js","assets/promos-BvbQnGF2.js","assets/protocoles-CWsmg5RI.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-B08iNuvc.js","assets/quiz-5qMPWZVi.js","assets/Rapport-C1FjZ9xi.js","assets/RattacherUneCarte-mkcbuNPS.js","assets/Recommandations-DDn97dP2.js","assets/SalonFoyer-bms3kFpZ.js","assets/Synthese-hMcv6ztP.js","assets/systeme-C3XFIa8E.css","assets/Tableau-Dcxdrd-r.js","assets/Textes-CwxrpqZb.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-BS4nm1tX.js","assets/trone-BYvJGMye.js","assets/trone-C5-dn5jj.css","assets/ui-Bxz7qhDY.js","assets/vente-D0kdELDn.css","assets/Vitrine-D7TdWjJk.js","assets/_contrat-B5ip2OHJ.js","assets/_heures-l2i2qHi6.js","assets/_shared-d1nW1LcK.js","assets/_signature-xNCzG-73.js"];
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
