<!--
 * @Descripttion: 首次登记填写
 * @version: 1.0
 * @Author: 胡威
 * @Date: 2020-02-14 13:41:55
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-03-20 23:20:54
 -->
<template>
  <div class='form-message-box'>
    <div class="workcode">
      <h3 id="t1">不动产数据检验</h3>
      <p>业务编号：<span>{{messFrom.code}}</span></p>
      <label class="type">共有方式</label>
      <el-select v-model="messFrom.type" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </div>
    <div class="infolist">
      <div class="info-head">
        <h3 id="t2">登记清单</h3>
      </div>
      <div class="info-body">
        <el-table
          :data="infoDataComp"
          stripe
          style="width: 100%;"
          :header-cell-style="tableHeadStyle"
          >
          <el-table-column v-for="(item,index) in infoHeadNames" :key="index"
            :prop="item.prop"
            :label="item.label"
            :width="item.width"
            >
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="userinfo">
      <div class="info-head">
        <h3 id="t3">完善权利人</h3>
      </div>
      <div class="info-body">
        <el-table
          :data="userDataComp"
          stripe
          style="width: 100%;"
          :header-cell-style="tableHeadStyle"
          >
          <el-table-column v-for="(item,index) in userHeadNames" :key="index"
            :prop="item.prop"
            :label="item.label"
            :width="item.width"
            >
          </el-table-column>
          <el-table-column
             label="操作"
          >
            <template v-slot="scope">
              <el-button @click="handleClick(scope)" type="text"
              size="small">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-dialog  :visible.sync="dialogVisible" width="65%" title="编辑信息"
         modal>
          <el-form ref="dialogForm" :model="dialogForm" label-width="140px"
            :rules="rules" style="margin:0 20px 0 10px">
              <el-row :gutter="20">
                  <el-col :span="12">
                    <el-form-item  label="姓名：">
                      <el-input v-model="dialogForm.name" :disabled="true"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="权利人性质：" prop="qlrxz">
                      <el-select v-model="dialogForm.qlrxz" placeholder="请选择"
                      class="select_w">
                        <el-option
                          v-for="item in qlrxz"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
              </el-row>
              <el-row :gutter="20">
                  <el-col :span="12">
                    <el-form-item  label="证件类型：">
                      <el-input v-model="dialogForm.zjlbzw" :disabled="true"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item  label="证件号码：" prop="zjhm">
                      <el-input v-model="dialogForm.zjhm" :disabled="true"></el-input>
                    </el-form-item>
                  </el-col>
              </el-row>
              <el-row :gutter="20">
                  <el-col :span="12">
                    <el-form-item label="地址：" prop="dz">
                      <el-input v-model="dialogForm.dz"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="法人代表名称：" prop="frdbrxm">
                      <el-input v-model="dialogForm.frdbrxm"></el-input>
                    </el-form-item>
                  </el-col>
              </el-row>
              <el-row :gutter="20">
                  <el-col :span="12">
                    <el-form-item label="法人代表证件类型：" prop="frdbzjlx">
                      <el-select v-model="dialogForm.frdbzjlx" class="select_w"
                      placeholder="请选择">
                        <el-option
                          v-for="item in zjlx"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="法人代表证件号码：" prop="frdbzjh">
                      <el-input v-model="dialogForm.frdbzjh"></el-input>
                    </el-form-item>
                  </el-col>
              </el-row>
              <el-row :gutter="20">
                  <el-col :span="12">
                    <el-form-item label="法人代表联系电话：" prop="frdbdhhm">
                      <el-input v-model="dialogForm.frdbdhhm"></el-input>
                    </el-form-item>
                  </el-col>
              </el-row>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="handleEdit">确 定</el-button>
            <el-button @click="handleCance">取 消</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getDicitem, queryByUserId,
} from '@/apis/buildingTable/building';
import { handleSave } from '@/apis/nres/zxtj';
import { getQueryH } from '@/apis/nres/lpb';
import { formatDate } from '@/libs/date';
import getKeyCode from '@/mixins/getKeyCode';
import transValToName from '@/mixins/transValToName';
import { transNumToId } from '@/libs/utils';
import { mapState, mapMutations } from 'vuex';

