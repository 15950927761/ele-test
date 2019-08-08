<template>
  <div class="star">
    <span class="star-item iconfont icon-xingxing" v-for="(sc,index) in starClasses" :class="sc" :key="index"></span>
  </div>
</template>

<script>
  const CLASS_ON = 'on'
  const CLASS_HALF = 'half'
  const CLASS_OFF = 'off'
    export default {
      props:{
        score:Number
      },
      computed:{
        starClasses(){
          const {score} = this
          const scs = []
          const scoreInteger = Math.floor(score)
          for(var i=0;i<scoreInteger;i++){
            scs.push(CLASS_ON)
          }
          if((score -scoreInteger)*10>=5){
            scs.push(CLASS_OFF)
          }
          while(scs.length<5){
            scs.push(CLASS_OFF)
          }
          //向scs中添加n个‘on’
          //添加0或1个‘half’
          //剩下的是'off'
          return scs
         }
      }
    }
</script>

<style>
  .star{display:flex;}
  .star-item{font-size:14px;}
  .on{color:orange}
  .off{color:#bbb;}
</style>
