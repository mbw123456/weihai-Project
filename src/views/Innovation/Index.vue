<template>
  <div class="innovation">
    <!-- 这是根节点 -->

    <div class="project-list">
      <div class="project-list-inner">

        <el-row>
          <el-col :span="8">  
            <div >
              <el-input placeholder="请输入搜索内容" v-model="input2">
                <el-button slot="append" icon="el-icon-search"></el-button>
              </el-input>
            </div>
          </el-col>
          <el-col :span="16" style="text-align:right;">
            <el-button @click="gotoList" type="primary">免费互助</el-button>
          </el-col>
        </el-row>

        <ul class="innovation-list">
          <li v-for="(item,key) in tableData" :key="key">
            <el-card>
              <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image">
              <div style="padding: 15px;">
                <h4>{{item.title}}</h4>
              </div>
            </el-card>
          </li>
        </ul>
        



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
  name: "innovation-index",
  //   components:{
  // 	  VueEvent,
  //   },
  data() {
    return {
      //获取public路径
      publicPath: process.env.BASE_URL,
      //专题分类
      input2:'',
      



      tableData: [
        {
          title: "船舶建造于设计艺术船舶建造于设计艺术船舶建造于设计艺术船舶建造于设计艺术",
          desc: "新材料/高分子材料高分子材料高分子材料高分子材料高分子材料高分子材料",
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
        {
          title: "船舶建造于设计艺术船舶建造于设计艺术",
          desc: "新材料/高分子材料高分子材料高分子材料高分子材料高分子材料高分子材料",
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
    gotoList(){
      // console.log(a);
      this.$router.push({
        path: "innovationList",
        // query: {
        //   code: index,
        // }
      });
    }
    //页面跳转加参数
    // openDetails(row, column, event) {
    //   this.pramfundtype = row.pramfundtype;
    //   // VueEvent.$emit('shop_pramfundtype',this.pramfundtype);
    //   // this.$router.push('funddetails/'+ row.f_info_windcode +'');
    //   this.$router.push({
    //     path: "funddetails",
    //     query: {
    //       fundcode: row.f_info_windcode,
    //       fundtype: row.pramfundtype
    //     }
    //   });
    // },
    // sendCodeValid(formName) {
    //   this.sendCode(formName);
    // },
    // sendCode(formName) {
    //   if (this.timeDisable == false) {
    //     this.time = 60;
    //     this.timeDisable = true;
    //     this.timer();
    //   }
    // },
    // timer() {
    //   if (this.time > 0) {
    //     this.time--;
    //     this.timeText = this.time + "s后重新获取";
    //     setTimeout(this.timer, 1000);
    //     this.timeDisable = true;
    //   } else {
    //     this.timeText = "发送验证码";
    //     this.timeDisable = false;
    //   }
    // },
    // submitForm(formName) {
    //   this.$refs[formName].validate((valid) => {
    //     if (valid) {
    //       this.$message({
    //         showClose: true,
    //         type: 'success',
    //         center:true,
    //         message: 'submit!'
    //       });
    //     } else {
    //       console.log('error submit!!');
    //       return false;
    //     }
        
		// 	});
			
		// },
  },
  mounted() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "@/assets/styles/vars.scss";
.innovation {
  border-top: 1px solid $color-back-second;
  // min-height: 900px;
  .innovation-list{
    overflow: hidden;
    margin: 0 -20px;
    padding: 15px 0;
    li{
      float: left;
      width: 25%;
      box-sizing: border-box;
      padding: 10px 20px;
    }
  }
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
      box-sizing: border-box;
      padding: 15px 25px;
      background-color: #fff;

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
.innovation {
  .el-card__body{
    padding: 0;
    img{
      width:100%;
      height: 200px;
    }
    h4{
      font-size: 16px;
      font-weight: normal;
      margin-bottom: 10px;
      overflow : hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;

    }
    h5{
      font-size: 12px;
      font-weight: normal;
      color: $color-font-third;
      overflow : hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;

    }
  }
}
</style>

