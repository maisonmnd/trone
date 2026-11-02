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
const BUILD = "20261102123413";
const A_GARDER = ["./","assets/abonnements-Cf3UviSr.js","assets/Abonnements-D7XLbU7J.js","assets/Academie-Dm6GcN3G.js","assets/Acces-LNhfvIXN.js","assets/actions-DqMkdO23.js","assets/AFaire-B_OgMZGq.js","assets/afaire-gYOCKShS.js","assets/Agents-CUYkqmjo.js","assets/agents-donnees-LGVxldPj.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-BYGFX8Ya.js","assets/Appels-eI-twqMz.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/Assistants-BP5KXdln.js","assets/Assistants-DuKb9pk7.css","assets/AtelierDesContenus-BLY9e2ne.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/AuComptoir-DwKp75AL.js","assets/Audience-WtQWJYuO.js","assets/Aujourdhui-BO9JQ7d5.js","assets/avant-le-fauteuil-lecture-CWepzGl5.js","assets/AvantLeFauteuil-DMyC8jdB.js","assets/avis-fiches-sXPUP0m6.js","assets/AvisGoogle-DaPXfwX9.css","assets/AvisGoogle-ra6zKVnn.js","assets/bilan-B-bfPYR0.css","assets/bilan-DaidFMZx.js","assets/BilanMensuel-BU3F7Jn3.js","assets/Branches-D_8A5Mi2.js","assets/bridges-B5TWgqOV.js","assets/Caisse-6EnqMl3B.js","assets/caisse-du-soir-BJFlMmSO.js","assets/Caisses-_AsPhRZZ.js","assets/Calendrier-DxmX1uQR.js","assets/campagnes-pur-CnxpeYAc.js","assets/Carnet-CeiZPUho.js","assets/carte-DK3lIw-Q.js","assets/carte-_W_-xBPj.css","assets/CarteModal-CcutZ4Ii.js","assets/CartesCadeaux-CLKQU_36.js","assets/Catalogue-CeoyDbTE.js","assets/CentreDeCommande-Du8kyJhp.css","assets/CentreDeCommande-fa2zFJ7v.js","assets/Cercle-BbfFACAH.js","assets/certificat-CLbI20GN.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-ClQEzOZZ.js","assets/ChiffreDesPrestations-Cy_4lQiA.js","assets/client-Bz5FLZEB.js","assets/ClotureDuTiroir-C6vPx-E_.css","assets/ClotureDuTiroir-Cn6SLdpL.js","assets/Coffre-Cxcjbdij.js","assets/components-4waegCZy.js","assets/compte-BkRGDaXH.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-CcMs1Hp0.js","assets/Comptes-eOb4YiW0.js","assets/Comptoir-CIhVlQyI.js","assets/consultation-CRW6QcWf.css","assets/consultation-DJvRiM4q.js","assets/Consultations-BbUV2EfB.js","assets/consultNotes-CD-EBPh6.js","assets/Conversations-D4WwB5Zo.css","assets/Conversations-jIb_lsrY.js","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-k1yzWxja.js","assets/currency-qfIhGmrs.js","assets/Customers-CsvQE4jM.js","assets/Dashboard-B7jWmyh5.js","assets/Dashboard-zjGteuUE.css","assets/dates-BsqRLBQx.js","assets/Demandes-CBrU7N5l.js","assets/Depenses-CqWJrvOQ.js","assets/depenses-saisie-BeBOq96r.js","assets/dernier-message-pur-CBYWnq8m.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-BhxkanGO.js","assets/diagnostics-au-trone-CAGuVBTe.js","assets/Dictee-a4qaHVXi.js","assets/Dictee-D2P9yM7v.css","assets/dictee-pur-4kgAkPs2.js","assets/Discussions-CTOEmqC8.js","assets/EditeurDesOffres-CBvYvdwN.js","assets/Encaissements-Q0qU4P_N.js","assets/enfants-DFDtmSVD.js","assets/Engagements-Cj5S9MhG.css","assets/Engagements-gHWm5dbN.js","assets/EntreDeuxSeances-DWwLrqAo.js","assets/equipe-B_9ZHz24.css","assets/Evaluation-Ce202SCe.js","assets/FacturePrestataire-Cp8m1MAK.js","assets/Factures-Bqyv9--5.js","assets/FenetreDesCivilites-sh7Q8Dzf.js","assets/FenetreDesCivilites-zfNk1aak.css","assets/FenetreDuPoint-OytC54UO.js","assets/Fil-C_EcDIfK.js","assets/finances-BMFnlkRx.css","assets/fon-BjLuDAll.js","assets/fon-pur-CgVkbJ8O.js","assets/Fournisseurs-CjSei6zr.js","assets/fournisseurs-CPcfJW0w.js","assets/foyer-D-e0nykI.js","assets/Gerard-DJzQpZkw.css","assets/gerard-donnees-Dki_vE5V.js","assets/Gerard-DvXORC_e.js","assets/gestes-conversation-BXrWNhuP.js","assets/HomeRituals-DA4Uwhb9.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-CCZeUn0o.js","assets/ia-centre-Ckr-TERc.js","assets/ia-diagnostic-pur-BBLrGY5l.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-recu-pur-DcucZqpR.js","assets/identite-gYYESeYT.js","assets/index-mGr1_ygW.js","assets/index.es-BFMw8ui5.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-BuO3_Tfm.js","assets/jspdf.es.min-D-mZVWP_.js","assets/JustePrix-A3xyE-zm.js","assets/kkiapay-DoANLr1k.js","assets/kkiapay-widget-DnUhUNd4.js","assets/Laboratoire-C3Ewn0Kb.js","assets/laboratoire-XkXAsUI7.js","assets/LettresAuDossier-wuiLGJIL.js","assets/LienMndPay-NxGHRAam.js","assets/maisons-CSSFrqZy.js","assets/Marketing-BnBl1yep.js","assets/MarketingBranche-wl0ZLfTb.js","assets/Marque-D0qcSfL1.js","assets/MesTaches-Cc4XUDf6.css","assets/MesTaches-DbCr1Eom.js","assets/missions-prestataires-BSaIy_2E.js","assets/momo-B-QSeWY6.js","assets/MonMois-G3VGIJc4.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/objectifs-DMYEd6bl.js","assets/paliers-DDaUqs7u.js","assets/Parametres-ipf653Dk.js","assets/parcours-BTwNR15u.js","assets/Parrainages-CtZV3SNl.js","assets/Parrainages-gAHAPB_6.css","assets/PassageAvantLeFauteuil-DwNfj3R7.js","assets/pdf-CNn52nXB.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/Personas-CHL5ddS8.js","assets/Personnel-BlsViVgL.js","assets/photo-BZXBMoSy.js","assets/pilotage-D8kf1Co8.css","assets/Predictions-Bs81xgBQ.js","assets/Prestataires-CeEqiBSf.js","assets/Prets-C7nPn-tg.js","assets/prevision-du-mois-pur-D6sJa5lw.js","assets/Previsions-D-0__Buz.css","assets/Previsions-pjoxwUcX.js","assets/previsions-pur-CkdSolFT.js","assets/processus-pur-BLN25j-E.js","assets/Projets-COO7WDEE.css","assets/Projets-HA-uUs9P.js","assets/projets-pur-2ZEMRNDU.js","assets/projets-trKE19l-.js","assets/protocoles-BxxsmQvX.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-CLf-qan2.js","assets/qualification-D4aK4jt-.js","assets/quiz-5qMPWZVi.js","assets/Rapport-Dcc6Tlov.js","assets/RattacherUneCarte-DE2982QQ.js","assets/Recommandations-DQQgF6da.js","assets/regler-BkoCvKlc.js","assets/regler-C5hcM02_.css","assets/regler-la-seance-serveur-Bs6rzqZX.js","assets/relances-pur-lwRTXc5E.js","assets/releve-des-avis-BDs0H3XW.js","assets/SalonFoyer-Bkyq_GnH.js","assets/secretariat-admin-CTe3ZQ29.js","assets/Secretariat-C1ftlx63.js","assets/Secretariat-Cy79Zw30.css","assets/Signatures-Cyqraw0J.js","assets/SignerUnPdf-CRJ0f1wT.js","assets/Synthese-BOZTyAHp.js","assets/SyntheseGraphes-DISVGPMA.js","assets/systeme-TPy-pF7j.css","assets/Tableau-DON4a-Kx.js","assets/temps-BKkcAqpF.js","assets/Textes-CHQ9kmA-.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-DhC0gCWP.js","assets/trace-du-moyen-pur-Bx8-suHn.js","assets/trone-B6jFQMGx.css","assets/trone-Zoj7CwGx.js","assets/ui-CMr9VZ1C.js","assets/useAudiences-kd6m80ow.js","assets/vente-C7YWXkHo.css","assets/Vitrine-BorVtrdK.js","assets/Vitrine-BWilTqQJ.css","assets/_admin-fO6sdRBW.js","assets/_contrat-hHPEJ_H0.js","assets/_heures-a1PDBJy3.js","assets/_reuni-CgZ3LlIr.js","assets/_shared-BVdXiEka.js","assets/_signature-DfocRtr6.js","assets/_ui-BWMA-PlM.css","assets/_ui-DoI5dFVg.js"];
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
