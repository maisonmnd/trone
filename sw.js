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
const BUILD = "20261019213005";
const A_GARDER = ["./","assets/Abonnements-Bn9osMF3.js","assets/abonnements-Dx_qCGhc.js","assets/Academie-CuzlUSny.js","assets/Acces-DW38H2JC.js","assets/actions-Br1e5kCc.js","assets/AFaire-C26uO6vG.js","assets/afaire-wgAUpfx8.js","assets/Analytics-RDCcQkd3.js","assets/Appels-BNRCLeQ2.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/AtelierDesContenus-Bq-4u48i.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/Aujourdhui-DzkiVagC.js","assets/bilan-B-bfPYR0.css","assets/bilan-kfJhQeaR.js","assets/BilanMensuel-B_WPaBqh.js","assets/Branches-Bov57NzU.js","assets/bridges-cgYKTCOL.js","assets/Caisse-CP1ESLvm.js","assets/caisse-du-soir-uXLd5GFG.js","assets/Caisses-DI3SqWDd.js","assets/Calendrier-B_gI09Qa.js","assets/Carnet-CCRHBg8h.js","assets/carte-DTF4s5DH.js","assets/carte-WI2qP1su.css","assets/CarteModal-DHDHPGc0.js","assets/CartesCadeaux-DICaKRS7.js","assets/Catalogue-CHwrPlQa.js","assets/CentreDeCommande-BK1u-tB2.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-CLiLQ2TC.js","assets/certificat-DOTbrC6f.js","assets/certificat-DVSxho5e.css","assets/certificats-coffre-CA4dsAtE.js","assets/ChiffreDesPrestations-hA4_TSNF.js","assets/ClotureDuTiroir-C6vPx-E_.css","assets/ClotureDuTiroir-WClnyMGa.js","assets/Coffre-CvEnUrKD.js","assets/components-DnATyugN.js","assets/compte-Bdfyit6c.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-BGhU9EHv.js","assets/Comptes-BhrAcFNY.js","assets/Comptoir-8M5DyjNw.js","assets/consultation-alX29mLl.js","assets/consultation-CCTm16qX.css","assets/Consultations-D7xNYUTk.js","assets/consultNotes-BFI1KunK.js","assets/Conversations-C3JeikzP.js","assets/Conversations-D4WwB5Zo.css","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-DPGaMBAy.js","assets/currency-qfIhGmrs.js","assets/Customers-CdYfvoIY.js","assets/Dashboard-DYwYjgPB.js","assets/dates-BANWhszo.js","assets/Demandes-BSxkV2Q8.js","assets/Depenses-ClxF-ynm.js","assets/devise-fon-DX3P0bG4.woff2","assets/Discussions-Co7pLxKb.js","assets/encaissement-pur-BwgkWUFh.js","assets/Encaissements-C8hS7kfv.js","assets/enfants-CH1PFKnf.js","assets/Engagements-CHzI0-2v.js","assets/Engagements-Cj5S9MhG.css","assets/EntreDeuxSeances-Cax8xrvb.js","assets/equipe-DpPyq6h-.css","assets/Evaluation-CQZUM-3h.js","assets/FacturePrestataire-BPjAooMX.js","assets/Factures-DJErAuB3.js","assets/Fil-DcM7YsNB.js","assets/finances-CCjqAkCE.css","assets/Fournisseurs-CXFq9fkM.js","assets/fournisseurs-TI2c02I-.js","assets/foyer-BhQBa5o3.js","assets/gestes-conversation-Ct59DKYb.js","assets/HomeRituals-CTcaLm-A.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-BlF3Japc.js","assets/ia-recu-pur-DcucZqpR.js","assets/identite-BVqLrjca.js","assets/index-BhEULH0w.js","assets/index.es-CLHQTfda.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-BL_lTOuV.js","assets/jspdf.es.min-C_cOpucJ.js","assets/JustePrix-dSmnZBif.js","assets/kkiapay-tuMLqJbr.js","assets/Laboratoire-BFg9geCJ.js","assets/laboratoire-CJgNghmK.js","assets/LettresAuDossier-BblVgDz-.js","assets/maisons-CSSFrqZy.js","assets/Marketing-BTC-mozU.js","assets/Marque-ZUy7bNaM.js","assets/momo-C2ZVfV9J.js","assets/MonMois-C2LoKD3r.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-BrR9OMtb.js","assets/paliers-BQbRvL2U.js","assets/Parametres-fpohQffS.js","assets/parcours-BKxOOFW3.js","assets/Parrainages-BWtUEUiT.js","assets/Parrainages-gAHAPB_6.css","assets/pdf-CD3CwF0P.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/Personas-BtZzgytD.js","assets/Personnel-CMm9g5ud.js","assets/photo-CF2WRrVg.js","assets/pilotage-Bn1gP_oo.css","assets/Predictions-BAT2rtvN.js","assets/Prestataires-CEm4HVru.js","assets/prestataires-DVGDENTY.js","assets/Prets-BJZCoTYs.js","assets/promos-BmS9h4MP.js","assets/protocoles-C0PjqpiZ.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-P98Y4NRa.js","assets/qualification-CKeVWFKj.js","assets/quiz-5qMPWZVi.js","assets/Rapport-Du7ioS8s.js","assets/RattacherUneCarte-DHSAvj8i.js","assets/Recommandations-BqSVd6fM.js","assets/relances-pur-DHxkbBX5.js","assets/SalonFoyer-DepYM7vp.js","assets/secretariat-admin-0vZ83TU2.js","assets/Secretariat-CbGhwGAF.js","assets/Secretariat-Cy79Zw30.css","assets/Signatures-BnC1MZRU.js","assets/SignerUnPdf-BWehLhM0.js","assets/Synthese-ughRXFve.js","assets/systeme-C3XFIa8E.css","assets/Tableau-DyQhTq9B.js","assets/Textes-DJAxZWyh.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-B7CqqTG2.js","assets/tri-des-caisses-pur-D1JlebAK.js","assets/trone-BAwlZFGe.js","assets/trone-BI0AqWZX.css","assets/ui-B3MTN0p6.js","assets/vente-DMe4r4ed.css","assets/Vitrine-CFHy_RJd.js","assets/_admin-CNxRyFNp.js","assets/_contrat-_y7gBer0.js","assets/_heures-BQdwYNI2.js","assets/_reuni-Bh-56BMa.js","assets/_shared-Bn_As-vX.js","assets/_signature-D2_M9fwm.js","assets/_ui-BWMA-PlM.css","assets/_ui-DBFne8TG.js"];
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
