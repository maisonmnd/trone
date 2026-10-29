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
const BUILD = "20261029180414";
const A_GARDER = ["./","assets/Abonnements-BYMvBl-p.js","assets/abonnements-ClgrNtDD.js","assets/Academie-CO93ZMPL.js","assets/Acces-CuiXIBgD.js","assets/actions-DBuNA5_K.js","assets/AFaire-bk__IFDq.js","assets/afaire-DI6O0-Bn.js","assets/Agents-C4ACBxWX.js","assets/agents-donnees-CoUjwldK.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-DPYUjqrf.js","assets/Appels-uhaflElh.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/AtelierDesContenus-CrB4MD9V.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/AuComptoir-D3dkG0Y3.js","assets/Audience-DRpzbAhq.js","assets/Aujourdhui-DIyEWJEs.js","assets/avis-fiches-CTRnTNXk.js","assets/AvisGoogle-DaPXfwX9.css","assets/AvisGoogle-DO8BqOzs.js","assets/bilan-B-bfPYR0.css","assets/bilan-BZ0t2o8W.js","assets/BilanMensuel-0W2poNNz.js","assets/Branches-C5ngMCWd.js","assets/bridges-Chcr0oyL.js","assets/Caisse-D-1hUzMp.js","assets/caisse-du-soir-DkUnTKDv.js","assets/Caisses-DLNhgcia.js","assets/Calendrier-Bg-Dhwa-.js","assets/campagnes-pur-BDoAbSRB.js","assets/Carnet-BNe4TYFs.js","assets/carte-Dp7RB-ce.js","assets/carte-_W_-xBPj.css","assets/CarteModal-KtBNB1Kd.js","assets/CartesCadeaux-Dx7a4Xct.js","assets/Catalogue-DpEozDi0.js","assets/CentreDeCommande-Du8kyJhp.css","assets/CentreDeCommande-qGZFa_uq.js","assets/Cercle-Dk7gP4aj.js","assets/certificat-rgMuQda0.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-Bc8YRJeu.js","assets/chiffre-du-jour-pur-chI82ERC.js","assets/ChiffreDesPrestations-L8L-Mvvw.js","assets/client-CnHccG3l.js","assets/ClotureDuTiroir-C6vPx-E_.css","assets/ClotureDuTiroir-DoT-tLb0.js","assets/Coffre-xfzdiA4e.js","assets/components-CogVDFAj.js","assets/compte-courant-ByzulCEN.js","assets/compte-RHc-zryH.js","assets/CompteCourant-BC5XrS9m.js","assets/Comptes-Cq4jqFkg.js","assets/Comptoir-BVO1VbPD.js","assets/consultation-CRW6QcWf.css","assets/consultation-DJ0R9vZ-.js","assets/Consultations-CrZ8Pn2U.js","assets/consultNotes-BSj_5yNK.js","assets/Conversations-B7XL0ODw.js","assets/Conversations-D4WwB5Zo.css","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-DjmNTlRA.js","assets/currency-qfIhGmrs.js","assets/Customers-C5WwIKhh.js","assets/Dashboard-DZ6dO9c7.js","assets/Dashboard-zjGteuUE.css","assets/dates-qM0KckhS.js","assets/Demandes-Hda66Eet.js","assets/Depenses-CAy-lCn4.js","assets/dernier-message-pur-CBYWnq8m.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-C8nYdoua.js","assets/diagnostics-au-trone-W0u2A8j1.js","assets/Discussions-Da9QqmV0.js","assets/EditeurDesOffres-Caiz_wqL.js","assets/Encaissements-C1UM0pgq.js","assets/enfants-BNnvr4EZ.js","assets/Engagements-Cj5S9MhG.css","assets/Engagements-Zc_UnqJ3.js","assets/EntreDeuxSeances-5rlTkS2g.js","assets/equipe-B_9ZHz24.css","assets/Evaluation-DsBcEdWb.js","assets/FacturePrestataire-x3q6EcQs.js","assets/Factures-CbrQ0RBb.js","assets/FenetreDesCivilites-Bk2UNijf.js","assets/FenetreDesCivilites-zfNk1aak.css","assets/FenetreDuPoint-DcoQc8ql.js","assets/Fil-tQZ_UHTV.js","assets/finances-BMFnlkRx.css","assets/fon-pur-CgVkbJ8O.js","assets/fon-SH1bcRj2.js","assets/Fournisseurs-CA3Sr3js.js","assets/fournisseurs-Du4i_G5S.js","assets/foyer-BVgCjKoZ.js","assets/Gerard-DjWZ3MUn.css","assets/gerard-donnees-DFXXSorZ.js","assets/Gerard-Ey0KDXTQ.js","assets/gestes-conversation-BTYnEqcj.js","assets/HomeRituals-CPz-VO8L.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-CP9cwyvO.js","assets/ia-centre-qrgv3mFi.js","assets/ia-diagnostic-pur-hHYxp10Y.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-recu-pur-DcucZqpR.js","assets/identite-DKJkI7qo.js","assets/index-DDrztJtz.js","assets/index.es-DcHhazAf.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-DOQm7pAU.js","assets/jspdf.es.min-C-SjvHqK.js","assets/JustePrix-D2h0cksj.js","assets/kkiapay-CmVo_Yfw.js","assets/kkiapay-widget-DnUhUNd4.js","assets/Laboratoire-CUXKa30K.js","assets/laboratoire-D3eXo83P.js","assets/LettresAuDossier-DfNY-rDK.js","assets/LienMndPay-DGWAtT3z.js","assets/maisons-CSSFrqZy.js","assets/Marketing-DXzJEomW.js","assets/MarketingBranche-BPwB-3gD.js","assets/Marque-DdSsqSh6.js","assets/MesTaches-1x2RCacu.js","assets/MesTaches-Cc4XUDf6.css","assets/momo-B-QSeWY6.js","assets/MonMois-Bk9K-j5B.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-BP_Am3XF.js","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/paliers-DLbh6CfY.js","assets/Parametres-w9dWYHjD.js","assets/parcours-DbvgKYd4.js","assets/Parrainages-CRgwOsj-.js","assets/Parrainages-gAHAPB_6.css","assets/pdf-BleQcdYQ.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/Personas-qLri5NAs.js","assets/Personnel-CCqKnu6u.js","assets/photo-BW5lnGXx.js","assets/pilotage-D8kf1Co8.css","assets/Predictions-BzEz54LB.js","assets/Prestataires-Cf6iN8xg.js","assets/prestataires-CqziCXF3.js","assets/Prets-BaONgEnG.js","assets/prevision-du-mois-pur-D6sJa5lw.js","assets/Previsions-D-0__Buz.css","assets/Previsions-DH1MTO2s.js","assets/previsions-pur-XsBNXjyP.js","assets/processus-pur-BLN25j-E.js","assets/Projets-COO7WDEE.css","assets/projets-D34FCYgh.js","assets/projets-pur-2ZEMRNDU.js","assets/Projets-wNZpDNKw.js","assets/protocoles-CUB-bYkc.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-CbSONpmQ.js","assets/qualification-DTo0NUea.js","assets/quiz-5qMPWZVi.js","assets/Rapport-BPqWMZfe.js","assets/RattacherUneCarte-BEiZ3PjF.js","assets/Recommandations-Dw9mNrnz.js","assets/regler-C5hcM02_.css","assets/regler-C5t-j9D-.js","assets/regler-la-seance-serveur-Bs6rzqZX.js","assets/relances-pur-CTGdiNru.js","assets/releve-des-avis-BTTwm9F5.js","assets/SalonFoyer-xvt7y82E.js","assets/secretariat-admin-lQ__Cesk.js","assets/Secretariat-Cy79Zw30.css","assets/Secretariat-DbxWrNi1.js","assets/Signatures-D-anFECb.js","assets/SignerUnPdf-BgHJzxFX.js","assets/Synthese-Bzui8YIX.js","assets/SyntheseGraphes-CY_qNpC9.js","assets/systeme-C3XFIa8E.css","assets/Tableau-DBVCajeG.js","assets/temps-xdCANzWE.js","assets/Textes-Di6Gl--V.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-ta9H8nUX.js","assets/trace-du-moyen-pur-Bx8-suHn.js","assets/trone-BMdkuVGH.css","assets/trone-SY5Q7YOM.js","assets/ui-DKy9Qu7m.js","assets/useAudiences-POGThshG.js","assets/vente-C7YWXkHo.css","assets/Vitrine-BCK8nSMh.js","assets/Vitrine-BWilTqQJ.css","assets/_admin-ZqtqSetz.js","assets/_contrat-B0v1Tk3g.js","assets/_heures-DwQKu9wS.js","assets/_reuni-F4bBwEAu.js","assets/_shared-B6gOTw4a.js","assets/_signature-BIcl8Hmc.js","assets/_ui-BWMA-PlM.css","assets/_ui-DQ7y966e.js"];
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
