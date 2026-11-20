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
const BUILD = "20261120210548";
const A_GARDER = ["./","assets/Abonnements-Cv5zcbsC.js","assets/abonnements-CYQ5PDOv.js","assets/Abonnements-DTY7p2DH.css","assets/Academie-ofiRYDGj.js","assets/Acces-Chf4uJcq.js","assets/AFaire-CKdDBn3c.js","assets/afaire-DxVkRvGF.js","assets/Agents-CD3bJd4n.js","assets/agents-donnees-CO8CoPE8.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-Bu9LU0Wh.js","assets/App-CLWO3eoA.js","assets/Appels-Dk74tZfk.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/Assistants-D9i2Xwmg.css","assets/Assistants-DH3Tx3O7.js","assets/AtelierDesContenus-CZ2BpnaM.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/Audience-BieGkAgd.js","assets/Aujourdhui-Dc0S8FBW.js","assets/auth-D_0-Jz1D.js","assets/avant-le-fauteuil-lecture-BOmKEUGZ.js","assets/AvantLeFauteuil-BnbP51pd.js","assets/avis-fiches-EDGTgSQc.js","assets/AvisGoogle-CdDHqQ3F.js","assets/AvisGoogle-DaPXfwX9.css","assets/BadgeEssai-D9HDuQ0W.js","assets/BadgeSuggere-CYnSV2IK.js","assets/besoins-DZMcq7Cg.js","assets/BesoinsEtRegles-BLwxGVV5.css","assets/BesoinsEtRegles-DPu0aQ9x.js","assets/bilan-B-bfPYR0.css","assets/bilan-N7LZCXq8.js","assets/BilanMensuel-CvlmFwtw.js","assets/Branches-Dp3XL6iR.js","assets/bridges-CEXV58OJ.js","assets/caisse-du-soir-C6vPx-E_.css","assets/caisse-du-soir-fvaaBvvb.js","assets/Caisse-DwcBjkNi.js","assets/Caisses-BrEHuXCB.js","assets/Calendrier-exCOq3Vp.js","assets/campagnes-pur-BITvvv_3.js","assets/Carnet-BRqUbMVO.js","assets/carte-iY487Aqc.js","assets/carte-_W_-xBPj.css","assets/CarteModal-qb3bAwkQ.js","assets/CartesCadeaux-BptyqcjJ.js","assets/Catalogue-C9XURAzq.js","assets/CentreDeCommande-C3FnPSuO.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-B6CN8dTc.js","assets/certificat-sNz_e3NO.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-xeysw8vh.js","assets/chiffre-du-jour-pur-CzOyJSLQ.js","assets/ChiffreDesPrestations-BWAwUu9m.js","assets/Classement-C-zX46oL.js","assets/Classement-CmpbQZDu.css","assets/classement-pur-CQOYU06l.js","assets/client-CsNCud4d.js","assets/cloture-du-jour-DUIKC-8m.js","assets/ClotureDuTiroir-Gk8KmWKa.js","assets/Coffre-Kt_dsnNP.js","assets/collecte-mtn-pur-Bq3uWgWT.js","assets/components-C4jk4rb7.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-CaB5bIJF.js","assets/Comptes-C23mOkke.js","assets/consultation-CNXijpso.js","assets/consultation-CRW6QcWf.css","assets/Consultations-3ygn93_5.js","assets/Consultations-DiE-2_mG.css","assets/consultNotes-BTpEOp5R.js","assets/Conversations-D4WwB5Zo.css","assets/Conversations-X9cwYd8q.js","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-Bc62y7EL.js","assets/currency-Cd0clE4P.js","assets/Customers-BYye_M91.js","assets/Dashboard-B2x7VsE_.css","assets/Dashboard-DzxL9JQ4.js","assets/dates-CLgRT-Bc.js","assets/Demandes-B24ZygZf.js","assets/DepenseEnUnePhrase-BIGRlGqP.css","assets/DepenseEnUnePhrase-CBCAwjUH.js","assets/Depenses-3RmNLjxz.js","assets/depenses-saisie-fMLW4K3f.js","assets/devis-remis-BuHr_DQk.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-BtdpHNuW.js","assets/diagnostics-au-trone-CLfA9yh5.js","assets/Dictee-BEV7OpFX.js","assets/Dictee-C-pUYYFA.css","assets/dictee-pur-BG9y0vQu.js","assets/Discussions-DztbDpKA.js","assets/echappe-html-pur-gEhHOM07.js","assets/EditeurDesOffres-BOzMAuKm.js","assets/Encaissements-CEwU52mv.js","assets/enfants-CaKObXH4.js","assets/Engagements-Cj5S9MhG.css","assets/engagements-coffre-C_f-5jkF.js","assets/Engagements-U3iFWT5t.js","assets/EntreDeuxSeances-Cwr5dfM5.js","assets/es-CTbDFyF5.js","assets/Evaluation-DS_KP5Cy.js","assets/facture-DmiHbgq9.js","assets/Factures-_TZSOBOJ.js","assets/FenetreDeLAgent-CbTsvzM3.js","assets/FenetreDesCivilites-mHlbvjoQ.js","assets/FenetreDesCivilites-zfNk1aak.css","assets/FenetreDuPoint-CqM8QjwV.js","assets/Fil-CUFm5dHL.js","assets/finances-C8x7Mn4-.css","assets/fon-DbtBrrjb.js","assets/Fournisseurs-2ow5UHkF.js","assets/fournisseurs-Czfs8l-p.js","assets/foyer-a529gezc.js","assets/Gerard-BtuivvCl.js","assets/gerard-donnees-C2MLXW8A.js","assets/Gerard-vo2IWvP3.css","assets/gestes-conversation-CYXXvnD4.js","assets/heures-des-rappels-pur-BWJPB8OP.js","assets/HomeRituals-CUEvOTh9.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-DZgpvwbc.js","assets/ia-centre-BBYwFJTO.js","assets/ia-diagnostic-pur-qGnFEvys.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-tableau-pur-p6UvREJe.js","assets/identite-DXcl-x0L.js","assets/index.es-C59wj448.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-BS3qPCX5.js","assets/jspdf.es.min-D0nlKAfI.js","assets/JustePrix-D1ZSxPbY.js","assets/kkiapay-Ca1krLk4.js","assets/kkiapay-widget-CVmsl9OE.js","assets/Laboratoire-DjQD1A2H.js","assets/LaJournee-BcHjtv4-.js","assets/LaJournee-Bn_G0HCt.css","assets/le-caissier-pur-9Y_92hHD.js","assets/LesPaiements-9FbR6zeC.js","assets/LesPaiements-C9cEZlne.css","assets/LettresAuDossier-DRhmqC4L.js","assets/LienMndPay-DCXvV4kI.js","assets/Marketing-C4hNLJq5.js","assets/MarketingBranche-Du5T2XsC.js","assets/Marque-Bs-TISTY.js","assets/MesPourboires-CENjelyb.css","assets/MesPourboires-DtTM1PXp.js","assets/MesTaches-B-GdF0fU.js","assets/MesTaches-Cc4XUDf6.css","assets/momo-C2ZVfV9J.js","assets/MonMois-C63D6Z7J.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/MtnMoMo-BbK5p7jU.js","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/objectifs-Dipbqbyc.js","assets/opale-vbS1cZzH.js","assets/oreille-B1AMUmZh.js","assets/paie-du-5-DeJq-K_U.css","assets/paie-du-5-pur-CPiCK8fv.js","assets/paie-du-5-VggjUuRR.js","assets/paie-par-mtn-CFOQwH35.js","assets/PaieParMtn-CzjgDwMM.js","assets/paliers-CecJSMsE.js","assets/Parametres-A1KNHKYF.js","assets/parcours-D664P0NQ.js","assets/Parrainages-CkprXrrw.js","assets/Parrainages-gAHAPB_6.css","assets/PassageAvantLeFauteuil-Dql8ycsq.js","assets/pdf-Ckvsqski.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/periode-des-pourboires-pur-BUWqfwov.js","assets/Personas-COkqZk27.js","assets/Personnel-CCmasEfc.js","assets/photo-eZAcF2VF.js","assets/pilotage-D8kf1Co8.css","assets/porte-de-l-equipe-BAgQaYiI.js","assets/Pourboires-C7dnHl3O.js","assets/Predictions-iQ9DORaV.js","assets/preload-helper-BRe_O-Rg.js","assets/Prestataires-BmAWvhTf.js","assets/Prets-De0A_tbT.js","assets/PrevisionDuMois-Cq7UlCk0.js","assets/PrevisionDuMois-DlFTw3OX.css","assets/Previsions-9BU2Vg1T.css","assets/Previsions-DyBx5KSg.js","assets/previsions-pur-Cnc6RRIS.js","assets/processus-pur-R6U5QcCi.js","assets/projets-bFFzYH5i.js","assets/Projets-COO7WDEE.css","assets/projets-pur-2ZEMRNDU.js","assets/Projets-xsT5_idf.js","assets/protocoles-_bFO0PQv.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-Cl3EMFyZ.js","assets/quiz-5qMPWZVi.js","assets/Rapport-dAMbf6Z3.js","assets/Recommandations-XdTNL4FA.js","assets/regler-B6vrxYNs.js","assets/regler-DHR_B1Dm.css","assets/regler-par-fedapay-pur-G8CEJdGn.js","assets/relances-pur-BacTXlI2.js","assets/releve-des-avis-I8yWGACM.js","assets/SalonFoyer-DwWXyNXj.js","assets/secretariat-admin-CY_yvSUS.js","assets/Secretariat-Cy79Zw30.css","assets/Secretariat-ysxXBn5K.js","assets/Signatures-B57muAwG.js","assets/SignerUnPdf-Cb2Lvd5d.js","assets/Synthese-Cb-LN8rR.js","assets/SyntheseGraphes-Bq6uFOH9.js","assets/systeme-TPy-pF7j.css","assets/Tableau-B9QJ079f.js","assets/temps-CzosZDaQ.js","assets/Textes-BR5Jkzes.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-CkDzpGy0.css","assets/tiroirs-DS-MS-dA.js","assets/trone-DjMF03Ai.css","assets/trone-Duh-EIJo.js","assets/useAudiences-RN-ptYUb.js","assets/useClotureDuJour-B6dFP53C.js","assets/visios-DrxOqSVg.js","assets/Vitrine-BiSXf2uQ.js","assets/Vitrine-BWilTqQJ.css","assets/_admin-Yero5VXd.js","assets/_contrat-SuJV2J2T.js","assets/_reuni-wNQjeY-w.js","assets/_shared-7OO6Vz_7.js","assets/_signature-BYWTMzjF.js","assets/_ui-BrUDlmuM.css","assets/_ui-DThB65fO.js"];
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
