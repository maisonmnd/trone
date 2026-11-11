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
const BUILD = "20261111154930";
const A_GARDER = ["./","assets/Abonnements-CsztS-pU.js","assets/abonnements-DTncHIQT.js","assets/Abonnements-DTY7p2DH.css","assets/Academie-D0LtF9r4.js","assets/Acces-VXQdI6S6.js","assets/afaire-BPeLWHRA.js","assets/AFaire-CNHvCZoQ.js","assets/Agents-C4N8iKMG.js","assets/agents-donnees-DCATUlxB.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-Dss85PoS.js","assets/Appels-DrT_oQ0p.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/Assistants-D9i2Xwmg.css","assets/Assistants-lKtDQFyr.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/AtelierDesContenus-DtAQqhVW.js","assets/Audience-CXtGs9iz.js","assets/Aujourdhui-BUFniVrP.js","assets/avant-le-fauteuil-lecture-CXEAod6D.js","assets/AvantLeFauteuil-BY_3Tl-X.js","assets/avis-fiches-ChFYwoZp.js","assets/AvisGoogle-DaPXfwX9.css","assets/AvisGoogle-O2ZJEXZZ.js","assets/BadgeEssai-CnU7GBmw.js","assets/bilan-B-bfPYR0.css","assets/bilan-DxmbczZ8.js","assets/BilanMensuel-zopN6lS7.js","assets/Branches-BwkCYcT0.js","assets/bridges-BDhw9Y7l.js","assets/Caisse-BFGeusSR.js","assets/caisse-du-soir-C6vPx-E_.css","assets/caisse-du-soir-jFZNO3Gx.js","assets/Caisses-BqPiNqLJ.js","assets/Calendrier-SGOnCsd7.js","assets/campagnes-pur-CkJBlP5L.js","assets/Carnet-MUKC_iHa.js","assets/carte-D8wzCqmJ.js","assets/carte-_W_-xBPj.css","assets/CarteModal-CySQymY7.js","assets/CartesCadeaux-DdU5WfUT.js","assets/Catalogue-BRVn57Fj.js","assets/CentreDeCommande-D9Aq9KzY.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-ygbzm81v.js","assets/certificat-6fYyXUgk.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-K7OChF3K.js","assets/chiffre-du-jour-pur-DXe30RFh.js","assets/ChiffreDesPrestations-Dzr3n-Qs.js","assets/client-C6B5a9_C.js","assets/cloture-du-jour-CcSlQ1it.js","assets/ClotureDuTiroir-Wat8RPkR.js","assets/Coffre-3HmEIVEK.js","assets/components-rEyMW5Tm.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-DaHH1Uol.js","assets/Comptes-BqEnqqqA.js","assets/consultation-CRW6QcWf.css","assets/consultation-DyKAIWnC.js","assets/Consultations-B-6uY6Zx.js","assets/consultNotes-CAWLotNU.js","assets/Conversations-BEokiGsn.js","assets/Conversations-D4WwB5Zo.css","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-xbgjiUWA.js","assets/currency-qfIhGmrs.js","assets/Customers-BWcYWHli.js","assets/Dashboard-B2x7VsE_.css","assets/Dashboard-DdT1hvwY.js","assets/dates-CsbE0Fls.js","assets/Demandes-CqvLNejV.js","assets/DepenseEnUnePhrase-BIGRlGqP.css","assets/DepenseEnUnePhrase-UWGhpU66.js","assets/Depenses-Dt02e46q.js","assets/depenses-saisie-BMoUYKKI.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-9cfmsGpw.js","assets/diagnostics-au-trone-BZ1RY4VZ.js","assets/Dictee-D2P9yM7v.css","assets/dictee-pur-DpkUjwM7.js","assets/Dictee-Uqgetyse.js","assets/Discussions-Cfo23sog.js","assets/EditeurDesOffres-DN3itBPZ.js","assets/Encaissements-MafpSmC8.js","assets/enfants-06LgnBD9.js","assets/Engagements-Cj5S9MhG.css","assets/engagements-coffre-D_HAlqmU.js","assets/Engagements-DxuYijUh.js","assets/EntreDeuxSeances-Cs3gW_o2.js","assets/Evaluation-Ipiykpwx.js","assets/Factures-C1HxksY0.js","assets/FenetreDesCivilites-Yxp7g5Oa.js","assets/FenetreDesCivilites-zfNk1aak.css","assets/FenetreDuPoint-BGhuz5cT.js","assets/Fil-w-gTlrrL.js","assets/finances-BMFnlkRx.css","assets/fon-DyGW9Hvu.js","assets/fournisseurs-Acznmrl0.js","assets/Fournisseurs-B89hn9eM.js","assets/foyer-nEmF9EEB.js","assets/Gerard-BSLMyl0b.js","assets/Gerard-Cgj-zsJh.css","assets/gerard-donnees-73U_93eu.js","assets/gestes-conversation-BKTmMdnE.js","assets/HomeRituals-D1KCMKIf.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-CQdRNoTd.js","assets/ia-centre-B95h_EA8.js","assets/ia-diagnostic-pur-BBLrGY5l.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-tableau-pur-p6UvREJe.js","assets/identite-DIw9Q7Lu.js","assets/index-B-VVISgm.js","assets/index.es-vsItLKIp.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-EMMGNpPa.js","assets/jspdf.es.min-DeVoKh8F.js","assets/JustePrix-BDv633n0.js","assets/kkiapay-nyxZxgAN.js","assets/kkiapay-widget-DnUhUNd4.js","assets/Laboratoire-L8lspigN.js","assets/LaJournee-Bn_G0HCt.css","assets/LaJournee-CC20TYig.js","assets/LesPaiements-BvdfOCbQ.css","assets/LesPaiements-Cy_dYAKr.js","assets/LettresAuDossier-BCGjcYab.js","assets/LienMndPay-Cbus9kG0.js","assets/Marketing-BmH1d-4P.js","assets/MarketingBranche-otdZjQIj.js","assets/Marque-Cip9YMFu.js","assets/MesPourboires-CENjelyb.css","assets/MesPourboires-D645Ft7q.js","assets/MesTaches-Cc4XUDf6.css","assets/MesTaches-CHbeAH-n.js","assets/momo-C2ZVfV9J.js","assets/MonMois-BKQL24eB.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/objectifs-DUdt_pD5.js","assets/opale-Hi7hqYqZ.js","assets/oreille-B1AMUmZh.js","assets/paie-du-5-DeJq-K_U.css","assets/paie-du-5-DSm2QjSp.js","assets/paie-du-5-pur-R7snxHQU.js","assets/PaieParMtn-zElPdSSV.js","assets/paliers-CHvJcIYJ.js","assets/Parametres-DpmBzAji.js","assets/parcours-BOCjbF2T.js","assets/Parrainages-ChhnvNLu.js","assets/Parrainages-gAHAPB_6.css","assets/PassageAvantLeFauteuil-a9C-0FGj.js","assets/pdf-BRcXzKf5.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/periode-des-pourboires-pur-BUWqfwov.js","assets/Personas-Bi6WB_ba.js","assets/Personnel-5aom5uUG.js","assets/photo-BQFl1uLp.js","assets/pilotage-D8kf1Co8.css","assets/Pourboires-Dpghax1W.js","assets/Predictions-B9WVgy7l.js","assets/Prestataires-Dyv-CceS.js","assets/Prets-Hba9qlf8.js","assets/PrevisionDuMois-DlFTw3OX.css","assets/PrevisionDuMois-DyfgDLMZ.js","assets/Previsions-9BU2Vg1T.css","assets/Previsions-C0or9A9Z.js","assets/previsions-pur-CZnmYeXR.js","assets/processus-pur-R6U5QcCi.js","assets/Projets-BF1u3Qfb.js","assets/Projets-COO7WDEE.css","assets/projets-Dx6WTzs0.js","assets/projets-pur-2ZEMRNDU.js","assets/protocoles-DzWIQX-9.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-BEHKozZr.js","assets/qualification-B3LMHpkc.js","assets/quiz-5qMPWZVi.js","assets/Rapport-DuuMbdHq.js","assets/Recommandations-DLEJwTxH.js","assets/regler-C5hcM02_.css","assets/regler-Cpz8m1R8.js","assets/regler-la-seance-serveur-Bs6rzqZX.js","assets/relances-pur-lwRTXc5E.js","assets/releve-des-avis-914IobKX.js","assets/SalonFoyer-Ba63EuLa.js","assets/secretariat-admin-DIcKvET6.js","assets/Secretariat-CIEJf3CK.js","assets/Secretariat-Cy79Zw30.css","assets/Signatures-BlmH1O2b.js","assets/SignerUnPdf-aneEKKJE.js","assets/Synthese-Brv6FLqC.js","assets/SyntheseGraphes-wwBz0dCf.js","assets/systeme-TPy-pF7j.css","assets/Tableau-C15T_GYs.js","assets/temps-hU8u1XKL.js","assets/Textes-DLpOzRbT.css","assets/Textes-DNP3oXWY.js","assets/tiroirs-C36Zdq3U.js","assets/tiroirs-CkDzpGy0.css","assets/trone-DbcEcV_c.css","assets/trone-DmkF9HFf.js","assets/useAudiences-BpHgvW_j.js","assets/useClotureDuJour-BYKHxMEd.js","assets/Vitrine-BWilTqQJ.css","assets/Vitrine-DzHFshem.js","assets/_admin-Cw9Suins.js","assets/_contrat-ChvQb0us.js","assets/_heures-DQWMJEw3.js","assets/_reuni-Bz8acARc.js","assets/_shared-Co-79RB6.js","assets/_signature-D4pu4aSF.js","assets/_ui-BrUDlmuM.css","assets/_ui-kS7P8vPe.js"];
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
