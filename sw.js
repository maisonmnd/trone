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
const BUILD = "20261026080037";
const A_GARDER = ["./","assets/Abonnements-CgQWVUKR.js","assets/abonnements-RLFJDuL5.js","assets/Academie-B5LcRAvb.js","assets/Acces-B5pY01mT.js","assets/actions-CDsUX1wo.js","assets/AFaire-C0rt8WsY.js","assets/afaire-DuvoMxuR.js","assets/Agents-BvJw38Wz.js","assets/agents-donnees-DicS4Rbb.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-B02BuQuo.js","assets/Appels-CypctgLX.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/AtelierDesContenus-BzpTar-q.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/AuComptoir-BdLOxl6Y.js","assets/Aujourdhui-DrveNI78.js","assets/avis-fiches-BsFw33YM.js","assets/AvisGoogle-CL02zXvf.js","assets/AvisGoogle-DaPXfwX9.css","assets/bilan-B-bfPYR0.css","assets/bilan-m-IXUNrT.js","assets/BilanMensuel-CS70gbuX.js","assets/Branches-BQFlAaVb.js","assets/bridges-ha_U4-Fa.js","assets/caisse-du-soir-DMMNIGH2.js","assets/Caisse-DYXIIoTL.js","assets/Caisses-BTjPv3xo.js","assets/Calendrier-BIAqXZ5X.js","assets/Carnet-X7m_F_36.js","assets/carte-B4V-vzc7.js","assets/carte-_W_-xBPj.css","assets/CarteModal-DPl1KWOm.js","assets/CartesCadeaux-1WF7-qZj.js","assets/Catalogue-VWvVJNv9.js","assets/CentreDeCommande-BGrgkAbJ.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-DnHGo4DM.js","assets/certificat-CGg-lzUx.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-N-RsYggX.js","assets/chiffre-du-jour-pur-CwT7KnCw.js","assets/ChiffreDesPrestations-DSHCn-Y5.js","assets/client-DFfx1Qdy.js","assets/ClotureDuTiroir-C6vPx-E_.css","assets/ClotureDuTiroir-DcfLtrSC.js","assets/Coffre-BcTLRjtR.js","assets/components-B3LuE9M4.js","assets/compte-BpDC-b7z.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-DpyzkACa.js","assets/Comptes-CT5xvB6O.js","assets/Comptoir-B9W5NsS7.js","assets/consultation-CRW6QcWf.css","assets/consultation-DVKiMVjy.js","assets/Consultations-9bw31DbT.js","assets/consultNotes-BL0swCdi.js","assets/Conversations-D4WwB5Zo.css","assets/Conversations-JubN6gQe.js","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-Dojg5kip.js","assets/currency-qfIhGmrs.js","assets/Customers-DC-KiKFT.js","assets/Dashboard-B8qK6Flt.css","assets/Dashboard-BRMplAUK.js","assets/dates-CBH5S9-5.js","assets/Demandes-C4HXNuWY.js","assets/Depenses-CKAjL6eE.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-CiTs8vnL.js","assets/diagnostics-au-trone-aszuCSnx.js","assets/Discussions-CD-nPgj6.js","assets/Encaissements-BrhxIF8s.js","assets/enfants-B8ROVkep.js","assets/Engagements-Cg117VVe.js","assets/Engagements-Cj5S9MhG.css","assets/EntreDeuxSeances-Buz7jmON.js","assets/equipe-B_9ZHz24.css","assets/Evaluation-DU-QaWqr.js","assets/FacturePrestataire-DCmZLSUZ.js","assets/Factures-CPFFY2nF.js","assets/Fil-BIIb0_wI.js","assets/finances-BMFnlkRx.css","assets/fon-BG5b14_h.js","assets/fon-pur-CgVkbJ8O.js","assets/Fournisseurs-CllXHxab.js","assets/fournisseurs-CzMpKclI.js","assets/foyer-Ciw3ZXDY.js","assets/gestes-conversation-t1xEYiah.js","assets/HomeRituals-Df07DzCM.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-DPGZaFvT.js","assets/ia-diagnostic-pur-BulIFgZQ.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-recu-pur-DcucZqpR.js","assets/identite-xjNX4A0u.js","assets/index-D6XmOW6D.js","assets/index.es-ClBQRrFX.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-BWiNNvT5.js","assets/jspdf.es.min-CfFZEGhi.js","assets/JustePrix-VuZjwA54.js","assets/kkiapay-CIqCCK9r.js","assets/kkiapay-widget-DnUhUNd4.js","assets/Laboratoire-B-B-_gr_.js","assets/laboratoire-NlHgPUrl.js","assets/LettresAuDossier-DnmQ9HIh.js","assets/LienMndPay-BB58dKub.js","assets/maisons-CSSFrqZy.js","assets/Marketing-BCdyjC0l.js","assets/Marque-C4h-fuzv.js","assets/MesTaches-Cc4XUDf6.css","assets/MesTaches-DlKor20a.js","assets/momo-C2ZVfV9J.js","assets/MonMois-CUh1rsM_.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-CKctxB7y.js","assets/paliers-DvPaPh4M.js","assets/Parametres-yaSRShuM.js","assets/parcours-DQvseut8.js","assets/Parrainages-BhQkQFHo.js","assets/Parrainages-gAHAPB_6.css","assets/pdf-CchZJUq5.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/Personas-cpmc4dPe.js","assets/Personnel-14C4mQma.js","assets/photo-DLlv4Hth.js","assets/pilotage-D8kf1Co8.css","assets/Predictions-BxJ0VHcT.js","assets/Prestataires-j3UmtVKe.js","assets/prestataires-kE60J4hU.js","assets/Prets-BVe-mL7d.js","assets/Projets-Bk2Xsu-P.js","assets/Projets-COO7WDEE.css","assets/projets-DdwubVAn.js","assets/projets-pur-2ZEMRNDU.js","assets/protocoles-CupsK1Hz.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-DKxwoXTf.js","assets/qualification-D-tGgSnu.js","assets/quiz-5qMPWZVi.js","assets/Rapport-CDTYFiX-.js","assets/RattacherUneCarte-DjBE0E1Y.js","assets/Recommandations-DxuQ4g4N.js","assets/regler-BL3xERgL.js","assets/regler-C5hcM02_.css","assets/regler-la-seance-serveur-BpExlC5z.js","assets/relances-pur-DsIo28uB.js","assets/releve-des-avis-CFhIyWMv.js","assets/SalonFoyer-vpj-9WyH.js","assets/secretariat-admin-CrOeI_PB.js","assets/Secretariat-Cy79Zw30.css","assets/Secretariat-GtWv9l4K.js","assets/Signatures-DxE7F9Wl.js","assets/SignerUnPdf-DWVhQoDT.js","assets/Synthese-ZRjKEPZm.js","assets/SyntheseGraphes-C_EcjgF_.js","assets/systeme-C3XFIa8E.css","assets/Tableau-Cc56hdTM.js","assets/Textes-DLpOzRbT.css","assets/Textes-Dx-zqrVU.js","assets/tiroirs-BdlD2TVk.js","assets/trace-du-moyen-pur-Bx8-suHn.js","assets/trone-Bo9ydrnn.css","assets/trone-DMSz7lC2.js","assets/ui-Dfq155lk.js","assets/useAudiences-zZ80KNoD.js","assets/vente-C7YWXkHo.css","assets/Vitrine-Br-lJrBi.js","assets/Vitrine-BWilTqQJ.css","assets/_admin-8zQr5bO3.js","assets/_contrat-CGkmhFIr.js","assets/_heures-S2-7kADX.js","assets/_reuni-aben-ZTI.js","assets/_shared-B0Ik-66r.js","assets/_signature-RMp8-Ot0.js","assets/_ui-Bj_63FvU.js","assets/_ui-BWMA-PlM.css"];
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
