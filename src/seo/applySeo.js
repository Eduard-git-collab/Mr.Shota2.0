import { resolveSeo } from './seoConfig.js'

// Helper function to get or create meta tag
function getOrCreateMetaTag(name, property) {
  let selector
  if (name) {
    selector = `meta[name="${name}"]`
  } else if (property) {
    selector = `meta[property="${property}"]`
  }
  
  let tag = document.querySelector(selector)
  if (!tag) {
    tag = document.createElement('meta')
    if (name) tag.setAttribute('name', name)
    if (property) tag.setAttribute('property', property)
    document.head.appendChild(tag)
  }
  return tag
}

// Helper function to get or create canonical link
function getOrCreateCanonicalLink() {
  let link = document.querySelector('link[rel="canonical"]')
  if (!link) {
    link = document.createElement('link')
    link.setAttribute('rel', 'canonical')
    document.head.appendChild(link)
  }
  return link
}

// Main function to apply SEO metadata for a route
export function applySeo(route) {
  const seo = resolveSeo(route)
  const baseUrl = window.location.origin
  
  // Update document title
  document.title = seo.title
  
  // Update meta description
  const descriptionTag = getOrCreateMetaTag('description')
  descriptionTag.setAttribute('content', seo.description)
  
  // Update canonical URL
  const canonicalLink = getOrCreateCanonicalLink()
  canonicalLink.setAttribute('href', baseUrl + seo.canonical)
  
  // Update Open Graph tags
  const ogTitleTag = getOrCreateMetaTag(null, 'og:title')
  ogTitleTag.setAttribute('content', seo.title)
  
  const ogDescriptionTag = getOrCreateMetaTag(null, 'og:description')
  ogDescriptionTag.setAttribute('content', seo.description)
  
  const ogImageTag = getOrCreateMetaTag(null, 'og:image')
  ogImageTag.setAttribute('content', baseUrl + seo.ogImage)
  
  const ogUrlTag = getOrCreateMetaTag(null, 'og:url')
  ogUrlTag.setAttribute('content', baseUrl + seo.canonical)
  
  const ogTypeTag = getOrCreateMetaTag(null, 'og:type')
  ogTypeTag.setAttribute('content', seo.ogType)
  
  const ogSiteNameTag = getOrCreateMetaTag(null, 'og:site_name')
  ogSiteNameTag.setAttribute('content', seo.ogSiteName)
  
  // Update Twitter Card tags
  const twitterCardTag = getOrCreateMetaTag('twitter:card')
  twitterCardTag.setAttribute('content', seo.twitterCard)
  
  const twitterSiteTag = getOrCreateMetaTag('twitter:site')
  twitterSiteTag.setAttribute('content', seo.twitterSite)
  
  const twitterTitleTag = getOrCreateMetaTag('twitter:title')
  twitterTitleTag.setAttribute('content', seo.title)
  
  const twitterDescriptionTag = getOrCreateMetaTag('twitter:description')
  twitterDescriptionTag.setAttribute('content', seo.description)
  
  const twitterImageTag = getOrCreateMetaTag('twitter:image')
  twitterImageTag.setAttribute('content', baseUrl + seo.ogImage)
}
