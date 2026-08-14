// ============================================================
// PEMBERTON CATTLE COMPANY — CENTRAL BUSINESS CONFIGURATION
// Update ALL business information here. Never scatter it through the codebase.
// ============================================================

export const BUSINESS = {
  // Core Identity
  businessName: "Pemberton Cattle Company",
  shortName: "Pemberton Cattle Co.",
  tagline: "Cattle • Livestock • Agricultural Hauling",
  subTagline: "GVW 80,000",

  // Owner
  ownerName: "[OWNER NAME — PLACEHOLDER]",
  ownerFirstName: "[FIRST NAME — PLACEHOLDER]",

  // Location
  city: "Richland",
  state: "Missouri",
  stateAbbr: "MO",
  zip: "[ZIP — PLACEHOLDER]",
  streetAddress: "[STREET ADDRESS — PLACEHOLDER]",

  // Contact — replace ALL placeholders before going live
  phone: "[PHONE NUMBER — PLACEHOLDER]",
  phoneDisplay: "[PHONE — PLACEHOLDER]",
  smsNumber: "[SMS NUMBER — PLACEHOLDER]",
  email: "[EMAIL — PLACEHOLDER]",

  // Social Media
  facebook: "[FACEBOOK URL — PLACEHOLDER]",
  instagram: "[INSTAGRAM URL — PLACEHOLDER]",

  // Maps / Geo
  latitude: 37.8534,
  longitude: -92.3974,

  // Service Area Labels (marketing categories — not legal limits)
  serviceArea: {
    local: { miles: 75, label: "Local Hauling", desc: "Farm-to-farm, sale barn, and area hauling" },
    core: { miles: 150, label: "Core Service Area", desc: "Primary regional operating territory" },
    regional: { miles: 300, label: "Regional Hauling", desc: "Available based on load, schedule & equipment" },
    longDistance: { label: "Long-Distance By Request", desc: "Send us the details — we'll let you know" },
  },

  // Featured nearby areas (marketing display — not exhaustive)
  serviceAreaCities: [
    "Richland", "Lebanon", "Waynesville", "Camdenton",
    "Lake of the Ozarks", "Rolla", "Springfield",
    "Jefferson City", "Fort Leonard Wood Area"
  ],

  // Brand Colors — match the logo (Red + Black)
  colors: {
    primary: "#CC1B1B",       // Brand red (matching logo)
    primaryDark: "#A01414",   // Darker red for hover
    primaryLight: "#E02020",  // Brighter red for accents
    black: "#0A0A0A",
    charcoal: "#1A1A1A",
    darkGray: "#2A2A2A",
    medGray: "#555555",
    lightGray: "#E8E8E8",
    offWhite: "#F8F6F3",
    white: "#FFFFFF",
    accent: "#CC1B1B",        // CTA accent — matches brand red
  },

  // Assets
  logo: "/logo.png",
  logoAlt: "Pemberton Cattle Co. — Richland, MO",

  // Demo Mode — set to false when going live
  isDemoMode: true,

  // Webhook / CRM Integration — wire these up later
  webhookUrl: null as string | null,         // e.g. GoHighLevel webhook
  zapierUrl: null as string | null,
  crmApiKey: null as string | null,
};

// SMS template helpers
export function buildSMSTemplate(type: "cattle" | "equipment"): string {
  if (type === "cattle") {
    return `Hi, I'm looking for someone to haul _____ head from _____ to _____ around _____.`;
  }
  return `Hi, I need a _____ moved from _____ to _____ around _____.`;
}

export function buildSMSLink(number: string, body: string): string {
  return `sms:${number}?body=${encodeURIComponent(body)}`;
}

export function buildCallLink(number: string): string {
  return `tel:${number}`;
}

export default BUSINESS;
