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
const BUILD = "20261120223558";
const A_GARDER = ["./","assets/Abonnements-AND-XEm1.js","assets/abonnements-CqKvXyi1.js","assets/Abonnements-DTY7p2DH.css","assets/Academie-R07plgTP.js","assets/Acces-BtQ3Tjbr.js","assets/afaire-CdGMTqfP.js","assets/AFaire-W9jgPBCg.js","assets/agents-donnees-BDHfahy7.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Agents-S5ZW7mkP.js","assets/Analytics-PT2OV6S6.js","assets/App-DkWg9vib.js","assets/Appels-BfKNaiBm.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/Assistants-BxLfooPt.js","assets/Assistants-D9i2Xwmg.css","assets/AtelierDesContenus-CETo2Tk8.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/Audience-DPhpgATe.js","assets/Aujourdhui-CoHdaklU.js","assets/auth-DOCSer1E.js","assets/avant-le-fauteuil-lecture-QavlOKy8.js","assets/AvantLeFauteuil-BPKfFbQV.js","assets/avis-fiches-CZFwu-RL.js","assets/AvisGoogle-DaPXfwX9.css","assets/AvisGoogle-DbQD6rg9.js","assets/BadgeEssai-BtHilzGk.js","assets/BadgeSuggere-C_tqrec0.js","assets/besoins-DNsgr3CS.js","assets/BesoinsEtRegles-BLwxGVV5.css","assets/BesoinsEtRegles-BzxzXHeO.js","assets/bilan-B-bfPYR0.css","assets/bilan-CQ7K43Lw.js","assets/BilanMensuel-k2zCttWe.js","assets/Branches-BOUlmo8p.js","assets/bridges-Daadiqor.js","assets/caisse-du-soir-C6vPx-E_.css","assets/caisse-du-soir-CMdZiH0s.js","assets/Caisse-ps_jalz5.js","assets/Caisses-BzrtwnJg.js","assets/Calendrier-Oywuw8dr.js","assets/campagnes-pur-0EWzHjOd.js","assets/Carnet-D3DPD343.js","assets/carte-22EzOOlx.js","assets/carte-_W_-xBPj.css","assets/CarteModal-ywgDzcSR.js","assets/CartesCadeaux-BAkD8dwd.js","assets/Catalogue-DbEtWMLB.js","assets/CentreDeCommande-BI8fHQc1.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-rqjID2FD.js","assets/certificat-0W1VcLeS.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-TTvlJQ16.js","assets/chiffre-du-jour-pur-Ccb_bfzF.js","assets/ChiffreDesPrestations-DkjKv9zn.js","assets/Classement-1R_ZD17L.js","assets/Classement-CmpbQZDu.css","assets/classement-pur-CQOYU06l.js","assets/client-COOac7Mo.js","assets/cloture-du-jour-IMrsqs9i.js","assets/ClotureDuTiroir-C_NxQr0p.js","assets/Coffre-DT3bNf8u.js","assets/collecte-mtn-pur-BKoFYpbn.js","assets/components-CcIoYer2.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-CaoAUPUg.js","assets/Comptes-COK77WT-.js","assets/consultation-CRW6QcWf.css","assets/consultation-DVAPz58s.js","assets/Consultations-Dg2hB8IB.js","assets/Consultations-DiE-2_mG.css","assets/consultNotes-Cy5_7s16.js","assets/Conversations-D4WwB5Zo.css","assets/Conversations-o_8N11C4.js","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-Bv7X-mQ9.js","assets/currency-Cd0clE4P.js","assets/Customers-Kn8l_tgo.js","assets/Dashboard-2TSrE-wl.js","assets/Dashboard-B2x7VsE_.css","assets/dates-DXmKld9-.js","assets/Demandes-CHnM0nfB.js","assets/DepenseEnUnePhrase-BIGRlGqP.css","assets/DepenseEnUnePhrase-sjouh2U7.js","assets/Depenses-B6ddAU90.js","assets/depenses-saisie-D6V7Y1yi.js","assets/devis-remis-BYNvRxIP.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-Cyk_VN7q.js","assets/diagnostics-au-trone-BDVb89CA.js","assets/Dictee-C-pUYYFA.css","assets/Dictee-jshq1bpb.js","assets/dictee-pur-UiSwrReK.js","assets/Discussions-CvGrUsQp.js","assets/echappe-html-pur-gEhHOM07.js","assets/EditeurDesOffres-CSDsc84t.js","assets/Encaissements-BeBt-NN8.js","assets/enfants-jTDHTdmy.js","assets/Engagements-Cj5S9MhG.css","assets/Engagements-CKgMcAsM.js","assets/engagements-coffre-DZeqnGsZ.js","assets/EntreDeuxSeances-iK1mqn93.js","assets/es-BFBJev_6.js","assets/Evaluation-Cy-dId_h.js","assets/facture-CvYJLENG.js","assets/Factures-BlI3stnE.js","assets/FenetreDeLAgent-wiLB9ZWM.js","assets/FenetreDesCivilites-DVC5RdAZ.js","assets/FenetreDesCivilites-zfNk1aak.css","assets/FenetreDuPoint-DJASCruj.js","assets/Fil-DLV5abDB.js","assets/finances-C8x7Mn4-.css","assets/fon-DxhDAG7q.js","assets/Fournisseurs-Ch-YVHOX.js","assets/fournisseurs-DDwtkA1B.js","assets/foyer-Drz2jhgj.js","assets/Gerard-B9cauDuH.js","assets/gerard-donnees-CgMxunYa.js","assets/Gerard-vo2IWvP3.css","assets/gestes-conversation-C7djrGI5.js","assets/heures-des-rappels-pur-BWJPB8OP.js","assets/HomeRituals-DFLud510.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-osJnvA0y.js","assets/ia-centre-XGZ2urO_.js","assets/ia-diagnostic-pur-qGnFEvys.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-tableau-pur-p6UvREJe.js","assets/identite-C6PaNvsT.js","assets/index.es-C8vWs_Yz.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-GsMOMoqH.js","assets/jspdf.es.min-Bot5oGVP.js","assets/JustePrix-dr82pyq0.js","assets/kkiapay-DFkxQYxP.js","assets/kkiapay-widget-CVmsl9OE.js","assets/Laboratoire-rka2_MIs.js","assets/LaJournee-Bn_G0HCt.css","assets/LaJournee-B_HNj0Cl.js","assets/le-caissier-pur-Q7l32SHo.js","assets/LesPaiements-C9cEZlne.css","assets/LesPaiements-eV6JCg3X.js","assets/LettresAuDossier-CBMPiTqR.js","assets/LienMndPay-Cnyyakzf.js","assets/Marketing-JtA0Hv-p.js","assets/MarketingBranche-Cf8noIWE.js","assets/Marque-RczRtBgI.js","assets/MesPourboires-CENjelyb.css","assets/MesPourboires-zA0Syyif.js","assets/MesTaches-Cc4XUDf6.css","assets/MesTaches-Fc_T9wBz.js","assets/momo-C2ZVfV9J.js","assets/MonMois-Buol1j51.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/MtnMoMo-Odl6cnVb.js","assets/objectifs-DD5fQzoo.js","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/opale-JIZ5bjKt.js","assets/oreille-B1AMUmZh.js","assets/paie-du-5-CFnnJVqF.js","assets/paie-du-5-DeJq-K_U.css","assets/paie-du-5-pur-CPiCK8fv.js","assets/paie-par-mtn-uBK1JUxm.js","assets/PaieParMtn-Be_y1W61.js","assets/paliers-DiiLg7El.js","assets/Parametres-D7fCQx6Z.js","assets/parcours-Djhfm_E9.js","assets/Parrainages-CiKTT0Bg.js","assets/Parrainages-gAHAPB_6.css","assets/PassageAvantLeFauteuil-C4AOB0df.js","assets/pdf-D3KFE2xT.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/periode-des-pourboires-pur-BUWqfwov.js","assets/Personas-DG49HDJJ.js","assets/Personnel-DQu1wrNw.js","assets/photo-BChu8RMD.js","assets/pilotage-D8kf1Co8.css","assets/porte-de-l-equipe-BnBuFdcX.js","assets/Pourboires-mjjpkHmx.js","assets/Predictions-DpiBuyws.js","assets/preload-helper-BRe_O-Rg.js","assets/Prestataires-C1kwPFE4.js","assets/Prets-BK9leFcp.js","assets/PrevisionDuMois-C7RBIQ9J.js","assets/PrevisionDuMois-DlFTw3OX.css","assets/Previsions-9BU2Vg1T.css","assets/Previsions-Buhz7flN.js","assets/previsions-pur-Bpxvh3ab.js","assets/processus-pur-R6U5QcCi.js","assets/projets-CcgpH21W.js","assets/Projets-COO7WDEE.css","assets/Projets-DXeADnkw.js","assets/projets-pur-2ZEMRNDU.js","assets/protocoles-DQj6MMBb.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-KIRCRtQa.js","assets/quiz-5qMPWZVi.js","assets/Rapport-DQya8W3J.js","assets/Recommandations-Bx-RFvws.js","assets/regler-BWVB1Toj.js","assets/regler-DHR_B1Dm.css","assets/regler-par-fedapay-pur-DYTDdXhs.js","assets/relances-pur-BacTXlI2.js","assets/releve-des-avis-4sFAZlNf.js","assets/SalonFoyer-BkDzzpvf.js","assets/secretariat-admin-DQTmQuik.js","assets/Secretariat-Cy79Zw30.css","assets/Secretariat-DZ_A0mOz.js","assets/Signatures-PYfE_OvR.js","assets/SignerUnPdf-12kynIsX.js","assets/Synthese-CCMasUNI.js","assets/SyntheseGraphes-D4PitkG3.js","assets/systeme-TPy-pF7j.css","assets/Tableau-BBWkhh7W.js","assets/temps-DaVP056v.js","assets/Textes-BOpzzNRS.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-CkDzpGy0.css","assets/tiroirs-CRQwAKjh.js","assets/trone-CxAyC50G.js","assets/trone-Dqek9O2C.css","assets/useAudiences-BxmwYPtb.js","assets/useClotureDuJour-DwrmmxrF.js","assets/visios-CY4lLKxh.js","assets/Vitrine-BWilTqQJ.css","assets/Vitrine-CftX1ZEv.js","assets/_admin-OjGr2ykv.js","assets/_contrat-BSL5n2ec.js","assets/_reuni-IIJHERfJ.js","assets/_shared-D-hJz18j.js","assets/_signature-Bnd4bJpR.js","assets/_ui-BrUDlmuM.css","assets/_ui-D1TI-v3a.js"];
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
