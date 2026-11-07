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
const BUILD = "20261107144021";
const A_GARDER = ["./","assets/Abonnements-BLtzUuJD.js","assets/Abonnements-DTY7p2DH.css","assets/abonnements-kjFhdlSN.js","assets/Academie-Duijub69.js","assets/Acces-CNIeZV17.js","assets/AFaire-DfUDb9rl.js","assets/afaire-JYlNbW23.js","assets/Agents-C11tJtAH.js","assets/agents-donnees-nPwjbcvL.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-r29kxwgW.js","assets/Appels-CnIT4oEM.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/Assistants-96nZkF7G.js","assets/Assistants-D9i2Xwmg.css","assets/AtelierDesContenus-BhlHnG25.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/Audience-CQ1rzEgY.js","assets/Aujourdhui-BMi_t-UC.js","assets/avant-le-fauteuil-lecture-52DvlrTf.js","assets/AvantLeFauteuil-BZSqTJbn.js","assets/avis-fiches-DB8vU487.js","assets/AvisGoogle-B6nvM8Yy.js","assets/AvisGoogle-DaPXfwX9.css","assets/BadgeEssai-BN19rvne.js","assets/bilan-B-bfPYR0.css","assets/bilan-Bl9UbK3f.js","assets/BilanMensuel-B0CHu48l.js","assets/Branches-DC3L3q4K.js","assets/bridges-4uOqRwS8.js","assets/Caisse-B9vEw0cM.js","assets/caisse-du-soir-BhnCuDql.js","assets/caisse-du-soir-C6vPx-E_.css","assets/Caisses-ChIiw0e4.js","assets/Calendrier-Cq1OX-oY.js","assets/campagnes-pur-Bi2A4_R8.js","assets/Carnet-CLKgIXIv.js","assets/carte-BUqxUJZ4.js","assets/carte-_W_-xBPj.css","assets/CarteModal-tuz_Q3rb.js","assets/CartesCadeaux-i9VpTYx8.js","assets/Catalogue-0UOtrHTZ.js","assets/CentreDeCommande-CntbD5he.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-BRMzSWWB.js","assets/certificat-z1c83Ds2.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-DKhgBONX.js","assets/chiffre-du-jour-pur-Dy1FjqUX.js","assets/ChiffreDesPrestations-CCjnlJ3b.js","assets/client-BORxEtYJ.js","assets/cloture-du-jour-_c4Vxdmi.js","assets/ClotureDuTiroir-0miwuO8r.js","assets/Coffre-CXfKDch8.js","assets/components-Dc01MYLu.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-BKUCZK0P.js","assets/Comptes-CiiYTcpX.js","assets/consultation-CRW6QcWf.css","assets/consultation-r8o5G7Lj.js","assets/Consultations-Dc9BpTvF.js","assets/consultNotes-DVYSMtpD.js","assets/Conversations-CUgSG7al.js","assets/Conversations-D4WwB5Zo.css","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-B8duOd2Q.js","assets/currency-qfIhGmrs.js","assets/Customers-BVEpdBn2.js","assets/Dashboard-B2x7VsE_.css","assets/Dashboard-DX32WAcK.js","assets/dates-DD-Lbb5D.js","assets/Demandes-DfwNhKcv.js","assets/DepenseEnUnePhrase-BIGRlGqP.css","assets/DepenseEnUnePhrase-bShqZVRE.js","assets/Depenses--E53Oy-N.js","assets/depenses-saisie-Cmqmcj-j.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-BdzMAvIO.js","assets/diagnostics-au-trone-DDapWNNy.js","assets/Dictee-D0UE4HFE.js","assets/Dictee-D2P9yM7v.css","assets/dictee-pur-1I-8ZxTy.js","assets/Discussions-Bhdblq1y.js","assets/EditeurDesOffres-BQARlNcv.js","assets/Encaissements-Bh70tQOS.js","assets/enfants-BdQFFJc4.js","assets/Engagements-BmPuJ-mm.js","assets/Engagements-Cj5S9MhG.css","assets/engagements-coffre-CSW3ba8m.js","assets/EntreDeuxSeances-d1tP5mK6.js","assets/Evaluation-BXNoKZV6.js","assets/Factures-CTzlbnIC.js","assets/FenetreDesCivilites-Cl13u6du.js","assets/FenetreDesCivilites-zfNk1aak.css","assets/FenetreDuPoint-C2La2UxB.js","assets/Fil-BzbQUQqv.js","assets/finances-BMFnlkRx.css","assets/fon-D_fqM2r9.js","assets/Fournisseurs-BfJRR7kF.js","assets/fournisseurs-D4ezvNma.js","assets/foyer-C9xNEyPx.js","assets/Gerard-Cgj-zsJh.css","assets/Gerard-CxmOdwE9.js","assets/gerard-donnees-CaTcs7nL.js","assets/gestes-conversation-BZNsFG1U.js","assets/HomeRituals-CP6i5hj5.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-Be8vp2a3.js","assets/ia-centre-azTm_1_f.js","assets/ia-diagnostic-pur-BBLrGY5l.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-tableau-pur-CSRjGtTf.js","assets/identite-Cj2SDYER.js","assets/index-9E6gyBKV.js","assets/index.es-CSsHPLAO.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-on9mvqAK.js","assets/jspdf.es.min-DaC_-bKn.js","assets/JustePrix-Dwj04hbt.js","assets/kkiapay-CTvB_8kK.js","assets/kkiapay-widget-DnUhUNd4.js","assets/Laboratoire-BIcceoW6.js","assets/LaJournee-Bn_G0HCt.css","assets/LaJournee-hAXcpjL1.js","assets/LesPaiements-BvdfOCbQ.css","assets/LesPaiements-Cxc0M4hI.js","assets/LettresAuDossier-CnFe4O0Y.js","assets/LienMndPay-n44XSJfU.js","assets/Marketing-DhbeiSum.js","assets/MarketingBranche-PLG23lgm.js","assets/Marque-CASMJtQQ.js","assets/MesPourboires-BCus8rZz.js","assets/MesPourboires-D9I_9rZf.css","assets/MesTaches-Cc4XUDf6.css","assets/MesTaches-D779Vm-u.js","assets/momo-C2ZVfV9J.js","assets/MonMois-9o8QWT8t.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-C8kLV019.js","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/opale-B5f1Decr.js","assets/oreille-B1AMUmZh.js","assets/paie-du-5-DeJq-K_U.css","assets/paie-du-5-idweJf1e.js","assets/paie-du-5-pur-B9ZJpTyb.js","assets/PaieParMtn-Bskr1f_W.js","assets/paliers-DMmMbu6_.js","assets/Parametres-BeOATSs4.js","assets/parcours-jGQPCBPX.js","assets/Parrainages-DbnPJSAX.js","assets/Parrainages-gAHAPB_6.css","assets/PassageAvantLeFauteuil-C1s0PgZH.js","assets/pdf-DuH2cbDb.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/Personas-DZGH9ZPt.js","assets/Personnel-C6U11EFW.js","assets/photo-BLkSRFqK.js","assets/pilotage-D8kf1Co8.css","assets/Pourboires-B_kIdlX2.js","assets/Predictions-ZP4AL8PR.js","assets/Prestataires-6y1U4A0w.js","assets/Prets-Dz9snfRI.js","assets/PrevisionDuMois-Cw402cm1.js","assets/PrevisionDuMois-DlFTw3OX.css","assets/Previsions-DkJYYQgv.js","assets/previsions-pur-C8qlloh7.js","assets/Previsions-r4v19Anp.css","assets/processus-pur-R6U5QcCi.js","assets/Projets-BeMZfeoT.js","assets/Projets-COO7WDEE.css","assets/projets-DsHGvzk9.js","assets/projets-pur-2ZEMRNDU.js","assets/protocoles-Bu3BsMka.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-BZI3fDuU.js","assets/qualification-C1ejaKa8.js","assets/quiz-5qMPWZVi.js","assets/Rapport-CzhAkBUx.js","assets/Recommandations-B7ioG7CM.js","assets/regler-C5hcM02_.css","assets/regler-Dluk9_SD.js","assets/regler-la-seance-serveur-Bs6rzqZX.js","assets/relances-pur-lwRTXc5E.js","assets/releve-des-avis-C6o18JQ-.js","assets/SalonFoyer-CM5d2biO.js","assets/secretariat-admin-ClJqkZmG.js","assets/Secretariat-ByQ1ic9N.js","assets/Secretariat-Cy79Zw30.css","assets/Signatures-Dv78-LDu.js","assets/SignerUnPdf-BOg5MfAu.js","assets/Synthese-BUqcizWD.js","assets/SyntheseGraphes-DRa3UIr-.js","assets/systeme-TPy-pF7j.css","assets/Tableau-GU1VEOO5.js","assets/temps-7ip1Wz5x.js","assets/Textes-BbWeNAFo.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-CkDzpGy0.css","assets/tiroirs-CkpIUGzZ.js","assets/trone-CQ2DUl_d.css","assets/trone-DpXTl86W.js","assets/useAudiences-DiGoLyyp.js","assets/useClotureDuJour-DOcRZVXp.js","assets/Vitrine-BWilTqQJ.css","assets/Vitrine-g1E9L70z.js","assets/_admin-ot5kxjId.js","assets/_contrat-BWAEZ-uU.js","assets/_heures-hQwhtlvs.js","assets/_reuni-BuaT2V0w.js","assets/_shared-CPBfO5Xq.js","assets/_signature-DvshWtfR.js","assets/_ui-BrUDlmuM.css","assets/_ui-DvO2v54m.js"];
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
