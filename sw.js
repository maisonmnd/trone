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
const BUILD = "20261123003818";
const A_GARDER = ["./","assets/abonnements-CgxTP22L.js","assets/Abonnements-DTY7p2DH.css","assets/Abonnements-ktsyRi8e.js","assets/Academie-Cor8elqF.js","assets/Acces-mFb5r4CG.js","assets/afaire-BlcB9hKu.js","assets/AFaire-DAduf8bM.js","assets/Agents-Bts6d8Zb.js","assets/agents-donnees-BM2uPXnN.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-C_8bqvjn.js","assets/App-DtfHJqGB.js","assets/Appels-BkuEFibM.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/Assistants-D9i2Xwmg.css","assets/Assistants-DE3gPF1p.js","assets/AtelierDesContenus-BUQ7qQ-X.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/Audience-B2VUFDTB.js","assets/Aujourdhui-Gm-aPilp.js","assets/auth-G3KVXGTY.js","assets/avant-le-fauteuil-lecture-D0uykdjX.js","assets/AvantLeFauteuil-BciAkLx-.js","assets/avis-fiches-96ByZRQq.js","assets/avis-google-pont-_j4_VeIb.js","assets/AvisGoogle-BCiBiQhu.js","assets/AvisGoogle-DaPXfwX9.css","assets/BadgeEssai-D4KYQZ08.js","assets/BadgeSuggere-Dvy20poz.js","assets/besoins-BSOLqX0m.js","assets/BesoinsEtRegles-BLwxGVV5.css","assets/BesoinsEtRegles-f8UNQmjg.js","assets/bilan-B-bfPYR0.css","assets/bilan-DJiRow8k.js","assets/BilanMensuel-f1py6FII.js","assets/Branches-yQbjzxwJ.js","assets/bridges-BiWE06Nx.js","assets/Caisse-DnP_GkoG.js","assets/caisse-du-soir-bVZj4SUP.js","assets/caisse-du-soir-C6vPx-E_.css","assets/caisse-fluide-pur-CFBu8Qho.js","assets/Caisses-rUgIJAcR.js","assets/Calendrier--BIx4Roa.js","assets/campagnes-pur-BD9wz-Cv.js","assets/Carnet-BfA5xG6P.js","assets/carte-8p6SRt4V.js","assets/carte-_W_-xBPj.css","assets/CarteModal-De3mlmOo.js","assets/CartesCadeaux-ChgnLjJ-.js","assets/Catalogue-bc_FRYnZ.js","assets/CentreDeCommande-C8-6cSR2.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-DznVpMKX.js","assets/certificat-vzSgP3ft.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-wLJkpZFF.js","assets/chiffre-du-jour-pur-8Axx2LCl.js","assets/ChiffreDesPrestations-LXothZGy.js","assets/Classement-BpZ7ktRW.js","assets/Classement-CmpbQZDu.css","assets/classement-DM37g6k8.js","assets/classement-pur-CQOYU06l.js","assets/client-B5Xe1CNw.js","assets/cloture-du-jour-D6xuUuw-.js","assets/ClotureDuTiroir-DwFGTh7M.js","assets/Coffre-DfDOKOFR.js","assets/collecte-mtn-pur-D8wosmEq.js","assets/components-BqFRQgil.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-DChqPMFF.js","assets/Comptes-DypOqaj9.js","assets/consultation-CRW6QcWf.css","assets/consultation-CtXqOxnf.js","assets/Consultations-DEGbxxdB.js","assets/Consultations-DiE-2_mG.css","assets/consultNotes-C6MxOGvK.js","assets/contexte-de-la-reponse-DBP-ltLa.js","assets/Conversations-D4WwB5Zo.css","assets/Conversations-DMgiBrhN.js","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-DhWW6Bn1.js","assets/currency-Cd0clE4P.js","assets/Customers-DBhArCl-.js","assets/Dashboard-B2x7VsE_.css","assets/Dashboard-uj9Wnv7l.js","assets/dates-CsfRLn7a.js","assets/DemanderAPerle-BD5NgCRN.css","assets/DemanderAPerle-CKiqtugK.js","assets/Demandes-Dj_ZecPs.js","assets/DepenseEnUnePhrase-BIGRlGqP.css","assets/DepenseEnUnePhrase-DB375ENj.js","assets/Depenses-C5E4qI9n.js","assets/depenses-saisie-D0MGcm_S.js","assets/devis-BscPYl7C.css","assets/devis-DbyWDNkK.js","assets/devis-remis-vfatET-u.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-D6DMaJJw.js","assets/diagnostics-au-trone-BAeKswNq.js","assets/Dictee-C-pUYYFA.css","assets/Dictee-C1gJyfL7.js","assets/dictee-pur-D7Sh8wgM.js","assets/Discussions-D9XPMNHp.js","assets/dist-9vv0te18.js","assets/echappe-html-pur-gEhHOM07.js","assets/EditeurDesOffres-om1-pASM.js","assets/Encaissements-BzuKkDAk.js","assets/enfants-Cwk6GvhO.js","assets/Engagements-Cj5S9MhG.css","assets/engagements-coffre-BvM-Wa7l.js","assets/Engagements-CWdEWNDq.js","assets/EntreDeuxSeances-CcB8lAGg.js","assets/es-BM9EbEZw.js","assets/etoiles-pur-CgRPMSHm.js","assets/Evaluation-BfPT22pG.js","assets/facture-CqjLDQLi.js","assets/Factures-DXKcZzaB.js","assets/FenetreDeLAgent-0nJMUqwW.js","assets/FenetreDesCivilites-DYywDtjE.js","assets/FenetreDesCivilites-zfNk1aak.css","assets/FenetreDuPoint-BZwiCVKq.js","assets/Fil-pR4BLWzP.js","assets/finances-C8x7Mn4-.css","assets/fon-Bqb8v3Iu.js","assets/fournisseurs-DEXSA855.js","assets/Fournisseurs-KbAn3Xcr.js","assets/foyer-Bi_xMjiC.js","assets/Gerard-DFCLZQ4S.js","assets/gerard-donnees-DPsBh3mq.js","assets/Gerard-lGKehvgG.css","assets/gestes-conversation-INpzZDKt.js","assets/heures-des-rappels-pur-BWJPB8OP.js","assets/HomeRituals-CqWhgtM_.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-DcmLkY43.js","assets/ia-centre-DNnhDSnl.js","assets/ia-diagnostic-pur-qGnFEvys.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-tableau-pur-p6UvREJe.js","assets/identite-lQKhZiWW.js","assets/index.es-EsJI67JO.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-DRHCscIQ.js","assets/jspdf.es.min-CaHUam2l.js","assets/JustePrix-B_sQTlGG.js","assets/kkiapay-B6MXjsPg.js","assets/kkiapay-widget-CVmsl9OE.js","assets/Laboratoire-CVXdJcdl.js","assets/LaJournee-Bn_G0HCt.css","assets/LaJournee-CPvQs0Tz.js","assets/le-caissier-pur-CyJuyMOH.js","assets/le-sceau-pur-ZsXKMtuY.js","assets/LePoint-C6H27BKO.js","assets/LePoint-CBjCCMQ5.css","assets/LesPaiements-C9cEZlne.css","assets/LesPaiements-LZWvY5CW.js","assets/LettresAuDossier-CzBhXPYw.js","assets/LienMndPay-plAEh705.js","assets/Marketing-CaXyGzt3.js","assets/MarketingBranche-B1j_jT-7.js","assets/Marque-RVsS_xcX.js","assets/MesPourboires-Bgz-VdAb.js","assets/MesPourboires-CENjelyb.css","assets/MesTaches-Cc4XUDf6.css","assets/MesTaches-mypaK513.js","assets/momo-C2ZVfV9J.js","assets/MonMois-BkQlhqjt.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/MtnMoMo-6HjzU8l4.js","assets/objectifs-Bk_4aPK_.js","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/opale-GBvgVyHl.js","assets/oreille-B1AMUmZh.js","assets/paie-du-5-Bu5NigBZ.js","assets/paie-du-5-DeJq-K_U.css","assets/paie-du-5-pur-CPiCK8fv.js","assets/paie-par-mtn-3yrEnyfH.js","assets/PaieParMtn-D-3bYRbC.js","assets/paliers-DTfE-DE6.js","assets/Parametres-BV0qSDtG.js","assets/parcours-2UHyFAWT.js","assets/Parrainages-BVLmjKze.js","assets/Parrainages-gAHAPB_6.css","assets/PassageAvantLeFauteuil-9rwCFZOc.js","assets/pdf-G4CaDt8B.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/periode-des-pourboires-pur-BUWqfwov.js","assets/Personas-B3yQFa1-.js","assets/Personnel-DU6bnJZT.js","assets/photo-DDEceOFX.js","assets/pilotage-D8kf1Co8.css","assets/porte-de-l-equipe-BS61kYhg.js","assets/Pourboires-aojNpmn9.js","assets/Predictions-BMBA8Y9G.js","assets/preload-helper-BRe_O-Rg.js","assets/Prestataires-C35qk6yo.js","assets/Prets-NYVJbjIB.js","assets/PrevisionDuMois-5AUmKdgV.js","assets/PrevisionDuMois-DlFTw3OX.css","assets/Previsions-9BU2Vg1T.css","assets/Previsions-BjjuFPxQ.js","assets/previsions-pur-BhS-vcim.js","assets/processus-pur-R6U5QcCi.js","assets/Projets-COO7WDEE.css","assets/projets-ITXLNj88.js","assets/Projets-oy3ysrWB.js","assets/projets-pur-2ZEMRNDU.js","assets/protocoles-CeyJpRrC.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-Buxhv9KU.js","assets/quiz-5qMPWZVi.js","assets/Rapport-BJ-Grt7G.js","assets/Recommandations-PXtrE90_.js","assets/regler-D1gFEaVz.css","assets/regler-DHaHSzmu.js","assets/regler-par-fedapay-pur-CihkLMl4.js","assets/relances-pur-C9iUwl2e.js","assets/releve-des-avis-CHL0QY-P.js","assets/SalonFoyer-Cs4eY9Nu.js","assets/sceau-Cm-bPnkp.js","assets/Secretariat-ACwfIEhn.js","assets/secretariat-admin-DWuKu8AT.js","assets/Secretariat-Cy79Zw30.css","assets/Signatures-BZCvVUir.js","assets/SignerUnPdf-D7ofcSq8.js","assets/Synthese-QafhhQwy.js","assets/SyntheseGraphes-BjyEOuif.js","assets/systeme-TPy-pF7j.css","assets/Tableau-DMDZeeTw.js","assets/temps-CEUawX9r.js","assets/Textes-C8bMDa-W.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-C-xcmZVR.js","assets/tiroirs-CkDzpGy0.css","assets/trone-B-r6lpi2.css","assets/trone-DCNhgLu5.js","assets/useAudiences-Citap2fL.js","assets/useClotureDuJour-ByJMiMiW.js","assets/visios-BTG0soTR.js","assets/Vitrine-BVvjvLA0.js","assets/Vitrine-BWilTqQJ.css","assets/_admin-jjTiq2g8.js","assets/_contrat-kp_YyyWs.js","assets/_reuni-BDTzp6p9.js","assets/_shared-Ci6ZYw1V.js","assets/_signature-BiURY-dg.js","assets/_ui-BrUDlmuM.css","assets/_ui-Cadoa_vY.js"];
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
