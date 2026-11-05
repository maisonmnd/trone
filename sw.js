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
const BUILD = "20261105071901";
const A_GARDER = ["./","assets/abonnements-Bzv-gJXP.js","assets/Abonnements-CTIalUYY.js","assets/Academie-Cb9Bxzf8.js","assets/Acces-Q6tYzlwC.js","assets/afaire-C3aWh5bA.js","assets/AFaire-CECs_yid.js","assets/Agents-DfinMOls.js","assets/agents-donnees-CT6c2bfj.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-DMPg-Usy.js","assets/Appels-C5AEBWt-.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/Assistants-BOcxTwZO.css","assets/Assistants-WkxySdxF.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/AtelierDesContenus-tMmKp4cB.js","assets/Audience-Csk7rTPV.js","assets/Aujourdhui-lM-WC7sv.js","assets/avant-le-fauteuil-lecture-CAIGnSph.js","assets/AvantLeFauteuil-CCDU86VT.js","assets/avis-fiches-BjUx9O7F.js","assets/AvisGoogle-DaPXfwX9.css","assets/AvisGoogle-DwQ1t5UQ.js","assets/bilan-B-bfPYR0.css","assets/bilan-Fnn8to7v.js","assets/BilanMensuel-NOaP8UCt.js","assets/Branches-75-ZEfg_.js","assets/bridges-DAr2DpDd.js","assets/Caisse-D0zcpizJ.js","assets/caisse-du-soir-CB0rF3Th.js","assets/Caisses-BoQTe5Dn.js","assets/Calendrier-CIKQJBW0.js","assets/campagnes-pur-D6COXIex.js","assets/Carnet-CBhGvmjd.js","assets/carte-D-glUK9o.js","assets/carte-_W_-xBPj.css","assets/CarteModal-DzSHyol5.js","assets/CartesCadeaux-v39aYtCq.js","assets/Catalogue-BfogVZO3.js","assets/CentreDeCommande-BClrt6-h.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-uBntdr-k.js","assets/certificat-D6zc0vcr.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-3ESrP9bO.js","assets/ChiffreDesPrestations-DKU-g_h7.js","assets/client-DSFFR6wo.js","assets/cloture-du-jour-DQCQtZLX.js","assets/ClotureDuTiroir-C6vPx-E_.css","assets/ClotureDuTiroir-Djnx5Iqn.js","assets/Coffre-m7aIW2_A.js","assets/components-C-dv2IeD.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant--0xM5V_L.js","assets/Comptes-7sRxbYRs.js","assets/consultation-C0nZJsOK.js","assets/consultation-CRW6QcWf.css","assets/Consultations-CO8oGb5c.js","assets/consultNotes-Csz4BdHE.js","assets/Conversations-D3AqMQK7.js","assets/Conversations-D4WwB5Zo.css","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-jJnOFkxi.js","assets/currency-qfIhGmrs.js","assets/Customers-DZQ7n4En.js","assets/Dashboard-hP15mjq9.js","assets/Dashboard-zjGteuUE.css","assets/dates-DAXNRYZE.js","assets/Demandes-BHCrMrHC.js","assets/Depenses-DzxZKDLP.js","assets/depenses-saisie-BgrbPJxk.js","assets/dernier-message-pur-CBYWnq8m.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-ofkA0_Q8.js","assets/diagnostics-au-trone-Bh2WVzpe.js","assets/Dictee-ChokOCuL.js","assets/Dictee-D2P9yM7v.css","assets/dictee-pur-Cf4WUrBu.js","assets/Discussions-BevWp1QX.js","assets/EditeurDesOffres-35ceAGFP.js","assets/Encaissements-Piny3Jum.js","assets/enfants-D2LaMgOH.js","assets/Engagements-BJPeDUPO.js","assets/Engagements-Cj5S9MhG.css","assets/EntreDeuxSeances-B07OT_Dh.js","assets/Evaluation-De2ynxb5.js","assets/FacturePrestataire-DzyraoID.js","assets/Factures-Debl5bYr.js","assets/FenetreDesCivilites-CCOYxYpU.js","assets/FenetreDesCivilites-zfNk1aak.css","assets/FenetreDuPoint-BZ1PcNqp.js","assets/Fil-6qpVPTjx.js","assets/finances-BMFnlkRx.css","assets/fon-DOsvsnZv.js","assets/fournisseurs-CoKp28vw.js","assets/Fournisseurs-DDxTGEFY.js","assets/foyer-D_Sr-IOH.js","assets/Gerard-C5FqRwCg.js","assets/gerard-donnees-BKAx3Cai.js","assets/Gerard-kOIEy-PT.css","assets/gestes-conversation-CEuaPPHD.js","assets/HomeRituals-DoIwd0Kd.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-BBCuR5Tw.js","assets/ia-centre-Cce1whYY.js","assets/ia-diagnostic-pur-BBLrGY5l.js","assets/ia-marque-pur-C5lSdGpx.js","assets/identite-D5uLcKPQ.js","assets/index-0CoZ33fb.js","assets/index.es-_uIJldxO.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-CcgC2ZRv.js","assets/jspdf.es.min-DO_yScEb.js","assets/JustePrix-BidzeBRN.js","assets/kkiapay-DDCZ-JR3.js","assets/kkiapay-widget-DnUhUNd4.js","assets/la-journee-ABYvmnK2.js","assets/la-journee-DNg04cPb.css","assets/Laboratoire-CEnt9ifp.js","assets/LaJournee-DJnemmma.js","assets/LettresAuDossier-Bz_F1r65.js","assets/LienMndPay-BQug79sj.js","assets/maisons-CSSFrqZy.js","assets/Marketing-DTKK7Zh5.js","assets/MarketingBranche-DRFVlHUs.js","assets/Marque-D0cfajnJ.js","assets/MesPourboires-D9I_9rZf.css","assets/MesPourboires-H0O4Soxa.js","assets/MesTaches-Cc4XUDf6.css","assets/MesTaches-CNibi8aR.js","assets/momo-C2ZVfV9J.js","assets/MonMois-BRIwrG5b.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-CWk0Oo21.js","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/opale-47DR7gS_.js","assets/paliers-Ww_PM2yp.js","assets/Parametres-B7PRVcyr.js","assets/parcours-BxMjn1CH.js","assets/Parrainages-gAHAPB_6.css","assets/Parrainages-PH14odVp.js","assets/PassageAvantLeFauteuil-3N_AvtFT.js","assets/pdf-Depz1vlq.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/Personas-LOPL40Lv.js","assets/Personnel-DpimM029.js","assets/photo-BI1o0-BF.js","assets/pilotage-D8kf1Co8.css","assets/Pourboires-h5cqBfvu.js","assets/Predictions-CETZPMb5.js","assets/Prestataires-DCU91o6S.js","assets/Prets-BwDtebnJ.js","assets/prevision-du-mois-pur-D6sJa5lw.js","assets/Previsions-D-0__Buz.css","assets/Previsions-hoDXAzKb.js","assets/previsions-pur-CXuJXfUa.js","assets/processus-pur-BLN25j-E.js","assets/Projets-COO7WDEE.css","assets/Projets-DWjk6fRO.js","assets/projets-Dwp3FR27.js","assets/projets-pur-2ZEMRNDU.js","assets/protocoles-PnvZY6x0.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-h6JNwBCE.js","assets/qualification-DWcM-Soe.js","assets/quiz-5qMPWZVi.js","assets/Rapport-BIrCMgWM.js","assets/Recommandations-7eeix8mr.js","assets/regler-C5hcM02_.css","assets/regler-la-seance-serveur-Bs6rzqZX.js","assets/regler-TXe3CYf0.js","assets/relances-pur-lwRTXc5E.js","assets/releve-des-avis-CH6ZEHId.js","assets/SalonFoyer-BY0ThylS.js","assets/secretariat-admin-CT4Lafjv.js","assets/Secretariat-Cy79Zw30.css","assets/Secretariat-DgeyJvfF.js","assets/Signatures-BXW6s1iC.js","assets/SignerUnPdf-D1CA9E_B.js","assets/Synthese-Fay9qvEM.js","assets/SyntheseGraphes-BKD7mahp.js","assets/systeme-TPy-pF7j.css","assets/Tableau-C43UeHcT.js","assets/temps-DZVyKI18.js","assets/Textes-C851y5-5.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-6XvUYu5v.js","assets/tiroirs-CkDzpGy0.css","assets/trone-CYqZouDL.js","assets/trone-DQVzvvmA.css","assets/useAudiences-ttyOXdIj.js","assets/Vitrine-BWilTqQJ.css","assets/Vitrine-CCoBUvqf.js","assets/_admin-BnhkpDxq.js","assets/_contrat-DPaXe-Oy.js","assets/_heures-nRxZJPi0.js","assets/_reuni-F2ei1IFC.js","assets/_shared-BJl6NQri.js","assets/_signature-BeAVzhWR.js","assets/_ui-BWMA-PlM.css","assets/_ui-De2ZVie6.js"];
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
