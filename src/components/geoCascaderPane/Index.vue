<template>
  <div class="geo-cascader" :options="options">
    <slot name="empty" v-if="!options.length">
      <empty-data></empty-data>
    </slot>
    <div class="geo-cascader-container" v-else>
      <div class="geo-cascader-header">
        <div v-if="!selectedNodes.length" class="placehoder">请选择</div>
        <div class="geo-cascader-menu" v-else>
          <div
            class="geo-cascader-menu-item"
            v-for="(item, index) in selectedNodes"
            :key="item + index"
            @click="changeSelected(index, item)"
          >
            <span class="item-name" :class="{ pointer: !!item.children }">{{item.label}}</span>
            <span class="item-divider" v-if="item.children">
              <icon-svg iconClass="right"></icon-svg>
            </span>
          </div>
        </div>
      </div>
      <div class="geo-cascader-body">
        <div
          class="node-name"
          v-for="(item, index) in nodes"
          :key="item + index"
          :class="{'is-active': item.value === currentNode.value}"
          @click="handleSelect(item)"
        >
          {{item.label}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EmptyData from '@/components/emptyData';

export default {
  props: {
    options: {
      type: Array,
      default: () => ([]),
    },
  },
  components: {
    EmptyData,
  },
  data() {
    return {
      selectedNodes: [],
      currentNode: {},
      nodes: [...this.options],
    };
  },
  watch: {
    options(val) {
      this.nodes = val;
      this.selectedNodes = [];
      this.currentNode = {};
    },
  },
  methods: {
    handleSelect(item) {
      this.currentNode = item;
      const { selectedNodes } = this;
      if (!selectedNodes.length || selectedNodes[selectedNodes.length - 1].children) {
        selectedNodes.push(item);
      } else {
        selectedNodes[selectedNodes.length - 1] = item;
      }
      if (item.children) {
        this.nodes = item.children;
      } else {
        this.$emit('onChange', selectedNodes);
      }
    },
    changeSelected(index, item) {
      if (index === this.selectedNodes.length - 1) {
        return;
      }
      this.currentNode = item;
      this.nodes = item.children;
      this.selectedNodes = this.selectedNodes.slice(0, index + 1);
    },
  },
};
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
