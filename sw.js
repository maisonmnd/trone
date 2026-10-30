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
const BUILD = "20261030013021";
const A_GARDER = ["./","assets/Abonnements-DMKkWqr3.js","assets/abonnements-fjipTCOc.js","assets/Academie-BJaMFhN1.js","assets/Acces-LhBh8AoC.js","assets/actions-CwxilsQe.js","assets/AFaire-B4PIzGqg.js","assets/afaire-CerV2kEO.js","assets/Agents-AluTPYBC.js","assets/agents-donnees-BD7k6DgQ.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-C4sNYhpt.js","assets/Appels-Clmkt7nH.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/AtelierDesContenus-B-RmLhHV.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/AuComptoir-D8LN0DX5.js","assets/Audience-Cd-Dcfo-.js","assets/Aujourdhui-C3RKuazE.js","assets/avis-fiches-BA55AIM1.js","assets/AvisGoogle-BEHs-rzl.js","assets/AvisGoogle-DaPXfwX9.css","assets/bilan-B-bfPYR0.css","assets/bilan-CAcli0FK.js","assets/BilanMensuel-D2MjbDwY.js","assets/Branches-DfjlP0Yy.js","assets/bridges-lfGBJa6z.js","assets/Caisse-6uPDjvLJ.js","assets/caisse-du-soir-Bjx4MBu5.js","assets/Caisses-qyjnlsjm.js","assets/Calendrier-iu8Z6ZUH.js","assets/campagnes-pur-x99AQJSX.js","assets/Carnet-CzbntaDx.js","assets/carte-Br2q_FIT.js","assets/carte-_W_-xBPj.css","assets/CarteModal-BX9qVwEb.js","assets/CartesCadeaux-BTvIrIe3.js","assets/Catalogue-DG7A2pgy.js","assets/CentreDeCommande-BjpL6NTy.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-C49VIXJv.js","assets/certificat-CO9uihSs.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-P4JFx4L5.js","assets/chiffre-du-jour-pur-nyZ3pWzf.js","assets/ChiffreDesPrestations-egzqWwPO.js","assets/client-dUZ7jVWj.js","assets/ClotureDuTiroir-C6vPx-E_.css","assets/ClotureDuTiroir-I30guui4.js","assets/Coffre-GSDEHhRr.js","assets/components-DrpvCyu2.js","assets/compte-courant-ByzulCEN.js","assets/compte-Cq-qtHvO.js","assets/CompteCourant-Cjc1ihkx.js","assets/Comptes-DpfdH19t.js","assets/Comptoir-OiEmKbho.js","assets/consultation-B2JlNmvk.js","assets/consultation-CRW6QcWf.css","assets/Consultations-B7rWXdaV.js","assets/consultNotes-DbpV-eQk.js","assets/Conversations-CSsDrAgp.js","assets/Conversations-D4WwB5Zo.css","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-5gTqKm2q.js","assets/currency-qfIhGmrs.js","assets/Customers-DZoKnT6g.js","assets/Dashboard-DBMNg7BK.js","assets/Dashboard-zjGteuUE.css","assets/dates-CSkP9cHz.js","assets/Demandes-JjgUXOVC.js","assets/Depenses-RC4DojJF.js","assets/dernier-message-pur-CBYWnq8m.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-DF0PIp52.js","assets/diagnostics-au-trone-BODfKq6q.js","assets/Discussions-CG5xYpM2.js","assets/EditeurDesOffres-B2tLr2Rd.js","assets/Encaissements-DpndvEIQ.js","assets/enfants-BwrkzzvR.js","assets/Engagements-Cj5S9MhG.css","assets/Engagements-D8Ii7f_P.js","assets/EntreDeuxSeances-zUCe8qls.js","assets/equipe-B_9ZHz24.css","assets/Evaluation-q7ZABQAN.js","assets/FacturePrestataire-oTselIIC.js","assets/Factures-Bk7kIuqj.js","assets/FenetreDesCivilites-64zGYg_Z.js","assets/FenetreDesCivilites-zfNk1aak.css","assets/FenetreDuPoint-BFlBDj87.js","assets/Fil-DuoQrkhM.js","assets/finances-BMFnlkRx.css","assets/fon-B2uAzrZy.js","assets/fon-pur-CgVkbJ8O.js","assets/Fournisseurs-BPPxukqC.js","assets/fournisseurs-c9Kc7ao1.js","assets/foyer-DetG_tr6.js","assets/Gerard-BFO4pw1A.js","assets/Gerard-C9ljG_Nk.css","assets/gerard-donnees-B7Km1haN.js","assets/gestes-conversation-Dt5VnRnN.js","assets/HomeRituals-DUuRPFPO.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-DPBucBka.js","assets/ia-centre-MUkOgJVd.js","assets/ia-diagnostic-pur-hHYxp10Y.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-recu-pur-DcucZqpR.js","assets/identite-DvOZzRgI.js","assets/index-LVWpzkcU.js","assets/index.es-DPPfGow0.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-JfyQ8tPm.js","assets/jspdf.es.min-Cz79PJ0h.js","assets/JustePrix-CZAUv4mX.js","assets/kkiapay-DrP6uHQy.js","assets/kkiapay-widget-DnUhUNd4.js","assets/Laboratoire-CgzvA91c.js","assets/laboratoire-DmdEI3Pd.js","assets/LettresAuDossier-CR6_KHDv.js","assets/LienMndPay-C4cCLaRI.js","assets/maisons-CSSFrqZy.js","assets/Marketing-C-yA2e8i.js","assets/MarketingBranche-CxGDG4gO.js","assets/Marque-C6S5sLPl.js","assets/MesTaches-BomHLosN.js","assets/MesTaches-Cc4XUDf6.css","assets/momo-B-QSeWY6.js","assets/MonMois-Cfb_3q_y.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-CasNWazJ.js","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/paliers-H0VdB-HK.js","assets/Parametres-BQZfAIMF.js","assets/parcours-DfuX3YA0.js","assets/Parrainages-BExUv58O.js","assets/Parrainages-gAHAPB_6.css","assets/pdf-CV0rg3Ig.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/Personas-Dj9GJbFZ.js","assets/Personnel-C1EngEYW.js","assets/photo-bW41NmaV.js","assets/pilotage-D8kf1Co8.css","assets/Predictions-CxPk2neV.js","assets/prestataires-CWW4Qcs2.js","assets/Prestataires-DJX124Pr.js","assets/Prets-bIx6N55z.js","assets/prevision-du-mois-pur-D6sJa5lw.js","assets/Previsions-BVigRegZ.js","assets/Previsions-D-0__Buz.css","assets/previsions-pur-CdiQ7tAO.js","assets/processus-pur-BLN25j-E.js","assets/projets-BdO2rRrP.js","assets/Projets-COO7WDEE.css","assets/Projets-jbJ07KEf.js","assets/projets-pur-2ZEMRNDU.js","assets/protocoles-BMl-L1db.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-WRyw425M.js","assets/qualification-C83f0MB9.js","assets/quiz-5qMPWZVi.js","assets/Rapport-DeUGOKmV.js","assets/RattacherUneCarte-P6Q_rukB.js","assets/Recommandations-BoqpZnYt.js","assets/regler-C5hcM02_.css","assets/regler-D3sYx7bi.js","assets/regler-la-seance-serveur-Bs6rzqZX.js","assets/relances-pur-CTGdiNru.js","assets/releve-des-avis-B8H3eSUt.js","assets/SalonFoyer-Bny6JA70.js","assets/secretariat-admin-Bwa1fd8o.js","assets/Secretariat-BaFAqEeO.js","assets/Secretariat-Cy79Zw30.css","assets/Signatures-DHvSdlFz.js","assets/SignerUnPdf-fzHYqE_5.js","assets/Synthese-BYboHxAS.js","assets/SyntheseGraphes-C89HVwy3.js","assets/systeme-TPy-pF7j.css","assets/Tableau-C0PgybZY.js","assets/temps-jwfo1J83.js","assets/Textes-BEFyqlst.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-BE3xfkNV.js","assets/trace-du-moyen-pur-Bx8-suHn.js","assets/trone-BMdkuVGH.css","assets/trone-FWCvxK_n.js","assets/ui-B_2KaqL_.js","assets/useAudiences-ImUmkaPv.js","assets/vente-C7YWXkHo.css","assets/Vitrine-6IuIPIHH.js","assets/Vitrine-BWilTqQJ.css","assets/_admin-BDREy2gu.js","assets/_contrat-DoplETDB.js","assets/_heures-B46JcWA-.js","assets/_reuni-BvIo-mLf.js","assets/_shared-NIlOJEvz.js","assets/_signature-BSce74Hh.js","assets/_ui-BWMA-PlM.css","assets/_ui-xTQaDOeE.js"];
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
