<template>
  <div class="post-info-container">
    <el-table
      :data="usersOfOrg"
      border
      size="medium"
      stripe
      style="width: 100%"
      @selection-change="handleSelectionChange"
      v-loading="userTableLoading"
      height="220"
    >
      <template slot="empty">
        <empty-data />
      </template>
      <el-table-column
        fixed
        type="selection"
        width="45"
        align="center"
      >
      </el-table-column>
      <el-table-column
        type="index"
        width="60"
        align="center"
      >
        <template slot="header">
          <span>序号</span>
        </template>
      </el-table-column>
      <el-table-column
        type="index"
        width="70"
        align="center"
      >
        <template slot="header">
          <span>负责人</span>
        </template>
        <template v-slot="{ row }">
          <el-radio
            :value="leader"
            @change="changeOrgLeader(row)"
            :label="row.userId"
          ><span></span></el-radio>
        </template>
      </el-table-column>
      <el-table-column
        prop="userName"
        label="姓名"
        align="center"
        width="100"
        :show-overflow-tooltip="true"
      >
      </el-table-column>
      <el-table-column
        prop="userAlias"
        label="别名"
        align="center"
        width="100"
        :show-overflow-tooltip="true"
      >
      </el-table-column>
      <el-table-column
        prop="userSortnum"
        label="排序序号"
        align="center"
        :show-overflow-tooltip="true"
      >
      </el-table-column>
      <el-table-column
        prop="empNo"
        label="职工号"
        align="center"
        :show-overflow-tooltip="true"
      >
      </el-table-column>
      <el-table-column
        prop="empMobile"
        label="手机号"
        align="center"
        :show-overflow-tooltip="true"
      >
      </el-table-column>
    </el-table>
    <el-dialog
      title="选择从属职员"
      :visible.sync="userOfOrgVisible"
      append-to-body
      @close="closeSelectEmployeeDialog"
    >
      <el-input size="medium" v-model.trim="search" placeholder="请输入用户名/全拼/首字母查询"></el-input>
      <user-table
        :userList="getCanSelectUser"
        :canEdit="false"
        ref="userTable"
        style="height: 220px"
      >
      </user-table>
      <template v-slot:footer>
        <el-button type="primary" size="medium" @click="submitEmployees">
          <icon-svg iconClass="confirm" />
          确定
        </el-button>
        <el-button plain size="medium" @click="closeSelectEmployeeDialog">
          <icon-svg iconClass="cancel" />
          取消
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import EmptyData from '@/components/emptyData';
import UserTable from '@/components/userManage/userTable';
import { batchBindUser, batchRemoveUser } from '@/apis/auth/org';
import { getEmployeeByOrgId, getAllEmployee } from '@/apis/auth/employee';
import { filterData } from '@/libs/common';

export default {
  props: {
    orgId: {
      type: String,
      required: true,
    },
    orgLeader: {
      type: String,
      default: '',
    },
  },
  components: {
    EmptyData,
    UserTable,
  },
  data() {
    return {
      usersOfOrg: [],
      userOfOrgVisible: false,
      multipleSelected: [],
      userList: [],
      search: '',
      hasLoadAllAvailableUser: false,
    };
  },
  created() {
    this.init();
  },
  computed: {
    leader() {
      this.emitLeader(this.orgLeader);
      return this.orgLeader;
    },
    getCanSelectUser() {
      const hanExitUserIds = this.usersOfOrg.map(item => item.userId);
      const canSelectUsers = this.userList
        .filter(item => !hanExitUserIds.includes(item.userId));
      if (!this.search) {
        return canSelectUsers;
      }
      return filterData(canSelectUsers, this.search, 'userName');
    },
  },
  watch: {
    orgId: {
      handler(val, oldVal) {
        if (val === oldVal) {
          return;
        }
        this.init();
      },
    },
  },
  methods: {
    init() {
      this.getUsersOfOrg();
    },
    getUsersOfOrg() {
      this.userTableLoading = true;
      getEmployeeByOrgId(this.orgId).then(({ code, msg, resData: { employees } = {} }) => {
        if (code === 0) {
          this.usersOfOrg = employees || [];
        } else {
          throw new Error(msg || '获取从属职员失败');
        }
        this.userTableLoading = false;
      }).catch((err) => {
        this.$message.error(err.message);
        this.userTableLoading = false;
      });
    },
    getAllAvailableUser() {
      this.hasLoadAllAvailableUser = true;
      getAllEmployee('启用').then(({ code, msg, resData: { employees } = {} }) => {
        if (code === 0) {
          this.hasLoadAllAvailableUser = true;
          this.userList = employees || [];
        } else {
          throw new Error(msg);
        }
      }).catch((err) => {
        this.hasLoadAllAvailableUser = false;
        this.$message.error(err.message);
      });
    },
    handleSelectionChange(val) {
      this.multipleSelected = val;
    },
    selectEmployees() {
      this.userOfOrgVisible = true;
      this.getAllAvailableUser();
    },
    closeSelectEmployeeDialog() {
      this.search = '';
      this.userOfOrgVisible = false;
    },
    changeOrgLeader(data) {
      this.$emit('onChangeLeader', data);
    },
    submitEmployees() {
      const selectEmployees = this.$refs.userTable.multipleSelection;
      if (!selectEmployees.length) {
        this.closeSelectEmployeeDialog();
        this.$message({
          type: 'warning',
          message: '您没有选择任何职员',
        });
        return;
      }
      const options = {
        userIds: selectEmployees.map(item => item.userId),
        relParentnode: this.orgId,
      };
      batchBindUser(options).then(({ code, msg }) => {
        if (code === 0) {
          this.usersOfOrg = [...this.usersOfOrg, ...selectEmployees];
          this.$message({
            type: 'success',
            message: '添加从属职员成功',
          });
          this.closeSelectEmployeeDialog();
        } else {
          throw new Error(msg || '添加从属职员失败');
        }
      }).catch((err) => {
        this.$message.error(err.message);
      });
    },
    emitLeader(leaderId) {
      const orgLeader = this.usersOfOrg.filter(item => item.userId === leaderId)[0];
      this.changeOrgLeader(orgLeader);
    },
    deleteEmployee() {
      const seletedData = this.multipleSelected;
      if (!seletedData.length) {
        return this.$message({
          type: 'warning',
          message: '请选择需要删除的职员',
        });
      }
      return this.$confirm('确定删除吗?', '提示', { type: 'warning' }).then(() => {
        const options = {
          userIds: seletedData.map(item => item.userId),
          orgId: this.orgId,
        };
        batchRemoveUser(options).then(({ code, msg }) => {
          if (code === 0) {
            this.$message({
              type: 'success',
              message: '删除成功',
            });
            this.usersOfOrg = this.usersOfOrg
              .filter(item => !options.userIds.includes(item.userId));
          } else {
            throw new Error(msg || '删除失败');
          }
        }).catch((err) => {
          this.$message.error(err.message);
        });
      });
    },
  },
};
</script>
