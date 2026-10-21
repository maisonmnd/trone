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
const BUILD = "20261021225314";
const A_GARDER = ["./","assets/abonnements-Bjqne8TD.js","assets/Abonnements-COrJGT7Q.js","assets/Academie-D56G-7oP.js","assets/Acces-BBDrgB-u.js","assets/actions-CqFBWkqg.js","assets/afaire-BPwjVXCz.js","assets/AFaire-DC8x5XR_.js","assets/Analytics-BfGCwT2L.js","assets/Appels-CWkXub2M.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/AtelierDesContenus-te2xqDrn.js","assets/Aujourdhui-DzxG0uD5.js","assets/bilan-B-bfPYR0.css","assets/bilan-Vu33dU38.js","assets/BilanMensuel-BxpxVLIQ.js","assets/Branches-7gC0TlVi.js","assets/bridges-Cv4LL3eO.js","assets/Caisse-DHfurkYF.js","assets/caisse-du-soir-D1qRIX8H.js","assets/Caisses-Zue2vHkb.js","assets/Calendrier-xT2qV7Dy.js","assets/Carnet-DOkll0qE.js","assets/carte-Czd5os6C.js","assets/carte-WI2qP1su.css","assets/CarteModal-Ckxx003I.js","assets/CartesCadeaux-DGFX6gFW.js","assets/Catalogue-pnsP2Neb.js","assets/CentreDeCommande-BVJLeSWw.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-D13kTedf.js","assets/certificat-CGsl3E6g.js","assets/certificat-DVSxho5e.css","assets/certificats-coffre-Du_7i9P5.js","assets/ChiffreDesPrestations-ZUayIO54.js","assets/ClotureDuTiroir-C3WqaJR6.js","assets/ClotureDuTiroir-C6vPx-E_.css","assets/Coffre-DyfMbQLn.js","assets/components-DAX3rI9R.js","assets/compte-ACaS70DL.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-c7qtY-Ph.js","assets/Comptes-DnQUfz28.js","assets/Comptoir-a9q6TerX.js","assets/consultation-CCTm16qX.css","assets/consultation-DGpG2dwQ.js","assets/Consultations-CCG8uKTg.js","assets/consultNotes-DyGKo9DY.js","assets/Conversations-D4WwB5Zo.css","assets/Conversations-DZXzxiTk.js","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-Bu1sObPl.js","assets/currency-qfIhGmrs.js","assets/Customers-D4ymU_PD.js","assets/Dashboard-C3QQmKDG.js","assets/dates-BOcl-xf0.js","assets/Demandes-BfBHVtU0.js","assets/Depenses-CgUyJKWs.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-7AAC8UoG.js","assets/diagnostics-au-trone-CUzyWG37.js","assets/Discussions-BPToVwvA.js","assets/encaissement-pur-B2X7zGKm.js","assets/Encaissements-C20DR5iQ.js","assets/enfants-D4Mh6bpA.js","assets/Engagements-AYKMSaUK.js","assets/Engagements-Cj5S9MhG.css","assets/EntreDeuxSeances-BeK_w4Lv.js","assets/equipe-DABhdlQT.css","assets/Evaluation-B-mKsbvu.js","assets/FacturePrestataire-hsj8Ekz2.js","assets/Factures-Bu6SKkyr.js","assets/Fil-BpWiM8my.js","assets/finances-CCjqAkCE.css","assets/Fournisseurs-ya2Lkwkz.js","assets/fournisseurs-ZuwMF4EM.js","assets/foyer-CL5a0xsN.js","assets/gestes-conversation-DSHIO4jX.js","assets/HomeRituals-B1RLrdf2.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-PZS42Oeh.js","assets/ia-diagnostic-pur-BulIFgZQ.js","assets/ia-recu-pur-DcucZqpR.js","assets/identite-CxRqpT3_.js","assets/index-BGoX7aNU.js","assets/index.es-D87qqqyg.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-CQI1A4Hd.js","assets/jspdf.es.min-B5QCrjNe.js","assets/JustePrix-Ag_ar4ti.js","assets/kkiapay-CU_b7ls6.js","assets/laboratoire-5VMrqr8X.js","assets/Laboratoire-gvjHBCrC.js","assets/LettresAuDossier-CoaCdgPh.js","assets/LienMndPay-BaQNucRW.js","assets/maisons-CSSFrqZy.js","assets/Marketing-TRwk15if.js","assets/Marque-DjLDnXC5.js","assets/momo-C2ZVfV9J.js","assets/MonMois-XgK35z3i.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-NDNUtWLr.js","assets/paliers-DTjtFTNY.js","assets/Parametres-CCo_xaO4.js","assets/parcours-BbUeQPFy.js","assets/Parrainages-DPB81Ubm.js","assets/Parrainages-gAHAPB_6.css","assets/pdf-C4O8RNtd.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/Personas-IPJJwsQa.js","assets/Personnel-CWbOKrxj.js","assets/photo-CmoJco7f.js","assets/pilotage-Bn1gP_oo.css","assets/Predictions-CHMAu2my.js","assets/Prestataires-BWYbqH4Z.js","assets/prestataires-Dz80HSng.js","assets/Prets-D7X9unmD.js","assets/promos-CcuOUYCB.js","assets/protocoles-Dn5J15qf.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-DdZ9cFK0.js","assets/qualification-Bo1Tb3Xj.js","assets/quiz-5qMPWZVi.js","assets/Rapport-D5mbx-Di.js","assets/RattacherUneCarte-DLUEersS.js","assets/Recommandations-qDCO0jyR.js","assets/relances-pur-DsIo28uB.js","assets/releve-des-avis-zuqeDXBO.js","assets/SalonFoyer-CKhgZk4t.js","assets/secretariat-admin-MrEDxLRS.js","assets/Secretariat-BfGSs-pU.js","assets/Secretariat-Cy79Zw30.css","assets/Signatures-ZFOwuIkB.js","assets/SignerUnPdf-Bnf9619O.js","assets/Synthese-lzYPRhwJ.js","assets/systeme-C3XFIa8E.css","assets/Tableau-Iez70kdT.js","assets/Textes-BvQjF9Eo.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-D2cGWgYO.js","assets/trace-du-moyen-pur-BQm6t3bk.js","assets/trone-Dm3Yj9YC.js","assets/trone-SckX8xKJ.css","assets/ui-AYMrSoi-.js","assets/useAudiences-B7a_JY8r.js","assets/vente-DMe4r4ed.css","assets/Vitrine-CRqZUnEh.css","assets/Vitrine-DVMrdEZI.js","assets/_admin-D46HJLTc.js","assets/_contrat-TX_AT9Jo.js","assets/_heures-CCT9QZQ1.js","assets/_reuni-Dtd0WizH.js","assets/_shared-CeHYGQKE.js","assets/_signature-CR8thFRr.js","assets/_ui-BWMA-PlM.css","assets/_ui-iVbr-cUN.js"];
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
