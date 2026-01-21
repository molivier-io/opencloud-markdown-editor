import { defineConfig } from '@opencloud-eu/extension-sdk'
import Icons from 'unplugin-icons/vite'

export default defineConfig({
  name: 'markdown-editor',
  plugins: [Icons({ compiler: 'vue3' })],
  build: {
    rollupOptions: {
      // fix for windows path slashes
      output: {
        entryFileNames: 'js/[name]-[hash].js'
      }
    }
  }
})
