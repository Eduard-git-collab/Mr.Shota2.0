import { writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Define the routes that should be included in sitemap
const routes = [
  '/',
  '/fincrime',
  '/data-privacy-security',
  '/in-house-regops'
]

// Base URL for the site
const baseUrl = 'https://nyvo.creative' // Update this to the actual domain

// Generate sitemap XML
function generateSitemap() {
  const currentDate = new Date().toISOString()
  
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`

  routes.forEach(route => {
    sitemap += `
  <url>
    <loc>${baseUrl}${route}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${route === '/' ? '1.0' : '0.8'}</priority>
  </url>`
  })

  sitemap += `
</urlset>`

  return sitemap
}

// Write sitemap to public directory
function writeSitemap() {
  const sitemap = generateSitemap()
  const publicDir = join(__dirname, '..', 'public')
  const sitemapPath = join(publicDir, 'sitemap.xml')
  
  try {
    writeFileSync(sitemapPath, sitemap, 'utf8')
    console.log('✅ Sitemap generated successfully at public/sitemap.xml')
  } catch (error) {
    console.error('❌ Error generating sitemap:', error)
    process.exit(1)
  }
}

// Run the generator
writeSitemap()
