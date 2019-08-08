<template>
    <div class="alert_container">
      <section class="tip_text_container">
        <div class="tip_icon">
          <span class="iconfont icon-gantanhao"></span>
        </div>
        <p class="tip_text">{{alertText}}</p>
        <div class="confirm" @click="closeTip">确认</div>
      </section>
    </div>
</template>

<script>
    export default {
      props:{
        alertText:String
      },
      methods:{
        closeTip(){
          this.$emit('closeTip')
        }
      }
    }
</script>

<style lang="scss">
  $bgcolor:#3190e8;
  $borderRadius:10px;
.alert_container{
  background:rgba(0,0,0,.5);
  width:100%;
  height:100%;
  position:fixed;
  left:0;
  top:0;
  .tip_text_container{
    background:#f5f5f5;
    border-radius:$borderRadius;
    width:50%;
    height:130px;
    overflow:hidden;
    position:absolute;
    left:25%;
    top:50%;
    margin-top:-65px;
    .tip_icon{
      color:$bgcolor;
      span{
        width:40px;
        height:40px;
        font-size:60px;
      }
    }
    .tip_text{
      font-size:14px;
      color:#777;
    }
    .confirm{
      background:$bgcolor;
      color:#fff;
      height:34px;
      line-height:34px;
      margin-top:13px;
      border:$borderRadius;
    }
  }
}
</style>
