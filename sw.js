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
const BUILD = "20261121095151";
const A_GARDER = ["./","assets/Abonnements-DTY7p2DH.css","assets/abonnements-DZ5AxyrQ.js","assets/Abonnements-hCjMRTvJ.js","assets/Academie-BVJ9ouWM.js","assets/Acces-DvwAJuWE.js","assets/AFaire-BNQQAahU.js","assets/afaire-CFDFD4ym.js","assets/agents-donnees-CKBEdWdA.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Agents-pmOcB20T.js","assets/Analytics-DdX2SLDa.js","assets/App-BgTTh8wA.js","assets/Appels-DqPaNbJi.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/Assistants-C1Lh1Lhg.js","assets/Assistants-D9i2Xwmg.css","assets/AtelierDesContenus-CJ2WkTq1.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/Audience-DDZCw7SO.js","assets/Aujourdhui-BtxT5On7.js","assets/auth-Ci90Jgla.js","assets/avant-le-fauteuil-lecture-D9IDAEJ3.js","assets/AvantLeFauteuil-CQLPueEs.js","assets/avis-fiches-CeIMQLPN.js","assets/avis-google-pont-CApxCnpg.js","assets/AvisGoogle-DaPXfwX9.css","assets/AvisGoogle-LIv_leRQ.js","assets/BadgeEssai-C9kFIelC.js","assets/BadgeSuggere-BDGm7Nmt.js","assets/besoins-EGsCXmWM.js","assets/BesoinsEtRegles-BLwxGVV5.css","assets/BesoinsEtRegles-gdlirpzE.js","assets/bilan-B-bfPYR0.css","assets/bilan-BnCNfZXr.js","assets/BilanMensuel-Cgi2mlpd.js","assets/Branches-CyYG5FMy.js","assets/bridges-DFkDpt3C.js","assets/Caisse-Av8XG8GO.js","assets/caisse-du-soir-BN7a0r5C.js","assets/caisse-du-soir-C6vPx-E_.css","assets/caisse-fluide-pur-D2DfORNF.js","assets/Caisses-C0Sdug5M.js","assets/Calendrier-0zlPjfPo.js","assets/campagnes-pur-BrWsDD65.js","assets/Carnet-GeRxmGXJ.js","assets/carte-PmFhQ4Bf.js","assets/carte-_W_-xBPj.css","assets/CarteModal-7vwA-hJC.js","assets/CartesCadeaux-BFmnq37d.js","assets/Catalogue-CNuA3Z6I.js","assets/CentreDeCommande-Bv06UD39.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-DPbxMZF3.js","assets/certificat-iqZNTCJ2.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-BOINPNRL.js","assets/chiffre-du-jour-pur-C53hxuxA.js","assets/ChiffreDesPrestations-2YXT_1wg.js","assets/classement-Bd0i61Jb.js","assets/Classement-CmpbQZDu.css","assets/Classement-CRZwdYF8.js","assets/classement-pur-CQOYU06l.js","assets/client-Cs3xsgPM.js","assets/cloture-du-jour-CRAGHZo1.js","assets/ClotureDuTiroir-BTO1fik4.js","assets/Coffre-CvVubd38.js","assets/collecte-mtn-pur-BKoFYpbn.js","assets/components-Cv5s82yd.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-B9muhS8K.js","assets/Comptes-BuujHaA9.js","assets/consultation-8sR3TeQ3.js","assets/consultation-CRW6QcWf.css","assets/Consultations-DiE-2_mG.css","assets/Consultations-dugDlULv.js","assets/consultNotes-cbmYWqXH.js","assets/contexte-de-la-reponse-Cvwlj-Kh.js","assets/Conversations-CaBbNX00.js","assets/Conversations-D4WwB5Zo.css","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-BWqcfK4I.js","assets/currency-Cd0clE4P.js","assets/Customers-UHIVB4M4.js","assets/Dashboard-B0tvg7tA.js","assets/Dashboard-B2x7VsE_.css","assets/dates-CirFGqBb.js","assets/DemanderAPerle-BD5NgCRN.css","assets/DemanderAPerle-DsJvPMLe.js","assets/Demandes-BnrUUhCo.js","assets/DepenseEnUnePhrase-BIGRlGqP.css","assets/DepenseEnUnePhrase-w61uYJjB.js","assets/Depenses-DHy-5j5C.js","assets/depenses-saisie-Di1a-iE2.js","assets/devis-remis-CBB0E6CU.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-DdxoPTiS.js","assets/diagnostics-au-trone-DGtpZQHg.js","assets/Dictee-C-pUYYFA.css","assets/Dictee-DqQHQaxK.js","assets/dictee-pur-V0MZAHqD.js","assets/Discussions-ypPU_MKi.js","assets/echappe-html-pur-gEhHOM07.js","assets/EditeurDesOffres-DtzXTIpx.js","assets/Encaissements-CDBAHGNN.js","assets/enfants-P7ATwyq-.js","assets/Engagements-Camrst3C.js","assets/Engagements-Cj5S9MhG.css","assets/engagements-coffre-Deaaeaeg.js","assets/EntreDeuxSeances-DgGMtUKB.js","assets/es-BhQhtshv.js","assets/Evaluation-BdLv3faE.js","assets/facture-CVQYNJsv.js","assets/Factures-D2VthrsY.js","assets/FenetreDeLAgent-CHpupwao.js","assets/FenetreDesCivilites-LDbyXorS.js","assets/FenetreDesCivilites-zfNk1aak.css","assets/FenetreDuPoint-DZiWHvG6.js","assets/Fil-CXsM1L3O.js","assets/finances-C8x7Mn4-.css","assets/fon-C8j2-j_h.js","assets/fournisseurs-jGEg1H9b.js","assets/Fournisseurs-LNp91xdm.js","assets/foyer-Ddz89us4.js","assets/Gerard-BnBxvNtN.js","assets/gerard-donnees-C5XpEexv.js","assets/Gerard-lGKehvgG.css","assets/gestes-conversation-7C5WYepi.js","assets/heures-des-rappels-pur-BWJPB8OP.js","assets/HomeRituals-R44GT1cS.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-50dhVD0U.js","assets/ia-centre-1i8fnCo1.js","assets/ia-diagnostic-pur-qGnFEvys.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-tableau-pur-p6UvREJe.js","assets/identite-C8ggZIrm.js","assets/index.es-Dgjmzyet.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-DeUdISzO.js","assets/jspdf.es.min-C9pmQXOx.js","assets/JustePrix-Cs60GvOW.js","assets/kkiapay-iuR2boD_.js","assets/kkiapay-widget-CVmsl9OE.js","assets/Laboratoire-BXxvhsNk.js","assets/LaJournee-Bn_G0HCt.css","assets/LaJournee-DSXfKXta.js","assets/le-caissier-pur-1JKNFEbR.js","assets/LesPaiements-C9cEZlne.css","assets/LesPaiements-COYeDfLJ.js","assets/LettresAuDossier-CJmi4tRb.js","assets/LienMndPay-ppYNVTB0.js","assets/Marketing-CI7UnKiS.js","assets/MarketingBranche-DKC2q6oN.js","assets/Marque-CTDUCCLy.js","assets/MesPourboires-CENjelyb.css","assets/MesPourboires-PqggHwsO.js","assets/MesTaches-Cc4XUDf6.css","assets/MesTaches-CGEDS_rU.js","assets/momo-C2ZVfV9J.js","assets/MonMois-DTADDVpR.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/MtnMoMo-RcnUF3AY.js","assets/objectifs-B2LiSK0-.js","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/opale-AcjGGnGh.js","assets/oreille-B1AMUmZh.js","assets/paie-du-5-BA1K79wq.js","assets/paie-du-5-DeJq-K_U.css","assets/paie-du-5-pur-CPiCK8fv.js","assets/paie-par-mtn-ZTDqr7BR.js","assets/PaieParMtn-DrEZxdiX.js","assets/paliers-mn8-dNmB.js","assets/Parametres-Chl6iqxF.js","assets/parcours-NLcohaXH.js","assets/Parrainages-D3zyZujh.js","assets/Parrainages-gAHAPB_6.css","assets/PassageAvantLeFauteuil-B7Bf4nnT.js","assets/pdf-BiT8AEXs.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/periode-des-pourboires-pur-BUWqfwov.js","assets/Personas-s9Q1YSAO.js","assets/Personnel-I1_k9lsS.js","assets/photo-BQplplra.js","assets/pilotage-D8kf1Co8.css","assets/porte-de-l-equipe-B73tbCjb.js","assets/Pourboires-9VplbmXB.js","assets/Predictions-CKpuXkZC.js","assets/preload-helper-BRe_O-Rg.js","assets/Prestataires-DlKKlVT8.js","assets/Prets-D3__gbWe.js","assets/PrevisionDuMois-3vofsMoL.js","assets/PrevisionDuMois-DlFTw3OX.css","assets/Previsions-9BU2Vg1T.css","assets/Previsions-B5gYL9Sz.js","assets/previsions-pur-Q_UR1_pa.js","assets/processus-pur-R6U5QcCi.js","assets/projets-BgdLHk6f.js","assets/Projets-C2AAYFFS.js","assets/Projets-COO7WDEE.css","assets/projets-pur-2ZEMRNDU.js","assets/protocoles-CdOhelxZ.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-D5x3gZCB.js","assets/quiz-5qMPWZVi.js","assets/Rapport-_NS5pmw4.js","assets/Recommandations-Ch0n9fkU.js","assets/regler-BJ3XkwSc.js","assets/regler-DHR_B1Dm.css","assets/regler-par-fedapay-pur-DYTDdXhs.js","assets/relances-pur-BacTXlI2.js","assets/releve-des-avis-0Cw3LWnr.js","assets/SalonFoyer-BeN7yGaj.js","assets/secretariat-admin-DwKjPcd8.js","assets/Secretariat-Cy79Zw30.css","assets/Secretariat-DJAQgd4H.js","assets/Signatures-DISOFdmK.js","assets/SignerUnPdf-CugCWIA3.js","assets/Synthese-8NIGv-Hg.js","assets/SyntheseGraphes-Bz9t3Dez.js","assets/systeme-TPy-pF7j.css","assets/Tableau-TOAqNiTk.js","assets/temps-D6_vdGjX.js","assets/Textes-92qE9ieQ.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-CkDzpGy0.css","assets/tiroirs-DTSGdpxA.js","assets/trone-B-r6lpi2.css","assets/trone-DknQ9i6r.js","assets/useAudiences-DbDmozKD.js","assets/useClotureDuJour-B1Joe-vW.js","assets/visios-DmD1c_FA.js","assets/Vitrine-9HS2iwnF.js","assets/Vitrine-BWilTqQJ.css","assets/_admin-BwP0YEBq.js","assets/_contrat-BX68uypn.js","assets/_reuni-d0kPFF3l.js","assets/_shared-BC6w5N07.js","assets/_signature-Df04_0D0.js","assets/_ui-BrUDlmuM.css","assets/_ui-tUa0Ebkk.js"];
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
