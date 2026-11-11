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
const BUILD = "20261111161753";
const A_GARDER = ["./","assets/abonnements-BS-Hd1RU.js","assets/Abonnements-Cigaj2PO.js","assets/Abonnements-DTY7p2DH.css","assets/Academie-D9kJRX1S.js","assets/Acces-BCJYOFez.js","assets/afaire-Cx6Kcda1.js","assets/AFaire-kGUoZ0MT.js","assets/agents-donnees-C4dj8dtN.js","assets/Agents-DSpw5Msi.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-Cw_ql6RJ.js","assets/Appels-C67LC_0T.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/Assistants-D9i2Xwmg.css","assets/Assistants-DN06OSAM.js","assets/AtelierDesContenus-CSUlBq55.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/Audience-BgrWEuQ1.js","assets/Aujourdhui-e9Jx69mf.js","assets/avant-le-fauteuil-lecture-B6MyDrHy.js","assets/AvantLeFauteuil-RuXVdDK1.js","assets/avis-fiches-C71PXdEQ.js","assets/AvisGoogle-DaPXfwX9.css","assets/AvisGoogle-St0Sb3CG.js","assets/BadgeEssai-4BDAhBVq.js","assets/bilan-B-bfPYR0.css","assets/bilan-D9nnaSQv.js","assets/BilanMensuel-Bb-Ucj9J.js","assets/Branches-1BsYZlo_.js","assets/bridges-03uPmaPz.js","assets/caisse-du-soir-C6vPx-E_.css","assets/caisse-du-soir-DG1bVlXn.js","assets/Caisse-fkNA0pMb.js","assets/Caisses-CanAa8jp.js","assets/Calendrier-CMiQbBGF.js","assets/campagnes-pur-CJFxe-E4.js","assets/Carnet-DonFH8F0.js","assets/carte-CMd4Sz5e.js","assets/carte-_W_-xBPj.css","assets/CarteModal-BtZn8BtI.js","assets/CartesCadeaux-DE0RykKm.js","assets/Catalogue-VSwjO1am.js","assets/CentreDeCommande-BBPpx41s.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-Bbtd3raY.js","assets/certificat-CRwTRnw1.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-Dyd0ZPS2.js","assets/chiffre-du-jour-pur-UG2gmoav.js","assets/ChiffreDesPrestations-BwycnkH6.js","assets/client-DbG0JfMw.js","assets/cloture-du-jour-D62dAyQC.js","assets/ClotureDuTiroir-CVEJTUPC.js","assets/Coffre-jGeFBM3j.js","assets/components-B37GlZSq.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-C39YmGvj.js","assets/Comptes-C_iVRZ0_.js","assets/consultation-CRW6QcWf.css","assets/consultation-CUPw0n_b.js","assets/Consultations-CsV2EqYe.js","assets/consultNotes-DbNN0_wM.js","assets/Conversations-CycAHEBk.js","assets/Conversations-D4WwB5Zo.css","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-BXr_9hk2.js","assets/currency-qfIhGmrs.js","assets/Customers-DApWU7VY.js","assets/Dashboard-B2x7VsE_.css","assets/Dashboard-CMnbVDey.js","assets/dates-BTmVutG_.js","assets/Demandes-DLcuKJnp.js","assets/DepenseEnUnePhrase-BIGRlGqP.css","assets/DepenseEnUnePhrase-BQJA1Aee.js","assets/Depenses-D_xfX3Kx.js","assets/depenses-saisie-C5TNxHYv.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-1y0zMft4.js","assets/diagnostics-au-trone-CYX4Kfhk.js","assets/Dictee-BR8d1H21.js","assets/Dictee-D2P9yM7v.css","assets/dictee-pur-CP9IVaUj.js","assets/Discussions-exsts7CI.js","assets/EditeurDesOffres-DO8BeD2a.js","assets/Encaissements-BTGII1Ok.js","assets/enfants-DreAsemg.js","assets/Engagements-C-zqUvt7.js","assets/Engagements-Cj5S9MhG.css","assets/engagements-coffre-gPN9uMzH.js","assets/EntreDeuxSeances-DSRqMdH6.js","assets/Evaluation-pH9jVJ7i.js","assets/Factures-ycWHvTs9.js","assets/FenetreDesCivilites-X706qkR4.js","assets/FenetreDesCivilites-zfNk1aak.css","assets/FenetreDuPoint-DVMZNUeq.js","assets/Fil-Bv1PwKhl.js","assets/finances-BMFnlkRx.css","assets/fon-C4ALXP6y.js","assets/Fournisseurs-dw21DsOV.js","assets/fournisseurs-xmSzJsDt.js","assets/foyer-C7bPSqrN.js","assets/Gerard-61uldpLZ.js","assets/Gerard-Cgj-zsJh.css","assets/gerard-donnees-CB-GgdiQ.js","assets/gestes-conversation-DzEq85nt.js","assets/heures-des-rappels-pur-Dig9pZpo.js","assets/HomeRituals-CUHftpbw.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-Cn-PzcTh.js","assets/ia-centre-Dc90-P2f.js","assets/ia-diagnostic-pur-BBLrGY5l.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-tableau-pur-p6UvREJe.js","assets/identite-CVu5dTYF.js","assets/index-spSEKTvA.js","assets/index.es-BT9q9Cea.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-JsTDjDkH.js","assets/jspdf.es.min-DFScHZpq.js","assets/JustePrix-Dt0cTlj3.js","assets/kkiapay--b80dhfB.js","assets/kkiapay-widget-DnUhUNd4.js","assets/Laboratoire-Bt1HDIdf.js","assets/LaJournee-B3_zdLse.js","assets/LaJournee-Bn_G0HCt.css","assets/LesPaiements-6YOIqQxs.js","assets/LesPaiements-J5smJ_z0.css","assets/LettresAuDossier-C4iIrAvM.js","assets/LienMndPay-wsdG3MHb.js","assets/Marketing-CWPBf_e4.js","assets/MarketingBranche-Q6A7C5vS.js","assets/Marque-DFd5PN8P.js","assets/MesPourboires-CENjelyb.css","assets/MesPourboires-CkHNgpNX.js","assets/MesTaches-Cc4XUDf6.css","assets/MesTaches-D2_qvJ-1.js","assets/momo-C2ZVfV9J.js","assets/MonMois-DpfP-3TF.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-BZyQvx4K.js","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/opale-COhWiGFj.js","assets/oreille-B1AMUmZh.js","assets/paie-du-5-BjWV-iXU.js","assets/paie-du-5-DeJq-K_U.css","assets/paie-du-5-pur-DDJAEcIa.js","assets/PaieParMtn-CHeu7asK.js","assets/paliers-BtjK59_J.js","assets/Parametres-DwiQa8rT.js","assets/parcours-Bf2jRB-D.js","assets/Parrainages-D0MIWkL2.js","assets/Parrainages-gAHAPB_6.css","assets/PassageAvantLeFauteuil-BTyQYmu3.js","assets/pdf-CzycQK3u.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/periode-des-pourboires-pur-BUWqfwov.js","assets/Personas-BiIJTaJE.js","assets/Personnel-CuOsvJsm.js","assets/photo-BoCdwiwr.js","assets/pilotage-D8kf1Co8.css","assets/Pourboires-BY9uQHt6.js","assets/Predictions-vVwH8ERK.js","assets/Prestataires-DLpbm45k.js","assets/Prets-DXtBIAxu.js","assets/PrevisionDuMois-DHewDjR7.js","assets/PrevisionDuMois-DlFTw3OX.css","assets/Previsions-9BU2Vg1T.css","assets/Previsions-CgBhtf_0.js","assets/previsions-pur-D2wQG-oA.js","assets/processus-pur-R6U5QcCi.js","assets/Projets-COO7WDEE.css","assets/projets-DC2fmm0v.js","assets/Projets-hl1EKsV8.js","assets/projets-pur-2ZEMRNDU.js","assets/protocoles-67J3oR1Q.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-C2NkNKk4.js","assets/qualification-BoOYhHaI.js","assets/quiz-5qMPWZVi.js","assets/Rapport-D0h27M2j.js","assets/Recommandations-BujUX-uA.js","assets/regler-C5hcM02_.css","assets/regler-C7jgM2yx.js","assets/regler-la-seance-serveur-Bs6rzqZX.js","assets/relances-pur-BacTXlI2.js","assets/releve-des-avis-BSY_sQAV.js","assets/SalonFoyer-bMbw6G-r.js","assets/secretariat-admin-Cg-qZtcb.js","assets/Secretariat-BzTYltcj.js","assets/Secretariat-Cy79Zw30.css","assets/Signatures-CNNWKot2.js","assets/SignerUnPdf-DYVuNF7K.js","assets/Synthese-DvDNOmQG.js","assets/SyntheseGraphes-BUfxbWtF.js","assets/systeme-TPy-pF7j.css","assets/Tableau-H0XSPCMR.js","assets/temps-C4MdGXyD.js","assets/Textes-B7d4lI_u.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-CkDzpGy0.css","assets/tiroirs-nAfu--HN.js","assets/trone-Dvz2IfYI.js","assets/trone-wE0OFAgL.css","assets/useAudiences-CWi8JM0l.js","assets/useClotureDuJour-BgT-EXRK.js","assets/Vitrine-BWilTqQJ.css","assets/Vitrine-lmDCmnz1.js","assets/_admin-IogiF50p.js","assets/_contrat-C6jQ41Jp.js","assets/_reuni-B_2ISx95.js","assets/_shared-DewnYR9y.js","assets/_signature-BfBDbJzF.js","assets/_ui-BrUDlmuM.css","assets/_ui-CZbHlQrt.js"];
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
