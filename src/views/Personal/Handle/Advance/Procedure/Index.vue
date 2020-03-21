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
      <queryAdvance v-show="stepNum === 2" @funcNext="stepNext"></queryAdvance>
      <queryUpload v-if="stepNum === 3" @funcPrev="stepPrev" @func="stepNext"
      :infoJson = "infoJson"></queryUpload>
      <query-success v-if="stepNum === 4" ref="children"
             :infoJson="infoJson"></query-success>
    </div>
  </div>
</template>

<script>
import { submitUrlYGDJ } from '@/apis/nres/zxtj';
import queryAsk from '@/components/personAdvance/queryAsk';
import queryAdvance from '@/components/personAdvance/queryAdvance';
import queryUpload from '@/components/personAdvance/queryUpload';
import QuerySuccess from '@/components/personAdvance/querySuccess';
import { mapMutations } from 'vuex';

export default {
  components: {
    queryAsk,
    queryAdvance,
    queryUpload,
    QuerySuccess,
  },
  data() {
    return {
      stepNum: 1,
      pageName: '预告登记',
      stepList: ['申请询问', '填写信息', '上传附件', '完成'],
      infoJson: {
        messJson: ['advance', 'MESSAGEJSON'],
        nodeName: ['advance', 'NODENAME'],
        submitUrl: submitUrlYGDJ,
        parentPnode: 'ygdj',
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
