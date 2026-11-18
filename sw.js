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
const BUILD = "20261118211827";
const A_GARDER = ["./","assets/Abonnements-Bb58sPt2.js","assets/abonnements-C4YLSvAb.js","assets/Abonnements-DTY7p2DH.css","assets/Academie-BsY0mvoW.js","assets/Acces-jAw8byfh.js","assets/AFaire-B_GAbvA4.js","assets/afaire-CpSptiSh.js","assets/Agents-CQNWnOWf.js","assets/agents-donnees-fHjgBtGI.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-BrAqijKn.js","assets/App-JFkyA-z-.js","assets/Appels-BQYNntNp.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/Assistants-78k5b3xU.js","assets/Assistants-D9i2Xwmg.css","assets/AtelierDesContenus-D-1-s77e.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/Audience-D0gPBst0.js","assets/Aujourdhui-J7NpLWUT.js","assets/auth-DiRfCjOI.js","assets/avant-le-fauteuil-lecture-CxDQp1pV.js","assets/AvantLeFauteuil-CuHBsyNQ.js","assets/avis-fiches-CYYqUznN.js","assets/AvisGoogle-Bv4h3pBg.js","assets/AvisGoogle-DaPXfwX9.css","assets/BadgeEssai-D6CPoudu.js","assets/BadgeSuggere-DYx77HK5.js","assets/besoins-Dg5A2zBD.js","assets/BesoinsEtRegles-BLwxGVV5.css","assets/BesoinsEtRegles-BwqbvlOP.js","assets/bilan-B-bfPYR0.css","assets/bilan-C2Zj4qA3.js","assets/BilanMensuel-okUteg2A.js","assets/Branches-D0s8C4vo.js","assets/bridges-DIf77LHh.js","assets/Caisse-BzJQZvQL.js","assets/caisse-du-soir-C-wwSIuL.js","assets/caisse-du-soir-C6vPx-E_.css","assets/Caisses-DjHhyazK.js","assets/Calendrier-DO2t-x8x.js","assets/campagnes-pur-EpeAAOpJ.js","assets/Carnet-d7kOvUbH.js","assets/carte-NjnCGDna.js","assets/carte-_W_-xBPj.css","assets/CarteModal-iRk5UaWr.js","assets/CartesCadeaux-mNEHyZUQ.js","assets/Catalogue-COjymS65.js","assets/CentreDeCommande-B6ABfXVc.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-AmO3TWEw.js","assets/certificat-CBJmJsA1.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-1zg_2Iae.js","assets/chiffre-du-jour-pur-jnBZYROp.js","assets/ChiffreDesPrestations-0u3bqiAZ.js","assets/client-6cx36LIt.js","assets/cloture-du-jour-KJ82ThYU.js","assets/ClotureDuTiroir-C6p9c1Oq.js","assets/Coffre-CmkIHEdX.js","assets/collecte-mtn-pur-Bq3uWgWT.js","assets/components-iOiIQcLp.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-BVlekUXk.js","assets/Comptes-nUOtoyAj.js","assets/consultation-CRW6QcWf.css","assets/consultation-iAV4jFFj.js","assets/Consultations-BKLlhcSj.js","assets/Consultations-DiE-2_mG.css","assets/consultNotes-CLAU8rzp.js","assets/Conversations-C8zqlX6z.js","assets/Conversations-D4WwB5Zo.css","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-C-NR3Hhf.js","assets/currency-Cd0clE4P.js","assets/Customers-B_PgqUdu.js","assets/Dashboard-B2x7VsE_.css","assets/Dashboard-CPGxCKUm.js","assets/dates-19Bvzn8e.js","assets/Demandes-DX9SM_zY.js","assets/DepenseEnUnePhrase-BIGRlGqP.css","assets/DepenseEnUnePhrase-CQdjRdCy.js","assets/Depenses-CVSUkvDD.js","assets/depenses-saisie-CeS2dM13.js","assets/devis-remis-DHv8Qq-5.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-BQUfvALO.js","assets/diagnostics-au-trone-BUOwenXM.js","assets/Dictee-C-pUYYFA.css","assets/dictee-pur-p9243Wa9.js","assets/Dictee-RkW69jsX.js","assets/Discussions-Bub08qW7.js","assets/echappe-html-pur-gEhHOM07.js","assets/EditeurDesOffres-Dqxb_4OW.js","assets/Encaissements-BBgCl5J0.js","assets/enfants-CL6PLSww.js","assets/Engagements-Cj5S9MhG.css","assets/engagements-coffre-CLiv9210.js","assets/Engagements-C_RcQ8dw.js","assets/EntreDeuxSeances-C3bD7kdO.js","assets/es-Z0c1THc1.js","assets/Evaluation-fUIw0lou.js","assets/facture-CWp5nXAw.js","assets/Factures-CT0U-1a4.js","assets/FenetreDeLAgent-CbGCI9y3.js","assets/FenetreDesCivilites-CqHDJGl3.js","assets/FenetreDesCivilites-zfNk1aak.css","assets/FenetreDuPoint-BUEBimZa.js","assets/Fil-CtyVPwkR.js","assets/finances-C8x7Mn4-.css","assets/fon-Y8_dVbFU.js","assets/fournisseurs-B6HgfRXe.js","assets/Fournisseurs-jum-j7eU.js","assets/foyer-Ys8Lf3p2.js","assets/Gerard-CjWxHBQu.js","assets/gerard-donnees-CV0cxlaP.js","assets/Gerard-vo2IWvP3.css","assets/gestes-conversation-C0JoYMZJ.js","assets/heures-des-rappels-pur-BWJPB8OP.js","assets/HomeRituals-OLkJd06-.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-C4K3o9jn.js","assets/ia-centre-BhzoBnab.js","assets/ia-diagnostic-pur-qGnFEvys.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-tableau-pur-p6UvREJe.js","assets/identite-Cox6_3wc.js","assets/index.es-D194mc9I.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-BajSjN9P.js","assets/jspdf.es.min-DWMzHOX_.js","assets/JustePrix-DVNj9gro.js","assets/kkiapay-B8YqicID.js","assets/kkiapay-widget-CVmsl9OE.js","assets/Laboratoire-CflnPDrU.js","assets/LaJournee-B9_3T8hJ.js","assets/LaJournee-Bn_G0HCt.css","assets/le-caissier-pur-B5Gd2X5i.js","assets/LesPaiements-C9cEZlne.css","assets/LesPaiements-CJ0F14-A.js","assets/LettresAuDossier-eQoQyP5P.js","assets/LienMndPay-CzGMDSQo.js","assets/Marketing-DhE9UZrY.js","assets/MarketingBranche-DF5ZPFOy.js","assets/Marque-B4IrB4aI.js","assets/MesPourboires-CENjelyb.css","assets/MesPourboires-D6OCOC2E.js","assets/MesTaches-Cc4XUDf6.css","assets/MesTaches-CKGpHTRF.js","assets/momo-C2ZVfV9J.js","assets/MonMois-BJsqDjD7.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/MtnMoMo-jwbHIP1H.js","assets/objectifs-CsoW0Uk0.js","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/opale-Be11CTZ-.js","assets/oreille-B1AMUmZh.js","assets/paie-du-5-CUFyU8u-.js","assets/paie-du-5-DeJq-K_U.css","assets/paie-du-5-pur-CPiCK8fv.js","assets/paie-par-mtn-CXkkR5hr.js","assets/PaieParMtn-D5cZBw9e.js","assets/paliers-CVbPIgJL.js","assets/Parametres-Hc22wiVY.js","assets/parcours-Rd0ykT0L.js","assets/Parrainages-D_VqhAIj.js","assets/Parrainages-gAHAPB_6.css","assets/PassageAvantLeFauteuil-CE_26AfP.js","assets/pdf-f5WAo_TP.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/periode-des-pourboires-pur-BUWqfwov.js","assets/Personas-B3nCUNTr.js","assets/Personnel-Dboky1d9.js","assets/photo-BYWb02of.js","assets/pilotage-D8kf1Co8.css","assets/porte-de-l-equipe-BVuoUzIR.js","assets/Pourboires-mYq5W5_J.js","assets/Predictions-CtrGzxU_.js","assets/preload-helper-BRe_O-Rg.js","assets/Prestataires-B92UzWo3.js","assets/Prets-VvJ7DVl3.js","assets/PrevisionDuMois-BR6gXkyY.js","assets/PrevisionDuMois-DlFTw3OX.css","assets/Previsions-9BU2Vg1T.css","assets/Previsions-B1PXEVVF.js","assets/previsions-pur-Byno2eud.js","assets/processus-pur-R6U5QcCi.js","assets/Projets-COO7WDEE.css","assets/Projets-OIJQxyyb.js","assets/projets-pur-2ZEMRNDU.js","assets/projets-sgCHpisa.js","assets/protocoles-DyXW1xEU.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-BSUV0dGt.js","assets/quiz-5qMPWZVi.js","assets/Rapport-C-fXzQd-.js","assets/Recommandations-DIDuWrUx.js","assets/regler-DHR_B1Dm.css","assets/regler-par-fedapay-pur-G8CEJdGn.js","assets/regler-r5HLz3xn.js","assets/relances-pur-BacTXlI2.js","assets/releve-des-avis-DpBfAPfH.js","assets/SalonFoyer-faCY70CK.js","assets/secretariat-admin-C_k67hHx.js","assets/Secretariat-Cy79Zw30.css","assets/Secretariat-DHzAEC0Y.js","assets/Signatures-C0YC4M4p.js","assets/SignerUnPdf-DP8VJAmY.js","assets/Synthese-ChAZ0TKc.js","assets/SyntheseGraphes-IIWQbwfj.js","assets/systeme-TPy-pF7j.css","assets/Tableau-C4GS7iXo.js","assets/temps-Cm3YcVUr.js","assets/Textes-DLpOzRbT.css","assets/Textes-LP2gLvFB.js","assets/tiroirs-8IXP3Al0.js","assets/tiroirs-CkDzpGy0.css","assets/trone-5F7NZChs.js","assets/trone-BvySetPd.css","assets/useAudiences-Bq80-qft.js","assets/useClotureDuJour-CmGmsUaw.js","assets/visios-D5Dd_2h2.js","assets/Vitrine-BWilTqQJ.css","assets/Vitrine-CSzItj8o.js","assets/_admin-DYq0FnmC.js","assets/_contrat-BgeMcJep.js","assets/_reuni-o9vt1-Gz.js","assets/_shared-CV8mHFst.js","assets/_signature-b2sThruh.js","assets/_ui-BrUDlmuM.css","assets/_ui-C00ggLhI.js"];
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
