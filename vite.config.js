import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  base: '/Loki-X-TVA-multiverse/',

  server: {
    host: true,
    port: 5173,
  },
})