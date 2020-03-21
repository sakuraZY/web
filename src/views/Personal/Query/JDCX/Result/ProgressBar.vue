<!--
 * @Description: 步骤条组件
 * @Author: wangjiayu
 * @Date: 2020-03-20 16:56:32
 * @LastEditors: wangjiayu
 * @LastEditTime: 2020-03-20 20:59:25
 -->

<template>
  <div class="progress-bar-contanier">
    <el-steps :active="activeStepIndex">
      <el-step
        v-for="(item, index) in stepArr"
        :key="index + item"
        :title="item"
      >
        <template slot="icon">
          <icon-svg iconClass="daibanjian" className="daibanjian-icon"></icon-svg>
        </template>
      </el-step>
    </el-steps>
  </div>
</template>

<script>
import { queryByDicname } from '@/apis/sysmgr/dicItem';

export default {
  props: {
    exisitStep: Array, // 已办理的步骤
  },
  data() {
    return {
      stepArr: [], // 办理步骤
      stepObj: {}, // 步骤转译对象
      activeStepIndex: 0, // 当前办理步骤索引
      activeStepName: '', // 当前办理步骤索引
      activeStepState: false, // true表示已完成，false表示办理中
    };
  },
  mounted() {
    this.getBusinessStep();
    this.getActiveStepIndex();
  },
  watch: {
    exisitStep() {
      this.getActiveStepIndex();
    },
  },
  methods: {
    // 获取业务步骤信息
    getBusinessStep() {
      queryByDicname('进度查询步骤转义')
        .then(({ code, resData: { dicitemTree = [] } = {} } = {}) => {
          if (code === 0 && this.isArrayRight(dicitemTree)) {
            this.stepDic = dicitemTree;
            this.getStepArr(dicitemTree);
            this.getActiveStepIndex();
          } else {
            this.$message.error('未查询到步骤信息');
          }
        }, (err) => {
          throw new Error(err);
        });
    },
    // 获取办理步骤数据
    getStepArr(stepDic) {
      if (!this.isArrayRight(stepDic)) {
        return;
      }
      const orderedStepDic = stepDic.sort(this.compare('itemSortnum'));
      const stepArr = [];
      const stepObj = {};
      orderedStepDic.forEach((item) => {
        if (!stepArr.includes(item.itemValue)) {
          stepArr.push(item.itemValue);
        }
        stepObj[item.name] = item.itemValue;
      });
      this.stepArr = stepArr;
      this.stepObj = stepObj;
    },
    // 获取当前办理步骤索引
    getActiveStepIndex() {
      if (!Array.isArray(this.exisitStep) || !this.exisitStep.length) {
        return;
      }
      let activeStepIndex = 0;
      let activeStepName = this.stepArr[0];
      let isDone = false;
      this.exisitStep.forEach((item) => {
        const tempStepName = this.stepObj[item.step];
        if (tempStepName) {
          const tempIndex = this.stepArr.indexOf(tempStepName);
          if (tempIndex > activeStepIndex) {
            activeStepIndex = tempIndex;
            activeStepName = tempStepName;
            isDone = !!item.time;
          }
        }
      });
      // 如果当前步骤已办理完，则跳到下一步骤
      if (isDone) {
        // 如果当前步骤不是最后一步，则跳到下一步，并改变办理状态
        if (activeStepIndex !== this.stepArr.length - 1) {
          isDone = false;
        }
        activeStepIndex += 1;
      }
      this.activeStepIndex = activeStepIndex;
      this.activeStepName = activeStepName;
      this.activeStepState = isDone;
    },
    // 判断是否为最后一步
    isLastStep() {
      return this.activeStepIndex === this.stepArr.length - 1;
    },
    // 判断是否为有效数组
    isArrayRight(arr) {
      if (Array.isArray(arr) && arr.length) {
        return true;
      }
      return false;
    },
    // 对象集合排序方法
    compare(property) {
      const compareData = (a, b) => {
        const value1 = a[property];
        const value2 = b[property];
        return value1 - value2;
      };
      return compareData;
    },
  },
};
</script>

<style lang="scss" scoped>
.progress-bar-contanier {
  /deep/.el-step__line {
    top: 20px;
    left: 60px;
    right: 20px;
  }
  /deep/.el-step__icon {
    border: none;
    width: 40px;
    height: 40px;
    font-size: 40px;
  }
}
</style>
