import Vue from 'vue'
import Router from 'vue-router'
import Login from './components/Login.vue'
import Home from './components/Home.vue'
import Welcome from './components/Welcome.vue'
import Users from './components/user/Users.vue'
<<<<<<< HEAD
import Orders from './components/order/Orders.vue'
=======
>>>>>>> 35c3fa94a250611be05ae5cead04f7b708ccec81
import List from './components/goods/List.vue'
import Add from './components/goods/Add.vue'
import Roles from './components/power/Roles.vue'
import Rights from './components/power/Rights.vue'

Vue.use(Router)

const router = new Router({
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login },
    {
      path: '/home',
      component: Home,
      redirect: '/welcome',
      children: [
        { path: '/welcome', component: Welcome },
        { path: '/users', component: Users },
<<<<<<< HEAD
        { path: '/orders', component: Orders },
=======
>>>>>>> 35c3fa94a250611be05ae5cead04f7b708ccec81
        { path: '/goods', component: List },
        { path: '/goods/add', component: Add },
        { path: '/roles', component: Roles },
        { path: '/rights', component: Rights },
      ]
    }
  ]
})

// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  // to 将要访问的路径
  // from 代表从哪个路径跳转而来
  // next 是一个函数，表示放行
  //     next()  放行    next('/login')  强制跳转

  if (to.path === '/login') return next()
  // 获取token
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')
  next()
})

export default router
