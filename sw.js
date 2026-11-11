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
const BUILD = "20261111221901";
const A_GARDER = ["./","assets/Abonnements-DK0qpUWY.js","assets/abonnements-DkQL-fB_.js","assets/Abonnements-DTY7p2DH.css","assets/Academie-AhrrJlva.js","assets/Acces-C-DBdhTF.js","assets/AFaire-BiNNTwjF.js","assets/afaire-CgRT_Frj.js","assets/Agents-DGKWjccZ.js","assets/agents-donnees-kh6Y1dJY.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-DauCXL36.js","assets/Appels-CXsW97jC.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/Assistants-D9i2Xwmg.css","assets/Assistants-DCMteyHx.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/AtelierDesContenus-KyqEqxaW.js","assets/Audience-BcdKuXiX.js","assets/Aujourdhui-D439mVIW.js","assets/avant-le-fauteuil-lecture-rfEdtSY8.js","assets/AvantLeFauteuil-DDF0PVNK.js","assets/avis-fiches-C5g_nibv.js","assets/AvisGoogle-CezNlPBI.js","assets/AvisGoogle-DaPXfwX9.css","assets/BadgeEssai-D3DmnaGh.js","assets/bilan-B-bfPYR0.css","assets/bilan-BWxPha2c.js","assets/BilanMensuel-DvK5A94l.js","assets/Branches-DNR5D0UH.js","assets/bridges-C-Q4Tuhs.js","assets/caisse-du-soir-C-_n8iOW.js","assets/caisse-du-soir-C6vPx-E_.css","assets/Caisse-inaMwnIM.js","assets/Caisses-Cn0Fa7-0.js","assets/Calendrier-BN9AYok8.js","assets/campagnes-pur-DFrBLtoQ.js","assets/Carnet-DegsnHTS.js","assets/carte-3tjwwVq5.js","assets/carte-_W_-xBPj.css","assets/CarteModal-CMXhssj0.js","assets/CartesCadeaux-BMT5Gdy5.js","assets/Catalogue-CTtTqngS.js","assets/CentreDeCommande-B0G5_ZE3.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-BFR5rLVj.js","assets/certificat-CsXnY79R.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-DVpcIiOj.js","assets/chiffre-du-jour-pur-DCMgK44b.js","assets/ChiffreDesPrestations-BWUcyR2t.js","assets/client-C9EmHM6z.js","assets/cloture-du-jour-NiuAoNv2.js","assets/ClotureDuTiroir-BGGHH2IK.js","assets/Coffre-Dp2NqThI.js","assets/collecte-mtn-pur-C_fJpWL6.js","assets/components-Dcnh8Emk.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-DxzUoxrZ.js","assets/Comptes-Bv7ufvbL.js","assets/consultation-CRW6QcWf.css","assets/consultation-D_8eYgKF.js","assets/Consultations-Cljeg94w.js","assets/consultNotes-Cti9QZUY.js","assets/Conversations-0MWUkYqj.js","assets/Conversations-D4WwB5Zo.css","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-BTYLxZrr.js","assets/currency-qfIhGmrs.js","assets/Customers-B6XgrjQG.js","assets/Dashboard-B2x7VsE_.css","assets/Dashboard-qpBwN_zX.js","assets/dates-CqyhrCiM.js","assets/Demandes-DdAo19Jw.js","assets/DepenseEnUnePhrase-BIGRlGqP.css","assets/DepenseEnUnePhrase-mQ0U28Su.js","assets/depenses-saisie-D1j5nfYj.js","assets/Depenses-Vu7o7tdD.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-DJkyI7gN.js","assets/diagnostics-au-trone-CioDi780.js","assets/Dictee-BqH-4eyc.js","assets/Dictee-D2P9yM7v.css","assets/dictee-pur-DIlYWCrp.js","assets/Discussions-Dq6-uoVU.js","assets/EditeurDesOffres-A6AYdQHy.js","assets/Encaissements-Bn7nM2rY.js","assets/enfants-Tfm5Vlw0.js","assets/Engagements-Cj5S9MhG.css","assets/engagements-coffre-DOfVGyNI.js","assets/Engagements-DX8sLREG.js","assets/EntreDeuxSeances-BHQ1xzPx.js","assets/Evaluation-Bfotc-ya.js","assets/Factures-Bzrhz1hF.js","assets/FenetreDesCivilites-DsPUmoul.js","assets/FenetreDesCivilites-zfNk1aak.css","assets/FenetreDuPoint-CGWEVQMc.js","assets/Fil-u4HJ_NsI.js","assets/finances-BMFnlkRx.css","assets/fon-DzOoFHsE.js","assets/Fournisseurs-1rP5bxDw.js","assets/fournisseurs-6WthfFfl.js","assets/foyer-NIEjFgRC.js","assets/Gerard-Cgj-zsJh.css","assets/gerard-donnees-ZwWMRfJQ.js","assets/Gerard-xf_BaxV-.js","assets/gestes-conversation-rV9ICzh7.js","assets/heures-des-rappels-pur-Dig9pZpo.js","assets/HomeRituals-71_MDxdo.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-CBRp34Df.js","assets/ia-centre-CQf25rPM.js","assets/ia-diagnostic-pur-BBLrGY5l.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-tableau-pur-p6UvREJe.js","assets/identite-CxWi1cwr.js","assets/index-DexJ-eEn.js","assets/index.es-54xMCZ4M.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-CPg08uB_.js","assets/jspdf.es.min-C202bFoM.js","assets/JustePrix-DEsNHjYz.js","assets/kkiapay-DuYB9yNo.js","assets/kkiapay-widget-DnUhUNd4.js","assets/Laboratoire-EzT2A7vu.js","assets/LaJournee-Bn_G0HCt.css","assets/LaJournee-Dtk5E_WS.js","assets/LesPaiements-C9cEZlne.css","assets/LesPaiements-Cur3y9jp.js","assets/LettresAuDossier-B8TmIdRV.js","assets/LienMndPay-CubA5EbM.js","assets/Marketing-C0tI-0L3.js","assets/MarketingBranche-C7-kRPv-.js","assets/Marque-BbqGca9L.js","assets/MesPourboires-CENjelyb.css","assets/MesPourboires-FohEhnx5.js","assets/MesTaches-Cc4XUDf6.css","assets/MesTaches-zuiMz0k2.js","assets/momo-C2ZVfV9J.js","assets/MonMois-C78RX4vo.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-BFTa57KS.js","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/opale-rkvk5Ehd.js","assets/oreille-B1AMUmZh.js","assets/paie-du-5-DeJq-K_U.css","assets/paie-du-5-h9Yt5LuT.js","assets/paie-du-5-pur-b11DnqZJ.js","assets/PaieParMtn-DHA21Oyd.js","assets/paliers-D6xdcb3g.js","assets/Parametres-bi_xfPDl.js","assets/parcours-C3z0i2E5.js","assets/Parrainages-focnzJ2d.js","assets/Parrainages-gAHAPB_6.css","assets/PassageAvantLeFauteuil-pT4Czo2A.js","assets/pdf-BaqvKIX0.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/periode-des-pourboires-pur-BUWqfwov.js","assets/Personas-DmVxfEiB.js","assets/Personnel-CTKxvWxa.js","assets/photo-mWkAejbM.js","assets/pilotage-D8kf1Co8.css","assets/Pourboires-CGpUoTUa.js","assets/Predictions-pqhrrwbV.js","assets/Prestataires-C8bHPbHO.js","assets/Prets-CN9osjlB.js","assets/PrevisionDuMois-BvMAls2h.js","assets/PrevisionDuMois-DlFTw3OX.css","assets/Previsions-9BU2Vg1T.css","assets/Previsions-Bj0fHZ7w.js","assets/previsions-pur-C0fMEpvm.js","assets/processus-pur-R6U5QcCi.js","assets/projets-AlQ63tVu.js","assets/Projets-BhqPNEmk.js","assets/Projets-COO7WDEE.css","assets/projets-pur-2ZEMRNDU.js","assets/protocoles-FdLuvPHs.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-DvZwpIab.js","assets/qualification-SHfM3qiP.js","assets/quiz-5qMPWZVi.js","assets/Rapport-Dc_QnJNB.js","assets/Recommandations-CsMegK0e.js","assets/regler-DHR_B1Dm.css","assets/regler-igt5UN0C.js","assets/relances-pur-BacTXlI2.js","assets/releve-des-avis-B3uQ2nmG.js","assets/SalonFoyer-bto3Hgg2.js","assets/secretariat-admin-CkaprLQt.js","assets/Secretariat-CbgsHK-Z.js","assets/Secretariat-Cy79Zw30.css","assets/Signatures-DTbjMRgo.js","assets/SignerUnPdf-DQ7oenUm.js","assets/Synthese-Cu0wkqMY.js","assets/SyntheseGraphes-Bp0W4BFD.js","assets/systeme-TPy-pF7j.css","assets/Tableau-eOOzjU4a.js","assets/temps-Fb4-qqOk.js","assets/Textes-8P2Slrk2.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-CkDzpGy0.css","assets/tiroirs-DGMGUzrb.js","assets/trone-Ce93K3Rx.js","assets/trone-CKg79qbi.css","assets/useAudiences-BEPOTYPU.js","assets/useClotureDuJour-xcv20Bp7.js","assets/Vitrine-Bvg2lGpV.js","assets/Vitrine-BWilTqQJ.css","assets/_admin-CiqJjLqZ.js","assets/_contrat-BHeiOZ-5.js","assets/_reuni-CZIMKFCT.js","assets/_shared-BbCQupV8.js","assets/_signature-WZd8PN87.js","assets/_ui-BLqcY1CI.js","assets/_ui-BrUDlmuM.css"];
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
