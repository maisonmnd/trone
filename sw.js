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
const BUILD = "20261120065542";
const A_GARDER = ["./","assets/abonnements-BTbxYdqH.js","assets/Abonnements-D2ATHKWQ.js","assets/Abonnements-DTY7p2DH.css","assets/Academie-mdU-4ilI.js","assets/Acces-oHwrGCLz.js","assets/afaire-BXTGbqyp.js","assets/AFaire-y4OOjHUt.js","assets/Agents-CDmS5hXR.js","assets/agents-donnees-CIEyQ8x1.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-Cf08NPCZ.js","assets/App-DdTCQpoM.js","assets/Appels-CqbR9DE5.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/Assistants-D4nVyv67.js","assets/Assistants-D9i2Xwmg.css","assets/AtelierDesContenus-BEZ3CgFV.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/Audience-Cbk1TnQQ.js","assets/Aujourdhui-BKgHn6EW.js","assets/auth-CM35cjIg.js","assets/avant-le-fauteuil-lecture-CJP-zbyM.js","assets/AvantLeFauteuil-DK-EK3JZ.js","assets/avis-fiches-DrSg_Dm1.js","assets/AvisGoogle-DaPXfwX9.css","assets/AvisGoogle-DIvIYfyp.js","assets/BadgeEssai-Bq4bmhcJ.js","assets/BadgeSuggere-CGblPyHD.js","assets/besoins-DDseJ4Xm.js","assets/BesoinsEtRegles-BLwxGVV5.css","assets/BesoinsEtRegles-XYRowwt8.js","assets/bilan-B-bfPYR0.css","assets/bilan-CtkDzUps.js","assets/BilanMensuel-DdULti1x.js","assets/Branches-BbXzbmew.js","assets/bridges-BLrAZGi3.js","assets/Caisse-D95YXfLW.js","assets/caisse-du-soir-C6vPx-E_.css","assets/caisse-du-soir-C_vNHS9q.js","assets/Caisses-d6TDAHfi.js","assets/Calendrier-BhGT1vO_.js","assets/campagnes-pur-BwiylEcN.js","assets/Carnet-CJ-Gzt5V.js","assets/carte-CWnxm7cP.js","assets/carte-_W_-xBPj.css","assets/CarteModal-bC_lL5Nq.js","assets/CartesCadeaux-DaKg-kL1.js","assets/Catalogue-Bxp-Z6KE.js","assets/CentreDeCommande-BdiNEfjV.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-DcBQFr-V.js","assets/certificat-PSD70fsP.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-D5NZSqTg.js","assets/chiffre-du-jour-pur-CdoKfwha.js","assets/ChiffreDesPrestations-D1mP-P1p.js","assets/client-BEVFzbIq.js","assets/cloture-du-jour-CUr86diu.js","assets/ClotureDuTiroir-B_gW6XJX.js","assets/Coffre-BXzgvoLE.js","assets/collecte-mtn-pur-Bq3uWgWT.js","assets/components-TK6sD7vS.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-wCdxEja9.js","assets/Comptes-BBR8f3Jf.js","assets/consultation-CRW6QcWf.css","assets/consultation-DlNOkvje.js","assets/Consultations-C1d-NdJj.js","assets/Consultations-DiE-2_mG.css","assets/consultNotes-D7cVNOH5.js","assets/Conversations-B_WnoICN.js","assets/Conversations-D4WwB5Zo.css","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-KzIJwXm1.js","assets/currency-Cd0clE4P.js","assets/Customers-BNxJZ5qr.js","assets/Dashboard-B2x7VsE_.css","assets/Dashboard-D-D6jmUa.js","assets/dates-DxdUc8EJ.js","assets/Demandes-8GS0it9J.js","assets/DepenseEnUnePhrase-BIGRlGqP.css","assets/DepenseEnUnePhrase-BqkkNg7H.js","assets/Depenses-DK6PaaTp.js","assets/depenses-saisie-DZDO5j28.js","assets/devis-remis-DsvGYui0.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-Cm6_Np8d.js","assets/diagnostics-au-trone-A9oRtkJ7.js","assets/Dictee-C-pUYYFA.css","assets/Dictee-D94MtZXr.js","assets/dictee-pur-CcigQ-BM.js","assets/Discussions-PwdvaiSi.js","assets/echappe-html-pur-gEhHOM07.js","assets/EditeurDesOffres-BPRzWB-V.js","assets/Encaissements-Bh-9FHX7.js","assets/enfants-BJXKNLs9.js","assets/Engagements-BzAjSPiS.js","assets/Engagements-Cj5S9MhG.css","assets/engagements-coffre-DF2VBKZM.js","assets/EntreDeuxSeances-eNr81muf.js","assets/es-Bwueg2D6.js","assets/Evaluation-Cat_dTnJ.js","assets/facture-sQo0Wqko.js","assets/Factures-szWmoo1S.js","assets/FenetreDeLAgent-CRrBKcHa.js","assets/FenetreDesCivilites-BXGoLxC9.js","assets/FenetreDesCivilites-zfNk1aak.css","assets/FenetreDuPoint-BwLGcQ0W.js","assets/Fil-BoDkzvku.js","assets/finances-C8x7Mn4-.css","assets/fon-HMFsW5cG.js","assets/fournisseurs-AB7Ab6Va.js","assets/Fournisseurs-DjbizHj3.js","assets/foyer-CxGP29dX.js","assets/gerard-donnees-DseDEW6r.js","assets/Gerard-TjxX8TDN.js","assets/Gerard-vo2IWvP3.css","assets/gestes-conversation-ehEfKQ8N.js","assets/heures-des-rappels-pur-BWJPB8OP.js","assets/HomeRituals-C3HKs5RV.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-BIIYYC3q.js","assets/ia-centre-1R8V0fKz.js","assets/ia-diagnostic-pur-qGnFEvys.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-tableau-pur-p6UvREJe.js","assets/identite-p3JGxZPA.js","assets/index.es-B4jGaJqX.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-_D9gMJqr.js","assets/jspdf.es.min-BFAHPXOM.js","assets/JustePrix-D8GEpBb7.js","assets/kkiapay-DSzw_g9s.js","assets/kkiapay-widget-CVmsl9OE.js","assets/Laboratoire-Bbftwa7d.js","assets/LaJournee-Bn_G0HCt.css","assets/LaJournee-BOqvjzM-.js","assets/le-caissier-pur-DXJTDtT-.js","assets/LesPaiements-C9cEZlne.css","assets/LesPaiements-DPyXBxBn.js","assets/LettresAuDossier-CJanpelm.js","assets/LienMndPay-BQx1fNZD.js","assets/Marketing-CaqDkXUX.js","assets/MarketingBranche-BcSDXe-8.js","assets/Marque-C_Ij1tQR.js","assets/MesPourboires-CENjelyb.css","assets/MesPourboires-DnmTNgGD.js","assets/MesTaches-aYXe22Ez.js","assets/MesTaches-Cc4XUDf6.css","assets/momo-C2ZVfV9J.js","assets/MonMois-GSBEKjRN.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/MtnMoMo-_g4_GSY9.js","assets/objectifs-BXgjgcNt.js","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/opale-jfi4sfDq.js","assets/oreille-B1AMUmZh.js","assets/paie-du-5-Bwez1Yoy.js","assets/paie-du-5-DeJq-K_U.css","assets/paie-du-5-pur-CPiCK8fv.js","assets/paie-par-mtn-ROj8_a2Y.js","assets/PaieParMtn-W_3EDYZC.js","assets/paliers-CghKc5d1.js","assets/Parametres-yVuV_K5Q.js","assets/parcours-D2xeWEJU.js","assets/Parrainages-CC55-IU3.js","assets/Parrainages-gAHAPB_6.css","assets/PassageAvantLeFauteuil-CssqoEQU.js","assets/pdf-BJ0ZTTf6.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/periode-des-pourboires-pur-BUWqfwov.js","assets/Personas-Bxq7ZuJB.js","assets/Personnel-CIrGpjAy.js","assets/photo-BVX0SDhn.js","assets/pilotage-D8kf1Co8.css","assets/porte-de-l-equipe-CNr2i08X.js","assets/Pourboires-BvxtjBFI.js","assets/Predictions-_S2vTRpJ.js","assets/preload-helper-BRe_O-Rg.js","assets/Prestataires-BqUzO-Lh.js","assets/Prets-DY5XBjWV.js","assets/PrevisionDuMois-BCZ7eNtz.js","assets/PrevisionDuMois-DlFTw3OX.css","assets/Previsions-9BU2Vg1T.css","assets/previsions-pur-DTiPwJKa.js","assets/Previsions-wB8xxiOv.js","assets/processus-pur-R6U5QcCi.js","assets/projets-CJKA_OZ1.js","assets/Projets-COO7WDEE.css","assets/projets-pur-2ZEMRNDU.js","assets/Projets-ZwEVSwz_.js","assets/protocoles-DRr93INW.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-DI-l6HY8.js","assets/quiz-5qMPWZVi.js","assets/Rapport-CZZ_NHLK.js","assets/Recommandations-SeRIXcUP.js","assets/regler-CS09Slvb.js","assets/regler-DHR_B1Dm.css","assets/regler-par-fedapay-pur-G8CEJdGn.js","assets/relances-pur-BacTXlI2.js","assets/releve-des-avis-BcgayBdx.js","assets/SalonFoyer-CZB2M2Co.js","assets/secretariat-admin-tkVuEqDG.js","assets/Secretariat-C9oEOLFj.js","assets/Secretariat-Cy79Zw30.css","assets/Signatures-DP9HFnCa.js","assets/SignerUnPdf-zJ2pXiLo.js","assets/Synthese-Cu5BXQBB.js","assets/SyntheseGraphes-CuLiXxHR.js","assets/systeme-TPy-pF7j.css","assets/Tableau-BJZb64O6.js","assets/temps-BT9QRFxd.js","assets/Textes-B-BBI6at.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-CHk_VdIv.js","assets/tiroirs-CkDzpGy0.css","assets/trone-CLvdsjOO.js","assets/trone-Dsdrwhxz.css","assets/useAudiences-Bm9CDbTh.js","assets/useClotureDuJour-BZQFSd5e.js","assets/visios-CW-YZKbJ.js","assets/Vitrine-BWilTqQJ.css","assets/Vitrine-NHbxgZmR.js","assets/_admin-CAAyu7ct.js","assets/_contrat-CaECVzYg.js","assets/_reuni-D0idpKzP.js","assets/_shared-GdAjnpYe.js","assets/_signature-YGBaGqGi.js","assets/_ui-BiuuQXa-.js","assets/_ui-BrUDlmuM.css"];
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
