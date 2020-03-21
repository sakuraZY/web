<template>
  <div class="auth-table-container" v-loading="loading">
    <vxe-table
      border
      :data="tableData"
      height="100%"
      align="center"
      auto-resize
      resizable
      size="medium"
      row-id="id"
      show-overflow="title"
      ref="authTable"
      :tree-config="{expandRowKeys: ['root']}"
      @checkbox-change="selectChange"
      @checkbox-all="selectChange"
    >
      <template slot="empty">
        <empty-data></empty-data>
      </template>
      <vxe-table-column
        type="checkbox"
        fixed="left"
        :visible="showSelection"
      ></vxe-table-column>
      <vxe-table-column
        title="名称"
        field="name"
        min-width="220"
        align="left"
        tree-node
      ></vxe-table-column>
      <vxe-table-column
        field="type"
        title="类型"
        min-width="80"
      >
        <template v-slot="{row}">
          <span>{{ convertAuthType(row.type) }}</span>
        </template>
      </vxe-table-column>
      <vxe-table-column
        field="id"
        title="编码"
        min-width="120"
      >
        <template v-slot="{row}">
          <span>{{ convertAuthCode(row.type, row.id) }}</span>
        </template>
      </vxe-table-column>
      <vxe-table-column
        field="note"
        title="描述"
        min-width="100"
      ></vxe-table-column>
      <vxe-table-column
        fixed="right"
        title="操作"
        width="220"
        v-if="showOperate"
      >
         <template v-slot="{row}">
          <el-button
            @click.native.prevent="operate(row.type === 'Prop', 'add', row)"
            size="mini"
            type="primary"
            :disabled="row.type === 'Prop'"
          >
            添加
          </el-button>
          <el-button
            @click.native.prevent="operate(row.type === 'Root', 'update', row)"
            size="mini"
            type="warning"
            :disabled="row.type === 'Root'"
          >
            修改
          </el-button>
          <el-button
            @click.native.prevent="operate(['Root', 'Sys'].includes(row.type), 'delete', row)"
            size="mini"
            type="danger"
            :disabled="['Root', 'Sys'].includes(row.type)"
          >
            删除
          </el-button>
        </template>
      </vxe-table-column>
    </vxe-table>
    <el-dialog
      :title="title"
      :visible.sync="authAttrVisible"
      append-to-body
      @close="closeAuthAttrDialog"
    >
      <auth-attributes
        :show="authAttrVisible"
        :operateType="operateType"
        :data="currentData"
        ref="authAttr"
        @onSubmit="handleSubmit"
      ></auth-attributes>
      <template slot="footer">
        <el-button type="primary" size="medium" @click="confirmAuthAttributes">
          <icon-svg iconClass="confirm" />
          确定
        </el-button>
        <el-button plain size="medium" @click="authAttrVisible = false">
          <icon-svg iconClass="cancel" />
          取消
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import EmptyData from '@/components/emptyData';
import { coverArray } from '@/libs/utils';
import {
  addPermission,
  updatePermission,
  deletePermission,
  addPermissionCate,
  deletePermissionCate,
  updatePermissionCate,
  updatePermissionCateClassify,
} from '@/apis/auth/permission';
import XEUtils from 'xe-utils';
import { isIncludesFilter, hashArray } from '@/libs/common';
import AuthAttributes from './AuthAttributes';

