const state = {
  centerViews: {
    _CENTERID_DEFAULT: {
      visitedViews: [],
      activeView: null,
    },
  },
  defaultCenterId: '_CENTERID_DEFAULT',
  affixTabs: [
    {
      href: '/',
      icon: 'home',
      name: 'Home',
    },
  ],
  cachedViews: [],
};
const affixTabsNames = state.affixTabs.map(item => item.name);

const mutations = {
  ADD_VISITED_VIEW: (state, { tab, centerId }) => {
    const targetCenterId = centerId || state.defaultCenterId;
    const title = tab.title || (tab.href === '/' ? '' : '标签页');
    const view = { ...tab, title };
    if (!state.centerViews[targetCenterId]) {
      state.centerViews[targetCenterId] = {
        visitedViews: [view],
      };
      return;
    }
    if (state.centerViews[targetCenterId].visitedViews.some(v => v.href === tab.href)) return;
    state.centerViews[targetCenterId].visitedViews.push(view);
  },
  ADD_CACHED_VIEW: (state, { tab }) => {
    const name = (tab && tab.name) || '';
    if (!name) return;
    if (state.cachedViews.includes(name)) return;
    state.cachedViews.push(name);
  },
  DEL_VISITED_VIEW: (state, { tab, centerId }) => {
    const targetCenterId = centerId || state.defaultCenterId;
    for (let i = 0; i < state.centerViews[targetCenterId].visitedViews.length; i += 1) {
      const view = state.centerViews[targetCenterId].visitedViews[i];
      if (view.href === tab.href) {
        state.centerViews[targetCenterId].visitedViews.splice(i, 1);
        break;
      }
    }
  },
  DEL_CACHED_VIEW: (state, name) => {
    const index = state.cachedViews.indexOf(name);
    if (index > -1) {
      state.cachedViews.splice(index, 1);
    }
  },

  DEL_OTHERS_VISITED_VIEWS: (state, { tab, centerId }) => {
    const targetCenterId = centerId || state.defaultCenterId;
    state.centerViews = {
      ...state.centerViews,
      [targetCenterId]: {
        ...state.centerViews[targetCenterId],
        visitedViews: [...state.affixTabs, tab],
      },
    };
  },
  DEL_OTHERS_CACHED_VIEWS: (state, { tab }) => {
    const name = (tab && tab.name) || '';
    const index = state.cachedViews.indexOf(name);
    if (index > -1) {
      state.cachedViews = [...state.cachedViews.slice(index, index + 1), ...affixTabsNames];
    } else {
      state.cachedViews = [...affixTabsNames];
    }
  },

  DEL_ALL_VISITED_VIEWS: (state, centerId) => {
    const targetCenterId = centerId || state.defaultCenterId;
    state.centerViews = {
      ...state.centerViews,
      [targetCenterId]: {
        visitedViews: [...state.affixTabs],
      },
    };
  },
  DEL_ALL_CACHED_VIEWS: (state) => {
    state.cachedViews = [...affixTabsNames];
  },

  UPDATE_VISITED_VIEW: (state, { tab, centerId }) => {
    const targetCenterId = centerId || state.defaultCenterId;
    for (let i = 0; i < state.centerViews[targetCenterId].visitedViews.length; i += 1) {
      let v = state.centerViews[targetCenterId].visitedViews[i];
      if (v.href === tab.href) {
        v = Object.assign(v, tab);
        break;
      }
    }
    state.centerViews = { ...state.centerViews };
  },
  INIT_CENTER_VIEW: (state, centerId) => {
    if (state.centerViews[centerId]) {
      return;
    }
    state.centerViews[centerId] = {
      visitedViews: [],
      activeView: null,
    };
  },
  SET_CENTERACTIVE_VIEW: (state, { centerId, tab } = {}) => {
    const targetCenterId = centerId || state.defaultCenterId;
    state.centerViews[targetCenterId].activeView = tab;
  },
};

const actions = {
  addView({ dispatch }, payload) {
    dispatch('addVisitedView', payload);
    dispatch('addCachedView', payload);
  },
  addVisitedView({ commit }, payload) {
    commit('ADD_VISITED_VIEW', payload);
    commit('SET_CENTERACTIVE_VIEW', payload);
  },
  addCachedView({ commit }, payload) {
    commit('ADD_CACHED_VIEW', payload);
  },

  delView({ dispatch, state }, payload) {
    return new Promise((resolve) => {
      dispatch('delVisitedView', payload);
      const { centerId, tab: { name } } = payload;
      dispatch('delCachedView', name);
      const targetCenterId = centerId || state.defaultCenterId;
      resolve({
        visitedViews: [...state.centerViews[targetCenterId].visitedViews],
      });
    });
  },
  delVisitedView({ commit, state }, payload) {
    return new Promise((resolve) => {
      commit('DEL_VISITED_VIEW', payload);
      const targetCenterId = payload.centerId || state.defaultCenterId;
      resolve([...state.centerViews[targetCenterId].visitedViews]);
    });
  },
  delCachedView({ commit, state }, name) {
    return new Promise((resolve) => {
      commit('DEL_CACHED_VIEW', name);
      resolve([...state.cachedViews]);
    });
  },

  delOthersViews({ dispatch, state }, payload) {
    return new Promise((resolve) => {
      dispatch('delOthersVisitedViews', payload);
      dispatch('delOthersCachedViews', payload);
      const targetCenterId = payload.centerId || state.defaultCenterId;
      resolve({
        visitedViews: [...state.centerViews[targetCenterId].visitedViews],
      });
    });
  },
  delOthersVisitedViews({ commit, state }, payload) {
    return new Promise((resolve) => {
      commit('DEL_OTHERS_VISITED_VIEWS', payload);
      const targetCenterId = payload.centerId || state.defaultCenterId;
      resolve([...state.centerViews[targetCenterId].visitedViews]);
    });
  },
  delOthersCachedViews({ commit, state }, payload) {
    return new Promise((resolve) => {
      commit('DEL_OTHERS_CACHED_VIEWS', payload);
      resolve([...state.cachedViews]);
    });
  },
  delAllViews({ dispatch, state }, centerId) {
    const targetCenterId = centerId || state.defaultCenterId;
    return new Promise((resolve) => {
      dispatch('delAllVisitedViews', targetCenterId);
      dispatch('delAllCachedViews', targetCenterId);
      resolve({
        visitedViews: [...state.centerViews[targetCenterId].visitedViews],
      });
    });
  },
  delAllVisitedViews({ commit, state }, centerId) {
    const targetCenterId = centerId || state.defaultCenterId;
    return new Promise((resolve) => {
      commit('DEL_ALL_VISITED_VIEWS', targetCenterId);
      resolve([...state.centerViews[targetCenterId].visitedViews]);
    });
  },
  delAllCachedViews({ commit, state }) {
    return new Promise((resolve) => {
      commit('DEL_ALL_CACHED_VIEWS');
      resolve([...state.cachedViews]);
    });
  },
  updateVisitedView({ commit }, payload) {
    commit('UPDATE_VISITED_VIEW', payload);
  },

  initCenterView({ commit }, centerId) {
    commit('INIT_CENTER_VIEW', centerId);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
