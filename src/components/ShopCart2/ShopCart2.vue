<template>
    <div class="shopcart">
      <div class="content">
        <div class="content-left" @click="toggleShow">
          <div class="logo-wrapper">
            <div class="logo" :class="{highlight:totalCount}">
              <i class="iconfont icon-tubiaozhizuomoban" :class="{highlight:totalCount}"></i>
            </div>
            <div class="num" v-if="totalCount">{{totalCount}}</div>
          </div>
          <div class="price" :class="{highlight:totalCount}">￥{{totalPrice}}</div>
          <div class="desc">另需配送费￥{{info.deliveryPrice}}元</div>
        </div>
        <div class="content-right">
          <div class="pay" :class="payClass">
            {{payText}}
          </div>
        </div>
      </div>
      <transition name="move">
        <div class="shopcart-list"  v-show="listShow">
          <div class="list-header">
            <h1 class="title">购物车</h1>
            <span class="empty" @click="clearCart">清空</span>
          </div>
          <div class="list-content">
            <ul>
              <li class="food" v-for="(food,index) in cartFoods">
                <span class="name">{{food.name}}</span>
                <div class="cartcontrol-wrapper">
                  <div class="price"><span>￥{{food.price}}</span></div>
                  <ShopCart :food="food"/>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </transition>
      <div class="list-mark" v-show="listShow" @click="toggleShow"></div>
    </div>
</template>

<script>
    import {mapState,mapGetters} from 'vuex'
    import {MessageBox} from 'mint-ui'
    import BScroll from 'better-scroll'
    import ShopCart from '../ShopCart/ShopCart'
    export default {
      data(){
        return {
          isShow:false
        }
      },
      methods:{
        toggleShow(){
          if(this.totalCount >0){//当总数量 大于0时才进行切换
            this.isShow = !this.isShow
          }
        },
        clearCart(){
         MessageBox.confirm('确定清除购物车吗？').then(action=>{
            this.$store.dispatch('clearCart')
         },()=>{})
        }
      },
      computed:{
        ...mapState(['cartFoods','info']),
        ...mapGetters(['totalCount','totalPrice']),

        payClass(){
          const {totalPrice} = this
          const {minPrice} = this.info
          return totalPrice>=minPrice ?'enough':''
        },

        payText(){
          const {totalPrice} = this
          const {minPrice} = this.info
          if(totalPrice ===0){
            return `￥${minPrice}元起送`
          } else if(totalPrice < minPrice){
            return `还差${minPrice-totalPrice}元起送`
          }else{
            return '结算'
          }
        },

        listShow(){
           //如果总数量 为0,直接不显示
          if(this.totalCount === 0){
            this.isShow = false
            return false
          }

          if(this.isShow){
            this.$nextTick(()=>{
              //实现BScroll的实例是一个单例
              if(!this.scroll){
                this.scroll = new BScroll('.list-content',{
                  click:true
                })
              }else{
                this.scroll.refresh()//让滚动条 刷新 一下，重新统计内容的高度
              }

            })
          }

          return this.isShow
        }
      },
      components:{
        ShopCart
      }
    }
</script>

<style lang="scss">
  .shopcart{
    position:fixed;
    left:0;
    bottom:0;
    z-index:998;
    width:100%;
    height:48px;
    .content{
      display:flex;
      background:#141d27;
      width:100%;
      height:100%;
      justify-content: space-between;
      color:rgba(255,255,255,.4);
      position:relative;
      z-index:998;
      .content-left{
        position:relative;
        .logo-wrapper{
          background:#f00;
          width:55px;
          height:55px;
          position:absolute;
          left:10px;
          bottom:0;
          background:#141d27;
          border-radius:50%;
          padding:5px;
          .logo{
            background:#404a47;
            color:#fff;
            border-radius:50%;
            width:55px;
            height:55px;
            &.highlight{
              background:#02a774;
            }
            .iconfont{
              font-size:40px;
              width:40px;
              height:40px;
              position:relative;
              top:5px;
            }
          }

          .num{
            position:absolute;
            left:45px;
            top:5px;
            display:block;
            width:20px;
            height:20px;
            line-height:20px;
            text-align:center;
            background:red;
            border-radius:50%;
            color:#fff;
            font-size:12px;
            font-weight:bold;
          }
        }
        .price{margin-left:80px;text-align:left;color:#fff;font-size:13px;padding-top:5px;}
        .desc{margin-left:80px;text-align:left;color:#fff;font-size:13px;}
      }
      .content-right{
        background:#3d4b5a;
        display:block;
        line-height:50px;
        color:#fff;
        font-size:14px;
        .pay{
          padding:0 15px;
          &.enough{
            background:#02a774;
          }
        }

      }
    }
    .shopcart-list{
      position:absolute;
      left:0;
      top:0;
      z-index:99;
      width:100%;
      background:#fff;
      transform:translateY(-100%);
      &.move-enter-active,&.move-leave-active{
        transition:transform .3s
      }
      &.move-enter,&.move-leave-to{
        transform:translateY(0);
      }
      .list-header{
        height:30px;
        line-height:30px;
        background-color:#eee;
        font-size:14px;
        display:flex;
        justify-content: space-between;
        padding:0 10px;
        .title{
          font-size:14px;
          font-weight:normal;
        }
        .empty{}
      }
      .list-content{
        padding-bottom:10px;
        height:100px;
        overflow:hidden;
        ul{
          .food{
            display:flex;
            justify-content: space-between;
            padding:10px;
            font-size:13px;
            .name{}
            .cartcontrol-wrapper{
              display:flex;
              .price{margin-right:20px;}
              .cartcontrol{
                .iconfont{}
                .cart-count{}
              }
            }
          }
        }
      }
    }
    .list-mark{
      position:fixed;
      left:0;
      top:0;
      width:100%;
      height:100%;
      background:rgba(0,0,0,.5);
      z-index:98;
    }
  }
</style>
