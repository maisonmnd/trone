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
const BUILD = "20261120215518";
const A_GARDER = ["./","assets/abonnements-BvKL5oPp.js","assets/Abonnements-DTY7p2DH.css","assets/Abonnements-RVpg85qu.js","assets/Academie-CsknWDgl.js","assets/Acces-B07VfYUp.js","assets/AFaire-BdF4Z1N7.js","assets/afaire-CiYNtjYr.js","assets/Agents-dEqniAFl.js","assets/agents-donnees-Dzm76Duw.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-4uc5pt2h.js","assets/App-CrkEJCyT.js","assets/Appels-5217NmQm.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/Assistants-BzYH7GMq.js","assets/Assistants-D9i2Xwmg.css","assets/AtelierDesContenus-BEbEzvez.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/Audience-ftxxaSKC.js","assets/Aujourdhui-C2_dd4_0.js","assets/auth-CRO9edeO.js","assets/avant-le-fauteuil-lecture-g18ktSkv.js","assets/AvantLeFauteuil-DhrXRpSN.js","assets/avis-fiches-CdhxB2Y8.js","assets/AvisGoogle-COx8NkiS.js","assets/AvisGoogle-DaPXfwX9.css","assets/BadgeEssai-Af8LNvDO.js","assets/BadgeSuggere-CdJOjrHt.js","assets/besoins-D8eSUasZ.js","assets/BesoinsEtRegles-BLwxGVV5.css","assets/BesoinsEtRegles-D-61AUB4.js","assets/bilan-B-bfPYR0.css","assets/bilan-DznfcDz2.js","assets/BilanMensuel-1Mo6IIVc.js","assets/Branches-8Z-deSmC.js","assets/bridges-DFtUlFi5.js","assets/Caisse-D8ET3TH5.js","assets/caisse-du-soir-C6vPx-E_.css","assets/caisse-du-soir-CB18UIdH.js","assets/Caisses-DdatGTz-.js","assets/Calendrier-IfSaPj0R.js","assets/campagnes-pur-DLpKYd5Z.js","assets/Carnet-gc-DqV-0.js","assets/carte-Diw5uG-L.js","assets/carte-_W_-xBPj.css","assets/CarteModal-CMNpu4Zm.js","assets/CartesCadeaux-D4GbHQh1.js","assets/Catalogue-BOLpG3mA.js","assets/CentreDeCommande-BDveU1uR.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-B_m1ukSs.js","assets/certificat-DIFol05_.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-CqLknhZ7.js","assets/chiffre-du-jour-pur-D6ZduRAb.js","assets/ChiffreDesPrestations-C-Fy4Xep.js","assets/Classement-CmpbQZDu.css","assets/Classement-DFuMjv4P.js","assets/classement-pur-CQOYU06l.js","assets/client-CtjPXSvr.js","assets/cloture-du-jour-VvebcA34.js","assets/ClotureDuTiroir-DN0PlWv3.js","assets/Coffre-C0ulOgtW.js","assets/collecte-mtn-pur-Bq3uWgWT.js","assets/components-2jKqEL8X.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-Cs_jPHiY.js","assets/Comptes-LhacXWUr.js","assets/consultation-BAAhQpw2.js","assets/consultation-CRW6QcWf.css","assets/Consultations-4L5j3Rnu.js","assets/Consultations-DiE-2_mG.css","assets/consultNotes-CNCJ69Ob.js","assets/Conversations-D4WwB5Zo.css","assets/Conversations-DngijzuS.js","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-DX2zLUK4.js","assets/currency-Cd0clE4P.js","assets/Customers-B8hkeBow.js","assets/Dashboard-B2x7VsE_.css","assets/Dashboard-BexOprig.js","assets/dates-C3gcWbfu.js","assets/Demandes-mj_lwNR4.js","assets/DepenseEnUnePhrase-BIGRlGqP.css","assets/DepenseEnUnePhrase-O5Tz5Vx8.js","assets/Depenses-CSJruoxu.js","assets/depenses-saisie-D-4FkVyP.js","assets/devis-remis-BPXXQAwq.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-BIvKSmYv.js","assets/diagnostics-au-trone-Du-Kpsvl.js","assets/Dictee-C-pUYYFA.css","assets/Dictee-CUrFZtK5.js","assets/dictee-pur-L3SultX-.js","assets/Discussions-BYIkA3v3.js","assets/echappe-html-pur-gEhHOM07.js","assets/EditeurDesOffres-BmzWNdgK.js","assets/Encaissements-CbjJvZMT.js","assets/enfants-BvpVZIuX.js","assets/Engagements-Cj5S9MhG.css","assets/engagements-coffre-deNHgwZN.js","assets/Engagements-OHBGdaHj.js","assets/EntreDeuxSeances-BgQMMtj6.js","assets/es-AX3rlVK3.js","assets/Evaluation-DIkKtIS5.js","assets/facture-BHzKFCb4.js","assets/Factures-ClToacnf.js","assets/FenetreDeLAgent-p6Bi2l1p.js","assets/FenetreDesCivilites-CLmAgUVB.js","assets/FenetreDesCivilites-zfNk1aak.css","assets/FenetreDuPoint-ZFQ6kbNY.js","assets/Fil-DM43hWlo.js","assets/finances-C8x7Mn4-.css","assets/fon-BeS16FDC.js","assets/fournisseurs-CbYNXRhv.js","assets/Fournisseurs-CO9LICKw.js","assets/foyer-D7t6E_XF.js","assets/Gerard-CuYxwZsw.js","assets/gerard-donnees-C4uvAK_7.js","assets/Gerard-vo2IWvP3.css","assets/gestes-conversation-DI8irTQA.js","assets/heures-des-rappels-pur-BWJPB8OP.js","assets/HomeRituals-cfPOAipt.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-CspGUv81.js","assets/ia-centre-oNjYloYf.js","assets/ia-diagnostic-pur-qGnFEvys.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-tableau-pur-p6UvREJe.js","assets/identite-DRJ3cFKj.js","assets/index.es-w6aOD9tC.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-BFsG760n.js","assets/jspdf.es.min-C4Gp8byx.js","assets/JustePrix-CMdNqXnQ.js","assets/kkiapay-CU7SHZcX.js","assets/kkiapay-widget-CVmsl9OE.js","assets/Laboratoire-CSyRgUzV.js","assets/LaJournee-Bn_G0HCt.css","assets/LaJournee-sUrTcGTl.js","assets/le-caissier-pur-yJji6Kfh.js","assets/LesPaiements-C9cEZlne.css","assets/LesPaiements-CcTId6u2.js","assets/LettresAuDossier-B0rnfmMG.js","assets/LienMndPay-CZ8lQF9O.js","assets/Marketing-Cp0iF35Y.js","assets/MarketingBranche-BwjTCGCb.js","assets/Marque-Dgzsk_yg.js","assets/MesPourboires-BsDq8fsG.js","assets/MesPourboires-CENjelyb.css","assets/MesTaches-Cc4XUDf6.css","assets/MesTaches-pUDr5I6-.js","assets/momo-C2ZVfV9J.js","assets/MonMois-CuBcvdsB.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/MtnMoMo-DB5FOg6l.js","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/objectifs-Drb9IIDo.js","assets/opale-cTV7IhT4.js","assets/oreille-B1AMUmZh.js","assets/paie-du-5-bFjXH_5T.js","assets/paie-du-5-DeJq-K_U.css","assets/paie-du-5-pur-CPiCK8fv.js","assets/paie-par-mtn-CSTrmia3.js","assets/PaieParMtn-CBuzBvmX.js","assets/paliers-CbJW1-0l.js","assets/Parametres-Bq3egCL_.js","assets/parcours-BkywCEKF.js","assets/Parrainages-ChS8EAVb.js","assets/Parrainages-gAHAPB_6.css","assets/PassageAvantLeFauteuil-Cvm9rLDl.js","assets/pdf-l-7vf3LB.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/periode-des-pourboires-pur-BUWqfwov.js","assets/Personas-BTe--NhO.js","assets/Personnel-CQaJls2T.js","assets/photo-CloC5B-L.js","assets/pilotage-D8kf1Co8.css","assets/porte-de-l-equipe-CpT52SsP.js","assets/Pourboires-DTRdn3mR.js","assets/Predictions-z7PGBpsN.js","assets/preload-helper-BRe_O-Rg.js","assets/Prestataires-lQ_mzHvb.js","assets/Prets-Ccf73FY6.js","assets/PrevisionDuMois-BZb8XwJx.js","assets/PrevisionDuMois-DlFTw3OX.css","assets/Previsions-9BU2Vg1T.css","assets/Previsions-BsCvOCDv.js","assets/previsions-pur-DUWMM7t1.js","assets/processus-pur-R6U5QcCi.js","assets/Projets-BdldJrnC.js","assets/Projets-COO7WDEE.css","assets/projets-DhIVtejf.js","assets/projets-pur-2ZEMRNDU.js","assets/protocoles-Dj0-8MYE.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-DIyeCW8a.js","assets/quiz-5qMPWZVi.js","assets/Rapport-DbHFLmnx.js","assets/Recommandations-BZm24hHI.js","assets/regler-DHR_B1Dm.css","assets/regler-par-fedapay-pur-G8CEJdGn.js","assets/regler-tGRtSaG0.js","assets/relances-pur-BacTXlI2.js","assets/releve-des-avis-CFUY8Isb.js","assets/SalonFoyer-Ch0WXe4v.js","assets/secretariat-admin-CDwrfmcJ.js","assets/Secretariat-BNLeFM2M.js","assets/Secretariat-Cy79Zw30.css","assets/Signatures-CJv5v8aW.js","assets/SignerUnPdf-C1M2c81q.js","assets/Synthese-Bm_18KHW.js","assets/SyntheseGraphes-SpoeRdmf.js","assets/systeme-TPy-pF7j.css","assets/Tableau-D06QNB-m.js","assets/temps-ZZg31muW.js","assets/Textes-DLpOzRbT.css","assets/Textes-DuBtzlsL.js","assets/tiroirs-A1vcGWVv.js","assets/tiroirs-CkDzpGy0.css","assets/trone-Dqek9O2C.css","assets/trone-N8RQBHRD.js","assets/useAudiences-BEljoEjo.js","assets/useClotureDuJour-B2H0FKIz.js","assets/visios-BqjdyNga.js","assets/Vitrine-BWilTqQJ.css","assets/Vitrine-DiIGoX4F.js","assets/_admin-DNtrS1jj.js","assets/_contrat-DDFy3AqE.js","assets/_reuni-KrQe7yjU.js","assets/_shared-DG0cc8iI.js","assets/_signature-9oRZSh70.js","assets/_ui-BL5LPIdG.js","assets/_ui-BrUDlmuM.css"];
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
