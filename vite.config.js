import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const NGROK_HOST = '71cea12633c4.ngrok-free.app'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, 
    port: 5173,
    allowedHosts: [NGROK_HOST],
    hmr: {
      protocol: 'wss', 
      host: NGROK_HOST, 
      clientPort: 443  
      // DO NOT set hmr.port here — that causes the EADDRNOTAVAIL bind error
    }
  }
})
