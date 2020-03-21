<!--
 * @Descripttion: v1.00
 * @version: v1.00
 * @Author: huwei
 * @Date: 2020-01-15 14:55:35
 * @LastEditors: zengying
 * @LastEditTime: 2020-02-21 11:31:23
 -->
<template>
  <mainBox>
    <!-- 主要内容 -->
    <template slot="main-content">
      <div>
        <myflow></myflow>
      </div>
    </template>
  </mainBox>
</template>

<script>
import mainBox from '@/layouts/Impersonal/mainBox';
import myflow from '@/views/Impersonal/MyFlow';

export default {
  data() {
    return {
      all: 20,
      already: 5,
      wait: 15,
      ywkey: '',
      bhkey: '',
      tableData: [{
        date: '2019-12-31   13:52:23',
        end: '2019-12-31   13:52:23',
        name: 'Geo201904040012房地一体首次登记',
        state: '审核中',
        href: '/Imp/Mortgage',
      },
      {
        date: '2019-12-31   13:52:23',
        end: '2019-12-31   13:52:23',
        name: 'Geo201904040012房地一体首次登记',
        state: '审核中',
        href: '/Imp/Mortgage',
      },
      {
        date: '2019-12-31   13:52:23',
        end: '2019-12-31   13:52:23',
        name: 'Geo201904040012房地一体首次登记',
        state: '审核中',
        href: '/Imp/Mortgage',
      }],
    };
  },
  components: {
    mainBox,
    myflow,
  },
  methods: {},
};
</script>
<style lang="scss">
@import "./index.scss";
</style>
