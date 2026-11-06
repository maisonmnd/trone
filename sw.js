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
const BUILD = "20261106132802";
const A_GARDER = ["./","assets/Abonnements-COiKi7Sn.js","assets/Abonnements-DTY7p2DH.css","assets/abonnements-XUT4mKfQ.js","assets/Academie-BwMUihbQ.js","assets/Acces-DbQca6Ak.js","assets/AFaire-DkvYA8JS.js","assets/afaire-DNuYna3K.js","assets/Agents-DiqmWTpQ.js","assets/agents-donnees-CAaugC8T.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-B6xPLVzp.js","assets/Appels-sunSE_WB.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/Assistants-D9i2Xwmg.css","assets/Assistants-SbXRXGYX.js","assets/AtelierDesContenus-D-ph1ATj.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/Audience-DEklrbSx.js","assets/Aujourdhui-gQFB5-s_.js","assets/avant-le-fauteuil-lecture-CN44lSZs.js","assets/AvantLeFauteuil-AT3lWAKJ.js","assets/avis-fiches-CUkVyBNn.js","assets/AvisGoogle-BtGp7bkA.js","assets/AvisGoogle-DaPXfwX9.css","assets/bilan-B-bfPYR0.css","assets/bilan-DL2DrDHl.js","assets/BilanMensuel-DbclZkTV.js","assets/Branches-fd-sHHUJ.js","assets/bridges-D1Obvon-.js","assets/caisse-du-soir-C6vPx-E_.css","assets/caisse-du-soir-CuyQKy4p.js","assets/Caisse-OQ0I4d1G.js","assets/Caisses-CXPCTpkL.js","assets/Calendrier-Dj1HUmIj.js","assets/campagnes-pur-DFh4LXnO.js","assets/Carnet-kos1KolC.js","assets/carte-B3VMPLJg.js","assets/carte-_W_-xBPj.css","assets/CarteModal-D2oHeQS3.js","assets/CartesCadeaux-DsreVq8k.js","assets/Catalogue-BcbJ1x2D.js","assets/CentreDeCommande-CyT6tgpI.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-uQrB7A2S.js","assets/certificat-XuKQNhtQ.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-Dd70w1yp.js","assets/chiffre-du-jour-pur-4X243TDa.js","assets/ChiffreDesPrestations-BVmGSWYC.js","assets/client-Cv-7E6gW.js","assets/cloture-du-jour-B8SKHxNC.js","assets/ClotureDuTiroir-BG9XyXdx.js","assets/Coffre-CZm_APyt.js","assets/components-Da8xH9Fn.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-I8ajCbX1.js","assets/Comptes-BC6fglz6.js","assets/consultation-CRW6QcWf.css","assets/consultation-Pp2HcYpq.js","assets/Consultations-no-1VWXZ.js","assets/consultNotes-D6xdMGsf.js","assets/Conversations-D4WwB5Zo.css","assets/Conversations-ffGLVspE.js","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-C0th0WmB.js","assets/currency-qfIhGmrs.js","assets/Customers-B2ZJRifj.js","assets/Dashboard-B2x7VsE_.css","assets/Dashboard-DxFKF7ga.js","assets/dates-BVE88X7I.js","assets/Demandes-DIZ0YH2g.js","assets/DepenseEnUnePhrase-BIGRlGqP.css","assets/DepenseEnUnePhrase-CAuManCo.js","assets/Depenses-DJQG9cNB.js","assets/depenses-saisie-CH4P75DR.js","assets/dernier-message-pur-CBYWnq8m.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-DB4A2JYj.js","assets/diagnostics-au-trone-CxpKGxUA.js","assets/Dictee-D2P9yM7v.css","assets/Dictee-kIjDhj0m.js","assets/dictee-pur-CpQwStiC.js","assets/Discussions-9ZUw7C67.js","assets/EditeurDesOffres-CHLnI7dU.js","assets/Encaissements-Ba0hcSk_.js","assets/enfants-BcvkV_sk.js","assets/Engagements-Cj5S9MhG.css","assets/engagements-coffre-VdFiJfqQ.js","assets/Engagements-LeIjzbU4.js","assets/EntreDeuxSeances-i6we3eKx.js","assets/Evaluation-BLyFhCM5.js","assets/Factures-B_rwT5n_.js","assets/FenetreDesCivilites-udEvmp3q.js","assets/FenetreDesCivilites-zfNk1aak.css","assets/FenetreDuPoint-BAvMVmtn.js","assets/Fil-CzpIN84n.js","assets/finances-BMFnlkRx.css","assets/fon-BD3uDJTT.js","assets/Fournisseurs-C6u5uk6Y.js","assets/fournisseurs-DiVwl1wF.js","assets/foyer-7oFu-O5d.js","assets/Gerard-2MVhA5-V.js","assets/Gerard-CP3QOjfk.css","assets/gerard-donnees-CP72f5Tf.js","assets/gestes-conversation-BvN3rDzn.js","assets/HomeRituals-MDvTNAWN.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-Cg07NrO-.js","assets/ia-centre-DqVx6dQO.js","assets/ia-diagnostic-pur-BBLrGY5l.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-tableau-pur-CSRjGtTf.js","assets/identite-BBLnOJLy.js","assets/index-BvLQ2MQR.js","assets/index.es-DpyTLd7p.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-BuSK5aDw.js","assets/jspdf.es.min-DFGzmyJj.js","assets/JustePrix-Nek8684I.js","assets/kkiapay-BXNndwBI.js","assets/kkiapay-widget-DnUhUNd4.js","assets/Laboratoire-B4Xy_jaU.js","assets/LaJournee-BhBRbDQH.js","assets/LaJournee-Bn_G0HCt.css","assets/LesPaiements-BvdfOCbQ.css","assets/LesPaiements-BZfRPJl6.js","assets/LettresAuDossier-DK_cHs6P.js","assets/LienMndPay-BI9j8E2A.js","assets/Marketing-DJkAVuCf.js","assets/MarketingBranche-Bc8Eq5Il.js","assets/Marque-M1Tq8jII.js","assets/MesPourboires-BY4Bu6aj.js","assets/MesPourboires-D9I_9rZf.css","assets/MesTaches-BaeOXVO_.js","assets/MesTaches-Cc4XUDf6.css","assets/momo-C2ZVfV9J.js","assets/MonMois-DvV7rI1H.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/objectifs-Dl89prmL.js","assets/opale-DnOH8HsK.js","assets/oreille-B1AMUmZh.js","assets/paie-du-5-DeJq-K_U.css","assets/paie-du-5-DYRo4JqN.js","assets/paie-du-5-pur-KUPSowHK.js","assets/PaieParMtn-dMRLx9HF.js","assets/paliers-Dvw9nZEG.js","assets/Parametres-B-rCUkWW.js","assets/parcours-CxnV3Xws.js","assets/Parrainages-CSjpU5b8.js","assets/Parrainages-gAHAPB_6.css","assets/PassageAvantLeFauteuil-DgCawACd.js","assets/pdf-BtCpygqf.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/Personas-XPsObAC5.js","assets/Personnel--tTdPTDz.js","assets/photo-B7xtF2lr.js","assets/pilotage-D8kf1Co8.css","assets/Pourboires-C4oBXT5W.js","assets/Predictions-BiFDEmjB.js","assets/Prestataires-D_I4xeUK.js","assets/Prets-BC1ItBhZ.js","assets/PrevisionDuMois-0-EFexeB.js","assets/PrevisionDuMois-DlFTw3OX.css","assets/Previsions-nBP7uBbD.js","assets/previsions-pur-EFknQpYN.js","assets/Previsions-r4v19Anp.css","assets/processus-pur-R6U5QcCi.js","assets/projets-Cccx47Sz.js","assets/Projets-COO7WDEE.css","assets/Projets-D0nCp6Ca.js","assets/projets-pur-2ZEMRNDU.js","assets/protocoles-jgqj1wuK.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-B3IU1KJN.js","assets/qualification-CnPDoGap.js","assets/quiz-5qMPWZVi.js","assets/Rapport-BJbXvLKm.js","assets/Recommandations-WCGWmqJe.js","assets/regler-BGK6gInc.js","assets/regler-C5hcM02_.css","assets/regler-la-seance-serveur-Bs6rzqZX.js","assets/relances-pur-lwRTXc5E.js","assets/releve-des-avis-zJo3uL5w.js","assets/SalonFoyer--nrTh8pT.js","assets/secretariat-admin-B6XtdRZw.js","assets/Secretariat-BbkmNKh8.js","assets/Secretariat-Cy79Zw30.css","assets/Signatures-DoonO0KH.js","assets/SignerUnPdf-CpPYAwoj.js","assets/Synthese-DyUS0rfU.js","assets/SyntheseGraphes-DfRRht0U.js","assets/systeme-TPy-pF7j.css","assets/Tableau-DrzJr_FB.js","assets/temps-rvidhA9i.js","assets/Textes-BjurkAby.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-CkDzpGy0.css","assets/tiroirs-DJxQkHEI.js","assets/trone-CZ9mTRro.js","assets/trone-DRaCbXAi.css","assets/useAudiences-DqYpDII5.js","assets/useClotureDuJour-C7vwvZtT.js","assets/Vitrine-BWilTqQJ.css","assets/Vitrine-CZZluYEo.js","assets/_admin-OcGvXwdv.js","assets/_contrat-BrJe-qkl.js","assets/_heures-BmQ6VaKv.js","assets/_reuni-BX0fYPEG.js","assets/_shared-C6HyZOTE.js","assets/_signature-BMm-YBe5.js","assets/_ui-BrUDlmuM.css","assets/_ui-IDtwclnM.js"];
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
