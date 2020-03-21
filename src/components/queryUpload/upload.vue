<template>
<div class="up-wrap">
    <!-- list -->
    <div class="up-list" v-for="(item, index) in upImgs" :key="index">
        <div class="up-list-tit">
        <div class="up-list-tit-link">预览样例 | 下载样例</div>
        <h3 class="up-list-title">
            {{item.title}}
            <span>（支持格式：jpg、png、pdf)</span>
        </h3>
        </div>
        <div class="up-list-upmain">
        <div class="up-list-head">
            <i class="up-icon-plus"></i>
            <div class="up-action">
            <span>
                上传
                <input type="file" @mouseenter="changeFile($event)"
                @change="imgChange($event,index)" accept="image/*,application/pdf">
            </span>
            <i>|</i>
            <span>拍照</span>
            <i>|</i>
            <span>获取</span>
            </div>
        </div>
        <div class="up-imglist">
            <ul>
                <li v-for="(ite, ind) in item.imgs" :key="ind">
                <img :src="ite.src" @click="handleView(ite.bindId, index)"/>
                <div class="mark">
                    <i class="el-icon-view" @click="handleView(ite.bindId, index)"/>
                    <i class="el-icon-delete" @click="handleDele(ite.cId, index, ind)"/>
                </div>
                </li>
            </ul>
        </div>
        </div>
    </div>
    <!-- list -->
    <el-dialog
        :visible.sync="dialogVisible"
        width="70%" :top="dialogTop"
        title="预览"
        >
        <div class="dialog-list">
        <ul>
            <li v-for="(item,index) in nameList" :key="index"
            @click="handleList(item)">
            {{item.name}}
            </li>
        </ul>
        </div>
        <div class="dialog-m">
        <img :src="viewImg" width="100%" height="100%" v-if="isImage"/>
        <iframe :src="pdfurl"  width="100%" :height="this.iframeH"
        frameborder="0" scrolling="yes" v-else></iframe>
        </div>
    </el-dialog>
</div>
    <!-- wrap end -->
</template>
<script>
import {
  imgUpload, imgView, imgDele, fjqueryTree,
} from '@/apis/doc/attachment';
import { getApiPojoJstring } from '@/libs/utils';
import pdfImg from '@/assets/pdf.png';
import config from '@/config';
import { mapState, mapMutations } from 'vuex';

