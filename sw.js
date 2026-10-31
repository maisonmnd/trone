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
const BUILD = "20261031071356";
const A_GARDER = ["./","assets/Abonnements-A_uL1WeN.js","assets/abonnements-CyRQQUVs.js","assets/Academie-CQhFyQyO.js","assets/Acces-CnqfVx40.js","assets/actions-BfYKjk-t.js","assets/AFaire-BNSxGbAQ.js","assets/afaire-MlpczePo.js","assets/Agents-a9G5tjbZ.js","assets/agents-donnees-BUPVjiPs.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-DCVYXE5d.js","assets/Appels-ChubbJKi.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/AtelierDesContenus-CpPFyVWG.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/AuComptoir-DCIBZ9ZL.js","assets/Audience-DGhFcL4x.js","assets/Aujourdhui-DglXIqA7.js","assets/avis-fiches-CtwM9zLj.js","assets/AvisGoogle-D3Kx-hev.js","assets/AvisGoogle-DaPXfwX9.css","assets/bilan-B-bfPYR0.css","assets/bilan-juImVDvl.js","assets/BilanMensuel-CBV9c_HN.js","assets/Branches-D1cmnynf.js","assets/bridges-us_rqt3Y.js","assets/Caisse-BVWgNyYN.js","assets/caisse-du-soir-7H1ASCoa.js","assets/Caisses-DioxNvAy.js","assets/Calendrier-B3CHU7Yt.js","assets/campagnes-pur-9hH1QVuq.js","assets/Carnet-DkeFwpPX.js","assets/carte-EqlFhU2H.js","assets/carte-_W_-xBPj.css","assets/CarteModal-B2UvkjrK.js","assets/CartesCadeaux-CQHOj2wN.js","assets/Catalogue-C5fqfFxm.js","assets/CentreDeCommande-CgotuzIW.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-ueQkL46S.js","assets/certificat-zvlciltM.css","assets/certificat-_lere9jn.js","assets/certificats-coffre-BGdnMJMc.js","assets/chiffre-du-jour-pur-Du3QwT1r.js","assets/ChiffreDesPrestations-vimGBknP.js","assets/client-BBxp3HYZ.js","assets/ClotureDuTiroir-C6vPx-E_.css","assets/ClotureDuTiroir-CTEkZ3Do.js","assets/Coffre-S4nV2urg.js","assets/components-DjeNdrgq.js","assets/compte-courant-ByzulCEN.js","assets/compte-SocXHbxf.js","assets/CompteCourant-Bzw5r53F.js","assets/Comptes-nYsLljBm.js","assets/Comptoir-CougDhHY.js","assets/consultation-0ykOQpVJ.js","assets/consultation-CRW6QcWf.css","assets/Consultations-BIz7p_bC.js","assets/consultNotes-DNFGW2GH.js","assets/Conversations-D4WwB5Zo.css","assets/Conversations-kh0LeLkb.js","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-DxhncfMF.js","assets/currency-qfIhGmrs.js","assets/Customers-DIUqAWhb.js","assets/Dashboard-BZzyyW_b.js","assets/Dashboard-zjGteuUE.css","assets/dates-C3yfhB1H.js","assets/Demandes-BU3DycQj.js","assets/Depenses-mpMBQt7O.js","assets/dernier-message-pur-CBYWnq8m.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-VLTLO996.js","assets/diagnostics-au-trone-BsfIPNwG.js","assets/Dictee-D2P9yM7v.css","assets/Dictee-DrE0fDLJ.js","assets/dictee-pur-s6Ux8Uxz.js","assets/Discussions-gXg-E5XM.js","assets/EditeurDesOffres-C7dZCuun.js","assets/Encaissements-CAP0cr2n.js","assets/enfants-C1VHMva3.js","assets/Engagements-BimVWJz4.js","assets/Engagements-Cj5S9MhG.css","assets/EntreDeuxSeances-CkZMT-Xs.js","assets/equipe-B_9ZHz24.css","assets/Evaluation-PHdWCXC_.js","assets/FacturePrestataire-DsFIDiTm.js","assets/Factures-DoLao4T3.js","assets/FenetreDesCivilites-BI3wF1lI.js","assets/FenetreDesCivilites-zfNk1aak.css","assets/FenetreDuPoint-Bz9RzxFX.js","assets/Fil-ytPEaUPV.js","assets/finances-BMFnlkRx.css","assets/fon-pur-CgVkbJ8O.js","assets/fon-YxVLCNov.js","assets/Fournisseurs-B4RjM7Us.js","assets/fournisseurs-BlC6R3_j.js","assets/foyer-BaGq_Ng6.js","assets/Gerard-C9ljG_Nk.css","assets/Gerard-CbM8OTRW.js","assets/gerard-donnees-BEs6vfOh.js","assets/gestes-conversation-CjkzuVOJ.js","assets/HomeRituals-xNqT1GDF.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-Dv_goqYo.js","assets/ia-centre-BW4_yvfI.js","assets/ia-diagnostic-pur-BBLrGY5l.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-recu-pur-DcucZqpR.js","assets/identite-Ct0UVa3N.js","assets/index-fx4vf2dr.js","assets/index.es-DhDCgt6p.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-hdSX2c5U.js","assets/jspdf.es.min-Di4c622i.js","assets/JustePrix-D-fp6isa.js","assets/kkiapay-B3DRXfEK.js","assets/kkiapay-widget-DnUhUNd4.js","assets/laboratoire-Cwo8_kK1.js","assets/Laboratoire-CyPMRb8j.js","assets/LettresAuDossier-CHeLFUCU.js","assets/LienMndPay-6qsK0z6_.js","assets/maisons-CSSFrqZy.js","assets/Marketing-COFXInkN.js","assets/MarketingBranche-CHIrdcwl.js","assets/Marque-GjRIYOES.js","assets/MesTaches-Cc4XUDf6.css","assets/MesTaches-CT_lCOGn.js","assets/momo-B-QSeWY6.js","assets/MonMois-ydtbYUQf.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-0BsOrhJG.js","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/paliers-DsrkVnHL.js","assets/Parametres-bbAamnyx.js","assets/parcours-DqAL6ZET.js","assets/Parrainages-CAYuEqc0.js","assets/Parrainages-gAHAPB_6.css","assets/pdf-VJcNm7C7.js","assets/pdf-xyfRiVrk.js","assets/pdf.worker.min-uNib_u9P.js","assets/Personas-BDJ0VhTo.js","assets/Personnel-Cwgphfbu.js","assets/photo-BKyOosyp.js","assets/pilotage-D8kf1Co8.css","assets/Predictions-Bywwr0hL.js","assets/prestataires-CeVyOeUY.js","assets/Prestataires-CoO3UXX9.js","assets/Prets-D4TRbreR.js","assets/prevision-du-mois-pur-D6sJa5lw.js","assets/Previsions-D-0__Buz.css","assets/Previsions-DYRJB0lj.js","assets/previsions-pur-CEL9yqVH.js","assets/processus-pur-BLN25j-E.js","assets/Projets-6g8G_z_N.js","assets/Projets-COO7WDEE.css","assets/projets-pur-2ZEMRNDU.js","assets/projets-q47pp2YU.js","assets/protocoles-wewrf1wm.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-5R6uXsj5.js","assets/qualification-DxGOf5Se.js","assets/quiz-5qMPWZVi.js","assets/Rapport-Dp89sVze.js","assets/RattacherUneCarte-CowTo1gR.js","assets/Recommandations-DUEf9p-7.js","assets/regler-C5hcM02_.css","assets/regler-CXBJtoov.js","assets/regler-la-seance-serveur-Bs6rzqZX.js","assets/relances-pur-lwRTXc5E.js","assets/releve-des-avis-hkj35INu.js","assets/SalonFoyer-coOBCnbj.js","assets/secretariat-admin-CQJ2M7TP.js","assets/Secretariat-Cy79Zw30.css","assets/Secretariat-d4smXuiY.js","assets/Signatures-_xpK_FW1.js","assets/SignerUnPdf-DznKOEzf.js","assets/Synthese-DRgGVd4J.js","assets/SyntheseGraphes-BhR0SzeL.js","assets/systeme-TPy-pF7j.css","assets/Tableau-DOjLUYAZ.js","assets/temps-BIJZNlij.js","assets/Textes-DLpOzRbT.css","assets/Textes-UOuO_Fo-.js","assets/tiroirs-wBfiytNS.js","assets/trace-du-moyen-pur-Bx8-suHn.js","assets/trone-9siIy66m.css","assets/trone-AmkCWCsM.js","assets/ui-Dxo2Hv9A.js","assets/useAudiences-BwAo33HF.js","assets/vente-C7YWXkHo.css","assets/Vitrine-BWilTqQJ.css","assets/Vitrine-soNqHLT2.js","assets/_admin-DUdFWway.js","assets/_contrat-zZMh-2EL.js","assets/_heures-8t1PjoQD.js","assets/_reuni-B4qcOhDm.js","assets/_shared-D4JTmFqo.js","assets/_signature-D_0qwRb0.js","assets/_ui-BWMA-PlM.css","assets/_ui-wWLnl190.js"];
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
