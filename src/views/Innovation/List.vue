<template>
  <div class="innovation-list">
    <!-- 这是根节点 -->

    <div class="project-list">
      <div class="project-list-inner">
            <el-table
              v-loading="loading"
              stripe
              :data="tableData"
              style="width: 100%; border-top:2px solid #3a72e1"
              >
              <el-table-column
                label="姓名"
                width="700">
                <template slot-scope="scope">
                  <el-button @click.stop="jumpToDetail(scope.row)" type="text" size="">{{scope.row.title}}</el-button>
                </template>
              </el-table-column>

              <el-table-column
                prop="type"
                label="类别"
                >
              </el-table-column>

              <el-table-column
                prop="time"
                label="发布时间"
                >
              </el-table-column>


            </el-table>

            <el-pagination
              style="width: 100%; margin: 30px auto; text-align: center;"
              background
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="cur_page"
              :page-size="10"
              layout="total, prev, pager, next, jumper"
              :total="totalnum">
            </el-pagination>

          
				
      </div>
    </div>



  </div>
</template>

<script>

export default {
  name: "innovation-list",
  //   components:{
  // 	  VueEvent,
  //   },
  data() {
    var validateMobile = (rule, value, callback) => {
      if (value.length != 11) {
        callback(new Error("手机号位数不正确"));
      } else {
        callback();
      }
    };
    return {
      //获取public路径
      publicPath: process.env.BASE_URL,
      //专题分类

      tableData: [
        {
          title: "船舶建造于设计艺术",
          type: "新材料/高分子材料",
          time: "2019-07-28",
        },
        {
          title: "船舶建造于设计艺术船舶建造于设计艺术船舶建造于设计艺术",
          type: "新材料/高分子材料",
          time: "2019-07-28",
        },
        {
          title: "船舶建造于设计艺术",
          type: "新材料/高分子材料",
          time: "2019-07-28",
        },
        {
          title: "船舶建造于设计艺术船舶建造于设计艺术船舶建造于设计艺术",
          type: "新材料/高分子材料",
          time: "2019-07-28",
        },
        {
          title: "船舶建造于设计艺术船舶建造于设计艺术船舶建造于设计艺术",
          type: "新材料/高分子材料",
          time: "2019-07-28",
        },
        {
          title: "船舶建造于设计艺术",
          type: "新材料/高分子材料",
          time: "2019-07-28",
        },
        {
          title: "船舶建造于设计艺术船舶建造于设计艺术船舶建造于设计艺术",
          type: "新材料/高分子材料",
          time: "2019-07-28",
        },
        {
          title: "船舶建造于设计艺术",
          type: "新材料/高分子材料",
          time: "2019-07-28",
        },
        {
          title: "船舶建造于设计艺术船舶建造于设计艺术船舶建造于设计艺术",
          type: "新材料/高分子材料",
          time: "2019-07-28",
        },
        {
          title: "船舶建造于设计艺术",
          type: "新材料/高分子材料",
          time: "2019-07-28",
        }
      ],

      loading: false,
      cur_page:1,
      totalnum:100,

      // timeText: "发送验证码",
      // timeDisable: false,
      // form: {
      //   bankPhone: "",
      //   checkCode: "",
      //   desc: ""
      // },
      // rules: {
      //   bankPhone: [
      //     { required: true, message: "请输入手机号", trigger: "change" },
      //     { validator: validateMobile, trigger: "change" }
      //   ],
      //   checkCode: [
      //     { required: true, message: "请输入验证码", trigger: "change" },
      //     { min: 4, max: 6, message: "验证码位数不正确", trigger: "change" }
      //   ]
      // },
      // needList: [
      //   {
      //     url:'/img/weihai-need_07.png',
      //     title: "码垛机器人",
      //     address: "不限",
      //     way: "价格面议",
      //   },
      //   {
      //     url:'/img/weihai-need_07.png',
      //     title: "码垛机器人",
      //     address: "不限",
      //     way: "价格面议",
      //   },
      // ],
    };
  },
  methods: {
    //分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    changeFundType(item) {
      console.log(item);
    },
    jumpToDetail(index) {
      // console.log(a);
      this.$router.push({
        path: "innovationDetail",
        query: {
          code: index,
        }
      });
    },
  },
  mounted() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "@/assets/styles/vars.scss";
.innovation-list {
  border-top: 1px solid $color-back-second;
  // min-height: 900px;
  .shop-search {
    background-color: #fff;
    margin-bottom: 10px;
    padding-bottom: 15px;

    .shop-search-inner {
      width: 1140px;
      margin: 0 auto;

      .private-search-box {
        margin-left: 108px;
        box-sizing: border-box;
        margin-top: 10px;
        height: 100px;
        border: 1px solid $color-back-first;
        padding-right: 0;
        border-radius: 5px;
        overflow: hidden;
        background-color: $color-back-third;
      }
      .search-box {
        .search-part {
          padding-top: 15px;
          

          .search-title {
            font-size: 14px;
            font-weight: bold;
            line-height: 30px;
            color: $color-font-second;
          }
          

          // a{
          // 	font-size: 14px;
          // 	padding: 6px 15px;
          // 	color: $color-font-second;
          // 	border-radius: 3px;
          // 	border: 1px solid #fff;
          // 	margin-left: 5px;

          // 	&:hover{
          // 		color:$color-primary;
          // 	}
          // 	&.add{
          // 		background-color: $color-primary-back;
          // 		color: $color-primary;
          // 		border: 1px solid $color-primary-border;
          // 	}
          // }
        }
      }
    }
  }
  .project-list {
    width: 100%;
    min-height: 700px;
    margin-top: 40px;
    padding-bottom: 30px;

    .project-list-inner {
      width: 1140px;
      margin: 0 auto;

      .hot{
        background-color: #fff;
        border-top: 2px solid $color-primary;
        padding-bottom: 15px;

        h3{
          color: $color-primary;
          padding: 0px 15px;
          font-size: 15px;
          line-height: 47px;
          border-bottom: 1px solid $color-back-second;
        }
        .el-card{
          margin: 15px 15px;

          p{
            color: $color-primary;
            span{
              font-size: 12px;
              padding: 3px 10px;
              background-color: $color-primary-second;
              margin-left: 5px;
              vertical-align: 2px;
              border-radius: 4px;
              img{
                width: 12px;
                vertical-align: -3px;
              }
            }
          }
          h5{
            padding-top: 5px;
            font-weight: normal;
            color: $color-font-third;
            font-size: 14px;

          }
        }
        
      }

    }
  }
}
</style>
<style lang="scss">
@import "@/assets/styles/vars.scss";
.innovation-list {
}
</style>

