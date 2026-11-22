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
const BUILD = "20261122072156";
const A_GARDER = ["./","assets/Abonnements-DTY7p2DH.css","assets/abonnements-eKV5Jc-w.js","assets/Abonnements-TieXIyLX.js","assets/Academie-Dk1S4qUD.js","assets/Acces-D7Zgwvew.js","assets/AFaire-Da4F0aES.js","assets/afaire-on7kYf-p.js","assets/Agents-BRDz1K0F.js","assets/agents-donnees-D7eM1iWx.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-BHukeZQ1.js","assets/App-Bw4CJCqV.js","assets/Appels-CAjnGcnU.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/Assistants-CU5dx_vk.js","assets/Assistants-D9i2Xwmg.css","assets/AtelierDesContenus-CBYepNj4.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/Audience-C9YmZhdo.js","assets/Aujourdhui-Cu7lfTBN.js","assets/auth-CS42CShd.js","assets/avant-le-fauteuil-lecture-CCNqy_5f.js","assets/AvantLeFauteuil-DrP65eYZ.js","assets/avis-fiches-DP3qi5gh.js","assets/avis-google-pont-BzhZsMfS.js","assets/AvisGoogle-D79Be0mo.js","assets/AvisGoogle-DaPXfwX9.css","assets/BadgeEssai-BL0iu-GW.js","assets/BadgeSuggere-CKuRcfMJ.js","assets/besoins-B2tpkQF9.js","assets/BesoinsEtRegles-BLwxGVV5.css","assets/BesoinsEtRegles-NExzsXxp.js","assets/bilan-B-bfPYR0.css","assets/bilan-CR_RUoxi.js","assets/BilanMensuel-CNjqGqnm.js","assets/Branches-DK_3HHxp.js","assets/bridges-Bc8sOUQI.js","assets/Caisse-Cq51eSO8.js","assets/caisse-du-soir-C6vPx-E_.css","assets/caisse-du-soir-MiuGbpmn.js","assets/caisse-fluide-pur-CEsLrlCs.js","assets/Caisses-D0Eu4V4F.js","assets/Calendrier-BqYSJcR4.js","assets/campagnes-pur-DlGeNgus.js","assets/Carnet-DWVN48zN.js","assets/carte-CExzxy8P.js","assets/carte-_W_-xBPj.css","assets/CarteModal-DqiFcI_P.js","assets/CartesCadeaux-Dz_46ZFG.js","assets/Catalogue-BCDagsYV.js","assets/CentreDeCommande-CGeGfYVy.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-Cqlpg7bZ.js","assets/certificat-n9rjCqnV.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-Bgj2gidn.js","assets/chiffre-du-jour-pur-Dq5TSXyz.js","assets/ChiffreDesPrestations-DKNLKEsP.js","assets/Classement-CmpbQZDu.css","assets/Classement-DRgf91fM.js","assets/classement-gJLgKCZO.js","assets/classement-pur-CQOYU06l.js","assets/client-CawpzW1R.js","assets/cloture-du-jour-DcsdcgOS.js","assets/ClotureDuTiroir-euheWptS.js","assets/Coffre-BHX3f56L.js","assets/collecte-mtn-pur-DC6sUCcD.js","assets/components-BGHBPcYe.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-BRLvaJIu.js","assets/Comptes-LSjJxCIF.js","assets/consultation-CITRpeuk.js","assets/consultation-CRW6QcWf.css","assets/Consultations-DiE-2_mG.css","assets/Consultations-pLzxBjjF.js","assets/consultNotes-CJAhbz_K.js","assets/contexte-de-la-reponse-Bqim4sXZ.js","assets/Conversations-BP2siJT9.js","assets/Conversations-D4WwB5Zo.css","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-CzstAV55.js","assets/currency-Cd0clE4P.js","assets/Customers-DnxtWKae.js","assets/Dashboard-B2x7VsE_.css","assets/Dashboard-Ck4V_9Xp.js","assets/dates-BZXZeCFF.js","assets/DemanderAPerle-BD5NgCRN.css","assets/DemanderAPerle-COHFwAe1.js","assets/Demandes-BqFdxn6X.js","assets/DepenseEnUnePhrase-BIGRlGqP.css","assets/DepenseEnUnePhrase-DfxMm1Ma.js","assets/Depenses-DQ_hVclZ.js","assets/depenses-saisie-1U6vDmqy.js","assets/devis-remis-BL7xJWw9.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-DspShu7Q.js","assets/diagnostics-au-trone-Babh_b0-.js","assets/Dictee-C-pUYYFA.css","assets/Dictee-Dq1hoTkr.js","assets/dictee-pur-BfTHkORw.js","assets/Discussions-B9pY7zZn.js","assets/echappe-html-pur-gEhHOM07.js","assets/EditeurDesOffres-j-Qpo1uA.js","assets/Encaissements-t2affhhU.js","assets/enfants-DKa__vOx.js","assets/Engagements-Cj5S9MhG.css","assets/engagements-coffre-D1PiJLQf.js","assets/Engagements-w-bD4xMV.js","assets/EntreDeuxSeances-CRsau23G.js","assets/es-DpMIi3rN.js","assets/Evaluation-BHLffyGp.js","assets/facture-uz5TN5zo.js","assets/Factures-B4PZT9pC.js","assets/FenetreDeLAgent-DrXq_HoX.js","assets/FenetreDesCivilites-DcTQ8R9w.js","assets/FenetreDesCivilites-zfNk1aak.css","assets/FenetreDuPoint-C5rpRo_d.js","assets/Fil-CC1Mbwmh.js","assets/finances-C8x7Mn4-.css","assets/fon-CnFIu_1E.js","assets/Fournisseurs-CARvNfFE.js","assets/fournisseurs-D5ps7xms.js","assets/foyer-C7wCHFra.js","assets/gerard-donnees-CxIAqM-5.js","assets/Gerard-lGKehvgG.css","assets/Gerard-TklCGWHz.js","assets/gestes-conversation-C4y9CJfR.js","assets/heures-des-rappels-pur-BWJPB8OP.js","assets/HomeRituals-CyBrkggU.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-D5qtMefV.js","assets/ia-centre-CO_YhBAR.js","assets/ia-diagnostic-pur-qGnFEvys.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-tableau-pur-p6UvREJe.js","assets/identite-CnB7EWy3.js","assets/index.es-CkSuwVhu.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-BBZZZGy1.js","assets/jspdf.es.min-pITLh11a.js","assets/JustePrix-Ch3huS5z.js","assets/kkiapay-Ss_wboXi.js","assets/kkiapay-widget-CVmsl9OE.js","assets/Laboratoire-BFze4ci4.js","assets/LaJournee-Bn_G0HCt.css","assets/LaJournee-DB0tMzkZ.js","assets/le-caissier-pur-DXHAh7aO.js","assets/LePoint-B_NPQo90.js","assets/LePoint-CBjCCMQ5.css","assets/LesPaiements-C9cEZlne.css","assets/LesPaiements-DsTK_iA-.js","assets/LettresAuDossier-BLJvk308.js","assets/LienMndPay-D-wrd0m3.js","assets/Marketing-8Tc_udpA.js","assets/MarketingBranche-Cu1QUGf2.js","assets/Marque-D6yJvjkg.js","assets/MesPourboires-CENjelyb.css","assets/MesPourboires-DIZBlrji.js","assets/MesTaches-BQz5Xx75.js","assets/MesTaches-Cc4XUDf6.css","assets/momo-C2ZVfV9J.js","assets/MonMois-B6toEIJ-.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/MtnMoMo-BcBrdroe.js","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/objectifs-DMP5XmSA.js","assets/opale-DPpEwPYl.js","assets/oreille-B1AMUmZh.js","assets/paie-du-5-CvNNzoRw.js","assets/paie-du-5-DeJq-K_U.css","assets/paie-du-5-pur-CPiCK8fv.js","assets/paie-par-mtn-CkivFjsI.js","assets/PaieParMtn-CBKbbEnI.js","assets/paliers-BE-ZCUXB.js","assets/Parametres-Dt1pMCqz.js","assets/parcours-4T9tFBq_.js","assets/Parrainages-BcjS4dJo.js","assets/Parrainages-gAHAPB_6.css","assets/PassageAvantLeFauteuil-CE4p2sNZ.js","assets/pdf-P7nj3Cxm.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/periode-des-pourboires-pur-BUWqfwov.js","assets/Personas-BU5oSFCh.js","assets/Personnel-BpPMf5gn.js","assets/photo-CoW1EVIh.js","assets/pilotage-D8kf1Co8.css","assets/porte-de-l-equipe-CIe2htEY.js","assets/Pourboires-DSF0tRXk.js","assets/Predictions-D1egk7u0.js","assets/preload-helper-BRe_O-Rg.js","assets/Prestataires-UXVH9rIJ.js","assets/Prets-CRVFig7S.js","assets/PrevisionDuMois-DlFTw3OX.css","assets/PrevisionDuMois-Vgd1nTp_.js","assets/Previsions-9BU2Vg1T.css","assets/Previsions-BcQfI95E.js","assets/previsions-pur-CBACoe9j.js","assets/processus-pur-R6U5QcCi.js","assets/Projets-COO7WDEE.css","assets/projets-CqmJpxGR.js","assets/Projets-DQ-QT3qg.js","assets/projets-pur-2ZEMRNDU.js","assets/protocoles-cDn4TtFe.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-JeAbVI-X.js","assets/quiz-5qMPWZVi.js","assets/Rapport-ClrbQc5x.js","assets/Recommandations-D0tAGc2Y.js","assets/regler-DHR_B1Dm.css","assets/regler-par-fedapay-pur-BDp3ZNKc.js","assets/regler-yHFNcLn9.js","assets/relances-pur-C9iUwl2e.js","assets/releve-des-avis-xy6PCzn8.js","assets/SalonFoyer-B2MNsci1.js","assets/secretariat-admin-CqBqIucd.js","assets/Secretariat-Cy79Zw30.css","assets/Secretariat-KfP89GdI.js","assets/Signatures-isqrgrYu.js","assets/SignerUnPdf-DGwQIgQS.js","assets/Synthese-CTEs4Xkw.js","assets/SyntheseGraphes-CPkax53z.js","assets/systeme-TPy-pF7j.css","assets/Tableau-E4ycLFPp.js","assets/temps-DXHC9HWA.js","assets/Textes-DenenQZL.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-CkDzpGy0.css","assets/tiroirs-iu-f7D0c.js","assets/trone-B-r6lpi2.css","assets/trone-D_aaDXXO.js","assets/useAudiences-CMokecEC.js","assets/useClotureDuJour-C6iUF-WL.js","assets/visios-SFaoBBpc.js","assets/Vitrine-BO9S4as0.js","assets/Vitrine-BWilTqQJ.css","assets/_admin-BEyXlf6K.js","assets/_contrat-B54DnPnb.js","assets/_reuni-HSuxonnn.js","assets/_shared-DVecgVcY.js","assets/_signature-CmgTtTqK.js","assets/_ui-B4nfCvj9.js","assets/_ui-BrUDlmuM.css"];
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
