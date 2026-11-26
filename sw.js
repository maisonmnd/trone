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
const BUILD = "20261126060256";
const A_GARDER = ["./","assets/abonnements-CrGq6Nfk.js","assets/Abonnements-DiBd9tCv.js","assets/Abonnements-DTY7p2DH.css","assets/Academie-Dm24BYeM.js","assets/Acces-CqmNc5Yi.js","assets/afaire-BYCDmxLw.js","assets/AFaire-qCeDoLg3.js","assets/agents-donnees-DtIqxt_8.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Agents-o2m8110M.js","assets/Analytics-DKBGm3eT.js","assets/App-wb4zdPdb.js","assets/Appels-CXZQO6e-.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/Assistants-BgFzjh7A.js","assets/Assistants-D9i2Xwmg.css","assets/AtelierDesContenus-BJ0suseF.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/Audience-Dw_XqFaD.js","assets/Aujourdhui-CiBFx50W.js","assets/auth-DNk41RRc.js","assets/avant-le-fauteuil-lecture-gb3tRo9S.js","assets/AvantLeFauteuil-BasyvOUi.js","assets/avis-fiches-5gteHjYh.js","assets/avis-google-pont-WDq5L5qh.js","assets/AvisGoogle-DaPXfwX9.css","assets/AvisGoogle-jRSpXfxY.js","assets/BadgeEssai-D3RgaCo4.js","assets/BadgeSuggere-D66PnYIN.js","assets/besoins-BXSpIasj.js","assets/BesoinsEtRegles-BLwxGVV5.css","assets/BesoinsEtRegles-B_zy6LFl.js","assets/bilan-B-bfPYR0.css","assets/bilan-DR7b6P19.js","assets/BilanMensuel-CzC8y4VB.js","assets/Branches-DrSJr8yO.js","assets/bridges-Ct4lBG8v.js","assets/Caisse-CYRelXQe.js","assets/caisse-du-soir-C6vPx-E_.css","assets/caisse-du-soir-vVBomboM.js","assets/caisse-fluide-pur-CbbNRt0G.js","assets/Caisses-BYK4I_15.js","assets/Calendrier-DEigiHhp.js","assets/campagnes-pur-WXDVbaEq.js","assets/Carnet-ChbMlstH.js","assets/carte-B-eNms7Y.js","assets/carte-_W_-xBPj.css","assets/CarteModal-Bn-9NR8r.js","assets/CartesCadeaux-CiB201rs.js","assets/Catalogue-DhTA723g.js","assets/CentreDeCommande-BMo-eHKq.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-DzyZdBKk.js","assets/certificat-CLU7IIab.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-BeEKBOhv.js","assets/chiffre-du-jour-pur-CIDsAZX2.js","assets/ChiffreDesPrestations-jsGCnUrH.js","assets/Classement-CFf0bBWw.js","assets/classement-CTC3SZcr.js","assets/classement-pur-DgNYRo7t.js","assets/Classement-T9x-HPwd.css","assets/client-trYEYLwg.js","assets/cloture-du-jour-BqsrpP1q.js","assets/ClotureDuTiroir-C-5EskKg.js","assets/Coffre-Bo6i9eEf.js","assets/components-hCzIk3f4.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-DY-ywYUS.js","assets/Comptes-Br4AYnGp.js","assets/consultation-CRW6QcWf.css","assets/consultation-sVWf4-ln.js","assets/Consultations-DiE-2_mG.css","assets/Consultations-U2FGL6rh.js","assets/consultNotes-WoUXDAkB.js","assets/contexte-de-la-reponse-DGQKTVNi.js","assets/Conversations-D4WwB5Zo.css","assets/Conversations-q69ihUc5.js","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-DxguKFCl.js","assets/currency-Cd0clE4P.js","assets/Customers-Bl2In2gd.js","assets/Dashboard-BTJPE8sY.css","assets/Dashboard-DpnkztNx.js","assets/dates-BLhpeeVR.js","assets/DemanderAPerle-BD5NgCRN.css","assets/DemanderAPerle-GWm1Z01I.js","assets/Demandes-DBjfbDEx.js","assets/DepenseEnUnePhrase-BIGRlGqP.css","assets/DepenseEnUnePhrase-dfI9cMQp.js","assets/Depenses-DfzTlrAc.js","assets/depenses-saisie-CVvKt4qw.js","assets/devis-CdIRAvZk.css","assets/devis-DON4g9kj.js","assets/devis-remis-p3ap3-UX.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-D7LlW1vi.js","assets/diagnostics-au-trone-25X9nceg.js","assets/Dictee-C-pUYYFA.css","assets/Dictee-DtzC9-Pj.js","assets/dictee-pur-BtawGn75.js","assets/Discussions-BYACM-8G.js","assets/dist-9vv0te18.js","assets/echappe-html-pur-gEhHOM07.js","assets/EditeurDesOffres-VIoBMAn9.js","assets/Encaissements-CNnEQTOd.js","assets/EnDirect-DdY9DiTw.js","assets/enfants-Ick9D9RA.js","assets/Engagements-B2C6OuqB.js","assets/Engagements-Cj5S9MhG.css","assets/engagements-coffre-CIPHCKS5.js","assets/EntreDeuxSeances-CvXe7yFS.js","assets/es-HN_1Q0Oh.js","assets/etoiles-pur-CgRPMSHm.js","assets/Evaluation-Cz_F3Dj5.js","assets/facture-ekYVaOwt.js","assets/Factures-BDFlYlLN.js","assets/FenetreDeLAgent-DLKkrTYW.js","assets/FenetreDesCivilites-YfQ2uXek.js","assets/FenetreDesCivilites-zfNk1aak.css","assets/FenetreDuPoint-7UqpMUbu.js","assets/Fil-CQLKR9P1.js","assets/finances-C8x7Mn4-.css","assets/fon-BzhOktiQ.js","assets/fournisseurs-9P8_vrtf.js","assets/Fournisseurs-BImNYtqd.js","assets/foyer-DPwnHMq4.js","assets/Gerard-CMc2X0zt.js","assets/gerard-donnees-BS8yfABt.js","assets/Gerard-lGKehvgG.css","assets/gestes-conversation-DrhBG0Pi.js","assets/heures-des-rappels-pur-BWJPB8OP.js","assets/HomeRituals-Boix6kDY.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-DhRtdtQV.js","assets/ia-centre-CkePSj3Y.js","assets/ia-diagnostic-pur-qGnFEvys.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-tableau-pur-p6UvREJe.js","assets/identite-gyXJUQ-K.js","assets/index.es-DU_VXu-U.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-BEOfTbKA.js","assets/jspdf.es.min-CsVcPZZd.js","assets/JustePrix-ncUG0k3z.js","assets/kkiapay-CgSW78Hi.js","assets/kkiapay-widget-CaHBoBVm.js","assets/Laboratoire-Dl2oJ2id.js","assets/LaJournee-Bn_G0HCt.css","assets/LaJournee-D7aasm06.js","assets/le-caissier-pur-CFA3H95Y.js","assets/le-sceau-pur-Dv-IZ_M2.js","assets/LePoint-B_HurXA0.css","assets/LePoint-CB7ny2OV.js","assets/LesPaiements-BeNewR-R.js","assets/LesPaiements-C9cEZlne.css","assets/LettresAuDossier-D_-8wCmA.js","assets/LienMndPay-Bt97J-yr.js","assets/Marketing-GIWXnljP.js","assets/MarketingBranche-BepiyEt1.js","assets/Marque-6qL764rl.js","assets/MesPourboires-Bp_tERLa.js","assets/MesPourboires-CENjelyb.css","assets/MesTaches-BokB8aiZ.js","assets/MesTaches-Cc4XUDf6.css","assets/mnd-pay-pur-CfS2mkAo.js","assets/momo-C2ZVfV9J.js","assets/MonMois-u1yN0gf3.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/MtnMoMo-C-sstrKK.js","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/objectifs-DtCq6yVF.js","assets/opale-DPka1FKi.js","assets/oreille-B1AMUmZh.js","assets/paie-du-5-CH3tNYNe.js","assets/paie-du-5-DeJq-K_U.css","assets/paie-du-5-pur-CPiCK8fv.js","assets/paie-par-mtn-B6XgPvrl.js","assets/PaieParMtn-CFDmoBP1.js","assets/paliers-CNEphZEH.js","assets/Parametres-BypmnYQu.js","assets/parcours-CXpSHUYS.js","assets/Parrainages-DEwwHdlY.js","assets/Parrainages-gAHAPB_6.css","assets/PassageAvantLeFauteuil-C4Pa3uuf.js","assets/pdf-C0b9-hPZ.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/periode-des-pourboires-pur-BUWqfwov.js","assets/Personas-apw74lix.js","assets/Personnel-DIl6IXK8.js","assets/photo-Cj2aO1wV.js","assets/pilotage-D8kf1Co8.css","assets/porte-de-l-equipe-DLV5Sfam.js","assets/Pourboires-DPmDG_sy.js","assets/Predictions-BkLNJsRt.js","assets/preload-helper-BRe_O-Rg.js","assets/Prestataires-DQSFhwu0.js","assets/Prets-2lL1OFyK.js","assets/PrevisionDuMois-B4XqG6_v.js","assets/PrevisionDuMois-DlFTw3OX.css","assets/Previsions-9BU2Vg1T.css","assets/Previsions-CokE5_sr.js","assets/previsions-pur-CGrAt9Ff.js","assets/processus-pur-R6U5QcCi.js","assets/projets-BRmpF_no.js","assets/Projets-COO7WDEE.css","assets/Projets-DwxZVBAD.js","assets/projets-pur-2ZEMRNDU.js","assets/protocoles-D9dHVTJr.js","assets/purify.es-BwoZCkIS.js","assets/qr-CQk5lESK.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-B8YpZa_m.js","assets/quiz-5qMPWZVi.js","assets/Rapport-Byy13lF9.js","assets/Recommandations-vuIx_y07.js","assets/regler-CyQyZYu1.js","assets/regler-D1gFEaVz.css","assets/regler-par-fedapay-pur-DP7zXAs5.js","assets/relances-pur-C9iUwl2e.js","assets/releve-des-avis-BQMNq2Dx.js","assets/SalonFoyer-CWZj4kJr.js","assets/sceau-DSRqiAEh.js","assets/secretariat-admin-Di3c9AvC.js","assets/Secretariat-Cy79Zw30.css","assets/Secretariat-fLExLckc.js","assets/Signatures-4tfK60uy.js","assets/SignerUnPdf-CbOO08mA.js","assets/Synthese-Bgsped72.js","assets/SyntheseGraphes-DoR76ATg.js","assets/systeme-TPy-pF7j.css","assets/Tableau-BOgicI7D.js","assets/temps-BSIPBv-U.js","assets/Textes-CmffXYoh.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-BiwYsx-T.js","assets/tiroirs-CkDzpGy0.css","assets/tpe-Cnj9g24r.css","assets/tpe-de-poche-pur-BE5B0FWf.js","assets/tpe-Dk_SYyY4.js","assets/TpeDePoche-CAwowYcN.js","assets/trone-BS6Hws4H.js","assets/trone-C3eufNNq.css","assets/useAudiences-CH5f47CU.js","assets/useClotureDuJour-1BxCZUWl.js","assets/visios-CCRallsQ.js","assets/Vitrine-BWilTqQJ.css","assets/Vitrine-krmDkbfE.js","assets/_admin-Cu5Cd3aC.js","assets/_contrat-CDJ8IhGN.js","assets/_reuni-m57IQ4fT.js","assets/_shared-C3sZW-nG.js","assets/_signature-DLaX4lKf.js","assets/_ui-BrUDlmuM.css","assets/_ui-CmXmG_mO.js"];
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
