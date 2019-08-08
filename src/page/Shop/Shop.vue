<template>
  <div>
    <ShopHeader/>
    <div class="tab">
      <div class="tab-item ">
        <router-link to="/shop/Goods" replace>点餐</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/shop/Rating" replace>评价</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/shop/Info" replace >商家</router-link>
      </div>
    </div>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
    import ShopHeader from '../../components/ShopHeader/ShopHeader'
    import Goods from '../../components/Goods/Goods'
    import Rating from '../../components/Rating/Rating'
    import Info from '../../components/Info/Info'
    export default {
      components:{
        ShopHeader,
        Goods,
        Rating,
        Info
      }
    }
</script>

<style lang="scss">
  .tab{
    height:40px;
    line-height:40px;
    background:#fff;
    /*border-bottom:1px solid rgba(7,17,27,.1);*/
    z-index:39;
    .tab-item{
      float:left;
      width:33.33%;
      text-align:center;
      font-size:14px;
      color:rgb(77,85,93);
      a{
        display:block;
        position:relative;
        color:#555;
        &.router-link-active{
          color:#02a774;
          &::after{
            content:'';
            position:absolute;
            left:50%;
            bottom:1px;
            width:35px;
            height:2px;
            transform:translateX(-50%);
            background:#02a774;
          }
        }
      }
    }
  }

</style>
