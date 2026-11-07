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
const BUILD = "20261107111648";
const A_GARDER = ["./","assets/Abonnements-DTY7p2DH.css","assets/Abonnements-DwiVRuFH.js","assets/abonnements-VMi1HSaQ.js","assets/Academie-DUKUSRSx.js","assets/Acces-BDmSRoYX.js","assets/AFaire-Br6gYJQb.js","assets/afaire-ChoW-WEo.js","assets/Agents-BiybLwp5.js","assets/agents-donnees-DcmywxCs.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-B-u0IZDi.js","assets/Appels-Duuz9H68.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/Assistants-BDfMtCLf.js","assets/Assistants-D9i2Xwmg.css","assets/AtelierDesContenus-D3-p6F2A.css","assets/AtelierDesContenus-jm9FxqIb.js","assets/Audience-z7wj-Gar.js","assets/Aujourdhui-BWcMZX6k.js","assets/avant-le-fauteuil-lecture-C3E13DXg.js","assets/AvantLeFauteuil-CkBnwIpO.js","assets/avis-fiches-Db1XQoG7.js","assets/AvisGoogle-C56B2f4L.js","assets/AvisGoogle-DaPXfwX9.css","assets/BadgeEssai-DbCspLh8.js","assets/bilan-8CApBSeX.js","assets/bilan-B-bfPYR0.css","assets/BilanMensuel-uf97LT7v.js","assets/Branches-y9_TO6Rk.js","assets/bridges-D1pd6lF8.js","assets/Caisse-D4SgLNZ6.js","assets/caisse-du-soir--2ROv2Pz.js","assets/caisse-du-soir-C6vPx-E_.css","assets/Caisses-BghG2frM.js","assets/Calendrier-BLqWWLhO.js","assets/campagnes-pur-B2p-e4bF.js","assets/Carnet-Ch7qL3G5.js","assets/carte-CesoBUhH.js","assets/carte-_W_-xBPj.css","assets/CarteModal-CdOMiGua.js","assets/CartesCadeaux-BfgLNh5e.js","assets/Catalogue-CmNz-lqR.js","assets/CentreDeCommande-B4R0u0o4.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-xn41eLYo.js","assets/certificat-vyD58pQh.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-6Wt07S0e.js","assets/chiffre-du-jour-pur-Cm-ABasF.js","assets/ChiffreDesPrestations-BemlJXY1.js","assets/client-CUIdrdf0.js","assets/cloture-du-jour-BXLIFdFg.js","assets/ClotureDuTiroir-D5kKr7P2.js","assets/Coffre-C9Ln-iBJ.js","assets/components-DreFDkoz.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-LUvgTIHo.js","assets/Comptes-B85LTnNb.js","assets/consultation-CRW6QcWf.css","assets/consultation-DLgcnki9.js","assets/Consultations-DRUI9_GZ.js","assets/consultNotes-CeWeYAC8.js","assets/Conversations-D4WwB5Zo.css","assets/Conversations-Z947J8Mm.js","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-BLDZunhL.js","assets/currency-qfIhGmrs.js","assets/Customers-CsOKv4VC.js","assets/Dashboard-B2x7VsE_.css","assets/Dashboard-CWse7Yk0.js","assets/dates-_i7FXAq9.js","assets/Demandes-DSSmMhTA.js","assets/DepenseEnUnePhrase-BIGRlGqP.css","assets/DepenseEnUnePhrase-CFwOTveZ.js","assets/Depenses-7HqK37Xm.js","assets/depenses-saisie-CGm9jDFa.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-BhzHC8kE.js","assets/diagnostics-au-trone-Cbl4OsF2.js","assets/Dictee-D2P9yM7v.css","assets/dictee-pur-DQ9hOugX.js","assets/Dictee-u8GJESKH.js","assets/Discussions-DEtmYe-X.js","assets/EditeurDesOffres-BXS-KfrS.js","assets/Encaissements-B5zAJBLh.js","assets/enfants-Dzm75dYM.js","assets/Engagements-BkdJSvUY.js","assets/Engagements-Cj5S9MhG.css","assets/engagements-coffre-hF2ljRzt.js","assets/EntreDeuxSeances-BUaq7D2_.js","assets/Evaluation-CD3EnwZb.js","assets/Factures-D-0pZvDh.js","assets/FenetreDesCivilites-Bm4nlwfR.js","assets/FenetreDesCivilites-zfNk1aak.css","assets/FenetreDuPoint-BPVc2tQ_.js","assets/Fil-BYc0qSjt.js","assets/finances-BMFnlkRx.css","assets/fon-BIl-Hxcx.js","assets/Fournisseurs-D-ifP7iI.js","assets/fournisseurs-NWP7IHKm.js","assets/foyer-qpTqWZNg.js","assets/Gerard-Cd-ssm2p.js","assets/Gerard-Cgj-zsJh.css","assets/gerard-donnees-D_DmuudW.js","assets/gestes-conversation-30RAga1W.js","assets/HomeRituals-y-ttSmJZ.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-BUqyyS0G.js","assets/ia-centre-kyZI6RQ1.js","assets/ia-diagnostic-pur-BBLrGY5l.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-tableau-pur-CSRjGtTf.js","assets/identite-6la7hYZf.js","assets/index-C3mibeWx.js","assets/index.es-U-V2z0ei.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-Drb7bOq5.js","assets/jspdf.es.min-CsjUm8Oy.js","assets/JustePrix-DizrKPJb.js","assets/kkiapay-B2VnhLGH.js","assets/kkiapay-widget-DnUhUNd4.js","assets/Laboratoire-Dmr-v6hO.js","assets/LaJournee-Bn_G0HCt.css","assets/LaJournee-Cs26UzbP.js","assets/LesPaiements-BvdfOCbQ.css","assets/LesPaiements-C5cd8dwz.js","assets/LettresAuDossier-fIhD4tuA.js","assets/LienMndPay-dftdcow9.js","assets/Marketing-CFAHKOSV.js","assets/MarketingBranche-DBdLh5fX.js","assets/Marque-DyWygvqp.js","assets/MesPourboires-C99j3NTe.js","assets/MesPourboires-D9I_9rZf.css","assets/MesTaches-Cc4XUDf6.css","assets/MesTaches-MDgAxubY.js","assets/momo-C2ZVfV9J.js","assets/MonMois-B26_lh7s.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-CCoCcP4J.js","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/opale-BqnmYwIp.js","assets/oreille-B1AMUmZh.js","assets/paie-du-5-BvSkyCGV.js","assets/paie-du-5-DeJq-K_U.css","assets/paie-du-5-pur-BZCuvABx.js","assets/PaieParMtn-BMio1CWm.js","assets/paliers-CMCyxhus.js","assets/Parametres-onot-a6Y.js","assets/parcours-BM_AIii4.js","assets/Parrainages-Bxn7dA0q.js","assets/Parrainages-gAHAPB_6.css","assets/PassageAvantLeFauteuil-DCWGYUMS.js","assets/pdf-SKX5Fd6F.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/Personas-BpAGeuPZ.js","assets/Personnel-wwAW62bz.js","assets/photo-BRx2_Zh2.js","assets/pilotage-D8kf1Co8.css","assets/Pourboires-6XbOZ-c2.js","assets/Predictions-BohMVtSm.js","assets/Prestataires-TwLKcQUi.js","assets/Prets-C8Cx1_lW.js","assets/PrevisionDuMois-BYUN5z-P.js","assets/PrevisionDuMois-DlFTw3OX.css","assets/Previsions-EUWgg2zN.js","assets/previsions-pur-DTyC5EHp.js","assets/Previsions-r4v19Anp.css","assets/processus-pur-R6U5QcCi.js","assets/Projets-COO7WDEE.css","assets/Projets-CzuAEvp4.js","assets/projets-iBN4joqj.js","assets/projets-pur-2ZEMRNDU.js","assets/protocoles-uFD4hur4.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-C1uL1zBm.js","assets/qualification-BAX_alTe.js","assets/quiz-5qMPWZVi.js","assets/Rapport-DX2VtfHt.js","assets/Recommandations-B5RoF7vT.js","assets/regler-C5hcM02_.css","assets/regler-DC2NdI9d.js","assets/regler-la-seance-serveur-Bs6rzqZX.js","assets/relances-pur-lwRTXc5E.js","assets/releve-des-avis-Ck3_OlaP.js","assets/SalonFoyer-CsxSYIWT.js","assets/secretariat-admin-CNRGSzUb.js","assets/Secretariat-BP8V6LOA.js","assets/Secretariat-Cy79Zw30.css","assets/Signatures-CXUw9gc7.js","assets/SignerUnPdf-BiJKMYMX.js","assets/Synthese-Bl0QGvom.js","assets/SyntheseGraphes-BDqUdTlo.js","assets/systeme-TPy-pF7j.css","assets/Tableau-jGHD-KIP.js","assets/temps-BFeB_9lL.js","assets/Textes-DLpOzRbT.css","assets/Textes-DTRhZf0_.js","assets/tiroirs-CkDzpGy0.css","assets/tiroirs-CsuL8j8g.js","assets/trone-8oiA2_1o.js","assets/trone-CQ2DUl_d.css","assets/useAudiences-DZpvC_p5.js","assets/useClotureDuJour-B5AVnIPX.js","assets/Vitrine-BWilTqQJ.css","assets/Vitrine-CEom9obh.js","assets/_admin-D8K7S82h.js","assets/_contrat-wH3cnF5o.js","assets/_heures-Bn4ao0eI.js","assets/_reuni-CsQCkccP.js","assets/_shared-C_ViGDjU.js","assets/_signature-C_hN93NO.js","assets/_ui-B9oY_QI2.js","assets/_ui-BrUDlmuM.css"];
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
