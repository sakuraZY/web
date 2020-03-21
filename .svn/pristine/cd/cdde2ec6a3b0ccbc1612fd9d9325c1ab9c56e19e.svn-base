<template>
  <div id="tabs-view-container" class="tabs-view-container">
    <div class="tabs-control" @click="toggleSideBar" v-if="showSideMenu">
      <icon-svg :iconClass="shrinkSideBarIcon" />
    </div>
    <div class="tabs-control" @click="handleScrollPrev">
      <icon-svg iconClass="doubleLeft" />
    </div>
    <scroll-pane ref="scrollPane" class="tabs-view-wrapper">
      <router-link
        v-for="tab in visitedViews"
        ref="tab"
        :key="tab.href"
        :to="{ path: tab.href }"
        tab="span"
        class="tabs-view-item tabs-control"
        :class="{noPadding: tab.href === '/', active: isActiveTab(tab) }"
      >
        <icon-svg v-if="tab.icon" :iconClass="tab.icon" />
        {{ tab.title }}
        <span
          v-if="!isAffix(tab)"
          class="el-icon-close"
          @click.prevent.stop="closeSelectedTab(tab)"
        />
      </router-link>
    </scroll-pane>
    <div class="tabs-control" @click="handleScrollNext">
      <icon-svg iconClass="doubleRight"  />
    </div>
    <el-dropdown class="tabs-control">
      <div class="tabs-control">
        <icon-svg iconClass="arrowDown"  />
      </div>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item @click.native="refreshSelectedTab">刷新</el-dropdown-item>
        <el-dropdown-item
          v-if="!isAffix(this.getCurrentTab())"
          @click.native="closeSelectedTab()"
        >关闭当前</el-dropdown-item>
        <el-dropdown-item @click.native="closeOthersTabs">关闭其他</el-dropdown-item>
        <el-dropdown-item @click.native="closeAllTabs">关闭所有</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <div class="tabs-control" v-if="showRightAside" @click="changePortalCollapseright">
      <icon-svg :iconClass="shrinkAsideIcon"  />
    </div>
  </div>
</template>

<script>
import Tabs from '@/mixins/tabs';
import { mapActions, mapState, mapGetters } from 'vuex';
import { hashArray } from '@/libs/common';
import ScrollPane from './scrollPane';

export default {
  mixins: [Tabs],
  components: { ScrollPane },
  data() {
    return {
      visitedViews: [],
    };
  },
  computed: {
    ...mapState('app', [
      'portal',
      'sidebar',
      'activeCenter',
    ]),
    ...mapState('tabsView', [
      'affixTabs',
      'centerViews',
    ]),
    ...mapGetters('app', [
      'sideMenus',
    ]),
    showRightAside() {
      const { portalHideright } = this.portal || {};
      if (portalHideright === '是') {
        return false;
      }
      return true;
    },
    showSideMenu() {
      if (this.activeCenter && this.activeCenter.configShowmenu === '是') {
        return true;
      }
      return false;
    },
    shrinkAsideIcon() {
      const { portalCollapseright } = this.portal || {};
      return portalCollapseright === '是' ? 'shrink' : 'shrink-right';
    },
    shrinkSideBarIcon() {
      const { opened } = this.sidebar;
      return opened ? 'shrink' : 'shrink-right';
    },
  },
  watch: {
    $route() {
      this.moveToCurrentTab();
    },
    centerViews: {
      handler() {
        this.visitedViewsChange();
      },
      immediate: true,
      deep: true,
    },
    centerId: {
      handler() {
        this.visitedViewsChange();
      },
      immediate: true,
    },
  },
  mounted() {
    this.initTabs();
  },
  methods: {
    ...mapActions('app', ['toggleSideBar', 'changePortalCollapseright']),
    ...mapActions('tabsView', ['addView', 'addVisitedView']),
    visitedViewsChange() {
      this.visitedViews = this.centerViews[this.centerId].visitedViews;
    },
    handleScrollNext() {
      this.$refs.scrollPane.scrollNext();
    },
    handleScrollPrev() {
      this.$refs.scrollPane.scrollPrev();
    },
    isAffix(tab) {
      return this.affixTabs.map(item => item.href).includes(tab.href);
    },
    initTabs() {
      const { affixTabs } = this;
      affixTabs.forEach((tab) => {
        if (tab.href) {
          this.addVisitedView({ tab, centerId: this.centerId });
        }
      });
      let tab = null;
      const { path, name, meta: { title, icon } } = this.$route;
      const href = path.replace('/redirect', '');
      const hash = hashArray(this.sideMenus);
      const menuIds = Object.keys(hash);
      for (let i = 0; i < menuIds.length; i += 1) {
        const menu = hash[menuIds[i]];
        if (href === menu.href) {
          tab = menu;
          break;
        }
      }
      if (!tab) {
        tab = {
          title,
          icon,
          href,
          name,
        };
      }
      this.addTabs(tab);
    },
    moveToCurrentTab() {
      const tabs = this.$refs.tab;
      this.$nextTick(() => {
        if (!tabs) {
          return;
        }
        for (let i = 0; i < tabs.length; i += 1) {
          const tab = tabs[i];
          if (tab.to.path === this.$route.path) {
            this.$refs.scrollPane.moveToTarget(tab);
            break;
          }
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.tabs-view-container {
  height: 56px;
  width: 100%;
  background: $--color-white;
  border-bottom: $--border-base;
  box-shadow: $--box-shadow-base;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  .tabs-control{
    height: 55px;
    min-width: 54px;
    text-align: center;
    line-height: 56px;
    display: inline-block;
    font-size: 18px;
    cursor: pointer;
    text-decoration: none;
    color: $--color-text-primary;
  }
  .tabs-control + .tabs-control{
    border-left: 1px solid $--border-color-lighter;
  }
  .tabs-view-wrapper {
    border-left: 1px solid $--border-color-lighter;
    border-right: 1px solid $--border-color-lighter;
    .tabs-view-item {
      display: inline-block;
      position: relative;
      cursor: pointer;
      height: 55px;
      line-height: 55px;
      padding: 0 13px;
      font-size: 16px;
      user-select: none;
      &.active {
        background-color: $--background-color-base;
        color: $--color-primary;
      }
      &.noPadding{
        padding: 0;
      }
    }
  }
}
</style>

<style lang="scss">
.tabs-view-wrapper {
  .tabs-view-item {
    .el-icon-close {
      width: 16px;
      height: 16px;
      vertical-align: -1px;
      border-radius: 50%;
      text-align: center;
      transition: all .3s cubic-bezier(.645, .045, .355, 1);
      transform-origin: 100% 50%;
      &:before {
        transform: scale(.6);
        display: inline-block;
      }
      &:hover {
        background-color: $--color-primary;
        color: $--color-white;
      }
    }
  }
}
</style>
