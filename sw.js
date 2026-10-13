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
const BUILD = "20261013082223";
const A_GARDER = ["./","assets/abonnements-B2GAtewS.js","assets/Abonnements-Dw3gAF2-.js","assets/Academie-Bal8lTWu.js","assets/Acces-CEI-fDDi.js","assets/actions-0deq_ZHU.js","assets/afaire-eik3QNgL.js","assets/AFaire-y8WLdBDZ.js","assets/Analytics-w3Act1Db.js","assets/Appels-wzvt90C2.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/AtelierDesContenus-DLP581bF.js","assets/bilan-B-bfPYR0.css","assets/bilan-DZaA-0t1.js","assets/BilanMensuel-D8AS3r35.js","assets/bourse-DcI4prP8.js","assets/Branches-ByBKQ8xM.js","assets/bridges-gGCXOjUY.js","assets/Caisse-CPpwHk5C.js","assets/caisse-du-soir-CaUo0Svc.js","assets/Caisses-8hTSgjbR.js","assets/Calendrier-DiJk1xux.js","assets/Carnet-C5Ly_h95.js","assets/carte-7CmNqtPx.js","assets/carte-WI2qP1su.css","assets/CarteModal-BbNC5Qf8.js","assets/CartesCadeaux-C3g5Pc0o.js","assets/Catalogue-WZM_WGNQ.js","assets/CentreDeCommande-D7a3GCDE.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-B0Nm53tw.js","assets/certificat-DVSxho5e.css","assets/certificat-xAavDffv.js","assets/certificats-coffre-D4aJ9gMX.js","assets/ClotureDuTiroir-C6vPx-E_.css","assets/ClotureDuTiroir-hF_a-drO.js","assets/Coffre-BHq9gUuB.js","assets/components-B-m3Pzb6.js","assets/compte-courant-ByzulCEN.js","assets/compte-CuO2hEAK.js","assets/CompteCourant-Bw0x1euh.js","assets/Comptes-UeMiZ8gl.js","assets/Comptoir-CHDRVeM1.js","assets/consultation-BDyZFfsM.js","assets/consultation-CCTm16qX.css","assets/Consultations-7UeDJ0ZL.js","assets/consultNotes-D4B0Go8l.js","assets/Conversations-BOZd3Kta.js","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-BQQeNzqP.js","assets/currency-CzN07T4P.js","assets/Customers-C_u3lzCH.js","assets/Dashboard-Bn1fUorm.js","assets/dates-BeSHfdNv.js","assets/Demandes-z3hwht7M.js","assets/Depenses-BgTcKJ6V.js","assets/devise-fon-DX3P0bG4.woff2","assets/encaissement-pur-DrbiTLgB.js","assets/Encaissements-CqCYZB6F.js","assets/enfants-BIYdJztg.js","assets/Engagements-1kosANFu.js","assets/Engagements-Cj5S9MhG.css","assets/equipe-DpPyq6h-.css","assets/Evaluation-BgQkY4KK.js","assets/FacturePrestataire-Bpdqefum.js","assets/Factures-BapA7GAT.js","assets/Fil-CbYTo_r-.js","assets/finances-CCjqAkCE.css","assets/Fournisseurs-BfZocB3q.js","assets/fournisseurs-DLv69lYS.js","assets/foyer-ubMfFzev.js","assets/HomeRituals-BXpi6t_-.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-D7gEHW9b.js","assets/identite-DaU8Hhe8.js","assets/index-NXQM4csF.js","assets/index.es-TkWZ99o_.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-Dofz9SWh.js","assets/jspdf.es.min-D6t5lhnc.js","assets/JustePrix-Kl2GJqcd.js","assets/kkiapay-Dk7EgevW.js","assets/laboratoire-BscwRHFV.js","assets/Laboratoire-DJGWAzFe.js","assets/LettresAuDossier-Bg0Fbjl2.js","assets/maisons-DZdAeMF9.js","assets/Marketing-CNNuFiwF.js","assets/Marque-Cxn9gbPT.js","assets/momo-C2ZVfV9J.js","assets/MonMois-CFhZ34En.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-CFswi5EG.js","assets/paliers-Ci8dbAp9.js","assets/Parametres-d92nmJa3.js","assets/parcours-DS3tqRym.js","assets/Parrainages-Bb6zawBR.js","assets/Parrainages-gAHAPB_6.css","assets/pdf-nJ9pApZt.js","assets/Personas-pFYZgjH9.js","assets/Personnel-CHo7RA_D.js","assets/photo-CJby17Nn.js","assets/pilotage-DYbuDdJQ.css","assets/Predictions-CcplKtTQ.js","assets/prestataires-BbQ8dntG.js","assets/Prestataires-CqgRZa4D.js","assets/Prets-CX2kJ-uW.js","assets/promos-0BkgygnI.js","assets/protocoles-Rf7KqtK2.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-C7YqWGyT.js","assets/quiz-5qMPWZVi.js","assets/Rapport-Dng0OP0u.js","assets/RattacherUneCarte-Hl5YsFQ_.js","assets/Recommandations-DVuoPLij.js","assets/SalonFoyer-CNi7xJer.js","assets/Secretariat-j2ahRnpD.js","assets/Synthese-BsPcaas5.js","assets/systeme-C3XFIa8E.css","assets/Tableau-DZs-eaJj.js","assets/Textes-DLpOzRbT.css","assets/Textes-DRqcdUfm.js","assets/tiroirs-D4dNBp0F.js","assets/trone-Dnm15WUi.css","assets/trone-SalQpYwC.js","assets/ui-CLRxEraQ.js","assets/vente-D0kdELDn.css","assets/Vitrine-DUM7gbSZ.js","assets/_contrat-DcGsg8v9.js","assets/_heures-COu7_2Y3.js","assets/_shared-BDJngjwx.js","assets/_signature-DSSt5Ptp.js"];
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
