import { defineConfig } from 'vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath } from 'node:url'

export default defineConfig({
  server: { port: 3000 },
  resolve: {
    alias: {
      '~': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  plugins: [
    // Tailwind CSS v4 (tanpa file tailwind.config)
    tailwindcss(),
    // TanStack Start harus sebelum plugin React.
    // target 'cloudflare-pages' membuat Nitro membangun output untuk
    // Cloudflare Pages (menghasilkan ./.output/public dengan _worker.js).
    tanstackStart({ target: 'cloudflare-pages' }),
    viteReact(),
  ],
})
