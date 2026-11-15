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
const BUILD = "20261115002909";
const A_GARDER = ["./","assets/Abonnements-B7L7auzS.js","assets/abonnements-C-zPXLql.js","assets/Abonnements-DTY7p2DH.css","assets/Academie-CZKIh9zC.js","assets/Acces-DXKZJzzc.js","assets/afaire-Dh6u70Fi.js","assets/AFaire-yQwfCX0y.js","assets/Agents-CIxMN1ju.js","assets/agents-donnees-D_Tq9qPz.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-Llu67w_N.js","assets/Appels-CHWrpXuE.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/Assistants-CRrsuUgP.js","assets/Assistants-D9i2Xwmg.css","assets/AtelierDesContenus-D3-p6F2A.css","assets/AtelierDesContenus-Dqtq2P0V.js","assets/Audience-6vCp5tqy.js","assets/Aujourdhui-DfKBAQbc.js","assets/avant-le-fauteuil-lecture-CLyj3Gs9.js","assets/AvantLeFauteuil-LwBNI7Qp.js","assets/avis-fiches-BzvKUdla.js","assets/AvisGoogle-BMcRiBni.js","assets/AvisGoogle-DaPXfwX9.css","assets/BadgeEssai-DrXCwaD8.js","assets/BadgeSuggere-BkcbyZbz.js","assets/besoins-DjQ_q9ab.js","assets/BesoinsEtRegles-C9oEi92_.js","assets/BesoinsEtRegles-CzntMbJE.css","assets/bilan-B-bfPYR0.css","assets/bilan-FZF3Ruvh.js","assets/BilanMensuel-BYhi5356.js","assets/Branches-CNI-aJe0.js","assets/bridges-66Ho8wp6.js","assets/caisse-du-soir-C6vPx-E_.css","assets/caisse-du-soir-fXVvSbmf.js","assets/Caisse-sme2vwHl.js","assets/Caisses-Dk_I7r54.js","assets/Calendrier-BtBEoiGL.js","assets/campagnes-pur-Bcval6cy.js","assets/Carnet-Cmw6fs1q.js","assets/carte-BHWAsPDX.js","assets/carte-_W_-xBPj.css","assets/CarteModal-wx2Ci2Za.js","assets/CartesCadeaux-Bwh69Igm.js","assets/Catalogue-DQWoZDk-.js","assets/CentreDeCommande-Du8kyJhp.css","assets/CentreDeCommande-kYvNjftu.js","assets/Cercle-BE1X4tgV.js","assets/certificat-RwcWxvRV.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-D-HLAlnT.js","assets/chiffre-du-jour-pur-gL4jxmd5.js","assets/ChiffreDesPrestations-CZcVlzww.js","assets/client-jgDePlVX.js","assets/cloture-du-jour-CS2I0Mx4.js","assets/ClotureDuTiroir-DLDgs8bA.js","assets/Coffre-viAuP8n9.js","assets/collecte-mtn-pur-D9rF7FS0.js","assets/components-BHKzfcC2.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-CHkhtjGh.js","assets/Comptes-DJ1k4QuB.js","assets/consultation-CRW6QcWf.css","assets/consultation-D3sedcwY.js","assets/Consultations-CNp6Y99w.js","assets/Consultations-DiE-2_mG.css","assets/consultNotes-rKeNxfYF.js","assets/Conversations-C4DrmqBR.js","assets/Conversations-D4WwB5Zo.css","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-CQ-Au1Vr.js","assets/currency-qfIhGmrs.js","assets/Customers-0kCLNY4V.js","assets/Dashboard-B2x7VsE_.css","assets/Dashboard-DgZOeOgp.js","assets/dates-Dw86Qc91.js","assets/Demandes-CywM0HCc.js","assets/DepenseEnUnePhrase-BIGRlGqP.css","assets/DepenseEnUnePhrase-VS7xi56k.js","assets/Depenses-BWgknLb4.js","assets/depenses-saisie-CXdYoCx2.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-BjoWYkpt.js","assets/diagnostics-au-trone-CM-vrd3p.js","assets/Dictee-BIQFbKhA.css","assets/Dictee-DHE28WKI.js","assets/dictee-pur-CAjEo6uk.js","assets/Discussions-Bwl_BSgp.js","assets/EditeurDesOffres-5XwgF-Kr.js","assets/Encaissements-CnTUqFcY.js","assets/enfants-DJAwV-sK.js","assets/Engagements-Cj5S9MhG.css","assets/engagements-coffre-C7bAGlUy.js","assets/Engagements-DVi9ZLc1.js","assets/EntreDeuxSeances-C3ij9fuG.js","assets/Evaluation-DYuTglCM.js","assets/facture-u5ahXaZZ.js","assets/Factures-CKJqWDCb.js","assets/FenetreDesCivilites-B5o6HwZ_.js","assets/FenetreDesCivilites-zfNk1aak.css","assets/FenetreDuPoint-DJQrYbnA.js","assets/Fil-DHq4u5ZM.js","assets/finances-C8x7Mn4-.css","assets/fon-B1YDcfaW.js","assets/fournisseurs-00kPyVB5.js","assets/Fournisseurs-B5K-K48Q.js","assets/foyer-BU7BMlgr.js","assets/Gerard-Cgj-zsJh.css","assets/Gerard-DKoHeei1.js","assets/gerard-donnees-CccJzwND.js","assets/gestes-conversation-ClzMxRhO.js","assets/heures-des-rappels-pur-BWJPB8OP.js","assets/HomeRituals-Bz2pJ7IZ.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-CqqPsmaQ.js","assets/ia-centre-DcSjZDTy.js","assets/ia-diagnostic-pur-BNtkwfR3.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-tableau-pur-p6UvREJe.js","assets/identite-jOo4cNxS.js","assets/index-BgvmOhx6.js","assets/index.es-BUsfaAD7.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-X_AG6yhl.js","assets/jspdf.es.min-D4YUieBl.js","assets/JustePrix-XjZlaNoP.js","assets/kkiapay-DwLAkC2L.js","assets/kkiapay-widget-CVmsl9OE.js","assets/Laboratoire-Ck5K9RGU.js","assets/LaJournee-Bn_G0HCt.css","assets/LaJournee-ljlt9GsX.js","assets/le-caissier-pur-BYqNtSyn.js","assets/LesPaiements-C9cEZlne.css","assets/LesPaiements-DOE09LxO.js","assets/LettresAuDossier-De-QSZF9.js","assets/LienMndPay-DtWNEHGE.js","assets/Marketing-Fk3Hi45G.js","assets/MarketingBranche-DZJlK390.js","assets/Marque-DeHybM4A.js","assets/MesPourboires-bic9_Zf7.js","assets/MesPourboires-CENjelyb.css","assets/MesTaches-Cc4XUDf6.css","assets/MesTaches-D6Jpp4mC.js","assets/momo-C2ZVfV9J.js","assets/MonMois-CGHC3bCX.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/MtnMoMo-B76B78uN.js","assets/objectifs-CDUg_954.js","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/opale-CFyWNqrU.js","assets/oreille-B1AMUmZh.js","assets/paie-du-5-CJj0yCET.js","assets/paie-du-5-DeJq-K_U.css","assets/paie-du-5-pur-CPiCK8fv.js","assets/paie-par-mtn-bA7XHFAD.js","assets/PaieParMtn-Bb_L7sIt.js","assets/paliers-DE5sNdbF.js","assets/Parametres-nFOG4oKM.js","assets/parcours-BZ4zEBXX.js","assets/Parrainages-BRNPDcYl.js","assets/Parrainages-gAHAPB_6.css","assets/PassageAvantLeFauteuil-nVkLvL2c.js","assets/pdf-CCt4PWMJ.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/periode-des-pourboires-pur-BUWqfwov.js","assets/Personas-MiZN6ksu.js","assets/Personnel-C5Mjn8rJ.js","assets/photo-Cea6A60U.js","assets/pilotage-D8kf1Co8.css","assets/Pourboires-BCYiE9FY.js","assets/Predictions-x1q7u5M4.js","assets/Prestataires-CpbFJzKT.js","assets/Prets-CnWcV_hy.js","assets/PrevisionDuMois-D0fvM96l.js","assets/PrevisionDuMois-DlFTw3OX.css","assets/Previsions-9BU2Vg1T.css","assets/Previsions-D1mBq-Hm.js","assets/previsions-pur-BBzFkwdq.js","assets/processus-pur-R6U5QcCi.js","assets/projets-CnOp-POv.js","assets/Projets-COO7WDEE.css","assets/projets-pur-2ZEMRNDU.js","assets/Projets-RxSU3BwP.js","assets/protocoles-BysdKMAa.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-fQxPl86s.js","assets/qualification-BMmhRCms.js","assets/quiz-5qMPWZVi.js","assets/Rapport-C6mTDpN2.js","assets/Recommandations-B_W7My09.js","assets/regler-BF-tKVgU.js","assets/regler-DHR_B1Dm.css","assets/regler-par-fedapay-pur-CFL4EbBx.js","assets/relances-pur-BacTXlI2.js","assets/releve-des-avis-DurmzJzK.js","assets/SalonFoyer-CY_ebStA.js","assets/secretariat-admin-CJ3M0TWp.js","assets/Secretariat-BdaNBeK6.js","assets/Secretariat-Cy79Zw30.css","assets/Signatures-BYwM1Op4.js","assets/SignerUnPdf-CZGxuiX-.js","assets/Synthese-Bho3L-nE.js","assets/SyntheseGraphes-CgB5Hocp.js","assets/systeme-TPy-pF7j.css","assets/Tableau-DdaKQ3rV.js","assets/temps-hIETTXiu.js","assets/Textes-CPRtFv_X.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-CkDzpGy0.css","assets/tiroirs-L35z83Oz.js","assets/trone-BhM_sxJT.js","assets/trone-DxtNUYxb.css","assets/useAudiences-CNwFE-83.js","assets/useClotureDuJour-Dl0KrDs5.js","assets/visios-BZVBQsx3.js","assets/Vitrine-BWilTqQJ.css","assets/Vitrine-B_cpi6gj.js","assets/_admin-kTtgtJ9Q.js","assets/_contrat-GDCopULj.js","assets/_reuni-BXULJWiv.js","assets/_shared-DgbNR1kF.js","assets/_signature-Djkh64Y8.js","assets/_ui-BrUDlmuM.css","assets/_ui-C9kqfkt0.js"];
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
