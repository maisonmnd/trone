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
const BUILD = "20261027102853";
const A_GARDER = ["./","assets/abonnements-BPIyln3H.js","assets/Abonnements-D4IUl9fj.js","assets/Academie-DuDrE-uW.js","assets/Acces-ML4kyntS.js","assets/actions-DmuT402I.js","assets/afaire-DVZbrjV9.js","assets/AFaire-xlou7r0k.js","assets/agents-donnees-BqrrCqp-.js","assets/Agents-LEr6pgmX.css","assets/Agents-LJqGt6Y1.js","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-Bgk7BOhq.js","assets/Appels-D_KAGbXw.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/AtelierDesContenus-Ct-GiD8X.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/AuComptoir-BbF6Q4WD.js","assets/Audience-DS7T-dlg.js","assets/Aujourdhui-XM9zyLa1.js","assets/avis-fiches-BArMJeds.js","assets/AvisGoogle-DaPXfwX9.css","assets/AvisGoogle-gUQmt6LW.js","assets/bilan-B-bfPYR0.css","assets/bilan-C67absB1.js","assets/BilanMensuel-DxX9BqRL.js","assets/Branches-BbX7mKg-.js","assets/bridges-QM3Z2cdC.js","assets/Caisse-BJqHvhL3.js","assets/caisse-du-soir-BFfJpI-M.js","assets/Caisses-BTO3g3dr.js","assets/Calendrier-BhxlHe8d.js","assets/campagnes-pur-Cfd5HxT2.js","assets/Carnet-DFOgHqSE.js","assets/carte-Bw2Qf0JD.js","assets/carte-_W_-xBPj.css","assets/CarteModal-gBB3H3z5.js","assets/CartesCadeaux-CDz4y65p.js","assets/Catalogue-8vHJ7KVA.js","assets/CentreDeCommande-Du8kyJhp.css","assets/CentreDeCommande-Utsi3337.js","assets/Cercle-CAP3nDbK.js","assets/certificat-49FlKay9.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-OIHoIWj7.js","assets/chiffre-du-jour-pur-BZTjWBH9.js","assets/ChiffreDesPrestations-BD3E1jqJ.js","assets/client-pmIzlHwj.js","assets/ClotureDuTiroir-C6vPx-E_.css","assets/ClotureDuTiroir-HuRXv3NY.js","assets/Coffre-DI9bOl-8.js","assets/components-Dy2qPXqr.js","assets/compte-courant-ByzulCEN.js","assets/compte-QoN9tI2a.js","assets/CompteCourant-CUxp_LI8.js","assets/Comptes-BZpufp2A.js","assets/Comptoir-Dx27lWaI.js","assets/consultation-BgN4aRkw.js","assets/consultation-CRW6QcWf.css","assets/Consultations-B0oDKeFi.js","assets/consultNotes-C3kssoVq.js","assets/Conversations-BPwCD8Ge.js","assets/Conversations-D4WwB5Zo.css","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-DfMmr6TC.js","assets/currency-qfIhGmrs.js","assets/Customers-PSdadf_C.js","assets/Dashboard-BmOcQsh_.js","assets/Dashboard-zjGteuUE.css","assets/dates-D9b957f1.js","assets/Demandes-C6oTsbG6.js","assets/Depenses--iXJ3Zqt.js","assets/dernier-message-pur-CBYWnq8m.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-DveSM-Uv.js","assets/diagnostics-au-trone-N7e7UnsB.js","assets/Discussions-JASwtYj7.js","assets/EditeurDesOffres-B9824A7A.js","assets/Encaissements-CihXUlet.js","assets/enfants-Cub503sm.js","assets/Engagements-BifvwE_z.js","assets/Engagements-Cj5S9MhG.css","assets/EntreDeuxSeances-CkI7VWEM.js","assets/equipe-B_9ZHz24.css","assets/Evaluation-BeGRxv_S.js","assets/FacturePrestataire-DHNmBz33.js","assets/Factures-Bl-0gFVh.js","assets/Fil-CZvpZ6-X.js","assets/finances-BMFnlkRx.css","assets/fon-pur-CgVkbJ8O.js","assets/fon-qRVnXdhC.js","assets/fournisseurs-CYFJVvCZ.js","assets/Fournisseurs-DNMAxukc.js","assets/foyer-BEjq4iC6.js","assets/Gerard-B_UEp591.js","assets/gerard-donnees-jwn2qmFZ.js","assets/Gerard-DSdRRMPF.css","assets/gestes-conversation-BOPhwn4q.js","assets/HomeRituals-CHrKNDcI.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-C6Nybccz.js","assets/ia-centre-DzP7tqNo.js","assets/ia-diagnostic-pur-hHYxp10Y.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-recu-pur-DcucZqpR.js","assets/identite-DkajeeaX.js","assets/index-felIA5hn.js","assets/index.es-J7DafvBn.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-De1MzxEr.js","assets/jspdf.es.min-Bk4Z69hG.js","assets/JustePrix-YrmBQmIS.js","assets/kkiapay-L6KR2p1F.js","assets/kkiapay-widget-DnUhUNd4.js","assets/laboratoire-Bl9oJWpv.js","assets/Laboratoire-Ys5FPJZb.js","assets/LettresAuDossier-B8TV6hQ5.js","assets/LienMndPay-kof5atGb.js","assets/maisons-CSSFrqZy.js","assets/Marketing-N8t7d0zz.js","assets/MarketingBranche-C6aHLT0C.js","assets/Marque-Dwv8nYAd.js","assets/MesTaches-Cc4XUDf6.css","assets/MesTaches-YfKsBUfs.js","assets/momo-C2ZVfV9J.js","assets/MonMois-BE1AWGsI.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-BM7cupxb.js","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/paliers-8Zfg4rvc.js","assets/Parametres-Ca0Ufl69.js","assets/parcours-BzrV2Nl-.js","assets/Parrainages-CmbrqOz3.js","assets/Parrainages-gAHAPB_6.css","assets/pdf-Dgx-hGgI.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/Personas-BvehvwQp.js","assets/Personnel-nArJgXlh.js","assets/photo-TI_SFDxq.js","assets/pilotage-D8kf1Co8.css","assets/Predictions-Dxx5aKNa.js","assets/prestataires-D7KORK9j.js","assets/Prestataires-qsXcTXYx.js","assets/Prets-CHGw01Ku.js","assets/prevision-du-mois-pur-D6sJa5lw.js","assets/Previsions-D-0__Buz.css","assets/previsions-pur-wGfnLD6R.js","assets/Previsions-XAKOfFZq.js","assets/processus-pur-BLN25j-E.js","assets/Projets-B3Lg5EKn.js","assets/projets-BQXGCcPk.js","assets/Projets-COO7WDEE.css","assets/projets-pur-2ZEMRNDU.js","assets/protocoles-CzDnufPV.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-DxQJEujb.js","assets/qualification-Nx-F5Yv9.js","assets/quiz-5qMPWZVi.js","assets/Rapport-Ctk2INcC.js","assets/RattacherUneCarte-Ci-jXhu1.js","assets/Recommandations-bHlxonXF.js","assets/regler-C5hcM02_.css","assets/regler-CvB7cNXa.js","assets/regler-la-seance-serveur-BpExlC5z.js","assets/relances-pur-DsIo28uB.js","assets/releve-des-avis-ii4OMhe_.js","assets/SalonFoyer-CB3mvUOh.js","assets/secretariat-admin-CZ1RBQD4.js","assets/Secretariat-CPbv2i76.js","assets/Secretariat-Cy79Zw30.css","assets/Signatures-9C9_gqFW.js","assets/SignerUnPdf-BOBzrAo0.js","assets/Synthese-DSRbqK9Y.js","assets/SyntheseGraphes-BA53nIyq.js","assets/systeme-C3XFIa8E.css","assets/Tableau-CEw2ssXR.js","assets/Textes-DLpOzRbT.css","assets/Textes-Sb84yvHQ.js","assets/tiroirs-DuYqGLJG.js","assets/trace-du-moyen-pur-Bx8-suHn.js","assets/trone-B3_jpoqf.js","assets/trone-CfGCPWMq.css","assets/ui-B0QXPiP3.js","assets/useAudiences-CTlzLXyJ.js","assets/vente-C7YWXkHo.css","assets/Vitrine-BWilTqQJ.css","assets/Vitrine-CzCQTcmr.js","assets/_admin-1uFHSGRe.js","assets/_contrat-hyf8Y0kQ.js","assets/_heures-DjUZW3PV.js","assets/_reuni-fRyHnP7v.js","assets/_shared-ANd5PuyI.js","assets/_signature-DjTzFN-S.js","assets/_ui-BWMA-PlM.css","assets/_ui-WkgCP3FO.js"];
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
