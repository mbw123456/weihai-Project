<template>
  <div class="my-att">
      我的关注

  </div>
</template>

<script>

export default {
  name: "my-att",
  data() {
    return {
      //获取public路径
      publicPath: process.env.BASE_URL,
    };
  },
  methods: {
    handleClick(tab, event) {
        console.log(tab, event);
    },
  },
  mounted() {
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "@/assets/styles/vars.scss";
.my-att {
  position: relative;
  padding-top: 20px;

}
</style>
