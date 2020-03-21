<!--
 * @Description: 附件清单表格
 * @Author: wangjiayu
 * @Date: 2020-02-26 15:16:36
 * @LastEditors: wangjiayu
 * @LastEditTime: 2020-03-18 17:24:57
 -->

<template>
  <div class="attachment-table-panel">
    <div class="attachment-table-title">
      <span>附件清单配置</span>
      <div class="btn-group">
        <el-button type="primary" @click="handleAddAttachmentFolder">
          <icon-svg iconClass="add" className="add-icon"></icon-svg>
          新增
        </el-button>
        <el-button type="danger" @click="handleDeleteAttchmentFolder">
          <icon-svg iconClass="remove" className="remove-icon"></icon-svg>
          删除
        </el-button>
      </div>
    </div>
    <div class="attachment-table-body">
      <el-table :data="tableData" highlight-current-row class="loading-area"
        tooltip-effect="dark" border stripe :cell-style="{padding:'8px 3px'}" height="100%"
        :header-cell-style="{padding:'8px 3px',background:'#F2F6FC'}"
        @selection-change="handleTableSelectionChanged">
        <el-table-column type="selection" width="60" align="center"></el-table-column>
        <el-table-column type="index" label="序号" width="60" align="center"></el-table-column>
        <el-table-column label="目录名称" prop="docName" align="center"
          min-width="200"></el-table-column>
        <el-table-column label="是否必传" width="90" prop="templateRequire"
          align="center"></el-table-column>
        <el-table-column label="排序序号" prop="docCsort" width="90"
          align="center"></el-table-column>
        <el-table-column label="示例" width="160" align="center">
          <template v-slot="scope">
            <template-upload-button :key="scope.row.docCid + scope.row.exampleFileId + '示例'"
              :folderId="scope.row.docCid" :businessType="businessType"
              templateType="示例" :templateId="scope.row.exampleFileId" :pType="pType">
            </template-upload-button>
          </template>
        </el-table-column>
        <el-table-column label="模板" width="160" align="center">
          <template v-slot="scope">
            <template-upload-button :key="scope.row.docCid + scope.row.templateFileId + '模板'"
              :folderId="scope.row.docCid" :businessType="businessType"
              templateType="模板" :templateId="scope.row.templateFileId" :pType="pType">
            </template-upload-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="90"
          align="center">
          <template v-slot="scope">
            <el-button @click="handleShowAttachmentInfo(scope.row)" type="warning" size="mini">
              修改
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 附件目录详情弹出框 -->
    <el-dialog :title="dialogTitle" :visible.sync="folderDetailVisible"
      :close-on-click-modal="false" append-to-body @close="closeFolderDetailDialog">
      <el-form class="attchment-folder-form" :model="folderForm" ref="folderForm"
        :rules="folderRules" size="medium" label-width="90px">
        <el-form-item label="目录名称" prop="folderName">
          <el-input v-model="folderForm.folderName" autocomplete="off"
            placeholder="请输入目录名称"></el-input>
        </el-form-item>
        <el-form-item label="是否必传" prop="require" v-if="operateType === '修改'">
          <el-select v-model="folderForm.require">
            <el-option label="否" value=否></el-option>
            <el-option label="是" value="是"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="排序序号" prop="sortNum">
          <el-input v-model="folderForm.sortNum" autocomplete="off"
            placeholder="请输入排序序号"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleSubmit">
          <icon-svg iconClass="confirm" className="confirm-icon"></icon-svg>
          确定
        </el-button>
        <el-button plain @click="folderDetailVisible = false">
          <icon-svg iconClass="cancel" className="cancel-icon"></icon-svg>
          取消
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import {
  addTemplate, queryTemplate, deleteTemplate, updateTemplate, updateTemplateParam,
} from '@/apis/doc/template';
import TemplateUploadButton from './TemplateUploadButton';

