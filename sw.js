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
const BUILD = "20261028091121";
const A_GARDER = ["./","assets/Abonnements-cjIwmH8l.js","assets/abonnements-mXobNTbz.js","assets/Academie-e5YTnZz5.js","assets/Acces-C_6ZJ7hH.js","assets/actions-BhyzH6fJ.js","assets/AFaire-gmXvXdNK.js","assets/afaire-w5GQkybr.js","assets/Agents-D4-2-6qJ.js","assets/agents-donnees-Ck7pA9t3.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-kiSJPmOb.js","assets/Appels-Pq3eG7be.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/AtelierDesContenus-DJxpb50A.js","assets/AuComptoir-CNOT9pQi.js","assets/Audience-Co1qS4yR.js","assets/Aujourdhui-DKhe-sOm.js","assets/avis-fiches-C5wKA1HD.js","assets/AvisGoogle-DaPXfwX9.css","assets/AvisGoogle-ZLPP17WI.js","assets/bilan-B-bfPYR0.css","assets/bilan-Xcc6fhzp.js","assets/BilanMensuel-ZG4fGDbT.js","assets/Branches-DsyBAWyk.js","assets/bridges-BcfLIvRt.js","assets/Caisse-CA3NmhTx.js","assets/caisse-du-soir-Bfuj7nNl.js","assets/Caisses-Dkb2p5Nu.js","assets/Calendrier-By_OleS5.js","assets/campagnes-pur-uoPyvzv9.js","assets/Carnet-BPMt0Veb.js","assets/carte-BePLIskZ.js","assets/carte-_W_-xBPj.css","assets/CarteModal-BMBe69Fs.js","assets/CartesCadeaux-B-WkXR2n.js","assets/Catalogue-VI-sMvZD.js","assets/CentreDeCommande-DFKILPHc.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-D5vTARn5.js","assets/certificat-CPK7q6wn.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-D4L0lecb.js","assets/chiffre-du-jour-pur-_JoWoOw1.js","assets/ChiffreDesPrestations-LPFep_EZ.js","assets/client-VbuD3JLy.js","assets/ClotureDuTiroir-BHXk-Stg.js","assets/ClotureDuTiroir-C6vPx-E_.css","assets/Coffre-rBVAr1Yu.js","assets/components-CdeUFPvT.js","assets/compte-courant-ByzulCEN.js","assets/compte-GT0rxFwU.js","assets/CompteCourant-CbEWfVOU.js","assets/Comptes-CS_TJaJZ.js","assets/Comptoir-BYwr2MoC.js","assets/consultation-CRW6QcWf.css","assets/consultation-CtSPVlkt.js","assets/Consultations-v3tFP3iJ.js","assets/consultNotes-D3jVT3wt.js","assets/Conversations-D4WwB5Zo.css","assets/Conversations-KvD2aDew.js","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-ChKASx4v.js","assets/currency-qfIhGmrs.js","assets/Customers-BP68Qkoz.js","assets/Dashboard-BMAt8nBm.js","assets/Dashboard-zjGteuUE.css","assets/dates-XtTygIX_.js","assets/Demandes-CFNXFzZ1.js","assets/Depenses-Da9o32SI.js","assets/dernier-message-pur-CBYWnq8m.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-Dlp5uCqC.js","assets/diagnostics-au-trone-Dpc_WCrT.js","assets/Discussions-Htrq8FCG.js","assets/EditeurDesOffres-Dzop-nw2.js","assets/Encaissements-Dbmlor8y.js","assets/enfants-tauaYatO.js","assets/Engagements-CGxfZrU2.js","assets/Engagements-Cj5S9MhG.css","assets/EntreDeuxSeances-BoELtf3X.js","assets/equipe-B_9ZHz24.css","assets/Evaluation-DKIfyyVA.js","assets/FacturePrestataire-DXjPZj6J.js","assets/Factures-N3mKwzu_.js","assets/FenetreDuPoint-ZGS_0A-M.js","assets/Fil-CYYwrqGi.js","assets/finances-BMFnlkRx.css","assets/fon-iUqZZ2PU.js","assets/fon-pur-CgVkbJ8O.js","assets/fournisseurs-BNUzDear.js","assets/Fournisseurs-DaNAAgxF.js","assets/foyer-C6bYl7T1.js","assets/Gerard-CUvkbLSl.css","assets/Gerard-D6kEaLgg.js","assets/gerard-donnees-0oEwWCLA.js","assets/gestes-conversation-CfEJKwUS.js","assets/HomeRituals-DAVtTWAH.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-B51vkZIw.js","assets/ia-centre-BGP0XJ_1.js","assets/ia-diagnostic-pur-hHYxp10Y.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-recu-pur-DcucZqpR.js","assets/identite-_hFOiBV5.js","assets/index-CVm8qPYs.js","assets/index.es-BZJ2S4SD.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-9t4USRqt.js","assets/jspdf.es.min-C-k8zqhd.js","assets/JustePrix-BNLmEs3h.js","assets/kkiapay-Ct6kz2WI.js","assets/kkiapay-widget-DnUhUNd4.js","assets/laboratoire-DAfSm8Lz.js","assets/Laboratoire-DpYtxCDI.js","assets/LettresAuDossier-srDfUU2s.js","assets/LienMndPay-BS-XAzCP.js","assets/maisons-CSSFrqZy.js","assets/Marketing-BxEI6xqm.js","assets/MarketingBranche-DllY0LXj.js","assets/Marque-mDikpO9R.js","assets/MesTaches-Cc4XUDf6.css","assets/MesTaches-_a5I0KUJ.js","assets/momo-B-QSeWY6.js","assets/MonMois-DjzOrn3W.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/objectifs-DoPX2SCp.js","assets/paliers-CoyGrprT.js","assets/Parametres-Con_aGer.js","assets/parcours-GQkdyYG2.js","assets/Parrainages-DQ8eeGmI.js","assets/Parrainages-gAHAPB_6.css","assets/pdf-DjiI9Vbw.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/Personas-DgrrXeCY.js","assets/Personnel-z3N3IJic.js","assets/photo-QVdp2V-o.js","assets/pilotage-D8kf1Co8.css","assets/Predictions-DOTvc33P.js","assets/prestataires-C164hoc-.js","assets/Prestataires-D_ZTfJ3K.js","assets/Prets-DFCqAq1h.js","assets/prevision-du-mois-pur-D6sJa5lw.js","assets/Previsions-C1F4ORdq.js","assets/Previsions-D-0__Buz.css","assets/previsions-pur-2sm8DR_0.js","assets/processus-pur-BLN25j-E.js","assets/projets-C5-Jk0K8.js","assets/Projets-COO7WDEE.css","assets/projets-pur-2ZEMRNDU.js","assets/Projets-zxJ5l2_N.js","assets/protocoles-DmrzFrKz.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-C3s07GlP.js","assets/qualification-CaMjozVP.js","assets/quiz-5qMPWZVi.js","assets/Rapport-GhQlhMei.js","assets/RattacherUneCarte-ZUbrSk6r.js","assets/Recommandations-DVXfyZ5o.js","assets/regler-C073kOk0.js","assets/regler-C5hcM02_.css","assets/regler-la-seance-serveur-Bs6rzqZX.js","assets/relances-pur-Cod_JLfM.js","assets/releve-des-avis-C8JVAUau.js","assets/SalonFoyer-Tw9hUw-J.js","assets/secretariat-admin-CcVLcpIX.js","assets/Secretariat-BpkAvbWs.js","assets/Secretariat-Cy79Zw30.css","assets/Signatures-BHB3YPVE.js","assets/SignerUnPdf-DIR44iJN.js","assets/Synthese-DRudgkFX.js","assets/SyntheseGraphes-B3oAc4Cw.js","assets/systeme-C3XFIa8E.css","assets/Tableau-CPhCf92K.js","assets/temps-oAvpBPJr.js","assets/Textes-Bvtzohvn.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-DlYbRNXy.js","assets/trace-du-moyen-pur-Bx8-suHn.js","assets/trone-B11Qc66-.js","assets/trone-BMdkuVGH.css","assets/ui-CB4Hxbzx.js","assets/useAudiences-DhJNPg00.js","assets/vente-C7YWXkHo.css","assets/Vitrine-BWilTqQJ.css","assets/Vitrine-ove-XiSl.js","assets/_admin-Ba60jiYD.js","assets/_contrat-B8jGvn7b.js","assets/_heures-DHpzXXzg.js","assets/_reuni--t3iRmd1.js","assets/_shared-BHqgHRu_.js","assets/_signature-B9Vg4M08.js","assets/_ui-BWMA-PlM.css","assets/_ui-yDTEIX4G.js"];
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
