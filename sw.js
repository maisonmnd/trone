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
const BUILD = "20261112110056";
const A_GARDER = ["./","assets/abonnements-Ce0p05Zk.js","assets/Abonnements-DE9Nbn9x.js","assets/Abonnements-DTY7p2DH.css","assets/Academie-Uhp_Oq1j.js","assets/Acces-C0SWZ4Hz.js","assets/AFaire-32tezmVD.js","assets/afaire-Bs8tw5pU.js","assets/Agents-DfMBPqDH.js","assets/agents-donnees-LNfxTxU_.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-v3DqE7S4.js","assets/Appels-Ce7HHo7k.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/Assistants-C6G45oF1.js","assets/Assistants-D9i2Xwmg.css","assets/AtelierDesContenus-CtLnqAGj.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/Audience-DY7lXleD.js","assets/Aujourdhui-DrZNnBKW.js","assets/avant-le-fauteuil-lecture-C9vvYNpW.js","assets/AvantLeFauteuil-a4CBqSZg.js","assets/avis-fiches-DwYdTzFi.js","assets/AvisGoogle-DaPXfwX9.css","assets/AvisGoogle-DXNyXyT8.js","assets/BadgeEssai-BMs14UZ3.js","assets/bilan-B-bfPYR0.css","assets/bilan-BMphds_I.js","assets/BilanMensuel-RWeeC7Pq.js","assets/Branches-VHQfXQgH.js","assets/bridges-C-izCQ_K.js","assets/caisse-du-soir-C6vPx-E_.css","assets/caisse-du-soir-CRjjqpG1.js","assets/Caisse-EkUbPDoJ.js","assets/Caisses-DeiELnvh.js","assets/Calendrier-DJfd6Vqc.js","assets/campagnes-pur-I_LJkxjQ.js","assets/Carnet-Ce1iGtCI.js","assets/carte-DEHI_xar.js","assets/carte-_W_-xBPj.css","assets/CarteModal-BhCHuQO1.js","assets/CartesCadeaux-CwGCTJmd.js","assets/Catalogue-C3FO5ybE.js","assets/CentreDeCommande-Du8kyJhp.css","assets/CentreDeCommande-uaTS0SRQ.js","assets/Cercle-wuAJCFCC.js","assets/certificat-DJf-anXn.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-B-QjPoeS.js","assets/chiffre-du-jour-pur-Bst3wigE.js","assets/ChiffreDesPrestations-Bd9BrY2R.js","assets/client-CWAItC0y.js","assets/cloture-du-jour-BZWz4N6H.js","assets/ClotureDuTiroir-CnpGbVcg.js","assets/Coffre-Hg3L4iGj.js","assets/collecte-mtn-pur-DW4nw7-V.js","assets/components-DEzq4jHO.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-CRCFp9a0.js","assets/Comptes-Bk4DWhwF.js","assets/consultation-Bb5GH5Fe.js","assets/consultation-CRW6QcWf.css","assets/Consultations-Cz-PQAEM.js","assets/consultNotes-CKsXmtrF.js","assets/Conversations-D4WwB5Zo.css","assets/Conversations-zmu6r1n4.js","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-BBeYIwMX.js","assets/currency-qfIhGmrs.js","assets/Customers-C_1H0RI4.js","assets/Dashboard-B2x7VsE_.css","assets/Dashboard-B4KBaRwU.js","assets/dates-BmJHFbS8.js","assets/Demandes-CsYKlhjk.js","assets/DepenseEnUnePhrase-BcrNkx7X.js","assets/DepenseEnUnePhrase-BIGRlGqP.css","assets/Depenses-BHndd014.js","assets/depenses-saisie-By8xnmWN.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-CMyhxEcW.js","assets/diagnostics-au-trone-CUKEQibG.js","assets/Dictee-D2P9yM7v.css","assets/Dictee-DrFfldxX.js","assets/dictee-pur-DBFv7brC.js","assets/Discussions-CKN6ZHn8.js","assets/EditeurDesOffres-sbZvNZy4.js","assets/Encaissements-BjO_C1FB.js","assets/enfants-DAeEohwy.js","assets/Engagements-Cj5S9MhG.css","assets/Engagements-CO2V7X9h.js","assets/engagements-coffre-BsExG8x6.js","assets/EntreDeuxSeances-hA3t6S-P.js","assets/Evaluation-5S_Kx-Z5.js","assets/facture-BLaFNoM3.js","assets/Factures-oh6xUB90.js","assets/FenetreDesCivilites-9LCzDHFA.js","assets/FenetreDesCivilites-zfNk1aak.css","assets/FenetreDuPoint-h1I0ik5T.js","assets/Fil-Dlrmj7y6.js","assets/finances-Ds4kOIUN.css","assets/fon-7Cn_12w4.js","assets/fournisseurs-7nNR1rUH.js","assets/Fournisseurs-Dv2Ry8O6.js","assets/foyer-CQeIQRsw.js","assets/Gerard-Cgj-zsJh.css","assets/Gerard-Ct5GCRoW.js","assets/gerard-donnees-B1VYgnEl.js","assets/gestes-conversation-DlOs9mzh.js","assets/heures-des-rappels-pur-Dig9pZpo.js","assets/HomeRituals-L6MWhXTV.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-C2B_ZbPX.js","assets/ia-centre-Dlm6JfQP.js","assets/ia-diagnostic-pur-BBLrGY5l.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-tableau-pur-p6UvREJe.js","assets/identite-uSotc5te.js","assets/index-CDkuWbmX.js","assets/index.es-COg7ttIV.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-BF7ULlWu.js","assets/jspdf.es.min-CzXAA9_E.js","assets/JustePrix-DU1z_Qb0.js","assets/kkiapay-Dow9zl5C.js","assets/kkiapay-widget-DnUhUNd4.js","assets/Laboratoire-DiyYrmDs.js","assets/LaJournee-Bn_G0HCt.css","assets/LaJournee-DMlIUE46.js","assets/LesPaiements-C9cEZlne.css","assets/LesPaiements-DgjgqDEv.js","assets/LettresAuDossier-OI4XkUAJ.js","assets/LienMndPay-BsI501Ve.js","assets/Marketing-CcCQnw6c.js","assets/MarketingBranche-Ba33QsSz.js","assets/Marque-Cr3iGzXB.js","assets/MesPourboires-CENjelyb.css","assets/MesPourboires-j3AiOZWU.js","assets/MesTaches-Cc4XUDf6.css","assets/MesTaches-DXH8y272.js","assets/momo-C2ZVfV9J.js","assets/MonMois-Dz-1SS79.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/MtnMoMo-ChB9Cuw8.js","assets/objectifs-BjwPg81f.js","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/opale-DhkDS7OW.js","assets/oreille-B1AMUmZh.js","assets/paie-du-5-D-b2jZo-.js","assets/paie-du-5-DeJq-K_U.css","assets/paie-du-5-pur-CPiCK8fv.js","assets/paie-par-mtn-Dsf_RUb9.js","assets/PaieParMtn-DIDLrSRZ.js","assets/paliers-XvY8tuaT.js","assets/Parametres-Dosi_2Ax.js","assets/parcours-Cfek0ZSh.js","assets/Parrainages-DHXengcH.js","assets/Parrainages-gAHAPB_6.css","assets/PassageAvantLeFauteuil-BLi_LpGT.js","assets/pdf-VJcNm7C7.js","assets/pdf-yLtd7E0g.js","assets/pdf.worker.min-uNib_u9P.js","assets/periode-des-pourboires-pur-BUWqfwov.js","assets/Personas-ClphC3U_.js","assets/Personnel-jSSu4rvY.js","assets/photo-BSsKxupq.js","assets/pilotage-D8kf1Co8.css","assets/Pourboires-B4Ep8X8m.js","assets/Predictions-jabFcs17.js","assets/Prestataires-BCmzshSC.js","assets/Prets-CRBwTqom.js","assets/PrevisionDuMois-BXxsMRfR.js","assets/PrevisionDuMois-DlFTw3OX.css","assets/Previsions-9BU2Vg1T.css","assets/Previsions-Dmxpm4Au.js","assets/previsions-pur-DBYi_L2b.js","assets/processus-pur-R6U5QcCi.js","assets/Projets-COO7WDEE.css","assets/Projets-DF5-aLph.js","assets/projets-DsYkj0Q1.js","assets/projets-pur-2ZEMRNDU.js","assets/protocoles-CQa5B_xB.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-IZ60Xoah.js","assets/qualification-B0u58o1Z.js","assets/quiz-5qMPWZVi.js","assets/Rapport-DnMUUPD4.js","assets/Recommandations-Dg5Eo0Cl.js","assets/regler-CfKt5vnz.js","assets/regler-DHR_B1Dm.css","assets/relances-pur-BacTXlI2.js","assets/releve-des-avis-BM3iykD-.js","assets/SalonFoyer-Cgnk5Qe0.js","assets/secretariat-admin-rz4USGZU.js","assets/Secretariat-BC_U1Y5O.js","assets/Secretariat-Cy79Zw30.css","assets/Signatures-Cg46oLx-.js","assets/SignerUnPdf-Dh-7QUV2.js","assets/Synthese-JSw5egg3.js","assets/SyntheseGraphes-CF0U656l.js","assets/systeme-TPy-pF7j.css","assets/Tableau-jH8oGYkO.js","assets/temps-Bu4WgRKK.js","assets/Textes-CEshAlD7.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-8-u1kMJz.js","assets/tiroirs-CkDzpGy0.css","assets/trone-C64-GWoZ.js","assets/trone-D-JVcd4-.css","assets/useAudiences-CRSbkcgZ.js","assets/useClotureDuJour-CGmYE05B.js","assets/Vitrine-BWilTqQJ.css","assets/Vitrine-D191ib9V.js","assets/_admin-BbrM7SQK.js","assets/_contrat-DIxZk_AR.js","assets/_reuni-D0sYXtjC.js","assets/_shared-CD2FvFVj.js","assets/_signature-BmYlvU81.js","assets/_ui-BrUDlmuM.css","assets/_ui-DVmDYLGw.js"];
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
