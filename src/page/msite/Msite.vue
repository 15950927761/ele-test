<template>
  <section class="msite">
    <Header :title="title">
      <router-link to="/search" class="header_search" slot="left">
        <i class="iconfont icon-pro-search"></i>
      </router-link>
      <span class="header_login" slot="right">
        <router-link to="/login" class="header_login_text">登录 | 注册</router-link>
      </span>
    </Header>

    <section class="msite-nav" style="height:180px;">
      <mt-swipe :auto="4000" :show-indicators="false">
        <mt-swipe-item v-for="(categorys, index) in categorysArr" :key="index" class="swiper-item-block" >
          <router-link :to="'/goodlist/gooditem/'+category.id" v-for="(category,index) in categorys" :key="index">
            <div class="food_container">
              <img :src="category.shopImg">
              <p>{{category.shopname}}</p>
            </div>
          </router-link>
          <div style="clear:both"></div>
        </mt-swipe-item>
      </mt-swipe>
    </section>
    <div class="shop_container">
      <div class="shop_header">
        <i class="iconfont icon-icon--"></i>
        <span>商铺列表</span>
      </div>
      <ShopList/>
    </div>
  </section>
</template>

<script>
  import Header from '../../components/head/Head'
  import ShopList from '../../components/ShopList/ShopList'
  import { Swipe, SwipeItem } from 'mint-ui';
  import {mapState,mapActions} from 'vuex'
  export default {
    data() {
      return {
        title: '首页'
      }
    },
    methods:{
      ...mapActions(['getCategorys']),
    },
    mounted(){
      this.getCategorys()
    },
    computed:{
      ...mapState(['categorys']),
      // 根据categroys一维数组生成二维数组
      categorysArr(){
        const {categorys} = this
        //准务空的2维数组
        const arr = []
        let minArr = []
        categorys.forEach(c=>{
          if(minArr.length === 8){
            minArr = []
          }
          if(minArr.length === 0){
            arr.push(minArr)
          }
          minArr.push(c)
        })
        return arr
      }
    },

    components:{
      Header,
      ShopList
    }
  }

</script>

<style scoped>
.header_search{float:left;color:#fff;text-decoration:none;}
.header_search .iconfont{font-size:24px;}
.header_login{float:right;font-size:14px;}
.header_login_text{color:#fff;text-decoration:none;}
.msite{padding-top:60px;}
.msite-nav{margin-top:-10px;}
.swiper-item-block{display:flex;justify-content: flex-start; flex-wrap:wrap;}
.swiper-item-block a{display:block;width:25%;font-size:13px;text-decoration:none;color:#555;margin:4px 0;float:left;}
.food_container{width:100%;}
.food_container img{width:60%;}

/*商家列表*/
.shop_container{padding-bottom:50px;width:96%;margin:0 auto;text-align:left;}
.shop_header{border-bottom:1px solid #eee;padding-bottom:2px;margin-top:10px;display:flex;align-items: center;}
.shop_header .iconfont{font-size:17px;color:#888;}
.shop_header span{font-size:14px;color:#888;}

</style>
