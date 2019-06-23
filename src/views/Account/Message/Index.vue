<template>
  <div class="account-message">
      <h1 class="project-title">系统消息 </h1>
      <ul class="messageBox">
        <li v-for="item in 3" :key="item">
          <h5><el-button type="text">烟台新时代健康产业有限公司</el-button>关注了我</h5>
          <h6>2019-03-17  15:23</h6>
        </li>
        <li v-for="item in 3" :key="item">
          <h5><el-button type="text">烟台新时代健康产业有限公司</el-button>关注了<el-button type="text">金属表面喷涂技术</el-button>需求项目</h5>
          <h6>2019-03-17  15:23</h6>
        </li>
      </ul>

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
    // handleClick(tab, event) {
    //     console.log(tab, event);
    // },
    // gotoPublish(index) {
    //   console.log(index);
    //   this.$router.push({
    //     name: "gain-publish",
    //     params: {
    //       id: index,
    //     }
    //   });
    // },
  },
  mounted() {
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "@/assets/styles/vars.scss";
.account-message {
  position: relative;
  background: url(~@/assets/img/weihai-center_07.png) no-repeat 700px 70px;
  background-size: 150px;
  background-color: #fff;
  min-height: 590px;
  box-sizing: border-box;
  border: 1px solid $color-back-second;

  .project-title{
    font-size: 16px;
    color: $color-primary;
    line-height: 50px;
    padding: 0 15px;
    border-bottom: 1px solid $color-back-second;
    background: url(~@/assets/img/weihai-center_03.png) no-repeat 800px center;
    background-size: 40px;
  }
  .project-title-small{
    font-size: 15px;
    padding: 15px 20px;

    span{
      border-bottom:2px solid $color-primary;
      padding-bottom: 5px;
    }
  }
  .messageBox{
    li{
      padding: 10px 0;
      margin: 0 15px;
      border-bottom: 1px solid #eee;

      &:last-child{
        border: none 0;
      }

      h5{
        font-weight: normal;
        color: $color-font-second;

        .el-button{
          margin-right:10px;
        }
      }
      h6{
        font-size: 12px;
        color: $color-font-third;
        font-weight: normal;
      }

    }
  }
}
</style>
