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
const BUILD = "20261013140732";
const A_GARDER = ["./","assets/Abonnements-CICfLxFG.js","assets/abonnements-M_ftAuaT.js","assets/Academie-C6aIRsPv.js","assets/Acces-Ce5WmXSZ.js","assets/actions-DpA0a82V.js","assets/AFaire-DeE9R1-4.js","assets/afaire-NhS4Lh2i.js","assets/Analytics-DuSgUsQ0.js","assets/Appels-Dl1D8QVT.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/AtelierDesContenus-hiv5Xot7.js","assets/bilan-B-bfPYR0.css","assets/bilan-DKekJI7N.js","assets/BilanMensuel-CEEotQ5A.js","assets/bourse-sP6qmuee.js","assets/Branches-CFL8accq.js","assets/bridges-1G8-NDqn.js","assets/Caisse--b26IhiT.js","assets/caisse-du-soir-Bg4KxiNU.js","assets/Caisses-Cj91TAxL.js","assets/Calendrier-DNBQmdXk.js","assets/Carnet-BnjXE3Ro.js","assets/carte-UX2thh9t.js","assets/carte-WI2qP1su.css","assets/CarteModal-A4NHmmvM.js","assets/CartesCadeaux-n_gdgh1E.js","assets/Catalogue-w9Ilm6Uz.js","assets/CentreDeCommande-Du8kyJhp.css","assets/CentreDeCommande-DxuLbFYW.js","assets/Cercle-CYsWtX38.js","assets/certificat-DsLb7d2r.js","assets/certificat-DVSxho5e.css","assets/certificats-coffre-D7C7qQui.js","assets/ClotureDuTiroir-C6vPx-E_.css","assets/ClotureDuTiroir-DT92eJ_-.js","assets/Coffre-LGo1oQYV.js","assets/components-DQ01pEEH.js","assets/compte-courant-ByzulCEN.js","assets/compte-WrVCt9tH.js","assets/CompteCourant-CEyo5hee.js","assets/Comptes-Bfd1f0MV.js","assets/Comptoir-B2oPcEhD.js","assets/consultation-CCTm16qX.css","assets/consultation-CMXGOW7y.js","assets/Consultations-yyser8xs.js","assets/consultNotes-kpTC7P58.js","assets/Conversations-DzapHgLS.js","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-8xDcMmeS.js","assets/currency-CzN07T4P.js","assets/Customers-CmFSoySp.js","assets/Dashboard-hF0E3rNS.js","assets/dates-Bk1BOZXY.js","assets/Demandes-BlXlYYxG.js","assets/Depenses-CpQ0ncsj.js","assets/devise-fon-DX3P0bG4.woff2","assets/encaissement-pur-Bcqp0UYl.js","assets/Encaissements-CIYDBFNd.js","assets/enfants-BSmZIKbx.js","assets/Engagements-Cj5S9MhG.css","assets/Engagements-DwF19jO8.js","assets/equipe-DpPyq6h-.css","assets/Evaluation-Uga7PMHy.js","assets/FacturePrestataire-B_hoMRCy.js","assets/Factures-BdgcRhJg.js","assets/Fil-W_2X2B2Q.js","assets/finances-CCjqAkCE.css","assets/Fournisseurs-5lO1Bqlp.js","assets/fournisseurs-BoUcZLB_.js","assets/foyer-oszCJeUC.js","assets/HomeRituals-BSoSoWZF.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-BmcHkZWd.js","assets/identite-Cb7IvSNd.js","assets/index-CJ66YWmw.js","assets/index.es--vyuOPuZ.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-B5hEG0Uo.js","assets/jspdf.es.min-awoAnkGK.js","assets/JustePrix-So79Uz2b.js","assets/kkiapay-DYKnVSiu.js","assets/Laboratoire-CHS5aj7p.js","assets/laboratoire-DZEAZ4DC.js","assets/LettresAuDossier-BUdR10tk.js","assets/maisons-DZdAeMF9.js","assets/Marketing-B02F60hj.js","assets/Marque-DEPoi8rN.js","assets/momo-C2ZVfV9J.js","assets/MonMois-kT5kexv-.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-Ba-1AQi_.js","assets/paliers-Bl07f7m7.js","assets/Parametres-l5H1LCtO.js","assets/parcours-BtrvS8pz.js","assets/Parrainages-DuDWpm3U.js","assets/Parrainages-gAHAPB_6.css","assets/pdf-BigiCWTd.js","assets/Personas-BBTH0I54.js","assets/Personnel-CKvXlxcS.js","assets/photo-xMiu9Nw4.js","assets/pilotage-DYbuDdJQ.css","assets/Predictions-Cu2MrOQ9.js","assets/prestataires-DER12-O9.js","assets/Prestataires-D_Sdl5Pk.js","assets/Prets-DrRh3lOE.js","assets/promos-BpIGYrbT.js","assets/protocoles-CZabBQXe.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-CmdFN7qn.js","assets/quiz-5qMPWZVi.js","assets/Rapport-CEAT8aq3.js","assets/RattacherUneCarte-BX5aoUX4.js","assets/Recommandations-DYwcJQ3W.js","assets/SalonFoyer-BTqktcGF.js","assets/Secretariat-ESJJWRmH.js","assets/Synthese-DjqEmQe4.js","assets/systeme-C3XFIa8E.css","assets/Tableau-BKgiqIrZ.js","assets/Textes-D0LUOui6.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-C-fJoUVx.js","assets/trone-DkSFQ0Wn.js","assets/trone-DnuuvbFM.css","assets/ui-z0H1ipjK.js","assets/vente-D0kdELDn.css","assets/Vitrine-0f49tBsH.js","assets/_contrat-FbsRK5r4.js","assets/_heures-BqqJYFDT.js","assets/_shared-nqLmyBop.js","assets/_signature-Il9a7cMh.js"];
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
