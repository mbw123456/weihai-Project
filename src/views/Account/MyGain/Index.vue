<template>
  <div class="account-project">
      <h1 class="project-title">我的成果 <el-button @click="gotoPublish" type="warning" size="mini" style="float:right; margin-top:11px; margin-right:40px;">发布新成果</el-button></h1>
      <h2 class="project-title-small"><span>匹配推荐的需求</span></h2>
      <ul class="project-list">
        <li v-for="item in 3" :key="item">
          <p>金属表面喷涂技术
            <el-tag
              size="small"
              v-for="item in tags"
              :key="item"
              type="warning">
              {{item}}
            </el-tag>
          </p>
          <el-row>
            <el-col :span="4">
              <h6>可量产</h6>
              <h5>技术成熟度</h5>
            </el-col>
            <el-col :span="4">
              <h6>自动化</h6>
              <h5>行业</h5>
            </el-col>
            <el-col :span="4">
              <h6>专利</h6>
              <h5>专利类型</h5>
            </el-col>
            <el-col :span="4">
              <h4>20</h4>
              <h5>关注度</h5>
            </el-col>
            <el-col :span="4">
              <h6>待提交</h6>
              <h5>状态</h5>
            </el-col>
            <el-col :span="4">
              <el-button @click="gotoPublish(item)" type="primary" plain size="medium" style="margin-top:5px;">编辑</el-button>
            </el-col>
          </el-row>
        </li>
      </ul>

  </div>
</template>

<script>

export default {
  name: "account-project",
  data() {
    return {
      //获取public路径
      publicPath: process.env.BASE_URL,
      tags:['自动化','强粘合性','需耐腐蚀'],
      imgBox:['/img/weihai-center_11.png','/img/weihai-center_14.png'],
    };
  },
  methods: {
    handleClick(tab, event) {
        console.log(tab, event);
    },
    gotoPublish(index) {
      console.log(index);
      this.$router.push({
        name: "gain-publish",
        params: {
          id: index,
        }
      });
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
  .project-list{

    li{
      margin: 15px 20px;
      padding: 10px 0;
      border-bottom: 1px solid $color-back-second;

      p{
        font-size: 15px;

        .el-tag{
          margin-left: 10px;
        }
      }
      .el-row{
        padding: 10px;
        text-align: center;

        h4{
          font-size: 20px;
          height: 30px;
          line-height: 30px;
          font-weight: normal;
          color: $color-primary;

          span{
            font-size: 14px;
            margin-left: 5px;
            font-weight: normal;
            color: $color-font-third;
          }
        }
        h6{
          font-size: 16px;
          height: 30px;
          line-height: 30px;
          font-weight: normal;
          color: $color-primary;
        }
        h5{
          font-weight: normal;
          font-size: 14px;
          color: $color-font-third;
        }
      }
    }
  }
}
</style>
