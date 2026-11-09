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
const BUILD = "20261109220958";
const A_GARDER = ["./","assets/Abonnements-DTY7p2DH.css","assets/abonnements-gTbsExns.js","assets/Abonnements-xhPiJkBe.js","assets/Academie-B1df8FrF.js","assets/Acces-Dt-A6-I4.js","assets/afaire-CyXgOh0-.js","assets/AFaire-tK7v3Xr9.js","assets/agents-donnees-DlQN4P0H.js","assets/Agents-DvdouNmZ.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-CXV_0RyO.js","assets/Appels-Be5nAXX8.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/Assistants-BHIfwvsS.js","assets/Assistants-D9i2Xwmg.css","assets/AtelierDesContenus-BGnok761.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/Audience-BgQikouU.js","assets/Aujourdhui-DL66d1fd.js","assets/avant-le-fauteuil-lecture-DN3ChgDQ.js","assets/AvantLeFauteuil-BTD6ECmx.js","assets/avis-fiches-CYHQEosA.js","assets/AvisGoogle-BUGVrW4r.js","assets/AvisGoogle-DaPXfwX9.css","assets/BadgeEssai-DPZzTk6c.js","assets/bilan-8LhCVllB.js","assets/bilan-B-bfPYR0.css","assets/BilanMensuel-Qiis1ycW.js","assets/Branches-CKtBBe-S.js","assets/bridges-Cvk-196E.js","assets/Caisse-Ct4QqDf6.js","assets/caisse-du-soir-C6vPx-E_.css","assets/caisse-du-soir-Ck77Pd0t.js","assets/Caisses-BZQ0LKPQ.js","assets/Calendrier-DD1IroPD.js","assets/campagnes-pur-4LDQCdx4.js","assets/Carnet-C13f0SYb.js","assets/carte-CPnXOW1H.js","assets/carte-_W_-xBPj.css","assets/CarteModal-B9Rmw31X.js","assets/CartesCadeaux-Bo50OUFP.js","assets/Catalogue-h63MrAJO.js","assets/CentreDeCommande-DLPBykSi.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-B6Y6yDAj.js","assets/certificat-DtfhObpO.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-C8X94OR6.js","assets/chiffre-du-jour-pur-BdElY0QT.js","assets/ChiffreDesPrestations-D7krB7YL.js","assets/client-wj05BOQC.js","assets/cloture-du-jour-BUr2p9qj.js","assets/ClotureDuTiroir-ByKEyrhm.js","assets/Coffre-CgrWgXDf.js","assets/components-DF42mrIA.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-1kR4Yhgk.js","assets/Comptes-BUs1R2kx.js","assets/consultation-CRW6QcWf.css","assets/consultation-i4VPCiR7.js","assets/Consultations-Cv5C6uSR.js","assets/consultNotes-hPKGzXHL.js","assets/Conversations-CzNAGyOQ.js","assets/Conversations-D4WwB5Zo.css","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-BiymklEw.js","assets/currency-qfIhGmrs.js","assets/Customers-o9VmfDn6.js","assets/Dashboard-B2x7VsE_.css","assets/Dashboard-CGhI5yIT.js","assets/dates-3n1PZRtB.js","assets/Demandes-Bs-exss2.js","assets/DepenseEnUnePhrase-BIGRlGqP.css","assets/DepenseEnUnePhrase-DMChl8aC.js","assets/Depenses-Bsm3svFP.js","assets/depenses-saisie-CueF952f.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-DN6DqwwG.js","assets/diagnostics-au-trone-CGkfAsrk.js","assets/Dictee-BjWN8Lv2.js","assets/Dictee-D2P9yM7v.css","assets/dictee-pur-BOS8IMy2.js","assets/Discussions-DONdImjz.js","assets/EditeurDesOffres-CadhasiX.js","assets/Encaissements-C205Vl-c.js","assets/enfants-D_0qT6cf.js","assets/Engagements-Cj5S9MhG.css","assets/engagements-coffre-CdZIIcY8.js","assets/Engagements-D-5Oh5B1.js","assets/EntreDeuxSeances-DUbEKg8H.js","assets/Evaluation-B2RytvfL.js","assets/Factures-DPrMLH7n.js","assets/FenetreDesCivilites-CtpsHHv0.js","assets/FenetreDesCivilites-zfNk1aak.css","assets/FenetreDuPoint-Be0gSYoX.js","assets/Fil-BtuWmUHp.js","assets/finances-BMFnlkRx.css","assets/fon-BlPbE4xt.js","assets/Fournisseurs-BuflK9wT.js","assets/fournisseurs-tN7ljg0-.js","assets/foyer-BF7Lrm8q.js","assets/Gerard-BWW1c7zl.js","assets/Gerard-Cgj-zsJh.css","assets/gerard-donnees-CVtDlYkV.js","assets/gestes-conversation-BPTX72gt.js","assets/HomeRituals-phMNrf-I.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-D1fNqR50.js","assets/ia-centre-CXizqeKb.js","assets/ia-diagnostic-pur-BBLrGY5l.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-tableau-pur-CSRjGtTf.js","assets/identite-CK5aB9Fo.js","assets/index-CUc4bUJq.js","assets/index.es-D5gIl-fl.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-ClRcGHuJ.js","assets/jspdf.es.min-Dw2i9Tyk.js","assets/JustePrix-QNv-6lOT.js","assets/kkiapay-B3RnQ9pn.js","assets/kkiapay-widget-DnUhUNd4.js","assets/Laboratoire-B31pw1pr.js","assets/LaJournee-Bn_G0HCt.css","assets/LaJournee-DNhERM35.js","assets/LesPaiements-7H0_bhww.js","assets/LesPaiements-BvdfOCbQ.css","assets/LettresAuDossier-DhussVZR.js","assets/LienMndPay-D7JFhE-f.js","assets/Marketing-7kdnTVO7.js","assets/MarketingBranche-DedK3i9I.js","assets/Marque-B8Bfxphk.js","assets/MesPourboires-CENjelyb.css","assets/MesPourboires-MRjmmuVk.js","assets/MesTaches-Bae4KmTx.js","assets/MesTaches-Cc4XUDf6.css","assets/momo-C2ZVfV9J.js","assets/MonMois-D9C7zj75.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-B3gykFOI.js","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/opale-vQvCA8Pz.js","assets/oreille-B1AMUmZh.js","assets/paie-du-5-CLxa0AHj.js","assets/paie-du-5-DeJq-K_U.css","assets/paie-du-5-pur-FhavJW3d.js","assets/PaieParMtn-Fajpo9UW.js","assets/paliers-BMwIPOKX.js","assets/Parametres-BP7lEKKj.js","assets/parcours-CqaJY9WL.js","assets/Parrainages-BLKOnnXF.js","assets/Parrainages-gAHAPB_6.css","assets/PassageAvantLeFauteuil-DVgPKVg-.js","assets/pdf-s9ZW6pp6.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/periode-des-pourboires-pur-BUWqfwov.js","assets/Personas-cb9SmSLI.js","assets/Personnel-CFOJBr6F.js","assets/photo-B8adKBfp.js","assets/pilotage-D8kf1Co8.css","assets/Pourboires-DtcNGSep.js","assets/Predictions-DzylFV1I.js","assets/Prestataires-BhysOA5K.js","assets/Prets-DB2Od6M0.js","assets/PrevisionDuMois-C_-5Inbp.js","assets/PrevisionDuMois-DlFTw3OX.css","assets/Previsions-CIQBq25G.js","assets/previsions-pur-V7DMV80c.js","assets/Previsions-r4v19Anp.css","assets/processus-pur-R6U5QcCi.js","assets/projets-B4PGkzqv.js","assets/Projets-COO7WDEE.css","assets/Projets-Cuza4X5r.js","assets/projets-pur-2ZEMRNDU.js","assets/protocoles-DxlfzlYW.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-0KAI0KIg.js","assets/qualification-Cld4Ofdy.js","assets/quiz-5qMPWZVi.js","assets/Rapport-BDOm_Kky.js","assets/Recommandations-BVGAWCtQ.js","assets/regler-C5hcM02_.css","assets/regler-CbPJeZSG.js","assets/regler-la-seance-serveur-Bs6rzqZX.js","assets/relances-pur-lwRTXc5E.js","assets/releve-des-avis-CfHHCnKk.js","assets/SalonFoyer-Rt8_ApG3.js","assets/secretariat-admin-CcwPgSSw.js","assets/Secretariat-Cy79Zw30.css","assets/Secretariat-D7MGEFO6.js","assets/Signatures-KdfzEXZM.js","assets/SignerUnPdf-D-en78cT.js","assets/Synthese-D_MD6DBv.js","assets/SyntheseGraphes-BofEZGcT.js","assets/systeme-TPy-pF7j.css","assets/Tableau-Dgrhct_P.js","assets/temps-BnUkg2Am.js","assets/Textes-DLpOzRbT.css","assets/Textes-DZm0_eya.js","assets/tiroirs-BWSuH0Hv.js","assets/tiroirs-CkDzpGy0.css","assets/trone-CQ2DUl_d.css","assets/trone-Dy9RioN7.js","assets/useAudiences-aM4eQi-W.js","assets/useClotureDuJour-BN-s8hp6.js","assets/Vitrine-BWilTqQJ.css","assets/Vitrine-CvlXIxHg.js","assets/_admin-DpUXq9UX.js","assets/_contrat-BbHuJ6xG.js","assets/_heures-CxfIFdAK.js","assets/_reuni-DkVcpMgE.js","assets/_shared-By_1bNwu.js","assets/_signature-DIWt7DKI.js","assets/_ui-BrUDlmuM.css","assets/_ui-DuA7F1Q4.js"];
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
