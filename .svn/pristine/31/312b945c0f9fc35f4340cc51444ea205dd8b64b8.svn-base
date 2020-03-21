<template>
  <el-popover
    placement="bottom-start"
    trigger="click"
    v-model="visibleLocation"
    @show="getLocationSelect"
  >
    <geo-cascader-pane
      :options="options"
      @onChange="onChangeLocation"
    ></geo-cascader-pane>
    <div class="zone-select" slot="reference">
      <icon-svg iconClass="location_pie" class="icon-loaction"></icon-svg>
      <span class="selected-zone" :class="{empty: !area}">
        {{area || '请选择'}}
      </span>
      <span class="arrow-down"></span>
    </div>
  </el-popover>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import GeoCascaderPane from '@/components/geoCascaderPane';
import { queryAreaName } from '@/apis/nres/grzx';

export default {
  components: {
    GeoCascaderPane,
  },
  data() {
    return {
      visibleLocation: false,
      options: [],
    };
  },
  computed: {
    ...mapState('app', ['area']),
  },
  methods: {
    ...mapActions('app', ['setArea']),
    getLocationSelect() {
      queryAreaName().then(({
        code,
        msg,
        resData,
      }) => {
        if (code !== 0) {
          throw new Error(msg || '获取区域信息失败');
        }
        const areaNames = resData || [];
        this.options = areaNames.map(name => ({ label: name, value: name }));
      });
    },
    onChangeLocation(nodes) {
      this.zone = nodes[nodes.length - 1].label;
      this.visibleLocation = false;
      this.setArea(this.zone);
    },
  },
};
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
