<!--
 * @Descripttion: v1.00
 * @version: v1.00
 * @Author: huwei
 * @Date: 2020-01-09 13:47:50
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-03-02 00:52:32
 -->
<template>
  <div class="breadcrumbs">
    <button class="btn--shrink" @click="setCollapse">
      <template v-if="!isShow">
        <icon-svg iconClass="shrink" className="breadcrumbs-icon" />
      </template>
      <template v-else>
        <icon-svg iconClass="shrink-right" className="breadcrumbs-icon" />
      </template>
    </button>
    <button class="btn-doubleLeft" @click="toStart">
      <icon-svg iconClass="doubleLeft" className="breadcrumbs-icon" />
    </button>
    <div class="menu-window" ref="topWrap">
       <ul ref="topMenu">
          <li v-for="(item,index) in historyArray" :key="index"
           :class="{'active': ind == index}" @click="breadHandle(index,item)">
            <template v-if="item.name === 'home'">
              <button class="btn-home">
                <icon-svg iconClass="home" className="breadcrumbs-icon" />
              </button>
            </template>
            <template v-else>
              <h3>{{item.name}}</h3>
              <i @click.stop="closeWindow(index)">x</i>
            </template>
          </li>
       </ul>
    </div>
    <button class="btn-doubleRight" @click="toEnd">
      <icon-svg iconClass="doubleRight" className="breadcrumbs-icon" />
    </button>
    <button class="btn-down" @mouseenter="toggleShow" @mouseleave="toggleShow">
      <icon-svg iconClass="down" class="icon-down" className="breadcrumbs-icon" />
      <ul :class="{'ulshow': isulShow}">
        <li @click="closeCurrent">关闭当前标签</li>
        <li @click="closeOthers">关闭其他标签</li>
        <li @click="refresh">刷新当前标签</li>
      </ul>
    </button>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  data() {
    return {
      isulShow: false,
      screenWidth: document.body.clientWidth,
    };
  },
  watch: {
    ind(nval, oval) {
      if (nval !== oval) {
        const paths = this.historyArray[nval].path;
        this.$router.push({ path: paths });
      }
    },
    historyArray(nval) {
      this.setInd(nval.length - 1);
    },
    screenWidth(nval, oval) {
      if (nval !== oval) {
        this.screenWidth = nval;
        this.calculation();
      }
    },
  },
  mounted() {
    // 如果刷新就跳回登录后首页
    const str = (this.historyArray[this.ind].path.split('/')[1]);
    const sarr = window.location.href.split('/');
    const hstr = sarr[sarr.length - 1];
    if (hstr !== str) {
      this.$router.push({ path: '/u' });
    }
    // 监听窗口大小
    window.onresize = () => (() => {
      this.screenWidth = document.body.clientWidth;
    })();
  },
  computed: {
    ...mapState('Impersonal', { isShow: state => state.isCollapse }),
    ...mapState('Impersonal', { historyArray: state => state.historyArray }),
    ...mapState('Impersonal', { editableTabs: state => state.editableTabs }),
    ...mapState('Impersonal', { ind: state => state.ind }),
  },
  methods: {
    breadHandle(index) {
      this.setInd(index);
    },
    ...mapMutations('Impersonal', {
      setCollapse: 'setCollapse',
    }),
    ...mapMutations('Impersonal', {
      setInd: 'setInd',
    }),
    ...mapMutations('Impersonal', {
      reduceInd: 'reduceInd',
    }),
    ...mapMutations('Impersonal', { setArray: 'setHistoryArray' }),
    ...mapMutations('Impersonal', { setdate: 'setActiveDate' }),
    toStart() {
      this.$refs.topMenu.style.left = 0;
    },
    toEnd() {
      this.calculation(1);
    },
    calculation(b) {
      const wrapWidth = this.$refs.topWrap.clientWidth;
      const list = this.$refs.topMenu.children;
      let domWidths = 0;
      list.forEach((ele) => {
        domWidths += ele.clientWidth;
        if (ele.className === 'active') {
          this.$refs.topMenu.style.left = `${wrapWidth - domWidths > 0 ? 0 : wrapWidth - domWidths}px`;
        }
      });
      // console.log(domWidths);
      const num = (wrapWidth - domWidths);
      if (num < 0) {
        if (b) {
          this.$refs.topMenu.style.left = `${num}px`;
        }
      } else {
        this.$refs.topMenu.style.left = 0;
        // this.$refs.topMenu.style.width = 'auto';
      }
    },
    toggleShow() {
      this.isulShow = !this.isulShow;
    },
    closeWindow(index) {
      if (this.ind === index) {
        this.closeCurrent();
      } else {
        this.setArray({
          hisArray: this.historyArray.filter((v, i) => i !== index),
          tabArray: this.editableTabs.filter((v, i) => i !== index),
        });
      }
    },
    closeCurrent() {
      if (this.ind !== 0) {
        this.setArray({
          hisArray: this.historyArray.filter((v, i) => i !== this.ind),
          tabArray: this.editableTabs.filter((v, i) => i !== this.ind),
        });
        this.reduceInd();
      }
    },
    closeOthers() {
      if (this.ind !== 0) {
        const home = this.historyArray[0];
        const homeTab = this.editableTabs[0];
        const arr = this.historyArray.filter((v, i) => i === this.ind);
        const harr = this.editableTabs.filter((v, i) => i === this.ind);
        arr.unshift(home);
        harr.unshift(homeTab);
        this.setArray({
          hisArray: arr,
          tabArray: harr,
        });
        this.setInd(1);
      }
    },
    refresh() {
      this.setdate(this.ind);
    },
  },
};
</script>

<style lang="scss" scoped>
@import './index.scss'
</style>
