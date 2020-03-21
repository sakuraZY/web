<!--
 * @Descripttion:  导入excel
 * @version: 1.0
 * @Author: zengying
 * @Date: 2020-03-12 16:17:49
 * @LastEditors: zengying
 * @LastEditTime: 2020-03-13 20:07:59
 -->
<template>
  <div class="el-btn">
    <input ref="excel-upload-input" class="excel-upload-input" type="file"
      accept=".xlsx, .xls,.csv," @change="handleClick">
    <el-button :loading="loading" type="primary" size="medium" @click="handleUpload">{{name}}
    </el-button>
    <div class="drop" @drop="handleDrop" @dragover="handleDragover" @dragenter="handleDragover">
      <el-button :loading="loading" style="margin-left:16px;" size="mini" type="primary"
        @click="handleUpload">
      </el-button>
    </div>
  </div>
</template>

<script>
import XLSX from 'xlsx';

export default {
  props: {
    name: {
      type: String,
      default: '选择文件',
    },
    beforeUpload: Function, // eslint-disable-line
    onSuccess: Function,// eslint-disable-line
  },
  data() {
    return {
      loading: false,
      excelData: {
        header: null,
        results: null,
      },
    };
  },
  methods: {
    generateData({ header, results }) {
      this.excelData.header = header;
      this.excelData.results = results;
      this.onSuccess && this.onSuccess(this.excelData);// eslint-disable-line
    },
    handleDrop(e) {
      e.stopPropagation();
      e.preventDefault();
      if (this.loading) return;
      const { files } = e.dataTransfer;
      if (files.length !== 1) {
        this.$message.error('Only support uploading one file!');
        return;
      }
      // 只用第一个文件
      const rawFile = files[0];

      if (!this.isExcel(rawFile)) {
        this.$message.error('Only supports upload .xlsx, .xls, .csv suffix files');
        // eslint-disable-next-line
        return false;
      }
      this.upload(rawFile);
      e.stopPropagation();
      e.preventDefault();
    },
    handleDragover(e) {
      e.stopPropagation();
      e.preventDefault();
      e.dataTransfer.dropEffect = 'copy';
    },
    handleUpload() {
      this.$refs['excel-upload-input'].click();
    },
    handleClick(e) {
      const { files } = e.target;
      // 上传一个文件
      const rawFile = files[0];
      if (!rawFile) return;
      this.upload(rawFile);
    },
    upload(rawFile) {
      this.$refs['excel-upload-input'].value = null;

      if (!this.beforeUpload) {
        this.readerData(rawFile);
        return;
      }
      const before = this.beforeUpload(rawFile);
      if (before) {
        this.readerData(rawFile);
      }
    },
    readerData(rawFile) {
      this.loading = true;
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const data = e.target.result;
          const workbook = XLSX.read(data, { type: 'array' });
          const firstSheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[firstSheetName];
          const header = this.getHeaderRow(worksheet);
          const results = XLSX.utils.sheet_to_json(worksheet);
          this.generateData({ header, results });
          this.loading = false;
          resolve();
        };
        reader.readAsArrayBuffer(rawFile);
      });
    },
    getHeaderRow(sheet) {
      const headers = [];
      const range = XLSX.utils.decode_range(sheet['!ref']);
      let C;
      const R = range.s.r;
      /* start in the first row */
      // eslint-disable-next-line
      for (C = range.s.c; C <= range.e.c; ++C) {
        const cell = sheet[XLSX.utils.encode_cell({ c: C, r: R })];
        let hdr = `UNKNOWN ${C}`;
        if (cell && cell.t) hdr = XLSX.utils.format_cell(cell);
        headers.push(hdr);
      }
      return headers;
    },
    isExcel(file) {
      return /\.(xlsx|xls|csv)$/.test(file.name);
    },
  },
};
</script>

<style lang='scss' scoped>
.el-btn {
  display: inline-block;
  margin: 0 10px;
}
.excel-upload-input {
  display: none;
  z-index: -9999;
}
.drop {
  display: none;
  border: 2px dashed #bbb;
  width: 600px;
  height: 160px;
  line-height: 160px;
  margin: 0 auto;
  font-size: 24px;
  border-radius: 5px;
  text-align: center;
  color: #bbb;
  position: relative;
}
</style>
