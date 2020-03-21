<!--
 * @Descripttion:  我的办件
 * @version: 1.0
 * @Author: zengying
 * @Date: 2020-02-19 16:51:56
 * @LastEditors: zengying
 * @LastEditTime: 2020-03-18 08:49:57
 -->
<template>
  <mainBox>
    <!-- 主要内容 -->
    <template #main-content>
      <div class="myflow">
        <el-tabs type="border-card">
          <el-tab-pane>
            <span slot="label">暂存件<em class="tab-number">({{mytempFlowCount}})</em></span>
            <My-Flows ref="tempFlow" :ajzt="0"></My-Flows>
          </el-tab-pane>
          <el-tab-pane>
            <span slot="label">待办件<em class="tab-number">({{myextraFlowCount}})</em></span>
            <My-Flows ref="extraFlow" :ajzt="1"></My-Flows>
          </el-tab-pane>
          <el-tab-pane slot="label">
            <span slot="label">已办件<em class="tab-number">({{myfinishedFlowCount}})</em></span>
            <My-Flows ref="finishedFlow" :ajzt="4"></My-Flows>
          </el-tab-pane>
        </el-tabs>
      </div>
    </template>
  </mainBox>
</template>

<script>
import { mapState } from 'vuex';
import mainBox from '@/layouts/Impersonal/mainBox';
import MyFlows from '@/components/queryFlows';

export default {
  name: 'MyFlow',
  components: {
    mainBox,
    MyFlows,
  },
  computed: {
    ...mapState('queryData', { mytempFlowCount: state => state.MYTEMPFLOWCOUNT }),
    ...mapState('queryData', { myextraFlowCount: state => state.MYEXTRAFLOWCOUNT }),
    ...mapState('queryData', { myfinishedFlowCount: state => state.MYFINISHEDFLOWCOUNT }),
  },
};

</script>
<style lang='scss' scoped>
@import "./index.scss";
</style>
