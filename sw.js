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
const BUILD = "20261030100609";
const A_GARDER = ["./","assets/abonnements-BeSIYljT.js","assets/Abonnements-C_5cma3s.js","assets/Academie-Be1kaM76.js","assets/Acces-DAMuhbdl.js","assets/actions-L7JPYJ_p.js","assets/afaire-CmXW795C.js","assets/AFaire-D3Av1NEV.js","assets/Agents-BTnXnXe1.js","assets/agents-donnees-DCGV9_pd.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-d4rCdaIf.js","assets/Appels-xAClbk3w.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/AtelierDesContenus-Chbv1E3y.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/AuComptoir-C7D6ajsh.js","assets/Audience-Cfd9x7wm.js","assets/Aujourdhui-L9bQ5Cq_.js","assets/avis-fiches-DxwOSh7t.js","assets/AvisGoogle-Bd7PMn-u.js","assets/AvisGoogle-DaPXfwX9.css","assets/bilan-B-bfPYR0.css","assets/bilan-COH1rhMh.js","assets/BilanMensuel-BRMU3hJe.js","assets/Branches-CcPnnkzv.js","assets/bridges-DG_bSeG_.js","assets/caisse-du-soir-DspB2xF8.js","assets/Caisse-I4Zsd72N.js","assets/Caisses-XAXAfQZP.js","assets/Calendrier-DIcGbX-L.js","assets/campagnes-pur-DIUsJdXK.js","assets/Carnet-Dbu66ZLV.js","assets/carte-Mt76Ti57.js","assets/carte-_W_-xBPj.css","assets/CarteModal-Bpkc8QT9.js","assets/CartesCadeaux-CJ4D4-nq.js","assets/Catalogue-BYk_BXtf.js","assets/CentreDeCommande-Du8kyJhp.css","assets/CentreDeCommande-QYYTBzck.js","assets/Cercle-CthzTLsW.js","assets/certificat-DDxUOhZJ.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-hGCsS9ul.js","assets/chiffre-du-jour-pur-vMSi_6v8.js","assets/ChiffreDesPrestations-DEncH46O.js","assets/client-zo1QgSgn.js","assets/ClotureDuTiroir-C6vPx-E_.css","assets/ClotureDuTiroir-Cn8s_N6r.js","assets/Coffre-D_e_XoXN.js","assets/components-Bn4oFpoF.js","assets/compte-courant-ByzulCEN.js","assets/compte-DntIxrEe.js","assets/CompteCourant-C6CQq0rO.js","assets/Comptes-9oFZCDhV.js","assets/Comptoir-BkzcVBGl.js","assets/consultation-CRW6QcWf.css","assets/consultation-CXGffW0y.js","assets/Consultations-DkomR4lv.js","assets/consultNotes-Coz0cmLG.js","assets/Conversations-D4WwB5Zo.css","assets/Conversations-POq0vRty.js","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-DO4Bq0XL.js","assets/currency-qfIhGmrs.js","assets/Customers-n3obvcnB.js","assets/Dashboard-DNIxRJjQ.js","assets/Dashboard-zjGteuUE.css","assets/dates-kYFqKxnG.js","assets/Demandes-DJSXfy_g.js","assets/Depenses-BJotHz9W.js","assets/dernier-message-pur-CBYWnq8m.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-BCeeGrh3.js","assets/diagnostics-au-trone-DNEQ1KXX.js","assets/Discussions-C07t_tlw.js","assets/EditeurDesOffres-CGRZt47F.js","assets/Encaissements-BbXzIfCp.js","assets/enfants-9D511q7J.js","assets/Engagements-Cj5S9MhG.css","assets/Engagements-DDe_tcBf.js","assets/EntreDeuxSeances-BuQ9sGhj.js","assets/equipe-B_9ZHz24.css","assets/Evaluation-BOhJ2Ywr.js","assets/FacturePrestataire-DtSKRz1o.js","assets/Factures-C3iF3qAN.js","assets/FenetreDesCivilites-CIElrGje.js","assets/FenetreDesCivilites-zfNk1aak.css","assets/FenetreDuPoint-KT1cPy9W.js","assets/Fil-1tV3Yi5m.js","assets/finances-BMFnlkRx.css","assets/fon-BbW6BmU6.js","assets/fon-pur-CgVkbJ8O.js","assets/Fournisseurs-D3sc_KWW.js","assets/fournisseurs-pIZfUr1o.js","assets/foyer-BaAi3N4p.js","assets/Gerard-6fHqTj4J.js","assets/Gerard-C9ljG_Nk.css","assets/gerard-donnees-drsn1psX.js","assets/gestes-conversation-BDJAw01M.js","assets/HomeRituals-uvrsNDa4.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-DmM5skZ4.js","assets/ia-centre-DgibsnRg.js","assets/ia-diagnostic-pur-hHYxp10Y.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-recu-pur-DcucZqpR.js","assets/identite-PoPT87yR.js","assets/index-DE-kjxYg.js","assets/index.es-DXEL1vrY.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-01RckDQ0.js","assets/jspdf.es.min-B5pHs7y9.js","assets/JustePrix-D_-MJsuE.js","assets/kkiapay-DdD87f27.js","assets/kkiapay-widget-DnUhUNd4.js","assets/Laboratoire-CUvqvO6m.js","assets/laboratoire-tROWq9lG.js","assets/LettresAuDossier-DCApS7KT.js","assets/LienMndPay-RSrEaBCD.js","assets/maisons-CSSFrqZy.js","assets/Marketing-BHhw9GuM.js","assets/MarketingBranche-CN7Nc02Q.js","assets/Marque-BNzZDms6.js","assets/MesTaches-Cc4XUDf6.css","assets/MesTaches-rdng5ne0.js","assets/momo-B-QSeWY6.js","assets/MonMois-BwlJTCvt.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/objectifs-j6PY7U2N.js","assets/paliers-VjoqC4YF.js","assets/Parametres-aIH3pG1i.js","assets/parcours-BwF0NXip.js","assets/Parrainages-gAHAPB_6.css","assets/Parrainages-ZAG_GSJU.js","assets/pdf-DOJgX7vX.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/Personas-aEu4hT_V.js","assets/Personnel-IPTGP0gh.js","assets/photo-xUW7pRWK.js","assets/pilotage-D8kf1Co8.css","assets/Predictions-B3Tm8zAv.js","assets/Prestataires-CnU1WBqK.js","assets/prestataires-JkB3dN4v.js","assets/Prets-BJx9fYiQ.js","assets/prevision-du-mois-pur-D6sJa5lw.js","assets/Previsions-CL1hq-9J.js","assets/Previsions-D-0__Buz.css","assets/previsions-pur-CK6irR9z.js","assets/processus-pur-BLN25j-E.js","assets/Projets-COO7WDEE.css","assets/Projets-CZTnO9mb.js","assets/projets-laUWFTFs.js","assets/projets-pur-2ZEMRNDU.js","assets/protocoles-LV38Zlvi.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-Bb4Xyfsj.js","assets/qualification-CM90zNme.js","assets/quiz-5qMPWZVi.js","assets/Rapport-BDfrqlbD.js","assets/RattacherUneCarte-DrtAlDpv.js","assets/Recommandations-znAwKqWD.js","assets/regler-B4gKBR4c.js","assets/regler-C5hcM02_.css","assets/regler-la-seance-serveur-Bs6rzqZX.js","assets/relances-pur-CTGdiNru.js","assets/releve-des-avis-D4v3jQfn.js","assets/SalonFoyer-DvDBg_PV.js","assets/secretariat-admin-CEn0ncwI.js","assets/Secretariat-Cy79Zw30.css","assets/Secretariat-CytO8Nen.js","assets/Signatures-D5Mk2AKi.js","assets/SignerUnPdf-CjQ7JfNZ.js","assets/Synthese-C8zZGPB6.js","assets/SyntheseGraphes-DSKUHTUe.js","assets/systeme-TPy-pF7j.css","assets/Tableau-HYR2nDbw.js","assets/temps-B7syoacT.js","assets/Textes-DLpOzRbT.css","assets/Textes-y3dbRywW.js","assets/tiroirs-C_lh5UKu.js","assets/trace-du-moyen-pur-Bx8-suHn.js","assets/trone-9siIy66m.css","assets/trone-BD1-w8nd.js","assets/ui-BMw4rz2Y.js","assets/useAudiences-B4MBIuRF.js","assets/vente-C7YWXkHo.css","assets/Vitrine-BKjjWYkJ.js","assets/Vitrine-BWilTqQJ.css","assets/_admin-BxWxDf2H.js","assets/_contrat-Dd7Zbe6i.js","assets/_heures-BD04R2Jc.js","assets/_reuni-0-N1B_H0.js","assets/_shared-dhln5tZP.js","assets/_signature-58CSNbHO.js","assets/_ui-B9dm-5--.js","assets/_ui-BWMA-PlM.css"];
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
