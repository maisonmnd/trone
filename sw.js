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
const BUILD = "20261020083445";
const A_GARDER = ["./","assets/abonnements-BmY3lU2U.js","assets/Abonnements-DbUPfJGt.js","assets/Academie-DzR2fhqJ.js","assets/Acces-B3tIolPz.js","assets/actions-Cv2Msclu.js","assets/afaire--BJaln0f.js","assets/AFaire-Be2QqNIs.js","assets/Analytics-yESmalLZ.js","assets/Appels-DKu_GHv7.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/AtelierDesContenus-BYc-6t_D.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/Aujourdhui-BdCkBsSz.js","assets/bilan-B-bfPYR0.css","assets/bilan-DSkatmqp.js","assets/BilanMensuel-DG3Srhse.js","assets/Branches-Bt4YTl2X.js","assets/bridges-0lSRIMPS.js","assets/Caisse-CrzOxY9c.js","assets/caisse-du-soir-CunkKd8_.js","assets/Caisses-CeErQq_Y.js","assets/Calendrier-CYqlYv2G.js","assets/Carnet-7SfjYfdD.js","assets/carte-BcSxtltY.js","assets/carte-WI2qP1su.css","assets/CarteModal-B103g5bi.js","assets/CartesCadeaux-CqzWBHoE.js","assets/Catalogue-CRIS55vG.js","assets/CentreDeCommande-Bc2w0OVZ.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-DuM7EOce.js","assets/certificat-DVSxho5e.css","assets/certificat-DYM_85bD.js","assets/certificats-coffre-jymZaQVw.js","assets/ChiffreDesPrestations-s1Way3S0.js","assets/ClotureDuTiroir-B-0S0yFk.js","assets/ClotureDuTiroir-C6vPx-E_.css","assets/Coffre-B7XgimO1.js","assets/components-B5qj85O-.js","assets/compte-courant-ByzulCEN.js","assets/compte-D_faONrz.js","assets/CompteCourant-W6WUDXy_.js","assets/Comptes-DYn8E8ph.js","assets/Comptoir-DGkWQUrJ.js","assets/consultation-BCyKkKDJ.js","assets/consultation-CCTm16qX.css","assets/Consultations-BfuprEHB.js","assets/consultNotes-cRDgs06T.js","assets/Conversations-Ci2L4-y6.js","assets/Conversations-D4WwB5Zo.css","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-DedKeiJ1.js","assets/currency-qfIhGmrs.js","assets/Customers-BuegP3JU.js","assets/Dashboard-fpE_mUDg.js","assets/dates-dow2xvQ1.js","assets/Demandes-DkEIu782.js","assets/Depenses-CWJbhF5Z.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-CqrJc5ls.js","assets/diagnostics-au-trone-DM_rX76Q.js","assets/Discussions-Dnduf1d4.js","assets/encaissement-pur-Dkx39L-H.js","assets/Encaissements-DbxD8SLL.js","assets/enfants-DAHBGOdN.js","assets/Engagements-Cj5S9MhG.css","assets/Engagements-D6tq29ka.js","assets/EntreDeuxSeances-B_H4d-I8.js","assets/equipe-DpPyq6h-.css","assets/Evaluation-BBHD8FQU.js","assets/FacturePrestataire-B0cCo9Vi.js","assets/Factures-CV0pt9pb.js","assets/Fil-KZmmrW6I.js","assets/finances-CCjqAkCE.css","assets/fournisseurs-CSQRbDkg.js","assets/Fournisseurs-DLxLisab.js","assets/foyer-2awuwbMD.js","assets/gestes-conversation-BQmTCWoZ.js","assets/HomeRituals-Br9UXP8s.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-De0IoPNp.js","assets/ia-diagnostic-pur-BulIFgZQ.js","assets/ia-recu-pur-DcucZqpR.js","assets/identite-DJThxjSZ.js","assets/index-CMPVD6Yu.js","assets/index.es-C5ZDSyda.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-CDfiVr3h.js","assets/jspdf.es.min-hNRvcdQ9.js","assets/JustePrix-CC9BMKOG.js","assets/kkiapay-CN2S8swr.js","assets/laboratoire-B7IuDXCy.js","assets/Laboratoire-CnHgkmU3.js","assets/LettresAuDossier-B4GVZZw6.js","assets/maisons-CSSFrqZy.js","assets/Marketing-DT9pO3bN.js","assets/Marque-Ci5c37G8.js","assets/momo-C2ZVfV9J.js","assets/MonMois-7Qr-2xvJ.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-CdH8ShPd.js","assets/paliers-BU__GTyS.js","assets/Parametres-CXAx_pNI.js","assets/parcours-D6p_u7Lq.js","assets/Parrainages-B68Ahrrl.js","assets/Parrainages-gAHAPB_6.css","assets/pdf-BxeX3j_N.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/Personas-C9P_QBZt.js","assets/Personnel-VOyRYUhS.js","assets/photo-Bm73ICpy.js","assets/pilotage-Bn1gP_oo.css","assets/Predictions-hKUn0y0I.js","assets/prestataires-BK2faNsJ.js","assets/Prestataires-DEGJ7uyy.js","assets/Prets-BZ-BO5UX.js","assets/promos-BW44jzNO.js","assets/protocoles-WnziNS9d.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-CWmj7a1a.js","assets/qualification-B2A3HjVp.js","assets/quiz-5qMPWZVi.js","assets/Rapport-B69Mpv5P.js","assets/RattacherUneCarte-BdWZQ47y.js","assets/Recommandations-Iw3UoMTK.js","assets/relances-pur-DHxkbBX5.js","assets/releve-des-avis-F06fnWm4.js","assets/SalonFoyer-DEdX6Onq.js","assets/secretariat-admin-D2dYj6Zk.js","assets/Secretariat-CFxarc3S.js","assets/Secretariat-Cy79Zw30.css","assets/Signatures-DlHz1-A4.js","assets/SignerUnPdf-A2EytnVo.js","assets/Synthese-DpwU9OYT.js","assets/systeme-C3XFIa8E.css","assets/Tableau-oMzJfQF2.js","assets/Textes-BQIzFvVJ.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-BG327jhu.js","assets/tri-des-caisses-pur-B2sG60ht.js","assets/trone-pZGfh8P2.js","assets/trone-Q1Tg3_lc.css","assets/ui-OuuIKRNb.js","assets/vente-DMe4r4ed.css","assets/Vitrine-CRqZUnEh.css","assets/Vitrine-CWDe63KJ.js","assets/_admin-CRDBxNoA.js","assets/_contrat-BEdGd84u.js","assets/_heures-tZPTNqD3.js","assets/_reuni-Q_q92m7Q.js","assets/_shared-BQnnGF6b.js","assets/_signature-BzuDCEhl.js","assets/_ui-BWMA-PlM.css","assets/_ui-Dm34chxR.js"];
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
