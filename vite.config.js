import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // Prod path / Dev path
  base: process.env.NODE_ENV === "production" ? "/Simple-Todo-List/" : "/",
  plugins: [react()],
})
