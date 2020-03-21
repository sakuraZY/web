<template>
  <div class="org-info" v-loading="loading">
    <div class="org-info-floor">
      <div class="org-info-floor-header">
        <div class="org-info-floor-header-left">
          组织属性信息
        </div>
      </div>
      <el-form
        class="org-info-floor-body"
        ref="form"
        :model="orgInfoForm"
        label-width="80px"
        size="medium"
        :rules="orgInfoRules"
      >
        <el-row :gutter="20">
          <el-col :sm="12">
            <el-form-item label="名称" prop="orgName">
              <el-input v-model="orgInfoForm.orgName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="12">
            <el-form-item label="全名" prop="orgFullname">
              <el-input v-model="orgInfoForm.orgFullname"></el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="12">
            <el-form-item label="区域代码" prop="orgPopedom">
              <el-input v-model="orgInfoForm.orgPopedom"></el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="12">
            <el-form-item label="分类" prop="orgType">
              <el-select v-model="orgInfoForm.orgType" clearable style="width: 100%">
                <el-option
                  v-for="item in orgTypeOptions"
                  :key="item.value"
                  :label="item.value"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :sm="12">
            <el-form-item label="状态" prop="orgState">
              <el-select v-model="orgInfoForm.orgState" style="width: 100%">
                <el-option
                  v-for="item in orgStateOptions"
                  :key="item.value"
                  :label="item.value"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :sm="12">
            <el-form-item label="负责人" prop="orgLeader">
              <el-tooltip content="从下方从属职员中选择" placement="bottom">
                <input v-model="orgInfoForm.orgLeader" type="hidden" />
                <el-input :value="orgLeaderName" disabled></el-input>
              </el-tooltip>
            </el-form-item>
          </el-col>
          <el-col :sm="12">
            <el-form-item label="排序序号" prop="orgSortnum">
              <el-input v-model.number="orgInfoForm.orgSortnum"></el-input>
            </el-form-item>
          </el-col>
          <el-col :sm="12">
            <el-form-item label="描述" prop="orgNote">
              <el-input type="textarea" autosize v-model="orgInfoForm.orgNote"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <div class="btn-group">
          <el-button type="primary" size="medium" @click="handleUpdateOrg">
            <icon-svg iconClass="save" />
            保存
          </el-button>
        </div>
      </el-form>
    </div>
    <div class="org-info-floor">
      <div class="org-info-floor-header">
        <div class="org-info-floor-header-left">
          从属岗位
        </div>
        <div class="org-info-floor-header-right">
          <el-button type="primary" size="medium" @click="opareatePost('handleShowDiolog')">
            <icon-svg iconClass="add" />
            新增
          </el-button>
          <el-button type="danger" size="medium" @click="opareatePost('deletePost')">
            <icon-svg iconClass="remove" />
            删除
          </el-button>
        </div>
      </div>
      <div class="org-info-floor-body">
        <post-info :orgId="orgId" ref="postInfo"></post-info>
      </div>
    </div>
    <div class="org-info-floor">
      <div class="org-info-floor-header">
        <div class="org-info-floor-header-left">
          从属职员(点击勾选组织负责人)
        </div>
        <div class="org-info-floor-header-right">
          <el-button type="primary" size="medium" @click="opareateUser('selectEmployees')">
            <icon-svg iconClass="add" />
            添加
          </el-button>
          <el-button type="danger" size="medium" @click="opareateUser('deleteEmployee')">
            <icon-svg iconClass="remove" />
            删除
          </el-button>
        </div>
      </div>
      <div class="org-info-floor-body">
        <user-of-org
          :orgId="orgId"
          ref="userOfOrg"
          @onChangeLeader="onChangeLeader"
          :orgLeader="orgInfoForm.orgLeader"
        ></user-of-org>
      </div>
    </div>
  </div>
</template>

<script>
import { getOrgById, updateOrg } from '@/apis/auth/org';
import PostInfo from './postInfo';
import UserOfOrg from './userOfOrg';

export default {
  props: {
    orgId: {
      type: String,
      required: true,
    },
    orgPid: {
      type: String,
      required: true,
    },
  },
  components: {
    PostInfo,
    UserOfOrg,
  },
  data() {
    return {
      loading: false,
      orgLeaderName: '',
      orgTypeOptions: [
        { value: '内部机构' },
        { value: '行政单位' },
        { value: '企业单位' },
        { value: '其他组织' },
      ],
      orgStateOptions: [
        { value: '启用' },
        { value: '禁用' },
      ],
      orgInfoForm: {
        orgName: '',
        orgFullname: '',
        orgPopedom: '',
        orgType: '',
        orgState: '',
        orgLeader: '',
        orgSortnum: null,
        orgNote: '',
      },
      orgInfoRules: {
        orgName: [
          { required: true, message: '名称不能为空', trigger: 'blur' },
        ],
      },
    };
  },
  created() {
    this.getOrgInfo();
  },
  watch: {
    orgId: {
      handler(val, oldVal) {
        if (val === oldVal) {
          return;
        }
        this.getOrgInfo();
      },
    },
  },
  methods: {
    getOrgInfo() {
      this.loading = true;
      getOrgById(this.orgId).then(({ code, msg, resData: { org = {} } = {} }) => {
        if (code === 0) {
          this.orgInfoForm = { ...this.orgInfoForm, ...org };
        } else {
          throw new Error(msg || '获取组织信息失败');
        }
        this.loading = false;
      }).catch((err) => {
        this.loading = false;
        this.$message.error(err.message);
      });
    },
    handleUpdateOrg() {
      updateOrg(this.orgPid, { ...this.orgInfoForm, orgId: this.orgId })
        .then(({ code, msg } = {}) => {
          if (code === 0) {
            this.$message({
              type: 'success',
              message: '保存成功',
            });
            this.$emit('onSaved', { ...this.orgInfoForm, orgId: this.orgId });
          } else {
            throw new Error(msg);
          }
        }).catch((err) => {
          this.$message.error(err.message);
        });
    },
    opareatePost(type) {
      this.$refs.postInfo[type]();
    },
    opareateUser(type) {
      this.$refs.userOfOrg[type]();
    },
    onChangeLeader({ userName = '', userId = '' } = {}) {
      this.orgLeaderName = userName;
      this.orgInfoForm.orgLeader = userId;
    },
  },
};
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
