<template>
  <div class="account-message">
      account-message

  </div>
</template>

<script>

export default {
  name: "account-message",
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
.account-project {
  position: relative;
  padding-top: 20px;

}
</style>
