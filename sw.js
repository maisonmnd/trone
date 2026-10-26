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
const BUILD = "20261026173957";
const A_GARDER = ["./","assets/abonnements-B-fixm5g.js","assets/Abonnements-C7JuoVXQ.js","assets/Academie-Dt7cArpO.js","assets/Acces-BvT7NMBI.js","assets/actions-CK5lUeYe.js","assets/afaire-CHPTtE0D.js","assets/AFaire-DLGTx7PU.js","assets/Agents-BqM-NFYu.js","assets/agents-donnees-D01Wr2LF.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-DRcu_ylB.js","assets/Appels-DYStdvfU.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/AtelierDesContenus-0tgB9ZDa.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/AuComptoir-Dz7Wr3QM.js","assets/Aujourdhui-Bxtyo21Q.js","assets/avis-fiches-DSfppnkW.js","assets/AvisGoogle-DaPXfwX9.css","assets/AvisGoogle-XZUcpi65.js","assets/bilan-B-bfPYR0.css","assets/bilan-rFE1U1pN.js","assets/BilanMensuel-MMONelWe.js","assets/Branches-BdbZWrkp.js","assets/bridges-Om9aWKrc.js","assets/Caisse-Dgz34wb4.js","assets/caisse-du-soir-BbBO5Jj5.js","assets/Caisses-CF_ygpzr.js","assets/Calendrier-CAVhA2N8.js","assets/Carnet-CDkCFF27.js","assets/carte-Dx9ICL2Q.js","assets/carte-_W_-xBPj.css","assets/CarteModal-DiwFoKJc.js","assets/CartesCadeaux-Ww-nysIY.js","assets/Catalogue-BbH9SDVW.js","assets/CentreDeCommande-CGG5D8EQ.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-BvkzXQT4.js","assets/certificat-BlkvoZI1.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-BI9Z8cWN.js","assets/chiffre-du-jour-pur-B-L4vXZj.js","assets/ChiffreDesPrestations-Cnyfy8Nd.js","assets/client-CJArgzMN.js","assets/ClotureDuTiroir-C6vPx-E_.css","assets/ClotureDuTiroir-DwAKzMPv.js","assets/Coffre-ajoP6GJQ.js","assets/components-BPa3R02O.js","assets/compte-CJJm8l2Q.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-OQbvhbTv.js","assets/Comptes-Cbegxrli.js","assets/Comptoir-DJuZxcGw.js","assets/consultation-CRW6QcWf.css","assets/consultation-JMieD14k.js","assets/Consultations-CZpPmiL4.js","assets/consultNotes-BU5zUzFA.js","assets/Conversations-D4WwB5Zo.css","assets/Conversations-DkxfzAjC.js","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-a1rmVGj-.js","assets/currency-qfIhGmrs.js","assets/Customers-qiIWq390.js","assets/Dashboard-B8qK6Flt.css","assets/Dashboard-DRXaoQW2.js","assets/dates-CzF8ZVna.js","assets/Demandes-Ba04IAcU.js","assets/Depenses-DXtIwTsZ.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-xApgXRjh.js","assets/diagnostics-au-trone-BGN5kx9m.js","assets/Discussions-B7mOBsFP.js","assets/Encaissements-DIxOD0l0.js","assets/enfants-FXeWNAOG.js","assets/Engagements-Cj5S9MhG.css","assets/Engagements-DKcGbdQO.js","assets/EntreDeuxSeances-TuqLrGq1.js","assets/equipe-B_9ZHz24.css","assets/Evaluation-GIE1iOTC.js","assets/FacturePrestataire-Bge_-66z.js","assets/Factures-B4phKSEn.js","assets/Fil-D91qyQZF.js","assets/finances-BMFnlkRx.css","assets/fon-CK_u_OTa.js","assets/fon-pur-CgVkbJ8O.js","assets/Fournisseurs-CK7dyU-h.js","assets/fournisseurs-CvH_Lkqj.js","assets/foyer-DKTeRrLF.js","assets/Gerard-BZ2V5qz7.css","assets/Gerard-NLoZGtXl.js","assets/gestes-conversation-COVEi9vu.js","assets/HomeRituals-CfOxbZUG.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-BTSWGQAl.js","assets/ia-diagnostic-pur-BulIFgZQ.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-recu-pur-DcucZqpR.js","assets/identite-DSDn1qaC.js","assets/index-BUBWI6t1.js","assets/index.es-C5FAz-ta.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-CyRZEeE5.js","assets/jspdf.es.min-CxGeDC3U.js","assets/JustePrix-CEQLHZu9.js","assets/kkiapay-Dv-d4wH4.js","assets/kkiapay-widget-DnUhUNd4.js","assets/Laboratoire-DsTl_USb.js","assets/laboratoire-huo-dZ3J.js","assets/LettresAuDossier-CFuVXJvv.js","assets/LienMndPay-BZeM3Dwe.js","assets/maisons-CSSFrqZy.js","assets/Marketing-NrHWTCcc.js","assets/Marque-AtdodFeu.js","assets/MesTaches-B4p8jI91.js","assets/MesTaches-Cc4XUDf6.css","assets/momo-C2ZVfV9J.js","assets/MonMois-BE23-DyB.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-des-fauteuils-pur-CW46U8VG.js","assets/objectifs-Dzz1_yGI.js","assets/paliers-DII2AWXY.js","assets/Parametres-CSDT95pU.js","assets/parcours-DLv2CkhZ.js","assets/Parrainages-Cd709zGW.js","assets/Parrainages-gAHAPB_6.css","assets/pdf-B6FX2NRk.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/Personas-DECCYAcn.js","assets/Personnel-6zQigBzL.js","assets/photo-DmiVUK2N.js","assets/pilotage-D8kf1Co8.css","assets/Predictions-DQgKHb-D.js","assets/prestataires-Dsa-uVwg.js","assets/Prestataires-lwpig6M_.js","assets/Prets-r_YeE__l.js","assets/prevision-du-mois-pur-BiqzNpDz.js","assets/Previsions-D-0__Buz.css","assets/previsions-pur-BqYYC8ou.js","assets/Previsions-pV6yscgA.js","assets/processus-pur-BLN25j-E.js","assets/Projets-Bhqjrsku.js","assets/Projets-COO7WDEE.css","assets/projets-DwZ89pbG.js","assets/projets-pur-2ZEMRNDU.js","assets/protocoles-CocR4m9L.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-BKE21HIm.js","assets/qualification-DTqk00mg.js","assets/quiz-5qMPWZVi.js","assets/Rapport-C1tiCu_N.js","assets/RattacherUneCarte-SvD_9XDU.js","assets/Recommandations-BC0RGcVO.js","assets/regler-C5hcM02_.css","assets/regler-DKbS7Dvc.js","assets/regler-la-seance-serveur-BpExlC5z.js","assets/relances-pur-DsIo28uB.js","assets/releve-des-avis-H2QWqKiQ.js","assets/SalonFoyer-XNIkWGea.js","assets/secretariat-admin-1goY-CLt.js","assets/Secretariat-Cy79Zw30.css","assets/Secretariat-DI8nuw1Q.js","assets/Signatures-BtL6y0qz.js","assets/SignerUnPdf-CR7irs5h.js","assets/Synthese-CfxoLX_G.js","assets/SyntheseGraphes-_7x3UwUR.js","assets/systeme-C3XFIa8E.css","assets/Tableau-C4ZV8bH-.js","assets/Textes-8YEiJ6oi.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-Bx5bfYdm.js","assets/trace-du-moyen-pur-Bx8-suHn.js","assets/trone-CRYRwI7D.js","assets/trone-ZtHDzaYl.css","assets/ui-CmtCYdMs.js","assets/useAudiences-K5zWuRuW.js","assets/vente-C7YWXkHo.css","assets/Vitrine-BWilTqQJ.css","assets/Vitrine-T85uteSf.js","assets/_admin-CW_kQHrL.js","assets/_contrat-I60-Mcxq.js","assets/_heures-DdpXMv3O.js","assets/_reuni-4-sh-A68.js","assets/_shared-eA2Iiq5c.js","assets/_signature-XwfRZV9J.js","assets/_ui-BSJqX-A3.js","assets/_ui-BWMA-PlM.css"];
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
