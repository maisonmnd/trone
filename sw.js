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
const BUILD = "20261027094457";
const A_GARDER = ["./","assets/Abonnements-1Jt3fUNl.js","assets/abonnements-QQQl32m4.js","assets/Academie-BjhSGGrL.js","assets/Acces-CbR3uU8-.js","assets/actions-C-W8Oju1.js","assets/afaire-BD7EArAB.js","assets/AFaire-CRKkTuj8.js","assets/Agents-CQXdpOhp.js","assets/agents-donnees-PIsg0JrD.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-DpsEAotd.js","assets/Appels-CmVDiv99.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/AtelierDesContenus-BktCjxYo.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/AuComptoir-B1osX1CE.js","assets/Audience-DkejOwQC.js","assets/Aujourdhui-DcOd8stZ.js","assets/avis-fiches-Cx6gUGMY.js","assets/AvisGoogle-D7oQVrlf.js","assets/AvisGoogle-DaPXfwX9.css","assets/bilan-B-bfPYR0.css","assets/bilan-BYwMYzkJ.js","assets/BilanMensuel-DIcFdH86.js","assets/Branches-DwlfFuoQ.js","assets/bridges-aflf9YC7.js","assets/Caisse-d3P5lafX.js","assets/caisse-du-soir-DQ33043s.js","assets/Caisses-Bo2M1KqL.js","assets/Calendrier-BHxXyEW_.js","assets/campagnes-pur-CGEra4dD.js","assets/Carnet-BsoCLaPd.js","assets/carte-Cs9bDLQH.js","assets/carte-_W_-xBPj.css","assets/CarteModal-B2MRXjaS.js","assets/CartesCadeaux-B2odJ6v8.js","assets/Catalogue-CZXfIZlE.js","assets/CentreDeCommande-DawGyNFT.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-oSotq_vW.js","assets/certificat-Dztpa-w9.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-CatDUeab.js","assets/chiffre-du-jour-pur-B_YBn5YM.js","assets/ChiffreDesPrestations-ePfkstIw.js","assets/client-Cuv98wBw.js","assets/ClotureDuTiroir-C6vPx-E_.css","assets/ClotureDuTiroir-D2iql66v.js","assets/Coffre-BqCSETmO.js","assets/components-Dn5l2Wpm.js","assets/compte-courant-ByzulCEN.js","assets/compte-D4D00RDq.js","assets/CompteCourant-CX375o5h.js","assets/Comptes-B-TCLL7h.js","assets/Comptoir-HDpq9oaM.js","assets/consultation-Bx6NUy2L.js","assets/consultation-CRW6QcWf.css","assets/Consultations-Jw_HcsOq.js","assets/consultNotes-BojNJk6c.js","assets/Conversations-D4WwB5Zo.css","assets/Conversations-DpQ8vqNX.js","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-D0GIBt7Q.js","assets/currency-qfIhGmrs.js","assets/Customers-ul_GuSBn.js","assets/Dashboard-1XXZlUYb.js","assets/Dashboard-BkDQjGRE.css","assets/dates-B7COZlyl.js","assets/Demandes-D5rs_9g_.js","assets/Depenses-C_qG9lLe.js","assets/dernier-message-pur-CBYWnq8m.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-ABfd_er1.js","assets/diagnostics-au-trone-D6xP28wz.js","assets/Discussions-DfC3IW2g.js","assets/EditeurDesOffres-Du-4Q46y.js","assets/Encaissements-C5YmjHTj.js","assets/enfants-B4wCjHWY.js","assets/Engagements-9XmxCaNq.js","assets/Engagements-Cj5S9MhG.css","assets/EntreDeuxSeances-BypLXLUL.js","assets/equipe-B_9ZHz24.css","assets/Evaluation-BKf638di.js","assets/FacturePrestataire-D3aDbOvg.js","assets/Factures-BQV5Y2iz.js","assets/Fil-DotIgBJA.js","assets/finances-BMFnlkRx.css","assets/fon-CfeBMwGS.js","assets/fon-pur-CgVkbJ8O.js","assets/fournisseurs-CP1Y_4OY.js","assets/Fournisseurs-CqPrh5MX.js","assets/foyer-DU_2K1XB.js","assets/Gerard-B8ojIJWy.js","assets/gerard-donnees-C5AgiDU1.js","assets/Gerard-DSdRRMPF.css","assets/gestes-conversation--VDrHsYM.js","assets/HomeRituals-I0wgr5kK.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-BM1JMzDV.js","assets/ia-centre-DK1BcuUu.js","assets/ia-diagnostic-pur-hHYxp10Y.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-recu-pur-DcucZqpR.js","assets/identite-CQK_N7vp.js","assets/index-hXoQdXtD.js","assets/index.es-tHrcpO3z.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-Bpb1-eHC.js","assets/jspdf.es.min-AV0IkSNz.js","assets/JustePrix-FBy0hAo5.js","assets/kkiapay-Bqt1LVkU.js","assets/kkiapay-widget-DnUhUNd4.js","assets/laboratoire-Bj41QUBh.js","assets/Laboratoire-DA6-h_3-.js","assets/LettresAuDossier-DpxGVVE7.js","assets/LienMndPay-R6emaTco.js","assets/maisons-CSSFrqZy.js","assets/Marketing--xFwttBR.js","assets/MarketingBranche-D0GyWVvV.js","assets/Marque-CM2bVJOM.js","assets/MesTaches-C7u9RK8z.js","assets/MesTaches-Cc4XUDf6.css","assets/momo-C2ZVfV9J.js","assets/MonMois-CcY9yhJL.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-ClSVqbBd.js","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/paliers-CVlyRKcm.js","assets/Parametres-DHaSTn1x.js","assets/parcours-DSCRNwWz.js","assets/Parrainages-BuugZr-U.js","assets/Parrainages-gAHAPB_6.css","assets/pdf-C4Qng-c-.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/Personas-bFX5-mL5.js","assets/Personnel-C2aEQXeO.js","assets/photo-Ciu6QecQ.js","assets/pilotage-D8kf1Co8.css","assets/Predictions-DEJV7IN9.js","assets/Prestataires-DXTSU1wo.js","assets/prestataires-LzNqMqnZ.js","assets/Prets-C22gm_RV.js","assets/prevision-du-mois-pur-D6sJa5lw.js","assets/Previsions-D-0__Buz.css","assets/Previsions-M_3KlFtx.js","assets/previsions-pur-CLyhLIcY.js","assets/processus-pur-BLN25j-E.js","assets/projets-BNek7ygO.js","assets/Projets-C166g52L.js","assets/Projets-COO7WDEE.css","assets/projets-pur-2ZEMRNDU.js","assets/protocoles-CgBTh7_D.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-CvtLdU9i.js","assets/qualification-Cq5TDJci.js","assets/quiz-5qMPWZVi.js","assets/Rapport-BiC4r30b.js","assets/RattacherUneCarte-BAuR4DP3.js","assets/Recommandations-DZW5CkEm.js","assets/regler-C5hcM02_.css","assets/regler-DQT9XpbG.js","assets/regler-la-seance-serveur-BpExlC5z.js","assets/relances-pur-DsIo28uB.js","assets/releve-des-avis-dzCfarZu.js","assets/SalonFoyer-C-_6_en0.js","assets/secretariat-admin-BDWuXO2N.js","assets/Secretariat-Cy79Zw30.css","assets/Secretariat-DLckU2aA.js","assets/Signatures-DBoKGmdD.js","assets/SignerUnPdf-C763V9KY.js","assets/Synthese-CgnpSgiD.js","assets/SyntheseGraphes-_7H3ETkr.js","assets/systeme-C3XFIa8E.css","assets/Tableau-BqRcxluG.js","assets/Textes-C9dP95gc.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-IosvPyaD.js","assets/trace-du-moyen-pur-Bx8-suHn.js","assets/trone-D6iP3Tjq.js","assets/trone-ZtHDzaYl.css","assets/ui-TmI7Gy6H.js","assets/useAudiences-B7Tv8vtj.js","assets/vente-C7YWXkHo.css","assets/Vitrine-BWilTqQJ.css","assets/Vitrine-DLy5Fr1k.js","assets/_admin-ChzWyC8O.js","assets/_contrat-0aCpVA05.js","assets/_heures-BvdG6-3S.js","assets/_reuni-DpJ872mI.js","assets/_shared-DHF6JhCF.js","assets/_signature-BMA8ozhL.js","assets/_ui-BWMA-PlM.css","assets/_ui-DgxWOAOr.js"];
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
