<template>
  <div class="layout-header">
    <div class="layout-header-left">
      <router-link to="/" class="logo-content">
        <img :src="logo" class="system-logo" fit="cover">
        <div class="system-name hidden-xs-only">{{ systemName }}</div>
      </router-link>
      <select-area></select-area>
    </div>
    <div class="layout-header-right">
      <div class="search-content hidden-md-and-down">
        <el-input
          placeholder="输入关键字查询"
          v-model="keyword"
          size="medium"
          v-if="showSearch"
          @change="handleSearch"
        >
          <template slot="suffix">
            <icon-svg iconClass="search" className="icon-search" @click="handleSearch"></icon-svg>
          </template>
        </el-input>
      </div>
      <el-menu
        :default-active="activeCenterId"
        class="layout-navmenu"
        mode="horizontal"
        @select="handleSelect"
        v-if="navmenus.length > 1"
      >
        <el-menu-item
          class="layout-navmenu-item"
          v-for="item in navmenus"
          :key="item.centerId"
          :index="item.centerId"
        >
          <div class="nav-icon">
            <icon-svg :iconClass="'menu' || item.centerIcourl" className="" />
          </div>
          <div class="layout-navmenu-item-name">{{ item.centerName }}</div>
        </el-menu-item>
      </el-menu>
      <div class="user-info">
        <el-button type="text" class="button">欢迎，{{userName}}</el-button>
        <el-divider direction="vertical"></el-divider>
        <el-button type="text" @click="logout" class="button">退出</el-button>
      </div>
      <el-badge :value="messageCount" class="msg-badge" :hidden="messageCount === 0">
        <icon-svg iconClass="bell" className="icon-bell"></icon-svg>
      </el-badge>
    </div>
  </div>
</template>

<script>
import config from '@/config';
import logo from '@/assets/logo.png';
import { mapActions, mapState } from 'vuex';
import SelectArea from '@/components/selectArea';

export default {
  components: {
    SelectArea,
  },
  data() {
    const { systemName } = config;
    return {
      systemName,
      logo,
      keyword: '',
      showSearch: false,
      visibleLocation: false,
      messageCount: 0,
      options: [],
    };
  },
  computed: {
    ...mapState({
      userName: state => state.user.userName,
      navmenus: state => state.app.portalCenter,
      activeCenter: state => state.app.activeCenter,
      centerViews: state => state.tagsViews.centerViews,
    }),
    activeCenterId() {
      return this.activeCenter ? this.activeCenter.centerId : '';
    },
  },
  methods: {
    ...mapActions('user', ['handleLogout']),
    ...mapActions('app', ['setActiveCenter']),
    handleSelect(centerId) {
      if (centerId === this.activeCenter.centerId) {
        return;
      }
      let activeCenter = null;
      for (let i = 0; i < this.navmenus.length; i += 1) {
        if (centerId === this.navmenus[i].centerId) {
          activeCenter = this.navmenus[i];
          break;
        }
      }
      if (activeCenter && activeCenter.configIsurl === '是') {
        window.open(activeCenter.configUrl);
        return;
      }
      this.setActiveCenter(activeCenter);
      const centerview = this.centerViews[centerId];
      const path = (centerview && centerview.activeView && centerview.activeView.href) || '/';
      this.$router.push(path);
    },
    handleSearch() {
      this.$message({
        type: 'info',
        message: `您搜索了${this.keyword}`,
      });
    },
    logout() {
      this.handleLogout().then(() => {
        this.$router.push({ name: 'Login' });
      });
    },
  },
};
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
