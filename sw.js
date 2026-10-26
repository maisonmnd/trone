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
const BUILD = "20261026094923";
const A_GARDER = ["./","assets/Abonnements-Ce2nZrcA.js","assets/abonnements-yWal_Kc4.js","assets/Academie-D4nO-9ko.js","assets/Acces-CF88VzCc.js","assets/actions-2PAw0U5t.js","assets/AFaire-BhL0CbTs.js","assets/afaire-D11Jorww.js","assets/Agents-D8zJmT-p.js","assets/agents-donnees-BnlV1zwG.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-Bs1sFRD_.js","assets/Appels-B98KSksO.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/AtelierDesContenus-B1Wwk0RE.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/AuComptoir-2-KeSHUV.js","assets/Aujourdhui-BGualB63.js","assets/avis-fiches-aNyVp0O7.js","assets/AvisGoogle-DaPXfwX9.css","assets/AvisGoogle-DVhr5vT9.js","assets/bilan-B-bfPYR0.css","assets/bilan-D6gsw5dv.js","assets/BilanMensuel-u6B2vPoD.js","assets/Branches-BEs0VR_l.js","assets/bridges-D5WCZxYv.js","assets/Caisse-CV-69YIe.js","assets/caisse-du-soir-DIKhDiUD.js","assets/Caisses-D6QA0ISE.js","assets/Calendrier-ZtS7tPh1.js","assets/Carnet-CCuDN1HY.js","assets/carte-B25YMnRB.js","assets/carte-_W_-xBPj.css","assets/CarteModal-ETx_tFFS.js","assets/CartesCadeaux-CWQSQyK5.js","assets/Catalogue-CBhKVwpb.js","assets/CentreDeCommande-Dl6Yg70b.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-CVdTt6dv.js","assets/certificat-D_fG1Vot.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-HD-RxRiL.js","assets/chiffre-du-jour-pur-DO8mkNyZ.js","assets/ChiffreDesPrestations-CtHSxSYq.js","assets/client-DztZhIQa.js","assets/ClotureDuTiroir-C6vPx-E_.css","assets/ClotureDuTiroir-DPCY-JJL.js","assets/Coffre-B7cxVpzr.js","assets/components-Do_JUMCz.js","assets/compte-courant-ByzulCEN.js","assets/compte-Dc8e1FbG.js","assets/CompteCourant-BtBjhWhD.js","assets/Comptes-U5ib10C7.js","assets/Comptoir-XqQEBsgt.js","assets/consultation-CRW6QcWf.css","assets/consultation-DX2TgU-C.js","assets/Consultations-DphTCniP.js","assets/consultNotes-DdYlU2xG.js","assets/Conversations-CgQAbwE5.js","assets/Conversations-D4WwB5Zo.css","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-C6NDLL6R.js","assets/currency-qfIhGmrs.js","assets/Customers-Bve46T4R.js","assets/Dashboard-B8qK6Flt.css","assets/Dashboard-DUhqPD53.js","assets/dates-DTje_48w.js","assets/Demandes-TCkceBol.js","assets/Depenses-Gk4Lx5bC.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-CmP3rF3I.js","assets/diagnostics-au-trone-CZNGyT0c.js","assets/Discussions-CTvUW4O6.js","assets/Encaissements-BWF1i2Z2.js","assets/enfants-4Q_1rO-c.js","assets/Engagements-B9K9Zbnj.js","assets/Engagements-Cj5S9MhG.css","assets/EntreDeuxSeances-Bfq14qrY.js","assets/equipe-B_9ZHz24.css","assets/Evaluation-D4PwrO1d.js","assets/FacturePrestataire-C1ErzThy.js","assets/Factures-DAQYZUwi.js","assets/Fil-43edsWJH.js","assets/finances-BMFnlkRx.css","assets/fon-Dpt0kII_.js","assets/fon-pur-CgVkbJ8O.js","assets/Fournisseurs-BgcYvkKX.js","assets/fournisseurs-C8oyezqn.js","assets/foyer-h089RuvA.js","assets/gestes-conversation-oDJ9bNgn.js","assets/HomeRituals-0a28JAKh.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-CMOpBDrF.js","assets/ia-diagnostic-pur-BulIFgZQ.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-recu-pur-DcucZqpR.js","assets/identite-D7pe0x_z.js","assets/index-CuvJIrBJ.js","assets/index.es-DMVghOa0.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-1dTDDb2C.js","assets/jspdf.es.min-Bn0k0T17.js","assets/JustePrix-B4C9QbD-.js","assets/kkiapay-D9HMAMrf.js","assets/kkiapay-widget-DnUhUNd4.js","assets/Laboratoire-5YahcEAW.js","assets/laboratoire-DjsKUyBV.js","assets/LettresAuDossier-Bo_XLYdB.js","assets/LienMndPay-BkB2pwOO.js","assets/maisons-CSSFrqZy.js","assets/Marketing-DMzu_V7I.js","assets/Marque-DosKXRLY.js","assets/MesTaches-Cc4XUDf6.css","assets/MesTaches-Dusysj3S.js","assets/momo-C2ZVfV9J.js","assets/MonMois-BWNZMitw.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-BkB9vD48.js","assets/paliers-DmuVhl1W.js","assets/Parametres-B_RSX9Rk.js","assets/parcours-ZuVkcxLx.js","assets/Parrainages-DZEKLCHl.js","assets/Parrainages-gAHAPB_6.css","assets/pdf-DL6XyKAq.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/Personas-DH8ArfHv.js","assets/Personnel-L-C5X3Dh.js","assets/photo-ljQh2hl3.js","assets/pilotage-D8kf1Co8.css","assets/Predictions-C0BKHMPa.js","assets/Prestataires-Bx0_7Cz9.js","assets/prestataires-DoKBnx9d.js","assets/Prets-BdcDtubo.js","assets/projets-CMufisVP.js","assets/Projets-COO7WDEE.css","assets/Projets-D9Ytu716.js","assets/projets-pur-2ZEMRNDU.js","assets/protocoles-D7o5HM_p.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-DnYru0c-.js","assets/qualification-CFAW3ktf.js","assets/quiz-5qMPWZVi.js","assets/Rapport-BKIX7yDC.js","assets/RattacherUneCarte-Bh7y4IJt.js","assets/Recommandations-CiQQEKUP.js","assets/regler-C5hcM02_.css","assets/regler-DcUpW-TB.js","assets/regler-la-seance-serveur-BpExlC5z.js","assets/relances-pur-DsIo28uB.js","assets/releve-des-avis-CGEfLYE-.js","assets/SalonFoyer-CqRaCL2m.js","assets/secretariat-admin-B9kl3mpH.js","assets/Secretariat-Cy79Zw30.css","assets/Secretariat-fYGM9vn3.js","assets/Signatures-T7rGEF57.js","assets/SignerUnPdf-DgXM4kSu.js","assets/Synthese-Bpup_dp5.js","assets/SyntheseGraphes-DyayCK4p.js","assets/systeme-C3XFIa8E.css","assets/Tableau-CTBWFm50.js","assets/Textes-CihAY-C3.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-CR3eabV9.js","assets/trace-du-moyen-pur-Bx8-suHn.js","assets/trone-CtfJ02ST.js","assets/trone-C_7IjL7g.css","assets/ui-tzjGsHFN.js","assets/useAudiences-CUxfUFFK.js","assets/vente-C7YWXkHo.css","assets/Vitrine-BWilTqQJ.css","assets/Vitrine-DkHEK-Er.js","assets/_admin-DLnlOFjA.js","assets/_contrat-CB1KVHbl.js","assets/_heures-n9OWpqeY.js","assets/_reuni-jmI45hIF.js","assets/_shared-sXURxYqn.js","assets/_signature-CQysJIDF.js","assets/_ui-BWMA-PlM.css","assets/_ui-O2nZAymy.js"];
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
