/*
 * @Descripttion:  Api接口服务
 * @version: 1.0
 * @Author: zengying
 * @Date: 2020-03-14 16:22:17
 * @LastEditors: zengying
 * @LastEditTime: 2020-03-21 15:17:04
 */

/**
 * @File: 项目主入口
 * @Author: qiwei
 * @Date: 2020-01-07 16:13:16
 * @Last Modified by: qiwei
 * @Last Modified time: 2020-02-27 20:38:48
 */
import Vue from 'vue';
import 'normalize.css/normalize.css';
import './plugins/element';
import 'xe-utils';
import './plugins/vxeTable';
import App from './App.vue';
import router from './router';
import store from './store';
import '@/icons';
import * as filters from './filters';
import '@/styles/sidebar.scss';

// 注册过滤器
Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key]);
});
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
// console.log(const a = a);
