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
const BUILD = "20261104022122";
const A_GARDER = ["./","assets/abonnements-B0kIgODw.js","assets/Abonnements-DozkX3Ud.js","assets/Academie-DByg9KrG.js","assets/Acces-Bn-4Rjq1.js","assets/actions-BjL4azi1.js","assets/AFaire-CFZxIZyk.js","assets/afaire-DRmXSAf7.js","assets/Agents-CCVjChge.js","assets/agents-donnees-BbzH5W7l.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-B2HNqXlV.js","assets/Appels-BmwpAtYq.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/Assistants-BOcxTwZO.css","assets/Assistants-CBhhmKfV.js","assets/AtelierDesContenus-BtCOnDBp.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/AuComptoir-CCIAYkYt.js","assets/Audience-DRZGwKtQ.js","assets/Aujourdhui-BNnHzOBv.js","assets/avant-le-fauteuil-lecture-j8KvhlKG.js","assets/AvantLeFauteuil-BVldyeCy.js","assets/avis-fiches-D71vdW4v.js","assets/AvisGoogle-C296foOj.js","assets/AvisGoogle-DaPXfwX9.css","assets/bilan-B-bfPYR0.css","assets/bilan-D0KHtWH3.js","assets/BilanMensuel-Dw7knv9x.js","assets/Branches-BsTan6Tv.js","assets/bridges-1Z4FFl4s.js","assets/Caisse-DAGpxG-w.js","assets/caisse-du-soir-O_DkbqJw.js","assets/Caisses-BUx5nIxY.js","assets/Calendrier-DG7zm-IG.js","assets/campagnes-pur-6clRKOoi.js","assets/Carnet-BY3vGnDi.js","assets/carte-C8v57CtI.js","assets/carte-_W_-xBPj.css","assets/CarteModal-BvI7CSle.js","assets/CartesCadeaux-BpU_uzpF.js","assets/Catalogue-DjlUaDsp.js","assets/CentreDeCommande-BY6gZiZS.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-DJsbA9Nw.js","assets/certificat-B7oXeOb3.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-BIuMueSa.js","assets/ChiffreDesPrestations-pcNHXUw0.js","assets/client-DfRGEaDc.js","assets/ClotureDuTiroir-C6vPx-E_.css","assets/ClotureDuTiroir-CsSPnyl0.js","assets/Coffre-Dk9IcPyb.js","assets/components-DWDowrMW.js","assets/compte-courant-ByzulCEN.js","assets/compte-CzTsfnRK.js","assets/CompteCourant-B6JYjSmr.js","assets/Comptes-ChmI7BAW.js","assets/Comptoir-Clb20GAg.js","assets/consultation-CRW6QcWf.css","assets/consultation-DNQ7n6rS.js","assets/Consultations-BDovYeqY.js","assets/consultNotes-DUVjgL7E.js","assets/Conversations-CRKfxFMY.js","assets/Conversations-D4WwB5Zo.css","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-ChLCEKUX.js","assets/currency-qfIhGmrs.js","assets/Customers-FxzB3_rM.js","assets/Dashboard-Hzpjwj6-.js","assets/Dashboard-zjGteuUE.css","assets/dates-BnAZfU1a.js","assets/Demandes-tHREXnJr.js","assets/Depenses-Db9FHgEb.js","assets/depenses-saisie-DVIB3SZF.js","assets/dernier-message-pur-CBYWnq8m.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-DexCJvsD.js","assets/diagnostics-au-trone-Jb3f7AOg.js","assets/Dictee-6wYYomDM.js","assets/Dictee-D2P9yM7v.css","assets/dictee-pur-DI_FMYDT.js","assets/Discussions-CnfQhycp.js","assets/EditeurDesOffres-COt57LA_.js","assets/Encaissements-BgZag6N4.js","assets/enfants-Bj9CImnD.js","assets/Engagements-B0mEwoAi.js","assets/Engagements-Cj5S9MhG.css","assets/EntreDeuxSeances-CX4UKpt9.js","assets/equipe-B_9ZHz24.css","assets/Evaluation-B-CF4ESW.js","assets/FacturePrestataire-DtTw5jN_.js","assets/Factures-CoZ7pq_-.js","assets/FenetreDesCivilites-CdDitYvo.js","assets/FenetreDesCivilites-zfNk1aak.css","assets/FenetreDuPoint-I9yS7p_Z.js","assets/Fil-BAiQ2Pud.js","assets/finances-BMFnlkRx.css","assets/fon-DfNJErsT.js","assets/fon-pur-CgVkbJ8O.js","assets/Fournisseurs-B7iMEya1.js","assets/fournisseurs-DXMHxMlY.js","assets/foyer-BIhltrrZ.js","assets/Gerard-DHmSFzGh.js","assets/Gerard-DJzQpZkw.css","assets/gerard-donnees-DiTwb1W8.js","assets/gestes-conversation-BFeQ272D.js","assets/HomeRituals-BORNaAvk.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-CbhkfqFt.js","assets/ia-centre-CCoNGI6Z.js","assets/ia-diagnostic-pur-BBLrGY5l.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-recu-pur-DcucZqpR.js","assets/identite-DKEwKyGi.js","assets/index--DXGru77.js","assets/index.es-FLnl51Xt.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-C-ptoIH-.js","assets/jspdf.es.min-DH9V5T9P.js","assets/JustePrix-CSP9qmYo.js","assets/kkiapay-DboWXu-x.js","assets/kkiapay-widget-DnUhUNd4.js","assets/laboratoire-BqsyACJP.js","assets/Laboratoire-DkdsvVhN.js","assets/LettresAuDossier-dncVDS78.js","assets/LienMndPay-CEm9I_Xf.js","assets/maisons-CSSFrqZy.js","assets/Marketing-o297vGwP.js","assets/MarketingBranche-Bn9_ntIL.js","assets/Marque-DTN0FucW.js","assets/MesTaches-Cc4XUDf6.css","assets/MesTaches-cOnuDVyR.js","assets/missions-prestataires-jPZaZo3D.js","assets/momo-C2ZVfV9J.js","assets/MonMois-DQfpskLj.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-BPyOrCtE.js","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/paliers-CSJ7OmxP.js","assets/Parametres-CyIvNto9.js","assets/parcours-DrXb3_YD.js","assets/Parrainages-Cfmgz74S.js","assets/Parrainages-gAHAPB_6.css","assets/PassageAvantLeFauteuil-MX8uyy4Q.js","assets/pdf-BYmd3GPw.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/Personas-hh2Gaqa5.js","assets/Personnel-CBlM1Vr9.js","assets/photo-DaZKzpqd.js","assets/pilotage-D8kf1Co8.css","assets/Predictions-BK5xLevi.js","assets/Prestataires-BhmYB0sl.js","assets/Prets-5gYlcmhX.js","assets/prevision-du-mois-pur-D6sJa5lw.js","assets/Previsions-D-0__Buz.css","assets/Previsions-DLrh2eUu.js","assets/previsions-pur-DSMBxHN3.js","assets/processus-pur-BLN25j-E.js","assets/Projets-bWDH7Dof.js","assets/projets-CKZWntSG.js","assets/Projets-COO7WDEE.css","assets/projets-pur-2ZEMRNDU.js","assets/protocoles-BfQGfAR8.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-Re7e1jzJ.js","assets/qualification-CnHU2-8R.js","assets/quiz-5qMPWZVi.js","assets/Rapport-3QINroQL.js","assets/RattacherUneCarte-D_aI5d7a.js","assets/Recommandations-BizV68pW.js","assets/regler-C5hcM02_.css","assets/regler-DoL7FXrt.js","assets/regler-la-seance-serveur-Bs6rzqZX.js","assets/relances-pur-lwRTXc5E.js","assets/releve-des-avis-cQcPB9nv.js","assets/SalonFoyer-CtTHoCeP.js","assets/secretariat-admin-DE8uoJ--.js","assets/Secretariat-BSsMyocY.js","assets/Secretariat-Cy79Zw30.css","assets/Signatures-C8gFx5PD.js","assets/SignerUnPdf-BtzXnqj4.js","assets/Synthese-1c8SGpZq.js","assets/SyntheseGraphes-Bw3CYpC5.js","assets/systeme-TPy-pF7j.css","assets/Tableau-DED6vB5m.js","assets/temps-Bh6kZ-d5.js","assets/Textes-BMcu926T.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-C9pxxQyR.js","assets/trace-du-moyen-pur-Bx8-suHn.js","assets/trone-Dsq_sKW-.js","assets/trone-QJZrdG4j.css","assets/ui-TvKs5JkT.js","assets/useAudiences-DGrT7aDx.js","assets/vente-CauXO8yV.css","assets/Vitrine-BWilTqQJ.css","assets/Vitrine-jk8myVz3.js","assets/_admin-BOaPhohY.js","assets/_contrat-DynARanx.js","assets/_heures-2GuUZl6P.js","assets/_reuni-DyHuGMU8.js","assets/_shared-CjCrb7n0.js","assets/_signature-BSytf2bC.js","assets/_ui-BWMA-PlM.css","assets/_ui-Cv-s_W9A.js"];
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
