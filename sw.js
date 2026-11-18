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
const BUILD = "20261118090254";
const A_GARDER = ["./","assets/abonnements-C-CsJZ9v.js","assets/Abonnements-CItZMvWr.js","assets/Abonnements-DTY7p2DH.css","assets/Academie-B1dgeF9Z.js","assets/Acces-Bp_4qfuS.js","assets/AFaire-B_GSeBRg.js","assets/afaire-C7KppREq.js","assets/agents-donnees-CO1cmAHj.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Agents-vNNIAwZB.js","assets/Analytics-DUNdX4h6.js","assets/App-ulK_xW5g.js","assets/Appels-pRDTrv04.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/Assistants-D9i2Xwmg.css","assets/Assistants-DMoMKz-g.js","assets/AtelierDesContenus-CekBb1ut.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/Audience-DuLl36SO.js","assets/Aujourdhui-Ck0DD0z-.js","assets/auth-CUN5sS-7.js","assets/avant-le-fauteuil-lecture-BgScvwtT.js","assets/AvantLeFauteuil-Dk8bxqoI.js","assets/avis-fiches-C2lrFB3I.js","assets/AvisGoogle-B_0CYHKG.js","assets/AvisGoogle-DaPXfwX9.css","assets/BadgeEssai-Cv8hmQvm.js","assets/BadgeSuggere-CM57uCFQ.js","assets/besoins-DfnyuDeq.js","assets/BesoinsEtRegles-BLwxGVV5.css","assets/BesoinsEtRegles-D3h_-Q6V.js","assets/bilan-B-bfPYR0.css","assets/bilan-CCDOY1_l.js","assets/BilanMensuel-CcP3cIhe.js","assets/Branches-B3FOku4Z.js","assets/bridges-DvZbfSB9.js","assets/Caisse-BG1Iu5uF.js","assets/caisse-du-soir-C6vPx-E_.css","assets/caisse-du-soir-ClF8F9y5.js","assets/Caisses-ClL8xCSW.js","assets/Calendrier-Dn3mf5Lu.js","assets/campagnes-pur-CfVmpW3g.js","assets/Carnet-ChVCG01T.js","assets/carte-CDPmCm1a.js","assets/carte-_W_-xBPj.css","assets/CarteModal-D0JT5xwJ.js","assets/CartesCadeaux-DWIaVDoE.js","assets/Catalogue-ChHaVnbg.js","assets/CentreDeCommande-BhgMWYFG.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-DSJlcihn.js","assets/certificat-D-gXrPda.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-BQOqtFk8.js","assets/chiffre-du-jour-pur-DB6GFagb.js","assets/ChiffreDesPrestations-OQ2O6JBK.js","assets/client-CPuyGOyh.js","assets/cloture-du-jour-BJWq31UN.js","assets/ClotureDuTiroir-NdQYTSun.js","assets/Coffre-D5n41SH4.js","assets/collecte-mtn-pur-Bq3uWgWT.js","assets/components-Dd2Zv7YG.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-Mgv1hzsl.js","assets/Comptes-BdLJAOnZ.js","assets/consultation-CRW6QcWf.css","assets/consultation-DBqXnx0g.js","assets/Consultations-cuzD67KM.js","assets/Consultations-DiE-2_mG.css","assets/consultNotes-D5gEsCpK.js","assets/Conversations-D4WwB5Zo.css","assets/Conversations-D8rCOZX-.js","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-CRH40FUx.js","assets/currency-Cd0clE4P.js","assets/Customers-HCDqaCYr.js","assets/Dashboard-B2x7VsE_.css","assets/Dashboard-CbWwJzTM.js","assets/dates-CknP3Umq.js","assets/Demandes-6upaVbkQ.js","assets/DepenseEnUnePhrase-BIGRlGqP.css","assets/DepenseEnUnePhrase-BQafwa7G.js","assets/Depenses-BMcT9Pf_.js","assets/depenses-saisie-t9ambs0g.js","assets/devis-remis-DRDK4tpO.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-CR1AZA2b.js","assets/diagnostics-au-trone-DGbpsBxR.js","assets/Dictee-BBMom51F.js","assets/Dictee-C-pUYYFA.css","assets/dictee-pur-Dh46Zzi-.js","assets/Discussions-BKRSpx6T.js","assets/echappe-html-pur-gEhHOM07.js","assets/EditeurDesOffres-CCpm4Gy-.js","assets/Encaissements-5cwmfH5P.js","assets/enfants-D3tKd_X6.js","assets/Engagements-1QHggYgs.js","assets/Engagements-Cj5S9MhG.css","assets/engagements-coffre-CT-1RAHI.js","assets/EntreDeuxSeances-DvLGhQCf.js","assets/es-JsDUw4fA.js","assets/Evaluation-B3N9aBZg.js","assets/facture-BkzaoAJw.js","assets/Factures-BybV-fVz.js","assets/FenetreDeLAgent-DVywYaRC.js","assets/FenetreDesCivilites-Bq503Dar.js","assets/FenetreDesCivilites-zfNk1aak.css","assets/FenetreDuPoint-RuDMhqUK.js","assets/Fil-8ZPhwXJc.js","assets/finances-C8x7Mn4-.css","assets/fon-C4aSSsHz.js","assets/fournisseurs-DN_W9tNm.js","assets/Fournisseurs-DudIEglJ.js","assets/foyer-DzzEiTic.js","assets/Gerard-BxWITWAx.css","assets/gerard-donnees-BjSvRcIf.js","assets/Gerard-DWmgaDwZ.js","assets/gestes-conversation-CeZi5GIu.js","assets/heures-des-rappels-pur-BWJPB8OP.js","assets/HomeRituals-OlbyGIYH.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-DsXiZ2Ug.js","assets/ia-centre-DFB-CWfO.js","assets/ia-diagnostic-pur-qGnFEvys.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-tableau-pur-p6UvREJe.js","assets/identite-B0MgA7Nm.js","assets/index.es-D0psoR_M.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-BZlcR4ii.js","assets/jspdf.es.min-BNpWc8BT.js","assets/JustePrix-C9bXebW-.js","assets/kkiapay-D_5R47l1.js","assets/kkiapay-widget-CVmsl9OE.js","assets/Laboratoire-CowZDmSy.js","assets/LaJournee-Bn_G0HCt.css","assets/LaJournee-DrB0U_el.js","assets/le-caissier-pur-BI_RsKSu.js","assets/LesPaiements-BU7SIzCW.js","assets/LesPaiements-C9cEZlne.css","assets/LettresAuDossier-DYWzKLiy.js","assets/LienMndPay-CpA34inf.js","assets/Marketing-DxIpLN4e.js","assets/MarketingBranche-DhAEMAJf.js","assets/Marque-CsyIrADK.js","assets/MesPourboires-CENjelyb.css","assets/MesPourboires-DHCNP2A2.js","assets/MesTaches-Cc4XUDf6.css","assets/MesTaches-w9pyIRNU.js","assets/momo-C2ZVfV9J.js","assets/MonMois-OJAmBU56.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/MtnMoMo-CX7gF8hX.js","assets/objectifs-BVqsHGsh.js","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/opale-D4MF1t-N.js","assets/oreille-B1AMUmZh.js","assets/paie-du-5-D2CyMPq8.js","assets/paie-du-5-DeJq-K_U.css","assets/paie-du-5-pur-CPiCK8fv.js","assets/paie-par-mtn-CqBiMtu1.js","assets/PaieParMtn-Ok7Dej7u.js","assets/paliers-BzunPI9y.js","assets/Parametres-ncwDdufQ.js","assets/parcours-C0VAmqTU.js","assets/Parrainages-C2d2xM3q.js","assets/Parrainages-gAHAPB_6.css","assets/PassageAvantLeFauteuil-DVzMIiIZ.js","assets/pdf-CKX0kzX8.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/periode-des-pourboires-pur-BUWqfwov.js","assets/Personas-_6ZT011v.js","assets/Personnel-BWNWSLu4.js","assets/photo-BjaP9MiO.js","assets/pilotage-D8kf1Co8.css","assets/porte-de-l-equipe-Brp79opc.js","assets/Pourboires-jOJpN16G.js","assets/Predictions-C_rqE7gE.js","assets/preload-helper-BRe_O-Rg.js","assets/Prestataires-B7ukCE-3.js","assets/Prets-CKnLzMBC.js","assets/PrevisionDuMois-DlFTw3OX.css","assets/PrevisionDuMois-FpILebGp.js","assets/Previsions-9BU2Vg1T.css","assets/Previsions-DCg1ex3s.js","assets/previsions-pur-BO-q87LZ.js","assets/processus-pur-R6U5QcCi.js","assets/Projets-COO7WDEE.css","assets/Projets-CrhRume9.js","assets/projets-DaO6UORP.js","assets/projets-pur-2ZEMRNDU.js","assets/protocoles-BpF69_wh.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-cWDev93F.js","assets/quiz-5qMPWZVi.js","assets/Rapport-B5feiscD.js","assets/Recommandations-BpP4HfMi.js","assets/regler-CzUlix1o.js","assets/regler-DHR_B1Dm.css","assets/regler-par-fedapay-pur-G8CEJdGn.js","assets/relances-pur-BacTXlI2.js","assets/releve-des-avis-DPEHNFmu.js","assets/SalonFoyer-BKi9_hDg.js","assets/secretariat-admin-Pg8jZi0i.js","assets/Secretariat-CfUsNTlj.js","assets/Secretariat-Cy79Zw30.css","assets/Signatures-BI7_RDQy.js","assets/SignerUnPdf-CHVkChT1.js","assets/Synthese-Di_sEtvH.js","assets/SyntheseGraphes-DaeGvjHL.js","assets/systeme-TPy-pF7j.css","assets/Tableau-Cdz7Zu-z.js","assets/temps-CzypNqg2.js","assets/Textes-BpGCwh9n.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-CkDzpGy0.css","assets/tiroirs-DsnHiggl.js","assets/trone-BZXf-Hk_.js","assets/trone-fVMGnfYY.css","assets/useAudiences-Ddr_b0d8.js","assets/useClotureDuJour-aBH4eD1A.js","assets/visios-CNFIlbm3.js","assets/Vitrine-BWilTqQJ.css","assets/Vitrine-DO-CJV_6.js","assets/_admin-MEhosEDU.js","assets/_contrat-BnfHXJqR.js","assets/_reuni-ofMnIfcy.js","assets/_shared-oPOPKPVh.js","assets/_signature-CauI6Sss.js","assets/_ui-BlQRe01L.js","assets/_ui-BrUDlmuM.css"];
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
