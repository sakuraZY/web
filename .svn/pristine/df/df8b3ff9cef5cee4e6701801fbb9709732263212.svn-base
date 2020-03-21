/*
 * @Descripttion:  基础业务-服务大厅-在线查询
 * @version: 1.0
 * @Author: huwei
 * @Date: 2020-03-10 12:40:27
 * @LastEditors: wangjiayu
 * @LastEditTime: 2020-03-17 16:30:14
 */

import axios from '@/libs/axios';

export const testBuild = data => axios({
  url: '/bdc/fwdt/zxcx/getHT',
  method: 'get',
  baseUrlType: 'nres',
  params: data,
});

export const getPersonHTLB = data => axios({
  url: '/bdc/fwdt/zxcx/getHTLB',
  method: 'get',
  baseUrlType: 'nres',
  params: data,
});

/**
 * 不动产信息查询
 * @param {Object} data 证书权利人信息
 */
export const getBDCXX = data => axios({
  url: '/bdc/fwdt/zxcx/getBDCXX',
  baseUrlType: 'nres',
  method: 'get',
  params: data,
});

/**
 * @name:根据权利人获取产权证信息与不动产信息
 * @Date: 2020-02-28 14:31:15
 * @param {String} nodeName 节点名称 *
 * @param {Array} data 节点名称 *
   * @param {String} qlrmc 权利人名称  *
   * @param {String} zjlx  证件类型 *
   * @param {String} zjhm  证件号码 *
 * @return:{Object}
 */
export const getBDCXXByQLR = ({ nodeName = '宜昌', data = [] } = {}) => axios({
  url: 'bdc/fwdt/zxcx/getBDCXXByQLR',
  method: 'post',
  baseUrlType: 'nres',
  timeout: 300000,
  params: {
    nodeName,
  },
  data,
});


/**
 * @name:查询不动产信息通过产权证号
 * @Date: 2020-02-28 14:31:15
 * @param {String} nodeName 节点名称 *
 * @param {Array} data 产权证信息 *
   * @param {String} qlrmc 权利人名称 *
   * @param {String} zjlx  证件类型 *
   * @param {String} zjhm  证件号码 *
 * @return:{Object}
 */
export const getBDCXXByCQZH = ({ nodeName = '宜昌', data = [] } = {}) => axios({
  url: 'bdc/fwdt/zxcx/getBDCXXByCQZH',
  method: 'post',
  baseUrlType: 'nres',
  timeout: 300000,
  params: {
    nodeName,
  },
  data,
});

/**
 * 获取查封信息
 * @param {String} nodeName 区域节点
 * @param {Array} data 查询信息
 */
export const getCFXX = (nodeName, data) => axios({
  url: 'bdc/fwdt/zxcx/getCFXX',
  method: 'post',
  baseUrlType: 'nres',
  params: {
    nodeName,
  },
  data,
});
