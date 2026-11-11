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
const BUILD = "20261111181612";
const A_GARDER = ["./","assets/abonnements-BXxMgQK2.js","assets/Abonnements-CP99AwB4.js","assets/Abonnements-DTY7p2DH.css","assets/Academie--DOONGAj.js","assets/Acces-BZZMapzk.js","assets/afaire-BO439c4A.js","assets/AFaire-DvQ-rB0Y.js","assets/Agents-DnaWA-g1.js","assets/agents-donnees-CyLyBOE4.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-D25ThCkq.js","assets/Appels-B4Vjf_yJ.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/Assistants-3mT11F1O.js","assets/Assistants-D9i2Xwmg.css","assets/AtelierDesContenus-D3-p6F2A.css","assets/AtelierDesContenus-DQLxHzqt.js","assets/Audience-De1uhQMe.js","assets/Aujourdhui-B5J7o2-H.js","assets/avant-le-fauteuil-lecture-wvQg0su4.js","assets/AvantLeFauteuil-BorgFyjI.js","assets/avis-fiches-BhhqJP9l.js","assets/AvisGoogle-C5vUwzim.js","assets/AvisGoogle-DaPXfwX9.css","assets/BadgeEssai-CskL046A.js","assets/bilan-B-bfPYR0.css","assets/bilan-Diz3C2Z7.js","assets/BilanMensuel-CPYpPdPe.js","assets/Branches-BAw-F3Ck.js","assets/bridges-CYU11V92.js","assets/caisse-du-soir-BQM0wxjc.js","assets/caisse-du-soir-C6vPx-E_.css","assets/Caisse-iVdxpy6j.js","assets/Caisses-BOHFq9CY.js","assets/Calendrier-CWQVAMEK.js","assets/campagnes-pur-D0JOP3o0.js","assets/Carnet-AjA3qlrL.js","assets/carte-CxbdiQhU.js","assets/carte-_W_-xBPj.css","assets/CarteModal-B0V_K0vF.js","assets/CartesCadeaux-CZlUJXlW.js","assets/Catalogue-BlzGsYsX.js","assets/CentreDeCommande-Du8kyJhp.css","assets/CentreDeCommande-RJfwr3mT.js","assets/Cercle-Dq-xee5a.js","assets/certificat-LCYdMqXP.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-C_NecmQn.js","assets/chiffre-du-jour-pur-CEtDrROa.js","assets/ChiffreDesPrestations-CdGqPmb0.js","assets/client-CsVaQjcy.js","assets/cloture-du-jour-z6Gc9j14.js","assets/ClotureDuTiroir-BSnp1_xs.js","assets/Coffre-D5qOs2I2.js","assets/components-BYm8d2Bf.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-CSAVrUki.js","assets/Comptes-B0x052ws.js","assets/consultation-BS1Q_NXU.js","assets/consultation-CRW6QcWf.css","assets/Consultations-DC_wZaCS.js","assets/consultNotes-DVLZZtOu.js","assets/Conversations-D4WwB5Zo.css","assets/Conversations-D8NLnoG4.js","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-Dsd5QFne.js","assets/currency-qfIhGmrs.js","assets/Customers-C_YnQJS9.js","assets/Dashboard-B2x7VsE_.css","assets/Dashboard-j4O2CSui.js","assets/dates-CobEUikv.js","assets/Demandes-B1Zp_J4n.js","assets/DepenseEnUnePhrase-BIGRlGqP.css","assets/DepenseEnUnePhrase-dFA8KQNr.js","assets/Depenses-BIIKmGf2.js","assets/depenses-saisie-CPTYeIQk.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-Dy8_e_JL.js","assets/diagnostics-au-trone-BWy7ichw.js","assets/Dictee-CCJC_Cju.js","assets/Dictee-D2P9yM7v.css","assets/dictee-pur-CZU0UYR_.js","assets/Discussions-C54UT1Qs.js","assets/EditeurDesOffres-Xq2ZXPZu.js","assets/Encaissements-CJkGDG9E.js","assets/enfants-7PFfSZl9.js","assets/Engagements-Cj5S9MhG.css","assets/engagements-coffre-W6SaXqLu.js","assets/Engagements-DlKAndXj.js","assets/EntreDeuxSeances-DLPCN0ZZ.js","assets/Evaluation-73sffo5P.js","assets/Factures-AAQ0vzP7.js","assets/FenetreDesCivilites-CURAknOU.js","assets/FenetreDesCivilites-zfNk1aak.css","assets/FenetreDuPoint-DuwyAd6n.js","assets/Fil-D0owAnPv.js","assets/finances-BMFnlkRx.css","assets/fon-BkmgvA12.js","assets/Fournisseurs-C9Nikh4I.js","assets/fournisseurs-DlbwQZyI.js","assets/foyer-BsYIAo6a.js","assets/Gerard-Cgj-zsJh.css","assets/Gerard-CrudArCO.js","assets/gerard-donnees-CE1yIJ44.js","assets/gestes-conversation-6Zml_UVs.js","assets/heures-des-rappels-pur-Dig9pZpo.js","assets/HomeRituals-BiqJOPr0.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-d5dXLZ2Y.js","assets/ia-centre-BlmwJ5Md.js","assets/ia-diagnostic-pur-BBLrGY5l.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-tableau-pur-p6UvREJe.js","assets/identite-DT_vsTzJ.js","assets/index-5zjXmHF2.js","assets/index.es-C8ZTIPX9.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-B8HXZY21.js","assets/jspdf.es.min-wj2svVSt.js","assets/JustePrix-D_zyFBo2.js","assets/kkiapay-BkhRPeNH.js","assets/kkiapay-widget-DnUhUNd4.js","assets/Laboratoire-Bd_XLD34.js","assets/LaJournee-Bn_G0HCt.css","assets/LaJournee-By8sawg-.js","assets/LesPaiements-BjhpJvW9.js","assets/LesPaiements-C9cEZlne.css","assets/LettresAuDossier-CBqWxrQH.js","assets/LienMndPay-bDON_qwQ.js","assets/Marketing-CS1pXXUW.js","assets/MarketingBranche-D-cETeF1.js","assets/Marque-CYGKvVL9.js","assets/MesPourboires-CENjelyb.css","assets/MesPourboires-D9O7ET1L.js","assets/MesTaches-BpEUBXdN.js","assets/MesTaches-Cc4XUDf6.css","assets/momo-C2ZVfV9J.js","assets/MonMois-BYf-HV4S.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-CKMBZp3N.js","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/opale-Dt1PaDoI.js","assets/oreille-B1AMUmZh.js","assets/paie-du-5-DeJq-K_U.css","assets/paie-du-5-Di6dWZRo.js","assets/paie-du-5-pur-mAh_GN0z.js","assets/PaieParMtn-C1MQn95q.js","assets/paliers-DZV9SvRE.js","assets/Parametres-B5NSG2jp.js","assets/parcours-S1GzbcPp.js","assets/Parrainages-Cicg-X_i.js","assets/Parrainages-gAHAPB_6.css","assets/PassageAvantLeFauteuil-DPintDVQ.js","assets/pdf-C43DFOPX.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/periode-des-pourboires-pur-BUWqfwov.js","assets/Personas-D3BlOZtV.js","assets/Personnel-BW_cj0RO.js","assets/photo-CNjAONfE.js","assets/pilotage-D8kf1Co8.css","assets/Pourboires-Bol-N4Mr.js","assets/Predictions-BalMfN_3.js","assets/Prestataires-LagbQfRR.js","assets/Prets-L_wKcIUD.js","assets/PrevisionDuMois-Cqq5K6Mr.js","assets/PrevisionDuMois-DlFTw3OX.css","assets/Previsions-9BU2Vg1T.css","assets/Previsions-B3qzAxre.js","assets/previsions-pur-DxDGH1V5.js","assets/processus-pur-R6U5QcCi.js","assets/Projets-C4HwZJmz.js","assets/projets-CJ9AHpin.js","assets/Projets-COO7WDEE.css","assets/projets-pur-2ZEMRNDU.js","assets/protocoles-DR67AV11.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-5zv4YNW8.js","assets/qualification-BLzGOJQY.js","assets/quiz-5qMPWZVi.js","assets/Rapport-AsUWYCex.js","assets/Recommandations-CbXCA2lM.js","assets/regler-BRDHIbcf.js","assets/regler-C5hcM02_.css","assets/regler-la-seance-serveur-Bs6rzqZX.js","assets/relances-pur-BacTXlI2.js","assets/releve-des-avis-BMo5U9Uf.js","assets/SalonFoyer-Ni-P9ZLk.js","assets/secretariat-admin-CuSecODx.js","assets/Secretariat-Cy79Zw30.css","assets/Secretariat-DTkNTvAR.js","assets/Signatures-CC6y9z8W.js","assets/SignerUnPdf-DME-9O2d.js","assets/Synthese-BJ1HvK60.js","assets/SyntheseGraphes-DiWlGeEx.js","assets/systeme-TPy-pF7j.css","assets/Tableau-BMZwzg00.js","assets/temps-CEbpQr5Z.js","assets/Textes-6EpN9Ygl.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-CkDzpGy0.css","assets/tiroirs-jAgKxRqf.js","assets/trone-CKg79qbi.css","assets/trone-hBIVeFFu.js","assets/useAudiences-CLkY8AUr.js","assets/useClotureDuJour-Blyu62QD.js","assets/Vitrine-BWilTqQJ.css","assets/Vitrine-Dn7HmxlR.js","assets/_admin-fdTZjimu.js","assets/_contrat-DBsmYeXU.js","assets/_reuni-DN9-vmhn.js","assets/_shared-ClSU5qsf.js","assets/_signature-B_bYcZWe.js","assets/_ui-BrUDlmuM.css","assets/_ui-Ds9xu8S-.js"];
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
