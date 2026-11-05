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
const BUILD = "20261105085443";
const A_GARDER = ["./","assets/abonnements-C8CXtOF3.js","assets/Abonnements-DYnZQyZw.js","assets/Academie-Wa8V9LME.js","assets/Acces-BHPu3Ypd.js","assets/AFaire-DrOrYb6c.js","assets/afaire-xs8HwC2L.js","assets/Agents-CfvtbLli.js","assets/agents-donnees-BKLxxR0f.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-DFzxWhJt.js","assets/Appels-DRKBsnTs.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/Assistants-BOcxTwZO.css","assets/Assistants-C7wUQJ0w.js","assets/AtelierDesContenus-BoAPVv5v.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/Audience-7CEKDJN5.js","assets/Aujourdhui-B4KiQBUO.js","assets/avant-le-fauteuil-lecture-tkKlyVer.js","assets/AvantLeFauteuil-CZGydQqK.js","assets/avis-fiches-CMPW5fvs.js","assets/AvisGoogle-BDPS5rqy.js","assets/AvisGoogle-DaPXfwX9.css","assets/bilan-B-bfPYR0.css","assets/bilan-Cd-QwYhJ.js","assets/BilanMensuel-C5UQZM6m.js","assets/Branches-DGCQrF9f.js","assets/bridges-CosVrSax.js","assets/caisse-du-soir-tX81x_n0.js","assets/Caisse-qsd1avIa.js","assets/Caisses-BOf5qeDp.js","assets/Calendrier-CHha711C.js","assets/campagnes-pur-CamLum9E.js","assets/Carnet-BSPczLaL.js","assets/carte-CHDCAH7d.js","assets/carte-_W_-xBPj.css","assets/CarteModal-aeNSFlU-.js","assets/CartesCadeaux-BOWhefh-.js","assets/Catalogue-B10W2fA4.js","assets/CentreDeCommande-Bl0tQtS_.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-axrIQ0XE.js","assets/certificat-CZd49z_7.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-C35G58SW.js","assets/chiffre-du-jour-pur-jAp1gIqb.js","assets/ChiffreDesPrestations-BdSlMQ-c.js","assets/client-Da5Ylxzq.js","assets/cloture-du-jour-Fi-Bvn4N.js","assets/ClotureDuTiroir-C6vPx-E_.css","assets/ClotureDuTiroir-CToq9iGI.js","assets/Coffre-BGS6ZC6l.js","assets/components-ZrhU-mMG.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-CHlD1Qf7.js","assets/Comptes-C5S6XJtz.js","assets/consultation-BFX8guOP.js","assets/consultation-CRW6QcWf.css","assets/Consultations-BuobTGJ0.js","assets/consultNotes-Cw5z_qn_.js","assets/Conversations-CP-gXS4h.js","assets/Conversations-D4WwB5Zo.css","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-D73_5yFe.js","assets/currency-qfIhGmrs.js","assets/Customers-CfJ0itwW.js","assets/Dashboard-B2x7VsE_.css","assets/Dashboard-Q8vTa27N.js","assets/dates-BMM1GPXZ.js","assets/Demandes-fS6V-LUt.js","assets/DepenseEnUnePhrase-BIGRlGqP.css","assets/DepenseEnUnePhrase-mDY2Njkk.js","assets/Depenses-DwngcUkM.js","assets/depenses-saisie-eppWptYK.js","assets/dernier-message-pur-CBYWnq8m.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-DDF28o4e.js","assets/diagnostics-au-trone-BNZJZ6wa.js","assets/Dictee-D-KYh1CC.js","assets/Dictee-D2P9yM7v.css","assets/dictee-pur-Dy3VBgzl.js","assets/Discussions-76qSQ9Eg.js","assets/EditeurDesOffres-DfIPY3xk.js","assets/Encaissements-Cam-UByB.js","assets/enfants-CBWKDtPo.js","assets/Engagements-C3U7_SfY.js","assets/Engagements-Cj5S9MhG.css","assets/EntreDeuxSeances-DtrdsW6k.js","assets/Evaluation-DBOI0Cmf.js","assets/FacturePrestataire-CpyRwisO.js","assets/Factures-CfREdb6_.js","assets/FenetreDesCivilites-8Ra9gEDt.js","assets/FenetreDesCivilites-zfNk1aak.css","assets/FenetreDuPoint-D-PYKCx1.js","assets/Fil-C7WVBy6L.js","assets/finances-BMFnlkRx.css","assets/fon-CSDVHFY1.js","assets/Fournisseurs-bVTYRGFl.js","assets/fournisseurs-DIBgMSMO.js","assets/foyer-CZmoLL92.js","assets/Gerard-CP3QOjfk.css","assets/Gerard-DAAg_qY6.js","assets/gerard-donnees-D4A5V87C.js","assets/gestes-conversation-Bw5eT3JF.js","assets/HomeRituals-BEmrDVqM.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-HcCzYlv4.js","assets/ia-centre-C8OM9MnG.js","assets/ia-diagnostic-pur-BBLrGY5l.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-tableau-pur-CSRjGtTf.js","assets/identite-DgDpTtSm.js","assets/index-BaCwGNKj.js","assets/index.es-aZ2LlIDW.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-SnkBvX3Q.js","assets/jspdf.es.min-BW3HsjS2.js","assets/JustePrix-CpgR7KcQ.js","assets/kkiapay-uupOqDsY.js","assets/kkiapay-widget-DnUhUNd4.js","assets/Laboratoire-_DrT94Mz.js","assets/LaJournee-DflsGEmg.js","assets/LaJournee-DNg04cPb.css","assets/LettresAuDossier-ChGa6psr.js","assets/LienMndPay-BhKjKvzX.js","assets/Marketing-D0dMxPXx.js","assets/MarketingBranche-QoVxns9l.js","assets/Marque-lsO02O7W.js","assets/MesPourboires-Bng6yOST.js","assets/MesPourboires-D9I_9rZf.css","assets/MesTaches-Cc4XUDf6.css","assets/MesTaches-CFgP56wK.js","assets/momo-C2ZVfV9J.js","assets/MonMois-DY2NFNQF.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-BKFY1XEY.js","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/opale-Q-2WGmOf.js","assets/paliers-BX-Fu3lj.js","assets/Parametres-CRVdwGl6.js","assets/parcours-BhDMO0H2.js","assets/Parrainages-gAHAPB_6.css","assets/Parrainages-knJHstmx.js","assets/PassageAvantLeFauteuil-1PkmVyNj.js","assets/pdf-DiX_xYYo.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/Personas-CwlBktfU.js","assets/Personnel-mZAg9s-q.js","assets/photo-BoPR8nSM.js","assets/pilotage-D8kf1Co8.css","assets/Pourboires-Do47reCd.js","assets/Predictions-ssjTE7AX.js","assets/Prestataires-9roQidmU.js","assets/Prets-CLHg95vM.js","assets/PrevisionDuMois-DaL6nQon.js","assets/PrevisionDuMois-DlFTw3OX.css","assets/Previsions-BvitQ8Jf.js","assets/previsions-pur-DKsqpBRo.js","assets/Previsions-r4v19Anp.css","assets/processus-pur-R6U5QcCi.js","assets/Projets-COO7WDEE.css","assets/Projets-CP9U4gMu.js","assets/projets-DAMVYdf-.js","assets/projets-pur-2ZEMRNDU.js","assets/protocoles-D3ZfC6jP.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-BycuQpF8.js","assets/qualification-DIv-NV5q.js","assets/quiz-5qMPWZVi.js","assets/Rapport-NBR9-vHz.js","assets/Recommandations-CpP4wQIX.js","assets/regler-C5hcM02_.css","assets/regler-jHT2BV3q.js","assets/regler-la-seance-serveur-Bs6rzqZX.js","assets/relances-pur-lwRTXc5E.js","assets/releve-des-avis-C7TN9eJd.js","assets/SalonFoyer-CQva5qqu.js","assets/secretariat-admin-DXn4sLWo.js","assets/Secretariat-C1VQhN2R.js","assets/Secretariat-Cy79Zw30.css","assets/Signatures-B818kPRV.js","assets/SignerUnPdf-Dt2MC4gg.js","assets/Synthese-QSmsxPoh.js","assets/SyntheseGraphes-CKx-kmPq.js","assets/systeme-TPy-pF7j.css","assets/Tableau-CTpmIVjL.js","assets/temps-26H5AvL9.js","assets/Textes-CfKBGrv3.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-CkDzpGy0.css","assets/tiroirs-DXENyRyy.js","assets/trone-7Sbg8kQ0.js","assets/trone-DQVzvvmA.css","assets/useAudiences-CztPR9oZ.js","assets/useClotureDuJour-DQmPV1yY.js","assets/Vitrine-BWilTqQJ.css","assets/Vitrine-D4qP7XH0.js","assets/_admin-Cw5d0z7W.js","assets/_contrat-C6adraf3.js","assets/_heures-Bi22QZRn.js","assets/_reuni-Cj-Ec9pS.js","assets/_shared-BGYm3Q4m.js","assets/_signature-BTCWEoOC.js","assets/_ui-BWMA-PlM.css","assets/_ui-CRY_1VG7.js"];
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
