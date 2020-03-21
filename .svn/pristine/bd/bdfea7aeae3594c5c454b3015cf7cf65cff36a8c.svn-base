<!--
 * @Author: huwei
 * @Date: 2020-02-04 15:07:46
 * @
# Description:
 -->
<template>
  <div class="geo-header">
    <div class="geo-header-left">
      <div class="logo"></div>
      <div class="system-name hidden-md-and-down">
        <div class="system-name-main">{{ systemName }}</div>
        <div class="system-name-sub">{{ subSystemName }}</div>
      </div>
    </div>
    <select-area v-if="showUserCenter"></select-area>
    <div class="geo-header-medium hidden-sm-and-down" v-if="showSearch">
      <el-input class="geo-input" v-model="keyword" placeholder="请输入关键字查询">
        <template slot="suffix">
          <icon-svg iconClass="search" className="icon-search" @click="handleSearch"></icon-svg>
        </template>
      </el-input>
    </div>
    <div class="geo-header-right">
      <div class="workon-wechat hidden-xs-only" v-if="showWeChat">
        <icon-svg iconClass="wechat" className="icon-wechat"></icon-svg>
        <span>微信上办事</span>
      </div>
      <div class="user-center" v-if="showUserCenter">
        <div class="user-info" v-if="!!token">
          <el-button type="text" size="medium">欢迎, {{ userName }}</el-button>
          <span class="line"></span>
          <el-button type="text" size="medium" @click="handleLogout">退出</el-button>
        </div>
        <div class="user-center-link" v-else>
          <el-button type="text" size="medium" @click="gotoLogin">登录</el-button>
          <!-- <span class="line"></span>
          <el-button type="text" size="medium" @click="gotoRegister">注册</el-button> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import config from '@/config';
import SelectArea from '@/components/selectArea';

const { systemName, subSystemName } = config;
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
  },
  components: {
    SelectArea,
  },
  data() {
    return {
      systemName,
      subSystemName,
      keyword: '',
    };
  },
  computed: {
    ...mapState('user', [
      'userName',
      'token',
    ]),
  },
  methods: {
    ...mapActions('user', ['handleLogout']),
    handleSearch() {
      this.$message({
        type: 'success',
        message: `您搜索了${this.keyword}`,
      });
    },
    gotoLogin() {
      this.$router.push({ name: 'Login' });
    },
    gotoRegister() {
      this.$router.push({ name: 'Register' });
    },
  },
};
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
