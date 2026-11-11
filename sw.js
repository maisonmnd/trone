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
const BUILD = "20261111124858";
const A_GARDER = ["./","assets/Abonnements-BPcCy-D9.js","assets/Abonnements-DTY7p2DH.css","assets/abonnements-XWfGR3w2.js","assets/Academie-C05tLbOK.js","assets/Acces-C7pph4CG.js","assets/AFaire-5qLRsLz2.js","assets/afaire-BbDBN3K3.js","assets/agents-donnees-BQo07IC5.js","assets/Agents-DP3K6rEv.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-N7t2ufsY.js","assets/Appels-BRZopwwA.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/Assistants-Cy0vqvQN.js","assets/Assistants-D9i2Xwmg.css","assets/AtelierDesContenus-D3-p6F2A.css","assets/AtelierDesContenus-DvlhCHvm.js","assets/Audience-CHoe5BT7.js","assets/Aujourdhui-EwD5mSte.js","assets/avant-le-fauteuil-lecture-D0zayxww.js","assets/AvantLeFauteuil-BsQjUY4f.js","assets/avis-fiches-ej0c0HBw.js","assets/AvisGoogle-DaPXfwX9.css","assets/AvisGoogle-DUYhYtQF.js","assets/BadgeEssai-BTS8Piuw.js","assets/bilan-B-bfPYR0.css","assets/bilan-CgNv3OZi.js","assets/BilanMensuel-DB_1IgEt.js","assets/Branches-CBfi2RrZ.js","assets/bridges-Ddsjk9_c.js","assets/Caisse-Aux2QSxw.js","assets/caisse-du-soir-C6vPx-E_.css","assets/caisse-du-soir-Ya9pHbLv.js","assets/Caisses-DEcJaSgo.js","assets/Calendrier-DLY9cX02.js","assets/campagnes-pur-ClERFr-a.js","assets/Carnet-DzloEu7D.js","assets/carte-DIxBTy05.js","assets/carte-_W_-xBPj.css","assets/CarteModal-AM3uaLoL.js","assets/CartesCadeaux-BjhS6FG1.js","assets/Catalogue-D6OavIpD.js","assets/CentreDeCommande-BiESHEVg.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-D598ijOz.js","assets/certificat-Bv-JPffJ.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-BBrljVAy.js","assets/chiffre-du-jour-pur-CqsNOckD.js","assets/ChiffreDesPrestations-DJZ0rHgb.js","assets/client-BRNyIrVQ.js","assets/cloture-du-jour-C-TKwU2R.js","assets/ClotureDuTiroir-CcOWlDOA.js","assets/Coffre-_KYCDQch.js","assets/components-CH_vCO-x.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-DxINwUlO.js","assets/Comptes-C7hcKK1o.js","assets/consultation-BtsOtEgP.js","assets/consultation-CRW6QcWf.css","assets/Consultations-BMe6rMar.js","assets/consultNotes-DlzVBryA.js","assets/Conversations-Clk4ZM-8.js","assets/Conversations-D4WwB5Zo.css","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-DYl2KuIG.js","assets/currency-qfIhGmrs.js","assets/Customers-COHyM-2v.js","assets/Dashboard-B2x7VsE_.css","assets/Dashboard-BWkQ4VjX.js","assets/dates-BhXYQzz_.js","assets/Demandes-Bkl2k5fi.js","assets/DepenseEnUnePhrase-B36CXT_l.js","assets/DepenseEnUnePhrase-BIGRlGqP.css","assets/Depenses-BurCNQNZ.js","assets/depenses-saisie-CBb-115T.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-DfKXghhn.js","assets/diagnostics-au-trone-B8Vou8G2.js","assets/Dictee-D2P9yM7v.css","assets/Dictee-D4D9I9vK.js","assets/dictee-pur-anlZnt4q.js","assets/Discussions-Mie9-kXH.js","assets/EditeurDesOffres-CGLTmIep.js","assets/Encaissements-5CGJfqkf.js","assets/enfants-CMceGgOq.js","assets/Engagements-Cj5S9MhG.css","assets/engagements-coffre-BGFvyL0j.js","assets/Engagements-GgMJv7V1.js","assets/EntreDeuxSeances-B8xw3nyY.js","assets/Evaluation-DJCa9U8o.js","assets/Factures-D5coNL80.js","assets/FenetreDesCivilites-B3v_vKH-.js","assets/FenetreDesCivilites-zfNk1aak.css","assets/FenetreDuPoint-A2l4-UjA.js","assets/Fil-BQESEsfA.js","assets/finances-BMFnlkRx.css","assets/fon-CLeJdjjK.js","assets/Fournisseurs-Ca5T0vmG.js","assets/fournisseurs-Cw_Kr7L4.js","assets/foyer-aNuTjUoT.js","assets/Gerard-Cgj-zsJh.css","assets/gerard-donnees-BcV6zq3K.js","assets/Gerard-DqfrRBZk.js","assets/gestes-conversation-D0TIjDDz.js","assets/HomeRituals-C2qMGVcX.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-C9tmqvdR.js","assets/ia-centre-qN516d2C.js","assets/ia-diagnostic-pur-BBLrGY5l.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-tableau-pur-CSRjGtTf.js","assets/identite-D1Vpfj2Y.js","assets/index-nOAp1A5e.js","assets/index.es-B-_fmOL9.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-D4ObYmoC.js","assets/jspdf.es.min-DSlDQTKL.js","assets/JustePrix-1UvX4kN4.js","assets/kkiapay-tWj95nyE.js","assets/kkiapay-widget-DnUhUNd4.js","assets/Laboratoire-DYypgDS-.js","assets/LaJournee-Bn_G0HCt.css","assets/LaJournee-BrsyLCTj.js","assets/LesPaiements-BvdfOCbQ.css","assets/LesPaiements-DmY4eeOy.js","assets/LettresAuDossier-BH6hdUPW.js","assets/LienMndPay-DQr7jmoj.js","assets/Marketing-Ccz3Ky5x.js","assets/MarketingBranche-DkkCvOa3.js","assets/Marque-CCow304i.js","assets/MesPourboires-BcNm65MS.js","assets/MesPourboires-CENjelyb.css","assets/MesTaches-BrPUEAbD.js","assets/MesTaches-Cc4XUDf6.css","assets/momo-C2ZVfV9J.js","assets/MonMois-DCorQOLd.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-DEI97gdQ.js","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/opale-M4VeaTaI.js","assets/oreille-B1AMUmZh.js","assets/paie-du-5-B4f2wtfM.js","assets/paie-du-5-DeJq-K_U.css","assets/paie-du-5-pur-BJjfOMo3.js","assets/PaieParMtn-DETQlM3J.js","assets/paliers-BybTuJVM.js","assets/Parametres-Dg3625Zz.js","assets/parcours-Cb056TRJ.js","assets/Parrainages-BcmYjYrM.js","assets/Parrainages-gAHAPB_6.css","assets/PassageAvantLeFauteuil-Bxm1omwE.js","assets/pdf-DttPyzNE.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/periode-des-pourboires-pur-BUWqfwov.js","assets/Personas-BTlrsmpi.js","assets/Personnel-CWOtIC9w.js","assets/photo-C7Qa6bl8.js","assets/pilotage-D8kf1Co8.css","assets/Pourboires-BW68hK8a.js","assets/Predictions-CTGd_ZLq.js","assets/Prestataires-kGbbxkgt.js","assets/Prets-WvCEE6Nw.js","assets/PrevisionDuMois-BI4qtWJL.js","assets/PrevisionDuMois-DlFTw3OX.css","assets/Previsions-C8Ku7rbx.js","assets/previsions-pur-DEypHzbv.js","assets/Previsions-r4v19Anp.css","assets/processus-pur-R6U5QcCi.js","assets/projets-C0NXw2K4.js","assets/Projets-COO7WDEE.css","assets/Projets-CzRhZvkg.js","assets/projets-pur-2ZEMRNDU.js","assets/protocoles-DPe1Kl6y.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-Dm9izKx2.js","assets/qualification-CgcSfaP8.js","assets/quiz-5qMPWZVi.js","assets/Rapport-B_sQCesc.js","assets/Recommandations-DzEVCI_R.js","assets/regler-BevduDCh.js","assets/regler-C5hcM02_.css","assets/regler-la-seance-serveur-Bs6rzqZX.js","assets/relances-pur-lwRTXc5E.js","assets/releve-des-avis-B9phq8ZP.js","assets/SalonFoyer-BndDTWsH.js","assets/secretariat-admin-CShoJapt.js","assets/Secretariat-Cy79Zw30.css","assets/Secretariat-zlcPTGx_.js","assets/Signatures-DcNWIhqA.js","assets/SignerUnPdf-Cfln2ZYp.js","assets/Synthese-BsiJDe4w.js","assets/SyntheseGraphes-YM22_okY.js","assets/systeme-TPy-pF7j.css","assets/Tableau-B0WHdHkO.js","assets/temps-B3j3gI-p.js","assets/Textes-Dgsp8phG.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-B-Q8g0R8.js","assets/tiroirs-CkDzpGy0.css","assets/trone-D5eCItfO.js","assets/trone-DbcEcV_c.css","assets/useAudiences-CPwULnZc.js","assets/useClotureDuJour-CBl18vT1.js","assets/Vitrine-BWilTqQJ.css","assets/Vitrine-Drl8QaZp.js","assets/_admin-CtdDjwaF.js","assets/_contrat-Cov7YEqn.js","assets/_heures-Dh_NhIph.js","assets/_reuni-D3dDNWJ7.js","assets/_shared-DPB3gAcu.js","assets/_signature-pA9l7RG-.js","assets/_ui-BrUDlmuM.css","assets/_ui-Cj1zSkgV.js"];
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
