<!--
 * @Descripttion:  查看详情
 * @version: 1.0
 * @Author: zengying
 * @Date: 2020-03-02 15:36:12
 * @LastEditors: zengying
 * @LastEditTime: 2020-03-20 14:00:18
 -->
<template>
  <main-box ref="mbox">
    <!-- 主要内容  -->
    <template #main-content>
      <component :is="comName"></component>
      <div class="attchDiv">
        <h3>附件信息</h3>
        <attachment :attachmentMess="attachmentMess"></attachment>
      </div>
    </template>
  </main-box>
</template>

<script>
import { mapState } from 'vuex';
import MainBox from '@/layouts/Impersonal/mainBox';
import attachment from '@/components/attachment';
import mainComp from '@/config/comps';

export default {
  name: 'FlowDetail',
  data() {
    return {
      comName: '',
      attachmentMess: {
        parentPnode: '',
        sqbh: '',
      },
    };
  },
  components: {
    MainBox,
    attachment,
    ...mainComp,
  },
  computed: {
    ...mapState('queryData', { flowdatas: state => state.FlOWDATA }),
  },
  mounted() {
    this.$nextTick(() => {
      const { sqbh } = this.$route.params;
      if (sqbh && this.flowdatas) {
        const [{ flowdata }] = this.flowdatas.filter(p => p.sqbh === sqbh);
        this.initData(flowdata);
      }
    });
  },
  methods: {
    initData(data) {
      const t = this;
      const { sqbh, ywlxbm } = data;
      this.$set(t, 'comName', ywlxbm);
      Object.assign(this.attachmentMess, {
        sqbh,
        parentPnode: ywlxbm,
      });
    },
  },
};

</script>
<style lang='scss' scoped>
@import "./index.scss";
.attchDiv {
  padding: 0 20px;
}
</style>
