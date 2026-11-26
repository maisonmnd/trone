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
const BUILD = "20261126004300";
const A_GARDER = ["./","assets/abonnements-CBT0m8wX.js","assets/Abonnements-DTY7p2DH.css","assets/Abonnements-lTJK9tRA.js","assets/Academie-DlkSfPzu.js","assets/Acces-B3VT9mgc.js","assets/AFaire-CN5_j258.js","assets/afaire-y6kc3vVP.js","assets/Agents-C7aiL8mt.js","assets/agents-donnees-hNsV4DYL.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-IFv5a95Y.js","assets/App-BlBwR3Nw.js","assets/Appels-BNifDlD8.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/Assistants-ahYU9NAF.js","assets/Assistants-D9i2Xwmg.css","assets/AtelierDesContenus-BXjuhk0l.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/Audience-X4Z-AGH-.js","assets/Aujourdhui-Cqrb8SSM.js","assets/auth-Ccugbh49.js","assets/avant-le-fauteuil-lecture-Bzz5J5s8.js","assets/AvantLeFauteuil-DKJ0ZN65.js","assets/avis-fiches-BM4CdNOJ.js","assets/avis-google-pont-BSLvmNEZ.js","assets/AvisGoogle-9o0gtiLR.js","assets/AvisGoogle-DaPXfwX9.css","assets/BadgeEssai-B5EAlw0x.js","assets/BadgeSuggere-BkqNL1Rt.js","assets/besoins-DzY_x7R5.js","assets/BesoinsEtRegles-BLwxGVV5.css","assets/BesoinsEtRegles-DukZz5x_.js","assets/bilan-B-bfPYR0.css","assets/bilan-fk7TTW-p.js","assets/BilanMensuel-BTMLgZER.js","assets/Branches-BJgC-jU1.js","assets/bridges-DOEROPK2.js","assets/Caisse-BGOaF7yK.js","assets/caisse-du-soir-BUAWJcR0.js","assets/caisse-du-soir-C6vPx-E_.css","assets/caisse-fluide-pur-D8IOgWiy.js","assets/Caisses-CsxZFHe4.js","assets/Calendrier-Dt6ep-Ke.js","assets/campagnes-pur-DGjh24-e.js","assets/Carnet-kdnRWcHS.js","assets/carte-CbvoRQoJ.js","assets/carte-_W_-xBPj.css","assets/CarteModal-CGjFUtPw.js","assets/CartesCadeaux-BkDxtyqI.js","assets/Catalogue-MvgmIwDr.js","assets/CentreDeCommande-Dlb0kwZS.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-DHXoUp3I.js","assets/certificat-v3KQNscf.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-C6F7nCUt.js","assets/chiffre-du-jour-pur-Cp_IyNTI.js","assets/ChiffreDesPrestations-BX4YMFlE.js","assets/Classement-Bz62NZJW.js","assets/classement-J6E9y7_V.js","assets/classement-pur-DgNYRo7t.js","assets/Classement-T9x-HPwd.css","assets/client-BlyrBmmk.js","assets/cloture-du-jour-DVUm1A-L.js","assets/ClotureDuTiroir-BOotMKkn.js","assets/Coffre-CjECxT2N.js","assets/components-B7f-2sGo.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-D4AQXPKC.js","assets/Comptes-Dvz1tKQU.js","assets/consultation-BUPa_KXR.js","assets/consultation-CRW6QcWf.css","assets/Consultations-DiE-2_mG.css","assets/Consultations-sO2Pcu5-.js","assets/consultNotes-DJfx-avv.js","assets/contexte-de-la-reponse-COxlEmyq.js","assets/Conversations-83Df0MAQ.js","assets/Conversations-D4WwB5Zo.css","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-BZZ8AXiX.js","assets/currency-Cd0clE4P.js","assets/Customers-cVZl-9jX.js","assets/Dashboard-BTJPE8sY.css","assets/Dashboard-CD1a4T3W.js","assets/dates-Bdmp3XnA.js","assets/DemanderAPerle-BD5NgCRN.css","assets/DemanderAPerle-DU3ZjBf7.js","assets/Demandes-Cfueb4TF.js","assets/DepenseEnUnePhrase-BIGRlGqP.css","assets/DepenseEnUnePhrase-C_0RyWfh.js","assets/Depenses-3jBZNK68.js","assets/depenses-saisie-BmmODi4d.js","assets/devis-Bz9c6s84.js","assets/devis-CdIRAvZk.css","assets/devis-remis-CYyY1YUL.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-B__43qCx.js","assets/diagnostics-au-trone-Cdun-8ZR.js","assets/Dictee-C-pUYYFA.css","assets/Dictee-DxIqPfBy.js","assets/dictee-pur-C_i243SG.js","assets/Discussions-BjYhjOYj.js","assets/dist-9vv0te18.js","assets/echappe-html-pur-gEhHOM07.js","assets/EditeurDesOffres-B5M2XG1j.js","assets/Encaissements-D64Glqmu.js","assets/EnDirect-Di1GUfWy.js","assets/enfants-DfaRhujD.js","assets/Engagements-BJxBUTP9.js","assets/Engagements-Cj5S9MhG.css","assets/engagements-coffre-C_KomTK_.js","assets/EntreDeuxSeances-BIPvGIUS.js","assets/es-BLuL9L7A.js","assets/etoiles-pur-CgRPMSHm.js","assets/Evaluation-3l9wz6nG.js","assets/facture-XZ0q6zD6.js","assets/Factures-CN-nKsAV.js","assets/FenetreDeLAgent-DTUthXl1.js","assets/FenetreDesCivilites-BWUwdkK_.js","assets/FenetreDesCivilites-zfNk1aak.css","assets/FenetreDuPoint-qJ9z91ax.js","assets/Fil-D6mj_kgJ.js","assets/finances-C8x7Mn4-.css","assets/fon-7DPQa-T5.js","assets/Fournisseurs-BS-9_Lqb.js","assets/fournisseurs-CXNfzZTJ.js","assets/foyer-GCuWsvA7.js","assets/Gerard-CjQcC1UY.js","assets/gerard-donnees-zLCylpkc.js","assets/Gerard-lGKehvgG.css","assets/gestes-conversation-BvH8Cy5J.js","assets/heures-des-rappels-pur-BWJPB8OP.js","assets/HomeRituals-BoFhgGCB.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-C661Lagu.js","assets/ia-centre-s-hhcErn.js","assets/ia-diagnostic-pur-qGnFEvys.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-tableau-pur-p6UvREJe.js","assets/identite-0qrWo7fr.js","assets/index.es-Cde8guCh.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-ZqxsYUtx.js","assets/jspdf.es.min-BgsuZN4q.js","assets/JustePrix-DIR7suRe.js","assets/kkiapay-DOxCVy4r.js","assets/kkiapay-widget-CaHBoBVm.js","assets/Laboratoire-D5oxw42V.js","assets/LaJournee-Bn_G0HCt.css","assets/LaJournee-Deor3SlM.js","assets/le-caissier-pur-BJ2tE4wH.js","assets/le-sceau-pur-Dv-IZ_M2.js","assets/LePoint-BZAG7Jcu.js","assets/LePoint-B_HurXA0.css","assets/LesPaiements-C9cEZlne.css","assets/LesPaiements-DPS3W394.js","assets/LettresAuDossier-CFqXJleD.js","assets/LienMndPay-DsKJ7lLv.js","assets/Marketing-ByyRWPmQ.js","assets/MarketingBranche-Bu_MK1ge.js","assets/Marque-BwNeocJ-.js","assets/MesPourboires-CENjelyb.css","assets/MesPourboires-DLhALmUn.js","assets/MesTaches-Cc4XUDf6.css","assets/MesTaches-DrBpqPi3.js","assets/mnd-pay-pur-CfS2mkAo.js","assets/momo-C2ZVfV9J.js","assets/MonMois-Z7dTffni.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/MtnMoMo-C7nHGWhM.js","assets/objectifs-CocDxxKb.js","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/opale-OiQo3rkU.js","assets/oreille-B1AMUmZh.js","assets/paie-du-5-0LfPcldo.js","assets/paie-du-5-DeJq-K_U.css","assets/paie-du-5-pur-CPiCK8fv.js","assets/paie-par-mtn-D87kRlE6.js","assets/PaieParMtn-Cm-FvfWp.js","assets/paliers-CCt85MtC.js","assets/Parametres-qSGsbk5M.js","assets/parcours-B7ANpt7V.js","assets/Parrainages-DKNi8-0_.js","assets/Parrainages-gAHAPB_6.css","assets/PassageAvantLeFauteuil-CPOfMmMh.js","assets/pdf-uyZwdJO3.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/periode-des-pourboires-pur-BUWqfwov.js","assets/Personas-Dh-rMt-v.js","assets/Personnel-J1jnJ-yr.js","assets/photo-C_Wa84HO.js","assets/pilotage-D8kf1Co8.css","assets/porte-de-l-equipe-BHDrZN6t.js","assets/Pourboires-CNiUigyL.js","assets/Predictions-BZDrovY0.js","assets/preload-helper-BRe_O-Rg.js","assets/Prestataires-Z_ET4doq.js","assets/Prets-DT7cB1b_.js","assets/PrevisionDuMois-DC4rL71N.js","assets/PrevisionDuMois-DlFTw3OX.css","assets/Previsions-9BU2Vg1T.css","assets/Previsions-D-a-piNf.js","assets/previsions-pur-Bwd_yp56.js","assets/processus-pur-R6U5QcCi.js","assets/projets-Bm9ZUsJd.js","assets/Projets-COO7WDEE.css","assets/Projets-CXCU-C4f.js","assets/projets-pur-2ZEMRNDU.js","assets/protocoles-DnAp05jb.js","assets/purify.es-BwoZCkIS.js","assets/qr-DVY_vAfT.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-CI8SQw-H.js","assets/quiz-5qMPWZVi.js","assets/Rapport-CPqHbtf8.js","assets/Recommandations-CMOPVHG_.js","assets/regler-D1gFEaVz.css","assets/regler-MKNHX8G5.js","assets/regler-par-fedapay-pur-DP7zXAs5.js","assets/relances-pur-C9iUwl2e.js","assets/releve-des-avis-RwgcDM-r.js","assets/SalonFoyer-Bq30XWKq.js","assets/sceau-CMQa25TJ.js","assets/secretariat-admin-CJwNBiUC.js","assets/Secretariat-CvtGWEM0.js","assets/Secretariat-Cy79Zw30.css","assets/Signatures-C9mtakBz.js","assets/SignerUnPdf-Bscrlzir.js","assets/Synthese-CDigyiPb.js","assets/SyntheseGraphes-DHiCu5ow.js","assets/systeme-TPy-pF7j.css","assets/Tableau-CkbYGsBL.js","assets/temps-BgkV-cb1.js","assets/Textes-DLpOzRbT.css","assets/Textes-kbYeqa_l.js","assets/tiroirs-CkDzpGy0.css","assets/tiroirs-qCB1hOhJ.js","assets/tpe-CkdX_Ont.css","assets/tpe-de-poche-pur-BApx0DbM.js","assets/tpe-Dts2f1G0.js","assets/TpeDePoche-CfPfkmEv.js","assets/trone-C3eufNNq.css","assets/trone-D-sXVCKW.js","assets/useAudiences-Zy9jkt5E.js","assets/useClotureDuJour-CNa_nXui.js","assets/visios-BC7kJk1L.js","assets/Vitrine-BWilTqQJ.css","assets/Vitrine-DGFWoqet.js","assets/_admin-Biyi5S0n.js","assets/_contrat-DABQDVIw.js","assets/_reuni-y2tccyNp.js","assets/_shared-mbS9w62I.js","assets/_signature-Bmtlm0yi.js","assets/_ui-BrUDlmuM.css","assets/_ui-BYvn1U7t.js"];
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

  /* LE PLAN POUR VENIR, LE RÉSEAU D'ABORD (20 novembre 2026). Il part chez les
     clientes : gardé comme les autres images, le plan d'avant une correction
     (l'adresse du 20 novembre) repartait une fois de plus de chaque appareil.
     En ligne, toujours le dernier, sans le cache du navigateur ; sans réseau,
     celui qu'on a. */
  if (url.pathname.includes('/assets/itineraire/')) {
    event.respondWith((async () => {
      const c = await caches.open(CACHE_IMAGES);
      try {
        const r = await avecDelai(fetch(req, { cache: 'no-cache' }), DELAI_PAGE_MS);
        if (r.ok) { void c.put(req, r.clone()); return r; }
        return (await c.match(req)) || r;
      } catch (_e) {
        return (await c.match(req)) || Response.error();
      }
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
