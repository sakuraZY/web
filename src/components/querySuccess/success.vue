<!--
 * @Author: huwei
 * @Date: 2020-03-10 14:23:26
 * @
# Description: 成功组件
 -->
<template>
  <div class="s_main">
    <div class="success-icon">
      <i class="el-icon-check success-color"></i>
    </div>
    <div class="success-mess">
      <p>
        您的业务已提交成功，业务编号为：{{ywbh}}。可在
        【<span class="colorfont" @click="handlerCheck">个人中心-待办件</span>】
        <br/>中关注业务办理进度
      </p>
    </div>
  </div>
</template>
<script>

export default {
  props: ['infoJson'],
  data() {
    return {
      ywbh: '',
      MESSAGEJSON: '',
    };
  },
  mounted() {
    this.MESSAGEJSON = this.$store.state[this.infoJson.messJson[0]][this.infoJson.messJson[1]];
    this.ywbh = this.MESSAGEJSON.sqbh;
  },
  methods: {
    handlerCheck() {
      this.$emit('func');
    },
  },
};
</script>

<style lang="scss">
@import "./index.scss";
</style>
