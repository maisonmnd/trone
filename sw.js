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
const BUILD = "20261122061212";
const A_GARDER = ["./","assets/abonnements-CQNzsc5J.js","assets/Abonnements-DTY7p2DH.css","assets/Abonnements-LPnk38Lz.js","assets/Academie--CVSXzpV.js","assets/Acces-Bcd9eJWP.js","assets/afaire-CM2Ltq9j.js","assets/AFaire-CTiDvTTK.js","assets/Agents-CnjDYOEF.js","assets/agents-donnees-ckmSv0qs.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-DYxHhm64.js","assets/App-DooK4zor.js","assets/Appels-Bly9rG1P.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/Assistants-BjF1jJEn.js","assets/Assistants-D9i2Xwmg.css","assets/AtelierDesContenus-D3-p6F2A.css","assets/AtelierDesContenus-DcPAp3Y3.js","assets/Audience-D13lgckd.js","assets/Aujourdhui-eryn75hl.js","assets/auth-_GdI_O3I.js","assets/avant-le-fauteuil-lecture-CiGmBsx0.js","assets/AvantLeFauteuil-DvQTig92.js","assets/avis-fiches-DCwX4wjZ.js","assets/avis-google-pont-D4v_R6pH.js","assets/AvisGoogle-BZF2iGQG.js","assets/AvisGoogle-DaPXfwX9.css","assets/BadgeEssai-Dk_-HYdJ.js","assets/BadgeSuggere-C9XBVZHD.js","assets/besoins-DmIms2RM.js","assets/BesoinsEtRegles-BLwxGVV5.css","assets/BesoinsEtRegles-DcYageXE.js","assets/bilan-B-bfPYR0.css","assets/bilan-Dcy8T5PS.js","assets/BilanMensuel-CndUxAtz.js","assets/Branches-DSGu5tAU.js","assets/bridges-C8JC6uSz.js","assets/Caisse-CwxaCpP5.js","assets/caisse-du-soir-C6vPx-E_.css","assets/caisse-du-soir-DrXStIBi.js","assets/caisse-fluide-pur-d1pGE1mg.js","assets/Caisses-DVmV6G0L.js","assets/Calendrier-_S6VUWni.js","assets/campagnes-pur-CxG3J_pZ.js","assets/Carnet-CO33m9n0.js","assets/carte-Bxsd3nvE.js","assets/carte-_W_-xBPj.css","assets/CarteModal-BVjZntsK.js","assets/CartesCadeaux-Hbw0ENZq.js","assets/Catalogue-B7w8hmS5.js","assets/CentreDeCommande-CUHM1EFz.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-D97G9YVJ.js","assets/certificat-eX2zfQdL.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-B74gBM0s.js","assets/chiffre-du-jour-pur-D8eK8jeD.js","assets/ChiffreDesPrestations-Dk1CBFHP.js","assets/Classement-CmpbQZDu.css","assets/classement-Cp-Mw7Z-.js","assets/Classement-DA1JqbN8.js","assets/classement-pur-CQOYU06l.js","assets/client-ClsFnyJv.js","assets/cloture-du-jour-DP4xFrWd.js","assets/ClotureDuTiroir-DNrWzqiC.js","assets/Coffre-BzWA0c63.js","assets/collecte-mtn-pur-DsqLz5d0.js","assets/components-B9Hy1rB1.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-CYbMIh_X.js","assets/Comptes-vSWIt5tk.js","assets/consultation-C8NOKCAV.js","assets/consultation-CRW6QcWf.css","assets/Consultations-DhZ5-Su0.js","assets/Consultations-DiE-2_mG.css","assets/consultNotes-77_ougYY.js","assets/contexte-de-la-reponse-mv7puN9a.js","assets/Conversations-D4WwB5Zo.css","assets/Conversations-DI1-INrv.js","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-uM0XS189.js","assets/currency-Cd0clE4P.js","assets/Customers-DQA94I8y.js","assets/Dashboard-B2x7VsE_.css","assets/Dashboard-CUsahQoj.js","assets/dates-Dk28KdoF.js","assets/DemanderAPerle-B2CYh0Z7.js","assets/DemanderAPerle-BD5NgCRN.css","assets/Demandes-ChmMGv3-.js","assets/DepenseEnUnePhrase-BIGRlGqP.css","assets/DepenseEnUnePhrase-DDZ0FWYr.js","assets/Depenses-BfxNDOcn.js","assets/depenses-saisie-B5hAi12H.js","assets/devis-remis-C6BZibMH.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-CcarxMFb.js","assets/diagnostics-au-trone-CjERFT31.js","assets/Dictee-C-pUYYFA.css","assets/Dictee-pAeoCA-Q.js","assets/dictee-pur-U5oalFUV.js","assets/Discussions-O-pgO_QB.js","assets/echappe-html-pur-gEhHOM07.js","assets/EditeurDesOffres-B2O8gyLe.js","assets/Encaissements-CTsgiseY.js","assets/enfants-YdcHxPG5.js","assets/Engagements-Cj5S9MhG.css","assets/engagements-coffre-CJNZzIna.js","assets/Engagements-CvIrzNnX.js","assets/EntreDeuxSeances-C_UjF3l8.js","assets/es-BI3ZF_OH.js","assets/Evaluation-BrcMlo6k.js","assets/facture-C1StLZ0A.js","assets/Factures-C1_RKIf3.js","assets/FenetreDeLAgent-Kj9duy_4.js","assets/FenetreDesCivilites-BXGp4uh6.js","assets/FenetreDesCivilites-zfNk1aak.css","assets/FenetreDuPoint-CG_3tLVi.js","assets/Fil-B7PqbvcD.js","assets/finances-C8x7Mn4-.css","assets/fon-BnOFHQLG.js","assets/fournisseurs-B8FX27uR.js","assets/Fournisseurs-BA44-_iu.js","assets/foyer-CczpSgnC.js","assets/gerard-donnees-B-x7K4WM.js","assets/Gerard-DwvOtFsr.js","assets/Gerard-lGKehvgG.css","assets/gestes-conversation-CL2-IPK3.js","assets/heures-des-rappels-pur-BWJPB8OP.js","assets/HomeRituals-DJByiw10.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-CQQCuAWZ.js","assets/ia-centre-CRFhxTr2.js","assets/ia-diagnostic-pur-qGnFEvys.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-tableau-pur-p6UvREJe.js","assets/identite-BXoFbj08.js","assets/index.es-CAum88ry.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-CpyVQjJA.js","assets/jspdf.es.min-DD_X-vVD.js","assets/JustePrix-CDU9YoCZ.js","assets/kkiapay-k26e9tVZ.js","assets/kkiapay-widget-CVmsl9OE.js","assets/Laboratoire-Q7ZmmPev.js","assets/LaJournee-Bn_G0HCt.css","assets/LaJournee-CIiZiZj4.js","assets/le-caissier-pur-yStv7Fzb.js","assets/LePoint-Cb4iE-r1.js","assets/LePoint-CBjCCMQ5.css","assets/LesPaiements-C9cEZlne.css","assets/LesPaiements-MHrppTU_.js","assets/LettresAuDossier-DUonbZ_k.js","assets/LienMndPay-CpnXW8ke.js","assets/Marketing-DcI_gV-R.js","assets/MarketingBranche-DDuJEMml.js","assets/Marque-b4zdGJ5V.js","assets/MesPourboires-BdhamGQF.js","assets/MesPourboires-CENjelyb.css","assets/MesTaches-Cc4XUDf6.css","assets/MesTaches-DXTEvslX.js","assets/momo-C2ZVfV9J.js","assets/MonMois-DJz1MXOt.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/MtnMoMo-CPZnrk6m.js","assets/objectifs-B04RRNL5.js","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/opale-z5ySU4As.js","assets/oreille-B1AMUmZh.js","assets/paie-du-5-BIo3Mavm.js","assets/paie-du-5-DeJq-K_U.css","assets/paie-du-5-pur-CPiCK8fv.js","assets/paie-par-mtn-CdsaQyvE.js","assets/PaieParMtn-BqooOLtK.js","assets/paliers-CrxxGOhc.js","assets/Parametres-CRcnSwZ_.js","assets/parcours-BdFVnprl.js","assets/Parrainages-CuBGSiE9.js","assets/Parrainages-gAHAPB_6.css","assets/PassageAvantLeFauteuil-BsM_Z2Le.js","assets/pdf-CMffXaUd.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/periode-des-pourboires-pur-BUWqfwov.js","assets/Personas-CEL7BBur.js","assets/Personnel-BIG2ynjE.js","assets/photo-Mymk9tVv.js","assets/pilotage-D8kf1Co8.css","assets/porte-de-l-equipe-CdX1k_9h.js","assets/Pourboires-CxQ-nKPP.js","assets/Predictions-CelIPBsJ.js","assets/preload-helper-BRe_O-Rg.js","assets/Prestataires-BlDO9K6n.js","assets/Prets-BacAihmN.js","assets/PrevisionDuMois-DlFTw3OX.css","assets/PrevisionDuMois-DMbguvcS.js","assets/Previsions-9BU2Vg1T.css","assets/Previsions-ChKzFWYa.js","assets/previsions-pur-PyRoUj-o.js","assets/processus-pur-R6U5QcCi.js","assets/projets-1_kSC-C3.js","assets/Projets-COO7WDEE.css","assets/Projets-DNXDz03R.js","assets/projets-pur-2ZEMRNDU.js","assets/protocoles-5bTpZYHi.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-DZpRggIQ.js","assets/quiz-5qMPWZVi.js","assets/Rapport-DDHtjlU0.js","assets/Recommandations-DmYtBdPZ.js","assets/regler-CBOo_PXa.js","assets/regler-DHR_B1Dm.css","assets/regler-par-fedapay-pur-CBsdnUYQ.js","assets/relances-pur-C9iUwl2e.js","assets/releve-des-avis-C3v_05m2.js","assets/SalonFoyer-Dn3KqxFs.js","assets/secretariat-admin-By_0dAw2.js","assets/Secretariat-CGwH1iD9.js","assets/Secretariat-Cy79Zw30.css","assets/Signatures-CIaCmRbZ.js","assets/SignerUnPdf-Cge3liXX.js","assets/Synthese-ucvZVbrV.js","assets/SyntheseGraphes-DEy4_bRu.js","assets/systeme-TPy-pF7j.css","assets/Tableau-hdEqGsj6.js","assets/temps-BIwUWDZi.js","assets/Textes-DLpOzRbT.css","assets/Textes-ZCb2nG60.js","assets/tiroirs-BE7C6UwD.js","assets/tiroirs-CkDzpGy0.css","assets/trone-B-r6lpi2.css","assets/trone-SQC-O5OU.js","assets/useAudiences-uyhUQ4R6.js","assets/useClotureDuJour-0jsUEbVC.js","assets/visios-Dv2-aUz0.js","assets/Vitrine-BWilTqQJ.css","assets/Vitrine-D-zmnZDq.js","assets/_admin-BOsMdqHG.js","assets/_contrat-lADgI7Wv.js","assets/_reuni-CSbJ9_Dq.js","assets/_shared-CykL5w3g.js","assets/_signature-C2gVP7vm.js","assets/_ui-BrUDlmuM.css","assets/_ui-CGHp-aQx.js"];
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
