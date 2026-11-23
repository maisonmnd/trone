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
const BUILD = "20261123052612";
const A_GARDER = ["./","assets/abonnements-BA0rs4KC.js","assets/Abonnements-CBRGP7gI.js","assets/Abonnements-DTY7p2DH.css","assets/Academie-Cz3vJrGo.js","assets/Acces-DtIjfNFt.js","assets/afaire-DVsR8m5i.js","assets/AFaire-nQQ7MJo5.js","assets/Agents-Bjk3yXZU.js","assets/agents-donnees-CA98w4Jn.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-cpbY7chK.js","assets/App-BuRpaYeM.js","assets/Appels-B3wppKkE.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/Assistants-13feAIbQ.js","assets/Assistants-D9i2Xwmg.css","assets/AtelierDesContenus-BIpEjVg3.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/Audience-BNpIiI3i.js","assets/Aujourdhui-ChsV7uKP.js","assets/auth-BWIVjAhI.js","assets/avant-le-fauteuil-lecture-DxHBrtVa.js","assets/AvantLeFauteuil-B9PvZkZH.js","assets/avis-fiches-BKMSKjuv.js","assets/avis-google-pont-Bub__uuY.js","assets/AvisGoogle-D16VyF62.js","assets/AvisGoogle-DaPXfwX9.css","assets/BadgeEssai-Dqv_Ie_U.js","assets/BadgeSuggere-_-XegsKA.js","assets/besoins-Ce6qhLN9.js","assets/BesoinsEtRegles-BLwxGVV5.css","assets/BesoinsEtRegles-CSvSNtIo.js","assets/bilan-B-bfPYR0.css","assets/bilan-DyhD_ccK.js","assets/BilanMensuel-C5V4hS3M.js","assets/Branches-BzyYOHsI.js","assets/bridges-DRZq-BI-.js","assets/Caisse-DtRxQZv0.js","assets/caisse-du-soir-C6vPx-E_.css","assets/caisse-du-soir-fMHKGEtb.js","assets/caisse-fluide-pur-D01zSW4y.js","assets/Caisses-D-f9xzkV.js","assets/Calendrier-MrkT8mmY.js","assets/campagnes-pur-B_nTK_PU.js","assets/Carnet-ELa4vSPN.js","assets/carte-Bbri9N4c.js","assets/carte-_W_-xBPj.css","assets/CarteModal-LZkpn1el.js","assets/CartesCadeaux-BA_ZV8zZ.js","assets/Catalogue-BrpniwU3.js","assets/CentreDeCommande-Du8kyJhp.css","assets/CentreDeCommande-j7SglyTS.js","assets/Cercle-UWdEWdlH.js","assets/certificat-MU8gnIJj.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-Bpt9HN9y.js","assets/chiffre-du-jour-pur-CD4n-q5n.js","assets/ChiffreDesPrestations-CRi2J00D.js","assets/Classement-BS1FWEHL.js","assets/Classement-CmpbQZDu.css","assets/classement-J4g133Po.js","assets/classement-pur-CQOYU06l.js","assets/client-zXqBbOS1.js","assets/cloture-du-jour-BAIPsT_x.js","assets/ClotureDuTiroir-NnrbD_P_.js","assets/Coffre-BAspyNum.js","assets/collecte-mtn-pur-C1DeVC_x.js","assets/components-CevF1BLz.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-bhH1iZeR.js","assets/Comptes-DYAuC1Z2.js","assets/consultation-BLFWcT7a.js","assets/consultation-CRW6QcWf.css","assets/Consultations-DiE-2_mG.css","assets/Consultations-DIj6SaU3.js","assets/consultNotes-t3e2EnXB.js","assets/contexte-de-la-reponse-DX_POEqY.js","assets/Conversations-CDa3EBtT.js","assets/Conversations-D4WwB5Zo.css","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-nSZvaAYy.js","assets/currency-Cd0clE4P.js","assets/Customers-DhE9-lNF.js","assets/Dashboard-BSOax1Fm.css","assets/Dashboard-CHkMlAOn.js","assets/dates-C717rsno.js","assets/DemanderAPerle-BD5NgCRN.css","assets/DemanderAPerle-CT-ZKWEK.js","assets/Demandes-DRB-fNj0.js","assets/DepenseEnUnePhrase-BIGRlGqP.css","assets/DepenseEnUnePhrase-BspBJL6U.js","assets/Depenses-B9z2nuQz.js","assets/depenses-saisie-Cxq6sYBX.js","assets/devis-BscPYl7C.css","assets/devis-C3XGpzH5.js","assets/devis-remis-DJJGIQly.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-CHXPc04_.js","assets/diagnostics-au-trone-DaQILLZ3.js","assets/Dictee-C-pUYYFA.css","assets/dictee-pur-Con_hyWK.js","assets/Dictee-_es0f-LT.js","assets/Discussions-DHmdjrZj.js","assets/dist-9vv0te18.js","assets/echappe-html-pur-gEhHOM07.js","assets/EditeurDesOffres-JqSHWEvv.js","assets/Encaissements-DcTP-_D3.js","assets/enfants-BSnjFFqw.js","assets/Engagements-Cj5S9MhG.css","assets/engagements-coffre-0t4pFKRs.js","assets/Engagements-DHdx5qpj.js","assets/EntreDeuxSeances-Ddbb4iB2.js","assets/es-C99TX0OF.js","assets/etoiles-pur-CgRPMSHm.js","assets/Evaluation-TXMisBlx.js","assets/facture-N1Ho6QzV.js","assets/Factures-M-S_otQO.js","assets/FenetreDeLAgent-krCScJTY.js","assets/FenetreDesCivilites-CzZMsQIJ.js","assets/FenetreDesCivilites-zfNk1aak.css","assets/FenetreDuPoint-7hNiu8tP.js","assets/Fil-CsQX1Dos.js","assets/finances-C8x7Mn4-.css","assets/fon-DtvURKxk.js","assets/fournisseurs-DQNK7em8.js","assets/Fournisseurs-DtzZ09sP.js","assets/foyer-Crz7Szja.js","assets/Gerard-0O0-FAm7.js","assets/gerard-donnees-D30sd6J1.js","assets/Gerard-lGKehvgG.css","assets/gestes-conversation-SwbBQVuR.js","assets/heures-des-rappels-pur-BWJPB8OP.js","assets/HomeRituals-BtN1PHD6.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-CeZxMvrY.js","assets/ia-centre-DzsFTFMx.js","assets/ia-diagnostic-pur-qGnFEvys.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-tableau-pur-p6UvREJe.js","assets/identite-B5S8mJT8.js","assets/index.es--cjbvotg.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-ksewH9XV.js","assets/jspdf.es.min-B0t_6JHe.js","assets/JustePrix-Bc_zCDmg.js","assets/kkiapay-CIGzbnP7.js","assets/kkiapay-widget-CVmsl9OE.js","assets/Laboratoire-DV0_M1Ea.js","assets/LaJournee-Bn_G0HCt.css","assets/LaJournee-C4rVTcqq.js","assets/le-caissier-pur-CNexpnaL.js","assets/le-sceau-pur-ZsXKMtuY.js","assets/LePoint-BmioJvoM.js","assets/LePoint-CBjCCMQ5.css","assets/LesPaiements-C9cEZlne.css","assets/LesPaiements-dAnk8XaG.js","assets/LettresAuDossier-CO0P-SUG.js","assets/LienMndPay-BoyLY4Ty.js","assets/Marketing-DhW1IFCl.js","assets/MarketingBranche-2UhlnPE3.js","assets/Marque-J6HLGDMF.js","assets/MesPourboires-CENjelyb.css","assets/MesPourboires-DEJqItvt.js","assets/MesTaches-C288w0qX.js","assets/MesTaches-Cc4XUDf6.css","assets/momo-C2ZVfV9J.js","assets/MonMois-Brs6K4j7.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/MtnMoMo-I6boRGtA.js","assets/objectifs-C6jbEQQq.js","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/opale-Ba2KTCS3.js","assets/oreille-B1AMUmZh.js","assets/paie-du-5-D1ARrAIm.js","assets/paie-du-5-DeJq-K_U.css","assets/paie-du-5-pur-CPiCK8fv.js","assets/paie-par-mtn-ln2A8lt6.js","assets/PaieParMtn-De9KN7uR.js","assets/paliers-Zf2DhCRG.js","assets/Parametres-BpEAoLdo.js","assets/parcours-DndX7Dfa.js","assets/Parrainages-Ab2HBu4A.js","assets/Parrainages-gAHAPB_6.css","assets/PassageAvantLeFauteuil-Blfct-3m.js","assets/pdf-DER8k0wM.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/periode-des-pourboires-pur-BUWqfwov.js","assets/Personas-DKkbOk2w.js","assets/Personnel-BKCiddhh.js","assets/photo-BWtBqzCv.js","assets/pilotage-D8kf1Co8.css","assets/porte-de-l-equipe-BnBvOsQ0.js","assets/Pourboires-Dah9PSHU.js","assets/Predictions-D9Dh9Kxn.js","assets/preload-helper-BRe_O-Rg.js","assets/Prestataires-D0w5N7Ht.js","assets/Prets-D0CTzXOb.js","assets/PrevisionDuMois-CxKi-NWK.js","assets/PrevisionDuMois-DlFTw3OX.css","assets/Previsions-9BU2Vg1T.css","assets/Previsions-Dh5MAo0T.js","assets/previsions-pur-COHxt83s.js","assets/processus-pur-R6U5QcCi.js","assets/projets-BXyUd5Sa.js","assets/Projets-COO7WDEE.css","assets/Projets-DLAh4Yiy.js","assets/projets-pur-2ZEMRNDU.js","assets/protocoles-D18YodIV.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-CJIhYqWE.js","assets/quiz-5qMPWZVi.js","assets/Rapport-BxWVVqXp.js","assets/Recommandations-B10OzqqL.js","assets/regler-BzOQ4n0G.js","assets/regler-D1gFEaVz.css","assets/regler-par-fedapay-pur-B5f9hJSb.js","assets/relances-pur-C9iUwl2e.js","assets/releve-des-avis-DeNQahNR.js","assets/SalonFoyer-Cnap3Aqc.js","assets/sceau-CTUcL0GS.js","assets/secretariat-admin-DV-bYRIt.js","assets/Secretariat-Cy79Zw30.css","assets/Secretariat-Di4e-PtC.js","assets/Signatures-r946g1zA.js","assets/SignerUnPdf-C49c-fiA.js","assets/Synthese-Bqm81frZ.js","assets/SyntheseGraphes-CkhZu2fc.js","assets/systeme-TPy-pF7j.css","assets/Tableau-NPbH9sWL.js","assets/temps-B76-w7vU.js","assets/Textes-3Tv51M9v.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-Cd3Fk-xo.js","assets/tiroirs-CkDzpGy0.css","assets/trone-B-r6lpi2.css","assets/trone-CjHIMbw3.js","assets/useAudiences-CGft1RDs.js","assets/useClotureDuJour-DEUOC9Hd.js","assets/visios-0rth_7FJ.js","assets/Vitrine-BWilTqQJ.css","assets/Vitrine-Cphw7yDN.js","assets/_admin-Dghjn2sp.js","assets/_contrat-D9dhnPds.js","assets/_reuni-BJuLMtE2.js","assets/_shared-BiWiJPl9.js","assets/_signature-iTECvQCJ.js","assets/_ui-BrUDlmuM.css","assets/_ui-_JIOcGBs.js"];
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
