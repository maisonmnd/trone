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
const BUILD = "20261019214035";
const A_GARDER = ["./","assets/abonnements-BUxI9ufQ.js","assets/Abonnements-lmy4iXf-.js","assets/Academie-Ba-NUY0Q.js","assets/Acces-Tp1UbxYz.js","assets/actions-Cj1tC0x6.js","assets/AFaire-Cpee8e4_.js","assets/afaire-xnHVdLBE.js","assets/Analytics-Be4ArG1g.js","assets/Appels-C6QUirPO.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/AtelierDesContenus-Ce-DrkAL.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/Aujourdhui-BVA3oRgB.js","assets/bilan-B-bfPYR0.css","assets/bilan-CyR7EYw-.js","assets/BilanMensuel-DmCZXVOt.js","assets/Branches-cUdqHKkf.js","assets/bridges-B3ieXQCH.js","assets/caisse-du-soir-CsjaY79-.js","assets/Caisse-Pxd06Dih.js","assets/Caisses-DYtX71aU.js","assets/Calendrier-BluouGym.js","assets/Carnet-CWYJBYEG.js","assets/carte-WI2qP1su.css","assets/carte-YwKBRQ85.js","assets/CarteModal-CyPOypgs.js","assets/CartesCadeaux-ndyjAM3d.js","assets/Catalogue-XAIkv12R.js","assets/CentreDeCommande-B_gscx-j.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-B6rfl8uO.js","assets/certificat-D82ZiksJ.js","assets/certificat-DVSxho5e.css","assets/certificats-coffre-B1pnK5ZI.js","assets/ChiffreDesPrestations-Cfbz6JbI.js","assets/ClotureDuTiroir-BDcYyY6d.js","assets/ClotureDuTiroir-C6vPx-E_.css","assets/Coffre-o5ezAxZ6.js","assets/components-CIhi-sun.js","assets/compte-courant-ByzulCEN.js","assets/compte-DQbbjzpf.js","assets/CompteCourant-CLbxC92W.js","assets/Comptes-DbKVHVVF.js","assets/Comptoir-DjmssHKj.js","assets/consultation-CCTm16qX.css","assets/consultation-DGpudlWb.js","assets/Consultations-D9aAW3oY.js","assets/consultNotes-DZUoljbC.js","assets/Conversations-D4WwB5Zo.css","assets/Conversations-DrJE6yuQ.js","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-CyiervLz.js","assets/currency-qfIhGmrs.js","assets/Customers-PTDk4dn-.js","assets/Dashboard-PVW9LlhQ.js","assets/dates-Bz_RCfni.js","assets/Demandes-b-XuFJqW.js","assets/Depenses-DgM6Dtkv.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-B8796v8b.js","assets/diagnostics-au-trone-dKiCfXmQ.js","assets/Discussions-DmuCxz6r.js","assets/encaissement-pur-CQjbWdUN.js","assets/Encaissements-OijcTHi4.js","assets/enfants-CqSmJ4LY.js","assets/Engagements-Cj5S9MhG.css","assets/Engagements-Dl3Ti7BE.js","assets/EntreDeuxSeances-jBlOYY3T.js","assets/equipe-DpPyq6h-.css","assets/Evaluation-CO-Is9d2.js","assets/FacturePrestataire-C3UUy2Bv.js","assets/Factures-CrDgZpsf.js","assets/Fil-fdho_7_f.js","assets/finances-CCjqAkCE.css","assets/fournisseurs-Bpka47IS.js","assets/Fournisseurs-CjMJYztE.js","assets/foyer-CYYJDOEo.js","assets/gestes-conversation-C2eXzUxc.js","assets/HomeRituals-CrNexVO8.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-5zy461K6.js","assets/ia-diagnostic-pur-BulIFgZQ.js","assets/ia-recu-pur-DcucZqpR.js","assets/identite-IvrCG2Pc.js","assets/index-NWJXu1t4.js","assets/index.es-Dc8etChG.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-uflx-iv3.js","assets/jspdf.es.min-1YbHGNI8.js","assets/JustePrix-COW4C8tN.js","assets/kkiapay-CVoHV1iF.js","assets/Laboratoire-0GKGGicm.js","assets/laboratoire-CX_pHrXn.js","assets/LettresAuDossier-C9srJMel.js","assets/maisons-CSSFrqZy.js","assets/Marketing-CKPDHeNm.js","assets/Marque-Bb5l2Qea.js","assets/momo-C2ZVfV9J.js","assets/MonMois-jGvnJMzD.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-DZwym3VU.js","assets/paliers-DKKJwWSE.js","assets/Parametres-BfJgI7E2.js","assets/parcours-C3lr-k6r.js","assets/Parrainages-DnM1nU3p.js","assets/Parrainages-gAHAPB_6.css","assets/pdf-DHeKu4fI.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/Personas-DDiRMja0.js","assets/Personnel-oi-eruVp.js","assets/photo-BMODmJkL.js","assets/pilotage-Bn1gP_oo.css","assets/Predictions-BC-hYzld.js","assets/Prestataires-C4dfVKII.js","assets/prestataires-CujE4kKk.js","assets/Prets-BeuaDiBW.js","assets/promos-DOb6ARZ5.js","assets/protocoles-S4N8YM_1.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-Chjsq5aX.js","assets/qualification-BWy_eijk.js","assets/quiz-5qMPWZVi.js","assets/Rapport-DdIk8OeR.js","assets/RattacherUneCarte-Ci2MBJrg.js","assets/Recommandations-h4BHKqSw.js","assets/relances-pur-DHxkbBX5.js","assets/SalonFoyer-DkoQHK4J.js","assets/secretariat-admin-CoCLmASa.js","assets/Secretariat-CpdXg7Um.js","assets/Secretariat-Cy79Zw30.css","assets/Signatures-B6ntVdun.js","assets/SignerUnPdf-DB4Bu7kZ.js","assets/Synthese-BcFAfNSm.js","assets/systeme-C3XFIa8E.css","assets/Tableau-CmTDj1qz.js","assets/Textes-CZ84BIPB.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-BwxU5w_X.js","assets/tri-des-caisses-pur-DnQZPr50.js","assets/trone-BI0AqWZX.css","assets/trone-DiDTIUdR.js","assets/ui-DxPTb0oj.js","assets/vente-DMe4r4ed.css","assets/Vitrine-DmSTRtbq.js","assets/_admin-D9Z0acr6.js","assets/_contrat-CsW_RzG3.js","assets/_heures-CGfN3dWz.js","assets/_reuni-DEuFEm2g.js","assets/_shared-DC44HlzZ.js","assets/_signature-C0TwoWlM.js","assets/_ui-84tKRBah.js","assets/_ui-BWMA-PlM.css"];
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
