<!--
 * @Descripttion: v1.00
 * @version: v1.00
 * @Author: huwei
 * @Date: 2020-03-10 15:36:15
 * @LastEditors: zengying
 * @LastEditTime: 2020-03-12 15:56:03
 -->
<template>
  <div class="left-menu" :class="{'left-menu-isCollapse':isCollapse}">
    <el-menu :default-active="kpath" class="el-menu-vertical-demo" @select="handleselect"
      :collapse="isCollapse" :unique-opened="true" style="width:100%">
      <el-submenu v-for="(ite,indexs) in lists" :key="indexs" :index="(indexs+1).toString()">
        <template slot="title">
          <i :class="classNames[indexs]"></i>
          <span slot="title">{{ite.tit.name}}</span>
        </template>
        <template v-for="(item,ind) in ite.children">
          <template v-if="item.children.length>0">
            <el-submenu :index="indexs.toString()+'-'+ind.toString()" :key="ind">
              <span slot="title">
                {{item.tit.name}}
              </span>
              <el-menu-item v-for="(items,inds) in item.children" :key="inds"
                :index="indexs.toString()+'-'+ind.toString()+'-'+inds.toString()"
                :route="items.tit">
                {{items.tit.name}}
              </el-menu-item>
            </el-submenu>
          </template>
          <template v-else>
            <el-menu-item-group :key="ind">
              <el-menu-item :index="indexs.toString()+'-'+ind.toString()" :route="item.tit">
                {{item.tit.name}}
              </el-menu-item>
            </el-menu-item-group>
          </template>
        </template>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  data() {
    return {
      kpath: '0',
      classNames: [
        'el-icon-edit-outline',
        'el-icon-user',
        'el-icon-key',
        'el-icon-first-aid-kit',
        'el-icon-s-tools',
      ],
      lists: [
        {
          tit: { name: ' 我的业务' },
          children: [
            {
              tit: { name: '首次登记', path: '/u/scdj' },
              children: [],
            },
            {
              tit: { name: '预告登记', path: '/u/ygdj' },
              children: [],
            },
            {
              tit: { name: '抵押登记', path: '/u/dydj' },
              children: [],
            },
            {
              tit: { name: '预告抵押登记', path: '/u/ygdy' },
              children: [],
            },
            {
              tit: { name: '预告及预告抵押登记', path: '/u/ygjygdy' },
              children: [],
            },
            {
              tit: { name: '一手转移(含抵押)登记', path: '/u/yszydy' },
              children: [],
            },
            {
              tit: { name: '二手转移(含抵押)登记', path: '/u/eszydy' },
              children: [],
            },
            {
              tit: { name: '抵押注销登记', path: '/u/dyzx' },
              children: [],
            },
            {
              tit: { name: '查封登记（含轮候查封）', path: '/u/cfdj' },
              children: [],
            },
          ],
        },
        {
          tit: { name: '个人中心' },
          children: [
            {
              tit: { name: '我的办件', path: '/mf' },
              children: [],
            },
            {
              tit: { name: '产权查询(查封)', path: '/qbq' },
              children: [],
            },
          ],
        },
        {
          tit: { name: '用户权限' },
          children: [
            {
              tit: { name: '组织机构管理', path: '/om' },
              children: [],
            },
            {
              tit: { name: '用户角色管理', path: '/rm' },
              children: [],
            },
            {
              tit: { name: '功能权限管理', path: '/am' },
              children: [],
            },
            {
              tit: { name: '字典管理', path: '/dm' },
              children: [],
            },
            {
              tit: { name: '功能菜单管理', path: '/mm' },
              children: [],
            },
            {
              tit: { name: '用户操作日志', path: '/lm' },
              children: [],
            },
            {
              tit: { name: '附件清单管理', path: '/alm' },
              children: [],
            },
          ],
        },
        {
          tit: { name: '辅助工具' },
          children: [
            {
              tit: { name: '图标组件', path: '/i' },
              children: [],
            },
          ],
        },
      ],
    };
  },
  computed: {
    ...mapState('Impersonal', { isCollapse: state => state.isCollapse }),
    ...mapState('Impersonal', { historyArray: state => state.historyArray }),
    ...mapState('Impersonal', { ind: state => state.ind }),
  },
  watch: {
    ind(nval) {
      this.kpath = this.historyArray[nval].keyPath;
    },
  },
  methods: {
    handleselect(key, keyPath, event) {
      const obj = event.route;
      obj.keyPath = keyPath['1'];
      this.pushArray(obj);
    },
    ...mapMutations('Impersonal', { pushArray: 'pushHistoryArray' }),
  },
};
</script>
<style lang="scss">
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-menu-item-group__title {
  display: none;
}
.el-submenu__title {
  border-bottom: 1px solid $--border-color-grey-leftMenu;
}
.is-opened .el-submenu__title {
  background-color: $--color-primary;
  color: $--color-white;
  border: none;
}
.is-opened .el-submenu .el-submenu__title,
.el-submenu.is-active .el-menu .el-submenu__title {
  background-color: transparent;
  color: $--color-text-regular;
}
.is-opened .el-submenu__title i {
  color: $--color-white;
}
.is-opened .el-submenu .el-submenu__title i,
.el-submenu.is-active .el-menu .el-submenu__title i {
  color: $--color-text-regular;
}
.el-menu-item-group li {
  border-bottom: 1px dashed $--border-color-grey-leftMenu;
}
.el-submenu.is-active .el-submenu__title {
  background-color: $--color-primary;
  color: $--color-white;
}
.el-submenu.is-active .el-submenu__title i {
  color: $--color-white;
}
.el-menu-item.is-active {
  border-right: 3px solid $--color-primary;
}
</style>
