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
const BUILD = "20261116214208";
const A_GARDER = ["./","assets/abonnements-Cu1p0XVD.js","assets/Abonnements-D6uvwFr1.js","assets/Abonnements-DTY7p2DH.css","assets/Academie-Byilx9lI.js","assets/Acces-CUYJTekG.js","assets/afaire-BtjRscZF.js","assets/AFaire-DtijRr6A.js","assets/agents-donnees-CfGrnFTo.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Agents-zqhGu8JI.js","assets/Analytics-CRW7wuoV.js","assets/Appels-CSsAeE3C.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/Assistants-D9i2Xwmg.css","assets/Assistants-xmfaE0Em.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/AtelierDesContenus-DOd6-a3A.js","assets/Audience-C6jNEDjq.js","assets/Aujourdhui-CJR2weDU.js","assets/avant-le-fauteuil-lecture-eUqTs0Zp.js","assets/AvantLeFauteuil-BKLmvi4q.js","assets/avis-fiches-C2TNvxJ0.js","assets/AvisGoogle-Ba66oPwY.js","assets/AvisGoogle-DaPXfwX9.css","assets/BadgeEssai-CxVyb_ym.js","assets/BadgeSuggere-_NdEje-B.js","assets/besoins-BlYP4cOe.js","assets/BesoinsEtRegles-4gjHMQ3f.js","assets/BesoinsEtRegles-CzntMbJE.css","assets/bilan-B-bfPYR0.css","assets/bilan-B7cZfXeQ.js","assets/BilanMensuel-sLUsakVc.js","assets/Branches-BNbOyYGC.js","assets/bridges-DMshxGCc.js","assets/Caisse-C9exWQoF.js","assets/caisse-du-soir-C6vPx-E_.css","assets/caisse-du-soir-Dz4o6dZ_.js","assets/Caisses-DDOU8TU3.js","assets/Calendrier-2fhqGbgg.js","assets/campagnes-pur-CNc7xjXj.js","assets/Carnet-4cgX6b78.js","assets/carte-BsKQoUSZ.js","assets/carte-_W_-xBPj.css","assets/CarteModal-BWBHbBU6.js","assets/CartesCadeaux-Cte4xpK5.js","assets/Catalogue-DlYBkxE5.js","assets/CentreDeCommande-BzjfNNDq.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-yscaWWvK.js","assets/certificat-BldpGo8g.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-D9OKAw62.js","assets/chiffre-du-jour-pur-CBUtBtXF.js","assets/ChiffreDesPrestations-DEc45k9F.js","assets/client-BZvgqMgT.js","assets/cloture-du-jour-CVLmZjbe.js","assets/ClotureDuTiroir-DK-rTLuk.js","assets/Coffre-CIYZh7Vn.js","assets/collecte-mtn-pur-D9rF7FS0.js","assets/components-B4shypQe.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-CpU72elz.js","assets/Comptes-p7Q9jRuP.js","assets/consultation-CRW6QcWf.css","assets/consultation-PKZmMmie.js","assets/Consultations-BuMH5D-r.js","assets/Consultations-DiE-2_mG.css","assets/consultNotes-CYnai-Wk.js","assets/Conversations-2AWTmJt1.js","assets/Conversations-D4WwB5Zo.css","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-_Nao30Lq.js","assets/currency-qfIhGmrs.js","assets/Customers-Cc0cUap7.js","assets/Dashboard-B2x7VsE_.css","assets/Dashboard-DkS3pU3-.js","assets/dates-Dc3GAG2c.js","assets/Demandes-Cp6OLbTm.js","assets/DepenseEnUnePhrase-BIGRlGqP.css","assets/DepenseEnUnePhrase-dvY_qlqU.js","assets/Depenses-Qwjj7aBm.js","assets/depenses-saisie-CYX85tUx.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-Cb5c2CDl.js","assets/diagnostics-au-trone-vhIYAGmG.js","assets/Dictee-BIQFbKhA.css","assets/Dictee-BuDBrmhN.js","assets/dictee-pur-BtHo5Vav.js","assets/Discussions-DoIBj6b5.js","assets/EditeurDesOffres-B3sDgwlI.js","assets/Encaissements-DLRwDM_S.js","assets/enfants-vOM44mj1.js","assets/Engagements-C5-QmxKL.js","assets/Engagements-Cj5S9MhG.css","assets/engagements-coffre-STemlTHb.js","assets/EntreDeuxSeances-BtwkEhbL.js","assets/es-CjW7bpDT.js","assets/Evaluation-YF4pCSgU.js","assets/facture-Dkwv9Yjb.js","assets/Factures-Cv9vHYSf.js","assets/FenetreDesCivilites-BO-2vtXM.js","assets/FenetreDesCivilites-zfNk1aak.css","assets/FenetreDuPoint-CnwlMidy.js","assets/Fil-DSFDjZwo.js","assets/finances-C8x7Mn4-.css","assets/fon-BP9LRcEC.js","assets/fournisseurs-Bn46s71t.js","assets/Fournisseurs-DsPu7fAH.js","assets/foyer-CvBt-w7I.js","assets/Gerard-Cgj-zsJh.css","assets/gerard-donnees-Bsk4OCCq.js","assets/Gerard-wTRPK9Kx.js","assets/gestes-conversation-BUtJPC7g.js","assets/heures-des-rappels-pur-BWJPB8OP.js","assets/HomeRituals-UMtUneL7.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-KCLa9VJ6.js","assets/ia-centre-BQICHV_a.js","assets/ia-diagnostic-pur-BNtkwfR3.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-tableau-pur-p6UvREJe.js","assets/identite-B5mPsyQb.js","assets/index.es-BybiO326.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-CDnVS3vW.js","assets/jspdf.es.min-iqj-pwWR.js","assets/JustePrix-DZhbMP90.js","assets/kkiapay-4a7fLJ-9.js","assets/kkiapay-widget-CVmsl9OE.js","assets/Laboratoire-B40NK_rD.js","assets/LaJournee-Bn_G0HCt.css","assets/LaJournee-jcmC7AMr.js","assets/le-caissier-pur-CE52mv4R.js","assets/LesPaiements-C9cEZlne.css","assets/LesPaiements-CXloLdWu.js","assets/LettresAuDossier-CrK-HM_w.js","assets/LienMndPay-lP38U-AD.js","assets/Marketing-CRmYS-ch.js","assets/MarketingBranche-BtInOJKm.js","assets/Marque-Mm0gksm-.js","assets/MesPourboires-BgAAuzI8.js","assets/MesPourboires-CENjelyb.css","assets/MesTaches-26Odor8-.js","assets/MesTaches-Cc4XUDf6.css","assets/momo-C2ZVfV9J.js","assets/MonMois-D90rI8Nr.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/MtnMoMo-BEt-UvN2.js","assets/objectifs-ChmCiYGB.js","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/opale-B5rCSB4i.js","assets/oreille-B1AMUmZh.js","assets/paie-du-5-DDU4cc6h.js","assets/paie-du-5-DeJq-K_U.css","assets/paie-du-5-pur-CPiCK8fv.js","assets/paie-par-mtn-Ow462WmE.js","assets/PaieParMtn-DIatug09.js","assets/paliers-DnmeRZT5.js","assets/Parametres-BrS_O2lL.js","assets/parcours-ClutBNL6.js","assets/Parrainages-Cqg-9lI-.js","assets/Parrainages-gAHAPB_6.css","assets/PassageAvantLeFauteuil-DR_qdfdc.js","assets/pdf-mvcSn26g.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/periode-des-pourboires-pur-BUWqfwov.js","assets/Personas-BEFbYQLS.js","assets/Personnel-D7uLASgW.js","assets/photo-lmMlJfbk.js","assets/pilotage-D8kf1Co8.css","assets/Pourboires-CY49yJcf.js","assets/Predictions-lywDIp2Z.js","assets/Prestataires-BCuLD6RW.js","assets/Prets-CPMzoCJ_.js","assets/PrevisionDuMois-CgIPQEmC.js","assets/PrevisionDuMois-DlFTw3OX.css","assets/Previsions-9BU2Vg1T.css","assets/Previsions-DO06QI6J.js","assets/previsions-pur-Pz2KtX6q.js","assets/processus-pur-R6U5QcCi.js","assets/Projets-BPbgCMQ-.js","assets/Projets-COO7WDEE.css","assets/projets-CraG9ndS.js","assets/projets-pur-2ZEMRNDU.js","assets/protocoles-DdeDAmCh.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-CyPOO6SA.js","assets/qualification-C32Of_3j.js","assets/quiz-5qMPWZVi.js","assets/Rapport-CbMHZfFl.js","assets/Recommandations-BxU-yWnQ.js","assets/regler-DHR_B1Dm.css","assets/regler-DIF_P0dw.js","assets/regler-par-fedapay-pur-CFL4EbBx.js","assets/relances-pur-BacTXlI2.js","assets/releve-des-avis-D5DL9JeX.js","assets/SalonFoyer-ChI84veb.js","assets/secretariat-admin-DtGmF92A.js","assets/Secretariat-Cy79Zw30.css","assets/Secretariat-DRPSx0N3.js","assets/Signatures-D8iM7QTL.js","assets/SignerUnPdf-uDxqkerh.js","assets/Synthese-CWscQgxr.js","assets/SyntheseGraphes-DL1qL_ZT.js","assets/systeme-TPy-pF7j.css","assets/Tableau-CL8DbZYo.js","assets/temps-LP3JS6IM.js","assets/Textes-DLpOzRbT.css","assets/Textes-F39S6bZP.js","assets/tiroirs--6tkY9dK.js","assets/tiroirs-CkDzpGy0.css","assets/trone-BWYJEfJC.js","assets/trone-DxtNUYxb.css","assets/useAudiences-CmwCcRfX.js","assets/useClotureDuJour-BsujZ4_V.js","assets/visios-WhkF7JYI.js","assets/Vitrine-BWilTqQJ.css","assets/Vitrine-DmzhHrJi.js","assets/_admin-D8LDdj_Q.js","assets/_contrat-D_Ey-TwB.js","assets/_reuni-53_h9aRz.js","assets/_shared-CeCKNZB0.js","assets/_signature-d5Gk6j92.js","assets/_ui-BrUDlmuM.css","assets/_ui-D14vqJG2.js"];
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
