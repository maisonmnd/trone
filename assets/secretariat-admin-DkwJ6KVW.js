import{R as B,a as Z,B as Le,d as W,b as M,g as Se}from"./identite-BSSvYD9C.js";import{a as Ne}from"./asset-C3YTuUEK.js";import{jO as Re}from"./trone-BRcZQ0Nk.js";function ae(e){var t,n;return[(t=e==null?void 0:e.rccm)!=null&&t.trim()?`RCCM ${e.rccm.trim()}`:"",(n=e==null?void 0:e.ifu)!=null&&n.trim()?`IFU ${e.ifu.trim()}`:""].filter(Boolean).join(" · ")}const Rt=e=>/^\d{13}$/.test(e.replace(/\s/g,""));function Te(e,t){var i,a;if(e!=="mnd")return t?{rccm:t.rccm??"",ifu:t.ifu??""}:void 0;const n=de({entite:"mnd",rccm:t==null?void 0:t.rccm,ifu:t==null?void 0:t.ifu})??t;return{rccm:((i=n==null?void 0:n.rccm)==null?void 0:i.trim())||B.rccm,ifu:((a=n==null?void 0:n.ifu)==null?void 0:a.trim())||B.ifu}}const Ie=e=>e.toUpperCase().replace(/^\s*RCCM\s*/,"").replace(/^N°\s*/,"").replace(/\s+/g,""),Pe="RB/COT/12A14509",qe="3201200548614";function de(e){if(!e||e.entite!=="mnd")return null;const t=e.rccm??"",n=e.ifu??"",i=Ie(t)===Pe,a=n.replace(/\D/g,"")===qe;return!i&&!a?null:{rccm:i?B.rccm:t,ifu:a?B.ifu:n}}const je=["Madame, Monsieur,","Madame,","Monsieur,","Madame la Directrice,","Monsieur le Directeur,","Madame la Directrice générale,","Monsieur le Directeur général,","Chère Madame,","Cher Monsieur,","Bonjour,"],Oe=[{nous:"Nous vous prions d’agréer, {appel}, l’expression de nos salutations distinguées.",je:"Je vous prie d’agréer, {appel}, l’expression de mes salutations distinguées."},{nous:"Nous vous prions d’agréer, {appel}, l’expression de notre haute considération.",je:"Je vous prie d’agréer, {appel}, l’expression de ma haute considération."},{nous:"Veuillez agréer, {appel}, l’assurance de nos sentiments respectueux.",je:"Veuillez agréer, {appel}, l’assurance de mes sentiments respectueux."},{nous:"Dans l’attente de votre retour, nous vous prions d’agréer, {appel}, nos sincères salutations.",je:"Dans l’attente de votre retour, je vous prie d’agréer, {appel}, mes sincères salutations."},{nous:"Nous vous remercions de l’attention portée à notre demande et restons à votre disposition.",je:"Je vous remercie de l’attention portée à ma demande et reste à votre disposition."},{nous:"Avec nos remerciements, bien cordialement.",je:"Avec mes remerciements, bien cordialement."},{nous:"Cordialement.",je:"Cordialement."}];function Fe(e,t){const n=e.replace(/,\s*$/,"").trim(),i=!n||/^bonjour$/i.test(n)?"Madame, Monsieur":n,a=t==="perso"?"je":"nous";return Oe.map(s=>s[a].replace("{appel}",i))}const ye=/^(sarl|sa|sas|sasu|suarl|ei|et|de|du|la|le|les|des|d|l)$/i;function Y(e){const t=(e.normalize("NFD").replace(/[̀-ͯ]/g,"").match(/[A-Za-z0-9]+/g)??[]).filter(i=>!ye.test(i)),n=t.map(i=>i[0].toUpperCase()).join("").slice(0,4);return n.length>=2?n:(t[0]??"XX").slice(0,3).toUpperCase().padEnd(2,"X")}function we(e,t){var n;return e.entite==="mnd"?"MND-DOC":e.entite==="acia"?"ACIA":e.entite==="autre"?Y(((n=t.entreprise)==null?void 0:n.nom)??"XX"):`PERSO-${Y(t.auteurNom??"XX").slice(0,2)}`}function Be(e,t,n){const i=new RegExp(`^${e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}-${t}-(\\d+)$`);let a=0;for(const s of n){const o=i.exec(s??"");o&&(a=Math.max(a,parseInt(o[1],10)))}return`${e}-${t}-${String(a+1).padStart(3,"0")}`}const E={largeur:174,hauteur:46},U={largeur:42,hauteur:16},L=34;function me(e,t){const n=e==="gauche"?0:e==="centre"?46:92,i=t.filter(c=>c.startsWith("sig:")),a=i.length,s=a>1?Math.min(y,(E.largeur-U.largeur)/(a-1)):y,o=Math.max(0,Math.min(n+2,E.largeur-U.largeur-(a-1)*s)),u=i.map((c,l)=>({cle:c,x:o+l*s,y:2}));if(t.includes("tampon")){let c=n+82-L-2;if(a>1){const l=o+(a-1)*s+y,p=o-L-4;c=l+L<=E.largeur?l:p>=0?p:o+(a-1)*s+8}u.push({cle:"tampon",x:Math.min(c,E.largeur-L),y:4})}return u}const Ue=(e,t)=>{const{l:n,h:i}=k(e,t);return{...e,x:Math.min(Math.max(0,e.x),E.largeur-n),y:Math.min(Math.max(0,e.y),E.hauteur-i)}},_e=.5,Je=2,pe=(e,t)=>e==="tampon"?Ke(t??1):{l:U.largeur,h:U.hauteur};function fe(e,t,n){const i=pe(e,n),a=Math.min(Je,E.largeur/i.l,E.hauteur/i.h),s=typeof t=="number"&&Number.isFinite(t)?t:1;return Math.floor(Math.min(a,Math.max(_e,s))*100+1e-9)/100}function k(e,t){const n=pe(e.cle,t),i=e.echelle===void 0?1:fe(e.cle,e.echelle,t);return{l:n.l*i,h:n.h*i}}const Ve=(e,t,n)=>Ue({...e,echelle:fe(e.cle,t,n)},n),Tt=(e,t,n)=>e.map(i=>{var s;const a=(s=t.find(o=>o.cle===i.cle))==null?void 0:s.echelle;return a===void 0?i:Ve(i,a,n)});function It(e,t,n,i){const a=n*n+i*i;return a>0?Math.max(.05,1+(e*n+t*i)/a):1}const se=e=>e==="gauche"?2:e==="centre"?48:94,y=46,Pt=26;function ze(e,t){const n=s=>Math.max(0,Math.min(s,E.largeur-40));if(t.length>1&&e.signataires.length===t.length){const s=t.map((o,u)=>{const c=e.poses.find(l=>l.cle===`sig:${e.signataires[u].userId}`);return{...o,x:n((c==null?void 0:c.x)??u*y)}});return{colonnes:!0,noms:s,xEntite:Math.min(...s.map(o=>o.x))}}const i=e.poses.filter(s=>s.cle.startsWith("sig:")).sort((s,o)=>s.x-o.x)[0],a=e.cadre==="libre"?n((i==null?void 0:i.x)??se("droite")):se(e.cadre);return{colonnes:!1,noms:t.map(s=>({...s,x:a})),xEntite:a}}const Ge=e=>e.etat==="brouillon",Ye=e=>e.etat==="signe",ke=e=>e.etat==="brouillon",ge=e=>e.signataires.filter(t=>!e.poses.some(n=>n.cle===`sig:${t.userId}`&&n.image));function Xe(e,t){return!t||e.etat==="signe"||e.etat==="annule"?!1:ge(e).some(n=>n.userId===t)}function He(e,t,n,i){if(!Xe(e,t))return e;const a=`sig:${t}`,s=e.poses.find(l=>l.cle===a)??me(e.cadre==="libre"?"droite":e.cadre,[a])[0],o=[...e.poses.filter(l=>l.cle!==a),{...s,cle:a,image:n,signeLe:i,signePar:t}],u={...e,poses:o},c=ge(u).length===0;return{...u,etat:c?"signe":"a-signer",signeLe:c?i:e.signeLe}}const qt=e=>e.etat==="a-signer"&&!e.numero,jt=e=>(e.etat==="signe"||e.etat==="annule")&&!!e.numero,ve=e=>({...e,etat:"brouillon",signeLe:void 0,numero:void 0,poses:e.poses.map(({image:t,signeLe:n,signePar:i,...a})=>a)}),Ze=e=>e.replace(/\r\n/g,`
`).split(/\n\s*\n/).map(t=>t.trim()).filter(Boolean);function We(e){const[t,n,i]=(e??"").slice(0,10).split("-").map(Number);return!t||!n||!i?e:`${i===1?"1er":i} ${["janvier","février","mars","avril","mai","juin","juillet","août","septembre","octobre","novembre","décembre"][n-1]} ${t}`}const S={nom:"ACIA 1",rccm:"RB/COT/12 A 14509",adresse:"Quartier Suru-Léré, 06 BP 2076, Cotonou, Bénin",telephone:"+229 01 51 99 77 99",courriel:"direction@maisonmnd.com"};function Qe(e,t){var i,a,s;if(e==="mnd"){const o=ae(t.mentions);return{entite:e,nom:t.nomMaison,verrou:!0,lignes:[],expediteur:[],devise:!0,encre:"#1E2150",ville:"Cotonou",pied:[`${t.nomMaison} · Cotonou, Bénin · +229 01 51 99 77 99 · direction@maisonmnd.com`,...o?[o]:[]]}}if(e==="acia"){const o=ae({rccm:((a=(i=t.mentions)==null?void 0:i.rccm)==null?void 0:a.trim())||S.rccm,ifu:(s=t.mentions)==null?void 0:s.ifu});return{entite:e,nom:S.nom,verrou:!1,devise:!1,encre:"#1F3F7A",ville:"Cotonou",expediteur:[],lignes:[o,S.adresse,`Tél. ${S.telephone} · ${S.courriel}`],pied:[`${S.nom} · ${o} · Cotonou, Bénin`]}}if(e==="autre"){const o=t.entreprise??{nom:"Entreprise",mentions:"",telephone:""},u=[o.mentions.trim(),o.telephone.trim()?`Tél. ${o.telephone.trim()}`:""].filter(Boolean).join(" · ");return{entite:e,nom:o.nom.trim()||"Entreprise",verrou:!1,devise:!1,encre:"#23262B",expediteur:[],ville:oe(o.mentions)||"Cotonou",lignes:u?[u]:[],pied:[[o.nom.trim(),u].filter(Boolean).join(" · ")]}}const n=t.profil??{nom:"",adresse:"",telephone:""};return{entite:e,nom:n.nom.trim(),verrou:!1,devise:!1,encre:"#23262B",lignes:[],pied:[],ville:oe(n.adresse)||"Cotonou",expediteur:[n.nom.trim(),n.adresse.trim(),n.telephone.trim()?`Tél. ${n.telephone.trim()}`:""].filter(Boolean)}}function oe(e){return(e??"").split(/[,·]/).map(n=>n.trim()).filter(Boolean).filter(n=>!/^(bénin|benin|\d.*bp.*|.*\bbp\b.*|quartier.*|ilot.*|rccm.*|ifu.*|.*@.*)$/i.test(n)).pop()??""}function Ke(e){if(e<=1.05)return{l:L,h:L};const t=Math.min(L*1.45,E.largeur);return{l:t,h:t/e}}const Ot={largeur:210,marge:18,corpsPt:10.5,ligne:5.2,xDestinataire:105},Ft=[{cle:"lettres",titre:"Lettres officielles",dit:"Moov, fournisseur, toute lettre au nom de l’entreprise"},{cle:"clients",titre:"Clients et paiements",dit:"Relance, rappel avant mise en demeure, remerciement, réponse à une réclamation"},{cle:"fournisseurs",titre:"Fournisseurs et partenaires",dit:"Demande de devis, commande, partenariat, résiliation"},{cle:"equipe",titre:"Équipe",dit:"Convocation, avertissement, félicitations, fin de contrat, démission"},{cle:"administration",titre:"Administration et banque",dit:"Ouverture de compte, attestation fiscale ou CNSS, changement d’adresse ou de gérance, autorisation"},{cle:"attestations",titre:"Attestations",dit:"Travail, stage, formation, paiement"},{cle:"notes",titre:"Notes et comptes rendus",dit:"Note interne, procès-verbal, règlement"},{cle:"contrats",titre:"Contrats",dit:"Prestation, travail, apprentissage, avenant"},{cle:"oapi",titre:"Dossier OAPI",dit:"Lettre de dépôt, pouvoir au mandataire"},{cle:"juridiques",titre:"Juridiques",dit:"Procuration, mise en demeure, attestation sur l’honneur"},{cle:"perso",titre:"Lettre personnelle",dit:"En votre nom, pas celui de l’entreprise"},{cle:"libre",titre:"Document libre",dit:"Une page blanche à l’en-tête choisi"}],r="[À COMPLÉTER]",ce=[{cle:"lettre",famille:"lettres",titre:"Lettre officielle",objet:r,destinataire:`${r}
${r}
Cotonou, Bénin`,appel:0,cloture:0,corps:`${r}`},{cle:"demande",famille:"lettres",titre:"Lettre de demande",objet:`Demande de ${r}`,destinataire:`${r}
À l’attention de ${r}
Cotonou, Bénin`,appel:0,cloture:3,corps:`{entreprise}, établie à {ville}, souhaite ${r}.

À cet effet, nous vous adressons ${r}.

Nous restons à votre disposition pour tout renseignement complémentaire.`},{cle:"reclamation",famille:"lettres",titre:"Réclamation",objet:`Réclamation concernant ${r}`,destinataire:`${r}
Service clientèle
Cotonou, Bénin`,appel:0,cloture:0,corps:`Le ${r}, nous avons constaté ${r}.

Malgré ${r}, la situation n’a pas été résolue à ce jour.

Nous vous demandons de bien vouloir ${r} dans un délai de ${r} jours à compter de la réception du présent courrier.`},{cle:"relance-paiement",famille:"clients",titre:"Relance de paiement",objet:`Relance : facture n° ${r} restant due`,destinataire:`${r}
${r}
Cotonou, Bénin`,appel:0,cloture:3,corps:`Sauf erreur de notre part, la facture n° ${r} du ${r}, d’un montant de ${r} F CFA, reste à régler à ce jour.

Nous vous remercions de bien vouloir procéder à son règlement d’ici le ${r}, par ${r}.

Si ce règlement a été fait entre-temps, merci de ne pas tenir compte de ce courrier.`},{cle:"rappel-avant-demeure",famille:"clients",titre:"Dernier rappel avant mise en demeure",objet:`Dernier rappel : facture n° ${r}`,destinataire:`${r}
${r}
Cotonou, Bénin`,appel:0,cloture:0,aRelire:!0,corps:`Malgré notre relance du ${r}, la facture n° ${r} d’un montant de ${r} F CFA demeure impayée.

Nous vous demandons de régler cette somme sous ${r} jours à compter de la réception du présent courrier.

À défaut, nous serons contraints de vous adresser une mise en demeure, préalable à toute procédure de recouvrement.`},{cle:"remerciement-cliente",famille:"clients",titre:"Lettre de remerciement",objet:"Avec nos remerciements",destinataire:`${r}
Cotonou, Bénin`,appel:7,cloture:5,corps:`Nous tenons à vous remercier pour ${r}.

Votre confiance nous honore, et c’est un plaisir de vous accueillir à {entreprise}.

Nous restons à votre écoute pour ${r}.`},{cle:"reponse-reclamation",famille:"clients",titre:"Réponse à une réclamation",objet:`Votre réclamation du ${r}`,destinataire:`${r}
Cotonou, Bénin`,appel:0,cloture:0,corps:`Nous avons bien reçu votre réclamation du ${r} concernant ${r}, et nous vous remercions de nous l’avoir signalée.

Après vérification, ${r}.

Pour y remédier, nous vous proposons ${r}.

Nous restons à votre disposition pour en parler de vive voix.`},{cle:"demande-devis",famille:"fournisseurs",titre:"Demande de devis",objet:`Demande de devis : ${r}`,destinataire:`${r}
Service commercial
Cotonou, Bénin`,appel:0,cloture:3,corps:`{entreprise} souhaite recevoir votre meilleure offre pour ${r}.

Quantités et caractéristiques : ${r}.

Merci de préciser les prix unitaires, les délais de livraison, les conditions de paiement et la durée de validité de votre offre. Nous souhaiterions recevoir votre devis avant le ${r}.`},{cle:"commande",famille:"fournisseurs",titre:"Lettre de commande",objet:`Commande suivant votre devis n° ${r}`,destinataire:`${r}
Service commercial
Cotonou, Bénin`,appel:0,cloture:0,corps:`Suite à votre devis n° ${r} du ${r}, nous vous passons commande de : ${r}.

Montant total convenu : ${r} F CFA, payable ${r}.

Livraison souhaitée le ${r}, à ${r}. Merci de nous confirmer la bonne réception de cette commande.`},{cle:"partenariat",famille:"fournisseurs",titre:"Proposition de partenariat",objet:"Proposition de partenariat avec {entreprise}",destinataire:`${r}
À l’attention de ${r}
Cotonou, Bénin`,appel:0,cloture:4,corps:`{entreprise} ${r}.

Nous serions heureux de construire avec vous un partenariat autour de ${r}.

Concrètement, nous vous proposons ${r}. En retour, ${r}.

Nous serions ravis d’en parler lors d’une rencontre, à la date qui vous conviendra.`},{cle:"resiliation",famille:"fournisseurs",titre:"Résiliation d’un contrat ou d’un abonnement",objet:`Résiliation du contrat n° ${r}`,destinataire:`${r}
Service clientèle
Cotonou, Bénin`,appel:0,cloture:0,aRelire:!0,corps:`Par la présente, nous vous informons de notre décision de résilier le contrat n° ${r}, souscrit le ${r}, conformément à ${r}.

Cette résiliation prendra effet le ${r}, à l’issue du préavis prévu au contrat.

Nous vous remercions de nous adresser la confirmation de cette résiliation, ainsi que ${r}.`},{cle:"convocation-entretien",famille:"equipe",titre:"Convocation à un entretien",objet:"Convocation à un entretien",destinataire:`[NOM]
[POSTE]`,appel:0,cloture:0,aRelire:!0,depuisEquipe:!0,corps:`Nous vous prions de vous présenter le ${r} à ${r} heures, à ${r}, pour un entretien avec {signataire}, {qualite}, au sujet de ${r}.

Vous pouvez vous faire assister lors de cet entretien par une personne de votre choix appartenant au personnel.`},{cle:"avertissement",famille:"equipe",titre:"Avertissement",objet:"Avertissement",destinataire:`[NOM]
[POSTE]`,appel:0,cloture:0,aRelire:!0,depuisEquipe:!0,corps:`Le ${r}, ${r}.

Ce comportement est contraire à ${r}, et nous ne pouvons l’accepter.

Nous vous adressons par la présente un avertissement, qui sera versé à votre dossier. Nous vous demandons de veiller à ce que cela ne se reproduise pas.`},{cle:"demande-explication",famille:"equipe",titre:"Demande d’explication",objet:"Demande d’explication",destinataire:`[NOM]
[POSTE]`,appel:0,cloture:0,aRelire:!0,depuisEquipe:!0,corps:`Le ${r}, ${r}.

Nous vous demandons de nous faire connaître par écrit vos explications sur ces faits, au plus tard le ${r}.

Votre réponse sera versée à votre dossier avec la présente lettre. Sans réponse dans ce délai, la direction statuera au vu des seuls éléments dont elle dispose.`},{cle:"felicitations",famille:"equipe",titre:"Lettre de félicitations",objet:"Félicitations",destinataire:`[NOM]
[POSTE]`,appel:7,cloture:5,depuisEquipe:!0,corps:`Au nom de {entreprise}, nous tenons à vous féliciter pour ${r}.

Votre engagement et la qualité de votre travail sont remarqués, et ils font la réputation de la Maison.

Nous vous remercions, et nous comptons sur vous pour la suite.`},{cle:"certificat-fin-contrat",famille:"equipe",titre:"Certificat de travail (fin de contrat)",objet:"Certificat de travail",destinataire:"",appel:-1,cloture:-1,aRelire:!0,depuisEquipe:!0,corps:`Je soussigné(e) {signataire}, {qualite} de {entreprise}, certifie que [NOM] a été employé(e) au sein de notre structure du [DATE D’ENTRÉE] au ${r}, en qualité de [POSTE].

[NOM] nous quitte libre de tout engagement.

Le présent certificat lui est délivré pour servir et valoir ce que de droit.`},{cle:"acceptation-demission",famille:"equipe",titre:"Acceptation de démission",objet:"Votre démission",destinataire:`[NOM]
[POSTE]`,appel:0,cloture:0,aRelire:!0,depuisEquipe:!0,corps:`Nous accusons réception de votre lettre de démission du ${r}.

Conformément à ${r}, votre préavis prendra fin le ${r}, date à laquelle votre contrat prendra fin.

Votre certificat de travail et votre solde de tout compte vous seront remis à cette date. Nous vous remercions pour votre travail au sein de la Maison.`},{cle:"ouverture-compte",famille:"administration",titre:"Demande d’ouverture de compte",objet:"Demande d’ouverture de compte",destinataire:`${r}
À l’attention du Service Entreprises
Cotonou, Bénin`,appel:0,cloture:3,corps:`{entreprise} souhaite ouvrir un compte ${r} auprès de votre établissement, afin de ${r}.

Vous trouverez ci-joint les pièces suivantes : ${r}.

Nous restons à votre disposition pour tout document complémentaire.`},{cle:"attestation-fiscale",famille:"administration",titre:"Demande d’attestation fiscale ou CNSS",objet:`Demande d’attestation ${r}`,destinataire:`${r}
Cotonou, Bénin`,appel:0,cloture:0,corps:`{entreprise}, immatriculée sous le numéro ${r}, sollicite la délivrance d’une attestation ${r}.

Cette attestation est demandée pour ${r}.

Vous trouverez ci-joint ${r}.`},{cle:"changement-adresse",famille:"administration",titre:"Changement d’adresse ou de gérance",objet:`Changement ${r}`,destinataire:`${r}
Cotonou, Bénin`,appel:0,cloture:0,aRelire:!0,corps:`Nous vous informons qu’à compter du ${r}, ${r}.

Nous vous remercions de bien vouloir mettre à jour nos informations dans vos registres.

Vous trouverez ci-joint ${r}.`},{cle:"demande-autorisation",famille:"administration",titre:"Demande d’autorisation",objet:`Demande d’autorisation ${r}`,destinataire:`${r}
Cotonou, Bénin`,appel:0,cloture:1,corps:`{entreprise} sollicite l’autorisation de ${r}, le ${r}, à ${r}.

Cette demande est motivée par ${r}.

Nous nous engageons à ${r}.`},{cle:"attestation-travail",famille:"attestations",titre:"Attestation de travail",objet:"Attestation de travail",destinataire:"",appel:-1,cloture:-1,depuisEquipe:!0,corps:`Je soussigné(e) {signataire}, {qualite} de {entreprise}, atteste que [NOM] est employé(e) au sein de notre structure depuis le [DATE D’ENTRÉE], en qualité de [POSTE], sous contrat [CONTRAT].

La présente attestation lui est délivrée à sa demande, pour servir et valoir ce que de droit.`},{cle:"attestation-stage",famille:"attestations",titre:"Attestation de stage",objet:"Attestation de stage",destinataire:"",appel:-1,cloture:-1,depuisEquipe:!0,corps:`Je soussigné(e) {signataire}, {qualite} de {entreprise}, atteste que [NOM] a effectué un stage au sein de notre structure du ${r} au ${r}, en qualité de [POSTE].

Durant ce stage, ${r}.

La présente attestation lui est délivrée pour servir et valoir ce que de droit.`},{cle:"attestation-formation",famille:"attestations",titre:"Attestation de formation",objet:"Attestation de formation",destinataire:"",appel:-1,cloture:-1,corps:`Je soussigné(e) {signataire}, {qualite} de {entreprise}, atteste que ${r} a suivi la formation « ${r} » du ${r} au ${r}, pour une durée de ${r} heures.

La présente attestation lui est délivrée pour servir et valoir ce que de droit.`},{cle:"attestation-paiement",famille:"attestations",titre:"Attestation de paiement",objet:"Attestation de paiement",destinataire:"",appel:-1,cloture:-1,corps:`Je soussigné(e) {signataire}, {qualite} de {entreprise}, atteste avoir reçu de ${r} la somme de ${r} francs CFA (${r} F CFA), le ${r}, au titre de ${r}.

La présente attestation est délivrée pour servir et valoir ce que de droit.`},{cle:"note-interne",famille:"notes",titre:"Note interne",objet:`Note à toute l’équipe : ${r}`,destinataire:"À toute l’équipe",appel:-1,cloture:-1,corps:`À compter du ${r}, ${r}.

Cette décision s’applique à ${r}.

Pour toute question, adressez-vous à {signataire}.`},{cle:"proces-verbal",famille:"notes",titre:"Procès-verbal de réunion",objet:`Procès-verbal de la réunion du ${r}`,destinataire:"",appel:-1,cloture:-1,corps:`Présents : ${r}.
Absents excusés : ${r}.

Ordre du jour :
1. ${r}
2. ${r}

Décisions :
1. ${r}
2. ${r}

Prochaine réunion : le ${r}.`},{cle:"reglement-interieur",famille:"notes",titre:"Règlement intérieur",objet:"Règlement intérieur",destinataire:"À toute l’équipe",appel:-1,cloture:-1,aRelire:!0,corps:`Article 1. Horaires. Les horaires de travail sont fixés de ${r} à ${r}, du ${r} au ${r}.

Article 2. Ponctualité et absences. Toute absence est signalée à la direction au plus tôt, et justifiée sous ${r} jours.

Article 3. Tenue et hygiène. ${r}.

Article 4. Confidentialité. Les informations sur les clientes et la Maison ne sortent pas de la Maison.

Article 5. Entrée en vigueur. Le présent règlement s’applique à compter du ${r}.`},{cle:"contrat-prestation",famille:"contrats",titre:"Contrat de prestation de services",objet:"Contrat de prestation de services",destinataire:"",appel:-1,cloture:-1,aRelire:!0,corps:`Entre {entreprise}, représentée par {signataire}, {qualite}, ci-après « le Client »,

Et ${r}, ${r}, ci-après « le Prestataire »,

Il a été convenu ce qui suit.

Article 1. Objet. Le Prestataire s’engage à réaliser ${r}.

Article 2. Durée. Le présent contrat prend effet le ${r} pour une durée de ${r}.

Article 3. Prix et paiement. Le prix est fixé à ${r} F CFA, payable ${r}.

Article 4. Obligations. Le Prestataire exécute la prestation avec soin et dans les délais ; le Client fournit ${r}.

Article 5. Résiliation. En cas de manquement, chaque partie peut résilier le contrat après mise en demeure restée sans effet pendant ${r} jours.

Article 6. Litiges. À défaut d’accord amiable, les tribunaux de Cotonou sont compétents.

Fait à {ville}, en deux exemplaires originaux.`},{cle:"contrat-travail",famille:"contrats",titre:"Contrat de travail",objet:"Contrat de travail à durée [DÉTERMINÉE ou INDÉTERMINÉE]",destinataire:"",appel:-1,cloture:-1,aRelire:!0,depuisEquipe:!0,corps:`Entre {entreprise}, représentée par {signataire}, {qualite}, ci-après « l’Employeur »,

Et [NOM], ci-après « le Salarié »,

Il a été convenu ce qui suit, conformément au Code du travail de la République du Bénin.

Article 1. Engagement. Le Salarié est engagé en qualité de [POSTE] à compter du [DATE D’ENTRÉE].

Article 2. Période d’essai. ${r}.

Article 3. Rémunération. Le Salarié perçoit un salaire mensuel brut de ${r} F CFA.

Article 4. Lieu et horaires. ${r}.

Article 5. Obligations. Le Salarié respecte le règlement intérieur et la confidentialité des informations de la Maison.

Article 6. Rupture. ${r}.

Fait à {ville}, en deux exemplaires originaux.`},{cle:"contrat-apprentissage",famille:"contrats",titre:"Contrat d’apprentissage (La Relève MND)",objet:"Contrat d’apprentissage",destinataire:"",appel:-1,cloture:-1,aRelire:!0,corps:`Entre {entreprise}, représentée par {signataire}, {qualite}, ci-après « la Maison »,

Et [NOM ET PRÉNOMS DE L’APPRENTIE], née le [DATE DE NAISSANCE], demeurant à [DOMICILE DE L’APPRENTIE], ci-après « l’apprentie »,

Père, mère ou tuteur de l’apprentie : [NOM, PRÉNOMS, PROFESSION, ÂGE ET DOMICILE DU PÈRE, DE LA MÈRE OU DU TUTEUR].

Il a été convenu ce qui suit, conformément aux articles 64 à 70 de la loi n° 98-004 du 27 janvier 1998 portant Code du travail.

Article 1. Objet. La Maison s’engage à donner à l’apprentie une formation professionnelle méthodique et complète au métier de coiffeuse spécialiste des locks, selon le programme annexé. L’apprentie s’engage à se conformer aux instructions reçues et à exécuter les ouvrages qui lui sont confiés dans le cadre de son apprentissage.

Article 2. Durée. Le présent contrat est conclu pour [DURÉE], du [DATE DE DÉBUT] au [DATE DE FIN]. Les deux premiers mois valent période d’essai [À CONFIRMER AU DÉCRET N° 2008-423].

Article 3. Lieu et temps. L’apprentissage se déroule à la Maison MND, [ADRESSE], quarante heures par semaine, dont une journée de cours à l’Académie MND. Le planning est donné une semaine à l’avance.

Article 4. Programme et évaluations. Le programme annexé fixe les gestes de chaque semestre. Chaque geste se note sur la grille de la Maison : en formation, autonome, référente. Un écrit et un pratique ferment chaque semestre ; le carnet de suivi est signé par les deux parties.

Article 5. Engagements de la Maison. La Maison forme l’apprentie elle-même ou par ses maîtres, lui fait suivre les cours de l’Académie MND, fournit la tenue, le matériel et les produits, veille à son hygiène et à sa sécurité, la présente au Certificat de Qualification aux Métiers en prenant les frais d’examen à sa charge, et lui délivre le certificat de l’Académie MND si elle réussit l’évaluation finale. Pendant le présent contrat, la Maison ne demande aucun frais de formation, d’examen ou de libération.

Article 6. Engagements de l’apprentie. L’apprentie est assidue et ponctuelle, respecte le règlement intérieur et la tenue de la Maison, prend soin du matériel, garde la discrétion sur les clientes, les prix, les méthodes et les recettes de la Maison, pendant et après le contrat, et ne coiffe pas pour son compte ou pour autrui pendant le contrat.

Article 7. Allocation et congés. La Maison verse à l’apprentie une allocation mensuelle de [ALLOCATION], le [JOUR DU VERSEMENT] de chaque mois. L’apprentie a droit à deux jours ouvrables de congé par mois de service.

Article 8. Santé. L’apprentie présente un certificat médical d’aptitude délivré par un médecin agréé. Sa protection en cas d’accident : [DÉCLARATION CNSS, À VÉRIFIER AVEC LE COMPTABLE].

Article 9. Fin de l’apprentissage. Une évaluation finale, écrite et pratique, clôt l’apprentissage. En cas de réussite, l’apprentie reçoit le certificat de l’Académie MND. La Maison peut lui proposer un contrat de travail ; ni l’une ni l’autre n’y est tenue.

Article 10. Rupture. Toute rupture du présent contrat est subordonnée à l’autorisation préalable de l’inspecteur du travail territorialement compétent. Peuvent la motiver un manquement grave, ou une insuffisance constatée à deux évaluations de suite [MOTIFS À CONFIRMER AU DÉCRET N° 2008-423].

Article 11. Visa. Le présent contrat est rédigé en français en quatre exemplaires et soumis par la Maison au visa des services du ministère chargé du travail. Il est exempt de tout droit de timbre et d’enregistrement. Sont annexés à la demande de visa : l’extrait du casier judiciaire du maître d’apprentissage de moins de trois mois, l’acte de naissance de l’apprentie, son certificat médical d’aptitude, et les quatre exemplaires signés.

Fait à {ville}, en quatre exemplaires originaux.

L’apprentie, signature précédée de la mention « lu et approuvé » :`},{cle:"avenant",famille:"contrats",titre:"Avenant au contrat",objet:`Avenant n° ${r} au contrat du ${r}`,destinataire:"",appel:-1,cloture:-1,aRelire:!0,corps:`Entre {entreprise}, représentée par {signataire}, {qualite},

Et ${r},

Il est convenu de modifier le contrat signé le ${r} comme suit.

Article 1. ${r}.

Article 2. Les autres clauses du contrat restent inchangées.

Fait à {ville}, en deux exemplaires originaux.`},{cle:"oapi-depot",famille:"oapi",titre:"Lettre de dépôt de marque",objet:"Dépôt de marque auprès de l’OAPI",destinataire:`Organisation Africaine de la Propriété Intellectuelle
Par l’intermédiaire de la Structure Nationale de Liaison
Cotonou, Bénin`,appel:0,cloture:1,aRelire:!0,corps:`Nous avons l’honneur de solliciter l’enregistrement de la marque « ${r} » au nom de {entreprise}.

La marque est demandée dans la ou les classes ${r} de la classification de Nice, pour les produits et services suivants : ${r}.

Vous trouverez ci-joint ${r}.`},{cle:"oapi-pouvoir",famille:"oapi",titre:"Pouvoir au mandataire",objet:"Pouvoir",destinataire:"",appel:-1,cloture:-1,aRelire:!0,corps:`Je soussigné(e) {signataire}, {qualite} de {entreprise}, donne pouvoir à ${r}, mandataire agréé auprès de l’OAPI, demeurant ${r},

de déposer en notre nom et pour notre compte la demande d’enregistrement de la marque « ${r} », d’accomplir toutes les formalités qui s’y rapportent, et de recevoir toute correspondance à ce sujet.

Fait à {ville}, pour servir et valoir ce que de droit.`},{cle:"procuration",famille:"juridiques",titre:"Procuration",objet:"Procuration",destinataire:"",appel:-1,cloture:-1,aRelire:!0,corps:`Je soussigné(e) {signataire}, {qualite} de {entreprise}, donne procuration à ${r}, titulaire de la pièce d’identité n° ${r},

pour ${r} en mon nom et pour mon compte, le ${r}.

Fait à {ville}, pour servir et valoir ce que de droit.`},{cle:"mise-en-demeure",famille:"juridiques",titre:"Mise en demeure",objet:"Mise en demeure",destinataire:`${r}
${r}
Cotonou, Bénin`,appel:0,cloture:0,aRelire:!0,corps:`Par la présente, nous vous mettons en demeure de ${r}, conformément à ${r}.

Malgré nos relances du ${r}, cette obligation n’a pas été exécutée.

À défaut d’exécution dans un délai de ${r} jours à compter de la réception de la présente, nous nous réservons le droit d’engager toute procédure utile, sans autre avis.`},{cle:"honneur",famille:"juridiques",titre:"Attestation sur l’honneur",objet:"Attestation sur l’honneur",destinataire:"",appel:-1,cloture:-1,aRelire:!0,corps:`Je soussigné(e) {signataire}, {qualite} de {entreprise}, atteste sur l’honneur que ${r}.

Je suis informé(e) qu’une fausse déclaration m’expose aux sanctions prévues par la loi.

Fait à {ville}, pour servir et valoir ce que de droit.`},{cle:"lettre-perso",famille:"perso",titre:"Lettre personnelle",objet:r,destinataire:`${r}
${r}
Cotonou, Bénin`,appel:0,cloture:0,corps:`${r}`},{cle:"libre",famille:"libre",titre:"Document",objet:"",destinataire:"",appel:-1,cloture:-1,corps:""}],et=e=>ce.find(t=>t.cle===e)??ce[0],tt=["convocation-entretien","avertissement","felicitations","certificat-fin-contrat","acceptation-demission","attestation-travail","contrat-travail"];function yt(e,t,n){return e!=="mnd"||!tt.includes(t)?e:/^\s*(?:ets\.?\s+)?acia\s*1\b/i.test(n??"")?"acia":e}const wt=(...e)=>e.reduce((t,n)=>t+((n??"").match(/\[[^\]\n]{2,60}\]/g)??[]).length,0);function nt(e,t){return(e??"").replace(/\{entreprise\}/g,t.entreprise).replace(/\{signataire\}/g,t.signataire).replace(/\{qualite\}/g,t.qualite).replace(/\{ville\}/g,t.ville)}function Bt(e,t){return(e??"").replace(/\[NOM\]/g,t.name).replace(/\[POSTE\]/g,t.role||"[POSTE]").replace(/\[DATE D’ENTRÉE\]/g,t.entree||"[DATE D’ENTRÉE]").replace(/\[CONTRAT\]/g,t.contrat||"[CONTRAT]")}const X={mnd:[{cle:"mnd-cachet-registre",nom:"Le cachet commercial, RCCM et IFU",fichier:"mnd-cachet-registre.png",ratio:600/278},{cle:"mnd-6-dentele",nom:"Le sceau dentelé",fichier:"mnd-6-dentele.png",ratio:1},{cle:"mnd-premium-indigo",nom:"Premium indigo",fichier:"mnd-premium-indigo.png",ratio:1},{cle:"mnd-premium-cuivre",nom:"Premium cuivre",fichier:"mnd-premium-cuivre.png",ratio:1},{cle:"mnd-1-sceau",nom:"Le sceau",fichier:"mnd-1-sceau.png",ratio:1},{cle:"mnd-2-ovale",nom:"L’ovale",fichier:"mnd-2-ovale.png",ratio:1.5},{cle:"mnd-3-cachet",nom:"Le cachet commercial",fichier:"mnd-3-cachet.png",ratio:600/285},{cle:"mnd-4-cordon",nom:"Le cordon",fichier:"mnd-4-cordon.png",ratio:1},{cle:"mnd-5-bouquet",nom:"Le bouquet",fichier:"mnd-5-bouquet.png",ratio:1},{cle:"mnd-7-embleme",nom:"L’emblème",fichier:"mnd-7-embleme.png",ratio:1},{cle:"mnd-paye",nom:"PAYÉ",fichier:"mnd-paye.png",ratio:600/323},{cle:"mnd-recu",nom:"REÇU LE",fichier:"mnd-recu.png",ratio:1.5},{cle:"academie-dentele",nom:"Le sceau dentelé de l’Académie MND",fichier:"academie-dentele.png",ratio:1}],acia:[{cle:"acia-sceau",nom:"Le sceau ACIA 1",fichier:"acia-sceau.png",ratio:1},{cle:"acia-cachet",nom:"Le cachet ACIA 1",fichier:"acia-cachet.png",ratio:600/263}]};function Ut(e){return e==="mnd"||e==="acia"?X[e]:[]}const he=e=>[...X.mnd,...X.acia].find(t=>t.cle===e),rt=e=>e==="mnd"?"mnd-6-dentele":e==="acia"?"acia-sceau":e==="autre"?"auto":void 0,N=e=>e.replace(/[&<>"]/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"})[t]);function it(e,t,n){const i=(e||"Entreprise").toUpperCase().slice(0,34),a=((t||"").split("·").pop()||"COTONOU, BÉNIN").trim().toUpperCase().slice(0,26),s=n?`TÉL. ${n}`.toUpperCase().slice(0,30):a,o=Math.max(9,Math.min(15,190/Math.max(i.length,8))),u=c=>`<polygon fill="#23262B" points="${[0,1,2,3,4,5,6,7,8,9].map(l=>{const p=-Math.PI/2+l*Math.PI/5,d=l%2?2.2:5.2;return`${(c+d*Math.cos(p)).toFixed(1)},${(100+d*Math.sin(p)).toFixed(1)}`}).join(" ")}"/>`;return`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="600" height="600">
  <defs><path id="h" d="M 38 100 A 62 62 0 0 1 162 100"/><path id="b" d="M 33 100 A 67 67 0 0 0 167 100"/></defs>
  <circle cx="100" cy="100" r="95" fill="none" stroke="#23262B" stroke-width="4"/>
  <circle cx="100" cy="100" r="89" fill="none" stroke="#23262B" stroke-width="1"/>
  <circle cx="100" cy="100" r="50" fill="none" stroke="#23262B" stroke-width="1.5"/>
  <text font-family="Georgia, serif" font-weight="700" font-size="${o}" fill="#23262B" text-anchor="middle" letter-spacing="1"><textPath href="#h" startOffset="50%">${N(i)}</textPath></text>
  <text font-family="Georgia, serif" font-size="9.5" fill="#23262B" text-anchor="middle" letter-spacing="1" dominant-baseline="hanging"><textPath href="#b" startOffset="50%">${N(s)}</textPath></text>
  ${u(22)}${u(178)}
  <text x="100" y="${n?106:112}" font-family="Georgia, serif" font-weight="700" font-size="${n?30:34}" fill="#23262B" text-anchor="middle">${N(Y(e||"Entreprise"))}</text>
  ${n?`<text x="100" y="124" font-family="Georgia, serif" font-size="7.5" fill="#23262B" text-anchor="middle" letter-spacing=".6">${N(a.slice(0,18))}</text>`:""}
</svg>`}const H=2,_t=e=>{var t;return e==="auto"?1:e==="auto-cachet"?H:(t=he(e))==null?void 0:t.ratio};function at(e,t){const n=(e||"").split("·").map(d=>d.trim()).filter(Boolean),i=d=>d.replace(/\s*\([^)]*\)\s*/g," ").replace(/\s+/g," ").trim(),a=n.find(d=>/\bRCCM\b/i.test(d)),s=n.find(d=>/\bIFU\b/i.test(d)),o=n.find(d=>/responsabilit|soci[ée]t[ée] anonyme|\bSARL\b|\bSAS\b|\bSUARL\b/i.test(d)&&d!==a&&d!==s)??"",c=n.filter(d=>d!==a&&d!==s&&d!==o).join(" · ");let l=c?[c]:[];if(c.length>44){const d=[...c.matchAll(/[,·]\s/g)].map(f=>f.index??0),v=c.length/2,m=d.sort((f,x)=>Math.abs(f-v)-Math.abs(x-v))[0];m&&(l=[c.slice(0,m+1).replace(/[·,]$/,"").trim(),c.slice(m+1).trim()])}const p=[a&&i(a).replace(/n°\s*/i,""),s&&i(s).replace(/n°\s*/i,"")].filter(Boolean).join(" · ");return{forme:o,adresse:l,legales:p,telephone:t.trim()}}function st(e,t,n){const i=at(t,n),a=(e||"Entreprise").toUpperCase().slice(0,30),s=[...i.forme?[{t:i.forme.toUpperCase(),petit:!0,espace:!0}]:[],...i.adresse.map(v=>({t:v})),...i.legales?[{t:i.legales,gras:!0}]:[],...i.telephone?[{t:`Tél. ${i.telephone}`}]:[]],o=Math.max(16,Math.min(30,340/Math.max(a.length*.62,1))),u=Math.max(1,...s.map(v=>v.t.length)),c=Math.max(7.5,Math.min(11.5,352/(u*.56))),l=30+o,p=Math.min(c*1.55,(178-l-12)/Math.max(s.length,1)),d=l+14+p*.7;return`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 200" width="600" height="300">
  <rect x="5" y="5" width="390" height="190" rx="8" fill="none" stroke="#1F2B5C" stroke-width="3.5"/>
  <rect x="12" y="12" width="376" height="176" rx="5" fill="none" stroke="#1F2B5C" stroke-width="1"/>
  <text x="200" y="${l}" font-family="Georgia, serif" font-weight="700" font-size="${o.toFixed(1)}" fill="#1F2B5C" text-anchor="middle" letter-spacing="2">${N(a)}</text>
  <line x1="70" y1="${l+9}" x2="330" y2="${l+9}" stroke="#1F2B5C" stroke-width="1"/>
  ${s.map((v,m)=>`<text x="200" y="${(d+m*p).toFixed(1)}" font-family="Georgia, serif" font-size="${(v.petit?c*.86:c).toFixed(1)}"${v.gras?' font-weight="700"':""}${v.espace?' letter-spacing="1.2"':""} fill="#1F2B5C" text-anchor="middle">${N(v.t)}</text>`).join(`
  `)}
</svg>`}const ot="mnd-recu",ct={ligne:259,jour:[140,208],mois:[236,304],annee:[370,460]};function ut(e){const t=/^20(\d{2})-(\d{2})-(\d{2})$/.exec(e??"");return t?[t[3],t[2],t[1]]:null}function lt(e,t){const n=ut(t);return n?new Promise(i=>{try{const a=new Image;a.onload=()=>{const s=document.createElement("canvas");s.width=a.naturalWidth,s.height=a.naturalHeight;const o=s.getContext("2d");if(!o){i(null);return}o.drawImage(a,0,0);const u=s.width/600;o.fillStyle="#1E2150",o.textAlign="center",o.textBaseline="alphabetic",o.font=`600 ${Math.round(34*u)}px Jost, "Noto Sans", Arial, sans-serif`;const c=ct;[c.jour,c.mois,c.annee].forEach(([l,p],d)=>o.fillText(n[d],(l+p)/2*u,(c.ligne-7)*u)),i(s.toDataURL("image/png"))},a.onerror=()=>i(null),a.src=e}catch{i(null)}}):Promise.resolve(e)}function ue(e,t=600,n=t){return new Promise(i=>{try{const a=new Image;a.onload=()=>{const s=document.createElement("canvas");s.width=t,s.height=n;const o=s.getContext("2d");if(!o){i(null);return}o.drawImage(a,0,0,t,n),i(s.toDataURL("image/png"))},a.onerror=()=>i(null),a.src=`data:image/svg+xml;charset=utf-8,${encodeURIComponent(e)}`}catch{i(null)}})}const A=W("mnd_secretariat",[]),Jt=()=>Z(A),dt=e=>e.filter(t=>t.genre==="piece"),$e=e=>e.filter(t=>t.genre==="entreprise"),mt=e=>e.filter(t=>t.genre==="signataire"),Ee=e=>e.filter(t=>t.genre==="profil"),Q=(e,t)=>e.find(n=>n.genre==="mentions"&&n.entite===t),Ae=(e,t)=>Te(t,Q(e,t)),g=e=>A.set(t=>t.some(n=>n.id===e.id)?t.map(n=>n.id===e.id?e:n):[...t,e]),R=()=>new Date().toISOString(),be=()=>{const e=new Date;return`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`};function Vt(e){const t=et(e.modele),n=t.appel>=0?je[t.appel]:"",i={id:`doc-${M()}`,genre:"piece",branchId:e.branchId,entite:e.entite,entrepriseId:e.entrepriseId,auteurId:e.auteurId,modele:t.cle,titre:t.titre,lieu:"Cotonou",date:be(),destinataire:t.destinataire,objet:t.objet,appel:n,corps:t.corps,cloture:t.cloture>=0?Fe(n||"Madame, Monsieur,",e.entite)[t.cloture]:"",signataires:e.signataires,poses:[],tampon:rt(e.entite),cadre:"droite",etat:"brouillon",aRelire:t.aRelire,creeLe:R()};return i.poses=me("droite",[...i.signataires.map(a=>`sig:${a.userId}`),...i.tampon?["tampon"]:[]]),g(i),i}function zt(e,t){if(!ke(e))return e;const n={...e,...t};return g(n),n}function Me(e,t){if(e.numero||e.etat!=="signe")return e;const n=$e(t).find(c=>c.id===e.entrepriseId),i=Ee(t).find(c=>c.userId===e.auteurId)??mt(t).find(c=>c.userId===e.auteurId),a=we(e,{entreprise:n,auteurNom:i==null?void 0:i.nom}),s=parseInt(e.date.slice(0,4),10)||new Date().getFullYear(),o=e.entite==="mnd"||e.entite==="acia"?Ae(t,e.entite):void 0,u=o?{rccm:o.rccm,ifu:o.ifu}:void 0;return{...e,numero:Be(a,s,dt(t).map(c=>c.numero)),...u?{mentionsFigees:u}:{}}}function Gt(e,t,n){const i=Me(He(e,t,n,R()),A.get());return i!==e&&g(i),i}function Yt(e){if(e.etat!=="brouillon"||e.signataires.length>0)return e;const t=Me({...e,etat:"signe",signeLe:R()},A.get());return g(t),t}function kt(e){const t=ve(e);return g(t),t}function Xt(e,t){const n={...ve(e),id:`doc-${M()}`,auteurId:t.auteurId,creeLe:R(),date:be(),remplace:t.remplace?e.numero:void 0,dossier:t.remplace?e.dossier:void 0};return g(n),n}function Ht(e){return Ge(e)?(A.set(t=>t.filter(n=>n.id!==e.id)),!0):!1}function Zt(e){if(!Ye(e))return e;const t={...e,etat:"annule",annuleLe:R()};return g(t),t}function Wt(e){const t={id:`ent-${M()}`,genre:"entreprise",entite:"autre",creeLe:R(),...e};return g(t),t}const Qt=(e,t)=>g({...e,...t});function Kt(e){g({id:`sig-${e.userId}`,genre:"signataire",entite:"mnd",...e})}function pt(e){g({id:`mentions-${e.entite}`,genre:"mentions",...e,rccm:e.rccm.trim(),ifu:e.ifu.trim()})}const xe="mnd_mentions_maison_2026_10",ft=Date.parse("2026-12-31T23:59:59+01:00"),gt=()=>{try{return!!localStorage.getItem(xe)}catch{return!1}},z=()=>{try{localStorage.setItem(xe,new Date().toISOString())}catch{}},le=()=>{const e=Q(A.get(),"mnd"),t=de(e);return!e||!t?!1:(pt({branchId:e.branchId,entite:"mnd",...t}),!0)};function en(){Date.now()>ft||gt()||Le("secretariat",()=>{if(le()){z();return}let e=()=>{};const t=A.subscribe(()=>{setTimeout(()=>{le()&&(z(),e())},0)}),n=setTimeout(()=>{e(),z()},6e4);e=()=>{t(),clearTimeout(n)}})}function tn(e){g({id:`prof-${e.userId}`,genre:"profil",entite:"perso",...e})}async function nn(e){return null}async function rn(e){return null}async function an(e,t){return!1}async function sn(e,t){return!1}function on(e){var re;const n=Math.min(1,1e3/Math.max(e.width,e.height)),i=Math.max(1,Math.round(e.width*n)),a=Math.max(1,Math.round(e.height*n)),s=document.createElement("canvas");s.width=i,s.height=a;const o=s.getContext("2d",{willReadFrequently:!0});if(!o)return null;o.fillStyle="#FFFFFF",o.fillRect(0,0,i,a),o.drawImage(e,0,0,i,a);const u=o.getImageData(0,0,i,a),c=u.data;let l=0;for(let h=0;h<c.length;h+=4)l+=.299*c[h]+.587*c[h+1]+.114*c[h+2];const d=l/(c.length/4)-40;let v=i,m=a,f=-1,x=-1;for(let h=0;h<a;h+=1)for(let D=0;D<i;D+=1){const $=(h*i+D)*4,ie=.299*c[$]+.587*c[$+1]+.114*c[$+2];if(c[$+3]===0||ie>=d){c[$+3]=0;continue}const De=Math.min(255,(d-ie)/Math.max(1,d)*255*2.5+40);c[$]=Math.min(c[$],60),c[$+1]=Math.min(c[$+1],60),c[$+2]=Math.min(c[$+2],90),c[$+3]=De,D<v&&(v=D),D>f&&(f=D),h<m&&(m=h),h>x&&(x=h)}if(f<0)return null;o.putImageData(u,0,0);const C=8,te=Math.max(0,v-C),ne=Math.max(0,m-C),J=Math.min(i-te,f-v+2*C),V=Math.min(a-ne,x-m+2*C),j=document.createElement("canvas");return j.width=J,j.height=V,(re=j.getContext("2d"))==null||re.drawImage(s,te,ne,J,V,0,0,J,V),j.toDataURL("image/png")}const O=new Map,w=(e,t)=>(O.has(e)||O.set(e,t().then(n=>(n===null&&O.delete(e),n))),O.get(e)),vt=async e=>w(e,async()=>{try{const t=await fetch(e);if(!t.ok)return null;const n=await t.blob();return await new Promise(i=>{const a=new FileReader;a.onloadend=()=>i(typeof a.result=="string"?a.result:null),a.onerror=()=>i(null),a.readAsDataURL(n)})}catch{return null}});async function cn(e,t,n){const i=$e(t).find(m=>m.id===e.entrepriseId),a=Ee(t).find(m=>m.userId===e.auteurId),s=e.etat==="brouillon"||e.etat==="a-signer",o=e.entite==="mnd"||e.entite==="acia"?s?Ae(t,e.entite):Q(t,e.entite):void 0,u=Qe(e.entite,{nomMaison:n,entreprise:i,profil:a,mentions:e.mentionsFigees??o}),c=e.signataires[0],l={entreprise:e.entite==="perso"?(a==null?void 0:a.nom)??"":u.nom,signataire:(c==null?void 0:c.nom)??(e.entite==="autre"?(i==null?void 0:i.signataire)??"":"[SIGNATAIRE]"),qualite:(c==null?void 0:c.qualite)??"représentant(e) légal(e)",ville:u.ville},p=m=>nt(m,l);let d;if(e.tampon==="auto"&&i){const m=it(i.nom,i.mentions,i.telephone),f=await w(m,()=>ue(m));f&&(d={image:f,ratio:1})}else if(e.tampon==="auto-cachet"&&i){const m=st(i.nom,i.mentions,i.telephone),f=await w(m,()=>ue(m,600,600/H));f&&(d={image:f,ratio:H})}else if(e.tampon){const m=he(e.tampon);let f=m?await vt(Ne(`/assets/tampons/${m.fichier}`)):null;if(f&&e.tampon===ot){const x=f,C=e.dateTampon||e.date;f=await w(`recu:${C}`,()=>lt(x,C))}m&&f&&(d={image:f,ratio:m.ratio})}const v=e.signataires.length?e.signataires.map(m=>({nom:m.nom,qualite:m.qualite})):[{nom:e.entite==="perso"?(a==null?void 0:a.nom)??"":"La Direction",qualite:""}];return{piece:e,enTete:u,tampon:d,noms:v,texte:{destinataire:p(e.destinataire),objet:p(e.objet),appel:e.appel,corps:p(e.corps),cloture:e.cloture}}}function un(e){const t=e.piece,n=t.poses.find(s=>s.cle==="tampon"),i=e.tampon&&n?k(n,e.tampon.ratio):null,a=(t.numero??`brouillon-${t.titre}`).normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/[^A-Za-z0-9-]+/g,"-");return{enTete:e.enTete,numero:t.numero,brouillon:t.etat!=="signe",remplace:t.remplace,lieuEtDate:`${t.lieu||e.enTete.ville}, le ${We(t.date)}`,destinataire:e.texte.destinataire,objet:e.texte.objet,appel:e.texte.appel,paragraphes:Ze(e.texte.corps),cloture:e.texte.cloture,zone:{largeur:E.largeur,hauteur:E.hauteur,signatures:t.poses.filter(s=>s.cle.startsWith("sig:")&&s.image).map(s=>{const o=k(s);return{x:s.x,y:s.y,image:s.image,largeur:o.l,hauteurMax:o.h}}),tampon:n&&e.tampon&&i?{x:n.x,y:n.y,image:e.tampon.image,l:i.l,h:i.h}:void 0,...(()=>{const s=ze(t,e.noms);return{noms:s.noms,colonnes:s.colonnes,xEntite:s.xEntite}})(),nomEntite:t.entite==="perso"?void 0:e.enTete.nom},filename:`${e.enTete.entite==="perso"?"Lettre":e.enTete.nom.replace(/\s+/g,"-")}-${a}.pdf`}}Se(A,"secretariat");const ln={"a-traiter":"À traiter",repondu:"Répondu",classe:"Classé"},dn={prepare:"Prêt, pas envoyé",envoye:"Envoyé",accuse:"Accusé reçu"},mn={"main-propre":"En main propre",whatsapp:"WhatsApp",courriel:"Courriel",poste:"Poste",autre:"Autre"},pn={impots:"Impôts",social:"Social",loyer:"Loyer",contrat:"Contrat",papier:"Papier",demarche:"Démarche",autre:"Autre"},fn={aucune:"Une fois",mensuelle:"Chaque mois",trimestrielle:"Chaque trimestre",annuelle:"Chaque année"},gn={bail:"Bail",fournisseur:"Fournisseur",abonnement:"Abonnement",service:"Service",assurance:"Assurance",autre:"Autre"},vn={mois:"par mois",trimestre:"par trimestre",an:"par an",unique:"une fois",usage:"à l’usage"},hn={tacite:"Se renouvelle seul",manuel:"À renouveler",aucun:"Sans renouvellement"},$n={"en-cours":"En cours",resilie:"Résilié",termine:"Terminé"},En={administration:"Administration",achat:"Achat",juridique:"Juridique",banque:"Banque",autre:"Autre"},An={"en-cours":"En cours","en-attente":"En attente",terminee:"Terminée",abandonnee:"Abandonnée"},bn={administration:"Administrations",conseil:"Conseils",banque:"Banques",maison:"La maison",fournisseur:"Fournisseurs",autre:"Autres"},Mn=[{duree:"10 ans",quoi:"Pièces comptables : factures, reçus, relevés",source:"Droit comptable OHADA, à confirmer avec le comptable"},{duree:"Fin + 5 ans",quoi:"Contrats et leurs avenants",source:"Proposition de la maquette"},{duree:"5 ans",quoi:"Courrier ordinaire, arrivé et départ",source:"Proposition de la maquette"},{duree:"Toujours",quoi:"Papiers officiels : chaque version reste",source:"Règle des Papiers, depuis le 6 octobre 2026"}],K=(e,t)=>{const n=new Date(`${e.slice(0,10)}T12:00:00Z`);return n.setUTCDate(n.getUTCDate()+t),n.toISOString().slice(0,10)},ee=(e,t)=>Math.round((Date.parse(`${t.slice(0,10)}T12:00:00Z`)-Date.parse(`${e.slice(0,10)}T12:00:00Z`))/864e5),b=e=>typeof e=="string"?e.trim():"",F=e=>typeof e=="string"&&/^[0-9]{4}-[0-9]{2}-[0-9]{2}/.test(e)?e.slice(0,10):"";function xn(e){const t=[];for(const n of e){const i=b(n.id),a=b(n.genre),s=n.prive===!0,o=b(n.traitePar)||void 0,u=(c,l,p)=>{p&&t.push({cle:`${i}:${c}:${p}`,genre:a,id:i,titre:l,date:p,prive:s,traitePar:o})};if(a==="echeance"&&n.terminee!==!0)u("date",b(n.titre)||"Une échéance",F(n.date));else if(a==="courrier"&&n.sens==="arrive"&&n.etat==="a-traiter")u("reponse",`Répondre à ${b(n.correspondant)||"un courrier"} (${b(n.numero)})`,F(n.reponseAvant));else if(a==="demarche"&&(n.etat==="en-cours"||n.etat==="en-attente"))u("prochaine",`${b(n.titre)||"Une démarche"} : ${b(n.prochaine)||"la prochaine étape"}`,F(n.prochaineLe));else if(a==="contrat"&&n.etat==="en-cours"){const c=F(n.fin),l=typeof n.preavisJours=="number"&&n.preavisJours>0?Math.round(n.preavisJours):0,p=b(n.titre)||"un contrat";c&&l&&u("preavis",`Dernier jour du préavis : ${p}`,K(c,-l)),c&&u("fin",`${n.renouvellement==="tacite"?"Renouvellement":"Fin"} : ${p}`,c)}}return t.sort((n,i)=>n.date.localeCompare(i.date)||n.titre.localeCompare(i.titre))}const ht=["janv.","févr.","mars","avr.","mai","juin","juil.","août","sept.","oct.","nov.","déc."],Cn=e=>{if(!e||!/^[0-9]{4}-[0-9]{2}-[0-9]{2}/.test(e))return"";const[t,n,i]=e.slice(0,10).split("-").map(Number);return`${i} ${ht[n-1]} ${t}`};function G(e,t){const[n,i,a]=e.slice(0,10).split("-").map(Number),s=n*12+(i-1)+t,o=Math.floor(s/12),u=s%12,c=new Date(Date.UTC(o,u+1,0)).getUTCDate();return`${o}-${String(u+1).padStart(2,"0")}-${String(Math.min(a,c)).padStart(2,"0")}`}const $t=(e,t)=>t==="mensuelle"?G(e,1):t==="trimestrielle"?G(e,3):t==="annuelle"?G(e,12):void 0;function Et(e,t,n){const i=[...e.faites,{pour:e.date??t.slice(0,10),le:t,par:n}],a=e.date?$t(e.date,e.recurrence):void 0;return a?{...e,faites:i,date:a}:{...e,faites:i,terminee:!0}}function Dn(e,t){const n=ee(t,e);return n<0?{mot:`dépassé de ${-n} jour${n<-1?"s":""}`,urgent:!0}:n===0?{mot:"aujourd’hui",urgent:!0}:n===1?{mot:"demain",urgent:!0}:{mot:`dans ${n} jours`,urgent:n<=7}}const Ln=(e,t)=>e.filter(n=>ee(t,n.date)<=30);function At(e,t,n){const i=`${e==="arrive"?"A":"D"}-${t}-`,a=n.reduce((s,o)=>{if(!o.startsWith(i))return s;const u=parseInt(o.slice(i.length),10);return Number.isFinite(u)&&u>s?u:s},0);return`${i}${String(a+1).padStart(3,"0")}`}const Sn=e=>e.sens==="arrive"&&/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test(e.date)?e.date:void 0,bt=(e,t)=>e.sens==="depart"&&e.repondA?t.find(n=>n.id===e.repondA&&n.sens==="arrive"&&n.etat==="a-traiter"):void 0,Mt=7;function Nn(e,t){return e.prochaineLe&&e.prochaineLe>t?{etat:"en-attente",prochaine:e.prochaine,prochaineLe:e.prochaineLe}:{etat:"en-attente",prochaine:"Relancer",prochaineLe:K(t,Mt)}}function Rn(e,t){if(e.etat!=="en-cours"||!e.fin)return!1;const n=e.preavisJours?K(e.fin,-e.preavisJours):e.fin;return ee(t,n)<=60}const Tn=(e,t)=>(e.etat==="brouillon"||e.etat==="a-signer")&&e.signataires.some(n=>n.userId===t)&&!e.poses.some(n=>n.cle===`sig:${t}`&&!!n.image),_=e=>e.direction||e.titulaire;function In(e,t){return e.prive&&!t.direction?!1:e.genre==="echeance"||e.genre==="contrat"||e.genre==="demarche"||e.genre==="cloture"?_(t):e.genre==="courrier"?_(t)||!!t.moi&&e.traitePar===t.moi:!0}function Pn(e,t,n){return e.prive&&!t.direction?!1:e.genre==="cloture"?t.direction:e.genre==="courrier"?_(t)||!!t.moi&&e.traitePar===t.moi:e.genre==="echeance"||e.genre==="contrat"||e.genre==="demarche"||e.genre==="contact"?_(t):!0}const qn=e=>e.filter(t=>t.genre==="cloture"&&typeof t.annee=="number").map(t=>t.annee).sort((t,n)=>n-t);function jn(e,t,n){if(n)return!1;const i=e.genre==="courrier"?e.date:e.genre==="demarche"?e.termineeLe:void 0;return!!i&&t.includes(parseInt(i.slice(0,4),10))}function On(e,t){const n=new Set([parseInt(t.slice(0,4),10)]);for(const i of e)i.genre==="courrier"&&i.date&&n.add(parseInt(i.date.slice(0,4),10)),i.genre==="demarche"&&i.termineeLe&&n.add(parseInt(i.termineeLe.slice(0,4),10));return[...n].filter(Number.isFinite).sort((i,a)=>a-i)}const Fn=(e,t)=>{if(typeof e!="number"||!Number.isFinite(e))return"";const n=e.toLocaleString("fr-FR",{maximumFractionDigits:2});return t==="XOF"?`${n} F`:`${n} ${t}`},q=()=>new Date().toISOString(),xt=()=>{const e=new Date;return`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,"0")}-${String(e.getDate()).padStart(2,"0")}`},T=e=>t=>t.filter(n=>n.genre===e),Ce=T("courrier"),yn=T("echeance"),wn=T("contrat"),Bn=T("demarche"),Un=T("contact"),_n=T("cloture"),Jn=e=>e.filter(t=>["courrier","echeance","contrat","demarche","contact","cloture"].includes(t.genre)),I=(e,t,n)=>({branchId:e,entite:"mnd",creeLe:q(),creePar:t,...n?{prive:!0}:{}}),P=(e,t)=>{const n={...e,...t,majLe:q()};return g(n),n};function Vn(e){const t=parseInt(e.date.slice(0,4),10)||new Date().getFullYear(),n=At(e.sens,t,Ce(A.get()).map(c=>c.numero)),{branchId:i,par:a,prive:s,...o}=e,u={id:`cou-${M()}`,genre:"courrier",...I(i,a,s),...o,numero:n,etat:e.sens==="arrive"?"a-traiter":"prepare",fichiers:[]};return g(u),u}function zn(e){const{branchId:t,par:n,prive:i,...a}=e,s={id:`ech-${M()}`,genre:"echeance",...I(t,n,i),...a,faites:[]};return g(s),s}const Gn=(e,t)=>P(e,Et(e,q(),t));function Yn(e,t,n){P(e,{etat:"envoye",date:n});const i=bt(e,Ce(t));i&&P(i,{etat:"repondu"})}function kn(e){const{branchId:t,par:n,prive:i,...a}=e,s={id:`con-${M()}`,genre:"contrat",...I(t,n,i),...a,fichiers:[]};return g(s),s}function Xn(e){const{branchId:t,par:n,prive:i,etapes:a,...s}=e,o={id:`dem-${M()}`,genre:"demarche",...I(t,n,i),...s,etapes:a.map(u=>({id:M(),texte:u})),etat:"en-cours",pieceIds:[],frais:[],fichiers:[]};return g(o),o}const Hn=(e,t)=>P(e,{etapes:e.etapes.map(n=>n.id===t?n.faiteLe?{id:n.id,texte:n.texte}:{...n,faiteLe:q()}:n)}),Zn=e=>P(e,{etat:"terminee",termineeLe:xt()});function Wn(e){const{branchId:t,par:n,prive:i,...a}=e,s={id:`ctc-${M()}`,genre:"contact",...I(t,n,i),...a};return g(s),s}function Qn(e,t,n){const i={id:`clo-${t}`,genre:"cloture",...I(e,n),annee:t,closeLe:q(),closePar:n};return g(i),i}const Kn=e=>A.set(t=>t.filter(n=>n.id!==e.id));async function er(e){const t=[];for(const n of Array.from(e)){const i=await Re(n);if(i.erreur)return{fichiers:t,erreur:i.erreur};i.fichier&&t.push(i.fichier)}return{fichiers:t}}async function tr(e,t,n=0,i){return{fichiers:[],erreur:"Pas de connexion à la Maison."}}async function nr(e){return null}async function rr(e){return null}const Ct=W("mnd_secretariat_titulaires",[]),ir=()=>Z(Ct),Dt=W("mnd_secretariat_equipe",[]),ar=()=>Z(Dt);async function sr(){}async function or(){}export{E as $,zt as A,Vt as B,cn as C,un as D,or as E,ar as F,Dn as G,rr as H,nr as I,er as J,Sn as K,xt as L,_ as M,Ce as N,In as O,Ln as P,xn as Q,k as R,ze as S,X as T,We as U,Ze as V,Ot as W,Ve as X,Ue as Y,fe as Z,Pt as _,st as a,Qn as a$,et as a0,ce as a1,ke as a2,Ge as a3,Ht as a4,wt as a5,ge as a6,Ut as a7,je as a8,Bt as a9,qn as aA,ln as aB,dn as aC,jn as aD,Pn as aE,mn as aF,Yn as aG,Vn as aH,Un as aI,K as aJ,$n as aK,gn as aL,hn as aM,vn as aN,Fn as aO,kn as aP,An as aQ,En as aR,Hn as aS,Nn as aT,Zn as aU,Xn as aV,bn as aW,Wn as aX,_n as aY,On as aZ,Jn as a_,Fe as aa,Xe as ab,Yt as ac,Xt as ad,jt as ae,qt as af,kt as ag,Ye as ah,Zt as ai,Tt as aj,_t as ak,Gt as al,Q as am,pt as an,wn as ao,Rn as ap,Bn as aq,Tn as ar,Cn as as,ee as at,yn as au,pn as av,fn as aw,Gn as ax,Kn as ay,zn as az,tn as b,Mn as b0,en as b1,S as b2,Ft as b3,yt as b4,tt as b5,Te as b6,Rt as b7,nn as c,sn as d,Kt as e,Wt as f,ir as g,sr as h,rn as i,lt as j,ot as k,tr as l,Qt as m,on as n,an as o,Ee as p,It as q,P as r,mt as s,it as t,Jt as u,dt as v,g as w,A as x,$e as y,me as z};
