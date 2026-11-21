import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// base musi się zgadzać z nazwą repo na GitHub Pages (https://<user>.github.io/literki/).
export default defineConfig({
  base: '/literki/',
  plugins: [react(), tailwindcss()],
  test: {
    environment: 'jsdom',
    globals: false,
  },
})
