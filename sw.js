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
const BUILD = "20261104082526";
const A_GARDER = ["./","assets/Abonnements-D5KTqTEB.js","assets/abonnements-XLW9BCkR.js","assets/Academie-wZL3kCmO.js","assets/Acces-BL3Lb_oo.js","assets/actions-DsL8LutW.js","assets/AFaire-BKTP943H.js","assets/afaire-CuvI5CtB.js","assets/Agents-C36Sp6R7.js","assets/agents-donnees-BlKlWYWL.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-BIGkhPt4.js","assets/Appels-B0V4duRD.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/Assistants-BOcxTwZO.css","assets/Assistants-Ca14lfps.js","assets/AtelierDesContenus-B4m5J-X1.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/AuComptoir-OXVpVDXX.js","assets/Audience-y7zdzjG4.js","assets/Aujourdhui-GMrejEO3.js","assets/avant-le-fauteuil-lecture-CSbxtnBo.js","assets/AvantLeFauteuil-D8Lvhsuo.js","assets/avis-fiches-B4faMBkE.js","assets/AvisGoogle-DaPXfwX9.css","assets/AvisGoogle-tD7dmCXy.js","assets/bilan-B-bfPYR0.css","assets/bilan-BR0ZegMp.js","assets/BilanMensuel-B_vZX-3f.js","assets/Branches-UgrxcxBt.js","assets/bridges-CX6VIPUz.js","assets/caisse-du-soir-D-_SJuF3.js","assets/Caisse-jTEJkx8C.js","assets/Caisses-VSqAb3jz.js","assets/Calendrier-0StB7JUF.js","assets/campagnes-pur-CtJ8Nah-.js","assets/Carnet-DtvmJVQ4.js","assets/carte-CX8y43lb.js","assets/carte-_W_-xBPj.css","assets/CarteModal-BiR26oAt.js","assets/CartesCadeaux-BaaYxn0u.js","assets/Catalogue-CIiuWjQF.js","assets/CentreDeCommande-B_IuaChd.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-C09e0Z_s.js","assets/certificat-DQNaO-ui.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-Bmb2aWMa.js","assets/ChiffreDesPrestations-C74nowUm.js","assets/client-2t4LLvUq.js","assets/ClotureDuTiroir-B2sPALs5.js","assets/ClotureDuTiroir-C6vPx-E_.css","assets/Coffre-B-fCxY2b.js","assets/components-BEbLzb41.js","assets/compte-courant-ByzulCEN.js","assets/compte-CSL_KWzH.js","assets/CompteCourant-Cs32VMeU.js","assets/Comptes-B7oDjzj_.js","assets/Comptoir-BMdgd_Z1.js","assets/consultation-CRW6QcWf.css","assets/consultation-DAhvAK-y.js","assets/Consultations-CAVO4Gtv.js","assets/consultNotes-BLTMDbGJ.js","assets/Conversations-D4WwB5Zo.css","assets/Conversations-DkfCk2Uf.js","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-cna4iNT9.js","assets/currency-qfIhGmrs.js","assets/Customers-Bt-556qf.js","assets/Dashboard-Dl9ReZoF.js","assets/Dashboard-zjGteuUE.css","assets/dates-pT1rZ7x5.js","assets/Demandes-CzFKFIDd.js","assets/Depenses-CbylcwDo.js","assets/depenses-saisie-kHYg3Pcg.js","assets/dernier-message-pur-CBYWnq8m.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-BOLLy24O.js","assets/diagnostics-au-trone-DbhJemAw.js","assets/Dictee-D2P9yM7v.css","assets/Dictee-jNPhYaGw.js","assets/dictee-pur-CRHujOQl.js","assets/Discussions-Kb6BphC-.js","assets/EditeurDesOffres-CsHRLY0C.js","assets/Encaissements-DPa-gz5i.js","assets/enfants-Ymwl4vw-.js","assets/Engagements-Chz6DLQh.js","assets/Engagements-Cj5S9MhG.css","assets/EntreDeuxSeances-DDDBTENZ.js","assets/equipe-B_9ZHz24.css","assets/Evaluation-C56fB1IO.js","assets/FacturePrestataire-DGGvIQyw.js","assets/Factures-DJG93YvC.js","assets/FenetreDesCivilites-CDNehdS1.js","assets/FenetreDesCivilites-zfNk1aak.css","assets/FenetreDuPoint-BQIKPabw.js","assets/Fil-B6xk0A2Z.js","assets/finances-BMFnlkRx.css","assets/fon-DuMCQo1I.js","assets/fon-pur-CgVkbJ8O.js","assets/fournisseurs-CULkT5Ql.js","assets/Fournisseurs-DqGDPGx5.js","assets/foyer-Dm4BpXDM.js","assets/Gerard-Bfp4ua88.css","assets/Gerard-CDJqPM-y.js","assets/gerard-donnees-D3FTEC-Z.js","assets/gestes-conversation-CUHBGW7W.js","assets/HomeRituals-CpC69j8J.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-BL3ZrHd0.js","assets/ia-centre-DF-g2X5m.js","assets/ia-diagnostic-pur-BBLrGY5l.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-recu-pur-DcucZqpR.js","assets/identite-BlmGEWS4.js","assets/index-C4XY82vY.js","assets/index.es-B-Hakedm.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-BnQsY2Xt.js","assets/jspdf.es.min-PrUaipSn.js","assets/JustePrix-Bl2h0Joz.js","assets/kkiapay-B2VYEEop.js","assets/kkiapay-widget-DnUhUNd4.js","assets/Laboratoire-BuxO9lFo.js","assets/laboratoire-CsiDITX5.js","assets/LettresAuDossier-CFTM1xHi.js","assets/LienMndPay-BCmxkInC.js","assets/maisons-CSSFrqZy.js","assets/Marketing-L_hiEsIf.js","assets/MarketingBranche-BtM-KbuD.js","assets/Marque-DTu7k_Qa.js","assets/MesTaches-Cc4XUDf6.css","assets/MesTaches-CG4Kjw0D.js","assets/missions-prestataires-DOiVpZbF.js","assets/momo-C2ZVfV9J.js","assets/MonMois-CdydotQK.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-B5IWVB2t.js","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/opale-Djmb4CK9.js","assets/paliers-B9WPpYDo.js","assets/Parametres-C4_ngLep.js","assets/parcours-Bkasp6QB.js","assets/Parrainages-CX9VleBW.js","assets/Parrainages-gAHAPB_6.css","assets/PassageAvantLeFauteuil-rLpQOdXB.js","assets/pdf-r8iFSyzU.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/Personas-Bb-qb8wm.js","assets/Personnel-D0dZQuis.js","assets/photo-Dyg7bIJD.js","assets/pilotage-D8kf1Co8.css","assets/Predictions-Bw0A0_1C.js","assets/Prestataires-zgC4Fqsn.js","assets/Prets-DQw-XHNM.js","assets/prevision-du-mois-pur-D6sJa5lw.js","assets/Previsions-C74MDC3r.js","assets/Previsions-D-0__Buz.css","assets/previsions-pur-C9w3OUnw.js","assets/processus-pur-BLN25j-E.js","assets/Projets-CFiqNkk9.js","assets/Projets-COO7WDEE.css","assets/projets-CZA_llCl.js","assets/projets-pur-2ZEMRNDU.js","assets/protocoles-0uv5o5oA.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-ZFlPLncR.js","assets/qualification-ByNHLEGj.js","assets/quiz-5qMPWZVi.js","assets/Rapport-BBw8LfDr.js","assets/RattacherUneCarte-BQA_YlxF.js","assets/Recommandations-BD6xt7hq.js","assets/regler-C5hcM02_.css","assets/regler-C9ZCNhAJ.js","assets/regler-la-seance-serveur-Bs6rzqZX.js","assets/relances-pur-lwRTXc5E.js","assets/releve-des-avis-Cn5EEthi.js","assets/SalonFoyer-Dj0d3820.js","assets/secretariat-admin-DYK74Ykp.js","assets/Secretariat-C1j6Gg_A.js","assets/Secretariat-Cy79Zw30.css","assets/Signatures-Co--Osfv.js","assets/SignerUnPdf-D4wteOHH.js","assets/Synthese-PRVEd0ht.js","assets/SyntheseGraphes-BB7qviaL.js","assets/systeme-TPy-pF7j.css","assets/Tableau-BmFOxLo_.js","assets/temps-ChuEbV1_.js","assets/Textes-BVMGTvit.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-gdARkX0A.js","assets/trace-du-moyen-pur-Bx8-suHn.js","assets/trone-Doz5w-gE.css","assets/trone-DYhyRfIG.js","assets/ui-DaMx73qF.js","assets/useAudiences-BLoI4cGB.js","assets/vente-CauXO8yV.css","assets/Vitrine-276GpQrJ.js","assets/Vitrine-BWilTqQJ.css","assets/_admin-DRfqVGEm.js","assets/_contrat-CSAEZZGX.js","assets/_heures-CTVp9pUn.js","assets/_reuni-CblhU2fT.js","assets/_shared-CwLuf0HU.js","assets/_signature-B5_hHRxq.js","assets/_ui-BqWvpwt7.js","assets/_ui-BWMA-PlM.css"];
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
