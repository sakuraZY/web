<template>
  <div class="auth-type">
    <div class="auth-type-title">
      请选择实名认证模式
    </div>
    <div class="auth-type-main">
      <div
        class="auth-type-main-item"
        :class="{active: activeType === 'verifyFace'}"
        @click="activeType = 'verifyFace'"
      >
        <icon-svg iconClass="verifyFace" class="auth-type-main-item-icon"></icon-svg>
        <div class="auth-type-main-item-title">人脸验证</div>
        <div class="auth-type-main-item-discript">
          快捷方便，线上人脸验证通过后，账户立即可以正常使用
        </div>
      </div>
      <div
        class="auth-type-main-item"
        :class="{active: activeType === 'verifyInfo'}"
        @click="activeType = 'verifyInfo'"
      >
        <icon-svg iconClass="verifyInfo" class="auth-type-main-item-icon"></icon-svg>
        <div class="auth-type-main-item-title">资料验证</div>
        <div class="auth-type-main-item-discript">
          相对缓慢，需等待资料人工审核通过后，账户才可正常使用
        </div>
      </div>
    </div>
    <div class="btn-groups">
      <el-button plain size="medium">上一步</el-button>
      <el-button type="primary" size="medium">下一步</el-button>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      activeType: '',
    };
  },
};
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
