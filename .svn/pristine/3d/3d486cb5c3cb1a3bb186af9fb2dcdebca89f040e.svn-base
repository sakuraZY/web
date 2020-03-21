<!--
 * @Descripttion: 个人预告登记 步骤1
 * @version: 1.0
 * @Author: 胡威
 * @Date: 2020-03-4 13:41:55
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-03-13 22:01:34
 -->
<template>
  <div class="person_main">
    <header class="person_tt">
      <h3>申请询问</h3>
    </header>
    <div class="person_select">
      <el-form
            :model="testForm"
            :rules="rules"
            ref="testForm"
            label-width="120px"
            label-position="top"
            class="demo-ruleForm"
            size="medium"
          >
          <el-row :gutter="50">
            <el-col :span="12">
              <el-form-item label="提交的申请登记材料是否真实有效？" prop="sqzl">
                <el-radio v-model="testForm.sqzl" :label="selectsqzl[0]">是</el-radio>
                <el-radio v-model="testForm.sqzl" :label="selectsqzl[1]">否</el-radio>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="申请登记的不动产是否登记为共有？" prop="sfgy">
                <el-radio v-model="testForm.sfgy" :label="selectsqzl[0]">是</el-radio>
                <el-radio v-model="testForm.sfgy" :label="selectsqzl[1]">否</el-radio>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="50">
            <el-col :span="12">
              <el-form-item label="申请登记时申请人婚姻登记状况是否为未婚？" prop="sfwh">
                <el-radio v-model="testForm.sfwh" :label="selectsqzl[0]">是</el-radio>
                <el-radio v-model="testForm.sfwh" :label="selectsqzl[1]">否</el-radio>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="其他事项？" prop="qtsx">
                <el-input v-model="testForm.qtsx" placeholder="请输入内容"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="50">
            <el-col :span="24" class="center">
              <el-checkbox v-model="testForm.checked">以上询问回答真实、无误</el-checkbox>
            </el-col>
          </el-row>
      </el-form>
    </div>
    <div class="bot_btn">
       <el-button type="primary" plain @click="handleStorage">暂存</el-button>
       <el-button type="info" disabled v-if="ishandle">下一步</el-button>
       <el-button type="primary" v-else @click="handleNext">下一步</el-button>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      testForm: {
        sqzl: '',
        sfgy: '',
        sfwh: '',
        qtsx: '',
        checked: '',
      },
      selectsqzl: ['是', '否'],
      rules: {
        sqzl: [{ required: true, message: '请选择', trigger: 'change' }],
        sfgy: [{
          required: true, // 是否必填
          message: '必须选择一个', // 规则
          trigger: 'focus', // 何事件触发
        }],
        sfwh: [{
          required: true, // 是否必填
          message: '必须选择一个', // 规则
          trigger: 'blur', // 何事件触发
        }],
        qtsx: [{
          required: true, // 是否必填
          message: '不能空', // 规则
          trigger: 'blur', // 何事件触发
        }],
      },
    };
  },
  computed: {
    ishandle() {
      let buttonStatus = true;
      const f = this.testForm;
      if (f.sqzl && f.sfgy && f.sfwh && f.qtsx && f.checked) {
        buttonStatus = false;
      } else {
        buttonStatus = true;
      }
      return buttonStatus;
    },
  },
  methods: {
    handleStorage() {
      this.$refs.testForm.validate((valid) => {
        if (valid) {
          if (this.testForm.checked) {
            sessionStorage.personMessage = JSON.stringify(this.testForm);
            this.$message.success('暂存成功');
          } else {
            this.$message.error('请确认以上询问回答真实、无误');
          }
        }
      });
    },
    handleNext() {
      this.$refs.testForm.validate((valid) => {
        if (valid) {
          if (this.testForm.checked) {
            sessionStorage.personMessage = JSON.stringify(this.testForm);
            this.$emit('func');
          } else {
            this.$message.error('请确认以上询问回答真实、无误');
          }
        }
      });
    },
  },
};
</script>

<style src="./index.scss" lang='scss' scoped>
</style>
