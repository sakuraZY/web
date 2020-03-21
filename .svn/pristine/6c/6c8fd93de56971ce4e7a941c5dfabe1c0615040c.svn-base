/*
 * @Descripttion:  基础业务-不动产-验证管理
 * @version: 1.0
 * @Author: zengying
 * @Date: 2020-03-10 12:35:11
 * @LastEditors: zengying
 * @LastEditTime: 2020-03-10 12:35:39
 */

/* eslint-disable */
import axios from '@/libs/axios';

/**
 * @name: 单元业务状态
 * @Date: 2020-02-29 19:54:21
 * @param {String} nodeName 节点名称 *
 * @param {Object} reqData
   * {
      "tsxx": [
        {
          "bdclx": "string",
          "tstybm": [
            "string"
          ]
        }
      ],
      "kzcs": {}
    }
 * @return:
 */
export const checkDYYWZT = ({ nodeName = '宜昌', bdclx = '房屋', tstybm = [], kzcs = {} } = {}
  = {}) => axios({
    url: 'bdc/dyywzt',
    method: 'post',
    baseUrlType: 'nres',
    timeout: 300000,
    params: {
      nodeName,
    },
    data() {
      return {
        tsxx: [
          {
            bdclx,
            tstybm,
          }
        ],
        kzcs
      }
    },
  });