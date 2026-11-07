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
const BUILD = "20261107080847";
const A_GARDER = ["./","assets/abonnements-CNvASV2s.js","assets/Abonnements-CVD-wMyN.js","assets/Abonnements-DTY7p2DH.css","assets/Academie-pJ9yOXMT.js","assets/Acces-96gKTIzh.js","assets/AFaire-5GGqF96a.js","assets/afaire-Dge9NdFU.js","assets/agents-donnees-Cik6M2nc.js","assets/Agents-DQobtC_I.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-DsdGARzW.js","assets/Appels-CNb7pe1J.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/Assistants-CQ8JNUan.js","assets/Assistants-D9i2Xwmg.css","assets/AtelierDesContenus-BIfexZpb.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/Audience-B8OpdvRu.js","assets/Aujourdhui-RtZa6bSk.js","assets/avant-le-fauteuil-lecture-Bz2mtdNq.js","assets/AvantLeFauteuil-DmZT1D5l.js","assets/avis-fiches-BkXD8Rb0.js","assets/AvisGoogle-DaPXfwX9.css","assets/AvisGoogle-UJGjaql2.js","assets/bilan-B-bfPYR0.css","assets/bilan-kZU5EP0q.js","assets/BilanMensuel-ByFDXbFs.js","assets/Branches-tTrdSlRi.js","assets/bridges-F0DcGBs5.js","assets/Caisse-B_9_6N3L.js","assets/caisse-du-soir-B9bRftMv.js","assets/caisse-du-soir-C6vPx-E_.css","assets/Caisses-zGzBAlRq.js","assets/Calendrier-DPARRPo8.js","assets/campagnes-pur-DS4z9ile.js","assets/Carnet-BlM7LDl7.js","assets/carte-BmM52TiB.js","assets/carte-_W_-xBPj.css","assets/CarteModal-DXjAD03A.js","assets/CartesCadeaux-B1_8rgIr.js","assets/Catalogue-CB0GP00U.js","assets/CentreDeCommande-Du8kyJhp.css","assets/CentreDeCommande-yHdzEGiy.js","assets/Cercle-DDNdW1B2.js","assets/certificat-Bn1ZeXin.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-DRlIn_4W.js","assets/chiffre-du-jour-pur-BU5AcLqj.js","assets/ChiffreDesPrestations-S7CwXz5Y.js","assets/client-DwzSVyPM.js","assets/cloture-du-jour-Cl22j-zj.js","assets/ClotureDuTiroir-DE7Kfw0Z.js","assets/Coffre-DkqXMOA5.js","assets/components-CR89cB01.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-hQPc2kN7.js","assets/Comptes-2QCTXI_h.js","assets/consultation-B3N7wWhE.js","assets/consultation-CRW6QcWf.css","assets/Consultations-knZDD3nT.js","assets/consultNotes-1c52YUBi.js","assets/Conversations-B5ewsZSO.js","assets/Conversations-D4WwB5Zo.css","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-CmVvItUj.js","assets/currency-qfIhGmrs.js","assets/Customers-C1KxW5bR.js","assets/Dashboard-1MV41hEe.js","assets/Dashboard-B2x7VsE_.css","assets/dates-QXVHJHzA.js","assets/Demandes-Co1qX8wF.js","assets/DepenseEnUnePhrase-B1SkR4FQ.js","assets/DepenseEnUnePhrase-BIGRlGqP.css","assets/Depenses-C07In4tv.js","assets/depenses-saisie-smqnGjGO.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-BNQzhkht.js","assets/diagnostics-au-trone-CpIEOGHM.js","assets/Dictee-D2P9yM7v.css","assets/Dictee-pL3jKWgE.js","assets/dictee-pur-D3IVdc7y.js","assets/Discussions-DGbZ5oUD.js","assets/EditeurDesOffres-BOcRM2nQ.js","assets/Encaissements-C4MpKFNH.js","assets/enfants-C5GpLmey.js","assets/Engagements-Cj5S9MhG.css","assets/engagements-coffre-CP7pHbVn.js","assets/Engagements-DGkDtGUi.js","assets/EntreDeuxSeances-x1MoRWDd.js","assets/Evaluation-BnhXraSw.js","assets/Factures-fYprfk2q.js","assets/FenetreDesCivilites-88AsMtUN.js","assets/FenetreDesCivilites-zfNk1aak.css","assets/FenetreDuPoint-CVdjSUqV.js","assets/Fil-CPIPdvVe.js","assets/finances-BMFnlkRx.css","assets/fon-CQFrJP8z.js","assets/fournisseurs-BilWlPCq.js","assets/Fournisseurs-CErjydfa.js","assets/foyer-bmj0fVNz.js","assets/Gerard-Cgj-zsJh.css","assets/Gerard-D2RgDMVG.js","assets/gerard-donnees-BQ7yBGKv.js","assets/gestes-conversation-hRLH8eJl.js","assets/HomeRituals-DT0erGNA.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-D2u4gG6P.js","assets/ia-centre-DDWXwGr6.js","assets/ia-diagnostic-pur-BBLrGY5l.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-tableau-pur-CSRjGtTf.js","assets/identite--pZ_Tb4m.js","assets/index-BR0kxxrd.js","assets/index.es-DhgBmzM7.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-BOtJz1E-.js","assets/jspdf.es.min-CVmE6KX6.js","assets/JustePrix-C9kQILdv.js","assets/kkiapay-RoKy60Z0.js","assets/kkiapay-widget-DnUhUNd4.js","assets/Laboratoire-D_CZVuSh.js","assets/LaJournee-Bn_G0HCt.css","assets/LaJournee-CTGGm1aB.js","assets/LesPaiements-BvdfOCbQ.css","assets/LesPaiements-CBWLU1sS.js","assets/LettresAuDossier-C66C1KS_.js","assets/LienMndPay-Byu1Q2V0.js","assets/Marketing-1UgGEZiH.js","assets/MarketingBranche-B7QgWrz7.js","assets/Marque-smrX3xbP.js","assets/MesPourboires-C1hV2iLu.js","assets/MesPourboires-D9I_9rZf.css","assets/MesTaches-Cc4XUDf6.css","assets/MesTaches-CNAslSv_.js","assets/momo-C2ZVfV9J.js","assets/MonMois-D4Gd5Q80.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/objectifs-iZT89NxQ.js","assets/opale-B3rxrIT5.js","assets/oreille-B1AMUmZh.js","assets/paie-du-5-BmFi5Bx7.js","assets/paie-du-5-DeJq-K_U.css","assets/paie-du-5-pur-B7HMlmcl.js","assets/PaieParMtn-CcAoZMYK.js","assets/paliers-BPWR3cFr.js","assets/Parametres-BoaZn7fa.js","assets/parcours-CE6C15kL.js","assets/Parrainages-BZ39TzlH.js","assets/Parrainages-gAHAPB_6.css","assets/PassageAvantLeFauteuil-DwD_KD2I.js","assets/pdf-B5nO1O_6.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/Personas-B-BjsFhP.js","assets/Personnel-hl7_0AZf.js","assets/photo-KOsRPgzx.js","assets/pilotage-D8kf1Co8.css","assets/Pourboires-B17PpKjw.js","assets/Predictions-gWzZk1_G.js","assets/Prestataires-CDqUFtmR.js","assets/Prets-CP9EEIRk.js","assets/PrevisionDuMois-CQUU2rtC.js","assets/PrevisionDuMois-DlFTw3OX.css","assets/Previsions-DhW5EVOV.js","assets/previsions-pur-CxjwENvH.js","assets/Previsions-r4v19Anp.css","assets/processus-pur-R6U5QcCi.js","assets/projets-BOM6Ss3w.js","assets/Projets-COO7WDEE.css","assets/Projets-DuCTujtG.js","assets/projets-pur-2ZEMRNDU.js","assets/protocoles-DYNaHnfk.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-x01OzFZ2.js","assets/qualification-kMzK3ddE.js","assets/quiz-5qMPWZVi.js","assets/Rapport-D-rP3Yx5.js","assets/Recommandations-DzOdAlJ2.js","assets/regler-C5hcM02_.css","assets/regler-la-seance-serveur-Bs6rzqZX.js","assets/regler-mvihtVsx.js","assets/relances-pur-lwRTXc5E.js","assets/releve-des-avis-B96Rj_Ji.js","assets/SalonFoyer-B3D4yQfc.js","assets/secretariat-admin-DhG-P6KY.js","assets/Secretariat-B9fih1C0.js","assets/Secretariat-Cy79Zw30.css","assets/Signatures-pDru_RMR.js","assets/SignerUnPdf-DUVkLkP3.js","assets/Synthese-uDpAa6uQ.js","assets/SyntheseGraphes-BwQbHC-t.js","assets/systeme-TPy-pF7j.css","assets/Tableau-Cxg5bXGz.js","assets/temps-Dwjv8xY0.js","assets/Textes-DLpOzRbT.css","assets/Textes-DONYbTFZ.js","assets/tiroirs-BmDTWHeL.js","assets/tiroirs-CkDzpGy0.css","assets/trone-C2_4PYZ1.js","assets/trone-DpJvYqTT.css","assets/useAudiences-CLzRqxgV.js","assets/useClotureDuJour-BMxFsKty.js","assets/Vitrine-BWilTqQJ.css","assets/Vitrine-DIWL__BM.js","assets/_admin-D8brdxCt.js","assets/_contrat-CpiCsqU4.js","assets/_heures-kx8JmAKH.js","assets/_reuni-B2MuZ4EH.js","assets/_shared-DlNsgaSA.js","assets/_signature-UrNLhOeD.js","assets/_ui-BrUDlmuM.css","assets/_ui-BXjUdXRU.js"];
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
