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
const BUILD = "20261019085906";
const A_GARDER = ["./","assets/Abonnements-CJxpTyXn.js","assets/abonnements-wM6mWUo2.js","assets/Academie-Dm_DKIia.js","assets/Acces-DYAXVz7D.js","assets/actions-VNy1vc7o.js","assets/afaire-Ca7GD7C5.js","assets/AFaire-Kk5Jx4gk.js","assets/Analytics-Curga-I8.js","assets/Appels-B64KoSHu.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/AtelierDesContenus-WJ0cFDEm.js","assets/Aujourdhui-CXEJMzeY.js","assets/bilan-B-bfPYR0.css","assets/bilan-ER40ErBD.js","assets/BilanMensuel-BV-Pv4rG.js","assets/Branches-BnQyw4lW.js","assets/bridges-B2GyRwW-.js","assets/Caisse-B_BeC9Tx.js","assets/caisse-du-soir-CoWMb5VY.js","assets/Caisses-CyZ0UTH6.js","assets/Calendrier-vkIqhnaE.js","assets/Carnet-k5KkVRMy.js","assets/carte-TD6YIedK.js","assets/carte-WI2qP1su.css","assets/CarteModal-DPvGg9za.js","assets/CartesCadeaux-nl2jYVoa.js","assets/Catalogue-Ca_8np6P.js","assets/CentreDeCommande-Du8kyJhp.css","assets/CentreDeCommande-gu_a3wZl.js","assets/Cercle-8E91EC3c.js","assets/certificat-BrYVkQ4z.js","assets/certificat-DVSxho5e.css","assets/certificats-coffre-CnbKm4Aa.js","assets/ChiffreDesPrestations-eRkKXMbv.js","assets/ClotureDuTiroir-BG_lrwjU.js","assets/ClotureDuTiroir-C6vPx-E_.css","assets/Coffre-rkzsgqE5.js","assets/components-CT1bwcBf.js","assets/compte-B5zQXwU5.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-DiLKmvwE.js","assets/Comptes-Bn4TaRd9.js","assets/Comptoir-Csv_dtC9.js","assets/consultation-CCTm16qX.css","assets/consultation-DUBY-S9-.js","assets/Consultations-BrxMtkMx.js","assets/consultNotes-BpQ4sUHw.js","assets/Conversations-BXgjEygg.js","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-B0YlVkYk.js","assets/currency-qfIhGmrs.js","assets/Customers-COFgA0m1.js","assets/Dashboard-smA1315M.js","assets/dates-Cns4pWsk.js","assets/Demandes-BJg8P6UW.js","assets/Depenses-xQUUsV4g.js","assets/devise-fon-DX3P0bG4.woff2","assets/encaissement-pur-ClJBX75g.js","assets/Encaissements-CAHGN2Uf.js","assets/enfants-BE8PVtWf.js","assets/Engagements-BcqiX5Nv.js","assets/Engagements-Cj5S9MhG.css","assets/EntreDeuxSeances-DTGdH7LS.js","assets/equipe-DpPyq6h-.css","assets/Evaluation-BYOzd7SR.js","assets/FacturePrestataire-iqfSmKk_.js","assets/Factures-x9s18OVs.js","assets/Fil-3-S-DSLb.js","assets/finances-CCjqAkCE.css","assets/fournisseurs-B1TtDO4U.js","assets/Fournisseurs-BAa9__Lx.js","assets/foyer-CYcJV1-2.js","assets/gestes-conversation-QUiAg5ck.js","assets/HomeRituals-C_ouKc_J.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-C1b4SHQD.js","assets/identite-CWDXLmSq.js","assets/index-wIPtizXN.js","assets/index.es-CgqlRqW1.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-eGHzkgyu.js","assets/jspdf.es.min-B8Y30iQg.js","assets/JustePrix-Da91yvzO.js","assets/kkiapay-C1AHrKvV.js","assets/Laboratoire-BqrWFI-9.js","assets/laboratoire-CRxGYBrL.js","assets/LettresAuDossier-DliRzVGF.js","assets/maisons-CSSFrqZy.js","assets/Marketing-DWsP4mLu.js","assets/Marque-yPQJFTfG.js","assets/momo-C2ZVfV9J.js","assets/MonMois-Da0wZq8K.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-b9YHwSTX.js","assets/paliers-CXe6MCpo.js","assets/Parametres-BzKxFGan.js","assets/parcours-BScu41Md.js","assets/Parrainages-D2PQi5wL.js","assets/Parrainages-gAHAPB_6.css","assets/pdf-Cy9GPGCt.js","assets/pdf-de-la-piece-2RSrGLvv.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/Personas-ClsyWD3_.js","assets/Personnel-BtEpWWVN.js","assets/photo-Y_ezEns4.js","assets/pilotage-Bn1gP_oo.css","assets/Predictions-B87o0PBq.js","assets/Prestataires-BN1l_E2l.js","assets/prestataires-CGgqvpsz.js","assets/Prets-Cw4_G0So.js","assets/promos-Dhd2uB7g.js","assets/protocoles-DPLtZNEk.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-ClQ5Crwf.js","assets/quiz-5qMPWZVi.js","assets/Rapport-DZsxciqr.js","assets/RattacherUneCarte-BrIAtv_3.js","assets/Recommandations-Cv23EQ3I.js","assets/relances-pur-DHxkbBX5.js","assets/SalonFoyer-dFjOwO3k.js","assets/secretariat-admin-BzljjWts.js","assets/Secretariat-Cdjew_nf.js","assets/Signatures-yaG6vt9Z.js","assets/SignerUnPdf-EXWDMaX0.js","assets/Synthese-BIJCyf_K.js","assets/systeme-C3XFIa8E.css","assets/Tableau-BcptGvtm.js","assets/Textes-DLpOzRbT.css","assets/Textes-ejm_qzPK.js","assets/tiroirs-CyAiGs2F.js","assets/tri-des-caisses-pur-6dI7l291.js","assets/trone-CyFdPxg0.css","assets/trone-CYQwtY2n.js","assets/ui-DGSc9XCO.js","assets/vente-DMe4r4ed.css","assets/Vitrine-CMvmmoC2.js","assets/_admin-WF221vyy.js","assets/_contrat-DGSPYDso.js","assets/_heures-CTxtCT1s.js","assets/_reuni-mdRhZzyL.js","assets/_shared-DBO36OgD.js","assets/_signature-BDHeVrWH.js","assets/_ui-BWMA-PlM.css","assets/_ui-D4xqz5MN.js"];
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
