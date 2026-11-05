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
const BUILD = "20261105005331";
const A_GARDER = ["./","assets/abonnements-BtpfosuP.js","assets/Abonnements-DeF0BE4L.js","assets/Academie-BPX3pgUE.js","assets/Acces-C4fyflET.js","assets/AFaire-CxFKe7fz.js","assets/afaire-DKvE5ob3.js","assets/Agents-BlfOTOyV.js","assets/agents-donnees-DDhIfQiB.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-BQ9B4zE-.js","assets/Appels-CxshRQWv.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/Assistants-BOcxTwZO.css","assets/Assistants-DLxrl9fq.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/AtelierDesContenus-vgZFgxo0.js","assets/Audience-DXFXj2s_.js","assets/Aujourdhui-DdtD_KMD.js","assets/avant-le-fauteuil-lecture-Dcymkitf.js","assets/AvantLeFauteuil-Pwmq5yIg.js","assets/avis-fiches-CNSGPaKi.js","assets/AvisGoogle-DaPXfwX9.css","assets/AvisGoogle-QQdnUYNz.js","assets/bilan-B-bfPYR0.css","assets/bilan-D5cDKPae.js","assets/BilanMensuel-CTSnu5F7.js","assets/Branches-ei-jquVq.js","assets/bridges-Pj06VbBy.js","assets/caisse-du-soir-AOc8odp0.js","assets/Caisse-TQDwZBbZ.js","assets/Caisses-BEnEoTUw.js","assets/Calendrier-D332IUzg.js","assets/campagnes-pur-OOENjVD_.js","assets/Carnet-BObpoNTU.js","assets/carte-CBSQ8c0J.js","assets/carte-_W_-xBPj.css","assets/CarteModal-CzwtSH1l.js","assets/CartesCadeaux-DoiJ1tpf.js","assets/Catalogue--xMg-JIq.js","assets/CentreDeCommande-Du8kyJhp.css","assets/CentreDeCommande-w5gJ0wU1.js","assets/Cercle-Bq1hKMsi.js","assets/certificat-dlsrbIPt.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-C_1wHDt5.js","assets/ChiffreDesPrestations-aX1UbgJu.js","assets/client-CPF8igyT.js","assets/cloture-du-jour-B65B9nKj.js","assets/ClotureDuTiroir-C6vPx-E_.css","assets/ClotureDuTiroir-DTuTHEJB.js","assets/Coffre-CyCGH6Aj.js","assets/components-CbXxbRyJ.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-BqJi1Ti0.js","assets/Comptes-DOC3hqgA.js","assets/consultation-6IbTj5Hq.js","assets/consultation-CRW6QcWf.css","assets/Consultations-Dw3GWA9_.js","assets/consultNotes-B7qsn_NJ.js","assets/Conversations-D4WwB5Zo.css","assets/Conversations-DYYBSstT.js","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-gFxCedAR.js","assets/currency-qfIhGmrs.js","assets/Customers-DMWVbV-T.js","assets/Dashboard-DOecirwm.js","assets/Dashboard-zjGteuUE.css","assets/dates-ClaR1orX.js","assets/Demandes-CG8xbBTN.js","assets/Depenses-dx84r-vu.js","assets/depenses-saisie-Cv6ZYm8v.js","assets/dernier-message-pur-CBYWnq8m.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-Buijd4d9.js","assets/diagnostics-au-trone-09L85T2l.js","assets/Dictee-bktGtRNk.js","assets/Dictee-D2P9yM7v.css","assets/dictee-pur-BD6Q7MaX.js","assets/Discussions-Cg8MTgZP.js","assets/EditeurDesOffres-BsVZBeJW.js","assets/Encaissements-PFFeKs7z.js","assets/enfants-BmBkxn-v.js","assets/Engagements-Cj5S9MhG.css","assets/Engagements-CmLb2LjN.js","assets/EntreDeuxSeances-rKdfbBDx.js","assets/Evaluation-CcjTOpBY.js","assets/FacturePrestataire-CQC4eGa5.js","assets/Factures-3t5FSl36.js","assets/FenetreDesCivilites-XG3OBe6W.js","assets/FenetreDesCivilites-zfNk1aak.css","assets/FenetreDuPoint-C-oFaaR4.js","assets/Fil-D9FVO-mD.js","assets/finances-BMFnlkRx.css","assets/fon-C3B01oJx.js","assets/Fournisseurs-DCv5UZOJ.js","assets/fournisseurs-rneMgzih.js","assets/foyer-CHLaxe87.js","assets/Gerard-Bd2e3Zo3.js","assets/Gerard-Bfp4ua88.css","assets/gerard-donnees-HE4dJ1zX.js","assets/gestes-conversation-BLDghxGI.js","assets/HomeRituals-BHaP-wzo.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-C-pc1pkb.js","assets/ia-centre-BYk_zry4.js","assets/ia-diagnostic-pur-BBLrGY5l.js","assets/ia-marque-pur-C5lSdGpx.js","assets/identite-B-fslP53.js","assets/index-COjVKajH.js","assets/index.es-WnYH061G.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-Bu0gWMOa.js","assets/jspdf.es.min-BTFoBxx6.js","assets/JustePrix-CrfCm5ab.js","assets/kkiapay-D4zdXydH.js","assets/kkiapay-widget-DnUhUNd4.js","assets/la-journee-CfCfmvS-.js","assets/la-journee-DNg04cPb.css","assets/Laboratoire-D8rKAKXW.js","assets/LaJournee-DahJ8C4J.js","assets/LettresAuDossier-BRz_Ue5p.js","assets/LienMndPay-Ckz41oIs.js","assets/maisons-CSSFrqZy.js","assets/Marketing-DkoS3et3.js","assets/MarketingBranche-qjTnvoEs.js","assets/Marque-D1QX9q24.js","assets/MesTaches-BJDuyIUq.js","assets/MesTaches-Cc4XUDf6.css","assets/momo-C2ZVfV9J.js","assets/MonMois-CMSt3a6A.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-6zpOwnfJ.js","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/opale-BCzoN7GO.js","assets/paliers-CCDwnlQK.js","assets/Parametres-DFbIF5j3.js","assets/parcours-f5K95R0q.js","assets/Parrainages-gAHAPB_6.css","assets/Parrainages-Kh0h7GVu.js","assets/PassageAvantLeFauteuil-BYRzMtxw.js","assets/pdf-VJcNm7C7.js","assets/pdf-_h9zMoGh.js","assets/pdf.worker.min-uNib_u9P.js","assets/Personas-CUo2xiRQ.js","assets/Personnel-DBtQLDTv.js","assets/photo-BhCdu2Kr.js","assets/pilotage-D8kf1Co8.css","assets/Predictions-BIsB7B7S.js","assets/Prestataires-Ddu85AR2.js","assets/Prets-CJ3kFfir.js","assets/prevision-du-mois-pur-D6sJa5lw.js","assets/Previsions-Cj9IkSR6.js","assets/Previsions-D-0__Buz.css","assets/previsions-pur-BGkvr4KG.js","assets/processus-pur-BLN25j-E.js","assets/Projets-COO7WDEE.css","assets/projets-DkX4qiWX.js","assets/Projets-Dy5nxmN-.js","assets/projets-pur-2ZEMRNDU.js","assets/protocoles-Bjki3KZG.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-DxZL1mu7.js","assets/qualification-CuaWNCII.js","assets/quiz-5qMPWZVi.js","assets/Rapport-DVbZ2KNY.js","assets/Recommandations-OMLGt9r8.js","assets/regler-C5hcM02_.css","assets/regler-EvY5mu2e.js","assets/regler-la-seance-serveur-Bs6rzqZX.js","assets/relances-pur-lwRTXc5E.js","assets/releve-des-avis-D8NbBk8B.js","assets/SalonFoyer-DWJpszS-.js","assets/Secretariat-53YPeXhZ.js","assets/secretariat-admin-_RESnSOa.js","assets/Secretariat-Cy79Zw30.css","assets/Signatures-CyH7jht0.js","assets/SignerUnPdf-BWABPj0N.js","assets/Synthese-BCpUZQWJ.js","assets/SyntheseGraphes-nP-AO8Bh.js","assets/systeme-TPy-pF7j.css","assets/Tableau-Dyp9UiLt.js","assets/temps-CNNh_D2Q.js","assets/Textes-BYLQoOJC.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-BSA7KSUf.js","assets/trone-BF2Ti0u5.css","assets/trone-CZhDAezR.js","assets/useAudiences-BVhJjY-G.js","assets/Vitrine-BWilTqQJ.css","assets/Vitrine-DlAuW5-e.js","assets/_admin-DTuiOvMw.js","assets/_contrat-Ddw1w_ZZ.js","assets/_heures-D5EW_6aH.js","assets/_reuni-B2QEc4yg.js","assets/_shared-xmTj3o76.js","assets/_signature-X4jSleCU.js","assets/_ui-BWMA-PlM.css","assets/_ui-CGV_xCoe.js"];
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
