<!--
 * @Description: 进度查询查询界面
 * @Author: wangjiayu
 * @Date: 2020-03-19 13:40:17
 * @LastEditors: wangjiayu
 * @LastEditTime: 2020-03-21 09:57:02
 -->

<template>
  <div class="jdcx-box">
    <div class="jdcx-box-title">
      <h3>进度查询</h3>
    </div>
    <div class="jdcx-box-content">
      <el-form :model="queryForm" ref="queryForm" :rules="queryFormRules" label-width="100px">
        <el-form-item label="业务编号：" prop="slbh">
          <el-input v-model="queryForm.slbh" autocomplete="off"
            placeholder="请输入业务编号"></el-input>
        </el-form-item>
        <el-form-item label="权利人姓名：" prop="qlrmc">
          <el-input v-model="queryForm.qlrmc" autocomplete="off"
            placeholder="请输入权利人姓名"></el-input>
        </el-form-item>
        <el-form-item class="yzm-input" label="验证码：" prop="yzm">
          <el-input v-model="queryForm.yzm" autocomplete="off" initial='off'
            placeholder="请输入验证码"></el-input>
          <identify class="yzm-image" ref="yzm"></identify>
        </el-form-item>
        <div class="btn-group">
          <el-button type="primary" @click="handleQuery">查询</el-button>
          <el-button class="btnBorder" @click="handleRest">重置</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import Identify from '@/components/identify';
import getBDCJD from '@/apis/nres/zhcx';

export default {
  name: 'JDCX',
  components: {
    Identify,
  },
  data() {
    return {
      nodeName: '宜昌',
      queryForm: {
        slbh: '', // 要查询的业务编号
        qlrmc: '', // 权利人名称
        yzm: '', // 验证码
      },
      queryFormRules: {
        yzm: [
          { validator: this.checkYZM, trigger: 'blur' },
        ],
      },
    };
  },
  methods: {
    // 验证验证码是否天禧正确
    checkYZM(rule, value, callback) {
      if (this.$refs.yzm.checkIdentifyCode(value)) {
        callback();
      } else {
        callback(new Error('验证码输入错误'));
      }
    },
    // 查询进度信息
    handleQuery() {
      let isYZMRight = true;
      this.$refs.queryForm.validateField(['yzm'], (errMsg) => {
        if (errMsg) {
          isYZMRight = false;
        }
      });
      if (!isYZMRight) {
        return;
      }
      const { slbh, qlrmc } = this.queryForm;
      getBDCJD({
        nodeName: this.nodeName,
        slbh,
        qlrmc,
      }).then(({ code, resData } = {}) => {
        if (code === 0 && Array.isArray(resData) && resData.length) {
          this.$router.replace({
            name: 'JDCXJG',
            params: {
              data: resData[0],
            },
          });
        } else {
          this.$message.error('未查询到进度信息');
        }
      }, (err) => {
        throw new Error(err);
      });
    },
    // 重置查询条件
    handleRest() {
      this.$refs.queryForm.resetFields();
      this.$refs.yzm.getTempIdentifyCode();
    },
  },
};
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
