<template>
  <div>
     <el-table
        :data="personData"
        tooltip-effect="dark"
        border
        stripe
        width="100%"
        :cell-style="{padding:'3px'}"
        :header-cell-style="tableHeaderColor"
        :index="indexMethod"
      >
        <template v-for="(item,index) in headNames">
          <el-table-column :key="index"
            :prop="item.prop"
            :label="item.label"
            :minWidth="item.minWidth"
            :width="item.width"
            :align="item.align"
            :type="item.type"
            show-overflow-tooltip
            >
            <template v-if="item.children">
              <el-table-column  v-for="(tmp, index) in item.children" :key="index"
                  :prop="tmp.prop"
                  :label="tmp.label"
                  :minWidth="tmp.minWidth"
                  :width="tmp.width"
                  :align="tmp.align"
                  :type="tmp.type"
                  show-overflow-tooltip
                  ></el-table-column>
            </template>
          </el-table-column>
          </template>
             <el-table-column prop="zjlb" label="类别" align="center"
         resizable v-if='isShow'></el-table-column>
          <el-table-column prop="qlrxz" label="性质" align="center"
         resizable v-if='isShow'></el-table-column>
         <el-table-column prop="frdbzjlx" label="法人类别" align="center"
         resizable v-if='isShow'></el-table-column>
        <el-table-column label="操作" fixed="right"
        align="center" :width="showObj.width" v-if="showBtn">
          <template v-slot="scope">
            <el-button @click="editPerson(scope.row,scope.$index)"
            type="text" size="small" v-if='showObj.bEdit'>编辑</el-button>
            <el-button type="text" size="small" @click="delPerson(scope.$index)"
            v-if='showObj.bDyqr?showObj.bDelete&&1<=scope.$index:showObj.bDelete'>删除</el-button>
             <el-button  @click="addFamily(scope.row)"
            type="text" size="small" v-if='showObj.bfamily'>新增家庭成员</el-button>
             <el-button @click="handleYz(scope.row)"
             type="text" size="small" v-if='showObj.brlyz'>人脸验证</el-button>
          </template>
        </el-table-column>
      </el-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isShow: false,
    };
  },
  props: {
    personData: {
      type: Array,
      default() {
        return [];
      },
    },
    headNames: {
      type: Array,
      default() {
        return [];
      },
    },
    // 是否显示操作列
    showBtn: {
      type: Boolean,
      default() {
        return true;
      },
    },
    // 控制操作列中按钮的显示与隐藏
    showObj: {
      type: Object,
      default() {
        return {
          bDyqr: false,
          bEdit: true,
          bDelete: true,
          bfamily: false,
          brlyz: false,
          width: '90px',
        };
      },
    },
    orgLen: {
      type: Number,
      default() {
        return 0;
      },
    },
  },
  methods: {
    // 修改table header的背景色
    tableHeaderColor({ rowIndex }) {
      let sty = 'padding:5px 1px;background:#F2F6FC;';
      if (rowIndex === 0 || rowIndex === 1) {
        sty = 'padding:5px 1px;background:#F2F6FC;font-size:14px;color:rgba(102,102,102,1);font-weight:400; height:15px;';
      }
      return sty;
    },
    indexMethod(index) {
      return index + 1;
    },
    editPerson(row, index) {
      this.$emit('editfn', row, index);
    },
    delPerson(index) {
      this.$confirm('确认删除选中数据吗？').then(() => {
        this.personData.splice(index, 1);
      });
    },
    addFamily(row, index) {
      this.$emit('addFamilyFn', row, index);
    },
    // 人脸验证
    handleYz() {
      // todo
    },
  },
};
</script>
<style scoped>

</style>
