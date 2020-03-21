<template>
  <el-form
    :model="userAttrForm"
    :rules="userAttrRules"
    size="medium"
    label-width="80px"
    ref="userAttrForm"
  >
    <el-form-item label="名称" prop="userName">
      <el-input v-model="userAttrForm.userName" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="昵称" prop="userAlias">
      <el-input v-model="userAttrForm.userAlias" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="状态" prop="userState">
      <el-select v-model="userAttrForm.userState" placeholder="请选择" style="width: 100%">
        <el-option label="启用" value="启用"></el-option>
        <el-option label="禁用" value="禁用"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="排序序号" prop="userSortnum">
      <el-input v-model.number="userAttrForm.userSortnum" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="描述" prop="userNote">
      <el-input v-model="userAttrForm.userNote" type="textarea" autocomplete="off"></el-input>
    </el-form-item>
  </el-form>
</template>

<script>
import { addUser } from '@/apis/auth/user';

export default {
  data() {
    return {
      userAttrForm: {
        userName: '',
        userAlias: '',
        userState: '禁用',
        userSortnum: '',
        userNote: '',
      },
      userAttrRules: {
        userName: [
          { required: true, message: '请输入名称', trigger: 'blur' },
        ],
      },
    };
  },
  created() {
  },
  methods: {
    cancelEdit() {
      this.resetFields();
      this.$emit('onCancel');
    },
    resetFields() {
      this.$refs.userAttrForm.resetFields();
    },
    handleSubmit() {
      this.$refs.userAttrForm.validate((valid) => {
        if (!valid) {
          return false;
        }
        return addUser(this.userAttrForm).then(({ code, msg }) => {
          if (code === 0) {
            this.$message({
              type: 'success',
              message: '添加用户成功',
            });
            this.$emit('onSubmited', this.userAttrForm);
            this.resetFields();
          } else {
            throw new Error(msg);
          }
        }).catch((err) => {
          this.$message.error(err.message);
        });
      });
    },
  },
};
</script>
