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
const BUILD = "20261102145013";
const A_GARDER = ["./","assets/abonnements-BJ_Bxo8q.js","assets/Abonnements-CEDc3KD-.js","assets/Academie-DBo01T6R.js","assets/Acces-Dm_VsIkR.js","assets/actions-B-UZ7quZ.js","assets/afaire-DLGbl5T9.js","assets/AFaire-eXGEWfRR.js","assets/agents-donnees-01Wtqzpt.js","assets/Agents-LEr6pgmX.css","assets/Agents-lOGNnDOb.js","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-B-pBGWv7.js","assets/Appels-BKrHSz1B.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/Assistants-BOcxTwZO.css","assets/Assistants-CVkww3a7.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/AtelierDesContenus-DNL4I1cT.js","assets/AuComptoir-XNG-2aaa.js","assets/Audience-UURWB9cE.js","assets/Aujourdhui-CND2xkon.js","assets/avant-le-fauteuil-lecture-CM-aOcj7.js","assets/AvantLeFauteuil-DhsQ4tuo.js","assets/avis-fiches-DB1__dPI.js","assets/AvisGoogle-DaPXfwX9.css","assets/AvisGoogle-DSZOQGHa.js","assets/bilan-B-bfPYR0.css","assets/bilan-ln0ws55K.js","assets/BilanMensuel-QmszppcG.js","assets/Branches-apXXzJOv.js","assets/bridges-CODmp_Q_.js","assets/Caisse-DT2dhaLW.js","assets/caisse-du-soir-DLO3bNBF.js","assets/Caisses-hmGH652h.js","assets/Calendrier-BhmEAIas.js","assets/campagnes-pur-B0RJaPzr.js","assets/Carnet--Xsjkj4u.js","assets/carte-bqViMWS7.js","assets/carte-_W_-xBPj.css","assets/CarteModal-BvKGmOzp.js","assets/CartesCadeaux-CPi11c8i.js","assets/Catalogue-Bkd0H-6P.js","assets/CentreDeCommande-CQzJz5uX.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-DmTuwzoM.js","assets/certificat-C2Td3N9S.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-DPiw8b99.js","assets/ChiffreDesPrestations-C_cCmaBS.js","assets/client-DFIwdlf9.js","assets/ClotureDuTiroir-C6vPx-E_.css","assets/ClotureDuTiroir-WR1N0pj3.js","assets/Coffre-DRwEn0Po.js","assets/components-Bm7-9LXO.js","assets/compte-B_rFqScm.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-ByyhHVo_.js","assets/Comptes-BwnCFZY7.js","assets/Comptoir-B3d68ZfB.js","assets/consultation-BdWdooeb.js","assets/consultation-CRW6QcWf.css","assets/Consultations-CYiJjfMo.js","assets/consultNotes-BJuPmKQp.js","assets/Conversations-BDn5CXTD.js","assets/Conversations-D4WwB5Zo.css","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-BkFKnW2T.js","assets/currency-qfIhGmrs.js","assets/Customers-Dq8ulC9m.js","assets/Dashboard-zjGteuUE.css","assets/Dashboard-ZsPyJIRA.js","assets/dates-DIIDPuIB.js","assets/Demandes-CXhLFgkh.js","assets/Depenses-BGs3ddgR.js","assets/depenses-saisie-DeLWCi7B.js","assets/dernier-message-pur-CBYWnq8m.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-DyC18yQZ.js","assets/diagnostics-au-trone-DYv05PQL.js","assets/Dictee-CUFMxSIA.js","assets/Dictee-D2P9yM7v.css","assets/dictee-pur-ti0lVPdh.js","assets/Discussions-BLXAwCqd.js","assets/EditeurDesOffres-DrHtbgZJ.js","assets/Encaissements-DNokTdnc.js","assets/enfants-BV-NS5js.js","assets/Engagements-B1QwASOn.js","assets/Engagements-Cj5S9MhG.css","assets/EntreDeuxSeances-6n9f6nGn.js","assets/equipe-B_9ZHz24.css","assets/Evaluation-B5Qcn2Z6.js","assets/FacturePrestataire-DOCVtPNS.js","assets/Factures-DxctYCZh.js","assets/FenetreDesCivilites-B6VGMbVb.js","assets/FenetreDesCivilites-zfNk1aak.css","assets/FenetreDuPoint-i4Glw28O.js","assets/Fil-DAhYvy76.js","assets/finances-BMFnlkRx.css","assets/fon-DBZhcH3h.js","assets/fon-pur-CgVkbJ8O.js","assets/Fournisseurs-D7nQ6ggo.js","assets/fournisseurs-DR9vy2OZ.js","assets/foyer-Dw0ztkpn.js","assets/Gerard-DJzQpZkw.css","assets/gerard-donnees-COwqfDsW.js","assets/Gerard-DzTSXOe_.js","assets/gestes-conversation-DKRmQ8nQ.js","assets/HomeRituals-BiUf10J7.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-DQ4UPxid.js","assets/ia-centre-B69uJ80S.js","assets/ia-diagnostic-pur-BBLrGY5l.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-recu-pur-DcucZqpR.js","assets/identite-CBptz-WM.js","assets/index-D8zVkY11.js","assets/index.es-DEZmUZPM.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-C2Z1S8XA.js","assets/jspdf.es.min-BKxJcn9Y.js","assets/JustePrix-Cs2YUmgR.js","assets/kkiapay-oyEBKqwR.js","assets/kkiapay-widget-DnUhUNd4.js","assets/Laboratoire-DcqBirnH.js","assets/laboratoire-Dg8xfIpS.js","assets/LettresAuDossier-CGtJWZB-.js","assets/LienMndPay-Ddh9q3zG.js","assets/maisons-CSSFrqZy.js","assets/Marketing-BdY_T72N.js","assets/MarketingBranche-85U0l-l2.js","assets/Marque-l9evAOP9.js","assets/MesTaches-Cc4XUDf6.css","assets/MesTaches-hhqzdjb8.js","assets/missions-prestataires-Dd6ME5GS.js","assets/momo-C2ZVfV9J.js","assets/MonMois-C2lOPWi-.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/objectifs-pinHj2Tv.js","assets/paliers-BEWDBAk7.js","assets/Parametres-BoToNLCS.js","assets/parcours-DsR56FYh.js","assets/Parrainages-BU1otzG7.js","assets/Parrainages-gAHAPB_6.css","assets/PassageAvantLeFauteuil-BFsv1Rxw.js","assets/pdf-BSKP2AxP.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/Personas-DWLWUDo3.js","assets/Personnel-D_FQ7aXD.js","assets/photo-B3J2vIVj.js","assets/pilotage-D8kf1Co8.css","assets/Predictions-D6vbdO_r.js","assets/Prestataires-D0Wv9fiZ.js","assets/Prets-WGW2z8Mb.js","assets/prevision-du-mois-pur-D6sJa5lw.js","assets/Previsions-D-0__Buz.css","assets/previsions-pur-YHvQr_io.js","assets/Previsions-RaliHJkb.js","assets/processus-pur-BLN25j-E.js","assets/projets-B3kyqNQl.js","assets/Projets-COO7WDEE.css","assets/projets-pur-2ZEMRNDU.js","assets/Projets-WbLonm7B.js","assets/protocoles-C64qakIS.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-CGtVhbf_.js","assets/qualification-DDGqV19M.js","assets/quiz-5qMPWZVi.js","assets/Rapport-CgVxATIu.js","assets/RattacherUneCarte-8iDkwqgH.js","assets/Recommandations-XkMEOn4D.js","assets/regler-BkHuvhuc.js","assets/regler-C5hcM02_.css","assets/regler-la-seance-serveur-Bs6rzqZX.js","assets/relances-pur-lwRTXc5E.js","assets/releve-des-avis-CFSPEzgH.js","assets/SalonFoyer-BnEKTrGG.js","assets/secretariat-admin-C_2X2hX-.js","assets/Secretariat-C2zaVayE.js","assets/Secretariat-Cy79Zw30.css","assets/Signatures-CmSIM6RS.js","assets/SignerUnPdf-B11W0yZ9.js","assets/Synthese-Dq_q5nUP.js","assets/SyntheseGraphes-BjzX8LKq.js","assets/systeme-TPy-pF7j.css","assets/Tableau-C983S0Ub.js","assets/temps-BrunKzpJ.js","assets/Textes-CR2Sf19A.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-P4Cc3Hix.js","assets/trace-du-moyen-pur-Bx8-suHn.js","assets/trone-B6jFQMGx.css","assets/trone-CUc40_3h.js","assets/ui-CjfcbEgK.js","assets/useAudiences-CzjHvfX9.js","assets/vente-C7YWXkHo.css","assets/Vitrine-BDtYPoWT.js","assets/Vitrine-BWilTqQJ.css","assets/_admin-0eEhReLK.js","assets/_contrat-DeZBCWpT.js","assets/_heures-BdMpBVx7.js","assets/_reuni-joO7wRXQ.js","assets/_shared-B4OaRmDY.js","assets/_signature-D5z4XpTZ.js","assets/_ui-3XyV8wQB.js","assets/_ui-BWMA-PlM.css"];
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
