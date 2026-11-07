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
const BUILD = "20261107132133";
const A_GARDER = ["./","assets/Abonnements-BOVpvrlH.js","assets/abonnements-DeobOIfF.js","assets/Abonnements-DTY7p2DH.css","assets/Academie-B08LKdax.js","assets/Acces-B1Hm-xTd.js","assets/afaire-BgNk2Jtc.js","assets/AFaire-PkqnVmkx.js","assets/Agents-DJIcBVtJ.js","assets/agents-donnees-Btsmq6xh.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-LAxIzjXG.js","assets/Appels-DdocP6hI.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/Assistants-ByonkeRc.js","assets/Assistants-D9i2Xwmg.css","assets/AtelierDesContenus-0X8wMhEb.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/Audience-DQVwF_6U.js","assets/Aujourdhui-BhX8zZzO.js","assets/avant-le-fauteuil-lecture-DiPDY1UU.js","assets/AvantLeFauteuil-Dn0x6--D.js","assets/avis-fiches-CEIRLup6.js","assets/AvisGoogle-C3r9-YzH.js","assets/AvisGoogle-DaPXfwX9.css","assets/BadgeEssai-DhOC-SWo.js","assets/bilan-B-bfPYR0.css","assets/bilan-BeoTGvWl.js","assets/BilanMensuel-CTbrjBs5.js","assets/Branches-CgkJv8Vp.js","assets/bridges-CyeXSdlj.js","assets/Caisse-D4fgDycP.js","assets/caisse-du-soir-BIywweR0.js","assets/caisse-du-soir-C6vPx-E_.css","assets/Caisses-CAh4sC0m.js","assets/Calendrier-C-Xqczaj.js","assets/campagnes-pur-eKABnNKl.js","assets/Carnet-Bizw9Kgs.js","assets/carte-B18D83g1.js","assets/carte-_W_-xBPj.css","assets/CarteModal-Cr7ik8I5.js","assets/CartesCadeaux-DWjeZ4tf.js","assets/Catalogue-PPWMsY-Q.js","assets/CentreDeCommande-C72KNL6H.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-DOczxi8N.js","assets/certificat--uDlmEnb.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-rZz0mmY_.js","assets/chiffre-du-jour-pur-CZocK8us.js","assets/ChiffreDesPrestations-BDgoTOiO.js","assets/client-CwphWZYK.js","assets/cloture-du-jour-B8TGY2Sn.js","assets/ClotureDuTiroir-Ndenq9Hf.js","assets/Coffre-CWsXYwnR.js","assets/components-DsZ4prMK.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-DJL_ezzf.js","assets/Comptes-BZMT_akH.js","assets/consultation-CRW6QcWf.css","assets/consultation-DPiPTxGh.js","assets/Consultations-B1s0eCJ_.js","assets/consultNotes-Cn3DBYkX.js","assets/Conversations-D4WwB5Zo.css","assets/Conversations-H-6Jb4n-.js","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-BI7cR-Uk.js","assets/currency-qfIhGmrs.js","assets/Customers-WASbkAIO.js","assets/Dashboard-B2x7VsE_.css","assets/Dashboard-c0Tt0s4j.js","assets/dates-CaKC-Tv4.js","assets/Demandes-B1ZT6T1-.js","assets/DepenseEnUnePhrase-BAbIs7pv.js","assets/DepenseEnUnePhrase-BIGRlGqP.css","assets/Depenses-hJFhBpgX.js","assets/depenses-saisie-BwguYC60.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-CAxmOFaw.js","assets/diagnostics-au-trone-BU7QRvoM.js","assets/Dictee-D2P9yM7v.css","assets/Dictee-DLY8Sgpp.js","assets/dictee-pur-BaUgcz5L.js","assets/Discussions-VRRrWReL.js","assets/EditeurDesOffres-DBAYgxrx.js","assets/Encaissements-xsN7o7Bb.js","assets/enfants-C-bmP1pa.js","assets/Engagements-Cj5S9MhG.css","assets/engagements-coffre-DIWknph3.js","assets/Engagements-DMKdC_X6.js","assets/EntreDeuxSeances-tyy7ky7Z.js","assets/Evaluation-BaPnO3MO.js","assets/Factures-CKhf_xhC.js","assets/FenetreDesCivilites-BPYn05bH.js","assets/FenetreDesCivilites-zfNk1aak.css","assets/FenetreDuPoint-YX2SpEA-.js","assets/Fil-CO_aBYsB.js","assets/finances-BMFnlkRx.css","assets/fon-AeEziY0M.js","assets/fournisseurs-DEZcpjtX.js","assets/Fournisseurs-DyZudmEM.js","assets/foyer-DtxsKesw.js","assets/Gerard-Cgj-zsJh.css","assets/gerard-donnees-B8wIfU3x.js","assets/Gerard-jNluH92x.js","assets/gestes-conversation-ABW0X6wF.js","assets/HomeRituals-CkcBK9bB.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-tyg7axtI.js","assets/ia-centre-CV2z2xGy.js","assets/ia-diagnostic-pur-BBLrGY5l.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-tableau-pur-CSRjGtTf.js","assets/identite-CQtPpXbf.js","assets/index-CKgoVGmn.js","assets/index.es-Bnu45YT1.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-CzOGThFR.js","assets/jspdf.es.min-D-0j1d9A.js","assets/JustePrix-BsaoJEi-.js","assets/kkiapay-Cw33prhp.js","assets/kkiapay-widget-DnUhUNd4.js","assets/Laboratoire-rqj8dLnh.js","assets/LaJournee-Bn_G0HCt.css","assets/LaJournee-cGdFgpye.js","assets/LesPaiements-BvdfOCbQ.css","assets/LesPaiements-CsyVWlTu.js","assets/LettresAuDossier-DMphZnag.js","assets/LienMndPay-Bf8JKTmG.js","assets/Marketing-CYSHfB6T.js","assets/MarketingBranche-ByeFYwCK.js","assets/Marque-D0cJCgMG.js","assets/MesPourboires-D9I_9rZf.css","assets/MesPourboires-Ft6LmnGK.js","assets/MesTaches-BQu5TX2d.js","assets/MesTaches-Cc4XUDf6.css","assets/momo-C2ZVfV9J.js","assets/MonMois-Dw-OfEN6.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-DAFLZLQr.js","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/opale-BM-N5vuO.js","assets/oreille-B1AMUmZh.js","assets/paie-du-5-DE1-GCAk.js","assets/paie-du-5-DeJq-K_U.css","assets/paie-du-5-pur-CudywTTC.js","assets/PaieParMtn-B8fW4TaK.js","assets/paliers-IOOdPK8L.js","assets/Parametres-CowCn3Mf.js","assets/parcours-CXbwypUX.js","assets/Parrainages-BL4C5ZVR.js","assets/Parrainages-gAHAPB_6.css","assets/PassageAvantLeFauteuil-BLkfz7Pl.js","assets/pdf-Cn5KcDgW.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/Personas-Cd3uHpAN.js","assets/Personnel-CqD6EixD.js","assets/photo-CFdwUETH.js","assets/pilotage-D8kf1Co8.css","assets/Pourboires-joBzNd8t.js","assets/Predictions-B73pm_m9.js","assets/Prestataires-B91WBnDg.js","assets/Prets-ByzhItsc.js","assets/PrevisionDuMois-CMN4FTUv.js","assets/PrevisionDuMois-DlFTw3OX.css","assets/Previsions-BBHFoHdO.js","assets/previsions-pur-DST7rWkz.js","assets/Previsions-r4v19Anp.css","assets/processus-pur-R6U5QcCi.js","assets/Projets-COO7WDEE.css","assets/projets-D2WIH97P.js","assets/Projets-DS1JgQHx.js","assets/projets-pur-2ZEMRNDU.js","assets/protocoles-l_UXHUd4.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-DPZrq6hP.js","assets/qualification-hOT3RshJ.js","assets/quiz-5qMPWZVi.js","assets/Rapport-CDLY6Tje.js","assets/Recommandations-CXYQcpXN.js","assets/regler-C5hcM02_.css","assets/regler-la-seance-serveur-Bs6rzqZX.js","assets/regler-lf5Sbksd.js","assets/relances-pur-lwRTXc5E.js","assets/releve-des-avis-rttoD4uU.js","assets/SalonFoyer-I7oXsc7k.js","assets/secretariat-admin-eC77l_63.js","assets/Secretariat-Cy79Zw30.css","assets/Secretariat-nZG_puxM.js","assets/Signatures-lwEZwRl0.js","assets/SignerUnPdf-DhTYQojH.js","assets/Synthese-Cbn0PfGl.js","assets/SyntheseGraphes-BMYmBCNI.js","assets/systeme-TPy-pF7j.css","assets/Tableau-7A3xpWQ3.js","assets/temps-DNeqWnJx.js","assets/Textes-CqfnMod3.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-CkDzpGy0.css","assets/tiroirs-f8tz0kGN.js","assets/trone-CDLVdYgt.js","assets/trone-CQ2DUl_d.css","assets/useAudiences-Dw6KXHNn.js","assets/useClotureDuJour-BQepDRAu.js","assets/Vitrine-BWilTqQJ.css","assets/Vitrine-C-STz9pm.js","assets/_admin-BFWUDW1k.js","assets/_contrat-NJ_lEkju.js","assets/_heures-X4hmiGd2.js","assets/_reuni-jI910RPA.js","assets/_shared-TlupHE3Q.js","assets/_signature-DoLVo75g.js","assets/_ui-BrUDlmuM.css","assets/_ui-D7Vr8Sjw.js"];
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
