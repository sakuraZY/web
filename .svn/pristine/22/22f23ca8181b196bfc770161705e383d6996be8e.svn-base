<template>
  <div class="icon-page">
    <div class="icon-page-header">
      <h2>图标列表</h2>
      <el-form size="medium" label-width="80" inline>
        <el-form-item label="字号">
          <el-input-number
            v-model.lazy="fontSize"
            :min="12"
            :max="100"
            style="width: 120px"
          ></el-input-number>
        </el-form-item>
      </el-form>
    </div>
    <svg-icon-list
      :showIconName="true"
      :iconMargin="10"
      :fontSize="fontSize"
      @onSelect="handleSelect"
    ></svg-icon-list>
  </div>
</template>

<script>
import SvgIconList from '@/components/svgIconList';
import clipboard from '@/libs/clipboard';

export default {
  components: {
    SvgIconList,
  },
  data() {
    return {
      fontSize: 40,
    };
  },
  methods: {
    handleSelect(iconName, e) {
      clipboard(`<icon-svg iconClass="${iconName}" className="" />`, e);
    },
  },
};

</script>

<style lang="scss">
.icon-page{
  padding: 20px 10px;
  &-header{
    display: flex;
    justify-content: space-between;
  }
}
</style>
