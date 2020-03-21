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
      <queryESzy v-show="stepNum === 2" @funcNext="stepNext"></queryESzy>
      <queryUpload v-if="stepNum === 3" @funcPrev="stepPrev" @func="stepNext"
      :infoJson = "infoJson"></queryUpload>
      <query-success v-if="stepNum === 4" ref="children"
             :infoJson="infoJson"></query-success>
    </div>
  </div>
</template>

<script>
import { submitUrlESZY } from '@/apis/nres/zxsq';
import queryAsk from '@/components/personEszy/queryAsk';
import queryESzy from '@/components/personEszy/queryEszy';
import queryUpload from '@/components/personAdvance/queryUpload';
import QuerySuccess from '@/components/personAdvance/querySuccess';
import { mapMutations } from 'vuex';

export default {
  components: {
    queryAsk,
    queryESzy,
    queryUpload,
    QuerySuccess,
  },
  data() {
    return {
      stepNum: 1,
      pageName: '二手房转移登记',
      stepList: ['申请询问', '填写信息', '上传附件', '完成'],
      infoJson: {
        messJson: ['eszy', 'MESSAGEJSON'],
        nodeName: ['eszy', 'NODENAME'],
        submitUrl: submitUrlESZY,
        parentPnode: 'eszy',
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
