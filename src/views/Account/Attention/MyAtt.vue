<template>
  <div class="my-att">
      <h1 class="project-title">我关注的 </h1>
      <el-table
        v-loading="loading"
        stripe
        :data="tableData"
        >
        <el-table-column
          prop="day"
          label="关注时间"
          align="center"
          >
        </el-table-column>

        <el-table-column
          label="名称"
          align="center"
          width="300">
          <template slot-scope="scope">
            <el-button type="text" size="">{{scope.row.title}}</el-button>
          </template>
        </el-table-column>

        <el-table-column
          prop="desc"
          align="center"
          label="类型"
          >
        </el-table-column>

      </el-table>

  </div>
</template>

<script>

export default {
  name: "my-att",
  data() {
    return {
      //获取public路径
      publicPath: process.env.BASE_URL,
      tableData: [
        {
          title: "威海永新技术服务有限公司",
          desc: "服务公司",
          day: "2019-03-17",
        },
        {
          title: "威海永新技术服务有限公司",
          desc: "服务公司",
          day: "2019-03-17",
        },
        {
          title: "威海永新技术服务有限公司",
          desc: "服务公司",
          day: "2019-03-17",
        },
      ],
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
.my-att {
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
