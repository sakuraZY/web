/*
 * @Description: 附件模板Api接口服务
 * @Author: wangjiayu
 * @Date: 2020-02-26 19:21:09
 * @LastEditors: wangjiayu
 * @LastEditTime: 2020-02-28 19:33:22
 */

import axios from '@/libs/axios';

/**
 * 新增附件模板信息
 * @param {Object} templateData 附件模板信息
 */
export const addTemplate = templateData => axios({
  url: '/doc/template/add',
  method: 'post',
  data: templateData,
});

/**
 * 更新附件模板信息
 * @param {Object} templateData 附件模板信息
 */
export const updateTemplate = templateData => axios({
  url: '/doc/template/update',
  method: 'post',
  data: templateData,
});

/**
 * 批量删除附件模板信息
 * @param {Array} idArr 附件模板标识
 */
export const deleteTemplate = idArr => axios({
  url: '/doc/template/batchDelete',
  method: 'post',
  data: idArr,
});

/**
 * 查询附件模板信息（带参数信息）
 * @param {String} templateId 附件模板标识
 */
export const queryTemplate = docPnode => axios({
  url: '/doc/template/queryTemplateAndParameter',
  method: 'post',
  params: {
    docPnode,
  },
});


/**
 * 上传附件模板文件
 * @param {Object} params 附件模板参数
 * @param {Object} data 文件数据
 */
export const uploadTemplateFile = (params, data) => axios({
  url: '/doc/template/uploadTemplateFile',
  method: 'post',
  params,
  data,
});

/**
 * 查看附件模板文件
 * @param {String} pNode 附件模板关联编号
 * @param {String} pType 附件模板类型
 * @param {Array} binIds 文件id
 */
export const getTemplateFile = (pNode, pType, binIds) => axios({
  url: '/doc/attachment/getFile',
  method: 'post',
  params: {
    pNode,
    pType,
  },
  data: binIds,
});

/**
 * 更新附件模板参数
 * @param {Object} data 附件模板参数
 */
export const updateTemplateParam = data => axios({
  url: '/doc/parameter/update',
  method: 'post',
  data,
});
