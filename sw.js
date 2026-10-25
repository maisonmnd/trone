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
const BUILD = "20261025063950";
const A_GARDER = ["./","assets/abonnements-CIdpGZ2X.js","assets/Abonnements-YW51Ekgj.js","assets/Academie-CKwoNKJ0.js","assets/Acces-NgTcuJcP.js","assets/actions-BzTgo9S7.js","assets/AFaire-BqC2LyFH.js","assets/afaire-CuQtozua.js","assets/agents-donnees-Cci0R2fD.js","assets/Agents-fpD4U0bO.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-CrCDX9hH.js","assets/Appels-Dd6mfdqb.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/AtelierDesContenus-CWCK1fxi.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/AuComptoir-Ck53MGF4.js","assets/Aujourdhui-lZgrWLBp.js","assets/avis-fiches-Dpwh51f-.js","assets/bilan-B-bfPYR0.css","assets/bilan-BfNEE6W5.js","assets/BilanMensuel-MoaL0fGD.js","assets/Branches-CIIVM2SZ.js","assets/bridges-DPXIVLTK.js","assets/Caisse-DbYpeVJW.js","assets/caisse-du-soir-Bfnf4i2R.js","assets/Caisses-BhTqFgWl.js","assets/Calendrier-DmmHHQPM.js","assets/Carnet-CYeYle2M.js","assets/carte-DAaY2HwO.js","assets/carte-DWlSbalk.css","assets/CarteModal-D0cZCp_d.js","assets/CartesCadeaux-vhfjEOLl.js","assets/Catalogue-DzMv7FX3.js","assets/CentreDeCommande-Du8kyJhp.css","assets/CentreDeCommande-Ic6D_RNX.js","assets/Cercle-BWAipdAE.js","assets/certificat-9_XWf1iQ.css","assets/certificat-SSq9Qm8n.js","assets/certificats-coffre-DMXkGDRp.js","assets/chiffre-du-jour-pur-BljbwB7l.js","assets/ChiffreDesPrestations-DAklayEp.js","assets/ClotureDuTiroir-BY30jcGt.js","assets/ClotureDuTiroir-C6vPx-E_.css","assets/Coffre-DgL-cY61.js","assets/components-BsWeTt33.js","assets/compte-BOE_T2jv.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-CjQwpltr.js","assets/Comptes-BTDtZXfn.js","assets/Comptoir-CXXYDNWL.js","assets/consultation-BB_MIE5K.js","assets/consultation-DQBnwlMN.css","assets/Consultations-CyeGFYZ8.js","assets/consultNotes-i_dI-kzA.js","assets/Conversations-D4WwB5Zo.css","assets/Conversations-viEgUpiY.js","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-KAzjG_Z2.js","assets/currency-qfIhGmrs.js","assets/Customers-Czh1fw03.js","assets/Dashboard-B8qK6Flt.css","assets/Dashboard-DvCGVUzV.js","assets/dates-BXo-5l_x.js","assets/Demandes-DdP7IDxT.js","assets/Depenses-DceeIs2U.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-B4VHStmq.js","assets/diagnostics-au-trone-DW1rizqN.js","assets/Discussions-B98z52f9.js","assets/Encaissements-D9NuRUb0.js","assets/enfants-Dzw5QMjv.js","assets/Engagements-Cj5S9MhG.css","assets/Engagements-DSV0-CDW.js","assets/EntreDeuxSeances-i7hpV724.js","assets/equipe-B_9ZHz24.css","assets/Evaluation-XCsuIlKd.js","assets/FacturePrestataire-B8zxCT25.js","assets/Factures-Dbpy_14c.js","assets/Fil-Dm91DOLD.js","assets/finances-BMFnlkRx.css","assets/Fournisseurs-BEy1mSKv.js","assets/fournisseurs-CNsHe9l4.js","assets/foyer-DzSjqGun.js","assets/gestes-conversation-m0qjSd8k.js","assets/HomeRituals-CewU9aUx.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-HpuOvO7f.js","assets/ia-diagnostic-pur-BulIFgZQ.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-recu-pur-DcucZqpR.js","assets/identite-DW83CuMG.js","assets/index-BF_FnHih.js","assets/index.es-YYTJEIcZ.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-CR31iewG.js","assets/jspdf.es.min-DeQDfUY3.js","assets/JustePrix-xEnodPlI.js","assets/kkiapay-BSYRjKPw.js","assets/laboratoire-BbUmmgQm.js","assets/Laboratoire-BGNBixup.js","assets/LettresAuDossier-BwVx9tsd.js","assets/LienMndPay-BkgzXW-J.js","assets/maisons-CSSFrqZy.js","assets/Marketing-8P-YvJ93.js","assets/Marque-CwqhmYF7.js","assets/MesTaches-Cc4XUDf6.css","assets/MesTaches-DXHLjMrH.js","assets/momo-C2ZVfV9J.js","assets/MonMois-rFd9LvHp.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-CYoeLIrp.js","assets/paliers-DOUswguh.js","assets/Parametres-BSWJEXuU.js","assets/parcours-DaYsnj8P.js","assets/Parrainages-DFdsA2Iy.js","assets/Parrainages-gAHAPB_6.css","assets/pdf-DBTCUUpR.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/Personas-WiS1mqIe.js","assets/Personnel-DOJVLHOa.js","assets/photo-DogBlEY0.js","assets/pilotage-D8kf1Co8.css","assets/Predictions-BlMMoAFp.js","assets/Prestataires-BLUtRqtm.js","assets/prestataires-CdIoyASO.js","assets/Prets-DkSEn2pd.js","assets/Projets-BMFr6bKw.js","assets/Projets-COO7WDEE.css","assets/projets-DLS80MsZ.js","assets/projets-pur-2ZEMRNDU.js","assets/protocoles-B-Ppsdym.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-EtYJP-nB.js","assets/qualification-CRB1rRCA.js","assets/quiz-5qMPWZVi.js","assets/Rapport-Ph8UjxfO.js","assets/RattacherUneCarte-DNxG5URK.js","assets/Recommandations-Diew-qD6.js","assets/relances-pur-DsIo28uB.js","assets/releve-des-avis-VSZjgW_P.js","assets/SalonFoyer-BJHPlf8D.js","assets/secretariat-admin-BXHIj0lt.js","assets/Secretariat-Cy79Zw30.css","assets/Secretariat-mgAV4Pdp.js","assets/Signatures-CQMr9jpT.js","assets/SignerUnPdf-Bkb5ApF5.js","assets/Synthese-BxRZMSt1.js","assets/SyntheseGraphes-BDTdFb0V.js","assets/systeme-C3XFIa8E.css","assets/Tableau-uEdoPDJg.js","assets/Textes-DirckiA7.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-BofHv3xP.js","assets/trace-du-moyen-pur-Cb3Gcky8.js","assets/trone-B0aZBuBy.js","assets/trone-fchLqmH5.css","assets/ui-zYCwwR0J.js","assets/useAudiences-B6wxsowm.js","assets/vente-C7YWXkHo.css","assets/Vitrine-BON6rcdB.css","assets/Vitrine-CjcNK1iF.js","assets/_admin-DurrmC6E.js","assets/_contrat-CXQn-iTV.js","assets/_heures-BNhKXmC5.js","assets/_reuni-Dh3NYp40.js","assets/_shared-DIRbP1Ix.js","assets/_signature-BAegqj0O.js","assets/_ui-BWMA-PlM.css","assets/_ui-DJg7kGpo.js"];
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
