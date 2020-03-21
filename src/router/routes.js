/*
 * @Descripttion: v1.00
 * @version: v1.00
 * @Author: huwei
 * @Date: 2020-01-08 10:43:13
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-03-20 17:04:03
 */
import Layout from '@/layouts/Impersonal/default';

const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '/',
        name: 'Home',
        component: () => import('@/views/Impersonal/Dashbord'),
        meta: {
          title: '首页',
          requireAuth: true,
        },
      },
      {
        path: 'om',
        name: 'OrgManage',
        component: () => import('@/views/Impersonal/OrgManage'),
        meta: { requireAuth: true, title: '组织管理' },
      },
      {
        path: 'rm',
        name: 'RoleManage',
        component: () => import('@/views/Impersonal/RoleManage'),
        meta: { requireAuth: true, titele: '用户角色管理' },
      },
      {
        path: 'am',
        name: 'AuthManage',
        component: () => import('@/views/Impersonal/AuthManage'),
        meta: { requireAuth: true, titele: '功能权限管理' },
      },
      {
        path: 'dm',
        name: 'DictionaryManage',
        component: () => import('@/views/Impersonal/DictionaryManage'),
        meta: { requireAuth: true, titele: '字典管理' },
      },
      {
        path: 'mm',
        name: 'MenuManage',
        component: () => import('@/views/Impersonal/MenuManage'),
        meta: { requireAuth: true, titele: '功能菜单管理' },
      },
      {
        path: 'lm',
        name: 'LogManage',
        component: () => import('@/views/Impersonal/LogManage'),
        meta: { requireAuth: true, titele: '用户操作日志' },
      },
      {
        path: 'alm',
        name: 'AttachmentListManage',
        component: () => import('@/views/Impersonal/AttachmentListManage'),
        meta: { requireAuth: true, titele: '附件清单管理' },
      },
      {
        path: 'mortgage/:sqbh?',
        name: 'UserMortgage',
        component: () => import('@/views/Impersonal/User/Mortgage'),
        // meta: { requireAuth: true },
      },
      {
        path: 'ygdy/:sqbh?',
        name: 'RealRegygdy',
        component: () => import('@/views/Impersonal/User/Realreg/YGDY'),
        meta: { requireAuth: true },
      },
      {
        path: 'ygjygdy/:sqbh?',
        name: 'RealRegygjygdy',
        component: () => import('@/views/Impersonal/User/Realreg/YGJYGDY'),
        meta: { requireAuth: true },
      },
      {
        path: 'dydj/:sqbh?',
        name: 'RealRegdydj',
        component: () => import('@/views/Impersonal/User/Realreg/DYDJ'),
        meta: { requireAuth: true },
      },
      {
        path: 'yszydy/:sqbh?',
        name: 'RealRegyszydy',
        component: () => import('@/views/Impersonal/User/Realreg/YSZYDY'),
        meta: { requireAuth: true, title: '一手转移(含抵押)登记' },
      },
      {
        path: 'eszydy/:sqbh?',
        name: 'RealRegeszydy',
        component: () => import('@/views/Impersonal/User/Realreg/ESZYDY'),
        meta: { requireAuth: true, title: '二手转移(含抵押)登记' },
      },
      {
        path: 'dyzx/:sqbh?',
        name: 'RealRegdyzx',
        component: () => import('@/views/Impersonal/User/Realreg/DYZX'),
        meta: { requireAuth: true },
      },
      {
        path: 'beforehand/:sqbh?',
        name: 'UserBeforehand',
        component: () => import('@/views/Impersonal/User/Beforehand'),
        meta: { requireAuth: true },
      },
      {
        path: 'scdj/:sqbh?',
        name: 'SCDJ',
        component: () => import('@/views/Impersonal/User/Firsthand'),
        meta: { requireAuth: true, title: '首次登记' },
      },
      {
        path: 'ygdj/:sqbh?',
        name: 'YGDJ',
        component: () => import('@/views/Impersonal/User/Advance'),
        meta: { requireAuth: true, title: '预告登记' },
      },
      {
        path: 'ysfzy/:sqbh?',
        name: 'YSFZY',
        component: () => import('@/views/Impersonal/User/Realreg/YSFZY'),
        meta: { requireAuth: true, title: '一手房转移' },
      },
      {
        path: 'eszy/:sqbh?',
        name: 'ESZY',
        component: () => import('@/views/Impersonal/User/Realreg/ESZY'),
        meta: { requireAuth: true, title: '二手房转移' },
      },
      {
        path: 'cfdj/:sqbh?',
        name: 'CFDJ',
        component: () => import('@/views/Impersonal/User/Realreg/CFDJ'),
        meta: { requireAuth: true, title: '查封登记（含轮候查封）' },
      },
      {
        path: 'jfdj/:sqbh?',
        name: 'JFDJ',
        component: () => import('@/views/Impersonal/User/Realreg/JFDJ'),
        meta: { requireAuth: true, title: '解封登记' },
      },
      {
        path: 'mf',
        name: 'MyFlow',
        component: () => import('@/views/Impersonal/MyFlow'),
        meta: { requireAuth: true, title: '我的办件' },
      },
      {
        path: 'xq/:sqbh?',
        name: 'FlowDetail',
        component: () => import('@/views/Impersonal/MyFlow/FlowDetail'),
        meta: { requireAuth: true, title: '查看详情' },
      },
      {
        path: 'qbq',
        name: 'QueryBDCXXBYQLR',
        component: () => import('@/components/queryBDCXXBYQLR'),
        meta: { requireAuth: true, title: '查询产权信息' },
      },
    ],
  },
  {
    path: '/i',
    component: Layout,
    children: [
      {
        path: '/',
        name: 'IconList',
        meta: { title: '图标列表' },
        component: () => import('@/views/Impersonal/IconList'),
      },
    ],
  },
  {
    path: '/p',
    component: () => import('@/layouts/Personal'),
    children: [
      {
        path: '/',
        name: 'PersonHome',
        component: () => import('@/views/Personal/Home'),
        meta: { requireAuth: false },
      },
      {
        path: 'ot/:type',
        name: 'PersonOperateType',
        component: () => import('@/components/personeOperateType'),
        props: true,
        meta: { requireAuth: true },
      },
    ],
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Personal/Login'),
    meta: { requireAuth: false, title: '首页' },
  },
  {
    path: '/p/register',
    name: 'Register',
    component: () => import('@/views/Personal/Register'),
    meta: { requireAuth: false, title: '注册' },
  },
  {
    path: '/zc',
    component: () => import('@/layouts/Personal'),
    children: [
      {
        path: '/',
        name: 'CorporateRegistr',
        component: () => import('@/views/Impersonal/Register'),
        meta: { title: '注册' },
      },
    ],
  },
  {
    path: '/p/fp',
    name: 'ForgetPassword',
    component: () => import('@/views/Personal/ForgetPassword'),
    meta: { requireAuth: false, titele: '找回密码' },
  },
  {
    path: '/p/advance',
    component: () => import('@/views/Personal/Handle'),
    children: [
      {
        path: '/',
        name: 'PAdvanceInstructions',
        component: () => import('@/views/Personal/Handle/Advance/Instructions'),
        meta: { requireAuth: true, title: '个人预告用户须知' },
      },
      {
        path: 'work',
        name: 'PAdvanceProcedure',
        component: () => import('@/views/Personal/Handle/Advance/Procedure'),
        meta: { requireAuth: true, title: '个人预告登记' },
      },
    ],
  },
  {
    path: '/p/ysfzy',
    component: () => import('@/views/Personal/Handle'),
    children: [
      {
        path: '/',
        name: 'PFirstHouse',
        component: () => import('@/views/Personal/Handle/Ysfzy/Instructions'),
        meta: { requireAuth: true, title: '一手房转移用户须知' },
      },
      {
        path: 'work',
        name: 'PFirstHouseProcedure',
        component: () => import('@/views/Personal/Handle/Ysfzy/Procedure'),
        meta: { requireAuth: true, title: '一手房转移登记' },
      },
    ],
  },
  {
    path: '/p/eszy',
    component: () => import('@/views/Personal/Handle'),
    children: [
      {
        path: '/',
        name: 'PsecondHouse',
        component: () => import('@/views/Personal/Handle/Eszy/Instructions'),
        meta: { requireAuth: true, title: '二手房转移用户须知' },
      },
      {
        path: 'work',
        name: 'PsecondProcedure',
        component: () => import('@/views/Personal/Handle/Eszy/Procedure'),
        meta: { requireAuth: true, title: '二手房转移登记' },
      },
    ],
  },
  {
    path: '/p/jdcx',
    component: () => import('@/views/Personal/Query'),
    children: [
      {
        path: '/',
        name: 'JDCX',
        component: () => import('@/views/Personal/Query/JDCX/Condition'),
        meta: { requireAuth: true, title: '进度查询' },
      },
      {
        path: 'jxjg',
        name: 'JDCXJG',
        component: () => import('@/views/Personal/Query/JDCX/Result'),
        meta: { requireAuth: true, title: '进度查询结果' },
      },
    ],
  },
  {
    path: '/redirect',
    component: Layout,
    children: [
      {
        path: '/redirect/:path(.*)',
        name: 'Redirect',
        component: () => import('@/components/redirect'),
      },
    ],
  },
  {
    path: '*',
    name: 'NotFound',
    component: () => import('@/components/errorPage'),
    props: () => ({ errorCode: 404 }),
    meta: { requireAuth: false },
  },
];
export default routes;