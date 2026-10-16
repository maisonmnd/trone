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
const BUILD = "20261016155226";
const A_GARDER = ["./","assets/abonnements-Bp4xl6ZN.js","assets/Abonnements-DElGh6ZV.js","assets/Academie-CjAkgL_b.js","assets/Acces-DLfgfael.js","assets/actions-BKosyPYY.js","assets/AFaire-Cg08f6_Y.js","assets/afaire-DGZHsFO4.js","assets/Analytics-D7RxGNXw.js","assets/Appels-CohCXUdu.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/AtelierDesContenus-CzTbZXxN.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/Aujourdhui-FdjiTERz.js","assets/bilan-B-bfPYR0.css","assets/bilan-DflpX8wa.js","assets/BilanMensuel-DtTmdhYe.js","assets/Branches-CJ9eLewi.js","assets/bridges-BmAm2tUh.js","assets/Caisse-DB6MH2Kv.js","assets/caisse-du-soir-rvx8tGJl.js","assets/Caisses-CvsLQLBc.js","assets/Calendrier-CmhDM5Ql.js","assets/Carnet-D9U2KwV4.js","assets/carte-D1GEAz7F.js","assets/carte-WI2qP1su.css","assets/CarteModal-CwY7p3BN.js","assets/CartesCadeaux-iIoNcByL.js","assets/Catalogue-8BZ6sa6Q.js","assets/CentreDeCommande-C6ByKB5l.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-COQuiqxB.js","assets/certificat-DVSxho5e.css","assets/certificat-l0WfE4Nn.js","assets/certificats-coffre-C_93Yyyt.js","assets/ChiffreDesPrestations-BgwIhAhS.js","assets/ClotureDuTiroir-C6vPx-E_.css","assets/ClotureDuTiroir-HHYkG_MI.js","assets/Coffre-DgqQSC6R.js","assets/components-aqLmRMGE.js","assets/compte-B_JI2_Kq.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-jyOCWdzf.js","assets/Comptes-DnWDfhYi.js","assets/Comptoir-DMOeg3tc.js","assets/consultation-CCTm16qX.css","assets/consultation-lF5JwegT.js","assets/Consultations-BCe3rOhM.js","assets/consultNotes-m0z5Zfls.js","assets/Conversations-DxyxjTST.js","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-CZugwAyR.js","assets/currency-D4l65sA8.js","assets/Customers-D-BpZx9Y.js","assets/Dashboard-BeT6duCr.js","assets/dates-IBRVgMY1.js","assets/Demandes-CTema9c-.js","assets/Depenses-C77SraDC.js","assets/devise-fon-DX3P0bG4.woff2","assets/encaissement-pur-BLebrD_y.js","assets/Encaissements-BjC1hAbq.js","assets/enfants-dO3FWt_C.js","assets/Engagements-Cj5S9MhG.css","assets/Engagements-VsFMJNDz.js","assets/EntreDeuxSeances-qduyViMe.js","assets/equipe-DpPyq6h-.css","assets/Evaluation-BAZIPIOR.js","assets/FacturePrestataire-D8YANoDy.js","assets/Factures-DbtzjRa_.js","assets/Fil-Dx4kmcEl.js","assets/finances-CCjqAkCE.css","assets/fournisseurs-BoK6NzP2.js","assets/Fournisseurs-C6lpgIDV.js","assets/foyer-DClbHHlt.js","assets/HomeRituals-CAe_WFzL.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-Dv1Gh-iu.js","assets/identite-BqRCCpyZ.js","assets/index-PEur2V-z.js","assets/index.es-0ewJ6TDh.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-B6LDRi1q.js","assets/jspdf.es.min-B6F21jWu.js","assets/JustePrix-DssVDX_y.js","assets/kkiapay-BOUjXNCS.js","assets/laboratoire-DXqdWkQD.js","assets/Laboratoire-EifSxKAk.js","assets/LettresAuDossier-DfxrPAb7.js","assets/maisons-CSSFrqZy.js","assets/Marketing-BxF5DbNT.js","assets/Marque-CzRpLLOC.js","assets/momo-C2ZVfV9J.js","assets/MonMois-CAR6yZle.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-DOhpMbQf.js","assets/paliers-D-2D4gng.js","assets/Parametres-CHnarGmM.js","assets/parcours-BPJHMD_p.js","assets/Parrainages-C6Lfu76e.js","assets/Parrainages-gAHAPB_6.css","assets/pdf-LuXpXOIX.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/Personas-B8oWRjLv.js","assets/Personnel-DEtR9mLU.js","assets/photo-Cvqb9IN6.js","assets/pilotage-Bn1gP_oo.css","assets/Predictions-D_C1Y_XA.js","assets/Prestataires-B4nymiRY.js","assets/prestataires-ChtromIR.js","assets/Prets-CsSKtGS8.js","assets/promos-DBlQ12W-.js","assets/protocoles-5igdljit.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-tjnQr1rg.js","assets/quiz-5qMPWZVi.js","assets/Rapport-DK__pGle.js","assets/RattacherUneCarte-BhrNj1Gt.js","assets/Recommandations-BJ2pIqQq.js","assets/SalonFoyer-CzlLkyxY.js","assets/secretariat-admin-BNT3Xm5a.js","assets/Secretariat-S75wCdg2.js","assets/Signatures-COdGMLQU.js","assets/SignerUnPdf-DwwOoBjG.js","assets/Synthese-B5tCXuZv.js","assets/systeme-C3XFIa8E.css","assets/Tableau-5RzC3z4O.js","assets/Textes-CWw4D_uN.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-CVs1mYAX.js","assets/trone-CIXcTU8i.js","assets/trone-CyFdPxg0.css","assets/ui-DquO3Uou.js","assets/vente-D0kdELDn.css","assets/Vitrine-BLpCR6Df.js","assets/_admin-BJT3ZkvM.js","assets/_contrat-BPBQYQ7K.js","assets/_heures-DIwJTgF8.js","assets/_reuni-C7zWCmn4.js","assets/_shared-B6eNfnIA.js","assets/_signature-DssgWGwT.js","assets/_ui-BaLeZDaZ.js","assets/_ui-BWMA-PlM.css"];
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
