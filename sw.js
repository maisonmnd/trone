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
const BUILD = "20261025113220";
const A_GARDER = ["./","assets/abonnements-BEQuT3Xj.js","assets/Abonnements-CoAqlodw.js","assets/Academie-CjhInVx_.js","assets/Acces-CN6JzF9L.js","assets/actions-B3gfsaeA.js","assets/afaire-C6z4DIsV.js","assets/AFaire-Cl8_g1Iv.js","assets/Agents-Bs_UFzgF.js","assets/agents-donnees-CrhgY8-c.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-D-_4zOWy.js","assets/Appels-C_n-SQg4.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/AtelierDesContenus-B3monduO.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/AuComptoir-BSFGQHIr.js","assets/Aujourdhui-ey07AfKQ.js","assets/avis-fiches-D6fNOFag.js","assets/bilan-B-bfPYR0.css","assets/bilan-B5YhzpXV.js","assets/BilanMensuel-B69nakgD.js","assets/Branches-BTQsMOIn.js","assets/bridges-Df2bIXcX.js","assets/caisse-du-soir-tIa6hvft.js","assets/Caisse-MmGMQNNn.js","assets/Caisses-CeL1traA.js","assets/Calendrier-Do5og_GH.js","assets/Carnet-aSSBBjQA.js","assets/carte-Db7vvt4G.js","assets/carte-DWlSbalk.css","assets/CarteModal-DNSs82JM.js","assets/CartesCadeaux-BqiY1fIX.js","assets/Catalogue-mmixU-qF.js","assets/CentreDeCommande-Bc88rJmX.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-B2bylQgV.js","assets/certificat-9_XWf1iQ.css","assets/certificat-D9D3jNTY.js","assets/certificats-coffre-B8uhwRgr.js","assets/chiffre-du-jour-pur-CzZTuwDz.js","assets/ChiffreDesPrestations-B1xqRyB0.js","assets/client-C_q4w1ZI.js","assets/ClotureDuTiroir-C6vPx-E_.css","assets/ClotureDuTiroir-D0nYis4v.js","assets/Coffre-Bh3XC_ne.js","assets/components-Dzf5KZiI.js","assets/compte-courant-ByzulCEN.js","assets/compte-Ds_o63ad.js","assets/CompteCourant-Dq_eQe-V.js","assets/Comptes-G3chyA2G.js","assets/Comptoir-BRU3rYqs.js","assets/consultation-BP4PNml1.js","assets/consultation-DQBnwlMN.css","assets/Consultations-DdvDIBCD.js","assets/consultNotes-CbfhTTD3.js","assets/Conversations-D4WwB5Zo.css","assets/Conversations-DaVwuhkw.js","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-BsXswrsJ.js","assets/currency-qfIhGmrs.js","assets/Customers-EipJpnVs.js","assets/Dashboard-B8qK6Flt.css","assets/Dashboard-PlXD7BJT.js","assets/dates-PTsi_G5x.js","assets/Demandes-CfE1ySmm.js","assets/Depenses-BTOyaox_.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-c_rV9MME.js","assets/diagnostics-au-trone-DthjaHoJ.js","assets/Discussions-DnTmChg9.js","assets/Encaissements-8JAE3WRW.js","assets/enfants-DxC1R86v.js","assets/Engagements-Cj5S9MhG.css","assets/Engagements-DekLT9ND.js","assets/EntreDeuxSeances-9hPr2Cq0.js","assets/equipe-B_9ZHz24.css","assets/Evaluation-b4tsH8n5.js","assets/FacturePrestataire-DA91glkW.js","assets/Factures-Coa7JhWx.js","assets/Fil-C5EXjJqr.js","assets/finances-BMFnlkRx.css","assets/fournisseurs-BGWBAajg.js","assets/Fournisseurs-DsexXks3.js","assets/foyer-Bo1zn70N.js","assets/gestes-conversation-C6ZirEBn.js","assets/HomeRituals-DHDESYtT.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-BO0DjF4W.js","assets/ia-diagnostic-pur-BulIFgZQ.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-recu-pur-DcucZqpR.js","assets/identite-C2EvkVlF.js","assets/index-CIryKttB.js","assets/index.es-BhC_9yWG.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-C2JJpM7c.js","assets/jspdf.es.min-enn7kCbQ.js","assets/JustePrix-DootEfl3.js","assets/kkiapay-D3acsJhe.js","assets/kkiapay-widget-DnUhUNd4.js","assets/Laboratoire-DIccVd6P.js","assets/laboratoire-j0eTOcw-.js","assets/LettresAuDossier-BZuMfPC6.js","assets/LienMndPay-BPDB7Ms8.js","assets/maisons-CSSFrqZy.js","assets/Marketing-vZN5_8NC.js","assets/Marque-X8ACWPnQ.js","assets/MesTaches-BD-hBVT9.js","assets/MesTaches-Cc4XUDf6.css","assets/momo-C2ZVfV9J.js","assets/MonMois-CqBBmjF5.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-BYB4uqMx.js","assets/paliers-BwUe7Y5Y.js","assets/Parametres-Cf4y4ksn.js","assets/parcours-C4vBIIEM.js","assets/Parrainages-CF7JhFFe.js","assets/Parrainages-gAHAPB_6.css","assets/pdf-CemlAlAf.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/Personas-Cuure77B.js","assets/Personnel-BMLXbsnE.js","assets/photo-BL5SetbE.js","assets/pilotage-D8kf1Co8.css","assets/Predictions-C6cMCkjI.js","assets/Prestataires-Clt3EnWQ.js","assets/prestataires-S3abIzlk.js","assets/Prets-DfTRDuUt.js","assets/Projets-0tcvWJzy.js","assets/projets-Brr-LIYY.js","assets/Projets-COO7WDEE.css","assets/projets-pur-2ZEMRNDU.js","assets/protocoles-B0nOFwRU.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-BbMwKphf.js","assets/qualification-CMT3MdqV.js","assets/quiz-5qMPWZVi.js","assets/Rapport-C1MNNGlR.js","assets/RattacherUneCarte-Bqe7yMyX.js","assets/Recommandations-j1id05En.js","assets/regler-BFcXb29n.js","assets/regler-la-seance-serveur-BpExlC5z.js","assets/regler-YZ8GtHfl.css","assets/relances-pur-DsIo28uB.js","assets/releve-des-avis-D3HNvrSc.js","assets/SalonFoyer-8h4o-ULe.js","assets/Secretariat-9xoBlc1U.js","assets/secretariat-admin-C2H_DRQW.js","assets/Secretariat-Cy79Zw30.css","assets/Signatures-DEh2wTAp.js","assets/SignerUnPdf-BEbeY_Qw.js","assets/Synthese-DnX7D1dd.js","assets/SyntheseGraphes-IXYKeOJB.js","assets/systeme-C3XFIa8E.css","assets/Tableau-CoFzlT8l.js","assets/Textes-cYKtMteC.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-CayzB8ys.js","assets/trace-du-moyen-pur-Bx8-suHn.js","assets/trone-CZrb9rjI.js","assets/trone-D8OItLFw.css","assets/ui-BGNcCgWk.js","assets/useAudiences-BczU9mjP.js","assets/vente-C7YWXkHo.css","assets/Vitrine-C6Rq9NUx.js","assets/Vitrine-Cs-c3_Mr.css","assets/_admin-BeCv8vu-.js","assets/_contrat-iYSYN9fK.js","assets/_heures-DVJtfqQt.js","assets/_reuni-CbmYGsT9.js","assets/_shared-7bhWDbll.js","assets/_signature-BF0oHsiX.js","assets/_ui-BWMA-PlM.css","assets/_ui-CYqeuTYX.js"];
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
