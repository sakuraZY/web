/*
 * @File: iDocClass初始化
 * @Author: wuhy 
 * @Date: 2020-03-17 10:25:09 
 * @Last Modified by: wuhy
 * @Last Modified time: 2020-03-17 11:19:14
 */

import apiConfig from '../iosExtend/apiConfig';
import iDocClass from '@/plugins/iDoc/iDoc.min';

// 注意传递给iDoc用于初始化的用户鉴权信息，一定要时有效的
const config = {
  oApiConfig: apiConfig
}

export  default iDocClass.init(config);

