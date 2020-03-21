/*
 * @Descripttion: v1.00
 * @version: v1.00
 * @Author: huwei
 * @Date: 2020-01-13 09:03:21
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-03-03 17:46:23
 */
import Vue from 'vue';
import VueRouter from 'vue-router';
import config from '@/config';
import store from '@/store';
import routes from './routes';

const { systemName } = config;

Vue.use(VueRouter);

// 获取路由白名单path合集
const whiteNames = (routers) => {
  const authRouters = routers.filter(router => !(router.meta && router.meta.requireAuth));
  return authRouters.map(authRouter => authRouter.path);
};

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return { x: 0, y: 0 };
  },
});

router.beforeEach(async (to, from, next) => {
  // 设置title
  document.title = to.meta.title || systemName;
  // 白名单
  const whiteList = whiteNames(routes);
  if (whiteList.indexOf(to.path) > -1) {
    next();
  }
  // 判断是否有token
  const hasToken = store.state.user.token;
  if (hasToken) {
    next();
  } else if (to.meta.requireAuth && !/Login|Register/.test(to.name)) {
    let query = {};
    if (!/Home|PersonHome/.test(to.name)) {
      query = { redirect: to.path, ...to.query };
    }
    next({ name: 'Login', query });
  } else {
    next();
  }
});
// 解决重复路由报错问题
const routerPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error);
};
export default router;
