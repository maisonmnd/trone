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
const BUILD = "20261107204112";
const A_GARDER = ["./","assets/abonnements-D-DPTiS2.js","assets/Abonnements-DTY7p2DH.css","assets/Abonnements-vYgH2Sfx.js","assets/Academie-BZc2NZIv.js","assets/Acces-Dc2T5I2h.js","assets/afaire-CQcuUvnj.js","assets/AFaire-DwTGuqh1.js","assets/Agents-Cb_GaDK7.js","assets/agents-donnees-BDV5ZXWX.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-Ci8iteYf.js","assets/Appels-CxhgGjjk.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/Assistants-D9i2Xwmg.css","assets/Assistants-XjRTo4CD.js","assets/AtelierDesContenus-CB1YMS94.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/Audience-Bw28-JZb.js","assets/Aujourdhui-C2t-tDZR.js","assets/avant-le-fauteuil-lecture-DNnwdrzB.js","assets/AvantLeFauteuil-JY1yv2D_.js","assets/avis-fiches-A_7u8nPQ.js","assets/AvisGoogle-DaPXfwX9.css","assets/AvisGoogle-DX6UVVmr.js","assets/BadgeEssai-huFZ-Jws.js","assets/bilan-B-bfPYR0.css","assets/bilan-C7qy9bNa.js","assets/BilanMensuel-ChLguYxw.js","assets/Branches-DOfg38e3.js","assets/bridges-CdlRe8E7.js","assets/Caisse-DNmfp112.js","assets/caisse-du-soir-C6vPx-E_.css","assets/caisse-du-soir-CJkzcdan.js","assets/Caisses-CZH8Ke5-.js","assets/Calendrier-BwKY6p7V.js","assets/campagnes-pur-6Gr1MQH4.js","assets/Carnet-D3ICJQeS.js","assets/carte-tlJsvsv7.js","assets/carte-_W_-xBPj.css","assets/CarteModal-DWOZ1Ipg.js","assets/CartesCadeaux-Brgt9M-S.js","assets/Catalogue-D93tELpx.js","assets/CentreDeCommande-CFUdBiUz.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-DyvRW0j2.js","assets/certificat-MTxGKNvX.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-7T9nNZIN.js","assets/chiffre-du-jour-pur-Bnhr91my.js","assets/ChiffreDesPrestations-H-BMbfY8.js","assets/client-DJclM3PA.js","assets/cloture-du-jour-lgAXjdKW.js","assets/ClotureDuTiroir-Dc_xZD7Q.js","assets/Coffre-C2jkLsbR.js","assets/components-DY46GQ9E.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-BZFA4w4i.js","assets/Comptes-D79Hbj8U.js","assets/consultation-CRW6QcWf.css","assets/consultation-G44M0Hgt.js","assets/Consultations-CNzr1hdd.js","assets/consultNotes-CxUXwGhf.js","assets/Conversations-D4WwB5Zo.css","assets/Conversations-DIe9q4wX.js","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-fA4vBY_c.js","assets/currency-qfIhGmrs.js","assets/Customers-BzEhCx_Y.js","assets/Dashboard-B2x7VsE_.css","assets/Dashboard-_6cffGVL.js","assets/dates-BHnmHD-T.js","assets/Demandes-CVaoXcz6.js","assets/DepenseEnUnePhrase-BIGRlGqP.css","assets/DepenseEnUnePhrase-ymu6W_Ci.js","assets/Depenses-BG6itiQ7.js","assets/depenses-saisie-B5FrQOQD.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-KqhXe7_r.js","assets/diagnostics-au-trone-DOEHY0_P.js","assets/Dictee-D2P9yM7v.css","assets/dictee-pur-D4p0uNZj.js","assets/Dictee-UmpuFXML.js","assets/Discussions-DKJ1DrkW.js","assets/EditeurDesOffres-Dckp3L0r.js","assets/Encaissements-BTJbvXqJ.js","assets/enfants-D-cdxCoM.js","assets/Engagements-Cj5S9MhG.css","assets/engagements-coffre-BAOJKVce.js","assets/Engagements-Cq1mSJcR.js","assets/EntreDeuxSeances-DAJSE-76.js","assets/Evaluation-D3sF1JZI.js","assets/Factures-DVg0TZsL.js","assets/FenetreDesCivilites-Dm9J6732.js","assets/FenetreDesCivilites-zfNk1aak.css","assets/FenetreDuPoint-BLJLTZE6.js","assets/Fil-D7XiwF1f.js","assets/finances-BMFnlkRx.css","assets/fon-C5dDvCnL.js","assets/Fournisseurs-BP5xQnYv.js","assets/fournisseurs-CCFmfrRP.js","assets/foyer-UirP1TUO.js","assets/Gerard--3UpnKja.js","assets/Gerard-Cgj-zsJh.css","assets/gerard-donnees-BHv8qOGy.js","assets/gestes-conversation-DB6ShuTe.js","assets/HomeRituals-B3vibWx5.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-CR4o2UFg.js","assets/ia-centre-Bzxj17D_.js","assets/ia-diagnostic-pur-BBLrGY5l.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-tableau-pur-CSRjGtTf.js","assets/identite-NNHreL_Z.js","assets/index-DXivcQnq.js","assets/index.es-DTe5HcYM.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-Cypi07vq.js","assets/jspdf.es.min-gsNWmoEE.js","assets/JustePrix-BKqGVAco.js","assets/kkiapay-C05DxXFN.js","assets/kkiapay-widget-DnUhUNd4.js","assets/Laboratoire-Dxb7wjcf.js","assets/LaJournee-Bn_G0HCt.css","assets/LaJournee-CeWDc9Dp.js","assets/LesPaiements-6esTGyx7.js","assets/LesPaiements-BvdfOCbQ.css","assets/LettresAuDossier-DoaFRLtc.js","assets/LienMndPay-CR4rVs3w.js","assets/Marketing-BTmQRjs5.js","assets/MarketingBranche-BkdudOTA.js","assets/Marque-DtwZOawc.js","assets/MesPourboires-Bw6w2Eyk.js","assets/MesPourboires-D9I_9rZf.css","assets/MesTaches-Cc4XUDf6.css","assets/MesTaches-DookVVea.js","assets/momo-C2ZVfV9J.js","assets/MonMois-BMAHLokD.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/objectifs-DILcdTN-.js","assets/opale-C8A8Gdaf.js","assets/oreille-B1AMUmZh.js","assets/paie-du-5-DeJq-K_U.css","assets/paie-du-5-eybqhp0W.js","assets/paie-du-5-pur-BcN897DS.js","assets/PaieParMtn-BrEMbhMs.js","assets/paliers-CDhEB-b7.js","assets/Parametres-BOPbPbqs.js","assets/parcours-BByiBmnV.js","assets/Parrainages-DW-Gj-cV.js","assets/Parrainages-gAHAPB_6.css","assets/PassageAvantLeFauteuil-BcUDMRo_.js","assets/pdf-DmCIvI35.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/Personas-DnsejLL2.js","assets/Personnel-FWaBW02H.js","assets/photo-D2ohtc_t.js","assets/pilotage-D8kf1Co8.css","assets/Pourboires-BNFmQJZF.js","assets/Predictions-CmuHBRTZ.js","assets/Prestataires-B3oAmrig.js","assets/Prets-BareJ-cE.js","assets/PrevisionDuMois-DlFTw3OX.css","assets/PrevisionDuMois-MzsqWnwp.js","assets/Previsions-BShigsW-.js","assets/previsions-pur-loPM8Nia.js","assets/Previsions-r4v19Anp.css","assets/processus-pur-R6U5QcCi.js","assets/Projets-B2w7FpAx.js","assets/Projets-COO7WDEE.css","assets/projets-DAhD1I67.js","assets/projets-pur-2ZEMRNDU.js","assets/protocoles-CZAM1Mj2.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-Dxt4OW-E.js","assets/qualification-D4m-Thbl.js","assets/quiz-5qMPWZVi.js","assets/Rapport-CA76BFAc.js","assets/Recommandations-BZrhI3LE.js","assets/regler-C5hcM02_.css","assets/regler-la-seance-serveur-Bs6rzqZX.js","assets/regler-N7Fsb0kh.js","assets/relances-pur-lwRTXc5E.js","assets/releve-des-avis-Buj_dTZ1.js","assets/SalonFoyer-BhqC1rKO.js","assets/secretariat-admin-BS1p5sZW.js","assets/Secretariat-C9KE6FYW.js","assets/Secretariat-Cy79Zw30.css","assets/Signatures-DhgXMcVa.js","assets/SignerUnPdf-vaKpHQRY.js","assets/Synthese-DsVqrHQn.js","assets/SyntheseGraphes-CkDOzcVx.js","assets/systeme-TPy-pF7j.css","assets/Tableau-BDg0-AvL.js","assets/temps-CWda-sFa.js","assets/Textes-btEUpDAc.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-B96Lcn5E.js","assets/tiroirs-CkDzpGy0.css","assets/trone-Brq_I6k7.js","assets/trone-CQ2DUl_d.css","assets/useAudiences-CMoLTl7N.js","assets/useClotureDuJour-Dl2inT1y.js","assets/Vitrine-BWilTqQJ.css","assets/Vitrine-wdoS0xqp.js","assets/_admin-CJF2t6lm.js","assets/_contrat-Drjk08_9.js","assets/_heures-D8ulbX0Y.js","assets/_reuni-BlDtE-y4.js","assets/_shared-DjHHkNFX.js","assets/_signature-C7V1lgoR.js","assets/_ui-BrUDlmuM.css","assets/_ui-S70TGzTV.js"];
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
