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
const BUILD = "20261102151719";
const A_GARDER = ["./","assets/Abonnements-D6-WXAuC.js","assets/abonnements-DdUTWJKs.js","assets/Academie-C934fhmS.js","assets/Acces-DW6aIcHj.js","assets/actions-C16k-dng.js","assets/AFaire-B60f8ADS.js","assets/afaire-D69o5YYk.js","assets/Agents-CyeNkchP.js","assets/agents-donnees-D3FuYwnO.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-SaM64eqP.js","assets/Appels-3cAEXs4H.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/Assistants-BKAW_vW5.js","assets/Assistants-BOcxTwZO.css","assets/AtelierDesContenus-CFIRlyPH.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/AuComptoir-DOreGNBB.js","assets/Audience-ug1sKp4H.js","assets/Aujourdhui-D3QOZBIq.js","assets/avant-le-fauteuil-lecture-CXLZ46Di.js","assets/AvantLeFauteuil-DO32b4iY.js","assets/avis-fiches-DEAuq-YI.js","assets/AvisGoogle-BU6sOn_V.js","assets/AvisGoogle-DaPXfwX9.css","assets/bilan-B-bfPYR0.css","assets/bilan-Dzs48qs3.js","assets/BilanMensuel-C7BEFo7T.js","assets/Branches-CbptDH-T.js","assets/bridges-BBxY-7eI.js","assets/caisse-du-soir-BXbmUyvI.js","assets/Caisse-ECRaSeuJ.js","assets/Caisses-DtpQ7nc3.js","assets/Calendrier-5AyOBXwR.js","assets/campagnes-pur-CQ369hEN.js","assets/Carnet-RMXNOWCX.js","assets/carte-BqjLOlFk.js","assets/carte-_W_-xBPj.css","assets/CarteModal-G-bRorbQ.js","assets/CartesCadeaux-Dsks3SAd.js","assets/Catalogue-BP70_Xcf.js","assets/CentreDeCommande-Dg-EkLbi.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-xVlqaVp0.js","assets/certificat-C87SQcQB.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-DdnGMlF8.js","assets/ChiffreDesPrestations-K6OIJvm1.js","assets/client-IZ1Ljioq.js","assets/ClotureDuTiroir-BBkZQxMI.js","assets/ClotureDuTiroir-C6vPx-E_.css","assets/Coffre-Dkv42ZYc.js","assets/components-DeTbhpaE.js","assets/compte-C2NuOijS.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-Cfub3vte.js","assets/Comptes-BX8Fcr7i.js","assets/Comptoir-B-r7yh8F.js","assets/consultation-CRW6QcWf.css","assets/consultation-mHg4Es-J.js","assets/Consultations-DiyI9IPK.js","assets/consultNotes-BDtLUd-2.js","assets/Conversations-D4WwB5Zo.css","assets/Conversations-DHcE_VWP.js","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-C4ZUqIbx.js","assets/currency-qfIhGmrs.js","assets/Customers-RjXdB4zz.js","assets/Dashboard-CPRPODQW.js","assets/Dashboard-zjGteuUE.css","assets/dates-BjAwdbeX.js","assets/Demandes-QjzumwBR.js","assets/depenses-saisie-DlgX1In_.js","assets/Depenses-xE9c83pE.js","assets/dernier-message-pur-CBYWnq8m.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-CU5A3p_i.js","assets/diagnostics-au-trone-BaJZq3L5.js","assets/Dictee-CugbQvfi.js","assets/Dictee-D2P9yM7v.css","assets/dictee-pur-DS1MiZle.js","assets/Discussions-XYHzMcDx.js","assets/EditeurDesOffres-C4FCZ1qe.js","assets/Encaissements-BXaxnb38.js","assets/enfants-BUNAgbr0.js","assets/Engagements-BA1sEzUw.js","assets/Engagements-Cj5S9MhG.css","assets/EntreDeuxSeances-BxBtCQHr.js","assets/equipe-B_9ZHz24.css","assets/Evaluation-ClKLs1aO.js","assets/FacturePrestataire-DrJ0vUjs.js","assets/Factures-Dpuru9A3.js","assets/FenetreDesCivilites-lEb2oJdq.js","assets/FenetreDesCivilites-zfNk1aak.css","assets/FenetreDuPoint-D0uPIkwo.js","assets/Fil-BBjrNYbc.js","assets/finances-BMFnlkRx.css","assets/fon-DHSayg3-.js","assets/fon-pur-CgVkbJ8O.js","assets/Fournisseurs-CtlmRJ2v.js","assets/fournisseurs-YlYBDeKX.js","assets/foyer-Bgr6IO2R.js","assets/Gerard-DJzQpZkw.css","assets/gerard-donnees-BNFyxaVS.js","assets/Gerard-LGhMhKHy.js","assets/gestes-conversation-VUZelhpH.js","assets/HomeRituals-Cpnbir2T.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-CUXz6C8x.js","assets/ia-centre-CX9GXvGo.js","assets/ia-diagnostic-pur-BBLrGY5l.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-recu-pur-DcucZqpR.js","assets/identite-BNFzjvvf.js","assets/index-DCgYyPQ8.js","assets/index.es-CRhAgqxL.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-B0co-61P.js","assets/jspdf.es.min-BcYV_bev.js","assets/JustePrix-CFyoHRzq.js","assets/kkiapay-VJx9_dFV.js","assets/kkiapay-widget-DnUhUNd4.js","assets/Laboratoire-BObgna6t.js","assets/laboratoire-DrmkXEzq.js","assets/LettresAuDossier-BY-DDz2C.js","assets/LienMndPay-DmPl8Pez.js","assets/maisons-CSSFrqZy.js","assets/Marketing-ChAIcoFV.js","assets/MarketingBranche-CW37yRf3.js","assets/Marque-CLFUVvT6.js","assets/MesTaches-Cc4XUDf6.css","assets/MesTaches-D3hsNmwb.js","assets/missions-prestataires-Vcbii67r.js","assets/momo-C2ZVfV9J.js","assets/MonMois-oKyJwFmv.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-BYSpr-7R.js","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/paliers-CkCK527X.js","assets/Parametres-C9jjKEpZ.js","assets/parcours-DYgzL8tr.js","assets/Parrainages-gAHAPB_6.css","assets/Parrainages-UMuMnHs2.js","assets/PassageAvantLeFauteuil-BCX1_8ky.js","assets/pdf-CrZkl4VT.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/Personas-Ob_xZiwH.js","assets/Personnel-D2g7wod9.js","assets/photo-vUyfqiQM.js","assets/pilotage-D8kf1Co8.css","assets/Predictions-CQsnnK1o.js","assets/Prestataires-B6MG5Y_G.js","assets/Prets-gaHVZZzg.js","assets/prevision-du-mois-pur-D6sJa5lw.js","assets/Previsions-BdZVpH07.js","assets/Previsions-D-0__Buz.css","assets/previsions-pur-1MEn6_13.js","assets/processus-pur-BLN25j-E.js","assets/Projets-CeFkaQyH.js","assets/Projets-COO7WDEE.css","assets/projets-DcswVEr8.js","assets/projets-pur-2ZEMRNDU.js","assets/protocoles-DdkBNZ7j.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-BU2uVcRi.js","assets/qualification-D99xMlDR.js","assets/quiz-5qMPWZVi.js","assets/Rapport-BGFK8JLN.js","assets/RattacherUneCarte-Xof1lO1m.js","assets/Recommandations-C2-T8Mm_.js","assets/regler-C5hcM02_.css","assets/regler-CB3JXqll.js","assets/regler-la-seance-serveur-Bs6rzqZX.js","assets/relances-pur-lwRTXc5E.js","assets/releve-des-avis-2yxMBf36.js","assets/SalonFoyer-CE1SW1Ff.js","assets/secretariat-admin-BNwfVF-U.js","assets/Secretariat-Cy79Zw30.css","assets/Secretariat-DtmbWmVc.js","assets/Signatures-DLG2K2LW.js","assets/SignerUnPdf-BS66GDOt.js","assets/Synthese-fkSWimes.js","assets/SyntheseGraphes-CNhtE3nk.js","assets/systeme-TPy-pF7j.css","assets/Tableau-Bv7o4fUz.js","assets/temps-C09rsikf.js","assets/Textes-DLpOzRbT.css","assets/Textes-M9VlG7F5.js","assets/tiroirs-Ddslko4Y.js","assets/trace-du-moyen-pur-Bx8-suHn.js","assets/trone-B6jFQMGx.css","assets/trone-DzoZ9Hl1.js","assets/ui-CrAejsI4.js","assets/useAudiences-Dn_ehbuC.js","assets/vente-C7YWXkHo.css","assets/Vitrine-BHsUK31b.js","assets/Vitrine-BWilTqQJ.css","assets/_admin-DOMaN8D0.js","assets/_contrat-DTkwWz_S.js","assets/_heures-DCrAUDjh.js","assets/_reuni-D1jkFl5G.js","assets/_shared-DSSeFIgw.js","assets/_signature-B13TaTGd.js","assets/_ui-BWMA-PlM.css","assets/_ui-Ca5svBmd.js"];
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
