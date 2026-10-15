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
const BUILD = "20261014222208";
const A_GARDER = ["./","assets/abonnements-BNzenu4q.js","assets/Abonnements-dgzx7bPn.js","assets/Academie-CXNC_i4o.js","assets/Acces-CHbRF7MI.js","assets/actions-DbyNyQpl.js","assets/afaire-B2m9aFYH.js","assets/AFaire-izmWrLMi.js","assets/Analytics-5REJLss5.js","assets/Appels-CCKq99dQ.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/AtelierDesContenus-IVeq-0TN.js","assets/Aujourdhui-21c48-p5.js","assets/bilan-B-bfPYR0.css","assets/bilan-oMZ8X2zE.js","assets/BilanMensuel-D773SbNZ.js","assets/Branches-DJs7xmTB.js","assets/bridges-BXEviuXS.js","assets/caisse-du-soir-D6kGEeWg.js","assets/Caisse-tXoGtTl1.js","assets/Caisses-CuTtgS8m.js","assets/Calendrier-CxOCdvv6.js","assets/Carnet-pv7MxgsI.js","assets/carte-DyOzWspH.js","assets/carte-WI2qP1su.css","assets/CarteModal-CJCiRqn2.js","assets/CartesCadeaux-COoq3WGC.js","assets/Catalogue-CdLxgx31.js","assets/CentreDeCommande-Cm_7or9-.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-DSUytbGk.js","assets/certificat-CWOxZ_U-.js","assets/certificat-DVSxho5e.css","assets/certificats-coffre-_Q_JPIIp.js","assets/ChiffreDesPrestations-DVijqAK1.js","assets/ClotureDuTiroir-ACuVt2Tz.js","assets/ClotureDuTiroir-C6vPx-E_.css","assets/Coffre-Ch1Gy3fb.js","assets/components-Bh4cluhc.js","assets/compte-C5Hsesdo.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-CEefHYGs.js","assets/Comptes-LK7Jr_N2.js","assets/Comptoir-C13Xn4Cz.js","assets/consultation-BLyFvGg4.js","assets/consultation-CCTm16qX.css","assets/Consultations-DnMEStJ1.js","assets/consultNotes-BJ66MbLQ.js","assets/Conversations-B8tr2B03.js","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-DZpjeNBa.js","assets/currency-CzN07T4P.js","assets/Customers-CLrWPQCl.js","assets/Dashboard-BlMlREf0.js","assets/dates-CTqds8Ld.js","assets/Demandes-B-uZrvP9.js","assets/Depenses-DTNeGaUh.js","assets/devise-fon-DX3P0bG4.woff2","assets/encaissement-pur-C7P-hoyC.js","assets/Encaissements-B1R_qeXs.js","assets/enfants-DgUZLOO8.js","assets/Engagements-1pXxCLPM.js","assets/Engagements-Cj5S9MhG.css","assets/equipe-DpPyq6h-.css","assets/Evaluation-CJbZm3se.js","assets/FacturePrestataire-CZT4n-oK.js","assets/Factures-BBSbJ0Kb.js","assets/Fil-CiivSWB0.js","assets/finances-CCjqAkCE.css","assets/fournisseurs-CQejef8_.js","assets/Fournisseurs-DSpTJU24.js","assets/foyer-7N9wjOd0.js","assets/HomeRituals-DgbLSdM5.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-BtIAUdcM.js","assets/identite-jW1g73tP.js","assets/index-Q2qF4WRN.js","assets/index.es-B8ofNWgd.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-DBEOfc3J.js","assets/jspdf.es.min-DhDwV98A.js","assets/JustePrix-B_7WphX1.js","assets/kkiapay-CURNavfT.js","assets/Laboratoire-DKa19hSc.js","assets/laboratoire-ewO2cRq0.js","assets/LettresAuDossier-D66KEq_Z.js","assets/maisons-DZdAeMF9.js","assets/Marketing-DhkotR1g.js","assets/Marque-DqlmkN7E.js","assets/momo-C2ZVfV9J.js","assets/MonMois-diEOFdX8.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-BibZsRpl.js","assets/paliers-D0U3LRX0.js","assets/Parametres-CBWLAUWi.js","assets/parcours-l14DJauJ.js","assets/Parrainages-CwgZUoOL.js","assets/Parrainages-gAHAPB_6.css","assets/pdf-49HQKU6F.js","assets/Personas-9HZEBG-v.js","assets/Personnel-x_ZrVOkt.js","assets/photo-B84SJhes.js","assets/pilotage-CybSwMA-.css","assets/Predictions-Bvd3uRe4.js","assets/Prestataires-B63vqLLx.js","assets/prestataires-CN_svixf.js","assets/Prets-DE7QQULd.js","assets/promos-AJAji_lN.js","assets/protocoles-BSSaFtT6.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-Hpcs3dGy.js","assets/quiz-5qMPWZVi.js","assets/Rapport-Iw1o5YX_.js","assets/RattacherUneCarte-PSXmLyP3.js","assets/Recommandations-B2iinr4x.js","assets/SalonFoyer-BbDWsW-a.js","assets/secretariat-admin-CB1Ib8MV.js","assets/Secretariat-DUT8Bx-u.js","assets/Synthese-B93ILLev.js","assets/systeme-C3XFIa8E.css","assets/Tableau-DETk5waf.js","assets/Textes-C-Vzn6cH.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-B9MG2gJJ.js","assets/trone-B-eNzzpM.js","assets/trone-DnuuvbFM.css","assets/ui-mSCEAEnZ.js","assets/vente-D0kdELDn.css","assets/Vitrine-1WRaQ-fx.js","assets/_admin-DJJ0VaC0.js","assets/_contrat-BRsye3HQ.js","assets/_heures-CGI-LW7-.js","assets/_reuni-BLvvzpiI.js","assets/_shared-DOsTrtdp.js","assets/_signature-45cwmVbu.js","assets/_ui-BWMA-PlM.css","assets/_ui-zW86SdHT.js"];
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
