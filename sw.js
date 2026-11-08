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
const BUILD = "20261108064114";
const A_GARDER = ["./","assets/abonnements-ARpzFJXh.js","assets/Abonnements-BxE95gWA.js","assets/Abonnements-DTY7p2DH.css","assets/Academie-DEmYNHaH.js","assets/Acces-BUJh3Od8.js","assets/afaire-BjBZf-4K.js","assets/AFaire-fJT1VWZC.js","assets/Agents-DGpNfI7T.js","assets/agents-donnees-DTZbBsDr.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-D_Z-r3Qo.js","assets/Appels-BElYmxVR.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/Assistants-D9i2Xwmg.css","assets/Assistants-Y49ii0Ej.js","assets/AtelierDesContenus-0yIsVNsA.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/Audience-C1s8EHPa.js","assets/Aujourdhui-DJgVKskx.js","assets/avant-le-fauteuil-lecture-C6c_Uj72.js","assets/AvantLeFauteuil-CmMUYeDF.js","assets/avis-fiches-BOSEFvIQ.js","assets/AvisGoogle-B-y0bLFj.js","assets/AvisGoogle-DaPXfwX9.css","assets/BadgeEssai-Ddnb_soQ.js","assets/bilan-B-bfPYR0.css","assets/bilan-BqZ_Ywui.js","assets/BilanMensuel-B72hTSio.js","assets/Branches-Dt6qNkQ-.js","assets/bridges-CRXxkV1P.js","assets/Caisse-CofvXFWk.js","assets/caisse-du-soir-C6vPx-E_.css","assets/caisse-du-soir-CNXBXM_x.js","assets/Caisses-CFYDrQ-5.js","assets/Calendrier-BomlG4nG.js","assets/campagnes-pur-CZQOthmN.js","assets/Carnet-BnkcMJiE.js","assets/carte-DL4XWPYe.js","assets/carte-_W_-xBPj.css","assets/CarteModal-C01QGEEN.js","assets/CartesCadeaux-CvlpgrAz.js","assets/Catalogue-BdMHqZmI.js","assets/CentreDeCommande-BJCPsdvZ.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-CoQbVL6E.js","assets/certificat-rZ-FFQm5.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-D4Kn1swR.js","assets/chiffre-du-jour-pur-BOOrYLOZ.js","assets/ChiffreDesPrestations-DQ9z2d1-.js","assets/client-CU90RID4.js","assets/cloture-du-jour-9ynGJqGz.js","assets/ClotureDuTiroir-viuLsTFP.js","assets/Coffre-0CR7zmun.js","assets/components-3sYb9wkB.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-BKA6BFM-.js","assets/Comptes-B1lc99eC.js","assets/consultation-Bn1VT48m.js","assets/consultation-CRW6QcWf.css","assets/Consultations-MFudFOoL.js","assets/consultNotes-BSD64Juk.js","assets/Conversations-D4WwB5Zo.css","assets/Conversations-KSD79-H4.js","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-DvI571o9.js","assets/currency-qfIhGmrs.js","assets/Customers-D-wf2CxY.js","assets/Dashboard-B2x7VsE_.css","assets/Dashboard-BrxVFall.js","assets/dates-CVJf5FTM.js","assets/Demandes-avxEuZuu.js","assets/DepenseEnUnePhrase-BIGRlGqP.css","assets/DepenseEnUnePhrase-CH-aHnt0.js","assets/Depenses-B_V_u_Jc.js","assets/depenses-saisie-D9DgVHVZ.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-BY3kG95f.js","assets/diagnostics-au-trone-A5ZGaY7e.js","assets/Dictee-D0rIkeRi.js","assets/Dictee-D2P9yM7v.css","assets/dictee-pur-B83N0IpL.js","assets/Discussions-DcJu8dTI.js","assets/EditeurDesOffres-Ckh5iW6o.js","assets/Encaissements-C9s42LSp.js","assets/enfants-D_S8VwOn.js","assets/Engagements-B53DviVC.js","assets/Engagements-Cj5S9MhG.css","assets/engagements-coffre-DjfJdlls.js","assets/EntreDeuxSeances-D_LQVhNf.js","assets/Evaluation-DpQGcDJ9.js","assets/Factures-KJH4NlPH.js","assets/FenetreDesCivilites-FkSzIn46.js","assets/FenetreDesCivilites-zfNk1aak.css","assets/FenetreDuPoint-Lqt1mdeG.js","assets/Fil-B6cNOtO_.js","assets/finances-BMFnlkRx.css","assets/fon-C5lkXC_U.js","assets/fournisseurs-10awYbgX.js","assets/Fournisseurs-3VlXjn-j.js","assets/foyer-BnN0wF7j.js","assets/Gerard-BPMCXWP-.js","assets/Gerard-Cgj-zsJh.css","assets/gerard-donnees-CmKN8lun.js","assets/gestes-conversation-BtZeSDHO.js","assets/HomeRituals-B4EC-s6g.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-D-qjgs1L.js","assets/ia-centre-B1rbWhLK.js","assets/ia-diagnostic-pur-BBLrGY5l.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-tableau-pur-CSRjGtTf.js","assets/identite-C1ZCVhAK.js","assets/index-DOOh5KAj.js","assets/index.es-C4RF246i.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-DqAxM5dl.js","assets/jspdf.es.min-C1Qms2Ml.js","assets/JustePrix-D87C2OWp.js","assets/kkiapay-Drl71SkF.js","assets/kkiapay-widget-DnUhUNd4.js","assets/Laboratoire-CYuVXy6q.js","assets/LaJournee-Bn_G0HCt.css","assets/LaJournee-CU39aOGX.js","assets/LesPaiements-BvdfOCbQ.css","assets/LesPaiements-xp-y5b9r.js","assets/LettresAuDossier-DkmeQkgP.js","assets/LienMndPay-CAq4gCmW.js","assets/Marketing-cmzZwH5u.js","assets/MarketingBranche-DFDOy4Oh.js","assets/Marque-BZC9Cr6v.js","assets/MesPourboires-D9I_9rZf.css","assets/MesPourboires-DEabahmx.js","assets/MesTaches-BYJFrL2r.js","assets/MesTaches-Cc4XUDf6.css","assets/momo-C2ZVfV9J.js","assets/MonMois-DHaQz0d3.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-CC2bGd-s.js","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/opale-0myyDEOk.js","assets/oreille-B1AMUmZh.js","assets/paie-du-5-Cb4Dnb_z.js","assets/paie-du-5-DeJq-K_U.css","assets/paie-du-5-pur-Y-X2pvMz.js","assets/PaieParMtn-BzNoQMbp.js","assets/paliers-BG___oW9.js","assets/Parametres-CO7t-KSU.js","assets/parcours-Cz5xZVag.js","assets/Parrainages-gAHAPB_6.css","assets/Parrainages-YOQgmjXf.js","assets/PassageAvantLeFauteuil-CWrwNfCT.js","assets/pdf-VJcNm7C7.js","assets/pdf-wZty9H1Y.js","assets/pdf.worker.min-uNib_u9P.js","assets/Personas-BUsXF_So.js","assets/Personnel-2j5hYgsg.js","assets/photo-CaR8uep2.js","assets/pilotage-D8kf1Co8.css","assets/Pourboires-D2x69MeO.js","assets/Predictions-Be9cdcpe.js","assets/Prestataires-BaAeRxfo.js","assets/Prets-pL1KqOdB.js","assets/PrevisionDuMois-DlFTw3OX.css","assets/PrevisionDuMois-WbjnFEvd.js","assets/Previsions-BhfQwqkV.js","assets/previsions-pur-DhDxljgI.js","assets/Previsions-r4v19Anp.css","assets/processus-pur-R6U5QcCi.js","assets/Projets-2ausRoNY.js","assets/projets-B7Ryu73F.js","assets/Projets-COO7WDEE.css","assets/projets-pur-2ZEMRNDU.js","assets/protocoles-xzOommPh.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-C1FHzxeN.js","assets/qualification-C02iToaZ.js","assets/quiz-5qMPWZVi.js","assets/Rapport-BS1hcmSi.js","assets/Recommandations-DMCFQy-h.js","assets/regler-C5hcM02_.css","assets/regler-CaW0inIV.js","assets/regler-la-seance-serveur-Bs6rzqZX.js","assets/relances-pur-lwRTXc5E.js","assets/releve-des-avis-CtE-4dcQ.js","assets/SalonFoyer-DOkD3Zty.js","assets/secretariat-admin-CqtK-SSH.js","assets/Secretariat-BzN3zjsU.js","assets/Secretariat-Cy79Zw30.css","assets/Signatures-DQf7iRej.js","assets/SignerUnPdf-DyLPU1yO.js","assets/Synthese-8n9qCDuc.js","assets/SyntheseGraphes-CK0tqp00.js","assets/systeme-TPy-pF7j.css","assets/Tableau-Dzu8RY8C.js","assets/temps-DsAXa3mO.js","assets/Textes-C5FXQt8X.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-CkDzpGy0.css","assets/tiroirs-DWXGPL3P.js","assets/trone-CQ2DUl_d.css","assets/trone-Despo2ei.js","assets/useAudiences-DT_ucxTI.js","assets/useClotureDuJour-DWfmaz-A.js","assets/Vitrine-BWilTqQJ.css","assets/Vitrine-CmcaOl7l.js","assets/_admin-BmB10VpS.js","assets/_contrat-ogqUD5Sg.js","assets/_heures-43Ol9R8F.js","assets/_reuni-DCsIa53w.js","assets/_shared-CSAeCNsU.js","assets/_signature-DxGvynhc.js","assets/_ui-BrUDlmuM.css","assets/_ui-DekOP92c.js"];
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
