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
const BUILD = "20261025074041";
const A_GARDER = ["./","assets/abonnements-8VX2Cii_.js","assets/Abonnements-DmWuKzqV.js","assets/Academie-DYllmW9n.js","assets/Acces-CNmIPlrv.js","assets/actions-RTEyLy5Y.js","assets/AFaire-f_Eocx2E.js","assets/afaire-p0EtHeL4.js","assets/Agents-DA4ZhxeL.js","assets/agents-donnees-wFGF6vDn.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-Dh9AgrKg.js","assets/Appels-CRk07zwS.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/AtelierDesContenus-CkBoFpps.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/AuComptoir-DA3x-s7o.js","assets/Aujourdhui-Bjzg8SOb.js","assets/avis-fiches-BkT1TNsI.js","assets/bilan-B-bfPYR0.css","assets/bilan-BUq8w5GF.js","assets/BilanMensuel-Cb-ey0u5.js","assets/Branches-cQndHmfE.js","assets/bridges-B8Mk1bGF.js","assets/Caisse-AlcEmVoQ.js","assets/caisse-du-soir-Lm1vCCph.js","assets/Caisses-Fuy7A_Mb.js","assets/Calendrier-D8ZF-jvW.js","assets/Carnet-DxdtlKSh.js","assets/carte-CLk9flDi.js","assets/carte-DWlSbalk.css","assets/CarteModal-Duhr33N_.js","assets/CartesCadeaux-BPuzhqGT.js","assets/Catalogue-g9jmlUhy.js","assets/CentreDeCommande-Bumj4oJP.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-IFRK89hf.js","assets/certificat-9_XWf1iQ.css","assets/certificat-CHpAsagr.js","assets/certificats-coffre-CEbCArBz.js","assets/chiffre-du-jour-pur-CR4YQ5C3.js","assets/ChiffreDesPrestations-CGnauTdX.js","assets/ClotureDuTiroir-C6vPx-E_.css","assets/ClotureDuTiroir-DRCttERO.js","assets/Coffre-D1EbQib7.js","assets/components-BHEkn6l4.js","assets/compte-courant-ByzulCEN.js","assets/compte-D5h_4VUG.js","assets/CompteCourant-BDTB7AZ2.js","assets/Comptes-D0eCpXHE.js","assets/Comptoir-nw98VhcR.js","assets/consultation-BIA7R173.js","assets/consultation-DQBnwlMN.css","assets/Consultations-ta8SxhoJ.js","assets/consultNotes-mGuxaAgO.js","assets/Conversations-BHHQ9Fnv.js","assets/Conversations-D4WwB5Zo.css","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-DSdAtXiw.js","assets/currency-qfIhGmrs.js","assets/Customers-CrkFfmTk.js","assets/Dashboard-B8qK6Flt.css","assets/Dashboard-DOru4o8n.js","assets/dates-CfYX601O.js","assets/Demandes-Cmk5L0PQ.js","assets/Depenses-D4yU10Su.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-DQXVR0J3.js","assets/diagnostics-au-trone-eiuwqkTm.js","assets/Discussions-DSsCxEU5.js","assets/Encaissements-8Wk81TZs.js","assets/enfants-w7lwfij3.js","assets/Engagements-Cj5S9MhG.css","assets/Engagements-CmLyHYZM.js","assets/EntreDeuxSeances-BVjbKSFJ.js","assets/equipe-B_9ZHz24.css","assets/Evaluation-BBnojw_G.js","assets/FacturePrestataire-D2ZAFUCU.js","assets/Factures-DgES6VgO.js","assets/Fil-gNFqDcdj.js","assets/finances-BMFnlkRx.css","assets/Fournisseurs-C4Sx08M8.js","assets/fournisseurs-U9ghThAE.js","assets/foyer-C8kuP4nl.js","assets/gestes-conversation-fsp0IZ8q.js","assets/HomeRituals-v5wfMQiR.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-CI0c1K5W.js","assets/ia-diagnostic-pur-BulIFgZQ.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-recu-pur-DcucZqpR.js","assets/identite-gFlXdt6V.js","assets/index-D49wSoXY.js","assets/index.es-BDDlFD5u.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-CzUzQL6e.js","assets/jspdf.es.min-VrX7mFYT.js","assets/JustePrix-BbMw5-Jp.js","assets/kkiapay-Ceuz1qST.js","assets/Laboratoire-B2rL2W9Z.js","assets/laboratoire-D6vS0BIa.js","assets/LettresAuDossier-CZhgfM15.js","assets/LienMndPay-sMZ5n0-c.js","assets/maisons-CSSFrqZy.js","assets/Marketing-jEnIidMU.js","assets/Marque-C_3khKSY.js","assets/MesTaches-AXkSLv-G.js","assets/MesTaches-Cc4XUDf6.css","assets/momo-C2ZVfV9J.js","assets/MonMois-Bd1O8UPA.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-DxFkL4NY.js","assets/paliers-DFfNYRgM.js","assets/Parametres-dWtT1yI6.js","assets/parcours-C5_capvu.js","assets/Parrainages-gAHAPB_6.css","assets/Parrainages-hT6990Sx.js","assets/pdf-TVYzUcU6.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/Personas-C7XY_6V_.js","assets/Personnel-Bmeio-Ki.js","assets/photo-C9kgixUr.js","assets/pilotage-D8kf1Co8.css","assets/Predictions-CI8Njh12.js","assets/Prestataires-8oTU8ZqS.js","assets/prestataires-BvRR3waA.js","assets/Prets-DUCK_HZ-.js","assets/projets-CI5KtXgy.js","assets/Projets-COO7WDEE.css","assets/projets-pur-2ZEMRNDU.js","assets/Projets-rVivEvVZ.js","assets/protocoles-CBmO1h_V.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-BVlYIzC4.js","assets/qualification-CEJli8u2.js","assets/quiz-5qMPWZVi.js","assets/Rapport-HWrXGC2k.js","assets/RattacherUneCarte-Ft4oepeq.js","assets/Recommandations-DkiV5FHt.js","assets/relances-pur-DsIo28uB.js","assets/releve-des-avis-DTeecys5.js","assets/SalonFoyer-DNoFBV5Q.js","assets/secretariat-admin-D1PClTHr.js","assets/Secretariat-Cy79Zw30.css","assets/Secretariat-DjUERyEi.js","assets/Signatures--GO6HaxL.js","assets/SignerUnPdf-BeTV2VYh.js","assets/Synthese-B72ZkqFo.js","assets/SyntheseGraphes-D7E6udS3.js","assets/systeme-C3XFIa8E.css","assets/Tableau-Dq7AgpPo.js","assets/Textes-BykRkjsy.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-Cmj1dQcx.js","assets/trace-du-moyen-pur-Cb3Gcky8.js","assets/trone-CzEqXnm_.js","assets/trone-DkFoZCYr.css","assets/ui-DsEt7JGD.js","assets/useAudiences-x8b64m09.js","assets/vente-C7YWXkHo.css","assets/Vitrine-Cs-c3_Mr.css","assets/Vitrine-DSZI4USA.js","assets/_admin-SeMuR751.js","assets/_contrat-BYiZdqmt.js","assets/_heures-DOsm4NNm.js","assets/_reuni-C39Xt9NK.js","assets/_shared-o7uzkPiT.js","assets/_signature-ClBhRPVo.js","assets/_ui-BWMA-PlM.css","assets/_ui-CKRUjeEU.js"];
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
