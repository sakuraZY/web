<template>
  <div class="home-main">
    <el-row :gutter="20">
      <el-col
        :sm="12"
        :lg="6"
        v-for="(item, index) in cardPanelList"
        :key="item + index"
        class="card-panel-container"
      >
        <card-panel :data="item" @click.native="handleCardPanel(item)" />
      </el-col>
    </el-row>
    <my-flow />
  </div>
</template>

<script>
import MyFlow from '@/views/Impersonal/MyFlow';
import CardPanel from './CardPanel';

export default {
  name: 'Home',
  components: {
    CardPanel,
    MyFlow,
  },
  data() {
    return {
      cardPanelList: [
        {
          title: '待缴费金额',
          count: 30,
          countType: 'money',
          icon: 'money',
          actionName: '去缴费',
          record: '您有<span class="record-count">1</span>条未缴费的业务',
        },
        {
          title: '暂存件',
          count: 2,
          icon: 'zancunjian',
          actionName: '去提交',
          record: '您有<span class="record-count">2</span>条未完成的暂存业务',
        },
        {
          title: '待办件',
          count: 10,
          icon: 'daibanjian',
          actionName: '查看详情',
          record: '最近代办记录：<span class="record-type">一手转移登记</span>',
        },
        {
          title: '已办件',
          count: 30,
          icon: 'yibanjian',
          actionName: '查看下载',
          record: '最近已办记录: <span class="record-type">二手房登记</span>',
        },
      ],
    };
  },
  methods: {
    handleCardPanel(item) {
      this.$message(item.title + item.count);
    },
  },
};
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
