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
const BUILD = "20261111124327";
const A_GARDER = ["./","assets/Abonnements-BesI_eND.js","assets/abonnements-_Qb8F5p6.js","assets/Academie-BiQMyonS.js","assets/Acces-CFprW1tt.js","assets/afaire-CwvcCuSm.js","assets/AFaire-DLZCpWck.js","assets/Agents-BKlt_E61.js","assets/agents-donnees-B0RV2yJc.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-CFQd_oLD.js","assets/Appels-CU6mFmfU.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/Assistants-BOcxTwZO.css","assets/Assistants-Skx5apTx.js","assets/AtelierDesContenus-BxgSKTJT.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/Audience-Cut0HEtc.js","assets/Aujourdhui-DZfj913F.js","assets/avant-le-fauteuil-lecture-B5tc0Rn7.js","assets/AvantLeFauteuil-CHgfVijK.js","assets/avis-fiches-CQObmidE.js","assets/AvisGoogle-BuGrpz6L.js","assets/AvisGoogle-DaPXfwX9.css","assets/bilan-B-bfPYR0.css","assets/bilan-BJsbql9n.js","assets/BilanMensuel-Dg1y9yYZ.js","assets/Branches-BZbt59iR.js","assets/bridges-Bjkx_tXK.js","assets/Caisse-BDjeljCr.js","assets/caisse-du-soir-DKx3lYju.js","assets/Caisses-C2ZnDuuh.js","assets/Calendrier-DbTb9S2f.js","assets/campagnes-pur-gRCkfLPY.js","assets/Carnet-DqpRKj5D.js","assets/carte-etPn1Fmf.js","assets/carte-_W_-xBPj.css","assets/CarteModal-DxocgsiU.js","assets/CartesCadeaux-xt22cq86.js","assets/Catalogue-CfW4u2Mo.js","assets/CentreDeCommande-BQJ0Tsbe.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-ZzrXqhEq.js","assets/certificat-qU5W-zJf.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-iAsoowor.js","assets/ChiffreDesPrestations-evOGTQT5.js","assets/client-BVVceCdw.js","assets/cloture-du-jour-CIaDS7W7.js","assets/ClotureDuTiroir-C6vPx-E_.css","assets/ClotureDuTiroir-DlJYGTDJ.js","assets/Coffre-DaQZzGRl.js","assets/components-BGgZlx3l.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-GKD74QbF.js","assets/Comptes-BWsiORgS.js","assets/consultation-CRW6QcWf.css","assets/consultation-Z5ZtqOFI.js","assets/Consultations-w_s3Ugl9.js","assets/consultNotes-C4JhM7aH.js","assets/Conversations-D4WwB5Zo.css","assets/Conversations-DXuUkqBF.js","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-D33DaNtF.js","assets/currency-qfIhGmrs.js","assets/Customers-DSoFgbHs.js","assets/Dashboard-CFbsUimN.js","assets/Dashboard-zjGteuUE.css","assets/dates-CLjw4fXl.js","assets/Demandes-lnmXUqR9.js","assets/Depenses-gh52uyUh.js","assets/depenses-saisie-DS0wWR4F.js","assets/dernier-message-pur-CBYWnq8m.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-Bkoqo-TF.js","assets/diagnostics-au-trone-CJ4Ih3lQ.js","assets/Dictee-1f73ADCT.js","assets/Dictee-D2P9yM7v.css","assets/dictee-pur-bEUjyy2w.js","assets/Discussions-ndGR6zPw.js","assets/EditeurDesOffres-BN_bDwoH.js","assets/Encaissements-B3re1Nt3.js","assets/enfants-CyRZaOGA.js","assets/Engagements-BMkynfju.js","assets/Engagements-Cj5S9MhG.css","assets/EntreDeuxSeances-DKegnIHm.js","assets/Evaluation-D71o6sfI.js","assets/FacturePrestataire-CSQUv94A.js","assets/Factures-kyFSOjci.js","assets/FenetreDesCivilites-CnflWhHl.js","assets/FenetreDesCivilites-zfNk1aak.css","assets/FenetreDuPoint-CL94Jdmg.js","assets/Fil-8Qkm-648.js","assets/finances-BMFnlkRx.css","assets/fon-DYeoHCBn.js","assets/fournisseurs-DNG4-BkV.js","assets/Fournisseurs-MkaqFO8_.js","assets/foyer-B89j4Ieq.js","assets/Gerard-Bfp4ua88.css","assets/gerard-donnees-BOsEffdt.js","assets/Gerard-DTMbrHlI.js","assets/gestes-conversation-BWf2OB_y.js","assets/HomeRituals-BDeFTcmM.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-DJA0OH_w.js","assets/ia-centre-BW9LaOiV.js","assets/ia-diagnostic-pur-BBLrGY5l.js","assets/ia-marque-pur-C5lSdGpx.js","assets/identite-Z8Y2OXAD.js","assets/index-lcmndZIS.js","assets/index.es-BObuoV7K.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-K7RLZgPh.js","assets/jspdf.es.min-CM359xPe.js","assets/JustePrix-BPu5-ndI.js","assets/kkiapay-BJ4jqbbH.js","assets/kkiapay-widget-DnUhUNd4.js","assets/la-journee-C_ADGfG8.js","assets/la-journee-DNg04cPb.css","assets/Laboratoire-CC1fqBVU.js","assets/LaJournee-x4GCrG9P.js","assets/LettresAuDossier-BL37tOHK.js","assets/LienMndPay-CPBEBiLZ.js","assets/maisons-CSSFrqZy.js","assets/Marketing-CaxNS5xk.js","assets/MarketingBranche-D0icOJc-.js","assets/Marque-D2iLfycI.js","assets/MesPourboires-BhZ5fhwt.js","assets/MesPourboires-D9I_9rZf.css","assets/MesTaches-Cc4XUDf6.css","assets/MesTaches-T0gdVgoF.js","assets/momo-C2ZVfV9J.js","assets/MonMois-DsI6_K64.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-CXMsbeLV.js","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/opale-CL6Scsvb.js","assets/paliers--tH8ClPj.js","assets/Parametres-DcB3enMO.js","assets/parcours-DCD9GkIT.js","assets/Parrainages-DfbEYahc.js","assets/Parrainages-gAHAPB_6.css","assets/PassageAvantLeFauteuil-wpDBLVAD.js","assets/pdf-CrIjh_OI.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/Personas-C8o6-xBE.js","assets/Personnel-B3vgp2gK.js","assets/photo-CiEL7dlN.js","assets/pilotage-D8kf1Co8.css","assets/Pourboires-Cw3-xqIX.js","assets/Predictions-BTP214sf.js","assets/Prestataires-BfSxh5b8.js","assets/Prets-C3t-etOz.js","assets/prevision-du-mois-pur-D6sJa5lw.js","assets/Previsions-D-0__Buz.css","assets/Previsions-DEx5WlLG.js","assets/previsions-pur-D32ofDAk.js","assets/processus-pur-BLN25j-E.js","assets/projets-CkdoWeK9.js","assets/Projets-COO7WDEE.css","assets/Projets-DU5B1iXl.js","assets/projets-pur-2ZEMRNDU.js","assets/protocoles-hbOo559J.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-wJx2SbHM.js","assets/qualification-3eNbo7Hy.js","assets/quiz-5qMPWZVi.js","assets/Rapport-8GzPCMY4.js","assets/Recommandations-ClsF8I_S.js","assets/regler-C5hcM02_.css","assets/regler-D-SfmaZh.js","assets/regler-la-seance-serveur-Bs6rzqZX.js","assets/relances-pur-lwRTXc5E.js","assets/releve-des-avis-Fxcb5mTr.js","assets/SalonFoyer-D9WirUk8.js","assets/secretariat-admin-BvUKT2UF.js","assets/Secretariat-CbAXJt91.js","assets/Secretariat-Cy79Zw30.css","assets/Signatures-Dy1MlG-2.js","assets/SignerUnPdf-4gAAFTrA.js","assets/Synthese-CgQzs0jn.js","assets/SyntheseGraphes-BXTghqxd.js","assets/systeme-TPy-pF7j.css","assets/Tableau-D2ZnmM3E.js","assets/temps-DjIAcdkd.js","assets/Textes-DLpOzRbT.css","assets/Textes-rmsh8WeQ.js","assets/tiroirs-KY56-2Ho.js","assets/trone-Bd2Uon71.js","assets/trone-OrseFGp6.css","assets/useAudiences-BAjOQFse.js","assets/Vitrine-BWilTqQJ.css","assets/Vitrine-CX-cTkE9.js","assets/_admin-COVuzhTy.js","assets/_contrat-Bb08q8DI.js","assets/_heures-CTrT3EuG.js","assets/_reuni-CNwUEGwx.js","assets/_shared-BKKm5Zgo.js","assets/_signature-IQVbgyws.js","assets/_ui-BWMA-PlM.css","assets/_ui-CFSxiqDc.js"];
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
