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
const BUILD = "20261113054043";
const A_GARDER = ["./","assets/abonnements-CJkynq9R.js","assets/Abonnements-CYs-HvQr.js","assets/Abonnements-DTY7p2DH.css","assets/Academie-OIpwe2K8.js","assets/Acces-DSjq3Zbg.js","assets/AFaire-Bpu9GbCS.js","assets/afaire-CP1-GDvM.js","assets/Agents-D8S_it8U.js","assets/agents-donnees-DxtFOKn6.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-CZvi_YY4.js","assets/Appels-aMRPpDfk.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/Assistants-D9i2Xwmg.css","assets/Assistants-PfhS3X7z.js","assets/AtelierDesContenus-B6bJ9QNG.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/Audience-VJvspTzY.js","assets/Aujourdhui-PC3Idma-.js","assets/avant-le-fauteuil-lecture-C-n4Ai41.js","assets/AvantLeFauteuil-mWyLfK1x.js","assets/avis-fiches-D9GHqDWG.js","assets/AvisGoogle-D7ns0RF5.js","assets/AvisGoogle-DaPXfwX9.css","assets/BadgeEssai-BflqYhYf.js","assets/bilan-B-bfPYR0.css","assets/bilan-D7nfYqh9.js","assets/BilanMensuel-BbK6b5GY.js","assets/Branches-BzPUkPr3.js","assets/bridges-C_2u0CUv.js","assets/caisse-du-soir-C6vPx-E_.css","assets/caisse-du-soir-Dg3zmJ5i.js","assets/Caisse-KyePhEwT.js","assets/Caisses-DXaHQhnj.js","assets/Calendrier-CgyDmnX5.js","assets/campagnes-pur-CEgdJG0c.js","assets/Carnet-Cvl6Oc22.js","assets/carte-RAbRHetQ.js","assets/carte-_W_-xBPj.css","assets/CarteModal-D3ij9uCx.js","assets/CartesCadeaux-TycHa-0F.js","assets/Catalogue-DQ-QuFxl.js","assets/CentreDeCommande-B4aeaQnI.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-DdZDAPbm.js","assets/certificat-DHx8Jf0F.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-C9DPq5bm.js","assets/chiffre-du-jour-pur-OaU2Iw8p.js","assets/ChiffreDesPrestations-DaRIxjCf.js","assets/client-DMt75Xbb.js","assets/cloture-du-jour-DUK6qXcY.js","assets/ClotureDuTiroir-BKokUkDp.js","assets/Coffre-Da501oW8.js","assets/collecte-mtn-pur-DW4nw7-V.js","assets/components-CT72O1Hn.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-CPP4E649.js","assets/Comptes-DE1-0HUh.js","assets/consultation-By0fYeyL.js","assets/consultation-CRW6QcWf.css","assets/Consultations-CIC0TFwC.js","assets/consultNotes-D63a53BX.js","assets/Conversations-BF3uVOLM.js","assets/Conversations-D4WwB5Zo.css","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-B_ROwce6.js","assets/currency-qfIhGmrs.js","assets/Customers-DhOcPoDE.js","assets/Dashboard-B2x7VsE_.css","assets/Dashboard-DvnhP9lf.js","assets/dates-royOJ4tr.js","assets/Demandes-91dBiwJB.js","assets/DepenseEnUnePhrase-BclXxe-F.js","assets/DepenseEnUnePhrase-BIGRlGqP.css","assets/Depenses-BGY27ULS.js","assets/depenses-saisie-mRl8sHae.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-hIPIA4Lt.js","assets/diagnostics-au-trone-DCyK9Iiq.js","assets/Dictee-D2P9yM7v.css","assets/Dictee-DHCwghP4.js","assets/dictee-pur-cpXUMG49.js","assets/Discussions-DuYlifWy.js","assets/EditeurDesOffres-DIOLCDBl.js","assets/Encaissements-CEj0WuEy.js","assets/enfants-Cua7KjJn.js","assets/Engagements-Cj5S9MhG.css","assets/engagements-coffre-RyHpv-iB.js","assets/Engagements-NgyMmMYm.js","assets/EntreDeuxSeances-Ce8xG7uy.js","assets/Evaluation-C-0QeoC3.js","assets/facture-B2moF8aq.js","assets/Factures-ChDlRKme.js","assets/FenetreDesCivilites-BI-Nk6HF.js","assets/FenetreDesCivilites-zfNk1aak.css","assets/FenetreDuPoint-DGSkO5ZN.js","assets/Fil-CgueeWfB.js","assets/finances-Ds4kOIUN.css","assets/fon-0RTihRMq.js","assets/fournisseurs-BG3Z7HNr.js","assets/Fournisseurs-iIrnciXm.js","assets/foyer-CtSUZ5gN.js","assets/Gerard-7ECM4TZ5.js","assets/Gerard-Cgj-zsJh.css","assets/gerard-donnees-Cq4cowB0.js","assets/gestes-conversation-PtQkAE-8.js","assets/heures-des-rappels-pur-Dig9pZpo.js","assets/HomeRituals-BdprXV4-.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-CDir-NS_.js","assets/ia-centre-CC8flkzh.js","assets/ia-diagnostic-pur-BBLrGY5l.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-tableau-pur-p6UvREJe.js","assets/identite-DwmhE-U_.js","assets/index-Dc_hELcy.js","assets/index.es-B7L8F6rx.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-2vpkr8HD.js","assets/jspdf.es.min-DElBo545.js","assets/JustePrix-CCTgppc8.js","assets/kkiapay-if_YfhSu.js","assets/kkiapay-widget-DnUhUNd4.js","assets/Laboratoire-DP0_bSrB.js","assets/LaJournee-AMr415R0.js","assets/LaJournee-Bn_G0HCt.css","assets/LesPaiements-C9cEZlne.css","assets/LesPaiements-DZ4leujf.js","assets/LettresAuDossier-CdETITPe.js","assets/LienMndPay-CqL7RjNa.js","assets/Marketing-CBI0ZNr2.js","assets/MarketingBranche-D6spzx8j.js","assets/Marque-CIoUN14h.js","assets/MesPourboires-B4GcTwpq.js","assets/MesPourboires-CENjelyb.css","assets/MesTaches-Ca9L6cj8.js","assets/MesTaches-Cc4XUDf6.css","assets/momo-C2ZVfV9J.js","assets/MonMois-Bxbi-BGr.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/MtnMoMo-DYSoHGzd.js","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/objectifs-gYV6KDJc.js","assets/opale-CBpU2mCh.js","assets/oreille-B1AMUmZh.js","assets/paie-du-5-7u4E03Ax.js","assets/paie-du-5-DeJq-K_U.css","assets/paie-du-5-pur-CPiCK8fv.js","assets/paie-par-mtn-BbA7SEAJ.js","assets/PaieParMtn-DSuxhVbi.js","assets/paliers-NpdU8Lf2.js","assets/Parametres-C5r0fgbb.js","assets/parcours-nK8ocgRN.js","assets/Parrainages-CsZlvFMq.js","assets/Parrainages-gAHAPB_6.css","assets/PassageAvantLeFauteuil-CED5z9jG.js","assets/pdf-C8ugO8sV.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/periode-des-pourboires-pur-BUWqfwov.js","assets/Personas-yUJyVXc4.js","assets/Personnel-CjiiVLfi.js","assets/photo-BoG-k7zO.js","assets/pilotage-D8kf1Co8.css","assets/Pourboires-CXyr_VII.js","assets/Predictions-BlNgQvj_.js","assets/Prestataires-_zhZ5naL.js","assets/Prets-CvQ-VQWl.js","assets/PrevisionDuMois-DlFTw3OX.css","assets/PrevisionDuMois-FcWT1OOV.js","assets/Previsions-9BU2Vg1T.css","assets/Previsions-CUFkmxmM.js","assets/previsions-pur-CEAn7Flk.js","assets/processus-pur-R6U5QcCi.js","assets/Projets-CJSlTYy8.js","assets/Projets-COO7WDEE.css","assets/projets-D69PA7Ci.js","assets/projets-pur-2ZEMRNDU.js","assets/protocoles-BrhD4fX_.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-C-SvJXIb.js","assets/qualification-DWY6X4nz.js","assets/quiz-5qMPWZVi.js","assets/Rapport-BUgkEVVr.js","assets/Recommandations-DpX4QPkE.js","assets/regler-BE_ZsjzN.js","assets/regler-DHR_B1Dm.css","assets/relances-pur-BacTXlI2.js","assets/releve-des-avis-GJrKztNK.js","assets/SalonFoyer-BfvvzZWr.js","assets/secretariat-admin-BwrMyCSd.js","assets/Secretariat-BGbyj2_Z.js","assets/Secretariat-Cy79Zw30.css","assets/Signatures-Co3_IDI1.js","assets/SignerUnPdf-CVturCeK.js","assets/Synthese-D0QEKe9g.js","assets/SyntheseGraphes-Bt0jliWi.js","assets/systeme-TPy-pF7j.css","assets/Tableau-Cfdkz3A7.js","assets/temps-jKhmxDKi.js","assets/Textes-BFQPQvzf.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-BaaITp4g.js","assets/tiroirs-CkDzpGy0.css","assets/trone--5eEbmJA.js","assets/trone-D-JVcd4-.css","assets/useAudiences-CyaFYTV8.js","assets/useClotureDuJour-vj2ojHXW.js","assets/Vitrine-BWilTqQJ.css","assets/Vitrine-DbF41u_X.js","assets/_admin-B6aRIiF4.js","assets/_contrat-BRpKthuW.js","assets/_reuni-7wNcBO9I.js","assets/_shared-CILKtYKM.js","assets/_signature-BT49Fdwf.js","assets/_ui-BrUDlmuM.css","assets/_ui-ZB8g3HAx.js"];
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
