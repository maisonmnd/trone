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
const BUILD = "20261107155312";
const A_GARDER = ["./","assets/abonnements-BnYSY_xB.js","assets/Abonnements-CwidB6kR.js","assets/Abonnements-DTY7p2DH.css","assets/Academie-BZx6OH9S.js","assets/Acces-BLxObM50.js","assets/afaire-BpxTL2B1.js","assets/AFaire-DgliwBYc.js","assets/agents-donnees-WbxAngbm.js","assets/Agents-JJ6Lk7DV.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-Fmdm4gqB.js","assets/Appels-DBiDFvcm.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/Assistants-B0-uLoVF.js","assets/Assistants-D9i2Xwmg.css","assets/AtelierDesContenus-D3-p6F2A.css","assets/AtelierDesContenus-DbLfAFTC.js","assets/Audience-CYYCLkNk.js","assets/Aujourdhui-DJnXl7pY.js","assets/avant-le-fauteuil-lecture-ByvP_Vxy.js","assets/AvantLeFauteuil-DbhRoP1r.js","assets/avis-fiches-BDNEKrf_.js","assets/AvisGoogle-CiHgaaRN.js","assets/AvisGoogle-DaPXfwX9.css","assets/BadgeEssai-qop6dROw.js","assets/bilan-B-bfPYR0.css","assets/bilan-gfI5hH-w.js","assets/BilanMensuel-BaFN_Fmk.js","assets/Branches-t-WFnC3y.js","assets/bridges-BFCdo1Ya.js","assets/Caisse-BOCSUkal.js","assets/caisse-du-soir-C6vPx-E_.css","assets/caisse-du-soir-jf91fg1x.js","assets/Caisses-DN3ILq4I.js","assets/Calendrier-Bv72lcMU.js","assets/campagnes-pur-dU58py0x.js","assets/Carnet-4rkxfHre.js","assets/carte-CPy-fBw8.js","assets/carte-_W_-xBPj.css","assets/CarteModal-D-K7CLdy.js","assets/CartesCadeaux-NuootCzw.js","assets/Catalogue-DEhr74m_.js","assets/CentreDeCommande-CzQGnWoj.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-D1PqWHXr.js","assets/certificat-B4uRlqkb.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-DWufGFNc.js","assets/chiffre-du-jour-pur-Cb4DAwWS.js","assets/ChiffreDesPrestations-B2qmM-kU.js","assets/client-DpomWWnN.js","assets/cloture-du-jour-LUwPls0-.js","assets/ClotureDuTiroir-4yMpygcl.js","assets/Coffre-2D4iY2cd.js","assets/components-HhVEYMlT.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-DzpI_PER.js","assets/Comptes-3l1Ng_7G.js","assets/consultation-01xMN05d.js","assets/consultation-CRW6QcWf.css","assets/Consultations-D7UA2hWl.js","assets/consultNotes-DhA2D7WX.js","assets/Conversations-BRuFjMYQ.js","assets/Conversations-D4WwB5Zo.css","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-CZnHabOp.js","assets/currency-qfIhGmrs.js","assets/Customers-D4_HCCS7.js","assets/Dashboard-B2x7VsE_.css","assets/Dashboard-BL5zGpy-.js","assets/dates-BdMZnv_6.js","assets/Demandes-00I_usDk.js","assets/DepenseEnUnePhrase-BIGRlGqP.css","assets/DepenseEnUnePhrase-BKvkwsQR.js","assets/Depenses-B-GzK4Ap.js","assets/depenses-saisie-DTeWQleO.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-O4_oz7vV.js","assets/diagnostics-au-trone-Castt1GM.js","assets/Dictee-D2P9yM7v.css","assets/Dictee-DvjL4RU7.js","assets/dictee-pur-CsG7mdhm.js","assets/Discussions-C2MwLSc8.js","assets/EditeurDesOffres-BIydaBt8.js","assets/Encaissements-DpGt0pfW.js","assets/enfants-Cq__8n_L.js","assets/Engagements-Cj5S9MhG.css","assets/engagements-coffre-IUzfcRI4.js","assets/Engagements-DjVBVWSe.js","assets/EntreDeuxSeances-BKaC0gxO.js","assets/Evaluation-DrVAbSNe.js","assets/Factures-C37Z9J-1.js","assets/FenetreDesCivilites-ClQ927QM.js","assets/FenetreDesCivilites-zfNk1aak.css","assets/FenetreDuPoint-D-biqqu3.js","assets/Fil-BCvEINml.js","assets/finances-BMFnlkRx.css","assets/fon-D6kpjzY4.js","assets/fournisseurs-BaJ5JgH8.js","assets/Fournisseurs-BT_-sI4E.js","assets/foyer-nN8HbANc.js","assets/Gerard-Cgj-zsJh.css","assets/Gerard-D6oa9L5q.js","assets/gerard-donnees-Aa5hylqf.js","assets/gestes-conversation-2gPDJUH1.js","assets/HomeRituals-CkKLcb49.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-CPDifKeZ.js","assets/ia-centre-DPAqepTC.js","assets/ia-diagnostic-pur-BBLrGY5l.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-tableau-pur-CSRjGtTf.js","assets/identite-i2vamB1m.js","assets/index-CHxgnKUK.js","assets/index.es-DFfzGLwI.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-XLm9sa6o.js","assets/jspdf.es.min-C2uBGO8h.js","assets/JustePrix-DyeO721O.js","assets/kkiapay-4Ig4krwi.js","assets/kkiapay-widget-DnUhUNd4.js","assets/Laboratoire-coGkgNSN.js","assets/LaJournee-Bn_G0HCt.css","assets/LaJournee-_Ti2Mrmt.js","assets/LesPaiements-BvdfOCbQ.css","assets/LesPaiements-BXajfgTa.js","assets/LettresAuDossier-C6BMUEu6.js","assets/LienMndPay-D6DaE4tA.js","assets/Marketing-DnOsysvX.js","assets/MarketingBranche-Cpv7ovxJ.js","assets/Marque-ylM8fKM8.js","assets/MesPourboires-CurRM9f0.js","assets/MesPourboires-D9I_9rZf.css","assets/MesTaches-Cc4XUDf6.css","assets/MesTaches-DuouomVT.js","assets/momo-C2ZVfV9J.js","assets/MonMois-DiRutxqH.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/objectifs-fsG6THGj.js","assets/opale-BOvm_ZBU.js","assets/oreille-B1AMUmZh.js","assets/paie-du-5-CKMw5Xjq.js","assets/paie-du-5-DeJq-K_U.css","assets/paie-du-5-pur-DW6xNni0.js","assets/PaieParMtn-ChFToI2S.js","assets/paliers-3JVNYOzS.js","assets/Parametres-D9tYdnyX.js","assets/parcours-BmO7-HGm.js","assets/Parrainages-DgEd79Wx.js","assets/Parrainages-gAHAPB_6.css","assets/PassageAvantLeFauteuil-CPJ3JUFD.js","assets/pdf-TU7RiRsf.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/Personas-D_QkZhE4.js","assets/Personnel-Cwcn8Cc1.js","assets/photo-BgKmglr2.js","assets/pilotage-D8kf1Co8.css","assets/Pourboires-BlyyUBRy.js","assets/Predictions-CrDN_22M.js","assets/Prestataires-PFCp1QRB.js","assets/Prets-C4a5DGdI.js","assets/PrevisionDuMois-DlFTw3OX.css","assets/PrevisionDuMois-DRhCWx0o.js","assets/previsions-pur-cTiAHkxF.js","assets/Previsions-r4v19Anp.css","assets/Previsions-y4ac5h9f.js","assets/processus-pur-R6U5QcCi.js","assets/Projets-COO7WDEE.css","assets/Projets-DCWCGMEb.js","assets/projets-DJxcT1VB.js","assets/projets-pur-2ZEMRNDU.js","assets/protocoles-CJn77qPT.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-DmNex9Jx.js","assets/qualification-3r1NEzh2.js","assets/quiz-5qMPWZVi.js","assets/Rapport-T4CxMI-W.js","assets/Recommandations-B-L_cQnN.js","assets/regler-C5hcM02_.css","assets/regler-DNFL7lv8.js","assets/regler-la-seance-serveur-Bs6rzqZX.js","assets/relances-pur-lwRTXc5E.js","assets/releve-des-avis-CmDURTen.js","assets/SalonFoyer-BXKm8wF2.js","assets/secretariat-admin-SKO46zsA.js","assets/Secretariat-Crc4qJWo.js","assets/Secretariat-Cy79Zw30.css","assets/Signatures-Bhi-hTL7.js","assets/SignerUnPdf-CntOUXM9.js","assets/Synthese-Dy30jApl.js","assets/SyntheseGraphes-ehnVKRP7.js","assets/systeme-TPy-pF7j.css","assets/Tableau-C9EpJhjq.js","assets/temps-8RwlUy3J.js","assets/Textes-BzySZYz3.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-CkDzpGy0.css","assets/tiroirs-CXvEHVib.js","assets/trone-CQ2DUl_d.css","assets/trone-C_Ljeod6.js","assets/useAudiences-okhq48GD.js","assets/useClotureDuJour-LzUtfaYI.js","assets/Vitrine-BWilTqQJ.css","assets/Vitrine-dSrW2ZrB.js","assets/_admin-UmpapGF3.js","assets/_contrat-aUle7-tF.js","assets/_heures-DJ3FSwPO.js","assets/_reuni-vq_KQYQ6.js","assets/_shared-VLGny_QD.js","assets/_signature-CikytB-p.js","assets/_ui-BrUDlmuM.css","assets/_ui-DD48oozk.js"];
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
