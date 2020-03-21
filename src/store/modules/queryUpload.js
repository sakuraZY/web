/*
 * @Author: huwei
 * @Date: 2020-03-05 13:45:18
 * @
# Description: 附件上传状态记录
*/
const state = {
  UPLOADOBJ: {},
  ISF: true,
  FILEPARAMS: {},
};

const mutations = {
  SET_UPLOADOBJ(state, obj) { // 存储上传信息 缓存信息
    state.UPLOADOBJ[obj.sqbh] = {
      sqbh: obj.sqbh,
      upImgs: obj.upImgs,
    };
  },
  SET_FILEPARAMS(state, obj) {
    state.FILEPARAMS[obj.sqbh] = {
      fileParams: obj.fileParams,
    };
  },
  IS_FIRST(state, sqbh) { // 判断是不是第一次创建上传附件
    const obj = state.UPLOADOBJ;
    state.ISF = !Object.keys(obj).some(item => item === sqbh);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
};
