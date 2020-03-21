<template>
  <div class="user-info" v-loading="loading">
    <el-form
      :model="userInfoForm"
      :rules="userRules"
      ref="userInfoForm"
      label-width="80px"
      class="user-info-form"
    >
      <el-row>
        <el-col :md="12">
          <el-form-item label="姓名" prop="userName">
            <el-input v-model.trim="userInfoForm.userName" size="medium"></el-input>
          </el-form-item>
        </el-col>
        <el-col :md="12">
          <el-form-item label="昵称" prop="userAlias">
            <el-input v-model.trim="userInfoForm.userAlias" size="medium"></el-input>
          </el-form-item>
        </el-col>
        <el-col :md="12">
          <el-form-item label="所属组织" prop="name">
            <el-input :value="userOfOrgs" size="medium" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :md="12">
          <el-form-item label="所属角色" prop="name">
            <el-input :value="userOfRoles" size="medium" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :md="12">
          <el-form-item label="工号" prop="empNo">
            <el-input v-model.trim="userInfoForm.empNo" size="medium"></el-input>
          </el-form-item>
        </el-col>
        <el-col :md="12">
          <el-form-item label="序号" prop="userSortnum">
            <el-input type='number' v-model.trim="userInfoForm.userSortnum" size="medium">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :md="12">
          <el-form-item label="区域权限" prop="userPopedom">
            <el-input v-model.trim="userInfoForm.userPopedom" size="medium"></el-input>
          </el-form-item>
        </el-col>
        <el-col :md="12">
          <el-form-item label="岗位" prop="postId">
            <el-select
              v-model.trim="userInfoForm.postId"
              placeholder="请选择活动区域"
              style="width: 100%;"
              size="medium"
              clearable
            >
              <el-option
                v-for="post in postList"
                :key="post.postId"
                :label="post.postName"
                :value="post.postId"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :md="12">
          <el-form-item label="职务" prop="empRankname">
            <el-input v-model.trim="userInfoForm.empRankname" size="medium"></el-input>
          </el-form-item>
        </el-col>
        <el-col :md="12">
          <el-form-item label="职称" prop="empJobrank">
            <el-input v-model.trim="userInfoForm.empJobrank" size="medium"></el-input>
          </el-form-item>
        </el-col>
        <el-col :md="12">
          <el-form-item label="证件类型" prop="empCardtype">
            <el-select
              v-model.trim="userInfoForm.empCardtype"
              placeholder="请选择"
              style="width: 100%;"
              size="medium"
              clearable
            >
              <el-option label="身份证" value="1"></el-option>
              <el-option label="港澳台身份证" value="2"></el-option>
              <el-option label="护照" value="3"></el-option>
              <el-option label="户口簿" value="4"></el-option>
              <el-option label="军官证(士兵证)" value="5"></el-option>
              <el-option label="组织机构代码" value="6"></el-option>
              <el-option label="营业执照" value="7"></el-option>
              <el-option label="统一社会信用代码证" value="8"></el-option>
              <el-option label="其他" value="9"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :md="12">
          <el-form-item label="证件号码" prop="empIdcardno">
            <el-input v-model.trim="userInfoForm.empIdcardno" size="medium"></el-input>
          </el-form-item>
        </el-col>
        <el-col :md="12">
          <el-form-item label="生日" prop="name">
            <el-form-item prop="empBirthday">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model.trim="userInfoForm.empBirthday"
                style="width: 100%;"
                size="medium"
                clearable
              >
              </el-date-picker>
            </el-form-item>
          </el-form-item>
        </el-col>
        <el-col :md="12">
          <el-form-item label="性别" prop="empSex">
            <el-select
              v-model.trim="userInfoForm.empSex"
              placeholder="请选择"
              style="width: 100%;"
              size="medium"
              clearable
            >
              <el-option label="男" value="男"></el-option>
              <el-option label="女" value="女"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :md="12">
          <el-form-item label="在岗状态" prop="empState">
            <el-select
              v-model.trim="userInfoForm.empState"
              placeholder="请选择"
              style="width: 100%;"
              size="medium"
              clearable
            >
              <el-option label="正常" value="正常"></el-option>
              <el-option label="离职" value="离职"></el-option>
              <el-option label="退休" value="退休"></el-option>
              <el-option label="留职" value="留职"></el-option>
              <el-option label="借调" value="借调"></el-option>
              <el-option label="临时" value="临时"></el-option>
              <el-option label="休假" value="休假"></el-option>
              <el-option label="存档" value="存档"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :md="12">
          <el-form-item label="婚否" prop="empMarried">
            <el-select
              v-model.trim="userInfoForm.empMarried"
              placeholder="请选择"
              style="width: 100%;"
              size="medium"
              clearable
            >
              <el-option label="已婚" value="已婚"></el-option>
              <el-option label="未婚" value="未婚"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :md="12">
          <el-form-item label="登录方式" prop="userLogintype ">
            <el-select
              v-model.trim="userInfoForm.userLogintype"
              placeholder="请选择"
              style="width: 100%;"
              size="medium"
              clearable
            >
              <el-option label="凭密码登录" value="凭密码登录"></el-option>
              <el-option label="凭指纹登录" value="凭指纹登录"></el-option>
              <el-option label="凭加密锁登录" value="凭加密锁登录"></el-option>
              <el-option label="凭域帐号登录" value="凭域帐号登录"></el-option>
              <el-option label="凭CA证书登录" value="凭CA证书登录"></el-option>
              <el-option label="凭人脸识别登录" value="凭人脸识别登录"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :md="12">
          <el-form-item label="手机号" prop="empMobile">
            <el-input v-model.trim="userInfoForm.empMobile" size="medium"></el-input>
          </el-form-item>
        </el-col>
        <el-col :md="12">
          <el-form-item label="电子邮件" prop="empEmail">
            <el-input v-model.trim="userInfoForm.empEmail" size="medium"></el-input>
          </el-form-item>
        </el-col>
        <el-col :md="12">
          <el-form-item label="办公电话" prop="empOfficecall">
            <el-input v-model.trim="userInfoForm.empOfficecall" size="medium"></el-input>
          </el-form-item>
        </el-col>
        <el-col :md="12">
          <el-form-item label="家庭电话" prop="empHomecall">
            <el-input v-model.trim="userInfoForm.empHomecall" size="medium"></el-input>
          </el-form-item>
        </el-col>
        <el-col :md="12">
          <el-form-item label="绑定IP" prop="empMachineip">
            <el-input v-model.trim="userInfoForm.empMachineip" size="medium"></el-input>
          </el-form-item>
        </el-col>
        <el-col :md="12">
          <el-form-item label="住址" prop="empAddress">
            <el-input v-model.trim="userInfoForm.empAddress" size="medium"></el-input>
          </el-form-item>
        </el-col>
        <el-col :md="12">
          <el-form-item label="描述" prop="userNote">
            <el-input type="textarea" v-model.trim="userInfoForm.userNote" size="medium"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <div class="user-info-form-photos">
        <div class="user-info-form-photos-item">
          <label class="user-info-form-photos-item-label">照片</label>
          <div class="avatar-uploader" @click="handleUploader('photo')">
            <img v-if="userInfoForm.photo" :src="userInfoForm.photo" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </div>
        </div>
        <div class="user-info-form-photos-item">
          <label class="user-info-form-photos-item-label">个人签名</label>
          <div class="avatar-uploader" @click="handleUploader('signature')">
            <img
              v-if="userInfoForm.signature"
              :src="userInfoForm.signature"
              class="avatar signature"
            >
            <i v-else class="el-icon-plus avatar-uploader-icon signature"></i>
          </div>
        </div>
        <input
          type="file"
          class="uploader"
          ref="uploadFile"
          accept="image/*"
          @change="handleUploadFile"
        />
      </div>
    </el-form>
    <div class="user-info-btn-group" v-if="showButton">
      <el-button
        @click="handleResetPassWord"
        size="medium"
        class="user-info-btn-group-item"
        type="danger"
      >
        <icon-svg iconClass="refresh" />
        重置密码
      </el-button>
      <el-button
        @click="updateUKey"
        size="medium"
        type="warning"
        class="user-info-btn-group-item"
      >
        <icon-svg iconClass="edit" />
        更新加密锁
      </el-button>
      <el-button
        @click="updateExtendInfo"
        size="medium"
        type="primary"
        class="user-info-btn-group-item"
      >
        <icon-svg iconClass="add" />
        附加信息
      </el-button>
      <el-button
        type="primary"
        @click="submitForm()"
        size="medium"
        class="user-info-btn-group-item"
      >
        <icon-svg iconClass="save" />
        保存
      </el-button>
    </div>
    <el-dialog title="用户附加信息" :visible.sync="extendPropertyVisible" append-to-body>
      <user-info-extend :userId="userId" />
    </el-dialog>
    <el-dialog title="重置密码" :visible.sync="updatePwdVisible" append-to-body>
      <update-password
        :userId="userId"
        @onSuccess="updatePwdVisible = false"
        @onCancel="updatePwdVisible = false"
        ref="updatePassword"
      />
      <template v-slot:footer>
        <el-button size="medium" type="primary" @click="submitUpdatePassword">
          <icon-svg iconClass="confirm" />
          确定
        </el-button>
        <el-button  size="medium" plain @click="updatePwdVisible = false">
          <icon-svg iconClass="confirm" />
          取消
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import {
  validPhone, validEmail, validIp, validlandLineOrPhone, validPositiveInt,
} from '@/libs/validate';
import { formatDate } from '@/libs/date';
import { updateEmployee, getEmployeeById } from '@/apis/auth/employee';
import { getPostByUserId, getOrgByUserId } from '@/apis/auth/org';
import { getRolesByUserId } from '@/apis/auth/role';
import UserInfoExtend from './extendInfo';
import UpdatePassword from './updatePassword';

