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
const BUILD = "20261024183251";
const A_GARDER = ["./","assets/Abonnements-C5WIYZom.js","assets/abonnements-CVPHFj0X.js","assets/Academie-BP99B3ju.js","assets/Acces-GyvsDRu5.js","assets/actions-DgrV3pFW.js","assets/AFaire-BmAlE1G_.js","assets/afaire-C8we2dyq.js","assets/Analytics-B77gZu3K.js","assets/Appels-BpxFqBz2.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/AtelierDesContenus-Bn0OBOM4.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/AuComptoir-DLo3XIJC.js","assets/Aujourdhui-Cpp-K4_Y.js","assets/bilan-B-bfPYR0.css","assets/bilan-BI2AEV-6.js","assets/BilanMensuel-KWzPHCvC.js","assets/Branches-OrsgRz_s.js","assets/bridges-Di00cKVM.js","assets/Caisse-DA9NV2tu.js","assets/caisse-du-soir-CEcQEddm.js","assets/Caisses-xJ1-PgIX.js","assets/Calendrier-DyJBCBMY.js","assets/Carnet-Bfh5nCR7.js","assets/carte-B8apvxLN.js","assets/carte-WI2qP1su.css","assets/CarteModal-48UxBUPH.js","assets/CartesCadeaux-gjIn4V0_.js","assets/Catalogue-BAi9Y-Ho.js","assets/CentreDeCommande-B3CYTB8f.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-CXKr5v4B.js","assets/certificat-DVSxho5e.css","assets/certificat-YH5c-otB.js","assets/certificats-coffre-D_eejTlg.js","assets/chiffre-du-jour-pur-sHNglgnS.js","assets/ChiffreDesPrestations-CE_buOfo.js","assets/ClotureDuTiroir-C6vPx-E_.css","assets/ClotureDuTiroir-DDOytp34.js","assets/Coffre-6X3LcC04.js","assets/components-DgxUljV3.js","assets/compte-courant-ByzulCEN.js","assets/compte-CYg9CqXk.js","assets/CompteCourant-zjOTgu4Y.js","assets/Comptes-DIj_KNDO.js","assets/Comptoir-DhkSBexn.js","assets/consultation-CCTm16qX.css","assets/consultation-D1P3zIPO.js","assets/Consultations-BMGO_mxM.js","assets/consultNotes-Bq1xPd41.js","assets/Conversations-CZkGFcs5.js","assets/Conversations-D4WwB5Zo.css","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-BiSSvJrd.js","assets/currency-qfIhGmrs.js","assets/Customers-D964yXQp.js","assets/Dashboard-BHdnNpLL.js","assets/dates-C9jAbemn.js","assets/Demandes-C7cgtEUS.js","assets/Depenses-B96M3gZx.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-Dscb-WNA.js","assets/diagnostics-au-trone-CEVmzabp.js","assets/Discussions-DEVbSj5y.js","assets/Encaissements-CQgbrk8y.js","assets/enfants-2dOUSmZH.js","assets/Engagements-Cj5S9MhG.css","assets/Engagements-Dg32nQPa.js","assets/EntreDeuxSeances-CkMnZNfh.js","assets/equipe-DABhdlQT.css","assets/Evaluation-CmtnEjfK.js","assets/FacturePrestataire-DzEJVwfl.js","assets/Factures-CVmuXTqV.js","assets/Fil-9A5ggf5W.js","assets/finances-CCjqAkCE.css","assets/Fournisseurs-DkKAkaV-.js","assets/fournisseurs-pInqOf2U.js","assets/foyer-DgxK6MhD.js","assets/gestes-conversation-1hC90swT.js","assets/HomeRituals-DRywotel.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-DR-cnOBq.js","assets/ia-diagnostic-pur-BulIFgZQ.js","assets/ia-recu-pur-DcucZqpR.js","assets/identite-Co0xirfl.js","assets/index-BAb7BoS6.js","assets/index.es-DZJCsiUu.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-DQ2lCTzc.js","assets/jspdf.es.min-Ddj5q5O_.js","assets/JustePrix-BBe_LN0_.js","assets/kkiapay-BFh2G9o_.js","assets/Laboratoire-BKdRi7Pd.js","assets/laboratoire-C3GSGW5e.js","assets/LettresAuDossier-DZIVIJNo.js","assets/LienMndPay-BItjc0sh.js","assets/maisons-CSSFrqZy.js","assets/Marketing-JztWIxxr.js","assets/Marque-DYdp_g-_.js","assets/momo-C2ZVfV9J.js","assets/MonMois-BM4C0yyd.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-CHbFjZUI.js","assets/paliers-CvrxSu8p.js","assets/Parametres-CR1oVy4V.js","assets/parcours-8D7g7T0-.js","assets/Parrainages-CYmhhLaP.js","assets/Parrainages-gAHAPB_6.css","assets/pdf-JIaQDRnS.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/Personas-BNT-EqqU.js","assets/Personnel-SPdvh3rO.js","assets/photo-DqRLtf8g.js","assets/pilotage-D8kf1Co8.css","assets/Predictions-BWcug-ZL.js","assets/prestataires-BTQqOPjX.js","assets/Prestataires-CaoF8b3-.js","assets/Prets-0kvrl6hV.js","assets/protocoles-DCTS4mno.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-DLkDD0t_.js","assets/qualification-CkOg_STi.js","assets/quiz-5qMPWZVi.js","assets/Rapport-eORRM8iV.js","assets/RattacherUneCarte-BI78L_EB.js","assets/Recommandations-BiplNBtb.js","assets/relances-pur-DsIo28uB.js","assets/releve-des-avis-ChsC4a_h.js","assets/SalonFoyer-nwqBr5BF.js","assets/secretariat-admin-DxiMN8W-.js","assets/Secretariat-Cy79Zw30.css","assets/Secretariat-DbuW5G4w.js","assets/Signatures-DH4RvJic.js","assets/SignerUnPdf-CIeS_zel.js","assets/Synthese-yBAh9Unf.js","assets/systeme-C3XFIa8E.css","assets/Tableau-Bt9L3bNZ.js","assets/Textes-Dl4F8bak.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-C1weG1gj.js","assets/trace-du-moyen-pur-Cb3Gcky8.js","assets/trone-Bv3EUzvb.css","assets/trone-DEt3LanW.js","assets/ui-BaUUc6gh.js","assets/useAudiences-BhDbD4pB.js","assets/vente-C7YWXkHo.css","assets/Vitrine-BON6rcdB.css","assets/Vitrine-DToA13LB.js","assets/_admin-CX_HQIdl.js","assets/_contrat-DoZLoQLI.js","assets/_heures-D-8pb-Jj.js","assets/_reuni-C1wgcixz.js","assets/_shared-JLf2IgaQ.js","assets/_signature-BurfLzvR.js","assets/_ui-BWMA-PlM.css","assets/_ui-MD7opJx8.js"];
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
