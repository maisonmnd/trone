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
const BUILD = "20261018222536";
const A_GARDER = ["./","assets/abonnements-ni2vbbq9.js","assets/Abonnements-PZehZDxt.js","assets/Academie-BG3XJDpf.js","assets/Acces-Bo2HZEYt.js","assets/actions-C-oyZEwk.js","assets/AFaire-BjydoNFv.js","assets/afaire-CrmWfXkf.js","assets/Analytics-DVWHdxr4.js","assets/Appels-UGTEDs1m.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/AtelierDesContenus-CveIobwp.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/Aujourdhui-C9CxY-aW.js","assets/bilan-B-bfPYR0.css","assets/bilan-DiMZFy3W.js","assets/BilanMensuel-BVhMaJXj.js","assets/Branches-CAo7HBhb.js","assets/bridges-BhbDenUa.js","assets/Caisse-CGgzM5em.js","assets/caisse-du-soir-Bov9rJAa.js","assets/Caisses-Be2L8X-s.js","assets/Calendrier-v497Xsdu.js","assets/Carnet-DoCtEMlN.js","assets/carte-DfhCchHh.js","assets/carte-WI2qP1su.css","assets/CarteModal-CrehvvK4.js","assets/CartesCadeaux-CHzg9jPL.js","assets/Catalogue-CV5C0i4c.js","assets/CentreDeCommande-B-QlZ2v9.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-BdQu7khP.js","assets/certificat-C86qH3aE.js","assets/certificat-DVSxho5e.css","assets/certificats-coffre-DSJuhMcS.js","assets/ChiffreDesPrestations-BhGGwioK.js","assets/ClotureDuTiroir-BRMAGytl.js","assets/ClotureDuTiroir-C6vPx-E_.css","assets/Coffre-CWS3HjiL.js","assets/components-CAFl7RA7.js","assets/compte-BwqN1EYG.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-CNUJUP2e.js","assets/Comptes-DcT3pAog.js","assets/Comptoir-wUywxL75.js","assets/consultation-CCTm16qX.css","assets/consultation-RdEL0dcD.js","assets/Consultations-DX75e97e.js","assets/consultNotes-D3dLimPC.js","assets/Conversations-DexXILdf.js","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-D5O_9iYj.js","assets/currency-qfIhGmrs.js","assets/Customers-DKUYM85D.js","assets/Dashboard-BjbVgNmr.js","assets/dates-BTMhqWRa.js","assets/Demandes-DcGxtWG2.js","assets/Depenses-Dsqm1crp.js","assets/devise-fon-DX3P0bG4.woff2","assets/encaissement-pur-QbkrdvRC.js","assets/Encaissements-D79BcZG8.js","assets/enfants-Dc5FXVbn.js","assets/Engagements-Cj5S9MhG.css","assets/Engagements-Kz23hY1G.js","assets/EntreDeuxSeances-8gKkhzAe.js","assets/equipe-DpPyq6h-.css","assets/Evaluation-B8NZyLqD.js","assets/FacturePrestataire-CH7u-JYi.js","assets/Factures-D_Zsef-u.js","assets/Fil-cYAaLUnz.js","assets/finances-CCjqAkCE.css","assets/fournisseurs-BapDHJR_.js","assets/Fournisseurs-BSs700R7.js","assets/foyer-BvDSYI8h.js","assets/gestes-conversation-C2yqL9ZD.js","assets/HomeRituals-Wht3U1IN.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-CzPw8uP0.js","assets/identite-BVho5jNk.js","assets/index-DHolBtZv.js","assets/index.es-CQmVrauP.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-np9Acasc.js","assets/jspdf.es.min-2E_YiIpE.js","assets/JustePrix-DIqiy48R.js","assets/kkiapay-CyE5yqCu.js","assets/Laboratoire-5ZGq_ey2.js","assets/laboratoire-T5FApnWz.js","assets/LettresAuDossier-CIvpGi-8.js","assets/maisons-CSSFrqZy.js","assets/Marketing-igo_AR5x.js","assets/Marque-CVPzNKoE.js","assets/momo-C2ZVfV9J.js","assets/MonMois-kLsU-OZb.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-BG1JbvyD.js","assets/paliers-MxQBpono.js","assets/Parametres-COCNKQma.js","assets/parcours-CRyp1xCB.js","assets/Parrainages-Cd_1O-FG.js","assets/Parrainages-gAHAPB_6.css","assets/pdf-de-la-piece-C-XR4fQK.js","assets/pdf-DHNFUjMc.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/Personas-CgWMbSSz.js","assets/Personnel-D9MDekek.js","assets/photo-DVAp98VM.js","assets/pilotage-Bn1gP_oo.css","assets/Predictions-C0Rz7ssn.js","assets/Prestataires-BaT5scIg.js","assets/prestataires-DzBLT5HQ.js","assets/Prets-Y5vF3nEO.js","assets/promos-CE-7Hpy_.js","assets/protocoles-BkBsvcHa.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-Z_y-cmMG.js","assets/quiz-5qMPWZVi.js","assets/Rapport-DE_hs_Iv.js","assets/RattacherUneCarte-BG2Y0kos.js","assets/Recommandations-B6IYq1ST.js","assets/relances-pur-DHxkbBX5.js","assets/SalonFoyer-CMbNsAfq.js","assets/secretariat-admin-DPt1NUjc.js","assets/Secretariat-BHo6rew1.js","assets/Signatures-x3KhaRJp.js","assets/SignerUnPdf-xqUoqDOt.js","assets/Synthese-gGpk1Rvr.js","assets/systeme-C3XFIa8E.css","assets/Tableau-RQBVUG9b.js","assets/Textes-CwED2_Qc.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-DQh5068h.js","assets/trace-du-moyen-pur-DBHO-lg5.js","assets/trone-BBcCb_Ie.js","assets/trone-CyFdPxg0.css","assets/ui-B4sQRZK3.js","assets/vente-DMe4r4ed.css","assets/Vitrine-CvzOyuPN.js","assets/_admin-CeIH3NHs.js","assets/_contrat-JTdGFoub.js","assets/_heures-BzLPfiFo.js","assets/_reuni-BQNEcdlN.js","assets/_shared-DSTQa4SS.js","assets/_signature-B0Fy5XLM.js","assets/_ui-BWMA-PlM.css","assets/_ui-CyMfU5FQ.js"];
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
