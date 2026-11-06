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
const BUILD = "20261106202250";
const A_GARDER = ["./","assets/Abonnements-BNXzhY3a.js","assets/abonnements-BsdGJw7o.js","assets/Abonnements-DTY7p2DH.css","assets/Academie-CILHjA4H.js","assets/Acces-DpiadWC_.js","assets/AFaire-BZHNsWQu.js","assets/afaire-CQ5kfQIP.js","assets/Agents-CKiL7JHv.js","assets/agents-donnees-DoNmOQ0C.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-rafgaHzG.js","assets/Appels-DqEqnvtZ.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/Assistants-D9i2Xwmg.css","assets/Assistants-Pk2lDeRf.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/AtelierDesContenus-Kc9hNIVR.js","assets/Audience-CFGYujUm.js","assets/Aujourdhui-CTkeltvc.js","assets/avant-le-fauteuil-lecture--N4YN4YV.js","assets/AvantLeFauteuil-CPJcVF0S.js","assets/avis-fiches-BzY6fYdd.js","assets/AvisGoogle-B4Uey9lW.js","assets/AvisGoogle-DaPXfwX9.css","assets/bilan-B-bfPYR0.css","assets/bilan-D7LAbM0A.js","assets/BilanMensuel-kkpdkqjU.js","assets/Branches-CxAZDIe-.js","assets/bridges-rKnnBP2d.js","assets/Caisse-C71yGNto.js","assets/caisse-du-soir-C6vPx-E_.css","assets/caisse-du-soir-D5uFhQfC.js","assets/Caisses-gCrqNozI.js","assets/Calendrier-DNwfylIn.js","assets/campagnes-pur-Ch_3mp3t.js","assets/Carnet-BZnrSOjX.js","assets/carte-DgAg_LgQ.js","assets/carte-_W_-xBPj.css","assets/CarteModal-D6VDI8Jc.js","assets/CartesCadeaux-xkOXodhv.js","assets/Catalogue-R_KKbMTJ.js","assets/CentreDeCommande-D-1_wEkp.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-BlKLU__Q.js","assets/certificat-CycWoPzv.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-BuKeEbqm.js","assets/chiffre-du-jour-pur-BgGGkwA7.js","assets/ChiffreDesPrestations-C8Mu20md.js","assets/client-wAtrf4vB.js","assets/cloture-du-jour-FKi31ihP.js","assets/ClotureDuTiroir-CbeWzCza.js","assets/Coffre-DsFozcSt.js","assets/components-BTxi_Hwe.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-Das6PFEk.js","assets/Comptes-Bk-zigII.js","assets/consultation-CRW6QcWf.css","assets/consultation-Db7Z4jlj.js","assets/Consultations-5yjPPBD0.js","assets/consultNotes-tNWRu1fL.js","assets/Conversations-ClzfQzOy.js","assets/Conversations-D4WwB5Zo.css","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-D5FWJYuu.js","assets/currency-qfIhGmrs.js","assets/Customers-BLcCQbfR.js","assets/Dashboard-B2x7VsE_.css","assets/Dashboard-CD3JfuGk.js","assets/dates-Cn7n0efh.js","assets/Demandes-BEVpZcVF.js","assets/DepenseEnUnePhrase-BBsxxkD4.js","assets/DepenseEnUnePhrase-BIGRlGqP.css","assets/Depenses-DDpDSJsf.js","assets/depenses-saisie-BkTz-Hkh.js","assets/dernier-message-pur-CBYWnq8m.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-DNsWqBxm.js","assets/diagnostics-au-trone-DaPDAUki.js","assets/Dictee-D2P9yM7v.css","assets/Dictee-EEP67uJq.js","assets/dictee-pur-CCxTZtfN.js","assets/Discussions-CaBhF91z.js","assets/EditeurDesOffres-DfehWU90.js","assets/Encaissements--gD1H9Hl.js","assets/enfants-CLmRlurI.js","assets/Engagements-Cj5S9MhG.css","assets/Engagements-Co9RxJNR.js","assets/engagements-coffre-zgLTJl2x.js","assets/EntreDeuxSeances-CcNQAIul.js","assets/Evaluation-DhdJivLl.js","assets/Factures-_3dRsGLa.js","assets/FenetreDesCivilites-fMOLIJbj.js","assets/FenetreDesCivilites-zfNk1aak.css","assets/FenetreDuPoint-BioXYjL1.js","assets/Fil-avmFk_8n.js","assets/finances-BMFnlkRx.css","assets/fon-z3nio8QW.js","assets/fournisseurs-Bki83fbw.js","assets/Fournisseurs-d1jZAWGd.js","assets/foyer-BIry5n1H.js","assets/Gerard-BUrTuTbI.js","assets/Gerard-CP3QOjfk.css","assets/gerard-donnees-nly3WfKp.js","assets/gestes-conversation-D_Rb3gzN.js","assets/HomeRituals-CM3ZMHLI.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-B-jjysN2.js","assets/ia-centre-Bn6cg0Ht.js","assets/ia-diagnostic-pur-BBLrGY5l.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-tableau-pur-CSRjGtTf.js","assets/identite-ByVUnBoC.js","assets/index-DqbBihhc.js","assets/index.es-tynzs17A.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-86QNDDBv.js","assets/jspdf.es.min-CHTJORFg.js","assets/JustePrix-C3KmnJx0.js","assets/kkiapay-OYVstLQZ.js","assets/kkiapay-widget-DnUhUNd4.js","assets/Laboratoire-A9bnYUx3.js","assets/LaJournee-095wEtMi.js","assets/LaJournee-Bn_G0HCt.css","assets/LesPaiements-BvdfOCbQ.css","assets/LesPaiements-O_jMddFv.js","assets/LettresAuDossier-Bdhsnmsc.js","assets/LienMndPay-Di_Z5TVC.js","assets/Marketing-BZUkiv1e.js","assets/MarketingBranche-DgicIRwA.js","assets/Marque-DGzQCuqd.js","assets/MesPourboires-By4LjPsZ.js","assets/MesPourboires-D9I_9rZf.css","assets/MesTaches-Cc4XUDf6.css","assets/MesTaches-HV8Mxvgn.js","assets/momo-C2ZVfV9J.js","assets/MonMois-Dna6sO27.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-CNpU1XxM.js","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/opale-SlPyhKGE.js","assets/oreille-B1AMUmZh.js","assets/paie-du-5-BpCg2YEy.js","assets/paie-du-5-DeJq-K_U.css","assets/paie-du-5-pur-1uhWiTGn.js","assets/PaieParMtn-HOLa4caQ.js","assets/paliers--6dSmFWa.js","assets/Parametres-D2Cr7GOd.js","assets/parcours-DPDfmh7Q.js","assets/Parrainages-DEHgkLh4.js","assets/Parrainages-gAHAPB_6.css","assets/PassageAvantLeFauteuil-CL8LFXkT.js","assets/pdf-BhHwHXRA.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/Personas-C_OFRZTM.js","assets/Personnel-DaIhOdBC.js","assets/photo-CgeQ_vEC.js","assets/pilotage-D8kf1Co8.css","assets/Pourboires-DnLKYOZX.js","assets/Predictions-DliInP7K.js","assets/Prestataires-Ogb-mZt3.js","assets/Prets-Bk3-xxCC.js","assets/PrevisionDuMois-DlFTw3OX.css","assets/PrevisionDuMois-L6ckWngb.js","assets/Previsions-BVORAPms.js","assets/previsions-pur-B0PCh6fJ.js","assets/Previsions-r4v19Anp.css","assets/processus-pur-R6U5QcCi.js","assets/projets-BedrmHAP.js","assets/Projets-BiZ3UYa_.js","assets/Projets-COO7WDEE.css","assets/projets-pur-2ZEMRNDU.js","assets/protocoles-pEj3y4zh.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-TQw6d7x1.js","assets/qualification-B5fpXQXF.js","assets/quiz-5qMPWZVi.js","assets/Rapport-Og0uJHbf.js","assets/Recommandations-CgqC5f4w.js","assets/regler-C5hcM02_.css","assets/regler-CP_BnyEt.js","assets/regler-la-seance-serveur-Bs6rzqZX.js","assets/relances-pur-lwRTXc5E.js","assets/releve-des-avis-CGj6brYh.js","assets/SalonFoyer-wgE4RNkG.js","assets/secretariat-admin-jnvoVgiL.js","assets/Secretariat-CVqDh2CR.js","assets/Secretariat-Cy79Zw30.css","assets/Signatures-zjaqM-HE.js","assets/SignerUnPdf-DbPPhw3L.js","assets/Synthese-Cl3X3OD2.js","assets/SyntheseGraphes-BOya3pp2.js","assets/systeme-TPy-pF7j.css","assets/Tableau-CKyateH3.js","assets/temps-CvGmYzZ1.js","assets/Textes-CKjMZ_Og.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-C0it0CFe.js","assets/tiroirs-CkDzpGy0.css","assets/trone-Cntonqeq.js","assets/trone-DRaCbXAi.css","assets/useAudiences-W0fIBX0C.js","assets/useClotureDuJour-b0rciWRo.js","assets/Vitrine-BsT8E7AS.js","assets/Vitrine-BWilTqQJ.css","assets/_admin-Cj-ThZIL.js","assets/_contrat-BfoVHPpq.js","assets/_heures-BwZ6r1Nc.js","assets/_reuni-BW0hHM-4.js","assets/_shared-COIjbIdF.js","assets/_signature-Doc9X6yp.js","assets/_ui-BrUDlmuM.css","assets/_ui-C9psTTY8.js"];
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
