<template>
  <div class="user-manage">
    <el-row class="user-manage-header">
      <el-col :md="12" class="margin-bottom-10">
        <el-row :gutter="10" type="flex" justify="end">
          <el-col class="title">用户管理</el-col>
          <el-col>
            <el-input size="medium" placeholder="请输入用户名/全拼/首字母查询" v-model.trim="filterVal">
              <template slot="suffix">
                <icon-svg iconClass="search" class="filter-icon"></icon-svg>
              </template>
            </el-input>
          </el-col>
        </el-row>
      </el-col>
      <el-col :md="12">
        <el-row type="flex" justify="end" class="btn-group">
          <el-button
            size="medium"
            type="primary"
            title="添加"
            @click="showUserAttr"
            class="operate-btn"
          >
            <icon-svg iconClass="add" />
            <span >添加</span>
          </el-button>
          <el-button
            size="medium"
            type="primary"
            title="启用"
            @click="changeUserState('启用')"
            class="operate-btn"
          >
            <icon-svg iconClass="power" />
            <span >启用</span>
          </el-button>
          <el-button
            size="medium"
            type="warning"
            title="禁用"
            @click="changeUserState('禁用')"
            class="operate-btn"
          >
            <icon-svg iconClass="forbidden" />
            <span >禁用</span>
          </el-button>
          <el-button
            size="medium"
            type="danger"
            title="删除"
            @click="changeUserState('删除')"
            class="operate-btn"
          >
            <icon-svg iconClass="remove" />
            <span >删除</span>
          </el-button>
        </el-row>
      </el-col>
    </el-row>
    <div class="user-manage-body">
      <div class="user-manage-body-content">
        <user-table :userList="filterUserList" v-loading="userTableLoading" ref="userTable">
        </user-table>
      </div>
    </div>
    <el-dialog
      title="添加用户"
      :visible.sync="addUserVisible"
      append-to-body
      @close="closeAddUserDialog"
    >
      <user-attributes
        @onSubmited="addUserSuccessed"
        @onCancel="addUserVisible = false"
        ref="userAttr"
      >
      </user-attributes>
      <template v-slot:footer>
        <el-button type="primary" @click="handleConfirm" size="medium">
          <icon-svg iconClass="confirm" />
          确 定
        </el-button>
        <el-button plain @click="addUserVisible = false" size="medium">
          <icon-svg iconClass="cancel" />
          取 消
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { getAllEmployee } from '@/apis/auth/employee';
import { deleteUser, switchUserState } from '@/apis/auth/user';
import { filterData } from '@/libs/common';
import UserTable from './userTable';
import UserAttributes from './userAttributes';

export default {
  data() {
    return {
      filterVal: '',
      userList: [],
      userTableLoading: true,
      addUserVisible: false,
    };
  },
  components: {
    UserTable,
    UserAttributes,
  },
  computed: {
    filterUserList() {
      if (!this.filterVal) {
        return this.userList;
      }
      return filterData(this.userList, this.filterVal, 'userName');
    },
  },
  created() {
    this.getUserList();
  },
  methods: {
    getUserList() {
      this.userTableLoading = true;
      getAllEmployee().then(({ code, msg, resData: { employees = [] } = {} }) => {
        if (code === 0) {
          this.userList = employees;
        } else {
          throw new Error(msg);
        }
        this.userTableLoading = false;
      }).catch((err) => {
        this.userTableLoading = false;
        this.$message.error(err.message);
      });
    },
    showUserAttr() {
      this.addUserVisible = true;
    },
    addUserSuccessed() {
      this.addUserVisible = false;
      this.getUserList();
    },
    closeAddUserDialog() {
      this.$refs.userAttr.cancelEdit();
    },
    changeUserState(state) {
      const selectedUser = this.selectedUser();
      // console.log(selectedUser);
      if (!selectedUser.length) {
        this.warningTip();
        return false;
      }
      let opreatePromise = null;
      if (state === '删除') {
        opreatePromise = deleteUser(selectedUser);
      } else {
        opreatePromise = switchUserState(state === '启用', selectedUser);
      }
      return opreatePromise.then(({ code, msg }) => {
        if (code === 0) {
          this.successTip(state);
          this.getUserList();
        } else {
          throw new Error(msg);
        }
      }).catch((err) => {
        this.errorTip(err.message);
      });
    },
    selectedUser() {
      return this.$refs.userTable.multipleSelection.map(item => item.userId);
    },
    warningTip() {
      this.$message({
        type: 'warning',
        message: '请先选择',
      });
    },
    successTip(type = '') {
      this.$message({
        type: 'success',
        message: `${type}成功`,
      });
    },
    errorTip(message) {
      this.$message.error(message);
    },
    handleConfirm() {
      this.$refs.userAttr.handleSubmit();
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
