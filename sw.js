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
const BUILD = "20261105232141";
const A_GARDER = ["./","assets/abonnements-BZ4Nmexy.js","assets/Abonnements-CvhCd2TD.js","assets/Academie-0h49mEOF.js","assets/Acces-CNA2-e3s.js","assets/AFaire-B1AUHBu5.js","assets/afaire-IEUD8H8-.js","assets/Agents-BodydqK4.js","assets/agents-donnees-BvSa45Fe.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-BFz9XAwG.js","assets/Appels-G_x7DCsS.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/Assistants-B32znV4k.js","assets/Assistants-D9i2Xwmg.css","assets/AtelierDesContenus-CoUgvi-_.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/Audience-CGaNcUwY.js","assets/Aujourdhui-BF4aBoKN.js","assets/avant-le-fauteuil-lecture-PugPm0IY.js","assets/AvantLeFauteuil-ChIiAY8-.js","assets/avis-fiches-gsouBt54.js","assets/AvisGoogle-CAYwhAIa.js","assets/AvisGoogle-DaPXfwX9.css","assets/bilan-B-bfPYR0.css","assets/bilan-C6HSP9EU.js","assets/BilanMensuel-Jp3SKGIZ.js","assets/Branches-BJJdFOdf.js","assets/bridges-B-yKxRXm.js","assets/Caisse-BemnuhhW.js","assets/caisse-du-soir--UjroUEn.js","assets/caisse-du-soir-C6vPx-E_.css","assets/Caisses-D50WQwLe.js","assets/Calendrier-CkEejHot.js","assets/campagnes-pur-9M73XnEt.js","assets/Carnet-CYbvjJJD.js","assets/carte-B-xuFPvj.js","assets/carte-_W_-xBPj.css","assets/CarteModal-B-ruTlnI.js","assets/CartesCadeaux-B1oWQmf3.js","assets/Catalogue-s8C-qGxM.js","assets/CentreDeCommande-DQRs1FNj.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-DC3bCyi-.js","assets/certificat-B1m77r-a.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-DDo28SYG.js","assets/chiffre-du-jour-pur-BHolCwuo.js","assets/ChiffreDesPrestations-BV6GGQxb.js","assets/client-j-7_x6vO.js","assets/cloture-du-jour-_5sspR5p.js","assets/ClotureDuTiroir-B7bvCC5-.js","assets/Coffre-DSC7bXUW.js","assets/components-DD8Ku0za.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-DlVM3JXp.js","assets/Comptes-VdXo9Eef.js","assets/consultation-CRW6QcWf.css","assets/consultation-G7-gEDZ-.js","assets/Consultations-IMFsqTAn.js","assets/consultNotes-CJolVvmg.js","assets/Conversations-D4WwB5Zo.css","assets/Conversations-DK31cKWD.js","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-DPKIxK3y.js","assets/currency-qfIhGmrs.js","assets/Customers-BEQe461b.js","assets/Dashboard-B2x7VsE_.css","assets/Dashboard-D_dHSMP0.js","assets/dates-ChaYa4Od.js","assets/Demandes-DqsGZtru.js","assets/DepenseEnUnePhrase-BfWvn3VL.js","assets/DepenseEnUnePhrase-BIGRlGqP.css","assets/Depenses-B5adXCQb.js","assets/depenses-saisie-CI_W13bZ.js","assets/dernier-message-pur-CBYWnq8m.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-BR6ayr-q.js","assets/diagnostics-au-trone-DLwudmum.js","assets/Dictee-D2P9yM7v.css","assets/dictee-pur-B4MrbADa.js","assets/Dictee-_DNVI3U_.js","assets/Discussions-Dopol66w.js","assets/EditeurDesOffres-hlPn390u.js","assets/Encaissements-CIbKDHtG.js","assets/enfants-CSp9oSUL.js","assets/Engagements-Cj5S9MhG.css","assets/Engagements-Dp2pJkZ8.js","assets/EntreDeuxSeances-oiMYb2Wl.js","assets/Evaluation-CdhQZcnS.js","assets/Factures-EvSrV8r2.js","assets/FenetreDesCivilites-DgbnLAQT.js","assets/FenetreDesCivilites-zfNk1aak.css","assets/FenetreDuPoint-CnleP_Ez.js","assets/Fil-DZAfqcgC.js","assets/finances-BMFnlkRx.css","assets/fon-CGnQMsYl.js","assets/Fournisseurs-BjiWQcIz.js","assets/fournisseurs-DgnvYcgS.js","assets/foyer-jELTKP2O.js","assets/Gerard-CP3QOjfk.css","assets/Gerard-DhKfsObd.js","assets/gerard-donnees-Bg5FKS59.js","assets/gestes-conversation-CNJ-Fufo.js","assets/HomeRituals-DnkSX8sN.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-C4d9lCVq.js","assets/ia-centre-DSj1FY6u.js","assets/ia-diagnostic-pur-BBLrGY5l.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-tableau-pur-CSRjGtTf.js","assets/identite-DeCxSLeR.js","assets/index-CBEMIdET.js","assets/index.es-D033uBVu.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-iyFugmQ8.js","assets/jspdf.es.min-YMsWJv9I.js","assets/JustePrix-D5NFJHnN.js","assets/kkiapay-DrD7WLIH.js","assets/kkiapay-widget-DnUhUNd4.js","assets/Laboratoire-DsakvLPj.js","assets/LaJournee-B7J2zLDv.js","assets/LaJournee-Bn_G0HCt.css","assets/LettresAuDossier-DwhhLiu2.js","assets/LienMndPay-DtqD7ME2.js","assets/Marketing-CtEqQ6fA.js","assets/MarketingBranche-Dx_lOZCE.js","assets/Marque-DY9cTOHd.js","assets/MesPourboires-D9I_9rZf.css","assets/MesPourboires-DgKJGh05.js","assets/MesTaches-BkBti0rA.js","assets/MesTaches-Cc4XUDf6.css","assets/momo-C2ZVfV9J.js","assets/MonMois-Ce5EKJsu.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-COrfze4R.js","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/opale-u1xrd_KI.js","assets/oreille-B1AMUmZh.js","assets/paie-du-5-BwF5xv3E.js","assets/paie-du-5-DeJq-K_U.css","assets/paliers-BnDhNGWC.js","assets/Parametres-BlvvPqIF.js","assets/parcours-Ci7dYXf9.js","assets/Parrainages-BjnJmjNc.js","assets/Parrainages-gAHAPB_6.css","assets/PassageAvantLeFauteuil-Cq7awfht.js","assets/pdf-Ce16Ffo1.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/Personas-BT3iyz5m.js","assets/Personnel-i3qEk2lz.js","assets/photo-m3hcWbIk.js","assets/pilotage-D8kf1Co8.css","assets/Pourboires-CKO7SCKq.js","assets/Predictions-DpR3SkId.js","assets/Prestataires-C2Hjuajb.js","assets/Prets-mp-XnCAf.js","assets/PrevisionDuMois-DHPv9cjc.js","assets/PrevisionDuMois-DlFTw3OX.css","assets/Previsions-e7Ywch5w.js","assets/previsions-pur-C2wJjbCN.js","assets/Previsions-r4v19Anp.css","assets/processus-pur-R6U5QcCi.js","assets/projets-BfIKOqpJ.js","assets/Projets-COO7WDEE.css","assets/Projets-CpM-3ICJ.js","assets/projets-pur-2ZEMRNDU.js","assets/protocoles-Dn6ph0zx.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-dn_YnuIM.js","assets/qualification-B26U87eh.js","assets/quiz-5qMPWZVi.js","assets/Rapport-BfkWM0Gl.js","assets/Recommandations-D9O6nAQx.js","assets/regler-an70D2iM.js","assets/regler-C5hcM02_.css","assets/regler-la-seance-serveur-Bs6rzqZX.js","assets/relances-pur-lwRTXc5E.js","assets/releve-des-avis-CgfxT40F.js","assets/SalonFoyer-B5eZX8vC.js","assets/secretariat-admin-BVoFupz8.js","assets/Secretariat-CfoAzrLn.js","assets/Secretariat-Cy79Zw30.css","assets/Signatures-YEB6H_yh.js","assets/SignerUnPdf-CA84mkzn.js","assets/Synthese-BT8kIm2u.js","assets/SyntheseGraphes-t9VKuLVJ.js","assets/systeme-TPy-pF7j.css","assets/Tableau-COlzLi5_.js","assets/temps-Dw5d7-tF.js","assets/Textes-c7k3lIKO.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-B3IVpz_8.js","assets/tiroirs-CkDzpGy0.css","assets/trone-BKW6Z3Zb.js","assets/trone-DQVzvvmA.css","assets/useAudiences-DvgjJkNR.js","assets/useClotureDuJour-iKi3FUjD.js","assets/Vitrine-BWilTqQJ.css","assets/Vitrine-DmVFv-Ye.js","assets/_admin-CPTjNBqT.js","assets/_contrat-ZIaz6Sd8.js","assets/_heures-DDs-CUob.js","assets/_reuni-CPzH6-aW.js","assets/_shared-CrlyGTg4.js","assets/_signature-B53Djn02.js","assets/_ui-7Ss1XKE_.js","assets/_ui-BWMA-PlM.css"];
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
