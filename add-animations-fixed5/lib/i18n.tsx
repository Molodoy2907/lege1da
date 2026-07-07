"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

export type Lang = "fr" | "en"

// ---------------------------------------------------------------------------
//  Dictionnaire FR / EN.
//  Les noms et descriptions des plats restent en français (usage culinaire),
//  seule l'interface est traduite.
// ---------------------------------------------------------------------------
const messages = {
  fr: {
    nav: { reserve: "Réserver", menu: "La carte", loyalty: "Fidélité", gift: "Offrir", ownerSpace: "Espace restaurateur", book: "Réserver" },
    hero: {
      tagline: "Cuisine de marché, produits frais et esprit de bouchon, au cœur de la Presqu'île.",
      ctaReserve: "Réserver une table",
      ctaMenu: "Voir la carte",
      rating: "4,8 · 320 avis Google",
      factHoursLabel: "Service",
      factBookingLabel: "Réservation",
      factBookingValue: "Sans commission",
      factLocationLabel: "Adresse",
      scroll: "Découvrir",
    },
    reserve: {
      eyebrow: "Réservation directe",
      title: "Réservez votre table",
      subtitle: "Confirmation immédiate, sans commission. Réservation gratuite — précommandez votre repas si vous le souhaitez.",
    },
    experience: {
      eyebrow: "L'expérience",
      title: "Une table lyonnaise, pensée dans le détail",
      intro: "Depuis 1998, {name} met à l'honneur les produits du marché et l'art de recevoir de la Presqu'île. Un lieu où l'on prend le temps.",
      items: [
        { title: "Cuisine de marché", text: "Une carte courte qui évolue chaque semaine, au gré des arrivages des producteurs et du marché de la Croix-Rousse." },
        { title: "Cave & accords", text: "Une sélection pointue de vins nature et de la vallée du Rhône, conseillée table par table par notre sommelier." },
        { title: "L'esprit bouchon", text: "L'accueil généreux et la convivialité des grandes tables lyonnaises, dans un décor contemporain et feutré." },
      ],
    },
    carte: {
      eyebrow: "La carte",
      title: "Les plats signatures",
      subtitle: "Quelques incontournables de la maison. La carte complète évolue avec les saisons.",
      cta: "Voir la carte complète",
    },
    loyalty: {
      eyebrow: "Programme fidélité",
      title: "Votre {n}e visite, {reward} offerts",
      subtitle: "Aucune carte à présenter : votre numéro de téléphone suffit. À chaque {n}e réservation, {reward} sont automatiquement déduits de votre addition.",
      caption: "Visite 1 · Visite 2 · Récompense",
    },
    gift: {
      eyebrow: "Bon cadeau",
      title: "Offrez un moment à table",
      text: "Le cadeau qui fait toujours plaisir. Choisissez un montant, personnalisez votre message : le bon est envoyé par e-mail, prêt à offrir. Valable un an, sur place comme à emporter.",
      bullets: ["Montant libre, à partir de 50 €", "Envoi immédiat par e-mail", "Utilisable en une ou plusieurs fois"],
    },
    privat: {
      eyebrow: "Événements privés",
      title: "Privatisez Le Comptoir",
      text: "Dîners d'entreprise, anniversaires, mariages intimes : nous accueillons jusqu'à 40 couverts et composons un menu sur-mesure avec le chef. Un accord mets et vins peut être proposé pour chaque plat.",
      bullets: ["Jusqu'à 40 couverts, salle entière ou espace privatif", "Menu personnalisé avec le chef", "Interlocuteur dédié du devis au service"],
      cta: "Demander un devis",
      mailSubject: "Demande de privatisation",
    },
    owner: {
      eyebrow: "Pour le restaurateur",
      title: "Plus de tables remplies. Zéro commission.",
      subtitle: "Ce site remplace les plateformes payantes et vous fait gagner plus, sans changer votre façon de travailler.",
      advantages: [
        { title: "0 % de commission", text: "Vos clients réservent en direct. Vous gardez 100 % du chiffre, sans commission de plateforme." },
        { title: "Heures creuses remplies", text: "Une remise sur l'addition attire les clients aux heures vides, définie et pilotée par vous." },
        { title: "Précommande = ticket plus élevé", text: "Le client commande son repas à l'avance : plat prêt à l'arrivée, panier moyen plus grand." },
      ],
      cta: "Voir l'espace propriétaire",
    },
    chef: {
      eyebrow: "La maison",
      title: "Derrière les fourneaux",
      name: "Antoine Mercier",
      role: "Chef & fondateur",
      text1: "Formé dans les bouchons de la Croix-Rousse, Antoine compose chaque semaine une carte courte autour des producteurs de la région. Rien n'est figé : la carte suit le marché, pas l'inverse.",
      text2: "« Un bon plat commence chez le producteur. Mon travail, c'est de ne pas l'abîmer en route. »",
    },
    stats: {
      aria: "Chiffres clés de la maison",
      items: [
        { value: 15, suffix: " ans", label: "d'expérience" },
        { value: 28, suffix: "", label: "producteurs locaux" },
        { value: 100, suffix: " %", label: "fait maison" },
        { value: 52, suffix: "", label: "cartes par an" },
      ],
    },
    faq: {
      eyebrow: "Bon à savoir",
      title: "Questions fréquentes",
      subtitle: "Tout ce qu'il faut savoir avant votre venue.",
      items: [
        { q: "Faut-il réserver une table ?", a: "La réservation est vivement recommandée, surtout le soir et le week-end. Vous pouvez réserver en ligne en quelques secondes, directement sur ce site et sans commission." },
        { q: "Proposez-vous des options végétariennes ou sans allergènes ?", a: "Oui. Plusieurs plats végétariens sont disponibles et le chef adapte volontiers la carte. Indiquez vos allergies au moment de la réservation ou à votre arrivée." },
        { q: "Peut-on privatiser le restaurant ?", a: "Bien sûr. Nous accueillons jusqu'à 40 couverts pour vos événements privés, avec un menu sur-mesure composé avec le chef. Contactez-nous pour un devis." },
        { q: "Quelle est votre politique d'annulation ?", a: "L'annulation est gratuite jusqu'à 2 heures avant l'heure réservée. Aucune empreinte bancaire n'est demandée pour une réservation classique." },
        { q: "Où êtes-vous situés et comment venir ?", a: "Au 8 rue des Marronniers, en plein cœur de la Presqu'île à Lyon. Métro Bellecour ou Cordeliers à quelques minutes à pied." },
      ],
    },
    footer: { menu: "La carte", reserve: "Réserver", gift: "Bon cadeau", privat: "Privatisation", faq: "FAQ" },
    demoBar: { tag: "Démo", text: "Réalisé par {studio}. Vous voulez le même site ?", contact: "Je veux ce site", close: "Fermer la barre de démonstration", mailSubject: "Je veux un site comme la démo" },
    demoContact: {
      badge: "Site de démonstration",
      title: "Ce site est une démo — le vôtre peut lui ressembler",
      text: "Réservation directe sans commission, précommande, fidélité, bons cadeaux et espace restaurateur. Réalisé par {studio}. Envie du même pour votre établissement ?",
      includedTitle: "Tout est inclus",
      included: [
        "Réservation directe sans commission",
        "Menu numérique bilingue FR / EN",
        "Bons cadeaux & programme fidélité",
        "Espace restaurateur (tableau de bord)",
        "Design sur mesure adapté mobile",
        "Hébergement rapide & sécurisé",
      ],
      compareTitle: "Combien coûte un site comme celui-ci ?",
      compareRows: [
        { label: "Agence web", price: "1 500 € – 4 000 €" },
        { label: "Freelance", price: "500 € – 1 500 €" },
        { label: "Vitrine Studio", price: "79 €", oldPrice: "429 €", highlight: true, note: "vous êtes ici" },
      ],
      paymentBanner: "Vous payez uniquement à la livraison de votre site. 0 € d'avance.",
      launchBadge: "Offre de lancement",
      priceSetupLabel: "Création du site",
      priceSetupValue: "79 €",
      priceSetupOld: "429 €",
      priceSetupNote: "Paiement unique",
      priceMonthlyLabel: "Hébergement & maintenance",
      priceMonthlyValue: "29 €/mois",
      priceMonthlyNote: "Sans engagement · résiliable à tout moment",
      whyCheapTitle: "Pourquoi un prix si bas ?",
      whyCheapText: "Nous venons de lancer le studio. Ce tarif de lancement nous permet de constituer nos premières références et de recueillir des avis clients. Une fois le portfolio complet, le prix repassera à 429 €.",
      whyCheapNote: "Nous acceptons un nombre limité de projets par mois pour soigner chaque site.",
      priceHint: "Moins cher qu'un seul mois de commissions sur une plateforme de réservation.",
      stepsTitle: "Comment ça marche",
      steps: [
        { title: "Vous nous écrivez", text: "Parlez-nous de votre établissement en quelques lignes. Réponse sous 24 h." },
        { title: "Nous créons votre site", text: "Design sur mesure, textes et photos intégrés. Vous validez chaque étape." },
        { title: "Vous payez à la livraison", text: "Votre site est en ligne, il vous plaît — c'est seulement là que vous payez." },
      ],
      faqTitle: "Questions fréquentes",
      faq: [
        {
          q: "Et si le site ne me plaît pas ?",
          a: "Vous ne payez rien. Le paiement n'a lieu qu'à la livraison d'un site qui vous convient — nous ajustons jusqu'à ce que ce soit le cas.",
        },
        {
          q: "Que comprennent les 29 €/mois ?",
          a: "L'hébergement rapide et sécurisé, le nom de domaine, les mises à jour techniques et les petites modifications de contenu (horaires, menu, photos).",
        },
        {
          q: "Puis-je arrêter quand je veux ?",
          a: "Oui, l'abonnement est sans engagement et résiliable à tout moment, sans frais.",
        },
      ],
      disclaimer: "Les coordonnées et les plats sont fictifs et servent uniquement à la démonstration.",
    },
    menuPage: {
      eyebrow: "Cuisine de marché · {city}",
      title: "La carte",
      subtitle: "Entrées, plats, desserts et notre cave : une carte complète qui évolue au fil des saisons et des arrivages.",
      formulesTitle: "Nos formules",
      note: "Une allergie, un régime particulier ? Prévenez-nous, la cuisine s'adapte. Prix nets, service compris.",
      ctaReserve: "Réserver une table",
      backHome: "Retour à l'accueil",
      signature: "Signature",
    },
    sections: { entrees: "Entrées", plats: "Plats", desserts: "Desserts", vins: "Vins au verre", apero: "Apéritifs & cocktails", soft: "Boissons sans alcool" },
    formules: [
      { label: "Déjeuner du marché", detail: "Entrée + plat ou plat + dessert", days: "Du mardi au vendredi, le midi" },
      { label: "Menu Comptoir", detail: "Entrée + plat + dessert", days: "Tous les services" },
      { label: "Menu dégustation", detail: "5 services, accord mets & vins en option", days: "Le soir, sur réservation" },
    ],
    loader: { tagline: "Bistrot lyonnais" },
    widget: {
      badge: "Sans commission",
      title: "Réserver une table",
      back: "Retour",
      party: { title: "Combien de personnes ?" },
      partyLarge: {
        title: "Combien serez-vous exactement ?",
        sub: "Pour les grandes tablées, précisez le nombre de couverts.",
        less: "Moins de couverts",
        more: "Plus de couverts",
        depositHint: "Un acompte de {per}/personne (soit {total}) sera demandé pour confirmer, puis déduit de votre addition. Il protège le restaurant contre les no-shows.",
        continue: "Continuer",
      },
      date: { title: "Quel jour ?" },
      time: {
        title: "À quelle heure ?",
        discountHint: "Les créneaux marqués d'une remise offrent une réduction sur l'addition (vos plats et boissons) pour remplir les heures creuses.",
        full: "Complet",
        waitlistNote: "Créneau complet ? Rejoignez la liste d'attente, on vous prévient dès qu'une table se libère.",
      },
      preorder: {
        title: "Souhaitez-vous précommander ?",
        sub: "Gagnez du temps : vos plats peuvent être prêts dès votre arrivée.",
        onArrival: "Prêt à mon arrivée",
        onArrivalSub: "On mange sur place, plats servis dès l'arrivée",
        onSite: "Non, je commanderai sur place",
        onSiteSub: "Réserver la table uniquement",
      },
      menu: {
        title: "Précommandez vos plats",
        sub: "Optionnel — la même carte que sur le site. Ajoutez ce que vous souhaitez préparer à l'avance.",
        add: "Ajouter",
        removeOne: "Retirer un",
        addOne: "Ajouter un",
        items: "{n} article{s}",
        continue: "Continuer ({total})",
        skip: "Passer cette étape",
      },
      contact: {
        title: "Vos coordonnées",
        sub: "Pour confirmer la réservation à votre nom et vous envoyer un rappel.",
        first: "Prénom",
        last: "Nom",
        phone: "Téléphone (rappel SMS)",
        email: "E-mail (facultatif)",
        loyaltyReward: "Ce sera votre {n}e visite — {reward} offerts sur cette addition. Merci de votre fidélité !",
        loyaltyProgress: "Fidélité : {n}e visite. Encore {left} visite(s) avant {reward} offerts.",
        smsNote: "Un rappel vous sera envoyé par SMS{email}. Votre nom sert à confirmer la table à votre arrivée.",
        andEmail: " et e-mail",
        confirm: "Confirmer la réservation",
        confirmLarge: "Continuer vers l'acompte",
      },
      deposit: {
        title: "Acompte de confirmation",
        sub: "Pour les tablées de {n} personnes et plus, un acompte garantit votre table.",
        line: "{n} couverts × {per}",
        toPay: "Acompte à régler",
        refundNote: "Entièrement déduit de votre addition sur place. Remboursé en cas d'annulation 24 h à l'avance.",
        consent: "J'accepte de régler l'acompte de {total} pour confirmer ma réservation de groupe.",
        pay: "Régler {total}",
      },
      done: {
        title: "Table réservée !",
        forName: "Au nom de {name}",
        person: "personne",
        people: "personnes",
        onArrival: "Plats prêts à l'arrivée",
        onSite: "Commande sur place",
        preorder: "Précommande",
        discount: "Réduction -{n}% sur l'addition sur place",
        discountApplied: "appliquée",
        loyalty: "Fidélité ({n}e visite)",
        depositPaid: "Acompte réglé (déduit sur place)",
        commission: "Commission plateforme",
        depositConfirmed: "Acompte confirmé. ",
        free: "La réservation de la table est gratuite. ",
        smsNote: "Un rappel vous sera envoyé{email} avant votre venue.",
        bySmsEmail: " par SMS et e-mail",
        bySms: " par SMS",
        newReservation: "Nouvelle réservation",
        cancel: "Annuler cette réservation",
      },
      cancelled: {
        title: "Réservation annulée",
        sub: "Votre table a été libérée{deposit}. Vous pouvez réserver un autre créneau quand vous le souhaitez.",
        depositRefund: " et votre acompte remboursé",
        new: "Faire une nouvelle réservation",
      },
      waitlist: {
        title: "Liste d'attente",
        sub: "Ce créneau est complet. Laissez vos coordonnées : nous vous prévenons par SMS dès qu'une table se libère.",
        name: "Votre nom",
        phone: "Téléphone",
        confirm: "M'inscrire",
      },
      waitlistDone: {
        title: "Vous êtes sur la liste",
        sub: "Nous vous enverrons un SMS dès qu'une table se libère pour le {time}. Aucun engagement.",
        back: "Retour à la réservation",
      },
    },
    dash: {
      brand: "Espace propriétaire",
      site: "Site",
      cards: {
        coversToday: "Couverts aujourd'hui",
        reservations: "{n} réservations",
        revenueToday: "Chiffre estimé du jour",
        avgTicket: "Ticket moyen {v}",
        commissionSaved: "Commission économisée",
        vsPlatform: "Ce mois vs plateforme",
        preorderRevenue: "Chiffre précommandes",
        preorderCovers: "{n} couverts ce mois",
        offPeakFilled: "Heures creuses remplies",
        offPeakSub: "Aujourd'hui, grâce aux remises",
        noshow: "No-shows évités",
        noshowSub: "≈ {v} sauvés",
        covers: "couv.",
      },
      calc: {
        title: "Calculateur de gains",
        subtitle: "Estimez ce que vous gagnez en réservant en direct plutôt que via une plateforme payante.",
        coversPerDay: "Couverts par jour",
        openDays: "Jours d'ouverture / mois",
        platformShare: "Part réservée via plateforme",
        commissionRate: "Commission plateforme / couvert",
        avgTicket: "Ticket moyen",
        resultTitle: "Économie estimée par mois",
        resultSub: "Soit {yearly} par an conservés dans votre caisse.",
        breakdownCommission: "Commissions évitées",
        breakdownPreorder: "Surplus précommandes",
        note: "Estimation à titre indicatif, basée sur vos réglages ci-dessus.",
      },
      discounts: {
        title: "Remises heures creuses",
        saved: "Enregistré",
        text: "Choisissez une remise sur l'addition pour les créneaux que vous voulez remplir. Elle s'applique aussitôt sur la page de réservation de vos clients.",
        lunch: "Déjeuner",
        dinner: "Dîner",
      },
      heatmap: { title: "Taux de remplissage", text: "Repérez vos heures creuses (en rouge) pour y placer vos remises." },
      bookings: { title: "Réservations du jour", smsActive: "Rappels SMS actifs", people: "pers.", preorder: "Précommande", offPeak: "Heure creuse" },
      week: { title: "Couverts cette semaine", total: "Total {n} couverts" },
      margin: { title: "Marge récupérée ce mois", note: "Commission évitée + no-shows réduits + précommandes. Abonnement : {price}/mois." },
      days: { mon: "Lun", tue: "Mar", wed: "Mer", thu: "Jeu", fri: "Ven", sat: "Sam", sun: "Dim" },
    },
  },

  en: {
    nav: { reserve: "Book", menu: "Menu", loyalty: "Loyalty", gift: "Gift", ownerSpace: "Owner area", book: "Book" },
    hero: {
      tagline: "Market cuisine, fresh produce and the spirit of a Lyon bouchon, in the heart of the Presqu'île.",
      ctaReserve: "Book a table",
      ctaMenu: "View the menu",
      rating: "4.8 · 320 Google reviews",
      factHoursLabel: "Service",
      factBookingLabel: "Booking",
      factBookingValue: "Commission-free",
      factLocationLabel: "Address",
      scroll: "Discover",
    },
    reserve: {
      eyebrow: "Direct booking",
      title: "Book your table",
      subtitle: "Instant confirmation, no commission. Booking is free — pre-order your meal if you like.",
    },
    experience: {
      eyebrow: "The experience",
      title: "A Lyon table, crafted down to the detail",
      intro: "Since 1998, {name} has celebrated market produce and the art of hosting in the Presqu'île. A place where you take your time.",
      items: [
        { title: "Market cuisine", text: "A short menu that changes every week, following the producers and the Croix-Rousse market." },
        { title: "Cellar & pairings", text: "A sharp selection of natural and Rhône Valley wines, advised table by table by our sommelier." },
        { title: "The bouchon spirit", text: "The generous welcome and conviviality of Lyon's great tables, in a warm contemporary setting." },
      ],
    },
    carte: {
      eyebrow: "The menu",
      title: "Signature dishes",
      subtitle: "A few house essentials. The full menu changes with the seasons.",
      cta: "View the full menu",
    },
    loyalty: {
      eyebrow: "Loyalty programme",
      title: "Your {n}rd visit, {reward} on us",
      subtitle: "No card to show: your phone number is enough. On every {n}rd booking, {reward} is automatically taken off your bill.",
      caption: "Visit 1 · Visit 2 · Reward",
    },
    gift: {
      eyebrow: "Gift card",
      title: "Give a moment at the table",
      text: "The gift that always delights. Choose an amount, personalise your message: the voucher is sent by email, ready to give. Valid one year, dine-in or takeaway.",
      bullets: ["Any amount, from €50", "Sent instantly by email", "Use it in one or several visits"],
    },
    privat: {
      eyebrow: "Private events",
      title: "Privatise Le Comptoir",
      text: "Company dinners, birthdays, intimate weddings: we welcome up to 40 guests and craft a bespoke menu with the chef. A food and wine pairing can be offered for each course.",
      bullets: ["Up to 40 guests, full room or private space", "Bespoke menu with the chef", "A dedicated contact from quote to service"],
      cta: "Request a quote",
      mailSubject: "Private event enquiry",
    },
    owner: {
      eyebrow: "For the restaurateur",
      title: "More tables filled. Zero commission.",
      subtitle: "This site replaces paid platforms and earns you more, without changing the way you work.",
      advantages: [
        { title: "0% commission", text: "Your guests book directly. You keep 100% of the revenue, with no platform commission." },
        { title: "Off-peak hours filled", text: "A discount on the bill draws guests to empty slots — set and controlled by you." },
        { title: "Pre-order = higher ticket", text: "Guests order their meal ahead: dish ready on arrival, bigger average spend." },
      ],
      cta: "See the owner area",
    },
    chef: {
      eyebrow: "The house",
      title: "Behind the stove",
      name: "Antoine Mercier",
      role: "Chef & founder",
      text1: "Trained in the bouchons of the Croix-Rousse, Antoine builds a short weekly menu around the region's producers. Nothing is set in stone: the menu follows the market, not the other way round.",
      text2: "\u201cA good dish starts at the producer's. My job is not to spoil it on the way.\u201d",
    },
    stats: {
      aria: "Key figures of the house",
      items: [
        { value: 15, suffix: " yrs", label: "of experience" },
        { value: 28, suffix: "", label: "local producers" },
        { value: 100, suffix: " %", label: "homemade" },
        { value: 52, suffix: "", label: "menus a year" },
      ],
    },
    faq: {
      eyebrow: "Good to know",
      title: "Frequently asked questions",
      subtitle: "Everything you need to know before your visit.",
      items: [
        { q: "Do I need to book a table?", a: "Booking is highly recommended, especially in the evening and at weekends. You can reserve online in seconds, directly on this site and commission-free." },
        { q: "Do you offer vegetarian or allergen-free options?", a: "Yes. Several vegetarian dishes are available and the chef is happy to adapt the menu. Just let us know about any allergies when booking or on arrival." },
        { q: "Can the restaurant be booked for private events?", a: "Absolutely. We host up to 40 guests for private events, with a bespoke menu created with the chef. Contact us for a quote." },
        { q: "What is your cancellation policy?", a: "Cancellation is free up to 2 hours before your booking time. No card details are required for a standard reservation." },
        { q: "Where are you located and how do I get there?", a: "At 8 rue des Marronniers, in the heart of Lyon's Presqu'île. Bellecour or Cordeliers metro stations are a few minutes' walk away." },
      ],
    },
    footer: { menu: "Menu", reserve: "Book", gift: "Gift card", privat: "Private events", faq: "FAQ" },
    demoBar: { tag: "Demo", text: "Made by {studio}. Want the same site?", contact: "I want this site", close: "Close the demo bar", mailSubject: "I want a site like the demo" },
    demoContact: {
      badge: "Demonstration site",
      title: "This site is a demo — yours can look just like it",
      text: "Direct commission-free booking, pre-order, loyalty, gift cards and an owner area. Made by {studio}. Want the same for your venue?",
      includedTitle: "Everything is included",
      included: [
        "Direct commission-free booking",
        "Bilingual FR / EN digital menu",
        "Gift cards & loyalty programme",
        "Owner area (dashboard)",
        "Custom mobile-first design",
        "Fast & secure hosting",
      ],
      compareTitle: "How much does a site like this cost?",
      compareRows: [
        { label: "Web agency", price: "€1,500 – €4,000" },
        { label: "Freelancer", price: "€500 – €1,500" },
        { label: "Vitrine Studio", price: "€79", oldPrice: "€429", highlight: true, note: "you are here" },
      ],
      paymentBanner: "You only pay when your site is delivered. €0 upfront.",
      launchBadge: "Launch offer",
      priceSetupLabel: "Website creation",
      priceSetupValue: "€79",
      priceSetupOld: "€429",
      priceSetupNote: "One-time payment",
      priceMonthlyLabel: "Hosting & maintenance",
      priceMonthlyValue: "€29/month",
      priceMonthlyNote: "No commitment · cancel anytime",
      whyCheapTitle: "Why so affordable?",
      whyCheapText: "We've just launched the studio. This launch price lets us build our first references and collect client reviews. Once the portfolio is complete, the price will return to €429.",
      whyCheapNote: "We take on a limited number of projects each month to give every site full attention.",
      priceHint: "Less than a single month of commissions on a booking platform.",
      stepsTitle: "How it works",
      steps: [
        { title: "You write to us", text: "Tell us about your business in a few lines. Reply within 24 hours." },
        { title: "We build your site", text: "Custom design with your texts and photos. You approve every step." },
        { title: "You pay on delivery", text: "Your site is live and you love it — only then do you pay." },
      ],
      faqTitle: "Frequently asked questions",
      faq: [
        {
          q: "What if I don't like the site?",
          a: "You pay nothing. Payment only happens when a site you're happy with is delivered — we adjust until it is.",
        },
        {
          q: "What does the €29/month include?",
          a: "Fast and secure hosting, the domain name, technical updates and small content changes (opening hours, menu, photos).",
        },
        {
          q: "Can I cancel whenever I want?",
          a: "Yes, the subscription has no commitment and can be cancelled at any time, free of charge.",
        },
      ],
      disclaimer: "Contact details and dishes are fictional and used for demonstration only.",
    },
    menuPage: {
      eyebrow: "Market cuisine · {city}",
      title: "The menu",
      subtitle: "Starters, mains, desserts and our cellar: a full menu that changes with the seasons and the market.",
      formulesTitle: "Our set menus",
      note: "An allergy or special diet? Let us know, the kitchen adapts. Net prices, service included.",
      ctaReserve: "Book a table",
      backHome: "Back to home",
      signature: "Signature",
    },
    sections: { entrees: "Starters", plats: "Mains", desserts: "Desserts", vins: "Wines by the glass", apero: "Aperitifs & cocktails", soft: "Soft drinks" },
    formules: [
      { label: "Market lunch", detail: "Starter + main or main + dessert", days: "Tuesday to Friday, lunch" },
      { label: "Comptoir menu", detail: "Starter + main + dessert", days: "All services" },
      { label: "Tasting menu", detail: "5 courses, optional food & wine pairing", days: "Evenings, by reservation" },
    ],
    loader: { tagline: "Lyon bistrot" },
    widget: {
      badge: "No commission",
      title: "Book a table",
      back: "Back",
      party: { title: "How many guests?" },
      partyLarge: {
        title: "Exactly how many will you be?",
        sub: "For larger parties, please specify the number of covers.",
        less: "Fewer covers",
        more: "More covers",
        depositHint: "A deposit of {per}/guest (i.e. {total}) is required to confirm, then deducted from your bill. It protects the restaurant against no-shows.",
        continue: "Continue",
      },
      date: { title: "Which day?" },
      time: {
        title: "What time?",
        discountHint: "Slots marked with a discount offer a reduction on the bill (your food and drinks) to fill off-peak hours.",
        full: "Full",
        waitlistNote: "Slot full? Join the waitlist and we'll let you know the moment a table frees up.",
      },
      preorder: {
        title: "Would you like to pre-order?",
        sub: "Save time: your dishes can be ready the moment you arrive.",
        onArrival: "Ready on arrival",
        onArrivalSub: "Dine in, dishes served as you arrive",
        onSite: "No, I'll order on site",
        onSiteSub: "Book the table only",
      },
      menu: {
        title: "Pre-order your dishes",
        sub: "Optional — the same menu as on the site. Add whatever you'd like prepared ahead.",
        add: "Add",
        removeOne: "Remove one",
        addOne: "Add one",
        items: "{n} item{s}",
        continue: "Continue ({total})",
        skip: "Skip this step",
      },
      contact: {
        title: "Your details",
        sub: "To confirm the booking in your name and send you a reminder.",
        first: "First name",
        last: "Last name",
        phone: "Phone (SMS reminder)",
        email: "Email (optional)",
        loyaltyReward: "This will be your visit #{n} — {reward} off this bill. Thank you for your loyalty!",
        loyaltyProgress: "Loyalty: visit #{n}. {left} more visit(s) before {reward} off.",
        smsNote: "A reminder will be sent by SMS{email}. Your name is used to confirm the table on arrival.",
        andEmail: " and email",
        confirm: "Confirm booking",
        confirmLarge: "Continue to deposit",
      },
      deposit: {
        title: "Confirmation deposit",
        sub: "For parties of {n} or more, a deposit secures your table.",
        line: "{n} covers × {per}",
        toPay: "Deposit to pay",
        refundNote: "Fully deducted from your bill on site. Refunded if cancelled 24h in advance.",
        consent: "I agree to pay the {total} deposit to confirm my group booking.",
        pay: "Pay {total}",
      },
      done: {
        title: "Table booked!",
        forName: "For {name}",
        person: "guest",
        people: "guests",
        onArrival: "Dishes ready on arrival",
        onSite: "Ordering on site",
        preorder: "Pre-order",
        discount: "-{n}% off the on-site bill",
        discountApplied: "applied",
        loyalty: "Loyalty (visit #{n})",
        depositPaid: "Deposit paid (deducted on site)",
        commission: "Platform commission",
        depositConfirmed: "Deposit confirmed. ",
        free: "Booking the table is free. ",
        smsNote: "A reminder will be sent{email} before your visit.",
        bySmsEmail: " by SMS and email",
        bySms: " by SMS",
        newReservation: "New booking",
        cancel: "Cancel this booking",
      },
      cancelled: {
        title: "Booking cancelled",
        sub: "Your table has been released{deposit}. You can book another slot whenever you like.",
        depositRefund: " and your deposit refunded",
        new: "Make a new booking",
      },
      waitlist: {
        title: "Waitlist",
        sub: "This slot is full. Leave your details: we'll text you as soon as a table frees up.",
        name: "Your name",
        phone: "Phone",
        confirm: "Join",
      },
      waitlistDone: {
        title: "You're on the list",
        sub: "We'll text you as soon as a table frees up for {time}. No commitment.",
        back: "Back to booking",
      },
    },
    dash: {
      brand: "Owner area",
      site: "Site",
      cards: {
        coversToday: "Covers today",
        reservations: "{n} bookings",
        revenueToday: "Estimated revenue today",
        avgTicket: "Avg. ticket {v}",
        commissionSaved: "Commission saved",
        vsPlatform: "This month vs platform",
        preorderRevenue: "Pre-order revenue",
        preorderCovers: "{n} covers this month",
        offPeakFilled: "Off-peak seats filled",
        offPeakSub: "Today, thanks to discounts",
        noshow: "No-shows avoided",
        noshowSub: "≈ {v} saved",
        covers: "cov.",
      },
      calc: {
        title: "Earnings calculator",
        subtitle: "Estimate what you earn by booking directly instead of through a paid platform.",
        coversPerDay: "Covers per day",
        openDays: "Open days / month",
        platformShare: "Share booked via platform",
        commissionRate: "Platform commission / cover",
        avgTicket: "Average ticket",
        resultTitle: "Estimated saving per month",
        resultSub: "That's {yearly} a year kept in your till.",
        breakdownCommission: "Commissions avoided",
        breakdownPreorder: "Pre-order upside",
        note: "Indicative estimate, based on your settings above.",
      },
      discounts: {
        title: "Off-peak discounts",
        saved: "Saved",
        text: "Choose a discount on the bill for the slots you want to fill. It applies instantly on your guests' booking page.",
        lunch: "Lunch",
        dinner: "Dinner",
      },
      heatmap: { title: "Occupancy rate", text: "Spot your off-peak hours (in red) to place your discounts there." },
      bookings: { title: "Today's bookings", smsActive: "SMS reminders on", people: "ppl", preorder: "Pre-order", offPeak: "Off-peak" },
      week: { title: "Covers this week", total: "Total {n} covers" },
      margin: { title: "Margin recovered this month", note: "Commission avoided + fewer no-shows + pre-orders. Subscription: {price}/month." },
      days: { mon: "Mon", tue: "Tue", wed: "Wed", thu: "Thu", fri: "Fri", sat: "Sat", sun: "Sun" },
    },
  },
} as const