export default {
  mixins: [getKeyCode, transValToName],
  data() {
    return {
      tableHeadStyle: {
        background: '#F2F6FC',
        color: '#666',
        fontWeight: 'normal',
        fontSize: '14px',
      },
      dialogVisible: false,
      parentPnode: 'scdj',
      dicValue: 'scdj',
      dialogForm: {
      },
      cancelForm: {},
      messFrom: {
        code: '',
        type: '共同共有',
        htstybms: null, // ['1686660', '123'],
        tstybm: null, // 'BL-160106105806-MTY0Y6526D',
      },
      nodeName: null, // '宜昌',
      rkey: 'W',
      dicitemName: '共有方式',
      options: [],
      zjlx: [
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
      qlrxz: [
        {
          value: '企业',
          label: '企业',
        },
        {
          value: '个人',
          label: '个人',
        },
      ],
      infoHeadNames: [
        { label: '序号', prop: 'codes', width: '50px' },
        { label: '单元号', prop: 'dyh', width: '70px' }, // BDCDYH bdcdyh
        // { label: '所在层', prop: 'ghyt', width: '' }, // /storey
        // { label: '总层数', prop: 'sjc', width: '70px' }, // all
        { label: '房间号', prop: 'fjh', width: '' }, // room
        { label: '幢编号', prop: 'zh', width: '' }, // build
        { label: '户号', prop: 'hh', width: '' }, // family
        { label: '不动产单元号', prop: 'bdcdyh', width: '250px' }, // number
        { label: '规划用途', prop: 'ghytms', width: '' }, // use
        { label: '建筑面积', prop: 'jzmj', width: '' }, // area
      ],
      userHeadNames: [
        { label: '序号', prop: 'codes', width: '50px' },
        { label: '姓名', prop: 'name', width: '70px' }, // userName
        { label: '权利人性质', prop: 'qlrxz', width: '' },
        { label: '证件类型', prop: 'zjlbzw', width: '' }, // empCardtype
        { label: '证件号码', prop: 'zjhm', width: '' }, // empIdcardno
        { label: '通讯地址', prop: 'dz', width: '' },
        { label: '法人代表名称', prop: 'frdbrxm', width: '' },
        { label: '法人代表证件类型', prop: 'frdbzjlx', width: '' },
        { label: '法人代表证件号码', prop: 'frdbzjh', width: '' },
        { label: '法人代表联系电话', prop: 'frdbdhhm', width: '' },
      ],
      infoData: [],
      userData: [],
      rules: {},
      messageSave: {
        gyfs: '',
        sqbh: '',
        lcmc: '首次登记',
        djxl: '首次登记',
        djdl: '100',
        qxdm: 'wdja',
        blwd: '',
        blwdid: '',
        ajzt: '0',
        sqr: '',
        sqrsfzh: '', // this.userData.empIdcardno,
        sqrdhhm: '',
        ywmx: '楼盘表', // 业务模型
        zslx: '', // 证书类型
        lqfs: '', // 领取方式
        qlrxx: {
          qlr: null,
        },
        tsgl: null,
      },
    };
  },
  computed: {
    ...mapState('firstHand', { HTSTYBMS: state => state.HTSTYBMS }),
    ...mapState('firstHand', { ZTSTYBM: state => state.ZTSTYBM }),
    ...mapState('firstHand', { HTSTYBMS: state => state.HTSTYBMS }),
    ...mapState('firstHand', { NODENAME: state => state.NODENAME }),
    ...mapState('user', { userId: state => state.userId }),
    ...mapState('queryData', { FlOWDATA: state => state.FlOWDATA }),
    infoDataComp() {
      this.infoData.forEach((item, index) => {
        item.codes = (index + 1).toString();
      });
      return this.infoData;
    },
    userDataComp() {
      this.userData.forEach((item, index) => {
        item.codes = (index + 1).toString();
        item.zjlbzw = transNumToId(item.zjlb);
        item.frdbzjlx = transNumToId(item.frdbzjlx);
      });
      return this.userData;
    },
  },
  mounted() {
    this.messFrom.htstybms = this.HTSTYBMS;
    this.messFrom.tstybm = this.ZTSTYBM;
    this.nodeName = this.NODENAME;
    this.getHmess();
    this.getOptions();
    this.getUserInfo();
    this.$nextTick(() => {
      if (this.$route.params.sqbh) {
        this.messFrom.code = this.$route.params.sqbh;
        const { flowdata } = this.FlOWDATA.find(item => item.sqbh === this.messFrom.code);
        this.messFrom.code = flowdata.sqbh;
        this.messFrom.type = flowdata.gyfs;
        this.infoData = flowdata.hxx || []; // .hxx; // tsgl;
        this.userData = flowdata.qlrxx.qlr;
      } else if (!this.messFrom.code) {
        this.getKeyCode();
      }
    });
  },
  watch: {
    keyCode(nval) {
      this.messFrom.code = nval;
    },
  },
  methods: {
    ...mapMutations('firstHand', { setMessJson: 'SET_MESSAGEJSON' }),
    getOptions() {
      getDicitem(this.dicitemName).then((data) => {
        const { code, msg, resData } = data;
        if (code === 0) {
          const itemArr = resData.dicItem;
          this.options = itemArr.map(item => ({ value: item.ITEMVALUE, label: item.ITEMNAME }));
          this.messFrom.type = this.options[0].value;
        } else {
          this.$message.error(msg);
        }
      }, (err) => {
        throw new Error(err);
      });
    },
    getHmess() {
      const options = {
        showDetail: '是',
        showRegister: '否',
        showRetrospect: '否',
        htstybms: this.messFrom.htstybms,
        nodeName: this.nodeName,
        tstybm: this.messFrom.tstybm,
        pageNo: 0,
      };
      getQueryH(options).then((data) => {
        this.infoData = data.resData.hinfos; // data.data.hinfos.rows;
      }, (err) => {
        throw new Error(err);
      });
    },
    getUserInfo() {
      queryByUserId(this.userId).then((data) => {
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
          obj = Object.assign({
            name: '',
            qlrxz: '企业',
            zjlb: '',
            zjhm: '',
            dz: '',
            frdbrxm: '',
            frdbzjlx: '',
            frdbzjh: '',
            frdbdhhm: '',
          }, obj);
          this.userData.push(obj);
        });
      }, (err) => {
        throw new Error(err);
      });
    },
    handleClick(scope) {
      this.dialogForm = scope.row;
      this.cancelForm = Object.assign({}, scope.row);
      this.dialogVisible = true;
    },
    handleEdit() {
      this.$refs.dialogForm.validate((valid) => {
        if (valid) {
          this.dialogVisible = false;
        } else {
          this.$alert('请完善信息', {
            confirmButtonText: '确定',
          });
        }
      });
    },
    handleCance() {
      const { codes } = this.dialogForm;
      const obj = this.userData[codes - 1];
      const arr = Object.keys(obj);
      const cobj = this.cancelForm;
      arr.forEach((item) => {
        obj[item] = cobj[item];
      });
      this.dialogVisible = false;
    },
    setZJLX(arr) {
      const sarr = arr.map((item) => {
        const nobj = Object.assign({}, item);
        nobj.frdbzjlx = transNumToId(nobj.frdbzjlx, true);
        return nobj;
      });
      return sarr;
    },
    handlerUp() {
      const arr = this.messFrom.htstybms;
      const tsglArr = [];
      const that = this;
      arr.forEach((item, index) => {
        tsglArr.push({
          bdclx: '房屋',
          htstybms: item,
          tstybm: this.messFrom.tstybm,
          bdcdyh: that.infoData[index].bdcdyh,
          djzl: '权属',
        });
      });
      const options = Object.assign(this.messageSave, {
        djxl: this.dicData.itemName,
        lcmc: this.messFrom.code + this.dicData.itemName,
        sqrq: formatDate(new Date(), 1),
        gyfs: this.messFrom.type,
        sqbh: this.messFrom.code,
        sqr: this.userData[0].userId,
        ywlxbm: this.parentPnode,
        qlrxx: {
          qlr: this.setZJLX(this.userData),
        },
        hxx: this.infoData,
        tsgl: tsglArr,
      });
      this.setMessJson(options);
      this.handlerStorage();
      this.$emit('func', 1);
    },
    handlerStorage() {
      const arr = this.messFrom.htstybms;
      const tsglArr = [];
      const that = this;
      arr.forEach((item, index) => {
        tsglArr.push({
          bdclx: '房屋',
          htstybms: item,
          tstybm: this.messFrom.tstybm,
          bdcdyh: that.infoData[index].bdcdyh,
          djzl: '权属',
        });
      });
      const options = Object.assign(this.messageSave, {
        djxl: this.dicData.itemName,
        lcmc: this.messFrom.code + this.dicData.itemName,
        sqrq: formatDate(new Date(), 1),
        gyfs: this.messFrom.type,
        sqbh: this.messFrom.code,
        sqr: this.userData[0].userId,
        ywlxbm: this.parentPnode,
        qlrxx: {
          qlr: this.setZJLX(this.userData),
        },
        hxx: this.infoData,
        tsgl: tsglArr,
      });
      handleSave({
        nodeName: this.nodeName,
        data: options,
      }).then(({ code, msg }) => {
        if (code === 0) {
          this.$message({
            message: '保存成功', // msg,
            type: 'success',
          });
        } else {
          this.$message.error(msg);
        }
      }, (err) => {
        throw new Error(err);
      });
    },
  },
};
</script>

<style lang='scss'  type="text/scss">
@import "./index.scss";
</style>
