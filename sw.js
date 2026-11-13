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
const BUILD = "20261113073221";
const A_GARDER = ["./","assets/Abonnements-BRPqjbn6.js","assets/abonnements-DcAuHE0c.js","assets/Abonnements-DTY7p2DH.css","assets/Academie-c6UTtdXc.js","assets/Acces-DkRICixo.js","assets/afaire-B88TJZmX.js","assets/AFaire-DhJojl4a.js","assets/Agents-C2t3gBiZ.js","assets/agents-donnees-DJaZEzAt.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-DXNumb4F.js","assets/Appels-VJjk6hcK.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/Assistants-Cm-jybx1.js","assets/Assistants-D9i2Xwmg.css","assets/AtelierDesContenus-D-V4yEBP.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/Audience-8b8sC9ra.js","assets/Aujourdhui-CZ9suj0U.js","assets/avant-le-fauteuil-lecture-Bbgb7mvX.js","assets/AvantLeFauteuil-643DlkoI.js","assets/avis-fiches-DM3aDCf1.js","assets/AvisGoogle-D4Addyml.js","assets/AvisGoogle-DaPXfwX9.css","assets/BadgeEssai-CcMh-tCm.js","assets/bilan-B-bfPYR0.css","assets/bilan-CgVp4m5A.js","assets/BilanMensuel-DkVOuhKf.js","assets/Branches-BSf7juKv.js","assets/bridges-DB97PTfv.js","assets/caisse-du-soir-B8tsxZLz.js","assets/caisse-du-soir-C6vPx-E_.css","assets/Caisse-Yi3-XUOb.js","assets/Caisses-DHhP4dvF.js","assets/Calendrier-v4QDvV3X.js","assets/campagnes-pur-Ohh-F9ul.js","assets/Carnet-uA2Wk-oe.js","assets/carte-Cf8ZQKVI.js","assets/carte-_W_-xBPj.css","assets/CarteModal-BElkSNzn.js","assets/CartesCadeaux-FeMJP7eF.js","assets/Catalogue-DBgx0ZdA.js","assets/CentreDeCommande-Du8kyJhp.css","assets/CentreDeCommande-vOkpm7XS.js","assets/Cercle-DP7t9Yws.js","assets/certificat-D4gJLcEF.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-B1Dr0VWM.js","assets/chiffre-du-jour-pur-Cdw76yyT.js","assets/ChiffreDesPrestations-CWugrTg_.js","assets/client-C_zZAqls.js","assets/cloture-du-jour-DxqwmE7G.js","assets/ClotureDuTiroir-BquPHgfV.js","assets/Coffre-01dUJ0PN.js","assets/collecte-mtn-pur-Bq3uWgWT.js","assets/components-DvIfS_wy.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-BW06run8.js","assets/Comptes-DKnaJLnN.js","assets/consultation-CRW6QcWf.css","assets/consultation-ij-GBmsM.js","assets/Consultations-CKQRXwvU.js","assets/consultNotes-DdoHtHVO.js","assets/Conversations-CVxf5h24.js","assets/Conversations-D4WwB5Zo.css","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-B2_gzFSe.js","assets/currency-qfIhGmrs.js","assets/Customers-DVrkGhrn.js","assets/Dashboard-B2x7VsE_.css","assets/Dashboard-D1tKZbXM.js","assets/dates-BCxbRaOt.js","assets/Demandes-qc_1-uX-.js","assets/DepenseEnUnePhrase-BIGRlGqP.css","assets/DepenseEnUnePhrase-DjIXLELY.js","assets/Depenses-BaTQbDqC.js","assets/depenses-saisie-BnhBaahB.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-laZ7Q_sa.js","assets/diagnostics-au-trone-0Tb9HaLj.js","assets/Dictee-CncfwlEv.js","assets/Dictee-D2P9yM7v.css","assets/dictee-pur-CwDr3QLI.js","assets/Discussions-Bc-iq-9B.js","assets/EditeurDesOffres-BX9dTz5M.js","assets/Encaissements-CNNHFtwp.js","assets/enfants-b-NXHkTn.js","assets/Engagements-Cj5S9MhG.css","assets/engagements-coffre-CgDiJwhz.js","assets/Engagements-K0ih-eK2.js","assets/EntreDeuxSeances-0f8j6LMT.js","assets/Evaluation-OOTUljGf.js","assets/facture-FfKB-rq-.js","assets/Factures-C7bsz7q0.js","assets/FenetreDesCivilites-NwgalLkC.js","assets/FenetreDesCivilites-zfNk1aak.css","assets/FenetreDuPoint-CykG6gs5.js","assets/Fil-KGIZG41j.js","assets/finances-Ds4kOIUN.css","assets/fon-WYj2VeOu.js","assets/Fournisseurs-BMDYr9p9.js","assets/fournisseurs-BVeVP2iZ.js","assets/foyer-CgphXESt.js","assets/Gerard-Cgj-zsJh.css","assets/Gerard-DIBC7iy4.js","assets/gerard-donnees-YO_GZKlT.js","assets/gestes-conversation-CH2v9Xyg.js","assets/heures-des-rappels-pur-Dig9pZpo.js","assets/HomeRituals-CSBTZ3Ph.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-B9qsNl6V.js","assets/ia-centre-CE_BCJcF.js","assets/ia-diagnostic-pur-BBLrGY5l.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-tableau-pur-p6UvREJe.js","assets/identite-kt_Acz_w.js","assets/index-D8vpiB0-.js","assets/index.es-BfA9jfcR.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-CE9u-0G3.js","assets/jspdf.es.min-BbjURD-P.js","assets/JustePrix-BmPoDgW0.js","assets/kkiapay-B4dyOmuO.js","assets/kkiapay-widget-CVmsl9OE.js","assets/Laboratoire-drgcQh0x.js","assets/LaJournee-Bn_G0HCt.css","assets/LaJournee-DK9ujpUp.js","assets/LesPaiements-C9cEZlne.css","assets/LesPaiements-CHCIh0ZD.js","assets/LettresAuDossier-BP7FII9l.js","assets/LienMndPay-DBrlhrAi.js","assets/Marketing-BQH1hIod.js","assets/MarketingBranche-DyovFrf1.js","assets/Marque-O9ncnWq1.js","assets/MesPourboires-CENjelyb.css","assets/MesPourboires-CTWB5WrJ.js","assets/MesTaches-B2_pXpp8.js","assets/MesTaches-Cc4XUDf6.css","assets/momo-C2ZVfV9J.js","assets/MonMois-BvTCKqfg.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/MtnMoMo-ClmEvO_a.js","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/objectifs-zIOlxkbd.js","assets/opale-Cw89uWwI.js","assets/oreille-B1AMUmZh.js","assets/paie-du-5-DeJq-K_U.css","assets/paie-du-5-pur-CPiCK8fv.js","assets/paie-du-5-Y04qvj66.js","assets/paie-par-mtn-Cn7As5Mc.js","assets/PaieParMtn-DeA2I_-v.js","assets/paliers-DPBuiGuw.js","assets/Parametres-D25FiCbC.js","assets/parcours-3wBSO2BG.js","assets/Parrainages-DvfdME-G.js","assets/Parrainages-gAHAPB_6.css","assets/PassageAvantLeFauteuil-BB5TqVCW.js","assets/pdf-DV2F9HbK.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/periode-des-pourboires-pur-BUWqfwov.js","assets/Personas-Dxd0iUwZ.js","assets/Personnel-BHDH6E0f.js","assets/photo-CBJ5agnf.js","assets/pilotage-D8kf1Co8.css","assets/Pourboires-DNgWcJro.js","assets/Predictions-D1IIWvVU.js","assets/Prestataires-x-DAXJpP.js","assets/Prets-DGDJn_BY.js","assets/PrevisionDuMois-CrdgTbkN.js","assets/PrevisionDuMois-DlFTw3OX.css","assets/Previsions-9BU2Vg1T.css","assets/Previsions-B_DLieXu.js","assets/previsions-pur-DAeD-MBc.js","assets/processus-pur-R6U5QcCi.js","assets/Projets-CcqB6QoD.js","assets/Projets-COO7WDEE.css","assets/projets-CXQjw1I_.js","assets/projets-pur-2ZEMRNDU.js","assets/protocoles-EhF8K6uZ.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-BN84E61e.js","assets/qualification-bC0sKOnM.js","assets/quiz-5qMPWZVi.js","assets/Rapport-BF5HTjY1.js","assets/Recommandations-Y60v_8Gq.js","assets/regler-CGNI_EU_.js","assets/regler-DHR_B1Dm.css","assets/regler-par-fedapay-pur-G8CEJdGn.js","assets/relances-pur-BacTXlI2.js","assets/releve-des-avis-DFodkiNg.js","assets/SalonFoyer-DOAYL9Km.js","assets/secretariat-admin-DmLq6e_d.js","assets/Secretariat-Bx4DiQpw.js","assets/Secretariat-Cy79Zw30.css","assets/Signatures-BhdLIcaM.js","assets/SignerUnPdf-CAOFluZO.js","assets/Synthese-DBt5Kzas.js","assets/SyntheseGraphes-Bd6VRvnw.js","assets/systeme-TPy-pF7j.css","assets/Tableau-CJfmaKC9.js","assets/temps-BZmawxR0.js","assets/Textes-D6_g1ysB.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-CkDzpGy0.css","assets/tiroirs-DytBgExV.js","assets/trone-Bf9rNY9I.js","assets/trone-BSuNrBwU.css","assets/useAudiences-ChOvGJF2.js","assets/useClotureDuJour-De4z4vox.js","assets/Vitrine-BWilTqQJ.css","assets/Vitrine-CpBPVIrp.js","assets/_admin-C8kqAMOq.js","assets/_contrat-Dilps0Fo.js","assets/_reuni-D-KfBAEQ.js","assets/_shared-sI2F0NNn.js","assets/_signature-4M4TI9gW.js","assets/_ui-BrUDlmuM.css","assets/_ui-B_mwa4he.js"];
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
