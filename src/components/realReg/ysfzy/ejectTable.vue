<!--
 * @Author: huwei
 * @Date: 2020-03-16 17:14:23
 * @
# Description:
 -->
<template>
<div class="ejectWrap">
 <el-form
   ref="dialogForm"
   :model="dialogForm"
   :rules="rules"
   label-width="110px"
    ><!-- :rules="rules"> -->
     <el-row>
        <el-col>
            <el-form-item  label="姓名：" prop="qlrmc">
                <el-input v-model="dialogForm.qlrmc"></el-input>
            </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
            <el-form-item  label="权利人性质：" prop="qlrlx">
                <el-select v-model="dialogForm.qlrlx" class="select_w"
                placeholder="请选择">
                    <el-option
                        v-for="item in qlropts"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
            <el-form-item label="证件类型：" prop="zjlb">
                <el-select v-model="dialogForm.zjlb" class="select_w"
                placeholder="请选择">
                    <el-option
                        v-for="item in zjlx"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
            <el-form-item  label="证件号码：" prop="zjhm">
                <el-input v-model="dialogForm.zjhm"></el-input>
            </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
            <el-form-item  label="联系电话：">
                <el-input v-model="dialogForm.lxdh"></el-input>
            </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="footer">
      <el-button type="primary" @click="readCard">读 卡</el-button>
      <el-button type="primary" @click="handleEdit">确 定</el-button>
    </div>
</div>
</template>

<script>
export default {
  props: ['qlrMess'],
  data() {
    return {
      dialogForm: {
        qlrmc: '',
        qlrlx: '',
        zjlb: '',
        zjhm: '',
        lxdh: '',
      },
      qlropts: [
        { value: '个人', label: '个人' },
        { value: '企业', label: '企业' },
      ],
      zjlx: [
        { value: '1', label: '身份证' },
        { value: '2', label: '港澳台身份证' },
        { value: '3', label: '护照' },
        { value: '4', label: '户口簿' },
        { value: '5', label: '军官证(士兵证)' },
        { value: '6', label: '组织机构代码' },
        { value: '7', label: '营业执照' },
        { value: '8', label: '统一社会信用代码证' },
        { value: '9', label: '其他' },
      ],
      rules: {
        zjlb: [{ required: true, message: '请选择', trigger: 'change' }],
        qlrmc: [{ required: true, message: '请填写', trigger: 'blur' }],
        zjhm: [{ required: true, message: '请填写', trigger: 'blur' }],
        qlrlx: [{ required: true, message: '请选择', trigger: 'change' }],
      },
    };
  },
  created() {
    if (this.qlrMess) {
      this.dialogForm = this.qlrMess;
    }
  },
  methods: {
    readCard() {
      this.$message.success('读卡');
    },
    handleEdit() {
      this.$refs.dialogForm.validate((valid) => {
        if (valid) {
          this.$emit('qlrFn', this.dialogForm);
        }
      });
    },
  },
};
</script>
<style  scoped>
.ejectWrap{
  padding: 0 20px 0 0;
}
.select_w{
  width: 100%;
}
.footer{
  margin-top: 20px;
  text-align: right;
}
</style>
