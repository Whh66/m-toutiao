import Vue from 'vue'
import dayjs from 'dayjs'

// 加载中文语言包
import 'dayjs/locale/zh-cn'

import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.locale('zh-cn')

// 配置使用处理相对时间的插件
dayjs.extend(relativeTime)

// dayjs()获取当前最新时间
// console.log(dayjs.format('YYYY-MM-DD'))

// console.log(dayjs().to(dayjs('1990-01-01')))

// 全局过滤器。处理相对时间
Vue.filter('relativeTime', value => {
  return dayjs().to(dayjs(value))
})
