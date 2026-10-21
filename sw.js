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
const BUILD = "20261021071025";
const A_GARDER = ["./","assets/Abonnements-B41vllii.js","assets/abonnements-DdLqZzoU.js","assets/Academie-BUZL_f9R.js","assets/Acces-ILPPEc_i.js","assets/actions-BH-pXgk9.js","assets/afaire-8HikBTq9.js","assets/AFaire-8Z11I4k3.js","assets/Analytics-B2KMPKSe.js","assets/Appels-DE9q4dWR.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/AtelierDesContenus-BeGwx1el.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/Aujourdhui-DLxkaV6j.js","assets/bilan-B-bfPYR0.css","assets/bilan-DCzNl2wv.js","assets/BilanMensuel-BxqIax6p.js","assets/Branches-Cg6PlLwv.js","assets/bridges-C7QnRcoy.js","assets/Caisse-CTeYfJrS.js","assets/caisse-du-soir-BG-HanIu.js","assets/Caisses-pyfPwxlr.js","assets/Calendrier-Xv4kcJxH.js","assets/Carnet-MctFf2cx.js","assets/carte-3784EQ2J.js","assets/carte-WI2qP1su.css","assets/CarteModal-C_81Go99.js","assets/CartesCadeaux-CgzPgjok.js","assets/Catalogue-D8m_J2MQ.js","assets/CentreDeCommande-CXBkgaNA.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-BoMnoGUC.js","assets/certificat-Bfh9CFsD.js","assets/certificat-DVSxho5e.css","assets/certificats-coffre-CaIIdIre.js","assets/ChiffreDesPrestations-CCNAyXOX.js","assets/ClotureDuTiroir-0ORzOcNj.js","assets/ClotureDuTiroir-C6vPx-E_.css","assets/Coffre-8-sbQCPW.js","assets/components-BhJddr_M.js","assets/compte-courant-ByzulCEN.js","assets/compte-ymbt_SJz.js","assets/CompteCourant-jb7TLK6n.js","assets/Comptes-CGeI94kY.js","assets/Comptoir-DmIuN_sq.js","assets/consultation-CCTm16qX.css","assets/consultation-CVOro9fX.js","assets/Consultations-D8yorYFR.js","assets/consultNotes-DKoNGv0e.js","assets/Conversations-D4WwB5Zo.css","assets/Conversations-Dai2CUuw.js","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-BTdm9t-Y.js","assets/currency-qfIhGmrs.js","assets/Customers-Bymtkpfu.js","assets/Dashboard-CyFXGKAX.js","assets/dates-B2AyQ3Oc.js","assets/Demandes-KAJvEpZm.js","assets/Depenses-Dq66kwRF.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-CoExPctv.js","assets/diagnostics-au-trone-BjDpTR_t.js","assets/Discussions-BOx-ArmM.js","assets/encaissement-pur-BVZ4hjoN.js","assets/Encaissements-wwd3K3xI.js","assets/enfants-BqkMB7l-.js","assets/Engagements-Cj5S9MhG.css","assets/Engagements-CXJmLa0R.js","assets/EntreDeuxSeances-BZBcGT_c.js","assets/equipe-DABhdlQT.css","assets/Evaluation-Crs5tBwe.js","assets/FacturePrestataire-D0aEYv3M.js","assets/Factures-CN_A7I-n.js","assets/Fil-k6VrKYY4.js","assets/finances-CCjqAkCE.css","assets/Fournisseurs-B-35a47o.js","assets/fournisseurs-B5whsEbj.js","assets/foyer-Z30p1Ls0.js","assets/gestes-conversation-_h812c2P.js","assets/HomeRituals-DvlZNFVE.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-CpXs-xrI.js","assets/ia-diagnostic-pur-BulIFgZQ.js","assets/ia-recu-pur-DcucZqpR.js","assets/identite-BqMUmLh2.js","assets/index-BojlEsUv.js","assets/index.es-3MCxbtJb.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-BCFYnzrM.js","assets/jspdf.es.min-A24HMk1H.js","assets/JustePrix-CX8cYqsS.js","assets/kkiapay-CeMXcU_O.js","assets/Laboratoire-Bj7MHoYn.js","assets/laboratoire-CuqgNCDC.js","assets/LettresAuDossier-CWNpYvPQ.js","assets/LienMndPay-svZRGwwk.js","assets/maisons-CSSFrqZy.js","assets/Marketing-CMWRtClL.js","assets/Marque-CDiaKmrw.js","assets/momo-C2ZVfV9J.js","assets/MonMois-oQq-S6G3.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-D0iljL5j.js","assets/paliers-eOnBCJ_c.js","assets/Parametres-B42j9DYX.js","assets/parcours-t_OCljyo.js","assets/Parrainages-DZkM4Ig3.js","assets/Parrainages-gAHAPB_6.css","assets/pdf-cTIhz7BS.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/Personas-Dk2blKO6.js","assets/Personnel-BQb9rsiv.js","assets/photo-CKplMgaL.js","assets/pilotage-Bn1gP_oo.css","assets/Predictions-9KEk7ldm.js","assets/Prestataires-D9rdtDCD.js","assets/prestataires-DGXLBtx-.js","assets/Prets-DOXPGbOc.js","assets/promos-B6vcD6gT.js","assets/protocoles-Ca4GVXwd.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-D6RWmThH.js","assets/qualification-DP4MGfUC.js","assets/quiz-5qMPWZVi.js","assets/Rapport-BxkysoG_.js","assets/RattacherUneCarte-BSeMMuEM.js","assets/Recommandations-D_39zw8O.js","assets/relances-pur-DsIo28uB.js","assets/releve-des-avis-71VG9eK3.js","assets/SalonFoyer-fUvD9spZ.js","assets/secretariat-admin-BqvzX4Qa.js","assets/Secretariat-BDgrYl2L.js","assets/Secretariat-Cy79Zw30.css","assets/Signatures-hSXZhTJO.js","assets/SignerUnPdf-BpNBCWbp.js","assets/Synthese-Jtj7bCZd.js","assets/systeme-C3XFIa8E.css","assets/Tableau-Cr87k7iX.js","assets/Textes-BybwDUTU.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-DLeI7D-y.js","assets/tri-des-caisses-pur-FGETkmME.js","assets/trone-DcUqv4hh.js","assets/trone-wvMgyufp.css","assets/ui-XeaQvqar.js","assets/vente-DMe4r4ed.css","assets/Vitrine-CRqZUnEh.css","assets/Vitrine-kVWSW_kS.js","assets/_admin-CNrko5dx.js","assets/_contrat-C0xDKPCa.js","assets/_heures-oaMlQk4S.js","assets/_reuni-V4AXhkx-.js","assets/_shared-CfzfHb_x.js","assets/_signature-DgwDAARx.js","assets/_ui-BWMA-PlM.css","assets/_ui-CyLh36vF.js"];
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
