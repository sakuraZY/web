<!--
 * @Author: huwei
*
 * @Date: 2020-02-11 20:04:39
 * @
# Description:
 -->
<template>
  <div class="geo-layout-base">
    <header class="geo-layout-base-header" :style="headerStyle">
      <geo-header
        class="container"
        :showUserCenter="showUserCenter"
        :showSearch="showSearch"
        :showWeChat="showWeChat"
      />
    </header>
    <section class="geo-layout-base-main" :style="headerStyle">
      <slot name="main">
        <transition name="slide-fade">
          <router-view />
        </transition>
      </slot>
    </section>
    <footer class="geo-layout-base-footer" :style="footerStyle">
      <geo-footer class="container"/>
    </footer>
  </div>
</template>

<script>
import GeoHeader from '@/components/header/Personal';
import GeoFooter from '@/components/footer/Personal';

export default {
  props: {
    showUserCenter: {
      type: Boolean,
      default: true,
    },
    showSearch: {
      type: Boolean,
      default: true,
    },
    showWeChat: {
      type: Boolean,
      default: true,
    },
    headerStyle: {
      type: Object,
    },
    mainStyle: {
      type: Object,
    },
    footerStyle: {
      type: Object,
    },
  },
  components: {
    GeoHeader,
    GeoFooter,
  },
};
</script>

<style lang="scss" scoped>
.geo-layout-base{
  height: 100%;
  overflow-y: auto;
  .container{
    @extend container
  }
  &-header{
    height: 125px;
    overflow: hidden;
  }
  &-main{
    min-height: calc(100% - 275px);
    display: flex;
    flex-direction: column;
  }
  &-footer{
    min-height: 150px;
    padding: 24px 0;
    box-sizing: border-box;
  }
}
</style>
