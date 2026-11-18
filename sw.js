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
const BUILD = "20261118063346";
const A_GARDER = ["./","assets/abonnements-CIbpaThb.js","assets/Abonnements-DTY7p2DH.css","assets/Abonnements-SXnCtQ7d.js","assets/Academie-Bg50vATI.js","assets/Acces-DKE4QzoH.js","assets/afaire-BesExnxZ.js","assets/AFaire-CRlziR4e.js","assets/Agents-C4PX7ozb.js","assets/agents-donnees-BBBwD5e1.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-Dy5sqDGH.js","assets/App-Bex5eaFy.js","assets/Appels-DyoMmjOO.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/Assistants-BvsNMjeL.js","assets/Assistants-D9i2Xwmg.css","assets/AtelierDesContenus-B_mDyb7U.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/Audience-CFozw_gt.js","assets/Aujourdhui-0CNfEfe-.js","assets/auth-C8QrAw4U.js","assets/avant-le-fauteuil-lecture-CUjvP5Jm.js","assets/AvantLeFauteuil-CXXYZLic.js","assets/avis-fiches-DWT0_D_2.js","assets/AvisGoogle-DaPXfwX9.css","assets/AvisGoogle-PWC_rR1n.js","assets/BadgeEssai-Bu-mpyX6.js","assets/BadgeSuggere-D2bPAmiu.js","assets/besoins-CcQKberD.js","assets/BesoinsEtRegles-BLwxGVV5.css","assets/BesoinsEtRegles-CyAuTtya.js","assets/bilan-B-bfPYR0.css","assets/bilan-pgPAkNVO.js","assets/BilanMensuel-CBnYmLmz.js","assets/Branches-Id3KZyQp.js","assets/bridges-CSNlInLp.js","assets/caisse-du-soir-C6vPx-E_.css","assets/caisse-du-soir-ENKrPOMe.js","assets/Caisse-_iYb8mAO.js","assets/Caisses-Cn7Wvrtm.js","assets/Calendrier-BZ92de32.js","assets/campagnes-pur-BkqkAcxk.js","assets/Carnet-DP0aIu09.js","assets/carte-DJ8RTgoj.js","assets/carte-_W_-xBPj.css","assets/CarteModal-J4q0nxLg.js","assets/CartesCadeaux-DvGoNpZv.js","assets/Catalogue-CDa1VNaI.js","assets/CentreDeCommande-Du8kyJhp.css","assets/CentreDeCommande-lK-ioJno.js","assets/Cercle-Dqo1Xpw7.js","assets/certificat-CDC4vot0.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-BPDdAQ-I.js","assets/chiffre-du-jour-pur-DCfSW-sv.js","assets/ChiffreDesPrestations-_kpQ2aVA.js","assets/client-B0WOToKr.js","assets/cloture-du-jour-BUju2r1i.js","assets/ClotureDuTiroir-DcUh5wAa.js","assets/Coffre-DoKCEeX9.js","assets/collecte-mtn-pur-Bq3uWgWT.js","assets/components-ChQXOJnE.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-J16iOqku.js","assets/Comptes-nUc23T9v.js","assets/consultation-8JOyT9NQ.js","assets/consultation-CRW6QcWf.css","assets/Consultations-DiE-2_mG.css","assets/Consultations-XskTTqbr.js","assets/consultNotes-DiTawWDa.js","assets/Conversations-D4WwB5Zo.css","assets/Conversations-FTkJXM81.js","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-CLIjOKnt.js","assets/currency-Cd0clE4P.js","assets/Customers-DxSNuw2H.js","assets/Dashboard-04C5V-od.js","assets/Dashboard-B2x7VsE_.css","assets/dates-Hj3XHa2n.js","assets/Demandes-CF43cNAX.js","assets/DepenseEnUnePhrase-BIGRlGqP.css","assets/DepenseEnUnePhrase-BlR_c9ZW.js","assets/Depenses-D1FUXrN7.js","assets/depenses-saisie-BZZNllPp.js","assets/devis-remis-TsvJFb2i.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-d6MgyU2o.js","assets/diagnostics-au-trone-MKiJWRyS.js","assets/Dictee-C-pUYYFA.css","assets/Dictee-D79bO0CC.js","assets/dictee-pur-DDnxwomm.js","assets/Discussions-DqBpxyYN.js","assets/echappe-html-pur-gEhHOM07.js","assets/EditeurDesOffres-DplpCcPZ.js","assets/Encaissements-BDNymQuV.js","assets/enfants-hn5xEHv9.js","assets/Engagements-Cj5S9MhG.css","assets/engagements-coffre-CII7jhLE.js","assets/Engagements-DF9jS8ZL.js","assets/EntreDeuxSeances-DtKkz_Qs.js","assets/es-CswqMXg-.js","assets/Evaluation-CTJOEHoU.js","assets/facture-DZqmRIjb.js","assets/Factures-CvO9I0Fo.js","assets/FenetreDeLAgent-DqzHCFiW.js","assets/FenetreDesCivilites-B2uiAukS.js","assets/FenetreDesCivilites-zfNk1aak.css","assets/FenetreDuPoint-CwTXnlgC.js","assets/Fil-BJDZ6WN7.js","assets/finances-C8x7Mn4-.css","assets/fon-d53MU83Z.js","assets/Fournisseurs-C2WPlBBz.js","assets/fournisseurs-zt9NjuDC.js","assets/foyer-1RusUHtb.js","assets/Gerard-Cgj-zsJh.css","assets/Gerard-DmJ5raWM.js","assets/gerard-donnees-GW-3yeDs.js","assets/gestes-conversation-FZxc11KA.js","assets/heures-des-rappels-pur-BWJPB8OP.js","assets/HomeRituals-BMA-z6cJ.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-L-0rkgLx.js","assets/ia-centre-DyQCfHko.js","assets/ia-diagnostic-pur-qGnFEvys.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-tableau-pur-p6UvREJe.js","assets/identite-CEt3tUTm.js","assets/index.es-Ca2cK3s9.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-TwtpcrPy.js","assets/jspdf.es.min-CKiVnFY7.js","assets/JustePrix-DwvnRZ7y.js","assets/kkiapay-CLCKUHXO.js","assets/kkiapay-widget-CVmsl9OE.js","assets/Laboratoire-g-jAe6yh.js","assets/LaJournee-Bn_G0HCt.css","assets/LaJournee-HtdzV_gs.js","assets/le-caissier-pur-BoUSuCDA.js","assets/LesPaiements-C9cEZlne.css","assets/LesPaiements-E0XBelJo.js","assets/LettresAuDossier-BTevBtV-.js","assets/LienMndPay-C3ygqqLx.js","assets/Marketing-BpvEY9nC.js","assets/MarketingBranche-JjBlFVYN.js","assets/Marque-plVukDHh.js","assets/MesPourboires-CENjelyb.css","assets/MesPourboires-DSGmy0r2.js","assets/MesTaches-B5EPKYPI.js","assets/MesTaches-Cc4XUDf6.css","assets/momo-C2ZVfV9J.js","assets/MonMois-P6eTewqO.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/MtnMoMo-DDQXQTKq.js","assets/objectifs-BKWlZjKm.js","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/opale-BV_g2vko.js","assets/oreille-B1AMUmZh.js","assets/paie-du-5-D5dojqKx.js","assets/paie-du-5-DeJq-K_U.css","assets/paie-du-5-pur-CPiCK8fv.js","assets/paie-par-mtn-CGgK6o3Q.js","assets/PaieParMtn-Beyvue_Y.js","assets/paliers-DkL59t30.js","assets/Parametres-Bm8IfS22.js","assets/parcours-BNlr2Rbg.js","assets/Parrainages-DOrcZ7Tf.js","assets/Parrainages-gAHAPB_6.css","assets/PassageAvantLeFauteuil-DM1l0M3K.js","assets/pdf-Dg3pHb_A.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/periode-des-pourboires-pur-BUWqfwov.js","assets/Personas-Dfjs3nep.js","assets/Personnel-BaEuTrg9.js","assets/photo-Cla_bWiR.js","assets/pilotage-D8kf1Co8.css","assets/porte-de-l-equipe-BfGbz_7a.js","assets/Pourboires-DnNKIfez.js","assets/Predictions-CUX6MDHc.js","assets/preload-helper-BRe_O-Rg.js","assets/Prestataires-Cvvp4dGD.js","assets/Prets-CpAjF-Zz.js","assets/PrevisionDuMois-D8uL1mr3.js","assets/PrevisionDuMois-DlFTw3OX.css","assets/Previsions-9BU2Vg1T.css","assets/previsions-pur-Byo3FpyE.js","assets/Previsions-Vi4zB9Ap.js","assets/processus-pur-R6U5QcCi.js","assets/Projets-CJB-Ukpf.js","assets/Projets-COO7WDEE.css","assets/projets-D8x-3frH.js","assets/projets-pur-2ZEMRNDU.js","assets/protocoles-CPx_iXA4.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-CC7vDN83.js","assets/quiz-5qMPWZVi.js","assets/Rapport-DCviZQ7a.js","assets/Recommandations-OjfSrAoq.js","assets/regler-Binq91v5.js","assets/regler-DHR_B1Dm.css","assets/regler-par-fedapay-pur-G8CEJdGn.js","assets/relances-pur-BacTXlI2.js","assets/releve-des-avis-B9P3cjjG.js","assets/SalonFoyer-B3iqBhnk.js","assets/secretariat-admin-BzJWarg0.js","assets/Secretariat-Cy79Zw30.css","assets/Secretariat-wbXHlyeu.js","assets/Signatures-B-Kpa74-.js","assets/SignerUnPdf-BpM5WnSl.js","assets/Synthese-CROV-_hx.js","assets/SyntheseGraphes-oUz-10m4.js","assets/systeme-TPy-pF7j.css","assets/Tableau-DUpITsAW.js","assets/temps-Bxt-09N1.js","assets/Textes-DcWt_rCW.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-2cLo42VI.js","assets/tiroirs-CkDzpGy0.css","assets/trone-CwtHgd0p.js","assets/trone-DO_K_gMP.css","assets/useAudiences-CdMxXKbs.js","assets/useClotureDuJour-Dmnva3FQ.js","assets/visios-y9eQC78J.js","assets/Vitrine-BWilTqQJ.css","assets/Vitrine-Cx6LpdoM.js","assets/_admin-CEdH5BA6.js","assets/_contrat-CelhS8hp.js","assets/_reuni-CiB-wWyI.js","assets/_shared-DZdROybN.js","assets/_signature-C0VOPkWI.js","assets/_ui-BrUDlmuM.css","assets/_ui-BxukLfa_.js"];
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
