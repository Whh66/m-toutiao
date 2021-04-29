import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 加载vant
import Vant from 'vant'
import 'vant/lib/index.css'

// 加载全局样式文件
import './styles/index.less'

// 加载动态设置 REM 基准值
import 'amfe-flexible'

// 加载dayjs初始化配置
import '@/utils/dayjs.js'

// 注册使用vant
Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
