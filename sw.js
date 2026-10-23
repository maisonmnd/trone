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
const BUILD = "20261023184703";
const A_GARDER = ["./","assets/abonnements-D-9MC2Nb.js","assets/Abonnements-DUsNqKx7.js","assets/Academie-BWYNXwpp.js","assets/Acces-MhxW-Hrz.js","assets/actions-D5U-8eVl.js","assets/afaire-D_nhsipi.js","assets/AFaire-pHPzNtso.js","assets/Analytics-vbrvZzsI.js","assets/Appels-BrVDFMQu.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/AtelierDesContenus-Ucq7_XZ9.js","assets/Aujourdhui-CRcm3FSp.js","assets/bilan-B-bfPYR0.css","assets/bilan-DUjRv4bC.js","assets/BilanMensuel-2aYlD11j.js","assets/Branches-0oTXqaVG.js","assets/bridges-ePjAD2fM.js","assets/Caisse-D7_U8q12.js","assets/caisse-du-soir-lBoFEzWt.js","assets/Caisses-CTqQQSfH.js","assets/Calendrier-D0f6R-wz.js","assets/Carnet-Dyi3wahY.js","assets/carte-tCD_EZZO.js","assets/carte-WI2qP1su.css","assets/CarteModal-rIC1_ZrV.js","assets/CartesCadeaux-BlWUrP4K.js","assets/Catalogue-EJJKp5LA.js","assets/CentreDeCommande-DIVzKOri.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-Cl2X2Pv6.js","assets/certificat-DLV73zxV.js","assets/certificat-DVSxho5e.css","assets/certificats-coffre-DIeTb1Ct.js","assets/ChiffreDesPrestations-CUHQ31EX.js","assets/ClotureDuTiroir-C6vPx-E_.css","assets/ClotureDuTiroir-CiIou7EI.js","assets/Coffre-BtdRp2qF.js","assets/components-D_bnGv8d.js","assets/compte-BfEkySgk.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-DrMFbfsY.js","assets/Comptes-DHWiCpoZ.js","assets/Comptoir-C3u56mmt.js","assets/consultation-CCTm16qX.css","assets/consultation-DNWxZZtQ.js","assets/Consultations-Cnr3FIaK.js","assets/consultNotes-DDr_SvaI.js","assets/Conversations-BZfbEgr3.js","assets/Conversations-D4WwB5Zo.css","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-95z6htLW.js","assets/currency-qfIhGmrs.js","assets/Customers-Bz1XO9MW.js","assets/Dashboard-B1ffxkLr.js","assets/dates-CejFUt7H.js","assets/Demandes-RV_pJt-t.js","assets/Depenses-CfKHANbb.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-FsgAeEyf.js","assets/diagnostics-au-trone-7cqJbkH_.js","assets/Discussions-rDeOArW0.js","assets/Encaissements-Cv7kw5G4.js","assets/enfants-Dp_9HTZ2.js","assets/Engagements-B9uaInZm.js","assets/Engagements-Cj5S9MhG.css","assets/EntreDeuxSeances-LqHG49Hs.js","assets/equipe-DABhdlQT.css","assets/Evaluation-CdKTC3xB.js","assets/FacturePrestataire-708s0Pqa.js","assets/Factures-C8hr461V.js","assets/Fil-RQBQH_Qo.js","assets/finances-CCjqAkCE.css","assets/Fournisseurs-C1A0KK7C.js","assets/fournisseurs-W81OQk6R.js","assets/foyer-CPN0AyYw.js","assets/gestes-conversation-Ce5V8Jx4.js","assets/HomeRituals-neSBiuwy.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-BbXYrI2b.js","assets/ia-diagnostic-pur-BulIFgZQ.js","assets/ia-recu-pur-DcucZqpR.js","assets/identite-BCfOFJtp.js","assets/index-BUfBU64V.js","assets/index.es-DVvKbPMQ.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-BBQmyWWe.js","assets/jspdf.es.min-DNxVuFG0.js","assets/JustePrix-UO8IMVS0.js","assets/kkiapay-dqryvSmk.js","assets/laboratoire-D89f9vsW.js","assets/Laboratoire-DZVvKBrM.js","assets/LettresAuDossier-D0VNtQP8.js","assets/LienMndPay-B-z06DKN.js","assets/maisons-CSSFrqZy.js","assets/Marketing-8Orfoz-G.js","assets/Marque-DcDqe5Gh.js","assets/momo-C2ZVfV9J.js","assets/MonMois-DNm2KByN.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-B3ARKa8q.js","assets/paliers-CnWjxw42.js","assets/Parametres-DWwMLCDQ.js","assets/parcours-CeOlUcqz.js","assets/Parrainages-Dc-U1S79.js","assets/Parrainages-gAHAPB_6.css","assets/pdf-CZzIQh1Z.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/Personas-rfoCUCnb.js","assets/Personnel-nUYOYvsN.js","assets/photo-Cm3yrBj6.js","assets/pilotage-Bn1gP_oo.css","assets/Predictions-Cq_jb9eK.js","assets/Prestataires-1a9ku94-.js","assets/prestataires-DwGVe8po.js","assets/Prets-DAIb-DYg.js","assets/protocoles-Bvda5bM0.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-DsV29NXU.js","assets/qualification-C8jN-ZNB.js","assets/quiz-5qMPWZVi.js","assets/Rapport-DZXvviSR.js","assets/RattacherUneCarte-uDm83Ix9.js","assets/Recommandations-DxGks1Uo.js","assets/relances-pur-DsIo28uB.js","assets/releve-des-avis-DDmj0VRF.js","assets/SalonFoyer-CccCjLvv.js","assets/secretariat-admin-Ds0kOs-j.js","assets/Secretariat-Cy79Zw30.css","assets/Secretariat-DR6h508E.js","assets/Signatures-BJ65ZwYD.js","assets/SignerUnPdf-Cuhgxdy8.js","assets/Synthese-BIu33aiR.js","assets/systeme-C3XFIa8E.css","assets/Tableau-C6xgF0_s.js","assets/Textes-CZrc5MBi.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-Yxq0deKM.js","assets/trace-du-moyen-pur-BQm6t3bk.js","assets/trone--XwNfscQ.js","assets/trone-SckX8xKJ.css","assets/ui-WxUPxrpI.js","assets/useAudiences-D0hb9ooe.js","assets/vente-DMe4r4ed.css","assets/Vitrine-BON6rcdB.css","assets/Vitrine-ZH7k87A8.js","assets/_admin-s-hrNk4j.js","assets/_contrat-C3a_E2L3.js","assets/_heures-DRXOEsJd.js","assets/_reuni-DvlzNDU7.js","assets/_shared-C9aU8y7n.js","assets/_signature-D4tO51P_.js","assets/_ui-BWMA-PlM.css","assets/_ui-VC1rqLio.js"];
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
