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
const BUILD = "20261114225407";
const A_GARDER = ["./","assets/abonnements-BhnsGK2J.js","assets/Abonnements-Dg24ZqeB.js","assets/Abonnements-DTY7p2DH.css","assets/Academie-DJAFfcyi.js","assets/Acces-5vrbEQDG.js","assets/afaire-BtEsH6aF.js","assets/AFaire-CSppNeUM.js","assets/Agents-cgkYrgzL.js","assets/agents-donnees-CShsRdUG.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-BaIztX2Y.js","assets/Appels-BjMcUaVg.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/Assistants-CpuH0-eY.js","assets/Assistants-D9i2Xwmg.css","assets/AtelierDesContenus-BBhzkByn.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/Audience-ZXPGZaHZ.js","assets/Aujourdhui-CSNur99O.js","assets/avant-le-fauteuil-lecture-DEqe3jLT.js","assets/AvantLeFauteuil-mos3NWJu.js","assets/avis-fiches-kcanWYnp.js","assets/AvisGoogle-DaPXfwX9.css","assets/AvisGoogle-GzD7xQ5h.js","assets/BadgeEssai-JYfFKEQu.js","assets/besoins-C3d89EmE.js","assets/BesoinsEtRegles-BGzXQP8Y.js","assets/BesoinsEtRegles-CzntMbJE.css","assets/bilan-B-bfPYR0.css","assets/bilan-CAxw3-CP.js","assets/BilanMensuel-DAJjwPVD.js","assets/Branches-BxW6f6eX.js","assets/bridges-C3AGHpVW.js","assets/Caisse-B0urrd1Z.js","assets/caisse-du-soir-B35vPW7m.js","assets/caisse-du-soir-C6vPx-E_.css","assets/Caisses--I2-YR6E.js","assets/Calendrier-38erUc-l.js","assets/campagnes-pur-DtXNO_yL.js","assets/Carnet-CMhtvlMu.js","assets/carte-CYIZHGEH.js","assets/carte-_W_-xBPj.css","assets/CarteModal-l-4tzACP.js","assets/CartesCadeaux-DsTaAnHf.js","assets/Catalogue-BGhFNXGy.js","assets/CentreDeCommande-CQ8HQKxN.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-BI4jY6VT.js","assets/certificat-CYPwTLfs.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-t_8gDaIn.js","assets/chiffre-du-jour-pur-BXZkhaFV.js","assets/ChiffreDesPrestations-N5-oRmFo.js","assets/client-B1xglHos.js","assets/cloture-du-jour-BoAhztMG.js","assets/ClotureDuTiroir-D_xvhjXa.js","assets/Coffre-Ct31gTDg.js","assets/collecte-mtn-pur-D9rF7FS0.js","assets/components-CU3KTc7d.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-CiYC697W.js","assets/Comptes-Cb9Fa_qF.js","assets/consultation-8j3n397n.js","assets/consultation-CRW6QcWf.css","assets/Consultations-DiE-2_mG.css","assets/Consultations-DK560igo.js","assets/consultNotes-B3HmZfl4.js","assets/Conversations-1QGmxACF.js","assets/Conversations-D4WwB5Zo.css","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-COeKM-Yb.js","assets/currency-qfIhGmrs.js","assets/Customers-PKjr2z8F.js","assets/Dashboard-B2x7VsE_.css","assets/Dashboard-FmvI0t71.js","assets/dates-bVhubx6y.js","assets/Demandes-B4FP_NIP.js","assets/DepenseEnUnePhrase-BIGRlGqP.css","assets/DepenseEnUnePhrase-Bkzf7J4a.js","assets/Depenses-BTL9Io9Z.js","assets/depenses-saisie-DpfuTaFw.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-BIPWm24u.js","assets/diagnostics-au-trone-CN2RTbdT.js","assets/Dictee-BIQFbKhA.css","assets/Dictee-C2uX9sYy.js","assets/dictee-pur-D6aurYqb.js","assets/Discussions-D7lU1e7a.js","assets/EditeurDesOffres-DP750u6I.js","assets/Encaissements-C_WmU-zV.js","assets/enfants-DovyGOGQ.js","assets/Engagements-BgWKzZhh.js","assets/Engagements-Cj5S9MhG.css","assets/engagements-coffre-Bmt0MAly.js","assets/EntreDeuxSeances-TEopwTDx.js","assets/Evaluation-4BVuaF36.js","assets/facture-XNTLdG-3.js","assets/Factures-DMXg9j0E.js","assets/FenetreDesCivilites-DcMYFIhA.js","assets/FenetreDesCivilites-zfNk1aak.css","assets/FenetreDuPoint-C10-IinK.js","assets/Fil-JsSfLm9O.js","assets/finances-C8x7Mn4-.css","assets/fon-B2QJps9M.js","assets/Fournisseurs-4vbH6js0.js","assets/fournisseurs-CwBBOg5S.js","assets/foyer-B2Y3-DuJ.js","assets/Gerard-Cgj-zsJh.css","assets/gerard-donnees-CQ3ZlGaw.js","assets/Gerard-DVvt-cPp.js","assets/gestes-conversation-CQ1dDTBy.js","assets/heures-des-rappels-pur-Dig9pZpo.js","assets/HomeRituals-CUlCrD5X.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-Dref1IdQ.js","assets/ia-centre-DlsSagxC.js","assets/ia-diagnostic-pur-BNtkwfR3.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-tableau-pur-p6UvREJe.js","assets/identite-DWYD0_T0.js","assets/index-S4eO4-7y.js","assets/index.es-CF7UR-eP.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-CF6wx6qY.js","assets/jspdf.es.min-DtLoP2hr.js","assets/JustePrix-BRXCL1At.js","assets/kkiapay-B39RiEe3.js","assets/kkiapay-widget-CVmsl9OE.js","assets/Laboratoire-D5bMnRqG.js","assets/LaJournee-Bn_G0HCt.css","assets/LaJournee-DPoj8V4y.js","assets/le-caissier-pur-WhehvDYg.js","assets/LesPaiements-C9cEZlne.css","assets/LesPaiements-CTq4gdm9.js","assets/LettresAuDossier--Hw_hjam.js","assets/LienMndPay-BhbeWi2B.js","assets/Marketing-BcutN4kh.js","assets/MarketingBranche-CLgnK60t.js","assets/Marque-DSdnu49d.js","assets/MesPourboires-CENjelyb.css","assets/MesPourboires-Cn6u8jO5.js","assets/MesTaches-Bx53OKEx.js","assets/MesTaches-Cc4XUDf6.css","assets/momo-C2ZVfV9J.js","assets/MonMois-B8icnR-E.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/MtnMoMo-lGWlN3yh.js","assets/objectifs-BsoFmyoI.js","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/opale-Dsj4Tm1X.js","assets/oreille-B1AMUmZh.js","assets/paie-du-5-DeJq-K_U.css","assets/paie-du-5-jIZcwtE_.js","assets/paie-du-5-pur-CPiCK8fv.js","assets/paie-par-mtn-DlAB18Sv.js","assets/PaieParMtn-TMWKlcnC.js","assets/paliers-DnMvluFF.js","assets/Parametres-BJmwzpwN.js","assets/parcours-m5zk37_q.js","assets/Parrainages-8wD06YhC.js","assets/Parrainages-gAHAPB_6.css","assets/PassageAvantLeFauteuil-f4GTxZW7.js","assets/pdf-bvvA8CcO.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/periode-des-pourboires-pur-BUWqfwov.js","assets/Personas-DKNxflqm.js","assets/Personnel-D_gbeUgV.js","assets/photo-DimSj367.js","assets/pilotage-D8kf1Co8.css","assets/Pourboires-Bb0VZmmk.js","assets/Predictions-DWpEOWjw.js","assets/Prestataires-BLz4ppzQ.js","assets/Prets-uW6xSdOz.js","assets/PrevisionDuMois-Cz4lvVHe.js","assets/PrevisionDuMois-DlFTw3OX.css","assets/Previsions-9BU2Vg1T.css","assets/Previsions-BEzW8sg3.js","assets/previsions-pur-4k7tk9Gx.js","assets/processus-pur-R6U5QcCi.js","assets/Projets-COO7WDEE.css","assets/projets-NEZLvcgK.js","assets/projets-pur-2ZEMRNDU.js","assets/Projets-QYxxs5FJ.js","assets/protocoles-Is2kZDhf.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-CCEtNcaP.js","assets/qualification-Dyds_y0-.js","assets/quiz-5qMPWZVi.js","assets/Rapport-BBP4DLH1.js","assets/Recommandations-1Ed7lwAO.js","assets/regler-DHR_B1Dm.css","assets/regler-DinEtXFi.js","assets/regler-par-fedapay-pur-CFL4EbBx.js","assets/relances-pur-BacTXlI2.js","assets/releve-des-avis-CRmffOED.js","assets/SalonFoyer-BIFwQBup.js","assets/secretariat-admin-CTWNTotC.js","assets/Secretariat-ClpNKv1T.js","assets/Secretariat-Cy79Zw30.css","assets/Signatures-BInocd0v.js","assets/SignerUnPdf-DzH6j21J.js","assets/Synthese-JvdMVeCk.js","assets/SyntheseGraphes-q547daST.js","assets/systeme-TPy-pF7j.css","assets/Tableau-GT3zyzjA.js","assets/temps-Cg4H3kO3.js","assets/Textes-DLpOzRbT.css","assets/Textes-neNYY1Mb.js","assets/tiroirs-CkDzpGy0.css","assets/tiroirs-Nwgox7Gz.js","assets/trone-BGCKFymD.js","assets/trone-o7Jj6nkF.css","assets/useAudiences-Dkkr2bf1.js","assets/useClotureDuJour-G6dpE0y9.js","assets/visios-yhbAwqyY.js","assets/Vitrine-BWilTqQJ.css","assets/Vitrine-jlKb4fpv.js","assets/_admin-DJEcrupx.js","assets/_contrat-BCvmTqSS.js","assets/_reuni-B7R9gg_e.js","assets/_shared-CuoUzi-i.js","assets/_signature-CC7b_UC5.js","assets/_ui-BrUDlmuM.css","assets/_ui-CKrO9hmr.js"];
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
