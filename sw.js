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
const BUILD = "20261013192400";
const A_GARDER = ["./","assets/abonnements-GYyv6hbD.js","assets/Abonnements-VOnAP2cb.js","assets/Academie-CYU2BQuM.js","assets/Acces-CN5mkCm8.js","assets/actions-CWmHwhvw.js","assets/AFaire-BxHEqB8Z.js","assets/afaire-D5zBzLuS.js","assets/Analytics-DMbYVtr0.js","assets/Appels-PS_Wy8zd.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/AtelierDesContenus-DLsTrRT8.js","assets/bilan-B-bfPYR0.css","assets/bilan-BColuOmF.js","assets/BilanMensuel-BEElXmYK.js","assets/bourse-Cr0-5sVR.js","assets/Branches-B84JI89H.js","assets/bridges-BzDx_lyk.js","assets/Caisse-BIqate2D.js","assets/caisse-du-soir-CcrE5QCV.js","assets/Caisses-bCNOwo4q.js","assets/Calendrier-DGEFT_VI.js","assets/Carnet-f1RV2JCN.js","assets/carte-C8AIm4Lc.js","assets/carte-WI2qP1su.css","assets/CarteModal-B5Nj8Kzm.js","assets/CartesCadeaux-hszIwOf0.js","assets/Catalogue-C0uKCyPl.js","assets/CentreDeCommande-BaTLkJpD.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-CZYJ7fnK.js","assets/certificat-CnUL1pah.js","assets/certificat-DVSxho5e.css","assets/certificats-coffre-DSGFQWTj.js","assets/ClotureDuTiroir-BVMhiip_.js","assets/ClotureDuTiroir-C6vPx-E_.css","assets/Coffre-BmN_yta-.js","assets/components-CqoilSNX.js","assets/compte-Cm7kbjcR.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-zDbAj3wL.js","assets/Comptes-kHQKlp0O.js","assets/Comptoir-2lWL6Mfh.js","assets/consultation-CCTm16qX.css","assets/consultation-DTniYUwq.js","assets/Consultations-CgumNwMD.js","assets/consultNotes-DCd5UIql.js","assets/Conversations-CFSmqPsE.js","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-BDP6GjUF.js","assets/currency-CzN07T4P.js","assets/Customers-DwzZsd00.js","assets/Dashboard-DIBLC34S.js","assets/dates-DU-k-VaO.js","assets/Demandes-tk2VgEZ8.js","assets/Depenses-DOwdrCLY.js","assets/devise-fon-DX3P0bG4.woff2","assets/encaissement-pur-N-QBaHKp.js","assets/Encaissements-CW_PtaV8.js","assets/enfants-tzLX9RM3.js","assets/Engagements-Cj5S9MhG.css","assets/Engagements-CV922cEI.js","assets/equipe-DpPyq6h-.css","assets/Evaluation-C186Zbd_.js","assets/FacturePrestataire-Da7uoXPD.js","assets/Factures-DhQ7Z-_N.js","assets/Fil-DI2iwIOG.js","assets/finances-CCjqAkCE.css","assets/Fournisseurs-C5UJCrJn.js","assets/fournisseurs-CDOL9wqU.js","assets/foyer-DQQvf1FK.js","assets/HomeRituals-CLZLzkOs.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-OUh1hlH2.js","assets/identite-CA2QSN_s.js","assets/index-3AQp4CfV.js","assets/index.es-DBlakFDL.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-oD__YJpE.js","assets/jspdf.es.min-B4mCMsoc.js","assets/JustePrix-CngFb4IB.js","assets/kkiapay-1zXpyP6G.js","assets/Laboratoire-CW06bpRz.js","assets/laboratoire-YLUuMjSh.js","assets/LettresAuDossier-D74Pdxj_.js","assets/maisons-DZdAeMF9.js","assets/Marketing-COdNRddh.js","assets/Marque-CC9xXkLh.js","assets/momo-C2ZVfV9J.js","assets/MonMois-QaaSFxIN.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-B_QbQ9aH.js","assets/paliers-clUsEEJb.js","assets/Parametres-Cjrd6nUr.js","assets/parcours-tcIE8Kyv.js","assets/Parrainages-Bjc2Zx0A.js","assets/Parrainages-gAHAPB_6.css","assets/pdf-CWIoxw_j.js","assets/Personas-CtZLRKod.js","assets/Personnel-DQBj12CF.js","assets/photo-DlU_lCp4.js","assets/pilotage-DYbuDdJQ.css","assets/Predictions-DGaLG08B.js","assets/Prestataires-b1DaC5S_.js","assets/prestataires-C1CcUSkV.js","assets/Prets-D8NLT3lU.js","assets/promos-xaXo1ak4.js","assets/protocoles-BF_1vHtS.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-Dn7Z0p7T.js","assets/quiz-5qMPWZVi.js","assets/Rapport-CS7_Rz-g.js","assets/RattacherUneCarte-CJ8HLdgo.js","assets/Recommandations-CgG-Bqc9.js","assets/SalonFoyer-C1Idhbjd.js","assets/Secretariat-S8imf_Jg.js","assets/Synthese-wmqUvX90.js","assets/systeme-C3XFIa8E.css","assets/Tableau-Yf3qEaOb.js","assets/Textes-BK4m9d4m.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-q2fzIOaS.js","assets/trone-B5tqZKGe.js","assets/trone-DnuuvbFM.css","assets/ui-DpVlY8Mb.js","assets/vente-D0kdELDn.css","assets/Vitrine-BT9h1l5B.js","assets/_contrat-DXVrljpF.js","assets/_heures-DmGhH3js.js","assets/_shared-wanVqqil.js","assets/_signature-BTC9JLSP.js"];
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
