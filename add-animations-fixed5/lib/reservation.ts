export type Slot = {
  time: string
  promo?: number // % de réduction sur l'addition (heure creuse)
  full?: boolean
}

export type Service = {
  id: "midi" | "soir"
  label: string
  slots: Slot[]
}

export const LUNCH_TIMES = ["12:00", "12:30", "13:00", "13:30", "14:00", "14:30"]
export const DINNER_TIMES = ["18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30"]
export const ALL_TIMES = [...LUNCH_TIMES, ...DINNER_TIMES]

// Occupation de démonstration : ces créneaux sont déjà complets
export const FULL_SLOTS = new Set(["13:00", "20:00"])

export type DiscountMap = Record<string, number> // heure -> % de réduction sur l'addition

// Réductions par défaut, positionnées sur les heures creuses
export const DEFAULT_DISCOUNTS: DiscountMap = {
  "14:00": 20,
  "14:30": 20,
  "18:30": 15,
  "19:00": 15,
  "21:30": 10,
}

export const DISCOUNT_OPTIONS = [0, 10, 15, 20, 25, 30]

const STORAGE_KEY = "table-directe:discounts:v1"

export function loadDiscounts(): DiscountMap {
  if (typeof window === "undefined") return { ...DEFAULT_DISCOUNTS }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return { ...DEFAULT_DISCOUNTS }
    return JSON.parse(raw) as DiscountMap
  } catch {
    return { ...DEFAULT_DISCOUNTS }
  }
}

export function saveDiscounts(d: DiscountMap) {
  if (typeof window === "undefined") return
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(d))
  } catch {
    /* ignore */
  }
}

// Construit les services (déjeuner / dîner) à partir de la grille de réductions configurée
export function buildServices(discounts: DiscountMap): Service[] {
  const toSlots = (times: string[]): Slot[] =>
    times.map((time) => ({
      time,
      promo: discounts[time] || undefined,
      full: FULL_SLOTS.has(time),
    }))
  return [
    { id: "midi", label: "Déjeuner", slots: toSlots(LUNCH_TIMES) },
    { id: "soir", label: "Dîner", slots: toSlots(DINNER_TIMES) },
  ]
}

export const PARTY_SIZES = [1, 2, 3, 4, 5, 6]
export const MAX_PARTY = 20

// Ticket moyen estimé par couvert (démo, bistrot)
export const AVG_TICKET = 34

// Commission moyenne prélevée par les plateformes type TheFork (par couvert)
export const PLATFORM_FEE_PER_COVER = 2.5

// Acompte demandé par personne pour les grandes tablées (remboursé sur place)
export const GROUP_DEPOSIT_PER_COVER = 10
export const LARGE_GROUP_THRESHOLD = 6

// ============================================================================
//  DÉMO — VOS COORDONNÉES (à personnaliser)
//  👉 Remplacez les valeurs ci-dessous par VOS informations : c'est ce qui
//     s'affiche dans la barre "Site de démonstration" et en bas de page,
//     pour que les restaurateurs intéressés puissent vous contacter.
// ============================================================================
export const DEMO = {
  // Ce site est-il une démonstration ? (affiche la barre + le bloc contact)
  enabled: true,
  // Le nom de votre studio / votre nom
  studio: "Vitrine Studio",
  // Votre e-mail de contact
  email: "contact@vitrine-studio.eu",
  // Votre téléphone (laisser vide "" pour masquer)
  phone: "+33 7 80 26 21 82",
  // Lien WhatsApp (message pré-rempli) — utilisé par les boutons "Me contacter"
  whatsapp: "https://wa.me/33780262182?text=Je%20veux%20un%20site%20comme%20la%20d%C3%A9mo",
  // Lien optionnel (portfolio, Calendly, WhatsApp...) — laisser vide "" pour masquer
  link: "",
  linkLabel: "Voir mon portfolio",
}

export const RESTAURANT = {
  name: "Le Comptoir du Marché",
  type: "Bistrot lyonnais",
  city: "Lyon",
  tagline: "Cuisine de marché, produits frais et esprit de bouchon, au cœur de la Presqu'île.",
  address: "8 rue des Marronniers, 69002 Lyon",
  hours: "12:00 – 14:30 18:30 – 22:30",
  phone: "04 78 00 00 00",
}

// ---------- La carte (menu complet, présentation éditoriale) ----------
export type CarteItem = {
  id: string
  name: string
  desc: string
  price: number
  signature?: boolean
  // Peut être préparé pour être servi dès l'arrivée (précommande)
  preorder?: boolean
}
export type CarteSection = {
  id: string
  label: string
  note?: string
  // "drink" => section boissons (non précommandable, servi à table)
  kind?: "food" | "drink"
  items: CarteItem[]
}

