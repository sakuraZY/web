/*
 * @Author: huwei
 * @Date: 2020-02-14 10:09:22
 * @
# Description:
 */
import axios from '@/libs/axios';

// axios.defaults.baseURL = 'http://192.168.37.201:8089/nres';

/**
 * 不动产数据验证
 * @param {Object} data 不动产信息（bdczh,qlrmc）
 */
// eslint-disable-next-line import/prefer-default-export
export const checkBDC = ({ data, nodeName }) => axios({
  url: '/bdc/fwdt/zxcx/getBDCXX',
  baseUrlType: 'nres',
  method: 'get',
  params: {
    qlrmc: data.qlrmc,
    nodeName,
    ywlx: data.ywlx,
    zh: data.ygzmh,
    isDY: data.isDY,
  },
});

/**
 * 预告抵押业务申请数据保存
 * @param {Object} data 不动产信息（bdczh,qlrmc）
 */
export const saveYGDY = ({ data, nodeName }) => axios({
  url: '/bdc/fwdt/zxsq/saveYGDY',
  baseUrlType: 'nres',
  method: 'post',
  data,
  params: {
    nodeName,
  },
});
/**
 * 预告抵押业务申请数据提交
 * @param {*} param0
 */
export const handleSubmit = ({ data, nodeName }) => axios({
  url: '/bdc/fwdt/zxtj/submitYGDY',
  method: 'post',
  baseUrlType: 'nres',
  params: {
    nodeName,
  },
  data,
});
/**
 * 不动产数据验证
 * @param {Object} data 不动产信息（bdczh,qlrmc）
 */
export const checkHT = ({ data, nodeName }) => axios({
  url: '/bdc/fwdt/zxcx/getHT',
  baseUrlType: 'nres',
  method: 'get',
  params: {
    qlrmc: data.qlrmc,
    htbh: data.htbh,
    nodeName,
    isDY: data.isDY,
  },
});
/**
 * 预告及预告抵押业务申请数据保存
 * @param {Object} data 不动产信息（bdczh,qlrmc）
 */
export const saveYGYGDY = ({ data, nodeName }) => axios({
  url: '/bdc/fwdt/zxsq/saveYGYGDY',
  baseUrlType: 'nres',
  method: 'post',
  data,
  params: {
    nodeName,
  },
});
/**
 * 抵押业务申请数据保存
 * @param {Object} data 不动产信息（bdczh,qlrmc）
 */
export const saveDYDJ = ({ data, nodeName }) => axios({
  url: '/bdc/fwdt/zxsq/saveDYDJ',
  baseUrlType: 'nres',
  method: 'post',
  data,
  params: {
    nodeName,
  },
});

/**
 * 一手转移(含抵押)业务申请数据保存
 * @param {Object} data 不动产信息（bdczh,qlrmc）
 */
export const saveYSZYDY = ({ data, nodeName }) => axios({
  url: '/bdc/fwdt/zxsq/saveYSZYDY',
  baseUrlType: 'nres',
  method: 'post',
  data,
  params: {
    nodeName,
  },
});

/**
 * 二手转移(含抵押)业务申请数据保存
 * @param {Object} data 不动产信息（bdczh,qlrmc）
 */
export const saveESZYDY = ({ data, nodeName }) => axios({
  url: '/bdc/fwdt/zxsq/saveESZYDY',
  baseUrlType: 'nres',
  method: 'post',
  data,
  params: {
    nodeName,
  },
});

/**
 * 通过字典名称获取字典信息
 * @param {Object} params
 */
export const queryByDicname = params => axios({
  url: 'sysmgr/dicitem/queryByDicname',
  method: 'post',
  params: {
    dicName: params.dicName,
  },
});

/**
 * 申请一个顺序号码
 * @param params
 * @returns {*}
 */
export const requestKey = keySysname => axios({
  url: 'sysmgr/keygen/requestKey',
  method: 'post',
  params: {
    keySysname, // 系统叫号标识
  },
});

/**
 * 放弃重新使用号码
 * @param params
 * @returns {*}
 */
export const giveUpKey = data => axios({
  url: 'ios/sysmgr/keygen/giveUpKey',
  method: 'post',
  params: {
    keySysname: data.keySysname, // 系统叫号标识
    reqKey: data.reqKey, // 待放弃使用号码
  },
});
/**
 * 确认使用号码
 * @param params
 * @returns {*}
 */
export const ensureKey = data => axios({
  url: 'ios/sysmgr/keygen/ensureKey',
  method: 'post',
  params: {
    keySysname: data.keySysname, // 系统叫号标识
    reqKey: data.reqKey, // 待确认使用号码
  },
});


export const submitUrlYGYGDY = '/bdc/fwdt/zxsq/saveYGYGDY';

export const submitUrlYGDY = '/bdc/fwdt/zxsq/saveYGDY';

export const submitUrlDYDJ = '/bdc/fwdt/zxsq/saveDYDJ';

export const submitUrlYSZYDY = '/bdc/fwdt/zxsq/saveYSZYDY';

export const submitUrlESZYDY = '/bdc/fwdt/zxsq/saveESZYDY';
