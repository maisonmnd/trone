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
const BUILD = "20261106010127";
const A_GARDER = ["./","assets/Abonnements-Da2tP3tt.js","assets/abonnements-DKkUKvHH.js","assets/Academie-BD8X_Ow1.js","assets/Acces-Bqrs54Pf.js","assets/AFaire-CDhBKsEv.js","assets/afaire-wz7Nsma-.js","assets/Agents-C7v4XEtS.js","assets/agents-donnees-BHDH0rHo.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-sORyJ2P8.js","assets/Appels-BhzRFnl7.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/Assistants-BLbJrSXT.js","assets/Assistants-D9i2Xwmg.css","assets/AtelierDesContenus-D2kMc9hF.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/Audience-BvfI3Zki.js","assets/Aujourdhui-XiJtQ5BZ.js","assets/avant-le-fauteuil-lecture-rN0azoa-.js","assets/AvantLeFauteuil-B5w5DpIB.js","assets/avis-fiches-Q6_3fCQy.js","assets/AvisGoogle-DaPXfwX9.css","assets/AvisGoogle-DkwOyV1U.js","assets/bilan-B-bfPYR0.css","assets/bilan-C3ctr8zU.js","assets/BilanMensuel-Dxi6yoZ_.js","assets/Branches-Cc6um0In.js","assets/bridges-DNhp1Ggv.js","assets/Caisse-DDeo5rkk.js","assets/caisse-du-soir-C6vPx-E_.css","assets/caisse-du-soir-CdN6PCze.js","assets/Caisses-DbiYr5J0.js","assets/Calendrier-CNVZvd5O.js","assets/campagnes-pur-DEAgIWg-.js","assets/Carnet-CyFWiKyF.js","assets/carte-06senCRo.js","assets/carte-_W_-xBPj.css","assets/CarteModal-SHWwyqO0.js","assets/CartesCadeaux-BcRyjY1q.js","assets/Catalogue-C1Nzqn0O.js","assets/CentreDeCommande-Du8kyJhp.css","assets/CentreDeCommande-oGWz1NF1.js","assets/Cercle-vivtgIGP.js","assets/certificat-DrMfbmu6.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-ClN0OR2v.js","assets/chiffre-du-jour-pur-DDTCLAQX.js","assets/ChiffreDesPrestations-BdFDJN3V.js","assets/client-ClpSsWAC.js","assets/cloture-du-jour-CKO206Aj.js","assets/ClotureDuTiroir-DIgxbvON.js","assets/Coffre-l0tw9IPA.js","assets/components-D91uUVQW.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-C8M5NCfX.js","assets/Comptes-Nyq1Cn0f.js","assets/consultation-CRW6QcWf.css","assets/consultation-DJZMs_PW.js","assets/Consultations-BOJ96_or.js","assets/consultNotes-DgN6S_qP.js","assets/Conversations-BQm4JPGP.js","assets/Conversations-D4WwB5Zo.css","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-D6v2Cu1I.js","assets/currency-qfIhGmrs.js","assets/Customers-ZIKlbizF.js","assets/Dashboard-B2x7VsE_.css","assets/Dashboard-BJsSksfk.js","assets/dates-CNk5PKxO.js","assets/Demandes-Di7HgHP8.js","assets/DepenseEnUnePhrase-BIGRlGqP.css","assets/DepenseEnUnePhrase-CmcNs2Zn.js","assets/Depenses-CdDgy6ss.js","assets/depenses-saisie-VQ_Inzq_.js","assets/dernier-message-pur-CBYWnq8m.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-CxdXFgAX.js","assets/diagnostics-au-trone-ZVBgGwlK.js","assets/Dictee-D2P9yM7v.css","assets/Dictee-D3YizDKR.js","assets/dictee-pur-DCPtrVzM.js","assets/Discussions-DOdNooPq.js","assets/EditeurDesOffres-m98k3q7F.js","assets/Encaissements-BkpLfhDa.js","assets/enfants-_Vrx3uEh.js","assets/Engagements-Cj5S9MhG.css","assets/engagements-coffre-CkDcIfTO.js","assets/Engagements-Dpmsi9Ob.js","assets/EntreDeuxSeances-DGli-hxA.js","assets/Evaluation-DyGjsKIc.js","assets/Factures-B8EO4FrD.js","assets/FenetreDesCivilites-BdVbTlNw.js","assets/FenetreDesCivilites-zfNk1aak.css","assets/FenetreDuPoint-BRfRXKDF.js","assets/Fil-BmFt_MVj.js","assets/finances-BMFnlkRx.css","assets/fon-Vi1AVsM5.js","assets/Fournisseurs-BGxyunmX.js","assets/fournisseurs-DEnuN49C.js","assets/foyer-gNCrY8tV.js","assets/Gerard-BcJyVG-D.js","assets/Gerard-CP3QOjfk.css","assets/gerard-donnees-DHpVetmW.js","assets/gestes-conversation-BBjFY8BG.js","assets/HomeRituals-7NLe-Os1.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-Dc5zY_4k.js","assets/ia-centre-E0hv7Wgb.js","assets/ia-diagnostic-pur-BBLrGY5l.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-tableau-pur-CSRjGtTf.js","assets/identite-Botwih5U.js","assets/index-Do8FKKzo.js","assets/index.es-C0vK6Jik.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-Cx-vqCmv.js","assets/jspdf.es.min-DYgyW8aF.js","assets/JustePrix-CMcjA7OF.js","assets/kkiapay-C4iAssT8.js","assets/kkiapay-widget-DnUhUNd4.js","assets/Laboratoire-B21zcDQM.js","assets/LaJournee-Bn_G0HCt.css","assets/LaJournee-RoNSErfI.js","assets/LesPaiements-BUYcfibL.js","assets/LesPaiements-BvdfOCbQ.css","assets/LettresAuDossier-HJ2FTgBo.js","assets/LienMndPay-DNFXMsv0.js","assets/Marketing-DBuTN6mn.js","assets/MarketingBranche-C9KAbjsz.js","assets/Marque-DFdmCSdT.js","assets/MesPourboires-D-5DItTm.js","assets/MesPourboires-D9I_9rZf.css","assets/MesTaches-Cc4XUDf6.css","assets/MesTaches-NGHcNVsL.js","assets/momo-C2ZVfV9J.js","assets/MonMois-1_IZ4zXb.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/objectifs-M20VLxjW.js","assets/opale-BkkSUQMO.js","assets/oreille-B1AMUmZh.js","assets/paie-du-5-C_HQfynE.js","assets/paie-du-5-DeJq-K_U.css","assets/paie-du-5-pur-BdtUK5YL.js","assets/PaieParMtn-DAEMWQwh.js","assets/paliers-LxnOzws9.js","assets/Parametres-BCIuKnoz.js","assets/parcours-BBVLBv7I.js","assets/Parrainages-BLCK-JGt.js","assets/Parrainages-gAHAPB_6.css","assets/PassageAvantLeFauteuil-CNFXJoCT.js","assets/pdf-0aFW_YiB.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/Personas-B7OtdhfC.js","assets/Personnel--Ooy0jUY.js","assets/photo-CdFiFpxn.js","assets/pilotage-D8kf1Co8.css","assets/Pourboires-B-j4gW83.js","assets/Predictions-DnXfLxSc.js","assets/Prestataires-D8ihRm_h.js","assets/Prets-DtNMJquF.js","assets/PrevisionDuMois-BfUetO9w.js","assets/PrevisionDuMois-DlFTw3OX.css","assets/Previsions-CwHZ-cqG.js","assets/previsions-pur-Cz9BFS6K.js","assets/Previsions-r4v19Anp.css","assets/processus-pur-R6U5QcCi.js","assets/Projets-COO7WDEE.css","assets/projets-DK7pqF4M.js","assets/Projets-DY4aGgmA.js","assets/projets-pur-2ZEMRNDU.js","assets/protocoles-B3Snne2v.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-DhXv6tBb.js","assets/qualification-D6YXkd2A.js","assets/quiz-5qMPWZVi.js","assets/Rapport-DeVnLIgn.js","assets/Recommandations-BOyTVz0Z.js","assets/regler-C5hcM02_.css","assets/regler-DpNuHDp0.js","assets/regler-la-seance-serveur-Bs6rzqZX.js","assets/relances-pur-lwRTXc5E.js","assets/releve-des-avis-BwAK1KDU.js","assets/SalonFoyer-PMGi--3O.js","assets/secretariat-admin-Bb836I2-.js","assets/Secretariat-Cy79Zw30.css","assets/Secretariat-DzHxlK3s.js","assets/Signatures-ev_cpZfQ.js","assets/SignerUnPdf-YcEH6_KH.js","assets/Synthese-D3xBjsmK.js","assets/SyntheseGraphes-CPx5WfLl.js","assets/systeme-TPy-pF7j.css","assets/Tableau-Dx7wMk1a.js","assets/temps-DRD_-B8F.js","assets/Textes-B64GsfOt.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-CkDzpGy0.css","assets/tiroirs-CTGCWGp-.js","assets/trone-C1bSKpAb.js","assets/trone-DQVzvvmA.css","assets/useAudiences-D3AzLZSg.js","assets/useClotureDuJour-kQtTcLHk.js","assets/Vitrine-BWilTqQJ.css","assets/Vitrine-ByQwL1oo.js","assets/_admin-nrfcNZma.js","assets/_contrat-xn-a__ht.js","assets/_heures-BlZhTtrF.js","assets/_reuni-BIWNAnVV.js","assets/_shared-CyFNFbvd.js","assets/_signature-DPOVpKuG.js","assets/_ui-BrUDlmuM.css","assets/_ui-DjmYmLRD.js"];
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
