<template>
    <header class="header">
      <slot name="left"></slot>
      <span class="header_title">
        <span class="header_title_text ellipsis">{{title}}</span>
      </span>
      <slot name="right"></slot>
    </header>
</template>

<script>
    export default {
      props:['title']
    }
</script>

<style>
.header{height:40px;line-height:40px;position:fixed; top:0; left:0; width:100%;background:#3190e8;color:#fff;padding:0 5px;box-sizing:border-box;z-index:9999;}
.header_title{position:absolute;left:50%;top:50%;margin-top:-20px;width:80px;margin-left:-40px;text-align:center;display:block;}
</style>
