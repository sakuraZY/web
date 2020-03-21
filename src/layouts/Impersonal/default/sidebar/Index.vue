<template>
  <div>
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :unique-opened="true"
        :collapse-transition="false"
        mode="vertical"
        :default-openeds="defaultOpeneds"
      >
        <sidebar-item
          v-for="menu in sideMenus"
          :key="menu.id"
          :item="menu"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import SidebarItem from './sidebarItem';

export default {
  components: { SidebarItem },
  computed: {
    ...mapState('app', [
      'sidebar',
      'menus',
      'activeCenter',
    ]),
    ...mapGetters('app', [
      'sideMenus',
    ]),
    defaultOpeneds() {
      if (!this.sideMenus.length || !this.sideMenus[0].children) {
        return [];
      }
      return [this.sideMenus[0].id];
    },
    activeMenu() {
      const route = this.$route;
      const { path } = route;
      return path;
    },
    isCollapse() {
      return !this.sidebar.opened;
    },
  },
};
</script>
