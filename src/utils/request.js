import axios from 'axios'
import store from '@/store'
import jsonBig from 'json-bigint'

// 举例子
// var jsonStr = '{ "value" : 9223372036854775807, "v2": 123 }'
// console.log(JSON.parse(jsonStr)) // {value: 9223372036854776000, v2: 123}
// console.log(jsonBig.parse(jsonStr)) //
// console.log(jsonBig.parse(jsonStr).value.toString()) // 9223372036854775807

const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/',
  // baseURL: 'http://toutiao-app.itheima.net/'
  // 自定义后端返回的原始数据
  transformResponse: [
    function (data) {
      // Do whatever you want to transform the data
      try {
        return jsonBig.parse(data)
      } catch (err) {
        return data
      }
    }
  ]
})

// 请求拦截器
request.interceptors.request.use(
  function (config) {
    const { user } = store.state
    if (user && user.token) {
      config.headers.Authorization = `Bearer ${user.token}`
    }
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)
export default request
