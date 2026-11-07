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
const BUILD = "20261107113330";
const A_GARDER = ["./","assets/Abonnements-Dk3o6F5f.js","assets/Abonnements-DTY7p2DH.css","assets/abonnements-DVyohySb.js","assets/Academie-Biyf8qvl.js","assets/Acces-DhNHGfcK.js","assets/AFaire-hDkdwHFr.js","assets/afaire-_KQmtt27.js","assets/agents-donnees-Hfpyi9MC.js","assets/Agents-DyQ9yxjE.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-BmLMm_nb.js","assets/Appels-Bno69d-q.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/Assistants-D9i2Xwmg.css","assets/Assistants-DVYSt7Z0.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/AtelierDesContenus-DK29sSWl.js","assets/Audience-CtWDAwY8.js","assets/Aujourdhui-C7vHCo89.js","assets/avant-le-fauteuil-lecture-DDEMP7cg.js","assets/AvantLeFauteuil-CODC935v.js","assets/avis-fiches-DU6Obk05.js","assets/AvisGoogle-DaPXfwX9.css","assets/AvisGoogle-Jssv4fYq.js","assets/BadgeEssai-DRX7GJhH.js","assets/bilan-B-bfPYR0.css","assets/bilan-BNMaNS23.js","assets/BilanMensuel-BQJ0N2Na.js","assets/Branches-BSBdlgIu.js","assets/bridges-skERG6zS.js","assets/Caisse-CTWVODtd.js","assets/caisse-du-soir-BHTCdYBw.js","assets/caisse-du-soir-C6vPx-E_.css","assets/Caisses-BFGSwsGu.js","assets/Calendrier-BvRjIU7U.js","assets/campagnes-pur-BeJZJikS.js","assets/Carnet-BLPPp4fd.js","assets/carte-D8Eh_dV6.js","assets/carte-_W_-xBPj.css","assets/CarteModal-C6HdpaPX.js","assets/CartesCadeaux-DvBqOZ9L.js","assets/Catalogue-BIa_vjdr.js","assets/CentreDeCommande-B3DqF6VK.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-ggI16C70.js","assets/certificat-Dc33npjP.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-BqHXzJ_-.js","assets/chiffre-du-jour-pur-CD2pm4sv.js","assets/ChiffreDesPrestations-COZkGYF8.js","assets/client-DPAmq8rk.js","assets/cloture-du-jour-D6V-c9oc.js","assets/ClotureDuTiroir-BaV5VwOY.js","assets/Coffre-DlYV7sq8.js","assets/components-BdhkYtYl.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-E_hm7Stl.js","assets/Comptes-f4Yt2OTa.js","assets/consultation-CRW6QcWf.css","assets/consultation-Dn2a7ggQ.js","assets/Consultations-C41MAxPH.js","assets/consultNotes-DCl9qtqa.js","assets/Conversations-D4WwB5Zo.css","assets/Conversations-D98HxDrh.js","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-wpxd-lcp.js","assets/currency-qfIhGmrs.js","assets/Customers-BTxnKW1o.js","assets/Dashboard-B2x7VsE_.css","assets/Dashboard-D-SKJruH.js","assets/dates-Ddg10968.js","assets/Demandes-BZaPBAGN.js","assets/DepenseEnUnePhrase-B7KNI4Es.js","assets/DepenseEnUnePhrase-BIGRlGqP.css","assets/Depenses-Cc_dLkVk.js","assets/depenses-saisie-DYvDUcOQ.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-CQjiuJCP.js","assets/diagnostics-au-trone-Tc-ISI5p.js","assets/Dictee-D2P9yM7v.css","assets/Dictee-DtZWm-WO.js","assets/dictee-pur-BPUMt2ha.js","assets/Discussions-BLXqx_tu.js","assets/EditeurDesOffres-lsfSnfXp.js","assets/Encaissements-CR7m0qV7.js","assets/enfants-CV7l_mio.js","assets/Engagements-BytveJVF.js","assets/Engagements-Cj5S9MhG.css","assets/engagements-coffre-CcQr18gF.js","assets/EntreDeuxSeances-D9FOArgz.js","assets/Evaluation-BNC17_uT.js","assets/Factures-TftgZpMG.js","assets/FenetreDesCivilites-BfZpkJet.js","assets/FenetreDesCivilites-zfNk1aak.css","assets/FenetreDuPoint-EBF_5gUM.js","assets/Fil-DUbzDAci.js","assets/finances-BMFnlkRx.css","assets/fon-CntM1NQR.js","assets/fournisseurs-Dr1GHBos.js","assets/Fournisseurs-jt_URORG.js","assets/foyer-9Bn_Vn66.js","assets/Gerard-Cgj-zsJh.css","assets/Gerard-CrwgkxfD.js","assets/gerard-donnees-CusuS8Ip.js","assets/gestes-conversation-DT3OHGOH.js","assets/HomeRituals-hw4AQHHz.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-DVMc25Qp.js","assets/ia-centre-Czrq_WdM.js","assets/ia-diagnostic-pur-BBLrGY5l.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-tableau-pur-CSRjGtTf.js","assets/identite-PB0K1yKL.js","assets/index-DY4EhjXJ.js","assets/index.es-Bg6SZXn6.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-DqAD7EuL.js","assets/jspdf.es.min-B6_0lmMW.js","assets/JustePrix-CCo0sHcK.js","assets/kkiapay-BvPcrJb8.js","assets/kkiapay-widget-DnUhUNd4.js","assets/Laboratoire-DhWULcnr.js","assets/LaJournee-Bn_G0HCt.css","assets/LaJournee-CTrpzq3e.js","assets/LesPaiements-BvdfOCbQ.css","assets/LesPaiements-DwzOLJFe.js","assets/LettresAuDossier-D_rFow1-.js","assets/LienMndPay-DfpQKDpg.js","assets/Marketing-DbdAPRtQ.js","assets/MarketingBranche-CwaKUbqc.js","assets/Marque-C6moyHur.js","assets/MesPourboires-D9I_9rZf.css","assets/MesPourboires-ZUaNjaV-.js","assets/MesTaches-C56wo6vK.js","assets/MesTaches-Cc4XUDf6.css","assets/momo-C2ZVfV9J.js","assets/MonMois-BKcfJN6b.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/objectifs-DWNdwGvW.js","assets/opale-xkaID4oc.js","assets/oreille-B1AMUmZh.js","assets/paie-du-5-53ZrS9OH.js","assets/paie-du-5-DeJq-K_U.css","assets/paie-du-5-pur-CHLOZOnm.js","assets/PaieParMtn-AoKCfgUu.js","assets/paliers-zqLc5lIV.js","assets/Parametres-Ev5c5y1v.js","assets/parcours-CnQFhjIJ.js","assets/Parrainages-gAHAPB_6.css","assets/Parrainages-it5Cw2oq.js","assets/PassageAvantLeFauteuil-CMM4iELb.js","assets/pdf-DYiK9AYO.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/Personas-CneBc41c.js","assets/Personnel-BdwlLFvO.js","assets/photo-DI2CTFG3.js","assets/pilotage-D8kf1Co8.css","assets/Pourboires-Bjwe5ws_.js","assets/Predictions-u31g-EnA.js","assets/Prestataires-BVA9Mam1.js","assets/Prets-Dkst3QF8.js","assets/PrevisionDuMois-DlFTw3OX.css","assets/PrevisionDuMois-xSvGq3Eh.js","assets/Previsions-Bdb-bBd_.js","assets/previsions-pur-CGXiR3GO.js","assets/Previsions-r4v19Anp.css","assets/processus-pur-R6U5QcCi.js","assets/projets-9cIlePUJ.js","assets/Projets-CbOJ0Knz.js","assets/Projets-COO7WDEE.css","assets/projets-pur-2ZEMRNDU.js","assets/protocoles-YokHHojZ.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-Noa9uYOZ.js","assets/qualification-BvWXKXan.js","assets/quiz-5qMPWZVi.js","assets/Rapport-CoN7bFll.js","assets/Recommandations-YdzOK8m3.js","assets/regler-Bbl_THVn.js","assets/regler-C5hcM02_.css","assets/regler-la-seance-serveur-Bs6rzqZX.js","assets/relances-pur-lwRTXc5E.js","assets/releve-des-avis-Dd4_z_iy.js","assets/SalonFoyer-BYsP3Rym.js","assets/secretariat-admin-B16io4xw.js","assets/Secretariat-Cy79Zw30.css","assets/Secretariat-y4H9jNIj.js","assets/Signatures-CAPGvoPd.js","assets/SignerUnPdf-3ZSDWnnh.js","assets/Synthese-rX8HIGqx.js","assets/SyntheseGraphes-CPxgvLVD.js","assets/systeme-TPy-pF7j.css","assets/Tableau-1HwyCNBk.js","assets/temps-B4nRgjDI.js","assets/Textes-CNwE21Kx.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-BduugKyy.js","assets/tiroirs-CkDzpGy0.css","assets/trone-39JBPu2-.js","assets/trone-CQ2DUl_d.css","assets/useAudiences-BlTCLTAx.js","assets/useClotureDuJour-3UFrCBFX.js","assets/Vitrine-BWilTqQJ.css","assets/Vitrine-KTD7X2QO.js","assets/_admin-Cao-e1aj.js","assets/_contrat-bo5igu7f.js","assets/_heures-CdBiNVih.js","assets/_reuni-DyzwAF2o.js","assets/_shared-BWSEABmA.js","assets/_signature-DSkyEANp.js","assets/_ui-BrUDlmuM.css","assets/_ui-DcBaJGQH.js"];
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
