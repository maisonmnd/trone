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
const BUILD = "20261121064405";
const A_GARDER = ["./","assets/Abonnements-BDCOZP18.js","assets/abonnements-Cx0LK4ku.js","assets/Abonnements-DTY7p2DH.css","assets/Academie-CZ9MvzAg.js","assets/Acces-CF7E9brZ.js","assets/AFaire-D0gELKy6.js","assets/afaire-PJ_OhkXw.js","assets/Agents-BtCdniGr.js","assets/agents-donnees-DK722GKK.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-DvAobF7K.js","assets/App-Tt_7CSh1.js","assets/Appels-BQXnm1sb.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/Assistants-C95CJUBH.js","assets/Assistants-D9i2Xwmg.css","assets/AtelierDesContenus-D3-p6F2A.css","assets/AtelierDesContenus-D3btngle.js","assets/Audience-B3_-wXC4.js","assets/Aujourdhui-D68kl089.js","assets/auth-DzZNzjL6.js","assets/avant-le-fauteuil-lecture-BnFe5El8.js","assets/AvantLeFauteuil-r6N6P3ZB.js","assets/avis-fiches-DItdFJtV.js","assets/AvisGoogle-CQ2KIHha.js","assets/AvisGoogle-DaPXfwX9.css","assets/BadgeEssai-CVStNs63.js","assets/BadgeSuggere-oE5WaMik.js","assets/besoins-DZOxBsge.js","assets/BesoinsEtRegles-BLwxGVV5.css","assets/BesoinsEtRegles-C1fGlADV.js","assets/bilan-B-bfPYR0.css","assets/bilan-MBA76zbq.js","assets/BilanMensuel-Cs13_uSb.js","assets/Branches-Bm7X5xfH.js","assets/bridges-BBmIx10u.js","assets/caisse-du-soir-Bkp-oCjH.js","assets/caisse-du-soir-C6vPx-E_.css","assets/caisse-fluide-pur-CvZBYQAS.js","assets/Caisse-GKf9_r7E.js","assets/Caisses-Bj_pmgMR.js","assets/Calendrier-BoyS0T7F.js","assets/campagnes-pur-BLbfPACf.js","assets/Carnet-CrtcYrRF.js","assets/carte-D5hMG-qM.js","assets/carte-_W_-xBPj.css","assets/CarteModal-k1O0IQx7.js","assets/CartesCadeaux-BRbOtfxd.js","assets/Catalogue-BRmHY3uy.js","assets/CentreDeCommande-BZCQX83B.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-CFleFbxH.js","assets/certificat-DgDJ07tL.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-De5M3CEW.js","assets/chiffre-du-jour-pur-Yru-A8pY.js","assets/ChiffreDesPrestations-e9qtLjLM.js","assets/Classement-C0lQX7T6.js","assets/Classement-CmpbQZDu.css","assets/classement-DTDBOoaC.js","assets/classement-pur-CQOYU06l.js","assets/client-c8Nay-4F.js","assets/cloture-du-jour-DLE3iUUV.js","assets/ClotureDuTiroir-DmkkCtlY.js","assets/Coffre-C6iHHGTy.js","assets/collecte-mtn-pur-BKoFYpbn.js","assets/components-DIR94Unk.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-ZLN2RdaO.js","assets/Comptes-Dc-3Nx0v.js","assets/consultation-CRW6QcWf.css","assets/consultation-De0fP3tv.js","assets/Consultations-BDCg5Pbe.js","assets/Consultations-DiE-2_mG.css","assets/consultNotes-DbH4vSmf.js","assets/Conversations-D4WwB5Zo.css","assets/Conversations-vYZ-oNjo.js","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-DIRVx--2.js","assets/currency-Cd0clE4P.js","assets/Customers-BcXBLCs3.js","assets/Dashboard-B2x7VsE_.css","assets/Dashboard-g1P6i_CZ.js","assets/dates-DBtm1S-z.js","assets/DemanderAPerle-bmBPJH-T.css","assets/DemanderAPerle-XLbErPzq.js","assets/Demandes-DHEh_ptS.js","assets/DepenseEnUnePhrase-BIGRlGqP.css","assets/DepenseEnUnePhrase-DRipbwWI.js","assets/Depenses-DPUWZTIt.js","assets/depenses-saisie-a2Cm8PP-.js","assets/devis-remis-CT4nA1rQ.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-CUujrTpz.js","assets/diagnostics-au-trone-CpwySpo3.js","assets/Dictee-C-pUYYFA.css","assets/Dictee-G0iCf1hL.js","assets/dictee-pur-BJ_-xtbx.js","assets/Discussions-DjmVEg94.js","assets/echappe-html-pur-gEhHOM07.js","assets/EditeurDesOffres-DbIWBgyJ.js","assets/Encaissements-Cba-tlYT.js","assets/enfants-CRfUDaOF.js","assets/Engagements-Cj5S9MhG.css","assets/engagements-coffre-Br3JdSXd.js","assets/Engagements-DQDy9fQ3.js","assets/EntreDeuxSeances-AUAJf_C3.js","assets/es-CesqonjX.js","assets/Evaluation-BfR79TDv.js","assets/facture-D195ZtTY.js","assets/Factures-DoSmqTvg.js","assets/FenetreDeLAgent-BizYoXwd.js","assets/FenetreDesCivilites-CdvX2u2E.js","assets/FenetreDesCivilites-zfNk1aak.css","assets/FenetreDuPoint-DBwWO_Pl.js","assets/Fil-DPkkhKLM.js","assets/finances-C8x7Mn4-.css","assets/fon-Bd7vRDtp.js","assets/Fournisseurs-1ZI9sSiw.js","assets/fournisseurs-Bp0sZyts.js","assets/foyer-DwM1eVKR.js","assets/Gerard-7pFYqFEl.js","assets/gerard-donnees-BFJk1BbN.js","assets/Gerard-vo2IWvP3.css","assets/gestes-conversation-BUXS7yIG.js","assets/heures-des-rappels-pur-BWJPB8OP.js","assets/HomeRituals-CcguRJXi.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-AEvGbNik.js","assets/ia-centre-ch9aqQ85.js","assets/ia-diagnostic-pur-qGnFEvys.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-tableau-pur-p6UvREJe.js","assets/identite-D6cV0v1v.js","assets/index.es-DAz4_E2Z.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-COD6qO7p.js","assets/jspdf.es.min-CNwh55FX.js","assets/JustePrix-D9y4eQdt.js","assets/kkiapay-CoU4iUPY.js","assets/kkiapay-widget-CVmsl9OE.js","assets/Laboratoire-DHZINt-x.js","assets/LaJournee-Bn_G0HCt.css","assets/LaJournee-ByOQURhR.js","assets/le-caissier-pur-De8JOuXw.js","assets/LesPaiements-C9cEZlne.css","assets/LesPaiements-CPNzjQ4U.js","assets/LettresAuDossier-CZQZjSEm.js","assets/LienMndPay-Bh9MZGDF.js","assets/Marketing-DL3z_jt3.js","assets/MarketingBranche-BK7KwdxL.js","assets/Marque-GvlK-Nhn.js","assets/MesPourboires-C12-1PtZ.js","assets/MesPourboires-CENjelyb.css","assets/MesTaches-BH-e5s_d.js","assets/MesTaches-Cc4XUDf6.css","assets/momo-C2ZVfV9J.js","assets/MonMois-BbPxAGef.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/MtnMoMo-CtLbz5tN.js","assets/objectifs-BVS0Enzj.js","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/opale-uWDEHvyq.js","assets/oreille-B1AMUmZh.js","assets/paie-du-5-BxxtkJQY.js","assets/paie-du-5-DeJq-K_U.css","assets/paie-du-5-pur-CPiCK8fv.js","assets/paie-par-mtn-DsmIzkE9.js","assets/PaieParMtn-Cb03idRD.js","assets/paliers-CXK6DVo7.js","assets/Parametres-DFki6Voz.js","assets/parcours-BLfd54v7.js","assets/Parrainages-BxhfdwO0.js","assets/Parrainages-gAHAPB_6.css","assets/PassageAvantLeFauteuil-DvHwrAAR.js","assets/pdf-VJcNm7C7.js","assets/pdf-_4lFsOz0.js","assets/pdf.worker.min-uNib_u9P.js","assets/periode-des-pourboires-pur-BUWqfwov.js","assets/Personas-RcyKzfCM.js","assets/Personnel-HMsQr903.js","assets/photo-DRWzA2Bp.js","assets/pilotage-D8kf1Co8.css","assets/porte-de-l-equipe-CPZiTok8.js","assets/Pourboires-CcKrlA-3.js","assets/Predictions-BARoJi4v.js","assets/preload-helper-BRe_O-Rg.js","assets/Prestataires-DVGdynh4.js","assets/Prets-DLYE_IBS.js","assets/PrevisionDuMois-DlFTw3OX.css","assets/PrevisionDuMois-DYFKIZC5.js","assets/Previsions-9BU2Vg1T.css","assets/Previsions-BbGfHdTi.js","assets/previsions-pur-1g-tJxRS.js","assets/processus-pur-R6U5QcCi.js","assets/Projets-B5ATJYHB.js","assets/Projets-COO7WDEE.css","assets/projets-D374UUqi.js","assets/projets-pur-2ZEMRNDU.js","assets/protocoles-DpFav8D3.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-DKOSRBM8.js","assets/quiz-5qMPWZVi.js","assets/Rapport-4pI7-Xp8.js","assets/Recommandations-DWpO4Trt.js","assets/regler-DCYRhy2d.js","assets/regler-DHR_B1Dm.css","assets/regler-par-fedapay-pur-DYTDdXhs.js","assets/relances-pur-BacTXlI2.js","assets/releve-des-avis-ATLGaH6d.js","assets/SalonFoyer-C_95wzQ3.js","assets/secretariat-admin-Dz7QEsyW.js","assets/Secretariat-Cy79Zw30.css","assets/Secretariat-DVJE_rYk.js","assets/Signatures-BqmYgyw9.js","assets/SignerUnPdf-DQjLArfe.js","assets/Synthese-eeiYzuY7.js","assets/SyntheseGraphes-BiBUtGeM.js","assets/systeme-TPy-pF7j.css","assets/Tableau-DxvaryTv.js","assets/temps-CIvA_n_F.js","assets/Textes-Dalj-f3B.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-CkDzpGy0.css","assets/tiroirs-qQC3pbDb.js","assets/trone-B-r6lpi2.css","assets/trone-CF1p5xeE.js","assets/useAudiences-Dw7bVzyD.js","assets/useClotureDuJour-ln8UnGYR.js","assets/visios-Dp07I8bH.js","assets/Vitrine-BUaGGzTK.js","assets/Vitrine-BWilTqQJ.css","assets/_admin-DQ9U9Ra3.js","assets/_contrat-UV07fGoC.js","assets/_reuni-BMutaN5-.js","assets/_shared-Bh9NBhCC.js","assets/_signature-D_k8esug.js","assets/_ui-BrUDlmuM.css","assets/_ui-DmFpalhS.js"];
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
