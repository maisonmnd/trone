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
const BUILD = "20261028071615";
const A_GARDER = ["./","assets/abonnements-CHaVtTd7.js","assets/Abonnements-fld2b1jG.js","assets/Academie-C5BuTNWF.js","assets/Acces-CLI5W-ya.js","assets/actions-CTFal89m.js","assets/afaire-qR9bgsra.js","assets/AFaire-vMPfYxK0.js","assets/agents-donnees-DYx-nGTT.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Agents-zQ-tHufi.js","assets/Analytics-CPtaZZFT.js","assets/Appels-YdEmF1oL.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/AtelierDesContenus-DPC6cJvo.js","assets/AuComptoir-vTU_WTBp.js","assets/Audience-BLvH6UyJ.js","assets/Aujourdhui-3o3hQ6aO.js","assets/avis-fiches-DbDWQLNJ.js","assets/AvisGoogle-BcmQI5qB.js","assets/AvisGoogle-DaPXfwX9.css","assets/bilan-B-bfPYR0.css","assets/bilan-Bmx4JN0B.js","assets/BilanMensuel-DQrkpk8E.js","assets/Branches-B7nXV2pU.js","assets/bridges-B0kSRGkc.js","assets/Caisse-DrqH6Ig0.js","assets/caisse-du-soir-AE3w-YUq.js","assets/Caisses-U8TM7M_p.js","assets/Calendrier-C-m1Hws1.js","assets/campagnes-pur-DnQ39xp3.js","assets/Carnet-W4xAAK1z.js","assets/carte-Bo_D_2IV.js","assets/carte-_W_-xBPj.css","assets/CarteModal-C7R-BbQg.js","assets/CartesCadeaux-9T8Lg44o.js","assets/Catalogue-AF7mewK-.js","assets/CentreDeCommande-DtVKkzPE.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-B0vFc2DF.js","assets/certificat-BNaAK9r_.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-9PgeerUt.js","assets/chiffre-du-jour-pur-DHtu_9rv.js","assets/ChiffreDesPrestations-VzFeWS_U.js","assets/client-CFOf_9WK.js","assets/ClotureDuTiroir-C6vPx-E_.css","assets/ClotureDuTiroir-CK1uBR82.js","assets/Coffre-Dz4r6x3X.js","assets/components-Cv8HWY5z.js","assets/compte-courant-ByzulCEN.js","assets/compte-DX9L3kdG.js","assets/CompteCourant-DCsH0Phv.js","assets/Comptes-ChE5p7TI.js","assets/Comptoir-BZ8W_YX4.js","assets/consultation-CRW6QcWf.css","assets/consultation-DVpFZelY.js","assets/Consultations-BygY0wQJ.js","assets/consultNotes-BLOmNfEJ.js","assets/Conversations-CQh-eU02.js","assets/Conversations-D4WwB5Zo.css","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-0cTZ1EdK.js","assets/currency-qfIhGmrs.js","assets/Customers-B1ZyaAdS.js","assets/Dashboard-DguQjFWB.js","assets/Dashboard-zjGteuUE.css","assets/dates-DXUgOjal.js","assets/Demandes-BntacVnO.js","assets/Depenses-DnQdI2e3.js","assets/dernier-message-pur-CBYWnq8m.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-D5zOfUNp.js","assets/diagnostics-au-trone-DiZrKEdZ.js","assets/Discussions-DfU9qmps.js","assets/EditeurDesOffres-CsiR6zSA.js","assets/Encaissements-Ls6Gs_z9.js","assets/enfants-DFf-1rqb.js","assets/Engagements-Cj5S9MhG.css","assets/Engagements-HMj726l1.js","assets/EntreDeuxSeances-Dfeuci2L.js","assets/equipe-B_9ZHz24.css","assets/Evaluation-22KkKWyt.js","assets/FacturePrestataire-CrbCr-0m.js","assets/Factures-C4rNBMS5.js","assets/Fil-Bh1Zjr0h.js","assets/finances-BMFnlkRx.css","assets/fon-BkM1GZGV.js","assets/fon-pur-CgVkbJ8O.js","assets/fournisseurs-B-Wfg6IU.js","assets/Fournisseurs-Cxfowjii.js","assets/foyer-IQgJm9_v.js","assets/Gerard-CMmZkX6V.js","assets/Gerard-CUvkbLSl.css","assets/gerard-donnees-D-plc8aB.js","assets/gestes-conversation-BD6qRPes.js","assets/HomeRituals-CEoyyX2y.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-Bb2wm9HL.js","assets/ia-centre-DZekisTH.js","assets/ia-diagnostic-pur-hHYxp10Y.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-recu-pur-DcucZqpR.js","assets/identite-CVIjacsP.js","assets/index-D1QZlZv5.js","assets/index.es-Dru82jOY.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-BHc4MHjz.js","assets/jspdf.es.min-BivkCIOe.js","assets/JustePrix-DkKeSrop.js","assets/kkiapay-JgtgSRMD.js","assets/kkiapay-widget-DnUhUNd4.js","assets/laboratoire-BEn-bXrM.js","assets/Laboratoire-BTgj_OHt.js","assets/LettresAuDossier-DyExjjq-.js","assets/LienMndPay-B4MQb242.js","assets/maisons-CSSFrqZy.js","assets/Marketing-DHqPASLS.js","assets/MarketingBranche-CCbgaRQf.js","assets/Marque-DalVZYTh.js","assets/MesTaches-Cc4XUDf6.css","assets/MesTaches-qzjEmu0R.js","assets/momo-B-QSeWY6.js","assets/MonMois-CfdxF4xe.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-D5vWKbSA.js","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/paliers-CJjue_zb.js","assets/Parametres-CrATV3Al.js","assets/parcours-D2lxobbj.js","assets/Parrainages-gAHAPB_6.css","assets/Parrainages-HxJ37BrB.js","assets/pdf-JZhTvXh2.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/Personas-Cwuf0oVX.js","assets/Personnel-Nfpf6ojy.js","assets/photo-Bbmy5RtS.js","assets/pilotage-D8kf1Co8.css","assets/Predictions-3bBkW043.js","assets/Prestataires-BXb_opae.js","assets/prestataires-CTcumKfK.js","assets/Prets-Dm19cd_l.js","assets/prevision-du-mois-pur-D6sJa5lw.js","assets/Previsions-B2PXJccs.js","assets/Previsions-D-0__Buz.css","assets/previsions-pur-BhUT5TbU.js","assets/processus-pur-BLN25j-E.js","assets/Projets-COO7WDEE.css","assets/Projets-HNrVzdpK.js","assets/projets-pur-2ZEMRNDU.js","assets/projets-QqZx7iGD.js","assets/protocoles-FKT7m7p9.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-BzV92iw5.js","assets/qualification-D47d_fJ1.js","assets/quiz-5qMPWZVi.js","assets/Rapport-B1nHXcUe.js","assets/RattacherUneCarte-DDCdgjtL.js","assets/Recommandations-CLq2TbjG.js","assets/regler-BKalJB4a.js","assets/regler-C5hcM02_.css","assets/regler-la-seance-serveur-B59IZtta.js","assets/relances-pur-DsIo28uB.js","assets/releve-des-avis-CcREF79U.js","assets/SalonFoyer-DgGcUrt9.js","assets/secretariat-admin-DB3aGmZ5.js","assets/Secretariat-CvDDvqZ_.js","assets/Secretariat-Cy79Zw30.css","assets/Signatures-DQjpKEwA.js","assets/SignerUnPdf-Cvxe5jmE.js","assets/Synthese-DnMv0NSL.js","assets/SyntheseGraphes-YPaLaEyo.js","assets/systeme-C3XFIa8E.css","assets/Tableau-mLMxwpgM.js","assets/temps-DaCsk0cH.js","assets/Textes-COYRGUCY.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-PTkIkrpu.js","assets/trace-du-moyen-pur-Bx8-suHn.js","assets/trone-BMdkuVGH.css","assets/trone-CvyKorz-.js","assets/ui-BOI-HW6x.js","assets/useAudiences-B1nzNQD7.js","assets/vente-C7YWXkHo.css","assets/Vitrine-B0CuMnRo.js","assets/Vitrine-BWilTqQJ.css","assets/_admin-BEqT2tPD.js","assets/_contrat-DUjlzrZ3.js","assets/_heures-BRzGCLfk.js","assets/_reuni-CocTYbii.js","assets/_shared-BQZSsWqh.js","assets/_signature-CmQ7YUp5.js","assets/_ui-BWMA-PlM.css","assets/_ui-D4ksQMSE.js"];
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
