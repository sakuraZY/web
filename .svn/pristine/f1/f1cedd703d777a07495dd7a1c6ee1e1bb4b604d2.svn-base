<!--
 * @Descripttion: v1.00
 * @version: v1.00
 * @Author: huwei
 * @Date: 2020-01-09 14:15:24
 * @LastEditors  : huwei
 * @LastEditTime : 2020-01-17 15:07:16
 -->
<template>
<div class="mainflex">
  <slot name="banner-content"></slot>
  <div class="contentflex">
    <div class="main-content" ref="maincontent">
      <slot name="main-content"></slot>
    </div>
  </div>
  <slot name="foot-banner"></slot>
</div>
</template>

<script>
export default {
  data() {
    return { };
  },
  props: ['values'],
};
</script>
<style lang="scss" scoped>
.mainflex{
  display:flex;
  height:100%;
  flex-direction:column;
  .contentflex{
    flex:1;
    overflow: hidden;
    .main-content {
      width: 100%;
      height: 100%;
      overflow-y: auto;
      overflow-x: hidden;
      background: $--color-white;
    }
  }
  .footflex{
    height:80px;
  }
  .foot-btn{
   position: absolute;
   bottom: 0;
   left: 0;
   width: 100%;
   height: 80px;
   border-top: 1px solid $--border-color-grey-bottom;
   background-color: $--color-white;
   .btnList{
       float: right;
       li{
           float: left;
           list-style: none;
           margin-right: 20px;
       }
   }
}
}

</style>
