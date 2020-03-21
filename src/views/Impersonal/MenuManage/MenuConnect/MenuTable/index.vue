<!--
 * @Description: 功能菜单表格
 * @Author: wangjiayu
 * @Date: 2020-02-29 17:51:49
 * @LastEditors: wangjiayu
 * @LastEditTime: 2020-03-21 09:43:28
 -->

<template>
  <div class="menu-table-container" v-loading="loading">
    <vxe-table
      :data="tableData"
      row-id="menuId"
      border
      auto-resize
      resizable
      height="100%"
      align="center"
      ref="menuTable"
      show-overflow="title"
      :tree-config="{expandRowKeys: ['root']}"
      :checkbox-config="{checkStrictly:true}"
      @checkbox-change="selectChange"
      @checkbox-all="selectChange"
    >
      <template slot="empty">
        <empty-data></empty-data>
      </template>
      <vxe-table-column
        :type="checkType"
        fixed="left"
        width="35"
        :visible="showCheckbox"
      ></vxe-table-column>
      <vxe-table-column
        field="menuText"
        title="名称"
        min-width="230"
        tree-node
        align="left"
      ></vxe-table-column>
      <vxe-table-column
        field="menuIsmodify"
        title="状态"
        width="80"
      ></vxe-table-column>
      <vxe-table-column
        field="menuIsdefault"
        title="默认"
        width="80"
      ></vxe-table-column>
      <vxe-table-column
        field="menuIcourl"
        title="图标"
        width="80"
      >
        <template v-slot="{row}">
          <div class="icon-col">
            <icon-svg
              className="icon menu-icon"
              :iconClass="row.menuIcourl"
              style="font-size:22px"
            ></icon-svg>
          </div>
        </template>
      </vxe-table-column>
      <vxe-table-column
        field="menuLinkurl"
        title="路由路径"
        min-width="180"
      ></vxe-table-column>
      <vxe-table-column
        field="menuLinkname"
        title="路由名称"
        min-width="150"
      ></vxe-table-column>
      <vxe-table-column
        field="menuNote"
        title="描述"
        min-width="150"
      ></vxe-table-column>
      <vxe-table-column
        field="operate"
        title="操作"
        header-align="center"
        fixed="right"
        width="280"
        v-if="showOperate"
      >
        <template v-slot="{row}">
          <el-button
            @click.native.prevent="handleMenu(row, 'add')"
            size="mini"
            type="primary"
            :disabled="!isFolder(row.menuType)"
          >
            <!-- <icon-svg iconClass="add" className="add-icon"></icon-svg> -->
            添加
          </el-button>
          <el-button
            @click.native.prevent="handleMenu(row, 'update')"
            size="mini"
            type="warning"
          >
            <!-- <icon-svg iconClass="edit" className="edit-icon"></icon-svg> -->
            修改
          </el-button>
          <el-button
            @click.native.prevent="handleMenu(row, 'delete')"
            size="mini"
            type="danger"
          >
            <!-- <icon-svg iconClass="remove" className="remove-icon"></icon-svg> -->
            删除
          </el-button>
          <el-button
            @click.native.prevent="handleMenu(row, 'move')"
            size="mini"
            type="warning"
          >
            <!-- <icon-svg iconClass="move" className="move-icon"></icon-svg> -->
            移动
          </el-button>
        </template>
      </vxe-table-column>
    </vxe-table>
    <!-- 功能菜单详情面板 -->
    <el-dialog
      :title="title"
      :visible.sync="menuAttrVisible"
      append-to-body
      @close="closeMenuAttrDialog"
      :close-on-click-modal="false"
    >
      <menu-attributes
        :operateType="currOperateType"
        :menuDetail="currMenuData"
        ref="menuAttr"
        @onSubmit="handleSubmit"
        @onCancel="handleCancel"
      ></menu-attributes>
    </el-dialog>
    <!-- 功能菜单详情面板 -->
    <el-dialog
      title="菜单及子菜单移动至"
      :visible.sync="moveMenuVisible"
      append-to-body
      :close-on-click-modal="false"
    >
      <menu-table
        ref="moveMenuTable"
        :menuData="menuFolder"
        :showOperate="false"
        :showCheckbox="true"
        checkType="radio"
        style="min-height:600px;"
      ></menu-table>
      <div slot="footer">
        <el-button type="primary" @click="moveMenu">
          <icon-svg iconClass="confirm" className="confirm-icon"></icon-svg>
          确定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { addMenu, updateMenu, deleteMenu } from '@/apis/sysmgr/menu';
import EmptyData from '@/components/emptyData';
import XEUtils from 'xe-utils';
import { coverArray } from '@/libs/utils';
import { isIncludesFilter, hashArray } from '@/libs/common';
import MenuAttributes from './MenuAttributes';

