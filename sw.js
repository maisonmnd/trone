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
const BUILD = "20261026181954";
const A_GARDER = ["./","assets/Abonnements-CeOr39KK.js","assets/abonnements-CzHgNQhj.js","assets/Academie-BmtXjfTt.js","assets/Acces-CjbugQqj.js","assets/actions-CEqzTkf0.js","assets/afaire-CjNfNQrN.js","assets/AFaire-DE_Vt1Dx.js","assets/Agents-DJ3LSQ0z.js","assets/agents-donnees-OO6tvCGi.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-CmZJ_wcP.js","assets/Appels-CHUWi_BW.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/AtelierDesContenus-CzqeBpyl.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/AuComptoir-BoDNZOe_.js","assets/Aujourdhui-CsIMe_BY.js","assets/avis-fiches-BsWHWHwt.js","assets/AvisGoogle--e4Nlxxl.js","assets/AvisGoogle-DaPXfwX9.css","assets/bilan-B-bfPYR0.css","assets/bilan-DxqwscMY.js","assets/BilanMensuel-pGgCMak1.js","assets/Branches-BHgWvm_4.js","assets/bridges-CnTodu9W.js","assets/Caisse-BzegUz9B.js","assets/caisse-du-soir-C1QIpKlI.js","assets/Caisses-Z9P07b0S.js","assets/Calendrier-BbtPjvSC.js","assets/Carnet-yC84DIcR.js","assets/carte-COzXLTye.js","assets/carte-_W_-xBPj.css","assets/CarteModal-DDdr8sMH.js","assets/CartesCadeaux-ClbO_T_9.js","assets/Catalogue-gCgm02Fk.js","assets/CentreDeCommande-B9bZlsRR.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-DMKSj-5r.js","assets/certificat-txhCKLJL.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-DBqWVx18.js","assets/chiffre-du-jour-pur-BjbIio7u.js","assets/ChiffreDesPrestations-H9S_ArOz.js","assets/client-6gOHQIa_.js","assets/ClotureDuTiroir-C6vPx-E_.css","assets/ClotureDuTiroir-DtDfIMcH.js","assets/Coffre-PtN_yZct.js","assets/components-CW0sa1sI.js","assets/compte-B46SFO-V.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-D_rVVA9M.js","assets/Comptes-Dyuws_1W.js","assets/Comptoir-DIlR83OP.js","assets/consultation-Bxw1HQUW.js","assets/consultation-CRW6QcWf.css","assets/Consultations-l1u6QX1S.js","assets/consultNotes-Co2etpyx.js","assets/Conversations-D4WwB5Zo.css","assets/Conversations-Siv0Rv51.js","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-DTS4GDyj.js","assets/currency-qfIhGmrs.js","assets/Customers-DIVFWRm5.js","assets/Dashboard-B8qK6Flt.css","assets/Dashboard-BYcNPbd-.js","assets/dates-DtedXSsQ.js","assets/Demandes-B3pI-l6t.js","assets/Depenses-Dy7351pl.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-F9euGfC-.js","assets/diagnostics-au-trone-C0r3mMay.js","assets/Discussions-CisgT57x.js","assets/Encaissements-CttWdEOp.js","assets/enfants-scVi3S66.js","assets/Engagements-CDzJdiFG.js","assets/Engagements-Cj5S9MhG.css","assets/EntreDeuxSeances-Cv8gLtt8.js","assets/equipe-B_9ZHz24.css","assets/Evaluation-D57_BW4y.js","assets/FacturePrestataire-SRFlkEak.js","assets/Factures-D8RH_Ch1.js","assets/Fil-8ZsDGjAL.js","assets/finances-BMFnlkRx.css","assets/fon-pur-CgVkbJ8O.js","assets/fon-Xnzwj9bQ.js","assets/Fournisseurs-B1FWs4D3.js","assets/fournisseurs-CuIGEoHd.js","assets/foyer-DblZT6Dj.js","assets/Gerard-BbykUeK5.js","assets/Gerard-Bwwkk2AL.css","assets/gerard-donnees-ZiGUPL-G.js","assets/gestes-conversation-BMPz870R.js","assets/HomeRituals-DVgBtkRe.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-Bd8nxIu7.js","assets/ia-diagnostic-pur-BulIFgZQ.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-recu-pur-DcucZqpR.js","assets/identite-BqACMTCi.js","assets/index-DtAqnfPY.js","assets/index.es-DM5vYrpi.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-B9xgeqC3.js","assets/jspdf.es.min-D673t3ho.js","assets/JustePrix-D_VZj3AA.js","assets/kkiapay-uusxlIVD.js","assets/kkiapay-widget-DnUhUNd4.js","assets/laboratoire-B_4vZWQD.js","assets/Laboratoire-Cjl7qE3C.js","assets/LettresAuDossier-zPF4mwAc.js","assets/LienMndPay-G5uq53TY.js","assets/maisons-CSSFrqZy.js","assets/Marketing-oXUBugjS.js","assets/Marque-B6pTITe-.js","assets/MesTaches-BSSsxtjm.js","assets/MesTaches-Cc4XUDf6.css","assets/momo-C2ZVfV9J.js","assets/MonMois-Br-KQVnn.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-des-fauteuils-pur-CW46U8VG.js","assets/objectifs-DWsCX9WL.js","assets/paliers-DmdhF1kY.js","assets/Parametres-DEgiPJin.js","assets/parcours-VC7GD3Ku.js","assets/Parrainages-BgMa3w7M.js","assets/Parrainages-gAHAPB_6.css","assets/pdf-BMsPmDsD.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/Personas-D6n0Ankg.js","assets/Personnel-CsROsKw_.js","assets/photo-hqns1tpE.js","assets/pilotage-D8kf1Co8.css","assets/Predictions-C-0S6db0.js","assets/prestataires-Dlw4C91m.js","assets/Prestataires-DyD0rSZN.js","assets/Prets-B1r0l0cW.js","assets/prevision-du-mois-pur-BiqzNpDz.js","assets/Previsions-D-0__Buz.css","assets/Previsions-DoqchXuI.js","assets/previsions-pur-_Y3elFiY.js","assets/processus-pur-BLN25j-E.js","assets/Projets-COO7WDEE.css","assets/projets-D1hy4HkK.js","assets/projets-pur-2ZEMRNDU.js","assets/Projets-zLCBOGu7.js","assets/protocoles-CU7qbUd_.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-BV1iIWSS.js","assets/qualification-DhOnEWXC.js","assets/quiz-5qMPWZVi.js","assets/Rapport-C--GWzRU.js","assets/RattacherUneCarte-DTNa3cz_.js","assets/Recommandations-DIaS71hL.js","assets/regler-BJ2BNaYf.js","assets/regler-C5hcM02_.css","assets/regler-la-seance-serveur-BpExlC5z.js","assets/relances-pur-DsIo28uB.js","assets/releve-des-avis-CpKW_kz8.js","assets/SalonFoyer-CGV62W-O.js","assets/secretariat-admin-CqaEHbzR.js","assets/Secretariat-Cy79Zw30.css","assets/Secretariat-DxDyUogm.js","assets/Signatures-mbW6QkHX.js","assets/SignerUnPdf-Cq9KyVgZ.js","assets/Synthese-BB1tQcoG.js","assets/SyntheseGraphes-BCe3nUCf.js","assets/systeme-C3XFIa8E.css","assets/Tableau-CeO2dTAV.js","assets/Textes-BHfve6Nu.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-D2qAgrx6.js","assets/trace-du-moyen-pur-Bx8-suHn.js","assets/trone-BonnOr0P.js","assets/trone-ZtHDzaYl.css","assets/ui-BeRv-RFu.js","assets/useAudiences-CNyNciUx.js","assets/vente-C7YWXkHo.css","assets/Vitrine-BWilTqQJ.css","assets/Vitrine-B_dbrYCz.js","assets/_admin-CZFjihkr.js","assets/_contrat-BCwGDsVy.js","assets/_heures-_2fB5Sbn.js","assets/_reuni-sLNOE_46.js","assets/_shared-D9IWG8Xw.js","assets/_signature-CQgICNhX.js","assets/_ui-BQ8t3GDr.js","assets/_ui-BWMA-PlM.css"];
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
