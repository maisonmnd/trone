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
const BUILD = "20261024081119";
const A_GARDER = ["./","assets/abonnements-BUN7Tb8H.js","assets/Abonnements-jS1FqAJB.js","assets/Academie-B_Nb_fm_.js","assets/Acces-BYi3SgcX.js","assets/actions-DNnGuVfA.js","assets/afaire-CEyq3Ba1.js","assets/AFaire-q5NiOSyK.js","assets/Analytics-g-U1rLM7.js","assets/Appels-7AqywOA5.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/AtelierDesContenus-Bnb8vddJ.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/AuComptoir-DBOwKGwY.js","assets/Aujourdhui-MkNQaXAu.js","assets/bilan-B-bfPYR0.css","assets/bilan-CPUbseCT.js","assets/BilanMensuel-CUBTr0hp.js","assets/Branches-J-iFdVJo.js","assets/bridges-DmjtEW5a.js","assets/Caisse-CtveH0zi.js","assets/caisse-du-soir-Dhbmsptk.js","assets/Caisses-CuNfcfbu.js","assets/Calendrier-DTdxUVjZ.js","assets/Carnet-otP2df2m.js","assets/carte-lCHBljIy.js","assets/carte-WI2qP1su.css","assets/CarteModal-D9KLXPr-.js","assets/CartesCadeaux-DRZQjMYd.js","assets/Catalogue-B1VPFngl.js","assets/CentreDeCommande-Crof6BGa.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-BN2sH75l.js","assets/certificat-83_sEWhm.js","assets/certificat-DVSxho5e.css","assets/certificats-coffre-IEctjXr-.js","assets/ChiffreDesPrestations-CwNzFAmV.js","assets/ClotureDuTiroir-B_PMddvq.js","assets/ClotureDuTiroir-C6vPx-E_.css","assets/Coffre-CulYyJYL.js","assets/components-ISSu1eVn.js","assets/compte-courant-ByzulCEN.js","assets/compte-T-blsA51.js","assets/CompteCourant-Dq9H8Wgo.js","assets/Comptes-BdtydPYI.js","assets/Comptoir-BZGXB1Ay.js","assets/consultation-CCTm16qX.css","assets/consultation-D1ggWO47.js","assets/Consultations-Bmj8jRqH.js","assets/consultNotes-DgOyYKQB.js","assets/Conversations-D4WwB5Zo.css","assets/Conversations-Dv27rrvy.js","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-BmlBrip6.js","assets/currency-qfIhGmrs.js","assets/Customers-dYB9FfSQ.js","assets/Dashboard-Cq_qSqUz.js","assets/dates-CGpfDw0f.js","assets/Demandes-BdAvv5HR.js","assets/Depenses-DW6WueSo.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-Bykrv3w8.js","assets/diagnostics-au-trone-BZ_CIDbA.js","assets/Discussions-DYm_fqPm.js","assets/Encaissements-Bf7xw-y_.js","assets/enfants-DMeR_K2X.js","assets/Engagements-Cj5S9MhG.css","assets/Engagements-DjWICCbr.js","assets/EntreDeuxSeances-Bm1tP05M.js","assets/equipe-DABhdlQT.css","assets/Evaluation-BUKq_ai4.js","assets/FacturePrestataire-DGCYqj-V.js","assets/Factures-XjM_UJGN.js","assets/Fil-C2JYuH3H.js","assets/finances-CCjqAkCE.css","assets/fournisseurs-BtV9XMS2.js","assets/Fournisseurs-DzV-5Yl8.js","assets/foyer-BZplWEtN.js","assets/gestes-conversation-IShijv0_.js","assets/HomeRituals-BkRtKscO.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-wufAZT0W.js","assets/ia-diagnostic-pur-BulIFgZQ.js","assets/ia-recu-pur-DcucZqpR.js","assets/identite-s1-UwajI.js","assets/index-kmTCw20d.js","assets/index.es-BCTFwFjy.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-CJdZp_Ip.js","assets/jspdf.es.min-BlujE5Y0.js","assets/JustePrix-CfydIvbI.js","assets/kkiapay-DVnOFh02.js","assets/laboratoire-BNrXWGBq.js","assets/Laboratoire-Di-lx7Qh.js","assets/LettresAuDossier-CIZfVaMD.js","assets/LienMndPay-EGkKmUhM.js","assets/maisons-CSSFrqZy.js","assets/Marketing-CxwzfjNv.js","assets/Marque-B0NjIknK.js","assets/momo-C2ZVfV9J.js","assets/MonMois-OXUrhD6h.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-B5h2DPJ_.js","assets/paliers-BW6nb7y5.js","assets/Parametres-3ZLoE-eE.js","assets/parcours-DKYRZ-JL.js","assets/Parrainages-CbLE_AnF.js","assets/Parrainages-gAHAPB_6.css","assets/pdf-cX9c7gRn.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/Personas-BA87045f.js","assets/Personnel-DLf7r0PY.js","assets/photo-A55yMUzO.js","assets/pilotage-Bn1gP_oo.css","assets/Predictions-BdtuZqXM.js","assets/Prestataires-Bb2kGnCs.js","assets/prestataires-DXMyCutf.js","assets/Prets-PpiVAoJB.js","assets/protocoles-BnA8SDZS.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-y_d99SnO.js","assets/qualification-D5pW9tCq.js","assets/quiz-5qMPWZVi.js","assets/Rapport-D2JZabGp.js","assets/RattacherUneCarte-Clw-ioWb.js","assets/Recommandations-CiHvo1iE.js","assets/relances-pur-DsIo28uB.js","assets/releve-des-avis-BCeUPiGc.js","assets/SalonFoyer-DS5bAE5y.js","assets/secretariat-admin-CLM8txns.js","assets/Secretariat-Cy79Zw30.css","assets/Secretariat-D-LM9tj0.js","assets/Signatures-CSRdVeNV.js","assets/SignerUnPdf-DUNz2AgX.js","assets/Synthese-C-oJwEX8.js","assets/systeme-C3XFIa8E.css","assets/Tableau-BtjYoJcD.js","assets/Textes-DLpOzRbT.css","assets/Textes-MyShwMVS.js","assets/tiroirs-D1hVjVG1.js","assets/trace-du-moyen-pur-Cb3Gcky8.js","assets/trone-BOYoFC7k.js","assets/trone-CNJgSGiI.css","assets/ui-DCQ-MNFO.js","assets/useAudiences-BjzeIOuf.js","assets/vente-C7YWXkHo.css","assets/Vitrine-aYMZ_NPM.js","assets/Vitrine-BON6rcdB.css","assets/_admin-Byoj4uJu.js","assets/_contrat-D4vaTtVZ.js","assets/_heures-D25ShgHZ.js","assets/_reuni-B8PtJFZy.js","assets/_shared-DDbppWis.js","assets/_signature-Dy8Cw4ES.js","assets/_ui-BWMA-PlM.css","assets/_ui-Cihr87nE.js"];
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
