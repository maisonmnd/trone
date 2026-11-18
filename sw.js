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
const BUILD = "20261118000042";
const A_GARDER = ["./","assets/Abonnements-CplJ1nmv.js","assets/abonnements-DrPpDWns.js","assets/Abonnements-DTY7p2DH.css","assets/Academie-BH4b9HZy.js","assets/Acces-Dl-TQlns.js","assets/afaire-1EExteBb.js","assets/AFaire-Ch7PNG9-.js","assets/agents-donnees-D1IiqTlz.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Agents-NDL5VItr.js","assets/Analytics-DbOXCSTn.js","assets/Appels-CepQij8S.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/Assistants-CPbzXoQu.js","assets/Assistants-D9i2Xwmg.css","assets/AtelierDesContenus-CfZEiJRc.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/Audience-B7gPyJNo.js","assets/Aujourdhui-CAeZ1liL.js","assets/avant-le-fauteuil-lecture-BUNDw_mw.js","assets/AvantLeFauteuil-Bf4g2LsK.js","assets/avis-fiches-DrWuSKFT.js","assets/AvisGoogle-DaPXfwX9.css","assets/AvisGoogle-DiM4uyZI.js","assets/BadgeEssai-B7nGg-23.js","assets/BadgeSuggere-CYKVn-Dp.js","assets/besoins-z-Ki8ykM.js","assets/BesoinsEtRegles-b-iU3lfn.js","assets/BesoinsEtRegles-CzntMbJE.css","assets/bilan-B-bfPYR0.css","assets/bilan-FbhTGh89.js","assets/BilanMensuel-BsCJWYT3.js","assets/Branches-7zKdPgQr.js","assets/bridges-nA4maJHl.js","assets/Caisse-BeVYagLZ.js","assets/caisse-du-soir-BArKr3Zb.js","assets/caisse-du-soir-C6vPx-E_.css","assets/Caisses-BhnTH-Xv.js","assets/Calendrier-CPPhb6MB.js","assets/campagnes-pur-yAkL5Z9Q.js","assets/Carnet-CUqaOY6u.js","assets/carte-DmM16yPp.js","assets/carte-_W_-xBPj.css","assets/CarteModal-DoQcC8qQ.js","assets/CartesCadeaux-B_776-RZ.js","assets/Catalogue-UCTki2cV.js","assets/CentreDeCommande-DnWYTI-u.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-3bnA1I6e.js","assets/certificat-B87kEFGL.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-oS0iy84g.js","assets/chiffre-du-jour-pur-D1MVP3G4.js","assets/ChiffreDesPrestations-DgGfB-8b.js","assets/client-_FIp7Fai.js","assets/cloture-du-jour-g6QfZBTV.js","assets/ClotureDuTiroir-yjZ3-uzg.js","assets/Coffre-BV16m-B6.js","assets/collecte-mtn-pur-D9rF7FS0.js","assets/components-CmWGa_ie.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-CzZlZ7Rj.js","assets/Comptes-D5-J_oAc.js","assets/consultation-CRW6QcWf.css","assets/consultation-kmIaLKPw.js","assets/Consultations-B7ODHbB_.js","assets/Consultations-DiE-2_mG.css","assets/consultNotes-D7Ji8DMm.js","assets/Conversations-D4WwB5Zo.css","assets/Conversations-Dk6Hy5H9.js","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-C7OdLNIf.js","assets/currency-Cd0clE4P.js","assets/Customers-0DmQYeE_.js","assets/Dashboard-B2x7VsE_.css","assets/Dashboard-BLRervm4.js","assets/dates-4c0GKdlN.js","assets/Demandes-Dc8vk8hc.js","assets/DepenseEnUnePhrase-BIGRlGqP.css","assets/DepenseEnUnePhrase-CD0h7BRp.js","assets/Depenses-D0zmz5ts.js","assets/depenses-saisie-Cvtlt_Dn.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-09IZY8Y0.js","assets/diagnostics-au-trone-DyTQvzdx.js","assets/Dictee-8TCfD6VZ.js","assets/Dictee-C-pUYYFA.css","assets/dictee-pur-CMABod--.js","assets/Discussions-Cl4hSoC3.js","assets/EditeurDesOffres-DyeFy-JM.js","assets/Encaissements-CAayBc9K.js","assets/enfants-Cag5vFI4.js","assets/Engagements-Cj5S9MhG.css","assets/engagements-coffre-C7fnJsZ1.js","assets/Engagements-D33jHNgv.js","assets/EntreDeuxSeances-BfMDbm7w.js","assets/es-CHlxtlQG.js","assets/Evaluation-DawIJ314.js","assets/facture-CuEVNhQG.js","assets/Factures-D6wpx6OO.js","assets/FenetreDesCivilites-DCyqdlTW.js","assets/FenetreDesCivilites-zfNk1aak.css","assets/FenetreDuPoint-DTHy6o-G.js","assets/Fil-C1hh9RJP.js","assets/finances-C8x7Mn4-.css","assets/fon-DUAGLGro.js","assets/fournisseurs-CoRR9BDX.js","assets/Fournisseurs-D10mUTCi.js","assets/foyer-B5ufPex5.js","assets/Gerard-Cgj-zsJh.css","assets/gerard-donnees-BueKdc8X.js","assets/Gerard-yGn30N7A.js","assets/gestes-conversation-Cals8U8f.js","assets/heures-des-rappels-pur-BWJPB8OP.js","assets/HomeRituals-CyyWU7Jm.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-HI_5NTaK.js","assets/ia-centre-D9_1BNoo.js","assets/ia-diagnostic-pur-BNtkwfR3.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-tableau-pur-p6UvREJe.js","assets/identite-Aeel-jsP.js","assets/index.es-B7JdXYdw.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-BnEX39wN.js","assets/jspdf.es.min-DRbEL_I6.js","assets/JustePrix-CnLYMoH8.js","assets/kkiapay-CYd56MOT.js","assets/kkiapay-widget-CVmsl9OE.js","assets/Laboratoire-Fy20d3NX.js","assets/LaJournee-Bn_G0HCt.css","assets/LaJournee-DQzUggLo.js","assets/le-caissier-pur-DyVtCein.js","assets/LesPaiements-Bx_l14qu.js","assets/LesPaiements-C9cEZlne.css","assets/LettresAuDossier-DBE1ZTAn.js","assets/LienMndPay-vTm8Sv6B.js","assets/Marketing-CdRoHCSi.js","assets/MarketingBranche-Be-2XkVJ.js","assets/Marque-BF_9hVDO.js","assets/MesPourboires-BGxRI1fr.js","assets/MesPourboires-CENjelyb.css","assets/MesTaches-B7kQQEVS.js","assets/MesTaches-Cc4XUDf6.css","assets/momo-C2ZVfV9J.js","assets/MonMois-B4233aR0.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/MtnMoMo-CRADzS1j.js","assets/objectifs-C_4Yw7-x.js","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/opale-Uj_XOTcL.js","assets/oreille-B1AMUmZh.js","assets/paie-du-5-BKx3vv09.js","assets/paie-du-5-DeJq-K_U.css","assets/paie-du-5-pur-CPiCK8fv.js","assets/paie-par-mtn-AVhiwekf.js","assets/PaieParMtn-LyTzROTX.js","assets/paliers-4DiuNsPp.js","assets/Parametres-_FdTZ4Q3.js","assets/parcours-D8Mu0p7W.js","assets/Parrainages-CQtOtvtR.js","assets/Parrainages-gAHAPB_6.css","assets/PassageAvantLeFauteuil-faHzDdDC.js","assets/pdf-La-bA7TT.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/periode-des-pourboires-pur-BUWqfwov.js","assets/Personas-CHzl1N2K.js","assets/Personnel-Cg8Nkm9j.js","assets/photo-Bp7TRlAK.js","assets/pilotage-D8kf1Co8.css","assets/Pourboires-B3O2Jg9b.js","assets/Predictions-aDkfzXtF.js","assets/Prestataires-iMM3qxsO.js","assets/Prets-Bnk5wQQ5.js","assets/PrevisionDuMois-B-wpzOcW.js","assets/PrevisionDuMois-DlFTw3OX.css","assets/Previsions-9BU2Vg1T.css","assets/Previsions-D5ReYRKE.js","assets/previsions-pur-BKxEMff8.js","assets/processus-pur-R6U5QcCi.js","assets/projets-B4rQmWD-.js","assets/Projets-COO7WDEE.css","assets/Projets-krG17K-j.js","assets/projets-pur-2ZEMRNDU.js","assets/protocoles-CaCHJiEW.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-B7tXBZg7.js","assets/qualification-BvUOmUll.js","assets/quiz-5qMPWZVi.js","assets/Rapport-igV30fCx.js","assets/Recommandations-BH7Y7X44.js","assets/regler-BUW6lOg2.js","assets/regler-DHR_B1Dm.css","assets/regler-par-fedapay-pur-CFL4EbBx.js","assets/relances-pur-BacTXlI2.js","assets/releve-des-avis-C1SyIrrM.js","assets/SalonFoyer-BjBKDbzm.js","assets/secretariat-admin-CvMR1H85.js","assets/Secretariat-BJeMXOax.js","assets/Secretariat-Cy79Zw30.css","assets/Signatures-D8ZKeKfd.js","assets/SignerUnPdf-BSMNJRN8.js","assets/Synthese-DxrHipVH.js","assets/SyntheseGraphes-XJ0BI9lQ.js","assets/systeme-TPy-pF7j.css","assets/Tableau-CmmYcImw.js","assets/temps-DhxgC96-.js","assets/Textes-DLpOzRbT.css","assets/Textes-Dv-xi8yX.js","assets/tiroirs-CkDzpGy0.css","assets/tiroirs-DFqw94Ve.js","assets/trone-DO3Nd0lt.js","assets/trone-JHWNAy0h.css","assets/useAudiences-CBhYLOsg.js","assets/useClotureDuJour-BwApizUt.js","assets/visios-CU6GEnl8.js","assets/Vitrine-a_MHzBjp.js","assets/Vitrine-BWilTqQJ.css","assets/_admin-BGoUtF95.js","assets/_contrat-DJNoDKx1.js","assets/_reuni-BvrGVkdG.js","assets/_shared-BxsAd-xJ.js","assets/_signature-DFXd4SUx.js","assets/_ui-4LcYV4Df.js","assets/_ui-BrUDlmuM.css"];
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
