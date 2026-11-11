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
const BUILD = "20261111175844";
const A_GARDER = ["./","assets/abonnements-BUJmvsoB.js","assets/Abonnements-Cg4caksV.js","assets/Abonnements-DTY7p2DH.css","assets/Academie-097FE8Qn.js","assets/Acces-BxqWXLwx.js","assets/AFaire-BzTem6qT.js","assets/afaire-CXGMSomj.js","assets/agents-donnees-XwNAGxyF.js","assets/Agents-EoZD3aSa.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-YqLMTd7T.js","assets/Appels-DIdf5YLm.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/Assistants-D9i2Xwmg.css","assets/Assistants-DLQ3P7ps.js","assets/AtelierDesContenus-Bj4X7Jqj.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/Audience-BqJLO2nS.js","assets/Aujourdhui-BHT-T0KU.js","assets/avant-le-fauteuil-lecture-yWz0ntUX.js","assets/AvantLeFauteuil-DA9ud5E2.js","assets/avis-fiches-Dzzxvjea.js","assets/AvisGoogle-BUZFfabS.js","assets/AvisGoogle-DaPXfwX9.css","assets/BadgeEssai-D9f4PP3l.js","assets/bilan-9KAFi3V0.js","assets/bilan-B-bfPYR0.css","assets/BilanMensuel-MGq5chsM.js","assets/Branches-B3UWmT3C.js","assets/bridges-C0sBsmSW.js","assets/Caisse-B4zfjRbx.js","assets/caisse-du-soir-C6vPx-E_.css","assets/caisse-du-soir-CjXro24z.js","assets/Caisses-DNcC-vcw.js","assets/Calendrier-CXZqRZgx.js","assets/campagnes-pur-D2xwmnHu.js","assets/Carnet-D2Lalz2J.js","assets/carte-FBmq0Unc.js","assets/carte-_W_-xBPj.css","assets/CarteModal-D9XSPNU9.js","assets/CartesCadeaux-CkWOvZct.js","assets/Catalogue-D0Ig_W-q.js","assets/CentreDeCommande-BS07kdQr.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-BaHGnL17.js","assets/certificat-BquX3Vhr.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-CGx5Mhkm.js","assets/chiffre-du-jour-pur-DTuBIS_B.js","assets/ChiffreDesPrestations-o7NwsfPF.js","assets/client-_aTaYinq.js","assets/cloture-du-jour-CQEr7mdK.js","assets/ClotureDuTiroir-v-I4laA-.js","assets/Coffre-BW6V4Szu.js","assets/components-CzwlGj_U.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-fgFvIOUT.js","assets/Comptes-CKZVBCkg.js","assets/consultation-4sqkpmi6.js","assets/consultation-CRW6QcWf.css","assets/Consultations-DsE0F1Fr.js","assets/consultNotes-Cak6F5fK.js","assets/Conversations-B69BlXO5.js","assets/Conversations-D4WwB5Zo.css","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-B7qhbqiG.js","assets/currency-qfIhGmrs.js","assets/Customers-DmSLvZsO.js","assets/Dashboard-B2x7VsE_.css","assets/Dashboard-BVysWswm.js","assets/dates-CjnLUdtL.js","assets/Demandes-DAJc6M75.js","assets/DepenseEnUnePhrase-BIGRlGqP.css","assets/DepenseEnUnePhrase-BPxcCfIu.js","assets/Depenses-C5IA0XLy.js","assets/depenses-saisie-Dvb8Ei_A.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-DBMrNNPL.js","assets/diagnostics-au-trone-BdVkijWp.js","assets/Dictee-BpfgyVJe.js","assets/Dictee-D2P9yM7v.css","assets/dictee-pur-CpZuX2B6.js","assets/Discussions-BIig7cZy.js","assets/EditeurDesOffres-DIG03VRq.js","assets/Encaissements-BvC6hfWG.js","assets/enfants-CALSJqOO.js","assets/Engagements-BOyKgxgX.js","assets/Engagements-Cj5S9MhG.css","assets/engagements-coffre-CKtcznPB.js","assets/EntreDeuxSeances-YySIeJFJ.js","assets/Evaluation-D1zuFQzH.js","assets/Factures-CILCLNr2.js","assets/FenetreDesCivilites-DVdb4ZgF.js","assets/FenetreDesCivilites-zfNk1aak.css","assets/FenetreDuPoint-CiNRcYvr.js","assets/Fil-DBspZGN_.js","assets/finances-BMFnlkRx.css","assets/fon-CuyzwFOk.js","assets/Fournisseurs-bmip-xjN.js","assets/fournisseurs-iNyWdt3q.js","assets/foyer-CEqe7n6U.js","assets/Gerard-BP0v0mYb.js","assets/Gerard-Cgj-zsJh.css","assets/gerard-donnees-BGCDgIvs.js","assets/gestes-conversation-CiJBArFV.js","assets/heures-des-rappels-pur-Dig9pZpo.js","assets/HomeRituals-CIIAnTTO.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-C0XVSZmY.js","assets/ia-centre-CslPaS0B.js","assets/ia-diagnostic-pur-BBLrGY5l.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-tableau-pur-p6UvREJe.js","assets/identite-ByZhnTNK.js","assets/index-FJ8H3QTt.js","assets/index.es-DXbyaMyf.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-DHOUGGSo.js","assets/jspdf.es.min-CNKOtX6v.js","assets/JustePrix-B8NSEEUj.js","assets/kkiapay-CgdiQDjN.js","assets/kkiapay-widget-DnUhUNd4.js","assets/Laboratoire-Do3Vg2-p.js","assets/LaJournee-B97voEa8.js","assets/LaJournee-Bn_G0HCt.css","assets/LesPaiements-C9cEZlne.css","assets/LesPaiements-CE-JRzYF.js","assets/LettresAuDossier-BOToESAG.js","assets/LienMndPay-DZ9abj9q.js","assets/Marketing-FNOt_MxY.js","assets/MarketingBranche-CZ-tEtnf.js","assets/Marque-DSjv6jgE.js","assets/MesPourboires-CENjelyb.css","assets/MesPourboires-ujfkGLYy.js","assets/MesTaches-C0F52Ko5.js","assets/MesTaches-Cc4XUDf6.css","assets/momo-C2ZVfV9J.js","assets/MonMois-DdSGcauh.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-CYE2tSC7.js","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/opale-D_h1bryc.js","assets/oreille-B1AMUmZh.js","assets/paie-du-5-DeJq-K_U.css","assets/paie-du-5-nJOmb59n.js","assets/paie-du-5-pur-DhfqQiFO.js","assets/PaieParMtn-BvfKPSHz.js","assets/paliers-Bi8fICbB.js","assets/Parametres-DWnq_elq.js","assets/parcours-BVhJdVUR.js","assets/Parrainages-C5lXxxQk.js","assets/Parrainages-gAHAPB_6.css","assets/PassageAvantLeFauteuil-fPLJ7LhO.js","assets/pdf-4eYRy4hf.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/periode-des-pourboires-pur-BUWqfwov.js","assets/Personas-wtca5MNb.js","assets/Personnel-BmdCUWXg.js","assets/photo-BJHo2O5x.js","assets/pilotage-D8kf1Co8.css","assets/Pourboires-UlIFQNjh.js","assets/Predictions-CKxMTjhe.js","assets/Prestataires-CBLo-yfc.js","assets/Prets-BL4ksWyw.js","assets/PrevisionDuMois-D08asioP.js","assets/PrevisionDuMois-DlFTw3OX.css","assets/Previsions-9BU2Vg1T.css","assets/Previsions-CyyvKYEH.js","assets/previsions-pur-Dcw3IAxt.js","assets/processus-pur-R6U5QcCi.js","assets/projets-1ME547YA.js","assets/Projets-BZ0r9bg6.js","assets/Projets-COO7WDEE.css","assets/projets-pur-2ZEMRNDU.js","assets/protocoles-DOiIYvVD.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-bOh8FR-Q.js","assets/qualification-CQ8l513p.js","assets/quiz-5qMPWZVi.js","assets/Rapport-DejPKWMI.js","assets/Recommandations-BfHrGfxx.js","assets/regler-C5hcM02_.css","assets/regler-D9ojq5Mt.js","assets/regler-la-seance-serveur-Bs6rzqZX.js","assets/relances-pur-BacTXlI2.js","assets/releve-des-avis-CfN8VFts.js","assets/SalonFoyer-BC11sidI.js","assets/secretariat-admin-CmcNfcOZ.js","assets/Secretariat-Cy79Zw30.css","assets/Secretariat-jNq2FIu7.js","assets/Signatures-Bxs5W4nx.js","assets/SignerUnPdf-UBve7Hza.js","assets/Synthese-MV_IiwcQ.js","assets/SyntheseGraphes-BT2anaNT.js","assets/systeme-TPy-pF7j.css","assets/Tableau-DysXVabh.js","assets/temps-hP3x2hkT.js","assets/Textes--h211rXA.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-CkDzpGy0.css","assets/tiroirs-Dw1AF2Ak.js","assets/trone-DjlNvFFs.js","assets/trone-wE0OFAgL.css","assets/useAudiences-CeIcYhD1.js","assets/useClotureDuJour-DxWvzNCq.js","assets/Vitrine-BWilTqQJ.css","assets/Vitrine-CF17kCxQ.js","assets/_admin-Bhz0CxA_.js","assets/_contrat-DpSfHNeN.js","assets/_reuni-CfwgxGoF.js","assets/_shared-EYUMWCFg.js","assets/_signature-JYRtNINE.js","assets/_ui-BrUDlmuM.css","assets/_ui-CNdBAWJb.js"];
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
