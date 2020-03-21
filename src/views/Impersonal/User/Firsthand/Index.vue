<!--
 * @Descripttion:  首次登记业务流
 * @version: 1.0
 * @Author: zengying
 * @Date: 2020-02-06 12:04:40
 * @LastEditTime: 2020-03-19 22:56:51
-->
<template>
  <mainBox ref="mbox">
    <!-- 主要内容  -->
    <template #main-content>
      <div class="flex-content mainflowBox">
        <div class="flex-main">
          <div class="stepwrap firtHand-stepwrap">
            <el-steps :active="stepNum">
              <el-step v-for="(item,index) in stepList" :key="index" :title="item"></el-step>
            </el-steps>
          </div>
          <div class="main-fill">
            <building-Table v-show="stepNum === 1" ref="children">
              <template #footMenu>
                <div class="footbtn">
                  <el-button type="primary" @click="handleNext()">确认</el-button>
                  <!-- <el-button>取消</el-button> -->
                </div>
              </template>
            </building-Table>
            <el-row v-if="arrflowstep.includes(2)" v-show="stepNum === 2">
              <el-col :span="21">
                <query-message ref="children" @func="nextStep"></query-message>
              </el-col>
              <el-col :span="3">
                <scorllTabs :list="list" :indexs="indexs" v-if="stepNum === 2"></scorllTabs>
              </el-col>
            </el-row>
            <query-upload v-if="stepNum === 3" ref="children" @func="nextStep" :infoJson="infoJson">
            </query-upload>
            <query-success v-if="arrflowstep.includes(4)" v-show="stepNum === 4" ref="children"
              :infoJson="infoJson"></query-success>
          </div>
        </div>
      </div>
    </template>
    <!-- 底部暂存和提交栏 -->
    <template #foot-banner>
      <div class="footflex" v-if="stepNum >1&&stepNum<4">
        <div class="foot-btn">
          <ul class="btnList">
            <li>
              <el-button type="primary" @click="handlerPrev">上一步</el-button>
            </li>
            <li v-if="stepNum !== 3">
              <el-button type="primary" @click="handlerStorage">暂存</el-button>
            </li>
            <li>
              <el-button type="primary" @click="handlerUp" v-if="stepNum === 2">下一步</el-button>
              <el-button type="primary" @click="handlerUp" v-if="stepNum === 3">提交</el-button>
            </li>
          </ul>
        </div>
      </div>
    </template>
  </mainBox>
</template>
<script>
import { mapState, mapMutations } from 'vuex';
import mainBox from '@/layouts/Impersonal/mainBox';
import buildingTable from '@/components/buildingTable';
import QueryMessage from '@/components/queryMessage';
import QueryUpload from '@/components/queryUpload';
import QuerySuccess from '@/components/querySuccess';
import scorllTabs from '@/components/scrollTabs';

