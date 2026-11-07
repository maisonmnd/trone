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
const BUILD = "20261107132900";
const A_GARDER = ["./","assets/abonnements-BRiIAWDh.js","assets/Abonnements-C5CS3Dxg.js","assets/Abonnements-DTY7p2DH.css","assets/Academie-BK097Q-L.js","assets/Acces-Ch7Y0630.js","assets/AFaire-99BG172t.js","assets/afaire-yc7XdXKk.js","assets/Agents-DA-7DLpn.js","assets/agents-donnees-DewD9Y7r.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-2qB4v3Fr.js","assets/Appels-DxE-vwl2.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/Assistants-CN681inf.js","assets/Assistants-D9i2Xwmg.css","assets/AtelierDesContenus-D3-p6F2A.css","assets/AtelierDesContenus-zT1Fy793.js","assets/Audience-CyR4yLsP.js","assets/Aujourdhui-2YPcEcqS.js","assets/avant-le-fauteuil-lecture-Bs4y2w3Z.js","assets/AvantLeFauteuil-CMvgNWZE.js","assets/avis-fiches-CRsLLQka.js","assets/AvisGoogle-cHYYeavp.js","assets/AvisGoogle-DaPXfwX9.css","assets/BadgeEssai-DkqlQD4D.js","assets/bilan-B-bfPYR0.css","assets/bilan-DxTetz6s.js","assets/BilanMensuel-Dhp7w0rb.js","assets/Branches-DzJZSk5Q.js","assets/bridges-DA_KpCJT.js","assets/Caisse-BaOdEyPH.js","assets/caisse-du-soir-C6vPx-E_.css","assets/caisse-du-soir-MDuM82Km.js","assets/Caisses-CPA_bhI-.js","assets/Calendrier-Dgj-FMBJ.js","assets/campagnes-pur-DLujR19g.js","assets/Carnet-mhO5gGK6.js","assets/carte-DaePSHdG.js","assets/carte-_W_-xBPj.css","assets/CarteModal-CrBVM3-p.js","assets/CartesCadeaux-Cx7NNXqW.js","assets/Catalogue-DvYR-XPr.js","assets/CentreDeCommande-Du8kyJhp.css","assets/CentreDeCommande-IAUhwtWY.js","assets/Cercle-c9a6jC1H.js","assets/certificat-BAmlEevL.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-BdeK48jP.js","assets/chiffre-du-jour-pur-GuOS0mIh.js","assets/ChiffreDesPrestations-C4HYw6Do.js","assets/client-cMie_kgH.js","assets/cloture-du-jour-De_udT1j.js","assets/ClotureDuTiroir-wLjQ1OlI.js","assets/Coffre-D5NJZm42.js","assets/components-lYwHoEpr.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-Dh3SlPs7.js","assets/Comptes-DpMdwKHk.js","assets/consultation-Bihzws1I.js","assets/consultation-CRW6QcWf.css","assets/Consultations-B6HH7_Km.js","assets/consultNotes-ByPIpLHD.js","assets/Conversations-B_hz7AuK.js","assets/Conversations-D4WwB5Zo.css","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-zyNFd98k.js","assets/currency-qfIhGmrs.js","assets/Customers-DYhC7pQJ.js","assets/Dashboard-B2x7VsE_.css","assets/Dashboard-BWw2sXIt.js","assets/dates-CJ4QQxZc.js","assets/Demandes-BWeie9f6.js","assets/DepenseEnUnePhrase-BIGRlGqP.css","assets/DepenseEnUnePhrase-uSqqFa7I.js","assets/Depenses-CwG7qTSE.js","assets/depenses-saisie-B42TZyNQ.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-DAKntyCC.js","assets/diagnostics-au-trone-Dw4K5d5y.js","assets/Dictee-CVCe1zEg.js","assets/Dictee-D2P9yM7v.css","assets/dictee-pur-CWzLUdI9.js","assets/Discussions-BZhwZsuM.js","assets/EditeurDesOffres-CXt9avx1.js","assets/Encaissements-ClHECoMz.js","assets/enfants-BQFvp0Z1.js","assets/Engagements-602GU7EP.js","assets/Engagements-Cj5S9MhG.css","assets/engagements-coffre-B0WAqgyI.js","assets/EntreDeuxSeances-BaKwRm_X.js","assets/Evaluation-QZU1A0Ac.js","assets/Factures-BrDvFLsH.js","assets/FenetreDesCivilites-BKtSW6iB.js","assets/FenetreDesCivilites-zfNk1aak.css","assets/FenetreDuPoint-DWgVR-Mb.js","assets/Fil-DQ0P5g7K.js","assets/finances-BMFnlkRx.css","assets/fon-CZfEkLaa.js","assets/Fournisseurs-BEFurtVB.js","assets/fournisseurs-DnW5XX0Y.js","assets/foyer-Cjzzt5pr.js","assets/Gerard-BwVE3ATy.js","assets/Gerard-Cgj-zsJh.css","assets/gerard-donnees-C-DSn49s.js","assets/gestes-conversation-Di34BQjk.js","assets/HomeRituals-DkOA0P5r.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-CmkVYYmg.js","assets/ia-centre-DA2Zvuue.js","assets/ia-diagnostic-pur-BBLrGY5l.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-tableau-pur-CSRjGtTf.js","assets/identite-Bi4v0x1x.js","assets/index-dShTUUEO.js","assets/index.es-ByCPEG7v.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-cQR5zA2S.js","assets/jspdf.es.min-Cj67Rm9D.js","assets/JustePrix-Xj9jkwUK.js","assets/kkiapay-nfjZ6g2D.js","assets/kkiapay-widget-DnUhUNd4.js","assets/Laboratoire-DvlgQZnB.js","assets/LaJournee-Bn_G0HCt.css","assets/LaJournee-DJumuwef.js","assets/LesPaiements-BvdfOCbQ.css","assets/LesPaiements-yq1oUyFI.js","assets/LettresAuDossier-DN43BIR4.js","assets/LienMndPay-C88uMqDQ.js","assets/Marketing-DHqwRNHK.js","assets/MarketingBranche-KiwjTt2V.js","assets/Marque-wfQDV15T.js","assets/MesPourboires-CdMTFzsf.js","assets/MesPourboires-D9I_9rZf.css","assets/MesTaches-BmLpMqIs.js","assets/MesTaches-Cc4XUDf6.css","assets/momo-C2ZVfV9J.js","assets/MonMois-DzNwyeHt.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-D0qS_fZP.js","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/opale-lKXYlNOo.js","assets/oreille-B1AMUmZh.js","assets/paie-du-5-CGV6EcGR.js","assets/paie-du-5-DeJq-K_U.css","assets/paie-du-5-pur-B9CwC0zy.js","assets/PaieParMtn-EKUkyI6v.js","assets/paliers-iBhCeXti.js","assets/Parametres-CVif_mdD.js","assets/parcours-CeIYudCN.js","assets/Parrainages-C_hP8j5t.js","assets/Parrainages-gAHAPB_6.css","assets/PassageAvantLeFauteuil-BSoqx8tC.js","assets/pdf-FH4SKiqi.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/Personas-CYdc3jJZ.js","assets/Personnel-8QzT72q3.js","assets/photo-BngpYZoM.js","assets/pilotage-D8kf1Co8.css","assets/Pourboires-XYbkI9RH.js","assets/Predictions-DBX89HX9.js","assets/Prestataires-DA7oPH0F.js","assets/Prets-vGmGAW7Z.js","assets/PrevisionDuMois-B-mInQIT.js","assets/PrevisionDuMois-DlFTw3OX.css","assets/Previsions-BexqhwhV.js","assets/previsions-pur-BllcEPW7.js","assets/Previsions-r4v19Anp.css","assets/processus-pur-R6U5QcCi.js","assets/Projets-COO7WDEE.css","assets/projets-DdH2HSzJ.js","assets/Projets-Dho98Ren.js","assets/projets-pur-2ZEMRNDU.js","assets/protocoles-WcRQ_E6b.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-YGRToYmk.js","assets/qualification-mBrSTNaU.js","assets/quiz-5qMPWZVi.js","assets/Rapport-Cgr5qjBT.js","assets/Recommandations-DLODMFRf.js","assets/regler-C5hcM02_.css","assets/regler-la-seance-serveur-Bs6rzqZX.js","assets/regler-yHelm18y.js","assets/relances-pur-lwRTXc5E.js","assets/releve-des-avis-BP7hxWXH.js","assets/SalonFoyer-HGU7B-9D.js","assets/secretariat-admin-DWFR1AI6.js","assets/Secretariat-CaX1JeiJ.js","assets/Secretariat-Cy79Zw30.css","assets/Signatures-BETNPJ70.js","assets/SignerUnPdf-B-roUmF-.js","assets/Synthese-DYnTrI36.js","assets/SyntheseGraphes-D_-aXFjZ.js","assets/systeme-TPy-pF7j.css","assets/Tableau-eJtUAciR.js","assets/temps-_BfPuU-E.js","assets/Textes-B3tdEb-_.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-CkDzpGy0.css","assets/tiroirs-DQLyQpNP.js","assets/trone-Bu_-j2Li.js","assets/trone-CQ2DUl_d.css","assets/useAudiences-CutSS4rI.js","assets/useClotureDuJour-DLyXCN-g.js","assets/Vitrine-BWilTqQJ.css","assets/Vitrine-yobW3I0m.js","assets/_admin-D4yBd4os.js","assets/_contrat-B4kaLvV-.js","assets/_heures-B7oLHUbK.js","assets/_reuni-wut8t7_r.js","assets/_shared-DWLDBPxO.js","assets/_signature-Dgj0yCF6.js","assets/_ui-BrUDlmuM.css","assets/_ui-Ijb3Zqnd.js"];
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
