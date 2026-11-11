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
const BUILD = "20261111212226";
const A_GARDER = ["./","assets/abonnements-5TaPHPu5.js","assets/Abonnements-DAMgvGCH.js","assets/Abonnements-DTY7p2DH.css","assets/Academie-DQ_89MJj.js","assets/Acces-g7lUCbky.js","assets/afaire-CnES30JM.js","assets/AFaire-DmyQbPQK.js","assets/Agents-DiEXuySo.js","assets/agents-donnees-BV1Jxzly.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-9AM7dJ62.js","assets/Appels-iGG2tKbm.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/Assistants-5ASOMznm.js","assets/Assistants-D9i2Xwmg.css","assets/AtelierDesContenus-D3-p6F2A.css","assets/AtelierDesContenus-DBUf-P7l.js","assets/Audience-Bqbazx0m.js","assets/Aujourdhui-DD9Y22ny.js","assets/avant-le-fauteuil-lecture-D3enwfNQ.js","assets/AvantLeFauteuil-S1LIXOsK.js","assets/avis-fiches-DJYcRnBV.js","assets/AvisGoogle-CmdMNyIh.js","assets/AvisGoogle-DaPXfwX9.css","assets/BadgeEssai-CQ_oplBy.js","assets/bilan-B-bfPYR0.css","assets/bilan-CFehCnTp.js","assets/BilanMensuel-Bl2cnxjy.js","assets/Branches-BtTYvmEi.js","assets/bridges-Z6d8YOuC.js","assets/Caisse-BASD4AvP.js","assets/caisse-du-soir-C6R0LuRs.js","assets/caisse-du-soir-C6vPx-E_.css","assets/Caisses-DkA-rJF1.js","assets/Calendrier-BHoVTDIj.js","assets/campagnes-pur-McJ5qoft.js","assets/Carnet-PYjUIPKR.js","assets/carte-CAitBZRa.js","assets/carte-_W_-xBPj.css","assets/CarteModal-DlnnsQbe.js","assets/CartesCadeaux-GiZjgiAp.js","assets/Catalogue-CBElJqrx.js","assets/CentreDeCommande-CvUAZo7W.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-eM905dv1.js","assets/certificat-F6NylMe5.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-1eThN197.js","assets/chiffre-du-jour-pur-LP2uJH3Y.js","assets/ChiffreDesPrestations-DHj_rpos.js","assets/client-_P_ZUL8N.js","assets/cloture-du-jour-ClD1GUvj.js","assets/ClotureDuTiroir-BdRlm1ER.js","assets/Coffre-Cm7n-s1p.js","assets/collecte-mtn-pur-C_fJpWL6.js","assets/components-DXaWoksS.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-gj-cV7o6.js","assets/Comptes-B4amVz-s.js","assets/consultation-BfO4WGnd.js","assets/consultation-CRW6QcWf.css","assets/Consultations-Dbuh9zQc.js","assets/consultNotes-C3U1_48T.js","assets/Conversations-D4WwB5Zo.css","assets/Conversations-JCbBdGEm.js","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-35ujUm3N.js","assets/currency-qfIhGmrs.js","assets/Customers-BIiCNN12.js","assets/Dashboard-B2x7VsE_.css","assets/Dashboard-CFEulzC8.js","assets/dates-C2Uqk1Q2.js","assets/Demandes-Cvvi2Opl.js","assets/DepenseEnUnePhrase-BIGRlGqP.css","assets/DepenseEnUnePhrase-DqTc_xuF.js","assets/Depenses-CAa1Q8LT.js","assets/depenses-saisie-C79-Yjle.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-Ckls-wSQ.js","assets/diagnostics-au-trone-CdeGohZp.js","assets/Dictee-D2P9yM7v.css","assets/Dictee-K7pMj793.js","assets/dictee-pur-DKMt4oNP.js","assets/Discussions-BT18smbw.js","assets/EditeurDesOffres-BuM8m7UX.js","assets/Encaissements-CceWyGqa.js","assets/enfants-BDUxYCSm.js","assets/Engagements-Cj5S9MhG.css","assets/engagements-coffre-B-Ox8YN2.js","assets/Engagements-D7gc4mkf.js","assets/EntreDeuxSeances-BJh06Qxb.js","assets/Evaluation-CzMJo7AZ.js","assets/Factures-CvWM3zDH.js","assets/FenetreDesCivilites-BIJmE361.js","assets/FenetreDesCivilites-zfNk1aak.css","assets/FenetreDuPoint-DpFmCa44.js","assets/Fil-By719ByN.js","assets/finances-BMFnlkRx.css","assets/fon-C53GQjZY.js","assets/Fournisseurs-DHL7xIN8.js","assets/fournisseurs-Osctj_Vi.js","assets/foyer-CWXfavxR.js","assets/Gerard-BxQVFuV_.js","assets/Gerard-Cgj-zsJh.css","assets/gerard-donnees-CSLXjSuF.js","assets/gestes-conversation-CyHSCEWz.js","assets/heures-des-rappels-pur-Dig9pZpo.js","assets/HomeRituals-y55KE0Ph.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-CQuA-BEO.js","assets/ia-centre-DQIBjBnm.js","assets/ia-diagnostic-pur-BBLrGY5l.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-tableau-pur-p6UvREJe.js","assets/identite-BmgZNjXA.js","assets/index-X2F3erQM.js","assets/index.es-B0NY14a0.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-CqYqv0J2.js","assets/jspdf.es.min-DvmSWbG6.js","assets/JustePrix-B1WgK2MW.js","assets/kkiapay-CG4IhwVP.js","assets/kkiapay-widget-DnUhUNd4.js","assets/Laboratoire-ZJqP_4r-.js","assets/LaJournee-Bn4RWABb.js","assets/LaJournee-Bn_G0HCt.css","assets/LesPaiements-C9cEZlne.css","assets/LesPaiements-hTRIjX-r.js","assets/LettresAuDossier-CJPML-vr.js","assets/LienMndPay-B-auZGv0.js","assets/Marketing-DArNnjsq.js","assets/MarketingBranche-HBqzU59k.js","assets/Marque-wpSAswI7.js","assets/MesPourboires-CENjelyb.css","assets/MesPourboires-pP3gc5i2.js","assets/MesTaches-B-nFQBvg.js","assets/MesTaches-Cc4XUDf6.css","assets/momo-C2ZVfV9J.js","assets/MonMois-CVZjcx6U.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/objectifs-DXRxXVzd.js","assets/opale-C1qsMijG.js","assets/oreille-B1AMUmZh.js","assets/paie-du-5-DeJq-K_U.css","assets/paie-du-5-iD09_6BO.js","assets/paie-du-5-pur-BG5EDB7P.js","assets/PaieParMtn-CJDEQdJ5.js","assets/paliers-CGEFOX8C.js","assets/Parametres-Bcrix3sW.js","assets/parcours-TRcwveSj.js","assets/Parrainages-Dy-6FQG2.js","assets/Parrainages-gAHAPB_6.css","assets/PassageAvantLeFauteuil-HaYb5pN6.js","assets/pdf-nfkdPu8a.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/periode-des-pourboires-pur-BUWqfwov.js","assets/Personas-SDvTORXW.js","assets/Personnel-gfZ7AGfc.js","assets/photo-B43aVYRc.js","assets/pilotage-D8kf1Co8.css","assets/Pourboires-B02GY6yt.js","assets/Predictions-Bcwf1XqG.js","assets/Prestataires-eXyxtmDx.js","assets/Prets-CxsdiUb5.js","assets/PrevisionDuMois-DlFTw3OX.css","assets/PrevisionDuMois-qvmakXd7.js","assets/Previsions-9BU2Vg1T.css","assets/Previsions-HwsOkR2-.js","assets/previsions-pur-xHmnAEY7.js","assets/processus-pur-R6U5QcCi.js","assets/projets-Ckf-2kuf.js","assets/Projets-COO7WDEE.css","assets/Projets-CWIt0_iG.js","assets/projets-pur-2ZEMRNDU.js","assets/protocoles-KKL-df_b.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-BGLvbwcT.js","assets/qualification-deu6ElG-.js","assets/quiz-5qMPWZVi.js","assets/Rapport-p09ob-hy.js","assets/Recommandations-CoyhaHRO.js","assets/regler-D-1FEDuL.js","assets/regler-DHR_B1Dm.css","assets/relances-pur-BacTXlI2.js","assets/releve-des-avis-BAancT0S.js","assets/SalonFoyer-CtU2U8Dx.js","assets/secretariat-admin-C4Kb_Pq4.js","assets/Secretariat-Cy79Zw30.css","assets/Secretariat-vfgIwtpz.js","assets/Signatures-CWJ8SIpu.js","assets/SignerUnPdf-Dwdd161Z.js","assets/Synthese-Bzl-GsYK.js","assets/SyntheseGraphes-dS-CjuLo.js","assets/systeme-TPy-pF7j.css","assets/Tableau-DQyaYaRU.js","assets/temps-Btx6XwzD.js","assets/Textes-CBdLfBpT.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-CkDzpGy0.css","assets/tiroirs-DMSNNuKJ.js","assets/trone-CKg79qbi.css","assets/trone-CzRxsnKr.js","assets/useAudiences-dfHKXqfl.js","assets/useClotureDuJour-QsjsZtep.js","assets/Vitrine-BJEIeyRE.js","assets/Vitrine-BWilTqQJ.css","assets/_admin-CXjTnuh4.js","assets/_contrat-BWW1tLmK.js","assets/_reuni-BwENiR3d.js","assets/_shared-D5W4MCFG.js","assets/_signature-CkGy7r1G.js","assets/_ui-BrUDlmuM.css","assets/_ui-C2OblUmL.js"];
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
