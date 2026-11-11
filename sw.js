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
const BUILD = "20261111233300";
const A_GARDER = ["./","assets/abonnements-B7dzdQYn.js","assets/Abonnements-DnD1LH17.js","assets/Abonnements-DTY7p2DH.css","assets/Academie-BGGtasZV.js","assets/Acces-GH5R6k-e.js","assets/afaire-DX6hGQNS.js","assets/AFaire-DZcIIAxa.js","assets/Agents-B2Uqm9he.js","assets/agents-donnees-wrTxIhYj.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-CuW_P58o.js","assets/Appels-B1YpIhS-.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/Assistants-3M4JUGze.js","assets/Assistants-D9i2Xwmg.css","assets/AtelierDesContenus-B8IUE8oC.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/Audience-DrLGH4Yr.js","assets/Aujourdhui-Cn7VzfVn.js","assets/avant-le-fauteuil-lecture-CKpSxw-Q.js","assets/AvantLeFauteuil-DAC9O2v6.js","assets/avis-fiches-CNjNq7Vj.js","assets/AvisGoogle-DaPXfwX9.css","assets/AvisGoogle-zlBB16Dm.js","assets/BadgeEssai-Cfd6MVQV.js","assets/bilan-B-bfPYR0.css","assets/bilan-BxLiSItO.js","assets/BilanMensuel-KAbxK0Ek.js","assets/Branches-CFY5p5iZ.js","assets/bridges-CmIXLds3.js","assets/Caisse-DO6v9XSL.js","assets/caisse-du-soir-aeVxszMG.js","assets/caisse-du-soir-C6vPx-E_.css","assets/Caisses-QcgHa7qb.js","assets/Calendrier-BsMSRjDB.js","assets/campagnes-pur-BUR2QRJX.js","assets/Carnet-DdirzvN7.js","assets/carte-7EGZ4qsZ.js","assets/carte-_W_-xBPj.css","assets/CarteModal-DAR2VRjW.js","assets/CartesCadeaux-DKCXd-NT.js","assets/Catalogue-DV-5TqYv.js","assets/CentreDeCommande-Du8kyJhp.css","assets/CentreDeCommande-Z8PBZJo_.js","assets/Cercle-CX6mwqGw.js","assets/certificat-Dl_BmhSq.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-C4AaBdmH.js","assets/chiffre-du-jour-pur-B5px3wUD.js","assets/ChiffreDesPrestations-BJ9TcaKy.js","assets/client-Dtka_pOR.js","assets/cloture-du-jour-Dnoefdtg.js","assets/ClotureDuTiroir-Bv5VaAw0.js","assets/Coffre-CrBRPtCb.js","assets/collecte-mtn-pur-DW4nw7-V.js","assets/components-CNvaMc_k.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-_BCwqVLv.js","assets/Comptes-DUf3abnE.js","assets/consultation-BxYsovwZ.js","assets/consultation-CRW6QcWf.css","assets/Consultations-Dds2VYJJ.js","assets/consultNotes-8x2QW55i.js","assets/Conversations-C8Z0CIaK.js","assets/Conversations-D4WwB5Zo.css","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-1sUQMDS8.js","assets/currency-qfIhGmrs.js","assets/Customers-nZIxiWnQ.js","assets/Dashboard-B2x7VsE_.css","assets/Dashboard-DoEkzPus.js","assets/dates-DztySQmG.js","assets/Demandes-DUa1NemQ.js","assets/DepenseEnUnePhrase-BIGRlGqP.css","assets/DepenseEnUnePhrase-lZGymWOe.js","assets/Depenses-BkOXY56Z.js","assets/depenses-saisie-Bz0Ac2b7.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-YVV07-QV.js","assets/diagnostics-au-trone-C4Ekh3jP.js","assets/Dictee-D2P9yM7v.css","assets/dictee-pur-CBtHQz_V.js","assets/Dictee-zgD3UDkS.js","assets/Discussions-CJjHrm-Y.js","assets/EditeurDesOffres-BisuU-kD.js","assets/Encaissements-BzVVQuS0.js","assets/enfants-DW4yyAEO.js","assets/Engagements-Cj5S9MhG.css","assets/engagements-coffre-S64TKPEy.js","assets/Engagements-DKUFFprS.js","assets/EntreDeuxSeances-C1g8Gfy9.js","assets/Evaluation-27BBmgDm.js","assets/facture-1wFqGVHN.js","assets/Factures-D4pBLGOs.js","assets/FenetreDesCivilites-DjwG6Gvl.js","assets/FenetreDesCivilites-zfNk1aak.css","assets/FenetreDuPoint-CT1gr1hD.js","assets/Fil-uoYwohEG.js","assets/finances-BMFnlkRx.css","assets/fon-CHtgaqWC.js","assets/fournisseurs-BIeNsG9j.js","assets/Fournisseurs-XmN-tl7g.js","assets/foyer-BKVgsfP1.js","assets/Gerard-Cgj-zsJh.css","assets/gerard-donnees-Daua4BdD.js","assets/Gerard-DrwOOBpn.js","assets/gestes-conversation-M42OuC8E.js","assets/heures-des-rappels-pur-Dig9pZpo.js","assets/HomeRituals-BQQJMQSK.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-DafyMA94.js","assets/ia-centre-cIdSby7F.js","assets/ia-diagnostic-pur-BBLrGY5l.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-tableau-pur-p6UvREJe.js","assets/identite-BO5c36lo.js","assets/index-IALrhZMU.js","assets/index.es-QhkVB_nQ.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-DFr07XiQ.js","assets/jspdf.es.min-BpVw4jWf.js","assets/JustePrix-Dz46NjAp.js","assets/kkiapay-Dy9oOklY.js","assets/kkiapay-widget-DnUhUNd4.js","assets/Laboratoire-Cl-u0hOM.js","assets/LaJournee-Bn_G0HCt.css","assets/LaJournee-Uby0eQev.js","assets/LesPaiements-2JGVocD8.js","assets/LesPaiements-C9cEZlne.css","assets/LettresAuDossier-C-3rZmgE.js","assets/LienMndPay-CNLaBy2g.js","assets/Marketing-C8PAcdhj.js","assets/MarketingBranche-DRgSRF4b.js","assets/Marque-CVpuG9h9.js","assets/MesPourboires-CENjelyb.css","assets/MesPourboires-DCDgUCce.js","assets/MesTaches-BOt1qenF.js","assets/MesTaches-Cc4XUDf6.css","assets/momo-C2ZVfV9J.js","assets/MonMois-Cg8NEB83.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/MtnMoMo-c-ogviip.js","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/objectifs-jKfcYeta.js","assets/opale-DLjT8sAP.js","assets/oreille-B1AMUmZh.js","assets/paie-du-5-CmuY21gO.js","assets/paie-du-5-DeJq-K_U.css","assets/paie-du-5-pur-CPiCK8fv.js","assets/paie-par-mtn-CY7llH8s.js","assets/PaieParMtn-CCbZhw5l.js","assets/paliers-D03bF5DS.js","assets/Parametres-9FgdIXfd.js","assets/parcours-VeoU63Do.js","assets/Parrainages-DbyAj8WP.js","assets/Parrainages-gAHAPB_6.css","assets/PassageAvantLeFauteuil-BU0fJVWm.js","assets/pdf-mY63_L0u.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/periode-des-pourboires-pur-BUWqfwov.js","assets/Personas-kFgUifWq.js","assets/Personnel-CTGkLmLV.js","assets/photo-CShCn2C7.js","assets/pilotage-D8kf1Co8.css","assets/Pourboires-B7s1rlxh.js","assets/Predictions-Cj2MRbDZ.js","assets/Prestataires-DphaU3j4.js","assets/Prets-BMrAObul.js","assets/PrevisionDuMois-DlFTw3OX.css","assets/PrevisionDuMois-uwSAYsnM.js","assets/Previsions-9BU2Vg1T.css","assets/previsions-pur-DqvvgLYC.js","assets/Previsions-WJEQNGAn.js","assets/processus-pur-R6U5QcCi.js","assets/projets-B48mgyMy.js","assets/Projets-COO7WDEE.css","assets/projets-pur-2ZEMRNDU.js","assets/Projets-xCDoM91q.js","assets/protocoles-DAcH8U04.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-Dpm3Zfu6.js","assets/qualification-qs1KKptr.js","assets/quiz-5qMPWZVi.js","assets/Rapport-C45bNrM7.js","assets/Recommandations-C8cZTLbX.js","assets/regler-DHR_B1Dm.css","assets/regler-VikYPcIF.js","assets/relances-pur-BacTXlI2.js","assets/releve-des-avis-CwgMz9Ui.js","assets/SalonFoyer-DQjDQUW2.js","assets/secretariat-admin-BPgr3vua.js","assets/Secretariat-Cy79Zw30.css","assets/Secretariat-DbJb1K2b.js","assets/Signatures-C-EoHa3Y.js","assets/SignerUnPdf-Bbpt3jzy.js","assets/Synthese-BfDeZ7AH.js","assets/SyntheseGraphes-bKoEg3cP.js","assets/systeme-TPy-pF7j.css","assets/Tableau-DlpJCAtr.js","assets/temps-nxGZt7_O.js","assets/Textes-BeB7e4aw.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-CkDzpGy0.css","assets/tiroirs-DksjxLcS.js","assets/trone-C4PZfI1t.js","assets/trone-CKg79qbi.css","assets/useAudiences-fvKZM1TO.js","assets/useClotureDuJour-Dx6B8L0t.js","assets/Vitrine-BFqRZeZg.js","assets/Vitrine-BWilTqQJ.css","assets/_admin-DQ4Y3IEC.js","assets/_contrat-Bgt0qCEk.js","assets/_reuni-J-UCgYhS.js","assets/_shared-1sUoj8DX.js","assets/_signature-CBxLsS2w.js","assets/_ui-B8JlSPLE.js","assets/_ui-BrUDlmuM.css"];
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
