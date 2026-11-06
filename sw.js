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
const BUILD = "20261106014251";
const A_GARDER = ["./","assets/Abonnements-B3xo07Cv.js","assets/abonnements-Cexq4OjT.js","assets/Academie-B7iBFAti.js","assets/Acces-DLv1PKJz.js","assets/AFaire-BKX8snIx.js","assets/afaire-DpzUi6gV.js","assets/Agents-C5Ga9Y8M.js","assets/agents-donnees-35yWTl2T.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-CN-tkpjM.js","assets/Appels-C_3UX2a1.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/Assistants-BI0sMlDj.js","assets/Assistants-D9i2Xwmg.css","assets/AtelierDesContenus-D3-p6F2A.css","assets/AtelierDesContenus-DDQy-sAN.js","assets/Audience-B8YVvtaE.js","assets/Aujourdhui-CIxV6ufY.js","assets/avant-le-fauteuil-lecture-BDfSz3kx.js","assets/AvantLeFauteuil-BKMp9Pjl.js","assets/avis-fiches-BipWaOu0.js","assets/AvisGoogle-DaPXfwX9.css","assets/AvisGoogle-V8D4Lw2B.js","assets/bilan-B-bfPYR0.css","assets/bilan-CqClux_e.js","assets/BilanMensuel-QIelZ-F1.js","assets/Branches-DZ4NCPAz.js","assets/bridges-DGQ5Nelk.js","assets/Caisse-B5RYmffP.js","assets/caisse-du-soir-C6vPx-E_.css","assets/caisse-du-soir-D4T_ZRk6.js","assets/Caisses-BH0ejOYa.js","assets/Calendrier-Bpzqqq-F.js","assets/campagnes-pur-CZ7PvskF.js","assets/Carnet-Cf45iEBu.js","assets/carte-C1ZlM0sO.js","assets/carte-_W_-xBPj.css","assets/CarteModal-CXPeFzPY.js","assets/CartesCadeaux-DfGio00J.js","assets/Catalogue-B-bTociN.js","assets/CentreDeCommande-CN61uo8Z.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-CFPYEsp3.js","assets/certificat-DnjErEDZ.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-YBsrVowo.js","assets/chiffre-du-jour-pur-DQj8APZU.js","assets/ChiffreDesPrestations-Kh8ynLVH.js","assets/client-DLWw4CuW.js","assets/cloture-du-jour-Bp0ddttV.js","assets/ClotureDuTiroir-4-DwlgUS.js","assets/Coffre-UJsAzNpR.js","assets/components-0cWcZ2fD.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-CB2LGzhb.js","assets/Comptes-Cgk8Sx1c.js","assets/consultation-CRW6QcWf.css","assets/consultation-D0CSJxbh.js","assets/Consultations-DLpZ0-7K.js","assets/consultNotes-CEIRpGYw.js","assets/Conversations-D4WwB5Zo.css","assets/Conversations-Dc7PN8yA.js","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-TrSEtV1R.js","assets/currency-qfIhGmrs.js","assets/Customers-or0NyRXS.js","assets/Dashboard-B2x7VsE_.css","assets/Dashboard-DdeEX_Lk.js","assets/dates-BLAZQJKY.js","assets/Demandes-CAmfu6Yz.js","assets/DepenseEnUnePhrase-BIGRlGqP.css","assets/DepenseEnUnePhrase-Czwa9bPO.js","assets/Depenses-BUd2ImjP.js","assets/depenses-saisie-B2UM5I3D.js","assets/dernier-message-pur-CBYWnq8m.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-BOAx_IA6.js","assets/diagnostics-au-trone-8BVN5Sqz.js","assets/Dictee-D2P9yM7v.css","assets/Dictee-DAFGHqgn.js","assets/dictee-pur-jIg8x5mR.js","assets/Discussions-uV-ewyK-.js","assets/EditeurDesOffres-D2T_nHNm.js","assets/Encaissements-X7up0UqQ.js","assets/enfants-CL8dLBUA.js","assets/Engagements-Cj5S9MhG.css","assets/engagements-coffre-D7lPcg29.js","assets/Engagements-CyiIRDSw.js","assets/EntreDeuxSeances-CLSotiDN.js","assets/Evaluation-BH3NVswN.js","assets/Factures-CsfEOkZZ.js","assets/FenetreDesCivilites-B8PdE24n.js","assets/FenetreDesCivilites-zfNk1aak.css","assets/FenetreDuPoint-DGupvIa-.js","assets/Fil-B-lXH6sD.js","assets/finances-BMFnlkRx.css","assets/fon-CUvHryOG.js","assets/fournisseurs-BgHG__CD.js","assets/Fournisseurs-k2hdfVyO.js","assets/foyer-CoYcqYMF.js","assets/Gerard-1JIs_cTT.js","assets/Gerard-CP3QOjfk.css","assets/gerard-donnees-wJyNRk0U.js","assets/gestes-conversation-Bfj8MNJn.js","assets/HomeRituals-B5lJdTEx.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-BtJkESKH.js","assets/ia-centre-DaAZ5Q7W.js","assets/ia-diagnostic-pur-BBLrGY5l.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-tableau-pur-CSRjGtTf.js","assets/identite-Cx5CZy9s.js","assets/index-CwOOjoqb.js","assets/index.es-P0lOxSge.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-jNM7WR21.js","assets/jspdf.es.min-GJzDuDc_.js","assets/JustePrix-CW96Iuz8.js","assets/kkiapay-BFl6NUM0.js","assets/kkiapay-widget-DnUhUNd4.js","assets/Laboratoire-_RQ_rLqL.js","assets/LaJournee-Bn_G0HCt.css","assets/LaJournee-oydyTKF4.js","assets/LesPaiements-BvdfOCbQ.css","assets/LesPaiements-YPWhHo4c.js","assets/LettresAuDossier-rIx74f6x.js","assets/LienMndPay-Bcf2NiJg.js","assets/Marketing-zVVgVJsf.js","assets/MarketingBranche-28b_4464.js","assets/Marque-BB1S0QOi.js","assets/MesPourboires-D9I_9rZf.css","assets/MesPourboires-DfC9MhFk.js","assets/MesTaches-BdLHj1d1.js","assets/MesTaches-Cc4XUDf6.css","assets/momo-C2ZVfV9J.js","assets/MonMois-BIVu_bsz.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-C166sF61.js","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/opale-DgwoFcW6.js","assets/oreille-B1AMUmZh.js","assets/paie-du-5-CDDrrljm.js","assets/paie-du-5-DeJq-K_U.css","assets/paie-du-5-pur-B9acpGjT.js","assets/PaieParMtn-BIpMR0KN.js","assets/paliers-BoUfDVY7.js","assets/Parametres-nWZUtPnX.js","assets/parcours-CrU5JayO.js","assets/Parrainages-BZAD27vh.js","assets/Parrainages-gAHAPB_6.css","assets/PassageAvantLeFauteuil-Dc3X0Irs.js","assets/pdf-DvsFJ1Pt.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/Personas-D-WswC1U.js","assets/Personnel-gRl1uCtF.js","assets/photo-BZ68UGP2.js","assets/pilotage-D8kf1Co8.css","assets/Pourboires-DcqLnhxA.js","assets/Predictions-D1XgHATc.js","assets/Prestataires-CPaHMDcT.js","assets/Prets-ChIICdxs.js","assets/PrevisionDuMois-D7qWmGTp.js","assets/PrevisionDuMois-DlFTw3OX.css","assets/Previsions-BKXtQOxh.js","assets/previsions-pur-V-GzOmX9.js","assets/Previsions-r4v19Anp.css","assets/processus-pur-R6U5QcCi.js","assets/projets-BwNfojwO.js","assets/Projets-COO7WDEE.css","assets/Projets-D_ZuWz_l.js","assets/projets-pur-2ZEMRNDU.js","assets/protocoles-C6d9o8Dz.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-D3rNXj-Y.js","assets/qualification-BiRN0090.js","assets/quiz-5qMPWZVi.js","assets/Rapport-DLt5jUVS.js","assets/Recommandations-D5-5WTdX.js","assets/regler-C5hcM02_.css","assets/regler-CXnSATMn.js","assets/regler-la-seance-serveur-Bs6rzqZX.js","assets/relances-pur-lwRTXc5E.js","assets/releve-des-avis-inHITCP1.js","assets/SalonFoyer-B49-R9pX.js","assets/secretariat-admin-D2pVrplD.js","assets/Secretariat-Cy79Zw30.css","assets/Secretariat-DD4cpiiN.js","assets/Signatures-CXWg9TfU.js","assets/SignerUnPdf-I1nmwtok.js","assets/Synthese-DFBTMnWp.js","assets/SyntheseGraphes-Dk3RRnHJ.js","assets/systeme-TPy-pF7j.css","assets/Tableau-D6VSkn-F.js","assets/temps-MulotdxA.js","assets/Textes-Bz7Rg5wt.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-C25oZypY.js","assets/tiroirs-CkDzpGy0.css","assets/trone-BLCoPl1u.js","assets/trone-DQVzvvmA.css","assets/useAudiences-Ccj7cidL.js","assets/useClotureDuJour-BN_UuCec.js","assets/Vitrine-BWilTqQJ.css","assets/Vitrine-LTsyMKjW.js","assets/_admin-Cbhr4bVh.js","assets/_contrat-CLsD0BgW.js","assets/_heures-CFCX1iqm.js","assets/_reuni-ZXBRNsR3.js","assets/_shared-BK68YVcr.js","assets/_signature-DW7M_7LG.js","assets/_ui-BrUDlmuM.css","assets/_ui-CQxJO3R7.js"];
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
