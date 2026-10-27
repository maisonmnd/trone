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
const BUILD = "20261027222147";
const A_GARDER = ["./","assets/Abonnements--DtEJjqg.js","assets/abonnements-1s7V1zM4.js","assets/Academie-BEhDBzkK.js","assets/Acces-B5YLWTUk.js","assets/actions-CDUh9D8T.js","assets/AFaire-BzazFy9s.js","assets/afaire-D9KNsRfs.js","assets/Agents-6mQnqr6G.js","assets/agents-donnees-DSLr9d1z.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-DxpNtOcx.js","assets/Appels-Co4sSKRS.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/AtelierDesContenus-CgmZv0VI.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/AuComptoir-BrPblsxC.js","assets/Audience-BuRmRDar.js","assets/Aujourdhui-DYHzrATd.js","assets/avis-fiches-5BRf41Yc.js","assets/AvisGoogle-CSqj8hjm.js","assets/AvisGoogle-DaPXfwX9.css","assets/bilan-B-bfPYR0.css","assets/bilan-CVy8TMzD.js","assets/BilanMensuel-bNqKYrme.js","assets/Branches-doGoVwyr.js","assets/bridges-BcucD9PB.js","assets/caisse-du-soir-C03PEJfQ.js","assets/Caisse-RawY6nka.js","assets/Caisses-C_C_Y9wN.js","assets/Calendrier-Bf2UQzCC.js","assets/campagnes-pur-BsOdXFBa.js","assets/Carnet-BMWxgyvA.js","assets/carte-B7ZHcBPD.js","assets/carte-_W_-xBPj.css","assets/CarteModal-D95ztYGz.js","assets/CartesCadeaux-D6aTT6lR.js","assets/Catalogue-BHieyLWK.js","assets/CentreDeCommande-bw_O9q45.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-_UI4LCkf.js","assets/certificat-BEEagQRg.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-CEg4W7yR.js","assets/chiffre-du-jour-pur-SSxN_mKG.js","assets/ChiffreDesPrestations-CZ8pooom.js","assets/client-CIYPvuvw.js","assets/ClotureDuTiroir-C6vPx-E_.css","assets/ClotureDuTiroir-CBk2s-WP.js","assets/Coffre-DST5MYlK.js","assets/components-BS4Q9cx_.js","assets/compte-courant-ByzulCEN.js","assets/compte-D39AUDhL.js","assets/CompteCourant-BqRjU7-N.js","assets/Comptes-BKa0QFVh.js","assets/Comptoir-BWRUKk5k.js","assets/consultation-CJdUvcJ3.js","assets/consultation-CRW6QcWf.css","assets/Consultations-IhtwRb-T.js","assets/consultNotes-prDJIxew.js","assets/Conversations-D4WwB5Zo.css","assets/Conversations-DNiYyV2H.js","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-Cb4tkWBa.js","assets/currency-qfIhGmrs.js","assets/Customers-Bi9drFcD.js","assets/Dashboard-lE8ImqU5.js","assets/Dashboard-zjGteuUE.css","assets/dates-CUqOPrgU.js","assets/Demandes-BB4ckXLW.js","assets/Depenses-DgqPueq1.js","assets/dernier-message-pur-CBYWnq8m.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-B9wUC_KL.js","assets/diagnostics-au-trone-D52XnWHP.js","assets/Discussions-BEBHq7Lm.js","assets/EditeurDesOffres-6A7LoJAr.js","assets/Encaissements-Bhtl9Svy.js","assets/enfants-Dm3eORVj.js","assets/Engagements-Cj5S9MhG.css","assets/Engagements-DiF_SIAR.js","assets/EntreDeuxSeances-o0O2sQ5Z.js","assets/equipe-B_9ZHz24.css","assets/Evaluation-Dg8dPgL4.js","assets/FacturePrestataire-QvvQHSpV.js","assets/Factures-mkKQi7jU.js","assets/Fil-23HMsvSG.js","assets/finances-BMFnlkRx.css","assets/fon-BDpcJHoY.js","assets/fon-pur-CgVkbJ8O.js","assets/Fournisseurs-BLiUoOBH.js","assets/fournisseurs-iLy2kcf4.js","assets/foyer-CCXJCuxX.js","assets/Gerard-CUvkbLSl.css","assets/Gerard-DBTq8roS.js","assets/gerard-donnees-DXVvHyJ_.js","assets/gestes-conversation-vfOp2G9y.js","assets/HomeRituals-DRH6AD29.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-gwgvpAMj.js","assets/ia-centre-Cil2x1B0.js","assets/ia-diagnostic-pur-hHYxp10Y.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-recu-pur-DcucZqpR.js","assets/identite-Df3DlEwJ.js","assets/index-Didl8Epn.js","assets/index.es-Cqx86VPk.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-CXbOJdTt.js","assets/jspdf.es.min-BORFNwzJ.js","assets/JustePrix-Dg4Ny-R0.js","assets/kkiapay-Donm3sCr.js","assets/kkiapay-widget-DnUhUNd4.js","assets/laboratoire-NQUgBbuj.js","assets/Laboratoire-YOeiCo30.js","assets/LettresAuDossier-Cv7gX-6Z.js","assets/LienMndPay-CZpvL61x.js","assets/maisons-CSSFrqZy.js","assets/Marketing-B5lSN8DA.js","assets/MarketingBranche-B0WzvLRx.js","assets/Marque-rye5rR4f.js","assets/MesTaches-Cc4XUDf6.css","assets/MesTaches-D2lHdhSP.js","assets/momo-C2ZVfV9J.js","assets/MonMois-2r33t72c.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-CAsaIaGd.js","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/paliers-CMEVzImj.js","assets/Parametres-DuYACf2I.js","assets/parcours-BCgeakDg.js","assets/Parrainages-DxLUAqcQ.js","assets/Parrainages-gAHAPB_6.css","assets/pdf-D13tZtJP.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/Personas-DhXOUKK1.js","assets/Personnel-C4oKecbZ.js","assets/photo-BN6obBA0.js","assets/pilotage-D8kf1Co8.css","assets/Predictions-BpbZOjBj.js","assets/prestataires-C-FIwLgf.js","assets/Prestataires-Ddv_IGwR.js","assets/Prets-B9qzK-jY.js","assets/prevision-du-mois-pur-D6sJa5lw.js","assets/Previsions-B7Vfr7Vc.js","assets/Previsions-D-0__Buz.css","assets/previsions-pur-BSzCS4Dj.js","assets/processus-pur-BLN25j-E.js","assets/projets-3jtYq7RH.js","assets/Projets-COO7WDEE.css","assets/Projets-DFdeBN7T.js","assets/projets-pur-2ZEMRNDU.js","assets/protocoles-BubMQgt1.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-CbopxNQY.js","assets/qualification-6tB62hIT.js","assets/quiz-5qMPWZVi.js","assets/Rapport-DqX5z2o0.js","assets/RattacherUneCarte-DeGiqo5H.js","assets/Recommandations-DIp4zxoI.js","assets/regler-C5hcM02_.css","assets/regler-D_85uHMD.js","assets/regler-la-seance-serveur-BpExlC5z.js","assets/relances-pur-DsIo28uB.js","assets/releve-des-avis-D8Gfw6hE.js","assets/SalonFoyer-BByZfxG6.js","assets/secretariat-admin-C-cC4L-g.js","assets/Secretariat-CksWmkAt.js","assets/Secretariat-Cy79Zw30.css","assets/Signatures-B1xfWkgK.js","assets/SignerUnPdf-CW9jsWyz.js","assets/Synthese-CBH9e2Yg.js","assets/SyntheseGraphes-DJmw5E5S.js","assets/systeme-C3XFIa8E.css","assets/Tableau-Bm9FXlpT.js","assets/temps-BVv87kSG.js","assets/Textes-DLpOzRbT.css","assets/Textes-ms-BGnci.js","assets/tiroirs-Czd_2NuI.js","assets/trace-du-moyen-pur-Bx8-suHn.js","assets/trone-CfGCPWMq.css","assets/trone-DAwoHWGw.js","assets/ui-CplfgoBN.js","assets/useAudiences-D7F5kLmN.js","assets/vente-C7YWXkHo.css","assets/Vitrine-BWilTqQJ.css","assets/Vitrine-DHUyjFz_.js","assets/_admin-m9yybQg-.js","assets/_contrat-D7zCRPt0.js","assets/_heures-Dd5TbLEq.js","assets/_reuni-CIvqOwjQ.js","assets/_shared-CH0n7uCm.js","assets/_signature-gOEVn_yl.js","assets/_ui-BC53U0Ej.js","assets/_ui-BWMA-PlM.css"];
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
