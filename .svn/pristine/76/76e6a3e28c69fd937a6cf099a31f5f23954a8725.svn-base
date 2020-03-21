/*
 * @Description: 功能菜单管理 api 接口
 * @Author: wangjiayu
 * @Date: 2020-03-02 09:20:39
 * @LastEditors: wangjiayu
 * @LastEditTime: 2020-03-05 16:26:33
 */

import axios from '@/libs/axios';

/**
 * 查找角色的门户配置信息
 * @param {String} roleId 角色id
 */
export const getPortalByRoleId = roleId => axios({
  url: 'sysmgr/portal/getByRoleId',
  method: 'post',
  params: {
    roleId,
  },
});

/**
 * 查找用户的门户配置信息
 * @param {String} userId 用户id
 */
export const getPortalByUserId = userId => axios({
  url: 'sysmgr/portal/getByUserId',
  method: 'post',
  params: {
    userId,
  },
});

/**
 * 修改门户配置信息
 * @param {Object} data 门户配置对象
 */
export const updatePortal = data => axios({
  url: 'sysmgr/portal/update',
  method: 'post',
  data,
});
