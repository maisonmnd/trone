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
const BUILD = "20261113175627";
const A_GARDER = ["./","assets/abonnements-BIyw9EQY.js","assets/Abonnements-CG9kbTaf.js","assets/Abonnements-DTY7p2DH.css","assets/Academie-BtZQJD6m.js","assets/Acces-o1sCtyLK.js","assets/afaire-B5DLdjTc.js","assets/AFaire-rPP874Da.js","assets/Agents-CAAk7QI6.js","assets/agents-donnees-eimJ75GK.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-Dp-vorcm.js","assets/Appels-D9eQC9P-.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/Assistants-D9i2Xwmg.css","assets/Assistants-Dwsz4KZT.js","assets/AtelierDesContenus-ChUi5El0.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/Audience-CtI26z2v.js","assets/Aujourdhui-DN3NwUgx.js","assets/avant-le-fauteuil-lecture-DD8nSRRa.js","assets/AvantLeFauteuil-CLrpxh4q.js","assets/avis-fiches-DbVjX1KR.js","assets/AvisGoogle-BGQZh_fe.js","assets/AvisGoogle-DaPXfwX9.css","assets/BadgeEssai-BG6gMVm_.js","assets/besoins-F6ANx55L.js","assets/BesoinsEtRegles-B_zVoBMu.js","assets/BesoinsEtRegles-CzntMbJE.css","assets/bilan-B-bfPYR0.css","assets/bilan-D7-vzm0Y.js","assets/BilanMensuel-BNcUlikt.js","assets/Branches-BPn7upvV.js","assets/bridges-DXd1sKGk.js","assets/caisse-du-soir-C6vPx-E_.css","assets/caisse-du-soir-D-nac3jn.js","assets/Caisse-lg7DLGg-.js","assets/Caisses-DWcZhRUL.js","assets/Calendrier-xim0oYXY.js","assets/campagnes-pur-B-UPjnGx.js","assets/Carnet-RHZ23WDk.js","assets/carte-fWf5Kh8z.js","assets/carte-_W_-xBPj.css","assets/CarteModal-KvFkhQ58.js","assets/CartesCadeaux-D1s3TEU5.js","assets/Catalogue-WM49M4IE.js","assets/CentreDeCommande-CxK4tala.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-CYgiHrji.js","assets/certificat-CcSDAreH.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-BZOo5ySe.js","assets/chiffre-du-jour-pur-D4k6AtRk.js","assets/ChiffreDesPrestations-Kp-nGHV1.js","assets/client-xxzhVOls.js","assets/cloture-du-jour-DKqghskL.js","assets/ClotureDuTiroir-C8iL7-t9.js","assets/Coffre-Cd7xtDPd.js","assets/collecte-mtn-pur-Bq3uWgWT.js","assets/components-CHLwnUit.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-D2Q1oXJe.js","assets/Comptes-KZtnhiEu.js","assets/consultation-CRW6QcWf.css","assets/consultation-p9S-rbnB.js","assets/Consultations-Bl63t31t.js","assets/Consultations-DiE-2_mG.css","assets/consultNotes-CPbeLIPb.js","assets/Conversations-BMr9OgjF.js","assets/Conversations-D4WwB5Zo.css","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-BAq0OuAs.js","assets/currency-qfIhGmrs.js","assets/Customers-42FTR-vh.js","assets/Dashboard-B2x7VsE_.css","assets/Dashboard-iqoe9VHM.js","assets/dates-D3mk_Ib6.js","assets/Demandes-D-EPG8EI.js","assets/DepenseEnUnePhrase-BIGRlGqP.css","assets/DepenseEnUnePhrase-ifyUhvPw.js","assets/Depenses-oTipTGIQ.js","assets/depenses-saisie-DUkmGXrf.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-B5vVD5q9.js","assets/diagnostics-au-trone-Bdd14hsJ.js","assets/Dictee-BIQFbKhA.css","assets/Dictee-LbZH2ULE.js","assets/dictee-pur-CL4pniKo.js","assets/Discussions-CVWoSp2E.js","assets/EditeurDesOffres-DvBc2nus.js","assets/Encaissements-COqI5ocZ.js","assets/enfants-LLYQy2Jd.js","assets/Engagements-Cj5S9MhG.css","assets/engagements-coffre-Cx1e27X0.js","assets/Engagements-CRbc2i41.js","assets/EntreDeuxSeances-5onjchvi.js","assets/Evaluation-CC5HaAtb.js","assets/facture-DEYuRidx.js","assets/Factures-CQ_5OTBw.js","assets/FenetreDesCivilites-Cj2_uo0v.js","assets/FenetreDesCivilites-zfNk1aak.css","assets/FenetreDuPoint-JvH2EcNr.js","assets/Fil-Bu80ggLa.js","assets/finances-C8x7Mn4-.css","assets/fon-D-AsqXbz.js","assets/Fournisseurs-D5o1Ycpv.js","assets/fournisseurs-DnuE2GcT.js","assets/foyer-wHPp_Of_.js","assets/Gerard-Cgj-zsJh.css","assets/Gerard-Cw8_ydQx.js","assets/gerard-donnees-CyMzT9h0.js","assets/gestes-conversation-DHgQ7-R5.js","assets/heures-des-rappels-pur-Dig9pZpo.js","assets/HomeRituals-Q8iecw7b.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-D_tXAVRd.js","assets/ia-centre-BBTxBKNK.js","assets/ia-diagnostic-pur-BNtkwfR3.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-tableau-pur-p6UvREJe.js","assets/identite-EILZlIXn.js","assets/index-DOsTn-g8.js","assets/index.es-BwdEt4kr.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-BbNilt0h.js","assets/jspdf.es.min-ial7lv3T.js","assets/JustePrix-BIaTeeml.js","assets/kkiapay-BwEtriDF.js","assets/kkiapay-widget-CVmsl9OE.js","assets/Laboratoire-BnEj0zTK.js","assets/LaJournee-Bn_G0HCt.css","assets/LaJournee-DL0MahzJ.js","assets/LesPaiements-C9cEZlne.css","assets/LesPaiements-SyBPrwmW.js","assets/LettresAuDossier-CCrfw0t-.js","assets/LienMndPay-Cc6WIh3O.js","assets/Marketing-B4N7jLQh.js","assets/MarketingBranche-BgDrxdsA.js","assets/Marque-DC3OcASo.js","assets/MesPourboires-1n7ez596.js","assets/MesPourboires-CENjelyb.css","assets/MesTaches-Cc4XUDf6.css","assets/MesTaches-CIxh0N0I.js","assets/momo-C2ZVfV9J.js","assets/MonMois-Ds28PiqS.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/MtnMoMo-lCMYp5ib.js","assets/objectifs-BmmxQMLT.js","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/opale-DMiv2RWe.js","assets/oreille-B1AMUmZh.js","assets/paie-du-5-DeJq-K_U.css","assets/paie-du-5-pur-CPiCK8fv.js","assets/paie-du-5-S3alfqQb.js","assets/paie-par-mtn-BJV-2FrX.js","assets/PaieParMtn-B5n3SfU2.js","assets/paliers-Djwc4fbj.js","assets/Parametres-BwXwAMRF.js","assets/parcours-D2EEjH0Q.js","assets/Parrainages-C5cSFUzz.js","assets/Parrainages-gAHAPB_6.css","assets/PassageAvantLeFauteuil-NIJFxuQO.js","assets/pdf-Cp6RfbZ3.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/periode-des-pourboires-pur-BUWqfwov.js","assets/Personas-tDz9gP_6.js","assets/Personnel-CzEyQVHo.js","assets/photo-4L0wNISd.js","assets/pilotage-D8kf1Co8.css","assets/Pourboires-CWYTMWIY.js","assets/Predictions-BUdefEq6.js","assets/Prestataires-DiM0zNEJ.js","assets/Prets-CmyFAWnd.js","assets/PrevisionDuMois-BHexfffw.js","assets/PrevisionDuMois-DlFTw3OX.css","assets/Previsions-9BU2Vg1T.css","assets/Previsions-DUnDW2ts.js","assets/previsions-pur-CkxnbMFt.js","assets/processus-pur-R6U5QcCi.js","assets/projets-BVjEwEm3.js","assets/Projets-COO7WDEE.css","assets/Projets-CqhQSp2z.js","assets/projets-pur-2ZEMRNDU.js","assets/protocoles-BnUJKZ7A.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-_w9f9dI4.js","assets/qualification-BgpOToQr.js","assets/quiz-5qMPWZVi.js","assets/Rapport-Bq2r6EOB.js","assets/Recommandations-Cx9hyROI.js","assets/regler-Cc5FfPR5.js","assets/regler-DHR_B1Dm.css","assets/regler-par-fedapay-pur-G8CEJdGn.js","assets/relances-pur-BacTXlI2.js","assets/releve-des-avis-Dsu88OrZ.js","assets/SalonFoyer-X36hWLOY.js","assets/secretariat-admin-DDNG7qZx.js","assets/Secretariat-C7AQoZr3.js","assets/Secretariat-Cy79Zw30.css","assets/Signatures-CVaQgIwG.js","assets/SignerUnPdf-CFKMBvRe.js","assets/Synthese-B0i45zvb.js","assets/SyntheseGraphes-D722KRVj.js","assets/systeme-TPy-pF7j.css","assets/Tableau-Btk24zfS.js","assets/temps-cksTLKUz.js","assets/Textes-DLpOzRbT.css","assets/Textes-_BjLEirp.js","assets/tiroirs-CkDzpGy0.css","assets/tiroirs-DxjiXxfW.js","assets/trone-BHY76HAE.js","assets/trone-Dg6wh-u1.css","assets/useAudiences-DzjAPgV2.js","assets/useClotureDuJour-BC3WzdXd.js","assets/visios-rCLS5WuA.js","assets/Vitrine-BWilTqQJ.css","assets/Vitrine-Cs1-n-L9.js","assets/_admin-CvkVLsG0.js","assets/_contrat-DVSwSs17.js","assets/_reuni-al-y03oL.js","assets/_shared-Dc9b_LOl.js","assets/_signature-CSBuhvIy.js","assets/_ui-BrUDlmuM.css","assets/_ui-BvOeX62a.js"];
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
