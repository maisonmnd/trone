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
const BUILD = "20261120153643";
const A_GARDER = ["./","assets/abonnements-B19t9sMD.js","assets/Abonnements-D5S0h4AJ.js","assets/Abonnements-DTY7p2DH.css","assets/Academie-BLjFOGxP.js","assets/Acces-Cn_3-Yoi.js","assets/afaire-B9zzkL1f.js","assets/AFaire-DYRL29Zw.js","assets/Agents-0E5E_78J.js","assets/agents-donnees-Djzhvrt6.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-BJ_ZX27p.js","assets/App-BMzhqvd1.js","assets/Appels--vlW_wxz.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/Assistants-B_2DgqGt.js","assets/Assistants-D9i2Xwmg.css","assets/AtelierDesContenus-D2K1f2Ds.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/Audience-DP5lMW5h.js","assets/Aujourdhui-BeAyvV9U.js","assets/auth-CpxyEH1s.js","assets/avant-le-fauteuil-lecture-Bw-ylUqi.js","assets/AvantLeFauteuil-CUWFOHx_.js","assets/avis-fiches-4Dfyxuxe.js","assets/AvisGoogle-Cx6ZohjD.js","assets/AvisGoogle-DaPXfwX9.css","assets/BadgeEssai-Bh6582pm.js","assets/BadgeSuggere-DIQJbezy.js","assets/besoins-CJV1zxt6.js","assets/BesoinsEtRegles-BLwxGVV5.css","assets/BesoinsEtRegles-FGLW5Pc2.js","assets/bilan-B-bfPYR0.css","assets/bilan-GiqLUPjy.js","assets/BilanMensuel-C6ubjaTs.js","assets/Branches-Dlkp4cxM.js","assets/bridges-B0ASTwCt.js","assets/Caisse-C3wvv4SM.js","assets/caisse-du-soir-BHWla3gi.js","assets/caisse-du-soir-C6vPx-E_.css","assets/Caisses-BpVOOd_t.js","assets/Calendrier-OJaG1Xsc.js","assets/campagnes-pur-sirhYNZy.js","assets/Carnet-CdenZRv_.js","assets/carte-BbrRVvnk.js","assets/carte-_W_-xBPj.css","assets/CarteModal-D2cudkFc.js","assets/CartesCadeaux-DxGEiovm.js","assets/Catalogue-C7N8cTmj.js","assets/CentreDeCommande-B2yAvM8Z.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-BjJ6SnAi.js","assets/certificat-D3F2yfc7.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-BTA2apB2.js","assets/chiffre-du-jour-pur-DwDQzOUU.js","assets/ChiffreDesPrestations-CJ5F57nN.js","assets/Classement-BwHgIa5j.js","assets/Classement-CmpbQZDu.css","assets/classement-pur-CQOYU06l.js","assets/client-O6JE0huQ.js","assets/cloture-du-jour-D2E-SUkZ.js","assets/ClotureDuTiroir-BHMg-ZEO.js","assets/Coffre-BZmmdSMW.js","assets/collecte-mtn-pur-Bq3uWgWT.js","assets/components-KkBIcXem.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-DFrERq-k.js","assets/Comptes-DCfUQMHp.js","assets/consultation-CRW6QcWf.css","assets/consultation-CYStECDg.js","assets/Consultations-DiE-2_mG.css","assets/Consultations-DvL7zkrX.js","assets/consultNotes-0NGsU7Ib.js","assets/Conversations-D4WwB5Zo.css","assets/Conversations-DuOrh0oj.js","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-CBarpPgr.js","assets/currency-Cd0clE4P.js","assets/Customers-D5DLGABI.js","assets/Dashboard-B2x7VsE_.css","assets/Dashboard-hPyFiX1_.js","assets/dates-t7dAeJNQ.js","assets/Demandes-CdUSIXdE.js","assets/DepenseEnUnePhrase-BIGRlGqP.css","assets/DepenseEnUnePhrase-Hj-Rz-wK.js","assets/Depenses-DL-Fu_-l.js","assets/depenses-saisie-DAQkK34k.js","assets/devis-remis-BPkvt9Hx.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-DY1_KSwk.js","assets/diagnostics-au-trone-CsONvyRn.js","assets/Dictee-BdB86yGu.js","assets/Dictee-C-pUYYFA.css","assets/dictee-pur-C6uo8jci.js","assets/Discussions-Cqbdmx0I.js","assets/echappe-html-pur-gEhHOM07.js","assets/EditeurDesOffres-CkuRC_n5.js","assets/Encaissements-C0Sv7YiH.js","assets/enfants-Cuv1DKOg.js","assets/Engagements-Cj5S9MhG.css","assets/engagements-coffre-DkUdRMy5.js","assets/Engagements-o52NrG4f.js","assets/EntreDeuxSeances-CkJDudhb.js","assets/es-Cd5FjGju.js","assets/Evaluation-W_8-BDUa.js","assets/facture-BT6gPpok.js","assets/Factures-CeerKHid.js","assets/FenetreDeLAgent-BV2LvNgS.js","assets/FenetreDesCivilites-iMbrym8W.js","assets/FenetreDesCivilites-zfNk1aak.css","assets/FenetreDuPoint-b0Lar4H8.js","assets/Fil-BFD5UG9X.js","assets/finances-C8x7Mn4-.css","assets/fon-D6L6BxAP.js","assets/Fournisseurs-6kIVFpDT.js","assets/fournisseurs-CNrZFKBF.js","assets/foyer-0KXLhAGf.js","assets/gerard-donnees-vPZ867q-.js","assets/Gerard-vo2IWvP3.css","assets/Gerard-Wunhh8yo.js","assets/gestes-conversation-BbRT9rSP.js","assets/heures-des-rappels-pur-BWJPB8OP.js","assets/HomeRituals-NceAeNoS.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-CndNLRdv.js","assets/ia-centre-CFm0EIm8.js","assets/ia-diagnostic-pur-qGnFEvys.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-tableau-pur-p6UvREJe.js","assets/identite-nWlmYKw1.js","assets/index.es-DulRCvTk.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-IN1jSvjs.js","assets/jspdf.es.min-BZz4ZJ_g.js","assets/JustePrix-D6f2zZ54.js","assets/kkiapay-CrhZG3Lo.js","assets/kkiapay-widget-CVmsl9OE.js","assets/Laboratoire-jisv-fDd.js","assets/LaJournee-Bn_G0HCt.css","assets/LaJournee-C7n_aLqJ.js","assets/le-caissier-pur-D67jvk2Z.js","assets/LesPaiements-C9cEZlne.css","assets/LesPaiements-DnBAvBKC.js","assets/LettresAuDossier-BDvBoj7f.js","assets/LienMndPay-DK0dg-G9.js","assets/Marketing-CNjGdXXW.js","assets/MarketingBranche-7GXYeoYq.js","assets/Marque-PSjT9U_j.js","assets/MesPourboires-CEFU51Mt.js","assets/MesPourboires-CENjelyb.css","assets/MesTaches-BKr-aryw.js","assets/MesTaches-Cc4XUDf6.css","assets/momo-C2ZVfV9J.js","assets/MonMois-Bqvz7u5c.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/MtnMoMo-Gk4BIuhj.js","assets/objectifs-CFiPf0q4.js","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/opale-B2DxbKIR.js","assets/oreille-B1AMUmZh.js","assets/paie-du-5-D8FQ26Qv.js","assets/paie-du-5-DeJq-K_U.css","assets/paie-du-5-pur-CPiCK8fv.js","assets/paie-par-mtn-ovj9ZecT.js","assets/PaieParMtn-O4-yQqNj.js","assets/paliers-CQeAsweP.js","assets/Parametres-CK986YCy.js","assets/parcours-J6cQt_RF.js","assets/Parrainages-DTO3xIQf.js","assets/Parrainages-gAHAPB_6.css","assets/PassageAvantLeFauteuil-S-9b_A_s.js","assets/pdf-Di9fu_-k.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/periode-des-pourboires-pur-BUWqfwov.js","assets/Personas-CrO6TEuZ.js","assets/Personnel-C0Lzo81R.js","assets/photo-5--XD9T1.js","assets/pilotage-D8kf1Co8.css","assets/porte-de-l-equipe-DoZOv4nb.js","assets/Pourboires-CAB-dACe.js","assets/Predictions-BuznYv-G.js","assets/preload-helper-BRe_O-Rg.js","assets/Prestataires-Bogbw1Za.js","assets/Prets-BaOF0ghG.js","assets/PrevisionDuMois-Cs-dwGka.js","assets/PrevisionDuMois-DlFTw3OX.css","assets/Previsions-9BU2Vg1T.css","assets/Previsions-BFJO70Wz.js","assets/previsions-pur-B5ITP6HM.js","assets/processus-pur-R6U5QcCi.js","assets/Projets-B5OrWvb-.js","assets/projets-Ci4Wu3EB.js","assets/Projets-COO7WDEE.css","assets/projets-pur-2ZEMRNDU.js","assets/protocoles-zDqZUTVB.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-L7pslw_2.js","assets/quiz-5qMPWZVi.js","assets/Rapport-CKtoWNX-.js","assets/Recommandations-CaaHrzUG.js","assets/regler-C4RiKtd_.js","assets/regler-DHR_B1Dm.css","assets/regler-par-fedapay-pur-G8CEJdGn.js","assets/relances-pur-BacTXlI2.js","assets/releve-des-avis-BjY6FdQQ.js","assets/SalonFoyer-BpVZyJtb.js","assets/secretariat-admin-CgddLTxQ.js","assets/Secretariat-Cy79Zw30.css","assets/Secretariat-ZWw6lPuy.js","assets/Signatures-z2CepAsK.js","assets/SignerUnPdf-DqHvR0fu.js","assets/Synthese-Bqybz3Vi.js","assets/SyntheseGraphes-xiq4edlu.js","assets/systeme-TPy-pF7j.css","assets/Tableau-DuUiUfkm.js","assets/temps-BGUAiQ1j.js","assets/Textes-BBBTzk2T.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-CkDzpGy0.css","assets/tiroirs-lPeBqvAP.js","assets/trone-BFzw9TyJ.js","assets/trone-Dsdrwhxz.css","assets/useAudiences-CdJEyx5j.js","assets/useClotureDuJour-CCVREji7.js","assets/visios-CpQfxPzF.js","assets/Vitrine-BWilTqQJ.css","assets/Vitrine-COQ8PM66.js","assets/_admin-BfjzIeW5.js","assets/_contrat-awvh6nL_.js","assets/_reuni-BUEHCKCK.js","assets/_shared-B2k_r29z.js","assets/_signature-BMukJf_G.js","assets/_ui-BrUDlmuM.css","assets/_ui-DgyjnFlc.js"];
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
