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
const BUILD = "20261118035002";
const A_GARDER = ["./","assets/abonnements-BMCtmzRk.js","assets/Abonnements-CYE_Myhd.js","assets/Abonnements-DTY7p2DH.css","assets/Academie-CCgb9FGq.js","assets/Acces-C1zgz5Ac.js","assets/afaire-CWUN-JVl.js","assets/AFaire-QE2oEcXL.js","assets/agents-donnees-LbVctmeI.js","assets/Agents-iy9bXauy.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-BNtAy2Rz.js","assets/App-B7G3OG9K.js","assets/Appels-Bm7i6Ho2.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/Assistants-BO53HKP9.js","assets/Assistants-D9i2Xwmg.css","assets/AtelierDesContenus-D3-p6F2A.css","assets/AtelierDesContenus-DfqHotA3.js","assets/Audience-CyIoptVY.js","assets/Aujourdhui-BoqespS0.js","assets/auth-yVoXB-hs.js","assets/avant-le-fauteuil-lecture-eI62MsjW.js","assets/AvantLeFauteuil-D7F5MaYN.js","assets/avis-fiches-DHgU0ScV.js","assets/AvisGoogle-CedYYn8g.js","assets/AvisGoogle-DaPXfwX9.css","assets/BadgeEssai-C_134WvJ.js","assets/BadgeSuggere-Cxaw1m9U.js","assets/besoins-tMR8jbji.js","assets/BesoinsEtRegles-BLwxGVV5.css","assets/BesoinsEtRegles-ZDcICqVY.js","assets/bilan-B-bfPYR0.css","assets/bilan-BkdVvmAn.js","assets/BilanMensuel-7_LHpEXs.js","assets/Branches-B-pmd4WN.js","assets/bridges-CPMDHlwT.js","assets/Caisse-CeTdMk0P.js","assets/caisse-du-soir-C6vPx-E_.css","assets/caisse-du-soir-D9vGtTE6.js","assets/Caisses-BF0whKUW.js","assets/Calendrier-CjC5uEQE.js","assets/campagnes-pur-Dsbqhd5D.js","assets/Carnet-DJebj3k7.js","assets/carte-CzZX-g-0.js","assets/carte-_W_-xBPj.css","assets/CarteModal-edm0HJr3.js","assets/CartesCadeaux-6UtgBvoP.js","assets/Catalogue-IkDVlYhE.js","assets/CentreDeCommande-Du8kyJhp.css","assets/CentreDeCommande-IevWXsUL.js","assets/Cercle-C1KKCVPe.js","assets/certificat-vSyUq_UT.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-Cz6uO8eq.js","assets/chiffre-du-jour-pur-CoikfrZt.js","assets/ChiffreDesPrestations-ojaVApnT.js","assets/client-oxgVlgHH.js","assets/cloture-du-jour-RCLTE1Kh.js","assets/ClotureDuTiroir-BI6PgQUO.js","assets/Coffre-CrAFtQOs.js","assets/collecte-mtn-pur-Bq3uWgWT.js","assets/components-BhCl-M26.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-DJ1WEQN4.js","assets/Comptes-RRrfzmsh.js","assets/consultation-C38_AY0t.js","assets/consultation-CRW6QcWf.css","assets/Consultations-DiE-2_mG.css","assets/Consultations-F3OFEh-3.js","assets/consultNotes-DM92R5XX.js","assets/Conversations-BG5V_OVM.js","assets/Conversations-D4WwB5Zo.css","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-DTlpdG3b.js","assets/currency-Cd0clE4P.js","assets/Customers-DLcveSnB.js","assets/Dashboard-B2x7VsE_.css","assets/Dashboard-z6GqmO-m.js","assets/dates-CU19ByMI.js","assets/Demandes-Dw3D4g3K.js","assets/DepenseEnUnePhrase-BIGRlGqP.css","assets/DepenseEnUnePhrase-De0h-8KS.js","assets/depenses-saisie-4OeF053p.js","assets/Depenses-xAo10mWT.js","assets/devis-remis--Qu1mGoK.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-DfgiunUc.js","assets/diagnostics-au-trone-CEEfF7HY.js","assets/Dictee-C-pUYYFA.css","assets/Dictee-ChynCZVu.js","assets/dictee-pur-DJSKV9rr.js","assets/Discussions-CtFvV_2E.js","assets/echappe-html-pur-gEhHOM07.js","assets/EditeurDesOffres-C6qpzVJw.js","assets/Encaissements-Bw3_5sS6.js","assets/enfants-DoZ-qSrJ.js","assets/Engagements-BeJcmrhz.js","assets/Engagements-Cj5S9MhG.css","assets/engagements-coffre-BwjN-ljc.js","assets/EntreDeuxSeances-DYVeubJR.js","assets/es-B0e5TO_V.js","assets/Evaluation-8SUgj4cp.js","assets/facture-tFY6UMr_.js","assets/Factures-DQ5BHsee.js","assets/FenetreDeLAgent-DxPXSvG7.js","assets/FenetreDesCivilites-cj_skljb.js","assets/FenetreDesCivilites-zfNk1aak.css","assets/FenetreDuPoint-BUNooXoW.js","assets/Fil-xv7JWLqb.js","assets/finances-C8x7Mn4-.css","assets/fon-Dj5KpsIT.js","assets/fournisseurs-BihfKfO0.js","assets/Fournisseurs-DIF2xtOM.js","assets/foyer-CGIVU1xP.js","assets/Gerard-BZ_zKyfs.js","assets/Gerard-Cgj-zsJh.css","assets/gerard-donnees-DFpEMD9s.js","assets/gestes-conversation-JsONDuSG.js","assets/heures-des-rappels-pur-BWJPB8OP.js","assets/HomeRituals-DXFtDShk.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-DkiJfX5j.js","assets/ia-centre-DA4AUVpr.js","assets/ia-diagnostic-pur-qGnFEvys.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-tableau-pur-p6UvREJe.js","assets/identite-DFMqxKaF.js","assets/index.es-DCmZXkcN.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-CKFpUPz0.js","assets/jspdf.es.min-CC8IPHsh.js","assets/JustePrix-BCxtCwKP.js","assets/kkiapay-qD0ryJA_.js","assets/kkiapay-widget-CVmsl9OE.js","assets/Laboratoire-D5mxwKYb.js","assets/LaJournee-Bn_G0HCt.css","assets/LaJournee-C6nV-yWn.js","assets/le-caissier-pur-Bnj6qxHT.js","assets/LesPaiements-C9cEZlne.css","assets/LesPaiements-DC84nk0W.js","assets/LettresAuDossier-BUZckJAC.js","assets/LienMndPay-nsPcet1J.js","assets/Marketing-CapYLSdz.js","assets/MarketingBranche-CiKyqeRi.js","assets/Marque-DzvJTtbh.js","assets/MesPourboires-CENjelyb.css","assets/MesPourboires-Dmooc7zS.js","assets/MesTaches-Cc4XUDf6.css","assets/MesTaches-DWRdsf6M.js","assets/momo-C2ZVfV9J.js","assets/MonMois-CZLy5-wv.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/MtnMoMo-CufwF7y0.js","assets/objectifs-D92ZrFIZ.js","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/opale-a9X9223A.js","assets/oreille-B1AMUmZh.js","assets/paie-du-5-DeJq-K_U.css","assets/paie-du-5-pur-CPiCK8fv.js","assets/paie-du-5-RHfM28mS.js","assets/paie-par-mtn-_dHMY8S8.js","assets/PaieParMtn-B0AjzHlv.js","assets/paliers-QTAAB6gh.js","assets/Parametres-CCRTy3PU.js","assets/parcours-BS6JYv1F.js","assets/Parrainages-CabWBMmu.js","assets/Parrainages-gAHAPB_6.css","assets/PassageAvantLeFauteuil-DN1jvmbK.js","assets/pdf-B3aJatgN.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/periode-des-pourboires-pur-BUWqfwov.js","assets/Personas-DeoDqFfj.js","assets/Personnel-CNdQhUkk.js","assets/photo-CpXxJ7b4.js","assets/pilotage-D8kf1Co8.css","assets/porte-de-l-equipe-URFxO5hn.js","assets/Pourboires-D0JJWrF3.js","assets/Predictions-CSyh3upr.js","assets/preload-helper-BRe_O-Rg.js","assets/Prestataires-TNCcPCbD.js","assets/Prets-DuBjxrlX.js","assets/PrevisionDuMois-BeauevDk.js","assets/PrevisionDuMois-DlFTw3OX.css","assets/Previsions-9BU2Vg1T.css","assets/Previsions-CN-06w5I.js","assets/previsions-pur-KLfR9dG7.js","assets/processus-pur-R6U5QcCi.js","assets/Projets-BjDbRIhK.js","assets/projets-BlZchcXN.js","assets/Projets-COO7WDEE.css","assets/projets-pur-2ZEMRNDU.js","assets/protocoles-CGQQ4GoR.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-DX-jb8FP.js","assets/quiz-5qMPWZVi.js","assets/Rapport-Dtsr4S-_.js","assets/Recommandations-CWkHPO06.js","assets/regler-CyqS8Kya.js","assets/regler-DHR_B1Dm.css","assets/regler-par-fedapay-pur-G8CEJdGn.js","assets/relances-pur-BacTXlI2.js","assets/releve-des-avis-gXRTQ7wf.js","assets/SalonFoyer-vIhbi1MF.js","assets/secretariat-admin-DHgmnrzq.js","assets/Secretariat-B-m4BCp9.js","assets/Secretariat-Cy79Zw30.css","assets/Signatures-Jp_XolT4.js","assets/SignerUnPdf-USDgLSsz.js","assets/Synthese-8Sc5NI71.js","assets/SyntheseGraphes-BEMhwPaG.js","assets/systeme-TPy-pF7j.css","assets/Tableau-CCY2QhKc.js","assets/temps-CPvw0EzG.js","assets/Textes-BATtriRX.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-Cir04sc1.js","assets/tiroirs-CkDzpGy0.css","assets/trone-B7Y1AH-z.js","assets/trone-DO_K_gMP.css","assets/useAudiences-06efHC2S.js","assets/useClotureDuJour-CmXrz4Bi.js","assets/visios-DRU6wSpy.js","assets/Vitrine-BWilTqQJ.css","assets/Vitrine-CGEX1nkc.js","assets/_admin-DsUndup_.js","assets/_contrat-B1r2eCAg.js","assets/_reuni-DQ11cA78.js","assets/_shared-XVPfTbs7.js","assets/_signature-oBWSffcO.js","assets/_ui-BrUDlmuM.css","assets/_ui-DE92YiRE.js"];
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
