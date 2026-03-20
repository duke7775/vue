import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import { getServerUrl } from './config/server.config.js'

// 调试输出
const apiUrl = getServerUrl()
console.log('===== 应用启动 =====')
console.log('API URL:', apiUrl)
console.log('==================')

const app = createApp(App)
app.use(router)
app.mount('#app')
