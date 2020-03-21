<!--
 * @Descripttion: 个人二手转移 步骤1
 * @version: 1.0
 * @Author: 胡威
 * @Date: 2020-03-13 13:41:55
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-03-18 15:19:53
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
              <el-form-item label="申请登记事项是否是申请人的真实意愿？" prop="sfzsyy">
                <el-radio v-model="testForm.sfzsyy" :label="selectsqzl[0]">是</el-radio>
                <el-radio v-model="testForm.sfzsyy" :label="selectsqzl[1]">否</el-radio>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="50">
            <el-col :span="12">
              <el-form-item label="申请本次转移登记时，其他按份共有人是否同意？" prop="sfty">
                <el-radio v-model="testForm.sfty" :label="selectsqzl[0]">是</el-radio>
                <el-radio v-model="testForm.sfty" :label="selectsqzl[1]">否</el-radio>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="申请登记的不动产为单独所有还是共有" prop="sfddsy">
                <el-radio v-model="testForm.sfddsy" :label="selectsqzl[0]">是</el-radio>
                <el-radio v-model="testForm.sfddsy" :label="selectsqzl[1]">否</el-radio>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="50">
            <el-col :span="12">
              <el-form-item label="申请登记的不动产是否存在抵押权？" prop="sfdy">
                <el-radio v-model="testForm.sfdy" :label="selectsqzl[0]">是</el-radio>
                <el-radio v-model="testForm.sfdy" :label="selectsqzl[1]">否</el-radio>
                <div v-if="testForm.sfdy === '是'">
                  <el-form-item label="贷款种类" prop="dkzl">
                    <el-radio v-model="testForm.dkzl" label="公积金">公积金</el-radio>
                    <el-radio v-model="testForm.dkzl" label="商业">商业</el-radio>
                    <el-radio v-model="testForm.dkzl" label="其他">其他</el-radio>
                  </el-form-item>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="申请登记的不动产是否存在扩建、加建、改建情况？" prop="sfkuojian">
                <el-radio v-model="testForm.sfkuojian" :label="selectsqzl[0]">是</el-radio>
                <el-radio v-model="testForm.sfkuojian" :label="selectsqzl[1]">否</el-radio>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="50">
            <el-col :span="12">
              <el-form-item label="申请登记的不动产受让方是否申请了货币补贴？(经济适用房填写)" prop="sfhbbt">
                <el-radio v-model="testForm.sfhbbt" :label="selectsqzl[0]">是</el-radio>
                <el-radio v-model="testForm.sfhbbt" :label="selectsqzl[1]">否</el-radio>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="申请登记的不动产是否含有国资成分？(申请主体为单位时填写)" prop="sfhygz">
                <el-radio v-model="testForm.sfhygz" :label="selectsqzl[0]">是</el-radio>
                <el-radio v-model="testForm.sfhygz" :label="selectsqzl[1]">否</el-radio>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="50">
            <el-col :span="12">
              <el-form-item label="申请人是否知晓该不动产权利上存在异议登记并自担风险？(异议登记填写)" prop="sfcdfx">
                <el-radio v-model="testForm.sfcdfx" :label="selectsqzl[0]">是</el-radio>
                <el-radio v-model="testForm.sfcdfx" :label="selectsqzl[1]">否</el-radio>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="其他需要询问的有关事项" prop="qtygsx">
                <el-input v-model="testForm.qtygsx"></el-input>
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
      xz: '',
      testForm: {
        sqzl: '',
        sfzsyy: '',
        sfty: '',
        sfddsy: '',
        sfdy: '',
        dkzl: '',
        sfkuojian: '',
        sfhbbt: '',
        sfhygz: '',
        sfcdfx: '',
        qtygsx: '',
        checked: '',
      },
      selectsqzl: ['是', '否'],
      rules: {
        sqzl: [{ required: true, message: '请选择', trigger: 'change' }],
        sfzsyy: [{ required: true, message: '请选择', trigger: 'change' }],
        sfty: [{ required: true, message: '请选择', trigger: 'change' }],
        sfddsy: [{ required: true, message: '请选择', trigger: 'change' }],
        sfdy: [{ required: true, message: '请选择', trigger: 'change' }],
        dkzl: [{ required: true, message: '请选择', trigger: 'change' }],
        sfkuojian: [{ required: true, message: '请选择', trigger: 'change' }],
        sfhbbt: [{ required: true, message: '请选择', trigger: 'change' }],
        sfhygz: [{ required: true, message: '请选择', trigger: 'change' }],
        sfcdfx: [{ required: true, message: '请选择', trigger: 'change' }],
        qtygsx: [{ required: true, message: '请填写', trigger: 'blur' }],
      },
    };
  },
  computed: {
    ishandle() {
      let buttonStatus = true;
      const f = this.testForm;
      const keyArr = Object.keys(this.testForm);
      let tarr = keyArr.filter(item => this.testForm[item] === '');
      if (f.sfdy === '否') {
        tarr = tarr.filter(item => item !== 'dkzl');
      }
      if (tarr.length < 1) {
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
            sessionStorage.eszyMessage = JSON.stringify(this.testForm);
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
            sessionStorage.eszyMessage = JSON.stringify(this.testForm);
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
