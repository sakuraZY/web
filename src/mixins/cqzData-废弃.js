/*
 * @Descripttion:  Api接口服务
 * @version: 1.0
 * @Author: zengying
 * @Date: 2020-03-14 11:01:36
 * @LastEditors: zengying
 * @LastEditTime: 2020-03-14 11:34:08
 */
export default {
  data() {
    return {
      mixCqzh: '',
    };
  },
  computed: {
    getMixCQZH() {
      return this.mixCqzh;
    },
  },
  methods: {
    setMixCQZH(val) {
      this.mixCqzh = val;
    },
  },
  watch: {
    mixCqzh() {
      this.getMixCQZH();
    },
  },

};
