<template>
  <geo-main className="layout-main">
    <template>
      <div class="login-tip" v-if="!token">
        您好，办理业务请先
        <el-link type="primary" :underline="false" href="/login">登录</el-link>
      </div>
      <el-row
        :gutter="20"
        v-for="(colList, colIndex) in coverOperateList"
        :key="colList + colIndex"
      >
        <el-col
          :sm="24 / colList.length"
          v-for="(item, index) in colList"
          :key="item+index"
          class="main-col"
        >
          <router-link :to="item.link" class="main-col-link">
            <operate-card class="operate-card">
              <template>
                <span class="operate-card-name">{{item.name}}</span>
                <icon-svg :iconClass="item.icon" class="operate-card-icon"></icon-svg>
                <div class="operate-card-descript">{{item.descript}}</div>
              </template>
            </operate-card>
          </router-link>
        </el-col>
      </el-row>
    </template>
  </geo-main>
</template>

<script>
import { mapState } from 'vuex';
import GeoMain from '@/layouts/Personal/mainContent';
import OperateCard from '@/components/operateCard';
import { transtionToDoubleArray } from '@/libs/common';

export default {
  components: {
    GeoMain,
    OperateCard,
  },
  data() {
    return {
      operateList: [
        {
          icon: 'woyaoban',
          name: '我要办',
          id: '10001',
          link: '/p/ot/wyb',
          descript: '在线办理网上预约、业务申 请等不动产相关业务',
        },
        {
          icon: 'woyaocha',
          name: '我要查',
          id: '10002',
          link: '/p/ot/wyc',
          descript: '在线查询业务进度、产权信 息、证书查验等',
        },
        {
          id: '10003',
          icon: 'woyaowen',
          name: '我要问',
          link: '/p/ot/wyw',
          descript: '对办事指南、常见问题、进 行权威解答，资料下载等',
        },
        {
          id: '10004',
          icon: 'woyaokan',
          name: '我要看',
          link: '/p/ot/wyk',
          descript: '对遗失公告、通知公告、工作 动态进行了解等',
        },
      ],
    };
  },
  computed: {
    ...mapState('user', [
      'token',
    ]),
    coverOperateList() {
      return transtionToDoubleArray(this.operateList);
    },
  },
  methods: {
    handleBussiness(item, index) {
      if (index === 0) {
        this.$router.push({ name: 'PAdvanceInstructions' });
      }
      if (index === 1) {
        this.$router.push({ name: 'PFirstHouse' });
      }
      if (index === 2) {
        this.$router.push({ name: 'PsecondHouse' });
      }
    },
    handleSubOperate(item) {
      this.$message(`你点击了${item.name}`);
    },
    gotoImpersonal() {
      this.$router.push('/login');
    },
  },
};
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
