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
const BUILD = "20261025103337";
const A_GARDER = ["./","assets/abonnements-6u0_vJtD.js","assets/Abonnements-CtN9VH_s.js","assets/Academie-BHnIYjfv.js","assets/Acces-CUE9ZOXJ.js","assets/actions-B5kx3K_3.js","assets/AFaire-5Lp37S0p.js","assets/afaire-YkLPZeSd.js","assets/agents-donnees-ChIgf14d.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Agents-WcfvR6QZ.js","assets/Analytics-COlspkif.js","assets/Appels-BOq0DpSJ.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/AtelierDesContenus-CxBa1COv.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/AuComptoir-DCILElv-.js","assets/Aujourdhui-CluTtQnV.js","assets/avis-fiches-OuDbA3SK.js","assets/bilan-B-bfPYR0.css","assets/bilan-fiz7iMui.js","assets/BilanMensuel-lijGkBrv.js","assets/Branches-D04ZXrEm.js","assets/bridges-CFdjA2cr.js","assets/Caisse-Bn3zmSYj.js","assets/caisse-du-soir-CWFjeIkB.js","assets/Caisses-BGyMutAz.js","assets/Calendrier-4gpfNid5.js","assets/Carnet-BPL1-L3v.js","assets/carte-CTzvNyd_.js","assets/carte-DWlSbalk.css","assets/CarteModal-6x1pkx2Z.js","assets/CartesCadeaux-CW-OZQdG.js","assets/Catalogue-D-eoxcOo.js","assets/CentreDeCommande-Brxel_St.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-DIaaN_NN.js","assets/certificat-9_XWf1iQ.css","assets/certificat-BB62p0ve.js","assets/certificats-coffre-C3aSqpKR.js","assets/chiffre-du-jour-pur-T4RaMcT8.js","assets/ChiffreDesPrestations-D8e6-YWw.js","assets/client-BBTwXDZv.js","assets/ClotureDuTiroir-C6vPx-E_.css","assets/ClotureDuTiroir-CH2qewFQ.js","assets/Coffre-DO69BBaM.js","assets/components-DJk297hp.js","assets/compte-C1zxj63Q.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-DmIKBmur.js","assets/Comptes-DwOUV69I.js","assets/Comptoir-btLOZqs1.js","assets/consultation-CXpjl69P.js","assets/consultation-DQBnwlMN.css","assets/Consultations-BkDBB9mk.js","assets/consultNotes-rxWrdEqq.js","assets/Conversations-D4WwB5Zo.css","assets/Conversations-DnMD9mNu.js","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-D4RtcEhU.js","assets/currency-qfIhGmrs.js","assets/Customers-oZs37Tjh.js","assets/Dashboard-B8qK6Flt.css","assets/Dashboard-FzMW5qTY.js","assets/dates-CZ2LodZ9.js","assets/Demandes-CPWdLgSZ.js","assets/Depenses-DYbGkGox.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-tsgde5n-.js","assets/diagnostics-au-trone-B2Ns4Yj_.js","assets/Discussions-DvVPSCT6.js","assets/Encaissements-Cgc1Qi9u.js","assets/enfants-CQlMxrkm.js","assets/Engagements-BYR51quk.js","assets/Engagements-Cj5S9MhG.css","assets/EntreDeuxSeances-DVw4h9b7.js","assets/equipe-B_9ZHz24.css","assets/Evaluation-DFUVqf1S.js","assets/FacturePrestataire-B1A2VwSj.js","assets/Factures-DUV2Gcs1.js","assets/Fil-CghWq0pl.js","assets/finances-BMFnlkRx.css","assets/fournisseurs-BkS0z0Ou.js","assets/Fournisseurs-DprrM-Es.js","assets/foyer-AjCWBZEv.js","assets/gestes-conversation-BlBJEIAh.js","assets/HomeRituals-ByMEEj7e.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-BYhtRsCH.js","assets/ia-diagnostic-pur-BulIFgZQ.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-recu-pur-DcucZqpR.js","assets/identite-CUIuLY86.js","assets/index-BV4Kw_YR.js","assets/index.es-CEZLZy6W.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-BCcWfeM8.js","assets/jspdf.es.min-B5aLEM-H.js","assets/JustePrix-CSXg6gsA.js","assets/kkiapay-26tIX8fo.js","assets/kkiapay-widget-DnUhUNd4.js","assets/Laboratoire-BI2v0zs2.js","assets/laboratoire-CVA9ZVb1.js","assets/LettresAuDossier-ejC1nshW.js","assets/LienMndPay-CtsfQaIe.js","assets/maisons-CSSFrqZy.js","assets/Marketing-DhO3xHWC.js","assets/Marque-BQTWztmZ.js","assets/MesTaches-Cc4XUDf6.css","assets/MesTaches-DLSuvoPz.js","assets/momo-C2ZVfV9J.js","assets/MonMois-CXbCu1Lq.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-7WpuvHD7.js","assets/paliers-R93GsqzL.js","assets/Parametres-DEq4H4UF.js","assets/parcours-7g27YWps.js","assets/Parrainages-C2538t1B.js","assets/Parrainages-gAHAPB_6.css","assets/pdf-CmGQ9q9P.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/Personas-BA4oNLnT.js","assets/Personnel-CDcHanrr.js","assets/photo-Qs8Jh6LT.js","assets/pilotage-D8kf1Co8.css","assets/Predictions-cSwcz1Hc.js","assets/Prestataires-BfyDnYdr.js","assets/prestataires-CdRAyDoQ.js","assets/Prets-CACKZOFZ.js","assets/Projets-COO7WDEE.css","assets/Projets-DTcAf-_c.js","assets/projets-OyOLNCDM.js","assets/projets-pur-2ZEMRNDU.js","assets/protocoles-BPaP-wJs.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-BxcplHeS.js","assets/qualification-B1XW2moj.js","assets/quiz-5qMPWZVi.js","assets/Rapport-DRAQ7S72.js","assets/RattacherUneCarte-DkTQv4z4.js","assets/Recommandations-ucKzD6G3.js","assets/regler-CcEBz0MT.js","assets/regler-DsSwOePM.css","assets/regler-la-seance-serveur-BpExlC5z.js","assets/relances-pur-DsIo28uB.js","assets/releve-des-avis-B-UiMOyb.js","assets/SalonFoyer-7IOooqxP.js","assets/secretariat-admin-BVoePMwM.js","assets/Secretariat-Bkv4h4IT.js","assets/Secretariat-Cy79Zw30.css","assets/Signatures-D3oSKGvB.js","assets/SignerUnPdf-04A3nSo-.js","assets/Synthese-DVWpsqpm.js","assets/SyntheseGraphes-BM_dA-o0.js","assets/systeme-C3XFIa8E.css","assets/Tableau-BJxx9bMy.js","assets/Textes-DBM9pdn8.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-CdAFltVb.js","assets/trace-du-moyen-pur-Bx8-suHn.js","assets/trone-D0FA_PEh.js","assets/trone-UcBM3hbA.css","assets/ui-Brl6683a.js","assets/useAudiences-BZfCc0Xq.js","assets/vente-C7YWXkHo.css","assets/Vitrine-CjvRZD3P.js","assets/Vitrine-Cs-c3_Mr.css","assets/_admin-DaNqZeuq.js","assets/_contrat-Dggeoan6.js","assets/_heures-BlS-FNVx.js","assets/_reuni-7g-I1xon.js","assets/_shared-BYrlXUdo.js","assets/_signature-D1r-Nyvw.js","assets/_ui-BWMA-PlM.css","assets/_ui-DjEcpMO9.js"];
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
