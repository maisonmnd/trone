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
const BUILD = "20261029214702";
const A_GARDER = ["./","assets/abonnements-BmpfPUnM.js","assets/Abonnements-B_Sq7J_8.js","assets/Academie-ejAdhkcq.js","assets/Acces-BVS5-MLK.js","assets/actions-BdLheOjr.js","assets/AFaire-BqEgLUFI.js","assets/afaire-D_aN7OfH.js","assets/Agents-D7ZWHl2M.js","assets/agents-donnees-DqH-HpdL.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-y5BtU5f0.js","assets/Appels-Co0m-SGl.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/AtelierDesContenus-Dy3y-ghK.js","assets/AuComptoir-gYAIkZ8D.js","assets/Audience-CbUSA6et.js","assets/Aujourdhui-FApHffT2.js","assets/avis-fiches-BB2GJ3Cw.js","assets/AvisGoogle-Cxbl5XNr.js","assets/AvisGoogle-DaPXfwX9.css","assets/bilan-B-bfPYR0.css","assets/bilan-BNHB7icD.js","assets/BilanMensuel-8H1zfHEQ.js","assets/Branches-dyTEfRW7.js","assets/bridges-Cd4dP4L0.js","assets/Caisse--HbuFF79.js","assets/caisse-du-soir-DEgx4EUs.js","assets/Caisses-CTkZ4tjO.js","assets/Calendrier-DYhCiIAZ.js","assets/campagnes-pur-HUnYrPIB.js","assets/Carnet-D0njS3i3.js","assets/carte-DEgFRTzl.js","assets/carte-_W_-xBPj.css","assets/CarteModal-BZ8QYOGh.js","assets/CartesCadeaux-COQOXSfW.js","assets/Catalogue-CnPQgmJw.js","assets/CentreDeCommande-BGKobiuA.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-CU3cCfgL.js","assets/certificat-BaYx9UIA.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-DA1skG-u.js","assets/chiffre-du-jour-pur-C7_t2lLK.js","assets/ChiffreDesPrestations-DqEQzXT2.js","assets/client-DUVYERHz.js","assets/ClotureDuTiroir-C6vPx-E_.css","assets/ClotureDuTiroir-UT9Nwzhp.js","assets/Coffre-v8E6SX7z.js","assets/components-CLT_qEpg.js","assets/compte-CL1cq97r.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-ChZr1rxU.js","assets/Comptes-YrGGwABd.js","assets/Comptoir-TxRdhsTz.js","assets/consultation-CRW6QcWf.css","assets/consultation-D-TyjK2E.js","assets/Consultations-D7uuYwT9.js","assets/consultNotes-BrvCYN1-.js","assets/Conversations-D4WwB5Zo.css","assets/Conversations-DqJC6aBV.js","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-BYT6PYtF.js","assets/currency-qfIhGmrs.js","assets/Customers-B0wg9g7Z.js","assets/Dashboard-BdWsxYMl.js","assets/Dashboard-zjGteuUE.css","assets/dates-DdawQULH.js","assets/Demandes-Dwit2uA4.js","assets/Depenses-B56ElG4v.js","assets/dernier-message-pur-CBYWnq8m.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-SreInxr4.js","assets/diagnostics-au-trone-CFGZujy8.js","assets/Discussions-lVZubvDN.js","assets/EditeurDesOffres-Y_ufBiur.js","assets/Encaissements-CUfIUMoq.js","assets/enfants-ClerdSd8.js","assets/Engagements-B29njB3g.js","assets/Engagements-Cj5S9MhG.css","assets/EntreDeuxSeances-DpD3YqP9.js","assets/equipe-B_9ZHz24.css","assets/Evaluation-Cv3RPvaZ.js","assets/FacturePrestataire-D4pGgND5.js","assets/Factures-ByPEFqyT.js","assets/FenetreDesCivilites-CLWAahci.js","assets/FenetreDesCivilites-zfNk1aak.css","assets/FenetreDuPoint-LQc45O4p.js","assets/Fil-Aydqw2w1.js","assets/finances-BMFnlkRx.css","assets/fon-BEoRwH_H.js","assets/fon-pur-CgVkbJ8O.js","assets/fournisseurs-Cdj-Mnw7.js","assets/Fournisseurs-CYeHc1rv.js","assets/foyer-DbpMLVUK.js","assets/Gerard-DDgDHT_k.js","assets/Gerard-DjWZ3MUn.css","assets/gerard-donnees-Bfry2bIQ.js","assets/gestes-conversation-DraMk11D.js","assets/HomeRituals-DEh1P1J8.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-CRgi9t0D.js","assets/ia-centre-CXKcnNnk.js","assets/ia-diagnostic-pur-hHYxp10Y.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-recu-pur-DcucZqpR.js","assets/identite-Bb9Kl_c7.js","assets/index-CIChHSuy.js","assets/index.es-HL6VpSC1.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-BPW-2XYw.js","assets/jspdf.es.min-BPRX-W-F.js","assets/JustePrix-VloDCziQ.js","assets/kkiapay-DPnnNiAK.js","assets/kkiapay-widget-DnUhUNd4.js","assets/Laboratoire-BTSJUtMG.js","assets/laboratoire-Ejk2QMmo.js","assets/LettresAuDossier-CD6HMzzF.js","assets/LienMndPay-BUKkibaY.js","assets/maisons-CSSFrqZy.js","assets/Marketing-D4ts9L51.js","assets/MarketingBranche-B2BIiVHg.js","assets/Marque-BrZn2s4T.js","assets/MesTaches-BvH0NXCe.js","assets/MesTaches-Cc4XUDf6.css","assets/momo-B-QSeWY6.js","assets/MonMois-CpBpvYbF.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-B8vEcxWX.js","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/paliers-CooK4FqM.js","assets/Parametres-DF1gkSes.js","assets/parcours-plf4BTkV.js","assets/Parrainages-CWJJYmdR.js","assets/Parrainages-gAHAPB_6.css","assets/pdf-BvFFrJJ4.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/Personas-BSsJkyoP.js","assets/Personnel-He21b7UE.js","assets/photo-DWKwd7vR.js","assets/pilotage-D8kf1Co8.css","assets/Predictions-edmGud4r.js","assets/Prestataires-CxbPYypH.js","assets/prestataires-ICMX6ah1.js","assets/Prets-CmjbU8O2.js","assets/prevision-du-mois-pur-D6sJa5lw.js","assets/Previsions-BlX4Hgi_.js","assets/Previsions-D-0__Buz.css","assets/previsions-pur-D1NnRYMu.js","assets/processus-pur-BLN25j-E.js","assets/Projets-COO7WDEE.css","assets/projets-oj3CI8Ek.js","assets/projets-pur-2ZEMRNDU.js","assets/Projets-qwCKxtl1.js","assets/protocoles-D2UlWrei.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-DYfOW4Az.js","assets/qualification-DIpTH_z-.js","assets/quiz-5qMPWZVi.js","assets/Rapport-BmxM4IqN.js","assets/RattacherUneCarte-DTgL2jtS.js","assets/Recommandations-B5aYfc61.js","assets/regler-BrJCb58E.js","assets/regler-C5hcM02_.css","assets/regler-la-seance-serveur-Bs6rzqZX.js","assets/relances-pur-CTGdiNru.js","assets/releve-des-avis-g2K6eN0u.js","assets/SalonFoyer-PNnVrAb9.js","assets/secretariat-admin-zoj8dc7N.js","assets/Secretariat-Bf7UkaDL.js","assets/Secretariat-Cy79Zw30.css","assets/Signatures-DYGl8ee9.js","assets/SignerUnPdf-BKQgxh3G.js","assets/Synthese-BWBr-fwD.js","assets/SyntheseGraphes-DjsSqm-L.js","assets/systeme-TPy-pF7j.css","assets/Tableau-DMYkMFaW.js","assets/temps-hknBJvQQ.js","assets/Textes-Df9WPefC.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-CxYWgz1j.js","assets/trace-du-moyen-pur-Bx8-suHn.js","assets/trone-6oqi9uEL.js","assets/trone-BMdkuVGH.css","assets/ui-B2QfImuN.js","assets/useAudiences-BLcoS0YG.js","assets/vente-C7YWXkHo.css","assets/Vitrine-BWilTqQJ.css","assets/Vitrine-CyAdIUZi.js","assets/_admin-CyQ8aLjp.js","assets/_contrat-kVcx-jnw.js","assets/_heures-DTDcFBc0.js","assets/_reuni-C_lkt7A1.js","assets/_shared-hsJebhLT.js","assets/_signature-B7MIEQPM.js","assets/_ui-BWMA-PlM.css","assets/_ui-yK2fLzmP.js"];
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
