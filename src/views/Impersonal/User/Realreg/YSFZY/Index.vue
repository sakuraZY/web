<!--
 * @Descripttion:  一手房转移
 * @version: 1.0
 * @Author: huwei
 * @Date: 2020-03-15 12:04:40
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-03-16 14:21:21
 -->
<template>
  <mainBox ref="mbox">
    <!-- 主要内容  -->
    <template slot="main-content">
      <div class="flex-content mainflowBox">
        <div class="flex-main">
          <div class="stepwrap firtHand-stepwrap">
            <el-steps :active="stepNum">
              <el-step v-for="(item,index) in stepList" :key="index"
              :title="item"></el-step>
            </el-steps>
          </div>
          <div class="main-fill">
             <div v-if="stepNum === 2">
                <query-upload ref="children2" @func="handleNext" :infoJson="infoJson">
                </query-upload>
             </div>
            <el-row  v-show="stepNum === 1">
              <el-col :span="21">
                <query-ysfzy ref="children" @func="menuTrans" @funcNext="handleNext">
                </query-ysfzy>
              </el-col>
              <el-col :span="3">
                <scorllTabs :list = "list" :indexs="indexs" v-if="isShow"></scorllTabs>
                <scorllTabs :list = "listBefore" :indexs="indexs" v-else></scorllTabs>
              </el-col>
            </el-row>
             <query-success v-if="stepNum === 3" ref="children"
             :infoJson="infoJson"></query-success>
          </div>
        </div>
      </div>
    </template>
    <!-- 底部暂存和提交栏 -->
    <template slot="foot-banner">
      <div class="footflex" v-if="stepNum<3">
        <div class="foot-btn">
          <ul class="btnList">
            <li v-if="stepNum === 2">
              <el-button type="primary" @click.stop="handlerPrev" plain>上一步</el-button>
            </li>
            <li v-if="stepNum === 1">
              <el-button type="primary" @click.stop="handlerStorage('children')">暂存</el-button>
            </li>
            <li v-if="stepNum === 2">
              <el-button type="primary" @click.stop="handlerUp('children2')">提交</el-button>
            </li>
            <li v-if="stepNum === 1">
              <el-button type="primary" @click.stop="handlerUp('children')">下一步</el-button>
            </li>
          </ul>
        </div>
      </div>
    </template>
  </mainBox>
</template>
<script>
import { submitUrlYSZY } from '@/apis/nres/zxtj';
import mainBox from '@/layouts/Impersonal/mainBox';
import QueryYsfzy from '@/components/realReg/ysfzy';
import QueryUpload from '@/components/queryUpload';
import QuerySuccess from '@/components/querySuccess';
import scorllTabs from '@/components/scrollTabs';

export default {
  name: 'YSFZY',
  components: {
    mainBox,
    QueryYsfzy,
    QueryUpload,
    QuerySuccess,
    scorllTabs,
  },
  data() {
    return {
      stepNum: 1,
      stepList: ['填写信息', '上传附件', '完成'],
      listBefore: ['不动产数据检验'],
      list: ['不动产数据检验', '权利人信息', '义务人信息', '不动产权信息'],
      isShow: 0,
      indexs: 0,
      infoJson: {
        messJson: ['ysfzy', 'MESSAGEJSON'],
        nodeName: ['ysfzy', 'NODENAME'],
        submitUrl: submitUrlYSZY,
        parentPnode: 'yszy',
      },
    };
  },
  methods: {
    handleNext() {
      this.stepNum += 1;
    },
    handlerUp(cname) { // 触发子组件里的上传事件
      this.$refs[cname].handlerUp();
    },
    handlerStorage(cname) { // 触发子组件里的暂存事件
      this.$refs[cname].handlerStorage();
    },
    handlerPrev() {
      this.stepNum -= 1;
    },
    menuTrans(v) {
      this.isShow = v;
    },
  },
};
</script>

<style src="./index.scss" lang='scss' scoped>
</style>
