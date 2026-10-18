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
const BUILD = "20261018080518";
const A_GARDER = ["./","assets/Abonnements-BQR4UaAw.js","assets/abonnements-Ds_olkL8.js","assets/Academie-DuO8WQop.js","assets/Acces-9LKjpipn.js","assets/actions-CcwPs8Om.js","assets/afaire-CRW8m-Tt.js","assets/AFaire-CT08B1X7.js","assets/Analytics-CVkkxEFe.js","assets/Appels-CqCcGUpe.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/AtelierDesContenus-DZ8lxZHB.js","assets/Aujourdhui-H6sKB2G6.js","assets/bilan-B-bfPYR0.css","assets/bilan-BIVjO8Og.js","assets/BilanMensuel-BkJ2c3CX.js","assets/Branches-DQhMsxm9.js","assets/bridges-bVseQGVG.js","assets/caisse-du-soir-JEm0Imly.js","assets/Caisse-ZHHx2xJ7.js","assets/Caisses-CV_zptnM.js","assets/Calendrier-B9dNLuU6.js","assets/Carnet-RVOobdmA.js","assets/carte-WI2qP1su.css","assets/carte-XbaqVsY1.js","assets/CarteModal-W4SdDWxl.js","assets/CartesCadeaux-DY11bWRh.js","assets/Catalogue-GBp5yHap.js","assets/CentreDeCommande-Du8kyJhp.css","assets/CentreDeCommande-D_LbFHFT.js","assets/Cercle-DXgwvA12.js","assets/certificat-DVSxho5e.css","assets/certificat-XUwoc5rw.js","assets/certificats-coffre-BZuKC7me.js","assets/ChiffreDesPrestations-BUqC1ZUT.js","assets/ClotureDuTiroir-C6vPx-E_.css","assets/ClotureDuTiroir-DxOfVGpI.js","assets/Coffre-DpXZeupj.js","assets/components-DHsRZ-Ro.js","assets/compte-Cm_Xtylf.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-B3IpC69J.js","assets/Comptes-SkMRkGNO.js","assets/Comptoir-TFZ_uM5e.js","assets/consultation-BOCUxxrT.js","assets/consultation-CCTm16qX.css","assets/Consultations-W3AqJR7C.js","assets/consultNotes-BzlEg7J5.js","assets/Conversations-BkGgvQBk.js","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-Cu0vJJ2H.js","assets/currency-qfIhGmrs.js","assets/Customers-Da_2ptLO.js","assets/Dashboard-Dlf9JD9i.js","assets/dates-w6jJ_TUD.js","assets/Demandes-DTNc8kCZ.js","assets/Depenses-Ce8sIQCA.js","assets/devise-fon-DX3P0bG4.woff2","assets/encaissement-pur-BAX2PCt_.js","assets/Encaissements-B6qaJkOA.js","assets/enfants-Cy4dWcQ6.js","assets/Engagements-Cj5S9MhG.css","assets/Engagements-DhYTrQG4.js","assets/EntreDeuxSeances-_X550heg.js","assets/equipe-DpPyq6h-.css","assets/Evaluation-C7dCP-Je.js","assets/FacturePrestataire-5X6exiM4.js","assets/Factures-CP19Ij6T.js","assets/Fil-DMKP4-ir.js","assets/finances-CCjqAkCE.css","assets/Fournisseurs-CrOVyZ0P.js","assets/fournisseurs-iITgUD62.js","assets/foyer-DbE19GAu.js","assets/HomeRituals-Bs6P-Uh9.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-BzwRCbFk.js","assets/identite-oGrtEvdI.js","assets/index-DUZSKQDQ.js","assets/index.es-CBQtEybO.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-D6fvRNVf.js","assets/jspdf.es.min-Dpjf7My8.js","assets/JustePrix-CkVTQOql.js","assets/kkiapay-C0agNOSI.js","assets/Laboratoire-DueLa11t.js","assets/laboratoire-NWX8A2ng.js","assets/LettresAuDossier-DnifNe_w.js","assets/maisons-CSSFrqZy.js","assets/Marketing-x2Gt_Yf_.js","assets/Marque-BvfEGGxr.js","assets/momo-C2ZVfV9J.js","assets/MonMois-CViBrR3w.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-DU02bgoW.js","assets/paliers-GR7WD9Ub.js","assets/Parametres-B5NWlr7X.js","assets/parcours-BACoS6Mw.js","assets/Parrainages-BLtvNZqS.js","assets/Parrainages-gAHAPB_6.css","assets/pdf-CrI97rBY.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/Personas-BH3ZYk_Y.js","assets/Personnel-DKt4-tiE.js","assets/photo-xPYWfHkp.js","assets/pilotage-Bn1gP_oo.css","assets/Predictions-CiTXcnyQ.js","assets/Prestataires-CP-P4TWq.js","assets/prestataires-tgVh7Rfs.js","assets/Prets-XxLIuVw7.js","assets/promos-CXvJlwed.js","assets/protocoles-ZlDE76MR.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-C26oFCyo.js","assets/quiz-5qMPWZVi.js","assets/Rapport-BepKEeoF.js","assets/RattacherUneCarte-ByGUM1L0.js","assets/Recommandations-DNl8Hn6q.js","assets/SalonFoyer-C9_vfuMJ.js","assets/secretariat-admin-_vx2P_1d.js","assets/Secretariat-qe2KHTeR.js","assets/Signatures-Dlm3gM3Y.js","assets/SignerUnPdf-BF_1OZTf.js","assets/Synthese-C1WY4Z35.js","assets/systeme-C3XFIa8E.css","assets/Tableau-BAp1ihPQ.js","assets/Textes-CUaES07M.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-DRtzkRy0.js","assets/trone-CyFdPxg0.css","assets/trone-DBBuQjKP.js","assets/ui-BK6uOQ1f.js","assets/vente-DMe4r4ed.css","assets/Vitrine-DvNnSJfJ.js","assets/_admin-kH_H7XFA.js","assets/_contrat-CI2vhz1U.js","assets/_heures-DwM1Oxo7.js","assets/_reuni-BeP7Vemu.js","assets/_shared-CnuudlAC.js","assets/_signature-BvVdfcKR.js","assets/_ui-B0ElI5Q5.js","assets/_ui-BWMA-PlM.css"];
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
