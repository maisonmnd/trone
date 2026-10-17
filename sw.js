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
const BUILD = "20261017193414";
const A_GARDER = ["./","assets/Abonnements-BczVOhAm.js","assets/abonnements-CGjrGQfa.js","assets/Academie-Dq_po3RK.js","assets/Acces-CfY6B1LG.js","assets/actions-BgIycFk5.js","assets/afaire-1rJzBmZN.js","assets/AFaire-BGNaajtE.js","assets/Analytics-Ck4Tfsi2.js","assets/Appels-DOdfy_3_.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/AtelierDesContenus-2hgKCaba.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/Aujourdhui-Dg8_R35Y.js","assets/bilan-B-bfPYR0.css","assets/bilan-D5MsJHxG.js","assets/BilanMensuel-CtBOIHlX.js","assets/Branches-CCY0f78N.js","assets/bridges-CrI-OUt3.js","assets/Caisse-DBe3vlGg.js","assets/caisse-du-soir-CCFEFEew.js","assets/Caisses-B0_kUSI4.js","assets/Calendrier-lBi7n3l8.js","assets/Carnet-DJ2ndKZa.js","assets/carte-C0PCduob.js","assets/carte-WI2qP1su.css","assets/CarteModal-RzfnL3u8.js","assets/CartesCadeaux-COBhBQN8.js","assets/Catalogue-BEn05TA3.js","assets/CentreDeCommande-Du8kyJhp.css","assets/CentreDeCommande-onQJUKOP.js","assets/Cercle-CYr9nHh4.js","assets/certificat-Bhft0H3_.js","assets/certificat-DVSxho5e.css","assets/certificats-coffre-C4lnNVvN.js","assets/ChiffreDesPrestations-wIlepPC3.js","assets/ClotureDuTiroir-C6vPx-E_.css","assets/ClotureDuTiroir-Dd-ekG74.js","assets/Coffre-DnriRBn7.js","assets/components-DlreWedf.js","assets/compte-Cd8ows-a.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-BaI2lhCZ.js","assets/Comptes-CcbAviiF.js","assets/Comptoir-SQ4wPw3E.js","assets/consultation-CCTm16qX.css","assets/consultation-DJ7NoEBZ.js","assets/Consultations-D4fG-hDs.js","assets/consultNotes-Gq18FZhG.js","assets/Conversations-Clw9qjVi.js","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-DY_F8UGd.js","assets/currency-qfIhGmrs.js","assets/Customers-CaDXKgt-.js","assets/Dashboard-Dti2fBeQ.js","assets/dates-7MIdmn9j.js","assets/Demandes-CP_XMo2q.js","assets/Depenses-tVTFqZjK.js","assets/devise-fon-DX3P0bG4.woff2","assets/encaissement-pur-B0Z2vM3q.js","assets/Encaissements-BtWSVtAB.js","assets/enfants-BMknxzJC.js","assets/Engagements-Cj5S9MhG.css","assets/Engagements-D9y5dsSJ.js","assets/EntreDeuxSeances-Bg9EExgp.js","assets/equipe-DpPyq6h-.css","assets/Evaluation-lA_itYh9.js","assets/FacturePrestataire-DOz861gM.js","assets/Factures-C8TXX5-h.js","assets/Fil-Ol6OOQ_v.js","assets/finances-CCjqAkCE.css","assets/fournisseurs-BZPDSSj7.js","assets/Fournisseurs-Cio7E-BD.js","assets/foyer-sEsIb90e.js","assets/HomeRituals-TW00ftno.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-Bin1OosH.js","assets/identite-buy_hWl8.js","assets/index-jyLWm4qu.js","assets/index.es-O2iFxWiU.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-I9qi5uEz.js","assets/jspdf.es.min-DwQYM2Rd.js","assets/JustePrix-Cea_QgRL.js","assets/kkiapay-COSPG3OI.js","assets/laboratoire-B-fX4-2h.js","assets/Laboratoire-Bff1SexE.js","assets/LettresAuDossier-BtMXY9xn.js","assets/maisons-CSSFrqZy.js","assets/Marketing-DCXOssSE.js","assets/Marque-CvQLpVio.js","assets/momo-C2ZVfV9J.js","assets/MonMois-B7LsUqv2.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-BD3ESAtY.js","assets/paliers-CxaCQu-F.js","assets/Parametres-Dm3HyHgt.js","assets/parcours-uvmL7fRc.js","assets/Parrainages-BU-djZm0.js","assets/Parrainages-gAHAPB_6.css","assets/pdf-Dx3JDLWt.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/Personas-CpffQgoa.js","assets/Personnel-D-FrPO_1.js","assets/photo-D-LQDAg4.js","assets/pilotage-Bn1gP_oo.css","assets/Predictions-B3T6gWrp.js","assets/Prestataires-B1eWAdlU.js","assets/prestataires-BELIoHdC.js","assets/Prets-DjyHRzNZ.js","assets/promos-BDu54s8E.js","assets/protocoles-DD7-7E_F.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-Be31vBz7.js","assets/quiz-5qMPWZVi.js","assets/Rapport-DxKQZcBe.js","assets/RattacherUneCarte-Z6XKEmIh.js","assets/Recommandations-Cmz1Vh4I.js","assets/SalonFoyer-f5cAZBFR.js","assets/secretariat-admin-DuQlBR7m.js","assets/Secretariat-CHnn4G7a.js","assets/Signatures-D8dZIbJs.js","assets/SignerUnPdf-CrIL3ADG.js","assets/Synthese-Cv4i_j08.js","assets/systeme-C3XFIa8E.css","assets/Tableau-D3nOVri3.js","assets/Textes-DLpOzRbT.css","assets/Textes-DWgDP3GA.js","assets/tiroirs-Odf3Umtm.js","assets/trone-B-oYxQJ8.js","assets/trone-CyFdPxg0.css","assets/ui-D4KncveG.js","assets/vente-DMe4r4ed.css","assets/Vitrine-BNd8khu7.js","assets/_admin-DuBEoEBo.js","assets/_contrat-e_g1AtMn.js","assets/_heures-BAWJwEIM.js","assets/_reuni-QzfCT39O.js","assets/_shared-DYh4Cr_V.js","assets/_signature-C0qdwDAH.js","assets/_ui-BWMA-PlM.css","assets/_ui-CRnC0kKj.js"];
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
