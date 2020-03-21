<template>
  <vue-giant-tree :nodes="nodes" :setting="setting" v-on="$listeners" />
</template>

<script>
import VueGiantTree from '@/plugins/vue-giant-tree';

export default {
  props: {
    nodes: {
      type: Array,
      default: () => ([]),
    },
    setting: {
      type: Object,
      default: () => ({}),
    },
  },
  components: {
    VueGiantTree,
  },
};
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>>
