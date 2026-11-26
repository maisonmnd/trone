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
const BUILD = "20261126002727";
const A_GARDER = ["./","assets/abonnements-CfzucXSP.js","assets/Abonnements-CMjcjK7v.js","assets/Abonnements-DTY7p2DH.css","assets/Academie-CkWaMeuW.js","assets/Acces-BImBTybX.js","assets/afaire-0jNeW3Na.js","assets/AFaire-dgFmZaoL.js","assets/agents-donnees-gf_3OIT7.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Agents-WP4mmsqN.js","assets/Analytics-CUFsApdD.js","assets/App-ikiBaxue.js","assets/Appels-utMP9_dR.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/Assistants-D9i2Xwmg.css","assets/Assistants-XQywArcm.js","assets/AtelierDesContenus-CHD9BrDr.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/Audience-CwhUEdDk.js","assets/Aujourdhui-B18ANowO.js","assets/auth-w2-pyo68.js","assets/avant-le-fauteuil-lecture-B172URxf.js","assets/AvantLeFauteuil-C_ECVnQ2.js","assets/avis-fiches-56wWWiOn.js","assets/avis-google-pont-CST03BeG.js","assets/AvisGoogle-CI-4UxG5.js","assets/AvisGoogle-DaPXfwX9.css","assets/BadgeEssai-OwqLsYRt.js","assets/BadgeSuggere-DYFzJgSu.js","assets/besoins-DB7y7p0-.js","assets/BesoinsEtRegles-BLwxGVV5.css","assets/BesoinsEtRegles-hOb3Mqqt.js","assets/bilan-B-bfPYR0.css","assets/bilan-DN9jgAad.js","assets/BilanMensuel-pXBaub0G.js","assets/Branches-BSfYuBO1.js","assets/bridges-pE0nBAs8.js","assets/caisse-du-soir-C6vPx-E_.css","assets/caisse-du-soir-DsL_jizZ.js","assets/Caisse-DVIzVcJt.js","assets/caisse-fluide-pur-CWyjiPxK.js","assets/Caisses-BPTt8ubZ.js","assets/Calendrier-yLqqkRxM.js","assets/campagnes-pur-DfsMS8ix.js","assets/Carnet-BX1WJseH.js","assets/carte-DWiEY9G7.js","assets/carte-_W_-xBPj.css","assets/CarteModal-DUN6irTa.js","assets/CartesCadeaux-drz6laWo.js","assets/Catalogue-Bjd3jeVR.js","assets/CentreDeCommande-C_pbxOrY.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-4FwlObvP.js","assets/certificat-DtZKMZxH.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-Db06TejN.js","assets/chiffre-du-jour-pur-DoCS5QFw.js","assets/ChiffreDesPrestations-C2lRAJWs.js","assets/classement-aX5EBUV7.js","assets/classement-pur-DgNYRo7t.js","assets/Classement-T9x-HPwd.css","assets/Classement-YR65Vtra.js","assets/client-CqH4TqM9.js","assets/cloture-du-jour-CCVAWU8l.js","assets/ClotureDuTiroir-ZwkmOtA5.js","assets/Coffre-DwwqNXhN.js","assets/components-CUJSUMQm.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-q19W6Lec.js","assets/Comptes-zYtj6zep.js","assets/consultation-1TqerAae.js","assets/consultation-CRW6QcWf.css","assets/Consultations-0bkl3wj8.js","assets/Consultations-DiE-2_mG.css","assets/consultNotes-DiTA70p4.js","assets/contexte-de-la-reponse-CR3Ifjuy.js","assets/Conversations-C8os2Kdz.js","assets/Conversations-D4WwB5Zo.css","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-GXMGz5XO.js","assets/currency-Cd0clE4P.js","assets/Customers-BhFsGOwm.js","assets/Dashboard-D9jnTaFp.css","assets/Dashboard-Dt6SJM0m.js","assets/dates-DkWmupHS.js","assets/DemanderAPerle-BD5NgCRN.css","assets/DemanderAPerle-CsmfPoXw.js","assets/Demandes-DmuFayzC.js","assets/DepenseEnUnePhrase-BIGRlGqP.css","assets/DepenseEnUnePhrase-DmrnISTw.js","assets/Depenses-BdffvZvy.js","assets/depenses-saisie-CO_RXMig.js","assets/devis-B6G7AkSd.js","assets/devis-CdIRAvZk.css","assets/devis-remis-DuXwNjl1.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-sFblgXMM.js","assets/diagnostics-au-trone-2g-l8YHU.js","assets/Dictee-C-pUYYFA.css","assets/Dictee-DjFdtQhr.js","assets/dictee-pur-BJZC-js6.js","assets/Discussions-Czw0OJtA.js","assets/dist-9vv0te18.js","assets/echappe-html-pur-gEhHOM07.js","assets/EditeurDesOffres-CnQZUQoq.js","assets/Encaissements-Bk-BXZgz.js","assets/EnDirect-DlSy5G21.js","assets/enfants-C95X97i3.js","assets/Engagements-BARxlYQo.js","assets/Engagements-Cj5S9MhG.css","assets/engagements-coffre-BVeAVf9R.js","assets/EntreDeuxSeances-Dn6kBSD1.js","assets/es-CgUNGKwh.js","assets/etoiles-pur-CgRPMSHm.js","assets/Evaluation-DjLEL3sN.js","assets/facture-HKC2NmKR.js","assets/Factures-DjwMHymM.js","assets/FenetreDeLAgent-DxSOHFXC.js","assets/FenetreDesCivilites-m8dbjMmV.js","assets/FenetreDesCivilites-zfNk1aak.css","assets/FenetreDuPoint-QhFGbyuV.js","assets/Fil-DM5KJeqL.js","assets/finances-C8x7Mn4-.css","assets/fon-DfcubSV7.js","assets/Fournisseurs-DFq7M7Ic.js","assets/fournisseurs-vIcM8Rdd.js","assets/foyer-CC_WlmhB.js","assets/gerard-donnees-Hk71L6vs.js","assets/Gerard-lGKehvgG.css","assets/Gerard-Y_oHEX7k.js","assets/gestes-conversation-CWRS6FKD.js","assets/heures-des-rappels-pur-BWJPB8OP.js","assets/HomeRituals-peILL3DG.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-Dp7eYe5J.js","assets/ia-centre-i8nS_6Fu.js","assets/ia-diagnostic-pur-qGnFEvys.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-tableau-pur-p6UvREJe.js","assets/identite-s5pr_qwR.js","assets/index.es-CtH8Uk10.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-CxTPNUkN.js","assets/jspdf.es.min-Dh6NMiDf.js","assets/JustePrix-D8tTk3iU.js","assets/kkiapay-C212BEZc.js","assets/kkiapay-widget-CaHBoBVm.js","assets/Laboratoire-Dl1J1jgy.js","assets/LaJournee-Bn_G0HCt.css","assets/LaJournee-D_WY7gJ5.js","assets/le-caissier-pur-D2a06dmR.js","assets/le-sceau-pur-Dv-IZ_M2.js","assets/LePoint-Biwo2IbS.js","assets/LePoint-B_HurXA0.css","assets/LesPaiements-C9cEZlne.css","assets/LesPaiements-D5QX0MC5.js","assets/LettresAuDossier-CiOBage5.js","assets/LienMndPay-BMPDDBHp.js","assets/Marketing-DQq800zh.js","assets/MarketingBranche-DCvEf8jE.js","assets/Marque-8QRjFBSF.js","assets/MesPourboires-CENjelyb.css","assets/MesPourboires-DIhpeph_.js","assets/MesTaches-Cc4XUDf6.css","assets/MesTaches-D4vBC2sa.js","assets/mnd-pay-pur-CfS2mkAo.js","assets/momo-C2ZVfV9J.js","assets/MonMois-CxRXlkx6.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/MtnMoMo-DvHvOlUo.js","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/objectifs-Dfnditcp.js","assets/opale-BEuoELgK.js","assets/oreille-B1AMUmZh.js","assets/paie-du-5-BPUqtmPa.js","assets/paie-du-5-DeJq-K_U.css","assets/paie-du-5-pur-CPiCK8fv.js","assets/paie-par-mtn-DdW4LZrG.js","assets/PaieParMtn-DwJSQ4e8.js","assets/paliers-DbMwmSg_.js","assets/Parametres-DAScBCDC.js","assets/parcours-DbMzP12i.js","assets/Parrainages-CBWHWWf8.js","assets/Parrainages-gAHAPB_6.css","assets/PassageAvantLeFauteuil-fOEfmuVM.js","assets/pdf-DQR59SOL.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/periode-des-pourboires-pur-BUWqfwov.js","assets/Personas-BtD0iqkm.js","assets/Personnel-BCyyp6Bq.js","assets/photo-BsLN8D8J.js","assets/pilotage-D8kf1Co8.css","assets/porte-de-l-equipe-D_ACwdRr.js","assets/Pourboires-CXuP_r_0.js","assets/Predictions-DJgcSQfr.js","assets/preload-helper-BRe_O-Rg.js","assets/Prestataires-CAyz0jc5.js","assets/Prets-BL-zM5cG.js","assets/PrevisionDuMois-D3TjroES.js","assets/PrevisionDuMois-DlFTw3OX.css","assets/Previsions-9BU2Vg1T.css","assets/Previsions-BjcLnhm2.js","assets/previsions-pur-BtLPYaZw.js","assets/processus-pur-R6U5QcCi.js","assets/projets-9s6AH1NR.js","assets/Projets-COO7WDEE.css","assets/Projets-D5RVU8W3.js","assets/projets-pur-2ZEMRNDU.js","assets/protocoles-DNRQP-uN.js","assets/purify.es-BwoZCkIS.js","assets/qr-DAp0t1M_.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-CMMTTrXR.js","assets/quiz-5qMPWZVi.js","assets/Rapport-BSN-pNUH.js","assets/Recommandations-Fsm3sK1B.js","assets/regler-D1gFEaVz.css","assets/regler-ETse6qqf.js","assets/regler-par-fedapay-pur-DP7zXAs5.js","assets/relances-pur-C9iUwl2e.js","assets/releve-des-avis-BlUZSrE2.js","assets/SalonFoyer-CrIR5mqs.js","assets/sceau-C11OHQ7f.js","assets/secretariat-admin-8QG6YRze.js","assets/Secretariat-Cy79Zw30.css","assets/Secretariat-D39EKfIA.js","assets/Signatures--yv5Am2M.js","assets/SignerUnPdf-DJ3iXzHN.js","assets/Synthese-DoCuBmsF.js","assets/SyntheseGraphes-DfxOzUPN.js","assets/systeme-TPy-pF7j.css","assets/Tableau-CdqY2nwo.js","assets/temps-DQFWiMIA.js","assets/Textes-DLpOzRbT.css","assets/Textes-jqYl_SHf.js","assets/tiroirs-CkDzpGy0.css","assets/tiroirs-DmqJAZ9t.js","assets/tpe-CkdX_Ont.css","assets/tpe-Ddoaly2w.js","assets/tpe-de-poche-pur-BApx0DbM.js","assets/TpeDePoche-DrV8_9_Y.js","assets/trone-C3eufNNq.css","assets/trone-wO-ZG6y1.js","assets/useAudiences-B4VBgcjT.js","assets/useClotureDuJour-EGiQH6uY.js","assets/visios-CHeA3uYT.js","assets/Vitrine-5-d0rX8k.js","assets/Vitrine-BWilTqQJ.css","assets/_admin-C_xA7lUO.js","assets/_contrat-DvIPXWBV.js","assets/_reuni-D4cPj25B.js","assets/_shared-IZH78OR1.js","assets/_signature-fAIGYopj.js","assets/_ui-BrUDlmuM.css","assets/_ui-CPUQx-E0.js"];
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
