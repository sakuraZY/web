/**
 * @File: 职员 Api接口服务
 * @Author: qiwei
 * @Date: 2020-01-17 10:34:33
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2020-02-10 11:47:12
 */

import axios from '@/libs/axios';

/**
 * 更新职员信息
 * @param {Object} data 用户信息
 */
export const updateEmployee = data => axios({
  url: '/auth/employee/update',
  method: 'post',
  data,
});

/**
 * 获得用户信息
 * @param {String} userId 用户id
 */
export const getEmployeeById = userId => axios({
  url: '/auth/employee/queryByUserId',
  method: 'get',
  params: {
    userId,
  },
});

/**
 * 获得组织下的从属职员
 * @param {String} orgId 组织id
 */
export const getEmployeeByOrgId = orgId => axios({
  url: '/auth/employee/queryByOrgId',
  method: 'get',
  params: {
    orgId,
  },
});

/**
 * 根据权限ID获取职员信息
 * @param {String} authId 权限id
 */
export const getEmployeeByPermId = authId => axios({
  url: '/auth/employee/queryByPermId',
  method: 'get',
  params: {
    authId,
  },
});

/**
 * 查询所有用户信息
 * @param {String} userState 用户状态 true:启用|false:禁用|不传值：所有
 */
export const getAllEmployee = userState => axios({
  url: '/auth/employee/queryAll',
  method: 'get',
  params: {
    userState,
  },
});

/**
 * 分页查找用户信息
 * @param {Object} query 参数
 *   @param {Number} pageNo 页码
 *   @param {pageSize} pageSize 每页数量
 */
export const getEmployee = ({ pageNo = 1, pageSize = 10 }) => axios({
  url: '/auth/employee/query',
  method: 'get',
  params: {
    pageNo,
    pageSize,
  },
});
