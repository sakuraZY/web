<!--
 * @Descripttion: v1.00
 * @version: v1.00
 * @Author: huwei
 * @Date: 2020-01-08 11:42:49
 * @LastEditors  : Please set LastEditors
 * @LastEditTime : 2020-02-17 15:28:45
 -->
<template>
  <div class="layout-header">
    <div class="head-logo">
      <div class="logo"></div>
      <h3>{{ systemName }}</h3>
    </div>
    <div class="head-right">
      <div class="layout-search">
        <el-input
          placeholder="输入关键字查询"
          v-model="keyword"
          size="medium"
          v-if="showSearch"
        >
        <template slot="suffix">
          <icon-svg iconClass="search" className="icon-search" @click="searchHandle"></icon-svg>
        </template>
        </el-input>
      </div>
      <div class="layout-welcome">
        <span>欢迎，{{userName}}</span>
        <a @click="clickLogout">退出</a>
        <div class="news" @click="handleNews">
            <icon-svg iconClass="bell" class="icon-bell"/>
            <i class="news-number" v-if="newsNumber">{{newsNumber}}</i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import config from '@/config';
import { mapActions, mapState } from 'vuex';

export default {
  data() {
    const { systemName } = config;
    return {
      keyword: '',
      showSearch: false,
      newsNumber: 0,
      systemName,
    };
  },
  computed: {
    ...mapState('user', [
      'userName',
    ]),
  },
  methods: {
    ...mapActions('user', ['handleLogout']),
    clickLogout() {
      this.handleLogout().then(() => {
        this.$router.push({ name: 'Login' });
      });
    },
    searchHandle() {
      this.$message({
        type: 'success',
        message: `您搜索了${this.keyword}`,
      });
    },
    handleNews() {
      if (!this.newsNumber) {
        this.$message({
          type: 'info',
          message: '您没有新消息',
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
 @import './index.scss'
</style>
