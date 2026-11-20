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
const BUILD = "20261120125430";
const A_GARDER = ["./","assets/abonnements-CDFG0x6L.js","assets/Abonnements-D4AjA9Up.js","assets/Abonnements-DTY7p2DH.css","assets/Academie-BNVbh-HK.js","assets/Acces-D1qFVj4A.js","assets/afaire-BggIpVH2.js","assets/AFaire-CR-W1V-l.js","assets/Agents-CnJOfHXk.js","assets/agents-donnees-Dwc0fXAS.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-Dx4Nc7Kz.js","assets/App--Pr0TepH.js","assets/Appels-ASQXb2ye.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/Assistants-D9i2Xwmg.css","assets/Assistants-DbmDp4bO.js","assets/AtelierDesContenus-C3pENWgV.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/Audience-DnjYfldT.js","assets/Aujourdhui-BV7DsbkS.js","assets/auth-D5ChA2_y.js","assets/avant-le-fauteuil-lecture-DwBhjsQ7.js","assets/AvantLeFauteuil-DFlr1Icu.js","assets/avis-fiches-C329X88m.js","assets/AvisGoogle-DaPXfwX9.css","assets/AvisGoogle-Dxv8Rwbg.js","assets/BadgeEssai-DEHE3ryF.js","assets/BadgeSuggere-r1ut-Olv.js","assets/besoins-C3eXl7st.js","assets/BesoinsEtRegles-BLwxGVV5.css","assets/BesoinsEtRegles-DFbPLnX9.js","assets/bilan-B-bfPYR0.css","assets/bilan-D6BDYcF1.js","assets/BilanMensuel-ke95qbV2.js","assets/Branches-E5iv0qZe.js","assets/bridges-C_DQGHXH.js","assets/Caisse-CYImV6_S.js","assets/caisse-du-soir-C-yAJQFG.js","assets/caisse-du-soir-C6vPx-E_.css","assets/Caisses-sw7pSNyv.js","assets/Calendrier-C4OIIEqK.js","assets/campagnes-pur-ChIDnQKQ.js","assets/Carnet-B_h1BnUR.js","assets/carte-VjdAz_fs.js","assets/carte-_W_-xBPj.css","assets/CarteModal-LpWEoW0O.js","assets/CartesCadeaux-BTjBJrp2.js","assets/Catalogue-BHqRYMPj.js","assets/CentreDeCommande-Du8kyJhp.css","assets/CentreDeCommande-znsr1mGM.js","assets/Cercle-Sv5UuCBC.js","assets/certificat-BLwwyXzn.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-FlBpo67w.js","assets/chiffre-du-jour-pur-DyxAFj5X.js","assets/ChiffreDesPrestations-CQUDy5Bm.js","assets/Classement-BZUCMlQI.js","assets/Classement-CmpbQZDu.css","assets/classement-pur-CQOYU06l.js","assets/client-CrF6Ei5A.js","assets/cloture-du-jour-CyhapT-Y.js","assets/ClotureDuTiroir-BSKZyAKD.js","assets/Coffre-B4cqBgAV.js","assets/collecte-mtn-pur-Bq3uWgWT.js","assets/components-C5JNcBOT.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-92utOB8K.js","assets/Comptes-CGU4vjuZ.js","assets/consultation-CRW6QcWf.css","assets/consultation-DVjvxkPy.js","assets/Consultations-DiE-2_mG.css","assets/Consultations-DU9n0Nai.js","assets/consultNotes-BU6DalJA.js","assets/Conversations-B50h6BY1.js","assets/Conversations-D4WwB5Zo.css","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-BzyVe28A.js","assets/currency-Cd0clE4P.js","assets/Customers-B31HRR9q.js","assets/Dashboard-B2x7VsE_.css","assets/Dashboard-BxzoPcPE.js","assets/dates-4T3V3nlV.js","assets/Demandes-2h0R2n4O.js","assets/DepenseEnUnePhrase-9r22j_7x.js","assets/DepenseEnUnePhrase-BIGRlGqP.css","assets/Depenses-CST4jls7.js","assets/depenses-saisie-ClsH143z.js","assets/devis-remis-D4UIdknM.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-ByQ2KciM.js","assets/diagnostics-au-trone-CyADcZ3O.js","assets/Dictee-C-pUYYFA.css","assets/dictee-pur-CQTK3UYi.js","assets/Dictee-zbxpCKEh.js","assets/Discussions-BZPyIgcj.js","assets/echappe-html-pur-gEhHOM07.js","assets/EditeurDesOffres-DfQa9OfL.js","assets/Encaissements-DxfGRmEA.js","assets/enfants-B7q683Uj.js","assets/Engagements-BYIaTCOA.js","assets/Engagements-Cj5S9MhG.css","assets/engagements-coffre-BMzB5y4K.js","assets/EntreDeuxSeances-BhKZvOU3.js","assets/es-_VaEiK1y.js","assets/Evaluation-PK8iC4qE.js","assets/facture-Ck_y59kA.js","assets/Factures-BCGMDpFn.js","assets/FenetreDeLAgent-B9MKil3l.js","assets/FenetreDesCivilites-DIXlIYpL.js","assets/FenetreDesCivilites-zfNk1aak.css","assets/FenetreDuPoint-BbM1sdf7.js","assets/Fil-DuvwZ5f4.js","assets/finances-C8x7Mn4-.css","assets/fon-O8pLIRbv.js","assets/fournisseurs-3QQMmZpo.js","assets/Fournisseurs-C-pc30Uk.js","assets/foyer-Q9pCK8jA.js","assets/Gerard-BYbvPd9u.js","assets/gerard-donnees-VCN-rzkd.js","assets/Gerard-vo2IWvP3.css","assets/gestes-conversation-BGRrd48a.js","assets/heures-des-rappels-pur-BWJPB8OP.js","assets/HomeRituals-B06CFNLA.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-XwluZfmE.js","assets/ia-centre-1VmLP-MH.js","assets/ia-diagnostic-pur-qGnFEvys.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-tableau-pur-p6UvREJe.js","assets/identite-mDf0w8m4.js","assets/index.es-CTmLJSs7.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-D0Z4HPz4.js","assets/jspdf.es.min-CqpA8Jqn.js","assets/JustePrix-BvLh3GnL.js","assets/kkiapay-CurZK5NP.js","assets/kkiapay-widget-CVmsl9OE.js","assets/Laboratoire-BccY9mY6.js","assets/LaJournee-Bn_G0HCt.css","assets/LaJournee-CaoHFvdV.js","assets/le-caissier-pur-CNfv266m.js","assets/LesPaiements-C9cEZlne.css","assets/LesPaiements-DlgM4MSA.js","assets/LettresAuDossier-7v7df9Hv.js","assets/LienMndPay-wOJEYu4-.js","assets/Marketing-BL-08xtq.js","assets/MarketingBranche-BpX7zS-L.js","assets/Marque-C3twcfHs.js","assets/MesPourboires-BGBegMs_.js","assets/MesPourboires-CENjelyb.css","assets/MesTaches-Cc4XUDf6.css","assets/MesTaches-DVF27UIn.js","assets/momo-C2ZVfV9J.js","assets/MonMois-CgHB9nJu.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/MtnMoMo-BUDyfreq.js","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/objectifs-DM-JND3C.js","assets/opale-Q8Zg5E3k.js","assets/oreille-B1AMUmZh.js","assets/paie-du-5-BcI6sj1q.js","assets/paie-du-5-DeJq-K_U.css","assets/paie-du-5-pur-CPiCK8fv.js","assets/paie-par-mtn-Cnh9zYG4.js","assets/PaieParMtn-HsnFn0qY.js","assets/paliers-gYFFXRki.js","assets/Parametres-fXXAggcA.js","assets/parcours-B8EYDoke.js","assets/Parrainages-BLZ9pv3P.js","assets/Parrainages-gAHAPB_6.css","assets/PassageAvantLeFauteuil-B-dmauVQ.js","assets/pdf-DQsHR7gO.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/periode-des-pourboires-pur-BUWqfwov.js","assets/Personas-M1vNP6lV.js","assets/Personnel-zg8fZvaG.js","assets/photo-5T2JUvZz.js","assets/pilotage-D8kf1Co8.css","assets/porte-de-l-equipe-xdJeX3nA.js","assets/Pourboires-Dv4k5Uy9.js","assets/Predictions-Do-qgXVo.js","assets/preload-helper-BRe_O-Rg.js","assets/Prestataires-aXIDCNqn.js","assets/Prets-JCkJlzh2.js","assets/PrevisionDuMois-DlFTw3OX.css","assets/PrevisionDuMois-_UIFh8rZ.js","assets/Previsions-9BU2Vg1T.css","assets/Previsions-IcXOdX-h.js","assets/previsions-pur-BAui_z1W.js","assets/processus-pur-R6U5QcCi.js","assets/projets-BUKrohJh.js","assets/Projets-COO7WDEE.css","assets/Projets-HKg3ButH.js","assets/projets-pur-2ZEMRNDU.js","assets/protocoles-BRvjtS4s.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-Du6pQNnu.js","assets/quiz-5qMPWZVi.js","assets/Rapport-CBsEaN3m.js","assets/Recommandations-DOikW-Ka.js","assets/regler-DHR_B1Dm.css","assets/regler-GXKUvp5u.js","assets/regler-par-fedapay-pur-G8CEJdGn.js","assets/relances-pur-BacTXlI2.js","assets/releve-des-avis-B6_1nnqA.js","assets/SalonFoyer-B74CcRcr.js","assets/secretariat-admin-BLkYZVvZ.js","assets/Secretariat-CkTn4CIQ.js","assets/Secretariat-Cy79Zw30.css","assets/Signatures-aRT8T1qa.js","assets/SignerUnPdf-B4jUeS1z.js","assets/Synthese-BPNliYOZ.js","assets/SyntheseGraphes-Ck3Ao6Qh.js","assets/systeme-TPy-pF7j.css","assets/Tableau-CH4xOvZ0.js","assets/temps-BtKDnOtO.js","assets/Textes-CacWG4oX.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-CkDzpGy0.css","assets/tiroirs-QgJju4NS.js","assets/trone-DAE24Hma.js","assets/trone-Dsdrwhxz.css","assets/useAudiences-C5J18DOn.js","assets/useClotureDuJour-CeuqAtpe.js","assets/visios-JH2C8sSk.js","assets/Vitrine-BWilTqQJ.css","assets/Vitrine-rPmIv4hV.js","assets/_admin-D9Rz8E99.js","assets/_contrat-DnBoOnjO.js","assets/_reuni-Ce6jlwXZ.js","assets/_shared-CH_LlmCZ.js","assets/_signature-Bdb9Uuu2.js","assets/_ui-bok4G3cD.js","assets/_ui-BrUDlmuM.css"];
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
