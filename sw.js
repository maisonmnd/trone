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
const BUILD = "20261107071518";
const A_GARDER = ["./","assets/abonnements-C3VThFzG.js","assets/Abonnements-Dc7wGlug.js","assets/Abonnements-DTY7p2DH.css","assets/Academie-CrHLB8fq.js","assets/Acces-5Xgf4-_Q.js","assets/AFaire-BKwWo6uc.js","assets/afaire-T3h0SFHc.js","assets/Agents-DJSdk11O.js","assets/agents-donnees-BiMN6Wby.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-DnswZDbJ.js","assets/Appels-COChh4uP.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/Assistants-B5F4H47O.js","assets/Assistants-D9i2Xwmg.css","assets/AtelierDesContenus-BoUAcZ3d.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/Audience-BOnTzz6E.js","assets/Aujourdhui-DusBZYuR.js","assets/avant-le-fauteuil-lecture-D-MxDIIk.js","assets/AvantLeFauteuil-D4skdv4R.js","assets/avis-fiches-UAu14xvv.js","assets/AvisGoogle-DaPXfwX9.css","assets/AvisGoogle-j4ynzjmu.js","assets/bilan-7FcT5MQJ.js","assets/bilan-B-bfPYR0.css","assets/BilanMensuel-OP4o4ahv.js","assets/Branches-CM1f4q-b.js","assets/bridges-BMQ2naR3.js","assets/caisse-du-soir-B_37ZXzh.js","assets/caisse-du-soir-C6vPx-E_.css","assets/Caisse-PEJeb3tC.js","assets/Caisses-SHw1ogQw.js","assets/Calendrier-tUxE947O.js","assets/campagnes-pur-BxUMo8ta.js","assets/Carnet-CPFs1rMg.js","assets/carte-B_vGsOHs.js","assets/carte-_W_-xBPj.css","assets/CarteModal-CidEVElB.js","assets/CartesCadeaux-Bmsf-Z0Q.js","assets/Catalogue-BbtFGcGN.js","assets/CentreDeCommande-C8Pif2o1.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-fS-l1HJK.js","assets/certificat-CQ7BaU0X.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-DBuLBcPH.js","assets/chiffre-du-jour-pur-DRBzUatT.js","assets/ChiffreDesPrestations-DaOZvDbo.js","assets/client-LnxL4Cqz.js","assets/cloture-du-jour-CcIWeu5D.js","assets/ClotureDuTiroir-CJvtp9aM.js","assets/Coffre-BpApvtnj.js","assets/components-CvOoJl-q.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-D84BB_Wp.js","assets/Comptes-JE4VtejA.js","assets/consultation-CRW6QcWf.css","assets/consultation-vpX9naq5.js","assets/Consultations-CeEc0j7i.js","assets/consultNotes-DKKWAPk1.js","assets/Conversations-BpAA3gPy.js","assets/Conversations-D4WwB5Zo.css","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-4MduM-Ph.js","assets/currency-qfIhGmrs.js","assets/Customers-BgwYpNRX.js","assets/Dashboard-B2x7VsE_.css","assets/Dashboard-DNIkKu3a.js","assets/dates-CqcPUOf6.js","assets/Demandes-oZMM7ck3.js","assets/DepenseEnUnePhrase-BIGRlGqP.css","assets/DepenseEnUnePhrase-Byp7WrXi.js","assets/Depenses-Rus6D9f1.js","assets/depenses-saisie-B4N-2S9J.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-BRsNSett.js","assets/diagnostics-au-trone-BCP4neV4.js","assets/Dictee-D2P9yM7v.css","assets/Dictee-Nty3HvvI.js","assets/dictee-pur-DWAFi2yp.js","assets/Discussions-CadmChms.js","assets/EditeurDesOffres-M-vpG_VB.js","assets/Encaissements-2b8KakSN.js","assets/enfants-DpUi94Yx.js","assets/Engagements-BjRSiCQQ.js","assets/Engagements-Cj5S9MhG.css","assets/engagements-coffre-R-dRNgOD.js","assets/EntreDeuxSeances-D9Y5QFLu.js","assets/Evaluation-D21tH8g7.js","assets/Factures-D3Q1qDOw.js","assets/FenetreDesCivilites-BukSU6Wz.js","assets/FenetreDesCivilites-zfNk1aak.css","assets/FenetreDuPoint-Blv24p-b.js","assets/Fil-CDUYe1kx.js","assets/finances-BMFnlkRx.css","assets/fon-B1-u9IFd.js","assets/Fournisseurs-DpKhiT-X.js","assets/fournisseurs-Un2tfOrA.js","assets/foyer-Bn3Zh_u_.js","assets/Gerard-1ha8gyGM.js","assets/Gerard-Cgj-zsJh.css","assets/gerard-donnees-BSqplxkf.js","assets/gestes-conversation-BAVoTv8-.js","assets/HomeRituals-D2_wi5F0.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-DeGnGpOv.js","assets/ia-centre-D_q-Z_qd.js","assets/ia-diagnostic-pur-BBLrGY5l.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-tableau-pur-CSRjGtTf.js","assets/identite-sCWhrg_l.js","assets/index-B2kVK42h.js","assets/index.es-DbV7gQSA.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-aEXt771a.js","assets/jspdf.es.min-DqpT9NK5.js","assets/JustePrix-C3rtP6AN.js","assets/kkiapay-CsVAQAyn.js","assets/kkiapay-widget-DnUhUNd4.js","assets/Laboratoire-8xu873wt.js","assets/LaJournee-Bn_G0HCt.css","assets/LaJournee-wpMLcwbT.js","assets/LesPaiements-BvdfOCbQ.css","assets/LesPaiements-C4rYefhN.js","assets/LettresAuDossier-zRKb5T0U.js","assets/LienMndPay-CxHno0Sw.js","assets/Marketing-nN0byppK.js","assets/MarketingBranche-kTZshPoO.js","assets/Marque-BPVKhrx1.js","assets/MesPourboires-8EEbl07v.js","assets/MesPourboires-D9I_9rZf.css","assets/MesTaches-Cc4XUDf6.css","assets/MesTaches-Dt8yMN0x.js","assets/momo-C2ZVfV9J.js","assets/MonMois-DgPCfLSG.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/objectifs-OkHXP_c9.js","assets/opale-Ch1-rncO.js","assets/oreille-B1AMUmZh.js","assets/paie-du-5-DeJq-K_U.css","assets/paie-du-5-DJhGTj8N.js","assets/paie-du-5-pur-Cd7qxXVu.js","assets/PaieParMtn-D_bWb55t.js","assets/paliers-CshDELz8.js","assets/Parametres-gQsXeijB.js","assets/parcours-w-NEoGvv.js","assets/Parrainages-0fbaUnT0.js","assets/Parrainages-gAHAPB_6.css","assets/PassageAvantLeFauteuil-ZRB4wgfX.js","assets/pdf-ndbseHwm.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/Personas-BkT4OuBN.js","assets/Personnel-B6HiaETT.js","assets/photo-CEsMkwec.js","assets/pilotage-D8kf1Co8.css","assets/Pourboires-b7fh8b9w.js","assets/Predictions-CqimCMQ4.js","assets/Prestataires-BZZoAezE.js","assets/Prets-DT-PUd7y.js","assets/PrevisionDuMois-C3vkLciw.js","assets/PrevisionDuMois-DlFTw3OX.css","assets/Previsions-2W_85RdX.js","assets/previsions-pur-kmi_CpJy.js","assets/Previsions-r4v19Anp.css","assets/processus-pur-R6U5QcCi.js","assets/Projets-C9dHswy3.js","assets/Projets-COO7WDEE.css","assets/projets-DxOQPSRW.js","assets/projets-pur-2ZEMRNDU.js","assets/protocoles-pZCbHcaY.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-vKq6gdEV.js","assets/qualification-D5LvDyHj.js","assets/quiz-5qMPWZVi.js","assets/Rapport-DsNzD3Wn.js","assets/Recommandations-6FcIeDrG.js","assets/regler-C5hcM02_.css","assets/regler-CGVV7Y5g.js","assets/regler-la-seance-serveur-Bs6rzqZX.js","assets/relances-pur-lwRTXc5E.js","assets/releve-des-avis-DbWFX0CF.js","assets/SalonFoyer-C6t89O2v.js","assets/secretariat-admin-BtcU5hgz.js","assets/Secretariat-Cy79Zw30.css","assets/Secretariat-z1bLCHk_.js","assets/Signatures-wnhoqVsy.js","assets/SignerUnPdf-BaXYWm6o.js","assets/Synthese-CkL1uCLd.js","assets/SyntheseGraphes-CWWblb1v.js","assets/systeme-TPy-pF7j.css","assets/Tableau-Bcu3k3JK.js","assets/temps-DKyC1IkL.js","assets/Textes-CA1aVi_e.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-CkDzpGy0.css","assets/tiroirs-kPUbum72.js","assets/trone-DIN2wFzN.css","assets/trone-YHV8qBHJ.js","assets/useAudiences-BQZ5qz4J.js","assets/useClotureDuJour-FO7nRbx1.js","assets/Vitrine-B-ajYBB8.js","assets/Vitrine-BWilTqQJ.css","assets/_admin-CMjiElwl.js","assets/_contrat-Cehhhn2Y.js","assets/_heures-DI5aJmnv.js","assets/_reuni-od1OjnvA.js","assets/_shared-CbfzZVfc.js","assets/_signature-kU2jL72k.js","assets/_ui-BrUDlmuM.css","assets/_ui-CKLJDh3X.js"];
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
