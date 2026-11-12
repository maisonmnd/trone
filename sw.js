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
const BUILD = "20261112102730";
const A_GARDER = ["./","assets/Abonnements-BRoPoRIP.js","assets/abonnements-DNqkmJoD.js","assets/Abonnements-DTY7p2DH.css","assets/Academie-B0eBjOP1.js","assets/Acces-mbcUCzwv.js","assets/AFaire-DJO3acrq.js","assets/afaire-pa3WzPaH.js","assets/Agents-BkAcuXtD.js","assets/agents-donnees-DwWgxiAh.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-BpQ136N0.js","assets/Appels-Ys1xBthl.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/Assistants-D9i2Xwmg.css","assets/Assistants-DFiANxcK.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/AtelierDesContenus-DSliJQc5.js","assets/Audience-DYBtSzIh.js","assets/Aujourdhui-C2GoaHx2.js","assets/avant-le-fauteuil-lecture-DMawOm8M.js","assets/AvantLeFauteuil-DTCBzTt0.js","assets/avis-fiches-D74j1zoT.js","assets/AvisGoogle-DaPXfwX9.css","assets/AvisGoogle-DoSHDBoH.js","assets/BadgeEssai-BAUVMz6d.js","assets/bilan-B-bfPYR0.css","assets/bilan-Y0bISYtm.js","assets/BilanMensuel-_7eWgkT5.js","assets/Branches-B12RYCd6.js","assets/bridges-CGS9TBHZ.js","assets/caisse-du-soir-BGP_druy.js","assets/caisse-du-soir-C6vPx-E_.css","assets/Caisse-rekizvjO.js","assets/Caisses-DXXTCeTB.js","assets/Calendrier-CM1-5QUM.js","assets/campagnes-pur-CFJizdBd.js","assets/Carnet-BgHIJy7o.js","assets/carte-CglghQ_R.js","assets/carte-_W_-xBPj.css","assets/CarteModal-ywxNptCa.js","assets/CartesCadeaux-DYZQlJzY.js","assets/Catalogue-Bh-2HZY3.js","assets/CentreDeCommande-C0_j_n7j.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-DBLx4vat.js","assets/certificat-CjwaYIeC.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-CQCHHMdR.js","assets/chiffre-du-jour-pur-BqNycWvV.js","assets/ChiffreDesPrestations-CjILDkKa.js","assets/client-ihytb2Pu.js","assets/cloture-du-jour-B7jHocP-.js","assets/ClotureDuTiroir-CIF_W3td.js","assets/Coffre-C0lusMSJ.js","assets/collecte-mtn-pur-DW4nw7-V.js","assets/components-cgkU7oik.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-LeBW8TjZ.js","assets/Comptes-CxfrE7Sw.js","assets/consultation-CRW6QcWf.css","assets/consultation-l2CZGIQl.js","assets/Consultations-06dKXcYd.js","assets/consultNotes-C3nOAxaA.js","assets/Conversations-CX5g4wkF.js","assets/Conversations-D4WwB5Zo.css","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-Dt1egNUW.js","assets/currency-qfIhGmrs.js","assets/Customers-CKkGakBZ.js","assets/Dashboard-B2x7VsE_.css","assets/Dashboard-CtBJxoF-.js","assets/dates-CKNh7cBa.js","assets/Demandes-CZ6u4DcJ.js","assets/DepenseEnUnePhrase-BIGRlGqP.css","assets/DepenseEnUnePhrase-BLj0_Fnh.js","assets/Depenses-DEJie1P1.js","assets/depenses-saisie-CUvDNDrS.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-CE9WrUlv.js","assets/diagnostics-au-trone-CugtMRSy.js","assets/Dictee-D2P9yM7v.css","assets/Dictee-DjtrhCpj.js","assets/dictee-pur-CmgacD7q.js","assets/Discussions-vF5RFt9x.js","assets/EditeurDesOffres-Dufpuh_J.js","assets/Encaissements-0PlplsRF.js","assets/enfants-DjoZn43T.js","assets/Engagements-Cj5S9MhG.css","assets/engagements-coffre-XTktdZ9e.js","assets/Engagements-DdnmcoWa.js","assets/EntreDeuxSeances-Bg3oBVgo.js","assets/Evaluation-BoAjzMjJ.js","assets/facture-1rXRSBhX.js","assets/Factures-PnTW9Mr6.js","assets/FenetreDesCivilites-DbB2R1TS.js","assets/FenetreDesCivilites-zfNk1aak.css","assets/FenetreDuPoint-Cfi6WX1i.js","assets/Fil-CroOYbpr.js","assets/finances-Ds4kOIUN.css","assets/fon-BnNuyZO0.js","assets/Fournisseurs-Cd_bc3r2.js","assets/fournisseurs-Cec0yN8G.js","assets/foyer-Cy7W2Am-.js","assets/Gerard-Cgj-zsJh.css","assets/gerard-donnees-BQyVIAxP.js","assets/Gerard-DYhx-RDC.js","assets/gestes-conversation-BFOihXlE.js","assets/heures-des-rappels-pur-Dig9pZpo.js","assets/HomeRituals-BO2oZKRG.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-Dn-KyD5z.js","assets/ia-centre-CjOpgR0z.js","assets/ia-diagnostic-pur-BBLrGY5l.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-tableau-pur-p6UvREJe.js","assets/identite-cpB67jZN.js","assets/index-BPNgMNDd.js","assets/index.es-CGfBX0J2.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-D-npbwb0.js","assets/jspdf.es.min-BdicWDvI.js","assets/JustePrix-BoSlOyQy.js","assets/kkiapay-B7YBij_4.js","assets/kkiapay-widget-DnUhUNd4.js","assets/Laboratoire-CJ92KOHR.js","assets/LaJournee-B8zNJWas.js","assets/LaJournee-Bn_G0HCt.css","assets/LesPaiements-B9UVU77b.js","assets/LesPaiements-C9cEZlne.css","assets/LettresAuDossier-DOqd1Eh4.js","assets/LienMndPay-B7oyu0oF.js","assets/Marketing-BxeBQPRr.js","assets/MarketingBranche-oewFfvKN.js","assets/Marque-Bj1HFWrB.js","assets/MesPourboires-CENjelyb.css","assets/MesPourboires-mYWbYYGC.js","assets/MesTaches---t-NCgP.js","assets/MesTaches-Cc4XUDf6.css","assets/momo-C2ZVfV9J.js","assets/MonMois-CnvSXk7J.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/MtnMoMo-BEvYKYR2.js","assets/objectifs-B3E9NNT_.js","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/opale-BAG9ipPl.js","assets/oreille-B1AMUmZh.js","assets/paie-du-5-3TLnlR0j.js","assets/paie-du-5-DeJq-K_U.css","assets/paie-du-5-pur-CPiCK8fv.js","assets/paie-par-mtn-BbSlbqoy.js","assets/PaieParMtn-fJ6F8UGW.js","assets/paliers-BcCYAKXt.js","assets/Parametres-Bu68FkK5.js","assets/parcours-DU31AacP.js","assets/Parrainages-gAHAPB_6.css","assets/Parrainages-XpMW4I3H.js","assets/PassageAvantLeFauteuil-DDe1ZWkv.js","assets/pdf-ve5MBc1R.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/periode-des-pourboires-pur-BUWqfwov.js","assets/Personas-BXu5WZai.js","assets/Personnel-oDBfvP9n.js","assets/photo-RwkwGza5.js","assets/pilotage-D8kf1Co8.css","assets/Pourboires-CBskNPjm.js","assets/Predictions-YiFD9DlN.js","assets/Prestataires-hFmbCRXp.js","assets/Prets-DAxoxF5W.js","assets/PrevisionDuMois-Bd1UDtM-.js","assets/PrevisionDuMois-DlFTw3OX.css","assets/Previsions-9BU2Vg1T.css","assets/Previsions-C_VmZTFX.js","assets/previsions-pur-BgwAXIyO.js","assets/processus-pur-R6U5QcCi.js","assets/projets-BwZJB06b.js","assets/Projets-COO7WDEE.css","assets/Projets-Ct9v7yta.js","assets/projets-pur-2ZEMRNDU.js","assets/protocoles-DfilZDAU.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-BlwQjiHW.js","assets/qualification-BtnUZ4QG.js","assets/quiz-5qMPWZVi.js","assets/Rapport-BhmGFnjB.js","assets/Recommandations-CZPJpvCz.js","assets/regler-BMGYJ239.js","assets/regler-DHR_B1Dm.css","assets/relances-pur-BacTXlI2.js","assets/releve-des-avis-DK7BMDU8.js","assets/SalonFoyer-vY6--fzz.js","assets/secretariat-admin-BBnm2GvL.js","assets/Secretariat-Cy79Zw30.css","assets/Secretariat-Dhrigkge.js","assets/Signatures-Du9ludFI.js","assets/SignerUnPdf-LeKUlU0L.js","assets/Synthese-CXrNtS32.js","assets/SyntheseGraphes-DqJTdhrO.js","assets/systeme-TPy-pF7j.css","assets/Tableau-BidAT05t.js","assets/temps-D54uNwq-.js","assets/Textes-DLpOzRbT.css","assets/Textes-mEpBq1Ye.js","assets/tiroirs-CkDzpGy0.css","assets/tiroirs-DfnmHhzf.js","assets/trone-B7VRbU3m.js","assets/trone-D-JVcd4-.css","assets/useAudiences-DJjWjbqE.js","assets/useClotureDuJour-qITsXrAA.js","assets/Vitrine-BhmiCNVz.js","assets/Vitrine-BWilTqQJ.css","assets/_admin-CL9zowcz.js","assets/_contrat-okxdlHqe.js","assets/_reuni-D86Xkp5-.js","assets/_shared-mSKLz7vj.js","assets/_signature-CJqQ6Gzt.js","assets/_ui-BrUDlmuM.css","assets/_ui-D9FCXuwp.js"];
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
