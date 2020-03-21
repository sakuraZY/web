<template>
  <el-table
    :data="data"
    :height="height"
    border
    stripe
    @selection-change="handleSelectionChange"
  >
    <template slot="empty">
      <empty-data />
    </template>
    <el-table-column fixed type="selection" width="45" align="center">
    </el-table-column>
    <el-table-column type="index" width="60" align="center">
      <template slot="header">
        <span>序号</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="userName"
      label="用户名"
      min-width="120"
      align="center"
      :show-overflow-tooltip="true"
    ></el-table-column>
    <el-table-column
      prop="userAlias"
      label="昵称"
      min-width="120"
      align="center"
      :show-overflow-tooltip="true"
    ></el-table-column>
  </el-table>
</template>

<script>
import EmptyData from '@/components/emptyData';

export default {
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    height: {
      type: [Number, String],
      default: '100%',
    },
  },
  components: {
    EmptyData,
  },
  methods: {
    handleSelectionChange(val) {
      this.$emit('onSelected', val);
    },
  },
};
</script>

<style>

</style>
