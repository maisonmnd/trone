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
const BUILD = "20261105171008";
const A_GARDER = ["./","assets/abonnements-CEVAtbyR.js","assets/Abonnements-ZOpaZj-D.js","assets/Academie-BEC6SiNM.js","assets/Acces-D6TUhCUn.js","assets/AFaire-DEhpwZPu.js","assets/afaire-XfFKLbVc.js","assets/Agents-Da_RHdKO.js","assets/agents-donnees-KhmCZ9bu.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-Cj0Q2y4X.js","assets/Appels-CdlCMQBw.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/Assistants-D9i2Xwmg.css","assets/Assistants-Dg_qP1Ni.js","assets/AtelierDesContenus-C0abwaa6.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/Audience-COimzYL9.js","assets/Aujourdhui-Dsz9BfJL.js","assets/avant-le-fauteuil-lecture-D1yAB1Pf.js","assets/AvantLeFauteuil-C9wxbabg.js","assets/avis-fiches-Czfa7f8t.js","assets/AvisGoogle-BjYfXIF_.js","assets/AvisGoogle-DaPXfwX9.css","assets/bilan-B-bfPYR0.css","assets/bilan-CpsY6k99.js","assets/BilanMensuel-Df0h7EMO.js","assets/Branches-_sJ_-n_2.js","assets/bridges-BLil4xA8.js","assets/Caisse-D7bOhcjf.js","assets/caisse-du-soir-C6vPx-E_.css","assets/caisse-du-soir-DvWKF8SI.js","assets/Caisses-G3XDP_JF.js","assets/Calendrier-DmwLX_4d.js","assets/campagnes-pur-BOgIzTiq.js","assets/Carnet-B_Bmc338.js","assets/carte-4CWPHoLt.js","assets/carte-_W_-xBPj.css","assets/CarteModal-CygYLp2w.js","assets/CartesCadeaux-B9GbgU2n.js","assets/Catalogue-C1aia1QB.js","assets/CentreDeCommande-CCSePybR.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-dwsq0rAS.js","assets/certificat-B40HKpAx.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-O92wubt9.js","assets/chiffre-du-jour-pur-CfjCLwTx.js","assets/ChiffreDesPrestations-CvZGBKuH.js","assets/client-C4rC-kQv.js","assets/cloture-du-jour-BJcAbVPE.js","assets/ClotureDuTiroir-trx3S8IW.js","assets/Coffre-C_IBgpwX.js","assets/components-Bhjqe9s9.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-BwAhPnSd.js","assets/Comptes-BhVJJkGj.js","assets/consultation-BYBqFZEz.js","assets/consultation-CRW6QcWf.css","assets/Consultations-F3tpU-ao.js","assets/consultNotes-DshRrOdi.js","assets/Conversations-D4WwB5Zo.css","assets/Conversations-DqmzFrCp.js","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-VHXLbMOI.js","assets/currency-qfIhGmrs.js","assets/Customers-CsmFnlje.js","assets/Dashboard-B2x7VsE_.css","assets/Dashboard-rIp2o8WU.js","assets/dates-BwN8fSR5.js","assets/Demandes-DHMjLo8H.js","assets/DepenseEnUnePhrase-BIGRlGqP.css","assets/DepenseEnUnePhrase-D_gyKyW7.js","assets/Depenses-041Drnbd.js","assets/depenses-saisie-HSuX00Cy.js","assets/dernier-message-pur-CBYWnq8m.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-Bbgynp0W.js","assets/diagnostics-au-trone-Cjy9b4Pt.js","assets/Dictee-Bgn_FhZx.js","assets/Dictee-D2P9yM7v.css","assets/dictee-pur-TrjkaLL5.js","assets/Discussions-BJBkohzj.js","assets/EditeurDesOffres-mbZLZBlr.js","assets/Encaissements-0pGB3wft.js","assets/enfants-GsbocY14.js","assets/Engagements-Cj5S9MhG.css","assets/Engagements-DQIjoQh3.js","assets/EntreDeuxSeances-CxmqhDo9.js","assets/Evaluation-iiN9G1Rh.js","assets/Factures-tFrwxPba.js","assets/FenetreDesCivilites-WK83unJW.js","assets/FenetreDesCivilites-zfNk1aak.css","assets/FenetreDuPoint-DzVhRbxR.js","assets/Fil-B2AMZPV3.js","assets/finances-BMFnlkRx.css","assets/fon-CSmLjpER.js","assets/fournisseurs-BZ2dDXzp.js","assets/Fournisseurs-DbxI1MoT.js","assets/foyer-D4gN7LSD.js","assets/Gerard-CEpu5Wp0.js","assets/Gerard-CP3QOjfk.css","assets/gerard-donnees-CGDnXbX0.js","assets/gestes-conversation-glzoKQJl.js","assets/HomeRituals-CtslehLX.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-BTNZJo53.js","assets/ia-centre-Dlq76xHw.js","assets/ia-diagnostic-pur-BBLrGY5l.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-tableau-pur-CSRjGtTf.js","assets/identite-B13QGpDd.js","assets/index-BBcO1uII.js","assets/index.es-Bestwodz.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-Bu0GDLlS.js","assets/jspdf.es.min-FhvHoofE.js","assets/JustePrix-jiSeHK2P.js","assets/kkiapay-CYtVLd7x.js","assets/kkiapay-widget-DnUhUNd4.js","assets/Laboratoire-B7wz5O81.js","assets/LaJournee-B6PjVxwu.js","assets/LaJournee-Bn_G0HCt.css","assets/LettresAuDossier-alLf4fVi.js","assets/LienMndPay-lQ6_YzB9.js","assets/Marketing-Bv65GP30.js","assets/MarketingBranche-WmBhwP0G.js","assets/Marque-BUGGwU0Y.js","assets/MesPourboires-D9I_9rZf.css","assets/MesPourboires-eZrIJtMq.js","assets/MesTaches-Cc4XUDf6.css","assets/MesTaches-D0nAgthr.js","assets/momo-C2ZVfV9J.js","assets/MonMois-DgmtzbYR.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-8m-enjc8.js","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/opale-DGQaWzIe.js","assets/oreille-B1AMUmZh.js","assets/paie-du-5-DeJq-K_U.css","assets/paie-du-5-Dv3iEdG-.js","assets/paliers-hSmkgjPe.js","assets/Parametres-CLD_grQ6.js","assets/parcours-BHL0hOQB.js","assets/Parrainages-BEVlVKKD.js","assets/Parrainages-gAHAPB_6.css","assets/PassageAvantLeFauteuil-BQ4VDSUs.js","assets/pdf-CvnCQbpG.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/Personas-qnXNz00Y.js","assets/Personnel-3s7uzfNL.js","assets/photo-_CdzhZCZ.js","assets/pilotage-D8kf1Co8.css","assets/Pourboires-Cnopr0Os.js","assets/Predictions-D2FWcPBW.js","assets/Prestataires-DSdVMBo5.js","assets/Prets-CG2Ksiy3.js","assets/PrevisionDuMois-DAMq2R7T.js","assets/PrevisionDuMois-DlFTw3OX.css","assets/Previsions-CN1L86aD.js","assets/previsions-pur-CmnONIq8.js","assets/Previsions-r4v19Anp.css","assets/processus-pur-R6U5QcCi.js","assets/Projets-Bu4rQPWh.js","assets/Projets-COO7WDEE.css","assets/projets-DUc8GsuK.js","assets/projets-pur-2ZEMRNDU.js","assets/protocoles-Bj5rXpmw.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-Clj2APdm.js","assets/qualification-_lkGOvPS.js","assets/quiz-5qMPWZVi.js","assets/Rapport-CY6RO-wz.js","assets/Recommandations-BXmerMEP.js","assets/regler-C5hcM02_.css","assets/regler-D-9pLzC8.js","assets/regler-la-seance-serveur-Bs6rzqZX.js","assets/relances-pur-lwRTXc5E.js","assets/releve-des-avis-D6hXbH_1.js","assets/SalonFoyer-BzAUsXLG.js","assets/secretariat-admin-DzI3mnNG.js","assets/Secretariat-BkjdNV7t.js","assets/Secretariat-Cy79Zw30.css","assets/Signatures-29KpIpJY.js","assets/SignerUnPdf-BUINQURL.js","assets/Synthese-UNgnN7Bc.js","assets/SyntheseGraphes-C_DlLv8E.js","assets/systeme-TPy-pF7j.css","assets/Tableau-jfj-juoR.js","assets/temps-Bp_acxc8.js","assets/Textes-DLpOzRbT.css","assets/Textes-E1BEaUUY.js","assets/tiroirs-Bmd4HDm4.js","assets/tiroirs-CkDzpGy0.css","assets/trone-BRUFU9aU.js","assets/trone-DQVzvvmA.css","assets/useAudiences-DL6OFURE.js","assets/useClotureDuJour-Cg-jUxaq.js","assets/Vitrine-BWilTqQJ.css","assets/Vitrine-CzlQd0OV.js","assets/_admin-CXMCk13T.js","assets/_contrat-DMxNpQZh.js","assets/_heures-JNiYmHNL.js","assets/_reuni-BGRZQRfX.js","assets/_shared-BoU4kuSs.js","assets/_signature-nFTLb-Hm.js","assets/_ui-BiYkt3D-.js","assets/_ui-BWMA-PlM.css"];
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
