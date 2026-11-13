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
const BUILD = "20261113130255";
const A_GARDER = ["./","assets/abonnements-BHh7cS4O.js","assets/Abonnements-BnWdr09U.js","assets/Abonnements-DTY7p2DH.css","assets/Academie-CcPlQHTE.js","assets/Acces-DMKZeXFK.js","assets/afaire-BbSO75yY.js","assets/AFaire-DtSHeHpU.js","assets/Agents-CGHEm0FY.js","assets/agents-donnees-XHO4QY_F.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-DQubFS9P.js","assets/Appels-DBe7K02r.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/Assistants-BoOKDpDY.js","assets/Assistants-D9i2Xwmg.css","assets/AtelierDesContenus-CDROzmeC.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/Audience-YgASWfUY.js","assets/Aujourdhui-BuXdvT6_.js","assets/avant-le-fauteuil-lecture-BZTs0PNY.js","assets/AvantLeFauteuil-BzR45HG_.js","assets/avis-fiches-mrFw4KlR.js","assets/AvisGoogle-Cawge3nG.js","assets/AvisGoogle-DaPXfwX9.css","assets/BadgeEssai-N55qzt1e.js","assets/besoins-CXzoA7Ny.js","assets/BesoinsEtRegles-CzntMbJE.css","assets/BesoinsEtRegles-Df74UU3b.js","assets/bilan-B-bfPYR0.css","assets/bilan-DuW8QItW.js","assets/BilanMensuel-C4xZrH21.js","assets/Branches-D9hCxS9L.js","assets/bridges-B9PmaSkF.js","assets/Caisse-DazWWNXy.js","assets/caisse-du-soir-Bu3sIpcc.js","assets/caisse-du-soir-C6vPx-E_.css","assets/Caisses-CswevC3k.js","assets/Calendrier-Dzp2LhBd.js","assets/campagnes-pur-CZ2IHH_v.js","assets/Carnet-BcWLtppm.js","assets/carte-BFXF4F6s.js","assets/carte-_W_-xBPj.css","assets/CarteModal-DyZzar5x.js","assets/CartesCadeaux-DOG_0ym4.js","assets/Catalogue-DU0PQHmb.js","assets/CentreDeCommande-DAac0shH.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle--cH4vyan.js","assets/certificat-D9Gw1KNV.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-DlVQCq4l.js","assets/chiffre-du-jour-pur-Di1eHZsj.js","assets/ChiffreDesPrestations-C2pYfVjH.js","assets/client-AMGwy8J-.js","assets/cloture-du-jour-DBp0Ew7P.js","assets/ClotureDuTiroir-BvbF4D6-.js","assets/Coffre-7x1-0xlN.js","assets/collecte-mtn-pur-Bq3uWgWT.js","assets/components-Dn-u90Bd.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-D8NcPuFY.js","assets/Comptes-CtwrcvYq.js","assets/consultation-0jtP5yfz.js","assets/consultation-CRW6QcWf.css","assets/Consultations-D3sHYWsG.js","assets/consultNotes-C0uzv8SR.js","assets/Conversations-BJk3LBhn.js","assets/Conversations-D4WwB5Zo.css","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-CQwOPnV1.js","assets/currency-qfIhGmrs.js","assets/Customers-BGPgq7Jp.js","assets/Dashboard-B2x7VsE_.css","assets/Dashboard-DohZSvBw.js","assets/dates-DhGDA5qp.js","assets/Demandes-D6f3m18L.js","assets/DepenseEnUnePhrase-BIGRlGqP.css","assets/DepenseEnUnePhrase-CMgbhv4i.js","assets/Depenses-B8Z_Y2BH.js","assets/depenses-saisie-Co_Kj42J.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-CqwqMi0H.js","assets/diagnostics-au-trone--hsdpZ57.js","assets/Dictee-BIQFbKhA.css","assets/Dictee-IYj9UG2s.js","assets/dictee-pur-vz7EhL9Z.js","assets/Discussions-BzsyY_uE.js","assets/EditeurDesOffres-BJSikB9U.js","assets/Encaissements-BzVvN93_.js","assets/enfants-BAKTTNiI.js","assets/Engagements-CJ4szUkr.js","assets/Engagements-Cj5S9MhG.css","assets/engagements-coffre-BY7dhakI.js","assets/EntreDeuxSeances-BBOBIDR0.js","assets/Evaluation-P9pZ2q1j.js","assets/facture-QnXPuFXQ.js","assets/Factures-BIjf8UF5.js","assets/FenetreDesCivilites-D1k6MehM.js","assets/FenetreDesCivilites-zfNk1aak.css","assets/FenetreDuPoint-BfV7q6P2.js","assets/Fil-BJuVB_Td.js","assets/finances-C8x7Mn4-.css","assets/fon-BqzEORzg.js","assets/fournisseurs-Dh58p3N_.js","assets/Fournisseurs-jZHHnGfT.js","assets/foyer-D0h7kuwc.js","assets/Gerard-Cgj-zsJh.css","assets/gerard-donnees-DGsQIXai.js","assets/Gerard-DRhmH-fy.js","assets/gestes-conversation-Bj5Z0DUP.js","assets/heures-des-rappels-pur-Dig9pZpo.js","assets/HomeRituals-CGltlnYU.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-BL-bHBcT.js","assets/ia-centre-CBpVvqQN.js","assets/ia-diagnostic-pur-BBLrGY5l.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-tableau-pur-p6UvREJe.js","assets/identite-JJgscLQg.js","assets/index-B40qhhem.js","assets/index.es-DjHR_mdy.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-B4rqI1HP.js","assets/jspdf.es.min-CPxvptFs.js","assets/JustePrix-SJwLnbbV.js","assets/kkiapay-D9iSA5us.js","assets/kkiapay-widget-CVmsl9OE.js","assets/Laboratoire-DiwZ8-tB.js","assets/LaJournee-B2la9UU8.js","assets/LaJournee-Bn_G0HCt.css","assets/LesPaiements-C9cEZlne.css","assets/LesPaiements-CToDwEou.js","assets/LettresAuDossier-B4RTJxtX.js","assets/LienMndPay-DvRjjdnf.js","assets/Marketing-BxR8aKB4.js","assets/MarketingBranche-HZvkYdBV.js","assets/Marque-6Slx65p9.js","assets/MesPourboires-CENjelyb.css","assets/MesPourboires-DYIFNCvy.js","assets/MesTaches-B8n7Gvfh.js","assets/MesTaches-Cc4XUDf6.css","assets/momo-C2ZVfV9J.js","assets/MonMois-FmpndV2b.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/MtnMoMo-B5ok7N_b.js","assets/objectifs-CtdOjl4b.js","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/opale-10lxnH2E.js","assets/oreille-B1AMUmZh.js","assets/paie-du-5-Cf_4_kPk.js","assets/paie-du-5-DeJq-K_U.css","assets/paie-du-5-pur-CPiCK8fv.js","assets/paie-par-mtn-J0vXNuyo.js","assets/PaieParMtn-DMu31z3Z.js","assets/paliers-D6caT6R1.js","assets/Parametres-DNVqDxFs.js","assets/parcours-DaW66JC8.js","assets/Parrainages-C2zOe8sO.js","assets/Parrainages-gAHAPB_6.css","assets/PassageAvantLeFauteuil-vTQSRxsI.js","assets/pdf-BbDmhRVq.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/periode-des-pourboires-pur-BUWqfwov.js","assets/Personas-5sxKufE3.js","assets/Personnel-DnnarALg.js","assets/photo-2KHXL9C0.js","assets/pilotage-D8kf1Co8.css","assets/Pourboires-k_Zw4PT-.js","assets/Predictions-Cq8L1tJR.js","assets/Prestataires-B2zyQc6X.js","assets/Prets-7z5gOUhb.js","assets/PrevisionDuMois-DlFTw3OX.css","assets/PrevisionDuMois-ZBa4N8v-.js","assets/Previsions-9BU2Vg1T.css","assets/Previsions-DSrVtRKS.js","assets/previsions-pur-DJnIFC0X.js","assets/processus-pur-R6U5QcCi.js","assets/Projets-BQMngCz-.js","assets/projets-CeZEHGhy.js","assets/Projets-COO7WDEE.css","assets/projets-pur-2ZEMRNDU.js","assets/protocoles-CNdM99lv.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-DFEW_BH7.js","assets/qualification-Hdq-gR5H.js","assets/quiz-5qMPWZVi.js","assets/Rapport-DzMaxhzm.js","assets/Recommandations-C5LlJk3f.js","assets/regler-Cf6Xy5Ew.js","assets/regler-DHR_B1Dm.css","assets/regler-par-fedapay-pur-G8CEJdGn.js","assets/relances-pur-BacTXlI2.js","assets/releve-des-avis-Csts04VP.js","assets/SalonFoyer-DeZKiKfw.js","assets/secretariat-admin-njsOhRmG.js","assets/Secretariat-Cy79Zw30.css","assets/Secretariat-DYcq8NtW.js","assets/Signatures-Dd3QeovU.js","assets/SignerUnPdf-TYDcISme.js","assets/Synthese-qfV2wAcR.js","assets/SyntheseGraphes-BeJqeEuj.js","assets/systeme-TPy-pF7j.css","assets/Tableau-ZC_OtUQQ.js","assets/temps-DjZpai4O.js","assets/Textes-B77xQPZB.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-BXyKSZVn.js","assets/tiroirs-CkDzpGy0.css","assets/trone-BQq0c-SJ.js","assets/trone-Dg6wh-u1.css","assets/useAudiences-BFeOimCz.js","assets/useClotureDuJour-DcwwyA9g.js","assets/Vitrine-BWilTqQJ.css","assets/Vitrine-rnOblAND.js","assets/_admin-DTt3tQwP.js","assets/_contrat-DU9j4tvL.js","assets/_reuni-CCzq-Va-.js","assets/_shared-XR9_owVx.js","assets/_signature-Brtr1STD.js","assets/_ui-BrUDlmuM.css","assets/_ui-DZSj3Xxv.js"];
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
