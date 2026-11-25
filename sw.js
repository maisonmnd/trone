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
const BUILD = "20261125084352";
const A_GARDER = ["./","assets/abonnements-D9g6WU6X.js","assets/Abonnements-DreCGHcL.js","assets/Abonnements-DTY7p2DH.css","assets/Academie-DG9qc9eW.js","assets/Acces-COOl16QX.js","assets/afaire-CsykYSjq.js","assets/AFaire-DsuArwWC.js","assets/Agents-CfNtTnQT.js","assets/agents-donnees-Uue5ofNx.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-DL3Sy8Lz.js","assets/App-DIaWMqni.js","assets/Appels-wWlcy655.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/Assistants-D9i2Xwmg.css","assets/Assistants-DOhrBk71.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/AtelierDesContenus-ttBJDITE.js","assets/Audience-DCup8dje.js","assets/Aujourdhui-BrVWNm1G.js","assets/auth-CCNVETsl.js","assets/avant-le-fauteuil-lecture-odmA-uZv.js","assets/AvantLeFauteuil-DmcV9SY-.js","assets/avis-fiches-Dnm8Uupq.js","assets/avis-google-pont-CDUIiUx2.js","assets/AvisGoogle-DaPXfwX9.css","assets/AvisGoogle-DwuP3Epp.js","assets/BadgeEssai-B8MebDoe.js","assets/BadgeSuggere-D9IxWaFM.js","assets/besoins-CARWHvsQ.js","assets/BesoinsEtRegles-BLwxGVV5.css","assets/BesoinsEtRegles-DLtottmw.js","assets/bilan-B-bfPYR0.css","assets/bilan-DQuPTI9p.js","assets/BilanMensuel-CDSy190r.js","assets/Branches-Ca4zBcf4.js","assets/bridges-DBQmt7Rx.js","assets/Caisse-B1FmpfXs.js","assets/caisse-du-soir-C6vPx-E_.css","assets/caisse-du-soir-Q9XNfzhx.js","assets/caisse-fluide-pur-BQyocSX2.js","assets/Caisses-BuiIAwVC.js","assets/Calendrier-7CS5KwHy.js","assets/campagnes-pur-BGzB1KXS.js","assets/Carnet-Zjfgncrv.js","assets/carte-DiZlnYd_.js","assets/carte-_W_-xBPj.css","assets/CarteModal-CQKjezuC.js","assets/CartesCadeaux-RUyYm7K-.js","assets/Catalogue-D1xV3ii6.js","assets/CentreDeCommande-BofTOzmN.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-CbCvUGbk.js","assets/certificat-D629fM4A.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-BhIhAPy2.js","assets/chiffre-du-jour-pur-kbGHpl-3.js","assets/ChiffreDesPrestations-zQ3_jSKc.js","assets/Classement-CmpbQZDu.css","assets/classement-Cp69Suz_.js","assets/Classement-FO2_MsHA.js","assets/classement-pur-CQOYU06l.js","assets/client-DmT1tkZG.js","assets/cloture-du-jour-BqeMModO.js","assets/ClotureDuTiroir-D6OJtrIS.js","assets/Coffre-BmJkwAYb.js","assets/components-BKcglkZN.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-5zJmCAdb.js","assets/Comptes-C122RDHa.js","assets/consultation-CRW6QcWf.css","assets/consultation-CuQrxkwN.js","assets/Consultations-Di-Nx7EF.js","assets/Consultations-DiE-2_mG.css","assets/consultNotes-BAKQMwoN.js","assets/contexte-de-la-reponse-Dw64OcFP.js","assets/Conversations-Adjc-nQS.js","assets/Conversations-D4WwB5Zo.css","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-Aoid2BsZ.js","assets/currency-Cd0clE4P.js","assets/Customers-CGgybxKA.js","assets/Dashboard-CAzpixsS.js","assets/Dashboard-Cw5zWmQu.css","assets/dates-DVQW_t5x.js","assets/DemanderAPerle-BD5NgCRN.css","assets/DemanderAPerle-BJ42m7Ed.js","assets/Demandes-CVF_lHK0.js","assets/DepenseEnUnePhrase-BIGRlGqP.css","assets/DepenseEnUnePhrase-BZYUcz3m.js","assets/Depenses-ByAyeoga.js","assets/depenses-saisie-QFjh7tI0.js","assets/devis-CdIRAvZk.css","assets/devis-D350GdxY.js","assets/devis-remis-DfuyussK.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-B7FJO8hg.js","assets/diagnostics-au-trone-BRWzQB5W.js","assets/Dictee-C-pUYYFA.css","assets/dictee-pur-Cb2mKoGJ.js","assets/Dictee-qWsz1VyB.js","assets/Discussions-DoZAYry8.js","assets/dist-9vv0te18.js","assets/echappe-html-pur-gEhHOM07.js","assets/EditeurDesOffres-DhhgHmXO.js","assets/Encaissements-BNgyxvER.js","assets/EnDirect-C9dEJTND.js","assets/enfants-BFaoWuiS.js","assets/Engagements-BF8muVWS.js","assets/Engagements-Cj5S9MhG.css","assets/engagements-coffre-DbFP2Ksc.js","assets/EntreDeuxSeances-yZZ5iMK4.js","assets/es-DYbiB9RS.js","assets/etoiles-pur-CgRPMSHm.js","assets/Evaluation-Cd5XDyNo.js","assets/facture-Dx1sf13-.js","assets/Factures-BFtHopg8.js","assets/FenetreDeLAgent-B7aWYhS5.js","assets/FenetreDesCivilites-B-dpjmg8.js","assets/FenetreDesCivilites-zfNk1aak.css","assets/FenetreDuPoint-DNO7HTyd.js","assets/Fil-fv6yKxDT.js","assets/finances-C8x7Mn4-.css","assets/fon-CXRzmmx-.js","assets/fournisseurs-DsaXpW6T.js","assets/Fournisseurs-DycHfAhv.js","assets/foyer-CYNh4-Vr.js","assets/Gerard-cK_zSKFa.js","assets/gerard-donnees-CsKWz8WL.js","assets/Gerard-lGKehvgG.css","assets/gestes-conversation-BUd6UnhC.js","assets/heures-des-rappels-pur-BWJPB8OP.js","assets/HomeRituals-CDMymjDR.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-CVhGTD4B.js","assets/ia-centre-CNVj0zmU.js","assets/ia-diagnostic-pur-qGnFEvys.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-tableau-pur-p6UvREJe.js","assets/identite-CRlyVBHg.js","assets/index.es-B94jhs00.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-BxVOaCQn.js","assets/jspdf.es.min-D_7ziMtV.js","assets/JustePrix-DqqiwREe.js","assets/kkiapay-BKV_UhJ0.js","assets/kkiapay-widget-CaHBoBVm.js","assets/Laboratoire-Dbk1a1kB.js","assets/LaJournee-Bn_G0HCt.css","assets/LaJournee-DOzYmZzD.js","assets/le-caissier-pur-DjsaI3ii.js","assets/le-sceau-pur-Dv-IZ_M2.js","assets/LePoint-Bw5bjy9F.js","assets/LePoint-CBjCCMQ5.css","assets/LesPaiements-BTWeRFvl.js","assets/LesPaiements-C9cEZlne.css","assets/LettresAuDossier-DMl6KVcH.js","assets/LienMndPay-DmgJ8SVk.js","assets/Marketing-DLmm3UIN.js","assets/MarketingBranche-BjjGPxMA.js","assets/Marque-DY0dT-C2.js","assets/MesPourboires-CENjelyb.css","assets/MesPourboires-CTs8LWzY.js","assets/MesTaches-Cc4XUDf6.css","assets/MesTaches-Cd8-JMFt.js","assets/mnd-pay-pur-CfS2mkAo.js","assets/momo-C2ZVfV9J.js","assets/MonMois-Dj5ts_Ad.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/MtnMoMo-BToB6DiA.js","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/objectifs-xkAEY8j5.js","assets/opale-D2332UbZ.js","assets/oreille-B1AMUmZh.js","assets/paie-du-5-C_Xiz3Nq.js","assets/paie-du-5-DeJq-K_U.css","assets/paie-du-5-pur-CPiCK8fv.js","assets/paie-par-mtn-llBeOKK_.js","assets/PaieParMtn-Bk3pjfod.js","assets/paliers-B6Ei9pde.js","assets/Parametres-DjqaTulv.js","assets/parcours-DXgu38j8.js","assets/Parrainages-BIzeJNGj.js","assets/Parrainages-gAHAPB_6.css","assets/PassageAvantLeFauteuil-DHRtgXec.js","assets/pdf-D8oU4Wsi.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/periode-des-pourboires-pur-BUWqfwov.js","assets/Personas-CAM8TKzc.js","assets/Personnel-1POwbTt-.js","assets/photo-D7aYPMJJ.js","assets/pilotage-D8kf1Co8.css","assets/porte-de-l-equipe-CEk94SYv.js","assets/Pourboires-CKAOKH80.js","assets/Predictions-CsRsSzxJ.js","assets/preload-helper-BRe_O-Rg.js","assets/Prestataires-B8IrOGur.js","assets/Prets-CI175sRX.js","assets/PrevisionDuMois-BSWcT4wT.js","assets/PrevisionDuMois-DlFTw3OX.css","assets/Previsions-9BU2Vg1T.css","assets/Previsions-C3hJgnE0.js","assets/previsions-pur-Bji0tSbZ.js","assets/processus-pur-R6U5QcCi.js","assets/Projets-COO7WDEE.css","assets/Projets-D_47yhd_.js","assets/projets-JSRLLO24.js","assets/projets-pur-2ZEMRNDU.js","assets/protocoles-BcWyKL5B.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-B9mQ_c-h.js","assets/quiz-5qMPWZVi.js","assets/Rapport-1ekyjyi-.js","assets/Recommandations-vuA9LHl6.js","assets/regler-D1gFEaVz.css","assets/regler-o9jVcUg4.js","assets/regler-par-fedapay-pur-DP7zXAs5.js","assets/relances-pur-C9iUwl2e.js","assets/releve-des-avis-GuSlglAm.js","assets/SalonFoyer-CQeELTnm.js","assets/sceau-9_r0L7V5.js","assets/secretariat-admin-4UOHoyoj.js","assets/Secretariat-CLg7k12t.js","assets/Secretariat-Cy79Zw30.css","assets/Signatures-DlaXtKMA.js","assets/SignerUnPdf-DgKzu0Ao.js","assets/Synthese-BkFz3KWR.js","assets/SyntheseGraphes-Bp_Q8ZIf.js","assets/systeme-TPy-pF7j.css","assets/Tableau-0l6s2LH7.js","assets/temps-BZZ3jtJA.js","assets/Textes-D0eHnt-F.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-CkDzpGy0.css","assets/tiroirs-jkMgV-8z.js","assets/trone-C-lpcLUc.css","assets/trone-CNtORF-h.js","assets/useAudiences-BlbiuOgb.js","assets/useClotureDuJour-_JKkmn33.js","assets/visios-D-XTXo0s.js","assets/Vitrine-BWilTqQJ.css","assets/Vitrine-CQCGRqwZ.js","assets/_admin-D1cpNFLi.js","assets/_contrat-C3ka8PAI.js","assets/_reuni-DPFXgzW6.js","assets/_shared-HG-rK5U7.js","assets/_signature-DebBUJf5.js","assets/_ui-BrUDlmuM.css","assets/_ui-tm8FsqWB.js"];
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
