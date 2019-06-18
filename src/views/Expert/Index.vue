<template>
  <div class="expert">
    <!-- 这是根节点 -->
    <div class="shop-search">
      <div class="shop-search-inner">
        <div class="search-box">

          <el-row class="search-part">
            <el-col :span="2" class="search-title">服务主体:</el-col>
            <el-col :span="22">
              <el-radio-group v-model="radio2" size="medium" @change="changeFundType">
                <el-radio-button :label="item" border v-for="(item,key) in dataService" :key="key">
                  {{item}}
                  <b>/</b>
                </el-radio-button>
              </el-radio-group>
            </el-col>
          </el-row>


          <el-row class="search-part industry">
            <el-col :span="2" class="search-title">专长领域:</el-col>
            <el-col :span="22">
              <el-radio-group v-model="radio0" size="medium" @change="changeFundType">
                <el-radio-button :label="item" border v-for="(item,key) in dataType" :key="key">
                  {{item}}
                  <b>/</b>
                </el-radio-button>
              </el-radio-group>
            </el-col>
          </el-row>
          <div class="private-search-box" v-loading="loading">
              <el-scrollbar :native="false">
                <!--以下是要滚动的内容-->
                <el-radio-group v-model="radio3" size="mini" @change="changeFundType" style="padding:5px;">
                  <el-radio-button 
                  :label="item" 
                  border
                  v-for="(item,key) in dataArea"
                  :key="key">
                  {{item}}
                  </el-radio-button>
                </el-radio-group>
              </el-scrollbar>
          </div>

          
        </div>
      </div>
    </div>

    <div class="project-list">
      <div class="project-list-inner">
        <el-row>
          <el-col :span="18">
            <el-table
              v-loading="loading"
              stripe
              :data="tableData"
              style="width: 100%; border-top:2px solid #3a72e1"
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
          </el-col>

          <el-col :span="5" :offset="1">
            <div class="hot">
              <h3>热门推荐</h3>
              <el-card v-for="(item,key) in 5" :key="key">
                <p>王永初<span>专家<img src="@/assets/img/indexElse_11.png" alt=""></span></p>
                <h5><i class="el-icon-location-information"></i>哈尔滨工业大学</h5>
              </el-card>
            </div>
          </el-col>
        </el-row>
          
				
      </div>
    </div>



  </div>
</template>

<script>

export default {
  name: "expert-index",
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
      radio0: "全部",
      dataType: [
        "全部",
        "新材料",
        "海洋生物",
        "自动化",
        "船舶制造及配套",
        "精密机械",
        "其他"
      ],
      //发布时间
      radio1: "全部",
      dataTime: ["全部", "三天内发布", "一周内发布", "一月内发布"],
      //所在地区
      radio2: "全部",
      dataService: [
        "全部",
        "专家",
        "高技能人才",
      ],
      radio3: "全部",
      dataArea: [
        "全部",
        "环翠区",
        "乳山市",
        "文登区",
        "荣成市",
        "临港区",
        "高区",
        "经区"
      ],
      radio4: "全部",
      dataStatus:[
        "全部",
        "待合作",
        "合作中",
        "合作成功"
      ],
      //else
      // cur: 0,
      // dataTitle: ["进行中", "合作中", "已结束"],

      // curSort: 0,
      // up: true,
      // dataSort: ["综合", "参与人数", "悬赏金额"],

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
.expert {
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
.private-search-box .el-scrollbar{
	height: 100%;
}
.private-search-box .el-scrollbar .el-scrollbar__wrap{
	overflow: scroll;
	overflow-x:auto;
}
.expert {
  .el-radio-button {
    position: relative;
    b {
      position: absolute;
      right: -15px;
      color: $color-font-fourth;
    }
  }
  .el-radio-button__inner {
    border: none 0;
    border-radius: 4px;
    padding: 8px 15px;
    margin: 0 15px;
  }
  .industry .is-active .el-radio-button__inner{
    transition: opacity 2s linear;
    position: relative;
    &:before{
      content:'';
      position: absolute;
      left: 50%;
      margin-left:-5px;
      bottom:-10px;
      display:block;
      width: 0; 
      height: 0;
      border-width: 5px;
      border-style: solid;
      border-color:$color-primary transparent transparent transparent;
      transition: opacity 2s linear;
    }
  }
  .el-radio-button:first-child .el-radio-button__inner {
    border: none 0;
    border-radius: 4px;
  }
  .el-radio-button:last-child .el-radio-button__inner {
    border: none 0;
    border-radius: 4px;
  }
}
</style>

