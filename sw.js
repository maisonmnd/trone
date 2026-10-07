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
const BUILD = "20261007201228";
const A_GARDER = ["./","assets/Abonnements-BA82CcOR.js","assets/abonnements-CrFdFtuX.js","assets/Academie--yrABDVb.js","assets/Acces-BQJA6HnI.js","assets/actions-CV3b-8za.js","assets/afaire-CT-xjO6c.js","assets/AFaire-mGT3Rc3M.js","assets/Analytics-IMkfk93H.js","assets/Appels-Dey3K6_P.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/bilan-B-bfPYR0.css","assets/bilan-BnJIzFHa.js","assets/BilanMensuel-B_r6URaY.js","assets/bourse-C40RHCRk.js","assets/Branches-YELze2o4.js","assets/bridges-CuGWE8IY.js","assets/caisse-du-soir-DL0W5Lqt.js","assets/Caisse-vRfst6w5.js","assets/Caisses-BN5WkYqt.js","assets/Calendrier-DChX8M1x.js","assets/Carnet-CCgfrAKB.js","assets/carte-Cm5xiP7u.js","assets/carte-CXapndDr.css","assets/CarteModal-nF-E12v6.js","assets/CartesCadeaux-Dk82f2wd.js","assets/Catalogue-smndLyop.js","assets/Cercle-BJv45nVO.js","assets/certificat--s_X-K1Z.js","assets/certificat-CyNbpgGx.css","assets/certificats-coffre-DkJUqyRM.js","assets/ClotureDuTiroir-C6vPx-E_.css","assets/ClotureDuTiroir-CO4nxI3v.js","assets/Coffre-DFfHaGzT.js","assets/components-D57DA4PN.js","assets/compte-courant-ByzulCEN.js","assets/compte-Ddt9suJB.js","assets/CompteCourant-UjjswuOJ.js","assets/Comptes-B5S0WEip.js","assets/Comptoir-PYm8Bp3W.js","assets/consultation-CEHGKuPz.js","assets/consultation-Dgb9KeZx.css","assets/Consultations-DnHufsv6.js","assets/consultNotes-BNNTTW_s.js","assets/Conversations-BeWCo8UN.js","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-Dnz4Febu.js","assets/currency-CzN07T4P.js","assets/Customers--ZETAN-X.js","assets/Dashboard-LqeJYdMc.js","assets/dates-CeLm1Aab.js","assets/Demandes-DV49Fawu.js","assets/Depenses-BCtJPnIe.js","assets/devise-fon-DX3P0bG4.woff2","assets/Encaissements-DrLvjWtZ.js","assets/enfants-TMzLm8Lq.js","assets/Engagements-Bga1uwBD.js","assets/Engagements-Cj5S9MhG.css","assets/equipe-DpPyq6h-.css","assets/Evaluation-Cq8tIwjJ.js","assets/FacturePrestataire-X6RQ5Zeb.js","assets/Factures-CAK7k8eA.js","assets/Fil-DqfvX1tr.js","assets/finances-CCjqAkCE.css","assets/Fournisseurs-DI2kmGGr.js","assets/fournisseurs-Dl5Odcso.js","assets/foyer-Cg94WDWl.js","assets/HomeRituals-BNV2iXRz.js","assets/html2canvas.esm-QH1iLAAe.js","assets/identite-0cz0KO4B.js","assets/index-DnQCxSrL.js","assets/index.es-DvLCRlPs.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-XthRXdRa.js","assets/jspdf.es.min-B0LdDqF9.js","assets/JustePrix-DsyA44g7.js","assets/kkiapay-BFHDAo_i.js","assets/laboratoire-1kUm_rNo.js","assets/Laboratoire-BcAFxvGT.js","assets/LettresAuDossier-C74Ou2Jv.js","assets/maisons-DZdAeMF9.js","assets/Marketing-CgJlynR6.js","assets/Marque-C6YZ82rz.js","assets/momo-C2ZVfV9J.js","assets/MonMois-CklIHGe4.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-DjXd72PR.js","assets/paliers-BaVVPIkD.js","assets/Parametres-D26vbfj-.js","assets/parcours-Bu2X-0SN.js","assets/Parrainages-CjSHdhgL.js","assets/Parrainages-CZu2j2iP.css","assets/pdf-YIkr1ZZB.js","assets/Personas-Cwxg3Ybg.js","assets/Personnel-DM0j7OTl.js","assets/photo-FyGPC064.js","assets/pilotage-DYbuDdJQ.css","assets/Predictions-DxAKEHuf.js","assets/prestataires-BHSO_FpJ.js","assets/Prestataires-Dcj6vGcM.js","assets/Prets-FV03Gnlg.js","assets/promos-Dr_aSn3-.js","assets/protocoles-DefyAOzS.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-CWWO18tB.js","assets/quiz-5qMPWZVi.js","assets/Rapport-BaKmtxlD.js","assets/RattacherUneCarte-B5j28cSk.js","assets/Recommandations-BqLSM3Vd.js","assets/SalonFoyer-aT3bYcGS.js","assets/Secretariat-DTRvmj3j.js","assets/Synthese-Da4wOXdd.js","assets/systeme-C3XFIa8E.css","assets/Tableau-DAsOdL7Y.js","assets/Textes-DLpOzRbT.css","assets/Textes-kqX_w68o.js","assets/tiroirs-Zdcoo0Sz.js","assets/trone-C2uAKaLG.js","assets/trone-C5-dn5jj.css","assets/ui-hh2f1DaL.js","assets/vente-D0kdELDn.css","assets/Vitrine-BqIckbwl.js","assets/_contrat-DV79FAKu.js","assets/_heures-CqJ5CkRu.js","assets/_shared-CP4Syd3U.js","assets/_signature-yLI41vg_.js"];
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
