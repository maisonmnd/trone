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
const BUILD = "20261021072729";
const A_GARDER = ["./","assets/abonnements-DK23Y3sT.js","assets/Abonnements-DumXqAfS.js","assets/Academie-CfEbe5Sk.js","assets/Acces-DHNwLXoI.js","assets/actions-Bnlj-nD2.js","assets/afaire-0J4fEBkj.js","assets/AFaire-RyxAZyMN.js","assets/Analytics-xL9SFCmW.js","assets/Appels-x7V0jodU.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/AtelierDesContenus-lYZgqDg9.js","assets/Aujourdhui-rcNRd0Y8.js","assets/bilan-B-bfPYR0.css","assets/bilan-CcqOPjbM.js","assets/BilanMensuel-DbK8DEHk.js","assets/Branches-Ce1sM_mG.js","assets/bridges-CXHFn5s0.js","assets/Caisse-D6fKJWc0.js","assets/caisse-du-soir-BVyyuqXz.js","assets/Caisses-CwiCgvQS.js","assets/Calendrier-BdY9fE0K.js","assets/Carnet-Cftu6Wea.js","assets/carte-B3YkEBVb.js","assets/carte-WI2qP1su.css","assets/CarteModal-CfHESskP.js","assets/CartesCadeaux-BqA4CWJl.js","assets/Catalogue-CEvKXr6w.js","assets/CentreDeCommande-BlW-4ows.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-BF09Ashv.js","assets/certificat-Cu5hBPSB.js","assets/certificat-DVSxho5e.css","assets/certificats-coffre-CMfVo3Sm.js","assets/ChiffreDesPrestations-C2lXQL2j.js","assets/ClotureDuTiroir-C6vPx-E_.css","assets/ClotureDuTiroir-DO3U9SSK.js","assets/Coffre-CjXFQY8p.js","assets/components-ZDRkJwdn.js","assets/compte-courant-ByzulCEN.js","assets/compte-D5tZxk6a.js","assets/CompteCourant-B14oSxcF.js","assets/Comptes-lF0w-W6N.js","assets/Comptoir-jcdtR8M2.js","assets/consultation-BHQySysv.js","assets/consultation-CCTm16qX.css","assets/Consultations-BhYDc5sD.js","assets/consultNotes-Rr-0mwsA.js","assets/Conversations-D4WwB5Zo.css","assets/Conversations-jbO8h8SG.js","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-V0ndhZ3n.js","assets/currency-qfIhGmrs.js","assets/Customers-DombsLdP.js","assets/Dashboard-CwxaZnpo.js","assets/dates-C3da5qt7.js","assets/Demandes-DoP7Il23.js","assets/Depenses-sV9KJ6xa.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-ZlnaWwRR.js","assets/diagnostics-au-trone-BCt23tGW.js","assets/Discussions-MfATQmjT.js","assets/encaissement-pur-Btd9vqcz.js","assets/Encaissements-B-nxP_O8.js","assets/enfants-BIc8zUTh.js","assets/Engagements-Cj5S9MhG.css","assets/Engagements-FYk8Dae5.js","assets/EntreDeuxSeances-DXzlzWFY.js","assets/equipe-DABhdlQT.css","assets/Evaluation-CFdbdx4Q.js","assets/FacturePrestataire-KDdEXuXw.js","assets/Factures-TKmwU15F.js","assets/Fil-B7ch84L3.js","assets/finances-CCjqAkCE.css","assets/fournisseurs-BT39uxXO.js","assets/Fournisseurs-GU574WCW.js","assets/foyer-nFXIXR2q.js","assets/gestes-conversation-CX8Fp9OQ.js","assets/HomeRituals-BZRmMaoZ.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-BWLKkkpE.js","assets/ia-diagnostic-pur-BulIFgZQ.js","assets/ia-recu-pur-DcucZqpR.js","assets/identite-B6IsH5dL.js","assets/index-4fI6GQ4H.js","assets/index.es-sNnwXXHL.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-DwZUQlxN.js","assets/jspdf.es.min-BicsXk06.js","assets/JustePrix-COVA3LVF.js","assets/kkiapay-dXoQEY1L.js","assets/Laboratoire-3OX3Kbkc.js","assets/laboratoire-DX-eqqte.js","assets/LettresAuDossier-B88loHVe.js","assets/LienMndPay-CcZ6TslY.js","assets/maisons-CSSFrqZy.js","assets/Marketing-D5C8cLAf.js","assets/Marque-BebWXLKo.js","assets/momo-C2ZVfV9J.js","assets/MonMois-NIMFfXtV.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-RiqaMWm6.js","assets/paliers-CbhUFAv2.js","assets/Parametres-Dr_LGLEk.js","assets/parcours-HAu13MqH.js","assets/Parrainages-BafrJKfQ.js","assets/Parrainages-gAHAPB_6.css","assets/pdf-ChkvbNgV.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/Personas-CRBYfk9P.js","assets/Personnel-IiT7n2W2.js","assets/photo-DZS9HizZ.js","assets/pilotage-Bn1gP_oo.css","assets/Predictions-DbcP_MPs.js","assets/Prestataires-bjdLw6DP.js","assets/prestataires-LoRryobR.js","assets/Prets-BooRNLAZ.js","assets/promos-StoBOMos.js","assets/protocoles-BH3boBnW.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-B3A7A3rR.js","assets/qualification-BtsW-dii.js","assets/quiz-5qMPWZVi.js","assets/Rapport-foxmwqYM.js","assets/RattacherUneCarte-D0o3sRlG.js","assets/Recommandations-Cigjo5Up.js","assets/relances-pur-DsIo28uB.js","assets/releve-des-avis-Bpk_FVqS.js","assets/SalonFoyer-CIIb0eUc.js","assets/secretariat-admin-vSr933aB.js","assets/Secretariat-Cy79Zw30.css","assets/Secretariat-RLRTt7he.js","assets/Signatures-hpymO0jr.js","assets/SignerUnPdf-DcGoidWV.js","assets/Synthese-Bkygau_n.js","assets/systeme-C3XFIa8E.css","assets/Tableau-Dbr9Bae9.js","assets/Textes-DLpOzRbT.css","assets/Textes-sy_kCqOq.js","assets/tiroirs-BtCT29UW.js","assets/trace-du-moyen-pur-BQm6t3bk.js","assets/trone-C-VBe2DS.js","assets/trone-wvMgyufp.css","assets/ui-DqJdf8VN.js","assets/vente-DMe4r4ed.css","assets/Vitrine-8FQSeclW.js","assets/Vitrine-CRqZUnEh.css","assets/_admin-DTbUbggB.js","assets/_contrat-BhXiYn2y.js","assets/_heures-Beuw1jjD.js","assets/_reuni-DaBkIPTV.js","assets/_shared-D4r-kFqu.js","assets/_signature-BL-zn0z4.js","assets/_ui-BWMA-PlM.css","assets/_ui-DCKVv5jQ.js"];
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
