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
const BUILD = "20261024211807";
const A_GARDER = ["./","assets/Abonnements-0PTGp5nf.js","assets/abonnements-hvOn0jzc.js","assets/Academie-B9RJsKtX.js","assets/Acces-DHTphVHQ.js","assets/actions-CGkC53Uv.js","assets/AFaire-Cb40wQEb.js","assets/afaire-Czb7ejg2.js","assets/Agents-C89x4Rfw.css","assets/Agents-CQpN_EOi.js","assets/agents-donnees-CgzybxfY.js","assets/Analytics-DoEDIDUX.js","assets/Appels-BaQI8QxO.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/AtelierDesContenus-BmPrWXd-.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/AuComptoir-WDBBR9ar.js","assets/Aujourdhui-DqU6Wh9m.js","assets/bilan-B-bfPYR0.css","assets/bilan-BKr0ku_b.js","assets/BilanMensuel-D1J0rlBM.js","assets/Branches-D1R3f0zA.js","assets/bridges-DUhQpb3a.js","assets/Caisse-BrrV7GEv.js","assets/caisse-du-soir-aOz8IGdF.js","assets/Caisses-DPMCXY_H.js","assets/Calendrier-DNjigBHz.js","assets/Carnet-5bOmaYn9.js","assets/carte-DEpKVCfn.js","assets/carte-WI2qP1su.css","assets/CarteModal-WU8Fo432.js","assets/CartesCadeaux-CPz_HY-P.js","assets/Catalogue-B4UkA7Uq.js","assets/CentreDeCommande-CPgdsAk_.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-D5654bJo.js","assets/certificat-DHd93Pu2.js","assets/certificat-DVSxho5e.css","assets/certificats-coffre-CCdsu_AV.js","assets/chiffre-du-jour-pur-BZDT0RYs.js","assets/ChiffreDesPrestations-BEosvkV5.js","assets/ClotureDuTiroir-C6vPx-E_.css","assets/ClotureDuTiroir-DQ5BlWJp.js","assets/Coffre-Cf3L_T39.js","assets/components-RWySyCVu.js","assets/compte-BaBnpKEM.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-CjjgiTeM.js","assets/Comptes-Dumm4sJG.js","assets/Comptoir-DO7lwUhk.js","assets/consultation-CCTm16qX.css","assets/consultation-CRoJt-eO.js","assets/Consultations-B8ev9tHq.js","assets/consultNotes-eCwb-sO_.js","assets/Conversations-D4WwB5Zo.css","assets/Conversations-DYtR-OdH.js","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-C9Ao8zFN.js","assets/currency-Ce7UXTX-.js","assets/Customers-CsmbaoMv.js","assets/Dashboard-CRztSvRU.css","assets/Dashboard-uhma-LfJ.js","assets/dates-Bc0M6nNW.js","assets/Demandes-Bh1Z573y.js","assets/Depenses-Q3FYZh3Z.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-Bm51e0Hh.js","assets/diagnostics-au-trone-BVzCqXfY.js","assets/Discussions-B_gdzSoz.js","assets/Encaissements-DFLeraPJ.js","assets/enfants-nd2t1kC0.js","assets/Engagements-Cj5S9MhG.css","assets/Engagements-Ea1uFR3z.js","assets/EntreDeuxSeances-89YWbjvS.js","assets/equipe-B_9ZHz24.css","assets/Evaluation-CnGZ4rsT.js","assets/FacturePrestataire-DTCcpt9Y.js","assets/Factures-Dah8vduQ.js","assets/Fil-IFPvi6Iw.js","assets/finances-D6K9vD1R.css","assets/fournisseurs-BHX1BzNY.js","assets/Fournisseurs-D8_N-ZcJ.js","assets/foyer-BTzQIc2k.js","assets/gestes-conversation-BF3GrDEO.js","assets/HomeRituals-DZoqm9tq.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-lA9rLx3w.js","assets/ia-diagnostic-pur-BulIFgZQ.js","assets/ia-marque-pur-cjcfwB6C.js","assets/ia-recu-pur-DcucZqpR.js","assets/identite-Bs4bsPAY.js","assets/index-CHi1ivWS.js","assets/index.es-rycmlqnX.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-D2EBVaxc.js","assets/jspdf.es.min-eBuI_6Yl.js","assets/JustePrix-mq9B2Chx.js","assets/kkiapay-BJG9_doK.js","assets/laboratoire-CtnNjnKP.js","assets/Laboratoire-CWLkW_Dc.js","assets/LettresAuDossier-BsPa9Ctj.js","assets/LienMndPay-CtiAYjwq.js","assets/maisons-CSSFrqZy.js","assets/Marketing-CVXkOXOc.js","assets/Marque-B6e609qn.js","assets/MesTaches-B-wb01HP.js","assets/MesTaches-Cc4XUDf6.css","assets/momo-C2ZVfV9J.js","assets/MonMois-CvJTRn-t.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-CeWZa96O.js","assets/paliers-D5cTIFfT.js","assets/Parametres-Cd33AK_k.js","assets/parcours-CEjw0VlO.js","assets/Parrainages-BKRemlOd.js","assets/Parrainages-gAHAPB_6.css","assets/pdf-H9m0zAyq.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/Personas-Ba1XQJxM.js","assets/Personnel-D3q-kRJw.js","assets/photo-DW8FnC0c.js","assets/pilotage-D8kf1Co8.css","assets/Predictions-D0egL-yT.js","assets/Prestataires-CcO93CX_.js","assets/prestataires-D7aWdzK8.js","assets/Prets-Bvqi4n6b.js","assets/Projets-BFzUKaJQ.js","assets/projets-BNOxe7LJ.js","assets/Projets-COO7WDEE.css","assets/projets-pur-2ZEMRNDU.js","assets/protocoles-BAuJubso.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-wLICDTT4.js","assets/qualification-0yCYJPUm.js","assets/quiz-5qMPWZVi.js","assets/Rapport-BLUZsaLl.js","assets/RattacherUneCarte-C03apjRD.js","assets/Recommandations-DxBkn-Cm.js","assets/relances-pur-DsIo28uB.js","assets/releve-des-avis-fp9_ibg9.js","assets/SalonFoyer-CCmbo40H.js","assets/secretariat-admin-BiQWhUJR.js","assets/Secretariat-C2KMEIET.js","assets/Secretariat-Cy79Zw30.css","assets/Signatures-DnwOrKpm.js","assets/SignerUnPdf-D9ILMtM5.js","assets/Synthese-D3tgqmmG.js","assets/systeme-C3XFIa8E.css","assets/Tableau-XtnLXjzF.js","assets/Textes-DLpOzRbT.css","assets/Textes-UCxeCBNk.js","assets/tiroirs-Cg7l02Nt.js","assets/trace-du-moyen-pur-Cb3Gcky8.js","assets/trone-Bv3EUzvb.css","assets/trone-Bwfp6-9l.js","assets/ui-CE3zoBxK.js","assets/useAudiences-GfDpe3Ri.js","assets/vente-C7YWXkHo.css","assets/Vitrine-B4niT6fG.js","assets/Vitrine-BON6rcdB.css","assets/_admin-DwXKnCer.js","assets/_contrat-PV0aB8Ho.js","assets/_heures-CW49jSsB.js","assets/_reuni-XF0vFkUa.js","assets/_shared-D5ygKF02.js","assets/_signature-CT0xPqGO.js","assets/_ui-BOkg_4eD.js","assets/_ui-BWMA-PlM.css"];
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
