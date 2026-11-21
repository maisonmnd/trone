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
const BUILD = "20261121071758";
const A_GARDER = ["./","assets/Abonnements-BV_Zg7YH.js","assets/abonnements-Cry0WjmT.js","assets/Abonnements-DTY7p2DH.css","assets/Academie-BEvpuh6y.js","assets/Acces-BoOVM0Rw.js","assets/AFaire-DsEKiUJK.js","assets/afaire-Dt-hmmTN.js","assets/Agents-BBfYFP4B.js","assets/agents-donnees-DjRu7464.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-DwDAwT2f.js","assets/App-DCkNkhFI.js","assets/Appels-CNM1QYX8.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/Assistants-BZFzV_1j.js","assets/Assistants-D9i2Xwmg.css","assets/AtelierDesContenus-D3-p6F2A.css","assets/AtelierDesContenus-DuoChAAx.js","assets/Audience-nCVMR4Zl.js","assets/Aujourdhui-DZ4lUNRo.js","assets/auth-DDhPk_0D.js","assets/avant-le-fauteuil-lecture-DaRbcopw.js","assets/AvantLeFauteuil-BjZNYzaS.js","assets/avis-fiches-BvQJWbRi.js","assets/AvisGoogle-DaPXfwX9.css","assets/AvisGoogle-sEYedxdK.js","assets/BadgeEssai-JazTfKVR.js","assets/BadgeSuggere-BCxSj1Xc.js","assets/besoins-D6vnOBX5.js","assets/BesoinsEtRegles-BLwxGVV5.css","assets/BesoinsEtRegles-CuP4thDk.js","assets/bilan-B-bfPYR0.css","assets/bilan-DxoGryqK.js","assets/BilanMensuel-B9FbCUjV.js","assets/Branches-DQrSqpdb.js","assets/bridges-D5bpUb1j.js","assets/Caisse-8LdZp29-.js","assets/caisse-du-soir-C6vPx-E_.css","assets/caisse-du-soir-yGF5Q6eK.js","assets/caisse-fluide-pur-DCUlRrm_.js","assets/Caisses-BbFwzMru.js","assets/Calendrier-DZLK96P2.js","assets/campagnes-pur-BGPqgydD.js","assets/Carnet-Dgpbfs8G.js","assets/carte-YaxkJowC.js","assets/carte-_W_-xBPj.css","assets/CarteModal-pB8ygb9E.js","assets/CartesCadeaux-DGd5DGEf.js","assets/Catalogue-DvnxEqLA.js","assets/CentreDeCommande-Du8kyJhp.css","assets/CentreDeCommande-Q4l7lTSF.js","assets/Cercle-Cbisn2yP.js","assets/certificat-DCikmhe3.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-BTy47n09.js","assets/chiffre-du-jour-pur-0L17qI6k.js","assets/ChiffreDesPrestations-CZFD3PvR.js","assets/Classement-BLq3V1Bd.js","assets/Classement-CmpbQZDu.css","assets/classement-CnKrTWnU.js","assets/classement-pur-CQOYU06l.js","assets/client-Bqqm7eZE.js","assets/cloture-du-jour-DTlDgWtZ.js","assets/ClotureDuTiroir-ChRa8N6i.js","assets/Coffre-D95N3Kpg.js","assets/collecte-mtn-pur-BKoFYpbn.js","assets/components-HRs8x6Mx.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-C0qZOAch.js","assets/Comptes-B6oOxDtu.js","assets/consultation-CRW6QcWf.css","assets/consultation-QaQKO9E2.js","assets/Consultations-BtJomeRK.js","assets/Consultations-DiE-2_mG.css","assets/consultNotes-B4tk8NJg.js","assets/Conversations-CdXokMJB.js","assets/Conversations-D4WwB5Zo.css","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-wI1ayFWW.js","assets/currency-Cd0clE4P.js","assets/Customers-B9mAmVfN.js","assets/Dashboard-B2x7VsE_.css","assets/Dashboard-BO5ZvbAV.js","assets/dates-CdRJaRwQ.js","assets/DemanderAPerle-bmBPJH-T.css","assets/DemanderAPerle-BYCxxHSb.js","assets/Demandes--HmhPPJq.js","assets/DepenseEnUnePhrase-BIGRlGqP.css","assets/DepenseEnUnePhrase-CZYj7IWC.js","assets/depenses-saisie-BbkO30FM.js","assets/Depenses-UOCjBpg3.js","assets/devis-remis-TMlxTQOm.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-Czh2IweN.js","assets/diagnostics-au-trone-D9pXBil6.js","assets/Dictee-BqIWXcHv.js","assets/Dictee-C-pUYYFA.css","assets/dictee-pur-CLlVxL6s.js","assets/Discussions-DpRxjzYM.js","assets/echappe-html-pur-gEhHOM07.js","assets/EditeurDesOffres-PR_0d_Vv.js","assets/Encaissements-rafWqav9.js","assets/enfants-CCOCvmrZ.js","assets/Engagements-BgbEAaa5.js","assets/Engagements-Cj5S9MhG.css","assets/engagements-coffre-D5GzxFca.js","assets/EntreDeuxSeances-C7FC8w19.js","assets/es-7laXiMD8.js","assets/Evaluation-BECelozh.js","assets/facture-5bJodTvn.js","assets/Factures-VKXXPkA1.js","assets/FenetreDeLAgent-CQeqvo05.js","assets/FenetreDesCivilites-C1r4K3zG.js","assets/FenetreDesCivilites-zfNk1aak.css","assets/FenetreDuPoint-CfMUboP_.js","assets/Fil-BTtuTTC4.js","assets/finances-C8x7Mn4-.css","assets/fon-CClCJdjn.js","assets/Fournisseurs-C69aY1VF.js","assets/fournisseurs-C6Lo9H-4.js","assets/foyer-tETXV-mz.js","assets/Gerard-DNxabQR6.css","assets/gerard-donnees-C078G2dD.js","assets/Gerard-N9remZUU.js","assets/gestes-conversation-Dh111fQD.js","assets/heures-des-rappels-pur-BWJPB8OP.js","assets/HomeRituals-BAm6AybB.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-ChU50JEN.js","assets/ia-centre-BOCWZC8D.js","assets/ia-diagnostic-pur-qGnFEvys.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-tableau-pur-p6UvREJe.js","assets/identite-Ch6XHL7B.js","assets/index.es-D4oJTjMl.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-BJLv-yer.js","assets/jspdf.es.min-DFm0y7nG.js","assets/JustePrix-Bh_0s3su.js","assets/kkiapay-D3pSadmg.js","assets/kkiapay-widget-CVmsl9OE.js","assets/Laboratoire-DI-1kH88.js","assets/LaJournee-65goxU49.js","assets/LaJournee-Bn_G0HCt.css","assets/le-caissier-pur-xsRlSE02.js","assets/LesPaiements-C9cEZlne.css","assets/LesPaiements-Cd8BOvJo.js","assets/LettresAuDossier-BsX15jB7.js","assets/LienMndPay-DBSUx7HG.js","assets/Marketing-DYjkTCop.js","assets/MarketingBranche-BHaf9zb9.js","assets/Marque-BImAYBP7.js","assets/MesPourboires-CENjelyb.css","assets/MesPourboires-Cj3z_oOu.js","assets/MesTaches-Cc4XUDf6.css","assets/MesTaches-nstZwsJF.js","assets/momo-C2ZVfV9J.js","assets/MonMois-B2Ms2u0J.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/MtnMoMo-dfJWFu3B.js","assets/objectifs-Cvjaj6WX.js","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/opale-8AU28RTD.js","assets/oreille-B1AMUmZh.js","assets/paie-du-5-D3ErrjAE.js","assets/paie-du-5-DeJq-K_U.css","assets/paie-du-5-pur-CPiCK8fv.js","assets/paie-par-mtn-Bl97s7Tk.js","assets/PaieParMtn-CUyban-P.js","assets/paliers-DdvaOMMK.js","assets/Parametres-BH2YLiIU.js","assets/parcours-DfsszPQz.js","assets/Parrainages-elvs2lhs.js","assets/Parrainages-gAHAPB_6.css","assets/PassageAvantLeFauteuil-BfbGgc8e.js","assets/pdf-CZILeRYO.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/periode-des-pourboires-pur-BUWqfwov.js","assets/Personas-BJx4pWUD.js","assets/Personnel--xov7thS.js","assets/photo-k-x0md21.js","assets/pilotage-D8kf1Co8.css","assets/porte-de-l-equipe-xeRO3Wnk.js","assets/Pourboires-BY80kWV1.js","assets/Predictions-DaVGhfT3.js","assets/preload-helper-BRe_O-Rg.js","assets/Prestataires-CfQUB0-B.js","assets/Prets-EYRB4TWb.js","assets/PrevisionDuMois-DlFTw3OX.css","assets/PrevisionDuMois-DwEEJXOW.js","assets/Previsions-9BU2Vg1T.css","assets/Previsions-BgpodQ22.js","assets/previsions-pur-Nbj1JooG.js","assets/processus-pur-R6U5QcCi.js","assets/Projets-COO7WDEE.css","assets/projets-pur-2ZEMRNDU.js","assets/Projets-qXNP26v_.js","assets/projets-Y5NSBGGo.js","assets/protocoles-CZBtorls.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-Clm__gGe.js","assets/quiz-5qMPWZVi.js","assets/Rapport-DBBBS8oK.js","assets/Recommandations-CUIzpqLe.js","assets/regler-D-Tznvy5.js","assets/regler-DHR_B1Dm.css","assets/regler-par-fedapay-pur-DYTDdXhs.js","assets/relances-pur-BacTXlI2.js","assets/releve-des-avis-Da9dRG0F.js","assets/SalonFoyer-DKw9_E8X.js","assets/secretariat-admin-DqZgXTr0.js","assets/Secretariat-Cy79Zw30.css","assets/Secretariat-D0xzKes4.js","assets/Signatures-CpuukUGf.js","assets/SignerUnPdf-CA0Dntsu.js","assets/Synthese-BTizVPcL.js","assets/SyntheseGraphes-CvCfVjqs.js","assets/systeme-TPy-pF7j.css","assets/Tableau-CgCAqV6c.js","assets/temps-BxBBisZL.js","assets/Textes-BUWd151g.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-BKnRJP1R.js","assets/tiroirs-CkDzpGy0.css","assets/trone-B-r6lpi2.css","assets/trone-BTc8rsTp.js","assets/useAudiences-BS6ip_YY.js","assets/useClotureDuJour-cONwWBKp.js","assets/visios-CpFrd6hF.js","assets/Vitrine-BWilTqQJ.css","assets/Vitrine-D38U73vx.js","assets/_admin-sk0ElKB4.js","assets/_contrat-BeibT8KG.js","assets/_reuni-BjkLP_MN.js","assets/_shared-BkmrYwuY.js","assets/_signature-CWYd88wt.js","assets/_ui-BrUDlmuM.css","assets/_ui-CQ9OIRU1.js"];
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

  /* LE PLAN POUR VENIR, LE RÉSEAU D'ABORD (20 novembre 2026). Il part chez les
     clientes : gardé comme les autres images, le plan d'avant une correction
     (l'adresse du 20 novembre) repartait une fois de plus de chaque appareil.
     En ligne, toujours le dernier, sans le cache du navigateur ; sans réseau,
     celui qu'on a. */
  if (url.pathname.includes('/assets/itineraire/')) {
    event.respondWith((async () => {
      const c = await caches.open(CACHE_IMAGES);
      try {
        const r = await avecDelai(fetch(req, { cache: 'no-cache' }), DELAI_PAGE_MS);
        if (r.ok) { void c.put(req, r.clone()); return r; }
        return (await c.match(req)) || r;
      } catch (_e) {
        return (await c.match(req)) || Response.error();
      }
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
