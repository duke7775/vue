import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
  // 加载环境变量
  const env = loadEnv(mode, process.cwd(), 'VITE_')
  
  const apiUrl = env.VITE_API_URL || 'http://127.0.0.1:8080'
  
  console.log(`Build mode: ${mode}`)
  console.log(`VITE_API_URL: ${apiUrl}`)
  
  return {
    plugins: [vue()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src')
      }
    },
    define: {
      // 使用 API URL 的 JSON 字符串，确保能被正确替换
      'globalThis.__VITE_API_URL__': JSON.stringify(apiUrl),
      '__VITE_API_URL__': JSON.stringify(apiUrl)
    }
  }
})
