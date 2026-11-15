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
const BUILD = "20261115071825";
const A_GARDER = ["./","assets/Abonnements-BHlBM68d.js","assets/abonnements-CrfgMHrR.js","assets/Abonnements-DTY7p2DH.css","assets/Academie-CUqV0ShM.js","assets/Acces-vBw5p9At.js","assets/afaire-BJSViDUV.js","assets/AFaire-ChEDw5rM.js","assets/agents-donnees-soW-LpGh.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Agents-njDejOb1.js","assets/Analytics-CF8vurCr.js","assets/Appels-BdQHpNBx.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/Assistants-CxZAnMF9.js","assets/Assistants-D9i2Xwmg.css","assets/AtelierDesContenus-BfXkzdbq.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/Audience-Cj_QG-fw.js","assets/Aujourdhui-BBj-N512.js","assets/avant-le-fauteuil-lecture-CKYNJ31P.js","assets/AvantLeFauteuil-F3CPRqsN.js","assets/avis-fiches-DBeitey7.js","assets/AvisGoogle-C-Y2D2tX.js","assets/AvisGoogle-DaPXfwX9.css","assets/BadgeEssai-DEIt5rFM.js","assets/BadgeSuggere-S78PKTnW.js","assets/besoins-D0r0FRIF.js","assets/BesoinsEtRegles-C-Y6rz8C.js","assets/BesoinsEtRegles-CzntMbJE.css","assets/bilan-B-bfPYR0.css","assets/bilan-DnYGXj3y.js","assets/BilanMensuel-CV2C2ifN.js","assets/Branches-NXu1pZON.js","assets/bridges-BasHLzK4.js","assets/Caisse-CnmVupMV.js","assets/caisse-du-soir-C6vPx-E_.css","assets/caisse-du-soir-CUXevPTz.js","assets/Caisses-C48yXpJE.js","assets/Calendrier-BOKuRHId.js","assets/campagnes-pur-B1XWWGxm.js","assets/Carnet-Czci060a.js","assets/carte-BWMUYYZS.js","assets/carte-_W_-xBPj.css","assets/CarteModal-BIEvFmTi.js","assets/CartesCadeaux-V1fseXC0.js","assets/Catalogue-BhcNGl4h.js","assets/CentreDeCommande-BWLWObTF.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-BnMmyBvW.js","assets/certificat-Dhzlij7q.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-BFPjR4dJ.js","assets/chiffre-du-jour-pur-k9Wn6Vcy.js","assets/ChiffreDesPrestations-CGcNQUGQ.js","assets/client-DI_gsN7a.js","assets/cloture-du-jour-Bnrok9oo.js","assets/ClotureDuTiroir-BtU5_5Zd.js","assets/Coffre-BK8n1OZ4.js","assets/collecte-mtn-pur-D9rF7FS0.js","assets/components-D4Ifa1mV.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-Bp0DV7bs.js","assets/Comptes-CxQzIsAJ.js","assets/consultation-CRW6QcWf.css","assets/consultation-cVlhH8Fs.js","assets/Consultations-Bl3nsahb.js","assets/Consultations-DiE-2_mG.css","assets/consultNotes-52LQrhbp.js","assets/Conversations-D4WwB5Zo.css","assets/Conversations-SUS7--ag.js","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-DMmccwSH.js","assets/currency-qfIhGmrs.js","assets/Customers-DHKW_nG5.js","assets/Dashboard-B2x7VsE_.css","assets/Dashboard-D5nyaeIM.js","assets/dates-BUjw-mPe.js","assets/Demandes-DqAfgBst.js","assets/DepenseEnUnePhrase-BIGRlGqP.css","assets/DepenseEnUnePhrase-DbAVqe7z.js","assets/Depenses-CxXXW9G7.js","assets/depenses-saisie-U7R0lr62.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-BD8qC9Oo.js","assets/diagnostics-au-trone-Cr9fOPB5.js","assets/Dictee-BHhfbV9a.js","assets/Dictee-BIQFbKhA.css","assets/dictee-pur-CGcfN_tx.js","assets/Discussions-COB3i1c1.js","assets/EditeurDesOffres-DEegs_7a.js","assets/Encaissements-DCbV99sm.js","assets/enfants-CeayYHH_.js","assets/Engagements-Cj5S9MhG.css","assets/engagements-coffre-CD2z_v7n.js","assets/Engagements-E2I4Hwrc.js","assets/EntreDeuxSeances-KeE1cZeS.js","assets/Evaluation-A3ssTbRH.js","assets/facture-Cd9NMVWY.js","assets/Factures-Dm6qSLiP.js","assets/FenetreDesCivilites-B9nj2v34.js","assets/FenetreDesCivilites-zfNk1aak.css","assets/FenetreDuPoint-COMBNI__.js","assets/Fil-BNCfcB3y.js","assets/finances-C8x7Mn4-.css","assets/fon-Bw5hxijU.js","assets/fournisseurs-DBHA_S5Y.js","assets/Fournisseurs-R6zIg3Xp.js","assets/foyer-DP9Kt7Xq.js","assets/Gerard-BbiX0-yS.js","assets/Gerard-Cgj-zsJh.css","assets/gerard-donnees-B8GBH-wP.js","assets/gestes-conversation-DqycD6Gt.js","assets/heures-des-rappels-pur-BWJPB8OP.js","assets/HomeRituals-CVRsMbR3.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-DCSV2qw6.js","assets/ia-centre-F6Y14FkT.js","assets/ia-diagnostic-pur-BNtkwfR3.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-tableau-pur-p6UvREJe.js","assets/identite-Cr5uyF5X.js","assets/index-CE3Zj8rK.js","assets/index.es-D0jElmn4.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-ZSoGxTnI.js","assets/jspdf.es.min-Cpo7ALa7.js","assets/JustePrix-C9pt6EfE.js","assets/kkiapay-C_gA9OU5.js","assets/kkiapay-widget-CVmsl9OE.js","assets/Laboratoire-Bya9j8JA.js","assets/LaJournee-BCs2LDqq.js","assets/LaJournee-Bn_G0HCt.css","assets/le-caissier-pur-U8wTlrk1.js","assets/LesPaiements-C9cEZlne.css","assets/LesPaiements-DAAgZCS1.js","assets/LettresAuDossier-DyKXfOid.js","assets/LienMndPay-CEr7Riis.js","assets/Marketing-B6_J3ITS.js","assets/MarketingBranche-F0JfHC83.js","assets/Marque--P7NASvl.js","assets/MesPourboires-CENjelyb.css","assets/MesPourboires-LDmYhUSl.js","assets/MesTaches-Cc4XUDf6.css","assets/MesTaches-X5h7VD4C.js","assets/momo-C2ZVfV9J.js","assets/MonMois-CnWgTTp0.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/MtnMoMo-BcUxFmjb.js","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/objectifs-XVY1SBMx.js","assets/opale-DWP1WsUo.js","assets/oreille-B1AMUmZh.js","assets/paie-du-5-D9W2wGpL.js","assets/paie-du-5-DeJq-K_U.css","assets/paie-du-5-pur-CPiCK8fv.js","assets/paie-par-mtn-Df-gi643.js","assets/PaieParMtn-Dy0fS9kH.js","assets/paliers-Cq_Mib0c.js","assets/Parametres-WHlFK0W2.js","assets/parcours-DZOcnyKh.js","assets/Parrainages-DiL7y5Yx.js","assets/Parrainages-gAHAPB_6.css","assets/PassageAvantLeFauteuil-VI3hcuYX.js","assets/pdf-D6So6NxN.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/periode-des-pourboires-pur-BUWqfwov.js","assets/Personas-Cr8O8i0L.js","assets/Personnel-rtg0dn2I.js","assets/photo-DmdpfAys.js","assets/pilotage-D8kf1Co8.css","assets/Pourboires-DMud20k_.js","assets/Predictions-txWrqufr.js","assets/Prestataires-BlzRBk8B.js","assets/Prets-uuoaVsa3.js","assets/PrevisionDuMois-7bsrYrnk.js","assets/PrevisionDuMois-DlFTw3OX.css","assets/Previsions-9BU2Vg1T.css","assets/Previsions-ByxEFYbV.js","assets/previsions-pur-BL893N7M.js","assets/processus-pur-R6U5QcCi.js","assets/Projets-BLiGvhDA.js","assets/Projets-COO7WDEE.css","assets/projets-pur-2ZEMRNDU.js","assets/projets-ZBdeavd3.js","assets/protocoles-hsD15Sg3.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-CYlE9IPz.js","assets/qualification-DjC-T1Nv.js","assets/quiz-5qMPWZVi.js","assets/Rapport-CNII0-x_.js","assets/Recommandations-DeEquHb_.js","assets/regler-BDTopn2x.js","assets/regler-DHR_B1Dm.css","assets/regler-par-fedapay-pur-CFL4EbBx.js","assets/relances-pur-BacTXlI2.js","assets/releve-des-avis-Jj2BPZwe.js","assets/SalonFoyer-D88Dz8hC.js","assets/secretariat-admin-KXF1_C7a.js","assets/Secretariat-Cy79Zw30.css","assets/Secretariat-YjCLhY2d.js","assets/Signatures-DvV6pfrF.js","assets/SignerUnPdf-DfI4BQch.js","assets/Synthese-m1Wpf-PZ.js","assets/SyntheseGraphes-BARqINrN.js","assets/systeme-TPy-pF7j.css","assets/Tableau-kHcRzS-s.js","assets/temps-BQvGDOOF.js","assets/Textes-DLpOzRbT.css","assets/Textes-Ng1331AA.js","assets/tiroirs-BEuJT5Ej.js","assets/tiroirs-CkDzpGy0.css","assets/trone-DxtNUYxb.css","assets/trone-ywBTsiBM.js","assets/useAudiences-8xZFCQCU.js","assets/useClotureDuJour-DPRH4PMC.js","assets/visios-B0GGUncv.js","assets/Vitrine-bj2sx80U.js","assets/Vitrine-BWilTqQJ.css","assets/_admin-DSR8JU28.js","assets/_contrat-CqCEJpeg.js","assets/_reuni-DvMlVfyh.js","assets/_shared-CHuoi0gr.js","assets/_signature-D5CH1WGa.js","assets/_ui-BrUDlmuM.css","assets/_ui-DspCgnOW.js"];
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
