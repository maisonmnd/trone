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
const BUILD = "20261111173316";
const A_GARDER = ["./","assets/abonnements-B6w_fM-3.js","assets/Abonnements-BxOEJwXY.js","assets/Abonnements-DTY7p2DH.css","assets/Academie-D3MwlI0N.js","assets/Acces-BiIRM95S.js","assets/AFaire-CZ4XEtpf.js","assets/afaire-JkXq-ft8.js","assets/agents-donnees-BJz1952z.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Agents-thl1QzDQ.js","assets/Analytics-DqBdDloo.js","assets/Appels-D__x1rNj.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/Assistants-CAIrmNs1.js","assets/Assistants-D9i2Xwmg.css","assets/AtelierDesContenus-BHa7X47T.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/Audience-t11nIwwS.js","assets/Aujourdhui-B_OdEGUe.js","assets/avant-le-fauteuil-lecture-CJC9hK0P.js","assets/AvantLeFauteuil-DGUd8aqy.js","assets/avis-fiches-Dih-inIV.js","assets/AvisGoogle-BD47_XgB.js","assets/AvisGoogle-DaPXfwX9.css","assets/BadgeEssai-zNha9OTj.js","assets/bilan-B-bfPYR0.css","assets/bilan-CzAe3-lq.js","assets/BilanMensuel-DN0u044r.js","assets/Branches-DSQzoocd.js","assets/bridges-DjViB8A7.js","assets/caisse-du-soir-C6vPx-E_.css","assets/caisse-du-soir-DV95mJ4z.js","assets/Caisse-MkhGL08-.js","assets/Caisses-Dsv1BIhm.js","assets/Calendrier-BQ1MdAi9.js","assets/campagnes-pur-DkIJwd18.js","assets/Carnet-BrNKBFmL.js","assets/carte-BeP7-bYD.js","assets/carte-_W_-xBPj.css","assets/CarteModal-CtDv6WYq.js","assets/CartesCadeaux-CFq_KLlw.js","assets/Catalogue-DuUFe4Gb.js","assets/CentreDeCommande-BZ5ktKWp.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-Cv1W3AVu.js","assets/certificat-D5uNrR5i.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-DLc_pyHy.js","assets/chiffre-du-jour-pur-CHAG2P9N.js","assets/ChiffreDesPrestations-DE77nLlF.js","assets/client-C47CGL5V.js","assets/cloture-du-jour-BHcsOzGy.js","assets/ClotureDuTiroir-DQARFiyM.js","assets/Coffre-Cz7FvUPZ.js","assets/components-_5_uCK0l.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-PJbxmJWa.js","assets/Comptes-CHwUDW41.js","assets/consultation-CQaaYQOY.js","assets/consultation-CRW6QcWf.css","assets/Consultations-D8Hrktll.js","assets/consultNotes-RPNd2Ws1.js","assets/Conversations-D4WwB5Zo.css","assets/Conversations-_XUKNFpi.js","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-BOMIWN0m.js","assets/currency-qfIhGmrs.js","assets/Customers-Bb9Tcsjm.js","assets/Dashboard-B1Guv2kU.js","assets/Dashboard-B2x7VsE_.css","assets/dates-CRZ5cf41.js","assets/Demandes-2dvGOI0V.js","assets/DepenseEnUnePhrase-BIGRlGqP.css","assets/DepenseEnUnePhrase-w-k_5HqU.js","assets/Depenses-CAWxHeUD.js","assets/depenses-saisie-Ci5V0814.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-D8cd3uDG.js","assets/diagnostics-au-trone-B8Rsyjyv.js","assets/Dictee-D2P9yM7v.css","assets/Dictee-G_Ey_ufa.js","assets/dictee-pur-BNOM5cms.js","assets/Discussions-CMAO0Mai.js","assets/EditeurDesOffres-3eSFEUKn.js","assets/Encaissements-BnKq-28l.js","assets/enfants-CZp4oyn2.js","assets/Engagements-BicCnIjU.js","assets/Engagements-Cj5S9MhG.css","assets/engagements-coffre-CMKAJ4wu.js","assets/EntreDeuxSeances-B45X6guB.js","assets/Evaluation-C6xfHMky.js","assets/Factures-BR7Fm-05.js","assets/FenetreDesCivilites-P7QQC0hE.js","assets/FenetreDesCivilites-zfNk1aak.css","assets/FenetreDuPoint-CwDKDT6d.js","assets/Fil-5Nvtc8tV.js","assets/finances-BMFnlkRx.css","assets/fon-BQtNIUVl.js","assets/fournisseurs-C0PiOUex.js","assets/Fournisseurs-SxeCYBuV.js","assets/foyer-Dc5TnOqg.js","assets/Gerard-Cgj-zsJh.css","assets/gerard-donnees-DFKvKEjW.js","assets/Gerard-DOpsim5H.js","assets/gestes-conversation-CyUTGiUc.js","assets/heures-des-rappels-pur-Dig9pZpo.js","assets/HomeRituals-BkJ5JiSd.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-7ysdixFd.js","assets/ia-centre-CVn5bPv5.js","assets/ia-diagnostic-pur-BBLrGY5l.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-tableau-pur-p6UvREJe.js","assets/identite-CjlOjlEV.js","assets/index-CGMzzYi-.js","assets/index.es-D7gxWwAo.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-BSC5f9W0.js","assets/jspdf.es.min-pWBvIhBX.js","assets/JustePrix-e0jRmAGt.js","assets/kkiapay-uBbCxvng.js","assets/kkiapay-widget-DnUhUNd4.js","assets/Laboratoire-BxFmTUnQ.js","assets/LaJournee-Bn_G0HCt.css","assets/LaJournee-DytqvrCZ.js","assets/LesPaiements-C9cEZlne.css","assets/LesPaiements-q2MSDhIY.js","assets/LettresAuDossier-CCwcj489.js","assets/LienMndPay-D1M_RJ0h.js","assets/Marketing-DvPYXo0k.js","assets/MarketingBranche-BLe6AjFj.js","assets/Marque-DWSQitcY.js","assets/MesPourboires-BU0JkRrF.js","assets/MesPourboires-CENjelyb.css","assets/MesTaches-Cc4XUDf6.css","assets/MesTaches-DN8Plv5X.js","assets/momo-C2ZVfV9J.js","assets/MonMois-Zqt3yhjV.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-BNmYWZSU.js","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/opale-C-NjRFQt.js","assets/oreille-B1AMUmZh.js","assets/paie-du-5-DeJq-K_U.css","assets/paie-du-5-DsYpopyZ.js","assets/paie-du-5-pur-BsJwk5st.js","assets/PaieParMtn-7wbkU0LI.js","assets/paliers-FrXnLezi.js","assets/Parametres-DH-CZYm0.js","assets/parcours-Dz8gvtek.js","assets/Parrainages-CT1rYcM8.js","assets/Parrainages-gAHAPB_6.css","assets/PassageAvantLeFauteuil-fvD3mkfx.js","assets/pdf-DQus2BjV.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/periode-des-pourboires-pur-BUWqfwov.js","assets/Personas-eLbTRrVy.js","assets/Personnel-CG9MToW4.js","assets/photo-l_WwC8KW.js","assets/pilotage-D8kf1Co8.css","assets/Pourboires-DzQsGuT8.js","assets/Predictions-C7IBoKeC.js","assets/Prestataires-EGmIG5H8.js","assets/Prets-WzMaStkY.js","assets/PrevisionDuMois-D8Z05OZa.js","assets/PrevisionDuMois-DlFTw3OX.css","assets/Previsions-9BU2Vg1T.css","assets/Previsions-BpupimdZ.js","assets/previsions-pur-6RJehxCk.js","assets/processus-pur-R6U5QcCi.js","assets/projets-Bq1T8DOR.js","assets/Projets-CG-wwFO6.js","assets/Projets-COO7WDEE.css","assets/projets-pur-2ZEMRNDU.js","assets/protocoles-91pWA9Fd.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-Dp6-ZzaB.js","assets/qualification-CZAQfV9R.js","assets/quiz-5qMPWZVi.js","assets/Rapport-BkNv9D6y.js","assets/Recommandations-BBEiUMSw.js","assets/regler-C5hcM02_.css","assets/regler-la-seance-serveur-Bs6rzqZX.js","assets/regler-Sx9iYSt1.js","assets/relances-pur-BacTXlI2.js","assets/releve-des-avis-BPlQQBsT.js","assets/SalonFoyer-B1m-otGp.js","assets/secretariat-admin-BPeksXRV.js","assets/Secretariat-BGKTdtLY.js","assets/Secretariat-Cy79Zw30.css","assets/Signatures-Dt-LjDxB.js","assets/SignerUnPdf-BPYtl7Sg.js","assets/Synthese-CGJDA52-.js","assets/SyntheseGraphes-B1_Xwx6N.js","assets/systeme-TPy-pF7j.css","assets/Tableau-B-0jO27N.js","assets/temps-D-o4GDkc.js","assets/Textes-BwLf1G0z.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-CkDzpGy0.css","assets/tiroirs-D_uJQrl0.js","assets/trone-Blush-eQ.js","assets/trone-wE0OFAgL.css","assets/useAudiences-BoVxgEFE.js","assets/useClotureDuJour-BmRcNpZs.js","assets/Vitrine-BWilTqQJ.css","assets/Vitrine-DFBvHiSo.js","assets/_admin-B9mdd98I.js","assets/_contrat-BWjpUD6W.js","assets/_reuni-CiCM6oEP.js","assets/_shared-CkaYY1br.js","assets/_signature-OVSRvER-.js","assets/_ui-BrUDlmuM.css","assets/_ui-CP-7sXgL.js"];
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
