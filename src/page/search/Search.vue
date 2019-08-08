<template>
    <section class="search">
      <Header :title="title">
        <a class="header_search" slot="left" @click="$router.back(-1)">
          <i class="iconfont icon-jiantou2"></i>
        </a>
      </Header>
      <form class="search_form" @submit.prevent="getShop">
        <input type="search" name="search" placeholder="请输入商家或美食名称" class="search_input" v-model="searchInput">
        <input type="submit" name="submit" class="search_submit">
      </form>
      <ShopList v-show="shopShow" :searchInput="searchInput"/>
      <AlertTip :alertText="alertText" v-show="alertShow" @closeTip="closeTip"/>
    </section>
</template>

<script>
  import Header from '../../components/head/Head'
  import ShopList from '../../components/ShopList/ShopList'
  import AlertTip from '../../components/AlertTip/AlertTip'
    export default {
      data(){
        return {
          title:'搜索',
          shopShow:false,
          searchInput:'',
          alertText:'',//提示文本
          alertShow:false//是否显示警告框
        }
      },
      methods:{
        getShop(){
          if(this.searchInput===''){
            this.shopShow = false
            this.alertText = '商家或美食不能为空'
            this.alertShow = true
            return
          }
          this.shopShow = true
        },
        changeShop(event){
          if(event.target.value === ''){
            this.shopShow = false
          }
        },
        closeTip(){
          this.alertShow = false
          this.alertText = ''
        }

      },
      watch:{
        searchInput(val){
          if(val.length === 0){
            this.shopShow = false
          }
        }
      },
      components:{
        Header,
        ShopList,
        AlertTip
      }
    }
</script>

<style>
  .search{padding-top:60px;}
.search_form{
  background:#fff;
  padding:0 10px;
  display:flex;
}
  .search_form .search_input{
    flex:4;
    border:1px solid #e4e4e4;
    font-size:14px;
    color:#333;
    border-radius:4px;
    background-color:#f2f2f2;
    font-weight:bold;
    height:30px;
    line-height:30px;
    text-indent:5px;
    outline: medium;
  }
  .search_form .search_submit{
    flex:1;
    border:none;
    font-size:14px;
    font-weight:bold;
    background-color:#3190e8;
    color:#fff;
    border-radius:4px;
    margin-left:5px;
    outline: medium;
  }
</style>
