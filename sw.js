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
const BUILD = "20261018142246";
const A_GARDER = ["./","assets/Abonnements-CV5lv1YW.js","assets/abonnements-m-Qck8i0.js","assets/Academie-DbK76T2B.js","assets/Acces-ClqO0N8n.js","assets/actions-ljzK5yEd.js","assets/afaire-Bnh07Wp0.js","assets/AFaire-CWmKxZmb.js","assets/Analytics-BxJdjj0Y.js","assets/Appels-BiMwpRis.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/AtelierDesContenus-Br9RJ1AC.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/Aujourdhui-dijYQsP7.js","assets/bilan-B-bfPYR0.css","assets/bilan-DGne1HjV.js","assets/BilanMensuel-BIVIPGQR.js","assets/Branches-CzBv5Eak.js","assets/bridges-DSkmSgd7.js","assets/Caisse-Cyk24nnA.js","assets/caisse-du-soir-CQNJiBAe.js","assets/Caisses-28LE_MiT.js","assets/Calendrier-xVtRQr4I.js","assets/Carnet-BrxgE0VO.js","assets/carte-3LptjhaO.js","assets/carte-WI2qP1su.css","assets/CarteModal-DtZsZuDm.js","assets/CartesCadeaux-CcdEQ1Z7.js","assets/Catalogue-DJcb2X8Z.js","assets/CentreDeCommande-Cb1_MyH0.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-C_ZjbB_p.js","assets/certificat-DOkz4OZF.js","assets/certificat-DVSxho5e.css","assets/certificats-coffre-aHydzS5Z.js","assets/ChiffreDesPrestations-B4Y6nKHA.js","assets/ClotureDuTiroir-C6vPx-E_.css","assets/ClotureDuTiroir-CjMe_rkZ.js","assets/Coffre-t5P7yjOn.js","assets/components-B2AFTzWN.js","assets/compte-C5C6ZulQ.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-D94e867u.js","assets/Comptes-B6PfJmRw.js","assets/Comptoir-DEhv3w0K.js","assets/consultation-CCTm16qX.css","assets/consultation-DQeH_4_a.js","assets/Consultations-BBES-77T.js","assets/consultNotes-CLtmLFVn.js","assets/Conversations-C8G3o3yB.js","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-p6ejxfd8.js","assets/currency-qfIhGmrs.js","assets/Customers-DoxYDZP5.js","assets/Dashboard-B95cQZGH.js","assets/dates-DOKjVBwT.js","assets/Demandes-A_59aDat.js","assets/Depenses-mURlK_zl.js","assets/devise-fon-DX3P0bG4.woff2","assets/encaissement-pur-DYUHIFhJ.js","assets/Encaissements-BI1l2dHu.js","assets/enfants-BGhx7-Nl.js","assets/Engagements-BiNUlMNt.js","assets/Engagements-Cj5S9MhG.css","assets/EntreDeuxSeances-D-YZBuAG.js","assets/equipe-DpPyq6h-.css","assets/Evaluation-7BhsdGiL.js","assets/FacturePrestataire-D8rLN2qC.js","assets/Factures-44cyqw7g.js","assets/Fil-thVXNVkl.js","assets/finances-CCjqAkCE.css","assets/Fournisseurs-BEcQn-gx.js","assets/fournisseurs-DUrdAffE.js","assets/foyer-BeY69yGj.js","assets/gestes-conversation-DzyYQALX.js","assets/HomeRituals-Dq58cik8.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-BEmuPhn_.js","assets/identite-mPhjZY9P.js","assets/index-C4qJRWWR.js","assets/index.es-klOqr8tU.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-bw_mP7o3.js","assets/jspdf.es.min-CeZJKTtf.js","assets/JustePrix-CrQ7Toza.js","assets/kkiapay-C6WHw51J.js","assets/laboratoire-BiSBE-PO.js","assets/Laboratoire-Cmy015Su.js","assets/LettresAuDossier-DWQq2wzg.js","assets/maisons-CSSFrqZy.js","assets/Marketing-OJUyJhFv.js","assets/Marque-Chaimk2a.js","assets/momo-C2ZVfV9J.js","assets/MonMois-yZjNpxzX.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-DJGkmaRR.js","assets/paliers-DyatDsTE.js","assets/Parametres-D6FoY1xC.js","assets/parcours-DzVpp6Iq.js","assets/Parrainages-gAHAPB_6.css","assets/Parrainages-OoJIY4lt.js","assets/pdf-de-la-piece-D5ZbJGCn.js","assets/pdf-Dy1YVI_s.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/Personas-DDc_Wxpc.js","assets/Personnel-DpDXqodP.js","assets/photo-DzvCrvSO.js","assets/pilotage-Bn1gP_oo.css","assets/Predictions-CI490L9y.js","assets/Prestataires-BnX3UjhM.js","assets/prestataires-CAe0fC7e.js","assets/Prets-mxJPditD.js","assets/promos-TJH_35sY.js","assets/protocoles-DiTIHhpG.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-CvTLBIdv.js","assets/quiz-5qMPWZVi.js","assets/Rapport-5BJiqxSU.js","assets/RattacherUneCarte-v3fjk9A1.js","assets/Recommandations-BiHkjHhB.js","assets/relances-pur-DHxkbBX5.js","assets/SalonFoyer-CdhoqzZ3.js","assets/secretariat-admin-BS6Egr7i.js","assets/Secretariat-BWBFeYk6.js","assets/Signatures-B7qKagtY.js","assets/SignerUnPdf-C31GRiRj.js","assets/Synthese-p_uGdWc0.js","assets/systeme-C3XFIa8E.css","assets/Tableau-4Qro24Qu.js","assets/Textes-DLpOzRbT.css","assets/Textes-DSLiOKO_.js","assets/tiroirs-D9HiX5B7.js","assets/trone-BfZMzllj.js","assets/trone-CyFdPxg0.css","assets/ui-B331XmGu.js","assets/vente-DMe4r4ed.css","assets/Vitrine-B6hQRILN.js","assets/_admin-qHHgJGc4.js","assets/_contrat-CeelFm4j.js","assets/_heures-DIXi6Fy8.js","assets/_reuni-DKoKMuoX.js","assets/_shared-ldLlPL61.js","assets/_signature-BCfH310N.js","assets/_ui-BWMA-PlM.css","assets/_ui-CwiS25FN.js"];
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
