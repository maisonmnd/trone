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
const BUILD = "20261020204701";
const A_GARDER = ["./","assets/Abonnements-DIw-iOnR.js","assets/abonnements-qNocWcoR.js","assets/Academie-BRLlcUit.js","assets/Acces-C-m6tONl.js","assets/actions-CH0yq3Ys.js","assets/AFaire-BQK5TeuD.js","assets/afaire-CoC0wMug.js","assets/Analytics-DInG1Jl2.js","assets/Appels-BNa9eoUb.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/AtelierDesContenus-TKPMBPS_.js","assets/Aujourdhui-DpexZdg4.js","assets/bilan-B-bfPYR0.css","assets/bilan-BIkzRO7z.js","assets/BilanMensuel-CgO4UKil.js","assets/Branches-Bcr0ufaa.js","assets/bridges-QeXIPHLz.js","assets/Caisse-5yb_C7p8.js","assets/caisse-du-soir-BJOCMkpA.js","assets/Caisses-CT6t1t9a.js","assets/Calendrier-Cr6SLKMV.js","assets/Carnet-FUVKmBJZ.js","assets/carte-CxhYI09m.js","assets/carte-WI2qP1su.css","assets/CarteModal-Ba5uigHU.js","assets/CartesCadeaux-CQPil_Dw.js","assets/Catalogue-DQzB5b6B.js","assets/CentreDeCommande-Du8kyJhp.css","assets/CentreDeCommande-laHJk9WQ.js","assets/Cercle-CCWHvXjA.js","assets/certificat-DVSxho5e.css","assets/certificat-_tg_aRPp.js","assets/certificats-coffre-CAH1gTY2.js","assets/ChiffreDesPrestations-BuPE9sGz.js","assets/ClotureDuTiroir-BCs3u80S.js","assets/ClotureDuTiroir-C6vPx-E_.css","assets/Coffre-CVs4O6gb.js","assets/components-r8BflS9j.js","assets/compte-courant-ByzulCEN.js","assets/compte-DjwlwcGG.js","assets/CompteCourant-Dxerxo6g.js","assets/Comptes-P7vXYVCI.js","assets/Comptoir-204r098I.js","assets/consultation-C2V9A_J0.js","assets/consultation-CCTm16qX.css","assets/Consultations-sgSuIEGY.js","assets/consultNotes-CqQWfAU0.js","assets/Conversations-D4WwB5Zo.css","assets/Conversations-sd-ZZPvO.js","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-DnL2TTKm.js","assets/currency-qfIhGmrs.js","assets/Customers-DId9lUMo.js","assets/Dashboard-BgZbJcbb.js","assets/dates-WP1zTSBM.js","assets/Demandes-8UOnsa7t.js","assets/Depenses-ChegyCg2.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-mmYGVdDQ.js","assets/diagnostics-au-trone-Bmj9-GcZ.js","assets/Discussions-D7c2nxU8.js","assets/encaissement-pur-DtAVgU3b.js","assets/Encaissements-DtcnFA1y.js","assets/enfants-BWNoDn9B.js","assets/Engagements-Cj5S9MhG.css","assets/Engagements-D8ueiouW.js","assets/EntreDeuxSeances-CbQJ3YjO.js","assets/equipe-3X2ge3MG.css","assets/Evaluation-HvZC0m-i.js","assets/FacturePrestataire-DgnHPwip.js","assets/Factures-DkkdC6t9.js","assets/Fil-Co1ecgiE.js","assets/finances-CCjqAkCE.css","assets/fournisseurs-BN5cUT_t.js","assets/Fournisseurs-EK1uamhN.js","assets/foyer-DSrL2NCv.js","assets/gestes-conversation-SNx8l6ZG.js","assets/HomeRituals-DBm_aeaz.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-DAYw1Pl_.js","assets/ia-diagnostic-pur-BulIFgZQ.js","assets/ia-recu-pur-DcucZqpR.js","assets/identite-BhVb1qGw.js","assets/index-D1-_OXqY.js","assets/index.es-BT22Xh4O.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-SjGlXShr.js","assets/jspdf.es.min-hBBfrmHb.js","assets/JustePrix-mbdvsvJ7.js","assets/kkiapay-vlWTzezG.js","assets/laboratoire-B2xvFPt7.js","assets/Laboratoire-DCe79zqc.js","assets/LettresAuDossier-CFUh60kM.js","assets/LienMndPay-DSybNeha.js","assets/maisons-CSSFrqZy.js","assets/Marketing-CPcR4HPD.js","assets/Marque-ZmhTYYV4.js","assets/momo-C2ZVfV9J.js","assets/MonMois-vz7bZYbd.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-DO0N8yx3.js","assets/paliers-D7VgdHmz.js","assets/Parametres-CmnAEaGN.js","assets/parcours-Dlc0JiYh.js","assets/Parrainages-DHnbvA1e.js","assets/Parrainages-gAHAPB_6.css","assets/pdf-CafUTiMx.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/Personas-Biv6VeXs.js","assets/Personnel-B114TmMR.js","assets/photo-BQArQz4Q.js","assets/pilotage-Bn1gP_oo.css","assets/Predictions-GmgjyfJ9.js","assets/prestataires-7YaoFKJN.js","assets/Prestataires-CucvFmsV.js","assets/Prets-D_DMPU8B.js","assets/promos-CRI8DNpK.js","assets/protocoles-jHdBBSvY.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-CjGsZkmt.js","assets/qualification-DjezCL-g.js","assets/quiz-5qMPWZVi.js","assets/Rapport-CwthIShd.js","assets/RattacherUneCarte-CN68xfFm.js","assets/Recommandations-xvWov9hr.js","assets/relances-pur-DsIo28uB.js","assets/releve-des-avis-7HCYy4LT.js","assets/SalonFoyer-BIDdHjUY.js","assets/secretariat-admin-DaoJCPQe.js","assets/Secretariat-Cy79Zw30.css","assets/Secretariat-DoplbmPL.js","assets/Signatures-BLdyPdoZ.js","assets/SignerUnPdf-DqHMWhiw.js","assets/Synthese-BHqqkqWI.js","assets/systeme-C3XFIa8E.css","assets/Tableau-BwNEY8L6.js","assets/Textes-DLpOzRbT.css","assets/Textes-DnhtubUh.js","assets/tiroirs-Bf0RvkXM.js","assets/tri-des-caisses-pur-9R15Uoa9.js","assets/trone-DX1fvvEM.js","assets/trone-wvMgyufp.css","assets/ui-Ea82PLwp.js","assets/vente-DMe4r4ed.css","assets/Vitrine-Clx-hKVT.js","assets/Vitrine-CRqZUnEh.css","assets/_admin-DiHhB9S5.js","assets/_contrat-C_eSSuCZ.js","assets/_heures-BceKI1da.js","assets/_reuni-D6Oz6Wer.js","assets/_shared-CovZqOpQ.js","assets/_signature-DUJTkKmS.js","assets/_ui-BWMA-PlM.css","assets/_ui-CQ6E8elH.js"];
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
