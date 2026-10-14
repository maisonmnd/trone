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
const BUILD = "20261014153124";
const A_GARDER = ["./","assets/Abonnements-D9cqR1y_.js","assets/abonnements-U2LM6aXh.js","assets/Academie-C5WYop5l.js","assets/Acces-CQv_h2n1.js","assets/actions-CG5HZ_UP.js","assets/afaire-BZzJPteB.js","assets/AFaire-T1etNSuC.js","assets/Analytics-r97hNe-l.js","assets/Appels-W_c9xtO2.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/AtelierDesContenus-CAoA0gEh.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/Aujourdhui-D570OV99.js","assets/bilan-B-bfPYR0.css","assets/bilan-ukxIeCNr.js","assets/BilanMensuel-B1U3tTuO.js","assets/Branches-dbwZeQ_b.js","assets/bridges-JmxpSAXb.js","assets/Caisse-Ba5RP61Q.js","assets/caisse-du-soir-DzA4f9eQ.js","assets/Caisses-DcMl9VuM.js","assets/Calendrier-ByvpdHrb.js","assets/Carnet-BOyxN8M8.js","assets/carte-CRO1NoTN.js","assets/carte-WI2qP1su.css","assets/CarteModal-vGfzxs-r.js","assets/CartesCadeaux-o-CnW2d-.js","assets/Catalogue-CP8ZAPog.js","assets/CentreDeCommande-Du8kyJhp.css","assets/CentreDeCommande-vG5I0QhQ.js","assets/Cercle-B6tITDlI.js","assets/certificat-Dg29VYf3.js","assets/certificat-DVSxho5e.css","assets/certificats-coffre-xe7Thu5N.js","assets/ChiffreDesPrestations-DbpUzXgR.js","assets/ClotureDuTiroir-C6vPx-E_.css","assets/ClotureDuTiroir-CRPepfvT.js","assets/Coffre-BM6UqrrI.js","assets/components-BI5vGIBe.js","assets/compte-courant-ByzulCEN.js","assets/compte-DnqfpQhb.js","assets/CompteCourant-BSYZS0bK.js","assets/Comptes-ijtB-o5F.js","assets/Comptoir-Cx13vUMz.js","assets/consultation-CCTm16qX.css","assets/consultation-CI2I6IdS.js","assets/Consultations-D9rePO1A.js","assets/consultNotes-D9ZUEybg.js","assets/Conversations-BDsn3FA9.js","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-BNM86SG4.js","assets/currency-CzN07T4P.js","assets/Customers-CASt2--m.js","assets/Dashboard-Dzw9fJQQ.js","assets/dates-Cc4P1LmO.js","assets/Demandes-Bsc-wI-9.js","assets/Depenses-BeT0g_Sk.js","assets/devise-fon-DX3P0bG4.woff2","assets/encaissement-pur-DvYbxN2l.js","assets/Encaissements-BQYjUgp5.js","assets/enfants-Dw9he1ec.js","assets/Engagements-Cj5S9MhG.css","assets/Engagements-DaLCDZV2.js","assets/equipe-DpPyq6h-.css","assets/Evaluation-Duac39pR.js","assets/FacturePrestataire-BF4ts-a4.js","assets/Factures-Cqbq_jsO.js","assets/Fil-DbZHDFUE.js","assets/finances-CCjqAkCE.css","assets/fournisseurs-BK5xKjBJ.js","assets/Fournisseurs-UPHmkg2K.js","assets/foyer-CA0ZeJLf.js","assets/HomeRituals-DoW8x6w6.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-aJj-3H6v.js","assets/identite-DuEdmQGk.js","assets/index-BkAk2O_X.js","assets/index.es-B3NKQovq.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-C9KydBzW.js","assets/jspdf.es.min-Bb36q9dO.js","assets/JustePrix-BKuNl9Kh.js","assets/kkiapay-CqZiGMez.js","assets/laboratoire-CFuNeQVN.js","assets/Laboratoire-Dig8gXub.js","assets/LettresAuDossier-Drzt6hNJ.js","assets/maisons-DZdAeMF9.js","assets/Marketing-BwMiTaF5.js","assets/Marque-Bm-09UnH.js","assets/momo-C2ZVfV9J.js","assets/MonMois-CXjp3Yzg.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-BkA-gq0W.js","assets/paliers-Ba3HYZ12.js","assets/Parametres-BJ1OZ56R.js","assets/parcours-BIjHs5zl.js","assets/Parrainages-CyHDZlLJ.js","assets/Parrainages-gAHAPB_6.css","assets/pdf-QgLdc0LJ.js","assets/Personas-PlCaLx_k.js","assets/Personnel-hf0i-et7.js","assets/photo-uPupNg1P.js","assets/pilotage-CybSwMA-.css","assets/Predictions-lna3AEqZ.js","assets/prestataires-3sawHUdc.js","assets/Prestataires-CYqIgKZn.js","assets/Prets-DByb7jTq.js","assets/promos-yIKEULp1.js","assets/protocoles-CyK0387P.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-nTyJIvgB.js","assets/quiz-5qMPWZVi.js","assets/Rapport-BsJxrH6D.js","assets/RattacherUneCarte-xuXipS6M.js","assets/Recommandations-CRab7Tci.js","assets/SalonFoyer-NBQkc3n_.js","assets/secretariat-admin-EWfW1WxM.js","assets/Secretariat-DlnSY8-4.js","assets/Synthese-BAC0v0OU.js","assets/systeme-C3XFIa8E.css","assets/Tableau-CfqjURMk.js","assets/Textes-C1Ksdowm.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-CDz6_wgl.js","assets/trone-DnuuvbFM.css","assets/trone-zAy6v4RV.js","assets/ui-DsJJGCm3.js","assets/vente-D0kdELDn.css","assets/Vitrine-yqbUoPTc.js","assets/_admin-LkgLXfc9.js","assets/_contrat-cm9qwUiu.js","assets/_heures-DnkVAWr-.js","assets/_shared-CERG6Qh2.js","assets/_signature-C8LufT6d.js","assets/_ui-BWMA-PlM.css","assets/_ui-BZVA5qTp.js"];
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
