<!--
 * @Descripttion: v1.00
 * @version: v1.00
 * @Author: huwei
 * @Date: 2020-01-08 11:01:12
 * @LastEditors  : huwei
 * @LastEditTime : 2020-01-14 17:56:11
 -->
<template>
  <GeoLayout>
    <template slot="mainBox">
      <mainBox>
        <!-- 我的首页banner集合 -->
        <template slot="banner-content" v-if="false">
          <banner-content></banner-content>
        </template>
        <!-- 主要内容 -->
        <template slot="main-content">
             <p>主要内容</p><p>主要内容</p><p>主要内容</p><p>主要内容</p><p>主要内容</p>
             <p>主要内容</p><p>主要内容</p><p>主要内容</p><p>主要内容</p><p>主要内容</p>
             <p>主要内容</p><p>主要内容</p><p>主要内容</p><p>主要内容</p><p>主要内容</p>
             <p>主要内容</p><p>主要内容</p><p>主要内容</p><p>主要内容</p><p>主要内容</p>
             <p>主要内容</p><p>主要内容</p><p>主要内容</p><p>主要内容</p><p>主要内容</p>
             <p>主要内容</p><p>主要内容</p><p>主要内容</p><p>主要内容</p><p>主要内容</p>
             <p>主要内容</p><p>主要内容</p><p>主要内容</p><p>主要内容</p><p>主要内容</p>
             <p>主要内容</p><p>主要内容</p><p>主要内容</p><p>主要内容</p><p>主要内容</p>
        </template>
        <!-- 底部暂存和提交栏 -->
        <template slot="foot-banner" v-if="false">
          <div class="footflex">
           <div class="foot-btn">
             <ul class="btnList">
               <li><el-button type="primary">暂存</el-button></li>
               <li><el-button type="primary">提交</el-button></li>
              </ul>
            </div>
          </div>
        </template>
      </mainBox>
    </template>
  </GeoLayout>
</template>

<script>
import GeoLayout from '@/layouts/Impersonal';
import mainBox from '@/layouts/Impersonal/mainBox';
import BannerContent from '@/layouts/Impersonal/bannerContent';

export default {
  data() {
    return {};
  },
  components: {
    GeoLayout,
    mainBox,
    BannerContent,
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
@import './index.scss'
</style>
