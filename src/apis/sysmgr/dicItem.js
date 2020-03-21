/*
 * @file 实现Web dicItem 数据接口
 * @Author: qiwei
 * @Date: 2020-03-03 18:25:12
 * @Last Modified by: qiwei
 * @Last Modified time: 2020-03-03 20:11:35
 */

import axios from '@/libs/axios';

/**
 * 新增字典项
 * @param {object} data 数据
 */
export const addDicitem = data => axios({
  url: 'sysmgr/dicitem/add',
  method: 'post',
  data,
});
/**
 * 添加自定义字典项
 * @param {Object} params query参数
 * @param {Object} data body参数
 */
export const addCustomDicitem = (params, data) => axios({
  url: 'sysmgr/dicitem/addCustom',
  method: 'post',
  params,
  data,
});
/**
 * 删除字典项
 * @param {String} itemId 参数
 */
export const deleteDicitem = itemId => axios({
  url: 'sysmgr/dicitem/delete',
  method: 'post',
  params: {
    itemId,
  },
});

/**
 * 删除自定义字典项
 * @param {Object} params query参数
 * @param {Array} data body参数 主键集合
 */
export const deleteCustomDicitem = (params, data) => axios({
  url: 'sysmgr/dicitem/deleteCustom',
  method: 'post',
  params,
  data,
});

/**
 * 字典缓存
 * @param {object} params 数据
 */
export const getDicitem = ({ dicName, itemName, fieldName } = {}) => axios({
  url: 'sysmgr/dicitem/getDicitem',
  method: 'post',
  params: {
    dicName,
    itemName,
    fieldName,
  },
});

/**
 * 获取字典目录下的所有字典项
 * @param {String} dicCode 字典目录主键dicCode
 */
export const queryDicitem = dicCode => axios({
  url: 'sysmgr/dicitem/query',
  method: 'post',
  params: {
    dicCode,
  },
});

/**
 * 获取字典目录下的所有字典项
 * @param {String} dicName 字典目录名称
 */
export const queryByDicname = dicName => axios({
  url: 'sysmgr/dicitem/queryByDicname',
  method: 'post',
  params: {
    dicName,
  },
});

/**
 * 查询自定义字典项
 * @param params
 * @returns {*}
 */
export const selectCustomDicitem = ({ tableName, fieldName, dicCode } = {}) => axios({
  url: 'sysmgr/dicitem/selectCustom',
  method: 'post',
  params: { tableName, fieldName, dicCode },
});

/**
 * 字典项名称转为字典项值
 * @param {String} dicmainName 字典目录名称
 * @param {Array} data 字典项名称数组
 */
export const transferNameToValue = (dicmainName, data) => axios({
  url: 'sysmgr/dicitem/transferNameToValue',
  method: 'post',
  params: {
    dicmainName,
  },
  data,
});

/**
 * 字典项值转为字典项名称
 * @param {String} dicmainName 字典目录名称
 * @param {Array} data 字典项值数组
 */
export const transferValueToName = (dicmainName, data) => axios({
  url: 'sysmgr/dicitem/transferValueToName',
  method: 'post',
  params: {
    dicmainName,
  },
  data,
});

/**
 * 修改字典项
 * @param {object} data 数据
 */
export const updateDicitem = data => axios({
  url: 'sysmgr/dicitem/update',
  method: 'post',
  data,
});

/**
 * 修改自定义字典项
 * @param params query参数
 * @param data body参数
 */
export const updateCustomDicitem = (params, data) => axios({
  url: 'sysmgr/dicitem/updateCustom',
  method: 'post',
  params,
  data,
});
