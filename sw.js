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
const BUILD = "20261027214820";
const A_GARDER = ["./","assets/abonnements-CnzwPfQ8.js","assets/Abonnements-CrU8ZSIX.js","assets/Academie-DpmegJMM.js","assets/Acces-NwFyskDC.js","assets/actions-Chf6g0Wn.js","assets/AFaire-AFA9HKxt.js","assets/afaire-B77EGnGF.js","assets/Agents-BqztsbPF.js","assets/agents-donnees-DmF4f1e0.js","assets/Agents-LEr6pgmX.css","assets/agents-maison-pur-CVfQfzK-.js","assets/Analytics-C5KugHUS.js","assets/Appels-BygR19f7.js","assets/arrivee-pure-DULmgjT7.js","assets/asset-C3YTuUEK.js","assets/AtelierDesContenus-D3-p6F2A.css","assets/AtelierDesContenus-DmKN1Fhk.js","assets/AuComptoir-Dru5URLq.js","assets/Audience-Ddmr1bjK.js","assets/Aujourdhui-BSQP3mFr.js","assets/avis-fiches-D_voAAgB.js","assets/AvisGoogle-C9alvT65.js","assets/AvisGoogle-DaPXfwX9.css","assets/bilan-B-bfPYR0.css","assets/bilan-DAjDRSaX.js","assets/BilanMensuel-DIdpVG6L.js","assets/Branches-D6_gtZzU.js","assets/bridges-lWOIIPhD.js","assets/Caisse-C6obd3fg.js","assets/caisse-du-soir-Det30pFA.js","assets/Caisses-BeKiT0Vz.js","assets/Calendrier-SGVjatxj.js","assets/campagnes-pur-wbWg0hr-.js","assets/Carnet-BKDKvLvL.js","assets/carte-DWmjx4KV.js","assets/carte-_W_-xBPj.css","assets/CarteModal-Blwp2459.js","assets/CartesCadeaux-o5KsGv3l.js","assets/Catalogue-2qeNiKBf.js","assets/CentreDeCommande-D0Hsb2A3.js","assets/CentreDeCommande-Du8kyJhp.css","assets/Cercle-B89u5V8G.js","assets/certificat-DqSLRHzU.js","assets/certificat-zvlciltM.css","assets/certificats-coffre-BwKEVKwk.js","assets/chiffre-du-jour-pur-ByjGdSzk.js","assets/ChiffreDesPrestations-PFWvKmPD.js","assets/client-Btp_J-Qr.js","assets/ClotureDuTiroir-C6vPx-E_.css","assets/ClotureDuTiroir-PtpCYHI3.js","assets/Coffre-DqTLgmqT.js","assets/components-DrCRu7w0.js","assets/compte-B1q1PxK0.js","assets/compte-courant-ByzulCEN.js","assets/CompteCourant-CrK-doHg.js","assets/Comptes-CDi3X1LM.js","assets/Comptoir-CS9GhAKr.js","assets/consultation-CRW6QcWf.css","assets/consultation-DpVsAmrh.js","assets/Consultations-B1KKqwdF.js","assets/consultNotes-CjoAMMtb.js","assets/Conversations-D4WwB5Zo.css","assets/Conversations-Y4U0EiXj.js","assets/cormorant-italique-latin-C-nL33vl.woff2","assets/cormorant-italique-latin-ext-PWzi_-0y.woff2","assets/cormorant-latin-CUoBjw-S.woff2","assets/cormorant-latin-ext-ltf1AbuM.woff2","assets/Creances-B3kHFkK8.js","assets/currency-qfIhGmrs.js","assets/Customers-Cw3N3VUN.js","assets/Dashboard-BamPFldM.js","assets/Dashboard-zjGteuUE.css","assets/dates-DKGIxZQA.js","assets/Demandes-DVeFZ34r.js","assets/Depenses-D4q9gvmg.js","assets/dernier-message-pur-CBYWnq8m.js","assets/devise-fon-DX3P0bG4.woff2","assets/diagnostic-locks-BKagnC86.js","assets/diagnostics-au-trone-BVjS-zXd.js","assets/Discussions-nnVL4qFY.js","assets/EditeurDesOffres-UdpJwsl9.js","assets/Encaissements-CtH7BWCn.js","assets/enfants-Dg6ZzJa1.js","assets/Engagements-C37HnGev.js","assets/Engagements-Cj5S9MhG.css","assets/EntreDeuxSeances-CJUiGdoL.js","assets/equipe-B_9ZHz24.css","assets/Evaluation--bPl3v_B.js","assets/FacturePrestataire-B3m3GYlu.js","assets/Factures-BsIiwOZ5.js","assets/Fil-Dryy10aa.js","assets/finances-BMFnlkRx.css","assets/fon-pur-CgVkbJ8O.js","assets/fon-RWfx8sxW.js","assets/fournisseurs-B5GQYbky.js","assets/Fournisseurs-BJW0tNf7.js","assets/foyer-DUwyiGWE.js","assets/Gerard-CUvkbLSl.css","assets/gerard-donnees-B65j2GyT.js","assets/Gerard-qGSMfVsK.js","assets/gestes-conversation-DNQnoGT7.js","assets/HomeRituals-BbQQVwp6.js","assets/html2canvas.esm-QH1iLAAe.js","assets/ia-atelier-Bvg-aVD1.js","assets/ia-centre-Bmt_K565.js","assets/ia-diagnostic-pur-hHYxp10Y.js","assets/ia-marque-pur-C5lSdGpx.js","assets/ia-recu-pur-DcucZqpR.js","assets/identite-CEyRJ-2i.js","assets/index-DL_gJZc7.js","assets/index.es-Cruv03XB.js","assets/jost-latin-ext-BDUtSsKd.woff2","assets/jost-latin-ObQm3Zd1.woff2","assets/Journal-BfWii08x.js","assets/jspdf.es.min-_JCiwKLr.js","assets/JustePrix-yR0uN0_z.js","assets/kkiapay-CKwr-757.js","assets/kkiapay-widget-DnUhUNd4.js","assets/Laboratoire-Baa3nG9r.js","assets/laboratoire-CFP_0R-j.js","assets/LettresAuDossier-BLoN3ieY.js","assets/LienMndPay-DG4ZjO3I.js","assets/maisons-CSSFrqZy.js","assets/Marketing-Ywy_TStr.js","assets/MarketingBranche-DJllw1ZI.js","assets/Marque-CYGKU9EV.js","assets/MesTaches-Cc4XUDf6.css","assets/MesTaches-CjCHfWdS.js","assets/momo-C2ZVfV9J.js","assets/MonMois-Ckti74zZ.js","assets/monograms/mono-argile.png","assets/monograms/mono-copper.png","assets/monograms/mono-indigo-profond.png","assets/monograms/mono-indigo.png","assets/monograms/mono-ivoire.png","assets/monograms/mono-obsidian.png","assets/monograms/mono-or.png","assets/monograms/mono-sable.png","assets/objectifs-des-fauteuils-pur-B8M79P56.js","assets/objectifs-ikWX9yNz.js","assets/paliers-D83FD0jr.js","assets/Parametres-B5qFJlw_.js","assets/parcours-CcYYUEPG.js","assets/Parrainages-B8VaWtB8.js","assets/Parrainages-gAHAPB_6.css","assets/pdf-BajqCNcQ.js","assets/pdf-VJcNm7C7.js","assets/pdf.worker.min-uNib_u9P.js","assets/Personas-DNiTX32E.js","assets/Personnel-DXwsXIrQ.js","assets/photo-DekhjFpK.js","assets/pilotage-D8kf1Co8.css","assets/Predictions-fY8XeL7q.js","assets/Prestataires-4IZUnLN_.js","assets/prestataires-KYAJ4Sxc.js","assets/Prets-D7XlKTFu.js","assets/prevision-du-mois-pur-D6sJa5lw.js","assets/Previsions-D-0__Buz.css","assets/Previsions-Drt_Vl-T.js","assets/previsions-pur-0y1G4Z2o.js","assets/processus-pur-BLN25j-E.js","assets/projets-CArKbvUp.js","assets/Projets-COO7WDEE.css","assets/Projets-DFL5k8b5.js","assets/projets-pur-2ZEMRNDU.js","assets/protocoles-CW5wltMV.js","assets/purify.es-BwoZCkIS.js","assets/qrcode-QMPRWlhW.js","assets/QrCodes-CIMwbq1n.js","assets/qualification-DeAwrynI.js","assets/quiz-5qMPWZVi.js","assets/Rapport-ucfw6CIu.js","assets/RattacherUneCarte-DOFRjz1g.js","assets/Recommandations-HF9h0uMo.js","assets/regler-B5qeap0s.js","assets/regler-C5hcM02_.css","assets/regler-la-seance-serveur-BpExlC5z.js","assets/relances-pur-DsIo28uB.js","assets/releve-des-avis-ClKdmkEm.js","assets/SalonFoyer-CD2ciaac.js","assets/secretariat-admin-DBV64Dg_.js","assets/Secretariat-Bpn2e_q7.js","assets/Secretariat-Cy79Zw30.css","assets/Signatures-CubjPV7L.js","assets/SignerUnPdf-DHEA-sy_.js","assets/Synthese-CgvCNwFA.js","assets/SyntheseGraphes-C6a2G21h.js","assets/systeme-C3XFIa8E.css","assets/Tableau-SPtmiU2H.js","assets/temps-BF7lnaUG.js","assets/Textes-CEVOxvgD.js","assets/Textes-DLpOzRbT.css","assets/tiroirs-po3xi19V.js","assets/trace-du-moyen-pur-Bx8-suHn.js","assets/trone-B1Q9mlRH.js","assets/trone-CfGCPWMq.css","assets/ui-C8W_Nm4W.js","assets/useAudiences-D7KSh34s.js","assets/vente-C7YWXkHo.css","assets/Vitrine-BWilTqQJ.css","assets/Vitrine-Gg0H1JpU.js","assets/_admin-XwS66W3j.js","assets/_contrat-DanzDtb_.js","assets/_heures-jIKhmDlO.js","assets/_reuni-CYCgPNWZ.js","assets/_shared-D1f0dtHN.js","assets/_signature-5wU6kwLn.js","assets/_ui-BWMA-PlM.css","assets/_ui-LdA2a57D.js"];
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
