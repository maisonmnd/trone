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
const BUILD = "20261104211535";
const A_GARDER = ["./","assets/abonnements-B1CzjA0y.js","assets/Abonnements-BNc_21jW.js","assets/Academie-CMc5rmDT.js","assets/Acces-7s2_iL-Q.js","assets/actions-DxPFDJyt.js","assets/AFaire-BZykj-gu.js","assets/afaire-QMOZSAhK.js","assets/Agents-Bga3Qw5t.js","assets/agents-donnees-B0EeeCiW.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-CzQtDzbM.js","assets/Appels-BKmTYOCh.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/Assistants-BOcxTwZO.css","assets/Assistants-CPczMhhi.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/AtelierDesContenus-DX3vVDo4.js","assets/AuComptoir-DYFO_CcR.js","assets/Audience-DWZg4dpF.js","assets/Aujourdhui-4xNsF52L.js","assets/avant-le-fauteuil-lecture-CLdTd6JN.js","assets/AvantLeFauteuil-B7yJjz-w.js","assets/avis-fiches-D64Jh7cX.js","assets/AvisGoogle-B1iEBKSb.js","assets/AvisGoogle-DaPXfwX9.css","assets/bilan-B-bfPYR0.css","assets/bilan-BAXxfPt7.js","assets/BilanMensuel-Cen0jMGe.js","assets/Branches-DciEU1bM.js","assets/bridges-C2LFAZoA.js","assets/caisse-du-soir-SsscobBT.js","assets/Caisse-l4dBpzbE.js","assets/Caisses-C1N_LFsT.js","assets/Calendrier-BupbiWKj.js","assets/campagnes-pur-BYWU0ms0.js","assets/Carnet-CF63Jt31.js","assets/carte-DBSV26M0.js","assets/carte-_W_-xBPj.css","assets/CarteModal-C6uqrrEM.js","assets/CartesCadeaux-BWWkfNmr.js","assets/Catalogue-D6WSWXZT.js","assets/CentreDeCommande-C0AK0dGs.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-Un7YfGnh.js","assets/certificat-CswLEklB.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-BfZSWhtk.js","assets/ChiffreDesPrestations-DSKKd6j1.js","assets/client-BQP1lhB-.js","assets/ClotureDuTiroir-C6vPx-E_.css","assets/ClotureDuTiroir-CIIk33Aj.js","assets/Coffre-BntK3aRi.js","assets/components-LD8dLzOK.js","assets/compte-C4t4E0Ut.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-BbGw3ni7.js","assets/Comptes-B9zNcyrj.js","assets/Comptoir-DUjOEGwp.js","assets/consultation-CmbA4JbE.js","assets/consultation-CRW6QcWf.css","assets/Consultations-LweXdhqN.js","assets/consultNotes-BGoz9U63.js","assets/Conversations-D4WwB5Zo.css","assets/Conversations-Dr69hQJF.js","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-CRfpL20J.js","assets/currency-qfIhGmrs.js","assets/Customers-CD_UERmU.js","assets/Dashboard-DdqoQAfq.js","assets/Dashboard-zjGteuUE.css","assets/dates-DlsAZKSx.js","assets/Demandes-CphPMsHC.js","assets/Depenses-CMs_cKev.js","assets/depenses-saisie-DYGlBrAk.js","assets/dernier-message-pur-CBYWnq8m.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-BoJeWI7S.js","assets/diagnostics-au-trone-CIhi6zEz.js","assets/Dictee-D2P9yM7v.css","assets/dictee-pur-N1NGVHeq.js","assets/Dictee-TLVm0AfV.js","assets/Discussions-D7DeLswE.js","assets/EditeurDesOffres-DGt_TouL.js","assets/Encaissements-DmOM04JU.js","assets/enfants-ChW-o_OO.js","assets/Engagements-C1uMq3FD.js","assets/Engagements-Cj5S9MhG.css","assets/EntreDeuxSeances-G3mdOYIH.js","assets/equipe-B_9ZHz24.css","assets/Evaluation-B-_ZoGgi.js","assets/FacturePrestataire-D07mXLPD.js","assets/Factures-Cd5F84Hd.js","assets/FenetreDesCivilites-D-L-X3vj.js","assets/FenetreDesCivilites-zfNk1aak.css","assets/FenetreDuPoint-r6WUTGv_.js","assets/Fil-DObxQo1k.js","assets/finances-BMFnlkRx.css","assets/fon-B0geOFm-.js","assets/fon-pur-CgVkbJ8O.js","assets/Fournisseurs-4URBTILj.js","assets/fournisseurs-oTNgZ0kK.js","assets/foyer-BHCHU6Wm.js","assets/Gerard-Bfp4ua88.css","assets/Gerard-BmPKsVgS.js","assets/gerard-donnees-DYvT8yza.js","assets/gestes-conversation-BApLlPjy.js","assets/HomeRituals-CIijAn7l.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-Dplf5foA.js","assets/ia-centre-RjbvPkGR.js","assets/ia-diagnostic-pur-BBLrGY5l.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-recu-pur-DcucZqpR.js","assets/identite-BPcQhKjS.js","assets/index-CHndZ5SN.js","assets/index.es-Chdc9UeV.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-CIbBD5N0.js","assets/jspdf.es.min-BodaJZiY.js","assets/JustePrix-Cout_DNl.js","assets/kkiapay-bjp6D41c.js","assets/kkiapay-widget-DnUhUNd4.js","assets/Laboratoire-B1bqybCp.js","assets/laboratoire-DgBTWWmC.js","assets/LettresAuDossier-DSinyEGo.js","assets/LienMndPay-COU0-TsC.js","assets/maisons-CSSFrqZy.js","assets/Marketing-CU5YcY5G.js","assets/MarketingBranche-BZ-tqyHe.js","assets/Marque-Dw38-SbT.js","assets/MesTaches-Br4eWZ_S.js","assets/MesTaches-Cc4XUDf6.css","assets/missions-prestataires-BzKdkbKv.js","assets/momo-C2ZVfV9J.js","assets/MonMois-DNNJNyaK.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-BKaJfU7h.js","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/opale-D_NNaETK.js","assets/paliers-vnpgGpDb.js","assets/Parametres-Bdgao1jj.js","assets/parcours-DOOM9odB.js","assets/Parrainages-CDDekyOA.js","assets/Parrainages-gAHAPB_6.css","assets/PassageAvantLeFauteuil-BY71Wq4g.js","assets/pdf-e7zhpbZX.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/Personas-DD3GUNjC.js","assets/Personnel-BSZyb5wK.js","assets/photo-j4C5ETFy.js","assets/pilotage-D8kf1Co8.css","assets/Predictions-MYx-XUo0.js","assets/Prestataires-BPdjqvol.js","assets/Prets-DC3Hz2Zi.js","assets/prevision-du-mois-pur-D6sJa5lw.js","assets/Previsions-D-0__Buz.css","assets/Previsions-Dl55LBaX.js","assets/previsions-pur-YicPbRsL.js","assets/processus-pur-BLN25j-E.js","assets/projets-Cgop3M5R.js","assets/Projets-COO7WDEE.css","assets/Projets-P6swCuVK.js","assets/projets-pur-2ZEMRNDU.js","assets/protocoles-Dfi5wIjl.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-G1usEFMD.js","assets/qualification-DwsQIHk6.js","assets/quiz-5qMPWZVi.js","assets/Rapport-C2NpyiQb.js","assets/RattacherUneCarte-BIvJrJu7.js","assets/Recommandations-CSmWX_sS.js","assets/regler-C5hcM02_.css","assets/regler-la-seance-serveur-Bs6rzqZX.js","assets/regler-yGrtvAE6.js","assets/relances-pur-lwRTXc5E.js","assets/releve-des-avis-CFgwL5ip.js","assets/SalonFoyer-CacPi4dt.js","assets/secretariat-admin-CbpMpUsq.js","assets/Secretariat-CWKZiqCr.js","assets/Secretariat-Cy79Zw30.css","assets/Signatures-B8uSMd5i.js","assets/SignerUnPdf-Ppo4SCEw.js","assets/Synthese-DqRH0Seb.js","assets/SyntheseGraphes-Bj3oeHvr.js","assets/systeme-TPy-pF7j.css","assets/Tableau-G15VW72p.js","assets/temps-BVNmwU80.js","assets/Textes-BlGXbDHf.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-BOK7TWuW.js","assets/trace-du-moyen-pur-Bx8-suHn.js","assets/trone-D9MCXM1U.js","assets/trone-Doz5w-gE.css","assets/ui-Cmam1zzf.js","assets/useAudiences-CKA_2b5N.js","assets/vente-CauXO8yV.css","assets/Vitrine-BWilTqQJ.css","assets/Vitrine-CKxmXYY8.js","assets/_admin-OJLTJ3ZW.js","assets/_contrat-DXO4RC8j.js","assets/_heures-D2bIcJUs.js","assets/_reuni-duxrSp_v.js","assets/_shared-PynGhhuR.js","assets/_signature-Cg8H3FYf.js","assets/_ui-BWMA-PlM.css","assets/_ui-NXW7XOv5.js"];
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
