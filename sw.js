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
const BUILD = "20261123050445";
const A_GARDER = ["./","assets/abonnements-B3uVj--c.js","assets/Abonnements-BK315L-W.js","assets/Abonnements-DTY7p2DH.css","assets/Academie-C7pPu2BF.js","assets/Acces-3-e7yjv7.js","assets/AFaire-BBRi1Xs4.js","assets/afaire-C7Im9cyh.js","assets/Agents-CoKe3ggJ.js","assets/agents-donnees-D_u_Ud7O.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-C_2Es8Y7.js","assets/App-BdYlH6f3.js","assets/Appels-BJopLtrK.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/Assistants-BkgTj1iZ.js","assets/Assistants-D9i2Xwmg.css","assets/AtelierDesContenus-C0rK1qCO.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/Audience-Cq02jJcr.js","assets/Aujourdhui-DUPW12pX.js","assets/auth-DAWD7f5P.js","assets/avant-le-fauteuil-lecture-CCLwDtLi.js","assets/AvantLeFauteuil-BnV2aNYV.js","assets/avis-fiches-BNMCpFai.js","assets/avis-google-pont-BQW15R7c.js","assets/AvisGoogle-DaPXfwX9.css","assets/AvisGoogle-jrkqPgLt.js","assets/BadgeEssai-Dj1la-g_.js","assets/BadgeSuggere-oCiHqCaO.js","assets/besoins-C5Vkni_f.js","assets/BesoinsEtRegles-BLwxGVV5.css","assets/BesoinsEtRegles-F-GjsjDl.js","assets/bilan-B-bfPYR0.css","assets/bilan-DsKwN2ew.js","assets/BilanMensuel-BVfIV1l-.js","assets/Branches-DxwA42YT.js","assets/bridges-CwxQmSfh.js","assets/caisse-du-soir-C6vPx-E_.css","assets/caisse-du-soir-Da9AMBj_.js","assets/caisse-fluide-pur-C3YrED8y.js","assets/Caisse-RprfUJZk.js","assets/Caisses-BpFmXOuP.js","assets/Calendrier-C89D5Jau.js","assets/campagnes-pur-CL4AWsfG.js","assets/Carnet-BXDfnkeb.js","assets/carte-DLpN1Ef_.js","assets/carte-_W_-xBPj.css","assets/CarteModal-BVbYvRbn.js","assets/CartesCadeaux-D2vt1Q3l.js","assets/Catalogue-Cx5TJvxH.js","assets/CentreDeCommande-B3sf5FJx.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-B4Btm-Z1.js","assets/certificat-4ZwAaDaq.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-D9aUkzQ2.js","assets/chiffre-du-jour-pur-CTsyDhpH.js","assets/ChiffreDesPrestations-CSBh2mRa.js","assets/Classement-B7swOWwK.js","assets/classement-BZ3cv9A5.js","assets/Classement-CmpbQZDu.css","assets/classement-pur-CQOYU06l.js","assets/client-CE8XbDZu.js","assets/cloture-du-jour-_BAfexAQ.js","assets/ClotureDuTiroir-Bvoi6qNh.js","assets/Coffre-45Rr9Wz-.js","assets/collecte-mtn-pur-C1DeVC_x.js","assets/components-0jYZzpKa.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-C6fLmeKF.js","assets/Comptes-B8yLWg6M.js","assets/consultation-CRW6QcWf.css","assets/consultation-DfW1aRbe.js","assets/Consultations-CUssHQUa.js","assets/Consultations-DiE-2_mG.css","assets/consultNotes-Bz72LDIG.js","assets/contexte-de-la-reponse-B4UvK-9z.js","assets/Conversations-D4WwB5Zo.css","assets/Conversations-Doc0tyfZ.js","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-CELLSdj5.js","assets/currency-Cd0clE4P.js","assets/Customers-B2DqXgih.js","assets/Dashboard-B2x7VsE_.css","assets/Dashboard-Dk8DIbZq.js","assets/dates-CJzu5VR_.js","assets/DemanderAPerle-BD5NgCRN.css","assets/DemanderAPerle-CeJV5wyK.js","assets/Demandes-BtoWQ7so.js","assets/DepenseEnUnePhrase-BIGRlGqP.css","assets/DepenseEnUnePhrase-DvrwB48n.js","assets/Depenses-D2s-HMpi.js","assets/depenses-saisie-BGzbZzNY.js","assets/devis-BscPYl7C.css","assets/devis-D2TSUz-V.js","assets/devis-remis-LELaZRAt.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-CwRnqPIx.js","assets/diagnostics-au-trone-sd-owHyk.js","assets/Dictee-C-pUYYFA.css","assets/Dictee-C7YkoZ6J.js","assets/dictee-pur-okqwUtRJ.js","assets/Discussions-ieCK6mhj.js","assets/dist-9vv0te18.js","assets/echappe-html-pur-gEhHOM07.js","assets/EditeurDesOffres-D9EX81UZ.js","assets/Encaissements-BIytRo4F.js","assets/enfants-tU9eCvfI.js","assets/Engagements-CfFyihQw.js","assets/Engagements-Cj5S9MhG.css","assets/engagements-coffre-AuNCuQZY.js","assets/EntreDeuxSeances-CrRO6nyt.js","assets/es-Ilf0ZrV5.js","assets/etoiles-pur-CgRPMSHm.js","assets/Evaluation-jvkB4Q1T.js","assets/facture-BpMRfXOE.js","assets/Factures-BUdCYYQ_.js","assets/FenetreDeLAgent-CJO_6GZN.js","assets/FenetreDesCivilites-Bm0wrT3b.js","assets/FenetreDesCivilites-zfNk1aak.css","assets/FenetreDuPoint-Dnf2d8H8.js","assets/Fil-DQv4s76T.js","assets/finances-C8x7Mn4-.css","assets/fon-DhYar6rS.js","assets/fournisseurs-DF96v9hq.js","assets/Fournisseurs-DGWd1Ugi.js","assets/foyer-CNfgBhPe.js","assets/Gerard-CKNy1p9g.js","assets/gerard-donnees-pvlFM18N.js","assets/Gerard-lGKehvgG.css","assets/gestes-conversation-B5HfBSVm.js","assets/heures-des-rappels-pur-BWJPB8OP.js","assets/HomeRituals-DFNTpQ9X.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-3g1PqUmb.js","assets/ia-centre-B1gAVBkD.js","assets/ia-diagnostic-pur-qGnFEvys.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-tableau-pur-p6UvREJe.js","assets/identite-b9F4dQ9G.js","assets/index.es-DbtCIWQl.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-nGKpmORX.js","assets/jspdf.es.min-koa2xyD_.js","assets/JustePrix-KBhIhCOX.js","assets/kkiapay-AsKg8Br_.js","assets/kkiapay-widget-CVmsl9OE.js","assets/Laboratoire-cVCKxfYS.js","assets/LaJournee-Bn_G0HCt.css","assets/LaJournee-CjyUDVSk.js","assets/le-caissier-pur-BExz3Z7w.js","assets/le-sceau-pur-ZsXKMtuY.js","assets/LePoint-CBjCCMQ5.css","assets/LePoint-xFpTNqVv.js","assets/LesPaiements-C9cEZlne.css","assets/LesPaiements-Cdlml8CG.js","assets/LettresAuDossier-BJqlZS19.js","assets/LienMndPay-u94uBIZw.js","assets/Marketing-DtlYnwCA.js","assets/MarketingBranche-D-aW6u3H.js","assets/Marque-Bes84dhZ.js","assets/MesPourboires-CENjelyb.css","assets/MesPourboires-DK_ms8cO.js","assets/MesTaches-Cc4XUDf6.css","assets/MesTaches-CTHghHnj.js","assets/momo-C2ZVfV9J.js","assets/MonMois-CfS0kctJ.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/MtnMoMo-DvF7rOSh.js","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/objectifs-dp9Ek8l-.js","assets/opale-B5QV1FQU.js","assets/oreille-B1AMUmZh.js","assets/paie-du-5-DeJq-K_U.css","assets/paie-du-5-DgzCbLLi.js","assets/paie-du-5-pur-CPiCK8fv.js","assets/paie-par-mtn-FWZyWX0m.js","assets/PaieParMtn-C296ugPa.js","assets/paliers-CE6aeiz-.js","assets/Parametres-BYONXrgL.js","assets/parcours-Dl6VPhJV.js","assets/Parrainages-DTLJYo_M.js","assets/Parrainages-gAHAPB_6.css","assets/PassageAvantLeFauteuil-4_f_jFCG.js","assets/pdf-DsEAW6Hl.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/periode-des-pourboires-pur-BUWqfwov.js","assets/Personas-5AYi8adL.js","assets/Personnel-M_pInbNe.js","assets/photo-nvYVO66x.js","assets/pilotage-D8kf1Co8.css","assets/porte-de-l-equipe-CdFguYG0.js","assets/Pourboires-DYttW7ee.js","assets/Predictions-DjVgkjOG.js","assets/preload-helper-BRe_O-Rg.js","assets/Prestataires-D-EXG795.js","assets/Prets-DBq4yiqc.js","assets/PrevisionDuMois-DlFTw3OX.css","assets/PrevisionDuMois-r3tDlvJK.js","assets/Previsions-9BU2Vg1T.css","assets/Previsions-B9lsUQCY.js","assets/previsions-pur-DCTBiwYP.js","assets/processus-pur-R6U5QcCi.js","assets/Projets-COO7WDEE.css","assets/projets-D4vWPhbM.js","assets/Projets-DZ7WlqjT.js","assets/projets-pur-2ZEMRNDU.js","assets/protocoles-BnB1gunJ.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-DVrC11-y.js","assets/quiz-5qMPWZVi.js","assets/Rapport-Bl2FnBx8.js","assets/Recommandations-DxZInySS.js","assets/regler-D1gFEaVz.css","assets/regler-MSjmUZag.js","assets/regler-par-fedapay-pur-B5f9hJSb.js","assets/relances-pur-C9iUwl2e.js","assets/releve-des-avis-C5SQqnFR.js","assets/SalonFoyer-92eNxwRO.js","assets/sceau-1ypi4CyF.js","assets/secretariat-admin-CIRSDGu7.js","assets/Secretariat-Cy79Zw30.css","assets/Secretariat-D3iIBfxq.js","assets/Signatures-BTRP7QJd.js","assets/SignerUnPdf-BIodpuEe.js","assets/Synthese-CYoTb7V6.js","assets/SyntheseGraphes-HQH2eC6h.js","assets/systeme-TPy-pF7j.css","assets/Tableau-CPoOV-_P.js","assets/temps-B1RiQVuu.js","assets/Textes-DJzhCmnU.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-CkDzpGy0.css","assets/tiroirs-DVPzZSvB.js","assets/trone-B-r6lpi2.css","assets/trone-Hr06KgsT.js","assets/useAudiences-JEzU0OAB.js","assets/useClotureDuJour-CUA5d7sE.js","assets/visios-BgndauLr.js","assets/Vitrine-BWilTqQJ.css","assets/Vitrine-DSf9RNcz.js","assets/_admin-CGV7NETh.js","assets/_contrat-CZ0mQfRY.js","assets/_reuni-DdYo7ACB.js","assets/_shared-Bd_mBXdn.js","assets/_signature-DwExRQ8L.js","assets/_ui-BrUDlmuM.css","assets/_ui-D_H_fX5Q.js"];
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
