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
const BUILD = "20261024010447";
const A_GARDER = ["./","assets/Abonnements-k98pHRN4.js","assets/abonnements-wADnlwEZ.js","assets/Academie-CvV1qfre.js","assets/Acces-C7UgQkTC.js","assets/actions-DUJQL89A.js","assets/afaire-CkEYznpd.js","assets/AFaire-CR76GV9h.js","assets/Analytics-BJNEMq3m.js","assets/Appels-M1JPd9Im.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/AtelierDesContenus-Cz86h5QW.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/AuComptoir-TFu8KCpQ.js","assets/Aujourdhui-K3h3Hgu8.js","assets/bilan-B-bfPYR0.css","assets/bilan-R0mWS7GC.js","assets/BilanMensuel-Ctaa8b17.js","assets/Branches-BSXTKKD0.js","assets/bridges-fV0EhPoO.js","assets/caisse-du-soir-8i8kGJA_.js","assets/Caisse-rJINva0l.js","assets/Caisses-Dk54EJLj.js","assets/Calendrier-B7WB6zNF.js","assets/Carnet-BZgv8XT-.js","assets/carte-ifw-l4yi.js","assets/carte-WI2qP1su.css","assets/CarteModal-Dscej3N5.js","assets/CartesCadeaux-Bz0AcWMg.js","assets/Catalogue-iGzvVjRA.js","assets/CentreDeCommande-Du8kyJhp.css","assets/CentreDeCommande-V8ske8Yp.js","assets/Cercle-BAksTgjt.js","assets/certificat-BznrPEka.js","assets/certificat-DVSxho5e.css","assets/certificats-coffre-s4Vhel8g.js","assets/ChiffreDesPrestations-CCguf_P4.js","assets/ClotureDuTiroir-C6vPx-E_.css","assets/ClotureDuTiroir-CL8PT4u1.js","assets/Coffre-DgcVEog0.js","assets/components-CGAOXruP.js","assets/compte-CbD-srf6.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-BD2Dca7o.js","assets/Comptes-BgX5ofPU.js","assets/Comptoir-FTqMMA7P.js","assets/consultation-CCTm16qX.css","assets/consultation-CPpSAR4m.js","assets/Consultations-BZ__EEWi.js","assets/consultNotes-DnOVOdoS.js","assets/Conversations-BjQE62qp.js","assets/Conversations-D4WwB5Zo.css","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-BACl4mnJ.js","assets/currency-qfIhGmrs.js","assets/Customers-07UZ7hq9.js","assets/Dashboard-Co10NZXs.js","assets/dates-Bd2LRdYz.js","assets/Demandes-eJyvlHto.js","assets/Depenses-DT7snm0x.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-DOdC4u0F.js","assets/diagnostics-au-trone-C_EBIIn_.js","assets/Discussions-CMxRzeiX.js","assets/Encaissements-B0-rUfxd.js","assets/enfants-BzGYLhtz.js","assets/Engagements-Cj5S9MhG.css","assets/Engagements-CTUKGyMd.js","assets/EntreDeuxSeances-BkF8PBh5.js","assets/equipe-DABhdlQT.css","assets/Evaluation-BxlpxrbE.js","assets/FacturePrestataire-DBegeZN6.js","assets/Factures-1mIgxmNB.js","assets/Fil-B6JiM2aR.js","assets/finances-CCjqAkCE.css","assets/fournisseurs-BUTQMmxo.js","assets/Fournisseurs-D205yyRt.js","assets/foyer-DTVfD8gU.js","assets/gestes-conversation-CtMSqffj.js","assets/HomeRituals-2jMzdEsr.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-uPuhG5OE.js","assets/ia-diagnostic-pur-BulIFgZQ.js","assets/ia-recu-pur-DcucZqpR.js","assets/identite-Bh0kwLOU.js","assets/index-jg0GTgVR.js","assets/index.es-Bp0dTHkq.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-CqdmfvwO.js","assets/jspdf.es.min-Co0kUhSL.js","assets/JustePrix-BRK44RjG.js","assets/kkiapay-BgNHj_OV.js","assets/laboratoire-B_KJ49iD.js","assets/Laboratoire-DprmEBaY.js","assets/LettresAuDossier-CscTw2Jz.js","assets/LienMndPay-6J8VP0kx.js","assets/maisons-CSSFrqZy.js","assets/Marketing-DWxQEYUa.js","assets/Marque-sMLXdhuc.js","assets/momo-C2ZVfV9J.js","assets/MonMois-DcoU-N6p.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-9KfSV7Mq.js","assets/paliers-Q6R-tFM1.js","assets/Parametres-DN689EID.js","assets/parcours-BsItACrX.js","assets/Parrainages-BigHEERM.js","assets/Parrainages-gAHAPB_6.css","assets/pdf-CedEyNsX.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/Personas-Bnf9ry8x.js","assets/Personnel-aLOhcMbA.js","assets/photo-BLqknZ7O.js","assets/pilotage-Bn1gP_oo.css","assets/Predictions-B5PZypRs.js","assets/Prestataires-c_STcgrq.js","assets/prestataires-xYe0Q0BQ.js","assets/Prets-CJXqsNQW.js","assets/protocoles-Ddewea_p.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-CMeOc-82.js","assets/qualification-BlwaYDDS.js","assets/quiz-5qMPWZVi.js","assets/Rapport-DpJa_YIo.js","assets/RattacherUneCarte-CbTfAFdi.js","assets/Recommandations-DwdKY-0O.js","assets/relances-pur-DsIo28uB.js","assets/releve-des-avis-BnhMQuia.js","assets/SalonFoyer-iXGMEpR7.js","assets/secretariat-admin-xVzgesTQ.js","assets/Secretariat-Cb-e6DS7.js","assets/Secretariat-Cy79Zw30.css","assets/Signatures-85-nLyxg.js","assets/SignerUnPdf-Bdiyt1ZJ.js","assets/Synthese-B3Pw402y.js","assets/systeme-C3XFIa8E.css","assets/Tableau-D0NWlNoV.js","assets/Textes-DLpOzRbT.css","assets/Textes-DrarXYKb.js","assets/tiroirs-CJST2zym.js","assets/trace-du-moyen-pur-Cb3Gcky8.js","assets/trone-BuOaEFbZ.js","assets/trone-CNJgSGiI.css","assets/ui-3YL_mqSV.js","assets/useAudiences-SNS_eygI.js","assets/vente-C7YWXkHo.css","assets/Vitrine-BON6rcdB.css","assets/Vitrine-CgAIz3PV.js","assets/_admin-w7x2G3bI.js","assets/_contrat-BBIHnT2t.js","assets/_heures-B5jyLnX1.js","assets/_reuni-DpdfWlBM.js","assets/_shared-NOTsTvLu.js","assets/_signature-2YPlse4c.js","assets/_ui-BWMA-PlM.css","assets/_ui-hIKqdlzT.js"];
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
