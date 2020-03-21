<template>
  <el-form
    ref="registerForm"
    :model="registerForm"
    class="register-info"
    label-width="240px"
    size="medium"
  >
    <div class="register-info-title">
      <span class="register-info-title-main">法人与企业信息</span>
    </div>
    <el-form-item label="法定代表人/负责人姓名：">
      <el-input v-model="registerForm.name"></el-input>
    </el-form-item>
    <el-form-item label="法定代表人/负责人身份证号码：">
      <el-input v-model="registerForm.name"></el-input>
    </el-form-item>
    <el-form-item label="企业全称/机构全称：">
      <el-input v-model="registerForm.name"></el-input>
    </el-form-item>
    <el-form-item label="统一社会信用代码：">
      <el-input v-model="registerForm.name"></el-input>
    </el-form-item>
    <el-form-item label="所在地区：">
      <el-select v-model="registerForm.region" placeholder="请选择所在地区" style="width: 100%">
        <el-option label="区域一" value="shanghai"></el-option>
        <el-option label="区域二" value="beijing"></el-option>
      </el-select>
    </el-form-item>
    <div class="register-info-title">
      <span class="register-info-title-main">联系人与验证信息</span>
      <span class="register-info-title-sub">联系人指本系统具体操作管理人员，一般为注册企业的在职员工</span>
    </div>
    <el-form-item label="联系人姓名：">
      <el-input v-model="registerForm.name"></el-input>
    </el-form-item>
    <el-form-item label="联系人身份证号：">
      <el-input v-model="registerForm.name"></el-input>
    </el-form-item>
    <el-form-item label="设置密码：">
      <el-input v-model="registerForm.name"></el-input>
    </el-form-item>
    <el-form-item label="确认密码：">
      <el-input v-model="registerForm.name"></el-input>
    </el-form-item>
    <el-form-item label="联系人手机号：">
      <el-input v-model="registerForm.name"></el-input>
    </el-form-item>
    <el-form-item label="短信验证码：">
      <div class="register-info-item">
        <el-input v-model="registerForm.name" class="register-info-item-main"></el-input>
        <el-button plain>获取验证码</el-button>
      </div>
    </el-form-item>
    <el-form-item label="图片验证码：">
      <div class="register-info-item">
        <el-input v-model="registerForm.name" class="register-info-item-main"></el-input>
        <identify class="verify-code" ref="verifyCode" :contentHeight="38"></identify>
      </div>
    </el-form-item>
    <el-form-item>
      <el-checkbox v-model="isReaded">
        我已经阅读同意
        <el-link type="primary" :underline="false">《注册协议》</el-link>
      </el-checkbox>
    </el-form-item>
    <el-form-item>
      <el-button plain>重置</el-button>
      <el-button type="primary">下一步</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import Identify from '@/components/identify';

export default {
  components: {
    Identify,
  },
  data() {
    return {
      isReaded: false,
      registerForm: {
        region: '',
        name: '',
      },
    };
  },
};
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
