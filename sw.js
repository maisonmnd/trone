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
const BUILD = "20261027232536";
const A_GARDER = ["./","assets/Abonnements-BDyM5LKe.js","assets/abonnements-BgViXkYa.js","assets/Academie-CKwOlPm6.js","assets/Acces-CQI-MEgV.js","assets/actions-BQ2-_2Ze.js","assets/AFaire-CT2sWFGG.js","assets/afaire-ioQlbx_o.js","assets/Agents-DAj6swza.js","assets/agents-donnees-DnqFutDn.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-BwQSQyRr.js","assets/Appels-Bc6TBZ9s.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/AtelierDesContenus-Blh6RtRQ.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/AuComptoir-Dg7sFXE8.js","assets/Audience-BYYKO4Pe.js","assets/Aujourdhui-Bi1GABFC.js","assets/avis-fiches-C3KNG6jk.js","assets/AvisGoogle-DaPXfwX9.css","assets/AvisGoogle-MYYUvUZ6.js","assets/bilan-B-bfPYR0.css","assets/bilan-Dj4r_xcF.js","assets/BilanMensuel-D5hZHxp_.js","assets/Branches-CqWxJl7i.js","assets/bridges-DitpXefD.js","assets/Caisse-Dm-dNGuk.js","assets/caisse-du-soir-C07z__26.js","assets/Caisses-C1LrpyXt.js","assets/Calendrier-C_nHSXET.js","assets/campagnes-pur-DDezkt8a.js","assets/Carnet-Dx4HsHHs.js","assets/carte-DqtlzciD.js","assets/carte-_W_-xBPj.css","assets/CarteModal-BpvQ5Y5r.js","assets/CartesCadeaux-DMleFOpZ.js","assets/Catalogue-DgTlHkcs.js","assets/CentreDeCommande-Du8kyJhp.css","assets/CentreDeCommande-VdAHaT6l.js","assets/Cercle-DqyvygzO.js","assets/certificat-C8-jQGSl.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-G36rvqrZ.js","assets/chiffre-du-jour-pur--3cbvpC5.js","assets/ChiffreDesPrestations-DXK2aeAT.js","assets/client-DDGJNgdW.js","assets/ClotureDuTiroir-C6vPx-E_.css","assets/ClotureDuTiroir-DXBLeXAk.js","assets/Coffre-BnZZU08e.js","assets/components-qcq1-c2L.js","assets/compte-courant-ByzulCEN.js","assets/compte-uRSSYvib.js","assets/CompteCourant-d6jUfq8v.js","assets/Comptes-UNwEkoH9.js","assets/Comptoir-CPRQkTcp.js","assets/consultation-CRW6QcWf.css","assets/consultation-C_Q1Tp80.js","assets/Consultations-FU7JLo_p.js","assets/consultNotes-Cv0yP4R_.js","assets/Conversations-D4WwB5Zo.css","assets/Conversations-DNpg0Atd.js","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-EDeUOu6o.js","assets/currency-qfIhGmrs.js","assets/Customers-BgWZUVBb.js","assets/Dashboard-BXgyyoZ1.js","assets/Dashboard-zjGteuUE.css","assets/dates-DFAx5K-f.js","assets/Demandes-BBOVkMYm.js","assets/Depenses-BOyRYAGx.js","assets/dernier-message-pur-CBYWnq8m.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-D0pEZJm2.js","assets/diagnostics-au-trone-y4z71gyf.js","assets/Discussions-DaPcBycY.js","assets/EditeurDesOffres-BiITR3SR.js","assets/Encaissements-CJ6fHMzr.js","assets/enfants-Bd0DROcB.js","assets/Engagements-Cj5S9MhG.css","assets/Engagements-TI5a6H0S.js","assets/EntreDeuxSeances-Cwfb1PL3.js","assets/equipe-B_9ZHz24.css","assets/Evaluation-BEMe6gdh.js","assets/FacturePrestataire-DQ396e6h.js","assets/Factures-CTxK4_hD.js","assets/Fil-BpG3v2qu.js","assets/finances-BMFnlkRx.css","assets/fon-DwtyLY9-.js","assets/fon-pur-CgVkbJ8O.js","assets/fournisseurs-B3ArZ4or.js","assets/Fournisseurs-DrKiEuN5.js","assets/foyer-D4VH3JMH.js","assets/Gerard-CUvkbLSl.css","assets/gerard-donnees-CijQNjMT.js","assets/Gerard-Dzo4sP8k.js","assets/gestes-conversation-DfGIF3Dq.js","assets/HomeRituals-CuOlrclk.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-C_RZe12u.js","assets/ia-centre-DmUSBbIb.js","assets/ia-diagnostic-pur-hHYxp10Y.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-recu-pur-DcucZqpR.js","assets/identite-BZeAATp1.js","assets/index-D9Oi4Hri.js","assets/index.es-KQp5CLLi.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-CuEAb2Wx.js","assets/jspdf.es.min-D0cF2TZ6.js","assets/JustePrix-BxgH0az7.js","assets/kkiapay-BQDjASU6.js","assets/kkiapay-widget-DnUhUNd4.js","assets/Laboratoire-DU0GNOnO.js","assets/laboratoire-XyYVl9Zu.js","assets/LettresAuDossier-DvbV5rFe.js","assets/LienMndPay-74NFZ-3r.js","assets/maisons-CSSFrqZy.js","assets/Marketing-Csid9NHY.js","assets/MarketingBranche-DVOY0cuZ.js","assets/Marque-CSUyntLr.js","assets/MesTaches-Cc4XUDf6.css","assets/MesTaches-ClSxRbfC.js","assets/momo-C2ZVfV9J.js","assets/MonMois-DM-i5v6e.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-BXEne2jz.js","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/paliers-XXf7z2ep.js","assets/Parametres-DRVP-vML.js","assets/parcours-zcO3Rnil.js","assets/Parrainages-DeGLpC-s.js","assets/Parrainages-gAHAPB_6.css","assets/pdf-BYLDSrPl.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/Personas-DLQRjUhD.js","assets/Personnel-BNhVTdZl.js","assets/photo-BbbXHJBj.js","assets/pilotage-D8kf1Co8.css","assets/Predictions-CS552_JW.js","assets/prestataires-CZII7Igp.js","assets/Prestataires-DXRv8pI1.js","assets/Prets-BGClDRK-.js","assets/prevision-du-mois-pur-D6sJa5lw.js","assets/Previsions-D-0__Buz.css","assets/Previsions-DdRNbMzC.js","assets/previsions-pur-BonBM2lZ.js","assets/processus-pur-BLN25j-E.js","assets/projets-C-oDxlwf.js","assets/Projets-COO7WDEE.css","assets/Projets-ptnJqRt_.js","assets/projets-pur-2ZEMRNDU.js","assets/protocoles-DBPRng8U.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-BeVSvJ5P.js","assets/qualification-BOmdYLnd.js","assets/quiz-5qMPWZVi.js","assets/Rapport-CA0JkBOz.js","assets/RattacherUneCarte-B4WKOgC-.js","assets/Recommandations-C-U_71aw.js","assets/regler-C5hcM02_.css","assets/regler-la-seance-serveur-BpExlC5z.js","assets/regler-M1IVpogQ.js","assets/relances-pur-DsIo28uB.js","assets/releve-des-avis-B_wpk-zk.js","assets/SalonFoyer-DgQ3W7T8.js","assets/secretariat-admin-Cio6DJ_o.js","assets/Secretariat-BBdyubGr.js","assets/Secretariat-Cy79Zw30.css","assets/Signatures-ue6IIKIf.js","assets/SignerUnPdf-BK8OUzcc.js","assets/Synthese-C2Ek6zX8.js","assets/SyntheseGraphes-BRyqofX0.js","assets/systeme-C3XFIa8E.css","assets/Tableau-BvQA4OB7.js","assets/temps-CYULVZzl.js","assets/Textes-Chz5-JSH.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-HNuFdfla.js","assets/trace-du-moyen-pur-Bx8-suHn.js","assets/trone-CfGCPWMq.css","assets/trone-Cz67xYZs.js","assets/ui-Bw2zLa7P.js","assets/useAudiences-BET3Dcn5.js","assets/vente-C7YWXkHo.css","assets/Vitrine-BWilTqQJ.css","assets/Vitrine-NFDquSIm.js","assets/_admin-D3J6wn0F.js","assets/_contrat-DIhHgp1k.js","assets/_heures-2B9LUUU0.js","assets/_reuni-BIUAT06k.js","assets/_shared-CUi0Yeh0.js","assets/_signature-B5dWox8j.js","assets/_ui-BWMA-PlM.css","assets/_ui-BxOBurpU.js"];
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
