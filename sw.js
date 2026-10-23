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
const BUILD = "20261023170254";
const A_GARDER = ["./","assets/Abonnements-B5ARdLK0.js","assets/abonnements-BbBtE_gK.js","assets/Academie-Drm-OgDb.js","assets/Acces-CrKf6-Ui.js","assets/actions-B1_tQdiH.js","assets/afaire-pqC-y4iO.js","assets/AFaire-THUnbBl3.js","assets/Analytics-DKebpBJu.js","assets/Appels-CQUH8l1Z.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/AtelierDesContenus-CpOjr3kj.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/Aujourdhui-C90biswK.js","assets/bilan-B-bfPYR0.css","assets/bilan-Cp-vgufi.js","assets/BilanMensuel-BgEz1O_U.js","assets/Branches-ocf5GHqM.js","assets/bridges-D-QLpgor.js","assets/caisse-du-soir-D7fZHipX.js","assets/Caisse-_W8EM7q_.js","assets/Caisses-DyIgttuG.js","assets/Calendrier-UAXC4y24.js","assets/Carnet-uNmO4QFj.js","assets/carte-COUYiJei.js","assets/carte-WI2qP1su.css","assets/CarteModal-DGJ_rFuN.js","assets/CartesCadeaux-jeo4mN0P.js","assets/Catalogue-CGN88OTO.js","assets/CentreDeCommande-BOI_ejkN.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-C4bs2wln.js","assets/certificat-BVsYNwZp.js","assets/certificat-DVSxho5e.css","assets/certificats-coffre-0bmtlmQ5.js","assets/ChiffreDesPrestations-DrL6__Iw.js","assets/ClotureDuTiroir-C6vPx-E_.css","assets/ClotureDuTiroir-CdJ1acA-.js","assets/Coffre-dOsCCk36.js","assets/components-9LKozbyK.js","assets/compte-courant-ByzulCEN.js","assets/compte-DpzEPJyv.js","assets/CompteCourant-DhkMXFoj.js","assets/Comptes-BJ6AMXZc.js","assets/Comptoir-B3UIIhe5.js","assets/consultation-BQrWqgjM.js","assets/consultation-CCTm16qX.css","assets/Consultations-BKBXxiKS.js","assets/consultNotes-BASVQdkw.js","assets/Conversations-D4WwB5Zo.css","assets/Conversations-ECg4WnuC.js","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-C6uKQkqe.js","assets/currency-qfIhGmrs.js","assets/Customers-ifud9424.js","assets/Dashboard-BAl-QcCX.js","assets/dates-CkEVJ4eD.js","assets/Demandes-DQxjqkr3.js","assets/Depenses-CaFWf9dM.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-kEK-Hn6h.js","assets/diagnostics-au-trone-CXkCHls4.js","assets/Discussions-NVv_JBWJ.js","assets/encaissement-pur-Dg4s6CzJ.js","assets/Encaissements-CFfgqlUc.js","assets/enfants-D4SvoES8.js","assets/Engagements-CDh6OW8w.js","assets/Engagements-Cj5S9MhG.css","assets/EntreDeuxSeances-BP1f9XWO.js","assets/equipe-DABhdlQT.css","assets/Evaluation-Dy4NM6yZ.js","assets/FacturePrestataire-CW8b68TK.js","assets/Factures-CIPf_3WM.js","assets/Fil-BH5x65cs.js","assets/finances-CCjqAkCE.css","assets/Fournisseurs-C6g4bV2h.js","assets/fournisseurs-DFcBgsd8.js","assets/foyer-BLxQY7le.js","assets/gestes-conversation-CIteB3La.js","assets/HomeRituals-DtxMHw6k.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-D3WEob_r.js","assets/ia-diagnostic-pur-BulIFgZQ.js","assets/ia-recu-pur-DcucZqpR.js","assets/identite-DytERrSv.js","assets/index-DBUypRK3.js","assets/index.es-JvSucN2-.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-BVtL6s_s.js","assets/jspdf.es.min-BgoWXkiE.js","assets/JustePrix-8qzeHxWe.js","assets/kkiapay-coDYxzbM.js","assets/Laboratoire-DrW6kx_A.js","assets/laboratoire-VVAxurSH.js","assets/LettresAuDossier-cm8Ttk23.js","assets/LienMndPay-DtxN9itL.js","assets/maisons-CSSFrqZy.js","assets/Marketing-DL7lwyAP.js","assets/Marque-BECddo4W.js","assets/momo-C2ZVfV9J.js","assets/MonMois-CyqEPTKT.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-DuUQovc6.js","assets/paliers-igXHA4-V.js","assets/Parametres-mvLTUR0F.js","assets/parcours-BmJFjhnH.js","assets/Parrainages-DljSQAsR.js","assets/Parrainages-gAHAPB_6.css","assets/pdf-e2T5WJ-T.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/Personas-CSJVkux6.js","assets/Personnel-B34sTuJs.js","assets/photo-CNGciJfJ.js","assets/pilotage-Bn1gP_oo.css","assets/Predictions-DAbshyXJ.js","assets/Prestataires-AoXoyQb9.js","assets/prestataires-Dl_kE9PW.js","assets/Prets-CURla9cb.js","assets/promos-CjOAbeuE.js","assets/protocoles-D1Cl6NND.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-DgqgoZxp.js","assets/qualification-BWAaMRyX.js","assets/quiz-5qMPWZVi.js","assets/Rapport-CXjNsPIx.js","assets/RattacherUneCarte-Be6jEFef.js","assets/Recommandations-Dtu9wmVc.js","assets/relances-pur-DsIo28uB.js","assets/releve-des-avis-Dg4TkWdp.js","assets/SalonFoyer-Cia5kurg.js","assets/secretariat-admin-D43Wi0ia.js","assets/Secretariat-B3_cL4tU.js","assets/Secretariat-Cy79Zw30.css","assets/Signatures-BRhIpy6e.js","assets/SignerUnPdf-ClTuv_rr.js","assets/Synthese-CYaIJKCp.js","assets/systeme-C3XFIa8E.css","assets/Tableau-CqxgNZPl.js","assets/Textes-BnWU3f0S.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-By8ftzxA.js","assets/trace-du-moyen-pur-BQm6t3bk.js","assets/trone-BY30fHn5.js","assets/trone-SckX8xKJ.css","assets/ui-CKWDfZMB.js","assets/useAudiences-L4UujyIG.js","assets/vente-DMe4r4ed.css","assets/Vitrine-BON6rcdB.css","assets/Vitrine-DJVebBDJ.js","assets/_admin-BJrKl5Cs.js","assets/_contrat-OkH0sVbV.js","assets/_heures-BbeoNLeb.js","assets/_reuni-B1dDw9UQ.js","assets/_shared-5O2SndzQ.js","assets/_signature-Dty_np-C.js","assets/_ui-B2Y5wWiL.js","assets/_ui-BWMA-PlM.css"];
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
