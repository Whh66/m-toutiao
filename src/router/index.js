import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
  path: '/login',
  name: 'login',
  component: () =>
    import('@/views/login')
},
{
  path: '/',
  // name: 'layout',////如果父路由有默认子路由，那它的name没有意义
  component: () =>
    import('@/views/layout'),
  children: [{
    path: '', // 默认子路由，只能有1个
    name: 'home',
    component: () =>
      import('@/views/home')
  },
  {
    path: '/qa', // 默认子路由，只能有1个
    name: 'qa',
    component: () =>
      import('@/views/qa')
  },
  {
    path: '/video', // 默认子路由，只能有1个
    name: 'video',
    component: () =>
      import('@/views/video')
  },
  {
    path: '/my', // 默认子路由，只能有1个
    name: 'my',
    component: () =>
      import('@/views/my')
  }
  ]
},
{
  path: '/search',
  name: 'search',
  component: () =>
    import('@/views/search')
},
{
  path: '/article/:articleId',
  name: 'article',
  component: () =>
    import('@/views/article'),
  props: true // 开启路由传参，将路由动态参数映射到组件的 props 中，更推荐这种做法
},
{
  path: '/user/profile',
  name: 'user-profile',
  component: () =>
    import('@/views/user-profile')
}
]

const router = new VueRouter({
  routes
})

export default router
