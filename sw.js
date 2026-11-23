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
const BUILD = "20261123122641";
const A_GARDER = ["./","assets/Abonnements-CgGzDzmn.js","assets/abonnements-DMsd9SQ9.js","assets/Academie-9oi01nxr.js","assets/Acces-DNulLYJa.js","assets/afaire-DtXeQA58.js","assets/AFaire-Z4WwZjyW.js","assets/Agents-C3x4zioP.js","assets/agents-donnees-BU3wr9Fl.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-WxTV9lXY.js","assets/Appels-B-8TDnhA.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/Assistants-BOcxTwZO.css","assets/Assistants-BX7ZZ6W1.js","assets/AtelierDesContenus-Cbj3ozsE.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/Audience-DeyB7R3G.js","assets/Aujourdhui-sU0uNJcu.js","assets/avant-le-fauteuil-lecture-BTrfAe8e.js","assets/AvantLeFauteuil-D508S-5O.js","assets/avis-fiches-BYLY8Q0o.js","assets/AvisGoogle-BEE91ssC.js","assets/AvisGoogle-DaPXfwX9.css","assets/bilan-B-bfPYR0.css","assets/bilan-DuKed4lC.js","assets/BilanMensuel-SEFESdPk.js","assets/Branches-CMoAIvyU.js","assets/bridges-CJOdgSzK.js","assets/Caisse-2tGsxUsJ.js","assets/caisse-du-soir-Bv-Urh74.js","assets/Caisses-CH6xUSxQ.js","assets/Calendrier-ctdw7GrO.js","assets/campagnes-pur-BDzl-BZ2.js","assets/Carnet-BKZBuqLg.js","assets/carte-Bf5MI1kp.js","assets/carte-_W_-xBPj.css","assets/CarteModal-gcVfW9bX.js","assets/CartesCadeaux-Dzlci3b0.js","assets/Catalogue-j_H9bWbr.js","assets/CentreDeCommande-BMg3ODNs.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-C_fXMs3s.js","assets/certificat-ByEEKA7_.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-BibCE-qT.js","assets/ChiffreDesPrestations-y4FMOOhI.js","assets/client-Co6T1tD5.js","assets/cloture-du-jour-BsDwN9I7.js","assets/ClotureDuTiroir-C6vPx-E_.css","assets/ClotureDuTiroir-wKVkaSFQ.js","assets/Coffre-DZFQr8ro.js","assets/components-DWNyB2Od.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-DBurs7yv.js","assets/Comptes-xfyszQ4m.js","assets/consultation-Cm-bObM1.js","assets/consultation-CRW6QcWf.css","assets/Consultations-3Dsjipwa.js","assets/consultNotes-B0Sktlud.js","assets/Conversations-BERy44f8.js","assets/Conversations-D4WwB5Zo.css","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-B7yF_QFL.js","assets/currency-qfIhGmrs.js","assets/Customers-CWOq5KEd.js","assets/Dashboard-Cpo8Q2Ib.js","assets/Dashboard-zjGteuUE.css","assets/dates-BME5h-Wy.js","assets/Demandes-DE8kMK_v.js","assets/Depenses-BaaG4Yz8.js","assets/depenses-saisie-DP1zGUsy.js","assets/dernier-message-pur-CBYWnq8m.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-SiZhakBt.js","assets/diagnostics-au-trone-CKc75L4p.js","assets/Dictee-BIQFbKhA.css","assets/Dictee-DF0BNdg1.js","assets/dictee-pur-Dyt34J8U.js","assets/Discussions-CevsMq1h.js","assets/EditeurDesOffres-DcXFNxgQ.js","assets/Encaissements-Dc_EtJch.js","assets/enfants-ixf35uj_.js","assets/Engagements--EB3z2Ox.js","assets/Engagements-Cj5S9MhG.css","assets/EntreDeuxSeances-icijHiX8.js","assets/es-DNKysj2U.js","assets/Evaluation-DUD36Tbc.js","assets/FacturePrestataire-AjtM4wyT.js","assets/Factures-CiwpD3Na.js","assets/FenetreDesCivilites-Cb3u3E2D.js","assets/FenetreDesCivilites-zfNk1aak.css","assets/FenetreDuPoint-CrSrc-8w.js","assets/Fil-B3EPbhT5.js","assets/finances-BMFnlkRx.css","assets/fon-CMoiyqA6.js","assets/fournisseurs-B4R5qxMM.js","assets/Fournisseurs-cQW4LUQE.js","assets/foyer-BzVl4c8_.js","assets/Gerard-Bfp4ua88.css","assets/gerard-donnees-C20K_QMR.js","assets/Gerard-DSwz9FRf.js","assets/gestes-conversation-rRPogqrc.js","assets/HomeRituals-DDdjaUth.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-iTQUWOJ8.js","assets/ia-centre-BEhEwIE7.js","assets/ia-diagnostic-pur-BBLrGY5l.js","assets/ia-marque-pur-C5lSdGpx.js","assets/identite-s6g-GCBI.js","assets/index.es-cMyyd3hy.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-OovBQz5i.js","assets/jspdf.es.min-B-7nnRJg.js","assets/JustePrix-Co5VkTpg.js","assets/kkiapay-oRzC5vIR.js","assets/kkiapay-widget-DnUhUNd4.js","assets/la-journee-BJUL9guY.js","assets/la-journee-DNg04cPb.css","assets/Laboratoire-C30g_3wM.js","assets/LaJournee-D8xhB4lu.js","assets/LettresAuDossier-CShX7E1_.js","assets/LienMndPay-B7Z3X2UP.js","assets/maisons-CSSFrqZy.js","assets/Marketing-CkXmXbvn.js","assets/MarketingBranche-ChUFjA2E.js","assets/Marque-D18JlpBz.js","assets/MesPourboires-CAfguxk3.js","assets/MesPourboires-D9I_9rZf.css","assets/MesTaches-Cc4XUDf6.css","assets/MesTaches-zmUUQ3F9.js","assets/momo-C2ZVfV9J.js","assets/MonMois-BJkBvLBa.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-CmSbgZYf.js","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/opale-C5eV9tbG.js","assets/paliers-Ca_Hy5CZ.js","assets/Parametres-B-hwrB8f.js","assets/parcours-CrbNCs2R.js","assets/Parrainages-D4cHZuO9.js","assets/Parrainages-gAHAPB_6.css","assets/PassageAvantLeFauteuil-BQTJIj_k.js","assets/pdf-DcBi1idv.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/Personas-Bty5nTv_.js","assets/Personnel-BeSxVVF7.js","assets/photo-DeIIUBR7.js","assets/pilotage-D8kf1Co8.css","assets/Pourboires-CAD0A1QI.js","assets/Predictions-DWozXbMT.js","assets/Prestataires-CeAzTWY4.js","assets/Prets-Bk7MmAzk.js","assets/prevision-du-mois-pur-D6sJa5lw.js","assets/Previsions-D-0__Buz.css","assets/Previsions-D4gOJ8Eb.js","assets/previsions-pur-BrY4-Xul.js","assets/processus-pur-BLN25j-E.js","assets/Projets-COO7WDEE.css","assets/projets-CylwAKK6.js","assets/Projets-DNty0xBS.js","assets/projets-pur-2ZEMRNDU.js","assets/protocoles-Cmblwm8V.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-C0rQaRG0.js","assets/qualification-CcEvM5UG.js","assets/quiz-5qMPWZVi.js","assets/Rapport-CxOQb06N.js","assets/Recommandations-CXhUzxz7.js","assets/regler-C5hcM02_.css","assets/regler-D6mFMeXY.js","assets/regler-la-seance-serveur-Bs6rzqZX.js","assets/relances-pur-lwRTXc5E.js","assets/releve-des-avis-BImeI_Ky.js","assets/SalonFoyer-BX-1VbuU.js","assets/secretariat-admin-CjQWykAD.js","assets/Secretariat-BjOi6N9x.js","assets/Secretariat-Cy79Zw30.css","assets/Signatures-CAoalp2H.js","assets/SignerUnPdf--U74WLeF.js","assets/Synthese-CQ_Ztleu.js","assets/SyntheseGraphes-BxI9fhuG.js","assets/systeme-TPy-pF7j.css","assets/Tableau-gkNoE5Fh.js","assets/temps-Cw5DNVfZ.js","assets/Textes-DLpOzRbT.css","assets/Textes-DLxL3GFy.js","assets/tiroirs-COanCEEA.js","assets/trone-BHzg3Xhp.js","assets/trone-ClD-xqVc.css","assets/useAudiences-Byzlh-Hd.js","assets/Vitrine-BWilTqQJ.css","assets/Vitrine-Ce3PVEQd.js","assets/_admin-BZtdkwcw.js","assets/_contrat-C44S_uwQ.js","assets/_heures-Auh1YZ_H.js","assets/_reuni-CGme4sio.js","assets/_shared-iy2jQvF9.js","assets/_signature-B5Mn-0nq.js","assets/_ui-90DDgIGQ.js","assets/_ui-BWMA-PlM.css"];
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
