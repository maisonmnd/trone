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
const BUILD = "20261120154800";
const A_GARDER = ["./","assets/Abonnements-BryBzZqu.js","assets/Abonnements-DTY7p2DH.css","assets/abonnements-V3un6iL2.js","assets/Academie-D2_vtPgF.js","assets/Acces-BO05jR5e.js","assets/AFaire-CoD6sxVI.js","assets/afaire-KRZFzNLY.js","assets/Agents-DaUL-TTn.js","assets/agents-donnees-SGwzAKJr.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-CQ8IEUQ3.js","assets/App-CjshUEsd.js","assets/Appels-DRp11hau.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/Assistants-CZiz-8r3.js","assets/Assistants-D9i2Xwmg.css","assets/AtelierDesContenus-62ZrOoZA.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/Audience-DHuNYNcV.js","assets/Aujourdhui-CMkWZfI-.js","assets/auth-BwKKCkGU.js","assets/avant-le-fauteuil-lecture-CwKphsfc.js","assets/AvantLeFauteuil-Bm9Ylps9.js","assets/avis-fiches-Q1tcV_76.js","assets/AvisGoogle-BLBmBJF3.js","assets/AvisGoogle-DaPXfwX9.css","assets/BadgeEssai-B0WLTxA9.js","assets/BadgeSuggere-CegIlby7.js","assets/besoins-CLU5BXN3.js","assets/BesoinsEtRegles-BLwxGVV5.css","assets/BesoinsEtRegles-BSGTH-eo.js","assets/bilan-B-bfPYR0.css","assets/bilan-CDXYvgbA.js","assets/BilanMensuel-CZNWkdGl.js","assets/Branches-CLSjB9Vz.js","assets/bridges-DnhYNcPQ.js","assets/Caisse-DJqp1YxX.js","assets/caisse-du-soir-C6vPx-E_.css","assets/caisse-du-soir-CLPIlUCP.js","assets/Caisses-BNjKr6_A.js","assets/Calendrier-BHJwifn9.js","assets/campagnes-pur-CvR5k3nw.js","assets/Carnet-DGMPweTM.js","assets/carte-xxvOphx2.js","assets/carte-_W_-xBPj.css","assets/CarteModal-DRBvO23d.js","assets/CartesCadeaux-BgvTm0Dm.js","assets/Catalogue-D5xcXwzz.js","assets/CentreDeCommande--ug7r037.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-BcSlPI6E.js","assets/certificat-B1HvaX2Y.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-D3Y2mTK4.js","assets/chiffre-du-jour-pur-BZsqtzsq.js","assets/ChiffreDesPrestations-B02Z2rL3.js","assets/Classement-CmpbQZDu.css","assets/Classement-CUFpPNaK.js","assets/classement-pur-CQOYU06l.js","assets/client-B4P_fwWc.js","assets/cloture-du-jour-CWvZX6E2.js","assets/ClotureDuTiroir-tQrrTSHl.js","assets/Coffre-pFeq03UB.js","assets/collecte-mtn-pur-Bq3uWgWT.js","assets/components-CpI2DUpT.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-oOjecnmy.js","assets/Comptes-BAQHVXNM.js","assets/consultation-CRW6QcWf.css","assets/consultation-Sn3C95bv.js","assets/Consultations-CSKB-ocr.js","assets/Consultations-DiE-2_mG.css","assets/consultNotes-bIu_PzI4.js","assets/Conversations-CCpJh5yD.js","assets/Conversations-D4WwB5Zo.css","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-ChbORz6Y.js","assets/currency-Cd0clE4P.js","assets/Customers-BoYPNW-J.js","assets/Dashboard-B2x7VsE_.css","assets/Dashboard-CCJ0_Gsv.js","assets/dates-B5AfJ_Dg.js","assets/Demandes-Cb36OumV.js","assets/DepenseEnUnePhrase-BIGRlGqP.css","assets/DepenseEnUnePhrase-DGCS50h0.js","assets/depenses-saisie-DlqqNPq3.js","assets/Depenses-Yn0ME-Lp.js","assets/devis-remis-BLgh_fjn.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-CkGhY99M.js","assets/diagnostics-au-trone-Dp86ob8T.js","assets/Dictee-B-PAIc0W.js","assets/Dictee-C-pUYYFA.css","assets/dictee-pur-DUO_mA-E.js","assets/Discussions-CG7zpQRL.js","assets/echappe-html-pur-gEhHOM07.js","assets/EditeurDesOffres-DLcZzYcC.js","assets/Encaissements-BDUTb5g_.js","assets/enfants-CbVLqEL9.js","assets/Engagements-Cj5S9MhG.css","assets/engagements-coffre-DuYslzEo.js","assets/Engagements-z6OX5Emn.js","assets/EntreDeuxSeances-C-C6Z0J6.js","assets/es-DEkwMSNg.js","assets/Evaluation-rZ6NLwdh.js","assets/facture-BSAU4msy.js","assets/Factures-zIdXfEZW.js","assets/FenetreDeLAgent-Dw_PKPhI.js","assets/FenetreDesCivilites-W8E7W47E.js","assets/FenetreDesCivilites-zfNk1aak.css","assets/FenetreDuPoint-BYqrrugw.js","assets/Fil-DneQRWwK.js","assets/finances-C8x7Mn4-.css","assets/fon-Diub2bxH.js","assets/fournisseurs-Di820dmv.js","assets/Fournisseurs-xg1jP98y.js","assets/foyer-DpVWx_CU.js","assets/Gerard-C8DNSIxk.js","assets/gerard-donnees-CHb56PEk.js","assets/Gerard-vo2IWvP3.css","assets/gestes-conversation-vnyuNIna.js","assets/heures-des-rappels-pur-BWJPB8OP.js","assets/HomeRituals-XBIXdlZA.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-BKSILm_i.js","assets/ia-centre-DQlNLJpS.js","assets/ia-diagnostic-pur-qGnFEvys.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-tableau-pur-p6UvREJe.js","assets/identite-rB9eWku3.js","assets/index.es-CGI54uss.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-Bd-Zd5If.js","assets/jspdf.es.min-CsRcaIF3.js","assets/JustePrix-BSMYTU97.js","assets/kkiapay-BYLZceY3.js","assets/kkiapay-widget-CVmsl9OE.js","assets/Laboratoire-KER50S6B.js","assets/LaJournee-BCXafJHD.js","assets/LaJournee-Bn_G0HCt.css","assets/le-caissier-pur-DvMfprU6.js","assets/LesPaiements-C9cEZlne.css","assets/LesPaiements-DdIRwXlL.js","assets/LettresAuDossier-DxJJZVe_.js","assets/LienMndPay-CbK_BarC.js","assets/Marketing-BkP_eKu0.js","assets/MarketingBranche-CSW4p-NH.js","assets/Marque-71yv3biV.js","assets/MesPourboires-BNE_xbe6.js","assets/MesPourboires-CENjelyb.css","assets/MesTaches-Cc4XUDf6.css","assets/MesTaches-DJhnKcXR.js","assets/momo-C2ZVfV9J.js","assets/MonMois-B7IrzO4J.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/MtnMoMo-Co7sG4vE.js","assets/objectifs-CSPMogXD.js","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/opale-Cols3Ig3.js","assets/oreille-B1AMUmZh.js","assets/paie-du-5-BRb1nOOg.js","assets/paie-du-5-DeJq-K_U.css","assets/paie-du-5-pur-CPiCK8fv.js","assets/paie-par-mtn-DIXEadZi.js","assets/PaieParMtn-Mg3-mcoX.js","assets/paliers-Cx0DI727.js","assets/Parametres-DH9JPfZ7.js","assets/parcours-CgqbaGAj.js","assets/Parrainages-BDcf2yzl.js","assets/Parrainages-gAHAPB_6.css","assets/PassageAvantLeFauteuil-DtUqeYp9.js","assets/pdf-BAhIeMyG.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/periode-des-pourboires-pur-BUWqfwov.js","assets/Personas-CnRfvblH.js","assets/Personnel-CQzW0sNj.js","assets/photo-B0ozP6Xn.js","assets/pilotage-D8kf1Co8.css","assets/porte-de-l-equipe-CdvAxqHp.js","assets/Pourboires-BG6J_b-C.js","assets/Predictions-_RZ3fPZv.js","assets/preload-helper-BRe_O-Rg.js","assets/Prestataires-DHQM5A2-.js","assets/Prets-B3KKZgcJ.js","assets/PrevisionDuMois-B53ASC7K.js","assets/PrevisionDuMois-DlFTw3OX.css","assets/Previsions-9BU2Vg1T.css","assets/Previsions-BuTYG3PM.js","assets/previsions-pur-DMHaMbFh.js","assets/processus-pur-R6U5QcCi.js","assets/Projets-BU_YpDKL.js","assets/Projets-COO7WDEE.css","assets/projets-fAdQCf18.js","assets/projets-pur-2ZEMRNDU.js","assets/protocoles-BgU8wxtu.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-BPXtfZ-Q.js","assets/quiz-5qMPWZVi.js","assets/Rapport-8tnNbSdr.js","assets/Recommandations-CG9v9DVx.js","assets/regler-DHR_B1Dm.css","assets/regler-par-fedapay-pur-G8CEJdGn.js","assets/regler-XQmVVGxs.js","assets/relances-pur-BacTXlI2.js","assets/releve-des-avis-pPIkRg2c.js","assets/SalonFoyer-DWQmZpfS.js","assets/secretariat-admin-ftW3N47y.js","assets/Secretariat-CY5s70nP.js","assets/Secretariat-Cy79Zw30.css","assets/Signatures-Dbt6SnFf.js","assets/SignerUnPdf-B-fo62W4.js","assets/Synthese-BldFF6at.js","assets/SyntheseGraphes-NCHoDdtZ.js","assets/systeme-TPy-pF7j.css","assets/Tableau-CHhVa73-.js","assets/temps-BoGneln0.js","assets/Textes-Bs9dCBBf.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-CkDzpGy0.css","assets/tiroirs-gZ_FptvI.js","assets/trone-DjMF03Ai.css","assets/trone-QoFI5VfA.js","assets/useAudiences-7YddBMHv.js","assets/useClotureDuJour-boTZDVH1.js","assets/visios-CKql0lzH.js","assets/Vitrine-BWilTqQJ.css","assets/Vitrine-_LPL7z25.js","assets/_admin-8NpUI-r2.js","assets/_contrat-DroGhtv9.js","assets/_reuni-BGI3v7OD.js","assets/_shared-CDhNwaFX.js","assets/_signature-C2rAmg0S.js","assets/_ui-BrUDlmuM.css","assets/_ui-pQ7AKdqw.js"];
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
