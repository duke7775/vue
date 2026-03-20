/**
 * Axios请求实例
 * 统一处理API请求，使用配置文件中的服务器地址
 */

import axios from 'axios'

// 获取 API地址 - 在构建时被替换为实际的 URL 字符串
const API_URL = __VITE_API_URL__

console.log('API URL:', API_URL)

// 创建axios实例
const request = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    // 可以在这里添加token或其他请求头
    console.log(`完整请求URL: ${API_URL}${config.url}`)
    return config
  },
  (error) => {
    console.error('请求错误:', error)
    return Promise.reject(error)
  }
)

// 响应拦截器
request.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    console.error('响应错误:', error)
    return Promise.reject(error)
  }
)

export default request
