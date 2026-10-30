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
const BUILD = "20261030070533";
const A_GARDER = ["./","assets/Abonnements-DNE8VhiB.js","assets/abonnements-KmjNzHQt.js","assets/Academie-C1HsQcfe.js","assets/Acces-vxPcUSGr.js","assets/actions-BzT8Da8c.js","assets/afaire-BlUzElSr.js","assets/AFaire-Bs6r1AD1.js","assets/agents-donnees-CDvakozr.js","assets/Agents-DSY5h68Q.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-CPbzSifg.js","assets/Appels-BpBojZ2e.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/AtelierDesContenus-D2a0jDNq.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/AuComptoir-ZFfbAZlr.js","assets/Audience-IcK-34Y5.js","assets/Aujourdhui-BeKoS1da.js","assets/avis-fiches-BpMLuX_v.js","assets/AvisGoogle-Bo9CyRwp.js","assets/AvisGoogle-DaPXfwX9.css","assets/bilan-B-bfPYR0.css","assets/bilan-DdKZlWNd.js","assets/BilanMensuel-CgQGnXRZ.js","assets/Branches-BEnCh2eF.js","assets/bridges-B07BXDIs.js","assets/Caisse-DrtaIPrb.js","assets/caisse-du-soir-BEul2VSQ.js","assets/Caisses-C9biBheT.js","assets/Calendrier-CZ18_5w-.js","assets/campagnes-pur-DD4uvUgW.js","assets/Carnet-DfRaHfeO.js","assets/carte-CCoMj6EH.js","assets/carte-_W_-xBPj.css","assets/CarteModal-C5a8U06n.js","assets/CartesCadeaux-C6Cr1YIq.js","assets/Catalogue-B5HXdHsT.js","assets/CentreDeCommande-Dog21jS0.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-BpSFLH1S.js","assets/certificat-CT8112TS.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-usYafS8Y.js","assets/chiffre-du-jour-pur-TlI4oEYg.js","assets/ChiffreDesPrestations-B7HLEBIs.js","assets/client-CwqDVgkO.js","assets/ClotureDuTiroir-BvrEAlS2.js","assets/ClotureDuTiroir-C6vPx-E_.css","assets/Coffre-D816dbhO.js","assets/components-_ppezPrP.js","assets/compte-courant-ByzulCEN.js","assets/compte-Dzp9YYtZ.js","assets/CompteCourant-BNjS7SaL.js","assets/Comptes-vvwiV9yF.js","assets/Comptoir-BZ8nlcBW.js","assets/consultation-CRW6QcWf.css","assets/consultation-DuWGWxlQ.js","assets/Consultations-DsO1RV-E.js","assets/consultNotes-DYHNbD2-.js","assets/Conversations-D4WwB5Zo.css","assets/Conversations-DOeCv_i3.js","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-4wdN103B.js","assets/currency-qfIhGmrs.js","assets/Customers-CkXnvj2y.js","assets/Dashboard-D3lJhrDG.js","assets/Dashboard-zjGteuUE.css","assets/dates-CFremOYn.js","assets/Demandes-QpGicvVw.js","assets/Depenses-VFnXomZ3.js","assets/dernier-message-pur-CBYWnq8m.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-B2Y5RV-b.js","assets/diagnostics-au-trone-CROcnZEK.js","assets/Discussions-a1ZbMysB.js","assets/EditeurDesOffres-BXmwBo5Z.js","assets/Encaissements-BbbKyy3W.js","assets/enfants-o-aTduYO.js","assets/Engagements-C1QRmkyW.js","assets/Engagements-Cj5S9MhG.css","assets/EntreDeuxSeances-CI6-TUGz.js","assets/equipe-B_9ZHz24.css","assets/Evaluation-MoXeyZNk.js","assets/FacturePrestataire-BM_dEank.js","assets/Factures-DiY77cLS.js","assets/FenetreDesCivilites-B0rxIE1s.js","assets/FenetreDesCivilites-zfNk1aak.css","assets/FenetreDuPoint-CRV1Rotw.js","assets/Fil-BPDSH6ck.js","assets/finances-BMFnlkRx.css","assets/fon-7YMDOBTb.js","assets/fon-pur-CgVkbJ8O.js","assets/Fournisseurs-BnIwC_8N.js","assets/fournisseurs-BoPtTBkT.js","assets/foyer-DN6jeljj.js","assets/Gerard-C193Ww82.js","assets/Gerard-C9ljG_Nk.css","assets/gerard-donnees-DvmWtOxc.js","assets/gestes-conversation-CXskzAb0.js","assets/HomeRituals-BAgQFmxA.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-BbHV28Zv.js","assets/ia-centre-C_Rx0SYB.js","assets/ia-diagnostic-pur-hHYxp10Y.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-recu-pur-DcucZqpR.js","assets/identite-DhD3uR_q.js","assets/index-AeMpZwtI.js","assets/index.es-BbEGok2y.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-DO2Ie3y1.js","assets/jspdf.es.min-B20J5mfD.js","assets/JustePrix-BBuIP_P-.js","assets/kkiapay-DVcHUusm.js","assets/kkiapay-widget-DnUhUNd4.js","assets/laboratoire-CSpWb2Gh.js","assets/Laboratoire-D0vL0-s7.js","assets/LettresAuDossier-B2PTeQw_.js","assets/LienMndPay-bt8EaVJE.js","assets/maisons-CSSFrqZy.js","assets/Marketing-i1Lnwq9a.js","assets/MarketingBranche-B0YHTQ4S.js","assets/Marque-Dp69rzTU.js","assets/MesTaches-cbhQUhry.js","assets/MesTaches-Cc4XUDf6.css","assets/momo-B-QSeWY6.js","assets/MonMois-Ocp4Ll0u.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/objectifs-kTlUPPPZ.js","assets/paliers-iQWVG9EC.js","assets/Parametres-BvaBour_.js","assets/parcours-BFJuSqCG.js","assets/Parrainages-CuD9glJg.js","assets/Parrainages-gAHAPB_6.css","assets/pdf-BXZeKDMW.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/Personas-BO6mDomP.js","assets/Personnel-DELbO58j.js","assets/photo-DuSAttAq.js","assets/pilotage-D8kf1Co8.css","assets/Predictions-b_69_Q64.js","assets/Prestataires-CtMoAoQz.js","assets/prestataires-D22Il_kV.js","assets/Prets-SDpygx4L.js","assets/prevision-du-mois-pur-D6sJa5lw.js","assets/Previsions-D-0__Buz.css","assets/Previsions-DPuHTCPs.js","assets/previsions-pur-qReTMsCo.js","assets/processus-pur-BLN25j-E.js","assets/Projets-COO7WDEE.css","assets/Projets-DQeiZOrS.js","assets/projets-fKMGjxi2.js","assets/projets-pur-2ZEMRNDU.js","assets/protocoles-omTuiKwj.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-CIOpuyS6.js","assets/qualification-C90Mh8jd.js","assets/quiz-5qMPWZVi.js","assets/Rapport-HpKRrcvF.js","assets/RattacherUneCarte-BmFn0I7J.js","assets/Recommandations-BHdyiPrz.js","assets/regler-B7jIFkUX.js","assets/regler-C5hcM02_.css","assets/regler-la-seance-serveur-Bs6rzqZX.js","assets/relances-pur-CTGdiNru.js","assets/releve-des-avis-Da6G48E-.js","assets/SalonFoyer-DdirIz_z.js","assets/secretariat-admin-C0s9iAeF.js","assets/Secretariat-BLgsuqXT.js","assets/Secretariat-Cy79Zw30.css","assets/Signatures-BKCF26NK.js","assets/SignerUnPdf-BG7IKM1B.js","assets/Synthese-CCzCwrb9.js","assets/SyntheseGraphes-DJsebig4.js","assets/systeme-TPy-pF7j.css","assets/Tableau-xgDc5mev.js","assets/temps-CdhGsdYi.js","assets/Textes-DLpOzRbT.css","assets/Textes-khQoXleq.js","assets/tiroirs-fzcS9YIC.js","assets/trace-du-moyen-pur-Bx8-suHn.js","assets/trone-9siIy66m.css","assets/trone-BGWd-Cig.js","assets/ui-DgKnt6T1.js","assets/useAudiences-DKc_5k8U.js","assets/vente-C7YWXkHo.css","assets/Vitrine-BWilTqQJ.css","assets/Vitrine-utbyy5t1.js","assets/_admin-BjH_7SfO.js","assets/_contrat-DSyZtggt.js","assets/_heures-Uy8hVAsM.js","assets/_reuni-BLx4IRxd.js","assets/_shared-Dm6PF84U.js","assets/_signature-BnBz9pLm.js","assets/_ui-BWMA-PlM.css","assets/_ui-whtc_p59.js"];
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
