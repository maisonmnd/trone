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
const BUILD = "20261016045315";
const A_GARDER = ["./","assets/Abonnements-DXB8AgmB.js","assets/abonnements-DYigSNNF.js","assets/Academie-DzWzZ6iH.js","assets/Acces-t1a0M3Lq.js","assets/actions-B7c7wpyb.js","assets/AFaire-BfWpoSHI.js","assets/afaire-Bp4kDyH7.js","assets/Analytics-FLEa6AGb.js","assets/Appels-DJjVTByn.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/AtelierDesContenus-Cr7Y0K7Q.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/Aujourdhui-f8s8DNtz.js","assets/bilan-B-bfPYR0.css","assets/bilan-CORqU5jj.js","assets/BilanMensuel-IoVmmTYK.js","assets/Branches-Bl6H79Pt.js","assets/bridges-O9z6Lfs4.js","assets/Caisse-B8x2gRZD.js","assets/caisse-du-soir-BzvzLoJc.js","assets/Caisses-uJgHXbkZ.js","assets/Calendrier-CmHoL0sb.js","assets/Carnet-vJ9qOhgv.js","assets/carte-CBoM9oCZ.js","assets/carte-WI2qP1su.css","assets/CarteModal-D1A0X9W4.js","assets/CartesCadeaux-CMPw-uXi.js","assets/Catalogue-C3n8r1jx.js","assets/CentreDeCommande-BhI5wo4M.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-ZTmP46Jg.js","assets/certificat-DVSxho5e.css","assets/certificat-JaoU_BP2.js","assets/certificats-coffre-Bv65xbdR.js","assets/ChiffreDesPrestations-DJtFDHIf.js","assets/ClotureDuTiroir-C6vPx-E_.css","assets/ClotureDuTiroir-CqTQBn2r.js","assets/Coffre-DbuG4vBj.js","assets/components-D0-Y8dIq.js","assets/compte-courant-ByzulCEN.js","assets/compte-EJHBoexs.js","assets/CompteCourant-CxRLDAz1.js","assets/Comptes-B9BsRKO8.js","assets/Comptoir-CZMkjABY.js","assets/consultation-9RS6PxbL.js","assets/consultation-CCTm16qX.css","assets/Consultations-BHSwTLkv.js","assets/consultNotes-xI50M_Mv.js","assets/Conversations-DOqnPjI5.js","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-VjFse55U.js","assets/currency-D4l65sA8.js","assets/Customers-BCJ8kwCG.js","assets/Dashboard-iDugu9ID.js","assets/dates-COdqlTWQ.js","assets/Demandes-DMi5lrQH.js","assets/Depenses-DltwBF4P.js","assets/devise-fon-DX3P0bG4.woff2","assets/encaissement-pur-CMuCRQoE.js","assets/Encaissements-Cvm4a6rd.js","assets/enfants-3_d1la7Q.js","assets/Engagements-C2nzbDMe.js","assets/Engagements-Cj5S9MhG.css","assets/EntreDeuxSeances-6GwHZ0mr.js","assets/equipe-DpPyq6h-.css","assets/Evaluation-CS7J57xG.js","assets/FacturePrestataire-CMENvrfV.js","assets/Factures-Btnaph7e.js","assets/Fil-DAbzhf_O.js","assets/finances-CCjqAkCE.css","assets/fournisseurs-CVPNmVd_.js","assets/Fournisseurs-dTg9rJk3.js","assets/foyer-DXRV6Je8.js","assets/HomeRituals-DJBcMpta.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-BzIqUWJi.js","assets/identite-BIMXgjxf.js","assets/index-IDqBWoGK.js","assets/index.es-DHv1wNKK.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-Djh6xvzD.js","assets/jspdf.es.min-2j5xzwOl.js","assets/JustePrix-Cl-efbAf.js","assets/kkiapay-BOX9RVYM.js","assets/laboratoire-BeX-iwgW.js","assets/Laboratoire-C7YSTUwH.js","assets/LettresAuDossier-DRSnvNQc.js","assets/maisons-CSSFrqZy.js","assets/Marketing-B1kddE57.js","assets/Marque-DQajpMAn.js","assets/momo-C2ZVfV9J.js","assets/MonMois-DKduc_DP.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-MimoVgi6.js","assets/paliers-D17bZLNl.js","assets/Parametres-D_JFw3kL.js","assets/parcours-_GD4cNze.js","assets/Parrainages-BMunEYOm.js","assets/Parrainages-gAHAPB_6.css","assets/pdf-6MqFT4LF.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/Personas-HiNvzyxb.js","assets/Personnel-CPnY3-mT.js","assets/photo-Dey0IO7k.js","assets/pilotage-zgHszBdF.css","assets/Predictions-bvJ6an-w.js","assets/Prestataires-B-T9N24e.js","assets/prestataires-CV1NJ-I1.js","assets/Prets-DkckI4BU.js","assets/promos-BvxWhNBs.js","assets/protocoles-44OfuUJL.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-BBAZMjSk.js","assets/quiz-5qMPWZVi.js","assets/Rapport-C1uCTekr.js","assets/RattacherUneCarte-CFYTZ1Kg.js","assets/Recommandations-DFNQF2om.js","assets/SalonFoyer-CQd33M4l.js","assets/secretariat-admin-C2npTck1.js","assets/Secretariat-IBCMrkGg.js","assets/Signatures-Bhmh4fh1.js","assets/SignerUnPdf-DG-MEhsb.js","assets/Synthese-DblLYg2E.js","assets/systeme-C3XFIa8E.css","assets/Tableau-BANHQp0H.js","assets/Textes-DGlp59h1.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-DlH9439s.js","assets/trone-DnuuvbFM.css","assets/trone-MTbqaI-w.js","assets/ui-C4b6gBBa.js","assets/vente-D0kdELDn.css","assets/Vitrine-CLo-puOR.js","assets/_admin-DA0XcUp2.js","assets/_contrat-CeQ_Zy2L.js","assets/_heures-B4J-D_g8.js","assets/_reuni-Dc-Ml7ti.js","assets/_shared-DmTBf_Dq.js","assets/_signature-C4_gx4Jk.js","assets/_ui-BWMA-PlM.css","assets/_ui-CM-RuOsG.js"];
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
