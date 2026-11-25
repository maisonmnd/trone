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
const BUILD = "20261125123647";
const A_GARDER = ["./","assets/abonnements-BgZaoDzo.js","assets/Abonnements-DTY7p2DH.css","assets/Abonnements-L-gsnrvH.js","assets/Academie-CtJQJ00h.js","assets/Acces-Dw_yEwku.js","assets/afaire-BhaCioR0.js","assets/AFaire-CpmC_OAF.js","assets/agents-donnees-Bgn7KdjW.js","assets/Agents-D_gWqpu8.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-eZ9_BmR2.js","assets/App-DJMmmb7V.js","assets/Appels-CqXu6X6J.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/Assistants-D9i2Xwmg.css","assets/Assistants-XQVwaWmZ.js","assets/AtelierDesContenus-Bh_gkICS.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/Audience-DQTUvvGI.js","assets/Aujourdhui-BcIydqpl.js","assets/auth-CNq_GwTk.js","assets/avant-le-fauteuil-lecture-DX9ixBQw.js","assets/AvantLeFauteuil-BzZBIBcL.js","assets/avis-fiches-CcPxhM80.js","assets/avis-google-pont-DbiIqpA0.js","assets/AvisGoogle-DaPXfwX9.css","assets/AvisGoogle-DlgXlKLL.js","assets/BadgeEssai-D89Tx_ly.js","assets/BadgeSuggere-CBmMdyoF.js","assets/besoins-YmGDOa4o.js","assets/BesoinsEtRegles-BhHHvwfa.js","assets/BesoinsEtRegles-BLwxGVV5.css","assets/bilan-B-bfPYR0.css","assets/bilan-ZrcgnVlu.js","assets/BilanMensuel-Chzzxv6A.js","assets/Branches-pOGcGhky.js","assets/bridges-BLC1hPRF.js","assets/Caisse-8zQD8vyC.js","assets/caisse-du-soir-Am9F6n8q.js","assets/caisse-du-soir-C6vPx-E_.css","assets/caisse-fluide-pur-B1LWbTo8.js","assets/Caisses-Pikcs2VG.js","assets/Calendrier-TzUAlHjd.js","assets/campagnes-pur-C-NCwVds.js","assets/Carnet-BVSjGKOU.js","assets/carte-2LcmOIho.js","assets/carte-_W_-xBPj.css","assets/CarteModal-CgiVOjD_.js","assets/CartesCadeaux-DBi1BmoJ.js","assets/Catalogue-ByZqjMg-.js","assets/CentreDeCommande-DkzFj0Y4.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-C_CzvuYj.js","assets/certificat-ChWexf2q.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-CkSbViY_.js","assets/chiffre-du-jour-pur-DqONysfp.js","assets/ChiffreDesPrestations-hECOpoMS.js","assets/classement-BG_p68Wc.js","assets/Classement-DEtQbcmC.js","assets/classement-pur-DgNYRo7t.js","assets/Classement-T9x-HPwd.css","assets/client-DKkFUCTu.js","assets/cloture-du-jour-Bf0R5cXq.js","assets/ClotureDuTiroir-Bi5l-XRg.js","assets/Coffre-vRu5oJUw.js","assets/components-CL9obxsS.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-C5BTFtuZ.js","assets/Comptes-2H0YfnRs.js","assets/consultation-CmI6J6bC.js","assets/consultation-CRW6QcWf.css","assets/Consultations-DiE-2_mG.css","assets/Consultations-DuLlte2y.js","assets/consultNotes-5smXRh_y.js","assets/contexte-de-la-reponse-Dlelmfmv.js","assets/Conversations-CmjbYhn6.js","assets/Conversations-D4WwB5Zo.css","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-CvVxnlC3.js","assets/currency-Cd0clE4P.js","assets/Customers-BxpkZ_Rf.js","assets/Dashboard-CQQ8qLKh.js","assets/Dashboard-D9jnTaFp.css","assets/dates-CFYeqPEb.js","assets/DemanderAPerle-B8KVM2Mo.js","assets/DemanderAPerle-BD5NgCRN.css","assets/Demandes-DyMqOlNS.js","assets/DepenseEnUnePhrase-BIGRlGqP.css","assets/DepenseEnUnePhrase-CoBYLDLb.js","assets/Depenses-CldQxL6u.js","assets/depenses-saisie-GRdSYncP.js","assets/devis-CdIRAvZk.css","assets/devis-CW5q-Dax.js","assets/devis-remis-uvWt3Gdz.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-t0vWcNdG.js","assets/diagnostics-au-trone-C5nAKRDW.js","assets/Dictee-BgAwoGM4.js","assets/Dictee-C-pUYYFA.css","assets/dictee-pur-D0wqjs_h.js","assets/Discussions-SNd2NYOq.js","assets/dist-9vv0te18.js","assets/echappe-html-pur-gEhHOM07.js","assets/EditeurDesOffres-BzH7yDwp.js","assets/Encaissements-DPzyO6Sl.js","assets/EnDirect-Bp6d77dT.js","assets/enfants-Cmri65LS.js","assets/Engagements-BbY505iE.js","assets/Engagements-Cj5S9MhG.css","assets/engagements-coffre-Bm2AULo6.js","assets/EntreDeuxSeances-B9jINtav.js","assets/es-DTMyHOuP.js","assets/etoiles-pur-CgRPMSHm.js","assets/Evaluation-CPpQtVbb.js","assets/facture-BsSOlWSB.js","assets/Factures-D3C1ip-w.js","assets/FenetreDeLAgent-DR7LYEo1.js","assets/FenetreDesCivilites-CVNlxnUS.js","assets/FenetreDesCivilites-zfNk1aak.css","assets/FenetreDuPoint-I2AfVH1y.js","assets/Fil-C2TJwZ2C.js","assets/finances-C8x7Mn4-.css","assets/fon-DNVnPZjJ.js","assets/Fournisseurs-BkoN737u.js","assets/fournisseurs-B_vXwmig.js","assets/foyer-DTRaUKeD.js","assets/gerard-donnees-1xwNyd-z.js","assets/Gerard-DzzURrPS.js","assets/Gerard-lGKehvgG.css","assets/gestes-conversation-kpRp49LL.js","assets/heures-des-rappels-pur-BWJPB8OP.js","assets/HomeRituals-CBWHbzSf.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-D0ObYAps.js","assets/ia-centre-CffKehf0.js","assets/ia-diagnostic-pur-qGnFEvys.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-tableau-pur-p6UvREJe.js","assets/identite-DzjGhHVi.js","assets/index.es-Xm8PvAjH.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-yrQQOJOj.js","assets/jspdf.es.min-Br6jG9Uh.js","assets/JustePrix-TPFfpXIS.js","assets/kkiapay-DdrK690-.js","assets/kkiapay-widget-CaHBoBVm.js","assets/Laboratoire-Csdp3RRT.js","assets/LaJournee-Bn_G0HCt.css","assets/LaJournee-f8uBjzZH.js","assets/le-caissier-pur-CR0nfuT7.js","assets/le-sceau-pur-Dv-IZ_M2.js","assets/LePoint-B_HurXA0.css","assets/LePoint-CX5LqYZh.js","assets/LesPaiements-C9cEZlne.css","assets/LesPaiements-D7fq2JNR.js","assets/LettresAuDossier-CKzen0q6.js","assets/LienMndPay-CV2nvYib.js","assets/Marketing-OAimWE0z.js","assets/MarketingBranche-6q_uu8wE.js","assets/Marque-CtaDkuN3.js","assets/MesPourboires-C8fJC58R.js","assets/MesPourboires-CENjelyb.css","assets/MesTaches-BQmw-zSo.js","assets/MesTaches-Cc4XUDf6.css","assets/mnd-pay-pur-CfS2mkAo.js","assets/momo-C2ZVfV9J.js","assets/MonMois-BdL-Bl00.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/MtnMoMo-Bvp2tkDf.js","assets/objectifs-CBTV7RS6.js","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/opale-DKt81UFe.js","assets/oreille-B1AMUmZh.js","assets/paie-du-5-BhYk1LTG.js","assets/paie-du-5-DeJq-K_U.css","assets/paie-du-5-pur-CPiCK8fv.js","assets/paie-par-mtn-Nx1CiAaQ.js","assets/PaieParMtn-BE-erbWF.js","assets/paliers-C-85LE2S.js","assets/Parametres-ClwoAd0m.js","assets/parcours-DqzDYfBK.js","assets/Parrainages-DB05iaek.js","assets/Parrainages-gAHAPB_6.css","assets/PassageAvantLeFauteuil-Cvrd9m1Q.js","assets/pdf-DBMK8zPj.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/periode-des-pourboires-pur-BUWqfwov.js","assets/Personas-BjOG9ifT.js","assets/Personnel-CechcOYT.js","assets/photo-DCT_BoM5.js","assets/pilotage-D8kf1Co8.css","assets/porte-de-l-equipe-DGpx1DFm.js","assets/Pourboires-CcbBfqjK.js","assets/Predictions-dkN1tPGu.js","assets/preload-helper-BRe_O-Rg.js","assets/Prestataires-mF-FegbR.js","assets/Prets-CHOquKYa.js","assets/PrevisionDuMois-DlFTw3OX.css","assets/PrevisionDuMois-Dn7TrDIr.js","assets/Previsions-9BU2Vg1T.css","assets/Previsions-CYtevTv4.js","assets/previsions-pur-K233avH6.js","assets/processus-pur-R6U5QcCi.js","assets/projets-8vbhSNOv.js","assets/Projets-COO7WDEE.css","assets/projets-pur-2ZEMRNDU.js","assets/Projets-QxXycm6C.js","assets/protocoles-D0q6o82f.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-Cq7zlPgF.js","assets/quiz-5qMPWZVi.js","assets/Rapport-D8Ds04Ws.js","assets/Recommandations-CETGtuU1.js","assets/regler-D1gFEaVz.css","assets/regler-par-fedapay-pur-DP7zXAs5.js","assets/regler-Qybx9Hl6.js","assets/relances-pur-C9iUwl2e.js","assets/releve-des-avis-D6ts9_JX.js","assets/SalonFoyer-_uKTkfpb.js","assets/sceau-Derld7dT.js","assets/secretariat-admin-D1Aj18hy.js","assets/Secretariat-Cy79Zw30.css","assets/Secretariat-DpbHoPVU.js","assets/Signatures-C2yR6W3u.js","assets/SignerUnPdf-BNZa9Zjp.js","assets/Synthese-eFlYFyeo.js","assets/SyntheseGraphes-7_JaGIwt.js","assets/systeme-TPy-pF7j.css","assets/Tableau-Cl7Ta1kC.js","assets/temps-DIVZ6cXN.js","assets/Textes-DLpOzRbT.css","assets/Textes-DRgQT5J1.js","assets/tiroirs-CgvZQC_2.js","assets/tiroirs-CkDzpGy0.css","assets/trone-BHyQouzX.js","assets/trone-C3eufNNq.css","assets/useAudiences-BZpa3WYl.js","assets/useClotureDuJour-BIaLvb6O.js","assets/visios-SKUTpIjl.js","assets/Vitrine-BWilTqQJ.css","assets/Vitrine-DHjE6K_p.js","assets/_admin-BpApkanx.js","assets/_contrat-D74NIyyp.js","assets/_reuni-bsz3zwBU.js","assets/_shared-CEvxthHl.js","assets/_signature--oduXlvA.js","assets/_ui-BrUDlmuM.css","assets/_ui-BuBeIWVR.js"];
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

  /* LE PLAN POUR VENIR, LE RÉSEAU D'ABORD (20 novembre 2026). Il part chez les
     clientes : gardé comme les autres images, le plan d'avant une correction
     (l'adresse du 20 novembre) repartait une fois de plus de chaque appareil.
     En ligne, toujours le dernier, sans le cache du navigateur ; sans réseau,
     celui qu'on a. */
  if (url.pathname.includes('/assets/itineraire/')) {
    event.respondWith((async () => {
      const c = await caches.open(CACHE_IMAGES);
      try {
        const r = await avecDelai(fetch(req, { cache: 'no-cache' }), DELAI_PAGE_MS);
        if (r.ok) { void c.put(req, r.clone()); return r; }
        return (await c.match(req)) || r;
      } catch (_e) {
        return (await c.match(req)) || Response.error();
      }
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
