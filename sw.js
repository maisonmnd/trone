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
const BUILD = "20261016054339";
const A_GARDER = ["./","assets/Abonnements-Bz6u0MZK.js","assets/abonnements-DCvfNC6k.js","assets/Academie-pKWyvkeC.js","assets/Acces-D4BP_4ux.js","assets/actions-By_PsAbt.js","assets/afaire-Br5LNAPX.js","assets/AFaire-CbBRCBZ0.js","assets/Analytics-CDqV-bbo.js","assets/Appels-MiBWG0bc.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/AtelierDesContenus-yfYTJa1H.js","assets/Aujourdhui-Wx9voEyy.js","assets/bilan-B-bfPYR0.css","assets/bilan-BIxP_Csz.js","assets/BilanMensuel-CV7-NL0j.js","assets/Branches-pc0Vc-0H.js","assets/bridges-qri2zhK8.js","assets/Caisse-Ba21rK34.js","assets/caisse-du-soir-C3VFNObh.js","assets/Caisses-DbeD8h-E.js","assets/Calendrier-Dv03AVqh.js","assets/Carnet-DRlgb0os.js","assets/carte-DClZdDk4.js","assets/carte-WI2qP1su.css","assets/CarteModal-DQful4Xg.js","assets/CartesCadeaux-DSy1-LVQ.js","assets/Catalogue-BU49Q3nU.js","assets/CentreDeCommande-CEKoJXwp.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-CTYB8gw_.js","assets/certificat-5sOWKUxQ.js","assets/certificat-DVSxho5e.css","assets/certificats-coffre-Ct_gY0Nh.js","assets/ChiffreDesPrestations-Byg3IC4h.js","assets/ClotureDuTiroir-Bjkd1H2-.js","assets/ClotureDuTiroir-C6vPx-E_.css","assets/Coffre-C2UwrKKy.js","assets/components-C_LSxJdE.js","assets/compte-CIM9RHyq.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-DWVERcTz.js","assets/Comptes-YHwR4f6B.js","assets/Comptoir-BBWjbnsQ.js","assets/consultation-BDFZang0.js","assets/consultation-CCTm16qX.css","assets/Consultations-EQ5K3khb.js","assets/consultNotes-Be_wQ-_T.js","assets/Conversations-oAgcgm-e.js","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-o32siPgP.js","assets/currency-D4l65sA8.js","assets/Customers-BoxD1a-u.js","assets/Dashboard-BRZ_lUS6.js","assets/dates-WCSMOKjb.js","assets/Demandes-CMgv2H9U.js","assets/Depenses-BUsxrKSu.js","assets/devise-fon-DX3P0bG4.woff2","assets/encaissement-pur-BhjcxFni.js","assets/Encaissements-CD6otMyq.js","assets/enfants-CiqLAJdf.js","assets/Engagements-Cj5S9MhG.css","assets/Engagements-DabmskSQ.js","assets/EntreDeuxSeances-Bn0iDV21.js","assets/equipe-DpPyq6h-.css","assets/Evaluation-DzK7BXea.js","assets/FacturePrestataire-BdDD5p36.js","assets/Factures-C5qJPyZP.js","assets/Fil-DqefIen4.js","assets/finances-CCjqAkCE.css","assets/Fournisseurs-aSfL4vuI.js","assets/fournisseurs-B4dcntJp.js","assets/foyer-tl8hyaR5.js","assets/HomeRituals-D-sTQyEC.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-X9WdzqSM.js","assets/identite-B9PBCFBq.js","assets/index-DxBgb9CG.js","assets/index.es-CLE48LZf.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-BacInLVJ.js","assets/jspdf.es.min-DeNv-iFI.js","assets/JustePrix-CuzqA6Ws.js","assets/kkiapay-DvO5B2dU.js","assets/laboratoire-C1Ai8SEl.js","assets/Laboratoire-Z1KyMUUu.js","assets/LettresAuDossier-DzbHtuHz.js","assets/maisons-CSSFrqZy.js","assets/Marketing-BcvP6q-F.js","assets/Marque-DP_HqGGQ.js","assets/momo-C2ZVfV9J.js","assets/MonMois-CFBQ9MsC.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-DMxlH60W.js","assets/paliers-CJgDMbFP.js","assets/Parametres-Ce4DICl3.js","assets/parcours-BbSf2Do9.js","assets/Parrainages-D8lnanjH.js","assets/Parrainages-gAHAPB_6.css","assets/pdf-BWRFii1D.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/Personas-D5xX1qlX.js","assets/Personnel-CXwbTgU8.js","assets/photo-TuY60XIa.js","assets/pilotage-Bn1gP_oo.css","assets/Predictions-B85XuK2m.js","assets/prestataires-Hyt1nG7Z.js","assets/Prestataires-VgE8QlWX.js","assets/Prets-CTwIle2T.js","assets/promos-Bp_IEIUQ.js","assets/protocoles-1_M-CA6a.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-CTLjO9a7.js","assets/quiz-5qMPWZVi.js","assets/Rapport-DLx_Yq51.js","assets/RattacherUneCarte-DliOKbO5.js","assets/Recommandations-DsJ6LQKe.js","assets/SalonFoyer-Co4A5xqe.js","assets/secretariat-admin-CllM9L-i.js","assets/Secretariat-Sq-nCSyw.js","assets/Signatures-DRSdvqZa.js","assets/SignerUnPdf-BqDFDhal.js","assets/Synthese-wlFhL6A8.js","assets/systeme-C3XFIa8E.css","assets/Tableau-DjGbAgRr.js","assets/Textes-BotFPlZ-.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-B58VQAmh.js","assets/trone-DnuuvbFM.css","assets/trone-DQWFQq2x.js","assets/ui-8o2k2NHG.js","assets/vente-D0kdELDn.css","assets/Vitrine-wWawhZsO.js","assets/_admin-BWDuRT_q.js","assets/_contrat-hpeupS35.js","assets/_heures-Co_qIcrx.js","assets/_reuni-BHZNDvAo.js","assets/_shared-Chl-ysPt.js","assets/_signature-CX6TPWUI.js","assets/_ui-BWMA-PlM.css","assets/_ui-pR61uk_n.js"];
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
