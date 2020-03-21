/*
 * @File: 输出文档对象中实例相关的能力
 * @Author: wuhy 
 * @Date: 2020-03-17 10:28:40 
 * @Last Modified by: wuhy
 * @Last Modified time: 2020-03-17 12:19:48
 */

import currDocObj from '../render';

const classTypeArr = ['iAttachMag', 'iDocFile', 'iDocFolder', 'iTemplate', 'iParam'];

const caseObject = {};
classTypeArr.map(item => {
  caseObject[`${item}Class`] = currDocObj.initClass(item);
});

export default caseObject;