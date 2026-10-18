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
const BUILD = "20261018124501";
const A_GARDER = ["./","assets/Abonnements-Ba3YR6jv.js","assets/abonnements-y9EfoGpe.js","assets/Academie-CF5fnpbM.js","assets/Acces-DvRrq6Pk.js","assets/actions-liu6uMtf.js","assets/AFaire-7SihHr2g.js","assets/afaire-CrGii9RO.js","assets/Analytics-C7_pjqyV.js","assets/Appels-DUjAMZ5d.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/AtelierDesContenus-D0Sx6yw4.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/Aujourdhui-DMhxkh7I.js","assets/bilan-B-bfPYR0.css","assets/bilan-BonDyMxy.js","assets/BilanMensuel-DwzdcJ8f.js","assets/Branches-Bj1hgCQ5.js","assets/bridges-BzbKyidE.js","assets/caisse-du-soir-CTTcWsff.js","assets/Caisse-NWlc_Y2u.js","assets/Caisses-DUzBOPeY.js","assets/Calendrier-CNUu71k-.js","assets/Carnet-Bo4OLs2k.js","assets/carte-CR0ziW2c.js","assets/carte-WI2qP1su.css","assets/CarteModal-D-nzw7dZ.js","assets/CartesCadeaux-C_oAaaew.js","assets/Catalogue-BI_jJGw2.js","assets/CentreDeCommande-CzLdQGgi.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-DU_3x79d.js","assets/certificat-BFO8FaAM.js","assets/certificat-DVSxho5e.css","assets/certificats-coffre-Do5QS3rV.js","assets/ChiffreDesPrestations-BgDjZMK5.js","assets/ClotureDuTiroir-C6vPx-E_.css","assets/ClotureDuTiroir-CYoyCjJC.js","assets/Coffre-DGD9riuD.js","assets/components-FzJ6TDhv.js","assets/compte-courant-ByzulCEN.js","assets/compte-DbhmLs0a.js","assets/CompteCourant-DkmAWVub.js","assets/Comptes-ByCFnS4T.js","assets/Comptoir-DhOmWdAU.js","assets/consultation-CCTm16qX.css","assets/consultation-ML1xBOJX.js","assets/Consultations-DcEE-m_X.js","assets/consultNotes-QyZggXWA.js","assets/Conversations-DEwemMnp.js","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-lEgoaYlN.js","assets/currency-qfIhGmrs.js","assets/Customers-BFFz91fU.js","assets/Dashboard-FpxkC8m4.js","assets/dates-B7O6U0qn.js","assets/Demandes-DZWLD5D5.js","assets/Depenses-D_3EHESq.js","assets/devise-fon-DX3P0bG4.woff2","assets/encaissement-pur-XhWrb-2D.js","assets/Encaissements-BwZVNDa8.js","assets/enfants-Bpe3Er1X.js","assets/Engagements-CGAY4xSG.js","assets/Engagements-Cj5S9MhG.css","assets/EntreDeuxSeances-DsenwKq-.js","assets/equipe-DpPyq6h-.css","assets/Evaluation-DWfrX2vn.js","assets/FacturePrestataire-tM64Vo1y.js","assets/Factures-BUAgPxLj.js","assets/Fil-CPGop4Vg.js","assets/finances-CCjqAkCE.css","assets/fournisseurs-BtrHgMqH.js","assets/Fournisseurs-C0dh1Jpv.js","assets/foyer-sPSf4wOF.js","assets/gestes-conversation-CkWqyoRp.js","assets/HomeRituals-C3LoGoCp.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-D3jbLdA1.js","assets/identite-D53W2RI_.js","assets/index-CrdhPf9s.js","assets/index.es-BtW2B0Au.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-D8Mh1LKO.js","assets/jspdf.es.min-B4vtivyU.js","assets/JustePrix-B_D6BYXd.js","assets/kkiapay-BqlVC7nA.js","assets/Laboratoire-BkbLUTU2.js","assets/laboratoire-CnorRp5i.js","assets/LettresAuDossier-CWkLb_ZL.js","assets/maisons-CSSFrqZy.js","assets/Marketing-0IDQw8gr.js","assets/Marque-DS4BGblh.js","assets/momo-C2ZVfV9J.js","assets/MonMois-BEyQJkTj.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-dBy3fRxP.js","assets/paliers-Bds-GFpK.js","assets/Parametres-D_PzG3HL.js","assets/parcours-DrE_7WK5.js","assets/Parrainages-CoPa6hXX.js","assets/Parrainages-gAHAPB_6.css","assets/pdf-CxzwhSY9.js","assets/pdf-de-la-piece-B7MMGOEG.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/Personas-C5OD8bGH.js","assets/Personnel-DCWhpx4G.js","assets/photo-HmvEW7aH.js","assets/pilotage-Bn1gP_oo.css","assets/Predictions--ciAVyVL.js","assets/prestataires-C3_vBD6-.js","assets/Prestataires-CXEmyJ9_.js","assets/Prets-DfLM4IE7.js","assets/promos-BFO-5D9Z.js","assets/protocoles-MPrmWcra.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-BsV6f3HY.js","assets/quiz-5qMPWZVi.js","assets/Rapport-Uxw_q8no.js","assets/RattacherUneCarte-zzLkp8Rk.js","assets/Recommandations-JmcOmIB3.js","assets/relances-pur-DFTVafj-.js","assets/SalonFoyer-BuTi-KuM.js","assets/secretariat-admin-CgQI-9KS.js","assets/Secretariat-CeUkiinH.js","assets/Signatures-CzqUyEpX.js","assets/SignerUnPdf-BfHBifGl.js","assets/Synthese-D0R910IE.js","assets/systeme-C3XFIa8E.css","assets/Tableau-DjYBWWOa.js","assets/Textes-CGepLTuy.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-BiAWZzSD.js","assets/trone-C2KiO4P1.js","assets/trone-CyFdPxg0.css","assets/ui-BdISqBN5.js","assets/vente-DMe4r4ed.css","assets/Vitrine-ynOKsbVa.js","assets/_admin-CPg2PgpO.js","assets/_contrat-DF9YS-fD.js","assets/_heures-HBlpWPOv.js","assets/_reuni-Dy-c-jPR.js","assets/_shared-cfgG5jLg.js","assets/_signature-Wz_1LwxQ.js","assets/_ui-BWMA-PlM.css","assets/_ui-DHbfjjjE.js"];
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
