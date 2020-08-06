import Vue from 'vue'
import Router from 'vue-router'
const Login = () => import ('./components/Login.vue')
const Home = () => import ('./components/Home.vue')
const Welcome = () => import ('./components/Welcome.vue')
const Users = () => import ('./components/user/Users.vue')
const Orders = () => import ('./components/order/Orders.vue')
const List = () => import ('./components/goods/List.vue')
const Add = () => import ('./components/goods/Add.vue')
const Roles = () => import ('./components/power/Roles.vue')
const Rights = () => import ('./components/power/Rights.vue')
const Cate = () => import ('./components/goods/Cate.vue')
const Params = () => import ('./components/goods/Params.vue')
const Report = () => import ('./components/report/Report.vue')


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
        { path: '/orders', component: Orders },
        { path: '/goods', component: List },
        { path: '/goods/add', component: Add },
        { path: '/roles', component: Roles },
        { path: '/rights', component: Rights },
        { path: '/categories', component: Cate },
        { path: '/params', component: Params },
        { path: '/reports', component: Report }
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
