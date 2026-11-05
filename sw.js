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
const BUILD = "20261105082851";
const A_GARDER = ["./","assets/Abonnements-CnmDhxlY.js","assets/abonnements-DPTpsxde.js","assets/Academie-oCfYLY6Y.js","assets/Acces-Tg12NzzV.js","assets/afaire-CXLQHJEO.js","assets/AFaire-DXMcxEZz.js","assets/Agents-BkIrbIYT.js","assets/agents-donnees-Cr9bMDa4.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-B1R1n9J7.js","assets/Appels-5FbC1I3S.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/Assistants-BOcxTwZO.css","assets/Assistants-s_nQ0cyr.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/AtelierDesContenus-DSmwoM_3.js","assets/Audience-CnN8Fwjy.js","assets/Aujourdhui-cHHsApYg.js","assets/avant-le-fauteuil-lecture--wJXnan6.js","assets/AvantLeFauteuil-DhgIdWBV.js","assets/avis-fiches-iNaVAFQ6.js","assets/AvisGoogle-DaPXfwX9.css","assets/AvisGoogle-DkgIsDP9.js","assets/bilan-B-bfPYR0.css","assets/bilan-DkXYQ2JV.js","assets/BilanMensuel-B22DZ1RC.js","assets/Branches-uvh0FHQb.js","assets/bridges-DVrFJi7C.js","assets/Caisse-BNSiRNB9.js","assets/caisse-du-soir-io94a3OD.js","assets/Caisses-CE_HE9tn.js","assets/Calendrier-evCFcFIV.js","assets/campagnes-pur-DbOhR0jd.js","assets/Carnet-D3PwFa1V.js","assets/carte-DhzaV96u.js","assets/carte-_W_-xBPj.css","assets/CarteModal-DCdzr4qO.js","assets/CartesCadeaux-CfiZgAoD.js","assets/Catalogue-CvPy3Ke8.js","assets/CentreDeCommande-CfNCqypH.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-BnW6HpCm.js","assets/certificat-DCEPvCco.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-C8rQQq0e.js","assets/chiffre-du-jour-pur-DXJUSU_N.js","assets/ChiffreDesPrestations-CiKJSOPQ.js","assets/client-BjMpYaGh.js","assets/cloture-du-jour-CmlK2HE1.js","assets/ClotureDuTiroir-BDHl-qgF.js","assets/ClotureDuTiroir-C6vPx-E_.css","assets/Coffre-Cfo6kHTl.js","assets/components-C3nNv1p3.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-CQeLqb2a.js","assets/Comptes-DQwmOjRr.js","assets/consultation-CRW6QcWf.css","assets/consultation-D57RfscZ.js","assets/Consultations-CwEScTMu.js","assets/consultNotes-OF19eqdh.js","assets/Conversations-D4WwB5Zo.css","assets/Conversations-yKW6Qg_9.js","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-CUIlq009.js","assets/currency-qfIhGmrs.js","assets/Customers-CJwEpbp-.js","assets/Dashboard-B2x7VsE_.css","assets/Dashboard-Cu0HlcES.js","assets/dates-DnCKJ4pi.js","assets/Demandes-Du65s8Ot.js","assets/DepenseEnUnePhrase-BIGRlGqP.css","assets/DepenseEnUnePhrase-CbJb3Cu3.js","assets/Depenses-Cc-hLWGT.js","assets/depenses-saisie-DpUN36mU.js","assets/dernier-message-pur-CBYWnq8m.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-QSNoh45q.js","assets/diagnostics-au-trone-IAd2EEh2.js","assets/Dictee-BRhPFWvT.js","assets/Dictee-D2P9yM7v.css","assets/dictee-pur-Bub7qewt.js","assets/Discussions-BsJtWTkn.js","assets/EditeurDesOffres-BEWq3xMP.js","assets/Encaissements-OhOx2x9z.js","assets/enfants-1B2A-0Zx.js","assets/Engagements-BdZvjhAl.js","assets/Engagements-Cj5S9MhG.css","assets/EntreDeuxSeances-BZOLyi6V.js","assets/Evaluation-C8NbUVfr.js","assets/FacturePrestataire-LlYSCcgT.js","assets/Factures-Du4QzZAP.js","assets/FenetreDesCivilites-bk_vni_K.js","assets/FenetreDesCivilites-zfNk1aak.css","assets/FenetreDuPoint-DakeBy4w.js","assets/Fil-BqZ3c9hU.js","assets/finances-BMFnlkRx.css","assets/fon-iB3B60ux.js","assets/Fournisseurs-B8ICRtX7.js","assets/fournisseurs-Cn7z9srC.js","assets/foyer-pjGV7Rsn.js","assets/gerard-donnees-jI7a0AUi.js","assets/Gerard-GNm0HeWX.js","assets/Gerard-kOIEy-PT.css","assets/gestes-conversation-mpuZU2pp.js","assets/HomeRituals-haWJkgH_.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-BjMHQqNZ.js","assets/ia-centre-B41w-GyD.js","assets/ia-diagnostic-pur-BBLrGY5l.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-tableau-pur-CSRjGtTf.js","assets/identite-kdSmuh3r.js","assets/index-C3BKeGys.js","assets/index.es-DZinHn6L.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-CtSw64JV.js","assets/jspdf.es.min-ZfQJRr_5.js","assets/JustePrix-BSAEAzBQ.js","assets/kkiapay-CcXEXA06.js","assets/kkiapay-widget-DnUhUNd4.js","assets/Laboratoire-Dz8Ewrdk.js","assets/LaJournee-DNg04cPb.css","assets/LaJournee-Do-fPqH-.js","assets/LettresAuDossier-BsOUxbOH.js","assets/LienMndPay-lA2rw4AL.js","assets/Marketing-CSwBbChU.js","assets/MarketingBranche-ClQwJjqv.js","assets/Marque-DDVrEoQM.js","assets/MesPourboires-CZnKw4yz.js","assets/MesPourboires-D9I_9rZf.css","assets/MesTaches-BCzGPCYS.js","assets/MesTaches-Cc4XUDf6.css","assets/momo-C2ZVfV9J.js","assets/MonMois-BF5mgWAd.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-BsJHTicJ.js","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/opale-Djpz4QS5.js","assets/paliers-11xjBDqw.js","assets/Parametres-DgRklrXk.js","assets/parcours-BgaP43iZ.js","assets/Parrainages-BRYmR8AQ.js","assets/Parrainages-gAHAPB_6.css","assets/PassageAvantLeFauteuil-BX6KT6KC.js","assets/pdf-CahC4RIe.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/Personas-zhxM-cQp.js","assets/Personnel-BQflypwb.js","assets/photo-RvD0wkaG.js","assets/pilotage-D8kf1Co8.css","assets/Pourboires-Bgd9QDH6.js","assets/Predictions-BkfMKSmV.js","assets/Prestataires-BaZ8wKJ1.js","assets/Prets-7corgkQi.js","assets/PrevisionDuMois-CsEJPWHV.js","assets/PrevisionDuMois-DlFTw3OX.css","assets/Previsions-om20ftYH.js","assets/previsions-pur-B9eR-te0.js","assets/Previsions-r4v19Anp.css","assets/processus-pur-R6U5QcCi.js","assets/Projets-CkNqnd-2.js","assets/Projets-COO7WDEE.css","assets/projets-DSrOHGhG.js","assets/projets-pur-2ZEMRNDU.js","assets/protocoles-C3cbL_To.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-BhGobjgj.js","assets/qualification-DxtJhXCL.js","assets/quiz-5qMPWZVi.js","assets/Rapport-CJ6WPzn5.js","assets/Recommandations-CXyR9FSg.js","assets/regler-C5hcM02_.css","assets/regler-D8DELDrh.js","assets/regler-la-seance-serveur-Bs6rzqZX.js","assets/relances-pur-lwRTXc5E.js","assets/releve-des-avis-CgZ0JD8S.js","assets/SalonFoyer-LNCKzljK.js","assets/secretariat-admin-D0HXoUkZ.js","assets/Secretariat-Cy79Zw30.css","assets/Secretariat-DyQgUeFd.js","assets/Signatures-4DT3iFYU.js","assets/SignerUnPdf-NqZXMiv8.js","assets/Synthese-Nqfzcv6C.js","assets/SyntheseGraphes-BIG_2Sm0.js","assets/systeme-TPy-pF7j.css","assets/Tableau-jaT4G7Eg.js","assets/temps-BZRINBjU.js","assets/Textes-DLpOzRbT.css","assets/Textes-j0ZkCXf1.js","assets/tiroirs-B-lE_T_v.js","assets/tiroirs-CkDzpGy0.css","assets/trone-DQVzvvmA.css","assets/trone-p7LWWaRd.js","assets/useAudiences-B3nAZ19-.js","assets/useClotureDuJour-DhpToppK.js","assets/Vitrine-BWilTqQJ.css","assets/Vitrine-zl96YYbU.js","assets/_admin-BQu_wKau.js","assets/_contrat-fOjrkvrJ.js","assets/_heures-Bp-8CdHP.js","assets/_reuni-D-f0xzEG.js","assets/_shared-DvbrCpei.js","assets/_signature-D64FgXd3.js","assets/_ui-BWMA-PlM.css","assets/_ui-Byjmvdlh.js"];
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
