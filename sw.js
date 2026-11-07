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
const BUILD = "20261107093742";
const A_GARDER = ["./","assets/Abonnements-D3_82xmT.js","assets/Abonnements-DTY7p2DH.css","assets/abonnements-DwJ8x7qU.js","assets/Academie-C2tOntS_.js","assets/Acces-B0p05a9O.js","assets/AFaire-BOtAzAHz.js","assets/afaire-WVc3e3yq.js","assets/Agents-9acNMN7K.js","assets/agents-donnees-C2i5joZZ.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-CdSMSCGz.js","assets/Appels-m5VAcwGr.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/Assistants-B4cfCit1.js","assets/Assistants-D9i2Xwmg.css","assets/AtelierDesContenus-BpcTbx26.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/Audience-DzI5Rup5.js","assets/Aujourdhui-BXzEXsPV.js","assets/avant-le-fauteuil-lecture-D5FNjudE.js","assets/AvantLeFauteuil-BUtQee7o.js","assets/avis-fiches-DseJm3Tr.js","assets/AvisGoogle-CyOwE7o8.js","assets/AvisGoogle-DaPXfwX9.css","assets/bilan-B-bfPYR0.css","assets/bilan-DG9J7hHB.js","assets/BilanMensuel-CycWivZ9.js","assets/Branches-CSM9KlMd.js","assets/bridges-1C0t2ct5.js","assets/Caisse-C8UZA40Z.js","assets/caisse-du-soir-C6vPx-E_.css","assets/caisse-du-soir-VICM_7h8.js","assets/Caisses-BtOjV4dR.js","assets/Calendrier-BR4LDK1i.js","assets/campagnes-pur-DR90O98u.js","assets/Carnet-BNfMnnKY.js","assets/carte-oUoJF-yX.js","assets/carte-_W_-xBPj.css","assets/CarteModal-DHPWPpoz.js","assets/CartesCadeaux-SfxvbRNC.js","assets/Catalogue-Bao9NB_d.js","assets/CentreDeCommande-ChGRZNwU.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-QmGtVlxn.js","assets/certificat-BRDr-p8n.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-B_EZCtYU.js","assets/chiffre-du-jour-pur-BnfTO-5f.js","assets/ChiffreDesPrestations-DQ8tBn0G.js","assets/client-b1rXAaYe.js","assets/cloture-du-jour-BPJte8Fz.js","assets/ClotureDuTiroir-BvdJKkrv.js","assets/Coffre-BS_cOsBR.js","assets/components-CnFIAe2m.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-TSt1UmdX.js","assets/Comptes-DKfniDwT.js","assets/consultation-CKObXgLe.js","assets/consultation-CRW6QcWf.css","assets/Consultations-CgkNSC1F.js","assets/consultNotes-Cls3qwpO.js","assets/Conversations-Cs-j6GIM.js","assets/Conversations-D4WwB5Zo.css","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-BcQb8kdS.js","assets/currency-qfIhGmrs.js","assets/Customers-BfG1YgPb.js","assets/Dashboard-B2HMrXwv.js","assets/Dashboard-B2x7VsE_.css","assets/dates-BykiGkUt.js","assets/Demandes-IDouBW7s.js","assets/DepenseEnUnePhrase-BIGRlGqP.css","assets/DepenseEnUnePhrase-BMEegOQE.js","assets/Depenses-Cr1PtXZQ.js","assets/depenses-saisie-fMrmnwzT.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-BeWB_4Tn.js","assets/diagnostics-au-trone-BiXs0It7.js","assets/Dictee-B76-6YB0.js","assets/Dictee-D2P9yM7v.css","assets/dictee-pur-C96lfdiA.js","assets/Discussions-BIsokh1L.js","assets/EditeurDesOffres-AwvcdDRI.js","assets/Encaissements-D58_6M_E.js","assets/enfants-Cq_QAjzL.js","assets/Engagements-Cj5S9MhG.css","assets/engagements-coffre-lnCq8d0O.js","assets/Engagements-CVbA__0q.js","assets/EntreDeuxSeances-BNS4KWI4.js","assets/Evaluation-TCgemXyc.js","assets/Factures-VlV1-Ylr.js","assets/FenetreDesCivilites-CoAOegpT.js","assets/FenetreDesCivilites-zfNk1aak.css","assets/FenetreDuPoint-CI71e8Ww.js","assets/Fil-NAwHs7hb.js","assets/finances-BMFnlkRx.css","assets/fon-DOfVTgHu.js","assets/fournisseurs-CEUpMB4V.js","assets/Fournisseurs-psbHUGFL.js","assets/foyer-DRei_LRH.js","assets/Gerard-BPmLsNeQ.js","assets/Gerard-Cgj-zsJh.css","assets/gerard-donnees-CJgyNfHh.js","assets/gestes-conversation-DnCwzqL_.js","assets/HomeRituals-Bnuf_u5h.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-wI669xX2.js","assets/ia-centre-D7IukiEj.js","assets/ia-diagnostic-pur-BBLrGY5l.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-tableau-pur-CSRjGtTf.js","assets/identite-B9LwB7-3.js","assets/index-DOqWhA3o.js","assets/index.es-B_iTFP2x.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-XgpF3Kyc.js","assets/jspdf.es.min-Dr_49aML.js","assets/JustePrix-B0GyfP_O.js","assets/kkiapay-DRKdy1OE.js","assets/kkiapay-widget-DnUhUNd4.js","assets/Laboratoire-B5fX_1Cw.js","assets/LaJournee-Bn_G0HCt.css","assets/LaJournee-gsIG7a10.js","assets/LesPaiements-BvdfOCbQ.css","assets/LesPaiements-BYMu1LMe.js","assets/LettresAuDossier-Cq-V8ZOi.js","assets/LienMndPay-hkJonDo4.js","assets/Marketing-DMhPwbHb.js","assets/MarketingBranche-DB-DMPog.js","assets/Marque-OGJYPmqu.js","assets/MesPourboires-D6cHYLN-.js","assets/MesPourboires-D9I_9rZf.css","assets/MesTaches-B060ibBs.js","assets/MesTaches-Cc4XUDf6.css","assets/momo-C2ZVfV9J.js","assets/MonMois-BixiUWsd.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/objectifs-HJZtuXDs.js","assets/opale-CUXBhbq5.js","assets/oreille-B1AMUmZh.js","assets/paie-du-5-BelB3iQb.js","assets/paie-du-5-DeJq-K_U.css","assets/paie-du-5-pur-CfsECIPV.js","assets/PaieParMtn-CP9tx2cW.js","assets/paliers-C6Z51PSI.js","assets/Parametres-CL3SELHJ.js","assets/parcours-BrAfB2B7.js","assets/Parrainages-CsqDvpfR.js","assets/Parrainages-gAHAPB_6.css","assets/PassageAvantLeFauteuil-BHdzp2PS.js","assets/pdf-CG91azQR.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/Personas-Dx1m-Bqc.js","assets/Personnel-COTAhqSl.js","assets/photo-DAlPhjBX.js","assets/pilotage-D8kf1Co8.css","assets/Pourboires-tuj32915.js","assets/Predictions-CU90C08J.js","assets/Prestataires-vAPoqhLY.js","assets/Prets-DhAWBLNG.js","assets/PrevisionDuMois-BViD6pcD.js","assets/PrevisionDuMois-DlFTw3OX.css","assets/previsions-pur-mhm2c3H3.js","assets/Previsions-pxQxWTWg.js","assets/Previsions-r4v19Anp.css","assets/processus-pur-R6U5QcCi.js","assets/projets-CAeeg__S.js","assets/Projets-COO7WDEE.css","assets/projets-pur-2ZEMRNDU.js","assets/Projets-u7glRmcZ.js","assets/protocoles-BfEp1jr5.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-IrTe_Mty.js","assets/qualification-D6a7CIIH.js","assets/quiz-5qMPWZVi.js","assets/Rapport-BPriiSv2.js","assets/Recommandations-CTVtanUn.js","assets/regler-C5hcM02_.css","assets/regler-la-seance-serveur-Bs6rzqZX.js","assets/regler-ttpftgzI.js","assets/relances-pur-lwRTXc5E.js","assets/releve-des-avis-D3UlgX-0.js","assets/SalonFoyer-D_CtcWak.js","assets/secretariat-admin-hC3TvTGQ.js","assets/Secretariat-CWgooYtS.js","assets/Secretariat-Cy79Zw30.css","assets/Signatures-CiquvJ22.js","assets/SignerUnPdf-udadelEb.js","assets/Synthese-Pqd0kw8Z.js","assets/SyntheseGraphes-BwptnlEO.js","assets/systeme-TPy-pF7j.css","assets/Tableau-CTl07IDF.js","assets/temps-CQIWOtBd.js","assets/Textes-D65zVzlK.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-BMBRpRAG.js","assets/tiroirs-CkDzpGy0.css","assets/trone-DpJvYqTT.css","assets/trone-ZtoIiQ50.js","assets/useAudiences-Cjq10pTp.js","assets/useClotureDuJour-DgTk3Q5O.js","assets/Vitrine-BR4aovAM.js","assets/Vitrine-BWilTqQJ.css","assets/_admin-BtADMIIG.js","assets/_contrat-DaWohqf9.js","assets/_heures-Cp8ijtEn.js","assets/_reuni-DAWEwetP.js","assets/_shared-DE7kJvPl.js","assets/_signature-Bi3Twb8N.js","assets/_ui-BrUDlmuM.css","assets/_ui-CYdEXiyh.js"];
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
