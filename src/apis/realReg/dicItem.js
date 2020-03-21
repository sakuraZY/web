
import axios from '@/libs/axios';
/**
 * 通过字典名称获取字典信息
 * @param {Object} params
 */
export const queryByDicname = params => axios({
  url: 'sysmgr/dicitem/queryByDicname',
  method: 'post',
  params: {
    dicName: params.dicName,
  },
});

/**
 * 字典项名称转为字典项值
 * @param {Object} params
 */
export const transferNameToValue = params => axios({
  url: 'sysmgr/dicitem/transferNameToValue',
  method: 'post',
  params: {
    dicmainName: params.dicmainName,
    itemName: params.itemName,
  },
});
/**
 * 字典项值转为字典项名称
 * @param {Object} params
 */
export const transferValueToName = params => axios({
  url: 'sysmgr/dicitem/transferValueToName',
  method: 'post',
  params: {
    dicmainName: params.dicmainName,
    itemValue: params.itemValue,
  },
});
