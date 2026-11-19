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
const BUILD = "20261119192558";
const A_GARDER = ["./","assets/AFaire-uOPr-9ur.js","assets/Abonnements-Bp8HCu2d.js","assets/Abonnements-DTY7p2DH.css","assets/Academie-Cbicunka.js","assets/Acces-CPbSZjAT.js","assets/Agents-LEr6pgmX.css","assets/Agents-q2sw3nlr.js","assets/Analytics-BkSTO2F3.js","assets/App-DYA1mXTs.js","assets/Appels-Yb6j_Ldj.js","assets/Assistants-D9i2Xwmg.css","assets/Assistants-lUyl6jly.js","assets/AtelierDesContenus-D1EbyY7o.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/Audience-Bnf2QHzG.js","assets/Aujourdhui-DqL9AxjP.js","assets/AvantLeFauteuil-CLqQgR-Q.js","assets/AvisGoogle-1VFTZE93.js","assets/AvisGoogle-DaPXfwX9.css","assets/BadgeEssai-CfQdMee6.js","assets/BadgeSuggere-Bzyh4Wrj.js","assets/BesoinsEtRegles-BLwxGVV5.css","assets/BesoinsEtRegles-BPEEM3bk.js","assets/BilanMensuel-D0IfOtXz.js","assets/Branches-BZQGiCV4.js","assets/Caisse-BaY1Y6D-.js","assets/Caisses-rEoKsYm3.js","assets/Calendrier-B2rICsAO.js","assets/Carnet-Cm2FvcLd.js","assets/CarteModal-BGRS9S21.js","assets/CartesCadeaux-CWdH5dgv.js","assets/Catalogue-CjTKG2fP.js","assets/CentreDeCommande-D-dk03-3.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-CXL-KKS4.js","assets/ChiffreDesPrestations-GJ-eCXaS.js","assets/ClotureDuTiroir-Cs34oif0.js","assets/Coffre-CsM3UB3-.js","assets/CompteCourant-DUC6iMBv.js","assets/Comptes-DQxBotyT.js","assets/Consultations-DiE-2_mG.css","assets/Consultations-bKjRoDCY.js","assets/Conversations-B19-XT_8.js","assets/Conversations-D4WwB5Zo.css","assets/Creances-CfTWteU8.js","assets/Customers-MrPuGt--.js","assets/Dashboard-B2x7VsE_.css","assets/Dashboard-ZqRiSI4F.js","assets/Demandes-BqviWaEg.js","assets/DepenseEnUnePhrase-BIGRlGqP.css","assets/DepenseEnUnePhrase-CKkmW0Bz.js","assets/Depenses-Erh3rNMF.js","assets/Dictee-C-pUYYFA.css","assets/Dictee-gU-DMx7-.js","assets/Discussions-DHnEIWeD.js","assets/EditeurDesOffres-5dYQnols.js","assets/Encaissements-Hb5bu9v7.js","assets/Engagements-BJOHykA8.js","assets/Engagements-Cj5S9MhG.css","assets/EntreDeuxSeances-DD7b056g.js","assets/Evaluation-zCL4lOIs.js","assets/Factures-DmkcYZFa.js","assets/FenetreDeLAgent-65g4H6dn.js","assets/FenetreDesCivilites-BTzx1Zug.js","assets/FenetreDesCivilites-zfNk1aak.css","assets/FenetreDuPoint-CYwrUBU0.js","assets/Fil-CS2xWRGK.js","assets/Fournisseurs-BNBM3A4u.js","assets/Gerard-B4egzF6b.js","assets/Gerard-vo2IWvP3.css","assets/HomeRituals-C3EMqCSI.js","assets/Journal-H1VKA7BA.js","assets/JustePrix-taVA37mI.js","assets/LaJournee-Bn_G0HCt.css","assets/LaJournee-qt2nTC-k.js","assets/Laboratoire-WUYPgQSp.js","assets/LesPaiements-C9cEZlne.css","assets/LesPaiements-DKffxMeO.js","assets/LettresAuDossier-Dn1hVCUW.js","assets/LienMndPay-CojEBG5k.js","assets/Marketing-DKQpgHri.js","assets/MarketingBranche-CNxs8ZoI.js","assets/Marque-Dzf-rtpE.js","assets/MesPourboires-1_EPRizO.js","assets/MesPourboires-CENjelyb.css","assets/MesTaches-Cb-Dqo2m.js","assets/MesTaches-Cc4XUDf6.css","assets/MonMois-16k6MON1.js","assets/MtnMoMo-DXPzuEWI.js","assets/PaieParMtn-DT9nFK-7.js","assets/Parametres-BBVhvrU9.js","assets/Parrainages-CQorJjFH.js","assets/Parrainages-gAHAPB_6.css","assets/PassageAvantLeFauteuil-CWrCUU0S.js","assets/Personas-Dm4zzJu9.js","assets/Personnel-DoTfu1RN.js","assets/Pourboires-CvNKgZOD.js","assets/Predictions-DpkfYCTJ.js","assets/Prestataires-BIL3Lxat.js","assets/Prets-BF3gHUp6.js","assets/PrevisionDuMois-DPaJdB49.js","assets/PrevisionDuMois-DlFTw3OX.css","assets/Previsions--2qfHYaA.js","assets/Previsions-9BU2Vg1T.css","assets/Projets-C-2rRkf6.js","assets/Projets-COO7WDEE.css","assets/QrCodes-CTFI6m0O.js","assets/Rapport-B7Q49mF9.js","assets/Recommandations-Ccg_ReR9.js","assets/SalonFoyer-DvgO-8Tq.js","assets/Secretariat-Bm9zwlFx.js","assets/Secretariat-Cy79Zw30.css","assets/Signatures-DC9llsb9.js","assets/SignerUnPdf-Sq9UkY7Q.js","assets/Synthese-BywdV1KY.js","assets/SyntheseGraphes-C7xxZKSi.js","assets/Tableau-CBwPRB1E.js","assets/Textes-ChlJxmjV.js","assets/Textes-DLpOzRbT.css","assets/Vitrine-BWilTqQJ.css","assets/Vitrine-B_GEb3jz.js","assets/_admin-lU21XIv_.js","assets/_contrat-gwFk5Ok3.js","assets/_reuni-D0ic54pQ.js","assets/_shared-CZs3mu5g.js","assets/_signature-Df9LgF6f.js","assets/_ui-BrUDlmuM.css","assets/_ui-CPJV-6G7.js","assets/abonnements-D2oNLQc6.js","assets/afaire-BNPtEjEA.js","assets/agents-donnees-BACAC6Iy.js","assets/agents-maison-pur-CVfQfzK-.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/auth-BWxBraRY.js","assets/avant-le-fauteuil-lecture-BK2QrRg0.js","assets/avis-fiches-5xW2nN_C.js","assets/besoins-BfnD1oJM.js","assets/bilan-B-bfPYR0.css","assets/bilan-Cc097GDS.js","assets/bridges-CJpnf3aW.js","assets/caisse-du-soir-C3i87fLe.js","assets/caisse-du-soir-C6vPx-E_.css","assets/campagnes-pur-Du-7mUI6.js","assets/carte-DO5kE659.js","assets/carte-_W_-xBPj.css","assets/certificat-jcETIiz-.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-DuM6Dgs9.js","assets/chiffre-du-jour-pur-ioBDhvm3.js","assets/client-BV8hIfoA.js","assets/cloture-du-jour-C94qgAiL.js","assets/collecte-mtn-pur-Bq3uWgWT.js","assets/components-CI_ad3U4.js","assets/compte-courant-ByzulCEN.js","assets/consultNotes-E7421meG.js","assets/consultation-CRW6QcWf.css","assets/consultation-DK2-jHfN.js","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/currency-Cd0clE4P.js","assets/dates-B5z9rZkU.js","assets/depenses-saisie-DhwwL3TQ.js","assets/devis-remis-CpAJhl-W.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-Dy7fiV7b.js","assets/diagnostics-au-trone-cxUuibUZ.js","assets/dictee-pur-BKjvz5h2.js","assets/echappe-html-pur-gEhHOM07.js","assets/enfants-i-dtUMuc.js","assets/engagements-coffre-DCjKL6Af.js","assets/facture-Bx4Yhufj.js","assets/finances-C8x7Mn4-.css","assets/fon-BBYsYVJc.js","assets/fournisseurs-Buk9RTcX.js","assets/foyer-1U8otk96.js","assets/gerard-donnees-CpC5vVWD.js","assets/gestes-conversation-22t_CYgs.js","assets/heures-des-rappels-pur-BWJPB8OP.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-VhflJKYP.js","assets/ia-centre-IrtMzt1J.js","assets/ia-diagnostic-pur-qGnFEvys.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-tableau-pur-p6UvREJe.js","assets/identite-DUNojN4R.js","assets/index-DBk1HZnx.js","assets/index.es-BnohSIft.js","assets/jost-latin-ObQm3Zd1.woff2","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jspdf.es.min-D7Vgc3JX.js","assets/kkiapay-O6O3Nrqg.js","assets/kkiapay-widget-Dy-AwcZ4.js","assets/le-caissier-pur-BXN7tzXz.js","assets/momo-C2ZVfV9J.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-BkT9Co2r.js","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/opale-C5-kgGRR.js","assets/oreille-B1AMUmZh.js","assets/paie-du-5-DeJq-K_U.css","assets/paie-du-5-_ROInacM.js","assets/paie-du-5-pur-CPiCK8fv.js","assets/paie-par-mtn-BkWm3GhY.js","assets/paliers-lGJ5io_5.js","assets/parcours-DDinzmIp.js","assets/pdf-VJcNm7C7.js","assets/pdf-fp-xUlWJ.js","assets/pdf.worker.min-uNib_u9P.js","assets/periode-des-pourboires-pur-BUWqfwov.js","assets/photo-LiJXiB21.js","assets/pilotage-D8kf1Co8.css","assets/porte-de-l-equipe-VoYQnxbP.js","assets/preload-helper-BRe_O-Rg.js","assets/previsions-pur-DX2hYRWk.js","assets/processus-pur-R6U5QcCi.js","assets/projets-CRusmzol.js","assets/projets-pur-2ZEMRNDU.js","assets/protocoles-DF1EEJiU.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/quiz-5qMPWZVi.js","assets/regler-BTz3NZ-K.js","assets/regler-DHR_B1Dm.css","assets/regler-par-fedapay-pur-G8CEJdGn.js","assets/relances-pur-BacTXlI2.js","assets/releve-des-avis-DXJUwlNc.js","assets/secretariat-admin-COV4IyTx.js","assets/systeme-TPy-pF7j.css","assets/temps-DawBU3MW.js","assets/tiroirs-BriH7Bit.js","assets/tiroirs-CkDzpGy0.css","assets/trone-B6tgVsDD.js","assets/trone-Dsdrwhxz.css","assets/useAudiences-UcuoBesH.js","assets/useClotureDuJour-5RZqUz5s.js","assets/visios-DYCs-sm7.js"];
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
