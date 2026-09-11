import { defineConfig } from 'vite'

export default defineConfig({
  server: { watch: { ignored: ['**/.capture/**', '**/dist/**', '**/node_modules/**'] } },
})
