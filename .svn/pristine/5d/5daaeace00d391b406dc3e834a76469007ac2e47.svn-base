<template>
  <div class="register">
    <banner-mini-content title="法人用户注册" />
    <div class="register-main">
      <div class="register-main-header">注册账号</div>
      <div class="register-main-body">
        <el-steps :active="activeStep" finish-status="process" class="register-steps">
          <el-step
            v-for="(step, index) in steps"
            :key="step + index"
            icon="null"
          >
            <template v-slot:icon>
              <div
                class="register-step"
                :class="{ active: activeStep === index, success: activeStep > index }"
              >
                <div class="register-step-icon">
                  <span
                    class="register-step-icon-inner"
                    v-if="index >= activeStep"
                  >
                    {{index + 1}}
                  </span>
                  <i class="el-icon-check" v-else></i>
                </div>
                <div class="register-step-name">{{step}}</div>
              </div>
            </template>
          </el-step>
        </el-steps>
        <register-info v-show="activeStep === 0"></register-info>
        <auth-type v-show="activeStep ===1"></auth-type>
      </div>
    </div>
  </div>
</template>

<script>
import BannerMiniContent from '@/components/bannerMiniContent';
import RegisterInfo from './RegisterInfo';
import AuthType from './AuthType';

export default {
  components: {
    BannerMiniContent,
    RegisterInfo,
    AuthType,
  },
  data() {
    return {
      activeStep: 1,
      steps: [
        '填写信息',
        '选择认证方式',
        '实名认证',
        '完成',
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
