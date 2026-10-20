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
const BUILD = "20261020203453";
const A_GARDER = ["./","assets/Abonnements-CZ5LkQTi.js","assets/abonnements-DA5pFvEK.js","assets/Academie--rQapUM0.js","assets/Acces-Bbf3v_vK.js","assets/actions-CNYOTp91.js","assets/AFaire-Bo2yZp_i.js","assets/afaire-DEkvktdS.js","assets/Analytics-1xL5R84l.js","assets/Appels-vLud5n9g.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/AtelierDesContenus-C2o6nP8Y.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/Aujourdhui-qQScEuu7.js","assets/bilan-B-bfPYR0.css","assets/bilan-B93REhaP.js","assets/BilanMensuel-BZ352GPc.js","assets/Branches-DZsc1yB4.js","assets/bridges-Dtnl2iM7.js","assets/caisse-du-soir-gwQsWb8J.js","assets/Caisse-gD9ycBKo.js","assets/Caisses-DG5mN0pL.js","assets/Calendrier-BRDoavpG.js","assets/Carnet-UvRPNSM8.js","assets/carte-CfI--vhS.js","assets/carte-WI2qP1su.css","assets/CarteModal-UanfWcAq.js","assets/CartesCadeaux-DqESYpnI.js","assets/Catalogue-DoO_mZZr.js","assets/CentreDeCommande-CMTDqnBt.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-JIPgETgB.js","assets/certificat-BBAZaFSr.js","assets/certificat-DVSxho5e.css","assets/certificats-coffre-BE3G19JK.js","assets/ChiffreDesPrestations-CC2HIjc2.js","assets/ClotureDuTiroir-BYuoNsBA.js","assets/ClotureDuTiroir-C6vPx-E_.css","assets/Coffre-DNryc5xQ.js","assets/components-D2hPrjPv.js","assets/compte-CchRFxcO.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-AbQghyKA.js","assets/Comptes-DeAnLLLM.js","assets/Comptoir-BTpytI7n.js","assets/consultation-C660-WhI.js","assets/consultation-CCTm16qX.css","assets/Consultations-CAUAMKUv.js","assets/consultNotes-D1_d0Pa1.js","assets/Conversations-BWYQmAwr.js","assets/Conversations-D4WwB5Zo.css","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-BPG2JVCg.js","assets/currency-qfIhGmrs.js","assets/Customers-CMDxOmsk.js","assets/Dashboard-D5aQa5Ju.js","assets/dates-Bd9K19Ve.js","assets/Demandes-CicVeg7Z.js","assets/Depenses-DKPMF9g3.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-Eg-EmG-v.js","assets/diagnostics-au-trone-DX_5QRR1.js","assets/Discussions-BJFhNxkj.js","assets/encaissement-pur-DxQNH-qj.js","assets/Encaissements-kdf4xwHv.js","assets/enfants-BmCQL1Yx.js","assets/Engagements-Cj5S9MhG.css","assets/Engagements-CmTGSdow.js","assets/EntreDeuxSeances-LG9S_Yih.js","assets/equipe-3X2ge3MG.css","assets/Evaluation-DfAzfEKb.js","assets/FacturePrestataire-DJFM_k_u.js","assets/Factures-Djq2CIF4.js","assets/Fil-Cj4NF1kz.js","assets/finances-CCjqAkCE.css","assets/Fournisseurs-HxBUA-Ve.js","assets/fournisseurs-wYQ-JOxF.js","assets/foyer-xjdqoiAc.js","assets/gestes-conversation-Dvd9jQNH.js","assets/HomeRituals-DQkPumRA.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-DuTNdU4X.js","assets/ia-diagnostic-pur-BulIFgZQ.js","assets/ia-recu-pur-DcucZqpR.js","assets/identite-C3MRymI5.js","assets/index-CPPjDjvj.js","assets/index.es-C-L17oT9.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-Xckog8RL.js","assets/jspdf.es.min-Ck-BeJcf.js","assets/JustePrix-CX9zQ1NJ.js","assets/kkiapay-d7CC-j0n.js","assets/Laboratoire-BaAl00Me.js","assets/laboratoire-DQ0QJzvG.js","assets/LettresAuDossier-BDnWWlbn.js","assets/LienMndPay-Cm90QGgR.js","assets/maisons-CSSFrqZy.js","assets/Marketing-CR8yXfUK.js","assets/Marque-C-6mURxw.js","assets/momo-C2ZVfV9J.js","assets/MonMois-q0OdmOmA.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-Dlk-2t3w.js","assets/paliers-5f1l6Fbf.js","assets/Parametres-Ds7u7pR2.js","assets/parcours-tDFnfJ1o.js","assets/Parrainages-BJtgaH1X.js","assets/Parrainages-gAHAPB_6.css","assets/pdf--Xa0RZil.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/Personas-BI3hdutw.js","assets/Personnel-2DKxx4_p.js","assets/photo-BwC6l5ho.js","assets/pilotage-Bn1gP_oo.css","assets/Predictions-B0tlpzJe.js","assets/prestataires-fLAR7OyA.js","assets/Prestataires-gmWbJ9Kj.js","assets/Prets-BUwmER7p.js","assets/promos-DjsuNlYj.js","assets/protocoles-DLHL7m6C.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-Bl7-VEKl.js","assets/qualification-Bvuqsjm6.js","assets/quiz-5qMPWZVi.js","assets/Rapport-BsVW51Gg.js","assets/RattacherUneCarte-CYkgYKJi.js","assets/Recommandations-DKY7PJtw.js","assets/relances-pur-DsIo28uB.js","assets/releve-des-avis-BYy0aHOo.js","assets/SalonFoyer-CZjNIRAn.js","assets/secretariat-admin-C-jf03bY.js","assets/Secretariat-BTrh_CGC.js","assets/Secretariat-Cy79Zw30.css","assets/Signatures-Ca8Eu6kj.js","assets/SignerUnPdf-DBarXc6q.js","assets/Synthese-JYUqAbep.js","assets/systeme-C3XFIa8E.css","assets/Tableau-Cm2N2g_W.js","assets/Textes-C8FMkNy5.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-C1cloXUN.js","assets/tri-des-caisses-pur-GQKotgxp.js","assets/trone-0N_d5m8a.js","assets/trone-wvMgyufp.css","assets/ui-RckJex4J.js","assets/vente-DMe4r4ed.css","assets/Vitrine-CRqZUnEh.css","assets/Vitrine-DdU2aSlq.js","assets/_admin-DMuNNg04.js","assets/_contrat-CCqs8Z3x.js","assets/_heures-CrbOPJFU.js","assets/_reuni-CpKtyz_F.js","assets/_shared-Bq-Xs01H.js","assets/_signature-CYem7uLx.js","assets/_ui-8mbJufIC.js","assets/_ui-BWMA-PlM.css"];
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
