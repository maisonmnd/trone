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
const BUILD = "20261027061226";
const A_GARDER = ["./","assets/Abonnements-B6F2HamH.js","assets/abonnements-vzkwc9j1.js","assets/Academie-CxB6xzIT.js","assets/Acces-Bl4XCroW.js","assets/actions-DE_oKgYX.js","assets/AFaire-BgjNFzvK.js","assets/afaire-Dm_D8j78.js","assets/Agents-CdeKwMcp.js","assets/agents-donnees-Qng2FWlj.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-CZH5B_J6.js","assets/Appels-CWWRgjhw.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/AtelierDesContenus-vtrN52G5.js","assets/AuComptoir-C-ufJRWJ.js","assets/Aujourdhui-D4ApfwNO.js","assets/avis-fiches-DZB9A-9t.js","assets/AvisGoogle-DaPXfwX9.css","assets/AvisGoogle-Du0RFjWv.js","assets/bilan-B-bfPYR0.css","assets/bilan-WV_-YciN.js","assets/BilanMensuel-Bv51_L62.js","assets/Branches-CObV7l4v.js","assets/bridges-Db4k3_rf.js","assets/caisse-du-soir-B_TqFet0.js","assets/Caisse-DZ5_4O29.js","assets/Caisses-BgURM6cY.js","assets/Calendrier-Ccyv5pCs.js","assets/Carnet-C4Md88-b.js","assets/carte-DAygwMTz.js","assets/carte-_W_-xBPj.css","assets/CarteModal-BwHkfw5T.js","assets/CartesCadeaux-Dua2Gfab.js","assets/Catalogue-BdoXDIEx.js","assets/CentreDeCommande-Cgo_hB4r.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-C7kG3ZLA.js","assets/certificat-D8ZphMt3.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-DVpHTsWP.js","assets/chiffre-du-jour-pur-BZ3ppmnQ.js","assets/ChiffreDesPrestations-CTB6nwzS.js","assets/client-B3UGnhuU.js","assets/ClotureDuTiroir-C6vPx-E_.css","assets/ClotureDuTiroir-kISZpfxl.js","assets/Coffre-DBm6UJJq.js","assets/components-DWzShWla.js","assets/compte-courant-ByzulCEN.js","assets/compte-gtZYiOJs.js","assets/CompteCourant-CMhZhmQc.js","assets/Comptes-CxKwY-63.js","assets/Comptoir-CqJXR6q4.js","assets/consultation-Ck0A-j1U.js","assets/consultation-CRW6QcWf.css","assets/Consultations-DB8e24Sm.js","assets/consultNotes-BDfN7923.js","assets/Conversations-CalcGvfW.js","assets/Conversations-D4WwB5Zo.css","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-H-bkvLOb.js","assets/currency-qfIhGmrs.js","assets/Customers-BYq5PDbT.js","assets/Dashboard-B8qK6Flt.css","assets/Dashboard-CmZU7KIv.js","assets/dates-DCWJsVFC.js","assets/Demandes-Cxjw8JoK.js","assets/Depenses-BVCNoaoh.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-DyxAKFJL.js","assets/diagnostics-au-trone-r0E1YS2E.js","assets/Discussions-BlkkUqnb.js","assets/Encaissements-B8sIeNty.js","assets/enfants-tq-mPD-f.js","assets/Engagements-Cj5S9MhG.css","assets/Engagements-Xc11It59.js","assets/EntreDeuxSeances-WaxmuGft.js","assets/equipe-B_9ZHz24.css","assets/Evaluation-QlEqKSj8.js","assets/FacturePrestataire-B9c4Tf4S.js","assets/Factures-coH89OUM.js","assets/Fil-CTSYxype.js","assets/finances-BMFnlkRx.css","assets/fon-o_cm6Y3N.js","assets/fon-pur-CgVkbJ8O.js","assets/Fournisseurs-Bx2WehiO.js","assets/fournisseurs-CVxCm9P6.js","assets/foyer-MlM7XOVh.js","assets/Gerard-CRgNXp3M.css","assets/gerard-donnees-eu-3HhkL.js","assets/Gerard-pvrQVDsu.js","assets/gestes-conversation-CmKx95KL.js","assets/HomeRituals-WgOgTq8h.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-DyWvNn2d.js","assets/ia-diagnostic-pur-BulIFgZQ.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-recu-pur-DcucZqpR.js","assets/identite-dN59ZGrq.js","assets/index-DXRphrD-.js","assets/index.es-ChzVWXOI.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-WowyPiNv.js","assets/jspdf.es.min-BxbXegQs.js","assets/JustePrix-DoiXw4fE.js","assets/kkiapay-D8YcLqWJ.js","assets/kkiapay-widget-DnUhUNd4.js","assets/laboratoire-BLYK1YAl.js","assets/Laboratoire-Co-hZIWA.js","assets/LettresAuDossier-BYrOIqgM.js","assets/LienMndPay-C7lxh8XZ.js","assets/maisons-CSSFrqZy.js","assets/Marketing-BGnbwUJw.js","assets/Marque-Bue6dIaB.js","assets/MesTaches-Cc4XUDf6.css","assets/MesTaches-pXqKyw8M.js","assets/momo-C2ZVfV9J.js","assets/MonMois-BENzJ1ou.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-des-fauteuils-pur-CW46U8VG.js","assets/objectifs-XZ_E5jlg.js","assets/paliers-BEgeH7cd.js","assets/Parametres-CVDcp0ks.js","assets/parcours-Cg5o4ZM7.js","assets/Parrainages-Bh2dTgKr.js","assets/Parrainages-gAHAPB_6.css","assets/pdf-CtIgZ0gL.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/Personas-BYsO5mDF.js","assets/Personnel-B0auHAdx.js","assets/photo-CB59PNbd.js","assets/pilotage-D8kf1Co8.css","assets/Predictions-CxyjAKI5.js","assets/Prestataires-BUK9wOcA.js","assets/prestataires-Ddlcv5Ku.js","assets/Prets-DfGuvweI.js","assets/prevision-du-mois-pur-BiqzNpDz.js","assets/Previsions-D-0__Buz.css","assets/previsions-pur-DrDC26D5.js","assets/Previsions-Uut56Eyo.js","assets/processus-pur-BLN25j-E.js","assets/projets-Cm0KmCR1.js","assets/Projets-COO7WDEE.css","assets/Projets-Dc29RSbS.js","assets/projets-pur-2ZEMRNDU.js","assets/protocoles-DWuXWmUg.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-B1DrK41x.js","assets/qualification-Vzy2SAXS.js","assets/quiz-5qMPWZVi.js","assets/Rapport-CFjJn5yI.js","assets/RattacherUneCarte-ECHGmzHu.js","assets/Recommandations-D-WcUiOM.js","assets/regler-C3jVj5vA.js","assets/regler-C5hcM02_.css","assets/regler-la-seance-serveur-BpExlC5z.js","assets/relances-pur-DsIo28uB.js","assets/releve-des-avis-DAfMahLJ.js","assets/SalonFoyer-7at-zBj7.js","assets/secretariat-admin-BPmp9tVT.js","assets/Secretariat-Bngs1p4E.js","assets/Secretariat-Cy79Zw30.css","assets/Signatures-D9bC9L73.js","assets/SignerUnPdf-CmqXI-kx.js","assets/Synthese-BjXg9QEN.js","assets/SyntheseGraphes-DXwpYveD.js","assets/systeme-C3XFIa8E.css","assets/Tableau-ZWtla1LZ.js","assets/Textes-DLpOzRbT.css","assets/Textes-S3FSlCnd.js","assets/tiroirs-DZTrOcSK.js","assets/trace-du-moyen-pur-Bx8-suHn.js","assets/trone-BNiKXjWi.js","assets/trone-ZtHDzaYl.css","assets/ui-EXbQ_fnR.js","assets/useAudiences-C18RH4l4.js","assets/vente-C7YWXkHo.css","assets/Vitrine-BWilTqQJ.css","assets/Vitrine-Ku4C9enV.js","assets/_admin-nlGC_BZw.js","assets/_contrat-OorNdM8i.js","assets/_heures-Cx0KVsnt.js","assets/_reuni-DgPNHO46.js","assets/_shared-DFDYBuI4.js","assets/_signature-Cbyr6r7c.js","assets/_ui-BWMA-PlM.css","assets/_ui-CBeLL2rZ.js"];
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
