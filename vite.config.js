import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'node:fs'
import path from 'node:path'

function seoHeadersPlugin() {
  return {
    name: 'seo-headers-plugin',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        // Universal CORS and Private Network Access for Chrome Extensions (SEOquake/SEMrush)
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.setHeader('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS')
        res.setHeader('Access-Control-Allow-Headers', '*')
        res.setHeader('Access-Control-Allow-Private-Network', 'true')
        res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload')
        res.setHeader('X-Content-Type-Options', 'nosniff')
        res.setHeader('X-Frame-Options', 'SAMEORIGIN')

        if (req.method === 'OPTIONS') {
          res.statusCode = 204
          res.end()
          return
        }

        const urlPath = req.url ? req.url.split('?')[0] : ''

        if (urlPath === '/robots.txt') {
          const robotsFile = path.resolve(process.cwd(), 'public', 'robots.txt')
          if (fs.existsSync(robotsFile)) {
            const content = fs.readFileSync(robotsFile, 'utf-8')
            res.setHeader('Content-Type', 'text/plain; charset=utf-8')
            res.setHeader('Content-Length', Buffer.byteLength(content, 'utf-8'))
            res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate')
            res.statusCode = 200
            res.end(content)
            return
          }
        }

        if (urlPath === '/sitemap.xml') {
          const sitemapFile = path.resolve(process.cwd(), 'public', 'sitemap.xml')
          if (fs.existsSync(sitemapFile)) {
            const content = fs.readFileSync(sitemapFile, 'utf-8')
            res.setHeader('Content-Type', 'application/xml; charset=utf-8')
            res.setHeader('Content-Length', Buffer.byteLength(content, 'utf-8'))
            res.setHeader('Cache-Control', 'public, max-age=0, must-revalidate')
            res.statusCode = 200
            res.end(content)
            return
          }
        }

        next()
      })
    }
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), seoHeadersPlugin()],
  server: {
    host: '0.0.0.0',
    port: 5174,
    strictPort: true,
    cors: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
      'Access-Control-Allow-Headers': '*',
      'Access-Control-Allow-Private-Network': 'true',
      'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'SAMEORIGIN'
    }
  },
  preview: {
    host: '0.0.0.0',
    port: 5174,
    cors: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Private-Network': 'true',
      'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'SAMEORIGIN'
    }
  }
})
