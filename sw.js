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
const BUILD = "20261028054203";
const A_GARDER = ["./","assets/Abonnements-DmMxCE-w.js","assets/abonnements-Mn4w6S9s.js","assets/Academie-CPlNqVwj.js","assets/Acces-BQKD8eaX.js","assets/actions-CpxJvhmr.js","assets/afaire-BW7SpDmM.js","assets/AFaire-CH8b_Ztd.js","assets/Agents-BDaZU4aQ.js","assets/agents-donnees-DfWEKu9a.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-BpaRk8Fo.js","assets/Appels-DSAlzHZv.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/AtelierDesContenus-f5MPLhAU.js","assets/AuComptoir-JdlqA6HP.js","assets/Audience-BBmc-GX2.js","assets/Aujourdhui-BFzATvMV.js","assets/avis-fiches-DihCHI3V.js","assets/AvisGoogle-DaPXfwX9.css","assets/AvisGoogle-DPopmVfg.js","assets/bilan-B-bfPYR0.css","assets/bilan-Ceq0n14H.js","assets/BilanMensuel-BismXcMo.js","assets/Branches-BCxVZYQF.js","assets/bridges-AgjlvVWV.js","assets/Caisse-CM2Ix0U0.js","assets/caisse-du-soir-BW4P3Lv2.js","assets/Caisses-8wTDBYLy.js","assets/Calendrier-Of_xi4-i.js","assets/campagnes-pur-BGOtlqJI.js","assets/Carnet--I3UxTSN.js","assets/carte-BRVEDQms.js","assets/carte-_W_-xBPj.css","assets/CarteModal-BG8SSyP3.js","assets/CartesCadeaux-tXeezYSD.js","assets/Catalogue-Bl5q5Pk_.js","assets/CentreDeCommande-BfBw1689.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-BBS-BT09.js","assets/certificat-BLNZZ5HT.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-P3VT3cC-.js","assets/chiffre-du-jour-pur-BKF-hNKx.js","assets/ChiffreDesPrestations-B9skpTDK.js","assets/client-DwSFZqmO.js","assets/ClotureDuTiroir-BX8mEjUe.js","assets/ClotureDuTiroir-C6vPx-E_.css","assets/Coffre-C162doXU.js","assets/components-qmy-Ys49.js","assets/compte-Cf6frAzD.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-BsnlL01x.js","assets/Comptes-BumIEKh-.js","assets/Comptoir-Dpnts-Py.js","assets/consultation-CRW6QcWf.css","assets/consultation-Deo4678V.js","assets/Consultations-BCEX77yz.js","assets/consultNotes-C0Mp2lm6.js","assets/Conversations-D4WwB5Zo.css","assets/Conversations-DDEKuyN7.js","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-BmV1Y_RI.js","assets/currency-qfIhGmrs.js","assets/Customers-B5JPaRHm.js","assets/Dashboard-DxWvgKxQ.js","assets/Dashboard-zjGteuUE.css","assets/dates-GpIiYOUU.js","assets/Demandes-DjKMfDpP.js","assets/Depenses-C53ESMXi.js","assets/dernier-message-pur-CBYWnq8m.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-cJixPADI.js","assets/diagnostics-au-trone-T7M0T1WC.js","assets/Discussions-C6uDruyy.js","assets/EditeurDesOffres-C1u5uL9N.js","assets/Encaissements-X6zLchQF.js","assets/enfants-D6uvCo9V.js","assets/Engagements-Cj5S9MhG.css","assets/Engagements-D_8paTuU.js","assets/EntreDeuxSeances-zkPUnMDf.js","assets/equipe-B_9ZHz24.css","assets/Evaluation-wtSgGfO5.js","assets/FacturePrestataire-CpWWjf8c.js","assets/Factures-Cph_CT-k.js","assets/Fil-i-MSnJ3A.js","assets/finances-BMFnlkRx.css","assets/fon-C4QAhtgz.js","assets/fon-pur-CgVkbJ8O.js","assets/fournisseurs-BKOUe6bs.js","assets/Fournisseurs-CEFF2Kxs.js","assets/foyer-DfQp5yTI.js","assets/Gerard-CUvkbLSl.css","assets/gerard-donnees-BZMQRsrz.js","assets/Gerard-DX2YLbXO.js","assets/gestes-conversation-DG0AANHC.js","assets/HomeRituals-BnbArKvM.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-CUSdpAGW.js","assets/ia-centre-CPmujduO.js","assets/ia-diagnostic-pur-hHYxp10Y.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-recu-pur-DcucZqpR.js","assets/identite-sF2CrnKx.js","assets/index-SaPh1NxL.js","assets/index.es-DvX7iGkF.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-BkajBO_R.js","assets/jspdf.es.min-B2ZBrMML.js","assets/JustePrix-Q_PRGaHT.js","assets/kkiapay-10le2Hp_.js","assets/kkiapay-widget-DnUhUNd4.js","assets/Laboratoire-bpEGCNYA.js","assets/laboratoire-ebZHpVlf.js","assets/LettresAuDossier-BwypbwWQ.js","assets/LienMndPay-DUOx89jg.js","assets/maisons-CSSFrqZy.js","assets/Marketing-Cq8xlUxR.js","assets/MarketingBranche-DI-iHDef.js","assets/Marque-BarkaPzT.js","assets/MesTaches-Cc4XUDf6.css","assets/MesTaches-KhqtM3SI.js","assets/momo-C2ZVfV9J.js","assets/MonMois-DlHO6HV8.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/objectifs-w7-KahIh.js","assets/paliers-Ctbi_-Vz.js","assets/Parametres-CZveb12l.js","assets/parcours-DyrR1toz.js","assets/Parrainages-BR1aFvTb.js","assets/Parrainages-gAHAPB_6.css","assets/pdf-DVMbVrxo.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/Personas-xzcD_PgC.js","assets/Personnel-DJfWqu6C.js","assets/photo-BNxnccPS.js","assets/pilotage-D8kf1Co8.css","assets/Predictions-DO3Aecr5.js","assets/Prestataires-CPcuFcPA.js","assets/prestataires-fmkLAhWP.js","assets/Prets-DGZ3-Z69.js","assets/prevision-du-mois-pur-D6sJa5lw.js","assets/Previsions-D-0__Buz.css","assets/Previsions-DT5e2hK2.js","assets/previsions-pur-m5GLuR8d.js","assets/processus-pur-BLN25j-E.js","assets/projets-C-Jlihri.js","assets/Projets-COO7WDEE.css","assets/Projets-Eo9L3Lxd.js","assets/projets-pur-2ZEMRNDU.js","assets/protocoles-BGKDN39Y.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-C64qUXOT.js","assets/qualification-CiR1FFiP.js","assets/quiz-5qMPWZVi.js","assets/Rapport-BmN8aKq5.js","assets/RattacherUneCarte-iuyDfXB4.js","assets/Recommandations-BaAX0PQH.js","assets/regler-BOME24MI.js","assets/regler-C5hcM02_.css","assets/regler-la-seance-serveur-B59IZtta.js","assets/relances-pur-DsIo28uB.js","assets/releve-des-avis-Dp5R_z7P.js","assets/SalonFoyer-x2B0r0OT.js","assets/secretariat-admin-NSsi_Eie.js","assets/Secretariat-BNsdLMZG.js","assets/Secretariat-Cy79Zw30.css","assets/Signatures-C37aG32P.js","assets/SignerUnPdf-DCRYjrYy.js","assets/Synthese-CBWhZNWz.js","assets/SyntheseGraphes-BHkaihyv.js","assets/systeme-C3XFIa8E.css","assets/Tableau-qjbfrbX9.js","assets/temps-L4DWTY6i.js","assets/Textes-DLpOzRbT.css","assets/Textes-I2Jr8pfZ.js","assets/tiroirs-BLhxh_3t.js","assets/trace-du-moyen-pur-Bx8-suHn.js","assets/trone-CfGCPWMq.css","assets/trone-heCEj3Mj.js","assets/ui-T1y14Akd.js","assets/useAudiences-5YWzgHmy.js","assets/vente-C7YWXkHo.css","assets/Vitrine-BWilTqQJ.css","assets/Vitrine-DzKFPHQR.js","assets/_admin-dfPFeagg.js","assets/_contrat-C4aLvJIg.js","assets/_heures-BjNJsoYT.js","assets/_reuni-BWCbb839.js","assets/_shared-DhcWzHXB.js","assets/_signature-SLNtTHSA.js","assets/_ui-BWMA-PlM.css","assets/_ui-DOx2C7Rj.js"];
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
