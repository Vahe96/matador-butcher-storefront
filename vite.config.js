import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const pages = ['catalog', 'boxes', 'box', 'product', 'business', 'quality', 'about', 'contact']
const criticalCss = readFileSync(resolve(import.meta.dirname, 'src/critical.css'), 'utf8')

function optimizeCssForFirstPaint() {
  let resolvedBase = '/'
  return {
    name: 'matador-critical-css',
    apply: 'build',
    enforce: 'post',
    configResolved(config) {
      resolvedBase = config.base
    },
    generateBundle(_, bundle) {
      const cssAssets = Object.entries(bundle).filter(([fileName, asset]) => asset.type === 'asset' && fileName.endsWith('.css'))
      if (cssAssets.length !== 1) return

      const [cssFileName] = cssAssets[0]
      const escapedName = cssFileName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
      const stylesheetPattern = new RegExp(`<link rel="stylesheet"[^>]*href="([^"]*${escapedName})"[^>]*>`)
      const scopedCriticalCss = criticalCss.replace(/url\("\//g, `url("${resolvedBase}`)

      Object.values(bundle).forEach(asset => {
        if (asset.type !== 'asset' || !asset.fileName.endsWith('.html')) return
        const source = String(asset.source)
        const optimizedStyles = source.replace(stylesheetPattern, (_, href) =>
          `<style>${scopedCriticalCss}</style><link rel="preload" href="${href}" as="style" onload="this.onload=null;this.rel='stylesheet'"><noscript><link rel="stylesheet" href="${href}"></noscript>`
        )
        asset.source = optimizedStyles
      })
    },
  }
}

export default defineConfig({
  base: process.env.GITHUB_ACTIONS ? '/matador-butcher-storefront/' : '/',
  plugins: [react(), optimizeCssForFirstPaint()],
  resolve: {
    alias: {
      react: 'preact/compat',
      'react-dom/test-utils': 'preact/test-utils',
      'react-dom/client': 'preact/compat',
      'react-dom': 'preact/compat',
    },
  },
  build: {
    rollupOptions: {
      input: {
        home: resolve(import.meta.dirname, 'index.html'),
        ...Object.fromEntries(pages.map(page => [page, resolve(import.meta.dirname, `${page}/index.html`)])),
      },
    },
  },
})
