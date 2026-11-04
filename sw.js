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
const BUILD = "20261104060452";
const A_GARDER = ["./","assets/Abonnements-CU_qO7Yy.js","assets/abonnements-DQFJrrcp.js","assets/Academie-D63A4aGp.js","assets/Acces-C7zkRKsX.js","assets/actions-C6jQuZjB.js","assets/afaire-DlyMUeb_.js","assets/AFaire-D_hk4flQ.js","assets/Agents-CwvRnQEF.js","assets/agents-donnees-CzBSzQ9b.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-Bq_y2sB4.js","assets/Appels-B12yaaZp.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/Assistants-BmIG4Lp1.js","assets/Assistants-BOcxTwZO.css","assets/AtelierDesContenus-D3-p6F2A.css","assets/AtelierDesContenus-DcLdyh54.js","assets/AuComptoir-P8B8qoY9.js","assets/Audience-6MvytNHW.js","assets/Aujourdhui-Rr3CE0b3.js","assets/avant-le-fauteuil-lecture-bf9SEf_N.js","assets/AvantLeFauteuil-B23N2YcU.js","assets/avis-fiches-B49NWdqp.js","assets/AvisGoogle-DaPXfwX9.css","assets/AvisGoogle-DcEryv9t.js","assets/bilan-B-bfPYR0.css","assets/bilan-RKzF-CVo.js","assets/BilanMensuel-D_NJu-wv.js","assets/Branches-BlRqWoKh.js","assets/bridges-wNA6vGzJ.js","assets/Caisse-DMng7fz-.js","assets/caisse-du-soir-BaFbEtWk.js","assets/Caisses-CdyDEkSG.js","assets/Calendrier-B-WxRjap.js","assets/campagnes-pur-Drz9gRJ9.js","assets/Carnet-Bqa3SYlR.js","assets/carte-Bbq1xPeA.js","assets/carte-_W_-xBPj.css","assets/CarteModal-CU2W3XQj.js","assets/CartesCadeaux-BlcKCj1L.js","assets/Catalogue-azgD5H7s.js","assets/CentreDeCommande-BYwaG8S8.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-DUDQf9ZQ.js","assets/certificat-CtaKs_ES.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-DSBu0puW.js","assets/ChiffreDesPrestations-Ced9hRTu.js","assets/client-kPtRPAAc.js","assets/ClotureDuTiroir-BVUcPQXF.js","assets/ClotureDuTiroir-C6vPx-E_.css","assets/Coffre-BEZrsP9w.js","assets/components-DF6r_iOc.js","assets/compte-BEAdng_L.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-Cha2BdlA.js","assets/Comptes-BsJiUPbV.js","assets/Comptoir-CfHO1rim.js","assets/consultation-CRW6QcWf.css","assets/consultation-pfIgRes3.js","assets/Consultations-CDeOPmfu.js","assets/consultNotes-DF_EoQme.js","assets/Conversations-CCYrZDKw.js","assets/Conversations-D4WwB5Zo.css","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-DpAYn7tB.js","assets/currency-qfIhGmrs.js","assets/Customers-IQHoKwQh.js","assets/Dashboard-B2Sjjnbu.js","assets/Dashboard-zjGteuUE.css","assets/dates-HcUjEb7N.js","assets/Demandes-Bqb3Nudw.js","assets/Depenses-DGOd8Utk.js","assets/depenses-saisie-kVaWMwMJ.js","assets/dernier-message-pur-CBYWnq8m.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-DdVNagWx.js","assets/diagnostics-au-trone-D--QJGv2.js","assets/Dictee-D2P9yM7v.css","assets/Dictee-DX8b6R-H.js","assets/dictee-pur-OC6zpPx9.js","assets/Discussions-DHZolD2O.js","assets/EditeurDesOffres-BpskfGVA.js","assets/Encaissements-CSmhUqzi.js","assets/enfants-D-Vrv9lf.js","assets/Engagements-BCJkVxd4.js","assets/Engagements-Cj5S9MhG.css","assets/EntreDeuxSeances-Bp6ceSfC.js","assets/equipe-B_9ZHz24.css","assets/Evaluation-D-2LlAkS.js","assets/FacturePrestataire-DnxrdsbQ.js","assets/Factures-3OtmmP2h.js","assets/FenetreDesCivilites-A0iM-T3z.js","assets/FenetreDesCivilites-zfNk1aak.css","assets/FenetreDuPoint--xXtSHtP.js","assets/Fil-COLQxi69.js","assets/finances-BMFnlkRx.css","assets/fon-pur-CgVkbJ8O.js","assets/fon-sYm81XOc.js","assets/Fournisseurs-D4geJ5xb.js","assets/fournisseurs-wZHkbaCi.js","assets/foyer-eMrkfJxb.js","assets/Gerard-B4b0WGse.js","assets/Gerard-Bfp4ua88.css","assets/gerard-donnees-DsO-YV0Z.js","assets/gestes-conversation-D156b7ly.js","assets/HomeRituals-D3u-rVwI.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-DSfY9zDn.js","assets/ia-centre-U0TknctJ.js","assets/ia-diagnostic-pur-BBLrGY5l.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-recu-pur-DcucZqpR.js","assets/identite-D9Wq3otn.js","assets/index-BKdSI-ZL.js","assets/index.es-Bm0oa12D.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-DfSjBRFy.js","assets/jspdf.es.min-DUtmfpS1.js","assets/JustePrix-vUoIYRL0.js","assets/kkiapay-83oJ4UFL.js","assets/kkiapay-widget-DnUhUNd4.js","assets/Laboratoire-BCbowE7m.js","assets/laboratoire-CpF5tXwk.js","assets/LettresAuDossier-DeAQvnj5.js","assets/LienMndPay-DFUdwP7C.js","assets/maisons-CSSFrqZy.js","assets/Marketing-X_baU8Iw.js","assets/MarketingBranche-Sybp0kWQ.js","assets/Marque-DzhbDTif.js","assets/MesTaches-Cc4XUDf6.css","assets/MesTaches-CsCqujaK.js","assets/missions-prestataires-fsgVKoyT.js","assets/momo-C2ZVfV9J.js","assets/MonMois-DSIwhHOL.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-DCe-ewCf.js","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/opale-BKtAyWpG.js","assets/paliers-B-qqjmWW.js","assets/Parametres-DT6wZ5HI.js","assets/parcours-Cu53HGhU.js","assets/Parrainages-BUrXFV7e.js","assets/Parrainages-gAHAPB_6.css","assets/PassageAvantLeFauteuil-Bwe_DicU.js","assets/pdf-DiWbLiWk.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/Personas-CKtK5imY.js","assets/Personnel-tuBJhdBF.js","assets/photo-CkaoGP4e.js","assets/pilotage-D8kf1Co8.css","assets/Predictions-klyAk58a.js","assets/Prestataires-EZJqZjmj.js","assets/Prets-SiPdEUYu.js","assets/prevision-du-mois-pur-D6sJa5lw.js","assets/Previsions-D-0__Buz.css","assets/Previsions-DgtBAcgh.js","assets/previsions-pur-B4-BBxaD.js","assets/processus-pur-BLN25j-E.js","assets/Projets-COO7WDEE.css","assets/Projets-D5RRuQ6T.js","assets/projets-FU4gB2yc.js","assets/projets-pur-2ZEMRNDU.js","assets/protocoles-B7hUQ0SP.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-BQ8dco-W.js","assets/qualification-By71TZ_B.js","assets/quiz-5qMPWZVi.js","assets/Rapport-CkHefrxh.js","assets/RattacherUneCarte-wI5Q9sKb.js","assets/Recommandations-DC0NZqS3.js","assets/regler-BPkx_MIQ.js","assets/regler-C5hcM02_.css","assets/regler-la-seance-serveur-Bs6rzqZX.js","assets/relances-pur-lwRTXc5E.js","assets/releve-des-avis-BWSlh8pi.js","assets/SalonFoyer-BgIO22xn.js","assets/secretariat-admin-Dl55-1Ip.js","assets/Secretariat-BYx3OwFA.js","assets/Secretariat-Cy79Zw30.css","assets/Signatures-DulJF4Qg.js","assets/SignerUnPdf-B26GpsKo.js","assets/Synthese-DYHpSV_D.js","assets/SyntheseGraphes-DSM9jK_0.js","assets/systeme-TPy-pF7j.css","assets/Tableau-CmDYnnyN.js","assets/temps-Duxud0Fj.js","assets/Textes-CsWGCNsd.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-DfZGRDWh.js","assets/trace-du-moyen-pur-Bx8-suHn.js","assets/trone-BNsZ3r8b.js","assets/trone-CkTa7RKR.css","assets/ui-C1IWPYhQ.js","assets/useAudiences-CoCYuwkJ.js","assets/vente-CauXO8yV.css","assets/Vitrine-BWilTqQJ.css","assets/Vitrine-DcnssGk0.js","assets/_admin-V3xlDGGi.js","assets/_contrat-Bj-3lqq9.js","assets/_heures-B8gJqVj7.js","assets/_reuni-CK_elrAM.js","assets/_shared-BDNtgdaP.js","assets/_signature-CXb1eqgF.js","assets/_ui-BWMA-PlM.css","assets/_ui-DXDDZg-z.js"];
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
