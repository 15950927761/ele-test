<template>
  <div id="app">
    <router-view/>
    <FootGuide v-show="$route.meta.showFooter"/>
  </div>
</template>

<script>
  import {mapActions} from 'vuex'
  import FootGuide from './components/footer/FootGuide'
  export default {
    components:{
      FootGuide
    }
  }
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
  ul{list-style:none;}
  *{margin:0; padding:0;text-decoration:none;}
.header_search{float:left;}
</style>