const { urlType } = config;
export default {
  props: ['infoJson'],
  data() {
    return {
      isFirstEnter: true,
      typeName: '流程实例',
      viewImg: '',
      dialogVisible: false,
      nodeName: '',
      MESSAGEJSON: null,
      compressWidth: 144,
      compressHigth: 100,
      maxSize: 10, // MB
      ftpUrl: urlType.ios, // 'http://192.168.37.201:8088/ios',
      pathBase64: 'data:image/jpeg;base64,',
      pdfImg,
      isImage: true,
      pdfurl: '',
      dialogTop: '0',
      pdir: '',
      upImgs: [],
      nameList: [],
      fileParams: [],
    };
  },
  mounted() {
    this.MESSAGEJSON = this.$store.state[this.infoJson.messJson[0]][this.infoJson.messJson[1]];
    this.nodeName = this.$store.state[this.infoJson.nodeName[0]][this.infoJson.nodeName[1]];
    this.IS_FIRST(this.MESSAGEJSON.sqbh);
    this.FJQuerryTree();
  },
  beforeDestroy() {
    this.SET_UPLOADOBJ({
      sqbh: this.MESSAGEJSON.sqbh,
      upImgs: this.upImgs,
    });
  },
  computed: {
    iframeH() {
      const H = window.innerHeight || document.body.clientHeight;
      return `${H - 50}px`;
    },
    ...mapState('queryUpload', { UPLOADOBJ: state => state.UPLOADOBJ }),
    ...mapState('queryUpload', { FILEPARAMS: state => state.FILEPARAMS }),
  },
  methods: {
    ...mapMutations('queryUpload', { SET_UPLOADOBJ: 'SET_UPLOADOBJ' }),
    ...mapMutations('queryUpload', { IS_FIRST: 'IS_FIRST' }),
    ...mapMutations('queryUpload', { SET_FILEPARAMS: 'SET_FILEPARAMS' }),
    changeFile(e) {
      e.target.type = 'file';
    },
    FJQuerryTree() {
      fjqueryTree({
        parentPnode: this.infoJson.parentPnode,
        pNode: this.MESSAGEJSON.sqbh,
        pType: this.typeName,
      }).then(({ code, msg, resData }) => {
        if (code === 0) {
          const farr = resData.data.filter(item => item.pId !== null);
          const narr = farr.filter(item => item.ckind !== '文件');
          const warr = farr.filter(item => item.ckind !== '文件夹');
          const obj = this.UPLOADOBJ[this.MESSAGEJSON.sqbh];
          if (!obj) {
            this.upImgs = narr.map(item => ({ title: item.docCname, id: item.id, imgs: [] }));
            if (warr.length > 0) {
              this.restImgs(narr, warr);
            }
          } else {
            const b = Object.keys(obj).some(item => item === 'upImgs');
            if (b) {
              this.upImgs = obj.upImgs;
              this.fileParams = this.FILEPARAMS[this.MESSAGEJSON.sqbh].fileParams;
            } else {
              this.upImgs = narr.map(item => ({ title: item.docCname, id: item.id, imgs: [] }));
            }
          }
        } else {
          this.$message.error(msg);
        }
      }, (err) => {
        throw new Error(err);
      });
    },
    restImgs(narr, warr) { // 回填附件处理
      const that = this;
      warr.forEach((item) => {
        narr.forEach((ite, ind) => {
          if (item.pId === ite.id) {
            const obj = { bindId: item.binid, cId: item.id };
            if (item.extname === 'PDF') {
              obj.src = this.pdfImg;
              this.upImgs[ind].imgs.push(obj);
            } else {
              that.getMinShow(item.binid, obj, ind, false);
            }
          }
        });
      });
    },
    imgChange(e, index) {
      const file = e.target.files[0];
      const fileSize = (file.size / (1024 * 1024));
      const isPdf = file.type.indexOf('pdf') > -1;
      const isImg = file.type.indexOf('jpeg') > -1 || file.type.indexOf('png') > -1;
      if (!isPdf && !isImg) {
        this.$message.error('请上传图片或pdf格式');
        return;
      }
      if (fileSize > this.maxSize) {
        this.$message.error('上传文件过大');
        return;
      }
      const formData = new FormData();
      formData.append('file', file, file.name);
      imgUpload({
        docPnode: this.MESSAGEJSON.sqbh,
        docPtype: this.typeName,
        // docCname: this.upImgs[index].title,
        docPid: this.upImgs[index].id,
      }, formData).then(({ code, msg, resData }) => {
        if (code === 0) {
          const obj = {
            bindId: resData.data.bindId,
            cId: resData.data.cid,
          };
          if (isPdf) {
            obj.src = this.pdfImg;
            this.upImgs[index].imgs.push(obj);
            this.getFJMess(resData.data.bindId, index);
            this.$message({
              message: '上传成功',
              type: 'success',
            });
          } else {
            this.getMinShow(resData.data.bindId, obj, index);
          }
          e.target.type = 'text';
          e.target.value = '';
          this.SET_FILEPARAMS({
            sqbh: this.MESSAGEJSON.sqbh,
            fileParams: this.fileParams,
          });
        } else {
          this.$message.error(msg);
        }
      }, (err) => {
        throw new Error(err);
      });
    },
    getFJMess(bindId, index) {
      imgView({
        pNode: this.MESSAGEJSON.sqbh,
        pType: this.typeName,
      }, [bindId]).then(({ resData }) => {
        const obj = {};
        const f = resData.binfile[0];
        obj.fileType = (f.docReserve); // fileType
        obj.fileName = `${f.docFilename}${f.docExtname}`;
        obj.dir = this.upImgs[index].title;
        obj.pdir = this.pdir;
        if (obj.fileType === 'ftp') {
          obj.url = f.docComefrom;
        } else {
          obj.url = f.docFilecontent;
        }
        this.fileParams.push(obj);
      });
    },
    getMinShow(bindId, obj, index, showInfo = true) {
      // 获取缩略图
      imgView({
        pNode: this.MESSAGEJSON.sqbh,
        pType: this.typeName,
        compressWidth: this.compressWidth,
        compressHigth: this.compressHigth,
      }, [bindId]).then((datas) => {
        const resDatas = datas.resData.binfile[0];
        if (datas.code === 0) {
          const objs = {};
          objs.fileType = (resDatas.docReserve); // fileType
          objs.fileName = `${resDatas.docFilename}${resDatas.docExtname}`;
          objs.dir = this.upImgs[index].title;
          objs.pdir = this.pdir;
          if (objs.fileType === 'ftp') {
            objs.url = resDatas.docComefrom;
          } else {
            objs.url = resDatas.docFilecontent;
          }
          this.fileParams.push(objs);
          if (resDatas.docFtpath) {
            const imgurl = `${this.ftpUrl}${resDatas.docFtpath}`;
            obj.src = `${imgurl}?${getApiPojoJstring()}`;
          } else {
            obj.src = `${this.pathBase64}${resDatas.docFilecontent}`;
          }
          this.upImgs[index].imgs.push(obj);
          if (showInfo) {
            this.$message({
              message: '上传成功',
              type: 'success',
            });
          }
        } else {
          this.$message.error(datas.msg);
        }
      });
    },
    handleView(bindId, index) {
      this.viewImg = '';
      this.pdfurl = '';
      const bindIdArr = this.upImgs[index].imgs.map(item => item.bindId);
      imgView({
        pNode: this.MESSAGEJSON.sqbh,
        pType: this.typeName,
      }, bindIdArr).then(({ code, msg, resData }) => {
        this.nameList = resData.binfile.map(item => ({
          name: `${item.docFilename}${item.docExtname}`,
          docExtname: `${item.docExtname}`,
          docFtpath: `${item.docFtpath}`,
          docFilecontent: `${item.docFilecontent}`,
        }));
        const sfile = resData.binfile.filter(item => item.docBinid === bindId);
        const resDatas = sfile[0];
        if (code === 0) {
          this.dialogVisible = true;
          this.transFilePath(resDatas);
        } else {
          this.$message.error(msg);
        }
      }, (err) => {
        throw new Error(err);
      });
    },
    transFilePath(resDatas) {
      if (resDatas.docExtname !== '.PDF') {
        this.isImage = true;
        if (resDatas.docFtpath) {
          const imgurl = `${this.ftpUrl}${resDatas.docFtpath}`;
          this.viewImg = `${imgurl}?${getApiPojoJstring()}`;
        } else {
          this.viewImg = `${this.pathBase64}${resDatas.docFilecontent}`;
        }
      } else {
        this.isImage = false;
        const pdfsrc = `${this.ftpUrl}${resDatas.docFtpath}`;
        this.pdfurl = `${pdfsrc}?${getApiPojoJstring()}`;
      }
    },
    handleList(item) {
      this.transFilePath(item);
    },
    handleDele(cId, index, ind) {
      imgDele({
        pNode: this.MESSAGEJSON.sqbh,
        pType: this.typeName,
      }, [cId]).then(() => {
        this.upImgs[index].imgs.splice(ind, 1);
        this.$message({
          message: '删除成功',
          type: 'success',
        });
      }, (err) => {
        throw new Error(err);
      });
    },
  },
};
</script>

<style src="./index.scss" lang='scss' scoped>
</style>
