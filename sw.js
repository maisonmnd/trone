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
const BUILD = "20261115071233";
const A_GARDER = ["./","assets/abonnements-Bhzrii-4.js","assets/Abonnements-BvUdmq8B.js","assets/Abonnements-DTY7p2DH.css","assets/Academie-C_i92bbp.js","assets/Acces-90faCh5y.js","assets/afaire-BWWXvP2_.js","assets/AFaire-DS-Lkz1v.js","assets/Agents-CIOxFMhY.js","assets/agents-donnees-1AGd5dW9.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-BQnUpt2Z.js","assets/Appels-CvbsfGoE.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/Assistants-D9i2Xwmg.css","assets/Assistants-DnwtKGmr.js","assets/AtelierDesContenus-ByYVp_9T.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/Audience-BJ9nUZpp.js","assets/Aujourdhui-CabX6lto.js","assets/avant-le-fauteuil-lecture-l68aIFH1.js","assets/AvantLeFauteuil-DPk2__m9.js","assets/avis-fiches-CEBqcxdx.js","assets/AvisGoogle-DaPXfwX9.css","assets/AvisGoogle-PhEV9GA0.js","assets/BadgeEssai-BTm0zOZB.js","assets/BadgeSuggere-B-AUBeIa.js","assets/besoins-CatGbznt.js","assets/BesoinsEtRegles-CzntMbJE.css","assets/BesoinsEtRegles-u6GlP4C2.js","assets/bilan-B-bfPYR0.css","assets/bilan-d3fFRdCe.js","assets/BilanMensuel-Crxau8pw.js","assets/Branches-B8si9FoF.js","assets/bridges-JF7hEph3.js","assets/Caisse-DoppOZny.js","assets/caisse-du-soir-C-Vs_ZqM.js","assets/caisse-du-soir-C6vPx-E_.css","assets/Caisses-DAqXk6jM.js","assets/Calendrier-DLi3upBh.js","assets/campagnes-pur-B1dBZlWO.js","assets/Carnet-BtOMZCFm.js","assets/carte-CADUE-4l.js","assets/carte-_W_-xBPj.css","assets/CarteModal-DcaYB-zO.js","assets/CartesCadeaux-CHLp6JhG.js","assets/Catalogue-ClNftuAA.js","assets/CentreDeCommande-B40RF-7h.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-C4X2nRDs.js","assets/certificat-9ATsOAns.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-DZZziFlu.js","assets/chiffre-du-jour-pur-CCMEP-pr.js","assets/ChiffreDesPrestations-BGlJx00A.js","assets/client-DggiU8QM.js","assets/cloture-du-jour-BL4eNQ2N.js","assets/ClotureDuTiroir-C8hnOBE9.js","assets/Coffre-B2Ru_j40.js","assets/collecte-mtn-pur-D9rF7FS0.js","assets/components-Dj6cOoLg.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-incPLyJ-.js","assets/Comptes-CDaJEXhA.js","assets/consultation-5dNXyKdq.js","assets/consultation-CRW6QcWf.css","assets/Consultations-DiE-2_mG.css","assets/Consultations-jnH-_865.js","assets/consultNotes-BYR6HZDv.js","assets/Conversations-BHAb7_Y5.js","assets/Conversations-D4WwB5Zo.css","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-ZAILlCTM.js","assets/currency-qfIhGmrs.js","assets/Customers-X2qoCww4.js","assets/Dashboard-B2x7VsE_.css","assets/Dashboard-CJ1vsHxN.js","assets/dates-eTuRhVdd.js","assets/Demandes-iJ8zIITh.js","assets/DepenseEnUnePhrase-BIGRlGqP.css","assets/DepenseEnUnePhrase-CVsr-iZv.js","assets/Depenses-1eiwqniI.js","assets/depenses-saisie-MsjNiDLs.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-Dpkat_84.js","assets/diagnostics-au-trone-BgJF9rqs.js","assets/Dictee-B0TFe_ay.js","assets/Dictee-BIQFbKhA.css","assets/dictee-pur-BH-vFikS.js","assets/Discussions-CS1of0-f.js","assets/EditeurDesOffres-o38ax60R.js","assets/Encaissements-CiMFPMRL.js","assets/enfants-Cqyir9KC.js","assets/Engagements-Bs8MV86B.js","assets/Engagements-Cj5S9MhG.css","assets/engagements-coffre-D-B0aLl7.js","assets/EntreDeuxSeances-CsQuqnEu.js","assets/Evaluation-XWw47TUJ.js","assets/facture-JxiXnOFS.js","assets/Factures-D6P3egjV.js","assets/FenetreDesCivilites-BfQQXkfF.js","assets/FenetreDesCivilites-zfNk1aak.css","assets/FenetreDuPoint-CoT8SKs1.js","assets/Fil-CkaAvzw5.js","assets/finances-C8x7Mn4-.css","assets/fon-DBwJxZtC.js","assets/fournisseurs-CeANCyhy.js","assets/Fournisseurs-CNcQpcQO.js","assets/foyer-DlYmEd1R.js","assets/Gerard-Cgj-zsJh.css","assets/Gerard-DhvfKDbr.js","assets/gerard-donnees-BZepk3o4.js","assets/gestes-conversation-ekuB_856.js","assets/heures-des-rappels-pur-BWJPB8OP.js","assets/HomeRituals-_2785F1a.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-KxYvCT95.js","assets/ia-centre-DwQRqzdj.js","assets/ia-diagnostic-pur-BNtkwfR3.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-tableau-pur-p6UvREJe.js","assets/identite-D48D8K-7.js","assets/index-Bw0UG9zJ.js","assets/index.es-CK41qk5M.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-DQEZPk_S.js","assets/jspdf.es.min-k6AxpmsS.js","assets/JustePrix-9b4KBAOI.js","assets/kkiapay-BE63PhRb.js","assets/kkiapay-widget-CVmsl9OE.js","assets/Laboratoire-Df5ip3QX.js","assets/LaJournee-Bn_G0HCt.css","assets/LaJournee-Bu_OW-pR.js","assets/le-caissier-pur-C7Gq5mAQ.js","assets/LesPaiements-C9cEZlne.css","assets/LesPaiements-D2SIlo2K.js","assets/LettresAuDossier-wZR7p4hA.js","assets/LienMndPay-Ct53iCqf.js","assets/Marketing-C1iixkiL.js","assets/MarketingBranche-BMg_pApN.js","assets/Marque-HCjTjdhU.js","assets/MesPourboires-CENjelyb.css","assets/MesPourboires-C_xDLOZy.js","assets/MesTaches-BnAMMlNN.js","assets/MesTaches-Cc4XUDf6.css","assets/momo-C2ZVfV9J.js","assets/MonMois-DNl2Z5cp.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/MtnMoMo-Bkal_xzV.js","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/objectifs-DoIf21zz.js","assets/opale-g2mnDmH-.js","assets/oreille-B1AMUmZh.js","assets/paie-du-5-DeJq-K_U.css","assets/paie-du-5-GTouG0OV.js","assets/paie-du-5-pur-CPiCK8fv.js","assets/paie-par-mtn-BmpifzIt.js","assets/PaieParMtn-c6-qXBaX.js","assets/paliers-C8_vWodi.js","assets/Parametres-BXrO2tG7.js","assets/parcours-B24hhA6y.js","assets/Parrainages-CGo1osil.js","assets/Parrainages-gAHAPB_6.css","assets/PassageAvantLeFauteuil-D7-RUHOg.js","assets/pdf-un2zEjf9.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/periode-des-pourboires-pur-BUWqfwov.js","assets/Personas-i825Y7fz.js","assets/Personnel-DcueMHp0.js","assets/photo-ome0KQ8s.js","assets/pilotage-D8kf1Co8.css","assets/Pourboires-C-7e0vU3.js","assets/Predictions-DRV53RJQ.js","assets/Prestataires-GeP_h9PK.js","assets/Prets-BZ6cJXFt.js","assets/PrevisionDuMois-CvJss1bS.js","assets/PrevisionDuMois-DlFTw3OX.css","assets/Previsions-9BU2Vg1T.css","assets/Previsions-C6QHJP2w.js","assets/previsions-pur-D5Ojbg6w.js","assets/processus-pur-R6U5QcCi.js","assets/Projets-BwiD7OvG.js","assets/projets-C1NZVw-0.js","assets/Projets-COO7WDEE.css","assets/projets-pur-2ZEMRNDU.js","assets/protocoles-7AxBBeRD.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-Cy1xmjtm.js","assets/qualification-CNz49FlJ.js","assets/quiz-5qMPWZVi.js","assets/Rapport-CbRponnL.js","assets/Recommandations-CbhdVknn.js","assets/regler-DHR_B1Dm.css","assets/regler-Dl70K_DG.js","assets/regler-par-fedapay-pur-CFL4EbBx.js","assets/relances-pur-BacTXlI2.js","assets/releve-des-avis-j5NsiEUU.js","assets/SalonFoyer-BT1Jr4mr.js","assets/secretariat-admin-C01hzFVn.js","assets/Secretariat-Cy79Zw30.css","assets/Secretariat-DbzuZANz.js","assets/Signatures-CfUfb9Us.js","assets/SignerUnPdf-CSf5QsJ0.js","assets/Synthese-7DJuFaJI.js","assets/SyntheseGraphes-vA0xms2k.js","assets/systeme-TPy-pF7j.css","assets/Tableau-G7rtr3s7.js","assets/temps-CUO9SKgh.js","assets/Textes-B3ni_WMc.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-BUP8Zu_M.js","assets/tiroirs-CkDzpGy0.css","assets/trone-C3h3keVH.js","assets/trone-DxtNUYxb.css","assets/useAudiences-C4EF16Bi.js","assets/useClotureDuJour-C8T4XeM_.js","assets/visios-Cd8DkpS9.js","assets/Vitrine-BWilTqQJ.css","assets/Vitrine-DWiqCmki.js","assets/_admin-2LBQio8o.js","assets/_contrat-DENyMEal.js","assets/_reuni-C66rIB5h.js","assets/_shared-DeTrprIm.js","assets/_signature-DUBBJaPN.js","assets/_ui-BrUDlmuM.css","assets/_ui-D8YEbiSy.js"];
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
