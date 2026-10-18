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
const BUILD = "20261018063705";
const A_GARDER = ["./","assets/abonnements-CqV_txSu.js","assets/Abonnements-Dsmc9aXQ.js","assets/Academie-CbGwqp21.js","assets/Acces-DEC1I5ly.js","assets/actions-BHba2EtK.js","assets/afaire-avnZYAuu.js","assets/AFaire-CSNi-tJB.js","assets/Analytics-KeA9G9-L.js","assets/Appels-Dq4FnSxJ.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/AtelierDesContenus-SfwiC4iw.js","assets/Aujourdhui-yWWRyj8t.js","assets/bilan-B-bfPYR0.css","assets/bilan-BzEcxlns.js","assets/BilanMensuel-BLFlaIO8.js","assets/Branches-Y4emJSmg.js","assets/bridges-B6TnJdP3.js","assets/Caisse-BcO2zRDO.js","assets/caisse-du-soir-lLMMZ26G.js","assets/Caisses-dvLWUCOW.js","assets/Calendrier-usd_rG-r.js","assets/Carnet-BjdKRmuN.js","assets/carte-WI2qP1su.css","assets/carte-yEPZQ4AJ.js","assets/CarteModal-Cz6vLi7D.js","assets/CartesCadeaux-z_gByewZ.js","assets/Catalogue-DVh62oFd.js","assets/CentreDeCommande-CeRpspI4.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-CFqpqrHu.js","assets/certificat-DT26mf4L.js","assets/certificat-DVSxho5e.css","assets/certificats-coffre-C1FEE6YE.js","assets/ChiffreDesPrestations-BOLp2BYE.js","assets/ClotureDuTiroir-0LPkLBEy.js","assets/ClotureDuTiroir-C6vPx-E_.css","assets/Coffre-BUEA3wBJ.js","assets/components-B4tZAZy_.js","assets/compte-courant-ByzulCEN.js","assets/compte-CU-sk0UW.js","assets/CompteCourant-zIXlXtUp.js","assets/Comptes-BKXULFxy.js","assets/Comptoir-LFHEaNMe.js","assets/consultation-CCTm16qX.css","assets/consultation-Cz37p_WI.js","assets/Consultations-DPXECHi9.js","assets/consultNotes-8v8QbIWa.js","assets/Conversations-CtNLMYSs.js","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-9piYTkZp.js","assets/currency-qfIhGmrs.js","assets/Customers-BLmpxpbI.js","assets/Dashboard-BQSoXXSA.js","assets/dates-BXRi1dKZ.js","assets/Demandes-CwQwSjGI.js","assets/Depenses-CznS03T3.js","assets/devise-fon-DX3P0bG4.woff2","assets/encaissement-pur-CkVx_RhS.js","assets/Encaissements-B3XQnw0H.js","assets/enfants-C_P_FmPD.js","assets/Engagements-Cj5S9MhG.css","assets/Engagements-CNxAiJYL.js","assets/EntreDeuxSeances-DbCHiK4K.js","assets/equipe-DpPyq6h-.css","assets/Evaluation-DpBu9jci.js","assets/FacturePrestataire-CnLRNGNH.js","assets/Factures-BUGKhHlE.js","assets/Fil-CjAWYA1A.js","assets/finances-CCjqAkCE.css","assets/fournisseurs-B0Imhfwn.js","assets/Fournisseurs-vmnNXUsi.js","assets/foyer-DXJomeYG.js","assets/HomeRituals-B4aooBLj.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-BNyEdY9Y.js","assets/identite-DPU1fVJu.js","assets/index-Dzv3UAWw.js","assets/index.es-BcHxmn9b.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-oOd9D88c.js","assets/jspdf.es.min-CCeo3mlz.js","assets/JustePrix-Bb9DA-m3.js","assets/kkiapay-Dtntc3NS.js","assets/Laboratoire-I2qUkbO_.js","assets/laboratoire-SKyfbfSE.js","assets/LettresAuDossier-DFvQU2bA.js","assets/maisons-CSSFrqZy.js","assets/Marketing-D-dBmkPo.js","assets/Marque-DD4sSpLS.js","assets/momo-C2ZVfV9J.js","assets/MonMois-DU1kNBfV.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-27Y3_coN.js","assets/paliers-Buma7iEY.js","assets/Parametres-5d0o5dRG.js","assets/parcours-D3VwxbK3.js","assets/Parrainages-gAHAPB_6.css","assets/Parrainages-YtSslYiC.js","assets/pdf-Dj-mPGBk.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/Personas-3jKrV9Ca.js","assets/Personnel-DEFME0mx.js","assets/photo-B0syFwVD.js","assets/pilotage-Bn1gP_oo.css","assets/Predictions-BL0PgVom.js","assets/Prestataires-1vsVFhNX.js","assets/prestataires-BlpArYRn.js","assets/Prets-B1Si9qis.js","assets/promos-Dl7NbL1Z.js","assets/protocoles-BkqCOD0J.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-B0ktrOp3.js","assets/quiz-5qMPWZVi.js","assets/Rapport-DjAtMoXg.js","assets/RattacherUneCarte-BP6qSN0f.js","assets/Recommandations-BAVhE593.js","assets/SalonFoyer-BM00LeYT.js","assets/secretariat-admin-YuUzYWLB.js","assets/Secretariat-CsgwmS9m.js","assets/Signatures-yi4wt9gn.js","assets/SignerUnPdf-CZgCyMos.js","assets/Synthese-lYh95wwx.js","assets/systeme-C3XFIa8E.css","assets/Tableau-BKHsy7ha.js","assets/Textes-DLpOzRbT.css","assets/Textes-Doc7hRGO.js","assets/tiroirs-D0xcHl43.js","assets/trone-CyFdPxg0.css","assets/trone-DHkPBtMs.js","assets/ui-h5MxNECH.js","assets/vente-DMe4r4ed.css","assets/Vitrine-rnoIunup.js","assets/_admin-B4p4Bzih.js","assets/_contrat-CVPGgM4h.js","assets/_heures-DOsA61LM.js","assets/_reuni-CHQ2u_dB.js","assets/_shared-C1lw5yLx.js","assets/_signature-BydUQdNt.js","assets/_ui-BSHpzAZs.js","assets/_ui-BWMA-PlM.css"];
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
