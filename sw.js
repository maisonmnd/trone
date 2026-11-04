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
const BUILD = "20261104234642";
const A_GARDER = ["./","assets/Abonnements-B9ZPwCtl.js","assets/abonnements-BHMcJSew.js","assets/Academie-pD53LGms.js","assets/Acces-D-xIgJs9.js","assets/actions-aOXhD-dT.css","assets/actions-CVdqcF14.js","assets/AFaire-CCD0_Aci.js","assets/afaire-CUYwBOrk.js","assets/Agents-3ZKtl7l8.js","assets/agents-donnees-BPlUtKz3.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-TaRH3aYG.js","assets/Appels-ClrUG-90.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/Assistants-BOcxTwZO.css","assets/Assistants-dPLX5NFy.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/AtelierDesContenus-IM4peuTu.js","assets/AuComptoir-BklxfBAr.js","assets/Audience-BGgKHkEx.js","assets/Aujourdhui-Ddbo2nx5.js","assets/avant-le-fauteuil-lecture-4jn6rV6R.js","assets/AvantLeFauteuil-C94CZ_c5.js","assets/avis-fiches-DGs6Vcwr.js","assets/AvisGoogle-CpfEHYqS.js","assets/AvisGoogle-DaPXfwX9.css","assets/bilan-B-bfPYR0.css","assets/bilan-BAk5D-qN.js","assets/BilanMensuel-CGbvaSFE.js","assets/Branches-CcduzZ9V.js","assets/bridges-D5HN1Lfo.js","assets/Caisse-BGRgF_O0.js","assets/caisse-du-soir-BnG3CfvH.js","assets/Caisses-BlH-VBqu.js","assets/Calendrier-BxgtHdOe.js","assets/campagnes-pur-DVPH3Udy.js","assets/Carnet-BJGpNDOY.js","assets/carte-vgcEeU4S.js","assets/carte-_W_-xBPj.css","assets/CarteModal-BxXR37MP.js","assets/CartesCadeaux-jH4Wypbd.js","assets/Catalogue-DW1mQJSr.js","assets/CentreDeCommande-DRV6e9C7.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-Bmi0gY4W.js","assets/certificat-D-EYL644.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-D7YXYpQ2.js","assets/ChiffreDesPrestations-DC32K6cN.js","assets/client-BpKLjMqZ.js","assets/ClotureDuTiroir-C6vPx-E_.css","assets/ClotureDuTiroir-CFz2QeYx.js","assets/Coffre-CtwkQcFb.js","assets/components-D8naDMIH.js","assets/compte-courant-ByzulCEN.js","assets/compte-DY50W7mM.js","assets/CompteCourant-C-bJevmI.js","assets/Comptes-2oPB8Wka.js","assets/Comptoir-mInJuNyj.js","assets/consultation-CRW6QcWf.css","assets/consultation-UKBtACK0.js","assets/Consultations-zMJvmlWT.js","assets/consultNotes-C8m_0y_n.js","assets/Conversations--MiZ6F0W.js","assets/Conversations-D4WwB5Zo.css","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-DczjLQst.js","assets/currency-qfIhGmrs.js","assets/Customers-DSC68c_D.js","assets/Dashboard-uKmMYWkP.js","assets/Dashboard-zjGteuUE.css","assets/dates-CMt2-KD0.js","assets/Demandes-cY65r-cF.js","assets/Depenses-BJaDK27w.js","assets/depenses-saisie-CAfa955B.js","assets/dernier-message-pur-CBYWnq8m.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-C95d0q8X.js","assets/diagnostics-au-trone-9O2jSdeJ.js","assets/Dictee-CrwNpozm.js","assets/Dictee-D2P9yM7v.css","assets/dictee-pur-DurUyLY8.js","assets/Discussions-CEfzqMXE.js","assets/EditeurDesOffres-Cj24cceG.js","assets/Encaissements-CqsHAZfw.js","assets/enfants-DZUIPozl.js","assets/Engagements-C6SafAhc.js","assets/Engagements-Cj5S9MhG.css","assets/EntreDeuxSeances-BGWUSG1D.js","assets/equipe-B_9ZHz24.css","assets/Evaluation-DCbzoRne.js","assets/FacturePrestataire-B-EMwMb1.js","assets/Factures-C9MoiXIL.js","assets/FenetreDesCivilites-BOW7gqwE.js","assets/FenetreDesCivilites-zfNk1aak.css","assets/FenetreDuPoint-j9VVV5rY.js","assets/Fil-BcUqLl7_.js","assets/finances-BMFnlkRx.css","assets/fon-B0C_LX3-.js","assets/fon-pur-CgVkbJ8O.js","assets/Fournisseurs-Ct0zkVzo.js","assets/fournisseurs-waB1BWGQ.js","assets/foyer-raNofB3G.js","assets/Gerard-Bfp4ua88.css","assets/Gerard-DJEliEJq.js","assets/gerard-donnees-CNootOpf.js","assets/gestes-conversation-DlklzIYE.js","assets/HomeRituals-xknZcRk8.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-D0F9sBYG.js","assets/ia-centre-BjG0_DuM.js","assets/ia-diagnostic-pur-BBLrGY5l.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-recu-pur-DcucZqpR.js","assets/identite-CjOWFZTv.js","assets/index-69jtTP4K.js","assets/index.es-DIX0h7HN.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-CTTtRTYH.js","assets/jspdf.es.min-CNfW1WqW.js","assets/JustePrix-CPXw0rcR.js","assets/kkiapay-BYd68r7o.js","assets/kkiapay-widget-DnUhUNd4.js","assets/laboratoire-Chq7yadT.js","assets/Laboratoire-DSmBFiL5.js","assets/LettresAuDossier-BQLXWy-9.js","assets/LienMndPay-CNyOK-xL.js","assets/maisons-CSSFrqZy.js","assets/Marketing-DdmAsTwy.js","assets/MarketingBranche-DYKEXDV4.js","assets/Marque-BpDQIAsc.js","assets/MesTaches-BdcjwXQF.js","assets/MesTaches-Cc4XUDf6.css","assets/missions-prestataires-DdDzXCpz.js","assets/momo-C2ZVfV9J.js","assets/MonMois-BO49SHo4.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-CXv-UbxZ.js","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/opale-6SyHeW8x.js","assets/paliers-B7ZMljGd.js","assets/Parametres-K_fpSSxA.js","assets/parcours-CZ4s2WOJ.js","assets/Parrainages-Dfzn8O9v.js","assets/Parrainages-gAHAPB_6.css","assets/PassageAvantLeFauteuil-DRZ4tlSr.js","assets/pdf-2swl4abC.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/Personas-C5s2AL3O.js","assets/Personnel-7cBoskHM.js","assets/photo-DcPwgmUx.js","assets/pilotage-D8kf1Co8.css","assets/Predictions-B48ReRN_.js","assets/Prestataires-BxzLl-TV.js","assets/Prets-CUzWuQQH.js","assets/prevision-du-mois-pur-D6sJa5lw.js","assets/Previsions-BZWa5AJc.js","assets/Previsions-D-0__Buz.css","assets/previsions-pur-CZbiXhbF.js","assets/processus-pur-BLN25j-E.js","assets/projets-B9UibDZM.js","assets/Projets-COO7WDEE.css","assets/Projets-CXT5GFd7.js","assets/projets-pur-2ZEMRNDU.js","assets/protocoles-CsItchWV.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-DwAPqGdu.js","assets/qualification-Cjh4PRym.js","assets/quiz-5qMPWZVi.js","assets/Rapport-BOM8x6O-.js","assets/RattacherUneCarte-P9kNDn5b.js","assets/Recommandations-D0FN2u7O.js","assets/regler-C5hcM02_.css","assets/regler-JzWCXDSE.js","assets/regler-la-seance-serveur-Bs6rzqZX.js","assets/relances-pur-lwRTXc5E.js","assets/releve-des-avis-DOfXxnKK.js","assets/SalonFoyer-BLusXo5K.js","assets/secretariat-admin-BXxAk0Xm.js","assets/Secretariat-Cy79Zw30.css","assets/Secretariat-usAvntQG.js","assets/Signatures-C93L-kIf.js","assets/SignerUnPdf-DG-vzwlR.js","assets/Synthese-ujv3UGuC.js","assets/SyntheseGraphes-KQwH_aj4.js","assets/systeme-TPy-pF7j.css","assets/Tableau-YOW1Y3lf.js","assets/temps-DbEAP1jU.js","assets/Textes-DLpOzRbT.css","assets/Textes-Hcep3db-.js","assets/tiroirs-u2kCQLYX.js","assets/trace-du-moyen-pur-Bx8-suHn.js","assets/trone-Doz5w-gE.css","assets/trone-PHyOX4rt.js","assets/ui-D9AKHXcx.js","assets/useAudiences-DyLvxF2q.js","assets/vente-CauXO8yV.css","assets/Vitrine-BWilTqQJ.css","assets/Vitrine-DZQ6vLCM.js","assets/_admin-DvAqiHYN.js","assets/_contrat-BVEMsQpe.js","assets/_heures-CrVe9Smz.js","assets/_reuni-CkWkQe16.js","assets/_shared-BtZe0UbN.js","assets/_signature-C31QlOUB.js","assets/_ui-BWMA-PlM.css","assets/_ui-CYAX-KON.js"];
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
