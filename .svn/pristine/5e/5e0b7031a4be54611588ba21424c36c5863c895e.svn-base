<!--
 * @Descripttion: v1.00
 * @version: v1.00
 * @Author: huwei
 * @Date: 2020-01-08 11:01:12
 * @LastEditors: zengying
 * @LastEditTime: 2020-02-29 20:37:07
 -->
<template>
  <div class="wrap">

    <Head></Head>
    <div class="main">
      <leftMenu></leftMenu>
      <div class="main-wrap" :class="{'main-wrap-trans':isCollapse}">
        <breadcrumb></breadcrumb>
        <div class="main-box">
          <slot name="mainBox"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Head from '@/layouts/Impersonal/head';
import leftMenu from '@/layouts/Impersonal/leftMenu';
import breadcrumb from '@/layouts/Impersonal/breadcrumbs';
import { mapState } from 'vuex';

export default {
  data() {
    return {};
  },
  components: {
    Head,
    leftMenu,
    breadcrumb,
  },
  computed: {
    ...mapState('Impersonal', { isCollapse: state => state.isCollapse }),
  },
};
</script>

<style lang="scss" scoped>
.wrap {
  height: 100%;
  overflow: hidden;
}
.main {
  width: 100%;
  height: calc(100% - 80px);
  display: flex;
  .left-menu {
    width: 320px;
    height: 100%;
    float: left;
    overflow-y: auto;
    overflow-x: hidden;
  }
  .left-menu-isCollapse {
    width: 65px;
  }
  .main-wrap {
    width: calc(100% - 320px);
    float: left;
    position: relative;
    height: 100%;
    background-color: $--background-color-mainbackground;
    .main-box {
      height: calc(100% - 50px);
      padding: 20px 0 20px 20px;
      box-sizing: border-box;
      overflow: auto;
    }
  }
  .main-wrap-trans {
    width: calc(100% - 65px);
  }
}
</style>
