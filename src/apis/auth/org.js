/**
 * @File: 组织机构管理Api接口服务
 * @Author: qiwei
 * @Date: 2020-01-15 16:03:03
 * @Last Modified by: qiwei
 * @Last Modified time: 2020-01-17 12:30:38
 */
import axios from '@/libs/axios';

/**
 * 获取组织树
 * @param {Boolean} allOrg 是否全部组织 默认为false 即启用的
 */
export const getOrgTree = (allOrg = false) => axios({
  url: '/auth/org/query',
  method: 'post',
  params: {
    allOrg,
  },
});

/**
 * 通过组织id获取组织信息
 * @param {String} orgId 组织id
 */
export const getOrgById = orgId => axios({
  url: '/auth/org/get',
  method: 'post',
  params: {
    orgId,
  },
});

/**
 * 删除组织
 * @param {String} orgId 组织id
 */
export const deleteOrg = orgId => axios({
  url: 'auth/org/delete',
  method: 'post',
  params: {
    orgId,
  },
});

/**
 * 添加组织
 * @param {String} relParentnode 组织父节点id
 * @param {Object} data 组织信息
 */
export const addOrg = (relParentnode, data) => axios({
  url: 'auth/org/add',
  method: 'post',
  params: {
    relParentnode,
  },
  data,
});

/**
 * 更新组织信息
 * @param {String} relParentnode 组织父节点id
 * @param {Object} data 组织信息
 */
export const updateOrg = (relParentnode, data) => axios({
  url: 'auth/org/update',
  method: 'post',
  params: {
    relParentnode,
  },
  data,
});

/**
 * 查询用户标识查询用户组织
 * @param {String} userId 用户id
 */
export const getOrgByUserId = userId => axios({
  url: 'auth/org/getOrgByUserId',
  method: 'get',
  params: {
    userId,
  },
});

/**
 * 绑定职员
 * @param {Object} params query参数
 *   @param {Array} userIds 用户id数组
 *   @param {String} relParentnode 组织父节点id
 */
export const batchBindUser = ({ userIds, relParentnode }) => axios({
  url: 'auth/org/batchBindUser',
  method: 'post',
  params: {
    userId: userIds,
    relParentnode,
  },
});

/**
  * 移除绑定职员
  * @param {Object} params query参数
  *   @param {Array} userIds 用户id 数组
  *   @param {String} orgId 组织id
  */
export const batchRemoveUser = ({ userIds, orgId }) => axios({
  url: 'auth/org/batchRemoveUser',
  method: 'post',
  params: {
    userId: userIds,
    orgId,
  },
});

/**
 * 增加岗位信息
 * @param {String} orgId 组织ID
 * @param {Object} data 岗位信息
 */
export const addPost = (orgId, data) => axios({
  url: 'auth/org/post/add',
  method: 'post',
  params: {
    orgId,
  },
  data,
});

/**
 * 删除岗位信息
 * @param {Array} postIds 岗位ID数组
 */
export const deletePost = postIds => axios({
  url: 'auth/org/post/delete',
  method: 'post',
  params: {
    postId: postIds,
  },
});

/**
 * 查询岗位信息
 * @param {String} orgId 组织ID
 */
export const getPostByOrgId = orgId => axios({
  url: 'auth/org/post/query',
  method: 'post',
  params: {
    orgId,
  },
});

/**
 * 根据用户查询可选岗位信息
 * @param {String} userId 岗位ID
 */
export const getPostByUserId = userId => axios({
  url: 'auth/org/post/queryByUserId',
  method: 'post',
  params: {
    userId,
  },
});

/**
 * 更新岗位信息
 * @param {String} orgId 组织id
 * @param {Object} data 岗位信息
 */
export const updatePost = (orgId, data) => axios({
  url: 'auth/org/post/update',
  method: 'post',
  params: {
    orgId,
  },
  data,
});
