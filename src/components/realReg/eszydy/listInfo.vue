<template>
  <div class="form-message-box" v-show="isVisable">
    <div id="qlrDiv" ref="dyrDiv">
      <div class="info-head">
       <h3 id="t2" ref="t2">权利人信息</h3>
        <div class="add">
          <div class="add">
          <el-button  type="primary" plain size="medium" @click="addQlr"
          style="height:32px;line-height:32px;padding:0 10px;">新增权利人</el-button>
        </div>
        </div>
      </div>
      <div class="info-body">
         <personTable  :personData='qlrDataFormat' :headNames='headNamesQlr' :showBtn='!showBtn'
      :showObj='showObjQlr' @addFamilyFn='addFamily' @editfn='editQlr'></personTable>
      </div>
    </div>
    <div id="dyqrDiv" ref="dyqrDiv">
       <div class="info-head">
       <h3 id="t3" ref="t3">抵押权人信息</h3>
        <div class="add">
          <div class="add">
          <el-button  type="primary" plain size="medium" @click="addDyqr"
          style="height:32px;line-height:32px;padding:0 10px;">新增</el-button>
        </div>
        </div>
      </div>
      <div class="info-body">
        <personTable  :personData='dyqrDataFormat' :headNames='headNames'
        @editfn='editDyqr' :orgLen='orgLen' :showObj='showObjDyqr'>
        </personTable>
      </div>
    </div>
    <div id="ywrDiv" ref="ywrDiv">
      <div class="info-head">
      <h3 id="t4" ref="t4">义务人信息</h3>
      </div>
      <div class="info-body">
         <personTable  :personData='ywrDataFormat' :headNames='headNames'
      :showBtn='showBtn'></personTable>
      </div>
    </div>
    <div id="bdcxxDiv" ref="bdcxxDiv">
      <div class="info-head">
       <h3 id="t5" ref="t5">不动产权信息</h3>
      </div>
      <div class="info-body">
        <el-table
          :data="bdcData"
          tooltip-effect="dark"
          border
          stripe
          width="80%"
          :cell-style="{padding:'5px'}"
          :header-cell-style="tableHeaderColor"
          :index="indexMethod"
        >
          <el-table-column v-for="(item,index) in bdcHeadNames" :key="index"
              :prop="item.prop"
              :label="item.label"
              :minWidth="item.minWidth"
              :width="item.width"
              :align="item.align"
              :type="item.type"
              show-overflow-tooltip
              >
            </el-table-column>
        </el-table>
      </div>
      <div class="infoselect">
        <el-row>
          <el-col :span="8">
            <label class="type"><span>*</span>共有情况</label>
             <el-select v-model="gyfs"  size="medium" placeholder="请选择" >
              <el-option
                v-for="item in gyfslist"
                :key="item.name"
                :label="item.name"
                :value="item.itemValue" >
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="8">
            <label class="type"><span>*</span>是否分别持证</label>
            <el-select v-model="sqfbcz"  size="medium" placeholder="请选择" >
              <el-option key="czt"  label="是" value="是" >
              </el-option>
              <el-option key="czf"  label="否" value="否" >
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="8"><div></div></el-col>
        </el-row>
      </div>
    </div>
   <div id="zwrDiv" ref="zwrDiv">
      <div class="info-head">
        <h3 id="t6" ref="t6">第三方债务人信息</h3>
        <div class="add">
          <div class="add">
            <el-button  type="primary" plain size="medium" @click="addZwr"
            style="height:32px;line-height:32px;padding:0 10px;">新增债务人</el-button>
          </div>
        </div>
      </div>
      <div class="info-body" >
         <personTable  :personData='zwrDataFormat' :headNames='headNames'
          @editfn='editZWR'></personTable>
      </div>
    </div>
   <personForm  ref="perTable" @getInfoFn="getPerInfo"
    v-if="dialogFormVisible" :visible.sync="dialogFormVisible"
    :zjlxlist='zjlxlist' :qlrxzlist='qlrxzlist' :title='title' :inputDisabled='inputDisabled' >
    </personForm>
 <el-dialog
      title="权利人信息"
      :visible.sync="dialogQLRVisible"
      @close="closeQLRDialog"
      :modal-append-to-body='false'
      :close-on-click-modal ='false'
      :close-on-press-escape='false'
      :destroy-on-close='true'
      width='30%'
    >
      <el-form :model="qlrinfo" ref="qlrForm" :rules="qlrRules" size="small" label-width="100px">
        <el-row :gutter="20">
          <el-col :md="24">
            <el-form-item label="姓名:" prop="name">
              <el-input v-model.trim="qlrinfo.name"
              :disabled="inputDisabled"
              placeholder="请输入姓名"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-form-item label="权利人性质:" prop="qlrxz">
               <el-select v-model.trim="qlrinfo.qlrxz" style="width: 100%;">
                 <el-option
                    v-for="item in qlrxzlist"
                    :key="item.name"
                    :label="item.name"
                    :value="item.itemValue">
                  </el-option>
                </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :md="24">
            <el-form-item label="证件类型:" prop="zjlbmc">
                <el-select v-model="qlrinfo.zjlbmc"  style="width:100%"
                 @change="getZJLBMC" ref='newText' >
                  <el-option
                    v-for="item in zjlxlist"
                    :key="item.name"
                    :label="item.name"
                    :value="item.itemValue" >
                  </el-option>
                </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
           <el-col :md="24">
            <el-form-item label="证件号码:" prop="zjhm">
              <el-input v-model.trim="qlrinfo.zjhm" placeholder="请输入证件号码"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :md="24">
            <el-form-item label="联系电话:" prop="dh">
              <el-input v-model.trim="qlrinfo.dh" placeholder="请输入联系电话"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogQLRVisible = false" size="medium">读 证</el-button>
        <el-button type="primary" @click="submitQlrForm" size="medium">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="家庭成员信息" :visible.sync="dialogTableVisible"
     :modal-append-to-body='false'
      :close-on-click-modal ='false'
      :close-on-press-escape='false'
      :destroy-on-close='true'
      @close="closeFamilyDialog"
      width='55%'>
      <div>
      <!-- <editTable  ref="familyTable" :zjlxlist='zjlxlist'></editTable> -->
      <editTable  ref="familyTable" @familyFn="getFamilyData"></editTable>
      </div>
