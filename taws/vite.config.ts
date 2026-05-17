import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    proxy: {
      // Catch anything starting with /v1
      '/v1': {
        // ONLY put the base URL here. Do not include /v1 or /chat at the end!
        target: 'https://x12ljhcpxf.execute-api.us-east-1.amazonaws.com',
        changeOrigin: true,
        secure: true,
      }
    }
  }
})