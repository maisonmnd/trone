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
const BUILD = "20261112094020";
const A_GARDER = ["./","assets/abonnements-BFO-zpQJ.js","assets/Abonnements-DTY7p2DH.css","assets/Abonnements-p9pNO5ZD.js","assets/Academie-D3BTN-Pg.js","assets/Acces-CJhDdIGj.js","assets/AFaire-DEc7QVmb.js","assets/afaire-jlTyo762.js","assets/Agents-BWm4Adku.js","assets/agents-donnees-gmuV_YNU.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-Dhujw5R7.js","assets/Appels-Bn0MQ8jv.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/Assistants-D5y_9k1X.js","assets/Assistants-D9i2Xwmg.css","assets/AtelierDesContenus-CHTZ6fxH.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/Audience-CY1Iy7Vz.js","assets/Aujourdhui-rkdfYPTx.js","assets/avant-le-fauteuil-lecture-mv8YtkIq.js","assets/AvantLeFauteuil-CXmNcZfV.js","assets/avis-fiches-DW6pKbCQ.js","assets/AvisGoogle-DaPXfwX9.css","assets/AvisGoogle-DOaFjO1U.js","assets/BadgeEssai-CaQ5NdKZ.js","assets/bilan-B-bfPYR0.css","assets/bilan-DjOLwtCO.js","assets/BilanMensuel-DEM8Ux-s.js","assets/Branches-WC_MC3Vj.js","assets/bridges-BwefpEZH.js","assets/Caisse-BipYwtCr.js","assets/caisse-du-soir-C6vPx-E_.css","assets/caisse-du-soir-D1oBjX76.js","assets/Caisses-CxDQD1Oz.js","assets/Calendrier-qYXWwsHl.js","assets/campagnes-pur-Cy6q2F5w.js","assets/Carnet-B1dxMO_I.js","assets/carte-CfpvlOsc.js","assets/carte-_W_-xBPj.css","assets/CarteModal-BAhtXgXF.js","assets/CartesCadeaux-CR-KKh4i.js","assets/Catalogue-EICK-LPf.js","assets/CentreDeCommande-BX-3D2mb.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-k_775zM_.js","assets/certificat-DK9Q9Ra1.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-C8ghsUJn.js","assets/chiffre-du-jour-pur-CQc3jmgr.js","assets/ChiffreDesPrestations-DXwGs1K3.js","assets/client-xG2bIUsF.js","assets/cloture-du-jour-ClRIva0-.js","assets/ClotureDuTiroir-DLwZMTx-.js","assets/Coffre-Ca8DfnoI.js","assets/collecte-mtn-pur-DW4nw7-V.js","assets/components-PHQdMLIp.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-C7LtAV6I.js","assets/Comptes-PjKmjKKO.js","assets/consultation-Chu658sK.js","assets/consultation-CRW6QcWf.css","assets/Consultations-DW4op9wA.js","assets/consultNotes-msWZJ_M7.js","assets/Conversations-CtgpY7_x.js","assets/Conversations-D4WwB5Zo.css","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-DphM-5fZ.js","assets/currency-qfIhGmrs.js","assets/Customers-C45Hgm5r.js","assets/Dashboard-B2x7VsE_.css","assets/Dashboard-BvQ15H67.js","assets/dates-ChD_aAFp.js","assets/Demandes-BCbPoa7m.js","assets/DepenseEnUnePhrase-Bd_m__0_.js","assets/DepenseEnUnePhrase-BIGRlGqP.css","assets/Depenses-CjA1AhWf.js","assets/depenses-saisie-CjCve5-w.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-DJX5An4Q.js","assets/diagnostics-au-trone-CN9zLkMl.js","assets/Dictee-ClOYWZP3.js","assets/Dictee-D2P9yM7v.css","assets/dictee-pur-BFofxtIV.js","assets/Discussions-CT5ZLuvu.js","assets/EditeurDesOffres-i9Wl7MjJ.js","assets/Encaissements-C1pPZw3E.js","assets/enfants-5JH5GAus.js","assets/Engagements-Cj5S9MhG.css","assets/engagements-coffre-v3wbZLZg.js","assets/Engagements-RLzGWOhI.js","assets/EntreDeuxSeances-Bh1tD6vQ.js","assets/Evaluation-DF8SDr5D.js","assets/facture-B37ZJ5Ky.js","assets/Factures-0qtdDcVI.js","assets/FenetreDesCivilites-BfdyO8rp.js","assets/FenetreDesCivilites-zfNk1aak.css","assets/FenetreDuPoint-CNsX_HqG.js","assets/Fil-LoZKHbuB.js","assets/finances-Ds4kOIUN.css","assets/fon-C-FUpI97.js","assets/Fournisseurs-B9MPRf_I.js","assets/fournisseurs-e1g1St01.js","assets/foyer-LNSznZYT.js","assets/Gerard-Cgj-zsJh.css","assets/Gerard-DJkYYmNU.js","assets/gerard-donnees-B10f7tQh.js","assets/gestes-conversation-BG6lrzYO.js","assets/heures-des-rappels-pur-Dig9pZpo.js","assets/HomeRituals-CmWKAZdJ.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-DHBApKy5.js","assets/ia-centre-DFaxdHbP.js","assets/ia-diagnostic-pur-BBLrGY5l.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-tableau-pur-p6UvREJe.js","assets/identite-7QGrS2mY.js","assets/index-NUfOyovL.js","assets/index.es-NGf8ESau.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-CckvUARg.js","assets/jspdf.es.min-BbnCegkq.js","assets/JustePrix-BVs9iQ-M.js","assets/kkiapay-0r2v6O8r.js","assets/kkiapay-widget-DnUhUNd4.js","assets/Laboratoire-CmFVx_lQ.js","assets/LaJournee-Bn_G0HCt.css","assets/LaJournee-DwaoeMk3.js","assets/LesPaiements-C9cEZlne.css","assets/LesPaiements-DqnM2yht.js","assets/LettresAuDossier-BjPtbDfy.js","assets/LienMndPay-D9BZ_TvH.js","assets/Marketing-BohoFW7e.js","assets/MarketingBranche-DQyspYvd.js","assets/Marque-CkMrl-xz.js","assets/MesPourboires-BQ5M8wo3.js","assets/MesPourboires-CENjelyb.css","assets/MesTaches-C4VBFgfG.js","assets/MesTaches-Cc4XUDf6.css","assets/momo-C2ZVfV9J.js","assets/MonMois-DGBFVSwx.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/MtnMoMo-C5LTuw5U.js","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/objectifs-iKGWGJW0.js","assets/opale-CU1SnEvy.js","assets/oreille-B1AMUmZh.js","assets/paie-du-5-D7bzPCAm.js","assets/paie-du-5-DeJq-K_U.css","assets/paie-du-5-pur-CPiCK8fv.js","assets/paie-par-mtn-C5nbt0VA.js","assets/PaieParMtn-Zkuv2uyv.js","assets/paliers-CC95WBNv.js","assets/Parametres-ALLqXOjf.js","assets/parcours-BQdwv5RP.js","assets/Parrainages-B2QI3y7K.js","assets/Parrainages-gAHAPB_6.css","assets/PassageAvantLeFauteuil-7uTMd6RX.js","assets/pdf-Bm6Bh4iQ.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/periode-des-pourboires-pur-BUWqfwov.js","assets/Personas-BD-w5NaE.js","assets/Personnel-cVR5TW54.js","assets/photo-DJ07rUTd.js","assets/pilotage-D8kf1Co8.css","assets/Pourboires-De5wHh5s.js","assets/Predictions-B4W5kyDA.js","assets/Prestataires-Bh0hyYJ6.js","assets/Prets-BiM5t8h7.js","assets/PrevisionDuMois-DdYut-Iz.js","assets/PrevisionDuMois-DlFTw3OX.css","assets/Previsions-9BU2Vg1T.css","assets/previsions-pur-BUMAy6nZ.js","assets/Previsions-UAsbtcuP.js","assets/processus-pur-R6U5QcCi.js","assets/Projets-COO7WDEE.css","assets/Projets-MkLbDSNC.js","assets/projets-pur-2ZEMRNDU.js","assets/projets-WHlWxNZe.js","assets/protocoles-DcApboMj.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-WYyyyHug.js","assets/qualification-C7v8iJYq.js","assets/quiz-5qMPWZVi.js","assets/Rapport-CXuubBNv.js","assets/Recommandations-OYcyvJd-.js","assets/regler-DHR_B1Dm.css","assets/regler-v1WrBZSj.js","assets/relances-pur-BacTXlI2.js","assets/releve-des-avis-75NF50_6.js","assets/SalonFoyer-BaRoWj3w.js","assets/secretariat-admin-j072Wduj.js","assets/Secretariat-Cy79Zw30.css","assets/Secretariat-D0Sx1Dmj.js","assets/Signatures-DDHyfhjY.js","assets/SignerUnPdf-Cg85fpyn.js","assets/Synthese-DMF6Xa6V.js","assets/SyntheseGraphes-CQoA36dj.js","assets/systeme-TPy-pF7j.css","assets/Tableau-CUInAfnz.js","assets/temps-BDP4iUiy.js","assets/Textes-DLpOzRbT.css","assets/Textes-DRcZ4YPl.js","assets/tiroirs-BTfgUgkT.js","assets/tiroirs-CkDzpGy0.css","assets/trone-BIh48Jqq.js","assets/trone-CXlHCleb.css","assets/useAudiences-jZxhfRCC.js","assets/useClotureDuJour-DqPvmHLN.js","assets/Vitrine-Bmc1-eWX.js","assets/Vitrine-BWilTqQJ.css","assets/_admin-CSYS-a3U.js","assets/_contrat-MfCRvP0u.js","assets/_reuni-DE_vHEwz.js","assets/_shared-BhR1czIG.js","assets/_signature-B9mAB_Ji.js","assets/_ui-BrUDlmuM.css","assets/_ui-DokDtdk_.js"];
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