// ---------- Menu (dishes/drinks) English translations, keyed by item id ----------
const MENU_EN: Record<string, { name: string; desc: string }> = {
  "oeuf-parfait": { name: "Perfect egg, bacon cream", desc: "Low-temperature egg, smoked potato mousseline, bacon crisps" },
  "quenelle-brochet": { name: "Pike quenelle", desc: "House Nantua sauce, crayfish bisque" },
  "salade-lyonnaise": { name: "Lyon-style salad", desc: "Frisée, bacon, garlic croutons, poached egg" },
  terrine: { name: "Country terrine", desc: "House pickles, grilled country bread" },
  gratinee: { name: "Gratinéed onion soup", desc: "Confit onions, Comté AOP, golden crouton" },
  "foie-gras": { name: "House semi-cooked foie gras", desc: "Fig chutney, toasted brioche, fleur de sel" },
  "quenelle-gratinee": { name: "Comptoir gratinéed quenelle", desc: "Oven-baked, lobster sauce, pilaf rice" },
  "volaille-bresse": { name: "Bresse chicken in cream", desc: "Roasted supreme, morels, vin jaune, seasonal vegetables" },
  boeuf: { name: "Beef cut, bone marrow", desc: "Aged Charolais, grenaille potatoes, rich jus" },
  cabillaud: { name: "Roasted cod loin", desc: "Beurre blanc, confit fennel, dill oil" },
  risotto: { name: "Autumn risotto", desc: "Mushrooms, 24-month parmesan, hazelnut oil" },
  andouillette: { name: "AAAAA andouillette, mustard", desc: "Grilled, wholegrain mustard sauce, gratin dauphinois" },
  "saint-marcellin": { name: "Tablier de sapeur", desc: "Breaded tripe, gribiche sauce, green salad" },
  "tarte-pralines": { name: "Pink praline tart", desc: "The Lyon specialty, vanilla whipped cream" },
  fondant: { name: "Chocolate fondant", desc: "Molten center, Madagascar vanilla ice cream" },
  "ile-flottante": { name: "Floating island", desc: "Crème anglaise, praline, salted butter caramel" },
  "cervelle-canut": { name: "Cervelle de canut", desc: "Herbed whipped fromage blanc, Lyon-style" },
  "creme-brulee": { name: "Vanilla crème brûlée", desc: "Bourbon vanilla, caramelized to order" },
  "cafe-gourmand": { name: "Café gourmand", desc: "Espresso and three house sweets" },
  "cotes-rhone": { name: "Côtes du Rhône red", desc: "12 cl · Local estate, fruity and round" },
  brouilly: { name: "Brouilly", desc: "12 cl · Beaujolais, supple and gourmand" },
  viognier: { name: "Viognier white", desc: "12 cl · Aromatic, white flowers" },
  cremant: { name: "Crémant de Bourgogne", desc: "10 cl · Fine bubbles, brut" },
  kir: { name: "Kir royal", desc: "Crémant, Dijon blackcurrant liqueur" },
  spritz: { name: "House spritz", desc: "Aperol, prosecco, orange zest" },
  pastis: { name: "Lyon pastis", desc: "4 cl, served with a carafe of chilled water" },
  biere: { name: "Local draft beer", desc: "25 cl · Lyon craft brewery" },
  limonade: { name: "Artisanal lemonade", desc: "Fresh-pressed lemon, cane sugar" },
  jus: { name: "House fruit juice", desc: "Fresh-pressed orange or seasonal apple" },
  eau: { name: "Mineral water", desc: "Still or sparkling · 50 cl" },
  cafe: { name: "Coffee / tea", desc: "Espresso, lungo, or loose-leaf tea" },
}

