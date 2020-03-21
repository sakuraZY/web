<!--
 * @Description: 进度查询结果界面
 * @Author: wangjiayu
 * @Date: 2020-03-19 15:08:44
 * @LastEditors: wangjiayu
 * @LastEditTime: 2020-03-21 09:56:21
 -->

<template>
  <div class="jdcxjg-box">
    <div class="jdcxjg-box-title">
      <h3>进度查询</h3>
    </div>
    <div class="jdcxjg-box-content">
      <div class="jdcxjg-title">
        {{resultData.slbh + '业务进展查询结果'}}
      </div>
      <div class="progress-bar">
        <progress-bar ref="progressBar" :exisitStep="resultData.progress"></progress-bar>
      </div>
      <div class="jdcxjg-state">
        <label>办理进度：</label>
        <label class="state-text">{{state}}</label>
        <label class="state-note">{{stateNote}}</label>
      </div>
      <div class="jdcxjg-detail">
        <div class="detail-item">
          <label>受理编号：{{resultData.slbh}}</label>
        </div>
        <div class="detail-item">
          <label>业务类型：{{resultData.procName + '  ' + resultData.qlrmc}}</label>
        </div>
        <div class="detail-item">
          <label>权利人：{{resultData.qlrmc}}</label>
        </div>
        <div class="detail-item">
          <label>受理时间：{{resultData.acceptTime}}</label>
        </div>
        <div class="jg">
          <div>武大吉奥信息技术有限公司</div>
          <div>{{getNowDay()}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { formatDate } from '@/libs/date';
import ProgressBar from './ProgressBar.vue';

export default {
  name: 'JDCXJG',
  components: {
    ProgressBar,
  },
  data() {
    return {
      resultData: { // 进度查询结果
        slbh: '',
        procName: '',
        qlrmc: '',
        acceptTime: '',
        progress: [],
      },
      state: '', // 办理进度
      stateNote: '', // 办理进度备注
    };
  },
  mounted() {
    this.resultData = Object.assign(this.resultData, this.$route.params.data);
    this.getStateInfo();
  },
  methods: {
    // 获取办理进度状态
    getStateInfo() {
      const state = this.$refs.progressBar.activeStepState;
      this.state = state ? '已完成' : '办理中';
      if (state && this.$refs.progressBar.isLastStep()) {
        this.stateNote = '（该业务流程已办理完成，若未取证，请携带相关申请人身份证明，前往武大吉奥信息技术有限公司办事大厅办理取证）';
      }
    },
    // 获取今天日期
    getNowDay() {
      return formatDate(new Date(), 5);
    },
  },
};
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