export default {
  components: {
    TemplateUploadButton,
  },
  props: {
    businessType: {
      required: true,
      type: String,
    },
  },
  data() {
    return {
      tableData: [], // 附件清单表格数据
      operateType: '', // 操作类型
      folderDetailVisible: false, // 是否显示附件目录详情对话框
      folderForm: { // 附件目录表单数据对象
        folderName: '',
        require: '否',
        sortNum: 999,
        folderId: '',
      },
      folderRules: {
        folderName: [
          { required: true, message: '请输入目录名称', trigger: 'blur' },
        ],
        sortNum: [
          { required: true, message: '请输入排序序号', trigger: 'blur' },
        ],
      },
      tableSelection: [], // 附件清单表格选中数据
      loadingInstance: null, // 加载动画对象
      pType: '流程模版', // 附件模板类型
    };
  },
  watch: {
    businessType: 'getAttachmentList',
  },
  computed: {
    // 对话框标题
    dialogTitle() {
      return `${this.operateType}附件目录`;
    },
    ...mapState('user', { userId: state => state.userId }),
  },
  methods: {
    // 新增附件目录
    handleAddAttachmentFolder() {
      this.operateType = '新增';
      this.folderDetailVisible = true;
    },
    // 删除附件目录
    handleDeleteAttchmentFolder() {
      if (this.tableSelection.length === 0) {
        this.$message.warning('请先选择一条记录进行删除');
        return;
      }
      this.$confirm('确定删除文件？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        const folderIds = [];
        this.tableSelection.forEach((item) => {
          folderIds.push(item.docCid);
          if (item.templateFileId) {
            folderIds.push(item.templateFileId);
          }
          if (item.exampleFileId) {
            folderIds.push(item.exampleFileId);
          }
        });
        deleteTemplate(folderIds).then(({ code } = {}) => {
          if (code !== 0) {
            this.$message.error('删除附件目录失败');
          } else {
            this.$message.success('删除附件目录成功');
            this.getAttachmentList();
          }
        }).catch((err) => {
          throw new Error(err);
        });
      }).catch(() => {});
    },
    // 显示附件目录详情对话框
    handleShowAttachmentInfo(folderData) {
      this.operateType = '修改';
      this.folderDetailVisible = true;
      this.folderForm = {
        folderName: folderData.docName,
        require: '否',
        sortNum: folderData.docCsort,
        folderId: folderData.docCid,
        param: folderData.param,
      };
    },
    // 关闭附件目录详情对话框
    closeFolderDetailDialog() {
      this.folderDetailVisible = false;
      this.$refs.folderForm.resetFields();
    },
    // 提交附件目录信息
    handleSubmit() {
      // 验证数据
      const errorMsgs = [];
      this.$refs.folderForm.validateField(['folderName', 'sortNum'], (errorMessage) => {
        errorMsgs.push(errorMessage);
      });
      if (errorMsgs.some(item => !!item)) {
        return;
      }
      if (this.operateType === '新增') {
        this.addAttachmentFolder();
      } else if (this.operateType === '修改') {
        this.updateAttachmentFolder();
      }
    },
    // 新增附件目录信息
    addAttachmentFolder() {
      const defaultErrorMsg = '保存附件模板失败';
      const folderData = {
        docName: this.folderForm.folderName,
        docPnode: this.businessType,
        docCkind: '文件夹',
        docCsort: this.folderForm.sortNum,
        docIsinit: 2,
        docPtype: this.pType,
        docCreateby: this.userId,
      };
      addTemplate(folderData).then(({ code } = {}) => {
        if (code === 0) {
          this.getAttachmentList();
          this.closeFolderDetailDialog();
        } else {
          throw new Error(defaultErrorMsg);
        }
      }).catch(() => {
        this.$message.error(defaultErrorMsg);
      });
    },
    // 修改附件目录信息
    updateAttachmentFolder() {
      const defaultErrorMsg = '保存附件模板失败';
      // 修改附件目录信息
      const { folderId, folderName, sortNum } = this.folderForm;
      updateTemplate({
        docCid: folderId,
        docName: folderName,
        docCsort: sortNum,
        docPnode: this.businessType,
      }).then(({ code } = {}) => {
        if (code === 0) {
          this.getAttachmentList();
          this.closeFolderDetailDialog();
        } else {
          this.$message.error(defaultErrorMsg);
        }
      }).catch((err) => {
        throw new Error(err);
      });

      // 修改附件目录参数信息
      this.updateParam();
    },
    // 更新附件目录参数
    updateParam() {
      const { require, param } = this.folderForm;
      updateTemplateParam({
        docParamid: param.docParamid,
        docParamname: '是否必选',
        docParamval: require,
        docPnode: '内置参数',
      }).then(({ code } = {}) => {
        if (code !== 0) {
          this.$message.error('更新附件模板参数失败');
        }
      }, (err) => {
        throw new Error(err);
      });
    },
    // 获取附件清单信息
    getAttachmentList() {
      this.createloading();
      const defaultErrorMsg = '获取附件清单信息失败';
      queryTemplate(this.businessType).then(({ code, resData = {} } = {}) => {
        if (code === 0) {
          const { templates = [] } = resData;
          this.translateToTableData(templates);
          this.closeloading();
        } else {
          this.closeloading();
          this.$message.error(defaultErrorMsg);
        }
      }, (err) => {
        this.closeloading();
        throw new Error(err);
      });
    },
    // 附件清单表格选中数据改变监听事件
    handleTableSelectionChanged(selection) {
      this.tableSelection = selection;
    },
    // 将数据库取出的数据转换成表格需要的数据格式
    translateToTableData(templates) {
      const tableData = [];
      templates.forEach((item) => {
        const tempData = Object.assign({ exampleFileId: '', templateFileId: '' }, item.templateDO);
        // 拼接模板文件信息
        if (item.children.length) {
          item.children.forEach((child) => {
            const tempChildData = child.templateDO;
            if (tempChildData.docReserve === '示例') {
              tempData.exampleFileId = tempChildData.docCid;
            } else if (tempChildData.docReserve === '模板') {
              tempData.templateFileId = tempChildData.docCid;
            }
          });
        }
        // 拼接模板参数信息
        if (item.attachParams.length) {
          for (let i = 0; i < item.attachParams.length; i += 1) {
            const param = item.attachParams[i];
            if (param.docParamname === '内置参数') {
              tempData.param = param;
              const params = param.docParamval.split(';');
              for (let j = 0; j < params.length; j += 1) {
                if (params[j].indexOf('是否必选') > -1) {
                  const [, value] = params[j].split(':');
                  tempData.templateRequire = value;
                  break;
                }
              }
              break;
            }
          }
        }
        tableData.push(tempData);
      });
      this.tableData = tableData;
    },
    // 开始加载动画
    createloading(el = '.loading-area') {
      const obj = this.loadingInstance;
      if (!obj) {
        this.loadingInstance = this.$loading({
          lock: true,
          text: '拼命加载中',
          target: document.querySelector(el),
        });
      }
    },
    // 关闭加载动画
    closeloading() {
      const obj = this.loadingInstance;
      if (obj) {
        obj.close();
        this.loadingInstance = null;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
