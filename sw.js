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
const BUILD = "20261024234206";
const A_GARDER = ["./","assets/Abonnements-B7bDBL5E.js","assets/abonnements-GqOK3xem.js","assets/Academie-DIpzbBH8.js","assets/Acces-B2-injvS.js","assets/actions-CeSvESwP.js","assets/afaire-BcRNTCEw.js","assets/AFaire-CZkqBMNI.js","assets/Agents-C0t3VVJ1.js","assets/agents-donnees--B0NWVKA.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-CowtNwoW.js","assets/Appels-Bn-P-6vE.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/AtelierDesContenus-BN2cPdtc.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/AuComptoir-6mK4mBfC.js","assets/Aujourdhui-BJYc1sij.js","assets/avis-fiches-s5CE9C2n.js","assets/bilan-B-bfPYR0.css","assets/bilan-Bme3mjRe.js","assets/BilanMensuel-BjVsgWhx.js","assets/Branches-CgHNj20G.js","assets/bridges-B3jJJuOi.js","assets/Caisse-BjENhEXV.js","assets/caisse-du-soir-Dlv4x54I.js","assets/Caisses-PKp0CMEA.js","assets/Calendrier-bbQ8sdsF.js","assets/Carnet-DkUbu0dl.js","assets/carte-CqJEaE7p.js","assets/carte-DWlSbalk.css","assets/CarteModal-BCdkc4qH.js","assets/CartesCadeaux-D26z-Zw1.js","assets/Catalogue-DFPKvS14.js","assets/CentreDeCommande--Ls9Dhzp.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-DEejxBQV.js","assets/certificat-9_XWf1iQ.css","assets/certificat-o8ONoVXt.js","assets/certificats-coffre-pF0d1yTk.js","assets/chiffre-du-jour-pur-BDyawVUm.js","assets/ChiffreDesPrestations-C2VMGNhM.js","assets/ClotureDuTiroir-C6vPx-E_.css","assets/ClotureDuTiroir-VFqLXCcN.js","assets/Coffre-6ORwERfd.js","assets/components-WLMq_M5O.js","assets/compte-BXDCT-9f.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-BtWe8BC8.js","assets/Comptes-CiVsvJ01.js","assets/Comptoir-Da0Bgliu.js","assets/consultation-DQBnwlMN.css","assets/consultation-GQnWvHz6.js","assets/Consultations-B8g4J-Ep.js","assets/consultNotes-DBREGEit.js","assets/Conversations-Ba6iNXWp.js","assets/Conversations-D4WwB5Zo.css","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-BP8AcvwL.js","assets/currency-qfIhGmrs.js","assets/Customers-tazCvMWN.js","assets/Dashboard-aHqzLhhg.js","assets/Dashboard-B8qK6Flt.css","assets/dates-e6Qpocm2.js","assets/Demandes-qZgEoivr.js","assets/Depenses-D8RcTDpB.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-5wyyZqP5.js","assets/diagnostics-au-trone-BnfVxaHe.js","assets/Discussions-Bt9wwW7T.js","assets/Encaissements-C9LRh-KW.js","assets/enfants-DcRfSuza.js","assets/Engagements-CI32LF7N.js","assets/Engagements-Cj5S9MhG.css","assets/EntreDeuxSeances-CfdgBBD0.js","assets/equipe-B_9ZHz24.css","assets/Evaluation-jlLt_rcF.js","assets/FacturePrestataire-C_CqIOyd.js","assets/Factures-BC6O12wm.js","assets/Fil-D04lUGaq.js","assets/finances-BMFnlkRx.css","assets/Fournisseurs-aqhh1agj.js","assets/fournisseurs-CKRHZeAf.js","assets/foyer-DPfBmhof.js","assets/gestes-conversation-CQJ_WyWt.js","assets/HomeRituals-twAz6sYI.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-OMzNYWg-.js","assets/ia-diagnostic-pur-BulIFgZQ.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-recu-pur-DcucZqpR.js","assets/identite-DPOytmOa.js","assets/index-BkQyxagL.js","assets/index.es-DZfs6AC_.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-DOWs1eSf.js","assets/jspdf.es.min-BI3WdmJb.js","assets/JustePrix-6ReJQ5Mh.js","assets/kkiapay-BPijF6lL.js","assets/Laboratoire-C9ys34a1.js","assets/laboratoire-Cbivigj9.js","assets/LettresAuDossier-BA0d_GAa.js","assets/LienMndPay-z5XVa4Gz.js","assets/maisons-CSSFrqZy.js","assets/Marketing-BY5TjXwt.js","assets/Marque-7g7CIE9G.js","assets/MesTaches-Cc4XUDf6.css","assets/MesTaches-JNAqQcNe.js","assets/momo-C2ZVfV9J.js","assets/MonMois-CCWd_P8_.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-DV6oaQA6.js","assets/paliers-BH9HI3em.js","assets/Parametres-BAb3vtkz.js","assets/parcours-DXRBL5AB.js","assets/Parrainages-gAHAPB_6.css","assets/Parrainages-gJDyugJI.js","assets/pdf-C8NKrJPA.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/Personas-B_Ft0x_u.js","assets/Personnel-A-VRMHDO.js","assets/photo-C-Pz9P2p.js","assets/pilotage-D8kf1Co8.css","assets/Predictions-DDC6eLei.js","assets/prestataires-DF28urla.js","assets/Prestataires-s3MWWHJI.js","assets/Prets-DUtc2-5h.js","assets/projets-C090wGXn.js","assets/Projets-CDgLe1FB.js","assets/Projets-COO7WDEE.css","assets/projets-pur-2ZEMRNDU.js","assets/protocoles-CG1Tpqwk.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-BJE78NM3.js","assets/qualification-BKfzTM3E.js","assets/quiz-5qMPWZVi.js","assets/Rapport-DYoj4avy.js","assets/RattacherUneCarte-DrFTiTrr.js","assets/Recommandations-Cmhm0h3M.js","assets/relances-pur-DsIo28uB.js","assets/releve-des-avis-m595pphD.js","assets/SalonFoyer-dkeuvhVw.js","assets/secretariat-admin-ChkNeSUD.js","assets/Secretariat-Cy79Zw30.css","assets/Secretariat-D9M2VRtu.js","assets/Signatures-DAIA1ThR.js","assets/SignerUnPdf-CbOjYJ4R.js","assets/Synthese-W-cbZPIK.js","assets/SyntheseGraphes-DnoNMEHc.js","assets/systeme-C3XFIa8E.css","assets/Tableau-BylGige3.js","assets/Textes-DLpOzRbT.css","assets/Textes-jYMDQ9rn.js","assets/tiroirs-C5LTVClN.js","assets/trace-du-moyen-pur-Cb3Gcky8.js","assets/trone-fchLqmH5.css","assets/trone-kE4Op-N7.js","assets/ui-Ckbglmaz.js","assets/useAudiences-BtxqDVdB.js","assets/vente-C7YWXkHo.css","assets/Vitrine-BON6rcdB.css","assets/Vitrine-BTLwNtqf.js","assets/_admin-CXkc0uvz.js","assets/_contrat-qRlXlWbJ.js","assets/_heures-B3DUykH5.js","assets/_reuni-Dm3LGkCG.js","assets/_shared-Bqkk9rK_.js","assets/_signature-D80VEmOd.js","assets/_ui-BWMA-PlM.css","assets/_ui-D682UYi1.js"];
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
