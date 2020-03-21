<!--
 * @Descripttion:  找回密码
 * @version: 1.0
 * @Author: zengying
 * @Date: 2020-02-21 13:26:26
 * @LastEditors: zengying
 * @LastEditTime: 2020-03-21 11:41:09
 -->

<template>
  <div class="flex-content mainflowBox">
    <div class="flex-main">
      <div class="stepwrap process-stepwrap">
        <el-steps :active="stepNum">
          <el-step title="验证身份"></el-step>
          <el-step title="设置新密码"></el-step>
          <el-step title="完成"></el-step>
        </el-steps>
      </div>
      <div class="main-fill">
        <div class="checkID each-content" v-show='stepNum === 1'>
          <el-form :model="checkIDForm" :rules="checkIDRules" ref="checkIDForm" label-width="150px"
            class="demo-ruleForm">
            <el-row>
              <el-col :span='24'>
                <el-form-item label="手机号码：" prop="mobile">
                  <el-input v-model.trim="checkIDForm.mobile" placeholder="输入注册的手机号码"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span='16'>
                <el-form-item label="动态验证码：" prop="code">
                  <el-input v-model.trim="checkIDForm.code" placeholder="输入短信验证码"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-button type="primary" @click="getCodes" :disabled="!checkIDForm.canGetCode">
                  <span v-if="checkIDForm.canGetCode">获取验证码</span>
                  <span v-else>{{checkIDForm.second}}秒后重新获取</span>
                </el-button>
              </el-col>
            </el-row>
            <el-row>
              <div class="footerBtn">
                <el-col :span="24">
                  <el-button type="primary" @click="handleNext()">下一步</el-button>
                </el-col>
              </div>
            </el-row>
          </el-form>
        </div>
        <div class="checkPassWord each-content" v-show='stepNum === 2'>
          <el-form :model="checkPWForm" :rules="checkPWRules" ref="checkPWForm" label-width="150px"
            class="demo-ruleForm">
            <el-row>
              <el-col :span='24'>
                <el-form-item label="输入新密码：" prop="password">
                  <el-input type="password" v-model.trim="checkPWForm.password" placeholder="输入新密码">
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span='24'>
                <el-form-item label="再次输入新密码：" prop="confirmPassword">
                  <el-input type="password" v-model.trim="checkPWForm.confirmPassword"
                    placeholder="再次输入新密码"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <div class="footerBtn">
                <el-col :span="24">
                  <el-button type="primary" @click="handleSubmit()">提交</el-button>
                </el-col>
              </div>
            </el-row>
          </el-form>
        </div>
        <div class="resetOK each-content" v-show='stepNum === 3'>
          <div class="icon-success"><i class="el-icon-success"></i></div>
          <div class="p-t-20"><span>密码修改完成</span></div>
          <div class="p-t-20">
            <router-link to='/'>前往登录</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { validPhone } from '@/libs/validate';
import { getCode } from '@/apis/app';
import { checkYzm, resetPassword } from '@/apis/auth/user';
import XxteaJs from '@/plugins/Xxtea';

export default {
  data() {
    const checkPhone = (rule, value, callback) => {
      if (!value) {
        callback(new Error('手机号码不能为空'));
      }
      if (validPhone(value)) {
        callback();
      } else {
        callback(new Error('请填写正确的手机号码'));
      }
    };
    const checkPwd = (rule, value, callback) => {
      if (!value) {
        callback(new Error('密码不能为空'));
      }
      if (value === this.checkPWForm.password) {
        callback();
      } else {
        callback(new Error('密码不一致'));
      }
    };
    return {
      stepNum: 1,
      checkIDForm: {
        mobile: '',
        code: '',
        canGetCode: true,
        second: 60,
        timer: null,
      },
      checkPWForm: {
        password: '',
        confirmPassword: '',
      },
      checkIDRules: {
        mobile: [{ required: true, trigger: 'blur', validator: checkPhone }],
        code: [{ required: true, message: '验证码不能为空', trigger: 'blur' }],
      },
      checkPWRules: {
        password: [{ required: true, trigger: 'blur', message: '密码不能为空' }],
        confirmPassword: [{ required: true, trigger: 'blur', validator: checkPwd }],
      },
    };
  },
  methods: {
    getCodes() {
      const { mobile: phone, canGetCode } = this.checkIDForm;
      if (!validPhone(phone)) {
        this.$message({
          type: 'warning',
          message: '请输入正确手机号码',
        });
      } else if (canGetCode) {
        getCode(phone).then(({ code, msg }) => {
          if (code === 0) {
            this.checkIDForm.canGetCode = false;
            this.setTimer();
          } else {
            throw new Error(msg);
          }
        });
      }
    },
    setTimer() {
      this.checkIDForm.second -= 1;
      this.checkIDForm.timer = setTimeout(this.setTimer, 1000);
      if (this.checkIDForm.second <= 0) {
        clearTimeout(this.checkIDForm.timer);
        this.checkIDForm.canGetCode = true;
      }
    },
    goNext() {
      this.stepNum += 1;
    },
    handleNext() {
      this.$refs.checkIDForm.validate((valid) => {
        if (valid) {
          const { mobile: phone, code } = this.checkIDForm;
          const options = { phone, code };
          checkYzm(options).then(({
            code: resCode,
            msg: message,
          } = {}) => {
            if (resCode !== 0) {
              this.$message({
                type: 'error',
                message,
              });
            } else {
              this.goNext();
            }
          });
        }
      });
    },
    handleSubmit() {
      this.$refs.checkPWForm.validate((valid) => {
        if (valid) {
          this.submitData();
        }
      });
    },
    submitData() {
      const { Xxtea } = XxteaJs;
      const { mobile: phone, code } = this.checkIDForm;
      const xt = new Xxtea(phone);
      const { password } = this.checkPWForm;
      const options = {
        phone,
        code,
        password: xt.xxtea_encrypt(password), // 对密码加密处理
        userType: 1, // 用户类型1：个人，2：法人
      };
      resetPassword(options).then(({
        code: resCode,
        msg: message,
      } = {}) => {
        if (resCode !== 0) {
          this.$message({
            type: 'error',
            message,
          });
        } else {
          this.goNext();
        }
      });
    },
  },
  destroyed() {
    this.stepNum = 1;
    clearTimeout(this.timer);
  },
};

</script>
<style lang='scss' scoped >
@import "./index.scss";
</style>
