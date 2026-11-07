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
const BUILD = "20261107131755";
const A_GARDER = ["./","assets/Abonnements-BUNvadHK.js","assets/Abonnements-DTY7p2DH.css","assets/abonnements-QvzUHh3D.js","assets/Academie-B1faRdFZ.js","assets/Acces-DqTXfyjK.js","assets/AFaire-2mvwEKjn.js","assets/afaire-DlvPWPof.js","assets/Agents-CPx4o-ai.js","assets/agents-donnees-DiTzViS-.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-tbxyepYv.js","assets/Appels-Dj5m8fS5.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/Assistants-3NdPiybW.js","assets/Assistants-D9i2Xwmg.css","assets/AtelierDesContenus-bB9ceerZ.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/Audience-Cd3y8eOI.js","assets/Aujourdhui-3OcuNTsi.js","assets/avant-le-fauteuil-lecture-Cr5i6MCh.js","assets/AvantLeFauteuil-BxrfnwN7.js","assets/avis-fiches-CSX1c9H1.js","assets/AvisGoogle-DaPXfwX9.css","assets/AvisGoogle-re47JKAW.js","assets/BadgeEssai-4-kPj2bI.js","assets/bilan-B-bfPYR0.css","assets/bilan-GYOevZIY.js","assets/BilanMensuel-CHULkRSx.js","assets/Branches-C7hrH8zv.js","assets/bridges-D2N60H-T.js","assets/caisse-du-soir-BN4deWQ9.js","assets/caisse-du-soir-C6vPx-E_.css","assets/Caisse-DYO6uiQM.js","assets/Caisses-Dy3_4MWH.js","assets/Calendrier-F7QfQH92.js","assets/campagnes-pur-ChwXRBi3.js","assets/Carnet-BWl13WYg.js","assets/carte-DLzhCKUT.js","assets/carte-_W_-xBPj.css","assets/CarteModal-CwjXVLEO.js","assets/CartesCadeaux-PlE_IYIt.js","assets/Catalogue-Bp5jVr86.js","assets/CentreDeCommande-BHFknlKy.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-DzdxnzaC.js","assets/certificat-r6KJiJ7u.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-Brh41-Ee.js","assets/chiffre-du-jour-pur-BqaZY1I6.js","assets/ChiffreDesPrestations-ByHpReBN.js","assets/client-CKKZUzl3.js","assets/cloture-du-jour-C_qLlkmT.js","assets/ClotureDuTiroir-B_Ve0Fr2.js","assets/Coffre-CUkcekUb.js","assets/components-BpKPKo-E.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-nlwchLiB.js","assets/Comptes-DlfZAc6K.js","assets/consultation-BkKspg2Z.js","assets/consultation-CRW6QcWf.css","assets/Consultations-CjP3QT-F.js","assets/consultNotes-DEyfcJvt.js","assets/Conversations-D4WwB5Zo.css","assets/Conversations-DYWJ9onF.js","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-DaYxLcoS.js","assets/currency-qfIhGmrs.js","assets/Customers-DzVLV8Zo.js","assets/Dashboard-B2x7VsE_.css","assets/Dashboard-CQwgbIvu.js","assets/dates-B6F5VnT5.js","assets/Demandes-Cblr_zvT.js","assets/DepenseEnUnePhrase-B6JYlG27.js","assets/DepenseEnUnePhrase-BIGRlGqP.css","assets/Depenses-cAlXW0Tn.js","assets/depenses-saisie-BB7Gv6U7.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-CnjmgAuH.js","assets/diagnostics-au-trone-CT2kRyeb.js","assets/Dictee-D2P9yM7v.css","assets/Dictee-DKWuxe0Q.js","assets/dictee-pur-SuxlrIyP.js","assets/Discussions-DUeExawU.js","assets/EditeurDesOffres-BinH-qsx.js","assets/Encaissements-BkTYjtUY.js","assets/enfants-Cih4ARdO.js","assets/Engagements-CHpKMv5X.js","assets/Engagements-Cj5S9MhG.css","assets/engagements-coffre-DU0H8uwC.js","assets/EntreDeuxSeances-BsJsGjZi.js","assets/Evaluation-2xn3dgom.js","assets/Factures-CmPOMdzE.js","assets/FenetreDesCivilites-xehnf9lz.js","assets/FenetreDesCivilites-zfNk1aak.css","assets/FenetreDuPoint-BllMWF_M.js","assets/Fil-BBOujnoo.js","assets/finances-BMFnlkRx.css","assets/fon-DRqvsdS_.js","assets/Fournisseurs-C9hvSkMf.js","assets/fournisseurs-D3M7GQ9o.js","assets/foyer-BYW5SQcS.js","assets/Gerard-B6VG1FT7.js","assets/Gerard-Cgj-zsJh.css","assets/gerard-donnees-DbYpwfCM.js","assets/gestes-conversation-cyjq8pRp.js","assets/HomeRituals-ojfEpl_G.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-DRbKWiZx.js","assets/ia-centre-CAiD4oqR.js","assets/ia-diagnostic-pur-BBLrGY5l.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-tableau-pur-CSRjGtTf.js","assets/identite-DGue-reg.js","assets/index-CIw35N2z.js","assets/index.es-BA_wSS7r.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-BLWg2b23.js","assets/jspdf.es.min-C-dn-OuI.js","assets/JustePrix-CxgOtJ__.js","assets/kkiapay-B7Htfbw8.js","assets/kkiapay-widget-DnUhUNd4.js","assets/Laboratoire-qaa0gawi.js","assets/LaJournee-Bn_G0HCt.css","assets/LaJournee-IkUIBexv.js","assets/LesPaiements-BvdfOCbQ.css","assets/LesPaiements-iwvXRF0M.js","assets/LettresAuDossier-DtGpUWD0.js","assets/LienMndPay-DFkJqKvm.js","assets/Marketing-Dw5BM_AA.js","assets/MarketingBranche-IkFBDTpt.js","assets/Marque-CQSQPon7.js","assets/MesPourboires-B9yX52fm.js","assets/MesPourboires-D9I_9rZf.css","assets/MesTaches-Cc4XUDf6.css","assets/MesTaches-DKhHTCT-.js","assets/momo-C2ZVfV9J.js","assets/MonMois-bJZSGaN-.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/objectifs-GikpQZzA.js","assets/opale-_aZ_E3pz.js","assets/oreille-B1AMUmZh.js","assets/paie-du-5-C2mMHN1D.js","assets/paie-du-5-DeJq-K_U.css","assets/paie-du-5-pur-BqMFYPzV.js","assets/PaieParMtn-BKiOKJN_.js","assets/paliers-DUBCd6lJ.js","assets/Parametres-qi4L2tzK.js","assets/parcours-C4NnsONu.js","assets/Parrainages-AQy73ho4.js","assets/Parrainages-gAHAPB_6.css","assets/PassageAvantLeFauteuil-CJMkDo4S.js","assets/pdf-DDN1R4M3.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/Personas-Dm-WkAzV.js","assets/Personnel-DSUi9v-i.js","assets/photo-CDBe_azT.js","assets/pilotage-D8kf1Co8.css","assets/Pourboires-BZeNsuFx.js","assets/Predictions-D6GDlDSC.js","assets/Prestataires-56GmlWuJ.js","assets/Prets-B_fAucDX.js","assets/PrevisionDuMois-Cl_EL2KV.js","assets/PrevisionDuMois-DlFTw3OX.css","assets/previsions-pur-DsPkKwSM.js","assets/Previsions-r4v19Anp.css","assets/Previsions-T9IasC0l.js","assets/processus-pur-R6U5QcCi.js","assets/Projets-COO7WDEE.css","assets/Projets-DLmEYvVx.js","assets/projets-DYSBSR1j.js","assets/projets-pur-2ZEMRNDU.js","assets/protocoles-C_Y3exn3.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-DGFG0bhi.js","assets/qualification-oqyp5C0V.js","assets/quiz-5qMPWZVi.js","assets/Rapport-CXWUGWzG.js","assets/Recommandations-BUPJ7S85.js","assets/regler-B8DLKD2N.js","assets/regler-C5hcM02_.css","assets/regler-la-seance-serveur-Bs6rzqZX.js","assets/relances-pur-lwRTXc5E.js","assets/releve-des-avis-CswfdDyD.js","assets/SalonFoyer-Cps35vDS.js","assets/secretariat-admin-A6KB4-pC.js","assets/Secretariat-CeY_qHs9.js","assets/Secretariat-Cy79Zw30.css","assets/Signatures-BzPa-3-k.js","assets/SignerUnPdf-DpBXA8db.js","assets/Synthese-D-FDixBK.js","assets/SyntheseGraphes-BUQW6uML.js","assets/systeme-TPy-pF7j.css","assets/Tableau-D4TI-Znp.js","assets/temps-BcH2hEQv.js","assets/Textes-CRv-U0lj.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-Ce3ij6X9.js","assets/tiroirs-CkDzpGy0.css","assets/trone-CQ2DUl_d.css","assets/trone-yNPNUO1O.js","assets/useAudiences-C1n8MDKX.js","assets/useClotureDuJour-eD1Djtdq.js","assets/Vitrine-BQEDRwKL.js","assets/Vitrine-BWilTqQJ.css","assets/_admin-CUjDEGOA.js","assets/_contrat-CjD8FTnZ.js","assets/_heures-PetXGTDk.js","assets/_reuni-C7SV2xJO.js","assets/_shared-B4vNI0Xy.js","assets/_signature-CQpV7Q-I.js","assets/_ui-BIHq1btV.js","assets/_ui-BrUDlmuM.css"];
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
