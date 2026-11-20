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
const BUILD = "20261120082030";
const A_GARDER = ["./","assets/Abonnements-C5TQF2m5.js","assets/abonnements-D2bxLGiU.js","assets/Abonnements-DTY7p2DH.css","assets/Academie-HY4xeUdK.js","assets/Acces-BQ_SKheL.js","assets/AFaire-T9iZn94f.js","assets/afaire-wo-ACLMz.js","assets/Agents-C6sDXNGq.js","assets/agents-donnees-Wy7rbgiv.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-CifLTGpB.js","assets/App-BozV4l6M.js","assets/Appels-BpCwZu5W.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/Assistants-BlmsgjQE.js","assets/Assistants-D9i2Xwmg.css","assets/AtelierDesContenus-BMAvawoe.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/Audience-C-T5cvJS.js","assets/Aujourdhui-B8wtHAf6.js","assets/auth-CA8_hAfY.js","assets/avant-le-fauteuil-lecture-D08YttBF.js","assets/AvantLeFauteuil-B0LuyC7W.js","assets/avis-fiches-t3TOQoL1.js","assets/AvisGoogle-CIzN2WeE.js","assets/AvisGoogle-DaPXfwX9.css","assets/BadgeEssai-BKhs6Kry.js","assets/BadgeSuggere-Cnraj7L7.js","assets/besoins-D-6PIWgX.js","assets/BesoinsEtRegles-BLwxGVV5.css","assets/BesoinsEtRegles-D-Nu473A.js","assets/bilan-B-bfPYR0.css","assets/bilan-DFLotssr.js","assets/BilanMensuel-C54up-3z.js","assets/Branches-7sGiM4xU.js","assets/bridges-CWSfFYCg.js","assets/Caisse-CS4ukRNQ.js","assets/caisse-du-soir-BcUCDIia.js","assets/caisse-du-soir-C6vPx-E_.css","assets/Caisses-B12vDcLo.js","assets/Calendrier-CeovjxHa.js","assets/campagnes-pur-BNxyPkIs.js","assets/Carnet-Du4AGtU6.js","assets/carte-CqG-vOfv.js","assets/carte-_W_-xBPj.css","assets/CarteModal-CWkwRZvW.js","assets/CartesCadeaux-BlMf59NV.js","assets/Catalogue-Cmg0pGuy.js","assets/CentreDeCommande-B3FMhDyG.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-_PfHxQrP.js","assets/certificat-DSe1Vhh-.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-vmfFWiNz.js","assets/chiffre-du-jour-pur-C0uQefVg.js","assets/ChiffreDesPrestations-CvTiA40C.js","assets/Classement-CmpbQZDu.css","assets/Classement-DEDyN_hT.js","assets/classement-pur-CQOYU06l.js","assets/client-DyVWX6N2.js","assets/cloture-du-jour-B-aTHudh.js","assets/ClotureDuTiroir-CGSrNtml.js","assets/Coffre-CZGR_bvk.js","assets/collecte-mtn-pur-Bq3uWgWT.js","assets/components-B5hsDZh3.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-3vLOOkga.js","assets/Comptes-O6JeiKDL.js","assets/consultation-CRW6QcWf.css","assets/consultation-DMK6_jet.js","assets/Consultations-DiE-2_mG.css","assets/Consultations-DwXaVV9S.js","assets/consultNotes-CTPRlYTv.js","assets/Conversations-AEmMmbFr.js","assets/Conversations-D4WwB5Zo.css","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-BM6VsmZq.js","assets/currency-Cd0clE4P.js","assets/Customers-CcSxIVTl.js","assets/Dashboard-B2x7VsE_.css","assets/Dashboard-Dr9B12Hw.js","assets/dates-DFP05G5i.js","assets/Demandes-D8WKx9-1.js","assets/DepenseEnUnePhrase-BIGRlGqP.css","assets/DepenseEnUnePhrase-BIUDTxF2.js","assets/Depenses-BTkrTEDU.js","assets/depenses-saisie-HGmE1gP7.js","assets/devis-remis-BTLUQ3CA.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-D1dHRc8e.js","assets/diagnostics-au-trone-UaU_MzKN.js","assets/Dictee-C-pUYYFA.css","assets/Dictee-DDdqNS-t.js","assets/dictee-pur-CAj7jojQ.js","assets/Discussions-DXvLfIhJ.js","assets/echappe-html-pur-gEhHOM07.js","assets/EditeurDesOffres-AX1A0n9y.js","assets/Encaissements-oVvTTUl9.js","assets/enfants-CmdVMPiZ.js","assets/Engagements-B18mtYzR.js","assets/Engagements-Cj5S9MhG.css","assets/engagements-coffre-BAALGXzO.js","assets/EntreDeuxSeances-Bej1RPkO.js","assets/es-_99PuqhL.js","assets/Evaluation-D3sQpdgI.js","assets/facture-DCUpGuXO.js","assets/Factures-C_sJ3SQu.js","assets/FenetreDeLAgent-Bv1wsLEq.js","assets/FenetreDesCivilites-BoRoIYMc.js","assets/FenetreDesCivilites-zfNk1aak.css","assets/FenetreDuPoint-fpU_8aBq.js","assets/Fil-N1lrS3WX.js","assets/finances-C8x7Mn4-.css","assets/fon-9STCMp-Y.js","assets/Fournisseurs-BM9yxFZ1.js","assets/fournisseurs-CO4wFV1L.js","assets/foyer-MBw8S6WG.js","assets/Gerard-C4y3HDve.js","assets/gerard-donnees-Bqg9Gfwo.js","assets/Gerard-vo2IWvP3.css","assets/gestes-conversation-ChB8eWmy.js","assets/heures-des-rappels-pur-BWJPB8OP.js","assets/HomeRituals-C7MkFURe.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-vZxWxL34.js","assets/ia-centre-BxHEzzgO.js","assets/ia-diagnostic-pur-qGnFEvys.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-tableau-pur-p6UvREJe.js","assets/identite-B_5yvHhR.js","assets/index.es-D1FZA2w3.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-DlAsVIAC.js","assets/jspdf.es.min-5et4FbV4.js","assets/JustePrix-D761y8Z6.js","assets/kkiapay-CyjXa5A_.js","assets/kkiapay-widget-CVmsl9OE.js","assets/Laboratoire-C0FnZaGM.js","assets/LaJournee-Bn_G0HCt.css","assets/LaJournee-DTyk1Lpk.js","assets/le-caissier-pur-CylGlSTL.js","assets/LesPaiements-C9cEZlne.css","assets/LesPaiements-CvNr6yR4.js","assets/LettresAuDossier-BYa_S4IH.js","assets/LienMndPay-BY4LDTX8.js","assets/Marketing-CxXF0uaE.js","assets/MarketingBranche-3_qmWYn9.js","assets/Marque-Dgtei_z3.js","assets/MesPourboires-BwwxHJ1C.js","assets/MesPourboires-CENjelyb.css","assets/MesTaches-BBM_6ECq.js","assets/MesTaches-Cc4XUDf6.css","assets/momo-C2ZVfV9J.js","assets/MonMois-dintwOE-.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/MtnMoMo-b3-fULSb.js","assets/objectifs-BzFqrwFL.js","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/opale-RsotlF8c.js","assets/oreille-B1AMUmZh.js","assets/paie-du-5-D0XqBdzh.js","assets/paie-du-5-DeJq-K_U.css","assets/paie-du-5-pur-CPiCK8fv.js","assets/paie-par-mtn-DHpaDJ9x.js","assets/PaieParMtn-SW6WTfxj.js","assets/paliers-lv8OvZ91.js","assets/Parametres-Dwmr7rqR.js","assets/parcours-n-y7hsha.js","assets/Parrainages-FADndH28.js","assets/Parrainages-gAHAPB_6.css","assets/PassageAvantLeFauteuil-B8vn6SGR.js","assets/pdf-BYFjXT1T.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/periode-des-pourboires-pur-BUWqfwov.js","assets/Personas-Dp5T_G7K.js","assets/Personnel-BGLSZJrI.js","assets/photo-K8BG5mmc.js","assets/pilotage-D8kf1Co8.css","assets/porte-de-l-equipe-BtkW8wS6.js","assets/Pourboires-ucmvRNpy.js","assets/Predictions-SX1VIDCm.js","assets/preload-helper-BRe_O-Rg.js","assets/Prestataires-AIgKX2Pr.js","assets/Prets-CBHV0Tz3.js","assets/PrevisionDuMois-BZVKLMJh.js","assets/PrevisionDuMois-DlFTw3OX.css","assets/Previsions-9BU2Vg1T.css","assets/Previsions-B13huWdZ.js","assets/previsions-pur-B7DF-Wj1.js","assets/processus-pur-R6U5QcCi.js","assets/projets-CAJAwmRE.js","assets/Projets-CFP9bJ-a.js","assets/Projets-COO7WDEE.css","assets/projets-pur-2ZEMRNDU.js","assets/protocoles-CqL1gpEF.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-DdscYcRF.js","assets/quiz-5qMPWZVi.js","assets/Rapport-DPQavsZ0.js","assets/Recommandations-sAHiiR19.js","assets/regler-DHR_B1Dm.css","assets/regler-M0a4Hprz.js","assets/regler-par-fedapay-pur-G8CEJdGn.js","assets/relances-pur-BacTXlI2.js","assets/releve-des-avis-DxmVA-H_.js","assets/SalonFoyer-BPZzDD8x.js","assets/secretariat-admin-D_cFfQ2A.js","assets/Secretariat-Cy79Zw30.css","assets/Secretariat-lbXQwzsv.js","assets/Signatures-DKiBiKMC.js","assets/SignerUnPdf-FdQommDg.js","assets/Synthese-CI-WzXzZ.js","assets/SyntheseGraphes-Bl__shLk.js","assets/systeme-TPy-pF7j.css","assets/Tableau-6asw6Ef1.js","assets/temps-Cc8nuHF-.js","assets/Textes-CISPJ_Ox.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-BZ7SnAj0.js","assets/tiroirs-CkDzpGy0.css","assets/trone-BjyPus80.js","assets/trone-Dsdrwhxz.css","assets/useAudiences-C9dl938a.js","assets/useClotureDuJour-Uo5oYHZM.js","assets/visios-DU6Xtrjl.js","assets/Vitrine-BWilTqQJ.css","assets/Vitrine-xT5oqJq4.js","assets/_admin-DYvc0sBC.js","assets/_contrat-BrKOuvSr.js","assets/_reuni-DjT_2YY0.js","assets/_shared-KTx6JsSV.js","assets/_signature-BHMYDJw9.js","assets/_ui-BrUDlmuM.css","assets/_ui-DDFzFWDt.js"];
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
