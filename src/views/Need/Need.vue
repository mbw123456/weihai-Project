<template>
  <div class="need">
    <!-- 这是根节点 -->
    <div class="need-breadcrumb">
      <div class="need-breadcrumb-inner">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>找需求</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <div class="shop-search">
      <div class="shop-search-inner">
        <div class="search-box">
          <el-row class="search-part">
            <el-col :span="2" class="search-title">专题分类:</el-col>
            <el-col :span="22">
              <el-radio-group v-model="radio0" size="medium" @change="changeFundType">
                <el-radio-button :label="item" border v-for="(item,key) in dataType" :key="key">
                  {{item}}
                  <b>/</b>
                </el-radio-button>
              </el-radio-group>
            </el-col>
          </el-row>

          <el-row class="search-part">
            <el-col :span="2" class="search-title">发布时间:</el-col>
            <el-col :span="22">
              <el-radio-group v-model="radio1" size="medium" @change="changeFundType">
                <el-radio-button :label="item" border v-for="(item,key) in dataTime" :key="key">
                  {{item}}
                  <b>/</b>
                </el-radio-button>
              </el-radio-group>
            </el-col>
          </el-row>

          <el-row class="search-part">
            <el-col :span="2" class="search-title">所在地区:</el-col>
            <el-col :span="22">
              <el-radio-group v-model="radio2" size="medium" @change="changeFundType">
                <el-radio-button :label="item" border v-for="(item,key) in dataArea" :key="key">
                  {{item}}
                  <b>/</b>
                </el-radio-button>
              </el-radio-group>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>

    <div class="private-list">
      <div class="private-list-inner">
        <el-row>
          <el-col :span="16">
            <div class="need-left-title">
              <a
                v-for="(item,key) in dataTitle"
                :key="key"
                @click="cur=key"
                :class="{active:cur==key}"
              >{{item}}</a>
            </div>
            <div class="need-left-sort">
              排序方式:
              <a
                v-for="(item,key) in dataSort"
                :key="key"
                @click="curSort=key"
                :class="{active:curSort==key}"
              >
                <span v-if="key==0">{{item}}</span>
                <span v-else @click="key==curSort?up=!up:null">
                  <b>|</b>
                  {{item}}
                  <i :class="{iActive:key==curSort?up:null}" class="el-icon-sort-up"></i>
                  <i :class="{iActive:key==curSort?!up:null}" class="el-icon-sort-down"></i>
                </span>
              </a>
            </div>
            <ul class="need-left-list">
              <li v-for="(item,key) in newBoxList" :key="key">
                <el-row class="list-top">
                  <el-col :span="12">
                    <h3>
                      {{item.title}}
                      <span>{{item.way}}</span>
                    </h3>
                  </el-col>
                  <el-col :span="8">
                    <h4>
                      {{item.name}}
                      <span>{{item.phone}}</span>
                    </h4>
                  </el-col>
                  <el-col :span="4">
                    <b
                      :style="{backgroundColor:(item.desc=='个人发布'? '#e4ebf9':null),color:(item.desc=='个人发布'? '#3172f4':null)}"
                    >企业发布</b>
                  </el-col>
                </el-row>
                <el-row class="list-bottom">
                  <el-col :span="18">
                    <i class="el-icon-location-outline"></i>
                    <span>{{item.address}}</span>|
                    <span>{{item.day}}</span>
                  </el-col>
                  <el-col :span="6">
                    <el-button type="text">立即参与</el-button>
                  </el-col>
                </el-row>
              </li>
            </ul>
            <el-pagination
              style="width: 100%; margin: 30px auto; text-align: center;"
              background
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="1"
              :page-size="10"
              layout="total, prev, pager, next, jumper"
              :total="50"
            ></el-pagination>
          </el-col>
          <el-col :offset="1" :span="7">
            <div class="need-right">
              <p class="need-right-title">快速发布需求</p>
              <el-form
                :model="form"
                :hide-required-asterisk="true"
                :rules="rules"
                ref="ruleForm"
                class="register-form"
              >
                <el-form-item>
                  <el-input type="textarea" v-model="form.desc" placeholder="请简单描述您的需求"></el-input>
                </el-form-item>
                <el-form-item prop="bankPhone">
                  <el-input v-model="form.bankPhone" autocomplete="off" placeholder="请输入手机号"></el-input>
                </el-form-item>
                <el-form-item prop="checkCode" ref="validateCode">
                  <el-input
                    v-model="form.checkCode"
                    autocomplete="off"
                    style="width:160px;"
                    placeholder="验证码"
                  ></el-input>
                  <el-button
                    type="primary"
                    plain
                    @click="sendCodeValid('ruleForm')"
                    :disabled="timeDisable"
                    style="float:right; width:115px;"
                  >{{timeText}}</el-button>
                </el-form-item>
                <p class="need-form-p">收不到验证码？请拨打：400-000-0000</p>
                <el-form-item>
                  <el-button type="primary" style="width:100%;" @click="submitForm('ruleForm')">免费发布</el-button>
                </el-form-item>
              </el-form>
            </div>

            <div class="need-right-img">
              <img src="@/assets/img/weihai-need_03.png" alt="">
            </div>

            <div class="need-right">
              <div class="need-right-service-title">
                <p>推荐服务</p>
                <el-button type="text">更多>></el-button>
              </div>
              <ul class="need-right-service-list">
                <li v-for="(item,key) in needList" :key="key">
                  <el-row>
                    <el-col :span="8">
                      <img :src="item.url" alt="">
                    </el-col>
                    <el-col :offset="1" :span="15">
                      <p>{{item.title}}</p>
                      <div>
                        <i class="el-icon-location-outline"></i>
                        <span>{{item.address}}</span>
                        <span style="float:right; color:#ffa92a;">{{item.way}}</span>
                      </div>
                    </el-col>
                  </el-row>
                  
                </li>
              </ul>
            </div>

          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
