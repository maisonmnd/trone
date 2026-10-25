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
const BUILD = "20261025110409";
const A_GARDER = ["./","assets/Abonnements-BLfpoYsY.js","assets/abonnements-DsRWJC1H.js","assets/Academie-ZFtZeF1A.js","assets/Acces-FKnkLTq7.js","assets/actions-i841UNzj.js","assets/AFaire-CV6fwDJ8.js","assets/afaire-nTR9KSIc.js","assets/Agents-BoUX7EnQ.js","assets/agents-donnees-BS_eI-SN.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-BSyrPmUL.js","assets/Appels-eH9IuSCA.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/AtelierDesContenus-BjIzzJID.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/AuComptoir-rNXBlFt7.js","assets/Aujourdhui-DETIESxW.js","assets/avis-fiches-BZXOFEYT.js","assets/bilan-B-bfPYR0.css","assets/bilan-BfqjNOZg.js","assets/BilanMensuel-BFSN1hJf.js","assets/Branches-YtYSHobK.js","assets/bridges-Bp9At_JJ.js","assets/Caisse-CMC_Z0_T.js","assets/caisse-du-soir-B5GGUQE9.js","assets/Caisses-BWIxEd5v.js","assets/Calendrier-DtO5ZbDQ.js","assets/Carnet-Cx1EIJVf.js","assets/carte-CCfYWow6.js","assets/carte-DWlSbalk.css","assets/CarteModal-yf7Vyk6I.js","assets/CartesCadeaux-BZhok_0d.js","assets/Catalogue-I8zmS8ks.js","assets/CentreDeCommande-Bb_AGZMH.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-BdTIFVYc.js","assets/certificat-9_XWf1iQ.css","assets/certificat-B5jFOUi5.js","assets/certificats-coffre-CWl6GBGb.js","assets/chiffre-du-jour-pur-DYNsyaek.js","assets/ChiffreDesPrestations-BOC0DybY.js","assets/client-DYSYMAui.js","assets/ClotureDuTiroir-C6vPx-E_.css","assets/ClotureDuTiroir-CgNgeL-D.js","assets/Coffre-DroBdm9G.js","assets/components-yAY4XMbH.js","assets/compte-ByU_qSx5.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-DvLjH8eM.js","assets/Comptes-CnFFiJJl.js","assets/Comptoir-Btlrcdff.js","assets/consultation-CAqgJBkd.js","assets/consultation-DQBnwlMN.css","assets/Consultations-DcxoGfCv.js","assets/consultNotes-B5uJRAkG.js","assets/Conversations-5zdQM7w_.js","assets/Conversations-D4WwB5Zo.css","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-C3a-Z9MM.js","assets/currency-qfIhGmrs.js","assets/Customers-e8Dd_wKT.js","assets/Dashboard-B8qK6Flt.css","assets/Dashboard-LTFi3Yag.js","assets/dates-D3gjrADZ.js","assets/Demandes-0WjaLR6i.js","assets/Depenses-CjsiUcCg.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-BgwAv8wg.js","assets/diagnostics-au-trone-CtKI6QDV.js","assets/Discussions-4-CM0as_.js","assets/Encaissements-C6Xvf7Er.js","assets/enfants-oxs8MGHm.js","assets/Engagements-C4F4n3ci.js","assets/Engagements-Cj5S9MhG.css","assets/EntreDeuxSeances-vHcSRkkQ.js","assets/equipe-B_9ZHz24.css","assets/Evaluation-B5bp38p-.js","assets/FacturePrestataire-CbnBWoli.js","assets/Factures-DZZTC08-.js","assets/Fil-BhTt1MpU.js","assets/finances-BMFnlkRx.css","assets/Fournisseurs-CZtzer30.js","assets/fournisseurs-DeiSlDoe.js","assets/foyer-NpVhvWd8.js","assets/gestes-conversation-DgT_XjGO.js","assets/HomeRituals-BCNGr0HO.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-CwQaZJfr.js","assets/ia-diagnostic-pur-BulIFgZQ.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-recu-pur-DcucZqpR.js","assets/identite-D_Zh_qSN.js","assets/index-DmLMiyTw.js","assets/index.es-DfdeSacp.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-CYo1BlD3.js","assets/jspdf.es.min-BksEsjH9.js","assets/JustePrix-VFEwB34f.js","assets/kkiapay-widget-DnUhUNd4.js","assets/kkiapay-zkGNwgta.js","assets/Laboratoire-Cp7oEMS_.js","assets/laboratoire-CzF64UMb.js","assets/LettresAuDossier-CdE1RFRI.js","assets/LienMndPay-B6bTRC-1.js","assets/maisons-CSSFrqZy.js","assets/Marketing-xCZ0dV-U.js","assets/Marque-BVUJsr09.js","assets/MesTaches-Cc4XUDf6.css","assets/MesTaches-CFhCeseg.js","assets/momo-C2ZVfV9J.js","assets/MonMois-C7652KCY.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-Ch1inVoE.js","assets/paliers-BjiBwGRv.js","assets/Parametres-DcEWdQgH.js","assets/parcours-w9q3VTZT.js","assets/Parrainages-DbYm6OHI.js","assets/Parrainages-gAHAPB_6.css","assets/pdf-D5mwNpXi.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/Personas-BfOxZbaP.js","assets/Personnel-CGaEzmj7.js","assets/photo-hOiOHiyx.js","assets/pilotage-D8kf1Co8.css","assets/Predictions-CmHDA2Tf.js","assets/prestataires-DvXwSRg-.js","assets/Prestataires-DzvGXcFb.js","assets/Prets-DmYLzoMm.js","assets/projets-B3VTgC-X.js","assets/Projets-BFIVAqdy.js","assets/Projets-COO7WDEE.css","assets/projets-pur-2ZEMRNDU.js","assets/protocoles-PlpZ95MA.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-DactMTBF.js","assets/qualification-B61cjwuV.js","assets/quiz-5qMPWZVi.js","assets/Rapport-DZGASN8o.js","assets/RattacherUneCarte-YdjZ4RUl.js","assets/Recommandations-CDonQcu7.js","assets/regler-BsYkAClm.js","assets/regler-la-seance-serveur-BpExlC5z.js","assets/regler-YZ8GtHfl.css","assets/relances-pur-DsIo28uB.js","assets/releve-des-avis-CzullYqW.js","assets/SalonFoyer-Dz7ryyNb.js","assets/secretariat-admin-CPp5tUbE.js","assets/Secretariat-CNAr2Wtt.js","assets/Secretariat-Cy79Zw30.css","assets/Signatures-EuOlEUkI.js","assets/SignerUnPdf-DxLPnqM0.js","assets/Synthese-B6R4FZdq.js","assets/SyntheseGraphes-C0P67aTr.js","assets/systeme-C3XFIa8E.css","assets/Tableau-Cann6M9Y.js","assets/Textes-BSn4Y1Ta.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-CbdcpfpB.js","assets/trace-du-moyen-pur-Bx8-suHn.js","assets/trone-Cetizscn.js","assets/trone-D8OItLFw.css","assets/ui-Z4rpi56q.js","assets/useAudiences-CceMBjvl.js","assets/vente-C7YWXkHo.css","assets/Vitrine-2XK70CYm.js","assets/Vitrine-Cs-c3_Mr.css","assets/_admin-QkDDEZE3.js","assets/_contrat-CR3a1t0j.js","assets/_heures-DRcvfmGa.js","assets/_reuni-574-Ss00.js","assets/_shared-DBR60xn9.js","assets/_signature-DZU4zRXa.js","assets/_ui-BWMA-PlM.css","assets/_ui-DyhsI0IC.js"];
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
