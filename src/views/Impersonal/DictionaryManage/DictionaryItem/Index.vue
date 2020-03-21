<template>
  <div class="dictionary-item">
    <div class="dictionary-item-content" v-loading="loading">
      <vxe-table
        border
        height="100%"
        align="center"
        highlight-hover-row
        highlight-current-row
        auto-resize
        resizable
        size="medium"
        show-overflow="title"
        ref="dictionaryItemTable"
        :tree-config="{expandAll: true}"
      >
        <template slot="empty">
          <empty-data></empty-data>
        </template>
      </vxe-table>
    </div>
  </div>
</template>

<script>
import EmptyData from '@/components/emptyData';
import XEUtils from 'xe-utils';
import { isIncludesFilter } from '@/libs/common';

export default {
  props: {
    data: {
      type: Array,
      default: () => ([]),
    },
    columns: {
      type: Array,
      default: () => ([]),
    },
    showTreeType: {
      type: Boolean,
      default: false,
    },
    search: {
      type: String,
      default: '',
    },
  },
  components: {
    EmptyData,
  },
  data() {
    return {
      loading: false,
    };
  },
  watch: {
    data() {
      this.$nextTick(() => {
        this.reloadData();
      });
    },
    columns() {
      this.$nextTick(() => {
        this.reloadColumn();
      });
    },
    search(val) {
      this.handleSearch(val);
    },
  },
  methods: {
    reloadData(data) {
      this.$refs.dictionaryItemTable.reloadData(data || this.data);
    },
    reloadColumn() {
      const columns = [
        { type: 'checkbox', width: 45, fixed: 'left' },
        { type: 'seq', width: 60, title: '序号' },
        ...this.columns,
        {
          title: '操作',
          cellRender: {
            name: 'CustomCell',
            render: (h, row) => {
              const components = [
                h('el-button', {
                  attrs: {
                    size: 'mini',
                    type: 'warning',
                  },
                  on: {
                    click: () => this.operate(false, row),
                  },
                }, ['修改']),
              ];
              if (this.showTreeType) {
                components.unshift(h('el-button', {
                  attrs: {
                    size: 'mini',
                    type: 'primary',
                  },
                  on: {
                    click: () => this.operate(true, row),
                  },
                }, ['添加']));
              }
              return h('div', components);
            },
          },
          width: this.showTreeType ? 150 : 80,
          fixed: 'right',
        },
      ];
      this.$refs.dictionaryItemTable.loadColumn(columns);
    },
    operate(isAdd, row) {
      this.$emit('onOperate', isAdd, row);
    },
    getCheckedRow() {
      return this.$refs.dictionaryItemTable.getCheckboxRecords() || [];
    },
    handleSearch(filter) {
      this.loading = true;
      if (!filter) {
        this.reloadData();
      }
      const options = { children: 'children' };
      const tableData = XEUtils.searchTree(this.data,
        item => isIncludesFilter(filter, item.name),
        options);
      this.reloadData(tableData);
      this.$nextTick(() => {
        this.$refs.dictionaryItemTable.scrollTo(0, 0);
        this.$refs.dictionaryItemTable.setAllTreeExpansion(true);
        this.loading = false;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
