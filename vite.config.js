import { defineConfig } from 'vite'
import mkcert from 'vite-plugin-mkcert'

export default defineConfig({
  base: "/tundra/",
  plugins: [
    mkcert(),  // ← Enables HTTPS locally
  ],
})
