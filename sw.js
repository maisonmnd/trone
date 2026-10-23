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
const BUILD = "20261023233210";
const A_GARDER = ["./","assets/abonnements-BGpCR9Eb.js","assets/Abonnements-BWxYBLBp.js","assets/Academie-DnCqjdp-.js","assets/Acces-BpqK_IJ5.js","assets/actions-DkCHTnTL.js","assets/AFaire-Dc9wxEMZ.js","assets/afaire-RGSRp9d_.js","assets/Analytics-B0XEP8QR.js","assets/Appels-CC3oan3L.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/AtelierDesContenus-IBm-5Igu.js","assets/AuComptoir-BVWKKuLc.js","assets/Aujourdhui-Duyuu5a8.js","assets/bilan-B-bfPYR0.css","assets/bilan-Bc_uahLR.js","assets/BilanMensuel-1vp1o2zs.js","assets/Branches-WTiIHiLW.js","assets/bridges-C-0IM911.js","assets/caisse-du-soir-BP5HnQoy.js","assets/Caisse-g_AW83Rb.js","assets/Caisses-BGpV4Kyp.js","assets/Calendrier-Cr1eN7rT.js","assets/Carnet-DYK42xL1.js","assets/carte-ClBwvXoT.js","assets/carte-WI2qP1su.css","assets/CarteModal-Ck3J5i4C.js","assets/CartesCadeaux-BILlKBiA.js","assets/Catalogue-Bz4nsAST.js","assets/CentreDeCommande-B-KOXayy.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-BfW9PlMH.js","assets/certificat-DsP22QiC.js","assets/certificat-DVSxho5e.css","assets/certificats-coffre-CIi5CM4X.js","assets/ChiffreDesPrestations-CenhvNPv.js","assets/ClotureDuTiroir-C6vPx-E_.css","assets/ClotureDuTiroir-CAGCrHPv.js","assets/Coffre-BCWipzRN.js","assets/components-cTalvp6W.js","assets/compte-AnEwXG7J.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-CcHtmhBz.js","assets/Comptes-CKmw_LsY.js","assets/Comptoir-DJo5-FdY.js","assets/consultation-BvWNRSrU.js","assets/consultation-CCTm16qX.css","assets/Consultations-Dpq81VVh.js","assets/consultNotes-BufJIGqy.js","assets/Conversations-B-QFlhHz.js","assets/Conversations-D4WwB5Zo.css","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-tchoOrt3.js","assets/currency-qfIhGmrs.js","assets/Customers-ChkXTc-Y.js","assets/Dashboard-DED9VkGt.js","assets/dates-jHzmpm6m.js","assets/Demandes-CKnHmMo3.js","assets/Depenses-DkUrteZO.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-CtjNvPav.js","assets/diagnostics-au-trone-CmJrHoqR.js","assets/Discussions-BdzGV1ho.js","assets/Encaissements-CzYo3pIh.js","assets/enfants-BDtVEY5r.js","assets/Engagements-ChlHm9pm.js","assets/Engagements-Cj5S9MhG.css","assets/EntreDeuxSeances-DAMrJbAD.js","assets/equipe-DABhdlQT.css","assets/Evaluation-DiN_YbYl.js","assets/FacturePrestataire-BOlIUppb.js","assets/Factures-B6c53_Gj.js","assets/Fil-Bb5-usXC.js","assets/finances-CCjqAkCE.css","assets/fournisseurs-Csv1zUZm.js","assets/Fournisseurs-xahgQ7wS.js","assets/foyer-1L9R1opC.js","assets/gestes-conversation-CvpKw4oC.js","assets/HomeRituals-B3xjfOug.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-BxrH_8ih.js","assets/ia-diagnostic-pur-BulIFgZQ.js","assets/ia-recu-pur-DcucZqpR.js","assets/identite-B0sGIXOX.js","assets/index-f2mnZ99Z.js","assets/index.es-CTc-cfAb.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-DYnEaBrp.js","assets/jspdf.es.min-CMtsoKJX.js","assets/JustePrix-DFK4pHmR.js","assets/kkiapay-BJK09IQU.js","assets/Laboratoire-CQhvO13A.js","assets/laboratoire-Ze928lMg.js","assets/LettresAuDossier-C5d-Hj4e.js","assets/LienMndPay-DEICMnBT.js","assets/maisons-CSSFrqZy.js","assets/Marketing-cqrd2K3l.js","assets/Marque-DRDo5bN4.js","assets/momo-C2ZVfV9J.js","assets/MonMois-C0r29At3.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-AEOqWSSB.js","assets/paliers-D2h666gy.js","assets/Parametres-DitQ5g1Y.js","assets/parcours-qXGgOl0I.js","assets/Parrainages-gAHAPB_6.css","assets/Parrainages-xtNdL9a8.js","assets/pdf-VJcNm7C7.js","assets/pdf-_vMv_9bb.js","assets/pdf.worker.min-uNib_u9P.js","assets/Personas-REyJRt41.js","assets/Personnel-Cma3BdcK.js","assets/photo-D3qZfPIQ.js","assets/pilotage-Bn1gP_oo.css","assets/Predictions-Clcah1Vc.js","assets/Prestataires-CVIfE0OJ.js","assets/prestataires-OMcayVQS.js","assets/Prets-BjbkAxIE.js","assets/protocoles-BpDPQVS8.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-CL_T48lo.js","assets/qualification-HyUfpxLk.js","assets/quiz-5qMPWZVi.js","assets/Rapport-9LUvZAIl.js","assets/RattacherUneCarte-C5OWR1Zf.js","assets/Recommandations-BhCPGX_Z.js","assets/relances-pur-DsIo28uB.js","assets/releve-des-avis-a06NGkX6.js","assets/SalonFoyer-B7zu9QtU.js","assets/secretariat-admin-C5fZqKES.js","assets/Secretariat-CGvTu_YU.js","assets/Secretariat-Cy79Zw30.css","assets/Signatures-BKwwkn0F.js","assets/SignerUnPdf-B-YKfV_T.js","assets/Synthese-L_cjAPDI.js","assets/systeme-C3XFIa8E.css","assets/Tableau-YPyij8Ho.js","assets/Textes-DLpOzRbT.css","assets/Textes-jFSIWsb6.js","assets/tiroirs-g8kxNG-F.js","assets/trace-du-moyen-pur-BQm6t3bk.js","assets/trone-BS0Qxskf.js","assets/trone-i2S5bjpy.css","assets/ui-QUDQZbj9.js","assets/useAudiences-C6yvyANe.js","assets/vente-DMe4r4ed.css","assets/Vitrine-BON6rcdB.css","assets/Vitrine-CueU01mT.js","assets/_admin-CaHola3x.js","assets/_contrat-D5k1iPGd.js","assets/_heures-CN5j6yhr.js","assets/_reuni-CEJ_uuw8.js","assets/_shared-C-z5t7ee.js","assets/_signature-B3gxNsQu.js","assets/_ui-BWMA-PlM.css","assets/_ui-BwX-e_UL.js"];
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
