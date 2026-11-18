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
const BUILD = "20261118194408";
const A_GARDER = ["./","assets/Abonnements-BNE8sgrp.js","assets/abonnements-D9B2154U.js","assets/Abonnements-DTY7p2DH.css","assets/Academie-GpLqwDA_.js","assets/Acces-BQVI60OP.js","assets/afaire-BfV8q-SV.js","assets/AFaire-CH5trewE.js","assets/Agents-Boj-rAOm.js","assets/agents-donnees-BNDwPix6.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-qICLERcL.js","assets/App-QVO6OUO4.js","assets/Appels-BbFx0zMI.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/Assistants-CKm2X4cN.js","assets/Assistants-D9i2Xwmg.css","assets/AtelierDesContenus-CBNnrZkA.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/Audience-Z6IvX186.js","assets/Aujourdhui-BNUmCO_3.js","assets/auth-CXUtf0DV.js","assets/avant-le-fauteuil-lecture-BjFUFGn8.js","assets/AvantLeFauteuil-bA3x2Z8c.js","assets/avis-fiches-mCPCkOW7.js","assets/AvisGoogle-C1ZPeCcq.js","assets/AvisGoogle-DaPXfwX9.css","assets/BadgeEssai-MeV7_r_p.js","assets/BadgeSuggere-Dvsdinxu.js","assets/besoins-zcdhlToB.js","assets/BesoinsEtRegles-BLwxGVV5.css","assets/BesoinsEtRegles-tC8mpd1V.js","assets/bilan-B-bfPYR0.css","assets/bilan-BoFSGO0j.js","assets/BilanMensuel-BKnBvyrb.js","assets/Branches-CUz4rL5L.js","assets/bridges-BEh0n60j.js","assets/Caisse-DKmYpqhh.js","assets/caisse-du-soir-C6vPx-E_.css","assets/caisse-du-soir-CakrWl3a.js","assets/Caisses-DuI6n-1l.js","assets/Calendrier-BZbu3n1e.js","assets/campagnes-pur-BV2oMQIL.js","assets/Carnet-D8UueGXl.js","assets/carte-K2EgB1RX.js","assets/carte-_W_-xBPj.css","assets/CarteModal-DgfIpjiv.js","assets/CartesCadeaux-Cq-8TUed.js","assets/Catalogue-DAOtqhAP.js","assets/CentreDeCommande-CK4nFnkE.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-BJ4WJX9Z.js","assets/certificat-an0xAYU0.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-CPrr_bJK.js","assets/chiffre-du-jour-pur-BoCV0OFM.js","assets/ChiffreDesPrestations-CxSKdPmi.js","assets/client-B2oCtdCq.js","assets/cloture-du-jour-D9m4RbdK.js","assets/ClotureDuTiroir-hctzE6hO.js","assets/Coffre-Bpe8FhUb.js","assets/collecte-mtn-pur-Bq3uWgWT.js","assets/components-BJ5Dixdu.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-Cb8lgIyx.js","assets/Comptes-BiqsMnSG.js","assets/consultation-CRW6QcWf.css","assets/consultation-DQBVybW-.js","assets/Consultations-DiE-2_mG.css","assets/Consultations-DqtT4o-g.js","assets/consultNotes-sE2xwyIs.js","assets/Conversations-BQPxFeWu.js","assets/Conversations-D4WwB5Zo.css","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-BjPasYJN.js","assets/currency-Cd0clE4P.js","assets/Customers-BpmqxjvS.js","assets/Dashboard-B2x7VsE_.css","assets/Dashboard-BqEduxoR.js","assets/dates-DyKr2y1f.js","assets/Demandes-BHpWp74g.js","assets/DepenseEnUnePhrase-BIGRlGqP.css","assets/DepenseEnUnePhrase-C3SjjO4F.js","assets/Depenses-CFiLGGBN.js","assets/depenses-saisie-FNNwNslQ.js","assets/devis-remis-B8UTfAeP.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-Bh-XoNv3.js","assets/diagnostics-au-trone-BwefVQbY.js","assets/Dictee-C-pUYYFA.css","assets/dictee-pur-ColPASdt.js","assets/Dictee-_uCr3a09.js","assets/Discussions-DnecUYmu.js","assets/echappe-html-pur-gEhHOM07.js","assets/EditeurDesOffres-BTCP5I6H.js","assets/Encaissements-CzJG0qRe.js","assets/enfants-Bh9_xpt_.js","assets/Engagements-Cj5S9MhG.css","assets/engagements-coffre-DU1yerAX.js","assets/Engagements-CSlG-jCS.js","assets/EntreDeuxSeances-C3RxF9XB.js","assets/es-BJgVY8uS.js","assets/Evaluation-BjqD52GG.js","assets/facture-BQY3AO_z.js","assets/Factures-DykCuH0p.js","assets/FenetreDeLAgent-DnGtKKT1.js","assets/FenetreDesCivilites-zfNk1aak.css","assets/FenetreDesCivilites-_1TeLlgh.js","assets/FenetreDuPoint-pzQIG3p7.js","assets/Fil-CP30Zf4o.js","assets/finances-C8x7Mn4-.css","assets/fon-BnbtQlGi.js","assets/Fournisseurs-D9A2VzND.js","assets/fournisseurs-x3he3X0Q.js","assets/foyer-BE7qDnmD.js","assets/gerard-donnees-D2EVzaf5.js","assets/Gerard-mtwRBwxB.js","assets/Gerard-vo2IWvP3.css","assets/gestes-conversation-cM17A2ql.js","assets/heures-des-rappels-pur-BWJPB8OP.js","assets/HomeRituals-B0k-L_IL.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-B4yF2MFY.js","assets/ia-centre-CwGUmuH6.js","assets/ia-diagnostic-pur-qGnFEvys.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-tableau-pur-p6UvREJe.js","assets/identite-CpCb9TlJ.js","assets/index.es-tSwLnif9.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-B-IIcmQP.js","assets/jspdf.es.min-CNJjsB2H.js","assets/JustePrix-CoEw1I8Q.js","assets/kkiapay-7BrFPYc7.js","assets/kkiapay-widget-CVmsl9OE.js","assets/Laboratoire-DVedWJf0.js","assets/LaJournee-Bn_G0HCt.css","assets/LaJournee-C--KFC7s.js","assets/le-caissier-pur-BGmZxA41.js","assets/LesPaiements-C9cEZlne.css","assets/LesPaiements-Dz0KQUXl.js","assets/LettresAuDossier-QAZVFjZb.js","assets/LienMndPay-C1QrikOk.js","assets/Marketing-Bb-5ijTA.js","assets/MarketingBranche-DwWtP9Yk.js","assets/Marque-DUK_WrQi.js","assets/MesPourboires-CENjelyb.css","assets/MesPourboires-DCgnfWcr.js","assets/MesTaches-Cc4XUDf6.css","assets/MesTaches-CmbnH3z5.js","assets/momo-C2ZVfV9J.js","assets/MonMois-6IWLQeE1.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/MtnMoMo-C1SgZ5yu.js","assets/objectifs-B33y5oci.js","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/opale-BdJpkpMj.js","assets/oreille-B1AMUmZh.js","assets/paie-du-5-BM7PDzNA.js","assets/paie-du-5-DeJq-K_U.css","assets/paie-du-5-pur-CPiCK8fv.js","assets/paie-par-mtn-u88HaMkG.js","assets/PaieParMtn-K-appiZP.js","assets/paliers-CgNGjISe.js","assets/Parametres-jM6j-FiV.js","assets/parcours-BlTubav0.js","assets/Parrainages-CwksCicC.js","assets/Parrainages-gAHAPB_6.css","assets/PassageAvantLeFauteuil-CYoa2f5T.js","assets/pdf-C3-4zCSh.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/periode-des-pourboires-pur-BUWqfwov.js","assets/Personas-CwotX8ht.js","assets/Personnel-BeHVUMLa.js","assets/photo-C7HM9Ag_.js","assets/pilotage-D8kf1Co8.css","assets/porte-de-l-equipe-eeBsBkqZ.js","assets/Pourboires-DlG2Tg4Z.js","assets/Predictions-DanGVBiq.js","assets/preload-helper-BRe_O-Rg.js","assets/Prestataires-C9nkcKFb.js","assets/Prets-B57rjsZv.js","assets/PrevisionDuMois-CVOsYOy3.js","assets/PrevisionDuMois-DlFTw3OX.css","assets/Previsions-9BU2Vg1T.css","assets/Previsions-B4fAn0Kh.js","assets/previsions-pur-9l2mauao.js","assets/processus-pur-R6U5QcCi.js","assets/Projets-COO7WDEE.css","assets/projets-DbD2TcUl.js","assets/projets-pur-2ZEMRNDU.js","assets/Projets-WAVzWc0P.js","assets/protocoles-eDfzKHuQ.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-D5Trsm0B.js","assets/quiz-5qMPWZVi.js","assets/Rapport-Gy1FD2eu.js","assets/Recommandations-DPNUyO6h.js","assets/regler-DHR_B1Dm.css","assets/regler-EV_CpYe_.js","assets/regler-par-fedapay-pur-G8CEJdGn.js","assets/relances-pur-BacTXlI2.js","assets/releve-des-avis-Cntol4w-.js","assets/SalonFoyer-DawWhUAm.js","assets/secretariat-admin-iWol8Hm2.js","assets/Secretariat-Cy79Zw30.css","assets/Secretariat-D44o3bUm.js","assets/Signatures-B4ULfJ9E.js","assets/SignerUnPdf-fdSLWTtG.js","assets/Synthese-CGdan31e.js","assets/SyntheseGraphes-5nbmxZFC.js","assets/systeme-TPy-pF7j.css","assets/Tableau-D4ZSYe9_.js","assets/temps-De52NVzz.js","assets/Textes-D7U_5vsv.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-CkDzpGy0.css","assets/tiroirs-xSrQrN7Q.js","assets/trone-1foIH0HT.js","assets/trone-BvySetPd.css","assets/useAudiences-XAmnm36E.js","assets/useClotureDuJour-UIm4bc7t.js","assets/visios-Q8ghRQp6.js","assets/Vitrine-Br8Fh0cB.js","assets/Vitrine-BWilTqQJ.css","assets/_admin-C7UIU7Ek.js","assets/_contrat-CB1tzRlN.js","assets/_reuni-NaNyV-yc.js","assets/_shared-DUS6l910.js","assets/_signature-Dhp7GyU3.js","assets/_ui-BrUDlmuM.css","assets/_ui-DrKQTN4n.js"];
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
