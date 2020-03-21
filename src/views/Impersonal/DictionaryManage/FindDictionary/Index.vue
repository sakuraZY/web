<template>
  <el-form
    :model="findDicForm"
    :rules="findDicRules"
    size="medium"
    label-width="80px"
    ref="findDicForm"
  >
    <el-form-item label="名称" prop="name">
      <el-input
        v-model.trim="findDicForm.name"
        autocomplete="off"
        clearable
      ></el-input>
    </el-form-item>
    <el-form-item label="查询方式">
      <el-radio v-model="findDicForm.findType" label="1">精确查询</el-radio>
      <el-radio v-model="findDicForm.findType" label="2">模糊查询</el-radio>
    </el-form-item>
  </el-form>
</template>

<script>

export default {
  data() {
    return {
      isNeedReloadTableField: true,
      findDicForm: {
        name: '',
        findType: '2',
      },
      findDicRules: {
        name: [
          { required: true, message: '名称不能为空', trigger: 'blur' },
        ],
      },
    };
  },
  methods: {
    cancelEdit() {
      this.resetFields();
      this.$emit('onCancel');
    },
    resetFields() {
      this.$refs.findDicForm.resetFields();
    },
    handleSubmit() {
      this.$refs.findDicForm.validate((valid) => {
        if (!valid) {
          return false;
        }
        return this.$emit('onSubmit', { ...this.findDicForm });
      });
    },
  },
};
</script>
