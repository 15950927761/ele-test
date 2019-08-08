<template>
    <div class="shop-info">
      <div class="info-content">
        <section class="section">
          <h3 class="section-title">配送信息</h3>
          <div class="delivery">
            <div>
              <span class="delivery-icon">{{info.description}}</span>
              <span>由商家配送提供配送，约{{info.deliveryTime}}分钟送达，距离{{info.distance}}</span>
            </div>
            <div class="delivery-money">配送费约￥{{info.deliveryPrice}}</div>
          </div>
        </section>

        <div class="split"></div>

        <section class="section">
          <h3 class="section-title">活动与服务</h3>
          <div class="activity">
            <div class="activity-item" v-for="(support,index) in info.supports" :key="index" :class="{'activity-green':support.type===0,'activity-red':support.type===1,'activity-orange':support.type===2}">
              <span class="content-tag">
                <span class="mini-tag">{{support.name}}</span>
              </span>
              <span class="activity-content">{{support.content}}</span>
            </div>
          </div>
        </section>

        <div class="split"></div>

        <section class="section">
          <h3 class="section-title">商家实景</h3>
          <div class="pic-wrapper">
            <ul class="pic-list" ref="ul">
              <li class="pic-item" v-for="(item,index) in info.pics">
                <img width="120" height="90"
                     :src="item"/>
              </li>
            </ul>
          </div>
        </section>

        <div class="split"></div>

        <div class="section">
          <h3 class="section-title">商家信息</h3>
          <div class="info-content">
            <div class="info-item">
              <span class="info-left">品类</span>
              <span>{{info.category}}</span>
            </div>
            <div class="info-item">
              <span class="info-left">商家电话</span>
              <span>{{info.phone}}</span>
            </div>
            <div class="info-item">
              <span class="info-left">地址</span>
              <span>{{info.address}}</span>
            </div>
            <div class="info-item">
              <span class="info-left">营业时间</span>
              <span>{{info.workTime}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import {mapState} from 'vuex'
    export default {
      computed:{
        ...mapState(['info'])
      },
      methods:{
        _initScroll(){
          new BScroll('.shop-info')
          let ul = this.$refs.ul
          let width = 126 * this.info.pics.length
          ul.style.width = width + 'px'
          new BScroll('.pic-wrapper',{
            scrollX:true//水平滑动
          })
        }
      },
      mounted(){
        //如果数据还没有，直接结束
        if(!this.info.pics){
          return
        }

        //如果数据有了，可以创建bscroll对象滑动
        this._initScroll()
      },
      watch:{
        info(){//刷新 流程，更新数据
          this.$nextTick(()=>{
            this._initScroll()
          })
        }
      }
    }
</script>

<style lang="scss">
  .shop-info{
    position:absolute;
    top:205px;
    left:0;
    bottom:0;
    width:100%;
    overflow:hidden;
    .info-content{
      .section{
        background:#fff;
        padding:0 10px 10px 10px;
        text-align:left;
        font-size:13px;
        position:relative;
        .section-title{
          font-size:14px;
          font-weight:bold;
          color:#333;
          margin-bottom:8px;
        }
        .delivery{
          >div{
            line-height:24px;
            .delivery-icon {
              background:#02a774;
              color:#fff;
              display:inline-block;
              padding:2px 5px;
              border-radius:5px;
              height:18px;
              line-height:18px;
            }
          }
          .delivery-money {
            margin-top:5px;
          }
        }
        .activity{
          .activity-item{
            margin:8px 0;
            .content-tag{
              display:inline-block;
              margin-right:5px;
              .mini-tag{
                padding:1px 5px;
                display:block;
                border-radius:5px;
                color:#fff;
              }
            }
          }
          .activity-green{
            .mini-tag{
              background:#02a774;
            }
          }
          .activity-red{
            .mini-tag{
              background:red;
            }
          }
          .activity-orange{
            .mini-tag{
              background:orange;
            }
          }
        }
        .pic-wrapper{
          width: 100%;
          overflow: hidden;
          white-space: nowrap;
          margin-top:16px;
          .pic-list{
            font-size: 0;
            width: 100%;
          }
          .pic-item{
            display: inline-block;
            margin-right: 6px;
            width: 120px;
            height: 90px;
            &:last-child{
              margin: 0
            }
          }
      }
        .info-content{
          .info-item{
            display:flex;
            justify-content: space-between;
            margin:8px 0;
            .info-left{
              color:#888;
            }
          }
        }
      }
      .split{
        height:10px;
        border-top:1px solid #ddd;
        border-bottom:1px solid #eee;
        background:#f8f8f8;
      }
    }
  }

</style>
