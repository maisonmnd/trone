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
const BUILD = "20261026150255";
const A_GARDER = ["./","assets/Abonnements-B__FJaqV.js","assets/abonnements-P_U-Nwrt.js","assets/Academie-B_07WJeh.js","assets/Acces-D7EmLwKr.js","assets/actions-QA4pDrWT.js","assets/AFaire-C9kPP0uX.js","assets/afaire-DjsnQt63.js","assets/Agents-CSAhD7Fx.js","assets/agents-donnees-CdqgqTsb.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-BfPiFUwh.js","assets/Appels-CRnzqbSF.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/AtelierDesContenus-CaYi4E4C.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/AuComptoir-Zj9fgN8X.js","assets/Aujourdhui-DxlNjeTX.js","assets/avis-fiches-CeX6iw1F.js","assets/AvisGoogle-DaPXfwX9.css","assets/AvisGoogle-DLInuFH-.js","assets/bilan-B-bfPYR0.css","assets/bilan-C4HraaZ1.js","assets/BilanMensuel-ebgxgcwx.js","assets/Branches-DK0Z-7UE.js","assets/bridges-D65UaM1Z.js","assets/Caisse-CYl9zfuC.js","assets/caisse-du-soir-BdDXa0Oc.js","assets/Caisses-B1q3SrYC.js","assets/Calendrier-DCUR_e1h.js","assets/Carnet-CWEcJ00_.js","assets/carte-C96NiXt2.js","assets/carte-_W_-xBPj.css","assets/CarteModal-4FFlwvaQ.js","assets/CartesCadeaux-jMWWbRLy.js","assets/Catalogue-eFRF0M-Z.js","assets/CentreDeCommande-Bi8MoXGf.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-DFJVr6o-.js","assets/certificat-NiMYtHbE.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-Ds5rZrjS.js","assets/chiffre-du-jour-pur-Cbc8EMtM.js","assets/ChiffreDesPrestations-7JKKSLSr.js","assets/client-yV8WUHaq.js","assets/ClotureDuTiroir-C6vPx-E_.css","assets/ClotureDuTiroir-Crgna0PO.js","assets/Coffre-pV0e70XL.js","assets/components-DQ_rN3f5.js","assets/compte-courant-ByzulCEN.js","assets/compte-nKuuCsgd.js","assets/CompteCourant-BOnDWo_k.js","assets/Comptes-DQ-3t7R7.js","assets/Comptoir-Cd00N3kZ.js","assets/consultation-bvgjZYGQ.js","assets/consultation-CRW6QcWf.css","assets/Consultations-BtnanXEv.js","assets/consultNotes-Cg991qFe.js","assets/Conversations-CbV2GjWA.js","assets/Conversations-D4WwB5Zo.css","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-DNjRjrlE.js","assets/currency-qfIhGmrs.js","assets/Customers-DIMQdpjr.js","assets/Dashboard-13HpEBHu.js","assets/Dashboard-B8qK6Flt.css","assets/dates-CME0vhXg.js","assets/Demandes-DjfmeqnW.js","assets/Depenses-pDd3j7P2.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-DOEQZ2H-.js","assets/diagnostics-au-trone-CKEHzs91.js","assets/Discussions-WJZ1BgN-.js","assets/Encaissements-DHDbsmJb.js","assets/enfants-BMWcWlPQ.js","assets/Engagements-Cj5S9MhG.css","assets/Engagements-Dk6KIB5y.js","assets/EntreDeuxSeances-VsQXDLJ_.js","assets/equipe-B_9ZHz24.css","assets/Evaluation-BhNSf0DN.js","assets/FacturePrestataire-CAIgpXj0.js","assets/Factures-C6FDZwe7.js","assets/Fil-CGI6Fqn1.js","assets/finances-BMFnlkRx.css","assets/fon-CKLYnXrF.js","assets/fon-pur-CgVkbJ8O.js","assets/fournisseurs-CEyI6e1h.js","assets/Fournisseurs-eeL-pt_Z.js","assets/foyer-G-6696ZN.js","assets/gestes-conversation-D5xJhdd6.js","assets/HomeRituals-CsC9uczT.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-BFXWE5Ys.js","assets/ia-diagnostic-pur-BulIFgZQ.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-recu-pur-DcucZqpR.js","assets/identite-7z7w8puo.js","assets/index-CtqVr8Di.js","assets/index.es-5nSjk7bV.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-CuJrqvlB.js","assets/jspdf.es.min-BKW-64QB.js","assets/JustePrix-DLNwIrFP.js","assets/kkiapay-DdWmX2RD.js","assets/kkiapay-widget-DnUhUNd4.js","assets/Laboratoire-B2soxeQe.js","assets/laboratoire-Bb56UW7t.js","assets/LettresAuDossier-B869njCd.js","assets/LienMndPay-EDnnyU0j.js","assets/maisons-CSSFrqZy.js","assets/Marketing-B8yGJAzn.js","assets/Marque-B0wMi481.js","assets/MesTaches-Cc4XUDf6.css","assets/MesTaches-Cj2OIQ4m.js","assets/momo-C2ZVfV9J.js","assets/MonMois-BbUJkzFl.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-des-fauteuils-pur-CW46U8VG.js","assets/objectifs-DZ8k2F5c.js","assets/paliers-An-BrQNL.js","assets/Parametres-DPiwbK44.js","assets/parcours-Dgy07oKS.js","assets/Parrainages-gAHAPB_6.css","assets/Parrainages-Zsb9OUvT.js","assets/pdf-BI6bJC95.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/Personas-C0ooj6eW.js","assets/Personnel-FyoVQIia.js","assets/photo-Cn9s6ay5.js","assets/pilotage-D8kf1Co8.css","assets/Predictions-C6dfMAkz.js","assets/Prestataires-DO2V3S_o.js","assets/prestataires-QQaOz4vx.js","assets/Prets-B6iPwsyX.js","assets/prevision-du-mois-pur-BiqzNpDz.js","assets/Previsions-4r5w3qg2.js","assets/Previsions-D-0__Buz.css","assets/Projets-COO7WDEE.css","assets/Projets-Dv9IjpKS.js","assets/projets-f-BOow15.js","assets/projets-pur-2ZEMRNDU.js","assets/protocoles-imITf20g.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-BE-GwABS.js","assets/qualification-bANOzkmm.js","assets/quiz-5qMPWZVi.js","assets/Rapport-CLj_Debl.js","assets/RattacherUneCarte-zEHh1fPf.js","assets/Recommandations-DtMMUGYy.js","assets/regler-C5hcM02_.css","assets/regler-la-seance-serveur-BpExlC5z.js","assets/regler-LkR2PeiL.js","assets/relances-pur-DsIo28uB.js","assets/releve-des-avis-DWIUqgTK.js","assets/SalonFoyer-DLyvAJNu.js","assets/secretariat-admin-lqHBQsx9.js","assets/Secretariat-BlcF4lfS.js","assets/Secretariat-Cy79Zw30.css","assets/Signatures-B3RxYwdg.js","assets/SignerUnPdf-CPiIvGor.js","assets/Synthese-CAKgtBXS.js","assets/SyntheseGraphes-BLd91eJa.js","assets/systeme-C3XFIa8E.css","assets/Tableau-DMe2_F6c.js","assets/Textes-CqOk41mw.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-BXZFeeuL.js","assets/trace-du-moyen-pur-Bx8-suHn.js","assets/trone-C4ou_wdD.js","assets/trone-D94Wc7R1.css","assets/ui-DdXQM5lD.js","assets/useAudiences-Cesw1-0z.js","assets/vente-C7YWXkHo.css","assets/Vitrine-BW7Nir6g.js","assets/Vitrine-BWilTqQJ.css","assets/_admin-DxYMSPDY.js","assets/_contrat-Cp0hMp-w.js","assets/_heures-D18F5PO1.js","assets/_reuni-C_YrLfVI.js","assets/_shared-D2BFj1Hq.js","assets/_signature-TUZyEpPU.js","assets/_ui-BWMA-PlM.css","assets/_ui-VAFNw7FG.js"];
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
