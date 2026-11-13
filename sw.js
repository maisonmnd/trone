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
const BUILD = "20261113055534";
const A_GARDER = ["./","assets/Abonnements-CiwVoqln.js","assets/abonnements-DL-Y0DRy.js","assets/Abonnements-DTY7p2DH.css","assets/Academie-dVbFe-t9.js","assets/Acces-rrYJaTJY.js","assets/AFaire-BAKNIxfg.js","assets/afaire-PmuJ_OSR.js","assets/agents-donnees-BmyFX3IT.js","assets/Agents-Ky3giVwj.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-1w-L0krK.js","assets/Appels-D2ofZ9dB.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/Assistants-D9i2Xwmg.css","assets/Assistants-DuZFMEF6.js","assets/AtelierDesContenus-C7XNTCMS.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/Audience-U50cvSV1.js","assets/Aujourdhui-f6wwuoGs.js","assets/avant-le-fauteuil-lecture-CUHISFHl.js","assets/AvantLeFauteuil-CNfILTJ3.js","assets/avis-fiches-D7OQhCeG.js","assets/AvisGoogle-DaPXfwX9.css","assets/AvisGoogle-jtMQ0dwW.js","assets/BadgeEssai-BAzyX0aA.js","assets/bilan-B-bfPYR0.css","assets/bilan-Cs4dmX1-.js","assets/BilanMensuel-Ce6alNLW.js","assets/Branches-KPaA3O9M.js","assets/bridges-CekG0Gav.js","assets/caisse-du-soir-C6vPx-E_.css","assets/caisse-du-soir-EPzfG665.js","assets/Caisse-q_4LfC6q.js","assets/Caisses-NJleoCfH.js","assets/Calendrier-D2SghG1u.js","assets/campagnes-pur-JABbdGt9.js","assets/Carnet-BP-pKxbo.js","assets/carte-CrlGQ-jV.js","assets/carte-_W_-xBPj.css","assets/CarteModal-BW77OrNH.js","assets/CartesCadeaux-Bh_krFCE.js","assets/Catalogue-puSqVJ6h.js","assets/CentreDeCommande-18s-3GQB.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-DfXX1LNP.js","assets/certificat-B4URZxDB.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-vthH3qkF.js","assets/chiffre-du-jour-pur-Bod7s2vh.js","assets/ChiffreDesPrestations-KGjyCv6I.js","assets/client-CA8b-ofP.js","assets/cloture-du-jour--ebf7ru5.js","assets/ClotureDuTiroir-wE0n-QUT.js","assets/Coffre-BnEVobyI.js","assets/collecte-mtn-pur-BNcoIxD6.js","assets/components-CDkuffvY.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-ButFadXz.js","assets/Comptes-NkxCrtU5.js","assets/consultation-CbWuhLAr.js","assets/consultation-CRW6QcWf.css","assets/Consultations-B3dwToT_.js","assets/consultNotes-BHCuSs3j.js","assets/Conversations-CX0RtpVG.js","assets/Conversations-D4WwB5Zo.css","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-B67r5EvC.js","assets/currency-qfIhGmrs.js","assets/Customers-B1N3nA54.js","assets/Dashboard-B2x7VsE_.css","assets/Dashboard-BWPGWniW.js","assets/dates-DVDkhDaU.js","assets/Demandes-BBIG0h0H.js","assets/DepenseEnUnePhrase-BIGRlGqP.css","assets/DepenseEnUnePhrase-CCyMCDQc.js","assets/Depenses-Ds55OjpF.js","assets/depenses-saisie-DlEvnNaH.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-yW17quJX.js","assets/diagnostics-au-trone-BS1e1mvz.js","assets/Dictee-D2P9yM7v.css","assets/dictee-pur-gF6KCh5k.js","assets/Dictee-tgmQxS_1.js","assets/Discussions-Bhg9C-nJ.js","assets/EditeurDesOffres-Dup2gSFP.js","assets/Encaissements-xk-vnxpF.js","assets/enfants-DyQENCei.js","assets/Engagements-BmNpxyFa.js","assets/Engagements-Cj5S9MhG.css","assets/engagements-coffre-CIOQgqYq.js","assets/EntreDeuxSeances-eRrn4MyA.js","assets/Evaluation-DyPiZj7M.js","assets/facture-Dutp1pi9.js","assets/Factures-B_OT1VpS.js","assets/FenetreDesCivilites-D7yU8T3L.js","assets/FenetreDesCivilites-zfNk1aak.css","assets/FenetreDuPoint-x1u1YE-_.js","assets/Fil-XyBr8cWm.js","assets/finances-Ds4kOIUN.css","assets/fon-BPQyTqDw.js","assets/Fournisseurs-BFS-EM5b.js","assets/fournisseurs-CEUmgTjy.js","assets/foyer-j3VKZjTE.js","assets/Gerard-Cgj-zsJh.css","assets/gerard-donnees-BT_5C987.js","assets/Gerard-DrbImoB3.js","assets/gestes-conversation-DLd0ryXq.js","assets/heures-des-rappels-pur-Dig9pZpo.js","assets/HomeRituals-D2hQpfTu.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-Ckuw0FcJ.js","assets/ia-centre-DYLjxc0i.js","assets/ia-diagnostic-pur-BBLrGY5l.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-tableau-pur-p6UvREJe.js","assets/identite-CW2xgyJ8.js","assets/index-BvkQIFus.js","assets/index.es-DSInzLMS.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-DxWb4vbp.js","assets/jspdf.es.min-BD6trKZX.js","assets/JustePrix-D8M_Cfp6.js","assets/kkiapay-Ct21EhjM.js","assets/kkiapay-widget-CVmsl9OE.js","assets/Laboratoire-BsZ6K0V6.js","assets/LaJournee-B6ScmWCe.js","assets/LaJournee-Bn_G0HCt.css","assets/LesPaiements-BafxdnPh.js","assets/LesPaiements-C9cEZlne.css","assets/LettresAuDossier-Cf7o3Trg.js","assets/LienMndPay-CPUhGtK5.js","assets/Marketing-k_u98mJ5.js","assets/MarketingBranche-9_fXetmP.js","assets/Marque-BMxg1u_l.js","assets/MesPourboires-CENjelyb.css","assets/MesPourboires-roKiNZki.js","assets/MesTaches-CAbCKk9d.js","assets/MesTaches-Cc4XUDf6.css","assets/momo-C2ZVfV9J.js","assets/MonMois-BA3mYyLb.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/MtnMoMo-C8Q53Xrg.js","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/objectifs-t43Hbgvx.js","assets/opale-C3R8n5X0.js","assets/oreille-B1AMUmZh.js","assets/paie-du-5-CvSKLWg4.js","assets/paie-du-5-DeJq-K_U.css","assets/paie-du-5-pur-CPiCK8fv.js","assets/paie-par-mtn-n02iSD-T.js","assets/PaieParMtn-CodhqMUJ.js","assets/paliers-CHINvVf7.js","assets/Parametres-CGdE2rEp.js","assets/parcours-Bn3Yx4_j.js","assets/Parrainages-BDEUC9ji.js","assets/Parrainages-gAHAPB_6.css","assets/PassageAvantLeFauteuil-CR6NeUSA.js","assets/pdf-DfU5-PbD.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/periode-des-pourboires-pur-BUWqfwov.js","assets/Personas-DLTYfolm.js","assets/Personnel-BtDzMXzN.js","assets/photo-DZapocvl.js","assets/pilotage-D8kf1Co8.css","assets/Pourboires-Dv3Vz9s7.js","assets/Predictions-DIX_-B5X.js","assets/Prestataires-DdSDv65g.js","assets/Prets-DtIb7ctp.js","assets/PrevisionDuMois-DlFTw3OX.css","assets/PrevisionDuMois-YpRJPZw7.js","assets/Previsions-9BU2Vg1T.css","assets/Previsions-BhQy3jF-.js","assets/previsions-pur-C6Bmx970.js","assets/processus-pur-R6U5QcCi.js","assets/Projets-BReUaSS2.js","assets/Projets-COO7WDEE.css","assets/projets-DqYBTQhC.js","assets/projets-pur-2ZEMRNDU.js","assets/protocoles-DcPQuatW.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-BQkuywDs.js","assets/qualification-DPH9aVM-.js","assets/quiz-5qMPWZVi.js","assets/Rapport-DDb4p4I3.js","assets/Recommandations-BXSMeZ3F.js","assets/regler-DHR_B1Dm.css","assets/regler-DR9_fg4V.js","assets/regler-par-fedapay-pur-C-GqpA-T.js","assets/relances-pur-BacTXlI2.js","assets/releve-des-avis-MSZxaSjy.js","assets/SalonFoyer-BbT2QL9K.js","assets/secretariat-admin-C6yP33rJ.js","assets/Secretariat-Cy79Zw30.css","assets/Secretariat-Dc8qo2Qk.js","assets/Signatures-BogSlrSz.js","assets/SignerUnPdf-C-szoZVl.js","assets/Synthese-CCuBMpdq.js","assets/SyntheseGraphes-CrvwQnjD.js","assets/systeme-TPy-pF7j.css","assets/Tableau-CPNBbA1P.js","assets/temps-9MpAePju.js","assets/Textes-DLpOzRbT.css","assets/Textes-DZA1QxdK.js","assets/tiroirs-BRJhnISB.js","assets/tiroirs-CkDzpGy0.css","assets/trone-D-JVcd4-.css","assets/trone-DOIlL6SR.js","assets/useAudiences-LKG8uyvx.js","assets/useClotureDuJour-Do7idhF6.js","assets/Vitrine-BAvO87qv.js","assets/Vitrine-BWilTqQJ.css","assets/_admin-CBvluDFl.js","assets/_contrat-Ck1Ao603.js","assets/_reuni-C3-pxao6.js","assets/_shared-BkSwKnQX.js","assets/_signature-DAnvoSuh.js","assets/_ui-BrUDlmuM.css","assets/_ui-BZkZ6m2V.js"];
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
