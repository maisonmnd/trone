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
const BUILD = "20261028104621";
const A_GARDER = ["./","assets/abonnements-CojfSC9F.js","assets/Abonnements-DOEFmx4C.js","assets/Academie-BPwix2K4.js","assets/Acces-LULSZMNz.js","assets/actions-CTs07Qun.js","assets/AFaire-C35Im5OY.js","assets/afaire-DCctCKmO.js","assets/agents-donnees-NY_lbot9.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Agents-Q0J8xGZ8.js","assets/Analytics-CisC_2QE.js","assets/Appels-Cf8v8VEv.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/AtelierDesContenus-DHsMnneb.js","assets/AuComptoir-gXOya71m.js","assets/Audience-CzeLjg4v.js","assets/Aujourdhui-BiWa2s8b.js","assets/avis-fiches-yrsztfYu.js","assets/AvisGoogle-38f1bqAW.js","assets/AvisGoogle-DaPXfwX9.css","assets/bilan-B-bfPYR0.css","assets/bilan-dCoJ2l70.js","assets/BilanMensuel-cDqLyunj.js","assets/Branches-BEtihV_u.js","assets/bridges-PN15zhpy.js","assets/Caisse-BrE7H0x1.js","assets/caisse-du-soir-Cz2SP8mu.js","assets/Caisses-B0vWudlH.js","assets/Calendrier-iTpJ-jJ4.js","assets/campagnes-pur-B4dWIg6z.js","assets/Carnet-Bnb2qEoo.js","assets/carte-dZnvLVUm.js","assets/carte-_W_-xBPj.css","assets/CarteModal-CvKfdQjW.js","assets/CartesCadeaux-B4lfEOIT.js","assets/Catalogue-CQ0Nnxts.js","assets/CentreDeCommande-C44K3B4n.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-B8DcTGZ3.js","assets/certificat-aDY6x6sR.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-DKlxRhN1.js","assets/chiffre-du-jour-pur-D0hews1-.js","assets/ChiffreDesPrestations-DKuaLP1O.js","assets/client-D0VRLTyE.js","assets/ClotureDuTiroir-C6vPx-E_.css","assets/ClotureDuTiroir-H7GMgQAa.js","assets/Coffre-DKxpuhJl.js","assets/components-CeD1PHQo.js","assets/compte-courant-ByzulCEN.js","assets/compte-IwuQVRRo.js","assets/CompteCourant-iJTc8YhC.js","assets/Comptes-B8IfmxXe.js","assets/Comptoir-FL7FXKaG.js","assets/consultation-CCxtDfVN.js","assets/consultation-CRW6QcWf.css","assets/Consultations-DbfmS03r.js","assets/consultNotes-BOK8iGrW.js","assets/Conversations-D4WwB5Zo.css","assets/Conversations-DXY8rdR-.js","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-DEVbrHbj.js","assets/currency-qfIhGmrs.js","assets/Customers-wtSSO3-v.js","assets/Dashboard-Dgx9dCld.js","assets/Dashboard-zjGteuUE.css","assets/dates-DfC_T0nD.js","assets/Demandes-CnrbZnJQ.js","assets/Depenses-Caamga3r.js","assets/dernier-message-pur-CBYWnq8m.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-D2KJmJkc.js","assets/diagnostics-au-trone-BF_FbBsi.js","assets/Discussions-DLoiWCrV.js","assets/EditeurDesOffres-BeLNbAq1.js","assets/Encaissements-D52bIT_Z.js","assets/enfants-JcqAHPZC.js","assets/Engagements-Cj5S9MhG.css","assets/Engagements-DKWSaxhL.js","assets/EntreDeuxSeances-q_MrFPwL.js","assets/equipe-B_9ZHz24.css","assets/Evaluation-BSwSjoWU.js","assets/FacturePrestataire-BTIszUns.js","assets/Factures-rgS0v8QS.js","assets/FenetreDuPoint-Ch3hYjeM.js","assets/Fil-DxRuvx1g.js","assets/finances-BMFnlkRx.css","assets/fon-C1UqUQr3.js","assets/fon-pur-CgVkbJ8O.js","assets/Fournisseurs-CVODkTHO.js","assets/fournisseurs-z53Qcc5E.js","assets/foyer-CtBuIW3Q.js","assets/Gerard-B55bQ6MK.js","assets/Gerard-CUvkbLSl.css","assets/gerard-donnees-DpiyTl1r.js","assets/gestes-conversation-C5nGSuzv.js","assets/HomeRituals-BEME3Lth.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-B0yGqk_7.js","assets/ia-centre-500eZ1o0.js","assets/ia-diagnostic-pur-hHYxp10Y.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-recu-pur-DcucZqpR.js","assets/identite-DTa1hyVj.js","assets/index-DIJ2Tu0a.js","assets/index.es-B5p_u9DY.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-Dh1Io4qP.js","assets/jspdf.es.min-BD9moDHJ.js","assets/JustePrix-MhI7Vxsr.js","assets/kkiapay-Bz2hhQ3M.js","assets/kkiapay-widget-DnUhUNd4.js","assets/laboratoire-B0MSozIz.js","assets/Laboratoire-BzK2ES5b.js","assets/LettresAuDossier-D9I3Aw-S.js","assets/LienMndPay-C3bLN2iD.js","assets/maisons-CSSFrqZy.js","assets/Marketing-DgI9lcgv.js","assets/MarketingBranche-Cu8ygbjW.js","assets/Marque-BuJsiyjf.js","assets/MesTaches-Cc4XUDf6.css","assets/MesTaches-DcK-ONKt.js","assets/momo-B-QSeWY6.js","assets/MonMois-CIQRxSeV.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-65j_K3m9.js","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/paliers-BlyGx4VR.js","assets/Parametres-WFEiaNZJ.js","assets/parcours-DFjjv6GK.js","assets/Parrainages-gAHAPB_6.css","assets/Parrainages-z1BBwdjD.js","assets/pdf-8AOEeTUR.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/Personas-BZ0ue4N3.js","assets/Personnel-Bu86Mrwr.js","assets/photo-D0lktpE3.js","assets/pilotage-D8kf1Co8.css","assets/Predictions-C1Uor7aK.js","assets/Prestataires-CUuWGhgF.js","assets/prestataires-DmEYK5vF.js","assets/Prets-Dq1t9BCh.js","assets/prevision-du-mois-pur-D6sJa5lw.js","assets/Previsions-D-0__Buz.css","assets/Previsions-DYQTw2eU.js","assets/previsions-pur-Dd08cUZx.js","assets/processus-pur-BLN25j-E.js","assets/Projets-BTnJ1Xna.js","assets/Projets-COO7WDEE.css","assets/projets-DOl3R7xv.js","assets/projets-pur-2ZEMRNDU.js","assets/protocoles-BBPvpjNX.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-C0Q3u_m6.js","assets/qualification-DHZFWj_n.js","assets/quiz-5qMPWZVi.js","assets/Rapport-Ceh-_Jqf.js","assets/RattacherUneCarte-qzqMWLAW.js","assets/Recommandations-BbqlURzZ.js","assets/regler-C5hcM02_.css","assets/regler-DgqS-Q1s.js","assets/regler-la-seance-serveur-Bs6rzqZX.js","assets/relances-pur-Cod_JLfM.js","assets/releve-des-avis-BUey4T8f.js","assets/SalonFoyer-DVzCHrAY.js","assets/secretariat-admin-zzyfrQ04.js","assets/Secretariat-Cy79Zw30.css","assets/Secretariat-JAtHOEDn.js","assets/Signatures-DU8WUlak.js","assets/SignerUnPdf-CIEP0hFZ.js","assets/Synthese-OcoHu73J.js","assets/SyntheseGraphes-CaES9JTY.js","assets/systeme-C3XFIa8E.css","assets/Tableau-D9plJ4od.js","assets/temps-Da5MhoRQ.js","assets/Textes-CwTHguYN.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-jrlC1r8O.js","assets/trace-du-moyen-pur-Bx8-suHn.js","assets/trone-BMdkuVGH.css","assets/trone-DLSCKMyr.js","assets/ui-D7Gx7esM.js","assets/useAudiences-CAVVNyjK.js","assets/vente-C7YWXkHo.css","assets/Vitrine-BWilTqQJ.css","assets/Vitrine-DZd8G7Ag.js","assets/_admin-WH2vrP8h.js","assets/_contrat-DNR6gOVz.js","assets/_heures-eLT5pQcF.js","assets/_reuni-BhyRZjx8.js","assets/_shared-B3GkBWIR.js","assets/_signature-DV1wny4t.js","assets/_ui-A-PYa0ZX.js","assets/_ui-BWMA-PlM.css"];
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
