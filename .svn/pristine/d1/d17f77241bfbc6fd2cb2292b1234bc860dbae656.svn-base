/*
 * @File: 日志 Api接口服务
 * @Author: wangjiayu
 * @Date: 2020-02-24 11:38:34
 * @Last Modified by: wangjiayu
 * @Last Modified time: 2020-02-24 16:23:49
 */

import axios from '@/libs/axios';

/**
 * 新增日志信息
 * @param {Object} logInfo 日志信息
 */
export const addLog = logInfo => axios({
  url: '/auth/log/addLog',
  method: 'post',
  data: logInfo,
});

/**
 * 查询日志信息
 * @param {Object} queryInfo 日志查询信息
 */
export const queryLog = queryInfo => axios({
  url: '/auth/log/listLog',
  method: 'post',
  data: queryInfo,
});
