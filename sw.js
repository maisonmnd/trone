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
const BUILD = "20261024215310";
const A_GARDER = ["./","assets/abonnements-BMFZNP7f.js","assets/Abonnements-FpDV_tMb.js","assets/Academie-CVr62EWI.js","assets/Acces-CqkkRdqt.js","assets/actions-5dfnzEDs.js","assets/AFaire-CTOxOmOf.js","assets/afaire-DkZlYDux.js","assets/Agents-B5oco2sP.js","assets/Agents-C89x4Rfw.css","assets/agents-donnees-Xge-7lt6.js","assets/Analytics-Bgy1hDdi.js","assets/Appels-DTBYkqPT.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/AtelierDesContenus-8wComUOn.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/AuComptoir-CNg-3k3U.js","assets/Aujourdhui-fTY9jeye.js","assets/bilan-B-bfPYR0.css","assets/bilan-BUfwtXX3.js","assets/BilanMensuel-C8Ees9B8.js","assets/Branches-D6IM6Poa.js","assets/bridges-8sOHUmTF.js","assets/Caisse-Djzuec7A.js","assets/caisse-du-soir-Q3-S2tED.js","assets/Caisses-Czv-jfyw.js","assets/Calendrier-NwybSkjU.js","assets/Carnet-DWJ1Y1Ym.js","assets/carte-CP0oYq7q.js","assets/carte-DWlSbalk.css","assets/CarteModal-DaH0GmEU.js","assets/CartesCadeaux-86vM17cA.js","assets/Catalogue-Cd4sk63D.js","assets/CentreDeCommande-CF8lK61x.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-ah6ab1to.js","assets/certificat-9_XWf1iQ.css","assets/certificat-QWfNCCYv.js","assets/certificats-coffre-BzALMpFS.js","assets/chiffre-du-jour-pur-DHqaz5-o.js","assets/ChiffreDesPrestations-CBp7r5kY.js","assets/ClotureDuTiroir-B2nomb3G.js","assets/ClotureDuTiroir-C6vPx-E_.css","assets/Coffre-Cp7FFedN.js","assets/components-DzwSr8PG.js","assets/compte-BM64GDBp.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-GgIKyZvS.js","assets/Comptes-DoykZXGv.js","assets/Comptoir-BLQXG_ve.js","assets/consultation-BXUI2ExE.js","assets/consultation-DQBnwlMN.css","assets/Consultations-9_0ixybF.js","assets/consultNotes-CL4rZrOy.js","assets/Conversations-B1-MfafJ.js","assets/Conversations-D4WwB5Zo.css","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-CPqOg7tq.js","assets/currency-qfIhGmrs.js","assets/Customers-gDdTBOTk.js","assets/Dashboard-Co8ilP3s.js","assets/Dashboard-CRztSvRU.css","assets/dates-CXWou8ne.js","assets/Demandes-CZl02t3_.js","assets/Depenses-C8q1iOHz.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-CLt1iYMe.js","assets/diagnostics-au-trone-B6JN8JCS.js","assets/Discussions-CEl7ikAn.js","assets/Encaissements-D8qB9KhN.js","assets/enfants-CRhQ0g8L.js","assets/Engagements-Cj5S9MhG.css","assets/Engagements-DdrEROCG.js","assets/EntreDeuxSeances-B2K7TK5c.js","assets/equipe-B_9ZHz24.css","assets/Evaluation-DQWZiRdQ.js","assets/FacturePrestataire-CdpqX6Q-.js","assets/Factures-BUeSMgl7.js","assets/Fil-B-3uKDW-.js","assets/finances-BMFnlkRx.css","assets/Fournisseurs-DOAF-lTX.js","assets/fournisseurs-nkjGu15O.js","assets/foyer-DO7AOd4C.js","assets/gestes-conversation-BHR5a-FY.js","assets/HomeRituals-RTSVx1O1.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-BMy3GfHS.js","assets/ia-diagnostic-pur-BulIFgZQ.js","assets/ia-marque-pur-cjcfwB6C.js","assets/ia-recu-pur-DcucZqpR.js","assets/identite-CYQdGzff.js","assets/index-Ci4GTYKh.js","assets/index.es-CgKQSiSw.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-jSNiy8ZN.js","assets/jspdf.es.min-C53FevY9.js","assets/JustePrix-DYPC91Wm.js","assets/kkiapay-CRxh0gOD.js","assets/Laboratoire-BUVeMNEG.js","assets/laboratoire-Hl5LoIdN.js","assets/LettresAuDossier-DCuI8Xl0.js","assets/LienMndPay-CiBg_dYh.js","assets/maisons-CSSFrqZy.js","assets/Marketing-CKf0U8wi.js","assets/Marque-CRpxX_78.js","assets/MesTaches-Cc4XUDf6.css","assets/MesTaches-CKqsrbnD.js","assets/momo-C2ZVfV9J.js","assets/MonMois-DZPDB16W.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-CMB4Eg8_.js","assets/paliers-B5sjeGKk.js","assets/Parametres-DJVReVef.js","assets/parcours-Rtrx_-OB.js","assets/Parrainages-72IFKj9P.js","assets/Parrainages-gAHAPB_6.css","assets/pdf-VJcNm7C7.js","assets/pdf-WoSaqP-c.js","assets/pdf.worker.min-uNib_u9P.js","assets/Personas-CqCHaRxK.js","assets/Personnel-Pq5a3Z3h.js","assets/photo-D6v_Uk8I.js","assets/pilotage-D8kf1Co8.css","assets/Predictions-Dxz-lnTA.js","assets/Prestataires-B_ybnTkn.js","assets/prestataires-CjZxybt4.js","assets/Prets-Cp7Uw4pu.js","assets/projets-BB_ldlwL.js","assets/Projets-COO7WDEE.css","assets/Projets-CW7WHAQH.js","assets/projets-pur-2ZEMRNDU.js","assets/protocoles-B0d8JdxT.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-CgdqYOHt.js","assets/qualification-ykfwOBrR.js","assets/quiz-5qMPWZVi.js","assets/Rapport-MTWgwgKh.js","assets/RattacherUneCarte-CACJ8J0T.js","assets/Recommandations-BchSVIPI.js","assets/relances-pur-DsIo28uB.js","assets/releve-des-avis-Czje1qJt.js","assets/SalonFoyer-BCmyqXPG.js","assets/secretariat-admin-DEc4WNcu.js","assets/Secretariat-Cy79Zw30.css","assets/Secretariat-Dk1gO3cV.js","assets/Signatures-BIhZNzsm.js","assets/SignerUnPdf-Cm95hM3y.js","assets/Synthese-C2SgVhHg.js","assets/SyntheseGraphes-g7jlQ-SC.js","assets/systeme-C3XFIa8E.css","assets/Tableau-Dneu9qtI.js","assets/Textes-DaaViA1F.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-C4SojNKs.js","assets/trace-du-moyen-pur-Cb3Gcky8.js","assets/trone-CklkIwKh.js","assets/trone-CsqriUxj.css","assets/ui-CYghvcUK.js","assets/useAudiences--QePXQVO.js","assets/vente-C7YWXkHo.css","assets/Vitrine-BON6rcdB.css","assets/Vitrine-BRZyY-Vk.js","assets/_admin-BI4Q6Fu-.js","assets/_contrat-RIRWT_fd.js","assets/_heures-BLKrRDRH.js","assets/_reuni-B5fFInvi.js","assets/_shared-B4mpXuzI.js","assets/_signature-Cajs5TXG.js","assets/_ui-BWMA-PlM.css","assets/_ui-DsTtzafI.js"];
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
