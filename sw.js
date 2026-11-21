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
const BUILD = "20261121073102";
const A_GARDER = ["./","assets/Abonnements-BSLaJlCp.js","assets/abonnements-CUIMcJkj.js","assets/Abonnements-DTY7p2DH.css","assets/Academie-Bn10dFjs.js","assets/Acces-CIK5amcj.js","assets/afaire-CgkKGQ3C.js","assets/AFaire-D2xSehAY.js","assets/Agents-C7ICbNKN.js","assets/agents-donnees-bnSUa4tG.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-CqXnYHkL.js","assets/App-CUTN8LaV.js","assets/Appels-C_KSpZeO.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/Assistants-ChdEZ0ss.js","assets/Assistants-D9i2Xwmg.css","assets/AtelierDesContenus-D3-p6F2A.css","assets/AtelierDesContenus-Dvm0PQUl.js","assets/Audience-CobE5391.js","assets/Aujourdhui-DbtLDeUa.js","assets/auth-BPI3dZlf.js","assets/avant-le-fauteuil-lecture-DkIIk9LJ.js","assets/AvantLeFauteuil-D5IjQUKT.js","assets/avis-fiches-B09hhCtI.js","assets/AvisGoogle-CMj1vc4w.js","assets/AvisGoogle-DaPXfwX9.css","assets/BadgeEssai-uHgR3Afx.js","assets/BadgeSuggere-BnYBHxSn.js","assets/besoins-BJdOReuX.js","assets/BesoinsEtRegles-BLwxGVV5.css","assets/BesoinsEtRegles-C9JGDb1a.js","assets/bilan-B-bfPYR0.css","assets/bilan-iOn2P4fj.js","assets/BilanMensuel-DgNCkLPr.js","assets/Branches-DGkeSSIK.js","assets/bridges-Dv1Reggf.js","assets/Caisse-D5sdkq-t.js","assets/caisse-du-soir-C6vPx-E_.css","assets/caisse-du-soir-HEeCYBVe.js","assets/caisse-fluide-pur-D09N4ZVD.js","assets/Caisses-Cxn2QEjK.js","assets/Calendrier-CXlTqFsx.js","assets/campagnes-pur-RBYSEVYO.js","assets/Carnet-DVhT8amG.js","assets/carte-Bcw2Het7.js","assets/carte-_W_-xBPj.css","assets/CarteModal-c6jOji4t.js","assets/CartesCadeaux-CXLMCOP9.js","assets/Catalogue-D_FaHtWV.js","assets/CentreDeCommande-BFX_IJrv.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-CJbqBYw4.js","assets/certificat-DOADS8a9.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-DRAu2KUO.js","assets/chiffre-du-jour-pur-CveTBCpc.js","assets/ChiffreDesPrestations-2XvjZrNd.js","assets/classement-C9Ow9DY_.js","assets/Classement-CmpbQZDu.css","assets/Classement-D0o3Kt7j.js","assets/classement-pur-CQOYU06l.js","assets/client-B9OlnFkg.js","assets/cloture-du-jour-C2A36uhB.js","assets/ClotureDuTiroir-PSdYaiFd.js","assets/Coffre-041eCVJP.js","assets/collecte-mtn-pur-BKoFYpbn.js","assets/components-DlglYCid.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-B8g1FthJ.js","assets/Comptes-DfrohCYM.js","assets/consultation-Beaiww0_.js","assets/consultation-CRW6QcWf.css","assets/Consultations-B8z4zoHH.js","assets/Consultations-DiE-2_mG.css","assets/consultNotes-CXDCXTQt.js","assets/Conversations-D4WwB5Zo.css","assets/Conversations-DVQtL3hC.js","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-DaactwJ4.js","assets/currency-Cd0clE4P.js","assets/Customers-gLZTLe_e.js","assets/Dashboard-B2x7VsE_.css","assets/Dashboard-CwFjkFVn.js","assets/dates-DYpvksKS.js","assets/DemanderAPerle-D2AJqP9n.css","assets/DemanderAPerle-hU8Vhlhz.js","assets/Demandes-BHrreelt.js","assets/DepenseEnUnePhrase-BIGRlGqP.css","assets/DepenseEnUnePhrase-CWI25elU.js","assets/Depenses-BHf2ZaQr.js","assets/depenses-saisie-BcE2rtnU.js","assets/devis-remis-BXEV2pSL.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-AGsBKvMR.js","assets/diagnostics-au-trone-Bkrhjjyl.js","assets/Dictee-Bb7o4-Ne.js","assets/Dictee-C-pUYYFA.css","assets/dictee-pur-BCdwppiu.js","assets/Discussions-lOFgL46i.js","assets/echappe-html-pur-gEhHOM07.js","assets/EditeurDesOffres-QtLm9ww1.js","assets/Encaissements-DPz_2DXR.js","assets/enfants-CPLP6_Mm.js","assets/Engagements-CGw4inF4.js","assets/Engagements-Cj5S9MhG.css","assets/engagements-coffre-D_Akgehl.js","assets/EntreDeuxSeances-C4sgm_aB.js","assets/es-9Fkcu_k4.js","assets/Evaluation-CxSGcDAW.js","assets/facture-C_WdtSX7.js","assets/Factures-BiuICOKa.js","assets/FenetreDeLAgent-CS9Mc0R1.js","assets/FenetreDesCivilites-DZfWRrgC.js","assets/FenetreDesCivilites-zfNk1aak.css","assets/FenetreDuPoint-D6WFnBiR.js","assets/Fil-AggeogRq.js","assets/finances-C8x7Mn4-.css","assets/fon-C3lhAhvU.js","assets/Fournisseurs-D-m-Zskp.js","assets/fournisseurs-D4xfEnQ5.js","assets/foyer-DfM7aME8.js","assets/Gerard-CiaNtwYg.js","assets/Gerard-DNxabQR6.css","assets/gerard-donnees-CG_zf_aG.js","assets/gestes-conversation-LZ8SKrR0.js","assets/heures-des-rappels-pur-BWJPB8OP.js","assets/HomeRituals-JDg-J03R.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-BJYhzHEL.js","assets/ia-centre-CDyGKwQK.js","assets/ia-diagnostic-pur-qGnFEvys.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-tableau-pur-p6UvREJe.js","assets/identite-DtlWV2e3.js","assets/index.es-CoKxZo0s.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-BykrdLyk.js","assets/jspdf.es.min-BJgjJ0Mz.js","assets/JustePrix-BOtvXNDV.js","assets/kkiapay-CwJwLaTF.js","assets/kkiapay-widget-CVmsl9OE.js","assets/Laboratoire-21ZRjytu.js","assets/LaJournee-Bn_G0HCt.css","assets/LaJournee-BydpibSA.js","assets/le-caissier-pur-4vMUM_cY.js","assets/LesPaiements-9g81Vjpk.js","assets/LesPaiements-C9cEZlne.css","assets/LettresAuDossier-CMQABs2Y.js","assets/LienMndPay-C0BnUqs3.js","assets/Marketing-sthgOHHJ.js","assets/MarketingBranche-KYYjeG-8.js","assets/Marque-DRkJFYcU.js","assets/MesPourboires-CENjelyb.css","assets/MesPourboires-ObkmqkWC.js","assets/MesTaches-Cc4XUDf6.css","assets/MesTaches-CkeBJPjP.js","assets/momo-C2ZVfV9J.js","assets/MonMois-CvCpB9KG.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/MtnMoMo-BdQ22TYo.js","assets/objectifs-BykRIfha.js","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/opale-BWhcTYpD.js","assets/oreille-B1AMUmZh.js","assets/paie-du-5-B2Wz0tvn.js","assets/paie-du-5-DeJq-K_U.css","assets/paie-du-5-pur-CPiCK8fv.js","assets/paie-par-mtn-SbGHYWE-.js","assets/PaieParMtn-DoiaVek0.js","assets/paliers-CRsddB2k.js","assets/Parametres-C5HU8OGx.js","assets/parcours-DUyc7dk-.js","assets/Parrainages-CRXi34uL.js","assets/Parrainages-gAHAPB_6.css","assets/PassageAvantLeFauteuil-CZQdQ4B9.js","assets/pdf-BdpCyjnc.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/periode-des-pourboires-pur-BUWqfwov.js","assets/Personas-BORVyzRO.js","assets/Personnel-DYb1DFOn.js","assets/photo-I6lWlr_u.js","assets/pilotage-D8kf1Co8.css","assets/porte-de-l-equipe-BGzr0aov.js","assets/Pourboires-D55olTQi.js","assets/Predictions-DuXcBtaa.js","assets/preload-helper-BRe_O-Rg.js","assets/Prestataires-hyU5f0oW.js","assets/Prets-IojgnSfk.js","assets/PrevisionDuMois-DiwkNAxN.js","assets/PrevisionDuMois-DlFTw3OX.css","assets/Previsions-9BU2Vg1T.css","assets/Previsions-NF5hsDXZ.js","assets/previsions-pur-DgPDx5Hk.js","assets/processus-pur-R6U5QcCi.js","assets/Projets-BaDrfkHF.js","assets/projets-BoJnMXur.js","assets/Projets-COO7WDEE.css","assets/projets-pur-2ZEMRNDU.js","assets/protocoles-D8FCygie.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-WAv0bTHa.js","assets/quiz-5qMPWZVi.js","assets/Rapport-BFxy-uiy.js","assets/Recommandations-BfpLvsuo.js","assets/regler-D1KltDUa.js","assets/regler-DHR_B1Dm.css","assets/regler-par-fedapay-pur-DYTDdXhs.js","assets/relances-pur-BacTXlI2.js","assets/releve-des-avis-1hzl3TL9.js","assets/SalonFoyer-BrqVOrrb.js","assets/secretariat-admin-FhQlPAMf.js","assets/Secretariat-B404oF9Y.js","assets/Secretariat-Cy79Zw30.css","assets/Signatures-Br36LfiI.js","assets/SignerUnPdf-BDdIaHyg.js","assets/Synthese-DIBqZ0Bl.js","assets/SyntheseGraphes-BYxTRBy_.js","assets/systeme-TPy-pF7j.css","assets/Tableau-C6RM-anT.js","assets/temps-D8l6n6iR.js","assets/Textes-DLpOzRbT.css","assets/Textes-DWdHoHgV.js","assets/tiroirs-CkDzpGy0.css","assets/tiroirs-DP8bVCyo.js","assets/trone-B-r6lpi2.css","assets/trone-BAoBdyws.js","assets/useAudiences-B_dtM1Ij.js","assets/useClotureDuJour-BUraroWS.js","assets/visios-CJVcm6eB.js","assets/Vitrine-BWilTqQJ.css","assets/Vitrine-Lr58EJkc.js","assets/_admin-CyPm39Ba.js","assets/_contrat-GH2d05hD.js","assets/_reuni-BlMRbuCZ.js","assets/_shared-CWWa9k1K.js","assets/_signature-vDMkokoo.js","assets/_ui-B-Mx0Sxg.js","assets/_ui-BrUDlmuM.css"];
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
