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
const BUILD = "20261026163655";
const A_GARDER = ["./","assets/abonnements-Bp2TCbJ4.js","assets/Abonnements-Dcvfe3AH.js","assets/Academie-LBa1VODp.js","assets/Acces-r7JJEemk.js","assets/actions-CZF5EoeP.js","assets/afaire--eux9cOk.js","assets/AFaire-DrVL1jes.js","assets/Agents-DBIBbYJi.js","assets/agents-donnees-De2QkCO_.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-DUu4dr0p.js","assets/Appels-BJAZ94uC.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/AtelierDesContenus-dAitC6fi.js","assets/AuComptoir-fnx0zc2t.js","assets/Aujourdhui-CpmYAf4o.js","assets/avis-fiches-CSTxe5K7.js","assets/AvisGoogle-C8qQRqXH.js","assets/AvisGoogle-DaPXfwX9.css","assets/bilan-B-bfPYR0.css","assets/bilan-DJwrweER.js","assets/BilanMensuel-LGydvj5y.js","assets/Branches-Bsz_RP7d.js","assets/bridges-CAdrgIL2.js","assets/Caisse-DTurAmJj.js","assets/caisse-du-soir-BiRaEnpm.js","assets/Caisses-CZjUVtri.js","assets/Calendrier-DyPwd-M2.js","assets/Carnet-CfeJEGdR.js","assets/carte-CoYDpocB.js","assets/carte-_W_-xBPj.css","assets/CarteModal-Cc2V3xmH.js","assets/CartesCadeaux-NOMUFhj7.js","assets/Catalogue-BvraQOcu.js","assets/CentreDeCommande-C2DyHeJ5.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-BJUrI1ip.js","assets/certificat-CBA6eThf.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-DTqXjpEU.js","assets/chiffre-du-jour-pur-BprNHm1w.js","assets/ChiffreDesPrestations-Bl_lqtp7.js","assets/client-Bp5tyREi.js","assets/ClotureDuTiroir-C6vPx-E_.css","assets/ClotureDuTiroir-SL0_tZmc.js","assets/Coffre-BtfAqoOI.js","assets/components-BwkdPP_P.js","assets/compte-BTBnulyS.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-DWGgFqxC.js","assets/Comptes-6xexQkA-.js","assets/Comptoir-CpTjQFr-.js","assets/consultation-CRW6QcWf.css","assets/consultation-eXQERAqt.js","assets/Consultations-DMM6eP-C.js","assets/consultNotes-CvhRYMrc.js","assets/Conversations-BZdrUp2B.js","assets/Conversations-D4WwB5Zo.css","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-DUYvCLrr.js","assets/currency-qfIhGmrs.js","assets/Customers-C1qHCg8s.js","assets/Dashboard-B8qK6Flt.css","assets/Dashboard-CnR9LCXh.js","assets/dates-BHW_stJS.js","assets/Demandes-D8tTuwsq.js","assets/Depenses-BvYkhRRV.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-x60Kh1wk.js","assets/diagnostics-au-trone-BmXn6VDc.js","assets/Discussions-D1tQMVZT.js","assets/Encaissements-BgjUAeHJ.js","assets/enfants-BiWUHzjO.js","assets/Engagements-CIvGY6Km.js","assets/Engagements-Cj5S9MhG.css","assets/EntreDeuxSeances-DVrhfb4r.js","assets/equipe-B_9ZHz24.css","assets/Evaluation-BP5kSRM_.js","assets/FacturePrestataire-DbPbNCLu.js","assets/Factures-By62mB6b.js","assets/Fil-CU9FfMMJ.js","assets/finances-BMFnlkRx.css","assets/fon-C8MbO3Xi.js","assets/fon-pur-CgVkbJ8O.js","assets/Fournisseurs-Ctxdgmhn.js","assets/fournisseurs-DZn2unwo.js","assets/foyer-DGaDU-kk.js","assets/Gerard-BZ2V5qz7.css","assets/Gerard-Cwf0DobE.js","assets/gestes-conversation-D6h9_nsy.js","assets/HomeRituals-DAdUn6v4.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-BmExTH-y.js","assets/ia-diagnostic-pur-BulIFgZQ.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-recu-pur-DcucZqpR.js","assets/identite-PCdDZIOf.js","assets/index-CRTYg7HC.js","assets/index.es-DPhuJQ4l.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-Lvwevb08.js","assets/jspdf.es.min-zfhZstHb.js","assets/JustePrix-DvDv3WfU.js","assets/kkiapay-D44u95Of.js","assets/kkiapay-widget-DnUhUNd4.js","assets/laboratoire-9XvaFYrd.js","assets/Laboratoire-D5bEazsC.js","assets/LettresAuDossier-BoK1Wl-Y.js","assets/LienMndPay-1Lqjo-Lw.js","assets/maisons-CSSFrqZy.js","assets/Marketing-Cz9u-Tnz.js","assets/Marque-B6A2DBKT.js","assets/MesTaches-Cc4XUDf6.css","assets/MesTaches-l0w1y_dR.js","assets/momo-C2ZVfV9J.js","assets/MonMois-CVf9-NOT.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-D9c2FoZS.js","assets/objectifs-des-fauteuils-pur-CW46U8VG.js","assets/paliers-zGcX4g1V.js","assets/Parametres-OWK_8nRT.js","assets/parcours-DlXfcNdC.js","assets/Parrainages-gAHAPB_6.css","assets/Parrainages-mMblh_XY.js","assets/pdf-CVWArroN.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/Personas-CZdovB_2.js","assets/Personnel-CCNVa1FA.js","assets/photo-Ie-ZFClS.js","assets/pilotage-D8kf1Co8.css","assets/Predictions-BNnNlh3m.js","assets/Prestataires-DTS9n1Zm.js","assets/prestataires-xHuzPSYc.js","assets/Prets-BLUOCvL2.js","assets/prevision-du-mois-pur-BiqzNpDz.js","assets/Previsions-BAJjSFMh.js","assets/Previsions-D-0__Buz.css","assets/previsions-pur-Ilqg37bq.js","assets/processus-pur-BLN25j-E.js","assets/Projets-COO7WDEE.css","assets/Projets-CYHQxtLb.js","assets/projets-Dxdnh2Cy.js","assets/projets-pur-2ZEMRNDU.js","assets/protocoles-B8ReQbf6.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-BHM5HR-A.js","assets/qualification-GO3OToIW.js","assets/quiz-5qMPWZVi.js","assets/Rapport-BAb50ib3.js","assets/RattacherUneCarte-B412ocN2.js","assets/Recommandations-CG00hDAh.js","assets/regler-C5hcM02_.css","assets/regler-JwmFtNhK.js","assets/regler-la-seance-serveur-BpExlC5z.js","assets/relances-pur-DsIo28uB.js","assets/releve-des-avis-CUTtSv0x.js","assets/SalonFoyer-CPc03iL6.js","assets/secretariat-admin-Cqu_gKQz.js","assets/Secretariat-CETXIS6e.js","assets/Secretariat-Cy79Zw30.css","assets/Signatures-CZhR2Dn2.js","assets/SignerUnPdf-DozuHWAw.js","assets/Synthese-B31rF7d-.js","assets/SyntheseGraphes-CczZ5ZWh.js","assets/systeme-C3XFIa8E.css","assets/Tableau-CJu-PDbl.js","assets/Textes-DLpOzRbT.css","assets/Textes-nCIgPnFO.js","assets/tiroirs-DnkfESfh.js","assets/trace-du-moyen-pur-Bx8-suHn.js","assets/trone-C54OIpAN.js","assets/trone-ZtHDzaYl.css","assets/ui-DzPmcYQE.js","assets/useAudiences-K8MkTI1D.js","assets/vente-C7YWXkHo.css","assets/Vitrine-BaOR6W0u.js","assets/Vitrine-BWilTqQJ.css","assets/_admin-DkG2fW-k.js","assets/_contrat-C0R2BeKl.js","assets/_heures-CJKVSQAF.js","assets/_reuni-ZwYDD-vE.js","assets/_shared-DMcYyzWP.js","assets/_signature-PKv7gNPJ.js","assets/_ui-BWMA-PlM.css","assets/_ui-D4J0Owhl.js"];
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
