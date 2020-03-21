<template>
  <div class="error-page">
    <div class="content error-page-top">
    </div>
    <div class="content error-page-middle">
      <span class="error-title">哇哦，出错啦！</span>
      <div class="error-code">
        <icon-svg iconClass="qipao" className="error-bg"></icon-svg>
        <span class="error-code-value">{{ errorCode }}</span>
      </div>
    </div>
    <div class="content error-page-info">
      {{ errorInfo[errorCode] }}
    </div>
    <el-row class="content error-page-to-home">
      <el-col :sm="3"><el-button type="text" size="medium">{{ time }}</el-button>秒后</el-col>
      <el-col :sm="6">
        <el-button
          type="primary"
          size="medium"
          round
          class="block-btn"
          @click="gotoHome"
        >
          返回首页
        </el-button>
      </el-col>
    </el-row>
    <div class="content error-page-bottom">
    </div>
  </div>
</template>

<script>
export default {
  props: {
    errorCode: {
      type: Number,
      default: 404,
    },
  },
  data() {
    return {
      errorInfo: {
        404: '您访问的页面不存在...',
      },
      time: 5,
      timer: null,
    };
  },
  methods: {
    gotoHome() {
      this.$router.replace('/');
    },
    countDown() {
      if (this.time <= 1) {
        this.gotoHome();
      } else {
        this.time -= 1;
        setTimeout(this.setTimer(), 1000);
      }
    },
    setTimer() {
      this.timer = setTimeout(this.countDown, 1000);
    },
  },
  created() {
    this.setTimer();
  },
  destroyed() {
    clearTimeout(this.timer);
  },
};
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
