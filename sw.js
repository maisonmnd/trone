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
const BUILD = "20261107081351";
const A_GARDER = ["./","assets/Abonnements-BNOXicJP.js","assets/Abonnements-DTY7p2DH.css","assets/abonnements-DxoICuE4.js","assets/Academie-e-wrnp5p.js","assets/Acces-lbh856Rq.js","assets/AFaire-D0DsrfIn.js","assets/afaire-Dlgx661V.js","assets/agents-donnees-BibSpmU9.js","assets/Agents-Ds2riwWK.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-CT9e1LN5.js","assets/Appels-l2JL1cVJ.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/Assistants-BHmr5J5G.js","assets/Assistants-D9i2Xwmg.css","assets/AtelierDesContenus-CbAXEHcJ.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/Audience-D3gwPLab.js","assets/Aujourdhui-Diai81Bi.js","assets/avant-le-fauteuil-lecture-M68FmatX.js","assets/AvantLeFauteuil-DjXg8aSO.js","assets/avis-fiches-CY6zZuTK.js","assets/AvisGoogle-DaPXfwX9.css","assets/AvisGoogle-DOi2iyNG.js","assets/bilan-B-bfPYR0.css","assets/bilan-BCjgmfUM.js","assets/BilanMensuel-Ccv5UVMA.js","assets/Branches-CBQw6uk4.js","assets/bridges-BrFAh0Cm.js","assets/caisse-du-soir-BOGC7AGa.js","assets/caisse-du-soir-C6vPx-E_.css","assets/Caisse-POYDCWm5.js","assets/Caisses-c5F_aZRd.js","assets/Calendrier-uyLkObYK.js","assets/campagnes-pur-CsJW0O7o.js","assets/Carnet-BJ9sM5nK.js","assets/carte-BVMYA4TV.js","assets/carte-_W_-xBPj.css","assets/CarteModal-Bo3KBmbj.js","assets/CartesCadeaux-D0-SizsY.js","assets/Catalogue-DxlEIagH.js","assets/CentreDeCommande-9uVfHWPp.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-B89qI2QK.js","assets/certificat-xt-aciep.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-BWt7vtoJ.js","assets/chiffre-du-jour-pur-B_GKUAvn.js","assets/ChiffreDesPrestations-Bq5QBnc6.js","assets/client-C7DIZeTR.js","assets/cloture-du-jour-LiPhZ_Ge.js","assets/ClotureDuTiroir-BrVQGm6g.js","assets/Coffre-DFZ3OrYQ.js","assets/components-YYBXAgDl.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-tZUMJIRC.js","assets/Comptes-bNy_T8Rp.js","assets/consultation-C8YxBkSX.js","assets/consultation-CRW6QcWf.css","assets/Consultations-CcpJM5wh.js","assets/consultNotes-BOm7eIom.js","assets/Conversations-D4WwB5Zo.css","assets/Conversations-D6OM_CZO.js","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-DPgUHwre.js","assets/currency-qfIhGmrs.js","assets/Customers-Dxk1Gnes.js","assets/Dashboard-B2x7VsE_.css","assets/Dashboard-BRROJSc7.js","assets/dates-Dzu3qles.js","assets/Demandes-DQezoPrW.js","assets/DepenseEnUnePhrase-B79RtaB6.js","assets/DepenseEnUnePhrase-BIGRlGqP.css","assets/Depenses-CILD_0U5.js","assets/depenses-saisie-D1xNM7yE.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-ClfVCt3f.js","assets/diagnostics-au-trone-Cu3Edk0c.js","assets/Dictee-D2P9yM7v.css","assets/Dictee-DnMWlvjE.js","assets/dictee-pur-BHRKZCIV.js","assets/Discussions-wKonGG4Z.js","assets/EditeurDesOffres-BeUM3awn.js","assets/Encaissements-DJzUADnY.js","assets/enfants-C-U3OZlU.js","assets/Engagements-Cj5S9MhG.css","assets/engagements-coffre-B9RfIuRH.js","assets/Engagements-Zw4mogIc.js","assets/EntreDeuxSeances-Bxv67AIO.js","assets/Evaluation-j4AH33wf.js","assets/Factures-2cSdwTMf.js","assets/FenetreDesCivilites-D2BoynNL.js","assets/FenetreDesCivilites-zfNk1aak.css","assets/FenetreDuPoint-C0TeSiAG.js","assets/Fil-BusZ183n.js","assets/finances-BMFnlkRx.css","assets/fon-mak1gymb.js","assets/fournisseurs-Bu3Wn1Oz.js","assets/Fournisseurs-DFg-5XLm.js","assets/foyer-D27RGef8.js","assets/Gerard-3mUNeqc6.js","assets/Gerard-Cgj-zsJh.css","assets/gerard-donnees-DYDaVmd7.js","assets/gestes-conversation-Bb6CwQSL.js","assets/HomeRituals-ZC5OX3wG.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-EM-FL6vF.js","assets/ia-centre-D6kyy4cc.js","assets/ia-diagnostic-pur-BBLrGY5l.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-tableau-pur-CSRjGtTf.js","assets/identite-vTbS3gAT.js","assets/index-CmQuAo1_.js","assets/index.es-BM_QHaLl.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-9tQRP82x.js","assets/jspdf.es.min-B1_SoCqN.js","assets/JustePrix-vSgIfbTd.js","assets/kkiapay-DOARr0Fx.js","assets/kkiapay-widget-DnUhUNd4.js","assets/Laboratoire-CGc2UAuj.js","assets/LaJournee-Bn_G0HCt.css","assets/LaJournee-ChHoin5w.js","assets/LesPaiements-BvdfOCbQ.css","assets/LesPaiements-bWxi92eQ.js","assets/LettresAuDossier-DgL41wGf.js","assets/LienMndPay-Bv0tfoS3.js","assets/Marketing-3dXetwa3.js","assets/MarketingBranche-Z2Y08gyO.js","assets/Marque-CmLkCN0o.js","assets/MesPourboires-C-NEqLpU.js","assets/MesPourboires-D9I_9rZf.css","assets/MesTaches-Cc4XUDf6.css","assets/MesTaches-DWUIvm6u.js","assets/momo-C2ZVfV9J.js","assets/MonMois-Bqkt9A1H.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/objectifs-obV_071C.js","assets/opale-CN3ETvPW.js","assets/oreille-B1AMUmZh.js","assets/paie-du-5-CPalEGm7.js","assets/paie-du-5-DeJq-K_U.css","assets/paie-du-5-pur-CH_mMehO.js","assets/PaieParMtn-CB-sl0py.js","assets/paliers-DfkmegoC.js","assets/Parametres-DcBCq6lI.js","assets/parcours-S6ySbsuo.js","assets/Parrainages-CxS64GGS.js","assets/Parrainages-gAHAPB_6.css","assets/PassageAvantLeFauteuil-Qm_oXL6X.js","assets/pdf-DWdFkM4o.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/Personas-9M2VFFB2.js","assets/Personnel-DifbHzTL.js","assets/photo-Boiob1I1.js","assets/pilotage-D8kf1Co8.css","assets/Pourboires-BtuHzqPQ.js","assets/Predictions-PcM-dLwz.js","assets/Prestataires-BsJMEdn0.js","assets/Prets--4TsRMqO.js","assets/PrevisionDuMois-B0up-fhN.js","assets/PrevisionDuMois-DlFTw3OX.css","assets/Previsions-BaqZqcqC.js","assets/previsions-pur-Bm1if-mZ.js","assets/Previsions-r4v19Anp.css","assets/processus-pur-R6U5QcCi.js","assets/Projets-CbmIBQ1Z.js","assets/Projets-COO7WDEE.css","assets/projets-DQuN1u-K.js","assets/projets-pur-2ZEMRNDU.js","assets/protocoles-BnYqt5cR.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-eby8qXfw.js","assets/qualification-f2igDAQe.js","assets/quiz-5qMPWZVi.js","assets/Rapport-DK3lj5AT.js","assets/Recommandations-CnepvM1F.js","assets/regler-C5hcM02_.css","assets/regler-DHzC9Vuo.js","assets/regler-la-seance-serveur-Bs6rzqZX.js","assets/relances-pur-lwRTXc5E.js","assets/releve-des-avis-R8eLhg6Z.js","assets/SalonFoyer-DmgPrsXs.js","assets/secretariat-admin-D5o-6KeQ.js","assets/Secretariat-C1Rb8aMM.js","assets/Secretariat-Cy79Zw30.css","assets/Signatures-CmnSCB9K.js","assets/SignerUnPdf-DKrRxNGo.js","assets/Synthese-M06-6Faq.js","assets/SyntheseGraphes-BvUab6KM.js","assets/systeme-TPy-pF7j.css","assets/Tableau-Dagh-sew.js","assets/temps-EGGHN48q.js","assets/Textes-DLpOzRbT.css","assets/Textes-DMvK6hWt.js","assets/tiroirs-CkDzpGy0.css","assets/tiroirs-DItKlEAw.js","assets/trone-D36Wb4bM.js","assets/trone-DpJvYqTT.css","assets/useAudiences-BkAsRQZ8.js","assets/useClotureDuJour-BnOuWDgb.js","assets/Vitrine-BWilTqQJ.css","assets/Vitrine-qeuBvu1V.js","assets/_admin-BdaCJ-nP.js","assets/_contrat-Dh71E5Gu.js","assets/_heures-BgPfK5YR.js","assets/_reuni-t7MZ4b_i.js","assets/_shared-C8YPHhQC.js","assets/_signature-D1YCmaFx.js","assets/_ui-BrUDlmuM.css","assets/_ui-DQyfn_wq.js"];
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
