/*
 * @Descripttion:  用户相关接口
 * @version: 1.0
 * @Author: zengying
 * @Date: 2020-02-17 14:47:45
 * @LastEditors: zengying
 * @LastEditTime: 2020-03-21 11:41:55
 */
import axios from '@/libs/axios';
/**
 * 添加用户
 * @param {Object} data 用户信息
 */
export const addUser = data => axios({
  url: 'auth/user/add',
  method: 'post',
  data,
});
/**
* 查看是否已经存在同名用户
* @param {String} userName 用户姓名
*/
export const checkExistByUserName = userName => axios({
  url: 'auth/user/checkExistByUserName',
  method: 'post',
  params: {
    userName,
  },
});
/**
* 删除用户
* @param {Array} data 要删除用户的id
*/
export const deleteUser = data => axios({
  url: 'auth/user/delete',
  method: 'post',
  data,
});
/**
* 根据用户ID批量查询用户信息
* @param {Array} data 用户ID数组
*/
export const getUsersByIds = data => axios({
  url: 'auth/user/queryByIds',
  method: 'post',
  data,
});
/**
* 修改用户密码
* @param data
*/
export const updatePassword = data => axios({
  url: 'auth/user/updatePassword',
  method: 'post',
  data,
});

/**
 * @name: 重置密码
 * @Date: 2020-02-21 20:21:43
 * @param {String} cardNo 身份证号码
 * @param {String} code 验证码
 * @param {String} password 密码
 * @param {String} phone 手机号
 * @return:
 */
export const resetPassword = ({
  cardNo = '', code = '', password = '', phone = '', userType = '1',
} = {}) => axios({
  url: 'frame/resetPassword',
  method: 'post',
  data: {
    cardNo,
    code,
    password,
    phone,
    userType,
  },
});

/**
 * @name: 验证验证码
 * @Date: 2020-02-21 21:21:43
 * @param {String} code 验证码
 * @param {String} phone 手机号
 * @return:
 */
export const checkYzm = ({
  code = '', phone = '',
} = {}) => axios({
  url: 'frame/checkYzm',
  method: 'post',
  params: {
    code,
    phone,
  },
});

/**
* 启用用户
* @param {Boolean} userState 用户状态
* @param {Array} data 用户ID数组
*/
export const switchUserState = (userState, data) => axios({
  url: 'auth/user/switchState',
  method: 'post',
  params: {
    userState,
  },
  data,
});
/**
* 新增用户参数
* @param {Object} data 参数信息
*/
export const addUserParameter = data => axios({
  url: 'auth/user/parameter/add',
  method: 'post',
  data,
});
/**
* 删除用户参数
* @param {Array} data 参数id数组
*/
export const deleteUserParameter = data => axios({
  url: 'auth/user/parameter/delete',
  method: 'post',
  data,
});
/**
* 查询用户参数
* @param {String} userId 用户ID
*/
export const getUserParameter = userId => axios({
  url: 'auth/user/parameter/query',
  method: 'get',
  params: {
    userId,
  },
});
/**
* 修改用户参数
* @param {Object} data 参数标识
*/
export const updateUserParameter = data => axios({
  url: 'auth/user/parameter/update',
  method: 'post',
  data,
});
/**
* 获取用户错误次数
* @param {String} userName 登陆用户名(别名或id)
*/
export const getUserErrorCount = userName => axios({
  url: 'auth/user/getUserErrorCount',
  method: 'get',
  params: {
    userName,
  },
});
/**
* 通过登录接口获取用户信息
* @param {Object} data 用户信息
*/
export const getUserByLogin = data => axios({
  url: 'auth/user/getUserByLogin',
  method: 'post',
  data,
});
