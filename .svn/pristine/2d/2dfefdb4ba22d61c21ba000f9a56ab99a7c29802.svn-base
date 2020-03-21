/*
 * @Descripttion:  Api接口服务
 * @version: 1.0
 * @Author: zengying
 * @Date: 2020-03-06 15:28:21
 * @LastEditors: zengying
 * @LastEditTime: 2020-03-21 14:20:30
 */
import axios from 'axios';
import { MessageBox } from 'element-ui';
import config from '@/config';
import store from '@/store';
import { getApiPojo } from '@/libs/utils';


const { urlType, needTicketUrlType, ticketExpiry } = config;
const instance = axios.create({
  // timeout: 3000,
});

instance.interceptors.request.use(async (cfg) => {
  const { baseUrlType = 'ios' } = cfg;
  cfg.baseURL = urlType[baseUrlType];
  cfg.params = {
    ...cfg.params,
    ...(needTicketUrlType.includes(baseUrlType) ? {} : getApiPojo()),
    T: new Date().getTime(),
  };
  if (needTicketUrlType.includes(baseUrlType)) {
    const { ticket, ticketTime } = store.state.app;
    const { userType } = store.state.user;
    if (!ticket || !ticketTime || new Date().getTime() - Number(ticketTime) >= ticketExpiry) {
      await store.dispatch('app/getTicket', userType === '企业用户');
    }
    // cfg.headers.common.Ticket = store.state.app.ticket;
    cfg.params = { ...cfg.params, ticket: store.state.app.ticket };
  }
  return cfg;
}, error => Promise.reject(error));
instance.interceptors.response.use((response) => {
  const res = response.data;
  if (response.config.responseType === 'blob') {
    return res;
  }
  if (res.code === 0) {
    return res;
  }
  if (res.code === 2) {
    // to re-login
    MessageBox.confirm('登录已过期或被登出', '确认重新登录', {
      confirmButtonText: '重新登录',
      cancelButtonText: '取消',
      type: 'warning',
    }).then(() => {
      // router.push({ name: 'Login' });
      store.dispatch('user/reset').then(() => {
        location.reload();
      });
    });
  }
  return Promise.reject(new Error(res.msg || 'Error'));
}, error => Promise.reject(error));

export default instance;
