/*
 * @Descripttion:  查封登记
 * @version: 1.0
 * @Author: zengying
 * @Date: 2020-03-10 16:00:56
 * @LastEditors: zengying
 * @LastEditTime: 2020-03-16 10:04:15
 */

const state = {
  NODENAME: '', // 节点名称
  FLOWSTEP: 1, // 当前业务步骤
  ARRFLOWSTEP: [1], // 当且业务流渲染过的步骤
  MESSAGEJSON: {}, // 暂存待提交数据
};

const mutations = {
  SET_NODENAME(state, nodename) {
    state.NODENAME = nodename;
  },
  SET_ARRFLOWSTEP(state, flowstep) {
    state.ARRFLOWSTEP = flowstep;
  },
  ADD_ARRFLOWSTEP(state, flowstep) {
    if (!state.ARRFLOWSTEP.includes(flowstep)) {
      state.ARRFLOWSTEP.push(flowstep);
    }
  },
  REMOVE_ARRFLOWSTEP(state, flowstep) {
    state.ARRFLOWSTEP.pop(flowstep);
  },
  RESET_ARRFLOWSTEP(state) {
    state.ARRFLOWSTEP = [1];
  },
  GO_NEXT(state, flowstep) {
    state.FLOWSTEP = flowstep;
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
