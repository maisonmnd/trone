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
const BUILD = "20261125102904";
const A_GARDER = ["./","assets/abonnements-BvYrZsoF.js","assets/Abonnements-CmarXFT0.js","assets/Abonnements-DTY7p2DH.css","assets/Academie-bs4K3c8A.js","assets/Acces-CxMQXsRh.js","assets/afaire-Bq-Mh9Kj.js","assets/AFaire-Btl_Ss_n.js","assets/Agents-DLxlwJXH.js","assets/agents-donnees-C2F9-b3p.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-B_PmhXOq.js","assets/App-8g2t6RwZ.js","assets/Appels-BPlgo19N.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/Assistants-0sUKZWT6.js","assets/Assistants-D9i2Xwmg.css","assets/AtelierDesContenus-aP16tICo.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/Audience-CJF7xcYC.js","assets/Aujourdhui-BRKq1N85.js","assets/auth-B-s4xgz2.js","assets/avant-le-fauteuil-lecture-Bu1gIQiM.js","assets/AvantLeFauteuil-J4c63wni.js","assets/avis-fiches-fow7YpJl.js","assets/avis-google-pont-BVMzJZdE.js","assets/AvisGoogle-DaPXfwX9.css","assets/AvisGoogle-DNAs524i.js","assets/BadgeEssai-CUESKcLQ.js","assets/BadgeSuggere-B5Au0JX2.js","assets/besoins-CLgBSAbO.js","assets/BesoinsEtRegles-BLwxGVV5.css","assets/BesoinsEtRegles-CacspPsr.js","assets/bilan-B-bfPYR0.css","assets/bilan-Czdd2GAB.js","assets/BilanMensuel-C_HoO-W0.js","assets/Branches-CCDToJn4.js","assets/bridges-ClbITMZd.js","assets/caisse-du-soir-C6vPx-E_.css","assets/caisse-du-soir-We5v5dVX.js","assets/caisse-fluide-pur-cfcBqRRI.js","assets/Caisse-vyrvk0Rw.js","assets/Caisses-R1IWZK0l.js","assets/Calendrier-CdWiScCI.js","assets/campagnes-pur-CTdyWIGH.js","assets/Carnet-D3JWcZKn.js","assets/carte-BiW7piE5.js","assets/carte-_W_-xBPj.css","assets/CarteModal-C26l3kcx.js","assets/CartesCadeaux-Hlr-lYat.js","assets/Catalogue-BPgALNVa.js","assets/CentreDeCommande-CuTxdg7s.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle--3MN0AG4.js","assets/certificat-DEzNEgr-.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-cmO5anTf.js","assets/chiffre-du-jour-pur-D3JyASGO.js","assets/ChiffreDesPrestations-8j3Q4SeF.js","assets/Classement-CDcwx5Qa.js","assets/classement-Ce59RkIy.js","assets/classement-pur-6JMvjF9n.js","assets/Classement-T9x-HPwd.css","assets/client-BgKSgObc.js","assets/cloture-du-jour-BXXpcJIZ.js","assets/ClotureDuTiroir-u-8UD4Rz.js","assets/Coffre-UesuGIot.js","assets/components-J6Z5-0BV.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-CcTrNuJK.js","assets/Comptes-DImQwG7i.js","assets/consultation-BvBdTffI.js","assets/consultation-CRW6QcWf.css","assets/Consultations-BE_yAxdo.js","assets/Consultations-DiE-2_mG.css","assets/consultNotes-Bi7iI71V.js","assets/contexte-de-la-reponse-DGMpd9dG.js","assets/Conversations-CjG_NOxB.js","assets/Conversations-D4WwB5Zo.css","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-YFi2Jcre.js","assets/currency-Cd0clE4P.js","assets/Customers-i8hkmE01.js","assets/Dashboard-BlBRN44N.js","assets/Dashboard-D9jnTaFp.css","assets/dates-BLkrTgbB.js","assets/DemanderAPerle-B4LN5yp8.js","assets/DemanderAPerle-BD5NgCRN.css","assets/Demandes-zeKiRZ2g.js","assets/DepenseEnUnePhrase-BIGRlGqP.css","assets/DepenseEnUnePhrase-DChC3Kku.js","assets/Depenses-lL9M-ARt.js","assets/depenses-saisie-DVelljJ3.js","assets/devis-BwNGI3jm.js","assets/devis-CdIRAvZk.css","assets/devis-remis-CAACg-Lc.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-C7MFPW0c.js","assets/diagnostics-au-trone-DGtNaOUc.js","assets/Dictee-C-pUYYFA.css","assets/dictee-pur-5xp_T6p5.js","assets/Dictee-SLzGbldO.js","assets/Discussions-DBQ4IGMj.js","assets/dist-9vv0te18.js","assets/echappe-html-pur-gEhHOM07.js","assets/EditeurDesOffres-kSLkhT-e.js","assets/Encaissements-CG4eafiH.js","assets/EnDirect-DaV0srvX.js","assets/enfants-Cq9ejswA.js","assets/Engagements-Cj5S9MhG.css","assets/engagements-coffre-DlhzJU3_.js","assets/Engagements-fwQri_4O.js","assets/EntreDeuxSeances-Cqly-3WE.js","assets/es-yXQUTJMv.js","assets/etoiles-pur-CgRPMSHm.js","assets/Evaluation-Do0pXGWF.js","assets/facture-CXbsYWz5.js","assets/Factures-DJLPuNVu.js","assets/FenetreDeLAgent-DpB_sWOm.js","assets/FenetreDesCivilites-7iBN2hsQ.js","assets/FenetreDesCivilites-zfNk1aak.css","assets/FenetreDuPoint-DxhuQ27o.js","assets/Fil-CKKkaaBw.js","assets/finances-C8x7Mn4-.css","assets/fon-BNyjKck_.js","assets/fournisseurs-B6NNLXe3.js","assets/Fournisseurs-CrPbU0yR.js","assets/foyer-B3t42_eo.js","assets/Gerard-CnKNrxwN.js","assets/gerard-donnees-Dr-nqtha.js","assets/Gerard-lGKehvgG.css","assets/gestes-conversation-CUoak6c2.js","assets/heures-des-rappels-pur-BWJPB8OP.js","assets/HomeRituals-BQ_mMX7o.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-BZJidIM-.js","assets/ia-centre-BymJMXjO.js","assets/ia-diagnostic-pur-qGnFEvys.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-tableau-pur-p6UvREJe.js","assets/identite-BHJolyRT.js","assets/index.es-Dcu8whuk.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-BJhPWDq3.js","assets/jspdf.es.min-DrgwhBMG.js","assets/JustePrix-DT47N3pe.js","assets/kkiapay-CO2sS_hb.js","assets/kkiapay-widget-CaHBoBVm.js","assets/Laboratoire-RVL_ThIb.js","assets/LaJournee-B4GAUvxp.js","assets/LaJournee-Bn_G0HCt.css","assets/le-caissier-pur-BU71smaB.js","assets/le-sceau-pur-Dv-IZ_M2.js","assets/LePoint-B_HurXA0.css","assets/LePoint-DkBxUyvR.js","assets/LesPaiements-Bosywohp.js","assets/LesPaiements-C9cEZlne.css","assets/LettresAuDossier-BFqSrFhu.js","assets/LienMndPay-D1g24yjV.js","assets/Marketing-DeB8V7Zm.js","assets/MarketingBranche-DCLd6PbC.js","assets/Marque-DeylLiyy.js","assets/MesPourboires-CENjelyb.css","assets/MesPourboires-D-ESMsdC.js","assets/MesTaches-Cc4XUDf6.css","assets/MesTaches-hQjpzVMi.js","assets/mnd-pay-pur-CfS2mkAo.js","assets/momo-C2ZVfV9J.js","assets/MonMois-D907I1n-.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/MtnMoMo-DKEmS3aT.js","assets/objectifs-CvUjqYYQ.js","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/opale-B72aXhaq.js","assets/oreille-B1AMUmZh.js","assets/paie-du-5-BM-jh7Nd.js","assets/paie-du-5-DeJq-K_U.css","assets/paie-du-5-pur-CPiCK8fv.js","assets/paie-par-mtn-Fdd1aYaD.js","assets/PaieParMtn-CPM6N6EL.js","assets/paliers-NDJCM1FW.js","assets/Parametres-Dj9zggOb.js","assets/parcours-AiBczSHL.js","assets/Parrainages-BqJjZEJq.js","assets/Parrainages-gAHAPB_6.css","assets/PassageAvantLeFauteuil-hmRqCokm.js","assets/pdf-DLKt4kEK.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/periode-des-pourboires-pur-BUWqfwov.js","assets/Personas-DPbNfU8A.js","assets/Personnel-ChJGafd3.js","assets/photo-f2HWyBpQ.js","assets/pilotage-D8kf1Co8.css","assets/porte-de-l-equipe-DYX-9XnJ.js","assets/Pourboires-CFnADSwh.js","assets/Predictions-C0NohMW2.js","assets/preload-helper-BRe_O-Rg.js","assets/Prestataires-CGEnotBu.js","assets/Prets-DFeOhUNM.js","assets/PrevisionDuMois-C9CiRda_.js","assets/PrevisionDuMois-DlFTw3OX.css","assets/Previsions-9BU2Vg1T.css","assets/Previsions-CTojk_8-.js","assets/previsions-pur-kq_Nd_Pl.js","assets/processus-pur-R6U5QcCi.js","assets/Projets-B0CdjVSI.js","assets/Projets-COO7WDEE.css","assets/projets-Ithj_ktv.js","assets/projets-pur-2ZEMRNDU.js","assets/protocoles-X_pFakwK.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-CzO9-FPx.js","assets/quiz-5qMPWZVi.js","assets/Rapport-DWNXsNVq.js","assets/Recommandations-6qcHvNEW.js","assets/regler-BQGwL6GF.js","assets/regler-D1gFEaVz.css","assets/regler-par-fedapay-pur-DP7zXAs5.js","assets/relances-pur-C9iUwl2e.js","assets/releve-des-avis-C7hIw937.js","assets/SalonFoyer-DV8akh6J.js","assets/sceau-DwvT9pW5.js","assets/secretariat-admin-Bjk16W2w.js","assets/Secretariat-Cy79Zw30.css","assets/Secretariat-DN-0ZMbF.js","assets/Signatures-D18_niia.js","assets/SignerUnPdf-5_akmZHL.js","assets/Synthese-DZ2ELkpg.js","assets/SyntheseGraphes-C7MnvovL.js","assets/systeme-TPy-pF7j.css","assets/Tableau-U4rNhRlS.js","assets/temps-VDmCn-15.js","assets/Textes-De1CoJe0.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-7BE4hsZf.js","assets/tiroirs-CkDzpGy0.css","assets/trone-C3eufNNq.css","assets/trone-DjrIi-03.js","assets/useAudiences-DOSavN5u.js","assets/useClotureDuJour-BnjO3IAi.js","assets/visios-CcYr-Gyh.js","assets/Vitrine-5igwY21C.js","assets/Vitrine-BWilTqQJ.css","assets/_admin-CaOhK3XY.js","assets/_contrat-B-D5BPYD.js","assets/_reuni-BO2KqVnX.js","assets/_shared-C4jKK-8I.js","assets/_signature-DmeztLnz.js","assets/_ui-BrUDlmuM.css","assets/_ui-CLkijMNe.js"];
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
