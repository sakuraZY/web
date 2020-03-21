/*
 * @File: ios项目通用apiConfig能力输出
 * @Author: wuhy 
 * @Date: 2020-03-17 10:25:09 
 * @Last Modified by: wuhy
 * @Last Modified time: 2020-03-17 11:02:36
 */

import { getApiPojo } from '@/libs/utils';
import config from '@/config';

const { urlType } = config;
const baseUrlType = 'ios';
const apiConfig = {
      config: {
      // Http数据接口的基础地址
          HTTP_BASE_URL: urlType[baseUrlType],
          HTTP_AUTHTOKEN: true,
          getHttpAuthToken: getApiPojo
      },
      extend: {}
}; 

export default apiConfig;