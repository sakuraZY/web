<!--
 * @Author: huwei
 * @Date: 2020-02-05 10:03:57
 * @
# Description:
 -->
<template>
  <geo-layout :showUserCenter="true" :showSearch="false" :showWeChat="true">
    <template slot="main">
      <header class="register-tit">
        <section class="register-tit-wrap">
          <h3>个人注册</h3>
        </section>
      </header>
      <div class="register-main">
        <div class="register-main-tit">
          <h3>注册账号</h3>
        </div>
        <div class="register-tishi">
          <p><span>提示：</span>手机号码应为申请人本人手机号码，如发现恶意抢号，且手机号打不通，我中心保留取消预约号的权利。</p>
        </div>
        <div class="register-inp">
          <el-form
            :model="regForm"
            :rules="rules"
            ref="regForm"
            label-width="120px"
            class="demo-ruleForm"
            size="medium"
          >
            <el-row>
              <el-col :span='16'>
                <el-form-item label="用户姓名：" prop="userName">
                  <el-input v-model="regForm.userName" placeholder="输入用户姓名"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span='16'>
                <el-form-item label="身份证号码："  prop="idcard">
                  <el-input v-model="regForm.idcard" placeholder="输入身份证号码"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span='16'>
                <el-form-item label="用户密码："  prop="password">
                  <el-input
                    type="password"
                    v-model="regForm.password"
                    placeholder="输入用户密码"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span='16'>
                <el-form-item label="确认密码："  prop="confirmPassword">
                  <el-input
                    type="password"
                    v-model="regForm.confirmPassword"
                    placeholder="再次输入密码"
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span='16'>
                <el-form-item label="手机号码："  prop="mobile">
                  <el-input v-model="regForm.mobile" placeholder="输入手机号码"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span='12'>
                <el-form-item label="动态验证码："  prop="code">
                  <el-input v-model="regForm.code" placeholder="输入短信验证码"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-button type="primary" @click="getCodes" :disabled="!canGetCode">
                  <span v-if="canGetCode">获取验证码</span>
                  <span v-else>{{seconde}}秒后重新获取</span>
                </el-button>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span='16'>
                <el-form-item label="认证方式："  prop="logintype">
                  <el-select v-model="regForm.logintype" placeholder="请选择" style="width:100%">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col style="margin-left:8%;">
                <el-form-item prop="checked">
                  <el-checkbox v-model="regForm.checked">
                    我已阅读并接受<router-link to="/">《实名认证协议》</router-link>
                  </el-checkbox>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row style="margin-left:16%;">
              <el-col :span="20">
                <el-button type="primary" style="width:180px"
                @click="regist">注册</el-button>
                <el-button type="primary" style="width:180px"
                @click="reset">重置</el-button>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
    </template>
  </geo-layout>
</template>

<script>
import GeoLayout from '@/layouts/Personal';
import { validCardId, validPhone } from '@/libs/validate';
import { getCode, register } from '@/apis/app';
import XxteaJs from '@/plugins/Xxtea';

const { Xxtea } = XxteaJs;

export default {
  components: {
    GeoLayout,
  },
  data() {
    const regId = (rule, value, callback) => {
      if (validCardId(value)) {
        callback();
      } else {
        callback(new Error('请填写正确的身份证号'));
      }
    };
    const regPhone = (rule, value, callback) => {
      if (validPhone(value)) {
        callback();
      } else {
        callback(new Error('请填写正确的手机号码'));
      }
    };
    const regConfirm = (rule, value, callback) => {
      if (value === this.regForm.password) {
        callback();
      } else {
        callback(new Error('密码不一致'));
      }
    };
    return {
      canGetCode: true,
      seconde: 60,
      timer: null,
      regForm: {
        userName: '',
        idcard: '',
        password: '',
        confirmPassword: '',
        mobile: '',
        code: '',
        logintype: '登录密码',
        checked: true,
      },
      options: [{
        value: '人脸验证',
        label: '人脸验证',
      }, {
        value: '登录密码',
        label: '登录密码',
      }],
      rules: {
        userName: [{
          required: true, // 是否必填
          message: '用户名不能为空', // 规则
          trigger: 'blur', // 何事件触发
        },
        { min: 2, max: 10, message: '长度在 2 到 10 个字符' },
        ],
        idcard: [{
          required: true,
          validator: regId,
          trigger: 'blur',
        }],
        password: [{
          required: true,
          message: '密码不能为空',
          trigger: 'blur',
        }],
        confirm: [{
          required: true,
          message: '确认密码不能为空',
          trigger: 'blur',
        }, {
          validator: regConfirm,
          trigger: 'blur',
        }],
        mobile: [{
          required: true,
          validator: regPhone,
          trigger: 'blur',
        }],
        code: [{
          required: true,
          message: '验证码不能为空',
          trigger: 'blur',
        }],
        logintype: [{
          required: true,
        }],
        checked: [{
          required: true,
          message: '请接受协议',
          trigger: 'blur',
        }],
      },
    };
  },
  methods: {
    getCodes() {
      const { mobile: phone } = this.regForm;
      if (!validPhone(phone)) {
        this.$message({
          type: 'warning',
          message: '请输入正确手机号码',
        });
      } else if (this.canGetCode) {
        getCode(phone).then(({ code, msg }) => {
          if (code === 0) {
            this.canGetCode = false;
            this.setTimer();
          } else {
            throw new Error(msg);
          }
        });
      }
    },
    setTimer() {
      // const fn = () => {
      //   this.seconde -= 1;
      //   this.timer = setTimeout(fn, 1000);
      //   if (this.seconde <= 0) {
      //     clearTimeout(this.timer);
      //   }
      // };
      // this.timer = setTimeout(fn, 1000);
      this.seconde -= 1;
      this.timer = setTimeout(this.setTimer, 1000);
      if (this.seconde <= 0) {
        clearTimeout(this.timer);
        this.canGetCode = true;
      }
    },
    reset() {
      this.$refs.regForm.resetFields();
    },
    regist() {
      this.$refs.regForm.validate((valid) => {
        if (valid) {
          const {
            mobile, userName, idcard, password, code, logintype, checked,
          } = this.regForm;
          if (!checked) {
            this.$alert('请阅读并接受《实名协议》', {
              confirmButtonText: '确定',
            });
          } else {
            const xt = new Xxtea(mobile);
            const options = {
              code,
              idcard: xt.xxtea_encrypt(idcard),
              password: xt.xxtea_encrypt(password),
              userName,
              mobile,
              logintype,
            };
            register(options).then(({
              code: resCode,
              msg,
            }) => {
              if (resCode === 0) {
                this.$message({
                  type: 'success',
                  message: '注册成功',
                });
                this.$router.replace({ name: 'Login' });
              } else {
                throw new Error(msg);
              }
            });
          }
        } else {
          this.$alert('请完善注册信息', {
            confirmButtonText: '确定',
          });
        }
      });
    },
  },
  destroyed() {
    clearTimeout(this.timer);
  },
};
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
