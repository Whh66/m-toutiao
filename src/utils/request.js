import axios from 'axios'
import store from '@/store'
const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/'
  // baseURL: 'http://toutiao-app.itheima.net/'
})

// 请求拦截器
request.interceptors.request.use(
  function (config) {
    const user = store.state.user
    config.headers.Authorization = `Bearer ${user.token}`
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)
export default request