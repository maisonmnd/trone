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
const BUILD = "20261111135519";
const A_GARDER = ["./","assets/Abonnements-7sNmIa2X.js","assets/abonnements-CvAvGD4y.js","assets/Abonnements-DTY7p2DH.css","assets/Academie-Bb2Xnp2z.js","assets/Acces-pw1Qqa1M.js","assets/AFaire-BLq1Cc8q.js","assets/afaire-D760Xj2K.js","assets/agents-donnees-BvhIv44v.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Agents-ZpP0aSDP.js","assets/Analytics-DzdAqPdE.js","assets/Appels-BM0-txyY.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/Assistants-CQFULNEa.js","assets/Assistants-D9i2Xwmg.css","assets/AtelierDesContenus-C7QLMpu7.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/Audience-DthOWzzd.js","assets/Aujourdhui-V-MCVtb6.js","assets/avant-le-fauteuil-lecture-DIQiT7tK.js","assets/AvantLeFauteuil-BR10t-6D.js","assets/avis-fiches-DWpFqvYT.js","assets/AvisGoogle-DaPXfwX9.css","assets/AvisGoogle-yjitV_g3.js","assets/BadgeEssai-BHELnMWP.js","assets/bilan-B-bfPYR0.css","assets/bilan-DRrWklwO.js","assets/BilanMensuel-bpxLTXpK.js","assets/Branches-BRf-7tC-.js","assets/bridges-Cvad2E75.js","assets/Caisse-8DavD9gS.js","assets/caisse-du-soir-C6vPx-E_.css","assets/caisse-du-soir-DleKqu-6.js","assets/Caisses-C9NtoJON.js","assets/Calendrier-BXBmzDSe.js","assets/campagnes-pur-BRv2j4H2.js","assets/Carnet-BjszMbzm.js","assets/carte-BukfsASW.js","assets/carte-_W_-xBPj.css","assets/CarteModal-BkML3FJq.js","assets/CartesCadeaux-BiN5yYBM.js","assets/Catalogue-DvomwhlT.js","assets/CentreDeCommande-Du8kyJhp.css","assets/CentreDeCommande-p4_Odnv8.js","assets/Cercle-CqnEIsR8.js","assets/certificat-BR7GBxKU.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-CNw6WfeY.js","assets/chiffre-du-jour-pur-Bac-M958.js","assets/ChiffreDesPrestations-V_tzDd39.js","assets/client-BVno5li8.js","assets/cloture-du-jour-DmtgI6w1.js","assets/ClotureDuTiroir-B1Pa2CVS.js","assets/Coffre-D4nfNzhQ.js","assets/components-CdbbFQNS.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-BgODx2nR.js","assets/Comptes-CH9pafOV.js","assets/consultation-B1J-zree.js","assets/consultation-CRW6QcWf.css","assets/Consultations-PN8hymGq.js","assets/consultNotes-CwdgHHgf.js","assets/Conversations-D4WwB5Zo.css","assets/Conversations-DRk4NSWN.js","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-BNXvxKSx.js","assets/currency-qfIhGmrs.js","assets/Customers-Dupn13e3.js","assets/Dashboard-B2x7VsE_.css","assets/Dashboard-CkTvEjH-.js","assets/dates-qzjOktww.js","assets/Demandes-BrrcHy5Y.js","assets/DepenseEnUnePhrase-BIGRlGqP.css","assets/DepenseEnUnePhrase-CVVCowe5.js","assets/Depenses-C8vkqwIA.js","assets/depenses-saisie-2KqeQjBL.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-CYsBIK-p.js","assets/diagnostics-au-trone-DAqywdlp.js","assets/Dictee-CJc716EZ.js","assets/Dictee-D2P9yM7v.css","assets/dictee-pur-CxLkkxia.js","assets/Discussions-BZwXFg7P.js","assets/EditeurDesOffres-Cl8PBfO_.js","assets/Encaissements-78sgGn7F.js","assets/enfants-C0SJTLet.js","assets/Engagements-BwYk7SEM.js","assets/Engagements-Cj5S9MhG.css","assets/engagements-coffre-GwmW-j1K.js","assets/EntreDeuxSeances-Dajo_zBA.js","assets/Evaluation-CtnZWnbE.js","assets/Factures-DFf8RsEG.js","assets/FenetreDesCivilites-nhrl9b0O.js","assets/FenetreDesCivilites-zfNk1aak.css","assets/FenetreDuPoint-JJOXeMzJ.js","assets/Fil-DMkmxtG8.js","assets/finances-BMFnlkRx.css","assets/fon-CUzhlVkU.js","assets/fournisseurs-CxawoyKP.js","assets/Fournisseurs-Dxb8BQmq.js","assets/foyer-CJnihfqU.js","assets/Gerard-Cgj-zsJh.css","assets/Gerard-CKRzfgk2.js","assets/gerard-donnees-Dfdqvfk3.js","assets/gestes-conversation-n-5DceJ9.js","assets/HomeRituals-DnpIp8vm.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-CqIpOam9.js","assets/ia-centre-IQz12OyA.js","assets/ia-diagnostic-pur-BBLrGY5l.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-tableau-pur-CSRjGtTf.js","assets/identite-CLd7o2xl.js","assets/index-v2dTXPsY.js","assets/index.es-DhnhNZVw.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-CpJq-8EO.js","assets/jspdf.es.min-BcFW_TBe.js","assets/JustePrix-DxWbMERa.js","assets/kkiapay-Cq-iKPCy.js","assets/kkiapay-widget-DnUhUNd4.js","assets/Laboratoire-C31wLpH0.js","assets/LaJournee-Bn_G0HCt.css","assets/LaJournee-DO0F5N6y.js","assets/LesPaiements-BvdfOCbQ.css","assets/LesPaiements-Ei_DtazV.js","assets/LettresAuDossier-CzYPoSTQ.js","assets/LienMndPay-B7EWab1r.js","assets/Marketing-5U7mD4O2.js","assets/MarketingBranche-BGOqEznn.js","assets/Marque-CS2fdyGr.js","assets/MesPourboires-CENjelyb.css","assets/MesPourboires-CMJYq1Rv.js","assets/MesTaches-Cc4XUDf6.css","assets/MesTaches-DPCQ3sWZ.js","assets/momo-C2ZVfV9J.js","assets/MonMois-EriDdyhi.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/objectifs-Tkn9RHGt.js","assets/opale-e0aRP-pC.js","assets/oreille-B1AMUmZh.js","assets/paie-du-5-BZu07KIu.js","assets/paie-du-5-DeJq-K_U.css","assets/paie-du-5-pur-DiPAxu_B.js","assets/PaieParMtn-Dmo9zNjQ.js","assets/paliers-DTIOwS-c.js","assets/Parametres-BvelEhB9.js","assets/parcours-D0Po2aV1.js","assets/Parrainages-gAHAPB_6.css","assets/Parrainages-LSsLeDmd.js","assets/PassageAvantLeFauteuil-J73O0U8_.js","assets/pdf-BgwAtxEP.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/periode-des-pourboires-pur-BUWqfwov.js","assets/Personas-pqxBl7ir.js","assets/Personnel-BcEORoir.js","assets/photo-BjG91mTD.js","assets/pilotage-D8kf1Co8.css","assets/Pourboires-D3SBPwy_.js","assets/Predictions-CNdtr_Zr.js","assets/Prestataires-D4qpbMPA.js","assets/Prets-MVaQKqjR.js","assets/PrevisionDuMois-DGUKXSqz.js","assets/PrevisionDuMois-DlFTw3OX.css","assets/Previsions-KtYDf0oC.js","assets/previsions-pur-CHEYUtfE.js","assets/Previsions-r4v19Anp.css","assets/processus-pur-R6U5QcCi.js","assets/projets-BWVpGNAH.js","assets/Projets-C-jnN5Bc.js","assets/Projets-COO7WDEE.css","assets/projets-pur-2ZEMRNDU.js","assets/protocoles-DUscIqsv.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-CV5CjjGQ.js","assets/qualification-DXl5yDGD.js","assets/quiz-5qMPWZVi.js","assets/Rapport-C8lCbKO1.js","assets/Recommandations-BObYPEcr.js","assets/regler-BNVIJzD3.js","assets/regler-C5hcM02_.css","assets/regler-la-seance-serveur-Bs6rzqZX.js","assets/relances-pur-lwRTXc5E.js","assets/releve-des-avis-CREyCF8a.js","assets/SalonFoyer-B3FxtpMT.js","assets/secretariat-admin-BxmTlI67.js","assets/Secretariat-Cy79Zw30.css","assets/Secretariat-E8GoJZ1-.js","assets/Signatures-BNyJhL4h.js","assets/SignerUnPdf-CsL8vt1W.js","assets/Synthese-DNUjcKNe.js","assets/SyntheseGraphes-BHh4Q6Qy.js","assets/systeme-TPy-pF7j.css","assets/Tableau-CZbquMUA.js","assets/temps-Dcu1Xrcl.js","assets/Textes-Cvl9J5V8.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-CkDzpGy0.css","assets/tiroirs-LY_RgF9k.js","assets/trone-Bqh2b34U.js","assets/trone-DbcEcV_c.css","assets/useAudiences-Cehzu4EI.js","assets/useClotureDuJour-DxHWPaI0.js","assets/Vitrine-BWilTqQJ.css","assets/Vitrine-VzxARn6D.js","assets/_admin-BXPMa5lP.js","assets/_contrat-C4ADHaA8.js","assets/_heures-D-qZjCzo.js","assets/_reuni-Cx5UvtYN.js","assets/_shared-BnN5u_BH.js","assets/_signature-DUfK_n2c.js","assets/_ui-BrUDlmuM.css","assets/_ui-BUo9SYIq.js"];
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
