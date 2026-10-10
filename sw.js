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
const BUILD = "20261010225215";
const A_GARDER = ["./","assets/Abonnements-CfMvnt1Q.js","assets/abonnements-fUhhUfSJ.js","assets/Academie-nDjDy_pd.js","assets/Acces-B2KPcPBY.js","assets/actions-C29xlqOo.js","assets/afaire-B28-MLqI.js","assets/AFaire-xPaXHmo-.js","assets/Analytics-BebMx7o5.js","assets/Appels-BUfa0N6y.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/bilan-B-bfPYR0.css","assets/bilan-CUdt9drv.js","assets/BilanMensuel-Dtd9R5mr.js","assets/bourse-DQmniUTd.js","assets/Branches-DEbInj01.js","assets/bridges-C3Jwod09.js","assets/Caisse-DDIMdwdB.js","assets/caisse-du-soir-KvpJoCFT.js","assets/Caisses-DVQanMOj.js","assets/Calendrier-B7iDdT2K.js","assets/Carnet-BkuLWjS1.js","assets/carte-CWP9hdws.js","assets/carte-WI2qP1su.css","assets/CarteModal-Blj2Sc2f.js","assets/CartesCadeaux-C3Pfm7jB.js","assets/Catalogue-BxFcVmeI.js","assets/Cercle-B6FqyrOd.js","assets/certificat-DVSxho5e.css","assets/certificat-Wnd0B3rt.js","assets/certificats-coffre-DVohEA1E.js","assets/ClotureDuTiroir-BB8WB5lS.js","assets/ClotureDuTiroir-C6vPx-E_.css","assets/Coffre-BCQluKMG.js","assets/components-DieWnt1f.js","assets/compte-courant-ByzulCEN.js","assets/compte-DpbyoX0y.js","assets/CompteCourant-NDDyP1f-.js","assets/Comptes-qchongtk.js","assets/Comptoir-BqUNt9q4.js","assets/consultation-Bv8llDpR.js","assets/consultation-CCTm16qX.css","assets/Consultations-BuOH4svB.js","assets/consultNotes-BPrv3jQy.js","assets/Conversations-BDkQA--K.js","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-B1CIPnfH.js","assets/currency-CzN07T4P.js","assets/Customers-DeJzdygK.js","assets/Dashboard-BxfFtHZX.js","assets/dates-BOuRF8ZB.js","assets/Demandes-CtlYNDTS.js","assets/Depenses-DZwdGmsL.js","assets/devise-fon-DX3P0bG4.woff2","assets/encaissement-pur-CE9ENgnx.js","assets/Encaissements-DMZ5OO27.js","assets/enfants-COpbBKyB.js","assets/Engagements-CIMd-zt4.js","assets/Engagements-Cj5S9MhG.css","assets/equipe-DpPyq6h-.css","assets/Evaluation-BMVmkDMH.js","assets/FacturePrestataire-Ce8pamS9.js","assets/Factures-CoQHjaDO.js","assets/Fil-Bt0GmHpB.js","assets/finances-CCjqAkCE.css","assets/Fournisseurs-BUkyZ901.js","assets/fournisseurs-B_03BNSo.js","assets/foyer-DneIQ1Tq.js","assets/HomeRituals-mibOWJzG.js","assets/html2canvas.esm-QH1iLAAe.js","assets/identite-C1TQMuAp.js","assets/index-CJPrO2Ls.js","assets/index.es-Ckd7Yj9W.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-s5WQRuA6.js","assets/jspdf.es.min-CrPupl6G.js","assets/JustePrix-DgSXvohy.js","assets/kkiapay-atr6QegV.js","assets/Laboratoire-BhsSIo0o.js","assets/laboratoire-DSsyOBA0.js","assets/LettresAuDossier-CrfTohDS.js","assets/maisons-DZdAeMF9.js","assets/Marketing-BXVs7EEC.js","assets/Marque-DU8ygUIM.js","assets/momo-C2ZVfV9J.js","assets/MonMois-BLK1jOKK.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-CkDjxX2j.js","assets/paliers-CKXuP1sI.js","assets/Parametres-fCfHWjYV.js","assets/parcours-nXkQWuHC.js","assets/Parrainages-DLJJY6OA.js","assets/Parrainages-gAHAPB_6.css","assets/pdf-CNiuAjv0.js","assets/Personas-BNuV-d4u.js","assets/Personnel-DlcK3Adh.js","assets/photo-BhH6nuJU.js","assets/pilotage-DYbuDdJQ.css","assets/Predictions-B7ADqyob.js","assets/prestataires-BDjjn5vw.js","assets/Prestataires-BPM4201c.js","assets/Prets-DC31oVZW.js","assets/promos-kZdgpBRo.js","assets/protocoles-KJF0Haxm.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-DNs-5iM0.js","assets/quiz-5qMPWZVi.js","assets/Rapport-CyUyTdD7.js","assets/RattacherUneCarte-DWY0DH3F.js","assets/Recommandations-CTfNFr0e.js","assets/SalonFoyer-Bzz1i3HK.js","assets/Secretariat-CI4qh9Fz.js","assets/Synthese-DcY0pTIU.js","assets/systeme-C3XFIa8E.css","assets/Tableau-H53hBh60.js","assets/Textes-DLpOzRbT.css","assets/Textes-MNPEADg1.js","assets/tiroirs-Db9YmEI0.js","assets/trone-Cn5sXo2w.css","assets/trone-nROpE-MC.js","assets/ui-CsQGFSrd.js","assets/vente-D0kdELDn.css","assets/Vitrine-CNLdM8ub.js","assets/_contrat-CmJLFNmt.js","assets/_heures-DC2-naAY.js","assets/_shared-C7pu-BoL.js","assets/_signature-t9WJhrCi.js"];
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
