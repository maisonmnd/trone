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
const BUILD = "20261112100018";
const A_GARDER = ["./","assets/abonnements-Bnl-pXuX.js","assets/Abonnements-D2jh4JHX.js","assets/Abonnements-DTY7p2DH.css","assets/Academie-D_Y-6nmN.js","assets/Acces-BYmlPsXN.js","assets/afaire-CilRabpw.js","assets/AFaire-Dvum3BYX.js","assets/Agents-CzBGnSPt.js","assets/agents-donnees-Cp3J4I7l.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-Bhkx_zZ8.js","assets/Appels-B4SKLSBg.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/Assistants-C2hcWyo2.js","assets/Assistants-D9i2Xwmg.css","assets/AtelierDesContenus-anPe81-m.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/Audience-BhMzWkvV.js","assets/Aujourdhui-BNrHmxxT.js","assets/avant-le-fauteuil-lecture-nxXX3SUh.js","assets/AvantLeFauteuil-BWLByi8a.js","assets/avis-fiches-Dim5zziN.js","assets/AvisGoogle-DaPXfwX9.css","assets/AvisGoogle-DWB8wjO4.js","assets/BadgeEssai-BC83-VIO.js","assets/bilan-B-bfPYR0.css","assets/bilan-BZ9eeWvF.js","assets/BilanMensuel-DM52yw2k.js","assets/Branches-BET6imy9.js","assets/bridges-jgkA765j.js","assets/Caisse-CGsE0QIU.js","assets/caisse-du-soir-B2aY__-P.js","assets/caisse-du-soir-C6vPx-E_.css","assets/Caisses-BLEpwlys.js","assets/Calendrier-C8a9gW2E.js","assets/campagnes-pur-jtAKaHl5.js","assets/Carnet-BOwh_Lmq.js","assets/carte-Dr5_-9-t.js","assets/carte-_W_-xBPj.css","assets/CarteModal-Ds_Jg2x5.js","assets/CartesCadeaux-CBPHuitB.js","assets/Catalogue-s-rvuFgi.js","assets/CentreDeCommande-BpkzY70b.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-ChbRNz99.js","assets/certificat-B67ak1l8.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-D4vql5bk.js","assets/chiffre-du-jour-pur-97egGR66.js","assets/ChiffreDesPrestations-CFzY_HZm.js","assets/client-Bxg4c6ZK.js","assets/cloture-du-jour-BmUXcMFj.js","assets/ClotureDuTiroir-BFjq7KYx.js","assets/Coffre-CbwgcnGf.js","assets/collecte-mtn-pur-DW4nw7-V.js","assets/components-BCAuXpeS.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-Bj4FcsaW.js","assets/Comptes-qxQQe0ij.js","assets/consultation-CIp02F5x.js","assets/consultation-CRW6QcWf.css","assets/Consultations-BkjS7Ws_.js","assets/consultNotes-BJYIhGWR.js","assets/Conversations-D4WwB5Zo.css","assets/Conversations-DGtC21Q1.js","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-Qq-0LG5V.js","assets/currency-qfIhGmrs.js","assets/Customers-DwuyRjGz.js","assets/Dashboard-B2x7VsE_.css","assets/Dashboard-DeJNUomb.js","assets/dates-DsIrKjug.js","assets/Demandes-CKKX7hJI.js","assets/DepenseEnUnePhrase-BIGRlGqP.css","assets/DepenseEnUnePhrase-rWVoBbX7.js","assets/Depenses-BM15T2Vu.js","assets/depenses-saisie-D1q_fgiB.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-jyLwTQ7y.js","assets/diagnostics-au-trone-CkW1jtQb.js","assets/Dictee-D2P9yM7v.css","assets/Dictee-DvCgQcKV.js","assets/dictee-pur-D-WzjDyD.js","assets/Discussions-D-ASE8Zh.js","assets/EditeurDesOffres-XEKPaOJM.js","assets/Encaissements-BrsNfE9j.js","assets/enfants-CtYAH1KF.js","assets/Engagements-Cj5S9MhG.css","assets/Engagements-CmVNfM0v.js","assets/engagements-coffre-Bo9NDAbR.js","assets/EntreDeuxSeances-D74pTXpj.js","assets/Evaluation-CdQV8Ux-.js","assets/facture-WwFmh_7F.js","assets/Factures-fqUbl9GL.js","assets/FenetreDesCivilites-B6mgWp8E.js","assets/FenetreDesCivilites-zfNk1aak.css","assets/FenetreDuPoint-NGjHOqFZ.js","assets/Fil-D2JIckaS.js","assets/finances-Ds4kOIUN.css","assets/fon-BB79GJQA.js","assets/fournisseurs-D6Z4r8nE.js","assets/Fournisseurs-Dq_uSPjR.js","assets/foyer-Dz8LV6jp.js","assets/Gerard-9DRQJwKG.js","assets/Gerard-Cgj-zsJh.css","assets/gerard-donnees-CtaY41Pm.js","assets/gestes-conversation-3jNg7xli.js","assets/heures-des-rappels-pur-Dig9pZpo.js","assets/HomeRituals-D3Q1rxGe.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-B6l34Zos.js","assets/ia-centre-DcbUe4OX.js","assets/ia-diagnostic-pur-BBLrGY5l.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-tableau-pur-p6UvREJe.js","assets/identite-BRkQ2H4Y.js","assets/index-DNZgNJ8N.js","assets/index.es-ya3uUpvs.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-hrtm5CLN.js","assets/jspdf.es.min-OTVhIx1-.js","assets/JustePrix-CIOekUyB.js","assets/kkiapay-MSb5T-Ka.js","assets/kkiapay-widget-DnUhUNd4.js","assets/Laboratoire-x2zOI2I0.js","assets/LaJournee-Bn_G0HCt.css","assets/LaJournee-CriSa6s2.js","assets/LesPaiements-C9cEZlne.css","assets/LesPaiements-Cp8I-W9q.js","assets/LettresAuDossier-CZtbE3QV.js","assets/LienMndPay-7Ja2kd6M.js","assets/Marketing-BsNLt0Ab.js","assets/MarketingBranche-BWZGc9yK.js","assets/Marque-CIaZUunk.js","assets/MesPourboires-CENjelyb.css","assets/MesPourboires-CikMog-V.js","assets/MesTaches-Cc4XUDf6.css","assets/MesTaches-DyRXFU8P.js","assets/momo-C2ZVfV9J.js","assets/MonMois-DmzuLLrj.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/MtnMoMo-DzDyJ-dE.js","assets/objectifs-4AW3Mqqj.js","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/opale-D1Z8JhKH.js","assets/oreille-B1AMUmZh.js","assets/paie-du-5-CtyD9uDb.js","assets/paie-du-5-DeJq-K_U.css","assets/paie-du-5-pur-CPiCK8fv.js","assets/paie-par-mtn-CsoYOhQ7.js","assets/PaieParMtn-CZULrBRH.js","assets/paliers-B4ZRZiLb.js","assets/Parametres-D9-dbdNm.js","assets/parcours-BAF9urfB.js","assets/Parrainages-gAHAPB_6.css","assets/Parrainages-IMXxsfic.js","assets/PassageAvantLeFauteuil-DHRxM2OK.js","assets/pdf-Cb2tz8lD.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/periode-des-pourboires-pur-BUWqfwov.js","assets/Personas-DVvpMrim.js","assets/Personnel-By98l-Ij.js","assets/photo-DjuXQdB9.js","assets/pilotage-D8kf1Co8.css","assets/Pourboires-Bf5foecp.js","assets/Predictions-DBQ3v8EY.js","assets/Prestataires-kjg-sokG.js","assets/Prets-CA9ue8tb.js","assets/PrevisionDuMois-DlFTw3OX.css","assets/PrevisionDuMois-DN96-AKp.js","assets/Previsions-9BU2Vg1T.css","assets/Previsions-BJy9Uni-.js","assets/previsions-pur-Dhp79wf4.js","assets/processus-pur-R6U5QcCi.js","assets/projets-BOzacV8A.js","assets/Projets-CCfS0xLj.js","assets/Projets-COO7WDEE.css","assets/projets-pur-2ZEMRNDU.js","assets/protocoles-1rUncv6A.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-BBe_k_4V.js","assets/qualification-FuvIX4tc.js","assets/quiz-5qMPWZVi.js","assets/Rapport-jJfEJUDR.js","assets/Recommandations-fj4wWav0.js","assets/regler-BPBHSnNq.js","assets/regler-DHR_B1Dm.css","assets/relances-pur-BacTXlI2.js","assets/releve-des-avis-Ce0KLKNC.js","assets/SalonFoyer-CNyo9lHl.js","assets/secretariat-admin-hSWS_6yw.js","assets/Secretariat-CCKdbZ7Z.js","assets/Secretariat-Cy79Zw30.css","assets/Signatures-p3tT0JFS.js","assets/SignerUnPdf-BnEL7zid.js","assets/Synthese-DiLeio0V.js","assets/SyntheseGraphes-CDPc-P_h.js","assets/systeme-TPy-pF7j.css","assets/Tableau-tMXMvthX.js","assets/temps-BxFet-rt.js","assets/Textes-DlckpSqG.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-Bgw2ly2M.js","assets/tiroirs-CkDzpGy0.css","assets/trone-BU0KpZuo.js","assets/trone-CXlHCleb.css","assets/useAudiences-DXjncs_y.js","assets/useClotureDuJour-CmgStqwo.js","assets/Vitrine-BWilTqQJ.css","assets/Vitrine-CBcuJHVy.js","assets/_admin-MApo5UV4.js","assets/_contrat-BApN_hYH.js","assets/_reuni-CCkm4kg-.js","assets/_shared-CW91BJO2.js","assets/_signature-DdDOSiGK.js","assets/_ui-BrUDlmuM.css","assets/_ui-FJZQU2Ek.js"];
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
