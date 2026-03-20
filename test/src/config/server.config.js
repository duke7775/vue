/**
 * 服务器配置文件
 * 直接使用构建时注入的 URL 常量
 */

/**
 * 直接导出 API URL
 */
export const API_URL = __VITE_API_URL__

/**
 * 生成完整的服务器URL
 * @returns {string} 服务器URL
 */
export const getServerUrl = () => {
  console.log('API URL:', API_URL)
  return API_URL
}
