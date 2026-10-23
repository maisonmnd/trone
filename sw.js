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
const BUILD = "20261023183348";
const A_GARDER = ["./","assets/abonnements-D282y0J4.js","assets/Abonnements-DPzOOc5L.js","assets/Academie-BvK5lL7t.js","assets/Acces-CUcoZlbf.js","assets/actions-nA8Dmdj2.js","assets/AFaire-D8gsJyUe.js","assets/afaire-xXv0uMvv.js","assets/Analytics-XIGA6br4.js","assets/Appels-DwCfpYDs.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/AtelierDesContenus-Bg5_FSWY.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/Aujourdhui-Dl_O1yxc.js","assets/bilan-B-bfPYR0.css","assets/bilan-DwAunO8D.js","assets/BilanMensuel-x-ZJZCAW.js","assets/Branches-BGWhcYHp.js","assets/bridges-C6PNpkPq.js","assets/Caisse-CYv5YnAk.js","assets/caisse-du-soir-Drr3tT0s.js","assets/Caisses-FFdRdfx6.js","assets/Calendrier-DougLLf_.js","assets/Carnet-DUtxYuvB.js","assets/carte-CjpR2z5t.js","assets/carte-WI2qP1su.css","assets/CarteModal-BZ_p76ZA.js","assets/CartesCadeaux-D7BUDK_0.js","assets/Catalogue-BsjtWdDm.js","assets/CentreDeCommande-Du8kyJhp.css","assets/CentreDeCommande-nRdcNyw3.js","assets/Cercle-C8DPkENG.js","assets/certificat-Ds2GkcoO.js","assets/certificat-DVSxho5e.css","assets/certificats-coffre-CEE7kejg.js","assets/ChiffreDesPrestations-Cm5OhA2a.js","assets/ClotureDuTiroir-9DqCzD8B.js","assets/ClotureDuTiroir-C6vPx-E_.css","assets/Coffre-DPI5Yv_N.js","assets/components--TS4WtL_.js","assets/compte-courant-ByzulCEN.js","assets/compte-zjNYgp_Q.js","assets/CompteCourant-B5KlO_YY.js","assets/Comptes-B2CGkDls.js","assets/Comptoir-1pDDydqT.js","assets/consultation-CCTm16qX.css","assets/consultation-dKZY9pfK.js","assets/Consultations-BiGWmyKK.js","assets/consultNotes-CAEd72DN.js","assets/Conversations-D0y8Fwww.js","assets/Conversations-D4WwB5Zo.css","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-B0v2S1AH.js","assets/currency-qfIhGmrs.js","assets/Customers-BFb_SU9b.js","assets/Dashboard-BiwxLpmx.js","assets/dates-CfXzw3g5.js","assets/Demandes-CpTqxfJ1.js","assets/Depenses-eGg-Fge0.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-CY_AcPH0.js","assets/diagnostics-au-trone-CkpGILbR.js","assets/Discussions-CcjFxp0G.js","assets/encaissement-pur-DNPpKGcG.js","assets/Encaissements-BW-tLFCL.js","assets/enfants-Bi7lOo6C.js","assets/Engagements-CfT4EHYl.js","assets/Engagements-Cj5S9MhG.css","assets/EntreDeuxSeances-B3Fmx43R.js","assets/equipe-DABhdlQT.css","assets/Evaluation-nags4p_K.js","assets/FacturePrestataire-By46m9Di.js","assets/Factures-CEzW66wI.js","assets/Fil-CmKL27lu.js","assets/finances-CCjqAkCE.css","assets/fournisseurs-BlE0-8xv.js","assets/Fournisseurs-CeAMxogp.js","assets/foyer-CBpQz-oh.js","assets/gestes-conversation-D4cAO_Z9.js","assets/HomeRituals-D2Zt0ccy.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-BzkM9LmW.js","assets/ia-diagnostic-pur-BulIFgZQ.js","assets/ia-recu-pur-DcucZqpR.js","assets/identite-DTuiKeUs.js","assets/index-BduwfDV6.js","assets/index.es-l39-L2X_.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-9x7xgkgU.js","assets/jspdf.es.min-Dlohf6Yc.js","assets/JustePrix-BV2gwFn1.js","assets/kkiapay-DF5CC9ub.js","assets/Laboratoire-CZaropo2.js","assets/laboratoire-mu1Gn5Sl.js","assets/LettresAuDossier-9Xpt8ELo.js","assets/LienMndPay-Z9Qvzt7W.js","assets/maisons-CSSFrqZy.js","assets/Marketing-WZbTRt_V.js","assets/Marque-DkLgUnYM.js","assets/momo-C2ZVfV9J.js","assets/MonMois-BH_pnVON.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-Cs6asO7r.js","assets/paliers-CRaAg3tx.js","assets/Parametres-CVRLpwfy.js","assets/parcours-DIU9BCsz.js","assets/Parrainages-B4HPzC0A.js","assets/Parrainages-gAHAPB_6.css","assets/pdf-VJcNm7C7.js","assets/pdf-W-9sAlPd.js","assets/pdf.worker.min-uNib_u9P.js","assets/Personas-BY3iyc92.js","assets/Personnel-BRjgfvTj.js","assets/photo-Gf0KGiQ8.js","assets/pilotage-Bn1gP_oo.css","assets/Predictions--7cS7y1V.js","assets/prestataires-DsInr5Ql.js","assets/Prestataires-mIvvqv3k.js","assets/Prets-DAd6W4bY.js","assets/promos-D6nCscnX.js","assets/protocoles-BlOorFZT.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-CZAYK27O.js","assets/qualification-joqyeFwC.js","assets/quiz-5qMPWZVi.js","assets/Rapport-hm4j5dBP.js","assets/RattacherUneCarte-Bxru2wvj.js","assets/Recommandations-DOxulnk8.js","assets/relances-pur-DsIo28uB.js","assets/releve-des-avis-DThEmj4z.js","assets/SalonFoyer-MlJ5q3aM.js","assets/secretariat-admin-Ne_Q1abx.js","assets/Secretariat-Cy79Zw30.css","assets/Secretariat-lJyqrpuJ.js","assets/Signatures-B7S1PQmN.js","assets/SignerUnPdf-D6y6bwQ5.js","assets/Synthese-D1edtME0.js","assets/systeme-C3XFIa8E.css","assets/Tableau-CkuGHi3i.js","assets/Textes-DIDF8Z5T.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-CtcebIk6.js","assets/trace-du-moyen-pur-BQm6t3bk.js","assets/trone-DztlZPNL.js","assets/trone-SckX8xKJ.css","assets/ui-DmUZQPdF.js","assets/useAudiences-BBUv94qJ.js","assets/vente-DMe4r4ed.css","assets/Vitrine-B-iDiJ5n.js","assets/Vitrine-BON6rcdB.css","assets/_admin-C1VGTRHf.js","assets/_contrat-59r3Zcjs.js","assets/_heures-CA2YWubY.js","assets/_reuni-Cs8ERZcz.js","assets/_shared-BZB_rP9T.js","assets/_signature-B-WYWbCO.js","assets/_ui-BWMA-PlM.css","assets/_ui-Cirn0uBY.js"];
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
