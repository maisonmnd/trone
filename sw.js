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
const BUILD = "20261016145149";
const A_GARDER = ["./","assets/abonnements-DF0mSJcK.js","assets/Abonnements-DW-wpn8_.js","assets/Academie-Dfwz62eI.js","assets/Acces-fgmCrdLL.js","assets/actions-BRh6MPvF.js","assets/AFaire-B9i2Fr0M.js","assets/afaire-BNVbLEia.js","assets/Analytics-DcqAR6-K.js","assets/Appels-DPjK8Bu4.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/AtelierDesContenus-j4bdSQjy.js","assets/Aujourdhui-BsEA7RvW.js","assets/bilan-2nBJqSTz.js","assets/bilan-B-bfPYR0.css","assets/BilanMensuel-CViuahqz.js","assets/Branches-BddS-fvk.js","assets/bridges-DtHg_7fw.js","assets/Caisse-5jnzqFff.js","assets/caisse-du-soir-C7oj5WcM.js","assets/Caisses-B7JDIa73.js","assets/Calendrier-CmcKwTkG.js","assets/Carnet-CJM-4B2x.js","assets/carte-DKMonI78.js","assets/carte-WI2qP1su.css","assets/CarteModal-B6HYc2Hi.js","assets/CartesCadeaux-dVomp4pB.js","assets/Catalogue-Cc3NsDkZ.js","assets/CentreDeCommande-DHF2bJ67.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-CGIA01EU.js","assets/certificat-CKYXFtQY.js","assets/certificat-DVSxho5e.css","assets/certificats-coffre-CdyliIMw.js","assets/ChiffreDesPrestations-DF1vgU-A.js","assets/ClotureDuTiroir-BdO2ZfQO.js","assets/ClotureDuTiroir-C6vPx-E_.css","assets/Coffre-pyL0kRuX.js","assets/components-BR-XCpwP.js","assets/compte-CbsMZ3Bp.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-DEW2Qk7O.js","assets/Comptes-Do2hwzSH.js","assets/Comptoir-CabDyiVn.js","assets/consultation-CCTm16qX.css","assets/consultation-EgQ0KnES.js","assets/Consultations-CA5Yj1lB.js","assets/consultNotes-YbjD9wbd.js","assets/Conversations-DgA4U_vA.js","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-Cw-aVG4k.js","assets/currency-D4l65sA8.js","assets/Customers-Dbt7hYd1.js","assets/Dashboard-9pxiKvkf.js","assets/dates-l9rdM79p.js","assets/Demandes-Ta95gmbK.js","assets/Depenses-CjNbZ4ru.js","assets/devise-fon-DX3P0bG4.woff2","assets/encaissement-pur-IMyLXf2g.js","assets/Encaissements-4uOZuUj2.js","assets/enfants-BSqhFUVp.js","assets/Engagements-Cj5S9MhG.css","assets/Engagements-DQGKkH4_.js","assets/EntreDeuxSeances-iuGJoL8F.js","assets/equipe-DpPyq6h-.css","assets/Evaluation-XmsV5S68.js","assets/FacturePrestataire-B7-KZHxF.js","assets/Factures-GYmQPjIW.js","assets/Fil-CqmLRFHe.js","assets/finances-CCjqAkCE.css","assets/fournisseurs-BKIBaYqh.js","assets/Fournisseurs-CEJlNq1K.js","assets/foyer-BpX8avmT.js","assets/HomeRituals-B8x2o4uM.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-CtEOs37i.js","assets/identite-DZrQbuzX.js","assets/index-CqOO8A7P.js","assets/index.es-DJ3DbtUh.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-DCL39-oq.js","assets/jspdf.es.min-BSF-Ixqh.js","assets/JustePrix-DZvx_Alp.js","assets/kkiapay-RcYB-_5w.js","assets/laboratoire-DlYjDMv4.js","assets/Laboratoire-kdZeUD8i.js","assets/LettresAuDossier-DBf4T1VP.js","assets/maisons-CSSFrqZy.js","assets/Marketing-CxMC1htN.js","assets/Marque-w21e0h4_.js","assets/momo-C2ZVfV9J.js","assets/MonMois-BsTVxFfS.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-BGiFtYbl.js","assets/paliers-Dg66_1Zl.js","assets/Parametres-C0d12Bbs.js","assets/parcours-BpNi4Q7F.js","assets/Parrainages-CoeFQ69z.js","assets/Parrainages-gAHAPB_6.css","assets/pdf-AK1AgSSJ.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/Personas-p_Ga6T6X.js","assets/Personnel-1rU2EFLm.js","assets/photo-BBLrNV-k.js","assets/pilotage-Bn1gP_oo.css","assets/Predictions-D4CXgTnl.js","assets/prestataires-B2wGLntR.js","assets/Prestataires-DoMZs_6A.js","assets/Prets-DRaiCkfX.js","assets/promos-BZcZyEQG.js","assets/protocoles-CummsP5H.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-TrTWknXi.js","assets/quiz-5qMPWZVi.js","assets/Rapport-hxksuGoa.js","assets/RattacherUneCarte-DLSP6FlI.js","assets/Recommandations-DB9iiDZI.js","assets/SalonFoyer-FQOE6Fj4.js","assets/secretariat-admin-DuaP3FlM.js","assets/Secretariat-Bl2b3WEN.js","assets/Signatures-BMW95FIa.js","assets/SignerUnPdf-CSiia3kJ.js","assets/Synthese-DrEx2mXf.js","assets/systeme-C3XFIa8E.css","assets/Tableau-NqYwlLl0.js","assets/Textes-C4cPaxKO.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-DbBHoJEZ.js","assets/trone-Behj4gZ1.js","assets/trone-DnuuvbFM.css","assets/ui-45i7YWl1.js","assets/vente-D0kdELDn.css","assets/Vitrine-DdAC0l86.js","assets/_admin-BZwYnvoh.js","assets/_contrat-BX7TQnr1.js","assets/_heures-g64IlE4c.js","assets/_reuni-BETwnQJH.js","assets/_shared-BRCf-q2d.js","assets/_signature-B6seUHUC.js","assets/_ui-BWMA-PlM.css","assets/_ui-H3Yt_pwE.js"];
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
