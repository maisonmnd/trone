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
const BUILD = "20261105051539";
const A_GARDER = ["./","assets/abonnements-CHLDDYaX.js","assets/Abonnements-fyDKo2NT.js","assets/Academie-Dlh7rhB5.js","assets/Acces-CTzFzU9-.js","assets/AFaire-BW9kH_Hf.js","assets/afaire-n1SU12K2.js","assets/Agents-BN1VQDCc.js","assets/agents-donnees-DjS2PQxg.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-Co01_WOX.js","assets/Appels-CyLsp9Rp.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/Assistants-BOcxTwZO.css","assets/Assistants-CyvxAYFT.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/AtelierDesContenus-SLBMBmkw.js","assets/Audience-DX1hadKN.js","assets/Aujourdhui-C9iaYbtl.js","assets/avant-le-fauteuil-lecture-P-C88Cf9.js","assets/AvantLeFauteuil-DVKwCqjY.js","assets/avis-fiches-yjvbyC35.js","assets/AvisGoogle-DaPXfwX9.css","assets/AvisGoogle-DiaCiyPO.js","assets/bilan-B-bfPYR0.css","assets/bilan-DxxxgEnS.js","assets/BilanMensuel-CK0Ghrwo.js","assets/Branches-CbF-7Qt9.js","assets/bridges-CGt_verw.js","assets/Caisse-6lJQhYZu.js","assets/caisse-du-soir-C9Di4Hku.js","assets/Caisses-DATqrdSX.js","assets/Calendrier-5f_gE_Yr.js","assets/campagnes-pur-BwADD9za.js","assets/Carnet-BWP0hjX1.js","assets/carte-xK3_182D.js","assets/carte-_W_-xBPj.css","assets/CarteModal-CXjBceCb.js","assets/CartesCadeaux-v5IPeIm5.js","assets/Catalogue-ZhftgRH1.js","assets/CentreDeCommande-4pFgRCd2.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-Cg5XOFlb.js","assets/certificat-BdG9xoRz.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-DGxSKQZQ.js","assets/ChiffreDesPrestations-CLAk_a_M.js","assets/client-C-DTKDbz.js","assets/cloture-du-jour-Ds3Dj_U1.js","assets/ClotureDuTiroir-C6vPx-E_.css","assets/ClotureDuTiroir-CPhF8GuY.js","assets/Coffre-W9KIa4MO.js","assets/components-DUATBThJ.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-CNI6dmle.js","assets/Comptes-zzbUO9JN.js","assets/consultation-CE-Z0Y3p.js","assets/consultation-CRW6QcWf.css","assets/Consultations-Ds_mfxIb.js","assets/consultNotes-DbNy4qYn.js","assets/Conversations-BScEc-FV.js","assets/Conversations-D4WwB5Zo.css","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-DhP2FdFE.js","assets/currency-qfIhGmrs.js","assets/Customers-Cb4Nwj-2.js","assets/Dashboard-hOfh-H6e.js","assets/Dashboard-zjGteuUE.css","assets/dates-B95P5oP6.js","assets/Demandes-CoBS3ofZ.js","assets/Depenses-B1CoGTlE.js","assets/depenses-saisie-CCYL7jgw.js","assets/dernier-message-pur-CBYWnq8m.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-B8g2DU7v.js","assets/diagnostics-au-trone-CAMljvxT.js","assets/Dictee-CuSvkRZH.js","assets/Dictee-D2P9yM7v.css","assets/dictee-pur-CxJgi9w-.js","assets/Discussions-DoLBj8cE.js","assets/EditeurDesOffres-5QglE7wM.js","assets/Encaissements-Cx0v3uss.js","assets/enfants-CyTsE3KK.js","assets/Engagements-BLrt8aIp.js","assets/Engagements-Cj5S9MhG.css","assets/EntreDeuxSeances-BjoLGTOl.js","assets/Evaluation-DItrN7P_.js","assets/FacturePrestataire-BU3Q90xu.js","assets/Factures-BbWDT-7E.js","assets/FenetreDesCivilites-B2iich4Q.js","assets/FenetreDesCivilites-zfNk1aak.css","assets/FenetreDuPoint-jgw7IHUF.js","assets/Fil-DMuCm-fw.js","assets/finances-BMFnlkRx.css","assets/fon-DKDX-cCw.js","assets/fournisseurs-7GoqGyht.js","assets/Fournisseurs-Dnacpb-6.js","assets/foyer-BNygTNtm.js","assets/Gerard-Bfp4ua88.css","assets/gerard-donnees-zI1YG4kM.js","assets/Gerard-DvkWyA3d.js","assets/gestes-conversation-BxWfPZeI.js","assets/HomeRituals-CGiHuPKz.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-F7_IuqRk.js","assets/ia-centre-CBztGIXa.js","assets/ia-diagnostic-pur-BBLrGY5l.js","assets/ia-marque-pur-C5lSdGpx.js","assets/identite-CyYfvLne.js","assets/index-C9IdCAYs.js","assets/index.es-DJrUS60h.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-okboYC-f.js","assets/jspdf.es.min-CeN6sraG.js","assets/JustePrix-BD5eeoTU.js","assets/kkiapay-CRWaTwDd.js","assets/kkiapay-widget-DnUhUNd4.js","assets/la-journee-B57jjuxq.js","assets/la-journee-DNg04cPb.css","assets/Laboratoire--OeIPK73.js","assets/LaJournee-8otqDlAa.js","assets/LettresAuDossier-CWoYiFtv.js","assets/LienMndPay-Cwvmt_TS.js","assets/maisons-CSSFrqZy.js","assets/Marketing-Bcv2gDwI.js","assets/MarketingBranche-CE60UkSu.js","assets/Marque-B6hmJcT1.js","assets/MesPourboires-CJpo92Uv.js","assets/MesPourboires-D9I_9rZf.css","assets/MesTaches-aE_ujxRi.js","assets/MesTaches-Cc4XUDf6.css","assets/momo-C2ZVfV9J.js","assets/MonMois-CMNTVdij.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-D2u64Mji.js","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/opale-Ceo4Mvl9.js","assets/paliers-D5HTUL3C.js","assets/Parametres-BH3-a2Ko.js","assets/parcours-BXFbFbfr.js","assets/Parrainages-D4mgquxD.js","assets/Parrainages-gAHAPB_6.css","assets/PassageAvantLeFauteuil-Cc_7WR18.js","assets/pdf-BW7RO6Uo.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/Personas-DR8IC2rG.js","assets/Personnel-D5hehaqM.js","assets/photo-C1Zf_q0D.js","assets/pilotage-D8kf1Co8.css","assets/Pourboires-C_iJjbPB.js","assets/Predictions-zIPdAa1x.js","assets/Prestataires-KswnW9f8.js","assets/Prets-Clotwptu.js","assets/prevision-du-mois-pur-D6sJa5lw.js","assets/Previsions-D-0__Buz.css","assets/Previsions-Dl-sYw3Y.js","assets/previsions-pur-CVpBPOcy.js","assets/processus-pur-BLN25j-E.js","assets/Projets-CJDB5JS_.js","assets/Projets-COO7WDEE.css","assets/projets-CUi1xxPn.js","assets/projets-pur-2ZEMRNDU.js","assets/protocoles-BusNEJEM.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-C1qtcjlS.js","assets/qualification-DvJmWbw9.js","assets/quiz-5qMPWZVi.js","assets/Rapport-DuNI1d7N.js","assets/Recommandations-DjVRoVRx.js","assets/regler-C5hcM02_.css","assets/regler-CVa_pxR-.js","assets/regler-la-seance-serveur-Bs6rzqZX.js","assets/relances-pur-lwRTXc5E.js","assets/releve-des-avis-Br9hfwD-.js","assets/SalonFoyer-DZxjf7zI.js","assets/secretariat-admin-pUJ8fkQM.js","assets/Secretariat-Cy79Zw30.css","assets/Secretariat-yZOmcUr0.js","assets/Signatures-D5GTVv4e.js","assets/SignerUnPdf-BLTolZZb.js","assets/Synthese-rXQNtcGu.js","assets/SyntheseGraphes-DwxOjR2n.js","assets/systeme-TPy-pF7j.css","assets/Tableau-DTgl9_x-.js","assets/temps-CpA1XT32.js","assets/Textes-CqUzPrbU.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-DY4S1OZd.js","assets/trone-BKAkuGVm.js","assets/trone-Dk3AL2NO.css","assets/useAudiences-CBGUR1s-.js","assets/Vitrine-BWilTqQJ.css","assets/Vitrine-C7ny6sTE.js","assets/_admin-CDtupVtf.js","assets/_contrat-Zm2cFqXM.js","assets/_heures-DyKgxnA9.js","assets/_reuni-CAUtbYmC.js","assets/_shared-D44iw2Ij.js","assets/_signature-CXf7uEiz.js","assets/_ui-BWMA-PlM.css","assets/_ui-X9XPWYM8.js"];
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
