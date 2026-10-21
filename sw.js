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
const BUILD = "20261021100241";
const A_GARDER = ["./","assets/abonnements-BFewHXmt.js","assets/Abonnements-DjNN0TCb.js","assets/Academie-B5rekdos.js","assets/Acces--9_fcnSy.js","assets/actions-Be_LqhDk.js","assets/AFaire-BZR2HJsE.js","assets/afaire-D0jmLCw_.js","assets/Analytics-CCpwT1Ki.js","assets/Appels-BZsl45ml.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/AtelierDesContenus-DyjpNLIP.js","assets/Aujourdhui-tUXavecC.js","assets/bilan-B-bfPYR0.css","assets/bilan-BA1TdX0y.js","assets/BilanMensuel-3DMUSdJm.js","assets/Branches-CDq4ek8L.js","assets/bridges-LPZbPFHT.js","assets/Caisse-B7VPSfh4.js","assets/caisse-du-soir-cSIY5uSi.js","assets/Caisses-DdStRmWl.js","assets/Calendrier-CKIPZ5OG.js","assets/Carnet-Bws9YPzs.js","assets/carte-BZbs4d5Y.js","assets/carte-WI2qP1su.css","assets/CarteModal-CDO9s5gA.js","assets/CartesCadeaux-B7EmaNQ2.js","assets/Catalogue-C_Q8-3qq.js","assets/CentreDeCommande-BBBiDK1T.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-BbsKueMn.js","assets/certificat-DiNIxi7a.js","assets/certificat-DVSxho5e.css","assets/certificats-coffre-DjiLBOfp.js","assets/ChiffreDesPrestations-BcZxVED_.js","assets/ClotureDuTiroir-C6vPx-E_.css","assets/ClotureDuTiroir-DoMqKrLM.js","assets/Coffre-CK_MPWn-.js","assets/components-CZgZWDou.js","assets/compte-courant-ByzulCEN.js","assets/compte-DynWjIr7.js","assets/CompteCourant-Dw7-IG-8.js","assets/Comptes-CQR_evb2.js","assets/Comptoir-bacBH4mI.js","assets/consultation-CCTm16qX.css","assets/consultation-Cmig1CJO.js","assets/Consultations-I6LCdbjx.js","assets/consultNotes-CIkqqZMm.js","assets/Conversations-CuVUIe5x.js","assets/Conversations-D4WwB5Zo.css","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-BBN80cJ8.js","assets/currency-qfIhGmrs.js","assets/Customers-BJLdvc4e.js","assets/Dashboard-DGgNRSqa.js","assets/dates-BtShk5mP.js","assets/Demandes-BkVWDPTj.js","assets/Depenses-6D_-CGTy.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-C_ofcREi.js","assets/diagnostics-au-trone-2Nc5FTgJ.js","assets/Discussions-B1NI7abc.js","assets/encaissement-pur-CCmllzzW.js","assets/Encaissements-CMjVhV4D.js","assets/enfants-OYtKeTlz.js","assets/Engagements-BW_Mk0za.js","assets/Engagements-Cj5S9MhG.css","assets/EntreDeuxSeances-xdovXi5u.js","assets/equipe-DABhdlQT.css","assets/Evaluation-DFc0mCfp.js","assets/FacturePrestataire-CgOg0UP1.js","assets/Factures-BcAGjY0r.js","assets/Fil-Dh3HWF5q.js","assets/finances-CCjqAkCE.css","assets/Fournisseurs-C1vanCzi.js","assets/fournisseurs-Q6e7I8oV.js","assets/foyer-BNa71sBo.js","assets/gestes-conversation-9zJBIjfX.js","assets/HomeRituals-CNbXDuTg.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-C1s2l-jO.js","assets/ia-diagnostic-pur-BulIFgZQ.js","assets/ia-recu-pur-DcucZqpR.js","assets/identite-BroiCysN.js","assets/index-DtdZwlbO.js","assets/index.es-6Ig_3sYa.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-DE4nkjZE.js","assets/jspdf.es.min-Bq5W1JCu.js","assets/JustePrix-CYyw3CHX.js","assets/kkiapay-BUX6hULR.js","assets/Laboratoire-DgtYTHlU.js","assets/laboratoire-DkMFBc4J.js","assets/LettresAuDossier-Dl_VTEOF.js","assets/LienMndPay-D-d-n_0g.js","assets/maisons-CSSFrqZy.js","assets/Marketing-0as5_bxG.js","assets/Marque-DKaBT6Y0.js","assets/momo-C2ZVfV9J.js","assets/MonMois-U70iI8Yr.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-BUgtl0pr.js","assets/paliers-Deqgezjv.js","assets/Parametres-BPfTgAoY.js","assets/parcours-DpGPJiLZ.js","assets/Parrainages-D5_dxjC2.js","assets/Parrainages-gAHAPB_6.css","assets/pdf-BiX59tUQ.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/Personas-AJNaI7F_.js","assets/Personnel-9kLQ3MTp.js","assets/photo-DoaEAOsB.js","assets/pilotage-Bn1gP_oo.css","assets/Predictions-VqKYtpcZ.js","assets/Prestataires-CV5BhCy3.js","assets/prestataires-DRx4LST5.js","assets/Prets-BokvCW_S.js","assets/promos-BNo8np6n.js","assets/protocoles-hFw-zGrB.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-CXw6WmR8.js","assets/qualification-Bh8viJZx.js","assets/quiz-5qMPWZVi.js","assets/Rapport-DZHtgTNH.js","assets/RattacherUneCarte-B_DNAL6D.js","assets/Recommandations-BQ648NVX.js","assets/relances-pur-DsIo28uB.js","assets/releve-des-avis-MSb-s0BZ.js","assets/SalonFoyer-Tx7q2vwU.js","assets/secretariat-admin-Cv-iAw9q.js","assets/Secretariat-Cy79Zw30.css","assets/Secretariat-o0KCzm6f.js","assets/Signatures-BvZ_z0B8.js","assets/SignerUnPdf-34qdkozt.js","assets/Synthese-De34U0yA.js","assets/systeme-C3XFIa8E.css","assets/Tableau-hR03C1SJ.js","assets/Textes-cB4xgKuf.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-T_4SDUAM.js","assets/trace-du-moyen-pur-BQm6t3bk.js","assets/trone-Cb6SJluv.js","assets/trone-wvMgyufp.css","assets/ui-CYwY6tQb.js","assets/useAudiences-DHkFhvcn.js","assets/vente-DMe4r4ed.css","assets/Vitrine-B5oSWVvd.js","assets/Vitrine-CRqZUnEh.css","assets/_admin-CZj7wEzC.js","assets/_contrat-BnZ02J4Y.js","assets/_heures-BNefJc-f.js","assets/_reuni-CNE8eyOJ.js","assets/_shared-BWKPPSut.js","assets/_signature-yiPypm0t.js","assets/_ui-BlB90ETP.js","assets/_ui-BWMA-PlM.css"];
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