// import VueEvent from '@/model/VueEvent.js'

export default {
  name: "Need",
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
      //else
      cur: 0,
      dataTitle: ["进行中", "合作中", "已结束"],

      curSort: 0,
      up: true,
      dataSort: ["综合", "参与人数", "悬赏金额"],

      newBoxList: [
        {
          title: "新材料新材料新材料",
          desc: "企业",
          name: "赵**",
          phone: "13112445671",
          way: "面议",
          address: "环翠区",
          day: "今天发布",
          button: "立即参与"
        },
        {
          title: "新材料新材料新材料",
          desc: "个人",
          name: "赵**",
          phone: "13112445671",
          way: "面议",
          address: "环翠区",
          day: "今天发布",
          button: "立即参与"
        },
        {
          title: "新材料新材料新材料",
          desc: "企业",
          name: "赵**",
          phone: "13112445671",
          way: "面议",
          address: "环翠区",
          day: "今天发布",
          button: "立即参与"
        },
        {
          title: "新材料新材料新材料",
          desc: "企业",
          name: "赵**",
          phone: "13112445671",
          way: "面议",
          address: "环翠区",
          day: "今天发布",
          button: "立即参与"
        }
      ],

      loading: true,

      timeText: "发送验证码",
      timeDisable: false,
      form: {
        bankPhone: "",
        checkCode: "",
        desc: ""
      },
      rules: {
        bankPhone: [
          { required: true, message: "请输入手机号", trigger: "change" },
          { validator: validateMobile, trigger: "change" }
        ],
        checkCode: [
          { required: true, message: "请输入验证码", trigger: "change" },
          { min: 4, max: 6, message: "验证码位数不正确", trigger: "change" }
        ]
      },
      needList: [
        {
          url:'/img/weihai-need_07.png',
          title: "码垛机器人",
          address: "不限",
          way: "价格面议",
        },
        {
          url:'/img/weihai-need_07.png',
          title: "码垛机器人",
          address: "不限",
          way: "价格面议",
        },
      ],
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
    openDetails(row, column, event) {
      this.pramfundtype = row.pramfundtype;
      // VueEvent.$emit('shop_pramfundtype',this.pramfundtype);
      // this.$router.push('funddetails/'+ row.f_info_windcode +'');
      this.$router.push({
        path: "funddetails",
        query: {
          fundcode: row.f_info_windcode,
          fundtype: row.pramfundtype
        }
      });
    },
    sendCodeValid(formName) {
      this.sendCode(formName);
    },
    sendCode(formName) {
      if (this.timeDisable == false) {
        this.time = 60;
        this.timeDisable = true;
        this.timer();
      }
    },
    timer() {
      if (this.time > 0) {
        this.time--;
        this.timeText = this.time + "s后重新获取";
        setTimeout(this.timer, 1000);
        this.timeDisable = true;
      } else {
        this.timeText = "发送验证码";
        this.timeDisable = false;
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$message({
            showClose: true,
            type: 'success',
            center:true,
            message: 'submit!'
          });
        } else {
          console.log('error submit!!');
          return false;
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
.need {
  border-top: 1px solid $color-back-second;
  // min-height: 900px;
  .need-breadcrumb {
    padding: 15px 0;

    .need-breadcrumb-inner {
      width: 1140px;
      margin: 0 auto;
    }
  }
  .shop-search {
    background-color: #fff;
    margin-bottom: 10px;
    padding-bottom: 15px;

    .shop-search-inner {
      width: 1140px;
      margin: 0 auto;

      .search-tag {
        padding: 10px 0;
        border-bottom: 1px solid $color-back-second;
        .el-tag + .el-tag {
          margin-left: 10px;
        }
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
          .private-search-box {
            width: 100%;
            height: 100px;
            border: 1px solid $color-back-first;
            padding-right: 0;
            margin-top: -1px;
            overflow: hidden;
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
        .el-dropdown-link {
          span {
            cursor: pointer;
            color: $color-font-second;
            font-size: 12px;
            padding: 8px 14px;
            border: 1px solid #dcdfe6;
            border-right: none 0;
            box-sizing: border-box;
            transition: all 0.3s;

            &.colorAdd {
              background-color: $color-primary;
              color: #fff;
              border-color: $color-primary;
              transition: all 0.3s;
            }
          }
          &:first-child span {
            border-radius: 4px 0 0 4px;
          }
          &:last-child span {
            border-radius: 0 4px 4px 0;
            border-right: 1px solid #dcdfe6;
          }
        }
      }
    }
  }
  .private-list {
    width: 100%;
    min-height: 700px;
    margin-top: 20px;
    padding-bottom: 30px;

    .private-list-inner {
      width: 1140px;
      margin: 0 auto;

      .need-left-title {
        height: 55px;
        background-color: #fff;
        border-top: 2px solid $color-primary;

        a {
          display: block;
          color: #000;
          height: 55px;
          line-height: 55px;
          float: left;
          padding: 0 30px;
          font-size: 15px;
          margin-left: 10px;
          color: $color-font-second;

          &.active {
            color: $color-primary;
            background-color: $color-primary-second;
          }
        }
      }
      .need-left-sort {
        font-size: 14px;
        padding: 15px 0;
        color: $color-font-second;

        a {
          margin: 0 10px;
          color: $color-font-second;

          &:first-child {
            margin-left: 30px;
          }
          &.active {
            color: $color-primary;
          }
          b {
            color: $color-back-first;
            margin-right: 20px;
            vertical-align: 1px;
          }
          i {
            color: $color-font-fourth;

            &.iActive {
              color: $color-primary;
            }
          }
        }
      }
      .need-left-list {
        margin: 0;
        padding: 0;

        li {
          margin-top: 15px;
          background-color: #fff;
          padding: 10px 15px;
          border: 1px solid $color-back-first;
          border-left: 2px solid $color-primary;

          .list-top {
            h3 {
              font-size: 15px;
              white-space: nowrap;
              text-overflow: ellipsis;
              overflow: hidden;
              padding-top: 3px;

              span {
                font-weight: normal;
                color: #ffa92a;
                margin-left: 10px;
              }
            }
            h4 {
              font-weight: normal;
              font-size: 15px;
              padding-top: 3px;

              span {
                margin-left: 5px;
                color: $color-primary;
              }
            }
            b {
              font-weight: normal;
              float: right;
              font-size: 12px;
              padding: 5px 5px;
              background-color: #cef4eb;
              color: #1fd295;
            }
          }
          .list-bottom {
            line-height: 40px;
            color: $color-font-fourth;

            i {
              color: $color-font-third;
            }
            span {
              font-size: 14px;
              color: $color-font-third;
              margin: 0 5px;
            }
            .el-button {
              float: right;
            }
          }
        }
      }
    }
  }
  .need-right{
    background-color: #fff;
    padding: 15px;

    .need-right-title{
      text-align: center;
      font-size: 15px;
      color: $color-font-first;
      margin-bottom: 10px;
      
    }
    .need-form-p{
      font-size: 12px;
      color: #ff932a;
      margin-bottom: 10px;
    }
    .need-right-service-title{
      height: 35px;
      border-bottom: 1px solid $color-back-first;
      p{
        border-left: 5px solid $color-primary;
        padding-left: 10px;
        font-size: 15px;
        float: left;
      }
      .el-button{
        float: right;
        padding: 5px;
      }
    }
  }
  .need-right-service-list{
    li{
      padding: 15px 0;
      border-bottom: 1px solid $color-back-first;
      &:last-child{
        border: none 0;
      }
      img{
        width: 100%;
      }
      p{
        font-size: 14px;
        margin-bottom: 25px;
      }
      i{
        color: $color-font-second;
        vertical-align: -1px;
      }
      span{
        font-size: 14px;
        color: $color-font-second;
      }
    }
  }
  .need-right-img{
    margin: 15px 0;

    img{
      width: 100%;
    }
  }
}
</style>
<style lang="scss">
@import "@/assets/styles/vars.scss";
.need {
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

