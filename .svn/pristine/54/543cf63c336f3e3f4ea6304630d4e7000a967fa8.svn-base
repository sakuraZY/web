<template>
  <el-form class="geo-login-card" ref="loginForm" :model="loginForm" :rules="loginRules">
    <div v-if="onlyPerson && !isBoth">
      <div class="geo-login-card-title">个人用户登录</div>
      <el-form-item prop="userCode">
        <el-input placeholder="请输入用户名" class="geo-login-form-item" prefix-icon="el-icon-user-solid"
          v-model.trim="loginForm.userCode" @keyup.enter.native="gotoLogin">
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input placeholder="请输入密码" prefix-icon="el-icon-lock" class="geo-login-form-item"
          show-password v-model.trim="loginForm.password" @keyup.enter.native="gotoLogin">
        </el-input>
      </el-form-item>
    </div>
    <el-tabs
      v-model="activeType"
      type="card"
      class="geo-login-card-tab"
      v-if="isBoth || !onlyPerson"
    >
      <el-tab-pane label="个人用户登录" name="personal" v-if="isBoth" class="geo-login-card-tab-pane">
        <div v-if="showFormType">
          <el-form-item prop="userCode">
            <el-input placeholder="请输入手机号码" class="geo-login-form-item"
              prefix-icon="el-icon-user-solid" v-model.trim="loginForm.userCode"
              @keyup.enter.native="gotoLogin" size="medium">
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input placeholder="请输入密码" prefix-icon="el-icon-lock" class="geo-login-form-item"
              show-password v-model.trim="loginForm.password" @keyup.enter.native="gotoLogin"
              size="medium">
            </el-input>
          </el-form-item>
        </div>
        <div v-else class="code-login">
          <div class="code-login-title">扫码登录</div>
          <icon-svg iconClass="erweima" class="code-login-icon"></icon-svg>
        </div>
      </el-tab-pane>
      <el-tab-pane label="企业用户登录" name="impersonal" class="geo-login-card-tab-pane">
        <el-form-item prop="impersonalCode">
          <el-input placeholder="请输入企业账号" class="geo-login-form-item"
            prefix-icon="el-icon-user-solid" v-model.trim="loginForm.impersonalCode"
            @keyup.enter.native="gotoLogin" size="medium">
          </el-input>
        </el-form-item>
        <el-form-item prop="impersonalPassword">
          <el-input placeholder="请输入密码" prefix-icon="el-icon-lock" class="geo-login-form-item"
            show-password v-model.trim="loginForm.impersonalPassword"
            @keyup.enter.native="gotoLogin" size="medium">
          </el-input>
        </el-form-item>
      </el-tab-pane>
    </el-tabs>
    <div class="forget-password" v-if="showFormType || this.activeType !== 'personal'">
      <span >
        <router-link to='/p/fp' class="forget-password-text">忘记密码?</router-link>
      </span>
    </div>
    <div class="btn-group">
      <el-button
        v-if="showFormType || this.activeType !== 'personal'"
        type="primary"
        class="btn-block"
        :size="onlyPerson && !isBoth ? '' : 'medium'"
        @click="gotoLogin">
        登录
      </el-button>
      <div class="login-type">
        <span>社交账号登录：</span>
        <div class="login-type-content">
          <div class="login-type-item" v-for="(item, index) in loginTypes" :key="item + index">
            <icon-svg
              :iconClass="item.icon"
              class="login-type-item-icon"
              :style="{color: item.color}"
            />
            <span class="login-type-item-title">{{item.name}}</span>
          </div>
        </div>
      </div>
      <div class="register-content">
        <span class="register-content-text" v-if="activeType === 'personal'">
          没有账号？<router-link to="/p/register" class="register-content-link">立即注册账号</router-link>
        </span>
        <span class="register-content-text" v-else>
          <router-link to="/p/download" class="register-content-link">下载组件</router-link>
        </span>
      </div>
    </div>
    <div
      class="login-switch"
      v-if="this.activeType === 'personal'"
      @click="showFormType = !showFormType"
    >
      <icon-svg
        :iconClass="showFormType ? 'erweima' : 'computer'"
        class="login-switch-icon"
      ></icon-svg>
      <div class="login-switch-modal"></div>
    </div>
  </el-form>
