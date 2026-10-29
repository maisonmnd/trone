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
const BUILD = "20261029224913";
const A_GARDER = ["./","assets/Abonnements-07tVqxnc.js","assets/abonnements-DsrQ31u0.js","assets/Academie-CskbRq2S.js","assets/Acces-Cw5RCWb9.js","assets/actions-COMEuvFR.js","assets/AFaire-C967AUq2.js","assets/afaire-Coqm3ldr.js","assets/Agents-CSqwjNBb.js","assets/agents-donnees-BMwiIcMo.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-b1kEqHrM.js","assets/Appels-TQyQ9zMt.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/AtelierDesContenus-KO-9WgJ_.js","assets/AuComptoir-CtoffYep.js","assets/Audience-zkklAq6J.js","assets/Aujourdhui-Co6386TX.js","assets/avis-fiches-CPfdj0D9.js","assets/AvisGoogle-CuuEvfOA.js","assets/AvisGoogle-DaPXfwX9.css","assets/bilan-B-bfPYR0.css","assets/bilan-CGbjj5dX.js","assets/BilanMensuel-DkYxtVd5.js","assets/Branches-QwV3IzS1.js","assets/bridges-BiphVFDL.js","assets/Caisse-CTtj2y60.js","assets/caisse-du-soir-Bl8Z4v09.js","assets/Caisses-BI4NMr3X.js","assets/Calendrier-ByY_LtnU.js","assets/campagnes-pur-CBdpUIDf.js","assets/Carnet-mkIL0Hfl.js","assets/carte-B4QFRuB-.js","assets/carte-_W_-xBPj.css","assets/CarteModal-Br2ZQLzq.js","assets/CartesCadeaux-BFJQ5prV.js","assets/Catalogue-5db7j2uG.js","assets/CentreDeCommande-BQo9ey8I.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-BfkVRlge.js","assets/certificat-C5CAxKCe.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-CWkNHhg0.js","assets/chiffre-du-jour-pur-CGAIueMX.js","assets/ChiffreDesPrestations-qD_FHZlJ.js","assets/client-B2a4W3fM.js","assets/ClotureDuTiroir-C6vPx-E_.css","assets/ClotureDuTiroir-CerKNLQb.js","assets/Coffre-CQQhXIRz.js","assets/components-BHvu67-8.js","assets/compte-BqgHt7GE.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-CmPazvop.js","assets/Comptes-IRbVVW6e.js","assets/Comptoir-Bze_SMHa.js","assets/consultation-C9PMd1Zs.js","assets/consultation-CRW6QcWf.css","assets/Consultations-mnFaBork.js","assets/consultNotes-MqYo3vst.js","assets/Conversations-C0pbHRBX.js","assets/Conversations-D4WwB5Zo.css","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-CPxhNS_q.js","assets/currency-qfIhGmrs.js","assets/Customers-BP1YHs6M.js","assets/Dashboard-CFKbCxjg.js","assets/Dashboard-zjGteuUE.css","assets/dates-DdargKMO.js","assets/Demandes-Cz4wjYsM.js","assets/Depenses-Ct9KBbWj.js","assets/dernier-message-pur-CBYWnq8m.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-CvlwPy-P.js","assets/diagnostics-au-trone-MZFn2AJR.js","assets/Discussions-DnaJiZOV.js","assets/EditeurDesOffres-B4BELlm4.js","assets/Encaissements-Db6QOE6i.js","assets/enfants-D-xWjlsv.js","assets/Engagements-CEo4wf_P.js","assets/Engagements-Cj5S9MhG.css","assets/EntreDeuxSeances-mlRAzwcW.js","assets/equipe-B_9ZHz24.css","assets/Evaluation-BV43U-pB.js","assets/FacturePrestataire-DkY3frZK.js","assets/Factures-C09Z6vmu.js","assets/FenetreDesCivilites-B-SpMzW4.js","assets/FenetreDesCivilites-zfNk1aak.css","assets/FenetreDuPoint-CVhOyA7B.js","assets/Fil-CUaUiGtg.js","assets/finances-BMFnlkRx.css","assets/fon-DXgGuYAe.js","assets/fon-pur-CgVkbJ8O.js","assets/fournisseurs-DCDKpvXg.js","assets/Fournisseurs-x_4OS37A.js","assets/foyer-UknZpejF.js","assets/Gerard-BmspH6rU.js","assets/Gerard-DjWZ3MUn.css","assets/gerard-donnees-DyX6h0Wq.js","assets/gestes-conversation-D4gEnkc1.js","assets/HomeRituals-Cv1DhhID.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-33zmpXLp.js","assets/ia-centre-1GOpkEr-.js","assets/ia-diagnostic-pur-hHYxp10Y.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-recu-pur-DcucZqpR.js","assets/identite-WZ_5mEuD.js","assets/index-C0V1LEXb.js","assets/index.es-CFXesgZe.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-Ba0WA6R8.js","assets/jspdf.es.min-PJI6pbOJ.js","assets/JustePrix-Bf7H1gXW.js","assets/kkiapay-Dfc2jIpo.js","assets/kkiapay-widget-DnUhUNd4.js","assets/Laboratoire-B9AZ3qZg.js","assets/laboratoire-C2I_W4Tc.js","assets/LettresAuDossier-Bm4twvci.js","assets/LienMndPay-DzwrlkkN.js","assets/maisons-CSSFrqZy.js","assets/Marketing-B5kRc1tq.js","assets/MarketingBranche-oe5u9zAF.js","assets/Marque-DYipAloR.js","assets/MesTaches-Cc4XUDf6.css","assets/MesTaches-DshV2Lyj.js","assets/momo-B-QSeWY6.js","assets/MonMois-DP00bVcy.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-CHl0daU8.js","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/paliers-B6D9U-Qk.js","assets/Parametres-BobSssfw.js","assets/parcours-CDz7jyBN.js","assets/Parrainages-CxEvW5Pt.js","assets/Parrainages-gAHAPB_6.css","assets/pdf-D8-aUn1k.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/Personas-D-j7trcQ.js","assets/Personnel-Wvwsefn0.js","assets/photo-BLtuaOYL.js","assets/pilotage-D8kf1Co8.css","assets/Predictions-Dlk6GjTQ.js","assets/prestataires-CgePVx4Q.js","assets/Prestataires-CRvLVQRD.js","assets/Prets-DVn9GafM.js","assets/prevision-du-mois-pur-D6sJa5lw.js","assets/Previsions-D-0__Buz.css","assets/Previsions-DCk8jnQ_.js","assets/previsions-pur-by06JJEW.js","assets/processus-pur-BLN25j-E.js","assets/Projets-COO7WDEE.css","assets/projets-dQJxoczp.js","assets/Projets-mZauC0le.js","assets/projets-pur-2ZEMRNDU.js","assets/protocoles-C_r3GXAY.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-CU6HOw3U.js","assets/qualification-j61FCJyE.js","assets/quiz-5qMPWZVi.js","assets/Rapport-CmeFyg7j.js","assets/RattacherUneCarte-C6CQs0yp.js","assets/Recommandations-DYx6zFKq.js","assets/regler-C5hcM02_.css","assets/regler-ChF9PBXt.js","assets/regler-la-seance-serveur-Bs6rzqZX.js","assets/relances-pur-CTGdiNru.js","assets/releve-des-avis-BvxvayhO.js","assets/SalonFoyer-CDRyom-L.js","assets/secretariat-admin-kOUH2YgR.js","assets/Secretariat-Cy79Zw30.css","assets/Secretariat-DNI6n6AF.js","assets/Signatures-0W2CQ8Zv.js","assets/SignerUnPdf-C_xL-L3i.js","assets/Synthese-DIYIehlL.js","assets/SyntheseGraphes-C1W8pUJQ.js","assets/systeme-TPy-pF7j.css","assets/Tableau-Bic9rXoL.js","assets/temps-DWwofFE-.js","assets/Textes-Cfy00kRb.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-C5WElSjN.js","assets/trace-du-moyen-pur-Bx8-suHn.js","assets/trone-BMdkuVGH.css","assets/trone-CiqdXfsg.js","assets/ui-DIb3IRmd.js","assets/useAudiences-CovHW4FO.js","assets/vente-C7YWXkHo.css","assets/Vitrine-BWilTqQJ.css","assets/Vitrine-g6LJXRBj.js","assets/_admin-CDVT9U2p.js","assets/_contrat-GAPuad9W.js","assets/_heures-Bz-YrXai.js","assets/_reuni-8ZRr5zPm.js","assets/_shared-COfYTgg0.js","assets/_signature-B82C_PfD.js","assets/_ui-BWMA-PlM.css","assets/_ui-CkuXr2fh.js"];
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
