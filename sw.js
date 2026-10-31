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
const BUILD = "20261031214608";
const A_GARDER = ["./","assets/abonnements-BQ2FpITg.js","assets/Abonnements-Cm-crzQV.js","assets/Academie-DbpRPRuB.js","assets/Acces-qzmMPFVU.js","assets/actions-KNEL2lUr.js","assets/AFaire-4gTeKGRx.js","assets/afaire-B-Xgy9Rs.js","assets/Agents-CEtCFCJ-.js","assets/agents-donnees-AHdopqOJ.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-OmaoItEb.js","assets/Appels-xM6F0YP3.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/Assistants-CohEDyQg.js","assets/Assistants-DuKb9pk7.css","assets/AtelierDesContenus-CAHmiy-5.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/AuComptoir-CbzxqrB3.js","assets/Audience-B7nMwJ0d.js","assets/Aujourdhui-Dj4REMw4.js","assets/avant-le-fauteuil-lecture-dF6B42du.js","assets/AvantLeFauteuil-B1pKcBBc.js","assets/avis-fiches-CNlWbXdk.js","assets/AvisGoogle-CRXlV-Kc.js","assets/AvisGoogle-DaPXfwX9.css","assets/bilan-B-bfPYR0.css","assets/bilan-DZy6MDq9.js","assets/BilanMensuel-DLsx1R5q.js","assets/Branches-DZaaHJ2N.js","assets/bridges-DzIWe9Vx.js","assets/Caisse-Da5dj5c0.js","assets/caisse-du-soir-DNjnDpfg.js","assets/Caisses-MuH6ySNK.js","assets/Calendrier-lHqgxUlw.js","assets/campagnes-pur-DWvKAksm.js","assets/Carnet-Dmt-WRHb.js","assets/carte-CjrnacSw.js","assets/carte-_W_-xBPj.css","assets/CarteModal-Be5yHIxO.js","assets/CartesCadeaux-BNYb6T4U.js","assets/Catalogue-sC8bnPv1.js","assets/CentreDeCommande-DgGgCeyl.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-B-9w7jFW.js","assets/certificat-Uzkh33VO.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-3T1HwTU8.js","assets/ChiffreDesPrestations-Ca1ajZrF.js","assets/client-Dour67tS.js","assets/ClotureDuTiroir-BdD64HDr.js","assets/ClotureDuTiroir-C6vPx-E_.css","assets/Coffre-Cggyv65j.js","assets/components-Dja0V6Z1.js","assets/compte-courant-ByzulCEN.js","assets/compte-DVdgm7Vy.js","assets/CompteCourant-DmUHqbMv.js","assets/Comptes-BC2QtCfw.js","assets/Comptoir-B5LSEVKD.js","assets/consultation-BiAjytJQ.js","assets/consultation-CRW6QcWf.css","assets/Consultations-sWZ2S2Ng.js","assets/consultNotes-BqC66NXU.js","assets/Conversations-D4WwB5Zo.css","assets/Conversations-DR-ZwbHA.js","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-C5K0D_qV.js","assets/currency-qfIhGmrs.js","assets/Customers-B51rq01o.js","assets/Dashboard-DrsbGSCB.js","assets/Dashboard-zjGteuUE.css","assets/dates-FSKr7MKS.js","assets/Demandes-ACDhI48d.js","assets/Depenses-BXxrKe4W.js","assets/dernier-message-pur-CBYWnq8m.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-Cx2IaawW.js","assets/diagnostics-au-trone-CUwAr35A.js","assets/Dictee-CUS_5Enn.js","assets/Dictee-D2P9yM7v.css","assets/dictee-pur-CIWli3pC.js","assets/Discussions-BQCHBjat.js","assets/EditeurDesOffres-Hv_pDtdv.js","assets/Encaissements-s6rgscfi.js","assets/enfants-DWKcDW1Z.js","assets/Engagements-Cj5S9MhG.css","assets/Engagements-nkpFiDbI.js","assets/EntreDeuxSeances-CWPJfLAu.js","assets/equipe-B_9ZHz24.css","assets/Evaluation-nKW6yOTb.js","assets/FacturePrestataire-BD_NRspv.js","assets/Factures-BnEXrOpO.js","assets/FenetreDesCivilites-BurVsWYC.js","assets/FenetreDesCivilites-zfNk1aak.css","assets/FenetreDuPoint-b10cdfKL.js","assets/Fil-dyhKKoQA.js","assets/finances-BMFnlkRx.css","assets/fon-BBdlLvGw.js","assets/fon-pur-CgVkbJ8O.js","assets/fournisseurs-BALUmLF4.js","assets/Fournisseurs-CoHSDysc.js","assets/foyer-B3W1ORbb.js","assets/Gerard-C9ljG_Nk.css","assets/Gerard-Dlid6gGb.js","assets/gerard-donnees-Bd2Jo0Qj.js","assets/gestes-conversation-BwBIMMyV.js","assets/HomeRituals-Db5KyB4l.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-BbmIFPyU.js","assets/ia-centre-B-8-UiWJ.js","assets/ia-diagnostic-pur-BBLrGY5l.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-recu-pur-DcucZqpR.js","assets/identite-CeWBHFoS.js","assets/index-B1fO8Z8K.js","assets/index.es-BF6y95dC.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-BYEQfsml.js","assets/jspdf.es.min-DCA0YrvB.js","assets/JustePrix-hHVb3o_d.js","assets/kkiapay-HXf_n3MY.js","assets/kkiapay-widget-DnUhUNd4.js","assets/Laboratoire-BTn-QcN_.js","assets/laboratoire-DUEw7K7v.js","assets/LettresAuDossier-C_dANu4w.js","assets/LienMndPay-DuoE4voF.js","assets/maisons-CSSFrqZy.js","assets/Marketing-BDijWMXF.js","assets/MarketingBranche-D8lV2ArQ.js","assets/Marque-BqQE4tT3.js","assets/MesTaches-Cc4XUDf6.css","assets/MesTaches-DIYLmQIe.js","assets/momo-B-QSeWY6.js","assets/MonMois-D2Ug08gi.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-CxX_yc90.js","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/paliers-D4V0F8hP.js","assets/Parametres-BkN_oK_K.js","assets/parcours-CH3ao663.js","assets/Parrainages-BpRO503p.js","assets/Parrainages-gAHAPB_6.css","assets/PassageAvantLeFauteuil-BnYWzxWc.js","assets/pdf-4-EsDFSG.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/Personas-CdFTTrPZ.js","assets/Personnel-EAQLtoOT.js","assets/photo-mJTVW5kM.js","assets/pilotage-D8kf1Co8.css","assets/Predictions-Bmd1AvyY.js","assets/prestataires-B2E4ntPg.js","assets/Prestataires-DQmKx3gc.js","assets/Prets-2FMBKc7I.js","assets/prevision-du-mois-pur-D6sJa5lw.js","assets/Previsions-BQOaYjW0.js","assets/Previsions-D-0__Buz.css","assets/previsions-pur-7QOmXsZN.js","assets/processus-pur-BLN25j-E.js","assets/projets-CmqXs5rw.js","assets/Projets-COO7WDEE.css","assets/Projets-DRD9BPHW.js","assets/projets-pur-2ZEMRNDU.js","assets/protocoles-BuUwA95R.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-BXl4c6v7.js","assets/qualification-DFq49I0x.js","assets/quiz-5qMPWZVi.js","assets/Rapport-DIDJTTa_.js","assets/RattacherUneCarte-CsNxaySm.js","assets/Recommandations-C7qaTF98.js","assets/regler-C5hcM02_.css","assets/regler-D8VBXX-a.js","assets/regler-la-seance-serveur-Bs6rzqZX.js","assets/relances-pur-lwRTXc5E.js","assets/releve-des-avis-DugydAPV.js","assets/SalonFoyer-CmIMFzAN.js","assets/secretariat-admin-DNSGE7P4.js","assets/Secretariat-Cy79Zw30.css","assets/Secretariat-m7BTUEqK.js","assets/Signatures-JDC5P99n.js","assets/SignerUnPdf-Cs_w30IE.js","assets/Synthese-Kqwfhnxb.js","assets/SyntheseGraphes-CpQD3Hkx.js","assets/systeme-TPy-pF7j.css","assets/Tableau-DsE8q56m.js","assets/temps-CNE2X5yq.js","assets/Textes-CpMoE33t.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-5aT_Ztsx.js","assets/trace-du-moyen-pur-Bx8-suHn.js","assets/trone-B6jFQMGx.css","assets/trone-BKkls4Kw.js","assets/ui-42maMsGt.js","assets/useAudiences-CXlndM-u.js","assets/vente-C7YWXkHo.css","assets/Vitrine-BWilTqQJ.css","assets/Vitrine-CwG2PFKG.js","assets/_admin-CktjD-t4.js","assets/_contrat-ahbpYlOw.js","assets/_heures-Dm9YaMQp.js","assets/_reuni-CbyO3osy.js","assets/_shared-BnQEJgYX.js","assets/_signature-DqJV6ynU.js","assets/_ui-BWMA-PlM.css","assets/_ui-DrK-AC0b.js"];
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