export const CARTE: CarteSection[] = [
  {
    id: "entrees",
    label: "Entrées",
    kind: "food",
    items: [
      { id: "oeuf-parfait", name: "Œuf parfait, crème de lard", desc: "Œuf basse température, mousseline de pomme de terre fumée, chips de lard", price: 12, preorder: true },
      { id: "quenelle-brochet", name: "Quenelle de brochet", desc: "Sauce Nantua maison, bisque d'écrevisses", price: 14, signature: true, preorder: true },
      { id: "salade-lyonnaise", name: "Salade lyonnaise", desc: "Frisée, lardons, croûtons à l'ail, œuf poché", price: 11, preorder: true },
      { id: "terrine", name: "Terrine de campagne", desc: "Cornichons maison, pain de campagne grillé", price: 10, preorder: true },
      { id: "gratinee", name: "Soupe à l'oignon gratinée", desc: "Oignons confits, comté AOP, croûton doré", price: 11, preorder: true },
      { id: "foie-gras", name: "Foie gras mi-cuit maison", desc: "Chutney de figue, brioche toastée, fleur de sel", price: 16, preorder: true },
    ],
  },
  {
    id: "plats",
    label: "Plats",
    kind: "food",
    note: "Nos viandes sont d'origine française, nos poissons issus de la pêche durable.",
    items: [
      { id: "quenelle-gratinee", name: "Quenelle gratinée du Comptoir", desc: "Gratinée au four, sauce homardine, riz pilaf", price: 24, signature: true, preorder: true },
      { id: "volaille-bresse", name: "Volaille de Bresse à la crème", desc: "Suprême rôti, morilles, vin jaune, légumes de saison", price: 28, signature: true, preorder: true },
      { id: "boeuf", name: "Pièce de bœuf, os à moelle", desc: "Charolais maturé, pommes grenaille, jus corsé", price: 26, preorder: true },
      { id: "cabillaud", name: "Dos de cabillaud rôti", desc: "Beurre blanc, fenouil confit, huile d'aneth", price: 23, preorder: true },
      { id: "risotto", name: "Risotto d'automne", desc: "Champignons, parmesan 24 mois, huile de noisette", price: 19, preorder: true },
      { id: "andouillette", name: "Andouillette AAAAA, moutarde", desc: "Grillée, sauce moutarde à l'ancienne, gratin dauphinois", price: 21, preorder: true },
      { id: "saint-marcellin", name: "Tablier de sapeur", desc: "Gras-double pané, sauce gribiche, salade verte", price: 20, preorder: true },
    ],
  },
  {
    id: "desserts",
    label: "Desserts",
    kind: "food",
    items: [
      { id: "tarte-pralines", name: "Tarte aux pralines roses", desc: "La spécialité lyonnaise, crème fouettée vanille", price: 9, signature: true, preorder: true },
      { id: "fondant", name: "Fondant au chocolat", desc: "Cœur coulant, glace vanille de Madagascar", price: 8, preorder: true },
      { id: "ile-flottante", name: "Île flottante", desc: "Crème anglaise, pralin, caramel au beurre salé", price: 8, preorder: true },
      { id: "cervelle-canut", name: "Cervelle de canut", desc: "Fromage blanc battu aux herbes, à la lyonnaise", price: 7, preorder: true },
      { id: "creme-brulee", name: "Crème brûlée à la vanille", desc: "Vanille bourbon, sucre caramélisé minute", price: 8, preorder: true },
      { id: "cafe-gourmand", name: "Café gourmand", desc: "Expresso et trois mignardises maison", price: 10, preorder: true },
    ],
  },
  {
    id: "vins",
    label: "Vins au verre",
    kind: "drink",
    note: "Notre cave met à l'honneur les vignerons de la vallée du Rhône et du Beaujolais.",
    items: [
      { id: "cotes-rhone", name: "Côtes du Rhône rouge", desc: "12 cl · Domaine local, fruité et rond", price: 6 },
      { id: "brouilly", name: "Brouilly", desc: "12 cl · Beaujolais, souple et gourmand", price: 7, signature: true },
      { id: "viognier", name: "Viognier blanc", desc: "12 cl · Aromatique, fleurs blanches", price: 6.5 },
      { id: "cremant", name: "Crémant de Bourgogne", desc: "10 cl · Bulles fines, brut", price: 8 },
    ],
  },
  {
    id: "apero",
    label: "Apéritifs & cocktails",
    kind: "drink",
    items: [
      { id: "kir", name: "Kir royal", desc: "Crémant, crème de cassis de Dijon", price: 8, signature: true },
      { id: "spritz", name: "Spritz maison", desc: "Apérol, prosecco, zeste d'orange", price: 9 },
      { id: "pastis", name: "Pastis de Lyon", desc: "4 cl, servi avec sa carafe d'eau fraîche", price: 5 },
      { id: "biere", name: "Bière pression locale", desc: "25 cl · Brasserie artisanale lyonnaise", price: 5.5 },
    ],
  },
  {
    id: "soft",
    label: "Boissons sans alcool",
    kind: "drink",
    items: [
      { id: "limonade", name: "Limonade artisanale", desc: "Citron pressé, sucre de canne", price: 4.5 },
      { id: "jus", name: "Jus de fruits maison", desc: "Orange pressée ou pomme de saison", price: 4.5 },
      { id: "eau", name: "Eau minérale", desc: "Plate ou pétillante · 50 cl", price: 3.5 },
      { id: "cafe", name: "Café / thé", desc: "Expresso, allongé, ou thé en feuilles", price: 2.5 },
    ],
  },
]

