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
const BUILD = "20261107140313";
const A_GARDER = ["./","assets/abonnements--BUg7Iow.js","assets/Abonnements-ChTHEK4_.js","assets/Abonnements-DTY7p2DH.css","assets/Academie-D0V49u7E.js","assets/Acces-CPtv2vvq.js","assets/afaire-B-lHBK3l.js","assets/AFaire-icmViaFk.js","assets/Agents-Co6gu-JE.js","assets/agents-donnees-CsdMyVGd.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-C96ne9G_.js","assets/Appels-B2roBpkd.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/Assistants-CrBEual6.js","assets/Assistants-D9i2Xwmg.css","assets/AtelierDesContenus-CfP6zySV.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/Audience-D2jF8VPP.js","assets/Aujourdhui-DAIcnMeg.js","assets/avant-le-fauteuil-lecture-BakBr3z3.js","assets/AvantLeFauteuil-Dbi_06Pr.js","assets/avis-fiches-ukSWmnzS.js","assets/AvisGoogle-BgZ3LYMG.js","assets/AvisGoogle-DaPXfwX9.css","assets/BadgeEssai-CbM9XqmV.js","assets/bilan-B-bfPYR0.css","assets/bilan-B4S0vK5o.js","assets/BilanMensuel-Zb8XijKM.js","assets/Branches-az9aLFA7.js","assets/bridges-EkhncFdd.js","assets/caisse-du-soir-C-eM4egu.js","assets/caisse-du-soir-C6vPx-E_.css","assets/Caisse-MtTL-wlQ.js","assets/Caisses-YQDmYoNk.js","assets/Calendrier-CG_rIHqq.js","assets/campagnes-pur-9gtlhzyA.js","assets/Carnet-BhfOMQ-Y.js","assets/carte-7FKriUjQ.js","assets/carte-_W_-xBPj.css","assets/CarteModal-C1icKJWb.js","assets/CartesCadeaux-CZlf3Ef_.js","assets/Catalogue-DU2vVEUN.js","assets/CentreDeCommande-CY1pEZZ1.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-DbO9cqff.js","assets/certificat-Cf7XUXyB.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-BCBVJHyd.js","assets/chiffre-du-jour-pur-igl6E3DD.js","assets/ChiffreDesPrestations-n9RIgLZr.js","assets/client-ANOy_kb3.js","assets/cloture-du-jour-Cs9j0-Ht.js","assets/ClotureDuTiroir-CVboY0HE.js","assets/Coffre-DlwqO284.js","assets/components-CTnwILnm.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-Dgxbj6WK.js","assets/Comptes-CdPM-U1u.js","assets/consultation-C-cQmGVu.js","assets/consultation-CRW6QcWf.css","assets/Consultations-CN1BLtq0.js","assets/consultNotes-C05vyQTh.js","assets/Conversations-D4WwB5Zo.css","assets/Conversations-jaihQC-N.js","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-Cg80qpPt.js","assets/currency-qfIhGmrs.js","assets/Customers-B_FxS5Fj.js","assets/Dashboard-B2x7VsE_.css","assets/Dashboard-BGREvpvh.js","assets/dates-DychiVbx.js","assets/Demandes-BbfgQDLl.js","assets/DepenseEnUnePhrase-BIGRlGqP.css","assets/DepenseEnUnePhrase-OSudRGok.js","assets/Depenses-DWtdsQRo.js","assets/depenses-saisie-CW-FieNV.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-5WvAXzVx.js","assets/diagnostics-au-trone-Xz8kyPUB.js","assets/Dictee-D2P9yM7v.css","assets/Dictee-mCdWseFY.js","assets/dictee-pur-m0wo5bAG.js","assets/Discussions-EJRyW8iH.js","assets/EditeurDesOffres-CG3hbQ6w.js","assets/Encaissements-wpbtTh4f.js","assets/enfants-BVEwvW_y.js","assets/Engagements-BJiJ-vOK.js","assets/Engagements-Cj5S9MhG.css","assets/engagements-coffre-DF6j2O1R.js","assets/EntreDeuxSeances-DmQFEFuK.js","assets/Evaluation-CCdXtHaa.js","assets/Factures-CJvSdUrj.js","assets/FenetreDesCivilites-BhNDK3hc.js","assets/FenetreDesCivilites-zfNk1aak.css","assets/FenetreDuPoint-VWjc5u5v.js","assets/Fil-Y0dZzlIc.js","assets/finances-BMFnlkRx.css","assets/fon-BaYJFDUU.js","assets/Fournisseurs-BxOgy23q.js","assets/fournisseurs-DVUc9hbF.js","assets/foyer-CATJSADQ.js","assets/Gerard-BN1xlGNB.js","assets/Gerard-Cgj-zsJh.css","assets/gerard-donnees-52DaKXyw.js","assets/gestes-conversation-C0t6-6Vi.js","assets/HomeRituals-8WbPT4bI.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-8-1WKCAo.js","assets/ia-centre-B7z_o8UV.js","assets/ia-diagnostic-pur-BBLrGY5l.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-tableau-pur-CSRjGtTf.js","assets/identite-CoiO1ogu.js","assets/index-xdx0SpiU.js","assets/index.es-DmAHDm9T.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-PKiogkHE.js","assets/jspdf.es.min-D3x4rLiE.js","assets/JustePrix-DzCj2ZbG.js","assets/kkiapay-B0V3yWex.js","assets/kkiapay-widget-DnUhUNd4.js","assets/Laboratoire-Bc7MLaMs.js","assets/LaJournee-Bn_G0HCt.css","assets/LaJournee-DTKxFDpb.js","assets/LesPaiements-BvdfOCbQ.css","assets/LesPaiements-CHPSJvli.js","assets/LettresAuDossier-BsIW8UD1.js","assets/LienMndPay-PBu0wQeJ.js","assets/Marketing-CKwoVkld.js","assets/MarketingBranche-a6F5x9BR.js","assets/Marque-CKSVNVjJ.js","assets/MesPourboires-CZFNbxXI.js","assets/MesPourboires-D9I_9rZf.css","assets/MesTaches-Br6TU2rG.js","assets/MesTaches-Cc4XUDf6.css","assets/momo-C2ZVfV9J.js","assets/MonMois-DRvbgAP7.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-B6NuQATp.js","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/opale-BelIUSio.js","assets/oreille-B1AMUmZh.js","assets/paie-du-5-CMW3L_ZK.js","assets/paie-du-5-DeJq-K_U.css","assets/paie-du-5-pur-CwaID0m2.js","assets/PaieParMtn-D5QYNd5R.js","assets/paliers-DZlmipHu.js","assets/Parametres-Ek8DT8fF.js","assets/parcours-DmmimReB.js","assets/Parrainages-B1_LjMFH.js","assets/Parrainages-gAHAPB_6.css","assets/PassageAvantLeFauteuil-DErXN6I6.js","assets/pdf-C8nB4T46.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/Personas-DR-BVbQP.js","assets/Personnel-Bad6MzVn.js","assets/photo-BNAbyhmG.js","assets/pilotage-D8kf1Co8.css","assets/Pourboires-DM8m4V4k.js","assets/Predictions-CdHVAn9M.js","assets/Prestataires-AWp-VYvm.js","assets/Prets-0mLqkei4.js","assets/PrevisionDuMois-CUUSnuup.js","assets/PrevisionDuMois-DlFTw3OX.css","assets/Previsions-Fn5X4ZHf.js","assets/previsions-pur-BAgS06xz.js","assets/Previsions-r4v19Anp.css","assets/processus-pur-R6U5QcCi.js","assets/Projets-B1Bz9OoM.js","assets/Projets-COO7WDEE.css","assets/projets-Dtr-e8Zb.js","assets/projets-pur-2ZEMRNDU.js","assets/protocoles--BKX5cpu.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-BX3hDn-5.js","assets/qualification-C4H6qcp7.js","assets/quiz-5qMPWZVi.js","assets/Rapport-CsJUeKGR.js","assets/Recommandations-hbb6GoOT.js","assets/regler-BFhqrjfI.js","assets/regler-C5hcM02_.css","assets/regler-la-seance-serveur-Bs6rzqZX.js","assets/relances-pur-lwRTXc5E.js","assets/releve-des-avis-K1Els49O.js","assets/SalonFoyer-DwLpzl8-.js","assets/secretariat-admin-BjfqawnW.js","assets/Secretariat-Cy79Zw30.css","assets/Secretariat-jFAP32l4.js","assets/Signatures-DmUDMzWz.js","assets/SignerUnPdf-DaqxZ4wL.js","assets/Synthese-DvX_bP3-.js","assets/SyntheseGraphes-Tr-7LI43.js","assets/systeme-TPy-pF7j.css","assets/Tableau-n6DlvKVX.js","assets/temps-DbjnMTeB.js","assets/Textes-DLpOzRbT.css","assets/Textes-D_lU7q_C.js","assets/tiroirs-CkDzpGy0.css","assets/tiroirs-s6n--0CN.js","assets/trone-BEjsrUwp.js","assets/trone-CQ2DUl_d.css","assets/useAudiences-QmTHmYZr.js","assets/useClotureDuJour-DaRlUxWG.js","assets/Vitrine-BWilTqQJ.css","assets/Vitrine-D1N2BdLr.js","assets/_admin-BvOsqHBQ.js","assets/_contrat-CR8GeGjU.js","assets/_heures-Cs9EpKjN.js","assets/_reuni-DflL3Cku.js","assets/_shared-ByCDPSgG.js","assets/_signature-C1YIUGKS.js","assets/_ui-BPzLW6YR.js","assets/_ui-BrUDlmuM.css"];
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
