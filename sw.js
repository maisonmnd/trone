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
const BUILD = "20261119123548";
const A_GARDER = ["./","assets/Abonnements-CStNNrjv.js","assets/abonnements-DHHWttTA.js","assets/Abonnements-DTY7p2DH.css","assets/Academie-DEDOAH13.js","assets/Acces-8cklQwD_.js","assets/AFaire-BY0xNFZs.js","assets/afaire-DdlWO-r4.js","assets/agents-donnees-DTJXmTrE.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Agents-stAktoI1.js","assets/Analytics-vnQsbuv7.js","assets/App-B2r1zr24.js","assets/Appels-Bm_YZZmA.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/Assistants-D9i2Xwmg.css","assets/Assistants-jGZxU4sr.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/AtelierDesContenus-LfkVe9m3.js","assets/Audience-CyF1tuUQ.js","assets/Aujourdhui-Cu_IrTF4.js","assets/auth-Dnymmsj5.js","assets/avant-le-fauteuil-lecture-DTpKNTcE.js","assets/AvantLeFauteuil-5IMQ01on.js","assets/avis-fiches-spUWM_Rr.js","assets/AvisGoogle-BiUZMAMv.js","assets/AvisGoogle-DaPXfwX9.css","assets/BadgeEssai-CIq6Dwwq.js","assets/BadgeSuggere-BrkznsHc.js","assets/besoins-Bbj_DCG9.js","assets/BesoinsEtRegles-BLwxGVV5.css","assets/BesoinsEtRegles-BRrsmGOj.js","assets/bilan-B-bfPYR0.css","assets/bilan-BaqPdjog.js","assets/BilanMensuel-CPouYHUU.js","assets/Branches-ClAuqVEW.js","assets/bridges-B2ZEMQWP.js","assets/Caisse-4zRqL-R-.js","assets/caisse-du-soir-C6vPx-E_.css","assets/caisse-du-soir-DirUSinB.js","assets/Caisses-1PiiS_v0.js","assets/Calendrier-BIIa8AcL.js","assets/campagnes-pur-CeeiVrQ8.js","assets/Carnet-DDRwfcTT.js","assets/carte-BmMksm5s.js","assets/carte-_W_-xBPj.css","assets/CarteModal-DBtCBUXI.js","assets/CartesCadeaux-WIdyThmK.js","assets/Catalogue-PKsjDvh7.js","assets/CentreDeCommande-BwrSRK3v.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-BfuiiENc.js","assets/certificat-GQV7TFPW.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-Bd5FIRkI.js","assets/chiffre-du-jour-pur-CmCppi5F.js","assets/ChiffreDesPrestations-C1XcED8r.js","assets/client-8l6Nbcek.js","assets/cloture-du-jour-BX0iMw51.js","assets/ClotureDuTiroir-CFEVGB32.js","assets/Coffre-VHjYyaJd.js","assets/collecte-mtn-pur-Bq3uWgWT.js","assets/components-N33_t4kV.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-BtYqxyom.js","assets/Comptes-CJXpc-H8.js","assets/consultation-CRW6QcWf.css","assets/consultation-CYW0CNHv.js","assets/Consultations-DhChTzQK.js","assets/Consultations-DiE-2_mG.css","assets/consultNotes-DtsHE4Bo.js","assets/Conversations-D4WwB5Zo.css","assets/Conversations-K6yjfWbN.js","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-472NRAym.js","assets/currency-Cd0clE4P.js","assets/Customers-LdL__5Te.js","assets/Dashboard-B2x7VsE_.css","assets/Dashboard-LWPsC0_U.js","assets/dates-B_TlnoSj.js","assets/Demandes-Dx4uaeek.js","assets/DepenseEnUnePhrase-BIGRlGqP.css","assets/DepenseEnUnePhrase-CWlArDPq.js","assets/Depenses-A8NfAj35.js","assets/depenses-saisie-ZoKMlx3K.js","assets/devis-remis-C8FQNAin.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-CIDvQYEy.js","assets/diagnostics-au-trone-JyJ8FKih.js","assets/Dictee-C-pUYYFA.css","assets/Dictee-C0c3ttbS.js","assets/dictee-pur-DWyoWwv-.js","assets/Discussions-39lLn1GZ.js","assets/echappe-html-pur-gEhHOM07.js","assets/EditeurDesOffres-BvLEaqT4.js","assets/Encaissements-DBKVzkfQ.js","assets/enfants-BRqm9j7Q.js","assets/Engagements-Cj5S9MhG.css","assets/engagements-coffre-DPWMLYt_.js","assets/Engagements-Z8aBTlSM.js","assets/EntreDeuxSeances-B5N1JegJ.js","assets/es-DWXs7yEh.js","assets/Evaluation-C_M5Ys7-.js","assets/facture-CaAs2Txm.js","assets/Factures-BtE6zBQz.js","assets/FenetreDeLAgent-Cw_2PmgS.js","assets/FenetreDesCivilites-jEmrzU8s.js","assets/FenetreDesCivilites-zfNk1aak.css","assets/FenetreDuPoint-DUkItEAw.js","assets/Fil-BiJ8zWjw.js","assets/finances-C8x7Mn4-.css","assets/fon-V3QIhhK1.js","assets/fournisseurs-BBgqw8ZU.js","assets/Fournisseurs-BXej3Bzz.js","assets/foyer-DjKL7ztz.js","assets/Gerard-9fGJ56YM.js","assets/gerard-donnees-BuBqvLwc.js","assets/Gerard-vo2IWvP3.css","assets/gestes-conversation-CVEk6ueA.js","assets/heures-des-rappels-pur-BWJPB8OP.js","assets/HomeRituals-C63nHFxW.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-DpeNLzb0.js","assets/ia-centre-X8aps3cZ.js","assets/ia-diagnostic-pur-qGnFEvys.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-tableau-pur-p6UvREJe.js","assets/identite-BcYoeD4G.js","assets/index.es-CQ3bDUzk.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-1w4A2Yqf.js","assets/jspdf.es.min-ByKlzh9S.js","assets/JustePrix-CB-6U0rY.js","assets/kkiapay-C2Tn5qld.js","assets/kkiapay-widget-CVmsl9OE.js","assets/Laboratoire-BGSNWh1I.js","assets/LaJournee-Bn_G0HCt.css","assets/LaJournee-C2ANL4J5.js","assets/le-caissier-pur-DqwJKR0D.js","assets/LesPaiements-C9cEZlne.css","assets/LesPaiements-DvVvczkY.js","assets/LettresAuDossier-DwTZzTia.js","assets/LienMndPay-BSAX5EM-.js","assets/Marketing-bJXsap5d.js","assets/MarketingBranche-sA3bMzUn.js","assets/Marque-B-BMsTF8.js","assets/MesPourboires-BWxFLLdO.js","assets/MesPourboires-CENjelyb.css","assets/MesTaches-Cc4XUDf6.css","assets/MesTaches-nwNoMg6Z.js","assets/momo-C2ZVfV9J.js","assets/MonMois-BYN_T5HC.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/MtnMoMo-Dq0lOuEb.js","assets/objectifs-CynmY3U5.js","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/opale-B-uvqV28.js","assets/oreille-B1AMUmZh.js","assets/paie-du-5-DeJq-K_U.css","assets/paie-du-5-DzkugblS.js","assets/paie-du-5-pur-CPiCK8fv.js","assets/paie-par-mtn-BKilWCBl.js","assets/PaieParMtn-G-hisjJQ.js","assets/paliers-CBkZVTad.js","assets/Parametres-CBz6BYvC.js","assets/parcours-CxERLm5w.js","assets/Parrainages-CbaSwYwE.js","assets/Parrainages-gAHAPB_6.css","assets/PassageAvantLeFauteuil-Dpx4CvQ4.js","assets/pdf-6zQr7xiB.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/periode-des-pourboires-pur-BUWqfwov.js","assets/Personas-CRBHreO2.js","assets/Personnel-DsRFX06L.js","assets/photo-fOyoUQAF.js","assets/pilotage-D8kf1Co8.css","assets/porte-de-l-equipe-DJg0UfQi.js","assets/Pourboires-D-0w-Oci.js","assets/Predictions-D9e4XxBn.js","assets/preload-helper-BRe_O-Rg.js","assets/Prestataires-BceUvw9b.js","assets/Prets-4-WArVAU.js","assets/PrevisionDuMois-19gFfPD-.js","assets/PrevisionDuMois-DlFTw3OX.css","assets/Previsions-9BU2Vg1T.css","assets/Previsions-C0BRNgY-.js","assets/previsions-pur-BY2e5D4F.js","assets/processus-pur-R6U5QcCi.js","assets/Projets-BDdIzEvu.js","assets/projets-BqpRBkKR.js","assets/Projets-COO7WDEE.css","assets/projets-pur-2ZEMRNDU.js","assets/protocoles-CaDaHYfd.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-BjSGumTb.js","assets/quiz-5qMPWZVi.js","assets/Rapport-CYY3H_Jf.js","assets/Recommandations-CgBzle6i.js","assets/regler-B3o2yR1z.js","assets/regler-DHR_B1Dm.css","assets/regler-par-fedapay-pur-G8CEJdGn.js","assets/relances-pur-BacTXlI2.js","assets/releve-des-avis-jAjQt-TQ.js","assets/SalonFoyer-B-Dfj0_i.js","assets/secretariat-admin-BG222iq-.js","assets/Secretariat-BiyLhzjE.js","assets/Secretariat-Cy79Zw30.css","assets/Signatures-Ilh8umTk.js","assets/SignerUnPdf-AeClD8Zs.js","assets/Synthese-C47jCzP-.js","assets/SyntheseGraphes-Ca_roUZ2.js","assets/systeme-TPy-pF7j.css","assets/Tableau-DOgJCpzf.js","assets/temps-Dn6dmVDi.js","assets/Textes-DLpOzRbT.css","assets/Textes-LXvwz1wB.js","assets/tiroirs-CkDzpGy0.css","assets/tiroirs-DH9JfqSi.js","assets/trone-BKiPp7Fl.js","assets/trone-BvySetPd.css","assets/useAudiences-C6YmzO9v.js","assets/useClotureDuJour-BFcvLsZh.js","assets/visios-CVRdQIwV.js","assets/Vitrine-BWilTqQJ.css","assets/Vitrine-CUkhdOVD.js","assets/_admin-Dcxe_RLM.js","assets/_contrat-ibn5WipU.js","assets/_reuni-Cex6vlVW.js","assets/_shared-BZgkmQMD.js","assets/_signature-CwL5_YFm.js","assets/_ui-BrUDlmuM.css","assets/_ui-KClChxNV.js"];
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
