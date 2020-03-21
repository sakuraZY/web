<template>
  <div>
    <template v-if="!item.children">
        <el-menu-item
          :index="item.href || item.id"
          @click.native="addTabs(item)"
        >
          <item
            :icon="item.icon"
            :title="item.title"
          />
        </el-menu-item>
    </template>

    <el-submenu
      v-else
      ref="subMenu"
      :index="item.href || item.id"
      popper-append-to-body
    >
      <template slot="title">
        <item :icon="item.icon" :title="item.title" />
      </template>
      <sidebar-item
        v-for="child in item.children"
        :key="child.id"
        :item="child"
        class="nest-menu"
      />
    </el-submenu>
  </div>
</template>

<script>
import Tabs from '@/mixins/tabs';
import Item from './item';
import FixiOSBug from './mixin/fixiOSBug';

export default {
  name: 'SidebarItem',
  components: { Item },
  mixins: [FixiOSBug, Tabs],
  props: {
    item: {
      type: Object,
      required: true,
    },
    isNest: {
      type: Boolean,
      default: false,
    },
  },
  // computed: {
  //   ...mapState('app', [
  //     'activeCenter',
  //   ]),
  // },
  // methods: {
  //   ...mapActions('tabsView', ['addView']),
  //   addTabs(tab) {
  //     const { href } = tab;
  //     if (href) {
  //       this.addView({ tab, centerId: this.activeCenter.centerId });
  //     }
  //   },
  // },
};
</script>
