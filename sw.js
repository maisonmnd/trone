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
const BUILD = "20261123060203";
const A_GARDER = ["./","assets/abonnements-BjNdClOP.js","assets/Abonnements-DTY7p2DH.css","assets/Abonnements-qS38XusS.js","assets/Academie-OqrExkGW.js","assets/Acces-B7wrKUKM.js","assets/afaire-C_UJBZJ4.js","assets/AFaire-XPV3ddaC.js","assets/Agents-adt601Hx.js","assets/agents-donnees-CW5o6lFv.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-XN2UPiSu.js","assets/App-eYXUwnvi.js","assets/Appels-P6vPWTZp.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/Assistants-BhS7DRzD.js","assets/Assistants-D9i2Xwmg.css","assets/AtelierDesContenus-D3-p6F2A.css","assets/AtelierDesContenus-I1BCtNve.js","assets/Audience-Dmlv0OIs.js","assets/Aujourdhui-DE3h8TjL.js","assets/auth-CoEOxX6a.js","assets/avant-le-fauteuil-lecture-CCwiJL87.js","assets/AvantLeFauteuil-81M5PQ2F.js","assets/avis-fiches-SW36Xmjo.js","assets/avis-google-pont-B63DmpCD.js","assets/AvisGoogle-CEhO0eJ2.js","assets/AvisGoogle-DaPXfwX9.css","assets/BadgeEssai-D24zi1fL.js","assets/BadgeSuggere-pj-X1N31.js","assets/besoins-DIE-pU2h.js","assets/BesoinsEtRegles-BLwxGVV5.css","assets/BesoinsEtRegles-BtuiUZnl.js","assets/bilan-B-bfPYR0.css","assets/bilan-Bvfkz3rV.js","assets/BilanMensuel-DaoDK8Fk.js","assets/Branches-CA-kVfPs.js","assets/bridges-zA90gihs.js","assets/Caisse-CqOPR7p5.js","assets/caisse-du-soir-B01LVYz8.js","assets/caisse-du-soir-C6vPx-E_.css","assets/caisse-fluide-pur-DlCtXqBG.js","assets/Caisses-BK4SSRAI.js","assets/Calendrier-BYrLp6FE.js","assets/campagnes-pur-DItDy1_M.js","assets/Carnet-DSZA4lmA.js","assets/carte-CRs70G0p.js","assets/carte-_W_-xBPj.css","assets/CarteModal-BnqOXtAL.js","assets/CartesCadeaux-5Hgf5Pu7.js","assets/Catalogue-DtDzwJEu.js","assets/CentreDeCommande-BpLjr7Ng.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-BzhU695y.js","assets/certificat-BD7Lz5do.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-bkuVuHvQ.js","assets/chiffre-du-jour-pur-C7RSRA17.js","assets/ChiffreDesPrestations-CCeUM2qH.js","assets/classement-BwaKJAtq.js","assets/Classement-CmpbQZDu.css","assets/Classement-DlDcRU7u.js","assets/classement-pur-CQOYU06l.js","assets/client-CZExJ045.js","assets/cloture-du-jour-DGnx3e3c.js","assets/ClotureDuTiroir-DPAZVcB3.js","assets/Coffre-CYigpVSR.js","assets/components-COSFhvWb.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-B98xDz8L.js","assets/Comptes-BHDfhJro.js","assets/consultation-CfJpPzVy.js","assets/consultation-CRW6QcWf.css","assets/Consultations-CY6xqfE1.js","assets/Consultations-DiE-2_mG.css","assets/consultNotes-BtyGlyx-.js","assets/contexte-de-la-reponse-AqaEWrYu.js","assets/Conversations-D4WwB5Zo.css","assets/Conversations-dXW35Kvv.js","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-C-bUW6HY.js","assets/currency-Cd0clE4P.js","assets/Customers-MFsGLkIN.js","assets/Dashboard-BSOax1Fm.css","assets/Dashboard-BYkjWOl3.js","assets/dates-DvvTlv_5.js","assets/DemanderAPerle-BD5NgCRN.css","assets/DemanderAPerle-BOAbZzdy.js","assets/Demandes-1Kk62Z7p.js","assets/DepenseEnUnePhrase-BIGRlGqP.css","assets/DepenseEnUnePhrase-dk2xaEf0.js","assets/Depenses-CP-rcvnN.js","assets/depenses-saisie-CXgsU7vC.js","assets/devis-BguwEDod.js","assets/devis-CdIRAvZk.css","assets/devis-remis-oZSm0CkZ.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-CVEHAWki.js","assets/diagnostics-au-trone-2YmdQncj.js","assets/Dictee-BnfpqE_v.js","assets/Dictee-C-pUYYFA.css","assets/dictee-pur-MZwzxtjq.js","assets/Discussions-BxUVzp7q.js","assets/dist-9vv0te18.js","assets/echappe-html-pur-gEhHOM07.js","assets/EditeurDesOffres-BdwGzQNA.js","assets/Encaissements-DvchXwsH.js","assets/enfants-BdVlZZLq.js","assets/Engagements-Cj5S9MhG.css","assets/engagements-coffre-C6_VMtnA.js","assets/Engagements-DauM35cl.js","assets/EntreDeuxSeances-B08dHh-T.js","assets/es-gpx1tp4d.js","assets/etoiles-pur-CgRPMSHm.js","assets/Evaluation-CuFgtX_0.js","assets/facture-CUdH01rg.js","assets/Factures-cbtzlkqA.js","assets/FenetreDeLAgent-Bl9kTp5g.js","assets/FenetreDesCivilites--7xMOEMq.js","assets/FenetreDesCivilites-zfNk1aak.css","assets/FenetreDuPoint-DU3hMLFZ.js","assets/Fil-Dn1OmuOP.js","assets/finances-C8x7Mn4-.css","assets/fon-B1GvWj5t.js","assets/fournisseurs-Byy89EF7.js","assets/Fournisseurs-CZ_RiqFV.js","assets/foyer-DCfLKT3u.js","assets/Gerard-BzZKy-d5.js","assets/gerard-donnees-CXBK8tDO.js","assets/Gerard-lGKehvgG.css","assets/gestes-conversation-B1lt5EiL.js","assets/heures-des-rappels-pur-BWJPB8OP.js","assets/HomeRituals-C6dNtPMX.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-rn9f40g7.js","assets/ia-centre-Bn0ZzEZR.js","assets/ia-diagnostic-pur-qGnFEvys.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-tableau-pur-p6UvREJe.js","assets/identite-DsgYJwFb.js","assets/index.es-C8f5GOEV.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-CSxA4RB4.js","assets/jspdf.es.min-CzKiTViO.js","assets/JustePrix-C20yLxE7.js","assets/kkiapay-imAleTFa.js","assets/kkiapay-widget-CaHBoBVm.js","assets/Laboratoire-arB0Hwgd.js","assets/LaJournee-Bn_G0HCt.css","assets/LaJournee-CiYQA7L0.js","assets/le-caissier-pur-DfPfKhW0.js","assets/le-sceau-pur-ZsXKMtuY.js","assets/LePoint-BPvyl1-q.js","assets/LePoint-CBjCCMQ5.css","assets/LesPaiements-B3FWMve_.js","assets/LesPaiements-C9cEZlne.css","assets/LettresAuDossier-C6JQYDnH.js","assets/LienMndPay-CL-FNM_l.js","assets/Marketing-DSxHMtlb.js","assets/MarketingBranche-DiQzEGRf.js","assets/Marque-BSgSbUGB.js","assets/MesPourboires-CENjelyb.css","assets/MesPourboires-Pwlv-B-8.js","assets/MesTaches-Cc4XUDf6.css","assets/MesTaches-DM30DCDc.js","assets/mnd-pay-pur-CfS2mkAo.js","assets/momo-C2ZVfV9J.js","assets/MonMois-boT-iDk5.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/MtnMoMo-BbhrcDCz.js","assets/objectifs-Cw3r8BMw.js","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/opale-CDaiLdIV.js","assets/oreille-B1AMUmZh.js","assets/paie-du-5-BhgIWsBs.js","assets/paie-du-5-DeJq-K_U.css","assets/paie-du-5-pur-CPiCK8fv.js","assets/paie-par-mtn-XBy9sXpO.js","assets/PaieParMtn-B1lgS6WP.js","assets/paliers-G0o_R7CJ.js","assets/Parametres-B-BlNmiG.js","assets/parcours-OUcFLOo4.js","assets/Parrainages-gAHAPB_6.css","assets/Parrainages-Q401kmqE.js","assets/PassageAvantLeFauteuil-B30QDhRv.js","assets/pdf-rAC5guRx.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/periode-des-pourboires-pur-BUWqfwov.js","assets/Personas-BGte1F_V.js","assets/Personnel-DsFA8489.js","assets/photo-Dhitgdsp.js","assets/pilotage-D8kf1Co8.css","assets/porte-de-l-equipe-BXb8AsCG.js","assets/Pourboires-D_2LBmyf.js","assets/Predictions-CRYd4VN6.js","assets/preload-helper-BRe_O-Rg.js","assets/Prestataires-CVVCh24h.js","assets/Prets-B_XJr8En.js","assets/PrevisionDuMois-CPX_niL-.js","assets/PrevisionDuMois-DlFTw3OX.css","assets/Previsions-9BU2Vg1T.css","assets/Previsions-J_aEF8Hb.js","assets/previsions-pur-CBrVoSSt.js","assets/processus-pur-R6U5QcCi.js","assets/Projets-BQyLPdnb.js","assets/Projets-COO7WDEE.css","assets/projets-DSuZJz-S.js","assets/projets-pur-2ZEMRNDU.js","assets/protocoles-Byx8GWLc.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-DI3v8mzR.js","assets/quiz-5qMPWZVi.js","assets/Rapport-E-5Iw1Cg.js","assets/Recommandations-B_IQS7ch.js","assets/regler-CxY0cfTN.js","assets/regler-D1gFEaVz.css","assets/regler-par-fedapay-pur-DP7zXAs5.js","assets/relances-pur-C9iUwl2e.js","assets/releve-des-avis-DFupQaPy.js","assets/SalonFoyer-CGQ5MVCH.js","assets/sceau-BeMY0i8y.js","assets/secretariat-admin-CvxwT3wM.js","assets/Secretariat-Cy79Zw30.css","assets/Secretariat-DWx8gVTe.js","assets/Signatures-NYzaJ591.js","assets/SignerUnPdf-Cvi5ti3Y.js","assets/Synthese-CcPJagW7.js","assets/SyntheseGraphes-C9jl0jbU.js","assets/systeme-TPy-pF7j.css","assets/Tableau-DV9F9QrE.js","assets/temps-DHTEB5Fk.js","assets/Textes-COLrNKYA.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-CkDzpGy0.css","assets/tiroirs-D3RgwUrL.js","assets/trone-B-r6lpi2.css","assets/trone-tMl7q6pc.js","assets/useAudiences-Bphug-hv.js","assets/useClotureDuJour-BMylN-Xv.js","assets/visios-C-c3F3eJ.js","assets/Vitrine-BbRX70Xm.js","assets/Vitrine-BWilTqQJ.css","assets/_admin-DfGzGLG5.js","assets/_contrat-p2axRANq.js","assets/_reuni-DvW6Ivzy.js","assets/_shared-CLsO6P6S.js","assets/_signature-BYJinIMB.js","assets/_ui-BiSvRLLS.js","assets/_ui-BrUDlmuM.css"];
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
