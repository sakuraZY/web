<!--
 * @Description: 附件清单管理
 * @Author: wangjiayu
 * @Date: 2020-02-25 16:43:54
 * @LastEditors: wangjiayu
 * @LastEditTime: 2020-03-09 19:26:50
 -->

<template>
  <div class="attachment-list-manage-container">
    <auth-layout>
      <template slot="paneL">
        <div class="business-tree-container">
          <empty-data v-if="!bizNodes.length"></empty-data>
          <vue-giant-tree
            v-else
            :setting="setting"
            :nodes="bizNodes"
            class="business-tree"
            @onClick="handleNodeClicked"
            @onCreated="handleTreeCreated"
          ></vue-giant-tree>
        </div>
      </template>
      <template slot="paneR">
        <div class="attachment-table-container">
          <attachment-list-table :businessType="currentBusinessType"></attachment-list-table>
        </div>
      </template>
    </auth-layout>
  </div>
</template>

<script>
import { queryByDicname } from '@/apis/sysmgr/dicItem';
import AuthLayout from '@/layouts/Impersonal/auth';
import VueGiantTree from '@/components/vueGiantTree';
import EmptyData from '@/components/emptyData';
import AttachmentListTable from './AttachmentListTable';

export default {
  name: 'AttachmentListManage',
  components: {
    AuthLayout,
    VueGiantTree,
    EmptyData,
    AttachmentListTable,
  },
  data() {
    return {
      bizNodes: [], // 树节点数据
      setting: { // 树设置参数
        data: {
          simpleData: {
            enable: true,
            pIdKey: 'pid',
          },
        },
      },
      currentNode: null, // 当前选中节点
      currentBusinessType: '', // 当前选中业务类型值
      // ztreeObj: null, // 业务树对象
    };
  },
  created() {
    this.getBisinessData();
  },
  methods: {
    // 获取业务类型
    getBisinessData() {
      const defaultErrorMsg = '获取业务申请名称失败';
      queryByDicname('业务申请名称').then(({ code, resData = {} } = {}) => {
        if (code === 0) {
          let data = [];
          const rootNode = {
            id: 'root',
            name: '业务类型',
            icon: 'type',
            iconSkin: 'business-tree-icon',
            open: true,
          };
          const { dicitemTree } = resData;
          data = dicitemTree.map((item) => {
            item.pid = rootNode.id;
            item.icon = 'list';
            item.iconSkin = 'business-tree-icon';
            return item;
          });
          data.unshift(rootNode);
          this.bizNodes = data;
        } else {
          this.$message.error(defaultErrorMsg);
        }
      }, (err) => {
        throw new Error(err);
      });
    },
    // 点击节点事件
    handleNodeClicked(evt, treeId, node) {
      const { name, itemValue } = node;
      if (!name || !itemValue) {
        return;
      }
      this.currentNode = node;
      this.currentBusinessType = itemValue;
    },
    // 树创建完成事件，记录树对象
    handleTreeCreated(ztreeObj) {
      // 默认选中第一个节点
      if (!ztreeObj) {
        return;
      }
      const nodes = ztreeObj.getNodes();
      const firstChildNode = (nodes.length && nodes[0].children
                            && nodes[0].children.length > 0) ? nodes[0].children[0] : null;
      if (!firstChildNode) {
        return;
      }
      ztreeObj.selectNode(firstChildNode);
      this.currentBusinessType = firstChildNode.itemValue;
    },
  },
};
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
