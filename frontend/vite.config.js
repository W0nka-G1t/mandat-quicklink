import { defineConfig } from 'vite'

export default defineConfig({
    server: {
      allowedHosts: ["section.click"],
      host: true,
      port: 5173,
      proxy: {
        '/api': {
          target: 'http://localhost:3000',
          changeOrigin: true,
          secure: false,
        }
      }
    }
  })
