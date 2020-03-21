<!--
 * @Author: huwei
 * @Date: 2020-02-05 10:03:57
 * @
# Description:
 -->
<template>
  <div>
    <div class="text_tt">
      <h3>{{pageName}}</h3>
    </div>
    <div class="text_main">
      <h3>用户须知</h3>
      <div class="text_area">
        <p>1、权利人凭公安机关核发的二代身份证在自助直询系统中直关信息若权利人委托他人直询
          由受委托人持权利人的二代身份证进行查询,但因委托查词所导致的一切后果和贵任由委托人自行负贵并承担。</p>
        <p>2、为保证服务安全和权利人的合法权益查询系統会对用户进行拍照存档备案。</p>
        <p>3、用户应对查询结果自行承担风险,妥善保管并合法使用。</p>
        <p>4、本单位不承担因用户的查询行为,所产生的任何直接、间接、附带或行生的提失和责任。</p>
        <p>5、本查询系统仅支持二代身份证查询。</p>
        <p>6、其他以非身份证号码登记或与用户提供的二代身份证号码不ー致的不动产登记信息本查询</p>
      </div>
      <div class="btn_wrap">
        <el-checkbox v-model="checked">我已阅读</el-checkbox>
        <div class="btn"><el-button type="primary" @click="handleSubmit">确认</el-button></div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  components: {
  },
  data() {
    return {
      pageName: '二手房转移登记',
      checked: '',
    };
  },
  mounted() {
    this.$emit('getRouterName', this.pageName);
  },
  methods: {
    handleSubmit() {
      if (this.checked) {
        this.$router.replace({ name: 'PsecondProcedure' });
      } else {
        this.$message.error('请阅读用户须知!');
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
