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
const BUILD = "20261018105120";
const A_GARDER = ["./","assets/Abonnements-Dfg0ZLIY.js","assets/abonnements-PM6m3HIh.js","assets/Academie-DT7bG1Sn.js","assets/Acces-BIDomTd1.js","assets/actions-BifhwMz2.js","assets/afaire-B8yNpeZg.js","assets/AFaire-DIpCc4GG.js","assets/Analytics-DnnxScza.js","assets/Appels-DEk6H-pt.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/AtelierDesContenus-DB_p49Bi.js","assets/Aujourdhui-BRhMrdhH.js","assets/bilan-B-bfPYR0.css","assets/bilan-Bf5DpNPt.js","assets/BilanMensuel-rXqYmMCW.js","assets/Branches-BqWjAR91.js","assets/bridges-CIOlHfcs.js","assets/Caisse-DDx53v9k.js","assets/caisse-du-soir-BRj7Nh4I.js","assets/Caisses-C14Ca1Bj.js","assets/Calendrier-BuQzwK5q.js","assets/Carnet-haVQmg3I.js","assets/carte-BzCPfppX.js","assets/carte-WI2qP1su.css","assets/CarteModal-B9dSTx_g.js","assets/CartesCadeaux-CxA1Z0gL.js","assets/Catalogue-D-E68gTG.js","assets/CentreDeCommande-CqFo3H4O.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-CEbeHl4Z.js","assets/certificat-DKie8myC.js","assets/certificat-DVSxho5e.css","assets/certificats-coffre-D-W_Sz3t.js","assets/ChiffreDesPrestations-Dzk6DIGm.js","assets/ClotureDuTiroir-C6vPx-E_.css","assets/ClotureDuTiroir-rkPQ_2P_.js","assets/Coffre-C5qg_Am3.js","assets/components-D5CSUHy8.js","assets/compte-BCVmmj5L.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-NaP3xmH5.js","assets/Comptes-BxMK22r7.js","assets/Comptoir-G5cj2qOT.js","assets/consultation-BKGs4eju.js","assets/consultation-CCTm16qX.css","assets/Consultations-BsOfpImb.js","assets/consultNotes-Bmp194_E.js","assets/Conversations-BOXsUvav.js","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-Bkb2uuou.js","assets/currency-qfIhGmrs.js","assets/Customers-Cq1yHWDC.js","assets/Dashboard-C6WW3YPx.js","assets/dates-GAi1sFpo.js","assets/Demandes-62MvGh9u.js","assets/Depenses-CUqTgsCb.js","assets/devise-fon-DX3P0bG4.woff2","assets/encaissement-pur-BQTZY-0X.js","assets/Encaissements-C1p0WUVY.js","assets/enfants-BfiMFWzM.js","assets/Engagements-Cj5S9MhG.css","assets/Engagements-DkY99Xh-.js","assets/EntreDeuxSeances-C5MbwvJJ.js","assets/equipe-DpPyq6h-.css","assets/Evaluation-B4jT6DaQ.js","assets/FacturePrestataire-BOaR6tH3.js","assets/Factures-Db3Noc1U.js","assets/Fil-CBF4Wfpm.js","assets/finances-CCjqAkCE.css","assets/Fournisseurs-DrHXRICl.js","assets/fournisseurs-DUtritY0.js","assets/foyer-BYmGXp6g.js","assets/gestes-conversation-DVFLv0A9.js","assets/HomeRituals-05HMYZUK.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-BX4IPFds.js","assets/identite-CurVJ0-S.js","assets/index-DLvbM5lt.js","assets/index.es-BrEK4L5A.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-CyRpdP2L.js","assets/jspdf.es.min-DGIre4VO.js","assets/JustePrix-CCIz1enL.js","assets/kkiapay-zN2FZdV1.js","assets/Laboratoire-B9iNkO0R.js","assets/laboratoire-D3SR4ggq.js","assets/LettresAuDossier-CkG65q07.js","assets/maisons-CSSFrqZy.js","assets/Marketing-ONA08G1q.js","assets/Marque-BmpMNnqm.js","assets/momo-C2ZVfV9J.js","assets/MonMois-BUnZPxMv.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-DEYhUucY.js","assets/paliers-C3VGQ1z2.js","assets/Parametres-SPQmCFz6.js","assets/parcours-DVsKFsLu.js","assets/Parrainages-C7BB07VI.js","assets/Parrainages-gAHAPB_6.css","assets/pdf-de-la-piece-D0CdIvFJ.js","assets/pdf-DzVcgo2U.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/Personas-D6XcfGdY.js","assets/Personnel-UugKgajj.js","assets/photo-Dr7RzHra.js","assets/pilotage-Bn1gP_oo.css","assets/Predictions-Cgp22D4W.js","assets/Prestataires-B-vjxPNf.js","assets/prestataires-D13UCWEb.js","assets/Prets-D6t0PcXo.js","assets/promos-4VpqFtrq.js","assets/protocoles-JmJxsIVU.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-r6RoIpSK.js","assets/quiz-5qMPWZVi.js","assets/Rapport-J7cI_gxT.js","assets/RattacherUneCarte-BNRUEZFO.js","assets/Recommandations-Dd8Y6L-W.js","assets/relances-pur-DFTVafj-.js","assets/SalonFoyer-CwqalUyI.js","assets/secretariat-admin-B3dSmMW7.js","assets/Secretariat-C_YopSdr.js","assets/Signatures-CGHN0dRs.js","assets/SignerUnPdf-Dc1wBQwm.js","assets/Synthese-B_HdEH5S.js","assets/systeme-C3XFIa8E.css","assets/Tableau-C8fruSuC.js","assets/Textes-2nGVCp1K.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-Bu8pXyQg.js","assets/trone-BBlhwMhQ.js","assets/trone-CyFdPxg0.css","assets/ui-nUUXEVTW.js","assets/vente-DMe4r4ed.css","assets/Vitrine-DM0pZok5.js","assets/_admin-uYDoSzJk.js","assets/_contrat-V5ho2AFa.js","assets/_heures-BmcYKT1z.js","assets/_reuni-D67vumf3.js","assets/_shared-CSVUckWc.js","assets/_signature-Dn0r45Zx.js","assets/_ui-BWMA-PlM.css","assets/_ui-iPDJINr3.js"];
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
