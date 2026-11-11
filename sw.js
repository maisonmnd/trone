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
const BUILD = "20261111165012";
const A_GARDER = ["./","assets/Abonnements-CA9Irjhh.js","assets/abonnements-D1yibKxv.js","assets/Abonnements-DTY7p2DH.css","assets/Academie-Bef5vLmV.js","assets/Acces-CRBNDGgW.js","assets/afaire-DGKilQlN.js","assets/AFaire-fPDm8znr.js","assets/Agents-Cw-vBrLj.js","assets/agents-donnees-DQ6Fvk98.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-CGrD1w4H.js","assets/Appels-BYnXHkLv.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/Assistants-D9i2Xwmg.css","assets/Assistants-DTSobN9O.js","assets/AtelierDesContenus-BmSz2P0i.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/Audience-DaBeNSQc.js","assets/Aujourdhui-2iaP0zoN.js","assets/avant-le-fauteuil-lecture-BOF2wq7G.js","assets/AvantLeFauteuil-CD7Gdr_O.js","assets/avis-fiches-V7s0T4f5.js","assets/AvisGoogle-Csw4iEi6.js","assets/AvisGoogle-DaPXfwX9.css","assets/BadgeEssai-LMuTL8Ps.js","assets/bilan-B-bfPYR0.css","assets/bilan-C1_6suz5.js","assets/BilanMensuel-CEmHngwy.js","assets/Branches-D3lx_fVj.js","assets/bridges-DjuOByBB.js","assets/caisse-du-soir-C6vPx-E_.css","assets/caisse-du-soir-DkONDhk0.js","assets/Caisse-Dz6BQjT4.js","assets/Caisses-CcwESfXD.js","assets/Calendrier-C27HErJX.js","assets/campagnes-pur-DBkDoseD.js","assets/Carnet-CDBzL-hy.js","assets/carte-B0OLTcvm.js","assets/carte-_W_-xBPj.css","assets/CarteModal-Dsqs-OjK.js","assets/CartesCadeaux-ClbObfL1.js","assets/Catalogue-DcqCy4Hr.js","assets/CentreDeCommande-B4aA3foO.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-CAkBnFjX.js","assets/certificat-DNGhhCzE.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-B1JJbTgH.js","assets/chiffre-du-jour-pur-DLcbkb-i.js","assets/ChiffreDesPrestations-ChTtPnzW.js","assets/client-DzVEGjPF.js","assets/cloture-du-jour-BhUCEMtD.js","assets/ClotureDuTiroir-BCl-wxhG.js","assets/Coffre-Y7kp38rN.js","assets/components-HVotxgmi.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-CuPQAW31.js","assets/Comptes-B8SSBzAN.js","assets/consultation-CRW6QcWf.css","assets/consultation-tJHNo8gi.js","assets/Consultations-DE7mJIRb.js","assets/consultNotes-PgLaxIe2.js","assets/Conversations-D4WwB5Zo.css","assets/Conversations-stI2JN6h.js","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-DnEEYVgx.js","assets/currency-qfIhGmrs.js","assets/Customers-gE9Cz_U0.js","assets/Dashboard-B2x7VsE_.css","assets/Dashboard-NSM9zsh4.js","assets/dates-BxpWwwH4.js","assets/Demandes-BAWjlJQX.js","assets/DepenseEnUnePhrase-BIGRlGqP.css","assets/DepenseEnUnePhrase-Ca4QuapB.js","assets/Depenses-FZOUZzzs.js","assets/depenses-saisie-CZGuIJEk.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-BZB6hfu-.js","assets/diagnostics-au-trone-CMEjQqX3.js","assets/Dictee-D2P9yM7v.css","assets/Dictee-lGvoP874.js","assets/dictee-pur-DCgjGVgu.js","assets/Discussions-tgm57VXk.js","assets/EditeurDesOffres-DSR0r5aD.js","assets/Encaissements-_d6tSrLX.js","assets/enfants-Me6zmPSC.js","assets/Engagements-C7WURMOA.js","assets/Engagements-Cj5S9MhG.css","assets/engagements-coffre-BAKAqqlR.js","assets/EntreDeuxSeances-CRlifpqC.js","assets/Evaluation-CPoTpeet.js","assets/Factures-DVJiOoMN.js","assets/FenetreDesCivilites-C9Au7Nne.js","assets/FenetreDesCivilites-zfNk1aak.css","assets/FenetreDuPoint-DlSuSsuf.js","assets/Fil-DQInsJy1.js","assets/finances-BMFnlkRx.css","assets/fon-Bm1jf8yJ.js","assets/Fournisseurs-Ck7h_gqM.js","assets/fournisseurs-DZWTv-zU.js","assets/foyer-Fc4VNDbm.js","assets/Gerard-CBik4emD.js","assets/Gerard-Cgj-zsJh.css","assets/gerard-donnees-CtT5mA5P.js","assets/gestes-conversation-DxyjmDg6.js","assets/heures-des-rappels-pur-Dig9pZpo.js","assets/HomeRituals-DPJ1z8HS.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-DRqLijt9.js","assets/ia-centre-BbW7cryq.js","assets/ia-diagnostic-pur-BBLrGY5l.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-tableau-pur-p6UvREJe.js","assets/identite-DWn3zB3g.js","assets/index-1P6JtpE8.js","assets/index.es-DuCJL9AS.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-CTXeBTPT.js","assets/jspdf.es.min-AFS-fS86.js","assets/JustePrix-cBvNcaRZ.js","assets/kkiapay-DjWHGm7a.js","assets/kkiapay-widget-DnUhUNd4.js","assets/Laboratoire-Da4b-1zh.js","assets/LaJournee-Bn_G0HCt.css","assets/LaJournee-Ca6frcjm.js","assets/LesPaiements-B3b3MxzN.js","assets/LesPaiements-IoteCeZN.css","assets/LettresAuDossier-Cyj9adGd.js","assets/LienMndPay-Bx5ZdF-s.js","assets/Marketing-tTdB_tOw.js","assets/MarketingBranche-Je5wqIih.js","assets/Marque-DiFfz20e.js","assets/MesPourboires-CENjelyb.css","assets/MesPourboires-Ebl1Jiz0.js","assets/MesTaches-BVm3i5uX.js","assets/MesTaches-Cc4XUDf6.css","assets/momo-C2ZVfV9J.js","assets/MonMois-C0wKAd6e.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-C4y505Dx.js","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/opale-B8lmJSjF.js","assets/oreille-B1AMUmZh.js","assets/paie-du-5-DeJq-K_U.css","assets/paie-du-5-Pf4eeUy9.js","assets/paie-du-5-pur-gQ7v7BEs.js","assets/PaieParMtn-Dy_tO9p4.js","assets/paliers-BOvWCz5G.js","assets/Parametres-DJnazGJk.js","assets/parcours-Blovh2mx.js","assets/Parrainages-BP4BVFHX.js","assets/Parrainages-gAHAPB_6.css","assets/PassageAvantLeFauteuil-BYiMKWRs.js","assets/pdf-Dmh9X-qr.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/periode-des-pourboires-pur-BUWqfwov.js","assets/Personas-CgoUuf_0.js","assets/Personnel-D6idYojE.js","assets/photo-Bz6kxMDr.js","assets/pilotage-D8kf1Co8.css","assets/Pourboires-VYNOPIRp.js","assets/Predictions-BMm5pvXg.js","assets/Prestataires-C5VUwqi6.js","assets/Prets-DtQgETmF.js","assets/PrevisionDuMois-COnJ37b7.js","assets/PrevisionDuMois-DlFTw3OX.css","assets/Previsions-9BU2Vg1T.css","assets/Previsions-BamVkmEy.js","assets/previsions-pur-D_D3NwIf.js","assets/processus-pur-R6U5QcCi.js","assets/Projets-CLqoJjrC.js","assets/Projets-COO7WDEE.css","assets/projets-CRSsKS9n.js","assets/projets-pur-2ZEMRNDU.js","assets/protocoles-BC2xc2_p.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-DH7oEFV1.js","assets/qualification-CCSapu7B.js","assets/quiz-5qMPWZVi.js","assets/Rapport-BN3WE3xF.js","assets/Recommandations-Dwjk_bzD.js","assets/regler-C5hcM02_.css","assets/regler-la-seance-serveur-Bs6rzqZX.js","assets/regler-OpZAECvm.js","assets/relances-pur-BacTXlI2.js","assets/releve-des-avis-BkP3rvme.js","assets/SalonFoyer-DNCB8eWg.js","assets/secretariat-admin-B-GZvNNl.js","assets/Secretariat-Cd1sKIUG.js","assets/Secretariat-Cy79Zw30.css","assets/Signatures-stCZ9SEI.js","assets/SignerUnPdf-CymA0EEy.js","assets/Synthese-SC51u4NR.js","assets/SyntheseGraphes-DWaRnyut.js","assets/systeme-TPy-pF7j.css","assets/Tableau-Nli8qs-E.js","assets/temps-DsyDL5ls.js","assets/Textes-By2HojQV.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-CbwPizAU.js","assets/tiroirs-CkDzpGy0.css","assets/trone-CLl3IIqP.js","assets/trone-wE0OFAgL.css","assets/useAudiences-CxJ2cvdU.js","assets/useClotureDuJour-CsAoeDyd.js","assets/Vitrine-BWilTqQJ.css","assets/Vitrine-MrVURwGA.js","assets/_admin-CoveXthr.js","assets/_contrat-CECEjBQC.js","assets/_reuni-DJLOATZA.js","assets/_shared-HY-QE3E6.js","assets/_signature-DGv7Kvwu.js","assets/_ui-BrUDlmuM.css","assets/_ui-CwZwwTzc.js"];
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
