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
const BUILD = "20261125082316";
const A_GARDER = ["./","assets/Abonnements-DTY7p2DH.css","assets/Abonnements-K3lpvKDl.js","assets/abonnements-X2rrYHmc.js","assets/Academie-5_W4H86d.js","assets/Acces-BonmqU51.js","assets/AFaire-BXPQAbIw.js","assets/afaire-DO2HOwos.js","assets/Agents-BjsQ-0-P.js","assets/agents-donnees-DHxH190P.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-CbfWW9KA.js","assets/App-B0i1fCLh.js","assets/Appels-C11ao75K.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/Assistants-D9i2Xwmg.css","assets/Assistants-DUO8J4Jf.js","assets/AtelierDesContenus-C8VCBq1r.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/Audience-8pYkDFN8.js","assets/Aujourdhui-BS3BoEdo.js","assets/auth-Wln81XTr.js","assets/avant-le-fauteuil-lecture-Y2dmPJIC.js","assets/AvantLeFauteuil-Cj8v3krQ.js","assets/avis-fiches-X5tmbH_R.js","assets/avis-google-pont-C0yBEdQ1.js","assets/AvisGoogle-CUB_iR9D.js","assets/AvisGoogle-DaPXfwX9.css","assets/BadgeEssai-CnzHonnS.js","assets/BadgeSuggere-DGARcjWt.js","assets/besoins-CijHqt-4.js","assets/BesoinsEtRegles-BLwxGVV5.css","assets/BesoinsEtRegles-DOK_DLEX.js","assets/bilan-B-bfPYR0.css","assets/bilan-CfZ9hbc0.js","assets/BilanMensuel-Y9VTPIUO.js","assets/Branches-D11yJm67.js","assets/bridges-BlvyIS_9.js","assets/caisse-du-soir--eBFCsU8.js","assets/caisse-du-soir-C6vPx-E_.css","assets/caisse-fluide-pur-CLUvu-Vi.js","assets/Caisse-SDnxS--m.js","assets/Caisses-D3ZcYWSN.js","assets/Calendrier-CIchv-hz.js","assets/campagnes-pur-DFPoHOcJ.js","assets/Carnet-Bt_WK_CI.js","assets/carte-U6RE6_bn.js","assets/carte-_W_-xBPj.css","assets/CarteModal-CC-TbRhv.js","assets/CartesCadeaux-__-1Bpdf.js","assets/Catalogue-Bh5T-1nu.js","assets/CentreDeCommande-Du8kyJhp.css","assets/CentreDeCommande-nztFwzBu.js","assets/Cercle-CS0Ua_k0.js","assets/certificat-3Rnd2naS.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-aSTH4vBQ.js","assets/chiffre-du-jour-pur-xt38pQiR.js","assets/ChiffreDesPrestations-wpV63f8m.js","assets/classement-CeKfz9OP.js","assets/Classement-CmpbQZDu.css","assets/Classement-DG_nN2wS.js","assets/classement-pur-CQOYU06l.js","assets/client-D47_Gwav.js","assets/cloture-du-jour-7pqjcQLG.js","assets/ClotureDuTiroir-D8dTka9k.js","assets/Coffre-Z98HVU2P.js","assets/components-Ci7QgKAE.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-DiHJLgXv.js","assets/Comptes-Zc6avPmT.js","assets/consultation-CRW6QcWf.css","assets/consultation-xuCxmzrs.js","assets/Consultations-BlQj9Fuk.js","assets/Consultations-DiE-2_mG.css","assets/consultNotes-dskAQ0ir.js","assets/contexte-de-la-reponse-DRJPB8Hm.js","assets/Conversations-D4WwB5Zo.css","assets/Conversations-SmP54heS.js","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-BjkU4gxl.js","assets/currency-Cd0clE4P.js","assets/Customers-DfQ1kKfp.js","assets/Dashboard-Cw5zWmQu.css","assets/Dashboard-DXtRfP5a.js","assets/dates-CFZ6zj6t.js","assets/DemanderAPerle-BD5NgCRN.css","assets/DemanderAPerle-BmDkw9P1.js","assets/Demandes-BhqDwgY2.js","assets/DepenseEnUnePhrase-B7HN10fq.js","assets/DepenseEnUnePhrase-BIGRlGqP.css","assets/Depenses-6uk9PrWD.js","assets/depenses-saisie-DljZUFKg.js","assets/devis-B0kY9xGx.js","assets/devis-CdIRAvZk.css","assets/devis-remis-BVpo88Hz.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-D_khWxDQ.js","assets/diagnostics-au-trone-B-W9-V8a.js","assets/Dictee-C-pUYYFA.css","assets/Dictee-CI7iriuo.js","assets/dictee-pur-DM5Fy7IN.js","assets/Discussions-BrDL0V_x.js","assets/dist-9vv0te18.js","assets/echappe-html-pur-gEhHOM07.js","assets/EditeurDesOffres-DlILDRhG.js","assets/Encaissements-CV7YFob6.js","assets/EnDirect-ByzoZ2eZ.js","assets/enfants-BSzCh4-D.js","assets/Engagements-Cj5S9MhG.css","assets/engagements-coffre-CpVNwt33.js","assets/Engagements-jdvGVA_S.js","assets/EntreDeuxSeances-CSLqNTXz.js","assets/es-CN0_d07y.js","assets/etoiles-pur-CgRPMSHm.js","assets/Evaluation-Bf-dXTpS.js","assets/facture-BB96WcDQ.js","assets/Factures-j9F3DTm6.js","assets/FenetreDeLAgent-Bl5-2bOZ.js","assets/FenetreDesCivilites-kvbrwEbf.js","assets/FenetreDesCivilites-zfNk1aak.css","assets/FenetreDuPoint-D7Eewcjq.js","assets/Fil-lGPFgbOf.js","assets/finances-C8x7Mn4-.css","assets/fon-Bu-6Odjo.js","assets/Fournisseurs-BwtskuQJ.js","assets/fournisseurs-C5M6SD8F.js","assets/foyer-uGLro6g0.js","assets/Gerard-BKQvyyEM.js","assets/gerard-donnees-ChpJlqZ8.js","assets/Gerard-lGKehvgG.css","assets/gestes-conversation-C6XcHUBv.js","assets/heures-des-rappels-pur-BWJPB8OP.js","assets/HomeRituals-BZtPhWHs.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-DWqSEt0m.js","assets/ia-centre-BTIaAFsY.js","assets/ia-diagnostic-pur-qGnFEvys.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-tableau-pur-p6UvREJe.js","assets/identite-BXycLFSb.js","assets/index.es-By1u3XD0.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-BU_cjM-m.js","assets/jspdf.es.min-DpDWcrY1.js","assets/JustePrix-DRbzQb9N.js","assets/kkiapay-BBQdFNx_.js","assets/kkiapay-widget-CaHBoBVm.js","assets/Laboratoire-BiE4C39P.js","assets/LaJournee-5olYBwZf.js","assets/LaJournee-Bn_G0HCt.css","assets/le-caissier-pur-ueQtK3o4.js","assets/le-sceau-pur-Dv-IZ_M2.js","assets/LePoint-CBjCCMQ5.css","assets/LePoint-XhzNPPzx.js","assets/LesPaiements-C9cEZlne.css","assets/LesPaiements-DtgG_u_K.js","assets/LettresAuDossier-RcADyCDg.js","assets/LienMndPay-zHu79GGX.js","assets/Marketing-D5kuG6Dn.js","assets/MarketingBranche-WQNvBvPa.js","assets/Marque-COpnb7F9.js","assets/MesPourboires-Btjd7X87.js","assets/MesPourboires-CENjelyb.css","assets/MesTaches-Cc4XUDf6.css","assets/MesTaches-CZL1ZLcM.js","assets/mnd-pay-pur-CfS2mkAo.js","assets/momo-C2ZVfV9J.js","assets/MonMois-NUZh0xmO.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/MtnMoMo-DX5Te_nY.js","assets/objectifs-BvDEZWEp.js","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/opale-B1y7TmTp.js","assets/oreille-B1AMUmZh.js","assets/paie-du-5-DeJq-K_U.css","assets/paie-du-5-DPONZVGW.js","assets/paie-du-5-pur-CPiCK8fv.js","assets/paie-par-mtn-BuxsWD0l.js","assets/PaieParMtn-CrDtbHGh.js","assets/paliers-D2v7qksC.js","assets/Parametres-CgGxHOf1.js","assets/parcours-BgKbkcKJ.js","assets/Parrainages-gAHAPB_6.css","assets/Parrainages-JCH2e1Lz.js","assets/PassageAvantLeFauteuil-9TYmj5wQ.js","assets/pdf-BwvE55A3.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/periode-des-pourboires-pur-BUWqfwov.js","assets/Personas---3o8WuC.js","assets/Personnel-Ackvv7yQ.js","assets/photo-BDtzkAH8.js","assets/pilotage-D8kf1Co8.css","assets/porte-de-l-equipe-OqfnWXLu.js","assets/Pourboires-Dk7slxBv.js","assets/Predictions-DCrSjxk4.js","assets/preload-helper-BRe_O-Rg.js","assets/Prestataires-Dw45kq3k.js","assets/Prets-Dajxprvs.js","assets/PrevisionDuMois-DlFTw3OX.css","assets/PrevisionDuMois-vMd0ouxy.js","assets/Previsions-9BU2Vg1T.css","assets/Previsions-CYX4Foi7.js","assets/previsions-pur-Bshp3wm9.js","assets/processus-pur-R6U5QcCi.js","assets/Projets-BcRfmBQo.js","assets/Projets-COO7WDEE.css","assets/projets-Cp1HCDVX.js","assets/projets-pur-2ZEMRNDU.js","assets/protocoles-QEaA9n7_.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-BRbgR1rg.js","assets/quiz-5qMPWZVi.js","assets/Rapport-DSCfm650.js","assets/Recommandations-Cxa-E7fM.js","assets/regler-B5_G0pWh.js","assets/regler-D1gFEaVz.css","assets/regler-par-fedapay-pur-DP7zXAs5.js","assets/relances-pur-C9iUwl2e.js","assets/releve-des-avis-6ocqtK-S.js","assets/SalonFoyer-zGwRkayi.js","assets/sceau-CjHYLqrc.js","assets/secretariat-admin-CZ8pInCs.js","assets/Secretariat-BGiby9cd.js","assets/Secretariat-Cy79Zw30.css","assets/Signatures-BhkYGVa0.js","assets/SignerUnPdf-CwbquCtK.js","assets/Synthese-FHvrETFs.js","assets/SyntheseGraphes-eJ1NGPr_.js","assets/systeme-TPy-pF7j.css","assets/Tableau-CMBwL4OO.js","assets/temps-Bo2jXEqh.js","assets/Textes--cNhjLFa.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-CkDzpGy0.css","assets/tiroirs-RTxA_Yz4.js","assets/trone-B-r6lpi2.css","assets/trone-BDpg4zwC.js","assets/useAudiences-UYTEM39r.js","assets/useClotureDuJour-Dg5sYYOC.js","assets/visios-D3hs8wVE.js","assets/Vitrine--Ebaz28p.js","assets/Vitrine-BWilTqQJ.css","assets/_admin-_unwlKwN.js","assets/_contrat-B3jXY-Qc.js","assets/_reuni-CFHnixa-.js","assets/_shared-vpGbQqHB.js","assets/_signature-BY4EaAjK.js","assets/_ui-BrUDlmuM.css","assets/_ui-DCCTBLYX.js"];
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
