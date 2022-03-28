

function moduleConfig() {
  const env = process.env.NODE_ENV === 'development' ? 'dev' : 'prod';
  const api = {
    'dev': 'http://localhost:3000/api'
  }
  return {
    env,
    /** 请求超时毫秒 */
    get requestOvertime() {
      return 80000;
    },

    /**请求地址 */
    get apiUrl() {
      return api[env]
    }
  }
}
/** 配置模块 */
const config = moduleConfig();
export default config;