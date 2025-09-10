// Default SEO fallbacks
export const defaultSeo = {
  title: "Nyvo Creative | Audit-Ready B2B Video for FinTech",
  description: "Turn one 60-min interview into 12 LinkedIn-ready clips + a podcast—stakeholder variants that help Compliance, Risk, Security & Finance approve faster.",
  canonical: "",
  ogImage: "/og-default.svg",
  ogType: "website",
  ogSiteName: "Nyvo Creative",
  twitterCard: "summary_large_image",
  twitterSite: "@NyvoCreative"
}

// Per-route SEO configuration
export const seoConfig = {
  home: {
    title: "Audit-Ready B2B Video for FinTech RegOps | Nyvo Creative",
    description: "Turn one 60-min interview into 12 LinkedIn-ready clips + a podcast—stakeholder variants that help Compliance, Risk, Security & Finance approve faster.",
    canonical: "/",
    ogImage: "/og-default.svg",
    ogType: "website"
  },
  fincrime: {
    title: "FinCrime: Audit-Ready KYC/AML Video | Nyvo Creative",
    description: "Audit-ready video for KYC/AML/Sanctions. We package controls and outcomes into 60–90s clips your champion can forward to MLRO, Compliance, Risk, Security.",
    canonical: "/fincrime",
    ogImage: "/og-default.svg",
    ogType: "website"
  },
  dataPrivacySecurity: {
    title: "Data Privacy & Security: Vendor Review | Nyvo Creative",
    description: "Data Privacy & Security stories that accelerate vendor review. Short, audit-ready clips map data flow, controls and evidence for DPA/DPIA, SOC 2/ISO buyers.",
    canonical: "/data-privacy-security",
    ogImage: "/og-default.svg",
    ogType: "website"
  },
  inHouseRegOps: {
    title: "In-House RegOps: Faster Approvals | Nyvo Creative",
    description: "In-house RegOps enablement: 12 stakeholder-ready clips + a podcast from one interview—built to win approvals from Compliance, Risk, Security and Finance.",
    canonical: "/in-house-regops",
    ogImage: "/og-default.svg",
    ogType: "website"
  }
}

// Helper function to resolve SEO data for a route
export function resolveSeo(route) {
  const routeName = route.name
  const routeSeo = seoConfig[routeName] || {}
  
  return {
    title: routeSeo.title || defaultSeo.title,
    description: routeSeo.description || defaultSeo.description,
    canonical: routeSeo.canonical || route.path || "",
    ogImage: routeSeo.ogImage || defaultSeo.ogImage,
    ogType: routeSeo.ogType || defaultSeo.ogType,
    ogSiteName: defaultSeo.ogSiteName,
    twitterCard: defaultSeo.twitterCard,
    twitterSite: defaultSeo.twitterSite
  }
}
