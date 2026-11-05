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
const BUILD = "20261105230137";
const A_GARDER = ["./","assets/Abonnements-7taef3Ko.js","assets/abonnements-i7ZD1_t1.js","assets/Academie-CjSBMu1v.js","assets/Acces-CkMXZmTG.js","assets/AFaire-CUGNkEyL.js","assets/afaire-O8WsIceS.js","assets/agents-donnees-CT2U_zue.js","assets/Agents-LEr6pgmX.css","assets/Agents-lXsEgwbU.js","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-DVpGFzw3.js","assets/Appels--_Toxzm2.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/Assistants-D9i2Xwmg.css","assets/Assistants-ovuSQf8r.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/AtelierDesContenus-etAOKj1H.js","assets/Audience-D2vAKHiP.js","assets/Aujourdhui-FS40_npx.js","assets/avant-le-fauteuil-lecture-DZVioSOG.js","assets/AvantLeFauteuil-BJ_9QnqQ.js","assets/avis-fiches-BHNcaRQ_.js","assets/AvisGoogle-Ct7f30wK.js","assets/AvisGoogle-DaPXfwX9.css","assets/bilan-B-bfPYR0.css","assets/bilan-BFHH4ptR.js","assets/BilanMensuel-g_J96wVR.js","assets/Branches-DAXTWb31.js","assets/bridges-CwAcgi_3.js","assets/Caisse-DDTODIgq.js","assets/caisse-du-soir-C6vPx-E_.css","assets/caisse-du-soir-CSYpAbf0.js","assets/Caisses-DBnq6xvq.js","assets/Calendrier-cUhCoNtu.js","assets/campagnes-pur-BaDdKAmI.js","assets/Carnet-_5ermDk9.js","assets/carte-COh2eGkj.js","assets/carte-_W_-xBPj.css","assets/CarteModal-dBg1GKnb.js","assets/CartesCadeaux-JguEIedj.js","assets/Catalogue-CC60wmSZ.js","assets/CentreDeCommande-cNhk2Ux7.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-hGHhXntM.js","assets/certificat-CAdg42D_.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-BRA5IYSr.js","assets/chiffre-du-jour-pur-DG5ilulZ.js","assets/ChiffreDesPrestations-DGWdUJFC.js","assets/client-CbdTeq6I.js","assets/cloture-du-jour-DBhVAM-6.js","assets/ClotureDuTiroir-BF_Yu1BX.js","assets/Coffre-puWxADCD.js","assets/components-DKZesyvx.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-Co3rAfpD.js","assets/Comptes-D54gdmg4.js","assets/consultation-CG4L4rtC.js","assets/consultation-CRW6QcWf.css","assets/Consultations-Nr8KRd1p.js","assets/consultNotes-sg_fBdWB.js","assets/Conversations-D4WwB5Zo.css","assets/Conversations-DNSWyM-S.js","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-DNbINpDB.js","assets/currency-qfIhGmrs.js","assets/Customers-g3WpHcgX.js","assets/Dashboard-B2x7VsE_.css","assets/Dashboard-CucCauQW.js","assets/dates-vDc3fL8o.js","assets/Demandes-RuBBz1NB.js","assets/DepenseEnUnePhrase-BIGRlGqP.css","assets/DepenseEnUnePhrase-UuOfYYfx.js","assets/Depenses-BWe8afhR.js","assets/depenses-saisie-B_qVjfU6.js","assets/dernier-message-pur-CBYWnq8m.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-PSyYDpVH.js","assets/diagnostics-au-trone-Ddl98Wjj.js","assets/Dictee-Bv8vziXd.js","assets/Dictee-D2P9yM7v.css","assets/dictee-pur-CUnNdWsh.js","assets/Discussions-DLsSfeJo.js","assets/EditeurDesOffres-D1YYq8p9.js","assets/Encaissements-J5CWXojs.js","assets/enfants-C6lHbIca.js","assets/Engagements-Cj5S9MhG.css","assets/Engagements-D5I5_O4w.js","assets/EntreDeuxSeances-C7IZjGL4.js","assets/Evaluation-CVX71YiG.js","assets/Factures-zuTqodiZ.js","assets/FenetreDesCivilites-CjAJdaYQ.js","assets/FenetreDesCivilites-zfNk1aak.css","assets/FenetreDuPoint-BiW989I-.js","assets/Fil-CcrLWF6T.js","assets/finances-BMFnlkRx.css","assets/fon-Btm-2ZCf.js","assets/Fournisseurs-CpUuAUvp.js","assets/fournisseurs-WouhFiBN.js","assets/foyer-B2NdMnOD.js","assets/Gerard-CP3QOjfk.css","assets/gerard-donnees-DByvAamB.js","assets/Gerard-DrRNyaZb.js","assets/gestes-conversation-Cl6oRrc0.js","assets/HomeRituals-CyAz6loS.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-DZrXmY4v.js","assets/ia-centre-CtmfE-u9.js","assets/ia-diagnostic-pur-BBLrGY5l.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-tableau-pur-CSRjGtTf.js","assets/identite-CtHdCDlE.js","assets/index-ZH4u3VHn.js","assets/index.es-GWsWjEWe.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-DYf_JICL.js","assets/jspdf.es.min-DnmVIj53.js","assets/JustePrix-QLb7AzAT.js","assets/kkiapay-C7GRFzTn.js","assets/kkiapay-widget-DnUhUNd4.js","assets/Laboratoire-U-tGd4Ro.js","assets/LaJournee-Bgmv2uLj.js","assets/LaJournee-Bn_G0HCt.css","assets/LettresAuDossier-BmpWHVMb.js","assets/LienMndPay-C61z1X95.js","assets/Marketing-6ZI4Rlok.js","assets/MarketingBranche-C72_yaLO.js","assets/Marque-KE1TFjl6.js","assets/MesPourboires-BixWdcWs.js","assets/MesPourboires-D9I_9rZf.css","assets/MesTaches-BGATSyk2.js","assets/MesTaches-Cc4XUDf6.css","assets/momo-C2ZVfV9J.js","assets/MonMois-c_PUNEUw.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-ClGvahhm.js","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/opale-D2JFs64A.js","assets/oreille-B1AMUmZh.js","assets/paie-du-5-DeJq-K_U.css","assets/paie-du-5-DGjc2mTn.js","assets/paliers-B0rYaZAj.js","assets/Parametres-DTha14fe.js","assets/parcours-Dg-pc9Oa.js","assets/Parrainages-0he4zzN9.js","assets/Parrainages-gAHAPB_6.css","assets/PassageAvantLeFauteuil-Dm0-NDR4.js","assets/pdf-CDwLQrNe.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/Personas-BvFPnBr1.js","assets/Personnel-BafjPlYe.js","assets/photo-Mp6WUorb.js","assets/pilotage-D8kf1Co8.css","assets/Pourboires-4DJsuPap.js","assets/Predictions-Ci_JwC_F.js","assets/Prestataires-CgWHZ0GG.js","assets/Prets-DsS66cLY.js","assets/PrevisionDuMois-DlFTw3OX.css","assets/PrevisionDuMois-DN5R9xg4.js","assets/Previsions-CE3FsmJM.js","assets/previsions-pur-tMrka-QP.js","assets/Previsions-r4v19Anp.css","assets/processus-pur-R6U5QcCi.js","assets/Projets-BATVf5Mw.js","assets/Projets-COO7WDEE.css","assets/projets-CtNKN1uj.js","assets/projets-pur-2ZEMRNDU.js","assets/protocoles-BNdQ7PdC.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-DRb7y918.js","assets/qualification-C8Z_cd7g.js","assets/quiz-5qMPWZVi.js","assets/Rapport-BQ1w_195.js","assets/Recommandations-BqAAJSHd.js","assets/regler-C5hcM02_.css","assets/regler-CL_L95UT.js","assets/regler-la-seance-serveur-Bs6rzqZX.js","assets/relances-pur-lwRTXc5E.js","assets/releve-des-avis-Do56aMfY.js","assets/SalonFoyer-BkbMZZg_.js","assets/secretariat-admin-C9jtCijX.js","assets/Secretariat-Cy79Zw30.css","assets/Secretariat-DIhyi-t9.js","assets/Signatures-CXslOkT9.js","assets/SignerUnPdf-DotFEqWW.js","assets/Synthese-aGjVBAHP.js","assets/SyntheseGraphes-BEbVT9e5.js","assets/systeme-TPy-pF7j.css","assets/Tableau-CzhAUQMS.js","assets/temps-Both5x8s.js","assets/Textes-C8wcbx6d.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-CkDzpGy0.css","assets/tiroirs-DJtTadhb.js","assets/trone-CXANnLBy.js","assets/trone-DQVzvvmA.css","assets/useAudiences-CWlpGMmx.js","assets/useClotureDuJour-txoDusL5.js","assets/Vitrine-Bdc4-TH2.js","assets/Vitrine-BWilTqQJ.css","assets/_admin-BAc6gAC-.js","assets/_contrat-DtkoqmrQ.js","assets/_heures-ljP1UJlK.js","assets/_reuni-CgfqWOxc.js","assets/_shared-qHHrm87a.js","assets/_signature-DicXLdze.js","assets/_ui-B0YvsKIX.js","assets/_ui-BWMA-PlM.css"];
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
