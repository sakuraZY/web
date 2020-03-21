<template>
  <div class="icon-content">
    <div
      v-for="(item, index) in iconList"
      :key="item + index"
      class="icon-item"
      :style="{'margin': iconMargin + 'px'}"
      @click="handleIcon(item, $event)"
    >
      <div class="icon-item-svg">
        <div class="icon-item-svg-modal"></div>
        <icon-svg
          :iconClass="item"
          className="icon"
          :style="{'font-size': fontSize + 'px'}"
        ></icon-svg>
      </div>
      <div class="icon-item-name" v-if="showIconName">{{item}}</div>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    showIconName: {
      type: Boolean,
      default: false,
    },
    fontSize: {
      type: Number,
      default: 16,
    },
    iconMargin: {
      type: Number,
      default: 5,
    },
  },
  data() {
    return {
      iconList: [],
    };
  },
  created() {
    this.getIconList();
  },
  methods: {
    getIconList() {
      const svgFiles = require.context('../../icons/svg', true, /\.svg$/);
      const svgNames = svgFiles.keys().reduce((svgs, svgPath) => {
        const svgName = svgPath.replace(/^\.\/(.*)\.\w+$/, '$1');
        return [...svgs, svgName];
      }, []);
      this.iconList = svgNames;
    },
    handleIcon(iconName, e) {
      this.$emit('onSelect', iconName, e);
    },
  },
};

</script>

<style lang="scss">
.icon-content{
  display: flex;
  flex-wrap: wrap;
  .icon-item{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    &:hover .icon{
      transform: scale(1.3);
    }
    &-name{
      padding-top: 10px;
    }
    &-svg{
      position: relative;
      .icon{
        transition: transform .3s ease;
      }
      &-modal{
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 1;
      }
    }
  }
}
</style>
