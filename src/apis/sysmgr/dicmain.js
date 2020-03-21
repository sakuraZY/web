/*
 * @file 字典管理api
 * @Author: qiwei
 * @Date: 2020-03-03 18:12:17
 * @Last Modified by: qiwei
 * @Last Modified time: 2020-03-05 15:00:31
 */

import axios from '@/libs/axios';
/**
 * 添加字典目录
 * @param {Object} data 字典目录对象
 */
export const addDicmain = data => axios({
  url: 'sysmgr/dicmain/add',
  method: 'post',
  data,
});
/**
 * 删除字典目录
 * @param {String} dicCode 字典目录主键dicCode
 */
export const deleteDicmain = dicCode => axios({
  url: 'sysmgr/dicmain/delete',
  method: 'post',
  params: {
    dicCode,
  },
});
/**
 * 字典导出 需要导出的信息使用(ID:ID)格式
 * @param {String} dicDire 需要导出的字典目录信息
 * @param {String} dicCode 需要导出的字典信息
 */
export const exportDicmain = ({ dicDire, dicCode } = {}) => {
  const formData = new FormData();
  formData.append('dicDire', dicDire);
  formData.append('dicCode', dicCode);
  return axios({
    url: 'sysmgr/dicmain/export',
    method: 'post',
    data: formData,
    responseType: 'blob',
  });
};
/**
 * 字典导出 需要导出的信息使用(ID:ID)格式
 * @param {FormData} file XML文件
 */
export const importDicmain = file => axios({
  url: 'sysmgr/dicmain/import',
  method: 'post',
  headers: {
    'Content-Type': 'multipart/form-data',
  },
  data: file,
});

/**
 * 查询一级字典树
 * @param {String} dicCode 字典目录主键dicCode
 */
export const queryDicmain = dicCode => axios({
  url: 'sysmgr/dicmain/query',
  method: 'post',
  params: {
    dicCode,
  },
});

/**
 * 获取字典目录树
 * @param {String} dicCode 字典目录主键dicCode
 */
export const queryAllDicmain = () => axios({
  url: 'sysmgr/dicmain/queryAll',
  method: 'get',
});

/**
 * 修改字典目录
 * @param {Object} data 字典(目录)对象
 */
export const updateDicmain = data => axios({
  url: 'sysmgr/dicmain/update',
  method: 'post',
  data,
});
