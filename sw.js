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
const BUILD = "20261105110539";
const A_GARDER = ["./","assets/Abonnements-Bdk5zPJX.js","assets/abonnements-D10ZfeJj.js","assets/Academie-Cgj788ba.js","assets/Acces-BodSELC4.js","assets/AFaire-B-D21o-p.js","assets/afaire-CW6NetQ1.js","assets/Agents-Bf9vhGbv.js","assets/agents-donnees-nzFR145e.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-D_wopu44.js","assets/Appels-baWn3e8A.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/Assistants-BOcxTwZO.css","assets/Assistants-CcpYMgAl.js","assets/AtelierDesContenus-CqufuNFG.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/Audience-AV6i2Lqj.js","assets/Aujourdhui-Hf4uTobu.js","assets/avant-le-fauteuil-lecture-BYI8D7mC.js","assets/AvantLeFauteuil-BCN3poZD.js","assets/avis-fiches-Cthx6HPV.js","assets/AvisGoogle-DaPXfwX9.css","assets/AvisGoogle-y4sFRKfw.js","assets/bilan-B-bfPYR0.css","assets/bilan-nWPYu3a8.js","assets/BilanMensuel-BqLgKSPy.js","assets/Branches-Sr9JQE9Q.js","assets/bridges-D7XUe1pe.js","assets/Caisse-COpr479G.js","assets/caisse-du-soir-JSOCTZj_.js","assets/Caisses-BX7eZnTN.js","assets/Calendrier-CPN7dvwb.js","assets/campagnes-pur-CFAQ8TKy.js","assets/Carnet-CdKpFj3x.js","assets/carte-BsnAkKW-.js","assets/carte-_W_-xBPj.css","assets/CarteModal-5cTCZqOB.js","assets/CartesCadeaux-BWyPcT5b.js","assets/Catalogue-D-S4iucI.js","assets/CentreDeCommande-D1Nrjz4F.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-D1e6fX9e.js","assets/certificat-B-NUx1d9.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-Dwxe8N-o.js","assets/chiffre-du-jour-pur-Cue9w1vA.js","assets/ChiffreDesPrestations-WkpvY8jb.js","assets/client-DTei4DX2.js","assets/cloture-du-jour-BSWlk2ZU.js","assets/ClotureDuTiroir-C3r0bRJn.js","assets/ClotureDuTiroir-C6vPx-E_.css","assets/Coffre-45Kh9JUI.js","assets/components-CmfxBXPJ.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-D5XFe7UV.js","assets/Comptes-DHjwHV-1.js","assets/consultation-CRW6QcWf.css","assets/consultation-TXT5xy0U.js","assets/Consultations-BnlD3347.js","assets/consultNotes-BJ2Tzs3Y.js","assets/Conversations-D4WwB5Zo.css","assets/Conversations-DMxmjZF3.js","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-Do91984H.js","assets/currency-qfIhGmrs.js","assets/Customers-B-S5vaBv.js","assets/Dashboard-B2x7VsE_.css","assets/Dashboard-BFQB_z55.js","assets/dates-BqRqQ1cv.js","assets/Demandes-CJi4p2uE.js","assets/DepenseEnUnePhrase-BIGRlGqP.css","assets/DepenseEnUnePhrase-D-GX3RIT.js","assets/Depenses-CpqCGHXb.js","assets/depenses-saisie-BKSVZF6d.js","assets/dernier-message-pur-CBYWnq8m.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-QKDfC1Of.js","assets/diagnostics-au-trone-Br8Jhyln.js","assets/Dictee-CM3KWnPc.js","assets/Dictee-D2P9yM7v.css","assets/dictee-pur-B-fi3Dn2.js","assets/Discussions-yZEXw0rs.js","assets/EditeurDesOffres-Be-FHVZx.js","assets/Encaissements-bqGGB_7x.js","assets/enfants-BxjMJ2_R.js","assets/Engagements-BgQO62fL.js","assets/Engagements-Cj5S9MhG.css","assets/EntreDeuxSeances-DhsIumTE.js","assets/Evaluation-DY83QGRs.js","assets/FacturePrestataire-B30jkl1w.js","assets/Factures-Bj76kxNm.js","assets/FenetreDesCivilites-BS0xLwjU.js","assets/FenetreDesCivilites-zfNk1aak.css","assets/FenetreDuPoint-DddLvfFk.js","assets/Fil-DA22KT_s.js","assets/finances-BMFnlkRx.css","assets/fon-DpKBL3G9.js","assets/fournisseurs-B-y4rywQ.js","assets/Fournisseurs-C31JQRou.js","assets/foyer-DpXFz4Mq.js","assets/Gerard-B5gPS87Z.js","assets/Gerard-CP3QOjfk.css","assets/gerard-donnees-BkLpZO3s.js","assets/gestes-conversation-DUYYN4CS.js","assets/HomeRituals-C4Z6rp5_.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-DCaRshVo.js","assets/ia-centre-DxDy9nyY.js","assets/ia-diagnostic-pur-BBLrGY5l.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-tableau-pur-CSRjGtTf.js","assets/identite-BxT5LcnA.js","assets/index-1DQGri5r.js","assets/index.es-D4hv8Op1.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-6AGjc2VI.js","assets/jspdf.es.min-CxLKSAaV.js","assets/JustePrix-M9Adc_V0.js","assets/kkiapay-Dk1dzCZz.js","assets/kkiapay-widget-DnUhUNd4.js","assets/Laboratoire-CMuTaBZJ.js","assets/LaJournee-0dgrtJEd.js","assets/LaJournee-DNg04cPb.css","assets/LettresAuDossier-BNMj0zRy.js","assets/LienMndPay-C_TkFMY7.js","assets/Marketing-BCt4whoS.js","assets/MarketingBranche-BMgJ4PWa.js","assets/Marque-BIggn8-e.js","assets/MesPourboires-BnROxknq.js","assets/MesPourboires-D9I_9rZf.css","assets/MesTaches-Cc4XUDf6.css","assets/MesTaches-CV_2wBW7.js","assets/momo-C2ZVfV9J.js","assets/MonMois-DI17YYyc.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-Czp7mVE-.js","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/opale-1fZ47lcj.js","assets/paliers-BVWhkxX4.js","assets/Parametres-Ct9hT4mA.js","assets/parcours-PRUkbPse.js","assets/Parrainages-DdenBlwR.js","assets/Parrainages-gAHAPB_6.css","assets/PassageAvantLeFauteuil-yNbh7-h_.js","assets/pdf-VJcNm7C7.js","assets/pdf-WnzRYLlc.js","assets/pdf.worker.min-uNib_u9P.js","assets/Personas-B1U8hHH0.js","assets/Personnel-COYPOPrr.js","assets/photo-DScI-joB.js","assets/pilotage-D8kf1Co8.css","assets/Pourboires-BdKblfUF.js","assets/Predictions-DREvpLlv.js","assets/Prestataires-BSzrWyHg.js","assets/Prets-D_TuITrL.js","assets/PrevisionDuMois-DlFTw3OX.css","assets/PrevisionDuMois-YN3h7Mov.js","assets/Previsions-CqJn4KT8.js","assets/previsions-pur-BONDDLuF.js","assets/Previsions-r4v19Anp.css","assets/processus-pur-R6U5QcCi.js","assets/Projets-COO7WDEE.css","assets/projets-CXjfq6ME.js","assets/Projets-I05ZwC1f.js","assets/projets-pur-2ZEMRNDU.js","assets/protocoles-Dh6xCxIG.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-grvL1Htt.js","assets/qualification-V9qlV9CA.js","assets/quiz-5qMPWZVi.js","assets/Rapport-DB01-Qzs.js","assets/Recommandations-C-NoOfck.js","assets/regler-C5hcM02_.css","assets/regler-HyjRFzmG.js","assets/regler-la-seance-serveur-Bs6rzqZX.js","assets/relances-pur-lwRTXc5E.js","assets/releve-des-avis-VckJsEpX.js","assets/SalonFoyer-Bux3EHfF.js","assets/secretariat-admin-EPISWNfp.js","assets/Secretariat-CdMLBvLo.js","assets/Secretariat-Cy79Zw30.css","assets/Signatures-BvHqT47w.js","assets/SignerUnPdf-BNxmqbWN.js","assets/Synthese-DxA1usnB.js","assets/SyntheseGraphes-DNq4_kp2.js","assets/systeme-TPy-pF7j.css","assets/Tableau-DbncwteJ.js","assets/temps-Du46lUra.js","assets/Textes-Dg1k-Qec.js","assets/Textes-DLpOzRbT.css","assets/tiroirs--c1g75fy.js","assets/tiroirs-CkDzpGy0.css","assets/trone-CmewjJ5O.js","assets/trone-DQVzvvmA.css","assets/useAudiences-C4Tvc4nB.js","assets/useClotureDuJour-HrzSAdeL.js","assets/Vitrine-BWilTqQJ.css","assets/Vitrine-DHX667sQ.js","assets/_admin-B2kWjtTN.js","assets/_contrat-BtlAszu3.js","assets/_heures-3xJ_Hhry.js","assets/_reuni-CXCmX_25.js","assets/_shared-CGErt3JV.js","assets/_signature-Bh7pYH4R.js","assets/_ui-2A593MLZ.js","assets/_ui-BWMA-PlM.css"];
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
