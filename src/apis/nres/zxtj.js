/*
 * @Author: huwei
 * @Date: 2020-03-10 13:58:48
 * @
# Description:在线提交
 */
import axios from '@/libs/axios';

export const submitUrlYGDJ = '/bdc/fwdt/zxsq/saveYGDJ'; // '/bdc/fwdt/zxtj/submitYGDJ';

export const submitUrlDYZX = '/bdc/fwdt/zxsq/saveDYZX';

export const submitUrlYSZY = '/bdc/fwdt/zxsq/saveYSZY';

export const submitUrlCFLHCF = '/bdc/fwdt/zxsq/saveCFDJ';

export const submitUrlJFDJ = '/bdc/fwdt/zxsq/saveJFDJ';

/**
 * 保存业务申请数据
 * @param {Object} data 业务数据
 * @param {String} nodeName 区域节点
 * @param {String} url 接口路径
 */
export const handleSave = ({ data, nodeName, url = '/bdc/fwdt/zxsq/saveSCDJ' }) => axios({
  url,
  method: 'post',
  baseUrlType: 'nres',
  params: {
    nodeName,
    operType: 0,
  },
  data,
});

/**
 * 提交业务数据
 * @param {Object} data 业务数据
 * @param {String} nodeName 区域节点
 * @param {String} url 接口路径
 */
export const handleSubmit = ({ data, nodeName, url = '/bdc/fwdt/zxsq/saveSCDJ' }) => axios({
  url,
  method: 'post',
  baseUrlType: 'nres',
  params: {
    nodeName,
    operType: 1,
  },
  data,
});