<template>
  <div class="cartcontrol">
    <transition name="move">
      <div class="iconfont icon-iconfontmove" v-if="food.count" @click.stop="updateFoodCount(false)"></div>
    </transition>
    <div class="cart-count" v-if="food.count">{{food.count}}</div>
    <div class="iconfont icon-jiahao" @click.stop="updateFoodCount(true)"></div>
  </div>
</template>

<script>
    export default {
      props:{
        food:Object
      },
      methods:{
        updateFoodCount(isAdd){
          this.$store.dispatch('updateFoodCount',{isAdd,food:this.food})
        }

      }
    }
</script>

<style lang="scss">
  $border:2px solid #02a774;
  $radius:50%;
  .cartcontrol{
    display:flex;
    .iconfont{
      border:$border;
      border-radius:$radius;
      width:15px;
      height:15px;
      line-height:15px;
      text-align:center;
      font-size:12px;
      font-weight:bold;
      display:block;
      color:#02a774;
    }
    .cart-count{
      margin:0 5px;
      font-size:15px;
    }
  }
  .move-enter,.move-leave-to{
    opaction:0;
    transform:translateX(15px) rotate(180deg);
  }
  .move-enter-active, .move-leave-active{
    transition:all .3s;
  }
</style>
