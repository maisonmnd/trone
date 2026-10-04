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
const BUILD = "20261004230502";
const A_GARDER = ["./","assets/abonnements-CjF767Ns.js","assets/Abonnements-DN9qGCWI.js","assets/Academie-CcHkhl1B.js","assets/Acces-vg0WMx5_.js","assets/actions-4GB42bop.js","assets/AFaire-cjZYUL3Q.js","assets/afaire-DxjbZn88.js","assets/Analytics-CFhYWO3p.js","assets/Appels-CmP_ZA8R.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/bilan-B-bfPYR0.css","assets/bilan-BcwFe3ou.js","assets/BilanMensuel-Dj_yU-9e.js","assets/Branches-BjGYOXNG.js","assets/bridges-B86BRQCf.js","assets/Caisse-CZUaSs7s.js","assets/caisse-du-soir-Des87sPg.js","assets/Caisses-6gGrCJsh.js","assets/Calendrier-bzXN3VNp.js","assets/Carnet-BNixPZjv.js","assets/carte-Cq65n6u_.js","assets/carte-CXapndDr.css","assets/CarteModal-DPKy70CU.js","assets/CartesCadeaux-D00JqZzN.js","assets/Catalogue-Bic_a_bT.js","assets/Cercle-CVNl2JEY.js","assets/certificat-BIgsKAOa.css","assets/certificat-hxe1FRNw.js","assets/certificats-coffre-DOsfptuQ.js","assets/ClotureDuTiroir-B_SapZof.js","assets/ClotureDuTiroir-C6vPx-E_.css","assets/Coffre-ComleKUZ.js","assets/components-9dNpUW71.js","assets/compte-courant-ByzulCEN.js","assets/compte-DuZUb5G9.js","assets/CompteCourant-Q0Lgv0hS.js","assets/Comptes-78HVjDUe.js","assets/Comptoir-DLBgriDK.js","assets/consultation-Dgb9KeZx.css","assets/consultation-JQmzpzJc.js","assets/Consultations-N000ogDL.js","assets/consultNotes-DSTDuTL9.js","assets/Conversations-jU5U07u-.js","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-DtHCtfCS.js","assets/currency-CzN07T4P.js","assets/Customers-Ob77N5Hj.js","assets/Dashboard-BM6Ft0Ja.js","assets/dates-rArOygcc.js","assets/Demandes-DLZJTqUM.js","assets/Depenses-C-x9MmW1.js","assets/devise-fon-DX3P0bG4.woff2","assets/Encaissements-CfshovPv.js","assets/enfants-B2lu05Q6.js","assets/Engagements-Cj5S9MhG.css","assets/Engagements-Dfg61Gtt.js","assets/equipe-DpPyq6h-.css","assets/Evaluation-DXUUFCDC.js","assets/FacturePrestataire-BjmYTSqq.js","assets/Factures-CGqx0q0o.js","assets/Fil-BIJlkWDa.js","assets/finances-CCjqAkCE.css","assets/Fournisseurs-C81FLiPn.js","assets/fournisseurs-CvJiqEqq.js","assets/foyer-DnuYkklZ.js","assets/HomeRituals-s1TVg_VL.js","assets/html2canvas.esm-QH1iLAAe.js","assets/identite-Bd75K_kA.js","assets/index.es-CNJbiZE0.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-DdewN7oE.js","assets/jspdf.es.min-B85QKXck.js","assets/JustePrix-UFwul860.js","assets/kkiapay-CFd-QowO.js","assets/laboratoire-Cs9FWQJM.js","assets/Laboratoire-CzSBVl_l.js","assets/LettresAuDossier-BneSm5cf.js","assets/maisons-DZdAeMF9.js","assets/Marketing-B6qdgTCM.js","assets/Marque-CJVwvWOT.js","assets/momo-C2ZVfV9J.js","assets/MonMois-CUhdVc6b.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-DFvaXMQi.js","assets/paliers-CITi4DWp.js","assets/Parametres-BQXPuTAA.js","assets/parcours-Y0Y2ul3-.js","assets/Parrainages-BtxvJ_mG.css","assets/Parrainages-P0j3O15j.js","assets/pdf-DFjdGbn7.js","assets/Personas-BNx6-U1w.js","assets/Personnel-Dss_dsr6.js","assets/photo-BIzwHZyN.js","assets/pilotage-CV1tnUgC.css","assets/Predictions-Coc6xNyq.js","assets/Prestataires-BKXRaStn.js","assets/prestataires-UXJsgaKq.js","assets/Prets-Cftz37Z0.js","assets/promos-BTVJXZc2.js","assets/protocoles-DsId7PGI.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-b3JjNwbb.js","assets/quiz-5qMPWZVi.js","assets/Rapport-FzQMJL7a.js","assets/RattacherUneCarte-D08aowiF.js","assets/Recommandations-BQwZCXKe.js","assets/SalonFoyer-Cy_7GDkA.js","assets/Synthese-CPwgkaRF.js","assets/systeme-C3XFIa8E.css","assets/Tableau-CfZAbIak.js","assets/Textes-CVdakggS.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-B2Rtlwk0.js","assets/trone-C5-dn5jj.css","assets/trone-DGg19Ua1.js","assets/ui-e-l0rdkY.js","assets/vente-D0kdELDn.css","assets/Vitrine-BXPIFv9u.js","assets/_contrat-UqpSGsnz.js","assets/_heures-B_wCXGjS.js","assets/_shared-B3GytIm7.js","assets/_signature-Bi0A63la.js"];
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
