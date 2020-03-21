<!--
 * @Descripttion: v1.00
 * @version: v1.00
 * @Author: huwei
 * @Date: 2020-01-08 11:01:12
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-03-06 22:37:55
 -->
<template>
  <GeoLayout>
    <!-- <router-view slot="mainBox" :key="activeDate"></router-view> -->
    <el-tab-pane :key="key" v-for="(item, key) in editableTabs"
    slot="mainBox" :class="{isShow: key === tabIndex}">
        <!-- <tab-component :is="item.content" :key="item.state"></tab-component> -->
        <template  v-if="isRouterAlive">
          <keep-alive>
            <router-view :key="$route.fullPath"></router-view>
          </keep-alive>
        </template>
        <template v-else>
          <router-view  :key="$route.fullPath"></router-view>
        </template>
    </el-tab-pane>
  </GeoLayout>
</template>

<script>
import { mapState } from 'vuex';
import GeoLayout from '@/layouts/Impersonal';

export default {
  data() {
    return {};
  },
  components: {
    GeoLayout,
  },
  computed: {
    ...mapState('Impersonal', { activeDate: state => state.activeDate }),
    ...mapState('Impersonal', { editableTabs: state => state.editableTabs }),
    ...mapState('Impersonal', { tabIndex: state => state.tabIndex }),
    ...mapState('Impersonal', { isRouterAlive: state => state.isRouterAlive }),
  },
  updated() {
  },
  methods: {
  },
};
</script>
<style>
.isShow{
  display: block !important;
  height: 100%;
}
</style>
