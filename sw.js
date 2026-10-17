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
const BUILD = "20261017220941";
const A_GARDER = ["./","assets/Abonnements-aaf2uB9p.js","assets/abonnements-DL82ycQj.js","assets/Academie-DVAzWQt3.js","assets/Acces-BthU8UTt.js","assets/actions-B1k1qCIu.js","assets/afaire-CY_3whs4.js","assets/AFaire-DNcVUoXm.js","assets/Analytics-BRaHo8sd.js","assets/Appels-Dm2B6FJt.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/AtelierDesContenus-Ber6ltL_.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/Aujourdhui-byUHWyQw.js","assets/bilan-B-bfPYR0.css","assets/bilan-XMs9qMUi.js","assets/BilanMensuel-BCXQaTGl.js","assets/Branches-DJhx5q8u.js","assets/bridges-CpgRJsEN.js","assets/Caisse-CqONdoft.js","assets/caisse-du-soir-BJf9p6DS.js","assets/Caisses-DJIdx_by.js","assets/Calendrier-CZrEatlx.js","assets/Carnet-qsIrwmTB.js","assets/carte-DptZLnwF.js","assets/carte-WI2qP1su.css","assets/CarteModal-BrK9qqMw.js","assets/CartesCadeaux-C6cM9n9H.js","assets/Catalogue-D9T_01jp.js","assets/CentreDeCommande-CtWgFmE8.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-CCV9SR3f.js","assets/certificat-C085wsJL.js","assets/certificat-DVSxho5e.css","assets/certificats-coffre-C50Mh6cE.js","assets/ChiffreDesPrestations-CbjSiTIE.js","assets/ClotureDuTiroir-C6vPx-E_.css","assets/ClotureDuTiroir-Cn1MhHSK.js","assets/Coffre-B8Wb3unF.js","assets/components-Bmr1WOBA.js","assets/compte-courant-ByzulCEN.js","assets/compte-DGFypqJz.js","assets/CompteCourant-URc70o5q.js","assets/Comptes-ByHI1fRw.js","assets/Comptoir-3vh9ewCj.js","assets/consultation-37LX_0kb.js","assets/consultation-CCTm16qX.css","assets/Consultations-Ctc-Y-3h.js","assets/consultNotes-QIvBBxxu.js","assets/Conversations-kK8MBPKL.js","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-Dx2m73hA.js","assets/currency-qfIhGmrs.js","assets/Customers-DFdNV3Bd.js","assets/Dashboard-AcLRcLWx.js","assets/dates-D74bEiGj.js","assets/Demandes-BsWzgh2F.js","assets/Depenses-DBvHLwNS.js","assets/devise-fon-DX3P0bG4.woff2","assets/encaissement-pur-sONIv1Lq.js","assets/Encaissements-Cdth1Oyh.js","assets/enfants-Dqocl8J4.js","assets/Engagements-Cj5S9MhG.css","assets/Engagements-DdEBzo9D.js","assets/EntreDeuxSeances-CVGPUzvu.js","assets/equipe-DpPyq6h-.css","assets/Evaluation-D7NkmIXP.js","assets/FacturePrestataire-Ct_bXSl_.js","assets/Factures-BRzD6ag7.js","assets/Fil-B8o6YgIL.js","assets/finances-CCjqAkCE.css","assets/Fournisseurs-CEjU4I4k.js","assets/fournisseurs-i8_C7MkJ.js","assets/foyer-D9iZ52UY.js","assets/HomeRituals-BOHsI3Oz.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-DXfs425h.js","assets/identite-rsVL0Mha.js","assets/index-aZVowN10.js","assets/index.es-CRCnOJtA.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-yelNLnGG.js","assets/jspdf.es.min-DpAG1Jtn.js","assets/JustePrix-CwX4uQk-.js","assets/kkiapay-DOuRxJtl.js","assets/laboratoire-C1kPAaLf.js","assets/Laboratoire-YyiDWRu2.js","assets/LettresAuDossier-CyU6urgV.js","assets/maisons-CSSFrqZy.js","assets/Marketing-CUKH1YXk.js","assets/Marque-BQBqXVEF.js","assets/momo-C2ZVfV9J.js","assets/MonMois-Czs2bO4E.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-D81coh13.js","assets/paliers-BTXDK7nf.js","assets/Parametres-DkkMfISf.js","assets/parcours-f30HgBXK.js","assets/Parrainages-BhSOmvkc.js","assets/Parrainages-gAHAPB_6.css","assets/pdf-DD2-Q5y4.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/Personas-CA9ozlAf.js","assets/Personnel-YPMGNniH.js","assets/photo-nc2quxNm.js","assets/pilotage-Bn1gP_oo.css","assets/Predictions-COkrGpyy.js","assets/Prestataires-BcpjLT-F.js","assets/prestataires-BnYUfYlN.js","assets/Prets-K5oaaZDl.js","assets/promos-BMGoCRkh.js","assets/protocoles-CivxNqAr.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-CHpRJ5ZZ.js","assets/quiz-5qMPWZVi.js","assets/Rapport-BuHM2E8C.js","assets/RattacherUneCarte-DbFLvzCf.js","assets/Recommandations-ClLsTFqy.js","assets/SalonFoyer-CDBS1VIY.js","assets/secretariat-admin-iIk7uGeE.js","assets/Secretariat-k35abt2z.js","assets/Signatures-DsCdSpKE.js","assets/SignerUnPdf-BMlbajue.js","assets/Synthese-D3YzY81q.js","assets/systeme-C3XFIa8E.css","assets/Tableau-eLFok7Ay.js","assets/Textes-CAJlSf7z.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-C-HOyzdL.js","assets/trone-CcfaCxkU.js","assets/trone-CyFdPxg0.css","assets/ui-CD6O7YWG.js","assets/vente-DMe4r4ed.css","assets/Vitrine-CanbnTe-.js","assets/_admin-DoKr5BNl.js","assets/_contrat-CE5WlFZp.js","assets/_heures-Bs-BCrxo.js","assets/_reuni-CIJyUHt0.js","assets/_shared-BAYpR8vu.js","assets/_signature-InhGCkFc.js","assets/_ui-BSqt6E7p.js","assets/_ui-BWMA-PlM.css"];
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
