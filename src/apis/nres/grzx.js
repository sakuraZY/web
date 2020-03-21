/*
 * @Descripttion:  基础业务-服务大厅-个人中心
 * @version: 1.0
 * @Author: zengying
 * @Date: 2020-03-10 12:40:27
 * @LastEditors: zengying
 * @LastEditTime: 2020-03-10 12:40:49
 */

import axios from '@/libs/axios';

/**
 * @name:获取案件列表
 * @Date: 2020-02-28 14:31:22
 * @param {integer} pageNo 页码 接口DEF 1,为0查所有不分页
 * @param {integer} pageSize 每页数 DEF 20
 * @param {boolean} pageTotal 数据总数 DEF false
 * @param {String} nodeName 节点名称 *
 * @param {Object} data
   * {
      "sqrid": "string",
      "sqrsfzh": "string",
      "sqrdhhm": "string",
      "ajzt": "string",
      "sqbh": "string",
      "djxl": "string"
    }
 * @return:
 */
// 5分钟请求时间超过，仍无法请求到数据，反馈用户结果
export const queryAJLB = ({
  pageNo = 1, pageSize = 10, nodeName = '宜昌', pageTotal = true, data = {},
} = {}) => axios({
  url: 'bdc/fwdt/grzx/queryAJLB',
  method: 'post',
  baseUrlType: 'nres',
  timeout: 300000,
  params: {
    pageNo,
    pageSize,
    nodeName,
    pageTotal,
  },
  data,
});

/**
 * @name:获取案件详情
 * @Date: 2020-02-28 14:31:15
 * @param {String} djxl 登记小类  *
 * @param {String} sqbh  申请编号 *
 * @param {String} nodeName 节点名称 *
 * @return:
 */
export const getAJXQ = ({ sqbh = '', nodeName = '宜昌', djxl = '1' } = {}) => axios({
  url: 'bdc/fwdt/grzx/getAJXQ',
  method: 'get',
  baseUrlType: 'nres',
  timeout: 300000,
  params: {
    sqbh,
    nodeName,
    djxl,
  },
});

/**
 * 获取区域名称
 */
export const queryAreaName = () => axios({
  url: 'bdc/fwdt/grzx/queryAreaName',
  method: 'get',
  baseUrlType: 'nres',
});
