<template>
  <section class="app-main" :class="{needPadding: needPadding}">
    <transition name="slide-fade">
      <keep-alive :include="cachedViews">
        <router-view :key="key" />
      </keep-alive>
    </transition>
  </section>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'AppMain',
  computed: {
    ...mapState({
      cachedViews: state => state.tabsView.cachedViews,
    }),
    key() {
      return this.$route.path;
    },
    needPadding() {
      return true;
    },
  },
};
</script>

<style lang="scss" scoped>
.app-main {
  height: 100%;
  width: 100%;
  position: relative;
  overflow-y: auto;
  overflow-x: hidden;
  background-color: $--background-color-base;
  box-sizing: border-box;
  &.needPadding{
    padding: 20px;
  }
}

.hasTabsView {
  .app-main {
    height: calc(100% - 56px);
  }
}
</style>

<style lang="scss">
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
