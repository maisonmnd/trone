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
const BUILD = "20261021025821";
const A_GARDER = ["./","assets/abonnements-BEiHjrH-.js","assets/Abonnements-CmKM10ZV.js","assets/Academie-Cq0NZslf.js","assets/Acces-C00y5dYX.js","assets/actions-BWN4VsU5.js","assets/afaire-BivULpWQ.js","assets/AFaire-Db3R0v_C.js","assets/Analytics-DG0FfN_C.js","assets/Appels-ClEd-Ffl.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/AtelierDesContenus-BGgwaxCu.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/Aujourdhui-BD_mIq6u.js","assets/bilan-B-bfPYR0.css","assets/bilan-DwsjlvwG.js","assets/BilanMensuel-DnSJ4VFk.js","assets/Branches-B7BZzo93.js","assets/bridges-BgblTrY4.js","assets/Caisse-AKH2PVf1.js","assets/caisse-du-soir-BSqQWqZh.js","assets/Caisses-BVdhbiLC.js","assets/Calendrier--WbxznC-.js","assets/Carnet-xeBqVYH1.js","assets/carte-B1MIz8C1.js","assets/carte-WI2qP1su.css","assets/CarteModal-yIexJ6U-.js","assets/CartesCadeaux-D2lNXfgA.js","assets/Catalogue-DO4w7w0f.js","assets/CentreDeCommande-Du8kyJhp.css","assets/CentreDeCommande-DvbOSztH.js","assets/Cercle-BaicQtq8.js","assets/certificat-Ch7WFYzg.js","assets/certificat-DVSxho5e.css","assets/certificats-coffre-CMqI8bX0.js","assets/ChiffreDesPrestations-D0GPvoU2.js","assets/ClotureDuTiroir-C6vPx-E_.css","assets/ClotureDuTiroir-fbU2ZUyU.js","assets/Coffre-CkuQYa26.js","assets/components-CLQSUzEL.js","assets/compte-43Nqgtvm.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-R9KihH6N.js","assets/Comptes-Bbleoe94.js","assets/Comptoir-DSsNcOrA.js","assets/consultation-AT5w0j1P.js","assets/consultation-CCTm16qX.css","assets/Consultations-D85BnnQY.js","assets/consultNotes-B0sa7Yk8.js","assets/Conversations-D4WwB5Zo.css","assets/Conversations-wABg5vxS.js","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-aVuZXoxE.js","assets/currency-qfIhGmrs.js","assets/Customers-D7siPufe.js","assets/Dashboard-BKOQYmNO.js","assets/dates-9sH9Aoiz.js","assets/Demandes-BTczSkXF.js","assets/Depenses-CtJYdroN.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-MkM2ZfB9.js","assets/diagnostics-au-trone-3eT_Km4d.js","assets/Discussions-UYH5S7gM.js","assets/encaissement-pur-DE8DcA2C.js","assets/Encaissements-CCtLywPr.js","assets/enfants--xoId8z2.js","assets/Engagements-Ce3d4E76.js","assets/Engagements-Cj5S9MhG.css","assets/EntreDeuxSeances-CHRynTxy.js","assets/equipe-DABhdlQT.css","assets/Evaluation-DafywOne.js","assets/FacturePrestataire-XQyS3IyD.js","assets/Factures-SpW-WVAi.js","assets/Fil-C3ieturC.js","assets/finances-CCjqAkCE.css","assets/Fournisseurs-BY50F-Bz.js","assets/fournisseurs-wwWY7FGW.js","assets/foyer-BeD-eKk2.js","assets/gestes-conversation-CXWBqWCp.js","assets/HomeRituals-D-l0jtuf.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-DZ0tcEhV.js","assets/ia-diagnostic-pur-BulIFgZQ.js","assets/ia-recu-pur-DcucZqpR.js","assets/identite-CUrf0aoa.js","assets/index-BOlivKF9.js","assets/index.es-B5_1J4mx.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal---St9UsG.js","assets/jspdf.es.min-_XHo9D4q.js","assets/JustePrix-CiLERH1o.js","assets/kkiapay-DqoHSpvG.js","assets/laboratoire-B0dEgszX.js","assets/Laboratoire-DlrQu3vy.js","assets/LettresAuDossier-CJWL9ih8.js","assets/LienMndPay-Dxb2SR7e.js","assets/maisons-CSSFrqZy.js","assets/Marketing-jWEf6rAU.js","assets/Marque-DlJYJC2a.js","assets/momo-C2ZVfV9J.js","assets/MonMois-DQ5krPgm.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-CH_76pVB.js","assets/paliers-SWs6eMIf.js","assets/Parametres-Blk1oo5C.js","assets/parcours-hjveAOsV.js","assets/Parrainages-CtoaN16q.js","assets/Parrainages-gAHAPB_6.css","assets/pdf-DsY_Ocn-.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/Personas-BfMNBYpW.js","assets/Personnel-hXjzS56J.js","assets/photo-DS6iQAjw.js","assets/pilotage-Bn1gP_oo.css","assets/Predictions-NXmSrMAL.js","assets/Prestataires-64Bqwk9y.js","assets/prestataires-CA4c23RN.js","assets/Prets-CjkxQ2AJ.js","assets/promos-DGgDvbye.js","assets/protocoles-DNquMVcy.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-DwamCQuE.js","assets/qualification-DWe2uaeK.js","assets/quiz-5qMPWZVi.js","assets/Rapport-85_DRAyB.js","assets/RattacherUneCarte-CpYIcFZD.js","assets/Recommandations-Dvy0dpLx.js","assets/relances-pur-DsIo28uB.js","assets/releve-des-avis-qOpnV0QE.js","assets/SalonFoyer-BPSSJJAA.js","assets/Secretariat-A-sH-Kqm.js","assets/secretariat-admin-DyahDzjb.js","assets/Secretariat-Cy79Zw30.css","assets/Signatures-DP7V51dh.js","assets/SignerUnPdf-Cqge-rGA.js","assets/Synthese-Bdz2RCTP.js","assets/systeme-C3XFIa8E.css","assets/Tableau-eV_1CmmH.js","assets/Textes-BPzFtCrk.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-B03uXknp.js","assets/tri-des-caisses-pur-LLFyLIM8.js","assets/trone-B6H-OVsQ.js","assets/trone-wvMgyufp.css","assets/ui-By1pyytg.js","assets/vente-DMe4r4ed.css","assets/Vitrine-CRqZUnEh.css","assets/Vitrine-DNTDqfVt.js","assets/_admin-CXlSBWaA.js","assets/_contrat-sC9zZmBE.js","assets/_heures-CsbP2pOW.js","assets/_reuni-B5TA1oGm.js","assets/_shared-UDVeUrWD.js","assets/_signature-5c7MhVKD.js","assets/_ui-BWMA-PlM.css","assets/_ui-D2orrN9i.js"];
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
