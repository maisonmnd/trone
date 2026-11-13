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
const BUILD = "20261113153316";
const A_GARDER = ["./","assets/abonnements-2Bo6PaZb.js","assets/Abonnements-DJkpNTRx.js","assets/Abonnements-DTY7p2DH.css","assets/Academie-DkA5Jvbv.js","assets/Acces-C9OHSk1h.js","assets/afaire-C7YumBmu.js","assets/AFaire-CQpJz6Er.js","assets/agents-donnees-MlKcoNTd.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Agents-tA4QUS9L.js","assets/Analytics-EjKwEQbZ.js","assets/Appels-BxQ2VqiG.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/Assistants-D9i2Xwmg.css","assets/Assistants-DXYOOQlN.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/AtelierDesContenus-LGnMhryT.js","assets/Audience-CKbgQ10Q.js","assets/Aujourdhui-BVjL7gIt.js","assets/avant-le-fauteuil-lecture-rqZm2P9B.js","assets/AvantLeFauteuil-B7iOVZJW.js","assets/avis-fiches-DzvT19gx.js","assets/AvisGoogle-DaPXfwX9.css","assets/AvisGoogle-Dho_qvDD.js","assets/BadgeEssai-BOK3PYPf.js","assets/besoins-DMQt-nfJ.js","assets/BesoinsEtRegles-CtorCAb7.js","assets/BesoinsEtRegles-CzntMbJE.css","assets/bilan-B-bfPYR0.css","assets/bilan-qgc1SDJG.js","assets/BilanMensuel-5qA-jpB3.js","assets/Branches-CDIggfxo.js","assets/bridges-dudSq8Z8.js","assets/Caisse-Dcu0FnT1.js","assets/caisse-du-soir-C6vPx-E_.css","assets/caisse-du-soir-C7cb5Itf.js","assets/Caisses-CKnV_4lp.js","assets/Calendrier-s7c30Enc.js","assets/campagnes-pur-BQ9gALjC.js","assets/Carnet-DevNWxkQ.js","assets/carte-BC1JT2iE.js","assets/carte-_W_-xBPj.css","assets/CarteModal-PEVOOC9d.js","assets/CartesCadeaux-BmaUWBSL.js","assets/Catalogue-BJQWKkcT.js","assets/CentreDeCommande-Du8kyJhp.css","assets/CentreDeCommande-ke1aqR0N.js","assets/Cercle-omEwCCGh.js","assets/certificat-BTNtTA7b.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-CO_XPKwz.js","assets/chiffre-du-jour-pur-CDOW93y3.js","assets/ChiffreDesPrestations-hK3lYf4u.js","assets/client-BQWqoafI.js","assets/cloture-du-jour-pJnJl0Bi.js","assets/ClotureDuTiroir-DzyOrrYb.js","assets/Coffre-DmN-SPm1.js","assets/collecte-mtn-pur-Bq3uWgWT.js","assets/components-Ci_tlacF.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-CgpLQxM2.js","assets/Comptes-CMPkNqix.js","assets/consultation-CRW6QcWf.css","assets/consultation-eJpQpuxW.js","assets/Consultations-CFdNCzB7.js","assets/Consultations-DiE-2_mG.css","assets/consultNotes-DQM4JN0u.js","assets/Conversations-D4WwB5Zo.css","assets/Conversations-mopgqBM2.js","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-DuzjcDzX.js","assets/currency-qfIhGmrs.js","assets/Customers-BoIUyCuW.js","assets/Dashboard-B2x7VsE_.css","assets/Dashboard-wcN7o4l9.js","assets/dates-CslH_67c.js","assets/Demandes-h2NTC82H.js","assets/DepenseEnUnePhrase-BIGRlGqP.css","assets/DepenseEnUnePhrase-Bkgi71Rs.js","assets/Depenses-BHDlv9Og.js","assets/depenses-saisie-Vdb0145r.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-Du6LA0EE.js","assets/diagnostics-au-trone-CyBZjr9I.js","assets/Dictee-6nOqRrIn.js","assets/Dictee-BIQFbKhA.css","assets/dictee-pur-CcUyirFo.js","assets/Discussions-dn0nLLAB.js","assets/EditeurDesOffres-Bkr9BrJ6.js","assets/Encaissements-iu0UPAJ0.js","assets/enfants-D4JAbtPG.js","assets/Engagements-2IJuEEs7.js","assets/Engagements-Cj5S9MhG.css","assets/engagements-coffre-DpnEJKX-.js","assets/EntreDeuxSeances-BYqNEs9M.js","assets/Evaluation-Bu4t11_a.js","assets/facture-ClWKlbJc.js","assets/Factures-BHXzVAkO.js","assets/FenetreDesCivilites-CGEn6paR.js","assets/FenetreDesCivilites-zfNk1aak.css","assets/FenetreDuPoint-BtGFUxK0.js","assets/Fil-cO3AkJax.js","assets/finances-C8x7Mn4-.css","assets/fon-CB2h318Q.js","assets/fournisseurs-DyCln0sy.js","assets/Fournisseurs-Tm_CIwVN.js","assets/foyer-BabWKkgH.js","assets/Gerard-Cgj-zsJh.css","assets/Gerard-CqI4A2uo.js","assets/gerard-donnees-BI9vGRHc.js","assets/gestes-conversation-DeU_AIPb.js","assets/heures-des-rappels-pur-Dig9pZpo.js","assets/HomeRituals-L2oxNp6U.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-BD04egZk.js","assets/ia-centre-BG_P-c3L.js","assets/ia-diagnostic-pur-BNtkwfR3.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-tableau-pur-p6UvREJe.js","assets/identite-BA_aAqDA.js","assets/index-BDqp-LXA.js","assets/index.es-pYYGkpsV.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-DJFVWtIJ.js","assets/jspdf.es.min-CbYVIBcl.js","assets/JustePrix-D3wj_gr1.js","assets/kkiapay-DJCDcLha.js","assets/kkiapay-widget-CVmsl9OE.js","assets/Laboratoire-BTlMBbFW.js","assets/LaJournee-BCZeKRZ_.js","assets/LaJournee-Bn_G0HCt.css","assets/LesPaiements-C9cEZlne.css","assets/LesPaiements-Cs9Hxkji.js","assets/LettresAuDossier-r2B4W2V0.js","assets/LienMndPay-CvLd-E4N.js","assets/Marketing-DmCCw9w8.js","assets/MarketingBranche-BHNUFD99.js","assets/Marque-CvZqLTsO.js","assets/MesPourboires-CENjelyb.css","assets/MesPourboires-DMPMIH_f.js","assets/MesTaches-BREhh5dy.js","assets/MesTaches-Cc4XUDf6.css","assets/momo-C2ZVfV9J.js","assets/MonMois-Dz9hg0Zi.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/MtnMoMo-Cc3N80WI.js","assets/objectifs-CxbaOocW.js","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/opale-D4Mkj7YV.js","assets/oreille-B1AMUmZh.js","assets/paie-du-5--cO9IhjU.js","assets/paie-du-5-DeJq-K_U.css","assets/paie-du-5-pur-CPiCK8fv.js","assets/paie-par-mtn-C6zDBiA1.js","assets/PaieParMtn-KiMNRfxd.js","assets/paliers-B1kg3l6A.js","assets/Parametres-C8ho2AvB.js","assets/parcours-CtzxxMQs.js","assets/Parrainages-DhoVC1AY.js","assets/Parrainages-gAHAPB_6.css","assets/PassageAvantLeFauteuil-C6O5auSp.js","assets/pdf-DuAxAdRf.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/periode-des-pourboires-pur-BUWqfwov.js","assets/Personas-C9fVEqLn.js","assets/Personnel-jP4CHUSP.js","assets/photo-Of88iV7V.js","assets/pilotage-D8kf1Co8.css","assets/Pourboires-B8eIcVHl.js","assets/Predictions-ByJ_2k89.js","assets/Prestataires-DIQP3IuO.js","assets/Prets-BIoGOb_l.js","assets/PrevisionDuMois-DlFTw3OX.css","assets/PrevisionDuMois-DVACwVHA.js","assets/Previsions-9BU2Vg1T.css","assets/Previsions-ClNaE7YD.js","assets/previsions-pur-DyjKkxRj.js","assets/processus-pur-R6U5QcCi.js","assets/Projets-COO7WDEE.css","assets/projets-CxIPYTzR.js","assets/Projets-CYKjXfML.js","assets/projets-pur-2ZEMRNDU.js","assets/protocoles-BPwve1z7.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-Bi9FaASN.js","assets/qualification-BX4DGnXG.js","assets/quiz-5qMPWZVi.js","assets/Rapport-CDAatmab.js","assets/Recommandations-BczIlMcg.js","assets/regler-CNp9TJxk.js","assets/regler-DHR_B1Dm.css","assets/regler-par-fedapay-pur-G8CEJdGn.js","assets/relances-pur-BacTXlI2.js","assets/releve-des-avis-C8qnJX5-.js","assets/SalonFoyer-B6URJv4G.js","assets/secretariat-admin-D5nGYNeS.js","assets/Secretariat-Cy79Zw30.css","assets/Secretariat-SGJIEwnU.js","assets/Signatures-WiBSYTeI.js","assets/SignerUnPdf-4OW2phoG.js","assets/Synthese-9HBAde5x.js","assets/SyntheseGraphes-DJxfZVUb.js","assets/systeme-TPy-pF7j.css","assets/Tableau-BkeAhKq_.js","assets/temps-BeXwrbHh.js","assets/Textes-Ck-UyHrO.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-CcpAEMLU.js","assets/tiroirs-CkDzpGy0.css","assets/trone-C6N6al5s.js","assets/trone-Dg6wh-u1.css","assets/useAudiences-BFWoeKLk.js","assets/useClotureDuJour-OWA272Qc.js","assets/visios-DQJabwoC.js","assets/Vitrine-3nc0Y40y.js","assets/Vitrine-BWilTqQJ.css","assets/_admin-DHTH2c-L.js","assets/_contrat-Cw1YC0mT.js","assets/_reuni-hb4cU-hv.js","assets/_shared-CrncAHiM.js","assets/_signature-CW2hCx09.js","assets/_ui-BrUDlmuM.css","assets/_ui-CKm07R_K.js"];
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
