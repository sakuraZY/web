<template>
  <geo-layout :showUserCenter="false">
    <template slot="main">
      <geo-banner>
        <template>
          <div class="login-container">
            <div class="login-card">
              <geo-login :isBoth="true" @onSuccess="loginSucessed" @onError="loginFailed" />
            </div>
            <div class="login-bg hidden-xs-only"></div>
          </div>
        </template>
      </geo-banner>
      <geo-main className="layout-main">
        <template>
          <el-row :gutter="20">
            <el-col :xs="24" :sm="16" :md="16" :lg="16" class="main-card">
              <geo-card
                title="通知公共"
                @more="handleShowMore"
                :listData="notices"
                @item-click="handleNotice"
              />
            </el-col>
            <el-col :xs="24" :sm="8" :md="8" :lg="8" class="main-card">
              <geo-card
                title="常见问题"
                headerIconL="more"
                @more="handleShowMore"
                :listData="helps"
              />
            </el-col>
          </el-row>
        </template>
      </geo-main>
    </template>
  </geo-layout>
</template>

<script>
import GeoLayout from '@/layouts/Personal';
import GeoBanner from '@/layouts/Personal/bannerContent';
import GeoMain from '@/layouts/Personal/mainContent';
import GeoLogin from '@/components/loginForm';
import GeoCard from '@/components/geoCard';

export default {
  components: {
    GeoLayout,
    GeoBanner,
    GeoMain,
    GeoLogin,
    GeoCard,
  },
  data() {
    return {
      notices: [
        { id: '10001', name: '遗失公告：编号： 安不动产登〔2018〕第188号' },
        { id: '10002', name: '周某某因保管不善，将X(2017)A区不动产权第0000342号...' },
        { id: '10003', name: '经初步审定，我机构拟对下列不动产权利予以首次登记，根...' },
        { id: '10004', name: '通知公告：国家政策' },
        { id: '10005', name: '“海洋是高质量发展战略要地。要加快建设世界一流的海洋港...' },
      ],
      helps: [
        { id: '10001', name: '什么是不动产和不动产登记？' },
        { id: '10002', name: '不动产登记与房地产登记的关系？' },
        { id: '10003', name: '哪些不动产权利可以登记？' },
        { id: '10004', name: '不动产登记有哪些类型？' },
        { id: '10005', name: '申请不动产登记时需提交哪些材料？' },
      ],
    };
  },
  methods: {
    handleShowMore() {
      this.$message('您点击了更多');
    },
    handleNotice(item, index) {
      this.$message(`您点击了第${index + 1}条公告，内容：${item.name}`);
    },
    loginSucessed(isPersonal) {
      this.$router.push({ name: isPersonal ? 'PersonHome' : 'Home' });
    },
    loginFailed(err) {
      // console.log(err.message);
    },
  },
};
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
