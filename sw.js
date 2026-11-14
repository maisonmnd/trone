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
const BUILD = "20261114202936";
const A_GARDER = ["./","assets/Abonnements-BLODw_cZ.js","assets/abonnements-DtMhp7zY.js","assets/Abonnements-DTY7p2DH.css","assets/Academie-Cl4GCmVu.js","assets/Acces-DSkhOS4X.js","assets/afaire--K5m-3dY.js","assets/AFaire-D7RG922u.js","assets/Agents-9rEQBnFW.js","assets/agents-donnees-vmrW5p1W.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-Cvp1TpJB.js","assets/Appels-B1S9C8Vz.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/Assistants-CCnJcd50.js","assets/Assistants-D9i2Xwmg.css","assets/AtelierDesContenus-07cysxCR.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/Audience-CW_Sz8eH.js","assets/Aujourdhui-Dartla3r.js","assets/avant-le-fauteuil-lecture-oAz2gMRi.js","assets/AvantLeFauteuil-S6Mbl-_W.js","assets/avis-fiches-D6_oo3gV.js","assets/AvisGoogle-C2n03ERE.js","assets/AvisGoogle-DaPXfwX9.css","assets/BadgeEssai-DNukoSpo.js","assets/besoins-CZVdwLTl.js","assets/BesoinsEtRegles-C43mnp-v.js","assets/BesoinsEtRegles-CzntMbJE.css","assets/bilan-B-bfPYR0.css","assets/bilan-CCVQL4yP.js","assets/BilanMensuel-Cl_Oc3aQ.js","assets/Branches-D4IUHOUL.js","assets/bridges-D20FHkWI.js","assets/caisse-du-soir-Bq47Ylo5.js","assets/caisse-du-soir-C6vPx-E_.css","assets/Caisse-Geh1B1mQ.js","assets/Caisses-BWd9b1V4.js","assets/Calendrier-D4HUvtWT.js","assets/campagnes-pur-D_6ufvce.js","assets/Carnet-BXi_V3uN.js","assets/carte-CValFNBp.js","assets/carte-_W_-xBPj.css","assets/CarteModal-CwFFeh_3.js","assets/CartesCadeaux-Dn2OckE9.js","assets/Catalogue-CfJ9aWTc.js","assets/CentreDeCommande-D3u-LCYU.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-MPikyB6Q.js","assets/certificat-DQGtlZ2n.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-CO2lJAd7.js","assets/chiffre-du-jour-pur-DHRZ7CRV.js","assets/ChiffreDesPrestations-DdeM6eAj.js","assets/client-CR3FDYiI.js","assets/cloture-du-jour-BFKAVkix.js","assets/ClotureDuTiroir-BxfbYSDT.js","assets/Coffre-B-dt3zub.js","assets/collecte-mtn-pur-D9rF7FS0.js","assets/components-DoCIVtNA.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-Bjmtjk6v.js","assets/Comptes-w4TYzeou.js","assets/consultation-CRW6QcWf.css","assets/consultation-CYfKFIms.js","assets/Consultations-49PZzU2u.js","assets/Consultations-DiE-2_mG.css","assets/consultNotes-DtkPCZnH.js","assets/Conversations-BVZ-E4U7.js","assets/Conversations-D4WwB5Zo.css","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-BKWIdbSp.js","assets/currency-qfIhGmrs.js","assets/Customers-CONrZz-l.js","assets/Dashboard-B2x7VsE_.css","assets/Dashboard-BLUKPiaT.js","assets/dates-twBzXHDW.js","assets/Demandes-BZYn1_f7.js","assets/DepenseEnUnePhrase-BIGRlGqP.css","assets/DepenseEnUnePhrase-CEEXJBvl.js","assets/Depenses-BKGdF7db.js","assets/depenses-saisie-mQnCCTy2.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-BSSdBbMM.js","assets/diagnostics-au-trone-BfDwFkWw.js","assets/Dictee-4EEfygdW.js","assets/Dictee-BIQFbKhA.css","assets/dictee-pur-DM5aip70.js","assets/Discussions-BFpT1R9S.js","assets/EditeurDesOffres-DTqjs4nh.js","assets/Encaissements-DG1kJC3g.js","assets/enfants-AGDKz8NF.js","assets/Engagements-Cj5S9MhG.css","assets/engagements-coffre-CvhsHQcS.js","assets/Engagements-DefBY2BL.js","assets/EntreDeuxSeances-BrRbNpl-.js","assets/Evaluation-CXjINZoI.js","assets/facture-DMjOOyNR.js","assets/Factures-L8kXiouP.js","assets/FenetreDesCivilites-D5qBQfYg.js","assets/FenetreDesCivilites-zfNk1aak.css","assets/FenetreDuPoint-SKHGBSiR.js","assets/Fil-DLHerj-1.js","assets/finances-C8x7Mn4-.css","assets/fon-BZYCfCKt.js","assets/Fournisseurs-DEIGX4vS.js","assets/fournisseurs-DGfvoWaN.js","assets/foyer-YX8VXuF-.js","assets/Gerard-CAHcDw06.js","assets/Gerard-Cgj-zsJh.css","assets/gerard-donnees-DQDbsyu5.js","assets/gestes-conversation-DfMk4Qym.js","assets/heures-des-rappels-pur-Dig9pZpo.js","assets/HomeRituals-Bd2wM0p9.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-FIHIjMS5.js","assets/ia-centre-CQYQPEYJ.js","assets/ia-diagnostic-pur-BNtkwfR3.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-tableau-pur-p6UvREJe.js","assets/identite-DbIuEUk0.js","assets/index-B9NNZXXS.js","assets/index.es-ByTK9DW5.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-dg9rKihO.js","assets/jspdf.es.min-BqgqwJ7E.js","assets/JustePrix-BnXkYINy.js","assets/kkiapay-DeEwKCTE.js","assets/kkiapay-widget-CVmsl9OE.js","assets/Laboratoire-CQFOyk8w.js","assets/LaJournee-Bn_G0HCt.css","assets/LaJournee-De8Ws1oW.js","assets/le-caissier-pur-BymYtqo6.js","assets/LesPaiements-C9cEZlne.css","assets/LesPaiements-Dty_lj1P.js","assets/LettresAuDossier-DcuHKOvp.js","assets/LienMndPay-ClxQu3NS.js","assets/Marketing-897RwnIs.js","assets/MarketingBranche-nZaejY1h.js","assets/Marque-Crp6hqXd.js","assets/MesPourboires-CENjelyb.css","assets/MesPourboires-CP4Ts_8U.js","assets/MesTaches-Cc4XUDf6.css","assets/MesTaches-CxUamleb.js","assets/momo-C2ZVfV9J.js","assets/MonMois-CJvwZHLj.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/MtnMoMo-CFmZJwQm.js","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/objectifs-Lm18NlN8.js","assets/opale-DB-8Ms2c.js","assets/oreille-B1AMUmZh.js","assets/paie-du-5-CidOBifc.js","assets/paie-du-5-DeJq-K_U.css","assets/paie-du-5-pur-CPiCK8fv.js","assets/paie-par-mtn-tjdVEMMS.js","assets/PaieParMtn-DKHIGbhL.js","assets/paliers-BPjUYuuq.js","assets/Parametres-D2HA_cgm.js","assets/parcours-BIgGVhpt.js","assets/Parrainages-BaMBhaNc.js","assets/Parrainages-gAHAPB_6.css","assets/PassageAvantLeFauteuil-BhwDeLdf.js","assets/pdf-rZO1hM4g.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/periode-des-pourboires-pur-BUWqfwov.js","assets/Personas-DQo1PPsz.js","assets/Personnel-D2clMjLW.js","assets/photo-DUh9lyfw.js","assets/pilotage-D8kf1Co8.css","assets/Pourboires-CHSMewMf.js","assets/Predictions-ozB142Qc.js","assets/Prestataires-nRaod2Uv.js","assets/Prets-B6lqmqiW.js","assets/PrevisionDuMois-DlFTw3OX.css","assets/PrevisionDuMois-DXbcfbYq.js","assets/Previsions-9BU2Vg1T.css","assets/Previsions-BEc6lgM7.js","assets/previsions-pur-CYQZXEBR.js","assets/processus-pur-R6U5QcCi.js","assets/Projets-COO7WDEE.css","assets/projets-DKFtkxS5.js","assets/Projets-i_nvpYU0.js","assets/projets-pur-2ZEMRNDU.js","assets/protocoles-CsGCjBFF.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-C7LwOjx5.js","assets/qualification-Cdm_JSZr.js","assets/quiz-5qMPWZVi.js","assets/Rapport-DDjmfqEf.js","assets/Recommandations-lLS56P6J.js","assets/regler-DHR_B1Dm.css","assets/regler-NnXRa_fI.js","assets/regler-par-fedapay-pur-CFL4EbBx.js","assets/relances-pur-BacTXlI2.js","assets/releve-des-avis-BmouKwLT.js","assets/SalonFoyer-C3p2nvfN.js","assets/secretariat-admin-6m40NNxn.js","assets/Secretariat-Cy79Zw30.css","assets/Secretariat-rvb3567E.js","assets/Signatures-BtXLAkK_.js","assets/SignerUnPdf-CrZTHPgr.js","assets/Synthese-D64u_jQv.js","assets/SyntheseGraphes-BuVG0vxd.js","assets/systeme-TPy-pF7j.css","assets/Tableau-BzN9SZwl.js","assets/temps-BU6NQUan.js","assets/Textes-B5ahsrIu.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-C5ql4MA6.js","assets/tiroirs-CkDzpGy0.css","assets/trone-BGY63d-o.js","assets/trone-Dg6wh-u1.css","assets/useAudiences-Nr4JimAo.js","assets/useClotureDuJour-pO_PRFLf.js","assets/visios-BppHiIYB.js","assets/Vitrine-BWilTqQJ.css","assets/Vitrine-DqCDpTs8.js","assets/_admin-VMCWKqAm.js","assets/_contrat-B2xI5D-z.js","assets/_reuni-tp7mZC-g.js","assets/_shared-DPC5yxzT.js","assets/_signature-BYZC99ec.js","assets/_ui-BrUDlmuM.css","assets/_ui-Duh-DEzF.js"];
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
