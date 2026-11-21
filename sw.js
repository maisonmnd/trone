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
const BUILD = "20261121175429";
const A_GARDER = ["./","assets/Abonnements-BmKZdtJ3.js","assets/abonnements-CHFuTrSC.js","assets/Abonnements-DTY7p2DH.css","assets/Academie-DUvIHZaN.js","assets/Acces-CGV-MESB.js","assets/afaire-BD6EUxMy.js","assets/AFaire-SUkNt4n9.js","assets/Agents-CSrUTVhO.js","assets/agents-donnees-DVZbXFuT.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-1fraQULG.js","assets/App-Db8fCXYp.js","assets/Appels-CvYiY4WX.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/Assistants-D9i2Xwmg.css","assets/Assistants-XgmQ36ZS.js","assets/AtelierDesContenus-BzpdQjDa.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/Audience-DKrKQv8V.js","assets/Aujourdhui-C999GTXV.js","assets/auth-DfNLlM9Y.js","assets/avant-le-fauteuil-lecture-lvnpKgrX.js","assets/AvantLeFauteuil-C9a90cMM.js","assets/avis-fiches-KszPHBRu.js","assets/avis-google-pont-FWCCxhUT.js","assets/AvisGoogle-DaPXfwX9.css","assets/AvisGoogle-DO5VHUqb.js","assets/BadgeEssai-C_fmSEdU.js","assets/BadgeSuggere-W1xdtdX5.js","assets/besoins-LM6ZKtCt.js","assets/BesoinsEtRegles-BLwxGVV5.css","assets/BesoinsEtRegles-ChD6o81j.js","assets/bilan-B-bfPYR0.css","assets/bilan-F4-lIwKj.js","assets/BilanMensuel-DT5qiw0b.js","assets/Branches-BVl5M9Ec.js","assets/bridges-BczWp2Fi.js","assets/Caisse-3FDupZjf.js","assets/caisse-du-soir-C6vPx-E_.css","assets/caisse-du-soir-C_DrUwlf.js","assets/caisse-fluide-pur-BJlYCCuY.js","assets/Caisses-CVzckToB.js","assets/Calendrier-DY_61S6U.js","assets/campagnes-pur-DdKS22IB.js","assets/Carnet-DCe6Fiv6.js","assets/carte-C7MFROBl.js","assets/carte-_W_-xBPj.css","assets/CarteModal-mlOueOGQ.js","assets/CartesCadeaux-PY7VsKzs.js","assets/Catalogue-Bsyydt_I.js","assets/CentreDeCommande-Du8kyJhp.css","assets/CentreDeCommande-H4gTAmG1.js","assets/Cercle-DkW_zJR1.js","assets/certificat-DQx-t4cA.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-Bzovo-5g.js","assets/chiffre-du-jour-pur-DmE7wuoW.js","assets/ChiffreDesPrestations-b651-p97.js","assets/classement-CFhh33bh.js","assets/Classement-CmpbQZDu.css","assets/Classement-DpTpLRSM.js","assets/classement-pur-CQOYU06l.js","assets/client-BRXdnkUM.js","assets/cloture-du-jour-DEhtagCF.js","assets/ClotureDuTiroir-dWK8XiYO.js","assets/Coffre-D0lX1-y0.js","assets/collecte-mtn-pur-BKoFYpbn.js","assets/components-DFX2DIWa.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-BsFae_N_.js","assets/Comptes-ChB95bM9.js","assets/consultation-CRW6QcWf.css","assets/consultation-ljCBUi9Q.js","assets/Consultations-D3nshWwj.js","assets/Consultations-DiE-2_mG.css","assets/consultNotes-DQdHVlLf.js","assets/contexte-de-la-reponse-BsZSVym-.js","assets/Conversations-D4WwB5Zo.css","assets/Conversations-uJh5WSnd.js","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-D_sfmtcP.js","assets/currency-Cd0clE4P.js","assets/Customers-DEBKscai.js","assets/Dashboard-B2x7VsE_.css","assets/Dashboard-mbD08b-y.js","assets/dates-CZ4l6EDm.js","assets/DemanderAPerle-BD5NgCRN.css","assets/DemanderAPerle-npH0ibql.js","assets/Demandes-BS-LDabP.js","assets/DepenseEnUnePhrase-BIGRlGqP.css","assets/DepenseEnUnePhrase-DwEPZaiF.js","assets/Depenses-BFbXGa0L.js","assets/depenses-saisie-D9cqV7Nb.js","assets/devis-remis-C81YqN5w.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-CidCImyE.js","assets/diagnostics-au-trone-W9TEXEzN.js","assets/Dictee-BLnGcNMG.js","assets/Dictee-C-pUYYFA.css","assets/dictee-pur-CcInZf8T.js","assets/Discussions-2laRwNAZ.js","assets/echappe-html-pur-gEhHOM07.js","assets/EditeurDesOffres-BRo8gY0h.js","assets/Encaissements-DB4KAkG7.js","assets/enfants-DV0K5rCN.js","assets/Engagements-Cj5S9MhG.css","assets/Engagements-CN8d1T-u.js","assets/engagements-coffre-DuGx4dfY.js","assets/EntreDeuxSeances-BFP1ydz3.js","assets/es-DUhmLEqS.js","assets/Evaluation-CgpUFNs5.js","assets/facture-D_YJ_HDL.js","assets/Factures-DNkuSqjl.js","assets/FenetreDeLAgent-CvOMibhK.js","assets/FenetreDesCivilites-DMxSsa1H.js","assets/FenetreDesCivilites-zfNk1aak.css","assets/FenetreDuPoint-DCIXmqQy.js","assets/Fil-CaHzmvRu.js","assets/finances-C8x7Mn4-.css","assets/fon-pCmkTSoL.js","assets/fournisseurs-BNu_mWOz.js","assets/Fournisseurs-DjMMRs84.js","assets/foyer-BVCMG4YE.js","assets/Gerard-BC8u2AZb.js","assets/gerard-donnees-BMsYWmtI.js","assets/Gerard-lGKehvgG.css","assets/gestes-conversation-8VI6yeqC.js","assets/heures-des-rappels-pur-BWJPB8OP.js","assets/HomeRituals-Be5PQyvq.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-Cw2PgqTX.js","assets/ia-centre-3UGDGgrk.js","assets/ia-diagnostic-pur-qGnFEvys.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-tableau-pur-p6UvREJe.js","assets/identite-CWXKxgje.js","assets/index.es-NTWQ6scP.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-CrfK1be7.js","assets/jspdf.es.min-CRxdRPi5.js","assets/JustePrix-BEOlJC96.js","assets/kkiapay-CBjZMtWT.js","assets/kkiapay-widget-CVmsl9OE.js","assets/Laboratoire-BulmyztR.js","assets/LaJournee-Bn_G0HCt.css","assets/LaJournee-D1e3Ogh5.js","assets/le-caissier-pur-DpnSHxbo.js","assets/LePoint-CBjCCMQ5.css","assets/LePoint-o0ZTzaPv.js","assets/LesPaiements-C9cEZlne.css","assets/LesPaiements-hu3-FI8_.js","assets/LettresAuDossier-D7cJ6Diz.js","assets/LienMndPay-DZakUqdh.js","assets/Marketing-CS-Pemfq.js","assets/MarketingBranche-DtyD2wQ9.js","assets/Marque-Dp-Zv44w.js","assets/MesPourboires-CENjelyb.css","assets/MesPourboires-DzPY-PZ4.js","assets/MesTaches-B48hFikx.js","assets/MesTaches-Cc4XUDf6.css","assets/momo-C2ZVfV9J.js","assets/MonMois-DnPUL5xk.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/MtnMoMo-BAV0AeXJ.js","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/objectifs-l9YsdCyT.js","assets/opale-DxxXPN3u.js","assets/oreille-B1AMUmZh.js","assets/paie-du-5-DeJq-K_U.css","assets/paie-du-5-pur-CPiCK8fv.js","assets/paie-du-5-Z-VXPiDd.js","assets/paie-par-mtn-CseuraCF.js","assets/PaieParMtn-rmm8QDfT.js","assets/paliers-Dcqn3Z1g.js","assets/Parametres-BpWqms8T.js","assets/parcours-B5LSEeSk.js","assets/Parrainages-gAHAPB_6.css","assets/Parrainages-RCU6H6EF.js","assets/PassageAvantLeFauteuil-CFiCtNSz.js","assets/pdf-C_KlKMXC.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/periode-des-pourboires-pur-BUWqfwov.js","assets/Personas-Yv-t6dO-.js","assets/Personnel-D_M0hgcz.js","assets/photo-CvzblhL5.js","assets/pilotage-D8kf1Co8.css","assets/porte-de-l-equipe-DDGdbuDI.js","assets/Pourboires-_0vj0A6Z.js","assets/Predictions-hrKE1ylv.js","assets/preload-helper-BRe_O-Rg.js","assets/Prestataires-DSHw2z__.js","assets/Prets-DGf_daDM.js","assets/PrevisionDuMois-d5n50Apf.js","assets/PrevisionDuMois-DlFTw3OX.css","assets/Previsions-9BU2Vg1T.css","assets/Previsions-BZrjV7gw.js","assets/previsions-pur-Blrt1H2V.js","assets/processus-pur-R6U5QcCi.js","assets/Projets-BEUNSDmr.js","assets/Projets-COO7WDEE.css","assets/projets-pur-2ZEMRNDU.js","assets/projets-ZEXmWnQp.js","assets/protocoles-Kkzr-NQb.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-TkHVHC1r.js","assets/quiz-5qMPWZVi.js","assets/Rapport-DJYeC5PG.js","assets/Recommandations-DPr9sD85.js","assets/regler-AUBQgYuV.js","assets/regler-DHR_B1Dm.css","assets/regler-par-fedapay-pur-DYTDdXhs.js","assets/relances-pur-C9iUwl2e.js","assets/releve-des-avis-DBOvGCul.js","assets/SalonFoyer-5zNxThe4.js","assets/secretariat-admin-DUiLhjL3.js","assets/Secretariat-CaD80qIp.js","assets/Secretariat-Cy79Zw30.css","assets/Signatures-BJVAa204.js","assets/SignerUnPdf-CB7aH4U-.js","assets/Synthese-nHJnHKaI.js","assets/SyntheseGraphes-ClySUx46.js","assets/systeme-TPy-pF7j.css","assets/Tableau-CLdqjw9N.js","assets/temps-_lbzEKGx.js","assets/Textes-B2EeAslA.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-CkDzpGy0.css","assets/tiroirs-DAPk1020.js","assets/trone-B-r6lpi2.css","assets/trone-DNMfgAnT.js","assets/useAudiences-CKOiXt8y.js","assets/useClotureDuJour-NAqMwbT1.js","assets/visios-NFR1Hhx_.js","assets/Vitrine-BWilTqQJ.css","assets/Vitrine-CQA6nfvm.js","assets/_admin-DpezbMDh.js","assets/_contrat-BgB2iAdX.js","assets/_reuni-CB-8xnPA.js","assets/_shared-CcNHCxMe.js","assets/_signature-CvtB7pCe.js","assets/_ui-BrUDlmuM.css","assets/_ui-CfruUuQ-.js"];
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
