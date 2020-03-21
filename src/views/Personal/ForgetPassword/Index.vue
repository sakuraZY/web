<!--
 * @Descripttion: 忘记密码
 * @version: 1.0
 * @Author: zengying
 * @Date: 2020-02-21 12:23:36
 * @LastEditors: zengying
 * @LastEditTime: 2020-03-04 12:31:31
 -->
<template>
  <geo-layout :showUserCenter="true" :showSearch="false" :showWeChat="true">
    <template #main>
      <div class="forgetPassword">
        <header class="tit">
          <section class="tit-wrap">
            <h3>忘记密码</h3>
          </section>
        </header>
        <div class="main">
          <div class="main-tit">
            <h3>找回密码</h3>
          </div>
          <div>
            <flow-Password>

            </flow-Password>
          </div>
        </div>
      </div>
    </template>
  </geo-layout>
</template>
<script>
import GeoLayout from '@/layouts/Personal';
import flowPassword from '@/components/userInfo/forgetPassword';

export default {
  components: {
    GeoLayout,
    flowPassword,
  },
};

</script>
<style lang='scss' scoped>
@import "./index.scss";
</style>
