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
const BUILD = "20261006133806";
const A_GARDER = ["./","assets/Abonnements-BGBnQPzr.js","assets/abonnements-BgP9uHef.js","assets/Academie-DnrUHGPu.js","assets/Acces-BjH890zJ.js","assets/actions-BUw3kFNP.js","assets/AFaire-CAn7Eunn.js","assets/afaire-DlBT0KUB.js","assets/Analytics-CNY8coJO.js","assets/Appels-BV-sXM9H.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/bilan-B-bfPYR0.css","assets/bilan-tHootMPx.js","assets/BilanMensuel-mycLSUW2.js","assets/Branches-C1dBy-Ey.js","assets/bridges-W72QCJah.js","assets/Caisse-Bw4HwOfC.js","assets/caisse-du-soir-8bbO_0Ql.js","assets/Caisses-C8H3Jbqf.js","assets/Calendrier-Dh6_N2Ft.js","assets/Carnet-C1STkbgq.js","assets/carte-CXapndDr.css","assets/carte-DfkTBsi_.js","assets/CarteModal-C1eLKYw8.js","assets/CartesCadeaux-KnCnBfV8.js","assets/Catalogue-3ukhiXZ3.js","assets/Cercle-CRF4q3K6.js","assets/certificat-BIgsKAOa.css","assets/certificat-CvTEDpWn.js","assets/certificats-coffre-Bc4EJG0A.js","assets/ClotureDuTiroir-B37xCPqp.js","assets/ClotureDuTiroir-C6vPx-E_.css","assets/Coffre-DkgcVRvm.js","assets/components-CR-duSWQ.js","assets/compte-Bp4df2tN.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-CDGRu27l.js","assets/Comptes-BhNykZa6.js","assets/Comptoir-Cqeb2q8P.js","assets/consultation-CBrDR4Qn.js","assets/consultation-Dgb9KeZx.css","assets/Consultations-ucz-PV-m.js","assets/consultNotes-BHSy_O4a.js","assets/Conversations-BG8OPq6R.js","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-DYDee_dF.js","assets/currency-CzN07T4P.js","assets/Customers-CBzBmRco.js","assets/Dashboard-BSuDL6q-.js","assets/dates-f23H8Sgy.js","assets/Demandes-mOsfG5-Z.js","assets/Depenses-BIiqIVYa.js","assets/devise-fon-DX3P0bG4.woff2","assets/Encaissements-Bub2Tfol.js","assets/enfants-BHrcbMkA.js","assets/Engagements-BiVCAL7o.js","assets/Engagements-Cj5S9MhG.css","assets/equipe-DpPyq6h-.css","assets/Evaluation-Ba8RkXiK.js","assets/FacturePrestataire-BlnZGS0t.js","assets/Factures-B6Oxv-1c.js","assets/Fil-C9ysBn-H.js","assets/finances-CCjqAkCE.css","assets/fournisseurs-BGITuoFk.js","assets/Fournisseurs-DzLlGkui.js","assets/foyer-Nd8pyxh3.js","assets/HomeRituals-h46w0t4X.js","assets/html2canvas.esm-QH1iLAAe.js","assets/identite-D-wOCW38.js","assets/index.es-mibAewSg.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-CnIzg3d1.js","assets/jspdf.es.min-vzvRYAGD.js","assets/JustePrix-PQYHbbgG.js","assets/kkiapay-_SK4Cmbb.js","assets/Laboratoire-7dVyYIch.js","assets/laboratoire-D_4B3RvX.js","assets/LettresAuDossier-CpMB-28S.js","assets/maisons-DZdAeMF9.js","assets/Marketing-B9hmjszg.js","assets/Marque-C8WHMLDF.js","assets/momo-C2ZVfV9J.js","assets/MonMois-2HwaT9xW.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-DbxxQNyK.js","assets/paliers-CqgApk0c.js","assets/Parametres-CkncmJYk.js","assets/parcours-BwOWca1l.js","assets/Parrainages-BtxvJ_mG.css","assets/Parrainages-DOQ10uFW.js","assets/pdf-B5uNyYyi.js","assets/Personas-SfDaKY7Z.js","assets/Personnel-Cf8gH5Vu.js","assets/photo-CICnP9uk.js","assets/pilotage-oRv2N4FX.css","assets/Predictions-DRPxSIJR.js","assets/Prestataires-ClmdnYH-.js","assets/prestataires-ukNLZgm9.js","assets/Prets-D5-dBRbg.js","assets/promos-BDIz0TeV.js","assets/protocoles-D-bf8RKu.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-Bm-sC8Jq.js","assets/quiz-5qMPWZVi.js","assets/Rapport-koilI3Bl.js","assets/RattacherUneCarte-BionE1GT.js","assets/Recommandations-Fe-9xKd6.js","assets/SalonFoyer-BbdFzyTP.js","assets/Secretariat-Dj0IaL7H.js","assets/Synthese-CSvXvmaA.js","assets/systeme-C3XFIa8E.css","assets/Tableau-VOmxUlLO.js","assets/Textes-BYVI99yy.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-Ci-5Seie.js","assets/trone-C5-dn5jj.css","assets/trone-C7nxXa5s.js","assets/ui-BteQVpTY.js","assets/vente-D0kdELDn.css","assets/Vitrine-BBRqcBDg.js","assets/_contrat-Bq1nBqq2.js","assets/_heures-oj_ShGAq.js","assets/_shared-Bhd3wRMF.js","assets/_signature-DZAb4iYP.js"];
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