export default {
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    showOperate: {
      type: Boolean,
      default: true,
    },
    showSelection: {
      type: Boolean,
      default: false,
    },
    search: {
      type: String,
      default: '',
    },
    defaultSelection: {
      type: Array,
      default: () => ([]),
    },
  },
  components: {
    EmptyData,
    AuthAttributes,
  },
  data() {
    return {
      currentData: null,
      authAttrVisible: false,
      operateType: '',
      tableData: [],
      authData: [],
      loading: false,
      operateTypeMap: {
        add: '新增',
        update: '修改',
      },
    };
  },
  computed: {
    title() {
      return `${this.operateTypeMap[this.operateType] || ''}权限信息`;
    },
  },
  watch: {
    data: {
      handler() {
        this.authData = coverArray([...this.data], 'pid');
        this.reloadData();
      },
      immediate: true,
    },
    defaultSelection: {
      handler() {
        this.$nextTick(() => {
          this.clearCheckboxRow();
          this.reloadData(true);
        });
      },
      immediate: true,
    },
    search: {
      handler(val, oldVal) {
        if (!val && !oldVal) {
          return;
        }
        this.reloadData(true);
      },
      immediate: true,
    },
    tableData() {
      this.$nextTick(() => {
        this.setDefaultSeletion();
      });
    },
    showSelection: {
      handler(val, oldVal) {
        if (val === oldVal) {
          return;
        }
        this.refreshColumn();
      },
    },
  },
  methods: {
    selectChange({ selection, checked, row }) {
      this.$emit('onSelected', selection, checked, row);
    },
    confirmAuthAttributes() {
      this.$refs.authAttr.handleSubmit();
    },
    reloadData(isExpand = false) {
      this.loading = true;
      XEUtils.debounce(() => {
        if (!this.search) {
          this.tableData = this.authData;
        }
        const options = { children: 'children' };
        this.tableData = XEUtils.searchTree(this.authData,
          item => isIncludesFilter(this.search, item.name),
          options);
        if (!isExpand) {
          this.loading = false;
          return;
        }
        // 搜索之后默认展开所有子节点
        this.$nextTick(() => {
          this.$refs.authTable.scrollTo(0, 0);
          if (this.search) {
            this.$refs.authTable.setAllTreeExpansion(true);
          } else {
            this.$refs.authTable.setRowExpansion(this.tableData[0], true);
          }
          this.loading = false;
        });
      }, 500, { leading: false, trailing: true })();
    },
    setCheckboxRow(rows, isChecked) {
      this.$nextTick(() => {
        this.$refs.authTable.setCheckboxRow(rows, isChecked);
      });
    },
    setDefaultSeletion() {
      if (!this.showSelection || !this.defaultSelection.length) {
        return;
      }
      const hashMap = hashArray(this.authData);
      const rows = [];
      this.defaultSelection.forEach((item) => {
        if (hashMap[item]) {
          rows.push(hashMap[item]);
        }
      });
      this.setCheckboxRow(rows, true);
    },
    refreshColumn() {
      this.$nextTick(() => {
        this.$refs.authTable.refreshColumn();
      });
    },
    getCheckboxRecords() {
      return this.showSelection ? this.$refs.authTable.getCheckboxRecords() : [];
    },
    clearCheckboxRow() {
      this.$refs.authTable.clearCheckboxRow();
    },
    convertAuthType(authType) {
      switch (authType) {
        case 'Obj': {
          return '模块';
        }
        case 'Prop': {
          return '功能';
        }
        case 'Sys':
        case 'Root':
        default: {
          return '';
        }
      }
    },
    convertAuthCode(type = '', id = '') {
      if (!['Obj', 'Prop'].includes(type)) {
        return '';
      }
      return id;
    },
    operate(disableOpreate, type, data) {
      if (disableOpreate) {
        return;
      }
      this.currentData = data;
      if (type !== 'delete') {
        this.operateType = type;
        this.authAttrVisible = true;
        return;
      }
      this.deleteRow();
    },
    deleteRow() {
      this.$confirm('确定删除该权限及其目录下的子权限？', '提示').then(() => {
        const { id, type } = this.currentData;
        const operatePromiseMap = {
          deletePermission,
          deletePermissionCate,
        };
        const operatePromiseType = type === 'Prop' ? 'deletePermission' : 'deletePermissionCate';
        operatePromiseMap[operatePromiseType](id).then(({
          code,
          msg,
        }) => {
          if (code !== 0) {
            throw new Error(msg || '删除失败');
          }
          this.$message({
            type: 'success',
            message: msg || '删除成功',
          });
          this.$emit('onOperateSuccess');
        });
      });
    },
    handleSubmit({
      id: code, name, type, sysclassify, note,
    }) {
      const { id = '', name: Pname = '', pid = '' } = this.currentData;
      let options = {};
      const operatePromiseMap = {
        addPermission,
        updatePermission,
        addPermissionCate,
        updatePermissionCate,
        updatePermissionCateClassify,
      };
      let operatePromsiseType = '';
      if (this.operateType === 'add' && type === '功能') {
        operatePromsiseType = 'addPermission';
        options = {
          propCode: code,
          objCode: id,
          propType: type,
          propName: name,
          propNote: note,
        };
      } else if (this.operateType === 'add') {
        operatePromsiseType = 'addPermissionCate';
        options = {
          objCode: code,
          objType: type,
          objName: name,
          objNote: note,
          objParent: id,
          objSysclassify: sysclassify || Pname,
        };
      } else if (type === '模块分类') {
        operatePromsiseType = 'updatePermissionCateClassify';
        options = {
          updateSysClassify: name,
          sysClassify: Pname,
        };
      } else if (type === '功能') {
        operatePromsiseType = 'updatePermission';
        options = {
          propCode: code,
          objCode: pid,
          propType: type,
          propName: name,
          propNote: note,
        };
      } else {
        operatePromsiseType = 'updatePermissionCate';
        options = {
          objCode: code,
          objType: type,
          objName: name,
          objNote: note,
          objParent: pid,
          objSysclassify: Pname,
        };
      }
      if (!operatePromsiseType) {
        return;
      }
      operatePromiseMap[operatePromsiseType](options).then(({
        code: resCode,
        msg,
      }) => {
        if (resCode !== 0) {
          throw new Error(msg || `${this.operateTypeMap[this.operateType] || ''}失败`);
        }
        this.$message({
          type: 'success',
          message: msg || `${this.operateTypeMap[this.operateType] || ''}成功`,
        });
        this.authAttrVisible = false;
        this.$emit('onOperateSuccess');
      });
    },
    closeAuthAttrDialog() {
      this.$refs.authAttr.resetFields();
    },
  },
};
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
