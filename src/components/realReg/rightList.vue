<template>
    <div class="flex-side">
        <scrollTabs :list="list" :indexs='i'></scrollTabs>
    </div>
</template>
<script>
import scrollTabs from '@/components/scrollTabs';

export default {
  data() {
    return {
      // list: ['不动产数据检验', '抵押人信息', '抵押权人信息', '不动产权信息', '第三方债务人信息', '抵押信息'],
      i: 0,
      H: 0,
    };
  },
  props: ['list'],
  components: {
    scrollTabs,
  },
  methods: {
    siderHandle(index) {
      this.i = index;
    },
  },
};
</script>

<style lang="scss" scoped>
 @import './index.scss'
</style>
