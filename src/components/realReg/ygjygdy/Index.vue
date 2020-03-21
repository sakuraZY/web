<template>
  <div class='ygdy-box'>
    <checkData ref="checkBDC" :showHT='showHT' @setDisalbed='setDisalbed' :baseInfo='baseInfo'>
    </checkData>
    <infoTable ref="tableInfo" :isVisable='show' :info='info' :isEdit='isEdit'></infoTable>
    <dyxx ref="dyxx" :isVisible='show' @isSubmit="getSubmit"></dyxx>
  </div>
</template>

<script>
import checkData from '@/components/realReg/checkData';
import infoTable from '@/components/realReg/ygjygdy/listInfo.vue';
import dyxx from '@/components/realReg/dyxx';
import { mapMutations, mapState } from 'vuex';
import { saveYGYGDY } from '@/apis/nres/ygdy';
import { formatDate } from '@/libs/date';

export default {
  data() {
    return {
      show: false,
      info: '',
      showHT: true,
      typeName: '流程实例',
      parentPnode: 'ygjygdy',
      gyfsShow: false,
      isRule: false, // 判断抵押信息组件是否通过验证
      isEdit: false,
      baseInfo: {
        zsm: '不动产证书',
        labelmc: '不动产证书',
        labelqlr: '权利人名称',
        nodeName: '宜昌',
      },
      messageSave: {
        lcmc: '预告及预告抵押登记',
        djxl: '预告及预告抵押',
        djdl: '910',
        ajzt: '0',
        sqr: '',
        xgzh: '',
        htbh: '',
        sqbh: 'W',
        ywlxbm: 'ygjygdy',
        qlrxx: {
          ywr: [],
          dyr: [],
          dyqr: [],
          zwr: [],
        },
        tsgl: [],
        dyxx: [],
      },
    };
  },
  components: {
    checkData,
    infoTable,
    dyxx,
  },
  methods: {
    ...mapMutations('ygjygdy', { setMessJson: 'SET_MESSAGEJSON' }),
    ...mapMutations('ygjygdy', { setNodeName: 'SET_NODENAME' }),
    setDisalbed(bdisabled) {
      this.$parent.isDisabled = bdisabled;
      this.$emit('btnDisabled', bdisabled);
    },
    // 获取子组件状态
    getSubmit(type) {
      this.isRule = Boolean(type[1]);
    },
    submitT() {
      this.$refs.dyxx.submitForm();
    },
    getOptions(messageSave) {
      return Object.assign(messageSave, {
        sqrq: formatDate(new Date(), 1),
        gyfs: this.$refs.tableInfo.gyfs,
        sqbh: this.$refs.checkBDC.checkform.sqbh,
        sqr: this.userId,
        name: this.userName,
        htbh: this.$refs.checkBDC.checkform.htbh,
        qlrmc: this.$refs.checkBDC.checkform.qlrmc,
        qlrxx: {
          ywr: this.$refs.tableInfo.ywrDataFormat,
          dyqr: this.$refs.tableInfo.dyqrDataFormat,
          qlr: this.$refs.tableInfo.dyrDataFormat,
          dyr: this.$refs.tableInfo.dyrDataFormat,
          zwr: this.$refs.tableInfo.zwrDataFormat,
        },
        dyxx: { ...this.$refs.dyxx.getDyxx() },
        tsgl: this.$refs.tableInfo.getTSXX(),
        fwzl: this.$refs.checkBDC.fwzl,
      });
    },
    setOptions(messageSave) {
      this.isEdit = true;
      this.$refs.checkBDC.checkform.sqbh = messageSave.sqbh;
      this.$refs.checkBDC.checkform.htbh = messageSave.htbh;
      this.$refs.checkBDC.checkform.qlrmc = messageSave.qlrmc; // messageSave.qlrxx.dyr[0].name;
      this.$refs.checkBDC.handleCheck();
      this.$refs.tableInfo.ywrData = messageSave.qlrxx.ywr;
      this.$refs.tableInfo.dyqrData = messageSave.qlrxx.dyqr;
      this.$refs.tableInfo.dyrData = messageSave.qlrxx.dyr;
      this.$refs.tableInfo.zwrData = messageSave.qlrxx.zwr;
      this.$refs.dyxx.dyxxForm = { ...messageSave.dyxx };
      this.$refs.tableInfo.gyfs = messageSave.gyfs;
    },
    handlerStorage() {
      // 第一步时验证dyxx子表单提交
      this.submitT();
      if (!this.isRule) {
        this.$message({
          type: 'warning',
          message: '信息输入不完整',
        });
        return;
      }
      const options = this.getOptions(this.messageSave);
      this.setMessJson(options);
      // console.log(JSON.stringify(options));
      saveYGYGDY({
        data: options,
        nodeName: this.baseInfo.nodeName,
      }).then((response) => {
        if (response.code === 0) {
          this.$message({
            type: 'success',
            message: '保存成功',
          });
        } else {
          this.$message.error('保存失败！请稍后重试或联系管理员');
          throw new Error(response.msg);
        }
      }).catch((err) => {
        this.$message.error('保存失败！请稍后重试或联系管理员');
        throw new Error(err.message);
      });
    },

    handlerUp() {
      this.submitT();
      if (!this.isRule) {
        this.$message({
          type: 'warning',
          message: '信息输入不完整',
        });
        return;
      }
      const options = this.getOptions(this.messageSave);
      this.setMessJson(options);
      this.handlerStorage();
      this.$emit('funcNext', 1);
    },
  },
  created() {

  },
  mounted() {
    this.$refs.checkBDC.parentPnode = this.parentPnode;
    this.$nextTick(() => {
      if (this.$route.params.sqbh === null || this.$route.params.sqbh === undefined) {
        // console.log('1');
      } else {
        const flowdata = this.flowdatas.filter(p => p.sqbh === this.$route.params.sqbh);
        this.messageSave = { ...flowdata[0].flowdata };
        // console.log(flowdata);
        // console.log(this.messageSave);
        this.setOptions(this.messageSave);
      }
    });
  },
  computed: {
    ...mapState('queryData', { flowdatas: state => state.FlOWDATA }),
    ...mapState('user', {
      userId: state => state.userId,
      userName: state => state.userName,
    }),
  },
};

</script>
