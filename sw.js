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
const BUILD = "20261024095907";
const A_GARDER = ["./","assets/Abonnements-BgJDioT1.js","assets/abonnements-ZtEW7Rmo.js","assets/Academie-CZhH67qV.js","assets/Acces-1Yysr7o8.js","assets/actions-Btdrwhhg.js","assets/afaire-BUMGPx73.js","assets/AFaire-DO0kV5vc.js","assets/Analytics-C7F3AdQv.js","assets/Appels-CPjQPKlC.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/AtelierDesContenus-DyL6GLgS.js","assets/AuComptoir-D30P24u_.js","assets/Aujourdhui-SBNahp8_.js","assets/bilan-B-bfPYR0.css","assets/bilan-DRZeMDhH.js","assets/BilanMensuel-vrs__nst.js","assets/Branches-D89N6hLy.js","assets/bridges-CKa3KiKk.js","assets/Caisse-C-fc1zUw.js","assets/caisse-du-soir-EKSgbPG4.js","assets/Caisses-CK5XfojM.js","assets/Calendrier-D__W74Cv.js","assets/Carnet-YLLcKoif.js","assets/carte-C-5nwmme.js","assets/carte-WI2qP1su.css","assets/CarteModal-BC0th8V9.js","assets/CartesCadeaux-BdN01EHE.js","assets/Catalogue-B4lYv5Al.js","assets/CentreDeCommande-C13d0cMI.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-D74UqjRd.js","assets/certificat-C87GYwnP.js","assets/certificat-DVSxho5e.css","assets/certificats-coffre-B4L9001T.js","assets/chiffre-du-jour-pur-DseUrYj-.js","assets/ChiffreDesPrestations-BYRUQGCz.js","assets/ClotureDuTiroir-C6vPx-E_.css","assets/ClotureDuTiroir-CNmUyQm6.js","assets/Coffre-BdgMqTTJ.js","assets/components-diKfiIxU.js","assets/compte-courant-ByzulCEN.js","assets/compte-CZD9hmA_.js","assets/CompteCourant-BM0ur9gB.js","assets/Comptes-D_yX87VK.js","assets/Comptoir-CDsstN7Q.js","assets/consultation-B82EqAx3.js","assets/consultation-CCTm16qX.css","assets/Consultations-CPDREJGC.js","assets/consultNotes-CVJ8Sd15.js","assets/Conversations-D4WwB5Zo.css","assets/Conversations-Db3ybKM_.js","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-CtDObaKa.js","assets/currency-qfIhGmrs.js","assets/Customers-DhSWJXRw.js","assets/Dashboard-Buh18R9O.js","assets/dates-D9vLhz3f.js","assets/Demandes-Cpgn-Tw8.js","assets/Depenses-B62ktz-j.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-Ckr5iO_t.js","assets/diagnostics-au-trone-Dz_6tlKu.js","assets/Discussions-DEtKQhEH.js","assets/Encaissements-WkDd4FsT.js","assets/enfants-C8ACNxxH.js","assets/Engagements-CiIiS_ch.js","assets/Engagements-Cj5S9MhG.css","assets/EntreDeuxSeances-kacrM-8K.js","assets/equipe-DABhdlQT.css","assets/Evaluation-DNBCSNbm.js","assets/FacturePrestataire-ClDztgHp.js","assets/Factures-D9XdySqo.js","assets/Fil-_NtWE4ZD.js","assets/finances-CCjqAkCE.css","assets/fournisseurs-D0JW8Eva.js","assets/Fournisseurs-_thR_XoF.js","assets/foyer-DeMKmEg2.js","assets/gestes-conversation-868or0GA.js","assets/HomeRituals-DX0v-I8B.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-CmFhctdQ.js","assets/ia-diagnostic-pur-BulIFgZQ.js","assets/ia-recu-pur-DcucZqpR.js","assets/identite-BWidpZte.js","assets/index-FOYwCH4e.js","assets/index.es-DduR5FfJ.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-CotMzKPM.js","assets/jspdf.es.min-BdTJ6PiU.js","assets/JustePrix-DDOXOVTg.js","assets/kkiapay-C0D0pVRB.js","assets/Laboratoire-BhM_2NT6.js","assets/laboratoire-CDlfk_Fu.js","assets/LettresAuDossier-CXHN8Ji0.js","assets/LienMndPay-ji5kOXrc.js","assets/maisons-CSSFrqZy.js","assets/Marketing-CfrSu4WI.js","assets/Marque-kPXE5r9y.js","assets/momo-C2ZVfV9J.js","assets/MonMois-klYbBe7H.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-MSp1ngh7.js","assets/paliers-i3zc9dZR.js","assets/Parametres-X7zW0e7N.js","assets/parcours-DS24hmhZ.js","assets/Parrainages-CyoWO_Cr.js","assets/Parrainages-gAHAPB_6.css","assets/pdf-DWhih5r1.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/Personas-BQa98fQA.js","assets/Personnel-DELOlBRG.js","assets/photo-BIn66HRS.js","assets/pilotage-Bx4c470B.css","assets/Predictions-ItUh7fmc.js","assets/Prestataires-0npM0qm2.js","assets/prestataires-Ba_8TMar.js","assets/Prets-Dc7rkJpK.js","assets/protocoles-DFvRx_uQ.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-C_FjEnRn.js","assets/qualification-DWwAwqOX.js","assets/quiz-5qMPWZVi.js","assets/Rapport-BmRvhRIj.js","assets/RattacherUneCarte-C5sWyBC8.js","assets/Recommandations-dLWwyYu8.js","assets/relances-pur-DsIo28uB.js","assets/releve-des-avis-Dl4h69o8.js","assets/SalonFoyer-B7HEKg2g.js","assets/secretariat-admin-CKVr6SaB.js","assets/Secretariat-BLGxdkxS.js","assets/Secretariat-Cy79Zw30.css","assets/Signatures-Cz5hoOvM.js","assets/SignerUnPdf-Dl81vd3C.js","assets/Synthese-2yzjXd0o.js","assets/systeme-C3XFIa8E.css","assets/Tableau-BSWAuwGT.js","assets/Textes-B8LbJJni.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-CFmO6DIc.js","assets/trace-du-moyen-pur-Cb3Gcky8.js","assets/trone-CCSJnqbZ.js","assets/trone-DEV4MR6z.css","assets/ui-CBaYXCAe.js","assets/useAudiences-BvvDLb26.js","assets/vente-C7YWXkHo.css","assets/Vitrine-BON6rcdB.css","assets/Vitrine-Btsb_Ipc.js","assets/_admin-BeoqV5ah.js","assets/_contrat-D61m5Mpf.js","assets/_heures-Biy_DK8A.js","assets/_reuni-Bhksc0GN.js","assets/_shared-CrypgFr3.js","assets/_signature-Dhi5fnAB.js","assets/_ui-BiMKtOSW.js","assets/_ui-BWMA-PlM.css"];
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
