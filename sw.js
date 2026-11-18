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
const BUILD = "20261118052132";
const A_GARDER = ["./","assets/Abonnements-CLLAP6GT.js","assets/abonnements-DGJKF5vJ.js","assets/Abonnements-DTY7p2DH.css","assets/Academie-cpdiqPS_.js","assets/Acces-DP-Cp2ql.js","assets/AFaire-asUeI0AC.js","assets/afaire-CYn8Afw_.js","assets/Agents-DF-HV0AY.js","assets/agents-donnees-CnZqfZ5c.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-HFebxOYk.js","assets/App-DGZblj1C.js","assets/Appels-Cxla-y1N.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/Assistants-BJ9RgsdJ.js","assets/Assistants-D9i2Xwmg.css","assets/AtelierDesContenus-CMaTHrlv.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/Audience-gQ9RuxXH.js","assets/Aujourdhui-BBuvOhaD.js","assets/auth-BNR457b6.js","assets/avant-le-fauteuil-lecture-B6usShG4.js","assets/AvantLeFauteuil-CXvTZD2r.js","assets/avis-fiches-KD8D1_Tk.js","assets/AvisGoogle-DaPXfwX9.css","assets/AvisGoogle-DYl9mboz.js","assets/BadgeEssai-Br5Hg7UH.js","assets/BadgeSuggere-8N9psSxm.js","assets/besoins-Cg4ZxhMa.js","assets/BesoinsEtRegles-BLwxGVV5.css","assets/BesoinsEtRegles-_tKdlQ2x.js","assets/bilan-B-bfPYR0.css","assets/bilan-DLVWbZ_z.js","assets/BilanMensuel-ZfPZLKXa.js","assets/Branches-BRuA2yAf.js","assets/bridges-Bb8i1AZE.js","assets/Caisse-CT5bktXJ.js","assets/caisse-du-soir-C6vPx-E_.css","assets/caisse-du-soir-CYSu8yiG.js","assets/Caisses-rWdOWkPF.js","assets/Calendrier-DG81PP5F.js","assets/campagnes-pur-B7D5VO5k.js","assets/Carnet-CKNx07YV.js","assets/carte-DEYC-ZFB.js","assets/carte-_W_-xBPj.css","assets/CarteModal-D0pi9uKf.js","assets/CartesCadeaux-hgzKdwe3.js","assets/Catalogue-8lyQYSEx.js","assets/CentreDeCommande-D3k4dDOO.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-B2jA6nl_.js","assets/certificat-C-A4YnUH.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-xhmBZrRp.js","assets/chiffre-du-jour-pur-A2EhJ_ce.js","assets/ChiffreDesPrestations-n0Frk6XM.js","assets/client-B00RLtOw.js","assets/cloture-du-jour-rs57qG1y.js","assets/ClotureDuTiroir-D8RxU0iC.js","assets/Coffre-Di3aFUd3.js","assets/collecte-mtn-pur-Bq3uWgWT.js","assets/components-FlKAVviH.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-BWNgPAlh.js","assets/Comptes-3JulxygO.js","assets/consultation-CRW6QcWf.css","assets/consultation-MdF23OW5.js","assets/Consultations-DiE-2_mG.css","assets/Consultations-hNdFm38E.js","assets/consultNotes-3qcLON_f.js","assets/Conversations-D4WwB5Zo.css","assets/Conversations-D6Lfc76Z.js","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-CTpPIH4l.js","assets/currency-Cd0clE4P.js","assets/Customers-DrWdVZVO.js","assets/Dashboard-B2x7VsE_.css","assets/Dashboard-DuRBr6oB.js","assets/dates-Cd_N-jKr.js","assets/Demandes-Bc3g2GBh.js","assets/DepenseEnUnePhrase-BIGRlGqP.css","assets/DepenseEnUnePhrase-THMKMiTM.js","assets/Depenses-BxgQp7vJ.js","assets/depenses-saisie-DmD04yMc.js","assets/devis-remis-CR-I32Z_.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-BwWiSLqU.js","assets/diagnostics-au-trone-BW3lfvhG.js","assets/Dictee-C-pUYYFA.css","assets/Dictee-CUpzYNJ5.js","assets/dictee-pur-Bk3qO9ID.js","assets/Discussions-_QC7u0lW.js","assets/echappe-html-pur-gEhHOM07.js","assets/EditeurDesOffres-Djl-u6TP.js","assets/Encaissements-C9GG6UR5.js","assets/enfants-DZktenCo.js","assets/Engagements-Cj5S9MhG.css","assets/engagements-coffre-BW68iGYx.js","assets/Engagements-CsK_i-nk.js","assets/EntreDeuxSeances-BCy3TUjd.js","assets/es-k6xDASSu.js","assets/Evaluation-C5uJbLxK.js","assets/facture-O-nOSy2x.js","assets/Factures-DbXdtVt-.js","assets/FenetreDeLAgent-DBthxWcO.js","assets/FenetreDesCivilites-BLYcAa48.js","assets/FenetreDesCivilites-zfNk1aak.css","assets/FenetreDuPoint-BUUvMEZs.js","assets/Fil-CFVdgvbM.js","assets/finances-C8x7Mn4-.css","assets/fon-BB3GfY90.js","assets/fournisseurs-Bhu0EOAm.js","assets/Fournisseurs-r0mfsl4k.js","assets/foyer-B7lSTfFf.js","assets/Gerard-Cgj-zsJh.css","assets/gerard-donnees-BN9zTj-Y.js","assets/Gerard-JKI9nl1k.js","assets/gestes-conversation-COvK0pyX.js","assets/heures-des-rappels-pur-BWJPB8OP.js","assets/HomeRituals-BCdqvl9z.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-C6bmwAPG.js","assets/ia-centre-DpQHcu5n.js","assets/ia-diagnostic-pur-qGnFEvys.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-tableau-pur-p6UvREJe.js","assets/identite-C9ZcA9IH.js","assets/index.es-Dsqs6HNr.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-CRjkhOFh.js","assets/jspdf.es.min-BcgC01rS.js","assets/JustePrix-6IqWBwf0.js","assets/kkiapay-BhSXsvYJ.js","assets/kkiapay-widget-CVmsl9OE.js","assets/Laboratoire-C-bfLBG9.js","assets/LaJournee-Bn_G0HCt.css","assets/LaJournee-CMJVPvo6.js","assets/le-caissier-pur-7_bOH1ZV.js","assets/LesPaiements-C9cEZlne.css","assets/LesPaiements-D9lmVA-n.js","assets/LettresAuDossier-B6L43wjw.js","assets/LienMndPay-B0EnW3md.js","assets/Marketing-4lUwf_ky.js","assets/MarketingBranche-BIFhR6n-.js","assets/Marque-DJq1QmMy.js","assets/MesPourboires-C5BvQYjF.js","assets/MesPourboires-CENjelyb.css","assets/MesTaches-Cc4XUDf6.css","assets/MesTaches-LKM6-Hfa.js","assets/momo-C2ZVfV9J.js","assets/MonMois-DjsqUTlh.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/MtnMoMo-Cvf0TjPA.js","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/objectifs-KNkRAOst.js","assets/opale-BG4UE5C7.js","assets/oreille-B1AMUmZh.js","assets/paie-du-5-DeJq-K_U.css","assets/paie-du-5-D_lE7_4h.js","assets/paie-du-5-pur-CPiCK8fv.js","assets/paie-par-mtn-X0zk2M7H.js","assets/PaieParMtn-BdH2dcab.js","assets/paliers-BK8oYccy.js","assets/Parametres-GHNBx0Vr.js","assets/parcours-CjDTC3YC.js","assets/Parrainages-Cu_IVmGO.js","assets/Parrainages-gAHAPB_6.css","assets/PassageAvantLeFauteuil-DZ7dU07F.js","assets/pdf-C54V10PM.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/periode-des-pourboires-pur-BUWqfwov.js","assets/Personas-DafXEXJC.js","assets/Personnel-DDxMGveV.js","assets/photo-Cs4fS873.js","assets/pilotage-D8kf1Co8.css","assets/porte-de-l-equipe-B5pEGq1j.js","assets/Pourboires-CnywmrqB.js","assets/Predictions-DPQ5jTMv.js","assets/preload-helper-BRe_O-Rg.js","assets/Prestataires-uR2yriVb.js","assets/Prets-BYalT1EP.js","assets/PrevisionDuMois-DlFTw3OX.css","assets/PrevisionDuMois-DZI1q8TZ.js","assets/Previsions-9BU2Vg1T.css","assets/Previsions-DURoc2Gl.js","assets/previsions-pur-rGyyzz1O.js","assets/processus-pur-R6U5QcCi.js","assets/projets-BER0d4XX.js","assets/Projets-COO7WDEE.css","assets/Projets-CUvedTaJ.js","assets/projets-pur-2ZEMRNDU.js","assets/protocoles-DdlYFN2N.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-Bs39FcAT.js","assets/quiz-5qMPWZVi.js","assets/Rapport-T_wWe3Ma.js","assets/Recommandations-CJ0BjwUo.js","assets/regler-aEPcD9Z3.js","assets/regler-DHR_B1Dm.css","assets/regler-par-fedapay-pur-G8CEJdGn.js","assets/relances-pur-BacTXlI2.js","assets/releve-des-avis-DEA8x5Oz.js","assets/SalonFoyer-DI9AA-pt.js","assets/secretariat-admin-Dr9cP4hu.js","assets/Secretariat-Cy79Zw30.css","assets/Secretariat-tJ2YbKrK.js","assets/Signatures-DKdWqK4F.js","assets/SignerUnPdf-BcX63ncj.js","assets/Synthese-DSYHuBBL.js","assets/SyntheseGraphes-BDPtcR7K.js","assets/systeme-TPy-pF7j.css","assets/Tableau-DI2kBmM_.js","assets/temps-D7835It-.js","assets/Textes-ClOyrxZm.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-BVfuGae4.js","assets/tiroirs-CkDzpGy0.css","assets/trone-CB7oyxDK.js","assets/trone-DO_K_gMP.css","assets/useAudiences-6G6GvcXF.js","assets/useClotureDuJour-B3b-PB2q.js","assets/visios-R0kYECGM.js","assets/Vitrine-B3dTG8Z0.js","assets/Vitrine-BWilTqQJ.css","assets/_admin-qUIck1xP.js","assets/_contrat-J7ctBm27.js","assets/_reuni-DTkmMlzf.js","assets/_shared-CxxB7DFU.js","assets/_signature-B48kDUhE.js","assets/_ui-BrUDlmuM.css","assets/_ui-DpL5oVS7.js"];
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
