<template>
  <geo-layout :showUserCenter="false" :showSearch="false" :showWeChat="false">
    <template slot="main">
      <geo-banner class="layout-banner">
        <template>
          <div class="login-container">
            <div class="login-bg hidden-xs-only"></div>
            <div class="login-card">
              <geo-login :isBoth="true" @onSuccess="loginSucessed" @onError="loginFailed" />
            </div>
          </div>
        </template>
        <template slot="banner-bg">
          <div class="layout-banner-bg">
          </div>
        </template>
      </geo-banner>
    </template>
  </geo-layout>
</template>

<script>
import GeoLayout from '@/layouts/Personal';
import GeoBanner from '@/layouts/Personal/bannerContent';
import GeoLogin from '@/components/loginForm';

export default {
  components: {
    GeoLayout,
    GeoBanner,
    GeoLogin,
  },
  data() {
    return {
      redirect: undefined,
      otherQuery: {},
    };
  },
  watch: {
    $route: {
      handler(route) {
        const { query } = route;
        if (query) {
          this.redirect = query.redirect;
          this.otherQuery = this.getOtherQuery(query);
        }
      },
      immediate: true,
    },
  },
  methods: {
    loginSucessed(isPersonal) {
      this.$router.push({ path: this.redirect || (isPersonal ? '/p' : '/'), query: this.otherQuery });
    },
    // loginFailed(err) {
    loginFailed() {
      // console.log(err.message);
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur];
        }
        return acc;
      }, {});
    },
  },
};
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
