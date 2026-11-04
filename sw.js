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
const BUILD = "20261104054321";
const A_GARDER = ["./","assets/abonnements-C1JVlGBN.js","assets/Abonnements-dOmXBy0b.js","assets/Academie-DvNacpPj.js","assets/Acces-BMV01Fis.js","assets/actions-BGoG7e8T.js","assets/afaire-CBZaTWHu.js","assets/AFaire-D4FRgI_U.js","assets/Agents-BhKuH2_P.js","assets/agents-donnees-DYOMgsOe.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-CUIvZjXL.js","assets/Appels-DqDcnmeK.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/Assistants-BOcxTwZO.css","assets/Assistants-cq1FAuRr.js","assets/AtelierDesContenus-CsMUSpya.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/AuComptoir-D76dT1Sw.js","assets/Audience-PXRUKeDa.js","assets/Aujourdhui-BqBcIIxX.js","assets/avant-le-fauteuil-lecture-BtfnoZhQ.js","assets/AvantLeFauteuil-5hNCEaqD.js","assets/avis-fiches-Tydmrn06.js","assets/AvisGoogle-DaPXfwX9.css","assets/AvisGoogle-Yb8ICV-Q.js","assets/bilan-B-bfPYR0.css","assets/bilan-D5TcmsLr.js","assets/BilanMensuel-B40yvWIx.js","assets/Branches-CGrVaxTU.js","assets/bridges-BEt_YWS8.js","assets/Caisse-B7CuM5xJ.js","assets/caisse-du-soir-DuMuqDWe.js","assets/Caisses-dcqDERCa.js","assets/Calendrier-BWaRUTgq.js","assets/campagnes-pur-DT6quorB.js","assets/Carnet-DaS0SjUt.js","assets/carte-CUZ5KHVO.js","assets/carte-_W_-xBPj.css","assets/CarteModal-C3d-q7QI.js","assets/CartesCadeaux-DD7-VBbb.js","assets/Catalogue-Cw0gZjSp.js","assets/CentreDeCommande-CYd6lLkr.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-DG4eYxzy.js","assets/certificat-B20rWcEj.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-DDCBRNxz.js","assets/ChiffreDesPrestations-BWSE3sCv.js","assets/client-CKR86Mmm.js","assets/ClotureDuTiroir-C6vPx-E_.css","assets/ClotureDuTiroir-DAJZPRXL.js","assets/Coffre-7bl7KlkB.js","assets/components-Dnv-WjNB.js","assets/compte-Ci7bTizB.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-BIbJm0vq.js","assets/Comptes-DCIcsNd9.js","assets/Comptoir-D5tl6H3K.js","assets/consultation-C7EN1Pt7.js","assets/consultation-CRW6QcWf.css","assets/Consultations-DBgZCHw-.js","assets/consultNotes-zw-tbOBt.js","assets/Conversations-D4WwB5Zo.css","assets/Conversations-Z8ZHR1Yd.js","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-Dh-0omif.js","assets/currency-qfIhGmrs.js","assets/Customers-BTq5Aw1y.js","assets/Dashboard-B61JcjQk.js","assets/Dashboard-zjGteuUE.css","assets/dates-DkcSwmyw.js","assets/Demandes-DiiObGQE.js","assets/Depenses--ch5nc2k.js","assets/depenses-saisie-C0uSABPp.js","assets/dernier-message-pur-CBYWnq8m.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-g7Hk9Djb.js","assets/diagnostics-au-trone-Tu_AH8QI.js","assets/Dictee-D2P9yM7v.css","assets/Dictee-DQjlnmQ-.js","assets/dictee-pur-6iwjeHej.js","assets/Discussions-B-0A9Wc9.js","assets/EditeurDesOffres-BAXEpIoX.js","assets/Encaissements-CwRgPKiq.js","assets/enfants-BqLmVHI7.js","assets/Engagements-CDPfHHC_.js","assets/Engagements-Cj5S9MhG.css","assets/EntreDeuxSeances-BOcNxI3z.js","assets/equipe-B_9ZHz24.css","assets/Evaluation-9xT9ufTe.js","assets/FacturePrestataire-BKtDQ8vR.js","assets/Factures-CCeFndcV.js","assets/FenetreDesCivilites-h5evrVNl.js","assets/FenetreDesCivilites-zfNk1aak.css","assets/FenetreDuPoint-CQ7DA9JL.js","assets/Fil-B_K7ZwTo.js","assets/finances-BMFnlkRx.css","assets/fon-BZvzWBa4.js","assets/fon-pur-CgVkbJ8O.js","assets/Fournisseurs-BnZ2bxgD.js","assets/fournisseurs-xuo-sd_m.js","assets/foyer-BnuXmoVz.js","assets/Gerard-Bfp4ua88.css","assets/Gerard-CY7sAofU.js","assets/gerard-donnees-BdXONzQE.js","assets/gestes-conversation-BhRsaG37.js","assets/HomeRituals-CgkodfzE.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-BHG4-Asp.js","assets/ia-centre-Sk1GoEkj.js","assets/ia-diagnostic-pur-BBLrGY5l.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-recu-pur-DcucZqpR.js","assets/identite-CKwrs3fG.js","assets/index-CQBJILVa.js","assets/index.es-Cw1TMiqi.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-mvHsahfj.js","assets/jspdf.es.min-CxvF7fyj.js","assets/JustePrix-C-z5p9e_.js","assets/kkiapay-DUcdrDpo.js","assets/kkiapay-widget-DnUhUNd4.js","assets/laboratoire-FCZmK0w0.js","assets/Laboratoire-_b0HB9wf.js","assets/LettresAuDossier-CWcrQqPY.js","assets/LienMndPay-CSZCYfLT.js","assets/maisons-CSSFrqZy.js","assets/Marketing-CpXVa9wA.js","assets/MarketingBranche-qp0VAnyA.js","assets/Marque-BVg8dXpY.js","assets/MesTaches-Cc4XUDf6.css","assets/MesTaches-DeeGt_2x.js","assets/missions-prestataires-D7bd3eFz.js","assets/momo-C2ZVfV9J.js","assets/MonMois-D1mUQyD5.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/objectifs-_OUdt2r1.js","assets/paliers-w9swlevM.js","assets/Parametres-CjMi9VN_.js","assets/parcours-Brh7VURG.js","assets/Parrainages-DtOfqpCf.js","assets/Parrainages-gAHAPB_6.css","assets/PassageAvantLeFauteuil-CuqL5skN.js","assets/pdf-uqIFtPgx.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/Personas-D-v3DxrB.js","assets/Personnel-cKqLcq78.js","assets/photo-DDEDxveN.js","assets/pilotage-D8kf1Co8.css","assets/Predictions-CnCakH_j.js","assets/Prestataires-DbTF9u8j.js","assets/Prets-D3lQJWBw.js","assets/prevision-du-mois-pur-D6sJa5lw.js","assets/Previsions-ADNbp8AA.js","assets/Previsions-D-0__Buz.css","assets/previsions-pur-_q-GxRxM.js","assets/processus-pur-BLN25j-E.js","assets/Projets-COO7WDEE.css","assets/Projets-lW-Vg9cj.js","assets/projets-pur-2ZEMRNDU.js","assets/projets-WfLIA0xf.js","assets/protocoles-COXWtcw7.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-DphQv3vv.js","assets/qualification-C3cpR1VL.js","assets/quiz-5qMPWZVi.js","assets/Rapport-DziI3I5F.js","assets/RattacherUneCarte-myDrHKNT.js","assets/Recommandations-BsPgeXUc.js","assets/regler-C5hcM02_.css","assets/regler-Cv0-P9td.js","assets/regler-la-seance-serveur-Bs6rzqZX.js","assets/relances-pur-lwRTXc5E.js","assets/releve-des-avis-6wBju_UF.js","assets/SalonFoyer-CAPI1xMl.js","assets/secretariat-admin-BP3jja5J.js","assets/Secretariat-Cy79Zw30.css","assets/Secretariat-DU5Qju5P.js","assets/Signatures-CQUv7yoV.js","assets/SignerUnPdf-fgSCzDzw.js","assets/Synthese-g9ifq4TV.js","assets/SyntheseGraphes-CBZrz3cj.js","assets/systeme-TPy-pF7j.css","assets/Tableau-X_ipRX8L.js","assets/temps-BNvM8xgp.js","assets/Textes-DLpOzRbT.css","assets/Textes-Ej3OkFlU.js","assets/tiroirs-DAV94vl9.js","assets/trace-du-moyen-pur-Bx8-suHn.js","assets/trone-BDOXhP0i.js","assets/trone-C7KDWd_F.css","assets/ui-DcmCjoee.js","assets/useAudiences-2GUK2yvm.js","assets/vente-CauXO8yV.css","assets/Vitrine-BWilTqQJ.css","assets/Vitrine-CgrQeSao.js","assets/_admin-Cwlj6Ml9.js","assets/_contrat-BtJBgQdw.js","assets/_heures-CR3daAf5.js","assets/_reuni-DWzLk_0l.js","assets/_shared-DQoRZcwo.js","assets/_signature-Cpgj8fq8.js","assets/_ui-BWMA-PlM.css","assets/_ui-DQEhxzkF.js"];
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
