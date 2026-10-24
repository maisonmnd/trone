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
const BUILD = "20261024225246";
const A_GARDER = ["./","assets/Abonnements-BQKKQCpO.js","assets/abonnements-EBOqshfM.js","assets/Academie-mju5zDyz.js","assets/Acces-DIhLVRdg.js","assets/actions-Rjdf5IFj.js","assets/AFaire-CSTYw1JG.js","assets/afaire-DgCAW1Lv.js","assets/agents-donnees-CFFlAiY5.js","assets/Agents-LEr6pgmX.css","assets/Agents-qQJa9gee.js","assets/Analytics-D-mAkDED.js","assets/Appels-whBpKo3X.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/AtelierDesContenus-B99UlME_.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/AuComptoir-CfYIBxlo.js","assets/Aujourdhui-B7HsXO_8.js","assets/avis-fiches-6iNYGfVh.js","assets/bilan-B-bfPYR0.css","assets/bilan-zuIfRB-V.js","assets/BilanMensuel-cBT6AAyK.js","assets/Branches-BAHqxxM_.js","assets/bridges-Dna-3YEY.js","assets/Caisse-DQLP3AAE.js","assets/caisse-du-soir-G73SknG9.js","assets/Caisses-CG7Cu9o6.js","assets/Calendrier-BPtnT1FZ.js","assets/Carnet-CV0cH6n-.js","assets/carte-DWlSbalk.css","assets/carte-kvTXfnXS.js","assets/CarteModal-D1yhlWNY.js","assets/CartesCadeaux-DkMK0C3o.js","assets/Catalogue-g1ngBQfM.js","assets/CentreDeCommande-DkR2hmed.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-Bw6fIOlG.js","assets/certificat-9_XWf1iQ.css","assets/certificat-jc0trghj.js","assets/certificats-coffre-BR9wZSI4.js","assets/chiffre-du-jour-pur-DcdKqvwX.js","assets/ChiffreDesPrestations-CueFscoE.js","assets/ClotureDuTiroir-C6vPx-E_.css","assets/ClotureDuTiroir-MVTn3nrS.js","assets/Coffre-lnVM5gJ6.js","assets/components-BTlSZf8q.js","assets/compte-courant-ByzulCEN.js","assets/compte-WWb6y5rW.js","assets/CompteCourant-DFBegZJM.js","assets/Comptes-B2uRJPyP.js","assets/Comptoir-Cv1EpLJH.js","assets/consultation-DQBnwlMN.css","assets/consultation-Dsxi-kCI.js","assets/Consultations-BFowSWWo.js","assets/consultNotes-xXejsXi-.js","assets/Conversations-BPD3XLAz.js","assets/Conversations-D4WwB5Zo.css","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-DrRlGqEQ.js","assets/currency-qfIhGmrs.js","assets/Customers-CNTn93_N.js","assets/Dashboard-B8qK6Flt.css","assets/Dashboard-gZHjJ3ko.js","assets/dates-DNvH2GTR.js","assets/Demandes-BoCRYi0o.js","assets/Depenses-C_oLhcgX.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-DCKRzaCM.js","assets/diagnostics-au-trone-Cr65uekx.js","assets/Discussions-M-GLWX6Y.js","assets/Encaissements-ClqcBGAz.js","assets/enfants-DJ7Xqtb2.js","assets/Engagements-Cj5S9MhG.css","assets/Engagements-teauExD8.js","assets/EntreDeuxSeances-BGtTAdGc.js","assets/equipe-B_9ZHz24.css","assets/Evaluation-C5ktHb5j.js","assets/FacturePrestataire-DAdQFyUj.js","assets/Factures-Cedh_f41.js","assets/Fil--5GU9QTl.js","assets/finances-BMFnlkRx.css","assets/fournisseurs-CF0k8hHm.js","assets/Fournisseurs-DwJCQDVD.js","assets/foyer-WF-ttJnX.js","assets/gestes-conversation-C3lA5z0k.js","assets/HomeRituals-mSoDoiNo.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-CT70vOWQ.js","assets/ia-diagnostic-pur-BulIFgZQ.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-recu-pur-DcucZqpR.js","assets/identite-DE233FbT.js","assets/index-RGBUuCbN.js","assets/index.es-D0sCHMQI.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal--C1Lr45g.js","assets/jspdf.es.min-B-YKVWhf.js","assets/JustePrix-CUK4gXWm.js","assets/kkiapay-BasqMaGv.js","assets/Laboratoire-DR5MrW5l.js","assets/laboratoire-u4kdkU0p.js","assets/LettresAuDossier-BjumYBeB.js","assets/LienMndPay-uLIc8Q62.js","assets/maisons-CSSFrqZy.js","assets/Marketing-CtdaR73M.js","assets/Marque-DxYb8GMZ.js","assets/MesTaches-B6HlhqQG.js","assets/MesTaches-Cc4XUDf6.css","assets/momo-C2ZVfV9J.js","assets/MonMois-COBmyQsG.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-A-n1y613.js","assets/paliers-Dn-wCn1q.js","assets/Parametres-DD3IqBzn.js","assets/parcours-CNk517Us.js","assets/Parrainages-B3ERf872.js","assets/Parrainages-gAHAPB_6.css","assets/pdf--kcntz0s.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/Personas-Dc_9jO2r.js","assets/Personnel-6AFHXi_i.js","assets/photo-BX1GB9kO.js","assets/pilotage-D8kf1Co8.css","assets/Predictions-h_YNbKrL.js","assets/prestataires-BJ3E3Q86.js","assets/Prestataires-De7LqOR6.js","assets/Prets-ChgOLffR.js","assets/Projets-COO7WDEE.css","assets/projets-CpudO9Vs.js","assets/Projets-DIBYiRH0.js","assets/projets-pur-2ZEMRNDU.js","assets/protocoles-CG__wXJ1.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-MYqEFkaR.js","assets/qualification-Bt7NprFN.js","assets/quiz-5qMPWZVi.js","assets/Rapport-BrdOY1NA.js","assets/RattacherUneCarte-CnSMdMZL.js","assets/Recommandations-DhtK9ZFQ.js","assets/relances-pur-DsIo28uB.js","assets/releve-des-avis-BrCG7YW5.js","assets/SalonFoyer-DTJzssnu.js","assets/secretariat-admin-BvLFIKwB.js","assets/Secretariat-Csf3qTx8.js","assets/Secretariat-Cy79Zw30.css","assets/Signatures-OBg3_zdH.js","assets/SignerUnPdf-IkY47ESP.js","assets/Synthese-Cdj-08TS.js","assets/SyntheseGraphes-DvH2NzM0.js","assets/systeme-C3XFIa8E.css","assets/Tableau-CIsRvxi5.js","assets/Textes-D0pp9aCx.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-B8vD-DPQ.js","assets/trace-du-moyen-pur-Cb3Gcky8.js","assets/trone-BFZPG8R8.js","assets/trone-DAGtazk4.css","assets/ui-DHG3PCVw.js","assets/useAudiences-CFJKuIWw.js","assets/vente-C7YWXkHo.css","assets/Vitrine-BJXSu6sJ.js","assets/Vitrine-BON6rcdB.css","assets/_admin-DFGs7J0i.js","assets/_contrat-Cutf8wyl.js","assets/_heures-Fapcw889.js","assets/_reuni-j6x0NFV5.js","assets/_shared-aMUQajso.js","assets/_signature-DB67-BJ0.js","assets/_ui-BWMA-PlM.css","assets/_ui-DV-g4JF4.js"];
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
