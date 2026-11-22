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
const BUILD = "20261122064315";
const A_GARDER = ["./","assets/Abonnements-BA_gZyUd.js","assets/Abonnements-DTY7p2DH.css","assets/abonnements-R8Fc-o-u.js","assets/Academie-i8GY1vlL.js","assets/Acces-kb1ecIgd.js","assets/afaire-BaPCx6tu.js","assets/AFaire-CYPzHq_N.js","assets/Agents-CPaVKGMF.js","assets/agents-donnees-BFgxvwOz.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-B9LByj42.js","assets/App-DI-H-5tl.js","assets/Appels-CJekB3QM.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/Assistants-CBKdqekV.js","assets/Assistants-D9i2Xwmg.css","assets/AtelierDesContenus-BA3OqKnp.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/Audience-CtVKSQ0f.js","assets/Aujourdhui-BAHiSVvm.js","assets/auth-CZ6C6oXK.js","assets/avant-le-fauteuil-lecture-B0cD8Rl6.js","assets/AvantLeFauteuil-Dc3UXx35.js","assets/avis-fiches-ChF9xVVn.js","assets/avis-google-pont-BJZ0a_TJ.js","assets/AvisGoogle-BJo24vQ-.js","assets/AvisGoogle-DaPXfwX9.css","assets/BadgeEssai-DQA67E68.js","assets/BadgeSuggere-Cjt9yArL.js","assets/besoins-BtHvohnO.js","assets/BesoinsEtRegles-BLwxGVV5.css","assets/BesoinsEtRegles-qLU-MqAQ.js","assets/bilan-B-bfPYR0.css","assets/bilan-BGGgly7q.js","assets/BilanMensuel-u86ppkXA.js","assets/Branches-BbMqQLoK.js","assets/bridges-B3XfSrqk.js","assets/Caisse-c3aJ5G3M.js","assets/caisse-du-soir-C6vPx-E_.css","assets/caisse-du-soir-n2K28V4_.js","assets/caisse-fluide-pur-nVKp1yzr.js","assets/Caisses-mQAtYd3u.js","assets/Calendrier-D3xNNQdA.js","assets/campagnes-pur-Cmh4-QXE.js","assets/Carnet-BPNfUaf9.js","assets/carte-CzfYqyBQ.js","assets/carte-_W_-xBPj.css","assets/CarteModal-Bp7gVpQj.js","assets/CartesCadeaux-kH89VHOT.js","assets/Catalogue-DbA2ih-W.js","assets/CentreDeCommande-Du8kyJhp.css","assets/CentreDeCommande-DXWdUJbb.js","assets/Cercle-DHR62F-g.js","assets/certificat-Bj-SO6kP.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-C7qWspbe.js","assets/chiffre-du-jour-pur-DWvXxiRT.js","assets/ChiffreDesPrestations-v-Xc6HWG.js","assets/Classement-ac2gGwKX.js","assets/Classement-CmpbQZDu.css","assets/classement-lG1AYMwr.js","assets/classement-pur-CQOYU06l.js","assets/client-7HtteHr5.js","assets/cloture-du-jour-CpH_YxOz.js","assets/ClotureDuTiroir-B4rCqnCc.js","assets/Coffre-D1Xq-Kzy.js","assets/collecte-mtn-pur-DsqLz5d0.js","assets/components-CvdD-8dD.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-B7M5Eckw.js","assets/Comptes-DvysAUV4.js","assets/consultation-C0CduahM.js","assets/consultation-CRW6QcWf.css","assets/Consultations-CXgok0QW.js","assets/Consultations-DiE-2_mG.css","assets/consultNotes-CPoKpry5.js","assets/contexte-de-la-reponse-B_R2-I8a.js","assets/Conversations-D4WwB5Zo.css","assets/Conversations-DPn0TaOQ.js","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-DwJdKZp6.js","assets/currency-Cd0clE4P.js","assets/Customers-CWcmPFpm.js","assets/Dashboard-B2x7VsE_.css","assets/Dashboard-Dew7j1eU.js","assets/dates-B2D2vB-9.js","assets/DemanderAPerle-BD5NgCRN.css","assets/DemanderAPerle-BJ5Yo2zf.js","assets/Demandes-ibUQwhzY.js","assets/DepenseEnUnePhrase-BIGRlGqP.css","assets/DepenseEnUnePhrase-BuRGu5u4.js","assets/Depenses-D_14JvBK.js","assets/depenses-saisie-C2ZmCNbf.js","assets/devis-remis-DxMsYJSN.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-GH7pG3xN.js","assets/diagnostics-au-trone-B8W2itU9.js","assets/Dictee-C-pUYYFA.css","assets/Dictee-Cc8_8WGz.js","assets/dictee-pur-D5WOh04n.js","assets/Discussions-BG9vkgRc.js","assets/echappe-html-pur-gEhHOM07.js","assets/EditeurDesOffres-CLWDuk2E.js","assets/Encaissements-CYg5kZFE.js","assets/enfants-Bw6UEkxI.js","assets/Engagements-BBMPZ6j9.js","assets/Engagements-Cj5S9MhG.css","assets/engagements-coffre-BQeQ6Cyi.js","assets/EntreDeuxSeances-DFy0EbFe.js","assets/es-DUec71mv.js","assets/Evaluation-0B50Ge8i.js","assets/facture-g1svGuCq.js","assets/Factures-DafvCX7L.js","assets/FenetreDeLAgent-Bz-IRtTg.js","assets/FenetreDesCivilites-HEMrBYIg.js","assets/FenetreDesCivilites-zfNk1aak.css","assets/FenetreDuPoint-D5bAR9YF.js","assets/Fil-BhyDUbp2.js","assets/finances-C8x7Mn4-.css","assets/fon-CeBiB-xA.js","assets/fournisseurs-C50rhkNh.js","assets/Fournisseurs-Tp-uz-r3.js","assets/foyer-QiJj-ykg.js","assets/Gerard-CeZrvVDM.js","assets/gerard-donnees-DwGlZLuZ.js","assets/Gerard-lGKehvgG.css","assets/gestes-conversation-B9zfp5ru.js","assets/heures-des-rappels-pur-BWJPB8OP.js","assets/HomeRituals-DVSrI2Nn.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-Dp98YeHK.js","assets/ia-centre-CIkQ-4dT.js","assets/ia-diagnostic-pur-qGnFEvys.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-tableau-pur-p6UvREJe.js","assets/identite-BMhJZCcB.js","assets/index.es-Drs65Nrx.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-DYP7IVua.js","assets/jspdf.es.min-bVJfsugR.js","assets/JustePrix-DNAp_Vkh.js","assets/kkiapay-ksjaLLjO.js","assets/kkiapay-widget-CVmsl9OE.js","assets/Laboratoire-C01AJhXq.js","assets/LaJournee-Bn_G0HCt.css","assets/LaJournee-DtU1LEwg.js","assets/le-caissier-pur-CWuvVFGl.js","assets/LePoint-CBjCCMQ5.css","assets/LePoint-ZIsDYVn0.js","assets/LesPaiements-C9cEZlne.css","assets/LesPaiements-DydqKp1i.js","assets/LettresAuDossier-Dmto_Mwz.js","assets/LienMndPay-gy5gszJL.js","assets/Marketing-B228f9UG.js","assets/MarketingBranche-dOYl8vRX.js","assets/Marque-qKcisjWA.js","assets/MesPourboires-CENjelyb.css","assets/MesPourboires-DViY-BNU.js","assets/MesTaches-Cc4XUDf6.css","assets/MesTaches-X8B2LziT.js","assets/momo-C2ZVfV9J.js","assets/MonMois-PwLXDZ9P.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/MtnMoMo-BEY0Ndw0.js","assets/objectifs-C3Bq6Zma.js","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/opale-pFVwOPoP.js","assets/oreille-B1AMUmZh.js","assets/paie-du-5-B-IyQct9.js","assets/paie-du-5-DeJq-K_U.css","assets/paie-du-5-pur-CPiCK8fv.js","assets/paie-par-mtn-B2tnoFOe.js","assets/PaieParMtn-CJDg5CB0.js","assets/paliers-DagapeK_.js","assets/Parametres-NBDUNhJ8.js","assets/parcours-tdX2ZJ6e.js","assets/Parrainages-DnPtu7W6.js","assets/Parrainages-gAHAPB_6.css","assets/PassageAvantLeFauteuil-CbVBXlwS.js","assets/pdf-BoqAe4VX.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/periode-des-pourboires-pur-BUWqfwov.js","assets/Personas-C0RYL86i.js","assets/Personnel-C4n9rN_o.js","assets/photo-CBIgRhub.js","assets/pilotage-D8kf1Co8.css","assets/porte-de-l-equipe-DT9HZoJy.js","assets/Pourboires-B1sk7EB3.js","assets/Predictions-Btvke6bT.js","assets/preload-helper-BRe_O-Rg.js","assets/Prestataires-DUk_rBqK.js","assets/Prets-D1zFa8_Q.js","assets/PrevisionDuMois-DlFTw3OX.css","assets/PrevisionDuMois-FdCx9e0A.js","assets/Previsions-9BU2Vg1T.css","assets/Previsions-CXedxWfH.js","assets/previsions-pur-kUCndq47.js","assets/processus-pur-R6U5QcCi.js","assets/Projets-COO7WDEE.css","assets/Projets-D_f-aom_.js","assets/projets-pur-2ZEMRNDU.js","assets/projets-y0w7yKNd.js","assets/protocoles-B4KuNpM6.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-CAwmJL64.js","assets/quiz-5qMPWZVi.js","assets/Rapport-BpMQkb4J.js","assets/Recommandations-HYxruzJ4.js","assets/regler-C6Z6U-Jb.js","assets/regler-DHR_B1Dm.css","assets/regler-par-fedapay-pur-CBsdnUYQ.js","assets/relances-pur-C9iUwl2e.js","assets/releve-des-avis-B2o8dMJO.js","assets/SalonFoyer-Vv5LzxGD.js","assets/secretariat-admin-Cdl0HRey.js","assets/Secretariat-By-Bufe1.js","assets/Secretariat-Cy79Zw30.css","assets/Signatures-BoG3imdT.js","assets/SignerUnPdf-COmb5trS.js","assets/Synthese-Cf1kjsHg.js","assets/SyntheseGraphes-9wu_Alke.js","assets/systeme-TPy-pF7j.css","assets/Tableau-aUum3Dwn.js","assets/temps-sdLR7V_o.js","assets/Textes-CDngCZOU.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-CkDzpGy0.css","assets/tiroirs-KhE9ffO5.js","assets/trone-B-r6lpi2.css","assets/trone-BH4YRWC3.js","assets/useAudiences-B4p14JSL.js","assets/useClotureDuJour-BMs5rhFn.js","assets/visios-DeOH34Sx.js","assets/Vitrine-BWilTqQJ.css","assets/Vitrine-SKojccq1.js","assets/_admin-B8exLOs2.js","assets/_contrat-WGoIu1Ab.js","assets/_reuni-C_bFreMf.js","assets/_shared-BdmyfTa0.js","assets/_signature-EojpxhmR.js","assets/_ui-BrUDlmuM.css","assets/_ui-CVAkhsp-.js"];
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