export default {
  name: 'SCDJ',
  components: {
    mainBox,
    buildingTable,
    QueryMessage,
    QueryUpload,
    QuerySuccess,
    scorllTabs,
  },
  data() {
    return {
      stepNum: 1,
      listBefore: [''],
      stepList: ['填写信息', '上传附件', '完成'],
      list: ['不动产数据校验', '登记清单', '完善权利人'],
      indexs: 0,
      infoJson: {
        messJson: ['firstHand', 'MESSAGEJSON'],
        nodeName: ['firstHand', 'NODENAME'],
        parentPnode: 'scdj',
      },
      flowData: [],
    };
  },
  computed: {
    ...mapState('firstHand', { htstybms: state => state.HTSTYBMS }),
    ...mapState('firstHand', { nodename: state => state.NODENAME }),
    ...mapState('firstHand', { flowstep: state => state.FLOWSTEP }),
    ...mapState('firstHand', { arrflowstep: state => state.ARRFLOWSTEP }),
    ...mapState('firstHand', { showhouse: state => state.SHOWHOUSE }),
    ...mapState('firstHand', { scrolltobottom: state => state.SCROLLTOBOTTOM }),
    ...mapState('queryData', { flowdatas: state => state.FlOWDATA }),
    ...mapState('Impersonal', { historyArray: state => state.historyArray }),
  },
  methods: {
    ...mapMutations('firstHand', {
      GO_NEXT: 'GO_NEXT',
    }),
    ...mapMutations('firstHand', {
      SET_SHOWHOUSE: 'SET_SHOWHOUSE',
    }),
    ...mapMutations('firstHand', {
      SET_ARRFLOWSTEP: 'SET_ARRFLOWSTEP',
    }),
    ...mapMutations('firstHand', {
      ADD_ARRFLOWSTEP: 'ADD_ARRFLOWSTEP',
    }),
    ...mapMutations('firstHand', {
      RESET_ARRFLOWSTEP: 'RESET_ARRFLOWSTEP',
    }),
    ...mapMutations('firstHand', {
      SET_SCROLLTOBOTTOM: 'SET_SCROLLTOBOTTOM',
    }),
    ...mapMutations('firstHand', { setMessJson: 'SET_MESSAGEJSON' }),
    ...mapMutations('firstHand', { setNodeName: 'SET_NODENAME' }),
    handleNext() {
      if (this.checkedH()) {
        this.stepNum += 1;
        this.ADD_ARRFLOWSTEP(this.stepNum);
        this.GO_NEXT(this.stepNum);
      }
    },
    checkedH() {
      if (this.htstybms.length === 0) {
        this.$alert('请选择户进行登记', '友情提示', {
          confirmButtonText: '确定',
          type: 'warning',
        });
        return false;
      }
      return true;
    },
    scrollEvent() {
      if (this.scrolltobottom) {
        this.scrollToBottom();
      }
    },
    scrollToBottom() {
      if (this.scrollDom.scrollTop < this.scrollDom.scrollHeight) {
        this.scrollDom.scrollTop = this.scrollDom.scrollHeight;
      }
    },
    handlerUp() { // 触发子组件里的上传事件
      this.$refs.children.handlerUp();
    },
    handlerStorage() { // 触发子组件里的暂存事件
      this.$refs.children.handlerStorage();
    },
    nextStep(num) {
      this.stepNum += num;
      this.SET_ARRFLOWSTEP([this.stepNum]);
    },
    handlerPrev() {
      this.stepNum -= 1;
      this.SET_ARRFLOWSTEP([this.stepNum]);
    },
    ...mapMutations('firstHand', { REST_STATE: 'REST_STATE' }),
  },
  mounted() {
    this.scrollDom = this.$refs.mbox.$refs.maincontent;
  },
  created() {
    const t = this;
    const { sqbh } = t.$route.params;
    if (sqbh) {
      const curFlowData = t.flowdatas.filter(p => p && p.sqbh === sqbh);
      if (curFlowData && curFlowData.length > 0) {
        const [{ data, step }] = curFlowData;
        t.flowData = data;
        if (step) {
          while (this.stepNum < step) {
            this.stepNum += 1;
            this.ADD_ARRFLOWSTEP(this.stepNum);
            this.GO_NEXT(this.stepNum);
          }
        }
      }
    }
  },
  destroyed() {
    this.SET_SHOWHOUSE(false);
    this.RESET_ARRFLOWSTEP([1]);
    this.scrollDom.removeEventListener('scroll', this.scrollToBottom);
  },
  watch: {
    scrolltobottom(val) {
      this.$nextTick(() => {
        if (val) {
          this.scrollDom.addEventListener('scroll', this.scrollToBottom);
          this.scrollEvent();
          this.SET_SCROLLTOBOTTOM(false);
          this.scrollDom.removeEventListener('scroll', this.scrollToBottom);
        }
      });
    },
  },
};
</script>

<style lang="scss" type="text/scss" >
@import "./index.scss";
</style>
