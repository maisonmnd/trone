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
const BUILD = "20261126010524";
const A_GARDER = ["./","assets/Abonnements-Ciscm3jw.js","assets/Abonnements-DTY7p2DH.css","assets/abonnements-YQw6bP46.js","assets/Academie-DlqNIOBU.js","assets/Acces-B8x6XEdW.js","assets/AFaire-B6ZzhmB_.js","assets/afaire-BsN6AIaq.js","assets/Agents-CU7wUV7P.js","assets/agents-donnees-C4SK9qAV.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-BlIpjpxL.js","assets/App-BC4ruOnw.js","assets/Appels-CvrmSq9l.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/Assistants-BakZNbeQ.js","assets/Assistants-D9i2Xwmg.css","assets/AtelierDesContenus--kyMJZLu.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/Audience-w0xecjxN.js","assets/Aujourdhui-Txz6cRE3.js","assets/auth-Dy63PRGI.js","assets/avant-le-fauteuil-lecture-nV9VDBmO.js","assets/AvantLeFauteuil-CiQV-9oj.js","assets/avis-fiches-BxvYQGNa.js","assets/avis-google-pont-DmN6ly8r.js","assets/AvisGoogle-DaPXfwX9.css","assets/AvisGoogle-etrcOxw4.js","assets/BadgeEssai-CKIYZC9m.js","assets/BadgeSuggere-XcOWKjPw.js","assets/besoins-CqleUbN4.js","assets/BesoinsEtRegles-BLwxGVV5.css","assets/BesoinsEtRegles-BqYzz83O.js","assets/bilan-B-bfPYR0.css","assets/bilan-CtsSYxUi.js","assets/BilanMensuel-MBMnQ9G8.js","assets/Branches-O6RTxVXi.js","assets/bridges-BTa5W6EL.js","assets/Caisse-CZdqFiJb.js","assets/caisse-du-soir-BznsO2NJ.js","assets/caisse-du-soir-C6vPx-E_.css","assets/caisse-fluide-pur-C5_G_fD2.js","assets/Caisses-DyyOQoKK.js","assets/Calendrier-CVcQOtSl.js","assets/campagnes-pur-BzRHzph6.js","assets/Carnet-D_10Mpu_.js","assets/carte-Dpq8kqOl.js","assets/carte-_W_-xBPj.css","assets/CarteModal-DAV-En98.js","assets/CartesCadeaux-BILLXePe.js","assets/Catalogue-CHiM3kQ2.js","assets/CentreDeCommande-CpsnzEpc.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-BOjyj96H.js","assets/certificat-B20yobsr.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-BlziosZ8.js","assets/chiffre-du-jour-pur-B6kDSnIh.js","assets/ChiffreDesPrestations-BwOEn0PY.js","assets/classement-CVytcOXt.js","assets/Classement-C_fpjmgG.js","assets/classement-pur-DgNYRo7t.js","assets/Classement-T9x-HPwd.css","assets/client-C4oEomMk.js","assets/cloture-du-jour-D05WNdqy.js","assets/ClotureDuTiroir-jTNYsIuq.js","assets/Coffre-BGlThcqt.js","assets/components-4UnrwxgI.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-Dp-QBAr_.js","assets/Comptes-vxMjc9Nv.js","assets/consultation-BOvrF9Rw.js","assets/consultation-CRW6QcWf.css","assets/Consultations-DiE-2_mG.css","assets/Consultations-Dv-N07IH.js","assets/consultNotes-DBKrpho1.js","assets/contexte-de-la-reponse-CAJYzOAw.js","assets/Conversations-D4WwB5Zo.css","assets/Conversations-nr08qAZg.js","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-DTvCKma0.js","assets/currency-Cd0clE4P.js","assets/Customers-BTmtThCn.js","assets/Dashboard-9L6MhHgk.js","assets/Dashboard-BTJPE8sY.css","assets/dates-BvmF9MYo.js","assets/DemanderAPerle-BD5NgCRN.css","assets/DemanderAPerle-BOQdvs69.js","assets/Demandes-DX4N0Y3z.js","assets/DepenseEnUnePhrase-BIGRlGqP.css","assets/DepenseEnUnePhrase-DgNfE6Ya.js","assets/Depenses-KrciG87Z.js","assets/depenses-saisie-DKUbBduK.js","assets/devis-CdIRAvZk.css","assets/devis-D5x2La1C.js","assets/devis-remis-DfXD_MB3.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-DBS-SS0j.js","assets/diagnostics-au-trone-CB9AxBcH.js","assets/Dictee-C-pUYYFA.css","assets/Dictee-CBldZA8O.js","assets/dictee-pur-DfMiJrdw.js","assets/Discussions-Blw156bY.js","assets/dist-9vv0te18.js","assets/echappe-html-pur-gEhHOM07.js","assets/EditeurDesOffres-nAuIb7hp.js","assets/Encaissements-P1mH9dwg.js","assets/EnDirect-BY6brUZA.js","assets/enfants-CwJdaFdk.js","assets/Engagements-Cj5S9MhG.css","assets/engagements-coffre-vQmWNZJV.js","assets/Engagements-DqrvY6Ug.js","assets/EntreDeuxSeances-CSOoxwQp.js","assets/es-CNG1nGW5.js","assets/etoiles-pur-CgRPMSHm.js","assets/Evaluation-KJ8qOqz6.js","assets/facture-BdTlwerJ.js","assets/Factures-BqYwRJNF.js","assets/FenetreDeLAgent-CBQ1czHJ.js","assets/FenetreDesCivilites-qJbmcWPv.js","assets/FenetreDesCivilites-zfNk1aak.css","assets/FenetreDuPoint-HeZ6Nd-f.js","assets/Fil-C0Rqnbk_.js","assets/finances-C8x7Mn4-.css","assets/fon-x-JnZdCk.js","assets/Fournisseurs-C01xe7in.js","assets/fournisseurs-DE11Y9YQ.js","assets/foyer-Cs_bvtVz.js","assets/Gerard-BysI9nuS.js","assets/gerard-donnees-DWHwlCU7.js","assets/Gerard-lGKehvgG.css","assets/gestes-conversation-ogt93TxD.js","assets/heures-des-rappels-pur-BWJPB8OP.js","assets/HomeRituals-DBzjd1vU.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-CkYitQ96.js","assets/ia-centre-CkNto9Jf.js","assets/ia-diagnostic-pur-qGnFEvys.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-tableau-pur-p6UvREJe.js","assets/identite-QGhJVQBY.js","assets/index.es-BGQcaIne.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-eBPckeCl.js","assets/jspdf.es.min-BaeL9g10.js","assets/JustePrix-IgwJbrkk.js","assets/kkiapay-DwmGUTLd.js","assets/kkiapay-widget-CaHBoBVm.js","assets/Laboratoire-CTvfN5cF.js","assets/LaJournee-Bn_G0HCt.css","assets/LaJournee-CrIVNxeJ.js","assets/le-caissier-pur-CtSmNbQk.js","assets/le-sceau-pur-Dv-IZ_M2.js","assets/LePoint-B_HurXA0.css","assets/LePoint-Drx1mHWO.js","assets/LesPaiements-BPjqKPn5.js","assets/LesPaiements-C9cEZlne.css","assets/LettresAuDossier-BODwbXzS.js","assets/LienMndPay-BjiTLe6W.js","assets/Marketing-CeXGfNY7.js","assets/MarketingBranche-DGsQYW_Y.js","assets/Marque-Ktc7wNNG.js","assets/MesPourboires-CENjelyb.css","assets/MesPourboires-EJYFOg7B.js","assets/MesTaches-Cc4XUDf6.css","assets/MesTaches-DGrxvYHl.js","assets/mnd-pay-pur-CfS2mkAo.js","assets/momo-C2ZVfV9J.js","assets/MonMois-DgVe9hNM.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/MtnMoMo-DcihTeha.js","assets/objectifs-B5MU8xmj.js","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/opale-gK6yFpmR.js","assets/oreille-B1AMUmZh.js","assets/paie-du-5-CxhjXTbP.js","assets/paie-du-5-DeJq-K_U.css","assets/paie-du-5-pur-CPiCK8fv.js","assets/paie-par-mtn-BhkJe8S-.js","assets/PaieParMtn-DP-XAUYx.js","assets/paliers-DSyxLXzR.js","assets/Parametres-JVhPaCF3.js","assets/parcours-BW5JE8Dz.js","assets/Parrainages-CwP6PP8-.js","assets/Parrainages-gAHAPB_6.css","assets/PassageAvantLeFauteuil-nnjZpzvf.js","assets/pdf-BVJTArT_.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/periode-des-pourboires-pur-BUWqfwov.js","assets/Personas-Fa1Jvh3d.js","assets/Personnel-CIUgZohi.js","assets/photo-CqyOMZ7M.js","assets/pilotage-D8kf1Co8.css","assets/porte-de-l-equipe-CZlN-eck.js","assets/Pourboires-ucrdIOty.js","assets/Predictions-hAHSHJFi.js","assets/preload-helper-BRe_O-Rg.js","assets/Prestataires-BgzG-wIg.js","assets/Prets-DbI6ydGc.js","assets/PrevisionDuMois-DlFTw3OX.css","assets/PrevisionDuMois-DT8Ywj64.js","assets/Previsions-9BU2Vg1T.css","assets/Previsions-CCADuAZZ.js","assets/previsions-pur-CBti4W9L.js","assets/processus-pur-R6U5QcCi.js","assets/projets-2F3ZzZlR.js","assets/Projets-BT9-nSxz.js","assets/Projets-COO7WDEE.css","assets/projets-pur-2ZEMRNDU.js","assets/protocoles-C_okPP4F.js","assets/purify.es-BwoZCkIS.js","assets/qr-KNIP-V50.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-BBKvjo7e.js","assets/quiz-5qMPWZVi.js","assets/Rapport-Cgtj5s2M.js","assets/Recommandations-CW9_0jcC.js","assets/regler-7xRgS6EF.js","assets/regler-D1gFEaVz.css","assets/regler-par-fedapay-pur-DP7zXAs5.js","assets/relances-pur-C9iUwl2e.js","assets/releve-des-avis-Dy0hTsTN.js","assets/SalonFoyer-CB81aaeC.js","assets/sceau-D8DJfm7P.js","assets/secretariat-admin-C--MlFRB.js","assets/Secretariat-Bktz5KpV.js","assets/Secretariat-Cy79Zw30.css","assets/Signatures-D0QH9cm0.js","assets/SignerUnPdf-Ci4wrCl_.js","assets/Synthese-CSDfmAEV.js","assets/SyntheseGraphes-BKpJ4qb8.js","assets/systeme-TPy-pF7j.css","assets/Tableau-DJCgwbgS.js","assets/temps-uCs2ylZZ.js","assets/Textes-BisEMO2e.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-CkDzpGy0.css","assets/tiroirs-vguRvZNH.js","assets/tpe-de-poche-pur-D5fqUL0y.js","assets/tpe-DS4Srp3x.css","assets/tpe-hHZJKV2j.js","assets/TpeDePoche-Ch3scwNU.js","assets/trone-C3eufNNq.css","assets/trone-CWK_MSon.js","assets/useAudiences-DS6443Ui.js","assets/useClotureDuJour-DZSEVchL.js","assets/visios-HhwB-auS.js","assets/Vitrine-BWilTqQJ.css","assets/Vitrine-H159izIX.js","assets/_admin-k1QHQw4g.js","assets/_contrat-vyBifqFL.js","assets/_reuni-CZg6PEgp.js","assets/_shared-DcKMyYfA.js","assets/_signature-Dq34WV3u.js","assets/_ui-B6c-OTY3.js","assets/_ui-BrUDlmuM.css"];
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
