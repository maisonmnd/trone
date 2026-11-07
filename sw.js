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
const BUILD = "20261107075856";
const A_GARDER = ["./","assets/abonnements-Cnjsa-0f.js","assets/Abonnements-D-gnK2PT.js","assets/Abonnements-DTY7p2DH.css","assets/Academie-C_aiAfkW.js","assets/Acces-BgPcf3tA.js","assets/afaire-D1dMWfLS.js","assets/AFaire-x87e8uCw.js","assets/agents-donnees-D_mbNSvN.js","assets/Agents-ECEziS_M.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-DHzS4ZGP.js","assets/Appels-C_VDavmb.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/Assistants-CBv-D9XD.js","assets/Assistants-D9i2Xwmg.css","assets/AtelierDesContenus-D3-p6F2A.css","assets/AtelierDesContenus-usMUnTy5.js","assets/Audience-CkkWUhJ5.js","assets/Aujourdhui-FT34Y-_i.js","assets/avant-le-fauteuil-lecture-Bj-o8_O4.js","assets/AvantLeFauteuil-B7wGUTFt.js","assets/avis-fiches-B0QgKhCR.js","assets/AvisGoogle-DaPXfwX9.css","assets/AvisGoogle-uU53IKcy.js","assets/bilan-B-bfPYR0.css","assets/bilan-BGArpHfh.js","assets/BilanMensuel-BIzxrzIg.js","assets/Branches-D_WoO5LH.js","assets/bridges-CWqWlUSx.js","assets/Caisse-CmaA5P6q.js","assets/caisse-du-soir-BwJniIY9.js","assets/caisse-du-soir-C6vPx-E_.css","assets/Caisses-Bix80ut0.js","assets/Calendrier-gJzd8PQA.js","assets/campagnes-pur-cr2RTegc.js","assets/Carnet-CS2GvSex.js","assets/carte-CCZhlUmO.js","assets/carte-_W_-xBPj.css","assets/CarteModal-CnCg4cCI.js","assets/CartesCadeaux-Y5iaDE7V.js","assets/Catalogue-DuQT8kKc.js","assets/CentreDeCommande-BpkQciOd.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-ig7AZJep.js","assets/certificat-BT45ukGD.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-DQWCDQqj.js","assets/chiffre-du-jour-pur-C3UIyA0I.js","assets/ChiffreDesPrestations-Dm_WIhL0.js","assets/client-dOV9IFnB.js","assets/cloture-du-jour-B2ntu5hQ.js","assets/ClotureDuTiroir-BzjNAd5h.js","assets/Coffre-6KP1iq6Y.js","assets/components-DEFiqBMk.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-LhU_o7tL.js","assets/Comptes-CtH6qTM7.js","assets/consultation-CRW6QcWf.css","assets/consultation-DRTuRCyf.js","assets/Consultations-BEQ1u4GN.js","assets/consultNotes-DdQSPfMW.js","assets/Conversations-D4WwB5Zo.css","assets/Conversations-DBZsz2Bl.js","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-DtqBJWke.js","assets/currency-qfIhGmrs.js","assets/Customers-W4AOwWSa.js","assets/Dashboard-B2x7VsE_.css","assets/Dashboard-CwtqFel9.js","assets/dates-D4cVIYXU.js","assets/Demandes-9cIJcndT.js","assets/DepenseEnUnePhrase-BIGRlGqP.css","assets/DepenseEnUnePhrase-CFyxolNF.js","assets/Depenses-BUcH7Ews.js","assets/depenses-saisie-BboVhlch.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-Bl0uBu2s.js","assets/diagnostics-au-trone-DbLqEaQL.js","assets/Dictee-B1LbQSXT.js","assets/Dictee-D2P9yM7v.css","assets/dictee-pur-C0JR9DoD.js","assets/Discussions-CCs8aFgL.js","assets/EditeurDesOffres-BRdiJ9Tm.js","assets/Encaissements-Dfj8iKq5.js","assets/enfants-DciG2R9v.js","assets/Engagements-Cj5S9MhG.css","assets/engagements-coffre-LhY8UTdI.js","assets/Engagements-FgpEPBo2.js","assets/EntreDeuxSeances-A8hFHZuY.js","assets/Evaluation-BGGrh7hb.js","assets/Factures-Cwt25axk.js","assets/FenetreDesCivilites-DuFR9jhO.js","assets/FenetreDesCivilites-zfNk1aak.css","assets/FenetreDuPoint-DkVmtJId.js","assets/Fil-BHUcSnFv.js","assets/finances-BMFnlkRx.css","assets/fon-DO0qaYBQ.js","assets/fournisseurs-BJJJlLwr.js","assets/Fournisseurs-J2ESoIne.js","assets/foyer-CbpeE3iT.js","assets/Gerard-Cgj-zsJh.css","assets/gerard-donnees-DzxeMd70.js","assets/Gerard-SbI0tizB.js","assets/gestes-conversation-aGLn1UQQ.js","assets/HomeRituals-C5x0CyDk.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-Abykytjd.js","assets/ia-centre-XgIDhYJF.js","assets/ia-diagnostic-pur-BBLrGY5l.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-tableau-pur-CSRjGtTf.js","assets/identite-FKJSxJLn.js","assets/index-DHcpaRcm.js","assets/index.es-C6QLe8zY.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-DB99Qhf6.js","assets/jspdf.es.min-Bc3vk-Hg.js","assets/JustePrix-BKUYL2Vv.js","assets/kkiapay-DgQdXj-G.js","assets/kkiapay-widget-DnUhUNd4.js","assets/Laboratoire-CKmpJgAT.js","assets/LaJournee-BJyZmb4V.js","assets/LaJournee-Bn_G0HCt.css","assets/LesPaiements-BvdfOCbQ.css","assets/LesPaiements-iboPVxI7.js","assets/LettresAuDossier-B-IxQyKF.js","assets/LienMndPay-RWeaYe_h.js","assets/Marketing-DjX7OXwo.js","assets/MarketingBranche-D2sdaFha.js","assets/Marque-DDbaBp9m.js","assets/MesPourboires-CC5NgU8k.js","assets/MesPourboires-D9I_9rZf.css","assets/MesTaches-C-r6UScc.js","assets/MesTaches-Cc4XUDf6.css","assets/momo-C2ZVfV9J.js","assets/MonMois-BVJmHJOn.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-B7FDfEVa.js","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/opale-Dj984zmr.js","assets/oreille-B1AMUmZh.js","assets/paie-du-5-DeJq-K_U.css","assets/paie-du-5-Or3dHpdP.js","assets/paie-du-5-pur-D0kN2TYF.js","assets/PaieParMtn-mTy_qwEV.js","assets/paliers-m_9mGxMh.js","assets/Parametres-CcriGoUn.js","assets/parcours-B6JQwzPO.js","assets/Parrainages-CYf0XsR7.js","assets/Parrainages-gAHAPB_6.css","assets/PassageAvantLeFauteuil-qB6HjQe-.js","assets/pdf-CoYXpKQY.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/Personas-DTYv1vcl.js","assets/Personnel-BdFgNBr2.js","assets/photo-6aw6iIWu.js","assets/pilotage-D8kf1Co8.css","assets/Pourboires-CeUPf5EK.js","assets/Predictions-Cln4pKvP.js","assets/Prestataires-gy7xaqun.js","assets/Prets-qFj20_gh.js","assets/PrevisionDuMois-D2vd8Pfr.js","assets/PrevisionDuMois-DlFTw3OX.css","assets/Previsions-CNLDKk0Q.js","assets/previsions-pur-AeyDiko-.js","assets/Previsions-r4v19Anp.css","assets/processus-pur-R6U5QcCi.js","assets/Projets-BdXI9pMN.js","assets/Projets-COO7WDEE.css","assets/projets-DpIE63et.js","assets/projets-pur-2ZEMRNDU.js","assets/protocoles-C7AOJgC3.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-BL8jkgz9.js","assets/qualification-CBCLrk_m.js","assets/quiz-5qMPWZVi.js","assets/Rapport-Cw3SKaxC.js","assets/Recommandations-DuJ6Nd0H.js","assets/regler-C5hcM02_.css","assets/regler-la-seance-serveur-Bs6rzqZX.js","assets/regler-OETtgd2o.js","assets/relances-pur-lwRTXc5E.js","assets/releve-des-avis-DBOpJoTK.js","assets/SalonFoyer-BnohRrb2.js","assets/secretariat-admin-SO7w2w7_.js","assets/Secretariat-C7QNFrdH.js","assets/Secretariat-Cy79Zw30.css","assets/Signatures-kv9dk1tL.js","assets/SignerUnPdf-DVhM2L6O.js","assets/Synthese-BIREVxQk.js","assets/SyntheseGraphes-JpGZqiDv.js","assets/systeme-TPy-pF7j.css","assets/Tableau-Cl0rDUSP.js","assets/temps-By20FB3E.js","assets/Textes-BW280-vk.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-CkDzpGy0.css","assets/tiroirs-iuHBnzm9.js","assets/trone-C4XqLlhp.js","assets/trone-DIN2wFzN.css","assets/useAudiences-DTM9BZON.js","assets/useClotureDuJour-BfTwZ4jx.js","assets/Vitrine-BWilTqQJ.css","assets/Vitrine-DlMuUsVc.js","assets/_admin-BHtiqPCV.js","assets/_contrat-BW9SQwXN.js","assets/_heures-EDLWjBSM.js","assets/_reuni-vH-KigFl.js","assets/_shared-BsmZ39rj.js","assets/_signature-O8cpVCHS.js","assets/_ui-BrUDlmuM.css","assets/_ui-CTtTC0wt.js"];
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
