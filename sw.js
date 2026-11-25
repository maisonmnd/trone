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
const BUILD = "20261125091803";
const A_GARDER = ["./","assets/Abonnements-DTY7p2DH.css","assets/abonnements-DWSigNLj.js","assets/Abonnements-ojZOjnc6.js","assets/Academie-83hZuFaL.js","assets/Acces-9bhUqLSX.js","assets/afaire-BOjwHCtg.js","assets/AFaire-CxLA2I6c.js","assets/Agents-CT7ZBctl.js","assets/agents-donnees-DY48qLvp.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-DuLDC37W.js","assets/App-l-Hx_d_u.js","assets/Appels-Db1Wgf4C.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/Assistants-Bm4hX-sh.js","assets/Assistants-D9i2Xwmg.css","assets/AtelierDesContenus-D3-p6F2A.css","assets/AtelierDesContenus-DuqNfOAF.js","assets/Audience-UkI84xoG.js","assets/Aujourdhui-DQXI47yk.js","assets/auth-D9OZUEbr.js","assets/avant-le-fauteuil-lecture-Ci13pyRl.js","assets/AvantLeFauteuil-DxbUlhJC.js","assets/avis-fiches-8I1ZeB4z.js","assets/avis-google-pont-19RWe4hM.js","assets/AvisGoogle--V4eVnFg.js","assets/AvisGoogle-DaPXfwX9.css","assets/BadgeEssai-D6fBc_Ly.js","assets/BadgeSuggere-C9TWz0EY.js","assets/besoins-BRQ9TRD-.js","assets/BesoinsEtRegles-BLwxGVV5.css","assets/BesoinsEtRegles-C9c46t0d.js","assets/bilan-B-bfPYR0.css","assets/bilan-BIPTGoMn.js","assets/BilanMensuel-BeTT_d1L.js","assets/Branches-B1mwuQCl.js","assets/bridges-DZEfvoQQ.js","assets/Caisse-DDFQeGlU.js","assets/caisse-du-soir-C6vPx-E_.css","assets/caisse-du-soir-CKP4TcDw.js","assets/caisse-fluide-pur-DuBCf-qd.js","assets/Caisses-BioQlAcv.js","assets/Calendrier-CHrRChFF.js","assets/campagnes-pur-ChMChffI.js","assets/Carnet-C5V3apMO.js","assets/carte-CRM1yi-t.js","assets/carte-_W_-xBPj.css","assets/CarteModal-DTkzMReV.js","assets/CartesCadeaux-CbIIG62C.js","assets/Catalogue-D_UREBPo.js","assets/CentreDeCommande-BQVBPuh7.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-DOaobxNl.js","assets/certificat-COQHeD7R.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-Ds1HMHjM.js","assets/chiffre-du-jour-pur-ClSmKtYQ.js","assets/ChiffreDesPrestations-9QX58Nos.js","assets/Classement-BTCUOzVm.js","assets/Classement-CmpbQZDu.css","assets/classement-p-V7aHTo.js","assets/classement-pur-CQOYU06l.js","assets/client-KVhgJ8qN.js","assets/cloture-du-jour-EeGuCn4Z.js","assets/ClotureDuTiroir-nV4TlsFy.js","assets/Coffre-BedeXNbe.js","assets/components-C4fjc4d9.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-CaLynM4-.js","assets/Comptes-D8hOCJSh.js","assets/consultation-BNsOk9jr.js","assets/consultation-CRW6QcWf.css","assets/Consultations-DiE-2_mG.css","assets/Consultations-vRihgc6g.js","assets/consultNotes-DP_vIRWM.js","assets/contexte-de-la-reponse-REv8hsZX.js","assets/Conversations-D4WwB5Zo.css","assets/Conversations-DB6Z_HbO.js","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-DHQQYoLS.js","assets/currency-Cd0clE4P.js","assets/Customers-BcXFIgJy.js","assets/Dashboard-B2ldcnvV.js","assets/Dashboard-Cw5zWmQu.css","assets/dates-BEFRINpm.js","assets/DemanderAPerle-BD5NgCRN.css","assets/DemanderAPerle-Dua2_ptw.js","assets/Demandes-RYBOMDY4.js","assets/DepenseEnUnePhrase-BIGRlGqP.css","assets/DepenseEnUnePhrase-zWukAQXw.js","assets/Depenses-CQZvDkI2.js","assets/depenses-saisie-CT2oN4F1.js","assets/devis-CdIRAvZk.css","assets/devis-CtC0PG-K.js","assets/devis-remis-_2Sq6A-N.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-CW7PMrfc.js","assets/diagnostics-au-trone-CVFoMooG.js","assets/Dictee-C-pUYYFA.css","assets/Dictee-kVsiX7dl.js","assets/dictee-pur-CwvLBEfG.js","assets/Discussions-nbEkBZlz.js","assets/dist-9vv0te18.js","assets/echappe-html-pur-gEhHOM07.js","assets/EditeurDesOffres-DUQ07Vwc.js","assets/Encaissements-CAB6McyY.js","assets/EnDirect-CqsVJZ78.js","assets/enfants-Cf14BkD1.js","assets/Engagements-BmEZuC61.js","assets/Engagements-Cj5S9MhG.css","assets/engagements-coffre-Bo2rDegz.js","assets/EntreDeuxSeances-CN8D5OHa.js","assets/es-C1p7pNbA.js","assets/etoiles-pur-CgRPMSHm.js","assets/Evaluation-DnmDYm6E.js","assets/facture-Bp28d04f.js","assets/Factures-C1hiOIKt.js","assets/FenetreDeLAgent-GvfxoNnQ.js","assets/FenetreDesCivilites-CLvp5t90.js","assets/FenetreDesCivilites-zfNk1aak.css","assets/FenetreDuPoint-D5wTjiwc.js","assets/Fil-CTdsfbBG.js","assets/finances-C8x7Mn4-.css","assets/fon-C9BoT_8d.js","assets/fournisseurs-Bwene984.js","assets/Fournisseurs-C6FVJ8So.js","assets/foyer-PpaGqUNR.js","assets/Gerard-CPCcSkv9.js","assets/gerard-donnees-DGR0elrf.js","assets/Gerard-lGKehvgG.css","assets/gestes-conversation-Dyqhst8w.js","assets/heures-des-rappels-pur-BWJPB8OP.js","assets/HomeRituals-6IqmiYlz.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-D8TBQ38g.js","assets/ia-centre-CQCn9otn.js","assets/ia-diagnostic-pur-qGnFEvys.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-tableau-pur-p6UvREJe.js","assets/identite-CVoPGxwM.js","assets/index.es-DlhQJ8yc.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-CV-1vDVl.js","assets/jspdf.es.min-CeVnvmjV.js","assets/JustePrix-BnQmwwMT.js","assets/kkiapay-be_lKL61.js","assets/kkiapay-widget-CaHBoBVm.js","assets/Laboratoire-DFAUl7ar.js","assets/LaJournee-Bn_G0HCt.css","assets/LaJournee-DWrD3hx1.js","assets/le-caissier-pur-Byn2QHLc.js","assets/le-sceau-pur-Dv-IZ_M2.js","assets/LePoint-5uRzcMYl.js","assets/LePoint-B_HurXA0.css","assets/LesPaiements-BiWsyUcZ.js","assets/LesPaiements-C9cEZlne.css","assets/LettresAuDossier-CS1Gm4_j.js","assets/LienMndPay-DOPdH3RG.js","assets/Marketing-CNwM_P-q.js","assets/MarketingBranche-voNY6Pnz.js","assets/Marque-djOwUThS.js","assets/MesPourboires-CCKN9xkv.js","assets/MesPourboires-CENjelyb.css","assets/MesTaches-Cc4XUDf6.css","assets/MesTaches-CjiMLrAu.js","assets/mnd-pay-pur-CfS2mkAo.js","assets/momo-C2ZVfV9J.js","assets/MonMois-C6ISYaR6.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/MtnMoMo-k6YhI7zU.js","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/objectifs-DtZnESI9.js","assets/opale-DJmfSHyj.js","assets/oreille-B1AMUmZh.js","assets/paie-du-5-DeJq-K_U.css","assets/paie-du-5-JiPgaMEs.js","assets/paie-du-5-pur-CPiCK8fv.js","assets/paie-par-mtn-BJDDQ6bY.js","assets/PaieParMtn-Byp8PEXg.js","assets/paliers-DgFSRxXA.js","assets/Parametres-B4JkzUYK.js","assets/parcours-DvveDrd9.js","assets/Parrainages-DOEE9Q8a.js","assets/Parrainages-gAHAPB_6.css","assets/PassageAvantLeFauteuil-D6A5ItS1.js","assets/pdf-CZQPN5sn.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/periode-des-pourboires-pur-BUWqfwov.js","assets/Personas-Dp1dARYl.js","assets/Personnel-B6TuYS3n.js","assets/photo-D81mZeAf.js","assets/pilotage-D8kf1Co8.css","assets/porte-de-l-equipe-DiSzQj_X.js","assets/Pourboires-g6PxzEeu.js","assets/Predictions-DIirut8Q.js","assets/preload-helper-BRe_O-Rg.js","assets/Prestataires-CZIr9HPQ.js","assets/Prets-D13LP_Ey.js","assets/PrevisionDuMois-BcnuGCQG.js","assets/PrevisionDuMois-DlFTw3OX.css","assets/Previsions-9BU2Vg1T.css","assets/Previsions-CubwVxG6.js","assets/previsions-pur-CoyVa67Y.js","assets/processus-pur-R6U5QcCi.js","assets/projets-C20AHcmp.js","assets/Projets-COO7WDEE.css","assets/Projets-Dium7VFT.js","assets/projets-pur-2ZEMRNDU.js","assets/protocoles-DXWQgbWl.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-s3cx6YW1.js","assets/quiz-5qMPWZVi.js","assets/Rapport-DCd63OQO.js","assets/Recommandations-BK4hjO6n.js","assets/regler-CHlg_Y6k.js","assets/regler-D1gFEaVz.css","assets/regler-par-fedapay-pur-DP7zXAs5.js","assets/relances-pur-C9iUwl2e.js","assets/releve-des-avis-Bt8EQxw2.js","assets/SalonFoyer-B90wDuZl.js","assets/sceau-CejLW0Wj.js","assets/secretariat-admin-C--8uqZ9.js","assets/Secretariat-CaV2-cyI.js","assets/Secretariat-Cy79Zw30.css","assets/Signatures-ByCUx08m.js","assets/SignerUnPdf-BCBZ9MpE.js","assets/Synthese-BLpx4g9d.js","assets/SyntheseGraphes-D9fXngCo.js","assets/systeme-TPy-pF7j.css","assets/Tableau-NFFwDLhZ.js","assets/temps-CRGk0xwR.js","assets/Textes-D1uNxwag.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-CkDzpGy0.css","assets/tiroirs-DIdj5px4.js","assets/trone-5eHZDGyE.js","assets/trone-C-lpcLUc.css","assets/useAudiences-BaeSArUQ.js","assets/useClotureDuJour-DN3FUaWm.js","assets/visios-C0e9NHjH.js","assets/Vitrine-BWilTqQJ.css","assets/Vitrine-C30PpA_k.js","assets/_admin-DpPw9lCF.js","assets/_contrat-CgGtldQb.js","assets/_reuni-Cu5I-jC6.js","assets/_shared-DQ3ruskF.js","assets/_signature-DYyprDEL.js","assets/_ui-BrUDlmuM.css","assets/_ui-G3Q5yKK4.js"];
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
