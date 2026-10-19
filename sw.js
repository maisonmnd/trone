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
const BUILD = "20261019062943";
const A_GARDER = ["./","assets/abonnements-BAtXTOa9.js","assets/Abonnements-DWixvfJ5.js","assets/Academie-CUmfk9KF.js","assets/Acces-di85GOtz.js","assets/actions-BEzZbw2_.js","assets/AFaire-C0s-_IaM.js","assets/afaire-CIwomLuU.js","assets/Analytics-DZT-oM2i.js","assets/Appels-DiZzLoUU.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/AtelierDesContenus-DK3UpbRs.js","assets/Aujourdhui-BEmjk_Pn.js","assets/bilan-B-bfPYR0.css","assets/bilan-DJWU1I9r.js","assets/BilanMensuel-C0drz0MQ.js","assets/Branches-B0nhBZU2.js","assets/bridges-1d1EM3NB.js","assets/Caisse-BBd608ho.js","assets/caisse-du-soir-BVzrEff4.js","assets/Caisses-CeU2YNAt.js","assets/Calendrier-qAJuwprT.js","assets/Carnet-DjJDDYBo.js","assets/carte-DY_QPQoz.js","assets/carte-WI2qP1su.css","assets/CarteModal-Bc3OzB5_.js","assets/CartesCadeaux-CoHAnez3.js","assets/Catalogue-CV7isFA8.js","assets/CentreDeCommande-9XnXSvH0.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-Cg9l9Oqt.js","assets/certificat-CadmBgTd.js","assets/certificat-DVSxho5e.css","assets/certificats-coffre-V27YH3lR.js","assets/ChiffreDesPrestations-CAGVh5Ak.js","assets/ClotureDuTiroir-C6vPx-E_.css","assets/ClotureDuTiroir-C7l64aEw.js","assets/Coffre-BQVpW_E7.js","assets/components-CDEVbwmo.js","assets/compte-courant-ByzulCEN.js","assets/compte-tX-wAhBS.js","assets/CompteCourant-BdmsCmaV.js","assets/Comptes-9OyhHDoN.js","assets/Comptoir-fIYyVy_Q.js","assets/consultation-CCTm16qX.css","assets/consultation-CCtStglY.js","assets/Consultations-D2ktmLLX.js","assets/consultNotes-D6SYKSkJ.js","assets/Conversations-CQYLVSvn.js","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-fzQ0WiGY.js","assets/currency-qfIhGmrs.js","assets/Customers-CfUrhrec.js","assets/Dashboard-CikgwiNE.js","assets/dates-CPQEGNah.js","assets/Demandes-D6xBc0pP.js","assets/Depenses-DCSvtkUb.js","assets/devise-fon-DX3P0bG4.woff2","assets/encaissement-pur-4PKM0LnV.js","assets/Encaissements-soM8xU82.js","assets/enfants-l6N3IGFJ.js","assets/Engagements-CeQsKTcb.js","assets/Engagements-Cj5S9MhG.css","assets/EntreDeuxSeances-CCfommiO.js","assets/equipe-DpPyq6h-.css","assets/Evaluation-Dx6PED2u.js","assets/FacturePrestataire-CuEjDK5L.js","assets/Factures-20w1YlYB.js","assets/Fil-CKkyGtQH.js","assets/finances-CCjqAkCE.css","assets/fournisseurs-BtSMBiiw.js","assets/Fournisseurs-CfrY_A8M.js","assets/foyer-CWA7SBdS.js","assets/gestes-conversation-DWA_5432.js","assets/HomeRituals-WABY0o5k.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-BecUNNap.js","assets/identite-DIhnFToW.js","assets/index-BIwoYdlr.js","assets/index.es-OD8b16tJ.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-C0LjCp_o.js","assets/jspdf.es.min-BBh9CDHD.js","assets/JustePrix-W8EORgxI.js","assets/kkiapay-B1lhN9LO.js","assets/Laboratoire-06JKp9nT.js","assets/laboratoire-D3xIXKZi.js","assets/LettresAuDossier-Cw6OQ8Bf.js","assets/maisons-CSSFrqZy.js","assets/Marketing-DpcQ-ZkP.js","assets/Marque-Cnot4XVJ.js","assets/momo-C2ZVfV9J.js","assets/MonMois-Be-ZRbma.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-K9k9-Gqo.js","assets/paliers-6BCQ82Ur.js","assets/Parametres-CFyzn-2j.js","assets/parcours-C2lcG1P5.js","assets/Parrainages-BWWWwF4E.js","assets/Parrainages-gAHAPB_6.css","assets/pdf-B2DihPa3.js","assets/pdf-de-la-piece-BQQ0RKjk.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/Personas-BypTxRay.js","assets/Personnel-B63pYOTf.js","assets/photo-TUnLeAxZ.js","assets/pilotage-Bn1gP_oo.css","assets/Predictions-D692lokE.js","assets/prestataires-BPToMV3m.js","assets/Prestataires-g-LsXpgf.js","assets/Prets-BzRFogFZ.js","assets/promos-BZgHc_ZR.js","assets/protocoles-6tVzX3m6.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-6p9H5Qj8.js","assets/quiz-5qMPWZVi.js","assets/Rapport-BNqyDahk.js","assets/RattacherUneCarte-zOVce9kD.js","assets/Recommandations-CFsH0usT.js","assets/relances-pur-DHxkbBX5.js","assets/SalonFoyer-CTsuDqJ9.js","assets/secretariat-admin-Bstf2m7s.js","assets/Secretariat-XQ9yUf9E.js","assets/Signatures-BtRtt1BD.js","assets/SignerUnPdf-DElohy1a.js","assets/Synthese-BqrSlPOo.js","assets/systeme-C3XFIa8E.css","assets/Tableau-B6m1QZiQ.js","assets/Textes-02hBRsHX.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-DrcqZeSS.js","assets/tri-des-caisses-pur-C0NsUyBh.js","assets/trone-CyFdPxg0.css","assets/trone-DDJo-ATs.js","assets/ui-BysRTi42.js","assets/vente-DMe4r4ed.css","assets/Vitrine-W_GSlT9E.js","assets/_admin-BzvBokZd.js","assets/_contrat-sdcJKnxv.js","assets/_heures-DqrQTJDm.js","assets/_reuni-bOrkmUhk.js","assets/_shared-C2xDgdTW.js","assets/_signature-CdDaQeWU.js","assets/_ui-BWMA-PlM.css","assets/_ui-D7bvmV9J.js"];
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
