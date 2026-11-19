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
const BUILD = "20261119134947";
const A_GARDER = ["./","assets/Abonnements-B-gYifnB.js","assets/Abonnements-DTY7p2DH.css","assets/abonnements-DY7g1fzC.js","assets/Academie-Da_ywBC2.js","assets/Acces-w1_t13er.js","assets/AFaire-Cy5PtbWc.js","assets/afaire-v4TBXmGw.js","assets/Agents-Bp7-RFCe.js","assets/agents-donnees-BoxTmWUm.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-Dmo4i2VR.js","assets/App-D0lftRIR.js","assets/Appels-mOcVUeM0.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/Assistants-BKj1qkv9.js","assets/Assistants-D9i2Xwmg.css","assets/AtelierDesContenus-BP0ylc2y.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/Audience-CnccPb-N.js","assets/Aujourdhui-CG1CL1pk.js","assets/auth-DddNoCz0.js","assets/avant-le-fauteuil-lecture-CFHyBwQx.js","assets/AvantLeFauteuil-LtsCklyX.js","assets/avis-fiches-HDkwws8y.js","assets/AvisGoogle-Bd8_rIEQ.js","assets/AvisGoogle-DaPXfwX9.css","assets/BadgeEssai-BMcvrxxD.js","assets/BadgeSuggere-CXNPQ8qZ.js","assets/besoins-C0Y-TJ6R.js","assets/BesoinsEtRegles-BLwxGVV5.css","assets/BesoinsEtRegles-w_6pCZB1.js","assets/bilan-B-bfPYR0.css","assets/bilan-DEEoYoSB.js","assets/BilanMensuel-CZQMvcHE.js","assets/Branches-CM_e1hHs.js","assets/bridges-lslxnAqt.js","assets/caisse-du-soir-B5as7BdI.js","assets/caisse-du-soir-C6vPx-E_.css","assets/Caisse-VINTC9xQ.js","assets/Caisses-CBExA4sJ.js","assets/Calendrier-BDFJnA2b.js","assets/campagnes-pur-D0Uf9uoP.js","assets/Carnet-C3iIF0hP.js","assets/carte-DsIENQDf.js","assets/carte-_W_-xBPj.css","assets/CarteModal-DiImXE6U.js","assets/CartesCadeaux-BDWTwjH6.js","assets/Catalogue-DMgdezTq.js","assets/CentreDeCommande-Du8kyJhp.css","assets/CentreDeCommande-U7ObWVgC.js","assets/Cercle-BehPBdKo.js","assets/certificat-CXMba32C.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-DCGuvji-.js","assets/chiffre-du-jour-pur-BYT6tFlj.js","assets/ChiffreDesPrestations-DC0Hxx7V.js","assets/client-BE1jrKbm.js","assets/cloture-du-jour-B1k8rp5X.js","assets/ClotureDuTiroir-DdW8k-6M.js","assets/Coffre-DfxazOti.js","assets/collecte-mtn-pur-Bq3uWgWT.js","assets/components-BGfpQP1M.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-DyUKlLJ4.js","assets/Comptes-TqymbbYW.js","assets/consultation-CoXyPcH4.js","assets/consultation-CRW6QcWf.css","assets/Consultations-DiE-2_mG.css","assets/Consultations-Jo35ySz6.js","assets/consultNotes-CUDiozBz.js","assets/Conversations-D4WwB5Zo.css","assets/Conversations-DWa9p2m7.js","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-jR_xTEoY.js","assets/currency-Cd0clE4P.js","assets/Customers-CRFITTC-.js","assets/Dashboard-B2x7VsE_.css","assets/Dashboard-Dxno6LMy.js","assets/dates-FYRkuAod.js","assets/Demandes-nuwzl8xv.js","assets/DepenseEnUnePhrase-BIGRlGqP.css","assets/DepenseEnUnePhrase-DxsUrznW.js","assets/Depenses-BerEMvrn.js","assets/depenses-saisie-DU4QfZiP.js","assets/devis-remis-D06IRfVY.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-DGmSlRlJ.js","assets/diagnostics-au-trone-DAYxA5X6.js","assets/Dictee-C-pUYYFA.css","assets/dictee-pur-B9ssUlpY.js","assets/Dictee-q0XBX436.js","assets/Discussions-Ba5or6bp.js","assets/echappe-html-pur-gEhHOM07.js","assets/EditeurDesOffres-BS5GzVdP.js","assets/Encaissements-D2CU9OcH.js","assets/enfants-JL3rOWXs.js","assets/Engagements-Cj5S9MhG.css","assets/Engagements-CKwBkFao.js","assets/engagements-coffre-DH_00SRm.js","assets/EntreDeuxSeances-MQyBqxpE.js","assets/es-TddF5hKL.js","assets/Evaluation-D1s8mwiy.js","assets/facture-BfXJ-OId.js","assets/Factures-DsHS-IhA.js","assets/FenetreDeLAgent-D5nZxDct.js","assets/FenetreDesCivilites-CcTzxWJB.js","assets/FenetreDesCivilites-zfNk1aak.css","assets/FenetreDuPoint-D3zTPJIt.js","assets/Fil-BhNQfXat.js","assets/finances-C8x7Mn4-.css","assets/fon-CCiYzzmI.js","assets/Fournisseurs-CrjRyGh9.js","assets/fournisseurs-DiOgRRzM.js","assets/foyer-C78balZL.js","assets/gerard-donnees-B-6TOuEx.js","assets/Gerard-h4kFWoUU.js","assets/Gerard-vo2IWvP3.css","assets/gestes-conversation-CgedvHSR.js","assets/heures-des-rappels-pur-BWJPB8OP.js","assets/HomeRituals-0gxt5dyG.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-pJYfJzfD.js","assets/ia-centre-CnrV2VDx.js","assets/ia-diagnostic-pur-qGnFEvys.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-tableau-pur-p6UvREJe.js","assets/identite-CIeLXltD.js","assets/index.es-Deik1a1s.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-CMOfAejJ.js","assets/jspdf.es.min-BOhmWNHg.js","assets/JustePrix-B41y4UZM.js","assets/kkiapay-DcbsiBl5.js","assets/kkiapay-widget-CVmsl9OE.js","assets/Laboratoire-MVvMkRm6.js","assets/LaJournee-Bn_G0HCt.css","assets/LaJournee-DuhcgOSP.js","assets/le-caissier-pur-PDZXtAHa.js","assets/LesPaiements-30fPRiLj.js","assets/LesPaiements-C9cEZlne.css","assets/LettresAuDossier-DfvEkFFo.js","assets/LienMndPay-DuxOih4X.js","assets/Marketing-BX-sd3uX.js","assets/MarketingBranche-CZboVZ-G.js","assets/Marque-wpoEc0zK.js","assets/MesPourboires-CENjelyb.css","assets/MesPourboires-DK52M2EI.js","assets/MesTaches-Cc4XUDf6.css","assets/MesTaches-CQf0gcNE.js","assets/momo-C2ZVfV9J.js","assets/MonMois-fShCH3qa.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/MtnMoMo-6y9xYqhJ.js","assets/objectifs-DEQ9aAQp.js","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/opale-DLRnPpJo.js","assets/oreille-B1AMUmZh.js","assets/paie-du-5-CrZ0T5OV.js","assets/paie-du-5-DeJq-K_U.css","assets/paie-du-5-pur-CPiCK8fv.js","assets/paie-par-mtn-BSgfkxVo.js","assets/PaieParMtn-L3einXXw.js","assets/paliers-BL9_LImN.js","assets/Parametres-B99T8nmV.js","assets/parcours-ksO_b8ZI.js","assets/Parrainages-C9T0fryQ.js","assets/Parrainages-gAHAPB_6.css","assets/PassageAvantLeFauteuil-CiYtVsEw.js","assets/pdf-D6n5TGmm.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/periode-des-pourboires-pur-BUWqfwov.js","assets/Personas-Cq-pmfp9.js","assets/Personnel-8tAiRrdE.js","assets/photo-DSIaJH9o.js","assets/pilotage-D8kf1Co8.css","assets/porte-de-l-equipe-BSyg4TtL.js","assets/Pourboires-CPGyjFDc.js","assets/Predictions-YsL4kOH7.js","assets/preload-helper-BRe_O-Rg.js","assets/Prestataires-BjrSVTvZ.js","assets/Prets-ODQQjvVz.js","assets/PrevisionDuMois-BfwYhAgM.js","assets/PrevisionDuMois-DlFTw3OX.css","assets/Previsions-0ph0XvHO.js","assets/Previsions-9BU2Vg1T.css","assets/previsions-pur-y9zYDpml.js","assets/processus-pur-R6U5QcCi.js","assets/projets-CJSQ4OPu.js","assets/Projets-COO7WDEE.css","assets/Projets-D6Qi_2iY.js","assets/projets-pur-2ZEMRNDU.js","assets/protocoles-DOHC69In.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-BNmNbVgp.js","assets/quiz-5qMPWZVi.js","assets/Rapport-aIHUrXqX.js","assets/Recommandations-DoCzXLjZ.js","assets/regler-DHR_B1Dm.css","assets/regler-LF6_EQsy.js","assets/regler-par-fedapay-pur-G8CEJdGn.js","assets/relances-pur-BacTXlI2.js","assets/releve-des-avis-DkUEo8Rk.js","assets/SalonFoyer-BiD5CZzC.js","assets/secretariat-admin-CXdje33C.js","assets/Secretariat-Cy79Zw30.css","assets/Secretariat-f3mhexUd.js","assets/Signatures-s--WH1H4.js","assets/SignerUnPdf-DUBh3299.js","assets/Synthese-BykOaOLg.js","assets/SyntheseGraphes-qD3HXl3Z.js","assets/systeme-TPy-pF7j.css","assets/Tableau-CNq1aLxT.js","assets/temps-BgVBs7I7.js","assets/Textes-DLpOzRbT.css","assets/Textes-XBXVvODu.js","assets/tiroirs-BUIPfQL5.js","assets/tiroirs-CkDzpGy0.css","assets/trone-BXZjMBW2.js","assets/trone-Dce2LsFN.css","assets/useAudiences-BA9ZrVx0.js","assets/useClotureDuJour-BtrGl3g_.js","assets/visios-rVOSbcy4.js","assets/Vitrine-BWilTqQJ.css","assets/Vitrine-B_8TcA83.js","assets/_admin-Cm0pYCCO.js","assets/_contrat-BH5WMaXH.js","assets/_reuni-D9EOGH4g.js","assets/_shared-DYvX0kHI.js","assets/_signature-Ca3IW4y6.js","assets/_ui-BrUDlmuM.css","assets/_ui-hdIbKE2o.js"];
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
