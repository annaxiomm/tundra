import { defineConfig } from 'vite'
import mkcert from 'vite-plugin-mkcert'
import { resolve } from 'path'

export default defineConfig({
  base: "/tundra/",
  plugins: [
    mkcert(),  // ← Enables HTTPS locally
  ],
})
