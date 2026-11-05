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
const BUILD = "20261105113628";
const A_GARDER = ["./","assets/abonnements-BkKMWuLe.js","assets/Abonnements-C047Qo32.js","assets/Academie-CVne1poO.js","assets/Acces-44_RqsgE.js","assets/afaire-BAxtcqxA.js","assets/AFaire-CPeMt5r2.js","assets/Agents-CM5-l4Ce.js","assets/agents-donnees-DLH1fWdw.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-CIkuDqXb.js","assets/Appels-CMm2sR09.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/Assistants-B0bK5fsD.js","assets/Assistants-BOcxTwZO.css","assets/AtelierDesContenus-D0JvljYL.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/Audience-CcWVLHOu.js","assets/Aujourdhui-DlC7tU_8.js","assets/avant-le-fauteuil-lecture-C_01zy7Q.js","assets/AvantLeFauteuil-C72Itaay.js","assets/avis-fiches-DtFosvdP.js","assets/AvisGoogle-DaPXfwX9.css","assets/AvisGoogle-DisYDk0C.js","assets/bilan-B-bfPYR0.css","assets/bilan-BTkiEeZ1.js","assets/BilanMensuel-BKigUvIn.js","assets/Branches-CGSTfhMV.js","assets/bridges-BKoBVOb5.js","assets/Caisse-BqWB-whD.js","assets/caisse-du-soir--xongj9P.js","assets/Caisses-tzWFHxAB.js","assets/Calendrier-Ca2oeGIG.js","assets/campagnes-pur-BZW5L1wF.js","assets/Carnet-BdE-8vSw.js","assets/carte-BNq4TkYr.js","assets/carte-_W_-xBPj.css","assets/CarteModal-DgdbU4Jb.js","assets/CartesCadeaux-wuQVQsf4.js","assets/Catalogue-x8n9376_.js","assets/CentreDeCommande--CwwO7s7.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-BcBAunCD.js","assets/certificat-D9egjd0q.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-DRmFIwOh.js","assets/chiffre-du-jour-pur-D-_sUVtP.js","assets/ChiffreDesPrestations-D9WBPHTJ.js","assets/client-DLn703R7.js","assets/cloture-du-jour-CzAxV2wd.js","assets/ClotureDuTiroir-C6vPx-E_.css","assets/ClotureDuTiroir-D-mpKYfc.js","assets/Coffre-DbAS8OCu.js","assets/components-MOiY-SSV.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-5fLvo9b4.js","assets/Comptes-BPBHNLJP.js","assets/consultation-CRW6QcWf.css","assets/consultation-G78kEPHz.js","assets/Consultations-y07e-t6a.js","assets/consultNotes-DclMfR9O.js","assets/Conversations-B-kiTf2R.js","assets/Conversations-D4WwB5Zo.css","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-C2eERZNG.js","assets/currency-qfIhGmrs.js","assets/Customers-CSwAkLPg.js","assets/Dashboard-B2x7VsE_.css","assets/Dashboard-CNx5fubP.js","assets/dates-cbVJ6bJG.js","assets/Demandes-DettfTrQ.js","assets/DepenseEnUnePhrase-BIGRlGqP.css","assets/DepenseEnUnePhrase-DGLH_8Sc.js","assets/Depenses-CB8rLXQY.js","assets/depenses-saisie-CVd9p4wG.js","assets/dernier-message-pur-CBYWnq8m.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-YZS2LACH.js","assets/diagnostics-au-trone-D1TUdFsE.js","assets/Dictee-Bma2HQZm.js","assets/Dictee-D2P9yM7v.css","assets/dictee-pur-Cdt7Dfvm.js","assets/Discussions-S7F2EYQt.js","assets/EditeurDesOffres-BlMXxytc.js","assets/Encaissements-C-VOO3BX.js","assets/enfants-6Mqwclq4.js","assets/Engagements-C64s0dOg.js","assets/Engagements-Cj5S9MhG.css","assets/EntreDeuxSeances-CTIb7e6N.js","assets/Evaluation-BkosOMj_.js","assets/Factures-BMx2KVgQ.js","assets/FenetreDesCivilites-Da_v9muW.js","assets/FenetreDesCivilites-zfNk1aak.css","assets/FenetreDuPoint-CwcHscF6.js","assets/Fil-BE37PNMA.js","assets/finances-BMFnlkRx.css","assets/fon-DaOX85j9.js","assets/Fournisseurs-CViuwXBl.js","assets/fournisseurs-HDF2SV3k.js","assets/foyer-DBcleyU-.js","assets/Gerard-BeXyOK1l.js","assets/Gerard-CP3QOjfk.css","assets/gerard-donnees-C0y2u5uO.js","assets/gestes-conversation-Cj2JALUG.js","assets/HomeRituals-DzJY0sRP.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-DSmGFAaI.js","assets/ia-centre-DHaaLmht.js","assets/ia-diagnostic-pur-BBLrGY5l.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-tableau-pur-CSRjGtTf.js","assets/identite-DwbqtGyP.js","assets/index-C3TwiQuu.js","assets/index.es-u7YZo4q_.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-BXzt2K5c.js","assets/jspdf.es.min-CE16f1VU.js","assets/JustePrix-C6UT1thI.js","assets/kkiapay-CnWjsCmk.js","assets/kkiapay-widget-DnUhUNd4.js","assets/Laboratoire-pwO_u32z.js","assets/LaJournee-BiRIAZWx.js","assets/LaJournee-DNg04cPb.css","assets/LettresAuDossier-uB7_LSAQ.js","assets/LienMndPay-BOkNCXeW.js","assets/Marketing-_VyD6-ar.js","assets/MarketingBranche-CKCTZ49L.js","assets/Marque-CtftFMeC.js","assets/MesPourboires-BrOeVInF.js","assets/MesPourboires-D9I_9rZf.css","assets/MesTaches-Bmpab_hw.js","assets/MesTaches-Cc4XUDf6.css","assets/momo-C2ZVfV9J.js","assets/MonMois-CRtIvlzp.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-BtShel3Y.js","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/opale-BIl7CdSD.js","assets/paie-du-5-DIpy8pFw.css","assets/paie-du-5-DVy7el6k.js","assets/paliers-BM7NJD3I.js","assets/Parametres-CoswJQ4I.js","assets/parcours-BuXvR73I.js","assets/Parrainages-gAHAPB_6.css","assets/Parrainages-K3rIL9uC.js","assets/PassageAvantLeFauteuil-BlUuZ8jB.js","assets/pdf-BPhYYU4-.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/Personas-vpH9Mq10.js","assets/Personnel-BqIRge2X.js","assets/photo-CWEJ1-QA.js","assets/pilotage-D8kf1Co8.css","assets/Pourboires-CL1dyQgn.js","assets/Predictions-BQ-Rq81m.js","assets/Prestataires-CdVGRCpp.js","assets/Prets-BZWwIf-j.js","assets/PrevisionDuMois-DlFTw3OX.css","assets/PrevisionDuMois-tlg2ceqS.js","assets/Previsions-CRini9QL.js","assets/previsions-pur-DR8i8QOL.js","assets/Previsions-r4v19Anp.css","assets/processus-pur-R6U5QcCi.js","assets/projets-Cd5ZJtL-.js","assets/Projets-Cll7segn.js","assets/Projets-COO7WDEE.css","assets/projets-pur-2ZEMRNDU.js","assets/protocoles-BgssPVRr.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-Bbt58Y1l.js","assets/qualification-CZZc4_cv.js","assets/quiz-5qMPWZVi.js","assets/Rapport-Brg_1VVC.js","assets/Recommandations-D9kuZftG.js","assets/regler-C5hcM02_.css","assets/regler-et6NyWrR.js","assets/regler-la-seance-serveur-Bs6rzqZX.js","assets/relances-pur-lwRTXc5E.js","assets/releve-des-avis-XJbc8Jc0.js","assets/SalonFoyer-c8gV3QRa.js","assets/secretariat-admin-DL1r-mIO.js","assets/Secretariat-BhFhH1zc.js","assets/Secretariat-Cy79Zw30.css","assets/Signatures-Z0FC31Ci.js","assets/SignerUnPdf-BU5TEG2W.js","assets/Synthese-YKtBML1Y.js","assets/SyntheseGraphes-DMXp81Cd.js","assets/systeme-TPy-pF7j.css","assets/Tableau-DLw1Wy0p.js","assets/temps-3frhFRlP.js","assets/Textes-DLpOzRbT.css","assets/Textes-_FBsECcx.js","assets/tiroirs-CkDzpGy0.css","assets/tiroirs-_Qy4Ha5p.js","assets/trone-DQVzvvmA.css","assets/trone-DUK0DMG0.js","assets/useAudiences-DkqPwTNN.js","assets/useClotureDuJour-DqrujHbo.js","assets/Vitrine-BWilTqQJ.css","assets/Vitrine-CWyxvTyl.js","assets/_admin-CBNBL0Bj.js","assets/_contrat-CjyoN7AH.js","assets/_heures-H8pcm3iW.js","assets/_reuni-DJFv_1x4.js","assets/_shared-D-nc2IIz.js","assets/_signature-DLDcl5E8.js","assets/_ui-BPs94Nyq.js","assets/_ui-BWMA-PlM.css"];
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