export default {
  name: 'menu-table',
  components: {
    EmptyData,
    MenuAttributes,
  },
  props: {
    showCheckbox: { // 是否显示复选框
      type: Boolean,
      default: false,
    },
    checkType: { // 是否需要选择框
      type: String,
      default: 'checkbox',
    },
    showOperate: { // 是否显示操作列
      type: Boolean,
      default: true,
    },
    menuData: { // 所有功能菜单数据
      type: Array,
      default: () => [],
    },
    defaultSelection: { // 当前角色授权的功能菜单数据
      type: Array,
      default: () => [],
    },
    filter: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      tableData: [], // 当前表格显示数据
      moveTableData: [], // 移动菜单表格数据
      operateType: { // 操作类型
        addModule: '新增',
        add: '新增',
        update: '修改',
      },
      currOperateType: '', // 当前操作类型
      currMenuData: {}, // 当前选中功能菜单信息
      loading: false, // 开启加载动画
      menuAttrVisible: false, // 是否显示功能菜单详情面板
      moveMenuVisible: false, // 是否显示功能菜单移动选项面板
      menuFolder: [], // 移动菜单面板表格数据
    };
  },
  computed: {
    // 新增/修改菜单信息弹出框标题
    title() {
      return `${this.operateType[this.currOperateType]}菜单信息`;
    },
    // 符合表格所需格式的所有菜单数据
    allTableData() {
      return coverArray(this.menuData, 'menuParnetid', 'menuId');
    },
  },
  watch: {
    // 表格所有数据改变后，根据过滤条件重新加载表格数据
    allTableData: {
      handler() {
        this.handleFilter();
      },
      immediate: true,
    },
    // 当前显示表格数据改变后，重新设置数据勾选状态
    tableData() {
      this.$nextTick(() => {
        this.setDefaultSeletion();
      });
    },
    // 勾选数据改变后，重新渲染表格勾选状态
    defaultSelection: {
      handler() {
        this.loading = true;
        this.$nextTick(() => {
          this.clearCheckboxRow();
          this.setDefaultSeletion();
          this.handleFilter();
        });
      },
      immediate: true,
    },
    // 过滤条件改变后，重新加载表格数据
    filter: {
      handler() {
        this.handleFilter();
      },
      immediate: true,
    },
    // 是否显示复选框改变后，重新刷新表格列
    showCheckbox: {
      handler(val, oldVal) {
        if (val === oldVal) {
          return;
        }
        this.refreshColumn();
      },
    },
    // 是否显示移动菜单顺序弹出框改变时，重新计算弹出框内表格数据
    moveMenuVisible(val, oldVal) {
      if (val === oldVal) {
        return;
      }
      this.getMenuFolder();
    },
  },
  methods: {
    // 过滤功能菜单数据
    handleFilter() {
      XEUtils.debounce(() => {
        if (!this.filter) {
          this.tableData = this.allTableData;
        }
        const options = { children: 'children' };
        // 匹配菜单名称和路径
        this.tableData = XEUtils.searchTree(this.allTableData,
          (item) => {
            const menuLinkurl = item.menuLinkurl ? item.menuLinkurl.toLowerCase() : '';
            const matchUrl = menuLinkurl.indexOf(this.filter.toLowerCase()) > -1;
            if (matchUrl || isIncludesFilter(this.filter, item.menuText)) {
              return true;
            }
            return false;
          },
          options);
        this.$nextTick(() => {
          this.$refs.menuTable.scrollTo(0, 0);
          this.$refs.menuTable.setAllTreeExpansion(!!this.filter);
          this.loading = false;
        });
      }, 500, { leading: false, trailing: true })();
    },
    // 设置数据勾选状态
    setDefaultSeletion() {
      if (!this.showCheckbox || !this.defaultSelection.length) {
        return;
      }
      const hashMap = hashArray(this.allTableData, 'menuId');
      const rows = [];
      this.defaultSelection.forEach((item) => {
        if (hashMap[item]) {
          rows.push(hashMap[item]);
        }
      });
      this.setCheckboxRow(rows, true);
    },
    // 设置表格行数据勾选状态
    setCheckboxRow(rows, isChecked) {
      this.$nextTick(() => {
        this.$refs.menuTable.setCheckboxRow(rows, isChecked);
      });
    },
    // 清除复选框勾选
    clearCheckboxRow() {
      this.$refs.menuTable.clearCheckboxRow();
    },
    // 获取单选框选中数据（用于移动菜单）
    getRadioRecord() {
      return this.$refs.menuTable.getRadioRecord();
    },
    // 获取复选框选中数据（用于给角色授权功能）
    getCheckboxRecords() {
      return this.$refs.menuTable.getCheckboxRecords();
    },
    // 刷新表格列
    refreshColumn() {
      this.$nextTick(() => {
        this.$refs.menuTable.refreshColumn();
      });
    },
    // 选中数据改变事件
    selectChange({ checked, row }) {
      let newRows = [];
      const hashMap = hashArray(this.tableData, 'menuId', 'children', false);
      if (row) { // 勾选行
        newRows.push(row);
        const children = this.getChildren(row, hashMap);
        if (children.length) {
          newRows.push(...children);
        }
        if (checked) {
          const parents = this.getParent(row, hashMap);
          if (parents.length) {
            newRows.push(...parents);
          }
        }
      } else { // 全选
        newRows = hashMap;
      }
      // 勾选菜单数据
      this.setCheckboxRow(newRows, checked);
      this.$emit('onSelected', newRows, checked);
    },
    // 勾选子节点
    getChildren(row, hashMap) {
      const rows = [];
      if (Array.isArray(row.children) && row.children.length) {
        row.children.forEach((child) => {
          if (hashMap[child.menuId]) {
            rows.push(child);
          }
          const children = this.getChildren(child, hashMap);
          if (children.length) {
            rows.push(...children);
          }
        });
      }
      return rows;
    },
    // 勾选父节点
    getParent(row, hashMap) {
      const rows = [];
      if (row.menuParnetid) {
        const parent = hashMap[row.menuParnetid];
        if (parent) {
          rows.push(parent);
        }
        const grandparent = this.getParent(parent, hashMap);
        if (grandparent.length) {
          rows.push(...grandparent);
        }
      }
      return rows;
    },
    // 操作当前行功能菜单数据
    handleMenu(row, operateType) {
      this.currOperateType = operateType;
      this.currMenuData = row;
      switch (operateType) {
        case 'addModule': {
          this.menuAttrVisible = true;
          this.currMenuData = null;
          break;
        }
        case 'add':
        case 'update': {
          this.menuAttrVisible = true;
          break;
        }
        case 'delete': {
          this.deleteMenu();
          break;
        }
        case 'move': {
          this.moveMenuVisible = true;
          break;
        }
        default:
          break;
      }
    },
    // 功能菜单详情面板保存提交事件
    handleSubmit(data) {
      if (this.currOperateType !== 'addModule' && !this.currMenuData) {
        return;
      }
      const menuData = Object.assign({}, data);
      let menuApi = null;
      switch (this.currOperateType) {
        case 'addModule': {
          menuApi = addMenu;
          break;
        }
        case 'add': {
          menuData.menuParnetid = this.currMenuData.menuId;
          menuApi = addMenu;
          break;
        }
        case 'update': {
          menuData.menuId = this.currMenuData.menuId;
          menuApi = updateMenu;
          break;
        }
        default:
          break;
      }
      menuApi(menuData).then(({ code }) => {
        if (code === 0) {
          this.$message.success(`${this.title}成功`);
          this.menuAttrVisible = false;
          this.$emit('onOperateSuccess');
        } else {
          this.$message.error(`${this.title}失败`);
        }
      }, (err) => {
        throw new Error(err);
      });
    },
    // 关闭添加/修改功能菜单面板
    closeMenuAttrDialog() {
      this.$refs.menuAttr.resetFields();
    },
    // 功能菜单详情面板点击取消事件
    handleCancel() {
      this.menuAttrVisible = false;
      this.closeMenuAttrDialog();
    },
    // 删除当前选中功能菜单信息
    deleteMenu() {
      if (!this.currMenuData) {
        return;
      }
      this.$confirm('确定删除该菜单及其目录下的子菜单？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        const menuIds = [];
        const getMenuId = (obj) => {
          menuIds.push(obj.menuId);
          if (Array.isArray(obj.children) && obj.children.length) {
            obj.children.forEach((item) => {
              getMenuId(item);
            });
          }
        };
        getMenuId(this.currMenuData);
        deleteMenu(menuIds).then(({ code } = {}) => {
          if (code === 0) {
            this.$message.success('删除菜单成功');
            this.$emit('onOperateSuccess');
          } else {
            this.$message.error('删除菜单失败');
          }
        }, (err) => {
          throw new Error(err);
        });
      }).catch(() => {});
    },
    // 移动菜单结构
    moveMenu() {
      const selectedMenu = this.$refs.moveMenuTable.getRadioRecord();
      if (!selectedMenu) {
        this.$message.warning('请选择目标菜单');
      }
      const { menuId, menuText, menuIcourl } = this.currMenuData;
      updateMenu({
        menuId,
        menuText,
        menuIcourl,
        menuParnetid: selectedMenu.menuId,
      }).then(({ code } = {}) => {
        if (code === 0) {
          this.$message.success('移动菜单成功');
          this.moveMenuVisible = false;
          this.$emit('onOperateSuccess');
        } else {
          this.$message.error('移动菜单失败');
        }
      }, (err) => {
        throw new Error(err);
      });
    },
    // 获取菜单目录（类型为“菜单”）
    getMenuFolder() {
      if (!this.tableData.length) {
        return;
      }
      const filterFolder = (arr) => {
        const newArr = arr.filter(item => this.isFolder(item.menuType));
        return newArr.map((item) => {
          if (item.children && item.children.length) {
            item.children = filterFolder(item.children);
          }
          return item;
        });
      };
      const newArr = JSON.parse(JSON.stringify(this.tableData));
      this.menuFolder = filterFolder(newArr);
    },
    // 判断当前菜单数据是否为目录
    isFolder(menuType) {
      return menuType === '菜单' || menuType === '模块';
    },
  },
};
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
