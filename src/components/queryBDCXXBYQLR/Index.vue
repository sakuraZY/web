<!--
 * @Descripttion:  根据产权人获取不动产信息
 * @version: 1.0
 * @Author: zengying
 * @Date: 2020-03-10 20:17:37
 * @LastEditors: zengying
 * @LastEditTime: 2020-03-20 14:59:55
 -->
<template>
  <mainBox>
    <!-- 主要内容 -->
    <template #main-content>
      <div class='form-box'>
        <div class="form-BDCXXByQLR">
          <h3>被查询人</h3>
          <el-form :model="bdcxxbyqlrform" ref="bdcxxbyqlrform" class="demo-ruleForm">
            <el-row :gutter="30" class='rowCondition'
              v-for="(item,index) in bdcxxbyqlrform.bcxrList" :key="index">
              <el-col :span='7'>
                <el-form-item label="被查询人姓名" :prop="index|setProp('qlrmc')" :rules="rules.qlrmc">
                  <el-input v-model.trim="item.qlrmc" placeholder="请输入被查询人姓名"
                    @keyup.enter.native="handleQuery()"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span='7'>
                <el-form-item label="证件类型" :prop="index|setProp('zjlx')" :rules="rules.zjlx">
                  <el-select v-model="item.zjlx" placeholder="请选择证件类型" style="width:100%">
                    <el-option v-for="item in zjlxlist" :key="item.name" :label="item.name"
                      :value="item.itemValue">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span='7'>
                <el-form-item label="证件号码" :prop="index|setProp('zjhm')" :rules="rules.zjhm">
                  <el-input v-model.trim.lazy="item.zjhm" placeholder="请输入证件号码"
                    @keyup.enter.native="handleQuery()"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span='3' align='right'>
                <div class="el-bottom">
                  <!-- type="primary" type="danger"  icon="el-icon-plus" icon="el-icon-minus" -->
                  <el-button v-if="showAdd(index)" @click="handleAddCon()">
                    添加被查询人
                  </el-button>
                  <el-button v-else @click="handleDelCon()">
                    删除被查询人
                  </el-button>
                </div>
              </el-col>
            </el-row>
            <el-row class='rowCondition' style="margin-bottom:15px">
              <el-col :span='24' align='right'>
                <!-- icon="el-icon-search"  icon="el-icon-refresh-right" -->
                <el-button type="primary" @click="handleQuery()">查询
                </el-button>
                <el-button class="btnBorder" @click="handleReset()">重置</el-button>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-table :data="tableData" highlight-current-row tooltip-effect="dark" border stripe
                v-loading="showLoading" element-loading-text="拼命加载中" :cell-style="{padding:'10px'}"
                :header-cell-style="{padding:'8px 3px',background:'#F2F6FC'}" width="80%">
                <el-table-column v-for="(item,index) in columnNames" :key="index+item.name"
                  :class-name="item.class" :width="item.width" :minWidth="item.minWidth"
                  :prop="item.prop" :label="item.name" align="center" resizable
                  :show-overflow-tooltip="item.tooltip" :sortable="item.sortable">
                </el-table-column>
              </el-table>
            </el-row>
          </el-form>
        </div>
      </div>
    </template>
  </mainBox>
</template>

<script>
import { mapState } from 'vuex';//  mapMutations,
import mainBox from '@/layouts/Impersonal/mainBox';
import { queryByDicname } from '@/apis/sysmgr/dicItem';
import { getBDCXXByQLR } from '@/apis/nres/zxcx';
import { validCardId } from '@/libs/validate';

