<template>
  <div class="off">
    <section class="loginContainer">
      <div class="loginInner">
        <div class="login_header">
          <h2 class="login_logo">登录/注册</h2>
          <div class="login_header_title">
            <a href="javascript:" :class="{on:loginWay}" @click="loginWay=true">短信登录</a>
            <a href="javascript:" :class="{on:!loginWay}" @click="loginWay=false">密码登录</a>
          </div>
        </div>
      </div>
      <div class="login_content">
        <form @submit.prevent="login">
          <div class="login_hidden" :class="{on:loginWay}">
            <section class="login_message">
              <input type="tel" maxlength="11" placeholder="手机号" v-model="phone">
              <button :disabled="!rightPhone" class="get_verification" :class="{right_phone:rightPhone}" @click.prevent="getCode">{{computeTime>0?`已发送(${computeTime})`:'获取验证码'}}</button>
            </section>
            <section class="login_verification">
              <input type="tel" maxlength="8" placeholder="验证码" v-model="code">
            </section>
            <section class="login_hint">
              温馨提示：未注册天环账号的手机号，登录时自动注册，且代码同意外卖协议
              <a href="javascript:">《用户服务协议》</a>
            </section>
          </div>
          <div class="login_hidden" :class="{on:!loginWay}">
            <section>
              <section class="login_message">
                <input type="text" placeholder="手机/邮箱/用户名" v-model="name">
              </section>
              <section class="login_verification">
                <input type="password" placeholder="密码" v-if="!showPwd" v-model="pwd">
                <input type="text" placeholder="密码" v-else v-model="pwd">
                <div class="switch_button" @click="showPwd=!showPwd" :class="showPwd?'on':'off'">
                  <div class="switch_circle" :class="{right:showPwd}"></div>
<!--                  <span class="switch_text">{{showPwd?'切换':''}}</span>-->
                </div>
              </section>
<!--              <section class="login_message">-->
<!--                <input type="text" maxlength="11" placeholder="验证码">-->
<!--                &lt;!&ndash;<img src="./images/captcha.svg" alt="" class="get_verification">&ndash;&gt;-->
<!--              </section>-->
            </section>
          </div>
          <button class="login_submit">登录</button>
        </form>
        <a href="javascript:" class="about_us">关于我们</a>
      </div>
      <a href="javascript:" class="go_back" @click="$router.back()">
        <i class="iconfont icon-jiantou2" ></i>
      </a>
      <AlertTip :alertText="alertText" v-show="alertShow" @closeTip="closeTip"></AlertTip>
    </section>
  </div>
</template>

<script>
  import AlertTip from '../../components/AlertTip/AlertTip'
  import {reqSendCode,reqSmsLogin,reqPwdLogin} from '../../api'
    export default {
      data(){
        return {
          loginWay:true,//true  代表短信登录，false代表密码登录
          computeTime:0,//计时的时间
          phone:'',//手机号
          showPwd:false,//是否显示密码
          pwd:'',
          code:'',
          name:'',
          alertText:'',//提示文本
          alertShow:false//是否显示警告框
        }
      },
      methods:{
        async getCode(){
          //如果当前没有计时
          if(!this.computeTime){
            //启动倒计时
            this.computeTime = 30
            this.intervalId = setInterval(()=>{
              this.computeTime--
              if (this.computeTime<=0){
                clearInterval(this.intervalId)
              }
            },1000)
          }
          //发送ajax请求（向指定手机发送验证码短信）
          const result =await reqSendCode(this.phone)
          if(result.code == 1){
            this.showAlert(result.msg)
            if(this.computeTime){
              this.computeTime=0
              clearInterval(this.intervalId)
              this.intervalId = undefined //做不做没有太大影响
            }
          }
        },
        showAlert(alertText){
          this.alertText =  alertText
          this.alertShow = true
        },
        //异步登录
        async login(){
          let result
          if(this.loginWay){//短信登录
            const {rightPhone,phone,code} = this
            if(!this.rightPhone){//手机号不正确
              this.showAlert('手机号不正确')
              return
            }else if(!/^\d{6}$/.test(this.code)){//手机短信验证码不正确
              this.showAlert('验证码必须是6位')
              return
            }
            //发送ajax请求短信登录
            result = await reqSmsLogin(phone,code)
          }else{//用户名登录
            const {name,pwd} = this
            if(!this.name){
              this.showAlert('用户名不能为空')
              return
            }else if(!this.pwd){
              this.showAlert('密码不能为空')
              return
            }
            //发送ajax请求密码登录
            result = await reqPwdLogin(name,pwd)
          }
          //停止计时
          if(this.computeTime){
            this.computeTime = 0
            clearInterval(this.intervalId)
            this.intervalId = undefined
          }
          //根据结果数据处理
          if(result.code === 0){
            const user = result.data
            //将user保存到vuex的state

            //去个人中心界面
            this.$router.replace('/profile')
          }else{
            const msg = result.msg
            this.showAlert(msg)
          }
        },
        closeTip(){
          this.alertShow = false
          this.alertText = ''
        }
      },
      computed:{
        rightPhone(){
          return /^1\d{10}$/.test(this.phone)
        }
      },
      components:{
        AlertTip
      }
    }
</script>

<style>
  .loginContainer{width:100%;height:100%;background:#fff;}
  .loginInner{padding-top:60px;width:80%;margin:0 auto;}
  .login_hidden{display:none;}
  .on{display:block;}
  .login_logo{font-size:40px;font-weight:bold; color:#3190e8;text-align:center;}
  .login_header_title{display:flex;justify-content:space-around;padding:30px 0 0 0;font-size:15px;}
  .login_header_title a{color:#333;line-height:24px;}
  .login_header_title .on{color:#3190e8;border-bottom:2px solid #3190e8}
  .login_content{width:90%;margin:0 auto;}
  .login_message,.login_verification{width:100%;line-height:30px;border:1px solid #eee;margin:10px 0;position:relative;border-radius:6px;overflow:hidden;position:relative;}
  .login_verification .on{background:green;border:1px solid green;color:#fff;}
  .login_message input,.login_verification input{width:100%;height:36px;line-height:36px;border:none;text-indent:5px;outline:medium}
  .switch_button{position:absolute;right:10px;top:8px;width:40px;height:20px;border:1px solid #ddd;border-radius:15px;}
  .switch_circle{width:18px;height:18px;border:1px solid #ddd;border-radius:50%;position:absolute;left:0;transition:all ease .5s}
  .right{background:#fff;transform:translateX(20px);}
  .switch_text{position:absolute;right:5px;top:-5px;font-size:12px;}
  .get_verification{background:none;position:absolute;right:5px; top:9px;border:none;color:#999;}
  .right_phone{color:#000;}
  .login_hint{font-size:13px;color:#888;line-height:24px;}
  .login_hint a{color:#3190e8;}
  .login_submit{width:100%;background:#3190e8;font-size:16px;color:#fff;margin:15px 0;border:none;height:40px;line-height:40px;border-radius:5px;}
  .about_us{text-align:center; color:#888;display:block;text-align:center;font-size:13px;}
  .go_back{position:fixed;left:0; top:5px;}
  .go_back .iconfont{font-size:24px;color:#888;}
</style>
