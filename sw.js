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
const BUILD = "20261018084616";
const A_GARDER = ["./","assets/Abonnements-C3BzMTkJ.js","assets/abonnements-Dioo_tOQ.js","assets/Academie-A8kl4CsG.js","assets/Acces-B-dkYjy1.js","assets/actions-C75CdOAq.js","assets/AFaire-BGJ-IJBQ.js","assets/afaire-D2D75Ppj.js","assets/Analytics-CGCCq5Zt.js","assets/Appels-wl3ffpyU.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/AtelierDesContenus-CCgfgg2T.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/Aujourdhui-CrS-mZ-E.js","assets/bilan-B-bfPYR0.css","assets/bilan-knrYkQMS.js","assets/BilanMensuel-CBpCEtHA.js","assets/Branches-B06oko1f.js","assets/bridges-DB8DSNMu.js","assets/Caisse-BAhuuXgX.js","assets/caisse-du-soir-BhlxvvLJ.js","assets/Caisses-DOVBYYdR.js","assets/Calendrier-DRITCcnJ.js","assets/Carnet-D4EcFzCX.js","assets/carte-qzjJq7RV.js","assets/carte-WI2qP1su.css","assets/CarteModal-CLuAmOHI.js","assets/CartesCadeaux-BpOkuj2d.js","assets/Catalogue-ldKWtlDU.js","assets/CentreDeCommande-DHIsXt-T.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-DgVJK2Gt.js","assets/certificat-CtsyOxnm.js","assets/certificat-DVSxho5e.css","assets/certificats-coffre-9GLEZKYY.js","assets/ChiffreDesPrestations-mzudsgTw.js","assets/ClotureDuTiroir-BJf0LPI9.js","assets/ClotureDuTiroir-C6vPx-E_.css","assets/Coffre-A8AP-mQi.js","assets/components-Cb_JG5Zg.js","assets/compte-BETaNwKN.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-DwEjAGVX.js","assets/Comptes-B35dDzNZ.js","assets/Comptoir-C1ke0DpT.js","assets/consultation--UNNo96Y.js","assets/consultation-CCTm16qX.css","assets/Consultations-CKZ7vM_n.js","assets/consultNotes-DZY1684p.js","assets/Conversations-gieot7yq.js","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-COBiLIl3.js","assets/currency-qfIhGmrs.js","assets/Customers-GMHJQM_B.js","assets/Dashboard-C-gwveRh.js","assets/dates-DLmbU-LO.js","assets/Demandes-BWC3m6Mv.js","assets/Depenses-MYId_pl6.js","assets/devise-fon-DX3P0bG4.woff2","assets/encaissement-pur-DW734-xK.js","assets/Encaissements-BMN2Trtx.js","assets/enfants-C5I7IYnZ.js","assets/Engagements-5ThhemBP.js","assets/Engagements-Cj5S9MhG.css","assets/EntreDeuxSeances-DEri-wPS.js","assets/equipe-DpPyq6h-.css","assets/Evaluation-B3RbhuGl.js","assets/FacturePrestataire-BXlmNynP.js","assets/Factures-BkkDj2t3.js","assets/Fil-DFA32DiP.js","assets/finances-CCjqAkCE.css","assets/fournisseurs-CkN080l5.js","assets/Fournisseurs-DJ4brI6O.js","assets/foyer-C0e_4tt9.js","assets/HomeRituals-DTk9xEZt.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-BJWdjodc.js","assets/identite-DiSBK-AI.js","assets/index-DtKXtQbl.js","assets/index.es-BwRppyeh.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-CeeUtfeK.js","assets/jspdf.es.min-DD5WAeVf.js","assets/JustePrix-DenJOUnX.js","assets/kkiapay-BEWxhgKR.js","assets/Laboratoire-ChyR3vw0.js","assets/laboratoire-DL2h-v4D.js","assets/LettresAuDossier-BVRsx8EV.js","assets/maisons-CSSFrqZy.js","assets/Marketing-BdMc68A5.js","assets/Marque-C2wjJg8K.js","assets/momo-C2ZVfV9J.js","assets/MonMois-CDrJkZRh.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-zY6UtIjN.js","assets/paliers-C0qLoO6p.js","assets/Parametres-n7lBNVFb.js","assets/parcours-CoBq2GhV.js","assets/Parrainages-Ct2X3tlD.js","assets/Parrainages-gAHAPB_6.css","assets/pdf-BipTX5aj.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/Personas-TaLe5ZMW.js","assets/Personnel-DRXEIHk0.js","assets/photo-BORPbK2z.js","assets/pilotage-Bn1gP_oo.css","assets/Predictions-B6T8GjqL.js","assets/prestataires-aRJ0kdGL.js","assets/Prestataires-BPAuYATz.js","assets/Prets-Cs1Po0m-.js","assets/promos-BMzbJ6Iu.js","assets/protocoles-5d8o0g3I.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-CKl7AA_l.js","assets/quiz-5qMPWZVi.js","assets/Rapport-DUr9OREN.js","assets/RattacherUneCarte-C2Xf2em7.js","assets/Recommandations--8_af09V.js","assets/SalonFoyer-BBqaEAqQ.js","assets/secretariat-admin-CMO_Okxf.js","assets/Secretariat-BOH2WqI4.js","assets/Signatures-Bc45GdAW.js","assets/SignerUnPdf-CfRWcxZV.js","assets/Synthese-CYUN_dFI.js","assets/systeme-C3XFIa8E.css","assets/Tableau-BowElEEq.js","assets/Textes-DLpOzRbT.css","assets/Textes-Wq9C0-92.js","assets/tiroirs-D0hDMASB.js","assets/trone-CyFdPxg0.css","assets/trone-KlaN_oAB.js","assets/ui-DaZtqBQH.js","assets/vente-DMe4r4ed.css","assets/Vitrine-Dqt1wDrG.js","assets/_admin-CflODRJJ.js","assets/_contrat-iq6QEgSm.js","assets/_heures-D5ve__2n.js","assets/_reuni-Cun6Upeb.js","assets/_shared-BrdePOWW.js","assets/_signature-B0YxN0va.js","assets/_ui-BWMA-PlM.css","assets/_ui-xG4QGJCk.js"];
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
