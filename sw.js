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
const BUILD = "20261005000043";
const A_GARDER = ["./","assets/abonnements-DiQqbPiD.js","assets/Abonnements-MSjvvARD.js","assets/Academie-C8qBUc0C.js","assets/Acces-c7ENqOvp.js","assets/actions-B8maOI9y.js","assets/afaire-DDPwaXqN.js","assets/AFaire-u3warVmo.js","assets/Analytics-D9K3jNjp.js","assets/Appels-Ddmxle7L.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/bilan-B-bfPYR0.css","assets/bilan-BG4POxUQ.js","assets/BilanMensuel-CnyRHQIm.js","assets/Branches-B8wCWzDx.js","assets/bridges-CYYnvBtr.js","assets/Caisse-C5dLI8hN.js","assets/caisse-du-soir-CGTPYSPh.js","assets/Caisses-gkXoM3I2.js","assets/Calendrier-DXK5PTz5.js","assets/Carnet-HW3FLtaY.js","assets/carte-6qoO0kpp.js","assets/carte-CXapndDr.css","assets/CarteModal-DMnFTMkY.js","assets/CartesCadeaux-CBDgxudz.js","assets/Catalogue-BT-4kxnc.js","assets/Cercle-BJkp6Mom.js","assets/certificat-BIgsKAOa.css","assets/certificat-DnQP1i0M.js","assets/certificats-coffre-Bql4MCD9.js","assets/ClotureDuTiroir-C6vPx-E_.css","assets/ClotureDuTiroir-C_sOv2dc.js","assets/Coffre-CT1ORJhE.js","assets/components-C-ggduDG.js","assets/compte-C3KZYQZL.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-CNUNB_HW.js","assets/Comptes-C4ZUTTLi.js","assets/Comptoir-Dd68tUrq.js","assets/consultation-CxYd69UD.js","assets/consultation-Dgb9KeZx.css","assets/Consultations-DvKEe4Ie.js","assets/consultNotes-CwAMb8Cd.js","assets/Conversations-DYNJQQJl.js","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-DnAfVmox.js","assets/currency-CzN07T4P.js","assets/Customers-D36XNveS.js","assets/Dashboard-jh6ufWO6.js","assets/dates-Kkv749xA.js","assets/Demandes-CZVsCXhf.js","assets/Depenses-YAYxbokk.js","assets/devise-fon-DX3P0bG4.woff2","assets/Encaissements-Cz1GJT0U.js","assets/enfants-BqZjFhwl.js","assets/Engagements-Bv-agMZK.js","assets/Engagements-Cj5S9MhG.css","assets/equipe-DpPyq6h-.css","assets/Evaluation-D3v5-z25.js","assets/FacturePrestataire-B-3iUqu_.js","assets/Factures-DQ8cuSyx.js","assets/Fil-BwhivGER.js","assets/finances-CCjqAkCE.css","assets/fournisseurs-BbJqYZ8U.js","assets/Fournisseurs-S5QntSL9.js","assets/foyer-Dz6WBLfR.js","assets/HomeRituals--qu7zoYU.js","assets/html2canvas.esm-QH1iLAAe.js","assets/identite-D0t8MBXJ.js","assets/index.es-DyR9_bbF.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-mnJqzqJB.js","assets/jspdf.es.min-C4F_uCY_.js","assets/JustePrix-BWSCblst.js","assets/kkiapay-jUZP9qYo.js","assets/laboratoire-B1FmjdqO.js","assets/Laboratoire-MtOGN9P2.js","assets/LettresAuDossier-CwOPPDI-.js","assets/maisons-DZdAeMF9.js","assets/Marketing-DeCF92KS.js","assets/Marque-lCe8acsu.js","assets/momo-C2ZVfV9J.js","assets/MonMois-B5zm5Nbc.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-B0deEkaX.js","assets/paliers-BttF3pfK.js","assets/Parametres-mnP4dytq.js","assets/parcours-DE4R0LZs.js","assets/Parrainages-BtxvJ_mG.css","assets/Parrainages-qEnllPom.js","assets/pdf-C8vXLJKc.js","assets/Personas-BxNGJ10Y.js","assets/Personnel--CQknK95.js","assets/photo-BciRKpat.js","assets/pilotage-CV1tnUgC.css","assets/Predictions-D1Srh8Tn.js","assets/Prestataires-BIAQicss.js","assets/prestataires-BljYb11a.js","assets/Prets-Dx6odqXD.js","assets/promos-DQmCkgs8.js","assets/protocoles-CdHVIonU.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-DGPW-YE1.js","assets/quiz-5qMPWZVi.js","assets/Rapport-CaHTbUC4.js","assets/RattacherUneCarte-tlyuWEwB.js","assets/Recommandations-BCYuWRuf.js","assets/SalonFoyer-CCuEHtUf.js","assets/Synthese-CbjzoUhx.js","assets/systeme-C3XFIa8E.css","assets/Tableau-DS0n8JyH.js","assets/Textes-Di6BzdAm.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-Di5uYslP.js","assets/trone-BuX0wRux.js","assets/trone-C5-dn5jj.css","assets/ui-oaDtGXu1.js","assets/vente-D0kdELDn.css","assets/Vitrine-DWLR_MKQ.js","assets/_contrat-tY6CfZ0r.js","assets/_heures-ilf0_vQc.js","assets/_shared-DEeqMKB9.js","assets/_signature-DdVxSZ1o.js"];
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
