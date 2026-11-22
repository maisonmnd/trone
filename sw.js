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
const BUILD = "20261122022816";
const A_GARDER = ["./","assets/Abonnements-CaHtOHyN.js","assets/abonnements-CQEOvcWT.js","assets/Abonnements-DTY7p2DH.css","assets/Academie-HMKyZKNx.js","assets/Acces-D-aQ3m6u.js","assets/afaire-B4cYursX.js","assets/AFaire-D_cmBmhn.js","assets/Agents-BRKzSSz9.js","assets/agents-donnees-Cgx98i70.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-Dw1Hift3.js","assets/App-BOxP9dmw.js","assets/Appels-COBoPbYy.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/Assistants-D9i2Xwmg.css","assets/Assistants-DTTaTerO.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/AtelierDesContenus-DZDFv5s3.js","assets/Audience-BuXoc67M.js","assets/Aujourdhui-FIUMsRVv.js","assets/auth-C_d_VQsO.js","assets/avant-le-fauteuil-lecture-DiPmBlNC.js","assets/AvantLeFauteuil-VIEYyCSv.js","assets/avis-fiches-zytcRvoK.js","assets/avis-google-pont-Fw4sIvB0.js","assets/AvisGoogle-BmKgvng7.js","assets/AvisGoogle-DaPXfwX9.css","assets/BadgeEssai-B_q9vBoZ.js","assets/BadgeSuggere-D7B5ibgE.js","assets/besoins-YzNHbkPE.js","assets/BesoinsEtRegles-BLwxGVV5.css","assets/BesoinsEtRegles-CGvLXdLa.js","assets/bilan-B-bfPYR0.css","assets/bilan-By6IId2C.js","assets/BilanMensuel-CyLxICWJ.js","assets/Branches-DtVy3b22.js","assets/bridges-XT4ZV3-i.js","assets/caisse-du-soir-C6vPx-E_.css","assets/caisse-du-soir-sewWmIqW.js","assets/Caisse-DvNstsl7.js","assets/caisse-fluide-pur-FwH3HMEk.js","assets/Caisses-D6wNJX44.js","assets/Calendrier-Csys-LdR.js","assets/campagnes-pur-CZ5usBwq.js","assets/Carnet-CSf2sokZ.js","assets/carte-C8FecZ3U.js","assets/carte-_W_-xBPj.css","assets/CarteModal-DaByMbRq.js","assets/CartesCadeaux-CtQsxlfh.js","assets/Catalogue-ls4qhycW.js","assets/CentreDeCommande-D5_0GcKK.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-DlZ6ij0K.js","assets/certificat-cOeHXcRX.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-C9SEFrsE.js","assets/chiffre-du-jour-pur-BUXL5I-R.js","assets/ChiffreDesPrestations-bZL3uUmZ.js","assets/Classement-CmpbQZDu.css","assets/classement-DwJl5GaH.js","assets/Classement-ndm9gpcT.js","assets/classement-pur-CQOYU06l.js","assets/client-C4gvwGHj.js","assets/cloture-du-jour-BlMFXype.js","assets/ClotureDuTiroir-i79gJBmH.js","assets/Coffre-Drc2H3wf.js","assets/collecte-mtn-pur-DsqLz5d0.js","assets/components-Chh1Bzhu.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-DqzbzU1p.js","assets/Comptes-CdG1sSxR.js","assets/consultation-BIsXd_61.js","assets/consultation-CRW6QcWf.css","assets/Consultations-DiE-2_mG.css","assets/Consultations-NTw2WGXy.js","assets/consultNotes-GpXzw2SL.js","assets/contexte-de-la-reponse-CqBmAvJp.js","assets/Conversations-CEb3XcC8.js","assets/Conversations-D4WwB5Zo.css","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-CxKeMO1d.js","assets/currency-Cd0clE4P.js","assets/Customers-JMm5lf2x.js","assets/Dashboard-B2x7VsE_.css","assets/Dashboard-I4U4qTbf.js","assets/dates-w-3IXENG.js","assets/DemanderAPerle-BD5NgCRN.css","assets/DemanderAPerle-B_gfjA_V.js","assets/Demandes-CRmJyrom.js","assets/DepenseEnUnePhrase--OAVAnqx.js","assets/DepenseEnUnePhrase-BIGRlGqP.css","assets/Depenses-C8eidY53.js","assets/depenses-saisie-B3AxUPa2.js","assets/devis-remis-BNNcXOFm.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-B-ymjO8x.js","assets/diagnostics-au-trone-BreFBarN.js","assets/Dictee-C-pUYYFA.css","assets/Dictee-NEO28pKV.js","assets/dictee-pur-bqv_U_s4.js","assets/Discussions-Dl5_1l3u.js","assets/echappe-html-pur-gEhHOM07.js","assets/EditeurDesOffres-BbFJceZ3.js","assets/Encaissements-BflY77zk.js","assets/enfants-w7RCwx8s.js","assets/Engagements-Cj5S9MhG.css","assets/engagements-coffre-CM4I44JU.js","assets/Engagements-OMioo3bX.js","assets/EntreDeuxSeances-DhyJ_axb.js","assets/es-Dmzu9jR4.js","assets/Evaluation-XW6VLy_G.js","assets/facture-tggMYkA8.js","assets/Factures-NPDwBrBv.js","assets/FenetreDeLAgent-DAtaxhXo.js","assets/FenetreDesCivilites-rGkUog16.js","assets/FenetreDesCivilites-zfNk1aak.css","assets/FenetreDuPoint-Co4EJ1Ac.js","assets/Fil-BX7JAyKm.js","assets/finances-C8x7Mn4-.css","assets/fon-CvQskQ33.js","assets/fournisseurs-BpY5lxc1.js","assets/Fournisseurs-OcPvO3Bm.js","assets/foyer-kjrKUUUc.js","assets/Gerard-CxOuFk6R.js","assets/gerard-donnees-B5_TPlFt.js","assets/Gerard-lGKehvgG.css","assets/gestes-conversation-Bp5aUMVz.js","assets/heures-des-rappels-pur-BWJPB8OP.js","assets/HomeRituals-DjiOayAw.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-B_HM6ydH.js","assets/ia-centre-CfWzcs9W.js","assets/ia-diagnostic-pur-qGnFEvys.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-tableau-pur-p6UvREJe.js","assets/identite-Dph3nrxz.js","assets/index.es-EEhSa5zk.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-DvbT3Uam.js","assets/jspdf.es.min-Bw_Q51sJ.js","assets/JustePrix-D1Ul_Rfb.js","assets/kkiapay-widget-CVmsl9OE.js","assets/kkiapay-XqtwgZHV.js","assets/Laboratoire-CEsvlOG_.js","assets/LaJournee-Bn_G0HCt.css","assets/LaJournee-C84couHM.js","assets/le-caissier-pur-Cfemwwrm.js","assets/LePoint-Bec6jD2s.js","assets/LePoint-CBjCCMQ5.css","assets/LesPaiements-BabTQPcf.js","assets/LesPaiements-C9cEZlne.css","assets/LettresAuDossier-BXtSgMq4.js","assets/LienMndPay-CsT811Wj.js","assets/Marketing-BSFLjqBd.js","assets/MarketingBranche-B4DvOTQj.js","assets/Marque-DkZOXY_0.js","assets/MesPourboires-CENjelyb.css","assets/MesPourboires-CN4dZ-6f.js","assets/MesTaches-Cc4XUDf6.css","assets/MesTaches-CeECrn5Q.js","assets/momo-C2ZVfV9J.js","assets/MonMois-CK2JF3Ag.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/MtnMoMo-DxQPhSFY.js","assets/objectifs-BN5pQ76l.js","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/opale-CIVtSi3O.js","assets/oreille-B1AMUmZh.js","assets/paie-du-5-DeJq-K_U.css","assets/paie-du-5-DrPetrkx.js","assets/paie-du-5-pur-CPiCK8fv.js","assets/paie-par-mtn-C7twsHsN.js","assets/PaieParMtn-DEq1GOpU.js","assets/paliers-h6kBMk-X.js","assets/Parametres-BzgpfeH-.js","assets/parcours-Dle-qoiL.js","assets/Parrainages-BTHwitzc.js","assets/Parrainages-gAHAPB_6.css","assets/PassageAvantLeFauteuil-Cf_x7LYa.js","assets/pdf--ijGrXAz.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/periode-des-pourboires-pur-BUWqfwov.js","assets/Personas-C6Pz_D48.js","assets/Personnel-CMpE4R_8.js","assets/photo-CjQFjNyS.js","assets/pilotage-D8kf1Co8.css","assets/porte-de-l-equipe-BY7MpcO2.js","assets/Pourboires-DIFL8nq4.js","assets/Predictions-D7MFLNP_.js","assets/preload-helper-BRe_O-Rg.js","assets/Prestataires-DnAaOrPO.js","assets/Prets-CUQj03ec.js","assets/PrevisionDuMois-B8ZVDNH4.js","assets/PrevisionDuMois-DlFTw3OX.css","assets/Previsions-9BU2Vg1T.css","assets/Previsions-CK61MZV2.js","assets/previsions-pur-CDfLlctR.js","assets/processus-pur-R6U5QcCi.js","assets/projets-2g3AuJ2z.js","assets/Projets-COO7WDEE.css","assets/Projets-DpskmnRT.js","assets/projets-pur-2ZEMRNDU.js","assets/protocoles-CCOMjtKs.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-BKW9YqBu.js","assets/quiz-5qMPWZVi.js","assets/Rapport-BoSjOBmk.js","assets/Recommandations-DA14dRd7.js","assets/regler-DHR_B1Dm.css","assets/regler-DpqraMk-.js","assets/regler-par-fedapay-pur-CBsdnUYQ.js","assets/relances-pur-C9iUwl2e.js","assets/releve-des-avis-Cw-O3Aw3.js","assets/SalonFoyer-B3a65XQV.js","assets/secretariat-admin-ORzzQas4.js","assets/Secretariat-CQkLkufc.js","assets/Secretariat-Cy79Zw30.css","assets/Signatures-D0zdnbdS.js","assets/SignerUnPdf-CLtprPZa.js","assets/Synthese-M_9VJDrG.js","assets/SyntheseGraphes-zL4LboxQ.js","assets/systeme-TPy-pF7j.css","assets/Tableau-D-ItLYOl.js","assets/temps-B3ixD4-A.js","assets/Textes-Dd6OprMG.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-CkDzpGy0.css","assets/tiroirs-DK9CgXBp.js","assets/trone-B-r6lpi2.css","assets/trone-BtubaOXz.js","assets/useAudiences-CLyy85gI.js","assets/useClotureDuJour-B3U7KKlW.js","assets/visios-BI0_hnkC.js","assets/Vitrine-BIisovv6.js","assets/Vitrine-BWilTqQJ.css","assets/_admin-BtNVlo3N.js","assets/_contrat-DVKcdKki.js","assets/_reuni-DJxxDgg1.js","assets/_shared-CscASCCI.js","assets/_signature-CZefW47x.js","assets/_ui-BrUDlmuM.css","assets/_ui-DVTCj_nB.js"];
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
