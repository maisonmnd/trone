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
const BUILD = "20261113065708";
const A_GARDER = ["./","assets/abonnements-Bb0EM5iv.js","assets/Abonnements-CtzDboDX.js","assets/Abonnements-DTY7p2DH.css","assets/Academie-DcHCwIyY.js","assets/Acces-DHNslRhz.js","assets/afaire-BTQgmjnd.js","assets/AFaire-C872aXXV.js","assets/agents-donnees-dCj-d09R.js","assets/Agents-DspnU_N3.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-CkWLWLwJ.js","assets/Appels-CVe0_rWd.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/Assistants-CM8AGevU.js","assets/Assistants-D9i2Xwmg.css","assets/AtelierDesContenus-CXOzccC9.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/Audience-DQgpwOU2.js","assets/Aujourdhui-DFvnqSvd.js","assets/avant-le-fauteuil-lecture-BhGzJFnj.js","assets/AvantLeFauteuil-BUWwCJZL.js","assets/avis-fiches-BtUIgJEk.js","assets/AvisGoogle-Cl25ul7P.js","assets/AvisGoogle-DaPXfwX9.css","assets/BadgeEssai-z66bN9TL.js","assets/bilan-B-bfPYR0.css","assets/bilan-B2Kd-I0g.js","assets/BilanMensuel-DqC7WvIe.js","assets/Branches-BU0q0pox.js","assets/bridges-eSFsXlQD.js","assets/Caisse-CXVrXoRL.js","assets/caisse-du-soir-BWbf_Ju8.js","assets/caisse-du-soir-C6vPx-E_.css","assets/Caisses-mM5kUq0i.js","assets/Calendrier-DLO_7WoW.js","assets/campagnes-pur-CoLV5C1E.js","assets/Carnet-D0IbZNWL.js","assets/carte-Ytklk-C0.js","assets/carte-_W_-xBPj.css","assets/CarteModal-EfHY8dTz.js","assets/CartesCadeaux-DIPvknYJ.js","assets/Catalogue-CCfWBX6Y.js","assets/CentreDeCommande-CSSsfbCu.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-CyZ6gGjp.js","assets/certificat-BaOokhD7.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-D7nT_N60.js","assets/chiffre-du-jour-pur-DlirRNCR.js","assets/ChiffreDesPrestations-D5UeErn1.js","assets/client-BLMZS0jy.js","assets/cloture-du-jour-kxjNso6n.js","assets/ClotureDuTiroir-5A05SOeN.js","assets/Coffre-94MyzSsM.js","assets/collecte-mtn-pur-bUKk-7Ny.js","assets/components-BQKZh8Ad.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-B73OTXFT.js","assets/Comptes-P6Iawbh9.js","assets/consultation-CgcrtlQh.js","assets/consultation-CRW6QcWf.css","assets/Consultations-um362zxO.js","assets/consultNotes-CHNrZMAs.js","assets/Conversations-D4WwB5Zo.css","assets/Conversations-XvHfhboq.js","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-FVpuL92r.js","assets/currency-qfIhGmrs.js","assets/Customers-VBcB-sMT.js","assets/Dashboard-B2x7VsE_.css","assets/Dashboard-DOlgw8FP.js","assets/dates-BLDCyH8k.js","assets/Demandes-C3FT7ywR.js","assets/DepenseEnUnePhrase-BIGRlGqP.css","assets/DepenseEnUnePhrase-CApTsBMo.js","assets/Depenses-DWX6MW8D.js","assets/depenses-saisie-CZ-6lQ3d.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-Dlq3nAoM.js","assets/diagnostics-au-trone-DtsLltRJ.js","assets/Dictee-D2P9yM7v.css","assets/dictee-pur-DEP6EArv.js","assets/Dictee-x8QBx8Y3.js","assets/Discussions-C_PMgXFb.js","assets/EditeurDesOffres-DqxgICtU.js","assets/Encaissements-DQQgmDz2.js","assets/enfants-CTDMqHrQ.js","assets/Engagements-Cj5S9MhG.css","assets/engagements-coffre-BP2BIHsX.js","assets/Engagements-DO8oL5Yf.js","assets/EntreDeuxSeances-DBsNlAfM.js","assets/Evaluation-BAA0Khbf.js","assets/facture-B12X3AOl.js","assets/Factures-LDVM1ZkZ.js","assets/FenetreDesCivilites-rTZiYOTh.js","assets/FenetreDesCivilites-zfNk1aak.css","assets/FenetreDuPoint-o7gWXYn0.js","assets/Fil-Dq95C0by.js","assets/finances-Ds4kOIUN.css","assets/fon-CHKZG2Rt.js","assets/Fournisseurs-ChbhSTOc.js","assets/fournisseurs-Dpnk2pTA.js","assets/foyer-BTMDp3Ik.js","assets/Gerard-Cgj-zsJh.css","assets/Gerard-CTtwQNlT.js","assets/gerard-donnees-D1Df5kM6.js","assets/gestes-conversation-DsqDXcnZ.js","assets/heures-des-rappels-pur-Dig9pZpo.js","assets/HomeRituals-BsTiDtJS.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-DIgbiZSL.js","assets/ia-centre-FDPVVxN_.js","assets/ia-diagnostic-pur-BBLrGY5l.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-tableau-pur-p6UvREJe.js","assets/identite-BlgdVEXi.js","assets/index-2iZCEaQ_.js","assets/index.es-BwXZv-ka.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-BNRzXuS_.js","assets/jspdf.es.min-BeaCOdKj.js","assets/JustePrix-C7jqrE6y.js","assets/kkiapay-DXzebZDS.js","assets/kkiapay-widget-CVmsl9OE.js","assets/Laboratoire-r4kpgmNu.js","assets/LaJournee-Bn_G0HCt.css","assets/LaJournee-FG0wGqcf.js","assets/LesPaiements-C9cEZlne.css","assets/LesPaiements-DMEG_Mb4.js","assets/LettresAuDossier-CL4Soeab.js","assets/LienMndPay-D2tiwX1n.js","assets/Marketing-D5Wu-8yy.js","assets/MarketingBranche-Cj0vGNaq.js","assets/Marque-BQDYkQ45.js","assets/MesPourboires-CENjelyb.css","assets/MesPourboires-Dhy0ifJz.js","assets/MesTaches-Cc4XUDf6.css","assets/MesTaches-ujNzUYWd.js","assets/momo-C2ZVfV9J.js","assets/MonMois-Du5NjB9E.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/MtnMoMo-DL2YXVLT.js","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/objectifs-i5JdPUMG.js","assets/opale-bpALPhq1.js","assets/oreille-B1AMUmZh.js","assets/paie-du-5-DeJq-K_U.css","assets/paie-du-5-DOequScc.js","assets/paie-du-5-pur-CPiCK8fv.js","assets/paie-par-mtn-CXSXzCxk.js","assets/PaieParMtn-BxRvZBe2.js","assets/paliers-BAfu7i2J.js","assets/Parametres-CCzWRXfD.js","assets/parcours-CWWY-u6c.js","assets/Parrainages-Cqg5q2OI.js","assets/Parrainages-gAHAPB_6.css","assets/PassageAvantLeFauteuil-79cmbwWd.js","assets/pdf-CL8Jdv7s.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/periode-des-pourboires-pur-BUWqfwov.js","assets/Personas-ABSiTGop.js","assets/Personnel-QS2bSIyu.js","assets/photo-B0J3JGji.js","assets/pilotage-D8kf1Co8.css","assets/Pourboires-BSNLnEzu.js","assets/Predictions-DmjfH6_C.js","assets/Prestataires-CrI5CG-2.js","assets/Prets-BThfuNW9.js","assets/PrevisionDuMois-DE9HBdhI.js","assets/PrevisionDuMois-DlFTw3OX.css","assets/Previsions-9BU2Vg1T.css","assets/Previsions-B3QpuoHs.js","assets/previsions-pur-DRLtiPTD.js","assets/processus-pur-R6U5QcCi.js","assets/projets-Bsia1iEt.js","assets/Projets-COO7WDEE.css","assets/Projets-D5alrTvv.js","assets/projets-pur-2ZEMRNDU.js","assets/protocoles-SwaPWbJH.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-DZpdD9B3.js","assets/qualification-DSabRjSH.js","assets/quiz-5qMPWZVi.js","assets/Rapport-B3ZWyGhw.js","assets/Recommandations-Dq2XZY94.js","assets/regler-D7jI7DMt.js","assets/regler-DHR_B1Dm.css","assets/regler-par-fedapay-pur-I5RZPdXv.js","assets/relances-pur-BacTXlI2.js","assets/releve-des-avis-D5kpTwUu.js","assets/SalonFoyer-Bs3SW-J7.js","assets/secretariat-admin-CP_I_h97.js","assets/Secretariat-Cy79Zw30.css","assets/Secretariat-DNsRZAqk.js","assets/Signatures-DHUWZJdy.js","assets/SignerUnPdf-4JSQuAgT.js","assets/Synthese--c26uFp7.js","assets/SyntheseGraphes-CixfvsVP.js","assets/systeme-TPy-pF7j.css","assets/Tableau-BQoQVj0b.js","assets/temps-DZGVtQ8N.js","assets/Textes-CtZN6sJ9.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-CkDzpGy0.css","assets/tiroirs-QQrfdG2i.js","assets/trone-Cfmn71Cn.js","assets/trone-CvS3t3zP.css","assets/useAudiences-Di18RDVA.js","assets/useClotureDuJour-CXJ7_1Ut.js","assets/Vitrine-BWilTqQJ.css","assets/Vitrine-D-PKhsk-.js","assets/_admin-BX3Hi20j.js","assets/_contrat-CTdwKy2B.js","assets/_reuni-BMfSFT0X.js","assets/_shared-B0eMKutg.js","assets/_signature-BGB8_9rB.js","assets/_ui-BrUDlmuM.css","assets/_ui-EqDQRF_q.js"];
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
