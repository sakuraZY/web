/**
 * @File: 状态管理user模块
 * @Author: qiwei
 * @Date: 2020-01-13 11:38:52
 * @Last Modified by: qiwei
 * @Last Modified time: 2020-03-06 14:04:38
 */
import {
  TOKEN_KEY,
  COOKIE_KEY,
  USER_KEY,
  SYSRIGHT_KEY,
  TICKET_KEY,
  USERNAME_KEY,
  REGIONCODE_KEY,
  ROLE_KEY,
  EXPIRYDATE_KEY,
  USERTYPE_KEY,
} from '@/libs/authTypes';
import {
  setItem, getItem, setLSItem, getLSItem,
} from '@/libs/common';
import { formatDate } from '@/libs/date';
import { login, logout } from '@/apis/app';

const resetState = (commit, {
  userId = '',
  userName = '',
  roleId = '',
  regionCode = '',
  permissionList = [],
  authck = '',
  cookie = '',
  ticket = '',
  userType = '',
} = {}) => {
  commit('SET_TOKEN', authck);
  commit('SET_COOKIE', cookie);
  commit('SET_USERID', userId);
  commit('SET_USERNAME', userName);
  commit('SET_ROLEID', roleId);
  commit('SET_SYSRIGHT', permissionList);
  commit('SET_TICKET', ticket);
  commit('SET_REGIONCODE', regionCode);
  commit('SET_USERTYPE', userType);
};

const state = {
  token: getItem(TOKEN_KEY),
  cookie: getItem(COOKIE_KEY),
  userId: getItem(USER_KEY),
  userName: getItem(USERNAME_KEY),
  userType: getItem(USERTYPE_KEY),
  roleId: getItem(ROLE_KEY),
  ticket: getItem(TICKET_KEY),
  regionCode: getItem(REGIONCODE_KEY),
  sysRight: getItem(SYSRIGHT_KEY),
  expiryDate: getLSItem(EXPIRYDATE_KEY),
};

const mutations = {
  SET_TOKEN(state, token) {
    state.token = token;
    setItem(TOKEN_KEY, token);
  },
  SET_COOKIE(state, cookie) {
    state.cookie = cookie;
    setItem(COOKIE_KEY, cookie);
  },
  SET_USERID(state, userId) {
    state.userId = userId;
    setItem(USER_KEY, userId);
  },
  SET_USERNAME(state, userName) {
    state.userName = userName;
    setItem(USERNAME_KEY, userName);
  },
  SET_USERTYPE(state, userType) {
    state.userType = userType;
    setItem(USERTYPE_KEY, userType);
  },
  SET_ROLEID(state, roleId) {
    state.roleId = roleId;
    setItem(ROLE_KEY, roleId);
  },
  SET_SYSRIGHT(state, sysRight) {
    state.sysRight = sysRight;
    setItem(SYSRIGHT_KEY, sysRight);
  },
  SET_TICKET(state, ticket) {
    state.ticket = ticket;
    setItem(TICKET_KEY, ticket);
  },
  SET_REGIONCODE(state, regionCode) {
    state.regionCode = regionCode;
    setItem(REGIONCODE_KEY, regionCode);
  },
  SET_EXPIRYDATE(state, expiryDate) {
    state.expiryDate = expiryDate;
    setLSItem(REGIONCODE_KEY, expiryDate);
  },
};

const actions = {
  async handleLogin({ commit }, payload) {
    const {
      code,
      msg,
      resData: {
        authck,
        cookie,
        ticket,
        currentTime,
        licenseLimitTime,
        user: {
          userId,
          userName,
          roleId,
          regionCode,
          permissionList,
          userType,
        },
      } = { user: {} },
    } = await login(payload);
    if (code !== 0) {
      throw new Error(msg || '登录失败');
    }
    resetState(commit, {
      userId,
      userName,
      roleId,
      regionCode,
      permissionList,
      authck,
      cookie,
      ticket,
      userType,
    });
    // 有效时间（ms）
    const expiryTime = licenseLimitTime - currentTime;
    // 有效期是否小于等于15天
    const isExpiryDate = expiryTime / (1000 * 60 * 60 * 24) <= 15;
    commit('SET_EXPIRYDATE', isExpiryDate ? formatDate(licenseLimitTime) : '');
  },
  async handleLogout({ commit, state }) {
    await logout(state.token);
    resetState(commit);
  },
  reset({ commit }) {
    resetState(commit);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
