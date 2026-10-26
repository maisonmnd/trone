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
const BUILD = "20261026141947";
const A_GARDER = ["./","assets/abonnements-BcTPaU4j.js","assets/Abonnements-DgnCt3_n.js","assets/Academie-CMS6mt4f.js","assets/Acces-DdkA7MY9.js","assets/actions-Dn6fppTZ.js","assets/afaire-BphB23Xz.js","assets/AFaire-WYmTfN9Q.js","assets/Agents-DFl9a4CE.js","assets/agents-donnees-BP1bCacU.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-CnN9ZEcy.js","assets/Appels-lPaOYlhq.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/AtelierDesContenus-DJXHulfj.js","assets/AuComptoir-gagia54o.js","assets/Aujourdhui-B2UqcfFm.js","assets/avis-fiches-B1zP5sZv.js","assets/AvisGoogle-CA7Tk_eP.js","assets/AvisGoogle-DaPXfwX9.css","assets/bilan-B-bfPYR0.css","assets/bilan-B_SlxaP8.js","assets/BilanMensuel-ByWrvzbO.js","assets/Branches-DW2rInLQ.js","assets/bridges-BpnXwFVm.js","assets/Caisse-ByywHFfA.js","assets/caisse-du-soir-DLv-p-W2.js","assets/Caisses-WrCM_oy_.js","assets/Calendrier-B_MpGx1p.js","assets/Carnet-CNlroBX5.js","assets/carte-BAM76awp.js","assets/carte-_W_-xBPj.css","assets/CarteModal-Bp32Yeu-.js","assets/CartesCadeaux-CJBKRg2C.js","assets/Catalogue-C-rkmP7O.js","assets/CentreDeCommande-CfRLw8lW.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-DpDHkqqL.js","assets/certificat-D1GLYVGq.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-BpOx_Sz3.js","assets/chiffre-du-jour-pur-DpBouRDE.js","assets/ChiffreDesPrestations-BIxhc0sl.js","assets/client-gM5iuIef.js","assets/ClotureDuTiroir-C6vPx-E_.css","assets/ClotureDuTiroir-LaTQSo6q.js","assets/Coffre-DSlhRcVP.js","assets/components-CqQUJAIx.js","assets/compte-C2SBcb2L.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-CvayCyoI.js","assets/Comptes-BU7cvnsk.js","assets/Comptoir-CSCe2PwG.js","assets/consultation-CRW6QcWf.css","assets/consultation-YydFBEGI.js","assets/Consultations-DGf3a8Lp.js","assets/consultNotes-BZRbVlS5.js","assets/Conversations-D4WwB5Zo.css","assets/Conversations-erd-DXlF.js","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-vYbUkwrJ.js","assets/currency-qfIhGmrs.js","assets/Customers-IsKqxOdX.js","assets/Dashboard-B8qK6Flt.css","assets/Dashboard-CZVPwh-O.js","assets/dates-Dp7SwFFG.js","assets/Demandes-VBTg66p8.js","assets/Depenses-DRnUdKCM.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-CvnWNzkn.js","assets/diagnostics-au-trone-fir-9AzI.js","assets/Discussions-C9tZROC_.js","assets/Encaissements-y8ZmFF4H.js","assets/enfants-DWt8p2e7.js","assets/Engagements-Cj5S9MhG.css","assets/Engagements-D0ZUj3tH.js","assets/EntreDeuxSeances-DeYhxjEO.js","assets/equipe-B_9ZHz24.css","assets/Evaluation-Bb6asl6A.js","assets/FacturePrestataire-CgnA54Xe.js","assets/Factures-DJrNVdIQ.js","assets/Fil-WYjPLRUO.js","assets/finances-BMFnlkRx.css","assets/fon-MlR95Xr9.js","assets/fon-pur-CgVkbJ8O.js","assets/fournisseurs-Cr2dnaGt.js","assets/Fournisseurs-QtmljwDl.js","assets/foyer-DA8OHr6F.js","assets/gestes-conversation-CNGQQUeW.js","assets/HomeRituals-BOG-oSOD.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-Cvz43Qwb.js","assets/ia-diagnostic-pur-BulIFgZQ.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-recu-pur-DcucZqpR.js","assets/identite-DgNhC5UF.js","assets/index-GnWpPzhI.js","assets/index.es-p_OxnjPo.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-BCG5elvt.js","assets/jspdf.es.min-DXaxDDsw.js","assets/JustePrix-CbIWe7is.js","assets/kkiapay-sEAMFskz.js","assets/kkiapay-widget-DnUhUNd4.js","assets/laboratoire-BFS9iB94.js","assets/Laboratoire-CnpXDeUK.js","assets/LettresAuDossier-GVR4T7iH.js","assets/LienMndPay-BwGAI1Xl.js","assets/maisons-CSSFrqZy.js","assets/Marketing-3wQ4Yx1O.js","assets/Marque-AjHmJGhc.js","assets/MesTaches-Cc4XUDf6.css","assets/MesTaches-dsZJXwpI.js","assets/momo-C2ZVfV9J.js","assets/MonMois-d481BdiD.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-BZ839pyK.js","assets/objectifs-des-fauteuils-pur-CW46U8VG.js","assets/paliers-p3kXj44w.js","assets/Parametres-BSUHGzSp.js","assets/parcours-CBSEowqc.js","assets/Parrainages-Cdo4_o8d.js","assets/Parrainages-gAHAPB_6.css","assets/pdf-DIpOOHpU.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/Personas-Bb9jAZ-0.js","assets/Personnel-DmV2sBRb.js","assets/photo-asMHiYKb.js","assets/pilotage-D8kf1Co8.css","assets/Predictions-DSZwocoN.js","assets/prestataires-CKeXRK08.js","assets/Prestataires-VSkNTe7F.js","assets/Prets-BlaECSPY.js","assets/prevision-du-mois-pur-BiqzNpDz.js","assets/Previsions-D-0__Buz.css","assets/Previsions-DkRQZAn6.js","assets/projets-Bflpjixm.js","assets/Projets-BQWzbHAd.js","assets/Projets-COO7WDEE.css","assets/projets-pur-2ZEMRNDU.js","assets/protocoles-Rmg5o7GG.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-DNodcQ3L.js","assets/qualification-BFjIfv8X.js","assets/quiz-5qMPWZVi.js","assets/Rapport-C-s6Abrv.js","assets/RattacherUneCarte-BWRTiDNG.js","assets/Recommandations-CVp4ussA.js","assets/regler-BUgquVjW.js","assets/regler-C5hcM02_.css","assets/regler-la-seance-serveur-BpExlC5z.js","assets/relances-pur-DsIo28uB.js","assets/releve-des-avis-BOPIg3_O.js","assets/SalonFoyer-4H6UYgk-.js","assets/secretariat-admin-BfrWbCoL.js","assets/Secretariat-Cy79Zw30.css","assets/Secretariat-Dqk_8lnE.js","assets/Signatures-Uzdrnb8m.js","assets/SignerUnPdf-rMmC5_hx.js","assets/Synthese-DpILOYkK.js","assets/SyntheseGraphes-DR-5Jlr7.js","assets/systeme-C3XFIa8E.css","assets/Tableau-Bmsf1KI7.js","assets/Textes-6ifTM5kr.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-BqEv1Cug.js","assets/trace-du-moyen-pur-Bx8-suHn.js","assets/trone-D09d8uR2.js","assets/trone-DQkO48Va.css","assets/ui-BD5oTMX4.js","assets/useAudiences-Cd-pNbvj.js","assets/vente-C7YWXkHo.css","assets/Vitrine-BWilTqQJ.css","assets/Vitrine-D4A5a0uD.js","assets/_admin-BZxkcU8k.js","assets/_contrat-C4kP187w.js","assets/_heures-BnkAQ91n.js","assets/_reuni-NRB3rlIy.js","assets/_shared-XYBfS8c5.js","assets/_signature-ChZwyoSv.js","assets/_ui-BWMA-PlM.css","assets/_ui-hwtXkjUy.js"];
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
