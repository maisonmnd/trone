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
const BUILD = "20261104055304";
const A_GARDER = ["./","assets/Abonnements-4PNqFeRq.js","assets/abonnements-jzk5-LIs.js","assets/Academie-By2w3Y0l.js","assets/Acces-B9ZLRzSG.js","assets/actions-Bqob9NVn.js","assets/AFaire-DgLLQK3g.js","assets/afaire-DseDLxt7.js","assets/Agents-BRysp8Kt.js","assets/agents-donnees-CTvbrUY-.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-phAPgCh4.js","assets/Appels-ouFa5bOE.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/Assistants-BOcxTwZO.css","assets/Assistants-UdIXIxED.js","assets/AtelierDesContenus-BYRI3K0M.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/AuComptoir-DZIBgn9j.js","assets/Audience-B3unpo1N.js","assets/Aujourdhui-CJKGtKLZ.js","assets/avant-le-fauteuil-lecture-DqLuFWpq.js","assets/AvantLeFauteuil-DabG4iJA.js","assets/avis-fiches-B_0VeOvV.js","assets/AvisGoogle-BQ1xAj0P.js","assets/AvisGoogle-DaPXfwX9.css","assets/bilan-B-bfPYR0.css","assets/bilan-ycLc0-Op.js","assets/BilanMensuel-2_ifuhfO.js","assets/Branches-Bn65i0PT.js","assets/bridges-71I3A69a.js","assets/Caisse-CItqaQjo.js","assets/caisse-du-soir-CpWYRM1I.js","assets/Caisses-CdhskwrY.js","assets/Calendrier-Crq8y5BC.js","assets/campagnes-pur-BRCiZ8Ny.js","assets/Carnet-CbQNZ81J.js","assets/carte-BtK4KC2H.js","assets/carte-_W_-xBPj.css","assets/CarteModal-DyMlyyix.js","assets/CartesCadeaux-BPfs-p5N.js","assets/Catalogue-BnPg_Vlh.js","assets/CentreDeCommande-DE_U8xBM.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-tjSgy8qS.js","assets/certificat-BTo25EO2.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-Dp5Hx8n5.js","assets/ChiffreDesPrestations-CPVTooSB.js","assets/client-DTCEWOE2.js","assets/ClotureDuTiroir-C6vPx-E_.css","assets/ClotureDuTiroir-DUNjS2wU.js","assets/Coffre-Y7ouWU03.js","assets/components-p7yJePQH.js","assets/compte-courant-ByzulCEN.js","assets/compte-CYp1Cyq4.js","assets/CompteCourant-DploQzxp.js","assets/Comptes-DT4YohCK.js","assets/Comptoir-D5Gaxhlp.js","assets/consultation-BD9TH2Bu.js","assets/consultation-CRW6QcWf.css","assets/Consultations-DFDuNqQp.js","assets/consultNotes-BGwlstwl.js","assets/Conversations-BFAWbbi6.js","assets/Conversations-D4WwB5Zo.css","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-CXqcnZpZ.js","assets/currency-qfIhGmrs.js","assets/Customers-bksgYi7i.js","assets/Dashboard-NdDvyYDq.js","assets/Dashboard-zjGteuUE.css","assets/dates-DtLKyQGE.js","assets/Demandes-B1360oUW.js","assets/Depenses-DRsSMO25.js","assets/depenses-saisie-Bp4myVMH.js","assets/dernier-message-pur-CBYWnq8m.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-3v67sCM6.js","assets/diagnostics-au-trone-C9dOY4N7.js","assets/Dictee-BUB4sCiO.js","assets/Dictee-D2P9yM7v.css","assets/dictee-pur-D017Ll5q.js","assets/Discussions-6UDX8zfH.js","assets/EditeurDesOffres-lbPgVt81.js","assets/Encaissements-DQI8B1GV.js","assets/enfants-BFvtvMh3.js","assets/Engagements-Cf0i9IwS.js","assets/Engagements-Cj5S9MhG.css","assets/EntreDeuxSeances-DQCCu2bw.js","assets/equipe-B_9ZHz24.css","assets/Evaluation-DfAxEsk6.js","assets/FacturePrestataire-CqkaKxOW.js","assets/Factures-JHWvHhwC.js","assets/FenetreDesCivilites-C7RDExQN.js","assets/FenetreDesCivilites-zfNk1aak.css","assets/FenetreDuPoint-BL3nTGN7.js","assets/Fil-BDTDFyYd.js","assets/finances-BMFnlkRx.css","assets/fon-DNt5og7T.js","assets/fon-pur-CgVkbJ8O.js","assets/Fournisseurs-BRL75E6w.js","assets/fournisseurs-S4TqPgbZ.js","assets/foyer-DxYt-yes.js","assets/Gerard-Bfp4ua88.css","assets/Gerard-CYLQc85G.js","assets/gerard-donnees-CitXkQEG.js","assets/gestes-conversation-CKuDcHVg.js","assets/HomeRituals-Led2MF26.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-DqdoJzyO.js","assets/ia-centre-DPwrUAlN.js","assets/ia-diagnostic-pur-BBLrGY5l.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-recu-pur-DcucZqpR.js","assets/identite-4INLq5wc.js","assets/index-CXpxDqKB.js","assets/index.es-CwjGelJy.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-CEMpzFEv.js","assets/jspdf.es.min-0FGdIhKj.js","assets/JustePrix-BnJI_4oJ.js","assets/kkiapay-BVr71J7t.js","assets/kkiapay-widget-DnUhUNd4.js","assets/Laboratoire-Bo_sDnYx.js","assets/laboratoire-CPptID0S.js","assets/LettresAuDossier-Bqg3sWI4.js","assets/LienMndPay-BeLh_HUd.js","assets/maisons-CSSFrqZy.js","assets/Marketing-D0CHZMO9.js","assets/MarketingBranche-C76AaOzz.js","assets/Marque-CUjDD4JE.js","assets/MesTaches-Cc4XUDf6.css","assets/MesTaches-CgU3J3Hl.js","assets/missions-prestataires-Clsvhtbx.js","assets/momo-C2ZVfV9J.js","assets/MonMois-BmEoPz3_.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-DBbEWQIL.js","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/opale-C5de8pP2.js","assets/paliers-1xQS1Gpk.js","assets/Parametres-NCy3ltp_.js","assets/parcours-DVyJK_kN.js","assets/Parrainages-Bsq9QyMj.js","assets/Parrainages-gAHAPB_6.css","assets/PassageAvantLeFauteuil-CljfJFn4.js","assets/pdf-D3wVgwu7.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/Personas-CilRUHkM.js","assets/Personnel-DzedrS5N.js","assets/photo-BnGte7Th.js","assets/pilotage-D8kf1Co8.css","assets/Predictions-CwLwhae3.js","assets/Prestataires-DQTbr5JQ.js","assets/Prets-CFj1K6Bl.js","assets/prevision-du-mois-pur-D6sJa5lw.js","assets/Previsions-D-0__Buz.css","assets/Previsions-DNs79Uo0.js","assets/previsions-pur-DGL0uaMo.js","assets/processus-pur-BLN25j-E.js","assets/Projets-COO7WDEE.css","assets/Projets-Dk0scMaO.js","assets/projets-OSueGWFE.js","assets/projets-pur-2ZEMRNDU.js","assets/protocoles-BtTBIqxF.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-BynZCVZX.js","assets/qualification-BT-AERGD.js","assets/quiz-5qMPWZVi.js","assets/Rapport-9gbbQBEU.js","assets/RattacherUneCarte-nqY3pJvX.js","assets/Recommandations-BCpdot6B.js","assets/regler-C5hcM02_.css","assets/regler-CuWvMCCT.js","assets/regler-la-seance-serveur-Bs6rzqZX.js","assets/relances-pur-lwRTXc5E.js","assets/releve-des-avis-Dpe_PYAS.js","assets/SalonFoyer-DsiF1X4A.js","assets/secretariat-admin-CpR4A6Yg.js","assets/Secretariat-CwkwJ-fv.js","assets/Secretariat-Cy79Zw30.css","assets/Signatures-DL4aSs-m.js","assets/SignerUnPdf-BjF8_aaP.js","assets/Synthese-D8j1kEuH.js","assets/SyntheseGraphes-Dofkhs-j.js","assets/systeme-TPy-pF7j.css","assets/Tableau-uPl6gwKw.js","assets/temps-rpEYf9o-.js","assets/Textes-CohdI9wo.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-Xx-6TO4c.js","assets/trace-du-moyen-pur-Bx8-suHn.js","assets/trone-C1IXU7b-.js","assets/trone-C7KDWd_F.css","assets/ui-WlAQVky1.js","assets/useAudiences-CwUJSY_H.js","assets/vente-CauXO8yV.css","assets/Vitrine-BWilTqQJ.css","assets/Vitrine-Cy90AoKr.js","assets/_admin-BOc4BIN6.js","assets/_contrat-DSZ51a5H.js","assets/_heures-DqdPF3sh.js","assets/_reuni-DMyUL5SO.js","assets/_shared-nvhaxQbp.js","assets/_signature-B69l355s.js","assets/_ui-BWMA-PlM.css","assets/_ui-IHSlqIeM.js"];
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
