<!--
 * @Description: 上传示例（模板）文件组件
 * @Author: wangjiayu
 * @Date: 2020-02-27 16:31:01
 * @LastEditors: wangjiayu
 * @LastEditTime: 2020-03-18 17:19:38
 -->

<template>
  <div class="template-upload-container">
    <template v-if="tempDocCid">
      <el-button type="warning" size="mini" :disabled="!isFileReady"
        @click="showTemplateFile">查看</el-button>
      <el-button type="danger" size="mini" :disabled="!isFileReady"
       @click="deleteTemplateFile">删除</el-button>
    </template>
    <template v-else>
      <el-button class="upload-btn" type="primary" size="mini">
        上传
        <input type="file" @mouseenter="changeTargetType($event)"
          @change="changeFile($event)" :accept="fileType">
    </el-button>
    </template>

    <!-- 预览附件模板文件 -->
    <el-dialog :visible.sync="fileViewVisible" :top="dialogTop"
      width="70%" title="预览">
      <div class="file-viewer" >
        <img :src="imgUrl" width="100%" height="100%" v-if="isImg"/>
        <iframe :src="pdfUrl"  width="100%" :height="iframeH"
          frameborder="0" scrolling="yes" v-else></iframe>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  addTemplate, uploadTemplateFile, getTemplateFile, deleteTemplate,
} from '@/apis/doc/template';
import { getApiPojoJstring } from '@/libs/utils';
import config from '@/config';

export default {
  props: {
    folderId: { // 附件目录id
      required: true,
      type: String,
    },
    businessType: { // 附件所属业务类型
      required: true,
      type: String,
    },
    templateId: String, // 附件模板文件id
    templateType: { // 附件模板文件类型（示例/模板）
      required: true,
      type: String,
    },
    pType: { // 附件模板类型
      type: String,
      default: '流程模版',
    },
  },
  data() {
    return {
      tempDocCid: this.templateId,
      isImg: true, // 文件是否为图片（false为pdf）
      maxSize: 10, // 文件最大10MB
      isFileReady: true, // 文件是否上传完成
      fileViewVisible: false, // 是否显示预览附件对话框
      ftpUrl: config.urlType.ios,
      pathBase64: 'data:image/jpeg;base64,',
      imgUrl: '', // 图片路径
      pdfUrl: '', // pdf数据源
      dialogTop: '0',
      loadingInstance: null, // 加载动画对象
    };
  },
  computed: {
    fileType() {
      return this.templateType === '示例' ? '.jpeg,.jpg,.png' : '.jpeg,.jpg,.png,application/pdf';
    },
    iframeH() {
      const H = window.innerHeight || document.body.clientHeight;
      return `${H - 180}px`;
    },
  },
  methods: {
    // 修改点击事件的目标类习属性
    changeTargetType(e) {
      e.target.type = 'file';
    },
    // 改变文件
    changeFile(e) {
      const file = e.target.files[0];
      const fileSize = (file.size / (1024 * 1024));
      const fileType = this.getFileType(file);
      if (!fileType) {
        this.$message.error('请上传图片或pdf格式');
        return;
      }
      if (fileSize > this.maxSize) {
        this.$message.error('上传文件过大');
        return;
      }
      // 如果当前有模板文件，则修改，否则新增
      this.createloading();
      if (this.tempDocCid) {
        this.updateTemplateFile(file);
      } else {
        this.addTemplateFile(file);
      }
    },
    // 检查文件类型
    getFileType(file) {
      let type = '';
      if (file.type.indexOf('jpeg') > -1
            || file.type.indexOf('jpg') > -1
            || file.type.indexOf('png') > -1) {
        type = 'img';
      } else if (file.type.indexOf('pdf') > -1) {
        type = 'pdf';
      }
      return type;
    },
    // 新增模板文件
    addTemplateFile(file) {
      // 新增空文件节点
      addTemplate({
        docPid: this.folderId,
        docName: '示例',
        docReserve: this.templateType,
        docPnode: this.businessType,
        docCkind: '文件',
        docCsort: 1,
        docIsinit: 1,
        docPtype: this.pType,
        docCreateby: this.userId,
      }).then(({ code, resData = {} } = {}) => {
        if (code === 0) {
          const { template = {} } = resData;
          if (!template.docCid) {
            this.$message.error(`上传${this.templateType}失败`);
          } else {
            this.tempDocCid = template.docCid;
            this.isFileReady = false;
            this.updateTemplateFile(file);
          }
        } else {
          this.$message.error(`上传${this.templateType}失败`);
        }
      }, (err) => {
        throw new Error(err);
      });
    },
    // 更新模板文件文件
    updateTemplateFile(file) {
      if (!this.tempDocCid) {
        return;
      }
      const formData = new FormData();
      formData.append('uploadFile', file, file.name);
      uploadTemplateFile({
        pNode: this.businessType,
        cId: this.tempDocCid,
        cName: file.name.substring(0, file.name.lastIndexOf('.')),
      }, formData).then(({ code } = {}) => {
        if (code === 0) {
          this.closeloading();
          this.$message.success(`上传${this.templateType}成功`);
          this.isFileReady = true;
        } else {
          this.$message.error(`上传${this.templateType}失败`);
        }
      }, (err) => {
        throw new Error(err);
      });
    },
    // 查看文件
    showTemplateFile() {
      if (!this.tempDocCid) {
        return;
      }
      getTemplateFile(this.businessType, this.pType, [this.tempDocCid])
        .then(({ code, resData = {} }) => {
          if (code === 0) {
            const { binfile = [] } = resData;
            if (!binfile.length) {
              this.$message.error('未查询到文件信息');
              return;
            }
            const file = binfile[0];
            this.showFileViewer(file);
          } else {
            this.$message.error(`查看${this.templateType}文件失败`);
          }
        }, (err) => {
          throw new Error(err);
        });
    },
    // 显示文件预览弹窗
    showFileViewer(file) {
      this.fileViewVisible = true;
      if (file.docExtname !== '.PDF') { // 图片文件
        this.isImg = true;
        if (file.docFtpath) { // FTP路径
          const imgSrc = `${this.ftpUrl}${file.docFtpath}`;
          this.imgUrl = `${imgSrc}?${getApiPojoJstring()}`;
        } else { // base64数据
          this.imgUrl = `${this.pathBase64}${file.docFilecontent}`;
        }
      } else { // pdf文件
        this.isImg = false;
        const pdfSrc = `${this.ftpUrl}${file.docFtpath}`;
        this.pdfUrl = `${pdfSrc}?${getApiPojoJstring()}`;
      }
    },
    // 删除文件
    deleteTemplateFile() {
      if (!this.tempDocCid) {
        return;
      }
      this.$confirm('确定删除文件？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        deleteTemplate([this.tempDocCid])
          .then(({ code } = {}) => {
            if (code === 0) {
              this.$message.success(`删除${this.templateType}文件成功`);
              this.tempDocCid = '';
            } else {
              this.$message.error(`删除${this.templateType}文件失败`);
            }
          }, (err) => {
            throw new Error(err);
          });
      }).catch(() => {});
    },
    // 开始加载动画
    createloading(el = '.loading-area') {
      const obj = this.loadingInstance;
      if (!obj) {
        this.loadingInstance = this.$loading({
          lock: true,
          text: '文件上传中',
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
