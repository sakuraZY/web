/*
 * @Descripttion: v1.00
 * @version: v1.00
 * @Author: huwei
 * @Date: 2020-01-14 16:02:13
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-03-05 14:01:26
 */

const state = {
  isCollapse: false,
  ind: 0,
  activeDate: 1,
  isRouterAlive: true,
  TAB_KEY: { sqbh: '' }, // 监听当前tab上的申请编号
  historyArray: [{ name: 'home', path: '/u' }],
  editableTabs: [{
    state: 'home', // 记录刷新状态
    content: () => import('@/views/Impersonal/User/UserHome'),
  }],
  tabIndex: 0,
};
const mutations = {
  setCollapse(state) {
    state.isCollapse = !state.isCollapse;
  },
  pushHistoryArray(state, nobj) {
    if (!state.historyArray.some(v => v.name === nobj.name)) {
      state.historyArray.push(nobj);
      // sqbh
      if (nobj.data) {
        state.TAB_KEY.sqbh = nobj.data.sqbh;
      } else {
        state.TAB_KEY.sqbh = '';
      }
      // elementui tab
      // const narr = nobj.path.split('/');
      // const b = routes.find(item => item.path === `/${narr[1]}`);
      // let p;
      // if (b) {
      //   if (narr.length > 2) {
      //     p = b.children.find(item => item.path === `${narr[2]}`);
      //   } else if (b.children) {
      //     p = b.children['0'];
      //   } else {
      //     p = b;
      //   }
      // } else {
      //   const c = routes.find(item => item.path === '/u');
      //   p = c.children.find(item => item.path.indexOf(`${narr[1]}`) > -1);
      // }
      state.editableTabs.push({
        state: nobj.keyPath,
        content: '',
      });
      state.tabIndex = nobj.keyPath;
    } else {
      const arr = state.historyArray.find(v => v.path === nobj.path);
      const indexs = state.historyArray.findIndex(v => v.path === arr.path);
      if (state.ind !== indexs) {
        state.ind = indexs;
        // elementui tab
        state.tabIndex = indexs;// nobj.keyPath;
      }
    }
  },
  setHistoryArray(state, nobj) {
    state.historyArray = nobj.hisArray;
    state.editableTabs = nobj.tabArray;
  },
  setInd(state, num) {
    state.ind = num;
    state.tabIndex = num;
    const nobj = state.historyArray[num];
    if (nobj.data) {
      state.TAB_KEY.sqbh = nobj.data.sqbh;
    } else {
      state.TAB_KEY.sqbh = '';
    }
  },
  reduceInd(state) {
    state.ind -= 1;
    state.tabIndex = state.ind;
    const num = state.ind;
    const nobj = state.historyArray[num];
    if (nobj.data) {
      state.TAB_KEY.sqbh = nobj.data.sqbh;
    } else {
      state.TAB_KEY.sqbh = '';
    }
  },
  setActiveDate(state) {
    state.isRouterAlive = false;
    setTimeout(() => {
      state.isRouterAlive = true;
    }, 50);
  },
  RESET_TABKEY(state) {
    state.TAB_KEY.sqbh = '';
  },
};

export default {
  namespaced: true,
  state,
  mutations,
};
