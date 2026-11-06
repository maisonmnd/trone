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
const BUILD = "20261106001926";
const A_GARDER = ["./","assets/Abonnements-dYR0MKay.js","assets/abonnements-HAJbw3Ae.js","assets/Academie-CU25wE9n.js","assets/Acces-DRD-zpmK.js","assets/afaire-BFfU52wj.js","assets/AFaire-BSMrPUwS.js","assets/Agents-CoXAla_Z.js","assets/agents-donnees-B2dLQq2b.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics--f4TqjbT.js","assets/Appels-Dg8_IEW3.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/Assistants-CKGF-Th7.js","assets/Assistants-D9i2Xwmg.css","assets/AtelierDesContenus-D3-p6F2A.css","assets/AtelierDesContenus-wZbEXb6X.js","assets/Audience-D8pcRS-1.js","assets/Aujourdhui-VqvPkv0H.js","assets/avant-le-fauteuil-lecture-BjWPIBjd.js","assets/AvantLeFauteuil-Reye0Gye.js","assets/avis-fiches-NY8kpH6S.js","assets/AvisGoogle-B-Z7_Sa7.js","assets/AvisGoogle-DaPXfwX9.css","assets/bilan-B-bfPYR0.css","assets/bilan-cUOb97Xc.js","assets/BilanMensuel-LfGn_5kk.js","assets/Branches-DDPrTtWh.js","assets/bridges-BLcKLQ5T.js","assets/caisse-du-soir-C6vPx-E_.css","assets/caisse-du-soir-DbWxmaW2.js","assets/Caisse-MnXFSYsX.js","assets/Caisses-CUw6hMpA.js","assets/Calendrier-CNpKYBQO.js","assets/campagnes-pur-BN9-s1-2.js","assets/Carnet-DypfVYpM.js","assets/carte-BWlZ1MvC.js","assets/carte-_W_-xBPj.css","assets/CarteModal-CW6-fWJT.js","assets/CartesCadeaux-CzrcM1Vp.js","assets/Catalogue-DWCINoPJ.js","assets/CentreDeCommande-CrHW5cFl.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-zjFQ8950.js","assets/certificat-CknHxhFN.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-CPKrzInV.js","assets/chiffre-du-jour-pur-Cld9FrY2.js","assets/ChiffreDesPrestations-p6SC4MT5.js","assets/client-B7aP17fk.js","assets/cloture-du-jour-xozWGRQq.js","assets/ClotureDuTiroir-BdOwSztx.js","assets/Coffre-adnDWQJ0.js","assets/components-ClKVPdF5.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-BOBHxs0-.js","assets/Comptes-B5UCiYzw.js","assets/consultation-BfhaasF-.js","assets/consultation-CRW6QcWf.css","assets/Consultations-YmdwvLPo.js","assets/consultNotes-BuhuT8fx.js","assets/Conversations-BPibcUgr.js","assets/Conversations-D4WwB5Zo.css","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-03jXiuUQ.js","assets/currency-qfIhGmrs.js","assets/Customers-Cu1E8_KL.js","assets/Dashboard-B2x7VsE_.css","assets/Dashboard-CsFHCwk5.js","assets/dates-Opg6M-GI.js","assets/Demandes-DUIbPxe7.js","assets/DepenseEnUnePhrase-BIGRlGqP.css","assets/DepenseEnUnePhrase-DN7DDbUl.js","assets/Depenses-BmRkbBVS.js","assets/depenses-saisie-BCWsJR5F.js","assets/dernier-message-pur-CBYWnq8m.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-MmjGkSV_.js","assets/diagnostics-au-trone-DhrDS01d.js","assets/Dictee-D2P9yM7v.css","assets/dictee-pur-C_VMOnV3.js","assets/Dictee-xsm4geYz.js","assets/Discussions-CsmZ93Cj.js","assets/EditeurDesOffres-Dm0sbnSB.js","assets/Encaissements-dxPPZl9B.js","assets/enfants-DRxFsg2t.js","assets/Engagements-Cj5S9MhG.css","assets/Engagements-Dozo_TfL.js","assets/EntreDeuxSeances-BBUTqZmN.js","assets/Evaluation-CiADo5Xl.js","assets/Factures-Dw5AATSj.js","assets/FenetreDesCivilites-MREuUv_c.js","assets/FenetreDesCivilites-zfNk1aak.css","assets/FenetreDuPoint-Dj-w1IAd.js","assets/Fil-C7dWcK-L.js","assets/finances-BMFnlkRx.css","assets/fon-D7lmZcAo.js","assets/fournisseurs-CCWLdJfr.js","assets/Fournisseurs-DqQnZBgH.js","assets/foyer-BqSrGpg3.js","assets/Gerard-CP3QOjfk.css","assets/Gerard-CXqVVreN.js","assets/gerard-donnees-CmwfV27w.js","assets/gestes-conversation-CVtZKZn2.js","assets/HomeRituals-7oJTtSPp.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-BX2VhjAs.js","assets/ia-centre-BaR4JPNR.js","assets/ia-diagnostic-pur-BBLrGY5l.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-tableau-pur-CSRjGtTf.js","assets/identite-Xe96fIls.js","assets/index-1fIAD9bM.js","assets/index.es-D64eKEdy.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-DkU4qTRe.js","assets/jspdf.es.min-BU7atMYi.js","assets/JustePrix-DS2lziF5.js","assets/kkiapay-jz8m_l3K.js","assets/kkiapay-widget-DnUhUNd4.js","assets/Laboratoire--OkW1yzE.js","assets/LaJournee-BfdLwnlT.js","assets/LaJournee-Bn_G0HCt.css","assets/LesPaiements-BvdfOCbQ.css","assets/LesPaiements-COzn80Cy.js","assets/LettresAuDossier-CrRT87i_.js","assets/LienMndPay-CCz7guX9.js","assets/Marketing-BeiNB1Tk.js","assets/MarketingBranche-DdKTkAsP.js","assets/Marque-C8MaWsPg.js","assets/MesPourboires-CCKRMunf.js","assets/MesPourboires-D9I_9rZf.css","assets/MesTaches-C1A-MQKo.js","assets/MesTaches-Cc4XUDf6.css","assets/momo-C2ZVfV9J.js","assets/MonMois-CXbzk9Zb.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/objectifs-URQLUCrX.js","assets/opale-CsUDlsFb.js","assets/oreille-B1AMUmZh.js","assets/paie-du-5-DC_FpTR9.js","assets/paie-du-5-DeJq-K_U.css","assets/paie-du-5-pur-tBiIIBl3.js","assets/PaieParMtn-BEF9F57R.js","assets/paliers-C-YheDTn.js","assets/Parametres-Bjsy_gxS.js","assets/parcours-Dvg1IT7e.js","assets/Parrainages-E2YiS3zO.js","assets/Parrainages-gAHAPB_6.css","assets/PassageAvantLeFauteuil-CrC7ERo8.js","assets/pdf-DS3u_rKB.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/Personas-4C-15vKX.js","assets/Personnel-Dk-gP5L3.js","assets/photo-BZoKwVNC.js","assets/pilotage-D8kf1Co8.css","assets/Pourboires-BbmwYUP2.js","assets/Predictions-A5PiL6X1.js","assets/Prestataires-CzyuHwAh.js","assets/Prets-BPvAcS1S.js","assets/PrevisionDuMois-DlFTw3OX.css","assets/PrevisionDuMois-SAMcyS8B.js","assets/Previsions-DPUr_iEc.js","assets/previsions-pur-CeCB63hE.js","assets/Previsions-r4v19Anp.css","assets/processus-pur-R6U5QcCi.js","assets/projets-Bw0_OVZu.js","assets/Projets-COO7WDEE.css","assets/Projets-MEl0pZh1.js","assets/projets-pur-2ZEMRNDU.js","assets/protocoles-sc5BT4Ko.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-Ck5_h_Lb.js","assets/qualification-DOOTGayc.js","assets/quiz-5qMPWZVi.js","assets/Rapport-NYHSciuo.js","assets/Recommandations-7dzh-2Y7.js","assets/regler-C5hcM02_.css","assets/regler-D6-A8G8A.js","assets/regler-la-seance-serveur-Bs6rzqZX.js","assets/relances-pur-lwRTXc5E.js","assets/releve-des-avis-CFNgVGZ0.js","assets/SalonFoyer-CmYjDUwZ.js","assets/secretariat-admin-Lf13OnYu.js","assets/Secretariat-Cy79Zw30.css","assets/Secretariat-NBhMdmQl.js","assets/Signatures-Dz08nNh1.js","assets/SignerUnPdf-9e9Po1lm.js","assets/Synthese-DBzNjQ_9.js","assets/SyntheseGraphes-CVLAMy4C.js","assets/systeme-TPy-pF7j.css","assets/Tableau-BGgsAydH.js","assets/temps-CYqs63Y-.js","assets/Textes-BwSeexGH.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-CkDzpGy0.css","assets/tiroirs-ClqZtQDj.js","assets/trone-B3OkT0hb.js","assets/trone-DQVzvvmA.css","assets/useAudiences-DKXYWN5M.js","assets/useClotureDuJour-VexohJnI.js","assets/Vitrine-BWilTqQJ.css","assets/Vitrine-DjPIaFMA.js","assets/_admin-LHtzjDWF.js","assets/_contrat-DLzRrZL9.js","assets/_heures-C2swGRZK.js","assets/_reuni-CSp5tOo8.js","assets/_shared-dQ5wqiBB.js","assets/_signature-B7b-LZj-.js","assets/_ui-BWMA-PlM.css","assets/_ui-Cvs3Hnjf.js"];
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
