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
const BUILD = "20261017080639";
const A_GARDER = ["./","assets/Abonnements-BsqGWb0q.js","assets/abonnements-CXqVxIcn.js","assets/Academie-v7qjyliC.js","assets/Acces-ExCChgFV.js","assets/actions-uDnIRbiq.js","assets/afaire-BM9hpn1I.js","assets/AFaire-DaduXlKC.js","assets/Analytics-JL3ywwie.js","assets/Appels-CKNG6oBn.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/AtelierDesContenus-Dji0Nvkl.js","assets/Aujourdhui-Bt02WYa9.js","assets/bilan-B-bfPYR0.css","assets/bilan-DT3ZMo-9.js","assets/BilanMensuel-CKAGYlsx.js","assets/Branches-BcWHT6MD.js","assets/bridges-BaZYmguv.js","assets/Caisse-CBckRvO_.js","assets/caisse-du-soir-CZsLRgl6.js","assets/Caisses-C1vLUUpJ.js","assets/caisses-des-caissiers-pur-CHJywH98.js","assets/Calendrier-D-fLBQQ2.js","assets/Carnet-Bh6pgNdp.js","assets/carte-DoTLTwb-.js","assets/carte-WI2qP1su.css","assets/CarteModal-BBKUFCjF.js","assets/CartesCadeaux-CIDD52LC.js","assets/Catalogue-BnzxnE5K.js","assets/CentreDeCommande-D1OmXHQN.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-BFIwHa6R.js","assets/certificat-7N9rvSNZ.js","assets/certificat-DVSxho5e.css","assets/certificats-coffre-TU7k72nL.js","assets/ChiffreDesPrestations-St5m8eoe.js","assets/ClotureDuTiroir-Bz_NdMRU.js","assets/ClotureDuTiroir-C6vPx-E_.css","assets/Coffre-CqHqm6Ee.js","assets/components-Cd0ZxN-s.js","assets/compte-courant-ByzulCEN.js","assets/compte-DDtZsv9P.js","assets/CompteCourant-BWNV79eW.js","assets/Comptes-DjA67oTj.js","assets/Comptoir-NOALvNqY.js","assets/consultation-BWVHGb2D.js","assets/consultation-CCTm16qX.css","assets/Consultations-C1DRLJay.js","assets/consultNotes-I4qxb09C.js","assets/Conversations-C-G_uNev.js","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-BRgU-U9e.js","assets/currency-qfIhGmrs.js","assets/Customers-YcORbwMo.js","assets/Dashboard-BJZo4_nm.js","assets/dates-9UrWYAfJ.js","assets/Demandes-BJyKTXCt.js","assets/Depenses-5BCMMklW.js","assets/devise-fon-DX3P0bG4.woff2","assets/encaissement-pur-B8SM710F.js","assets/Encaissements-TomwoFB9.js","assets/enfants-6EdJiLPZ.js","assets/Engagements-Cj5S9MhG.css","assets/Engagements-DJ_cxiMi.js","assets/EntreDeuxSeances-BZ2j3yND.js","assets/equipe-DpPyq6h-.css","assets/Evaluation-B485QcHw.js","assets/FacturePrestataire-BYhnGCm4.js","assets/Factures-Eb5BU6k4.js","assets/Fil-CHfJ8Yvt.js","assets/finances-CCjqAkCE.css","assets/Fournisseurs-CmqWfAsd.js","assets/fournisseurs-CTgXZQaR.js","assets/foyer-CetBvm3k.js","assets/HomeRituals-CfahHfO-.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-uFf6bR-d.js","assets/identite-DyMGG7Od.js","assets/index-jslgizMT.js","assets/index.es-O1SM4ccJ.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-DDqEp_hk.js","assets/jspdf.es.min-BKibTs6O.js","assets/JustePrix-x8tOq0gQ.js","assets/kkiapay-BFZxMeEf.js","assets/Laboratoire-BEgxzEuD.js","assets/laboratoire-BP5HMxRU.js","assets/LettresAuDossier-CK2cfyKL.js","assets/maisons-CSSFrqZy.js","assets/Marketing-BIR1ftIA.js","assets/Marque-C7qEkGo7.js","assets/momo-C2ZVfV9J.js","assets/MonMois-Db_AEFax.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-B8gY8s2X.js","assets/paliers-BubQFwE6.js","assets/Parametres-DF-rZfxi.js","assets/parcours-t8iMDBfb.js","assets/Parrainages-B2gOBGvf.js","assets/Parrainages-gAHAPB_6.css","assets/pdf-VJcNm7C7.js","assets/pdf-W_SsGTKs.js","assets/pdf.worker.min-uNib_u9P.js","assets/Personas-DyuQBGbm.js","assets/Personnel-CpVmpUdI.js","assets/photo-DYFI8uXO.js","assets/pilotage-Bn1gP_oo.css","assets/Predictions-BnXT45VE.js","assets/prestataires-CRQSBKBi.js","assets/Prestataires-D57mKHpP.js","assets/Prets-P_RDCJi_.js","assets/promos-nPQfdTlA.js","assets/protocoles-DVxuegbJ.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-DQoGTXuW.js","assets/quiz-5qMPWZVi.js","assets/Rapport-y-3hv2p_.js","assets/RattacherUneCarte-zwKrewZ9.js","assets/Recommandations-CRieOqUb.js","assets/SalonFoyer-hGd1wki4.js","assets/secretariat-admin-BZHJpDWF.js","assets/Secretariat-C4WwGZdQ.js","assets/Signatures-Ds5L19XI.js","assets/SignerUnPdf-CaqjEJJl.js","assets/Synthese-_0w5rNsh.js","assets/systeme-C3XFIa8E.css","assets/Tableau-B2jjCN3D.js","assets/Textes-BP-ExK0F.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-Cg9mQNIp.js","assets/trone-BlsJtA3j.js","assets/trone-CyFdPxg0.css","assets/ui-BiskiacU.js","assets/vente-DMe4r4ed.css","assets/Vitrine-BGJVNQS5.js","assets/_admin-i69eJcCi.js","assets/_contrat-BUio3Tlk.js","assets/_heures-GleZvj8j.js","assets/_reuni-JfEGOemY.js","assets/_shared-CefdXaDE.js","assets/_signature-CzF7vmXE.js","assets/_ui-BWMA-PlM.css","assets/_ui-DKgoGg-L.js"];
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
