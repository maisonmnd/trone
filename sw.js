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
const BUILD = "20261026162148";
const A_GARDER = ["./","assets/Abonnements-BjRaqoNt.js","assets/abonnements-DvOtMbeY.js","assets/Academie-BpyGAMbq.js","assets/Acces-Bj2TFNYH.js","assets/actions-Bf_XFEGX.js","assets/AFaire-CcXFe7sD.js","assets/afaire-DxWnMoqI.js","assets/Agents-7PyKwfXT.js","assets/agents-donnees-CopCrSfb.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-3mCPgoal.js","assets/Appels-D20-ybdX.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/AtelierDesContenus-Be3sR-ym.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/AuComptoir-C37tS5V0.js","assets/Aujourdhui-DNvwOs2r.js","assets/avis-fiches-krSnTgb-.js","assets/AvisGoogle-DaPXfwX9.css","assets/AvisGoogle-DuvX4LEg.js","assets/bilan-B-bfPYR0.css","assets/bilan-DJGNMdkv.js","assets/BilanMensuel-DKyqN8XC.js","assets/Branches-BSj_H-Fr.js","assets/bridges-Ct5xSDX3.js","assets/Caisse-DN1Ag6ql.js","assets/caisse-du-soir-JGeeHncR.js","assets/Caisses-Bnp-9w8p.js","assets/Calendrier-D29xIAaD.js","assets/Carnet-DtGH-4Ff.js","assets/carte-DFVHwUO5.js","assets/carte-_W_-xBPj.css","assets/CarteModal-usIoecDE.js","assets/CartesCadeaux-Dyh_xPMY.js","assets/Catalogue-HsiTCIko.js","assets/CentreDeCommande-BD2NyKfj.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-DUTXm_Mm.js","assets/certificat-CfVtm5Tu.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-B5m1tnYD.js","assets/chiffre-du-jour-pur-C14T_Lrn.js","assets/ChiffreDesPrestations-fzlmFQ50.js","assets/client-DjseTnyB.js","assets/ClotureDuTiroir-C6vPx-E_.css","assets/ClotureDuTiroir-CY4Ipv6C.js","assets/Coffre-CRJj9ns7.js","assets/components-DAhpE5Gt.js","assets/compte-BiCXLEUX.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-8mj4CfIB.js","assets/Comptes-rJWyf_Uy.js","assets/Comptoir-sxPlnizC.js","assets/consultation-CRW6QcWf.css","assets/consultation-tLmcpXPx.js","assets/Consultations-CmHNBdCx.js","assets/consultNotes-BpmBrgSZ.js","assets/Conversations-CCmQwMg5.js","assets/Conversations-D4WwB5Zo.css","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-DtJ2Wro3.js","assets/currency-qfIhGmrs.js","assets/Customers-CKqQBccG.js","assets/Dashboard-593TB2VC.js","assets/Dashboard-B8qK6Flt.css","assets/dates-DREUze06.js","assets/Demandes-aa6IbS1r.js","assets/Depenses-5vPgmZ6b.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-igcavhqK.js","assets/diagnostics-au-trone-DZRaw0e6.js","assets/Discussions-rBHXc2Bb.js","assets/Encaissements-49BLMubU.js","assets/enfants-DQZiFHn1.js","assets/Engagements-BhhYzlFZ.js","assets/Engagements-Cj5S9MhG.css","assets/EntreDeuxSeances-YKD4hkCQ.js","assets/equipe-B_9ZHz24.css","assets/Evaluation-BoD0J1s-.js","assets/FacturePrestataire-BZpFeCI1.js","assets/Factures-CSllnqpP.js","assets/Fil-BU3aHXsG.js","assets/finances-BMFnlkRx.css","assets/fon-CQLtvXvx.js","assets/fon-pur-CgVkbJ8O.js","assets/fournisseurs-AZCWzqxU.js","assets/Fournisseurs-C8arZ7OU.js","assets/foyer-Bv3cPgPd.js","assets/gestes-conversation-DseY2Jec.js","assets/HomeRituals-BW81-Q48.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-BoJokviq.js","assets/ia-diagnostic-pur-BulIFgZQ.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-recu-pur-DcucZqpR.js","assets/identite-DseHOIjn.js","assets/index-C3WrZWGt.js","assets/index.es-BqrOIYlE.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-B4Jh4o7H.js","assets/jspdf.es.min-a00zSCTp.js","assets/JustePrix-DvgrxUCa.js","assets/kkiapay-BMmdZ7qu.js","assets/kkiapay-widget-DnUhUNd4.js","assets/Laboratoire-CAbd_-d_.js","assets/laboratoire-FuElFYiX.js","assets/LettresAuDossier-CsMCqHnm.js","assets/LienMndPay-D4hnz0Ib.js","assets/maisons-CSSFrqZy.js","assets/Marketing-BLEWnSZn.js","assets/Marque-D1qV_CqP.js","assets/MesTaches-Cc4XUDf6.css","assets/MesTaches-NMBorubU.js","assets/momo-C2ZVfV9J.js","assets/MonMois-Jg5KcWkv.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-97jkkJSW.js","assets/objectifs-des-fauteuils-pur-CW46U8VG.js","assets/paliers-DTJ1X4Xn.js","assets/Parametres-C6s_Pqio.js","assets/parcours-DtmMcDCL.js","assets/Parrainages-CYCuYW9h.js","assets/Parrainages-gAHAPB_6.css","assets/pdf-CmM0bytB.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/Personas-ByH9bYQ4.js","assets/Personnel-OkfQ9CPj.js","assets/photo-BPQFyJHQ.js","assets/pilotage-D8kf1Co8.css","assets/Predictions-BtW0cYna.js","assets/prestataires-3c7E1hj5.js","assets/Prestataires-C4CXrdoy.js","assets/Prets-D2PYdv9M.js","assets/prevision-du-mois-pur-BiqzNpDz.js","assets/Previsions-Cd1kWHLH.js","assets/Previsions-D-0__Buz.css","assets/Projets-COO7WDEE.css","assets/projets-Diuf_6fw.js","assets/projets-pur-2ZEMRNDU.js","assets/Projets-UwgzFDll.js","assets/protocoles-Dd35wRs1.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-BIpWiWFa.js","assets/qualification-CtMqc4Vp.js","assets/quiz-5qMPWZVi.js","assets/Rapport-D4pMEeJv.js","assets/RattacherUneCarte-D8gTM-tN.js","assets/Recommandations-CWEl6h6v.js","assets/regler-C5hcM02_.css","assets/regler-Ci_nfnNe.js","assets/regler-la-seance-serveur-BpExlC5z.js","assets/relances-pur-DsIo28uB.js","assets/releve-des-avis-Dhh8xYew.js","assets/SalonFoyer-BCMnUVg_.js","assets/secretariat-admin-DFaiEs5s.js","assets/Secretariat-Cy79Zw30.css","assets/Secretariat-DmYevAa1.js","assets/Signatures-Di2N27ay.js","assets/SignerUnPdf-Dhf-Y3dY.js","assets/Synthese-DYrQeDud.js","assets/SyntheseGraphes-Dzuf7sHB.js","assets/systeme-C3XFIa8E.css","assets/Tableau-B1xHsBoe.js","assets/Textes-CILKfmoB.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-CJSzwi3Y.js","assets/trace-du-moyen-pur-Bx8-suHn.js","assets/trone-Cc2oHYef.js","assets/trone-ZtHDzaYl.css","assets/ui-D9soqXrZ.js","assets/useAudiences-1n0klXTz.js","assets/vente-C7YWXkHo.css","assets/Vitrine-BWilTqQJ.css","assets/Vitrine-JJDRQazE.js","assets/_admin-vSsVbFd4.js","assets/_contrat-BBMdauEt.js","assets/_heures-Cb4pYykn.js","assets/_reuni-Dg_uxb97.js","assets/_shared-DffJnhXz.js","assets/_signature-BgTOUZbc.js","assets/_ui-BWMA-PlM.css","assets/_ui-DGi7SMI9.js"];
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
