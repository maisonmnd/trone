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
const BUILD = "20261120211914";
const A_GARDER = ["./","assets/abonnements-DA0vgEJX.js","assets/Abonnements-DTY7p2DH.css","assets/Abonnements-DxO7byqH.js","assets/Academie-8Q5rY_ZE.js","assets/Acces-BpT3Hpgo.js","assets/afaire-0FOLuFYk.js","assets/AFaire-CsGCqRLc.js","assets/agents-donnees-ByRQa5uu.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Agents-pxlM9OBv.js","assets/Analytics-CAxFlvme.js","assets/App-BeabR4cZ.js","assets/Appels-Bo7XLl_F.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/Assistants-BKRD5ThH.js","assets/Assistants-D9i2Xwmg.css","assets/AtelierDesContenus-D3-p6F2A.css","assets/AtelierDesContenus-DdhGjchY.js","assets/Audience-XwJdPHhZ.js","assets/Aujourdhui-2EP7BsuF.js","assets/auth-Ckpi5WIo.js","assets/avant-le-fauteuil-lecture-trKLT2LR.js","assets/AvantLeFauteuil-CsLTNb8Q.js","assets/avis-fiches-BzzLwwOA.js","assets/AvisGoogle-DaPXfwX9.css","assets/AvisGoogle-Nv0CNKFf.js","assets/BadgeEssai-CMeWc4sK.js","assets/BadgeSuggere-T3m2-j1d.js","assets/besoins-tDTeHcXd.js","assets/BesoinsEtRegles-BLwxGVV5.css","assets/BesoinsEtRegles-BpSZDGXr.js","assets/bilan-B-bfPYR0.css","assets/bilan-C6p17Q_3.js","assets/BilanMensuel-qKiX79f-.js","assets/Branches-CLUqsZDz.js","assets/bridges-tgf-d0sP.js","assets/Caisse-BsGcUE8j.js","assets/caisse-du-soir-C6vPx-E_.css","assets/caisse-du-soir-CpmYoDAp.js","assets/Caisses-cFfxwZ8L.js","assets/Calendrier-DCq_XWlM.js","assets/campagnes-pur-Bh4Qhgd6.js","assets/Carnet-CirAsjVt.js","assets/carte-DKo6wkTe.js","assets/carte-_W_-xBPj.css","assets/CarteModal-5B5pO2PQ.js","assets/CartesCadeaux-CZ8-B0a4.js","assets/Catalogue-BRKFeRMk.js","assets/CentreDeCommande-CfLfJNJp.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-CbU4jAiX.js","assets/certificat-CsUpmB24.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-4Y2b3OMF.js","assets/chiffre-du-jour-pur-yzeMXHBP.js","assets/ChiffreDesPrestations-C3j1E8Kc.js","assets/Classement-CmpbQZDu.css","assets/Classement-D4mM_df8.js","assets/classement-pur-CQOYU06l.js","assets/client-GWyhPdSW.js","assets/cloture-du-jour-CbNaKIhs.js","assets/ClotureDuTiroir-i4REvyE_.js","assets/Coffre-BmYFc-Qx.js","assets/collecte-mtn-pur-Bq3uWgWT.js","assets/components-_leRaWod.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-D2IzS68x.js","assets/Comptes-BM7N7iYl.js","assets/consultation-BHEw4rVh.js","assets/consultation-CRW6QcWf.css","assets/Consultations-7m6WS66n.js","assets/Consultations-DiE-2_mG.css","assets/consultNotes-B1A25E9B.js","assets/Conversations-BJEbU3aL.js","assets/Conversations-D4WwB5Zo.css","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-T-5J3YbY.js","assets/currency-Cd0clE4P.js","assets/Customers-Dz8NaCNL.js","assets/Dashboard-B2x7VsE_.css","assets/Dashboard-Bz4NrNiQ.js","assets/dates-C24gF6E0.js","assets/Demandes-CcswIQT2.js","assets/DepenseEnUnePhrase-BIGRlGqP.css","assets/DepenseEnUnePhrase-DicmReNg.js","assets/depenses-saisie-C0_MTgr9.js","assets/Depenses-sURo18Uu.js","assets/devis-remis-CwgpgNAm.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-B-3r-U9L.js","assets/diagnostics-au-trone-KJ2RINuX.js","assets/Dictee-BfJOATbY.js","assets/Dictee-C-pUYYFA.css","assets/dictee-pur-CMuSTxSj.js","assets/Discussions-Tw13wEEn.js","assets/echappe-html-pur-gEhHOM07.js","assets/EditeurDesOffres-ld4jZADK.js","assets/Encaissements-BfyrM5nc.js","assets/enfants-BdnCU0_T.js","assets/Engagements-BHWF2ROA.js","assets/Engagements-Cj5S9MhG.css","assets/engagements-coffre-CRwVvHY1.js","assets/EntreDeuxSeances-D74lDDnz.js","assets/es-CP8Bibb3.js","assets/Evaluation-CUgCVVKt.js","assets/facture-Dyt5Ozsy.js","assets/Factures-Cy5EWFsu.js","assets/FenetreDeLAgent-BkZphSl6.js","assets/FenetreDesCivilites-DhYcqvRW.js","assets/FenetreDesCivilites-zfNk1aak.css","assets/FenetreDuPoint-BeJ8UQbZ.js","assets/Fil-5-R48sDL.js","assets/finances-C8x7Mn4-.css","assets/fon-DAQvJRhs.js","assets/fournisseurs-CdUg9pLd.js","assets/Fournisseurs-D4A8gqnT.js","assets/foyer-CpgbMVCb.js","assets/Gerard-2nFDe3uB.js","assets/gerard-donnees-BSwrmjfa.js","assets/Gerard-vo2IWvP3.css","assets/gestes-conversation-D3D_x8UN.js","assets/heures-des-rappels-pur-BWJPB8OP.js","assets/HomeRituals-CK172lFe.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-CLKssTRf.js","assets/ia-centre-DrM9rHeD.js","assets/ia-diagnostic-pur-qGnFEvys.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-tableau-pur-p6UvREJe.js","assets/identite-B_iWIZ7i.js","assets/index.es-DIrAcdmv.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-CBmA0G4b.js","assets/jspdf.es.min-CP0qkUbR.js","assets/JustePrix-DN2PaHo_.js","assets/kkiapay-ChjGVGHT.js","assets/kkiapay-widget-CVmsl9OE.js","assets/Laboratoire-DNhbKx0U.js","assets/LaJournee-6feoLYOZ.js","assets/LaJournee-Bn_G0HCt.css","assets/le-caissier-pur-Bo8Ms5u4.js","assets/LesPaiements-BmjSW3jM.js","assets/LesPaiements-C9cEZlne.css","assets/LettresAuDossier-lQSnwsdQ.js","assets/LienMndPay-BsI7eiai.js","assets/Marketing-DvvJBGYO.js","assets/MarketingBranche-CAKpkatP.js","assets/Marque-n7BeKpMM.js","assets/MesPourboires-CENjelyb.css","assets/MesPourboires-DBVU6Suq.js","assets/MesTaches-Cc4XUDf6.css","assets/MesTaches-D9YPWSDi.js","assets/momo-C2ZVfV9J.js","assets/MonMois-BWcDp-oH.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/MtnMoMo-Cvbsr6mH.js","assets/objectifs-B7vxahvZ.js","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/opale-C4W9OUqn.js","assets/oreille-B1AMUmZh.js","assets/paie-du-5-DeJq-K_U.css","assets/paie-du-5-pur-CPiCK8fv.js","assets/paie-du-5-TFkOGAHp.js","assets/paie-par-mtn-cfD7AeWc.js","assets/PaieParMtn-NqSIWpEP.js","assets/paliers-C2QR7npU.js","assets/Parametres-DUkOy2Uz.js","assets/parcours-37k70z7G.js","assets/Parrainages-DRBMRvR9.js","assets/Parrainages-gAHAPB_6.css","assets/PassageAvantLeFauteuil-Bp8-VjOL.js","assets/pdf-BA4WCTeU.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/periode-des-pourboires-pur-BUWqfwov.js","assets/Personas-CCQ-pRp1.js","assets/Personnel-CgBtXsPx.js","assets/photo-B4nEuh51.js","assets/pilotage-D8kf1Co8.css","assets/porte-de-l-equipe-D1D5982C.js","assets/Pourboires-MmWobqSp.js","assets/Predictions-kLRFdg93.js","assets/preload-helper-BRe_O-Rg.js","assets/Prestataires-CP04D80e.js","assets/Prets-nMvGJAXi.js","assets/PrevisionDuMois-DlFTw3OX.css","assets/PrevisionDuMois-K1D46Stf.js","assets/Previsions-9BU2Vg1T.css","assets/Previsions-DiwnOpga.js","assets/previsions-pur-BGjGyFut.js","assets/processus-pur-R6U5QcCi.js","assets/projets-Aq-x-mpP.js","assets/Projets-CfYiMVBV.js","assets/Projets-COO7WDEE.css","assets/projets-pur-2ZEMRNDU.js","assets/protocoles-CfK70TVh.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-Bv3fnDMt.js","assets/quiz-5qMPWZVi.js","assets/Rapport-z9C0DteU.js","assets/Recommandations-DQ7nez9R.js","assets/regler-DHR_B1Dm.css","assets/regler-DOJTEvFa.js","assets/regler-par-fedapay-pur-G8CEJdGn.js","assets/relances-pur-BacTXlI2.js","assets/releve-des-avis-DU4GwouA.js","assets/SalonFoyer-2uvdjGyv.js","assets/secretariat-admin-CM7CqJr7.js","assets/Secretariat-Cy79Zw30.css","assets/Secretariat-PCXz9ltu.js","assets/Signatures-BE0YltO6.js","assets/SignerUnPdf-f1AnITKp.js","assets/Synthese-BWFVLPzc.js","assets/SyntheseGraphes-B--NBtyi.js","assets/systeme-TPy-pF7j.css","assets/Tableau-Cs3SzC5q.js","assets/temps-IMn0Pmij.js","assets/Textes-B4ps6bIN.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-BQZyEg5B.js","assets/tiroirs-CkDzpGy0.css","assets/trone-DjMF03Ai.css","assets/trone-DtZgGKos.js","assets/useAudiences-DjX0iATT.js","assets/useClotureDuJour-BEVEkOb_.js","assets/visios-040v8MnU.js","assets/Vitrine-BNplHn2a.js","assets/Vitrine-BWilTqQJ.css","assets/_admin-CiMpe5Jg.js","assets/_contrat-BNf8GZkJ.js","assets/_reuni-CkRYSkUj.js","assets/_shared-CVeikC5x.js","assets/_signature-BkEbSdec.js","assets/_ui-BQ__gPI0.js","assets/_ui-BrUDlmuM.css"];
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
