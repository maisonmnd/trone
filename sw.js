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
const BUILD = "20261126014437";
const A_GARDER = ["./","assets/abonnements-Bj6mD1wZ.js","assets/Abonnements-DTY7p2DH.css","assets/Abonnements-DzsuZaTx.js","assets/Academie-exxpUA58.js","assets/Acces-Ds4W90hr.js","assets/afaire-Crde_1Uj.js","assets/AFaire-DU4npzkW.js","assets/Agents-CuaNQGEF.js","assets/agents-donnees-D0EO8sg4.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-B8H2YYsw.js","assets/App-CLzV6p-T.js","assets/Appels-DWf6RWUa.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/Assistants--ZblfdWa.js","assets/Assistants-D9i2Xwmg.css","assets/AtelierDesContenus-D3-p6F2A.css","assets/AtelierDesContenus-DDiYuZ6p.js","assets/Audience-CWwGpg3k.js","assets/Aujourdhui-BUPkSfDM.js","assets/auth-B88AqBy5.js","assets/avant-le-fauteuil-lecture-CXHBBWYI.js","assets/AvantLeFauteuil-gr_I6XJ1.js","assets/avis-fiches-yoUD3tQH.js","assets/avis-google-pont-DTf7g_Et.js","assets/AvisGoogle-DaPXfwX9.css","assets/AvisGoogle-pH1J90V-.js","assets/BadgeEssai-CVGDdc3L.js","assets/BadgeSuggere-C9bVuPz0.js","assets/besoins-eyOrg-2b.js","assets/BesoinsEtRegles-BLwxGVV5.css","assets/BesoinsEtRegles-C13jwEr9.js","assets/bilan-B-bfPYR0.css","assets/bilan-BRt2fNQt.js","assets/BilanMensuel-DJqhWAP4.js","assets/Branches-LHnLZ4zR.js","assets/bridges-DalBg7OR.js","assets/Caisse-CUtEWUJh.js","assets/caisse-du-soir-BefoGTy_.js","assets/caisse-du-soir-C6vPx-E_.css","assets/caisse-fluide-pur-DygrpQYb.js","assets/Caisses-CN25z_D6.js","assets/Calendrier-7Jgya-dI.js","assets/campagnes-pur-CxymV-5u.js","assets/Carnet-H4ArQBGC.js","assets/carte-BuKAUvCc.js","assets/carte-_W_-xBPj.css","assets/CarteModal-CNjQ5-1b.js","assets/CartesCadeaux-D0Ij64fA.js","assets/Catalogue-rZA6v12n.js","assets/CentreDeCommande-Du8kyJhp.css","assets/CentreDeCommande-Uh-Qip4k.js","assets/Cercle-BlyhJ6_U.js","assets/certificat-Z73Orl2q.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-DPZZZ1hl.js","assets/chiffre-du-jour-pur-CmNbJzG6.js","assets/ChiffreDesPrestations-DRI6yLUD.js","assets/Classement-CnHSy36O.js","assets/classement-GIK4G1Si.js","assets/classement-pur-DgNYRo7t.js","assets/Classement-T9x-HPwd.css","assets/client-Tnoe00r-.js","assets/cloture-du-jour-Dg8RK3vC.js","assets/ClotureDuTiroir-C_xo7Iac.js","assets/Coffre-HLG7RcUy.js","assets/components-ArDnfl8I.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-F_glwJb8.js","assets/Comptes-DsAJfcaN.js","assets/consultation-CRW6QcWf.css","assets/consultation-iY81jWS9.js","assets/Consultations-DiE-2_mG.css","assets/Consultations-DTa0QUDL.js","assets/consultNotes-JVJlX3EI.js","assets/contexte-de-la-reponse-D_j2xsnw.js","assets/Conversations--JRKnFbp.js","assets/Conversations-D4WwB5Zo.css","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-Dz-SI8MU.js","assets/currency-Cd0clE4P.js","assets/Customers-DOFH3zbx.js","assets/Dashboard-BTJPE8sY.css","assets/Dashboard-s8k3gNcx.js","assets/dates-j6Jl7kFR.js","assets/DemanderAPerle-BD5NgCRN.css","assets/DemanderAPerle-ChQJnItc.js","assets/Demandes-D1riC6y1.js","assets/DepenseEnUnePhrase-BIGRlGqP.css","assets/DepenseEnUnePhrase-YOa7AA3d.js","assets/Depenses-Bb69_ZL5.js","assets/depenses-saisie-Dir-8or1.js","assets/devis-CdIRAvZk.css","assets/devis-CtARfVu7.js","assets/devis-remis-VEzrBiRH.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-C82Q-2Ua.js","assets/diagnostics-au-trone-dRxpTL_y.js","assets/Dictee-C-pUYYFA.css","assets/Dictee-CmnNMXjq.js","assets/dictee-pur-I7LZN8bX.js","assets/Discussions-Da0SGYRt.js","assets/dist-9vv0te18.js","assets/echappe-html-pur-gEhHOM07.js","assets/EditeurDesOffres-DF0db7HZ.js","assets/Encaissements-TlBy0K1T.js","assets/EnDirect-FkP3fA0k.js","assets/enfants-BKO4QHfK.js","assets/Engagements-BQZQQsVE.js","assets/Engagements-Cj5S9MhG.css","assets/engagements-coffre-Dw9qDG5F.js","assets/EntreDeuxSeances-B2Ts5E-J.js","assets/es-D1LzD7DF.js","assets/etoiles-pur-CgRPMSHm.js","assets/Evaluation-DC2ZFVRh.js","assets/facture-D-TjsMlx.js","assets/Factures-CGrl-fdE.js","assets/FenetreDeLAgent-DwJ_3TtZ.js","assets/FenetreDesCivilites-Ci5jzUzy.js","assets/FenetreDesCivilites-zfNk1aak.css","assets/FenetreDuPoint-BMl15nvx.js","assets/Fil-B0AVISrq.js","assets/finances-C8x7Mn4-.css","assets/fon-BvyIy4uf.js","assets/Fournisseurs-5P8y9zWe.js","assets/fournisseurs-B2E4Txw_.js","assets/foyer-DR6maeI8.js","assets/gerard-donnees-DIjMxmwu.js","assets/Gerard-lGKehvgG.css","assets/Gerard-O6x2Qu_W.js","assets/gestes-conversation-yB78oYmQ.js","assets/heures-des-rappels-pur-BWJPB8OP.js","assets/HomeRituals-zYSPl_Ig.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-kjTvM6FT.js","assets/ia-centre-CffJY6iq.js","assets/ia-diagnostic-pur-qGnFEvys.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-tableau-pur-p6UvREJe.js","assets/identite-DN5PF8le.js","assets/index.es-BwUlaXoI.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-CYV6oYvr.js","assets/jspdf.es.min-B5_St1py.js","assets/JustePrix-DwZN6hMr.js","assets/kkiapay-DhjFOHPg.js","assets/kkiapay-widget-CaHBoBVm.js","assets/Laboratoire-G3JTlQmb.js","assets/LaJournee-B3Kn9eeV.js","assets/LaJournee-Bn_G0HCt.css","assets/le-caissier-pur-CoKnoGg_.js","assets/le-sceau-pur-Dv-IZ_M2.js","assets/LePoint-Bpq8o-8d.js","assets/LePoint-B_HurXA0.css","assets/LesPaiements-C9cEZlne.css","assets/LesPaiements-CCEmMJhG.js","assets/LettresAuDossier-qvtZaxim.js","assets/LienMndPay-B7rZOnY5.js","assets/Marketing-BCagJMQy.js","assets/MarketingBranche-Clr6sd36.js","assets/Marque-B4f4kGMv.js","assets/MesPourboires-BDykUKFq.js","assets/MesPourboires-CENjelyb.css","assets/MesTaches-BjQv9Prj.js","assets/MesTaches-Cc4XUDf6.css","assets/mnd-pay-pur-CfS2mkAo.js","assets/momo-C2ZVfV9J.js","assets/MonMois-CCD96-p3.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/MtnMoMo-gIkXyNNU.js","assets/objectifs-De4K_jOp.js","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/opale-BUwFGwdS.js","assets/oreille-B1AMUmZh.js","assets/paie-du-5-DeJq-K_U.css","assets/paie-du-5-DO5P88xh.js","assets/paie-du-5-pur-CPiCK8fv.js","assets/paie-par-mtn-y4LaAWfe.js","assets/PaieParMtn-CVWw3J5z.js","assets/paliers-B9ll0Wcn.js","assets/Parametres-vlpvPKkM.js","assets/parcours-zrFozffF.js","assets/Parrainages-1bCBOVzs.js","assets/Parrainages-gAHAPB_6.css","assets/PassageAvantLeFauteuil-DG4Vqkc0.js","assets/pdf-BhNbDOdK.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/periode-des-pourboires-pur-BUWqfwov.js","assets/Personas-Btvtuvvm.js","assets/Personnel-iD83vaLs.js","assets/photo-QHTsupOk.js","assets/pilotage-D8kf1Co8.css","assets/porte-de-l-equipe-D-e6Y4iz.js","assets/Pourboires-8tVU3RKu.js","assets/Predictions-CEtG1I4Y.js","assets/preload-helper-BRe_O-Rg.js","assets/Prestataires-BZxeAZNG.js","assets/Prets-B1jdU-7e.js","assets/PrevisionDuMois-CqEjwfem.js","assets/PrevisionDuMois-DlFTw3OX.css","assets/Previsions-9BU2Vg1T.css","assets/Previsions-Kyq256w3.js","assets/previsions-pur-DRCNyeeS.js","assets/processus-pur-R6U5QcCi.js","assets/Projets-B4u9IVAg.js","assets/projets-CCPmFjQD.js","assets/Projets-COO7WDEE.css","assets/projets-pur-2ZEMRNDU.js","assets/protocoles-D4KQ_LAC.js","assets/purify.es-BwoZCkIS.js","assets/qr-BJynNsfm.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-DYo4ChPI.js","assets/quiz-5qMPWZVi.js","assets/Rapport-CYttG-Gv.js","assets/Recommandations-Cq5UQpIN.js","assets/regler-CkWqp6VF.js","assets/regler-D1gFEaVz.css","assets/regler-par-fedapay-pur-DP7zXAs5.js","assets/relances-pur-C9iUwl2e.js","assets/releve-des-avis-Bthg42FR.js","assets/SalonFoyer-BwSvzH2R.js","assets/sceau-CL4M59Xj.js","assets/Secretariat-81OLDg02.js","assets/secretariat-admin-Bs_30BlY.js","assets/Secretariat-Cy79Zw30.css","assets/Signatures-BRzl8twL.js","assets/SignerUnPdf-DYHHodjg.js","assets/Synthese-DGcUMPGQ.js","assets/SyntheseGraphes-DzgnBMkK.js","assets/systeme-TPy-pF7j.css","assets/Tableau-COEMCvPz.js","assets/temps-CfXC4JaQ.js","assets/Textes-9PHcWDLm.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-BPZpnNWB.js","assets/tiroirs-CkDzpGy0.css","assets/tpe-CLdE5nZu.css","assets/tpe-CYK-S5dN.js","assets/tpe-de-poche-pur-rVQbRZSo.js","assets/TpeDePoche-CNj3xn7a.js","assets/trone-C3eufNNq.css","assets/trone-DfP91WwF.js","assets/useAudiences-8xbgjoq4.js","assets/useClotureDuJour-CgIfSnUF.js","assets/visios-NcBzneo_.js","assets/Vitrine-BWilTqQJ.css","assets/Vitrine-CNB7KPIZ.js","assets/_admin-C8-z8gJk.js","assets/_contrat-_1HPgm25.js","assets/_reuni-t617t-Cg.js","assets/_shared-CU9bZI2n.js","assets/_signature-COjdlRRf.js","assets/_ui-BrUDlmuM.css","assets/_ui-oxdbLhvV.js"];
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
