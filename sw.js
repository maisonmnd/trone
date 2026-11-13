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
const BUILD = "20261113122157";
const A_GARDER = ["./","assets/Abonnements-BYJR4-i_.js","assets/Abonnements-DTY7p2DH.css","assets/abonnements-Jirj4_ai.js","assets/Academie-BQadyWJv.js","assets/Acces-CAJR_xmr.js","assets/afaire-BxS00VVY.js","assets/AFaire-VudOlich.js","assets/Agents-CUDgIoAs.js","assets/agents-donnees-B9ep8iOo.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-Blbg67dI.js","assets/Appels-y8eq-ZQy.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/Assistants-Co3z7Nlz.js","assets/Assistants-D9i2Xwmg.css","assets/AtelierDesContenus-D3-p6F2A.css","assets/AtelierDesContenus-KSR6CmAC.js","assets/Audience-BgRe-myT.js","assets/Aujourdhui-Bh9mOEKD.js","assets/avant-le-fauteuil-lecture-Bn5cUoKS.js","assets/AvantLeFauteuil-BPYXwt4x.js","assets/avis-fiches-CA6RcGtA.js","assets/AvisGoogle-B5-fOXDh.js","assets/AvisGoogle-DaPXfwX9.css","assets/BadgeEssai-YxhuAxjN.js","assets/besoins-NDLYhUi5.js","assets/BesoinsEtRegles-CzntMbJE.css","assets/BesoinsEtRegles-s9iad7Q0.js","assets/bilan-B-bfPYR0.css","assets/bilan-CHqKhch5.js","assets/BilanMensuel-Cuo02qEc.js","assets/Branches-IiZbfiot.js","assets/bridges-Cw59rBMC.js","assets/caisse-du-soir-C6vPx-E_.css","assets/caisse-du-soir-D4iEAkH1.js","assets/Caisse-fi3maFD9.js","assets/Caisses-YBw6m0nX.js","assets/Calendrier-DHYKm9M-.js","assets/campagnes-pur-smuv6ihC.js","assets/Carnet-Bc1v5uLg.js","assets/carte-Bc1a9Rj9.js","assets/carte-_W_-xBPj.css","assets/CarteModal-CsK3xkxp.js","assets/CartesCadeaux-BHBwM_gJ.js","assets/Catalogue-TGjyFd4G.js","assets/CentreDeCommande-Du8kyJhp.css","assets/CentreDeCommande-J_NesAXN.js","assets/Cercle-BRnmkmJ8.js","assets/certificat-8LYoQ4CL.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-lnLG6LRw.js","assets/chiffre-du-jour-pur-CHtFgbk3.js","assets/ChiffreDesPrestations-C8eNlMIo.js","assets/client-CYnqpqAL.js","assets/cloture-du-jour-D_voHLwf.js","assets/ClotureDuTiroir-DTYVgHYR.js","assets/Coffre-CZ8bNlMD.js","assets/collecte-mtn-pur-Bq3uWgWT.js","assets/components-C5IWBQN2.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-CoO7UGxy.js","assets/Comptes-_XbRh0eM.js","assets/consultation-C5rChoiS.js","assets/consultation-CRW6QcWf.css","assets/Consultations-BhapeNej.js","assets/consultNotes-BWCBRAT-.js","assets/Conversations-D4WwB5Zo.css","assets/Conversations-fjO6oCF7.js","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-DDxb32v1.js","assets/currency-qfIhGmrs.js","assets/Customers-BZ2Prt5J.js","assets/Dashboard-B2x7VsE_.css","assets/Dashboard-Dt7pn_db.js","assets/dates-BhFQ2eS9.js","assets/Demandes-DS2S8V6I.js","assets/DepenseEnUnePhrase-B9ggrOti.js","assets/DepenseEnUnePhrase-BIGRlGqP.css","assets/Depenses-D-36fEJB.js","assets/depenses-saisie-Cy8ogq27.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-qzjgNgTE.js","assets/diagnostics-au-trone-DoMoWb-s.js","assets/Dictee-BIQFbKhA.css","assets/Dictee-Ddf6nz9w.js","assets/dictee-pur-VWgCy--s.js","assets/Discussions-BuxaNbhQ.js","assets/EditeurDesOffres-B_C-hAjt.js","assets/Encaissements-BQxRyOay.js","assets/enfants-COtlVOgQ.js","assets/Engagements-Cj5S9MhG.css","assets/engagements-coffre-CNM8ai6W.js","assets/Engagements-CP6ObslI.js","assets/EntreDeuxSeances-Cz8OB_Pn.js","assets/Evaluation-Cac3tzi3.js","assets/facture-BwQOxJcR.js","assets/Factures-4QRM6myB.js","assets/FenetreDesCivilites-BUSbNHUB.js","assets/FenetreDesCivilites-zfNk1aak.css","assets/FenetreDuPoint-DFX3M96b.js","assets/Fil-CvucDe_7.js","assets/finances-C8x7Mn4-.css","assets/fon-DOTNsK7O.js","assets/fournisseurs-CVLGdk8Q.js","assets/Fournisseurs-D1bl3oUg.js","assets/foyer-C_w470Nk.js","assets/Gerard-Cgj-zsJh.css","assets/gerard-donnees-dWjrVEqQ.js","assets/Gerard-Q_N50Pgm.js","assets/gestes-conversation-Dop3ukaU.js","assets/heures-des-rappels-pur-Dig9pZpo.js","assets/HomeRituals-RlPypQ7l.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-iNcJoOf6.js","assets/ia-centre-BFRPEsNe.js","assets/ia-diagnostic-pur-BBLrGY5l.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-tableau-pur-p6UvREJe.js","assets/identite-C4MmhZzt.js","assets/index-CwIN_c2W.js","assets/index.es-B-SzDGw0.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-CMjeke4N.js","assets/jspdf.es.min-BEf_AolZ.js","assets/JustePrix-Cu9OLPyG.js","assets/kkiapay-DRuawQiL.js","assets/kkiapay-widget-CVmsl9OE.js","assets/Laboratoire-CwxmcPge.js","assets/LaJournee-Bn_G0HCt.css","assets/LaJournee-DIDylSTC.js","assets/LesPaiements-C9cEZlne.css","assets/LesPaiements-DqUAKXkw.js","assets/LettresAuDossier-Bf_JlmNj.js","assets/LienMndPay-CQ9yNmgR.js","assets/Marketing-FbzYyHdY.js","assets/MarketingBranche-DzOCwyAt.js","assets/Marque-ZeUHQ4eU.js","assets/MesPourboires-CENjelyb.css","assets/MesPourboires-rqH2iwwJ.js","assets/MesTaches-Cc4XUDf6.css","assets/MesTaches-xsBHgGOn.js","assets/momo-C2ZVfV9J.js","assets/MonMois-DYjin7xx.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/MtnMoMo-DPfyDaM0.js","assets/objectifs-B-0VsMTq.js","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/opale-Dvl4tylr.js","assets/oreille-B1AMUmZh.js","assets/paie-du-5-ByQFVCCo.js","assets/paie-du-5-DeJq-K_U.css","assets/paie-du-5-pur-CPiCK8fv.js","assets/paie-par-mtn-BXRhBj0L.js","assets/PaieParMtn-DYf1xB7T.js","assets/paliers-CWFFhhes.js","assets/Parametres-D_K9-vbe.js","assets/parcours-BD0Vf7w4.js","assets/Parrainages-DkSHCAVM.js","assets/Parrainages-gAHAPB_6.css","assets/PassageAvantLeFauteuil-BZUf41UJ.js","assets/pdf-D7P2d91f.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/periode-des-pourboires-pur-BUWqfwov.js","assets/Personas-CzlR4oKI.js","assets/Personnel-y0_DicUC.js","assets/photo-BrM_jO9a.js","assets/pilotage-D8kf1Co8.css","assets/Pourboires-v_DMkza8.js","assets/Predictions-DlDA6ggY.js","assets/Prestataires-D_QDmkc_.js","assets/Prets-9mC2Jh4j.js","assets/PrevisionDuMois-DEXtd06i.js","assets/PrevisionDuMois-DlFTw3OX.css","assets/Previsions-9BU2Vg1T.css","assets/Previsions-CeOSnIQR.js","assets/previsions-pur-CDTyW_UV.js","assets/processus-pur-R6U5QcCi.js","assets/Projets-COO7WDEE.css","assets/projets-DrAjsXvW.js","assets/Projets-H8HWOQv6.js","assets/projets-pur-2ZEMRNDU.js","assets/protocoles-D5rqxNpc.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-Ur7v3ma1.js","assets/qualification-C2c64RXl.js","assets/quiz-5qMPWZVi.js","assets/Rapport-B-kf8UWP.js","assets/Recommandations-BFqfLcyb.js","assets/regler-D4bu5Ik-.js","assets/regler-DHR_B1Dm.css","assets/regler-par-fedapay-pur-G8CEJdGn.js","assets/relances-pur-BacTXlI2.js","assets/releve-des-avis-Dzdq-D3C.js","assets/SalonFoyer-DozJvSRo.js","assets/secretariat-admin-C6UdALt7.js","assets/Secretariat-BWXIKStz.js","assets/Secretariat-Cy79Zw30.css","assets/Signatures-CXeHnw8A.js","assets/SignerUnPdf-BftQ1kbS.js","assets/Synthese-BXz5cCAX.js","assets/SyntheseGraphes-CFDtju_u.js","assets/systeme-TPy-pF7j.css","assets/Tableau-CMIMmQDi.js","assets/temps-vfUtOC3-.js","assets/Textes-DLpOzRbT.css","assets/Textes-Vx6OYMJu.js","assets/tiroirs-CkDzpGy0.css","assets/tiroirs-CRiqDI6O.js","assets/trone-Dg6wh-u1.css","assets/trone-jyeDEXxf.js","assets/useAudiences-C7XsN7t9.js","assets/useClotureDuJour-C7xBprDr.js","assets/Vitrine-BEBfnRCA.js","assets/Vitrine-BWilTqQJ.css","assets/_admin-sI38gNdP.js","assets/_contrat-DcJNKVDi.js","assets/_reuni-CzgdE0BA.js","assets/_shared-x_bCufWO.js","assets/_signature-DPViXccE.js","assets/_ui-BrUDlmuM.css","assets/_ui-Dfi6_twN.js"];
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
