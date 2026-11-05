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
const BUILD = "20261105140032";
const A_GARDER = ["./","assets/abonnements-CwODHaLh.js","assets/Abonnements-DB4Cd-1h.js","assets/Academie-CrbLxBT5.js","assets/Acces-C9Wsx3C6.js","assets/AFaire-BI_lwU1Q.js","assets/afaire-BKnBvN6I.js","assets/Agents-BZavaErV.js","assets/agents-donnees-C7fgTkxi.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-Crk_omab.js","assets/Appels-BVHVolsN.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/Assistants-CnuQuKWY.js","assets/Assistants-D9i2Xwmg.css","assets/AtelierDesContenus-D3-p6F2A.css","assets/AtelierDesContenus-DR8f-Z6y.js","assets/Audience-BzI7HfHT.js","assets/Aujourdhui-DyW1nuR4.js","assets/avant-le-fauteuil-lecture-BjLeaeQy.js","assets/AvantLeFauteuil-Tivgi_u5.js","assets/avis-fiches-C3ZX_wxv.js","assets/AvisGoogle-DaPXfwX9.css","assets/AvisGoogle-lKslP0Yv.js","assets/bilan-B-bfPYR0.css","assets/bilan-C8sYbrX0.js","assets/BilanMensuel-BUiDX448.js","assets/Branches-Ckq01W87.js","assets/bridges-ynmcdczy.js","assets/Caisse-DdL34pE4.js","assets/caisse-du-soir-C6vPx-E_.css","assets/caisse-du-soir-D2y3DxdG.js","assets/Caisses-UFJOS0qm.js","assets/Calendrier-D_mZ6E31.js","assets/campagnes-pur-D0168uK9.js","assets/Carnet-DVU5aZQk.js","assets/carte-DUFrde3X.js","assets/carte-_W_-xBPj.css","assets/CarteModal-Cfr7DZMk.js","assets/CartesCadeaux-B0z3Y556.js","assets/Catalogue-TmPUDc2l.js","assets/CentreDeCommande-Du8kyJhp.css","assets/CentreDeCommande-RFZXzhzv.js","assets/Cercle-DRrKf1zd.js","assets/certificat-DDSrmG4c.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-BxKyqa2u.js","assets/chiffre-du-jour-pur-CzlFgAlC.js","assets/ChiffreDesPrestations-BoVVwC7_.js","assets/client-BKHbT_mp.js","assets/cloture-du-jour-aq1t83AR.js","assets/ClotureDuTiroir-peMozsqh.js","assets/Coffre-DrfPQHY1.js","assets/components-BTblOQkc.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-dTteVi-D.js","assets/Comptes-i6tdDhqk.js","assets/consultation-CflGH1k0.js","assets/consultation-CRW6QcWf.css","assets/Consultations-BtjtOizs.js","assets/consultNotes-CBn3Zlwv.js","assets/Conversations-D4WwB5Zo.css","assets/Conversations-DuyaI3P-.js","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-DGax4k1X.js","assets/currency-qfIhGmrs.js","assets/Customers-CeA-9hfv.js","assets/Dashboard-B2x7VsE_.css","assets/Dashboard-C6hgcCr3.js","assets/dates-kGrbKxbS.js","assets/Demandes-Czu8jyoa.js","assets/DepenseEnUnePhrase-BGNBIsjv.js","assets/DepenseEnUnePhrase-BIGRlGqP.css","assets/Depenses-7IOdrZyZ.js","assets/depenses-saisie-DRbJnepc.js","assets/dernier-message-pur-CBYWnq8m.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-BLqUBeQY.js","assets/diagnostics-au-trone-DAxP2JPV.js","assets/Dictee-BXkNVIDa.js","assets/Dictee-D2P9yM7v.css","assets/dictee-pur-BfCchh6o.js","assets/Discussions-B_MBis60.js","assets/EditeurDesOffres-C3StdyPG.js","assets/Encaissements-DK2zq0jM.js","assets/enfants-DDWNsgr8.js","assets/Engagements-Cj5S9MhG.css","assets/Engagements-CJt0fj-Z.js","assets/EntreDeuxSeances-aVqwex5C.js","assets/Evaluation-CweAvkBp.js","assets/Factures-CEbpt2gg.js","assets/FenetreDesCivilites-u_PHhB5j.js","assets/FenetreDesCivilites-zfNk1aak.css","assets/FenetreDuPoint-CNAcccUG.js","assets/Fil-mPqr9pkH.js","assets/finances-BMFnlkRx.css","assets/fon-DhLJXqJX.js","assets/fournisseurs-BYd3o4p_.js","assets/Fournisseurs-C2Gfl0HX.js","assets/foyer-coEjlM3l.js","assets/Gerard-CMqz0ZY4.js","assets/Gerard-CP3QOjfk.css","assets/gerard-donnees-QksD-BiR.js","assets/gestes-conversation-Bp1pNvmA.js","assets/HomeRituals-F6uDYR9G.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-23bcGbz1.js","assets/ia-centre-D0p5kz4Y.js","assets/ia-diagnostic-pur-BBLrGY5l.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-tableau-pur-CSRjGtTf.js","assets/identite-DeUfHSBM.js","assets/index-B5oqyzsj.js","assets/index.es-CgB6qHlR.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-DavgkaT_.js","assets/jspdf.es.min-Kkfyx9si.js","assets/JustePrix-C6Sb0bdT.js","assets/kkiapay-BmyIQkrQ.js","assets/kkiapay-widget-DnUhUNd4.js","assets/Laboratoire-JTuA7CMs.js","assets/LaJournee-Bn_G0HCt.css","assets/LaJournee-K2XreMsI.js","assets/LettresAuDossier-DkR5-XBo.js","assets/LienMndPay-DOT9DKXM.js","assets/Marketing-DQL6ijvm.js","assets/MarketingBranche-CjP9rbKy.js","assets/Marque-BzJdVaXu.js","assets/MesPourboires-BnkAZiAL.js","assets/MesPourboires-D9I_9rZf.css","assets/MesTaches-Cc4XUDf6.css","assets/MesTaches-DUd_IXbC.js","assets/momo-C2ZVfV9J.js","assets/MonMois-D6OxicLA.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-CbC5lwa5.js","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/opale-BJ9ztQVd.js","assets/oreille-B1AMUmZh.js","assets/paie-du-5-DIpy8pFw.css","assets/paie-du-5-Dy8gbhrq.js","assets/paliers-857k7c1T.js","assets/Parametres-Dfxs0VMO.js","assets/parcours-C4r9AyM5.js","assets/Parrainages-C9EBmvK7.js","assets/Parrainages-gAHAPB_6.css","assets/PassageAvantLeFauteuil-BWXmDcXY.js","assets/pdf-CQ8JORP4.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/Personas-Dfk947IR.js","assets/Personnel-D2r2qCkD.js","assets/photo-en0qd_3z.js","assets/pilotage-D8kf1Co8.css","assets/Pourboires-DJg-8o62.js","assets/Predictions-LuZg7Hrc.js","assets/Prestataires-D2GOIg0q.js","assets/Prets-B2XLSuRs.js","assets/PrevisionDuMois-DlFTw3OX.css","assets/PrevisionDuMois-DuOPOGwg.js","assets/Previsions-D3dPVWwt.js","assets/previsions-pur-F6QxvCvI.js","assets/Previsions-r4v19Anp.css","assets/processus-pur-R6U5QcCi.js","assets/Projets-COO7WDEE.css","assets/projets-CuQgN5EW.js","assets/Projets-lTWo1axk.js","assets/projets-pur-2ZEMRNDU.js","assets/protocoles-B9ELsjie.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-DyqyCBUp.js","assets/qualification-CUJ-i2En.js","assets/quiz-5qMPWZVi.js","assets/Rapport-Q8p2KDgP.js","assets/Recommandations-Cda6uCZX.js","assets/regler-C5hcM02_.css","assets/regler-DGOymSXG.js","assets/regler-la-seance-serveur-Bs6rzqZX.js","assets/relances-pur-lwRTXc5E.js","assets/releve-des-avis-Ceyv-wU3.js","assets/SalonFoyer-CikElKNX.js","assets/secretariat-admin-DjsFnNRn.js","assets/Secretariat-Cy79Zw30.css","assets/Secretariat-DeN0S6nE.js","assets/Signatures-BXlKkeZM.js","assets/SignerUnPdf-DP39BNan.js","assets/Synthese-BfeQOVXU.js","assets/SyntheseGraphes-BJQevTKq.js","assets/systeme-TPy-pF7j.css","assets/Tableau-lBKHbMFW.js","assets/temps-Bh4VJ2So.js","assets/Textes-DLpOzRbT.css","assets/Textes-jdPCGJ9m.js","assets/tiroirs-BIPmHmvg.js","assets/tiroirs-CkDzpGy0.css","assets/trone-COeUlGCD.js","assets/trone-DQVzvvmA.css","assets/useAudiences-u1_-3BQ7.js","assets/useClotureDuJour-DuPQ8GwO.js","assets/Vitrine-BWilTqQJ.css","assets/Vitrine-DsK8CPdp.js","assets/_admin-CIK32iNG.js","assets/_contrat-cjwptAvL.js","assets/_heures-CfNDgP1U.js","assets/_reuni-C0IYlFI8.js","assets/_shared-COmCJGD3.js","assets/_signature-nieSwJ9C.js","assets/_ui-BWMA-PlM.css","assets/_ui-DzuP93Av.js"];
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
