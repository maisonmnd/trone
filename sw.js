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
const BUILD = "20261011195821";
const A_GARDER = ["./","assets/Abonnements-bsN57Oua.js","assets/abonnements-CEvdVAWr.js","assets/Academie-BPZlAY1g.js","assets/Acces-DVQKDG9I.js","assets/actions-CNxi520I.js","assets/AFaire-DyGE3MJW.js","assets/afaire-S87etTQk.js","assets/Analytics-O3ZUsmds.js","assets/Appels-B6HDtJro.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/AtelierDesContenus-BssDLUcG.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/bilan-B-bfPYR0.css","assets/bilan-GrN3pW3Q.js","assets/BilanMensuel-CCRq4_Xg.js","assets/bourse-B4dW6sMh.js","assets/Branches-B5cQeL37.js","assets/bridges-CLcOxS18.js","assets/Caisse-BqZhzYp5.js","assets/caisse-du-soir-DawtOJgZ.js","assets/Caisses-D7PiPcpw.js","assets/Calendrier-B92F5nRr.js","assets/Carnet-R0G7Q0wL.js","assets/carte-C4ntRlef.js","assets/carte-WI2qP1su.css","assets/CarteModal-C9-6mMWj.js","assets/CartesCadeaux-CMosyJTZ.js","assets/Catalogue-Bt7bUr9Q.js","assets/CentreDeCommande-BJsYMz1E.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-Dz4-fXyd.js","assets/certificat-B0RV5KfH.js","assets/certificat-DVSxho5e.css","assets/certificats-coffre-CawBTZmd.js","assets/ClotureDuTiroir-C6vPx-E_.css","assets/ClotureDuTiroir-DG7rz_5A.js","assets/Coffre-CjUqTNxe.js","assets/components-Ejo-CvBl.js","assets/compte-courant-ByzulCEN.js","assets/compte-CXsjNcia.js","assets/CompteCourant-l2OSHNzp.js","assets/Comptes-DpmlyEg9.js","assets/Comptoir-w5F1JJv7.js","assets/consultation-CCTm16qX.css","assets/consultation-Dy4HcGdc.js","assets/Consultations-_nJKwOzw.js","assets/consultNotes-C1xD3xCh.js","assets/Conversations-BRDo0ZDk.js","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-BHSEOa0a.js","assets/currency-CzN07T4P.js","assets/Customers-CtX4J9xu.js","assets/Dashboard-b-DZTYBf.js","assets/dates-tKxUCAHq.js","assets/Demandes-COyPGjYc.js","assets/Depenses-BqYdBU1b.js","assets/devise-fon-DX3P0bG4.woff2","assets/encaissement-pur-BhP6u04w.js","assets/Encaissements-CJgkDHSv.js","assets/enfants-QxQL6DBy.js","assets/Engagements-Cj5S9MhG.css","assets/Engagements-etdW3Cck.js","assets/equipe-DpPyq6h-.css","assets/Evaluation-29GXg8JR.js","assets/FacturePrestataire-CWBLlpX7.js","assets/Factures-tume10yB.js","assets/Fil-BrdBBLDv.js","assets/finances-CCjqAkCE.css","assets/Fournisseurs-C3zShjYv.js","assets/fournisseurs-DtNV8eUD.js","assets/foyer-RQoXkhB5.js","assets/HomeRituals-CJ-dSw5x.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-Cdwlhvzx.js","assets/identite-BZf5mS_O.js","assets/index-DylJwdOv.js","assets/index.es-BZ6GGOQN.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-BRZ_c-cz.js","assets/jspdf.es.min-Dyb7a2T8.js","assets/JustePrix-DjMil4S_.js","assets/kkiapay-DmsjCmco.js","assets/laboratoire-D2ZTGjz1.js","assets/Laboratoire-DjStr-XQ.js","assets/LettresAuDossier-CgzOGi1R.js","assets/maisons-DZdAeMF9.js","assets/Marketing-D-KslEDk.js","assets/Marque-LUin7ep5.js","assets/momo-C2ZVfV9J.js","assets/MonMois-o7AFM4s2.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-D2Z8BMbY.js","assets/paliers-D_2G_H85.js","assets/Parametres-DXOQfN6t.js","assets/parcours-V75YVrs3.js","assets/Parrainages-Cy-o5pCJ.js","assets/Parrainages-gAHAPB_6.css","assets/pdf-C9tS1v1M.js","assets/Personas-B7GvH_E9.js","assets/Personnel-DBzHpwE9.js","assets/photo-B1zEWy6f.js","assets/pilotage-DYbuDdJQ.css","assets/Predictions-Dfk08_Fd.js","assets/Prestataires-Di2PNiW7.js","assets/prestataires-PYy_sWaK.js","assets/Prets-BbKwh1l4.js","assets/promos-DBl5EBOH.js","assets/protocoles-BrRuzBUW.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-DRvZFH3s.js","assets/quiz-5qMPWZVi.js","assets/Rapport-9Ng_nHKQ.js","assets/RattacherUneCarte-Bo8lIapc.js","assets/Recommandations-BsXVzEn4.js","assets/SalonFoyer-BoqVuaYb.js","assets/Secretariat-0PSTuDlc.js","assets/Synthese-DAcR2ZHc.js","assets/systeme-C3XFIa8E.css","assets/Tableau-BwmTcLsf.js","assets/Textes-DLpOzRbT.css","assets/Textes-DUgCkfWf.js","assets/tiroirs-UPt_UClL.js","assets/trone-Cn5sXo2w.css","assets/trone-CnK1ecK9.js","assets/ui-DPCsU8jU.js","assets/vente-D0kdELDn.css","assets/Vitrine-Cf7HlrLV.js","assets/_contrat-D36uvxBZ.js","assets/_heures-Dg4jMbqY.js","assets/_shared-DH9eIS37.js","assets/_signature-Dw-CYL4Y.js"];
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
