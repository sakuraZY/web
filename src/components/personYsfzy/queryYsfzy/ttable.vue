<!--
 * @Author: huwei
 * @Date: 2020-03-12 11:50:58
 * @
# Description:
 -->
<template>
<div>
  <el-table :data="tableData" class="tb-edit" stripe style="width: 100%;"
   :header-cell-style="tableHeadStyle">
    <el-table-column label="序号" width="50">
        <template v-slot="scope">
            <span>{{scope.$index + 1}}</span>
        </template>
    </el-table-column>
    <el-table-column  label="姓名" width="150">
        <template v-slot="scope">
            <el-input size="small" v-model="scope.row.name"
            placeholder="请输入内容" v-if="scope.row.isShow">
            </el-input>
            <span v-else>{{scope.row.name}}</span>
        </template>
    </el-table-column>
    <el-table-column prop="zjlbzw" label="证件类型">
        <template v-slot="scope">
            <el-select v-model="scope.row.zjlb" placeholder="请选择"
            v-if="scope.row.isShow" @change="selectChange(scope.$index, scope.row)">
                <el-option
                v-for="item in IdArray"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
            <span v-else>{{scope.row.zjlbzw}}</span>
        </template>
    </el-table-column>
    <el-table-column prop="zjhm" label="证件号码">
        <template v-slot="scope">
            <el-input size="small" v-model="scope.row.zjhm"
            placeholder="请输入内容"
            v-if="scope.row.isShow">
            </el-input>
            <span v-else>{{scope.row.zjhm}}</span>
        </template>
    </el-table-column>
    <el-table-column prop="gx" label="关系">
        <template v-slot="scope">
            <el-input size="small" v-model="scope.row.gx"
            placeholder="请输入内容"
            v-if="scope.row.isShow">
            </el-input>
            <span v-else>{{scope.row.gx}}</span>
        </template>
    </el-table-column>
    <el-table-column label="操作" width="120">
        <template v-slot="scope">
            <el-button  type="text"  size="small"
            @click="handleConfirm(scope.$index, scope.row)"
            v-if="scope.row.isShow">确定</el-button>
            <el-button size="small" type="text"
            @click="handleEdit(scope.$index, scope.row)" v-else>编辑</el-button>
            <el-button size="small" type="text"
            @click="handleCancel(scope.$index, scope.row)"
            v-if="scope.row.isShow">取消</el-button>
            <el-button size="small"  type="text"
            @click="handleDelete(scope.$index)" v-else>删除</el-button>
        </template>
    </el-table-column>
</el-table>
<div @click="addNew" class="tjxcy"><span>+添加新成员</span></div>
</div>
</template>

<script>
import { transNumToId } from '@/libs/utils';

export default {
  name: '',
  props: ['family'],
  data() {
    return {
      tableHeadStyle: {
        background: '#F2F6FC',
        color: '#666',
        fontWeight: 'normal',
        fontSize: '14px',
      },
      tableData: [],
      storageArr: [],
      storageData: null,
      addable: true, // 是否可以新增加
      isEdit: false, // 是否是编辑状态 区分新增状态
      IdArray: [
        { value: '1', label: '身份证' },
        { value: '2', label: '港澳台身份证' },
        { value: '3', label: '护照' },
        { value: '4', label: '户口簿' },
        { value: '5', label: '军官证(士兵证)' },
        { value: '6', label: '组织机构代码' },
        { value: '7', label: '营业执照' },
        { value: '8', label: '统一社会信用代码证' },
        { value: '9', label: '其他' },
      ],
    };
  },
  watch: {
    tableData: {
      handler(nval) {
        this.$emit('familyFn', nval);
      },
      deep: true,
    },
  },
  created() {
    this.tableData = this.family;
  },
  methods: {
    selectChange(index, row) {
      this.tableData[index].zjlbzw = transNumToId(row.zjlb);
    },
    addNew() { // 新增
      if (this.addable) { // 确保只新增一次
        this.storageArr = this.tableData.slice(0);
        this.tableData.push({
          name: '',
          zjlb: '',
          zjlbzw: '',
          zjhm: '',
          gx: '',
          sxh: '',
          isShow: true,
        });
        this.addable = false;
      } else {
        this.$message.error('请填写完成后再添加');
      }
    },
    handleConfirm(index, row) { // 确定
      this.tableData[index].sxh = index + 1;
      const keyrow = Object.keys(row);
      const narr = keyrow.filter(item => row[item] === '');
      if (narr.length > 0) {
        this.$message.error('请填写完整信息');
      } else {
        row.isShow = false;
        this.addable = true; // 新增状态还原
        this.storageData = null; // 编辑暂存清空
        this.isEdit = false; // 编辑状态还原
      }
    },
    handleEdit(index, row) { // 编辑
      this.storageData = Object.assign({}, row);
      this.isEdit = true; // true代表现在是编辑状态
      row.isShow = true;
    },
    handleCancel(index, row) { // 取消
      if (this.isEdit) { // 如果是在编辑状态下 取消 就还原当前行的暂存信息
        this.tableData[index] = this.storageData;
        this.storageData = null; // 成功后清除暂存信息
        this.isEdit = false; // 还原编辑状态
      } else { // 如果是新增加的时候 取消 就还原之前的table数据
        this.tableData = this.storageArr.slice(0);
        this.addable = true; // 取消后把新增状态还原
      }
      row.isShow = false;
    },

    handleDelete(index) { // 删除
      this.tableData.splice(index, 1);
    },
  },
};
</script>

<style lang="scss" scoped>
.tb-edit {
  border: 1px solid $--border-color-grey-leftMenu;
}
.tjxcy{
    width: 100%;
    height: 40px;
    border: 1px dashed $--border-color-grey-leftMenu;
    position: relative;
    margin-top: 20px;
    cursor: pointer;
}
.tjxcy span{
    position: absolute;
    font-size: 14px;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
}
</style>
