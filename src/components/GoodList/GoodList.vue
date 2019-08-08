<template>
    <div class="goodlist">
      <div class="goodlist-content">
        <div class="goodlist-nav">
          <ul ref="ul">
            <router-link :to="'/goodlist/gooditem/'+category.id" v-for="(category,idx) in categorys" :key="idx" tag="li" replace><span>{{category.shopname}}</span></router-link>
          </ul>
        </div>
          <h3 class="goodlist-title"><span>{{shopTitle}}</span></h3>
          <GoodItem/>
      </div>
    </div>
</template>

<script>
    import {mapState,mapGetters} from 'vuex'
    import BScroll from 'better-scroll'
    import GoodItem from '../GoodItem/GoodItem'
    export default {
      props:{
        shopname:String
      },
      mounted(){
        this.$store.dispatch('getCategorys',()=>{
          this.$nextTick(()=>{
            let ul = this.$refs.ul
            let width = 50 * this.categorys.length
            ul.style.width = width + 'px'
            new BScroll('.goodlist-nav',{
              scrollX:true
            })
          })
        })
      },
      computed:{
        ...mapState(['categorys']),
        shopTitle(){
          return this.categorys.find((item)=>item.id==this.$route.params.id).shopname
        }
      },
      components:{
        GoodItem
      }
    }
</script>

<style lang="scss">
  .goodlist{
    padding-bottom:50px;
    .goodlist-content{
      .goodlist-nav{
        width:100%;
        position:fixed;
        left:0;
        top:0;
        height:40px;
        line-height:40px;
        background:#3190e8;
        overflow:hidden;
        white-space: nowrap;
        color:#fff;
        font-size:13px;
        ul{
          height:40px;
          li{
            float:left;
            width:60px;
            &.router-link-active{
              span{
                border-bottom:2px solid #fff;
                height:26px;
                line-height:34px;
                display:inline-block;
              }
            }
          }
        }
      }
      .goodlist-title{
        margin-top:50px;
        text-align:left;
        padding:0 10px;
        span{
          display:block;
          border-bottom:1px solid #eee;
          font-size:15px;
          padding-bottom:5px;
        }
      }
    }
  }
</style>
