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
const BUILD = "20261125104601";
const A_GARDER = ["./","assets/abonnements-CE9ko7G1.js","assets/Abonnements-CVwjs3cG.js","assets/Abonnements-DTY7p2DH.css","assets/Academie-DBycmJMX.js","assets/Acces-Cn57Ym3E.js","assets/afaire-B7Q_P0Y_.js","assets/AFaire-BZqPkrfZ.js","assets/Agents-CeBwEQEj.js","assets/agents-donnees-BKXzD9zq.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-D5bgVsm2.js","assets/App-DS8_IogN.js","assets/Appels-BNkWLJ7I.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/Assistants-D9i2Xwmg.css","assets/Assistants-DQsnQdyi.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/AtelierDesContenus-DEjDmHMl.js","assets/Audience-D0H-U6_c.js","assets/Aujourdhui-DCuVzZjX.js","assets/auth-BKsIuneN.js","assets/avant-le-fauteuil-lecture-BdrJINzO.js","assets/AvantLeFauteuil-CK7Tio63.js","assets/avis-fiches-FAzaEPpy.js","assets/avis-google-pont-DWkUjTPV.js","assets/AvisGoogle-DaPXfwX9.css","assets/AvisGoogle-W5RSBmtI.js","assets/BadgeEssai-BDf3XV9n.js","assets/BadgeSuggere-EPpqbN3Y.js","assets/besoins-R6sLjzUS.js","assets/BesoinsEtRegles-BLwxGVV5.css","assets/BesoinsEtRegles-D2m8yYUp.js","assets/bilan-B-bfPYR0.css","assets/bilan-CxDetsAy.js","assets/BilanMensuel-BuwjCmmy.js","assets/Branches-D7Ui6JLb.js","assets/bridges-BbwFzt3Y.js","assets/Caisse-CyvYTQsj.js","assets/caisse-du-soir-BbGtgonN.js","assets/caisse-du-soir-C6vPx-E_.css","assets/caisse-fluide-pur-B6hOyzJu.js","assets/Caisses-BeijGq9-.js","assets/Calendrier-BSrH2TOK.js","assets/campagnes-pur-CayNFssI.js","assets/Carnet-5gR1DxTQ.js","assets/carte-DwyK9bKs.js","assets/carte-_W_-xBPj.css","assets/CarteModal-D1D2MgH1.js","assets/CartesCadeaux-BbrULrAf.js","assets/Catalogue-BiZXYXvi.js","assets/CentreDeCommande-Du8kyJhp.css","assets/CentreDeCommande-XwS8o9Yl.js","assets/Cercle-BxyRfQr7.js","assets/certificat-BsSc5Txb.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-CrEdJ9QP.js","assets/chiffre-du-jour-pur-B1rovNLM.js","assets/ChiffreDesPrestations-CJz2f260.js","assets/Classement--J30iDlb.js","assets/classement-DUQmHPYz.js","assets/classement-pur-6JMvjF9n.js","assets/Classement-T9x-HPwd.css","assets/client-Bu_KCKlp.js","assets/cloture-du-jour-BjyoF5Yq.js","assets/ClotureDuTiroir-BtpLZioY.js","assets/Coffre-USY3TRw-.js","assets/components-qeIO1683.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-DJrqIMoL.js","assets/Comptes-nbMWSiAd.js","assets/consultation-Be4JQ1Wx.js","assets/consultation-CRW6QcWf.css","assets/Consultations-Chx8cVsk.js","assets/Consultations-DiE-2_mG.css","assets/consultNotes-UefdNkA0.js","assets/contexte-de-la-reponse-Bj-WU7C_.js","assets/Conversations-B67vxTxp.js","assets/Conversations-D4WwB5Zo.css","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-BtQ2d_rx.js","assets/currency-Cd0clE4P.js","assets/Customers-DvC9HM7f.js","assets/Dashboard-CO49SXuB.js","assets/Dashboard-D9jnTaFp.css","assets/dates-BEtHpBhs.js","assets/DemanderAPerle-B5A5L8A0.js","assets/DemanderAPerle-BD5NgCRN.css","assets/Demandes-DLkcVaPw.js","assets/DepenseEnUnePhrase-BIGRlGqP.css","assets/DepenseEnUnePhrase-DSHa5jiT.js","assets/Depenses-BSg6fl2b.js","assets/depenses-saisie-C9BQLFJK.js","assets/devis-B4e_kTTt.js","assets/devis-CdIRAvZk.css","assets/devis-remis-DH6XXX3u.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-Dl5vPhzF.js","assets/diagnostics-au-trone-Dg8Rh7Ip.js","assets/Dictee-C-pUYYFA.css","assets/Dictee-eHc-gFaY.js","assets/dictee-pur-DI6wyhjO.js","assets/Discussions-DNUNr78U.js","assets/dist-9vv0te18.js","assets/echappe-html-pur-gEhHOM07.js","assets/EditeurDesOffres-DDgGTf4T.js","assets/Encaissements-DOGiqDp3.js","assets/EnDirect-CBqzr3P_.js","assets/enfants-S637_8-2.js","assets/Engagements-B-Pp77gi.js","assets/Engagements-Cj5S9MhG.css","assets/engagements-coffre-BKKx7KkY.js","assets/EntreDeuxSeances-WvXmFAQ7.js","assets/es-CfjYz7QM.js","assets/etoiles-pur-CgRPMSHm.js","assets/Evaluation-CFnt09BQ.js","assets/facture-ERUSgHRO.js","assets/Factures-lpSfDBNc.js","assets/FenetreDeLAgent-RJlGONT-.js","assets/FenetreDesCivilites-BmllUvWD.js","assets/FenetreDesCivilites-zfNk1aak.css","assets/FenetreDuPoint-Cy49CHXS.js","assets/Fil-Dn2hkwnx.js","assets/finances-C8x7Mn4-.css","assets/fon-CazAXGJJ.js","assets/fournisseurs-7jaE2APz.js","assets/Fournisseurs-D6lu398N.js","assets/foyer-BFYwol8Q.js","assets/Gerard-8X-VFZrf.js","assets/gerard-donnees-BVx09xdG.js","assets/Gerard-lGKehvgG.css","assets/gestes-conversation-yBdfsjnm.js","assets/heures-des-rappels-pur-BWJPB8OP.js","assets/HomeRituals-Bn4Ux4XW.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-Bx9g3nqs.js","assets/ia-centre-CCYSCcrv.js","assets/ia-diagnostic-pur-qGnFEvys.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-tableau-pur-p6UvREJe.js","assets/identite-CdAcuYt9.js","assets/index.es-D5Na1tHp.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-CLfFYG7g.js","assets/jspdf.es.min-CdobVI1T.js","assets/JustePrix-BtECDNKx.js","assets/kkiapay-DbKEs8V1.js","assets/kkiapay-widget-CaHBoBVm.js","assets/Laboratoire-DJQ7p8Yn.js","assets/LaJournee-Bn_G0HCt.css","assets/LaJournee-X8cfLxMU.js","assets/le-caissier-pur-BMoaGVt7.js","assets/le-sceau-pur-Dv-IZ_M2.js","assets/LePoint-B_HurXA0.css","assets/LePoint-sz4rPKrs.js","assets/LesPaiements-C9cEZlne.css","assets/LesPaiements-CXBafq0i.js","assets/LettresAuDossier-CuP7gySG.js","assets/LienMndPay-CbDeX3NG.js","assets/Marketing-CAjKLKbG.js","assets/MarketingBranche-BvE5JzXT.js","assets/Marque-CrB064oS.js","assets/MesPourboires-6O05I2ZJ.js","assets/MesPourboires-CENjelyb.css","assets/MesTaches-BWE6u-wM.js","assets/MesTaches-Cc4XUDf6.css","assets/mnd-pay-pur-CfS2mkAo.js","assets/momo-C2ZVfV9J.js","assets/MonMois--675CyZ-.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/MtnMoMo-upMAAowA.js","assets/objectifs-BZJn8Xi1.js","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/opale-DtIe_jgP.js","assets/oreille-B1AMUmZh.js","assets/paie-du-5-DeJq-K_U.css","assets/paie-du-5-DHRd58Am.js","assets/paie-du-5-pur-CPiCK8fv.js","assets/paie-par-mtn-DFeDIHUT.js","assets/PaieParMtn-DMPAnfec.js","assets/paliers-4K5Rjz8O.js","assets/Parametres-TrfXLZnr.js","assets/parcours-D7a5-A7v.js","assets/Parrainages-C7UEmQbc.js","assets/Parrainages-gAHAPB_6.css","assets/PassageAvantLeFauteuil-qb22uM7F.js","assets/pdf-Czo6i75N.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/periode-des-pourboires-pur-BUWqfwov.js","assets/Personas-BULk-v9d.js","assets/Personnel-BL2daxiQ.js","assets/photo-8JbMibRf.js","assets/pilotage-D8kf1Co8.css","assets/porte-de-l-equipe-Cz3FQGie.js","assets/Pourboires-BOFyBwgc.js","assets/Predictions-r9fcYPpw.js","assets/preload-helper-BRe_O-Rg.js","assets/Prestataires-6yXK5O8i.js","assets/Prets-DVSvuCMH.js","assets/PrevisionDuMois-DgEQw6Ew.js","assets/PrevisionDuMois-DlFTw3OX.css","assets/Previsions-9BU2Vg1T.css","assets/Previsions-C6qAHpE5.js","assets/previsions-pur-BLSiqcdP.js","assets/processus-pur-R6U5QcCi.js","assets/Projets-CBrFL65e.js","assets/Projets-COO7WDEE.css","assets/projets-pur-2ZEMRNDU.js","assets/projets-VmXpYI_O.js","assets/protocoles-CXuzgerH.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-Cqf6krRl.js","assets/quiz-5qMPWZVi.js","assets/Rapport-Bs4V91kg.js","assets/Recommandations-CrAMnZY0.js","assets/regler-B34kaZWa.js","assets/regler-D1gFEaVz.css","assets/regler-par-fedapay-pur-DP7zXAs5.js","assets/relances-pur-C9iUwl2e.js","assets/releve-des-avis-CrXc86OJ.js","assets/SalonFoyer-TkEY_VYr.js","assets/sceau-DQQucery.js","assets/secretariat-admin-DsHHEnZo.js","assets/Secretariat-Cy79Zw30.css","assets/Secretariat-D0wUxSI5.js","assets/Signatures-C9u1ILe1.js","assets/SignerUnPdf-BZJByVzj.js","assets/Synthese-DdKvsoQh.js","assets/SyntheseGraphes-BO877GBg.js","assets/systeme-TPy-pF7j.css","assets/Tableau-nkvUn_zS.js","assets/temps-BaMP9VHd.js","assets/Textes-C7SmwFBM.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-CkDzpGy0.css","assets/tiroirs-CUkHb-Bq.js","assets/trone-BzDp4j9X.js","assets/trone-C3eufNNq.css","assets/useAudiences-DKYrH9_N.js","assets/useClotureDuJour-DHvbvJH6.js","assets/visios-CPb6eGyt.js","assets/Vitrine-B048Sx1W.js","assets/Vitrine-BWilTqQJ.css","assets/_admin-CRjSmPTy.js","assets/_contrat-zFVmmCkR.js","assets/_reuni-DoZNNA9E.js","assets/_shared-CWB8PVoW.js","assets/_signature-B1qnCUWX.js","assets/_ui-BrUDlmuM.css","assets/_ui-ypo7TEui.js"];
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
