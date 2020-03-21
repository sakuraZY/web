<template>
  <el-form
    :model="dicAttrForm"
    :rules="dicAttrRules"
    size="medium"
    label-width="80px"
    ref="dicAttrForm"
  >
    <el-form-item label="序号" prop="dicSortnum">
      <el-input
        v-model.number="dicAttrForm.dicSortnum"
        type="number"
        autocomplete="off"
        clearable
      ></el-input>
    </el-form-item>
    <el-form-item label="名称" prop="name">
      <el-input v-model.trim="dicAttrForm.name" autocomplete="off" clearable></el-input>
    </el-form-item>
    <el-form-item label="类型" prop="dicTypeShow">
      <el-select
        v-model.trim="dicAttrForm.dicTypeShow"
        placeholder="请选择"
        style="width: 100%"
        :disabled="!isAdd"
      >
        <el-option label="目录" value="目录"></el-option>
        <el-option label="列表字典" value="列表字典"></el-option>
        <el-option label="树形字典" value="树形字典"></el-option>
        <el-option label="自定义字典" value="自定义字典"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item
      label="表名"
      prop="dicTablename"
      v-if="dicAttrForm.dicTypeShow === '自定义字典'"
      required
    >
      <el-input
        v-model.trim="dicAttrForm.dicTablename"
        autocomplete="off"
        clearable
        @blur="handleGetTableField"
      ></el-input>
    </el-form-item>
    <el-form-item
      label="主键"
      prop="dicPrimarykey"
      v-if="dicAttrForm.dicTypeShow === '自定义字典'"
      required
    >
      <el-tooltip :disabled="!!dicAttrForm.dicTablename" content="请先填写表名" placement="top">
        <el-select
          v-model.trim="dicAttrForm.dicPrimarykey"
          placeholder="请选择"
          style="width: 100%"
          clearable
          filterable
          :disabled="!dicAttrForm.dicTablename"
          @focus="handleGetTableField"
        >
          <el-option
            :label="item.value"
            :value="item.value"
            v-for="(item, index) in dicParentkeyList"
            :key="item + index"
            :disabled="item.disabled"
          >
            <span style="float: left">{{ item.value }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">{{ item.label }}</span>
          </el-option>
        </el-select>
      </el-tooltip>
    </el-form-item>
    <el-form-item
      label="父主键"
      prop="dicParentkey"
      v-if="dicAttrForm.dicTypeShow === '自定义字典'"
      required
    >
      <el-tooltip :disabled="!!dicAttrForm.dicTablename" content="请先填写表名" placement="top">
        <el-select
          v-model.trim="dicAttrForm.dicParentkey"
          placeholder="请选择"
          style="width: 100%"
          clearable
          filterable
          :disabled="!dicAttrForm.dicTablename"
          @focus="handleGetTableField"
        >
          <el-option
            :label="item.value"
            :value="item.value"
            v-for="(item, index) in dicParentkeyList"
            :key="item + index"
            :disabled="item.disabled"
          >
            <span style="float: left">{{ item.value }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">{{ item.label }}</span>
          </el-option>
        </el-select>
      </el-tooltip>
    </el-form-item>
    <el-form-item label="状态" prop="dicState">
      <el-select v-model="dicAttrForm.dicState" placeholder="请选择" style="width: 100%">
        <el-option label="启用" value="启用"></el-option>
        <el-option label="禁用" value="禁用"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="版本" prop="dicVersion">
      <el-input v-model.trim="dicAttrForm.dicVersion" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="描述" prop="dicNote">
      <el-input v-model.trim="dicAttrForm.dicNote" type="textarea" autocomplete="off"></el-input>
    </el-form-item>
  </el-form>
</template>

<script>
import { getDatasrcTableField } from '@/apis/form/datasrc';

export default {
  props: {
    isAdd: {
      type: Boolean,
      default: true,
    },
    data: {
      type: Object,
      default: () => ({}),
    },
    show: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    dicPrimarykeyList() {
      return this.tableFields.map(({ field, fieldNote }) => ({
        value: field,
        label: fieldNote,
        disabled: field === this.dicAttrForm.dicParentkey,
      }));
    },
    dicParentkeyList() {
      return this.tableFields.map(({ field, fieldNote }) => ({
        value: field,
        label: fieldNote,
        disabled: field === this.dicAttrForm.dicPrimarykey,
      }));
    },
  },
  watch: {
    show: {
      handler(val) {
        if (!val || this.isAdd) {
          return;
        }
        const {
          dicSortnum,
          name,
          dicTypeShow,
          dicTablename,
          dicPrimarykey,
          dicParentkey,
          dicState,
          dicVersion,
          dicNote,
        } = this.data;
        this.dicAttrForm = {
          ...this.dicAttrForm,
          dicSortnum,
          name,
          dicTypeShow,
          dicTablename,
          dicPrimarykey,
          dicParentkey,
          dicState,
          dicVersion,
          dicNote,
        };
      },
      immediate: true,
    },
    'dicAttrForm.dicTablename': {
      handler(val, oldVal) {
        if (val !== oldVal) {
          this.isNeedReloadTableField = true;
          this.tableFields = [];
          this.dicAttrForm.dicPrimarykey = '';
          this.dicAttrForm.dicParentkey = '';
        }
      },
      immediate: true,
    },
  },
  data() {
    const validateNotBlank = (rule, value, callback) => {
      if (!value && this.dicAttrForm.dicTypeShow === '自定义字典') {
        return callback(false);
      }
      return callback();
    };
    return {
      isNeedReloadTableField: true,
      dicAttrForm: {
        dicSortnum: '',
        name: '',
        dicTypeShow: '目录',
        dicTablename: '',
        dicPrimarykey: '',
        dicParentkey: '',
        dicState: '启用',
        dicVersion: '',
        dicNote: '',
      },
      tableFields: [],
      dicAttrRules: {
        dicSortnum: [
          { required: true, message: '序号不能为空', trigger: 'blur' },
        ],
        name: [
          { required: true, message: '名称不能为空', trigger: 'blur' },
        ],
        dicTablename: [
          { validator: validateNotBlank, trigger: 'blur', message: '表名不能为空' },
        ],
        dicPrimarykey: [
          { validator: validateNotBlank, trigger: 'blur', message: '主键不能为空' },
        ],
        dicParentkey: [
          { validator: validateNotBlank, trigger: 'blur', message: '父主键不能为空' },
        ],
        dicState: [
          { required: true, message: '状态不能为空', trigger: 'blur' },
        ],
      },
    };
  },
  methods: {
    async getDatasrcTableField(tableName) {
      const {
        code,
        msg,
        resData: {
          tableField,
        } = {},
      } = await getDatasrcTableField({
        tableName,
        srcName: '公共数据',
      }) || {};
      if (code !== 0) {
        throw new Error(msg || '获取表字段信息失败');
      }
      return tableField || [];
    },
    handleGetTableField() {
      const { dicTablename } = this.dicAttrForm;
      if (!dicTablename || !this.isNeedReloadTableField) {
        return;
      }
      this.tableFields = [];
      this.getDatasrcTableField(dicTablename).then((tableFields) => {
        this.tableFields = tableFields;
        this.isNeedReloadTableField = false;
      }).catch((err) => {
        this.$message.error(err.message || '获取表字段信息失败');
      });
    },
    cancelEdit() {
      this.resetFields();
      this.$emit('onCancel');
    },
    resetFields() {
      this.$refs.dicAttrForm.resetFields();
    },
    handleSubmit() {
      this.$refs.dicAttrForm.validate((valid) => {
        if (!valid) {
          return false;
        }
        return this.$emit('onSubmit', { ...this.dicAttrForm });
      });
    },
  },
};
</script>
