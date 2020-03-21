/*
 * @Author: huwei
 * @Date: 2020-03-15 16:07:12
 * @
# Description:一手房转移仓库
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
