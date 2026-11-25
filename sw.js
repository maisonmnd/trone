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
const BUILD = "20261125063511";
const A_GARDER = ["./","assets/Abonnements-BgQK03tz.js","assets/Abonnements-DTY7p2DH.css","assets/abonnements-e9VfK1p4.js","assets/Academie-CTmbsAtl.js","assets/Acces-DqaPnDty.js","assets/afaire-5caf8K9u.js","assets/AFaire-DnJX3Ug0.js","assets/Agents-Ctcpf250.js","assets/agents-donnees-PqmJCU4S.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-B-BS8bDd.js","assets/App-DYDpi2fs.js","assets/Appels-B_WHZAws.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/Assistants-D5lEwK3L.js","assets/Assistants-D9i2Xwmg.css","assets/AtelierDesContenus-D3-p6F2A.css","assets/AtelierDesContenus-DCYntGII.js","assets/Audience-Bmv55x7t.js","assets/Aujourdhui-sS50OLGa.js","assets/auth-BwedKx6A.js","assets/avant-le-fauteuil-lecture-B6Bu2Efa.js","assets/AvantLeFauteuil-B_cw-sha.js","assets/avis-fiches-BcymXudL.js","assets/avis-google-pont-ZspUUYRf.js","assets/AvisGoogle-BKFj7CS-.js","assets/AvisGoogle-DaPXfwX9.css","assets/BadgeEssai-C8vVlx-8.js","assets/BadgeSuggere-Bu1AQoEW.js","assets/besoins-Dys8dHsl.js","assets/BesoinsEtRegles-BLwxGVV5.css","assets/BesoinsEtRegles-CsXxbzaL.js","assets/bilan-B-bfPYR0.css","assets/bilan-CqSPtEa0.js","assets/BilanMensuel-B0PYHsmA.js","assets/Branches-CQ9asMCD.js","assets/bridges-BcTNNBuq.js","assets/Caisse-BRzNAIzj.js","assets/caisse-du-soir-C6vPx-E_.css","assets/caisse-du-soir-FQKqtxth.js","assets/caisse-fluide-pur-B1LszmUS.js","assets/Caisses-CP7myo4W.js","assets/Calendrier-ClHBZk9l.js","assets/campagnes-pur-ktjbQIvY.js","assets/Carnet-B0Mvfy5w.js","assets/carte-CYKY36Rb.js","assets/carte-_W_-xBPj.css","assets/CarteModal-CN0voyGm.js","assets/CartesCadeaux-BqBe81fa.js","assets/Catalogue-K3iMwonc.js","assets/CentreDeCommande-BYOs8liY.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-CfjKo2-r.js","assets/certificat-Bo8IkLRW.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-DT801YA6.js","assets/chiffre-du-jour-pur-BdshPA1g.js","assets/ChiffreDesPrestations-D8Mfslwb.js","assets/Classement-CmpbQZDu.css","assets/Classement-CMy7a715.js","assets/classement-Dq-HwK2w.js","assets/classement-pur-CQOYU06l.js","assets/client-BmPSg3PH.js","assets/cloture-du-jour-Do_61Euz.js","assets/ClotureDuTiroir-DDVoZ2FZ.js","assets/Coffre-DIeiYbhC.js","assets/components-B3xDNCdx.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-Bc5y-7H8.js","assets/Comptes-DsmOIFlx.js","assets/consultation-CRW6QcWf.css","assets/consultation-GNsg2NHR.js","assets/Consultations-DiE-2_mG.css","assets/Consultations-DIv_IVuj.js","assets/consultNotes-DFJy7477.js","assets/contexte-de-la-reponse-QaY3CRwr.js","assets/Conversations-CzaDPg1V.js","assets/Conversations-D4WwB5Zo.css","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-DaqLnkak.js","assets/currency-Cd0clE4P.js","assets/Customers-CA6P0DxC.js","assets/Dashboard-BSOax1Fm.css","assets/Dashboard-Dzd4dsZS.js","assets/dates-j5mnimEs.js","assets/DemanderAPerle-BD5NgCRN.css","assets/DemanderAPerle-C5GNR8jF.js","assets/Demandes-BoLcEFwN.js","assets/DepenseEnUnePhrase-BIGRlGqP.css","assets/DepenseEnUnePhrase-CuTdAh4D.js","assets/depenses-saisie-ClinWi3o.js","assets/Depenses-ylel-LV4.js","assets/devis-CdfrYAAG.js","assets/devis-CdIRAvZk.css","assets/devis-remis-CEKyss7X.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-YLPNZcDk.js","assets/diagnostics-au-trone-ytG324Br.js","assets/Dictee-BzNdDLL9.js","assets/Dictee-C-pUYYFA.css","assets/dictee-pur-Cv7KIM6B.js","assets/Discussions-DwxUfxy7.js","assets/dist-9vv0te18.js","assets/echappe-html-pur-gEhHOM07.js","assets/EditeurDesOffres-DgEP_xHz.js","assets/Encaissements-nURR6cBs.js","assets/enfants-CQsh2_wn.js","assets/Engagements-B185ECVO.js","assets/Engagements-Cj5S9MhG.css","assets/engagements-coffre-Cr4NW-GV.js","assets/EntreDeuxSeances-CJtAM_ln.js","assets/es-C2nE4-pA.js","assets/etoiles-pur-CgRPMSHm.js","assets/Evaluation-Bw0TAheY.js","assets/facture-CPLosxsQ.js","assets/Factures-D0dgqfCt.js","assets/FenetreDeLAgent-CrcnSX2r.js","assets/FenetreDesCivilites-CPjONsT9.js","assets/FenetreDesCivilites-zfNk1aak.css","assets/FenetreDuPoint-wQrHNyBS.js","assets/Fil-Dce5e7jd.js","assets/finances-C8x7Mn4-.css","assets/fon-yW9-QnSg.js","assets/Fournisseurs-BeOt3lrh.js","assets/fournisseurs-CzgqVd5B.js","assets/foyer-DkESiqQ_.js","assets/Gerard-BRQF38cX.js","assets/gerard-donnees-1-Xwslzr.js","assets/Gerard-lGKehvgG.css","assets/gestes-conversation-Bvh6C16o.js","assets/heures-des-rappels-pur-BWJPB8OP.js","assets/HomeRituals-CI-r3fLr.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-B3xjVNX-.js","assets/ia-centre-CEaRoyZ5.js","assets/ia-diagnostic-pur-qGnFEvys.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-tableau-pur-p6UvREJe.js","assets/identite-cm2A6IHK.js","assets/index.es-3U42_EyZ.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-BLgwC-uX.js","assets/jspdf.es.min-CmIVEjBv.js","assets/JustePrix-B_6YT0xA.js","assets/kkiapay-DMYl7dLi.js","assets/kkiapay-widget-CaHBoBVm.js","assets/Laboratoire-BfWdxkV1.js","assets/LaJournee-Bn_G0HCt.css","assets/LaJournee-DCcU_8-0.js","assets/le-caissier-pur-9iFAJGas.js","assets/le-sceau-pur-ZsXKMtuY.js","assets/LePoint-CBjCCMQ5.css","assets/LePoint-Cft3v8pw.js","assets/LesPaiements-B_GpA8sn.js","assets/LesPaiements-C9cEZlne.css","assets/LettresAuDossier-BjuKYxsP.js","assets/LienMndPay-BSZ5fcqO.js","assets/Marketing-kOmepGBg.js","assets/MarketingBranche-GQ7TbgX2.js","assets/Marque-Bz0kKpsD.js","assets/MesPourboires-CENjelyb.css","assets/MesPourboires-Co2m4lCf.js","assets/MesTaches-Cc4XUDf6.css","assets/MesTaches-qn0G-_ZG.js","assets/mnd-pay-pur-CfS2mkAo.js","assets/momo-C2ZVfV9J.js","assets/MonMois-D2_H-3Wh.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/MtnMoMo-CBBTqXgB.js","assets/objectifs-2Qv61mCf.js","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/opale-DbySe6HB.js","assets/oreille-B1AMUmZh.js","assets/paie-du-5-DeJq-K_U.css","assets/paie-du-5-DJWBlGLT.js","assets/paie-du-5-pur-CPiCK8fv.js","assets/paie-par-mtn-BNqa_qx3.js","assets/PaieParMtn-C79ISeWo.js","assets/paliers-CYTYtyBL.js","assets/Parametres-7sOxuJMC.js","assets/parcours-BEbFjXck.js","assets/Parrainages-BUV5z4er.js","assets/Parrainages-gAHAPB_6.css","assets/PassageAvantLeFauteuil-Ba9iGWZg.js","assets/pdf-DXzP-lYZ.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/periode-des-pourboires-pur-BUWqfwov.js","assets/Personas-co5AcObf.js","assets/Personnel-Ce57iMhV.js","assets/photo-zDaEq48L.js","assets/pilotage-D8kf1Co8.css","assets/porte-de-l-equipe-C-cJdCcJ.js","assets/Pourboires-CEFDWzeh.js","assets/Predictions-oM0jc__d.js","assets/preload-helper-BRe_O-Rg.js","assets/Prestataires-CZ46QbyL.js","assets/Prets-DUEYgVvM.js","assets/PrevisionDuMois-Bx921bKT.js","assets/PrevisionDuMois-DlFTw3OX.css","assets/Previsions-9BU2Vg1T.css","assets/Previsions-D59XJhtG.js","assets/previsions-pur-BTuoWVij.js","assets/processus-pur-R6U5QcCi.js","assets/Projets-CIledTWA.js","assets/Projets-COO7WDEE.css","assets/projets-DAkN9Odo.js","assets/projets-pur-2ZEMRNDU.js","assets/protocoles-DP__P4Z2.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-Bip-wt8w.js","assets/quiz-5qMPWZVi.js","assets/Rapport-DMW6LyPf.js","assets/Recommandations-JohomFV5.js","assets/regler-CW6trliJ.js","assets/regler-D1gFEaVz.css","assets/regler-par-fedapay-pur-DP7zXAs5.js","assets/relances-pur-C9iUwl2e.js","assets/releve-des-avis-rm9bOKiY.js","assets/SalonFoyer-Y1eyNCVV.js","assets/sceau-G8AqXfAG.js","assets/secretariat-admin-DmV6m-1m.js","assets/Secretariat-BanD8JZ9.js","assets/Secretariat-Cy79Zw30.css","assets/Signatures-D3T_7Sy4.js","assets/SignerUnPdf-C17liaH9.js","assets/Synthese-BSj0qU9M.js","assets/SyntheseGraphes-C6VLOW3X.js","assets/systeme-TPy-pF7j.css","assets/Tableau-eddaE682.js","assets/temps-CmbKh3J3.js","assets/Textes-DLpOzRbT.css","assets/Textes-y4C9DzVw.js","assets/tiroirs-CkDzpGy0.css","assets/tiroirs-DCKPQVcQ.js","assets/trone-B-r6lpi2.css","assets/trone-Cuj1oSqb.js","assets/useAudiences-BBEcglto.js","assets/useClotureDuJour-Bbe__6gT.js","assets/visios-CPfq9dJO.js","assets/Vitrine-BQnok4rr.js","assets/Vitrine-BWilTqQJ.css","assets/_admin-CQMaecyz.js","assets/_contrat-Z9yIDPRh.js","assets/_reuni-C_I2eJ-m.js","assets/_shared-cBwsRmvc.js","assets/_signature-DM9CXaqY.js","assets/_ui-B1DwLCA6.js","assets/_ui-BrUDlmuM.css"];
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
