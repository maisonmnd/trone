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
const BUILD = "20261028083409";
const A_GARDER = ["./","assets/Abonnements-C-zmS6IN.js","assets/abonnements-C7D75Qct.js","assets/Academie-DDVF0PbA.js","assets/Acces-CbWTYYw9.js","assets/actions-DRyeQ_3p.js","assets/AFaire-Cb6pC7Tl.js","assets/afaire-DtKKtZf-.js","assets/Agents-DestaL-b.js","assets/agents-donnees-B5GqDybc.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-BOAdBWlc.js","assets/Appels-B3x8qG3J.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/AtelierDesContenus-Cy3UCTmn.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/AuComptoir-UaL0ffbC.js","assets/Audience-CBVWE6t6.js","assets/Aujourdhui-C1sa_JKH.js","assets/avis-fiches-CT2za-UV.js","assets/AvisGoogle-B27eh8mH.js","assets/AvisGoogle-DaPXfwX9.css","assets/bilan-B-bfPYR0.css","assets/bilan-DrZ6qVcD.js","assets/BilanMensuel-DgtOZ7Bs.js","assets/Branches-GDeZpAk0.js","assets/bridges-DObDA_TS.js","assets/Caisse-CHSGHt9u.js","assets/caisse-du-soir-P5yBKkmR.js","assets/Caisses-Dy8bps5H.js","assets/Calendrier-DmeuUf3k.js","assets/campagnes-pur-CZhNzCfX.js","assets/Carnet-DIM1_EMY.js","assets/carte-BZmJpVid.js","assets/carte-_W_-xBPj.css","assets/CarteModal-DwDvSy0W.js","assets/CartesCadeaux-BfAiaK3L.js","assets/Catalogue-DmX1LBvR.js","assets/CentreDeCommande-DCPi_CZ8.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-D2P99kv5.js","assets/certificat-LYcPGBfx.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-CYdB2kYe.js","assets/chiffre-du-jour-pur-DLCDbjFm.js","assets/ChiffreDesPrestations-DdWZJc8z.js","assets/client-BBHylvnS.js","assets/ClotureDuTiroir-B2od81HN.js","assets/ClotureDuTiroir-C6vPx-E_.css","assets/Coffre-SXNP4lkj.js","assets/components-CmSAj1_n.js","assets/compte-courant-ByzulCEN.js","assets/compte-k5Em-28v.js","assets/CompteCourant-B7v0hC-u.js","assets/Comptes-D9Tds2_A.js","assets/Comptoir-Co2o53Yu.js","assets/consultation-B7OW9ehy.js","assets/consultation-CRW6QcWf.css","assets/Consultations-CreT-hkN.js","assets/consultNotes-CRrecGKG.js","assets/Conversations-BOQV7q9m.js","assets/Conversations-D4WwB5Zo.css","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-BKvqHZGm.js","assets/currency-qfIhGmrs.js","assets/Customers-C7ueUmEy.js","assets/Dashboard-BSxwAsih.js","assets/Dashboard-zjGteuUE.css","assets/dates-DWl4J4oJ.js","assets/Demandes-DNlK7tHo.js","assets/Depenses-jxOeSsUI.js","assets/dernier-message-pur-CBYWnq8m.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-C48oNbhY.js","assets/diagnostics-au-trone-Dxl1hfw0.js","assets/Discussions-BAkjbOHH.js","assets/EditeurDesOffres-DrDyoLxn.js","assets/Encaissements-3c3AdkN6.js","assets/enfants-BfPD3xKL.js","assets/Engagements-Cj5S9MhG.css","assets/Engagements-Dctfzx8P.js","assets/EntreDeuxSeances-BRGqmu-i.js","assets/equipe-B_9ZHz24.css","assets/Evaluation-DKImfBB8.js","assets/FacturePrestataire-BplMBNMA.js","assets/Factures-PeOk7Nbk.js","assets/FenetreDuPoint-DE0AinhZ.js","assets/Fil-D4OgP-Zf.js","assets/finances-BMFnlkRx.css","assets/fon-BATdlORC.js","assets/fon-pur-CgVkbJ8O.js","assets/fournisseurs-BFyPwoYs.js","assets/Fournisseurs-MpKSxu72.js","assets/foyer-Bnusr_Ij.js","assets/Gerard-Cm81Sgmd.js","assets/Gerard-CUvkbLSl.css","assets/gerard-donnees-zt14MPzY.js","assets/gestes-conversation-CuqE_zU0.js","assets/HomeRituals-DnbOFq8X.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-BPS5KjUw.js","assets/ia-centre-CJT4EHbL.js","assets/ia-diagnostic-pur-hHYxp10Y.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-recu-pur-DcucZqpR.js","assets/identite-CHU80bCJ.js","assets/index-DVAPKRpF.js","assets/index.es-BLuv0V72.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-Bz2vzM9y.js","assets/jspdf.es.min-B51R5NHT.js","assets/JustePrix-BZ90BCg_.js","assets/kkiapay-CLhV84fy.js","assets/kkiapay-widget-DnUhUNd4.js","assets/laboratoire-C4Drmb_u.js","assets/Laboratoire-Cf9XDdj-.js","assets/LettresAuDossier-KoFZ0omY.js","assets/LienMndPay-BYnZSg_I.js","assets/maisons-CSSFrqZy.js","assets/Marketing-CFMxJIHY.js","assets/MarketingBranche-Yz4SB-HG.js","assets/Marque-Cm6rfGQm.js","assets/MesTaches-Cc4XUDf6.css","assets/MesTaches-Y-AMAdaM.js","assets/momo-B-QSeWY6.js","assets/MonMois-Biljequ8.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/objectifs-HxybhC2M.js","assets/paliers-rZ91FAbv.js","assets/Parametres-DYKiiYy0.js","assets/parcours-Bv08MZA9.js","assets/Parrainages-dz-g0Md_.js","assets/Parrainages-gAHAPB_6.css","assets/pdf-Ciyz2L5y.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/Personas-GqkLAJ9_.js","assets/Personnel-MUZAwTnj.js","assets/photo-CRqkxU_y.js","assets/pilotage-D8kf1Co8.css","assets/Predictions-DRwnHlmN.js","assets/Prestataires-CLox9vIV.js","assets/prestataires-DRyQVtoJ.js","assets/Prets-DBuhXiBc.js","assets/prevision-du-mois-pur-D6sJa5lw.js","assets/Previsions-CdunAV-3.js","assets/Previsions-D-0__Buz.css","assets/previsions-pur-BnvxdVI2.js","assets/processus-pur-BLN25j-E.js","assets/Projets-BjVYGMIm.js","assets/Projets-COO7WDEE.css","assets/projets-DWH0VqlN.js","assets/projets-pur-2ZEMRNDU.js","assets/protocoles-BuSuZ5Q4.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-D6v5QY6Q.js","assets/qualification-BZ_3QiAi.js","assets/quiz-5qMPWZVi.js","assets/Rapport-CerMwTw3.js","assets/RattacherUneCarte-C5jMJGn7.js","assets/Recommandations-V0eU3X_f.js","assets/regler-C5hcM02_.css","assets/regler-D6Chcth3.js","assets/regler-la-seance-serveur-Bs6rzqZX.js","assets/relances-pur-DsIo28uB.js","assets/releve-des-avis-QoAbUIxz.js","assets/SalonFoyer-8mmT6PWF.js","assets/secretariat-admin-Gbvmad-2.js","assets/Secretariat-Cy79Zw30.css","assets/Secretariat-D2_XPm1m.js","assets/Signatures-2tX16pXT.js","assets/SignerUnPdf-DF9zuV70.js","assets/Synthese-y6LH_giE.js","assets/SyntheseGraphes-BhEOTE3x.js","assets/systeme-C3XFIa8E.css","assets/Tableau-C4hhx0sF.js","assets/temps-9Fnnss4P.js","assets/Textes-DLpOzRbT.css","assets/Textes-DwriNgSQ.js","assets/tiroirs-DOBaeS_o.js","assets/trace-du-moyen-pur-Bx8-suHn.js","assets/trone-BMdkuVGH.css","assets/trone-RHYHEc8S.js","assets/ui-CIBbFOhy.js","assets/useAudiences-HPtnE2FZ.js","assets/vente-C7YWXkHo.css","assets/Vitrine-Bh-ce_5c.js","assets/Vitrine-BWilTqQJ.css","assets/_admin-BZynQ8XB.js","assets/_contrat-IqKstsPm.js","assets/_heures-DIllWrri.js","assets/_reuni-CQ_dil9W.js","assets/_shared-CvHmm-BW.js","assets/_signature-DlasMktK.js","assets/_ui-BLAhTBHZ.js","assets/_ui-BWMA-PlM.css"];
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
