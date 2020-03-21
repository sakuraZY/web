<!--
 * @Description: 我要查
 * @Author: wangjiayu
 * @Date: 2020-03-19 15:25:01
 * @LastEditors: wangjiayu
 * @LastEditTime: 2020-03-19 16:42:39
 -->

<template>
  <geo-layout :showUserCenter="true" :showSearch="false" :showWeChat="true">
    <template slot="main">
      <header class="query-title">
        <section class="query-title-wrap">
          <el-breadcrumb separator-class="el-icon-arrow-right" class="breadstyle">
            <el-breadcrumb-item :to="{ path: '/p' }" :replace="true">首页
            </el-breadcrumb-item>
            <el-breadcrumb-item v-for="(item, index) in list" :key = index
            :to = "{ path: item.to }" :replace="true">
              {{item.name}}
            </el-breadcrumb-item>
          </el-breadcrumb>
        </section>
      </header>
      <div class="query-content">
        <router-view @setRouterName="setUrlName"></router-view>
      </div>
    </template>
  </geo-layout>
</template>

<script>
import GeoLayout from '@/layouts/Personal';

export default {
  components: {
    GeoLayout,
  },
  data() {
    return {
      list: [
        { name: '我要查', path: '/p' },
        { name: '进度查询', path: '' },
      ],
    };
  },
  methods: {
    setUrlName(val) {
      this.list[1].name = val;
    },
  },
};
</script>

<style lang="scss" >
@import './index.scss';
</style>
