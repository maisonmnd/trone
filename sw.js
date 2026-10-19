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
const BUILD = "20261019210743";
const A_GARDER = ["./","assets/abonnements-CHRN6I-i.js","assets/Abonnements-VGEln_-0.js","assets/Academie-R0ZlNCYP.js","assets/Acces-bMH1lAI8.js","assets/actions-DKI1O--E.js","assets/AFaire-BvPz7WYj.js","assets/afaire-DYumf_HN.js","assets/Analytics-w6TKEk1w.js","assets/Appels-l12wCRDz.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/AtelierDesContenus-BW3Ljbic.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/Aujourdhui-CRkgj9H0.js","assets/bilan-B-bfPYR0.css","assets/bilan-DDOihFeP.js","assets/BilanMensuel-DuvgjvYu.js","assets/Branches-DVjhBOGJ.js","assets/bridges-BooESSjK.js","assets/Caisse-BzsnRldN.js","assets/caisse-du-soir-DWPNTNm4.js","assets/Caisses-DzJ99NFx.js","assets/Calendrier-CL24w5vX.js","assets/Carnet-mscBdPDn.js","assets/carte-CUh23KcS.js","assets/carte-WI2qP1su.css","assets/CarteModal-C35GeZW0.js","assets/CartesCadeaux-BVy0Lqf1.js","assets/Catalogue-DnNQfm-7.js","assets/CentreDeCommande-b6ytzul3.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-79pv2ccV.js","assets/certificat-DeOmZS7h.js","assets/certificat-DVSxho5e.css","assets/certificats-coffre-DBNAXVGn.js","assets/ChiffreDesPrestations-DUSCSxpt.js","assets/ClotureDuTiroir-C6vPx-E_.css","assets/ClotureDuTiroir-Dvh88z7F.js","assets/Coffre-Bd_3Z_Vb.js","assets/components-DrcuUx6N.js","assets/compte-Ca4pTU47.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-5e7t8Wr-.js","assets/Comptes-CSTcKpgr.js","assets/Comptoir-DsWmXwqZ.js","assets/consultation-CCTm16qX.css","assets/consultation-NbJ2TcE0.js","assets/Consultations-NRmf6hWq.js","assets/consultNotes-BqZWm25G.js","assets/Conversations-CcUgZmWJ.js","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-BwaQlVc0.js","assets/currency-qfIhGmrs.js","assets/Customers-CxYFQbq6.js","assets/Dashboard-DTgPkdy1.js","assets/dates-2TTDCDD1.js","assets/Demandes-lrcaSmRp.js","assets/Depenses-N08I9TTt.js","assets/devise-fon-DX3P0bG4.woff2","assets/Discussions-CxoifJro.js","assets/encaissement-pur-C03oL6vR.js","assets/Encaissements-CHq1fxnj.js","assets/enfants-B2j_nczt.js","assets/Engagements-Bcsfv7bU.js","assets/Engagements-Cj5S9MhG.css","assets/EntreDeuxSeances-CPADESWM.js","assets/equipe-DpPyq6h-.css","assets/Evaluation-CKOmdssl.js","assets/FacturePrestataire-Dxe6_QY3.js","assets/Factures-BRgoGIOz.js","assets/Fil-BK-NG-FC.js","assets/finances-CCjqAkCE.css","assets/fournisseurs-BOFl1WUP.js","assets/Fournisseurs-Br_Iztix.js","assets/foyer-DuJR903I.js","assets/gestes-conversation-DEwypXIv.js","assets/HomeRituals-C1Xpe08y.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-BaK8StF-.js","assets/ia-maison-Cn8DaOc4.js","assets/ia-recu-pur-BIQJD7uf.js","assets/identite-6wbVYtXI.js","assets/index-Bk9fS0E8.js","assets/index.es-CPqQXFcC.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-DKfHqtHq.js","assets/jspdf.es.min-CGfN0ESV.js","assets/JustePrix-BRRL8ktU.js","assets/kkiapay-DlN0HHb_.js","assets/laboratoire-5g2Ubq6S.js","assets/Laboratoire-Bwz6xR9o.js","assets/LettresAuDossier-DdyCECFT.js","assets/maisons-CSSFrqZy.js","assets/Marketing-dpH7OsJ-.js","assets/Marque-DAr4ov5i.js","assets/momo-C2ZVfV9J.js","assets/MonMois-D0kMdFgv.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-DVeQxDib.js","assets/paliers-BR13185O.js","assets/Parametres-Bnk1UDf2.js","assets/parcours-7gtaWjR9.js","assets/Parrainages-D_MQRlrz.js","assets/Parrainages-gAHAPB_6.css","assets/pdf-CU5aA4FX.js","assets/pdf-de-la-piece-DhDOQAh0.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/Personas-Dt1LLR1z.js","assets/Personnel-DaX1uoaL.js","assets/photo-BsSZgCqp.js","assets/pilotage-Bn1gP_oo.css","assets/Predictions-DpLDz42J.js","assets/prestataires-D5yRoAfu.js","assets/Prestataires-DwkP0OD_.js","assets/Prets-BwDVLOOb.js","assets/promos-TkyWown4.js","assets/protocoles-CiVLzsHx.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-Clf2a03r.js","assets/quiz-5qMPWZVi.js","assets/Rapport-BKTC9rUi.js","assets/RattacherUneCarte-CBihrEuR.js","assets/Recommandations-B_Dq8cw6.js","assets/relances-pur-DHxkbBX5.js","assets/SalonFoyer-Cx5A6iRD.js","assets/secretariat-admin-BtZoMjfZ.js","assets/Secretariat-Cy79Zw30.css","assets/Secretariat-hSGUo31t.js","assets/Signatures-PDD65zim.js","assets/SignerUnPdf-BFQ_h87K.js","assets/Synthese-DzloL9I3.js","assets/systeme-C3XFIa8E.css","assets/Tableau-B9CPgYF1.js","assets/Textes-B1PEfawg.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-CatfmmHY.js","assets/tri-des-caisses-pur-B97_Mt3f.js","assets/trone-BI0AqWZX.css","assets/trone-DxBIjr7K.js","assets/ui-D-17W3M8.js","assets/vente-DMe4r4ed.css","assets/Vitrine-LHNNp-CR.js","assets/_admin-BMFxPMIL.js","assets/_contrat-CytTeMs5.js","assets/_heures-Dbr93Rhp.js","assets/_reuni-U_z4qcae.js","assets/_shared-27henJnW.js","assets/_signature-r7b9sAD5.js","assets/_ui-BWMA-PlM.css","assets/_ui-DrzBtvXU.js"];
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
