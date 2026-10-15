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
const BUILD = "20261015214619";
const A_GARDER = ["./","assets/Abonnements-BaNDuwFp.js","assets/abonnements-Dq_PtzpE.js","assets/Academie-IREufGIA.js","assets/Acces-CSl_5_m_.js","assets/actions-DWWpYy0d.js","assets/AFaire-BcLTsPuc.js","assets/afaire-D-kYfQvf.js","assets/Analytics-CxZuQzpN.js","assets/Appels-K1wjt3Qr.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/AtelierDesContenus-BLa59VcG.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/Aujourdhui-CODfK-to.js","assets/bilan-B-bfPYR0.css","assets/bilan-CDDHFWG7.js","assets/BilanMensuel-BxHVs8Ee.js","assets/Branches-BHaR8odm.js","assets/bridges-C3Z0aptH.js","assets/Caisse-Di3oGMnF.js","assets/caisse-du-soir-D4pHALV_.js","assets/Caisses-CAWs1l01.js","assets/Calendrier-K5uX7fIF.js","assets/Carnet-DvqyOK6e.js","assets/carte-CCN7x_0N.js","assets/carte-WI2qP1su.css","assets/CarteModal-BGo1kTdk.js","assets/CartesCadeaux-ACSSNsAv.js","assets/Catalogue-CX_wcbjy.js","assets/CentreDeCommande-Du8kyJhp.css","assets/CentreDeCommande-hZ46QYBR.js","assets/Cercle-CsmwsvmM.js","assets/certificat-CviFxvCh.js","assets/certificat-DVSxho5e.css","assets/certificats-coffre-ByQfutnp.js","assets/ChiffreDesPrestations-CvfdA0Ok.js","assets/ClotureDuTiroir-C6vPx-E_.css","assets/ClotureDuTiroir-CHJHLh9f.js","assets/Coffre-Rnxt8fF8.js","assets/components-Bus8Pvo3.js","assets/compte-BA11Jnib.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-187AFKVy.js","assets/Comptes-5ngAR48X.js","assets/Comptoir-CnSQ6dFv.js","assets/consultation-BwrypLe-.js","assets/consultation-CCTm16qX.css","assets/Consultations-Dj1XP42F.js","assets/consultNotes-BTQ712X4.js","assets/Conversations-BY7vpNV-.js","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-C76qVU2X.js","assets/currency-CzN07T4P.js","assets/Customers-DtVQIxZZ.js","assets/Dashboard-C4XevRTO.js","assets/dates-FekyaDWL.js","assets/Demandes-DRj5sOWb.js","assets/Depenses-CEOiLUyp.js","assets/devise-fon-DX3P0bG4.woff2","assets/encaissement-pur-Bd4BFWib.js","assets/Encaissements-C3pqGvF_.js","assets/enfants-aBIm_IdC.js","assets/Engagements-CIW1-2jY.js","assets/Engagements-Cj5S9MhG.css","assets/EntreDeuxSeances-CKycPfqS.js","assets/equipe-DpPyq6h-.css","assets/Evaluation-BcshP_1k.js","assets/FacturePrestataire-CQ8GAH9C.js","assets/Factures-BH7MNzDw.js","assets/Fil-BYMlcTQN.js","assets/finances-CCjqAkCE.css","assets/Fournisseurs-BMGLECGm.js","assets/fournisseurs-DUWuAI-B.js","assets/foyer-CEz_DbxO.js","assets/HomeRituals-BYPYDNyz.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-sxA6Eo0c.js","assets/identite-CUItb3hF.js","assets/index-DOQ-fENd.js","assets/index.es-DWOnSM88.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-BKwA2dc0.js","assets/jspdf.es.min-j6a5ADh0.js","assets/JustePrix-Day79dDK.js","assets/kkiapay-DUJcijok.js","assets/laboratoire-D3jakw2D.js","assets/Laboratoire-Dt7AJcnY.js","assets/LettresAuDossier-Q8-RjSGx.js","assets/maisons-DZdAeMF9.js","assets/Marketing-BCs3oH5u.js","assets/Marque-CWOqEbWK.js","assets/momo-C2ZVfV9J.js","assets/MonMois-DagHMGrS.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-D932eDm8.js","assets/paliers-DNtzUe8a.js","assets/Parametres-HAGtS-u8.js","assets/parcours-Cyvq0HDy.js","assets/Parrainages-ChFT4abz.js","assets/Parrainages-gAHAPB_6.css","assets/pdf-BNW58xDZ.js","assets/Personas-BYDpw102.js","assets/Personnel-Bit-2y3D.js","assets/photo-Dhfhpe0S.js","assets/pilotage-CybSwMA-.css","assets/Predictions-RHkSqrjQ.js","assets/prestataires-CLCEiWGN.js","assets/Prestataires-D3IEgHSg.js","assets/Prets-j-ftaG-D.js","assets/promos-gMfj2oAS.js","assets/protocoles-0IJkKLvI.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-BPabsSBm.js","assets/quiz-5qMPWZVi.js","assets/Rapport-DZjDeqXp.js","assets/RattacherUneCarte-BFT2O4ue.js","assets/Recommandations-DPvsYUE6.js","assets/SalonFoyer-DZdUy8oG.js","assets/secretariat-admin-BH2Eoi49.js","assets/Secretariat-DGEpiHzQ.js","assets/Synthese-D9rEaqSE.js","assets/systeme-C3XFIa8E.css","assets/Tableau-BiHoaJlG.js","assets/Textes-CIE4S_VH.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-D-1HX1Iy.js","assets/trone-DIBAiD9Z.js","assets/trone-DnuuvbFM.css","assets/ui-CIvWwqqj.js","assets/vente-D0kdELDn.css","assets/Vitrine-C2UYvkMB.js","assets/_admin-DSqgAa3i.js","assets/_contrat-C8wIHp7S.js","assets/_heures-BfSAbMy6.js","assets/_reuni-CgKR3eTM.js","assets/_shared-CvzGDk0Y.js","assets/_signature-CB9CsFXA.js","assets/_ui-BHQSFAhx.js","assets/_ui-BWMA-PlM.css"];
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
