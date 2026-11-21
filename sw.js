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
const BUILD = "20261121070736";
const A_GARDER = ["./","assets/Abonnements-DTY7p2DH.css","assets/Abonnements-DYD0hlDz.js","assets/abonnements-DzEN7t8_.js","assets/Academie-DdEWb4lj.js","assets/Acces-BQ9MwPc1.js","assets/AFaire-DkqIrm6s.js","assets/afaire-DxYn554y.js","assets/Agents-Bvj_RVfz.js","assets/agents-donnees-BEE-XARj.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-CP2I1z27.js","assets/App-Czm1_8Aa.js","assets/Appels-C6BfLLme.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/Assistants-CwJUTMUq.js","assets/Assistants-D9i2Xwmg.css","assets/AtelierDesContenus-D0GHYEdb.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/Audience-C_9NU4Nn.js","assets/Aujourdhui-B0qSXPmL.js","assets/auth-BUuK1vom.js","assets/avant-le-fauteuil-lecture-C95OF6SS.js","assets/AvantLeFauteuil-C6bcK7K8.js","assets/avis-fiches-BjazRzIx.js","assets/AvisGoogle-B7YvMr--.js","assets/AvisGoogle-DaPXfwX9.css","assets/BadgeEssai-BnyLfVuZ.js","assets/BadgeSuggere-Befkjch9.js","assets/besoins-8bJP0Uct.js","assets/BesoinsEtRegles-BLwxGVV5.css","assets/BesoinsEtRegles-D29YhCEP.js","assets/bilan-B-bfPYR0.css","assets/bilan-DxWGLTZs.js","assets/BilanMensuel-D00fae6r.js","assets/Branches-DYIwhojl.js","assets/bridges-BD902Xkk.js","assets/Caisse-DSBqVP9n.js","assets/caisse-du-soir-BkgJjI85.js","assets/caisse-du-soir-C6vPx-E_.css","assets/caisse-fluide-pur-gzXvnwyp.js","assets/Caisses-BKKELySH.js","assets/Calendrier-5lmFFFJM.js","assets/campagnes-pur-e-S6Molu.js","assets/Carnet-C9fp4-Km.js","assets/carte-C8d7XTlz.js","assets/carte-_W_-xBPj.css","assets/CarteModal-Dbc3P6fF.js","assets/CartesCadeaux-DeJqfR32.js","assets/Catalogue-DGLdxhDt.js","assets/CentreDeCommande-Du8kyJhp.css","assets/CentreDeCommande-DxAfi0if.js","assets/Cercle-BZI9KDqb.js","assets/certificat-5rQE6lzU.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-HdJV68zl.js","assets/chiffre-du-jour-pur-Dng6lb9y.js","assets/ChiffreDesPrestations-DJtgCGpF.js","assets/Classement-ByhZKAQJ.js","assets/classement-CiVMGXGm.js","assets/Classement-CmpbQZDu.css","assets/classement-pur-CQOYU06l.js","assets/client-BbdxTk8Z.js","assets/cloture-du-jour-DgDntAik.js","assets/ClotureDuTiroir-DoNwtsYl.js","assets/Coffre-BhdyBtgi.js","assets/collecte-mtn-pur-BKoFYpbn.js","assets/components-DSBiFVKM.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-4zR8dA1P.js","assets/Comptes-CBxKegxG.js","assets/consultation-CRW6QcWf.css","assets/consultation-GxvzAGd1.js","assets/Consultations-DiE-2_mG.css","assets/Consultations-nyohIhX2.js","assets/consultNotes-F_PNsBUB.js","assets/Conversations-CSgYDXQU.js","assets/Conversations-D4WwB5Zo.css","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-DLuHyDGJ.js","assets/currency-Cd0clE4P.js","assets/Customers-DFDyKv4Q.js","assets/Dashboard-B2x7VsE_.css","assets/Dashboard-CcIcM1mF.js","assets/dates-XfUgRO7I.js","assets/DemanderAPerle-bmBPJH-T.css","assets/DemanderAPerle-Oq9bfDTG.js","assets/Demandes-3D11IR3U.js","assets/DepenseEnUnePhrase-BIGRlGqP.css","assets/DepenseEnUnePhrase-CRT9tSJD.js","assets/Depenses-C9pYzQMF.js","assets/depenses-saisie-DaJ9xN93.js","assets/devis-remis-wrc1KUlK.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-mmM3pnB2.js","assets/diagnostics-au-trone-DGvn0s8t.js","assets/Dictee-C-pUYYFA.css","assets/Dictee-DjV2I3Fz.js","assets/dictee-pur-99AVFr2Z.js","assets/Discussions-DKgABME1.js","assets/echappe-html-pur-gEhHOM07.js","assets/EditeurDesOffres-B47Q3O2e.js","assets/Encaissements-dKgJnEpT.js","assets/enfants-DzFA30EL.js","assets/Engagements-Cj5S9MhG.css","assets/engagements-coffre-C7Ef_rQ6.js","assets/Engagements-DEC0QsA4.js","assets/EntreDeuxSeances-BO9R0Mq0.js","assets/es-C4Ukr8wz.js","assets/Evaluation-CBeFoSlK.js","assets/facture-1xrWd_zN.js","assets/Factures-DGwF7f3_.js","assets/FenetreDeLAgent-CG73Ts9h.js","assets/FenetreDesCivilites-CIpVAV0S.js","assets/FenetreDesCivilites-zfNk1aak.css","assets/FenetreDuPoint-DTGcVwZA.js","assets/Fil-I6S4lZEM.js","assets/finances-C8x7Mn4-.css","assets/fon-DYfDDLA4.js","assets/fournisseurs-CKxNjWMo.js","assets/Fournisseurs-DmgbGkUb.js","assets/foyer-bDARdEIm.js","assets/gerard-donnees-CP91yHVZ.js","assets/Gerard-Ku9uticY.js","assets/Gerard-vo2IWvP3.css","assets/gestes-conversation-B-rmcekB.js","assets/heures-des-rappels-pur-BWJPB8OP.js","assets/HomeRituals-CS7eWgl3.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-BLn7Pd6K.js","assets/ia-centre-D-DPPUfJ.js","assets/ia-diagnostic-pur-qGnFEvys.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-tableau-pur-p6UvREJe.js","assets/identite-Bc6AkOai.js","assets/index.es-BSuyuQeH.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-nyHfYrlS.js","assets/jspdf.es.min-C8olDfmm.js","assets/JustePrix-5JkweW1p.js","assets/kkiapay-FoMNiVsG.js","assets/kkiapay-widget-CVmsl9OE.js","assets/Laboratoire-KgTXThIx.js","assets/LaJournee-Bn_G0HCt.css","assets/LaJournee-DkZHk27T.js","assets/le-caissier-pur-INUUf4j-.js","assets/LesPaiements-C9cEZlne.css","assets/LesPaiements-OAbZwwvA.js","assets/LettresAuDossier-DVME1KKh.js","assets/LienMndPay-DcveFLxH.js","assets/Marketing-50B0Vsv0.js","assets/MarketingBranche-C3dJHDZo.js","assets/Marque-B5z2UYPv.js","assets/MesPourboires-BHDdv_38.js","assets/MesPourboires-CENjelyb.css","assets/MesTaches-Cc4XUDf6.css","assets/MesTaches-RaI3jC4Q.js","assets/momo-C2ZVfV9J.js","assets/MonMois-C57ACZ_-.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/MtnMoMo-BZucrpSa.js","assets/objectifs-Cenjhyr4.js","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/opale-kAvu3ZXf.js","assets/oreille-B1AMUmZh.js","assets/paie-du-5-DeJq-K_U.css","assets/paie-du-5-eY_pdF1t.js","assets/paie-du-5-pur-CPiCK8fv.js","assets/paie-par-mtn-Di6fkE6L.js","assets/PaieParMtn-BbNVl-vm.js","assets/paliers-DZQ9unC7.js","assets/Parametres-B5v4IXZH.js","assets/parcours-D5KUEhl3.js","assets/Parrainages-BuSlE-Jw.js","assets/Parrainages-gAHAPB_6.css","assets/PassageAvantLeFauteuil-CDxmBDBY.js","assets/pdf-mkkpNulT.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/periode-des-pourboires-pur-BUWqfwov.js","assets/Personas-DR66tkkV.js","assets/Personnel-Cu2v3vay.js","assets/photo-EtK86L4a.js","assets/pilotage-D8kf1Co8.css","assets/porte-de-l-equipe-8hxsIc3f.js","assets/Pourboires-DuNSgX-P.js","assets/Predictions-DM0D883z.js","assets/preload-helper-BRe_O-Rg.js","assets/Prestataires-B3dGgQlS.js","assets/Prets-BOZjx812.js","assets/PrevisionDuMois-DfqZ5HbX.js","assets/PrevisionDuMois-DlFTw3OX.css","assets/Previsions-9BU2Vg1T.css","assets/Previsions-C-_fYVqc.js","assets/previsions-pur-CgFI7suY.js","assets/processus-pur-R6U5QcCi.js","assets/Projets-Ban_7EiV.js","assets/projets-CFUBQreh.js","assets/Projets-COO7WDEE.css","assets/projets-pur-2ZEMRNDU.js","assets/protocoles-B5mxUPAp.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-CzeyXPbM.js","assets/quiz-5qMPWZVi.js","assets/Rapport-DRzcIg-r.js","assets/Recommandations-BP4gXXX3.js","assets/regler-D9BeTNTk.js","assets/regler-DHR_B1Dm.css","assets/regler-par-fedapay-pur-DYTDdXhs.js","assets/relances-pur-BacTXlI2.js","assets/releve-des-avis-CUV9ZSE6.js","assets/SalonFoyer-Cx5YCF63.js","assets/secretariat-admin-BS13-s2w.js","assets/Secretariat-BC0df4qm.js","assets/Secretariat-Cy79Zw30.css","assets/Signatures-Uvh8rhQZ.js","assets/SignerUnPdf-DbaTb7P2.js","assets/Synthese-hdKu4R_o.js","assets/SyntheseGraphes-DH9P6-wQ.js","assets/systeme-TPy-pF7j.css","assets/Tableau-COCORZnC.js","assets/temps-Cx9p9FTN.js","assets/Textes-CkaEURw3.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-CkDzpGy0.css","assets/tiroirs-CRF08DzU.js","assets/trone-B-r6lpi2.css","assets/trone-DGXLnwGv.js","assets/useAudiences-vRZVK7Hj.js","assets/useClotureDuJour-D5COFJ54.js","assets/visios-BwRNKiIE.js","assets/Vitrine-BWilTqQJ.css","assets/Vitrine-DgwtBVvI.js","assets/_admin-Ay3an1sV.js","assets/_contrat-BzUKE_Wt.js","assets/_reuni-BrLfDSjr.js","assets/_shared-DDrCILli.js","assets/_signature-DL_jYwj9.js","assets/_ui-BrUDlmuM.css","assets/_ui-cDIYbfLa.js"];
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
