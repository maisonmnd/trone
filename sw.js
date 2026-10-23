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
const BUILD = "20261023223149";
const A_GARDER = ["./","assets/abonnements-6pxM_uRN.js","assets/Abonnements-CFrRuYPQ.js","assets/Academie-BBLc0lEw.js","assets/Acces-DuW_ryNx.js","assets/actions-Oj9loUZu.js","assets/afaire-BhBjLSFW.js","assets/AFaire-DQQIuzzh.js","assets/Analytics-V2uQWBUx.js","assets/Appels-337V__Gs.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/AtelierDesContenus-D3-aDPl5.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/Aujourdhui-BBL6Lv3H.js","assets/bilan-B-bfPYR0.css","assets/bilan-gTibJcOQ.js","assets/BilanMensuel-iNyN8uNn.js","assets/Branches-CGGSCaa6.js","assets/bridges-B_VYj22a.js","assets/Caisse-CKjIfauE.js","assets/caisse-du-soir-_NqP-f2y.js","assets/Caisses-DGEj49NI.js","assets/Calendrier-CRk4ZDlL.js","assets/Carnet-CmpdRlsI.js","assets/carte-HdDaIqXD.js","assets/carte-WI2qP1su.css","assets/CarteModal-Zy8dP7md.js","assets/CartesCadeaux-B17kO5RB.js","assets/Catalogue-BwcZQC81.js","assets/CentreDeCommande-BHLrj1tF.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-BieCFz3P.js","assets/certificat-C4EzerCd.js","assets/certificat-DVSxho5e.css","assets/certificats-coffre-CWb5C9yx.js","assets/ChiffreDesPrestations-D559h4ki.js","assets/ClotureDuTiroir-C6vPx-E_.css","assets/ClotureDuTiroir-cJ0AMnNd.js","assets/Coffre-xmlVxd0K.js","assets/components-C2BybKzz.js","assets/compte-courant-ByzulCEN.js","assets/compte-CWTRkHWd.js","assets/CompteCourant-BiDTcUw0.js","assets/Comptes-DSzmaGjH.js","assets/Comptoir-DhlNESrG.js","assets/consultation-CCTm16qX.css","assets/consultation-rzJxbKbB.js","assets/Consultations-BtdUH3YW.js","assets/consultNotes-DhqvPIkb.js","assets/Conversations-CzMch8tV.js","assets/Conversations-D4WwB5Zo.css","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-BLYG_Eu1.js","assets/currency-qfIhGmrs.js","assets/Customers-BoTqcQi9.js","assets/Dashboard-DWlxTBqu.js","assets/dates-DQQ4dDDu.js","assets/Demandes-BFXUv2W_.js","assets/Depenses-Bh04KxvN.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-BWXlWU4N.js","assets/diagnostics-au-trone-CaIlC4Dc.js","assets/Discussions-C_d2zepr.js","assets/Encaissements-DZnYP9Qo.js","assets/enfants-CGhfFxio.js","assets/Engagements-Cj5S9MhG.css","assets/Engagements-VzhDLHez.js","assets/EntreDeuxSeances-CakkBPOX.js","assets/equipe-DABhdlQT.css","assets/Evaluation-DzGZi8RE.js","assets/FacturePrestataire-e0jZrcvy.js","assets/Factures-DVS430gt.js","assets/Fil-Di7kIuGP.js","assets/finances-CCjqAkCE.css","assets/fournisseurs-BcZiG21h.js","assets/Fournisseurs-CCE_Lq20.js","assets/foyer-BjFpEI-I.js","assets/gestes-conversation-qO4kHPNO.js","assets/HomeRituals-Badw-6eV.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-B_YzZKxq.js","assets/ia-diagnostic-pur-BulIFgZQ.js","assets/ia-recu-pur-DcucZqpR.js","assets/identite-B0T7ij6h.js","assets/index-DkPAD35t.js","assets/index.es-DmR1nG8I.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-a2h9SO2c.js","assets/jspdf.es.min-B26sYD5O.js","assets/JustePrix-DgH3RbTO.js","assets/kkiapay-BIjNgL0Q.js","assets/Laboratoire-BWNKU2lj.js","assets/laboratoire-C5XpSbWS.js","assets/LettresAuDossier-DMVyshop.js","assets/LienMndPay-DnawqW5q.js","assets/maisons-CSSFrqZy.js","assets/Marketing-D4izuIy3.js","assets/Marque-CZJx-CKV.js","assets/momo-C2ZVfV9J.js","assets/MonMois-BsWAABdD.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-DG8-_hFs.js","assets/paliers-CXB1v_SV.js","assets/Parametres-EP9FRC8L.js","assets/parcours-DKYn-DB_.js","assets/Parrainages-DFjOLmnm.js","assets/Parrainages-gAHAPB_6.css","assets/pdf-BOLxZk6r.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/Personas-DTqkrqxv.js","assets/Personnel-C5_sV9Bc.js","assets/photo-0mAhwEh7.js","assets/pilotage-Bn1gP_oo.css","assets/Predictions-Cbm_Gpu0.js","assets/prestataires-BzveJC5Z.js","assets/Prestataires-mPLMc7v3.js","assets/Prets-D5MUFnnC.js","assets/protocoles-jcxxgmuu.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-DWjqtPJR.js","assets/qualification-Bj5qcUJi.js","assets/quiz-5qMPWZVi.js","assets/Rapport-jEs0fYHK.js","assets/RattacherUneCarte-D7ChcOGS.js","assets/Recommandations-Bs-K7_lm.js","assets/relances-pur-DsIo28uB.js","assets/releve-des-avis-DrHdTZwZ.js","assets/SalonFoyer-D-tjBbqa.js","assets/secretariat-admin-y12Wt2IB.js","assets/Secretariat-Cy79Zw30.css","assets/Secretariat-D15DP_6z.js","assets/Signatures-BxCM6JCp.js","assets/SignerUnPdf-D6sXvcFA.js","assets/Synthese-BoqR729O.js","assets/systeme-C3XFIa8E.css","assets/Tableau-CN74YWrp.js","assets/Textes-CJNlxoWD.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-B72HsZOr.js","assets/trace-du-moyen-pur-BQm6t3bk.js","assets/trone-BFJaI8Qe.js","assets/trone-SckX8xKJ.css","assets/ui-CGeQp5AV.js","assets/useAudiences-Cr8pDM9_.js","assets/vente-DMe4r4ed.css","assets/Vitrine-BkCXDDGB.js","assets/Vitrine-BON6rcdB.css","assets/_admin-BQTTVH2o.js","assets/_contrat-CEsgdFhf.js","assets/_heures-D1EJ5Q1v.js","assets/_reuni-BOwaKGzr.js","assets/_shared-CZLDRdCm.js","assets/_signature-DHj9a0kJ.js","assets/_ui-BWMA-PlM.css","assets/_ui-IPknKsG3.js"];
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
