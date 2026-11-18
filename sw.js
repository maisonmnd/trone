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
const BUILD = "20261118004233";
const A_GARDER = ["./","assets/Abonnements-CSq7JsTZ.js","assets/abonnements-DjOqIPom.js","assets/Abonnements-DTY7p2DH.css","assets/Academie-D1SNand5.js","assets/Acces-BXoQsT0q.js","assets/afaire-CcSq5lZp.js","assets/AFaire-CJS5fpay.js","assets/agents-donnees-DTMlUeTC.js","assets/Agents-D_gl7BdC.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-1ZOeuxyi.js","assets/Appels-Rab0OCUF.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/Assistants-BAMYmZTZ.js","assets/Assistants-D9i2Xwmg.css","assets/AtelierDesContenus-D3-p6F2A.css","assets/AtelierDesContenus-mwZO8dmB.js","assets/Audience-DMjphSNW.js","assets/Aujourdhui-DxD71Ext.js","assets/avant-le-fauteuil-lecture-XfpC8h1N.js","assets/AvantLeFauteuil-D0Rx7i7t.js","assets/avis-fiches-CKF1Nj3V.js","assets/AvisGoogle-Ckjfcucf.js","assets/AvisGoogle-DaPXfwX9.css","assets/BadgeEssai-CGA4nckA.js","assets/BadgeSuggere-w0B9z5kQ.js","assets/besoins-CgNOqNW1.js","assets/BesoinsEtRegles-BF3qvZ1l.js","assets/BesoinsEtRegles-CzntMbJE.css","assets/bilan-B-bfPYR0.css","assets/bilan-u5eNpNtd.js","assets/BilanMensuel-DTIR5poJ.js","assets/Branches-BB5kZVZo.js","assets/bridges-Dxnk5OOh.js","assets/Caisse-DbTkQ1w-.js","assets/caisse-du-soir-C6vPx-E_.css","assets/caisse-du-soir-COIwAQ-x.js","assets/Caisses-DDksOUIJ.js","assets/Calendrier-CNTl3qDR.js","assets/campagnes-pur-AnCFi84m.js","assets/Carnet-DyPuSDiz.js","assets/carte-DEhNjhE7.js","assets/carte-_W_-xBPj.css","assets/CarteModal-DZzIHsCr.js","assets/CartesCadeaux-DNuj8L9R.js","assets/Catalogue-BBa368IE.js","assets/CentreDeCommande-DTFhBgEB.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-95v69xrj.js","assets/certificat-BUGgvBAL.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-CY1gsgXl.js","assets/chiffre-du-jour-pur-qfBnwejd.js","assets/ChiffreDesPrestations-w1Buz0XS.js","assets/client-D-n0XbFp.js","assets/cloture-du-jour-DI6lymoX.js","assets/ClotureDuTiroir-DJvH1Baa.js","assets/Coffre-BxqCJpWT.js","assets/collecte-mtn-pur-D9rF7FS0.js","assets/components-BcEVq4Fs.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-Cl9ivU_c.js","assets/Comptes-DwzQ3-l6.js","assets/consultation-C-OjS6iN.js","assets/consultation-CRW6QcWf.css","assets/Consultations-DiE-2_mG.css","assets/Consultations-Hby9yN60.js","assets/consultNotes-PWl-r09W.js","assets/Conversations-b7edNLTA.js","assets/Conversations-D4WwB5Zo.css","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-DR9lXlXx.js","assets/currency-Cd0clE4P.js","assets/Customers-D_4OeYlu.js","assets/Dashboard-B2x7VsE_.css","assets/Dashboard-BLpC9zf0.js","assets/dates-6hAuB8ei.js","assets/Demandes-CT5fUgMs.js","assets/DepenseEnUnePhrase-BIGRlGqP.css","assets/DepenseEnUnePhrase-u39bqImY.js","assets/Depenses-DjL7vnTY.js","assets/depenses-saisie-cVfRSxN0.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-DCNznH4N.js","assets/diagnostics-au-trone-Cq_WSiOQ.js","assets/Dictee-BA478J8t.js","assets/Dictee-C-pUYYFA.css","assets/dictee-pur-CddZ2gfT.js","assets/Discussions-Cn099JM2.js","assets/EditeurDesOffres-BCq0nVo_.js","assets/Encaissements-Dw27eflv.js","assets/enfants-BnwN7Ebn.js","assets/Engagements-BFkYK6Lb.js","assets/Engagements-Cj5S9MhG.css","assets/engagements-coffre-CP5OLXM_.js","assets/EntreDeuxSeances-CmwJHe_p.js","assets/es-DeDmMQ0u.js","assets/Evaluation-Uiz1G5mU.js","assets/facture-97GzzgPD.js","assets/Factures-BjDDa5zB.js","assets/FenetreDesCivilites-s4Nb15GV.js","assets/FenetreDesCivilites-zfNk1aak.css","assets/FenetreDuPoint-inGOfAl3.js","assets/Fil-Dq-V_yX8.js","assets/finances-C8x7Mn4-.css","assets/fon-CYubzb3g.js","assets/Fournisseurs-BRRKEGdv.js","assets/fournisseurs-wMj_UX60.js","assets/foyer-B76loIqa.js","assets/Gerard-Cgj-zsJh.css","assets/Gerard-CkNxZGNP.js","assets/gerard-donnees-C10oKsbL.js","assets/gestes-conversation-BzU3FwEl.js","assets/heures-des-rappels-pur-BWJPB8OP.js","assets/HomeRituals-CWOacD8o.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier--r_LPWGS.js","assets/ia-centre-b7xB5HVr.js","assets/ia-diagnostic-pur-BNtkwfR3.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-tableau-pur-p6UvREJe.js","assets/identite-C2dS9fv7.js","assets/index.es-9NHa5lXR.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-DYbPhWui.js","assets/jspdf.es.min-Co0ZAagG.js","assets/JustePrix-Q4wUF_6c.js","assets/kkiapay-V04wAFHQ.js","assets/kkiapay-widget-CVmsl9OE.js","assets/Laboratoire-BClXj5FI.js","assets/LaJournee-Bn_G0HCt.css","assets/LaJournee-JZ1y9iQ1.js","assets/le-caissier-pur-5JCX5b1_.js","assets/LesPaiements-C9cEZlne.css","assets/LesPaiements-cANAEQR2.js","assets/LettresAuDossier-CCIILqVZ.js","assets/LienMndPay-Dw_GEsF7.js","assets/Marketing-CLKXeqbK.js","assets/MarketingBranche-24DsuP9O.js","assets/Marque-CGB1grK0.js","assets/MesPourboires-CENjelyb.css","assets/MesPourboires-mzMayFqK.js","assets/MesTaches-BPgyVamd.js","assets/MesTaches-Cc4XUDf6.css","assets/momo-C2ZVfV9J.js","assets/MonMois-tZP7ROaJ.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/MtnMoMo-CGF7ynvO.js","assets/objectifs-ChqumHg7.js","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/opale-CM06Zbo8.js","assets/oreille-B1AMUmZh.js","assets/paie-du-5-4zkqhd6O.js","assets/paie-du-5-DeJq-K_U.css","assets/paie-du-5-pur-CPiCK8fv.js","assets/paie-par-mtn-Cygd_GnN.js","assets/PaieParMtn-JxVHq392.js","assets/paliers-CszJau6S.js","assets/Parametres-C61E2t7j.js","assets/parcours-Ceu2sdW6.js","assets/Parrainages-BsaeQPmp.js","assets/Parrainages-gAHAPB_6.css","assets/PassageAvantLeFauteuil-BiJkznXO.js","assets/pdf-Dlkeybu4.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/periode-des-pourboires-pur-BUWqfwov.js","assets/Personas-CH4B-XOb.js","assets/Personnel-B2U29zOR.js","assets/photo-BXP7VeKO.js","assets/pilotage-D8kf1Co8.css","assets/Pourboires-BrqoXrg9.js","assets/Predictions-DvYWheTs.js","assets/Prestataires-BshuJd5O.js","assets/Prets-Cxrd8FER.js","assets/PrevisionDuMois-D52TLKSA.js","assets/PrevisionDuMois-DlFTw3OX.css","assets/Previsions-9BU2Vg1T.css","assets/Previsions-DPgxPVKJ.js","assets/previsions-pur-BCvggvLK.js","assets/processus-pur-R6U5QcCi.js","assets/projets-CA0Hb0V_.js","assets/Projets-COO7WDEE.css","assets/Projets-DlqhrDcE.js","assets/projets-pur-2ZEMRNDU.js","assets/protocoles-BWGHReLW.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-B6Kfi45P.js","assets/qualification-YZc93EgE.js","assets/quiz-5qMPWZVi.js","assets/Rapport-ETjjzJSN.js","assets/Recommandations-D7HiTSMs.js","assets/regler-D0uNNTZ8.js","assets/regler-DHR_B1Dm.css","assets/regler-par-fedapay-pur-CFL4EbBx.js","assets/relances-pur-BacTXlI2.js","assets/releve-des-avis-BV7Z6QR0.js","assets/SalonFoyer-DZCf9mV9.js","assets/secretariat-admin-P3Hx4-pc.js","assets/Secretariat-B9oYDQvv.js","assets/Secretariat-Cy79Zw30.css","assets/Signatures-CzZs9TmM.js","assets/SignerUnPdf-BQ4vOxFt.js","assets/Synthese-DhOGH0iE.js","assets/SyntheseGraphes-Beg-nHTB.js","assets/systeme-TPy-pF7j.css","assets/Tableau-Cd8GSjv2.js","assets/temps-DQ2RbUna.js","assets/Textes-cgxvIZKC.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-BiwNyqRl.js","assets/tiroirs-CkDzpGy0.css","assets/trone-BbhRgk3J.js","assets/trone-JHWNAy0h.css","assets/useAudiences-Mqk9JUuJ.js","assets/useClotureDuJour-BNjZWZEQ.js","assets/visios-DTcdzJeW.js","assets/Vitrine-BuISzF1u.js","assets/Vitrine-BWilTqQJ.css","assets/_admin-DO1VinYP.js","assets/_contrat-DC0X_HWl.js","assets/_reuni-B1JuXjtN.js","assets/_shared-BnQwTnhJ.js","assets/_signature-CFLT2yUk.js","assets/_ui-BrUDlmuM.css","assets/_ui-Dt3heXRC.js"];
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
