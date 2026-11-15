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
const BUILD = "20261115073200";
const A_GARDER = ["./","assets/Abonnements-a3zAMOGN.js","assets/abonnements-BFwIWpGa.js","assets/Abonnements-DTY7p2DH.css","assets/Academie-BzIUfeCk.js","assets/Acces-Cty1FmQa.js","assets/afaire-6N3zHpWh.js","assets/AFaire-DhXYN9hX.js","assets/Agents-D2PbnWSK.js","assets/agents-donnees-nCsEWVJm.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-CJEJUEYh.js","assets/Appels-ow7TBixm.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/Assistants-B0Y11iFu.js","assets/Assistants-D9i2Xwmg.css","assets/AtelierDesContenus-D3-p6F2A.css","assets/AtelierDesContenus-DXhE763Q.js","assets/Audience-BfHboJbx.js","assets/Aujourdhui-B2wdWRxy.js","assets/avant-le-fauteuil-lecture-BsSnD1T6.js","assets/AvantLeFauteuil-zR6FfjzG.js","assets/avis-fiches-DzdPaCh-.js","assets/AvisGoogle-Ba9K50vd.js","assets/AvisGoogle-DaPXfwX9.css","assets/BadgeEssai-Dr-w0rDm.js","assets/BadgeSuggere-Y6te2fLG.js","assets/besoins-BATN7mOC.js","assets/BesoinsEtRegles-BX2WzPbF.js","assets/BesoinsEtRegles-CzntMbJE.css","assets/bilan-B-bfPYR0.css","assets/bilan-V5JDncqs.js","assets/BilanMensuel-JOLjwJWC.js","assets/Branches-BtQGNIPr.js","assets/bridges-CxFKHhjC.js","assets/Caisse-CZD2ZrI1.js","assets/caisse-du-soir-C6vPx-E_.css","assets/caisse-du-soir-VR9BzgOf.js","assets/Caisses-D9Kjqlp-.js","assets/Calendrier-Cu1E9Ust.js","assets/campagnes-pur-NlaHEmXq.js","assets/Carnet-MruYuThn.js","assets/carte-Czc7zACS.js","assets/carte-_W_-xBPj.css","assets/CarteModal-MrUx9UdX.js","assets/CartesCadeaux-C2oBbBl5.js","assets/Catalogue-ypz6WCOk.js","assets/CentreDeCommande-B7MT1Tf2.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-aqa99tw8.js","assets/certificat-BqGae_09.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-23RauhHf.js","assets/chiffre-du-jour-pur-D-e_EYJs.js","assets/ChiffreDesPrestations-C7osBQu4.js","assets/client-CPxQJsS4.js","assets/cloture-du-jour-C8Y_yhYY.js","assets/ClotureDuTiroir-Dm3LeUhn.js","assets/Coffre-BeArRXA_.js","assets/collecte-mtn-pur-D9rF7FS0.js","assets/components-CN0NDKaf.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-DXjIbF6k.js","assets/Comptes-DE5k-crZ.js","assets/consultation-BtL88vFs.js","assets/consultation-CRW6QcWf.css","assets/Consultations-Bf2vsAjv.js","assets/Consultations-DiE-2_mG.css","assets/consultNotes-DNXOQueY.js","assets/Conversations-Cl1G5Yl0.js","assets/Conversations-D4WwB5Zo.css","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-Dkz8B8Po.js","assets/currency-qfIhGmrs.js","assets/Customers-BeKpMMk1.js","assets/Dashboard-B2x7VsE_.css","assets/Dashboard-CbBK59US.js","assets/dates-BmRtglGN.js","assets/Demandes-CRCsCvAG.js","assets/DepenseEnUnePhrase-BIGRlGqP.css","assets/DepenseEnUnePhrase-imsqDhGl.js","assets/Depenses-CILGWgHe.js","assets/depenses-saisie-DZRXMSwp.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-BiHJLb8z.js","assets/diagnostics-au-trone-ZOWp-L20.js","assets/Dictee-BIQFbKhA.css","assets/Dictee-ClnYrTSv.js","assets/dictee-pur-CRfcMyg-.js","assets/Discussions-M4lrKcmo.js","assets/EditeurDesOffres-vLEFj_3z.js","assets/Encaissements-rMB9plTl.js","assets/enfants-nIpPrae4.js","assets/Engagements-Cj5S9MhG.css","assets/engagements-coffre-VCrkCMR3.js","assets/Engagements-CtUR7Xk7.js","assets/EntreDeuxSeances-DXkVCY2j.js","assets/Evaluation-296-GvS5.js","assets/facture-C3oFBSnm.js","assets/Factures-Do2Vr02H.js","assets/FenetreDesCivilites-CDTaterm.js","assets/FenetreDesCivilites-zfNk1aak.css","assets/FenetreDuPoint-DmMTSp6v.js","assets/Fil-BoLIl3MG.js","assets/finances-C8x7Mn4-.css","assets/fon-D7t3kelN.js","assets/Fournisseurs-C_fGgoAX.js","assets/fournisseurs-DpLze_ek.js","assets/foyer-C6mZ6fGH.js","assets/Gerard-BpfBbsvR.js","assets/Gerard-Cgj-zsJh.css","assets/gerard-donnees-DRh83NpJ.js","assets/gestes-conversation-nxnPP-JG.js","assets/heures-des-rappels-pur-BWJPB8OP.js","assets/HomeRituals-Be0uXZ27.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-IdGOUbDX.js","assets/ia-centre-stQGje3Z.js","assets/ia-diagnostic-pur-BNtkwfR3.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-tableau-pur-p6UvREJe.js","assets/identite-Buti6yKz.js","assets/index-DqU5nN1H.js","assets/index.es-D3InDcGU.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-Do62wyei.js","assets/jspdf.es.min-BCw2ncDp.js","assets/JustePrix-BLKo7XTD.js","assets/kkiapay-DN3V_6SC.js","assets/kkiapay-widget-CVmsl9OE.js","assets/Laboratoire-btjjltP9.js","assets/LaJournee-Bh8iRUSB.js","assets/LaJournee-Bn_G0HCt.css","assets/le-caissier-pur-Bsmfw8Eb.js","assets/LesPaiements-C9cEZlne.css","assets/LesPaiements-CxsQIDjB.js","assets/LettresAuDossier-BZpzd4Da.js","assets/LienMndPay-Bubk1hRj.js","assets/Marketing-Bgj9aZDy.js","assets/MarketingBranche-BD-as4dW.js","assets/Marque-Bow0lqw0.js","assets/MesPourboires-CENjelyb.css","assets/MesPourboires-DYZGRmhi.js","assets/MesTaches-Cc4XUDf6.css","assets/MesTaches-YnOttRO7.js","assets/momo-C2ZVfV9J.js","assets/MonMois-Ct3kadDl.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/MtnMoMo-D4sGydTW.js","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/objectifs-DtfGBcxt.js","assets/opale-SxQqT7Fn.js","assets/oreille-B1AMUmZh.js","assets/paie-du-5-C4e9_uZO.js","assets/paie-du-5-DeJq-K_U.css","assets/paie-du-5-pur-CPiCK8fv.js","assets/paie-par-mtn-Bl0NgFYC.js","assets/PaieParMtn-C31ujh59.js","assets/paliers-Dpq7EznD.js","assets/Parametres-C-oJ8-2b.js","assets/parcours-BHV2hzgx.js","assets/Parrainages-CEYQfcRa.js","assets/Parrainages-gAHAPB_6.css","assets/PassageAvantLeFauteuil-CrEau0lA.js","assets/pdf-G2Ag0KA_.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/periode-des-pourboires-pur-BUWqfwov.js","assets/Personas-C13PQT7X.js","assets/Personnel-Cek9jWjE.js","assets/photo-DdR0tNBx.js","assets/pilotage-D8kf1Co8.css","assets/Pourboires-DeMYy74B.js","assets/Predictions-CtwpsemM.js","assets/Prestataires-Beb4T2cy.js","assets/Prets-CX3yU1ty.js","assets/PrevisionDuMois-DlFTw3OX.css","assets/PrevisionDuMois-HOOiS1vd.js","assets/Previsions-9BU2Vg1T.css","assets/Previsions-DwOjKihp.js","assets/previsions-pur-ChYQdcel.js","assets/processus-pur-R6U5QcCi.js","assets/projets-C8U4xHM6.js","assets/Projets-COO7WDEE.css","assets/Projets-G_cGeF8L.js","assets/projets-pur-2ZEMRNDU.js","assets/protocoles-Bs0VMkMe.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-BU7yaDiw.js","assets/qualification-CK2mR9FI.js","assets/quiz-5qMPWZVi.js","assets/Rapport-BYaN0QJL.js","assets/Recommandations-Jipghn6w.js","assets/regler-DHR_B1Dm.css","assets/regler-DpTFoBgN.js","assets/regler-par-fedapay-pur-CFL4EbBx.js","assets/relances-pur-BacTXlI2.js","assets/releve-des-avis-CzrDmJhN.js","assets/SalonFoyer-DBRiUmYg.js","assets/secretariat-admin-C0Jkv2BY.js","assets/Secretariat-Cy79Zw30.css","assets/Secretariat-DmhNPbcy.js","assets/Signatures--0cvIFdV.js","assets/SignerUnPdf-Bne7b8cF.js","assets/Synthese-DRpqavr8.js","assets/SyntheseGraphes-CH4JBE8v.js","assets/systeme-TPy-pF7j.css","assets/Tableau-DhEF6j4v.js","assets/temps-CBdVGUKl.js","assets/Textes-BETY9gU2.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-CkDzpGy0.css","assets/tiroirs-DtH4YDiA.js","assets/trone-DW9m0bn7.js","assets/trone-DxtNUYxb.css","assets/useAudiences-D2jI-2wJ.js","assets/useClotureDuJour-BUO5jVit.js","assets/visios-Bvbv5qpr.js","assets/Vitrine-BWilTqQJ.css","assets/Vitrine-C9ykl18q.js","assets/_admin-ND_gNajT.js","assets/_contrat-Bl98LQ7z.js","assets/_reuni-Bnifn8Tr.js","assets/_shared-JXFn_gUG.js","assets/_signature-ByrYO-l7.js","assets/_ui-BrUDlmuM.css","assets/_ui-DmfNeReO.js"];
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
