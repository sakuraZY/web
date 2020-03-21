/**
 * @File: App Api接口服务
 * @Author: qiwei
 * @Date: 2020-01-17 10:32:33
 * @Last Modified by: qiwei
 * @Last Modified time: 2020-03-06 11:18:05
 */
import axios from '@/libs/axios';
/**
 * 登录
 * @param {Object} data 登录参数对象
 */
export const login = data => axios({
  url: 'frame/login',
  method: 'post',
  data,
});
/**
 * 登出
 */
export const logout = () => axios({
  url: 'frame/logout',
  method: 'get',
});

/**
 * 个人用户注册
 * @param {Object} data 注册对象
 */
export const register = data => axios({
  url: 'frame/registerUser',
  method: 'post',
  data,
});
/**
 * 获取手机验证码
 * @param {String}} phone 手机号
 */
export const getCode = phone => axios({
  url: 'frame/getYzm',
  method: 'post',
  params: {
    phone,
  },
});
