/**
 * @File: 角色管理api接口
 * @Author: qiwei
 * @Date: 2020-01-17 13:56:15
 * @Last Modified by: qiwei
 * @Last Modified time: 2020-02-29 17:20:40
 */
import axios from '@/libs/axios';
/**
 * 新增角色
 * @param {Object} data 角色信息
 */
export const addRole = data => axios({
  url: 'auth/role/add',
  method: 'post',
  data,
});
/**
 * 删除角色
 * @param {String} roleId 角色id
 */
export const deleteRole = roleId => axios({
  url: 'auth/role/delete',
  method: 'post',
  params: {
    roleId,
  },
});
/**
 * 更新角色
 * @param {Object} data 角色信息
 */
export const updateRole = data => axios({
  url: 'auth/role/update',
  method: 'post',
  data,
});
/**
 * 加载角色
 * @param roleState 角色状态：启用，禁用，其他任意值

 */
export const getRole = (roleState = '') => axios({
  url: 'auth/role/queryAll',
  method: 'get',
  params: {
    roleState,
  },
});
/**
 * 根据角色标识查询角色
 * @param {String} roleId 角色ID
 */
export const getRoleById = roleId => axios({
  url: 'auth/role/get',
  method: 'get',
  params: {
    roleId,
  },
});
/**
 * 获取人员角色信息
 * @param {String} userId 用户ID
 */
export const getRolesByUserId = userId => axios({
  url: 'auth/role/getRoleByUserId',
  method: 'get',
  params: {
    userId,
  },
});
/**
 * 根据角色id查询人员
 * @param roleId
 */
export const getUserByRoleId = roleId => axios({
  url: 'auth/role/queryUser',
  method: 'get',
  params: {
    roleId,
  },
});
/**
 * 给角色绑定用户
 * @param {string} roleId 角色ID
 * @param {Array} userIds 用户ID数组
 */
export const batchBindUserOfRole = (roleId, userIds) => axios({
  url: 'auth/role/batchBindUser',
  method: 'post',
  params: {
    roleId,
  },
  data: userIds,
});
/**
 * 给角色移除用户
 * @param {string} roleId 角色ID
 * @param {Array} userIds 用户ID数组
 */
export const batchRemoveUserOfRole = (roleId, userIds) => axios({
  url: 'auth/role/batchRemoveUser',
  method: 'post',
  params: {
    roleId,
  },
  data: userIds,
});
/**
 * 绑定角色权限
 * @param {String} roleId 角色id
 * @param {Array} data 权限编码数组
  */
export const bindRolePermission = (roleId, data) => axios({
  url: 'auth/role/bindPermission',
  method: 'post',
  params: {
    roleId,
  },
  data,
});
/**
 * 解绑角色权限
 * @param {String} roleId 角色id
 * @param {Array} data 权限编码数组
  */
export const removeRolePermission = (roleId, data) => axios({
  url: 'auth/role/removePermission',
  method: 'post',
  params: {
    roleId,
  },
  data,
});
/**
 * 根据人员名称查询角色标识
 * @param userName
 */
export const getRoleByUsername = userName => axios({
  url: 'auth/role/queryByUsername',
  method: 'post',
  params: {
    userName,
  },
});
/**
 * 删除角色类型
 * @param {String} roleType 角色类型
 */
export const deleteRoleType = roleType => axios({
  url: 'auth/role/type/delete',
  method: 'post',
  params: {
    roleType,
  },
});
/**
 * 删除角色类型
 * @param {String} userId 用户id
 */
export const getRoleByUserId = userId => axios({
  url: 'auth/role/queryByUserId',
  method: 'get',
  params: {
    userId,
  },
});
