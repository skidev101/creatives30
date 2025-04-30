import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  
  plugins: [react(),
    
    tailwindcss(),


  ],
  server: {
    host: true, // This allows external devices to access the dev server
    port: 5173, // Or any port you prefer
  },
})
