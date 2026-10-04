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
const BUILD = "20261004144521";
const A_GARDER = ["./","assets/Abonnements-Bpzfc3hc.js","assets/abonnements-HTWhxjxf.js","assets/Academie-_QxKwekp.js","assets/Acces-Co0RW_HE.js","assets/actions-YOaGWW4M.js","assets/AFaire-BlvU7-Iq.js","assets/afaire-C0K_CnKP.js","assets/Analytics-BVcyw_5R.js","assets/Appels-LY5phwcn.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/bilan-B-bfPYR0.css","assets/bilan-C74cux1n.js","assets/BilanMensuel-B8I05HL3.js","assets/bilans-rpJ4-Hr7.js","assets/Branches-CgtbOVF0.js","assets/bridges-CRwLKonZ.js","assets/Caisse-D-wDa_1o.js","assets/caisse-du-soir-2czCr_gP.js","assets/Caisses-O1x-tL4f.js","assets/Calendrier-CXJSG6KF.js","assets/Carnet-Cao4TG25.js","assets/carte-CXapndDr.css","assets/carte-DNgO_Ava.js","assets/CarteModal-om_1wQI2.js","assets/CartesCadeaux-D8-PXeTv.js","assets/Catalogue-IH7GrCsO.js","assets/Cercle-B9Ho7UNY.js","assets/certificat-BIgsKAOa.css","assets/certificat-WkkOaV0f.js","assets/certificats-coffre-v4wJu4Vw.js","assets/ClotureDuTiroir-C6vPx-E_.css","assets/ClotureDuTiroir-L1LCaqKt.js","assets/Coffre-B_amYZQk.js","assets/components-C36r7JSU.js","assets/compte-Cli1qFED.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-CLaMFYrj.js","assets/Comptes-CkMtSUDv.js","assets/Comptoir-BspkcV0u.js","assets/consultation-Dgb9KeZx.css","assets/consultation-EZO-J90d.js","assets/Consultations-CQuTjJLw.js","assets/consultNotes-CdeJGXx3.js","assets/Conversations-DUHffId-.js","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-19DbjMyD.js","assets/currency-CzN07T4P.js","assets/Customers-9kUQdibn.js","assets/Dashboard-_wHhEL75.js","assets/dates-BFxNFJae.js","assets/Demandes-B_P9O36n.js","assets/Depenses-DS9wCA0r.js","assets/devise-fon-DX3P0bG4.woff2","assets/Encaissements-CzT7Bi8r.js","assets/enfants-B7SA7tAW.js","assets/Engagements-C1ob6pvN.js","assets/Engagements-Cj5S9MhG.css","assets/equipe-DpPyq6h-.css","assets/Evaluation-Bp-LG9Mq.js","assets/FacturePrestataire-D8DXkRNq.js","assets/Factures-UuCsBw4n.js","assets/Fil-Te1epleQ.js","assets/finances-CCjqAkCE.css","assets/fournisseurs-Cz-0xKx_.js","assets/Fournisseurs-lACpgDJg.js","assets/foyer-B1a2Q9go.js","assets/HomeRituals-DV82kS8f.js","assets/html2canvas.esm-QH1iLAAe.js","assets/identite-CiNa34e8.js","assets/index.es-B_qnyyMC.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-CZosar7z.js","assets/jspdf.es.min-u8MDYxHO.js","assets/JustePrix-WKkmRSZb.js","assets/kkiapay-BT8DYqHh.js","assets/laboratoire-BVuYJEZC.js","assets/Laboratoire-BzAp7dQQ.js","assets/LettresAuDossier-Do-HErjg.js","assets/maisons-DZdAeMF9.js","assets/Marketing-D0mO8bYB.js","assets/Marque-scShpGqh.js","assets/momo-C2ZVfV9J.js","assets/MonMois-CZ_I9PWP.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-B68LfJQv.js","assets/paliers-LNu7vtAb.js","assets/Parametres-CUNynRwv.js","assets/parcours-B4GQ88Vh.js","assets/Parrainages-BtxvJ_mG.css","assets/Parrainages-FX1wukDT.js","assets/pdf-BQBjteMl.js","assets/Personas-7JrzO8XX.js","assets/Personnel-9mEXRdQN.js","assets/photo-CoO9uGf8.js","assets/pilotage-CV1tnUgC.css","assets/Predictions-Bgf6be0S.js","assets/prestataires-BOjuUBcH.js","assets/Prestataires-D07UNuqv.js","assets/Prets-Brqc5oQ0.js","assets/promos-C-qfET9A.js","assets/protocoles-D0DK2aO6.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-DxkgWCdf.js","assets/quiz-M3wxluxi.js","assets/Rapport-D5SmpDgL.js","assets/RattacherUneCarte-CJ3FWvF1.js","assets/Recommandations-D_uYHDPK.js","assets/SalonFoyer-Co1sN4ei.js","assets/Synthese-CkhpCt0y.js","assets/systeme-C3XFIa8E.css","assets/Tableau-BhRjT3fg.js","assets/Textes-DLpOzRbT.css","assets/Textes-DqYvoAsU.js","assets/tiroirs-CugtfXE2.js","assets/trone-C5-dn5jj.css","assets/trone-DACs6Naq.js","assets/ui-CqUJpHvl.js","assets/vente-D0kdELDn.css","assets/Vitrine-N_2uqyO9.js","assets/_contrat-DH3FRuim.js","assets/_heures-C1x6bJKj.js","assets/_shared-CotbSvaZ.js","assets/_signature-Dq74zad2.js"];
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
