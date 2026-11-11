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
const BUILD = "20261111231151";
const A_GARDER = ["./","assets/abonnements-CXSjIw38.js","assets/Abonnements-D7o-unCS.js","assets/Abonnements-DTY7p2DH.css","assets/Academie-CsEezsUj.js","assets/Acces-D8KJWc2q.js","assets/afaire-BaGX6ipf.js","assets/AFaire-BySz6sW7.js","assets/Agents-CgFVZk7d.js","assets/agents-donnees-CZJ3fH7S.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-CVRVowhe.js","assets/Appels-BeN5A5Hu.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/Assistants-Bxo5EZaw.js","assets/Assistants-D9i2Xwmg.css","assets/AtelierDesContenus-CS-rjN7c.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/Audience-C4GMvfjA.js","assets/Aujourdhui-CSAamdyZ.js","assets/avant-le-fauteuil-lecture-BLjM_Kf1.js","assets/AvantLeFauteuil-8v30TCrJ.js","assets/avis-fiches-Bjx7xbKR.js","assets/AvisGoogle-BEki65gp.js","assets/AvisGoogle-DaPXfwX9.css","assets/BadgeEssai-tKBOMye2.js","assets/bilan-B-bfPYR0.css","assets/bilan-DvWIx5UC.js","assets/BilanMensuel-CSvDb4Po.js","assets/Branches-BI3K8TvO.js","assets/bridges-dxDgNpkY.js","assets/Caisse-Cr9H7Mbr.js","assets/caisse-du-soir-C6vPx-E_.css","assets/caisse-du-soir-D0k-6lwd.js","assets/Caisses-CxaG2_Tb.js","assets/Calendrier-BrRxn046.js","assets/campagnes-pur-C59LGXxI.js","assets/Carnet-62D8j1GY.js","assets/carte-GCe1CVAR.js","assets/carte-_W_-xBPj.css","assets/CarteModal-Bce997-0.js","assets/CartesCadeaux-BAkHj6as.js","assets/Catalogue-glXTk841.js","assets/CentreDeCommande-BA5Izdb4.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-UqolBBfj.js","assets/certificat-B-82bHdE.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-DFR_9Pxq.js","assets/chiffre-du-jour-pur-JC9u64g-.js","assets/ChiffreDesPrestations-dlDxUTiv.js","assets/client-ByfHdVLO.js","assets/cloture-du-jour-Hl1XQ_DH.js","assets/ClotureDuTiroir-B6Hd8Tfj.js","assets/Coffre-CcZFz09b.js","assets/collecte-mtn-pur-DW4nw7-V.js","assets/components-CyGJ3w9V.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-CrIvLQkJ.js","assets/Comptes-Bfd3d_h-.js","assets/consultation-CRW6QcWf.css","assets/consultation-iuOm0M6I.js","assets/Consultations-0l6B3lwp.js","assets/consultNotes-DGrMu72L.js","assets/Conversations-D4WwB5Zo.css","assets/Conversations-DEQOk1Db.js","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-DLpexozQ.js","assets/currency-qfIhGmrs.js","assets/Customers-BoXqxu51.js","assets/Dashboard-B2x7VsE_.css","assets/Dashboard-C-I7x2RU.js","assets/dates-s7pIdMxp.js","assets/Demandes-nqipxEoD.js","assets/DepenseEnUnePhrase-BIGRlGqP.css","assets/DepenseEnUnePhrase-COxuNowL.js","assets/Depenses-6Y0Oh4YG.js","assets/depenses-saisie-BeVE0q45.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-Bbz5qfud.js","assets/diagnostics-au-trone-D3uWn5DX.js","assets/Dictee-BLVOQ5gY.js","assets/Dictee-D2P9yM7v.css","assets/dictee-pur-Cv0eb-fJ.js","assets/Discussions-EdPmrnX6.js","assets/EditeurDesOffres-Dk0O_ewZ.js","assets/Encaissements-DxMkBws2.js","assets/enfants-Xbj2Yo1W.js","assets/Engagements-Bwdt9C0O.js","assets/Engagements-Cj5S9MhG.css","assets/engagements-coffre-1DmeG5Eh.js","assets/EntreDeuxSeances-C_ZOHc9v.js","assets/Evaluation-behQfOav.js","assets/facture-DySQM_l9.js","assets/Factures-Dd21eTyY.js","assets/FenetreDesCivilites-Dn4rB_2B.js","assets/FenetreDesCivilites-zfNk1aak.css","assets/FenetreDuPoint-ypJ04xYB.js","assets/Fil-Blc9LzlU.js","assets/finances-BMFnlkRx.css","assets/fon-B5sKUvOh.js","assets/Fournisseurs-BMw0FFUH.js","assets/fournisseurs-DK_n-wMj.js","assets/foyer-C89In9CH.js","assets/Gerard-2y7_Ndww.js","assets/Gerard-Cgj-zsJh.css","assets/gerard-donnees-0lIhUNn0.js","assets/gestes-conversation-B1oddT7G.js","assets/heures-des-rappels-pur-Dig9pZpo.js","assets/HomeRituals-BsMx2H10.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-CNICDlNZ.js","assets/ia-centre-DCSJl-4I.js","assets/ia-diagnostic-pur-BBLrGY5l.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-tableau-pur-p6UvREJe.js","assets/identite-DFObp9OT.js","assets/index-DLpDSuNa.js","assets/index.es-YHVGmSIE.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-DJbxmCpQ.js","assets/jspdf.es.min-bNEuxHCJ.js","assets/JustePrix-Bjx1Aswy.js","assets/kkiapay-CaM02hsf.js","assets/kkiapay-widget-DnUhUNd4.js","assets/Laboratoire-CAuQ7mvP.js","assets/LaJournee-Bn_G0HCt.css","assets/LaJournee-Dz3i5r8U.js","assets/LesPaiements-C9cEZlne.css","assets/LesPaiements-VNfqD66y.js","assets/LettresAuDossier-BuEEcDLR.js","assets/LienMndPay-PkIW7kFw.js","assets/Marketing-BjHp4_eu.js","assets/MarketingBranche-u7fAOwwT.js","assets/Marque-Dn8WrsZl.js","assets/MesPourboires-BeLn16OH.js","assets/MesPourboires-CENjelyb.css","assets/MesTaches-Cc4XUDf6.css","assets/MesTaches-DSN2nJSC.js","assets/momo-C2ZVfV9J.js","assets/MonMois-CQTIaAze.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/MtnMoMo-CyFnU3V9.js","assets/objectifs--V2zKnmi.js","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/opale-Djx55Zux.js","assets/oreille-B1AMUmZh.js","assets/paie-du-5-1fyMVGHz.js","assets/paie-du-5-DeJq-K_U.css","assets/paie-du-5-pur-CPiCK8fv.js","assets/paie-par-mtn-CUbcyZlj.js","assets/PaieParMtn-BM0O7pnW.js","assets/paliers-tklvmIRM.js","assets/Parametres-BYt1jymP.js","assets/parcours-C6a5Z_qR.js","assets/Parrainages-gAHAPB_6.css","assets/Parrainages-rZUzKz_Z.js","assets/PassageAvantLeFauteuil-pLtWayCl.js","assets/pdf-BckGQ6Dv.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/periode-des-pourboires-pur-BUWqfwov.js","assets/Personas-CShUuALg.js","assets/Personnel-C6CvQ7kQ.js","assets/photo-BUC-2vPR.js","assets/pilotage-D8kf1Co8.css","assets/Pourboires-DnR3y3eG.js","assets/Predictions-BOnhmvJ1.js","assets/Prestataires-CTZDNkXu.js","assets/Prets-C09os-JY.js","assets/PrevisionDuMois-Bx_eBjSS.js","assets/PrevisionDuMois-DlFTw3OX.css","assets/Previsions-9BU2Vg1T.css","assets/Previsions-B7WUIKV7.js","assets/previsions-pur-DV_iSG_o.js","assets/processus-pur-R6U5QcCi.js","assets/projets-CBTcvbb3.js","assets/Projets-COO7WDEE.css","assets/projets-pur-2ZEMRNDU.js","assets/Projets-QDGS_XvH.js","assets/protocoles-CDPn0aTG.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-dLn6VUfz.js","assets/qualification-DiUQKfmK.js","assets/quiz-5qMPWZVi.js","assets/Rapport-BIdulDIK.js","assets/Recommandations-DlnUVq2i.js","assets/regler-DHR_B1Dm.css","assets/regler-DL0XI_wO.js","assets/relances-pur-BacTXlI2.js","assets/releve-des-avis-C-UVmlkq.js","assets/SalonFoyer-BoOitkWX.js","assets/secretariat-admin-kWFTCCdw.js","assets/Secretariat-CUqb8JZr.js","assets/Secretariat-Cy79Zw30.css","assets/Signatures-C-Uhcm9C.js","assets/SignerUnPdf-C8RXwMur.js","assets/Synthese-DCazDr5p.js","assets/SyntheseGraphes-BIxWo9Xw.js","assets/systeme-TPy-pF7j.css","assets/Tableau-FJtGFWxa.js","assets/temps-QEhMpRIK.js","assets/Textes-DLpOzRbT.css","assets/Textes-_YgtMXLM.js","assets/tiroirs-B-PRRrwN.js","assets/tiroirs-CkDzpGy0.css","assets/trone-CKg79qbi.css","assets/trone-r_otbvqn.js","assets/useAudiences-BHc7Ypoe.js","assets/useClotureDuJour-C-rbGTJL.js","assets/Vitrine-BWilTqQJ.css","assets/Vitrine-DLhzrzaa.js","assets/_admin-CyuWxlBq.js","assets/_contrat-BVZmC9UM.js","assets/_reuni-DgjDjMZ_.js","assets/_shared-v-FIm1UF.js","assets/_signature-C67A1kpc.js","assets/_ui-BGJbiAVk.js","assets/_ui-BrUDlmuM.css"];
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
