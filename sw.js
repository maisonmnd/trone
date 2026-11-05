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
const BUILD = "20261105071358";
const A_GARDER = ["./","assets/abonnements-4vcGmyuR.js","assets/Abonnements-B_H0Bc-6.js","assets/Academie-BEUcoClz.js","assets/Acces-DGFBhdTY.js","assets/AFaire-C7kKHWou.js","assets/afaire-CXihB9O0.js","assets/Agents-Bo4dETqG.js","assets/agents-donnees-DCSkn8zC.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-B5oBX33d.js","assets/Appels-D95jabJn.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/Assistants-BOcxTwZO.css","assets/Assistants-D3CBl3pa.js","assets/AtelierDesContenus-CVyVbqNf.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/Audience-B-Ekmwq0.js","assets/Aujourdhui-Cc9i1jvS.js","assets/avant-le-fauteuil-lecture-BzoFOAfc.js","assets/AvantLeFauteuil-B5a8wGs-.js","assets/avis-fiches-DJp3ljzn.js","assets/AvisGoogle-BxgTOm3u.js","assets/AvisGoogle-DaPXfwX9.css","assets/bilan-B-bfPYR0.css","assets/bilan-C-Qq35px.js","assets/BilanMensuel-D-pGD7_z.js","assets/Branches-CGh7qn-e.js","assets/bridges-C4bctS5n.js","assets/Caisse-CcTycxT0.js","assets/caisse-du-soir-CPjVZ4tS.js","assets/Caisses-DcG3Rvlc.js","assets/Calendrier-OaKZGTD9.js","assets/campagnes-pur-Bwet1uXP.js","assets/Carnet-C8UPef1W.js","assets/carte-D_9qGfGh.js","assets/carte-_W_-xBPj.css","assets/CarteModal-D93FqWA2.js","assets/CartesCadeaux-BKpH5M9W.js","assets/Catalogue-CR_4Dp6j.js","assets/CentreDeCommande-DbfrRt5Z.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-Oz5t2dyx.js","assets/certificat-B9uyIQGh.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-BqwT0R80.js","assets/ChiffreDesPrestations-CGXiZKL2.js","assets/client-BvFNjV_8.js","assets/cloture-du-jour-BzQtzGod.js","assets/ClotureDuTiroir-C6vPx-E_.css","assets/ClotureDuTiroir-l7MeDtkj.js","assets/Coffre-C7xvZXKr.js","assets/components-m6-HE72l.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-C8yLzdf_.js","assets/Comptes-BMODZoju.js","assets/consultation-Bii-cvC1.js","assets/consultation-CRW6QcWf.css","assets/Consultations-9nGmH4Hw.js","assets/consultNotes-Yo5iRvsq.js","assets/Conversations-D4WwB5Zo.css","assets/Conversations-Wq0sHtJX.js","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-NeN7GXJ-.js","assets/currency-qfIhGmrs.js","assets/Customers-97IMGI6_.js","assets/Dashboard-CaVKHmmG.js","assets/Dashboard-zjGteuUE.css","assets/dates-BirjMjgQ.js","assets/Demandes-CG5M6_kg.js","assets/Depenses-BYHrf9D5.js","assets/depenses-saisie-yJGVakGS.js","assets/dernier-message-pur-CBYWnq8m.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-BkcHbI2j.js","assets/diagnostics-au-trone-CyNSxmiF.js","assets/Dictee-CC2P4w7_.js","assets/Dictee-D2P9yM7v.css","assets/dictee-pur-Cz0AmQjX.js","assets/Discussions-Bmd0Y9Nu.js","assets/EditeurDesOffres-BNXmtXNG.js","assets/Encaissements-Dh5o66IR.js","assets/enfants-CWdQo8f9.js","assets/Engagements-Cj5S9MhG.css","assets/Engagements-D89pzYbo.js","assets/EntreDeuxSeances-Drf1sFJO.js","assets/Evaluation-9gJmgen0.js","assets/FacturePrestataire-DGDrPmQt.js","assets/Factures-DQCkY3ZD.js","assets/FenetreDesCivilites-C3Es4LM9.js","assets/FenetreDesCivilites-zfNk1aak.css","assets/FenetreDuPoint-DU49fodp.js","assets/Fil-5D_vHfr_.js","assets/finances-BMFnlkRx.css","assets/fon-VuGK4FM6.js","assets/Fournisseurs-BI-Aw5bZ.js","assets/fournisseurs-CNLX_e5y.js","assets/foyer-BTrHxhjj.js","assets/Gerard-Bfp4ua88.css","assets/Gerard-CS6e4QHb.js","assets/gerard-donnees-BU0-MsMJ.js","assets/gestes-conversation-Dmeqql6h.js","assets/HomeRituals-SvuKvyT7.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-BkjWiXXl.js","assets/ia-centre-CmObbPve.js","assets/ia-diagnostic-pur-BBLrGY5l.js","assets/ia-marque-pur-C5lSdGpx.js","assets/identite-MZ6U-5Jo.js","assets/index-BNcMRUbO.js","assets/index.es-DRVJXxoC.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-EC2mVX13.js","assets/jspdf.es.min-BBNzFaVE.js","assets/JustePrix-CDDMAYvF.js","assets/kkiapay-CJCiW-Ru.js","assets/kkiapay-widget-DnUhUNd4.js","assets/la-journee-DNg04cPb.css","assets/la-journee-XcgvqpKN.js","assets/Laboratoire-Np_HYdIA.js","assets/LaJournee-CfTqvU1c.js","assets/LettresAuDossier-BoXU5oNe.js","assets/LienMndPay-DQrLTH_-.js","assets/maisons-CSSFrqZy.js","assets/Marketing-C3neKqOu.js","assets/MarketingBranche-CVJGdr4R.js","assets/Marque-Gr3jbL0D.js","assets/MesPourboires-CB-WXrSB.js","assets/MesPourboires-D9I_9rZf.css","assets/MesTaches-BcA1xr_g.js","assets/MesTaches-Cc4XUDf6.css","assets/momo-C2ZVfV9J.js","assets/MonMois-DiYwH_hw.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/objectifs-DIZqqULU.js","assets/opale-Ba1d_CnT.js","assets/paliers-BPsWmO6Z.js","assets/Parametres-C5PRNo8n.js","assets/parcours-CtiCU_5K.js","assets/Parrainages-BO5y0oIN.js","assets/Parrainages-gAHAPB_6.css","assets/PassageAvantLeFauteuil-DwJVMekq.js","assets/pdf-Bf-xeh17.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/Personas-CZjpgCpg.js","assets/Personnel-C_QhUEx_.js","assets/photo-Cre4DE_F.js","assets/pilotage-D8kf1Co8.css","assets/Pourboires-BBBIx0k_.js","assets/Predictions-j54ZdFzy.js","assets/Prestataires-DxE0efSV.js","assets/Prets-_X0Y3jpD.js","assets/prevision-du-mois-pur-D6sJa5lw.js","assets/Previsions-D-0__Buz.css","assets/Previsions-h-KzgkbW.js","assets/previsions-pur-Bm8hxG-9.js","assets/processus-pur-BLN25j-E.js","assets/projets-B8fXNklW.js","assets/Projets-COO7WDEE.css","assets/Projets-DdgkwXsm.js","assets/projets-pur-2ZEMRNDU.js","assets/protocoles-BBIwGS7g.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-CgVOwoS8.js","assets/qualification-J5miGRHm.js","assets/quiz-5qMPWZVi.js","assets/Rapport-DFJFwreF.js","assets/Recommandations-Z4U_cQEA.js","assets/regler-BprwhdxX.js","assets/regler-C5hcM02_.css","assets/regler-la-seance-serveur-Bs6rzqZX.js","assets/relances-pur-lwRTXc5E.js","assets/releve-des-avis-B7A1OBlX.js","assets/SalonFoyer-DYoOp14h.js","assets/secretariat-admin-Cb3XARwY.js","assets/Secretariat-CP0u-4_L.js","assets/Secretariat-Cy79Zw30.css","assets/Signatures-Cda0cgaB.js","assets/SignerUnPdf-CphvHJtI.js","assets/Synthese-BbgDg9Bz.js","assets/SyntheseGraphes-Dzg2jFV2.js","assets/systeme-TPy-pF7j.css","assets/Tableau-C9SXzX7j.js","assets/temps-_faCycgP.js","assets/Textes-D1TdF1hZ.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-CkDzpGy0.css","assets/tiroirs-YhdCneyi.js","assets/trone-CzCPHBiP.js","assets/trone-Dk3AL2NO.css","assets/useAudiences-BXv-x8zv.js","assets/Vitrine-BWilTqQJ.css","assets/Vitrine-ojFN4Abw.js","assets/_admin-BGPiIg9b.js","assets/_contrat-dL4QVv1k.js","assets/_heures-DGxiK2rz.js","assets/_reuni-l9Rt1gjG.js","assets/_shared-XkscAm5E.js","assets/_signature-Ds46Gp8Y.js","assets/_ui-BWMA-PlM.css","assets/_ui-DRH3YpDO.js"];
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
