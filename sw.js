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
const BUILD = "20261026064613";
const A_GARDER = ["./","assets/Abonnements-Giwn7ueS.js","assets/abonnements-qCH0Mpg9.js","assets/Academie-B4mJsHN2.js","assets/Acces-Bizp7OdA.js","assets/actions-BvGUK8r4.js","assets/AFaire-Bn6AYgKW.js","assets/afaire-CyIO6tB0.js","assets/Agents-CggvK4Zm.js","assets/agents-donnees-CFoSHtlj.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-uPFphWy8.js","assets/Appels-B7IWcffw.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/AtelierDesContenus-C3bOgWlo.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/AuComptoir-BPoUZepE.js","assets/Aujourdhui-Dd-V0XwF.js","assets/avis-fiches-CS6Avrsk.js","assets/bilan-B-bfPYR0.css","assets/bilan-PU1vr-Or.js","assets/BilanMensuel-CQzefj1n.js","assets/Branches-B3BRt01T.js","assets/bridges-CjgA7iAJ.js","assets/Caisse--TsE2UpA.js","assets/caisse-du-soir-Cjmp5j6s.js","assets/Caisses-BzuHT0u4.js","assets/Calendrier-CMXBHEAq.js","assets/Carnet-DGVxQcQV.js","assets/carte-Lqv6yE3W.js","assets/carte-_W_-xBPj.css","assets/CarteModal-BwnnfEgC.js","assets/CartesCadeaux-CuUPGtad.js","assets/Catalogue-G0fgFW7Q.js","assets/CentreDeCommande-C3UVWitu.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-CimWQBqB.js","assets/certificat-CXt645v6.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-C0w1mk3S.js","assets/chiffre-du-jour-pur-dc_kTVcB.js","assets/ChiffreDesPrestations-JU-XkwNo.js","assets/client-D7NliMKr.js","assets/ClotureDuTiroir-BuS7tXAZ.js","assets/ClotureDuTiroir-C6vPx-E_.css","assets/Coffre-DJiqmtRx.js","assets/components-fasv1RTe.js","assets/compte-courant-ByzulCEN.js","assets/compte-CYLdO-rS.js","assets/CompteCourant-BSV3H22x.js","assets/Comptes-CWFQKd54.js","assets/Comptoir-D2OFU0Nm.js","assets/consultation-CaFhQdpN.js","assets/consultation-CRW6QcWf.css","assets/Consultations-BFZ8ufXU.js","assets/consultNotes-B5S-M2Ww.js","assets/Conversations-D4WwB5Zo.css","assets/Conversations-fLA_ve6V.js","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-B86vItic.js","assets/currency-qfIhGmrs.js","assets/Customers-Ew-Rz5JS.js","assets/Dashboard-B8qK6Flt.css","assets/Dashboard-Bg9ZGFvh.js","assets/dates-Bvs5MJhk.js","assets/Demandes-adkgj7F5.js","assets/Depenses-Cg3yxh9e.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-v8XbPUYd.js","assets/diagnostics-au-trone-CV8psMxT.js","assets/Discussions-ZgsVoxgZ.js","assets/Encaissements-Cjumwboi.js","assets/enfants-DP_LXIu7.js","assets/Engagements-Cj5S9MhG.css","assets/Engagements-CxPF8dCi.js","assets/EntreDeuxSeances-Div8eE4F.js","assets/equipe-B_9ZHz24.css","assets/Evaluation-CW4Lorpg.js","assets/FacturePrestataire-CKOYYhJH.js","assets/Factures-DDSFBSKR.js","assets/Fil-Dt9aQMTQ.js","assets/finances-BMFnlkRx.css","assets/fon-B9SIOjJy.js","assets/fon-pur-CgVkbJ8O.js","assets/Fournisseurs-Djn5vS1e.js","assets/fournisseurs-gapclxDq.js","assets/foyer-CmiVqZsb.js","assets/gestes-conversation-CxZwSZQE.js","assets/HomeRituals-BMblvLDr.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-nMAV9ZNa.js","assets/ia-diagnostic-pur-BulIFgZQ.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-recu-pur-DcucZqpR.js","assets/identite-B7AIsJgA.js","assets/index-BJ3W3X1I.js","assets/index.es-aJ4pbP1w.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-Bd2YstAw.js","assets/jspdf.es.min-BASgBdhF.js","assets/JustePrix-D6lAswMS.js","assets/kkiapay-DJo7vQcG.js","assets/kkiapay-widget-DnUhUNd4.js","assets/Laboratoire-BzwQGSm9.js","assets/laboratoire-C2C_Lbju.js","assets/LettresAuDossier-DFFP_mfq.js","assets/LienMndPay-gay6Sf_c.js","assets/maisons-CSSFrqZy.js","assets/Marketing-BZ0LNf3U.js","assets/Marque-BBVxdyOR.js","assets/MesTaches-CbuahC04.js","assets/MesTaches-Cc4XUDf6.css","assets/momo-C2ZVfV9J.js","assets/MonMois-a_mm6cLb.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-Pyb1jAX_.js","assets/paliers-BWseGdt4.js","assets/Parametres-Bh4dmg_l.js","assets/parcours-BYCiIr2c.js","assets/Parrainages-DFg1_DsK.js","assets/Parrainages-gAHAPB_6.css","assets/pdf-BL7vo1wc.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/Personas-B0oM2gdu.js","assets/Personnel-Ca1XA6ln.js","assets/photo-Ju1kfF8G.js","assets/pilotage-D8kf1Co8.css","assets/Predictions-DiU6nRB9.js","assets/Prestataires-Dgrt94Mb.js","assets/prestataires-Dn_Gi6te.js","assets/Prets-DaokNis8.js","assets/projets-ClFxevmO.js","assets/Projets-COO7WDEE.css","assets/Projets-Dl3O8GAi.js","assets/projets-pur-2ZEMRNDU.js","assets/protocoles-PLlGst9y.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-wiIxqXtd.js","assets/qualification-C-5Xyx1V.js","assets/quiz-5qMPWZVi.js","assets/Rapport-BcDvQOuQ.js","assets/RattacherUneCarte-D0aGHJge.js","assets/Recommandations-DGEb9fjj.js","assets/regler-C5hcM02_.css","assets/regler-DV6AKGx8.js","assets/regler-la-seance-serveur-BpExlC5z.js","assets/relances-pur-DsIo28uB.js","assets/releve-des-avis-vWegfDUJ.js","assets/SalonFoyer-pQTAH0gw.js","assets/secretariat-admin-CsYgcGQm.js","assets/Secretariat-B21nNjMu.js","assets/Secretariat-Cy79Zw30.css","assets/Signatures-DMqZUDFe.js","assets/SignerUnPdf-CjaezrSH.js","assets/Synthese-Fj6mO08B.js","assets/SyntheseGraphes-DChstT8N.js","assets/systeme-C3XFIa8E.css","assets/Tableau-BUGa-kc-.js","assets/Textes-DLpOzRbT.css","assets/Textes-rqYbpZaR.js","assets/tiroirs-dSnAg_B2.js","assets/trace-du-moyen-pur-Bx8-suHn.js","assets/trone-D8FV4sC-.css","assets/trone-DiPItE0O.js","assets/ui-CQGMJT-k.js","assets/useAudiences-BmiTg5sd.js","assets/vente-C7YWXkHo.css","assets/Vitrine-BYxa_rn_.js","assets/Vitrine-Cs-c3_Mr.css","assets/_admin-pY6GQQsv.js","assets/_contrat-3yVs7XMV.js","assets/_heures-C4PRkfnr.js","assets/_reuni-9tSk2p3P.js","assets/_shared-CLSCDTiG.js","assets/_signature-BtmnTdar.js","assets/_ui-2Z5lvKAW.js","assets/_ui-BWMA-PlM.css"];
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
