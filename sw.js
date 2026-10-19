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
const BUILD = "20261019153053";
const A_GARDER = ["./","assets/abonnements-CKK1MpdH.js","assets/Abonnements-DVqX5F5p.js","assets/Academie-D93ad06z.js","assets/Acces-CYBPkAtd.js","assets/actions-CSefIoWA.js","assets/afaire-CZa_yF5M.js","assets/AFaire-DMR0Wp_p.js","assets/Analytics-C3IS9mRl.js","assets/Appels-D6EhTiBa.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/AtelierDesContenus-4BnrUcdF.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/Aujourdhui-BeXya5W_.js","assets/bilan-B-bfPYR0.css","assets/bilan-BhpRrYnK.js","assets/BilanMensuel-Brqzr5F7.js","assets/Branches-DJp_aF1F.js","assets/bridges-DFUq_ogM.js","assets/Caisse-C6f8d4ND.js","assets/caisse-du-soir-D1Ct2qSe.js","assets/Caisses-C2BQoLO5.js","assets/Calendrier-DFTKcxh3.js","assets/Carnet-2BQVsc_t.js","assets/carte-WI2qP1su.css","assets/carte-XoMlplAe.js","assets/CarteModal-IA0Olx_B.js","assets/CartesCadeaux-Dbr5oqiQ.js","assets/Catalogue-CxhBiQFF.js","assets/CentreDeCommande-Czuicyec.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-UzGS0QhC.js","assets/certificat-BrEqWssO.js","assets/certificat-DVSxho5e.css","assets/certificats-coffre-DHNgfo8A.js","assets/ChiffreDesPrestations-B9ISPLSh.js","assets/ClotureDuTiroir-C6vPx-E_.css","assets/ClotureDuTiroir-CPEDTmOU.js","assets/Coffre-BPaFpxqa.js","assets/components-BBRSrBep.js","assets/compte-courant-ByzulCEN.js","assets/compte-FKsACkCJ.js","assets/CompteCourant-BzDRkIdo.js","assets/Comptes-BmvC6uV_.js","assets/Comptoir-Cp01xZ1s.js","assets/consultation-CCTm16qX.css","assets/consultation-yx7tlzm1.js","assets/Consultations-BD-L2yD5.js","assets/consultNotes-Ccmt-bjG.js","assets/Conversations-BKutlyIT.js","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-EZe4kcse.js","assets/currency-qfIhGmrs.js","assets/Customers-5eF23Wug.js","assets/Dashboard-DP0AQaLU.js","assets/dates-B36AHd2y.js","assets/Demandes-C0PXHxdp.js","assets/Depenses-BDvav5uI.js","assets/devise-fon-DX3P0bG4.woff2","assets/Discussions-TyB9w933.js","assets/encaissement-pur-CMNV9QD_.js","assets/Encaissements-CydPaeJ-.js","assets/enfants-CHaj873t.js","assets/Engagements-Cj5S9MhG.css","assets/Engagements-DmL6pI6A.js","assets/EntreDeuxSeances-_o1mbr1Z.js","assets/equipe-DpPyq6h-.css","assets/Evaluation-CJDqEdJ3.js","assets/FacturePrestataire-B867Ayjf.js","assets/Factures-D8HYj8dg.js","assets/Fil-BcYD7tJA.js","assets/finances-CCjqAkCE.css","assets/fournisseurs-BJXv_y3u.js","assets/Fournisseurs-DZlpLKMH.js","assets/foyer-Irm7WXZo.js","assets/gestes-conversation-oaZU0jgL.js","assets/HomeRituals-zw-cDKy5.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-CUskzU4D.js","assets/identite-Badlx510.js","assets/index-Du2o-y0Y.js","assets/index.es-TW36l34l.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-CA0V2Xpv.js","assets/jspdf.es.min-DCEt2dWN.js","assets/JustePrix-BBo0Oe9o.js","assets/kkiapay-BpnZpy5M.js","assets/laboratoire-Cm2n6V7N.js","assets/Laboratoire-DWL89m-z.js","assets/LettresAuDossier-BijoH3ai.js","assets/maisons-CSSFrqZy.js","assets/Marketing-eAi9003z.js","assets/Marque-Dds4wf3-.js","assets/momo-C2ZVfV9J.js","assets/MonMois-FOFsHOwh.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-LGC21DMF.js","assets/paliers-Cw5wTAO5.js","assets/Parametres-CRKuAZ8b.js","assets/parcours-DJrfYFbB.js","assets/Parrainages-Bz53WLET.js","assets/Parrainages-gAHAPB_6.css","assets/pdf-de-la-piece-BNgIub-P.js","assets/pdf-S7-vVBvI.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/Personas-_Dzjelzg.js","assets/Personnel-B7eC55Qz.js","assets/photo-DLVEe_o-.js","assets/pilotage-Bn1gP_oo.css","assets/Predictions-Duh3i9HG.js","assets/Prestataires-CKOGRrts.js","assets/prestataires-D_DGMQAl.js","assets/Prets-C7i0x5ri.js","assets/promos-B12iD5PX.js","assets/protocoles-C8q5KbQZ.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-CfsaKNhZ.js","assets/quiz-5qMPWZVi.js","assets/Rapport-CYqTruLs.js","assets/RattacherUneCarte-D0-SDGJk.js","assets/Recommandations-Bd5xN6Dk.js","assets/relances-pur-DHxkbBX5.js","assets/SalonFoyer-BqQ_otW1.js","assets/secretariat-admin-DwDMaAay.js","assets/Secretariat-BiuwoBEN.js","assets/Signatures-CFxEtNPM.js","assets/SignerUnPdf-Kp258Y9m.js","assets/Synthese-Dc2hTFiw.js","assets/systeme-C3XFIa8E.css","assets/Tableau-CC7zMmZY.js","assets/Textes-DdteJXVb.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-sPCHvk9h.js","assets/tri-des-caisses-pur-Cs2rul9Z.js","assets/trone-BI0AqWZX.css","assets/trone-WGujqSI4.js","assets/ui-DzoGnu87.js","assets/vente-DMe4r4ed.css","assets/Vitrine-xTtXuKpA.js","assets/_admin-NR1Fk8q5.js","assets/_contrat-Bm8U8jA-.js","assets/_heures-CWlUlN66.js","assets/_reuni-CV8zizfG.js","assets/_shared-DWB0GyoJ.js","assets/_signature-DBo7iNA2.js","assets/_ui-BWMA-PlM.css","assets/_ui-DKaGv8QQ.js"];
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