const SECTION_NOTE_EN: Record<string, string> = {
  plats: "Our meats are of French origin, our fish from sustainable fishing.",
  vins: "Our cellar celebrates winemakers from the Rhône valley and Beaujolais.",
}

type Messages = (typeof messages)["fr"]

const I18nContext = createContext<{
  lang: Lang
  setLang: (l: Lang) => void
  t: <T = string>(path: string, vars?: Record<string, string | number>) => T
  /** Translate a menu item's name/description by its id (falls back to the FR source). */
  menu: (id: string, fr: { name: string; desc?: string }) => { name: string; desc: string }
  /** Translate a section note by section id (falls back to the FR source). */
  note: (sectionId: string, fr?: string) => string | undefined
} | null>(null)

const STORAGE_KEY = "table-directe:lang:v1"

function resolve(obj: unknown, path: string): unknown {
  return path.split(".").reduce<unknown>((acc, key) => {
    if (acc && typeof acc === "object") return (acc as Record<string, unknown>)[key]
    return undefined
  }, obj)
}

function interpolate(value: string, vars?: Record<string, string | number>): string {
  if (!vars) return value
  return value.replace(/\{(\w+)\}/g, (_, k) => (k in vars ? String(vars[k]) : `{${k}}`))
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("fr")

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY) as Lang | null
      if (saved === "fr" || saved === "en") setLangState(saved)
    } catch {
      /* ignore */
    }
  }, [])

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  function setLang(l: Lang) {
    if (l === lang) return

    const persist = () => {
      try {
        window.localStorage.setItem(STORAGE_KEY, l)
      } catch {
        /* ignore */
      }
    }

    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches

    if (reduced) {
      setLangState(l)
      persist()
      return
    }

    // Fondu de sortie du contenu, changement de langue, puis fondu d'entrée
    const root = document.documentElement
    root.classList.add("lang-switching")
    window.setTimeout(() => {
      setLangState(l)
      persist()
      window.setTimeout(() => root.classList.remove("lang-switching"), 80)
    }, 300)
  }

  function t<T = string>(path: string, vars?: Record<string, string | number>): T {
    const raw = resolve(messages[lang], path)
    if (typeof raw === "string") return interpolate(raw, vars) as T
    return raw as T
  }

  function menu(id: string, fr: { name: string; desc?: string }) {
    if (lang === "en") {
      const en = MENU_EN[id]
      if (en) return en
    }
    return { name: fr.name, desc: fr.desc ?? "" }
  }

  function note(sectionId: string, fr?: string) {
    if (lang === "en") return SECTION_NOTE_EN[sectionId] ?? fr
    return fr
  }

  return <I18nContext.Provider value={{ lang, setLang, t, menu, note }}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) {
    // SSR/prerender fallback — default to French
    return {
      lang: "fr" as Lang,
      setLang: () => {},
      t: <T = string>(path: string, vars?: Record<string, string | number>): T => {
        const raw = resolve(messages["fr"], path)
        if (typeof raw === "string") return interpolate(raw, vars) as T
        return raw as T
      },
      menu: (_id: string, fr: { name: string; desc?: string }) => ({ name: fr.name, desc: fr.desc ?? "" }),
      note: (_sectionId: string, fr?: string) => fr,
    }
  }
  return ctx
}

export type { Messages }
