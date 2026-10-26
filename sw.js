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
const BUILD = "20261026073308";
const A_GARDER = ["./","assets/abonnements-B2PDO78R.js","assets/Abonnements-Ck6e57VT.js","assets/Academie-BvwU0ygv.js","assets/Acces-9Ub34ehm.js","assets/actions-BzU6u8hI.js","assets/afaire-Bx4kMg63.js","assets/AFaire-CFudlUS5.js","assets/Agents-Cl8XCs6R.js","assets/agents-donnees-b8JicMJy.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-C2NZbCXn.js","assets/Appels-CYZP61FP.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/AtelierDesContenus-CJKO5oMO.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/AuComptoir-BTWxtmZw.js","assets/Aujourdhui-B-zWCD_T.js","assets/avis-fiches-Dv97ucUU.js","assets/bilan-B-bfPYR0.css","assets/bilan-DM-b9vI5.js","assets/BilanMensuel-PrkIYDDV.js","assets/Branches-BqJ07DpF.js","assets/bridges-S4ew7F-B.js","assets/Caisse-BtJ4z_bb.js","assets/caisse-du-soir-UKbwS6tL.js","assets/Caisses-HmWVZ9Sh.js","assets/Calendrier-CuWaALPf.js","assets/Carnet-CNdUsUhr.js","assets/carte-NCNodZoA.js","assets/carte-_W_-xBPj.css","assets/CarteModal-CVX_g3Se.js","assets/CartesCadeaux-CVZOx5oU.js","assets/Catalogue-CIuUExss.js","assets/CentreDeCommande-Cf8DTnu4.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-BmG39NZx.js","assets/certificat-ICmadkXy.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-BRM-SP3F.js","assets/chiffre-du-jour-pur-CkwQL5W3.js","assets/ChiffreDesPrestations-n6hYx3vJ.js","assets/client-CadW86RA.js","assets/ClotureDuTiroir-8tDzCu5C.js","assets/ClotureDuTiroir-C6vPx-E_.css","assets/Coffre-CZIBMrAH.js","assets/components-DPEvBf8Z.js","assets/compte-Cixa2hLd.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-BPje7YWO.js","assets/Comptes-DGz0TazD.js","assets/Comptoir-BC5GDLC2.js","assets/consultation-BBXDPtfT.js","assets/consultation-CRW6QcWf.css","assets/Consultations-JJVxea2u.js","assets/consultNotes-AQ8m155O.js","assets/Conversations-BXv13lUb.js","assets/Conversations-D4WwB5Zo.css","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-D0S8bjub.js","assets/currency-qfIhGmrs.js","assets/Customers-6kdyVQH2.js","assets/Dashboard-B8qK6Flt.css","assets/Dashboard-SCjuHsZV.js","assets/dates-z09ExXrw.js","assets/Demandes-Dw6WYvLR.js","assets/Depenses-4bdDEi0H.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-FDzvozux.js","assets/diagnostics-au-trone-CeRPZLRX.js","assets/Discussions-BcVbbOf2.js","assets/Encaissements-CZwmdgRV.js","assets/enfants-BRVlEjFj.js","assets/Engagements-Cj5S9MhG.css","assets/Engagements-VJYb6EYU.js","assets/EntreDeuxSeances-CKTHn39S.js","assets/equipe-B_9ZHz24.css","assets/Evaluation-rfqSg4js.js","assets/FacturePrestataire-14cvXe_T.js","assets/Factures-CxEy9Sug.js","assets/Fil-BcLNQLQ3.js","assets/finances-BMFnlkRx.css","assets/fon-CKTLi-cQ.js","assets/fon-pur-CgVkbJ8O.js","assets/Fournisseurs-ByF0fap6.js","assets/fournisseurs-CDkufC3X.js","assets/foyer-DVEw0i0t.js","assets/gestes-conversation-CFd92w_7.js","assets/HomeRituals-CAPABEk5.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-DSlyAkyx.js","assets/ia-diagnostic-pur-BulIFgZQ.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-recu-pur-DcucZqpR.js","assets/identite-Bab7eVDH.js","assets/index-DB5zg-xI.js","assets/index.es-DtNikXsZ.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-5F8pe3er.js","assets/jspdf.es.min-Cc01mgBc.js","assets/JustePrix-BKsHNGTE.js","assets/kkiapay-C7suR_6z.js","assets/kkiapay-widget-DnUhUNd4.js","assets/Laboratoire-6HS9toaj.js","assets/laboratoire-7oPzsegX.js","assets/LettresAuDossier-rx1fhkDP.js","assets/LienMndPay-DLWU0cZP.js","assets/maisons-CSSFrqZy.js","assets/Marketing-Jz50ro4c.js","assets/Marque-CTg0Hwgr.js","assets/MesTaches-Cc4XUDf6.css","assets/MesTaches-CL4AEV-E.js","assets/momo-C2ZVfV9J.js","assets/MonMois-TwQySh6E.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-DYjgQh3a.js","assets/paliers-Ds54sqrP.js","assets/Parametres-GdXtI13c.js","assets/parcours-Ce2_lMWq.js","assets/Parrainages-BsZNFD5p.js","assets/Parrainages-gAHAPB_6.css","assets/pdf-Byxni2ea.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/Personas-MpXKGBS0.js","assets/Personnel-VkpcQxre.js","assets/photo-UHVM9MIp.js","assets/pilotage-D8kf1Co8.css","assets/Predictions-CQgUOD0a.js","assets/Prestataires-CYcUbLUv.js","assets/prestataires-DHvFfMYn.js","assets/Prets-l70yAXSw.js","assets/projets-BPfKj-Qs.js","assets/Projets-CjCUkQ10.js","assets/Projets-COO7WDEE.css","assets/projets-pur-2ZEMRNDU.js","assets/protocoles-CQh4JEve.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-B0RimE4f.js","assets/qualification-2fsCK7sF.js","assets/quiz-5qMPWZVi.js","assets/Rapport-BGd6P7M9.js","assets/RattacherUneCarte-BOkUnS3O.js","assets/Recommandations-ChGDhBib.js","assets/regler-C5hcM02_.css","assets/regler-KcHwfIER.js","assets/regler-la-seance-serveur-BpExlC5z.js","assets/relances-pur-DsIo28uB.js","assets/releve-des-avis-CLy7eOHf.js","assets/SalonFoyer-CBVCXq3U.js","assets/secretariat-admin-B6SdK2cr.js","assets/Secretariat-C22yhCsq.js","assets/Secretariat-Cy79Zw30.css","assets/Signatures-fk4s9R0M.js","assets/SignerUnPdf-Dmmk426c.js","assets/Synthese-DLFNSHl0.js","assets/SyntheseGraphes-CHzcfkkk.js","assets/systeme-C3XFIa8E.css","assets/Tableau-CJWd3Lz_.js","assets/Textes-CujJ5RVh.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-8RPIs59Z.js","assets/trace-du-moyen-pur-Bx8-suHn.js","assets/trone-Bo9ydrnn.css","assets/trone-HQvNxIw6.js","assets/ui-zyW9vNiH.js","assets/useAudiences-CEMf_WPY.js","assets/vente-C7YWXkHo.css","assets/Vitrine-Cs-c3_Mr.css","assets/Vitrine-DmorMLDr.js","assets/_admin-DRSnMjEE.js","assets/_contrat-B6qplO-U.js","assets/_heures-zOXKKX66.js","assets/_reuni-sUifilVe.js","assets/_shared-DJlKts5n.js","assets/_signature-ZDLtlNnb.js","assets/_ui-BWMA-PlM.css","assets/_ui-CmXbhMuP.js"];
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
