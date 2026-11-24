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
const BUILD = "20261124002055";
const A_GARDER = ["./","assets/Abonnements-CKzdfaCS.js","assets/abonnements-CMv-I3BU.js","assets/Abonnements-DTY7p2DH.css","assets/Academie-DPZIWs7k.js","assets/Acces-BdOwnEA8.js","assets/afaire-8DW1HO0U.js","assets/AFaire-B9MhC4Lj.js","assets/agents-donnees-sdx-NYF_.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Agents-WoNXrHUg.js","assets/Analytics-DXhO9kmg.js","assets/App-BTFQDQd5.js","assets/Appels-BuuAel2v.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/Assistants-CyArimi6.js","assets/Assistants-D9i2Xwmg.css","assets/AtelierDesContenus-D3-p6F2A.css","assets/AtelierDesContenus-DQiU48zT.js","assets/Audience-DYRDrGsK.js","assets/Aujourdhui-BVZSKVGP.js","assets/auth-BiUngLrG.js","assets/avant-le-fauteuil-lecture-Cv5IGFD_.js","assets/AvantLeFauteuil-CEq0BHyo.js","assets/avis-fiches-DLVnyHng.js","assets/avis-google-pont-DKPN58Gt.js","assets/AvisGoogle-DaPXfwX9.css","assets/AvisGoogle-gUfcMCxE.js","assets/BadgeEssai-Dqdeqa0S.js","assets/BadgeSuggere-B7Iy0KZb.js","assets/besoins-DM490gq0.js","assets/BesoinsEtRegles-BLwxGVV5.css","assets/BesoinsEtRegles-C8EtKHql.js","assets/bilan-B-bfPYR0.css","assets/bilan-cFIM-YT4.js","assets/BilanMensuel-BJQ3Dn7B.js","assets/Branches-CbsDwI1y.js","assets/bridges-Pl_nPMmy.js","assets/Caisse-Djl_Mmcb.js","assets/caisse-du-soir-C6vPx-E_.css","assets/caisse-du-soir-CGK30jiJ.js","assets/caisse-fluide-pur-Su1YTPyc.js","assets/Caisses-BBOpHVgm.js","assets/Calendrier-BsDRqy2_.js","assets/campagnes-pur-yPFvEBXG.js","assets/Carnet-Dh_xwh8S.js","assets/carte-B-8-iPGm.js","assets/carte-_W_-xBPj.css","assets/CarteModal-TZAXjEeM.js","assets/CartesCadeaux-Bhk__Ozr.js","assets/Catalogue-eXsM94Sj.js","assets/CentreDeCommande-Du8kyJhp.css","assets/CentreDeCommande-IxHJlSTv.js","assets/Cercle-DpRU9_ua.js","assets/certificat-XUpm1NTF.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-CR8a94C7.js","assets/chiffre-du-jour-pur-hWH3qie8.js","assets/ChiffreDesPrestations-CHboLtc8.js","assets/Classement-CmpbQZDu.css","assets/classement-Co-782fw.js","assets/Classement-CU7oHJIe.js","assets/classement-pur-CQOYU06l.js","assets/client-DFHFChGN.js","assets/cloture-du-jour-DCV90JFe.js","assets/ClotureDuTiroir-BUyNW8C4.js","assets/Coffre-BxJOHGaV.js","assets/components-DQwqq0Fk.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-DQ3GqD_G.js","assets/Comptes-c19BsvCt.js","assets/consultation-C32OYfD7.js","assets/consultation-CRW6QcWf.css","assets/Consultations-DiE-2_mG.css","assets/Consultations-HAwAOGQd.js","assets/consultNotes-Bpsdj3he.js","assets/contexte-de-la-reponse-DNDxsHAy.js","assets/Conversations-D4WwB5Zo.css","assets/Conversations-DLtpCvmw.js","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-DZD7748i.js","assets/currency-Cd0clE4P.js","assets/Customers-CloY-o9u.js","assets/Dashboard-BSOax1Fm.css","assets/Dashboard-CQekEhA9.js","assets/dates-C62eqQ3K.js","assets/DemanderAPerle-BD5NgCRN.css","assets/DemanderAPerle-BR37aooX.js","assets/Demandes-By5O9EmR.js","assets/DepenseEnUnePhrase-BIGRlGqP.css","assets/DepenseEnUnePhrase-CM0iuSTq.js","assets/Depenses-08Z_9dpz.js","assets/depenses-saisie-BYO8mTo9.js","assets/devis-CdIRAvZk.css","assets/devis-C_KXleWG.js","assets/devis-remis-vxXEmp9P.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-ByBOefjN.js","assets/diagnostics-au-trone--te2dPmB.js","assets/Dictee-C-pUYYFA.css","assets/Dictee-JnCILzv2.js","assets/dictee-pur-DiB_wr_T.js","assets/Discussions-BbxOxm5M.js","assets/dist-9vv0te18.js","assets/echappe-html-pur-gEhHOM07.js","assets/EditeurDesOffres-B50-px9b.js","assets/Encaissements-BvQrUFCr.js","assets/enfants-BlPMs8uK.js","assets/Engagements-Cj5S9MhG.css","assets/engagements-coffre-DMCTax04.js","assets/Engagements-DzBFTsi1.js","assets/EntreDeuxSeances-CY37xKkK.js","assets/es-Bj5NnHhH.js","assets/etoiles-pur-CgRPMSHm.js","assets/Evaluation-ufWdcwLc.js","assets/facture-CD65uJcl.js","assets/Factures-SEPBGY54.js","assets/FenetreDeLAgent-B8iiz6xP.js","assets/FenetreDesCivilites-BIISLGMk.js","assets/FenetreDesCivilites-zfNk1aak.css","assets/FenetreDuPoint-BEO5Igvn.js","assets/Fil-CK2Qn9RT.js","assets/finances-C8x7Mn4-.css","assets/fon-OGJRr4Nn.js","assets/Fournisseurs-COhoc3dq.js","assets/fournisseurs-_7b1WpTk.js","assets/foyer-4bgUMhTi.js","assets/Gerard-CgD1_iYi.js","assets/gerard-donnees-DHuF_IhF.js","assets/Gerard-lGKehvgG.css","assets/gestes-conversation-D0x9vukl.js","assets/heures-des-rappels-pur-BWJPB8OP.js","assets/HomeRituals-6VpVv-oL.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-DJtqRyH-.js","assets/ia-centre-BJT8AJGe.js","assets/ia-diagnostic-pur-qGnFEvys.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-tableau-pur-p6UvREJe.js","assets/identite-6b8uqmyc.js","assets/index.es-C6oll4Rp.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-kD58nzkx.js","assets/jspdf.es.min-BhHl515v.js","assets/JustePrix-BKcp2lFw.js","assets/kkiapay-CgMc2lZy.js","assets/kkiapay-widget-CaHBoBVm.js","assets/Laboratoire-C-Zpjpfg.js","assets/LaJournee-Bn_G0HCt.css","assets/LaJournee-CKAwrw3-.js","assets/le-caissier-pur-DJVqjqCc.js","assets/le-sceau-pur-ZsXKMtuY.js","assets/LePoint-CBjCCMQ5.css","assets/LePoint-OscNEjlU.js","assets/LesPaiements-C9cEZlne.css","assets/LesPaiements-CWIqOfKu.js","assets/LettresAuDossier-CyTnWOll.js","assets/LienMndPay-egDu2jq2.js","assets/Marketing-DC68foPe.js","assets/MarketingBranche-BNso9i7U.js","assets/Marque-Brc-SYUc.js","assets/MesPourboires-BBRKfHOH.js","assets/MesPourboires-CENjelyb.css","assets/MesTaches-BSVZkrr7.js","assets/MesTaches-Cc4XUDf6.css","assets/mnd-pay-pur-CfS2mkAo.js","assets/momo-C2ZVfV9J.js","assets/MonMois-DDQThufY.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/MtnMoMo-D2VSL1Va.js","assets/objectifs-CVbygbnV.js","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/opale-BYPxudrX.js","assets/oreille-B1AMUmZh.js","assets/paie-du-5-DagaKIy_.js","assets/paie-du-5-DeJq-K_U.css","assets/paie-du-5-pur-CPiCK8fv.js","assets/paie-par-mtn-3Dl8C2JS.js","assets/PaieParMtn-CqDk4ZHH.js","assets/paliers-0OfaJ3H4.js","assets/Parametres-DECRJJ9y.js","assets/parcours-C8KpaW29.js","assets/Parrainages-CjTjXa6d.js","assets/Parrainages-gAHAPB_6.css","assets/PassageAvantLeFauteuil-Cf-iCmM5.js","assets/pdf-BVP7tnGi.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/periode-des-pourboires-pur-BUWqfwov.js","assets/Personas-Dz3RzG4k.js","assets/Personnel-E6dccU5v.js","assets/photo-iIpUsrYa.js","assets/pilotage-D8kf1Co8.css","assets/porte-de-l-equipe-BfzvfrUg.js","assets/Pourboires-C5Mtc5xc.js","assets/Predictions-CyrExXDY.js","assets/preload-helper-BRe_O-Rg.js","assets/Prestataires--1ARhqDl.js","assets/Prets-BnrDmQ9B.js","assets/PrevisionDuMois-BpFowfjh.js","assets/PrevisionDuMois-DlFTw3OX.css","assets/Previsions-9BU2Vg1T.css","assets/Previsions-D6jOO5h7.js","assets/previsions-pur--IJZ7jro.js","assets/processus-pur-R6U5QcCi.js","assets/Projets-B2QqTz89.js","assets/Projets-COO7WDEE.css","assets/projets-DQkEr_kM.js","assets/projets-pur-2ZEMRNDU.js","assets/protocoles-B0UKMxZ1.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-BNBUlENj.js","assets/quiz-5qMPWZVi.js","assets/Rapport-oTtd2v8p.js","assets/Recommandations-Bu-AbLYw.js","assets/regler-C1cgaP-E.js","assets/regler-D1gFEaVz.css","assets/regler-par-fedapay-pur-DP7zXAs5.js","assets/relances-pur-C9iUwl2e.js","assets/releve-des-avis-8NAFwmZz.js","assets/SalonFoyer-Llp3_H37.js","assets/sceau-OYg0E-tq.js","assets/secretariat-admin-DWcURyg_.js","assets/Secretariat-Cy79Zw30.css","assets/Secretariat-vrttPkvD.js","assets/Signatures-C9iFR5Cx.js","assets/SignerUnPdf-CymVsDCp.js","assets/Synthese-WtgLZhYx.js","assets/SyntheseGraphes-Cq6t-VJs.js","assets/systeme-TPy-pF7j.css","assets/Tableau-CV2H3Nv7.js","assets/temps-BqS4uFoj.js","assets/Textes-DLpOzRbT.css","assets/Textes-DrX9VjmH.js","assets/tiroirs-CkDzpGy0.css","assets/tiroirs-QxE0V8t3.js","assets/trone-B-r6lpi2.css","assets/trone-CJaYo9dJ.js","assets/useAudiences-CPWD_QvV.js","assets/useClotureDuJour-Dqa-rh0a.js","assets/visios-CfPe2Jkg.js","assets/Vitrine-BWilTqQJ.css","assets/Vitrine-DYaIju6m.js","assets/_admin-CWpZco_N.js","assets/_contrat-D41Lq45X.js","assets/_reuni-DG8H54VU.js","assets/_shared-l9rVND8o.js","assets/_signature-DSxnngg_.js","assets/_ui-B-BgDiM9.js","assets/_ui-BrUDlmuM.css"];
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
