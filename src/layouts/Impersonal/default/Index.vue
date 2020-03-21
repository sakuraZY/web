<template>
  <div :class="classObj" class="app-wrapper">
    <div
      v-if="device === 'mobile' && sidebar.opened"
      class="drawer-bg" @click="handleClickOutside"
    ></div>
    <geo-header />
    <sidebar class="sidebar-container" v-if="needSideMenu" />
    <div
      :class="mainContainerClass"
      class="main-container"
    >
      <tabs-view v-if="needTabsView" />
      <app-main />
    </div>
    <right-aside v-show="needRightAside" :class="{hasTabbar: hasTabbar}" />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { queryMenuByUserId } from '@/apis/sysmgr/menu';
import { getPortalByUserId } from '@/apis/sysmgr/portal';
import GeoHeader from './header';
import Sidebar from './sidebar';
import TabsView from './tabsView';
import AppMain from './appMain';
import RightAside from './aside';
import ResizeMixin from './mixin/resizeHandler';

export default {
  name: 'Layout',
  components: {
    GeoHeader,
    Sidebar,
    TabsView,
    AppMain,
    RightAside,
  },
  mixins: [ResizeMixin],
  data() {
    return {
      timer: null,
    };
  },
  computed: {
    ...mapState({
      sidebar: state => state.app.sidebar,
      device: state => state.app.device,
      activeCenter: state => state.app.activeCenter,
      userId: state => state.user.userId,
      portal: state => state.app.portal,
      navmenus: state => state.app.portalCenter,
    }),
    hasTabbar() {
      if (this.device === 'mobile' && this.navmenus.length > 1) {
        return true;
      }
      return false;
    },
    needTabsView() {
      if (this.activeCenter && this.activeCenter.configShowtab === '是') {
        return true;
      }
      return false;
    },
    mainContainerClass() {
      return {
        hideSideMenu: !this.needSideMenu,
        hasTabsView: this.needTabsView,
        hasRightAside: this.needRightAside,
        hasTabbar: this.hasTabbar,
      };
    },
    needSideMenu() {
      if (this.activeCenter && this.activeCenter.configShowmenu === '是') {
        return true;
      }
      return false;
    },
    needRightAside() {
      if (this.portal
        && this.portal.portalHideright === '否'
        && this.portal.portalCollapseright === '否'
      ) {
        return true;
      }
      return false;
    },
    classObj() {
      const { sidebar: { opened, withoutAnimation } = {}, device } = this;
      return {
        hideSidebar: !opened,
        openSidebar: opened,
        withoutAnimation,
        mobile: device === 'mobile',
      };
    },
  },
  created() {
    Promise.all([getPortalByUserId(this.userId), queryMenuByUserId(this.userId)])
      .then(([
        { code: portalCode, resData: { portal, portalCenter, portletcfgList } } = {},
        { code: menuCode, resData: { menuTree } } = {},
      ]) => {
        if (portalCode !== 0 || menuCode !== 0) {
          throw new Error('加载失败, 请稍后重试');
        }
        const centers = portalCenter || [];
        this.setPortal(portal || {});
        this.setPortalcenter(portalCenter || []);
        this.setPortletcfglist(portletcfgList || []);
        this.setMenus(menuTree || []);
        centers.forEach((center) => {
          this.initCenterView(center.centerId);
        });
      }).catch((err) => {
        this.$message.error(err.message || '加载失败, 请稍后重试');
      });
  },
  methods: {
    ...mapActions('app', [
      'setPortal',
      'setPortalcenter',
      'setPortletcfglist',
      'setMenus',
      'closeSideBar',
    ]),
    ...mapActions('tabsView', [
      'initCenterView',
    ]),
    handleClickOutside() {
      this.closeSideBar({ withoutAnimation: false });
    },
  },
  beforeDestroy() {
    clearTimeout(this.timer);
  },
};
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
