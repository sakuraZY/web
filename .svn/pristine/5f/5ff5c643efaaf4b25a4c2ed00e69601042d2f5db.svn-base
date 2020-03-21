<template>
  <div class="org-manage-container">
    <auth-layout
      paneLeftTitle="组织管理"
      :btnList="paneLeftBtn"
      :listData="nodes"
      @handlePaneLeftBtn="handlePaneLeftBtn"
    >
      <template slot="pane-left-body">
        <div class="org-tree-contaner">
          <vue-giant-tree
            :setting="setting"
            :nodes="nodes"
            class="org-tree"
            @onClick="onHandleNode"
            @onCreated="handleCreated"
          ></vue-giant-tree>
        </div>
      </template>
      <template slot="paneR">
        <user-info v-if="showType === '职员'" :userId="currentNodeId" />
        <org-info
          v-else-if="showType === '组织'"
          :orgId="currentNodeId"
          :orgPid="orgPid"
          @onSaved="orgUpdated"
        />
        <user-manage v-else />
      </template>
    </auth-layout>
    <el-dialog
      title="添加组织"
      :visible.sync="addOrgVisible"
      append-to-body
      @close="closeAddOrgDialog"
    >
      <org-attributes
        @onSubmited="addOrgSuccessed"
        @onCancel="addOrgVisible = false"
        ref="orgAttr"
        :parentId="currentNodeId"
      >
      </org-attributes>
      <template slot="footer">
        <el-button type="primary" size="medium" @click="confirmOrgAttributes">
          <icon-svg iconClass="confirm" />
          确定
        </el-button>
        <el-button plain size="medium" @click="addOrgVisible = false">
          <icon-svg iconClass="cancel" />
          取消
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import AuthLayout from '@/layouts/Impersonal/auth';
import { getOrgTree, deleteOrg } from '@/apis/auth/org';
import VueGiantTree from '@/components/vueGiantTree';
import OrgInfo from '@/components/orgInfo';
import UserInfo from '@/components/userInfo';
import UserManage from '@/components/userManage';
import OrgAttributes from './OrgAttributes';


export default {
  name: 'OrgManage',
  components: {
    VueGiantTree,
    AuthLayout,
    OrgAttributes,
    OrgInfo,
    UserInfo,
    UserManage,
  },
  data() {
    return {
      data: [],
      currentNodeId: undefined,
      addOrgVisible: false,
      showFilter: false,
      filter: '',
      paneLeftBtn: [
        { name: '定位', icon: 'location' },
        { name: '添加', icon: 'add', hide: true },
        { name: '删除', icon: 'remove', hide: true },
      ],
      setting: {
        data: {
          simpleData: {
            enable: true,
            pIdKey: 'pId',
          },
        },
      },
      nodes: [],
      orgTree: null,
      showType: '',
      orgPid: '',
    };
  },
  created() {
    this.getOrgs();
  },
  watch: {
    filter(val) {
      this.$refs.orgTree.filter(val);
    },
  },
  methods: {
    handleCreated(orgTree) {
      // onCreated 中操作展开第一个节点
      orgTree.expandNode(orgTree.getNodes()[0], true);
      this.orgTree = orgTree;
    },
    confirmOrgAttributes() {
      this.$refs.orgAttr.handleSubmit();
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.name.indexOf(value) !== -1;
    },
    handlePaneLeftBtn(item) {
      if (item.hide) {
        return false;
      }
      switch (item.name) {
        case '定位': {
          this.showFilter = true;
          this.paneLeftBtn[0].name = '取消';
          this.$nextTick(() => {
            this.$refs.filter.$el.querySelector('input').focus();
          });
          break;
        }
        case '取消': {
          this.showFilter = false;
          this.paneLeftBtn[0].name = '定位';
          break;
        }
        case '添加': {
          this.addOrgVisible = true;
          break;
        }
        case '删除': {
          this.deleteOrg();
          break;
        }
        default: {
          break;
        }
      }
      return true;
    },
    deleteOrg() {
      if (!this.currentNodeId) {
        return;
      }
      this.$confirm('确定删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        deleteOrg(this.currentNodeId).then(({ code, msg }) => {
          if (code === 0) {
            this.$message({
              type: 'success',
              message: '删除成功',
            });
            const deleteNode = this.$refs.orgTree.getNode(this.currentNodeId);
            this.$refs.orgTree.remove(deleteNode);
          } else {
            throw new Error(msg || '删除失败');
          }
        }).catch((err) => {
          this.$message.error(err.message || '删除失败');
        });
      });
    },
    addOrgSuccessed() {
      this.addOrgVisible = false;
      this.getOrgs();
    },
    closeAddOrgDialog() {
      this.$refs.orgAttr.cancelEdit();
    },
    onHandleNode(evt, treeId, node) {
      const { type, id, pId } = node;
      this.currentNodeId = id;
      this.showType = type;
      switch (type) {
        case '组织': {
          if (id === 'root') {
            this.showType = '';
            this.paneLeftBtn[2].hide = true;
          } else {
            this.orgPid = pId;
            this.paneLeftBtn[2].hide = false;
          }
          this.paneLeftBtn[1].hide = false;
          break;
        }
        case '职员': {
          this.paneLeftBtn[1].hide = true;
          this.paneLeftBtn[2].hide = true;
          break;
        }
        default: {
          break;
        }
      }
    },
    getOrgs() {
      getOrgTree(true).then(({ code, resData: { orgTree } = {} }) => {
        if (code === 0) {
          const orgTreeData = orgTree || [];
          this.nodes = orgTreeData.map((item) => {
            item.icon = item.type === '组织' ? 'organization' : 'user2';
            item.iconSkin = `${item.status === '禁用' ? 'state-close' : 'state-open'} icon`;
            if (item.sortnum) {
              item.name = `${item.sortnum} - ${item.name}`;
            }
            return item;
          });
        }
      });
    },
    orgUpdated({ orgId, orgName }) {
      const nodes = this.orgTree.getNodesByParam('id', orgId, null);

      if (!nodes.length) {
        return;
      }
      const updateNode = nodes[0];
      updateNode.name = orgName;
      this.orgTree.updateNode(updateNode);
    },
  },
};
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
