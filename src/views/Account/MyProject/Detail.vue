<template>
  <div class="need-detail">
      <ul class="project-list">
        <li>
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
            <el-col :span="5">
              <h4>15<span>万</span></h4>
              <h5>计划投入(元)</h5>
            </el-col>
            <el-col :span="5">
              <h4>3<span>个月</span></h4>
              <h5>解决期限</h5>
            </el-col>
            <el-col :span="5">
              <h6>委托开发</h6>
              <h5>合作方式</h5>
            </el-col>
            <el-col :span="5">
              <h4>2019-15-11</h4>
              <h5>发布时间</h5>
            </el-col>
            <el-col :span="4">
              <el-button type="primary" plain size="medium" style="margin-top:5px;">详情</el-button>
            </el-col>
          </el-row>
        </li>
      </ul>

      <div class="step">
        <el-steps :active="1">
          <el-step title="项目申请" description="2019-04-05" icon="el-icon-success"></el-step>
          <el-step title="审核成功" description="2019-04-10" icon="el-icon-success"></el-step>
        </el-steps>
      </div>

      <div class="tab">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="推荐匹配" name="first">
            
            <h2 class="project-title-small" style="padding-left:0;"><span>专家匹配</span></h2>
            <el-table
              v-loading="loading"
              stripe
              :data="tableData"
              >
              <el-table-column
                label="姓名"
                width="300">
                <template slot-scope="scope">
                  <el-button type="text" size="">{{scope.row.title}}</el-button>
                </template>
              </el-table-column>

              <el-table-column
                prop="desc"
                label="所属机构"
                >
              </el-table-column>

              <el-table-column
                prop="address"
                label="专长领域"
                >
              </el-table-column>

              <el-table-column
                prop="day"
                label="工作经验"
                >
              </el-table-column>

              <el-table-column
                label="操作"
                width="100">
                <template slot-scope="scope">
                  <el-button @click.stop="jumpTo(scope.row)" type="text" size="">详情</el-button>
                </template>
              </el-table-column>
            </el-table>

            <h2 class="project-title-small" style="padding-left:0; margin-top:20px;"><span>成果匹配</span></h2>
            <el-table
              v-loading="loading"
              stripe
              :data="tableData"
              >
              <el-table-column
                label="姓名"
                width="300">
                <template slot-scope="scope">
                  <el-button type="text" size="">{{scope.row.title}}</el-button>
                </template>
              </el-table-column>

              <el-table-column
                prop="desc"
                label="所属机构"
                >
              </el-table-column>

              <el-table-column
                prop="address"
                label="专长领域"
                >
              </el-table-column>

              <el-table-column
                prop="day"
                label="工作经验"
                >
              </el-table-column>

              <el-table-column
                label="操作"
                width="100">
                <template slot-scope="scope">
                  <el-button @click.stop="jumpTo(scope.row)" type="text" size="">详情</el-button>
                </template>
              </el-table-column>
            </el-table>

          </el-tab-pane>
          <el-tab-pane label="关注(4)" name="second">

            <el-table
              v-loading="loading"
              stripe
              :data="tableData"
              >
              <el-table-column
                label="姓名"
                width="300">
                <template slot-scope="scope">
                  <el-button type="text" size="">{{scope.row.title}}</el-button>
                </template>
              </el-table-column>

              <el-table-column
                prop="desc"
                label="所属机构"
                >
              </el-table-column>

              <el-table-column
                prop="address"
                label="专长领域"
                >
              </el-table-column>

              <el-table-column
                prop="day"
                label="工作经验"
                >
              </el-table-column>

              <el-table-column
                label="操作"
                width="100">
                <template slot-scope="scope">
                  <el-button @click.stop="jumpTo(scope.row)" type="text" size="">详情</el-button>
                </template>
              </el-table-column>
            </el-table>

          </el-tab-pane>
        </el-tabs>
      </div>

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
      activeName: 'first',
      tableData: [
        {
          title: "船舶建造于设计艺术",
          desc: "新材料/高分子材料",
          address: "环翠区",
          day: "今天发布",
          button: "详情"
        },
        {
          title: "船舶建造于设计艺术",
          desc: "新材料/高分子材料",
          address: "环翠区",
          day: "今天发布",
          button: "详情"
        },
        {
          title: "船舶建造于设计艺术",
          desc: "新材料/高分子材料",
          address: "环翠区",
          day: "今天发布",
          button: "详情"
        },
      ],

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
.need-detail {
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
  .step{
    padding: 20px 0;
    margin:0 20px;
    border-bottom:1px solid #eee;
  }
  .el-steps{
    width: 200px;
  }
  .tab{
    padding: 20px 0;
    margin:0 20px;
  }
}
</style>
<style lang="scss">
.need-detail {
    .el-step__icon-inner[class*=el-icon]:not(.is-status){
      font-size: 15px;
    }
    .el-step__head.is-finish{
      color: #999;
    }
    .el-step__title.is-finish{
      color: #999;
      font-size: 14px;
    }
    .el-step__description.is-finish{
      color: #999;
    }
    .el-step__head.is-process{
      color: #3a72e1;
    }
    .el-step__title.is-process{
      color: #3a72e1;
      font-size: 14px;
    }
    .el-step__description.is-process{
      color: #3a72e1;
    }
}
</style>

