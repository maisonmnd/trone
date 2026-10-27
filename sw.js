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
const BUILD = "20261027220306";
const A_GARDER = ["./","assets/Abonnements-DOPeIfow.js","assets/abonnements-X5Wh6-Pl.js","assets/Academie-CookHQJx.js","assets/Acces-Bg_5knSo.js","assets/actions-ehwGmNB0.js","assets/AFaire-D5jOVIPg.js","assets/afaire-mu_L980f.js","assets/agents-donnees-ytItoUDG.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Agents-_Y_8Etde.js","assets/Analytics-B-SoZ9xV.js","assets/Appels-tt8Qs7_L.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/AtelierDesContenus-C2KR6wpH.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/AuComptoir-CWCEbv7N.js","assets/Audience-BEhGjrkl.js","assets/Aujourdhui-DRNYxx31.js","assets/avis-fiches-9ycoWatm.js","assets/AvisGoogle-DaPXfwX9.css","assets/AvisGoogle-OUlzKobn.js","assets/bilan-B-bfPYR0.css","assets/bilan-CrrTkrqL.js","assets/BilanMensuel-DulfKzd1.js","assets/Branches-a8NcthK0.js","assets/bridges-GR9NrmUf.js","assets/Caisse-B95oTpuc.js","assets/caisse-du-soir-BCeVX4vQ.js","assets/Caisses-BWZtIK_7.js","assets/Calendrier-BUg6wenn.js","assets/campagnes-pur-CCbWeari.js","assets/Carnet-BT3k_uLr.js","assets/carte-BifpbnJW.js","assets/carte-_W_-xBPj.css","assets/CarteModal-CmbjzHFh.js","assets/CartesCadeaux-CRlgEYnK.js","assets/Catalogue-Cs31MJwS.js","assets/CentreDeCommande-D8_1z4Fs.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-By0nZYQu.js","assets/certificat-BqqzBHke.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-AfCBPREl.js","assets/chiffre-du-jour-pur-DhRdASVg.js","assets/ChiffreDesPrestations-Ca9WLoxB.js","assets/client-BSe4vn4B.js","assets/ClotureDuTiroir-C6vPx-E_.css","assets/ClotureDuTiroir-DTLC2lDJ.js","assets/Coffre-6yg5ne2Z.js","assets/components-Cqmc2yNW.js","assets/compte-C168ScWt.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-DsBhSkxm.js","assets/Comptes-DrAptEFT.js","assets/Comptoir-D7DQcVjA.js","assets/consultation-CRW6QcWf.css","assets/consultation-dn5T6otk.js","assets/Consultations-B_Trq7jv.js","assets/consultNotes-BmpR4nuF.js","assets/Conversations-B__lBN-5.js","assets/Conversations-D4WwB5Zo.css","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-DbT_CVqW.js","assets/currency-qfIhGmrs.js","assets/Customers-CITw57dv.js","assets/Dashboard-DRvKOvOX.js","assets/Dashboard-zjGteuUE.css","assets/dates-Cuu5VpxK.js","assets/Demandes-_v6wmS70.js","assets/Depenses-B8hcCxH3.js","assets/dernier-message-pur-CBYWnq8m.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-B37fus-J.js","assets/diagnostics-au-trone-CEi5qaV9.js","assets/Discussions-CGYqeYtR.js","assets/EditeurDesOffres-DokbW8df.js","assets/Encaissements-1wtyc4gQ.js","assets/enfants-CpW6K213.js","assets/Engagements-BbSs_86a.js","assets/Engagements-Cj5S9MhG.css","assets/EntreDeuxSeances-pGsmygRX.js","assets/equipe-B_9ZHz24.css","assets/Evaluation-V2zU-kar.js","assets/FacturePrestataire-B3eh9WvS.js","assets/Factures-3rhJjZDQ.js","assets/Fil-njKPiSfr.js","assets/finances-BMFnlkRx.css","assets/fon-DARvoTFO.js","assets/fon-pur-CgVkbJ8O.js","assets/fournisseurs-CCKhNjkM.js","assets/Fournisseurs-DvLx6mXO.js","assets/foyer-BJa7j__l.js","assets/Gerard-BM8pHYJy.js","assets/Gerard-CUvkbLSl.css","assets/gerard-donnees-lgoKfyIU.js","assets/gestes-conversation-B9ivouGk.js","assets/HomeRituals-CJVmGfsh.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-UrQbeZSS.js","assets/ia-centre-BT0Wt1Aq.js","assets/ia-diagnostic-pur-hHYxp10Y.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-recu-pur-DcucZqpR.js","assets/identite-C-Bzfla-.js","assets/index-CUmReiIC.js","assets/index.es-DuRl-w6w.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-CJascHdt.js","assets/jspdf.es.min-DvnxCgAl.js","assets/JustePrix-B7VNM2Qm.js","assets/kkiapay-DRUD_9iv.js","assets/kkiapay-widget-DnUhUNd4.js","assets/Laboratoire-D7mtFdV4.js","assets/laboratoire-DtPRc1aP.js","assets/LettresAuDossier-CUH4vgCb.js","assets/LienMndPay-BpJ3lyOW.js","assets/maisons-CSSFrqZy.js","assets/Marketing-CO4wBpE9.js","assets/MarketingBranche-B8SkjTYO.js","assets/Marque-CF1vvgBx.js","assets/MesTaches-Cc4XUDf6.css","assets/MesTaches-Dhaj9CT7.js","assets/momo-C2ZVfV9J.js","assets/MonMois-B38uiE12.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-C_SWTLzl.js","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/paliers-CRFGrybq.js","assets/Parametres-CYaEaKHg.js","assets/parcours-Cx1f2rf5.js","assets/Parrainages-dtVCcFHN.js","assets/Parrainages-gAHAPB_6.css","assets/pdf-CrWsbCI4.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/Personas-BiTMCpsg.js","assets/Personnel-CB3-nRhJ.js","assets/photo-Cfzqu-ww.js","assets/pilotage-D8kf1Co8.css","assets/Predictions-CxRbTZZx.js","assets/prestataires-CJ7EcecJ.js","assets/Prestataires-D5QnYo5n.js","assets/Prets-D_adWcMb.js","assets/prevision-du-mois-pur-D6sJa5lw.js","assets/Previsions-D-0__Buz.css","assets/previsions-pur-Sjhv6kuN.js","assets/Previsions-X3wt7OuB.js","assets/processus-pur-BLN25j-E.js","assets/Projets-CJtUsHaq.js","assets/Projets-COO7WDEE.css","assets/projets-PEL7gHoG.js","assets/projets-pur-2ZEMRNDU.js","assets/protocoles-C4YndI4k.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-DaI_-ZBc.js","assets/qualification-Bg466LWo.js","assets/quiz-5qMPWZVi.js","assets/Rapport-Dq1BHfgn.js","assets/RattacherUneCarte-BjYOGnE4.js","assets/Recommandations-BS7rr74d.js","assets/regler-C5hcM02_.css","assets/regler-DmUhovQf.js","assets/regler-la-seance-serveur-BpExlC5z.js","assets/relances-pur-DsIo28uB.js","assets/releve-des-avis-BGEtDjuA.js","assets/SalonFoyer-C4kzjTvQ.js","assets/Secretariat-45jUTEfS.js","assets/secretariat-admin-Bgftj2c6.js","assets/Secretariat-Cy79Zw30.css","assets/Signatures-Ct58zPIe.js","assets/SignerUnPdf-CcRN99wA.js","assets/Synthese-CEVKswry.js","assets/SyntheseGraphes-9raGA5Pz.js","assets/systeme-C3XFIa8E.css","assets/Tableau-D-hDKBfc.js","assets/temps-DZ46uYQB.js","assets/Textes-DLpOzRbT.css","assets/Textes-UsRQl9xB.js","assets/tiroirs-oucmDOe_.js","assets/trace-du-moyen-pur-Bx8-suHn.js","assets/trone-CfGCPWMq.css","assets/trone-GydZFQhY.js","assets/ui-BVqVU2L_.js","assets/useAudiences-A8WlXS0O.js","assets/vente-C7YWXkHo.css","assets/Vitrine-BWilTqQJ.css","assets/Vitrine-DRcrU83H.js","assets/_admin-B_VraqzV.js","assets/_contrat-DgLA7yNS.js","assets/_heures-GCXTVpMu.js","assets/_reuni-D-2AJKt8.js","assets/_shared-BxN0i-zN.js","assets/_signature-C6LufPWD.js","assets/_ui-BWMA-PlM.css","assets/_ui-KROgb8eT.js"];
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
