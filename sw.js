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
const BUILD = "20261121092320";
const A_GARDER = ["./","assets/Abonnements-B3fB0Mai.js","assets/abonnements-CtiDRpPA.js","assets/Abonnements-DTY7p2DH.css","assets/Academie-unjy2eUw.js","assets/Acces-B87qjJLF.js","assets/afaire-BObRWbZ_.js","assets/AFaire-CUAZLl3K.js","assets/Agents-BS9plTGu.js","assets/agents-donnees-BkyAIRcN.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-DcT2la7a.js","assets/App-CG_moSTl.js","assets/Appels--cl6KmB4.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/Assistants-7XtNz6Lx.js","assets/Assistants-D9i2Xwmg.css","assets/AtelierDesContenus-D3-p6F2A.css","assets/AtelierDesContenus-DPQyFUBH.js","assets/Audience-BdFPzHEw.js","assets/Aujourdhui-QbmmDKJC.js","assets/auth-D0es4XLb.js","assets/avant-le-fauteuil-lecture-D9yGYhDZ.js","assets/AvantLeFauteuil-B_x9ElCW.js","assets/avis-fiches-BJtutTZ1.js","assets/avis-google-pont-sP-Ob15x.js","assets/AvisGoogle-Bhk18vzX.js","assets/AvisGoogle-DaPXfwX9.css","assets/BadgeEssai-NLOQL5xs.js","assets/BadgeSuggere--wSdMc1E.js","assets/besoins-PwHfBnJa.js","assets/BesoinsEtRegles-BLwxGVV5.css","assets/BesoinsEtRegles-DsY61fAQ.js","assets/bilan-B-bfPYR0.css","assets/bilan-Ds1GAN67.js","assets/BilanMensuel-BCGIDrdJ.js","assets/Branches-CwlK18_y.js","assets/bridges-CdxSQhWf.js","assets/Caisse-BIeHUz6R.js","assets/caisse-du-soir-brIvz_vO.js","assets/caisse-du-soir-C6vPx-E_.css","assets/caisse-fluide-pur-51ergjSR.js","assets/Caisses-BYTaskPc.js","assets/Calendrier-DYEUm0cQ.js","assets/campagnes-pur-uETFqvVY.js","assets/Carnet-DCv0OWsW.js","assets/carte-DWV0TocC.js","assets/carte-_W_-xBPj.css","assets/CarteModal-CcnCpu4J.js","assets/CartesCadeaux-BagYPd-s.js","assets/Catalogue-DtdkpuJM.js","assets/CentreDeCommande-Du8kyJhp.css","assets/CentreDeCommande-YZfF9qQG.js","assets/Cercle-C_PkrcoX.js","assets/certificat-CwffZRP_.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-BU_i7Ttc.js","assets/chiffre-du-jour-pur-CE3vC32a.js","assets/ChiffreDesPrestations-BulAFIVf.js","assets/Classement-CmpbQZDu.css","assets/classement-D5lh_mAb.js","assets/Classement-D9oFLiZg.js","assets/classement-pur-CQOYU06l.js","assets/client-d48k_o4Y.js","assets/cloture-du-jour-B3astohW.js","assets/ClotureDuTiroir-CYtXHoOc.js","assets/Coffre-PUGMYIdX.js","assets/collecte-mtn-pur-BKoFYpbn.js","assets/components-Boab5_Fy.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-DTnklvtj.js","assets/Comptes-WTYMz_sR.js","assets/consultation-CRW6QcWf.css","assets/consultation-orEtw4X6.js","assets/Consultations-DiE-2_mG.css","assets/Consultations-IpHy9vAJ.js","assets/consultNotes-DFPcY4uI.js","assets/contexte-de-la-reponse-DwPHp9Ij.js","assets/Conversations-D4WwB5Zo.css","assets/Conversations-DL9oUJce.js","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-bOwShnCN.js","assets/currency-Cd0clE4P.js","assets/Customers-_8M7VVK1.js","assets/Dashboard-B2x7VsE_.css","assets/Dashboard-SEO8_U5E.js","assets/dates-Bgp6kfxb.js","assets/DemanderAPerle-BD5NgCRN.css","assets/DemanderAPerle-DDa3IEjb.js","assets/Demandes-ClVg-jTv.js","assets/DepenseEnUnePhrase-BIGRlGqP.css","assets/DepenseEnUnePhrase-DDKt_3ZH.js","assets/Depenses-DoB5QgVg.js","assets/depenses-saisie-DHKZtIv_.js","assets/devis-remis-CahN0Y-T.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-CW-tXxgv.js","assets/diagnostics-au-trone-CNYM10az.js","assets/Dictee-C-pUYYFA.css","assets/Dictee-D0uiCBGH.js","assets/dictee-pur-Do-uZHku.js","assets/Discussions-BMgjFolo.js","assets/echappe-html-pur-gEhHOM07.js","assets/EditeurDesOffres-BIL6A52x.js","assets/Encaissements-05bsTDE_.js","assets/enfants-YAFXzqVv.js","assets/Engagements-Cj5S9MhG.css","assets/engagements-coffre-DDZ1xs0N.js","assets/Engagements-LSxruBGT.js","assets/EntreDeuxSeances-A6reTw5L.js","assets/es-lVu31Yqp.js","assets/Evaluation-DTqSneHg.js","assets/facture-BeR71ZA8.js","assets/Factures-DOWvvwln.js","assets/FenetreDeLAgent-CH9Y7Z58.js","assets/FenetreDesCivilites-CKk7zRWL.js","assets/FenetreDesCivilites-zfNk1aak.css","assets/FenetreDuPoint-_8tPk76M.js","assets/Fil-DrkACt5C.js","assets/finances-C8x7Mn4-.css","assets/fon-BetvIRRX.js","assets/Fournisseurs-CvearLbJ.js","assets/fournisseurs-DChiFiOw.js","assets/foyer-CLjaJDT9.js","assets/gerard-donnees--OyMhvkT.js","assets/Gerard-lGKehvgG.css","assets/Gerard-ZpxGcyPU.js","assets/gestes-conversation-DCPsGqHt.js","assets/heures-des-rappels-pur-BWJPB8OP.js","assets/HomeRituals-BZIFeY7O.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-BWEp7ooG.js","assets/ia-centre-B5t7T_k1.js","assets/ia-diagnostic-pur-qGnFEvys.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-tableau-pur-p6UvREJe.js","assets/identite-DOdDB0JJ.js","assets/index.es-D-3z5S3v.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-ClyCs4PX.js","assets/jspdf.es.min-xEDfRupv.js","assets/JustePrix-BHznUStE.js","assets/kkiapay-DlYkR81g.js","assets/kkiapay-widget-CVmsl9OE.js","assets/Laboratoire-DOeMwzcB.js","assets/LaJournee-Bn_G0HCt.css","assets/LaJournee-BtggjVHW.js","assets/le-caissier-pur-CPLDrcVb.js","assets/LesPaiements-C9cEZlne.css","assets/LesPaiements-LslgtvnJ.js","assets/LettresAuDossier-C1WxqPIu.js","assets/LienMndPay-BLiWvyZ9.js","assets/Marketing-DFTDrOWp.js","assets/MarketingBranche-iJfllYF0.js","assets/Marque-BPmNnEmz.js","assets/MesPourboires-Bhs7csAi.js","assets/MesPourboires-CENjelyb.css","assets/MesTaches-BgR22Ubs.js","assets/MesTaches-Cc4XUDf6.css","assets/momo-C2ZVfV9J.js","assets/MonMois-H58jfYVi.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/MtnMoMo-Bs1SWj6N.js","assets/objectifs-BU7vIrrL.js","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/opale-lTPEwwRv.js","assets/oreille-B1AMUmZh.js","assets/paie-du-5-CIlGlPEx.js","assets/paie-du-5-DeJq-K_U.css","assets/paie-du-5-pur-CPiCK8fv.js","assets/paie-par-mtn-CUrhosFC.js","assets/PaieParMtn-BUcDLyiZ.js","assets/paliers-B4m5ymP9.js","assets/Parametres-BotViXdq.js","assets/parcours-hNegCsgm.js","assets/Parrainages-DGxamUP6.js","assets/Parrainages-gAHAPB_6.css","assets/PassageAvantLeFauteuil-BzMkGejE.js","assets/pdf-BCtCv6fS.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/periode-des-pourboires-pur-BUWqfwov.js","assets/Personas-KrAUf2Nj.js","assets/Personnel-CZQA5ptq.js","assets/photo-BHN3AjB1.js","assets/pilotage-D8kf1Co8.css","assets/porte-de-l-equipe-RlgiZXlN.js","assets/Pourboires-_jjS6VSx.js","assets/Predictions-EibHrJK0.js","assets/preload-helper-BRe_O-Rg.js","assets/Prestataires-pPpa7cNM.js","assets/Prets-DOxl6JLf.js","assets/PrevisionDuMois-DHPjf82P.js","assets/PrevisionDuMois-DlFTw3OX.css","assets/Previsions-1s4Tr0Fi.js","assets/Previsions-9BU2Vg1T.css","assets/previsions-pur-DvDX6mk9.js","assets/processus-pur-R6U5QcCi.js","assets/projets-BNZcsYav.js","assets/Projets-COO7WDEE.css","assets/Projets-CTCWhPmv.js","assets/projets-pur-2ZEMRNDU.js","assets/protocoles-DkowKTcI.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-CxeXOwCZ.js","assets/quiz-5qMPWZVi.js","assets/Rapport-BaEwVoyw.js","assets/Recommandations-BNMytwXf.js","assets/regler-C2VIprfJ.js","assets/regler-DHR_B1Dm.css","assets/regler-par-fedapay-pur-DYTDdXhs.js","assets/relances-pur-BacTXlI2.js","assets/releve-des-avis-iXL9lH4n.js","assets/SalonFoyer-CHRoR9_U.js","assets/secretariat-admin-CKGRvBzm.js","assets/Secretariat-BOLcJK0E.js","assets/Secretariat-Cy79Zw30.css","assets/Signatures-CN3n1Lhy.js","assets/SignerUnPdf-DCXGzXgo.js","assets/Synthese-CMBkEKSi.js","assets/SyntheseGraphes-Cl4Bs1Se.js","assets/systeme-TPy-pF7j.css","assets/Tableau-zvk9Rwcu.js","assets/temps-BCi9YXAF.js","assets/Textes-DLpOzRbT.css","assets/Textes-guelFii_.js","assets/tiroirs-CkDzpGy0.css","assets/tiroirs-h_-_Jukm.js","assets/trone-B-r6lpi2.css","assets/trone-BBPahkBJ.js","assets/useAudiences-DngJXjQY.js","assets/useClotureDuJour-_rwuqI0P.js","assets/visios-BKBeF3Ur.js","assets/Vitrine-BWilTqQJ.css","assets/Vitrine-COdOIrHA.js","assets/_admin-D7M49u6z.js","assets/_contrat-jqGJZ1DF.js","assets/_reuni-C5G1RdV5.js","assets/_shared-BI7gieXB.js","assets/_signature-BH8l-lDW.js","assets/_ui-BrUDlmuM.css","assets/_ui-DYu_2cjG.js"];
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

  /* LE PLAN POUR VENIR, LE RÉSEAU D'ABORD (20 novembre 2026). Il part chez les
     clientes : gardé comme les autres images, le plan d'avant une correction
     (l'adresse du 20 novembre) repartait une fois de plus de chaque appareil.
     En ligne, toujours le dernier, sans le cache du navigateur ; sans réseau,
     celui qu'on a. */
  if (url.pathname.includes('/assets/itineraire/')) {
    event.respondWith((async () => {
      const c = await caches.open(CACHE_IMAGES);
      try {
        const r = await avecDelai(fetch(req, { cache: 'no-cache' }), DELAI_PAGE_MS);
        if (r.ok) { void c.put(req, r.clone()); return r; }
        return (await c.match(req)) || r;
      } catch (_e) {
        return (await c.match(req)) || Response.error();
      }
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
