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
const BUILD = "20261107064602";
const A_GARDER = ["./","assets/Abonnements-BlsQ3BPs.js","assets/abonnements-CC9YnbKM.js","assets/Abonnements-DTY7p2DH.css","assets/Academie-A6A31jGk.js","assets/Acces-IEf2pDPz.js","assets/afaire-BDeZQTKc.js","assets/AFaire-Cj0kbtan.js","assets/Agents-CkTsFFG-.js","assets/agents-donnees-DK-_WPo9.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-CgBRSQCb.js","assets/Appels-Dy767KpR.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/Assistants-BTzBGwWq.js","assets/Assistants-D9i2Xwmg.css","assets/AtelierDesContenus-D3-p6F2A.css","assets/AtelierDesContenus-DVLm6i4p.js","assets/Audience-CdM0NTmk.js","assets/Aujourdhui-CGvfvJ3j.js","assets/avant-le-fauteuil-lecture-BmqAnAJM.js","assets/AvantLeFauteuil-BygbL-Kf.js","assets/avis-fiches-CJa9R7R5.js","assets/AvisGoogle-Cs-yvoP8.js","assets/AvisGoogle-DaPXfwX9.css","assets/bilan-B-bfPYR0.css","assets/bilan-DnPJXqNc.js","assets/BilanMensuel-DI2iQoUH.js","assets/Branches-CBlAcfRv.js","assets/bridges-DpT1bP4n.js","assets/Caisse-BH3Yw6Zp.js","assets/caisse-du-soir-C6vPx-E_.css","assets/caisse-du-soir-CVCYqic7.js","assets/Caisses-BQBckuIW.js","assets/Calendrier-tIZUCBZy.js","assets/campagnes-pur-BPC6UcqC.js","assets/Carnet-CHwy61rV.js","assets/carte-HLbqCA5q.js","assets/carte-_W_-xBPj.css","assets/CarteModal-CiDYLyNU.js","assets/CartesCadeaux-u8-iAKs-.js","assets/Catalogue-BPzJPN4E.js","assets/CentreDeCommande-C9O8yggw.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-CSz80NQK.js","assets/certificat-D6tHCKMk.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-Cwblz21T.js","assets/chiffre-du-jour-pur-QJ5H_CT5.js","assets/ChiffreDesPrestations-yHUcvoGu.js","assets/client-C4tKV6DP.js","assets/cloture-du-jour-CNsO8Jit.js","assets/ClotureDuTiroir-CelTk1-v.js","assets/Coffre-y-Slb0cX.js","assets/components-_q8G61Xg.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-D_QeumnL.js","assets/Comptes-CF75-oKC.js","assets/consultation-CRW6QcWf.css","assets/consultation-DPCXSFwS.js","assets/Consultations-BxUJZ-fA.js","assets/consultNotes-C43EZ1xM.js","assets/Conversations-CoV3MM6V.js","assets/Conversations-D4WwB5Zo.css","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-HKXzzGzv.js","assets/currency-qfIhGmrs.js","assets/Customers-Biw6-Z7w.js","assets/Dashboard-B2x7VsE_.css","assets/Dashboard-DKpclXkk.js","assets/dates-3Eg8ZNcl.js","assets/Demandes-CEfA8U3W.js","assets/DepenseEnUnePhrase-BIGRlGqP.css","assets/DepenseEnUnePhrase-Ca1CT32H.js","assets/Depenses-BwbbETkz.js","assets/depenses-saisie-2d6nAsLZ.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-DbnzT7lE.js","assets/diagnostics-au-trone-Cu4QusG5.js","assets/Dictee-D2P9yM7v.css","assets/dictee-pur-BMmi6NQW.js","assets/Dictee-Y5Gn4nzG.js","assets/Discussions-FbWEVA8M.js","assets/EditeurDesOffres-VFJ492lG.js","assets/Encaissements-DL6U3xpx.js","assets/enfants-CD8v7Pzr.js","assets/Engagements-Avq1idUU.js","assets/Engagements-Cj5S9MhG.css","assets/engagements-coffre-CaxxamwV.js","assets/EntreDeuxSeances-DqdcaIO-.js","assets/Evaluation-eZJCQUx7.js","assets/Factures-Dux1GLeX.js","assets/FenetreDesCivilites-CqjGBR-N.js","assets/FenetreDesCivilites-zfNk1aak.css","assets/FenetreDuPoint-Dubv3Qh2.js","assets/Fil-BB6W3Oeo.js","assets/finances-BMFnlkRx.css","assets/fon-xGmais_D.js","assets/fournisseurs-CxkJVdDl.js","assets/Fournisseurs-eXg3gCw4.js","assets/foyer-DR1jLzdb.js","assets/Gerard-Cgj-zsJh.css","assets/Gerard-D0T-S6-H.js","assets/gerard-donnees-CetKGGqL.js","assets/gestes-conversation-C_hxGTuu.js","assets/HomeRituals-DvO3ScUT.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-D0jaDyTn.js","assets/ia-centre-C7H3tUFv.js","assets/ia-diagnostic-pur-BBLrGY5l.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-tableau-pur-CSRjGtTf.js","assets/identite-CqCXYMUo.js","assets/index-Qx5AlWe5.js","assets/index.es-Ce34ahq7.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-DyRifxg6.js","assets/jspdf.es.min-CgUFrDzu.js","assets/JustePrix-D_PxSBK-.js","assets/kkiapay-CEdL0rTm.js","assets/kkiapay-widget-DnUhUNd4.js","assets/Laboratoire-CWHnAuRV.js","assets/LaJournee-Bn_G0HCt.css","assets/LaJournee-DyCvyBQg.js","assets/LesPaiements-BvdfOCbQ.css","assets/LesPaiements-CrwgPe0C.js","assets/LettresAuDossier-BVY9O1ds.js","assets/LienMndPay-Bjfh3nqu.js","assets/Marketing-D2YVcksZ.js","assets/MarketingBranche-Clxmd56k.js","assets/Marque-sDRJYotP.js","assets/MesPourboires-B7bozxX0.js","assets/MesPourboires-D9I_9rZf.css","assets/MesTaches-Cc4XUDf6.css","assets/MesTaches-pW4iI5oL.js","assets/momo-C2ZVfV9J.js","assets/MonMois-DXYuvQi6.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-3Ej-X93r.js","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/opale-BtVd3G9S.js","assets/oreille-B1AMUmZh.js","assets/paie-du-5-DeJq-K_U.css","assets/paie-du-5-DURB_E9-.js","assets/paie-du-5-pur-KadYZUf7.js","assets/PaieParMtn-B1H-71Fi.js","assets/paliers-BI32DRWt.js","assets/Parametres-gjVxhzfK.js","assets/parcours-R_EIpUEI.js","assets/Parrainages-CcO9eslJ.js","assets/Parrainages-gAHAPB_6.css","assets/PassageAvantLeFauteuil-s7_ICZm-.js","assets/pdf-pw4n-QQy.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/Personas-COvqKOW3.js","assets/Personnel-ZjB4Q5_8.js","assets/photo-D1fjUQg8.js","assets/pilotage-D8kf1Co8.css","assets/Pourboires-fvB9Gqd2.js","assets/Predictions-C9Y0WsnF.js","assets/Prestataires-B0Swq4ip.js","assets/Prets-_TkY_aef.js","assets/PrevisionDuMois-DlFTw3OX.css","assets/PrevisionDuMois-IqlbHOok.js","assets/Previsions-HftNK3Dj.js","assets/previsions-pur-CycJBJEu.js","assets/Previsions-r4v19Anp.css","assets/processus-pur-R6U5QcCi.js","assets/Projets-aNLpIDWW.js","assets/projets-C4bHX0hZ.js","assets/Projets-COO7WDEE.css","assets/projets-pur-2ZEMRNDU.js","assets/protocoles-Bs5XchFc.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-o6MW4ufG.js","assets/qualification-DOWuBQUe.js","assets/quiz-5qMPWZVi.js","assets/Rapport-CIEUXo6u.js","assets/Recommandations-1X-bsJDP.js","assets/regler-C5hcM02_.css","assets/regler-CYJFre21.js","assets/regler-la-seance-serveur-Bs6rzqZX.js","assets/relances-pur-lwRTXc5E.js","assets/releve-des-avis-T2IzOl_W.js","assets/SalonFoyer-Dwgw1VUT.js","assets/secretariat-admin-CVfmLD6J.js","assets/Secretariat-ByXSdt0Y.js","assets/Secretariat-Cy79Zw30.css","assets/Signatures-DaTjzCrf.js","assets/SignerUnPdf-Cgsc7zhU.js","assets/Synthese-BVWIbTTE.js","assets/SyntheseGraphes-DnJLx0CR.js","assets/systeme-TPy-pF7j.css","assets/Tableau-rbP51q0l.js","assets/temps-B7gnaH7M.js","assets/Textes-BP6zAyMj.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-CkDzpGy0.css","assets/tiroirs-ClymAZ4h.js","assets/trone-BcDIcAwK.js","assets/trone-DIN2wFzN.css","assets/useAudiences-hs8rbLpw.js","assets/useClotureDuJour-CFf3djJt.js","assets/Vitrine-BWilTqQJ.css","assets/Vitrine-BzXftI-E.js","assets/_admin-BmspcEzi.js","assets/_contrat-DHqVB7m2.js","assets/_heures-BGNiQ4wV.js","assets/_reuni-C58QqrCH.js","assets/_shared-DFhvP8Fq.js","assets/_signature-DQUljE_7.js","assets/_ui-BrUDlmuM.css","assets/_ui-GJ-_6f4Q.js"];
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
