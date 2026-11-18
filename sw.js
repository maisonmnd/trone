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
const BUILD = "20261118125600";
const A_GARDER = ["./","assets/abonnements-Cf9PyXot.js","assets/Abonnements-DHjDQHdD.js","assets/Abonnements-DTY7p2DH.css","assets/Academie-_UhmCB5k.js","assets/Acces-BU3c9v89.js","assets/afaire-D0d2OIQ_.js","assets/AFaire-D4bxj_Be.js","assets/agents-donnees-_yYt4FTN.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Agents-oZbU0_9v.js","assets/Analytics-B7fwYcKa.js","assets/App-hQv-pr4C.js","assets/Appels-DscRW_Eq.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/Assistants-D9i2Xwmg.css","assets/Assistants-vmleLDId.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/AtelierDesContenus-DpZUEuXl.js","assets/Audience-CviET15N.js","assets/Aujourdhui-DDkrdO8h.js","assets/auth-BCku0Hzj.js","assets/avant-le-fauteuil-lecture-ZCqU9xw0.js","assets/AvantLeFauteuil-DDMBiCgx.js","assets/avis-fiches-Btm10Tk-.js","assets/AvisGoogle-BTNfWaHt.js","assets/AvisGoogle-DaPXfwX9.css","assets/BadgeEssai-CRPKi3xj.js","assets/BadgeSuggere-B3vP1STk.js","assets/besoins-Bzw7LyRv.js","assets/BesoinsEtRegles-BLwxGVV5.css","assets/BesoinsEtRegles-CBt4bNVD.js","assets/bilan-B-bfPYR0.css","assets/bilan-DgspfDIs.js","assets/BilanMensuel-ByC1xrQr.js","assets/Branches-Da8W39ud.js","assets/bridges-B9uye66P.js","assets/Caisse-Bxm3LRWO.js","assets/caisse-du-soir-7BYFgJxp.js","assets/caisse-du-soir-C6vPx-E_.css","assets/Caisses-DHyqP2ML.js","assets/Calendrier-DwwggLyE.js","assets/campagnes-pur-dvRcGEDy.js","assets/Carnet-D73CGaJM.js","assets/carte-Btt5Yq1y.js","assets/carte-_W_-xBPj.css","assets/CarteModal-KV1VsLO4.js","assets/CartesCadeaux-DB1-8WqF.js","assets/Catalogue-5TAqfDFX.js","assets/CentreDeCommande-CUKtsJuE.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-DHUpFPdK.js","assets/certificat-Cuy-79Wa.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-BoVD2dky.js","assets/chiffre-du-jour-pur-Dh_EKxXY.js","assets/ChiffreDesPrestations-DZw11TCR.js","assets/client-BDj-fmgu.js","assets/cloture-du-jour-DuSF9GQj.js","assets/ClotureDuTiroir-OKPlcDc3.js","assets/Coffre-BWjHorwp.js","assets/collecte-mtn-pur-Bq3uWgWT.js","assets/components-foi5Pe9p.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-LJMxozIZ.js","assets/Comptes-SnZEtFqZ.js","assets/consultation-BVG6zuXd.js","assets/consultation-CRW6QcWf.css","assets/Consultations-DFvXzCib.js","assets/Consultations-DiE-2_mG.css","assets/consultNotes-DzmQKmB9.js","assets/Conversations-BO413RSD.js","assets/Conversations-D4WwB5Zo.css","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-DcYAdD3c.js","assets/currency-Cd0clE4P.js","assets/Customers-CVk5IHts.js","assets/Dashboard-B2x7VsE_.css","assets/Dashboard-BCBWkhDS.js","assets/dates-mB60N1Lt.js","assets/Demandes-D7gOoPZI.js","assets/DepenseEnUnePhrase-BIGRlGqP.css","assets/DepenseEnUnePhrase-COsHB-l1.js","assets/Depenses-pwwmSj5L.js","assets/depenses-saisie-CirUoMvf.js","assets/devis-remis-BUmEQ1bF.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-YN48aceS.js","assets/diagnostics-au-trone-ikFFdOT4.js","assets/Dictee-C-pUYYFA.css","assets/Dictee-ColRcJDo.js","assets/dictee-pur-CeB8z9--.js","assets/Discussions-CIf0vXs-.js","assets/echappe-html-pur-gEhHOM07.js","assets/EditeurDesOffres-7_O62WQ1.js","assets/Encaissements-DVnAW89y.js","assets/enfants-CTQdjCD3.js","assets/Engagements-Cj5S9MhG.css","assets/engagements-coffre-Cqt8Uto5.js","assets/Engagements-DXyA5H3l.js","assets/EntreDeuxSeances-DF7lAYTz.js","assets/es-CPJPoUAL.js","assets/Evaluation-CjjO66lZ.js","assets/facture-CcUER8mF.js","assets/Factures-CJC5yuQS.js","assets/FenetreDeLAgent-D0kAUNmC.js","assets/FenetreDesCivilites-KDBSBlWK.js","assets/FenetreDesCivilites-zfNk1aak.css","assets/FenetreDuPoint-XmmSXbIX.js","assets/Fil-BHD6SMsY.js","assets/finances-C8x7Mn4-.css","assets/fon-DblPNTNg.js","assets/fournisseurs-BCjE81fo.js","assets/Fournisseurs-Dv-o3bGH.js","assets/foyer-C2wQaIuW.js","assets/gerard-donnees-DbpirOFz.js","assets/Gerard-pnF_3tKG.js","assets/Gerard-vo2IWvP3.css","assets/gestes-conversation-BwiBFMTD.js","assets/heures-des-rappels-pur-BWJPB8OP.js","assets/HomeRituals-BmuR6wP0.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-CQwvsR10.js","assets/ia-centre-Bl7IgQy9.js","assets/ia-diagnostic-pur-qGnFEvys.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-tableau-pur-p6UvREJe.js","assets/identite-Z_reVTJs.js","assets/index.es-tvuTSl9V.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-BuH57Ijx.js","assets/jspdf.es.min-Byz6RNJR.js","assets/JustePrix-DHPHciqg.js","assets/kkiapay-BxflGHsi.js","assets/kkiapay-widget-CVmsl9OE.js","assets/Laboratoire-Dwm-wvHo.js","assets/LaJournee-Bn_G0HCt.css","assets/LaJournee-CT5ZsXZa.js","assets/le-caissier-pur-q7sp2n7X.js","assets/LesPaiements-1t66Yi_V.js","assets/LesPaiements-C9cEZlne.css","assets/LettresAuDossier-CD2xomBm.js","assets/LienMndPay-F29QM8wl.js","assets/Marketing-CEnklbr2.js","assets/MarketingBranche-DeW8JzbU.js","assets/Marque-D0b66xcj.js","assets/MesPourboires-Bxz0Jk8u.js","assets/MesPourboires-CENjelyb.css","assets/MesTaches-9SvN1y4R.js","assets/MesTaches-Cc4XUDf6.css","assets/momo-C2ZVfV9J.js","assets/MonMois-CNI0s6k8.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/MtnMoMo-DIBPx2O7.js","assets/objectifs-C410uQiD.js","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/opale-WP5X0RHg.js","assets/oreille-B1AMUmZh.js","assets/paie-du-5-4PYlaCTY.js","assets/paie-du-5-DeJq-K_U.css","assets/paie-du-5-pur-CPiCK8fv.js","assets/paie-par-mtn-aZrEcUSg.js","assets/PaieParMtn-BxeL_UW7.js","assets/paliers-BKOTSDom.js","assets/Parametres-NIn26FuG.js","assets/parcours-CFizmLm-.js","assets/Parrainages-C76cCI-2.js","assets/Parrainages-gAHAPB_6.css","assets/PassageAvantLeFauteuil-Bh3kMeZ3.js","assets/pdf-Bg5q2OBp.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/periode-des-pourboires-pur-BUWqfwov.js","assets/Personas-DwmPAKeu.js","assets/Personnel-Ck6ZR4sx.js","assets/photo-BMBRW3oO.js","assets/pilotage-D8kf1Co8.css","assets/porte-de-l-equipe-k5NlDIZT.js","assets/Pourboires-Yr9eXNn1.js","assets/Predictions-Co7hB3hB.js","assets/preload-helper-BRe_O-Rg.js","assets/Prestataires-E7zfZ0gr.js","assets/Prets-D2hU23fv.js","assets/PrevisionDuMois-BMZhScxe.js","assets/PrevisionDuMois-DlFTw3OX.css","assets/Previsions-9BU2Vg1T.css","assets/Previsions-BodNdKCk.js","assets/previsions-pur-BupRwAE7.js","assets/processus-pur-R6U5QcCi.js","assets/projets-BOHpP2Ho.js","assets/Projets-COO7WDEE.css","assets/Projets-Du_IOlS7.js","assets/projets-pur-2ZEMRNDU.js","assets/protocoles-Bc8NQvcA.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-DCZ21lb5.js","assets/quiz-5qMPWZVi.js","assets/Rapport-DNXYGYRq.js","assets/Recommandations-GtvMY6p8.js","assets/regler-B2kn4Tm7.js","assets/regler-DHR_B1Dm.css","assets/regler-par-fedapay-pur-G8CEJdGn.js","assets/relances-pur-BacTXlI2.js","assets/releve-des-avis-dp7egQUO.js","assets/SalonFoyer-C6veWEhD.js","assets/secretariat-admin-DJUwuiVF.js","assets/Secretariat-Co1xhR3P.js","assets/Secretariat-Cy79Zw30.css","assets/Signatures-cQTAuYYq.js","assets/SignerUnPdf-vfA_Kz1k.js","assets/Synthese-BVFc-xoR.js","assets/SyntheseGraphes-dBn_Wigk.js","assets/systeme-TPy-pF7j.css","assets/Tableau-DSM13KnN.js","assets/temps-C4WhQ7jW.js","assets/Textes-CuJN4v1j.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-CkDzpGy0.css","assets/tiroirs-JzPQ9RaP.js","assets/trone-DBAlwqjH.js","assets/trone-fVMGnfYY.css","assets/useAudiences-DEUuQALT.js","assets/useClotureDuJour-P2lfP0b5.js","assets/visios-BARMEXAV.js","assets/Vitrine-BWilTqQJ.css","assets/Vitrine-DSBjNRcw.js","assets/_admin-Cj99rG9G.js","assets/_contrat-uxS-Dzx5.js","assets/_reuni-ZoO6phV1.js","assets/_shared-2iRzAeJ7.js","assets/_signature-TeZd4i9l.js","assets/_ui-0FvnkSIw.js","assets/_ui-BrUDlmuM.css"];
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
