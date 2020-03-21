/*
 * @Descripttion:  获取字典数据的方法
 * @version: 1.0
 * @Author: zengying
 * @Date: 2020-03-13 14:12:35
 * @LastEditors: zengying
 * @LastEditTime: 2020-03-14 11:01:39
 */

import { queryByDicname } from '@/apis/sysmgr/dicItem';

export default {
  methods: {
    getDicList(dicName) {
      return new Promise((resolve) => {
        queryByDicname(dicName).then((res) => {
          if (res.code !== 0) {
            throw new Error(res.msg || `获取${dicName}字典失败`);
          } else {
            resolve(res);
          }
        }).catch((err) => {
          let sErrortip = '';
          if (err.message.includes('timeout')) {
            sErrortip = '网络请求超时';
          }
          this.$message({
            type: 'error',
            message: sErrortip + (err.message || `获取${dicName}字典失败`),
          });
          resolve('');
        });
      });
    },
  },
};
