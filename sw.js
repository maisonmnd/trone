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
const BUILD = "20261107094231";
const A_GARDER = ["./","assets/abonnements-BiQq2RGV.js","assets/Abonnements-CeZp0r7b.js","assets/Abonnements-DTY7p2DH.css","assets/Academie-CMSRsRMw.js","assets/Acces-BTvBoIyO.js","assets/AFaire-BWtBcvCH.js","assets/afaire-DbKNlBAV.js","assets/agents-donnees-CaxlKjkb.js","assets/Agents-hlu-A8n8.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-DjLdk4N5.js","assets/Appels-cq4GL5Gu.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/Assistants-D9i2Xwmg.css","assets/Assistants-DZSXDtIM.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/AtelierDesContenus-OqB4FZwx.js","assets/Audience-CxbwmB_7.js","assets/Aujourdhui-SLBmyuJ8.js","assets/avant-le-fauteuil-lecture-pV0G5ZHM.js","assets/AvantLeFauteuil-D7PA892M.js","assets/avis-fiches-BZTOB_N0.js","assets/AvisGoogle-DaPXfwX9.css","assets/AvisGoogle-DW7ppfNB.js","assets/bilan-B-bfPYR0.css","assets/bilan-Csxo9ICE.js","assets/BilanMensuel-BomPsLJv.js","assets/Branches-ceBpxIkV.js","assets/bridges-Cf-rPDhW.js","assets/Caisse-DniU9aDc.js","assets/caisse-du-soir-Bo1hr2Z1.js","assets/caisse-du-soir-C6vPx-E_.css","assets/Caisses-DxTvMVqK.js","assets/Calendrier-ByTHXpSY.js","assets/campagnes-pur-dbbB51fU.js","assets/Carnet-DegIneLn.js","assets/carte-CRWBg4xf.js","assets/carte-_W_-xBPj.css","assets/CarteModal-D55MpLhq.js","assets/CartesCadeaux-CGOmvuF8.js","assets/Catalogue-BhCxFRAj.js","assets/CentreDeCommande-DMhy7dkV.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-BTS7N4_I.js","assets/certificat-CcXSAZ-o.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-BYibBRJP.js","assets/chiffre-du-jour-pur-C2xOw0tj.js","assets/ChiffreDesPrestations-9WizZ0HN.js","assets/client-CyNXYMTg.js","assets/cloture-du-jour-D_aL_12t.js","assets/ClotureDuTiroir-CRxG99Bh.js","assets/Coffre-FQPaJFoX.js","assets/components-yLs6qmxD.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-WZLWHo_e.js","assets/Comptes-2LL5oPR1.js","assets/consultation-CRW6QcWf.css","assets/consultation-D_6Qqfon.js","assets/Consultations-DwEzFFeB.js","assets/consultNotes-DK-YVFaS.js","assets/Conversations-D4WwB5Zo.css","assets/Conversations-DjySmuGZ.js","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-CVDf_XjG.js","assets/currency-qfIhGmrs.js","assets/Customers-CzuHaE5B.js","assets/Dashboard-B2x7VsE_.css","assets/Dashboard-DnQfHLqp.js","assets/dates-C192jfTM.js","assets/Demandes-BzufGSfV.js","assets/DepenseEnUnePhrase-BIGRlGqP.css","assets/DepenseEnUnePhrase-CeLdD4Z-.js","assets/Depenses-jnUSNImF.js","assets/depenses-saisie-Bsi65hw8.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-BRz78ptW.js","assets/diagnostics-au-trone-Htrfc4vk.js","assets/Dictee-BvwI6x5s.js","assets/Dictee-D2P9yM7v.css","assets/dictee-pur-DJSqnLow.js","assets/Discussions-CyG4HJGs.js","assets/EditeurDesOffres-DqFEK_CZ.js","assets/Encaissements-DXfShuqK.js","assets/enfants-DL8_X18S.js","assets/Engagements-B0ofo4tX.js","assets/Engagements-Cj5S9MhG.css","assets/engagements-coffre-C_Ohk2M1.js","assets/EntreDeuxSeances-xY01vhCU.js","assets/Evaluation-biDcR0oj.js","assets/Factures-Dxo8QzF3.js","assets/FenetreDesCivilites-jiYNw0BS.js","assets/FenetreDesCivilites-zfNk1aak.css","assets/FenetreDuPoint-DcDkMZQq.js","assets/Fil-D76kZS7o.js","assets/finances-BMFnlkRx.css","assets/fon-BFv0copE.js","assets/Fournisseurs-1v4jvZdW.js","assets/fournisseurs-CHfZAZNd.js","assets/foyer-DMeMReqS.js","assets/Gerard-ByoRqCn1.js","assets/Gerard-Cgj-zsJh.css","assets/gerard-donnees-DBa05KwZ.js","assets/gestes-conversation-1JG9kTin.js","assets/HomeRituals-Cv14_1Tf.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-DOrRT6Tc.js","assets/ia-centre-BpTouyai.js","assets/ia-diagnostic-pur-BBLrGY5l.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-tableau-pur-CSRjGtTf.js","assets/identite-BMBg5wPJ.js","assets/index-DuX4go-U.js","assets/index.es-C8d4Z6LL.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-Ca2DVqJs.js","assets/jspdf.es.min-D_hSe_Jq.js","assets/JustePrix-BbD3WyGu.js","assets/kkiapay-OiStFH7s.js","assets/kkiapay-widget-DnUhUNd4.js","assets/Laboratoire-DUSXxNTC.js","assets/LaJournee-Bn_G0HCt.css","assets/LaJournee-kGAgg7W3.js","assets/LesPaiements-BvdfOCbQ.css","assets/LesPaiements-CNTAPG1X.js","assets/LettresAuDossier-CKjEIg7f.js","assets/LienMndPay-CPV545eU.js","assets/Marketing-DVwugd03.js","assets/MarketingBranche-DNMJkyPs.js","assets/Marque-DBNpn-W5.js","assets/MesPourboires-CydvggHE.js","assets/MesPourboires-D9I_9rZf.css","assets/MesTaches-Cc4XUDf6.css","assets/MesTaches-COEqutyC.js","assets/momo-C2ZVfV9J.js","assets/MonMois-BCbiOHCa.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-CdQEJb2n.js","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/opale-CT9YYQzJ.js","assets/oreille-B1AMUmZh.js","assets/paie-du-5-4E8_RSb-.js","assets/paie-du-5-DeJq-K_U.css","assets/paie-du-5-pur-Dm7ldc_4.js","assets/PaieParMtn-CEolBGJj.js","assets/paliers-D4Vrwinj.js","assets/Parametres-BaKTK0sN.js","assets/parcours-DvUZOVlH.js","assets/Parrainages-Cn7_jFIy.js","assets/Parrainages-gAHAPB_6.css","assets/PassageAvantLeFauteuil-Cy65FQsp.js","assets/pdf-B-yT1vC1.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/Personas-D4U9EuHi.js","assets/Personnel-CNudDjwC.js","assets/photo-DwlWGL_k.js","assets/pilotage-D8kf1Co8.css","assets/Pourboires-CNt7ABPM.js","assets/Predictions-BKgB5MWV.js","assets/Prestataires-BypnjhLp.js","assets/Prets-Cq7ksQVK.js","assets/PrevisionDuMois-BBkw99DA.js","assets/PrevisionDuMois-DlFTw3OX.css","assets/Previsions-DG52l1ae.js","assets/previsions-pur-DuGKJlyB.js","assets/Previsions-r4v19Anp.css","assets/processus-pur-R6U5QcCi.js","assets/projets-B3jm9IuF.js","assets/Projets-COO7WDEE.css","assets/Projets-DLKythr4.js","assets/projets-pur-2ZEMRNDU.js","assets/protocoles-Dq-B3upB.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-CoUi6onp.js","assets/qualification-BXJmt7xq.js","assets/quiz-5qMPWZVi.js","assets/Rapport-CjNkeRee.js","assets/Recommandations-CZSW8jis.js","assets/regler-C5hcM02_.css","assets/regler-CqfISMFB.js","assets/regler-la-seance-serveur-Bs6rzqZX.js","assets/relances-pur-lwRTXc5E.js","assets/releve-des-avis-9KlDhSFm.js","assets/SalonFoyer-Co3om8uL.js","assets/secretariat-admin-2HvVUk_c.js","assets/Secretariat-Cy79Zw30.css","assets/Secretariat-lLpY0RXj.js","assets/Signatures-CGII8rXr.js","assets/SignerUnPdf-V0fg3pGU.js","assets/Synthese-BV2Uyn9j.js","assets/SyntheseGraphes-CPoXn8MG.js","assets/systeme-TPy-pF7j.css","assets/Tableau-IA20dGn7.js","assets/temps-BWVD2Pdj.js","assets/Textes-DLpOzRbT.css","assets/Textes-mh6SVMNp.js","assets/tiroirs-BzCDTIG9.js","assets/tiroirs-CkDzpGy0.css","assets/trone-CQ2DUl_d.css","assets/trone-CxMyDeGf.js","assets/useAudiences-C8tq1b6G.js","assets/useClotureDuJour-0BvzWQLl.js","assets/Vitrine-BWilTqQJ.css","assets/Vitrine-RpZfWgt6.js","assets/_admin-DwJugWaA.js","assets/_contrat-TiUIHg6M.js","assets/_heures-Dn1smZTc.js","assets/_reuni-sR8MVzxO.js","assets/_shared-B_KdrFSy.js","assets/_signature-DTzUkomH.js","assets/_ui-BrUDlmuM.css","assets/_ui-k6CotYnf.js"];
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
