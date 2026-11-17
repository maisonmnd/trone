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
const BUILD = "20261117145500";
const A_GARDER = ["./","assets/abonnements-BkZu6UsU.js","assets/Abonnements-Dec7s3Ci.js","assets/Abonnements-DTY7p2DH.css","assets/Academie-D2C9RE0K.js","assets/Acces-CF7alLhb.js","assets/afaire-CBcAiu6D.js","assets/AFaire-jlp3gjZx.js","assets/Agents-CKNTye_6.js","assets/agents-donnees-4nNXFJKx.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-Ct8Ckcwz.js","assets/Appels-DA38DvgI.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/Assistants-2Cz_55xh.js","assets/Assistants-D9i2Xwmg.css","assets/AtelierDesContenus-ClUeqww5.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/Audience-Cf2l_V5F.js","assets/Aujourdhui-U5ZVfP1f.js","assets/avant-le-fauteuil-lecture-BKwcjxvh.js","assets/AvantLeFauteuil-CmMOK2tk.js","assets/avis-fiches-hT7G33Yu.js","assets/AvisGoogle-DaPXfwX9.css","assets/AvisGoogle-ky8wp21O.js","assets/BadgeEssai-Bup9PXR5.js","assets/BadgeSuggere-Dm8Ka5Y9.js","assets/besoins-DEg-KOIH.js","assets/BesoinsEtRegles-CNwNCzFT.js","assets/BesoinsEtRegles-CzntMbJE.css","assets/bilan-B-bfPYR0.css","assets/bilan-BhPxlFxY.js","assets/BilanMensuel-5gPZDdKd.js","assets/Branches-CfBNc1Vv.js","assets/bridges-D_xtbXrG.js","assets/Caisse-CE5XT5Bc.js","assets/caisse-du-soir-BoP4b3wE.js","assets/caisse-du-soir-C6vPx-E_.css","assets/Caisses-DjhSSO3H.js","assets/Calendrier-BSQ_Z7Uj.js","assets/campagnes-pur-BAX9M8S_.js","assets/Carnet-ZM8SJMwA.js","assets/carte-C-7YUQih.js","assets/carte-_W_-xBPj.css","assets/CarteModal-BV4tofOR.js","assets/CartesCadeaux-CNe3eVIi.js","assets/Catalogue-CbRPlJOG.js","assets/CentreDeCommande-Du8kyJhp.css","assets/CentreDeCommande-rz0k5WOJ.js","assets/Cercle-ClB9-RMt.js","assets/certificat-D1PWEzJI.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-CE5im3ec.js","assets/chiffre-du-jour-pur-CmOhpBOA.js","assets/ChiffreDesPrestations-Dy208sMF.js","assets/client-CSJ2KcKG.js","assets/cloture-du-jour-Ci-O5Gtk.js","assets/ClotureDuTiroir-BtEF94pS.js","assets/Coffre-C3w1UM2C.js","assets/collecte-mtn-pur-D9rF7FS0.js","assets/components-CLxShPss.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-q1iM2jzt.js","assets/Comptes-BKRDRL3t.js","assets/consultation-CJNPW9iF.js","assets/consultation-CRW6QcWf.css","assets/Consultations-C-1UWUSG.js","assets/Consultations-DiE-2_mG.css","assets/consultNotes-w9_hP5xt.js","assets/Conversations-BCJLmUYe.js","assets/Conversations-D4WwB5Zo.css","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-CsAzwTMm.js","assets/currency-qfIhGmrs.js","assets/Customers-BdZolsNn.js","assets/Dashboard-B2x7VsE_.css","assets/Dashboard-DSqS13HB.js","assets/dates-rpEFrGfM.js","assets/Demandes-SqPzGwnY.js","assets/DepenseEnUnePhrase-BIGRlGqP.css","assets/DepenseEnUnePhrase-Cz3OgYoX.js","assets/Depenses-BExx7Yax.js","assets/depenses-saisie-riZXWJwC.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-Bh8m9xnc.js","assets/diagnostics-au-trone-5fpt8JuH.js","assets/Dictee-BIQFbKhA.css","assets/Dictee-D69D1FUL.js","assets/dictee-pur-BSmOoLd8.js","assets/Discussions-CEHa3uYA.js","assets/EditeurDesOffres-F3uFoBJc.js","assets/Encaissements-DEMt09pH.js","assets/enfants-CH7eXcvs.js","assets/Engagements-Cj5S9MhG.css","assets/engagements-coffre-BTm0naXe.js","assets/Engagements-FuxAK4QV.js","assets/EntreDeuxSeances-CIwds7f6.js","assets/es-UouR4LZb.js","assets/Evaluation-3n2zGWSd.js","assets/facture-BmoKO0Ny.js","assets/Factures-CQ5q2RIb.js","assets/FenetreDesCivilites-Dkqd96q_.js","assets/FenetreDesCivilites-zfNk1aak.css","assets/FenetreDuPoint-DSJRl2-3.js","assets/Fil-Cd8PG6ps.js","assets/finances-C8x7Mn4-.css","assets/fon-DyIqyiLU.js","assets/Fournisseurs-BasSmmQ4.js","assets/fournisseurs-D5QqQ9DV.js","assets/foyer-DH5xTY6Q.js","assets/Gerard-B9dLJYny.js","assets/Gerard-Cgj-zsJh.css","assets/gerard-donnees-CTksecDv.js","assets/gestes-conversation-DOqdthXI.js","assets/heures-des-rappels-pur-BWJPB8OP.js","assets/HomeRituals-CuVdqbnG.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-DuS9DSGe.js","assets/ia-centre-Dkc7uYwY.js","assets/ia-diagnostic-pur-BNtkwfR3.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-tableau-pur-p6UvREJe.js","assets/identite-DQMpmmVB.js","assets/index.es-DunSnAQ5.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-BXSEjBGc.js","assets/jspdf.es.min-C3ST7TCG.js","assets/JustePrix-CouYfrZi.js","assets/kkiapay-DVLgfSw3.js","assets/kkiapay-widget-CVmsl9OE.js","assets/Laboratoire-XjaOB-u4.js","assets/LaJournee-Bn_G0HCt.css","assets/LaJournee-CgdoMmiQ.js","assets/le-caissier-pur-Bxm8INu5.js","assets/LesPaiements-BgxyP_ol.js","assets/LesPaiements-C9cEZlne.css","assets/LettresAuDossier-CNVBm3CB.js","assets/LienMndPay-CivzvI4-.js","assets/Marketing-k5wtgHzR.js","assets/MarketingBranche-CrbKUDsz.js","assets/Marque-B8YRksN8.js","assets/MesPourboires-C5M5IkxT.js","assets/MesPourboires-CENjelyb.css","assets/MesTaches-Cc4XUDf6.css","assets/MesTaches-DkxQTJwR.js","assets/momo-C2ZVfV9J.js","assets/MonMois-CCpYL4yU.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/MtnMoMo-B5minaA-.js","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/objectifs-Dj30MaD2.js","assets/opale-DBxMsw9R.js","assets/oreille-B1AMUmZh.js","assets/paie-du-5-BIasvYjo.js","assets/paie-du-5-DeJq-K_U.css","assets/paie-du-5-pur-CPiCK8fv.js","assets/paie-par-mtn-DK8eClBM.js","assets/PaieParMtn-D0eLdd-6.js","assets/paliers-DOYn4iX-.js","assets/Parametres-B_pGuvyy.js","assets/parcours-DbwUnJ-R.js","assets/Parrainages-B-Z_R__M.js","assets/Parrainages-gAHAPB_6.css","assets/PassageAvantLeFauteuil-Cu3M4eNy.js","assets/pdf-BEbuUpO4.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/periode-des-pourboires-pur-BUWqfwov.js","assets/Personas-Cx__taGi.js","assets/Personnel-CFva_dy5.js","assets/photo-C_KY6kA4.js","assets/pilotage-D8kf1Co8.css","assets/Pourboires-mmlUbJ4g.js","assets/Predictions-BnCp8FFu.js","assets/Prestataires-BmGlpJ2u.js","assets/Prets--cRAHA6z.js","assets/PrevisionDuMois-DlFTw3OX.css","assets/PrevisionDuMois-gB8Vjcu2.js","assets/Previsions-9BU2Vg1T.css","assets/Previsions-CAZ97HkE.js","assets/previsions-pur-D8Pwpveo.js","assets/processus-pur-R6U5QcCi.js","assets/projets-2YVcmM4D.js","assets/Projets-COO7WDEE.css","assets/Projets-Ctx1Y_4O.js","assets/projets-pur-2ZEMRNDU.js","assets/protocoles-CwKQTeyC.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-Czj8lLmm.js","assets/qualification-3IqC_W8j.js","assets/quiz-5qMPWZVi.js","assets/Rapport-CRTYq5cM.js","assets/Recommandations-BgwBqz4Q.js","assets/regler-DHR_B1Dm.css","assets/regler-DoyUkBjv.js","assets/regler-par-fedapay-pur-CFL4EbBx.js","assets/relances-pur-BacTXlI2.js","assets/releve-des-avis-DueBuvxO.js","assets/SalonFoyer-P-XshC8D.js","assets/secretariat-admin-m_J6VxLa.js","assets/Secretariat-CwGB76M2.js","assets/Secretariat-Cy79Zw30.css","assets/Signatures-CXlrzQy7.js","assets/SignerUnPdf-BAjNHoem.js","assets/Synthese-dZYlAOp1.js","assets/SyntheseGraphes-D2rZP5L7.js","assets/systeme-TPy-pF7j.css","assets/Tableau-i1Ekz5Fp.js","assets/temps-33kplxMW.js","assets/Textes-Czu1rYs3.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-CIFudbDs.js","assets/tiroirs-CkDzpGy0.css","assets/trone-B0ugxSjV.js","assets/trone-DxtNUYxb.css","assets/useAudiences-ByDi1eDQ.js","assets/useClotureDuJour-CzFi1S5R.js","assets/visios-BDQLJEnR.js","assets/Vitrine-BHG8klMe.js","assets/Vitrine-BWilTqQJ.css","assets/_admin-BaY17hMm.js","assets/_contrat-DnSRmzXJ.js","assets/_reuni-CxEeqqFC.js","assets/_shared-CDkbvVE1.js","assets/_signature-BuoYOnOC.js","assets/_ui-BRavYr0F.js","assets/_ui-BrUDlmuM.css"];
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
