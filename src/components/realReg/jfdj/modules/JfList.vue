<!--
 * @Description: 解封清单
 * @Author: wangjiayu
 * @Date: 2020-03-16 15:33:32
 * @LastEditors: wangjiayu
 * @LastEditTime: 2020-03-19 11:35:49
 -->

<template>
  <div class="jf-info" v-show="isVisible">
    <div class="jf-info-title">
      <h3 :id="'t' + index">解封清单</h3>
      <div class="btn-group">
        <el-button class="btnBorder" size="medium" @click="deleteCQZ">批量删除</el-button>
      </div>
    </div>
    <div class="jf-info-content">
      <el-form>
        <el-row :gutter="20">
          <el-table :data="tableData" highlight-current-row tooltip-effect="dark" border stripe
            v-loading="showLoading" element-loading-text="拼命加载中" :cell-style="{padding:'8px 3px'}"
            :header-cell-style="{padding:'8px 3px',background:'#F2F6FC'}" width="80%"
            @selection-change="onSelectionChanged">
            <el-table-column type="selection" width="48"></el-table-column>
            <el-table-column type="index" label="序号" width="60" align="center">
            </el-table-column>
            <el-table-column v-for="(item,index) in columnNames" :key="index+item.name"
              :class-name="item.class" :width="item.width" :minWidth="item.minWidth"
              :prop="item.prop" :label="item.name" align="center" resizable
              :show-overflow-tooltip="item.tooltip" :sortable="item.sortable">
            </el-table-column>
            <el-table-column label="操作" width="60" fixed="right" align="center">
            <template v-slot="{$index}">
                <el-button type="text" size="medium"
                  @click.native.prevent="deleteRow($index)">
                  删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    tableInfo: {
      type: Array,
      default: () => [],
    },
    isVisible: {
      type: Boolean,
      default: false,
    },
    index: {
      type: Number,
      default: 2,
    },
  },
  data() {
    return {
      columnNames: [
        { name: '不动产证号', prop: 'xgzh', minWidth: 200 },
        { name: '查封编号', prop: 'cfbh', minWidth: 120 },
        { name: '权利人名称', prop: 'qlrmc', minWidth: 200 },
        { name: '查封机关', prop: 'cfjg', minWidth: 200 },
        { name: '查封文号', prop: 'cfwh', minWidth: 200 },
        { name: '查封范围', prop: 'cffw', minWidth: 200 },
      ],
      tableData: [],
      showLoading: false,
    };
  },
  watch: {
    isVisible(val) {
      if (val) {
        this.getTableData();
      }
    },
    tableInfo() {
      this.getTableData();
    },
  },
  methods: {
    // 获取解封清单加载数据
    getTableData() {
      this.tableData = JSON.parse(JSON.stringify(this.tableInfo));
    },
    // 选项改变监听事件
    onSelectionChanged(selection) {
      this.selection = selection;
    },
    // 批量删除权证信息
    deleteCQZ() {
      if (!this.selection.length) {
        this.$message.warning('请选择一条数据');
        return;
      }
      if (this.selection.length === this.tableData.length) {
        this.$message.warning('至少要保留一条进行登记');
        return;
      }
      this.tableData = this.tableData.filter(item => !this.selection.includes(item));
      this.handleChangeCQZ();
    },
    // 删除当前权证信息
    deleteRow(index) {
      if (this.tableData.length === 1) {
        this.$message.warning('至少要保留一条进行登记');
        return;
      }
      this.tableData.splice(index, 1);
      this.handleChangeCQZ();
    },
    // 产权证信息更改触发事件
    handleChangeCQZ() {
      this.vueEvent.$emit('changeCFCQZ', this.tableData);
    },
    // 获取解封清单数据
    getJFList() {
      return this.tableData;
    },
  },
};
</script>

<style lang='scss' scoped>
@import "@/components/queryBuildings/index.scss";
.jf-info {
  &-title {
    display: flex;
    justify-content: space-between;

    .btn-group {
      display: flex;
      align-items: center;
    }
  }

  &-content {
    .el-table .cell {
      white-space: pre-line;
    }
  }
}
</style>
