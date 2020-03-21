/*
* @File: 系统扩展 Api接口服务
* @Author: qiwei
* @Date: 2020-03-06 11:26:21
 * @Last Modified by: qiwei
 * @Last Modified time: 2020-03-06 13:49:27
*/

import axios from '@/libs/axios';
import config from '@/config';

const {
  personalId,
  enterpriseId,
  personalQueryId,
} = config;

/**
 * 添加第三方账号
 * @param {Object} data 系统扩展对象
 */
export const addApp = data => axios({
  url: '/auth/app/add',
  method: 'post',
  data,
});

/**
 * 验证用户信息
 * @param {Object} param query参数对象
 *   @param {String} appId 应用标识
 *   @param {String} token 应用密钥
 *   @param {String} ctm 时间戳
 */
export const checkApp = ({ appId, token, ctm } = {}) => axios({
  url: '/auth/app/checkApp',
  method: 'get',
  params: {
    appId, token, ctm,
  },
});

/**
 * 获取应用密钥
 * @param {String} appId 应用标识
 */
export const createAppKey = appId => axios({
  url: '/auth/app/createAppKey',
  method: 'get',
  params: {
    appId,
  },
});

/**
 * 读取应用密钥
 * @param {String} appId 应用标识
 */
export const getAppKey = appId => axios({
  url: '/auth/app/getAppKey',
  method: 'get',
  params: {
    appId,
  },
});

/**
 * 第三方-获取查询Ticket信息
 * @param {String} appId 应用标识
 */
export const getQueryTicketForThird = () => axios({
  url: '/auth/app/getQueryTicketForThird',
  method: 'get',
  params: {
    appId: personalQueryId,
  },
});

/**
 * 第三方-获取查询Ticket信息
 * @param {Boolean} isEnterprise 是否是企业类型用户
 */
export const getTicketForThird = isEnterprise => axios({
  url: '/auth/app/getTicketForThird',
  method: 'get',
  params: {
    appId: isEnterprise ? enterpriseId : personalId,
  },
});

/**
 * 登陆app
 * @param {String} requestUrl 请求地址
 */
export const loginApp = requestUrl => axios({
  url: '/auth/app/loginApp',
  method: 'get',
  params: {
    requestUrl,
  },
});

/**
 * 读取应用密钥
 * @param {Object} param query参数对象
 *   @param {String} appId 应用标识
 *   @param {String} appKey 应用密钥
 */
export const readAppKey = ({ appId, appKey }) => axios({
  url: '/auth/app/readAppKey',
  method: 'get',
  params: {
    appId, appKey,
  },
});
