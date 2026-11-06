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
const BUILD = "20261106001245";
const A_GARDER = ["./","assets/abonnements-BmuNBbF9.js","assets/Abonnements-DOz4Hom-.js","assets/Academie-T3aH_ZhE.js","assets/Acces-BF4G3XDm.js","assets/AFaire-az9A2BX5.js","assets/afaire-CdB6zYJS.js","assets/Agents-C1lqdvqI.js","assets/agents-donnees-ZMx5CLxJ.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-28NgEWV2.js","assets/Appels-jBqfvl-A.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/Assistants-D9i2Xwmg.css","assets/Assistants-DRYIb1eG.js","assets/AtelierDesContenus-CMEU3rKs.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/Audience-CMx-Hoby.js","assets/Aujourdhui-SSxaXiFI.js","assets/avant-le-fauteuil-lecture-D9v8lfB3.js","assets/AvantLeFauteuil-UfvwMzZF.js","assets/avis-fiches-DeKimAH7.js","assets/AvisGoogle-CsEJsynx.js","assets/AvisGoogle-DaPXfwX9.css","assets/bilan-B-bfPYR0.css","assets/bilan-D1sQz_-Z.js","assets/BilanMensuel-GaNHtkki.js","assets/Branches-lrs-GhtP.js","assets/bridges-CXPTrCW_.js","assets/Caisse-Dtl2jJJz.js","assets/caisse-du-soir-C6vPx-E_.css","assets/caisse-du-soir-fVGy3wt5.js","assets/Caisses-BAzUaG59.js","assets/Calendrier-B5eKE5SX.js","assets/campagnes-pur-Cj028g34.js","assets/Carnet-Bhf31zHc.js","assets/carte-ai00eJAc.js","assets/carte-_W_-xBPj.css","assets/CarteModal-C8tE58Xf.js","assets/CartesCadeaux-Bq1X7_VW.js","assets/Catalogue-B3DLbadw.js","assets/CentreDeCommande-ByF-fOG0.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-BhOJD1N9.js","assets/certificat-BGTxtokX.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-DyOHpw8B.js","assets/chiffre-du-jour-pur-C-bkGgD9.js","assets/ChiffreDesPrestations-ChGP_MFb.js","assets/client-CQ2xTzXX.js","assets/cloture-du-jour-BURHo0NG.js","assets/ClotureDuTiroir-DdUSlJv9.js","assets/Coffre-DygVg458.js","assets/components-BBvJlfV2.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-Ci1hO8uF.js","assets/Comptes-CgjlLQq8.js","assets/consultation-CpdNhXHt.js","assets/consultation-CRW6QcWf.css","assets/Consultations-DrSubHJc.js","assets/consultNotes-jQ-tYnxD.js","assets/Conversations-D4WwB5Zo.css","assets/Conversations-DlGmizhz.js","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-B0GeLjti.js","assets/currency-qfIhGmrs.js","assets/Customers-BxKA_IW-.js","assets/Dashboard-B2x7VsE_.css","assets/Dashboard-De_Itndz.js","assets/dates-B5C5KOXa.js","assets/Demandes-Cs41HNlk.js","assets/DepenseEnUnePhrase-BIGRlGqP.css","assets/DepenseEnUnePhrase-BleM3d56.js","assets/Depenses-CTUSg9bS.js","assets/depenses-saisie-D08HO9VE.js","assets/dernier-message-pur-CBYWnq8m.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-ELObI4qP.js","assets/diagnostics-au-trone-Bvrf2XtO.js","assets/Dictee-D2P9yM7v.css","assets/Dictee-Dani8ABn.js","assets/dictee-pur-ZrfHpEo1.js","assets/Discussions-DfEwiKgt.js","assets/EditeurDesOffres-CTY7p0VD.js","assets/Encaissements-CUck---L.js","assets/enfants-C19kK4W4.js","assets/Engagements-Cj5S9MhG.css","assets/Engagements-DZnna6on.js","assets/EntreDeuxSeances-BFyHB1zU.js","assets/Evaluation-ByOK-Xue.js","assets/Factures-DKKmNLf8.js","assets/FenetreDesCivilites-C7-jYhqx.js","assets/FenetreDesCivilites-zfNk1aak.css","assets/FenetreDuPoint-Ch7Ir-kU.js","assets/Fil-CdnG3mtn.js","assets/finances-BMFnlkRx.css","assets/fon-CNnEGbhq.js","assets/Fournisseurs-Bn5VBJZs.js","assets/fournisseurs-E3RRBYFT.js","assets/foyer-sihPlnDT.js","assets/Gerard-BMZ7VSgA.js","assets/Gerard-CP3QOjfk.css","assets/gerard-donnees-CS36UCWq.js","assets/gestes-conversation-DW-g4uSj.js","assets/HomeRituals-CEWtUx4d.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-DvmxaDNN.js","assets/ia-centre-C_cUb5Zx.js","assets/ia-diagnostic-pur-BBLrGY5l.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-tableau-pur-CSRjGtTf.js","assets/identite-DKmrvuZP.js","assets/index-D3lGBtTm.js","assets/index.es-rau38xED.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-BnnfmK5h.js","assets/jspdf.es.min-C8gUgrg-.js","assets/JustePrix-DqdQCCUC.js","assets/kkiapay-CKtsvmBl.js","assets/kkiapay-widget-DnUhUNd4.js","assets/Laboratoire-Pos82Lwm.js","assets/LaJournee-Bn_G0HCt.css","assets/LaJournee-C47UXSVw.js","assets/LesPaiements-C1z7vS90.css","assets/LesPaiements-DYpCT8si.js","assets/LettresAuDossier-CqzcEKi0.js","assets/LienMndPay-BZIHZBqY.js","assets/Marketing-DxI9Qmdn.js","assets/MarketingBranche-DfaXjhZi.js","assets/Marque-D0lYu2HF.js","assets/MesPourboires-CjS3Fz-1.js","assets/MesPourboires-D9I_9rZf.css","assets/MesTaches-C15vDG95.js","assets/MesTaches-Cc4XUDf6.css","assets/momo-C2ZVfV9J.js","assets/MonMois-wlbZ-9co.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/objectifs-DuGPNrG9.js","assets/opale-BWdJQaiu.js","assets/oreille-B1AMUmZh.js","assets/paie-du-5-BpXbkLE6.js","assets/paie-du-5-DeJq-K_U.css","assets/paie-du-5-pur-Cs1Uehoe.js","assets/PaieParMtn-BtYS0mxh.js","assets/paliers-BK9kMxYT.js","assets/Parametres-1hfzH5rc.js","assets/parcours-pX4skSVf.js","assets/Parrainages-BSUMob4b.js","assets/Parrainages-gAHAPB_6.css","assets/PassageAvantLeFauteuil-CpEf4inA.js","assets/pdf-BgzDiZG9.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/Personas-CfOU5SlT.js","assets/Personnel-BPffAEbU.js","assets/photo-0DN_P3Yn.js","assets/pilotage-D8kf1Co8.css","assets/Pourboires-CE3XqDq1.js","assets/Predictions-Cv1dP1It.js","assets/Prestataires-D0FCry7o.js","assets/Prets-DDTXrE4h.js","assets/PrevisionDuMois-3wO5qQ-a.js","assets/PrevisionDuMois-DlFTw3OX.css","assets/Previsions-D9H4B-8I.js","assets/previsions-pur-C2KwdkKC.js","assets/Previsions-r4v19Anp.css","assets/processus-pur-R6U5QcCi.js","assets/Projets-COO7WDEE.css","assets/Projets-CXKq3xqa.js","assets/projets-pur-2ZEMRNDU.js","assets/projets-XzXSC5fh.js","assets/protocoles-Gf378Uef.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-hW8SB_Fy.js","assets/qualification-CBTrvgcX.js","assets/quiz-5qMPWZVi.js","assets/Rapport-D8vU-Lx2.js","assets/Recommandations-B-_DJBQf.js","assets/regler-C5hcM02_.css","assets/regler-Dl3QCiY1.js","assets/regler-la-seance-serveur-Bs6rzqZX.js","assets/relances-pur-lwRTXc5E.js","assets/releve-des-avis-1XUVkRjU.js","assets/SalonFoyer-BwsHuaou.js","assets/secretariat-admin-DctJfE8p.js","assets/Secretariat-CrPr1FRT.js","assets/Secretariat-Cy79Zw30.css","assets/Signatures-DymBX3Fe.js","assets/SignerUnPdf-D5ANtNU8.js","assets/Synthese-D_Y3jMOb.js","assets/SyntheseGraphes-RpR6YHTs.js","assets/systeme-TPy-pF7j.css","assets/Tableau-D8TKM66d.js","assets/temps-BiHete_5.js","assets/Textes-DLpOzRbT.css","assets/Textes-DW_SnUA1.js","assets/tiroirs-BYJQDkiO.js","assets/tiroirs-CkDzpGy0.css","assets/trone-DeV_pqWl.js","assets/trone-DQVzvvmA.css","assets/useAudiences-BH0MEYds.js","assets/useClotureDuJour-Dxzw4w6u.js","assets/Vitrine-BWilTqQJ.css","assets/Vitrine-D4wUCp9K.js","assets/_admin-D39UMhFA.js","assets/_contrat-B7xdBgJS.js","assets/_heures-Dky1K3kz.js","assets/_reuni-BDJuidrG.js","assets/_shared-Cv1yuAZo.js","assets/_signature-Ba-m2g9U.js","assets/_ui-BWMA-PlM.css","assets/_ui-DZnokWKb.js"];
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
