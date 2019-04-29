<template>
  <div class="complain">
    <!-- 这是根节点 -->
    <h4 class="complain-title">咨询与投诉</h4>
    <p>客服热线：<b>400-0411-001（服务时间：工作日 09:00-21:00）</b></p>
    <p>客服邮箱：<b>kefu@haojiyoujijin.com</b></p>
    <img src="@/assets/img/about-10.jpg">
  </div>
</template>

<script>
export default {
  name: "Complain"
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "@/assets/styles/vars.scss";
.complain{
  .complain-title{
    font-size: 15px;
    padding-bottom: 10px;
    padding-top: 5px;
    font-weight: normal;
    border-bottom: 1px solid $color-back-second;
    margin-bottom: 15px;
  }
  p{
    font-size: 14px;
    padding-bottom: 10px;
    color:$color-font-second;

    b{
      font-weight: normal;
      color: $color-primary;
      margin-left: 10px;
    }
  }
  img{
    display: block;
    width: 70%;
    margin: 0 auto;
  }
}
</style>
