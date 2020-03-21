<template>
  <div class="user-connect-tranfer">
    <div class="user-connect-tranfer-left">
      <el-input
        placeholder="输入用户名/全拼/首字母查询"
        v-model.lazy="filterVal"
        clearable
      ></el-input>
      <div class="user-select-container">
        <div class="user-select-container-body">
          <user-info-table
            :data="waitConnectUserList"
            @onSelected="onSelectedWaitConnectedUser"
          ></user-info-table>
        </div>
      </div>
    </div>
    <div class="user-connect-tranfer-medium">
      <div class="tranfer-btn-container">
        <el-button
          type="primary"
          circle
          :disabled="disableTranferRight"
          size="medium"
          @click="operateUserOfRole('bind')"
        >
          <icon-svg iconClass="doubleRight" className="tranfer-btn-icon"></icon-svg>
        </el-button>
      </div>
      <div class="tranfer-btn-container">
        <el-button
          type="primary"
          circle
          :disabled="disableTranferLeft"
          size="medium"
          @click="operateUserOfRole('remove')"
        >
          <icon-svg iconClass="doubleLeft" className="tranfer-btn-icon"></icon-svg>
        </el-button>
      </div>
    </div>
    <div class="user-connect-tranfer-right">
      <div class="title">已挂接用户</div>
      <div class="user-select-container">
        <div class="user-select-container-body">
          <user-info-table
            :data="connectedUserList"
            @onSelected="onSelectedConnectedUser"
          ></user-info-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getAllEmployee } from '@/apis/auth/employee';
import { getUserByRoleId, batchBindUserOfRole, batchRemoveUserOfRole } from '@/apis/auth/role';
import { filterData } from '@/libs/common';
import UserInfoTable from './UserInfoTable';

export default {
  props: {
    roleId: {
      type: String,
      required: true,
    },
    isRole: {
      type: Boolean,
      default: false,
    },
    roleState: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      disableTranferLeft: true,
      disableTranferRight: true,
      filterVal: '',
      userList: [],
      connectedUserList: [],
      selectedWaitConnectUser: [],
      selectedConnectedUser: [],
    };
  },
  components: {
    UserInfoTable,
  },
  watch: {
    selectedWaitConnectUser(users) {
      if (!this.isRole || !this.roleState) {
        return;
      }
      if (users.length > 0) {
        this.disableTranferRight = false;
        return;
      }
      this.disableTranferRight = true;
    },
    selectedConnectedUser(users) {
      if (!this.isRole || !this.roleState) {
        return;
      }
      if (users.length > 0) {
        this.disableTranferLeft = false;
        return;
      }
      this.disableTranferLeft = true;
    },
    roleId: {
      handler(val, oldVal) {
        if (val === oldVal) {
          return;
        }
        this.filterVal = '';
        this.disableTranferLeft = true;
        this.disableTranferRight = true;
        if (!this.isRole) {
          this.connectedUserList = [];
          return;
        }
        this.getConnectedUser();
      },
      immediate: true,
    },
  },
  created() {
    this.getUserList();
  },
  computed: {
    waitConnectUserList() {
      const hanConnectedUserIds = this.connectedUserList.map(item => item.userId);
      const canSelectUsers = this.userList
        .filter(item => !hanConnectedUserIds.includes(item.userId));
      if (!this.filterVal) {
        return canSelectUsers;
      }
      return filterData(canSelectUsers, this.filterVal, 'userName');
    },
  },
  methods: {
    getUserList() {
      getAllEmployee('启用').then(({ code, msg, resData: { employees = [] } = {} }) => {
        if (code === 0) {
          this.userList = employees;
        } else {
          throw new Error(msg);
        }
      }).catch((err) => {
        this.$message.error(err.message);
      });
    },
    getConnectedUser() {
      getUserByRoleId(this.roleId).then(({
        code,
        msg,
        resData: {
          userInfo,
        },
      } = {}) => {
        if (code === 0) {
          this.connectedUserList = userInfo || [];
        } else {
          throw new Error(msg);
        }
      }).catch((err) => {
        this.$message.error(err.message);
      });
    },
    onSelectedWaitConnectedUser(val) {
      this.selectedWaitConnectUser = val;
    },
    onSelectedConnectedUser(val) {
      this.selectedConnectedUser = val;
    },
    operateUserOfRole(type) {
      if (!['bind', 'remove'].includes(type)) {
        return;
      }
      const operateMap = {
        bind: batchBindUserOfRole,
        remove: batchRemoveUserOfRole,
      };
      if (type === 'bind' && this.disableTranferRight) {
        return;
      }
      if (type === 'remove' && this.disableTranferLeft) {
        return;
      }
      // let userIds = type === 'bind'
      //   ? this.selectedWaitConnectUser.map(item => item.userId)
      //   : this.selectedConnectedUser.map(item => item.userId);
      const userIds = this[type === 'bind' ? 'selectedWaitConnectUser' : 'selectedConnectedUser'].map(item => item.userId);
      operateMap[type](this.roleId, userIds).then(({
        code,
        msg,
      }) => {
        if (code !== 0) {
          throw new Error(msg || `${type === 'bind' ? '绑定' : '移除'}失败`);
        }
        this.$message({
          type: 'success',
          message: msg || `${type === 'bind' ? '绑定' : '移除'}成功`,
        });
        if (type === 'bind') {
          this.connectedUserList = [...this.connectedUserList, ...this.selectedWaitConnectUser];
          this.selectedWaitConnectUser = [];
        } else {
          this.connectedUserList = this.connectedUserList
            .filter(item => !userIds.includes(item.userId));
          this.selectedConnectedUser = [];
        }
      }).catch((err) => {
        this.$message.error(err.message);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
