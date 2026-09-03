import { defineConfig } from 'vite'
import mkcert from 'vite-plugin-mkcert'
import { resolve } from 'path'

export default defineConfig({
  base: "/tundra/",
  plugins: [
    mkcert(),  // ← Enables HTTPS locally
  ],
  input: {
    main: resolve(import.meta.dirname, 'index.html'),
    homepage: resolve(import.meta.dirname, 'homepage.html')
  }
})
