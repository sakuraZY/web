<template>
  <div class="post-info-container">
    <el-table
      :data="postInfo"
      border
      size="medium"
      stripe
      style="width: 100%"
      @selection-change="handleSelectionChange"
      v-loading="postLoading"
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
        prop="postName"
        label="名称"
        align="center"
        width="200"
        :show-overflow-tooltip="true"
      >
      </el-table-column>
      <el-table-column
        prop="postFullname"
        label="全称"
        align="center"
        width="120"
        :show-overflow-tooltip="true"
      >
      </el-table-column>
      <el-table-column
        prop="postSortnum"
        label="排序序号"
        align="center"
        :show-overflow-tooltip="true"
      >
      </el-table-column>
      <el-table-column
        prop="postNote"
        label="描述"
        align="center"
        :show-overflow-tooltip="true"
      >
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        align="center"
        width="100"
      >
        <template v-slot="scope">
          <el-button
            @click="handleShowDiolog(scope.row)"
            type="warning" size="mini"
          >修改</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      :title="title"
      :visible.sync="postAttrVisible"
      append-to-body
      @close="closePostAttrDialog"
    >
      <el-form
        :model="postForm"
        :rules="postRules"
        size="medium"
        label-width="80px"
        ref="postForm"
      >
        <el-form-item label="岗位名称" prop="postName">
          <el-input v-model="postForm.postName"></el-input>
        </el-form-item>
        <el-form-item label="全称" prop="postFullname">
          <el-input v-model="postForm.postFullname"></el-input>
        </el-form-item>
        <el-form-item label="排序序号" prop="postSortnum">
          <el-input v-model.number="postForm.postSortnum" type="number"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="postNote">
          <el-input v-model="postForm.postNote"></el-input>
        </el-form-item>
      </el-form>
      <template v-slot:footer>
        <el-button size="medium" type="primary" @click="submitPostForm">
          <icon-svg iconClass="confirm" />
          确定
        </el-button>
        <el-button plain size="medium" @click="postAttrVisible = false">
          <icon-svg iconClass="cancel" />
          取消
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import EmptyData from '@/components/emptyData';
import {
  getPostByOrgId, updatePost, addPost, deletePost,
} from '@/apis/auth/org';

export default {
  props: {
    orgId: {
      type: String,
      required: true,
    },
  },
  components: {
    EmptyData,
  },
  data() {
    return {
      postInfo: [],
      postLoading: true,
      postAttrVisible: false,
      type: '',
      typeMap: {
        add: '新增',
        update: '修改',
      },
      multipleSelected: [],
      postForm: {
        postName: '',
        postFullname: '',
        postSortnum: null,
        postNote: '',
      },
      postRules: {
        postName: [
          { required: true, message: '岗位名称不能为空', trigger: 'blur' },
        ],
      },
    };
  },
  created() {
    this.getPosts();
  },
  computed: {
    title() {
      return `${this.typeMap[this.type]}岗位信息`;
    },
  },
  watch: {
    orgId: {
      handler(val, oldVal) {
        if (val === oldVal) {
          return;
        }
        this.getPosts();
      },
    },
  },
  methods: {
    getPosts() {
      this.postLoading = true;
      getPostByOrgId(this.orgId).then(({ code, msg, resData: { post } = {} }) => {
        if (code === 0) {
          this.postInfo = post || [];
        } else {
          throw new Error(msg || '获取岗位信息失败');
        }
        this.postLoading = false;
      }).catch((err) => {
        this.$message.error(err.message);
        this.postLoading = false;
      });
    },
    handleSelectionChange(val) {
      this.multipleSelected = val;
    },
    handleShowDiolog(postInfo) {
      this.type = postInfo ? 'update' : 'add';
      this.postForm = { ...this.postForm, ...postInfo };
      this.postAttrVisible = true;
    },
    submitPostForm() {
      this.$refs.postForm.validate((validate) => {
        if (!validate) {
          return false;
        }
        const opareate = {
          add: addPost,
          update: updatePost,
        };
        return opareate[this.type](this.orgId, this.postForm).then(({ code, msg }) => {
          if (code === 0) {
            this.$message({
              type: 'success',
              message: `${this.title}成功`,
            });
            this.closePostAttrDialog();
            this.getPosts();
          } else {
            throw new Error(msg || `${this.title}失败`);
          }
        }).catch((err) => {
          this.$message.error(err.message);
        });
      });
    },
    closePostAttrDialog() {
      this.$refs.postForm.resetFields();
      this.postAttrVisible = false;
    },
    deletePost() {
      const seletedData = this.multipleSelected;
      if (!seletedData.length) {
        return this.$message({
          type: 'warning',
          message: '请选择需要删除的岗位',
        });
      }
      return this.$confirm('确定删除吗?', '提示', { type: 'warning' }).then(() => {
        deletePost(seletedData.map(item => item.postId)).then(({ code, msg }) => {
          if (code === 0) {
            this.$message({
              type: 'success',
              message: '删除成功',
            });
            this.getPosts();
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
