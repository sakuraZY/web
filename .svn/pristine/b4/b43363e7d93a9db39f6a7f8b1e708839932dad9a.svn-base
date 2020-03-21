/**
 * @File: 功能权限分类管理Api接口服务
 * @Author: qiwei
 * @Date: 2020-02-18 16:11:03
 * @Last Modified by: qiwei
 * @Last Modified time: 2020-02-26 21:14:28
 */
import axios from '@/libs/axios';

/**
 * 新增功能权限
 * @param {Object} data 功能权限
 */
export const addPermission = data => axios({
  url: 'auth/permission/add',
  method: 'post',
  data,
});
/**
 * 功能权限批量验证
 * @param {String} userId 用户ID
 * @param {Array} data 功能权限编码数组
 */
export const batchCheckPermission = (userId, data) => axios({
  url: 'auth/permission/batchCheck',
  method: 'post',
  params: {
    userId,
  },
  data,
});
/**
 * 功能权限验证
 * @param {String} userId 用户ID
 * @param {String} propCode 功能权限编码
 */
export const checkPermission = ({ userId, propCode } = {}) => axios({
  url: 'auth/permission/check',
  method: 'get',
  params: {
    userId,
    propCode,
  },
});
/**
 * 删除功能权限
 * @param {String} propCode 功能权限编码
 */
export const deletePermission = propCode => axios({
  url: 'auth/permission/delete',
  method: 'post',
  params: {
    propCode,
  },
});
/**
 * 功能权限导出
 * @param {String} objcode 需要导出的模块信息
 * @param {String} propcode 功能权限编码
 */
export const exportPermission = ({ objcode, propcode } = {}) => {
  const formData = new FormData();
  formData.append('objcode', objcode);
  formData.append('propcode', propcode);
  return axios({
    url: 'auth/permission/export',
    method: 'post',
    data: formData,
    responseType: 'blob',
  });
};
/**
 * 功能权限导入
 * @param {File} file XML文件
 */
export const importPermission = file => axios({
  url: 'auth/permission/import',
  method: 'post',
  headers: {
    'Content-Type': 'multipart/form-data',
  },
  data: file,
});
/**
 * 获取所有的权限
 */
export const getPermissions = () => axios({
  url: 'auth/permission/queryAll',
  method: 'post',
});
/**
 * 查询角色的功能权限
 * @param {String} roleId 角色ID
 */
export const getPermissionsByRoleId = roleId => axios({
  url: 'auth/permission/queryByRoleId',
  method: 'post',
  params: {
    roleId,
  },
});
/**
 * 查询用户的功能权限
 * @param {String} userId 用户ID
 */
export const getPermissionsByUserId = userId => axios({
  url: 'auth/permission/queryByRoleId',
  method: 'post',
  params: {
    userId,
  },
});
/**
 * 修改功能权限
 * @param {Object} data 功能权限
 */
export const updatePermission = data => axios({
  url: 'auth/permission/update',
  method: 'post',
  data,
});
/**
 * 新增权限分类
 * @param {Object} data 权限分类信息
 */
export const addPermissionCate = data => axios({
  url: 'auth/permission/catetory/add',
  method: 'post',
  data,
});
/**
 * 删除权限分类
 * @param {string} objectCode 权限分类编码
 */
export const deletePermissionCate = objectCode => axios({
  url: 'auth/permission/catetory/delete',
  method: 'post',
  params: {
    objectCode,
  },
});
/**
 * 修改权限分类
 * @param {Object} data 权限分类信息
 */
export const updatePermissionCate = data => axios({
  url: 'auth/permission/catetory/update',
  method: 'post',
  data,
});
/**
 * 修改权限分类
 * @param {String} sysClassify 原权限分类类型
 * @param {String} updateSysClassify 权限分类类型
 */
export const updatePermissionCateClassify = ({ sysClassify, updateSysClassify } = {}) => axios({
  url: 'auth/permission/catetory/updateSysClassify',
  method: 'post',
  params: {
    sysClassify,
    updateSysClassify,
  },
});
