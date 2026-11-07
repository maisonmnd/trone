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
const BUILD = "20261107111351";
const A_GARDER = ["./","assets/abonnements-Cf0quUd5.js","assets/Abonnements-CVTMqqXV.js","assets/Abonnements-DTY7p2DH.css","assets/Academie-BdJJTxKM.js","assets/Acces-BWCTQqwV.js","assets/afaire-BlmE5T7X.js","assets/AFaire-x2AMk1rZ.js","assets/Agents-CnamIRyb.js","assets/agents-donnees-BdNCwEf4.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-C-d914Cm.js","assets/Appels-dgChreOb.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/Assistants-D9i2Xwmg.css","assets/Assistants-qwifDs6O.js","assets/AtelierDesContenus-C5H_gKko.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/Audience-D7hC7Iap.js","assets/Aujourdhui-fIASI5TF.js","assets/avant-le-fauteuil-lecture-C-Hx--VI.js","assets/AvantLeFauteuil-Hn_02AFj.js","assets/avis-fiches-DT63wWIc.js","assets/AvisGoogle-D8NMpnyJ.js","assets/AvisGoogle-DaPXfwX9.css","assets/BadgeEssai-2ZoKyveZ.js","assets/bilan-B-bfPYR0.css","assets/bilan-TWm--7ie.js","assets/BilanMensuel-D1NW_ebj.js","assets/Branches-fHmYZK_c.js","assets/bridges-NBOToBs0.js","assets/caisse-du-soir-C6vPx-E_.css","assets/caisse-du-soir-ZRLR0LMh.js","assets/Caisse-Kjzt9rwE.js","assets/Caisses-D8Vz8NcG.js","assets/Calendrier-DXbv-uk4.js","assets/campagnes-pur-SQ8XF8Ct.js","assets/Carnet-Dp2y53e9.js","assets/carte-BNC_S4PF.js","assets/carte-_W_-xBPj.css","assets/CarteModal-eLnHhW01.js","assets/CartesCadeaux-BBYLV9ho.js","assets/Catalogue-ChTPmelt.js","assets/CentreDeCommande-CeM-ffSE.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-DEivOiZ3.js","assets/certificat-DyX1sAOW.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-CY0ca_QV.js","assets/chiffre-du-jour-pur-BT2ZYsx7.js","assets/ChiffreDesPrestations-DVBRoxAK.js","assets/client-D2JgHpQ5.js","assets/cloture-du-jour-ClJs8Vdb.js","assets/ClotureDuTiroir-B-Vz_QBl.js","assets/Coffre-Dj5Ifa6d.js","assets/components-Csy50_6a.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-CA7Bu_uT.js","assets/Comptes-Bw4f0SOz.js","assets/consultation-CnxAxmo3.js","assets/consultation-CRW6QcWf.css","assets/Consultations-Dikk5X5f.js","assets/consultNotes-VlkvbyOt.js","assets/Conversations-D4WwB5Zo.css","assets/Conversations-DmB3b1t2.js","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-COGwWgqa.js","assets/currency-qfIhGmrs.js","assets/Customers-DPzdWby3.js","assets/Dashboard-B2x7VsE_.css","assets/Dashboard-BfuFEi6f.js","assets/dates-Cm1YKxuK.js","assets/Demandes-yzrkmq_B.js","assets/DepenseEnUnePhrase-BIGRlGqP.css","assets/DepenseEnUnePhrase-CI1CNOgv.js","assets/Depenses-CouPrVOg.js","assets/depenses-saisie-D23XQ6j4.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-Dq_IQpXs.js","assets/diagnostics-au-trone-8yA_OuxE.js","assets/Dictee-BY2j9I1k.js","assets/Dictee-D2P9yM7v.css","assets/dictee-pur-IRWjvRWn.js","assets/Discussions-BfRLnrJv.js","assets/EditeurDesOffres-DZtaMJ2n.js","assets/Encaissements-uWMGriIH.js","assets/enfants-B_qELz4Q.js","assets/Engagements-Cj5S9MhG.css","assets/engagements-coffre-Bc6WyIJN.js","assets/Engagements-DFG-AfLE.js","assets/EntreDeuxSeances-DIra-Ocn.js","assets/Evaluation-Bjy2gjDR.js","assets/Factures-3XmWgszo.js","assets/FenetreDesCivilites-MTSX7tZe.js","assets/FenetreDesCivilites-zfNk1aak.css","assets/FenetreDuPoint-DAU1msa9.js","assets/Fil-DOd2jCkw.js","assets/finances-BMFnlkRx.css","assets/fon-DEgKBE9h.js","assets/Fournisseurs-DnrC6JBR.js","assets/fournisseurs-elfiCqJS.js","assets/foyer-UBpZ0SdH.js","assets/Gerard-Cgj-zsJh.css","assets/Gerard-DhP3O7eD.js","assets/gerard-donnees-BAZ4T9rk.js","assets/gestes-conversation-Cxv9HONk.js","assets/HomeRituals-BbLCDs35.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-C8Ey58e8.js","assets/ia-centre-BINhm57b.js","assets/ia-diagnostic-pur-BBLrGY5l.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-tableau-pur-CSRjGtTf.js","assets/identite-BGigBe_5.js","assets/index-DSGf5L_k.js","assets/index.es-BSIJ3AEa.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-DG6O4Cch.js","assets/jspdf.es.min-D4Dkkpxd.js","assets/JustePrix-BDF133Fv.js","assets/kkiapay-BUdSCIli.js","assets/kkiapay-widget-DnUhUNd4.js","assets/Laboratoire-CwAwZECw.js","assets/LaJournee-B26q-J-K.js","assets/LaJournee-Bn_G0HCt.css","assets/LesPaiements-02SDijtP.js","assets/LesPaiements-BvdfOCbQ.css","assets/LettresAuDossier-yKv2L0TM.js","assets/LienMndPay-DMNjGak_.js","assets/Marketing-CaJmj-I0.js","assets/MarketingBranche-DJhWQJ5h.js","assets/Marque-CzvI3BYd.js","assets/MesPourboires-D9I_9rZf.css","assets/MesPourboires-VdbbTeFz.js","assets/MesTaches-Cc4XUDf6.css","assets/MesTaches-CUvl9W7a.js","assets/momo-C2ZVfV9J.js","assets/MonMois-CfEZiQ-d.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-DbZvM3eH.js","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/opale-7RH8U3wm.js","assets/oreille-B1AMUmZh.js","assets/paie-du-5-C260Yu4s.js","assets/paie-du-5-DeJq-K_U.css","assets/paie-du-5-pur-CiNhRDAZ.js","assets/PaieParMtn-CUr3sL8k.js","assets/paliers-MP2yopCb.js","assets/Parametres-D3s8wVYx.js","assets/parcours-Dl7eeD1p.js","assets/Parrainages-DQkho1V_.js","assets/Parrainages-gAHAPB_6.css","assets/PassageAvantLeFauteuil-D16C1tIe.js","assets/pdf-Dwg4iFsr.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/Personas-wj_OsMV9.js","assets/Personnel-lraYQ71S.js","assets/photo-BSkpg8X1.js","assets/pilotage-D8kf1Co8.css","assets/Pourboires-B4LNumij.js","assets/Predictions-DzjnezW8.js","assets/Prestataires-BV43U7O7.js","assets/Prets-Bg1BeRs3.js","assets/PrevisionDuMois-DlFTw3OX.css","assets/PrevisionDuMois-Dr7CpYgJ.js","assets/Previsions-BhtjvH7b.js","assets/previsions-pur-C2_kodJ-.js","assets/Previsions-r4v19Anp.css","assets/processus-pur-R6U5QcCi.js","assets/Projets-BRw_O85o.js","assets/projets-COIj014y.js","assets/Projets-COO7WDEE.css","assets/projets-pur-2ZEMRNDU.js","assets/protocoles-CjspUF1E.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-yIiU33Mu.js","assets/qualification-D0n5w8RJ.js","assets/quiz-5qMPWZVi.js","assets/Rapport-CF5FjzwM.js","assets/Recommandations-Sd8uyfQI.js","assets/regler-C5hcM02_.css","assets/regler-CEsd8kB3.js","assets/regler-la-seance-serveur-Bs6rzqZX.js","assets/relances-pur-lwRTXc5E.js","assets/releve-des-avis-CpctnFmO.js","assets/SalonFoyer-AyWV4rQV.js","assets/secretariat-admin-CLRuFnmp.js","assets/Secretariat-Cy79Zw30.css","assets/Secretariat-D_cOdbqn.js","assets/Signatures-B3IDs1If.js","assets/SignerUnPdf-DXIYdO7Q.js","assets/Synthese-BazB7iQ0.js","assets/SyntheseGraphes-CedjwRew.js","assets/systeme-TPy-pF7j.css","assets/Tableau-Ca9j4K3k.js","assets/temps-wKVxiQpt.js","assets/Textes-0pevjNSD.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-Bqg2aK7J.js","assets/tiroirs-CkDzpGy0.css","assets/trone-CQ2DUl_d.css","assets/trone-Dr41qSHK.js","assets/useAudiences-BQrWKw9s.js","assets/useClotureDuJour-Dm7Rj5Ct.js","assets/Vitrine-BWilTqQJ.css","assets/Vitrine-r5-3-yHc.js","assets/_admin-DeeDuH_K.js","assets/_contrat-CwgclrXg.js","assets/_heures-DWSytUMz.js","assets/_reuni-D1pVTmgN.js","assets/_shared-CSRoF3N-.js","assets/_signature-DzRa9Vex.js","assets/_ui-BrUDlmuM.css","assets/_ui-Qm-Bh3v-.js"];
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
