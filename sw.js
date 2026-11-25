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
const BUILD = "20261125115439";
const A_GARDER = ["./","assets/Abonnements-B8kHDEQF.js","assets/abonnements-DQOfk-JD.js","assets/Abonnements-DTY7p2DH.css","assets/Academie-CDBHSxsw.js","assets/Acces-BWe3Uj5F.js","assets/afaire-CYNAU-Vx.js","assets/AFaire-DVDuuqH2.js","assets/Agents-CGMKVaPt.js","assets/agents-donnees-B9tgzdOD.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-Bn-bls2U.js","assets/App-CaDCvEcA.js","assets/Appels-D9VasA5S.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/Assistants-D9i2Xwmg.css","assets/Assistants-DrwN6ZKA.js","assets/AtelierDesContenus-8nDVscYq.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/Audience-DJnIDVAy.js","assets/Aujourdhui-BFl015Fa.js","assets/auth-CduA3fMJ.js","assets/avant-le-fauteuil-lecture-D9fKojFY.js","assets/AvantLeFauteuil-CFUVwBkr.js","assets/avis-fiches-Cvo3SgKX.js","assets/avis-google-pont-CGZgKuOM.js","assets/AvisGoogle-DaEOQI6T.js","assets/AvisGoogle-DaPXfwX9.css","assets/BadgeEssai-yv80pXU5.js","assets/BadgeSuggere-DK4E8Ix1.js","assets/besoins-KldWuk2y.js","assets/BesoinsEtRegles-BLwxGVV5.css","assets/BesoinsEtRegles-DpPkjQFc.js","assets/bilan-B-bfPYR0.css","assets/bilan-BnguqAmk.js","assets/BilanMensuel-DqVmI_x7.js","assets/Branches-BUoD7gfl.js","assets/bridges-ChYFwgBM.js","assets/Caisse-B1UV_bs2.js","assets/caisse-du-soir-4Q_5ljH5.js","assets/caisse-du-soir-C6vPx-E_.css","assets/caisse-fluide-pur-CWWqklcI.js","assets/Caisses-AHJFileH.js","assets/Calendrier-1hrJwt5w.js","assets/campagnes-pur-BdWnNZi4.js","assets/Carnet-DDTHuZbU.js","assets/carte-BZOTwjde.js","assets/carte-_W_-xBPj.css","assets/CarteModal-DxjEHCuS.js","assets/CartesCadeaux-Bh2NpG_w.js","assets/Catalogue-D73GMhLO.js","assets/CentreDeCommande-Du8kyJhp.css","assets/CentreDeCommande-Dz7Aizhb.js","assets/Cercle-CMdZe0Mw.js","assets/certificat-DYHKMskY.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-CwW_Luwm.js","assets/chiffre-du-jour-pur-jj27QGd0.js","assets/ChiffreDesPrestations-C1tHbJVm.js","assets/Classement-Bck2TJ-z.js","assets/classement-CjJCO8oj.js","assets/classement-pur-DUumGb-O.js","assets/Classement-T9x-HPwd.css","assets/client-Dc4ATSsO.js","assets/cloture-du-jour-CvMwSFtr.js","assets/ClotureDuTiroir-kRVUfnCS.js","assets/Coffre-BQv_4LwH.js","assets/components-Cv-7sZo4.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-CcBGpl8P.js","assets/Comptes-BGbGDH_5.js","assets/consultation-BjSHHjeh.js","assets/consultation-CRW6QcWf.css","assets/Consultations-BkB4do5M.js","assets/Consultations-DiE-2_mG.css","assets/consultNotes-D4gkw_J9.js","assets/contexte-de-la-reponse-CpmHv50T.js","assets/Conversations-CYbZZsKI.js","assets/Conversations-D4WwB5Zo.css","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances--_datAql.js","assets/currency-Cd0clE4P.js","assets/Customers-DWoDfQwH.js","assets/Dashboard-CWbXWCsV.js","assets/Dashboard-D9jnTaFp.css","assets/dates-BPCvUuCJ.js","assets/DemanderAPerle-BD5NgCRN.css","assets/DemanderAPerle-CIOBe_Xp.js","assets/Demandes-wKTABMMV.js","assets/DepenseEnUnePhrase-BIGRlGqP.css","assets/DepenseEnUnePhrase-pXmzCNVW.js","assets/Depenses-PhzyIyE4.js","assets/depenses-saisie-K7UX8wNl.js","assets/devis-CdIRAvZk.css","assets/devis-DeiOtttO.js","assets/devis-remis-CbrPr9EW.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-MYtO16Qj.js","assets/diagnostics-au-trone-FQgGOL5x.js","assets/Dictee-B0N9FLHA.js","assets/Dictee-C-pUYYFA.css","assets/dictee-pur-V9G0kvq_.js","assets/Discussions-DsEC8FzA.js","assets/dist-9vv0te18.js","assets/echappe-html-pur-gEhHOM07.js","assets/EditeurDesOffres-gn67VSO8.js","assets/Encaissements-Cuxz4BiX.js","assets/EnDirect-GxinUQYJ.js","assets/enfants-A5MmIJkF.js","assets/Engagements-C3m_gijl.js","assets/Engagements-Cj5S9MhG.css","assets/engagements-coffre-C00yAE_v.js","assets/EntreDeuxSeances--POQoFiW.js","assets/es-BtH8E-PA.js","assets/etoiles-pur-CgRPMSHm.js","assets/Evaluation-CjkG98Ct.js","assets/facture-BOFiad6B.js","assets/Factures-DjkHvilE.js","assets/FenetreDeLAgent-Dck_M538.js","assets/FenetreDesCivilites-DiAz6GXQ.js","assets/FenetreDesCivilites-zfNk1aak.css","assets/FenetreDuPoint-CcYsez6h.js","assets/Fil-CZnIHdey.js","assets/finances-C8x7Mn4-.css","assets/fon-BZNGRvSn.js","assets/fournisseurs-DnlPIH3d.js","assets/Fournisseurs-HO10wIPo.js","assets/foyer-V_6z_skj.js","assets/gerard-donnees-EdSDsPAT.js","assets/Gerard-gFx7ceF0.js","assets/Gerard-lGKehvgG.css","assets/gestes-conversation-BLZ9omrK.js","assets/heures-des-rappels-pur-BWJPB8OP.js","assets/HomeRituals-BF5mbzmy.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-4bYJyuLi.js","assets/ia-centre-D2kCFUiv.js","assets/ia-diagnostic-pur-qGnFEvys.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-tableau-pur-p6UvREJe.js","assets/identite-DINMFaMp.js","assets/index.es-CBojmxBD.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-D16UHwwZ.js","assets/jspdf.es.min-DUNzdNNb.js","assets/JustePrix-CqhlhCFo.js","assets/kkiapay-JGonJ0Uy.js","assets/kkiapay-widget-CaHBoBVm.js","assets/Laboratoire-DYKhYN92.js","assets/LaJournee-Bn_G0HCt.css","assets/LaJournee-CtrOi2u-.js","assets/le-caissier-pur-pSGUN5W1.js","assets/le-sceau-pur-Dv-IZ_M2.js","assets/LePoint-B_HurXA0.css","assets/LePoint-Cf41Hx8_.js","assets/LesPaiements-BuYzeSYV.js","assets/LesPaiements-C9cEZlne.css","assets/LettresAuDossier-B1wQimLw.js","assets/LienMndPay-xw7dzAMO.js","assets/Marketing-D_4_RiQt.js","assets/MarketingBranche-CVACwFU-.js","assets/Marque-OHzvge2u.js","assets/MesPourboires-CENjelyb.css","assets/MesPourboires-rI0xErex.js","assets/MesTaches-Cc4XUDf6.css","assets/MesTaches-ity-E1BE.js","assets/mnd-pay-pur-CfS2mkAo.js","assets/momo-C2ZVfV9J.js","assets/MonMois-Dw8EsHuF.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/MtnMoMo-CLznfBKo.js","assets/objectifs-8Tw3cGIv.js","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/opale-DuzRGG92.js","assets/oreille-B1AMUmZh.js","assets/paie-du-5-5ZrVqc7A.js","assets/paie-du-5-DeJq-K_U.css","assets/paie-du-5-pur-CPiCK8fv.js","assets/paie-par-mtn-Bi9wbhNe.js","assets/PaieParMtn-9XzhDX-n.js","assets/paliers-BgNv5uaO.js","assets/Parametres-CRMsGLib.js","assets/parcours-BlxfbZFa.js","assets/Parrainages-gAHAPB_6.css","assets/Parrainages-TzGuX2Xe.js","assets/PassageAvantLeFauteuil-9GomYCbv.js","assets/pdf-B8IqXpuY.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/periode-des-pourboires-pur-BUWqfwov.js","assets/Personas-BVTHso2i.js","assets/Personnel-Ju9TSMGF.js","assets/photo-D196sWyk.js","assets/pilotage-D8kf1Co8.css","assets/porte-de-l-equipe-QxO_YHiO.js","assets/Pourboires-BlCZLXfw.js","assets/Predictions-ibizNmsw.js","assets/preload-helper-BRe_O-Rg.js","assets/Prestataires-DBV5mExx.js","assets/Prets-BqAh9CTE.js","assets/PrevisionDuMois-Dg5y7OKW.js","assets/PrevisionDuMois-DlFTw3OX.css","assets/Previsions-9BU2Vg1T.css","assets/Previsions-BC-7ymqZ.js","assets/previsions-pur-Bc_8ZUkF.js","assets/processus-pur-R6U5QcCi.js","assets/projets-C60-bPdi.js","assets/Projets-COO7WDEE.css","assets/Projets-fLqZPFGq.js","assets/projets-pur-2ZEMRNDU.js","assets/protocoles-BeifH3en.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-L52FDNob.js","assets/quiz-5qMPWZVi.js","assets/Rapport-CKNLcp9t.js","assets/Recommandations-D_4iiZ9V.js","assets/regler-D1gFEaVz.css","assets/regler-M4b9LO4N.js","assets/regler-par-fedapay-pur-DP7zXAs5.js","assets/relances-pur-C9iUwl2e.js","assets/releve-des-avis-Bqw3PMF-.js","assets/SalonFoyer-039HpcXK.js","assets/sceau-CrlK7NEV.js","assets/secretariat-admin-BW2YTJjv.js","assets/Secretariat-Cq72XBf1.js","assets/Secretariat-Cy79Zw30.css","assets/Signatures-CjNuUJyb.js","assets/SignerUnPdf-j5igbwtc.js","assets/Synthese-SceejTJy.js","assets/SyntheseGraphes-jVv5BNpK.js","assets/systeme-TPy-pF7j.css","assets/Tableau-IxTfflvW.js","assets/temps-Bvbc4VNd.js","assets/Textes-BoLYVLAx.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-CkDzpGy0.css","assets/tiroirs-DV1ICN6_.js","assets/trone-C3eufNNq.css","assets/trone-CTsXgc4f.js","assets/useAudiences-BD1NCGm0.js","assets/useClotureDuJour-F1mMpI8z.js","assets/visios-Nk1-1mWV.js","assets/Vitrine-BWilTqQJ.css","assets/Vitrine-CvGWrwWC.js","assets/_admin-CIGYAMcU.js","assets/_contrat-Drden07E.js","assets/_reuni-lAACiADg.js","assets/_shared-C2aH-SQK.js","assets/_signature-B2ZE7jCc.js","assets/_ui-BrUDlmuM.css","assets/_ui-D8b_ryFK.js"];
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

  /* LE PLAN POUR VENIR, LE RÉSEAU D'ABORD (20 novembre 2026). Il part chez les
     clientes : gardé comme les autres images, le plan d'avant une correction
     (l'adresse du 20 novembre) repartait une fois de plus de chaque appareil.
     En ligne, toujours le dernier, sans le cache du navigateur ; sans réseau,
     celui qu'on a. */
  if (url.pathname.includes('/assets/itineraire/')) {
    event.respondWith((async () => {
      const c = await caches.open(CACHE_IMAGES);
      try {
        const r = await avecDelai(fetch(req, { cache: 'no-cache' }), DELAI_PAGE_MS);
        if (r.ok) { void c.put(req, r.clone()); return r; }
        return (await c.match(req)) || r;
      } catch (_e) {
        return (await c.match(req)) || Response.error();
      }
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
