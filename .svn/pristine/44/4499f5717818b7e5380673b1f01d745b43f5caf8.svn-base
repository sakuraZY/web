/*
 * @Description: 功能菜单管理 api 接口
 * @Author: wangjiayu
 * @Date: 2020-03-02 09:20:39
 * @LastEditors: wangjiayu
 * @LastEditTime: 2020-03-05 16:26:33
 */

import axios from '@/libs/axios';

/**
 * 查询所有功能菜单信息
 */
export const queryMenu = () => axios({
  url: 'sysmgr/menu/queryAll',
  method: 'post',
});

/**
 * 查询一级功能菜单信息
 */
export const queryFirstLevelMenu = () => axios({
  url: 'sysmgr/menu/queryAMenu',
  method: 'post',
});

/**
 * 根据角色查询功能菜单信息
 * @param {String} roleId 角色标识
 */
export const queryMenuByRoleId = roleId => axios({
  url: 'sysmgr/menu/queryByRoleId',
  method: 'post',
  params: {
    roleId,
  },
});

/**
 * 根据用户查询功能菜单信息
 * @param {String} userId 用户标识
 */
export const queryMenuByUserId = userId => axios({
  url: 'sysmgr/menu/queryByUserId',
  method: 'post',
  params: {
    userId,
  },
});

/**
 * 新增功能菜单信息
 * @param {Object} menuData 功能菜单信息
 */
export const addMenu = menuData => axios({
  url: 'sysmgr/menu/add',
  method: 'post',
  data: menuData,
});

/**
 * 更新功能菜单信息
 * @param {Object} menuData 功能菜单信息
 */
export const updateMenu = menuData => axios({
  url: 'sysmgr/menu/update',
  method: 'post',
  data: menuData,
});

/**
 * 删除功能菜单信息
 * @param {Array} menuIds 功能菜单标识数组
 */
export const deleteMenu = menuIds => axios({
  url: 'sysmgr/menu/batchDelete',
  method: 'post',
  data: menuIds,
});

/**
 * 功能菜单与角色绑定
 * @param {String} roleId 角色标识
 * @param {String} roleName 角色名称
 * @param {Array} menuIds 功能菜单标识数组
 */
export const bindMenuToRole = (roleId, roleName, menuIds) => axios({
  url: 'sysmgr/menu/bindToRole',
  method: 'post',
  params: {
    roleId,
    roleName,
  },
  data: menuIds,
});

/**
 * 功能菜单与角色解绑
 * @param {String} roleId 角色标识
 * @param {String} roleName 角色名称
 * @param {Array} menuIds 功能菜单标识数组
 */
export const removeMenuFromRole = (roleId, roleName, menuIds) => axios({
  url: 'sysmgr/menu/removeFromRole',
  method: 'post',
  params: {
    roleId,
    roleName,
  },
  data: menuIds,
});

/**
 * 导入功能菜单信息
 * @param {XMLDocument} data 功能菜单数据
 */
export const importMenu = data => axios({
  url: 'sysmgr/menu/import',
  method: 'post',
  headers: {
    'Content-Type': 'multipart/form-data',
  },
  data,
});

/**
 * 导出功能菜单信息
 * @param {Array} menuIds 功能菜单标识数组
 */
export const exportMenu = menuIds => axios({
  url: 'sysmgr/menu/export',
  method: 'post',
  params: {
    menuIds,
  },
  responseType: 'blob',
});
