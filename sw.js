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
const BUILD = "20261106085119";
const A_GARDER = ["./","assets/abonnements-BvqtSXvH.js","assets/Abonnements-DI8c-JyR.js","assets/Academie-ePLvyGcQ.js","assets/Acces-Cftc2d9G.js","assets/AFaire-Cv-utlQu.js","assets/afaire-Du8HwOf9.js","assets/Agents-BPwo2U39.js","assets/agents-donnees-DQh7__pm.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-DjZt_Nlc.js","assets/Appels-JXseVcH8.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/Assistants-D9i2Xwmg.css","assets/Assistants-VAvjs1Qv.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/AtelierDesContenus-GryDQsfM.js","assets/Audience-D1_Lo6RU.js","assets/Aujourdhui-CNxEWZQy.js","assets/avant-le-fauteuil-lecture-CE8X-oSJ.js","assets/AvantLeFauteuil-De7LxaaX.js","assets/avis-fiches-Bbv3_7z1.js","assets/AvisGoogle-DaPXfwX9.css","assets/AvisGoogle-DpeFHUqf.js","assets/bilan-B-bfPYR0.css","assets/bilan-DqQ4WWYp.js","assets/BilanMensuel-ClOTWmwg.js","assets/Branches-DlHX78__.js","assets/bridges-CxLJ_1SY.js","assets/Caisse-Dt9ie_Jm.js","assets/caisse-du-soir-BVTIPUK8.js","assets/caisse-du-soir-C6vPx-E_.css","assets/Caisses-DF9O9T0I.js","assets/Calendrier-B3Yr129v.js","assets/campagnes-pur-DUKHmJfa.js","assets/Carnet-DVGmKStJ.js","assets/carte-DciK02yo.js","assets/carte-_W_-xBPj.css","assets/CarteModal-BInes4oq.js","assets/CartesCadeaux-DLdSNqg5.js","assets/Catalogue-DJVna7Gk.js","assets/CentreDeCommande-CPiyc03_.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-D-fBpDRU.js","assets/certificat-74K9aVkt.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-BRtCnycq.js","assets/chiffre-du-jour-pur-BQu_fbBe.js","assets/ChiffreDesPrestations-Cwhueis2.js","assets/client-DnKTzhZo.js","assets/cloture-du-jour-BedxQLvn.js","assets/ClotureDuTiroir-D-pGBSk-.js","assets/Coffre-DScTokuf.js","assets/components-V9rc9RB8.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-DyCinLkf.js","assets/Comptes-9qjQVoPN.js","assets/consultation-CM7mj7p2.js","assets/consultation-CRW6QcWf.css","assets/Consultations-COhik6FG.js","assets/consultNotes-CvDTYbYv.js","assets/Conversations-D0522s08.js","assets/Conversations-D4WwB5Zo.css","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-DHBAgoyB.js","assets/currency-qfIhGmrs.js","assets/Customers-UnpRkMTd.js","assets/Dashboard-B2x7VsE_.css","assets/Dashboard-CCKFuka1.js","assets/dates-BJO2EQKo.js","assets/Demandes-Bj5IVMtD.js","assets/DepenseEnUnePhrase-BIGRlGqP.css","assets/DepenseEnUnePhrase-pEuK9uJ_.js","assets/Depenses-D9y5s1NM.js","assets/depenses-saisie-DbgrupBY.js","assets/dernier-message-pur-CBYWnq8m.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-OSR3wWSw.js","assets/diagnostics-au-trone-DZprcdXF.js","assets/Dictee-D2P9yM7v.css","assets/Dictee-DQb-XQfA.js","assets/dictee-pur-Bjcl4_NC.js","assets/Discussions-yQQkRd4O.js","assets/EditeurDesOffres-DC1H6xGi.js","assets/Encaissements-wmBqe3tJ.js","assets/enfants-BkKqel3z.js","assets/Engagements-Cj5S9MhG.css","assets/engagements-coffre-sHaKChbF.js","assets/Engagements-rOrf2hIK.js","assets/EntreDeuxSeances-SkPLtxyj.js","assets/Evaluation-DOrMgdJy.js","assets/Factures-Bzfw8wmA.js","assets/FenetreDesCivilites-D09iSaIZ.js","assets/FenetreDesCivilites-zfNk1aak.css","assets/FenetreDuPoint-Bj32KP4T.js","assets/Fil-DgyzGvf8.js","assets/finances-BMFnlkRx.css","assets/fon-xbPIoPhi.js","assets/Fournisseurs-BPlI2FTS.js","assets/fournisseurs-CiZFDSVW.js","assets/foyer-B89m61GB.js","assets/Gerard-BYS_oFLZ.js","assets/Gerard-CP3QOjfk.css","assets/gerard-donnees-DLCnopNn.js","assets/gestes-conversation-Dv29ebVt.js","assets/HomeRituals-Dh1VvuRz.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-DCkJNEpq.js","assets/ia-centre-CPw2W7Js.js","assets/ia-diagnostic-pur-BBLrGY5l.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-tableau-pur-CSRjGtTf.js","assets/identite-DH6OCAAB.js","assets/index-CLlIEanG.js","assets/index.es-CcX7Df-y.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-_2tu0eKG.js","assets/jspdf.es.min-B-PcoJ2C.js","assets/JustePrix-GkKvrB5-.js","assets/kkiapay-BE4fAv3R.js","assets/kkiapay-widget-DnUhUNd4.js","assets/Laboratoire-D7XGwM_D.js","assets/LaJournee-Bn_G0HCt.css","assets/LaJournee-DuKkFnh_.js","assets/LesPaiements-BvdfOCbQ.css","assets/LesPaiements-P4DNsaKE.js","assets/LettresAuDossier-90yFRe7p.js","assets/LienMndPay-BJ8iISDJ.js","assets/Marketing-DeoY6KNw.js","assets/MarketingBranche-Boj3yyo9.js","assets/Marque-kHLJxNSX.js","assets/MesPourboires-Cf2Wi6Xh.js","assets/MesPourboires-D9I_9rZf.css","assets/MesTaches-Be-367-2.js","assets/MesTaches-Cc4XUDf6.css","assets/momo-C2ZVfV9J.js","assets/MonMois-Bc_Cagf0.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-BlQDTQXR.js","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/opale-BwDwxDDf.js","assets/oreille-B1AMUmZh.js","assets/paie-du-5-DeJq-K_U.css","assets/paie-du-5-pur-BfyR11gg.js","assets/paie-du-5-_C87_mPV.js","assets/PaieParMtn-_crrhOZn.js","assets/paliers-DoMttsYj.js","assets/Parametres-2_TI2OJg.js","assets/parcours-C3yZkRro.js","assets/Parrainages-B2HDinLC.js","assets/Parrainages-gAHAPB_6.css","assets/PassageAvantLeFauteuil-BO4E-bMs.js","assets/pdf-B32JZdXe.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/Personas-B7CPERjK.js","assets/Personnel-CK_VvRvl.js","assets/photo-iEhGKKtp.js","assets/pilotage-D8kf1Co8.css","assets/Pourboires-DWj8sOwD.js","assets/Predictions-DlrTrINp.js","assets/Prestataires-BowKhby_.js","assets/Prets-BZIyCGqF.js","assets/PrevisionDuMois-B29SpbE6.js","assets/PrevisionDuMois-DlFTw3OX.css","assets/Previsions-Dm0YJte9.js","assets/previsions-pur-CV9Cx6Gz.js","assets/Previsions-r4v19Anp.css","assets/processus-pur-R6U5QcCi.js","assets/projets-B2uaSgct.js","assets/Projets-BAMfnolz.js","assets/Projets-COO7WDEE.css","assets/projets-pur-2ZEMRNDU.js","assets/protocoles-BtZ93SjJ.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-D6SeFFz6.js","assets/qualification-CTpOzXjP.js","assets/quiz-5qMPWZVi.js","assets/Rapport-DOFD6rDW.js","assets/Recommandations-CPXgmNGm.js","assets/regler-BF31dQtC.js","assets/regler-C5hcM02_.css","assets/regler-la-seance-serveur-Bs6rzqZX.js","assets/relances-pur-lwRTXc5E.js","assets/releve-des-avis-BvmiiZP9.js","assets/SalonFoyer-DaDW8zPK.js","assets/secretariat-admin-D3asiy_E.js","assets/Secretariat-Cy79Zw30.css","assets/Secretariat-DIYZ8gqz.js","assets/Signatures-DBY8Wc2v.js","assets/SignerUnPdf-B9rMSRw_.js","assets/Synthese-Hs406HlP.js","assets/SyntheseGraphes-CV2sP5z6.js","assets/systeme-TPy-pF7j.css","assets/Tableau-BkzyqQMs.js","assets/temps-C_zKZXL8.js","assets/Textes-CamkUv-m.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-CkDzpGy0.css","assets/tiroirs-DHWO-bks.js","assets/trone-BBlwNDFH.js","assets/trone-DQVzvvmA.css","assets/useAudiences-BraB0xyG.js","assets/useClotureDuJour-D5owByAF.js","assets/Vitrine-BrdMFrXZ.js","assets/Vitrine-BWilTqQJ.css","assets/_admin-D0ePsSpv.js","assets/_contrat-B6ITTuL1.js","assets/_heures-Dmd2uKL4.js","assets/_reuni-DJ6fFJu9.js","assets/_shared-Cq4RmRoo.js","assets/_signature-D7Q7lCmG.js","assets/_ui-BrUDlmuM.css","assets/_ui-BTAcKkvs.js"];
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
