<template>
    <div class="food" v-if="isShow">
      <div class="food-content">
        <div class="image-header">
          <img :src="food.image">
          <p class="foodpanel-desc">{{food.info}}</p>
          <div class="back" @click="toggleShow">
            <i class="iconfont icon-jiantou2"></i>
          </div>
        </div>
        <div class="content">
          <h1 class="title">{{food.name}}</h1>
          <div class="detail">
            <span class="sell-count">月售{{food.sellCount}}份</span>
            <span class="rating">好评率{{food.rating}}%</span>
          </div>
          <div class="price">
            <span class="now">￥{{food.price}}</span>
            <span class="old" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
          </div>
          <div class="cartcontrol-wrapper">
            <ShopCart :food="food"/>
          </div>
        </div>
      </div>
      <div class="food-cover" @click="toggleShow"></div>
    </div>
</template>

<script>
  import ShopCart from '../ShopCart/ShopCart'
    export default {
      data(){
        return{
          isShow:false
        }
      },
      methods:{
        toggleShow(){
          this.isShow = !this.isShow
        }
      },
      props:{
        food:Object
      },
      components:{
        ShopCart
      }
    }
</script>

<style lang="scss">
  .food{
    .food-content{
      background:#fff;
      position:fixed;
      top:20%;
      left:10%;
      width:80%;
      z-index:998;
      .image-header{
        position:relative;
        img{
          width:100%;
        }
        .foodpanel-desc{
          position:absolute;
          bottom:10px;
          left:10px;
          color:#fff;
          font-size:12px;
        }
        .back{
          .iconfont{
            position:absolute;
            left:5px;
            top:5px;
            z-index:999;
            color:#fff;
            font-size:24px;
          }
        }
      }
      .content{
        text-align:left;
        padding:5px 10px 20px 10px;
        box-sizing:border-box;
        font-size:13px;
        color:#888;
        .title{
          font-size:16px;
          font-weight:normal;
          color:#333;
        }
        .detail{
          margin:8px 0;
        }
        .price{
          margin-bottom:10px;
          float:left;
          .now{
            font-size:18px;
            font-weight:normal;
            color:red;
          }
          .old{
            text-decoration:line-through;
            color:#888;
            margin-left:5px;
          }
        }
        .cartcontrol-wrapper{
          float:right;
        }
      }
    }
    .food-cover{
      width:100%;
      height:100%;
      background:rgba(0,0,0,.5);
      position:fixed;
      left:0;
      top:0;
      z-index:997;
    }
  }
</style>
