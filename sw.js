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
const BUILD = "20261105120236";
const A_GARDER = ["./","assets/Abonnements-D0_7ZSzD.js","assets/abonnements-D5lUb1MR.js","assets/Academie-DBmpR8uW.js","assets/Acces-DiZMhmlX.js","assets/AFaire-BRo66GNg.js","assets/afaire-Dgwh4Zja.js","assets/Agents-D2tDNo30.js","assets/agents-donnees-Dxjh6q1V.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-noY1XtHs.js","assets/Appels-CSkOa_mb.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/Assistants-CcnaSKU-.js","assets/Assistants-D9i2Xwmg.css","assets/AtelierDesContenus-B9WzP2Ad.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/Audience-DjbjOq_P.js","assets/Aujourdhui-DiZW8imL.js","assets/avant-le-fauteuil-lecture-CTXHZXrb.js","assets/AvantLeFauteuil-Dv--DG_9.js","assets/avis-fiches-DtDkipI9.js","assets/AvisGoogle-DaPXfwX9.css","assets/AvisGoogle-DYD0guM2.js","assets/bilan-B-bfPYR0.css","assets/bilan-qKImNuXU.js","assets/BilanMensuel-SVvwff83.js","assets/Branches-BCizGrrF.js","assets/bridges-CcBt4ce4.js","assets/caisse-du-soir-CBFWx9Bg.js","assets/Caisse-Kbt0rAf5.js","assets/Caisses-DwDljE0s.js","assets/Calendrier-CkTZyWqG.js","assets/campagnes-pur-DMmm_Wlf.js","assets/Carnet-k4IPH3Hb.js","assets/carte-BG0vvUHD.js","assets/carte-_W_-xBPj.css","assets/CarteModal-CtgRRBJw.js","assets/CartesCadeaux-d0INnUJg.js","assets/Catalogue-CpIShmw4.js","assets/CentreDeCommande-BArWXZCj.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-Cxp6ph6x.js","assets/certificat-10pO4MM3.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-DKHZChv-.js","assets/chiffre-du-jour-pur-BWmxKcQP.js","assets/ChiffreDesPrestations-C2Y0JDXN.js","assets/client-5f3HhW81.js","assets/cloture-du-jour-xrP0ynr7.js","assets/ClotureDuTiroir-C6vPx-E_.css","assets/ClotureDuTiroir-D8y9MqHY.js","assets/Coffre-Ct6YUfHG.js","assets/components-ClOCxBeC.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-CRPdThn5.js","assets/Comptes-i_MVKWSP.js","assets/consultation-CRW6QcWf.css","assets/consultation-dkJmXbfQ.js","assets/Consultations-CAzs2ooA.js","assets/consultNotes-BnbgRc9u.js","assets/Conversations-D4WwB5Zo.css","assets/Conversations-rJFAQvML.js","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-CyZ7uZT-.js","assets/currency-qfIhGmrs.js","assets/Customers-BHlDYwS4.js","assets/Dashboard-B2x7VsE_.css","assets/Dashboard-IeweyuC7.js","assets/dates-Cx62VUMV.js","assets/Demandes-hCua1lz5.js","assets/DepenseEnUnePhrase-BIGRlGqP.css","assets/DepenseEnUnePhrase-BZTcbyHc.js","assets/Depenses-C_iUZe6N.js","assets/depenses-saisie-B_hIwRsD.js","assets/dernier-message-pur-CBYWnq8m.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-BtS-Dh3k.js","assets/diagnostics-au-trone-DiIcAhbB.js","assets/Dictee-BlTMfOLE.js","assets/Dictee-D2P9yM7v.css","assets/dictee-pur-CGOynziW.js","assets/Discussions-DZWOVm5q.js","assets/EditeurDesOffres-BRSEaKKo.js","assets/Encaissements-TzezTPLG.js","assets/enfants-voImn-yr.js","assets/Engagements-Cj5S9MhG.css","assets/Engagements-y2W1T2-n.js","assets/EntreDeuxSeances-BBG8PGz5.js","assets/Evaluation-D46FlaAl.js","assets/Factures-C5SCX4FZ.js","assets/FenetreDesCivilites-CkHNtJya.js","assets/FenetreDesCivilites-zfNk1aak.css","assets/FenetreDuPoint-BawSguvl.js","assets/Fil-Ds7-7zzP.js","assets/finances-BMFnlkRx.css","assets/fon-jyhMknfb.js","assets/fournisseurs-DA2m6f4M.js","assets/Fournisseurs-DRCPLycW.js","assets/foyer-PHny4fnc.js","assets/Gerard-CP3QOjfk.css","assets/gerard-donnees-OUQIO_eh.js","assets/Gerard-D_tzNVkC.js","assets/gestes-conversation-Dy9kQ3v8.js","assets/HomeRituals-CRNCNLUa.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-BkzNtHhH.js","assets/ia-centre-BSsQu70c.js","assets/ia-diagnostic-pur-BBLrGY5l.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-tableau-pur-CSRjGtTf.js","assets/identite-Bj7IAPhc.js","assets/index-BrseAspw.js","assets/index.es-AdCHoj5Z.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-rP07yLDJ.js","assets/jspdf.es.min-BziA3eb7.js","assets/JustePrix-BmGrs6F1.js","assets/kkiapay-DYRygy41.js","assets/kkiapay-widget-DnUhUNd4.js","assets/Laboratoire-DgSQcP0w.js","assets/LaJournee-49tu8sbB.js","assets/LaJournee-DNg04cPb.css","assets/LettresAuDossier-c6VzopZY.js","assets/LienMndPay-Bct89Lsz.js","assets/Marketing-e9WGPME0.js","assets/MarketingBranche-BLnW5JSV.js","assets/Marque-BDFA2PEq.js","assets/MesPourboires-D9I_9rZf.css","assets/MesPourboires-hNRAiMDX.js","assets/MesTaches-C7yGYoON.js","assets/MesTaches-Cc4XUDf6.css","assets/momo-C2ZVfV9J.js","assets/MonMois-BPWw5C-R.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-B2jDMhBd.js","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/opale-BGBZV5QH.js","assets/oreille-B1AMUmZh.js","assets/paie-du-5-C7i0nx3I.js","assets/paie-du-5-DIpy8pFw.css","assets/paliers-CA_AhwJV.js","assets/Parametres-DCwnI5sm.js","assets/parcours-CCZ8CVE2.js","assets/Parrainages-CVAlEQzS.js","assets/Parrainages-gAHAPB_6.css","assets/PassageAvantLeFauteuil-C-dsEItN.js","assets/pdf-CRAvoKqr.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/Personas-Dmv14fZn.js","assets/Personnel-DVfFg8CD.js","assets/photo-DLtRJ6L-.js","assets/pilotage-D8kf1Co8.css","assets/Pourboires-DDFwXjXA.js","assets/Predictions-CVefUD_z.js","assets/Prestataires-B8v2KdmI.js","assets/Prets-BPS8yWxY.js","assets/PrevisionDuMois-BBOedUeo.js","assets/PrevisionDuMois-DlFTw3OX.css","assets/Previsions-CoswNpuE.js","assets/previsions-pur-DYCP8ga6.js","assets/Previsions-r4v19Anp.css","assets/processus-pur-R6U5QcCi.js","assets/Projets-COO7WDEE.css","assets/Projets-D2lZqkgL.js","assets/projets-pur-2ZEMRNDU.js","assets/projets-YSOssNZP.js","assets/protocoles-GeDGbntS.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-DktS77Ed.js","assets/qualification-S7HmWaAc.js","assets/quiz-5qMPWZVi.js","assets/Rapport-BEr9kZ03.js","assets/Recommandations-CrEpOUYx.js","assets/regler-3WKG0Iqh.js","assets/regler-C5hcM02_.css","assets/regler-la-seance-serveur-Bs6rzqZX.js","assets/relances-pur-lwRTXc5E.js","assets/releve-des-avis-YdwTp_x8.js","assets/SalonFoyer-v_27ixCq.js","assets/secretariat-admin-KJi41b39.js","assets/Secretariat-Cy79Zw30.css","assets/Secretariat-_7zE6R1J.js","assets/Signatures-B9uaVAjJ.js","assets/SignerUnPdf-V5CgnVJ6.js","assets/Synthese-A9nyFY4a.js","assets/SyntheseGraphes-8YS5hPED.js","assets/systeme-TPy-pF7j.css","assets/Tableau-BLRKTFPW.js","assets/temps-BNlVHZ7V.js","assets/Textes-Cg9zd2gd.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-CkDzpGy0.css","assets/tiroirs-FXzzWQ4C.js","assets/trone-ChF8ceKr.js","assets/trone-DQVzvvmA.css","assets/useAudiences-kXeByPeu.js","assets/useClotureDuJour-Bp7eUYBL.js","assets/Vitrine-84A0BNle.js","assets/Vitrine-BWilTqQJ.css","assets/_admin-CGOgc29o.js","assets/_contrat-BVCwQ_YY.js","assets/_heures-RjtXEs-d.js","assets/_reuni-CO_wuPwc.js","assets/_shared-BaJdf_ej.js","assets/_signature-K1ld7gbz.js","assets/_ui-AGyqZylo.js","assets/_ui-BWMA-PlM.css"];
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
