/*
* @File: 新增标签页
* @Author: qiwei
* @Date: 2020-03-16 11:51:12
 * @Last Modified by: qiwei
 * @Last Modified time: 2020-03-18 16:08:35
*/

import { mapState, mapActions } from 'vuex';

export default {
  computed: {
    ...mapState('app', ['activeCenter']),
    ...mapState('tabsView', [
      'affixTabs',
      'centerViews',
      'defaultCenterId',
    ]),
    centerId() {
      return this.activeCenter && this.activeCenter.centerId
        ? this.activeCenter.centerId
        : this.defaultCenterId;
    },
  },
  methods: {
    ...mapActions('tabsView', [
      'addView',
      'delView',
      'delOthersViews',
      'delAllViews',
      'delCachedView',
    ]),
    addTabs(tab) {
      const { href } = tab;
      if (href) {
        this.addView({ tab, centerId: this.activeCenter.centerId }).then(() => {
          this.$router.push(href);
        });
      }
    },
    refreshSelectedTab() {
      const { name, fullPath } = this.$route;
      if (!name) {
        return;
      }
      this.delCachedView(name).then(() => {
        this.$nextTick(() => {
          this.$router.push({
            path: `/redirect${fullPath}`,
          });
        });
      });
    },
    closeSelectedTab(tab) {
      const currentTab = tab || this.getCurrentTab();
      this.delView({ tab: currentTab, centerId: this.centerId }).then(({ visitedViews }) => {
        if (this.isActiveTab(currentTab)) {
          this.toLastView(visitedViews);
        }
      });
    },
    closeOthersTabs() {
      const tab = this.getCurrentTab();
      this.$router.push(tab);
      this.delOthersViews({ tab, centerId: this.centerId }).then(() => {
        this.moveToCurrentTab();
      });
    },
    closeAllTabs() {
      const tab = this.getCurrentTab();
      this.delAllViews(this.centerId).then(({ visitedViews }) => {
        if (this.affixTabs.some(affixTab => affixTab.href === tab.href)) {
          return;
        }
        this.toLastView(visitedViews);
      });
    },
    isActiveTab(tab) {
      return tab.href === this.$route.path;
    },
    getCurrentTab() {
      const visitedViews = (this.centerViews[this.centerId]
        && this.centerViews[this.centerId].visitedViews) || [];
      for (let i = 0; i < visitedViews.length; i += 1) {
        const tab = visitedViews[i];
        if (tab.href === this.$route.path) {
          return tab;
        }
      }
      const { path: href, name, meta: { title, icon } = {} } = this.$route;
      return {
        href, name, title, icon,
      };
    },
    toLastView(visitedViews) {
      const latestView = visitedViews.slice(-1)[0];
      if (latestView) {
        this.$router.push(latestView.href);
      } else {
        this.$router.push('/');
      }
    },
  },
};