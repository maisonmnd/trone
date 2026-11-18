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
const BUILD = "20261118075116";
const A_GARDER = ["./","assets/abonnements-CH9lhb_1.js","assets/Abonnements-DTY7p2DH.css","assets/Abonnements-ypMtXf6U.js","assets/Academie-BCp7CUOo.js","assets/Acces-D20K4jcC.js","assets/AFaire-COFPCoT7.js","assets/afaire-D31rd90B.js","assets/Agents-COLsST5N.js","assets/agents-donnees-Chyj4lXI.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-u1c_FKRQ.js","assets/App-DHZ5sY6K.js","assets/Appels-DzH6LUTF.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/Assistants-Bn0XPtYA.js","assets/Assistants-D9i2Xwmg.css","assets/AtelierDesContenus-D3-p6F2A.css","assets/AtelierDesContenus-O9ntLjHn.js","assets/Audience-jSKYMCve.js","assets/Aujourdhui-CHZFUQgf.js","assets/auth-n3SwvEO-.js","assets/avant-le-fauteuil-lecture-DryWHbIO.js","assets/AvantLeFauteuil-BbHAfIjr.js","assets/avis-fiches-C-wfR7Hc.js","assets/AvisGoogle-DaPXfwX9.css","assets/AvisGoogle-DBxL2Dg1.js","assets/BadgeEssai-Cf1s8hUr.js","assets/BadgeSuggere-Cl13JfIz.js","assets/besoins-CK3Q-Bx7.js","assets/BesoinsEtRegles-BFPdcZAA.js","assets/BesoinsEtRegles-BLwxGVV5.css","assets/bilan-B-bfPYR0.css","assets/bilan-mgk7zaFe.js","assets/BilanMensuel-CPpfEMda.js","assets/Branches-ClsSc2Nk.js","assets/bridges-BFS4HLx9.js","assets/Caisse-BvC5hdsU.js","assets/caisse-du-soir-C6vPx-E_.css","assets/caisse-du-soir-D7KwXulr.js","assets/Caisses-C4xy6GB5.js","assets/Calendrier-u4C8WONW.js","assets/campagnes-pur-BBbw94iK.js","assets/Carnet-BquiGR3I.js","assets/carte-BJ86Z0sx.js","assets/carte-_W_-xBPj.css","assets/CarteModal-BYjFxQKj.js","assets/CartesCadeaux-BHkEsf7u.js","assets/Catalogue-DMKQjGtS.js","assets/CentreDeCommande-CUAqHj74.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-B-S4aYTc.js","assets/certificat-BvRj7i0-.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-DFsNL_al.js","assets/chiffre-du-jour-pur-DI05GYLQ.js","assets/ChiffreDesPrestations-Iq5V0O_d.js","assets/client-wo1zCi-1.js","assets/cloture-du-jour-B82ol7Qz.js","assets/ClotureDuTiroir-BdGylGpZ.js","assets/Coffre-CWfNmh2P.js","assets/collecte-mtn-pur-Bq3uWgWT.js","assets/components-Dr_BVdwl.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-C0E8ey0q.js","assets/Comptes-6qPAWuWU.js","assets/consultation-CRW6QcWf.css","assets/consultation-V-CPoS4x.js","assets/Consultations-DGQ1dO3I.js","assets/Consultations-DiE-2_mG.css","assets/consultNotes-B47iULP8.js","assets/Conversations-D4WwB5Zo.css","assets/Conversations-z0sK7Hr-.js","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-D2snWiI2.js","assets/currency-Cd0clE4P.js","assets/Customers-9PJ6EBFt.js","assets/Dashboard-B2x7VsE_.css","assets/Dashboard-BdBl3ifS.js","assets/dates-DMoOYi0w.js","assets/Demandes-DMoa3EVU.js","assets/DepenseEnUnePhrase-BIGRlGqP.css","assets/DepenseEnUnePhrase-Dmz89wAV.js","assets/depenses-saisie-DnsZi5VS.js","assets/Depenses-TI7HzZIo.js","assets/devis-remis-eF5gs8Yw.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-D3xYuRzK.js","assets/diagnostics-au-trone-e6wLIAKi.js","assets/Dictee-BGE-SsFd.js","assets/Dictee-C-pUYYFA.css","assets/dictee-pur-BjLUkWE2.js","assets/Discussions-DAzW5XcV.js","assets/echappe-html-pur-gEhHOM07.js","assets/EditeurDesOffres-Cc9GGMQI.js","assets/Encaissements-QQOcQR-g.js","assets/enfants-DUxOu4uy.js","assets/Engagements-Cj5S9MhG.css","assets/engagements-coffre-DoOVzm_Z.js","assets/Engagements-Dh_--YpW.js","assets/EntreDeuxSeances-CjrCMmnB.js","assets/es-BXfXzUbn.js","assets/Evaluation-CWSd5zQl.js","assets/facture-DVlGfACb.js","assets/Factures-DD34P5iZ.js","assets/FenetreDeLAgent-CxXBGI7s.js","assets/FenetreDesCivilites-BOoXwXkV.js","assets/FenetreDesCivilites-zfNk1aak.css","assets/FenetreDuPoint-uURGeawz.js","assets/Fil-Da-Gs_L8.js","assets/finances-C8x7Mn4-.css","assets/fon-D5G-iEao.js","assets/fournisseurs-CF2n-D5F.js","assets/Fournisseurs-Db507YHc.js","assets/foyer-CPYBjfSb.js","assets/Gerard-Cgj-zsJh.css","assets/Gerard-CiwrVhym.js","assets/gerard-donnees-DQ5VDl0T.js","assets/gestes-conversation-Cex6sNgB.js","assets/heures-des-rappels-pur-BWJPB8OP.js","assets/HomeRituals-ofyssRC5.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-B37hT2se.js","assets/ia-centre-z35XfxxB.js","assets/ia-diagnostic-pur-qGnFEvys.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-tableau-pur-p6UvREJe.js","assets/identite-yAu_aSTF.js","assets/index.es-TanUY_AL.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-CJ16pGJa.js","assets/jspdf.es.min-C1fq7-1Y.js","assets/JustePrix-CE0s6yP6.js","assets/kkiapay-AUd2yu8T.js","assets/kkiapay-widget-CVmsl9OE.js","assets/Laboratoire-Bvd7XAOu.js","assets/LaJournee-Bn_G0HCt.css","assets/LaJournee-Cftd0kGU.js","assets/le-caissier-pur-Bfn83Yfz.js","assets/LesPaiements-C9cEZlne.css","assets/LesPaiements-xi27Xec_.js","assets/LettresAuDossier-VAwdDvbZ.js","assets/LienMndPay-DBTAQ1xK.js","assets/Marketing-BS_nCxlt.js","assets/MarketingBranche-CYa72Vkm.js","assets/Marque-COpUy64_.js","assets/MesPourboires-CENjelyb.css","assets/MesPourboires-Di7eFt-K.js","assets/MesTaches-Cc4XUDf6.css","assets/MesTaches-DGlzG3cn.js","assets/momo-C2ZVfV9J.js","assets/MonMois-DkYo8Cfi.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/MtnMoMo-Bi0-sEJ4.js","assets/objectifs-Bdq2xBTY.js","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/opale-BFZda4KM.js","assets/oreille-B1AMUmZh.js","assets/paie-du-5-CKRsrnCc.js","assets/paie-du-5-DeJq-K_U.css","assets/paie-du-5-pur-CPiCK8fv.js","assets/paie-par-mtn-5a5g2hiq.js","assets/PaieParMtn-C04PEtay.js","assets/paliers-D6r50gyw.js","assets/Parametres-D6lkHT0X.js","assets/parcours-DI3CUYHy.js","assets/Parrainages-CLKwZWXW.js","assets/Parrainages-gAHAPB_6.css","assets/PassageAvantLeFauteuil-DjMPSTSN.js","assets/pdf-C6NHkwpK.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/periode-des-pourboires-pur-BUWqfwov.js","assets/Personas-BOomsz0F.js","assets/Personnel-B7_NZv--.js","assets/photo-r5BQ307l.js","assets/pilotage-D8kf1Co8.css","assets/porte-de-l-equipe-h0TiV-YQ.js","assets/Pourboires-BP6VPHwn.js","assets/Predictions-ZVPKnUHk.js","assets/preload-helper-BRe_O-Rg.js","assets/Prestataires-DARJF82J.js","assets/Prets-CU9Vw3kH.js","assets/PrevisionDuMois-DlFTw3OX.css","assets/PrevisionDuMois-NB3R03Ub.js","assets/Previsions-9BU2Vg1T.css","assets/previsions-pur-CV_j-mnZ.js","assets/Previsions-yjYgMjDA.js","assets/processus-pur-R6U5QcCi.js","assets/Projets-COO7WDEE.css","assets/Projets-CvgduXZM.js","assets/projets-DPenMpzk.js","assets/projets-pur-2ZEMRNDU.js","assets/protocoles-BI9By5tO.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-DXIpO6t8.js","assets/quiz-5qMPWZVi.js","assets/Rapport-D_fWA4ZA.js","assets/Recommandations-Cz0Rf_Wj.js","assets/regler-BUpEFD9X.js","assets/regler-DHR_B1Dm.css","assets/regler-par-fedapay-pur-G8CEJdGn.js","assets/relances-pur-BacTXlI2.js","assets/releve-des-avis-PJ6GDoNe.js","assets/SalonFoyer-CkWPvUcp.js","assets/secretariat-admin-DiBwkqr7.js","assets/Secretariat-Cy79Zw30.css","assets/Secretariat-DoAwiCty.js","assets/Signatures-DkQPzPoJ.js","assets/SignerUnPdf-BGoNgK9s.js","assets/Synthese-B7gjEIu4.js","assets/SyntheseGraphes-Dr195XPD.js","assets/systeme-TPy-pF7j.css","assets/Tableau-DIqcev_Y.js","assets/temps-M_X_ACaF.js","assets/Textes-D8A1jJM3.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-C59TiBIu.js","assets/tiroirs-CkDzpGy0.css","assets/trone-DO_K_gMP.css","assets/trone-Dq2fUFPf.js","assets/useAudiences-Cx9EjBtx.js","assets/useClotureDuJour-C-OT-ijA.js","assets/visios-DMu9me61.js","assets/Vitrine-BWilTqQJ.css","assets/Vitrine-IBLqUNy3.js","assets/_admin-DwagGacp.js","assets/_contrat-MclAAXuS.js","assets/_reuni-CnYapMwT.js","assets/_shared-C8i1J3Vb.js","assets/_signature-BlQIOXg7.js","assets/_ui-BrUDlmuM.css","assets/_ui-Cjf1qjlZ.js"];
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
