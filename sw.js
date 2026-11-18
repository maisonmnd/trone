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
const BUILD = "20261118020708";
const A_GARDER = ["./","assets/abonnements-89LfepoF.js","assets/Abonnements-D6h6Tobg.js","assets/Abonnements-DTY7p2DH.css","assets/Academie-DwLUyd9m.js","assets/Acces-BCvBna79.js","assets/afaire-CnBpdhyC.js","assets/AFaire-DfIRgNXX.js","assets/Agents-Dm4w71Cq.js","assets/agents-donnees-Bed2grta.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-DG3q9CSb.js","assets/Appels-CZvPDhf2.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/Assistants-D9i2Xwmg.css","assets/Assistants-DCIIoZm_.js","assets/AtelierDesContenus-BKwBJIeN.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/Audience-DQQB5_wO.js","assets/Aujourdhui-By26rAQF.js","assets/avant-le-fauteuil-lecture-CKE4Zj0g.js","assets/AvantLeFauteuil-Cy3kyhRt.js","assets/avis-fiches-Cm5HA6oK.js","assets/AvisGoogle-D8sJXvIq.js","assets/AvisGoogle-DaPXfwX9.css","assets/BadgeEssai-BcRQwUjR.js","assets/BadgeSuggere-CYCxDOSP.js","assets/besoins-CrHLgm4X.js","assets/BesoinsEtRegles-bdES0zmz.js","assets/BesoinsEtRegles-CzntMbJE.css","assets/bilan-B-bfPYR0.css","assets/bilan-Yl3fPTZs.js","assets/BilanMensuel-CPolMOrC.js","assets/Branches-DANbSLgi.js","assets/bridges-DV2PUZAt.js","assets/Caisse-Cgh0FJLW.js","assets/caisse-du-soir-Bp2Vs4bR.js","assets/caisse-du-soir-C6vPx-E_.css","assets/Caisses-BQoCV5Qc.js","assets/Calendrier-DV7tatXW.js","assets/campagnes-pur-CN6Rdv5B.js","assets/Carnet-uVq5shXV.js","assets/carte-97gXXmhn.js","assets/carte-_W_-xBPj.css","assets/CarteModal-U4X_Twz6.js","assets/CartesCadeaux-Bvgz1jj3.js","assets/Catalogue-w2H_OmOv.js","assets/CentreDeCommande-Bn_WX-Qm.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-DMDvMRMI.js","assets/certificat-DB3fmBmz.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-Dur4xcLR.js","assets/chiffre-du-jour-pur-CoKcXXUm.js","assets/ChiffreDesPrestations-COdGmXw0.js","assets/client-DXA_JnQY.js","assets/cloture-du-jour-Dm5Yj0Y3.js","assets/ClotureDuTiroir-B-aPTq7e.js","assets/Coffre-DPwANpVB.js","assets/collecte-mtn-pur-Bq3uWgWT.js","assets/components-DVdejq-Y.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-BAVx2eba.js","assets/Comptes-86s3055h.js","assets/consultation-CRW6QcWf.css","assets/consultation-DykzqqmS.js","assets/Consultations-DiE-2_mG.css","assets/Consultations-u3diFj5Z.js","assets/consultNotes-wuAr5pQu.js","assets/Conversations-D4WwB5Zo.css","assets/Conversations-IL8SkyGX.js","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-BPc3AeLl.js","assets/currency-Cd0clE4P.js","assets/Customers-Cz1Q4UPH.js","assets/Dashboard-B2x7VsE_.css","assets/Dashboard-DqAkImMM.js","assets/dates-IpMRkCFi.js","assets/Demandes-wiQTLBbR.js","assets/DepenseEnUnePhrase-BIGRlGqP.css","assets/DepenseEnUnePhrase-DCRhx_oR.js","assets/Depenses-CPHBoxj1.js","assets/depenses-saisie-yQndxjCd.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-Bmc7wIvX.js","assets/diagnostics-au-trone-Bq6KeA3p.js","assets/Dictee-C-pUYYFA.css","assets/Dictee-DUcyf22X.js","assets/dictee-pur-DQRP8qR-.js","assets/Discussions-DolIqFVW.js","assets/EditeurDesOffres-Df0_Xjrj.js","assets/Encaissements-CW9SLzxE.js","assets/enfants-DbPeRdA8.js","assets/Engagements-Ba0q98k0.js","assets/Engagements-Cj5S9MhG.css","assets/engagements-coffre-DYO_u2T_.js","assets/EntreDeuxSeances-CFymGh6j.js","assets/es-D7ht7WiC.js","assets/Evaluation-BgNZy9QC.js","assets/facture-BuJEMuaL.js","assets/Factures-CaqBUr51.js","assets/FenetreDeLAgent-D-GAbqJW.js","assets/FenetreDesCivilites-B5hYMH_A.js","assets/FenetreDesCivilites-zfNk1aak.css","assets/FenetreDuPoint-UrJNAMWt.js","assets/Fil-CTELUkj6.js","assets/finances-C8x7Mn4-.css","assets/fon-D2JuNVmR.js","assets/Fournisseurs-B_vL6jpg.js","assets/fournisseurs-PCXfZJ-Z.js","assets/foyer-BsF0xVau.js","assets/Gerard-Cgj-zsJh.css","assets/gerard-donnees-DcCdDVna.js","assets/Gerard-Rc6kqGvE.js","assets/gestes-conversation-BhkGmqn5.js","assets/heures-des-rappels-pur-BWJPB8OP.js","assets/HomeRituals-luQuCp-B.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-BdBMua0x.js","assets/ia-centre-C_pmIYR9.js","assets/ia-diagnostic-pur-BNtkwfR3.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-tableau-pur-p6UvREJe.js","assets/identite-DqgzC526.js","assets/index.es-BKVkg0o_.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-BWGdRPit.js","assets/jspdf.es.min-GwUstHo5.js","assets/JustePrix-4YncWrCH.js","assets/kkiapay-DJYlKaZH.js","assets/kkiapay-widget-CVmsl9OE.js","assets/Laboratoire-Ch1vfuYW.js","assets/LaJournee-8vmfY4Re.js","assets/LaJournee-Bn_G0HCt.css","assets/le-caissier-pur-C1XLHmt3.js","assets/LesPaiements-BVDuk_sL.js","assets/LesPaiements-C9cEZlne.css","assets/LettresAuDossier-kr7NQth_.js","assets/LienMndPay-BSTszFMz.js","assets/Marketing-xRYNQR1r.js","assets/MarketingBranche-BOISVHK4.js","assets/Marque-B828auvR.js","assets/MesPourboires-CENjelyb.css","assets/MesPourboires-Tlk2SSlc.js","assets/MesTaches-Cc4XUDf6.css","assets/MesTaches-CI3qBFqA.js","assets/momo-C2ZVfV9J.js","assets/MonMois-CdFlZGGG.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/MtnMoMo-BWKwVN2i.js","assets/objectifs-Cct6djXT.js","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/opale-Dej5l5e6.js","assets/oreille-B1AMUmZh.js","assets/paie-du-5-BdoQ5nAr.js","assets/paie-du-5-DeJq-K_U.css","assets/paie-du-5-pur-CPiCK8fv.js","assets/paie-par-mtn-IgoK5mgf.js","assets/PaieParMtn-DjMQbE5x.js","assets/paliers-BfEF3Tgg.js","assets/Parametres-DVGMvtv6.js","assets/parcours-DesO_n_r.js","assets/Parrainages-CgXYmXkc.js","assets/Parrainages-gAHAPB_6.css","assets/PassageAvantLeFauteuil-C_SnR0c6.js","assets/pdf-DjZEm9LU.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/periode-des-pourboires-pur-BUWqfwov.js","assets/Personas-DZHKzVGa.js","assets/Personnel-eu1jvqkS.js","assets/photo-s1uXTLpf.js","assets/pilotage-D8kf1Co8.css","assets/Pourboires-Bfj29lYN.js","assets/Predictions-B1aUJKVR.js","assets/Prestataires-BeYVzg-n.js","assets/Prets-gacMlk0C.js","assets/PrevisionDuMois-Cz6ioMjG.js","assets/PrevisionDuMois-DlFTw3OX.css","assets/Previsions-9BU2Vg1T.css","assets/Previsions-NC4uHDg3.js","assets/previsions-pur-C0_IgMeZ.js","assets/processus-pur-R6U5QcCi.js","assets/projets-BK4DLZur.js","assets/Projets-COO7WDEE.css","assets/Projets-CqTlEhoV.js","assets/projets-pur-2ZEMRNDU.js","assets/protocoles-DRLeY9_3.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-BtZOCPon.js","assets/qualification-sx74fWGS.js","assets/quiz-5qMPWZVi.js","assets/Rapport-Cp-3ckVY.js","assets/Recommandations-Cm6ulC-9.js","assets/regler-DHR_B1Dm.css","assets/regler-DVQ9DMBy.js","assets/regler-par-fedapay-pur-G8CEJdGn.js","assets/relances-pur-BacTXlI2.js","assets/releve-des-avis-C-MoVxgv.js","assets/SalonFoyer-CqT3D7Xq.js","assets/secretariat-admin-C3H8ib3S.js","assets/Secretariat-Cy79Zw30.css","assets/Secretariat-DUcyvqQ9.js","assets/Signatures-Dwl35KRc.js","assets/SignerUnPdf-QlvlAk_u.js","assets/Synthese-C9MyOwuR.js","assets/SyntheseGraphes-DbGGCyQ2.js","assets/systeme-TPy-pF7j.css","assets/Tableau-C6XdVt5S.js","assets/temps-C9R1OL-3.js","assets/Textes-Ct-vRPzu.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-CkDzpGy0.css","assets/tiroirs-uTnhqGSI.js","assets/trone-DO_K_gMP.css","assets/trone-rKX8dH_A.js","assets/useAudiences-CP-PvGPI.js","assets/useClotureDuJour-Bsj974hL.js","assets/visios-E6n-SWZt.js","assets/Vitrine-BWilTqQJ.css","assets/Vitrine-slg6LMHy.js","assets/_admin-C0T4AeBh.js","assets/_contrat-BgGXbZX3.js","assets/_reuni-DqIVvS9f.js","assets/_shared-C51loPzr.js","assets/_signature-BY1s5C6i.js","assets/_ui-BrUDlmuM.css","assets/_ui-CrWDRsZH.js"];
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
