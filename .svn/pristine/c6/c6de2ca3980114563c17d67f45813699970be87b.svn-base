<template>
  <el-form
    :model="authAttrForm"
    :rules="authAttrRules"
    size="medium"
    label-width="110px"
    ref="authAttrForm"
  >
    <el-form-item label="编码" prop="id" v-if="showCode">
      <el-input v-model="authAttrForm.id" autocomplete="off" :disabled="canEditId"></el-input>
    </el-form-item>
    <el-form-item label="名称" prop="name">
      <el-input v-model="authAttrForm.name" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="类型" prop="type">
      <el-select
        v-model="authAttrForm.type"
        placeholder="请选择"
        style="width: 100%"
        :disabled="disabledType"
      >
        <el-option
          v-for="(item, index) in typeOptions"
          :key="item + index"
          :label="item"
          :value="item"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="所属模块分类" prop="sysclassify" v-if="showSysClassify">
      <el-input v-model="authAttrForm.sysclassify" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="描述" prop="note">
      <el-input v-model="authAttrForm.note" type="textarea" autocomplete="off"></el-input>
    </el-form-item>
  </el-form>
</template>

<script>

export default {
  props: {
    operateType: {
      type: String,
      validator: val => ['add', 'update'].includes(val),
    },
    data: {
      type: Object,
    },
    show: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      authAttrForm: {
        id: '',
        name: '',
        type: '',
        sysclassify: '',
        note: '',
      },
      authAttrRules: {
        id: [
          { required: true, message: '编码不能为空', trigger: 'blur' },
        ],
        name: [
          { required: true, message: '名称不能为空', trigger: 'blur' },
        ],
        type: [
          { required: true, message: '类型不能为空', trigger: 'blur' },
        ],
        sysclassify: [
          { required: true, message: '所属模块分类不能为空', trigger: 'blur' },
        ],
      },
    };
  },
  watch: {
    show: {
      handler(val) {
        this.$nextTick(() => {
          if (!val || !this.data) {
            return;
          }
          this.getauthAttrFormVal();
        });
      },
      immediate: true,
    },
  },
  computed: {
    typeOptions() {
      if (this.operateType === 'update' && this.data && this.data.type === 'Sys') {
        return ['功能', '模块', '模块分类'];
      }
      return ['功能', '模块'];
    },
    disabledType() {
      return !(this.operateType === 'add' && this.data && this.data.type === 'Obj');
    },
    showSysClassify() {
      return this.operateType === 'add' && this.data && this.data.type === 'Root';
    },
    showCode() {
      return !(this.operateType === 'update' && this.data && ['Root', 'Sys'].includes(this.data.type));
    },
    canEditId() {
      return this.operateType === 'update';
    },
  },
  methods: {
    cancelEdit() {
      this.resetFields();
      this.$emit('onCancel');
    },
    resetFields() {
      this.$refs.authAttrForm.resetFields();
    },
    convertType(type) {
      if (this.operateType === 'add') {
        return type !== 'Obj' ? '模块' : '功能';
      }
      if (type === 'Prop') {
        return '功能';
      }
      return type === 'Obj' ? '模块' : '模块分类';
    },
    getauthAttrFormVal() {
      this.resetFields();
      const {
        id,
        name,
        type,
        sysclassify,
        note,
      } = this.data;
      if (this.operateType === 'update') {
        this.authAttrForm = {
          id,
          name,
          type: this.convertType(type),
          sysclassify,
          note,
        };
        return;
      }
      this.authAttrForm = {
        ...this.authAttrForm,
        type: this.convertType(type),
        sysclassify: this.data.type === 'Root' ? '公共模块' : '',
      };
    },
    handleSubmit() {
      let props = ['name', 'type'];
      if (this.showSysClassify) {
        props = [...props, 'sysclassify'];
      }
      if (this.showCode) {
        props = [...props, 'id'];
      }
      const errorMsgs = [];
      this.$refs.authAttrForm.validateField(props, (errorMessage) => {
        errorMsgs.push(errorMessage);
      });
      if (errorMsgs.some(item => !!item)) {
        return;
      }
      this.$emit('onSubmit', this.authAttrForm);
    },
  },
};
</script>
