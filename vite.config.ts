import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from "path"

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src') // 兼容src目录下的文件夹可通过 @/components/HelloWorld.vue写法
    }
  },
  server: {
    port: 3000,
    open: true
  },
  css:{
    preprocessorOptions: {
      scss: {
        //  additionalData: `@import "${resolve(__dirname, 'src/style/base.scss')}";`, // 使用绝对路径
         // 使用 @use 替代 @import
        additionalData: `@use "${resolve(__dirname, 'src/style/base.scss')}" as *;`,
         charset:false
      }
   }
  }
})
