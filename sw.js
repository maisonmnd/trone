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
const BUILD = "20261123141345";
const A_GARDER = ["./","assets/Abonnements-BgP37hM6.js","assets/abonnements-BSKkh8jl.js","assets/Abonnements-DTY7p2DH.css","assets/Academie-DXaSH7eK.js","assets/Acces-Bhm861WM.js","assets/AFaire-BSN76yXH.js","assets/afaire-fuwRqvbw.js","assets/Agents-CBEisXoq.js","assets/agents-donnees-DARAlW8x.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-xYkAvDTf.js","assets/App-CMA_cH9k.js","assets/Appels-P_IEBVeg.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/Assistants-D9i2Xwmg.css","assets/Assistants-nXbAxvq_.js","assets/AtelierDesContenus-CirlyRnv.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/Audience-BrXj4OI_.js","assets/Aujourdhui-uMhUQgvu.js","assets/auth-xGjNHC-z.js","assets/avant-le-fauteuil-lecture-BGTd7JYD.js","assets/AvantLeFauteuil-HfujPABK.js","assets/avis-fiches-yUnxHL6L.js","assets/avis-google-pont-CyzYytlU.js","assets/AvisGoogle-DaPXfwX9.css","assets/AvisGoogle-DqPsjziI.js","assets/BadgeEssai-0lVxEzwB.js","assets/BadgeSuggere-CAMf5LAO.js","assets/besoins-NX6oDHdJ.js","assets/BesoinsEtRegles-BhWif3r4.js","assets/BesoinsEtRegles-BLwxGVV5.css","assets/bilan-B-bfPYR0.css","assets/bilan-Br7rjh5D.js","assets/BilanMensuel-CTTMFEQA.js","assets/Branches-CBcpi5o-.js","assets/bridges-JhPLn5gZ.js","assets/Caisse-DOKm98TN.js","assets/caisse-du-soir-C6vPx-E_.css","assets/caisse-du-soir-DbKCAs4u.js","assets/caisse-fluide-pur-nMQu7VvN.js","assets/Caisses-BXvBVQR2.js","assets/Calendrier-vvoUuos3.js","assets/campagnes-pur-D-Zcq_Mb.js","assets/Carnet-DmdY1fCp.js","assets/carte-CxmIMPAt.js","assets/carte-_W_-xBPj.css","assets/CarteModal-isu6NHCP.js","assets/CartesCadeaux-gyOqiXwL.js","assets/Catalogue-Btvq4DuF.js","assets/CentreDeCommande-C6PJ-2W8.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-C7KEPmp9.js","assets/certificat-BMM7kQhP.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-Bq34CdjK.js","assets/chiffre-du-jour-pur-BvRtBlmm.js","assets/ChiffreDesPrestations-ChRu9qkS.js","assets/classement-BjIjtjDQ.js","assets/Classement-CmpbQZDu.css","assets/Classement-Ddcq8TU-.js","assets/classement-pur-CQOYU06l.js","assets/client-C3b7eUu9.js","assets/cloture-du-jour-BI-9iqUy.js","assets/ClotureDuTiroir-Xzbojp7q.js","assets/Coffre-C4JeTN0f.js","assets/components-CSleuASg.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-D8DXFHzD.js","assets/Comptes-BoZ68pFx.js","assets/consultation-BstVEMjx.js","assets/consultation-CRW6QcWf.css","assets/Consultations-B91j6-cM.js","assets/Consultations-DiE-2_mG.css","assets/consultNotes-Dh44uvQZ.js","assets/contexte-de-la-reponse-zj7M-oWt.js","assets/Conversations-BpxFQt7s.js","assets/Conversations-D4WwB5Zo.css","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-CtvTQZe2.js","assets/currency-Cd0clE4P.js","assets/Customers-Byl6-Cv-.js","assets/Dashboard-BSOax1Fm.css","assets/Dashboard-CvWzR7bu.js","assets/dates-5nj3Lywz.js","assets/DemanderAPerle-BD5NgCRN.css","assets/DemanderAPerle-CFkaNFx1.js","assets/Demandes-BfvQ0LBe.js","assets/DepenseEnUnePhrase-BIGRlGqP.css","assets/DepenseEnUnePhrase-y6Fi5gdU.js","assets/Depenses-DvqjTubi.js","assets/depenses-saisie-BOn_A_wF.js","assets/devis-CdIRAvZk.css","assets/devis-dql7W5H7.js","assets/devis-remis-ChO53kfn.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-67WRtCd4.js","assets/diagnostics-au-trone-B-I1RbUL.js","assets/Dictee-C-pUYYFA.css","assets/Dictee-ECiIWvnG.js","assets/dictee-pur-BmK3iC5L.js","assets/Discussions-Ds8zl7Zg.js","assets/dist-9vv0te18.js","assets/echappe-html-pur-gEhHOM07.js","assets/EditeurDesOffres-DrzDNy98.js","assets/Encaissements-Bi7NGxQU.js","assets/enfants-CR6Q1ewk.js","assets/Engagements-Cj5S9MhG.css","assets/engagements-coffre-YvgPsmUb.js","assets/Engagements-DW2WAddj.js","assets/EntreDeuxSeances-YXdFhMeR.js","assets/es-ICs7onuA.js","assets/etoiles-pur-CgRPMSHm.js","assets/Evaluation-BBxj5phh.js","assets/facture-CRJ5Zro_.js","assets/Factures-CvGI8tHw.js","assets/FenetreDeLAgent-DvsJyZn2.js","assets/FenetreDesCivilites-DjkpbHNp.js","assets/FenetreDesCivilites-zfNk1aak.css","assets/FenetreDuPoint-CyGRxkLb.js","assets/Fil-DnV0jhU-.js","assets/finances-C8x7Mn4-.css","assets/fon-B5Ixgsla.js","assets/Fournisseurs-BgNFNuge.js","assets/fournisseurs-DpkIxYne.js","assets/foyer-zgo8bKpE.js","assets/gerard-donnees-B1PUDNmv.js","assets/Gerard-Dw6aTs14.js","assets/Gerard-lGKehvgG.css","assets/gestes-conversation-CaUh8rY6.js","assets/heures-des-rappels-pur-BWJPB8OP.js","assets/HomeRituals-C_i8jEEp.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-B9qZm4-s.js","assets/ia-centre-BHZYs0MA.js","assets/ia-diagnostic-pur-qGnFEvys.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-tableau-pur-p6UvREJe.js","assets/identite-D4SER2QV.js","assets/index.es-Nq7_-8sA.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-Bwvpvql0.js","assets/jspdf.es.min-BBBDBJb5.js","assets/JustePrix-DhGYA4yU.js","assets/kkiapay-GrbETTjw.js","assets/kkiapay-widget-CaHBoBVm.js","assets/Laboratoire-DnT-Ax_z.js","assets/LaJournee-B5DAW2vD.js","assets/LaJournee-Bn_G0HCt.css","assets/le-caissier-pur-By2UmF_0.js","assets/le-sceau-pur-ZsXKMtuY.js","assets/LePoint-BVLhnzAz.js","assets/LePoint-CBjCCMQ5.css","assets/LesPaiements-C9cEZlne.css","assets/LesPaiements-DnRanXiw.js","assets/LettresAuDossier-BLDygK6m.js","assets/LienMndPay-Be2FZNYT.js","assets/Marketing-87-YNv3E.js","assets/MarketingBranche-Dhwwbzon.js","assets/Marque-BGqmZeAO.js","assets/MesPourboires-BXGwEiUk.js","assets/MesPourboires-CENjelyb.css","assets/MesTaches-BG5cXa9T.js","assets/MesTaches-Cc4XUDf6.css","assets/mnd-pay-pur-CfS2mkAo.js","assets/momo-C2ZVfV9J.js","assets/MonMois-CUzMsZgF.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/MtnMoMo-VgBzSyZy.js","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/objectifs-DFOYXMrg.js","assets/opale-BNa61psg.js","assets/oreille-B1AMUmZh.js","assets/paie-du-5-Bv-EQ5dZ.js","assets/paie-du-5-DeJq-K_U.css","assets/paie-du-5-pur-CPiCK8fv.js","assets/paie-par-mtn-D9ZbHHH-.js","assets/PaieParMtn-DElXwuVj.js","assets/paliers-SOSPPcyw.js","assets/Parametres-DKgK8Qon.js","assets/parcours-B_lQUC7v.js","assets/Parrainages-Cks6uu91.js","assets/Parrainages-gAHAPB_6.css","assets/PassageAvantLeFauteuil-Bg-Ct9aN.js","assets/pdf-s0OR9TeU.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/periode-des-pourboires-pur-BUWqfwov.js","assets/Personas-DFsOHgxA.js","assets/Personnel-cIEQpcx1.js","assets/photo-B_E4S24r.js","assets/pilotage-D8kf1Co8.css","assets/porte-de-l-equipe-DheX8D5e.js","assets/Pourboires-CzMjOYIz.js","assets/Predictions-Dnve6yAz.js","assets/preload-helper-BRe_O-Rg.js","assets/Prestataires-tySf2SXG.js","assets/Prets-B1FhvNII.js","assets/PrevisionDuMois-DlFTw3OX.css","assets/PrevisionDuMois-xg6sAEDU.js","assets/Previsions-9BU2Vg1T.css","assets/Previsions-CYEW7Elu.js","assets/previsions-pur-C1Ij5SH5.js","assets/processus-pur-R6U5QcCi.js","assets/Projets-AXCB73wb.js","assets/Projets-COO7WDEE.css","assets/projets-DsGsBYon.js","assets/projets-pur-2ZEMRNDU.js","assets/protocoles-Dclrkwry.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-Doxhk0EQ.js","assets/quiz-5qMPWZVi.js","assets/Rapport-BL-eEk00.js","assets/Recommandations-CinGXuhj.js","assets/regler-D1gFEaVz.css","assets/regler-par-fedapay-pur-DP7zXAs5.js","assets/regler-pjd5dgVi.js","assets/relances-pur-C9iUwl2e.js","assets/releve-des-avis-gF-DkCVo.js","assets/SalonFoyer-e4CsPnQQ.js","assets/sceau-BAvWYlHe.js","assets/secretariat-admin-DkXPeUHI.js","assets/Secretariat-B2HwEIEP.js","assets/Secretariat-Cy79Zw30.css","assets/Signatures-BJYg_hWn.js","assets/SignerUnPdf-DYt1e6eM.js","assets/Synthese-DvyYO0he.js","assets/SyntheseGraphes-FVDQXmJb.js","assets/systeme-TPy-pF7j.css","assets/Tableau-BJhTw_SQ.js","assets/temps-BnHMlrXV.js","assets/Textes-DLpOzRbT.css","assets/Textes-lJYnbd67.js","assets/tiroirs-CkDzpGy0.css","assets/tiroirs-DXGryiUI.js","assets/trone-B-r6lpi2.css","assets/trone-bzWqt44c.js","assets/useAudiences-BQuns_yX.js","assets/useClotureDuJour-Bb6nX01Q.js","assets/visios-X9M9KHO3.js","assets/Vitrine-7ywPnoJj.js","assets/Vitrine-BWilTqQJ.css","assets/_admin-CGvMJTDj.js","assets/_contrat-BdHAFN5e.js","assets/_reuni-2QRn5Q06.js","assets/_shared-N6jGqFL_.js","assets/_signature-Xzpowc2V.js","assets/_ui-AHa7KE4i.js","assets/_ui-BrUDlmuM.css"];
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
