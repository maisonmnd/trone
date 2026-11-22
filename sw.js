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
const BUILD = "20261122135822";
const A_GARDER = ["./","assets/Abonnements-B02sZhu_.js","assets/abonnements-C9TZAnu4.js","assets/Abonnements-DTY7p2DH.css","assets/Academie-Cfe7-o0N.js","assets/Acces-Cj6yDto5.js","assets/AFaire-D7wIqPnv.js","assets/afaire-Dy9oo5kU.js","assets/agents-donnees-CnR4sING.js","assets/Agents-GsbBCJEF.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-CE8JFdeY.js","assets/App-BfZJtmd8.js","assets/Appels-_FTBMu50.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/Assistants-BH-z-J23.js","assets/Assistants-D9i2Xwmg.css","assets/AtelierDesContenus-C9czIvmt.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/Audience-B6JX0IQA.js","assets/Aujourdhui-CoPazYdd.js","assets/auth-C1sjNWbh.js","assets/avant-le-fauteuil-lecture-BDLPgic5.js","assets/AvantLeFauteuil-2K8lFGAU.js","assets/avis-fiches-CgIUYIab.js","assets/avis-google-pont-7of4S_3_.js","assets/AvisGoogle-CYjmBJ0i.js","assets/AvisGoogle-DaPXfwX9.css","assets/BadgeEssai-Ct8A420Y.js","assets/BadgeSuggere-DDF8P1eK.js","assets/besoins-CV5MeYDM.js","assets/BesoinsEtRegles-BLwxGVV5.css","assets/BesoinsEtRegles-GutxAsrT.js","assets/bilan-B-bfPYR0.css","assets/bilan-DttrVJoc.js","assets/BilanMensuel-qTmo2Ov8.js","assets/Branches-BHUBOJKn.js","assets/bridges-D55hjGQH.js","assets/Caisse-B_MeIS-B.js","assets/caisse-du-soir-BMLBTtka.js","assets/caisse-du-soir-C6vPx-E_.css","assets/caisse-fluide-pur-BQGcR_sF.js","assets/Caisses-Dr1Jiqvm.js","assets/Calendrier-CYDahP8Y.js","assets/campagnes-pur-BQrh195S.js","assets/Carnet-kUJEBT4_.js","assets/carte-DHIZN3yU.js","assets/carte-_W_-xBPj.css","assets/CarteModal-CLiIxPaf.js","assets/CartesCadeaux-BhBfdKBm.js","assets/Catalogue-DBn3nVWb.js","assets/CentreDeCommande-CTZ_PfWI.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-CpwY_m9O.js","assets/certificat-q8W0AvRI.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-C6hZ_tL_.js","assets/chiffre-du-jour-pur-BQX_nihd.js","assets/ChiffreDesPrestations-nRIp9DbW.js","assets/classement-B4skrbHQ.js","assets/Classement-BnuXTBJO.js","assets/Classement-CmpbQZDu.css","assets/classement-pur-CQOYU06l.js","assets/client-BZWNjhLM.js","assets/cloture-du-jour-aWTIY6fj.js","assets/ClotureDuTiroir-Y4OPsEth.js","assets/Coffre-LlGx9kg0.js","assets/collecte-mtn-pur-Bdh7y-nL.js","assets/components-fY1meLSU.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-DT6on_BQ.js","assets/Comptes-DqBTgFSA.js","assets/consultation-CNKLac8W.js","assets/consultation-CRW6QcWf.css","assets/Consultations-C8rV86Sz.js","assets/Consultations-DiE-2_mG.css","assets/consultNotes-DBvRT8Iw.js","assets/contexte-de-la-reponse-C2GKJSRi.js","assets/Conversations-CqLOOOk9.js","assets/Conversations-D4WwB5Zo.css","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-BtYh6Q-y.js","assets/currency-Cd0clE4P.js","assets/Customers-C60Qg2kb.js","assets/Dashboard-B2x7VsE_.css","assets/Dashboard-CBZ5VDuI.js","assets/dates-Bm_bINZU.js","assets/DemanderAPerle-1_Hz5VGQ.js","assets/DemanderAPerle-BD5NgCRN.css","assets/Demandes-LiP2Oi8R.js","assets/DepenseEnUnePhrase-BIGRlGqP.css","assets/DepenseEnUnePhrase-CIqq7QPl.js","assets/Depenses-CBU_ICWq.js","assets/depenses-saisie-DsjI096l.js","assets/devis-remis-BCnv2Eeb.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-iAhq6udn.js","assets/diagnostics-au-trone-DZNPxC9E.js","assets/Dictee-C-pUYYFA.css","assets/dictee-pur-noa1Q2bS.js","assets/Dictee-zizHlcZ5.js","assets/Discussions-NnfHBpAw.js","assets/echappe-html-pur-gEhHOM07.js","assets/EditeurDesOffres-Cx6cifF5.js","assets/Encaissements-BY7ikVQx.js","assets/enfants-D_YLOxE0.js","assets/Engagements-Cj5S9MhG.css","assets/engagements-coffre-TuE0lQmx.js","assets/Engagements-D0ITUfTo.js","assets/EntreDeuxSeances-CDB_Ss5U.js","assets/es-DqkYJ0Lp.js","assets/etoiles-pur-CgRPMSHm.js","assets/Evaluation-D5WGL8yH.js","assets/facture-Chknpfs9.js","assets/Factures-CSPupspK.js","assets/FenetreDeLAgent-BncuMyTS.js","assets/FenetreDesCivilites-C6bLC9U7.js","assets/FenetreDesCivilites-zfNk1aak.css","assets/FenetreDuPoint-DBAc3Vje.js","assets/Fil-BdwVs3tK.js","assets/finances-C8x7Mn4-.css","assets/fon-BCeuATFS.js","assets/Fournisseurs-BTHcD0vu.js","assets/fournisseurs-DOmsZs-O.js","assets/foyer-DUBDaWgC.js","assets/Gerard-Cu1M-fjJ.js","assets/gerard-donnees-YCoNCBSR.js","assets/Gerard-lGKehvgG.css","assets/gestes-conversation-D3K_FiBF.js","assets/heures-des-rappels-pur-BWJPB8OP.js","assets/HomeRituals-CvSJuyZK.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-B43eBbUj.js","assets/ia-centre-y79kVsR6.js","assets/ia-diagnostic-pur-qGnFEvys.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-tableau-pur-p6UvREJe.js","assets/identite-Dw9Uecmw.js","assets/index.es-B70Z-Wq1.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-BWOXY1sz.js","assets/jspdf.es.min-DI01_Lz0.js","assets/JustePrix-DSK-oRze.js","assets/kkiapay-D5aYPRTS.js","assets/kkiapay-widget-CVmsl9OE.js","assets/Laboratoire-DRI8z22c.js","assets/LaJournee-Bn_G0HCt.css","assets/LaJournee-CgGiqkUn.js","assets/le-caissier-pur-D7g34AYX.js","assets/LePoint-CBjCCMQ5.css","assets/LePoint-DaIBHT6G.js","assets/LesPaiements-C9cEZlne.css","assets/LesPaiements-CNCfX5bn.js","assets/LettresAuDossier-Iac-uNyq.js","assets/LienMndPay-D2_jZK5V.js","assets/Marketing-pQs41xJI.js","assets/MarketingBranche-DqhrjR70.js","assets/Marque-CO68UIIt.js","assets/MesPourboires-CENjelyb.css","assets/MesPourboires-DAiDsU1O.js","assets/MesTaches-Cc4XUDf6.css","assets/MesTaches-DzlamnII.js","assets/momo-C2ZVfV9J.js","assets/MonMois-DCBB_u6O.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/MtnMoMo-CrjICzmZ.js","assets/objectifs-C1z0qHrz.js","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/opale-BgOnDh4u.js","assets/oreille-B1AMUmZh.js","assets/paie-du-5-DeJq-K_U.css","assets/paie-du-5-DKJXfRj6.js","assets/paie-du-5-pur-CPiCK8fv.js","assets/paie-par-mtn-B4qdBqRI.js","assets/PaieParMtn-C-m0dazT.js","assets/paliers-BVsAo0pb.js","assets/Parametres-BzxB-xx7.js","assets/parcours-Bdm0TD6C.js","assets/Parrainages-BZkS0lEw.js","assets/Parrainages-gAHAPB_6.css","assets/PassageAvantLeFauteuil-B2xcFEOS.js","assets/pdf-BxpoL_b2.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/periode-des-pourboires-pur-BUWqfwov.js","assets/Personas-CgmGOjXr.js","assets/Personnel-CxR8JPOm.js","assets/photo-D02o4u86.js","assets/pilotage-D8kf1Co8.css","assets/porte-de-l-equipe-Bq8pgr-I.js","assets/Pourboires-C7PEqsmK.js","assets/Predictions-D87B4ha_.js","assets/preload-helper-BRe_O-Rg.js","assets/Prestataires-BCTTbpQF.js","assets/Prets-CwS4j-Tq.js","assets/PrevisionDuMois-D8vx24aM.js","assets/PrevisionDuMois-DlFTw3OX.css","assets/Previsions-9BU2Vg1T.css","assets/Previsions-D9Ova03a.js","assets/previsions-pur-qzNIjSCZ.js","assets/processus-pur-R6U5QcCi.js","assets/Projets-BTMZbghf.js","assets/Projets-COO7WDEE.css","assets/projets-DKEiBv2s.js","assets/projets-pur-2ZEMRNDU.js","assets/protocoles-_RYGukaX.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-CDKt3YUv.js","assets/quiz-5qMPWZVi.js","assets/Rapport-BrVUaIlG.js","assets/Recommandations-DVKjrWID.js","assets/regler-DHR_B1Dm.css","assets/regler-par-fedapay-pur-Delg_AFn.js","assets/regler-ttTWs6ge.js","assets/relances-pur-C9iUwl2e.js","assets/releve-des-avis-DVDRHM51.js","assets/SalonFoyer-pzZ-7_Lm.js","assets/secretariat-admin-Bhb4n_Wv.js","assets/Secretariat-Cy79Zw30.css","assets/Secretariat-VClDrO66.js","assets/Signatures--2AFZSYj.js","assets/SignerUnPdf-B5-qlLX0.js","assets/Synthese-Bl6zuJPn.js","assets/SyntheseGraphes-CJUj5afh.js","assets/systeme-TPy-pF7j.css","assets/Tableau-CTCLhnzK.js","assets/temps-D3PjD9--.js","assets/Textes-DLpOzRbT.css","assets/Textes-sMRMmWsQ.js","assets/tiroirs-B5J13F-u.js","assets/tiroirs-CkDzpGy0.css","assets/trone-B-r6lpi2.css","assets/trone-CSMo572g.js","assets/useAudiences-D1egiXl_.js","assets/useClotureDuJour-xsRiqyXc.js","assets/visios-Bzy7HyZb.js","assets/Vitrine-BWilTqQJ.css","assets/Vitrine-C8CWOIr4.js","assets/_admin-GQqZc6Pp.js","assets/_contrat-C-CFf9kZ.js","assets/_reuni-BKNUgvaG.js","assets/_shared-DjW3JjzV.js","assets/_signature-B9w0Ke7H.js","assets/_ui-BrUDlmuM.css","assets/_ui-DN_xMyOA.js"];
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
