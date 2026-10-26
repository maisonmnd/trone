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
const BUILD = "20261026093143";
const A_GARDER = ["./","assets/Abonnements-BMYtoRhc.js","assets/abonnements-CpD27oPu.js","assets/Academie-CS82kWZj.js","assets/Acces-Dg7wniO4.js","assets/actions-ZPzWC82O.js","assets/afaire-DqK1y4An.js","assets/AFaire-DW2wduMF.js","assets/Agents-DN73eFF0.js","assets/agents-donnees-CF5f2lk3.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-CUQuGKcT.js","assets/Appels-PETjeov3.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/AtelierDesContenus-BoObBt-m.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/AuComptoir-D22lOOMA.js","assets/Aujourdhui-Dywkeh8q.js","assets/avis-fiches-CIZWTcan.js","assets/AvisGoogle-CIHrBYl7.js","assets/AvisGoogle-DaPXfwX9.css","assets/bilan-B-bfPYR0.css","assets/bilan-C5MuAu1e.js","assets/BilanMensuel-Uzm76RU9.js","assets/Branches-DdcX0s2Y.js","assets/bridges-DjuxKe_M.js","assets/Caisse-Baxp_7yv.js","assets/caisse-du-soir-D_tIOFYn.js","assets/Caisses-dbLDoKh0.js","assets/Calendrier-CW3g7dCN.js","assets/Carnet-CJ0xdkpe.js","assets/carte-BijoavXc.js","assets/carte-_W_-xBPj.css","assets/CarteModal-SjzJ-pNC.js","assets/CartesCadeaux-fBalAzn8.js","assets/Catalogue-BK1KPSyG.js","assets/CentreDeCommande-CZbhc2uB.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-BC3iyVyD.js","assets/certificat-WqT9G1_4.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-CWqs6g8q.js","assets/chiffre-du-jour-pur-BQs_PO2G.js","assets/ChiffreDesPrestations-BBWnqonr.js","assets/client-B1Yruu28.js","assets/ClotureDuTiroir-BAxvLvfY.js","assets/ClotureDuTiroir-C6vPx-E_.css","assets/Coffre-BOQsJN6C.js","assets/components-Bcy9Aedg.js","assets/compte-courant-ByzulCEN.js","assets/compte-VPuRAjb2.js","assets/CompteCourant-O5rG2gQH.js","assets/Comptes-DtuGCB4w.js","assets/Comptoir-BYPW3fHB.js","assets/consultation-CRW6QcWf.css","assets/consultation-DcZbQLFB.js","assets/Consultations-BMUln_iI.js","assets/consultNotes-pf8CWzil.js","assets/Conversations-D4WwB5Zo.css","assets/Conversations-DcdurdZE.js","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-DJLZKrjm.js","assets/currency-qfIhGmrs.js","assets/Customers-DmU9E_Yt.js","assets/Dashboard-B8qK6Flt.css","assets/Dashboard-_pjd1PBb.js","assets/dates-B6q3y8G6.js","assets/Demandes-BBMQypyH.js","assets/Depenses-Y3fzhFrL.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-Ck7bki39.js","assets/diagnostics-au-trone-BDEzeeE1.js","assets/Discussions-lCfKAXLG.js","assets/Encaissements-C80v3M5y.js","assets/enfants-jZu7cnI6.js","assets/Engagements-Cj5S9MhG.css","assets/Engagements-CxTdhEpL.js","assets/EntreDeuxSeances-BjC455NS.js","assets/equipe-B_9ZHz24.css","assets/Evaluation-kMzZirlP.js","assets/FacturePrestataire-B8k0sBUo.js","assets/Factures-BsU6QWto.js","assets/Fil-rI6-MM6v.js","assets/finances-BMFnlkRx.css","assets/fon-D-amgp4r.js","assets/fon-pur-CgVkbJ8O.js","assets/Fournisseurs-d3LtzjWK.js","assets/fournisseurs-mP5QwSIK.js","assets/foyer-B1TK7Y9E.js","assets/gestes-conversation-D8XFS0q5.js","assets/HomeRituals-BKIhz5KX.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-hfKMN-kQ.js","assets/ia-diagnostic-pur-BulIFgZQ.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-recu-pur-DcucZqpR.js","assets/identite-DmNiSBye.js","assets/index-DeJP_x3r.js","assets/index.es-CnDiwZ7Y.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-CdCLzNcS.js","assets/jspdf.es.min-Cg7CN4vj.js","assets/JustePrix-DRtqmyIl.js","assets/kkiapay-DnRzC3FV.js","assets/kkiapay-widget-DnUhUNd4.js","assets/laboratoire-BBsE3X_D.js","assets/Laboratoire-C84Gf0Br.js","assets/LettresAuDossier-DSjALkR_.js","assets/LienMndPay-CwxU7rVY.js","assets/maisons-CSSFrqZy.js","assets/Marketing-DpI25Unk.js","assets/Marque-DGaXFDf6.js","assets/MesTaches-Cc4XUDf6.css","assets/MesTaches-NY8bwi7Q.js","assets/momo-C2ZVfV9J.js","assets/MonMois-cM2BgPw8.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-Cr8zuwKj.js","assets/paliers-BT-Dia6x.js","assets/Parametres-efvvMGvw.js","assets/parcours-Egf3exwV.js","assets/Parrainages-DNHQujfd.js","assets/Parrainages-gAHAPB_6.css","assets/pdf-BvpVaiPq.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/Personas-DeYnje6a.js","assets/Personnel-et8GqUSj.js","assets/photo-_UD-zNX8.js","assets/pilotage-D8kf1Co8.css","assets/Predictions-D_m3IeGg.js","assets/prestataires-CDfrYY6e.js","assets/Prestataires-DM6aafnG.js","assets/Prets-CFagZA8N.js","assets/Projets-BK7bC53Q.js","assets/Projets-COO7WDEE.css","assets/projets-h2Ve42x-.js","assets/projets-pur-2ZEMRNDU.js","assets/protocoles-zT0HgfqO.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-DTQSiao2.js","assets/qualification-DXkcceQm.js","assets/quiz-5qMPWZVi.js","assets/Rapport-Dbp8t6l8.js","assets/RattacherUneCarte-CMUIQhV3.js","assets/Recommandations-DjdbEL0y.js","assets/regler-C5hcM02_.css","assets/regler-CTmUkgo0.js","assets/regler-la-seance-serveur-BpExlC5z.js","assets/relances-pur-DsIo28uB.js","assets/releve-des-avis-DoMsq04p.js","assets/SalonFoyer-SVpyuni_.js","assets/secretariat-admin-1hJ_p_mq.js","assets/Secretariat-Cy79Zw30.css","assets/Secretariat-D8v4MAOr.js","assets/Signatures-DBGa3Kn0.js","assets/SignerUnPdf-r8rY9QoW.js","assets/Synthese-CUIQyWkU.js","assets/SyntheseGraphes-C4zzdzOh.js","assets/systeme-C3XFIa8E.css","assets/Tableau-BGkplaA5.js","assets/Textes-BT9RMt8M.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-C4G55Z_K.js","assets/trace-du-moyen-pur-Bx8-suHn.js","assets/trone-C_7IjL7g.css","assets/trone-DzskTsee.js","assets/ui-BYnEdkPq.js","assets/useAudiences-DS_BgkgK.js","assets/vente-C7YWXkHo.css","assets/Vitrine-BWilTqQJ.css","assets/Vitrine-CnjBLIBD.js","assets/_admin-z9UQwAlT.js","assets/_contrat-BPRSmcjq.js","assets/_heures-D5sVl6NO.js","assets/_reuni-Cz1DS4er.js","assets/_shared-C4GOV4nP.js","assets/_signature-BBZRC4_C.js","assets/_ui-BWMA-PlM.css","assets/_ui-Cg75glj4.js"];
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
