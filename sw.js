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
const BUILD = "20261120054445";
const A_GARDER = ["./","assets/abonnements-DLDrNRrD.js","assets/Abonnements-DTY7p2DH.css","assets/Abonnements-DyTFMGWH.js","assets/Academie-DyGgWuxM.js","assets/Acces-B1dWHYcy.js","assets/afaire-C5Ag5Abd.js","assets/AFaire-CCvrs9_1.js","assets/Agents-BznjfvRj.js","assets/agents-donnees-CTS6qloU.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-Dbxa4ZwN.js","assets/App-COfjeUs0.js","assets/Appels-BYZxtCGY.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/Assistants-D6oKTUCx.js","assets/Assistants-D9i2Xwmg.css","assets/AtelierDesContenus-BMmy-Z6L.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/Audience-DtrJw6XJ.js","assets/Aujourdhui-BBDH8pBe.js","assets/auth-C_CvQ8P2.js","assets/avant-le-fauteuil-lecture-DsomAuYR.js","assets/AvantLeFauteuil-2RyFQUDM.js","assets/avis-fiches-DBadCTY6.js","assets/AvisGoogle-BzXKdVRA.js","assets/AvisGoogle-DaPXfwX9.css","assets/BadgeEssai-Bxj4X20g.js","assets/BadgeSuggere-BR7JR6dM.js","assets/besoins-CyoRYFCG.js","assets/BesoinsEtRegles-BLwxGVV5.css","assets/BesoinsEtRegles-BtASvbkc.js","assets/bilan-B-bfPYR0.css","assets/bilan-CzAIMgKe.js","assets/BilanMensuel-CC3ywerW.js","assets/Branches-ChTQjBtl.js","assets/bridges-BJDQbEbZ.js","assets/Caisse-D6WMXQUl.js","assets/caisse-du-soir-4g3niz99.js","assets/caisse-du-soir-C6vPx-E_.css","assets/Caisses-CDEfkeDf.js","assets/Calendrier-DqdD-bWi.js","assets/campagnes-pur-CK2fOsOL.js","assets/Carnet-ChJAGqVP.js","assets/carte-BaJkLNFy.js","assets/carte-_W_-xBPj.css","assets/CarteModal-CIHNy1ZR.js","assets/CartesCadeaux-cIgErq8R.js","assets/Catalogue-DYEQawK2.js","assets/CentreDeCommande-B8AiP2Ev.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-CtOhR2Wf.js","assets/certificat-DsHBAZx6.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-CfrhTeuM.js","assets/chiffre-du-jour-pur-CiwjsfVq.js","assets/ChiffreDesPrestations-N4NZPFsg.js","assets/client-Ce0VrFlo.js","assets/cloture-du-jour-DWVZEOmG.js","assets/ClotureDuTiroir-BS7Vmial.js","assets/Coffre-7pMS6afQ.js","assets/collecte-mtn-pur-Bq3uWgWT.js","assets/components-CvII9Yea.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-Dikonbum.js","assets/Comptes-CyvG1wiX.js","assets/consultation-CRW6QcWf.css","assets/consultation-DKFalqD4.js","assets/Consultations-DiE-2_mG.css","assets/Consultations-DZcVH9N7.js","assets/consultNotes-PRcLDUZm.js","assets/Conversations-BqKZyHoc.js","assets/Conversations-D4WwB5Zo.css","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-D7nWm7h_.js","assets/currency-Cd0clE4P.js","assets/Customers-BdvV60d5.js","assets/Dashboard-B2x7VsE_.css","assets/Dashboard-CQFWROGv.js","assets/dates-CWOPBLr-.js","assets/Demandes-C2UTLw9Y.js","assets/DepenseEnUnePhrase-BIGRlGqP.css","assets/DepenseEnUnePhrase-mOpDm5N7.js","assets/Depenses-CSVHzcx9.js","assets/depenses-saisie-Du4ENqIl.js","assets/devis-remis-BNzaE5k2.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-LmRNed0R.js","assets/diagnostics-au-trone-CnOwT0Nq.js","assets/Dictee-B9_Qn1Vk.js","assets/Dictee-C-pUYYFA.css","assets/dictee-pur-CB3ery92.js","assets/Discussions-LwDmqIL8.js","assets/echappe-html-pur-gEhHOM07.js","assets/EditeurDesOffres-DWZpICMb.js","assets/Encaissements-B5hYFcRz.js","assets/enfants-829_Bzdq.js","assets/Engagements-B5eas0Ch.js","assets/Engagements-Cj5S9MhG.css","assets/engagements-coffre-DKk32SNu.js","assets/EntreDeuxSeances-CIjM1KXl.js","assets/es-BP7QEQzu.js","assets/Evaluation-BlF__rcD.js","assets/facture-GvsBTgjs.js","assets/Factures-zoifw74d.js","assets/FenetreDeLAgent-bTJEdfG2.js","assets/FenetreDesCivilites-Cj55gRJn.js","assets/FenetreDesCivilites-zfNk1aak.css","assets/FenetreDuPoint-e18e0MK5.js","assets/Fil-ClaeNh2I.js","assets/finances-C8x7Mn4-.css","assets/fon-bEHTFtcU.js","assets/fournisseurs-BkfJntbW.js","assets/Fournisseurs-CDJikjT8.js","assets/foyer-mHO3KitW.js","assets/Gerard-7NSExiDK.js","assets/gerard-donnees-CHu59DSv.js","assets/Gerard-vo2IWvP3.css","assets/gestes-conversation-DDOjkkrq.js","assets/heures-des-rappels-pur-BWJPB8OP.js","assets/HomeRituals-CICTpBX0.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-C36wyj0n.js","assets/ia-centre-BbpZJWXA.js","assets/ia-diagnostic-pur-qGnFEvys.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-tableau-pur-p6UvREJe.js","assets/identite-wXY8DSDg.js","assets/index.es-D_3PfToU.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-KaZrWgzi.js","assets/jspdf.es.min-DuJsA9l8.js","assets/JustePrix-DXq2vKad.js","assets/kkiapay-Cs7C7iWn.js","assets/kkiapay-widget-CVmsl9OE.js","assets/Laboratoire-Qx37qLJT.js","assets/LaJournee-Bn_G0HCt.css","assets/LaJournee-UOKWIXlh.js","assets/le-caissier-pur-1KdyU193.js","assets/LesPaiements-C9cEZlne.css","assets/LesPaiements-DXPRGHU4.js","assets/LettresAuDossier-OaxhG0kD.js","assets/LienMndPay-C2dhVaa3.js","assets/Marketing-tGCUstrb.js","assets/MarketingBranche-iPKNHHjP.js","assets/Marque-CZyms2yB.js","assets/MesPourboires-CENjelyb.css","assets/MesPourboires-CQ1Qro_K.js","assets/MesTaches-Cc4XUDf6.css","assets/MesTaches-DOLJxFen.js","assets/momo-C2ZVfV9J.js","assets/MonMois-BQHvFWiJ.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/MtnMoMo-BypRuzUM.js","assets/objectifs-CarUUysk.js","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/opale-BqAfoXZK.js","assets/oreille-B1AMUmZh.js","assets/paie-du-5-B8JZ3Baw.js","assets/paie-du-5-DeJq-K_U.css","assets/paie-du-5-pur-CPiCK8fv.js","assets/paie-par-mtn-CjUpByhC.js","assets/PaieParMtn-Dh6Azr68.js","assets/paliers-C5fDbgUg.js","assets/Parametres-DOMAVn3-.js","assets/parcours-D8elSNp4.js","assets/Parrainages-C_cuGUyo.js","assets/Parrainages-gAHAPB_6.css","assets/PassageAvantLeFauteuil-DyzwL5Io.js","assets/pdf-CtASxr48.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/periode-des-pourboires-pur-BUWqfwov.js","assets/Personas-DHnvDGZU.js","assets/Personnel-BmM6rW3g.js","assets/photo-B_2r1Beh.js","assets/pilotage-D8kf1Co8.css","assets/porte-de-l-equipe-CMri5dVT.js","assets/Pourboires-CFGUpc1h.js","assets/Predictions-B9cO-9aw.js","assets/preload-helper-BRe_O-Rg.js","assets/Prestataires-o9XlXbDd.js","assets/Prets-4PN2LjE2.js","assets/PrevisionDuMois-DlFTw3OX.css","assets/PrevisionDuMois-XnKXpDjQ.js","assets/Previsions-9BU2Vg1T.css","assets/Previsions-BPmo4Ful.js","assets/previsions-pur-CCIszK67.js","assets/processus-pur-R6U5QcCi.js","assets/projets-Bn5jQOKt.js","assets/Projets-C4uobRrm.js","assets/Projets-COO7WDEE.css","assets/projets-pur-2ZEMRNDU.js","assets/protocoles-DOLfaAda.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-HCdU4Oub.js","assets/quiz-5qMPWZVi.js","assets/Rapport-DN9Hx21H.js","assets/Recommandations-CTWktC9t.js","assets/regler-BF3bSjIu.js","assets/regler-DHR_B1Dm.css","assets/regler-par-fedapay-pur-G8CEJdGn.js","assets/relances-pur-BacTXlI2.js","assets/releve-des-avis-BT0C5u8S.js","assets/SalonFoyer-fb9shW2K.js","assets/secretariat-admin-CZSlwOZT.js","assets/Secretariat-BZvDq4yb.js","assets/Secretariat-Cy79Zw30.css","assets/Signatures-DgYv6Br3.js","assets/SignerUnPdf-KgJn811D.js","assets/Synthese-DRTzRfBE.js","assets/SyntheseGraphes-B6Ep8hSb.js","assets/systeme-TPy-pF7j.css","assets/Tableau-BhMtoD4P.js","assets/temps-xiUVh_Vq.js","assets/Textes-D56qljDl.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-CkDzpGy0.css","assets/tiroirs-iAjVgGIa.js","assets/trone-DcXaHOR8.js","assets/trone-Dsdrwhxz.css","assets/useAudiences-DnDSxRM4.js","assets/useClotureDuJour-CyLMea9d.js","assets/visios-CyA4gEzb.js","assets/Vitrine-B8-SeD0q.js","assets/Vitrine-BWilTqQJ.css","assets/_admin-BHowUEfS.js","assets/_contrat-BYr7tFzh.js","assets/_reuni-BM6vJ10g.js","assets/_shared-XCjuhak5.js","assets/_signature-CUmq1AD_.js","assets/_ui-BrUDlmuM.css","assets/_ui-DeQG8Dv7.js"];
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
