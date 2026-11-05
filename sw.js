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
const BUILD = "20261105134305";
const A_GARDER = ["./","assets/Abonnements-BSzggeSO.js","assets/abonnements-JBKg0XI1.js","assets/Academie-aYw0lrDd.js","assets/Acces-CBFAAicP.js","assets/AFaire-dRG7ktf4.js","assets/afaire-EQ0MZIUL.js","assets/Agents-CC3mkhDJ.js","assets/agents-donnees-CMlx1laN.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-DDErnBWR.js","assets/Appels-C7i6BZMq.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/Assistants-Cn4mR0YN.js","assets/Assistants-D9i2Xwmg.css","assets/AtelierDesContenus-5g5dQIXJ.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/Audience-CgaDo2lX.js","assets/Aujourdhui-C58y-lrW.js","assets/avant-le-fauteuil-lecture-Dn5HkDk7.js","assets/AvantLeFauteuil-BPLbriQY.js","assets/avis-fiches-Czx9KT3I.js","assets/AvisGoogle-Bgyro2Y7.js","assets/AvisGoogle-DaPXfwX9.css","assets/bilan-7XQNTxyX.js","assets/bilan-B-bfPYR0.css","assets/BilanMensuel-wNN6xrcP.js","assets/Branches-Dx5TEDWV.js","assets/bridges-BtK31gFJ.js","assets/Caisse-D8rgApgm.js","assets/caisse-du-soir-C6vPx-E_.css","assets/caisse-du-soir-D8yMJtXg.js","assets/Caisses-B8bwR48y.js","assets/Calendrier-DNNVFe3h.js","assets/campagnes-pur-ozdud6ZL.js","assets/Carnet-C_KZUL0I.js","assets/carte-DeR5Xz6U.js","assets/carte-_W_-xBPj.css","assets/CarteModal-n7Ey2SrX.js","assets/CartesCadeaux-Do1zRhmv.js","assets/Catalogue-BWLqG5RC.js","assets/CentreDeCommande-dLuMhEDz.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-B5sVolPv.js","assets/certificat-Y-0M0K__.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-sySZOnVC.js","assets/chiffre-du-jour-pur-DGTGKcsi.js","assets/ChiffreDesPrestations-DnM7TQvj.js","assets/client-CG5sDa9b.js","assets/cloture-du-jour-B5IN_1jM.js","assets/ClotureDuTiroir-D4ibbMg4.js","assets/Coffre-ByQz6SjZ.js","assets/components-BFYcylxV.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-C6DmNqd4.js","assets/Comptes-DtuYyQx7.js","assets/consultation-bk_-_vtL.js","assets/consultation-CRW6QcWf.css","assets/Consultations-Dm4lwc4k.js","assets/consultNotes-BfqslFaS.js","assets/Conversations-CB99im_7.js","assets/Conversations-D4WwB5Zo.css","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-Do5tuWEF.js","assets/currency-qfIhGmrs.js","assets/Customers-ETXV6iSd.js","assets/Dashboard-B2x7VsE_.css","assets/Dashboard-CkgO5g4k.js","assets/dates-DeuxoHpB.js","assets/Demandes-CHKrIyUU.js","assets/DepenseEnUnePhrase-BIGRlGqP.css","assets/DepenseEnUnePhrase-BJRRu15P.js","assets/Depenses-Bas7evWg.js","assets/depenses-saisie--CoL3K8K.js","assets/dernier-message-pur-CBYWnq8m.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-Co92uvTb.js","assets/diagnostics-au-trone-DTX1FF2V.js","assets/Dictee-CmbAF7V1.js","assets/Dictee-D2P9yM7v.css","assets/dictee-pur-Ijzo8Gy8.js","assets/Discussions-_5P-_0iu.js","assets/EditeurDesOffres-DVloaVgm.js","assets/Encaissements-xUBCnOcE.js","assets/enfants-oTJ4_Qcw.js","assets/Engagements-Brs1nd9v.js","assets/Engagements-Cj5S9MhG.css","assets/EntreDeuxSeances-FUHgTB4F.js","assets/Evaluation-Dhdwjurb.js","assets/Factures-B8vtbRft.js","assets/FenetreDesCivilites-NfWbOfnt.js","assets/FenetreDesCivilites-zfNk1aak.css","assets/FenetreDuPoint-CGwWto78.js","assets/Fil-Ei3aZvD3.js","assets/finances-BMFnlkRx.css","assets/fon-C8QP990G.js","assets/Fournisseurs-CchFDoqC.js","assets/fournisseurs-CXLGRjKX.js","assets/foyer-B9C_V_N7.js","assets/Gerard-6ZxvhfDY.js","assets/Gerard-CP3QOjfk.css","assets/gerard-donnees-BB87uGne.js","assets/gestes-conversation-VMjPoHlO.js","assets/HomeRituals-tjI8fzHl.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-DgRQi98Q.js","assets/ia-centre-CD96x8YQ.js","assets/ia-diagnostic-pur-BBLrGY5l.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-tableau-pur-CSRjGtTf.js","assets/identite-DRGmu0u8.js","assets/index-BfmQCOnu.js","assets/index.es-BtDD2Zjs.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-ZHA50jrs.js","assets/jspdf.es.min-CiyWXg6I.js","assets/JustePrix-CGdywXCq.js","assets/kkiapay-CH3ni0U_.js","assets/kkiapay-widget-DnUhUNd4.js","assets/Laboratoire-D3TQ5KMq.js","assets/LaJournee-Ds6688EE.js","assets/LaJournee-yFR4ZF68.css","assets/LettresAuDossier-C6MLpWUP.js","assets/LienMndPay-DvHGGXgh.js","assets/Marketing-CcLI5MJe.js","assets/MarketingBranche-BAP0o7yP.js","assets/Marque-Be6Io8bJ.js","assets/MesPourboires-D9I_9rZf.css","assets/MesPourboires-DbwzwTys.js","assets/MesTaches-Cc4XUDf6.css","assets/MesTaches-DqubuVp4.js","assets/momo-C2ZVfV9J.js","assets/MonMois-CJHnQ8Uc.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-DdKTm6Iu.js","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/opale-3nyU24Jr.js","assets/oreille-B1AMUmZh.js","assets/paie-du-5-Bfz3EdaR.js","assets/paie-du-5-DIpy8pFw.css","assets/paliers-Dks_lr2c.js","assets/Parametres-ByNXHKAt.js","assets/parcours-DOCHL9RT.js","assets/Parrainages-BqUK63W2.js","assets/Parrainages-gAHAPB_6.css","assets/PassageAvantLeFauteuil-DQ5t-9Mv.js","assets/pdf-VJcNm7C7.js","assets/pdf-ZOB_JtT1.js","assets/pdf.worker.min-uNib_u9P.js","assets/Personas-Dc_Q753m.js","assets/Personnel-8eaw9rmI.js","assets/photo-7H_BKUjQ.js","assets/pilotage-D8kf1Co8.css","assets/Pourboires-DZPS94ks.js","assets/Predictions-CnsL_VtB.js","assets/Prestataires-h-oO9Krb.js","assets/Prets-dG-cVTlB.js","assets/PrevisionDuMois-DlFTw3OX.css","assets/PrevisionDuMois-JQK65lIh.js","assets/Previsions-CKfZfYbX.js","assets/previsions-pur-Bjn_adSb.js","assets/Previsions-r4v19Anp.css","assets/processus-pur-R6U5QcCi.js","assets/projets-BO9Quuv2.js","assets/Projets-CJ_ixkmc.js","assets/Projets-COO7WDEE.css","assets/projets-pur-2ZEMRNDU.js","assets/protocoles-EZz2cTQu.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-Ox1eM1HX.js","assets/qualification-BFrJnXn0.js","assets/quiz-5qMPWZVi.js","assets/Rapport-tncP7Fft.js","assets/Recommandations-Ckm_j8dH.js","assets/regler-BrG0xZrf.js","assets/regler-C5hcM02_.css","assets/regler-la-seance-serveur-Bs6rzqZX.js","assets/relances-pur-lwRTXc5E.js","assets/releve-des-avis-BZHYNcMn.js","assets/SalonFoyer-hL9_4WhV.js","assets/secretariat-admin-CATa-uvJ.js","assets/Secretariat-BhoesLXK.js","assets/Secretariat-Cy79Zw30.css","assets/Signatures-Df5bJGXC.js","assets/SignerUnPdf-DNToGypO.js","assets/Synthese-D62KMgZl.js","assets/SyntheseGraphes-JnJLam46.js","assets/systeme-TPy-pF7j.css","assets/Tableau-Cfu7v1Jv.js","assets/temps-Bv0dwH07.js","assets/Textes-Ck1J0vL5.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-CkDzpGy0.css","assets/tiroirs-D2ijdviJ.js","assets/trone-DQVzvvmA.css","assets/trone-DtvNoVVT.js","assets/useAudiences-CaxAmWgm.js","assets/useClotureDuJour-DRxXgvd1.js","assets/Vitrine-BWilTqQJ.css","assets/Vitrine-CkTWJ3Tm.js","assets/_admin-BjMLeaTq.js","assets/_contrat-Dek5rUeO.js","assets/_heures-Dvh1FluP.js","assets/_reuni-BBB8lN-w.js","assets/_shared-Dby178L3.js","assets/_signature-WRZQgS88.js","assets/_ui-BWMA-PlM.css","assets/_ui-djP3O6TG.js"];
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
