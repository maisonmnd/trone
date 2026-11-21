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
const BUILD = "20261121194941";
const A_GARDER = ["./","assets/abonnements-C7YHuFQl.js","assets/Abonnements-CQErpvim.js","assets/Abonnements-DTY7p2DH.css","assets/Academie-CMdliwZw.js","assets/Acces-P4pJaDuz.js","assets/afaire-BbhNwIcx.js","assets/AFaire-wY9BbocZ.js","assets/agents-donnees-DBqvmdyI.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Agents-TVoW0zER.js","assets/Analytics-XHxh9UNp.js","assets/App-DN0PWlqd.js","assets/Appels-BfIdctQj.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/Assistants-BRXbcGnt.js","assets/Assistants-D9i2Xwmg.css","assets/AtelierDesContenus-CBsqazGp.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/Audience-TqLphlPD.js","assets/Aujourdhui-B3TjCDPj.js","assets/auth-DrGYFpVm.js","assets/avant-le-fauteuil-lecture-DVBFqqTg.js","assets/AvantLeFauteuil-CjVcL1_i.js","assets/avis-fiches-BT-YDsHD.js","assets/avis-google-pont-CNnkQbz-.js","assets/AvisGoogle-DaPXfwX9.css","assets/AvisGoogle-PagR_mKf.js","assets/BadgeEssai-CjYRq_it.js","assets/BadgeSuggere-D_jLjuJ7.js","assets/besoins-Drj4K3Y9.js","assets/BesoinsEtRegles-BLwxGVV5.css","assets/BesoinsEtRegles-Bp7G3zpB.js","assets/bilan-B-bfPYR0.css","assets/bilan-C4fBLMBP.js","assets/BilanMensuel-CqQGPdXX.js","assets/Branches-CbiS3F3g.js","assets/bridges-n9YkjiDF.js","assets/Caisse-BIUCHdgn.js","assets/caisse-du-soir-Bw4dVAw2.js","assets/caisse-du-soir-C6vPx-E_.css","assets/caisse-fluide-pur-KaKbr04L.js","assets/Caisses-tgZwAA8u.js","assets/Calendrier-DLbcJsOC.js","assets/campagnes-pur-BCf6iYc8.js","assets/Carnet-BIUnpNKo.js","assets/carte-DgMWQ9q7.js","assets/carte-_W_-xBPj.css","assets/CarteModal-CA4Cm1IM.js","assets/CartesCadeaux-CTtOTrAT.js","assets/Catalogue-6tqKDZIJ.js","assets/CentreDeCommande-Du8kyJhp.css","assets/CentreDeCommande-PCf6lWVO.js","assets/Cercle-DAPL0pHK.js","assets/certificat-D4NEkvMj.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-BZSHnwDM.js","assets/chiffre-du-jour-pur-ButF7DWC.js","assets/ChiffreDesPrestations-DuqxhrsG.js","assets/Classement-BBA3QoH4.js","assets/classement-CkUoBxbk.js","assets/Classement-CmpbQZDu.css","assets/classement-pur-CQOYU06l.js","assets/client-DBLOSdfp.js","assets/cloture-du-jour-CVPSYWRI.js","assets/ClotureDuTiroir-DZ4GGjHV.js","assets/Coffre-_EMJiO5V.js","assets/collecte-mtn-pur-BKoFYpbn.js","assets/components-BbKi2gji.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-B0waIoZg.js","assets/Comptes-BJYmYQ-Z.js","assets/consultation-B7MY0xnZ.js","assets/consultation-CRW6QcWf.css","assets/Consultations-CDX-r4My.js","assets/Consultations-DiE-2_mG.css","assets/consultNotes-DJlQcGJB.js","assets/contexte-de-la-reponse-DCntNCYB.js","assets/Conversations-D4WwB5Zo.css","assets/Conversations-D_MDpkEi.js","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-B4OJI92L.js","assets/currency-Cd0clE4P.js","assets/Customers-DW8CXbq7.js","assets/Dashboard-B2x7VsE_.css","assets/Dashboard-pl2HVy96.js","assets/dates-m7Z9-SIS.js","assets/DemanderAPerle-BD5NgCRN.css","assets/DemanderAPerle-C4HC5qSC.js","assets/Demandes-jfIWCuvD.js","assets/DepenseEnUnePhrase-BIGRlGqP.css","assets/DepenseEnUnePhrase-DV1SvxuG.js","assets/Depenses-BwXpaG-I.js","assets/depenses-saisie-DRNYLkXs.js","assets/devis-remis-DRH4Si86.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-nIlsmJNL.js","assets/diagnostics-au-trone-7y-G3TfC.js","assets/Dictee-C-pUYYFA.css","assets/Dictee-CIIvCCSU.js","assets/dictee-pur-BgRpBbZ9.js","assets/Discussions-qbjxZR5x.js","assets/echappe-html-pur-gEhHOM07.js","assets/EditeurDesOffres--F5ztasH.js","assets/Encaissements-C272MBmK.js","assets/enfants-B0uKqDMT.js","assets/Engagements-Cj5S9MhG.css","assets/Engagements-CO2cqHE4.js","assets/engagements-coffre-C3FEryp3.js","assets/EntreDeuxSeances-C6JL4VRz.js","assets/es-D2yKowYA.js","assets/Evaluation-DeoEwnHf.js","assets/facture-zekZiIxd.js","assets/Factures-CAJFpmAU.js","assets/FenetreDeLAgent-DOjxMbqR.js","assets/FenetreDesCivilites-DNHAzu5K.js","assets/FenetreDesCivilites-zfNk1aak.css","assets/FenetreDuPoint-BNbgcuzZ.js","assets/Fil-DR-jlaY0.js","assets/finances-C8x7Mn4-.css","assets/fon-C6F92iWt.js","assets/fournisseurs-B-80LUZ3.js","assets/Fournisseurs-B3QrVkgK.js","assets/foyer-DD-TCj13.js","assets/Gerard-C4LmzK4n.js","assets/gerard-donnees-BC4t4OGE.js","assets/Gerard-lGKehvgG.css","assets/gestes-conversation-CWLZArxv.js","assets/heures-des-rappels-pur-BWJPB8OP.js","assets/HomeRituals-CcO-MnRR.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-o21OOtaT.js","assets/ia-centre-DD6NNwq9.js","assets/ia-diagnostic-pur-qGnFEvys.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-tableau-pur-p6UvREJe.js","assets/identite-BfKs_4wk.js","assets/index.es-B6yAlKRS.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-BwEFsjqR.js","assets/jspdf.es.min-WZgrVEBG.js","assets/JustePrix-CgMD7UMT.js","assets/kkiapay-CwMBj7W5.js","assets/kkiapay-widget-CVmsl9OE.js","assets/Laboratoire-DFniUqB6.js","assets/LaJournee-Bn_G0HCt.css","assets/LaJournee-tCufYlPk.js","assets/le-caissier-pur-B9drZ9P4.js","assets/LePoint-BUwpdkug.js","assets/LePoint-CBjCCMQ5.css","assets/LesPaiements-B9cwu_gI.js","assets/LesPaiements-C9cEZlne.css","assets/LettresAuDossier-DJyGqXNh.js","assets/LienMndPay-B9287GjF.js","assets/Marketing-CYJ7cp3u.js","assets/MarketingBranche-aMdXpHJN.js","assets/Marque-DvoBSRPA.js","assets/MesPourboires-BX55w858.js","assets/MesPourboires-CENjelyb.css","assets/MesTaches-Cc4XUDf6.css","assets/MesTaches-exawnb43.js","assets/momo-C2ZVfV9J.js","assets/MonMois-BfOIIdvm.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/MtnMoMo-BWrjTOO2.js","assets/objectifs-Cr0KTTri.js","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/opale-yaNVN-Su.js","assets/oreille-B1AMUmZh.js","assets/paie-du-5-DeJq-K_U.css","assets/paie-du-5-nNExYgLP.js","assets/paie-du-5-pur-CPiCK8fv.js","assets/paie-par-mtn-Ca3mXGMc.js","assets/PaieParMtn-B5XozGgq.js","assets/paliers-B4ihbiuT.js","assets/Parametres-DPS0JzSa.js","assets/parcours-DIeuAAkH.js","assets/Parrainages-BrMWHTZS.js","assets/Parrainages-gAHAPB_6.css","assets/PassageAvantLeFauteuil-DT4PTXYD.js","assets/pdf-BODbmbH4.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/periode-des-pourboires-pur-BUWqfwov.js","assets/Personas-DSW5PedH.js","assets/Personnel-B8z7ETDl.js","assets/photo-BV_AXubJ.js","assets/pilotage-D8kf1Co8.css","assets/porte-de-l-equipe-D-4GpWLA.js","assets/Pourboires-CSe3cJCc.js","assets/Predictions-C-tT3ZQL.js","assets/preload-helper-BRe_O-Rg.js","assets/Prestataires-BrC8M_fo.js","assets/Prets-DgsISDnC.js","assets/PrevisionDuMois-DlFTw3OX.css","assets/PrevisionDuMois-TXe5Ovyc.js","assets/Previsions-9BU2Vg1T.css","assets/Previsions-BHTMBfUY.js","assets/previsions-pur-y6gw6g3n.js","assets/processus-pur-R6U5QcCi.js","assets/Projets-COO7WDEE.css","assets/Projets-DfONSKxR.js","assets/projets-DwLBIC2b.js","assets/projets-pur-2ZEMRNDU.js","assets/protocoles-4wVARzYZ.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-Dj_8ixtM.js","assets/quiz-5qMPWZVi.js","assets/Rapport-C-0n6bj9.js","assets/Recommandations-CmTq7ttR.js","assets/regler-ClH0TRMb.js","assets/regler-DHR_B1Dm.css","assets/regler-par-fedapay-pur-DYTDdXhs.js","assets/relances-pur-C9iUwl2e.js","assets/releve-des-avis-CFD3Kavj.js","assets/SalonFoyer-Cmlr-Knr.js","assets/secretariat-admin-D5GzWN4C.js","assets/Secretariat-Cy79Zw30.css","assets/Secretariat-CZRJE5pr.js","assets/Signatures-bxumEuvt.js","assets/SignerUnPdf-CYCEu53o.js","assets/Synthese-CE2uxtwn.js","assets/SyntheseGraphes-C4t9JcRn.js","assets/systeme-TPy-pF7j.css","assets/Tableau-CZ2ryCo1.js","assets/temps-DNF_OTgV.js","assets/Textes-DLpOzRbT.css","assets/Textes-KAzXQGDj.js","assets/tiroirs-B3E-xzg_.js","assets/tiroirs-CkDzpGy0.css","assets/trone-B-r6lpi2.css","assets/trone-CwroIWAh.js","assets/useAudiences-CdZJMIbZ.js","assets/useClotureDuJour-B-eFgpoI.js","assets/visios-B8T8aa7y.js","assets/Vitrine-BWilTqQJ.css","assets/Vitrine-CNLjbUNc.js","assets/_admin-Dv57dmFd.js","assets/_contrat-DYdhbwob.js","assets/_reuni-BJox-m6l.js","assets/_shared-CR8h1cgI.js","assets/_signature-C_ZDi8SI.js","assets/_ui-BrUDlmuM.css","assets/_ui-Cdikmf7b.js"];
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