</el-dialog>
  </div>
</template>

<script>
import { queryByDicname } from '@/apis/realReg/dicItem';
import { getEmployeeById } from '@/apis/auth/employee';
import { mapState } from 'vuex';
import editTable from '@/components/realReg/gyzj/editTable.vue';
import personForm from '@/components/realReg/gyzj/personForm.vue';
import personTable from '@/components/realReg/gyzj/personTable.vue';
import { validCardId, validPhone } from '@/libs/validate';

export default {
  data() {
    const regId = (rule, value, callback) => {
      if (this.qlrinfo.zjlb === '1' || this.qlrinfo.zjlbmc === '身份证') {
        if (validCardId(value)) {
          callback();
        } else {
          callback(new Error('请填写正确的身份证号'));
        }
      } else if (value === '') {
        callback(new Error('请填写证件号码'));
      } else {
        callback();
      }
    };
    const regPhone = (rule, value, callback) => {
      if (validPhone(value)) {
        callback();
      } else {
        callback(new Error('请填写正确的手机号码'));
      }
    };
    return {
      headNames: [
        {
          label: '序号', prop: 'codes', width: '58px', align: 'center', type: 'index', show: true,
        },
        {
          label: '姓名', prop: 'name', minWidth: '100px', align: 'center', show: true,
        },
        {
          label: '权利人性质', prop: 'qlrxzmc', minWidth: '100px', align: 'center', show: true,
        },
        {
          label: '证件类型', prop: 'zjlbmc', minWidth: '90px', align: 'center', show: true,
        },
        {
          label: '证件号码', prop: 'zjhm', minWidth: '90px', align: 'center', show: true,
        },
        {
          label: '联系电话', prop: 'dh', minWidth: '100px', align: 'center', show: true,
        },
        {
          label: '法人代表',
          align: 'center',
          show: false,
          children: [
            {
              label: '姓名', prop: 'frdbrxm', minWidth: '85px', align: 'center', show: false,
            },
            {
              label: '证件类型', prop: 'frdbzjlxmc', minWidth: '85px', align: 'center', show: false,
            },
            {
              label: '证件号码', prop: 'frdbzjh', minWidth: '85px', align: 'center', show: false,
            },
            {
              label: '联系电话', prop: 'frdbdhhm', minWidth: '85px', align: 'center', show: false,
            },
          ],
        },
      ],
      headNamesQlr: [
        {
          label: '序号', prop: 'codes', width: '58px', align: 'center', type: 'index', show: true,
        },
        {
          label: '姓名', prop: 'name', minWidth: '100px', align: 'center', show: true,
        },
        {
          label: '权利人性质', prop: 'qlrxzmc', minWidth: '100px', align: 'center', show: true,
        },
        {
          label: '证件类型', prop: 'zjlbmc', minWidth: '90px', align: 'center', show: true,
        },
        {
          label: '证件号码', prop: 'zjhm', minWidth: '90px', align: 'center', show: true,
        },
        // {
        //   label: '通讯地址', prop: 'dz', minWidth: '100px', align: 'center', show: false,
        // },
        {
          label: '联系电话', prop: 'dh', minWidth: '100px', align: 'center', show: true,
        },
      ],
      bdcHeadNames: [
        {
          label: '序号', prop: 'codes', width: '58px', align: 'center', type: 'index',
        },
        {
          label: '坐落', prop: 'zl', minWidth: '160px', align: 'center',
        },
        {
          label: '不动产单元', prop: 'bdcdyh', minWidth: '150px', align: 'center',
        },
        {
          label: '土地使用权面积', prop: 'tdsyqmj', minWidth: '125px', align: 'center',
        },
        {
          label: '房屋建筑面积', prop: 'fwjzmj', minWidth: '110px', align: 'center',
        },
        {
          label: '土地用途', prop: 'tdytmc', minWidth: '90px', align: 'center',
        },
        {
          label: '房屋用途', prop: 'fwytmc', minWidth: '90px', align: 'center',
        },
        {
          label: '抵押情况', prop: 'dyqk', minWidth: '90px', align: 'center',
        },
        {
          label: '查封情况', prop: 'cfqk', minWidth: '90px', align: 'center',
        },
      ],
      qlrData: [],
      ywrData: [],
      // dyrData: [],
      dyqrData: [],
      bdcData: [],
      dialogFormVisible: false,
      dialogTableVisible: false,
      dialogQLRVisible: false,
      zwrData: [],
      qlrinfo: {
        qlrxz: '1',
        zjlbmc: '身份证',
        zjlb: '1',
        zjhm: '',
        dz: '',
        dh: '',
        name: '',
      },
      zjlxlist: [],
      qlrxzlist: [],
      gyfslist: [],
      isShow: false,
      orgLen: 0, // 抵押权人原始数量 判断是否需要显示删除按钮
      operateType: 'add',
      zwrIndex: 0,
      dyqrIndex: 0,
      qlrIndex: 0,
      title: '添加第三方债务人信息',
      gyfs: '0',
      sqfbcz: '否',
      rules: {
        gyfs: [
          { required: true, message: '共有方式不能为空' },
        ],
      },
      // 验证规则
      qlrRules: {
        name: [
          { required: true, message: '姓名不能为空' },
        ],
        lxdh: [{
          required: true,
          validator: regPhone,
          trigger: 'blur',
        }],
        zjhm: [{ required: true, validator: regId }],
      },
      isRule: false, // 判断抵押信息组件是否通过验证
      inputDisabled: false,
      selectQlr: {},
      showBtn: false,
      showObjDyqr: {
        bDyqr: true,
        bEdit: true,
        bDelete: true,
        bfamily: false,
        brlyz: false,
        width: '90px',
      },
      showObjQlr: {
        bEdit: true,
        bDelete: true,
        bfamily: true,
        brlyz: true,
        width: '260px',
      },
    };
  },
  props: ['isVisable', 'info', 'isEdit'],
  components: {
    editTable,
    personForm,
    personTable,

  },
  created() {
    this.getDicItems('共有方式');
    this.getDicItems('证件类型');
    this.getDicItems('权利人性质');
  },
  methods: {
    getTableInfo() {
      if (this.info !== '' && this.info.length > 0) {
        const info = JSON.parse(this.info);
        // console.log(this.info);
        const qlrinfo = info.qlrxx.qlr;
        if (qlrinfo.length > 0) {
          // console.log(this.isEdit);
          if (!this.isEdit) {
            // 编辑时，不需要再次获取没有family的qlrdata 只需要从案件详情信息中获取具有family属性的数据
            // this.qlrData = info.qlrxx.qlr.map((item) => {
            //   item.name = item.qlrmc;
            //   item.zjlbmc = this.tranZJLBM(item.zjlb);
            //   return item;
            // });
            if (info.qlrxx.qlr !== undefined && info.qlrxx.qlr.length > 0) {
              this.ywrData = info.qlrxx.qlr.map((item) => {
                item.name = item.qlrmc;
                item.zjlbmc = this.tranZJLBM(item.zjlb, this.zjlxlist);
                item.qlrxzmc = this.tranZJLBM(item.qlrxz, this.qlrxzlist);
                item.frdbrxm = item.frdbxm;
                item.frdbzjlxmc = this.tranZJLBM(item.frdbzjlx, this.zjlxlist);
                return item;
              });
            }
          }
          this.orgLen = qlrinfo.length;
          this.bdcData = info.bdcdylists;
          if (this.dyqrData === [] || this.dyqrData.length === 0) {
            this.getUserInfo();
          }
        } else {
          // this.dyrData = [];
          this.qlrData = [];
          this.ywrData = [];
          this.orgLen = 0;
          this.bdcData = [];
        }
      }
    },
    indexMethod(index) {
      return index + 1;
    },
    addZwr() {
      this.inputDisabled = false;
      this.title = '添加第三方债务人信息';
      this.dialogFormVisible = true;
      this.operateType = 'add';
    },
    addDyqr() {
      this.inputDisabled = false;
      this.title = '添加抵押权人信息';
      this.dialogFormVisible = true;
      this.operateType = 'addDyqr';
    },
    editZWR(item, index) {
      this.title = '修改第三方债务人信息';
      this.zwrIndex = index;
      this.operateType = 'edit';
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs.perTable.info = { ...item };
      });
    },
    editDyqr(item, index) {
      this.inputDisabled = index <= this.orgLen;
      this.title = '修改抵押权人信息';
      this.dyqrIndex = index;
      this.operateType = 'editDyqr';
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs.perTable.info = { ...item };
      });
    },
    delZWR(idx) {
      this.$confirm('确认删除选中数据吗？').then(() => {
        this.zwrData.splice(idx, 1);
      });
    },

    delDyqr(idx) {
      this.$confirm('确认删除选中数据吗？').then(() => {
        this.dyqrData.splice(idx, 1);
      });
    },
    getPerInfo(val) {
      // console.log(val);
      // console.log(this.zwrData);
      if (this.operateType === 'add') {
        this.zwrData = [...this.zwrData, { ...val }];
      } else if (this.operateType === 'addDyqr') {
        this.dyqrData = [...this.dyqrData, { ...val }];
      } else if (this.operateType === 'edit') {
        this.$set(this.zwrData, this.zwrIndex, { ...val });
      } else {
        this.$set(this.dyqrData, this.dyqrIndex, { ...val });
      }
    },
    resetFields(formRef) {
      this.$refs[formRef].resetFields();
    },
    getDicItems(dicname) {
      const datas = {
        dicName: dicname,
      };
      new Promise((resolve) => {
        queryByDicname(datas).then((res) => {
          resolve(res);
        });
      }).then((res) => {
        if (res.code === 0) {
          if (dicname === '证件类型') {
            this.zjlxlist = res.resData.dicitemTree.filter(item => item.name);
          } else if (dicname === '权利人性质') {
            this.qlrxzlist = res.resData.dicitemTree.filter(item => item.name);
          } else {
            this.gyfslist = res.resData.dicitemTree.filter(item => item.name);
          }
        }
      });
    },
    getUserInfo() {
      getEmployeeById(this.userId).then((data) => {
        let arr = [];
        if (!Array.isArray(data.resData)) {
          arr.push(data.resData);
        } else {
          arr = data.resData;
        }
        arr.forEach((item) => {
          let obj = {};
          obj.name = item.user.userName;
          obj.userId = item.user.userId;
          obj.zjlb = item.employee.empCardtype;
          obj.zjhm = item.employee.empIdcardno;
          const zjobj = this.zjlxlist.find(tmp => tmp.itemValue === obj.zjlb);
          obj.zjlbmc = zjobj.name;
          obj = Object.assign({
            qlrxz: '',
            zjlb: '',
            zjhm: '',
            dz: '',
            dh: '',
            frdbrxm: '',
            frdbzjlx: '',
            frdbzjh: '',
            frdbdhhm: '',
          }, obj);
          this.dyqrData.push(obj);
        });
      }, (err) => {
        // throw new Error(err);
        this.$message.error(`获取抵押权人信息失败！${err.message}`);
      });
    },
    getZJLBMC(id) {
      const obj = this.zjlxlist.find(item => item.itemValue === id);
      this.qlrinfo.zjlbmc = obj.name;
      this.qlrinfo.zjlb = id;
    },
    tranZJLBM(id, list) {
      let val = id;
      if (list === null || list === undefined || list.length === 0) {
        return id;
      }
      const obj = list.find(item => item.itemValue === id);
      if (obj === null || obj === undefined) {
        val = id;
      } else {
        val = obj.name;
      }
      return val;
    },
    tranZJLBId(name, list) {
      let val = name;
      if (list === null || list === undefined || list.length === 0) {
        return name;
      }
      const obj = list.find(item => item.name === name);
      if (obj === null || obj === undefined) {
        val = name;
      } else {
        val = obj.itemValue;
      }
      return val;
    },
    // 修改table header的背景色
    tableHeaderColor({ rowIndex }) {
      let sty = 'padding:5px 1px;background:#F2F6FC;';
      if (rowIndex === 0 || rowIndex === 1) {
        sty = 'padding:5px 1px;background:#F2F6FC;font-size:14px;color:rgba(102,102,102,1);font-weight:400; height:15px;';
      }
      return sty;
    },
    getTSXX() {
      return this.bdcData.map(item => ({
        tstybm: item.tstybm,
        bdcdyh: item.bdcdyh,
        bdclx: '房屋',
        djzl: '预告抵押',
      }));
    },
    addFamily(rowData) {
      // todo
      this.dialogTableVisible = true;
      this.selectQlr = rowData;
      // 使用nextTick，在此次dom更新完成后再进行下面的操作 关于nextTick的原理
      // 在el-dialog不显示的时候，其内部的组件是不被加载的，也就是说el-dialog中子组件的方法肯定也是不被加载的。
      this.$nextTick(() => {
        if (this.selectQlr.family === undefined || this.selectQlr.family === null) {
          // todo
        } else {
          this.$refs.familyTable.familyData = this.selectQlr.family.map((item) => {
            item.zjlb = this.tranZJLBM(item.zjlb, this.zjlxlist);
            return item;
          });
        }
      });
    },
    closeFamilyDialog() {
      this.qlrData.map((item) => {
        if (item.name === this.selectQlr.name) {
          item.family = this.$refs.familyTable.familyData.map((tmpitem) => {
            tmpitem.zjlb = this.tranZJLBId(tmpitem.zjlb);
            return tmpitem;
          });
        }
        return item;
      });
      this.dialogTableVisible = false;
    },
    getFamilyData(val) {
      this.family = val;
    },
    addQlr() {
      // todo
      this.operateType = 'addQLR';
      this.dialogQLRVisible = true;
    },
    submitQlrForm() {
      this.$refs.qlrForm.validate((validate) => {
        if (!validate) {
          return;
        }
        if (this.operateType === 'addQLR') {
          this.qlrData = [...this.qlrData, { ...this.qlrinfo }];
        } else if (this.operateType === 'editQLR') {
          this.$set(this.qlrData, this.qlrIndex, { ...this.qlrinfo });
        }
        this.closeQLRDialog();
      });
    },
    editQlr(item, index) {
      this.title = '修改权利人信息';
      this.qlrIndex = index;
      this.operateType = 'editQLR';
      this.dialogQLRVisible = true;
      this.$nextTick(() => {
        this.qlrinfo = { ...item };
      });
    },
    delQlr(idx) {
      this.$confirm('确认删除选中数据吗？').then(() => {
        this.qlrData.splice(idx, 1);
      });
    },
    closeQLRDialog() {
      // todo
      this.dialogQLRVisible = false;
    },
    formatData(orgData) {
      if (orgData === undefined || orgData === null || orgData.length === 0) {
        return [];
      }
      return orgData.map((item) => {
        if (this.isEdit) {
          item.qlrxz = item.sqrxz;
        } else {
          item.sqrxz = item.qlrxz;
        }
        item.zjlbmc = this.tranZJLBM(item.zjlb, this.zjlxlist);
        item.qlrxzmc = this.tranZJLBM(item.qlrxz, this.qlrxzlist);
        if (item.frdbzjlx === null || item.frdbzjlx === undefined || item.frdbzjlx === '') {
          // item.qlrxz = '1';
        } else {
          item.frdbzjlxmc = this.tranZJLBM(item.frdbzjlx, this.zjlxlist);
        }
        return item;
      });
    },
  },
  mounted() {
    // this.getTableInfo();
  },
  computed: {
    ...mapState('user', { userId: state => state.userId }),
    ...mapState('eszydy', { datainfo: state => state.INFO }),
    ...mapState('eszydy', { bdc: state => state.BDC }),
    qlrDataFormat() {
      return this.formatData(this.qlrData);
    },
    ywrDataFormat() {
      return this.formatData(this.ywrData);
    },
    // dyrData: [],
    dyqrDataFormat() {
      return this.formatData(this.dyqrData);
    },
    zwrDataFormat() {
      return this.formatData(this.zwrData);
    },
  },
  watch: {
    isVisable(val) {
      if (val) {
        this.getTableInfo();
        // this.getUserInfo();
      }
    },
    familyData(val) {
      if (val.length > 0) {
        // todo
        this.qlrData = this.qlrData.map((item) => {
          item.family = this.familyData;
          return item;
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
