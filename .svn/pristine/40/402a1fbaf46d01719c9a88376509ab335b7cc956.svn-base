<!--
 * @Descripttion:  首次登记业务流
 * @version: 1.0
 * @Author: zengying
 * @Date: 2020-02-06 12:04:40
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-03-21 20:19:30
 -->
<template>
    <div class="up-main">
      <div class="up-tit">
        <h3>上传附件</h3>
        <el-button type="primary" class="yjhq" v-if="false">一键获取</el-button>
      </div>
      <upload :infoJson = "infoJson"></upload>
    </div>
</template>

<script>
import upload from '@/components/queryUpload/upload.vue';
import { handleSubmit } from '@/apis/nres/zxtj';
import { mapState } from 'vuex';

export default {
  props: ['infoJson'],
  components: {
    upload,
  },
  data() {
    return {
      MESSAGEJSON: null,
    };
  },
  mounted() {
    this.MESSAGEJSON = this.$store.state[this.infoJson.messJson[0]][this.infoJson.messJson[1]];
    this.nodeName = this.$store.state[this.infoJson.nodeName[0]][this.infoJson.nodeName[1]];
  },
  computed: {
    ...mapState('queryUpload', { FILEPARAMS: state => state.FILEPARAMS }),
  },
  methods: {
    handlerUp() {
      this.MESSAGEJSON.attach = this.FILEPARAMS[this.MESSAGEJSON.sqbh]
        ? this.FILEPARAMS[this.MESSAGEJSON.sqbh].fileParams : [];
      let options = {
        data: this.MESSAGEJSON,
        nodeName: this.nodeName,
      };
      if (this.infoJson.submitUrl) {
        options = Object.assign(options, {
          url: this.infoJson.submitUrl,
        });
      }
      handleSubmit(options).then(({ code, msg }) => {
        if (code === 0) {
          // 提交后把缓存的叫号清空
          sessionStorage.removeItem(this.$route.path.split('/')[1]);
          this.$message({
            message: msg,
            type: 'success',
          });
          this.$emit('func', 1);
        } else {
          this.$message.error(msg);
        }
      }, (err) => {
        throw new Error(err);
      });
    },
  },
};
</script>

<style src="./index.scss" lang='scss' scoped>
</style>
