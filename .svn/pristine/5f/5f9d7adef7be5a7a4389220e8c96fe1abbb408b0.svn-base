<template>
  <el-form ref="form" :model="form" label-width="80px" size="medium">
    <el-form-item label="身份证">
      <div class="photo" @click="showSelectFile('idCardPhoto')">
        <icon-svg iconClass="add" class="icon"></icon-svg>
      </div>
      <span>{{idCardPhoto_name}}</span>
      <input type="file"  v-show="false" ref="idCardPhoto"
        @change="onSelectedFile('idCardPhoto', $event)" />
    </el-form-item>
    <el-form-item label="营业执照">
      <div class="photo" @click="showSelectFile('businesLicensePhoto')">
        <icon-svg iconClass="add" class="icon"></icon-svg>
      </div>
      <span>{{businesLicensePhoto_name}}</span>
      <input type="file" v-show="false" ref="businesLicensePhoto"
        @change="onSelectedFile('businesLicensePhoto', $event)"
      />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">提交</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      formData: new FormData(),
      idCardPhoto_name: '',
      businesLicensePhoto_name: '',
      form: {},
    };
  },
  methods: {
    showSelectFile(ref) {
      this.$refs[ref].click();
    },
    onSelectedFile(type, e) {
      const file = e.target.files[0];
      if (!file) {
        return;
      }
      this[`${type}_name`] = file ? file.name : '';
      this.formData.append(type, file);
    },
    onSubmit() {
      axios({
        url: 'http://192.168.37.201:8090/auth/test',
        method: 'post',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        data: this.formData,
      }).then(({
        msg,
      }) => {
        this.$message(msg);
      }).catch((err) => {
        this.$message.error(err.message);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
