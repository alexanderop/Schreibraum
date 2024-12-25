import { fileURLToPath, URL } from 'node:url'
import vue from '@vitejs/plugin-vue'
import VueRouter from 'unplugin-vue-router/vite'
import { defineConfig } from 'vite'

export default defineConfig(({ command }) => ({
  plugins: [
    VueRouter({
      /* options */
    }),
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  base: command === 'build' ? '/Schreibraum/' : '/',
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    include: ['src/**/*.{test,spec}.{js,ts,jsx,tsx}'],
    globals: true,
  },
}))
