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
const BUILD = "20261023221036";
const A_GARDER = ["./","assets/abonnements-BDaTdxDS.js","assets/Abonnements-YYYmTrOS.js","assets/Academie-DhTmj8kB.js","assets/Acces-DcdcFsAU.js","assets/actions-AwjNPgEx.js","assets/AFaire-BGXXz-Ml.js","assets/afaire-Bp7XRnNF.js","assets/Analytics-B9cL0TVI.js","assets/Appels-oEfODoy3.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/AtelierDesContenus-CSmBJWMc.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/Aujourdhui-fe672VmR.js","assets/bilan-B-bfPYR0.css","assets/bilan-DsLu2M9K.js","assets/BilanMensuel-D_ZUrc-z.js","assets/Branches-CreuyAtK.js","assets/bridges-CE_6ab5k.js","assets/caisse-du-soir-muhXg-j8.js","assets/Caisse-q09DMGwu.js","assets/Caisses-CjDFmj0z.js","assets/Calendrier-DzEl0qXE.js","assets/Carnet-ARhOu2H-.js","assets/carte-Czn5T8ve.js","assets/carte-WI2qP1su.css","assets/CarteModal-DaAydUJo.js","assets/CartesCadeaux-3FtlJbY4.js","assets/Catalogue-CbZI6Xpn.js","assets/CentreDeCommande-CQIeahlz.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-BnDPF2JG.js","assets/certificat-Ck9uXUJk.js","assets/certificat-DVSxho5e.css","assets/certificats-coffre-949AwL4t.js","assets/ChiffreDesPrestations-jLCbMPWn.js","assets/ClotureDuTiroir-C-lxErMk.js","assets/ClotureDuTiroir-C6vPx-E_.css","assets/Coffre-DoEQ9ai8.js","assets/components-DXVI_pvL.js","assets/compte-courant-ByzulCEN.js","assets/compte-C_wDjyGJ.js","assets/CompteCourant-DHn2FqDh.js","assets/Comptes-DmYHiwSB.js","assets/Comptoir-BFoe7sMm.js","assets/consultation-CCTm16qX.css","assets/consultation-CrteeX_F.js","assets/Consultations-CUObDKJ-.js","assets/consultNotes-ONJ76Fdb.js","assets/Conversations-BIvlA2Ig.js","assets/Conversations-D4WwB5Zo.css","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-C8eRfcAg.js","assets/currency-qfIhGmrs.js","assets/Customers-DE7s7mW3.js","assets/Dashboard-DyL-WgFM.js","assets/dates-BkLk8l2P.js","assets/Demandes-DtGEgYvV.js","assets/Depenses-D6mchQST.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-CsmqpaDx.js","assets/diagnostics-au-trone-BhnrDxZX.js","assets/Discussions-sL98GAB0.js","assets/Encaissements-DXWlsex0.js","assets/enfants-DIFimNLt.js","assets/Engagements-Bzyo-Wm5.js","assets/Engagements-Cj5S9MhG.css","assets/EntreDeuxSeances-BF7ZP0aJ.js","assets/equipe-DABhdlQT.css","assets/Evaluation-BxVX6uEl.js","assets/FacturePrestataire-CUxr9d2e.js","assets/Factures-BaaOCwq6.js","assets/Fil-CGBCiUIK.js","assets/finances-CCjqAkCE.css","assets/Fournisseurs-BlyfpI3Q.js","assets/fournisseurs-lAAZ9abk.js","assets/foyer-CknXUktN.js","assets/gestes-conversation-BDgxs2KV.js","assets/HomeRituals-DX_GwZau.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-Cr-xac-s.js","assets/ia-diagnostic-pur-BulIFgZQ.js","assets/ia-recu-pur-DcucZqpR.js","assets/identite-BKr5Mo1c.js","assets/index-Bjx9anmD.js","assets/index.es-svCNsBTT.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-DR2eie5O.js","assets/jspdf.es.min-D88DW45-.js","assets/JustePrix-BNtSWrzG.js","assets/kkiapay-OS7u7vEz.js","assets/laboratoire-BCf7-6P3.js","assets/Laboratoire-CPmhI-6Q.js","assets/LettresAuDossier-DsU3kPd9.js","assets/LienMndPay-DXnneH4I.js","assets/maisons-CSSFrqZy.js","assets/Marketing-D5LlNu53.js","assets/Marque-DrYq8bEJ.js","assets/momo-C2ZVfV9J.js","assets/MonMois-BOKxUJ8e.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-DpSwcijp.js","assets/paliers-B3bcRTB9.js","assets/Parametres-KujUHg9c.js","assets/parcours-Cqxb8S1v.js","assets/Parrainages-CGWFw-2M.js","assets/Parrainages-gAHAPB_6.css","assets/pdf-DZ_G0NHx.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/Personas-CL5bTM7s.js","assets/Personnel-BFqWzR6X.js","assets/photo-D3-IXSpR.js","assets/pilotage-Bn1gP_oo.css","assets/Predictions-Bjl71Och.js","assets/prestataires-BgtPl54J.js","assets/Prestataires-emZBMREe.js","assets/Prets-BRawAOl-.js","assets/protocoles-Bss48twE.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-BpnqNJBv.js","assets/qualification-9lP73qaF.js","assets/quiz-5qMPWZVi.js","assets/Rapport-ClRCDfGI.js","assets/RattacherUneCarte-AfPZ0X18.js","assets/Recommandations-B_Qnhe1E.js","assets/relances-pur-DsIo28uB.js","assets/releve-des-avis-BZwT6M75.js","assets/SalonFoyer-C-EbIo2Z.js","assets/secretariat-admin-D-j3ii8G.js","assets/Secretariat-BDeBoAEW.js","assets/Secretariat-Cy79Zw30.css","assets/Signatures-B8dkscUW.js","assets/SignerUnPdf-BisY3N2h.js","assets/Synthese-3N_FRTYY.js","assets/systeme-C3XFIa8E.css","assets/Tableau-CC1zMNwT.js","assets/Textes-1rgqKN7u.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-BQvX80Nd.js","assets/trace-du-moyen-pur-BQm6t3bk.js","assets/trone-Cfsd-52-.js","assets/trone-SckX8xKJ.css","assets/ui-Cu1nJqIT.js","assets/useAudiences-DTOg-EwF.js","assets/vente-DMe4r4ed.css","assets/Vitrine-BON6rcdB.css","assets/Vitrine-BvGLE8sl.js","assets/_admin-5AzaiiMM.js","assets/_contrat-BsHhYZ2q.js","assets/_heures-D7zRCYg8.js","assets/_reuni-D99lYk68.js","assets/_shared-BRv5Pk4n.js","assets/_signature-CwbjxJ18.js","assets/_ui-BWMA-PlM.css","assets/_ui-DXPWR9Ta.js"];
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
