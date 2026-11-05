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
const BUILD = "20261105103814";
const A_GARDER = ["./","assets/abonnements-CmjSkoBf.js","assets/Abonnements-D5IyT7eK.js","assets/Academie-BNW3vw7j.js","assets/Acces-CZdFOxoF.js","assets/AFaire-ChYklXsi.js","assets/afaire-CpA6uUa5.js","assets/Agents-BYydeLas.js","assets/agents-donnees-FdBumhKQ.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-fVhl9176.js","assets/Appels-BtVjYA78.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/Assistants-BOcxTwZO.css","assets/Assistants-DLI5EIKN.js","assets/AtelierDesContenus-Bo7NRVOX.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/Audience-Cn9f0yHY.js","assets/Aujourdhui-Qmmj43PC.js","assets/avant-le-fauteuil-lecture-Bkkhr5V5.js","assets/AvantLeFauteuil-FqhgVG9P.js","assets/avis-fiches-DeuU3dOK.js","assets/AvisGoogle-DaPXfwX9.css","assets/AvisGoogle-DQaCNA4l.js","assets/bilan-B-bfPYR0.css","assets/bilan-DfqepVx1.js","assets/BilanMensuel-C56x9k20.js","assets/Branches-CXXmzdFS.js","assets/bridges-CMwoL2N2.js","assets/Caisse-BAhyWIvZ.js","assets/caisse-du-soir-CjJmsFim.js","assets/Caisses-Db13Ckeg.js","assets/Calendrier-DwCY_MGY.js","assets/campagnes-pur-DfJInMV5.js","assets/Carnet-BeF1q9nr.js","assets/carte-DchsjB9t.js","assets/carte-_W_-xBPj.css","assets/CarteModal-CgOt60Rd.js","assets/CartesCadeaux-AIxLmZ9O.js","assets/Catalogue-BmM9gcGw.js","assets/CentreDeCommande-Du8kyJhp.css","assets/CentreDeCommande-xMC8_0b_.js","assets/Cercle-Bxma_6O5.js","assets/certificat-BNW1ap4H.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-jj15cVff.js","assets/chiffre-du-jour-pur-D7u1BiP8.js","assets/ChiffreDesPrestations-CKpDUskd.js","assets/client-Dg4xz1wx.js","assets/cloture-du-jour-N44aMd0J.js","assets/ClotureDuTiroir-C6vPx-E_.css","assets/ClotureDuTiroir-dKO2JNHO.js","assets/Coffre-CRHUzsgU.js","assets/components-CFRTYDQM.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-pUT84rNK.js","assets/Comptes-DsxnX5Z2.js","assets/consultation-BaLKmDvP.js","assets/consultation-CRW6QcWf.css","assets/Consultations-93mntvR_.js","assets/consultNotes-DtZz4YeL.js","assets/Conversations-D4WwB5Zo.css","assets/Conversations-EYyWjmO2.js","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-CP920HY9.js","assets/currency-qfIhGmrs.js","assets/Customers-CIzXddXj.js","assets/Dashboard-B2x7VsE_.css","assets/Dashboard-BpdkOZaG.js","assets/dates-CmtxF31Y.js","assets/Demandes-DlMGvfGk.js","assets/DepenseEnUnePhrase-BIGRlGqP.css","assets/DepenseEnUnePhrase-mZcm3P5R.js","assets/Depenses-CZ7xzoo1.js","assets/depenses-saisie-Cj7E0JJZ.js","assets/dernier-message-pur-CBYWnq8m.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-CXy3o_C6.js","assets/diagnostics-au-trone-C0AIrNmK.js","assets/Dictee-CbSh1pnx.js","assets/Dictee-D2P9yM7v.css","assets/dictee-pur-OiX01zAL.js","assets/Discussions-BF79SNjV.js","assets/EditeurDesOffres-C7RbNPWx.js","assets/Encaissements-C58gqMfR.js","assets/enfants-D10cwdUn.js","assets/Engagements-Cj5S9MhG.css","assets/Engagements-YfN64gxy.js","assets/EntreDeuxSeances-S18XZ2Bz.js","assets/Evaluation-DPLlvlOJ.js","assets/FacturePrestataire-Cp6___eC.js","assets/Factures-BI8kN5hE.js","assets/FenetreDesCivilites-DpPrPF3h.js","assets/FenetreDesCivilites-zfNk1aak.css","assets/FenetreDuPoint-BSZ4iX_4.js","assets/Fil-Cfo0w5bM.js","assets/finances-BMFnlkRx.css","assets/fon-DsB4VCs5.js","assets/Fournisseurs-Bqj4VObv.js","assets/fournisseurs-CvKTx9ZY.js","assets/foyer-dbZJEoaR.js","assets/Gerard-CP3QOjfk.css","assets/Gerard-DHaSSyG-.js","assets/gerard-donnees-B-_HN14e.js","assets/gestes-conversation-sshSW5ew.js","assets/HomeRituals-B4cwiXmH.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-ByWcHacY.js","assets/ia-centre-XCMlbrHG.js","assets/ia-diagnostic-pur-BBLrGY5l.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-tableau-pur-CSRjGtTf.js","assets/identite-CN85kMe6.js","assets/index-uFF3uS8W.js","assets/index.es-DLa3-y4T.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-ySs948Q4.js","assets/jspdf.es.min-DLtTFfsr.js","assets/JustePrix-C0y3YhIi.js","assets/kkiapay-CMlUOUSz.js","assets/kkiapay-widget-DnUhUNd4.js","assets/Laboratoire-BS-_deyw.js","assets/LaJournee-DNg04cPb.css","assets/LaJournee-DQ8SIj81.js","assets/LettresAuDossier-yXuWC5mJ.js","assets/LienMndPay-DoEM8rKX.js","assets/Marketing-DTf292ya.js","assets/MarketingBranche-D8fjSLzk.js","assets/Marque-X-ZhY75f.js","assets/MesPourboires-D9I_9rZf.css","assets/MesPourboires-DRGK6vyR.js","assets/MesTaches-Cc4XUDf6.css","assets/MesTaches-IHRTmxVJ.js","assets/momo-C2ZVfV9J.js","assets/MonMois-BtycVP_J.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/objectifs-DQsjZaKY.js","assets/opale-C9X5qOQ4.js","assets/paliers-Baq3OywS.js","assets/Parametres-B4CxmBAg.js","assets/parcours-BTF8WOLk.js","assets/Parrainages-DHP0zs1Y.js","assets/Parrainages-gAHAPB_6.css","assets/PassageAvantLeFauteuil-CzO7a36B.js","assets/pdf-DqJqHW0v.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/Personas-DrVDSJ3V.js","assets/Personnel-Cx44Cfnp.js","assets/photo-CjUrcYOg.js","assets/pilotage-D8kf1Co8.css","assets/Pourboires-RkEifhzy.js","assets/Predictions-DSew8hkD.js","assets/Prestataires-CRsBwtEC.js","assets/Prets-T7nQ9RAB.js","assets/PrevisionDuMois-DlFTw3OX.css","assets/PrevisionDuMois-znu1fwV4.js","assets/Previsions-DRhf57_t.js","assets/previsions-pur-aV6YDqW-.js","assets/Previsions-r4v19Anp.css","assets/processus-pur-R6U5QcCi.js","assets/Projets-BxRkZpFR.js","assets/projets-CcOeRqJc.js","assets/Projets-COO7WDEE.css","assets/projets-pur-2ZEMRNDU.js","assets/protocoles-BYrvgk1D.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-BJSBk-p4.js","assets/qualification-BzbW98ym.js","assets/quiz-5qMPWZVi.js","assets/Rapport-CBGfK2Ok.js","assets/Recommandations-CVqCbje9.js","assets/regler-BC67ajqQ.js","assets/regler-C5hcM02_.css","assets/regler-la-seance-serveur-Bs6rzqZX.js","assets/relances-pur-lwRTXc5E.js","assets/releve-des-avis-Ctsq3xJ5.js","assets/SalonFoyer-jazA6GlA.js","assets/secretariat-admin-Djs-H5Py.js","assets/Secretariat-CJG1Rmq7.js","assets/Secretariat-Cy79Zw30.css","assets/Signatures-DGLfmK6C.js","assets/SignerUnPdf-s88hJIou.js","assets/Synthese-jAYyPFPc.js","assets/SyntheseGraphes-CYdZGhGi.js","assets/systeme-TPy-pF7j.css","assets/Tableau-C48c3wh3.js","assets/temps-BZ2JH6c1.js","assets/Textes-DLpOzRbT.css","assets/Textes-eEa8_DuZ.js","assets/tiroirs-CkDzpGy0.css","assets/tiroirs-DBtmuidG.js","assets/trone-DQVzvvmA.css","assets/trone-wgftAzG6.js","assets/useAudiences-C8b6hqkj.js","assets/useClotureDuJour-Cv1w_AxB.js","assets/Vitrine-BWilTqQJ.css","assets/Vitrine-C8_X3Wny.js","assets/_admin-Bife5Xd3.js","assets/_contrat-8h7g5ZGT.js","assets/_heures-BKWkgN7N.js","assets/_reuni-Dngvic2l.js","assets/_shared-lU1pvON4.js","assets/_signature-C4IMP8BG.js","assets/_ui-B9d6lQ70.js","assets/_ui-BWMA-PlM.css"];
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
