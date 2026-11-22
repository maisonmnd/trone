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
const BUILD = "20261122204307";
const A_GARDER = ["./","assets/Abonnements-BNTuxC5B.js","assets/abonnements-CysR55xr.js","assets/Abonnements-DTY7p2DH.css","assets/Academie-DTg5hiEt.js","assets/Acces-D6oAjgNa.js","assets/AFaire-CnmjX6OJ.js","assets/afaire-DMQCKjAH.js","assets/Agents-CgXT3H-c.js","assets/agents-donnees-Bap0IQiv.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-CoAc265e.js","assets/App-Rk28FIy0.js","assets/Appels-D7hAz2bu.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/Assistants-1fhNNGfY.js","assets/Assistants-D9i2Xwmg.css","assets/AtelierDesContenus-BrXpSSRT.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/Audience-BkC9OgJV.js","assets/Aujourdhui-B9Pe9jd0.js","assets/auth-C8Ww3mUz.js","assets/avant-le-fauteuil-lecture-F4FV3heq.js","assets/AvantLeFauteuil-DR0Ts9w8.js","assets/avis-fiches-_q_18-LU.js","assets/avis-google-pont-B0TobMwX.js","assets/AvisGoogle-BpktzXCN.js","assets/AvisGoogle-DaPXfwX9.css","assets/BadgeEssai-CXOTvlzO.js","assets/BadgeSuggere-DI5eNrr4.js","assets/besoins-DQmKE4nM.js","assets/BesoinsEtRegles-BLwxGVV5.css","assets/BesoinsEtRegles-C7KPk9qh.js","assets/bilan-B-bfPYR0.css","assets/bilan-Q3T0L8Mr.js","assets/BilanMensuel-B-mPx8Je.js","assets/Branches-DvtFnn8z.js","assets/bridges-DAGKXLXD.js","assets/Caisse-BsciC3KO.js","assets/caisse-du-soir-1J05zK74.js","assets/caisse-du-soir-C6vPx-E_.css","assets/caisse-fluide-pur-BmFh8MjU.js","assets/Caisses-C5sKHffD.js","assets/Calendrier-DJ8XIQb-.js","assets/campagnes-pur-DTDenkLa.js","assets/Carnet-BYkmeqvq.js","assets/carte-D7LI1VP-.js","assets/carte-_W_-xBPj.css","assets/CarteModal-Ct6BTgl-.js","assets/CartesCadeaux-B7p8PVjE.js","assets/Catalogue-XBZjwcbz.js","assets/CentreDeCommande-BH0iGNY3.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-CMmU-c-U.js","assets/certificat-BHthwrNd.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-BytvJSrm.js","assets/chiffre-du-jour-pur-DPC9PqP9.js","assets/ChiffreDesPrestations-C0v3PFcW.js","assets/classement-BLstpM6A.js","assets/Classement-CmpbQZDu.css","assets/Classement-DIkIt-Ka.js","assets/classement-pur-CQOYU06l.js","assets/client-oAs1aTzL.js","assets/cloture-du-jour-CCHRu0Fr.js","assets/ClotureDuTiroir-D4L2wER4.js","assets/Coffre-Cu57fIcf.js","assets/collecte-mtn-pur-B4ceZvbj.js","assets/components-Bt0hHAnn.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-BPycMdFx.js","assets/Comptes-AqZUDUK7.js","assets/consultation-CRW6QcWf.css","assets/consultation-sCZHsSHi.js","assets/Consultations-C9reeOT9.js","assets/Consultations-DiE-2_mG.css","assets/consultNotes-B6KCM5ka.js","assets/contexte-de-la-reponse-BlXqo-sW.js","assets/Conversations-D4FZujly.js","assets/Conversations-D4WwB5Zo.css","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-5M8xUdXh.js","assets/currency-Cd0clE4P.js","assets/Customers-FBw5FRTS.js","assets/Dashboard-B2x7VsE_.css","assets/Dashboard-CpFTKmyQ.js","assets/dates-gCG_4xOE.js","assets/DemanderAPerle-BD5NgCRN.css","assets/DemanderAPerle-BV5sdA5X.js","assets/Demandes-DiUuQApl.js","assets/DepenseEnUnePhrase-BIGRlGqP.css","assets/DepenseEnUnePhrase-CbWNGTIU.js","assets/Depenses-B7Lmjlcp.js","assets/depenses-saisie-CI2rjCPn.js","assets/devis-remis-Cez1ZZTQ.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-CnM_pImp.js","assets/diagnostics-au-trone-CR6d0ySE.js","assets/Dictee-BsyzhLrj.js","assets/Dictee-C-pUYYFA.css","assets/dictee-pur-Dl8FpU0f.js","assets/Discussions-CO64Xx3c.js","assets/dist-9vv0te18.js","assets/echappe-html-pur-gEhHOM07.js","assets/EditeurDesOffres-DH_zZE5g.js","assets/Encaissements-rHQ0aLs-.js","assets/enfants-BX613Kxk.js","assets/Engagements-BncgqwTu.js","assets/Engagements-Cj5S9MhG.css","assets/engagements-coffre-BnrCckpe.js","assets/EntreDeuxSeances-JZQwW3_U.js","assets/es-CVfwBk-J.js","assets/etoiles-pur-CgRPMSHm.js","assets/Evaluation-Csb2Gecm.js","assets/facture-v4_KFTLO.js","assets/Factures-Dv0zbCt2.js","assets/FenetreDeLAgent-C9QNr10A.js","assets/FenetreDesCivilites-BQ8i65G1.js","assets/FenetreDesCivilites-zfNk1aak.css","assets/FenetreDuPoint-CLCAb_iG.js","assets/Fil-0_QHLsrG.js","assets/finances-C8x7Mn4-.css","assets/fon-OrP31VHN.js","assets/fournisseurs-iq_QfcHp.js","assets/Fournisseurs-x8Gr15F2.js","assets/foyer-CSTveItc.js","assets/gerard-donnees-57bYBwX2.js","assets/Gerard-lGKehvgG.css","assets/Gerard-N7ohHAhc.js","assets/gestes-conversation-aeElKtJF.js","assets/heures-des-rappels-pur-BWJPB8OP.js","assets/HomeRituals-0ZCBzpma.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-D6RySCnT.js","assets/ia-centre-DomtJtev.js","assets/ia-diagnostic-pur-qGnFEvys.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-tableau-pur-p6UvREJe.js","assets/identite-BAdvXo3h.js","assets/index.es-D3pgVD-f.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-BEULlxcI.js","assets/jspdf.es.min-CrtNAH6R.js","assets/JustePrix-C9pE0g3M.js","assets/kkiapay-CMnEDA3j.js","assets/kkiapay-widget-CVmsl9OE.js","assets/Laboratoire-BebT0_zv.js","assets/LaJournee-BJtcJ8kO.js","assets/LaJournee-Bn_G0HCt.css","assets/le-caissier-pur-DB8HX_Zh.js","assets/LePoint-B7WhEKof.js","assets/LePoint-CBjCCMQ5.css","assets/LesPaiements-C9cEZlne.css","assets/LesPaiements-CX8kDBXn.js","assets/LettresAuDossier-BDZz1aUt.js","assets/LienMndPay-c7OnTy4M.js","assets/Marketing-CaAnpkdh.js","assets/MarketingBranche-8hq72OWi.js","assets/Marque-CJ79wrzM.js","assets/MesPourboires-C6xFKUC2.js","assets/MesPourboires-CENjelyb.css","assets/MesTaches-BMY6tIeu.js","assets/MesTaches-Cc4XUDf6.css","assets/momo-C2ZVfV9J.js","assets/MonMois-HdSRId3j.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/MtnMoMo-Byr0s1OY.js","assets/objectifs-CUVGjHQH.js","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/opale-2JsMoZ60.js","assets/oreille-B1AMUmZh.js","assets/paie-du-5-DeJq-K_U.css","assets/paie-du-5-fBt-D-aB.js","assets/paie-du-5-pur-CPiCK8fv.js","assets/paie-par-mtn-CRn0R7nz.js","assets/PaieParMtn-B7X3Tk6c.js","assets/paliers-BM_q3was.js","assets/Parametres-Bv7JtSfq.js","assets/parcours-8kXfdymJ.js","assets/Parrainages-C6K0reDf.js","assets/Parrainages-gAHAPB_6.css","assets/PassageAvantLeFauteuil-CJaA2mKw.js","assets/pdf-C7ftWEb7.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/periode-des-pourboires-pur-BUWqfwov.js","assets/Personas-Cmn-F2dS.js","assets/Personnel-CR7HkjgC.js","assets/photo-D7kg2za0.js","assets/pilotage-D8kf1Co8.css","assets/porte-de-l-equipe-BmkwSSdF.js","assets/Pourboires-Yks7jLvk.js","assets/Predictions-p1ve9VT5.js","assets/preload-helper-BRe_O-Rg.js","assets/Prestataires-DlhUsZAk.js","assets/Prets-9aoiJtWD.js","assets/PrevisionDuMois-DlFTw3OX.css","assets/PrevisionDuMois-KerD6z-r.js","assets/Previsions-9BU2Vg1T.css","assets/Previsions-D96FGSw1.js","assets/previsions-pur-3jQQLHmz.js","assets/processus-pur-R6U5QcCi.js","assets/Projets-COO7WDEE.css","assets/Projets-DZFiVLgV.js","assets/projets-ho5dULby.js","assets/projets-pur-2ZEMRNDU.js","assets/protocoles-Ct1VIepo.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-B4I1cnkl.js","assets/quiz-5qMPWZVi.js","assets/Rapport-BT1ACG4a.js","assets/Recommandations-DDYa6XTy.js","assets/regler-D1gFEaVz.css","assets/regler-DxQcGOqo.js","assets/regler-par-fedapay-pur-DRPHZDY6.js","assets/relances-pur-C9iUwl2e.js","assets/releve-des-avis-CHyfYkvM.js","assets/SalonFoyer-B-sg_cpt.js","assets/secretariat-admin-BIVsejAG.js","assets/Secretariat-Cy79Zw30.css","assets/Secretariat-UpRzxCHy.js","assets/Signatures-DI1Hiv9o.js","assets/SignerUnPdf-BuK8ctnJ.js","assets/Synthese-B1ShzCVG.js","assets/SyntheseGraphes-BgzAR1I3.js","assets/systeme-TPy-pF7j.css","assets/Tableau-DerDPoRo.js","assets/temps-RtFLc_c3.js","assets/Textes-DLpOzRbT.css","assets/Textes-DS1XaROL.js","assets/tiroirs-CkDzpGy0.css","assets/tiroirs-CW-OcvTn.js","assets/trone-B-r6lpi2.css","assets/trone-CTjrYQpP.js","assets/useAudiences-Cd57tF5U.js","assets/useClotureDuJour-v6iI3XrR.js","assets/visios-D6M6hoBG.js","assets/Vitrine-BWilTqQJ.css","assets/Vitrine-dZ4HTrMO.js","assets/_admin-B9jF03Nh.js","assets/_contrat-CHxbyHyi.js","assets/_reuni-B15ZSbFA.js","assets/_shared-Bgw-KWF5.js","assets/_signature-DWTAYKmN.js","assets/_ui-BrUDlmuM.css","assets/_ui-ClrRCfe8.js"];
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
