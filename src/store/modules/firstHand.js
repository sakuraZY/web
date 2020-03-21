/*
 * @Descripttion: 1.00 处理首次登记的相关数据
 * @version: 1.0
 * @Author: zengying
 * @Date: 2020-02-16 21:12:11
 * @LastEditors: zengying
 * @LastEditTime: 2020-03-10 15:28:16
 */

const state = {
  HTSTYBMS: [], // 户图属统一编码
  ZDTYBM: '', // 宗地统一编码
  ZTSTYBM: '', // 幢图属统一编码
  NODENAME: '', // 节点名称
  FLOWSTEP: 1, // 当前业务步骤
  ARRFLOWSTEP: [1], // 当且业务流渲染过的步骤
  SHOWHOUSE: false, // 显示幢信息
  MESSAGEJSON: {}, // 暂存待提交数据
  SCROLLTOBOTTOM: false, // 滚动到页面底端
  SHOWBUILDLOADING: false, // 显示幢查询中
};

const mutations = {
  SET_H(state, htstybms) {
    state.HTSTYBMS = htstybms;
  },
  ADD_H(state, htstybms) {
    state.HTSTYBMS.push(htstybms);
  },
  REMOVE_H(state, htstybms) {
    state.HTSTYBMS.pop(htstybms);
  },
  SET_ZDTYBM(state, zdtybm) {
    state.ZDTYBM = zdtybm;
  },
  SET_ZTSTYBM(state, ztstybm) {
    state.ZTSTYBM = ztstybm;
  },
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
  SET_SHOWHOUSE(state, showhouse) {
    state.SHOWHOUSE = showhouse;
  },
  SET_BUILDLOADING(state, bShow) {
    state.SHOWBUILDLOADING = bShow;
  },
  SET_SCROLLTOBOTTOM(state, scrolltobottom) {
    state.SCROLLTOBOTTOM = scrolltobottom;
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
