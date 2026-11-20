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
const BUILD = "20261120220754";
const A_GARDER = ["./","assets/Abonnements-BQi4Dd9a.js","assets/abonnements-ByFWLulb.js","assets/Abonnements-DTY7p2DH.css","assets/Academie-Do9DO_gI.js","assets/Acces-ByjHvBLf.js","assets/afaire-CZ9NdL3E.js","assets/AFaire-Dtt8T11t.js","assets/Agents-C_Yk5rWl.js","assets/agents-donnees-Dix9Dfll.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-CfqhBOT9.js","assets/App-esC2g4Ay.js","assets/Appels-BrOXzHPu.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/Assistants-BjPyEr5r.js","assets/Assistants-D9i2Xwmg.css","assets/AtelierDesContenus-BPGyKSWz.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/Audience-DTz3ZU41.js","assets/Aujourdhui-CzlRPgGp.js","assets/auth-BiNkxuPE.js","assets/avant-le-fauteuil-lecture-CytCrzZO.js","assets/AvantLeFauteuil-C25S89UM.js","assets/avis-fiches-D-iK3DfL.js","assets/AvisGoogle-C4kVKbIr.js","assets/AvisGoogle-DaPXfwX9.css","assets/BadgeEssai-CLkluzXs.js","assets/BadgeSuggere-BzTxGhdy.js","assets/besoins-BLbHPWe8.js","assets/BesoinsEtRegles-BLwxGVV5.css","assets/BesoinsEtRegles-cTyVOy3I.js","assets/bilan-B-bfPYR0.css","assets/bilan-C3tw6M69.js","assets/BilanMensuel-DHFB5v1R.js","assets/Branches-CYBdGGUa.js","assets/bridges-DqxE7PYX.js","assets/caisse-du-soir-C6vPx-E_.css","assets/caisse-du-soir-DaZUAsmf.js","assets/Caisse-Dz8ad7SY.js","assets/Caisses-BiOh3lm9.js","assets/Calendrier-BTC5nb7m.js","assets/campagnes-pur-gttfo8zf.js","assets/Carnet-D_Au05Oc.js","assets/carte-B8OONXYr.js","assets/carte-_W_-xBPj.css","assets/CarteModal-Cvm5ZAmQ.js","assets/CartesCadeaux-D4donD4B.js","assets/Catalogue-CdkjJBvq.js","assets/CentreDeCommande-C_SH-duK.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-CznulJAM.js","assets/certificat-CzKBAGrT.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-DlDDUnpz.js","assets/chiffre-du-jour-pur-DUcWMZhC.js","assets/ChiffreDesPrestations-B3uyj0mt.js","assets/Classement-C3e6CZbM.js","assets/Classement-CmpbQZDu.css","assets/classement-pur-CQOYU06l.js","assets/client-Df-UPKwn.js","assets/cloture-du-jour-DvsUa5nQ.js","assets/ClotureDuTiroir-CDWULjZF.js","assets/Coffre-BlE7M3tK.js","assets/collecte-mtn-pur-Bq3uWgWT.js","assets/components-C7Kn4U_1.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-B-8o47IX.js","assets/Comptes-DDg60j7I.js","assets/consultation-C9IE5d8f.js","assets/consultation-CRW6QcWf.css","assets/Consultations-C73AyRR4.js","assets/Consultations-DiE-2_mG.css","assets/consultNotes-BWEyCGN_.js","assets/Conversations-D4WwB5Zo.css","assets/Conversations-oo80EkZ0.js","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-DhBY6rjn.js","assets/currency-Cd0clE4P.js","assets/Customers-CnPfeUkR.js","assets/Dashboard-B2x7VsE_.css","assets/Dashboard-CEhsI3V2.js","assets/dates-c5ZmiYnz.js","assets/Demandes-5RN_fUXU.js","assets/DepenseEnUnePhrase-BIGRlGqP.css","assets/DepenseEnUnePhrase-DreOuXAV.js","assets/Depenses-BG_CP0mK.js","assets/depenses-saisie-CsYF6Gy0.js","assets/devis-remis-Byk-6Uem.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-BxnLAdNM.js","assets/diagnostics-au-trone-C4_jyeOp.js","assets/Dictee-C-pUYYFA.css","assets/Dictee-KEuSqyaQ.js","assets/dictee-pur-yEeMkjS9.js","assets/Discussions-DV7MJ1Qc.js","assets/echappe-html-pur-gEhHOM07.js","assets/EditeurDesOffres-BO0P1cNV.js","assets/Encaissements-CuaUq67k.js","assets/enfants-drmZGfBF.js","assets/Engagements-CFkk9R0A.js","assets/Engagements-Cj5S9MhG.css","assets/engagements-coffre-DpBMdwUZ.js","assets/EntreDeuxSeances-C4Sg3dVs.js","assets/es-BEBMYJwM.js","assets/Evaluation-CR2e2qTC.js","assets/facture-B2mW9zrb.js","assets/Factures-COfwmT39.js","assets/FenetreDeLAgent-DFcC_-ec.js","assets/FenetreDesCivilites-CiWkG0qa.js","assets/FenetreDesCivilites-zfNk1aak.css","assets/FenetreDuPoint-C1KaiB_y.js","assets/Fil-BpmZVOVU.js","assets/finances-C8x7Mn4-.css","assets/fon-CJFfXTKi.js","assets/Fournisseurs-DHYAa0mL.js","assets/fournisseurs-DyD3-mlv.js","assets/foyer-C6rQXkXK.js","assets/gerard-donnees-_OcCCCks.js","assets/Gerard-DQ68LjSM.js","assets/Gerard-vo2IWvP3.css","assets/gestes-conversation-7_5u9TFG.js","assets/heures-des-rappels-pur-BWJPB8OP.js","assets/HomeRituals-JM5YAXQ7.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-Cba5HsZn.js","assets/ia-centre-DTLqZoNl.js","assets/ia-diagnostic-pur-qGnFEvys.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-tableau-pur-p6UvREJe.js","assets/identite-CdBwsG9I.js","assets/index.es-BPzPBbF9.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-CuPmlv16.js","assets/jspdf.es.min-BoICmge-.js","assets/JustePrix-Cwn9ddiS.js","assets/kkiapay-B68hus0R.js","assets/kkiapay-widget-CVmsl9OE.js","assets/Laboratoire-BMRJDMNk.js","assets/LaJournee-Bn_G0HCt.css","assets/LaJournee-CY9xAdi9.js","assets/le-caissier-pur-SCAuVgKh.js","assets/LesPaiements-BGgzKo47.js","assets/LesPaiements-C9cEZlne.css","assets/LettresAuDossier-jjPlKS2s.js","assets/LienMndPay-_sNFUb3W.js","assets/Marketing-BOF4qBJ2.js","assets/MarketingBranche-chOmwDFz.js","assets/Marque-jPDFet7i.js","assets/MesPourboires-aLHZ0OBf.js","assets/MesPourboires-CENjelyb.css","assets/MesTaches-Cc4XUDf6.css","assets/MesTaches-Df7hlYrx.js","assets/momo-C2ZVfV9J.js","assets/MonMois-Dj5dX2sK.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/MtnMoMo-CzG5jdc0.js","assets/objectifs-BgamSTHi.js","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/opale-BfaL6xZc.js","assets/oreille-B1AMUmZh.js","assets/paie-du-5-BAyuEkxJ.js","assets/paie-du-5-DeJq-K_U.css","assets/paie-du-5-pur-CPiCK8fv.js","assets/paie-par-mtn-47vtI-tZ.js","assets/PaieParMtn-Cv9tvfRm.js","assets/paliers-DG91h843.js","assets/Parametres-BzcwkJiF.js","assets/parcours-f-Xd7Xhs.js","assets/Parrainages-BFiQZ4uF.js","assets/Parrainages-gAHAPB_6.css","assets/PassageAvantLeFauteuil-9RsSq1OE.js","assets/pdf-DFqZaKs6.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/periode-des-pourboires-pur-BUWqfwov.js","assets/Personas-BIWfqprK.js","assets/Personnel-FmTxG25-.js","assets/photo-CBYYan3q.js","assets/pilotage-D8kf1Co8.css","assets/porte-de-l-equipe-DXkmqU6t.js","assets/Pourboires-19z5GqFG.js","assets/Predictions-Dyt9hUmI.js","assets/preload-helper-BRe_O-Rg.js","assets/Prestataires-BXAm5NAw.js","assets/Prets-B8Opgz_A.js","assets/PrevisionDuMois-CUx6MIbI.js","assets/PrevisionDuMois-DlFTw3OX.css","assets/Previsions-9BU2Vg1T.css","assets/previsions-pur-CcZk1b7u.js","assets/Previsions-Uj54EmTh.js","assets/processus-pur-R6U5QcCi.js","assets/Projets-COO7WDEE.css","assets/Projets-DeQs6VYR.js","assets/projets-pur-2ZEMRNDU.js","assets/projets-y64_lPIS.js","assets/protocoles-DjvWuguO.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-CTH30Wac.js","assets/quiz-5qMPWZVi.js","assets/Rapport-WlhN4GvX.js","assets/Recommandations-7bCNk_iL.js","assets/regler-DABmth3p.js","assets/regler-DHR_B1Dm.css","assets/regler-par-fedapay-pur-G8CEJdGn.js","assets/relances-pur-BacTXlI2.js","assets/releve-des-avis-Dtbg9XTz.js","assets/SalonFoyer-WAlSia_u.js","assets/secretariat-admin-DfOuC4tE.js","assets/Secretariat-Cy79Zw30.css","assets/Secretariat-Dp1iIHdn.js","assets/Signatures-1NSiuXcZ.js","assets/SignerUnPdf-BjVd54EO.js","assets/Synthese-BBfe0m7Z.js","assets/SyntheseGraphes-C7xyo7r8.js","assets/systeme-TPy-pF7j.css","assets/Tableau-B-doPdp1.js","assets/temps-sWfBP6kj.js","assets/Textes-DLpOzRbT.css","assets/Textes-V7Wv4_Ev.js","assets/tiroirs-CkDzpGy0.css","assets/tiroirs-D7_jXnBM.js","assets/trone-BPFk-AJx.js","assets/trone-Dqek9O2C.css","assets/useAudiences-CHS-B8ga.js","assets/useClotureDuJour-ZOHZWWft.js","assets/visios-DmtWr-bJ.js","assets/Vitrine-BWilTqQJ.css","assets/Vitrine-C-gnh-Dl.js","assets/_admin-Dlf20Nsn.js","assets/_contrat-C_qDNzr5.js","assets/_reuni-BrGx7UtI.js","assets/_shared-CDHPPkzE.js","assets/_signature-Lg4nOPSo.js","assets/_ui-3ANY8hcq.js","assets/_ui-BrUDlmuM.css"];
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
