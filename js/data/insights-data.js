/**
 * HEMKEY — Insights Data Store
 * ================================
 * To add a new article: push a new object into the `insights` array below.
 *
 * Fields:
 *   id        — unique slug
 *   title     — article headline
 *   excerpt   — short description (shown in cards)
 *   tag       — label shown on card badge (e.g. "Market Report", "India Focus")
 *   date      — display date string (e.g. "March 2025")
 *   image     — path to image — leave "" for placeholder
 *   url       — link href (e.g. "pages/insights/dubai-2025.html" or "#")
 *   featured  — true | false (first featured=true gets the large card on index)
 */

window.HEMKEY = window.HEMKEY || {};

window.HEMKEY.insights = [

  {
    id: "dubai-2025",
    title: "Dubai Real Estate 2025: Why HNI Investors Are Doubling Down",
    excerpt: "With transaction volumes hitting record highs and new visa frameworks attracting global capital, Dubai's property market shows no signs of cooling. Our analysts break down what this means for your portfolio.",
    tag: "Market Report",
    date: "March 2025",
    image: "",
    url: "#",
    featured: true
  },
  {
    id: "singapore-vs-australia",
    title: "Singapore vs. Australia: Where Should You Park Your Capital in 2025?",
    excerpt: "A comparative analysis of yields, capital appreciation, and residency benefits across two of Asia-Pacific's most stable property markets.",
    tag: "Investment Guide",
    date: "February 2025",
    image: "",
    url: "#",
    featured: false
  },
  {
    id: "senior-living-asset-class",
    title: "Senior Living as an Asset Class: The Investment Case for Premium Care Communities",
    excerpt: "Demographic tailwinds, rising demand, and institutional interest are reshaping senior living into one of real estate's most compelling long-term plays.",
    tag: "Lifestyle",
    date: "January 2025",
    image: "",
    url: "#",
    featured: false
  },
  {
    id: "india-tier1-cities",
    title: "India's Tier-1 Cities: The Next Decade of Luxury Real Estate Appreciation",
    excerpt: "Mumbai, Bengaluru and Hyderabad are rewriting the rules of premium real estate. Here's why global NRI investors are reclaiming their roots — and their returns.",
    tag: "India Focus",
    date: "December 2024",
    image: "",
    url: "#",
    featured: false
  }

  // ── ADD MORE ARTICLES BELOW ───────────────────────────────────────────────
  // ,{
  //   id: "my-new-article",
  //   title: "Your New Article Title Here",
  //   excerpt: "Short description for the card...",
  //   tag: "Market Report",
  //   date: "April 2025",
  //   image: "assets/images/insights/my-article.jpg",
  //   url: "pages/insights/my-new-article.html",
  //   featured: false
  // }

];