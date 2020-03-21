import axios from '@/libs/axios';

/**
 * 申请一个顺序号码
 * @param params
 * @returns {*}
 */
export const requestKey = keySysname => axios({
  url: 'sysmgr/keygen/requestKey',
  method: 'post',
  params: {
    keySysname, // 系统叫号标识
  },
});

/**
 * 放弃重新使用号码
 * @param params
 * @returns {*}
 */
export const giveUpKey = data => axios({
  url: 'ios/sysmgr/keygen/giveUpKey',
  method: 'post',
  params: {
    keySysname: data.keySysname, // 系统叫号标识
    reqKey: data.reqKey, // 待放弃使用号码
  },
});
/**
 * 确认使用号码
 * @param params
 * @returns {*}
 */
export const ensureKey = data => axios({
  url: 'ios/sysmgr/keygen/ensureKey',
  method: 'post',
  params: {
    keySysname: data.keySysname, // 系统叫号标识
    reqKey: data.reqKey, // 待确认使用号码
  },
});
