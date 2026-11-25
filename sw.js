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
const BUILD = "20261125112818";
const A_GARDER = ["./","assets/abonnements-DknjWmvr.js","assets/Abonnements-DTY7p2DH.css","assets/Abonnements-T_dZr9CT.js","assets/Academie-B9_-SIR3.js","assets/Acces-_whs5x9E.js","assets/afaire-DCzxcJrj.js","assets/AFaire-TuwpUSSO.js","assets/agents-donnees-BnKmKOLp.js","assets/Agents-JrSG5yA-.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-DytYlMCc.js","assets/App-AhP-CWIx.js","assets/Appels-sLj4rAP-.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/Assistants-ChFNVQFO.js","assets/Assistants-D9i2Xwmg.css","assets/AtelierDesContenus-D3-p6F2A.css","assets/AtelierDesContenus-J1iz_MCJ.js","assets/Audience-CrpAy8_b.js","assets/Aujourdhui-Dhqk1M3f.js","assets/auth-BTroHBIb.js","assets/avant-le-fauteuil-lecture-yv_G-ko8.js","assets/AvantLeFauteuil-DztQKFOg.js","assets/avis-fiches-C7Na4tLf.js","assets/avis-google-pont-FT2QtRam.js","assets/AvisGoogle-CnWuy0De.js","assets/AvisGoogle-DaPXfwX9.css","assets/BadgeEssai-BFgmy1vX.js","assets/BadgeSuggere-zDm0c3B-.js","assets/besoins-Ce2UF5bZ.js","assets/BesoinsEtRegles-BjFiEqUM.js","assets/BesoinsEtRegles-BLwxGVV5.css","assets/bilan-B-bfPYR0.css","assets/bilan-PqQwI3cL.js","assets/BilanMensuel-C8LJg54Q.js","assets/Branches-DS7Soc74.js","assets/bridges-D0wNIyTh.js","assets/caisse-du-soir-C6vPx-E_.css","assets/caisse-du-soir-CNKxlbrY.js","assets/caisse-fluide-pur-LYiWD973.js","assets/Caisse-G7t3UWSK.js","assets/Caisses-CxitEZ2r.js","assets/Calendrier-C6D0wD3I.js","assets/campagnes-pur-B8Mr_9QF.js","assets/Carnet-IQMa1Ce7.js","assets/carte-C1RqDMkx.js","assets/carte-_W_-xBPj.css","assets/CarteModal-jVWQ7wIP.js","assets/CartesCadeaux-DBMWwTUh.js","assets/Catalogue-C521tddE.js","assets/CentreDeCommande-Du8kyJhp.css","assets/CentreDeCommande-fldhcg2i.js","assets/Cercle-BMlSULk1.js","assets/certificat-BoyCV3Ch.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-7ruJAl5g.js","assets/chiffre-du-jour-pur-BNq07p7X.js","assets/ChiffreDesPrestations-BEDpb-uC.js","assets/Classement-C-68UUlP.js","assets/classement-DcwUDq0z.js","assets/classement-pur-BaVQKAXl.js","assets/Classement-T9x-HPwd.css","assets/client-BLPwtTN8.js","assets/cloture-du-jour-BbMmzByn.js","assets/ClotureDuTiroir-BW28hotF.js","assets/Coffre-DCJ8XVqt.js","assets/components-BzPxKDmW.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-c-U3E_mO.js","assets/Comptes-D7Cm7kHP.js","assets/consultation-BKgb9gni.js","assets/consultation-CRW6QcWf.css","assets/Consultations-DiE-2_mG.css","assets/Consultations-DrM4it0G.js","assets/consultNotes-CgGYv-qP.js","assets/contexte-de-la-reponse-DiZnkQOH.js","assets/Conversations-D4WwB5Zo.css","assets/Conversations-pgKcbPcY.js","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-Dvk_0xDa.js","assets/currency-Cd0clE4P.js","assets/Customers-D6rj-4Ol.js","assets/Dashboard-BkOjyjaf.js","assets/Dashboard-D9jnTaFp.css","assets/dates-BfV-i3Ep.js","assets/DemanderAPerle-BD5NgCRN.css","assets/DemanderAPerle-BZO0sJKf.js","assets/Demandes-DB8MfgoS.js","assets/DepenseEnUnePhrase-BIGRlGqP.css","assets/DepenseEnUnePhrase-CChlvYnB.js","assets/Depenses-odMaO9F3.js","assets/depenses-saisie-B9O0YAyH.js","assets/devis-AnDeB7Sq.js","assets/devis-CdIRAvZk.css","assets/devis-remis-25belxBj.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-DmxN60Sh.js","assets/diagnostics-au-trone-Bzh2DSpx.js","assets/Dictee-C-pUYYFA.css","assets/Dictee-D0YI-JpC.js","assets/dictee-pur-Cu8WrhnK.js","assets/Discussions-C5FMiEbG.js","assets/dist-9vv0te18.js","assets/echappe-html-pur-gEhHOM07.js","assets/EditeurDesOffres-CtiL2Pjl.js","assets/Encaissements-DZoIC_Fs.js","assets/EnDirect-BuN0RkZv.js","assets/enfants-D2dhZYri.js","assets/Engagements-Cj5S9MhG.css","assets/engagements-coffre-BLodyR5O.js","assets/Engagements-DB_1SaKT.js","assets/EntreDeuxSeances-DPvLyWgg.js","assets/es-DCvkPG3R.js","assets/etoiles-pur-CgRPMSHm.js","assets/Evaluation-CDfbKFCs.js","assets/facture-DCGxzhtf.js","assets/Factures-De-LqQa_.js","assets/FenetreDeLAgent-D7s18wrY.js","assets/FenetreDesCivilites-C-yLgzXm.js","assets/FenetreDesCivilites-zfNk1aak.css","assets/FenetreDuPoint-BEVqG2K2.js","assets/Fil-BuyiZK-f.js","assets/finances-C8x7Mn4-.css","assets/fon-CfbMCiWj.js","assets/Fournisseurs-BAuM5FUl.js","assets/fournisseurs-BJcSVarb.js","assets/foyer-DTfkUsty.js","assets/Gerard-C3-BBsQl.js","assets/gerard-donnees-BVsTjF2t.js","assets/Gerard-lGKehvgG.css","assets/gestes-conversation-DlTchGzm.js","assets/heures-des-rappels-pur-BWJPB8OP.js","assets/HomeRituals-CH1cHFon.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-Beslm0AW.js","assets/ia-centre-DGp7HeGS.js","assets/ia-diagnostic-pur-qGnFEvys.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-tableau-pur-p6UvREJe.js","assets/identite-gunvo6Vs.js","assets/index.es-CkTbnDUZ.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-Bx8r4TP4.js","assets/jspdf.es.min-BXdD0qQN.js","assets/JustePrix-Dnhi7Hrt.js","assets/kkiapay-aYQlYzT_.js","assets/kkiapay-widget-CaHBoBVm.js","assets/Laboratoire-BgLY5hPy.js","assets/LaJournee-Bd4MonUL.js","assets/LaJournee-Bn_G0HCt.css","assets/le-caissier-pur-DCJ60AXS.js","assets/le-sceau-pur-Dv-IZ_M2.js","assets/LePoint-B_HurXA0.css","assets/LePoint-tbnvTS9c.js","assets/LesPaiements-C5alvC-5.js","assets/LesPaiements-C9cEZlne.css","assets/LettresAuDossier-A4VOkmB_.js","assets/LienMndPay-zecCGE-V.js","assets/Marketing-4nkh3XUk.js","assets/MarketingBranche-Dx6PUFi7.js","assets/Marque-DHxQr8-7.js","assets/MesPourboires-CENjelyb.css","assets/MesPourboires-CoawmrFE.js","assets/MesTaches-Cc4XUDf6.css","assets/MesTaches-DUesP3TN.js","assets/mnd-pay-pur-CfS2mkAo.js","assets/momo-C2ZVfV9J.js","assets/MonMois-CidEbvie.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/MtnMoMo-DUwiKpkH.js","assets/objectifs-CTkieVAB.js","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/opale-DUd3jwaj.js","assets/oreille-B1AMUmZh.js","assets/paie-du-5-DcE5rYai.js","assets/paie-du-5-DeJq-K_U.css","assets/paie-du-5-pur-CPiCK8fv.js","assets/paie-par-mtn-CQBILAJf.js","assets/PaieParMtn-CjGuWtxt.js","assets/paliers-BkhniyeL.js","assets/Parametres-D6CLyJpE.js","assets/parcours-BgAANL7t.js","assets/Parrainages-Dpv_w_kt.js","assets/Parrainages-gAHAPB_6.css","assets/PassageAvantLeFauteuil-V7FdwTvZ.js","assets/pdf-B_ZceG7g.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/periode-des-pourboires-pur-BUWqfwov.js","assets/Personas-BspgHCP_.js","assets/Personnel-CtsjXw3a.js","assets/photo-Cf-Kl_1Q.js","assets/pilotage-D8kf1Co8.css","assets/porte-de-l-equipe-CVdS5oyg.js","assets/Pourboires-BEs4ed8W.js","assets/Predictions-DqR4TQPx.js","assets/preload-helper-BRe_O-Rg.js","assets/Prestataires-DmPxRgF4.js","assets/Prets-BKmDSldj.js","assets/PrevisionDuMois-DlFTw3OX.css","assets/PrevisionDuMois-D_fAp-2U.js","assets/Previsions-9BU2Vg1T.css","assets/Previsions-CbsSgBHy.js","assets/previsions-pur-DkCdwbCk.js","assets/processus-pur-R6U5QcCi.js","assets/projets-6A-vkKco.js","assets/Projets-Bc7jXInC.js","assets/Projets-COO7WDEE.css","assets/projets-pur-2ZEMRNDU.js","assets/protocoles-BgXwPL5k.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-BgVgn1GV.js","assets/quiz-5qMPWZVi.js","assets/Rapport-CWr3nhXs.js","assets/Recommandations-Ra5Zn4Pa.js","assets/regler-CSHtDA-f.js","assets/regler-D1gFEaVz.css","assets/regler-par-fedapay-pur-DP7zXAs5.js","assets/relances-pur-C9iUwl2e.js","assets/releve-des-avis-DS4S8cKm.js","assets/SalonFoyer-D3tlIoiC.js","assets/sceau-Crp-WlgI.js","assets/secretariat-admin-DjuM57NB.js","assets/Secretariat-BR2JaYiN.js","assets/Secretariat-Cy79Zw30.css","assets/Signatures-D67cZw-l.js","assets/SignerUnPdf-sR44K7xN.js","assets/Synthese-CuOLkdeA.js","assets/SyntheseGraphes-CuYf7l9Y.js","assets/systeme-TPy-pF7j.css","assets/Tableau-BYmPOoKA.js","assets/temps-UUPk1r_c.js","assets/Textes-D99H4HOF.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-7At5QYp1.js","assets/tiroirs-CkDzpGy0.css","assets/trone-C3eufNNq.css","assets/trone-DPGoQWbD.js","assets/useAudiences-DQU-DLAG.js","assets/useClotureDuJour-BQRUb6uu.js","assets/visios-DxB2gWYc.js","assets/Vitrine-BWilTqQJ.css","assets/Vitrine-cdmx-QWQ.js","assets/_admin-CVH0xAJp.js","assets/_contrat-BKASuySm.js","assets/_reuni-IuYDpLWb.js","assets/_shared-BZigC7Zg.js","assets/_signature-CN1DRUML.js","assets/_ui-BrUDlmuM.css","assets/_ui-C2BoeGkB.js"];
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