export const MENU_FORMULES = [
  { label: "Déjeuner du marché", detail: "Entrée + plat ou plat + dessert", price: 24, days: "Du mardi au vendredi, le midi" },
  { label: "Menu Comptoir", detail: "Entrée + plat + dessert", price: 39, days: "Tous les services" },
  { label: "Menu dégustation", detail: "5 services, accord mets & vins en option", price: 62, days: "Le soir, sur réservation" },
]

// ---------- Précommande : dérivée de la carte (plats préparables à l'avance) ----------
export type PreorderItem = { id: string; name: string; price: number; cat: string }

export const PREORDER_MENU: PreorderItem[] = CARTE.filter((s) => s.kind === "food").flatMap((s) =>
  s.items.filter((i) => i.preorder).map((i) => ({ id: i.id, name: i.name, price: i.price, cat: s.label })),
)

export const PREORDER_CATEGORIES = CARTE.filter((s) => s.kind === "food").map((s) => s.label)

// ---------- Bons cadeaux ----------
export const GIFT_AMOUNTS = [50, 75, 100, 150]

export function makeGiftCode(): string {
  const part = () => Math.random().toString(36).slice(2, 6).toUpperCase()
  return `LC-${part()}-${part()}`
}

// ---------- Fidélité (démo : suivi par téléphone en local) ----------
export const LOYALTY_THRESHOLD = 3 // à la 3e visite
export const LOYALTY_REWARD = 10 // 10 € offerts
const LOYALTY_KEY = "table-directe:loyalty:v1"

function normalizePhone(phone: string): string {
  return phone.replace(/\D/g, "")
}

export function getVisitCount(phone: string): number {
  if (typeof window === "undefined") return 0
  const key = normalizePhone(phone)
  if (!key) return 0
  try {
    const map = JSON.parse(window.localStorage.getItem(LOYALTY_KEY) || "{}") as Record<string, number>
    return map[key] || 0
  } catch {
    return 0
  }
}

// Enregistre une visite et renvoie le nouveau numéro de visite
export function recordVisit(phone: string): number {
  if (typeof window === "undefined") return 0
  const key = normalizePhone(phone)
  if (!key) return 0
  try {
    const map = JSON.parse(window.localStorage.getItem(LOYALTY_KEY) || "{}") as Record<string, number>
    const next = (map[key] || 0) + 1
    map[key] = next
    window.localStorage.setItem(LOYALTY_KEY, JSON.stringify(map))
    return next
  } catch {
    return 0
  }
}

// La récompense s'applique quand le numéro de visite est un multiple du seuil
export function loyaltyRewardForVisit(visitNumber: number): number {
  return visitNumber > 0 && visitNumber % LOYALTY_THRESHOLD === 0 ? LOYALTY_REWARD : 0
}

// ---------- Liste d'attente ----------
const WAITLIST_KEY = "table-directe:waitlist:v1"
export type WaitlistEntry = { name: string; phone: string; dateIso: string; time: string; party: number; at: number }

export function saveWaitlistEntry(entry: WaitlistEntry) {
  if (typeof window === "undefined") return
  try {
    const list = JSON.parse(window.localStorage.getItem(WAITLIST_KEY) || "[]") as WaitlistEntry[]
    list.push(entry)
    window.localStorage.setItem(WAITLIST_KEY, JSON.stringify(list))
  } catch {
    /* ignore */
  }
}

export function frenchDates(count = 7): { iso: string; day: string; num: string; month: string }[] {
  const days = ["dim.", "lun.", "mar.", "mer.", "jeu.", "ven.", "sam."]
  const months = ["janv.", "févr.", "mars", "avr.", "mai", "juin", "juil.", "août", "sept.", "oct.", "nov.", "déc."]
  const out = []
  const base = new Date()
  for (let i = 0; i < count; i++) {
    const d = new Date(base)
    d.setDate(base.getDate() + i)
    out.push({
      iso: d.toISOString().slice(0, 10),
      day: i === 0 ? "Auj." : days[d.getDay()],
      num: String(d.getDate()),
      month: months[d.getMonth()],
    })
  }
  return out
}

export function eur(n: number): string {
  return new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n)
}

export function eur2(n: number): string {
  return new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(n)
}
