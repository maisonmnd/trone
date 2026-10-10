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
const BUILD = "20261010223748";
const A_GARDER = ["./","assets/Abonnements-BmdJFnff.js","assets/abonnements-eVjzIKoK.js","assets/Academie-BXIyfOdn.js","assets/Acces-C1Cdb4t9.js","assets/actions-Ddoon9-z.js","assets/AFaire-C_wZ470s.js","assets/afaire-u3PqiqD8.js","assets/Analytics-CfyEWl59.js","assets/Appels-CjGfOH1c.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/bilan-B-bfPYR0.css","assets/bilan-DdEvVjRJ.js","assets/BilanMensuel-bzUV7vO4.js","assets/bourse-Dslxup-V.js","assets/Branches-CeJ-sJZ-.js","assets/bridges-abQHWRCt.js","assets/Caisse-BF93T-bc.js","assets/caisse-du-soir-B2bQRERj.js","assets/Caisses-BR37mFfD.js","assets/Calendrier-IzOYLm9K.js","assets/Carnet-CCfrnEi8.js","assets/carte-CWnQiRve.js","assets/carte-WI2qP1su.css","assets/CarteModal-CAIJ-eOt.js","assets/CartesCadeaux-CCOXtOOv.js","assets/Catalogue-w4nLwEBf.js","assets/Cercle-TYtJZYIH.js","assets/certificat-Bn0TT47O.js","assets/certificat-DVSxho5e.css","assets/certificats-coffre-DpBnH9Xn.js","assets/ClotureDuTiroir-C6vPx-E_.css","assets/ClotureDuTiroir-CRgYxtVf.js","assets/Coffre-Bw54h9q6.js","assets/components-sA2VqWCz.js","assets/compte-ByV5YTuf.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-DbkXD60q.js","assets/Comptes-Dylk_myo.js","assets/Comptoir-C6iBkIys.js","assets/consultation-CCTm16qX.css","assets/consultation-iAsnKm-W.js","assets/Consultations-zWe6P1Dq.js","assets/consultNotes-DeIG63yD.js","assets/Conversations-C4elzWZW.js","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-HN79HRVJ.js","assets/currency-CzN07T4P.js","assets/Customers-DDo4OUQZ.js","assets/Dashboard-BtDjkv80.js","assets/dates-CB64PnvM.js","assets/Demandes-Cqzfg6aX.js","assets/Depenses-3y5bJnnu.js","assets/devise-fon-DX3P0bG4.woff2","assets/encaissement-pur-DHQ9u6cQ.js","assets/Encaissements-Do3vCXSi.js","assets/enfants-CtTZKydI.js","assets/Engagements-Cj5S9MhG.css","assets/Engagements-ZxTVIsAZ.js","assets/equipe-DpPyq6h-.css","assets/Evaluation-DwqpGp6w.js","assets/FacturePrestataire-BtvopMC9.js","assets/Factures-eHzqZgRg.js","assets/Fil-dihyTlIk.js","assets/finances-CCjqAkCE.css","assets/Fournisseurs-DeulYKws.js","assets/fournisseurs-TRWYnES-.js","assets/foyer-B225IUro.js","assets/HomeRituals-pwbK_Jlr.js","assets/html2canvas.esm-QH1iLAAe.js","assets/identite-DvqjCe8R.js","assets/index-C3S5Pf3T.js","assets/index.es-RiSZhMVF.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-CLvvjLgK.js","assets/jspdf.es.min-DAUnlVdh.js","assets/JustePrix-Ce8JAxGB.js","assets/kkiapay-Dix0znCg.js","assets/laboratoire-CQeFnzz5.js","assets/Laboratoire-Dm37WaVX.js","assets/LettresAuDossier-C31-vndn.js","assets/maisons-DZdAeMF9.js","assets/Marketing-rGcQdRgs.js","assets/Marque-DgPh1bAL.js","assets/momo-C2ZVfV9J.js","assets/MonMois-DABW9hW-.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-CS1EYPXv.js","assets/paliers-CtipaxtS.js","assets/Parametres-DcIh3z6A.js","assets/parcours-D9sqizUs.js","assets/Parrainages-B8YQW03k.js","assets/Parrainages-gAHAPB_6.css","assets/pdf-DeISxihR.js","assets/Personas-B2puUVz_.js","assets/Personnel-C0yQ-BzF.js","assets/photo-C5uvzitF.js","assets/pilotage-DYbuDdJQ.css","assets/Predictions-ndjQMHCR.js","assets/prestataires-CNRb3KZH.js","assets/Prestataires-CWeVbpRM.js","assets/Prets-B0U7KbgA.js","assets/promos-Chlebgek.js","assets/protocoles-BS1szwb-.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-Dtxc4TL_.js","assets/quiz-5qMPWZVi.js","assets/Rapport-B9hs98Rg.js","assets/RattacherUneCarte-C3M7tYf_.js","assets/Recommandations-cHlrAEC6.js","assets/SalonFoyer-DMKDVHDV.js","assets/Secretariat-B_fOzj2-.js","assets/Synthese-CvSDjXQf.js","assets/systeme-C3XFIa8E.css","assets/Tableau-DKGUIuTJ.js","assets/Textes-DLpOzRbT.css","assets/Textes-egbvfgPr.js","assets/tiroirs-B9ksaasC.js","assets/trone--18_zVSg.js","assets/trone-Cn5sXo2w.css","assets/ui-M0UUXOJb.js","assets/vente-D0kdELDn.css","assets/Vitrine-BtTiJIVG.js","assets/_contrat-D56tWyws.js","assets/_heures-B_nZliF5.js","assets/_shared-BNuHr-WY.js","assets/_signature-DMfjAkPn.js"];
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
