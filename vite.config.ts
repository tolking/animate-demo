import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Pages from 'vite-plugin-pages'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@vueuse/core': resolve(__dirname, '../vueuse/packages/core/index.ts'),
      '@vueuse/shared': resolve(__dirname, '../vueuse/packages/shared/index.ts'),
    },
  },
  optimizeDeps: {
    exclude: ['vue-demi']
  },
  plugins: [
    vue(),
    Pages(),
  ]
})
