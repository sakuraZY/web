/*
 * @Descripttion:  基础业务-不动产-楼盘表
 * @version: 1.0
 * @Author: zengying
 * @Date: 2020-03-10 12:28:20
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-03-10 14:39:37
 */

import axios from '@/libs/axios';
/**
 * @name: 查询幢信息
 * @Date: 2020-02-07 11:52:15
 * @param {Number} pageNo 页码
 * @param {Number} pageSize 每页数
 * @param {String} nodeName 节点名称
 * @param {Object} data
 * @return:
 */
// 5分钟请求时间超过，仍无法请求到数据，反馈用户结果
export const getBuilding = ({
  data = {}, pageNo = 1, pageSize = 10, nodeName = '', useLike = '是', pageTotal = true,
} = {}) => axios({
  url: 'bdc/base/lpb/queryZ',
  method: 'post',
  baseUrlType: 'nres',
  timeout: 300000,
  params: {
    pageNo,
    pageSize,
    nodeName,
    useLike,
    pageTotal,
  },
  data,
});


/**
 * @name: 户信息查询
 * @Date: 2020-02-13 14:13:21
 * @param {integer} pageNo 页码 接口DEF 1,为0查所有不分页
 * @param {integer} pageSize 每页数 DEF 20
 * @param {boolean} pageTotal 数据总数 DEF false
 * @param {String} nodeName 节点名称 *
 * @param {String} showDetail 是否显示宗地、逻辑幢 *
 * @param {String} showRegister 是否显示登记信息(不动产证号,权利人名称) *
 * @param {String} showRetrospect 是否显示追溯信息 *
 * @param {String} tstybm 幢图属统一编码 *
 * @param {String} zdtybm 宗地统一编码
 * @param {Object} data
 * @return:
 */

// 5分钟请求时间超过，仍无法请求楼盘，反馈用户结果
export const getHouses = ({
  nodeName = '', tstybm = '', zdtybm = '', showDetail = '是', showRegister = '否', showRetrospect = '否', pageNo = 0,
} = {}) => axios({
  url: 'bdc/base/lpb/queryH',
  method: 'post',
  baseUrlType: 'nres',
  timeout: 300000,
  params: {
    nodeName,
    tstybm,
    zdtybm,
    showDetail,
    showRegister,
    showRetrospect,
    pageNo,
  },
});

export const getQueryH = data => axios({
  url: '/bdc/base/lpb/queryH',
  method: 'post',
  baseUrlType: 'nres',
  params: data,
});
