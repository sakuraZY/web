<template>
  <el-form
    :model="dicitemAttrForm"
    :rules="dicitemAttrRules"
    size="medium"
    label-width="100px"
    class="dicitem-attr"
    ref="dicitemAttrForm"
  >
    <el-form-item
      v-for="(item, index) in formItemAttrs"
      :key="item+index"
      :label="item.title"
      :prop="item.field"
      :rules="item.rules"
    >
      <el-input
        v-model="dicitemAttrForm[item.field]"
        clearable
      >
        <template v-slot:prepend v-if="item.showValType">
          <el-select
            v-model="valueType"
            class="input-with-select"
            style="width: 80px"
            size="medium"
          >
            <el-option label="文本" value="文本"></el-option>
            <el-option label="颜色" value="颜色"></el-option>
          </el-select>
        </template>
        <template
          v-slot:append v-if="item.showValType && valueType === '颜色'"
        >
          <el-color-picker
            v-model="dicitemAttrForm[item.field]"
            size="mini"
          >
          </el-color-picker>
        </template>
      </el-input>
    </el-form-item>
  </el-form>
</template>

<script>

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
    formItems: {
      type: Array,
      default: () => ([]),
    },
    show: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    show: {
      handler(val) {
        this.initFormData();
        if (!val || this.isAdd) {
          return;
        }
        const data = {};
        Object.keys(this.dicitemAttrForm).forEach((key) => {
          data[key] = this.data[key] || '';
        });
        this.valueType = data.itemNote === '颜色' ? '颜色' : '文本';
        this.dicitemAttrForm = data;
      },
      immediate: true,
    },
  },
  data() {
    return {
      formItemAttrs: [],
      dicitemAttrForm: {
      },
      dicitemAttrRules: {
      },
      valueType: '文本',
    };
  },
  methods: {
    initFormData() {
      const attrs = [];
      const domains = {};
      this.formItems.forEach((item) => {
        if (typeof item.visible === 'boolean' && !item.visible) {
          return;
        }
        attrs.push(item);
        domains[item.field] = '';
      });
      this.formItemAttrs = attrs;
      this.dicitemAttrForm = domains;
    },
    cancelEdit() {
      this.resetFields();
      this.$emit('onCancel');
    },
    resetFields() {
      this.valueType = '文本';
      this.$refs.dicitemAttrForm.resetFields();
    },
    handleSubmit() {
      this.$refs.dicitemAttrForm.validate((valid) => {
        if (!valid) {
          return false;
        }
        return this.$emit('onSubmit', { ...this.dicitemAttrForm });
      });
    },
  },
};
</script>
