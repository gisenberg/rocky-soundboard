import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

const THEME = '#0b1020'

export default defineConfig({
  base: '/rocky-soundboard/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      // Registration happens in src/offline.ts so the UI can report offline readiness.
      injectRegister: false,
      // The workbox glob below already precaches the icons.
      includeManifestIcons: false,
      manifest: {
        name: 'Rocky Soundboard',
        short_name: 'Rocky',
        description: 'Tap to hear Rocky from Project Hail Mary. Works offline.',
        display: 'standalone',
        orientation: 'any',
        background_color: THEME,
        theme_color: THEME,
        icons: [
          { src: 'pwa-64x64.png', sizes: '64x64', type: 'image/png' },
          { src: 'pwa-192x192.png', sizes: '192x192', type: 'image/png' },
          { src: 'pwa-512x512.png', sizes: '512x512', type: 'image/png' },
          { src: 'maskable-icon-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        // Precache the whole app, including every clip, on first visit so it works fully offline.
        globPatterns: ['**/*.{html,js,css,woff2,svg,png,ico,mp3}'],
        cleanupOutdatedCaches: true,
        // Take control of the open page immediately so a first-time visitor is offline-ready
        // without reloading. (The plugin only defaults these when it injects registration itself.)
        skipWaiting: true,
        clientsClaim: true,
        navigateFallback: 'index.html',
      },
    }),
  ],
})
