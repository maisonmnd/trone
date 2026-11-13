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
const BUILD = "20261113121719";
const A_GARDER = ["./","assets/abonnements-9niTjCp3.js","assets/Abonnements-DCneWUKv.js","assets/Abonnements-DTY7p2DH.css","assets/Academie-C3kB2iXX.js","assets/Acces-DtKo8sMI.js","assets/AFaire-Bdw1U8BN.js","assets/afaire-ISLIit9l.js","assets/Agents-BIAmSn-E.js","assets/agents-donnees-Ww-VFHua.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-Cx5Njkfa.js","assets/Appels-BkcDHFAz.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/Assistants-CuPn61lK.js","assets/Assistants-D9i2Xwmg.css","assets/AtelierDesContenus-D3-p6F2A.css","assets/AtelierDesContenus-ejQuFKLb.js","assets/Audience-C8G5AbdM.js","assets/Aujourdhui-DDpo7LiU.js","assets/avant-le-fauteuil-lecture-B7iplzi6.js","assets/AvantLeFauteuil-D40ylHq4.js","assets/avis-fiches-uUpPSz5g.js","assets/AvisGoogle-DaPXfwX9.css","assets/AvisGoogle-DzbmGVz0.js","assets/BadgeEssai-BeKbzP0I.js","assets/besoins-D_WhL7qZ.js","assets/BesoinsEtRegles--p25OoLa.js","assets/BesoinsEtRegles-CzntMbJE.css","assets/bilan-B-bfPYR0.css","assets/bilan-IujpPYAh.js","assets/BilanMensuel-BiHC7NYe.js","assets/Branches-BjRBqnwJ.js","assets/bridges-CfXn8zCC.js","assets/Caisse-C_5k73wv.js","assets/caisse-du-soir-BD7P9jGx.js","assets/caisse-du-soir-C6vPx-E_.css","assets/Caisses-B0cOsKCZ.js","assets/Calendrier-CL5DHUqq.js","assets/campagnes-pur-BU8VfUBs.js","assets/Carnet-CyWCZK-g.js","assets/carte-Ik_RuL4L.js","assets/carte-_W_-xBPj.css","assets/CarteModal-TJ1lUA9i.js","assets/CartesCadeaux-DRWcr4XN.js","assets/Catalogue-BHvtL65E.js","assets/CentreDeCommande-Bnd9ad5h.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-DD-t3LOT.js","assets/certificat-XwJqdC1t.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-RCvCAn7c.js","assets/chiffre-du-jour-pur-Cw2xtHGL.js","assets/ChiffreDesPrestations-BrinRxVp.js","assets/client-BItyEWaZ.js","assets/cloture-du-jour-B3a8qiDw.js","assets/ClotureDuTiroir-DsdylurK.js","assets/Coffre-Bp-iHI2x.js","assets/collecte-mtn-pur-Bq3uWgWT.js","assets/components-DnPhLYF_.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-66fcs5Q0.js","assets/Comptes-933myrl2.js","assets/consultation-BF_fpFkY.js","assets/consultation-CRW6QcWf.css","assets/Consultations-C-GNBjRr.js","assets/consultNotes-BRj-frVD.js","assets/Conversations-D4WwB5Zo.css","assets/Conversations-fSv4zpkN.js","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-BGokJTJN.js","assets/currency-qfIhGmrs.js","assets/Customers-Dno4sbRC.js","assets/Dashboard-B2x7VsE_.css","assets/Dashboard-Dm6HsLAK.js","assets/dates-DfN8ubXu.js","assets/Demandes-CtoklEhc.js","assets/DepenseEnUnePhrase-BIGRlGqP.css","assets/DepenseEnUnePhrase-DzwfrcXk.js","assets/Depenses-BG75YNk8.js","assets/depenses-saisie-C8z0K_H_.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-D-diDXjN.js","assets/diagnostics-au-trone-CuyhLN-Y.js","assets/Dictee-BThhmlmz.js","assets/Dictee-D2P9yM7v.css","assets/dictee-pur-DCuUGSjz.js","assets/Discussions-DSWnuZ6n.js","assets/EditeurDesOffres-Cc1jIITL.js","assets/Encaissements-k6PXFisR.js","assets/enfants-DDL9MuhL.js","assets/Engagements-Cj5S9MhG.css","assets/engagements-coffre-B478tFpb.js","assets/Engagements-Xc_evKNb.js","assets/EntreDeuxSeances-5KxelknQ.js","assets/Evaluation-BUSicY5Y.js","assets/facture-CgWRRcQV.js","assets/Factures-C91Ap7-X.js","assets/FenetreDesCivilites-Bwz632hM.js","assets/FenetreDesCivilites-zfNk1aak.css","assets/FenetreDuPoint-vazqSOqN.js","assets/Fil-D_2CuNWk.js","assets/finances-C8x7Mn4-.css","assets/fon-CS2CbbPr.js","assets/fournisseurs-3Y5ryem-.js","assets/Fournisseurs-CmK_PyfA.js","assets/foyer-BmEJg3xA.js","assets/Gerard-Cgj-zsJh.css","assets/gerard-donnees-BSFPKAy8.js","assets/Gerard-DujYyfqZ.js","assets/gestes-conversation-zMMpPH9j.js","assets/heures-des-rappels-pur-Dig9pZpo.js","assets/HomeRituals-4lOTD4KL.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-ByQ1gbuP.js","assets/ia-centre--bwhz08s.js","assets/ia-diagnostic-pur-BBLrGY5l.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-tableau-pur-p6UvREJe.js","assets/identite-BrtXEsmr.js","assets/index-CCuuS9YX.js","assets/index.es-C9GegMZs.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-CLIax6U9.js","assets/jspdf.es.min-Cgn6js2k.js","assets/JustePrix-CsdiJtFz.js","assets/kkiapay-fo02VJFV.js","assets/kkiapay-widget-CVmsl9OE.js","assets/Laboratoire-Cm44IJpG.js","assets/LaJournee-Bn_G0HCt.css","assets/LaJournee-Oi2hP7FS.js","assets/LesPaiements-C9cEZlne.css","assets/LesPaiements-DkcwRbjd.js","assets/LettresAuDossier-Begq0awP.js","assets/LienMndPay-D1gMeJHh.js","assets/Marketing-tpyJcNSd.js","assets/MarketingBranche-CHKkKN3q.js","assets/Marque-D-l6qBJa.js","assets/MesPourboires-CENjelyb.css","assets/MesPourboires-DacnaL1w.js","assets/MesTaches-Cc4XUDf6.css","assets/MesTaches-Dx-MCD2G.js","assets/momo-C2ZVfV9J.js","assets/MonMois-DuN4Eb6Q.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/MtnMoMo-D94zlwcx.js","assets/objectifs-D8mkJmE2.js","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/opale-CM8x4djk.js","assets/oreille-B1AMUmZh.js","assets/paie-du-5-D0ZTsz2S.js","assets/paie-du-5-DeJq-K_U.css","assets/paie-du-5-pur-CPiCK8fv.js","assets/paie-par-mtn-CXg8Vcbk.js","assets/PaieParMtn-CFBeUggn.js","assets/paliers-B8JoZxCI.js","assets/Parametres-CbW905Jv.js","assets/parcours-BYKNp816.js","assets/Parrainages-BJap_-J8.js","assets/Parrainages-gAHAPB_6.css","assets/PassageAvantLeFauteuil-BK2-_vOz.js","assets/pdf-BRDX-br2.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/periode-des-pourboires-pur-BUWqfwov.js","assets/Personas-DPV6J9PB.js","assets/Personnel-CSi_F5QO.js","assets/photo-C22g1SAu.js","assets/pilotage-D8kf1Co8.css","assets/Pourboires-CNLAdWG4.js","assets/Predictions-D54CQrhX.js","assets/Prestataires-CgC5HTWh.js","assets/Prets-zA0FeWlR.js","assets/PrevisionDuMois-DlFTw3OX.css","assets/PrevisionDuMois-TCoijy_k.js","assets/Previsions-9BU2Vg1T.css","assets/Previsions-B0bAZ9kA.js","assets/previsions-pur-Bq0hR7o5.js","assets/processus-pur-R6U5QcCi.js","assets/projets-4SeiwQxv.js","assets/Projets-COO7WDEE.css","assets/Projets-i4scu7YT.js","assets/projets-pur-2ZEMRNDU.js","assets/protocoles-BXuJPbho.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-CnOkGKtQ.js","assets/qualification-kh8LHpT-.js","assets/quiz-5qMPWZVi.js","assets/Rapport-md6kJfTm.js","assets/Recommandations-BR6HGLYl.js","assets/regler-Ck_eZC-l.js","assets/regler-DHR_B1Dm.css","assets/regler-par-fedapay-pur-G8CEJdGn.js","assets/relances-pur-BacTXlI2.js","assets/releve-des-avis-BJsPbAKj.js","assets/SalonFoyer-tB-ODVqF.js","assets/secretariat-admin-BzOJ9qTB.js","assets/Secretariat-Cy79Zw30.css","assets/Secretariat-C_qzFLJQ.js","assets/Signatures-CFv0wQAv.js","assets/SignerUnPdf-hvfpYeYP.js","assets/Synthese-C2fnNoo8.js","assets/SyntheseGraphes-B5Tn3xe8.js","assets/systeme-TPy-pF7j.css","assets/Tableau-1oaw5bZd.js","assets/temps-DDk__KMf.js","assets/Textes-DLpOzRbT.css","assets/Textes-sSuNmCV3.js","assets/tiroirs-CkDzpGy0.css","assets/tiroirs-ClbINxQ1.js","assets/trone-Dg6wh-u1.css","assets/trone-Dvwtagsk.js","assets/useAudiences-B39nIHcw.js","assets/useClotureDuJour-Bpwyy-y1.js","assets/Vitrine-BWilTqQJ.css","assets/Vitrine-DVM0ObBw.js","assets/_admin-D9KxNsOB.js","assets/_contrat-Ccg4UjKz.js","assets/_reuni-BTz92Y7q.js","assets/_shared-B8O1frr-.js","assets/_signature-DkJB9XVA.js","assets/_ui-BrUDlmuM.css","assets/_ui-gLFxhNE4.js"];
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
