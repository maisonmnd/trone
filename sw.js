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
const BUILD = "20261021081501";
const A_GARDER = ["./","assets/abonnements-C_peHwRJ.js","assets/Abonnements-DhuGL4OI.js","assets/Academie-BmJuiIgL.js","assets/Acces-BeY6VWCX.js","assets/actions-Bq3r05po.js","assets/afaire-BVXZuW-t.js","assets/AFaire-HdBgXIF1.js","assets/Analytics-BkHKNbyD.js","assets/Appels-CAPJUUCv.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/AtelierDesContenus-B4SZ6dQq.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/Aujourdhui-DMn7VWlO.js","assets/bilan-B-bfPYR0.css","assets/bilan-Cm3LVMTH.js","assets/BilanMensuel-CRVVRu2i.js","assets/Branches-CQc-EB1b.js","assets/bridges-BeSybgYI.js","assets/Caisse-BHNqVylz.js","assets/caisse-du-soir-BkfFyYqC.js","assets/Caisses-CuQB99lo.js","assets/Calendrier-BVNfSgMP.js","assets/Carnet-C5MZNVCj.js","assets/carte-COH27W5X.js","assets/carte-WI2qP1su.css","assets/CarteModal-5K-X_GwT.js","assets/CartesCadeaux-BKzNtXHq.js","assets/Catalogue-DjMowlsg.js","assets/CentreDeCommande-ClbAuDTN.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-CjumXrKk.js","assets/certificat-DRc74Mjh.js","assets/certificat-DVSxho5e.css","assets/certificats-coffre-Hw9nEqgW.js","assets/ChiffreDesPrestations-BcNxwkgu.js","assets/ClotureDuTiroir-B3YlUpSS.js","assets/ClotureDuTiroir-C6vPx-E_.css","assets/Coffre-BUtze3Fs.js","assets/components-CaNmWXbB.js","assets/compte-courant-ByzulCEN.js","assets/compte-erTJeQAS.js","assets/CompteCourant-DW2MBiae.js","assets/Comptes-BNJqcqYj.js","assets/Comptoir-Vb-vtbCH.js","assets/consultation-BPgLEKb3.js","assets/consultation-CCTm16qX.css","assets/Consultations-C02fm0gD.js","assets/consultNotes-BYJIygJq.js","assets/Conversations-D4WwB5Zo.css","assets/Conversations-mVE2btyZ.js","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-Bl4olOwB.js","assets/currency-qfIhGmrs.js","assets/Customers-DCOVtXzj.js","assets/Dashboard-CgiLd0L_.js","assets/dates-BVj4YGJa.js","assets/Demandes-ELCU1WoG.js","assets/Depenses-CGga55Cq.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-Nh1cFGYZ.js","assets/diagnostics-au-trone-DvxX1jsr.js","assets/Discussions-C5Fsx1IG.js","assets/encaissement-pur-BnSyRCFF.js","assets/Encaissements-oZhwlBkP.js","assets/enfants-DHf8Jk1G.js","assets/Engagements-Cj5S9MhG.css","assets/Engagements-DeVHdhtg.js","assets/EntreDeuxSeances-BWsdrG3B.js","assets/equipe-DABhdlQT.css","assets/Evaluation-CmcHy6Xt.js","assets/FacturePrestataire-BPUJosMb.js","assets/Factures-2VLRPDXs.js","assets/Fil-CQe3-KzW.js","assets/finances-CCjqAkCE.css","assets/fournisseurs-BxtBzSjA.js","assets/Fournisseurs-CdU4waLp.js","assets/foyer-B9KSGy-w.js","assets/gestes-conversation-BfpIbViX.js","assets/HomeRituals-BLwtuA6d.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-PH6IvI8X.js","assets/ia-diagnostic-pur-BulIFgZQ.js","assets/ia-recu-pur-DcucZqpR.js","assets/identite-CwLwFtS8.js","assets/index-iyewlqJd.js","assets/index.es-DR0c0VnS.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-DJkZeGu2.js","assets/jspdf.es.min-DS6adCKk.js","assets/JustePrix-Bic8MbLk.js","assets/kkiapay-DzUv6trC.js","assets/laboratoire-A4LZoDa6.js","assets/Laboratoire-I9eDTsNn.js","assets/LettresAuDossier-BTUZv3o3.js","assets/LienMndPay-DBQA8vRP.js","assets/maisons-CSSFrqZy.js","assets/Marketing-GiYJF2Ue.js","assets/Marque-DRlJ-3US.js","assets/momo-C2ZVfV9J.js","assets/MonMois-CMBINvW1.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-ywvZub1w.js","assets/paliers-CGVDyA7P.js","assets/Parametres-CYaR8pWi.js","assets/parcours-CzWoI288.js","assets/Parrainages-gAHAPB_6.css","assets/Parrainages-mj6tzoKH.js","assets/pdf-CIQRh05Y.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/Personas-CTc2WPKi.js","assets/Personnel-DyRTqnJo.js","assets/photo-Bqy2AZvT.js","assets/pilotage-Bn1gP_oo.css","assets/Predictions-BfaOAgvo.js","assets/prestataires-B05UcVk7.js","assets/Prestataires-IHFIkqc0.js","assets/Prets-BpArymXH.js","assets/promos-Be3iftDG.js","assets/protocoles-D4nkZoUu.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-D-dgL2H5.js","assets/qualification-OHCA-ahP.js","assets/quiz-5qMPWZVi.js","assets/Rapport-C9ixVgkz.js","assets/RattacherUneCarte-DitKpXHl.js","assets/Recommandations-BZPy5Rxe.js","assets/relances-pur-DsIo28uB.js","assets/releve-des-avis-CKk73I-i.js","assets/SalonFoyer-DrFb1rEU.js","assets/secretariat-admin-CzdLDb0y.js","assets/Secretariat-BMG5yVZR.js","assets/Secretariat-Cy79Zw30.css","assets/Signatures-s5gCkrbm.js","assets/SignerUnPdf-B43URYhA.js","assets/Synthese-BHF5BYF3.js","assets/systeme-C3XFIa8E.css","assets/Tableau-DpPfnRRD.js","assets/Textes-CCTFfhnO.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-CFcaE6Bp.js","assets/trace-du-moyen-pur-BQm6t3bk.js","assets/trone-CDw1xWbC.js","assets/trone-wvMgyufp.css","assets/ui-BCR58kFn.js","assets/vente-DMe4r4ed.css","assets/Vitrine-CRqZUnEh.css","assets/Vitrine-Xw0g3OvB.js","assets/_admin-B78MYIPW.js","assets/_contrat-ByU8yCpY.js","assets/_heures-C916y3hZ.js","assets/_reuni-G3SvJCD-.js","assets/_shared-BRlKCR2M.js","assets/_signature-ETh_Ehpk.js","assets/_ui-0Nn_lhwq.js","assets/_ui-BWMA-PlM.css"];
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
