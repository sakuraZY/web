<!--
 * @Description: 抵押单元信息
 * @Author: wangjiayu
 * @Date: 2020-03-07 16:08:36
 * @LastEditors: wangjiayu
 * @LastEditTime: 2020-03-19 17:41:08
 -->

<template>
  <div class="info-container" v-show="isVisible">
    <div class="table-title" v-if="isEditable">
      <h3 id="t2" ref="t2">不动产权信息</h3>
      <div class="btn-group">
        <el-button class="btnBorder" size="medium" @click="chooseDY">选择</el-button>
        <el-button class="btnBorder" size="medium" @click="deleteDY">删除</el-button>
      </div>
    </div>
    <div class="table-content">
      <el-table
        ref="bdcdyList"
        :data="tableData"
        highlight-current-row
        tooltip-effect="dark"
        border
        stripe
        width="80%"
        :cell-style="{padding:'8px 3px'}"
        :header-cell-style="{padding:'8px 3px',background:'#F2F6FC'}"
        @selection-change="onSelectionChanged"
      >
        <el-table-column type="selection" width="45"></el-table-column>
        <el-table-column v-for="(item,index) in columns" :key="index"
          :prop="item.prop"
          :label="item.label"
          :minWidth="item.minWidth"
          :width="item.width"
          :type="item.type"
          align="center"
          >
        </el-table-column>
      </el-table>
    </div>
    <!-- 选择不动产单元 -->
    <el-dialog
      title="选择不动产权信息"
      :visible.sync="chooseDYVisible"
      append-to-body
      :close-on-click-modal="false"
    >
      <info-table
        ref="chooseTable"
        :tableInfo="dyList"
        :isVisible="true"
        :isEditable="false"
      ></info-table>
      <div slot="footer">
        <el-button type="primary" @click="addDY">确定</el-button>
        <el-button class="btnBorder" @click="closeChooseTable">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getBDCXX } from '@/apis/nres/zxcx';

export default {
  name: 'info-table',
  props: {
    tableInfo: Array,
    queryInfo: Object,
    isVisible: {
      type: Boolean,
      default: false,
    },
    isEditable: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      columns: [ // 表格列信息
        {
          label: '序号', prop: 'codes', width: '58', type: 'index',
        },
        {
          label: '坐落', prop: 'zl', minWidth: '160',
        },
        {
          label: '不动产单元', prop: 'bdcdyh', minWidth: '155',
        },
        {
          label: '土地使用权面积', prop: 'tdsyqmj', minWidth: '130',
        },
        {
          label: '房屋建筑面积', prop: 'fwjzmj', minWidth: '120',
        },
        {
          label: '土地用途', prop: 'tdytmc', minWidth: '100',
        },
        {
          label: '房屋用途', prop: 'fwytmc', minWidth: '90',
        },
        {
          label: '抵押情况', prop: 'dyqk', minWidth: '90',
        },
        {
          label: '查封情况', prop: 'cfqk', minWidth: '90',
        },
      ],
      tableData: [], // 表格数据
      existDY: [], // 记录已经选择进行抵押注销的单元
      selection: [], // 选中数据
      dyList: [], // 当前抵押证明下所有的单元信息
      chooseDYVisible: false, // 是否显示选择单元信息弹出框
      dialogLoading: false, // 是否显示加载动画
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
    // 表格数据改变时，重新获取要进行抵押注销的单元图属
    tableData(val) {
      this.existDY = val.map(item => item.bdcdyh);
    },
  },
  methods: {
    // 获取表格数据
    getTableData() {
      let tableInfo = JSON.stringify(this.tableInfo);
      if (tableInfo.indexOf('"tdytmc"') === -1) {
        tableInfo = JSON.stringify(this.tableInfo).replace(/"tdyt"|"fwyt"/g, val => `"${val.substring(1, 5)}mc"`);
      }
      this.tableData = JSON.parse(tableInfo);
    },
    // 选项改变监听事件
    onSelectionChanged(selection) {
      this.selection = selection;
    },
    // 关闭选择不动产单元弹出框
    closeChooseTable() {
      this.chooseDYVisible = false;
      this.dyList = [];
    },
    // 选择不动产单元
    chooseDY() {
      this.chooseDYVisible = true;
      getBDCXX(this.queryInfo)
        .then(({ code, resData: { bdcdylists = [] } = {} } = {}) => {
          if (code === 0) {
            // 过滤掉已经选择的单元数据
            if (bdcdylists.length) {
              this.dyList = bdcdylists.filter(item => !this.existDY.includes(item.bdcdyh));
              if (!this.dyList.length) {
                this.$message.warning('无可选不动产单元');
              }
            }
          } else {
            this.$message.error('获取抵押信息失败');
          }
        }, (err) => {
          throw new Error(err);
        });
    },
    // 添加不动产单元
    addDY() {
      const selections = this.$refs.chooseTable.selection;
      if (!selections.length) {
        this.$message.error('请先选择需要进行抵押注销的不动产单元');
        return;
      }
      this.tableData.push(...selections);
      this.chooseDYVisible = false;
      this.$refs.chooseTable.tableData = [];
    },
    // 删除不动产单元
    deleteDY() {
      if (!this.selection.length) {
        this.$message.error('请先选择不需要进行抵押注销的不动产单元');
        return;
      }
      if (this.selection.length === this.tableData.length) {
        this.$message.error('至少要存在一个不动产单元进行抵押注销');
        return;
      }
      this.tableData = this.tableData.filter(item => !this.selection.includes(item));
    },
    // 获取图属关联信息
    getTSXX() {
      return this.tableData.map(item => ({
        tstybm: item.tstybm,
        bdcdyh: item.bdcdyh,
        zl: item.zl,
        tdsyqmj: item.tdsyqmj,
        fwjzmj: item.fwjzmj,
        tdyt: item.tdytmc,
        fwyt: item.fwytmc,
        dyqk: item.dyqk,
        cfqk: item.cfqk,
        bdclx: '房屋',
        djzl: '抵押注销',
      }));
    },
  },
};
</script>

<style lang="scss" scoped>
.info-container {
  padding: 0 15px 0 20px;

  .table-title {
    display: flex;
    justify-content: space-between;

    .btn-group {
      display: flex;
      align-items: center;
    }
  }

  .table-content {
    .el-table .cell{
      white-space: pre-line;
    }
  }
  h3{
    height:19px;
    font-size:20px;
    // font-family:Microsoft YaHei;
    // font-weight:400;
    // color:rgba(51,51,51,1);
    // line-height:30px;
  }
}
</style>
