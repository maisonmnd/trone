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
const BUILD = "20261120214151";
const A_GARDER = ["./","assets/Abonnements-Db87jEPW.js","assets/abonnements-DC9r8GCK.js","assets/Abonnements-DTY7p2DH.css","assets/Academie-CMlZUJMK.js","assets/Acces-HxAuBIcH.js","assets/afaire-D10i3Z3u.js","assets/AFaire-mjBdsEXb.js","assets/Agents-DcXtOGVh.js","assets/agents-donnees-BA4t0rEx.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-Dv_BtCmD.js","assets/App-Dc7rRrdg.js","assets/Appels-g0XNKfAx.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/Assistants-BCPXg33g.js","assets/Assistants-D9i2Xwmg.css","assets/AtelierDesContenus-CaWpeBpd.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/Audience-1HhMRSvp.js","assets/Aujourdhui-C06Zf1_m.js","assets/auth-DCTeiRxK.js","assets/avant-le-fauteuil-lecture-Dut_BNbA.js","assets/AvantLeFauteuil-zBstyYzz.js","assets/avis-fiches-AngBhWCC.js","assets/AvisGoogle-DaPXfwX9.css","assets/AvisGoogle-DoP8jGUO.js","assets/BadgeEssai-DvA3OOSp.js","assets/BadgeSuggere-D3k7UWvX.js","assets/besoins-Dr-WDkrM.js","assets/BesoinsEtRegles-BLwxGVV5.css","assets/BesoinsEtRegles-CEzqTqyp.js","assets/bilan-B-bfPYR0.css","assets/bilan-DhnYhmKM.js","assets/BilanMensuel-DEAbheaU.js","assets/Branches-DQb-AT_3.js","assets/bridges-CSQgBG82.js","assets/Caisse-B53EWfQq.js","assets/caisse-du-soir-BjlOCNNq.js","assets/caisse-du-soir-C6vPx-E_.css","assets/Caisses-ICLxMScE.js","assets/Calendrier-BiKe2Lc9.js","assets/campagnes-pur-D7Pdng4a.js","assets/Carnet-DboQyG77.js","assets/carte-BzZYW3fd.js","assets/carte-_W_-xBPj.css","assets/CarteModal-BZLtzV4L.js","assets/CartesCadeaux-UjsTlJjw.js","assets/Catalogue-jLb4qLcS.js","assets/CentreDeCommande-DSl_sazg.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-LKyh_hQA.js","assets/certificat-TjgpY7Vb.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-CGApHDFN.js","assets/chiffre-du-jour-pur-BMQ08BFO.js","assets/ChiffreDesPrestations-UdXgbXFM.js","assets/Classement-CmpbQZDu.css","assets/Classement-DaW6GF5q.js","assets/classement-pur-CQOYU06l.js","assets/client-Cbj6u0MQ.js","assets/cloture-du-jour-C7CygYCD.js","assets/ClotureDuTiroir-D8WRS4X0.js","assets/Coffre-BW1GD5In.js","assets/collecte-mtn-pur-Bq3uWgWT.js","assets/components-Cb5pmlYU.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-DNHK2bl9.js","assets/Comptes-eMVGOq5O.js","assets/consultation-CbjcpaYn.js","assets/consultation-CRW6QcWf.css","assets/Consultations--sePJfAy.js","assets/Consultations-DiE-2_mG.css","assets/consultNotes-DaPDtn36.js","assets/Conversations-1DYAkqWV.js","assets/Conversations-D4WwB5Zo.css","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-CZfiS0Sz.js","assets/currency-Cd0clE4P.js","assets/Customers-B3hngrPZ.js","assets/Dashboard-B2x7VsE_.css","assets/Dashboard-BKpbOfh2.js","assets/dates-COvblhIZ.js","assets/Demandes-DH9cUTnj.js","assets/DepenseEnUnePhrase-BIGRlGqP.css","assets/DepenseEnUnePhrase-DHjke2dy.js","assets/Depenses-Cq9hLfp7.js","assets/depenses-saisie-BLc2P4AR.js","assets/devis-remis-B1LNRoXV.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-M-ihVF7m.js","assets/diagnostics-au-trone-DJ5jc-qK.js","assets/Dictee-B5UNoiwV.js","assets/Dictee-C-pUYYFA.css","assets/dictee-pur-B8Xmf9tw.js","assets/Discussions-D21IUTFk.js","assets/echappe-html-pur-gEhHOM07.js","assets/EditeurDesOffres-3l0_x-RJ.js","assets/Encaissements-DhiCMiu6.js","assets/enfants-C1drD2AO.js","assets/Engagements-B06cSkKg.js","assets/Engagements-Cj5S9MhG.css","assets/engagements-coffre-DBGRhcXn.js","assets/EntreDeuxSeances-DphFUNj4.js","assets/es-ao83IOqE.js","assets/Evaluation-CU3nxLpt.js","assets/facture-GhY0PUSZ.js","assets/Factures-BMzESAh9.js","assets/FenetreDeLAgent-D68IOC0_.js","assets/FenetreDesCivilites-49tIv8do.js","assets/FenetreDesCivilites-zfNk1aak.css","assets/FenetreDuPoint-cMW0PPWK.js","assets/Fil-D7v-gVEs.js","assets/finances-C8x7Mn4-.css","assets/fon-Csv8Egpv.js","assets/fournisseurs-BVVAcegA.js","assets/Fournisseurs-DAAWwGod.js","assets/foyer-CZTqEsp4.js","assets/gerard-donnees-DH5rFnS8.js","assets/Gerard-kjWAJy4r.js","assets/Gerard-vo2IWvP3.css","assets/gestes-conversation-Da5TX9Eh.js","assets/heures-des-rappels-pur-BWJPB8OP.js","assets/HomeRituals-CGOrqjlp.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-DbHI5O9M.js","assets/ia-centre-DdD_aoAm.js","assets/ia-diagnostic-pur-qGnFEvys.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-tableau-pur-p6UvREJe.js","assets/identite-DL4Glm94.js","assets/index.es-Bl3UVMoI.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-DqxPFEsu.js","assets/jspdf.es.min-CUM7lTfA.js","assets/JustePrix-Ct6z6CAN.js","assets/kkiapay-CK-SmRZV.js","assets/kkiapay-widget-CVmsl9OE.js","assets/Laboratoire-H2wLSnCs.js","assets/LaJournee-Bn_G0HCt.css","assets/LaJournee-DWlcRmpw.js","assets/le-caissier-pur-BLL0zSV8.js","assets/LesPaiements-C9cEZlne.css","assets/LesPaiements-DQLclmVA.js","assets/LettresAuDossier-C20Mq7GS.js","assets/LienMndPay-CjlR3sXG.js","assets/Marketing-BcQsBIfA.js","assets/MarketingBranche-D_jtIhh1.js","assets/Marque-CIFN9LE4.js","assets/MesPourboires-CENjelyb.css","assets/MesPourboires-Cf1nFBLy.js","assets/MesTaches-Cc4XUDf6.css","assets/MesTaches-D_oRea9G.js","assets/momo-C2ZVfV9J.js","assets/MonMois-CSRE3_Uj.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/MtnMoMo-CS7Kx0dJ.js","assets/objectifs-8ARMkJhP.js","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/opale-_74tsg4t.js","assets/oreille-B1AMUmZh.js","assets/paie-du-5-7aSVGv8f.js","assets/paie-du-5-DeJq-K_U.css","assets/paie-du-5-pur-CPiCK8fv.js","assets/paie-par-mtn-F4rDpQIX.js","assets/PaieParMtn-RBoHdE9s.js","assets/paliers-CqU2QRs9.js","assets/Parametres-BRxhTec_.js","assets/parcours-McKn5Anw.js","assets/Parrainages-DIBnYBRN.js","assets/Parrainages-gAHAPB_6.css","assets/PassageAvantLeFauteuil-LrFECt9A.js","assets/pdf-DCqFT9dw.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/periode-des-pourboires-pur-BUWqfwov.js","assets/Personas-ZFpTPTCW.js","assets/Personnel-CW2afOO7.js","assets/photo-Dt3vDWyz.js","assets/pilotage-D8kf1Co8.css","assets/porte-de-l-equipe-D2whFU5-.js","assets/Pourboires-DcU3fQ4F.js","assets/Predictions-DoAYvY5T.js","assets/preload-helper-BRe_O-Rg.js","assets/Prestataires-8Ij2UNal.js","assets/Prets-9h37RJ9i.js","assets/PrevisionDuMois-DlFTw3OX.css","assets/PrevisionDuMois-DyVeUoBt.js","assets/Previsions-9BU2Vg1T.css","assets/Previsions-BnCWQT5_.js","assets/previsions-pur-3PDaVBW5.js","assets/processus-pur-R6U5QcCi.js","assets/Projets-COO7WDEE.css","assets/Projets-Cv3ykEEw.js","assets/projets-pur-2ZEMRNDU.js","assets/projets-u2jd6QiY.js","assets/protocoles-BnxtfSBU.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-CTYCdOJe.js","assets/quiz-5qMPWZVi.js","assets/Rapport-BvyMmp54.js","assets/Recommandations-CpEBN0Ms.js","assets/regler-c3ImKfJa.js","assets/regler-DHR_B1Dm.css","assets/regler-par-fedapay-pur-G8CEJdGn.js","assets/relances-pur-BacTXlI2.js","assets/releve-des-avis-UCwc8O_J.js","assets/SalonFoyer-Bz798It7.js","assets/secretariat-admin-BMzdtLz4.js","assets/Secretariat-BdDJ6LQS.js","assets/Secretariat-Cy79Zw30.css","assets/Signatures-DwowR8uc.js","assets/SignerUnPdf-DYskWPNm.js","assets/Synthese-BhxDZSoP.js","assets/SyntheseGraphes-Ds7UyGtj.js","assets/systeme-TPy-pF7j.css","assets/Tableau-BEuSg3Re.js","assets/temps-CQykvphO.js","assets/Textes-Clg_e8_s.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-CkDzpGy0.css","assets/tiroirs-DgdFeLoA.js","assets/trone-CWHVR5MR.js","assets/trone-Dqek9O2C.css","assets/useAudiences-VJViLbQC.js","assets/useClotureDuJour-CM6AhLXI.js","assets/visios-PtmaiTzn.js","assets/Vitrine-BBFYEnKt.js","assets/Vitrine-BWilTqQJ.css","assets/_admin-DAlM-WIZ.js","assets/_contrat-BhJmvKg5.js","assets/_reuni-sgtXRH_b.js","assets/_shared-Dw1KL4rN.js","assets/_signature-glPMO9Kb.js","assets/_ui-BrUDlmuM.css","assets/_ui-DKI1BtVg.js"];
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
