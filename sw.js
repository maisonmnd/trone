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
const BUILD = "20261029231045";
const A_GARDER = ["./","assets/abonnements-CFa83Qnk.js","assets/Abonnements-kjs8BACF.js","assets/Academie-BX1WUmpF.js","assets/Acces-qOPkHfK3.js","assets/actions-Cv6RWzyC.js","assets/afaire-BLDCLO_T.js","assets/AFaire-DSSHkU3Q.js","assets/agents-donnees-I2iCXH_P.js","assets/Agents-DxRl4rCm.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-D5Yi61fa.js","assets/Appels-D-wsyLTX.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/AtelierDesContenus-CBruRl-O.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/AuComptoir-o9CgGNMw.js","assets/Audience-McmSlNxO.js","assets/Aujourdhui-CRBSRCJd.js","assets/avis-fiches-Cq9qjf34.js","assets/AvisGoogle-DaPXfwX9.css","assets/AvisGoogle-IgdyGPDq.js","assets/bilan-B-bfPYR0.css","assets/bilan-B0lsFvYV.js","assets/BilanMensuel-CteYLyYd.js","assets/Branches-BZ7Qqe7d.js","assets/bridges-Do7QUfhf.js","assets/Caisse-BsbYNGDg.js","assets/caisse-du-soir-YWtM0UjZ.js","assets/Caisses-DDo0Nzlz.js","assets/Calendrier-Cxc0Ki9i.js","assets/campagnes-pur-Te8_qHIs.js","assets/Carnet-BAqe-Kt8.js","assets/carte-Bii2HQSH.js","assets/carte-_W_-xBPj.css","assets/CarteModal-B9ZEoQRN.js","assets/CartesCadeaux-C3VZ85_4.js","assets/Catalogue-jyq3EIIs.js","assets/CentreDeCommande-DPZmFNLK.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-BCZc-WBc.js","assets/certificat-CD0kqdec.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-vM0hJByD.js","assets/chiffre-du-jour-pur-BMmNSyed.js","assets/ChiffreDesPrestations-CtYfGx7L.js","assets/client-CaVX-nyd.js","assets/ClotureDuTiroir-BDNUZVMd.js","assets/ClotureDuTiroir-C6vPx-E_.css","assets/Coffre-CqnV9DKY.js","assets/components-Do4y4bx0.js","assets/compte-courant-ByzulCEN.js","assets/compte-DEps0SxP.js","assets/CompteCourant-DuD460oR.js","assets/Comptes-j3Mg_4qY.js","assets/Comptoir-DRSrGaKk.js","assets/consultation-Cp0V6DM1.js","assets/consultation-CRW6QcWf.css","assets/Consultations-D8tqB6iQ.js","assets/consultNotes-DKGxIcQo.js","assets/Conversations-BhhSQku9.js","assets/Conversations-D4WwB5Zo.css","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-BHIuR5Jx.js","assets/currency-qfIhGmrs.js","assets/Customers-I3MYXy-0.js","assets/Dashboard-CQzQ072L.js","assets/Dashboard-zjGteuUE.css","assets/dates-CZVLNyUT.js","assets/Demandes-CuuNWmd6.js","assets/Depenses-CjMA3Y_s.js","assets/dernier-message-pur-CBYWnq8m.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-AV9pdx1A.js","assets/diagnostics-au-trone-DZ-X3y1-.js","assets/Discussions-Dz4I6Su8.js","assets/EditeurDesOffres-CLqVy9Hf.js","assets/Encaissements-DS7_NF4h.js","assets/enfants-CYwASvmA.js","assets/Engagements-Cj5S9MhG.css","assets/Engagements-DNi0x3_N.js","assets/EntreDeuxSeances-CKGkBq-j.js","assets/equipe-B_9ZHz24.css","assets/Evaluation-CJCKcUcL.js","assets/FacturePrestataire-mPfVfXp0.js","assets/Factures-CfkeGiaC.js","assets/FenetreDesCivilites-liYAaPBo.js","assets/FenetreDesCivilites-zfNk1aak.css","assets/FenetreDuPoint-wwxkz-Ng.js","assets/Fil-lkeY7_0G.js","assets/finances-BMFnlkRx.css","assets/fon-CG08aItW.js","assets/fon-pur-CgVkbJ8O.js","assets/fournisseurs-Bl2n0nKB.js","assets/Fournisseurs-CFMU9jfP.js","assets/foyer-DnXSgsb5.js","assets/Gerard-BMeGZjIm.js","assets/Gerard-DjWZ3MUn.css","assets/gerard-donnees-DtekXt2g.js","assets/gestes-conversation-ayT0I_pu.js","assets/HomeRituals-C6ugExv-.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-C8a9TqcA.js","assets/ia-centre-BM1z-cHA.js","assets/ia-diagnostic-pur-hHYxp10Y.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-recu-pur-DcucZqpR.js","assets/identite-Db1kHVq8.js","assets/index-oStuDhG8.js","assets/index.es-Sa4npn7G.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal--BrwNQmW.js","assets/jspdf.es.min-DzS8GLB3.js","assets/JustePrix-C0DlHrlm.js","assets/kkiapay-C-xCgJLr.js","assets/kkiapay-widget-DnUhUNd4.js","assets/Laboratoire-DdP42_J3.js","assets/laboratoire-U8fy2pWP.js","assets/LettresAuDossier-DWqK5U4S.js","assets/LienMndPay-Dlj8o-hK.js","assets/maisons-CSSFrqZy.js","assets/Marketing-D1FdW7_L.js","assets/MarketingBranche-BG--SxKE.js","assets/Marque-BcneeA6V.js","assets/MesTaches-C64DmMJU.js","assets/MesTaches-Cc4XUDf6.css","assets/momo-B-QSeWY6.js","assets/MonMois-BOPpFNVV.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-acS-szGT.js","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/paliers-F2XBymMh.js","assets/Parametres-D_7BM4wK.js","assets/parcours-Cdz6VrOT.js","assets/Parrainages-CEZFGeLG.js","assets/Parrainages-gAHAPB_6.css","assets/pdf-DKiTm_dI.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/Personas-B0W7qpXO.js","assets/Personnel-lCpJ8UI1.js","assets/photo-Ch8k9wkI.js","assets/pilotage-D8kf1Co8.css","assets/Predictions-Dmg-ef3e.js","assets/prestataires-BYnWrhcO.js","assets/Prestataires-CFzwO-hm.js","assets/Prets-DxAGdtVo.js","assets/prevision-du-mois-pur-D6sJa5lw.js","assets/Previsions-D-0__Buz.css","assets/Previsions-DwxsznSN.js","assets/previsions-pur-DKMVGTgk.js","assets/processus-pur-BLN25j-E.js","assets/Projets-COO7WDEE.css","assets/Projets-cp47HPGG.js","assets/projets-Dpkwu-CV.js","assets/projets-pur-2ZEMRNDU.js","assets/protocoles-BENoSXvj.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-B8GISdEn.js","assets/qualification-exbKSO8j.js","assets/quiz-5qMPWZVi.js","assets/Rapport-BA8r6B2A.js","assets/RattacherUneCarte-BBkiBpR5.js","assets/Recommandations-4mDxnXWs.js","assets/regler-C5hcM02_.css","assets/regler-la-seance-serveur-Bs6rzqZX.js","assets/regler-v_n1yZDg.js","assets/relances-pur-CTGdiNru.js","assets/releve-des-avis-Bl7PRWop.js","assets/SalonFoyer-SpF-4EXN.js","assets/secretariat-admin-CmVmy2CI.js","assets/Secretariat-Basz07Or.js","assets/Secretariat-Cy79Zw30.css","assets/Signatures-CE1QaIiw.js","assets/SignerUnPdf-CA4jq6aY.js","assets/Synthese-DyLPnF5b.js","assets/SyntheseGraphes-GB0VVdnY.js","assets/systeme-TPy-pF7j.css","assets/Tableau-B273vZ8T.js","assets/temps-Oz2ALA90.js","assets/Textes-CWiS7UzU.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-Bnu703-z.js","assets/trace-du-moyen-pur-Bx8-suHn.js","assets/trone-BCZVdLcv.js","assets/trone-BMdkuVGH.css","assets/ui-vDwLWxLk.js","assets/useAudiences-DD-uVl34.js","assets/vente-C7YWXkHo.css","assets/Vitrine-6vmlzsHu.js","assets/Vitrine-BWilTqQJ.css","assets/_admin-BRl_-uK2.js","assets/_contrat-BGmX2xD-.js","assets/_heures-C0MJ8D5k.js","assets/_reuni-Dau7B8IW.js","assets/_shared-aCYJhfya.js","assets/_signature-l0Y89HlV.js","assets/_ui-BWMA-PlM.css","assets/_ui-CP75ZY1p.js"];
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
