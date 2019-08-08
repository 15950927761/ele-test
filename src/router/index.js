import Vue from 'vue'
import Router from 'vue-router'

import Msite from '../page/msite/Msite'
import Search from '../page/search/Search'

// 路由组件懒加载
// const Msite = ()=>import('../page/msite/Msite')
// const Search = ()=>import('../page/search/Search')

import Order from '../page/order/Order'
import Profile from '../page/profile/Profile'
import Shop from '../page/Shop/Shop'
import Goods from '../components/Goods/Goods'
import Info from '../components/Info/Info'
import Rating from '../components/Rating/Rating'
import Login from '../page/Login/Login'
import GoodList from '../components/GoodList/GoodList'
import GoodItem from '../components/GoodItem/GoodItem'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/msite',
      component: Msite,//返回路由组件的函数，只有执行此函数 才会加载路由组件
      meta:{
        showFooter:true
      }
    },
    {
      path:'/search',
      component:Search,
      meta:{
        showFooter:true
      }
    },
    {
      path:'/order',
      component:Order,
      meta:{
        showFooter:true
      }
    },
    {
      path:'/profile',
      component:Profile,
      meta:{
        showFooter:true
      }
    },
    {
      path:'/shop',
      component:Shop,
      children:[
        {
          path:'Goods',
          component:Goods
        },
        {
          path:'Info',
          component:Info
        },
        {
          path:'Rating',
          component:Rating
        },
        {
          path:'',
          redirect: 'Goods'
        }
      ]
    },
    {
      path:'/login',
      component:Login
    },
    {
      path:'/',
      redirect:'/msite'
    },
    {
      path:'/goodlist',
      component:GoodList,
      children:[
        {
          path:'gooditem/:id',
          component:GoodItem,
          meta:{
            showFooter:true
          },
        },
        {
          path:'',
          redirect:'gooditem/:id'
        },
      ]
    },
  ]
})
