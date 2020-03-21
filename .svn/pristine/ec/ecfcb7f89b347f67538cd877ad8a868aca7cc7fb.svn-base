<!--
 * @Descripttion: v1.00
 * @version: v1.00
 * @Author: huwei
 * @Date: 2020-01-15 14:40:02
 * @LastEditors  : huwei
 * @LastEditTime : 2020-01-17 09:12:39
 -->
<template>
    <mainBox>
        <!-- 主要内容 -->
        <template slot="main-content">
          <p ref="test">预告以及抵押预告登记</p>
        </template>
        <!-- 底部暂存和提交栏 -->
        <template slot="foot-banner">
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

<script>
import mainBox from '@/layouts/Impersonal/mainBox';

export default {
  name: 'UserBeforehand',
  data() {
    return {};
  },
  components: {
    mainBox,
  },
  mounted() {
    // 测试刷新当前页面
    setTimeout(() => {
      this.$refs.test.innerHTML += 'new add';
    }, 1000);
  },
  methods: {},
};
</script>
