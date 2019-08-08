<template>
    <section class="profile">
      <Header :title="title">
        <a class="header_search" slot="left" @click="$router.back(-1)">
          <i class="iconfont icon-jiantou2"></i>
        </a>
      </Header>
      <section class="profile-number">
        <router-link to="/login" class="profile-link">
          <div class="profile_image">
            <i class="iconfont icon-touxiang"></i>
          </div>
          <div class="user-info">
            <h3>登录/注册</h3>
            <div class="phone">
              <i class="iconfont icon-icon--1"></i>
              <span>暂无绑定手机号</span>
            </div>
          </div>
          <div class="user-arrow">
          <span>
            <i class="iconfont icon-jiantou"></i>
          </span>
          </div>
        </router-link>
      </section>
      <section class="profile-content">
        <div class="profile-box">
          <h3><span class="profile-price">0.00</span>元</h3>
          <p>我的余额</p>
        </div>
        <div class="profile-box">
          <h3><span class="orange">0</span>个</h3>
          <p>我的优惠</p>
        </div>
        <div class="profile-box">
          <h3><span class="blue">0</span>分</h3>
          <p>我的积分</p>
        </div>
      </section>
      <section class="profile-main">
        <a href="javascript:">
          <div class="profile-main-list">
            <div>
              <i class="iconfont icon-dingdan"></i>
              <span>我的订单</span>
            </div>
            <span>
          <i class="iconfont icon-jiantou"></i>
        </span>
          </div>
        </a>
        <a href="javascript:">
          <div class="profile-main-list">
            <div>
              <i class="iconfont icon-jifen"></i>
              <span>积分商城</span>
            </div>
            <span>
          <i class="iconfont icon-jiantou"></i>
        </span>
          </div>
        </a>
        <a href="javascript:">
          <div class="profile-main-list">
            <div>
              <i class="iconfont icon-wodehuiyuanqia"></i>
              <span>天环外卖会员卡</span>
            </div>
            <span>
          <i class="iconfont icon-jiantou"></i>
        </span>
          </div>
        </a>
        <a href="javascript:">
          <div class="profile-main-list">
            <div>
              <i class="iconfont icon-fuwu"></i>
              <span>服务中心</span>
            </div>
            <span>
          <i class="iconfont icon-jiantou"></i>
        </span>
          </div>
        </a>
      </section>
    </section>
</template>

<script>
    import Header from '../../components/head/Head'
    import {mapActions,mapState} from 'vuex'
    export default {
      data(){
        return{
          title:'我的'
        }
      },
      mounted(){
        // ...mapActions('getUserInfo')
        this.$store.dispatch('getUserInfo')
      },
      computed:{
        ...mapState(['userinfo'])
      },
      components:{
        Header
      }
    }
</script>

<style>
  .profile{padding-top:60px;}
  .profile-number{background:#3190e8;color:#fff;margin-top:-19px;padding:15px;}
  .profile-link{color:#fff;display:flex;align-items: center;}
  .profile_image{width:15%;}
  .profile_image .iconfont{font-size:50px;}
  .user-info{margin-left:15px;line-height:28px;font-size:14px;width:80%;text-align:left;}
  .user-info h3{font-size:16px;}
  .phone .iconfont{font-size:14px;}
  .profile-content{display:flex;justify-content: space-between;align-items: center;background:#fff;padding:15px 0;font-size:14px;color:#666;border-bottom:1px solid #eee;}
  .profile-box{text-align:center;width:33.3%;border-right:1px solid #eee;line-height:20px;}
  .profile-box:last-child{border:none;}
  .profile-box h3{font-weight:normal;}
  .profile-box h3 span{font-size:20px;font-weight:bold;}
  .profile-price{color:#02a774;}
  .orange{color:#f60;}
  .blue{color:blue;}

  .profile-main{width:100%;margin:0 auto;background:#fff;padding:0 2%;box-sizing:border-box;}
  .profile-main-list{display:flex;justify-content: space-between;border-bottom:1px solid #f5f5f5;align-items: center;padding:15px 0;font-size:14px;color:#666;}
  .profile-main-list .iconfont{font-size:20px;font-weight:bold;}
  .profile-main-list .icon-jiantou{font-weight:normal;font-size:16px;color:#ccc;}
  .icon-dingdan{color:#f60;}
  .icon-jifen{color:#02a774}
  .icon-wodehuiyuanqia{color:blue}
  .icon-fuwu{color:#fd5b5d;}
</style>
