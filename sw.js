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
const BUILD = "20261018091446";
const A_GARDER = ["./","assets/Abonnements-CNzKVBjG.js","assets/abonnements-DcVCowdW.js","assets/Academie-oR1Nv41p.js","assets/Acces-COkp7l3w.js","assets/actions-8eJS379K.js","assets/afaire-DbzK-oC3.js","assets/AFaire-vfNH7tVN.js","assets/Analytics-DRoQEHTH.js","assets/Appels-hNfoJx_f.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/AtelierDesContenus-BLZfU7GS.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/Aujourdhui-DiVilt3V.js","assets/bilan-B-bfPYR0.css","assets/bilan-_UW6sYUM.js","assets/BilanMensuel-cKAmC_Gi.js","assets/Branches-4V8WY6xi.js","assets/bridges-B7H3k6-u.js","assets/Caisse-BlnG0Ty7.js","assets/caisse-du-soir-Djg7Zh26.js","assets/Caisses-4Q2ioxC2.js","assets/Calendrier-CjvAA1XE.js","assets/Carnet-BQ0Li6IK.js","assets/carte-BthxffSd.js","assets/carte-WI2qP1su.css","assets/CarteModal-DVy43HFK.js","assets/CartesCadeaux-S3mu7Cvf.js","assets/Catalogue-4At2TUF5.js","assets/CentreDeCommande-Co-wvKyV.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-kteJw9KW.js","assets/certificat-C9uQN7-g.js","assets/certificat-DVSxho5e.css","assets/certificats-coffre-CD4AKLeO.js","assets/ChiffreDesPrestations-G4PuZ0t3.js","assets/ClotureDuTiroir-C6vPx-E_.css","assets/ClotureDuTiroir-C_Wmv1nN.js","assets/Coffre-BRfM8K7j.js","assets/components-wMB4ccsu.js","assets/compte-courant-ByzulCEN.js","assets/compte-Dxa2zsAD.js","assets/CompteCourant-BcqVz7XA.js","assets/Comptes-BKWkpLq6.js","assets/Comptoir-C7Uk7rF1.js","assets/consultation-C69MyKXG.js","assets/consultation-CCTm16qX.css","assets/Consultations-mM9gEA5W.js","assets/consultNotes-DTMt6pEh.js","assets/Conversations-YvMn2Gom.js","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-skiIjnfX.js","assets/currency-qfIhGmrs.js","assets/Customers-B8-slnqm.js","assets/Dashboard-DTuH_YlW.js","assets/dates-Cm3YrAxh.js","assets/Demandes-WlWxmNiH.js","assets/Depenses-BHpfwhlV.js","assets/devise-fon-DX3P0bG4.woff2","assets/encaissement-pur-DCF-Oh2t.js","assets/Encaissements-v392jJ5W.js","assets/enfants-CVJzKm2i.js","assets/Engagements-Cj5S9MhG.css","assets/Engagements-DhcZuicw.js","assets/EntreDeuxSeances-D-aj7KyI.js","assets/equipe-DpPyq6h-.css","assets/Evaluation-C_mkLUCf.js","assets/FacturePrestataire-DFP1SKmg.js","assets/Factures-Cu_QWFZA.js","assets/Fil-wpvmGGk5.js","assets/finances-CCjqAkCE.css","assets/Fournisseurs-CBuvRv5Q.js","assets/fournisseurs-KF8Y_mds.js","assets/foyer-B2P5MuAb.js","assets/HomeRituals-D2oxAeUM.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-DpPlOpkY.js","assets/identite-BpRAZP5p.js","assets/index-BP1gpdw3.js","assets/index.es-DtAfQOok.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-C-rHqVqQ.js","assets/jspdf.es.min-C_KngOJK.js","assets/JustePrix-DMvEBJQk.js","assets/kkiapay-BQKvdBa2.js","assets/Laboratoire-BEWB1PSK.js","assets/laboratoire-CGiYh_sr.js","assets/LettresAuDossier-SkNLp7Bi.js","assets/maisons-CSSFrqZy.js","assets/Marketing-Dik-ZB9r.js","assets/Marque-CZcm45Jl.js","assets/momo-C2ZVfV9J.js","assets/MonMois-C_6D0k-p.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-BfoYUwKt.js","assets/paliers-CrxQiW3Q.js","assets/Parametres-CGdZ6mug.js","assets/parcours-BELfeAJV.js","assets/Parrainages-C159Kcez.js","assets/Parrainages-gAHAPB_6.css","assets/pdf-C4x7BYVr.js","assets/pdf-de-la-piece-BCZQjgBu.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/Personas-b_q5iwnD.js","assets/Personnel-D_X0HmfG.js","assets/photo-e2YBhO6M.js","assets/pilotage-Bn1gP_oo.css","assets/Predictions-MUVLWi-1.js","assets/Prestataires-CFokkDT1.js","assets/prestataires-si_L0gIn.js","assets/Prets-CJ9dYVRb.js","assets/promos-CLj-5-0m.js","assets/protocoles-OX5ovhgp.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-CG1gFRjb.js","assets/quiz-5qMPWZVi.js","assets/Rapport-CuEjhPSz.js","assets/RattacherUneCarte-BclBAt3D.js","assets/Recommandations-BMdsmXqF.js","assets/SalonFoyer-R7bks0tc.js","assets/secretariat-admin-Bh3hgmyq.js","assets/Secretariat-BCKV4DzL.js","assets/Signatures-CQY7qy4b.js","assets/SignerUnPdf-DvxofHea.js","assets/Synthese-AFDeWe7_.js","assets/systeme-C3XFIa8E.css","assets/Tableau-NHFnk-zR.js","assets/Textes-Dg7xA5FZ.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-BHUByhNv.js","assets/trone-BJVm7crM.js","assets/trone-CyFdPxg0.css","assets/ui-DnC34fvV.js","assets/vente-DMe4r4ed.css","assets/Vitrine-CIeCc_YW.js","assets/_admin-BgfeouQV.js","assets/_contrat-H2WmWo_R.js","assets/_heures-cf619Ycf.js","assets/_reuni-Bc9FqeKV.js","assets/_shared-DntxcFHJ.js","assets/_signature-DcRLCo0K.js","assets/_ui-BWMA-PlM.css","assets/_ui-W42CsKap.js"];
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
