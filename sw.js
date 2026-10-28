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
const BUILD = "20261028124025";
const A_GARDER = ["./","assets/abonnements-B1nAnfFV.js","assets/Abonnements-SZ7p-kIY.js","assets/Academie-BkqvzWz5.js","assets/Acces-DKB--bo7.js","assets/actions-BX_B3fxg.js","assets/afaire-CuJJxuMX.js","assets/AFaire-DBKdcwLp.js","assets/Agents-BEDw8nqN.js","assets/agents-donnees-DuNHxDBq.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-BRPetheH.js","assets/Appels-D2AcN3Ud.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/AtelierDesContenus-XbMjy8nW.js","assets/AuComptoir-Cc-FXj77.js","assets/Audience-BkjPvx8W.js","assets/Aujourdhui-BiQd4zGx.js","assets/avis-fiches-BTDVn0fG.js","assets/AvisGoogle-DaPXfwX9.css","assets/AvisGoogle-DpkrEMWT.js","assets/bilan-B-bfPYR0.css","assets/bilan-BtbtMKxZ.js","assets/BilanMensuel-qBPmIHuu.js","assets/Branches-DS7rsV2x.js","assets/bridges-BhSgHZCX.js","assets/Caisse-BLasKthn.js","assets/caisse-du-soir-BJK5xGq7.js","assets/Caisses-D7L9IvaP.js","assets/Calendrier-juxoFC8N.js","assets/campagnes-pur-eE5QPvIu.js","assets/Carnet-GLcv15A0.js","assets/carte-DeOYnWkR.js","assets/carte-_W_-xBPj.css","assets/CarteModal-Bcgz376p.js","assets/CartesCadeaux-Cs7xFC43.js","assets/Catalogue-Bvvjv1Bo.js","assets/CentreDeCommande-BQksHEEP.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-Cym7cLmB.js","assets/certificat-DH79RJTc.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-D5J4Jc3B.js","assets/chiffre-du-jour-pur-CUE47_X7.js","assets/ChiffreDesPrestations-DKIcKKkH.js","assets/client-B74b7-OA.js","assets/ClotureDuTiroir-C6vPx-E_.css","assets/ClotureDuTiroir-FhIcAqsQ.js","assets/Coffre-BecJVxAK.js","assets/components-0yj7OyQy.js","assets/compte-B-TQb_eQ.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-CrCDI87Q.js","assets/Comptes-BUqoj1PS.js","assets/Comptoir-Bo30T2DY.js","assets/consultation-BhL3aihT.js","assets/consultation-CRW6QcWf.css","assets/Consultations-DUHKklNc.js","assets/consultNotes-DaOXFiRw.js","assets/Conversations-D4WwB5Zo.css","assets/Conversations-VRl5XEro.js","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-D20UgK5o.js","assets/currency-qfIhGmrs.js","assets/Customers-DUhwTYsF.js","assets/Dashboard-H3aVFfV4.js","assets/Dashboard-zjGteuUE.css","assets/dates-Y2onSGPL.js","assets/Demandes-BIhosytX.js","assets/Depenses-ra-06CWA.js","assets/dernier-message-pur-CBYWnq8m.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-CS-HcIIB.js","assets/diagnostics-au-trone-xqHCKZW4.js","assets/Discussions--hHL3SwO.js","assets/EditeurDesOffres-B_s0OiNb.js","assets/Encaissements--1JvEQAL.js","assets/enfants-BFDvJklT.js","assets/Engagements-BOylF3of.js","assets/Engagements-Cj5S9MhG.css","assets/EntreDeuxSeances-BjaBIlvl.js","assets/equipe-B_9ZHz24.css","assets/Evaluation-BgAiI41c.js","assets/FacturePrestataire-DWX3upR5.js","assets/Factures-Bx1svpxA.js","assets/FenetreDesCivilites-L9WxFcZA.js","assets/FenetreDesCivilites-zfNk1aak.css","assets/FenetreDuPoint-p-Gm-h9q.js","assets/Fil-BxLc0kr5.js","assets/finances-BMFnlkRx.css","assets/fon-pur-CgVkbJ8O.js","assets/fon-ZShY08Ni.js","assets/fournisseurs-D0-Zseqr.js","assets/Fournisseurs-DqDdVhyP.js","assets/foyer-CAXncala.js","assets/Gerard-DB9rzjDO.js","assets/Gerard-DEy-F7X8.css","assets/gerard-donnees-BlPqXPy9.js","assets/gestes-conversation-Cilep-h3.js","assets/HomeRituals-B1DlEOl2.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-C_zQh14u.js","assets/ia-centre-D8TomR_r.js","assets/ia-diagnostic-pur-hHYxp10Y.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-recu-pur-DcucZqpR.js","assets/identite-B6LnApQv.js","assets/index-Bd8ZxOsv.js","assets/index.es-CI31yKXP.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-B2NStM8O.js","assets/jspdf.es.min-CaCR5p5n.js","assets/JustePrix-8RxyGnRk.js","assets/kkiapay-widget-DnUhUNd4.js","assets/kkiapay-wywLKv9s.js","assets/laboratoire-BZYdbvpJ.js","assets/Laboratoire-DdQnotmF.js","assets/LettresAuDossier-4hZgSse4.js","assets/LienMndPay-DI-9gg47.js","assets/maisons-CSSFrqZy.js","assets/Marketing-H89nKUnv.js","assets/MarketingBranche-BL0Lw3jv.js","assets/Marque-CJfVufdW.js","assets/MesTaches-Cc4XUDf6.css","assets/MesTaches-CRzXFXxv.js","assets/momo-B-QSeWY6.js","assets/MonMois-C1Ey5qbT.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-B723A7qE.js","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/paliers-DSiEMSwc.js","assets/Parametres-3gPOKvGG.js","assets/parcours-DqyFnWIl.js","assets/Parrainages-CzKiYIcD.js","assets/Parrainages-gAHAPB_6.css","assets/pdf-C73v_EtL.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/Personas-BkDaxl_y.js","assets/Personnel-Ci45lTby.js","assets/photo-5tvKYXU8.js","assets/pilotage-D8kf1Co8.css","assets/Predictions-Dgp1lI66.js","assets/Prestataires-04fvjoP_.js","assets/prestataires-D9yGGd8n.js","assets/Prets-Bt0Bx-80.js","assets/prevision-du-mois-pur-D6sJa5lw.js","assets/Previsions-D-0__Buz.css","assets/Previsions-Dn_5UOaE.js","assets/previsions-pur-BrCQKiGU.js","assets/processus-pur-BLN25j-E.js","assets/Projets-BRQuOgl-.js","assets/Projets-COO7WDEE.css","assets/projets-pur-2ZEMRNDU.js","assets/projets-SlxW71W1.js","assets/protocoles-DjmvEKft.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-ClEDc6Nw.js","assets/qualification-2Fs7u75o.js","assets/quiz-5qMPWZVi.js","assets/Rapport-DvbMN_ys.js","assets/RattacherUneCarte-BLRWeknn.js","assets/Recommandations-BNHeevyI.js","assets/regler-ByDaAsIe.js","assets/regler-C5hcM02_.css","assets/regler-la-seance-serveur-Bs6rzqZX.js","assets/relances-pur-BMyEUU8L.js","assets/releve-des-avis-DxeknEq1.js","assets/SalonFoyer-BmUu2O10.js","assets/secretariat-admin-CNHcMYHE.js","assets/Secretariat-Bg0pNQOK.js","assets/Secretariat-Cy79Zw30.css","assets/Signatures-OjmLfJOR.js","assets/SignerUnPdf-B83ZZoA-.js","assets/Synthese-CnpER-2u.js","assets/SyntheseGraphes-Dzt9B4ON.js","assets/systeme-C3XFIa8E.css","assets/Tableau-DHabEQlj.js","assets/temps-CauH1eZ8.js","assets/Textes-DLpOzRbT.css","assets/Textes-DOMI5xrw.js","assets/tiroirs-Cy77hMe3.js","assets/trace-du-moyen-pur-Bx8-suHn.js","assets/trone-BMdkuVGH.css","assets/trone-GX5bIoZP.js","assets/ui-lponther.js","assets/useAudiences-DrrodS4R.js","assets/vente-C7YWXkHo.css","assets/Vitrine-BPh2AmdI.js","assets/Vitrine-BWilTqQJ.css","assets/_admin-8F1Q7rXe.js","assets/_contrat-DrqEcwwJ.js","assets/_heures-2sZFoiYH.js","assets/_reuni-C09efDxf.js","assets/_shared-CWE9WiAn.js","assets/_signature-ChF-D9u6.js","assets/_ui-BWMA-PlM.css","assets/_ui-DYZ9OpCG.js"];
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