</template>

<script>
import { mapActions } from 'vuex';
import XxteaJs from '@/plugins/Xxtea';
import {
  validPhone,
  // validCreditCode,
} from '@/libs/validate';

const { Xxtea, Base64 } = XxteaJs;

export default {
  props: {
    isBoth: {
      type: Boolean,
      default: false,
    },
    onlyPerson: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    const validateUserCode = (rule, value, callback) => {
      if (this.activeType !== 'personal') {
        return callback();
      }
      if (!validPhone(value)) {
        return callback(new Error('手机号码格式不正确'));
      }
      return callback();
    };
    const validatePassword = (rule, value, callback) => {
      if (this.activeType !== 'personal') {
        return callback();
      }
      if (!value) {
        return callback(new Error('请输入密码'));
      }
      return callback();
    };
    const validateLegalPersonCode = (rule, value, callback) => {
      if (this.activeType === 'personal') {
        return callback();
      }
      if (!value) {
        return callback(new Error('请输入企业账户'));
      }
      return callback();
    };
    // const validateLegalPersonCode = (rule, value, callback) => {
    //   if (this.activeType === 'personal') {
    //     return callback();
    //   }
    //   if (!validCreditCode(value)) {
    //     return callback(new Error('组织机构代码格式不正确'));
    //   }
    //   return callback();
    // };
    const validateLegalPersonPassword = (rule, value, callback) => {
      if (this.activeType === 'personal') {
        return callback();
      }
      if (!value) {
        return callback(new Error('请输入密码'));
      }
      return callback();
    };
    return {
      showFormType: true,
      loginTypes: [
        {
          icon: 'zhifubao',
          name: '支付宝',
          color: '#1296DB',
        },
        {
          icon: 'weixin',
          name: '微信',
          color: '#5BC551',
        },
      ],
      activeType: !this.onlyPerson && !this.isBoth ? 'impersonal' : 'personal',
      loginForm: {
        userCode: '',
        password: '',
        impersonalCode: '',
        impersonalPassword: '',
      },
      loginRules: {
        userCode: [
          { validator: validateUserCode, trigger: ['blur', 'change'] },
        ],
        password: [
          { validator: validatePassword, trigger: ['blur', 'change'] },
        ],
        impersonalCode: [
          { validator: validateLegalPersonCode, trigger: ['blur', 'change'] },
        ],
        impersonalPassword: [
          { validator: validateLegalPersonPassword, trigger: ['blur', 'change'] },
        ],
      },
    };
  },
  methods: {
    ...mapActions({
      handleLogin: 'user/handleLogin',
    }),
    goToRegister() {
      this.$router.push({ name: 'register' });
    },
    gotoLogin() {
      const that = this;
      that.$refs.loginForm.validate((valid) => {
        if (!valid) {
          return false;
        }
        const {
          userCode,
          password,
          impersonalCode,
          impersonalPassword,
        } = that.loginForm;
        const isPersonal = this.activeType === 'personal';
        const loginCode = isPersonal ? userCode : impersonalCode;
        const loginPwd = isPersonal ? password : impersonalPassword;
        const userId = Base64.encode(loginCode);
        // 使用USERID作为加密密钥
        const xt = new Xxtea(userId);
        const options = {
          userId,
          password: xt.xxtea_encrypt(loginPwd), // 对密码加密处理
        };
        return that.handleLogin(options).then(() => {
          that.$emit('onSuccess', isPersonal);
        }).catch((err) => {
          that.$emit('onError', err);
        });
      });
    },
    changeUseCode(val) {
      this.userCode = val;
    },
    changePassword(val) {
      this.password = val;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
