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
const BUILD = "20261121192334";
const A_GARDER = ["./","assets/Abonnements-Crq4yq_c.js","assets/abonnements-DlTseiMY.js","assets/Abonnements-DTY7p2DH.css","assets/Academie-CexblXTm.js","assets/Acces-O39B-6Qr.js","assets/AFaire-Da7tyYw9.js","assets/afaire-DQ1Zbu0a.js","assets/Agents-BN4nIOvI.js","assets/agents-donnees-VganRtpx.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-DlH-S94e.js","assets/App-CAhbf9sv.js","assets/Appels-C1SUuAiC.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/Assistants-D9i2Xwmg.css","assets/Assistants-Uh-igMgl.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/AtelierDesContenus-DrrznAqq.js","assets/Audience-Bl0-7aQr.js","assets/Aujourdhui-CPJ6qnQC.js","assets/auth-TN5lr_DF.js","assets/avant-le-fauteuil-lecture-Bs5e0yBY.js","assets/AvantLeFauteuil-EDsOPWAy.js","assets/avis-fiches-laBxRV3D.js","assets/avis-google-pont-DN4YH_4r.js","assets/AvisGoogle-D7dSoG-_.js","assets/AvisGoogle-DaPXfwX9.css","assets/BadgeEssai-Dqck5bxJ.js","assets/BadgeSuggere-rLC9vCVN.js","assets/besoins-peHSBYO8.js","assets/BesoinsEtRegles-BG3cvMF3.js","assets/BesoinsEtRegles-BLwxGVV5.css","assets/bilan-B-bfPYR0.css","assets/bilan-BG8sZhFY.js","assets/BilanMensuel-BFKoDHZe.js","assets/Branches-DPgFsbFb.js","assets/bridges-BsYCfkH2.js","assets/Caisse-DiwZ8P4l.js","assets/caisse-du-soir-C6vPx-E_.css","assets/caisse-du-soir-Dft6QAqf.js","assets/caisse-fluide-pur-Bk2lmWpO.js","assets/Caisses-R9Mt9CUg.js","assets/Calendrier-D-VjXjO-.js","assets/campagnes-pur-Dx9ug4FE.js","assets/Carnet-HvdTfgqT.js","assets/carte-BQkoaznJ.js","assets/carte-_W_-xBPj.css","assets/CarteModal-CCNBAe1n.js","assets/CartesCadeaux-DyAgyh9b.js","assets/Catalogue-d1bRIbxS.js","assets/CentreDeCommande-DdoJhsIU.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-G9Yj7K0W.js","assets/certificat-B_5R4q3z.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-drU4mb45.js","assets/chiffre-du-jour-pur-BzY5SXxN.js","assets/ChiffreDesPrestations-C42D_ws4.js","assets/Classement-Bi0xU3mj.js","assets/classement-CC7wEftB.js","assets/Classement-CmpbQZDu.css","assets/classement-pur-CQOYU06l.js","assets/client-Cgp7tj1J.js","assets/cloture-du-jour-CKl0_m8Y.js","assets/ClotureDuTiroir-DvISsf_s.js","assets/Coffre-CKQTrDVs.js","assets/collecte-mtn-pur-BKoFYpbn.js","assets/components-uQCFz40C.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-hfoHTFDE.js","assets/Comptes-CfANEQfb.js","assets/consultation-CPf9JHLF.js","assets/consultation-CRW6QcWf.css","assets/Consultations-DiE-2_mG.css","assets/Consultations-IKmAIAK2.js","assets/consultNotes-D38jXMg3.js","assets/contexte-de-la-reponse-CkrbVNxF.js","assets/Conversations-D4WwB5Zo.css","assets/Conversations-rhY9QKdY.js","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-CwZfb64d.js","assets/currency-Cd0clE4P.js","assets/Customers-C62eUM7M.js","assets/Dashboard-B2x7VsE_.css","assets/Dashboard-nzEePSr8.js","assets/dates-BLdFNHFh.js","assets/DemanderAPerle-BD5NgCRN.css","assets/DemanderAPerle-BjSXnFxm.js","assets/Demandes-s5fHDBb_.js","assets/DepenseEnUnePhrase-BIGRlGqP.css","assets/DepenseEnUnePhrase-DCYD3muF.js","assets/Depenses-BauKpkB2.js","assets/depenses-saisie-CgN-MryH.js","assets/devis-remis-DuSuF8bD.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-DPJMSTyv.js","assets/diagnostics-au-trone-Dh1T5S6I.js","assets/Dictee-C-pUYYFA.css","assets/Dictee-D7yPZQD2.js","assets/dictee-pur-DdcK-YgV.js","assets/Discussions-DZOq9Eh-.js","assets/echappe-html-pur-gEhHOM07.js","assets/EditeurDesOffres-BEV2phrF.js","assets/Encaissements-QYcI_OoB.js","assets/enfants-DzLUZWp_.js","assets/Engagements-aCkL2Mcy.js","assets/Engagements-Cj5S9MhG.css","assets/engagements-coffre-C3rjQfjM.js","assets/EntreDeuxSeances-CmPTat9q.js","assets/es-ByeYXant.js","assets/Evaluation-D5abtJ1i.js","assets/facture-B-10CPUP.js","assets/Factures-D5AJkc_U.js","assets/FenetreDeLAgent-DXP-UXAJ.js","assets/FenetreDesCivilites-EfEkyocr.js","assets/FenetreDesCivilites-zfNk1aak.css","assets/FenetreDuPoint-C29BdpyU.js","assets/Fil-DlvvVOeC.js","assets/finances-C8x7Mn4-.css","assets/fon-eMrS4Hbf.js","assets/fournisseurs-D-n5knvU.js","assets/Fournisseurs-DiDVh-MP.js","assets/foyer-C6aMs1ce.js","assets/Gerard-Bb5npsRh.js","assets/gerard-donnees-C12VyrXj.js","assets/Gerard-lGKehvgG.css","assets/gestes-conversation-DlKhejJ4.js","assets/heures-des-rappels-pur-BWJPB8OP.js","assets/HomeRituals-DZYvd9PF.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-Ct0zCT-X.js","assets/ia-centre-DpI_mTkd.js","assets/ia-diagnostic-pur-qGnFEvys.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-tableau-pur-p6UvREJe.js","assets/identite-B270Tdv7.js","assets/index.es-CclPU5Tz.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-_Lv0DjIj.js","assets/jspdf.es.min-WtqAWmI-.js","assets/JustePrix-DWAqPHhz.js","assets/kkiapay-Bf2rcnrY.js","assets/kkiapay-widget-CVmsl9OE.js","assets/Laboratoire-CzL9Q4Ux.js","assets/LaJournee-Bn_G0HCt.css","assets/LaJournee-FlvDGzuK.js","assets/le-caissier-pur-4XRO6Wki.js","assets/LePoint-BxiC2FCX.js","assets/LePoint-CBjCCMQ5.css","assets/LesPaiements-C9cEZlne.css","assets/LesPaiements-wjsx-1Wf.js","assets/LettresAuDossier-nR9lFhCg.js","assets/LienMndPay-CoAgytj_.js","assets/Marketing-C-4z74mc.js","assets/MarketingBranche-zH6PjclM.js","assets/Marque-DCbrlp7j.js","assets/MesPourboires-CENjelyb.css","assets/MesPourboires-ChgnogI_.js","assets/MesTaches-BgIwaZ7L.js","assets/MesTaches-Cc4XUDf6.css","assets/momo-C2ZVfV9J.js","assets/MonMois-DYy1v--d.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/MtnMoMo-CGwW_XXY.js","assets/objectifs-Bqb9R64P.js","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/opale-CVEQs1w4.js","assets/oreille-B1AMUmZh.js","assets/paie-du-5-DeJq-K_U.css","assets/paie-du-5-kl4dKTHf.js","assets/paie-du-5-pur-CPiCK8fv.js","assets/paie-par-mtn-BvtOstw8.js","assets/PaieParMtn-jQBFGud5.js","assets/paliers-DqLkBlvA.js","assets/Parametres-D8fgXLDV.js","assets/parcours-G6a2mxMt.js","assets/Parrainages-gAHAPB_6.css","assets/Parrainages-kTeJXCv0.js","assets/PassageAvantLeFauteuil-D4ijye2V.js","assets/pdf-DlypIF9I.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/periode-des-pourboires-pur-BUWqfwov.js","assets/Personas-CEVfvXo3.js","assets/Personnel-DSetAIkk.js","assets/photo-n5sI6eMg.js","assets/pilotage-D8kf1Co8.css","assets/porte-de-l-equipe-D2sIcKJc.js","assets/Pourboires-E66zjQBQ.js","assets/Predictions-CBMXzbUB.js","assets/preload-helper-BRe_O-Rg.js","assets/Prestataires-DsMU1vm-.js","assets/Prets-0zn1BKKw.js","assets/PrevisionDuMois-DlFTw3OX.css","assets/PrevisionDuMois-DSDSLy9E.js","assets/Previsions-9BU2Vg1T.css","assets/Previsions-CMZLhfQg.js","assets/previsions-pur-DLWmcfkd.js","assets/processus-pur-R6U5QcCi.js","assets/projets-BvoWeYLQ.js","assets/Projets-COO7WDEE.css","assets/Projets-fJqThwWP.js","assets/projets-pur-2ZEMRNDU.js","assets/protocoles-BcI5r5ce.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-CVrJEfa5.js","assets/quiz-5qMPWZVi.js","assets/Rapport-x0FupRuR.js","assets/Recommandations-DL7lHaGK.js","assets/regler-B2vfmG-j.js","assets/regler-DHR_B1Dm.css","assets/regler-par-fedapay-pur-DYTDdXhs.js","assets/relances-pur-C9iUwl2e.js","assets/releve-des-avis-ioV8BpLl.js","assets/SalonFoyer-sX-p2V8C.js","assets/secretariat-admin-6h2v9FdI.js","assets/Secretariat-Cy79Zw30.css","assets/Secretariat-DFKEfONl.js","assets/Signatures-Buv-s9HU.js","assets/SignerUnPdf-eacgu2Ue.js","assets/Synthese-Ox5Mfh50.js","assets/SyntheseGraphes-BO_PWm55.js","assets/systeme-TPy-pF7j.css","assets/Tableau-C488MWbu.js","assets/temps-CsepmeEt.js","assets/Textes-BuToIm8S.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-BPA2Yjpr.js","assets/tiroirs-CkDzpGy0.css","assets/trone-B-r6lpi2.css","assets/trone-nH5ZQjpH.js","assets/useAudiences-UNTEWvos.js","assets/useClotureDuJour-BQ4j_oNm.js","assets/visios-BPfJwjWJ.js","assets/Vitrine-BWilTqQJ.css","assets/Vitrine-PByHQLiG.js","assets/_admin-eHFos_Mb.js","assets/_contrat-CUwggSzw.js","assets/_reuni-Bm7rfLOX.js","assets/_shared-BHfAkSwT.js","assets/_signature-BxISjDLb.js","assets/_ui-BrUDlmuM.css","assets/_ui-C-Rmxutd.js"];
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
