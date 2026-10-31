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
const BUILD = "20261031233223";
const A_GARDER = ["./","assets/abonnements-Bg94jeJN.js","assets/Abonnements-uOOYzFND.js","assets/Academie-DyXIv-uM.js","assets/Acces-XW6Q4G05.js","assets/actions-C04TGd27.js","assets/AFaire-B131UfeB.js","assets/afaire-CbgqQI5e.js","assets/Agents-BCg3szf1.js","assets/agents-donnees-D_Ywaa9Q.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-Bn0M2ADM.js","assets/Appels-e7tWRPVe.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/Assistants-DuKb9pk7.css","assets/Assistants-HvRZl_Do.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/AtelierDesContenus-DejwczFp.js","assets/AuComptoir-KF3bvTow.js","assets/Audience-D9lRpKIO.js","assets/Aujourdhui-JlT9QVk5.js","assets/avant-le-fauteuil-lecture-CvsxXDwL.js","assets/AvantLeFauteuil-BSe0WX2l.js","assets/avis-fiches-VFynTEK7.js","assets/AvisGoogle-C-blRz72.js","assets/AvisGoogle-DaPXfwX9.css","assets/bilan-B-bfPYR0.css","assets/bilan-Dw1N54XZ.js","assets/BilanMensuel-DI8846wq.js","assets/Branches-sNR51WSw.js","assets/bridges-BYmwZHlV.js","assets/Caisse-BQe9iRsG.js","assets/caisse-du-soir-DKsop3ll.js","assets/Caisses-aqFpGQDW.js","assets/Calendrier-Jhrq5MMw.js","assets/campagnes-pur-CTye5Fzf.js","assets/Carnet-CvSCWDaj.js","assets/carte-CGMzNies.js","assets/carte-_W_-xBPj.css","assets/CarteModal-Br93C-_6.js","assets/CartesCadeaux-9GiuCida.js","assets/Catalogue-Cp_cjeJc.js","assets/CentreDeCommande-Du8kyJhp.css","assets/CentreDeCommande-Ib6lUcEt.js","assets/Cercle-BvMcZxx8.js","assets/certificat-nQEM--qL.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-C2I6bl80.js","assets/ChiffreDesPrestations-K4DaZt-i.js","assets/client-DwwVYo6N.js","assets/ClotureDuTiroir-C6vPx-E_.css","assets/ClotureDuTiroir-CsOvgECX.js","assets/Coffre-Qcs0oW5x.js","assets/components-CMzqc5gE.js","assets/compte-courant-ByzulCEN.js","assets/compte-DTaMBuCr.js","assets/CompteCourant-DxrHD_Gi.js","assets/Comptes-ew9vp8xK.js","assets/Comptoir-EzZ1J5ao.js","assets/consultation-CRW6QcWf.css","assets/consultation-LqExDXKv.js","assets/Consultations-DwjRxEQf.js","assets/consultNotes-TkJAPfi5.js","assets/Conversations-ColpiIP_.js","assets/Conversations-D4WwB5Zo.css","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-Dw8Sb17t.js","assets/currency-qfIhGmrs.js","assets/Customers-DgYCsst-.js","assets/Dashboard-D28XYpI3.js","assets/Dashboard-zjGteuUE.css","assets/dates-CpqbU1GC.js","assets/Demandes-BIMG5qUI.js","assets/Depenses-DeWEydbG.js","assets/dernier-message-pur-CBYWnq8m.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-CrYoBVUs.js","assets/diagnostics-au-trone-4IbeHSxw.js","assets/Dictee-D2P9yM7v.css","assets/Dictee-DK7Qqcv_.js","assets/dictee-pur-s3cPndEG.js","assets/Discussions-DNj16s1h.js","assets/EditeurDesOffres-CXbqnDQG.js","assets/Encaissements-CYHjJMx4.js","assets/enfants-Clqu2aaQ.js","assets/Engagements-bOeTyCPm.js","assets/Engagements-Cj5S9MhG.css","assets/EntreDeuxSeances-DmWs-B0W.js","assets/equipe-B_9ZHz24.css","assets/Evaluation-DVM8IbUa.js","assets/FacturePrestataire-FGIrBMYF.js","assets/Factures-DofeyeDr.js","assets/FenetreDesCivilites-Bt6e5obO.js","assets/FenetreDesCivilites-zfNk1aak.css","assets/FenetreDuPoint-HcAbsoNg.js","assets/Fil-5HWmVlW2.js","assets/finances-BMFnlkRx.css","assets/fon-CB141C0W.js","assets/fon-pur-CgVkbJ8O.js","assets/Fournisseurs-CeSJhoVh.js","assets/fournisseurs-CMpr8ykr.js","assets/foyer-Dyftu4m2.js","assets/Gerard-B6b2BPbl.js","assets/Gerard-DJzQpZkw.css","assets/gerard-donnees-0fgs6D1D.js","assets/gestes-conversation-Cm3nPrT-.js","assets/HomeRituals-Cb6YCHDI.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-C35PSQXD.js","assets/ia-centre-DIMQsZ0W.js","assets/ia-diagnostic-pur-BBLrGY5l.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-recu-pur-DcucZqpR.js","assets/identite-9m1FGmFm.js","assets/index-DxtRjrVe.js","assets/index.es-EOR3baai.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-CnlPyx3h.js","assets/jspdf.es.min-cduQEhGa.js","assets/JustePrix-BqLxQs7y.js","assets/kkiapay-P0BDbnKe.js","assets/kkiapay-widget-DnUhUNd4.js","assets/laboratoire-BOdHhvFu.js","assets/Laboratoire-CfDTztK4.js","assets/LettresAuDossier-FMi4Enkv.js","assets/LienMndPay-CfRXloUm.js","assets/maisons-CSSFrqZy.js","assets/Marketing-BQg6trVT.js","assets/MarketingBranche-B9Bspesd.js","assets/Marque-BRGAdxAh.js","assets/MesTaches-BmMznNeY.js","assets/MesTaches-Cc4XUDf6.css","assets/missions-prestataires-DluXN0kp.js","assets/momo-B-QSeWY6.js","assets/MonMois-39kLpAkg.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-CR7Hw5IY.js","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/paliers-BiuSsMOK.js","assets/Parametres-TVc9rbHY.js","assets/parcours-kGqubfmL.js","assets/Parrainages-DSK516Oh.js","assets/Parrainages-gAHAPB_6.css","assets/PassageAvantLeFauteuil-BZRdnGfT.js","assets/pdf-0g-RQ-Of.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/Personas-D0fiXu-p.js","assets/Personnel-BUtskNMM.js","assets/photo-DBbFa6BJ.js","assets/pilotage-D8kf1Co8.css","assets/Predictions-BaCCnn51.js","assets/Prestataires-DRlLu3yq.js","assets/Prets-DLM_CIy0.js","assets/prevision-du-mois-pur-D6sJa5lw.js","assets/Previsions-D-0__Buz.css","assets/Previsions-DJorkOnR.js","assets/previsions-pur-Dq_bcarN.js","assets/processus-pur-BLN25j-E.js","assets/projets-AyxRyuEd.js","assets/Projets-COO7WDEE.css","assets/projets-pur-2ZEMRNDU.js","assets/Projets-RkOvNSyc.js","assets/protocoles-KigBIYe3.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-D0K4J84k.js","assets/qualification-Dhh25_Dd.js","assets/quiz-5qMPWZVi.js","assets/Rapport-GKG8-PC4.js","assets/RattacherUneCarte-CINpdLf1.js","assets/Recommandations-BqGWJSAC.js","assets/regler-C5hcM02_.css","assets/regler-DJfkCU0Q.js","assets/regler-la-seance-serveur-Bs6rzqZX.js","assets/relances-pur-lwRTXc5E.js","assets/releve-des-avis-D-AKTu7C.js","assets/SalonFoyer-CRaea56A.js","assets/secretariat-admin-G8H0LLSG.js","assets/Secretariat-Cy79Zw30.css","assets/Secretariat-fOu0gbHg.js","assets/Signatures-x03eNJIA.js","assets/SignerUnPdf-C1z-2ypD.js","assets/Synthese-BM0LTrdJ.js","assets/SyntheseGraphes-LNWViU84.js","assets/systeme-TPy-pF7j.css","assets/Tableau-DA2igmG5.js","assets/temps-Dvo4OGGC.js","assets/Textes-DLpOzRbT.css","assets/Textes-pT1bYLWK.js","assets/tiroirs-DykfRy83.js","assets/trace-du-moyen-pur-Bx8-suHn.js","assets/trone-B6jFQMGx.css","assets/trone-Buffv56A.js","assets/ui-CwUeN5O_.js","assets/useAudiences-eDD_s9dq.js","assets/vente-C7YWXkHo.css","assets/Vitrine-BWilTqQJ.css","assets/Vitrine-DMUM9joO.js","assets/_admin-Bekh_l9h.js","assets/_contrat-DiB6dHJI.js","assets/_heures-Bw1OeCoe.js","assets/_reuni-CMOy97sE.js","assets/_shared-D-5usdE3.js","assets/_signature-qeJ0Vz7Z.js","assets/_ui-BWMA-PlM.css","assets/_ui-cLkiJMWY.js"];
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
