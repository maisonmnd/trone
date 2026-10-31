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
const BUILD = "20261031183003";
const A_GARDER = ["./","assets/abonnements-CfaA3FA9.js","assets/Abonnements-CHmGvd9u.js","assets/Academie-CYrlznFd.js","assets/Acces-CdJlz-AK.js","assets/actions-Boi9cjGG.js","assets/AFaire-BPMdwne-.js","assets/afaire-CHMUiWQQ.js","assets/Agents-aV3rt5nj.js","assets/agents-donnees-CwxiqAA2.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-BuUZ7Bul.js","assets/Appels-C8mSE3GC.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/Assistants-ajxP0_SY.js","assets/Assistants-DuKb9pk7.css","assets/AtelierDesContenus-Cm6i36iD.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/AuComptoir-lalo1s9C.js","assets/Audience-B08eckJo.js","assets/Aujourdhui-Ly0JJj6v.js","assets/avis-fiches-DJ02DrsC.js","assets/AvisGoogle-CO35mucq.js","assets/AvisGoogle-DaPXfwX9.css","assets/bilan-B-bfPYR0.css","assets/bilan-CkJZuY19.js","assets/BilanMensuel-DnPr8_wc.js","assets/Branches-CX9IDsy5.js","assets/bridges-C6lcGnI6.js","assets/Caisse-BAerW1_5.js","assets/caisse-du-soir-DlhS7bJH.js","assets/Caisses-CfjP1iVG.js","assets/Calendrier-CqnsO2MO.js","assets/campagnes-pur-CXjmwPf3.js","assets/Carnet-DsXmfd5E.js","assets/carte-3QFbnyxF.js","assets/carte-_W_-xBPj.css","assets/CarteModal-BN5RQ0Ws.js","assets/CartesCadeaux-BVRKYnMK.js","assets/Catalogue-CPG0LqbK.js","assets/CentreDeCommande-CkvMYfsX.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-B16CD0oG.js","assets/certificat-DKGchggb.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-DauENPsm.js","assets/chiffre-du-jour-pur-Cx_RwsKX.js","assets/ChiffreDesPrestations-B_4Xr28-.js","assets/client-Bk6tedJr.js","assets/ClotureDuTiroir-C6vPx-E_.css","assets/ClotureDuTiroir-YIfVZR5y.js","assets/Coffre-CMEzdQv_.js","assets/components-C4arNQE1.js","assets/compte-Cooeksm2.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-BKXI86V6.js","assets/Comptes-CnFNMe81.js","assets/Comptoir-BP5oyian.js","assets/consultation-CRW6QcWf.css","assets/consultation-PkjU0c8N.js","assets/Consultations-DFRtas1p.js","assets/consultNotes-Dm7whtIe.js","assets/Conversations-D4WwB5Zo.css","assets/Conversations-_2wRWeN0.js","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-BDRlILFO.js","assets/currency-qfIhGmrs.js","assets/Customers-CXeI4vzf.js","assets/Dashboard-DiXf1BHK.js","assets/Dashboard-zjGteuUE.css","assets/dates-CnLTbKvC.js","assets/Demandes-C8fR6qyA.js","assets/Depenses-Dfs9VOg6.js","assets/dernier-message-pur-CBYWnq8m.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-BpaYefCg.js","assets/diagnostics-au-trone-DK854jnU.js","assets/Dictee-C3yUCn9E.js","assets/Dictee-D2P9yM7v.css","assets/dictee-pur-CsYDR2Rv.js","assets/Discussions-DlfgCSAz.js","assets/EditeurDesOffres-CRcKCk_9.js","assets/Encaissements-B8J6Kvg3.js","assets/enfants-Qg8wa1bR.js","assets/Engagements-Cj5S9MhG.css","assets/Engagements-D-jkRXYJ.js","assets/EntreDeuxSeances-C491CS3k.js","assets/equipe-B_9ZHz24.css","assets/Evaluation-Dk_eJ9jB.js","assets/FacturePrestataire-Cqsi5r-W.js","assets/Factures-Dw9R8ZTx.js","assets/FenetreDesCivilites-C1zuFjqk.js","assets/FenetreDesCivilites-zfNk1aak.css","assets/FenetreDuPoint-CFBdFuxK.js","assets/Fil-DF9L_G9W.js","assets/finances-BMFnlkRx.css","assets/fon-Bw7hUKvP.js","assets/fon-pur-CgVkbJ8O.js","assets/fournisseurs-Bb5_fCVQ.js","assets/Fournisseurs-BOYcRkM2.js","assets/foyer-DBXTatfb.js","assets/Gerard-C9ljG_Nk.css","assets/gerard-donnees-DfcwEK_E.js","assets/Gerard-DRwGBoqc.js","assets/gestes-conversation-DIim9TRV.js","assets/HomeRituals-DB616ROf.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-CblLr8fR.js","assets/ia-centre-DWpqL_VV.js","assets/ia-diagnostic-pur-BBLrGY5l.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-recu-pur-DcucZqpR.js","assets/identite-DbYVVyo3.js","assets/index-6PuHJMa7.js","assets/index.es-6AIT7Iyi.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-BOpm2GE7.js","assets/jspdf.es.min-D3qvk9Xt.js","assets/JustePrix--Idv5QAq.js","assets/kkiapay-BrcsKHTL.js","assets/kkiapay-widget-DnUhUNd4.js","assets/laboratoire-BsOiE8lo.js","assets/Laboratoire-D3zo2hCM.js","assets/LettresAuDossier-D2kH9dyl.js","assets/LienMndPay-BpDGtmU-.js","assets/maisons-CSSFrqZy.js","assets/Marketing-wOou9byG.js","assets/MarketingBranche-X5rTKMjh.js","assets/Marque-CIXE5ytE.js","assets/MesTaches-Cc4XUDf6.css","assets/MesTaches-DIEm23R4.js","assets/momo-B-QSeWY6.js","assets/MonMois-CUYz6DP6.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-BICdwScs.js","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/paliers-D7NNgdzi.js","assets/Parametres-DJ59KuR4.js","assets/parcours-wzYMpTWt.js","assets/Parrainages-gAHAPB_6.css","assets/Parrainages-s-grB-s7.js","assets/pdf-CrGUiDUt.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/Personas-DyyocGMv.js","assets/Personnel-DnBqEm_3.js","assets/photo-7SBeN9rX.js","assets/pilotage-D8kf1Co8.css","assets/Predictions-TNKquzu2.js","assets/Prestataires-Dm-igEX-.js","assets/prestataires-DQh_7yMg.js","assets/Prets-DWDXRWkx.js","assets/prevision-du-mois-pur-D6sJa5lw.js","assets/Previsions-D-0__Buz.css","assets/Previsions-D_dFuxaS.js","assets/previsions-pur-BqkCBleL.js","assets/processus-pur-BLN25j-E.js","assets/Projets-COO7WDEE.css","assets/Projets-D0DDTDCR.js","assets/projets-pur-2ZEMRNDU.js","assets/projets-WN8MrTJv.js","assets/protocoles-BYViB9OM.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-CCkXkF9Q.js","assets/qualification-CDxvoCmI.js","assets/quiz-5qMPWZVi.js","assets/Rapport-BdgpFgnQ.js","assets/RattacherUneCarte-Sro1h6DT.js","assets/Recommandations-NENQSCBx.js","assets/regler-C5hcM02_.css","assets/regler-Cd1fF4lk.js","assets/regler-la-seance-serveur-Bs6rzqZX.js","assets/relances-pur-lwRTXc5E.js","assets/releve-des-avis-CgRLHwcG.js","assets/SalonFoyer-C7-G-zIt.js","assets/secretariat-admin-Bnfrl4w7.js","assets/Secretariat-Cy79Zw30.css","assets/Secretariat-DA5-8IO2.js","assets/Signatures-DpSzRbF9.js","assets/SignerUnPdf-BXBC43xw.js","assets/Synthese-EtIHbzkv.js","assets/SyntheseGraphes-DXGRWbMU.js","assets/systeme-TPy-pF7j.css","assets/Tableau-BIpFOAUS.js","assets/temps-CXpZrK7k.js","assets/Textes-BlxOhpz5.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-D4qqoSHa.js","assets/trace-du-moyen-pur-Bx8-suHn.js","assets/trone-9siIy66m.css","assets/trone-BpoxsyU3.js","assets/ui-Dc7J0OTh.js","assets/useAudiences-DxvpOoNk.js","assets/vente-C7YWXkHo.css","assets/Vitrine-BWilTqQJ.css","assets/Vitrine-C6Wkb7gZ.js","assets/_admin-mrFkTAq1.js","assets/_contrat-DPmwCHyz.js","assets/_heures-bT3Q2f9b.js","assets/_reuni-DzQRlSez.js","assets/_shared-ByNWu4yc.js","assets/_signature-B1SxRGxM.js","assets/_ui-BSF8bXm_.js","assets/_ui-BWMA-PlM.css"];
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
