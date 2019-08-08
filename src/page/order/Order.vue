<template>
  <section class="order">
    <Header :title="title">
      <a class="header_search" slot="left" @click="$router.back(-1)">
        <i class="iconfont icon-jiantou2"></i>
      </a>
    </Header>
    <div class="order-main">
      <img src="../../assets/order.png" class="oImg">
      <p class="orderfont">暂无外卖订单记录</p>
    </div>
  </section>
</template>

<script>
  import Header from '../../components/head/Head'
  export default {
    data(){
      return{
        title:'订单'
      }
    },
    components:{
      Header
    }
  }
</script>

<style lang="scss">
.order{
  .order-main{
    margin-top:100px;
    text-align:center;
    .oImg{
      width:70%;
    }
    .orderfont{
      font-size:13px;
    }
  }
}
</style>
