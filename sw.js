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
const BUILD = "20261122213013";
const A_GARDER = ["./","assets/Abonnements-0gXoobR5.js","assets/abonnements-DIf5K2Kd.js","assets/Abonnements-DTY7p2DH.css","assets/Academie-BnAR5wNB.js","assets/Acces-BXauSo_W.js","assets/afaire-C8Z9ARRx.js","assets/AFaire-_oXjtui7.js","assets/agents-donnees-I0aHZ_Re.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Agents-SibqQsl0.js","assets/Analytics-s2DZ2NSo.js","assets/App-C5wt-pqk.js","assets/Appels-BEO1R1jt.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/Assistants-D8B_58yK.js","assets/Assistants-D9i2Xwmg.css","assets/AtelierDesContenus-B6A9x_9K.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/Audience-DmUOyPlQ.js","assets/Aujourdhui-DQiWNKG1.js","assets/auth-CzeovNUj.js","assets/avant-le-fauteuil-lecture-B6Cubf1i.js","assets/AvantLeFauteuil-D1LfrEb7.js","assets/avis-fiches-CwRxvmI-.js","assets/avis-google-pont-BWM9zJga.js","assets/AvisGoogle-DaPXfwX9.css","assets/AvisGoogle-DhDn6I16.js","assets/BadgeEssai-DR3I74pi.js","assets/BadgeSuggere-D-rcr7jU.js","assets/besoins-Dq9pDOOf.js","assets/BesoinsEtRegles-Ac9wdYLT.js","assets/BesoinsEtRegles-BLwxGVV5.css","assets/bilan-B-bfPYR0.css","assets/bilan-B5gT7QHg.js","assets/BilanMensuel-2s132Gf0.js","assets/Branches-Cd-ScYdN.js","assets/bridges-Cw56WTcI.js","assets/Caisse-BnUgdKvg.js","assets/caisse-du-soir-BMl8WHJx.js","assets/caisse-du-soir-C6vPx-E_.css","assets/caisse-fluide-pur-Cl_INu2m.js","assets/Caisses-DmEA4lJb.js","assets/Calendrier-C9btrQMz.js","assets/campagnes-pur-6-VL7ofh.js","assets/Carnet-CQ4PjFcv.js","assets/carte-jp3PaoF5.js","assets/carte-_W_-xBPj.css","assets/CarteModal-uSpJyIFB.js","assets/CartesCadeaux-CMQgrgGv.js","assets/Catalogue-BkkS7YGa.js","assets/CentreDeCommande-C8Itp7dS.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-CGwir41D.js","assets/certificat-BMZCgcmY.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-kOhscfV8.js","assets/chiffre-du-jour-pur-DFjTYcbG.js","assets/ChiffreDesPrestations-DeBL7Xla.js","assets/Classement-BtDn5Vb_.js","assets/classement-Ccb-YbVu.js","assets/Classement-CmpbQZDu.css","assets/classement-pur-CQOYU06l.js","assets/client-zJLeSnEx.js","assets/cloture-du-jour-3EOiF3qh.js","assets/ClotureDuTiroir-B4M5-IYj.js","assets/Coffre-Cc3Yh3_2.js","assets/collecte-mtn-pur-Co3gZLJA.js","assets/components-BIcG55kd.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-C92MGL9m.js","assets/Comptes-CP2bfj7f.js","assets/consultation-CRW6QcWf.css","assets/consultation-CSzBsrIf.js","assets/Consultations-BkLd9oLe.js","assets/Consultations-DiE-2_mG.css","assets/consultNotes-BLxIcYzp.js","assets/contexte-de-la-reponse-D5opkPrI.js","assets/Conversations-D4WwB5Zo.css","assets/Conversations-DXKFhZVV.js","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-DJfObt7x.js","assets/currency-Cd0clE4P.js","assets/Customers-CZ4mkuzv.js","assets/Dashboard-14VYQcJA.js","assets/Dashboard-B2x7VsE_.css","assets/dates-DNT1qdXk.js","assets/DemanderAPerle-BD5NgCRN.css","assets/DemanderAPerle-BGtg0kXf.js","assets/Demandes-DlXTP468.js","assets/DepenseEnUnePhrase-BIGRlGqP.css","assets/DepenseEnUnePhrase-CBak9G3x.js","assets/Depenses-DTLiWPpq.js","assets/depenses-saisie-Buon_4GU.js","assets/devis-BscPYl7C.css","assets/devis-CakFTCfB.js","assets/devis-remis-BbrQTZom.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-eNwQHUwg.js","assets/diagnostics-au-trone-CrNlMrLd.js","assets/Dictee-C-pUYYFA.css","assets/Dictee-DSxiLLRC.js","assets/dictee-pur-Cyy_xPmW.js","assets/Discussions-DI-7ApSu.js","assets/dist-9vv0te18.js","assets/echappe-html-pur-gEhHOM07.js","assets/EditeurDesOffres-BmTF9GtU.js","assets/Encaissements-vnAE1uQG.js","assets/enfants-gGDNY1uf.js","assets/Engagements-Cj5S9MhG.css","assets/engagements-coffre-CXkDl_kT.js","assets/Engagements-D4dLhKOS.js","assets/EntreDeuxSeances-CqnrDdyA.js","assets/es-z65-35JZ.js","assets/etoiles-pur-CgRPMSHm.js","assets/Evaluation-CmdI352N.js","assets/facture-DXILoQVx.js","assets/Factures-C4PBMgRg.js","assets/FenetreDeLAgent-t7DXx_wl.js","assets/FenetreDesCivilites-DzAgQawn.js","assets/FenetreDesCivilites-zfNk1aak.css","assets/FenetreDuPoint-CmJJFxnb.js","assets/Fil-CFbiotrA.js","assets/finances-C8x7Mn4-.css","assets/fon-1beL1FWT.js","assets/Fournisseurs-Df-Vik6c.js","assets/fournisseurs-mL6rJgaH.js","assets/foyer-CHB_YX74.js","assets/Gerard-DOdfo7vs.js","assets/gerard-donnees-B_CLgSIt.js","assets/Gerard-lGKehvgG.css","assets/gestes-conversation-Cvzb8mV7.js","assets/heures-des-rappels-pur-BWJPB8OP.js","assets/HomeRituals-CYExS6rt.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-BZq_-6Eg.js","assets/ia-centre-DFSDTj6r.js","assets/ia-diagnostic-pur-qGnFEvys.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-tableau-pur-p6UvREJe.js","assets/identite-BZEjVvJ4.js","assets/index.es-DsWh-BtF.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-a6NvWuQ-.js","assets/jspdf.es.min-BV2HeFeL.js","assets/JustePrix-D6lpWzVA.js","assets/kkiapay-BJk-lLVC.js","assets/kkiapay-widget-CVmsl9OE.js","assets/Laboratoire-BZUOu7NB.js","assets/LaJournee-Bn_G0HCt.css","assets/LaJournee-US2Kyqv9.js","assets/le-caissier-pur-C3mortWT.js","assets/le-sceau-pur-ZsXKMtuY.js","assets/LePoint-CBjCCMQ5.css","assets/LePoint-Cshb0sNI.js","assets/LesPaiements-C9cEZlne.css","assets/LesPaiements-Cl6Xb6PX.js","assets/LettresAuDossier-ClElEHSp.js","assets/LienMndPay-Cu7D9sMw.js","assets/Marketing-BjQLKg_R.js","assets/MarketingBranche-DRrm2okt.js","assets/Marque-Dbia9R6R.js","assets/MesPourboires-CENjelyb.css","assets/MesPourboires-CEVM-6fN.js","assets/MesTaches-Cc4XUDf6.css","assets/MesTaches-FjQUTee4.js","assets/momo-C2ZVfV9J.js","assets/MonMois-BxfhTb7l.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/MtnMoMo-Bd_oCInx.js","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/objectifs-DhIcFc56.js","assets/opale-BeJSBUOX.js","assets/oreille-B1AMUmZh.js","assets/paie-du-5-6CWg1MRJ.js","assets/paie-du-5-DeJq-K_U.css","assets/paie-du-5-pur-CPiCK8fv.js","assets/paie-par-mtn-BK_ZxCiX.js","assets/PaieParMtn-C0NYtGob.js","assets/paliers-BcS40W7S.js","assets/Parametres-BisYrQkR.js","assets/parcours-BC8krovp.js","assets/Parrainages-DYFnQSht.js","assets/Parrainages-gAHAPB_6.css","assets/PassageAvantLeFauteuil-BvXTHLqH.js","assets/pdf-DHfL7vPy.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/periode-des-pourboires-pur-BUWqfwov.js","assets/Personas-DtwWU1X_.js","assets/Personnel-CrZO5Xvu.js","assets/photo-C-vDcCxp.js","assets/pilotage-D8kf1Co8.css","assets/porte-de-l-equipe-BxvU-uo9.js","assets/Pourboires-IM_GToed.js","assets/Predictions-Cu812r0D.js","assets/preload-helper-BRe_O-Rg.js","assets/Prestataires-DC_9wzQ8.js","assets/Prets-C5AJOJxO.js","assets/PrevisionDuMois-CCVLFQZs.js","assets/PrevisionDuMois-DlFTw3OX.css","assets/Previsions-9BU2Vg1T.css","assets/Previsions-BMld5W6X.js","assets/previsions-pur-CC70asHS.js","assets/processus-pur-R6U5QcCi.js","assets/Projets-COO7WDEE.css","assets/projets-DkRVPyf-.js","assets/Projets-nV2sazJ5.js","assets/projets-pur-2ZEMRNDU.js","assets/protocoles-BHO2o2FA.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-Z1jBv2MJ.js","assets/quiz-5qMPWZVi.js","assets/Rapport-B8aeVhCV.js","assets/Recommandations-B1xARbRW.js","assets/regler-Ahn8iR4e.js","assets/regler-D1gFEaVz.css","assets/regler-par-fedapay-pur-NY2tclTE.js","assets/relances-pur-C9iUwl2e.js","assets/releve-des-avis-DKuK2sUH.js","assets/SalonFoyer-g_SxnQDu.js","assets/secretariat-admin-vhwwtFBQ.js","assets/Secretariat-Cy79Zw30.css","assets/Secretariat-Zew7Uizo.js","assets/Signatures-8nZpSkkJ.js","assets/SignerUnPdf-D2nfHHip.js","assets/Synthese-BynVKR4O.js","assets/SyntheseGraphes-DnyC_qzQ.js","assets/systeme-TPy-pF7j.css","assets/Tableau-pXfoMS6F.js","assets/temps-C5GiLubu.js","assets/Textes-DLpOzRbT.css","assets/Textes-teGgwpMH.js","assets/tiroirs-CE626-H_.js","assets/tiroirs-CkDzpGy0.css","assets/trone-B-r6lpi2.css","assets/trone-ChqFV8rK.js","assets/useAudiences-DiFdI2hF.js","assets/useClotureDuJour-B_g1iO9j.js","assets/visios-BsOQaTnQ.js","assets/Vitrine-BWilTqQJ.css","assets/Vitrine-S7jtv0QU.js","assets/_admin-CHeQLq8S.js","assets/_contrat-QAIHctUQ.js","assets/_reuni-Dsb1vyW-.js","assets/_shared-D0WGFzrE.js","assets/_signature-BJqoiqZ1.js","assets/_ui-BrUDlmuM.css","assets/_ui-ClHScgA4.js"];
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
