<template>
  <div>
    <ul class="shop_list">
      <li class="shop_li" v-for="(shop,index) in filterShops">
        <router-link to="/shop" class="shop_flex">
          <div class="shop_left">
            <img :src="shop.image_path" class="shop_img">
<!--            <img v-lazy="shop.image_path" class="shop_img">-->
          </div>
          <div class="shop_right">
            <section class="shop_detail_header">
              <span>品牌</span>
              <h2>{{shop.name}}</h2>
            </section>
            <section class="shop_star">
              <Star :score="shop.rating"/>
              <div>月售{{shop.rating_count}}单</div>
            </section>
            <section class="shop-bottom">
              ￥{{shop.float_minimum_order_amount}}起送/配送费约{{shop.float_delivery_fee}}元
            </section>
          </div>
          <div class="shop-ps">
            <div class="shop_icon">
              <span v-for="support in shop.supports">{{support.icon_name}}</span>
            </div>
            <div class="shop_icon2"><span>{{shop.delivery_mode.text}}</span></div>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
    import {mapActions,mapState} from 'vuex'
    import Star from '../Star/Star'
    export default {
      props:{
        searchInput:String
      },
      methods:{
        ...mapActions(['getShops'])
      },
      mounted(){
        this.getShops()
      },
      computed:{
        ...mapState(['shops']),
        filterShops(){
          const {shops,searchInput} = this
          if(!searchInput){
            return shops
          }
          return shops.filter(item=>item.name.indexOf(searchInput)!=-1)
        }
      },
      components:{
        Star
      }
    }
</script>

<style>
  .shop_list{list-style:none;margin:0; padding:0;text-align:left;width:96%;margin:0 auto;}
  .shop_li{font-size:12px;color:#666;padding:15px 0;border-bottom:1px solid #f5f5f5;}
  .shop_flex{display:flex;color:#555;justify-content: space-between}
  .shop_detail_header span{background:#ffd930;display:inline-block; height:18px;line-height:18px;padding:0 5px;}
  .shop_detail_header h2{font-size:14px;margin-left:5px;}
  .shop_left{width:20%;}
  .shop_right{width:60%;margin-left:3%;}
  .shop-ps{width:20%;}
  .shop_img{width:100%;}
  .shop_detail_header{display:flex;}
  .shop_star{margin:4px 0;display:flex;}
  .shop_icon span{display:inline-block; border:1px solid #eee;padding:0 3px;margin:0 1px;}
  .shop_icon2{margin-top:10px;text-align:center;}
  .shop_icon2 span{background:#3190e8;color:#fff;font-size:12px;border-radius:3px;padding:3px 3px;}
</style>
