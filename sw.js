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
const BUILD = "20261113114345";
const A_GARDER = ["./","assets/abonnements-CjZbQzN1.js","assets/Abonnements-DTY7p2DH.css","assets/Abonnements-StPqhbx1.js","assets/Academie-DXYPpHev.js","assets/Acces-DrugL4R7.js","assets/afaire-7EqRvxaV.js","assets/AFaire-BnO8GKzG.js","assets/Agents-C8Mc4daS.js","assets/agents-donnees-CkKQcsgC.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-CeJH3j-W.js","assets/Appels-DkYXC_QY.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/Assistants-CiYpjVzr.js","assets/Assistants-D9i2Xwmg.css","assets/AtelierDesContenus-Bb4B5vSi.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/Audience-BvB5e0o0.js","assets/Aujourdhui-BWjHaYRN.js","assets/avant-le-fauteuil-lecture-BudbjyXc.js","assets/AvantLeFauteuil-CVC0NodX.js","assets/avis-fiches-Ch77XE0k.js","assets/AvisGoogle-DaPXfwX9.css","assets/AvisGoogle-emLr7l-P.js","assets/BadgeEssai-DHOkQ8be.js","assets/besoins-BGa0iwko.js","assets/BesoinsEtRegles-CzntMbJE.css","assets/BesoinsEtRegles-D9f-oAQ8.js","assets/bilan-B-bfPYR0.css","assets/bilan-Df5TB7u_.js","assets/BilanMensuel-DUWTfJI-.js","assets/Branches-C2EhnJNd.js","assets/bridges-CIElKD7x.js","assets/Caisse-DsMDOaDt.js","assets/caisse-du-soir-B82r8TDT.js","assets/caisse-du-soir-C6vPx-E_.css","assets/Caisses-CxD2VH1f.js","assets/Calendrier-C0Gw56qQ.js","assets/campagnes-pur-BognvxEB.js","assets/Carnet-BKBY0wHp.js","assets/carte-CLWrVpdL.js","assets/carte-_W_-xBPj.css","assets/CarteModal-BR3sw6iv.js","assets/CartesCadeaux-C54i1ZY3.js","assets/Catalogue-n1DCUSGN.js","assets/CentreDeCommande-DeK4Sjor.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-DqIL41S_.js","assets/certificat-Dm7CwovG.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-DBq4QPiV.js","assets/chiffre-du-jour-pur-BjZyCl5U.js","assets/ChiffreDesPrestations-CR4V7Xg2.js","assets/client-CV6GRc29.js","assets/cloture-du-jour-tLRhgNWL.js","assets/ClotureDuTiroir-GUXybDP0.js","assets/Coffre-BErLdJfz.js","assets/collecte-mtn-pur-Bq3uWgWT.js","assets/components-BA2iMXeF.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-DZCGZRAi.js","assets/Comptes-KNvc8EMt.js","assets/consultation-CRW6QcWf.css","assets/consultation-DJv9IaKh.js","assets/Consultations-DnivZDJz.js","assets/consultNotes-GbTjxfzZ.js","assets/Conversations-BG_dGo9-.js","assets/Conversations-D4WwB5Zo.css","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-OsIgC_kE.js","assets/currency-qfIhGmrs.js","assets/Customers-C6SHvS1K.js","assets/Dashboard-B2x7VsE_.css","assets/Dashboard-BndUxGuy.js","assets/dates-BCuLOn_5.js","assets/Demandes-9XO7Y_fn.js","assets/DepenseEnUnePhrase-BIGRlGqP.css","assets/DepenseEnUnePhrase-CjfzQ1ss.js","assets/Depenses-D-2BPYJt.js","assets/depenses-saisie-5i6SJj84.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-D1_3UHLT.js","assets/diagnostics-au-trone-BBlAZjvM.js","assets/Dictee-D2P9yM7v.css","assets/Dictee-D5LlERFn.js","assets/dictee-pur-9LCKKYgy.js","assets/Discussions-DxH5MsD2.js","assets/EditeurDesOffres-BkpuU0Bt.js","assets/Encaissements-B7qjsDdR.js","assets/enfants-GQDUXAhO.js","assets/Engagements-cEfyX3X_.js","assets/Engagements-Cj5S9MhG.css","assets/engagements-coffre-CdyzCNi8.js","assets/EntreDeuxSeances-1GB-LqCg.js","assets/Evaluation-DWm8HwcT.js","assets/facture-B_TQnwPb.js","assets/Factures-DAEu00OJ.js","assets/FenetreDesCivilites-ktLSwavA.js","assets/FenetreDesCivilites-zfNk1aak.css","assets/FenetreDuPoint-Bj0N7GK7.js","assets/Fil-DZx9D51D.js","assets/finances-Ds4kOIUN.css","assets/fon-h4ZjQYu0.js","assets/fournisseurs-3ss-vWMe.js","assets/Fournisseurs-CC1asbWP.js","assets/foyer-DPSbHgMW.js","assets/Gerard-BpbnaWDY.js","assets/Gerard-Cgj-zsJh.css","assets/gerard-donnees-4PZo_48U.js","assets/gestes-conversation-iRiqiJWn.js","assets/heures-des-rappels-pur-Dig9pZpo.js","assets/HomeRituals-CzA7opFP.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-BQqPw1n4.js","assets/ia-centre-iLOptq8y.js","assets/ia-diagnostic-pur-BBLrGY5l.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-tableau-pur-p6UvREJe.js","assets/identite-C5rZQE2B.js","assets/index-DBW0Tbnd.js","assets/index.es-COVLlPrK.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-Bo40_gKk.js","assets/jspdf.es.min-C0PbmwGb.js","assets/JustePrix-DrzrxeGi.js","assets/kkiapay-CJdeqJKS.js","assets/kkiapay-widget-CVmsl9OE.js","assets/Laboratoire-DU03GHUN.js","assets/LaJournee-Bn_G0HCt.css","assets/LaJournee-hG0U4m2V.js","assets/LesPaiements-C9cEZlne.css","assets/LesPaiements-dzJmaK9k.js","assets/LettresAuDossier-DZEtXDJ9.js","assets/LienMndPay-CQ3RFOkP.js","assets/Marketing-DHtSHUCr.js","assets/MarketingBranche-Ctqun-6J.js","assets/Marque-BLLFFWhQ.js","assets/MesPourboires-BnAfKfIz.js","assets/MesPourboires-CENjelyb.css","assets/MesTaches-Cc4XUDf6.css","assets/MesTaches-z7Eu3rhW.js","assets/momo-C2ZVfV9J.js","assets/MonMois-K9H20nHI.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/MtnMoMo-kilgp96i.js","assets/objectifs-BnYOFpOK.js","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/opale-CYmLx9il.js","assets/oreille-B1AMUmZh.js","assets/paie-du-5-CfsRbpbU.js","assets/paie-du-5-DeJq-K_U.css","assets/paie-du-5-pur-CPiCK8fv.js","assets/paie-par-mtn-B2AkhzSt.js","assets/PaieParMtn-_C9SSgQF.js","assets/paliers-oyX0nTzs.js","assets/Parametres-BDM0IIQQ.js","assets/parcours-Bs1zZ74z.js","assets/Parrainages-C26ISJKd.js","assets/Parrainages-gAHAPB_6.css","assets/PassageAvantLeFauteuil-U_xY2ASN.js","assets/pdf-DxWv2Jfe.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/periode-des-pourboires-pur-BUWqfwov.js","assets/Personas-DN59YyUi.js","assets/Personnel-DISpLit5.js","assets/photo-DKRS0ygI.js","assets/pilotage-D8kf1Co8.css","assets/Pourboires-CDv3AL4E.js","assets/Predictions-H6Wa3HB_.js","assets/Prestataires-UqAvZemn.js","assets/Prets-BlOMOoqW.js","assets/PrevisionDuMois-D16svd_U.js","assets/PrevisionDuMois-DlFTw3OX.css","assets/Previsions-9BU2Vg1T.css","assets/Previsions-CnzuUPc6.js","assets/previsions-pur-HwNHScXu.js","assets/processus-pur-R6U5QcCi.js","assets/projets-CC4yNeDc.js","assets/Projets-CcK_m6vS.js","assets/Projets-COO7WDEE.css","assets/projets-pur-2ZEMRNDU.js","assets/protocoles-DbNe3CNg.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-B-mdRnGc.js","assets/qualification-D80Y0WZ0.js","assets/quiz-5qMPWZVi.js","assets/Rapport-UjOsz95H.js","assets/Recommandations-BonKj_es.js","assets/regler-B2AAEziw.js","assets/regler-DHR_B1Dm.css","assets/regler-par-fedapay-pur-G8CEJdGn.js","assets/relances-pur-BacTXlI2.js","assets/releve-des-avis-D-aIONJx.js","assets/SalonFoyer-DNrNArHU.js","assets/secretariat-admin-C022iwvp.js","assets/Secretariat-CARkHCmv.js","assets/Secretariat-Cy79Zw30.css","assets/Signatures-DafsJepU.js","assets/SignerUnPdf-CRqT-u_F.js","assets/Synthese-xVqm7v-h.js","assets/SyntheseGraphes-DJN-XQyY.js","assets/systeme-TPy-pF7j.css","assets/Tableau-BQPhen_3.js","assets/temps-CCpVrfUD.js","assets/Textes-B5EkMn8Q.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-CiIVMVYK.js","assets/tiroirs-CkDzpGy0.css","assets/trone-Dg6wh-u1.css","assets/trone-U_RY4oeG.js","assets/useAudiences-Ox6BSRAM.js","assets/useClotureDuJour-BtBvRCvQ.js","assets/Vitrine-BWilTqQJ.css","assets/Vitrine-D2Kx9uHV.js","assets/_admin-C7TAZNlA.js","assets/_contrat-DNv25y37.js","assets/_reuni-DRtd3oAZ.js","assets/_shared-CvXIIOHn.js","assets/_signature-1cdW4bpW.js","assets/_ui-BrUDlmuM.css","assets/_ui-Dlid6ac9.js"];
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
