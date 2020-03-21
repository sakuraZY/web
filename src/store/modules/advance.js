/*
 * @Author: huwei
 * @Date: 2020-02-26 16:07:12
 * @
# Description:预告登记仓库
 */

const state = {
  NODENAME: '', // 节点名称
  MESSAGEJSON: {}, // 暂存待提交数据
};

const mutations = {
  SET_NODENAME(state, nodename) {
    state.NODENAME = nodename;
  },
  SET_MESSAGEJSON(state, messJson) {
    state.MESSAGEJSON = messJson;
  },
  REST_MESSAGEDATA(state) {
    state.NODENAME = '';
    state.MESSAGEJSON = {};
  },
};

export default {
  namespaced: true,
  state,
  mutations,
};
