<template>
  <div class="user-table-container">
    <div class="user-table-content">
      <div class="user-table-content-view">
        <div class="user-table-content-view-main">
          <el-table
            :data="currentUserList"
            height="100%"
            border
            @selection-change="handleSelectionChange"
          >
            <template slot="empty">
              <empty-data />
            </template>
            <el-table-column fixed label="序号" type="selection" width="45" align="center">
            </el-table-column>
            <el-table-column prop="numbers" width="60" align="center">
              <template slot="header">
                <span>序号</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="userName"
              label="姓名"
              align="center"
              :show-overflow-tooltip="true"
            >
            </el-table-column>
            <el-table-column
              prop="userAlias"
               label="昵称" align="center" :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column
              prop="empNo" lab
              el="职工号"
              align="center"
              :show-overflow-tooltip="true"
            >
            </el-table-column>
            <el-table-column
              prop="empMobile"
              label="手机"
              align="center"
              :show-overflow-tooltip="true"
            >
            </el-table-column>
            <el-table-column
              prop="userState"
               label="状态" align="center" :show-overflow-tooltip="true">
            </el-table-column>
            <el-table-column fixed="right" label="操作" align="center" width="100" v-if="canEdit">
              <template v-slot="scope">
                <el-button @click="handleShowUserInfo(scope.row)" type="warning" size="mini">
                  修改
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <el-pagination
        background
        layout="prev, pager, next"
        :page-size="pageSize"
        :pager-count="5"
        :total="userList.length"
        @current-change="currentChange"
      >
      </el-pagination>
    </div>
    <el-dialog
      title="用户信息"
      :visible.sync="userInfoVisible"
      append-to-body
    >
      <user-info :userId="userId"></user-info>
    </el-dialog>
  </div>
</template>

<script>
import EmptyData from '@/components/emptyData';
import UserInfo from '@/components/userInfo';

export default {
  props: {
    userList: {
      type: Array,
      default: () => [],
    },
    canEdit: {
      type: Boolean,
      default: true,
    },
  },
  components: {
    EmptyData,
    UserInfo,
  },
  data() {
    return {
      userInfoVisible: false,
      userId: '',
      pageSize: 20,
      pageNo: 1,
      multipleSelection: [],
    };
  },
  computed: {
    currentUserList() {
      const skip = this.pageSize * (this.pageNo - 1);
      const userList = this.userList.slice(skip, skip + this.pageSize);
      return userList.map((item, index) => ({
        ...item,
        numbers: (this.pageNo - 1) * this.pageSize + index + 1,
      }));
    },
  },
  methods: {
    currentChange(currentPage) {
      if (currentPage !== this.pageNo) {
        this.pageNo = currentPage;
      }
    },
    handleShowUserInfo(data) {
      this.userInfoVisible = true;
      this.userId = data.userId;
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
