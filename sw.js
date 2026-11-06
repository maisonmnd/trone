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
const BUILD = "20261106102230";
const A_GARDER = ["./","assets/abonnements-BQ3JMzhG.js","assets/Abonnements-DizLMutL.js","assets/Academie-DixFN-Fn.js","assets/Acces-BnlKFUZY.js","assets/AFaire-BsfPWpKg.js","assets/afaire-DYGFk83m.js","assets/Agents-Dl8QD7wG.js","assets/agents-donnees-BmJVn-D_.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-2T9Di2ku.js","assets/Appels-JjZ-S5Vn.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/Assistants-D9i2Xwmg.css","assets/Assistants-YkgLDkf2.js","assets/AtelierDesContenus-B3lT2M9v.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/Audience-CsUxReSy.js","assets/Aujourdhui-Di1Kj1C1.js","assets/avant-le-fauteuil-lecture-ChwofkCl.js","assets/AvantLeFauteuil-CaEQKXwY.js","assets/avis-fiches-DG06ZYZu.js","assets/AvisGoogle-B-2IV9dG.js","assets/AvisGoogle-DaPXfwX9.css","assets/bilan-B-bfPYR0.css","assets/bilan-_UqcsXQ7.js","assets/BilanMensuel-CjVsoDaZ.js","assets/Branches-yGFx_e6M.js","assets/bridges-BTstAy00.js","assets/Caisse-C2P7b_iN.js","assets/caisse-du-soir--yeJrlIb.js","assets/caisse-du-soir-C6vPx-E_.css","assets/Caisses-DSByBakO.js","assets/Calendrier-CJOJ1cDg.js","assets/campagnes-pur-BSbpn8PQ.js","assets/Carnet-Bxj-9UtN.js","assets/carte-DLIy01rA.js","assets/carte-_W_-xBPj.css","assets/CarteModal-G0D4NZ39.js","assets/CartesCadeaux-ozQd7jvr.js","assets/Catalogue-Cw6Qe0QN.js","assets/CentreDeCommande-Du8kyJhp.css","assets/CentreDeCommande-WwbGwfdF.js","assets/Cercle-BvOwId3l.js","assets/certificat-BYdy3lM6.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-CbmZeQ21.js","assets/chiffre-du-jour-pur-DY29HokD.js","assets/ChiffreDesPrestations-nKO4vidC.js","assets/client-CFT8iI45.js","assets/cloture-du-jour-D-wKGNH0.js","assets/ClotureDuTiroir-DkG8fWQk.js","assets/Coffre-D9sUiIxT.js","assets/components-B95c-c9X.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-DrY_ZyDd.js","assets/Comptes-rjWAJpL5.js","assets/consultation-CRW6QcWf.css","assets/consultation-CshDwizc.js","assets/Consultations-1z19ncHR.js","assets/consultNotes-DhAoDEVE.js","assets/Conversations-CQm_K9N9.js","assets/Conversations-D4WwB5Zo.css","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-jd1jQai_.js","assets/currency-qfIhGmrs.js","assets/Customers-DiqUQLH-.js","assets/Dashboard-B2x7VsE_.css","assets/Dashboard-BH4s6AtI.js","assets/dates-DOW0N20F.js","assets/Demandes-DlCZg1Uv.js","assets/DepenseEnUnePhrase-BIGRlGqP.css","assets/DepenseEnUnePhrase-DnwzpzYr.js","assets/Depenses-B_XI_MR6.js","assets/depenses-saisie-DgQzCMeN.js","assets/dernier-message-pur-CBYWnq8m.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-CwOxAJna.js","assets/diagnostics-au-trone-ghA46sE0.js","assets/Dictee-D2P9yM7v.css","assets/Dictee-Do1eTYBT.js","assets/dictee-pur-CkHuHrjG.js","assets/Discussions-aPPYvZUI.js","assets/EditeurDesOffres-RjzgQQ6d.js","assets/Encaissements-CBP-WZVD.js","assets/enfants-BVXjJ0kU.js","assets/Engagements-BanjyI1g.js","assets/Engagements-Cj5S9MhG.css","assets/engagements-coffre-CtCDDGXb.js","assets/EntreDeuxSeances-CDtdLMSb.js","assets/Evaluation-DOlt0kfQ.js","assets/Factures-DqhC4Ym_.js","assets/FenetreDesCivilites-X9IKV5Pc.js","assets/FenetreDesCivilites-zfNk1aak.css","assets/FenetreDuPoint-Cjh-IXc5.js","assets/Fil-CQMpd1eh.js","assets/finances-BMFnlkRx.css","assets/fon-DVcVGY48.js","assets/fournisseurs-BsZZaf-k.js","assets/Fournisseurs-CjXmpkn-.js","assets/foyer-ClAZoTG2.js","assets/Gerard-BSuN4Ww7.js","assets/Gerard-CP3QOjfk.css","assets/gerard-donnees-D5A0YlBk.js","assets/gestes-conversation-DGRMHiNW.js","assets/HomeRituals-DkWZmhcY.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-BciE3LEC.js","assets/ia-centre-WhP5fiKM.js","assets/ia-diagnostic-pur-BBLrGY5l.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-tableau-pur-CSRjGtTf.js","assets/identite-D6uIaV4V.js","assets/index-CH0QeJok.js","assets/index.es-CY8nuDa-.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-D_ZauqzW.js","assets/jspdf.es.min-Bv_P8PGz.js","assets/JustePrix-A8Umn3pz.js","assets/kkiapay-B8Bkab6H.js","assets/kkiapay-widget-DnUhUNd4.js","assets/Laboratoire-gk1VfV9E.js","assets/LaJournee-Bn_G0HCt.css","assets/LaJournee-kODxvvge.js","assets/LesPaiements-BvdfOCbQ.css","assets/LesPaiements-DSfDyLdz.js","assets/LettresAuDossier-BOATtlRL.js","assets/LienMndPay-Bl_J82NX.js","assets/Marketing-DdklRKnr.js","assets/MarketingBranche-BLl9asX-.js","assets/Marque-Dce138m5.js","assets/MesPourboires-D9I_9rZf.css","assets/MesPourboires-Du1LuP0q.js","assets/MesTaches-Bpzc8oHU.js","assets/MesTaches-Cc4XUDf6.css","assets/momo-C2ZVfV9J.js","assets/MonMois-C-xrIW1t.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/objectifs-DI7AdfmF.js","assets/opale-M1XcuvS4.js","assets/oreille-B1AMUmZh.js","assets/paie-du-5-ByeyNhpV.js","assets/paie-du-5-DeJq-K_U.css","assets/paie-du-5-pur-K6KKYBwX.js","assets/PaieParMtn-B-taoeSB.js","assets/paliers-WVgIBQsI.js","assets/Parametres-FDqfb8h6.js","assets/parcours-smcJJvVM.js","assets/Parrainages-DJtAUTpI.js","assets/Parrainages-gAHAPB_6.css","assets/PassageAvantLeFauteuil-DDRLrSFx.js","assets/pdf-dTC81ekE.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/Personas--tjVHlCs.js","assets/Personnel-BbLFVECG.js","assets/photo-BBox7zEQ.js","assets/pilotage-D8kf1Co8.css","assets/Pourboires-D2286UBI.js","assets/Predictions-D4WEc8PD.js","assets/Prestataires-srVEq9v3.js","assets/Prets-BwCZ86Vj.js","assets/PrevisionDuMois-DlFTw3OX.css","assets/PrevisionDuMois-DSrlkZuT.js","assets/Previsions-B6Ax14qi.js","assets/previsions-pur-CqBam9RV.js","assets/Previsions-r4v19Anp.css","assets/processus-pur-R6U5QcCi.js","assets/Projets-CeyeypVE.js","assets/projets-CGoW9VbU.js","assets/Projets-COO7WDEE.css","assets/projets-pur-2ZEMRNDU.js","assets/protocoles-DlETt6mo.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-Dq6qbuF_.js","assets/qualification-C8a95iC0.js","assets/quiz-5qMPWZVi.js","assets/Rapport-OZfyq5A8.js","assets/Recommandations-CtDBhxll.js","assets/regler-C5hcM02_.css","assets/regler-CTDNxACT.js","assets/regler-la-seance-serveur-Bs6rzqZX.js","assets/relances-pur-lwRTXc5E.js","assets/releve-des-avis-RE7pr3Wf.js","assets/SalonFoyer-Djr7ycyP.js","assets/secretariat-admin-DiATZS6W.js","assets/Secretariat-BCS1LkFw.js","assets/Secretariat-Cy79Zw30.css","assets/Signatures-C1obcMZP.js","assets/SignerUnPdf-C9Q8BARr.js","assets/Synthese-ClSz_0gU.js","assets/SyntheseGraphes-eGPkQH4_.js","assets/systeme-TPy-pF7j.css","assets/Tableau-B-fIU3gE.js","assets/temps-jE9u09E5.js","assets/Textes-DLpOzRbT.css","assets/Textes-DR3s8UJO.js","assets/tiroirs-CkDzpGy0.css","assets/tiroirs-Dz8pG25N.js","assets/trone-D6CYD4-_.css","assets/trone-DcZM5pv0.js","assets/useAudiences-DM_r0kCy.js","assets/useClotureDuJour-DKeY6qP-.js","assets/Vitrine-BWilTqQJ.css","assets/Vitrine-_bIEPgGB.js","assets/_admin-C_c_uOzD.js","assets/_contrat-BvcdLsqg.js","assets/_heures-Bd0XKjWi.js","assets/_reuni-Czb5EMrS.js","assets/_shared-D47aynqd.js","assets/_signature-C_qCxzM5.js","assets/_ui-9uw1n6Ab.js","assets/_ui-BrUDlmuM.css"];
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
