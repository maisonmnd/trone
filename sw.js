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
const BUILD = "20261026225727";
const A_GARDER = ["./","assets/Abonnements-BD74M7PC.js","assets/abonnements-Vv3r3jQK.js","assets/Academie-ss3IinX1.js","assets/Acces-DEPTZ5WZ.js","assets/actions-YK4EYqp0.js","assets/afaire-C4rBtADQ.js","assets/AFaire-DH_6fzrI.js","assets/Agents-677MJJPr.js","assets/agents-donnees-YMS7h8Oe.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-DoWta0_S.js","assets/Appels-B0CpVBEb.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/AtelierDesContenus-Zy3hnsu0.js","assets/AuComptoir-DMc3SvoA.js","assets/Aujourdhui-BEGn7T1V.js","assets/avis-fiches-zzTe-4Xj.js","assets/AvisGoogle-DaPXfwX9.css","assets/AvisGoogle-g_bIYzAA.js","assets/bilan-B-bfPYR0.css","assets/bilan-BsT-Svs0.js","assets/BilanMensuel-D6CRAOig.js","assets/Branches-lRXTzF5M.js","assets/bridges-DZaUEzfp.js","assets/Caisse-BVBAjXjS.js","assets/caisse-du-soir-CdenZNLJ.js","assets/Caisses-d0IEJnY4.js","assets/Calendrier-BsLyulqq.js","assets/Carnet-ChjwU2Py.js","assets/carte-BOQ1YUNG.js","assets/carte-_W_-xBPj.css","assets/CarteModal-B_Eysb1M.js","assets/CartesCadeaux-Cym8dFJs.js","assets/Catalogue-C6fWc5fv.js","assets/CentreDeCommande-CyLbCQoy.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-D8MBuxmr.js","assets/certificat-DT2yN1SV.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-e7C2UJ8g.js","assets/chiffre-du-jour-pur-v8G4MCyO.js","assets/ChiffreDesPrestations-DIduuacm.js","assets/client-Bcar_RzV.js","assets/ClotureDuTiroir-BkukSyOq.js","assets/ClotureDuTiroir-C6vPx-E_.css","assets/Coffre-qWeT-59n.js","assets/components-DQ2PiszK.js","assets/compte-courant-ByzulCEN.js","assets/compte-CVLrPcy2.js","assets/CompteCourant-ccBQTITv.js","assets/Comptes-KYDp5dYZ.js","assets/Comptoir-DwKb6Vzg.js","assets/consultation-BgBHuK_L.js","assets/consultation-CRW6QcWf.css","assets/Consultations-DgNbRf1z.js","assets/consultNotes-CZ15JG5i.js","assets/Conversations-D4WwB5Zo.css","assets/Conversations-spldI1CQ.js","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-D1IjKC9Z.js","assets/currency-qfIhGmrs.js","assets/Customers-4dZ2poyh.js","assets/Dashboard-B8qK6Flt.css","assets/Dashboard-CcjgnRdn.js","assets/dates-BJs_GVrp.js","assets/Demandes-INioVi7l.js","assets/Depenses-DoOx_VOQ.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-CZ1C1u6C.js","assets/diagnostics-au-trone-pZzUa68c.js","assets/Discussions-zlotiq4H.js","assets/Encaissements-iQ6jMEVJ.js","assets/enfants-BCy6YBE_.js","assets/Engagements-BVTFdc1j.js","assets/Engagements-Cj5S9MhG.css","assets/EntreDeuxSeances-CjiHvJRI.js","assets/equipe-B_9ZHz24.css","assets/Evaluation-CKUprN3v.js","assets/FacturePrestataire-Dlp1nKFD.js","assets/Factures-DqVz4O1W.js","assets/Fil-BqNQZiII.js","assets/finances-BMFnlkRx.css","assets/fon-BgoWV-Ye.js","assets/fon-pur-CgVkbJ8O.js","assets/Fournisseurs-Dipr1MuH.js","assets/fournisseurs-K_eK_wga.js","assets/foyer-DHp6K2Gc.js","assets/Gerard-CRgNXp3M.css","assets/gerard-donnees-B4dIiaLl.js","assets/Gerard-Dq_bGYUK.js","assets/gestes-conversation-CLEYlr7G.js","assets/HomeRituals-BTsw_H2M.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-UJaTaZ2s.js","assets/ia-diagnostic-pur-BulIFgZQ.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-recu-pur-DcucZqpR.js","assets/identite-Bd71bkkM.js","assets/index-Ckd97IWa.js","assets/index.es-DZ6CZ_yj.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-m9WNPijX.js","assets/jspdf.es.min-D3V3e3HU.js","assets/JustePrix-Dd6iWr3Y.js","assets/kkiapay-Dwauzyfk.js","assets/kkiapay-widget-DnUhUNd4.js","assets/Laboratoire-FfWvk2yN.js","assets/laboratoire-lkzjBXob.js","assets/LettresAuDossier-B1wALJMZ.js","assets/LienMndPay-CZ30i36m.js","assets/maisons-CSSFrqZy.js","assets/Marketing-CeILm-Kt.js","assets/Marque-DCtZQLXZ.js","assets/MesTaches-Cc4XUDf6.css","assets/MesTaches-DKBQVZ01.js","assets/momo-C2ZVfV9J.js","assets/MonMois-BMEYYOVC.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-des-fauteuils-pur-CW46U8VG.js","assets/objectifs-DgAiwPTO.js","assets/paliers-CvOnouWc.js","assets/Parametres-B35Bl2A1.js","assets/parcours-BSm1-myt.js","assets/Parrainages-BgAfOx0V.js","assets/Parrainages-gAHAPB_6.css","assets/pdf-D9qri6c-.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/Personas-CDcKJ2BV.js","assets/Personnel-BBFTo8oI.js","assets/photo-DX1p400c.js","assets/pilotage-D8kf1Co8.css","assets/Predictions-cY00GIZO.js","assets/prestataires-BPyrT3Gx.js","assets/Prestataires-ICIfyGob.js","assets/Prets-DQIEX3Q9.js","assets/prevision-du-mois-pur-BiqzNpDz.js","assets/Previsions-CVy0nY5E.js","assets/Previsions-D-0__Buz.css","assets/previsions-pur-HG8XDYoi.js","assets/processus-pur-BLN25j-E.js","assets/Projets-B0Dwn_vh.js","assets/Projets-COO7WDEE.css","assets/projets-JiOC85NX.js","assets/projets-pur-2ZEMRNDU.js","assets/protocoles-CMMMp8UE.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-ld61dQXR.js","assets/qualification-DIXHhhaI.js","assets/quiz-5qMPWZVi.js","assets/Rapport-lkLntEmS.js","assets/RattacherUneCarte-DzeDivVx.js","assets/Recommandations-CGI-G2Je.js","assets/regler-6EZ7ruA4.js","assets/regler-C5hcM02_.css","assets/regler-la-seance-serveur-BpExlC5z.js","assets/relances-pur-DsIo28uB.js","assets/releve-des-avis-CTvgzjE3.js","assets/SalonFoyer-U3LeTCnO.js","assets/secretariat-admin-D_5wOugR.js","assets/Secretariat-BgzDBnEw.js","assets/Secretariat-Cy79Zw30.css","assets/Signatures-oM8B0uiM.js","assets/SignerUnPdf-CoNtOOjK.js","assets/Synthese-DIJ3ceYB.js","assets/SyntheseGraphes-BfL4CD_U.js","assets/systeme-C3XFIa8E.css","assets/Tableau-BzNY2YKp.js","assets/Textes-DgOg36A5.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-Drdtqmlx.js","assets/trace-du-moyen-pur-Bx8-suHn.js","assets/trone-Bipu7WG8.js","assets/trone-ZtHDzaYl.css","assets/ui-ediW2Arh.js","assets/useAudiences-BJgl2tEN.js","assets/vente-C7YWXkHo.css","assets/Vitrine-BWilTqQJ.css","assets/Vitrine-DhtrMX-I.js","assets/_admin-CoI52l25.js","assets/_contrat-C36XmsNY.js","assets/_heures-BKFOsFrv.js","assets/_reuni-BUJECyHV.js","assets/_shared-DQ0lOqpc.js","assets/_signature-DFpJXL-K.js","assets/_ui-BWMA-PlM.css","assets/_ui-WhvwkzGx.js"];
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
