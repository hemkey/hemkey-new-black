/**
 * HEMKEY — Projects Data Store
 * ================================
 * To add a new project: push a new object into the `projects` array.
 *
 * Fields:
 *   id         — unique slug
 *   name       — project display name
 *   category   — "residential" | "commercial" | "senior" | "township"
 *   country    — flag emoji
 *   location   — city + country string
 *   status     — "completed" | "ongoing" | "upcoming"
 *   image      — path to image, leave "" for placeholder
 *   units      — { value: "240", label: "Units" }
 *   area       — { value: "2.8L", label: "Sq. Ft." }
 *   year       — { value: "2022", label: "Delivered" | "Completion" | "Launch" }
 *   featured   — true | false  (true = show on index.html preview grid)
 */

window.HEMKEY = window.HEMKEY || {};

window.HEMKEY.projects = [

  // ─── RESIDENTIAL ───────────────────────────────────────────────────
  {
    id: "apex-residences",
    name: "The Apex Residences",
    category: "residential",
    country: "🇮🇳",
    location: "Bandra, Mumbai, India",
    status: "completed",
    image: "",
    units: { value: "240",  label: "Units"    },
    area:  { value: "2.8L", label: "Sq. Ft."  },
    year:  { value: "2022", label: "Delivered" },
    featured: true
  },
  {
    id: "palm-crest",
    name: "Palm Crest Residences",
    category: "residential",
    country: "🇦🇪",
    location: "Palm Jumeirah, Dubai, UAE",
    status: "ongoing",
    image: "",
    units: { value: "88",   label: "Villas"     },
    area:  { value: "4.2L", label: "Sq. Ft."    },
    year:  { value: "2026", label: "Completion"  },
    featured: true
  },
  {
    id: "harbour-view",
    name: "Harbour View Apartments",
    category: "residential",
    country: "🇦🇺",
    location: "Darling Harbour, Sydney",
    status: "completed",
    image: "",
    units: { value: "312",  label: "Units"    },
    area:  { value: "3.5L", label: "Sq. Ft."  },
    year:  { value: "2021", label: "Delivered" },
    featured: false
  },
  {
    id: "crown-villas",
    name: "Crown Villas",
    category: "residential",
    country: "🇮🇳",
    location: "Gurugram, Delhi NCR, India",
    status: "completed",
    image: "",
    units: { value: "144",  label: "Villas"   },
    area:  { value: "5.6L", label: "Sq. Ft."  },
    year:  { value: "2023", label: "Delivered" },
    featured: false
  },
  {
    id: "botanical-residences",
    name: "The Botanical Residences",
    category: "residential",
    country: "🇦🇺",
    location: "South Yarra, Melbourne",
    status: "ongoing",
    image: "",
    units: { value: "195",  label: "Units"     },
    area:  { value: "2.2L", label: "Sq. Ft."   },
    year:  { value: "2026", label: "Completion" },
    featured: false
  },

  // ─── COMMERCIAL ────────────────────────────────────────────────────
  {
    id: "one-central-tower",
    name: "One Central Tower",
    category: "commercial",
    country: "🇦🇺",
    location: "CBD, Sydney, Australia",
    status: "ongoing",
    image: "",
    units: { value: "58",   label: "Floors"    },
    area:  { value: "9.2L", label: "Sq. Ft."   },
    year:  { value: "2026", label: "Completion" },
    featured: true
  },
  {
    id: "meridian-business-park",
    name: "Meridian Business Park",
    category: "commercial",
    country: "🇮🇳",
    location: "Hinjewadi, Pune, India",
    status: "completed",
    image: "",
    units: { value: "4",    label: "Towers"    },
    area:  { value: "12L",  label: "Sq. Ft."   },
    year:  { value: "2019", label: "Delivered"  },
    featured: false
  },
  {
    id: "downtown-hub-dubai",
    name: "The Downtown Hub",
    category: "commercial",
    country: "🇦🇪",
    location: "Downtown Dubai, UAE",
    status: "upcoming",
    image: "",
    units: { value: "34",   label: "Floors"  },
    area:  { value: "7.1L", label: "Sq. Ft." },
    year:  { value: "2027", label: "Launch"  },
    featured: false
  },

  // ─── SENIOR LIVING ─────────────────────────────────────────────────
  {
    id: "serenity-gardens",
    name: "Serenity Gardens",
    category: "senior",
    country: "🇦🇺",
    location: "Toorak, Melbourne, Australia",
    status: "completed",
    image: "",
    units: { value: "180",  label: "Suites"   },
    area:  { value: "3.1L", label: "Sq. Ft."  },
    year:  { value: "2022", label: "Delivered" },
    featured: true
  },
  {
    id: "silver-pines",
    name: "The Silver Pines",
    category: "senior",
    country: "🇮🇳",
    location: "Whitefield, Bengaluru, India",
    status: "ongoing",
    image: "",
    units: { value: "260",  label: "Suites"    },
    area:  { value: "4.4L", label: "Sq. Ft."   },
    year:  { value: "2025", label: "Completion" },
    featured: false
  },
  {
    id: "desert-bloom-senior",
    name: "Desert Bloom Senior Estate",
    category: "senior",
    country: "🇦🇪",
    location: "Arabian Ranches, Dubai, UAE",
    status: "upcoming",
    image: "",
    units: { value: "140",  label: "Suites" },
    area:  { value: "2.4L", label: "Sq. Ft." },
    year:  { value: "2027", label: "Launch"  },
    featured: false
  },

  // ─── TOWNSHIP ──────────────────────────────────────────────────────
  {
    id: "creek-harbour",
    name: "Creek Harbour Township",
    category: "township",
    country: "🇦🇪",
    location: "Dubai Creek, UAE",
    status: "ongoing",
    image: "",
    units: { value: "2,400", label: "Units"    },
    area:  { value: "48L",   label: "Sq. Ft."  },
    year:  { value: "2027",  label: "Completion" },
    featured: true
  },
  {
    id: "prestige-one-city",
    name: "Prestige One City",
    category: "township",
    country: "🇮🇳",
    location: "Gachibowli, Hyderabad, India",
    status: "completed",
    image: "",
    units: { value: "3,200", label: "Units"    },
    area:  { value: "85L",   label: "Sq. Ft."  },
    year:  { value: "2023",  label: "Delivered" },
    featured: false
  },
  {
    id: "horizon-bay",
    name: "Horizon Bay Precinct",
    category: "township",
    country: "🇦🇺",
    location: "Parramatta, Sydney, Australia",
    status: "upcoming",
    image: "",
    units: { value: "1,800", label: "Units"  },
    area:  { value: "60L",   label: "Sq. Ft." },
    year:  { value: "2028",  label: "Launch"  },
    featured: false
  }

];