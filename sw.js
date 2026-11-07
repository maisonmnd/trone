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
const BUILD = "20261107112847";
const A_GARDER = ["./","assets/Abonnements-DTY7p2DH.css","assets/abonnements-DZrO5zR2.js","assets/Abonnements-iuTRcJNo.js","assets/Academie-CtKLAMap.js","assets/Acces-HbGDsRVr.js","assets/afaire-CSP5_cNw.js","assets/AFaire-yO59ODM_.js","assets/Agents-DcyXT0OW.js","assets/agents-donnees-kfoJH_iJ.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-sRsauW89.js","assets/Appels-BhYWiZZd.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/Assistants-D9i2Xwmg.css","assets/Assistants-DetFdNS9.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/AtelierDesContenus-if-TR_lQ.js","assets/Audience-B_HRF9SF.js","assets/Aujourdhui-Dus69yDs.js","assets/avant-le-fauteuil-lecture-BGknM5D2.js","assets/AvantLeFauteuil-BqiLevWV.js","assets/avis-fiches-Bsj8nOWo.js","assets/AvisGoogle-DaPXfwX9.css","assets/AvisGoogle-DtJzbWvO.js","assets/BadgeEssai-BxM-pv6c.js","assets/bilan-B-bfPYR0.css","assets/bilan-IKHYFTx0.js","assets/BilanMensuel-BYIx8d5b.js","assets/Branches-DFgIpknG.js","assets/bridges-Du21TDNc.js","assets/Caisse-CZoh46bZ.js","assets/caisse-du-soir-Bfj0FoL8.js","assets/caisse-du-soir-C6vPx-E_.css","assets/Caisses-DF5ySgaI.js","assets/Calendrier-451HvodX.js","assets/campagnes-pur-jwyWflCl.js","assets/Carnet-Bm8Q_Oq8.js","assets/carte-CUPKzPgn.js","assets/carte-_W_-xBPj.css","assets/CarteModal-BjlnF7yu.js","assets/CartesCadeaux-BDLOSIfg.js","assets/Catalogue-CKO472W7.js","assets/CentreDeCommande-Du8kyJhp.css","assets/CentreDeCommande-Dzaomsfo.js","assets/Cercle-ceujktCm.js","assets/certificat-DFt7O3VE.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-BXoyJYj9.js","assets/chiffre-du-jour-pur-42T61j5E.js","assets/ChiffreDesPrestations-D72Sdihx.js","assets/client-L1PNPI0x.js","assets/cloture-du-jour-Bn0VuWp6.js","assets/ClotureDuTiroir-2tdSAYUG.js","assets/Coffre-BOVvEunR.js","assets/components-On5PchpC.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-BgQ-kIMa.js","assets/Comptes-DykyzTlL.js","assets/consultation-C2klhwtE.js","assets/consultation-CRW6QcWf.css","assets/Consultations-Bf-UfysT.js","assets/consultNotes-CuFH9sVa.js","assets/Conversations-D4WwB5Zo.css","assets/Conversations-DN8e1i6i.js","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-DR2_BAsY.js","assets/currency-qfIhGmrs.js","assets/Customers-Dgi9vsSM.js","assets/Dashboard-B2x7VsE_.css","assets/Dashboard-E30-BTvp.js","assets/dates-CEaCEOi2.js","assets/Demandes-eneBjfZU.js","assets/DepenseEnUnePhrase-BIGRlGqP.css","assets/DepenseEnUnePhrase-CYzWbQ25.js","assets/Depenses-BYohK3uc.js","assets/depenses-saisie-DAJGwWo0.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-CrAUoxKw.js","assets/diagnostics-au-trone-CzhNquKX.js","assets/Dictee-D2P9yM7v.css","assets/Dictee-MPYkhdAK.js","assets/dictee-pur-Cmqrc8g_.js","assets/Discussions-cnbFjZfp.js","assets/EditeurDesOffres-DeZM55ou.js","assets/Encaissements-DUPQXbER.js","assets/enfants-DO9e-qxu.js","assets/Engagements-B_2wjaVu.js","assets/Engagements-Cj5S9MhG.css","assets/engagements-coffre-C0_Ogb7t.js","assets/EntreDeuxSeances-B3B-Aoeo.js","assets/Evaluation-D7ZcgGjj.js","assets/Factures-Bpb24PLu.js","assets/FenetreDesCivilites-I7iYP6PH.js","assets/FenetreDesCivilites-zfNk1aak.css","assets/FenetreDuPoint-DbGp9r8m.js","assets/Fil-CPvgcgWc.js","assets/finances-BMFnlkRx.css","assets/fon-BFkn6bfo.js","assets/Fournisseurs-CwqU94cw.js","assets/fournisseurs-CyAvSQjV.js","assets/foyer-By9rfV9U.js","assets/Gerard-Cgj-zsJh.css","assets/gerard-donnees-Cywyi4Gl.js","assets/Gerard-Dxnoo1iJ.js","assets/gestes-conversation-BcqiZFu2.js","assets/HomeRituals-DZmZjL7R.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-Dh3HlK9f.js","assets/ia-centre-D65as2H8.js","assets/ia-diagnostic-pur-BBLrGY5l.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-tableau-pur-CSRjGtTf.js","assets/identite-ee7MWY1B.js","assets/index-B9iuZcPL.js","assets/index.es-B6t7Tyxk.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-BAgLf7b7.js","assets/jspdf.es.min-C1sUBFyl.js","assets/JustePrix-pi1X4E8_.js","assets/kkiapay-C1osNuHQ.js","assets/kkiapay-widget-DnUhUNd4.js","assets/Laboratoire-DxlIf2LD.js","assets/LaJournee-Bn_G0HCt.css","assets/LaJournee-DJlan7tD.js","assets/LesPaiements-BvdfOCbQ.css","assets/LesPaiements-CVnhdmQq.js","assets/LettresAuDossier-WiXJTcxj.js","assets/LienMndPay-CAVDz_aP.js","assets/Marketing-BxG_SYZ9.js","assets/MarketingBranche-DxNZJ_pw.js","assets/Marque-C2fqoA-w.js","assets/MesPourboires-CDX10xk6.js","assets/MesPourboires-D9I_9rZf.css","assets/MesTaches-Cc4XUDf6.css","assets/MesTaches-xHjBoJRe.js","assets/momo-C2ZVfV9J.js","assets/MonMois-B69NyTKR.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/objectifs-zjw_W37k.js","assets/opale-BKee6QE5.js","assets/oreille-B1AMUmZh.js","assets/paie-du-5-CaQuENh2.js","assets/paie-du-5-DeJq-K_U.css","assets/paie-du-5-pur-BGtOlCZ5.js","assets/PaieParMtn-CZ6f9OB4.js","assets/paliers-D_B4SKTf.js","assets/Parametres-DLqlE_8D.js","assets/parcours-B2QESSX5.js","assets/Parrainages-Bd3luRLX.js","assets/Parrainages-gAHAPB_6.css","assets/PassageAvantLeFauteuil-CFiwr22g.js","assets/pdf-VJcNm7C7.js","assets/pdf-xTRY7o-B.js","assets/pdf.worker.min-uNib_u9P.js","assets/Personas-B5KOpvo2.js","assets/Personnel-C3iTmvoo.js","assets/photo-BCpjyK1G.js","assets/pilotage-D8kf1Co8.css","assets/Pourboires-CekGLpb-.js","assets/Predictions-Dv9os9YA.js","assets/Prestataires-Jxj8-O6X.js","assets/Prets-BbYTs7D_.js","assets/PrevisionDuMois-BFbnETBy.js","assets/PrevisionDuMois-DlFTw3OX.css","assets/previsions-pur-Cmnwe_s1.js","assets/Previsions-r4v19Anp.css","assets/Previsions-vXWRxIN0.js","assets/processus-pur-R6U5QcCi.js","assets/Projets-COO7WDEE.css","assets/Projets-DyK4JHi6.js","assets/projets-D_GJtzWb.js","assets/projets-pur-2ZEMRNDU.js","assets/protocoles-Biz-367j.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-CyBtdTTC.js","assets/qualification-1c67S3WS.js","assets/quiz-5qMPWZVi.js","assets/Rapport-D7J6ViOl.js","assets/Recommandations-CGahTrxS.js","assets/regler-C5hcM02_.css","assets/regler-DzuF7A_M.js","assets/regler-la-seance-serveur-Bs6rzqZX.js","assets/relances-pur-lwRTXc5E.js","assets/releve-des-avis-B8trX5oU.js","assets/SalonFoyer-C2NnlrDf.js","assets/secretariat-admin-Bx-lTmgt.js","assets/Secretariat-Co5RXfKr.js","assets/Secretariat-Cy79Zw30.css","assets/Signatures-Wt0PtqiG.js","assets/SignerUnPdf-DlZbcojr.js","assets/Synthese-ZtOHIo50.js","assets/SyntheseGraphes-Do93NxYp.js","assets/systeme-TPy-pF7j.css","assets/Tableau-DIIGhZQ9.js","assets/temps-D4vxAPzi.js","assets/Textes-DE1dqZ3N.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-CkDzpGy0.css","assets/tiroirs-CSSc1GHd.js","assets/trone-CQ2DUl_d.css","assets/trone-flZvM1BD.js","assets/useAudiences-BZiJ5SKv.js","assets/useClotureDuJour-Dc2LlgZo.js","assets/Vitrine-BWilTqQJ.css","assets/Vitrine-Dw9gB1aC.js","assets/_admin-hmW6P-vb.js","assets/_contrat-DaLyEsnm.js","assets/_heures-BuG8xZLw.js","assets/_reuni-DDKR12pg.js","assets/_shared-BjSszRFf.js","assets/_signature-CFstinlo.js","assets/_ui-BrUDlmuM.css","assets/_ui-x8QsTvrI.js"];
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
