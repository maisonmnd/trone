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
const BUILD = "20261101063328";
const A_GARDER = ["./","assets/abonnements-CejgrFcG.js","assets/Abonnements-O7Q2kZI0.js","assets/Academie-CwnP10mX.js","assets/Acces-BGDzAxEx.js","assets/actions-Db-YX2Rg.js","assets/afaire-C3JXt64o.js","assets/AFaire-D837hqM9.js","assets/Agents-CL-WWnSI.js","assets/agents-donnees-Bd7UY6KC.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-YLMMic4o.js","assets/Appels-PfmgiTMq.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/Assistants-BEw4pwiQ.js","assets/Assistants-DuKb9pk7.css","assets/AtelierDesContenus-CpLbjHue.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/AuComptoir-BwFO1Zux.js","assets/Audience-q9146U0V.js","assets/Aujourdhui-Df8qyLr1.js","assets/avant-le-fauteuil-lecture-CGUO2ZEg.js","assets/AvantLeFauteuil-CPvndaPi.js","assets/avis-fiches-DI9Ojuo3.js","assets/AvisGoogle-DaPXfwX9.css","assets/AvisGoogle-DEf5RykD.js","assets/bilan-B-bfPYR0.css","assets/bilan-D_EVGrE2.js","assets/BilanMensuel-DYicGeoI.js","assets/Branches-DZqu-zCE.js","assets/bridges-Bo65Ao-L.js","assets/Caisse-DLH205Dr.js","assets/caisse-du-soir-Dtc7xJ2c.js","assets/Caisses-CIqlgqDx.js","assets/Calendrier-chnzKVzj.js","assets/campagnes-pur-B8Ut_K7D.js","assets/Carnet-DNszih2v.js","assets/carte-BaJxRY3M.js","assets/carte-_W_-xBPj.css","assets/CarteModal-CfldcD3O.js","assets/CartesCadeaux-DWLN4CxH.js","assets/Catalogue-BRm8v5N7.js","assets/CentreDeCommande-B5ZcILtF.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-yrLaMtcu.js","assets/certificat-pSVovWlm.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-am6hiRNo.js","assets/ChiffreDesPrestations-BLDyr5wU.js","assets/client-Dmkx_Fkt.js","assets/ClotureDuTiroir-C6vPx-E_.css","assets/ClotureDuTiroir-DdohkUVo.js","assets/Coffre-U9-Hdgfi.js","assets/components-l5EzFNxq.js","assets/compte-courant-ByzulCEN.js","assets/compte-M7hI46Ku.js","assets/CompteCourant-YoFx0fnb.js","assets/Comptes-Bqg88B68.js","assets/Comptoir-Cx2yii6c.js","assets/consultation-B-au5PPA.js","assets/consultation-CRW6QcWf.css","assets/Consultations-Cu-c1yoI.js","assets/consultNotes-DnI9FupI.js","assets/Conversations-D0_cKdlN.js","assets/Conversations-D4WwB5Zo.css","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-Dk7rR_0n.js","assets/currency-qfIhGmrs.js","assets/Customers-C61A92lS.js","assets/Dashboard-Ct4a6DZl.js","assets/Dashboard-zjGteuUE.css","assets/dates-D-qsP31A.js","assets/Demandes-DFOEiT7H.js","assets/Depenses-COvO0FfN.js","assets/depenses-saisie-Bt65ZQfr.js","assets/dernier-message-pur-CBYWnq8m.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-lGOu3vr_.js","assets/diagnostics-au-trone-DjBaVp9u.js","assets/Dictee-CXBl5eS7.js","assets/Dictee-D2P9yM7v.css","assets/dictee-pur-D0iMxu2b.js","assets/Discussions-aVBF2SQI.js","assets/EditeurDesOffres-BeYrtjv4.js","assets/Encaissements-BHhE2nq0.js","assets/enfants-fdRsjI-m.js","assets/Engagements-Bv4vAZxy.js","assets/Engagements-Cj5S9MhG.css","assets/EntreDeuxSeances-CgXyaD8N.js","assets/equipe-B_9ZHz24.css","assets/Evaluation-DeRiawVm.js","assets/FacturePrestataire-BqxKF88X.js","assets/Factures-ReNgraI4.js","assets/FenetreDesCivilites-Duos4P02.js","assets/FenetreDesCivilites-zfNk1aak.css","assets/FenetreDuPoint-yBSWi53n.js","assets/Fil-CHn_4BV2.js","assets/finances-BMFnlkRx.css","assets/fon-pHy13xz-.js","assets/fon-pur-CgVkbJ8O.js","assets/Fournisseurs-CniplHhs.js","assets/fournisseurs-DChLVGao.js","assets/foyer-tN2Zg4Sh.js","assets/Gerard-DJzQpZkw.css","assets/gerard-donnees-D0JPXYgP.js","assets/Gerard-D_uPJEKE.js","assets/gestes-conversation-BCk9txaH.js","assets/HomeRituals--Hkjx9Gk.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-CLBwvAc4.js","assets/ia-centre-DcSZZIxf.js","assets/ia-diagnostic-pur-BBLrGY5l.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-recu-pur-DcucZqpR.js","assets/identite-CuZtF0sx.js","assets/index-DtQxhN5E.js","assets/index.es-aJj30rLg.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-C9w4rEYf.js","assets/jspdf.es.min-CchjtMaP.js","assets/JustePrix-rEI61M14.js","assets/kkiapay-CJXRGJyW.js","assets/kkiapay-widget-DnUhUNd4.js","assets/Laboratoire-D4Acev6U.js","assets/laboratoire-DTOBMEix.js","assets/LettresAuDossier-DfrbUbzY.js","assets/LienMndPay-BK8zs51N.js","assets/maisons-CSSFrqZy.js","assets/Marketing-Df2f485E.js","assets/MarketingBranche-BE_WOq2u.js","assets/Marque-ChUBxG0p.js","assets/MesTaches-Cc4XUDf6.css","assets/MesTaches-CYiKWp4o.js","assets/missions-prestataires-B3wVvKGk.js","assets/momo-B-QSeWY6.js","assets/MonMois-B_TNREyg.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-BMwZrpOI.js","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/paliers-BxWU3hu7.js","assets/Parametres-Q_ZuMslh.js","assets/parcours-ByVQYIp1.js","assets/Parrainages-CoB4ZLoI.js","assets/Parrainages-gAHAPB_6.css","assets/PassageAvantLeFauteuil-awwsGpvy.js","assets/pdf-BEVl0y7I.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/Personas-D7b9dz63.js","assets/Personnel-DIuH75vI.js","assets/photo-CkDldURy.js","assets/pilotage-D8kf1Co8.css","assets/Predictions-BmSB5WYe.js","assets/Prestataires-CnS70mee.js","assets/Prets-BhgJq7Mp.js","assets/prevision-du-mois-pur-D6sJa5lw.js","assets/Previsions-D-0__Buz.css","assets/Previsions-D2L-Pait.js","assets/previsions-pur-CI29LcDk.js","assets/processus-pur-BLN25j-E.js","assets/projets-2AeR9fkA.js","assets/Projets-Bhkdf7km.js","assets/Projets-COO7WDEE.css","assets/projets-pur-2ZEMRNDU.js","assets/protocoles-C1hDzMMz.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-DOLdiU4A.js","assets/qualification-C29xZjJf.js","assets/quiz-5qMPWZVi.js","assets/Rapport-DqMDMsg7.js","assets/RattacherUneCarte-DF6dXRqd.js","assets/Recommandations-DZUNcT19.js","assets/regler-B3W3sWF-.js","assets/regler-C5hcM02_.css","assets/regler-la-seance-serveur-Bs6rzqZX.js","assets/relances-pur-lwRTXc5E.js","assets/releve-des-avis-VLuxmfUF.js","assets/SalonFoyer-BLXDOJQr.js","assets/secretariat-admin-DaufogtZ.js","assets/Secretariat-Cy79Zw30.css","assets/Secretariat-DWARv-7L.js","assets/Signatures-dMlQcCAw.js","assets/SignerUnPdf-By4bs19q.js","assets/Synthese-Buko8sv7.js","assets/SyntheseGraphes-BeK06E8g.js","assets/systeme-TPy-pF7j.css","assets/Tableau-D-aQr-26.js","assets/temps-CKgU9owL.js","assets/Textes-CUMVZDKs.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-hEBh9VEa.js","assets/trace-du-moyen-pur-Bx8-suHn.js","assets/trone-B6jFQMGx.css","assets/trone-CdiMgS9E.js","assets/ui-B5WR9HZN.js","assets/useAudiences-DWCWpr9U.js","assets/vente-C7YWXkHo.css","assets/Vitrine-BWilTqQJ.css","assets/Vitrine-DiPcrG5M.js","assets/_admin-DcR4Rg07.js","assets/_contrat-DtHD-jAR.js","assets/_heures-BOtRF3Ac.js","assets/_reuni-Bsp05Bm2.js","assets/_shared-BIpZBOmc.js","assets/_signature-lmpvKPzs.js","assets/_ui-BWMA-PlM.css","assets/_ui-CzSrmvs0.js"];
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
