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
const BUILD = "20261114211542";
const A_GARDER = ["./","assets/abonnements-CWUOLfAk.js","assets/Abonnements-DGoJWyi8.js","assets/Abonnements-DTY7p2DH.css","assets/Academie-DUsiRTll.js","assets/Acces-CS_f9vwS.js","assets/AFaire-CAgfAGWC.js","assets/afaire-DnCNMKsl.js","assets/Agents-C63PvGe5.js","assets/agents-donnees-fKU5yyN7.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-CaA_WsMV.js","assets/Appels-Bda6TLp2.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/Assistants-CngrPeLg.js","assets/Assistants-D9i2Xwmg.css","assets/AtelierDesContenus-C2Tw5iO3.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/Audience-Dn5nHL0q.js","assets/Aujourdhui-mlr1MT10.js","assets/avant-le-fauteuil-lecture-8HlkB1qW.js","assets/AvantLeFauteuil-CjPvnwfo.js","assets/avis-fiches-BdCR7EAp.js","assets/AvisGoogle-DaPXfwX9.css","assets/AvisGoogle-gFwsQWlX.js","assets/BadgeEssai-6FPEPfX8.js","assets/besoins-BlBfsKYF.js","assets/BesoinsEtRegles-CzntMbJE.css","assets/BesoinsEtRegles-Vv4IRU0o.js","assets/bilan-B-bfPYR0.css","assets/bilan-BmnhMsYe.js","assets/BilanMensuel-DKQq4BMm.js","assets/Branches-DT9rzW8w.js","assets/bridges-i7A7QB_g.js","assets/caisse-du-soir-B9lGyW7w.js","assets/caisse-du-soir-C6vPx-E_.css","assets/Caisse-tCt7GYgh.js","assets/Caisses-CkmLZNjA.js","assets/Calendrier-Cht44CCn.js","assets/campagnes-pur-CynHOAOM.js","assets/Carnet-IiofYqaC.js","assets/carte-Cg4s5bkX.js","assets/carte-_W_-xBPj.css","assets/CarteModal-Cjs5jeIW.js","assets/CartesCadeaux-BJhKuR3z.js","assets/Catalogue-DrxMUSGm.js","assets/CentreDeCommande-BIUn1HMK.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-1Po9OfmH.js","assets/certificat-Bepkie5p.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-gaM5FvyW.js","assets/chiffre-du-jour-pur-gQ6aQptU.js","assets/ChiffreDesPrestations-CXOf9AFo.js","assets/client-DKMln1yg.js","assets/cloture-du-jour-4e9FhFHs.js","assets/ClotureDuTiroir-D6Xx4KLO.js","assets/Coffre-v6Rc8StJ.js","assets/collecte-mtn-pur-D9rF7FS0.js","assets/components-BU6daSEs.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-Dls8lgj9.js","assets/Comptes-DP4_3WeA.js","assets/consultation-CRW6QcWf.css","assets/consultation-DWvZtwL0.js","assets/Consultations-DiE-2_mG.css","assets/Consultations-XiOjCC79.js","assets/consultNotes-3Q__gFms.js","assets/Conversations-D4WwB5Zo.css","assets/Conversations-KJWtXKCm.js","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-DTAcRCcO.js","assets/currency-qfIhGmrs.js","assets/Customers-S9rJ4vH6.js","assets/Dashboard-B2x7VsE_.css","assets/Dashboard-CH5eoIQM.js","assets/dates-Bjy1qzO_.js","assets/Demandes-COX8nbvh.js","assets/DepenseEnUnePhrase-BIGRlGqP.css","assets/DepenseEnUnePhrase-CGTkV0ay.js","assets/Depenses-8O_P4RfP.js","assets/depenses-saisie-HN7GwPgc.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-DS-DA3ns.js","assets/diagnostics-au-trone-CZGRP0DH.js","assets/Dictee-BIQFbKhA.css","assets/Dictee-DCd4MU5p.js","assets/dictee-pur-VKWsy8VZ.js","assets/Discussions-Brw3N4jS.js","assets/EditeurDesOffres-DqHFtKKJ.js","assets/Encaissements-ekIdBY3g.js","assets/enfants-DTgHtpW7.js","assets/Engagements-Cj5S9MhG.css","assets/engagements-coffre-D8WoSy0b.js","assets/Engagements-CuAEDNTk.js","assets/EntreDeuxSeances-RcV7M3JN.js","assets/Evaluation-BrCEezrN.js","assets/facture-C6c0R03u.js","assets/Factures-B-lJbjNW.js","assets/FenetreDesCivilites-CMXw_COz.js","assets/FenetreDesCivilites-zfNk1aak.css","assets/FenetreDuPoint-Cnn_XVbq.js","assets/Fil-BBLCGNDL.js","assets/finances-C8x7Mn4-.css","assets/fon-Bocmzd9j.js","assets/Fournisseurs-BMkp7PmH.js","assets/fournisseurs-DJJnIrfv.js","assets/foyer-Da2PnBip.js","assets/Gerard-Cgj-zsJh.css","assets/gerard-donnees-DuF070T4.js","assets/Gerard-J5pw5lHY.js","assets/gestes-conversation-DWU30FFM.js","assets/heures-des-rappels-pur-Dig9pZpo.js","assets/HomeRituals-B5nIRaPW.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-Bt86OU8k.js","assets/ia-centre-BI2moV3r.js","assets/ia-diagnostic-pur-BNtkwfR3.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-tableau-pur-p6UvREJe.js","assets/identite-yMrN5AWa.js","assets/index-znVPkgR5.js","assets/index.es-Cu5iqV8M.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-DxhY1LxG.js","assets/jspdf.es.min-BE4SnOGe.js","assets/JustePrix-B0fkjkF-.js","assets/kkiapay-B100_38Y.js","assets/kkiapay-widget-CVmsl9OE.js","assets/Laboratoire-CGd3Poip.js","assets/LaJournee-Bn_G0HCt.css","assets/LaJournee-lqVTNYxs.js","assets/le-caissier-pur-CtDk7_a3.js","assets/LesPaiements-BIY9k2sq.js","assets/LesPaiements-C9cEZlne.css","assets/LettresAuDossier-6ByYtaI2.js","assets/LienMndPay-Blx20nRI.js","assets/Marketing-B0Kmqz21.js","assets/MarketingBranche-BvCyv4d8.js","assets/Marque-DnvHiASe.js","assets/MesPourboires-CENjelyb.css","assets/MesPourboires-DS7YSwWA.js","assets/MesTaches-Cc4XUDf6.css","assets/MesTaches-xjp66Hmj.js","assets/momo-C2ZVfV9J.js","assets/MonMois-D7tfP5Z5.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/MtnMoMo-D7CxXXyJ.js","assets/objectifs-CijIUZ1s.js","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/opale-Cx4IgXCZ.js","assets/oreille-B1AMUmZh.js","assets/paie-du-5-DeJq-K_U.css","assets/paie-du-5-DWLPg3pT.js","assets/paie-du-5-pur-CPiCK8fv.js","assets/paie-par-mtn-CKSl-h4B.js","assets/PaieParMtn-B0VMRKSj.js","assets/paliers-C1Tkc4V1.js","assets/Parametres-Bqbwe91j.js","assets/parcours-Dme3msub.js","assets/Parrainages-BGPhkF3u.js","assets/Parrainages-gAHAPB_6.css","assets/PassageAvantLeFauteuil-Cvjl5jzW.js","assets/pdf-DPbfTick.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/periode-des-pourboires-pur-BUWqfwov.js","assets/Personas-DFK5G-gv.js","assets/Personnel-IDz57WW-.js","assets/photo-Dlco9eUj.js","assets/pilotage-D8kf1Co8.css","assets/Pourboires-QHQDXTz9.js","assets/Predictions-BlTJebA-.js","assets/Prestataires-BXdA_97r.js","assets/Prets-B8jaMXzj.js","assets/PrevisionDuMois-BQ44psXa.js","assets/PrevisionDuMois-DlFTw3OX.css","assets/Previsions-9BU2Vg1T.css","assets/Previsions-B99zD0q5.js","assets/previsions-pur-DAVChkv6.js","assets/processus-pur-R6U5QcCi.js","assets/Projets-C1-zV9oc.js","assets/Projets-COO7WDEE.css","assets/projets-CUo_DMVH.js","assets/projets-pur-2ZEMRNDU.js","assets/protocoles-2UpUUJq3.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-D38pge9T.js","assets/qualification-Bkxw854t.js","assets/quiz-5qMPWZVi.js","assets/Rapport-DRd1Lc_G.js","assets/Recommandations-BcCbrTyl.js","assets/regler-D7oUBU5e.js","assets/regler-DHR_B1Dm.css","assets/regler-par-fedapay-pur-CFL4EbBx.js","assets/relances-pur-BacTXlI2.js","assets/releve-des-avis-Ct4Nl8TH.js","assets/SalonFoyer-D5CdJdKH.js","assets/secretariat-admin-CkAr01sW.js","assets/Secretariat-Cy79Zw30.css","assets/Secretariat-f4PWY-r2.js","assets/Signatures-CKogW73k.js","assets/SignerUnPdf-psNtmg8c.js","assets/Synthese-Dkje8yuu.js","assets/SyntheseGraphes-C4Y0Hw_z.js","assets/systeme-TPy-pF7j.css","assets/Tableau-DjMZScPv.js","assets/temps-CZgwoGpC.js","assets/Textes-DLpOzRbT.css","assets/Textes-DTRNIH53.js","assets/tiroirs-CkDzpGy0.css","assets/tiroirs-CS4UbRU3.js","assets/trone-D8uzNFSF.js","assets/trone-o7Jj6nkF.css","assets/useAudiences-DvjCv7HL.js","assets/useClotureDuJour-BSv7KkOK.js","assets/visios-YLvkTpVS.js","assets/Vitrine-BWilTqQJ.css","assets/Vitrine-CHtHVGtK.js","assets/_admin-DMEURL7f.js","assets/_contrat-DRjmNFCv.js","assets/_reuni-PdyLgqBZ.js","assets/_shared-UEHRKp93.js","assets/_signature-DSiSO96L.js","assets/_ui-BrUDlmuM.css","assets/_ui-XjGXxgoZ.js"];
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
