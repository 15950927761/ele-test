<template>
    <div>
      <div>
        <div class="goods">
          <div class="menu-wrapper">
            <div class="content" ref="menuWrapper">
              <ul v-for="(good,index) in goods" :key="index">
                <li class="menu-item" :class="{current: index ===currentIndex}" @click="clickMenuItem(index)">
                  <!--<li class="menu-item current">-->
                  <span class="text bottom-border-1px">
                <img class="icon" :src="good.icon" v-if="good.icon">
                {{good.name}}
                </span>
                </li>
              </ul>
            </div>
          </div>

          <div class="foods-wrapper">
            <div class="content">
              <ul ref="foodUl">
                <li class="food-list-hook" v-for="(good,index) in goods" :key="index">
                  <h1 class="title">{{good.name}}</h1>
                  <ul>
                    <li class="food-item bottom-border-1px" v-for="(food,index) in good.foods" @click="showFood(food)">
                      <div class="icon">
                        <img width="57" height="57" :src="food.image">
                      </div>
                      <div class="content">
                        <h2 class="name">{{food.name}}</h2>
                        <div class="extra">
                          <span class="count">月售 {{food.sellCount}}份</span>
                          <span>好评率 {{food.rating}}%</span>
                        </div>
                        <div class="price">
                          <span class="now">￥{{food.price}}</span>
                        </div>
                        <div class="cartcontrol-wrapper">
                          <ShopCart :food="food"/>
                        </div>
                      </div>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>

          <ShopCart2/>
          <Food :food="food" ref="food"/>
        </div>
      </div>
    </div>
</template>

<script>
  import {mapState,mapActions} from 'vuex'
  import ShopCart from '../ShopCart/ShopCart'
  import Food from '../Food/Food'
  import ShopCart2 from '../ShopCart2/ShopCart2'
  import BScroll from 'better-scroll'
  export default {
    data(){
      return {
        scrollY:0,
        tops:[],
        food:{}//需要显示的food
      }
    },
    methods:{
      //初始化滚动
      _initScroll(){
        new BScroll('.menu-wrapper',{
          click:true
        })
        this.foodsScroll = new BScroll('.foods-wrapper',{
          probeType:3 ,
          click:true
        })

        //给右侧列表绑定scroll监听
        this.foodsScroll.on('scroll',({x,y})=>{
          // console.log(x,y)
          this.scrollY = Math.abs(y)
          // console.log(this.scrollY)
        })

        //给右侧列表绑定scroll结束的监听
        this.foodsScroll.on('scrollEnd',({x,y})=>{
          this.scrollY = Math.abs(y)
        })
      },

      _initTops(){
        const tops = []
        let top = 0;
        tops.push(top)
        //找到所有分类的li
        const lis = this.$refs.foodUl.getElementsByClassName('food-list-hook')
        // console.log(lis)
        // const lis = this.$refs.foodUl.children

        Array.prototype.slice.call(lis).forEach(li => {
          top += li.clientHeight
          tops.push(top)
        })

        this.tops = tops
        // console.log(tops)
      },

      clickMenuItem(index){
        // console.log(index)
        const scrollY = -this.tops[index]
        console.log(scrollY)
        this.scrollY = scrollY
        //使右侧列表滑动到对应的位置
        this.foodsScroll.scrollTo(0,scrollY,300)
      },
      //显示点击的food
      showFood(food){
        //设置food
        this.food = food;
        //显示food组件（父组件调用子组件）
        this.$refs.food.toggleShow()
      }
    },
    mounted() {
      this.$store.dispatch('getGoods',()=>{

        this.$nextTick(()=>{
          console.log(this);
          this._initScroll()
          this._initTops()
        })
      })
      // this.$store.dispatch('getGoods')
      //列表显示之后创建

    },
    computed:{
      ...mapState(['goods']),

      //计算得到当前分类的下标
     currentIndex(){
        const {scrollY,tops} = this
        const index = tops.findIndex((top,index)=>{
          return scrollY>=top && scrollY<tops[index+1]
        })
       return index
     }
    },
    components:{
      ShopCart,
      Food,
      ShopCart2
    }
  }
</script>

<style lang="scss">
  .goods{
    display:flex;
    position:absolute;
    top:205px;
    bottom:46px;
    width:100%;
    overflow:hidden;
    .menu-wrapper{
      flex:0 0 80px;
      width:80px;
      margin-right:5px;
      background:#f3f5f7;
      .menu-item{
        display:table;
        height:54px;
        width:56px;
        padding:0 12px;
        line-height:14px;
        &.current{
          position:relative;
          z-index:10;
          margin-top:-1px;
          background:#fff;
          color:green;
          font-weight:700;
          .text{
            border:none;
          }
        }
        .icon{
          display:inline-block;
          vertical-align: top;
          width:12px;
          height:12px;
          margin-right:2px;
          background-size:12px 12px;
          background-repeat:no-repeat;
        }
        .text{
          display:table-cell;
          width:56px;
          vertical-align:middle;
          font-size:12px;
        }
      }
    }
    .foods-wrapper{
      flex:1;
      text-align:left;
      .content{
        ul{}
        .food-list-hook{
          h1{
            font-size:14px;
            font-weight:bold;
            height:30px;
            line-height:30px;
            background:#f5f5f5;
            border-left:2px solid #ccc;
            text-indent:5px;
          }
          ul{
            .food-item{
              display:flex;
              padding:8px;
              border-bottom:1px solid #eee;
              .icon{
                width:30%;
                img{
                  width:90%;
                }
              }
              .content{
                font-size:12px;
                color:#888;
                position:relative;
                width:70%;
                .name{
                  font-size:14px;
                  color:#333;
                  margin-bottom:5px;
                }
                .price{
                  font-size:16px;
                  color:red;
                  margin-top:10px;
                }
                .cartcontrol-wrapper{
                  position:absolute;
                  bottom:0;
                  right:0;
                }
              }
            }
          }
        }
      }

    }

  }
</style>

