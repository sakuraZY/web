/*
 * @Description: 附件实例 Api 接口服务
 * @Author: wangjiayu
 * @Date: 2020-03-09 09:28:16
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-03-19 20:46:23
 */


import axios from '@/libs/axios';

/**
 * 初始化附件实例目录
 * @param {*} data 附件实例参数
 */
export const getFile = data => axios({
  url: '/doc/attachment/init',
  method: 'post',
  params: data,
});

/**
 * 初始化附件实例目录
 * @param {*} data 附件实例参数
 */
export const init = (params, binids) => axios({
  url: '/doc/attachment/init',
  method: 'post',
  params,
  data: binids,
});

/*
*附件上传相关接口
*
*/
export const imgUpload = (data, formData) => axios({
  url: 'doc/attachment/upload',
  method: 'post',
  params: data,
  data: formData,
});

export const imgView = (data, bindId) => axios({
  url: 'doc/attachment/getFile',
  method: 'post',
  params: data,
  data: bindId,
});

export const imgDele = (data, bindId) => axios({
  url: 'doc/attachment/batchDelete',
  method: 'post',
  params: data,
  data: bindId,
});

export const fjqueryTree = data => axios({
  url: '/doc/attachment/queryTree',
  method: 'post',
  params: data,
});
