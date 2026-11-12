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
const BUILD = "20261112001336";
const A_GARDER = ["./","assets/Abonnements-BTw0vq7g.js","assets/abonnements-CC0mwXdF.js","assets/Abonnements-DTY7p2DH.css","assets/Academie-D6zlZGfa.js","assets/Acces-B-y6zToj.js","assets/afaire-CPNU2fpd.js","assets/AFaire-D8pIG9wB.js","assets/Agents-BycdHENh.js","assets/agents-donnees-mTZtq3z4.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-CA-dJmqO.js","assets/Appels-CisNMcP2.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/Assistants-CVWFoh9a.js","assets/Assistants-D9i2Xwmg.css","assets/AtelierDesContenus-CIM-r9Ro.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/Audience-a1zMhYUl.js","assets/Aujourdhui-64T4QKnj.js","assets/avant-le-fauteuil-lecture-_6gbEG5I.js","assets/AvantLeFauteuil-ga4RXAtp.js","assets/avis-fiches-CoTD504O.js","assets/AvisGoogle-C2UzyLRs.js","assets/AvisGoogle-DaPXfwX9.css","assets/BadgeEssai-pbggvs0n.js","assets/bilan-B-bfPYR0.css","assets/bilan-Bf12jG_G.js","assets/BilanMensuel-DDIlf3J3.js","assets/Branches-D5KW6-pv.js","assets/bridges-DwZweUin.js","assets/Caisse-DI58K6bN.js","assets/caisse-du-soir-C6vPx-E_.css","assets/caisse-du-soir-DDut2X6t.js","assets/Caisses-45tj0vBo.js","assets/Calendrier-U7pCPjNx.js","assets/campagnes-pur-BzD3rfl6.js","assets/Carnet-BNBujbHY.js","assets/carte-Dk7vLMsX.js","assets/carte-_W_-xBPj.css","assets/CarteModal-CYSyiU2G.js","assets/CartesCadeaux-npSYVEFU.js","assets/Catalogue-BuCqn5ib.js","assets/CentreDeCommande-CecIT9mH.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-DAqK9KaF.js","assets/certificat-BlVtHsQs.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-TT1Pp1u8.js","assets/chiffre-du-jour-pur-BIJlEKAr.js","assets/ChiffreDesPrestations-K8kTEIxl.js","assets/client-8i7jr7n8.js","assets/cloture-du-jour-dv6n_uZW.js","assets/ClotureDuTiroir-CEzjuiXC.js","assets/Coffre-CA10PkUE.js","assets/collecte-mtn-pur-DW4nw7-V.js","assets/components-BGpqcnqf.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-kw2heGO3.js","assets/Comptes-4VeknM_c.js","assets/consultation-C9RR8RZw.js","assets/consultation-CRW6QcWf.css","assets/Consultations-BT5RLT7m.js","assets/consultNotes-WnXB6OMV.js","assets/Conversations-Bj4c8ngc.js","assets/Conversations-D4WwB5Zo.css","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-BBYeLneJ.js","assets/currency-qfIhGmrs.js","assets/Customers-DLrsf_U6.js","assets/Dashboard-B2x7VsE_.css","assets/Dashboard-qUTs9GDg.js","assets/dates-J7RNnYcO.js","assets/Demandes-DmpLz-l6.js","assets/DepenseEnUnePhrase-BIGRlGqP.css","assets/DepenseEnUnePhrase-CPKOmR4w.js","assets/Depenses-BVd3t2cV.js","assets/depenses-saisie-DtN7LK2Q.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-CaCGHUKE.js","assets/diagnostics-au-trone-Qy8SpsHE.js","assets/Dictee-D2P9yM7v.css","assets/Dictee-gsC9QP39.js","assets/dictee-pur-BkZJnNvH.js","assets/Discussions-UJ11TdJx.js","assets/EditeurDesOffres-BcbXUeMc.js","assets/Encaissements-B1jQnFxO.js","assets/enfants-C-3_0plY.js","assets/Engagements-BYiKE37j.js","assets/Engagements-Cj5S9MhG.css","assets/engagements-coffre-DBLx7xbI.js","assets/EntreDeuxSeances-BCrvfDRc.js","assets/Evaluation-DYim5Eyl.js","assets/facture-DdxJTNwm.js","assets/Factures-DTTYmjsn.js","assets/FenetreDesCivilites-BRFS_gZK.js","assets/FenetreDesCivilites-zfNk1aak.css","assets/FenetreDuPoint-v_YN_aTs.js","assets/Fil-DcB2pog9.js","assets/finances-Ds4kOIUN.css","assets/fon-CGqg9eu3.js","assets/Fournisseurs-qcG50r-g.js","assets/fournisseurs-SbYUijiP.js","assets/foyer-CbyLfN1L.js","assets/Gerard-Cgj-zsJh.css","assets/gerard-donnees-Bq7osI7W.js","assets/Gerard-DqFuB_Qn.js","assets/gestes-conversation-DIfd4bpk.js","assets/heures-des-rappels-pur-Dig9pZpo.js","assets/HomeRituals-D6Y0t7WT.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-DfnVWmux.js","assets/ia-centre-BcBZSOHS.js","assets/ia-diagnostic-pur-BBLrGY5l.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-tableau-pur-p6UvREJe.js","assets/identite-Blpu0oxq.js","assets/index-BBBdlIeL.js","assets/index.es-BeW8sJ25.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal--rbCcKhT.js","assets/jspdf.es.min-DC7oxKGe.js","assets/JustePrix-Dp1CcDMO.js","assets/kkiapay-Ci4YU1wH.js","assets/kkiapay-widget-DnUhUNd4.js","assets/Laboratoire-DpKti5RO.js","assets/LaJournee-Bn_G0HCt.css","assets/LaJournee-hr8Et-_9.js","assets/LesPaiements-C9cEZlne.css","assets/LesPaiements-D8StBlvv.js","assets/LettresAuDossier-D0bKCN2u.js","assets/LienMndPay-DbOQsJL7.js","assets/Marketing-DPxQmhSu.js","assets/MarketingBranche-C0gwiQQ4.js","assets/Marque-B4fAsaM0.js","assets/MesPourboires-CENjelyb.css","assets/MesPourboires-xVt58oDf.js","assets/MesTaches-Cc4XUDf6.css","assets/MesTaches-CYqh3f4Z.js","assets/momo-C2ZVfV9J.js","assets/MonMois-fDGNDzxq.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/MtnMoMo-DnZfu9jX.js","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/objectifs-DkIdPFVa.js","assets/opale-BwJxMwlg.js","assets/oreille-B1AMUmZh.js","assets/paie-du-5-D8YTt4pU.js","assets/paie-du-5-DeJq-K_U.css","assets/paie-du-5-pur-CPiCK8fv.js","assets/paie-par-mtn-CmNmxjik.js","assets/PaieParMtn-D3S3z8gH.js","assets/paliers-DoCxbKyz.js","assets/Parametres-BOeiAoxw.js","assets/parcours-DX_Rgk-x.js","assets/Parrainages-BhTZ8XnA.js","assets/Parrainages-gAHAPB_6.css","assets/PassageAvantLeFauteuil-DedbnZRN.js","assets/pdf-CzO4BU9j.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/periode-des-pourboires-pur-BUWqfwov.js","assets/Personas-BhOZfpL9.js","assets/Personnel-8onYRkCl.js","assets/photo-DW9i_HMX.js","assets/pilotage-D8kf1Co8.css","assets/Pourboires-BHbfhLTS.js","assets/Predictions-DG6P18-L.js","assets/Prestataires-BwfqsRLk.js","assets/Prets-AfnBzIbO.js","assets/PrevisionDuMois-DcAgcGQO.js","assets/PrevisionDuMois-DlFTw3OX.css","assets/Previsions-9BU2Vg1T.css","assets/Previsions-lh9YGPQo.js","assets/previsions-pur-xLIhBzqL.js","assets/processus-pur-R6U5QcCi.js","assets/Projets-CFCq2HK-.js","assets/projets-CnYNnWrn.js","assets/Projets-COO7WDEE.css","assets/projets-pur-2ZEMRNDU.js","assets/protocoles-DZWZBUpl.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-B8ndrlNS.js","assets/qualification-IRb8Xoup.js","assets/quiz-5qMPWZVi.js","assets/Rapport-Bl2Jbt0N.js","assets/Recommandations-Cmubc2Ii.js","assets/regler-CXN-jMIj.js","assets/regler-DHR_B1Dm.css","assets/relances-pur-BacTXlI2.js","assets/releve-des-avis-A2FlRepF.js","assets/SalonFoyer-BEYjNcof.js","assets/Secretariat--aBwihHP.js","assets/secretariat-admin-5sTo_9Pk.js","assets/Secretariat-Cy79Zw30.css","assets/Signatures-C0CJzJnc.js","assets/SignerUnPdf-BeQM2rqE.js","assets/Synthese-ulpJK0JX.js","assets/SyntheseGraphes-BvucOcmF.js","assets/systeme-TPy-pF7j.css","assets/Tableau-Yf9ZdGsG.js","assets/temps-rWW0VCK7.js","assets/Textes-DjdOM_WO.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-CkDzpGy0.css","assets/tiroirs-mqtmmy8H.js","assets/trone--yVAp-XF.js","assets/trone-CKg79qbi.css","assets/useAudiences-Bu2AcAUS.js","assets/useClotureDuJour-uv2aMmNm.js","assets/Vitrine-BgJSbbVw.js","assets/Vitrine-BWilTqQJ.css","assets/_admin-53v0OtxR.js","assets/_contrat-D-6MAAbm.js","assets/_reuni-DpwuY2EU.js","assets/_shared-DgR79CEn.js","assets/_signature-DGerYc47.js","assets/_ui-BrUDlmuM.css","assets/_ui-CvLAMvRW.js"];
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
