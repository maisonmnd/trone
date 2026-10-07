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
const BUILD = "20261007173428";
const A_GARDER = ["./","assets/abonnements-BFO86ad4.js","assets/Abonnements-CVpUWjYT.js","assets/Academie-Ctz4gP7A.js","assets/Acces-D8yBJ5vk.js","assets/actions-C6F9oYVI.js","assets/afaire-D_SCK_Wm.js","assets/AFaire-hm_6XFy2.js","assets/Analytics-C5SEnD5i.js","assets/Appels-CuSKv_Or.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/bilan-B-bfPYR0.css","assets/bilan-Dzy16LKI.js","assets/BilanMensuel-DuWASrap.js","assets/bourse-CKpJH8HB.js","assets/Branches-NmhI__Yp.js","assets/bridges-XrnEeEJE.js","assets/caisse-du-soir-BT5SoiUw.js","assets/Caisse-s5b0Rh-W.js","assets/Caisses-BTnSddAR.js","assets/Calendrier-BkwSv3PC.js","assets/Carnet-hfJEhzuU.js","assets/carte-CXapndDr.css","assets/carte-D1EVAxSY.js","assets/CarteModal-C7a-IM1O.js","assets/CartesCadeaux-DiSG2v3m.js","assets/Catalogue-BZE-Jh2w.js","assets/Cercle-CdugfVYL.js","assets/certificat-CyNbpgGx.css","assets/certificat-HMCChpQJ.js","assets/certificats-coffre-BLvrxdVg.js","assets/ClotureDuTiroir-BaEU1McX.js","assets/ClotureDuTiroir-C6vPx-E_.css","assets/Coffre-C-gzmoeg.js","assets/components-x0ae_W59.js","assets/compte-courant-ByzulCEN.js","assets/compte-lgov-X_J.js","assets/CompteCourant-wwtE5RLv.js","assets/Comptes-BjvKs5fI.js","assets/Comptoir-BrBLlSQP.js","assets/consultation-Dgb9KeZx.css","assets/consultation-DMqjJNCK.js","assets/Consultations-C_sHBP5S.js","assets/consultNotes-Bvlf8von.js","assets/Conversations-DuShwC3o.js","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-BAYAupjw.js","assets/currency-CzN07T4P.js","assets/Customers-DRIEp0Lc.js","assets/Dashboard-76TVDANC.js","assets/dates-Ccd4Q35C.js","assets/Demandes-Ck-J_BrL.js","assets/Depenses-DHe-8PCT.js","assets/devise-fon-DX3P0bG4.woff2","assets/Encaissements-CpTYkjZU.js","assets/enfants-DPgiI6Ke.js","assets/Engagements-Cj5S9MhG.css","assets/Engagements-SwXgfwxj.js","assets/equipe-DpPyq6h-.css","assets/Evaluation-DA42gxgR.js","assets/FacturePrestataire-BkFad9cT.js","assets/Factures-jCTvDnyh.js","assets/Fil-CZtACIP8.js","assets/finances-CCjqAkCE.css","assets/Fournisseurs-03n867Ba.js","assets/fournisseurs-D4pQMhm7.js","assets/foyer-D-46C2_y.js","assets/HomeRituals-CDVZYxvV.js","assets/html2canvas.esm-QH1iLAAe.js","assets/identite-CX3maijf.js","assets/index-Cws0AsAG.js","assets/index.es-BH9eyTBx.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-DI2YtSnC.js","assets/jspdf.es.min-FlPaalKj.js","assets/JustePrix-BMu0wR16.js","assets/kkiapay-aq7UGvlQ.js","assets/Laboratoire-CA7wTpgG.js","assets/laboratoire-CkGFOQ3d.js","assets/LettresAuDossier-BsLDDo7g.js","assets/maisons-DZdAeMF9.js","assets/Marketing-BNCKBNt6.js","assets/Marque-7zr6qY-8.js","assets/momo-C2ZVfV9J.js","assets/MonMois-CiDugBEl.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-9FKwMMsC.js","assets/paliers-AuYMEQjX.js","assets/Parametres-DBOyER2O.js","assets/parcours-CLn9nhWY.js","assets/Parrainages-BtxvJ_mG.css","assets/Parrainages-C7cXL1r5.js","assets/pdf-VPIGp54Z.js","assets/Personas-BeGik3uY.js","assets/Personnel-CR8jtKeZ.js","assets/photo-h-a-E_Zm.js","assets/pilotage-DYbuDdJQ.css","assets/Predictions-CSab6LkB.js","assets/prestataires-DF_Vx-8O.js","assets/Prestataires-kXAYeJ-Y.js","assets/Prets-COwIrRJ3.js","assets/promos-DS_vlNno.js","assets/protocoles-DYDlfEIV.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-Bbvtxpgf.js","assets/quiz-5qMPWZVi.js","assets/Rapport-DpDbCeyF.js","assets/RattacherUneCarte-CuQTKakM.js","assets/Recommandations-7dBXeWn8.js","assets/SalonFoyer-BCNJ1JsB.js","assets/Secretariat-CXbjls8d.js","assets/Synthese-D_WBFvPq.js","assets/systeme-C3XFIa8E.css","assets/Tableau-Cbd7WkMm.js","assets/Textes-Bjw3m4jp.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-SUgTlDjj.js","assets/trone-B6Urb8dl.js","assets/trone-C5-dn5jj.css","assets/ui-D5mde3AY.js","assets/vente-D0kdELDn.css","assets/Vitrine-BaTDH1Yi.js","assets/_contrat-BSygc8En.js","assets/_heures--zUGsvd3.js","assets/_shared-Cv2VV5mn.js","assets/_signature-Dr7UfaM8.js"];
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
