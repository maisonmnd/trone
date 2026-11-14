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
const BUILD = "20261114210105";
const A_GARDER = ["./","assets/abonnements-7em9EE6B.js","assets/Abonnements-DTY7p2DH.css","assets/Abonnements-VKAZ_zQy.js","assets/Academie-oJFvAOn8.js","assets/Acces-CSlg14Sw.js","assets/AFaire-Cddahli5.js","assets/afaire-Dq8IUshG.js","assets/Agents-C47DhHre.js","assets/agents-donnees-DhpWr_wV.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-BzZzIzqs.js","assets/Appels-CclZV3dX.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/Assistants-BI7ee1dX.js","assets/Assistants-D9i2Xwmg.css","assets/AtelierDesContenus-Cm7tPjja.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/Audience-q-Hu7qe4.js","assets/Aujourdhui-CxSm1fGW.js","assets/avant-le-fauteuil-lecture-Dcbctc_1.js","assets/AvantLeFauteuil-CWDGskmk.js","assets/avis-fiches-CCgkSB5X.js","assets/AvisGoogle-DaPXfwX9.css","assets/AvisGoogle-Df0Rc14m.js","assets/BadgeEssai-Dr-FoIfE.js","assets/besoins-qEqtNHUV.js","assets/BesoinsEtRegles-CsNAtWtw.js","assets/BesoinsEtRegles-CzntMbJE.css","assets/bilan-B-bfPYR0.css","assets/bilan-CZyfFldP.js","assets/BilanMensuel-CWESR5IW.js","assets/Branches-B54xYPvd.js","assets/bridges-A-Pa4xhM.js","assets/Caisse-CHt5Djwr.js","assets/caisse-du-soir-C6vPx-E_.css","assets/caisse-du-soir-CkCdzR9p.js","assets/Caisses-BsqdMPgT.js","assets/Calendrier-O1ONyzaM.js","assets/campagnes-pur-DNZcnjwM.js","assets/Carnet-BUduOucX.js","assets/carte-CtbK7BMg.js","assets/carte-_W_-xBPj.css","assets/CarteModal-C0qjO01N.js","assets/CartesCadeaux-9GuoTCwp.js","assets/Catalogue-CUoIrkvm.js","assets/CentreDeCommande-Cwxavu2i.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-uQuC6yUX.js","assets/certificat-CAT8Sws6.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-kqD3r9Bt.js","assets/chiffre-du-jour-pur-Cj3eB69B.js","assets/ChiffreDesPrestations-CXgwOBxW.js","assets/client-Cl5Kx89J.js","assets/cloture-du-jour-BQFt-ayH.js","assets/ClotureDuTiroir-C53Amsx1.js","assets/Coffre-nt4rAJHZ.js","assets/collecte-mtn-pur-D9rF7FS0.js","assets/components-QcZLWNtz.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-C0VA9Xta.js","assets/Comptes-C_5Zq2jc.js","assets/consultation-bGYOH-cr.js","assets/consultation-CRW6QcWf.css","assets/Consultations-CIMlO2ox.js","assets/Consultations-DiE-2_mG.css","assets/consultNotes-BHCCOgLa.js","assets/Conversations-D0awPz3D.js","assets/Conversations-D4WwB5Zo.css","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-BSaCZBQA.js","assets/currency-qfIhGmrs.js","assets/Customers-Dd5iJ6jy.js","assets/Dashboard-B2x7VsE_.css","assets/Dashboard-CDoFUK4r.js","assets/dates-5soqkfJB.js","assets/Demandes-BOXzepSl.js","assets/DepenseEnUnePhrase-BIGRlGqP.css","assets/DepenseEnUnePhrase-TCKP3qcw.js","assets/Depenses-B0SHxQ-1.js","assets/depenses-saisie-DRXS-o99.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-DJCVryu4.js","assets/diagnostics-au-trone-COITjfaD.js","assets/Dictee-B24A4PcN.js","assets/Dictee-BIQFbKhA.css","assets/dictee-pur-DZc_ImVI.js","assets/Discussions-BgSrdJaC.js","assets/EditeurDesOffres-DmIEEVW-.js","assets/Encaissements-A9hRx58z.js","assets/enfants-Dx93D8Qa.js","assets/Engagements-Bv6rjQad.js","assets/Engagements-Cj5S9MhG.css","assets/engagements-coffre-DDuiERAu.js","assets/EntreDeuxSeances-aj-LHJax.js","assets/Evaluation-gBMLxCVn.js","assets/facture-CGziW2Jl.js","assets/Factures-DF9TgCQB.js","assets/FenetreDesCivilites-D_q8TU9q.js","assets/FenetreDesCivilites-zfNk1aak.css","assets/FenetreDuPoint-BdHoC9yr.js","assets/Fil-CiiQOmVS.js","assets/finances-C8x7Mn4-.css","assets/fon-CYcryvII.js","assets/Fournisseurs-BbwFZGap.js","assets/fournisseurs-CZ0Ki-GK.js","assets/foyer-DlWOA_lL.js","assets/Gerard-Cgj-zsJh.css","assets/gerard-donnees-DiH6Jl6m.js","assets/Gerard-I8csavwY.js","assets/gestes-conversation-CypXNhbm.js","assets/heures-des-rappels-pur-Dig9pZpo.js","assets/HomeRituals-CC2vtf78.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-g0p9tYG3.js","assets/ia-centre-_EwWG4SI.js","assets/ia-diagnostic-pur-BNtkwfR3.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-tableau-pur-p6UvREJe.js","assets/identite-BYZV8VnB.js","assets/index-BsbyhUlG.js","assets/index.es-CeDssGg4.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-DdUzLqSK.js","assets/jspdf.es.min-BtPbUZiU.js","assets/JustePrix-Zj0QQlvS.js","assets/kkiapay-CFnKB2IH.js","assets/kkiapay-widget-CVmsl9OE.js","assets/Laboratoire-B3cYCNYc.js","assets/LaJournee-Bn_G0HCt.css","assets/LaJournee-DXkNDpXt.js","assets/le-caissier-pur-D-2TN9aq.js","assets/LesPaiements-C9cEZlne.css","assets/LesPaiements-Cnm8fCn-.js","assets/LettresAuDossier-CXNEPlet.js","assets/LienMndPay-Dr6N6v_O.js","assets/Marketing-Bwlgnsjk.js","assets/MarketingBranche-DNN_1hdR.js","assets/Marque-DwvNfXQ5.js","assets/MesPourboires-BEHxQnaC.js","assets/MesPourboires-CENjelyb.css","assets/MesTaches-C75kBkLV.js","assets/MesTaches-Cc4XUDf6.css","assets/momo-C2ZVfV9J.js","assets/MonMois-Do-UQQG-.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/MtnMoMo-DL6yBnMs.js","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/objectifs-heSsS5Tf.js","assets/opale-BdUDwmDD.js","assets/oreille-B1AMUmZh.js","assets/paie-du-5-CcVPTBUg.js","assets/paie-du-5-DeJq-K_U.css","assets/paie-du-5-pur-CPiCK8fv.js","assets/paie-par-mtn-E2y9po6d.js","assets/PaieParMtn-C1Pe8E-j.js","assets/paliers-ByYg9Y8K.js","assets/Parametres-DQOiXXBi.js","assets/parcours-CIx_V_wM.js","assets/Parrainages-CAM9yZjQ.js","assets/Parrainages-gAHAPB_6.css","assets/PassageAvantLeFauteuil-HZF5Pbta.js","assets/pdf-mBPiTyMZ.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/periode-des-pourboires-pur-BUWqfwov.js","assets/Personas-DUqSoGfi.js","assets/Personnel-C7m9r48f.js","assets/photo-BT5Cfi5c.js","assets/pilotage-D8kf1Co8.css","assets/Pourboires-m9cnNFn_.js","assets/Predictions-BSDMgHfd.js","assets/Prestataires-D5ljLZzo.js","assets/Prets-3PL5ANyM.js","assets/PrevisionDuMois-BuxicNIm.js","assets/PrevisionDuMois-DlFTw3OX.css","assets/Previsions-9BU2Vg1T.css","assets/Previsions-Cwfojl6_.js","assets/previsions-pur-Ac-7VJHp.js","assets/processus-pur-R6U5QcCi.js","assets/projets-BPlVegdd.js","assets/Projets-BW-Q5Nlu.js","assets/Projets-COO7WDEE.css","assets/projets-pur-2ZEMRNDU.js","assets/protocoles-iBjjToSt.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-tsc6u1QE.js","assets/qualification-CANV6wWo.js","assets/quiz-5qMPWZVi.js","assets/Rapport-rYwYEPlG.js","assets/Recommandations-C-_s2o4B.js","assets/regler-DbS1VP3E.js","assets/regler-DHR_B1Dm.css","assets/regler-par-fedapay-pur-CFL4EbBx.js","assets/relances-pur-BacTXlI2.js","assets/releve-des-avis-Cr4v6YWE.js","assets/SalonFoyer-Ch55pF4-.js","assets/secretariat-admin-DB0jSZhA.js","assets/Secretariat-Cy79Zw30.css","assets/Secretariat-Dm9hH5Hw.js","assets/Signatures-DcXNMclj.js","assets/SignerUnPdf-Bltv0OrI.js","assets/Synthese-CBjLGQvN.js","assets/SyntheseGraphes-DhIlUqH2.js","assets/systeme-TPy-pF7j.css","assets/Tableau-B0rQIA_v.js","assets/temps-Aa2SBZhz.js","assets/Textes-DaxPj2fz.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-BLqIMATJ.js","assets/tiroirs-CkDzpGy0.css","assets/trone-Dg6wh-u1.css","assets/trone-WaLWneGp.js","assets/useAudiences-CnQXKvwg.js","assets/useClotureDuJour-BvYcprjv.js","assets/visios-CJmKPyno.js","assets/Vitrine-BlYxG77f.js","assets/Vitrine-BWilTqQJ.css","assets/_admin-TC0yX1b7.js","assets/_contrat-CjfCqasz.js","assets/_reuni-BsysoMCj.js","assets/_shared-DAskQ36G.js","assets/_signature-BAQQTLUO.js","assets/_ui-am_clhsz.js","assets/_ui-BrUDlmuM.css"];
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
