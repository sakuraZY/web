<template>
  <el-form
    ref="resetPwd"
    :model="formData"
    :rules="resetPwdRules"
    label-width="80px"
    size='medium'
  >
    <el-form-item prop="password" label="密码">
      <el-input type="password" size="medium" v-model="formData.password"></el-input>
    </el-form-item>
    <el-form-item prop="confirmPassword" label="确认密码">
      <el-input type="password" size="medium" v-model="formData.confirmPassword"></el-input>
    </el-form-item>
  </el-form>
</template>
<script>
import { updatePassword } from '@/apis/auth/user';
import XxteaJs from '@/plugins/Xxtea';

const { Xxtea } = XxteaJs;

export default {
  props: {
    userId: {
      required: true,
    },
  },
  data() {
    return {
      formData: {
        password: '',
        confirmPassword: '',
      },
      resetPwdRules: {
        password: [
          { required: true, message: '密码不能为空' },
        ],
        confirmPassword: [
          { required: true, message: '确认密码不能为空' },
        ],
      },
    };
  },
  methods: {
    handleSubmit() {
      this.$refs.resetPwd.validate((valid) => {
        if (!valid) return false;
        // 使用USERID作为加密密钥
        const { userId } = this;
        const xt = new Xxtea(userId);
        const options = {
          userId,
          password: xt.xxtea_encrypt(this.formData.password), // 对密码加密处理
          empower: true,
        };
        return updatePassword(options).then(({
          code,
          msg,
        } = {}) => {
          this.$message({
            type: code === 0 ? 'success' : 'error',
            message: msg,
          });
          if (code !== 0) {
            return false;
          }
          this.resetForm();
          return this.$emit('onSuccess');
        });
        // TODO 提交表单
      });
    },
    handleCancel() {
      this.resetForm();
      this.$emit('onCancel');
    },
    resetForm() {
      this.$refs.resetPwd.resetFields();
    },
  },
};

</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
