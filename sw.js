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
const BUILD = "20261118125946";
const A_GARDER = ["./","assets/Abonnements-CWWIt_Yb.js","assets/Abonnements-DTY7p2DH.css","assets/abonnements-YBj-QtoS.js","assets/Academie-DAV3r43o.js","assets/Acces-HA-MWdSK.js","assets/afaire-b9PtADQg.js","assets/AFaire-COMo90DU.js","assets/Agents-DBUepTdv.js","assets/agents-donnees-BPfgG-fU.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-D__QptGK.js","assets/App-CGPvt9CX.js","assets/Appels-BR_Z8uXu.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/Assistants-D9i2Xwmg.css","assets/Assistants-FcTe900g.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/AtelierDesContenus-DVK4UxbE.js","assets/Audience-9iO1kQmP.js","assets/Aujourdhui-DnBq6VRt.js","assets/auth-DiGAYKUh.js","assets/avant-le-fauteuil-lecture-DkMMSlYQ.js","assets/AvantLeFauteuil-DMQmZwBN.js","assets/avis-fiches-DB2Kotl2.js","assets/AvisGoogle-DaPXfwX9.css","assets/AvisGoogle-FxRD-GnK.js","assets/BadgeEssai-CXfdRKNX.js","assets/BadgeSuggere-BUeD56BR.js","assets/besoins-CVeFmn-9.js","assets/BesoinsEtRegles-1nLHEa-n.js","assets/BesoinsEtRegles-BLwxGVV5.css","assets/bilan-B-bfPYR0.css","assets/bilan-kRcSx76H.js","assets/BilanMensuel-X8t-5Ult.js","assets/Branches-DySMvGhz.js","assets/bridges-YOfy2QSW.js","assets/Caisse-BfSxQTze.js","assets/caisse-du-soir-C6vPx-E_.css","assets/caisse-du-soir-Db7smvlh.js","assets/Caisses-CWXmOCiO.js","assets/Calendrier-BNFCYnSi.js","assets/campagnes-pur-xMontw3e.js","assets/Carnet-627mTBMq.js","assets/carte-B2h67-UQ.js","assets/carte-_W_-xBPj.css","assets/CarteModal-CcZniR8w.js","assets/CartesCadeaux-BHWUIgkF.js","assets/Catalogue-Bj2n6_n1.js","assets/CentreDeCommande-BJim3c7l.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-C12x11MS.js","assets/certificat-X9mzIALW.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-3cyRfadP.js","assets/chiffre-du-jour-pur-DIRK9tEC.js","assets/ChiffreDesPrestations-DtIzC74R.js","assets/client-MVtIhxIo.js","assets/cloture-du-jour-BblUf8Jv.js","assets/ClotureDuTiroir-Bf_VhhL0.js","assets/Coffre-B1ORNanX.js","assets/collecte-mtn-pur-Bq3uWgWT.js","assets/components-BJtD3t3E.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-Dl0BLnNZ.js","assets/Comptes-BC_IxsN7.js","assets/consultation-B50jVtLm.js","assets/consultation-CRW6QcWf.css","assets/Consultations-DED9zYbN.js","assets/Consultations-DiE-2_mG.css","assets/consultNotes-BCyqmwZ4.js","assets/Conversations-D4WwB5Zo.css","assets/Conversations-xWO6sgtc.js","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-BZfHrbXd.js","assets/currency-Cd0clE4P.js","assets/Customers-s4EyKz84.js","assets/Dashboard-B2x7VsE_.css","assets/Dashboard-DA_6Jf-3.js","assets/dates-DI_-ehxX.js","assets/Demandes-BV-eThz5.js","assets/DepenseEnUnePhrase-BCEVhGJd.js","assets/DepenseEnUnePhrase-BIGRlGqP.css","assets/Depenses-C0plS_fS.js","assets/depenses-saisie-CDOJAUaK.js","assets/devis-remis-BNK52ED5.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-CUOJxSpC.js","assets/diagnostics-au-trone-B92kYwov.js","assets/Dictee-C-pUYYFA.css","assets/Dictee-D4qYgh0l.js","assets/dictee-pur-f0ByztaW.js","assets/Discussions-C0oBWglZ.js","assets/echappe-html-pur-gEhHOM07.js","assets/EditeurDesOffres-DnD0O5CK.js","assets/Encaissements-D_Yue0Cn.js","assets/enfants-C_0sDUNR.js","assets/Engagements-CaGhLcPT.js","assets/Engagements-Cj5S9MhG.css","assets/engagements-coffre-C41zGZo_.js","assets/EntreDeuxSeances-BZsKXwEx.js","assets/es-ATxwBxPA.js","assets/Evaluation-D-RYe91X.js","assets/facture-CNTHJBVx.js","assets/Factures-CBCizTp2.js","assets/FenetreDeLAgent-MXiOMIl2.js","assets/FenetreDesCivilites-BSpsO_Q-.js","assets/FenetreDesCivilites-zfNk1aak.css","assets/FenetreDuPoint-vLoWR1Wm.js","assets/Fil-3xEc36aR.js","assets/finances-C8x7Mn4-.css","assets/fon-D1qQBIzc.js","assets/Fournisseurs-BjSkgLeI.js","assets/fournisseurs-DEXkPfcp.js","assets/foyer-CKVSHNdn.js","assets/Gerard-5ncsBjqx.js","assets/gerard-donnees-DXiqH4Y-.js","assets/Gerard-vo2IWvP3.css","assets/gestes-conversation-BctL787q.js","assets/heures-des-rappels-pur-BWJPB8OP.js","assets/HomeRituals-BBtUIpWd.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-BOkl7QKO.js","assets/ia-centre-CYR8fKdU.js","assets/ia-diagnostic-pur-qGnFEvys.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-tableau-pur-p6UvREJe.js","assets/identite-Hv02Jufa.js","assets/index.es-B0kHpQg0.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-Czsc1cbT.js","assets/jspdf.es.min-D0agzfMh.js","assets/JustePrix-CjZyzzy9.js","assets/kkiapay-aKArdNSc.js","assets/kkiapay-widget-CVmsl9OE.js","assets/Laboratoire-8ywY7-ZC.js","assets/LaJournee-Bn_G0HCt.css","assets/LaJournee-jFlEQoJx.js","assets/le-caissier-pur-BaKFC_3U.js","assets/LesPaiements-C9cEZlne.css","assets/LesPaiements-D6AiVSRO.js","assets/LettresAuDossier-PnqO_Y3H.js","assets/LienMndPay-BfkYWV9f.js","assets/Marketing-7Cy6X3tE.js","assets/MarketingBranche-LiYsmG-9.js","assets/Marque-BrCGAzwU.js","assets/MesPourboires-CENjelyb.css","assets/MesPourboires-CQBipPHI.js","assets/MesTaches-BrGH9-DU.js","assets/MesTaches-Cc4XUDf6.css","assets/momo-C2ZVfV9J.js","assets/MonMois-Du1eoV3H.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/MtnMoMo-BsjylF7I.js","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/objectifs-IVNOJTBD.js","assets/opale-CwNrx6H1.js","assets/oreille-B1AMUmZh.js","assets/paie-du-5-C-l_hUWZ.js","assets/paie-du-5-DeJq-K_U.css","assets/paie-du-5-pur-CPiCK8fv.js","assets/paie-par-mtn-BaThbPgI.js","assets/PaieParMtn-CwVn8SGx.js","assets/paliers-CudXrmq9.js","assets/Parametres-qZ3e4LvK.js","assets/parcours-BCNF2OX7.js","assets/Parrainages-DvrRtsDS.js","assets/Parrainages-gAHAPB_6.css","assets/PassageAvantLeFauteuil-zUMjJxnt.js","assets/pdf-C44soWxs.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/periode-des-pourboires-pur-BUWqfwov.js","assets/Personas-DAUAkoO_.js","assets/Personnel-DYd3WNc1.js","assets/photo-fzCoHiEh.js","assets/pilotage-D8kf1Co8.css","assets/porte-de-l-equipe-_lFjKAUA.js","assets/Pourboires-C4NKsGER.js","assets/Predictions-wgiLTTWb.js","assets/preload-helper-BRe_O-Rg.js","assets/Prestataires-xsBtkyVi.js","assets/Prets-BWPSXhh6.js","assets/PrevisionDuMois-C5cTX7hj.js","assets/PrevisionDuMois-DlFTw3OX.css","assets/Previsions-9BU2Vg1T.css","assets/Previsions-BXpDAAv7.js","assets/previsions-pur-raAQtx2c.js","assets/processus-pur-R6U5QcCi.js","assets/Projets-BVaS-gil.js","assets/projets-C5NF5ZI0.js","assets/Projets-COO7WDEE.css","assets/projets-pur-2ZEMRNDU.js","assets/protocoles-D5k3R8BI.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-D8jwTNMe.js","assets/quiz-5qMPWZVi.js","assets/Rapport-DGFYLMqe.js","assets/Recommandations-BbRGAYDZ.js","assets/regler-CYpkySof.js","assets/regler-DHR_B1Dm.css","assets/regler-par-fedapay-pur-G8CEJdGn.js","assets/relances-pur-BacTXlI2.js","assets/releve-des-avis-BZepcNJ1.js","assets/SalonFoyer-CB8rnLJ9.js","assets/secretariat-admin-D7ve126K.js","assets/Secretariat-BWWv9sIh.js","assets/Secretariat-Cy79Zw30.css","assets/Signatures-CPS6WTfe.js","assets/SignerUnPdf-DjhedcbG.js","assets/Synthese-Cd85r2ub.js","assets/SyntheseGraphes-CyDdI247.js","assets/systeme-TPy-pF7j.css","assets/Tableau-DEyctaEE.js","assets/temps-DAUE149A.js","assets/Textes-D-bkNAn5.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-CkDzpGy0.css","assets/tiroirs-DiD4aXWr.js","assets/trone-BNNV4MAH.css","assets/trone-Mk_snx4R.js","assets/useAudiences-BmlGI4Mv.js","assets/useClotureDuJour-B04WFQKw.js","assets/visios-Bq7CH0_Z.js","assets/Vitrine-BCrCCjRx.js","assets/Vitrine-BWilTqQJ.css","assets/_admin-BGYeKnav.js","assets/_contrat-CmL8xVQ9.js","assets/_reuni-B_N4wx-c.js","assets/_shared-cQyskzEJ.js","assets/_signature-DFwm68XP.js","assets/_ui-BrUDlmuM.css","assets/_ui-CKKa4sk7.js"];
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
