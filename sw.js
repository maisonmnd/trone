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
const BUILD = "20261123041312";
const A_GARDER = ["./","assets/abonnements-7NSRTJLR.js","assets/Abonnements-DCx1xUym.js","assets/Abonnements-DTY7p2DH.css","assets/Academie-C1FWcJE8.js","assets/Acces-C0s8zCSO.js","assets/AFaire-CV-hRFIA.js","assets/afaire-ii5yppTn.js","assets/agents-donnees-NsP0n4Wu.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Agents-NxQCjN3W.js","assets/Analytics-BHvvL5jX.js","assets/App-C6MdZmap.js","assets/Appels-Uusso2tO.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/Assistants-D9i2Xwmg.css","assets/Assistants-DECdMQg8.js","assets/AtelierDesContenus-C-5_zD4_.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/Audience-cWm_fVRv.js","assets/Aujourdhui-bbnm8xcP.js","assets/auth-DRwRhNAM.js","assets/avant-le-fauteuil-lecture-CLGhnf7r.js","assets/AvantLeFauteuil-CiuDzjqq.js","assets/avis-fiches-fMEvotFO.js","assets/avis-google-pont-MLiW8F_4.js","assets/AvisGoogle-BVBWaQMf.js","assets/AvisGoogle-DaPXfwX9.css","assets/BadgeEssai-B3zycONi.js","assets/BadgeSuggere-CJCr7QYC.js","assets/besoins-C1Tc1tJu.js","assets/BesoinsEtRegles-BLwxGVV5.css","assets/BesoinsEtRegles-ZrX3kDJE.js","assets/bilan-B-bfPYR0.css","assets/bilan-C06-d0cu.js","assets/BilanMensuel-B18_8yAT.js","assets/Branches-DTkce-7p.js","assets/bridges-ul_Ce7Z8.js","assets/Caisse-BEknRh6H.js","assets/caisse-du-soir-C6vPx-E_.css","assets/caisse-du-soir-Dz1qDwC3.js","assets/caisse-fluide-pur-tipBbMJu.js","assets/Caisses-C3zvpLlB.js","assets/Calendrier-DSqeJWBV.js","assets/campagnes-pur-ZhxuPjv1.js","assets/Carnet-BwLefGRu.js","assets/carte-DSY4PS0E.js","assets/carte-_W_-xBPj.css","assets/CarteModal-CN8Zw9RZ.js","assets/CartesCadeaux-DXAobl2F.js","assets/Catalogue-6kJCe9JL.js","assets/CentreDeCommande-b8Xg3PPw.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-BkJ-gNT6.js","assets/certificat-DThLmkn1.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-BJSqNWQK.js","assets/chiffre-du-jour-pur-Cp_oE9Yb.js","assets/ChiffreDesPrestations-CITJb8SG.js","assets/classement-BeYzxk0C.js","assets/Classement-CmpbQZDu.css","assets/Classement-D-QGct00.js","assets/classement-pur-CQOYU06l.js","assets/client-D7D3rBm6.js","assets/cloture-du-jour-DMyFlAJZ.js","assets/ClotureDuTiroir-CAtxgspV.js","assets/Coffre-B9o1I-ze.js","assets/collecte-mtn-pur-C_XQy7Cp.js","assets/components-CWmlKCSH.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-CkhXKJL6.js","assets/Comptes-CVQTtKwx.js","assets/consultation-Bd5HXu-J.js","assets/consultation-CRW6QcWf.css","assets/Consultations-DiE-2_mG.css","assets/Consultations-zrTySgOA.js","assets/consultNotes-DYebcfRa.js","assets/contexte-de-la-reponse-CXIWpDrQ.js","assets/Conversations-D4WwB5Zo.css","assets/Conversations-DbZCvETi.js","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-Z20qyGHL.js","assets/currency-Cd0clE4P.js","assets/Customers-BvnNNSZx.js","assets/Dashboard-B2x7VsE_.css","assets/Dashboard-ng0EVkZd.js","assets/dates-Dy-x6ky4.js","assets/DemanderAPerle-BD5NgCRN.css","assets/DemanderAPerle-Cx9Niu7V.js","assets/Demandes-N_yyIoWs.js","assets/DepenseEnUnePhrase-BdcZZ8LH.js","assets/DepenseEnUnePhrase-BIGRlGqP.css","assets/Depenses-CM_nts08.js","assets/depenses-saisie-Dzu6MHNN.js","assets/devis-BscPYl7C.css","assets/devis-DbPP25Mx.js","assets/devis-remis-DedVvwlc.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-Q6Uj_CDk.js","assets/diagnostics-au-trone-CzFvaZ0w.js","assets/Dictee-C-pUYYFA.css","assets/Dictee-OkgHDpqT.js","assets/dictee-pur-c17IkXKx.js","assets/Discussions-9cHxIiCO.js","assets/dist-9vv0te18.js","assets/echappe-html-pur-gEhHOM07.js","assets/EditeurDesOffres-D3UGx7s3.js","assets/Encaissements-Jyy53xBT.js","assets/enfants-DRyqzMNu.js","assets/Engagements-Cj5S9MhG.css","assets/engagements-coffre-DU12OtxX.js","assets/Engagements-N78YnzVQ.js","assets/EntreDeuxSeances-Dr5vg13V.js","assets/es-DUx8gbO1.js","assets/etoiles-pur-CgRPMSHm.js","assets/Evaluation-BJVvOpgY.js","assets/facture-xSr5gC5p.js","assets/Factures-BEfYvvW5.js","assets/FenetreDeLAgent-CgCwqk7M.js","assets/FenetreDesCivilites-DthPi3Y2.js","assets/FenetreDesCivilites-zfNk1aak.css","assets/FenetreDuPoint-C-85Z63e.js","assets/Fil-C8HLMX1c.js","assets/finances-C8x7Mn4-.css","assets/fon-XjMHqzS9.js","assets/fournisseurs-BIGsZ416.js","assets/Fournisseurs-LhhDEj02.js","assets/foyer-Dmm423q7.js","assets/Gerard-CqrXLn1F.js","assets/gerard-donnees-BH1K0PQR.js","assets/Gerard-lGKehvgG.css","assets/gestes-conversation-Ds9jkLCK.js","assets/heures-des-rappels-pur-BWJPB8OP.js","assets/HomeRituals-Dx9i8wcv.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-B9wLZ0Jl.js","assets/ia-centre-C_a__JtL.js","assets/ia-diagnostic-pur-qGnFEvys.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-tableau-pur-p6UvREJe.js","assets/identite-CPRlreZQ.js","assets/index.es-B4UKH1CK.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-Dv6r5pA9.js","assets/jspdf.es.min-vNX8QDxM.js","assets/JustePrix-CZtjKM4Z.js","assets/kkiapay-PkwZVoBk.js","assets/kkiapay-widget-CVmsl9OE.js","assets/Laboratoire-B20Q7Tno.js","assets/LaJournee-Bn_G0HCt.css","assets/LaJournee-WjQOdQ0U.js","assets/le-caissier-pur-aIbnQWIB.js","assets/le-sceau-pur-ZsXKMtuY.js","assets/LePoint-CBjCCMQ5.css","assets/LePoint-Y4RWNI2f.js","assets/LesPaiements-BZ5JtWfI.js","assets/LesPaiements-C9cEZlne.css","assets/LettresAuDossier-DzCp5R1I.js","assets/LienMndPay-De4kv_jv.js","assets/Marketing-BYnrt0I0.js","assets/MarketingBranche-MhB__qo8.js","assets/Marque-KnM7bSAk.js","assets/MesPourboires-B_ygRarm.js","assets/MesPourboires-CENjelyb.css","assets/MesTaches-Cc4XUDf6.css","assets/MesTaches-DR2l3bjH.js","assets/momo-C2ZVfV9J.js","assets/MonMois-DrlOG9lp.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/MtnMoMo-CMuFoZfB.js","assets/objectifs-16Ea__hO.js","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/opale-su4gua4B.js","assets/oreille-B1AMUmZh.js","assets/paie-du-5-DeJq-K_U.css","assets/paie-du-5-DU0HI5JC.js","assets/paie-du-5-pur-CPiCK8fv.js","assets/paie-par-mtn-BRL0oiUa.js","assets/PaieParMtn-BRyfEjz0.js","assets/paliers-CfE16LM4.js","assets/Parametres-CpbnLXte.js","assets/parcours-CIOJqqTX.js","assets/Parrainages-BCyMSpjw.js","assets/Parrainages-gAHAPB_6.css","assets/PassageAvantLeFauteuil-Cqr3A1TU.js","assets/pdf-CNUsluO5.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/periode-des-pourboires-pur-BUWqfwov.js","assets/Personas-CAl6qKgc.js","assets/Personnel-DGW70zrx.js","assets/photo-DoiwZ8__.js","assets/pilotage-D8kf1Co8.css","assets/porte-de-l-equipe-DOgb7HKU.js","assets/Pourboires-DvBN1USq.js","assets/Predictions-CRrs4rHU.js","assets/preload-helper-BRe_O-Rg.js","assets/Prestataires-2Wfdh_5A.js","assets/Prets-BMAsou7O.js","assets/PrevisionDuMois-DlFTw3OX.css","assets/PrevisionDuMois-hEmzbjoE.js","assets/Previsions-95QW05di.js","assets/Previsions-9BU2Vg1T.css","assets/previsions-pur-MQ3jaj_f.js","assets/processus-pur-R6U5QcCi.js","assets/Projets-COO7WDEE.css","assets/projets-D8FgzQFY.js","assets/Projets-DRoMN_PU.js","assets/projets-pur-2ZEMRNDU.js","assets/protocoles-C1Of7wKp.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-BKtLZFJW.js","assets/quiz-5qMPWZVi.js","assets/Rapport-7I5q4uh_.js","assets/Recommandations-BlkkBFov.js","assets/regler-D1gFEaVz.css","assets/regler-DbHGUqeH.js","assets/regler-par-fedapay-pur-CFpzn1nJ.js","assets/relances-pur-C9iUwl2e.js","assets/releve-des-avis-C3ry1Ay0.js","assets/SalonFoyer-CMzCfB2l.js","assets/sceau-CacaiYkR.js","assets/secretariat-admin-DrwYYCwb.js","assets/Secretariat-Be957OyG.js","assets/Secretariat-Cy79Zw30.css","assets/Signatures-DnK_9K77.js","assets/SignerUnPdf-BcY8DDv5.js","assets/Synthese-CMS3ovcd.js","assets/SyntheseGraphes-38yRghzH.js","assets/systeme-TPy-pF7j.css","assets/Tableau-BmFwGeqL.js","assets/temps-B2F9U9zx.js","assets/Textes-BKEw0xg4.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-CkDzpGy0.css","assets/tiroirs-DsM1rw_j.js","assets/trone-B-r6lpi2.css","assets/trone-DN_Br7sG.js","assets/useAudiences-z0_Tx_g_.js","assets/useClotureDuJour-B5dWL-Ks.js","assets/visios-B_MfO40B.js","assets/Vitrine-BWilTqQJ.css","assets/Vitrine-BWy_mqEn.js","assets/_admin-ws7VuFq7.js","assets/_contrat-BOXj_YIE.js","assets/_reuni-CGOGMqK3.js","assets/_shared-DWRpbltz.js","assets/_signature-eDFhrmAA.js","assets/_ui-BrUDlmuM.css","assets/_ui-D4DTB7Z6.js"];
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
