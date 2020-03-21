<script>
export default {
  created() {
    const { params: { path = '' } } = this.$route;
    this.$router.replace({ path: `/${path}` });
  },
  render(h) {
    return h();
  },
};
</script>
