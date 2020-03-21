<!--
 * @Author: huwei
 * @Date: 2020-02-05 10:03:57
 * @
# Description:
 -->
<template>
  <div>
    <div class="text_tt">
      <h3>{{pageName}}</h3>
    </div>
    <div class="stepwrap firtHand-stepwrap">
      <el-steps :active="stepNum">
        <el-step v-for="(item,index) in stepList" :key="index"
        :title="item"></el-step>
      </el-steps>
    </div>
    <div class="pmain">
      <queryAsk v-if="stepNum === 1" @func="stepNext"></queryAsk>
      <queryYsfzy v-show="stepNum === 2" @funcNext="stepNext"></queryYsfzy>
      <queryUpload v-if="stepNum === 3" @funcPrev="stepPrev" @func="stepNext"
      :infoJson = "infoJson"></queryUpload>
      <query-success v-if="stepNum === 4" ref="children"
             :infoJson="infoJson"></query-success>
    </div>
  </div>
</template>

<script>
import { submitUrlYSZY } from '@/apis/nres/zxtj';
import queryAsk from '@/components/personYsfzy/queryAsk';
import queryYsfzy from '@/components/personYsfzy/queryYsfzy';
import queryUpload from '@/components/personAdvance/queryUpload';
import QuerySuccess from '@/components/personAdvance/querySuccess';
import { mapMutations } from 'vuex';

export default {
  components: {
    queryAsk,
    queryYsfzy,
    queryUpload,
    QuerySuccess,
  },
  data() {
    return {
      stepNum: 1,
      pageName: '一手房转移登记',
      stepList: ['申请询问', '填写信息', '上传附件', '完成'],
      infoJson: {
        messJson: ['ysfzy', 'MESSAGEJSON'],
        nodeName: ['ysfzy', 'NODENAME'],
        submitUrl: submitUrlYSZY,
        parentPnode: 'yszy',
      },
    };
  },
  mounted() {
    this.$emit('getRouterName', this.pageName);
  },
  methods: {
    ...mapMutations('advance', { resetMessageData: 'REST_MESSAGEDATA' }),
    stepNext() {
      this.stepNum += 1;
    },
    stepPrev() {
      this.stepNum -= 1;
    },
  },
  beforeDestroy() {
    this.resetMessageData();
  },
};
</script>

<style lang="scss">
@import './index.scss';
</style>
