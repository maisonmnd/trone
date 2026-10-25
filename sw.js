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
const BUILD = "20261025160056";
const A_GARDER = ["./","assets/abonnements-DSfBPO68.js","assets/Abonnements-Dx9hjK2p.js","assets/Academie-Dv7N5W-2.js","assets/Acces-y1RamR-K.js","assets/actions-qYohUYgM.js","assets/AFaire-C6xH067c.js","assets/afaire-DlIb-4LT.js","assets/Agents-CMvZ8Atn.js","assets/agents-donnees-BCwSusgB.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-BuUWlSod.js","assets/Appels-HkJYLlfW.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/AtelierDesContenus-Bq0V0dYb.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/AuComptoir-DGxv2ROd.js","assets/Aujourdhui-CGwQGRo1.js","assets/avis-fiches-CsqG_tSr.js","assets/bilan-B-bfPYR0.css","assets/bilan-V17pNK1o.js","assets/BilanMensuel-C_rTGcO-.js","assets/Branches-3NjOY_Z9.js","assets/bridges-BzjcRSsf.js","assets/Caisse-ByOkuVTG.js","assets/caisse-du-soir-CB7g5pvL.js","assets/Caisses-suvW5lh1.js","assets/Calendrier-DY5yCqvN.js","assets/Carnet-aE5ZPztj.js","assets/carte-nJT1wnba.js","assets/carte-_W_-xBPj.css","assets/CarteModal-DL96HZ5R.js","assets/CartesCadeaux-BIOw6nrL.js","assets/Catalogue-C7fZNRAU.js","assets/CentreDeCommande-Du8kyJhp.css","assets/CentreDeCommande-P7O5BNgt.js","assets/Cercle-D64GQw7M.js","assets/certificat-C23yQgpW.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-Bvs5aFVY.js","assets/chiffre-du-jour-pur-CvOieFlW.js","assets/ChiffreDesPrestations-CzuGHOId.js","assets/client-twFCfX5i.js","assets/ClotureDuTiroir-C6vPx-E_.css","assets/ClotureDuTiroir-Cj_-4HnA.js","assets/Coffre-I1Jm4C18.js","assets/components-CEB_jRLu.js","assets/compte-courant-ByzulCEN.js","assets/compte-DI18Dljp.js","assets/CompteCourant-CYYfrQmx.js","assets/Comptes-CgrOpvNs.js","assets/Comptoir-CJ-cmFzN.js","assets/consultation-CRW6QcWf.css","assets/consultation-PZE61dQb.js","assets/Consultations-xAbB89Qj.js","assets/consultNotes-BThD_N5U.js","assets/Conversations-D4WwB5Zo.css","assets/Conversations-PAs0nMEf.js","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-DnZKiQCD.js","assets/currency-qfIhGmrs.js","assets/Customers-BqguoW59.js","assets/Dashboard-B8qK6Flt.css","assets/Dashboard-DlE4edbA.js","assets/dates-BSpoIFuo.js","assets/Demandes-D8apY3_I.js","assets/Depenses-F3BXFJUL.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-DsGoK9Nh.js","assets/diagnostics-au-trone-w6wR3Iji.js","assets/Discussions-DAHeaQ75.js","assets/Encaissements-lJTH0hA9.js","assets/enfants-DA4EDweS.js","assets/Engagements-CblsOgUu.js","assets/Engagements-Cj5S9MhG.css","assets/EntreDeuxSeances-C1U568C5.js","assets/equipe-B_9ZHz24.css","assets/Evaluation-CWCkPbcE.js","assets/FacturePrestataire-DG-sWzo0.js","assets/Factures-zX2CvHD_.js","assets/Fil-CcFsjUZB.js","assets/finances-BMFnlkRx.css","assets/fon-BZs3YwXu.js","assets/fon-pur-CgVkbJ8O.js","assets/fournisseurs-CgjaFkm0.js","assets/Fournisseurs-Cm-EI23D.js","assets/foyer-CTnVcNgF.js","assets/gestes-conversation-B-NhuLzF.js","assets/HomeRituals-DHsM_T-X.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-88zotVU7.js","assets/ia-diagnostic-pur-BulIFgZQ.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-recu-pur-DcucZqpR.js","assets/identite-DbGCrX3n.js","assets/index-CY7aK4Gb.js","assets/index.es-BRB7WvnD.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-DL-q08Xl.js","assets/jspdf.es.min-CFTiw07q.js","assets/JustePrix-CBbzCy9T.js","assets/kkiapay-pvOjznar.js","assets/kkiapay-widget-DnUhUNd4.js","assets/laboratoire-CAR4q-AV.js","assets/Laboratoire-Pzc3l7Se.js","assets/LettresAuDossier-t1Af-opI.js","assets/LienMndPay-BuUAUsYt.js","assets/maisons-CSSFrqZy.js","assets/Marketing-BTgq31vH.js","assets/Marque-yyn25C2R.js","assets/MesTaches-Cc4XUDf6.css","assets/MesTaches-Dzmx9YxP.js","assets/momo-C2ZVfV9J.js","assets/MonMois-Bdc2xU7x.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-Blk0VeY0.js","assets/paliers-CrC-JxL2.js","assets/Parametres-DA7VwlLM.js","assets/parcours-CcXHDInj.js","assets/Parrainages-CdgV0vCO.js","assets/Parrainages-gAHAPB_6.css","assets/pdf-myyPWYRm.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/Personas-Cy96qbX1.js","assets/Personnel-BFjKyDsu.js","assets/photo-BBQ8a7f7.js","assets/pilotage-D8kf1Co8.css","assets/Predictions-BoSCAaAx.js","assets/Prestataires-C4lcDZwa.js","assets/prestataires-CT9E_RGM.js","assets/Prets-CP4sziz0.js","assets/Projets-BTwE2XMx.js","assets/projets-CIhoLLVF.js","assets/Projets-COO7WDEE.css","assets/projets-pur-2ZEMRNDU.js","assets/protocoles-BRz_fnn2.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-L0okGmpe.js","assets/qualification-BNF8ssEI.js","assets/quiz-5qMPWZVi.js","assets/Rapport-CvHxBNi-.js","assets/RattacherUneCarte-Cn2Qy25K.js","assets/Recommandations-BTh6ortg.js","assets/regler-C5hcM02_.css","assets/regler-Dkb1HFIM.js","assets/regler-la-seance-serveur-BpExlC5z.js","assets/relances-pur-DsIo28uB.js","assets/releve-des-avis-8vq5x1PR.js","assets/SalonFoyer-BCRsGwLT.js","assets/secretariat-admin-B7yZHaP5.js","assets/Secretariat-Cy79Zw30.css","assets/Secretariat-uKbnq97f.js","assets/Signatures-BnPhKfXa.js","assets/SignerUnPdf-uGWMStRE.js","assets/Synthese-D2P9pxdG.js","assets/SyntheseGraphes-DCTiZij-.js","assets/systeme-C3XFIa8E.css","assets/Tableau-DQjYjDC6.js","assets/Textes-BEFOeVkU.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-B5lTSec7.js","assets/trace-du-moyen-pur-Bx8-suHn.js","assets/trone-BBToFe2P.js","assets/trone-D8FV4sC-.css","assets/ui-B0_CsFZX.js","assets/useAudiences-kRbmV5dK.js","assets/vente-C7YWXkHo.css","assets/Vitrine-Cs-c3_Mr.css","assets/Vitrine-vooRBI8l.js","assets/_admin-CmWXo9JM.js","assets/_contrat-bnBhywmJ.js","assets/_heures-CsS9KGDG.js","assets/_reuni-ByhUrCpB.js","assets/_shared-CDHnHu8P.js","assets/_signature-D8pdEO32.js","assets/_ui-BWMA-PlM.css","assets/_ui-Cx1I12An.js"];
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
