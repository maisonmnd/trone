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
const BUILD = "20261107171513";
const A_GARDER = ["./","assets/abonnements-Bc4OmEui.js","assets/Abonnements-D78G5VsM.js","assets/Abonnements-DTY7p2DH.css","assets/Academie-5yXAQ6sA.js","assets/Acces-UD68Rnd4.js","assets/AFaire-BoCivGCs.js","assets/afaire-Bv56YwwQ.js","assets/Agents-CHyTTAM8.js","assets/agents-donnees-Bz1BNmKq.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-BR99OLiB.js","assets/Appels-WqHCE8LR.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/Assistants-D9i2Xwmg.css","assets/Assistants-DMDictDz.js","assets/AtelierDesContenus-CLnGritI.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/Audience-BphlBlgg.js","assets/Aujourdhui-ab5bwqpx.js","assets/avant-le-fauteuil-lecture-DGZ9Jywc.js","assets/AvantLeFauteuil-CT5Ehgzt.js","assets/avis-fiches-EwjGI5YS.js","assets/AvisGoogle-BOPyUVVT.js","assets/AvisGoogle-DaPXfwX9.css","assets/BadgeEssai-BtHDN4wP.js","assets/bilan-B-bfPYR0.css","assets/bilan-DiOj4POR.js","assets/BilanMensuel-CnnLebZQ.js","assets/Branches-B9LtwEgt.js","assets/bridges-CG15MDX3.js","assets/Caisse-BDLWNJvS.js","assets/caisse-du-soir-C6vPx-E_.css","assets/caisse-du-soir-D4cBDY9n.js","assets/Caisses-DM2RAaW0.js","assets/Calendrier-Cp79IWgf.js","assets/campagnes-pur-DSPtVCyZ.js","assets/Carnet-sgCQUL4i.js","assets/carte-DGSjrWpX.js","assets/carte-_W_-xBPj.css","assets/CarteModal-C4VEIcOw.js","assets/CartesCadeaux-DSkBrxTF.js","assets/Catalogue-CSaLBCtg.js","assets/CentreDeCommande-Du8kyJhp.css","assets/CentreDeCommande-wo_vlyDY.js","assets/Cercle-5bvp2kmA.js","assets/certificat-BG4IdDg7.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-DR40PYGD.js","assets/chiffre-du-jour-pur-CuY00Q5b.js","assets/ChiffreDesPrestations-DyWWl_SI.js","assets/client-D9kGSlDf.js","assets/cloture-du-jour-CLm2BQjG.js","assets/ClotureDuTiroir-BFQyPhEV.js","assets/Coffre-DoYBCPWa.js","assets/components-wyWyW0lz.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-D27kEYeN.js","assets/Comptes-DEMd7SaU.js","assets/consultation-Ck5NPo7p.js","assets/consultation-CRW6QcWf.css","assets/Consultations-CKdoHbD-.js","assets/consultNotes-KtyA9z2T.js","assets/Conversations-D4WwB5Zo.css","assets/Conversations-DXNU1myZ.js","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-C6IShuOp.js","assets/currency-qfIhGmrs.js","assets/Customers-Cy10KZVP.js","assets/Dashboard-B2x7VsE_.css","assets/Dashboard-BlO0ygHL.js","assets/dates-B_I-kjPX.js","assets/Demandes-BukuCtTE.js","assets/DepenseEnUnePhrase-BIGRlGqP.css","assets/DepenseEnUnePhrase-cr3lYhh7.js","assets/Depenses-BrL3RwiG.js","assets/depenses-saisie-BvEAQ1Lo.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-5pDXi_ky.js","assets/diagnostics-au-trone-DzWVFdya.js","assets/Dictee-CILYdmOE.js","assets/Dictee-D2P9yM7v.css","assets/dictee-pur-C1_jU1Ba.js","assets/Discussions-Dz3Oh7WF.js","assets/EditeurDesOffres-DrBEr6NU.js","assets/Encaissements-DiQ1agBM.js","assets/enfants-BFfG2YQ7.js","assets/Engagements-Cj5S9MhG.css","assets/engagements-coffre-bK8c0atR.js","assets/Engagements-DtGrcfKf.js","assets/EntreDeuxSeances-CJ3sTJgs.js","assets/Evaluation-DwUhDR2U.js","assets/Factures-BQ-aJU0v.js","assets/FenetreDesCivilites-Cgh07Bu5.js","assets/FenetreDesCivilites-zfNk1aak.css","assets/FenetreDuPoint-m_NSnpe5.js","assets/Fil-B1chqqYj.js","assets/finances-BMFnlkRx.css","assets/fon-CVnNLIbw.js","assets/fournisseurs-BCi0FGpl.js","assets/Fournisseurs-CtqGvvBa.js","assets/foyer-E2Av4HcJ.js","assets/Gerard-Cgj-zsJh.css","assets/gerard-donnees-BRXWlQNR.js","assets/Gerard-qC8GOAXB.js","assets/gestes-conversation-BYoQbCnh.js","assets/HomeRituals-DS7Wcz79.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-BM2f_8rW.js","assets/ia-centre-BAg7rwrw.js","assets/ia-diagnostic-pur-BBLrGY5l.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-tableau-pur-CSRjGtTf.js","assets/identite-0g3pzhig.js","assets/index-DBTBV5XQ.js","assets/index.es-cq_GOQIE.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-DHHGJsXV.js","assets/jspdf.es.min-BcHo6aRp.js","assets/JustePrix-B5jNG4V5.js","assets/kkiapay-BeGqxzWN.js","assets/kkiapay-widget-DnUhUNd4.js","assets/Laboratoire-CnYKMP9a.js","assets/LaJournee-Bn_G0HCt.css","assets/LaJournee-ZA_Y0P5F.js","assets/LesPaiements-BvdfOCbQ.css","assets/LesPaiements-D31jp1vk.js","assets/LettresAuDossier-BduNbZPB.js","assets/LienMndPay-B_7EDvDu.js","assets/Marketing-DH_TZRV0.js","assets/MarketingBranche-l_v4NImP.js","assets/Marque-CAl8TDDM.js","assets/MesPourboires-D9I_9rZf.css","assets/MesPourboires-DIf55W0H.js","assets/MesTaches-Cc4XUDf6.css","assets/MesTaches-mLRUOJKA.js","assets/momo-C2ZVfV9J.js","assets/MonMois-B7wvO_ym.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-Bn4Ysfs6.js","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/opale-BpTR5rtJ.js","assets/oreille-B1AMUmZh.js","assets/paie-du-5-DaZG6fDF.js","assets/paie-du-5-DeJq-K_U.css","assets/paie-du-5-pur-BYQd25iy.js","assets/PaieParMtn-aYCKSR1f.js","assets/paliers-CO1ZNyqB.js","assets/Parametres-cDHGawTs.js","assets/parcours-61iHceNt.js","assets/Parrainages-B1h6Ohfa.js","assets/Parrainages-gAHAPB_6.css","assets/PassageAvantLeFauteuil-DmUjm25_.js","assets/pdf-BzqmjwHX.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/Personas-Y4FQbia-.js","assets/Personnel-BumDk-o-.js","assets/photo-CtYwDoGV.js","assets/pilotage-D8kf1Co8.css","assets/Pourboires-C114hOJn.js","assets/Predictions-BcHicoe3.js","assets/Prestataires-DwKF2kcW.js","assets/Prets-GHM4JegC.js","assets/PrevisionDuMois-DlFTw3OX.css","assets/PrevisionDuMois-mMTjVxZi.js","assets/Previsions-CNhh6-A7.js","assets/previsions-pur-DJgQQ8Zm.js","assets/Previsions-r4v19Anp.css","assets/processus-pur-R6U5QcCi.js","assets/Projets-COO7WDEE.css","assets/projets-DPmJqOSP.js","assets/Projets-fveBBkpk.js","assets/projets-pur-2ZEMRNDU.js","assets/protocoles-C0AUvvPn.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-BwQxLacj.js","assets/qualification-CoRbSjgS.js","assets/quiz-5qMPWZVi.js","assets/Rapport-Lp2FcEbs.js","assets/Recommandations-BiE7jsls.js","assets/regler-C5hcM02_.css","assets/regler-D97LYIaP.js","assets/regler-la-seance-serveur-Bs6rzqZX.js","assets/relances-pur-lwRTXc5E.js","assets/releve-des-avis-tED_24cF.js","assets/SalonFoyer-DCWn2E-c.js","assets/secretariat-admin-BlQh9zkH.js","assets/Secretariat-Cy79Zw30.css","assets/Secretariat-rtpjbsUD.js","assets/Signatures-C4yY2XNR.js","assets/SignerUnPdf-4lnPy9Uf.js","assets/Synthese-D3pTYMzq.js","assets/SyntheseGraphes-DWtvz5WD.js","assets/systeme-TPy-pF7j.css","assets/Tableau-D4hNIhkU.js","assets/temps-BCtYBJtt.js","assets/Textes-CXpz6s4U.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-CkDzpGy0.css","assets/tiroirs-CZCzNph7.js","assets/trone-CAHVwqzQ.js","assets/trone-CQ2DUl_d.css","assets/useAudiences-DYa5tssV.js","assets/useClotureDuJour-XHw1GCS1.js","assets/Vitrine-BQX-OtbB.js","assets/Vitrine-BWilTqQJ.css","assets/_admin-BFMI2Ok2.js","assets/_contrat-DmULmi3N.js","assets/_heures-CR3w5xW3.js","assets/_reuni-MNVOwnbi.js","assets/_shared-BfC2BLjP.js","assets/_signature-CfiWBvNW.js","assets/_ui-BQHKW410.js","assets/_ui-BrUDlmuM.css"];
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
