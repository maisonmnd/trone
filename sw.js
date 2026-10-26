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
const BUILD = "20261026141352";
const A_GARDER = ["./","assets/abonnements-CDKNWQPf.js","assets/Abonnements-DjR469jn.js","assets/Academie-BgBbVBqi.js","assets/Acces-BUETLnUi.js","assets/actions-NLmyIQsu.js","assets/AFaire-CszQ6ZKe.js","assets/afaire-DTkcqMFK.js","assets/agents-donnees-Bp9kUZeg.js","assets/Agents-EXwZgbEO.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-CQWIaSvF.js","assets/Appels-0XgnQaHU.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/AtelierDesContenus-CKLhWK2Z.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/AuComptoir-BRigJthC.js","assets/Aujourdhui-DUx70b_N.js","assets/avis-fiches-DfT709og.js","assets/AvisGoogle-BXmnoSNO.js","assets/AvisGoogle-DaPXfwX9.css","assets/bilan-B-bfPYR0.css","assets/bilan-KK-CO3UU.js","assets/BilanMensuel-Cfh6qO2e.js","assets/Branches-C26js30U.js","assets/bridges-CkvKJNwD.js","assets/Caisse-Cbc_vwGE.js","assets/caisse-du-soir-DWAl2aL4.js","assets/Caisses-BBplr9WQ.js","assets/Calendrier-1U8eNRGd.js","assets/Carnet-DKpbLLWx.js","assets/carte-VAtX0q0f.js","assets/carte-_W_-xBPj.css","assets/CarteModal-z9GwAoGW.js","assets/CartesCadeaux-DNS382gW.js","assets/Catalogue-CbEkKZt2.js","assets/CentreDeCommande-Dhr3u0RC.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-DEplIJS9.js","assets/certificat-CnKEJe5_.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-D9q6m2hH.js","assets/chiffre-du-jour-pur-_e0e3qQm.js","assets/ChiffreDesPrestations-CEPCJ_6a.js","assets/client-DTbIo0zc.js","assets/ClotureDuTiroir-C0Ye5r91.js","assets/ClotureDuTiroir-C6vPx-E_.css","assets/Coffre-bJcGrlKW.js","assets/components-C5_s9-u-.js","assets/compte-BMlGmKk1.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-CbziHBY_.js","assets/Comptes-CxL_BURi.js","assets/Comptoir-DXnrdzA2.js","assets/consultation-CRW6QcWf.css","assets/consultation-D01n19tV.js","assets/Consultations-ZZAIvyWk.js","assets/consultNotes-lXuTcJ-h.js","assets/Conversations-BJvsigen.js","assets/Conversations-D4WwB5Zo.css","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-Bu_KJr53.js","assets/currency-qfIhGmrs.js","assets/Customers-DF9ilI00.js","assets/Dashboard-B8qK6Flt.css","assets/Dashboard-CokWB9wW.js","assets/dates-B4NIlTxQ.js","assets/Demandes-YGqYJqo6.js","assets/Depenses-Cad2Fzd3.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-DrZ31Ahj.js","assets/diagnostics-au-trone-ByDPCTtJ.js","assets/Discussions-CE6wtwdl.js","assets/Encaissements-DHvvsOxS.js","assets/enfants-CR2Ubh3W.js","assets/Engagements-Bujgmr9q.js","assets/Engagements-Cj5S9MhG.css","assets/EntreDeuxSeances-WM0CFM6e.js","assets/equipe-B_9ZHz24.css","assets/Evaluation-Btgdp7qu.js","assets/FacturePrestataire-Dt8eT1Yo.js","assets/Factures--Hrrc7bs.js","assets/Fil-Bzxe4BEo.js","assets/finances-BMFnlkRx.css","assets/fon-DFvEbiUi.js","assets/fon-pur-CgVkbJ8O.js","assets/Fournisseurs-BOq4jPWQ.js","assets/fournisseurs-DIJNAIeR.js","assets/foyer-CXzPGROX.js","assets/gestes-conversation-CCnfD5O6.js","assets/HomeRituals-CGNUbb4j.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-DjnAy22b.js","assets/ia-diagnostic-pur-BulIFgZQ.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-recu-pur-DcucZqpR.js","assets/identite-BcLtBxgi.js","assets/index-CnC1rG3g.js","assets/index.es-diUPQgOf.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-DkcF3YTC.js","assets/jspdf.es.min-DZ3CtZd2.js","assets/JustePrix-DNO2UwEL.js","assets/kkiapay-DNdaiZHD.js","assets/kkiapay-widget-DnUhUNd4.js","assets/Laboratoire-C2VaHJdP.js","assets/laboratoire-E2nMEAib.js","assets/LettresAuDossier-DquQS9xQ.js","assets/LienMndPay-DudXNv2e.js","assets/maisons-CSSFrqZy.js","assets/Marketing-D9ISLDRK.js","assets/Marque-Cr9LERxn.js","assets/MesTaches-Cc4XUDf6.css","assets/MesTaches-C_q9bCug.js","assets/momo-C2ZVfV9J.js","assets/MonMois-hQ-eyksB.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-des-fauteuils-pur-CW46U8VG.js","assets/objectifs-DYwh9PWH.js","assets/paliers-DtNqj_qd.js","assets/Parametres-DNDJeZGs.js","assets/parcours-cSJ2JjwW.js","assets/Parrainages-Ce3tARQm.js","assets/Parrainages-gAHAPB_6.css","assets/pdf-BnC0eidK.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/Personas-82IUP_hK.js","assets/Personnel-DunLIRsJ.js","assets/photo-CTO9ZKWC.js","assets/pilotage-D8kf1Co8.css","assets/Predictions-BOKsQ6rK.js","assets/Prestataires-BX3krIJV.js","assets/prestataires-DMGu2mkz.js","assets/Prets-BzZoFj8f.js","assets/prevision-du-mois-pur-BiqzNpDz.js","assets/Previsions-CL_3aiPm.js","assets/Previsions-CNJJOEzN.css","assets/projets-BZPn88Z-.js","assets/Projets-C-1qzYre.js","assets/Projets-COO7WDEE.css","assets/projets-pur-2ZEMRNDU.js","assets/protocoles-xddwxhRV.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-CjllrLvP.js","assets/qualification-B62NcdQN.js","assets/quiz-5qMPWZVi.js","assets/Rapport-B5Xa3mhb.js","assets/RattacherUneCarte-BjZ43yPc.js","assets/Recommandations-BIs4lH9Q.js","assets/regler-C5hcM02_.css","assets/regler-DA3l_hEP.js","assets/regler-la-seance-serveur-BpExlC5z.js","assets/relances-pur-DsIo28uB.js","assets/releve-des-avis-BsSqKr5x.js","assets/SalonFoyer-TzH3C_Yq.js","assets/Secretariat-0NK8dCzv.js","assets/secretariat-admin-BYOGn4qu.js","assets/Secretariat-Cy79Zw30.css","assets/Signatures-DJ9cpsOn.js","assets/SignerUnPdf-DVBGZrfT.js","assets/Synthese-BnyHSKLw.js","assets/SyntheseGraphes-DNR3mFrE.js","assets/systeme-C3XFIa8E.css","assets/Tableau-CGtBmdBY.js","assets/Textes-67djTK_F.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-DaxMJBK-.js","assets/trace-du-moyen-pur-Bx8-suHn.js","assets/trone-4hOToRj5.js","assets/trone-DQkO48Va.css","assets/ui-kyQBcCy4.js","assets/useAudiences-CtxaNeTL.js","assets/vente-C7YWXkHo.css","assets/Vitrine-BWilTqQJ.css","assets/Vitrine-hqkp3SQ4.js","assets/_admin-BI6lpPlN.js","assets/_contrat-Dre_SY7z.js","assets/_heures-DwsYgfBb.js","assets/_reuni-CA9niTvV.js","assets/_shared-DMDruFg8.js","assets/_signature-C2673yeZ.js","assets/_ui-BWMA-PlM.css","assets/_ui-D7puv6h3.js"];
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
