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
const BUILD = "20261024081621";
const A_GARDER = ["./","assets/abonnements-Dz4OLoIj.js","assets/Abonnements-o4VITUrO.js","assets/Academie-CNDChc_W.js","assets/Acces-C9KpMzTh.js","assets/actions-wojIh_2z.js","assets/afaire-D2y8K-hP.js","assets/AFaire-j15ygp1i.js","assets/Analytics-CKP0wZ7c.js","assets/Appels-CZZ5rJFN.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/AtelierDesContenus-Dt4lPQbR.js","assets/AuComptoir-BatgWd6V.js","assets/Aujourdhui-B59s31q7.js","assets/bilan-B-bfPYR0.css","assets/bilan-BFr1EYoM.js","assets/BilanMensuel-dvscww01.js","assets/Branches-Bxpzq-e5.js","assets/bridges-D_l-WGsx.js","assets/Caisse-BR6El7bQ.js","assets/caisse-du-soir-BQ75YK6l.js","assets/Caisses-Dpa6xM5W.js","assets/Calendrier-WzrU6d9_.js","assets/Carnet-DiZYjHha.js","assets/carte-dKbtdEWT.js","assets/carte-WI2qP1su.css","assets/CarteModal-U998aJca.js","assets/CartesCadeaux-D4MQd03c.js","assets/Catalogue-CS2FiprT.js","assets/CentreDeCommande-Bs9SWgGH.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-CkN8AB2c.js","assets/certificat-C_fGxB_s.js","assets/certificat-DVSxho5e.css","assets/certificats-coffre-DofYdW4a.js","assets/ChiffreDesPrestations-D99OOANF.js","assets/ClotureDuTiroir-78TEFvi5.js","assets/ClotureDuTiroir-C6vPx-E_.css","assets/Coffre-BHteQz8h.js","assets/components-1W5xjh6P.js","assets/compte-8udcWEsb.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-BzK75np9.js","assets/Comptes-B9oMiPul.js","assets/Comptoir-CAsE4Bdu.js","assets/consultation-CCTm16qX.css","assets/consultation-vkyrZuWH.js","assets/Consultations-C7Yo3JYT.js","assets/consultNotes-BSu6rRdQ.js","assets/Conversations-CfHNRWOq.js","assets/Conversations-D4WwB5Zo.css","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-BJD7qQG5.js","assets/currency-qfIhGmrs.js","assets/Customers-BTL6Gwqo.js","assets/Dashboard-6mxzjYtP.js","assets/dates-DXJUgyqu.js","assets/Demandes-BUVUwAka.js","assets/Depenses-2vCICmQG.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-C4CZKydM.js","assets/diagnostics-au-trone-CLx8cHXv.js","assets/Discussions-CGrPyF0U.js","assets/Encaissements-CoO5yrMk.js","assets/enfants-BMWC2R0V.js","assets/Engagements-AzBcJoJO.js","assets/Engagements-Cj5S9MhG.css","assets/EntreDeuxSeances-Co-sOJhP.js","assets/equipe-DABhdlQT.css","assets/Evaluation-BTcb8hmu.js","assets/FacturePrestataire-DXd4NaTO.js","assets/Factures-BFk9UuAu.js","assets/Fil-DBPnQ-ZS.js","assets/finances-CCjqAkCE.css","assets/fournisseurs-D8zLD49z.js","assets/Fournisseurs-Dfkp4_LN.js","assets/foyer-BV736Nmx.js","assets/gestes-conversation-CmkzZ0ww.js","assets/HomeRituals-DS-Uy599.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-BHox_0jI.js","assets/ia-diagnostic-pur-BulIFgZQ.js","assets/ia-recu-pur-DcucZqpR.js","assets/identite-QxTZReA2.js","assets/index-DXsAf-w5.js","assets/index.es-C69Z-uSy.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-CKGLzcT3.js","assets/jspdf.es.min-CWM6luZB.js","assets/JustePrix-DyBFz_lO.js","assets/kkiapay-DwhO9-ph.js","assets/laboratoire-Cz3AN7yi.js","assets/Laboratoire-D6M8MgX0.js","assets/LettresAuDossier-BCgSlyG3.js","assets/LienMndPay-BfkEE2cD.js","assets/maisons-CSSFrqZy.js","assets/Marketing-CL-8x6t8.js","assets/Marque-Cn_1jBpn.js","assets/momo-C2ZVfV9J.js","assets/MonMois-Ce7zVGqj.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-Bcd-UUGR.js","assets/paliers-DgpAK9lD.js","assets/Parametres-Bs15pCFk.js","assets/parcours-Ch3dd-5d.js","assets/Parrainages-C-c6LYYl.js","assets/Parrainages-gAHAPB_6.css","assets/pdf-DlDrzF4L.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/Personas-TmDQFMuJ.js","assets/Personnel-DCZlpzbN.js","assets/photo-K8BYWoJO.js","assets/pilotage-Bn1gP_oo.css","assets/Predictions-BHilmXjH.js","assets/Prestataires-CTFBmATA.js","assets/prestataires-Dih9idYE.js","assets/Prets-CvPgnWov.js","assets/protocoles-DUz15eJG.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-Bvj1vJAt.js","assets/qualification-C9j6vC8c.js","assets/quiz-5qMPWZVi.js","assets/Rapport-C3p8dZkg.js","assets/RattacherUneCarte-Cuj0m6Cb.js","assets/Recommandations-smPkyPcl.js","assets/relances-pur-DsIo28uB.js","assets/releve-des-avis-C5o0ae25.js","assets/SalonFoyer-Bjq8mVUT.js","assets/secretariat-admin-ezd0tVsb.js","assets/Secretariat-Cy79Zw30.css","assets/Secretariat-CyYD-Ufi.js","assets/Signatures-CC6nwNbt.js","assets/SignerUnPdf-JrS4l25x.js","assets/Synthese-CXW2G05D.js","assets/systeme-C3XFIa8E.css","assets/Tableau-CypOPtWM.js","assets/Textes-CL6GpznD.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-CCWJzHlx.js","assets/trace-du-moyen-pur-Cb3Gcky8.js","assets/trone-CNJgSGiI.css","assets/trone-UzmEJuFh.js","assets/ui-elkCyaRU.js","assets/useAudiences-CtlQnp3J.js","assets/vente-C7YWXkHo.css","assets/Vitrine-BON6rcdB.css","assets/Vitrine-C2V-5PKl.js","assets/_admin-DKIhJ9re.js","assets/_contrat-CxirL10s.js","assets/_heures-CuzeQeEY.js","assets/_reuni-DmJTOLam.js","assets/_shared-DDKA6yT-.js","assets/_signature-Cwxao0wM.js","assets/_ui-BWMA-PlM.css","assets/_ui-CU4taQVD.js"];
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
