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
const BUILD = "20261125075757";
const A_GARDER = ["./","assets/Abonnements-D8J9kr4Z.js","assets/abonnements-Doj3C7_F.js","assets/Abonnements-DTY7p2DH.css","assets/Academie-C621v9wj.js","assets/Acces-B8zWSesN.js","assets/AFaire-IHoWnlHU.js","assets/afaire-PZDS8iqd.js","assets/Agents-BidKrNQA.js","assets/agents-donnees-DkpnHMd2.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-BHq7V03Y.js","assets/App-zGHgJSYd.js","assets/Appels-ptlwCWJb.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/Assistants-CYQ0LroC.js","assets/Assistants-D9i2Xwmg.css","assets/AtelierDesContenus-BMp1mrAj.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/Audience-DPsTZZOm.js","assets/Aujourdhui-CkYhcG4F.js","assets/auth-B3NadwPU.js","assets/avant-le-fauteuil-lecture-Dy1gEL1z.js","assets/AvantLeFauteuil-Cfxs4qTg.js","assets/avis-fiches-CgDRsaop.js","assets/avis-google-pont-CSX7sqiv.js","assets/AvisGoogle-DaPXfwX9.css","assets/AvisGoogle-UHcsqPKf.js","assets/BadgeEssai-BRRUpbbk.js","assets/BadgeSuggere-BrwMpQHw.js","assets/besoins-D7e71omW.js","assets/BesoinsEtRegles-BLwxGVV5.css","assets/BesoinsEtRegles-CPRYtVZS.js","assets/bilan-B-bfPYR0.css","assets/bilan-B_cbL_y-.js","assets/BilanMensuel-BhOsh1-_.js","assets/Branches-CdYuGFyp.js","assets/bridges-DfZYomBy.js","assets/Caisse-DHd4568r.js","assets/caisse-du-soir-C6vPx-E_.css","assets/caisse-du-soir-C_jyV9hb.js","assets/caisse-fluide-pur-B520C83F.js","assets/Caisses-C-bKqTty.js","assets/Calendrier-BgNRn2an.js","assets/campagnes-pur-Benp4LxG.js","assets/Carnet-C6OF2X4C.js","assets/carte-C5os2Vin.js","assets/carte-_W_-xBPj.css","assets/CarteModal-DX53sDFw.js","assets/CartesCadeaux-CedO5J_H.js","assets/Catalogue-ndi8w0ss.js","assets/CentreDeCommande-Du8kyJhp.css","assets/CentreDeCommande-XeMkB-4J.js","assets/Cercle-D6UNVAJu.js","assets/certificat-B3xGNjN2.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-DBOrBcHK.js","assets/chiffre-du-jour-pur-CeWgli3x.js","assets/ChiffreDesPrestations-Cmw7H_EE.js","assets/Classement-BPE9FdIP.js","assets/classement-Ca_rzHSi.js","assets/Classement-CmpbQZDu.css","assets/classement-pur-CQOYU06l.js","assets/client-BmDCdCZJ.js","assets/cloture-du-jour-DKVcUWaP.js","assets/ClotureDuTiroir-tpgME4YU.js","assets/Coffre-Djki3B0y.js","assets/components-DtPm3Vd2.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-rd47c4nz.js","assets/Comptes-faNSLTVH.js","assets/consultation-C1D_1bm_.js","assets/consultation-CRW6QcWf.css","assets/Consultations-DiE-2_mG.css","assets/Consultations-DJ9V_wxJ.js","assets/consultNotes-DLGEhlM8.js","assets/contexte-de-la-reponse-BvN7rY0I.js","assets/Conversations-D4WwB5Zo.css","assets/Conversations-DmARhoCy.js","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-BtBPAHu-.js","assets/currency-Cd0clE4P.js","assets/Customers-DL2mGLZT.js","assets/Dashboard-Cw5zWmQu.css","assets/Dashboard-MJ2h71Ag.js","assets/dates-CMaJzZot.js","assets/DemanderAPerle-BD5NgCRN.css","assets/DemanderAPerle-BeT9ipec.js","assets/Demandes-BZYswrcr.js","assets/DepenseEnUnePhrase-BIGRlGqP.css","assets/DepenseEnUnePhrase-BmY6gu3B.js","assets/Depenses-DJn6awCo.js","assets/depenses-saisie-CTm4a6aq.js","assets/devis-CdIRAvZk.css","assets/devis-Dm1-64aX.js","assets/devis-remis-BsezWiBb.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-BCOVmgxX.js","assets/diagnostics-au-trone-CpaI014T.js","assets/Dictee-BpzU94HC.js","assets/Dictee-C-pUYYFA.css","assets/dictee-pur-MEsdA3Rw.js","assets/Discussions-kRDUFD8b.js","assets/dist-9vv0te18.js","assets/echappe-html-pur-gEhHOM07.js","assets/EditeurDesOffres-DXma-F9A.js","assets/Encaissements-CrrPJs_a.js","assets/EnDirect-Cj5igsZe.js","assets/enfants-BhaskRTt.js","assets/Engagements-Cj5S9MhG.css","assets/engagements-coffre-CK29unvq.js","assets/Engagements-Cp1cigCk.js","assets/EntreDeuxSeances-hiqo92L1.js","assets/es-DefIx_sl.js","assets/etoiles-pur-CgRPMSHm.js","assets/Evaluation-NVCMv_Wd.js","assets/facture-Cr4edzvn.js","assets/Factures-Di_bODXw.js","assets/FenetreDeLAgent-Dgz_7Z0s.js","assets/FenetreDesCivilites-DddzIWTG.js","assets/FenetreDesCivilites-zfNk1aak.css","assets/FenetreDuPoint-dz1CDahN.js","assets/Fil-CGDV86r1.js","assets/finances-C8x7Mn4-.css","assets/fon-Ba4XJ1Zg.js","assets/fournisseurs-Cg-YP8uc.js","assets/Fournisseurs-CyNGC3O6.js","assets/foyer-D_sBcS9r.js","assets/Gerard-COevZ4FA.js","assets/gerard-donnees-C4wgiFZ-.js","assets/Gerard-lGKehvgG.css","assets/gestes-conversation-CAr4gkNj.js","assets/heures-des-rappels-pur-BWJPB8OP.js","assets/HomeRituals-wNLCXMLa.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-CdtBxaCz.js","assets/ia-centre-CM57RM_r.js","assets/ia-diagnostic-pur-qGnFEvys.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-tableau-pur-p6UvREJe.js","assets/identite-DwfdEtQ2.js","assets/index.es-B9hDMRQW.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-CybLLh3K.js","assets/jspdf.es.min-BTdXwtNI.js","assets/JustePrix-3dRRBIRj.js","assets/kkiapay-B5osZC3A.js","assets/kkiapay-widget-CaHBoBVm.js","assets/Laboratoire-BDvFFJOb.js","assets/LaJournee-95vruyrz.js","assets/LaJournee-Bn_G0HCt.css","assets/le-caissier-pur-Cw13r9_v.js","assets/le-sceau-pur-ZsXKMtuY.js","assets/LePoint-ByY7OmAf.js","assets/LePoint-CBjCCMQ5.css","assets/LesPaiements-C9cEZlne.css","assets/LesPaiements-DayVVBFO.js","assets/LettresAuDossier-Dr3prgn5.js","assets/LienMndPay-CNYVbiz0.js","assets/Marketing-SeOL0f-c.js","assets/MarketingBranche-SIEWR7Iq.js","assets/Marque-CP4b0TsK.js","assets/MesPourboires-CENjelyb.css","assets/MesPourboires-DT2ioC4L.js","assets/MesTaches-Cc4XUDf6.css","assets/MesTaches-D0u4PCgD.js","assets/mnd-pay-pur-CfS2mkAo.js","assets/momo-C2ZVfV9J.js","assets/MonMois-Ck_uXPPA.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/MtnMoMo-0Z9mKlLX.js","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/objectifs-JvI5oF5Z.js","assets/opale-DkH4GgI9.js","assets/oreille-B1AMUmZh.js","assets/paie-du-5-BNp_Jok_.js","assets/paie-du-5-DeJq-K_U.css","assets/paie-du-5-pur-CPiCK8fv.js","assets/paie-par-mtn-BVKHrLfx.js","assets/PaieParMtn-BRPbDEPS.js","assets/paliers-_FUfyMh7.js","assets/Parametres-BdPzBgMA.js","assets/parcours-BslUoD-k.js","assets/Parrainages-BxJHSciI.js","assets/Parrainages-gAHAPB_6.css","assets/PassageAvantLeFauteuil-qL-MEjgl.js","assets/pdf-DsoRl4M4.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/periode-des-pourboires-pur-BUWqfwov.js","assets/Personas-Dp8mb3k2.js","assets/Personnel-CAFXBiy6.js","assets/photo-D7Ms4dtx.js","assets/pilotage-D8kf1Co8.css","assets/porte-de-l-equipe-BXmV6hlU.js","assets/Pourboires-ByZr_RjR.js","assets/Predictions-DZiq5-eN.js","assets/preload-helper-BRe_O-Rg.js","assets/Prestataires-BY-RTeSZ.js","assets/Prets-CE4zn9Eo.js","assets/PrevisionDuMois-C519U2IV.js","assets/PrevisionDuMois-DlFTw3OX.css","assets/Previsions-9BU2Vg1T.css","assets/Previsions-DH14XXTP.js","assets/previsions-pur-DIeIDT47.js","assets/processus-pur-R6U5QcCi.js","assets/Projets-BY39j7XQ.js","assets/Projets-COO7WDEE.css","assets/projets-pur-2ZEMRNDU.js","assets/projets-rHPuEAM2.js","assets/protocoles-Dj0nLmmW.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-jDStVu7c.js","assets/quiz-5qMPWZVi.js","assets/Rapport-1Cyetnc2.js","assets/Recommandations-DS7bQ-qh.js","assets/regler-7Ib_0bxR.js","assets/regler-D1gFEaVz.css","assets/regler-par-fedapay-pur-DP7zXAs5.js","assets/relances-pur-C9iUwl2e.js","assets/releve-des-avis-HRI0R1-t.js","assets/SalonFoyer-JWRPdP3z.js","assets/sceau-Bp5kjD_-.js","assets/secretariat-admin-CDWz4KQX.js","assets/Secretariat-CBGCR4sF.js","assets/Secretariat-Cy79Zw30.css","assets/Signatures-2NJrXeHp.js","assets/SignerUnPdf-CsYvaBBo.js","assets/Synthese-Dng4BpLi.js","assets/SyntheseGraphes-D9o_CVO7.js","assets/systeme-TPy-pF7j.css","assets/Tableau-BlHMmMMz.js","assets/temps-v8xDdl3f.js","assets/Textes-CZc11Bdz.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-B5nUeZF6.js","assets/tiroirs-CkDzpGy0.css","assets/trone-B-r6lpi2.css","assets/trone-Dk8MxRPL.js","assets/useAudiences-BykJsXOm.js","assets/useClotureDuJour-BuaQefwd.js","assets/visios-DeYOW8XN.js","assets/Vitrine-BWilTqQJ.css","assets/Vitrine-DV4pGt6T.js","assets/_admin-JF2UpdUj.js","assets/_contrat-sqKpiQOT.js","assets/_reuni-G95TX-6G.js","assets/_shared-fRsfYy1M.js","assets/_signature-Dk9Myf2g.js","assets/_ui-BCfFb9TD.js","assets/_ui-BrUDlmuM.css"];
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
