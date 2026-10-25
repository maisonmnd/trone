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
const BUILD = "20261025071220";
const A_GARDER = ["./","assets/Abonnements-2v6jTVQU.js","assets/abonnements-DObbQrqG.js","assets/Academie-CRTHjHcb.js","assets/Acces-DtkW3LN7.js","assets/actions-IcEr4dTW.js","assets/afaire-D9stkgyP.js","assets/AFaire-LswN9qzD.js","assets/Agents-D4cAKTp5.js","assets/agents-donnees-DTDlfHuT.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-esyHe1FJ.js","assets/Appels-CNzaxKT8.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/AtelierDesContenus-6H16ker_.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/AuComptoir-CmlmDhsH.js","assets/Aujourdhui-79Ambm9N.js","assets/avis-fiches-Clbzetae.js","assets/bilan-B-bfPYR0.css","assets/bilan-Dds5NhlM.js","assets/BilanMensuel-CvsMfsqO.js","assets/Branches-DOtYx89_.js","assets/bridges-BRPOvWKC.js","assets/Caisse-CLQsBZ0V.js","assets/caisse-du-soir-MlS0OyX_.js","assets/Caisses-DznxjJgN.js","assets/Calendrier-bPIZGZlX.js","assets/Carnet-hMg5PurB.js","assets/carte-DWlSbalk.css","assets/carte-JQMAT-_b.js","assets/CarteModal-BVtLeeVa.js","assets/CartesCadeaux-97MHcV9u.js","assets/Catalogue-DkjCB2eo.js","assets/CentreDeCommande-Du8kyJhp.css","assets/CentreDeCommande-yAHxVgl6.js","assets/Cercle-B1cMZAEo.js","assets/certificat-9_XWf1iQ.css","assets/certificat-_2-ktUm_.js","assets/certificats-coffre-Cro1VVhY.js","assets/chiffre-du-jour-pur-Byja4aIy.js","assets/ChiffreDesPrestations-CnCM4wzt.js","assets/ClotureDuTiroir-BEAQGOSe.js","assets/ClotureDuTiroir-C6vPx-E_.css","assets/Coffre-F69ZJu5Z.js","assets/components-CK9M6XFf.js","assets/compte-courant-ByzulCEN.js","assets/compte-DAT-ehmY.js","assets/CompteCourant-D7aLiuPb.js","assets/Comptes-C_RwwVyI.js","assets/Comptoir-DcSf70OL.js","assets/consultation-aig91OHr.js","assets/consultation-DQBnwlMN.css","assets/Consultations-CXmediu7.js","assets/consultNotes-DXZGks8t.js","assets/Conversations-D4WwB5Zo.css","assets/Conversations-j0loxCzL.js","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-DjdDi1Yz.js","assets/currency-qfIhGmrs.js","assets/Customers-DqbpOpwG.js","assets/Dashboard-B8qK6Flt.css","assets/Dashboard-BX1zNm_p.js","assets/dates-NbRnDVlV.js","assets/Demandes-DgCJ4jCX.js","assets/Depenses-DwpVzIrO.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-mupZEmCo.js","assets/diagnostics-au-trone-Dk8vd35E.js","assets/Discussions-BmhX6V_e.js","assets/Encaissements-BET7OOE-.js","assets/enfants-CnY98v0-.js","assets/Engagements-CHYiSvix.js","assets/Engagements-Cj5S9MhG.css","assets/EntreDeuxSeances-C_eEIJQC.js","assets/equipe-B_9ZHz24.css","assets/Evaluation-D5yS7ZnS.js","assets/FacturePrestataire-8WXGqJ6_.js","assets/Factures-gHDni_1_.js","assets/Fil-C0RZE9Sk.js","assets/finances-BMFnlkRx.css","assets/fournisseurs-C8RQiAD3.js","assets/Fournisseurs-db3p-DL1.js","assets/foyer-DWYVB_to.js","assets/gestes-conversation-IkH_GkyH.js","assets/HomeRituals-BJDBu1Rg.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-Bx3V2-YI.js","assets/ia-diagnostic-pur-BulIFgZQ.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-recu-pur-DcucZqpR.js","assets/identite-SSO1GbgP.js","assets/index-WLG6TlGW.js","assets/index.es-8n2UX5MA.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-DVaJgrjB.js","assets/jspdf.es.min-DFillrlu.js","assets/JustePrix-BTdWCjzK.js","assets/kkiapay-jB8BlAHi.js","assets/laboratoire-BfITz4-H.js","assets/Laboratoire-BmS_jWmz.js","assets/LettresAuDossier-58jHZA6T.js","assets/LienMndPay-vJM4RVc0.js","assets/maisons-CSSFrqZy.js","assets/Marketing-CGF_nO4Y.js","assets/Marque-DeO_sjyr.js","assets/MesTaches-BAEkYWJV.js","assets/MesTaches-Cc4XUDf6.css","assets/momo-C2ZVfV9J.js","assets/MonMois-D6xm3iqK.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-Cw0_n5ri.js","assets/paliers-Dsv26PvM.js","assets/Parametres-DmksoE2a.js","assets/parcours-Cy9oR6Xn.js","assets/Parrainages-C4Ahgpgh.js","assets/Parrainages-gAHAPB_6.css","assets/pdf-Tcx53NVA.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/Personas-BnNBn4O5.js","assets/Personnel-DslCb48P.js","assets/photo-gOWNfodk.js","assets/pilotage-D8kf1Co8.css","assets/Predictions-X0wDyI9n.js","assets/Prestataires-CaMzvTge.js","assets/prestataires-Du-ITuv5.js","assets/Prets-LsUz491A.js","assets/Projets-COO7WDEE.css","assets/Projets-CXJnLhrh.js","assets/projets-P4ROoQz4.js","assets/projets-pur-2ZEMRNDU.js","assets/protocoles-Bihw57HC.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-CyRiUvl6.js","assets/qualification-ouIeNqZM.js","assets/quiz-5qMPWZVi.js","assets/Rapport-77foJIxu.js","assets/RattacherUneCarte-I__TXTV1.js","assets/Recommandations-D8jbUdyl.js","assets/relances-pur-DsIo28uB.js","assets/releve-des-avis-DZlI1iW2.js","assets/SalonFoyer-BISHwZIN.js","assets/secretariat-admin-CnZtFoW1.js","assets/Secretariat-Cr6IlFhm.js","assets/Secretariat-Cy79Zw30.css","assets/Signatures-ShiwTl4W.js","assets/SignerUnPdf-BNaEaaE_.js","assets/Synthese-CDyxVE44.js","assets/SyntheseGraphes-CQ8_qM9J.js","assets/systeme-C3XFIa8E.css","assets/Tableau-zZKlnFez.js","assets/Textes-CfmdiuCx.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-CdMnvyXG.js","assets/trace-du-moyen-pur-Cb3Gcky8.js","assets/trone-CZAWdi47.js","assets/trone-DkFoZCYr.css","assets/ui-BsJnSuyN.js","assets/useAudiences-KIau14g3.js","assets/vente-C7YWXkHo.css","assets/Vitrine-BON6rcdB.css","assets/Vitrine-Dy_dHLtB.js","assets/_admin-DbGt3UJy.js","assets/_contrat-CbDo5c84.js","assets/_heures-2wqAITZ9.js","assets/_reuni-DXWeAvFX.js","assets/_shared-BzRjdkVW.js","assets/_signature-Ozz-HiSm.js","assets/_ui-BWMA-PlM.css","assets/_ui-z0fPVluU.js"];
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
