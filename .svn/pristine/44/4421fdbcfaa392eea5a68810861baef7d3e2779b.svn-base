<template>
  <el-select
    v-model="selectLabel"
    ref="reference"
    :placeholder="placeholder"
    filterable
    allow-create
    clearable
    default-first-option
    @visible-change="handleVisibleChange"
    :disabled="disabled"
    :size="size"
    @change="handleChange"
    @focus="handleFocus"
    @blur="handleBlur"
    @clear="handleClear"
  >
    <slot>

    </slot>
  </el-select>
</template>

<script>
import { valueEquals } from '@/libs/utils';

export default {
  name: 'GeoEditeSelect',
  props: {
    value: {
      require: true,
    },
    placeholder: {
      type: String,
      default: '',
    },
    size: {
      validator(val) {
        if (['medium', 'small', 'mini'].indexOf(val) > -1) {
          return true;
        }
        return false;
      },
      default: 'medium',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      selectLabel: this.value,
    };
  },
  watch: {
    value: {
      handler(val, oldVal) {
        if (val !== oldVal) {
          this.selectLabel = val;
        }
      },
      immediate: true,
    },
  },
  methods: {
    handleChange(val) {
      if (!valueEquals(val, this.value)) {
        this.$emit('input', val);
        this.$emit('change', val);
      }
    },
    handleFocus(e) {
      this.$emit('focus', e);
    },
    handleBlur(e) {
      this.$emit('blur', e);
    },
    handleClear() {
      this.$emit('clear');
    },
    handleVisibleChange(isShow) {
      if (isShow) {
        this.$nextTick(() => {
          this.$refs.reference.$refs.reference.$refs.input.value = this.$refs.reference.query;
        });
      }
      this.$emit('visible-change', isShow);
    },
  },
};
</script>
