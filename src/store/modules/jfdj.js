/*
 * @Description: 解封登记状态管理
 * @Author: wangjiayu
 * @Date: 2020-03-13 11:40:28
 * @LastEditors: wangjiayu
 * @LastEditTime: 2020-03-14 10:41:12
 */

const state = {
  NODENAME: '宜昌', // 节点名称
  FLOWSTEP: 1, // 当前业务步骤
  ARRFLOWSTEP: [1], // 当前业务流渲染过的步骤
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
  GO_PREV(state, flowstep) {
    state.FLOWSTEP = flowstep;
    state.ARRFLOWSTEP.splice(state.ARRFLOWSTEP.length - 1, 1);
  },
  SET_MESSAGEJSON(state, messJson) {
    state.MESSAGEJSON = messJson;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
};