export default {
  name: 'QueryBDCXXBYQLR',
  components: {
    mainBox,
  },
  data() {
    const checkId = (rule, value, callback) => {
      const { field } = rule;
      const index = field.split('.')[1];
      const { [index]: target } = this.bdcxxbyqlrform.bcxrList;
      const { zjlx } = target;
      if (!value) {
        callback(new Error('请输入证件号码'));
      } else if (zjlx === '1') {
        if (validCardId(value)) {
          callback();
        } else {
          callback(new Error('请填写正确的身份证号'));
        }
      }
    };
    return {
      rules: {
        qlrmc: [
          { required: true, message: '请输入被查询人姓名', trigger: 'blur' },
        ],
        zjlx: [
          { required: true, message: '请选择证件类型', trigger: 'change' },
        ],
        zjhm: [
          {
            required: true, trigger: 'blur', validator: checkId,
          },
        ],
      },
      columnNames: [
        {
          name: '序号', prop: 'xh', sortable: false, width: 80,
        },
        {
          name: '产权证号', prop: 'cqzh', sortable: false, minWidth: 300, class: 't-blue',
        },
        {
          name: '产权人', prop: 'cqr', sortable: false, minWidth: 100,
        },
        {
          name: '坐落', prop: 'zl', sortable: false, minWidth: 200, tooltip: true,
        },
        {
          name: '用途', prop: 'fwytmc', sortable: false, minWidth: 100,
        },
        {
          name: '建筑面积', prop: 'jzmj', sortable: false, minWidth: 100,
        },
        {
          name: '查封情况', prop: 'cfqk', sortable: false, minWidth: 100,
        },
        {
          name: '抵押情况', prop: 'dyqk', sortable: false, minWidth: 100,
        },
      ],
      tableData: [],
      totalCount: 0,
      showLoading: false,
      bdcxxbyqlrform: {
        bcxrList: [{
          qlrmc: '',
          zjlx: '',
          zjhm: '',
        }],
      },
      zjlxlist: [],
    };
  },
  filters: {
    setProp(value, propName) {
      return `bcxrList.${value}.${propName}`;
    },
  },
  computed: {
    ...mapState('app', { area: state => state.area }),
    ...mapState('user', { userId: state => state.userId }),

  },
  methods: {
    handleQuery() {
      this.$refs.bdcxxbyqlrform.validate((valid) => {
        if (valid) {
          const obj = this;
          obj.showLoading = true;
          const { bcxrList: data } = obj.bdcxxbyqlrform;
          getBDCXXByQLR({
            nodeName: this.area,
            data,
          }).then(({
            code,
            msg,
            resData = {},
          } = {}) => {
            obj.showLoading = false;
            if (code !== 0) {
              throw new Error(msg || '获取信息失败');
            } else {
              const { bdcdylists } = resData;
              obj.tableData = bdcdylists;
              obj.totalCount = bdcdylists.length;
            }
          }).catch((err) => {
            obj.showLoading = false;
            let sErrortip = '';
            if (err.message.includes('timeout')) {
              sErrortip = '网络请求超时';
            }
            obj.$message({
              type: 'error',
              message: sErrortip + (err.message || '获取户信息失败'),
            });
          });
        }
      });
    },
    handleReset(formName = 'bdcxxbyqlrform') {
      if (this.$refs[formName] !== undefined) {
        this.$refs[formName].resetFields();
      }
    },
    handleAddCon() {
      this.bdcxxbyqlrform.bcxrList.push({
        qlrmc: '',
        zjlx: '',
        zjhm: '',
      });
    },
    handleDelCon(item, index) {
      this.bdcxxbyqlrform.bcxrList.splice(index, 1);
    },
    showAdd(index) {
      return this.bdcxxbyqlrform.bcxrList.length === (index + 1);
    },
    async initDic() {
      const t = this;
      const { resData: { dicitemTree } } = await t.getDicList('证件类型');
      this.zjlxlist = dicitemTree.filter(item => item.name);
    },
    getDicList(dicName) {
      return new Promise((resolve) => {
        queryByDicname(dicName).then((res) => {
          if (res.code !== 0) {
            throw new Error(res.msg || `获取${dicName}字典失败`);
          } else {
            resolve(res);
          }
        }).catch((err) => {
          let sErrortip = '';
          if (err.message.includes('timeout')) {
            sErrortip = '网络请求超时';
          }
          this.$message({
            type: 'error',
            message: sErrortip + (err.message || `获取${dicName}字典失败`),
          });
          resolve('');
        });
      });
    },
    setCurrent(row) {
      this.$refs.singleTable.setCurrentRow(row);
    },
    indexMethod(index) {
      return index + 1;
    },
  },
  async created() {
    await this.initDic();
  },
};
</script>
<style lang='scss' type="text/scss"  scoped >
@import "../queryBuildings/index.scss";
@import "./index.scss";
</style>
