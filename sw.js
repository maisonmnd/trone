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
const BUILD = "20261111094821";
const A_GARDER = ["./","assets/abonnements-CQTthFt9.js","assets/Abonnements-C_dQDuLc.js","assets/Abonnements-DTY7p2DH.css","assets/Academie-DZC4NxbU.js","assets/Acces-C9n1fkhg.js","assets/afaire-BtWhWBW_.js","assets/AFaire-o_oGK0FN.js","assets/Agents-CbK961tj.js","assets/agents-donnees-DihV7-1W.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-C2r8aU3m.js","assets/Appels-BvWQ7799.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/Assistants-CITFL448.js","assets/Assistants-D9i2Xwmg.css","assets/AtelierDesContenus-D3-p6F2A.css","assets/AtelierDesContenus-Dkkpk9mp.js","assets/Audience-XDwUj4xG.js","assets/Aujourdhui-DQ-JIBuF.js","assets/avant-le-fauteuil-lecture-B041ol0u.js","assets/AvantLeFauteuil--EhsEu-L.js","assets/avis-fiches-DbZjWgQT.js","assets/AvisGoogle-DaPXfwX9.css","assets/AvisGoogle-DCRbKSTx.js","assets/BadgeEssai-Dr87nQEJ.js","assets/bilan-B-bfPYR0.css","assets/bilan-CtNB3b-k.js","assets/BilanMensuel-BB8Z4Xgx.js","assets/Branches-B_C8DGuI.js","assets/bridges-Ds8TrQZ2.js","assets/caisse-du-soir-0U6O0_dD.js","assets/caisse-du-soir-C6vPx-E_.css","assets/Caisse-Smxj4YHW.js","assets/Caisses-B71axuli.js","assets/Calendrier-sprbg2IH.js","assets/campagnes-pur-DptTIOEa.js","assets/Carnet-DNwqaKIt.js","assets/carte-DOVsqxxJ.js","assets/carte-_W_-xBPj.css","assets/CarteModal-Cs_IvRO-.js","assets/CartesCadeaux-DDOsUwJQ.js","assets/Catalogue-C8cfqCNB.js","assets/CentreDeCommande-BvkI2a9z.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-D5jzHeYM.js","assets/certificat-Di2O0TJO.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-DTsL9Vmg.js","assets/chiffre-du-jour-pur-DZ5mSr8o.js","assets/ChiffreDesPrestations-DsI8_1K3.js","assets/client-BSJTJJw3.js","assets/cloture-du-jour-DmsewWCf.js","assets/ClotureDuTiroir-CwYx6B59.js","assets/Coffre-D22vjhZf.js","assets/components-mnSpUj3m.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-Dt3_1lQC.js","assets/Comptes-BYkQd4qu.js","assets/consultation-CRW6QcWf.css","assets/consultation-g_al1lm1.js","assets/Consultations-BZDlw7lR.js","assets/consultNotes-ASUfApHc.js","assets/Conversations-CQi8eUTo.js","assets/Conversations-D4WwB5Zo.css","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-BEMmamk0.js","assets/currency-qfIhGmrs.js","assets/Customers-C3kh_ghY.js","assets/Dashboard-B2x7VsE_.css","assets/Dashboard-CkCYn-no.js","assets/dates-Cpd0-ZOs.js","assets/Demandes-C0drwtB5.js","assets/DepenseEnUnePhrase-30beQ8QK.js","assets/DepenseEnUnePhrase-BIGRlGqP.css","assets/Depenses-BZRuVqSh.js","assets/depenses-saisie-D70UB8uI.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-BYoOpAcb.js","assets/diagnostics-au-trone-CQgtGLsx.js","assets/Dictee-C-WIWvym.js","assets/Dictee-D2P9yM7v.css","assets/dictee-pur-CR2VLMO2.js","assets/Discussions-D6bALn0s.js","assets/EditeurDesOffres-vsyDSuE1.js","assets/Encaissements-Cu0IvEGz.js","assets/enfants-Bk0c4qiH.js","assets/Engagements-C1mehTg3.js","assets/Engagements-Cj5S9MhG.css","assets/engagements-coffre-C6Eb_Q5U.js","assets/EntreDeuxSeances-B_ndcilb.js","assets/Evaluation-Bq6mtifU.js","assets/Factures-Daia2kSF.js","assets/FenetreDesCivilites-uubMQxvg.js","assets/FenetreDesCivilites-zfNk1aak.css","assets/FenetreDuPoint-WPUWzeLA.js","assets/Fil-CcoIOJ3g.js","assets/finances-BMFnlkRx.css","assets/fon-fQRNGDiy.js","assets/Fournisseurs-C5-4guGJ.js","assets/fournisseurs-XUv6qn9e.js","assets/foyer-Df-H_NyQ.js","assets/Gerard-BwuCgBSF.js","assets/Gerard-Cgj-zsJh.css","assets/gerard-donnees-DA0-sPHu.js","assets/gestes-conversation-C9zMQ2Sq.js","assets/HomeRituals-C9c7mb8U.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-DP4x_L3Y.js","assets/ia-centre-DJM--nIV.js","assets/ia-diagnostic-pur-BBLrGY5l.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-tableau-pur-CSRjGtTf.js","assets/identite-Dv3-XL1_.js","assets/index-DdetGW-u.js","assets/index.es-jFaEZT3v.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-YVozx1YQ.js","assets/jspdf.es.min-CgXXi_nt.js","assets/JustePrix-u-iV2UEi.js","assets/kkiapay-DWbevIYG.js","assets/kkiapay-widget-DnUhUNd4.js","assets/Laboratoire-DpWaoLGb.js","assets/LaJournee-BdYi4P7-.js","assets/LaJournee-Bn_G0HCt.css","assets/LesPaiements-BvdfOCbQ.css","assets/LesPaiements-Cb0vprDe.js","assets/LettresAuDossier-Dg4Z8xKX.js","assets/LienMndPay-DZXmWdxq.js","assets/Marketing-Xv3-5Qyv.js","assets/MarketingBranche-lhMqOZor.js","assets/Marque-Dp6aqPhb.js","assets/MesPourboires-CENjelyb.css","assets/MesPourboires-N7-3ljbr.js","assets/MesTaches-Cc4XUDf6.css","assets/MesTaches-DNrxreQr.js","assets/momo-C2ZVfV9J.js","assets/MonMois-BDJ5DwNe.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-C6ZlBW1z.js","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/opale-DYrT3Ykt.js","assets/oreille-B1AMUmZh.js","assets/paie-du-5-BWsAn_M_.js","assets/paie-du-5-DeJq-K_U.css","assets/paie-du-5-pur-LuUvAq9j.js","assets/PaieParMtn-CORZboVZ.js","assets/paliers-D7Pu-_Qv.js","assets/Parametres-CNhg63NJ.js","assets/parcours-DpelpEZp.js","assets/Parrainages-CYDcBJiC.js","assets/Parrainages-gAHAPB_6.css","assets/PassageAvantLeFauteuil-BM5xf7Vl.js","assets/pdf-DT8RlO36.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/periode-des-pourboires-pur-BUWqfwov.js","assets/Personas-BKvlGetC.js","assets/Personnel-CxWIRODP.js","assets/photo-Deu_WsN9.js","assets/pilotage-D8kf1Co8.css","assets/Pourboires-C2nu8MMM.js","assets/Predictions-BlgnF7LX.js","assets/Prestataires-DgzkyESC.js","assets/Prets-Dci3O2Xt.js","assets/PrevisionDuMois-CwPBKjMB.js","assets/PrevisionDuMois-DlFTw3OX.css","assets/Previsions-0N9C2v4N.js","assets/previsions-pur-C6fvWvHX.js","assets/Previsions-r4v19Anp.css","assets/processus-pur-R6U5QcCi.js","assets/Projets-COH2U4VG.js","assets/Projets-COO7WDEE.css","assets/projets-F4WtxsEr.js","assets/projets-pur-2ZEMRNDU.js","assets/protocoles-KAlNpgkf.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-Bf99t8wp.js","assets/qualification-bKMXKem0.js","assets/quiz-5qMPWZVi.js","assets/Rapport-CwHRyiy6.js","assets/Recommandations-CrnBxxuc.js","assets/regler-BDa_Gu_u.js","assets/regler-C5hcM02_.css","assets/regler-la-seance-serveur-Bs6rzqZX.js","assets/relances-pur-lwRTXc5E.js","assets/releve-des-avis-CGdFR7S6.js","assets/SalonFoyer-BHnz1VFD.js","assets/secretariat-admin-C4pztWwZ.js","assets/Secretariat-CsJCbXGi.js","assets/Secretariat-Cy79Zw30.css","assets/Signatures-CYlO4aMr.js","assets/SignerUnPdf-C1m-8KtE.js","assets/Synthese-3F88ugH6.js","assets/SyntheseGraphes-D0pf7KVT.js","assets/systeme-TPy-pF7j.css","assets/Tableau-sl4x8m-L.js","assets/temps-Tr_HSLDV.js","assets/Textes-DLpOzRbT.css","assets/Textes-DN3XUpGz.js","assets/tiroirs-CkDzpGy0.css","assets/tiroirs-uUan-ZL_.js","assets/trone-CQ2DUl_d.css","assets/trone-DlxmpFvK.js","assets/useAudiences-rYZIB_JD.js","assets/useClotureDuJour-CYe1y02X.js","assets/Vitrine-Br3AjMAA.js","assets/Vitrine-BWilTqQJ.css","assets/_admin-DptcqOuA.js","assets/_contrat-2h7cbq33.js","assets/_heures-DCYdkur2.js","assets/_reuni-CwDMn1-s.js","assets/_shared-uJbyLwy-.js","assets/_signature-D5OuEIUm.js","assets/_ui-BrUDlmuM.css","assets/_ui-NURzb5mR.js"];
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
