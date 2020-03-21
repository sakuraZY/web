/*
 * @Author: huwei
 *
 * @Date: 2020-03-11 16:15:44
 * @
# Description: 暂存接口
 */
/* eslint-disable */
import axios from '@/libs/axios';

export const advanceSave = ({ data, nodeName }) => axios({
  url: '/bdc/fwdt/zxsq/saveYGDJ',
  method: 'post',
  baseUrlType: 'nres',
  params: {
    nodeName
  },
  data,
});

export const YSZYSave = ({ data, nodeName }) => axios({
  url: '/bdc/fwdt/zxsq/saveYSZY',
  method: 'post',
  baseUrlType: 'nres',
  params: {
    nodeName
  },
  data,
});

/**
 * @name: 查封（轮候查封）暂存
 * @Date: 2020-03-14 21:36:14
 * @param {String} nodeName 节点名称 *
 * @param {Object} data 申请信息 *
 * @param {integer} operType 保存类型(0 暂存 ,1 提交 ,2 暂存+提交) Def: 0
 * @return: 
 */
export const saveCFLHCF = ({ data, nodeName = '宜昌' }) => axios({
  url: '/bdc/fwdt/zxsq/saveCFDJ',
  method: 'post',
  baseUrlType: 'nres',
  params: {
    nodeName
  },
  data,
});

export const submitUrlESZY = '/bdc/fwdt/zxsq/saveESZY';

export const ESZYSave = ({ data, nodeName }) => axios({
  url: '/bdc/fwdt/zxsq/saveESZY',
  method: 'post',
  baseUrlType: 'nres',
  params: {
    nodeName
  },
  data,
});