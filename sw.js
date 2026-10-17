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
const BUILD = "20261017062008";
const A_GARDER = ["./","assets/Abonnements-C0whRuDV.js","assets/abonnements-DlJfBxRH.js","assets/Academie-CtxmX6wi.js","assets/Acces-Wsm9dJdW.js","assets/actions-hC--Bjll.js","assets/AFaire-BuZaLb3-.js","assets/afaire-CySAq4Ih.js","assets/Analytics-CFR1ugce.js","assets/Appels-AZafR7Bn.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/AtelierDesContenus-D4zY1EBE.js","assets/Aujourdhui-DDHERwB-.js","assets/bilan-B-bfPYR0.css","assets/bilan-DAwLSBxJ.js","assets/BilanMensuel-D83o9CQ3.js","assets/Branches-CxtMNJTC.js","assets/bridges-CAYCF7H_.js","assets/Caisse-DlXqPksF.js","assets/caisse-du-soir-Dhs2jfWx.js","assets/Caisses-DYCUosn0.js","assets/Calendrier-vh_hMyDx.js","assets/Carnet-IUBqu-2M.js","assets/carte-Du3i51_o.js","assets/carte-WI2qP1su.css","assets/CarteModal-BoiJPNWt.js","assets/CartesCadeaux-bBw9VsYR.js","assets/Catalogue-penrwEU_.js","assets/CentreDeCommande-C6MgMZd9.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-Cc3RGxvS.js","assets/certificat-C7_auSYV.js","assets/certificat-DVSxho5e.css","assets/certificats-coffre-DYHgjTC_.js","assets/ChiffreDesPrestations-JnsDumyT.js","assets/ClotureDuTiroir-BEECa1QZ.js","assets/ClotureDuTiroir-C6vPx-E_.css","assets/Coffre-BRfAA4pv.js","assets/components-DCmK4gol.js","assets/compte-CIW1IlbH.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-C0ZyxBCM.js","assets/Comptes-g-lDt69k.js","assets/Comptoir-D4ynDlzz.js","assets/consultation-CCTm16qX.css","assets/consultation-CtMNPRZU.js","assets/Consultations-DtLZ1wQr.js","assets/consultNotes-DjjItRfQ.js","assets/Conversations-DZUmNdWg.js","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-CNN1Ruzg.js","assets/currency-qfIhGmrs.js","assets/Customers-DRKpL8Fi.js","assets/Dashboard--eyvWvFi.js","assets/dates-DZvvoBdI.js","assets/Demandes-T1jEkawS.js","assets/Depenses-DuXsToFG.js","assets/devise-fon-DX3P0bG4.woff2","assets/encaissement-pur-Clrk1poA.js","assets/Encaissements-aOLm9E4I.js","assets/enfants-RtLlmzxw.js","assets/Engagements-Cj5S9MhG.css","assets/Engagements-CYDOBQs2.js","assets/EntreDeuxSeances-CJdlK3Cs.js","assets/equipe-DpPyq6h-.css","assets/Evaluation-D7sdZgyb.js","assets/FacturePrestataire-BBmEZjbA.js","assets/Factures-x3poEU9p.js","assets/Fil-DdgsZ1Si.js","assets/finances-CCjqAkCE.css","assets/fournisseurs-DwHTloYF.js","assets/Fournisseurs-kNxzpM6k.js","assets/foyer-tasJx6kS.js","assets/HomeRituals-DUlfv09D.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-Clvsd2M7.js","assets/identite-HgI-ksfq.js","assets/index-DtUDQpNf.js","assets/index.es-C6XwnigK.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-D1RS3mwq.js","assets/jspdf.es.min-LMKkwnAd.js","assets/JustePrix-DcnqoBDN.js","assets/kkiapay-Dw_C57Ks.js","assets/laboratoire-D1LujdOY.js","assets/Laboratoire-DrFWS4l8.js","assets/LettresAuDossier-D1FCY7BY.js","assets/maisons-CSSFrqZy.js","assets/Marketing-DkOo8107.js","assets/Marque-BTOWkZVl.js","assets/momo-C2ZVfV9J.js","assets/MonMois-CJUK-qyw.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-Dl7lFMI9.js","assets/paliers-l2D0cvJ9.js","assets/Parametres-ByksZk6s.js","assets/parcours-CV1Dcmb-.js","assets/Parrainages-9p1XVx3K.js","assets/Parrainages-gAHAPB_6.css","assets/pdf-BdhdvE0t.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/Personas-DsBrHNlx.js","assets/Personnel-CDVczV5j.js","assets/photo-a2Hr8gMe.js","assets/pilotage-Bn1gP_oo.css","assets/Predictions-D-XmSLNB.js","assets/Prestataires-DFUp1FUP.js","assets/prestataires-jZeUMBgh.js","assets/Prets-wSDlpmmz.js","assets/promos-CjABGyjd.js","assets/protocoles-Cffm1_oY.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-C5eEyii_.js","assets/quiz-5qMPWZVi.js","assets/Rapport-BJ07lwBu.js","assets/RattacherUneCarte-BVqeDDpy.js","assets/Recommandations-BCrQ93x_.js","assets/SalonFoyer-44jCkPtu.js","assets/secretariat-admin-DXxoczFh.js","assets/Secretariat-Tb_VPO-A.js","assets/Signatures-BRfLhMNi.js","assets/SignerUnPdf-B9GLB2Ak.js","assets/Synthese-CW-08Q53.js","assets/systeme-C3XFIa8E.css","assets/Tableau--QGFexP8.js","assets/Textes-Dizvscl7.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-Dp_KD3n7.js","assets/trone-CyFdPxg0.css","assets/trone-UvQy-9WS.js","assets/ui-BM1u97Ts.js","assets/vente-DMe4r4ed.css","assets/Vitrine-CRe5apL7.js","assets/_admin-Cm1_RoEp.js","assets/_contrat-quGWK6wJ.js","assets/_heures-CBiWj2gw.js","assets/_reuni-vLtCkZJQ.js","assets/_shared-CNUvSlfh.js","assets/_signature-DD_25hQ9.js","assets/_ui-Bluhfe_N.js","assets/_ui-BWMA-PlM.css"];
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
