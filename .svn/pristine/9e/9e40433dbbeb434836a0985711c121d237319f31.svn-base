<template>
  <div class="operate-type">
    <geo-banner class="operate-type-banner">
      <div class="operate-type-name">
        <span class="operate-type-name-main">{{operateType.title}}</span>
        <span class="operate-type-name-sub">{{operateType.subTitle}}</span>
      </div>
    </geo-banner>
    <div class="operate-type-main">
      <el-row
        :gutter="20"
        v-for="(colList, colIndex) in businessData"
        :key="colList + colIndex"
      >
        <el-col
          :sm="getColCount(colList, colIndex)"
          v-for="(item, index) in colList"
          :key="item+index"
          class="operate-col"
        >
          <router-link :to="item.link" class="operate-col-link">
            <operate-card
              class="operate-card"
              shadow="always"
              :class="{active: hoverId === item.id}"
              @mouseover="hoverId = item.id"
              @mouseout="hoverId = null"
            >
              <template>
                <icon-svg :iconClass="item.icon" class="operate-card-icon"></icon-svg>
                <span class="operate-card-name">{{item.title}}</span>
                <div class="operate-card-descript">{{item.subTitle}}</div>
                <el-button plain size="medium" class="operate-card-button">去办理</el-button>
              </template>
            </operate-card>
          </router-link>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import GeoBanner from '@/layouts/Personal/bannerContent';
import OperateCard from '@/components/operateCard';
import { transtionToDoubleArray } from '@/libs/common';

export default {
  props: {
    type: {
      type: String,
    },
  },
  components: {
    GeoBanner,
    OperateCard,
  },
  data() {
    return {
      hoverId: null,
      operateType: {},
      operateColCount: 4,
      operateTypeMap: {
        wyb: {
          title: '我要办',
          subTitle: '个人在线办理业务，助您少跑腿！',
          business: [
            {
              id: '1',
              icon: 'yugaodengji',
              title: '预告登记',
              subTitle: '签订购房合同后办理预告登记',
              link: '/p/advance',
            },
            {
              id: '2',
              icon: 'yuyueshenqing',
              title: '预约申请',
              subTitle: '线上预约营业网点办理时间',
              link: '/p/ysfzy',
            },
            {
              id: '3',
              icon: 'yishoufangzhuanyi',
              title: '一手房转移',
              subTitle: '核验房屋当前情况办理一手房转移登记',
              link: '/p/ysfzy',
            },
            {
              id: '4',
              icon: 'ershoufangzhuanyi',
              title: '二手房转移',
              subTitle: '买卖双方二手房转移登记',
              link: '/p/eszy',
            },
            {
              id: '5',
              icon: 'ershoufangzhuanyi',
              title: '产权证明',
              subTitle: '查验本账号中的所有产权信息',
              link: '/p/cqzm',
            },
          ],
        },
        wyc: {
          title: '我要查',
          subTitle: '个人在线办理业务，助您少跑腿！',
          business: [
            {
              id: '1',
              icon: 'jinduchaxun',
              title: '进度查询',
              subTitle: '根据受理编号查询提交办件的最新办理进度',
              link: '/p/jdcx',
            },
            {
              id: '2',
              icon: 'chanquanchaxun',
              title: '产权查询',
              subTitle: '查看电子产权证明信息',
              link: '/p/cqcx',
            },
            {
              id: '3',
              icon: 'zhengshujianyan',
              title: '证书检验',
              subTitle: '通过证书证明查验基本信息与抵押查封状态',
              link: '/p/zsjy',
            },
          ],
        },
      },
    };
  },
  computed: {
    businessData() {
      return transtionToDoubleArray(this.operateType.business);
    },
  },
  watch: {
    type: {
      handler(val) {
        if (!this.operateTypeMap[val]) {
          this.$router.push({ name: 'NotFound' });
          return;
        }
        this.operateType = this.operateTypeMap[val];
      },
      immediate: true,
    },
  },
  methods: {
    getColCount(arr, index) {
      if (index === 0) {
        this.operateColCount = 24 / arr.length;
      }
      return this.operateColCount;
    },
  },
};
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
