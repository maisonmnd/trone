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
const BUILD = "20261126000909";
const A_GARDER = ["./","assets/abonnements-COis3mu6.js","assets/Abonnements-CQ1TNE1p.js","assets/Abonnements-DTY7p2DH.css","assets/Academie-FUcDOExt.js","assets/Acces-D6UsP13D.js","assets/afaire-BMVCoMcM.js","assets/AFaire-f7_UGz7E.js","assets/agents-donnees-BFjwb-7m.js","assets/Agents-gEXAapTB.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-9IGCBd5u.js","assets/App-SSoerCl1.js","assets/Appels-CZPVVEy-.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/Assistants-1yOnX87x.js","assets/Assistants-D9i2Xwmg.css","assets/AtelierDesContenus-D3-p6F2A.css","assets/AtelierDesContenus-DAWi9uxd.js","assets/Audience-BEYN3DEp.js","assets/Aujourdhui-CYtnKfzA.js","assets/auth-DINAx8Ti.js","assets/avant-le-fauteuil-lecture-C1WoQgXc.js","assets/AvantLeFauteuil-c3FSKgZw.js","assets/avis-fiches-D-HSr3XV.js","assets/avis-google-pont-LwvutFWL.js","assets/AvisGoogle-DaPXfwX9.css","assets/AvisGoogle-z8tm6Ont.js","assets/BadgeEssai-BGxAvRH2.js","assets/BadgeSuggere-GTBqz1ta.js","assets/besoins-CrDCgsbe.js","assets/BesoinsEtRegles-BLwxGVV5.css","assets/BesoinsEtRegles-CyVCLxXs.js","assets/bilan-B-bfPYR0.css","assets/bilan-qAJ2jnyq.js","assets/BilanMensuel-BJWT-7Af.js","assets/Branches-DHg4VRlX.js","assets/bridges-DrbyWj-g.js","assets/Caisse-BlwqcjcU.js","assets/caisse-du-soir-C6vPx-E_.css","assets/caisse-du-soir-HmyqOAwD.js","assets/caisse-fluide-pur-D5pb2Xen.js","assets/Caisses-DOcaLp5S.js","assets/Calendrier-C45ksCFx.js","assets/campagnes-pur-DBCn0o7Q.js","assets/Carnet-BN377WeY.js","assets/carte-DVoDDHYj.js","assets/carte-_W_-xBPj.css","assets/CarteModal-DWXV_hxk.js","assets/CartesCadeaux-CXoSaKO7.js","assets/Catalogue-MPJbhc6E.js","assets/CentreDeCommande-CPli3_q0.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-d48crxC-.js","assets/certificat-BbiuAqLc.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-BgAwS9VJ.js","assets/chiffre-du-jour-pur-DrYJ-Div.js","assets/ChiffreDesPrestations-DztdEb-H.js","assets/classement-DjH9yD-0.js","assets/Classement-Dp9RtN4K.js","assets/classement-pur-DgNYRo7t.js","assets/Classement-T9x-HPwd.css","assets/client-B5kVD-05.js","assets/cloture-du-jour-BlNtdoLa.js","assets/ClotureDuTiroir-N9-rggXd.js","assets/Coffre-16fICOGZ.js","assets/components-cKEK4hHp.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-CjsZNtwM.js","assets/Comptes-D6VI5Ju_.js","assets/consultation-CRW6QcWf.css","assets/consultation-TW5jq1t1.js","assets/Consultations-CxZUCn_X.js","assets/Consultations-DiE-2_mG.css","assets/consultNotes-CEfSSARe.js","assets/contexte-de-la-reponse-C1ZTbv0R.js","assets/Conversations-CY2C2hsC.js","assets/Conversations-D4WwB5Zo.css","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-Cyzqith5.js","assets/currency-Cd0clE4P.js","assets/Customers-BltNPP6C.js","assets/Dashboard-D9jnTaFp.css","assets/Dashboard-roJSkojb.js","assets/dates-Cs09vEuc.js","assets/DemanderAPerle-BD5NgCRN.css","assets/DemanderAPerle-BISymB4N.js","assets/Demandes-BpfMvofS.js","assets/DepenseEnUnePhrase-BIGRlGqP.css","assets/DepenseEnUnePhrase-fDxo5NHo.js","assets/Depenses-CdDHsk8H.js","assets/depenses-saisie-MSMXTcT-.js","assets/devis-CdIRAvZk.css","assets/devis-C_7F6z6G.js","assets/devis-remis-oomV4kme.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-DKZ4h8Vj.js","assets/diagnostics-au-trone-CVxNXKAH.js","assets/Dictee-C-pUYYFA.css","assets/Dictee-D4z04p_X.js","assets/dictee-pur-CFm58qyv.js","assets/Discussions-C-rNykRl.js","assets/dist-9vv0te18.js","assets/echappe-html-pur-gEhHOM07.js","assets/EditeurDesOffres-Bll7tPvQ.js","assets/Encaissements-wvuwbWpQ.js","assets/EnDirect-Ca0zsecI.js","assets/enfants-B2mj_mGm.js","assets/Engagements-1PVHSOFI.js","assets/Engagements-Cj5S9MhG.css","assets/engagements-coffre-BwM71RzN.js","assets/EntreDeuxSeances-DXwVFLgi.js","assets/es-Dm-cqGUB.js","assets/etoiles-pur-CgRPMSHm.js","assets/Evaluation-ihknfML8.js","assets/facture-AO1kth2C.js","assets/Factures-Dm3bJDhr.js","assets/FenetreDeLAgent-BqVhTO1b.js","assets/FenetreDesCivilites-KRUMAoNY.js","assets/FenetreDesCivilites-zfNk1aak.css","assets/FenetreDuPoint-CiRcnOoM.js","assets/Fil-DItGyLtO.js","assets/finances-C8x7Mn4-.css","assets/fon-C0hpY3hS.js","assets/fournisseurs-BpQD_9p6.js","assets/Fournisseurs-Cxr1RqLT.js","assets/foyer-zTtNHdAZ.js","assets/Gerard-BJ7xfEpA.js","assets/gerard-donnees-CK52sd-l.js","assets/Gerard-lGKehvgG.css","assets/gestes-conversation-DVmorkyP.js","assets/heures-des-rappels-pur-BWJPB8OP.js","assets/HomeRituals-zYxhH71I.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-_zjbFNtl.js","assets/ia-centre-LIg65IhR.js","assets/ia-diagnostic-pur-qGnFEvys.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-tableau-pur-p6UvREJe.js","assets/identite-coX1PZUk.js","assets/index.es-pAHiJ2XT.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-NhUkhIjI.js","assets/jspdf.es.min-DX1bvFPO.js","assets/JustePrix-B0cJeo_9.js","assets/kkiapay-DmnPL31A.js","assets/kkiapay-widget-CaHBoBVm.js","assets/Laboratoire-BjUzGvb_.js","assets/LaJournee-Bn_G0HCt.css","assets/LaJournee-CWYnChGG.js","assets/le-caissier-pur-C8TesyYo.js","assets/le-sceau-pur-Dv-IZ_M2.js","assets/LePoint-B_HurXA0.css","assets/LePoint-DqvNjPLb.js","assets/LesPaiements-C9cEZlne.css","assets/LesPaiements-CGTxlC4x.js","assets/LettresAuDossier-CcgjICeE.js","assets/LienMndPay-D4oA7zgY.js","assets/Marketing-DKsnJAKq.js","assets/MarketingBranche-C68bKDMK.js","assets/Marque-DFSZ5HcV.js","assets/MesPourboires-CENjelyb.css","assets/MesPourboires-D5pRWtkk.js","assets/MesTaches-Cc4XUDf6.css","assets/MesTaches-DUDKcXm0.js","assets/mnd-pay-pur-CfS2mkAo.js","assets/momo-C2ZVfV9J.js","assets/MonMois-DirgNqfw.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/MtnMoMo-BGM1NVPU.js","assets/objectifs-B7Fwr-vE.js","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/opale-BHWtBy3i.js","assets/oreille-B1AMUmZh.js","assets/paie-du-5-DeJq-K_U.css","assets/paie-du-5-D_Z8O5rO.js","assets/paie-du-5-pur-CPiCK8fv.js","assets/paie-par-mtn-Dqb_S2Hs.js","assets/PaieParMtn-BaFhknpg.js","assets/paliers-COx69lWH.js","assets/Parametres-Yj0jWoSJ.js","assets/parcours-c9NsZ9tV.js","assets/Parrainages-CLwLhhek.js","assets/Parrainages-gAHAPB_6.css","assets/PassageAvantLeFauteuil-BJ-gV3Yb.js","assets/pdf-B6W0u_MP.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/periode-des-pourboires-pur-BUWqfwov.js","assets/Personas-Cfs4Zsqc.js","assets/Personnel-DTAdZ56l.js","assets/photo-CmXAc8nu.js","assets/pilotage-D8kf1Co8.css","assets/porte-de-l-equipe-BCobKG8z.js","assets/Pourboires-B7rqTOfY.js","assets/Predictions-DAnDmDap.js","assets/preload-helper-BRe_O-Rg.js","assets/Prestataires-BHVil85h.js","assets/Prets-DNwmwCm-.js","assets/PrevisionDuMois-DCGassSt.js","assets/PrevisionDuMois-DlFTw3OX.css","assets/Previsions-9BU2Vg1T.css","assets/Previsions-D0GWNTbb.js","assets/previsions-pur-azyF7_ag.js","assets/processus-pur-R6U5QcCi.js","assets/Projets-CAVM3Iwp.js","assets/Projets-COO7WDEE.css","assets/projets-NQdsUwc5.js","assets/projets-pur-2ZEMRNDU.js","assets/protocoles-CI_u5KxT.js","assets/purify.es-BwoZCkIS.js","assets/qr-BcGc8gUZ.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-D-doKqCm.js","assets/quiz-5qMPWZVi.js","assets/Rapport-NmzUBO8O.js","assets/Recommandations-Y-SRJWz5.js","assets/regler-B_PbOiOl.js","assets/regler-D1gFEaVz.css","assets/regler-par-fedapay-pur-DP7zXAs5.js","assets/relances-pur-C9iUwl2e.js","assets/releve-des-avis-DaUlj33i.js","assets/SalonFoyer-yQbxluVb.js","assets/sceau-CpxGcYPw.js","assets/Secretariat-5vlo-znl.js","assets/secretariat-admin-Dx8U9nqT.js","assets/Secretariat-Cy79Zw30.css","assets/Signatures-beB4x3ri.js","assets/SignerUnPdf-CvYomq2T.js","assets/Synthese-CoXdnmbr.js","assets/SyntheseGraphes-DgxskQgj.js","assets/systeme-TPy-pF7j.css","assets/Tableau-CwMI7nHO.js","assets/temps-OR1S5VuO.js","assets/Textes-Czj3Rd23.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-BKA3D32m.js","assets/tiroirs-CkDzpGy0.css","assets/tpe-CkdX_Ont.css","assets/tpe-de-poche-pur-BApx0DbM.js","assets/tpe-DexH5O9I.js","assets/TpeDePoche-Cni4oWR_.js","assets/trone-C3eufNNq.css","assets/trone-DxtEkVkA.js","assets/useAudiences-EDwWkmoc.js","assets/useClotureDuJour-D9VinNGP.js","assets/visios-CxJB5Gaz.js","assets/Vitrine-4EnIbotl.js","assets/Vitrine-BWilTqQJ.css","assets/_admin-BB7f_kQA.js","assets/_contrat-BgQlwGEm.js","assets/_reuni-B3M1gwyh.js","assets/_shared-C1_AZDol.js","assets/_signature-CviDgPZ7.js","assets/_ui-BrUDlmuM.css","assets/_ui-CsDSsEFI.js"];
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
