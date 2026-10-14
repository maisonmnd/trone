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
const BUILD = "20261014175425";
const A_GARDER = ["./","assets/Abonnements-BzKqCVqP.js","assets/abonnements-Dn2hcFol.js","assets/Academie-CF0fYJR0.js","assets/Acces-Bwe_De_-.js","assets/actions-DQzQb2V5.js","assets/AFaire-B7NhX8Ij.js","assets/afaire-BykyA5ZH.js","assets/Analytics-gz86wQnL.js","assets/Appels-Bd0obG_Q.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/AtelierDesContenus-p1bo4Lxp.js","assets/Aujourdhui-XiiysOXz.js","assets/bilan-B-bfPYR0.css","assets/bilan-D9yQBBP9.js","assets/BilanMensuel-Bg87DJCy.js","assets/Branches-DiU6KAME.js","assets/bridges-dj0U99gn.js","assets/Caisse-B_9AON-N.js","assets/caisse-du-soir-CF-wdZls.js","assets/Caisses-Dftnb76S.js","assets/Calendrier-Cbfqum0A.js","assets/Carnet-CYm1BdEr.js","assets/carte-DenPBv91.js","assets/carte-WI2qP1su.css","assets/CarteModal-BfIwejOQ.js","assets/CartesCadeaux-DwC2sAlj.js","assets/Catalogue-DT3nNs2J.js","assets/CentreDeCommande-Bx6sQ3RY.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-CdMQFcWU.js","assets/certificat-DRkN9_XZ.js","assets/certificat-DVSxho5e.css","assets/certificats-coffre-CPo0KCq3.js","assets/ChiffreDesPrestations-CASU7rTk.js","assets/ClotureDuTiroir-C6vPx-E_.css","assets/ClotureDuTiroir-DEVPBvbR.js","assets/Coffre-iBEJ4XpH.js","assets/components-CXMRa2M-.js","assets/compte-courant-ByzulCEN.js","assets/compte-C_ioeplf.js","assets/CompteCourant-vdNHQIfG.js","assets/Comptes-C4dc0woV.js","assets/Comptoir-BkQO3F0h.js","assets/consultation-BRBoAW_a.js","assets/consultation-CCTm16qX.css","assets/Consultations-C-KV57yl.js","assets/consultNotes-C6PTBrrd.js","assets/Conversations-FEiBRZ8v.js","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-Be_EKDgC.js","assets/currency-CzN07T4P.js","assets/Customers-Bhx9FTMN.js","assets/Dashboard-BTftbY-i.js","assets/dates-lGtIbEPA.js","assets/Demandes-DhnDD5M0.js","assets/Depenses-B2dt5V6m.js","assets/devise-fon-DX3P0bG4.woff2","assets/encaissement-pur-FJkUqliE.js","assets/Encaissements-Cs1zQnNN.js","assets/enfants-DDjVu0lf.js","assets/Engagements-8NaYMg11.js","assets/Engagements-Cj5S9MhG.css","assets/equipe-DpPyq6h-.css","assets/Evaluation-DqP54X-z.js","assets/FacturePrestataire-TQko3IUv.js","assets/Factures-CP7cJKZv.js","assets/Fil-BA_JbfPF.js","assets/finances-CCjqAkCE.css","assets/fournisseurs-BQYCLeKm.js","assets/Fournisseurs-DPbad6nx.js","assets/foyer-2-iBMaJl.js","assets/HomeRituals-YHmKHU91.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-KnWMfNuN.js","assets/identite-9tyjMDO5.js","assets/index-Ebc650NN.js","assets/index.es-18SHQ1Ac.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-B8Qou_Ok.js","assets/jspdf.es.min-DI4awGec.js","assets/JustePrix-w0zGzfe2.js","assets/kkiapay-BI5bKCCn.js","assets/laboratoire-C0l4mNuJ.js","assets/Laboratoire-DXr3BVs3.js","assets/LettresAuDossier-6Gpi63gN.js","assets/maisons-DZdAeMF9.js","assets/Marketing-uBERV-to.js","assets/Marque-CZsjWsOL.js","assets/momo-C2ZVfV9J.js","assets/MonMois-BcO6Jr-0.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-w7Qe7Fgc.js","assets/paliers-7On67bAl.js","assets/Parametres-gVE5fOF4.js","assets/parcours-TfP0B_w2.js","assets/Parrainages-2uBfda7w.js","assets/Parrainages-gAHAPB_6.css","assets/pdf-BNHrBI8H.js","assets/Personas-DohqJi4o.js","assets/Personnel-Dp4aDnWO.js","assets/photo-CxEXnGXq.js","assets/pilotage-CybSwMA-.css","assets/Predictions-DInJ-0x_.js","assets/prestataires-CYapppB_.js","assets/Prestataires-DBAgw_wU.js","assets/Prets-Dh9fLIxi.js","assets/promos-DAiho7Go.js","assets/protocoles-Da8hJo9J.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-DQ0nv3UK.js","assets/quiz-5qMPWZVi.js","assets/Rapport-zWioV0se.js","assets/RattacherUneCarte-CDhy9-OO.js","assets/Recommandations-CF2keutM.js","assets/SalonFoyer-BVfQji3H.js","assets/secretariat-admin-BGrdgpnn.js","assets/Secretariat-BnRIjx8V.js","assets/Synthese-Cx0C4mkA.js","assets/systeme-C3XFIa8E.css","assets/Tableau-DtckYGN2.js","assets/Textes-DLpOzRbT.css","assets/Textes-raEYjszM.js","assets/tiroirs-B3ykPkeH.js","assets/trone-D9xoEQoM.js","assets/trone-DnuuvbFM.css","assets/ui-DeHXIc0i.js","assets/vente-D0kdELDn.css","assets/Vitrine-BuzK4W3S.js","assets/_admin-u7bp_z-l.js","assets/_contrat-C0qcP3qH.js","assets/_heures-C-A7oKEC.js","assets/_shared-CtcedC-t.js","assets/_signature-B9C6mS-y.js","assets/_ui-BFJiYBHb.js","assets/_ui-BWMA-PlM.css"];
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
