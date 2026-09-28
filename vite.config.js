import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Dev middleware plugin to serve public assets requested without the base path prefix
const assetFallbackPlugin = () => ({
  name: 'asset-fallback-middleware',
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      const base = '/Loki-X-TVA-multiverse/'
      if (req.url && (req.url.startsWith('/assets/') || req.url === '/favicon.svg' || req.url === '/icons.svg')) {
        req.url = base + req.url.slice(1)
      }
      next()
    })
  },
})

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), assetFallbackPlugin()],

  base: '/Loki-X-TVA-multiverse/',

  server: {
    host: true,
    port: 5173,
  },
})