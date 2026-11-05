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
const BUILD = "20261105084812";
const A_GARDER = ["./","assets/abonnements-BMPCoe4j.js","assets/Abonnements-CidTuSNJ.js","assets/Academie-C-lo_ITu.js","assets/Acces-5q3iHAY1.js","assets/afaire-CdubfSPy.js","assets/AFaire-DI5OuDX-.js","assets/agents-donnees-C0nVISZG.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Agents-uftnGHfZ.js","assets/Analytics-CrDyKG9P.js","assets/Appels-CTtUZn5m.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/Assistants-BOcxTwZO.css","assets/Assistants-DTtMo7W_.js","assets/AtelierDesContenus-CHC2Btqf.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/Audience-B3tQqtmE.js","assets/Aujourdhui-DRYFdBhs.js","assets/avant-le-fauteuil-lecture-D8e8xIZ-.js","assets/AvantLeFauteuil-FQY5V_in.js","assets/avis-fiches-rJbX_nUw.js","assets/AvisGoogle-C0cm8SWs.js","assets/AvisGoogle-DaPXfwX9.css","assets/bilan-B-bfPYR0.css","assets/bilan-CEXoZnb5.js","assets/BilanMensuel-D8HA15va.js","assets/Branches-BJ7VFTPn.js","assets/bridges-Jv9OkF9b.js","assets/Caisse-BOUeOB1u.js","assets/caisse-du-soir-DQr07a7r.js","assets/Caisses-DWuSJxtP.js","assets/Calendrier-BXkmDyzc.js","assets/campagnes-pur-DFSuPA7b.js","assets/Carnet-1ljW8D3B.js","assets/carte-B2l1EJMY.js","assets/carte-_W_-xBPj.css","assets/CarteModal-DhuPha48.js","assets/CartesCadeaux-O00wH9sd.js","assets/Catalogue-GwDFqgGO.js","assets/CentreDeCommande-BHLJJPSj.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-bbvzW4Df.js","assets/certificat-CE23E9yD.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-DeVXHT61.js","assets/chiffre-du-jour-pur-Weh_xOea.js","assets/ChiffreDesPrestations-C77IETHP.js","assets/client-s97vrZjS.js","assets/cloture-du-jour-DoYl-TMm.js","assets/ClotureDuTiroir-C6vPx-E_.css","assets/ClotureDuTiroir-D0zPXKbB.js","assets/Coffre-BxwiUkSF.js","assets/components-BoJ3S6zQ.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-O13pmUGc.js","assets/Comptes-DWHAWVWf.js","assets/consultation-CRW6QcWf.css","assets/consultation-Dt65Yfxj.js","assets/Consultations-B6JVtq7e.js","assets/consultNotes-rc_FlFGF.js","assets/Conversations-BocdIlFe.js","assets/Conversations-D4WwB5Zo.css","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-CLV1APZl.js","assets/currency-qfIhGmrs.js","assets/Customers-CzTp2FsY.js","assets/Dashboard-B2x7VsE_.css","assets/Dashboard-Cv2qv7U6.js","assets/dates-DRujX7R2.js","assets/Demandes-_cTUEPY3.js","assets/DepenseEnUnePhrase-BIGRlGqP.css","assets/DepenseEnUnePhrase-DbEOqzeW.js","assets/depenses-saisie-CCw-1KP_.js","assets/Depenses-vcOycP0z.js","assets/dernier-message-pur-CBYWnq8m.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-C1xInwPW.js","assets/diagnostics-au-trone-BQFSub5B.js","assets/Dictee-D2P9yM7v.css","assets/Dictee-DKDlNqai.js","assets/dictee-pur-Cxe7EFwN.js","assets/Discussions-CgjKj-a1.js","assets/EditeurDesOffres-BbY8-hQ6.js","assets/Encaissements-3V1MgqcT.js","assets/enfants-DGthh5CZ.js","assets/Engagements-Cj5S9MhG.css","assets/Engagements-D7ldQHiz.js","assets/EntreDeuxSeances-CRLUmdar.js","assets/Evaluation-BLnYoxxx.js","assets/FacturePrestataire-CNrJgcBt.js","assets/Factures-BIz0LIEw.js","assets/FenetreDesCivilites-Bc5ykF8J.js","assets/FenetreDesCivilites-zfNk1aak.css","assets/FenetreDuPoint-CIuKqUEG.js","assets/Fil-B0kJ-ClC.js","assets/finances-BMFnlkRx.css","assets/fon-DPmz-kQN.js","assets/Fournisseurs-B3PBGt5e.js","assets/fournisseurs-BgWct41K.js","assets/foyer-BbgElG9Y.js","assets/Gerard-CP3QOjfk.css","assets/gerard-donnees-D1qy6ATl.js","assets/Gerard-GUDoNY9o.js","assets/gestes-conversation-CpBe9tn1.js","assets/HomeRituals-HffsuBk6.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-BNz-4mgg.js","assets/ia-centre-CO6GrHnF.js","assets/ia-diagnostic-pur-BBLrGY5l.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-tableau-pur-CSRjGtTf.js","assets/identite-Ci8CiH2a.js","assets/index-5QGnPUli.js","assets/index.es-DNaOo_ID.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-Czc3nC4J.js","assets/jspdf.es.min-DEX7QkZD.js","assets/JustePrix-C3aGGPch.js","assets/kkiapay-3byHpsLv.js","assets/kkiapay-widget-DnUhUNd4.js","assets/Laboratoire-COEMTEbu.js","assets/LaJournee-ChEsYkM_.js","assets/LaJournee-DNg04cPb.css","assets/LettresAuDossier-DDHxu2c2.js","assets/LienMndPay-CMJk6xmC.js","assets/Marketing-BMHH52Ln.js","assets/MarketingBranche-CH0Cfedd.js","assets/Marque-CQPNvgpg.js","assets/MesPourboires-CsEqDQtO.js","assets/MesPourboires-D9I_9rZf.css","assets/MesTaches-BTsUNB-a.js","assets/MesTaches-Cc4XUDf6.css","assets/momo-C2ZVfV9J.js","assets/MonMois-BvMOmEEH.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/objectifs-DZiLIHot.js","assets/opale-z2j34s4p.js","assets/paliers-ByYz6DVu.js","assets/Parametres-D8kMIhyp.js","assets/parcours-Bg8jsEuz.js","assets/Parrainages-Ctu5WtSg.js","assets/Parrainages-gAHAPB_6.css","assets/PassageAvantLeFauteuil-DR2Ufa3_.js","assets/pdf-NhYExcKH.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/Personas-DJ1d5PmH.js","assets/Personnel-4OWdHRyN.js","assets/photo-Ds4FwvE_.js","assets/pilotage-D8kf1Co8.css","assets/Pourboires-CQt0biUY.js","assets/Predictions-CCedYBgP.js","assets/Prestataires-DOsGo-LH.js","assets/Prets-DwoMVMw6.js","assets/PrevisionDuMois-DlFTw3OX.css","assets/PrevisionDuMois-gOhuLv3Z.js","assets/Previsions-CWhkt8vZ.js","assets/previsions-pur-DF-H7c8C.js","assets/Previsions-r4v19Anp.css","assets/processus-pur-R6U5QcCi.js","assets/Projets-COO7WDEE.css","assets/projets-DfSjc1BM.js","assets/Projets-jgwvJbI7.js","assets/projets-pur-2ZEMRNDU.js","assets/protocoles-DyUzkrHn.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-C-iz5me0.js","assets/qualification-P_LDTqnk.js","assets/quiz-5qMPWZVi.js","assets/Rapport-CclLr3qf.js","assets/Recommandations-AqveLPLV.js","assets/regler-C5hcM02_.css","assets/regler-CyDP2m1R.js","assets/regler-la-seance-serveur-Bs6rzqZX.js","assets/relances-pur-lwRTXc5E.js","assets/releve-des-avis-mIFofT15.js","assets/SalonFoyer-Ncv1TTxX.js","assets/secretariat-admin-B5S89Kwe.js","assets/Secretariat-C8otG2Yf.js","assets/Secretariat-Cy79Zw30.css","assets/Signatures-CrGFlDYd.js","assets/SignerUnPdf-bGmhNc_c.js","assets/Synthese-QuDAsRhy.js","assets/SyntheseGraphes-IQYb96TO.js","assets/systeme-TPy-pF7j.css","assets/Tableau-BwqvGnl6.js","assets/temps-DfEnEJhL.js","assets/Textes-DLpOzRbT.css","assets/Textes-DWSAoEwD.js","assets/tiroirs-CkDzpGy0.css","assets/tiroirs-S3agspRu.js","assets/trone-BJNr3Sii.js","assets/trone-DQVzvvmA.css","assets/useAudiences-BVDf77PZ.js","assets/useClotureDuJour-OwvnjPdv.js","assets/Vitrine-BgTJmDxf.js","assets/Vitrine-BWilTqQJ.css","assets/_admin-nNEVapEs.js","assets/_contrat-CoeJG8Fo.js","assets/_heures-BRLQlTdF.js","assets/_reuni-BAAUl-Qt.js","assets/_shared-Cds1MwNW.js","assets/_signature-BHrF2Svh.js","assets/_ui-BvTd0din.js","assets/_ui-BWMA-PlM.css"];
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
