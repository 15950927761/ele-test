<template>
    <div class="ratings" ref="ratings">
      <div class="ratings-content">
        <div class="overview">
          <div class="overview-left">
            <h1 class="score">{{info.score}}</h1>
            <div class="title">综合评分</div>
            <div class="rank">高于周边商家99%</div>
          </div>
          <div class="overview-right">
            <div class="score-wrapper">
              <span class="title">服务态度</span>
              <Star :score="info.serviceScore"/>
              <span class="score">{{info.serviceScore}}</span>
            </div>
            <div class="score-wrapper">
              <span class="title">商品评分</span>
              <Star :score="info.score"/>
              <span class="score">{{info.foodScore}}</span>
            </div>
            <div class="delivery-wrapper">
              <span class="title">送达时间</span>
              <span class="delivery">{{info.deliveryTime}}分钟上</span>
            </div>
          </div>
        </div>

        <div class="split"></div>

        <div class="ratingselect">
          <div class="rating-type">
            <span class="block positive" :class="{active:selectType===2}" @click="setSelectType(2)">
              全部 <span class="count">{{ratings.length}}</span>
            </span>
            <span class="block positive" :class="{active:selectType===0}"  @click="setSelectType(0)">
              满意 <span class="count">{{positiveSize}}</span>
            </span>
            <span class="block negative" :class="{active:selectType===1}" @click="setSelectType(1)">
              不满意 <span class="count">{{ratings.length - positiveSize}}</span>
            </span>
          </div>
          <div class="switch" :class="{on:onlyShowText}" @click="toggleOnlyShowText">
            <span class="iconfont icon-xuanze"></span>
            <span class="text">只看有内容的评价</span>
          </div>
        </div>

        <div class="rating-wrapper">
          <ul>
            <li class="rating-item" v-for="(rating,index) in filterRatings">
              <div class="avatar">
                <img :src="rating.avatar">
              </div>
              <div class="content">
                <h1 class="name">{{rating.username}}</h1>
                <div class="date">{{rating.rateTime|date-format}}</div>
                <div class="star-wrapper">
                  <Star :score="rating.score"/>
<!--                  <span class="delivery">{{rating.deliveryTime}}</span>-->
                </div>
                <div class="decoration">
                  {{rating.text}}
                </div>
                <div class="decoration-list">
                  <ul>
                    <li v-for="(item,index) in rating.recommend" :key="index">{{item}}</li>
                  </ul>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import {mapState,mapActions,mapGetters} from 'vuex'
  import Star from '../Star/Star'
    export default {
      data(){
        return {
          onlyShowText:false,
          selectType:2//2代表全部，1不代表不满意，0代表满意
        }
      },
      methods:{
        _initScroll(){
          new BScroll('.ratings',{
            click:true
          })
        },
        setSelectType(selectType){
          this.selectType = selectType
        },
        toggleOnlyShowText(){
          this.onlyShowText = !this.onlyShowText
        }
      },
      mounted() {
        this.$store.dispatch('getRating',()=>{
          this.$nextTick(()=>{
            this._initScroll()
          })
        })
      },
      computed:{
        ...mapState(['info','ratings']),
        ...mapGetters(['positiveSize']),
        filterRatings(){
          const {ratings,onlyShowText,selectType} = this
          return ratings.filter(rating=>{
            const {rateType,text} = rating
            return (selectType===2 || selectType===rateType) && (!onlyShowText || text.length>0)
          })

        }
      },
      components:{
        Star
      }
    }
</script>

<style lang="scss">
.ratings{
  position:absolute;
  top:205px;
  bottom:0;
  left:0;
  width:100%;
  overflow:hidden;
  .ratings-content{
    .overview{
      display:flex;
      justify-content: space-between;
      font-size:13px;
      border-top:1px solid #ddd;
      border-bottom:1px solid #ddd;
      padding:10px 0;
      .overview-left{
        width:40%;
        padding-right:10px;
        box-sizing: border-box;
        border-right:1px solid #ddd;
        .score{font-size:24px;font-weight:bold;color:#02a774;}
        .title{margin:5px 0;font-size:14px;}
        .rank{font-size:13px; color:#888;}
      }
      .overview-right{
        width:60%;
        padding-left:10px;
        box-sizing:border-box;
        text-align:left;
        line-height:24px;
        font-size:13px;
        .score-wrapper{
          display:flex;
          .title{color:#333;}
          .score{color:#02a774;}
          .delivery{color:#888;}
        }
      }
    }
    .split{background:#f5f5f5;height:20px;line-height:20px;}
    .ratingselect{
      padding:10px 10px 0 10px;
      border-top:1px solid #ddd;
      font-size:14px;
      .rating-type{
        display:flex;
        justify-content: flex-start;
        .block{
          display:block;
          padding:3px 8px;
          margin-right:8px;
          background:#eee;
        }
        .active{
          background:#02a774;
          color:#fff;
        }
      }
      .switch{
        text-align:left;
        margin:15px 0;
        color:#555;
        display:flex;
        align-items: center;
        &.on{
          color:#02a774;
        }
        .iconfont{
          width:20px;
          height:20px;
          font-size:18px;
          display:inline-block;
          margin-right:5px;
        }
        .text{
          color:#555;
        }
      }

    }
    .rating-wrapper{
      padding:0 10px;
      .rating-item{
        display:flex;
        justify-content: space-between;
        border-bottom:1px solid #ddd;
        padding:10px 0;
        .avatar{
          width:10%;
          img{
            width:100%;
            border-radius:50%;
          }
        }
        .content{
          width:85%;
          text-align:left;
          position:relative;
          .name{
            font-size:14px;
            color:#555;
          }
          .date{
            position:absolute;
            right:0;
            top:0;
            font-size:14px;
            color:#888;
          }
          .star-wrapper{
            font-size:14px;
            margin:5px 0;
            .delivery{
              color:#333;
              font-size:13px;
            }
          }
          .decoration{
            font-size:14px;
            line-height:18px;
          }
          .decoration-list{
            font-size:14px;
            color:#888;
            margin:8px 0;
            ul{
              display:flex;
              flex-wrap:wrap;
              li{
                border:1px solid #ddd;
                margin-right:10px;
                padding:2px 5px;
                font-size:12px;
                margin-bottom:5px;
              }
            }
          }
        }
      }
    }
  }
}
</style>
