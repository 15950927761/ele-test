// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './Store'

//引入swiper
// import VueAwesomeSwiper from 'vue-awesome-swiper'
// import 'swiper/dist/css/swiper.css'
// // Vue.use(vuePicturePreview)
// Vue.use(VueAwesomeSwiper, /* { default global options } */)

//引入mint-ui
import '../node_modules/mint-ui/lib/style.css'
import Mint from 'mint-ui'
Vue.use(Mint)

//加载过滤器
import './filters'

//懒加载
// import loading from './ common/img/loading.gif'
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload,{
  loading:'./common/img/loading.gif'
})

// 路由
import router from './router'

// 引入mock模拟数据
import './mock/mockServer'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render:h=>h(App),
  router,
  store
})
