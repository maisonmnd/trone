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
const BUILD = "20261121091739";
const A_GARDER = ["./","assets/abonnements-BAt6f58F.js","assets/Abonnements-D8PqW1my.js","assets/Abonnements-DTY7p2DH.css","assets/Academie-BQGxGWX5.js","assets/Acces-9dOSlEQ_.js","assets/AFaire-82TpICUm.js","assets/afaire-b5xZNOTL.js","assets/agents-donnees-g8M32A0H.js","assets/Agents-DYLD0GHU.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-So3qmq4_.js","assets/App-CNTZPdr8.js","assets/Appels-CeH7YZnC.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/Assistants-7vScPeZ4.js","assets/Assistants-D9i2Xwmg.css","assets/AtelierDesContenus-D3-p6F2A.css","assets/AtelierDesContenus-DR56gP2S.js","assets/Audience-ACPnrdYg.js","assets/Aujourdhui-zW1kFYFI.js","assets/auth-DUBmFOWh.js","assets/avant-le-fauteuil-lecture-m1V1jsFM.js","assets/AvantLeFauteuil-DQ3oT0f_.js","assets/avis-fiches-9x7EET18.js","assets/avis-google-pont-Ck_0Vla9.js","assets/AvisGoogle-BGLs3UVb.js","assets/AvisGoogle-DaPXfwX9.css","assets/BadgeEssai-_vRfw_3N.js","assets/BadgeSuggere-C49T4AD6.js","assets/besoins-CFf2n2ba.js","assets/BesoinsEtRegles-BIIG7LwV.js","assets/BesoinsEtRegles-BLwxGVV5.css","assets/bilan-B-bfPYR0.css","assets/bilan-CUdqJKNT.js","assets/BilanMensuel-DO0h-QQT.js","assets/Branches-x0Di5dBl.js","assets/bridges-CDxZK0gj.js","assets/caisse-du-soir-BMhkIaho.js","assets/caisse-du-soir-C6vPx-E_.css","assets/caisse-fluide-pur-Cy9wq4zx.js","assets/Caisse-RZu8htvV.js","assets/Caisses-CfkC-hJy.js","assets/Calendrier-Bh7avInF.js","assets/campagnes-pur-CCTXJT52.js","assets/Carnet-BSgP5OBE.js","assets/carte-D-fRJrtb.js","assets/carte-_W_-xBPj.css","assets/CarteModal-BqQguBWf.js","assets/CartesCadeaux-CMJSQkP4.js","assets/Catalogue-BmHtJBaA.js","assets/CentreDeCommande-DJCYfNZp.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-BuehXKZN.js","assets/certificat-B6E6Cbgc.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-CDuSs2dh.js","assets/chiffre-du-jour-pur-dt3iawpx.js","assets/ChiffreDesPrestations-BGvgWIre.js","assets/classement-3wM-vHV5.js","assets/Classement-CmpbQZDu.css","assets/Classement-IHB9Zyj6.js","assets/classement-pur-CQOYU06l.js","assets/client-Dy8FOyBc.js","assets/cloture-du-jour-B1hbTSBG.js","assets/ClotureDuTiroir-CvLU_SiT.js","assets/Coffre-CPk08M_6.js","assets/collecte-mtn-pur-BKoFYpbn.js","assets/components-bHql4f0d.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-BjFlvd3-.js","assets/Comptes-CecPGkfX.js","assets/consultation-CRW6QcWf.css","assets/consultation-DWwOr6Kl.js","assets/Consultations-c0-6LlOA.js","assets/Consultations-DiE-2_mG.css","assets/consultNotes-CwupcCIV.js","assets/contexte-de-la-reponse-BPmFM0F1.js","assets/Conversations-D4WwB5Zo.css","assets/Conversations-QHUdgHmY.js","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-dqU_IjEe.js","assets/currency-Cd0clE4P.js","assets/Customers-DY5h1dUN.js","assets/Dashboard-B2x7VsE_.css","assets/Dashboard-CoqBlMII.js","assets/dates-DeE5941-.js","assets/DemanderAPerle-B3RKHw3v.js","assets/DemanderAPerle-BD5NgCRN.css","assets/Demandes-B2X-jaFt.js","assets/DepenseEnUnePhrase-BIGRlGqP.css","assets/DepenseEnUnePhrase-Cdk8wg2m.js","assets/depenses-saisie-Dw9FI0hf.js","assets/Depenses-SW2P0a_2.js","assets/devis-remis-BNjKiCwP.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-CQjw5_0-.js","assets/diagnostics-au-trone-VGzkhJUG.js","assets/Dictee-C-pUYYFA.css","assets/dictee-pur-C7sX7ALv.js","assets/Dictee-XIWg0rLn.js","assets/Discussions-DbDLDMQN.js","assets/echappe-html-pur-gEhHOM07.js","assets/EditeurDesOffres-BPeEbg_Q.js","assets/Encaissements-C9iUpqhm.js","assets/enfants-Z1tEqodd.js","assets/Engagements-Cj5S9MhG.css","assets/engagements-coffre-D-hkdLe7.js","assets/Engagements-DXobiswm.js","assets/EntreDeuxSeances-9ufJ1WF3.js","assets/es-BOF0QN1R.js","assets/Evaluation-Ez_moBf1.js","assets/facture-FL_rgKIG.js","assets/Factures-s_XNaVEc.js","assets/FenetreDeLAgent-DSbPBBi3.js","assets/FenetreDesCivilites-eQIgas_l.js","assets/FenetreDesCivilites-zfNk1aak.css","assets/FenetreDuPoint-WKcIbIM4.js","assets/Fil-C9f0LFWY.js","assets/finances-C8x7Mn4-.css","assets/fon-C6CjHOJ-.js","assets/fournisseurs-CurEOZDf.js","assets/Fournisseurs-DdCw5fQk.js","assets/foyer-TXmOkhD0.js","assets/Gerard-DEegulR1.js","assets/Gerard-DNxabQR6.css","assets/gerard-donnees-BgZJGkjy.js","assets/gestes-conversation-CxRfdCRA.js","assets/heures-des-rappels-pur-BWJPB8OP.js","assets/HomeRituals-BFlguc9b.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-Dw9i5tFr.js","assets/ia-centre-DGXlWoAy.js","assets/ia-diagnostic-pur-qGnFEvys.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-tableau-pur-p6UvREJe.js","assets/identite-BMr5V-Bx.js","assets/index.es-COJ5M4BE.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-CjFnz6lE.js","assets/jspdf.es.min-eS25uML-.js","assets/JustePrix-BWhyy4y9.js","assets/kkiapay-D5FIA-Vt.js","assets/kkiapay-widget-CVmsl9OE.js","assets/Laboratoire-C9QY0gSk.js","assets/LaJournee-Bn_G0HCt.css","assets/LaJournee-DefOq2lM.js","assets/le-caissier-pur-BteUScK4.js","assets/LesPaiements-B999NwTo.js","assets/LesPaiements-C9cEZlne.css","assets/LettresAuDossier-DQTe-uz8.js","assets/LienMndPay-BmZgqMJB.js","assets/Marketing-EzTwoYCC.js","assets/MarketingBranche-BFFCGh_t.js","assets/Marque-k1nZENfB.js","assets/MesPourboires-CENjelyb.css","assets/MesPourboires-I9U7RMkt.js","assets/MesTaches-Cc4XUDf6.css","assets/MesTaches-DNmgMtrk.js","assets/momo-C2ZVfV9J.js","assets/MonMois-D26RUneH.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/MtnMoMo-C34SXUvc.js","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/objectifs-DVPdQIMO.js","assets/opale-CA0D8wwY.js","assets/oreille-B1AMUmZh.js","assets/paie-du-5-8cwEV21Y.js","assets/paie-du-5-DeJq-K_U.css","assets/paie-du-5-pur-CPiCK8fv.js","assets/paie-par-mtn-B4zwumHK.js","assets/PaieParMtn-Cmrp328U.js","assets/paliers-BzlSJ8Sd.js","assets/Parametres-ByyxkNy7.js","assets/parcours-pNPjTfHh.js","assets/Parrainages-DN5pNXMu.js","assets/Parrainages-gAHAPB_6.css","assets/PassageAvantLeFauteuil-CAEo4ijK.js","assets/pdf-DS3XzpZx.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/periode-des-pourboires-pur-BUWqfwov.js","assets/Personas-DZ_iFCx9.js","assets/Personnel-DM5eYg5g.js","assets/photo-DvskwenV.js","assets/pilotage-D8kf1Co8.css","assets/porte-de-l-equipe-Ct_N0yQm.js","assets/Pourboires-BIAIO9ij.js","assets/Predictions-9R5nx6en.js","assets/preload-helper-BRe_O-Rg.js","assets/Prestataires-8jHqsv29.js","assets/Prets-D6q6hadL.js","assets/PrevisionDuMois-BYMwXkQE.js","assets/PrevisionDuMois-DlFTw3OX.css","assets/Previsions-9BU2Vg1T.css","assets/Previsions-BjfZ1_Lx.js","assets/previsions-pur-C5C1SYiD.js","assets/processus-pur-R6U5QcCi.js","assets/projets-BcqomKzI.js","assets/Projets-COO7WDEE.css","assets/Projets-h2Z1ZqKq.js","assets/projets-pur-2ZEMRNDU.js","assets/protocoles-B5U1HD9I.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-CkQmZGqY.js","assets/quiz-5qMPWZVi.js","assets/Rapport-Br_ziryk.js","assets/Recommandations-QqHi2BGM.js","assets/regler-DHR_B1Dm.css","assets/regler-par-fedapay-pur-DYTDdXhs.js","assets/regler-Pb_teHdm.js","assets/relances-pur-BacTXlI2.js","assets/releve-des-avis-Cl2aUNn5.js","assets/SalonFoyer-DnNh5_ZI.js","assets/secretariat-admin-DlSlMiIE.js","assets/Secretariat-B0o_bo-a.js","assets/Secretariat-Cy79Zw30.css","assets/Signatures-BoTGVziF.js","assets/SignerUnPdf-2cLu2k5j.js","assets/Synthese-d8k5b9sP.js","assets/SyntheseGraphes-C4Tgz1Tg.js","assets/systeme-TPy-pF7j.css","assets/Tableau-Bc2CbP9i.js","assets/temps-EW3GuzRu.js","assets/Textes-CpApoU4o.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-CkDzpGy0.css","assets/tiroirs-D9ASg55k.js","assets/trone-B-r6lpi2.css","assets/trone-CaLUnd_s.js","assets/useAudiences-DP72rpEU.js","assets/useClotureDuJour-k_9C0KlN.js","assets/visios-D_a7xtS0.js","assets/Vitrine-BWilTqQJ.css","assets/Vitrine-u6R91YHe.js","assets/_admin-Usxv8l7v.js","assets/_contrat-DYdwj9Q-.js","assets/_reuni-IPh-i0mU.js","assets/_shared-3lumNQQx.js","assets/_signature-DggcCvOG.js","assets/_ui-BQIqZhnj.js","assets/_ui-BrUDlmuM.css"];
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
