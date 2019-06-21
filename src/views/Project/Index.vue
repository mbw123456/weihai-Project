<template>
  <div class="project">
    <!-- 这是根节点 -->
    <div class="shop-search">
      <div class="shop-search-inner">
        <div class="search-box">

          <!-- <el-row class="search-part">
            <el-col :span="2" class="search-title">所在地区:</el-col>
            <el-col :span="22">
              <el-radio-group v-model="radio2" size="medium" @change="changeFundType">
                <el-radio-button :label="item" border v-for="(item,key) in dataArea" :key="key">
                  {{item}}
                  <b>/</b>
                </el-radio-button>
              </el-radio-group>
            </el-col>
          </el-row> -->

          <el-row class="search-part">
            <el-col :span="2" class="search-title">发布时间:</el-col>
            <el-col :span="22">
              <el-radio-group v-model="time_type" size="medium" @change="changeTimeType">
                <el-radio-button :label="item.value" border v-for="(item,key) in dataTime" :key="key">
                  {{item.time_name}}
                  <b>/</b>
                </el-radio-button>
              </el-radio-group>
            </el-col>
          </el-row>

          <el-row class="search-part industry">
            <el-col :span="2" class="search-title">所属行业:</el-col>
            <el-col :span="22">
              <el-radio-group v-model="industry_one" size="medium" @change="changeIndustryOne">
                <el-radio-button :label="item.id" border v-for="(item,key) in industry_one_list" :key="key">
                  {{item.industry_name}}
                  <b>/</b>
                </el-radio-button>
              </el-radio-group>
            </el-col>
          </el-row>
          <div v-if="industry_one != 0" class="private-search-box" v-loading="loading">
              <el-scrollbar :native="false">
                <!--以下是要滚动的内容-->
                <el-radio-group v-model="industry_two" size="mini" @change="changeIndustryTwo" style="padding:5px;">
                  <el-radio-button 
                  :label="item.id" 
                  border
                  v-for="(item,key) in industry_two_list"
                  :key="key">
                  {{item.industry_name}}
                  </el-radio-button>
                </el-radio-group>
              </el-scrollbar>
          </div>

          <el-row class="search-part">
            <el-col :span="2" class="search-title">项目状态:</el-col>
            <el-col :span="22">
              <el-radio-group v-model="projectstatus" size="medium" @change="changeStatusType">
                <el-radio-button :label="item.value" border v-for="(item,key) in dataStatus" :key="key">
                  {{item.name}}
                  <b>/</b>
                </el-radio-button>
              </el-radio-group>
            </el-col>
          </el-row>
          
        </div>
      </div>
    </div>

    <div class="project-list">
      <div class="project-list-inner">
				<el-table
					v-loading="loading"
					stripe
					:data="tableData"
					style="width: 100%;min-height:400px;"
					>
<!-- {
          title: "船舶建造于设计艺术",
          desc: "新材料/高分子材料",
          address: "环翠区",
          day: "今天发布",
          button: "详情"
        }, -->
					<el-table-column
						label="项目名称"
						width="400">
            <template slot-scope="scope">
							<el-button @click.stop="jumpToDetail(scope.$index)" type="text" size="">{{scope.row.project}}</el-button>
						</template>
					</el-table-column>

					<el-table-column
						prop="industry_name_show"
						label="所属行业"
						>
					</el-table-column>

          <!-- <el-table-column
						prop="address"
						label="所在地区"
						>
					</el-table-column> -->

					<el-table-column
						prop="createdate"
						label="发布时间"
						>
					</el-table-column>

          <el-table-column
						prop="status_show"
						label="项目状态"
						>
					</el-table-column>

					<el-table-column
						label="操作"
						width="150">
						<template slot-scope="scope">
							<el-button @click.stop="jumpTo(scope.row)" type="text" size="">详情</el-button>
						</template>
					</el-table-column>
				</el-table>
				

				<el-pagination
					style="width: 1140px; margin: 30px auto; text-align: center;"
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
// import VueEvent from '@/model/VueEvent.js'

export default {
  name: "project-index",
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
      industry_one: 0,
      industry_one_list: [],
      industry_two: 0,
      industry_two_list: [],
      //发布时间
      time_type: "all",
      //dataTime: [{time_name:'全部', value:'ALL'}time_name"全部", "三天内发布", "一周内发布", "一月内发布"],
      dataTime: [
        {time_name: '全部', value: 'all'}, 
        {time_name:'三天内发布', value:'three_day'}, 
        {time_name:'一周内发布', value:'week'}, 
        {time_name:'一月内发布', value:'month'}
      ],
      //所在地区
      radio2: "全部",
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
      radio3: "全部",
      projectstatus: "all",
      dataStatus:[
        {name: '全部', value: 'all'},
        {name: '待合作', value: 'W'},
        {name: '合作中', value: 'M'},
        {name: '合作成功', value: 'S'}
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
    };
  },
  created() {
    this.getRequirementsList()
    this.getIndustryInfoListOne()
    // this.getDictDataList()
  },
  methods: {
    //分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    },
    changeFundType(item) {
      console.log(item)
    },
    changeTimeType(item) {
      this.getRequirementsList()
    },
    changeStatusType(){
      this.getRequirementsList()
    },
    changeIndustryOne(item){
      console.log('changeIndustryOne:' + item)
      this.$httpPost("/tbIndustryInfo/industryInfoListTwo",{parent_id: item}).then(res => {
          this.industry_two_list = res.rows
          this.industry_two = 0
          this.getRequirementsList()
				}).catch(err => {
					//错误的回调
					console.log("访问接口失败");
      });
    },
    changeIndustryTwo(item){
      this.getRequirementsList()
    },
    jumpToDetail(index) {
      // console.log(a);
      this.$router.push({
        path: "projectDetail",
        query: {
          code: index,
        }
      });
    },
    getRequirementsList() {
      this.$httpPost("/tbRequirements/requireList",
        {
          time_type: this.time_type,
          projectstatus: this.projectstatus,
          industry_one: this.industry_one,
          industry_two: this.industry_two
        }).then(res => {
          this.tableData = res.rows
          this.totalnum = res.total
				}).catch(err => {
					//错误的回调
					// eslint-disable-next-line no-console
					console.log("访问接口失败");
      });
    },
    getIndustryInfoListOne() {
      this.$httpPost("/tbIndustryInfo/industryInfoListOne",).then(res => {
          this.industry_one_list = res.rows
				}).catch(err => {
					//错误的回调
					console.log("访问接口失败");
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
.project {
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
      border-top: 2px solid $color-primary;

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
.project {
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

