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
const BUILD = "20261120142541";
const A_GARDER = ["./","assets/Abonnements-D2uOyxTW.js","assets/abonnements-DP5UDnbG.js","assets/Abonnements-DTY7p2DH.css","assets/Academie-CUMCSBko.js","assets/Acces-aIiDhP6x.js","assets/AFaire-CnMU2gR5.js","assets/afaire-CQL5ywEb.js","assets/Agents-Bgqtt2LC.js","assets/agents-donnees-Byt3llKO.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-DSBlFbn7.js","assets/App-DWrmPF8_.js","assets/Appels-DtZ2xc3n.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/Assistants-BOWnux3G.js","assets/Assistants-D9i2Xwmg.css","assets/AtelierDesContenus-D3-p6F2A.css","assets/AtelierDesContenus-Dh_fnZsQ.js","assets/Audience-CW2uPBwD.js","assets/Aujourdhui-CkIsStZm.js","assets/auth-DWWCVy-H.js","assets/avant-le-fauteuil-lecture-D4Aa2TPB.js","assets/AvantLeFauteuil-R-qiIYsa.js","assets/avis-fiches-GW28ezam.js","assets/AvisGoogle-CHXAFrTm.js","assets/AvisGoogle-DaPXfwX9.css","assets/BadgeEssai-DzhVbYr_.js","assets/BadgeSuggere-DInY-PXh.js","assets/besoins-3t8DXED9.js","assets/BesoinsEtRegles-BLwxGVV5.css","assets/BesoinsEtRegles-CeIGnnVz.js","assets/bilan-B-bfPYR0.css","assets/bilan-DpJ0yObJ.js","assets/BilanMensuel-UDbPs_m7.js","assets/Branches-Bmu5IFJ2.js","assets/bridges-BU20CgyY.js","assets/Caisse-BvguRGXj.js","assets/caisse-du-soir-C6vPx-E_.css","assets/caisse-du-soir-DOMU0kDz.js","assets/Caisses-CCGn8M07.js","assets/Calendrier-CFiJ1Mcx.js","assets/campagnes-pur-C_uxTTNd.js","assets/Carnet-BAL-kvFU.js","assets/carte-0Ucw1XLz.js","assets/carte-_W_-xBPj.css","assets/CarteModal-DWkbiCvj.js","assets/CartesCadeaux-1aNW3JzK.js","assets/Catalogue-DaRQIuH0.js","assets/CentreDeCommande-CFRm8qZU.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-DQOl4It6.js","assets/certificat-BK8fKzCA.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-j1y0O9er.js","assets/chiffre-du-jour-pur-CcgHIwIC.js","assets/ChiffreDesPrestations-CMz1kxxv.js","assets/Classement-CmpbQZDu.css","assets/Classement-DttCi2qv.js","assets/classement-pur-CQOYU06l.js","assets/client-2iw6Gapc.js","assets/cloture-du-jour-WLLfDNrL.js","assets/ClotureDuTiroir-Bd3Wz3G8.js","assets/Coffre-nJgLL2ln.js","assets/collecte-mtn-pur-Bq3uWgWT.js","assets/components-BokEsiyS.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-DBtEzyHd.js","assets/Comptes-uuwD47um.js","assets/consultation-Bbdmu1MP.js","assets/consultation-CRW6QcWf.css","assets/Consultations-DiE-2_mG.css","assets/Consultations-DtOZKXQb.js","assets/consultNotes-B9CR2b99.js","assets/Conversations-BCxXMh5j.js","assets/Conversations-D4WwB5Zo.css","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-DLtjLL6p.js","assets/currency-Cd0clE4P.js","assets/Customers-BHNHVIbm.js","assets/Dashboard-B2x7VsE_.css","assets/Dashboard-CZQcqNn8.js","assets/dates-26JxmnPZ.js","assets/Demandes-DWB2zVdU.js","assets/DepenseEnUnePhrase-BIGRlGqP.css","assets/DepenseEnUnePhrase-_GhfK87b.js","assets/Depenses-DfNtt8Q6.js","assets/depenses-saisie-DLsEFhK-.js","assets/devis-remis-CZqLW-V-.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-D9dQsqNA.js","assets/diagnostics-au-trone-Do_ajfJI.js","assets/Dictee-BhIG33sZ.js","assets/Dictee-C-pUYYFA.css","assets/dictee-pur-BN1EJGvG.js","assets/Discussions-D5JfvFix.js","assets/echappe-html-pur-gEhHOM07.js","assets/EditeurDesOffres-CZEZDzSi.js","assets/Encaissements-DvXfVCp5.js","assets/enfants-y6A1THD4.js","assets/Engagements-ChNKquyC.js","assets/Engagements-Cj5S9MhG.css","assets/engagements-coffre-eLUCj5PN.js","assets/EntreDeuxSeances-DWfFxZEv.js","assets/es-BCmqVXmd.js","assets/Evaluation-b57L1On2.js","assets/facture-Bmg2tQdB.js","assets/Factures-CestQeE3.js","assets/FenetreDeLAgent-CVadptvQ.js","assets/FenetreDesCivilites-Cz7cD3Nx.js","assets/FenetreDesCivilites-zfNk1aak.css","assets/FenetreDuPoint-uIj2gC86.js","assets/Fil-DNofPVWI.js","assets/finances-C8x7Mn4-.css","assets/fon-DV53Z2qw.js","assets/Fournisseurs-Btkiw4RU.js","assets/fournisseurs-DVsC4A4n.js","assets/foyer-CgVwLWsp.js","assets/Gerard-DMOEifKM.js","assets/gerard-donnees-BHl-PjdV.js","assets/Gerard-vo2IWvP3.css","assets/gestes-conversation-7fqpjrX_.js","assets/heures-des-rappels-pur-BWJPB8OP.js","assets/HomeRituals-B80t6Gvf.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-CjGDsHRi.js","assets/ia-centre-C1w3Emcs.js","assets/ia-diagnostic-pur-qGnFEvys.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-tableau-pur-p6UvREJe.js","assets/identite-CXLxRU0Z.js","assets/index.es-ZL4xXJ33.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-UN2Cy7rR.js","assets/jspdf.es.min-CNSl08I7.js","assets/JustePrix-Cz-LyrP2.js","assets/kkiapay-C-9-c8cQ.js","assets/kkiapay-widget-CVmsl9OE.js","assets/Laboratoire-Dp3NXUWa.js","assets/LaJournee-Bn_G0HCt.css","assets/LaJournee-KtHHnGDb.js","assets/le-caissier-pur-DQp75CtU.js","assets/LesPaiements-C9cEZlne.css","assets/LesPaiements-wxq2WCwC.js","assets/LettresAuDossier-Dd9KQU05.js","assets/LienMndPay-DJw7Hv6v.js","assets/Marketing-BjJx-vJb.js","assets/MarketingBranche-BJ5ZsCZU.js","assets/Marque-DxHeNcLx.js","assets/MesPourboires-CENjelyb.css","assets/MesPourboires-D3P2ehfu.js","assets/MesTaches-9O4_qqXo.js","assets/MesTaches-Cc4XUDf6.css","assets/momo-C2ZVfV9J.js","assets/MonMois-DF0K7fNT.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/MtnMoMo-Bl7D4_ff.js","assets/objectifs-Bxn5zzth.js","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/opale-BSdmjJAT.js","assets/oreille-B1AMUmZh.js","assets/paie-du-5-DeJq-K_U.css","assets/paie-du-5-DQAerNlb.js","assets/paie-du-5-pur-CPiCK8fv.js","assets/paie-par-mtn-CtsvEYb6.js","assets/PaieParMtn-352zaeYa.js","assets/paliers-BEIEXdb2.js","assets/Parametres-BHWXhxag.js","assets/parcours-DiYh1lMH.js","assets/Parrainages-CQUDVnrS.js","assets/Parrainages-gAHAPB_6.css","assets/PassageAvantLeFauteuil-DnxNxHwo.js","assets/pdf-B3-CqfRK.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/periode-des-pourboires-pur-BUWqfwov.js","assets/Personas-DYb2Pcwm.js","assets/Personnel-BqiSaG6T.js","assets/photo-y3isYDCk.js","assets/pilotage-D8kf1Co8.css","assets/porte-de-l-equipe-qUeD9yqU.js","assets/Pourboires-i7a_dzWE.js","assets/Predictions-DL38E8D-.js","assets/preload-helper-BRe_O-Rg.js","assets/Prestataires-Bxmfu7n3.js","assets/Prets-BREo1tKe.js","assets/PrevisionDuMois-BYCZL5xe.js","assets/PrevisionDuMois-DlFTw3OX.css","assets/Previsions-9BU2Vg1T.css","assets/Previsions-CuPiaOaq.js","assets/previsions-pur-CUIhSSq_.js","assets/processus-pur-R6U5QcCi.js","assets/Projets-COO7WDEE.css","assets/projets-Csir-nx7.js","assets/Projets-CXIsULp-.js","assets/projets-pur-2ZEMRNDU.js","assets/protocoles-Bwa_H9e0.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-CEY0HOlJ.js","assets/quiz-5qMPWZVi.js","assets/Rapport-CGaVWh30.js","assets/Recommandations-9w8gCpUg.js","assets/regler-BEvYbq4C.js","assets/regler-DHR_B1Dm.css","assets/regler-par-fedapay-pur-G8CEJdGn.js","assets/relances-pur-BacTXlI2.js","assets/releve-des-avis-BzeqFBpB.js","assets/SalonFoyer-BJlB7GrE.js","assets/secretariat-admin-DaHn8qm-.js","assets/Secretariat-CbtW-Pgw.js","assets/Secretariat-Cy79Zw30.css","assets/Signatures-DmHvwbal.js","assets/SignerUnPdf-JA5r4Sv1.js","assets/Synthese-BOtPAKiV.js","assets/SyntheseGraphes-BUHBK2P9.js","assets/systeme-TPy-pF7j.css","assets/Tableau-Cqrdt_oK.js","assets/temps-CUsJlYzp.js","assets/Textes-BDnZU_60.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-CkDzpGy0.css","assets/tiroirs-DJq5kuJz.js","assets/trone-B3bOD-ho.js","assets/trone-Dsdrwhxz.css","assets/useAudiences-I3Kv7zdM.js","assets/useClotureDuJour-DyvQ-ruF.js","assets/visios-C4mohgDX.js","assets/Vitrine-BWilTqQJ.css","assets/Vitrine-DAnmMDOb.js","assets/_admin-BTn_5Z56.js","assets/_contrat-BETsnpZ2.js","assets/_reuni-DHD58zif.js","assets/_shared-ernnN8U9.js","assets/_signature-DBe13lyd.js","assets/_ui-APOamSZ9.js","assets/_ui-BrUDlmuM.css"];
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

  /* LE PLAN POUR VENIR, LE RÉSEAU D'ABORD (20 novembre 2026). Il part chez les
     clientes : gardé comme les autres images, le plan d'avant une correction
     (l'adresse du 20 novembre) repartait une fois de plus de chaque appareil.
     En ligne, toujours le dernier, sans le cache du navigateur ; sans réseau,
     celui qu'on a. */
  if (url.pathname.includes('/assets/itineraire/')) {
    event.respondWith((async () => {
      const c = await caches.open(CACHE_IMAGES);
      try {
        const r = await avecDelai(fetch(req, { cache: 'no-cache' }), DELAI_PAGE_MS);
        if (r.ok) { void c.put(req, r.clone()); return r; }
        return (await c.match(req)) || r;
      } catch (_e) {
        return (await c.match(req)) || Response.error();
      }
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
