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
const BUILD = "20261020154401";
const A_GARDER = ["./","assets/Abonnements-big88-_w.js","assets/abonnements-CfnvRJZ-.js","assets/Academie-D_ZWOPbQ.js","assets/Acces-DyIbV2W-.js","assets/actions-BTInyJXg.js","assets/afaire-BneuVUXm.js","assets/AFaire-D_pGcZ66.js","assets/Analytics-BPGa9yLZ.js","assets/Appels-DHdp1cO5.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/AtelierDesContenus-Bi8MP_1E.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/Aujourdhui-CFDHNzvV.js","assets/bilan-B-bfPYR0.css","assets/bilan-DFT46z97.js","assets/BilanMensuel-DYw9nxJn.js","assets/Branches-B-6VJXuf.js","assets/bridges-lnqJ33mY.js","assets/Caisse-Ca3Q8uMC.js","assets/caisse-du-soir-CI3f-CYQ.js","assets/Caisses-C0Kryifm.js","assets/Calendrier-DILTUMxY.js","assets/Carnet-Bd9kxQMl.js","assets/carte-aCz0tVHC.js","assets/carte-WI2qP1su.css","assets/CarteModal-C9rHWpwo.js","assets/CartesCadeaux-viWsuGgy.js","assets/Catalogue-qkm34gUz.js","assets/CentreDeCommande-D3Lw_cSg.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-DKcqrBQ0.js","assets/certificat-CCGqRBE7.js","assets/certificat-DVSxho5e.css","assets/certificats-coffre-DUpn-JLi.js","assets/ChiffreDesPrestations-oucSRfaQ.js","assets/ClotureDuTiroir-C6vPx-E_.css","assets/ClotureDuTiroir-tWAH8RDV.js","assets/Coffre-CGnQRB0d.js","assets/components-C11GH2IT.js","assets/compte-BGQkTiBx.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-BWf3TTfk.js","assets/Comptes-BmWuHpFT.js","assets/Comptoir-CRZrVvVY.js","assets/consultation-BVjFdDZ_.js","assets/consultation-CCTm16qX.css","assets/Consultations-C0i-wEAJ.js","assets/consultNotes-B491PN5M.js","assets/Conversations-D4WwB5Zo.css","assets/Conversations-koEScgMt.js","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-DkhJR0vN.js","assets/currency-qfIhGmrs.js","assets/Customers-2Aghf3Rw.js","assets/Dashboard-BRa6a9PZ.js","assets/dates-BJaGRCwW.js","assets/Demandes-Cw5R8VBl.js","assets/Depenses-BlvDcTZG.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-ifKUuYPE.js","assets/diagnostics-au-trone-XrNSGFRv.js","assets/Discussions-CEIJwraE.js","assets/encaissement-pur-CW6BinI7.js","assets/Encaissements-CSCx-Nrh.js","assets/enfants-BDKH-_mh.js","assets/Engagements-CILrTzOf.js","assets/Engagements-Cj5S9MhG.css","assets/EntreDeuxSeances-BXOa2tSZ.js","assets/equipe-3X2ge3MG.css","assets/Evaluation-CLvm9Ajv.js","assets/FacturePrestataire-b3GNOKTI.js","assets/Factures-SSnSwDP9.js","assets/Fil-Dg663gIm.js","assets/finances-CCjqAkCE.css","assets/Fournisseurs-DnPG0jea.js","assets/fournisseurs-uXCR5c1X.js","assets/foyer-2GlLmS_v.js","assets/gestes-conversation-BoKyhvB3.js","assets/HomeRituals-Bgv8-uct.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-CRVHgR4v.js","assets/ia-diagnostic-pur-BulIFgZQ.js","assets/ia-recu-pur-DcucZqpR.js","assets/identite-DsloiNH9.js","assets/index-v9g_QEK4.js","assets/index.es-Lbyr6jY-.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-j_lOaoNL.js","assets/jspdf.es.min-CsGXz0Lj.js","assets/JustePrix-B_1LNGYh.js","assets/kkiapay-D6yX7O9s.js","assets/laboratoire-B1k4dYdL.js","assets/Laboratoire-BACDAD2w.js","assets/LettresAuDossier-q_5jgDf1.js","assets/LienMndPay-CX52OvjS.js","assets/maisons-CSSFrqZy.js","assets/Marketing-DGAuOFGD.js","assets/Marque-CzEftLCV.js","assets/momo-C2ZVfV9J.js","assets/MonMois-DOXznB3l.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-Nv45LBFj.js","assets/paliers-BEX5UMjy.js","assets/Parametres-C9AdJbOZ.js","assets/parcours-XGNbFrmq.js","assets/Parrainages-gAHAPB_6.css","assets/Parrainages-wz36Y2rI.js","assets/pdf-D7Rp9Lte.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/Personas-B1FmOF_u.js","assets/Personnel-DkGOZZjy.js","assets/photo-CN2jgMwQ.js","assets/pilotage-Bn1gP_oo.css","assets/Predictions-C1LRKdU0.js","assets/prestataires-Bv1vRB0R.js","assets/Prestataires-D7zJq7sm.js","assets/Prets-c0RylXt2.js","assets/promos-D6NdiXGp.js","assets/protocoles-C4PQomHC.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-BIxF0gE8.js","assets/qualification-BYN4BfDg.js","assets/quiz-5qMPWZVi.js","assets/Rapport-BlP9lP8A.js","assets/RattacherUneCarte-_n7wWHMY.js","assets/Recommandations-DZNrg1z5.js","assets/relances-pur-DsIo28uB.js","assets/releve-des-avis-DZjaytgK.js","assets/SalonFoyer-DT9ApRmI.js","assets/secretariat-admin-XcFgEki0.js","assets/Secretariat-Cy79Zw30.css","assets/Secretariat-DjwtAb8I.js","assets/Signatures-Bg57CfES.js","assets/SignerUnPdf-WcrUwCOV.js","assets/Synthese-1cQdGvSV.js","assets/systeme-C3XFIa8E.css","assets/Tableau-dhRcgiIO.js","assets/Textes-D1LygUf9.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-DHd_x7lt.js","assets/tri-des-caisses-pur-BiIGYJae.js","assets/trone-DHwNyQzg.js","assets/trone-wvMgyufp.css","assets/ui-B0_hFCpk.js","assets/vente-DMe4r4ed.css","assets/Vitrine-CRqZUnEh.css","assets/Vitrine-Cv56noXx.js","assets/_admin-CLJ1dLAh.js","assets/_contrat-D1Jh-x5l.js","assets/_heures-BHuvQ2gQ.js","assets/_reuni-CF9NV6dM.js","assets/_shared-CHsXGyRz.js","assets/_signature-4xy1dwwb.js","assets/_ui-BHPX-cxO.js","assets/_ui-BWMA-PlM.css"];
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
