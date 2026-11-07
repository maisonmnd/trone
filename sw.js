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
const BUILD = "20261107112258";
const A_GARDER = ["./","assets/Abonnements-CpFFJG_1.js","assets/abonnements-CUfnprAF.js","assets/Abonnements-DTY7p2DH.css","assets/Academie-DwdmszGS.js","assets/Acces-K3HdYobD.js","assets/afaire-Byx0WVD4.js","assets/AFaire-nbPWWeNa.js","assets/Agents-BB-_uPwu.js","assets/agents-donnees-jeAmSKH1.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-D79MqWLq.js","assets/Appels-Cd8X1Kec.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/Assistants-C0V58jte.js","assets/Assistants-D9i2Xwmg.css","assets/AtelierDesContenus-D3-p6F2A.css","assets/AtelierDesContenus-D_u_UfNH.js","assets/Audience-BJ6ll1fA.js","assets/Aujourdhui-B6weZXwh.js","assets/avant-le-fauteuil-lecture-Bs8DjdgI.js","assets/AvantLeFauteuil-B88N8nPC.js","assets/avis-fiches-CWKyu4rj.js","assets/AvisGoogle-15Vz5P6k.js","assets/AvisGoogle-DaPXfwX9.css","assets/BadgeEssai-CWBc3mk_.js","assets/bilan-B-bfPYR0.css","assets/bilan-BnsG9yYb.js","assets/BilanMensuel-D6U6SE2E.js","assets/Branches-zmwSVUWh.js","assets/bridges-DU4c7We4.js","assets/Caisse-B34l-Ebk.js","assets/caisse-du-soir-C6vPx-E_.css","assets/caisse-du-soir-OtRvGOAB.js","assets/Caisses-BQD1B-mS.js","assets/Calendrier-CkzOV3PL.js","assets/campagnes-pur-CvwL-VJu.js","assets/Carnet-DfYGNBHN.js","assets/carte-DNINW_HR.js","assets/carte-_W_-xBPj.css","assets/CarteModal-B-DQjVkg.js","assets/CartesCadeaux-BSHUZnyC.js","assets/Catalogue-Cce1SOHc.js","assets/CentreDeCommande-CYDunz7H.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-CRQl7NxZ.js","assets/certificat-dsi3MH5h.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-Blr63T0R.js","assets/chiffre-du-jour-pur-B4eOWB-T.js","assets/ChiffreDesPrestations-tMa96omD.js","assets/client-JJjcEulU.js","assets/cloture-du-jour-03tzPfeX.js","assets/ClotureDuTiroir-Davhk3dw.js","assets/Coffre-BvkuZ5y8.js","assets/components-DuhN6Vsz.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-CnBw9TFr.js","assets/Comptes-BHfi-1yY.js","assets/consultation-BlHL6cKk.js","assets/consultation-CRW6QcWf.css","assets/Consultations-CKrKHKKL.js","assets/consultNotes-KlVxUq8L.js","assets/Conversations-D4WwB5Zo.css","assets/Conversations-DZofpsBv.js","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-CFqp2S7x.js","assets/currency-qfIhGmrs.js","assets/Customers-Rx0u6rxo.js","assets/Dashboard-B2x7VsE_.css","assets/Dashboard-hMFSeBk5.js","assets/dates-BTyRgzVd.js","assets/Demandes-BnjcV2sp.js","assets/DepenseEnUnePhrase-BIGRlGqP.css","assets/DepenseEnUnePhrase-Bm8UKzdh.js","assets/Depenses-BwBuFvHH.js","assets/depenses-saisie-DCzPPFtx.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-g9xQu_Zm.js","assets/diagnostics-au-trone-DRWBTKUe.js","assets/Dictee-B5pQzxwN.js","assets/Dictee-D2P9yM7v.css","assets/dictee-pur-BSLsfK7F.js","assets/Discussions-BpFg7cXG.js","assets/EditeurDesOffres-BXUICpQn.js","assets/Encaissements-hqLgtPjy.js","assets/enfants-Ch1mnor5.js","assets/Engagements-Cj5S9MhG.css","assets/engagements-coffre-C25wxBWw.js","assets/Engagements-DbL7hKza.js","assets/EntreDeuxSeances-DW8yIrw3.js","assets/Evaluation-xk4-ZvH8.js","assets/Factures-Gfm7fzqV.js","assets/FenetreDesCivilites-bUeH6Yyy.js","assets/FenetreDesCivilites-zfNk1aak.css","assets/FenetreDuPoint-BWWO-OPC.js","assets/Fil-3vNxewfk.js","assets/finances-BMFnlkRx.css","assets/fon-BCwwkoW3.js","assets/fournisseurs-DB6j0sLo.js","assets/Fournisseurs-Dqo0Y5IY.js","assets/foyer-D82ul9Oa.js","assets/Gerard-Cgj-zsJh.css","assets/gerard-donnees-BQGO7Bp7.js","assets/Gerard-Dw3zmr4z.js","assets/gestes-conversation-Dx7B_jUr.js","assets/HomeRituals-BFdgzAfL.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-ByQUFt9R.js","assets/ia-centre-Qk5fR878.js","assets/ia-diagnostic-pur-BBLrGY5l.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-tableau-pur-CSRjGtTf.js","assets/identite-D_PqJKj3.js","assets/index-A81ZeGba.js","assets/index.es-De5ZwHn8.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-aAKYXUje.js","assets/jspdf.es.min-BgjRORI1.js","assets/JustePrix-TyiOA2YQ.js","assets/kkiapay-CBFhs6dO.js","assets/kkiapay-widget-DnUhUNd4.js","assets/Laboratoire-SISQHFjh.js","assets/LaJournee-Bn_G0HCt.css","assets/LaJournee-BU9ElxaH.js","assets/LesPaiements-BvdfOCbQ.css","assets/LesPaiements-ZPiRuvy3.js","assets/LettresAuDossier-CjWE-9zW.js","assets/LienMndPay-iX26iBqK.js","assets/Marketing-D7zb2l6B.js","assets/MarketingBranche-COaHhHRi.js","assets/Marque-BWnDaI18.js","assets/MesPourboires-CiqgsWID.js","assets/MesPourboires-D9I_9rZf.css","assets/MesTaches-Cc4XUDf6.css","assets/MesTaches-DGP4nwyN.js","assets/momo-C2ZVfV9J.js","assets/MonMois-BoKY4IAw.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-B-TLanQR.js","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/opale-COMo_sRT.js","assets/oreille-B1AMUmZh.js","assets/paie-du-5-Bd1ijeDn.js","assets/paie-du-5-DeJq-K_U.css","assets/paie-du-5-pur-SkV_p4xD.js","assets/PaieParMtn-BirugZLK.js","assets/paliers-DNGb6KXL.js","assets/Parametres-BVk2hEe2.js","assets/parcours-lCAT_pOc.js","assets/Parrainages-gAHAPB_6.css","assets/Parrainages-sd6UoKVH.js","assets/PassageAvantLeFauteuil-DDYZjT7T.js","assets/pdf-DbL0_ZJV.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/Personas-Bt-xYi9x.js","assets/Personnel-DANfqeaj.js","assets/photo-CrHoYI6y.js","assets/pilotage-D8kf1Co8.css","assets/Pourboires-DEIkrYT5.js","assets/Predictions-DUin8L_2.js","assets/Prestataires-CPDgHzq9.js","assets/Prets-D2czAIzg.js","assets/PrevisionDuMois-B-SIx62H.js","assets/PrevisionDuMois-DlFTw3OX.css","assets/Previsions-BhWg0YAx.js","assets/previsions-pur-Db6E1JLp.js","assets/Previsions-r4v19Anp.css","assets/processus-pur-R6U5QcCi.js","assets/Projets-COO7WDEE.css","assets/projets-CZ2eD3kH.js","assets/Projets-J6prSbwN.js","assets/projets-pur-2ZEMRNDU.js","assets/protocoles-Vxj-5ylX.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-D1o7NqTx.js","assets/qualification-Cyza5qc4.js","assets/quiz-5qMPWZVi.js","assets/Rapport-CvZAbdFj.js","assets/Recommandations-BTTTMY2Z.js","assets/regler-BbYdtjUy.js","assets/regler-C5hcM02_.css","assets/regler-la-seance-serveur-Bs6rzqZX.js","assets/relances-pur-lwRTXc5E.js","assets/releve-des-avis-DCvgn9qS.js","assets/SalonFoyer-CPiot-yH.js","assets/secretariat-admin-Br6QfEi9.js","assets/Secretariat-Cy79Zw30.css","assets/Secretariat-Mx6ERMg7.js","assets/Signatures-CUfBQXRT.js","assets/SignerUnPdf--XGAfIF_.js","assets/Synthese-D6N1wUIc.js","assets/SyntheseGraphes-mD8xwnTh.js","assets/systeme-TPy-pF7j.css","assets/Tableau-DDJbKPyn.js","assets/temps-CSTN6Frc.js","assets/Textes-BniV2Sem.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-CkDzpGy0.css","assets/tiroirs-ZW7VoDQb.js","assets/trone-ChktiJyx.js","assets/trone-CQ2DUl_d.css","assets/useAudiences-CZHp-ccU.js","assets/useClotureDuJour-mAd-NQ9d.js","assets/Vitrine-BLzcK27A.js","assets/Vitrine-BWilTqQJ.css","assets/_admin-idutgKaK.js","assets/_contrat-BVXCkJxD.js","assets/_heures-GtYxVmGK.js","assets/_reuni-BJj3-xms.js","assets/_shared-BZiKG9r3.js","assets/_signature-B6YP2LfI.js","assets/_ui-BrUDlmuM.css","assets/_ui-Df1p5iHN.js"];
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
