<template>
  <div class="mint-tabbar is-fixed">
    <router-link to="/msite" class="mint-tab-item" :class="{linkClass:'/msite'===$route.path}">
      <div class="mint-tab-item-icon"><i class="iconfont icon-pro-home"></i></div>
      <div class="mint-tab-item-label">首页</div>
    </router-link>
    <router-link to="/search" class="mint-tab-item"  :class="{linkClass:'/search'===$route.path}">
      <div class="mint-tab-item-icon"><i class="iconfont icon-pro-search"></i></div>
      <div class="mint-tab-item-label">搜索</div>
    </router-link>
    <router-link to="/order" class="mint-tab-item" :class="{linkClass:'/order'===$route.path}">
      <div class="mint-tab-item-icon"><i class="iconfont icon-pro-catalog"></i></div>
      <div class="mint-tab-item-label">订单</div>
    </router-link>
    <router-link to="/profile" class="mint-tab-item" :class="{linkClass:'/profile'===$route.path}">
      <div class="mint-tab-item-icon"><i class="iconfont icon-pro-user-manage"></i></div>
      <div class="mint-tab-item-label">我的</div>
    </router-link>
  </div>
</template>

<script>
    export default {

    }
</script>

<style>
  .mint-tab-item{font-size:14px;color:#666;}
  .mint-tab-item-icon i{font-size:24px;}
  .linkClass{color:#3190e8}
</style>
