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
const BUILD = "20261016230121";
const A_GARDER = ["./","assets/Abonnements-BiZpLfBU.js","assets/abonnements-D4PVlCds.js","assets/Academie-BWdUEFlU.js","assets/Acces-CJgslg8S.js","assets/actions-DjLclJIv.js","assets/AFaire-B-FboAg-.js","assets/afaire-BBkmqePL.js","assets/Analytics-DM8Hp9el.js","assets/Appels-BxZ39Zp7.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/AtelierDesContenus-9AX815NI.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/Aujourdhui-BB0Zdg3r.js","assets/bilan-B-bfPYR0.css","assets/bilan-C7FjOuXP.js","assets/BilanMensuel-BC5zoDZb.js","assets/Branches-Cw8bX-nc.js","assets/bridges-BBOMEsMs.js","assets/Caisse-BLZkGXDR.js","assets/caisse-du-soir-DqHv6tWm.js","assets/Caisses-C-w_a4Tg.js","assets/Calendrier-nfDgtTRw.js","assets/Carnet-CJOJpVp2.js","assets/carte-BMkFJD2w.js","assets/carte-WI2qP1su.css","assets/CarteModal-DBHnFbhe.js","assets/CartesCadeaux-BfhJonMM.js","assets/Catalogue-B-ygTRx1.js","assets/CentreDeCommande-Du8kyJhp.css","assets/CentreDeCommande-ywfpMOmh.js","assets/Cercle-ZhEQTsm7.js","assets/certificat-CQISTOmW.js","assets/certificat-DVSxho5e.css","assets/certificats-coffre-DpP2cYAt.js","assets/ChiffreDesPrestations-BLCUT-l-.js","assets/ClotureDuTiroir-C6vPx-E_.css","assets/ClotureDuTiroir-Cl0MaKUU.js","assets/Coffre-CnG0TNUX.js","assets/components-1mxPYgJG.js","assets/compte-courant-ByzulCEN.js","assets/compte-WG08gpS0.js","assets/CompteCourant-DurLuY9T.js","assets/Comptes-BG1d6roT.js","assets/Comptoir-Cec4uXfB.js","assets/consultation-B8K4bHPk.js","assets/consultation-CCTm16qX.css","assets/Consultations-CGC9LsY4.js","assets/consultNotes-CaaH69x7.js","assets/Conversations-BPv72bfd.js","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-eCppff93.js","assets/currency-qfIhGmrs.js","assets/Customers-CK7C5AqZ.js","assets/Dashboard-DymPPz9s.js","assets/dates-ZQQ9vjkR.js","assets/Demandes-C-y3wvK3.js","assets/Depenses-DbNEr0Xb.js","assets/devise-fon-DX3P0bG4.woff2","assets/encaissement-pur-Bk1Jr888.js","assets/Encaissements-DycPiIvB.js","assets/enfants-oUr5dUr3.js","assets/Engagements-Cj5S9MhG.css","assets/Engagements-D5IwrU2o.js","assets/EntreDeuxSeances-CspHFqCt.js","assets/equipe-DpPyq6h-.css","assets/Evaluation-BLynujMZ.js","assets/FacturePrestataire-DJEKSleV.js","assets/Factures-7ZCa4r5I.js","assets/Fil-DddRhPdM.js","assets/finances-CCjqAkCE.css","assets/fournisseurs-Cmci8glf.js","assets/Fournisseurs-DJaKjTRM.js","assets/foyer-DWXMuay4.js","assets/HomeRituals-CIstXzRp.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-gv1SDGfT.js","assets/identite-BfqWyYRh.js","assets/index-BZj_L7xU.js","assets/index.es-BC_MZZHG.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-B7mwuu5Y.js","assets/jspdf.es.min-BxbGbA5k.js","assets/JustePrix-CJlDQVM9.js","assets/kkiapay-DUYIA23_.js","assets/laboratoire-BSkNrlZK.js","assets/Laboratoire-LTvbb7j4.js","assets/LettresAuDossier-BQsyRzJE.js","assets/maisons-CSSFrqZy.js","assets/Marketing-zXW8Emtf.js","assets/Marque-DeeEsLkh.js","assets/momo-C2ZVfV9J.js","assets/MonMois-Bkfqoygo.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-BzJwAaTj.js","assets/paliers-Bdy_6IEK.js","assets/Parametres-CZPUzPPO.js","assets/parcours-BhjOOLcW.js","assets/Parrainages-gAHAPB_6.css","assets/Parrainages-PEukXe-L.js","assets/pdf-24DWaGLZ.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/Personas-dQvjU6dP.js","assets/Personnel-CflZK6YU.js","assets/photo-C87se5o4.js","assets/pilotage-Bn1gP_oo.css","assets/Predictions-RwWMuSJy.js","assets/prestataires-BGUl100T.js","assets/Prestataires-D0-u_Khb.js","assets/Prets-BPFwSSaB.js","assets/promos-B-qvGzoK.js","assets/protocoles-C7rhyHkt.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-BAgZ55yX.js","assets/quiz-5qMPWZVi.js","assets/Rapport-Bl608pGy.js","assets/RattacherUneCarte-BPo-eFGl.js","assets/Recommandations-Cj0T78Jw.js","assets/SalonFoyer-kdnnYAW0.js","assets/secretariat-admin-RLRDZ6bw.js","assets/Secretariat-BRPahzmB.js","assets/Signatures-CT4dz_Jh.js","assets/SignerUnPdf-BgFjGrcJ.js","assets/Synthese-CybmdgSF.js","assets/systeme-C3XFIa8E.css","assets/Tableau-CBIiwszl.js","assets/Textes-CaWWQGNV.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-Df-w9-vF.js","assets/trone-CyFdPxg0.css","assets/trone-DCwegaMP.js","assets/ui-DKoUZWcc.js","assets/vente-DMe4r4ed.css","assets/Vitrine-XUzYiAHr.js","assets/_admin-ThIhGUv4.js","assets/_contrat-CWz76Xch.js","assets/_heures-B0PZwo9T.js","assets/_reuni-COmzPCWp.js","assets/_shared-Bb1wZsn5.js","assets/_signature-Dvv9EhbL.js","assets/_ui-BewmMwMg.js","assets/_ui-BWMA-PlM.css"];
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
