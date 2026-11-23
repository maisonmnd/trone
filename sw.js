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
const BUILD = "20261123010329";
const A_GARDER = ["./","assets/Abonnements-2uOwgL-T.js","assets/Abonnements-DTY7p2DH.css","assets/abonnements-DUh6Go4M.js","assets/Academie-BoPq-a3t.js","assets/Acces-1FNURpxg.js","assets/afaire-Bv6yry_E.js","assets/AFaire-GEh3t9j7.js","assets/Agents-CD3uJ5CG.js","assets/agents-donnees-_CuNJFkw.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-6zvnFwAa.js","assets/App-COPMDBHg.js","assets/Appels-Dwd_ui7m.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/Assistants-D9i2Xwmg.css","assets/Assistants-iUEGxg0l.js","assets/AtelierDesContenus-BCvmxiy3.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/Audience-BBu_m2Tv.js","assets/Aujourdhui-aMVyoPtN.js","assets/auth-CV_LAJTi.js","assets/avant-le-fauteuil-lecture-BYPcmPWi.js","assets/AvantLeFauteuil-EMoSstxe.js","assets/avis-fiches-B2HZAFoo.js","assets/avis-google-pont-D-aU9iZ2.js","assets/AvisGoogle-DaPXfwX9.css","assets/AvisGoogle-Dj1miDJN.js","assets/BadgeEssai-DcaGo8td.js","assets/BadgeSuggere-CRR7IJdj.js","assets/besoins-J7utOVsy.js","assets/BesoinsEtRegles-BjC_Gk8Q.js","assets/BesoinsEtRegles-BLwxGVV5.css","assets/bilan-B-bfPYR0.css","assets/bilan-Cn5VqgT0.js","assets/BilanMensuel-VOjwk21-.js","assets/Branches-Dztbhulc.js","assets/bridges-TMeqFFsq.js","assets/Caisse-BphxNEbB.js","assets/caisse-du-soir-Bhyn9DWv.js","assets/caisse-du-soir-C6vPx-E_.css","assets/caisse-fluide-pur-Ezrqn8-v.js","assets/Caisses-Bx94Tpl2.js","assets/Calendrier-Bvifkrrk.js","assets/campagnes-pur-DVsOQALl.js","assets/Carnet-fFryOAVU.js","assets/carte-DdWWWDp_.js","assets/carte-_W_-xBPj.css","assets/CarteModal-DX3Uq_xe.js","assets/CartesCadeaux-B0sddSSr.js","assets/Catalogue-CCM0Iu2-.js","assets/CentreDeCommande-BQgVDxHi.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-D5fMM49j.js","assets/certificat-Clj7zTfB.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-D1EUKGeD.js","assets/chiffre-du-jour-pur-DtxEyp8U.js","assets/ChiffreDesPrestations-CzxHhI9V.js","assets/classement-2Yuif7j-.js","assets/Classement-CmpbQZDu.css","assets/Classement-D8q9VoEL.js","assets/classement-pur-CQOYU06l.js","assets/client-BoMqjuPg.js","assets/cloture-du-jour-BjSQMO10.js","assets/ClotureDuTiroir-DiSMXC4G.js","assets/Coffre-Dgrdl3Kn.js","assets/collecte-mtn-pur-C_XQy7Cp.js","assets/components-CV-nFLSX.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-D_4YI_qs.js","assets/Comptes-BiBa8Hbz.js","assets/consultation-CoysT-X0.js","assets/consultation-CRW6QcWf.css","assets/Consultations-DFAhliFF.js","assets/Consultations-DiE-2_mG.css","assets/consultNotes-DkKELacM.js","assets/contexte-de-la-reponse-ClL3xyRe.js","assets/Conversations-5JU7srCo.js","assets/Conversations-D4WwB5Zo.css","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-CNryes55.js","assets/currency-Cd0clE4P.js","assets/Customers-DJqTAeIj.js","assets/Dashboard-B-FNRFhB.js","assets/Dashboard-B2x7VsE_.css","assets/dates-DVfGxSEu.js","assets/DemanderAPerle-BD5NgCRN.css","assets/DemanderAPerle-CJk81CAM.js","assets/Demandes-DZNHlDTU.js","assets/DepenseEnUnePhrase-BIGRlGqP.css","assets/DepenseEnUnePhrase-DnpA0HtB.js","assets/Depenses-i37yK1EO.js","assets/depenses-saisie-CuM9h9MU.js","assets/devis-BscPYl7C.css","assets/devis-C5FhJ6T4.js","assets/devis-remis-DyImX86T.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-B4pZg2Pu.js","assets/diagnostics-au-trone-BoFdgLeA.js","assets/Dictee-BulWbz8K.js","assets/Dictee-C-pUYYFA.css","assets/dictee-pur-CbdWHG-i.js","assets/Discussions-BRBsfxzY.js","assets/dist-9vv0te18.js","assets/echappe-html-pur-gEhHOM07.js","assets/EditeurDesOffres-BsmdXNbn.js","assets/Encaissements-DTh15W7E.js","assets/enfants-DR6_wd_5.js","assets/Engagements-Cj5S9MhG.css","assets/engagements-coffre-CF-txRfq.js","assets/Engagements-Da44wMCf.js","assets/EntreDeuxSeances-lmBevb1P.js","assets/es-CIzFyGMw.js","assets/etoiles-pur-CgRPMSHm.js","assets/Evaluation-D01pBxa6.js","assets/facture-BSCUAX9e.js","assets/Factures-DTwDAwAp.js","assets/FenetreDeLAgent-B5BYqHRc.js","assets/FenetreDesCivilites-Das9S45-.js","assets/FenetreDesCivilites-zfNk1aak.css","assets/FenetreDuPoint-BlCfrvBT.js","assets/Fil-CEAINi2V.js","assets/finances-C8x7Mn4-.css","assets/fon-lTld29Se.js","assets/fournisseurs-BgD3vnqJ.js","assets/Fournisseurs-DacXeOlR.js","assets/foyer-CdGHXhqV.js","assets/gerard-donnees-zAaLtfSy.js","assets/Gerard-lGKehvgG.css","assets/Gerard-TgXBvg1y.js","assets/gestes-conversation-CxWE5mlt.js","assets/heures-des-rappels-pur-BWJPB8OP.js","assets/HomeRituals-C-4Mq0E-.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-3JGzclYR.js","assets/ia-centre-BNuBCSoy.js","assets/ia-diagnostic-pur-qGnFEvys.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-tableau-pur-p6UvREJe.js","assets/identite-C8v7wDsa.js","assets/index.es-Bb4lzVdB.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-wWNy1jv_.js","assets/jspdf.es.min-CXqB1PW2.js","assets/JustePrix-CkuqbOrM.js","assets/kkiapay-7Rj9ZISJ.js","assets/kkiapay-widget-CVmsl9OE.js","assets/Laboratoire-CxgzQtRn.js","assets/LaJournee-B7_I8PTS.js","assets/LaJournee-Bn_G0HCt.css","assets/le-caissier-pur-CEq73d7A.js","assets/le-sceau-pur-ZsXKMtuY.js","assets/LePoint-CBjCCMQ5.css","assets/LePoint-T9Rt4NXL.js","assets/LesPaiements-C9cEZlne.css","assets/LesPaiements-CbS2p1Ag.js","assets/LettresAuDossier-BPahqSbK.js","assets/LienMndPay-Bdjyto18.js","assets/Marketing-CJt7y6zT.js","assets/MarketingBranche-CXSutsfn.js","assets/Marque-kuPkPZ-N.js","assets/MesPourboires-CENjelyb.css","assets/MesPourboires-D2KfDXa0.js","assets/MesTaches-B1JrxpQE.js","assets/MesTaches-Cc4XUDf6.css","assets/momo-C2ZVfV9J.js","assets/MonMois-BXeY8BrM.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/MtnMoMo-DaNabm2B.js","assets/objectifs-BCufvsQm.js","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/opale-Djw0OZii.js","assets/oreille-B1AMUmZh.js","assets/paie-du-5-BmXVLbMv.js","assets/paie-du-5-DeJq-K_U.css","assets/paie-du-5-pur-CPiCK8fv.js","assets/paie-par-mtn-m-MELaqB.js","assets/PaieParMtn-bCHE1GAk.js","assets/paliers-CgsHxjfH.js","assets/Parametres-C9cm5kZ4.js","assets/parcours-B-eJUkv3.js","assets/Parrainages-CyGpeqjK.js","assets/Parrainages-gAHAPB_6.css","assets/PassageAvantLeFauteuil-CYqAk2v5.js","assets/pdf-CPeqtSTW.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/periode-des-pourboires-pur-BUWqfwov.js","assets/Personas-BzlQv6Xo.js","assets/Personnel-Br4NhECq.js","assets/photo-Dz-BH6yD.js","assets/pilotage-D8kf1Co8.css","assets/porte-de-l-equipe-DooPR-5b.js","assets/Pourboires-BewG7TUb.js","assets/Predictions-Brh_fUgS.js","assets/preload-helper-BRe_O-Rg.js","assets/Prestataires-D6uEbblS.js","assets/Prets-BYQh-Kpd.js","assets/PrevisionDuMois-D1pjBbdD.js","assets/PrevisionDuMois-DlFTw3OX.css","assets/Previsions-9BU2Vg1T.css","assets/Previsions-DWXQ0RX2.js","assets/previsions-pur-CvOXYaaz.js","assets/processus-pur-R6U5QcCi.js","assets/Projets-Cjbu_DGA.js","assets/projets-CLrCb2cv.js","assets/Projets-COO7WDEE.css","assets/projets-pur-2ZEMRNDU.js","assets/protocoles-DwvZjZ_v.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-qu_307sG.js","assets/quiz-5qMPWZVi.js","assets/Rapport-BZGUyxVJ.js","assets/Recommandations-BzoCyNjj.js","assets/regler-B7fKZS5Q.js","assets/regler-D1gFEaVz.css","assets/regler-par-fedapay-pur-CFpzn1nJ.js","assets/relances-pur-C9iUwl2e.js","assets/releve-des-avis-CZNjO5Ks.js","assets/SalonFoyer-TRHF0ztc.js","assets/sceau-D1X2JF5i.js","assets/secretariat-admin-C4XGHR60.js","assets/Secretariat-Cy79Zw30.css","assets/Secretariat-DRdHKU4H.js","assets/Signatures-Bccnx4OQ.js","assets/SignerUnPdf-DXxtLqet.js","assets/Synthese-ZtvjkO9Y.js","assets/SyntheseGraphes-CD1BA9lC.js","assets/systeme-TPy-pF7j.css","assets/Tableau-BCED5dZF.js","assets/temps-mhczzmk5.js","assets/Textes-DLpOzRbT.css","assets/Textes-LWf3cgeE.js","assets/tiroirs-CkDzpGy0.css","assets/tiroirs-CZavaVBu.js","assets/trone-B-r6lpi2.css","assets/trone-DggZ5eom.js","assets/useAudiences-CwHPlyQc.js","assets/useClotureDuJour-BHXN8F4m.js","assets/visios-DUsboY7q.js","assets/Vitrine-BWilTqQJ.css","assets/Vitrine-DJJC2tzy.js","assets/_admin-DRewhCcQ.js","assets/_contrat-Ce-8v4TC.js","assets/_reuni-CvGjg5_D.js","assets/_shared-DpUeJPrK.js","assets/_signature-C2LnL1X8.js","assets/_ui-7yF3Qk5m.js","assets/_ui-BrUDlmuM.css"];
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
