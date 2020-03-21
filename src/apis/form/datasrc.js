/**
 * @File: 职员 Api接口服务
 * @Author: qiwei
 * @Date: 2020-03-03 17:25:33
 * @Last Modified by: qiwei
 * @Last Modified time: 2020-03-03 18:01:06
 */

import axios from '@/libs/axios';

/**
 * 新增数据节点
 * @param {Object} data 数据
 */
export const addDatasrcNode = data => axios({
  url: 'form/datasrc/addNode',
  method: 'post',
  data,
});

/**
 * 测试数据源连接
 * @param {Object} data 数据源对象
 * {
 *  "dbAddress": "string",
 *  "dbName": "string",
 *  "dbPassword": "string",
 *  "dbPort": "string",
 *  "dbType": "string",
 *  "dbUser": "string",
 *  "id": "string",
 *  "name": "string",
 *  "param1": "string",
 *  "param2": "string",
 *  "param3": "string",
 *  "type": "string"
 * }
 * @return {Object} 返回状态及其Token令牌信息
 */
export const checkDatasrc = data => axios({
  url: 'form/datasrc/check',
  method: 'post',
  data,
});

/**
 * 清理数据源连接
 */
export const clearDatasrcConnectPool = () => axios({
  url: 'form/datasrc/clearConnectionPool',
  method: 'get',
});

/**
 * 复制数据节点
 * @param {Object} data 数据
 */
export const copyDatasrcByNode = ({ copyNodeName, pNodeName }) => axios({
  url: 'form/datasrc/copyByNode',
  method: 'post',
  params: { copyNodeName, pNodeName },
});

/**
 * 删除数据节点
 * @param {Array} data 数据源节点标识数组
 */
export const deleteDatasrcNode = data => axios({
  url: 'form/datasrc/deleteNode',
  method: 'post',
  data,
});

/**
 * 数据源的获取
 * @param {Object} params 参数
 */
export const getDatasrc = params => axios({
  url: 'form/datasrc/get',
  method: 'get',
  params,
});

/**
 * 查询数据源-第三方
 * @param {Object} params 参数
 */
export const getDatasrcByThird = params => axios({
  url: 'form/datasrc/getByThird',
  method: 'get',
  params,
});

/**
 * 获取数据库当前时间
 * @param {Object} params 参数
 */
export const getDatasrcDate = params => axios({
  url: 'form/datasrc/getDate',
  method: 'get',
  params,
});

/**
 * 设置数据源无效
 * @param {String} srcId 数据源标识
 */
export const invalidDatasrc = srcId => axios({
  url: 'form/datasrc/getDate',
  method: 'post',
  params: { srcId },
});

/**
 * 获取数据源节点树
 * @param {Number} isSrc 是否加载数据源
 */
export const getDatasrcNodeTree = (isSrc = 1) => axios({
  url: 'form/datasrc/nodeTree',
  method: 'get',
  params: { isSrc },
});

/**
 * 查询简易数据源
 * @param {Object} params
 */
export const getSimpleDatasrc = params => axios({
  url: 'form/datasrc/simple',
  method: 'get',
  params,
});

/**
 * 查询数据源表名
 * @param {String} srcName 需要获取表数据的数据源名称
 * @param {String} pNodeName 需要获取当前的节点名称
 */
export const getDatasrcTable = ({ srcName, pNodeName } = {}) => axios({
  url: 'form/datasrc/table',
  method: 'get',
  params: {
    srcName,
    pNodeName,
  },
});

/**
 * 数据表对应的字段数据获取
 * @param {Object} param 参数
 *   @param {String} srcId 需要获取表数据的数据源id
 *   @param {String} tableName 需要获取表名
 *   @param {String} srcName 需要获取表数据的数据源名称
 *   @param {String} pNodeName 需要获取当前的节点名称
 */
export const getDatasrcTableField = ({
  srcId, tableName, srcName, pNodeName,
} = {}) => axios({
  url: 'form/datasrc/tableField',
  method: 'get',
  params: {
    srcId,
    tableName,
    srcName,
    pNodeName,
  },
});

/**
 * 数据源更新
 * @param {Array} data 当前需要保存的数据源对象
 */
export const updateDatasrc = data => axios({
  url: 'form/datasrc/update',
  method: 'post',
  data,
});


/**
 * 修改数据节点
 * @param {Object} data 数据
 */
export const updateDatasrcNode = data => axios({
  url: 'form/datasrc/updateNode',
  method: 'post',
  data,
});
