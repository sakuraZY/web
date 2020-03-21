<template>
  <div class="empty-data">
    <div class="empty-data-content">
      <icon-svg iconClass="emptydata" className="empty-data-icon"></icon-svg>
      <span class="empty-data-title">{{name}}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: '暂无数据',
    },
  },
};
</script>

<style lang="scss" scoped>
txtcolor{
  color: $--color-text-secondary;
}
.empty-data{
  display: flex;
  justify-content: space-around;
  &-content{
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &-icon{
    font-size: 50px;
    @extend txtcolor;
  }
  &-title{
    @extend txtcolor;
  }
}
</style>
