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
const BUILD = "20261025082400";
const A_GARDER = ["./","assets/abonnements-BUWf3fnD.js","assets/Abonnements-DOtC7YvN.js","assets/Academie-Bn3x0GPn.js","assets/Acces-BH0ktvp5.js","assets/actions-kQ0JYJ7q.js","assets/AFaire-CJWc64ql.js","assets/afaire-DbTPRPMU.js","assets/Agents-DhJlVn0b.js","assets/agents-donnees-Byq4QZJV.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-j4RLXx3u.js","assets/Appels-B-IPzGXq.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/AtelierDesContenus-De7qKHUN.js","assets/AuComptoir-ZUb02S8y.js","assets/Aujourdhui-DVWyb3Tt.js","assets/avis-fiches-B65z51xi.js","assets/bilan-B-bfPYR0.css","assets/bilan-fs_R03Z1.js","assets/BilanMensuel-BFE-PpMU.js","assets/Branches-CqGMkV8_.js","assets/bridges-DCZAPhrx.js","assets/Caisse-A5ssXJNg.js","assets/caisse-du-soir-BLsZODxm.js","assets/Caisses-BilWEHH3.js","assets/Calendrier-C0MAz_Nf.js","assets/Carnet-NyrSBhr3.js","assets/carte-DS7nTUv3.js","assets/carte-DWlSbalk.css","assets/CarteModal-dMpdXSVM.js","assets/CartesCadeaux-CULDsmPm.js","assets/Catalogue-B3JhmdY6.js","assets/CentreDeCommande-DA0VM09y.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-DtOW3umY.js","assets/certificat-9_XWf1iQ.css","assets/certificat-DLpvS8t5.js","assets/certificats-coffre-_bXnPKjq.js","assets/chiffre-du-jour-pur-6mp62psJ.js","assets/ChiffreDesPrestations-BKJnOZ77.js","assets/client-DeVMHIZk.js","assets/ClotureDuTiroir-C6vPx-E_.css","assets/ClotureDuTiroir-CjaS0Gnw.js","assets/Coffre-CzbUAbpY.js","assets/components-jyzND8pA.js","assets/compte-58uXthhe.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-DfzbgRrs.js","assets/Comptes-F6zb-kbk.js","assets/Comptoir-CVvn42SK.js","assets/consultation-DEznapn9.js","assets/consultation-DQBnwlMN.css","assets/Consultations-yk46a4WP.js","assets/consultNotes-DyD2PiPw.js","assets/Conversations-C5Df-Wc3.js","assets/Conversations-D4WwB5Zo.css","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-MHgjaXe5.js","assets/currency-qfIhGmrs.js","assets/Customers-DF26bywu.js","assets/Dashboard-B8qK6Flt.css","assets/Dashboard-DRKUUena.js","assets/dates-C4hjgq1p.js","assets/Demandes-DI7p0s_T.js","assets/Depenses-B94ZG4Fn.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-D19vZ6px.js","assets/diagnostics-au-trone-r39wYPyO.js","assets/Discussions-BoxLPIWe.js","assets/Encaissements-KFkUs8Vm.js","assets/enfants-BbiClgxr.js","assets/Engagements-Cj5S9MhG.css","assets/Engagements-CqlmLCl0.js","assets/EntreDeuxSeances-DyZ7oJcS.js","assets/equipe-B_9ZHz24.css","assets/Evaluation-DWRA4ibU.js","assets/FacturePrestataire-DsDDuZjy.js","assets/Factures-Cg_W2BMt.js","assets/Fil-Gf-KrWAu.js","assets/finances-BMFnlkRx.css","assets/Fournisseurs-DtoNlNXW.js","assets/fournisseurs-NdR-JynC.js","assets/foyer-Bh0n_ELC.js","assets/gestes-conversation-Xe2LJaid.js","assets/HomeRituals-CUSWDpVY.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-Dbk8n3XG.js","assets/ia-diagnostic-pur-BulIFgZQ.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-recu-pur-DcucZqpR.js","assets/identite-bB5DJXLW.js","assets/index-DhZZcmDu.js","assets/index.es-ZWsYThnK.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-tg17VW2G.js","assets/jspdf.es.min-D09zdY81.js","assets/JustePrix-CntRR-pU.js","assets/kkiapay-mvOMnxXb.js","assets/kkiapay-widget-DnUhUNd4.js","assets/Laboratoire-6BFGvQEU.js","assets/laboratoire-BEowFlHQ.js","assets/LettresAuDossier-BDjdQs0_.js","assets/LienMndPay-02a0m-ud.js","assets/maisons-CSSFrqZy.js","assets/Marketing-B5zPUDWy.js","assets/Marque-DmBF9SmL.js","assets/MesTaches-Cc4XUDf6.css","assets/MesTaches-Dz4BODIQ.js","assets/momo-C2ZVfV9J.js","assets/MonMois-TBwxWpcr.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-C36xPuOW.js","assets/paliers-MRKhaUi0.js","assets/Parametres-tc4hkuIT.js","assets/parcours-C4UAW5dn.js","assets/Parrainages-gAHAPB_6.css","assets/Parrainages-pnkIA9WT.js","assets/pdf-B0dTP2jf.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/Personas-BZZfbow0.js","assets/Personnel-CW6rU7TO.js","assets/photo-CTTaqvM-.js","assets/pilotage-D8kf1Co8.css","assets/Predictions-DshMW4q5.js","assets/Prestataires-DeyRIUs0.js","assets/prestataires-DTlOJ9-2.js","assets/Prets-BirmSogk.js","assets/Projets-B0wBqxFE.js","assets/Projets-COO7WDEE.css","assets/projets-DT2S2lPA.js","assets/projets-pur-2ZEMRNDU.js","assets/protocoles-ClXguMkT.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-D3Tu3BaL.js","assets/qualification-CDJRWcJ_.js","assets/quiz-5qMPWZVi.js","assets/Rapport-BPsWhlg7.js","assets/RattacherUneCarte-D3v5K5T0.js","assets/Recommandations-CTa-RypD.js","assets/regler-CTAZ_7TH.js","assets/regler-DsSwOePM.css","assets/regler-la-seance-serveur-BpExlC5z.js","assets/relances-pur-DsIo28uB.js","assets/releve-des-avis-DMwZ4S3R.js","assets/SalonFoyer-CAhV113Y.js","assets/secretariat-admin-CXZTjcXF.js","assets/Secretariat-Cy79Zw30.css","assets/Secretariat-Dvy6nu1e.js","assets/Signatures-CbFnrADw.js","assets/SignerUnPdf-BcnWSOse.js","assets/Synthese-CZ4Z2zA5.js","assets/SyntheseGraphes-jZxQ3dxj.js","assets/systeme-C3XFIa8E.css","assets/Tableau-CNkPpwub.js","assets/Textes-CkXkc54R.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-EGP-VfOK.js","assets/trace-du-moyen-pur-Bx8-suHn.js","assets/trone-BYrG4QDN.js","assets/trone-DkFoZCYr.css","assets/ui-BA0pN8xB.js","assets/useAudiences-B6Awv1hx.js","assets/vente-C7YWXkHo.css","assets/Vitrine-BaT4HNXR.js","assets/Vitrine-Cs-c3_Mr.css","assets/_admin-DvatCLlz.js","assets/_contrat-CEAU38C-.js","assets/_heures-BsdwBsdp.js","assets/_reuni-DidX49f1.js","assets/_shared-Cellq3J2.js","assets/_signature-CRJUPM8X.js","assets/_ui-BWMA-PlM.css","assets/_ui-C-oHAtPc.js"];
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