export default {
  props: {
    showButton: {
      type: Boolean,
      default: true,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  components: {
    UserInfoExtend,
    UpdatePassword,
  },
  data() {
    const validateUserSortnum = (rule, value, callback) => {
      if (!value || !validPositiveInt(value)) {
        callback(new Error('序号必须为正整数'));
      } else {
        callback();
      }
    };
    const validateEmpMobile = (rule, value, callback) => {
      if (value && !validPhone(value)) {
        callback(new Error('手机号码格式不正确'));
      } else {
        callback();
      }
    };
    const validateEmpHomecall = (rule, value, callback) => {
      if (value && !validlandLineOrPhone(value)) {
        callback(new Error('家庭电话格式不正确'));
      } else {
        callback();
      }
    };
    const validateEmpOfficecall = (rule, value, callback) => {
      if (value && !validlandLineOrPhone(value)) {
        callback(new Error('办公电话格式不正确'));
      } else {
        callback();
      }
    };
    const validateEmpMachineip = (rule, value, callback) => {
      if (value && !validIp(value)) {
        callback(new Error('绑定ip格式不正确'));
      } else {
        callback();
      }
    };
    const validateEmpEmail = (rule, value, callback) => {
      if (value && !validEmail(value)) {
        callback(new Error('电子邮箱格式不正确'));
      } else {
        callback();
      }
    };
    return {
      loading: false,
      extendPropertyVisible: false,
      updatePwdVisible: false,
      uploadType: '',
      postList: [],
      userOfOrgs: '',
      userOfRoles: '',
      userInfoForm: {
        empAddress: '',
        empBirthday: '',
        empCardtype: '',
        empEmail: '',
        empHomecall: '',
        empIdcardno: '',
        empJobrank: '',
        empMachineip: '',
        empMarried: '',
        empMobile: '',
        empNo: '',
        empOfficecall: '',
        empRankname: '',
        empSex: '',
        empState: '',
        photo: '',
        postId: '',
        signature: '',
        userAlias: '',
        userLogintype: '',
        userName: '',
        userNote: '',
        userPopedom: '',
        userSortnum: undefined,
      },
      userRules: {
        userName: [
          { required: true, message: '姓名不能为空', trigger: 'blur' },
        ],
        userSortnum: [
          { required: true, message: '序号不能为空', trigger: 'blur' },
          { validator: validateUserSortnum, trigger: 'blur' },
        ],
        empMobile: [
          { validator: validateEmpMobile, trigger: 'blur' },
        ],
        empHomecall: [
          { validator: validateEmpHomecall, trigger: 'blur' },
        ],
        empOfficecall: [
          { validator: validateEmpOfficecall, trigger: 'blur' },
        ],
        empMachineip: [
          { validator: validateEmpMachineip, trigger: 'blur' },
        ],
        empEmail: [
          { validator: validateEmpEmail, trigger: 'blur' },
        ],
      },
    };
  },
  created() {
    this.init();
  },
  watch: {
    $route: {
      handler(val, oldVal) {
        if (val !== oldVal) {
          this.init();
          return true;
        }
        return false;
      },
    },
    userId: {
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
      this.getUserInfo();
      this.getPostList();
      this.getUserOfOrgs();
      this.getUserOfRoles();
    },
    handleUploader(type) {
      this.uploadType = type;
      this.$refs.uploadFile.click();
    },
    handleUploadFile() {
      const files = this.$refs.uploadFile && this.$refs.uploadFile.files;
      if (!files.length) {
        return;
      }
      const fileReader = new FileReader();
      fileReader.readAsDataURL(files[0]);
      fileReader.onload = (e) => {
        this.userInfoForm[this.uploadType] = e.target.result;
      };
    },
    handleResetPassWord() {
      this.updatePwdVisible = true;
    },
    updateUKey() {
      this.$message('更新加密锁功能尚在开发中...');
    },
    updateExtendInfo() {
      this.extendPropertyVisible = true;
    },
    submitUpdatePassword() {
      this.$refs.updatePassword.handleSubmit();
    },
    submitForm() {
      this.$refs.userInfoForm.validate((valid) => {
        if (!valid) {
          return false;
        }
        const options = Object.keys(this.userInfoForm).reduce((oldOptions, key) => ({
          ...oldOptions,
          [key]: this.userInfoForm[key] || '',
        }), {});
        return updateEmployee({
          ...options,
          userId: this.userId,
          empBirthday: this.userInfoForm.empBirthday ? formatDate(this.userInfoForm.empBirthday) : '',
        }).then(({
          code,
          msg,
        } = {}) => {
          if (code === 0) {
            this.$message({
              type: 'success',
              message: '保存成功',
            });
            this.$emit('onSuccess', '保存');
          } else {
            this.$emit('onError', '保存');
            throw new Error(msg || '保存失败');
          }
        });
      });
    },
    getUserInfo() {
      this.loading = true;
      getEmployeeById(this.userId).then(({
        code,
        msg,
        resData: {
          user = {}, employee = {}, photo, signature,
        } = {},
      } = {}) => {
        if (code === 0) {
          this.userInfoForm = {
            ...this.userInfoForm, ...user, ...employee, photo, signature,
          };
        } else {
          throw new Error(msg || '获取用户信息失败');
        }
        this.loading = false;
      }).catch((err) => {
        this.$message.error(err.message);
        this.loading = false;
      });
    },
    getPostList() {
      getPostByUserId(this.userId).then(({
        code,
        resData: {
          postList = [],
        } = {},
      } = {}) => {
        if (code === 0) {
          this.postList = postList;
        } else {
          throw new Error('获取岗位信息失败');
        }
      }).catch((err) => {
        this.$message.error(err.message);
      });
    },
    getUserOfOrgs() {
      getOrgByUserId(this.userId).then(({
        code,
        resData: {
          org = [],
        } = {},
      } = {}) => {
        if (code === 0) {
          this.userOfOrgs = org.map(item => item.orgName).join('、');
        }
      });
    },
    getUserOfRoles() {
      getRolesByUserId(this.userId).then(({
        code,
        resData: {
          roleInfo = [],
        } = {},
      } = {}) => {
        if (code === 0) {
          this.userOfRoles = roleInfo.map(item => item.roleName).join('、');
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
