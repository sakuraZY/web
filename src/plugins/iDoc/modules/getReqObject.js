/*
 * @File: 输出文档项目请求相关的能力
 * @Author: wuhy 
 * @Date: 2020-03-17 10:29:06 
 * @Last Modified by: wuhy
 * @Last Modified time: 2020-03-17 12:23:29
 */

import currDocObj from '../render';

const reqTypeArr = ['iAttachment', 'iTemplate', 'iParameter', 'iRecord'];
const reqObject = {};
reqTypeArr.map(item => {
  reqObject[`${item}Req`] = currDocObj.getReqObject(item);
});

export default reqObject;