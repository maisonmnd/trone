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
const BUILD = "20261118184434";
const A_GARDER = ["./","assets/Abonnements-BVi4Tsud.js","assets/Abonnements-DTY7p2DH.css","assets/abonnements-gNl8Wxgn.js","assets/Academie-D9FEpkCW.js","assets/Acces-DTBvX1FJ.js","assets/AFaire-CYlli-wx.js","assets/afaire-DBoGbXKh.js","assets/Agents-DK83ehic.js","assets/agents-donnees-C6OsZWfR.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-C4Fdhh0R.js","assets/App-Dg5AoCnH.js","assets/Appels-ztcXHnif.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/Assistants-D9i2Xwmg.css","assets/Assistants-oxIV76wK.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/AtelierDesContenus-DuimHZ_a.js","assets/Audience-BVfd3960.js","assets/Aujourdhui-8xpr0Qxr.js","assets/auth-C3qmAL9D.js","assets/avant-le-fauteuil-lecture-DxiRkLf4.js","assets/AvantLeFauteuil-BnEhaWGm.js","assets/avis-fiches-VxscVcwT.js","assets/AvisGoogle-DaPXfwX9.css","assets/AvisGoogle-Lel9rxvd.js","assets/BadgeEssai-BXcpwc6n.js","assets/BadgeSuggere-8MHbToTW.js","assets/besoins-CQ2zlKtj.js","assets/BesoinsEtRegles-B7REA7lD.js","assets/BesoinsEtRegles-BLwxGVV5.css","assets/bilan-B-bfPYR0.css","assets/bilan-CYhD0Lxb.js","assets/BilanMensuel-Ca_HMQK1.js","assets/Branches-DFwdSZyD.js","assets/bridges-CG3Ch8fz.js","assets/Caisse-CeS9pCPR.js","assets/caisse-du-soir-B9soBVNX.js","assets/caisse-du-soir-C6vPx-E_.css","assets/Caisses-Bd6gMndD.js","assets/Calendrier-amuJ5NKP.js","assets/campagnes-pur-a7dsYTeu.js","assets/Carnet-DWUwXTIv.js","assets/carte-B8-OAY7-.js","assets/carte-_W_-xBPj.css","assets/CarteModal-DGHpIEeU.js","assets/CartesCadeaux-CW9TMfqq.js","assets/Catalogue-CjKOciRx.js","assets/CentreDeCommande-BJhizVU4.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-6x-RAxod.js","assets/certificat-D8hTdwW2.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-BmaeVJ9F.js","assets/chiffre-du-jour-pur-CcweSn5r.js","assets/ChiffreDesPrestations-BdtxChYT.js","assets/client-VSOFSKW2.js","assets/cloture-du-jour-COH0v-eu.js","assets/ClotureDuTiroir-DKSshGyj.js","assets/Coffre-D1kyPZkH.js","assets/collecte-mtn-pur-Bq3uWgWT.js","assets/components-CSAWV5i6.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-jyGeq_ZE.js","assets/Comptes-ByeDh8nU.js","assets/consultation-Cn5Q4LLi.js","assets/consultation-CRW6QcWf.css","assets/Consultations-COZAynYM.js","assets/Consultations-DiE-2_mG.css","assets/consultNotes-f-bN8kEG.js","assets/Conversations-C0IvA3b1.js","assets/Conversations-D4WwB5Zo.css","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-DwRVp5pz.js","assets/currency-Cd0clE4P.js","assets/Customers-BU5SZxdk.js","assets/Dashboard-B2x7VsE_.css","assets/Dashboard-DscCJBeg.js","assets/dates-BGykWrJR.js","assets/Demandes-CmbRWMyh.js","assets/DepenseEnUnePhrase-5CkuiRTK.js","assets/DepenseEnUnePhrase-BIGRlGqP.css","assets/Depenses-19FVOVva.js","assets/depenses-saisie-RyEwcQo8.js","assets/devis-remis-CtzK2PHX.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-CiXzPYGi.js","assets/diagnostics-au-trone-CvuI3Z8q.js","assets/Dictee-C-pUYYFA.css","assets/Dictee-Cg8hon6T.js","assets/dictee-pur-dJo6HA1N.js","assets/Discussions-BDeDMn8y.js","assets/echappe-html-pur-gEhHOM07.js","assets/EditeurDesOffres-9GboIb88.js","assets/Encaissements-bcXP8BHE.js","assets/enfants-BI7RhBuQ.js","assets/Engagements-Cj5S9MhG.css","assets/engagements-coffre-DkyAuB_L.js","assets/Engagements-Ddlf4HMp.js","assets/EntreDeuxSeances-C-gOxt2U.js","assets/es-C3hEgT0j.js","assets/Evaluation-Cr0-D5OL.js","assets/facture-D_EBIyyo.js","assets/Factures-B_0KBQ6y.js","assets/FenetreDeLAgent-CXAQBFxO.js","assets/FenetreDesCivilites-zfNk1aak.css","assets/FenetreDesCivilites-Zj9PxMyg.js","assets/FenetreDuPoint-Cg3mbMfM.js","assets/Fil-CT-yeCoc.js","assets/finances-C8x7Mn4-.css","assets/fon-C1x1hSm4.js","assets/Fournisseurs-BN3q7nKP.js","assets/fournisseurs-Ditueb5M.js","assets/foyer-3KwNwuXf.js","assets/gerard-donnees-DA1BgLNG.js","assets/Gerard-TdEdB1qz.js","assets/Gerard-vo2IWvP3.css","assets/gestes-conversation-BGJByPTo.js","assets/heures-des-rappels-pur-BWJPB8OP.js","assets/HomeRituals-B9u4PMd-.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-Dt4_FXmJ.js","assets/ia-centre-Bw4Cygyi.js","assets/ia-diagnostic-pur-qGnFEvys.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-tableau-pur-p6UvREJe.js","assets/identite-5WUMyf4G.js","assets/index.es-uH81qAyH.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-CifVtrQe.js","assets/jspdf.es.min-iJ4rez2E.js","assets/JustePrix-D6gcLjd8.js","assets/kkiapay-CUIQ1LIs.js","assets/kkiapay-widget-CVmsl9OE.js","assets/Laboratoire-D_0sSpb2.js","assets/LaJournee-Bn_G0HCt.css","assets/LaJournee-DevfcESf.js","assets/le-caissier-pur-lXrPSj-2.js","assets/LesPaiements-B__90bCq.js","assets/LesPaiements-C9cEZlne.css","assets/LettresAuDossier-DmAzwYhS.js","assets/LienMndPay-e1sdw9sy.js","assets/Marketing-C9vL2hzM.js","assets/MarketingBranche-C5G-rEvy.js","assets/Marque-M0wNqIqj.js","assets/MesPourboires-B6wtt5j3.js","assets/MesPourboires-CENjelyb.css","assets/MesTaches-Cc4XUDf6.css","assets/MesTaches-DLJ2KrQf.js","assets/momo-C2ZVfV9J.js","assets/MonMois-CvsoIs6x.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/MtnMoMo-DagApRTt.js","assets/objectifs-C4h12Zds.js","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/opale-CZf-dspU.js","assets/oreille-B1AMUmZh.js","assets/paie-du-5-CXi1cg3i.js","assets/paie-du-5-DeJq-K_U.css","assets/paie-du-5-pur-CPiCK8fv.js","assets/paie-par-mtn-BcyGowzZ.js","assets/PaieParMtn-CQB_CLpU.js","assets/paliers-BwN6tn5o.js","assets/Parametres-CUDnIDHg.js","assets/parcours-CT78tiXV.js","assets/Parrainages-CZfcB4G8.js","assets/Parrainages-gAHAPB_6.css","assets/PassageAvantLeFauteuil-DXQsB3Gh.js","assets/pdf-BmUtTOYE.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/periode-des-pourboires-pur-BUWqfwov.js","assets/Personas-Cfmhpme-.js","assets/Personnel-CywcJdlQ.js","assets/photo-Va9peQDq.js","assets/pilotage-D8kf1Co8.css","assets/porte-de-l-equipe-CSzubZmu.js","assets/Pourboires-BEgmgcM6.js","assets/Predictions-CPBN-x13.js","assets/preload-helper-BRe_O-Rg.js","assets/Prestataires-Bm2FwJRU.js","assets/Prets-DimrVuHM.js","assets/PrevisionDuMois-Bq_qBR0b.js","assets/PrevisionDuMois-DlFTw3OX.css","assets/Previsions-9BU2Vg1T.css","assets/Previsions-DBv4DYTy.js","assets/previsions-pur-B-LvsK6D.js","assets/processus-pur-R6U5QcCi.js","assets/Projets-BovXwgvy.js","assets/Projets-COO7WDEE.css","assets/projets-CV_qc3kx.js","assets/projets-pur-2ZEMRNDU.js","assets/protocoles-BEFiSOrA.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-LxPEwRGP.js","assets/quiz-5qMPWZVi.js","assets/Rapport-pJtPfR-4.js","assets/Recommandations-aAjuzV90.js","assets/regler-DHR_B1Dm.css","assets/regler-N293LqPX.js","assets/regler-par-fedapay-pur-G8CEJdGn.js","assets/relances-pur-BacTXlI2.js","assets/releve-des-avis-CCz02Yxu.js","assets/SalonFoyer-BwK0t2k3.js","assets/secretariat-admin-DZKROkfn.js","assets/Secretariat-BK9-12Jj.js","assets/Secretariat-Cy79Zw30.css","assets/Signatures-B1EOJjew.js","assets/SignerUnPdf-DOwINFL1.js","assets/Synthese-BF_VicTt.js","assets/SyntheseGraphes-CArewBJ2.js","assets/systeme-TPy-pF7j.css","assets/Tableau-D8vDzRPb.js","assets/temps-XE30AU9G.js","assets/Textes-csCSetun.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-CEvXT0Tr.js","assets/tiroirs-CkDzpGy0.css","assets/trone-D5EJIoZl.css","assets/trone-yJq1vDsk.js","assets/useAudiences-C7EAeouT.js","assets/useClotureDuJour-BNyp3wIc.js","assets/visios-DZi7VdUD.js","assets/Vitrine-BHCOTjC5.js","assets/Vitrine-BWilTqQJ.css","assets/_admin-g9TLUH6L.js","assets/_contrat-BIvBQEx8.js","assets/_reuni-DXCfBIbG.js","assets/_shared-SB92o8lH.js","assets/_signature-BteX8OFx.js","assets/_ui-BrUDlmuM.css","assets/_ui-_guFn7o7.js"];
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
