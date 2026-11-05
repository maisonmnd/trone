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
const BUILD = "20261105080433";
const A_GARDER = ["./","assets/abonnements-B1NKqjQH.js","assets/Abonnements-DRjwl6Qe.js","assets/Academie-CSv2VE9j.js","assets/Acces-_z_0fCfn.js","assets/afaire-D29lqS2S.js","assets/AFaire-M9ygt5g7.js","assets/Agents-CQly04U7.js","assets/agents-donnees-Cm--U3t0.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-CV9GVUOX.js","assets/Appels-KfoPr4J2.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/Assistants-BOcxTwZO.css","assets/Assistants-DFvsTqs_.js","assets/AtelierDesContenus-BwWjHth5.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/Audience-DKcinn2i.js","assets/Aujourdhui-Dh_SALUV.js","assets/avant-le-fauteuil-lecture-DlikD2cp.js","assets/AvantLeFauteuil-CzMiPcgX.js","assets/avis-fiches-CUQBajsb.js","assets/AvisGoogle-DaPXfwX9.css","assets/AvisGoogle-DvTgHc1b.js","assets/bilan-B-bfPYR0.css","assets/bilan-XWkwxIVx.js","assets/BilanMensuel-COdRzyxj.js","assets/Branches-ZRc8kXay.js","assets/bridges-CoHqGVa3.js","assets/Caisse-ckyUS9h8.js","assets/caisse-du-soir-DYki8lCu.js","assets/Caisses-CtHvUUkU.js","assets/Calendrier-B6HYmCea.js","assets/campagnes-pur-CBJjjmuk.js","assets/Carnet-wo1AwVG1.js","assets/carte-TJm8e1JP.js","assets/carte-_W_-xBPj.css","assets/CarteModal-CwAy0znM.js","assets/CartesCadeaux-BRZVipDZ.js","assets/Catalogue-BXpq872h.js","assets/CentreDeCommande-Du8kyJhp.css","assets/CentreDeCommande-KVKyPH-t.js","assets/Cercle-DvS1iKIx.js","assets/certificat-Dh8HsY_7.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-CxEKPOuM.js","assets/ChiffreDesPrestations-DKuqYp34.js","assets/client-6NSfd2K0.js","assets/cloture-du-jour-C_3mF9gU.js","assets/ClotureDuTiroir-C6vPx-E_.css","assets/ClotureDuTiroir-DRX6m7Up.js","assets/Coffre-BkYbuYXM.js","assets/components-Ff_sADcD.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-Cxz5XVNB.js","assets/Comptes-CSxieyKX.js","assets/consultation-10mj4hYJ.js","assets/consultation-CRW6QcWf.css","assets/Consultations-FwpE3ZIQ.js","assets/consultNotes-BwZYstpl.js","assets/Conversations-BTzjohyX.js","assets/Conversations-D4WwB5Zo.css","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-B3BhVp0K.js","assets/currency-qfIhGmrs.js","assets/Customers-DecvWw6V.js","assets/Dashboard-B4d-IVe6.js","assets/Dashboard-zjGteuUE.css","assets/dates-CJuA-JYe.js","assets/Demandes-DA3JEH7b.js","assets/DepenseEnUnePhrase-BIGRlGqP.css","assets/DepenseEnUnePhrase-DdKuNVjK.js","assets/Depenses-B_ERRQ_u.js","assets/depenses-saisie-CKm3nMsM.js","assets/dernier-message-pur-CBYWnq8m.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-DmcodsLf.js","assets/diagnostics-au-trone-BiWC1U-7.js","assets/Dictee-2iAu_lML.js","assets/Dictee-D2P9yM7v.css","assets/dictee-pur-BZnN3DOp.js","assets/Discussions-CwAfkjEE.js","assets/EditeurDesOffres-CrQJi3xs.js","assets/Encaissements-BnyEHwoz.js","assets/enfants-C3BaiCuH.js","assets/Engagements-Cj5S9MhG.css","assets/Engagements-iI1bncVm.js","assets/EntreDeuxSeances-C9Zn_sd6.js","assets/Evaluation-Dys2WqDC.js","assets/FacturePrestataire-BBIdWh_C.js","assets/Factures-DFfNf2-C.js","assets/FenetreDesCivilites-CNNqSd6r.js","assets/FenetreDesCivilites-zfNk1aak.css","assets/FenetreDuPoint-CkTNVeb1.js","assets/Fil-BgI_2H7b.js","assets/finances-BMFnlkRx.css","assets/fon-BHCb_Oq-.js","assets/Fournisseurs-Bdqt2axV.js","assets/fournisseurs-BoLo-fyZ.js","assets/foyer-DYI_eEWp.js","assets/gerard-donnees-UC80NXWZ.js","assets/Gerard-kOIEy-PT.css","assets/Gerard-lzPTx_vC.js","assets/gestes-conversation-BounWIpt.js","assets/HomeRituals-DTMDxWxE.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-CD9KJ0YX.js","assets/ia-centre-ufvdfGj3.js","assets/ia-diagnostic-pur-BBLrGY5l.js","assets/ia-marque-pur-C5lSdGpx.js","assets/identite-BT32jXfF.js","assets/index-BaDeBxo1.js","assets/index.es-DQC9aLaE.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-bU6LKsim.js","assets/jspdf.es.min-hFQhY7yr.js","assets/JustePrix-CQWe4rNG.js","assets/kkiapay-o9hFd1Cl.js","assets/kkiapay-widget-DnUhUNd4.js","assets/la-journee-D9XuGwrB.js","assets/la-journee-DNg04cPb.css","assets/Laboratoire-BkFeu541.js","assets/LaJournee-56rSw38w.js","assets/LettresAuDossier-BlkXYcQm.js","assets/LienMndPay-JGwhXKfO.js","assets/maisons-CSSFrqZy.js","assets/Marketing-Dy8aKHEw.js","assets/MarketingBranche-Bpus6yfn.js","assets/Marque-B15tCVAx.js","assets/MesPourboires-BEql4Zrz.js","assets/MesPourboires-D9I_9rZf.css","assets/MesTaches-Cc4XUDf6.css","assets/MesTaches-DndarN1B.js","assets/momo-C2ZVfV9J.js","assets/MonMois-DaH3uY3t.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-CjnnLrAa.js","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/opale-tGaRm53W.js","assets/paliers-DtLtro3M.js","assets/Parametres-CgPW0zIG.js","assets/parcours-X5R4FVqc.js","assets/Parrainages-G--dunDM.js","assets/Parrainages-gAHAPB_6.css","assets/PassageAvantLeFauteuil-BAS5Wgmh.js","assets/pdf-sXSlD0rN.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/Personas-DjY1xBtx.js","assets/Personnel-BRRyzY9q.js","assets/photo-DeoW5mVQ.js","assets/pilotage-D8kf1Co8.css","assets/Pourboires-C43lHgY_.js","assets/Predictions-BMetaPj_.js","assets/Prestataires-BIW4DKZJ.js","assets/Prets-DYCyo6-d.js","assets/prevision-du-mois-pur-D6sJa5lw.js","assets/Previsions-D-0__Buz.css","assets/Previsions-DtPGo7op.js","assets/previsions-pur-RgTyK-QB.js","assets/processus-pur-BLN25j-E.js","assets/projets-C72EQtMj.js","assets/Projets-COO7WDEE.css","assets/projets-pur-2ZEMRNDU.js","assets/Projets-wrvBu0PJ.js","assets/protocoles-lDWEs56t.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-Ckgg14Qz.js","assets/qualification-CJ4jySNA.js","assets/quiz-5qMPWZVi.js","assets/Rapport-CBeikxoh.js","assets/Recommandations-D4Us7Mq6.js","assets/regler-C5hcM02_.css","assets/regler-la-seance-serveur-Bs6rzqZX.js","assets/regler-m_iyQFxd.js","assets/relances-pur-lwRTXc5E.js","assets/releve-des-avis-BSHREXJV.js","assets/SalonFoyer-C0V1VRmx.js","assets/secretariat-admin-DvhHZIw5.js","assets/Secretariat-BCEDmysG.js","assets/Secretariat-Cy79Zw30.css","assets/Signatures-zIojPE6Y.js","assets/SignerUnPdf-ChW2C7Ae.js","assets/Synthese-DSj64gF1.js","assets/SyntheseGraphes-DiL1AbOA.js","assets/systeme-TPy-pF7j.css","assets/Tableau-2T2ztK7E.js","assets/temps-BnraS3CM.js","assets/Textes-CUAsH4sZ.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-CkDzpGy0.css","assets/tiroirs-DJQFMSP1.js","assets/trone-DOn1xXE3.js","assets/trone-DQVzvvmA.css","assets/useAudiences-oi39TCgi.js","assets/Vitrine-BWilTqQJ.css","assets/Vitrine-D20R5e9l.js","assets/_admin-QtzJN7sm.js","assets/_contrat-DJ20wAIc.js","assets/_heures-ex-rDfAB.js","assets/_reuni-DV14tg2Q.js","assets/_shared-WHMR-sJq.js","assets/_signature-b4M_a6Er.js","assets/_ui-BWMA-PlM.css","assets/_ui-DTaacKrL.js"];
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
