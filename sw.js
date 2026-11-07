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
const BUILD = "20261107172511";
const A_GARDER = ["./","assets/Abonnements-C5cGId5D.js","assets/Abonnements-DTY7p2DH.css","assets/abonnements-Dx26EiEM.js","assets/Academie-DA53LfMu.js","assets/Acces-CE8z8kvj.js","assets/afaire-DCvM2pmk.js","assets/AFaire-JE0tLgAp.js","assets/Agents-C0YUP_xc.js","assets/agents-donnees-CThmMjQO.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-2bPhYlWx.js","assets/Appels-Ba6S1xlN.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/Assistants-Cs9W48jd.js","assets/Assistants-D9i2Xwmg.css","assets/AtelierDesContenus-BuAdv6R3.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/Audience-BWq6u12l.js","assets/Aujourdhui-CVkJ2Kf_.js","assets/avant-le-fauteuil-lecture-B0ZrYQpF.js","assets/AvantLeFauteuil-t2SmdSAq.js","assets/avis-fiches-Bz4Lz_tg.js","assets/AvisGoogle-CishfTak.js","assets/AvisGoogle-DaPXfwX9.css","assets/BadgeEssai-BLEr_CUH.js","assets/bilan-B-bfPYR0.css","assets/bilan-CGEsNFIK.js","assets/BilanMensuel-B-IdhTw_.js","assets/Branches-Bm1dWHlB.js","assets/bridges-Dh2ZN6d2.js","assets/Caisse-D3YZdOrC.js","assets/caisse-du-soir-C6vPx-E_.css","assets/caisse-du-soir-NSsjIYM1.js","assets/Caisses-BtsCI6cy.js","assets/Calendrier-GSK0LieE.js","assets/campagnes-pur-Dgw56lvU.js","assets/Carnet-CQ1UsE4A.js","assets/carte-9BD4yYDQ.js","assets/carte-_W_-xBPj.css","assets/CarteModal-CrlPIJaE.js","assets/CartesCadeaux-COfcMRoY.js","assets/Catalogue-aQv2bc_a.js","assets/CentreDeCommande-DChLgnSs.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-DCtDoZCk.js","assets/certificat-CPItbMM3.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-Dx3Y1Jss.js","assets/chiffre-du-jour-pur-Cr6W2gd7.js","assets/ChiffreDesPrestations-DeobiNX4.js","assets/client-zv7YX5zm.js","assets/cloture-du-jour-DKf1PqBE.js","assets/ClotureDuTiroir-DMZKOcIe.js","assets/Coffre-DfNkAE8a.js","assets/components-D12txyFR.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-B5Wm4-gE.js","assets/Comptes-Bp6SKnWm.js","assets/consultation-CRW6QcWf.css","assets/consultation-Csl9HUiz.js","assets/Consultations-C6CCBc-p.js","assets/consultNotes-BALVhzjZ.js","assets/Conversations-CdDITSpF.js","assets/Conversations-D4WwB5Zo.css","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-BgkY4lvf.js","assets/currency-qfIhGmrs.js","assets/Customers-1gvcizpE.js","assets/Dashboard-B2x7VsE_.css","assets/Dashboard-BXNQ51jh.js","assets/dates-CMJjiNMb.js","assets/Demandes-BHz4HiSo.js","assets/DepenseEnUnePhrase-BIGRlGqP.css","assets/DepenseEnUnePhrase-D2m8xRE-.js","assets/Depenses-BiojezmK.js","assets/depenses-saisie-CQ1uPbN-.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-NNvdTnnM.js","assets/diagnostics-au-trone-eU-iLOac.js","assets/Dictee-Cp60soNc.js","assets/Dictee-D2P9yM7v.css","assets/dictee-pur-B8WISOe0.js","assets/Discussions-Ca24Ngc6.js","assets/EditeurDesOffres-BMeV5Q-W.js","assets/Encaissements-D2izCmEw.js","assets/enfants-CXOIrOwx.js","assets/Engagements-Cj5S9MhG.css","assets/engagements-coffre-CJ98_gFC.js","assets/Engagements-C_nfWQiG.js","assets/EntreDeuxSeances-u4FpD8NK.js","assets/Evaluation-UoCdEl-6.js","assets/Factures-B9aZ8Gy_.js","assets/FenetreDesCivilites-C1titIMg.js","assets/FenetreDesCivilites-zfNk1aak.css","assets/FenetreDuPoint-BumgNbif.js","assets/Fil-BXpkGUKh.js","assets/finances-BMFnlkRx.css","assets/fon-szPpdOtt.js","assets/fournisseurs-CC3iLZgZ.js","assets/Fournisseurs-DtPwwN3Y.js","assets/foyer-DQy6z3AH.js","assets/Gerard-Cgj-zsJh.css","assets/gerard-donnees-Wz7lU4Ch.js","assets/Gerard-SvUohEvh.js","assets/gestes-conversation-BO9wxqwN.js","assets/HomeRituals-BVXRDAT0.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-BzOweVSF.js","assets/ia-centre-B-tRD2vQ.js","assets/ia-diagnostic-pur-BBLrGY5l.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-tableau-pur-CSRjGtTf.js","assets/identite-RjdMrGD8.js","assets/index-JL0CRM-T.js","assets/index.es-Bvqw-pib.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-DUBj3CEX.js","assets/jspdf.es.min-CZXOeTHl.js","assets/JustePrix-UWgg4E9b.js","assets/kkiapay-DS2ApGU7.js","assets/kkiapay-widget-DnUhUNd4.js","assets/Laboratoire-C-Sxy0ft.js","assets/LaJournee-Bn_G0HCt.css","assets/LaJournee-DYwS0qe5.js","assets/LesPaiements-BvdfOCbQ.css","assets/LesPaiements-_46P6peN.js","assets/LettresAuDossier-Bw3l43JZ.js","assets/LienMndPay-BC5FDcKW.js","assets/Marketing-DY3dbT3j.js","assets/MarketingBranche-T9mO2X98.js","assets/Marque-XPjGfSpR.js","assets/MesPourboires-D9I_9rZf.css","assets/MesPourboires-zHySn8J4.js","assets/MesTaches-Cc4XUDf6.css","assets/MesTaches-LtyQjpJc.js","assets/momo-C2ZVfV9J.js","assets/MonMois-Cuy5kbnD.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-bQhxVNv6.js","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/opale-yLsVBgV-.js","assets/oreille-B1AMUmZh.js","assets/paie-du-5-Bne9ael0.js","assets/paie-du-5-DeJq-K_U.css","assets/paie-du-5-pur-ChgyrVI8.js","assets/PaieParMtn-5n3l2b8Z.js","assets/paliers-Clr-PgIh.js","assets/Parametres-Bf97NmH1.js","assets/parcours-BEc1u0Id.js","assets/Parrainages-BxSby61n.js","assets/Parrainages-gAHAPB_6.css","assets/PassageAvantLeFauteuil-NJgbp95X.js","assets/pdf-CoqP1Ibe.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/Personas-DSbeX3Jf.js","assets/Personnel-D-dGXvw-.js","assets/photo-Dx1DrQIk.js","assets/pilotage-D8kf1Co8.css","assets/Pourboires-CKBb0Rfx.js","assets/Predictions-CbXAOFPc.js","assets/Prestataires-I7WqgGP5.js","assets/Prets-BKbT7PbO.js","assets/PrevisionDuMois-BEX6uED4.js","assets/PrevisionDuMois-DlFTw3OX.css","assets/Previsions-aWFvofpZ.js","assets/previsions-pur-BGYEv_v0.js","assets/Previsions-r4v19Anp.css","assets/processus-pur-R6U5QcCi.js","assets/Projets-CM8mamGs.js","assets/Projets-COO7WDEE.css","assets/projets-DaLpT7g8.js","assets/projets-pur-2ZEMRNDU.js","assets/protocoles-SEHvoGbw.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-IsaF4-O-.js","assets/qualification-kvgGYWRq.js","assets/quiz-5qMPWZVi.js","assets/Rapport-vEQqVsqB.js","assets/Recommandations-eQh0BaMd.js","assets/regler-BSwjIn1f.js","assets/regler-C5hcM02_.css","assets/regler-la-seance-serveur-Bs6rzqZX.js","assets/relances-pur-lwRTXc5E.js","assets/releve-des-avis-Be0VnJyV.js","assets/SalonFoyer-CAiVtkpD.js","assets/secretariat-admin-C3adiuXr.js","assets/Secretariat-Cy79Zw30.css","assets/Secretariat-GR-f9Nhg.js","assets/Signatures-Dl3LWPlG.js","assets/SignerUnPdf-YNFPTfwZ.js","assets/Synthese-hFnZYlbl.js","assets/SyntheseGraphes-Cxj6kOxj.js","assets/systeme-TPy-pF7j.css","assets/Tableau-CuHbALmT.js","assets/temps-weo8vWxx.js","assets/Textes-DLpOzRbT.css","assets/Textes-VYXwwWHt.js","assets/tiroirs-C7_6Rk8e.js","assets/tiroirs-CkDzpGy0.css","assets/trone-CQ2DUl_d.css","assets/trone-NKbQ3Yuo.js","assets/useAudiences-NPWOfGWb.js","assets/useClotureDuJour-DXe20lzh.js","assets/Vitrine-BE4Kq6q6.js","assets/Vitrine-BWilTqQJ.css","assets/_admin-CHLo8fXU.js","assets/_contrat-Cp4YYc7J.js","assets/_heures-DIu7J1wQ.js","assets/_reuni-bT5i8Y-L.js","assets/_shared-Dq7OhARS.js","assets/_signature-DKMx4H43.js","assets/_ui-B965eqoH.js","assets/_ui-BrUDlmuM.css"];
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
