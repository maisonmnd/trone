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
const BUILD = "20261029195719";
const A_GARDER = ["./","assets/abonnements-CRx5jGs3.js","assets/Abonnements-IAKEQXmo.js","assets/Academie-BOZdoGFp.js","assets/Acces-i5ZpJ5fm.js","assets/actions-CJi23IhO.js","assets/AFaire-CIXGz_cG.js","assets/afaire-CLYYzsde.js","assets/Agents-Csi8xn2S.js","assets/agents-donnees-BUOp-fSV.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-DsYrgekE.js","assets/Appels-DL5FsrsS.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/AtelierDesContenus-C3gcHwID.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/AuComptoir-CE-6YzxZ.js","assets/Audience-DN-KAgxx.js","assets/Aujourdhui-CErZ3dij.js","assets/avis-fiches-bQI6CHXx.js","assets/AvisGoogle-DaPXfwX9.css","assets/AvisGoogle-gWES_pbH.js","assets/bilan-B-bfPYR0.css","assets/bilan-DVp51lum.js","assets/BilanMensuel-CWz6gpqA.js","assets/Branches-BRDV1bZD.js","assets/bridges-BKrkA6EG.js","assets/caisse-du-soir-CaU2K82n.js","assets/Caisse-DZQAk52h.js","assets/Caisses-D5D1GaZb.js","assets/Calendrier-BPM05oQN.js","assets/campagnes-pur-CzGLwE6X.js","assets/Carnet-BZgS4ViP.js","assets/carte-BO24Zu2s.js","assets/carte-_W_-xBPj.css","assets/CarteModal-lMzrwVwV.js","assets/CartesCadeaux-CsHcc8bX.js","assets/Catalogue-BLHkZF3k.js","assets/CentreDeCommande-D3vA7Yyb.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-YSm6AkKO.js","assets/certificat-oa05CIXZ.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-Begiqqoh.js","assets/chiffre-du-jour-pur-DtfxHc9_.js","assets/ChiffreDesPrestations-8KHF7Fs7.js","assets/client-DMexWY4m.js","assets/ClotureDuTiroir-BMBRhQP9.js","assets/ClotureDuTiroir-C6vPx-E_.css","assets/Coffre-iLo7QTTz.js","assets/components-DPlq9vhm.js","assets/compte-CKIlNq0K.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-P6qtwa0M.js","assets/Comptes-BLyYDc9e.js","assets/Comptoir-D_jmuh8R.js","assets/consultation-CRW6QcWf.css","assets/consultation-DYS0Ezx2.js","assets/Consultations-BUttxEzA.js","assets/consultNotes-D-LAaQ5k.js","assets/Conversations-D4WwB5Zo.css","assets/Conversations-ulLb41Hc.js","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-Cz0rq3En.js","assets/currency-qfIhGmrs.js","assets/Customers-CFJ2rGXD.js","assets/Dashboard-B7ZsMm-G.js","assets/Dashboard-zjGteuUE.css","assets/dates-BtN4F0kp.js","assets/Demandes-rimiqsgL.js","assets/Depenses-BMtU5FIa.js","assets/dernier-message-pur-CBYWnq8m.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-2ITzfYhe.js","assets/diagnostics-au-trone-BckBf7wd.js","assets/Discussions-Cht-fwQP.js","assets/EditeurDesOffres-Bo1ZRxRp.js","assets/Encaissements-Cp24nxA0.js","assets/enfants-Pj0iRXl8.js","assets/Engagements-Cj5S9MhG.css","assets/Engagements-w2V55XRB.js","assets/EntreDeuxSeances-BpVQijsh.js","assets/equipe-B_9ZHz24.css","assets/Evaluation-CJ9NRyav.js","assets/FacturePrestataire-DFdynMPW.js","assets/Factures-D44vbqtI.js","assets/FenetreDesCivilites-fF65zu6h.js","assets/FenetreDesCivilites-zfNk1aak.css","assets/FenetreDuPoint-CH8N5ZtI.js","assets/Fil-Bfvqh4dV.js","assets/finances-BMFnlkRx.css","assets/fon-Bjc89GQk.js","assets/fon-pur-CgVkbJ8O.js","assets/fournisseurs-B1VmqXzi.js","assets/Fournisseurs-DklMswOu.js","assets/foyer-DgzVFE9m.js","assets/Gerard-C-ISKNNx.js","assets/Gerard-DjWZ3MUn.css","assets/gerard-donnees-NHHQN5KR.js","assets/gestes-conversation-BrzgsV_p.js","assets/HomeRituals-BAReTsA6.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-DP-g88NV.js","assets/ia-centre-DjneW23d.js","assets/ia-diagnostic-pur-hHYxp10Y.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-recu-pur-DcucZqpR.js","assets/identite-gpT1toYq.js","assets/index-v-X-xFqr.js","assets/index.es-CSNVRDtf.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-6sIExV2I.js","assets/jspdf.es.min-C3EsusYt.js","assets/JustePrix-BZ69bNfx.js","assets/kkiapay-BB0BUteg.js","assets/kkiapay-widget-DnUhUNd4.js","assets/laboratoire-BONyLQtC.js","assets/Laboratoire-DpLPmnWH.js","assets/LettresAuDossier-DjFZlknF.js","assets/LienMndPay-DFaqCMg1.js","assets/maisons-CSSFrqZy.js","assets/Marketing-CxYqdbCO.js","assets/MarketingBranche-D8ZwDgHB.js","assets/Marque-Cqapoqwz.js","assets/MesTaches-Cc4XUDf6.css","assets/MesTaches-CUioInLE.js","assets/momo-B-QSeWY6.js","assets/MonMois-CNEw473m.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-BCh_0NNL.js","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/paliers-Bu_PeGVA.js","assets/Parametres-CEXp9Ou-.js","assets/parcours-CZrdemy5.js","assets/Parrainages-BYB0Y27m.js","assets/Parrainages-gAHAPB_6.css","assets/pdf-BOEs4s-3.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/Personas-CSG8h5zc.js","assets/Personnel-DAOdrY0t.js","assets/photo-C0I-8KaT.js","assets/pilotage-D8kf1Co8.css","assets/Predictions-OVth5lMf.js","assets/prestataires-BBZOSp1P.js","assets/Prestataires-DUmflTtY.js","assets/Prets-BWxUW7CN.js","assets/prevision-du-mois-pur-D6sJa5lw.js","assets/Previsions-B0DGCn-H.js","assets/Previsions-D-0__Buz.css","assets/previsions-pur-CSjYP59B.js","assets/processus-pur-BLN25j-E.js","assets/projets-CLbkG6N-.js","assets/Projets-COO7WDEE.css","assets/Projets-Df4ivSTV.js","assets/projets-pur-2ZEMRNDU.js","assets/protocoles-BuWx-47c.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-BJdVc0__.js","assets/qualification-CAaxyuS9.js","assets/quiz-5qMPWZVi.js","assets/Rapport-DgnIwpIE.js","assets/RattacherUneCarte-DOFidq1j.js","assets/Recommandations-DP5xNVkO.js","assets/regler-C5hcM02_.css","assets/regler-ChUDwfIb.js","assets/regler-la-seance-serveur-Bs6rzqZX.js","assets/relances-pur-CTGdiNru.js","assets/releve-des-avis-Cl8FJ1cq.js","assets/SalonFoyer-n0_zaswo.js","assets/secretariat-admin-B-FHMCke.js","assets/Secretariat-Cy79Zw30.css","assets/Secretariat-IN3AHtWU.js","assets/Signatures-B4KWzLWl.js","assets/SignerUnPdf-BYeEFf1n.js","assets/Synthese-B_KVskwk.js","assets/SyntheseGraphes-3vePu_fI.js","assets/systeme-TPy-pF7j.css","assets/Tableau-CPoHXiyi.js","assets/temps-Vdj92gfD.js","assets/Textes-DLpOzRbT.css","assets/Textes-DXZ1M7Ji.js","assets/tiroirs-DY0Zxdl_.js","assets/trace-du-moyen-pur-Bx8-suHn.js","assets/trone-BMdkuVGH.css","assets/trone-CpG9O8Cm.js","assets/ui-BGoXFwi2.js","assets/useAudiences-d8MbqjlC.js","assets/vente-C7YWXkHo.css","assets/Vitrine-BWilTqQJ.css","assets/Vitrine-CEDV593Y.js","assets/_admin-B-vFutzD.js","assets/_contrat-DV57CSR1.js","assets/_heures-CbKJEC6s.js","assets/_reuni-DHBh7t5i.js","assets/_shared-CVrn3B1P.js","assets/_signature-GgZ44ULV.js","assets/_ui-BWMA-PlM.css","assets/_ui-tIOIR4fh.js"];
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
