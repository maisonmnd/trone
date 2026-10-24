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
const BUILD = "20261024203418";
const A_GARDER = ["./","assets/Abonnements-BpHUNe-f.js","assets/abonnements-ByqCfX6h.js","assets/Academie-BIaiAWJz.js","assets/Acces-BXZSMXRE.js","assets/actions-UiCoCg3o.js","assets/AFaire-fFii0EQO.js","assets/afaire-sZfm-aOq.js","assets/Analytics-B8z_V0VO.js","assets/Appels-DQ64KajW.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/AtelierDesContenus-BmUOyoCK.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/AuComptoir-CNMjaeQT.js","assets/Aujourdhui-BJMQSQyZ.js","assets/bilan-B-bfPYR0.css","assets/bilan-wcSIefxG.js","assets/BilanMensuel-qWiIrrGg.js","assets/Branches-B60SPsW3.js","assets/bridges-N9fgE5tR.js","assets/Caisse-B9XjCQZW.js","assets/caisse-du-soir-Bm23Nkvv.js","assets/Caisses-D-NwNiDq.js","assets/Calendrier-DHHYW5IJ.js","assets/Carnet-eEVdnseD.js","assets/carte-IxzzVmBS.js","assets/carte-WI2qP1su.css","assets/CarteModal-C2NPY4WH.js","assets/CartesCadeaux-s9NdKTRF.js","assets/Catalogue-DB5qpgLy.js","assets/CentreDeCommande-Du8kyJhp.css","assets/CentreDeCommande-gNbj6Pqn.js","assets/Cercle-wrFSMSEf.js","assets/certificat-DVSxho5e.css","assets/certificat-JWph_CWS.js","assets/certificats-coffre-DIbus_ZZ.js","assets/chiffre-du-jour-pur-u2RUcDjd.js","assets/ChiffreDesPrestations-BTXV4Hl0.js","assets/ClotureDuTiroir-C6vPx-E_.css","assets/ClotureDuTiroir-RTXE1TsR.js","assets/Coffre-C4wfJtPL.js","assets/components-DSadr-IM.js","assets/compte-4Tdjou_P.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-_FZbWpgc.js","assets/Comptes-BF8m3lLu.js","assets/Comptoir-DxiAh-Nd.js","assets/consultation-CCTm16qX.css","assets/consultation-DWr1WS-S.js","assets/Consultations-Cf4jOYrO.js","assets/consultNotes-BsmZXvRc.js","assets/Conversations-C8wJYzez.js","assets/Conversations-D4WwB5Zo.css","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-lk7zbawo.js","assets/currency-qfIhGmrs.js","assets/Customers-5TyBNYT0.js","assets/Dashboard-B6pE_6DX.js","assets/Dashboard-BrVQ8VVl.css","assets/dates-D3ZJVFTC.js","assets/Demandes-D3d148C5.js","assets/Depenses-CDc33S_Q.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-_NNbLggq.js","assets/diagnostics-au-trone-Detrfwqx.js","assets/Discussions-CShmkUZ6.js","assets/Encaissements-DtEoW4GD.js","assets/enfants-Dqfty8rw.js","assets/Engagements-Cj5S9MhG.css","assets/Engagements-MWn1QWsB.js","assets/EntreDeuxSeances-DYk4OOI0.js","assets/equipe-B_9ZHz24.css","assets/Evaluation-AKWbYeeV.js","assets/FacturePrestataire-Q1f1X_5u.js","assets/Factures-Pg8mqYMn.js","assets/Fil-WGKZ-N2V.js","assets/finances-CCjqAkCE.css","assets/Fournisseurs-DZKWl7RG.js","assets/fournisseurs-pRSzFIBo.js","assets/foyer-D_fSv49T.js","assets/gestes-conversation-wE1dy9dI.js","assets/HomeRituals-DTUzYtLt.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-n5bldj_b.js","assets/ia-diagnostic-pur-BulIFgZQ.js","assets/ia-recu-pur-DcucZqpR.js","assets/identite-C8PxWFLt.js","assets/index-DHwzcUCA.js","assets/index.es-UV0hhuij.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-BQjk5Mvh.js","assets/jspdf.es.min-k2BjGsjb.js","assets/JustePrix-ebOEsHjU.js","assets/kkiapay-DHfwIiz0.js","assets/Laboratoire-B_YO1ZKP.js","assets/laboratoire-Cq87QCoJ.js","assets/LettresAuDossier-88HB1G36.js","assets/LienMndPay-CnonBGDm.js","assets/maisons-CSSFrqZy.js","assets/Marketing-CnlwDyXi.js","assets/Marque-DlZ4sBvR.js","assets/MesTaches-B1mCpRZM.js","assets/MesTaches-Cc4XUDf6.css","assets/momo-C2ZVfV9J.js","assets/MonMois-oAoWXsda.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-BOvGEu7r.js","assets/paliers-BBCtFfRg.js","assets/Parametres-BqlD_dSC.js","assets/parcours-8A1SOSIE.js","assets/Parrainages-ClUCsZo9.js","assets/Parrainages-gAHAPB_6.css","assets/pdf-BLV3OGZD.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/Personas-QVs9Wi0A.js","assets/Personnel-Bd8LXtoz.js","assets/photo-Bb2A3qi_.js","assets/pilotage-D8kf1Co8.css","assets/Predictions-6uX87sKC.js","assets/prestataires-B5SP9EKA.js","assets/Prestataires-jpQfDQu8.js","assets/Prets-B8sqC00D.js","assets/Projets-CgCCpgka.js","assets/Projets-COO7WDEE.css","assets/projets-DYx312nr.js","assets/projets-pur-2ZEMRNDU.js","assets/protocoles-DzKsPTPF.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-CcuRQzsQ.js","assets/qualification-pNnxlZbC.js","assets/quiz-5qMPWZVi.js","assets/Rapport-CIDTvKTM.js","assets/RattacherUneCarte-DomPcZQ_.js","assets/Recommandations-WGgZ08ZO.js","assets/relances-pur-DsIo28uB.js","assets/releve-des-avis-Bm42Dvcl.js","assets/SalonFoyer-DDlIkQC9.js","assets/secretariat-admin-DjMLCh6i.js","assets/Secretariat-Cy79Zw30.css","assets/Secretariat-KwVOf7Vq.js","assets/Signatures-CM8zjK_4.js","assets/SignerUnPdf-s29_0egP.js","assets/Synthese-BxJpBJQQ.js","assets/systeme-C3XFIa8E.css","assets/Tableau-C8KN-iEs.js","assets/Textes-B68FX8o7.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-D9XfzqAp.js","assets/trace-du-moyen-pur-Cb3Gcky8.js","assets/trone-Bv3EUzvb.css","assets/trone-CNtJuu6E.js","assets/ui-CC_0aq2b.js","assets/useAudiences-uQ2KL2XB.js","assets/vente-C7YWXkHo.css","assets/Vitrine-BHnSBR_-.js","assets/Vitrine-BON6rcdB.css","assets/_admin-nNKFHVhg.js","assets/_contrat-ffse0tEx.js","assets/_heures-B60BDoCP.js","assets/_reuni-CYSOQDBA.js","assets/_shared-DzPFBKae.js","assets/_signature-sTFIGov1.js","assets/_ui-B5U38lGi.js","assets/_ui-BWMA-PlM.css"];
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
