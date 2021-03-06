import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
// 导入字体图标
import './assets/fonts/iconfont.css' 
// 导入全局样式表
import './assets/css/global.css'
import TreeTable from 'vue-table-with-tree-grid'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import axios from 'axios'
// 配置请求的跟路径
axios.defaults.baseURL = "http://193.112.208.128:8888/api/private/v1/"
axios.interceptors.request.use(config => {
  NProgress.start();
  // console.log(config)
  config.headers.Authorization = window.sessionStorage.getItem('token')
  // 在最后必须 return config
  return config
})
// 挂载axios到vue原型上
axios.interceptors.response.use( res => {
  NProgress.done();
  return res
})
Vue.prototype.$http = axios
// 阻止启动生产消息
Vue.config.productionTip = false

Vue.component('tree-table', TreeTable)
// 过滤器
Vue.filter('dateFormat', function (originVal) {
  const dt = new Date(originVal)

// padStart: 用于头部补全 第一个参数为字符串最小长度， 第二位参数为用来补全的字符串
// 如果省去第二个参数, 默认用空格补全
// 源字符串长度大于或等于最小长度, 直接返回字符串
// padEnd: 用于尾部补全
  const y = dt.getFullYear()
  const m = (dt.getMonth() + 1 + '').padStart(2, '0')
  const d = (dt.getDate() + '').padStart(2, '0')
 
  const hh = (dt.getHours() + '').padStart(2, '0')
  const mm = (dt.getMinutes() + '').padStart(2, '0')
  const ss = (dt.getSeconds() + '').padStart(2, '0')

  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
