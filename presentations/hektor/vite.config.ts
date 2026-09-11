import { defineConfig } from 'vite'

/**
 * Slidev already provides its own Vite configuration; this file only adds the
 * watcher excludes. Export runs a real dev server, and its file watcher aborts
 * the whole export with EBUSY when it walks a live Chromium profile directory,
 * so every scratch directory this project can create is excluded.
 */
export default defineConfig({
  server: {
    watch: {
      ignored: [
        '**/.chrome-profile/**',
        '**/.chrome-profile2/**',
        '**/.chrome-verify/**',
        '**/.npm-cache/**',
        '**/.npm-logs/**',
        '**/dist/**',
        '**/.verify-shots/**',
      ],
    },
  },
})
