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
const BUILD = "20261027101901";
const A_GARDER = ["./","assets/abonnements-DNSUOdfP.js","assets/Abonnements-YaDY55dJ.js","assets/Academie-Conw39fe.js","assets/Acces-CdjwKsmt.js","assets/actions-QzzgGWXT.js","assets/afaire-CcNCJnzU.js","assets/AFaire-DFaZO0jz.js","assets/Agents-BksLCDfe.js","assets/agents-donnees-DNq6C5gd.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-CxcAAvYP.js","assets/Appels-2nultZh7.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/AtelierDesContenus-SiEPvx46.js","assets/AuComptoir-B81brYTZ.js","assets/Audience-4z2lcOGI.js","assets/Aujourdhui-BnXpeAyU.js","assets/avis-fiches-Flj-TXT_.js","assets/AvisGoogle-D81YJY9x.js","assets/AvisGoogle-DaPXfwX9.css","assets/bilan-B-bfPYR0.css","assets/bilan-Cn_Oje5R.js","assets/BilanMensuel-ClOSqxxo.js","assets/Branches-64Cid3ee.js","assets/bridges-CAhG79hm.js","assets/Caisse-DF4iCwe2.js","assets/caisse-du-soir-Bh2FZ6bj.js","assets/Caisses-Dzar4Dm6.js","assets/Calendrier-C3t_hVD0.js","assets/campagnes-pur-_EBy3lxG.js","assets/Carnet-BMDv3QJ6.js","assets/carte-th9cDhKL.js","assets/carte-_W_-xBPj.css","assets/CarteModal-Cw2yeOsz.js","assets/CartesCadeaux-EeKbysne.js","assets/Catalogue-CXWG_srC.js","assets/CentreDeCommande-Du8kyJhp.css","assets/CentreDeCommande-OeRyAdVJ.js","assets/Cercle-BRcyaMWw.js","assets/certificat-NFNwrjcz.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-CRKIBCuB.js","assets/chiffre-du-jour-pur-BYde51Ez.js","assets/ChiffreDesPrestations-Cqu1WjQW.js","assets/client-R7WZsS4b.js","assets/ClotureDuTiroir-BBRUG1HU.js","assets/ClotureDuTiroir-C6vPx-E_.css","assets/Coffre-BdcHhfZL.js","assets/components-DUGE4VRl.js","assets/compte-courant-ByzulCEN.js","assets/compte-TWuSjAoq.js","assets/CompteCourant-lohIEra6.js","assets/Comptes-B8C_2RG1.js","assets/Comptoir-BhUtNwuO.js","assets/consultation-CRW6QcWf.css","assets/consultation-i7kFU3pq.js","assets/Consultations-vH5qFZqR.js","assets/consultNotes-GCUKg5tJ.js","assets/Conversations-CIMInm01.js","assets/Conversations-D4WwB5Zo.css","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-DzC6qnIT.js","assets/currency-qfIhGmrs.js","assets/Customers-Dj5MUG45.js","assets/Dashboard-5SZZV9Uf.js","assets/Dashboard-BkDQjGRE.css","assets/dates-jaMGJ9zd.js","assets/Demandes-0RzTpz8w.js","assets/Depenses-XJdMK0PI.js","assets/dernier-message-pur-CBYWnq8m.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-CgT_Sv28.js","assets/diagnostics-au-trone-rmLlYNyf.js","assets/Discussions-ByDXxo0C.js","assets/EditeurDesOffres-jXSlYqPF.js","assets/Encaissements-CBiQgC3c.js","assets/enfants-CFSH5pBy.js","assets/Engagements-Cj5S9MhG.css","assets/Engagements-DxJ1ummd.js","assets/EntreDeuxSeances-C73lNQ5Q.js","assets/equipe-B_9ZHz24.css","assets/Evaluation-DAYIsNnl.js","assets/FacturePrestataire-DY14J6ng.js","assets/Factures-B7eQJUej.js","assets/Fil-DO0U34jY.js","assets/finances-BMFnlkRx.css","assets/fon-DqEYHHMs.js","assets/fon-pur-CgVkbJ8O.js","assets/fournisseurs-D6CSPh4F.js","assets/Fournisseurs-sTZkyETg.js","assets/foyer-BNkcwTof.js","assets/Gerard-DhUuljX-.js","assets/gerard-donnees-BjpTZ9XP.js","assets/Gerard-DSdRRMPF.css","assets/gestes-conversation-DHinmqWF.js","assets/HomeRituals-DqWydtgV.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-BqKnBxLi.js","assets/ia-centre-CVJYdKRh.js","assets/ia-diagnostic-pur-hHYxp10Y.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-recu-pur-DcucZqpR.js","assets/identite-GC2nBRqe.js","assets/index-BoqsjgWH.js","assets/index.es-mWwGfHll.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-NGGvdDvF.js","assets/jspdf.es.min-CZXvUm5f.js","assets/JustePrix-zDjbKJEP.js","assets/kkiapay-Cyqnv3Aa.js","assets/kkiapay-widget-DnUhUNd4.js","assets/laboratoire-C39-lXLA.js","assets/Laboratoire-DgtLSJ4q.js","assets/LettresAuDossier-DB3z6_m0.js","assets/LienMndPay-D0-KLu9H.js","assets/maisons-CSSFrqZy.js","assets/Marketing-DTkxVhD2.js","assets/MarketingBranche-C4daNKXP.js","assets/Marque-_XE9BD78.js","assets/MesTaches-Cc4XUDf6.css","assets/MesTaches-DFm5v9eH.js","assets/momo-C2ZVfV9J.js","assets/MonMois-Cs38Zj35.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-BiFQZLjr.js","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/paliers-YxAZYxeo.js","assets/Parametres-ByJBl9UD.js","assets/parcours-0z18MGDa.js","assets/Parrainages-DVoFoMzQ.js","assets/Parrainages-gAHAPB_6.css","assets/pdf-C4N708vO.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/Personas-84QejRiF.js","assets/Personnel-Cz0pSU-f.js","assets/photo-D_getuyL.js","assets/pilotage-D8kf1Co8.css","assets/Predictions-1N8hQw_Z.js","assets/prestataires-BUFCyw2G.js","assets/Prestataires-D2eCL2xz.js","assets/Prets-DC-XXclE.js","assets/prevision-du-mois-pur-D6sJa5lw.js","assets/Previsions-CWgqJh3z.js","assets/Previsions-D-0__Buz.css","assets/previsions-pur--HUoWt1-.js","assets/processus-pur-BLN25j-E.js","assets/Projets-COO7WDEE.css","assets/projets-CxAGfUbH.js","assets/Projets-EnicQlKJ.js","assets/projets-pur-2ZEMRNDU.js","assets/protocoles-CzOOLpg3.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-DHlzsI0b.js","assets/qualification-ZFxiASu0.js","assets/quiz-5qMPWZVi.js","assets/Rapport-DrZ52-yr.js","assets/RattacherUneCarte-Ca2PAzWu.js","assets/Recommandations-D5i8x055.js","assets/regler-C5hcM02_.css","assets/regler-CBouSrDf.js","assets/regler-la-seance-serveur-BpExlC5z.js","assets/relances-pur-DsIo28uB.js","assets/releve-des-avis-B6I58Gtk.js","assets/SalonFoyer-BDzeMZvx.js","assets/Secretariat-ACS9xOf5.js","assets/secretariat-admin-Cslah9KL.js","assets/Secretariat-Cy79Zw30.css","assets/Signatures-Dt3anGuI.js","assets/SignerUnPdf-KDrJ30lg.js","assets/Synthese-B-Wiza7y.js","assets/SyntheseGraphes-RtgOrNq3.js","assets/systeme-C3XFIa8E.css","assets/Tableau-BLOQiVki.js","assets/Textes-DLpOzRbT.css","assets/Textes-fZUdbX9H.js","assets/tiroirs-BkTYFq6c.js","assets/trace-du-moyen-pur-Bx8-suHn.js","assets/trone-CfGCPWMq.css","assets/trone-DZTOYijV.js","assets/ui-tNZ0lXNm.js","assets/useAudiences-CVj6P21d.js","assets/vente-C7YWXkHo.css","assets/Vitrine-BcsxTaqF.js","assets/Vitrine-BWilTqQJ.css","assets/_admin-ujIiYrIH.js","assets/_contrat-BK-dihT_.js","assets/_heures-Bvd7TU1Z.js","assets/_reuni-ZinjDG9W.js","assets/_shared-BTRRBK-4.js","assets/_signature-CtZbMQRg.js","assets/_ui-BWMA-PlM.css","assets/_ui-oekQ7lJc.js"];
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
