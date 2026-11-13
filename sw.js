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
const BUILD = "20261113132756";
const A_GARDER = ["./","assets/Abonnements-DE6KRS18.js","assets/abonnements-Dtj-jPEw.js","assets/Abonnements-DTY7p2DH.css","assets/Academie-0bwSIxH7.js","assets/Acces-Lvt2FuEm.js","assets/afaire-BDzr0NZT.js","assets/AFaire-zAGgJrFI.js","assets/Agents-B-9M2LPO.js","assets/agents-donnees-CjPq8uZT.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-DmFT8T4u.js","assets/Appels-lN6EwWTd.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/Assistants-CEEcFOYg.js","assets/Assistants-D9i2Xwmg.css","assets/AtelierDesContenus-BCDbBnRs.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/Audience-BijvYcep.js","assets/Aujourdhui-D6gTYS4M.js","assets/avant-le-fauteuil-lecture-hB8lzOBL.js","assets/AvantLeFauteuil-DdZ_5Wl_.js","assets/avis-fiches-CsRLYHaC.js","assets/AvisGoogle-CWXRZPCG.js","assets/AvisGoogle-DaPXfwX9.css","assets/BadgeEssai-CnrBtg2K.js","assets/besoins-CPS3R0aC.js","assets/BesoinsEtRegles-CzntMbJE.css","assets/BesoinsEtRegles-DSexZqV8.js","assets/bilan-B-bfPYR0.css","assets/bilan-BF9IW0wL.js","assets/BilanMensuel-qVQxbqJa.js","assets/Branches-QIhflNmd.js","assets/bridges-DOhyjRyc.js","assets/Caisse-bpV9QRoM.js","assets/caisse-du-soir-C6vPx-E_.css","assets/caisse-du-soir-C7LBnrwC.js","assets/Caisses-C0BvUby8.js","assets/Calendrier-Dj2Y-Nap.js","assets/campagnes-pur-DaSz4bVM.js","assets/Carnet-DVUUqKiq.js","assets/carte-DAAacoJy.js","assets/carte-_W_-xBPj.css","assets/CarteModal-CB7C0dGO.js","assets/CartesCadeaux-DvuqECxB.js","assets/Catalogue-BYs4JgDR.js","assets/CentreDeCommande-0GGzG__c.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-D_7c9bv_.js","assets/certificat-BDSUmGcu.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-DIQjKkg_.js","assets/chiffre-du-jour-pur-5psu0J5Q.js","assets/ChiffreDesPrestations-DP3iFHPc.js","assets/client-C87diuao.js","assets/cloture-du-jour-BGgi2Ggx.js","assets/ClotureDuTiroir-DoFl28xQ.js","assets/Coffre-CRssmvPj.js","assets/collecte-mtn-pur-Bq3uWgWT.js","assets/components-BNPPOLEP.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-ChKwAHCR.js","assets/Comptes-NzmLfEOs.js","assets/consultation-CRW6QcWf.css","assets/consultation-DaY0s4EI.js","assets/Consultations-CmEy4AGf.js","assets/consultNotes-ClmeRglr.js","assets/Conversations-Cj7AVfj4.js","assets/Conversations-D4WwB5Zo.css","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-B8HSPpjx.js","assets/currency-qfIhGmrs.js","assets/Customers-UNsABFSf.js","assets/Dashboard-B2x7VsE_.css","assets/Dashboard-BpIz6Wv8.js","assets/dates-JYeLIHrl.js","assets/Demandes-CuwldAEh.js","assets/DepenseEnUnePhrase-BIGRlGqP.css","assets/DepenseEnUnePhrase-sqpKE14z.js","assets/Depenses-CsU6bgUa.js","assets/depenses-saisie-DweX6h76.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-C3v4eoi4.js","assets/diagnostics-au-trone-vCof9VSI.js","assets/Dictee-BIQFbKhA.css","assets/Dictee-BWsf0lK4.js","assets/dictee-pur-D9jrYXij.js","assets/Discussions-DOg6xzol.js","assets/EditeurDesOffres-DWljt_m9.js","assets/Encaissements-C0xq78d1.js","assets/enfants-rlxhm4ky.js","assets/Engagements-Cj5S9MhG.css","assets/engagements-coffre-GTzFLcLe.js","assets/Engagements-DNWGwALO.js","assets/EntreDeuxSeances-DmuAeZ1Y.js","assets/Evaluation-B679nIhF.js","assets/facture-CKbcJw4-.js","assets/Factures-BGdG0Yyg.js","assets/FenetreDesCivilites-C1v39vYb.js","assets/FenetreDesCivilites-zfNk1aak.css","assets/FenetreDuPoint-D7CxnrJZ.js","assets/Fil-BSrvVojI.js","assets/finances-C8x7Mn4-.css","assets/fon-BuZWrP2C.js","assets/Fournisseurs-BZIAXedc.js","assets/fournisseurs-CmbBEFnS.js","assets/foyer-CLPaw4E5.js","assets/Gerard-Cgj-zsJh.css","assets/Gerard-Cu3xwNbT.js","assets/gerard-donnees-BgtmYc6R.js","assets/gestes-conversation-0CJV2jzV.js","assets/heures-des-rappels-pur-Dig9pZpo.js","assets/HomeRituals-BAfNbt4v.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-Ccr-48AL.js","assets/ia-centre-B4oYgn2u.js","assets/ia-diagnostic-pur-BBLrGY5l.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-tableau-pur-p6UvREJe.js","assets/identite-DiUHk-Ro.js","assets/index-BSR3XNUU.js","assets/index.es-Dw55UMEF.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-DYfET85H.js","assets/jspdf.es.min-DivvDdN9.js","assets/JustePrix-DlY2VZRb.js","assets/kkiapay-CFxd6ubg.js","assets/kkiapay-widget-CVmsl9OE.js","assets/Laboratoire-DznR3JST.js","assets/LaJournee-Bn_G0HCt.css","assets/LaJournee-C4bAqeRs.js","assets/LesPaiements-C9cEZlne.css","assets/LesPaiements-yCc2Edrx.js","assets/LettresAuDossier-BPAwfyUn.js","assets/LienMndPay-DgFD0GhI.js","assets/Marketing-BG1VWqoC.js","assets/MarketingBranche-wq9XHv0L.js","assets/Marque-wxyW3qVa.js","assets/MesPourboires-a5hMk02N.js","assets/MesPourboires-CENjelyb.css","assets/MesTaches-BuDwPjsN.js","assets/MesTaches-Cc4XUDf6.css","assets/momo-C2ZVfV9J.js","assets/MonMois-DKqdrAPY.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/MtnMoMo-DHCd9-8U.js","assets/objectifs-BUKaqaH2.js","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/opale-YMcRZSYH.js","assets/oreille-B1AMUmZh.js","assets/paie-du-5-BMYZ05TP.js","assets/paie-du-5-DeJq-K_U.css","assets/paie-du-5-pur-CPiCK8fv.js","assets/paie-par-mtn-B2ldb3o5.js","assets/PaieParMtn-Vh8XArCU.js","assets/paliers-CmrNL39z.js","assets/Parametres-D9UuVjCc.js","assets/parcours-BoyNGqHz.js","assets/Parrainages-BfTH97xo.js","assets/Parrainages-gAHAPB_6.css","assets/PassageAvantLeFauteuil-BV_p10GI.js","assets/pdf-DfB2RtGs.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/periode-des-pourboires-pur-BUWqfwov.js","assets/Personas-ULZo4XED.js","assets/Personnel-BJgwCPdP.js","assets/photo-Bp8_MX_Z.js","assets/pilotage-D8kf1Co8.css","assets/Pourboires-BwUrAArp.js","assets/Predictions-B7rthFQW.js","assets/Prestataires-DePAwGJP.js","assets/Prets-B8CUNwVR.js","assets/PrevisionDuMois-DlFTw3OX.css","assets/PrevisionDuMois-goenJPos.js","assets/Previsions-9BU2Vg1T.css","assets/Previsions-DsHN5Gem.js","assets/previsions-pur-AgpqdfAb.js","assets/processus-pur-R6U5QcCi.js","assets/projets-CNLzZjMJ.js","assets/Projets-COO7WDEE.css","assets/Projets-DYISujpW.js","assets/projets-pur-2ZEMRNDU.js","assets/protocoles-CHQdgFI4.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-BDDoS60g.js","assets/qualification-BHRZf2B8.js","assets/quiz-5qMPWZVi.js","assets/Rapport-CR_vSb4U.js","assets/Recommandations-B5D9ZhAd.js","assets/regler-C8cV8rcI.js","assets/regler-DHR_B1Dm.css","assets/regler-par-fedapay-pur-G8CEJdGn.js","assets/relances-pur-BacTXlI2.js","assets/releve-des-avis-PZKXRKu6.js","assets/SalonFoyer-iZ6ap-wB.js","assets/secretariat-admin-DmYgYwWD.js","assets/Secretariat-Cy79Zw30.css","assets/Secretariat-DVcuvNVx.js","assets/Signatures-CrLVSUFA.js","assets/SignerUnPdf-C4hZQZ5m.js","assets/Synthese-CNz_wjrk.js","assets/SyntheseGraphes-BYWjwMRY.js","assets/systeme-TPy-pF7j.css","assets/Tableau-D6cG2aN5.js","assets/temps-C6GTatb1.js","assets/Textes-DLpOzRbT.css","assets/Textes-DO_PwOa6.js","assets/tiroirs-BrVUVKxF.js","assets/tiroirs-CkDzpGy0.css","assets/trone-BBIXPkTh.js","assets/trone-Dg6wh-u1.css","assets/useAudiences-BuUMAszn.js","assets/useClotureDuJour-qULnAmHS.js","assets/Vitrine-BKiNqszG.js","assets/Vitrine-BWilTqQJ.css","assets/_admin-Dn17VoUr.js","assets/_contrat-h5JM0m0C.js","assets/_reuni-GlBNZ76u.js","assets/_shared-DdFZWDKO.js","assets/_signature-CqRobQeR.js","assets/_ui-BfH8TBl1.js","assets/_ui-BrUDlmuM.css"];
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
