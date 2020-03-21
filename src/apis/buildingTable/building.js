/*
 * @Descripttion:  Api接口服务
 * @version: 1.0
 * @Author: zengying
 * @Date: 2020-02-07 11:46:07
 * @LastEditors: zengying
 * @LastEditTime: 2020-03-10 12:33:59
 */

/* eslint-disable */
import axios from '@/libs/axios';

/* queryMessage */
export const getDicitem = dicName => axios({
  url: 'sysmgr/dicitem/getDicitem',
  method: 'get',
  params: {
    dicName,
  },
});
export const requestKey = keySysname => axios({
  url: 'sysmgr/keygen/requestKey',
  method: 'post',
  params: {
    keySysname,
  },
});
export const queryByUserId = userId => axios({
  url: 'auth/employee/queryByUserId',
  method: 'get',
  params: {
    userId,
  },
});

export const getQueryH = (data) => axios({
  url: '/bdc/base/lpb/queryH',
  method: 'post',
  baseUrlType: 'nres',
  params: data,
});

export const handleSave = ({ data, nodeName }) => axios({
  url: '/bdc/fwdt/zxsq/saveSCDJ',
  method: 'post',
  baseUrlType: 'nres',
  params: {
    nodeName
  },
  data,
});

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

export const handleSubmit = ({ data, nodeName, url = '/bdc/fwdt/zxtj/submitSCDJ' }) => axios({
  url,
  method: 'post',
  baseUrlType: 'nres',
  params: {
    nodeName,
    operType: 1,
  },
  data,
});

export const fjinit = (data) => axios({
  url: '/doc/attachment/init',
  method: 'post',
  params: data,
});

export const fjqueryTree = (data) => axios({
  url: '/doc/attachment/queryTree',
  method: 'post',
  params: data,
});
