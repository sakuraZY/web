/*
 * @Description: 综合查询 Api 接口服务
 * @Author: wangjiayu
 * @Date: 2020-03-20 09:26:33
 * @LastEditors: wangjiayu
 * @LastEditTime: 2020-03-20 09:34:32
 */

import axios from '@/libs/axios';

/**
 * 不动产进度查询
 * @param {Object} data 查询信息
 *  @param {String} nodeName 区域节点
 *  @param {String} qlrmc 权利人名称
 *  @param {String} slbh 申请编号
 */
const getBDCJD = data => axios({
  url: '/bdc/fwdt/zhcx/getBDCJD',
  method: 'get',
  baseUrlType: 'nres',
  params: data,
});

export default getBDCJD;
