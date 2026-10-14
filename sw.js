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
const BUILD = "20261014131832";
const A_GARDER = ["./","assets/Abonnements-D8YHXB3-.js","assets/abonnements-DI-FShq0.js","assets/Academie-Bj5e7DLw.js","assets/Acces-BrShP852.js","assets/actions-kMkCL182.js","assets/AFaire-CEypeacm.js","assets/afaire-DmK6ni5u.js","assets/Analytics-CZjcsSMo.js","assets/Appels-BYSClLrt.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/AtelierDesContenus-D1G44lg8.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/Aujourdhui-3Bse4scA.js","assets/bilan-B-bfPYR0.css","assets/bilan-B5l94pqY.js","assets/BilanMensuel-CMOAohe1.js","assets/Branches-C19TWFne.js","assets/bridges-Hmbfki4e.js","assets/Caisse-BKSNDrbV.js","assets/caisse-du-soir-Q0EmUZN0.js","assets/Caisses-Cz_2nbSC.js","assets/Calendrier-CPv1i3rR.js","assets/Carnet-CmuCGKB1.js","assets/carte-DHFnTjPl.js","assets/carte-WI2qP1su.css","assets/CarteModal-DS3z4yCE.js","assets/CartesCadeaux-DC7cJRd6.js","assets/Catalogue-CsTJ7qk2.js","assets/CentreDeCommande-BTHmrP4o.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-BgquPqLm.js","assets/certificat-CnNMQnUT.js","assets/certificat-DVSxho5e.css","assets/certificats-coffre-DUql4E2f.js","assets/ClotureDuTiroir-B9OlB278.js","assets/ClotureDuTiroir-C6vPx-E_.css","assets/Coffre-CePVk0C7.js","assets/components-C7k5o5Zt.js","assets/compte-courant-ByzulCEN.js","assets/compte-DaYezvfx.js","assets/CompteCourant-wGiUlgyg.js","assets/Comptes-lVBWjzNx.js","assets/Comptoir-BCs-wHQg.js","assets/consultation-CCTm16qX.css","assets/consultation-CX0zyWx2.js","assets/Consultations-BWjXXtpK.js","assets/consultNotes-vntXycHX.js","assets/Conversations-gngQmfoL.js","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-CyLvys76.js","assets/currency-CzN07T4P.js","assets/Customers-CHLjI38T.js","assets/Dashboard-C1MMj7_5.js","assets/dates-BzcPee1G.js","assets/Demandes-maR2nd00.js","assets/Depenses-BF4z6P_l.js","assets/devise-fon-DX3P0bG4.woff2","assets/encaissement-pur-Hwg8iFME.js","assets/Encaissements-BGQ38Fz2.js","assets/enfants-DnXWKhOB.js","assets/Engagements-Cj5S9MhG.css","assets/Engagements-DJM3JrDp.js","assets/equipe-DpPyq6h-.css","assets/Evaluation-BQjMnqRQ.js","assets/FacturePrestataire-B5JPdr-g.js","assets/Factures-Bj-WiDXb.js","assets/Fil-DKrrrvNc.js","assets/finances-CCjqAkCE.css","assets/Fournisseurs-Bd8qzF2q.js","assets/fournisseurs-C2A4BFnE.js","assets/foyer-BVPjO11W.js","assets/HomeRituals-BqJ6RzZ6.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-D2EJlspl.js","assets/identite-BFmwUMsc.js","assets/index-ZF9cPpkM.js","assets/index.es-DEZoE47_.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-c_kXG480.js","assets/jspdf.es.min-COu57EGd.js","assets/JustePrix--5hDCmob.js","assets/kkiapay-BJxPhXj8.js","assets/Laboratoire-BC0NDfXz.js","assets/laboratoire-YlF_e7QB.js","assets/LettresAuDossier-B1ACxqjR.js","assets/maisons-DZdAeMF9.js","assets/Marketing-By6hhdz4.js","assets/Marque-CZc8p1-d.js","assets/momo-C2ZVfV9J.js","assets/MonMois-DlaKDT0N.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-DC6mNTUq.js","assets/paliers-DG4ARXw_.js","assets/Parametres-BggurBTO.js","assets/parcours-BsTysXWl.js","assets/Parrainages-C1Mvxm83.js","assets/Parrainages-gAHAPB_6.css","assets/pdf-Cu9u-Jez.js","assets/Personas-DjVUaGtd.js","assets/Personnel-OrTODqs_.js","assets/photo-Bj9-lj3d.js","assets/pilotage-CybSwMA-.css","assets/Predictions-BL_Ate5C.js","assets/prestataires-ophoo5EL.js","assets/Prestataires-rrSiDYwA.js","assets/Prets-8rTyXTqW.js","assets/promos-CH7qxUDf.js","assets/protocoles-DBJ4QGSn.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-BbI6sds6.js","assets/quiz-5qMPWZVi.js","assets/Rapport-DZdzJb4E.js","assets/RattacherUneCarte-B-VOcz5u.js","assets/Recommandations-B1IWt-Do.js","assets/SalonFoyer-Ctp0F7JS.js","assets/secretariat-admin-B_K8Bfm3.js","assets/Secretariat-UnE0T0rk.js","assets/Synthese-BXa8JQ0X.js","assets/systeme-C3XFIa8E.css","assets/Tableau-C_svM2QX.js","assets/Textes-DLpOzRbT.css","assets/Textes-RELlzS1s.js","assets/tiroirs-DLk5D0vk.js","assets/trone-B7KKcOnt.js","assets/trone-DnuuvbFM.css","assets/ui-B_NsJ0vm.js","assets/vente-D0kdELDn.css","assets/Vitrine-CBlCfiZU.js","assets/_admin-BF4imiQS.js","assets/_contrat-KWBSoLGx.js","assets/_heures-BPj-QjlA.js","assets/_shared-u8nhJirK.js","assets/_signature-Bf2nYmka.js","assets/_ui-BWMA-PlM.css","assets/_ui-Dgiz2-_y.js"];
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
