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
const BUILD = "20261118100924";
const A_GARDER = ["./","assets/abonnements-BaMby2RW.js","assets/Abonnements-DOCmG7tr.js","assets/Abonnements-DTY7p2DH.css","assets/Academie-DlFkgrQW.js","assets/Acces-DUGzu0Kt.js","assets/AFaire-CPSr1EiA.js","assets/afaire-CuruJlLW.js","assets/Agents-D5xsdrBz.js","assets/agents-donnees-D0Ms-mB_.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-YFo_fnIJ.js","assets/App-DzJkbH9a.js","assets/Appels-CJMutV9i.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/Assistants-D0jv6Itb.js","assets/Assistants-D9i2Xwmg.css","assets/AtelierDesContenus-CqFAc0z7.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/Audience-BwZpIeec.js","assets/Aujourdhui-5Lida1hb.js","assets/auth-BjkaiSUr.js","assets/avant-le-fauteuil-lecture-ea0UrfN-.js","assets/AvantLeFauteuil-CM47EjBK.js","assets/avis-fiches-C1ROZVVY.js","assets/AvisGoogle-CoT76yAs.js","assets/AvisGoogle-DaPXfwX9.css","assets/BadgeEssai-Ce3fZhAk.js","assets/BadgeSuggere-viKmSQl-.js","assets/besoins-B3blfAv4.js","assets/BesoinsEtRegles-BLwxGVV5.css","assets/BesoinsEtRegles-DUF1fexP.js","assets/bilan-B-bfPYR0.css","assets/bilan-B_xvl7kZ.js","assets/BilanMensuel-BYdZ7cfJ.js","assets/Branches-CURxmpPh.js","assets/bridges-DgvNLL_z.js","assets/Caisse-CNsdAb3e.js","assets/caisse-du-soir-C6vPx-E_.css","assets/caisse-du-soir-CywBGE58.js","assets/Caisses-CVFNvjRC.js","assets/Calendrier-31ohz2FT.js","assets/campagnes-pur-Cf4tVhF1.js","assets/Carnet-Cvp0wBto.js","assets/carte-DtEnLgl6.js","assets/carte-_W_-xBPj.css","assets/CarteModal--isF9nSl.js","assets/CartesCadeaux-N8vSp0Hj.js","assets/Catalogue-CwjryNFp.js","assets/CentreDeCommande-BXPkfMTU.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-B1s5gOZ1.js","assets/certificat-CBy6tbGL.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-Bs5qMwjT.js","assets/chiffre-du-jour-pur-DHNYZG-Y.js","assets/ChiffreDesPrestations-Dxo0WJXD.js","assets/client-0tJXnO1e.js","assets/cloture-du-jour-CEwOzLKf.js","assets/ClotureDuTiroir-Bt8qRjOc.js","assets/Coffre-B_nMPMoZ.js","assets/collecte-mtn-pur-Bq3uWgWT.js","assets/components-DRMMKgOo.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-DjCRO64C.js","assets/Comptes-DZ4Wyipm.js","assets/consultation-CILf3Fvq.js","assets/consultation-CRW6QcWf.css","assets/Consultations-DiE-2_mG.css","assets/Consultations-DVlzDmvl.js","assets/consultNotes-C7O_LKNs.js","assets/Conversations-D4WwB5Zo.css","assets/Conversations-DFnWaWLW.js","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-Cw57Jo8-.js","assets/currency-Cd0clE4P.js","assets/Customers-DHEWhE2u.js","assets/Dashboard-B2x7VsE_.css","assets/Dashboard-Ua9NQdqU.js","assets/dates-DXEIrS-Z.js","assets/Demandes-BnfXIMZn.js","assets/DepenseEnUnePhrase-BIGRlGqP.css","assets/DepenseEnUnePhrase-BSlotDaV.js","assets/Depenses-DUTaYJBt.js","assets/depenses-saisie-DCWuQOQ5.js","assets/devis-remis-DIz9XSBQ.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-Bct0KYdl.js","assets/diagnostics-au-trone-DnV0xnqF.js","assets/Dictee-C-pUYYFA.css","assets/Dictee-CGFHoOuw.js","assets/dictee-pur-ccHcnpz5.js","assets/Discussions-CCycG6Ne.js","assets/echappe-html-pur-gEhHOM07.js","assets/EditeurDesOffres-BWfNeEeZ.js","assets/Encaissements-Dl9YASjP.js","assets/enfants-jDtytql5.js","assets/Engagements-BrRu0RJ5.js","assets/Engagements-Cj5S9MhG.css","assets/engagements-coffre-Df5ffCGn.js","assets/EntreDeuxSeances-Dd_oU-9Y.js","assets/es-BKe7NNfn.js","assets/Evaluation-DiLQDL9q.js","assets/facture-2QU1RRSF.js","assets/Factures-Bghw-cBr.js","assets/FenetreDeLAgent-DLVlnkcD.js","assets/FenetreDesCivilites-D0oKoYn-.js","assets/FenetreDesCivilites-zfNk1aak.css","assets/FenetreDuPoint-vK1PmmyX.js","assets/Fil-BDOaHXma.js","assets/finances-C8x7Mn4-.css","assets/fon-NqfRTpE3.js","assets/fournisseurs-Cco4Rvim.js","assets/Fournisseurs-CggL5GIw.js","assets/foyer-rszJKII0.js","assets/Gerard-Cec82nHe.css","assets/Gerard-DbkGMdhl.js","assets/gerard-donnees-BDBsmH4K.js","assets/gestes-conversation-Sxto6llm.js","assets/heures-des-rappels-pur-BWJPB8OP.js","assets/HomeRituals-DF23qE0j.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-B12z844h.js","assets/ia-centre-Xb0tUQAm.js","assets/ia-diagnostic-pur-qGnFEvys.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-tableau-pur-p6UvREJe.js","assets/identite-5lkTKrKb.js","assets/index.es-BCYd_tkT.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-DnCjXTP_.js","assets/jspdf.es.min-C2RbUILf.js","assets/JustePrix-bTypwDie.js","assets/kkiapay-DqSo9LTg.js","assets/kkiapay-widget-CVmsl9OE.js","assets/Laboratoire-DqNPwwGh.js","assets/LaJournee-Bn_G0HCt.css","assets/LaJournee-CgOECE02.js","assets/le-caissier-pur-2RZrTYf4.js","assets/LesPaiements-B6nIjxP0.js","assets/LesPaiements-C9cEZlne.css","assets/LettresAuDossier-B6BYsyVt.js","assets/LienMndPay-BH3cwDzt.js","assets/Marketing-DnlNsyf3.js","assets/MarketingBranche-OUbadasu.js","assets/Marque-B2W-K5D8.js","assets/MesPourboires-CENjelyb.css","assets/MesPourboires-DnCAU-QD.js","assets/MesTaches-BTXKU3Z4.js","assets/MesTaches-Cc4XUDf6.css","assets/momo-C2ZVfV9J.js","assets/MonMois-DRSDbJlV.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/MtnMoMo-DbZvpPyC.js","assets/objectifs-D8NE81ap.js","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/opale-CWK_KsRr.js","assets/oreille-B1AMUmZh.js","assets/paie-du-5-DeJq-K_U.css","assets/paie-du-5-DTTg8Ms8.js","assets/paie-du-5-pur-CPiCK8fv.js","assets/paie-par-mtn-CtWobCaK.js","assets/PaieParMtn-DAYMAHr1.js","assets/paliers-S-c-00Ru.js","assets/Parametres-CYYoVU1B.js","assets/parcours-DArVGQTf.js","assets/Parrainages-B1-AxazA.js","assets/Parrainages-gAHAPB_6.css","assets/PassageAvantLeFauteuil-8itul-S5.js","assets/pdf-D2QyrsrR.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/periode-des-pourboires-pur-BUWqfwov.js","assets/Personas-DBIXIBpe.js","assets/Personnel-2dhzm5Rn.js","assets/photo-0dAUveww.js","assets/pilotage-D8kf1Co8.css","assets/porte-de-l-equipe-C7n6v7uC.js","assets/Pourboires-BhhcN8nZ.js","assets/Predictions-QFoY_seS.js","assets/preload-helper-BRe_O-Rg.js","assets/Prestataires-4Wdelm5L.js","assets/Prets-tCBQ_zPX.js","assets/PrevisionDuMois-DlFTw3OX.css","assets/PrevisionDuMois-DyTuIC5e.js","assets/Previsions-9BU2Vg1T.css","assets/Previsions-BLCQXSLZ.js","assets/previsions-pur-BCSo8Q2g.js","assets/processus-pur-R6U5QcCi.js","assets/projets-ChPGRQNw.js","assets/Projets-COO7WDEE.css","assets/projets-pur-2ZEMRNDU.js","assets/Projets-_BY5OCqd.js","assets/protocoles-BkCm9XuJ.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-Dq3Zs8Zb.js","assets/quiz-5qMPWZVi.js","assets/Rapport-BiyIriKw.js","assets/Recommandations-dOQLU-sd.js","assets/regler-DHR_B1Dm.css","assets/regler-myl_2MHx.js","assets/regler-par-fedapay-pur-G8CEJdGn.js","assets/relances-pur-BacTXlI2.js","assets/releve-des-avis-uniUo5A5.js","assets/SalonFoyer-Y6XYkHB2.js","assets/secretariat-admin-DDJMd-ZK.js","assets/Secretariat-CsjuAF-8.js","assets/Secretariat-Cy79Zw30.css","assets/Signatures-D3vqpCaF.js","assets/SignerUnPdf-DRnD6jV_.js","assets/Synthese-Cp-mmNyq.js","assets/SyntheseGraphes-CITrQ0ft.js","assets/systeme-TPy-pF7j.css","assets/Tableau-PNS-PEXH.js","assets/temps-CegF5zg8.js","assets/Textes-DLpOzRbT.css","assets/Textes-GbxeqX4Z.js","assets/tiroirs-1sigB98J.js","assets/tiroirs-CkDzpGy0.css","assets/trone-BUgVtm7W.js","assets/trone-fVMGnfYY.css","assets/useAudiences-B5chx8CY.js","assets/useClotureDuJour-Ca2ttSB-.js","assets/visios-BPLHbHN9.js","assets/Vitrine-b0v1QkLe.js","assets/Vitrine-BWilTqQJ.css","assets/_admin-gsN7NWmc.js","assets/_contrat-BVP1O26i.js","assets/_reuni-CdANsGPg.js","assets/_shared-DR_OTqn5.js","assets/_signature-ezUFmiAS.js","assets/_ui-BrUDlmuM.css","assets/_ui-DYTjJMg6.js"];
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
