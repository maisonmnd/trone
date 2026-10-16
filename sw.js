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
const BUILD = "20261016041735";
const A_GARDER = ["./","assets/Abonnements-2ptFAbfY.js","assets/abonnements-CO3tbCQx.js","assets/Academie-C7glzj-i.js","assets/Acces-BBVv6tnJ.js","assets/actions-CgVm9uIS.js","assets/AFaire-5w9UOaE9.js","assets/afaire-DfPsRos8.js","assets/Analytics-l9sPUMwj.js","assets/Appels-Ds-RAoeM.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/AtelierDesContenus-D4K3luAK.js","assets/Aujourdhui-DSKF8dQZ.js","assets/bilan-B-bfPYR0.css","assets/bilan-CD4jbHX6.js","assets/BilanMensuel-CTHKe7qC.js","assets/Branches-Dku7_uZQ.js","assets/bridges-10-xXUhW.js","assets/Caisse-D2FDWIiQ.js","assets/caisse-du-soir-ByLQHCUg.js","assets/Caisses-ByZBcu4b.js","assets/Calendrier-Dl9y2Dzb.js","assets/Carnet-D3hST5Gs.js","assets/carte-pu7mhppB.js","assets/carte-WI2qP1su.css","assets/CarteModal-hTMZ4VMS.js","assets/CartesCadeaux-DC2xRPWz.js","assets/Catalogue-D5HZcU6j.js","assets/CentreDeCommande-DevVW6_G.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-w0aYS4IS.js","assets/certificat-B-dqwtXt.js","assets/certificat-DVSxho5e.css","assets/certificats-coffre-DJo3woli.js","assets/ChiffreDesPrestations-DluEV6ga.js","assets/ClotureDuTiroir-C6vPx-E_.css","assets/ClotureDuTiroir-CiauXMxM.js","assets/Coffre-CL_l0Kno.js","assets/components-y5yJqysn.js","assets/compte-Clop4TtZ.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-DBY6pIWg.js","assets/Comptes-CHiJ8Q13.js","assets/Comptoir-CJbE_ynT.js","assets/consultation-CCTm16qX.css","assets/consultation-DTyPEJ1L.js","assets/Consultations-C89fl1kK.js","assets/consultNotes-DTUpDcBC.js","assets/Conversations-nz019V6N.js","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-CvDdFBRm.js","assets/currency-D4l65sA8.js","assets/Customers-RPFR-SN9.js","assets/Dashboard-BkD9siQm.js","assets/dates-BUj-D6hy.js","assets/Demandes-C3UCnAnG.js","assets/Depenses-jD9IjyoF.js","assets/devise-fon-DX3P0bG4.woff2","assets/encaissement-pur-DRcm9TML.js","assets/Encaissements--tmbmany.js","assets/enfants-CTNyoSeP.js","assets/Engagements-CCmAqRc-.js","assets/Engagements-Cj5S9MhG.css","assets/EntreDeuxSeances-G0EdPxUO.js","assets/equipe-DpPyq6h-.css","assets/Evaluation-n4BVE56X.js","assets/FacturePrestataire-D4kY7CbN.js","assets/Factures-CDi_kRtR.js","assets/Fil-CBvqU5N6.js","assets/finances-CCjqAkCE.css","assets/fournisseurs-CknEP5Ip.js","assets/Fournisseurs-CZITSO-B.js","assets/foyer-DW6pRZ3C.js","assets/HomeRituals-DQzWMos7.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-CTQLwdEm.js","assets/identite-CyGqd1L2.js","assets/index-FyrYTRMU.js","assets/index.es-Iykwm4bQ.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-DPPzexrh.js","assets/jspdf.es.min-Cyklbci_.js","assets/JustePrix-CMPdS2Uh.js","assets/kkiapay-uvNBqI9h.js","assets/laboratoire-4uAXWfRx.js","assets/Laboratoire-C1IfRRjG.js","assets/LettresAuDossier-i4wX7c7U.js","assets/maisons-CSSFrqZy.js","assets/Marketing-DdFuVcut.js","assets/Marque-CRaJd79m.js","assets/momo-C2ZVfV9J.js","assets/MonMois-C8J0BcZK.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-Bh7h4ID9.js","assets/paliers-D3WhjAKo.js","assets/Parametres-DOP95Ouc.js","assets/parcours-DpbNS9HR.js","assets/Parrainages-B_iZwXT3.js","assets/Parrainages-gAHAPB_6.css","assets/pdf-BQ5hNgNY.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/Personas-DTtwm3Qq.js","assets/Personnel-C773anY_.js","assets/photo-CWUGt4Vi.js","assets/pilotage-BdeuW7mn.css","assets/Predictions-C48EyAmG.js","assets/Prestataires-BPPCXyPl.js","assets/prestataires-Co5HTv6U.js","assets/Prets-evAytmEW.js","assets/promos-C7AloTxB.js","assets/protocoles-B6GmaXsz.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-DDOccytS.js","assets/quiz-5qMPWZVi.js","assets/Rapport-kWdV9H9y.js","assets/RattacherUneCarte-9jedHn1P.js","assets/Recommandations-BR5hIIvR.js","assets/SalonFoyer-Z0VP73q1.js","assets/secretariat-admin-DzOWOU2J.js","assets/Secretariat-CDUncYWr.js","assets/Signatures-B12UrH-z.js","assets/SignerUnPdf-DWYUnHvk.js","assets/Synthese-Fo5U_h6R.js","assets/systeme-C3XFIa8E.css","assets/Tableau-BiwNf1-v.js","assets/Textes-DLpOzRbT.css","assets/Textes-Dw-mm0JB.js","assets/tiroirs-DQIIs8xb.js","assets/trone-BMBy1rsB.js","assets/trone-DnuuvbFM.css","assets/ui-BtIk2o71.js","assets/vente-D0kdELDn.css","assets/Vitrine-CCB6lFLk.js","assets/_admin-Bhu13QIp.js","assets/_contrat-CUNPy8vO.js","assets/_heures-G6rmoRRQ.js","assets/_reuni-Bniwaths.js","assets/_shared-BXQCbR7i.js","assets/_signature-DcsDLCpe.js","assets/_ui-BWMA-PlM.css","assets/_ui-DassyBZP.js"];
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
