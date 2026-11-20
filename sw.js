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
const BUILD = "20261120135204";
const A_GARDER = ["./","assets/Abonnements-DJlBr9Qa.js","assets/Abonnements-DTY7p2DH.css","assets/abonnements-NKGA0fGz.js","assets/Academie-BH3hmUwB.js","assets/Acces-BpCzdix-.js","assets/AFaire-DKclDmk1.js","assets/afaire-DpR8aNHE.js","assets/Agents-84zadSfO.js","assets/agents-donnees-B8ItLn55.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-DcdTFe3C.js","assets/App-XNdQ7F_4.js","assets/Appels-zZW1ryAV.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/Assistants-CvHdd8Cq.js","assets/Assistants-D9i2Xwmg.css","assets/AtelierDesContenus-CHak73vV.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/Audience-nnqetApi.js","assets/Aujourdhui-Cf3AxxPp.js","assets/auth-CYhR35ig.js","assets/avant-le-fauteuil-lecture-SWEFkqU2.js","assets/AvantLeFauteuil-TKNvaO3R.js","assets/avis-fiches-CMu6Fnfz.js","assets/AvisGoogle-BuCIu6rJ.js","assets/AvisGoogle-DaPXfwX9.css","assets/BadgeEssai-Dof-BXfV.js","assets/BadgeSuggere-BBf6VC1o.js","assets/besoins-DJ_lsHVO.js","assets/BesoinsEtRegles-BLwxGVV5.css","assets/BesoinsEtRegles-Cge8740n.js","assets/bilan-B-bfPYR0.css","assets/bilan-CB8OGZYa.js","assets/BilanMensuel-BNjY4Zjm.js","assets/Branches-BIcyptUO.js","assets/bridges-Cq269ZWZ.js","assets/Caisse-BjQNPT9z.js","assets/caisse-du-soir-C6vPx-E_.css","assets/caisse-du-soir-DK4SKVho.js","assets/Caisses-CmC5sudL.js","assets/Calendrier-DajicJwH.js","assets/campagnes-pur-jCXl8xgU.js","assets/Carnet-DGz35DX5.js","assets/carte-HcZ6OThr.js","assets/carte-_W_-xBPj.css","assets/CarteModal-DeHK_amj.js","assets/CartesCadeaux-BELnq1Lv.js","assets/Catalogue-4pa8UZ1o.js","assets/CentreDeCommande-Du8kyJhp.css","assets/CentreDeCommande-VRjLi7vs.js","assets/Cercle-Cqt4Fkqp.js","assets/certificat-BUYGdOIh.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-DjUQXGi_.js","assets/chiffre-du-jour-pur-D8TtK74x.js","assets/ChiffreDesPrestations-x4y5INTt.js","assets/Classement-CmpbQZDu.css","assets/Classement-Mdfdkc3R.js","assets/classement-pur-CQOYU06l.js","assets/client-DaTyJGYX.js","assets/cloture-du-jour-7_TNBWNu.js","assets/ClotureDuTiroir-Dh7dKSm5.js","assets/Coffre-CLrBV7w1.js","assets/collecte-mtn-pur-Bq3uWgWT.js","assets/components-D_rOtZqH.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-CAa8eesS.js","assets/Comptes-Bas42uU8.js","assets/consultation-CRW6QcWf.css","assets/consultation-yGKqMZlP.js","assets/Consultations-Blt1bVO9.js","assets/Consultations-DiE-2_mG.css","assets/consultNotes-BS3k5TOC.js","assets/Conversations-D4WwB5Zo.css","assets/Conversations-H6fLqomo.js","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-D-1w6zZW.js","assets/currency-Cd0clE4P.js","assets/Customers-BFrElMHP.js","assets/Dashboard-B2x7VsE_.css","assets/Dashboard-Bj-j6M7w.js","assets/dates-haGdRZMz.js","assets/Demandes-DjvkvS0h.js","assets/DepenseEnUnePhrase-bEC8JGxN.js","assets/DepenseEnUnePhrase-BIGRlGqP.css","assets/Depenses-0BF7cTJ1.js","assets/depenses-saisie-ChBh-dGR.js","assets/devis-remis-Dodu5Z-m.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-Cq2X68En.js","assets/diagnostics-au-trone-BW9lKjH_.js","assets/Dictee-C-pUYYFA.css","assets/Dictee-CcbJTnQ9.js","assets/dictee-pur-Bm-cv_6A.js","assets/Discussions-CavO18pe.js","assets/echappe-html-pur-gEhHOM07.js","assets/EditeurDesOffres-Ce76_XAW.js","assets/Encaissements-B8YBaMY3.js","assets/enfants-B2uBOq_0.js","assets/Engagements-Cj5S9MhG.css","assets/engagements-coffre-BGzbaM0y.js","assets/Engagements-rHq7GF-b.js","assets/EntreDeuxSeances-BPi6jd-k.js","assets/es-C0HlmQLP.js","assets/Evaluation-phOf54py.js","assets/facture-rsLNHYd3.js","assets/Factures-D2Ma6mlM.js","assets/FenetreDeLAgent-DuTxy5T0.js","assets/FenetreDesCivilites-BxIWB04W.js","assets/FenetreDesCivilites-zfNk1aak.css","assets/FenetreDuPoint-CduZk6-Q.js","assets/Fil-DGaDu0jQ.js","assets/finances-C8x7Mn4-.css","assets/fon-D6lmYCfc.js","assets/fournisseurs-BvB2AMTY.js","assets/Fournisseurs-Dd8AdT-W.js","assets/foyer-CrxVuaM8.js","assets/gerard-donnees-Do3whinU.js","assets/Gerard-eNB9olTQ.js","assets/Gerard-vo2IWvP3.css","assets/gestes-conversation-D6PFAaVl.js","assets/heures-des-rappels-pur-BWJPB8OP.js","assets/HomeRituals-DdN2XeI4.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-5poO7GV_.js","assets/ia-centre-Cfwf9jJt.js","assets/ia-diagnostic-pur-qGnFEvys.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-tableau-pur-p6UvREJe.js","assets/identite-Ba2q2ppC.js","assets/index.es-BVZlkUP2.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-CtgTe48L.js","assets/jspdf.es.min-Cjcrc2f8.js","assets/JustePrix-Cr8JMzdg.js","assets/kkiapay-BohcDmA-.js","assets/kkiapay-widget-CVmsl9OE.js","assets/Laboratoire-D31RAHc2.js","assets/LaJournee-Bn_G0HCt.css","assets/LaJournee-CC2ohhsS.js","assets/le-caissier-pur-UUoRXOzY.js","assets/LesPaiements-C9cEZlne.css","assets/LesPaiements-DusXxxzJ.js","assets/LettresAuDossier-CefVVZcn.js","assets/LienMndPay-D_ovI_Ew.js","assets/Marketing-DaTzELGw.js","assets/MarketingBranche-CPiB3018.js","assets/Marque-XCHjYz59.js","assets/MesPourboires-CENjelyb.css","assets/MesPourboires-CEZnymWX.js","assets/MesTaches-Bi6f_J82.js","assets/MesTaches-Cc4XUDf6.css","assets/momo-C2ZVfV9J.js","assets/MonMois-A8hj0EWC.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/MtnMoMo-SMR3LDld.js","assets/objectifs-Clvm-anv.js","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/opale-Ei7A0n3O.js","assets/oreille-B1AMUmZh.js","assets/paie-du-5-D1U6S012.js","assets/paie-du-5-DeJq-K_U.css","assets/paie-du-5-pur-CPiCK8fv.js","assets/paie-par-mtn-CvJZszJi.js","assets/PaieParMtn-D2g-U2s4.js","assets/paliers-BFm55fBf.js","assets/Parametres-DwoyrbEX.js","assets/parcours-DjP2GEvd.js","assets/Parrainages-gAHAPB_6.css","assets/Parrainages-TWhKHCNq.js","assets/PassageAvantLeFauteuil-CFDAFQlN.js","assets/pdf-DrzMZYge.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/periode-des-pourboires-pur-BUWqfwov.js","assets/Personas-B15-cq7u.js","assets/Personnel-Dw5n_cOU.js","assets/photo-D8TWzCu4.js","assets/pilotage-D8kf1Co8.css","assets/porte-de-l-equipe-q3vQtTmN.js","assets/Pourboires-5aj03OLS.js","assets/Predictions-CIuCVDcG.js","assets/preload-helper-BRe_O-Rg.js","assets/Prestataires-BHJJUh5C.js","assets/Prets-D6az2r9P.js","assets/PrevisionDuMois-DlFTw3OX.css","assets/PrevisionDuMois-DSyTm7-l.js","assets/Previsions-9BU2Vg1T.css","assets/Previsions-BqsGUY2q.js","assets/previsions-pur-CDv8FIc1.js","assets/processus-pur-R6U5QcCi.js","assets/Projets-C2O-UvGR.js","assets/Projets-COO7WDEE.css","assets/projets-D2jUblri.js","assets/projets-pur-2ZEMRNDU.js","assets/protocoles-D44Ch7Yu.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-ALiALlzx.js","assets/quiz-5qMPWZVi.js","assets/Rapport-Br4badO9.js","assets/Recommandations-Dq9eAv4f.js","assets/regler-Ba0KvMB9.js","assets/regler-DHR_B1Dm.css","assets/regler-par-fedapay-pur-G8CEJdGn.js","assets/relances-pur-BacTXlI2.js","assets/releve-des-avis-B8ZG3Rb1.js","assets/SalonFoyer-BIgGkHqc.js","assets/secretariat-admin-D71VOSQH.js","assets/Secretariat-Cy79Zw30.css","assets/Secretariat-DIZwks9g.js","assets/Signatures-BDK3-eN0.js","assets/SignerUnPdf-Dv6RyDxR.js","assets/Synthese-DAMbKnNA.js","assets/SyntheseGraphes-dMJFsC2S.js","assets/systeme-TPy-pF7j.css","assets/Tableau-ZI_NvKtN.js","assets/temps-pqz97xbl.js","assets/Textes-BhtE2F5X.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-B65Pacfa.js","assets/tiroirs-CkDzpGy0.css","assets/trone-CzPiHb96.js","assets/trone-Dsdrwhxz.css","assets/useAudiences-CMaZY8rJ.js","assets/useClotureDuJour-DhaHvV1W.js","assets/visios-SS65ptTj.js","assets/Vitrine-B026_b0t.js","assets/Vitrine-BWilTqQJ.css","assets/_admin-Dj9rVb-V.js","assets/_contrat-BUMqXl_4.js","assets/_reuni-DXn2IOlw.js","assets/_shared-JG97qTju.js","assets/_signature-DFsM2mfb.js","assets/_ui-BrUDlmuM.css","assets/_ui-BurQhbsn.js"];
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
