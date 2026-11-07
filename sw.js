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
const BUILD = "20261107153543";
const A_GARDER = ["./","assets/abonnements-CuIY9Asd.js","assets/Abonnements-DTY7p2DH.css","assets/Abonnements-u6eqVNQu.js","assets/Academie-D3LoCarj.js","assets/Acces-D0zkzsKo.js","assets/AFaire-Br1qFOgy.js","assets/afaire-DzCtwuk-.js","assets/Agents-COL6b2yk.js","assets/agents-donnees-C_nJE951.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-DGnRVUIq.js","assets/Appels-DUPTROQ9.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/Assistants-CPa2CK6N.js","assets/Assistants-D9i2Xwmg.css","assets/AtelierDesContenus-ChYDrVI8.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/Audience-b295KAPS.js","assets/Aujourdhui-BE7T2Fma.js","assets/avant-le-fauteuil-lecture-CXlFuI8b.js","assets/AvantLeFauteuil-CZOqLT3N.js","assets/avis-fiches-p3Uuoa0L.js","assets/AvisGoogle-DaPXfwX9.css","assets/AvisGoogle-T4rNbVUc.js","assets/BadgeEssai-DJe4T6e1.js","assets/bilan-B-bfPYR0.css","assets/bilan-BtRLzw-H.js","assets/BilanMensuel-CCPY0QkH.js","assets/Branches-BV4E071p.js","assets/bridges-BWfThBHZ.js","assets/Caisse-Cn-W_m9w.js","assets/caisse-du-soir-C6vPx-E_.css","assets/caisse-du-soir-CmwAzXai.js","assets/Caisses-CbjVdaC1.js","assets/Calendrier-xhwiS6Ke.js","assets/campagnes-pur-w8EnlCnr.js","assets/Carnet-DYsGeiGv.js","assets/carte-CQa0d1MF.js","assets/carte-_W_-xBPj.css","assets/CarteModal-CmjUSSIs.js","assets/CartesCadeaux-DKhghZRZ.js","assets/Catalogue-DVo0HFQp.js","assets/CentreDeCommande-BReEMAft.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-CG62F8-0.js","assets/certificat-Bpv1FayG.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-De3G73rx.js","assets/chiffre-du-jour-pur-CYniM3nN.js","assets/ChiffreDesPrestations-D7KIF1-8.js","assets/client-DwrH7NNg.js","assets/cloture-du-jour-DD3EWUfx.js","assets/ClotureDuTiroir-PalDCmGg.js","assets/Coffre-Cqf5niHk.js","assets/components-Bnv56Yxk.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-BLNJQm_M.js","assets/Comptes-Clp4Pch4.js","assets/consultation-CRW6QcWf.css","assets/consultation-Dwfd-S8Z.js","assets/Consultations-CJa3i7ju.js","assets/consultNotes-BpSYsLgZ.js","assets/Conversations-D4WwB5Zo.css","assets/Conversations-Dd4dyAr9.js","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-JFUPL-8y.js","assets/currency-qfIhGmrs.js","assets/Customers-PWoix5fY.js","assets/Dashboard-B2x7VsE_.css","assets/Dashboard-FfhTjiQ2.js","assets/dates-le4b_8eN.js","assets/Demandes-CZXyU1ka.js","assets/DepenseEnUnePhrase-BIGRlGqP.css","assets/DepenseEnUnePhrase-C0S__tX4.js","assets/Depenses-DTUkA6UO.js","assets/depenses-saisie-B7Ox4sWq.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-CSzUOEBE.js","assets/diagnostics-au-trone-C5qoHAun.js","assets/Dictee-BCjg97uV.js","assets/Dictee-D2P9yM7v.css","assets/dictee-pur-CJA31TTH.js","assets/Discussions-CRaCrgj9.js","assets/EditeurDesOffres-PENliIoo.js","assets/Encaissements-CaAksmWE.js","assets/enfants-lIAtmp9V.js","assets/Engagements-Cj5S9MhG.css","assets/engagements-coffre-B-X_H4kh.js","assets/Engagements-KAjAlitP.js","assets/EntreDeuxSeances-C4_d2XIH.js","assets/Evaluation-BeeEi0hc.js","assets/Factures-BUCJ-506.js","assets/FenetreDesCivilites-CDvlx-XC.js","assets/FenetreDesCivilites-zfNk1aak.css","assets/FenetreDuPoint-Cex_8uxc.js","assets/Fil-DeSmeu2c.js","assets/finances-BMFnlkRx.css","assets/fon-BKMupSjv.js","assets/fournisseurs-Dy7zShnF.js","assets/Fournisseurs-VEgKJbv_.js","assets/foyer-Nk5Xp1lj.js","assets/Gerard-B5nv6a4g.js","assets/Gerard-Cgj-zsJh.css","assets/gerard-donnees-34ZaucbR.js","assets/gestes-conversation-ByiEY15M.js","assets/HomeRituals-DJXG37of.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-Bv1Lm7Wj.js","assets/ia-centre-BMEbwB85.js","assets/ia-diagnostic-pur-BBLrGY5l.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-tableau-pur-CSRjGtTf.js","assets/identite-oCSZP5T5.js","assets/index-Cs8xXsIt.js","assets/index.es-5MdhQqZ4.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-DsnvRcAP.js","assets/jspdf.es.min-BAcypIyy.js","assets/JustePrix-Bcva2FF7.js","assets/kkiapay-CkDqueOD.js","assets/kkiapay-widget-DnUhUNd4.js","assets/Laboratoire-DZ3ShyZj.js","assets/LaJournee-Bn_G0HCt.css","assets/LaJournee-Dg4p6ms4.js","assets/LesPaiements-7fMesxma.js","assets/LesPaiements-BvdfOCbQ.css","assets/LettresAuDossier-C0K1EOrc.js","assets/LienMndPay-CZnNKjsj.js","assets/Marketing-BDl7CV-4.js","assets/MarketingBranche-kp5suDjc.js","assets/Marque-wtELAGQG.js","assets/MesPourboires-C-oVvGAa.js","assets/MesPourboires-D9I_9rZf.css","assets/MesTaches-Cc4XUDf6.css","assets/MesTaches-CISBeztp.js","assets/momo-C2ZVfV9J.js","assets/MonMois-Dkb3rIf3.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-Bzz3rSKJ.js","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/opale-KKptO5Sd.js","assets/oreille-B1AMUmZh.js","assets/paie-du-5-B_-ShrbB.js","assets/paie-du-5-DeJq-K_U.css","assets/paie-du-5-pur-CSjJZ6CA.js","assets/PaieParMtn-r_n6D7Ug.js","assets/paliers-DKTb_6sp.js","assets/Parametres-DEgcP7VY.js","assets/parcours-C6xW6xVO.js","assets/Parrainages-B85iV7i2.js","assets/Parrainages-gAHAPB_6.css","assets/PassageAvantLeFauteuil-CwY6r1d8.js","assets/pdf-D9DBAD6f.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/Personas-W5whZZu5.js","assets/Personnel-BXiYE6hJ.js","assets/photo-CXqO_qE4.js","assets/pilotage-D8kf1Co8.css","assets/Pourboires-CHszx5oC.js","assets/Predictions-DyNMGEqp.js","assets/Prestataires-CUT5j78x.js","assets/Prets-OAjessNb.js","assets/PrevisionDuMois-DlFTw3OX.css","assets/PrevisionDuMois-Rowr_cgg.js","assets/Previsions-Bdxel0SP.js","assets/previsions-pur-1gvdM7S_.js","assets/Previsions-r4v19Anp.css","assets/processus-pur-R6U5QcCi.js","assets/Projets-Ci4LMSJS.js","assets/Projets-COO7WDEE.css","assets/projets-CU54Y0CL.js","assets/projets-pur-2ZEMRNDU.js","assets/protocoles-8mZ4bmaP.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-CrLhEO7A.js","assets/qualification-RYKu9Eux.js","assets/quiz-5qMPWZVi.js","assets/Rapport-IawfRNle.js","assets/Recommandations-ZPGEswjw.js","assets/regler-C5hcM02_.css","assets/regler-la-seance-serveur-Bs6rzqZX.js","assets/regler-oglA4yJg.js","assets/relances-pur-lwRTXc5E.js","assets/releve-des-avis-Dxp4X_rU.js","assets/SalonFoyer-Bv5pqhBP.js","assets/secretariat-admin-BR9RK3L4.js","assets/Secretariat-CGkbuPIH.js","assets/Secretariat-Cy79Zw30.css","assets/Signatures-chR5spJ0.js","assets/SignerUnPdf-DvfRwwYG.js","assets/Synthese-BAX2bFgk.js","assets/SyntheseGraphes-DjXQSwno.js","assets/systeme-TPy-pF7j.css","assets/Tableau-D-e2gEVJ.js","assets/temps-Dbju5etR.js","assets/Textes-DLpOzRbT.css","assets/Textes-DSxSz8tw.js","assets/tiroirs-CkDzpGy0.css","assets/tiroirs-XBtVvn8R.js","assets/trone-CQ2DUl_d.css","assets/trone-Dlthx4Ow.js","assets/useAudiences-9rcdg0mB.js","assets/useClotureDuJour-BoNWOfTQ.js","assets/Vitrine-BWilTqQJ.css","assets/Vitrine-DfrpZDbM.js","assets/_admin-CLM0XwfY.js","assets/_contrat-G7AywtVp.js","assets/_heures-UHMMYJ4u.js","assets/_reuni-BM1k_wQd.js","assets/_shared-edpfC1q-.js","assets/_signature-B-5XSFoU.js","assets/_ui-BrUDlmuM.css","assets/_ui-Dz0fEhuP.js"];
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
