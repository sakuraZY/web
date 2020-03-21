<template>
  <el-scrollbar
    ref="scrollContainer"
    :vertical="false"
    class="scroll-container"
    @wheel.native.prevent="handleScroll"
  >
    <slot />
  </el-scrollbar>
</template>

<script>
const tabAndTabSpacing = 4; // tabAndTabSpacing

export default {
  name: 'ScrollPane',
  data() {
    return {
      left: 0,
    };
  },
  computed: {
    scrollWrapper() {
      return this.$refs.scrollContainer.$refs.wrap;
    },
  },
  methods: {
    handleScroll(e) {
      const eventDelta = e.wheelDelta || -e.deltaY * 40;
      const $scrollWrapper = this.scrollWrapper;
      $scrollWrapper.scrollLeft += eventDelta / 4;
    },
    moveToTarget(currentTab) {
      const $container = this.$refs.scrollContainer.$el;
      const $containerWidth = $container.offsetWidth;
      const $scrollWrapper = this.scrollWrapper;
      const tabList = this.$parent.$refs.tab;

      const firstTab = tabList[0];
      let lastTab = null;

      if (tabList.length > 0) {
        lastTab = tabList[tabList.length - 1];
      }

      if (firstTab === currentTab) {
        $scrollWrapper.scrollLeft = 0;
      } else if (lastTab === currentTab) {
        $scrollWrapper.scrollLeft = $scrollWrapper.scrollWidth - $containerWidth;
      } else {
        const currentIndex = tabList.findIndex(item => item === currentTab);
        const prevTab = tabList[currentIndex - 1];
        const nextTab = tabList[currentIndex + 1];

        const afterNextTabOffsetLeft = nextTab.$el.offsetLeft
          + nextTab.$el.offsetWidth + tabAndTabSpacing;

        // the tab's offsetLeft before of prevTab
        const beforePrevTabOffsetLeft = prevTab.$el.offsetLeft - tabAndTabSpacing;

        if (afterNextTabOffsetLeft > $scrollWrapper.scrollLeft + $containerWidth) {
          $scrollWrapper.scrollLeft = afterNextTabOffsetLeft - $containerWidth;
        } else if (beforePrevTabOffsetLeft < $scrollWrapper.scrollLeft) {
          $scrollWrapper.scrollLeft = beforePrevTabOffsetLeft;
        }
      }
    },
    scrollNext() {
      const $container = this.$refs.scrollContainer.$el;
      const $containerWidth = $container.offsetWidth;
      const $scrollWrapper = this.scrollWrapper;
      const tabList = this.$parent.$refs.tab;
      let $tabsWidth = 0;
      tabList.forEach((tab) => {
        $tabsWidth += tab.$el.offsetWidth;
      });
      const overWidth = $tabsWidth - $containerWidth - $scrollWrapper.scrollLeft;
      if (overWidth < 0) {
        return;
      }
      if (overWidth < $containerWidth) {
        $scrollWrapper.scrollLeft += $containerWidth - overWidth;
        return;
      }
      $scrollWrapper.scrollLeft += $containerWidth;
    },
    scrollPrev() {
      const $scrollWrapper = this.scrollWrapper;
      if ($scrollWrapper.scrollLeft <= 0) {
        return;
      }
      const $container = this.$refs.scrollContainer.$el;
      const $containerWidth = $container.offsetWidth;
      if ($scrollWrapper.scrollLeft < $containerWidth) {
        $scrollWrapper.scrollLeft = 0;
        return;
      }
      $scrollWrapper.scrollLeft -= $containerWidth;
    },
  },
};
</script>

<style lang="scss" scoped>
.scroll-container {
  white-space: nowrap;
  position: relative;
  overflow: hidden;
  width: 100%;
  /deep/ {
    .el-scrollbar__bar {
      bottom: 0px;
    }
    .el-scrollbar__wrap {
      height: 73px;
    }
  }
}
</style>
